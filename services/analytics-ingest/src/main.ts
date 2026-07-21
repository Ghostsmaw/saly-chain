import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { assertProductionPosture, internalAuthMiddleware, loadEnv } from '@salychain/config';
import { initTelemetry, bootstrapHttpObservability } from '@salychain/observability';
import { createLogger } from '@salychain/logger';
import { AppModule } from './app.module.js';
import { analyticsIngestEnvSchema } from './config/env.js';

async function bootstrap() {
  const env = loadEnv(analyticsIngestEnvSchema);
  const logger = createLogger({ service: 'analytics-ingest', env: env.NODE_ENV, level: env.LOG_LEVEL });
  assertProductionPosture(env.NODE_ENV, [
    {
      when: !env.INTERNAL_SERVICE_TOKEN,
      message: 'INTERNAL_SERVICE_TOKEN must be set — analytics-ingest must not run open',
    },
  ]);


  initTelemetry({
    serviceName: 'analytics-ingest',
    otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
    env: env.NODE_ENV,
  });

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(
    internalAuthMiddleware({
      serviceName: 'analytics-ingest',
      token: env.INTERNAL_SERVICE_TOKEN,
      nodeEnv: env.NODE_ENV,
      warn: (msg) => logger.warn(msg),
    }),
  );
  bootstrapHttpObservability(app, { serviceName: 'analytics-ingest' });
  app.setGlobalPrefix('v1');
  app.enableShutdownHooks();

  await app.listen(env.PORT);
  logger.info(`analytics-ingest service started on :${env.PORT}`);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap analytics-ingest service', err);
  process.exit(1);
});
