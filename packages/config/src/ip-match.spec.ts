import { describe, expect, it } from 'vitest';
import { isIpAllowed } from './ip-match.js';

describe('isIpAllowed', () => {
  it('allows any IP when allow-list is empty', () => {
    expect(isIpAllowed(undefined, [])).toBe(true);
    expect(isIpAllowed('203.0.113.1', [])).toBe(true);
  });

  it('denies missing IP when allow-list is non-empty', () => {
    expect(isIpAllowed(undefined, ['203.0.113.1'])).toBe(false);
    expect(isIpAllowed('', ['203.0.113.1'])).toBe(false);
  });

  it('matches exact IPv4', () => {
    expect(isIpAllowed('203.0.113.42', ['203.0.113.42'])).toBe(true);
    expect(isIpAllowed('203.0.113.43', ['203.0.113.42'])).toBe(false);
  });

  it('matches IPv4 CIDR', () => {
    expect(isIpAllowed('10.0.0.15', ['10.0.0.0/28'])).toBe(true);
    expect(isIpAllowed('10.0.1.1', ['10.0.0.0/28'])).toBe(false);
  });
});
