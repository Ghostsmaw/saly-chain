import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Worker, type Job } from 'bullmq';
import type { Redis } from 'ioredis';
import { datasharesRunsTotal, datasharesRowsExportedTotal } from '@salychain/observability';
import { DATASHARES_ENV, type DatasharesEnv } from '../config/env.js';
import { ClickHouseReadService } from '../clickhouse/clickhouse.read.service.js';
import { getDataset } from '../datasets/named-datasets.js';
import { applyPolicy, parseAccessPolicy } from '../policy/policy.js';
import { serializeText } from '../export/serialize.js';
import { toParquetBuffer } from '../export/parquet.js';
import { ProviderRegistry } from '../providers/provider.registry.js';
import { DatasharesService, type RunJobData } from '../shares/datashares.service.js';
import { RUN_QUEUE_NAME, REDIS_CONNECTION } from './queue.module.js';

/**
 * Materializes datashare runs: curated query → access/redaction policy →
 * serialize (CSV/JSONL/Parquet) → export to the destination. Each run is
 * recorded as a ShareRun row; failures are retried by BullMQ (exponential
 * backoff) and surfaced as FAILED runs.
 */
@Injectable()
export class RunWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RunWorker.name);
  private worker?: Worker<RunJobData>;

  constructor(
    private readonly shares: DatasharesService,
    private readonly clickhouse: ClickHouseReadService,
    private readonly providers: ProviderRegistry,
    @Inject(REDIS_CONNECTION) private readonly redis: Redis,
    @Inject(DATASHARES_ENV) private readonly env: DatasharesEnv,
  ) {}

  async onModuleInit(): Promise<void> {
    this.worker = new Worker<RunJobData>(RUN_QUEUE_NAME, (job) => this.handle(job), {
      connection: this.redis,
      concurrency: 4,
    });
    this.worker.on('failed', (job, err) =>
      this.logger.warn(`run ${job?.id} failed: ${err.message}`),
    );
    this.logger.log(`RunWorker listening on ${RUN_QUEUE_NAME}`);
  }

  async onModuleDestroy(): Promise<void> {
    if (this.worker) await this.worker.close();
  }

  private async handle(job: Job<RunJobData>): Promise<void> {
    const share = await this.shares.requireById(job.data.shareId);
    // Scheduled jobs carry no runId — create the run record now.
    const runId = job.data.runId ?? (await this.shares.createRun(share.id, 'SCHEDULE')).id;

    const started = Date.now();
    await this.shares.markRunStart(runId);

    try {
      const dataset = getDataset(share.datasetId);
      if (!dataset) throw new Error(`dataset_removed:${share.datasetId}`);

      const built = dataset.build((share.params as Record<string, unknown>) ?? {});
      const rawRows = await this.clickhouse.query<Record<string, unknown>>(
        built.query,
        built.params,
      );

      const policy = parseAccessPolicy(share.policy);
      const result = applyPolicy(rawRows, dataset.columns, policy, {
        hmacKey: this.env.DATASHARES_REDACTION_SECRET,
        maxRows: this.env.SHARE_RUN_MAX_ROWS,
      });

      const { body, contentType, extension } =
        share.format === 'PARQUET'
          ? {
              body: await toParquetBuffer(result.rows, result.columns),
              contentType: 'application/octet-stream',
              extension: 'parquet',
            }
          : serializeText(share.format, result.rows, result.columns);

      const provider = this.providers.get(share.destination);
      const { location } = await provider.export({
        orgId: share.orgId,
        shareId: share.id,
        runId,
        destinationConfig: (share.destinationConfig as Record<string, unknown>) ?? {},
        body,
        contentType,
        extension,
        rowCount: result.rows.length,
      });

      await this.shares.markRunSucceeded(runId, share.id, {
        rowCount: result.rows.length,
        byteCount: body.byteLength,
        location,
        durationMs: Date.now() - started,
      });
      datasharesRunsTotal.inc({ destination: share.destination, outcome: 'succeeded' });
      datasharesRowsExportedTotal.inc({ destination: share.destination }, result.rows.length);
      this.logger.log(
        `run ${runId} ok: ${result.rows.length} rows, ${result.droppedColumns.length} cols redacted → ${location}`,
      );
    } catch (err) {
      await this.shares.markRunFailed(
        runId,
        share.id,
        (err as Error).message,
        Date.now() - started,
      );
      datasharesRunsTotal.inc({ destination: share.destination, outcome: 'failed' });
      throw err;
    }
  }
}
