import {
  Global,
  Inject,
  Injectable,
  Module,
  type OnApplicationBootstrap,
  type OnApplicationShutdown,
} from '@nestjs/common';
import { EventBus } from '@salychain/events';
import { createLogger } from '@salychain/logger';
import { loadEnv } from '@salychain/config';
import { executionEnvSchema } from '../config/env.js';

export const EVENT_BUS = Symbol('EVENT_BUS');

@Injectable()
class EventBusLifecycle implements OnApplicationBootstrap, OnApplicationShutdown {
  constructor(@Inject(EVENT_BUS) private readonly bus: EventBus) {}
  async onApplicationBootstrap(): Promise<void> { await this.bus.start(); }
  async onApplicationShutdown(): Promise<void> { await this.bus.stop(); }
}

@Global()
@Module({
  providers: [
    {
      provide: EVENT_BUS,
      useFactory: (): EventBus =>
        new EventBus({
          servers: loadEnv(executionEnvSchema).NATS_URL,
          serviceName: 'execution',
          logger: createLogger({ service: 'execution-events' }),
        }),
    },
    EventBusLifecycle,
  ],
  exports: [EVENT_BUS],
})
export class EventsModule {}
