import { ulid } from 'ulid';
import { ExternalError, SalyChainError } from '@salychain/errors';
import type { Logger } from '@salychain/logger';
import {
  getTenant,
  HEADER_CORRELATION_ID,
  HEADER_ENVIRONMENT,
  HEADER_ORG_ID,
} from './tenant-context.js';

/**
 * The transport layer used by every internal service client.
 *
 * Hard-coded behaviour that callers don't get to opt out of:
 *  - timeout (default 5s) — fail fast, the caller chooses what to do
 *  - exponential backoff with full jitter on retryable status codes
 *  - automatic `x-correlation-id` propagation
 *  - automatic `x-idempotency-key` generation on mutating methods if the
 *    caller didn't provide one (avoids accidental at-least-once dupes)
 *  - automatic `x-internal-token` attachment from INTERNAL_SERVICE_TOKEN so
 *    every internal service call authenticates itself
 *  - error normalization: every non-2xx becomes a SalyChainError instance
 */

const HEADER_INTERNAL_TOKEN = 'x-internal-token';

export interface HttpClientOptions {
  baseUrl: string;
  serviceName: string;
  defaultTimeoutMs?: number;
  maxRetries?: number;
  logger?: Logger | undefined;
  /**
   * Explicit internal token. Prefer this over INTERNAL_SERVICE_TOKEN when the
   * caller is a public surface that must use a scoped credential.
   */
  internalToken?: string;
}

export interface RequestOptions {
  timeoutMs?: number;
  idempotencyKey?: string;
  correlationId?: string;
  /** Tenant the call is made on behalf of. Falls back to the ambient context. */
  orgId?: string;
  /** Environment (TEST/LIVE). Falls back to the ambient context. */
  environment?: string;
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined>;
  /** Skip automatic retry even for retryable status codes. */
  noRetry?: boolean;
}

const RETRYABLE_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504]);

export class HttpClient {
  readonly baseUrl: string;
  readonly serviceName: string;
  private readonly defaultTimeoutMs: number;
  private readonly maxRetries: number;
  private readonly logger: Logger | undefined;
  private readonly internalToken: string | undefined;

  constructor(opts: HttpClientOptions) {
    this.baseUrl = opts.baseUrl.replace(/\/$/, '');
    this.serviceName = opts.serviceName;
    this.defaultTimeoutMs = opts.defaultTimeoutMs ?? 5_000;
    this.maxRetries = opts.maxRetries ?? 3;
    this.logger = opts.logger;
    this.internalToken = opts.internalToken;
  }

  get<TRes>(path: string, options: RequestOptions = {}): Promise<TRes> {
    return this.call<TRes>('GET', path, undefined, options);
  }

  post<TRes>(path: string, body: unknown, options: RequestOptions = {}): Promise<TRes> {
    return this.call<TRes>('POST', path, body, options);
  }

  put<TRes>(path: string, body: unknown, options: RequestOptions = {}): Promise<TRes> {
    return this.call<TRes>('PUT', path, body, options);
  }

  patch<TRes>(path: string, body: unknown, options: RequestOptions = {}): Promise<TRes> {
    return this.call<TRes>('PATCH', path, body, options);
  }

  delete<TRes>(path: string, options: RequestOptions = {}): Promise<TRes> {
    return this.call<TRes>('DELETE', path, undefined, options);
  }

  private async call<TRes>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    body: unknown,
    options: RequestOptions,
  ): Promise<TRes> {
    const isMutating = method !== 'GET';
    const idempotencyKey = options.idempotencyKey ?? (isMutating ? ulid() : undefined);
    const tenant = getTenant();
    const correlationId = options.correlationId ?? tenant?.correlationId ?? ulid();
    const orgId = options.orgId ?? tenant?.orgId;
    const environment = options.environment ?? tenant?.environment;
    const url = this.buildUrl(path, options.query);
    const internalToken = this.internalToken ?? process.env.INTERNAL_SERVICE_TOKEN;
    const headers: Record<string, string> = {
      accept: 'application/json',
      [HEADER_CORRELATION_ID]: correlationId,
      ...(orgId ? { [HEADER_ORG_ID]: orgId } : {}),
      ...(environment ? { [HEADER_ENVIRONMENT]: environment } : {}),
      ...(internalToken ? { [HEADER_INTERNAL_TOKEN]: internalToken } : {}),
      ...(options.headers ?? {}),
    };
    if (body !== undefined) headers['content-type'] = 'application/json';
    if (idempotencyKey) headers['x-idempotency-key'] = idempotencyKey;

    const timeoutMs = options.timeoutMs ?? this.defaultTimeoutMs;
    const maxAttempts = options.noRetry ? 1 : this.maxRetries;

    let lastErr: unknown;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const init: RequestInit = { method, headers, signal: controller.signal };
        if (body !== undefined) init.body = JSON.stringify(body, jsonReplacer);
        const response = await fetch(url, init);
        clearTimeout(timeout);
        return await this.parseResponse<TRes>(response, correlationId);
      } catch (err) {
        clearTimeout(timeout);
        lastErr = err;
        if (!this.shouldRetry(err, attempt, maxAttempts)) break;
        const delay = backoffDelay(attempt);
        this.logger?.warn?.(
          `retrying ${method} ${path} after ${delay}ms (attempt ${attempt}/${maxAttempts})`,
          {
            err: (err as Error).message,
          },
        );
        await sleep(delay);
      }
    }

    if (lastErr instanceof SalyChainError) throw lastErr;
    throw ExternalError(
      `${this.serviceName}.unreachable`,
      `Service ${this.serviceName} unreachable`,
      {
        cause: lastErr,
        correlationId,
      },
    );
  }

  private async parseResponse<TRes>(response: Response, correlationId: string): Promise<TRes> {
    if (response.ok) {
      if (response.status === 204) return undefined as TRes;
      const text = await response.text();
      if (!text) return undefined as TRes;
      return JSON.parse(text) as TRes;
    }

    let body: unknown = undefined;
    try {
      body = await response.json();
    } catch {
      body = { error: { message: response.statusText } };
    }
    const errorBody = (body as { error?: { code?: string; message?: string; category?: string } })
      ?.error;
    const code = errorBody?.code ?? `${this.serviceName}.http_${response.status}`;
    const message = errorBody?.message ?? `Service ${this.serviceName} returned ${response.status}`;
    const retryable = RETRYABLE_STATUSES.has(response.status);
    throw new SalyChainError(
      code,
      response.status >= 500 ? 'EXTERNAL' : 'VALIDATION',
      response.status,
      retryable,
      message,
      { correlationId, details: { service: this.serviceName, status: response.status, body } },
    );
  }

  private shouldRetry(err: unknown, attempt: number, maxAttempts: number): boolean {
    if (attempt >= maxAttempts) return false;
    if (err instanceof SalyChainError) return err.retryable;
    if (err instanceof Error && err.name === 'AbortError') return true;
    if (err instanceof TypeError) return true; // network errors
    return false;
  }

  private buildUrl(path: string, query?: RequestOptions['query']): string {
    const url = new URL(`${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`);
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
      }
    }
    return url.toString();
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

function backoffDelay(attempt: number): number {
  const base = 100 * 2 ** (attempt - 1);
  const jitter = Math.floor(Math.random() * base);
  return Math.min(2_000, base + jitter);
}

/** Allows the SDK to transparently serialize `bigint` fields as strings. */
function jsonReplacer(_key: string, value: unknown): unknown {
  if (typeof value === 'bigint') return value.toString();
  return value;
}
