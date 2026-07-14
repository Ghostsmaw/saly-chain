import { describe, it, expect, vi } from 'vitest';
import {
  OutboxRelay,
  SUBJECTS,
  type EventBus,
  type OutboxRecord,
  type OutboxStore,
} from '@salychain/events';

interface Row {
  id: string;
  subject: string;
  payload: unknown;
  attempts: number;
  status: 'PENDING' | 'PUBLISHED' | 'FAILED';
  lastError?: string;
}

class FakeStore implements OutboxStore {
  constructor(public rows: Row[]) {}
  async fetchPending(limit: number): Promise<OutboxRecord[]> {
    return this.rows
      .filter((r) => r.status === 'PENDING')
      .slice(0, limit)
      .map((r) => ({ id: r.id, subject: r.subject, payload: r.payload, attempts: r.attempts }));
  }
  async markPublished(id: string): Promise<void> {
    const row = this.rows.find((r) => r.id === id)!;
    row.status = 'PUBLISHED';
  }
  async markFailed(id: string, error: string, attempts: number, dead: boolean): Promise<void> {
    const row = this.rows.find((r) => r.id === id)!;
    row.attempts = attempts;
    row.lastError = error;
    row.status = dead ? 'FAILED' : 'PENDING';
  }
}

function row(id: string, subject: string): Row {
  return { id, subject, payload: { event_id: id, subject }, attempts: 0, status: 'PENDING' };
}

describe('OutboxRelay', () => {
  it('publishes pending rows and marks them delivered', async () => {
    const store = new FakeStore([row('a', SUBJECTS.INTENT_RECEIVED), row('b', SUBJECTS.TX_SETTLED)]);
    const publishEnvelope = vi.fn().mockResolvedValue(undefined);
    const relay = new OutboxRelay({ store, bus: { publishEnvelope } as unknown as EventBus });

    const published = await relay.drainOnce();

    expect(published).toBe(2);
    expect(publishEnvelope).toHaveBeenCalledTimes(2);
    expect(store.rows.every((r) => r.status === 'PUBLISHED')).toBe(true);
  });

  it('retries on publish failure and parks the row after maxAttempts', async () => {
    const store = new FakeStore([row('a', SUBJECTS.INTENT_RECEIVED)]);
    const publishEnvelope = vi.fn().mockRejectedValue(new Error('nats down'));
    const relay = new OutboxRelay({
      store,
      bus: { publishEnvelope } as unknown as EventBus,
      maxAttempts: 3,
    });

    await relay.drainOnce();
    expect(store.rows[0]!.attempts).toBe(1);
    expect(store.rows[0]!.status).toBe('PENDING');

    await relay.drainOnce();
    expect(store.rows[0]!.attempts).toBe(2);
    expect(store.rows[0]!.status).toBe('PENDING');

    await relay.drainOnce();
    expect(store.rows[0]!.attempts).toBe(3);
    expect(store.rows[0]!.status).toBe('FAILED');
  });

  it('parks rows with an unknown subject without attempting publish', async () => {
    const store = new FakeStore([row('a', 'salychain.bogus.subject')]);
    const publishEnvelope = vi.fn();
    const relay = new OutboxRelay({ store, bus: { publishEnvelope } as unknown as EventBus });

    const published = await relay.drainOnce();

    expect(published).toBe(0);
    expect(publishEnvelope).not.toHaveBeenCalled();
    expect(store.rows[0]!.status).toBe('FAILED');
  });
});
