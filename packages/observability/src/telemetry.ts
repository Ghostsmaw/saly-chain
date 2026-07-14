import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

export interface TelemetryOptions {
  readonly serviceName: string;
  // `| undefined` is explicit so callers can forward optional env values
  // directly under `exactOptionalPropertyTypes`.
  readonly version?: string | undefined;
  readonly env?: string | undefined;
  /**
   * OTLP HTTP base endpoint (e.g. http://localhost:4318). When omitted, tracing
   * is disabled — we never want a half-configured exporter silently swallowing
   * traces or blocking startup.
   */
  readonly otelEndpoint?: string | undefined;
}

let sdk: NodeSDK | undefined;

/**
 * Initialise OpenTelemetry tracing. Call this as early as possible in the
 * process entrypoint (before NestFactory.create / before the work loop) so that
 * auto-instrumentation can patch HTTP, NATS, Postgres, Redis, etc.
 *
 * Robust across OTEL versions: resource attributes and the exporter endpoint
 * are configured via the standard OTEL_* environment variables rather than
 * version-specific resource APIs.
 *
 * No-op (returns false) when no OTLP endpoint is configured.
 */
export function initTelemetry(options: TelemetryOptions): boolean {
  if (sdk) return true;

  const endpoint = options.otelEndpoint ?? process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
  if (!endpoint) return false;

  // NodeSDK + OTLP exporter read these standard env vars.
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT = endpoint;
  if (!process.env.OTEL_SERVICE_NAME) process.env.OTEL_SERVICE_NAME = options.serviceName;
  if (!process.env.OTEL_RESOURCE_ATTRIBUTES) {
    process.env.OTEL_RESOURCE_ATTRIBUTES = [
      `service.name=${options.serviceName}`,
      `service.version=${options.version ?? '0.1.0'}`,
      `deployment.environment=${options.env ?? process.env.NODE_ENV ?? 'development'}`,
    ].join(',');
  }

  sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter(),
    instrumentations: [
      getNodeAutoInstrumentations({
        // fs instrumentation is extremely noisy and rarely useful.
        '@opentelemetry/instrumentation-fs': { enabled: false },
      }),
    ],
  });

  sdk.start();

  const shutdown = (): void => {
    void sdk?.shutdown().catch(() => undefined);
  };
  process.once('SIGTERM', shutdown);
  process.once('SIGINT', shutdown);

  return true;
}

/** Flush and stop the tracer (useful in tests / graceful shutdown). */
export async function shutdownTelemetry(): Promise<void> {
  await sdk?.shutdown().catch(() => undefined);
  sdk = undefined;
}
