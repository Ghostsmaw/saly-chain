import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { LedgerClient } from '@salychain/sdk-internal';
import { loadEnv } from '@salychain/config';
import { reconciliationBreaksTotal, reconciliationRunsTotal } from '@salychain/observability';
import { PrismaService } from '../prisma/prisma.service.js';
import { LEDGER_CLIENT } from '../clients/clients.module.js';
import { executionEnvSchema } from '../config/env.js';
import { bankSettlementAccountCode } from '../transactions/topup.js';
import { TransactionsService } from '../transactions/transactions.service.js';
import {
  diffPayinReconciliation,
  type LedgerBankBalance,
  type PayinRecord,
  type ReconBreak,
} from './reconciliation.diff.js';

const SCOPE = 'fiat-payin';

export interface ReconciliationRunResult {
  run_id: string;
  scope: string;
  status: 'OK' | 'BREAKS_FOUND' | 'ERROR';
  checked: number;
  break_count: number;
  breaks: ReconBreak[];
}

/**
 * Periodically reconciles the fiat pay-in rail: it compares the execution
 * transaction record against the authoritative ledger balances and records
 * every discrepancy as a durable break. Disabled by default; enable with
 * `EXECUTION_RECONCILIATION_ENABLED=true`.
 */
@Injectable()
export class ReconciliationService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ReconciliationService.name);
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly prisma: PrismaService,
    @Inject(LEDGER_CLIENT) private readonly ledger: LedgerClient,
    private readonly txs: TransactionsService,
  ) {}

  onApplicationBootstrap(): void {
    const env = loadEnv(executionEnvSchema);
    if (!env.EXECUTION_RECONCILIATION_ENABLED) {
      this.logger.log('reconciliation poller disabled (EXECUTION_RECONCILIATION_ENABLED=false)');
      return;
    }
    this.timer = setInterval(() => {
      void this.runPayinReconciliation().catch((err) => {
        this.logger.warn(`reconciliation sweep failed: ${(err as Error).message}`);
      });
    }, env.EXECUTION_RECONCILIATION_INTERVAL_MS);
    this.timer.unref?.();
    this.logger.log(
      `reconciliation poller started (every ${env.EXECUTION_RECONCILIATION_INTERVAL_MS}ms)`,
    );
  }

  /** Run a single fiat pay-in reconciliation sweep, persisting the result. */
  async runPayinReconciliation(): Promise<ReconciliationRunResult> {
    const env = loadEnv(executionEnvSchema);
    const run = await this.prisma.reconciliationRun.create({ data: { scope: SCOPE } });

    try {
      const now = Date.now();
      const settledRows = await this.prisma.executionTransaction.findMany({
        where: { kind: 'FIAT_PAYIN', state: 'SETTLED' },
        include: {
          events: { where: { toState: 'SETTLED' }, orderBy: { occurredAt: 'desc' }, take: 1 },
        },
        take: 10_000,
      });
      const pendingRows = await this.prisma.executionTransaction.findMany({
        where: { kind: 'FIAT_PAYIN', state: 'AWAITING_CONFIRMATION' },
        take: 10_000,
      });

      const settled: PayinRecord[] = settledRows.map((tx) => {
        const detail = (tx.events[0]?.detail as { payin?: { amount_minor?: string } } | null)
          ?.payin;
        const meta = (tx.metadata as { payin?: { provider?: string } } | null)?.payin;
        const provider = meta?.provider ?? env.FIAT_PSP_PROVIDER;
        const requested = tx.amountMinor.toString();
        return {
          txId: tx.id,
          provider,
          currency: tx.currency.toUpperCase(),
          requestedMinor: requested,
          confirmedMinor: detail?.amount_minor ?? requested,
          hasLedgerEntry: Boolean(tx.ledgerEntryId),
          ageMinutes: Math.floor((now - tx.createdAt.getTime()) / 60_000),
        };
      });

      const pending: PayinRecord[] = pendingRows.map((tx) => {
        const meta = (tx.metadata as { payin?: { provider?: string } } | null)?.payin;
        return {
          txId: tx.id,
          provider: meta?.provider ?? env.FIAT_PSP_PROVIDER,
          currency: tx.currency.toUpperCase(),
          requestedMinor: tx.amountMinor.toString(),
          confirmedMinor: tx.amountMinor.toString(),
          hasLedgerEntry: Boolean(tx.ledgerEntryId),
          ageMinutes: Math.floor((now - tx.createdAt.getTime()) / 60_000),
        };
      });

      const balances = await this.fetchBankBalances(
        settled,
        env.EXECUTION_PAYIN_BANK_ACCOUNT_PREFIX,
      );

      const { checked, breaks } = diffPayinReconciliation({
        settled,
        pending,
        balances,
        expiryMinutes: env.EXECUTION_PAYIN_EXPIRY_MINUTES,
      });

      if (breaks.length > 0) {
        await this.prisma.reconciliationBreak.createMany({
          data: breaks.map((b) => ({
            runId: run.id,
            kind: b.kind,
            reference: b.reference ?? null,
            currency: b.currency ?? null,
            expectedMinor: b.expectedMinor ?? null,
            actualMinor: b.actualMinor ?? null,
            detail: (b.detail ?? undefined) as never,
          })),
        });
      }

      // Expire stale pending pay-ins so they leave AWAITING_CONFIRMATION.
      for (const b of breaks) {
        if (b.kind === 'STALE_PENDING' && b.reference) {
          await this.txs
            .confirmFiatPayinFromWebhook({
              reference: b.reference,
              outcome: 'FAILED',
              reason: 'pay-in expired (unfunded past expiry window)',
            })
            .catch((err) =>
              this.logger.warn(`expire ${b.reference} failed: ${(err as Error).message}`),
            );
        }
      }

      const status = breaks.length > 0 ? 'BREAKS_FOUND' : 'OK';
      await this.prisma.reconciliationRun.update({
        where: { id: run.id },
        data: {
          status,
          finishedAt: new Date(),
          checkedCount: checked,
          breakCount: breaks.length,
          summary: { breaks_by_kind: countByKind(breaks) } as never,
        },
      });
      reconciliationRunsTotal.inc({ scope: SCOPE, status });
      for (const [kind, count] of Object.entries(countByKind(breaks))) {
        reconciliationBreaksTotal.inc({ scope: SCOPE, kind }, count);
      }
      if (breaks.length > 0) {
        this.logger.warn(
          `reconciliation found ${breaks.length} break(s) over ${checked} record(s)`,
        );
      }

      return {
        run_id: run.id,
        scope: SCOPE,
        status,
        checked,
        break_count: breaks.length,
        breaks,
      };
    } catch (err) {
      await this.prisma.reconciliationRun.update({
        where: { id: run.id },
        data: {
          status: 'ERROR',
          finishedAt: new Date(),
          summary: { error: (err as Error).message } as never,
        },
      });
      reconciliationRunsTotal.inc({ scope: SCOPE, status: 'ERROR' });
      throw err;
    }
  }

  /** List the most recent reconciliation runs with their breaks. */
  async listRuns(limit: number) {
    return this.prisma.reconciliationRun.findMany({
      orderBy: { startedAt: 'desc' },
      take: limit,
      include: { breaks: { orderBy: { createdAt: 'asc' } } },
    });
  }

  private async fetchBankBalances(
    settled: PayinRecord[],
    prefix: string,
  ): Promise<LedgerBankBalance[]> {
    const pairs = new Map<string, { provider: string; currency: string }>();
    for (const rec of settled) {
      pairs.set(`${rec.provider}:${rec.currency}`, {
        provider: rec.provider,
        currency: rec.currency,
      });
    }

    const balances: LedgerBankBalance[] = [];
    for (const { provider, currency } of pairs.values()) {
      const code = bankSettlementAccountCode(provider, currency, prefix);
      try {
        const account = await this.ledger.getAccountByCode(code);
        const bal = await this.ledger.getAccountBalance(account.id);
        balances.push({ provider, currency, balanceMinor: bal.balance_minor });
      } catch {
        balances.push({ provider, currency, balanceMinor: '0' });
      }
    }
    return balances;
  }
}

function countByKind(breaks: ReconBreak[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const b of breaks) out[b.kind] = (out[b.kind] ?? 0) + 1;
  return out;
}
