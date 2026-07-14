import type { Logger } from '@salychain/logger';
import type { EventBus } from './bus.js';
import { SUBJECT_SCHEMAS, type Subject } from './schemas.js';

/**
 * Transactional outbox relay.
 *
 * The outbox pattern removes the dual-write hazard: a producer writes the
 * domain event into an `event_outbox` row **inside the same DB transaction** as
 * the state change it describes. This relay then asynchronously drains pending
 * rows to NATS. If the process crashes after commit but before publish, the row
 * is still there and gets delivered on the next tick — events can never be
 * silently lost just because the broker was briefly unavailable.
 *
 * Delivery is at-least-once; the broker de-duplicates on the envelope
 * `event_id` (used as JetStream `msgID`), so re-draining a row is safe.
 */

export interface OutboxRecord {
  readonly id: string;
  readonly subject: string;
  /** The full, validated event envelope as persisted. */
  readonly payload: unknown;
  readonly attempts: number;
}

export interface OutboxStore {
  /** Oldest-first batch of rows still awaiting delivery. */
  fetchPending(limit: number): Promise<OutboxRecord[]>;
  /** Mark a row delivered. Must be idempotent. */
  markPublished(id: string): Promise<void>;
  /**
   * Record a delivery failure. `dead` is true once `maxAttempts` is exhausted,
   * at which point the store should park the row (terminal) for manual review
   * rather than retrying forever.
   */
  markFailed(id: string, error: string, attempts: number, dead: boolean): Promise<void>;
}

export interface OutboxRelayOptions {
  readonly store: OutboxStore;
  readonly bus: EventBus;
  readonly logger?: Logger;
  /** Max rows per drain. Default 100. */
  readonly batchSize?: number;
  /** Idle poll interval in ms. Default 1000. */
  readonly pollIntervalMs?: number;
  /** Attempts before a row is parked as FAILED. Default 10. */
  readonly maxAttempts?: number;
}

export class OutboxRelay {
  private readonly store: OutboxStore;
  private readonly bus: EventBus;
  private readonly logger: Logger | undefined;
  private readonly batchSize: number;
  private readonly pollIntervalMs: number;
  private readonly maxAttempts: number;

  private running = false;
  private draining = false;
  private timer: NodeJS.Timeout | undefined;

  constructor(options: OutboxRelayOptions) {
    this.store = options.store;
    this.bus = options.bus;
    this.logger = options.logger;
    this.batchSize = options.batchSize ?? 100;
    this.pollIntervalMs = options.pollIntervalMs ?? 1000;
    this.maxAttempts = options.maxAttempts ?? 10;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.scheduleNext(0);
    this.logger?.info?.('outbox relay started', { pollIntervalMs: this.pollIntervalMs });
  }

  async stop(): Promise<void> {
    this.running = false;
    if (this.timer) clearTimeout(this.timer);
    this.timer = undefined;
    // Let an in-flight drain settle.
    for (let i = 0; this.draining && i < 50; i++) {
      await new Promise((r) => setTimeout(r, 20));
    }
  }

  private scheduleNext(delayMs: number): void {
    if (!this.running) return;
    this.timer = setTimeout(() => {
      void this.tick();
    }, delayMs);
  }

  private async tick(): Promise<void> {
    if (!this.running) return;
    let processed = 0;
    try {
      processed = await this.drainOnce();
    } catch (err) {
      this.logger?.error?.(`outbox drain failed: ${(err as Error).message}`);
    }
    // If we filled a batch there may be more waiting — poll again immediately.
    this.scheduleNext(processed >= this.batchSize ? 0 : this.pollIntervalMs);
  }

  /**
   * Drain a single batch. Returns the number of rows successfully published.
   * Exposed for deterministic testing.
   */
  async drainOnce(): Promise<number> {
    if (this.draining) return 0;
    this.draining = true;
    try {
      const rows = await this.store.fetchPending(this.batchSize);
      let published = 0;
      for (const row of rows) {
        const subject = row.subject as Subject;
        if (!(subject in SUBJECT_SCHEMAS)) {
          await this.store.markFailed(row.id, `unknown subject: ${row.subject}`, row.attempts + 1, true);
          this.logger?.error?.(`outbox row ${row.id} has unknown subject ${row.subject}; parked`);
          continue;
        }
        try {
          await this.bus.publishEnvelope(subject, row.payload as never);
          await this.store.markPublished(row.id);
          published += 1;
        } catch (err) {
          const attempts = row.attempts + 1;
          const dead = attempts >= this.maxAttempts;
          await this.store.markFailed(row.id, (err as Error).message, attempts, dead);
          if (dead) {
            this.logger?.error?.(`outbox row ${row.id} (${row.subject}) parked after ${attempts} attempts`);
          }
        }
      }
      return published;
    } finally {
      this.draining = false;
    }
  }
}
