import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { assertProductionPosture, internalAuthMiddleware, loadEnv } from '@salychain/config';
import { initTelemetry, bootstrapHttpObservability } from '@salychain/observability';
import { createLogger } from '@salychain/logger';
import { AppModule } from './app.module.js';
import { liquidityEnvSchema } from './config/env.js';

async function bootstrap() {
  const env = loadEnv(liquidityEnvSchema);
  const logger = createLogger({ service: 'liquidity', env: env.NODE_ENV, level: env.LOG_LEVEL });
  assertProductionPosture(env.NODE_ENV, [
    {
      when: !env.INTERNAL_SERVICE_TOKEN,
      message: 'INTERNAL_SERVICE_TOKEN must be set — FX quotes must not be forgeable',
    },
    {
      when: env.LIQUIDITY_RATE_PROVIDER === 'stub',
      message: 'LIQUIDITY_RATE_PROVIDER=stub is not allowed in production',
    },
    {
      when: env.LIQUIDITY_RATE_STUB_FALLBACK,
      message: 'LIQUIDITY_RATE_STUB_FALLBACK must be false in production',
    },
    {
      when: env.DEX_QUOTE_STUB_FALLBACK,
      message: 'DEX_QUOTE_STUB_FALLBACK must be false in production',
    },
  ]);


  initTelemetry({
    serviceName: 'liquidity',
    otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
    env: env.NODE_ENV,
  });

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(
    internalAuthMiddleware({
      serviceName: 'liquidity',
      token: env.INTERNAL_SERVICE_TOKEN,
      nodeEnv: env.NODE_ENV,
      warn: (msg) => logger.warn(msg),
    }),
  );
  bootstrapHttpObservability(app, { serviceName: 'liquidity' });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  app.setGlobalPrefix('v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SalyChain Liquidity Service')
    .setDescription('Signed FX quotes, rate providers, quote execution')
    .setVersion('0.1.0')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  app.enableShutdownHooks();
  await app.listen(env.PORT);
  logger.info(
    `liquidity service started on :${env.PORT} (provider=${env.LIQUIDITY_RATE_PROVIDER}, ttl=${env.LIQUIDITY_QUOTE_TTL_SECONDS}s)`,
  );
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap liquidity service', err);
  process.exit(1);
});
