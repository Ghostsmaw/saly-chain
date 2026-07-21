import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LoginThrottle } from './login-throttle.js';

describe('LoginThrottle', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('allows attempts up to the per-minute budget', () => {
    const throttle = new LoginThrottle(3);
    throttle.hit('a@x.io');
    throttle.hit('a@x.io');
    throttle.hit('a@x.io');
    expect(() => throttle.hit('a@x.io')).toThrowError(/Too many login attempts/);
  });

  it('tracks emails independently', () => {
    const throttle = new LoginThrottle(1);
    throttle.hit('a@x.io');
    expect(() => throttle.hit('b@x.io')).not.toThrow();
    expect(() => throttle.hit('a@x.io')).toThrow();
  });

  it('resets after the window elapses', () => {
    const throttle = new LoginThrottle(1);
    throttle.hit('a@x.io');
    expect(() => throttle.hit('a@x.io')).toThrow();
    vi.advanceTimersByTime(61_000);
    expect(() => throttle.hit('a@x.io')).not.toThrow();
  });
});
