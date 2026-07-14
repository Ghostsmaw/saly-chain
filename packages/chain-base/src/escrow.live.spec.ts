import { describe, expect, it } from 'vitest';
import { createPublicClient, encodeFunctionData, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import {
  dealIdFromCorrelationId,
  escrowStatusLabel,
  isEscrowDealId,
  SALY_ESCROW_ABI,
} from './escrow.js';
import { BaseChainAdapter } from './adapter.js';

const live = process.env.ESCROW_E2E_LIVE === 'true';
const contract = process.env.ESCROW_CONTRACT_ADDRESS as `0x${string}` | undefined;
const rpcUrl = process.env.BASE_RPC_URL ?? 'https://sepolia.base.org';

describe('escrow helpers', () => {
  it('validates deal id format', () => {
    const id = dealIdFromCorrelationId('tx-test-1');
    expect(isEscrowDealId(id)).toBe(true);
    expect(isEscrowDealId('0x1234')).toBe(false);
  });

  it('encodes release and refund calldata', () => {
    const dealId = dealIdFromCorrelationId('tx-abc');
    const release = encodeFunctionData({ abi: SALY_ESCROW_ABI, functionName: 'release', args: [dealId] });
    const refund = encodeFunctionData({ abi: SALY_ESCROW_ABI, functionName: 'refund', args: [dealId] });
    expect(release.startsWith('0x')).toBe(true);
    expect(refund.startsWith('0x')).toBe(true);
    expect(release).not.toBe(refund);
  });
});

describe.skipIf(!live || !contract)('escrow live E2E (read-only)', () => {
  const adapter = new BaseChainAdapter({ network: 'base-sepolia', rpcUrl });
  const client = createPublicClient({ chain: baseSepolia, transport: http(rpcUrl) });

  it('verifies contract bytecode and resolver', async () => {
    const code = await client.getBytecode({ address: contract! });
    expect(code).toBeDefined();
    expect(code).not.toBe('0x');
    const resolver = await adapter.readEscrowResolver(contract!);
    expect(resolver).toMatch(/^0x[a-fA-F0-9]{40}$/);
  });

  it('reads deals mapping for a synthetic id (expect NONE)', async () => {
    const dealId = dealIdFromCorrelationId(`e2e-probe-${Date.now()}`);
    const deal = await adapter.readEscrowDeal(contract!, dealId);
    expect(escrowStatusLabel(deal.status)).toBe('NONE');
  });
});
