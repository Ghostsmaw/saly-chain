/** Common Nigerian bank codes for NIP payouts (Paystack / Flutterwave). */
export const NG_BANKS: { code: string; name: string }[] = [
  { code: '058', name: 'GTBank' },
  { code: '033', name: 'UBA' },
  { code: '057', name: 'Zenith' },
  { code: '044', name: 'Access Bank' },
  { code: '011', name: 'First Bank' },
  { code: '214', name: 'FCMB' },
  { code: '232', name: 'Sterling' },
  { code: '070', name: 'Fidelity' },
  { code: '221', name: 'Stanbic IBTC' },
  { code: '035', name: 'Wema Bank' },
];

export function ngBankName(code: string): string {
  return NG_BANKS.find((b) => b.code === code)?.name ?? code;
}
