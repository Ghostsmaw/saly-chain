import {
  Global,
  Inject,
  Injectable,
  Logger,
  Module,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { EventBus, SUBJECTS, type Subject } from '@salychain/events';
import { loadEnv } from '@salychain/config';
import { createLogger } from '@salychain/logger';
import { datastreamsMatchedTotal, eventsConsumedTotal } from '@salychain/observability';
import { datastreamsEnvSchema } from '../config/env.js';
import { StreamsModule } from '../streams/streams.module.js';
import { StreamsService } from '../streams/streams.service.js';
import { DeliveryService } from '../delivery/delivery.service.js';
import { WebsocketHub } from '../sinks/websocket.hub.js';
import { extractEventFacets } from '../filters/facets.js';

export const EVENT_BUS = Symbol('EVENT_BUS');

/**
 * Datastreams consumes the FULL event spine — including `salychain.chain.*`,
 * which webhooks intentionally omits — because partners subscribe to on-chain
 * observations (transfers, blocks) as a first-class product. Per-stream filters
 * (not the subscription's subject list) decide what each customer receives.
 */
const ALL_SUBJECTS: Subject[] = Object.values(SUBJECTS);

@Injectable()
class EventBusLifecycle implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger('Datastreams.EventBus');

  constructor(
    @Inject(EVENT_BUS) private readonly bus: EventBus,
    private readonly streams: StreamsService,
    private readonly delivery: DeliveryService,
    private readonly websockets: WebsocketHub,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.bus.start();
    for (const subject of ALL_SUBJECTS) {
      const durable = `datastreams_${subject.replace(/[^a-zA-Z0-9]/g, '_')}`;
      await this.bus.subscribe(subject, durable, (event) => this.handle(subject, event));
    }
    this.logger.log(`subscribed to ${ALL_SUBJECTS.length} subjects`);
  }

  async onApplicationShutdown(): Promise<void> {
    await this.bus.stop();
  }

  private async handle(subject: Subject, event: unknown): Promise<'ack' | 'nack'> {
    const eventId = (event as { event_id: string }).event_id;
    try {
      const active = await this.streams.listActiveCompiled();
      if (active.length === 0) return 'ack';

      // Extract facets once, then evaluate every active stream against them.
      const facets = extractEventFacets(subject, event);

      let matched = 0;
      for (const stream of active) {
        if (!stream.compiled.matchesFacets(subject, facets)) continue;
        matched += 1;

        if (stream.sink === 'WEBSOCKET') {
          // Ephemeral, best-effort live tail: broadcast to connected clients,
          // no delivery row / retry / DLQ. Only counts as a match if a client
          // is actually listening.
          const delivered = this.websockets.broadcast(stream.id, {
            stream_id: stream.id,
            subject,
            event_id: eventId,
            data: event,
          });
          if (delivered > 0) {
            datastreamsMatchedTotal.inc({ sink: 'WEBSOCKET' });
            await this.streams.recordMatch(stream.id);
          }
          continue;
        }

        // Durable sinks (webhook/Kafka): materialize + enqueue first, then bump
        // match stats so the count reflects work actually scheduled.
        const { enqueued } = await this.delivery.enqueueMatch({
          streamId: stream.id,
          subject,
          eventId,
          payload: event,
        });
        if (enqueued) {
          datastreamsMatchedTotal.inc({ sink: stream.sink });
          await this.streams.recordMatch(stream.id);
        }
      }
      eventsConsumedTotal.inc({ subject, outcome: 'ack' });
      this.logger.debug?.(
        `event ${eventId} on ${subject} matched ${matched}/${active.length} streams`,
      );
      return 'ack';
    } catch (err) {
      eventsConsumedTotal.inc({ subject, outcome: 'error' });
      this.logger.error(`failed to fan-out ${subject} event=${eventId}: ${(err as Error).message}`);
      return 'nack';
    }
  }
}

@Global()
@Module({
  imports: [StreamsModule],
  providers: [
    {
      provide: EVENT_BUS,
      useFactory: () => {
        const env = loadEnv(datastreamsEnvSchema);
        return new EventBus({
          servers: env.NATS_URL,
          serviceName: 'analytics-datastreams',
          logger: createLogger({ service: 'analytics-datastreams.events' }),
        });
      },
    },
    EventBusLifecycle,
  ],
  exports: [EVENT_BUS],
})
export class EventsModule {}
