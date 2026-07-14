import { describe, expect, it } from 'vitest';
import { ChainalysisSanctionsProvider } from './chainalysis.provider.js';
import { ComplyAdvantageProvider } from './comply.provider.js';
import { CompositeSanctionsProvider } from './composite-sanctions.provider.js';
import { EmbeddedSanctionsProvider } from './embedded-sanctions.provider.js';

describe('ChainalysisSanctionsProvider', () => {
  it('BLOCKs sanctioned public-api identifications', async () => {
    const fetchFn = async () =>
      new Response(
        JSON.stringify({
          identifications: [{ category: 'sanctions', name: 'OFAC SDN', description: 'Tornado Cash' }],
        }),
        { status: 200 },
      );

    const p = new ChainalysisSanctionsProvider('test-key', 'https://public.chainalysis.com');
    (p as unknown as { http: { request: () => Promise<unknown> } }).http = {
      request: async () => ({
        identifications: [{ category: 'sanctions', name: 'OFAC SDN' }],
      }),
    };

    const results = await p.screen({
      identifier: 'addr1',
      chainAddress: { chain: 'ETHEREUM', address: '0xabc' },
    });
    expect(results.some((r) => r.decision === 'BLOCK')).toBe(true);
  });
});

describe('ComplyAdvantageProvider', () => {
  it('maps sanction hits to BLOCK', async () => {
    const p = new ComplyAdvantageProvider('test-key');
    (p as unknown as { http: { request: () => Promise<unknown> } }).http = {
      request: async () => ({
        status: 'success',
        content: {
          data: {
            id: 1,
            match_status: 'true_positive',
            hits: [{ doc: { id: 'hit-1', name: 'Bad Actor', types: ['sanction'] }, score: 0.98 }],
          },
        },
      }),
    };

    const results = await p.screen({ identifier: 'u1', displayName: 'Bad Actor' });
    expect(results.some((r) => r.category === 'SANCTIONS' && r.decision === 'BLOCK')).toBe(true);
  });
});

describe('CompositeSanctionsProvider', () => {
  it('merges embedded country risk with vendor results', async () => {
    const composite = new CompositeSanctionsProvider([new EmbeddedSanctionsProvider()]);
    const results = await composite.screen({ identifier: 'u1', countryCode: 'IR' });
    expect(results.some((r) => r.decision === 'BLOCK')).toBe(true);
  });

  it('returns ALLOW when all providers are clean', async () => {
    const composite = new CompositeSanctionsProvider([new EmbeddedSanctionsProvider()]);
    const results = await composite.screen({ identifier: 'u1', countryCode: 'NG' });
    expect(results.some((r) => r.decision === 'ALLOW')).toBe(true);
  });
});

describe('createSanctionsProvider', () => {
  it('builds composite with embedded baseline', async () => {
    const { createSanctionsProvider } = await import('./sanctions-provider.factory.js');
    const p = createSanctionsProvider({
      PORT: 4004,
      DATABASE_URL: 'postgresql://u:p@localhost:5432/db',
      COMPLIANCE_SANCTIONS_PROVIDER: 'composite',
      COMPLIANCE_KYC_PROVIDER: 'manual',
      COMPLIANCE_SANCTIONS_TIMEOUT_MS: 15_000,
      CHAINALYSIS_API_URL: 'https://api.chainalysis.com',
      COMPLYADVANTAGE_API_URL: 'https://api.complyadvantage.com',
      REFINITIV_API_URL: 'https://api-worldcheck.refinitiv.com',
    });
    expect(p.name).toBe('composite');
  });
});
