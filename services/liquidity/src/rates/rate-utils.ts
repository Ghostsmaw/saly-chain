/** Convert a decimal rate string (e.g. "1502.45") to midRate1e8. */
export function decimalRateToMidRate1e8(rateStr: string): bigint {
  const trimmed = rateStr.trim();
  if (!/^\d+(\.\d+)?$/.test(trimmed)) {
    throw new Error(`Invalid rate decimal: ${rateStr}`);
  }
  const [whole, frac = ''] = trimmed.split('.');
  const paddedFrac = (frac + '00000000').slice(0, 8);
  return BigInt(whole) * 100_000_000n + BigInt(paddedFrac);
}

/** Derive inverse mid rate: if 1 A = r B, then 1 B = 1e16/r A. */
export function invertMidRate1e8(direct: bigint): bigint {
  if (direct <= 0n) throw new Error('Cannot invert non-positive rate');
  return 10n ** 16n / direct;
}

export function sameCurrencyQuote(base: string, quote: string, provider: string): import('./rate.provider.js').RateQuote {
  return { midRate1e8: 100_000_000n, provider, capturedAt: new Date() };
}
