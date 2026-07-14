import {
  Inject,
  Injectable,
  type OnApplicationBootstrap,
  type OnApplicationShutdown,
} from '@nestjs/common';
import { EventBus, OutboxRelay } from '@salychain/events';
import { createLogger } from '@salychain/logger';
import { loadEnv } from '@salychain/config';
import { EVENT_BUS } from '../events/events.module.js';
import { executionEnvSchema } from '../config/env.js';
import { OutboxService } from './outbox.service.js';

/**
 * Runs the outbox relay for the lifetime of the process. The relay tolerates
 * the event bus not yet being connected at boot — pending rows simply stay
 * PENDING and drain on a later tick once NATS is up.
 */
@Injectable()
export class OutboxRelayService implements OnApplicationBootstrap, OnApplicationShutdown {
  private relay: OutboxRelay | undefined;

  constructor(
    @Inject(EVENT_BUS) private readonly bus: EventBus,
    private readonly store: OutboxService,
  ) {}

  onApplicationBootstrap(): void {
    const env = loadEnv(executionEnvSchema);
    this.relay = new OutboxRelay({
      store: this.store,
      bus: this.bus,
      logger: createLogger({ service: 'execution.outbox' }),
      batchSize: env.OUTBOX_BATCH_SIZE,
      pollIntervalMs: env.OUTBOX_POLL_INTERVAL_MS,
      maxAttempts: env.OUTBOX_MAX_ATTEMPTS,
    });
    this.relay.start();
  }

  async onApplicationShutdown(): Promise<void> {
    await this.relay?.stop();
  }
}
