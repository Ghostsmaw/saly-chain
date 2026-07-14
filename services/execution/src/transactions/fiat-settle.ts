export interface FiatDetail {
  psp_id?: string;
  rail?: string;
  status?: string;
  adapter?: string;
  confirmed_via?: string;
  bank_country?: string;
  bank_code?: string;
  account_number?: string;
  account_name?: string;
}

/** Extract fiat PSP detail from the newest matching execution event. */
export function extractFiatDetail(
  events: Array<{ detail?: unknown }>,
): FiatDetail | null {
  for (const event of events) {
    const root = event.detail as { fiat?: FiatDetail } | undefined;
    const fiat = root?.fiat;
    if (fiat && typeof fiat === 'object') return fiat;
  }
  return null;
}
