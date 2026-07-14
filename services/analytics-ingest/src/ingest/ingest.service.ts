import {
  Inject,
  Injectable,
  type OnApplicationBootstrap,
} from '@nestjs/common';
import {
  EventBus,
  SUBJECTS,
  type EventBySubject,
  type Subject,
} from '@salychain/events';
import { eventsConsumedTotal } from '@salychain/observability';
import { createLogger, type Logger } from '@salychain/logger';
import { EVENT_BUS } from '../events/events.module.js';
import { ClickHouseService } from '../clickhouse/clickhouse.service.js';
import { chDateTime, toCanonicalRow } from './mappers.js';

const ALL_SUBJECTS = Object.values(SUBJECTS) as Subject[];

/**
 * The realtime ingestion spine. On bootstrap it attaches a durable consumer per
 * subject; each event is landed in `raw_events` (the spine) plus its canonical
 * table. Delivery is at-least-once and ReplacingMergeTree dedups by event_id, so
 * the handler is safe to retry — on any failure we nack for redelivery.
 */
@Injectable()
export class IngestService implements OnApplicationBootstrap {
  private readonly logger: Logger = createLogger({ service: 'analytics-ingest.ingest' });

  constructor(
    @Inject(EVENT_BUS) private readonly bus: EventBus,
    private readonly clickhouse: ClickHouseService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    for (const subject of ALL_SUBJECTS) {
      const durable = `analytics_ingest_${subject.replace(/[^a-zA-Z0-9]/g, '_')}`;
      await this.bus.subscribe(subject, durable, (event) => this.handle(subject, event));
    }
    this.logger.info(`analytics-ingest subscribed to ${ALL_SUBJECTS.length} subjects`);
  }

  private async handle(
    subject: Subject,
    event: EventBySubject[Subject],
  ): Promise<'ack' | 'nack' | 'term'> {
    try {
      await this.clickhouse.insert('raw_events', {
        event_id: event.event_id,
        subject,
        occurred_at: chDateTime(new Date(event.occurred_at)),
        payload: JSON.stringify(event),
      });

      const mapped = toCanonicalRow(subject, event);
      if (mapped) {
        await this.clickhouse.insert(mapped.table, mapped.row);
      }

      eventsConsumedTotal.inc({ subject, outcome: 'ack' });
      return 'ack';
    } catch (err) {
      eventsConsumedTotal.inc({ subject, outcome: 'error' });
      this.logger.error(`ingest failed for ${subject}`, {
        event_id: event.event_id,
        err: (err as Error).message,
      });
      return 'nack';
    }
  }
}
