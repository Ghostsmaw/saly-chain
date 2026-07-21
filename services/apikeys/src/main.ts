import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { assertProductionPosture, internalAuthMiddleware, loadEnv } from '@salychain/config';
import { initTelemetry, bootstrapHttpObservability } from '@salychain/observability';
import { createLogger } from '@salychain/logger';
import { AppModule } from './app.module.js';
import { apiKeysEnvSchema } from './config/env.js';

async function bootstrap() {
  const env = loadEnv(apiKeysEnvSchema);
  const logger = createLogger({ service: 'apikeys', env: env.NODE_ENV, level: env.LOG_LEVEL });
  assertProductionPosture(env.NODE_ENV, [
    {
      when: !env.INTERNAL_SERVICE_TOKEN,
      message: 'INTERNAL_SERVICE_TOKEN must be set — apikeys issues credentials and cannot run open',
    },
  ]);

  initTelemetry({
    serviceName: 'apikeys',
    otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
    env: env.NODE_ENV,
  });

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(
    internalAuthMiddleware({
      serviceName: 'apikeys',
      token: env.INTERNAL_SERVICE_TOKEN,
      nodeEnv: env.NODE_ENV,
      warn: (msg) => logger.warn(msg),
    }),
  );
  bootstrapHttpObservability(app, { serviceName: 'apikeys' });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  app.setGlobalPrefix('v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SalyChain API Keys Service')
    .setDescription('Organizations, members, API keys, scopes, rotation, verification')
    .setVersion('0.1.0')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  app.enableShutdownHooks();
  await app.listen(env.PORT);
  logger.info(`apikeys service started on :${env.PORT}`);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap apikeys service', err);
  process.exit(1);
});
