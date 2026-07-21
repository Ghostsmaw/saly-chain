import { timingSafeEqual } from 'node:crypto';

/**
 * Shared-secret authentication for internal (service-to-service) HTTP APIs.
 *
 * Internal services (ledger, wallet, execution, apikeys, webhooks, …) must
 * never be reachable by an unauthenticated caller, even inside the cluster —
 * network placement is a mitigation, not an auth mechanism. Every internal
 * request carries `x-internal-token`; the SDK's HttpClient attaches it
 * automatically from `INTERNAL_SERVICE_TOKEN`.
 *
 * Posture:
 *  - token configured        → enforce with a timing-safe comparison
 *  - unset, dev/test         → allow (local ergonomics), warn once
 *  - unset, staging/prod     → reject everything except the public paths
 *    (services should ALSO fail startup via `assertProductionPosture`)
 */

export const INTERNAL_AUTH_HEADER = 'x-internal-token';

/** Paths that stay reachable without the internal token. */
const DEFAULT_PUBLIC_PATHS = ['/health', '/v1/health', '/metrics'];
const DEFAULT_PUBLIC_PREFIXES = ['/docs'];

interface MinimalRequest {
  readonly path?: string;
  readonly url?: string;
  readonly headers?: Record<string, string | string[] | undefined>;
}
interface MinimalResponse {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(body?: string): void;
}
type NextFn = () => void;

export interface InternalAuthOptions {
  readonly serviceName: string;
  /** Shared secret. When undefined, behaviour depends on nodeEnv (see above). */
  readonly token: string | undefined;
  readonly nodeEnv: string;
  /**
   * Additional accepted tokens (e.g. a scoped explorer read token). Never grant
   * these the same blast radius as the cluster-wide INTERNAL_SERVICE_TOKEN —
   * pair with `alternateTokenPaths` whenever the caller is a public surface.
   */
  readonly alternateTokens?: readonly string[];
  /** When set, alternate tokens are accepted only on these exact paths. */
  readonly alternateTokenPaths?: readonly string[];
  /** When set, alternate tokens are accepted on paths with these prefixes. */
  readonly alternateTokenPathPrefixes?: readonly string[];
  /** Extra exact paths to leave unauthenticated (e.g. a PSP webhook receiver). */
  readonly extraPublicPaths?: readonly string[];
  /** Called at most once when running unprotected in dev without a token. */
  readonly warn?: (message: string) => void;
}

/**
 * Express-style middleware enforcing the internal shared secret.
 * Attach with `app.use(...)` right after `NestFactory.create(...)`.
 */
export function internalAuthMiddleware(options: InternalAuthOptions) {
  const { serviceName, token, nodeEnv } = options;
  const publicPaths = new Set([...DEFAULT_PUBLIC_PATHS, ...(options.extraPublicPaths ?? [])]);
  const isDevLike = nodeEnv === 'development' || nodeEnv === 'test';
  let warned = false;

  return (req: MinimalRequest, res: MinimalResponse, next: NextFn): void => {
    const path = (req.path ?? req.url ?? '/').split('?')[0] ?? '/';
    if (publicPaths.has(path) || DEFAULT_PUBLIC_PREFIXES.some((p) => path.startsWith(p))) {
      next();
      return;
    }

    if (!token) {
      if (isDevLike) {
        if (!warned && options.warn) {
          warned = true;
          options.warn(
            `[${serviceName}] INTERNAL_SERVICE_TOKEN is not set — internal API is UNPROTECTED. ` +
              'This is only acceptable for local development.',
          );
        }
        next();
        return;
      }
      reject(res, 'internal service token not configured');
      return;
    }

    const presented = headerValue(req, INTERNAL_AUTH_HEADER);
    if (!presented) {
      reject(res, 'invalid internal service token');
      return;
    }
    if (constantTimeEquals(presented, token)) {
      next();
      return;
    }

    const alternates = (options.alternateTokens ?? []).filter((t): t is string => Boolean(t));
    const hasPathScope =
      (options.alternateTokenPaths?.length ?? 0) > 0 ||
      (options.alternateTokenPathPrefixes?.length ?? 0) > 0;
    const pathOk =
      !hasPathScope ||
      (options.alternateTokenPaths?.includes(path) ?? false) ||
      (options.alternateTokenPathPrefixes?.some((p) => path.startsWith(p)) ?? false);
    if (pathOk && alternates.some((alt) => constantTimeEquals(presented, alt))) {
      next();
      return;
    }

    reject(res, 'invalid internal service token');
  };
}

function headerValue(req: MinimalRequest, name: string): string | undefined {
  const raw = req.headers?.[name];
  if (Array.isArray(raw)) return raw[0];
  return raw;
}

function reject(res: MinimalResponse, message: string): void {
  res.statusCode = 401;
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify({
      error: { code: 'auth.internal_token', category: 'AUTHENTICATION', message },
    }),
  );
}

export function constantTimeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
