import type { CheckoutSession, PaymentLink } from '../generated/prisma/index.js';
import type { FiatPayinInstructionDto } from '@salychain/sdk-internal';

export interface CheckoutSessionDto {
  id: string;
  org_id: string;
  payment_link_id: string | null;
  status: CheckoutSession['status'];
  amount_minor: string;
  currency: string;
  country: string;
  customer_name: string;
  customer_email: string | null;
  intent_id: string | null;
  execution_transaction_id: string | null;
  instruction: FiatPayinInstructionDto | null;
  expires_at: string | null;
  completed_at: string | null;
  failure_reason: string | null;
  created_at: string;
  updated_at: string;
}

export function toCheckoutSessionDto(session: CheckoutSession): CheckoutSessionDto {
  return {
    id: session.id,
    org_id: session.orgId,
    payment_link_id: session.paymentLinkId,
    status: session.status,
    amount_minor: session.amountMinor.toString(),
    currency: session.currency,
    country: session.country,
    customer_name: session.customerName,
    customer_email: session.customerEmail,
    intent_id: session.intentId,
    execution_transaction_id: session.executionTransactionId,
    instruction: (session.instruction as FiatPayinInstructionDto | null) ?? null,
    expires_at: session.expiresAt?.toISOString() ?? null,
    completed_at: session.completedAt?.toISOString() ?? null,
    failure_reason: session.failureReason,
    created_at: session.createdAt.toISOString(),
    updated_at: session.updatedAt.toISOString(),
  };
}

export interface OpenCheckoutParams {
  orgId: string;
  paymentLink?: PaymentLink;
  actorId: string;
  destinationAccountRef: string;
  amountMinor: string;
  currency: string;
  country: string;
  customerName: string;
  customerEmail?: string;
  memo?: string;
}
