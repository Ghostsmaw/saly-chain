import { Global, Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { createLogger } from '@salychain/logger';
import {
  DataClient,
  DatasharesClient,
  DatastreamsClient,
  ExecutionClient,
  IntelligenceClient,
  IntentClient,
  MerchantClient,
  StablecoinClient,
  WebhooksClient,
} from '@salychain/sdk-internal';
import { gatewayEnvSchema } from '../config/env.js';

export const INTENT_CLIENT = Symbol('INTENT_CLIENT');
export const EXECUTION_CLIENT = Symbol('EXECUTION_CLIENT');
export const WEBHOOKS_CLIENT = Symbol('WEBHOOKS_CLIENT');
export const DATA_CLIENT = Symbol('DATA_CLIENT');
export const DATASTREAMS_CLIENT = Symbol('DATASTREAMS_CLIENT');
export const DATASHARES_CLIENT = Symbol('DATASHARES_CLIENT');
export const INTELLIGENCE_CLIENT = Symbol('INTELLIGENCE_CLIENT');
export const MERCHANT_CLIENT = Symbol('MERCHANT_CLIENT');
export const STABLECOIN_CLIENT = Symbol('STABLECOIN_CLIENT');

@Global()
@Module({
  providers: [
    {
      provide: INTENT_CLIENT,
      useFactory: () => {
        const env = loadEnv(gatewayEnvSchema);
        return new IntentClient({
          baseUrl: env.INTENT_BASE_URL,
          logger: createLogger({ service: 'gateway.intent' }),
        });
      },
    },
    {
      provide: EXECUTION_CLIENT,
      useFactory: () => {
        const env = loadEnv(gatewayEnvSchema);
        return new ExecutionClient({
          baseUrl: env.EXECUTION_BASE_URL,
          logger: createLogger({ service: 'gateway.execution' }),
        });
      },
    },
    {
      provide: WEBHOOKS_CLIENT,
      useFactory: () => {
        const env = loadEnv(gatewayEnvSchema);
        return new WebhooksClient({
          baseUrl: env.WEBHOOKS_BASE_URL,
          logger: createLogger({ service: 'gateway.webhooks' }),
        });
      },
    },
    {
      provide: DATA_CLIENT,
      useFactory: () => {
        const env = loadEnv(gatewayEnvSchema);
        return new DataClient({
          baseUrl: env.DATA_BASE_URL,
          logger: createLogger({ service: 'gateway.data' }),
        });
      },
    },
    {
      provide: DATASTREAMS_CLIENT,
      useFactory: () => {
        const env = loadEnv(gatewayEnvSchema);
        return new DatastreamsClient({
          baseUrl: env.DATASTREAMS_BASE_URL,
          logger: createLogger({ service: 'gateway.datastreams' }),
        });
      },
    },
    {
      provide: DATASHARES_CLIENT,
      useFactory: () => {
        const env = loadEnv(gatewayEnvSchema);
        return new DatasharesClient({
          baseUrl: env.DATASHARES_BASE_URL,
          logger: createLogger({ service: 'gateway.datashares' }),
        });
      },
    },
    {
      provide: INTELLIGENCE_CLIENT,
      useFactory: () => {
        const env = loadEnv(gatewayEnvSchema);
        return new IntelligenceClient({
          baseUrl: env.INTELLIGENCE_BASE_URL,
          logger: createLogger({ service: 'gateway.intelligence' }),
        });
      },
    },
    {
      provide: MERCHANT_CLIENT,
      useFactory: () => {
        const env = loadEnv(gatewayEnvSchema);
        return new MerchantClient({
          baseUrl: env.MERCHANT_BASE_URL,
          logger: createLogger({ service: 'gateway.merchant' }),
        });
      },
    },
    {
      provide: STABLECOIN_CLIENT,
      useFactory: () => {
        const env = loadEnv(gatewayEnvSchema);
        return new StablecoinClient({
          baseUrl: env.STABLECOIN_BASE_URL,
          logger: createLogger({ service: 'gateway.stablecoin' }),
        });
      },
    },
  ],
  exports: [
    INTENT_CLIENT,
    EXECUTION_CLIENT,
    WEBHOOKS_CLIENT,
    DATA_CLIENT,
    DATASTREAMS_CLIENT,
    DATASHARES_CLIENT,
    INTELLIGENCE_CLIENT,
    MERCHANT_CLIENT,
    STABLECOIN_CLIENT,
  ],
})
export class ClientsModule {}
