import { describe, expect, it } from 'vitest';
import {
  CHAIN_DEFINITIONS,
  isOperationalWalletChain,
  isSchemaOnlyChain,
  isTransferWalletChain,
} from '@salychain/types';

describe('multi-chain registry (@salychain/types)', () => {
  it('marks BASE, XRPL, and SALY_L3 as operational transfer rails', () => {
    expect(isOperationalWalletChain('BASE')).toBe(true);
    expect(isOperationalWalletChain('XRPL')).toBe(true);
    expect(isOperationalWalletChain('SALY_L3')).toBe(true);
    expect(isTransferWalletChain('BASE')).toBe(true);
    expect(isTransferWalletChain('XRPL')).toBe(true);
    expect(isTransferWalletChain('SALY_L3')).toBe(true);
  });

  it('marks Ethereum and Polygon as schema-only', () => {
    expect(isSchemaOnlyChain('ETHEREUM')).toBe(true);
    expect(isSchemaOnlyChain('POLYGON')).toBe(true);
    expect(isTransferWalletChain('ETHEREUM')).toBe(false);
  });

  it('defines metadata for every chain enum value', () => {
    const ids = CHAIN_DEFINITIONS.map((c) => c.id);
    for (const chain of ['BASE', 'XRPL', 'INTERNAL', 'ETHEREUM', 'POLYGON']) {
      expect(ids).toContain(chain);
    }
  });
});

describe('WalletsService provision guard (integration shape)', () => {
  it('documents blocked chains at provision time', () => {
    const blocked = ['ETHEREUM', 'POLYGON'] as const;
    for (const chain of blocked) {
      expect(isSchemaOnlyChain(chain)).toBe(true);
    }
  });

  it('documents allowed provision chains for Tier 2', () => {
    const allowed = ['BASE', 'XRPL', 'INTERNAL'] as const;
    for (const chain of allowed) {
      expect(isOperationalWalletChain(chain)).toBe(true);
    }
  });
});
