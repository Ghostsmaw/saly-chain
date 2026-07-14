import { AuthorizationError, NotFoundError } from '@salychain/errors';
import { getTenantOrgId } from '@salychain/sdk-internal';
import type { PaymentLink, PaymentLinkStatus } from '../generated/prisma/index.js';

export function assertOrgScoped(orgId: string | null | undefined, recordOrgId: string): void {
  if (orgId && recordOrgId !== orgId) {
    throw NotFoundError('merchant.not_found', 'Resource not found');
  }
}

export function requireTenantOrgId(): string {
  const orgId = getTenantOrgId();
  if (!orgId) {
    throw AuthorizationError(
      'merchant.org.required',
      'Organization context is required for this operation',
    );
  }
  return orgId;
}

export function paymentLinkSlug(): string {
  return `pl_${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}`;
}

export interface PublicPaymentLink {
  slug: string;
  title: string;
  description: string | null;
  amount_minor: string;
  currency: string;
  country: string;
  status: PaymentLinkStatus;
  checkout_url: string;
}

export interface PaymentLinkDto {
  id: string;
  org_id: string;
  slug: string;
  title: string;
  description: string | null;
  amount_minor: string;
  currency: string;
  country: string;
  actor_id: string;
  destination_account_ref: string;
  status: PaymentLinkStatus;
  success_redirect_url: string | null;
  checkout_url: string;
  created_at: string;
  updated_at: string;
}

export function toPaymentLinkDto(link: PaymentLink, checkoutBaseUrl: string): PaymentLinkDto {
  return {
    id: link.id,
    org_id: link.orgId,
    slug: link.slug,
    title: link.title,
    description: link.description,
    amount_minor: link.amountMinor.toString(),
    currency: link.currency,
    country: link.country,
    actor_id: link.actorId,
    destination_account_ref: link.destinationAccountRef,
    status: link.status,
    success_redirect_url: link.successRedirectUrl,
    checkout_url: `${checkoutBaseUrl.replace(/\/$/, '')}/${link.slug}`,
    created_at: link.createdAt.toISOString(),
    updated_at: link.updatedAt.toISOString(),
  };
}

export function toPublicPaymentLink(link: PaymentLink, checkoutBaseUrl: string): PublicPaymentLink {
  return {
    slug: link.slug,
    title: link.title,
    description: link.description,
    amount_minor: link.amountMinor.toString(),
    currency: link.currency,
    country: link.country,
    status: link.status,
    checkout_url: `${checkoutBaseUrl.replace(/\/$/, '')}/${link.slug}`,
  };
}
