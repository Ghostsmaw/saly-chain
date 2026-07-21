import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { assertProductionPosture, internalAuthMiddleware, loadEnv } from '@salychain/config';
import { initTelemetry, bootstrapHttpObservability } from '@salychain/observability';
import { createLogger } from '@salychain/logger';
import { AppModule } from './app.module.js';
import { contractRegistryEnvSchema } from './config/env.js';

async function bootstrap() {
  const env = loadEnv(contractRegistryEnvSchema);
  const logger = createLogger({ service: 'contract-registry', env: env.NODE_ENV, level: env.LOG_LEVEL });
  assertProductionPosture(env.NODE_ENV, [
    {
      when: !env.INTERNAL_SERVICE_TOKEN,
      message: 'INTERNAL_SERVICE_TOKEN must be set — contract-registry mutations must not be open',
    },
  ]);


  initTelemetry({
    serviceName: 'contract-registry',
    otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
    env: env.NODE_ENV,
  });

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(
    internalAuthMiddleware({
      serviceName: 'contract-registry',
      token: env.INTERNAL_SERVICE_TOKEN,
      nodeEnv: env.NODE_ENV,
      warn: (msg) => logger.warn(msg),
    }),
  );
  bootstrapHttpObservability(app, { serviceName: 'contract-registry' });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  app.setGlobalPrefix('v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SalyChain Contract Registry')
    .setDescription('Deployed smart contracts, upgrades, and emergency pause controls')
    .setVersion('0.1.0')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  app.enableShutdownHooks();
  await app.listen(env.PORT);
  logger.info(`contract-registry service started on :${env.PORT}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap contract-registry service', err);
  process.exit(1);
});
