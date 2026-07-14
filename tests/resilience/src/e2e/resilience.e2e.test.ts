import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  FINALITY_POLICIES,
  chainFromTxKind,
  detectReorg,
  extractSettlementFinality,
  requiredConfirmations,
} from '@salychain/finality';
import { HEADER_ENVIRONMENT, HEADER_ORG_ID } from '@salychain/sdk-internal';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../../../..');

describe('e2e: finality policy contract', () => {
  it('documents enforced confirmation depths per chain', () => {
    expect(requiredConfirmations('BASE')).toBe(2);
    expect(requiredConfirmations('XRPL')).toBe(0);
    expect(requiredConfirmations('SALY_L3')).toBe(2);
    expect(FINALITY_POLICIES.BASE.rationale).toMatch(/reorg/i);
  });

  it('maps chain payout kinds used in intent→execution→ledger', () => {
    expect(chainFromTxKind('BASE_PAYOUT')).toBe('BASE');
    expect(chainFromTxKind('L3_PAYOUT')).toBe('SALY_L3');
    expect(chainFromTxKind('FIAT_PAYIN')).toBeUndefined();
  });

  it('parses settlement finality stamped at SETTLED', () => {
    const finality = extractSettlementFinality([
      {
        toState: 'SETTLED',
        detail: {
          ledger_settle_entry_id: 'je_1',
          finality: {
            chain: 'BASE',
            block_number: 42,
            block_hash: '0xabc',
            confirmation_depth: 2,
          },
        },
      },
    ]);
    expect(finality?.block_number).toBe(42);
    expect(finality?.ledger_settle_entry_id).toBe('je_1');
  });
});

describe('e2e: tenant isolation wire contract', () => {
  it('requires org headers for downstream service hops', () => {
    expect(HEADER_ORG_ID).toBe('x-saly-org-id');
    expect(HEADER_ENVIRONMENT).toBe('x-saly-environment');
  });
});

describe('e2e: gateway health (optional live stack)', () => {
  const gateway = process.env.RESILIENCE_GATEWAY_URL;

  it.skipIf(!gateway)('gateway health responds 200', async () => {
    const res = await fetch(`${gateway}/v1/health`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as { status?: string };
    expect(body.status).toBe('ok');
  });
});

describe('e2e: reorg detection integration', () => {
  it('produces a block range execution can sweep for reversals', async () => {
    const reorg = await detectReorg({
      checkpointBlock: 50n,
      checkpointHash: '0xdead',
      confirmations: 2,
      getHashAt: async () => '0xbeef',
    });
    expect(reorg).toMatchObject({ fromBlock: 49, toBlock: 50 });
  });
});

describe('e2e: policy file snapshot', () => {
  it('runbook documents finality policies', () => {
    const doc = readFileSync(join(repoRoot, 'docs/runbooks/c4-finality-resilience.md'), 'utf8');
    expect(doc).toContain('BASE');
    expect(doc).toContain('confirmation');
  });
});
