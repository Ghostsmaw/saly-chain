import { DataClient } from '@salychain/sdk-internal';

const ANALYTICS_API_URL = process.env.ANALYTICS_API_URL ?? 'http://localhost:4016';

let client: DataClient | null = null;

/**
 * Scoped credential for the public explorer. Never use INTERNAL_SERVICE_TOKEN
 * here — that secret authorizes money-moving and admin internal APIs.
 */
function explorerReadToken(): string | undefined {
  return process.env.EXPLORER_READ_TOKEN;
}

/** Server-side client for the Saly Realtime API (read-only ClickHouse). */
export function data(): DataClient {
  if (!client) {
    const token = explorerReadToken();
    if (!token && process.env.NODE_ENV === 'production') {
      throw new Error('EXPLORER_READ_TOKEN must be set in production — do not mount INTERNAL_SERVICE_TOKEN');
    }
    client = new DataClient({ baseUrl: ANALYTICS_API_URL, internalToken: token });
  }
  return client;
}

/** Resolve a promise, falling back to a default when the API is unavailable. */
export async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}
