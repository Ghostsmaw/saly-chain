import { initTelemetry, startWorkerObservabilityServer } from '@salychain/observability';
import { env } from './config.js';
import { startServer, shutdown } from './server.js';

let shuttingDown = false;
let serverReady = false;

initTelemetry({
  serviceName: 'fiat-listener',
  otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  env: env.NODE_ENV,
});
const telemetryServer = startWorkerObservabilityServer({
  serviceName: 'fiat-listener',
  port: env.METRICS_PORT,
  healthCheck: () => serverReady && !shuttingDown,
});

async function main(): Promise<void> {
  await startServer();
  serverReady = true;
}

function stop(): void {
  if (shuttingDown) return;
  shuttingDown = true;
  serverReady = false;
  telemetryServer.close();
  void shutdown().then(() => process.exit(0));
}

process.on('SIGTERM', stop);
process.on('SIGINT', stop);

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('fiat-listener crashed', err);
  process.exit(1);
});
