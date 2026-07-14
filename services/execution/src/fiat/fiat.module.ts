import { Global, Module } from '@nestjs/common';
import { createFiatAdapter, pickFiatEnv, type FiatAdapter } from '@salychain/chain-fiat';

export const FIAT_ADAPTER = Symbol('FIAT_ADAPTER');

@Global()
@Module({
  providers: [
    {
      provide: FIAT_ADAPTER,
      useFactory: (): FiatAdapter => createFiatAdapter(pickFiatEnv(process.env as Record<string, string>)),
    },
  ],
  exports: [FIAT_ADAPTER],
})
export class FiatModule {}
