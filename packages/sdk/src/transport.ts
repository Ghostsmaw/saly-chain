import { SalyApiError, SalyNetworkError } from './errors.js';

/**
 * Minimal HTTP transport for the public SDK. Intentionally narrower than the
 * internal `@salychain/sdk-internal` client:
 *
 *  - Always retries on 429/5xx/connection errors with exponential backoff
 *  - Auto-generates an Idempotency-Key for mutating requests if none provided
 *  - Always adds `Authorization: Bearer ${apiKey}`
 *  - Always adds an `X-Saly-SDK` user-agent so server-side telemetry can
 *    measure SDK adoption / version distribution
 */

export interface ClientOptions {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
  maxRetries?: number;
  /** Set if running inside Cloudflare / Deno / Bun and want to plug in fetch. */
  fetch?: typeof fetch;
  /** Pinned SDK version — used for the X-Saly-SDK header. */
  sdkVersion?: string;
}

export interface RequestInit {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  idempotencyKey?: string;
  noRetry?: boolean;
  signal?: AbortSignal;
}

const RETRYABLE_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);

export class HttpTransport {
  readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly defaultTimeoutMs: number;
  private readonly maxRetries: number;
  private readonly fetcher: typeof fetch;
  private readonly userAgent: string;

  constructor(opts: ClientOptions) {
    if (!opts.apiKey) throw new Error('SalyChain SDK: apiKey is required');
    this.apiKey = opts.apiKey;
    this.baseUrl = (opts.baseUrl ?? 'https://api.saly.network').replace(/\/$/, '');
    this.defaultTimeoutMs = opts.timeoutMs ?? 10_000;
    this.maxRetries = opts.maxRetries ?? 3;
    this.fetcher = opts.fetch ?? fetch;
    this.userAgent = `SalyChain-SDK/${opts.sdkVersion ?? '0.1.0'} (node)`;
  }

  async request<T>(init: RequestInit): Promise<T> {
    const url = this.buildUrl(init.path, init.query);
    const isMutating = init.method !== 'GET';
    const idempotencyKey =
      init.idempotencyKey ?? (isMutating ? generateIdempotencyKey() : undefined);

    const headers: Record<string, string> = {
      accept: 'application/json',
      authorization: `Bearer ${this.apiKey}`,
      'user-agent': this.userAgent,
      'x-saly-sdk': this.userAgent,
    };
    if (init.body !== undefined) headers['content-type'] = 'application/json';
    if (idempotencyKey) headers['idempotency-key'] = idempotencyKey;

    const maxAttempts = init.noRetry ? 1 : this.maxRetries;
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), this.defaultTimeoutMs);
      const signal = composeSignals(controller.signal, init.signal);
      try {
        const response = await this.fetcher(url, {
          method: init.method,
          headers,
          ...(init.body !== undefined
            ? { body: JSON.stringify(init.body, jsonReplacer) }
            : {}),
          signal,
        });
        clearTimeout(timer);

        if (response.ok) {
          if (response.status === 204) return undefined as T;
          const text = await response.text();
          if (!text) return undefined as T;
          return JSON.parse(text) as T;
        }

        if (RETRYABLE_STATUS.has(response.status) && attempt < maxAttempts) {
          await sleep(backoff(attempt));
          continue;
        }

        const errorJson = await response.json().catch(() => ({ error: { code: `http.${response.status}`, message: response.statusText } }));
        const err = (errorJson as { error?: unknown }).error ?? errorJson;
        throw new SalyApiError(err as never, response.status);
      } catch (err) {
        clearTimeout(timer);
        lastError = err;
        if (err instanceof SalyApiError) throw err;
        if (attempt >= maxAttempts) break;
        // Network / timeout / abort → retry
        await sleep(backoff(attempt));
      }
    }

    throw new SalyNetworkError(
      `Failed to reach SalyChain at ${this.baseUrl} after ${maxAttempts} attempts`,
      lastError,
    );
  }

  private buildUrl(path: string, query?: RequestInit['query']): string {
    const url = new URL(`${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`);
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
      }
    }
    return url.toString();
  }
}

function generateIdempotencyKey(): string {
  // Simple ULID-ish. We deliberately avoid pulling in a ULID dep to keep the SDK
  // surface small. Callers should provide their own key for any retryable flow.
  const rand = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  return `idem_${Date.now().toString(36)}_${rand.slice(0, 20)}`;
}

function backoff(attempt: number): number {
  const base = 100 * 2 ** (attempt - 1);
  return Math.min(2_000, base + Math.floor(Math.random() * base));
}

function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

function composeSignals(...signals: Array<AbortSignal | undefined>): AbortSignal {
  const real = signals.filter((s): s is AbortSignal => Boolean(s));
  if (real.length === 0) return new AbortController().signal;
  if (real.length === 1) return real[0]!;
  const controller = new AbortController();
  for (const s of real) {
    if (s.aborted) controller.abort();
    else s.addEventListener('abort', () => controller.abort(), { once: true });
  }
  return controller.signal;
}

function jsonReplacer(_key: string, value: unknown): unknown {
  if (typeof value === 'bigint') return value.toString();
  return value;
}
