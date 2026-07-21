import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { loadEnv } from '@salychain/config';
import { initTelemetry, bootstrapHttpObservability } from '@salychain/observability';
import { createLogger } from '@salychain/logger';
import { AppModule } from './app.module.js';
import { gatewayEnvSchema } from './config/env.js';

async function bootstrap() {
  const env = loadEnv(gatewayEnvSchema);
  const logger = createLogger({ service: 'gateway', env: env.NODE_ENV, level: env.LOG_LEVEL });

  initTelemetry({
    serviceName: 'gateway',
    otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
    env: env.NODE_ENV,
  });

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  bootstrapHttpObservability(app, { serviceName: 'gateway' });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  app.setGlobalPrefix('v1');

  // Express trust-proxy so req.ip resolves the real client behind ALB /
  // Cloudflare. Middleware must use req.ip — never parse X-Forwarded-For
  // directly (the leftmost entry is attacker-controlled).
  app.getHttpAdapter().getInstance().set('trust proxy', env.TRUST_PROXY_HOPS);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SalyChain API')
    .setDescription('Public B2B surface — intents, transactions, webhooks')
    .setVersion('0.1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'sk_…' })
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  app.enableShutdownHooks();
  await app.listen(env.PORT);
  logger.info(`gateway started on :${env.PORT}`);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap gateway', err);
  process.exit(1);
});
