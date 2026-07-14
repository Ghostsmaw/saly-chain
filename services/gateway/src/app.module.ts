import { MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';

import { PrismaModule } from './prisma/prisma.module.js';
import { RedisModule } from './proxy/redis.module.js';
import { ClientsModule } from './proxy/clients.module.js';
import { ApiKeysClientModule } from './auth/apikeys.client.module.js';
import { S4ClientsModule } from './auth/s4-clients.module.js';

import { ApiKeyCache } from './auth/apikey.cache.js';
import { AuthMiddleware } from './auth/auth.middleware.js';
import { ScopeGuard } from './auth/scope.guard.js';
import { RateLimitService } from './ratelimit/ratelimit.service.js';
import { RateLimitMiddleware } from './common/middleware/rate-limit.middleware.js';
import { RequestContextMiddleware } from './common/middleware/request-context.middleware.js';
import { RequestLogMiddleware } from './common/middleware/request-log.middleware.js';
import { TenantContextMiddleware } from './common/middleware/tenant-context.middleware.js';
import { RequestLogService } from './proxy/request-log.service.js';
import { IdempotencyService } from './idempotency/idempotency.service.js';

import { IntentsController } from './routes/intents.controller.js';
import { TransactionsController } from './routes/transactions.controller.js';
import { PayinsController } from './routes/payins.controller.js';
import { WebhooksController } from './routes/webhooks.controller.js';
import { AgentsController } from './routes/agents.controller.js';
import { WalletsController } from './routes/wallets.controller.js';
import { DataController } from './routes/data.controller.js';
import { DatastreamsController } from './routes/datastreams.controller.js';
import { DatasharesController } from './routes/datashares.controller.js';
import { IntelligenceController } from './routes/intelligence.controller.js';
import { MerchantController } from './routes/merchant.controller.js';
import { StablecoinController } from './routes/stablecoin.controller.js';
import { RegistryController } from './routes/registry.controller.js';
import { VerticalsController } from './routes/verticals.controller.js';

import { LogsController, InternalLogsController } from './routes/logs.controller.js';
import { HealthController } from './health/health.controller.js';
import { DomainErrorFilter } from './common/filters/domain-error.filter.js';

@Module({
  imports: [
    TerminusModule,
    PrismaModule,
    RedisModule,
    ClientsModule,
    ApiKeysClientModule,
    S4ClientsModule,
  ],
  controllers: [
    IntentsController,
    TransactionsController,
    PayinsController,
    WebhooksController,
    AgentsController,
    WalletsController,
    DataController,
    DatastreamsController,
    DatasharesController,
    IntelligenceController,
    MerchantController,
    StablecoinController,
    RegistryController,
    VerticalsController,
    LogsController,
    InternalLogsController,
    HealthController,
  ],
  providers: [
    ApiKeyCache,
    AuthMiddleware,
    RateLimitService,
    RequestLogService,
    IdempotencyService,
    ScopeGuard,
    { provide: APP_FILTER, useClass: DomainErrorFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // Order matters:
    //   1. context (correlation id)
    //   2. log start time (so latency is correct on auth failures too)
    //   3. auth (sets req.auth)
    //   4. rate limit (needs req.auth)
    consumer.apply(RequestContextMiddleware).forRoutes('*');
    consumer.apply(RequestLogMiddleware).forRoutes('*');
    consumer
      .apply(AuthMiddleware, RateLimitMiddleware, TenantContextMiddleware)
      .exclude(
        { path: 'v1/health', method: RequestMethod.GET },
        { path: 'docs', method: RequestMethod.GET },
        { path: 'docs/(.*)', method: RequestMethod.GET },
        { path: 'v1/internal/logs', method: RequestMethod.GET },
        { path: 'v1/internal/logs/summary', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
