import { ExternalError } from '@salychain/errors';

export interface HttpRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  timeoutMs?: number;
  idempotencyKey?: string;
}

export interface HttpClientOptions {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  fetchFn?: typeof fetch;
  timeoutMs?: number;
}

export class HttpClient {
  private readonly fetchFn: typeof fetch;
  private readonly timeoutMs: number;

  constructor(private readonly opts: HttpClientOptions) {
    this.fetchFn = opts.fetchFn ?? fetch;
    this.timeoutMs = opts.timeoutMs ?? 15_000;
  }

  async request<T>(path: string, req: HttpRequestOptions = {}): Promise<T> {
    const url = `${this.opts.baseUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
    const headers: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...this.opts.defaultHeaders,
      ...req.headers,
    };
    if (req.idempotencyKey) headers['Idempotency-Key'] = req.idempotencyKey;

    const res = await this.fetchFn(url, {
      method: req.method ?? 'GET',
      headers,
      ...(req.body != null ? { body: JSON.stringify(req.body) } : {}),
      signal: AbortSignal.timeout(req.timeoutMs ?? this.timeoutMs),
    });

    const text = await res.text();
    let parsed: unknown = null;
    if (text) {
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = text;
      }
    }

    if (!res.ok) {
      const msg =
        typeof parsed === 'object' && parsed && 'message' in parsed
          ? String((parsed as { message: unknown }).message)
          : `HTTP ${res.status}`;
      throw ExternalError('chain.fiat.psp_error', msg, { details: { status: res.status, body: parsed } });
    }

    return parsed as T;
  }
}
