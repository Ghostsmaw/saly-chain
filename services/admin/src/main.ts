import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { loadEnv } from '@salychain/config';
import { initTelemetry, bootstrapHttpObservability } from '@salychain/observability';
import { createLogger } from '@salychain/logger';
import { AppModule } from './app.module.js';
import { adminEnvSchema, resolveAdminEnv } from './config/env.js';

async function bootstrap() {
  const env = resolveAdminEnv(loadEnv(adminEnvSchema));
  process.env.DATABASE_URL = env.databaseUrl;

  const logger = createLogger({ service: 'admin', env: env.NODE_ENV, level: env.LOG_LEVEL });

  initTelemetry({
    serviceName: 'admin',
    otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
    env: env.NODE_ENV,
  });

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  bootstrapHttpObservability(app, { serviceName: 'admin' });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  app.setGlobalPrefix('v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SalyChain Admin Service')
    .setDescription('Platform settings, RBAC, feature flags, and audit log')
    .setVersion('0.1.0')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  app.enableShutdownHooks();
  await app.listen(env.listenPort);
  logger.info(`admin service started on :${env.listenPort}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap admin service', err);
  process.exit(1);
});
