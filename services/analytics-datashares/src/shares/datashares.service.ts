import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ulid } from 'ulid';
import { Queue } from 'bullmq';
import { NotFoundError, ValidationError } from '@salychain/errors';
import { datasharesActiveShares } from '@salychain/observability';
import {
  Datashare,
  DatashareDestination,
  DatashareFormat,
  DatashareStatus,
  RunTrigger,
  ShareRun,
  ShareRunStatus,
} from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProviderRegistry } from '../providers/provider.registry.js';
import { getDataset, NAMED_DATASET_IDS } from '../datasets/named-datasets.js';
import { parseAccessPolicy } from '../policy/policy.js';
import { RUN_QUEUE } from '../runs/queue.module.js';

export interface CreateDatashareInput {
  orgId: string;
  name: string;
  datasetId: string;
  params?: Record<string, unknown>;
  policy?: unknown;
  destination?: DatashareDestination;
  destinationConfig?: Record<string, unknown>;
  format?: DatashareFormat;
  description?: string;
  schedule?: string;
}

export interface RunJobData {
  shareId: string;
  /** Pre-created run id for manual runs; scheduled runs leave this undefined. */
  runId?: string;
}

/** 5- or 6-field cron, validated lightly here; BullMQ/cron-parser validates fully. */
const CRON_RE = /^(\S+\s+){4,5}\S+$/;

@Injectable()
export class DatasharesService implements OnModuleInit {
  private readonly logger = new Logger(DatasharesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly providers: ProviderRegistry,
    @Inject(RUN_QUEUE) private readonly queue: Queue<RunJobData>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.refreshActiveGauge();
    await this.resyncAllSchedulers();
  }

  // ── CRUD ────────────────────────────────────────────────────────────────
  async create(input: CreateDatashareInput): Promise<PublicDatashare> {
    if (!input.name || input.name.length > 120) {
      throw ValidationError('datashares.name.invalid', 'Datashare name must be 1–120 characters');
    }
    const dataset = getDataset(input.datasetId);
    if (!dataset) {
      throw ValidationError(
        'datashares.dataset.unknown',
        `Unknown dataset '${input.datasetId}'. Allowed: ${NAMED_DATASET_IDS.join(', ')}`,
      );
    }
    const params = dataset.schema.parse(input.params ?? {});
    const policy = parseAccessPolicy(input.policy);

    const destination = input.destination ?? 'S3';
    const destinationConfig = input.destinationConfig ?? {};
    this.providers.get(destination).validateConfig(destinationConfig);

    if (input.schedule !== undefined && !CRON_RE.test(input.schedule)) {
      throw ValidationError(
        'datashares.schedule.invalid',
        'schedule must be a 5- or 6-field cron expression',
      );
    }

    const id = `dshr_${ulid()}`;
    const created = await this.prisma.datashare.create({
      data: {
        id,
        orgId: input.orgId,
        name: input.name,
        description: input.description ?? null,
        datasetId: input.datasetId,
        params: params as object,
        policy: policy as object,
        destination,
        destinationConfig: destinationConfig as object,
        format: input.format ?? 'JSON',
        schedule: input.schedule ?? null,
      },
    });
    await this.syncScheduler(created);
    await this.refreshActiveGauge();
    this.logger.log(`datashare created id=${id} org=${input.orgId} dataset=${input.datasetId}`);
    return toPublic(created);
  }

  async list(orgId: string): Promise<PublicDatashare[]> {
    const rows = await this.prisma.datashare.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(toPublic);
  }

  async getById(id: string): Promise<PublicDatashare> {
    return toPublic(await this.requireById(id));
  }

  async setStatus(id: string, status: DatashareStatus): Promise<PublicDatashare> {
    await this.requireById(id);
    const updated = await this.prisma.datashare.update({ where: { id }, data: { status } });
    await this.syncScheduler(updated);
    await this.refreshActiveGauge();
    return toPublic(updated);
  }

  async delete(id: string): Promise<void> {
    await this.requireById(id);
    await this.removeScheduler(id);
    await this.prisma.datashare.delete({ where: { id } });
    await this.refreshActiveGauge();
  }

  // ── Runs ──────────────────────────────────────────────────────────────────
  async runNow(id: string): Promise<PublicShareRun> {
    const share = await this.requireById(id);
    if (share.status !== 'ACTIVE') {
      throw ValidationError('datashares.run.not_active', 'Only ACTIVE datashares can be run');
    }
    const run = await this.createRun(share.id, 'MANUAL');
    await this.queue.add('manual-run', { shareId: share.id, runId: run.id }, { jobId: run.id });
    return toPublicRun(run);
  }

  async listRuns(shareId: string, opts: { limit?: number } = {}): Promise<PublicShareRun[]> {
    await this.requireById(shareId);
    const runs = await this.prisma.shareRun.findMany({
      where: { shareId },
      orderBy: { createdAt: 'desc' },
      take: Math.min(Math.max(opts.limit ?? 50, 1), 200),
    });
    return runs.map(toPublicRun);
  }

  async createRun(shareId: string, trigger: RunTrigger): Promise<ShareRun> {
    const share = await this.requireById(shareId);
    return this.prisma.shareRun.create({
      data: { id: `dsrun_${ulid()}`, shareId, trigger, status: 'PENDING', format: share.format },
    });
  }

  async markRunStart(runId: string): Promise<void> {
    await this.prisma.shareRun.update({
      where: { id: runId },
      data: { status: 'RUNNING', startedAt: new Date() },
    });
  }

  async markRunSucceeded(
    runId: string,
    shareId: string,
    info: { rowCount: number; byteCount: number; location: string; durationMs: number },
  ): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.shareRun.update({
        where: { id: runId },
        data: {
          status: 'SUCCEEDED',
          rowCount: info.rowCount,
          byteCount: info.byteCount,
          location: info.location,
          durationMs: info.durationMs,
          finishedAt: new Date(),
          error: null,
        },
      }),
      this.prisma.datashare.update({
        where: { id: shareId },
        data: {
          runCount: { increment: 1 },
          lastRunAt: new Date(),
          lastSuccessAt: new Date(),
          lastRunStatus: 'SUCCEEDED',
          lastRowCount: info.rowCount,
        },
      }),
    ]);
  }

  async markRunFailed(
    runId: string,
    shareId: string,
    error: string,
    durationMs: number,
  ): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.shareRun.update({
        where: { id: runId },
        data: {
          status: 'FAILED',
          error: error.slice(0, 1_000),
          durationMs,
          finishedAt: new Date(),
        },
      }),
      this.prisma.datashare.update({
        where: { id: shareId },
        data: { runCount: { increment: 1 }, lastRunAt: new Date(), lastRunStatus: 'FAILED' },
      }),
    ]);
  }

  async requireById(id: string): Promise<Datashare> {
    const share = await this.prisma.datashare.findUnique({ where: { id } });
    if (!share) throw NotFoundError('datashares.not_found', `Datashare ${id} not found`);
    return share;
  }

  // ── Scheduling (BullMQ job schedulers) ─────────────────────────────────────
  private async syncScheduler(share: Datashare): Promise<void> {
    if (share.status === 'ACTIVE' && share.schedule) {
      await this.queue.upsertJobScheduler(
        share.id,
        { pattern: share.schedule },
        { name: 'scheduled-run', data: { shareId: share.id } },
      );
    } else {
      await this.removeScheduler(share.id);
    }
  }

  private async removeScheduler(shareId: string): Promise<void> {
    await this.queue.removeJobScheduler(shareId).catch(() => undefined);
  }

  private async resyncAllSchedulers(): Promise<void> {
    const active = await this.prisma.datashare.findMany({
      where: { status: 'ACTIVE', schedule: { not: null } },
    });
    for (const share of active) await this.syncScheduler(share);
    if (active.length) this.logger.log(`resynced ${active.length} datashare schedulers`);
  }

  private async refreshActiveGauge(): Promise<void> {
    const count = await this.prisma.datashare.count({ where: { status: 'ACTIVE' } });
    datasharesActiveShares.set(count);
  }
}

export interface PublicDatashare {
  id: string;
  org_id: string;
  name: string;
  description?: string;
  status: DatashareStatus;
  dataset_id: string;
  params: Record<string, unknown>;
  policy: Record<string, unknown>;
  destination: DatashareDestination;
  destination_config: Record<string, unknown>;
  format: DatashareFormat;
  schedule?: string;
  run_count: string;
  last_run_at?: string;
  last_success_at?: string;
  last_run_status?: ShareRunStatus;
  last_row_count?: number;
  created_at: string;
  updated_at: string;
}

export interface PublicShareRun {
  id: string;
  share_id: string;
  status: ShareRunStatus;
  trigger: RunTrigger;
  row_count: number | null;
  byte_count: number | null;
  location: string | null;
  format: DatashareFormat;
  duration_ms: number | null;
  error: string | null;
  started_at: string | null;
  finished_at: string | null;
  created_at: string;
}

function toPublic(s: Datashare): PublicDatashare {
  return {
    id: s.id,
    org_id: s.orgId,
    name: s.name,
    description: s.description ?? undefined,
    status: s.status,
    dataset_id: s.datasetId,
    params: (s.params as Record<string, unknown>) ?? {},
    policy: (s.policy as Record<string, unknown>) ?? {},
    destination: s.destination,
    destination_config: (s.destinationConfig as Record<string, unknown>) ?? {},
    format: s.format,
    schedule: s.schedule ?? undefined,
    run_count: s.runCount.toString(),
    last_run_at: s.lastRunAt?.toISOString(),
    last_success_at: s.lastSuccessAt?.toISOString(),
    last_run_status: s.lastRunStatus ?? undefined,
    last_row_count: s.lastRowCount ?? undefined,
    created_at: s.createdAt.toISOString(),
    updated_at: s.updatedAt.toISOString(),
  };
}

function toPublicRun(r: ShareRun): PublicShareRun {
  return {
    id: r.id,
    share_id: r.shareId,
    status: r.status,
    trigger: r.trigger,
    row_count: r.rowCount,
    byte_count: r.byteCount,
    location: r.location,
    format: r.format,
    duration_ms: r.durationMs,
    error: r.error,
    started_at: r.startedAt?.toISOString() ?? null,
    finished_at: r.finishedAt?.toISOString() ?? null,
    created_at: r.createdAt.toISOString(),
  };
}
