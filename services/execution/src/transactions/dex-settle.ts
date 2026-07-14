/** Shared DEX settlement helpers (exported for tests). */
export function extractDexDetail(
  events: Array<{ detail?: unknown }>,
): {
  wallet_id: string;
  token_in: string;
  token_out: string;
  expected_out: string;
} | null {
  for (const event of events) {
    const root = event.detail as { dex?: Record<string, unknown> } | null | undefined;
    const dex = root?.dex;
    if (!dex || typeof dex !== 'object') continue;
    const walletId = dex.wallet_id;
    const tokenIn = dex.token_in;
    const tokenOut = dex.token_out;
    const expectedOut = dex.expected_out;
    if (
      typeof walletId === 'string' &&
      typeof tokenIn === 'string' &&
      typeof tokenOut === 'string' &&
      typeof expectedOut === 'string'
    ) {
      return {
        wallet_id: walletId,
        token_in: tokenIn,
        token_out: tokenOut,
        expected_out: expectedOut,
      };
    }
  }
  return null;
}
