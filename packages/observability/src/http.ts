import type { INestApplication } from '@nestjs/common';
import {
  httpRequestDurationSeconds,
  httpRequestsInFlight,
  httpRequestsTotal,
  initMetrics,
  register,
} from './metrics.js';

// Minimal structural types so this package doesn't depend on @types/express.
interface MinimalRequest {
  readonly method?: string;
  readonly path?: string;
  readonly baseUrl?: string;
  readonly route?: { readonly path?: string };
}
interface MinimalResponse {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(body?: string): void;
  on(event: 'finish', listener: () => void): void;
}
type NextFn = () => void;
interface ExpressLike {
  use(handler: (req: MinimalRequest, res: MinimalResponse, next: NextFn) => void): void;
  get(path: string, handler: (req: MinimalRequest, res: MinimalResponse) => void): void;
}

const DYNAMIC_SEGMENT = /^(?:[0-9]+|[0-9a-fA-F-]{8,}|[0-9A-HJKMNP-TV-Z]{26}|[a-z]+_[0-9A-HJKMNP-TV-Z]{26})$/;

/**
 * Normalise a request path into a low-cardinality route label. Prefers the
 * matched Express route pattern (e.g. `/transactions/:id`); falls back to
 * collapsing dynamic-looking segments (numeric ids, UUIDs, ULIDs, prefixed
 * ids) into `:id` so we never explode Prometheus cardinality.
 */
function routeLabel(req: MinimalRequest): string {
  if (req.route?.path) {
    const base = req.baseUrl ?? '';
    const full = `${base}${req.route.path}`;
    return full.length > 0 ? full : '/';
  }
  const path = req.path ?? '/';
  if (path === '/metrics') return '/metrics';
  const collapsed = path
    .split('/')
    .map((seg) => (DYNAMIC_SEGMENT.test(seg) ? ':id' : seg))
    .join('/');
  return collapsed.length > 0 ? collapsed : '/';
}

/** Express middleware that records RED metrics for every request. */
export function metricsMiddleware() {
  return (req: MinimalRequest, res: MinimalResponse, next: NextFn): void => {
    const method = (req.method ?? 'GET').toUpperCase();
    const endTimer = httpRequestDurationSeconds.startTimer({ method });
    httpRequestsInFlight.inc({ method });
    res.on('finish', () => {
      const route = routeLabel(req);
      // Skip the scrape endpoint itself to avoid self-referential noise.
      if (route === '/metrics') {
        httpRequestsInFlight.dec({ method });
        return;
      }
      const status = String(res.statusCode);
      const labels = { method, route, status };
      httpRequestsTotal.inc(labels);
      endTimer({ route, status });
      httpRequestsInFlight.dec({ method });
    });
    next();
  };
}

/** Raw `/metrics` request handler (Prometheus text exposition format). */
export function metricsHandler() {
  return (_req: MinimalRequest, res: MinimalResponse): void => {
    register
      .metrics()
      .then((body) => {
        res.setHeader('Content-Type', register.contentType);
        res.statusCode = 200;
        res.end(body);
      })
      .catch(() => {
        res.statusCode = 500;
        res.end('# metrics collection failed\n');
      });
  };
}

export interface HttpObservabilityOptions {
  readonly serviceName: string;
}

/**
 * Wire HTTP observability into a NestJS (Express) app:
 *   - sets the `service` default label and starts default metrics collection,
 *   - records RED metrics for every request,
 *   - exposes `GET /metrics` at the ROOT (bypassing the `/v1` global prefix,
 *     which is what Prometheus scrapes).
 *
 * Call once in `bootstrap()` after `NestFactory.create(...)` and before
 * `app.listen(...)`. One line per service — no app-module changes required.
 */
export function bootstrapHttpObservability(
  app: INestApplication,
  options: HttpObservabilityOptions,
): void {
  initMetrics(options.serviceName);
  const instance = app.getHttpAdapter().getInstance() as ExpressLike;
  instance.use(metricsMiddleware());
  instance.get('/metrics', metricsHandler());
}
