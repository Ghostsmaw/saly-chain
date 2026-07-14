import { Inject, Injectable } from '@nestjs/common';
import { ValidationError } from '@salychain/errors';
import { ExecutionClient, runWithTenant } from '@salychain/sdk-internal';
import { merchantSettlementReportsTotal } from '@salychain/observability';
import { PrismaService } from '../prisma/prisma.service.js';
import { EXECUTION_CLIENT } from '../clients/clients.module.js';
import { assertOrgScoped, requireTenantOrgId } from '../common/tenant.js';
import { rollupSettlement, type SettlementTxRow } from './settlement.rollup.js';
import type { SettlementReport } from '../generated/prisma/index.js';

export interface GenerateSettlementInput {
  period_start: string;
  period_end: string;
  currency?: string;
}

export interface SettlementReportDto {
  id: string;
  org_id: string;
  period_start: string;
  period_end: string;
  currency: string | null;
  status: SettlementReport['status'];
  total_settled_minor: string | null;
  transaction_count: number | null;
  lines: unknown;
  error: string | null;
  generated_at: string | null;
  created_at: string;
}

function toReportDto(report: SettlementReport): SettlementReportDto {
  return {
    id: report.id,
    org_id: report.orgId,
    period_start: report.periodStart.toISOString(),
    period_end: report.periodEnd.toISOString(),
    currency: report.currency,
    status: report.status,
    total_settled_minor: report.totalSettledMinor?.toString() ?? null,
    transaction_count: report.transactionCount,
    lines: report.lines,
    error: report.error,
    generated_at: report.generatedAt?.toISOString() ?? null,
    created_at: report.createdAt.toISOString(),
  };
}

@Injectable()
export class SettlementService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(EXECUTION_CLIENT) private readonly execution: ExecutionClient,
  ) {}

  async generate(input: GenerateSettlementInput) {
    const orgId = requireTenantOrgId();
    const periodStart = new Date(input.period_start);
    const periodEnd = new Date(input.period_end);
    if (Number.isNaN(periodStart.getTime()) || Number.isNaN(periodEnd.getTime())) {
      throw ValidationError('merchant.period.invalid', 'Invalid period_start or period_end');
    }
    if (periodEnd <= periodStart) {
      throw ValidationError('merchant.period.invalid', 'period_end must be after period_start');
    }

    const pending = await this.prisma.settlementReport.create({
      data: {
        orgId,
        periodStart,
        periodEnd,
        currency: input.currency?.toUpperCase() ?? null,
        status: 'PENDING',
      },
    });

    try {
      const rows = await this.fetchSettledPayins(orgId);
      const sessions = await this.prisma.checkoutSession.findMany({
        where: {
          orgId,
          executionTransactionId: { in: rows.map((r) => r.id) },
        },
        select: {
          id: true,
          paymentLinkId: true,
          customerName: true,
          executionTransactionId: true,
        },
      });
      const sessionByTx = new Map(
        sessions
          .filter((s) => s.executionTransactionId)
          .map((s) => [s.executionTransactionId!, s]),
      );

      const enrichedRows = rows.map((row) => {
        const session = sessionByTx.get(row.id);
        if (!session) return row;
        return {
          ...row,
          metadata: {
            ...(row.metadata ?? {}),
            merchant: {
              checkout_session_id: session.id,
              ...(session.paymentLinkId ? { payment_link_id: session.paymentLinkId } : {}),
            },
            payin: {
              ...(((row.metadata ?? {}).payin as Record<string, unknown> | undefined) ?? {}),
              customer_name: session.customerName,
            },
          },
        };
      });

      const rollup = rollupSettlement(
        enrichedRows,
        periodStart,
        periodEnd,
        input.currency?.toUpperCase(),
      );

      const ready = await this.prisma.settlementReport.update({
        where: { id: pending.id },
        data: {
          status: 'READY',
          totalSettledMinor: BigInt(rollup.total_settled_minor),
          transactionCount: rollup.transaction_count,
          lines: rollup.lines as object,
          generatedAt: new Date(),
        },
      });

      merchantSettlementReportsTotal.inc({ outcome: 'ready' });
      return toReportDto(ready);
    } catch (err) {
      const failed = await this.prisma.settlementReport.update({
        where: { id: pending.id },
        data: {
          status: 'FAILED',
          error: err instanceof Error ? err.message : 'report generation failed',
        },
      });
      merchantSettlementReportsTotal.inc({ outcome: 'failed' });
      return toReportDto(failed);
    }
  }

  private async fetchSettledPayins(orgId: string): Promise<SettlementTxRow[]> {
    const out: SettlementTxRow[] = [];
    let cursor: string | undefined;

    for (;;) {
      const page = await runWithTenant({ orgId }, () =>
        this.execution.listTransactions(
          { kind: 'FIAT_PAYIN', state: 'SETTLED', limit: 100, ...(cursor ? { cursor } : {}) },
          { orgId },
        ),
      );

      for (const tx of page.data) {
        out.push({
          id: tx.id,
          amount_minor: tx.source.amount_minor,
          currency: tx.source.currency,
          settled_at: tx.settled_at ?? tx.created_at,
          metadata: this.txMetadata(tx),
        });
      }

      if (!page.next_cursor) break;
      cursor = page.next_cursor;
    }

    return out;
  }

  private txMetadata(tx: { events?: Array<{ detail?: Record<string, unknown> }> }): Record<
    string,
    unknown
  > | null {
    for (const ev of tx.events ?? []) {
      if (ev.detail?.payin) return ev.detail;
    }
    return null;
  }

  async list(limit: number) {
    const orgId = requireTenantOrgId();
    const take = Math.min(Math.max(limit, 1), 100);
    const rows = await this.prisma.settlementReport.findMany({
      where: { orgId },
      orderBy: { createdAt: 'desc' },
      take,
    });
    return { data: rows.map(toReportDto) };
  }

  async getById(id: string) {
    const orgId = requireTenantOrgId();
    const report = await this.prisma.settlementReport.findUnique({ where: { id } });
    if (!report) {
      throw ValidationError('merchant.report.not_found', 'Settlement report not found');
    }
    assertOrgScoped(orgId, report.orgId);
    return toReportDto(report);
  }

  async exportCsv(id: string) {
    const report = await this.getById(id);
    const lines = Array.isArray(report.lines) ? report.lines : [];
    const header = 'transaction_id,amount_minor,currency,settled_at,checkout_session_id,payment_link_id,customer_name';
    const body = lines
      .map((line) => {
        const row = line as Record<string, string | undefined>;
        return [
          row.transaction_id ?? '',
          row.amount_minor ?? '',
          row.currency ?? '',
          row.settled_at ?? '',
          row.checkout_session_id ?? '',
          row.payment_link_id ?? '',
          csvEscape(row.customer_name ?? ''),
        ].join(',');
      })
      .join('\n');

    return {
      report_id: report.id,
      content_type: 'text/csv',
      filename: `settlement-${report.id.slice(0, 8)}.csv`,
      body: `${header}\n${body}`,
    };
  }
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}
