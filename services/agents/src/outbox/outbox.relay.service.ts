import {
  Inject,
  Injectable,
  type OnApplicationBootstrap,
  type OnApplicationShutdown,
} from '@nestjs/common';
import { EventBus, OutboxRelay } from '@salychain/events';
import { createLogger } from '@salychain/logger';
import { EVENT_BUS } from '../events/events.module.js';
import { OutboxService } from './outbox.service.js';

@Injectable()
export class OutboxRelayService implements OnApplicationBootstrap, OnApplicationShutdown {
  private relay: OutboxRelay | undefined;

  constructor(
    @Inject(EVENT_BUS) private readonly bus: EventBus,
    private readonly store: OutboxService,
  ) {}

  onApplicationBootstrap(): void {
    this.relay = new OutboxRelay({
      store: this.store,
      bus: this.bus,
      logger: createLogger({ service: 'agents.outbox' }),
    });
    this.relay.start();
  }

  async onApplicationShutdown(): Promise<void> {
    await this.relay?.stop();
  }
}
