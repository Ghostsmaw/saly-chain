import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { assertProductionPosture, internalAuthMiddleware, loadEnv } from '@salychain/config';
import { initTelemetry, bootstrapHttpObservability } from '@salychain/observability';
import { createLogger } from '@salychain/logger';
import { AppModule } from './app.module.js';
import { analyticsApiEnvSchema } from './config/env.js';

async function bootstrap() {
  const env = loadEnv(analyticsApiEnvSchema);
  const logger = createLogger({ service: 'analytics-api', env: env.NODE_ENV, level: env.LOG_LEVEL });
  assertProductionPosture(env.NODE_ENV, [
    {
      when: !env.INTERNAL_SERVICE_TOKEN,
      message: 'INTERNAL_SERVICE_TOKEN must be set — analytics-api must not run open',
    },
  ]);


  initTelemetry({
    serviceName: 'analytics-api',
    otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
    env: env.NODE_ENV,
  });

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(
    internalAuthMiddleware({
      serviceName: 'analytics-api',
      token: env.INTERNAL_SERVICE_TOKEN,
      nodeEnv: env.NODE_ENV,
      alternateTokens: env.EXPLORER_READ_TOKEN ? [env.EXPLORER_READ_TOKEN] : [],
      alternateTokenPathPrefixes: ['/v1/data'],
      warn: (msg) => logger.warn(msg),
    }),
  );
  bootstrapHttpObservability(app, { serviceName: 'analytics-api' });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  app.setGlobalPrefix('v1');
  app.enableShutdownHooks();

  await app.listen(env.PORT);
  logger.info(`analytics-api service started on :${env.PORT}`);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap analytics-api service', err);
  process.exit(1);
});
