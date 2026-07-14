'use client';

import { useMemo, useState, useTransition } from 'react';
import {
  Building2,
  CheckCircle2,
  Coins,
  Globe,
  Loader2,
  Send,
  Smartphone,
  Wallet,
} from 'lucide-react';
import { Card, CardHeader, Chip } from '@salychain/ui';
import type { WalletWithBalance } from '@/lib/api';
import { chainAsset, formatMinor } from '@/lib/format';
import type { Chain } from '@salychain/sdk-internal';
import { FiatRailBadge } from '@/components/FiatPayoutPanel';
import { NG_BANKS } from '@/lib/ng-banks';

type BeneficiaryType = 'crypto' | 'bank' | 'mobile';

const NG_BANKS_LIST = NG_BANKS;

export function TransferForm({
  wallets,
  action,
  fiatTreasuryAccountId,
}: {
  wallets: WalletWithBalance[];
  action: (formData: FormData) => Promise<{ ok: boolean; message: string; intentId?: string }>;
  /** NGN ledger account UUID for bank payouts (env BUSINESS_FIAT_NGN_LEDGER_ACCOUNT). */
  fiatTreasuryAccountId?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string; intentId?: string } | null>(
    null,
  );
  const [beneficiaryType, setBeneficiaryType] = useState<BeneficiaryType>('crypto');
  const [bankCountry, setBankCountry] = useState('NG');
  const [selectedWallet, setSelectedWallet] = useState(wallets[0]?.id ?? '');
  const [selectedChain, setSelectedChain] = useState<Chain>(
    (wallets[0]?.chain as Chain | undefined) ?? 'BASE',
  );
  const [xrplAsset, setXrplAsset] = useState<'XRP' | 'USD' | 'EUR'>('XRP');

  const wallet = wallets.find((w) => w.id === selectedWallet) ?? wallets[0];

  const currency = useMemo(() => {
    if (beneficiaryType === 'bank' && bankCountry === 'NG') return 'NGN';
    if (beneficiaryType === 'crypto' && selectedChain === 'XRPL' && xrplAsset !== 'XRP') {
      return xrplAsset;
    }
    return wallet ? (wallet.balance_currency ?? chainAsset(wallet.chain)) : 'USDC';
  }, [beneficiaryType, bankCountry, wallet, selectedChain, xrplAsset]);

  const treasuryOptions = useMemo(() => {
    const withLedger = wallets.filter((w) => w.ledger_account_id);
    if (fiatTreasuryAccountId && !withLedger.some((w) => w.ledger_account_id === fiatTreasuryAccountId)) {
      return [{ id: 'env-treasury', ledger_account_id: fiatTreasuryAccountId, label: 'NGN treasury (configured)' }];
    }
    return withLedger.map((w) => ({
      id: w.id,
      ledger_account_id: w.ledger_account_id!,
      label: `${w.kind.replace(/_/g, ' ')} · ${w.balance_currency ?? '—'}`,
      balance: w.balance_minor,
      balanceCurrency: w.balance_currency,
    }));
  }, [wallets, fiatTreasuryAccountId]);

  function onSubmit(formData: FormData) {
    setResult(null);
    startTransition(async () => {
      const res = await action(formData);
      setResult(res);
    });
  }

  return (
    <Card>
      <CardHeader
        title="New transfer"
        subtitle="Express intent — SalyChain routes across crypto, ledger, or fiat rails"
      />
      <form action={onSubmit} className="flex flex-col gap-6">
        <input type="hidden" name="currency" value={currency} />

        <div>
          <p className="mb-2 text-sm text-text-secondary">Destination type</p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ['crypto', 'Crypto wallet', Wallet],
                ['bank', 'Bank account', Building2],
                ['mobile', 'Mobile money', Smartphone],
              ] as const
            ).map(([key, label, Icon]) => (
              <button
                key={key}
                type="button"
                onClick={() => setBeneficiaryType(key)}
                className={[
                  'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition',
                  beneficiaryType === key
                    ? 'bg-brand-500/20 text-brand-200 ring-1 ring-brand-500/40'
                    : 'bg-surface-cardHover text-text-secondary hover:text-text-primary',
                ].join(' ')}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
          <input type="hidden" name="beneficiary_type" value={beneficiaryType} />
        </div>

        {beneficiaryType === 'bank' ? (
          <div className="rounded-xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.07] to-transparent p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-emerald-100">Fiat bank payout</p>
                <p className="text-xs text-text-muted">Routed via Paystack NIP (NGN) or Flutterwave</p>
              </div>
              <FiatRailBadge />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Country">
                <div className="relative">
                  <Globe className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  <select
                    name="bank_country"
                    value={bankCountry}
                    onChange={(e) => setBankCountry(e.target.value.toUpperCase())}
                    className={`${inputClass} pl-9`}
                  >
                    <option value="NG">Nigeria (NGN)</option>
                    <option value="GH">Ghana (GHS)</option>
                    <option value="KE">Kenya (KES)</option>
                  </select>
                </div>
              </Field>
              <Field label="Bank">
                {bankCountry === 'NG' ? (
                  <select name="bank_code" required className={inputClass} defaultValue="058">
                    {NG_BANKS_LIST.map((b) => (
                      <option key={b.code} value={b.code}>
                        {b.name} ({b.code})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input name="bank_code" placeholder="Bank / routing code" required className={inputClass} />
                )}
              </Field>
              <Field label="Account number">
                <input name="bank_account" required className={inputClass} placeholder="10-digit NUBAN" />
              </Field>
              <Field label="Account name">
                <input name="account_name" className={inputClass} placeholder="As on bank statement" />
              </Field>
            </div>

            <Field label="Source treasury (ledger)">
              <select name="fiat_source_ledger_id" required className={inputClass} defaultValue={treasuryOptions[0]?.ledger_account_id}>
                {treasuryOptions.length === 0 ? (
                  <option value="">No ledger accounts — configure BUSINESS_FIAT_NGN_LEDGER_ACCOUNT</option>
                ) : (
                  treasuryOptions.map((t) => (
                    <option key={t.ledger_account_id} value={t.ledger_account_id}>
                      {t.label}
                      {'balance' in t && t.balance
                        ? ` · ${formatMinor(t.balance, t.balanceCurrency ?? currency)}`
                        : ''}
                    </option>
                  ))
                )}
              </select>
            </Field>
          </div>
        ) : (
          <>
            {wallets.length > 0 ? (
              <Field label="Source wallet">
                <select
                  name="source_wallet_id"
                  value={selectedWallet}
                  onChange={(e) => {
                    const id = e.target.value;
                    setSelectedWallet(id);
                    const w = wallets.find((x) => x.id === id);
                    if (w) setSelectedChain(w.chain);
                  }}
                  className={inputClass}
                >
                  {wallets.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.kind.replace(/_/g, ' ')} · {w.chain}
                      {w.balance_minor
                        ? ` · ${formatMinor(w.balance_minor, w.balance_currency ?? 'USDC')}`
                        : ''}
                    </option>
                  ))}
                </select>
              </Field>
            ) : null}
          </>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Amount">
            <div className="relative">
              <input
                name="amount"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                required
                className={inputClass}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-tertiary">
                {currency}
              </span>
            </div>
          </Field>
          <Field label="Transfer type">
            <select name="kind" defaultValue="PAYOUT" className={inputClass}>
              <option value="PAYOUT">Payout</option>
              <option value="TRANSFER">Transfer</option>
            </select>
          </Field>
        </div>

        {beneficiaryType === 'crypto' ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Chain">
              <select
                name="chain"
                value={selectedChain}
                onChange={(e) => {
                  setSelectedChain(e.target.value as Chain);
                  if (e.target.value !== 'XRPL') setXrplAsset('XRP');
                }}
                className={inputClass}
              >
                <option value="BASE">Base (USDC)</option>
                <option value="SALY_L3">Saly L3 (USDC)</option>
                <option value="XRPL">XRPL (XRP / IOU)</option>
                <option value="INTERNAL">Internal ledger</option>
              </select>
            </Field>
            {selectedChain === 'XRPL' ? (
              <>
                <Field label="XRPL asset">
                  <select
                    name="xrpl_asset"
                    value={xrplAsset}
                    onChange={(e) => setXrplAsset(e.target.value as 'XRP' | 'USD' | 'EUR')}
                    className={inputClass}
                  >
                    <option value="XRP">XRP (native)</option>
                    <option value="USD">USD (IOU)</option>
                    <option value="EUR">EUR (IOU)</option>
                  </select>
                </Field>
                {xrplAsset !== 'XRP' ? (
                  <Field label="IOU issuer (optional)">
                    <input
                      name="iou_issuer"
                      placeholder="r… gateway issuer — uses env default if empty"
                      className={`${inputClass} font-mono text-sm`}
                    />
                  </Field>
                ) : null}
              </>
            ) : null}
            <Field label="Wallet address">
              <input
                name="address"
                type="text"
                placeholder="0x… or r…"
                required
                className={`${inputClass} font-mono text-sm`}
              />
            </Field>
          </div>
        ) : null}

        {beneficiaryType === 'mobile' ? (
          <Field label="Phone (E.164)">
            <input name="phone" type="tel" placeholder="+234…" required className={inputClass} />
          </Field>
        ) : null}

        <Field label="Memo (optional)">
          <input name="memo" placeholder="Payment reference" className={inputClass} />
        </Field>

        {beneficiaryType === 'bank' ? (
          <div className="flex items-start gap-2 rounded-lg border border-surface-border bg-surface-card/50 px-3 py-2 text-xs text-text-muted">
            <Coins className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>
              Bank payouts require an funded {currency} treasury account. Settlement is confirmed via PSP
              webhook (typically under 60 seconds for NIP).
            </span>
          </div>
        ) : null}

        {result ? (
          <div
            className={[
              'rounded-lg border px-4 py-3 text-sm',
              result.ok
                ? 'border-success-500/30 bg-success-500/10 text-success-200'
                : 'border-danger-500/30 bg-danger-500/10 text-danger-200',
            ].join(' ')}
          >
            <div className="flex items-start gap-2">
              {result.ok ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              ) : null}
              <div>
                {result.message}
                {result.intentId ? (
                  <p className="mt-1 font-mono text-xs opacity-80">Intent: {result.intentId}</p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={pending || (beneficiaryType === 'bank' && treasuryOptions.length === 0)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-gradient px-5 py-3 text-sm font-medium text-white shadow-glow transition hover:opacity-95 disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {beneficiaryType === 'bank' ? 'Submit bank payout' : 'Submit transfer intent'}
        </button>
      </form>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm text-text-secondary">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  'w-full rounded-lg border border-surface-border bg-surface-card/80 px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20';
