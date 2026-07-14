import { Inject, Injectable } from '@nestjs/common';
import { merchantCheckoutSessionsTotal, merchantPaymentLinksTotal } from '@salychain/observability';
import { ValidationError } from '@salychain/errors';
import { PrismaService } from '../prisma/prisma.service.js';
import { MERCHANT_ENV, type MerchantEnv } from '../config/env.js';
import {
  paymentLinkSlug,
  requireTenantOrgId,
  assertOrgScoped,
  toPaymentLinkDto,
  toPublicPaymentLink,
} from '../common/tenant.js';

export interface CreatePaymentLinkInput {
  actor_id: string;
  destination_account_ref: string;
  title: string;
  description?: string;
  amount_minor: string;
  currency: string;
  country: string;
  success_redirect_url?: string;
}

@Injectable()
export class PaymentLinksService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(MERCHANT_ENV) private readonly env: MerchantEnv,
  ) {}

  async create(input: CreatePaymentLinkInput) {
    const orgId = requireTenantOrgId();
    if (BigInt(input.amount_minor) <= 0n) {
      throw ValidationError('merchant.amount.invalid', 'amount_minor must be positive');
    }

    const link = await this.prisma.paymentLink.create({
      data: {
        orgId,
        slug: paymentLinkSlug(),
        title: input.title,
        description: input.description ?? null,
        amountMinor: BigInt(input.amount_minor),
        currency: input.currency.toUpperCase(),
        country: input.country.toUpperCase(),
        actorId: input.actor_id,
        destinationAccountRef: input.destination_account_ref,
        successRedirectUrl: input.success_redirect_url ?? null,
      },
    });

    merchantPaymentLinksTotal.inc({ outcome: 'created' });
    return toPaymentLinkDto(link, this.env.MERCHANT_CHECKOUT_BASE_URL);
  }

  async list(opts: { status?: 'ACTIVE' | 'ARCHIVED'; limit: number }) {
    const orgId = requireTenantOrgId();
    const take = Math.min(Math.max(opts.limit, 1), 100);
    const rows = await this.prisma.paymentLink.findMany({
      where: {
        orgId,
        ...(opts.status ? { status: opts.status } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take,
    });
    return {
      data: rows.map((r) => toPaymentLinkDto(r, this.env.MERCHANT_CHECKOUT_BASE_URL)),
    };
  }

  async getById(id: string) {
    const orgId = requireTenantOrgId();
    const link = await this.prisma.paymentLink.findUnique({ where: { id } });
    if (!link) {
      throw ValidationError('merchant.payment_link.not_found', 'Payment link not found');
    }
    assertOrgScoped(orgId, link.orgId);
    return toPaymentLinkDto(link, this.env.MERCHANT_CHECKOUT_BASE_URL);
  }

  async getPublicBySlug(slug: string) {
    const link = await this.prisma.paymentLink.findUnique({ where: { slug } });
    if (!link || link.status !== 'ACTIVE') {
      throw ValidationError('merchant.payment_link.not_found', 'Payment link not found');
    }
    return toPublicPaymentLink(link, this.env.MERCHANT_CHECKOUT_BASE_URL);
  }

  async getActiveBySlug(slug: string) {
    const link = await this.prisma.paymentLink.findUnique({ where: { slug } });
    if (!link || link.status !== 'ACTIVE') {
      throw ValidationError('merchant.payment_link.not_found', 'Payment link not found');
    }
    return link;
  }

  async archive(id: string, reason?: string) {
    const orgId = requireTenantOrgId();
    const link = await this.prisma.paymentLink.findUnique({ where: { id } });
    if (!link) {
      throw ValidationError('merchant.payment_link.not_found', 'Payment link not found');
    }
    assertOrgScoped(orgId, link.orgId);

    const updated = await this.prisma.paymentLink.update({
      where: { id },
      data: {
        status: 'ARCHIVED',
        metadata: {
          ...(typeof link.metadata === 'object' && link.metadata ? link.metadata : {}),
          archived_reason: reason ?? null,
          archived_at: new Date().toISOString(),
        },
      },
    });
    merchantPaymentLinksTotal.inc({ outcome: 'archived' });
    return toPaymentLinkDto(updated, this.env.MERCHANT_CHECKOUT_BASE_URL);
  }
}
