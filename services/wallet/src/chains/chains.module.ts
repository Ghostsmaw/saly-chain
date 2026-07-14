import { Global, Module, type OnApplicationShutdown } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { BaseChainAdapter } from '@salychain/chain-base';
import { L3ChainAdapter, type L3Network } from '@salychain/chain-l3';
import { XrplChainAdapter } from '@salychain/chain-xrpl';
import { loadEnv } from '@salychain/config';
import { walletEnvSchema } from '../config/env.js';

export const BASE_ADAPTER = Symbol('BASE_ADAPTER');
export const XRPL_ADAPTER = Symbol('XRPL_ADAPTER');
export const L3_ADAPTER = Symbol('L3_ADAPTER');

@Injectable()
class XrplLifecycle implements OnApplicationShutdown {
  constructor(@Inject(XRPL_ADAPTER) private readonly xrpl: XrplChainAdapter) {}
  async onApplicationShutdown(): Promise<void> {
    await this.xrpl.disconnect();
  }
}

@Global()
@Module({
  providers: [
    {
      provide: BASE_ADAPTER,
      useFactory: (): BaseChainAdapter => {
        const env = loadEnv(walletEnvSchema);
        return new BaseChainAdapter({ network: env.BASE_NETWORK, rpcUrl: env.BASE_RPC_URL });
      },
    },
    {
      provide: XRPL_ADAPTER,
      useFactory: (): XrplChainAdapter => {
        const env = loadEnv(walletEnvSchema);
        return new XrplChainAdapter({ network: env.XRPL_NETWORK, wsUrl: env.XRPL_WS_URL });
      },
    },
    {
      provide: L3_ADAPTER,
      useFactory: (): L3ChainAdapter => {
        const env = loadEnv(walletEnvSchema);
        return new L3ChainAdapter({
          l3Network: env.L3_NETWORK as L3Network,
          rpcUrl: env.L3_L3_RPC_URL,
        });
      },
    },
    XrplLifecycle,
  ],
  exports: [BASE_ADAPTER, XRPL_ADAPTER, L3_ADAPTER],
})
export class ChainsModule {}
