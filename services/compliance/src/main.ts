import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { assertProductionPosture, internalAuthMiddleware, loadEnv } from '@salychain/config';
import { initTelemetry, bootstrapHttpObservability } from '@salychain/observability';
import { createLogger } from '@salychain/logger';
import { AppModule } from './app.module.js';
import { complianceEnvSchema } from './config/env.js';

async function bootstrap() {
  const env = loadEnv(complianceEnvSchema);
  const logger = createLogger({ service: 'compliance', env: env.NODE_ENV, level: env.LOG_LEVEL });
  assertProductionPosture(env.NODE_ENV, [
    {
      when: !env.INTERNAL_SERVICE_TOKEN,
      message: 'INTERNAL_SERVICE_TOKEN must be set — compliance decisions must not be forgeable',
    },
    {
      when: env.COMPLIANCE_SANCTIONS_PROVIDER === 'embedded',
      message:
        'COMPLIANCE_SANCTIONS_PROVIDER=embedded is not allowed in production — configure a vendor or composite provider',
    },
    {
      when: !env.COMPLIANCE_PII_ENC_KEY,
      message: 'COMPLIANCE_PII_ENC_KEY must be set — KYC/KYB metadata must be encrypted at rest',
    },
  ]);


  initTelemetry({
    serviceName: 'compliance',
    otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
    env: env.NODE_ENV,
  });

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(
    internalAuthMiddleware({
      serviceName: 'compliance',
      token: env.INTERNAL_SERVICE_TOKEN,
      nodeEnv: env.NODE_ENV,
      warn: (msg) => logger.warn(msg),
    }),
  );
  bootstrapHttpObservability(app, { serviceName: 'compliance' });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  app.setGlobalPrefix('v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SalyChain Compliance Service')
    .setDescription('Sanctions screening, KYC/KYB tier engine, case management')
    .setVersion('0.1.0')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  app.enableShutdownHooks();
  await app.listen(env.PORT);
  logger.info(`compliance service started on :${env.PORT} (sanctions=${env.COMPLIANCE_SANCTIONS_PROVIDER})`);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap compliance service', err);
  process.exit(1);
});
