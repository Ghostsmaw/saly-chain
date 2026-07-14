export interface SettlementLine {
  transaction_id: string;
  amount_minor: string;
  currency: string;
  settled_at: string;
  checkout_session_id?: string;
  payment_link_id?: string;
  customer_name?: string;
}

export interface SettlementRollup {
  total_settled_minor: string;
  transaction_count: number;
  lines: SettlementLine[];
}

export interface SettlementTxRow {
  id: string;
  amount_minor: string;
  currency: string;
  settled_at: string;
  metadata?: Record<string, unknown> | null;
}

/** Pure rollup over settled FIAT_PAYIN execution rows in a period. */
export function rollupSettlement(
  rows: SettlementTxRow[],
  periodStart: Date,
  periodEnd: Date,
  currencyFilter?: string,
): SettlementRollup {
  const startMs = periodStart.getTime();
  const endMs = periodEnd.getTime();
  const lines: SettlementLine[] = [];
  let total = 0n;

  for (const row of rows) {
    if (!row.settled_at) continue;
    const settledMs = new Date(row.settled_at).getTime();
    if (settledMs < startMs || settledMs > endMs) continue;
    if (currencyFilter && row.currency.toUpperCase() !== currencyFilter.toUpperCase()) continue;

    const meta = row.metadata ?? {};
    const merchant = (meta.merchant as Record<string, unknown> | undefined) ?? {};
    const payin = (meta.payin as Record<string, unknown> | undefined) ?? {};

    lines.push({
      transaction_id: row.id,
      amount_minor: row.amount_minor,
      currency: row.currency,
      settled_at: row.settled_at,
      ...(typeof merchant.checkout_session_id === 'string'
        ? { checkout_session_id: merchant.checkout_session_id }
        : {}),
      ...(typeof merchant.payment_link_id === 'string'
        ? { payment_link_id: merchant.payment_link_id }
        : {}),
      ...(typeof payin.customer_name === 'string' ? { customer_name: payin.customer_name } : {}),
    });
    total += BigInt(row.amount_minor);
  }

  return {
    total_settled_minor: total.toString(),
    transaction_count: lines.length,
    lines,
  };
}
