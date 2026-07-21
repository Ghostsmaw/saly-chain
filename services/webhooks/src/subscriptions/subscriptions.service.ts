import { Inject, Injectable, Logger } from '@nestjs/common';
import { ulid } from 'ulid';
import { ConflictError, NotFoundError, ValidationError } from '@salychain/errors';
import { Subscription, SubscriptionStatus } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { WEBHOOKS_ENV, type WebhooksEnv } from '../config/env.js';
import { SECRET_VAULT, SecretVault } from '../crypto/secret-vault.js';
import { generateSigningSecret } from '../delivery/signing.js';

export interface CreateSubscriptionInput {
  orgId: string;
  url: string;
  subjects: string[];
  description?: string;
}

export interface PublicSubscription {
  id: string;
  org_id: string;
  url: string;
  description?: string;
  subjects: string[];
  status: SubscriptionStatus;
  signing_key_id: string;
  consecutive_failures: number;
  disabled_at?: string;
  last_succeeded_at?: string;
  last_attempted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface IssuedSubscription {
  subscription: PublicSubscription;
  /** Shown to the caller once on creation / rotation. */
  signing_secret: string;
}

const ALLOWED_SUBJECTS = [
  // intent
  'salychain.intent.received',
  'salychain.intent.screened',
  'salychain.intent.routed',
  'salychain.intent.rejected',
  // transactions
  'salychain.tx.created',
  'salychain.tx.reserved',
  'salychain.tx.executing',
  'salychain.tx.awaiting_confirmation',
  'salychain.tx.settled',
  'salychain.tx.failed',
  'salychain.tx.reversed',
  // agents
  'salychain.agent.created',
  'salychain.agent.policy_updated',
  'salychain.agent.spend_denied',
];

@Injectable()
export class SubscriptionsService {
  private readonly logger = new Logger(SubscriptionsService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(WEBHOOKS_ENV) private readonly env: WebhooksEnv,
    @Inject(SECRET_VAULT) private readonly vault: SecretVault,
  ) {}

  async create(input: CreateSubscriptionInput): Promise<IssuedSubscription> {
    if (!/^https?:\/\//.test(input.url)) {
      throw ValidationError('webhooks.url.invalid', 'Subscription URL must start with http:// or https://');
    }
    if (input.subjects.length === 0) {
      throw ValidationError('webhooks.subjects.empty', 'At least one subject is required');
    }
    for (const s of input.subjects) {
      if (!isAllowedSubject(s)) {
        throw ValidationError('webhooks.subject.unknown', `Unknown subject "${s}"`);
      }
    }
    const id = `whsub_${ulid()}`;
    const { secretHex, keyId } = generateSigningSecret(this.env.SIGNING_SECRET_BYTES);
    const created = await this.prisma.subscription.create({
      data: {
        id,
        orgId: input.orgId,
        url: input.url,
        description: input.description ?? null,
        subjects: input.subjects,
        // Sealed at rest — the plaintext secret leaves this method exactly once.
        signingSecret: this.vault.seal(secretHex),
        signingKeyId: keyId,
      },
    });
    this.logger.log(`subscription created id=${id} org=${input.orgId} url=${input.url} subjects=${input.subjects.length}`);
    return { subscription: toPublic(created), signing_secret: secretHex };
  }

  async list(orgId: string): Promise<PublicSubscription[]> {
    const rows = await this.prisma.subscription.findMany({ where: { orgId }, orderBy: { createdAt: 'desc' } });
    return rows.map(toPublic);
  }

  async getById(id: string): Promise<PublicSubscription> {
    return toPublic(await this.requireById(id));
  }

  async setStatus(id: string, status: SubscriptionStatus): Promise<PublicSubscription> {
    await this.requireById(id);
    const updated = await this.prisma.subscription.update({
      where: { id },
      data: {
        status,
        disabledAt: status === 'DISABLED' ? new Date() : null,
        consecutiveFailures: status === 'ACTIVE' ? 0 : undefined,
      },
    });
    this.logger.warn(`subscription ${id} → ${status}`);
    return toPublic(updated);
  }

  async rotateSecret(id: string): Promise<IssuedSubscription> {
    await this.requireById(id);
    const { secretHex, keyId } = generateSigningSecret(this.env.SIGNING_SECRET_BYTES);
    const updated = await this.prisma.subscription.update({
      where: { id },
      data: { signingSecret: this.vault.seal(secretHex), signingKeyId: keyId },
    });
    this.logger.warn(`subscription ${id} secret rotated, new kid=${keyId}`);
    return { subscription: toPublic(updated), signing_secret: secretHex };
  }

  async delete(id: string): Promise<void> {
    await this.requireById(id);
    await this.prisma.subscription.delete({ where: { id } });
    this.logger.warn(`subscription ${id} deleted`);
  }

  /** Returns active subscriptions whose subjects list matches `subject`. */
  async resolveTargets(subject: string): Promise<Subscription[]> {
    return this.prisma.subscription.findMany({
      where: {
        status: 'ACTIVE',
        subjects: { has: subject },
      },
    });
  }

  async markDelivered(id: string): Promise<void> {
    await this.prisma.subscription.update({
      where: { id },
      data: { lastSucceededAt: new Date(), lastAttemptedAt: new Date(), consecutiveFailures: 0 },
    });
  }

  /**
   * Record a delivery failure. If we cross a consecutive-failure threshold,
   * auto-disable the subscription so we stop hammering a known-broken endpoint.
   */
  async markFailed(id: string, threshold = 20): Promise<{ disabled: boolean }> {
    const updated = await this.prisma.subscription.update({
      where: { id },
      data: { lastAttemptedAt: new Date(), consecutiveFailures: { increment: 1 } },
    });
    if (updated.consecutiveFailures >= threshold && updated.status === 'ACTIVE') {
      await this.prisma.subscription.update({
        where: { id },
        data: { status: 'DISABLED', disabledAt: new Date() },
      });
      this.logger.error(`subscription ${id} auto-disabled after ${updated.consecutiveFailures} consecutive failures`);
      return { disabled: true };
    }
    return { disabled: false };
  }

  private async requireById(id: string): Promise<Subscription> {
    const sub = await this.prisma.subscription.findUnique({ where: { id } });
    if (!sub) throw NotFoundError('webhooks.subscription.not_found', `Subscription ${id} not found`);
    return sub;
  }
}

function isAllowedSubject(s: string): boolean {
  if (ALLOWED_SUBJECTS.includes(s)) return true;
  // Allow wildcards within the salychain namespace ("salychain.tx.*").
  if (s.endsWith('.*') && s.startsWith('salychain.')) {
    const prefix = s.slice(0, -2);
    return ALLOWED_SUBJECTS.some((a) => a.startsWith(`${prefix}.`));
  }
  return false;
}

function toPublic(s: Subscription): PublicSubscription {
  return {
    id: s.id,
    org_id: s.orgId,
    url: s.url,
    ...(s.description ? { description: s.description } : {}),
    subjects: s.subjects,
    status: s.status,
    signing_key_id: s.signingKeyId,
    consecutive_failures: s.consecutiveFailures,
    ...(s.disabledAt ? { disabled_at: s.disabledAt.toISOString() } : {}),
    ...(s.lastSucceededAt ? { last_succeeded_at: s.lastSucceededAt.toISOString() } : {}),
    ...(s.lastAttemptedAt ? { last_attempted_at: s.lastAttemptedAt.toISOString() } : {}),
    created_at: s.createdAt.toISOString(),
    updated_at: s.updatedAt.toISOString(),
  };
}
