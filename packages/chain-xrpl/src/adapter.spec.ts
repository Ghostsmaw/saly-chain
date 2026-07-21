import { describe, expect, it } from 'vitest';
import { normalizeExpandedLedgerTx, XrplChainAdapter } from './adapter.js';

describe('XrplChainAdapter (pure)', () => {
  const adapter = new XrplChainAdapter({ network: 'xrpl-testnet' });

  it('generates valid ed25519 keypairs with classic addresses', () => {
    const kp = adapter.generateKey();
    expect(kp.address).toMatch(/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/);
    expect(kp.publicKey).toMatch(/^[A-F0-9]+$/i);
    expect(kp.privateKey).toMatch(/^[A-F0-9]+$/i);
    expect(XrplChainAdapter.isValidAddress(kp.address)).toBe(true);
  });

  it('round-trips seed → derived address', () => {
    const a = adapter.generateKey();
    const b = adapter.deriveFromSeed(a.seed);
    expect(b.address).toBe(a.address);
    expect(b.publicKey).toBe(a.publicKey);
  });

  it('converts XRP to drops', () => {
    expect(XrplChainAdapter.xrpToDrops('1')).toBe('1000000');
    expect(XrplChainAdapter.xrpToDrops('0.000001')).toBe('1');
  });

  it('rejects invalid classic addresses', () => {
    expect(XrplChainAdapter.isValidAddress('0xabcd')).toBe(false);
    expect(XrplChainAdapter.isValidAddress('rNotAValidAddress123')).toBe(false);
  });
});

describe('normalizeExpandedLedgerTx', () => {
  it('accepts flat HTTP JSON-RPC Payment + metaData', () => {
    const n = normalizeExpandedLedgerTx({
      TransactionType: 'Payment',
      Account: 'rFrom',
      Destination: 'rTo',
      Amount: '1000000',
      Fee: '12',
      hash: 'ABC',
      metaData: { TransactionResult: 'tesSUCCESS' },
    });
    expect(n).toMatchObject({
      TransactionType: 'Payment',
      Account: 'rFrom',
      Destination: 'rTo',
      Amount: '1000000',
      hash: 'ABC',
      metaResult: 'tesSUCCESS',
    });
  });

  it('accepts nested WS / xrpl.js { tx_json, meta, hash }', () => {
    const n = normalizeExpandedLedgerTx({
      hash: '9799E9B2',
      meta: { TransactionResult: 'tesSUCCESS' },
      tx_json: {
        TransactionType: 'Payment',
        Account: 'rfC23BX7VTpUNcJnHyenD2WwPE81TVxvGz',
        Destination: 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe',
        Amount: '1000000',
        Fee: '12',
      },
      validated: true,
    });
    expect(n).toMatchObject({
      TransactionType: 'Payment',
      Account: 'rfC23BX7VTpUNcJnHyenD2WwPE81TVxvGz',
      Destination: 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe',
      Amount: '1000000',
      hash: '9799E9B2',
      metaResult: 'tesSUCCESS',
    });
  });

  it('falls back to DeliverMax when Amount is omitted (newer rippled)', () => {
    const n = normalizeExpandedLedgerTx({
      hash: '9799E9B2',
      meta: { TransactionResult: 'tesSUCCESS' },
      tx_json: {
        TransactionType: 'Payment',
        Account: 'rFrom',
        Destination: 'rTo',
        DeliverMax: '1000000',
        Fee: '12',
      },
    });
    expect(n?.Amount).toBe('1000000');
  });

  it('returns null for non-objects', () => {
    expect(normalizeExpandedLedgerTx(null)).toBeNull();
    expect(normalizeExpandedLedgerTx('hash-only')).toBeNull();
  });
});
