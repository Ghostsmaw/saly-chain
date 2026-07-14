import { DataClient } from '@salychain/sdk-internal';

const ANALYTICS_API_URL = process.env.ANALYTICS_API_URL ?? 'http://localhost:4016';

let client: DataClient | null = null;

/** Server-side client for the Saly Realtime API (read-only ClickHouse). */
export function data(): DataClient {
  if (!client) client = new DataClient({ baseUrl: ANALYTICS_API_URL });
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
