import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { assertProductionPosture, internalAuthMiddleware, loadEnv } from '@salychain/config';
import { initTelemetry, bootstrapHttpObservability } from '@salychain/observability';
import { createLogger } from '@salychain/logger';
import { tenantContextMiddleware } from '@salychain/sdk-internal';
import { AppModule } from './app.module.js';
import { executionEnvSchema } from './config/env.js';

async function bootstrap() {
  const env = loadEnv(executionEnvSchema);
  const logger = createLogger({ service: 'execution', env: env.NODE_ENV, level: env.LOG_LEVEL });
  assertProductionPosture(env.NODE_ENV, [
    {
      when: !env.INTERNAL_SERVICE_TOKEN,
      message: 'INTERNAL_SERVICE_TOKEN must be set — execution moves money and cannot run open',
    },
    {
      when: env.FIAT_PSP_PROVIDER === 'stub',
      message: 'FIAT_PSP_PROVIDER=stub is not allowed in production',
    },
    {
      when:
        env.FIAT_PSP_PROVIDER === 'composite' &&
        !env.FLUTTERWAVE_SECRET_KEY &&
        !env.PAYSTACK_SECRET_KEY,
      message: 'FIAT_PSP_PROVIDER=composite requires at least one live PSP key in production',
    },
  ]);

  initTelemetry({
    serviceName: 'execution',
    otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
    env: env.NODE_ENV,
  });

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(
    internalAuthMiddleware({
      serviceName: 'execution',
      token: env.INTERNAL_SERVICE_TOKEN,
      nodeEnv: env.NODE_ENV,
      alternateTokens: env.EXPLORER_READ_TOKEN ? [env.EXPLORER_READ_TOKEN] : [],
      alternateTokenPaths: ['/v1/bridge/status', '/v1/bridge/transactions'],
      warn: (msg) => logger.warn(msg),
    }),
  );
  app.use(tenantContextMiddleware);
  bootstrapHttpObservability(app, { serviceName: 'execution' });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SalyChain Execution Service')
    .setDescription('Transaction orchestration: state machine, ledger reservations, chain dispatch')
    .setVersion('0.1.0')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  app.enableShutdownHooks();
  await app.listen(env.PORT);
  logger.info(`execution service started on :${env.PORT}`);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap execution service', err);
  process.exit(1);
});
