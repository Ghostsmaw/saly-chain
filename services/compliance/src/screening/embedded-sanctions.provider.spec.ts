import { describe, expect, it } from 'vitest';
import { EmbeddedSanctionsProvider } from './embedded-sanctions.provider.js';

describe('EmbeddedSanctionsProvider', () => {
  const p = new EmbeddedSanctionsProvider();

  it('returns ALLOW for clean targets', async () => {
    const results = await p.screen({ identifier: 'user_1', displayName: 'Jane Doe', countryCode: 'NG' });
    expect(results).toHaveLength(1);
    expect(results[0].decision).toBe('ALLOW');
  });

  it('BLOCKs a hardcoded OFAC address', async () => {
    const results = await p.screen({
      identifier: 'user_2',
      chainAddress: { chain: 'ETHEREUM', address: '0x8589427373D6D84E98730D7795D8f6f8731FDA16' },
    });
    expect(results.some((r) => r.decision === 'BLOCK' && r.category === 'SANCTIONS')).toBe(true);
  });

  it('BLOCKs high-risk countries', async () => {
    const results = await p.screen({ identifier: 'user_3', countryCode: 'IR' });
    expect(results.some((r) => r.decision === 'BLOCK' && r.category === 'COUNTRY_RISK')).toBe(true);
  });

  it('REVIEWs medium-risk countries', async () => {
    const results = await p.screen({ identifier: 'user_4', countryCode: 'MM' });
    const review = results.find((r) => r.category === 'COUNTRY_RISK');
    expect(review?.decision).toBe('REVIEW');
  });

  it('case-insensitive address matching', async () => {
    const results = await p.screen({
      identifier: 'user_5',
      chainAddress: { chain: 'ETHEREUM', address: '0x8589427373d6d84e98730d7795d8f6f8731fda16' },
    });
    expect(results.some((r) => r.decision === 'BLOCK')).toBe(true);
  });
});
