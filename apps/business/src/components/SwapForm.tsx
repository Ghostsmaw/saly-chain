'use client';

import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import {
  ArrowRightLeft,
  CheckCircle2,
  Coins,
  AlertCircle,
  Layers,
  Loader2,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Card, CardHeader, Chip } from '@salychain/ui';
import type { WalletWithBalance } from '@/lib/api';
import { formatMinor } from '@/lib/format';
import { FxProviderBadge } from '@/components/FxSwapPanel';
import { DexNetworkBadge, dexPairSet, dexTokenSymbols } from '@/components/DexNetworkBadge';

export interface DexCatalog {
  network: string;
  tokens: Array<{ symbol: string; decimals: number; label: string }>;
  pairs: Array<{ from: string; to: string; pool_fee: number }>;
}

const DEFAULT_DEX_CATALOG: DexCatalog = {
  network: 'base-sepolia',
  tokens: [
    { symbol: 'USDC', decimals: 6, label: 'USD Coin' },
    { symbol: 'WETH', decimals: 18, label: 'Wrapped Ether' },
  ],
  pairs: [
    { from: 'USDC', to: 'WETH', pool_fee: 3000 },
    { from: 'WETH', to: 'USDC', pool_fee: 3000 },
  ],
};
const FX_CURRENCIES = ['USD', 'USDC', 'NGN', 'EUR', 'GBP', 'GHS', 'KES'];

function resolveLedgerWallet(currency: string, map: Map<string, WalletWithBalance[]>) {
  const direct = map.get(currency)?.[0];
  if (direct) return direct;
  if (currency === 'USD') return map.get('USDC')?.[0];
  if (currency === 'USDC') return map.get('USD')?.[0];
  return undefined;
}

function isStubProvider(provider?: string): boolean {
  return Boolean(provider?.includes('stub'));
}

type SwapMode = 'ledger' | 'onchain';

export function SwapForm({
  wallets,
  action,
  quoteAction,
  fxQuoteAction,
  poolAction,
  dexCatalog = DEFAULT_DEX_CATALOG,
}: {
  wallets: WalletWithBalance[];
  action: (formData: FormData) => Promise<{ ok: boolean; message: string; intentId?: string }>;
  quoteAction?: (formData: FormData) => Promise<{
    ok: boolean;
    message?: string;
    toAmountMinor?: string;
    minOut?: string;
    expectedOut?: string;
    rate?: string;
    provider?: string;
    quoteSource?: 'onchain' | 'stub';
    poolAddress?: string;
    poolLiquidity?: string;
  }>;
  fxQuoteAction?: (formData: FormData) => Promise<{
    ok: boolean;
    message?: string;
    toAmountMinor?: string;
    quotedRate1e8?: string;
    midRate1e8?: string;
    spreadBps?: number;
    provider?: string;
    expiresAt?: string;
  }>;
  poolAction?: (formData: FormData) => Promise<{
    ok: boolean;
    ready: boolean;
    poolAddress?: string;
    liquidity?: string;
    network?: string;
    reason?: string;
    message?: string;
  }>;
  dexCatalog?: DexCatalog;
}) {
  const funded = wallets.filter((w) => w.ledger_account_id && w.balance_minor);
  const baseWallets = wallets.filter((w) => w.chain === 'BASE' && w.status === 'ACTIVE');

  const ledgerByCurrency = useMemo(() => {
    const map = new Map<string, WalletWithBalance[]>();
    for (const w of funded) {
      const ccy = w.balance_currency ?? 'USDC';
      const list = map.get(ccy) ?? [];
      list.push(w);
      map.set(ccy, list);
    }
    return map;
  }, [funded]);

  const ledgerCurrencies = useMemo(() => {
    const set = new Set([...ledgerByCurrency.keys(), ...FX_CURRENCIES]);
    return [...set].sort();
  }, [ledgerByCurrency]);

  const dexPairs = useMemo(() => dexPairSet(dexCatalog.pairs), [dexCatalog.pairs]);
  const dexCurrencies = useMemo(() => dexTokenSymbols(dexCatalog.tokens), [dexCatalog.tokens]);
  const dexNetwork = dexCatalog.network;

  const [mode, setMode] = useState<SwapMode>('ledger');
  const [fromCurrency, setFromCurrency] = useState(ledgerCurrencies[0] ?? 'USDC');
  const [toCurrency, setToCurrency] = useState(
    ledgerCurrencies.find((c) => c !== fromCurrency) ?? 'WETH',
  );
  const [amount, setAmount] = useState('');
  const [selectedWalletId, setSelectedWalletId] = useState(baseWallets[0]?.id ?? '');
  const [quotePreview, setQuotePreview] = useState<{
    toAmountMinor: string;
    minOut: string;
    provider: string;
    quoteSource?: 'onchain' | 'stub';
    poolAddress?: string;
    midRate1e8?: string;
    spreadBps?: number;
    expiresAt?: string;
  } | null>(null);
  const [poolStatus, setPoolStatus] = useState<{
    ready: boolean;
    poolAddress?: string;
    liquidity?: string;
    network?: string;
    reason?: string;
  } | null>(null);
  const [poolLoading, setPoolLoading] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string; intentId?: string } | null>(
    null,
  );

  const fromWallet = resolveLedgerWallet(fromCurrency, ledgerByCurrency);
  const toWallet = resolveLedgerWallet(toCurrency, ledgerByCurrency);
  const selectedBaseWallet = baseWallets.find((w) => w.id === selectedWalletId) ?? baseWallets[0];

  const dexPairValid = dexPairs.has(`${fromCurrency}:${toCurrency}`);

  const refreshQuote = useCallback(async () => {
    if (!amount.trim() || fromCurrency === toCurrency) {
      setQuotePreview(null);
      return;
    }

    if (mode === 'onchain') {
      if (!quoteAction || !dexPairValid || !selectedBaseWallet) {
        setQuotePreview(null);
        return;
      }
      setQuoteLoading(true);
      try {
        const fd = new FormData();
        fd.set('mode', 'onchain');
        fd.set('from_currency', fromCurrency);
        fd.set('to_currency', toCurrency);
        fd.set('amount', amount);
        fd.set('wallet_address', selectedBaseWallet.address);
        fd.set('max_slippage_bps', '100');
        const res = await quoteAction(fd);
        if (res.ok && res.toAmountMinor) {
          setQuotePreview({
            toAmountMinor: res.toAmountMinor,
            minOut: res.minOut ?? res.toAmountMinor,
            provider: res.provider ?? 'dex:uniswap-v3',
            quoteSource: res.quoteSource,
            poolAddress: res.poolAddress,
          });
        } else {
          setQuotePreview(null);
        }
      } catch {
        setQuotePreview(null);
      } finally {
        setQuoteLoading(false);
      }
      return;
    }

    if (mode === 'ledger' && fxQuoteAction) {
      setQuoteLoading(true);
      try {
        const fd = new FormData();
        fd.set('from_currency', fromCurrency);
        fd.set('to_currency', toCurrency);
        fd.set('amount', amount);
        const res = await fxQuoteAction(fd);
        if (res.ok && res.toAmountMinor) {
          setQuotePreview({
            toAmountMinor: res.toAmountMinor,
            minOut: res.toAmountMinor,
            provider: res.provider ?? 'composite',
            quoteSource: isStubProvider(res.provider) ? 'stub' : undefined,
            midRate1e8: res.midRate1e8,
            spreadBps: res.spreadBps,
            expiresAt: res.expiresAt,
          });
        } else {
          setQuotePreview(null);
        }
      } catch {
        setQuotePreview(null);
      } finally {
        setQuoteLoading(false);
      }
    }
  }, [
    amount,
    dexPairValid,
    fromCurrency,
    fxQuoteAction,
    mode,
    quoteAction,
    selectedBaseWallet,
    toCurrency,
  ]);

  useEffect(() => {
    const t = setTimeout(refreshQuote, 400);
    return () => clearTimeout(t);
  }, [refreshQuote]);

  const refreshPool = useCallback(async () => {
    if (mode !== 'onchain' || !poolAction || !dexPairValid) {
      setPoolStatus(null);
      return;
    }
    setPoolLoading(true);
    try {
      const fd = new FormData();
      fd.set('from_currency', fromCurrency);
      fd.set('to_currency', toCurrency);
      const res = await poolAction(fd);
      if (res.ok) {
        setPoolStatus({
          ready: res.ready,
          poolAddress: res.poolAddress,
          liquidity: res.liquidity,
          network: res.network,
          reason: res.reason,
        });
      } else {
        setPoolStatus({ ready: false, reason: res.message });
      }
    } catch {
      setPoolStatus({ ready: false, reason: 'unavailable' });
    } finally {
      setPoolLoading(false);
    }
  }, [dexPairValid, fromCurrency, mode, poolAction, toCurrency]);

  useEffect(() => {
    void refreshPool();
  }, [refreshPool]);

  function onSubmit(formData: FormData) {
    setResult(null);
    formData.set('mode', mode);
    if (mode === 'onchain' && selectedBaseWallet) {
      formData.set('source_wallet_id', selectedBaseWallet.id);
      formData.set('wallet_address', selectedBaseWallet.address);
    }
    startTransition(async () => {
      const res = await action(formData);
      setResult(res);
    });
  }

  const canLedger =
    funded.length >= 2 &&
    ledgerCurrencies.length >= 2 &&
    fromWallet?.ledger_account_id &&
    toWallet?.ledger_account_id;

  const canOnchain = baseWallets.length > 0 && dexPairValid;

  if (!canLedger && !canOnchain) {
    return (
      <Card>
        <CardHeader title="Currency swap" subtitle="Treasury FX or on-chain DEX on Base" />
        <p className="px-4 pb-4 text-sm text-text-secondary">
          Link BASE wallets and ledger accounts to enable treasury FX or Uniswap V3 swaps on Base.
        </p>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden border-brand-500/20">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

      <CardHeader
        title="Currency swap"
        subtitle={
          mode === 'ledger'
            ? 'Treasury FX — signed quote, slippage guard, ledger settlement'
            : 'On-chain DEX — Uniswap V3 on Base via custodial wallet'
        }
        right={<Chip tone="brand">SWAP</Chip>}
      />

      <div className="relative flex gap-2 px-4 pb-4">
        <ModeToggle
          active={mode === 'ledger'}
          onClick={() => setMode('ledger')}
          icon={<Layers className="h-4 w-4" />}
          label="Treasury FX"
          hint="Instant ledger"
          disabled={!canLedger}
        />
        <ModeToggle
          active={mode === 'onchain'}
          onClick={() => setMode('onchain')}
          icon={<Zap className="h-4 w-4" />}
          label="On-chain Base"
          hint={dexNetwork === 'base-mainnet' ? 'Mainnet · Uniswap V3' : 'Sepolia · Uniswap V3'}
          disabled={!canOnchain}
        />
      </div>

      <form action={onSubmit} className="relative flex flex-col gap-6 px-4 pb-4">
        {mode === 'ledger' ? (
          <>
            <input type="hidden" name="from_account" value={fromWallet?.ledger_account_id ?? ''} />
            <input type="hidden" name="to_account" value={toWallet?.ledger_account_id ?? ''} />
          </>
        ) : (
          <>
            <input type="hidden" name="source_wallet_id" value={selectedBaseWallet?.id ?? ''} />
            <input type="hidden" name="wallet_address" value={selectedBaseWallet?.address ?? ''} />
          </>
        )}

        {mode === 'onchain' ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-surface-border bg-surface-card/40 px-3 py-2">
              <DexNetworkBadge network={dexNetwork} />
              <p className="text-[11px] text-text-muted">
                {dexCatalog.pairs.length} route{dexCatalog.pairs.length === 1 ? '' : 's'} · QuoterV2
              </p>
            </div>

            <Field label="Custodial wallet">
              <select
                name="source_wallet"
                value={selectedWalletId}
                onChange={(e) => setSelectedWalletId(e.target.value)}
                className={inputClass}
              >
                {baseWallets.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.address.slice(0, 8)}…{w.address.slice(-6)} · {w.kind}
                  </option>
                ))}
              </select>
            </Field>

            <div className="flex flex-wrap gap-1.5">
              {dexCatalog.pairs.map((p) => {
                const active = fromCurrency === p.from && toCurrency === p.to;
                return (
                  <button
                    key={`${p.from}:${p.to}`}
                    type="button"
                    onClick={() => {
                      setFromCurrency(p.from);
                      setToCurrency(p.to);
                    }}
                    className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
                      active
                        ? 'border-brand-500/50 bg-brand-500/15 text-brand-100'
                        : 'border-surface-border bg-surface-card/50 text-text-muted hover:border-surface-divider hover:text-text-secondary'
                    }`}
                  >
                    {p.from} → {p.to}
                  </button>
                );
              })}
            </div>
          </>
        ) : null}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
          <Field label="From">
            <select
              name="from_currency"
              value={fromCurrency}
              onChange={(e) => {
                const next = e.target.value;
                setFromCurrency(next);
                const pool = mode === 'onchain' ? dexCurrencies : ledgerCurrencies;
                if (next === toCurrency) {
                  setToCurrency(pool.find((c) => c !== next) ?? '');
                }
              }}
              className={inputClass}
            >
              {(mode === 'onchain' ? dexCurrencies : ledgerCurrencies).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {mode === 'ledger' && fromWallet?.balance_minor ? (
              <p className="mt-1 text-[11px] text-text-muted">
                Available {formatMinor(fromWallet.balance_minor, fromCurrency)}
              </p>
            ) : null}
          </Field>

          <div className="hidden place-self-center md:grid md:h-10 md:w-10 md:place-items-center md:rounded-xl md:bg-brand-500/10 md:text-brand-300">
            <ArrowRightLeft className="h-4 w-4" />
          </div>

          <Field label="To">
            <select
              name="to_currency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className={inputClass}
            >
              {(mode === 'onchain' ? dexCurrencies : ledgerCurrencies)
                .filter((c) => c !== fromCurrency)
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Amount to swap">
            <div className="relative">
              <input
                name="amount"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={inputClass}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-tertiary">
                {fromCurrency}
              </span>
            </div>
          </Field>
          <Field label="Max slippage (bps)">
            <input
              name="max_slippage_bps"
              type="number"
              min={0}
              max={10000}
              defaultValue={100}
              className={inputClass}
            />
            <p className="mt-1 text-[11px] text-text-muted">100 bps = 1%</p>
          </Field>
        </div>

        {mode === 'onchain' ? (
          <>
            <div
              className={`rounded-xl border px-4 py-3 text-xs ${
                poolStatus?.ready
                  ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-100'
                  : 'border-amber-500/30 bg-amber-500/5 text-amber-100'
              }`}
            >
              <div className="flex items-center gap-2">
                {poolLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : poolStatus?.ready ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                ) : (
                  <AlertCircle className="h-3.5 w-3.5 text-amber-300" />
                )}
                <span className="font-medium text-text-primary">
                  {poolLoading
                    ? 'Checking Uniswap pool…'
                    : poolStatus?.ready
                      ? 'Pool ready — on-chain quotes enabled'
                      : poolStatus?.reason === 'unsupported_pair'
                        ? `Pair not supported on ${dexNetwork}`
                        : `Pool not ready on ${dexNetwork === 'base-mainnet' ? 'Base mainnet' : 'Base Sepolia'}`}
                </span>
              </div>
              {poolStatus?.poolAddress ? (
                <p className="mt-1.5 font-mono text-[10px] opacity-80">
                  Pool {poolStatus.poolAddress.slice(0, 10)}… · liq {poolStatus.liquidity ?? '0'}
                </p>
              ) : null}
            </div>

            <div className="rounded-xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 via-surface-card/60 to-brand-500/5 p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-violet-200">
                  <Coins className="h-4 w-4" />
                  <span className="text-sm font-medium text-text-primary">Live DEX quote</span>
                  {quotePreview?.quoteSource === 'onchain' ? (
                    <Chip tone="success">On-chain</Chip>
                  ) : quotePreview?.quoteSource === 'stub' ? (
                    <Chip tone="warning">Stub</Chip>
                  ) : null}
                </div>
                {quoteLoading ? <Loader2 className="h-4 w-4 animate-spin text-text-muted" /> : null}
              </div>
              {quotePreview ? (
                <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <dt className="text-text-muted">Expected output</dt>
                    <dd className="mt-0.5 font-mono text-sm text-emerald-200">
                      {formatMinor(quotePreview.toAmountMinor, toCurrency)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-text-muted">Min after slippage</dt>
                    <dd className="mt-0.5 font-mono text-sm text-text-secondary">
                      {formatMinor(quotePreview.minOut, toCurrency)}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-text-muted">Route</dt>
                    <dd className="mt-0.5 text-text-secondary">{quotePreview.provider}</dd>
                  </div>
                </dl>
              ) : (
                <p className="mt-2 text-xs text-text-muted">
                  {dexPairValid
                    ? 'Enter an amount to preview the Uniswap V3 QuoterV2 quote.'
                    : 'Choose a supported on-chain pair for this network.'}
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-sky-500/25 bg-gradient-to-br from-sky-500/10 via-surface-card/60 to-brand-500/5 p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sky-200">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium text-text-primary">Live treasury FX quote</span>
                {quotePreview?.provider ? (
                  <FxProviderBadge provider={quotePreview.provider} />
                ) : null}
              </div>
              {quoteLoading ? <Loader2 className="h-4 w-4 animate-spin text-text-muted" /> : null}
            </div>
            {quotePreview ? (
              <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <dt className="text-text-muted">You receive</dt>
                  <dd className="mt-0.5 font-mono text-sm text-sky-200">
                    {formatMinor(quotePreview.toAmountMinor, toCurrency)}
                  </dd>
                </div>
                <div>
                  <dt className="text-text-muted">Spread</dt>
                  <dd className="mt-0.5 text-text-secondary">
                    {quotePreview.spreadBps ?? 50} bps
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-text-muted">Rate feed</dt>
                  <dd className="mt-0.5 text-text-secondary">{quotePreview.provider}</dd>
                </div>
                {quotePreview.expiresAt ? (
                  <div className="col-span-2 text-[10px] text-text-muted">
                    Preview valid ~30s · locked at execution
                  </div>
                ) : null}
              </dl>
            ) : (
              <p className="mt-2 text-xs text-text-muted">
                Enter an amount to preview Coinbase / Frankfurter mid-market pricing with treasury spread.
              </p>
            )}
            <p className="mt-3 text-[10px] leading-relaxed text-text-muted">
              Settlement posts a four-leg ledger journal: your source account → FX pool ({fromCurrency}) → FX
              pool ({toCurrency}) → destination account.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={
            pending ||
            (mode === 'ledger' && (!fromWallet?.ledger_account_id || !toWallet?.ledger_account_id)) ||
            (mode === 'onchain' && (!selectedBaseWallet || !dexPairValid))
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-500/20 transition hover:opacity-95 disabled:opacity-50"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRightLeft className="h-4 w-4" />}
          {pending ? 'Submitting swap…' : mode === 'onchain' ? 'Swap on Base' : 'Swap currencies'}
        </button>

        {result ? (
          <p
            className={`rounded-lg px-3 py-2 text-sm ${
              result.ok
                ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                : 'border border-rose-500/30 bg-rose-500/10 text-rose-200'
            }`}
          >
            {result.message}
            {result.intentId ? (
              <span className="mt-1 block font-mono text-[11px] opacity-80">{result.intentId}</span>
            ) : null}
          </p>
        ) : null}
      </form>
    </Card>
  );
}

function ModeToggle({
  active,
  onClick,
  icon,
  label,
  hint,
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  hint: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-1 flex-col items-start gap-1 rounded-xl border px-3 py-2.5 text-left transition ${
        active
          ? 'border-brand-500/50 bg-brand-500/10 text-text-primary shadow-inner'
          : 'border-surface-border bg-surface-card/40 text-text-secondary hover:border-surface-divider'
      } disabled:cursor-not-allowed disabled:opacity-40`}
    >
      <span className="flex items-center gap-2 text-sm font-medium">
        {icon}
        {label}
      </span>
      <span className="text-[11px] text-text-muted">{hint}</span>
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-text-muted">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  'w-full rounded-lg border border-surface-border bg-surface-card/80 px-3 py-2 text-sm text-text-primary outline-none ring-brand-500/40 transition focus:ring-2';
