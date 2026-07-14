import { describe, expect, it } from 'vitest';
import { encodeSalysdBurnFrom, encodeSalysdMint } from './salysd.js';

describe('salysd encoders', () => {
  const recipient = '0x00000000000000000000000000000000000000bb' as const;
  const holder = '0x00000000000000000000000000000000000000cc' as const;

  it('encodeSalysdMint produces mint calldata', () => {
    const data = encodeSalysdMint({ to: recipient, amountMinor: 1_000_000n });
    expect(data.startsWith('0x')).toBe(true);
    expect(data.length).toBeGreaterThan(10);
  });

  it('encodeSalysdBurnFrom produces burnFrom calldata', () => {
    const data = encodeSalysdBurnFrom({ from: holder, amountMinor: 500_000n });
    expect(data.startsWith('0x')).toBe(true);
    expect(data.length).toBeGreaterThan(10);
  });

  it('mint and burn selectors differ', () => {
    const mint = encodeSalysdMint({ to: recipient, amountMinor: 1n });
    const burn = encodeSalysdBurnFrom({ from: holder, amountMinor: 1n });
    expect(mint.slice(0, 10)).not.toBe(burn.slice(0, 10));
  });
});
