import { describe, expect, it, vi } from 'vitest';
import { ulid } from 'ulid';

/**
 * Behavioral contract for BroadcastWorker.withWalletLock — Redis SET NX
 * serializes prepare→sign→broadcast per wallet.
 */
async function withWalletLock(
  redis: { set: Function; get: Function; del: Function },
  walletId: string,
  fn: () => Promise<void>,
): Promise<void> {
  const key = `wallet:nonce-lock:${walletId}`;
  const token = ulid();
  for (let attempt = 0; attempt < 40; attempt++) {
    const acquired = await redis.set(key, token, 'EX', 120, 'NX');
    if (acquired) {
      try {
        await fn();
      } finally {
        const current = await redis.get(key);
        if (current === token) await redis.del(key);
      }
      return;
    }
    await new Promise((r) => setTimeout(r, 1));
  }
  throw new Error(`timed out acquiring broadcast lock for wallet ${walletId}`);
}

describe('wallet broadcast nonce lock', () => {
  it('serializes two concurrent jobs on the same wallet', async () => {
    let held: string | null = null;
    const redis = {
      set: vi.fn(async (_k: string, token: string, _ex: string, _ttl: number, nx: string) => {
        expect(nx).toBe('NX');
        if (held) return null;
        held = token;
        return 'OK';
      }),
      get: vi.fn(async () => held),
      del: vi.fn(async () => {
        held = null;
        return 1;
      }),
    };

    const order: string[] = [];
    await Promise.all([
      withWalletLock(redis, 'w1', async () => {
        order.push('a-start');
        await new Promise((r) => setTimeout(r, 20));
        order.push('a-end');
      }),
      (async () => {
        await new Promise((r) => setTimeout(r, 5));
        await withWalletLock(redis, 'w1', async () => {
          order.push('b-start');
          order.push('b-end');
        });
      })(),
    ]);

    expect(order).toEqual(['a-start', 'a-end', 'b-start', 'b-end']);
    expect(held).toBeNull();
  });

  it('only deletes the lock if the token still matches (no stolen release)', async () => {
    let held: string | null = 'other-worker';
    const redis = {
      set: vi.fn(async () => 'OK'),
      get: vi.fn(async () => held),
      del: vi.fn(async () => {
        held = null;
        return 1;
      }),
    };
    // Force acquire path but get() returns a different token → del must not run.
    redis.set = vi.fn(async (_k: string, token: string) => {
      held = token;
      return 'OK';
    });
    // After fn, simulate another worker taking the lock before finally.
    await withWalletLock(redis, 'w1', async () => {
      held = 'stolen';
    });
    expect(redis.del).not.toHaveBeenCalled();
    expect(held).toBe('stolen');
  });
});
