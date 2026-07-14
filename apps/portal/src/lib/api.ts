import {
  ApiKeysClient,
  IntentClient,
  WebhooksClient,
  ExecutionClient,
  type PublicApiKey,
  type PublicSubscription,
  type DeliveryDto,
  type IntentRecordDto,
  type TransactionDto,
} from '@salychain/sdk-internal';

/**
 * Server-side wiring to the internal services. In production the portal sits
 * behind SSO and the org is derived from the authenticated session; until that
 * is wired end-to-end the org is taken from `PORTAL_ORG_ID`.
 *
 * Each fetch wraps unavailability into a graceful `source: 'unavailable'` so
 * the portal degrades cleanly when an upstream service is offline.
 */

const APIKEYS_URL = process.env.APIKEYS_BASE_URL ?? 'http://localhost:4009';
const WEBHOOKS_URL = process.env.WEBHOOKS_BASE_URL ?? 'http://localhost:4010';
const INTENT_URL = process.env.INTENT_BASE_URL ?? 'http://localhost:4008';
const EXECUTION_URL = process.env.EXECUTION_BASE_URL ?? 'http://localhost:4003';

/**
 * Resolve the org the portal is operating on behalf of. Fail-closed in
 * production: there is no silent demo-org fallback, so a misconfigured deploy
 * errors loudly instead of leaking into / from the wrong tenant. The dev/test
 * fallback keeps local DX frictionless.
 */
export function resolveOrgId(): string {
  const fromEnv = process.env.PORTAL_ORG_ID ?? process.env.PORTAL_DEMO_ORG_ID;
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('PORTAL_ORG_ID must be set in production (no demo-org fallback).');
  }
  return 'org_demo_acme';
}

let apiKeys: ApiKeysClient | null = null;
let webhooks: WebhooksClient | null = null;
let intents: IntentClient | null = null;
let execution: ExecutionClient | null = null;

function getApiKeys(): ApiKeysClient {
  if (!apiKeys) apiKeys = new ApiKeysClient({ baseUrl: APIKEYS_URL });
  return apiKeys;
}
function getWebhooks(): WebhooksClient {
  if (!webhooks) webhooks = new WebhooksClient({ baseUrl: WEBHOOKS_URL });
  return webhooks;
}
function getIntents(): IntentClient {
  if (!intents) intents = new IntentClient({ baseUrl: INTENT_URL });
  return intents;
}
function getExecution(): ExecutionClient {
  if (!execution) execution = new ExecutionClient({ baseUrl: EXECUTION_URL });
  return execution;
}

export type FetchResult<T> = { data: T; source: 'live' | 'unavailable' };

export async function listApiKeys(): Promise<FetchResult<PublicApiKey[]>> {
  try {
    const res = await getApiKeys().list(resolveOrgId());
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function listSubscriptions(): Promise<FetchResult<PublicSubscription[]>> {
  try {
    const res = await getWebhooks().list(resolveOrgId());
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function listDeliveries(subId: string): Promise<FetchResult<DeliveryDto[]>> {
  try {
    const res = await getWebhooks().listDeliveries(subId);
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function listIntents(limit = 25): Promise<FetchResult<IntentRecordDto[]>> {
  try {
    const res = await getIntents().list({ limit });
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

const GATEWAY_URL = process.env.GATEWAY_BASE_URL ?? 'http://localhost:4000';
const PORTAL_INTERNAL_SECRET = process.env.PORTAL_INTERNAL_SECRET ?? 'dev-portal-secret';

export interface RequestLogDto {
  id: string;
  api_key_id?: string;
  org_id?: string;
  method: string;
  path: string;
  status: number;
  latency_ms: number;
  ip?: string;
  user_agent?: string;
  correlation_id: string;
  occurred_at: string;
}

export interface RequestLogSummaryDto {
  window_hours: number;
  total_requests: number;
  error_count: number;
  error_rate_pct: number;
  latency_p95_ms: number;
  top_paths: Array<{ path: string; count: number }>;
}

async function gatewayFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${GATEWAY_URL}/v1${path}`, {
    headers: { 'X-Portal-Secret': PORTAL_INTERNAL_SECRET },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`gateway ${res.status}`);
  return res.json() as Promise<T>;
}

export async function listRequestLogs(limit = 100): Promise<FetchResult<RequestLogDto[]>> {
  try {
    const res = await gatewayFetch<{ data: RequestLogDto[] }>(
      `/internal/logs?org_id=${encodeURIComponent(resolveOrgId())}&limit=${limit}`,
    );
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

export async function summarizeRequestLogs(
  windowHours = 24,
): Promise<FetchResult<RequestLogSummaryDto>> {
  try {
    const data = await gatewayFetch<RequestLogSummaryDto>(
      `/internal/logs/summary?org_id=${encodeURIComponent(resolveOrgId())}&window_hours=${windowHours}`,
    );
    return { data, source: 'live' };
  } catch {
    return {
      data: {
        window_hours: windowHours,
        total_requests: 0,
        error_count: 0,
        error_rate_pct: 0,
        latency_p95_ms: 0,
        top_paths: [],
      },
      source: 'unavailable',
    };
  }
}

export async function listTransactions(limit = 25): Promise<FetchResult<TransactionDto[]>> {
  try {
    const res = await getExecution().listTransactions({ limit });
    return { data: res.data, source: 'live' };
  } catch {
    return { data: [], source: 'unavailable' };
  }
}

// ───────────────────────── Mutations (server actions / route handlers) ─────────────────────────

function mutationError(err: unknown): string {
  if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
    return err.message;
  }
  return 'Request failed';
}

export async function issueApiKey(input: {
  environment: 'TEST' | 'LIVE';
  scopes: string[];
  description?: string;
  rateLimitPerMin?: number;
  ipAllowList?: string[];
}): Promise<{ secret: string; apiKey: PublicApiKey }> {
  return getApiKeys().issue({
    orgId: resolveOrgId(),
    environment: input.environment,
    scopes: input.scopes,
    description: input.description,
    rateLimitPerMin: input.rateLimitPerMin,
    ipAllowList: input.ipAllowList,
    createdBy: 'portal',
  });
}

export async function rotateApiKey(id: string, reason: string) {
  return getApiKeys().rotate(id, reason, 'portal');
}

export async function revokeApiKey(id: string, reason: string) {
  return getApiKeys().revoke(id, reason);
}

export async function createWebhookSubscription(input: {
  url: string;
  subjects: string[];
  description?: string;
}) {
  return getWebhooks().create({
    orgId: resolveOrgId(),
    url: input.url,
    subjects: input.subjects,
    description: input.description,
  });
}

export async function rotateWebhookSubscriptionSecret(id: string) {
  return getWebhooks().rotateSecret(id);
}

export async function setWebhookSubscriptionStatus(
  id: string,
  status: 'ACTIVE' | 'PAUSED' | 'DISABLED',
) {
  return getWebhooks().setStatus(id, status);
}

export async function deleteWebhookSubscription(id: string) {
  return getWebhooks().delete(id);
}

export { mutationError };
