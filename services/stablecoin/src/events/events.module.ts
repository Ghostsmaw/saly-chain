import { Global, Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { EventBus } from '@salychain/events';
import { createLogger } from '@salychain/logger';
import { stablecoinEnvSchema } from '../config/env.js';

export const EVENT_BUS = Symbol('EVENT_BUS');

@Global()
@Module({
  providers: [
    {
      provide: EVENT_BUS,
      useFactory: () => {
        const env = loadEnv(stablecoinEnvSchema);
        const logger = createLogger({ service: 'stablecoin', env: env.NODE_ENV });
        return new EventBus({ servers: env.NATS_URL, serviceName: 'stablecoin', logger });
      },
    },
  ],
  exports: [EVENT_BUS],
})
export class EventsModule {}
