import { Inject, Injectable, Logger } from '@nestjs/common';
import { ulid } from 'ulid';
import { ConflictError, ValidationError } from '@salychain/errors';
import { SUBJECTS } from '@salychain/events';
import { parseIntent, safeParseIntent, type Intent } from '@salychain/intent-schema';
import { ExecutionClient, AgentsClient, getTenantOrgId } from '@salychain/sdk-internal';
import { IntentState, Prisma } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { OutboxService } from '../outbox/outbox.service.js';
import { EXECUTION_CLIENT, AGENTS_CLIENT } from '../clients/clients.module.js';

export interface IngestInput {
  /** Raw, untrusted payload from the caller. Parsed with the intent schema before persistence. */
  payload: unknown;
  /** Caller-supplied idempotency key. */
  idempotencyKey: string;
  /** Source channel (overrides any value in payload.context.channel). */
  channel?: string;
}

export interface IngestResult {
  intent_id: string;
  state: IntentState;
  execution_transaction_id?: string;
  rejection?: { code: string; message: string };
}

/**
 * Intent ingestion service.
 *
 *   1. Validates the payload against `@salychain/intent-schema`.
 *   2. Enforces actor-scoped idempotency (same payload + same key returns same record).
 *   3. Persists the canonical intent + emits `intent.received`.
 *   4. Hands off to the execution service. Execution drives compliance/risk/routing/quote/settle.
 *   5. Tracks state transitions locally so external observers can poll the intent's lifecycle
 *      without subscribing to the execution service.
 */
@Injectable()
export class IntentsService {
  private readonly logger = new Logger(IntentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly outbox: OutboxService,
    @Inject(EXECUTION_CLIENT) private readonly execution: ExecutionClient,
    @Inject(AGENTS_CLIENT) private readonly agents: AgentsClient,
  ) {}

  async ingest(input: IngestInput): Promise<IngestResult> {
    const parsed = safeParseIntent(input.payload);
    if (!parsed.success) {
      throw ValidationError(
        'intent.schema_invalid',
        `Intent payload failed schema validation: ${parsed.error.issues[0]?.message ?? 'unknown'}`,
        { details: { schema_errors: parsed.error.flatten() } },
      );
    }
    const intent: Intent = parsed.data;
    const actorRef = intent.actor.id;

    if (intent.actor.type === 'AGENT') {
      const agent = await this.agents.getById(intent.actor.id);
      if (intent.actor.owner_id && agent.owner_id !== intent.actor.owner_id) {
        throw ValidationError(
          'intent.agent.owner_mismatch',
          `Agent ${intent.actor.id} owner_id does not match registry`,
        );
      }
      const reasoning = intent.metadata?.reasoning;
      if (
        reasoning &&
        typeof reasoning === 'object' &&
        'summary' in reasoning &&
        'steps' in reasoning
      ) {
        await this.agents.recordReasoningLog(intent.actor.id, {
          summary: String((reasoning as { summary: unknown }).summary),
          steps: (reasoning as { steps: unknown[] }).steps,
          intentId: intent.intent_id,
          traceId: intent.context?.trace_id,
        });
      }
    }

    // Idempotency: same actor + same key → same record (regardless of payload).
    const existing = await this.prisma.intentRecord.findUnique({
      where: { actorRef_idempotencyKey: { actorRef, idempotencyKey: input.idempotencyKey } },
    });
    if (existing) {
      if (existing.intentId !== intent.intent_id) {
        throw ConflictError(
          'intent.idempotency_conflict',
          `Idempotency key ${input.idempotencyKey} already used by ${existing.intentId}`,
        );
      }
      this.logger.debug?.(`intent ${intent.intent_id} idempotent replay`);
      return {
        intent_id: existing.intentId,
        state: existing.state,
        execution_transaction_id: existing.executionTransactionId ?? undefined,
      };
    }

    const channel = input.channel ?? intent.context?.channel ?? 'API';
    // Tenant the intent belongs to, taken from the propagated request context
    // (set by the gateway from the authenticated API key). Null for consumer/JWT.
    const orgId = getTenantOrgId() ?? null;

    // Persist the canonical record and enqueue intent.received atomically: the
    // event row lands in the same transaction as the record, so the relay can
    // never publish an event for an intent that wasn't durably stored.
    await this.prisma.$transaction(async (tx) => {
      await tx.intentRecord.create({
        data: {
          intentId: intent.intent_id,
          idempotencyKey: input.idempotencyKey,
          actorRef,
          orgId,
          channel,
          kind: intent.kind,
          payload: intent as unknown as Prisma.InputJsonValue,
          state: 'RECEIVED',
        },
      });
      await this.outbox.enqueueTx(tx, SUBJECTS.INTENT_RECEIVED, {
        intent_id: intent.intent_id,
        kind: intent.kind,
        actor_id: actorRef,
        source: channel,
      });
    });

    // Hand off to execution. Execution is the orchestrator that runs the
    // screen→route→quote→reserve→execute→settle pipeline. The intent service
    // only owns ingestion + lifecycle reflection.
    try {
      const tx = await this.execution.ingestIntent({
        idempotency_key: input.idempotencyKey,
        intent,
      });
      await this.prisma.intentRecord.update({
        where: { intentId: intent.intent_id },
        data: { state: 'ACCEPTED', executionTransactionId: tx.id },
      });
      this.logger.log(`intent ${intent.intent_id} accepted → tx=${tx.id}`);
      return {
        intent_id: intent.intent_id,
        state: 'ACCEPTED',
        execution_transaction_id: tx.id,
      };
    } catch (err) {
      const message = (err as Error).message;
      const code = (err as { code?: string }).code ?? 'execution.unavailable';
      await this.prisma.intentRecord.update({
        where: { intentId: intent.intent_id },
        data: { state: 'REJECTED', rejectionCode: code, rejectionMessage: message.slice(0, 500) },
      });
      await this.outbox.enqueue(SUBJECTS.INTENT_REJECTED, {
        intent_id: intent.intent_id,
        kind: intent.kind,
        reason_code: code,
        reason_message: message,
      });
      this.logger.warn(`intent ${intent.intent_id} rejected: ${code} ${message}`);
      return {
        intent_id: intent.intent_id,
        state: 'REJECTED',
        rejection: { code, message },
      };
    }
  }

  async getById(intentId: string) {
    const record = await this.prisma.intentRecord.findUnique({ where: { intentId } });
    if (!record) return null;
    // Tenant isolation: a caller acting for an org may only read that org's
    // intents. We return null (not 403) so we never leak the existence of
    // another tenant's record.
    const orgId = getTenantOrgId();
    if (orgId && record.orgId !== orgId) return null;
    return record;
  }

  async list(opts: { state?: IntentState; limit: number }) {
    const orgId = getTenantOrgId();
    return this.prisma.intentRecord.findMany({
      where: {
        ...(opts.state ? { state: opts.state } : {}),
        // When the request carries an org, scope results to it (partner
        // isolation). Consumer/JWT callers (no org) retain prior behaviour.
        ...(orgId ? { orgId } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: opts.limit,
    });
  }
}
