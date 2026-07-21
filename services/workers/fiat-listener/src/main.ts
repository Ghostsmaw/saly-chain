import { assertProductionPosture } from '@salychain/config';
import { initTelemetry, startWorkerObservabilityServer } from '@salychain/observability';
import { env } from './config.js';
import { startServer, shutdown } from './server.js';

// PSP signatures are the primary webhook auth; the IP allow-list is the
// defense-in-depth layer. An empty list silently allows every source IP, so
// production refuses to boot without it (fail closed, not fail open).
assertProductionPosture(env.NODE_ENV, [
  {
    when: env.WEBHOOK_ALLOWED_IPS.length === 0,
    message:
      'WEBHOOK_ALLOWED_IPS must list the PSP source IPs in production — an empty allow-list accepts webhooks from anywhere',
  },
]);

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
