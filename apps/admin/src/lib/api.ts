import {
  ComplianceClient,
  ExecutionClient,
  IntentClient,
  LiquidityClient,
  RoutingClient,
  AgentsClient,
  SignerClient,
  RiskClient,
  WalletClient,
  IdentityClient,
  ContractRegistryClient,
  AdminClient,
  type SignerHealth,
  type RatePairsResponse,
  type TransactionDto,
  type IntentRecordDto,
  type RiskSummary,
  type RiskAssessmentListItem,
  type RiskActorProfile,
  type WalletDto,
  type WalletStats,
  type TransferListItem,
  type QuoteListItem,
  type UserDto,
  type AuthRole,
  type DeployedContractDto,
  type ContractUpgradeDto,
  type PlatformSettingsDto,
  type AdminMemberDto,
  type AdminMemberInviteDto,
  type RbacRoleDto,
  type FeatureFlagDto,
  type AuditEntryDto,
  type VerificationRequirementDto,
  type OnboardingStatusDto,
  type ComplianceCaseDto,
  type DelegationDto,
} from '@salychain/sdk-internal';

/**
 * Server-side API surface for the admin dashboard.
 *
 * Defaults are wired to a local dev stack. We deliberately return null /
 * sentinel results rather than throwing when an upstream service is down,
 * so the dashboard remains useful even when individual services are offline.
 */

const EXECUTION_URL = process.env.EXECUTION_BASE_URL ?? 'http://localhost:4003';
const INTENT_URL = process.env.INTENT_BASE_URL ?? 'http://localhost:4008';
const COMPLIANCE_URL = process.env.COMPLIANCE_BASE_URL ?? 'http://localhost:4004';
const ROUTING_URL = process.env.ROUTING_BASE_URL ?? 'http://localhost:4007';
const AGENTS_URL = process.env.AGENTS_BASE_URL ?? 'http://localhost:4011';
const LIQUIDITY_URL = process.env.LIQUIDITY_BASE_URL ?? 'http://localhost:4006';
const SIGNER_URL = process.env.SIGNER_BASE_URL ?? 'http://localhost:4099';
const RISK_URL = process.env.RISK_BASE_URL ?? 'http://localhost:4005';
const WALLET_URL = process.env.WALLET_BASE_URL ?? 'http://localhost:4002';
const IDENTITY_URL = process.env.IDENTITY_BASE_URL ?? 'http://localhost:4012';
const CONTRACT_REGISTRY_URL = process.env.CONTRACT_REGISTRY_BASE_URL ?? 'http://localhost:4013';
const ADMIN_URL = process.env.ADMIN_BASE_URL ?? 'http://localhost:4014';

let executionClient: ExecutionClient | null = null;
let intentClient: IntentClient | null = null;
let complianceClient: ComplianceClient | null = null;
let routingClient: RoutingClient | null = null;
let agentsClient: AgentsClient | null = null;
let liquidityClient: LiquidityClient | null = null;
let riskClient: RiskClient | null = null;
let walletClient: WalletClient | null = null;

function execution(): ExecutionClient {
  if (!executionClient) executionClient = new ExecutionClient({ baseUrl: EXECUTION_URL });
  return executionClient;
}
function intents(): IntentClient {
  if (!intentClient) intentClient = new IntentClient({ baseUrl: INTENT_URL });
  return intentClient;
}
function compliance(): ComplianceClient {
  if (!complianceClient) complianceClient = new ComplianceClient({ baseUrl: COMPLIANCE_URL });
  return complianceClient;
}
function routing(): RoutingClient {
  if (!routingClient) routingClient = new RoutingClient({ baseUrl: ROUTING_URL });
  return routingClient;
}
function agents(): AgentsClient {
  if (!agentsClient) agentsClient = new AgentsClient({ baseUrl: AGENTS_URL });
  return agentsClient;
}
function liquidity(): LiquidityClient {
  if (!liquidityClient) liquidityClient = new LiquidityClient({ baseUrl: LIQUIDITY_URL });
  return liquidityClient;
}
function risk(): RiskClient {
  if (!riskClient) riskClient = new RiskClient({ baseUrl: RISK_URL });
  return riskClient;
}
function wallet(): WalletClient {
  if (!walletClient) walletClient = new WalletClient({ baseUrl: WALLET_URL });
  return walletClient;
}
let signerClient: SignerClient | null = null;
function signer(): SignerClient {
  if (!signerClient) signerClient = new SignerClient({ baseUrl: SIGNER_URL });
  return signerClient;
}
let identityClient: IdentityClient | null = null;
function identity(): IdentityClient {
  if (!identityClient) identityClient = new IdentityClient({ baseUrl: IDENTITY_URL });
  return identityClient;
}
let contractRegistryClient: ContractRegistryClient | null = null;
function contractRegistry(): ContractRegistryClient {
  if (!contractRegistryClient) contractRegistryClient = new ContractRegistryClient({ baseUrl: CONTRACT_REGISTRY_URL });
  return contractRegistryClient;
}
let adminClient: AdminClient | null = null;
function adminService(): AdminClient {
  if (!adminClient) adminClient = new AdminClient({ baseUrl: ADMIN_URL });
  return adminClient;
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

export type FetchResult<T> = { data: T; source: 'live' | 'unavailable' };

export async function fetchRecentTransactions(limit = 8): Promise<FetchResult<TransactionDto[]>> {
  try {
    const res = await execution().listTransactions({ limit });
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function fetchTransactions(
  query: { limit?: number; kind?: TransactionDto['kind']; state?: TransactionDto['state'] } = {},
): Promise<FetchResult<TransactionDto[]>> {
  try {
    const res = await execution().listTransactions(query);
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

export async function fetchRecentIntents(limit = 25): Promise<FetchResult<IntentRecordDto[]>> {
  try {
    const res = await intents().list({ limit });
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function fetchIntent(intentId: string): Promise<IntentRecordDto | null> {
  try {
    return await intents().getById(intentId);
  } catch {
    return null;
  }
}

export interface ComplianceCaseListItem {
  id: string;
  status: string;
  priority: string;
  summary: string;
  subject?: {
    external_ref?: string;
    display_name?: string;
    country_code?: string;
    tier?: string;
  };
  created_at: string;
  updated_at?: string;
  resolved_at?: string | null;
  intent_id?: string;
  transaction_id?: string;
}

export async function fetchComplianceCases(limit = 25): Promise<FetchResult<ComplianceCaseListItem[]>> {
  try {
    const res = await fetch(`${COMPLIANCE_URL}/v1/cases?limit=${limit}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as { data: ComplianceCaseListItem[] };
    return { data: json.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export interface ComplianceProviderStatus {
  active: string;
  configured: string[];
  vendors: Array<{ name: string; enabled: boolean; role: string }>;
}

export async function fetchComplianceProviderStatus(): Promise<FetchResult<ComplianceProviderStatus>> {
  try {
    const res = await fetch(`${COMPLIANCE_URL}/v1/screening/provider`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as ComplianceProviderStatus;
    return { data, source: 'live' };
  } catch {
    return {
      data: {
        active: 'unavailable',
        configured: [],
        vendors: [
          { name: 'embedded', enabled: false, role: 'Country risk + dev address samples' },
          { name: 'chainalysis', enabled: false, role: 'On-chain address screening' },
          { name: 'comply', enabled: false, role: 'Sanctions, PEP, adverse media' },
          { name: 'refinitiv', enabled: false, role: 'World-Check watchlist' },
        ],
      },
      source: 'unavailable',
    };
  }
}

export async function fetchComplianceCase(id: string): Promise<FetchResult<ComplianceCaseListItem | null>> {
  try {
    const res = await fetch(`${COMPLIANCE_URL}/v1/cases/${encodeURIComponent(id)}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as ComplianceCaseListItem;
    return { data, source: 'live' };
  } catch {
    return { data: null, source: 'unavailable' };
  }
}

export async function fetchSignerHealth(): Promise<FetchResult<SignerHealth>> {
  try {
    const data = await signer().health();
    return { data, source: 'live' };
  } catch {
    return {
      data: {
        ok: false,
        kms_available: false,
        kms_provider: 'unavailable',
        wrapping_key_ref: '—',
        version: '0.0.0',
      },
      source: 'unavailable',
    };
  }
}

export interface RouteDecisionListItem {
  id: string;
  intent_id?: string;
  selected_rail: string;
  selected_score: number;
  rationale: string;
  created_at: string;
  candidates: unknown;
  input: unknown;
}

export async function fetchRouteDecisions(limit = 25): Promise<FetchResult<RouteDecisionListItem[]>> {
  try {
    const res = await fetch(`${ROUTING_URL}/v1/routing/decisions?limit=${limit}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as { data: RouteDecisionListItem[] };
    return { data: json.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function listPendingSpendApprovals(): Promise<FetchResult<SpendApprovalListItem[]>> {
  try {
    const agentList = await agents().list({ limit: 50 });
    const pending = await Promise.all(
      agentList.data.map(async (agent) => {
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
  const approverId = process.env.ADMIN_APPROVER_USER_ID;
  if (!approverId?.startsWith('usr_')) {
    throw new Error(
      'ADMIN_APPROVER_USER_ID is not configured (set to a usr_* id — see docs/runbooks/s4-agent-high-value-spend-approval.md)',
    );
  }
  return agents().voteSpendApproval(agentId, requestId, approverId);
}

export async function fetchFxRates(): Promise<FetchResult<RatePairsResponse>> {
  try {
    const data = await liquidity().listRatePairs();
    return { data, source: 'live' };
  } catch {
    return {
      data: { provider: 'unavailable', pairs: [] },
      source: 'unavailable',
    };
  }
}

export async function fetchRecentQuotes(limit = 25): Promise<FetchResult<QuoteListItem[]>> {
  try {
    const res = await liquidity().listRecentQuotes({ limit });
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function fetchRiskSummary(): Promise<FetchResult<RiskSummary>> {
  try {
    const data = await risk().getSummary();
    return { data, source: 'live' };
  } catch {
    return {
      data: {
        thresholds: { review: 60, block: 85 },
        last_24h: { total: 0, ALLOW: 0, REVIEW: 0, BLOCK: 0 },
        pending_review_24h: 0,
        actor_profiles: 0,
      },
      source: 'unavailable',
    };
  }
}

export async function fetchRiskAssessments(limit = 50): Promise<FetchResult<RiskAssessmentListItem[]>> {
  try {
    const res = await risk().listAssessments({ limit });
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function fetchRiskActors(limit = 15): Promise<FetchResult<RiskActorProfile[]>> {
  try {
    const res = await risk().listActors({ limit });
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function fetchWallets(limit = 50): Promise<FetchResult<WalletDto[]>> {
  try {
    const res = await wallet().listWallets({ limit });
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function fetchWalletStats(): Promise<FetchResult<WalletStats>> {
  try {
    const data = await wallet().getStats();
    return { data, source: 'live' };
  } catch {
    return {
      data: { total: 0, pending_broadcasts: 0, by_status: {}, by_chain: {} },
      source: 'unavailable',
    };
  }
}

export async function fetchBroadcastJobs(limit = 30): Promise<FetchResult<TransferListItem[]>> {
  try {
    const res = await wallet().listTransfers({ limit });
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

/* ─────────────────────── dashboard aggregators ──────────────────────── */

export interface DashboardKpis {
  wallets: { total: number; pending_broadcasts: number; by_chain: Record<string, number> };
  risk: RiskSummary;
  compliance: { open: number; critical: number };
  fx: { provider: string; pairsLive: number; pairs: RatePairsResponse['pairs'] };
  signer: SignerHealth & { source: 'live' | 'unavailable' };
}

export async function fetchDashboardKpis(): Promise<DashboardKpis> {
  const [walletRes, riskRes, complianceRes, fxRes, signerRes] = await Promise.allSettled([
    fetchWalletStats(),
    fetchRiskSummary(),
    fetchComplianceCases(50),
    fetchFxRates(),
    fetchSignerHealth(),
  ]);

  const wallets =
    walletRes.status === 'fulfilled'
      ? walletRes.value.data
      : { total: 0, pending_broadcasts: 0, by_status: {}, by_chain: {} };

  const risk =
    riskRes.status === 'fulfilled'
      ? riskRes.value.data
      : { thresholds: { review: 60, block: 85 }, last_24h: { total: 0, ALLOW: 0, REVIEW: 0, BLOCK: 0 }, pending_review_24h: 0, actor_profiles: 0 };

  const complianceCases = complianceRes.status === 'fulfilled' ? complianceRes.value.data : [];
  const open = complianceCases.filter((c) => c.status === 'OPEN' || c.status === 'IN_REVIEW').length;
  const critical = complianceCases.filter((c) => c.priority === 'CRITICAL' || c.priority === 'HIGH').length;

  const fxData = fxRes.status === 'fulfilled' ? fxRes.value.data : { provider: 'unavailable', pairs: [] };
  const pairsLive = fxData.pairs.filter((p) => p.available).length;

  const signerRaw = signerRes.status === 'fulfilled' ? signerRes.value : { data: { ok: false, kms_available: false, kms_provider: 'unavailable', wrapping_key_ref: '—', version: '0.0.0' }, source: 'unavailable' as const };

  return {
    wallets,
    risk,
    compliance: { open, critical },
    fx: { provider: fxData.provider, pairsLive, pairs: fxData.pairs },
    signer: { ...signerRaw.data, source: signerRaw.source },
  };
}

export interface RiskEventItem {
  id: string;
  kind: 'risk' | 'compliance';
  title: string;
  detail: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  when: string;
}

export async function fetchRecentRiskEvents(limit = 6): Promise<{ data: RiskEventItem[]; source: 'live' | 'unavailable' }> {
  const [assessmentsRes, casesRes] = await Promise.allSettled([
    fetchRiskAssessments(limit),
    fetchComplianceCases(limit),
  ]);

  const assessments = assessmentsRes.status === 'fulfilled' ? assessmentsRes.value : { data: [], source: 'unavailable' as const };
  const cases = casesRes.status === 'fulfilled' ? casesRes.value : { data: [], source: 'unavailable' as const };

  if (assessments.source === 'unavailable' && cases.source === 'unavailable') {
    return { data: [], source: 'unavailable' };
  }

  const fromAssessments: RiskEventItem[] = assessments.data.slice(0, limit).map((a) => ({
    id: a.id,
    kind: 'risk' as const,
    title: `Risk ${a.decision} — score ${a.final_score}`,
    detail: a.actor_external_ref ?? 'Unknown actor',
    severity: a.final_score >= 85 ? 'critical' : a.final_score >= 60 ? 'high' : a.final_score >= 35 ? 'medium' : 'low',
    when: a.created_at,
  }));

  const fromCases: RiskEventItem[] = cases.data.slice(0, limit).map((c) => ({
    id: c.id,
    kind: 'compliance' as const,
    title: c.summary,
    detail: c.subject?.display_name ?? c.subject?.external_ref ?? 'Unknown subject',
    severity: c.priority === 'CRITICAL' ? 'critical' : c.priority === 'HIGH' ? 'high' : c.priority === 'MEDIUM' ? 'medium' : 'low',
    when: c.created_at,
  }));

  const merged = [...fromAssessments, ...fromCases]
    .sort((a, b) => new Date(b.when).getTime() - new Date(a.when).getTime())
    .slice(0, limit);

  return { data: merged, source: 'live' };
}

/* ─────────────────────────── identity / accounts ─────────────────────────── */

export interface PlatformUsers {
  data: UserDto[];
  total: number;
  by_role: Record<string, number>;
}

export async function fetchPlatformUsers(
  opts: { role?: AuthRole; limit?: number } = {},
): Promise<FetchResult<PlatformUsers>> {
  try {
    const res = await identity().listUsers({ limit: opts.limit ?? 200, role: opts.role });
    return { data: res, source: 'live' };
  } catch {
    return { data: { data: [], total: 0, by_role: {} }, source: 'unavailable' };
  }
}

export async function fetchPlatformUser(id: string): Promise<FetchResult<UserDto | null>> {
  try {
    const user = await identity().getUser(id);
    return { data: user, source: 'live' };
  } catch {
    return { data: null, source: 'unavailable' };
  }
}

export interface AccountDetail {
  user: UserDto;
  onboarding: OnboardingStatusDto | null;
  tier: { tier: string; updated_at: string | null } | null;
  wallets: WalletDto[];
  complianceCases: ComplianceCaseDto[];
  delegations: DelegationDto[];
}

export async function fetchAccountDetail(id: string): Promise<FetchResult<AccountDetail | null>> {
  try {
    const user = await identity().getUser(id);

    const [onboardingRes, tierRes, walletsRes, casesRes, delegationsRes] = await Promise.allSettled([
      compliance().getOnboarding(id),
      compliance().getTier(id),
      wallet().listWalletsByActor({ actorRef: id }),
      compliance().listCases({ limit: 200 }),
      identity().listDelegations({ userId: id }),
    ]);

    const onboarding =
      onboardingRes.status === 'fulfilled' && onboardingRes.value.status !== 'not_started'
        ? onboardingRes.value
        : onboardingRes.status === 'fulfilled'
          ? onboardingRes.value
          : null;

    const tier = tierRes.status === 'fulfilled' ? tierRes.value : null;
    const wallets = walletsRes.status === 'fulfilled' ? walletsRes.value.data : [];
    const allCases = casesRes.status === 'fulfilled' ? casesRes.value.data : [];
    const complianceCases = allCases.filter((c) => c.subject?.external_ref === id);
    const delegations = delegationsRes.status === 'fulfilled' ? delegationsRes.value.data : [];

    return {
      data: { user, onboarding, tier, wallets, complianceCases, delegations },
      source: 'live',
    };
  } catch {
    return { data: null, source: 'unavailable' };
  }
}

/* ─────────────────────────── platform service health ─────────────────────────── */

export interface ServiceHealthRow {
  key: string;
  name: string;
  category: string;
  status: 'operational' | 'degraded' | 'down';
  detail: string;
  envKey: string;
}

/**
 * Probes the real backend services the admin console depends on and reports
 * their live status. Replaces the previous hardcoded integration catalogue.
 */
export async function fetchServiceIntegrations(): Promise<ServiceHealthRow[]> {
  const [signerRes, fxRes, walletRes, riskRes, screeningRes, routingRes] = await Promise.allSettled([
    fetchSignerHealth(),
    fetchFxRates(),
    fetchWalletStats(),
    fetchRiskSummary(),
    fetchComplianceProviderStatus(),
    fetchRouteDecisions(1),
  ]);

  const live = <T,>(r: PromiseSettledResult<{ source: 'live' | 'unavailable' }>): boolean =>
    r.status === 'fulfilled' && r.value.source === 'live';

  const signerLive = signerRes.status === 'fulfilled' && signerRes.value.source === 'live';
  const fxLive = live(fxRes);
  const fxPairs = fxRes.status === 'fulfilled' ? fxRes.value.data.pairs.filter((p) => p.available).length : 0;
  const walletLive = live(walletRes);
  const walletTotal = walletRes.status === 'fulfilled' ? walletRes.value.data.total : 0;
  const riskLive = live(riskRes);
  const screeningLive = live(screeningRes);
  const screeningActive = screeningRes.status === 'fulfilled' ? screeningRes.value.data.active : 'unavailable';
  const routingLive = routingRes.status === 'fulfilled' && routingRes.value.source === 'live';

  return [
    {
      key: 'signer',
      name: 'Signer / KMS',
      category: 'Custody',
      status: signerLive ? 'operational' : 'down',
      detail: signerLive ? `KMS: ${signerRes.value.data.kms_provider}` : 'Unreachable',
      envKey: 'SIGNER_BASE_URL',
    },
    {
      key: 'liquidity',
      name: 'Liquidity / FX',
      category: 'FX / Liquidity',
      status: fxLive ? 'operational' : 'down',
      detail: fxLive ? `${fxPairs} pairs live` : 'Unreachable',
      envKey: 'LIQUIDITY_BASE_URL',
    },
    {
      key: 'wallet',
      name: 'Wallet service',
      category: 'Custody',
      status: walletLive ? 'operational' : 'down',
      detail: walletLive ? `${walletTotal} wallets` : 'Unreachable',
      envKey: 'WALLET_BASE_URL',
    },
    {
      key: 'risk',
      name: 'Risk engine',
      category: 'Risk / Compliance',
      status: riskLive ? 'operational' : 'down',
      detail: riskLive ? 'Scoring online' : 'Unreachable',
      envKey: 'RISK_BASE_URL',
    },
    {
      key: 'compliance',
      name: 'Compliance screening',
      category: 'Risk / Compliance',
      status: screeningLive ? 'operational' : 'down',
      detail: screeningLive ? `Provider: ${screeningActive}` : 'Unreachable',
      envKey: 'COMPLIANCE_BASE_URL',
    },
    {
      key: 'routing',
      name: 'Routing service',
      category: 'Orchestration',
      status: routingLive ? 'operational' : 'down',
      detail: routingLive ? 'Decisions online' : 'Unreachable',
      envKey: 'ROUTING_BASE_URL',
    },
  ];
}

/* ─────────────────────────── analytics (derived) ─────────────────────────── */

export interface VolumePoint {
  label: string;
  value: number;
}

export interface AnalyticsData {
  totalTransactions: number;
  settled: number;
  failed: number;
  byKind: Record<string, number>;
  byState: Record<string, number>;
  dailyVolume: VolumePoint[];
}

/**
 * Derives analytics from the execution service's transaction history. This is
 * real data (transaction counts/outcomes/rails); monetary GMV is intentionally
 * omitted because there is no settled-amount aggregation service yet.
 */
export async function fetchAnalytics(limit = 500): Promise<FetchResult<AnalyticsData>> {
  try {
    const res = await execution().listTransactions({ limit });
    const txs = res.data;
    const byKind: Record<string, number> = {};
    const byState: Record<string, number> = {};
    const dayCounts = new Map<string, number>();

    for (const t of txs) {
      byKind[t.kind] = (byKind[t.kind] ?? 0) + 1;
      byState[t.state] = (byState[t.state] ?? 0) + 1;
      const created = (t as { created_at?: string }).created_at;
      if (created) {
        const day = created.slice(0, 10);
        dayCounts.set(day, (dayCounts.get(day) ?? 0) + 1);
      }
    }

    const dailyVolume: VolumePoint[] = [...dayCounts.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([day, count]) => ({ label: day.slice(5), value: count }));

    return {
      data: {
        totalTransactions: txs.length,
        settled: byState['SETTLED'] ?? 0,
        failed: (byState['FAILED'] ?? 0) + (byState['REJECTED'] ?? 0) + (byState['REVERSED'] ?? 0),
        byKind,
        byState,
        dailyVolume,
      },
      source: 'live',
    };
  } catch {
    return {
      data: { totalTransactions: 0, settled: 0, failed: 0, byKind: {}, byState: {}, dailyVolume: [] },
      source: 'unavailable',
    };
  }
}

/* ─────────────────────────── contract registry ─────────────────────────── */

export type ContractStatus = DeployedContractDto['status'];

export interface DeployedContract {
  id: string;
  name: string;
  purpose: string;
  network: string;
  address: string;
  version: string;
  status: ContractStatus;
  tvlUsd: number;
  audited: boolean;
  deployed: string;
}

export interface ContractUpgrade {
  id: string;
  contract: string;
  from: string;
  to: string;
  when: string;
  by: string;
}

function mapContract(c: DeployedContractDto): DeployedContract {
  return {
    id: c.id,
    name: c.name,
    purpose: c.purpose,
    network: c.network,
    address: c.address,
    version: c.version,
    status: c.status,
    tvlUsd: c.tvl_usd,
    audited: c.audited,
    deployed: c.deployed,
  };
}

function mapUpgrade(u: ContractUpgradeDto): ContractUpgrade {
  return { id: u.id, contract: u.contract, from: u.from, to: u.to, when: u.when, by: u.by };
}

export async function fetchContracts(): Promise<FetchResult<DeployedContract[]>> {
  try {
    const res = await contractRegistry().listContracts();
    return { data: res.data.map(mapContract), source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function fetchContractUpgrades(): Promise<FetchResult<ContractUpgrade[]>> {
  try {
    const res = await contractRegistry().listUpgrades();
    return { data: res.data.map(mapUpgrade), source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function proposeContractStatus(
  contractId: string,
  action: 'pause' | 'resume',
  actorRef?: string,
): Promise<{ status: ContractStatus; message: string }> {
  const res = await contractRegistry().proposeStatus(contractId, { action, actor_ref: actorRef });
  return { status: res.status, message: res.message };
}

/* ─────────────────────────── admin / RBAC settings ─────────────────────────── */

export type AdminSettingsBundle = {
  general: PlatformSettingsDto;
  team: AdminMemberDto[];
  roles: RbacRoleDto[];
  flags: FeatureFlagDto[];
  verificationRequirements: VerificationRequirementDto[];
  audit: AuditEntryDto[];
};

export async function fetchAdminSettings(): Promise<FetchResult<AdminSettingsBundle>> {
  try {
    const [general, team, roles, flags, verificationRequirements, audit] = await Promise.all([
      adminService().getGeneralSettings(),
      adminService().listTeam(),
      adminService().listRoles(),
      adminService().listFlags(),
      adminService().listVerificationRequirements(),
      adminService().listAudit({ limit: 50 }),
    ]);
    return {
      data: {
        general,
        team: team.data,
        roles: roles.data,
        flags: flags.data,
        verificationRequirements: verificationRequirements.data,
        audit: audit.data,
      },
      source: 'live',
    };
  } catch {
    return {
      data: {
        general: {
          org_name: '',
          support_email: '',
          region: '',
          security: { enforce_mfa: false, ip_allowlist: false, sso: false, session_timeout: false },
          notifications: { risk_alerts: false, settlements: false, weekly_digest: false },
          updated_at: '',
        },
        team: [],
        roles: [],
        flags: [],
        verificationRequirements: [],
        audit: [],
      },
      source: 'unavailable',
    };
  }
}

export async function updatePlatformSettings(
  input: Parameters<AdminClient['updateGeneralSettings']>[0],
): Promise<PlatformSettingsDto> {
  return adminService().updateGeneralSettings(input);
}

export async function updateFeatureFlag(
  id: string,
  enabled: boolean,
  actorRef?: string,
): Promise<FeatureFlagDto> {
  return adminService().updateFlag(id, { enabled, actor_ref: actorRef });
}

export async function inviteAdminMember(input: {
  name: string;
  email: string;
  role_name: string;
  actor_ref?: string;
}): Promise<AdminMemberInviteDto> {
  return adminService().inviteTeamMember(input);
}

export async function revokeAdminMember(
  id: string,
  actorRef?: string,
  actorEmail?: string,
): Promise<{ id: string; name: string; email: string }> {
  return adminService().removeTeamMember(id, { actor_ref: actorRef, actor_email: actorEmail });
}

export async function createRbacRole(input: {
  name: string;
  permissions: string[];
  tone?: RbacRoleDto['tone'];
  actor_ref?: string;
}): Promise<RbacRoleDto> {
  return adminService().createRole(input);
}

export async function updateRbacRole(
  id: string,
  input: { permissions: string[]; tone?: RbacRoleDto['tone']; actor_ref?: string },
): Promise<RbacRoleDto> {
  return adminService().updateRole(id, input);
}

export async function createVerificationRequirement(input: {
  label: string;
  description?: string;
  category: 'kyb' | 'kyc';
  input_type: 'document' | 'information';
  field_key: string;
  step_key: string;
  value_format?: string;
  placeholder?: string;
  accept?: string;
  sort_order?: number;
  target_business: boolean;
  target_developer: boolean;
  is_active?: boolean;
  actor_ref?: string;
}): Promise<VerificationRequirementDto> {
  return adminService().createVerificationRequirement(input);
}

export async function updateVerificationRequirement(
  id: string,
  input: {
    label?: string;
    description?: string;
    step_key?: string;
    value_format?: string | null;
    placeholder?: string | null;
    accept?: string | null;
    target_business?: boolean;
    target_developer?: boolean;
    is_active?: boolean;
    sort_order?: number;
    actor_ref?: string;
  },
): Promise<VerificationRequirementDto> {
  return adminService().updateVerificationRequirement(id, input);
}

export async function deleteVerificationRequirement(
  id: string,
  input: { actor_ref?: string } = {},
): Promise<{ id: string; label: string }> {
  return adminService().deleteVerificationRequirement(id, input);
}

export async function fetchAuditExportCsv(limit = 500): Promise<string> {
  const res = await fetch(`${ADMIN_URL}/v1/settings/audit/export?limit=${limit}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Audit export failed (${res.status})`);
  return res.text();
}

// Keep the unused-import noise out in production while preserving the symbols
// for tree-shakeable imports above.
void compliance;
void routing;
void risk;
void wallet;
