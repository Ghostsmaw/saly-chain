#!/usr/bin/env bash
# Scaffold a NestJS vertical service from the routing template pattern.
set -euo pipefail

if [[ $# -lt 3 ]]; then
  echo "Usage: $0 <name> <port> <id_prefix>"
  echo "Example: $0 finance 4023 fin_"
  exit 1
fi

NAME="$1"
PORT="$2"
PREFIX="$3"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIR="$ROOT/services/$NAME"
PKG="@salychain/service-$NAME"
DB="salychain_${NAME//-/_}"
TITLE="$(echo "$NAME" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1')"

mkdir -p "$DIR/src/config" "$DIR/src/common/filters" "$DIR/src/health" "$DIR/src/prisma" "$DIR/prisma/migrations"

cat > "$DIR/package.json" <<EOF
{
  "name": "$PKG",
  "version": "0.1.0",
  "private": true,
  "description": "SalyChain $TITLE vertical module (Milestone E)",
  "type": "module",
  "scripts": {
    "build": "nest build",
    "dev": "nest start --watch",
    "start": "node dist/main.js",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "test": "vitest run --passWithNoTests",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:deploy": "prisma migrate deploy",
    "clean": "rm -rf dist .turbo node_modules/.prisma"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.4",
    "@nestjs/core": "^10.4.4",
    "@nestjs/platform-express": "^10.4.4",
    "@nestjs/swagger": "^7.4.2",
    "@nestjs/terminus": "^10.2.3",
    "@prisma/client": "^5.20.0",
    "@salychain/config": "workspace:*",
    "@salychain/errors": "workspace:*",
    "@salychain/events": "workspace:*",
    "@salychain/intent-schema": "workspace:*",
    "@salychain/logger": "workspace:*",
    "@salychain/observability": "workspace:*",
    "@salychain/sdk-internal": "workspace:*",
    "@salychain/vertical-core": "workspace:*",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "ulid": "^2.3.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.5",
    "@nestjs/testing": "^10.4.4",
    "@types/node": "^20.14.10",
    "prisma": "^5.20.0",
    "typescript": "^5.6.2",
    "vitest": "^2.1.1"
  }
}
EOF

cat > "$DIR/tsconfig.json" <<'EOF'
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "module": "Node16",
    "moduleResolution": "Node16",
    "target": "ES2022",
    "verbatimModuleSyntax": false,
    "useDefineForClassFields": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "exactOptionalPropertyTypes": false,
    "noUncheckedIndexedAccess": false
  },
  "include": ["src/**/*"]
}
EOF

cat > "$DIR/nest-cli.json" <<'EOF'
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": false,
    "assets": [{ "include": "generated/**/*", "watchAssets": true }]
  }
}
EOF

cat > "$DIR/.env.example" <<EOF
PORT=$PORT
NODE_ENV=development
LOG_LEVEL=info
DATABASE_URL=postgresql://salychain:salychain@localhost:5433/$DB?schema=public
INTENT_BASE_URL=http://localhost:4008
EXECUTION_BASE_URL=http://localhost:4003
CONTRACT_REGISTRY_BASE_URL=http://localhost:4013
NATS_URL=nats://localhost:4222
EOF

cat > "$DIR/prisma/schema.prisma" <<EOF
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum OutboxStatus {
  PENDING
  PUBLISHED
  FAILED
}

model EventOutbox {
  id          String       @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  eventId     String       @unique @map("event_id")
  subject     String
  payload     Json
  status      OutboxStatus @default(PENDING)
  attempts    Int          @default(0)
  lastError   String?      @map("last_error")
  createdAt   DateTime     @default(now()) @map("created_at")
  publishedAt DateTime?    @map("published_at")

  @@index([status, createdAt])
  @@map("event_outbox")
}
EOF

ENV_SYM="$(echo "$NAME" | tr '[:lower:]-' '[:upper:]_')_ENV"

cat > "$DIR/src/config/env.ts" <<EOF
import { z } from 'zod';
import { commonEnvSchema } from '@salychain/config';

export const ${ENV_SYM} = Symbol('${ENV_SYM}');

export const ${NAME//-/_}EnvSchema = commonEnvSchema.extend({
  PORT: z.coerce.number().int().positive().default($PORT),
  DATABASE_URL: z.string().url(),
  INTENT_BASE_URL: z.string().url().default('http://localhost:4008'),
  EXECUTION_BASE_URL: z.string().url().default('http://localhost:4003'),
  CONTRACT_REGISTRY_BASE_URL: z.string().url().default('http://localhost:4013'),
  NATS_URL: z.string().default('nats://localhost:4222'),
  ID_PREFIX: z.string().default('${PREFIX}'),
});

export type ${TITLE// /}Env = z.infer<typeof ${NAME//-/_}EnvSchema>;
EOF

cat > "$DIR/src/config/env.runtime.ts" <<EOF
export { ${ENV_SYM} } from './env.js';
EOF

cat > "$DIR/src/main.ts" <<EOF
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { loadEnv } from '@salychain/config';
import { initTelemetry, bootstrapHttpObservability } from '@salychain/observability';
import { createLogger } from '@salychain/logger';
import { AppModule } from './app.module.js';
import { ${NAME//-/_}EnvSchema } from './config/env.js';

async function bootstrap() {
  const env = loadEnv(${NAME//-/_}EnvSchema);
  const logger = createLogger({ service: '$NAME', env: env.NODE_ENV, level: env.LOG_LEVEL });

  initTelemetry({
    serviceName: '$NAME',
    otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
    env: env.NODE_ENV,
  });

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  bootstrapHttpObservability(app, { serviceName: '$NAME' });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  app.setGlobalPrefix('v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SalyChain $TITLE Service')
    .setDescription('Milestone E vertical module')
    .setVersion('0.1.0')
    .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  app.enableShutdownHooks();
  await app.listen(env.PORT);
  logger.info(\`$NAME service started on :\${env.PORT}\`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap $NAME service', err);
  process.exit(1);
});
EOF

cp "$ROOT/services/routing/src/common/filters/domain-error.filter.ts" "$DIR/src/common/filters/domain-error.filter.ts"
cp "$ROOT/services/routing/src/health/health.controller.ts" "$DIR/src/health/health.controller.ts"
cp "$ROOT/services/routing/src/prisma/prisma.service.ts" "$DIR/src/prisma/prisma.service.ts"
cp "$ROOT/services/routing/src/prisma/prisma.module.ts" "$DIR/src/prisma/prisma.module.ts"

echo "Scaffolded $DIR (port $PORT, prefix $PREFIX)"
