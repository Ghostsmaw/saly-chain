import http from 'node:http';
import { initMetrics, register } from './metrics.js';

export interface WorkerObservabilityOptions {
  readonly serviceName: string;
  readonly port: number;
  /**
   * Optional liveness probe. Return false to report the worker as unhealthy
   * (e.g. event bus disconnected, checkpoint stalled).
   */
  readonly healthCheck?: () => boolean | Promise<boolean>;
}

/**
 * Start a tiny HTTP server for workers (which are plain Node processes, not
 * NestJS apps) exposing:
 *   - GET /metrics  Prometheus exposition
 *   - GET /health   liveness ({ status: 'ok' | 'down' })
 *
 * Returns the server so callers can close it on shutdown.
 */
export function startWorkerObservabilityServer(
  options: WorkerObservabilityOptions,
): http.Server {
  initMetrics(options.serviceName);

  const server = http.createServer((req, res) => {
    const url = req.url ?? '/';

    if (url.startsWith('/metrics')) {
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
      return;
    }

    if (url.startsWith('/health')) {
      Promise.resolve(options.healthCheck ? options.healthCheck() : true)
        .then((ok) => {
          res.statusCode = ok ? 200 : 503;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: ok ? 'ok' : 'down', service: options.serviceName }));
        })
        .catch(() => {
          res.statusCode = 503;
          res.end(JSON.stringify({ status: 'down', service: options.serviceName }));
        });
      return;
    }

    res.statusCode = 404;
    res.end();
  });

  server.listen(options.port);
  return server;
}
