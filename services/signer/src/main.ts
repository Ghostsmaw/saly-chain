import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { loadEnv, assertProductionPosture, internalAuthMiddleware } from '@salychain/config';
import { initTelemetry, bootstrapHttpObservability } from '@salychain/observability';
import { createLogger } from '@salychain/logger';
import { AppModule } from './app.module.js';
import { signerEnvSchema } from './config/env.js';

async function bootstrap() {
  const env = loadEnv(signerEnvSchema);
  const logger = createLogger({ service: 'signer', env: env.NODE_ENV, level: env.LOG_LEVEL });

  // Fail-closed: never custody real keys in production with the dev KMS,
  // and never run the custody signer reachable without internal auth.
  assertProductionPosture(env.NODE_ENV, [
    {
      when: env.KMS_PROVIDER === 'local',
      message: 'KMS_PROVIDER=local is forbidden in production; use the AWS KMS provider.',
    },
    {
      when: env.KMS_PROVIDER === 'aws' && !env.KMS_AWS_KEY_ID,
      message: 'KMS_AWS_KEY_ID is required when KMS_PROVIDER=aws.',
    },
    {
      when: !env.INTERNAL_SERVICE_TOKEN,
      message:
        'INTERNAL_SERVICE_TOKEN must be set — the signer custodies private keys and cannot run open',
    },
  ]);

  initTelemetry({
    serviceName: 'signer',
    otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
    env: env.NODE_ENV,
  });

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(
    internalAuthMiddleware({
      serviceName: 'signer',
      token: env.INTERNAL_SERVICE_TOKEN,
      nodeEnv: env.NODE_ENV,
      warn: (msg) => logger.warn(msg),
    }),
  );
  bootstrapHttpObservability(app, { serviceName: 'signer' });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SalyChain Signer Service')
    .setDescription('Isolated signing service. Returns signed transactions; never returns keys.')
    .setVersion('0.1.0')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  app.enableShutdownHooks();
  await app.listen(env.PORT);
  logger.info(`signer service started on :${env.PORT} (kms=${env.KMS_PROVIDER})`);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap signer service', err);
  process.exit(1);
});
