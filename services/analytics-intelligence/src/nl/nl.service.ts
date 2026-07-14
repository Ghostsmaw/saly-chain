import { Inject, Injectable, Logger } from '@nestjs/common';
import { ulid } from 'ulid';
import { intelligenceNlQueriesTotal } from '@salychain/observability';
import { PrismaService } from '../prisma/prisma.service.js';
import { ClickHouseReadService } from '../clickhouse/clickhouse.read.service.js';
import { INTELLIGENCE_ENV, type IntelligenceEnv } from '../config/env.js';
import { compileSemanticQuery } from '../semantic/semantic.js';
import { RuleNlProvider, type NlProvider } from '../semantic/nl-planner.js';

export interface NlAnswer {
  status: 'executed' | 'unsupported' | 'failed';
  question: string;
  metric?: string;
  plan?: unknown;
  rationale?: string;
  sql?: string;
  rows?: Array<Record<string, unknown>>;
  row_count?: number;
  reason?: string;
}

@Injectable()
export class NlService {
  private readonly logger = new Logger(NlService.name);
  // The planner is pluggable; the rule provider is the deterministic default.
  // An LLM-backed provider (gated by INTELLIGENCE_LLM_ENABLED) can be injected
  // here later — it would still be constrained to emit a SemanticQuery.
  private readonly provider: NlProvider = new RuleNlProvider();

  constructor(
    private readonly prisma: PrismaService,
    private readonly clickhouse: ClickHouseReadService,
    @Inject(INTELLIGENCE_ENV) private readonly env: IntelligenceEnv,
  ) {}

  async ask(question: string, orgId?: string): Promise<NlAnswer> {
    const started = Date.now();
    const planResult = await this.provider.plan(question);

    if (!planResult.supported) {
      await this.log(orgId, question, 'UNSUPPORTED', null, { reason: planResult.reason });
      intelligenceNlQueriesTotal.inc({ outcome: 'unsupported' });
      return { status: 'unsupported', question, reason: planResult.reason };
    }

    try {
      const compiled = compileSemanticQuery(planResult.query, {
        maxLimit: Math.min(this.env.QUERY_MAX_ROWS, 10_000),
      });
      const rows = await this.clickhouse.query<Record<string, unknown>>(
        compiled.sql,
        compiled.params,
      );
      await this.log(orgId, question, 'EXECUTED', planResult.query, {
        metric: compiled.metric,
        rowCount: rows.length,
        latencyMs: Date.now() - started,
      });
      intelligenceNlQueriesTotal.inc({ outcome: 'executed' });
      return {
        status: 'executed',
        question,
        metric: compiled.metric,
        plan: planResult.query,
        rationale: planResult.rationale,
        sql: compiled.sql,
        rows,
        row_count: rows.length,
      };
    } catch (err) {
      const message = (err as Error).message;
      await this.log(orgId, question, 'FAILED', planResult.query, {
        error: message,
        latencyMs: Date.now() - started,
      });
      intelligenceNlQueriesTotal.inc({ outcome: 'failed' });
      this.logger.warn(`NL query failed: ${message}`);
      return { status: 'failed', question, plan: planResult.query, reason: message };
    }
  }

  private async log(
    orgId: string | undefined,
    question: string,
    status: 'PLANNED' | 'EXECUTED' | 'UNSUPPORTED' | 'FAILED',
    plan: unknown,
    extra: {
      metric?: string;
      rowCount?: number;
      latencyMs?: number;
      error?: string;
      reason?: string;
    },
  ): Promise<void> {
    try {
      await this.prisma.nlQuery.create({
        data: {
          id: `nlq_${ulid()}`,
          orgId: orgId ?? null,
          question,
          status,
          metric: extra.metric ?? null,
          plan: (plan ?? {}) as object,
          rowCount: extra.rowCount ?? null,
          latencyMs: extra.latencyMs ?? null,
          error: extra.error ?? extra.reason ?? null,
        },
      });
    } catch (err) {
      this.logger.debug(`failed to persist nl query log: ${(err as Error).message}`);
    }
  }
}
