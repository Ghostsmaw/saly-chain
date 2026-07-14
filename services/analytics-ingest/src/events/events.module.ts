import {
  Global,
  Inject,
  Injectable,
  Module,
  type OnApplicationShutdown,
  type OnModuleInit,
} from '@nestjs/common';
import { EventBus } from '@salychain/events';
import { loadEnv } from '@salychain/config';
import { createLogger } from '@salychain/logger';
import { analyticsIngestEnvSchema } from '../config/env.js';

export const EVENT_BUS = Symbol('EVENT_BUS');

@Injectable()
class EventBusLifecycle implements OnModuleInit, OnApplicationShutdown {
  constructor(@Inject(EVENT_BUS) private readonly bus: EventBus) {}
  async onModuleInit(): Promise<void> {
    await this.bus.start();
  }
  async onApplicationShutdown(): Promise<void> {
    await this.bus.stop();
  }
}

@Global()
@Module({
  providers: [
    {
      provide: EVENT_BUS,
      useFactory: () => {
        const env = loadEnv(analyticsIngestEnvSchema);
        return new EventBus({
          servers: env.NATS_URL,
          serviceName: 'analytics-ingest',
          logger: createLogger({ service: 'analytics-ingest.events' }),
        });
      },
    },
    EventBusLifecycle,
  ],
  exports: [EVENT_BUS],
})
export class EventsModule {}
