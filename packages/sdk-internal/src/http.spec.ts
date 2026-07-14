import { describe, expect, it, vi, afterEach } from 'vitest';
import { HttpClient } from './http.js';

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

function mockResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
}

describe('HttpClient', () => {
  it('parses a 200 JSON response', async () => {
    globalThis.fetch = vi.fn(async () => mockResponse(200, { ok: true })) as never;
    const c = new HttpClient({ baseUrl: 'http://x', serviceName: 'test' });
    expect(await c.get<{ ok: boolean }>('/foo')).toEqual({ ok: true });
  });

  it('attaches an idempotency key on mutating methods', async () => {
    const fetchSpy = vi.fn(async () => mockResponse(200, { ok: true }));
    globalThis.fetch = fetchSpy as never;
    const c = new HttpClient({ baseUrl: 'http://x', serviceName: 'test' });
    await c.post('/foo', { hello: 'world' });
    const [, init] = fetchSpy.mock.calls[0]!;
    expect((init as RequestInit).headers as Record<string, string>).toHaveProperty('x-idempotency-key');
  });

  it('does not attach an idempotency key on GET', async () => {
    const fetchSpy = vi.fn(async () => mockResponse(200, { ok: true }));
    globalThis.fetch = fetchSpy as never;
    const c = new HttpClient({ baseUrl: 'http://x', serviceName: 'test' });
    await c.get('/foo');
    const [, init] = fetchSpy.mock.calls[0]!;
    expect((init as RequestInit).headers as Record<string, string>).not.toHaveProperty('x-idempotency-key');
  });

  it('retries on 503 then succeeds', async () => {
    let calls = 0;
    globalThis.fetch = vi.fn(async () => {
      calls++;
      return calls < 3 ? mockResponse(503, { error: { message: 'down' } }) : mockResponse(200, { ok: true });
    }) as never;
    const c = new HttpClient({ baseUrl: 'http://x', serviceName: 'test', maxRetries: 4 });
    const res = await c.get<{ ok: boolean }>('/foo');
    expect(res).toEqual({ ok: true });
    expect(calls).toBe(3);
  });

  it('does not retry on a 4xx', async () => {
    const fetchSpy = vi.fn(async () => mockResponse(400, { error: { code: 'bad', message: 'oops' } }));
    globalThis.fetch = fetchSpy as never;
    const c = new HttpClient({ baseUrl: 'http://x', serviceName: 'test', maxRetries: 4 });
    await expect(c.post('/foo', {})).rejects.toMatchObject({ code: 'bad' });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('serializes bigint values as strings', async () => {
    const fetchSpy = vi.fn(async () => mockResponse(200, {}));
    globalThis.fetch = fetchSpy as never;
    const c = new HttpClient({ baseUrl: 'http://x', serviceName: 'test' });
    await c.post('/foo', { amount: 1234567890123456789n });
    const [, init] = fetchSpy.mock.calls[0]!;
    expect(init?.body).toContain('"amount":"1234567890123456789"');
  });
});
