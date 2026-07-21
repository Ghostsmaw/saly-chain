import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { assertProductionPosture, internalAuthMiddleware, loadEnv } from '@salychain/config';
import { initTelemetry, bootstrapHttpObservability } from '@salychain/observability';
import { createLogger } from '@salychain/logger';
import { tenantContextMiddleware } from '@salychain/sdk-internal';
import { AppModule } from './app.module.js';
import { merchantEnvSchema } from './config/env.js';

async function bootstrap() {
  const env = loadEnv(merchantEnvSchema);
  const logger = createLogger({
    service: 'merchant',
    env: env.NODE_ENV,
    level: env.LOG_LEVEL,
  });
  assertProductionPosture(env.NODE_ENV, [
    {
      when: !env.INTERNAL_SERVICE_TOKEN,
      message: 'INTERNAL_SERVICE_TOKEN must be set — merchant settlement must not be open',
    },
  ]);


  initTelemetry({
    serviceName: 'merchant',
    otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
    env: env.NODE_ENV,
  });

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(
    internalAuthMiddleware({
      serviceName: 'merchant',
      token: env.INTERNAL_SERVICE_TOKEN,
      nodeEnv: env.NODE_ENV,
      warn: (msg) => logger.warn(msg),
    }),
  );
  app.use(tenantContextMiddleware);
  bootstrapHttpObservability(app, { serviceName: 'merchant' });
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }),
  );
  app.setGlobalPrefix('v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SalyChain Merchant Service')
    .setDescription('Payment links, hosted checkout sessions, and settlement reports')
    .setVersion('0.1.0')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  app.enableShutdownHooks();
  await app.listen(env.PORT);
  logger.info(`merchant service started on :${env.PORT}`);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap merchant service', err);
  process.exit(1);
});
