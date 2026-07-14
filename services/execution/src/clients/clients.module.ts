import { Global, Module } from '@nestjs/common';
import {
  AgentsClient,
  ComplianceClient,
  IdentityClient,
  LedgerClient,
  LiquidityClient,
  RiskClient,
  RoutingClient,
  WalletClient,
} from '@salychain/sdk-internal';
import { loadEnv } from '@salychain/config';
import { createLogger } from '@salychain/logger';
import { executionEnvSchema } from '../config/env.js';

export const LEDGER_CLIENT = Symbol('LEDGER_CLIENT');
export const WALLET_CLIENT = Symbol('WALLET_CLIENT');
export const COMPLIANCE_CLIENT = Symbol('COMPLIANCE_CLIENT');
export const RISK_CLIENT = Symbol('RISK_CLIENT');
export const LIQUIDITY_CLIENT = Symbol('LIQUIDITY_CLIENT');
export const ROUTING_CLIENT = Symbol('ROUTING_CLIENT');
export const AGENTS_CLIENT = Symbol('AGENTS_CLIENT');
export const IDENTITY_CLIENT = Symbol('IDENTITY_CLIENT');

@Global()
@Module({
  providers: [
    {
      provide: LEDGER_CLIENT,
      useFactory: (): LedgerClient => {
        const env = loadEnv(executionEnvSchema);
        return new LedgerClient({
          baseUrl: env.LEDGER_BASE_URL,
          logger: createLogger({ service: 'execution-ledger' }),
        });
      },
    },
    {
      provide: WALLET_CLIENT,
      useFactory: (): WalletClient => {
        const env = loadEnv(executionEnvSchema);
        return new WalletClient({
          baseUrl: env.WALLET_BASE_URL,
          logger: createLogger({ service: 'execution-wallet' }),
        });
      },
    },
    {
      provide: COMPLIANCE_CLIENT,
      useFactory: (): ComplianceClient => {
        const env = loadEnv(executionEnvSchema);
        return new ComplianceClient({
          baseUrl: env.COMPLIANCE_BASE_URL,
          logger: createLogger({ service: 'execution-compliance' }),
        });
      },
    },
    {
      provide: RISK_CLIENT,
      useFactory: (): RiskClient => {
        const env = loadEnv(executionEnvSchema);
        return new RiskClient({
          baseUrl: env.RISK_BASE_URL,
          logger: createLogger({ service: 'execution-risk' }),
        });
      },
    },
    {
      provide: LIQUIDITY_CLIENT,
      useFactory: (): LiquidityClient => {
        const env = loadEnv(executionEnvSchema);
        return new LiquidityClient({
          baseUrl: env.LIQUIDITY_BASE_URL,
          logger: createLogger({ service: 'execution-liquidity' }),
        });
      },
    },
    {
      provide: ROUTING_CLIENT,
      useFactory: (): RoutingClient => {
        const env = loadEnv(executionEnvSchema);
        return new RoutingClient({
          baseUrl: env.ROUTING_BASE_URL,
          logger: createLogger({ service: 'execution-routing' }),
        });
      },
    },
    {
      provide: AGENTS_CLIENT,
      useFactory: (): AgentsClient => {
        const env = loadEnv(executionEnvSchema);
        return new AgentsClient({
          baseUrl: env.AGENTS_BASE_URL,
          logger: createLogger({ service: 'execution-agents' }),
        });
      },
    },
    {
      provide: IDENTITY_CLIENT,
      useFactory: (): IdentityClient => {
        const env = loadEnv(executionEnvSchema);
        return new IdentityClient({
          baseUrl: env.IDENTITY_BASE_URL,
          logger: createLogger({ service: 'execution-identity' }),
        });
      },
    },
  ],
  exports: [LEDGER_CLIENT, WALLET_CLIENT, COMPLIANCE_CLIENT, RISK_CLIENT, LIQUIDITY_CLIENT, ROUTING_CLIENT, AGENTS_CLIENT, IDENTITY_CLIENT],
})
export class ClientsModule {}
