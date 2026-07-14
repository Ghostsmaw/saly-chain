import { Global, Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventBus, SUBJECTS, type Subject } from '@salychain/events';
import { loadEnv } from '@salychain/config';
import { createLogger } from '@salychain/logger';
import { webhooksEnvSchema } from '../config/env.js';
import { DeliveryService } from '../delivery/delivery.service.js';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module.js';

export const EVENT_BUS = Symbol('EVENT_BUS');

/**
 * Subjects we re-broadcast to webhook subscribers. Intentionally NOT including
 * `salychain.chain.*` — partners care about *our* transaction lifecycle, not
 * the per-block observation chatter.
 */
const FANOUT_SUBJECTS: Subject[] = [
  SUBJECTS.INTENT_RECEIVED,
  SUBJECTS.INTENT_SCREENED,
  SUBJECTS.INTENT_ROUTED,
  SUBJECTS.INTENT_REJECTED,
  SUBJECTS.TX_CREATED,
  SUBJECTS.TX_RESERVED,
  SUBJECTS.TX_EXECUTING,
  SUBJECTS.TX_AWAITING_CONFIRMATION,
  SUBJECTS.TX_SETTLED,
  SUBJECTS.TX_FAILED,
  SUBJECTS.TX_REVERSED,
  // Agent lifecycle — partners building on AI agents want these.
  SUBJECTS.AGENT_CREATED,
  SUBJECTS.AGENT_POLICY_UPDATED,
  SUBJECTS.AGENT_SPEND_DENIED,
];

@Injectable()
class EventBusLifecycle implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger('Webhooks.EventBus');
  constructor(
    @Inject(EVENT_BUS) private readonly bus: EventBus,
    private readonly delivery: DeliveryService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.bus.start();
    for (const subject of FANOUT_SUBJECTS) {
      await this.bus.subscribe(subject, `webhooks-${subject.replace(/\./g, '_')}`, async (event) => {
        try {
          await this.delivery.enqueueFromEvent({
            subject,
            eventId: (event as { event_id: string }).event_id,
            payload: event,
          });
          return 'ack';
        } catch (err) {
          this.logger.error(`failed to fan-out ${subject}: ${(err as Error).message}`);
          return 'nack';
        }
      });
    }
    this.logger.log(`subscribed to ${FANOUT_SUBJECTS.length} subjects`);
  }

  async onApplicationShutdown(): Promise<void> { await this.bus.stop(); }
}

@Global()
@Module({
  imports: [SubscriptionsModule],
  providers: [
    {
      provide: EVENT_BUS,
      useFactory: () => {
        const env = loadEnv(webhooksEnvSchema);
        return new EventBus({
          servers: env.NATS_URL,
          serviceName: 'webhooks',
          logger: createLogger({ service: 'webhooks.events' }),
        });
      },
    },
    EventBusLifecycle,
  ],
  exports: [EVENT_BUS],
})
export class EventsModule {}
