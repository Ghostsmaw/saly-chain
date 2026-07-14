import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { loadEnv } from '@salychain/config';
import { initTelemetry, bootstrapHttpObservability } from '@salychain/observability';
import { createLogger } from '@salychain/logger';
import { tenantContextMiddleware } from '@salychain/sdk-internal';
import { AppModule } from './app.module.js';
import { stablecoinEnvSchema } from './config/env.js';

async function bootstrap() {
  const env = loadEnv(stablecoinEnvSchema);
  const logger = createLogger({
    service: 'stablecoin',
    env: env.NODE_ENV,
    level: env.LOG_LEVEL,
  });

  initTelemetry({
    serviceName: 'stablecoin',
    otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
    env: env.NODE_ENV,
  });

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(tenantContextMiddleware);
  bootstrapHttpObservability(app, { serviceName: 'stablecoin' });
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }),
  );
  app.setGlobalPrefix('v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SalyChain Stablecoin Service')
    .setDescription('SalySD reserves, mint/redeem requests, and proof-of-reserves attestations')
    .setVersion('0.1.0')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  app.enableShutdownHooks();
  await app.listen(env.PORT);
  logger.info(`stablecoin service started on :${env.PORT}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap stablecoin service', err);
  process.exit(1);
});
