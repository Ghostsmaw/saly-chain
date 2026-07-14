import { Inject, Injectable } from '@nestjs/common';
import type { Intent } from '@salychain/intent-schema';
import { ValidationError } from '@salychain/errors';
import { ExecutionClient, IntentClient, runWithTenant } from '@salychain/sdk-internal';
import { merchantCheckoutSessionsTotal } from '@salychain/observability';
import { ulid } from 'ulid';
import { PrismaService } from '../prisma/prisma.service.js';
import { EXECUTION_CLIENT, INTENT_CLIENT } from '../clients/clients.module.js';
import { PaymentLinksService } from '../payment-links/payment-links.service.js';
import {
  assertOrgScoped,
  requireTenantOrgId,
} from '../common/tenant.js';
import { toCheckoutSessionDto, type OpenCheckoutParams } from './checkout.types.js';

export interface OpenCheckoutInput {
  customer_name: string;
  customer_email?: string;
  idempotency_key?: string;
}

export interface DirectCheckoutInput extends OpenCheckoutInput {
  actor_id: string;
  destination_account_ref: string;
  amount_minor: string;
  currency: string;
  country: string;
  memo?: string;
}

@Injectable()
export class CheckoutService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly links: PaymentLinksService,
    @Inject(EXECUTION_CLIENT) private readonly execution: ExecutionClient,
    @Inject(INTENT_CLIENT) private readonly intent: IntentClient,
  ) {}

  async openFromPaymentLink(slug: string, input: OpenCheckoutInput) {
    const link = await this.links.getActiveBySlug(slug);
    return this.openCheckout({
      orgId: link.orgId,
      paymentLink: link,
      actorId: link.actorId,
      destinationAccountRef: link.destinationAccountRef,
      amountMinor: link.amountMinor.toString(),
      currency: link.currency,
      country: link.country,
      customerName: input.customer_name,
      ...(input.customer_email ? { customerEmail: input.customer_email } : {}),
      memo: link.title,
      idempotencyKey: input.idempotency_key,
    });
  }

  async openDirect(input: DirectCheckoutInput) {
    const orgId = requireTenantOrgId();
    if (BigInt(input.amount_minor) <= 0n) {
      throw ValidationError('merchant.amount.invalid', 'amount_minor must be positive');
    }
    return this.openCheckout({
      orgId,
      actorId: input.actor_id,
      destinationAccountRef: input.destination_account_ref,
      amountMinor: input.amount_minor,
      currency: input.currency.toUpperCase(),
      country: input.country.toUpperCase(),
      customerName: input.customer_name,
      ...(input.customer_email ? { customerEmail: input.customer_email } : {}),
      ...(input.memo ? { memo: input.memo } : {}),
      idempotencyKey: input.idempotency_key,
    });
  }

  private async openCheckout(
    params: OpenCheckoutParams & { idempotencyKey?: string; paymentLink?: { id: string } },
  ) {
    const idempotencyKey = params.idempotencyKey ?? `checkout_${ulid()}`;

    const existing = await this.prisma.checkoutSession.findUnique({
      where: { idempotencyKey },
    });
    if (existing) {
      return toCheckoutSessionDto(existing);
    }

    const session = await this.prisma.checkoutSession.create({
      data: {
        orgId: params.orgId,
        ...(params.paymentLink ? { paymentLinkId: params.paymentLink.id } : {}),
        idempotencyKey,
        status: 'OPEN',
        amountMinor: BigInt(params.amountMinor),
        currency: params.currency,
        country: params.country,
        destinationAccountRef: params.destinationAccountRef,
        actorId: params.actorId,
        customerName: params.customerName,
        customerEmail: params.customerEmail ?? null,
      },
    });

    try {
      const result = await runWithTenant({ orgId: params.orgId }, async () => {
        const intentId = `itn_${ulid()}`;
        const intent: Intent = {
          version: '1',
          intent_id: intentId,
          kind: 'TOPUP',
          actor: { type: 'BUSINESS', id: params.actorId },
          source: {
            amount: { amount_minor: params.amountMinor, currency: params.currency },
          },
          destination: {
            currency: params.currency,
            beneficiary: {
              kind: 'INTERNAL_ACCOUNT',
              account_ref: params.destinationAccountRef,
            },
          },
          context: {
            channel: 'WEB',
            correlation_id: `merchant-checkout-${session.id}`,
          },
          metadata: {
            org_id: params.orgId,
            submitted_via: 'merchant_checkout',
            merchant: {
              checkout_session_id: session.id,
              ...(params.paymentLink ? { payment_link_id: params.paymentLink.id } : {}),
            },
          },
        };

        await this.intent.submit(
          { idempotencyKey: `intent_${session.id}`, intent },
          { orgId: params.orgId },
        );

        const payinResponse = await this.execution.createPayin(
          {
            idempotencyKey: session.id,
            actorId: params.actorId,
            destinationAccountRef: params.destinationAccountRef,
            amountMinor: params.amountMinor,
            currency: params.currency,
            country: params.country,
            customerName: params.customerName,
            ...(params.customerEmail ? { customerEmail: params.customerEmail } : {}),
            ...(params.memo ? { memo: params.memo } : {}),
          },
          { orgId: params.orgId },
        );

        return { intentId, payinResponse };
      });

      const instruction = result.payinResponse.payin;
      const expiresAt = instruction?.expiresAt ? new Date(instruction.expiresAt) : null;

      const updated = await this.prisma.checkoutSession.update({
        where: { id: session.id },
        data: {
          status: 'AWAITING_PAYMENT',
          intentId: result.intentId,
          executionTransactionId: result.payinResponse.transaction.id,
          instruction: instruction ? (instruction as object) : undefined,
          expiresAt,
        },
      });

      merchantCheckoutSessionsTotal.inc({ outcome: 'opened' });
      return toCheckoutSessionDto(updated);
    } catch (err) {
      await this.prisma.checkoutSession.update({
        where: { id: session.id },
        data: {
          status: 'FAILED',
          failureReason: err instanceof Error ? err.message : 'checkout open failed',
        },
      });
      merchantCheckoutSessionsTotal.inc({ outcome: 'failed' });
      throw err;
    }
  }

  async getSession(id: string, opts?: { publicAccess?: boolean }) {
    const session = await this.prisma.checkoutSession.findUnique({ where: { id } });
    if (!session) {
      throw ValidationError('merchant.checkout.not_found', 'Checkout session not found');
    }
    if (!opts?.publicAccess) {
      const orgId = requireTenantOrgId();
      assertOrgScoped(orgId, session.orgId);
    }
    return toCheckoutSessionDto(session);
  }

  async listSessions(limit: number) {
    const orgId = requireTenantOrgId();
    const take = Math.min(Math.max(limit, 1), 100);
    const rows = await this.prisma.checkoutSession.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take,
    });
    return { data: rows.map(toCheckoutSessionDto) };
  }

  async syncSessionStatus(sessionId: string): Promise<void> {
    const session = await this.prisma.checkoutSession.findUnique({ where: { id: sessionId } });
    if (!session || !session.executionTransactionId) return;
    if (session.status === 'COMPLETED' || session.status === 'FAILED' || session.status === 'EXPIRED') {
      return;
    }

    const tx = await runWithTenant({ orgId: session.orgId }, () =>
      this.execution.getTransaction(session.executionTransactionId!, { orgId: session.orgId }),
    );

    if (tx.state === 'SETTLED') {
      await this.prisma.checkoutSession.update({
        where: { id: session.id },
        data: {
          status: 'COMPLETED',
          completedAt: tx.settled_at ? new Date(tx.settled_at) : new Date(),
        },
      });
      merchantCheckoutSessionsTotal.inc({ outcome: 'completed' });
      return;
    }

    if (tx.state === 'FAILED' || tx.state === 'REJECTED') {
      await this.prisma.checkoutSession.update({
        where: { id: session.id },
        data: {
          status: 'FAILED',
          failureReason: tx.error ?? 'payment failed',
        },
      });
      merchantCheckoutSessionsTotal.inc({ outcome: 'failed' });
      return;
    }

    if (session.expiresAt && session.expiresAt < new Date()) {
      await this.prisma.checkoutSession.update({
        where: { id: session.id },
        data: { status: 'EXPIRED', failureReason: 'checkout expired before payment' },
      });
      merchantCheckoutSessionsTotal.inc({ outcome: 'expired' });
    }
  }

  async listAwaitingSync(limit: number) {
    return this.prisma.checkoutSession.findMany({
      where: { status: 'AWAITING_PAYMENT' },
      orderBy: { createdAt: 'asc' },
      take: limit,
      select: { id: true },
    });
  }
}
