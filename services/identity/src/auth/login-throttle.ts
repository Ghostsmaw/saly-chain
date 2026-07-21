import { RateLimitError } from '@salychain/errors';

/**
 * Cheap pre-hash login throttle, fixed 60s window per email.
 *
 * scrypt costs ~10ms of CPU per attempt; without this gate a credential
 * stuffer can pin a replica's CPU with garbage passwords. Per-replica
 * in-memory state is deliberate: the durable, cluster-wide control is the
 * DB-backed lockout in AuthService — this only bounds hashing work.
 */
const WINDOW_MS = 60_000;
const MAX_TRACKED = 10_000;

interface Window {
  count: number;
  startedAt: number;
}

export class LoginThrottle {
  private readonly windows = new Map<string, Window>();

  constructor(private readonly maxPerMinute: number) {}

  /** Throws RateLimitError when the email exceeds the per-minute budget. */
  hit(email: string): void {
    const now = Date.now();
    const current = this.windows.get(email);

    if (!current || now - current.startedAt >= WINDOW_MS) {
      if (this.windows.size >= MAX_TRACKED) this.evictExpired(now);
      this.windows.set(email, { count: 1, startedAt: now });
      return;
    }

    current.count += 1;
    if (current.count > this.maxPerMinute) {
      const retryInSec = Math.ceil((current.startedAt + WINDOW_MS - now) / 1000);
      throw RateLimitError(
        'identity.auth.throttled',
        `Too many login attempts. Retry in ${retryInSec}s.`,
      );
    }
  }

  private evictExpired(now: number): void {
    for (const [key, win] of this.windows) {
      if (now - win.startedAt >= WINDOW_MS) this.windows.delete(key);
    }
    // Pathological case: everything is live. Drop the map rather than grow
    // unbounded — resetting counters is safer than an OOM.
    if (this.windows.size >= MAX_TRACKED) this.windows.clear();
  }
}
