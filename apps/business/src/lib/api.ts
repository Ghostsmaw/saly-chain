import {
  AgentsClient,
  ExecutionClient,
  IntentClient,
  LedgerClient,
  LiquidityClient,
  MerchantClient,
  WalletClient,
  type IntentRecordDto,
  type RatePairsResponse,
  type TransactionDto,
  type WalletDto,
  type PaymentLinkDto,
  type CheckoutSessionDto,
  type SettlementReportDto,
} from '@salychain/sdk-internal';
import type { Intent } from '@salychain/intent-schema';
import { ulid } from 'ulid';
import {
  BUSINESS_ACTOR_ID,
  BUSINESS_ORG_ID,
  SERVICE_URLS,
  businessNgnTreasuryAccountRef,
} from './constants';
import { chainAsset } from './format';

export type FetchResult<T> = { data: T; source: 'live' | 'unavailable' };

export interface OrganizationDto {
  id: string;
  name: string;
  status: string;
  default_rate_limit_per_min: number;
  created_at: string;
  updated_at: string;
}

export interface MemberDto {
  id: string;
  org_id: string;
  email: string;
  role: string;
  created_at: string;
}

export interface WalletWithBalance extends WalletDto {
  balance_minor: string | null;
  balance_currency: string | null;
  balance_error?: string;
}

export interface CurrencyBalance {
  currency: string;
  total_minor: bigint;
  wallet_count: number;
}

export interface TreasurySummary {
  wallets: WalletWithBalance[];
  by_currency: CurrencyBalance[];
  total_wallets: number;
  active_wallets: number;
}

export interface SpendApprovalListItem {
  id: string;
  agent_id: string;
  intent_id?: string;
  amount_minor: string;
  destination: string;
  approval_count: number;
  required_approvers: number;
  status: string;
  created_at: string;
}

let walletClient: WalletClient | null = null;
let ledgerClient: LedgerClient | null = null;
let executionClient: ExecutionClient | null = null;
let intentClient: IntentClient | null = null;
let agentsClient: AgentsClient | null = null;
let liquidityClient: LiquidityClient | null = null;
let merchantClient: MerchantClient | null = null;

function wallet(): WalletClient {
  if (!walletClient) walletClient = new WalletClient({ baseUrl: SERVICE_URLS.wallet });
  return walletClient;
}
function ledger(): LedgerClient {
  if (!ledgerClient) ledgerClient = new LedgerClient({ baseUrl: SERVICE_URLS.ledger });
  return ledgerClient;
}
function execution(): ExecutionClient {
  if (!executionClient) executionClient = new ExecutionClient({ baseUrl: SERVICE_URLS.execution });
  return executionClient;
}
function intents(): IntentClient {
  if (!intentClient) intentClient = new IntentClient({ baseUrl: SERVICE_URLS.intent });
  return intentClient;
}
function agents(): AgentsClient {
  if (!agentsClient) agentsClient = new AgentsClient({ baseUrl: SERVICE_URLS.agents });
  return agentsClient;
}
function liquidity(): LiquidityClient {
  if (!liquidityClient) liquidityClient = new LiquidityClient({ baseUrl: SERVICE_URLS.liquidity });
  return liquidityClient;
}
function merchant(): MerchantClient {
  if (!merchantClient) merchantClient = new MerchantClient({ baseUrl: SERVICE_URLS.merchant });
  return merchantClient;
}

const tenantOpts = { orgId: BUSINESS_ORG_ID };

async function apikeysFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${SERVICE_URLS.apikeys}/v1${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`apikeys ${res.status}`);
  return res.json() as Promise<T>;
}

export async function fetchOrganization(): Promise<FetchResult<OrganizationDto | null>> {
  try {
    const org = await apikeysFetch<OrganizationDto>(`/orgs/${encodeURIComponent(BUSINESS_ORG_ID)}`);
    return { data: org, source: 'live' };
  } catch {
    return { data: null, source: 'unavailable' };
  }
}

export async function fetchMembers(): Promise<FetchResult<MemberDto[]>> {
  try {
    const res = await apikeysFetch<{ data: MemberDto[] }>(
      `/orgs/${encodeURIComponent(BUSINESS_ORG_ID)}/members`,
    );
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

async function enrichWalletBalances(wallets: WalletDto[]): Promise<WalletWithBalance[]> {
  return Promise.all(
    wallets.map(async (w) => {
      if (!w.ledger_account_id) {
        return {
          ...w,
          balance_minor: null,
          balance_currency: chainAsset(w.chain),
        };
      }
      try {
        const bal = await ledger().getAccountBalance(w.ledger_account_id);
        return {
          ...w,
          balance_minor: bal.balance_minor,
          balance_currency: bal.currency,
        };
      } catch (err) {
        return {
          ...w,
          balance_minor: null,
          balance_currency: chainAsset(w.chain),
          balance_error: err instanceof Error ? err.message : 'Balance unavailable',
        };
      }
    }),
  );
}

export async function fetchTreasuryWallets(): Promise<FetchResult<WalletWithBalance[]>> {
  try {
    const res = await wallet().listWalletsByActor({ actorRef: BUSINESS_ORG_ID });
    const treasuryKinds = new Set(['BUSINESS_CUSTODIAL', 'TREASURY', 'HOT_OPERATIONAL']);
    const filtered = res.data.filter((w) => treasuryKinds.has(w.kind));
    const enriched = await enrichWalletBalances(filtered.length > 0 ? filtered : res.data);
    return { data: enriched, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export function summarizeTreasury(wallets: WalletWithBalance[]): TreasurySummary {
  const byCurrency = new Map<string, { total: bigint; count: number }>();

  for (const w of wallets) {
    if (!w.balance_minor) continue;
    const currency = w.balance_currency ?? chainAsset(w.chain);
    const current = byCurrency.get(currency) ?? { total: 0n, count: 0 };
    current.total += BigInt(w.balance_minor);
    current.count += 1;
    byCurrency.set(currency, current);
  }

  return {
    wallets,
    by_currency: [...byCurrency.entries()].map(([currency, { total, count }]) => ({
      currency,
      total_minor: total,
      wallet_count: count,
    })),
    total_wallets: wallets.length,
    active_wallets: wallets.filter((w) => w.status === 'ACTIVE').length,
  };
}

export async function fetchTreasurySummary(): Promise<
  FetchResult<TreasurySummary> & { org: OrganizationDto | null }
> {
  const [walletsResult, orgResult] = await Promise.all([
    fetchTreasuryWallets(),
    fetchOrganization(),
  ]);
  if (walletsResult.source === 'unavailable') {
    return {
      data: summarizeTreasury([]),
      source: 'unavailable',
      org: orgResult.data,
    };
  }
  return {
    data: summarizeTreasury(walletsResult.data),
    source: 'live',
    org: orgResult.data,
  };
}

export async function fetchFxRates(): Promise<FetchResult<RatePairsResponse>> {
  try {
    const data = await liquidity().listRatePairs();
    return { data, source: 'live' };
  } catch {
    return { data: { provider: 'unavailable', pairs: [] }, source: 'unavailable' };
  }
}

export async function fetchTransactions(limit = 50): Promise<FetchResult<TransactionDto[]>> {
  try {
    const res = await execution().listTransactions({ limit });
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function fetchTransaction(id: string): Promise<TransactionDto | null> {
  try {
    return await execution().getTransaction(id);
  } catch {
    return null;
  }
}

export async function fetchPayrollBatchLines(batchId: string): Promise<TransactionDto[]> {
  try {
    const res = await execution().listPayrollBatchLines(batchId);
    return res.data;
  } catch {
    return [];
  }
}

export async function fetchBusinessIntents(limit = 50): Promise<FetchResult<IntentRecordDto[]>> {
  try {
    const res = await intents().list({ limit: Math.max(limit, 100) });
    const filtered = res.data.filter(
      (i) => i.actor_ref === BUSINESS_ACTOR_ID || i.actor_ref === BUSINESS_ORG_ID,
    );
    return { data: filtered.slice(0, limit), source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function listPendingSpendApprovals(): Promise<FetchResult<SpendApprovalListItem[]>> {
  try {
    const agentList = await agents().list({ limit: 50 });
    const orgAgents = agentList.data.filter(
      (a) => a.owner_id === BUSINESS_ORG_ID || a.owner_id === BUSINESS_ACTOR_ID,
    );
    const agentsToCheck = orgAgents.length > 0 ? orgAgents : agentList.data;
    const pending = await Promise.all(
      agentsToCheck.map(async (agent) => {
        const res = await agents().listSpendApprovals(agent.id, { status: 'PENDING' });
        return res.data;
      }),
    );
    return { data: pending.flat(), source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export type VoteSpendApprovalResult = {
  id: string;
  agent_id: string;
  intent_id?: string;
  approval_count: number;
  required_approvers: number;
  status: 'PENDING' | 'APPROVED';
};

export async function voteSpendApproval(
  agentId: string,
  requestId: string,
): Promise<VoteSpendApprovalResult> {
  const approverId = process.env.BUSINESS_APPROVER_USER_ID;
  if (!approverId?.startsWith('usr_')) {
    throw new Error(
      'BUSINESS_APPROVER_USER_ID is not configured (set to a usr_* id for spend approvals)',
    );
  }
  return agents().voteSpendApproval(agentId, requestId, approverId);
}

export interface SubmitTransferResult {
  intent_id: string;
  state: string;
  execution_transaction_id?: string;
  rejection?: { code: string; message: string };
}

export async function submitTransferIntent(input: {
  idempotencyKey: string;
  kind: 'TRANSFER' | 'PAYOUT';
  amountMinor: string;
  currency: string;
  beneficiaryKind: 'WALLET' | 'BANK' | 'PHONE';
  chain?: 'BASE' | 'XRPL' | 'SALY_L3' | 'INTERNAL';
  address?: string;
  phone?: string;
  bankCountry?: string;
  bankAccount?: string;
  bankCode?: string;
  accountName?: string;
  fromLedgerAccountId?: string;
  memo?: string;
  xrplAsset?: 'XRP' | 'USD' | 'EUR';
  iouIssuer?: string;
}): Promise<SubmitTransferResult> {
  const intentId = `itn_${ulid()}`;
  const destCurrency =
    input.beneficiaryKind === 'WALLET' &&
    input.chain === 'XRPL' &&
    input.xrplAsset &&
    input.xrplAsset !== 'XRP'
      ? input.xrplAsset
      : input.currency;

  const beneficiary =
    input.beneficiaryKind === 'WALLET'
      ? {
          kind: 'WALLET' as const,
          chain: input.chain ?? 'BASE',
          address: input.address!,
          memo: input.memo,
        }
      : input.beneficiaryKind === 'PHONE'
        ? {
            kind: 'PHONE' as const,
            value: input.phone!,
          }
        : {
            kind: 'BANK' as const,
            country: input.bankCountry!,
            account_number: input.bankAccount!,
            bank_code: input.bankCode!,
            account_name: input.accountName,
          };

  const intent: Intent = {
    version: '1',
    intent_id: intentId,
    kind: input.kind,
    actor: { type: 'BUSINESS', id: BUSINESS_ACTOR_ID },
    source: {
      account_ref: input.fromLedgerAccountId,
      amount: { amount_minor: input.amountMinor, currency: input.currency },
    },
    destination: {
      currency: destCurrency,
      beneficiary,
    },
    constraints: input.beneficiaryKind === 'BANK' ? { preferred_rails: ['FIAT'] } : undefined,
    context: {
      channel: 'WEB',
      correlation_id: `business-${input.idempotencyKey}`,
    },
    metadata: {
      org_id: BUSINESS_ORG_ID,
      submitted_via: 'business_dashboard',
      ...(input.beneficiaryKind === 'BANK' ? { payout_rail: 'FIAT' } : {}),
      ...(input.beneficiaryKind === 'WALLET' && input.chain === 'XRPL' && input.xrplAsset
        ? {
            xrpl_asset: input.xrplAsset,
            ...(input.iouIssuer ? { iou_issuer: input.iouIssuer } : {}),
          }
        : {}),
    },
  };

  return intents().submit(
    { idempotencyKey: input.idempotencyKey, intent },
    { orgId: BUSINESS_ORG_ID },
  );
}

export async function submitSwapIntent(input: {
  idempotencyKey: string;
  fromLedgerAccountId: string;
  toLedgerAccountId: string;
  fromCurrency: string;
  toCurrency: string;
  amountMinor: string;
  maxSlippageBps?: number;
}): Promise<SubmitTransferResult> {
  const intentId = `itn_${ulid()}`;

  const intent: Intent = {
    version: '1',
    intent_id: intentId,
    kind: 'SWAP',
    actor: { type: 'BUSINESS', id: BUSINESS_ACTOR_ID },
    source: {
      account_ref: input.fromLedgerAccountId,
      amount: { amount_minor: input.amountMinor, currency: input.fromCurrency },
    },
    destination: {
      currency: input.toCurrency,
      beneficiary: {
        kind: 'INTERNAL_ACCOUNT',
        account_ref: input.toLedgerAccountId,
      },
    },
    constraints:
      input.maxSlippageBps != null ? { max_slippage_bps: input.maxSlippageBps } : undefined,
    context: {
      channel: 'WEB',
      correlation_id: `business-swap-${input.idempotencyKey}`,
    },
    metadata: {
      org_id: BUSINESS_ORG_ID,
      submitted_via: 'business_swap',
    },
  };

  return intents().submit(
    { idempotencyKey: input.idempotencyKey, intent },
    { orgId: BUSINESS_ORG_ID },
  );
}

export async function fetchFxQuotePreview(input: {
  fromCurrency: string;
  toCurrency: string;
  amountMinor: string;
}) {
  return liquidity().previewQuote({
    fromCurrency: input.fromCurrency,
    toCurrency: input.toCurrency,
    fromAmountMinor: input.amountMinor,
  });
}

export async function fetchDexQuotePreview(input: {
  fromCurrency: string;
  toCurrency: string;
  amountMinor: string;
  recipient: string;
  slippageBps?: number;
}) {
  return liquidity().quoteDex({
    fromCurrency: input.fromCurrency,
    toCurrency: input.toCurrency,
    fromAmountMinor: input.amountMinor,
    recipient: input.recipient,
    slippageBps: input.slippageBps,
  });
}

export async function fetchDexPoolReadiness(fromCurrency: string, toCurrency: string) {
  return liquidity().getDexPoolReadiness({ fromCurrency, toCurrency });
}

export async function fetchDexCatalog() {
  return liquidity().getDexCatalog();
}

export async function submitOnchainSwapIntent(input: {
  idempotencyKey: string;
  sourceWalletId: string;
  walletAddress: string;
  fromCurrency: string;
  toCurrency: string;
  amountMinor: string;
  maxSlippageBps?: number;
}): Promise<SubmitTransferResult> {
  const intentId = `itn_${ulid()}`;

  const intent: Intent = {
    version: '1',
    intent_id: intentId,
    kind: 'SWAP',
    actor: { type: 'BUSINESS', id: BUSINESS_ACTOR_ID },
    source: {
      amount: { amount_minor: input.amountMinor, currency: input.fromCurrency },
    },
    destination: {
      currency: input.toCurrency,
      beneficiary: {
        kind: 'WALLET',
        chain: 'BASE',
        address: input.walletAddress,
      },
    },
    constraints: {
      swap_execution: 'onchain',
      ...(input.maxSlippageBps != null ? { max_slippage_bps: input.maxSlippageBps } : {}),
    },
    context: {
      channel: 'WEB',
      correlation_id: `business-dex-swap-${input.idempotencyKey}`,
    },
    metadata: {
      org_id: BUSINESS_ORG_ID,
      submitted_via: 'business_dex_swap',
      source_wallet_id: input.sourceWalletId,
    },
  };

  return intents().submit(
    { idempotencyKey: input.idempotencyKey, intent },
    { orgId: BUSINESS_ORG_ID },
  );
}

export interface SubmitPayrollLineInput {
  lineId: string;
  label: string;
  amountMinor: string;
  currency: string;
  bankCountry: string;
  bankCode: string;
  bankAccount: string;
  accountName?: string;
}

export interface SubmitPayrollInput {
  idempotencyKey: string;
  name: string;
  payPeriod?: string;
  currency: string;
  treasuryAccountRef?: string;
  lines: SubmitPayrollLineInput[];
}

export async function submitPayrollIntent(
  input: SubmitPayrollInput,
): Promise<SubmitTransferResult> {
  const intentId = `itn_${ulid()}`;
  const batchId = `prl_${ulid()}`;
  const treasuryRef = input.treasuryAccountRef ?? businessNgnTreasuryAccountRef();

  let totalMinor = 0n;
  for (const line of input.lines) {
    totalMinor += BigInt(line.amountMinor);
  }

  const intent: Intent = {
    version: '1',
    intent_id: intentId,
    kind: 'PAYROLL',
    actor: { type: 'BUSINESS', id: BUSINESS_ACTOR_ID },
    source: {
      account_ref: treasuryRef,
      amount: { amount_minor: totalMinor.toString(), currency: input.currency },
    },
    destination: {
      currency: input.currency,
      beneficiary: {
        kind: 'INTERNAL_ACCOUNT',
        account_ref: treasuryRef,
      },
    },
    constraints: { preferred_rails: ['FIAT'] },
    context: {
      channel: 'WEB',
      correlation_id: `business-payroll-${input.idempotencyKey}`,
    },
    metadata: {
      org_id: BUSINESS_ORG_ID,
      submitted_via: 'business_dashboard',
      payout_rail: 'FIAT',
      payroll: {
        batch_id: batchId,
        name: input.name,
        pay_period: input.payPeriod,
        items: input.lines.map((line) => ({
          line_id: line.lineId,
          label: line.label,
          amount: { amount_minor: line.amountMinor, currency: line.currency },
          beneficiary: {
            kind: 'BANK' as const,
            country: line.bankCountry,
            bank_code: line.bankCode,
            account_number: line.bankAccount,
            account_name: line.accountName ?? line.label,
          },
        })),
      },
    },
  };

  return intents().submit(
    { idempotencyKey: input.idempotencyKey, intent },
    { orgId: BUSINESS_ORG_ID },
  );
}

export interface SubmitTopupInput {
  idempotencyKey: string;
  amountMinor: string;
  currency: string;
  destinationAccountRef?: string;
  externalReference?: string;
  memo?: string;
}

export async function submitTopupIntent(input: SubmitTopupInput): Promise<SubmitTransferResult> {
  const tx = await execution().createTopup({
    idempotencyKey: input.idempotencyKey,
    actorId: BUSINESS_ACTOR_ID,
    destinationAccountRef: input.destinationAccountRef ?? businessNgnTreasuryAccountRef(),
    amountMinor: input.amountMinor,
    currency: input.currency,
    externalReference: input.externalReference,
    memo: input.memo,
  });

  return {
    intent_id: tx.intent_id ?? input.idempotencyKey,
    state: tx.state,
    execution_transaction_id: tx.id,
  };
}

// ───────────────────────────── Saly L3 money rail (S5 + S6) ─────────────────────────────

export interface L3RailStatus {
  network: string;
  rpcUrl: string;
  usdcAddress: string | null;
  usdcConfigured: boolean;
  routingEnabled: boolean;
}

/**
 * L3 rail configuration, derived from operator env. Mirrors the admin money-rail
 * panel so treasury users see the same readiness signal without coupling the
 * dashboard to the chain adapter.
 */
export function getL3RailStatus(): L3RailStatus {
  const usdcAddress = process.env.L3_USDC_ADDRESS?.trim() || null;
  return {
    network: process.env.L3_NETWORK ?? 'saly-devnet',
    rpcUrl: process.env.L3_L3_RPC_URL ?? 'http://127.0.0.1:9545',
    usdcAddress,
    usdcConfigured: Boolean(usdcAddress),
    routingEnabled: process.env.ROUTING_L3_ENABLED !== 'false',
  };
}

export async function fetchL3Wallets(): Promise<FetchResult<WalletWithBalance[]>> {
  const result = await fetchTreasuryWallets();
  return { ...result, data: result.data.filter((w) => w.chain === 'SALY_L3') };
}

export async function submitL3Payout(input: {
  idempotencyKey: string;
  sourceWalletId: string;
  destinationAddress: string;
  amountMinor: string;
  memo?: string;
}): Promise<SubmitTransferResult> {
  const tx = await execution().l3Payout({
    idempotencyKey: input.idempotencyKey,
    sourceWalletId: input.sourceWalletId,
    destinationAddress: input.destinationAddress,
    amountMinor: input.amountMinor,
    asset: 'USDC',
    memo: input.memo,
  });

  return {
    intent_id: tx.intent_id ?? input.idempotencyKey,
    state: tx.state,
    execution_transaction_id: tx.id,
  };
}

export function buildVolumeSeries(transactions: TransactionDto[], days = 7) {
  const now = new Date();
  const buckets = Array.from({ length: days }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (days - 1 - i));
    return {
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateKey: d.toISOString().slice(0, 10),
      value: 0,
    };
  });

  for (const tx of transactions) {
    const key = tx.created_at.slice(0, 10);
    const bucket = buckets.find((b) => b.dateKey === key);
    if (!bucket) continue;
    const decimals = tx.source.currency === 'XRP' ? 6 : 2;
    bucket.value += Number(BigInt(tx.source.amount_minor)) / 10 ** decimals;
  }

  return buckets.map(({ label, value }) => ({ label, value }));
}

export function computeAnalytics(transactions: TransactionDto[]) {
  const settled = transactions.filter((t) => t.state === 'SETTLED').length;
  const failed = transactions.filter((t) => t.state === 'FAILED' || t.state === 'REJECTED').length;
  const pending = transactions.length - settled - failed;
  const successRate = transactions.length > 0 ? (settled / transactions.length) * 100 : 0;

  const byKind = new Map<string, number>();
  for (const tx of transactions) {
    byKind.set(tx.kind, (byKind.get(tx.kind) ?? 0) + 1);
  }

  return {
    total: transactions.length,
    settled,
    failed,
    pending,
    successRate,
    byKind: [...byKind.entries()].map(([kind, count]) => ({ kind, count })),
  };
}

export async function fetchPaymentLinks(limit = 50): Promise<FetchResult<PaymentLinkDto[]>> {
  try {
    const res = await merchant().listPaymentLinks({ limit }, tenantOpts);
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function fetchCheckoutSessions(limit = 50): Promise<FetchResult<CheckoutSessionDto[]>> {
  try {
    const res = await merchant().listCheckoutSessions({ limit }, tenantOpts);
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function fetchSettlementReports(limit = 25): Promise<FetchResult<SettlementReportDto[]>> {
  try {
    const res = await merchant().listSettlementReports({ limit }, tenantOpts);
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function fetchPublicPaymentLink(slug: string) {
  return merchant().getPublicPaymentLink(slug);
}

export async function openPublicCheckout(
  slug: string,
  input: { customer_name: string; customer_email?: string; idempotency_key: string },
) {
  return merchant().openCheckoutFromLink(slug, input);
}

export async function fetchPublicCheckoutSession(sessionId: string) {
  return merchant().getPublicCheckoutSession(sessionId);
}

export { merchant };
