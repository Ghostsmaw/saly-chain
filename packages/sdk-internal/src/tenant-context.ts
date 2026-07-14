import { AsyncLocalStorage } from 'node:async_hooks';

/**
 * Ambient tenant context propagated across an async request lifecycle.
 *
 * The gateway is the trust boundary: it authenticates the caller, resolves the
 * `orgId`, and runs the request inside this context. Every internal client call
 * made within that scope then automatically forwards the org/environment as
 * headers (see `HttpClient`), so downstream services receive a consistent tenant
 * identity without each call site threading it manually.
 *
 * Downstream services trust these headers only because they are not publicly
 * reachable — the gateway is the only ingress and it overwrites them from the
 * authenticated principal. This mirrors how `x-correlation-id` already flows.
 */
export interface TenantContext {
  orgId?: string;
  environment?: string;
  correlationId?: string;
}

/** Wire header names for tenant propagation between internal services. */
export const HEADER_ORG_ID = 'x-saly-org-id';
export const HEADER_ENVIRONMENT = 'x-saly-environment';
export const HEADER_CORRELATION_ID = 'x-correlation-id';

const storage = new AsyncLocalStorage<TenantContext>();

/** Run `fn` with the given tenant context bound for its entire async subtree. */
export function runWithTenant<T>(ctx: TenantContext, fn: () => T): T {
  return storage.run(ctx, fn);
}

/** The current tenant context, if any. */
export function getTenant(): TenantContext | undefined {
  return storage.getStore();
}

/** Convenience accessor for the current org id. */
export function getTenantOrgId(): string | undefined {
  return storage.getStore()?.orgId;
}

/** Minimal structural request shape so this stays framework-agnostic. */
interface HeaderCarrier {
  headers: Record<string, string | string[] | undefined>;
}

function headerValue(req: HeaderCarrier, name: string): string | undefined {
  const raw = req.headers[name];
  if (Array.isArray(raw)) return raw[0];
  return raw ?? undefined;
}

/**
 * Express-style middleware for downstream services: reads the tenant headers
 * from the inbound request and binds them for the request's async subtree.
 * Apply globally (e.g. `app.use(tenantContextMiddleware)`) before routing.
 */
export function tenantContextMiddleware(req: HeaderCarrier, _res: unknown, next: () => void): void {
  const ctx: TenantContext = {};
  const orgId = headerValue(req, HEADER_ORG_ID);
  const environment = headerValue(req, HEADER_ENVIRONMENT);
  const correlationId = headerValue(req, HEADER_CORRELATION_ID);
  if (orgId) ctx.orgId = orgId;
  if (environment) ctx.environment = environment;
  if (correlationId) ctx.correlationId = correlationId;
  runWithTenant(ctx, next);
}
