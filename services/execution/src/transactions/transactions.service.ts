import { Inject, Injectable, Logger } from '@nestjs/common';
import { ulid } from 'ulid';
import {
  type ExecutionTransaction,
  type ExecutionTransactionEvent,
  type ExecutionTransactionKind,
  type ExecutionTransactionState,
  Prisma,
} from '../generated/prisma/index.js';
import {
  ConflictError,
  ExternalError,
  isSalyChainError,
  NotFoundError,
  ValidationError,
} from '@salychain/errors';
import { EventBus, SUBJECTS, type EventBySubject, type Subject } from '@salychain/events';
import {
  ComplianceClient,
  IdentityClient,
  LedgerClient,
  LiquidityClient,
  RiskClient,
  RoutingClient,
  WalletClient,
  AgentsClient,
  getTenantOrgId,
} from '@salychain/sdk-internal';
import {
  parseIntent,
  buildPayrollLineIntent,
  validatePayrollIntent,
  type Intent,
} from '@salychain/intent-schema';
import { dealIdFromCorrelationId, BASE_ASSETS, type BaseNetwork } from '@salychain/chain-base';
import { EscrowService } from '../escrow/escrow.service.js';
import {
  inferFiatRail,
  type FiatAdapter,
  type FiatDestination,
  type FiatPayinInstruction,
} from '@salychain/chain-fiat';
import { fiatPayinsTotal } from '@salychain/observability';
import { loadEnv } from '@salychain/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { executionEnvSchema } from '../config/env.js';
import { assertTransition } from '../state/state-machine.js';
import {
  COMPLIANCE_CLIENT,
  LEDGER_CLIENT,
  LIQUIDITY_CLIENT,
  RISK_CLIENT,
  ROUTING_CLIENT,
  WALLET_CLIENT,
  AGENTS_CLIENT,
  IDENTITY_CLIENT,
} from '../clients/clients.module.js';
import { FIAT_ADAPTER } from '../fiat/fiat.module.js';
import { EVENT_BUS } from '../events/events.module.js';
import { OutboxService, type OutboxTxClient } from '../outbox/outbox.service.js';
import {
  BasePayoutDto,
  FiatPayinDto,
  IngestIntentDto,
  InternalTransferDto,
  L3PayoutDto,
  SeedClearingDto,
  TopupDto,
  XrplPayoutDto,
} from './dto.js';
import {
  LedgerReservationService,
  type ChainReservationRail,
} from '../ledger/ledger-reservation.service.js';
import {
  resolvePayrollParentState,
  summarizePayrollLines,
  childTransactionToPayrollLineResult,
  type PayrollLineResult,
  type PayrollBatchSummary,
} from './payroll.js';
import { assertQuoteConstraints, fxPoolAccountCode } from './swap.js';
import {
  bankSettlementAccountCode,
  buildClearingSeedPostings,
  buildPayinPostings,
  buildTopupPostings,
  clearingAccountCode,
  extractTopupDetail,
  inboundEquityAccountCode,
} from './topup.js';
import { extractDexDetail } from './dex-settle.js';
import { extractFiatDetail } from './fiat-settle.js';
import { meetsRequiredComplianceTier, type RequiredComplianceTier } from '../compliance/tier.js';
import {
  assertResolvableBeneficiary,
  resolveBeneficiaryAccounts,
} from '../beneficiary/beneficiary-resolver.js';
import type { QuoteResponse, DexQuoteResponse } from '@salychain/sdk-internal';
import {
  assertFinalityMet,
  chainFromTxKind,
  extractSettlementFinality,
  requiredConfirmations,
  txKindsForChain,
  type FinalityChain,
} from '@salychain/finality';

/**
 * The transaction orchestrator. Implements two flows in S1:
 *
 *   1. Internal transfer: pure ledger move (no chain). Two postings, atomic.
 *   2. Base USDC payout: ledger reservation → wallet broadcast → external
 *      confirmation lands via the chain listener and we settle.
 *
 * Every state transition is persisted as an event row and emits a NATS
 * domain event. Idempotency is enforced at the (caller_supplied)
 * `idempotency_key` level — replays return the same transaction.
 */
@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(LEDGER_CLIENT) private readonly ledger: LedgerClient,
    @Inject(WALLET_CLIENT) private readonly wallet: WalletClient,
    @Inject(COMPLIANCE_CLIENT) private readonly compliance: ComplianceClient,
    @Inject(RISK_CLIENT) private readonly risk: RiskClient,
    @Inject(LIQUIDITY_CLIENT) private readonly liquidity: LiquidityClient,
    @Inject(ROUTING_CLIENT) private readonly routing: RoutingClient,
    @Inject(AGENTS_CLIENT) private readonly agents: AgentsClient,
    @Inject(IDENTITY_CLIENT) private readonly identity: IdentityClient,
    @Inject(EVENT_BUS) private readonly events: EventBus,
    private readonly outbox: OutboxService,
    private readonly ledgerReservation: LedgerReservationService,
    @Inject(FIAT_ADAPTER) private readonly fiat: FiatAdapter,
    private readonly escrowService: EscrowService,
  ) {}

  // ───────────────────────────── Internal transfer ─────────────────────────────

  async createInternalTransfer(dto: InternalTransferDto): Promise<TransactionWithEvents> {
    const existing = await this.findByIdempotencyKey(dto.idempotency_key);
    if (existing) return existing;

    const tx = await this.prisma.executionTransaction.create({
      data: {
        idempotencyKey: dto.idempotency_key,
        orgId: getTenantOrgId() ?? null,
        kind: 'INTERNAL_TRANSFER',
        state: 'CREATED',
        sourceAccountId: dto.from_account_id,
        destinationAccountId: dto.to_account_id,
        amountMinor: BigInt(dto.amount_minor),
        currency: dto.currency,
        intentId: dto.intent_id ?? null,
        memo: dto.memo ?? null,
      },
    });
    await this.recordEvent(tx.id, null, 'CREATED');
    await this.publish(SUBJECTS.TX_CREATED, {
      transaction_id: tx.id,
      kind: 'INTERNAL_TRANSFER',
      source: {
        account_id: dto.from_account_id,
        amount_minor: dto.amount_minor,
        currency: dto.currency,
      },
      destination: { account_id: dto.to_account_id },
      intent_id: dto.intent_id,
    });

    try {
      // Compliance + risk land in S2 — until then everyone passes through.
      await this.transition(tx.id, 'SCREENED');

      // No routing needed for internal transfers; the rail is the ledger.
      await this.transition(tx.id, 'ROUTED');

      const idempotency = `exec:${tx.id}:ledger`;
      const fromAccount = await this.ledger.getAccount(dto.from_account_id);
      const toAccount = await this.ledger.getAccount(dto.to_account_id);
      if (fromAccount.currency !== dto.currency || toAccount.currency !== dto.currency) {
        throw ValidationError(
          'execution.tx.currency_mismatch',
          `Accounts ${fromAccount.id}/${toAccount.id} currencies do not match ${dto.currency}`,
        );
      }

      // Choose posting direction based on each account's normal balance side:
      //  - asset-normal accounts (ASSET, EXPENSE): outflow = CREDIT, inflow = DEBIT
      //  - liability-normal accounts (LIABILITY, EQUITY, REVENUE): outflow = DEBIT, inflow = CREDIT
      // This keeps the entry balanced regardless of the account types involved.
      const fromOut: 'DEBIT' | 'CREDIT' = isAssetNormal(fromAccount.type) ? 'CREDIT' : 'DEBIT';
      const toIn: 'DEBIT' | 'CREDIT' = isAssetNormal(toAccount.type) ? 'DEBIT' : 'CREDIT';

      await this.transition(tx.id, 'RESERVED');
      const journal = await this.ledger.postJournalEntry({
        idempotencyKey: idempotency,
        memo: dto.memo,
        postings: [
          {
            account_id: dto.from_account_id,
            direction: fromOut,
            amount_minor: dto.amount_minor,
            currency: dto.currency,
          },
          {
            account_id: dto.to_account_id,
            direction: toIn,
            amount_minor: dto.amount_minor,
            currency: dto.currency,
          },
        ],
      });

      await this.transition(tx.id, 'EXECUTING', undefined, { ledgerEntryId: journal.id });
      const settled = await this.transition(tx.id, 'SETTLED', undefined, {
        ledgerEntryId: journal.id,
        settledAt: new Date(),
      });

      await this.publish(SUBJECTS.TX_SETTLED, {
        transaction_id: tx.id,
        kind: 'INTERNAL_TRANSFER',
        ledger_entry_id: journal.id,
        settled_at: settled.settledAt?.toISOString() ?? new Date().toISOString(),
      });

      return this.fetchWithEvents(tx.id);
    } catch (err) {
      await this.fail(tx.id, err);
      throw err;
    }
  }

  // ───────────────────────────── Base USDC payout ─────────────────────────────

  async createBasePayout(dto: BasePayoutDto): Promise<TransactionWithEvents> {
    const existing = await this.findByIdempotencyKey(dto.idempotency_key);
    if (existing) return existing;

    const tx = await this.prisma.executionTransaction.create({
      data: {
        idempotencyKey: dto.idempotency_key,
        orgId: getTenantOrgId() ?? null,
        kind: 'BASE_PAYOUT',
        state: 'CREATED',
        sourceWalletId: dto.source_wallet_id,
        amountMinor: BigInt(dto.amount_minor),
        currency: dto.asset,
        destinationAddress: dto.destination_address,
        destinationChain: 'BASE',
        asset: dto.asset,
        intentId: dto.intent_id ?? null,
        memo: dto.memo ?? null,
      },
    });
    await this.recordEvent(tx.id, null, 'CREATED');
    await this.publish(SUBJECTS.TX_CREATED, {
      transaction_id: tx.id,
      kind: 'BASE_PAYOUT',
      source: {
        wallet_id: dto.source_wallet_id,
        amount_minor: dto.amount_minor,
        currency: dto.asset,
      },
      destination: { address: dto.destination_address, chain: 'BASE' },
      intent_id: dto.intent_id,
    });

    try {
      await this.transition(tx.id, 'SCREENED');
      await this.transition(tx.id, 'ROUTED', undefined, { selectedRail: 'BASE' });

      await this.reserveChainPayout({
        txId: tx.id,
        kind: 'BASE_PAYOUT',
        walletId: dto.source_wallet_id,
        amountMinor: dto.amount_minor,
        currency: dto.asset,
        rail: 'BASE',
      });

      const transfer = await this.wallet.transfer({
        walletId: dto.source_wallet_id,
        destinationAddress: dto.destination_address,
        amountMinor: dto.amount_minor,
        asset: dto.asset,
        idempotencyKey: `exec:${tx.id}:transfer`,
        memo: dto.memo,
      });

      await this.transition(tx.id, 'EXECUTING', undefined, {
        broadcastJobId: transfer.id,
      });

      await this.transition(tx.id, 'AWAITING_CONFIRMATION', undefined, {
        broadcastJobId: transfer.id,
        txHash: transfer.tx_hash ?? undefined,
      });
      await this.publish(SUBJECTS.TX_EXECUTING, {
        transaction_id: tx.id,
        kind: 'BASE_PAYOUT',
        broadcast_id: transfer.id,
      });

      return this.fetchWithEvents(tx.id);
    } catch (err) {
      await this.fail(tx.id, err);
      throw err;
    }
  }

  // ───────────────────────────── Saly L3 USDC payout ─────────────────────────────

  async createL3Payout(dto: L3PayoutDto): Promise<TransactionWithEvents> {
    const existing = await this.findByIdempotencyKey(dto.idempotency_key);
    if (existing) return existing;

    const tx = await this.prisma.executionTransaction.create({
      data: {
        idempotencyKey: dto.idempotency_key,
        orgId: getTenantOrgId() ?? null,
        kind: 'L3_PAYOUT',
        state: 'CREATED',
        sourceWalletId: dto.source_wallet_id,
        amountMinor: BigInt(dto.amount_minor),
        currency: dto.asset,
        destinationAddress: dto.destination_address,
        destinationChain: 'SALY_L3',
        asset: dto.asset,
        intentId: dto.intent_id ?? null,
        memo: dto.memo ?? null,
      },
    });
    await this.recordEvent(tx.id, null, 'CREATED');
    await this.publish(SUBJECTS.TX_CREATED, {
      transaction_id: tx.id,
      kind: 'L3_PAYOUT',
      source: {
        wallet_id: dto.source_wallet_id,
        amount_minor: dto.amount_minor,
        currency: dto.asset,
      },
      destination: { address: dto.destination_address, chain: 'SALY_L3' },
      intent_id: dto.intent_id,
    });

    try {
      await this.transition(tx.id, 'SCREENED');
      await this.transition(tx.id, 'ROUTED', undefined, { selectedRail: 'L3' });

      await this.reserveChainPayout({
        txId: tx.id,
        kind: 'L3_PAYOUT',
        walletId: dto.source_wallet_id,
        amountMinor: dto.amount_minor,
        currency: dto.asset,
        rail: 'L3',
      });

      const transfer = await this.wallet.transfer({
        walletId: dto.source_wallet_id,
        destinationAddress: dto.destination_address,
        amountMinor: dto.amount_minor,
        asset: dto.asset,
        idempotencyKey: `exec:${tx.id}:transfer`,
        memo: dto.memo,
      });

      await this.transition(tx.id, 'EXECUTING', undefined, {
        broadcastJobId: transfer.id,
      });

      await this.transition(tx.id, 'AWAITING_CONFIRMATION', undefined, {
        broadcastJobId: transfer.id,
        txHash: transfer.tx_hash ?? undefined,
      });
      await this.publish(SUBJECTS.TX_EXECUTING, {
        transaction_id: tx.id,
        kind: 'L3_PAYOUT',
        broadcast_id: transfer.id,
      });

      return this.fetchWithEvents(tx.id);
    } catch (err) {
      await this.fail(tx.id, err);
      throw err;
    }
  }

  // ───────────────────────────── XRPL payout ─────────────────────────────

  /**
   * XRPL transfer — native XRP or issued currency (IOU) via configured gateway issuers.
   * Trust-line policy on the source wallet must allow the IOU issuer.
   */
  async createXrplPayout(dto: XrplPayoutDto): Promise<TransactionWithEvents> {
    const existing = await this.findByIdempotencyKey(dto.idempotency_key);
    if (existing) return existing;

    const tx = await this.prisma.executionTransaction.create({
      data: {
        idempotencyKey: dto.idempotency_key,
        orgId: getTenantOrgId() ?? null,
        kind: 'XRPL_PAYOUT',
        state: 'CREATED',
        sourceWalletId: dto.source_wallet_id,
        amountMinor: BigInt(dto.amount_minor),
        currency: dto.asset,
        destinationAddress: dto.destination_address,
        destinationChain: 'XRPL',
        asset: dto.asset,
        intentId: dto.intent_id ?? null,
        memo: dto.memo ?? null,
      },
    });
    await this.recordEvent(tx.id, null, 'CREATED');
    await this.publish(SUBJECTS.TX_CREATED, {
      transaction_id: tx.id,
      kind: 'XRPL_PAYOUT',
      source: {
        wallet_id: dto.source_wallet_id,
        amount_minor: dto.amount_minor,
        currency: dto.asset,
      },
      destination: { address: dto.destination_address, chain: 'XRPL' },
      intent_id: dto.intent_id,
    });

    try {
      await this.transition(tx.id, 'SCREENED');
      await this.transition(tx.id, 'ROUTED', undefined, { selectedRail: 'XRPL' });

      await this.reserveChainPayout({
        txId: tx.id,
        kind: 'XRPL_PAYOUT',
        walletId: dto.source_wallet_id,
        amountMinor: dto.amount_minor,
        currency: dto.asset,
        rail: 'XRPL',
      });

      const transfer = await this.wallet.transfer({
        walletId: dto.source_wallet_id,
        destinationAddress: dto.destination_address,
        amountMinor: dto.amount_minor,
        asset: dto.asset,
        idempotencyKey: `exec:${tx.id}:transfer`,
        memo: dto.memo,
        iouIssuer: dto.iou_issuer,
        destinationTag: dto.destination_tag,
      });

      await this.transition(tx.id, 'EXECUTING', undefined, { broadcastJobId: transfer.id });
      await this.transition(tx.id, 'AWAITING_CONFIRMATION', undefined, {
        broadcastJobId: transfer.id,
        txHash: transfer.tx_hash ?? undefined,
      });
      await this.publish(SUBJECTS.TX_EXECUTING, {
        transaction_id: tx.id,
        kind: 'XRPL_PAYOUT',
        broadcast_id: transfer.id,
      });

      return this.fetchWithEvents(tx.id);
    } catch (err) {
      await this.fail(tx.id, err);
      throw err;
    }
  }

  // ───────────────────────────── Intent ingestion ─────────────────────────────

  /**
   * Top-level entry point for an Intent — drives the full S2 pipeline:
   *
   *   CREATED → (compliance.screen + risk.assess) → SCREENED
   *           → routing.decide                    → ROUTED
   *           → (optional liquidity.quote)        → QUOTED
   *           → ledger reserve / wallet handoff   → RESERVED → EXECUTING
   *           → AWAITING_CONFIRMATION (chain rails) or SETTLED (internal)
   *
   * For S4 we accept `TRANSFER`, `PAYOUT`, `AGENT_PAY`, `INVOICE`, `PAYROLL`, `SWAP`, and `TOPUP` kinds.
   * INVOICE and AGENT_PAY run through agent spending policy pre-checks when the
   * actor is an `AGENT`. PAYROLL fans out into per-line payout intents.
   */
  async ingestIntent(dto: IngestIntentDto): Promise<TransactionWithEvents> {
    const existing = await this.findByIdempotencyKey(dto.idempotency_key);
    if (existing) return existing;

    let intent: Intent;
    try {
      intent = parseIntent(dto.intent);
    } catch (err) {
      throw ValidationError(
        'execution.intent.schema_invalid',
        `Intent failed validation: ${(err as Error).message}`,
      );
    }

    if (intent.kind === 'PAYROLL') {
      return this.ingestPayrollIntent(dto, intent);
    }

    if (
      intent.kind !== 'TRANSFER' &&
      intent.kind !== 'PAYOUT' &&
      intent.kind !== 'AGENT_PAY' &&
      intent.kind !== 'INVOICE' &&
      intent.kind !== 'SWAP' &&
      intent.kind !== 'TOPUP'
    ) {
      throw ValidationError(
        'execution.intent.kind_unsupported',
        `Intent kind ${intent.kind} not yet supported (S4 supports TRANSFER, PAYOUT, AGENT_PAY, INVOICE, PAYROLL, SWAP, TOPUP)`,
      );
    }

    assertResolvableBeneficiary(intent);
    intent = await resolveBeneficiaryAccounts(intent, {
      identity: this.identity,
      ledger: this.ledger,
    });

    const dest = deriveDestinationProperties(intent);

    if (intent.actor.type === 'AGENT' && dest.address) {
      const policy = await this.agents.authorizeSpend(intent.actor.id, {
        amountMinor: intent.source.amount.amount_minor,
        destinationAddress: dest.address,
        intentId: intent.intent_id,
      });
      if (!policy.allowed) {
        if (policy.pending_approval && policy.approval_request_id) {
          const tx = await this.prisma.executionTransaction.create({
            data: {
              idempotencyKey: dto.idempotency_key,
              orgId: getTenantOrgId() ?? null,
              kind: dest.kind,
              state: 'AWAITING_APPROVAL',
              sourceAccountId: intent.source.account_ref ?? null,
              amountMinor: BigInt(intent.source.amount.amount_minor),
              currency: intent.source.amount.currency,
              destinationAddress: dest.address,
              destinationChain: dest.chain,
              destinationAccountId: dest.accountId,
              asset: intent.destination.currency,
              intentId: intent.intent_id,
              memo: extractMemo(intent),
              metadata: {
                intent: intent as unknown as Prisma.InputJsonValue,
                channel: intent.context?.channel ?? 'API',
                approval_request_id: policy.approval_request_id,
              } as Prisma.InputJsonValue,
            },
          });
          await this.recordEvent(
            tx.id,
            null,
            'AWAITING_APPROVAL',
            `approval_request_id=${policy.approval_request_id}`,
          );
          return this.fetchWithEvents(tx.id);
        }
        throw ValidationError(
          policy.reason_code ?? 'agents.policy.denied',
          policy.reason_message ?? 'Agent spending policy denied this intent',
        );
      }
    }

    const tx = await this.prisma.executionTransaction.create({
      data: {
        idempotencyKey: dto.idempotency_key,
        orgId: getTenantOrgId() ?? null,
        kind: dest.kind,
        state: 'CREATED',
        sourceAccountId: intent.source.account_ref ?? null,
        amountMinor: BigInt(intent.source.amount.amount_minor),
        currency: intent.source.amount.currency,
        destinationAddress: dest.address,
        destinationChain: dest.chain,
        destinationAccountId: dest.accountId,
        asset: intent.destination.currency,
        intentId: intent.intent_id,
        memo: extractMemo(intent),
        metadata: {
          intent: intent as unknown as Prisma.InputJsonValue,
          channel: intent.context?.channel ?? 'API',
        } as Prisma.InputJsonValue,
      },
    });
    await this.recordEvent(tx.id, null, 'CREATED');
    await this.publish(SUBJECTS.TX_CREATED, {
      transaction_id: tx.id,
      kind: dest.kind,
      source: {
        account_id: intent.source.account_ref,
        amount_minor: intent.source.amount.amount_minor,
        currency: intent.source.amount.currency,
      },
      destination: { account_id: dest.accountId, address: dest.address, chain: dest.chain },
      intent_id: intent.intent_id,
    });

    try {
      await this.runIntentPipeline(tx.id, intent, dest);
      return this.fetchWithEvents(tx.id);
    } catch (err) {
      await this.fail(tx.id, err);
      throw err;
    }
  }

  /**
   * Payroll batch orchestration:
   *   1. Validate metadata.payroll and batch totals (schema + validatePayrollIntent).
   *   2. Screen + assess risk once at batch level on the aggregate amount.
   *   3. Fan out each line as an independent payout intent (inherits batch screening).
   *   4. Parent PAYROLL_BATCH tx reflects aggregate outcome.
   */
  async ingestPayrollIntent(dto: IngestIntentDto, intent: Intent): Promise<TransactionWithEvents> {
    if (intent.actor.type !== 'BUSINESS' && intent.actor.type !== 'SYSTEM') {
      throw ValidationError(
        'execution.payroll.actor_invalid',
        'PAYROLL intents must be submitted by a BUSINESS or SYSTEM actor',
      );
    }

    const batch = validatePayrollIntent(intent);

    const parent = await this.prisma.executionTransaction.create({
      data: {
        idempotencyKey: dto.idempotency_key,
        orgId: getTenantOrgId() ?? null,
        kind: 'PAYROLL_BATCH',
        state: 'CREATED',
        sourceAccountId: intent.source.account_ref ?? null,
        amountMinor: BigInt(intent.source.amount.amount_minor),
        currency: intent.source.amount.currency,
        intentId: intent.intent_id,
        memo: batch.name ? `payroll:${batch.name}` : `payroll:${batch.batch_id}`,
        metadata: {
          intent: intent as unknown as Prisma.InputJsonValue,
          payroll: {
            batch_id: batch.batch_id,
            name: batch.name,
            pay_period: batch.pay_period,
            line_count: batch.items.length,
          },
        } as Prisma.InputJsonValue,
      },
    });

    await this.recordEvent(parent.id, null, 'CREATED');
    await this.publish(SUBJECTS.TX_CREATED, {
      transaction_id: parent.id,
      kind: 'PAYROLL_BATCH',
      source: {
        account_id: intent.source.account_ref,
        amount_minor: intent.source.amount.amount_minor,
        currency: intent.source.amount.currency,
      },
      destination: {},
      intent_id: intent.intent_id,
    });

    try {
      const screen = await this.compliance.screen({
        intentId: intent.intent_id,
        subjectRef: intent.actor.id,
        subjectKind: resolveSubjectKind(intent.actor),
        displayName: batch.name,
        countryCode: undefined,
      });
      if (screen.decision === 'BLOCK') {
        await this.transition(
          parent.id,
          'REJECTED',
          `compliance BLOCK (case ${screen.case_id ?? 'none'})`,
          {
            complianceRunId: screen.run_id,
            complianceCaseId: screen.case_id,
            error: `Compliance screening blocked payroll batch (max score ${screen.max_score})`,
          },
        );
        return this.fetchWithEvents(parent.id);
      }

      const assess = await this.risk.assess({
        intentId: intent.intent_id,
        actorExternalRef: intent.actor.id,
        counterpartyRef: `payroll:${batch.batch_id}`,
        amountUsdMinor: intent.source.amount.amount_minor,
      });
      if (assess.decision === 'BLOCK') {
        await this.transition(parent.id, 'REJECTED', `risk BLOCK (score ${assess.score})`, {
          riskAssessmentId: assess.assessment_id,
          riskScore: assess.score,
          complianceRunId: screen.run_id,
          error: `Risk engine blocked payroll batch (score ${assess.score})`,
        });
        return this.fetchWithEvents(parent.id);
      }

      const tierOk = await this.assertComplianceTierRequirement(intent, parent.id, {
        kind: 'PAYROLL_BATCH',
        counterpartyRef: `payroll:${batch.batch_id}`,
      });
      if (!tierOk) return this.fetchWithEvents(parent.id);

      await this.transition(parent.id, 'SCREENED', `payroll batch screened`, {
        complianceRunId: screen.run_id,
        complianceCaseId: screen.case_id,
        riskAssessmentId: assess.assessment_id,
        riskScore: assess.score,
        detail: {
          payroll: { batch_id: batch.batch_id, line_count: batch.items.length },
          compliance: { decision: screen.decision, max_score: screen.max_score },
          risk: { decision: assess.decision, score: assess.score },
        },
      });

      await this.transition(
        parent.id,
        'EXECUTING',
        `processing ${batch.items.length} payroll lines`,
      );

      const inheritedScreening = {
        complianceRunId: screen.run_id,
        complianceCaseId: screen.case_id,
        riskAssessmentId: assess.assessment_id,
        riskScore: assess.score,
        detail: {
          payroll_batch_id: batch.batch_id,
          inherited_from_parent: parent.id,
        },
      };

      const lineResults: PayrollLineResult[] = [];

      for (const line of batch.items) {
        const lineKey = `${dto.idempotency_key}:line:${line.line_id}`;
        const existingLine = await this.findByIdempotencyKey(lineKey);
        if (existingLine) {
          lineResults.push({
            line_id: line.line_id,
            transaction_id: existingLine.id,
            intent_id: existingLine.intentId ?? undefined,
            state: existingLine.state,
            error: existingLine.error ?? undefined,
            label: line.label,
          });
          continue;
        }

        const lineIntentId = `itn_${ulid()}`;
        const lineIntent = buildPayrollLineIntent(intent, line, lineIntentId);
        const lineDest = deriveDestinationProperties(lineIntent);

        const child = await this.prisma.executionTransaction.create({
          data: {
            idempotencyKey: lineKey,
            orgId: getTenantOrgId() ?? null,
            kind: lineDest.kind,
            state: 'CREATED',
            sourceAccountId: intent.source.account_ref ?? null,
            amountMinor: BigInt(line.amount.amount_minor),
            currency: line.amount.currency,
            destinationAddress: lineDest.address,
            destinationChain: lineDest.chain,
            destinationAccountId: lineDest.accountId,
            asset: line.amount.currency,
            intentId: lineIntentId,
            memo: line.label ? `payroll:${line.label}` : `payroll:${line.line_id}`,
            metadata: {
              intent: lineIntent as unknown as Prisma.InputJsonValue,
              payroll_parent_id: parent.id,
              payroll_batch_id: batch.batch_id,
              payroll_line_id: line.line_id,
            } as Prisma.InputJsonValue,
          },
        });

        await this.recordEvent(child.id, null, 'CREATED');

        try {
          await this.runIntentPipeline(child.id, lineIntent, lineDest, {
            skipComplianceAndRisk: true,
            inheritedScreening,
          });
          const finalChild = await this.prisma.executionTransaction.findUnique({
            where: { id: child.id },
          });
          lineResults.push({
            line_id: line.line_id,
            transaction_id: child.id,
            intent_id: lineIntentId,
            state: finalChild?.state ?? 'FAILED',
            error: finalChild?.error ?? undefined,
            label: line.label,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Line execution failed';
          lineResults.push({
            line_id: line.line_id,
            transaction_id: child.id,
            intent_id: lineIntentId,
            state: 'FAILED',
            error: message,
            label: line.label,
          });
        }
      }

      const summary = summarizePayrollLines(lineResults);
      summary.batch_id = batch.batch_id;
      summary.name = batch.name;
      summary.pay_period = batch.pay_period;

      const parentOutcome = resolvePayrollParentState(lineResults);

      if (parentOutcome === 'SETTLED') {
        await this.risk.commit({
          intentId: intent.intent_id,
          actorExternalRef: intent.actor.id,
          counterpartyRef: `payroll:${batch.batch_id}`,
          amountUsdMinor: intent.source.amount.amount_minor,
        });
        await this.transition(parent.id, 'SETTLED', 'all payroll lines settled', {
          settledAt: new Date(),
          detail: { payroll: summary },
        });
        await this.publish(SUBJECTS.TX_SETTLED, {
          transaction_id: parent.id,
          kind: 'PAYROLL_BATCH',
          settled_at: new Date().toISOString(),
        });
      } else if (parentOutcome === 'FAILED') {
        await this.transition(parent.id, 'FAILED', 'one or more payroll lines failed', {
          error: `${summary.lines_failed} of ${summary.total_lines} lines failed`,
          detail: { payroll: summary },
        });
      } else {
        await this.prisma.executionTransaction.update({
          where: { id: parent.id },
          data: {
            metadata: {
              intent: intent as unknown as Prisma.InputJsonValue,
              payroll: summary as unknown as Prisma.InputJsonValue,
            } as unknown as Prisma.InputJsonValue,
          },
        });
      }

      return this.fetchWithEvents(parent.id);
    } catch (err) {
      await this.fail(parent.id, err);
      throw err;
    }
  }

  async resumeAfterApproval(intentId: string): Promise<TransactionWithEvents> {
    const tx = await this.prisma.executionTransaction.findFirst({
      where: { intentId, state: 'AWAITING_APPROVAL' },
    });
    if (!tx) {
      throw NotFoundError(
        'execution.tx.not_awaiting_approval',
        `No AWAITING_APPROVAL tx for intent ${intentId}`,
      );
    }

    const metadata = tx.metadata as { intent?: Intent } | null;
    if (!metadata?.intent) {
      throw ValidationError(
        'execution.tx.missing_intent',
        `Transaction ${tx.id} has no stored intent snapshot`,
      );
    }

    const intent = metadata.intent;
    const dest = deriveDestinationProperties(intent);
    await this.transition(tx.id, 'CREATED');
    try {
      await this.runIntentPipeline(tx.id, intent, dest);
    } catch (err) {
      await this.fail(tx.id, err);
      throw err;
    }
    return this.fetchWithEvents(tx.id);
  }

  private async runIntentPipeline(
    txId: string,
    intent: Intent,
    dest: ReturnType<typeof deriveDestinationProperties>,
    opts?: {
      skipComplianceAndRisk?: boolean;
      inheritedScreening?: {
        complianceRunId?: string;
        complianceCaseId?: string;
        riskAssessmentId?: string;
        riskScore?: number;
        detail?: Record<string, unknown>;
      };
    },
  ): Promise<void> {
    try {
      assertResolvableBeneficiary(intent);
      intent = await resolveBeneficiaryAccounts(intent, {
        identity: this.identity,
        ledger: this.ledger,
      });
      dest = deriveDestinationProperties(intent);

      let riskScore = opts?.inheritedScreening?.riskScore ?? 0;

      if (opts?.skipComplianceAndRisk && opts.inheritedScreening) {
        await this.transition(txId, 'SCREENED', 'inherited payroll batch screening', {
          complianceRunId: opts.inheritedScreening.complianceRunId,
          complianceCaseId: opts.inheritedScreening.complianceCaseId,
          riskAssessmentId: opts.inheritedScreening.riskAssessmentId,
          riskScore: opts.inheritedScreening.riskScore,
          detail: opts.inheritedScreening.detail,
        });
        riskScore = opts.inheritedScreening.riskScore ?? riskScore;
      } else {
        const screen = await this.compliance.screen({
          intentId: intent.intent_id,
          subjectRef: intent.actor.id,
          subjectKind: resolveSubjectKind(intent.actor),
          displayName: undefined,
          countryCode: undefined,
          chainAddress:
            dest.chain && dest.address && dest.chain !== 'INTERNAL'
              ? { chain: dest.chain, address: dest.address }
              : undefined,
        });
        if (screen.decision === 'BLOCK') {
          await this.transition(
            txId,
            'REJECTED',
            `compliance BLOCK (case ${screen.case_id ?? 'none'})`,
            {
              complianceRunId: screen.run_id,
              complianceCaseId: screen.case_id,
              error: `Compliance screening blocked the intent (max score ${screen.max_score})`,
            },
          );
          await this.publish(SUBJECTS.TX_FAILED, {
            transaction_id: txId,
            kind: dest.kind,
            reason_code: 'compliance.blocked',
            reason_message: `screening blocked (case ${screen.case_id ?? 'n/a'})`,
            retryable: false,
          });
          return;
        }

        const assess = await this.risk.assess({
          intentId: intent.intent_id,
          actorExternalRef: intent.actor.id,
          counterpartyRef: dest.counterpartyRef,
          amountUsdMinor: intent.source.amount.amount_minor,
        });
        if (assess.decision === 'BLOCK') {
          await this.transition(txId, 'REJECTED', `risk BLOCK (score ${assess.score})`, {
            riskAssessmentId: assess.assessment_id,
            riskScore: assess.score,
            complianceRunId: screen.run_id,
            complianceCaseId: screen.case_id,
            error: `Risk engine blocked the intent (score ${assess.score})`,
          });
          await this.publish(SUBJECTS.TX_FAILED, {
            transaction_id: txId,
            kind: dest.kind,
            reason_code: 'risk.blocked',
            reason_message: `risk blocked (score ${assess.score})`,
            retryable: false,
          });
          return;
        }

        await this.transition(
          txId,
          'SCREENED',
          `compliance=${screen.decision}, risk=${assess.decision}`,
          {
            complianceRunId: screen.run_id,
            complianceCaseId: screen.case_id,
            riskAssessmentId: assess.assessment_id,
            riskScore: assess.score,
            detail: {
              compliance: { decision: screen.decision, max_score: screen.max_score },
              risk: {
                decision: assess.decision,
                score: assess.score,
                components: assess.components,
              },
            },
          },
          [
            {
              subject: SUBJECTS.INTENT_SCREENED,
              correlationId: intent.intent_id,
              payload: {
                intent_id: intent.intent_id,
                kind: intent.kind,
                compliance_decision: screen.decision,
                risk_decision: assess.decision,
                risk_score: assess.score,
                flags: screeningFlags(screen.decision, assess.decision),
              },
            },
          ],
        );
        riskScore = assess.score;
      }

      const tierOk = await this.assertComplianceTierRequirement(intent, txId, dest);
      if (!tierOk) return;

      // TOPUP credits a ledger account from treasury clearing — no routing/quote.
      if (intent.kind === 'TOPUP') {
        await this.executeTopupLeg(txId, intent, dest);
        await this.risk.commit({
          intentId: intent.intent_id,
          transactionId: txId,
          actorExternalRef: intent.actor.id,
          counterpartyRef: dest.counterpartyRef,
          amountUsdMinor: intent.source.amount.amount_minor,
        });
        return;
      }

      // ── 2. Route
      const swapOnchain =
        intent.kind === 'SWAP' && intent.constraints?.swap_execution === 'onchain';
      const bankBen =
        intent.destination.beneficiary.kind === 'BANK' ? intent.destination.beneficiary : null;
      const route = await this.routing.decide({
        intentId: intent.intent_id,
        source: {
          type: swapOnchain ? 'WALLET' : intent.source.account_ref ? 'LEDGER_ACCOUNT' : 'WALLET',
          currency: intent.source.amount.currency,
          chain: swapOnchain ? 'BASE' : undefined,
        },
        destination: {
          type: destinationRoutingType(intent),
          chain: dest.chain ?? undefined,
          address: bankBen ? bankBen.account_number : (dest.address ?? undefined),
          currency: intent.destination.currency,
          country_code: bankBen ? bankBen.country : undefined,
        },
        amountMinor: intent.source.amount.amount_minor,
        riskScore,
        preference: 'balanced',
        escrowCondition: intent.constraints?.escrow_condition,
        intentKind: intent.kind,
        swapExecution: intent.constraints?.swap_execution,
      });
      const selectedCandidate = route.candidates.find((c) => c.rail === route.selected_rail);
      const intentRoutedEvents: OutboxEnqueue[] = isIntentRoutableRail(route.selected_rail)
        ? [
            {
              subject: SUBJECTS.INTENT_ROUTED,
              correlationId: intent.intent_id,
              payload: {
                intent_id: intent.intent_id,
                kind: intent.kind,
                rail: route.selected_rail,
                decision_id: route.decision_id,
                expected_cost_minor: selectedCandidate?.expected_cost_usd_minor ?? '0',
                expected_seconds: selectedCandidate?.expected_seconds ?? 0,
              },
            },
          ]
        : [];
      await this.transition(
        txId,
        'ROUTED',
        `selected rail ${route.selected_rail}`,
        {
          routeDecisionId: route.decision_id,
          selectedRail: route.selected_rail,
          detail: {
            route: {
              selected: route.selected_rail,
              score: route.selected_score,
              rationale: route.rationale,
            },
          },
        },
        intentRoutedEvents,
      );

      // ── 3. Quote (cross-currency — required for SWAP)
      let fxQuote: QuoteResponse | null = null;
      let dexQuote: DexQuoteResponse | null = null;
      if (swapOnchain) {
        const walletId = (intent.metadata as { source_wallet_id?: string }).source_wallet_id!;
        const sourceWallet = await this.wallet.get(walletId);
        const quote = await this.liquidity.quoteDex({
          intentId: intent.intent_id,
          fromCurrency: intent.source.amount.currency,
          toCurrency: intent.destination.currency,
          fromAmountMinor: intent.source.amount.amount_minor.toString(),
          recipient: sourceWallet.address,
          slippageBps: intent.constraints?.max_slippage_bps,
        });
        assertQuoteConstraints(intent, quote);
        dexQuote = quote;
        fxQuote = quote;
        await this.transition(
          txId,
          'QUOTED',
          `DEX quoted ${quote.from_amount_minor} → ${quote.to_amount_minor}`,
          {
            quoteId: quote.quote_id,
            quoteSignature: quote.signature,
            detail: {
              quote: {
                from: `${quote.from_amount_minor} ${quote.from_currency}`,
                to: `${quote.to_amount_minor} ${quote.to_currency}`,
                rate_1e8: quote.quoted_rate_1e8,
                spread_bps: quote.spread_bps,
                provider: quote.provider,
                expires_at: quote.expires_at,
                quote_type: 'DEX',
              },
              dex: quote.dex,
            },
          },
        );
        await this.liquidity.consume(quote.quote_id, quote.signature);
      } else if (
        intent.kind === 'SWAP' ||
        intent.source.amount.currency !== intent.destination.currency
      ) {
        const quote = await this.liquidity.quote({
          intentId: intent.intent_id,
          fromCurrency: intent.source.amount.currency,
          toCurrency: intent.destination.currency,
          fromAmountMinor: intent.source.amount.amount_minor,
        });
        assertQuoteConstraints(intent, quote);
        fxQuote = quote;
        await this.transition(
          txId,
          'QUOTED',
          `quoted ${quote.from_amount_minor} → ${quote.to_amount_minor}`,
          {
            quoteId: quote.quote_id,
            quoteSignature: quote.signature,
            detail: {
              quote: {
                from: `${quote.from_amount_minor} ${quote.from_currency}`,
                to: `${quote.to_amount_minor} ${quote.to_currency}`,
                rate_1e8: quote.quoted_rate_1e8,
                mid_rate_1e8: quote.mid_rate_1e8,
                spread_bps: quote.spread_bps,
                provider: quote.provider,
                expires_at: quote.expires_at,
              },
            },
          },
        );
      }

      if (intent.kind === 'SWAP' && !fxQuote) {
        throw ValidationError('execution.swap.quote_required', 'SWAP requires a signed FX quote');
      }

      // ── 4. Execute on the selected rail
      switch (route.selected_rail) {
        case 'INTERNAL':
          if (intent.kind === 'SWAP') {
            await this.executeSwapLeg(txId, intent, dest, fxQuote!);
            await this.liquidity.consume(fxQuote!.quote_id, fxQuote!.signature);
          } else {
            await this.executeInternalLeg(txId, intent, dest);
          }
          break;
        case 'BASE':
          if (swapOnchain && intent.kind === 'SWAP') {
            await this.executeDexSwapLeg(txId, intent, dest, dexQuote!);
          } else {
            await this.executeChainLeg(txId, intent, dest, route.selected_rail);
          }
          break;
        case 'XRPL':
          await this.executeChainLeg(txId, intent, dest, route.selected_rail);
          break;
        case 'L3':
          await this.executeChainLeg(txId, intent, dest, route.selected_rail);
          break;
        case 'ESCROW':
          await this.executeEscrowLeg(txId, intent, dest);
          break;
        case 'FIAT':
          await this.executeFiatLeg(txId, intent);
          break;
      }

      // Risk commit happens here for INTERNAL (synchronously settled). Chain
      // rails commit risk in the confirmations service once SETTLED is reached.
      if (route.selected_rail === 'INTERNAL') {
        await this.risk.commit({
          intentId: intent.intent_id,
          transactionId: txId,
          actorExternalRef: intent.actor.id,
          counterpartyRef: dest.counterpartyRef,
          amountUsdMinor: intent.source.amount.amount_minor,
        });
      }
    } catch (err) {
      throw err;
    }
  }

  private async executeSwapLeg(
    txId: string,
    intent: Intent,
    dest: ReturnType<typeof deriveDestinationProperties>,
    quote: QuoteResponse,
  ): Promise<void> {
    if (!intent.source.account_ref || !dest.accountId) {
      throw ValidationError(
        'execution.swap.accounts_required',
        'SWAP requires source.account_ref and INTERNAL_ACCOUNT destination',
      );
    }

    await this.transition(txId, 'RESERVED');

    const fromAccount = await this.ledger.getAccount(intent.source.account_ref);
    const toAccount = await this.ledger.getAccount(dest.accountId);
    const sourceCurrency = intent.source.amount.currency.toUpperCase();
    const destCurrency = intent.destination.currency.toUpperCase();

    if (fromAccount.currency !== sourceCurrency) {
      throw ValidationError(
        'execution.swap.currency_mismatch',
        `Source account currency ${fromAccount.currency} does not match ${sourceCurrency}`,
      );
    }
    if (toAccount.currency !== destCurrency) {
      throw ValidationError(
        'execution.swap.currency_mismatch',
        `Destination account currency ${toAccount.currency} does not match ${destCurrency}`,
      );
    }

    const fxPoolSourceId = await this.ensureFxPoolAccount(sourceCurrency);
    const fxPoolDestId = await this.ensureFxPoolAccount(destCurrency);

    const sourceOut: 'DEBIT' | 'CREDIT' = isAssetNormal(fromAccount.type) ? 'CREDIT' : 'DEBIT';
    const destIn: 'DEBIT' | 'CREDIT' = isAssetNormal(toAccount.type) ? 'DEBIT' : 'CREDIT';

    const ledgerTx = await this.ledger.createTransaction({
      kind: 'SWAP',
      externalRef: txId,
      intentId: intent.intent_id,
      metadata: { quote_id: quote.quote_id },
    });

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: `exec:${txId}:swap`,
      transactionId: ledgerTx.id,
      memo: extractMemo(intent) ?? `swap ${sourceCurrency}→${destCurrency}`,
      metadata: {
        kind: 'SWAP',
        intent_id: intent.intent_id,
        quote_id: quote.quote_id,
        from_currency: sourceCurrency,
        to_currency: destCurrency,
      },
      postings: [
        {
          account_id: intent.source.account_ref,
          direction: sourceOut,
          amount_minor: intent.source.amount.amount_minor,
          currency: sourceCurrency,
        },
        {
          account_id: fxPoolSourceId,
          direction: 'DEBIT',
          amount_minor: intent.source.amount.amount_minor,
          currency: sourceCurrency,
        },
        {
          account_id: fxPoolDestId,
          direction: 'CREDIT',
          amount_minor: quote.to_amount_minor,
          currency: destCurrency,
        },
        {
          account_id: dest.accountId,
          direction: destIn,
          amount_minor: quote.to_amount_minor,
          currency: destCurrency,
        },
      ],
    });

    await this.transition(txId, 'EXECUTING', undefined, { ledgerEntryId: journal.id });
    await this.transition(txId, 'SETTLED', undefined, {
      ledgerEntryId: journal.id,
      settledAt: new Date(),
      detail: {
        swap: {
          from: `${intent.source.amount.amount_minor} ${sourceCurrency}`,
          to: `${quote.to_amount_minor} ${destCurrency}`,
          quote_id: quote.quote_id,
          provider: quote.provider,
          mid_rate_1e8: quote.mid_rate_1e8,
          quoted_rate_1e8: quote.quoted_rate_1e8,
          spread_bps: quote.spread_bps,
        },
      },
    });

    await this.publish(SUBJECTS.TX_SETTLED, {
      transaction_id: txId,
      kind: 'SWAP',
      ledger_entry_id: journal.id,
      settled_at: new Date().toISOString(),
    });
  }

  private async executeDexSwapLeg(
    txId: string,
    intent: Intent,
    dest: ReturnType<typeof deriveDestinationProperties>,
    quote: DexQuoteResponse,
  ): Promise<void> {
    const walletId = (intent.metadata as { source_wallet_id?: string }).source_wallet_id;
    if (!walletId) {
      throw ValidationError(
        'execution.dex.no_wallet',
        'On-chain DEX swap requires metadata.source_wallet_id',
      );
    }

    const sourceWallet = await this.wallet.get(walletId);
    if (sourceWallet.chain !== 'BASE') {
      throw ValidationError('execution.dex.base_only', 'DEX swap requires a BASE custodial wallet');
    }

    const sourceCurrency = intent.source.amount.currency.toUpperCase();
    await this.reserveChainPayout({
      txId,
      kind: 'DEX_SWAP',
      walletId: sourceWallet.id,
      amountMinor: intent.source.amount.amount_minor.toString(),
      currency: sourceCurrency,
      rail: 'BASE',
    });

    const transfer = await this.wallet.transfer({
      walletId: sourceWallet.id,
      destinationAddress: quote.dex.recipient,
      amountMinor: intent.source.amount.amount_minor.toString(),
      asset: quote.dex.token_in,
      idempotencyKey: `exec:${txId}:dex-swap`,
      memo: extractMemo(intent) ?? `DEX ${quote.dex.token_in}→${quote.dex.token_out}`,
      intentId: intent.intent_id,
      kind: 'DEX_SWAP',
      swapPayload: {
        router: quote.dex.router,
        calldata: quote.dex.calldata,
        token_in: quote.dex.token_in,
        token_out: quote.dex.token_out,
        min_amount_out: quote.dex.min_amount_out,
        recipient: quote.dex.recipient,
      },
    });

    await this.transition(txId, 'EXECUTING', undefined, {
      broadcastJobId: transfer.id,
      detail: {
        dex: {
          quote_id: quote.quote_id,
          router: quote.dex.router,
          token_in: quote.dex.token_in,
          token_out: quote.dex.token_out,
          min_amount_out: quote.dex.min_amount_out,
          expected_out: quote.to_amount_minor,
          wallet_id: sourceWallet.id,
        },
      },
    });
    await this.transition(txId, 'AWAITING_CONFIRMATION', undefined, {
      broadcastJobId: transfer.id,
      txHash: transfer.tx_hash ?? undefined,
    });
    await this.publish(SUBJECTS.TX_EXECUTING, {
      transaction_id: txId,
      kind: 'DEX_SWAP',
      broadcast_id: transfer.id,
    });

    void dest;
  }

  private async ensureFxPoolAccount(currency: string): Promise<string> {
    const env = loadEnv(executionEnvSchema);
    const code = fxPoolAccountCode(currency, env.EXECUTION_FX_POOL_ACCOUNT_PREFIX);
    try {
      const existing = await this.ledger.getAccountByCode(code);
      return existing.id;
    } catch {
      const created = await this.ledger.createAccount({
        code,
        type: 'ASSET',
        currency: currency.toUpperCase(),
        ownerKind: 'SYSTEM',
        ownerId: 'treasury-fx',
        metadata: { role: 'fx_pool' },
      });
      return created.id;
    }
  }

  private async ensureClearingAccount(currency: string): Promise<string> {
    const code = clearingAccountCode(currency);
    try {
      const existing = await this.ledger.getAccountByCode(code);
      return existing.id;
    } catch {
      const created = await this.ledger.createAccount({
        code,
        type: 'ASSET',
        currency: currency.toUpperCase(),
        ownerKind: 'SYSTEM',
        ownerId: 'treasury-clearing',
        metadata: { role: 'inbound_clearing' },
      });
      return created.id;
    }
  }

  private async ensureInboundEquityAccount(currency: string): Promise<string> {
    const code = inboundEquityAccountCode(currency);
    try {
      const existing = await this.ledger.getAccountByCode(code);
      return existing.id;
    } catch {
      const created = await this.ledger.createAccount({
        code,
        type: 'EQUITY',
        currency: currency.toUpperCase(),
        ownerKind: 'SYSTEM',
        ownerId: 'treasury-inbound',
        metadata: { role: 'inbound_equity_offset' },
      });
      return created.id;
    }
  }

  /** Credit a user ledger account from treasury clearing (inbound TOPUP). */
  private async executeTopupLeg(
    txId: string,
    intent: Intent,
    dest: ReturnType<typeof deriveDestinationProperties>,
  ): Promise<void> {
    if (!dest.accountId) {
      throw ValidationError(
        'execution.topup.account_required',
        'TOPUP requires an INTERNAL_ACCOUNT destination',
      );
    }

    await this.transition(txId, 'RESERVED');
    const currency = intent.source.amount.currency.toUpperCase();
    const toAccount = await this.ledger.getAccount(dest.accountId);
    if (toAccount.currency !== currency) {
      throw ValidationError(
        'execution.topup.currency_mismatch',
        `Destination account currency ${toAccount.currency} does not match ${currency}`,
      );
    }

    const clearingId = await this.ensureClearingAccount(currency);

    const ledgerTx = await this.ledger.createTransaction({
      kind: 'PAYIN',
      externalRef: txId,
      intentId: intent.intent_id,
      metadata: { topup: true },
    });

    const externalRef = (intent.metadata as { external_reference?: string } | undefined)
      ?.external_reference;

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: `exec:${txId}:topup`,
      transactionId: ledgerTx.id,
      memo: extractMemo(intent) ?? `topup ${currency}`,
      metadata: { kind: 'PAYIN', intent_id: intent.intent_id },
      postings: buildTopupPostings({
        clearingAccountId: clearingId,
        destinationAccountId: dest.accountId,
        destinationAccountType: toAccount.type,
        amountMinor: intent.source.amount.amount_minor,
        currency,
      }),
    });

    await this.transition(txId, 'EXECUTING', undefined, { ledgerEntryId: journal.id });
    await this.transition(txId, 'SETTLED', undefined, {
      ledgerEntryId: journal.id,
      settledAt: new Date(),
      detail: {
        topup: {
          amount_minor: intent.source.amount.amount_minor,
          currency,
          ledger_transaction_id: ledgerTx.id,
          clearing_account_id: clearingId,
          destination_account_id: dest.accountId,
          external_reference: externalRef,
        },
      },
    });

    await this.publish(SUBJECTS.TX_SETTLED, {
      transaction_id: txId,
      kind: 'TOPUP',
      ledger_entry_id: journal.id,
      settled_at: new Date().toISOString(),
    });
  }

  private async assertComplianceTierRequirement(
    intent: Intent,
    txId: string,
    dest: ReturnType<typeof deriveDestinationProperties>,
  ): Promise<boolean> {
    const required = intent.constraints?.require_compliance_tier as
      | RequiredComplianceTier
      | undefined;
    if (!required) return true;

    const { tier } = await this.compliance.getTier(intent.actor.id);
    if (meetsRequiredComplianceTier(tier, required)) return true;

    await this.transition(txId, 'REJECTED', `compliance tier ${tier} below required ${required}`, {
      error: `Actor tier ${tier} does not meet required ${required}`,
      detail: { compliance: { required_tier: required, actual_tier: tier } },
    });
    await this.publish(SUBJECTS.TX_FAILED, {
      transaction_id: txId,
      kind: dest.kind,
      reason_code: 'compliance.tier_insufficient',
      reason_message: `required ${required}, actual ${tier}`,
      retryable: false,
    });
    return false;
  }

  private async executeInternalLeg(
    txId: string,
    intent: Intent,
    dest: ReturnType<typeof deriveDestinationProperties>,
  ): Promise<void> {
    if (!intent.source.account_ref || !dest.accountId) {
      throw ValidationError(
        'execution.intent.internal_requires_accounts',
        'INTERNAL rail requires both source.account_ref and an INTERNAL_ACCOUNT beneficiary',
      );
    }

    await this.transition(txId, 'RESERVED');
    const fromAccount = await this.ledger.getAccount(intent.source.account_ref);
    const toAccount = await this.ledger.getAccount(dest.accountId);

    const fromOut: 'DEBIT' | 'CREDIT' = isAssetNormal(fromAccount.type) ? 'CREDIT' : 'DEBIT';
    const toIn: 'DEBIT' | 'CREDIT' = isAssetNormal(toAccount.type) ? 'DEBIT' : 'CREDIT';

    const ledgerTx = await this.ledger.createTransaction({
      kind: 'TRANSFER',
      externalRef: txId,
      intentId: intent.intent_id,
    });

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: `exec:${txId}:ledger`,
      transactionId: ledgerTx.id,
      memo: extractMemo(intent),
      postings: [
        {
          account_id: intent.source.account_ref,
          direction: fromOut,
          amount_minor: intent.source.amount.amount_minor,
          currency: intent.source.amount.currency,
        },
        {
          account_id: dest.accountId,
          direction: toIn,
          amount_minor: intent.source.amount.amount_minor,
          currency: intent.source.amount.currency,
        },
      ],
    });

    await this.transition(txId, 'EXECUTING', undefined, { ledgerEntryId: journal.id });
    await this.transition(txId, 'SETTLED', undefined, {
      ledgerEntryId: journal.id,
      settledAt: new Date(),
    });

    await this.publish(SUBJECTS.TX_SETTLED, {
      transaction_id: txId,
      kind: 'INTERNAL_TRANSFER',
      ledger_entry_id: journal.id,
      settled_at: new Date().toISOString(),
    });
  }

  private async executeChainLeg(
    txId: string,
    intent: Intent,
    dest: ReturnType<typeof deriveDestinationProperties>,
    rail: 'BASE' | 'XRPL' | 'L3',
  ): Promise<void> {
    const walletChain = rail === 'L3' ? 'SALY_L3' : rail;
    if (intent.source.account_ref) {
      throw ValidationError(
        'execution.intent.chain_requires_wallet',
        `${rail} rail requires a custodial wallet source (not a ledger account)`,
      );
    }
    if (!dest.address) {
      throw ValidationError(
        'execution.intent.missing_chain_address',
        `${rail} rail requires a destination chain address`,
      );
    }
    const wallets = await this.wallet.listWalletsByActor({
      actorRef: intent.actor.id,
      chain: walletChain,
    });
    const sourceWallet = wallets.data[0];
    if (!sourceWallet) {
      throw ValidationError(
        'execution.intent.no_wallet_for_actor',
        `Actor ${intent.actor.id} has no provisioned ${walletChain} wallet`,
      );
    }

    await this.reserveChainPayout({
      txId,
      kind: dest.kind,
      walletId: sourceWallet.id,
      amountMinor: intent.source.amount.amount_minor.toString(),
      currency: rail === 'XRPL' ? 'XRP' : 'USDC',
      rail,
    });

    const transfer = await this.wallet.transfer({
      walletId: sourceWallet.id,
      destinationAddress: dest.address,
      amountMinor: intent.source.amount.amount_minor.toString(),
      asset: rail === 'XRPL' ? 'XRP' : 'USDC',
      idempotencyKey: `exec:${txId}:transfer`,
      memo: extractMemo(intent),
      intentId: intent.intent_id,
    });

    await this.transition(txId, 'EXECUTING', undefined, {
      broadcastJobId: transfer.id,
    });
    await this.transition(txId, 'AWAITING_CONFIRMATION', undefined, {
      broadcastJobId: transfer.id,
      txHash: transfer.tx_hash ?? undefined,
    });
    await this.publish(SUBJECTS.TX_EXECUTING, {
      transaction_id: txId,
      kind: dest.kind,
      broadcast_id: transfer.id,
    });
  }

  private async executeEscrowLeg(
    txId: string,
    intent: Intent,
    dest: ReturnType<typeof deriveDestinationProperties>,
  ): Promise<void> {
    const env = loadEnv(executionEnvSchema);
    if (!env.ESCROW_CONTRACT_ADDRESS_BASE) {
      throw ValidationError(
        'execution.escrow_not_configured',
        'ESCROW_CONTRACT_ADDRESS_BASE must be set to fund on-chain escrow deals',
      );
    }
    if (intent.source.account_ref) {
      throw ValidationError(
        'execution.intent.chain_requires_wallet',
        'ESCROW rail requires a custodial wallet source (not a ledger account)',
      );
    }
    if (!dest.address) {
      throw ValidationError(
        'execution.intent.missing_chain_address',
        'ESCROW rail requires a payee chain address',
      );
    }
    if (!intent.constraints?.escrow_condition) {
      throw ValidationError(
        'execution.intent.missing_escrow_condition',
        'ESCROW rail requires constraints.escrow_condition',
      );
    }

    const wallets = await this.wallet.listWalletsByActor({
      actorRef: intent.actor.id,
      chain: 'BASE',
    });
    const sourceWallet = wallets.data[0];
    if (!sourceWallet) {
      throw ValidationError(
        'execution.intent.no_wallet_for_actor',
        `Actor ${intent.actor.id} has no provisioned BASE wallet`,
      );
    }

    const dealId = dealIdFromCorrelationId(txId);
    const escrowDeadline = parseEscrowDeadline(intent);
    const usdcToken = BASE_ASSETS[env.BASE_NETWORK as BaseNetwork].USDC.address;

    await this.escrowService.upsertFundingDeal({
      dealId,
      transactionId: txId,
      payer: sourceWallet.address,
      payee: dest.address,
      token: usdcToken ?? '0x0000000000000000000000000000000000000000',
      amountMinor: BigInt(intent.source.amount.amount_minor.toString()),
      deadline: BigInt(escrowDeadline),
      escrowContract: env.ESCROW_CONTRACT_ADDRESS_BASE!,
      condition: intent.constraints.escrow_condition,
    });

    await this.reserveChainPayout({
      txId,
      kind: 'ESCROW_PAYOUT',
      walletId: sourceWallet.id,
      amountMinor: intent.source.amount.amount_minor.toString(),
      currency: 'USDC',
      rail: 'ESCROW',
    });

    const transfer = await this.wallet.transfer({
      walletId: sourceWallet.id,
      destinationAddress: dest.address,
      amountMinor: intent.source.amount.amount_minor.toString(),
      asset: 'USDC',
      idempotencyKey: `exec:${txId}:escrow`,
      memo: extractMemo(intent),
      intentId: intent.intent_id,
      kind: 'ESCROW_FUND',
      dealId,
      escrowContract: env.ESCROW_CONTRACT_ADDRESS_BASE,
      escrowDeadline: String(escrowDeadline),
    });

    await this.transition(txId, 'EXECUTING', undefined, {
      broadcastJobId: transfer.id,
      detail: {
        escrow: {
          deal_id: dealId,
          payee: dest.address,
          contract: env.ESCROW_CONTRACT_ADDRESS_BASE,
          deadline: escrowDeadline,
          condition: intent.constraints.escrow_condition,
        },
      },
    });
    await this.transition(txId, 'AWAITING_CONFIRMATION', undefined, {
      broadcastJobId: transfer.id,
      txHash: transfer.tx_hash ?? undefined,
    });

    if (transfer.tx_hash) {
      await this.escrowService.upsertFundingDeal({
        dealId,
        transactionId: txId,
        payer: sourceWallet.address,
        payee: dest.address,
        token: usdcToken ?? '0x0000000000000000000000000000000000000000',
        amountMinor: BigInt(intent.source.amount.amount_minor.toString()),
        deadline: BigInt(escrowDeadline),
        escrowContract: env.ESCROW_CONTRACT_ADDRESS_BASE!,
        condition: intent.constraints.escrow_condition,
        fundTxHash: transfer.tx_hash,
      });
    }

    await this.publish(SUBJECTS.TX_EXECUTING, {
      transaction_id: txId,
      kind: 'ESCROW_PAYOUT',
      broadcast_id: transfer.id,
    });
  }

  private async executeFiatLeg(txId: string, intent: Intent): Promise<void> {
    const ben = intent.destination.beneficiary;
    if (ben.kind !== 'BANK') {
      throw ValidationError(
        'execution.fiat.requires_bank',
        'FIAT rail requires a BANK beneficiary',
      );
    }

    const destination = buildFiatDestination(intent);
    if (!this.fiat.supports(destination)) {
      throw ValidationError(
        'execution.fiat.unsupported_destination',
        `Active PSP adapter does not support ${destination.currency}/${destination.countryCode}`,
      );
    }

    const sourceAccountId = await this.resolveFiatSourceAccount(intent);
    const currency = intent.source.amount.currency.toUpperCase();

    await this.reserveFiatPayout({
      txId,
      sourceAccountId,
      amountMinor: intent.source.amount.amount_minor.toString(),
      currency,
    });

    await this.prisma.executionTransaction.update({
      where: { id: txId },
      data: { sourceAccountId },
    });

    const transfer = await this.fiat.send({
      correlationId: txId,
      amountMinor: intent.source.amount.amount_minor.toString(),
      currency: intent.destination.currency,
      destination,
    });

    const fiatDetail = {
      psp_id: transfer.pspId,
      rail: transfer.rail,
      status: transfer.status,
      adapter: this.fiat.constructor.name,
      bank_country: ben.country,
      bank_code: ben.bank_code,
      account_number: maskAccountNumber(ben.account_number),
      account_name: ben.account_name,
    };

    await this.transition(txId, 'EXECUTING', undefined, {
      broadcastJobId: transfer.pspId,
      detail: { fiat: fiatDetail },
    });
    await this.transition(txId, 'AWAITING_CONFIRMATION', undefined, {
      broadcastJobId: transfer.pspId,
      detail: { fiat: { ...fiatDetail, status: transfer.status } },
    });
    await this.publish(SUBJECTS.TX_EXECUTING, {
      transaction_id: txId,
      kind: 'FIAT_PAYOUT',
      broadcast_id: transfer.pspId,
    });
  }

  // ───────────────────────────── Reads ─────────────────────────────

  async getById(id: string): Promise<TransactionWithEvents> {
    const tx = await this.fetchWithEvents(id);
    // Tenant isolation: a caller acting for an org may only read that org's
    // transactions. Throw not-found (not forbidden) so we never reveal that a
    // record belonging to another tenant exists.
    const orgId = getTenantOrgId();
    if (orgId && tx.orgId !== orgId) {
      throw NotFoundError('execution.tx.not_found', `Transaction ${id} not found`);
    }
    return tx;
  }

  async list(opts: {
    limit?: number;
    cursor?: string;
    state?: ExecutionTransactionState;
    kind?: ExecutionTransactionKind;
    payrollParentId?: string;
  }) {
    const take = Math.min(Math.max(opts.limit ?? 25, 1), 100);
    const where: Prisma.ExecutionTransactionWhereInput = {};
    if (opts.state) where.state = opts.state;
    if (opts.kind) where.kind = opts.kind;
    // When the request carries an org, scope results to it (partner isolation).
    // Internal/consumer callers (no org) retain prior, unfiltered behaviour.
    const orgId = getTenantOrgId();
    if (orgId) where.orgId = orgId;
    if (opts.payrollParentId) {
      where.metadata = {
        path: ['payroll_parent_id'],
        equals: opts.payrollParentId,
      };
    }

    const rows = await this.prisma.executionTransaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: take + 1,
      cursor: opts.cursor ? { id: opts.cursor } : undefined,
      skip: opts.cursor ? 1 : 0,
      include: { events: { orderBy: { occurredAt: 'asc' } } },
    });

    const data = rows.slice(0, take).map(toResponse);
    const nextCursor = rows.length > take ? rows[take - 1]!.id : null;
    return { data, next_cursor: nextCursor };
  }

  async getPayrollBatchLines(parentId: string): Promise<ReturnType<typeof toResponse>[]> {
    const parent = await this.prisma.executionTransaction.findUnique({ where: { id: parentId } });
    if (!parent || parent.kind !== 'PAYROLL_BATCH') {
      throw NotFoundError('execution.payroll.not_found', `Payroll batch ${parentId} not found`);
    }

    const children = await this.listPayrollLineTransactions(parentId);
    return children.map(toResponse);
  }

  // ───────────────────────────── TOPUP / inbound ─────────────────────────────

  /** Credit a ledger account from inbound clearing (no real pay-in rail in Tier 2). */
  async createTopup(dto: TopupDto): Promise<TransactionWithEvents> {
    const intentId = `itn_${ulid()}`;
    const intent: Intent = {
      version: '1',
      intent_id: intentId,
      kind: 'TOPUP',
      actor: { type: 'BUSINESS', id: dto.actor_id },
      source: {
        amount: { amount_minor: dto.amount_minor, currency: dto.currency.toUpperCase() },
      },
      destination: {
        currency: dto.currency.toUpperCase(),
        beneficiary: {
          kind: 'INTERNAL_ACCOUNT',
          account_ref: dto.destination_account_ref,
        },
      },
      context: {
        channel: 'API',
        correlation_id: dto.idempotency_key,
      },
      metadata: {
        external_reference: dto.external_reference,
        submitted_via: 'topup_api',
        ...(dto.memo ? { memo: dto.memo } : {}),
      },
    };

    return this.ingestIntent({
      idempotency_key: dto.idempotency_key,
      intent: intent as unknown as Record<string, unknown>,
    });
  }

  /** Ops: prefund asset.clearing from equity.inbound (simulated external settlement). */
  async seedClearingPool(dto: SeedClearingDto): Promise<{
    journal_entry_id: string;
    clearing_account_id: string;
    equity_account_id: string;
    amount_minor: string;
    currency: string;
  }> {
    const currency = dto.currency.toUpperCase();
    const clearingId = await this.ensureClearingAccount(currency);
    const equityId = await this.ensureInboundEquityAccount(currency);

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: dto.idempotency_key,
      memo: dto.memo ?? `seed clearing ${currency}`,
      metadata: { kind: 'CLEARING_SEED', currency },
      postings: buildClearingSeedPostings({
        clearingAccountId: clearingId,
        equityAccountId: equityId,
        amountMinor: dto.amount_minor,
        currency,
      }),
    });

    return {
      journal_entry_id: journal.id,
      clearing_account_id: clearingId,
      equity_account_id: equityId,
      amount_minor: dto.amount_minor,
      currency,
    };
  }

  // ───────────────────────────── Real fiat pay-in (PSP) ─────────────────────────────

  /**
   * Open a real PSP pay-in: screen the receiving org, ask the PSP to issue a
   * virtual account / hosted checkout, and park the transaction in
   * AWAITING_CONFIRMATION. The ledger is only credited once the PSP confirms the
   * funds landed (webhook → {@link confirmFiatPayinFromWebhook}, or the poller).
   */
  async createFiatPayin(
    dto: FiatPayinDto,
  ): Promise<{ transaction: TransactionWithEvents; instruction: FiatPayinInstruction | null }> {
    const existing = await this.findByIdempotencyKey(dto.idempotency_key);
    if (existing) {
      return { transaction: existing, instruction: payinInstructionFromTx(existing) };
    }

    const currency = dto.currency.toUpperCase();
    const country = dto.country.toUpperCase();

    if (!this.fiat.supportsPayin({ currency, countryCode: country })) {
      throw ValidationError(
        'execution.payin.unsupported',
        `Configured PSP does not support pay-in for ${currency}/${country}`,
      );
    }

    const destAccount = await this.resolveLedgerAccount(dto.destination_account_ref);
    if (destAccount.currency.toUpperCase() !== currency) {
      throw ValidationError(
        'execution.payin.currency_mismatch',
        `Destination account currency ${destAccount.currency} does not match ${currency}`,
      );
    }

    const provider = this.configuredPspProvider();
    const tx = await this.prisma.executionTransaction.create({
      data: {
        idempotencyKey: dto.idempotency_key,
        orgId: getTenantOrgId() ?? null,
        kind: 'FIAT_PAYIN',
        state: 'CREATED',
        destinationAccountId: destAccount.id,
        amountMinor: BigInt(dto.amount_minor),
        currency,
        asset: currency,
        memo: dto.memo ?? null,
        metadata: {
          payin: {
            actor_id: dto.actor_id,
            provider,
            country,
            customer_name: dto.customer_name,
            requested_method: dto.method ?? null,
          },
        } as unknown as Prisma.InputJsonValue,
      },
    });
    await this.recordEvent(tx.id, null, 'CREATED');
    await this.publish(SUBJECTS.TX_CREATED, {
      transaction_id: tx.id,
      kind: 'FIAT_PAYIN',
      source: { amount_minor: dto.amount_minor, currency },
      destination: { account_id: destAccount.id },
    });

    try {
      const screen = await this.compliance.screen({
        transactionId: tx.id,
        subjectRef: dto.actor_id,
        subjectKind: 'BUSINESS',
        displayName: dto.customer_name,
        countryCode: country,
      });
      if (screen.decision === 'BLOCK') {
        await this.transition(
          tx.id,
          'REJECTED',
          `compliance BLOCK (case ${screen.case_id ?? 'none'})`,
          {
            complianceRunId: screen.run_id,
            complianceCaseId: screen.case_id,
            error: `Compliance screening blocked pay-in (max score ${screen.max_score})`,
          },
        );
        await this.publish(SUBJECTS.TX_FAILED, {
          transaction_id: tx.id,
          kind: 'FIAT_PAYIN',
          reason_code: 'execution.payin.compliance_blocked',
          reason_message: `screening blocked (case ${screen.case_id ?? 'n/a'})`,
          retryable: false,
        });
        return { transaction: await this.fetchWithEvents(tx.id), instruction: null };
      }

      await this.transition(tx.id, 'SCREENED', 'pay-in screened', {
        complianceRunId: screen.run_id,
        complianceCaseId: screen.case_id,
      });

      const instruction = await this.fiat.createPayin({
        correlationId: tx.id,
        amountMinor: dto.amount_minor,
        currency,
        customer: {
          name: dto.customer_name,
          countryCode: country,
          ...(dto.customer_email ? { email: dto.customer_email } : {}),
        },
        ...(dto.method ? { method: dto.method } : {}),
      });

      await this.transition(tx.id, 'EXECUTING', 'pay-in instruction issued', {
        broadcastJobId: instruction.pspReference,
      });
      await this.transition(tx.id, 'AWAITING_CONFIRMATION', 'awaiting payer funds', {
        broadcastJobId: instruction.pspReference,
        detail: {
          payin: {
            psp_reference: instruction.pspReference,
            provider,
            method: instruction.method,
            ...(instruction.accountNumber ? { account_number: instruction.accountNumber } : {}),
            ...(instruction.bankName ? { bank_name: instruction.bankName } : {}),
            ...(instruction.accountName ? { account_name: instruction.accountName } : {}),
            ...(instruction.checkoutUrl ? { checkout_url: instruction.checkoutUrl } : {}),
            ...(instruction.expiresAt ? { expires_at: instruction.expiresAt } : {}),
          },
        },
      });

      // Persist the instruction so idempotent re-submits can return it verbatim.
      const meta = (tx.metadata as Record<string, unknown> | null) ?? {};
      const payinMeta = (meta.payin as Record<string, unknown> | undefined) ?? {};
      await this.prisma.executionTransaction.update({
        where: { id: tx.id },
        data: {
          metadata: {
            ...meta,
            payin: { ...payinMeta, instruction: instruction as unknown as Prisma.InputJsonValue },
          } as unknown as Prisma.InputJsonValue,
        },
      });

      await this.publish(SUBJECTS.TX_EXECUTING, {
        transaction_id: tx.id,
        kind: 'FIAT_PAYIN',
        broadcast_id: instruction.pspReference,
      });
      fiatPayinsTotal.inc({ outcome: 'opened', provider });

      return { transaction: await this.fetchWithEvents(tx.id), instruction };
    } catch (err) {
      await this.fail(tx.id, err);
      throw err;
    }
  }

  /**
   * Apply a verified PSP pay-in credit. Called by the internal webhook endpoint
   * (fiat-listener) and the pay-in poller. Idempotent: re-deliveries of an
   * already-terminal transaction are skipped.
   */
  async confirmFiatPayinFromWebhook(input: {
    reference: string;
    pspReference?: string;
    outcome: 'SETTLED' | 'FAILED';
    amountMinor?: string;
    currency?: string;
    provider?: string;
    settledAt?: string;
    reason?: string;
  }): Promise<{ applied: boolean; reason?: string }> {
    const tx = await this.prisma.executionTransaction.findFirst({
      where: {
        id: input.reference,
        kind: 'FIAT_PAYIN',
        state: 'AWAITING_CONFIRMATION',
        ...(input.pspReference ? { broadcastJobId: input.pspReference } : {}),
      },
    });
    if (!tx) {
      const known = await this.prisma.executionTransaction.findFirst({
        where: { id: input.reference, kind: 'FIAT_PAYIN' },
        select: { id: true },
      });
      return { applied: false, reason: known ? 'already_terminal' : 'not_found' };
    }

    if (input.outcome === 'SETTLED') {
      await this.settlePayin(tx, {
        ...(input.amountMinor ? { amountMinor: input.amountMinor } : {}),
        ...(input.provider ? { provider: input.provider } : {}),
        ...(input.settledAt ? { settledAt: input.settledAt } : {}),
      });
    } else {
      await this.transition(tx.id, 'FAILED', input.reason ?? 'PSP reported pay-in failure', {
        error: input.reason ?? 'pay-in failed',
        detail: {
          payin: { outcome: 'FAILED', failure_reason: input.reason ?? 'PSP reported failure' },
        },
      });
      await this.publish(SUBJECTS.TX_FAILED, {
        transaction_id: tx.id,
        kind: 'FIAT_PAYIN',
        reason_code: 'execution.payin.failed',
        reason_message: input.reason ?? 'pay-in failed',
        retryable: false,
      });
      const failProvider =
        input.provider ??
        (tx.metadata as { payin?: { provider?: string } } | null)?.payin?.provider ??
        this.configuredPspProvider();
      fiatPayinsTotal.inc({ outcome: 'failed', provider: failProvider });
    }
    return { applied: true };
  }

  /** Post the ledger PAYIN crediting the destination from PSP settled cash. */
  private async settlePayin(
    tx: ExecutionTransaction,
    opts: { amountMinor?: string; provider?: string; settledAt?: string },
  ): Promise<void> {
    if (!tx.destinationAccountId) {
      throw ValidationError(
        'execution.payin.no_destination',
        'Pay-in transaction has no destination account',
      );
    }
    const currency = tx.currency.toUpperCase();
    const payinMeta = (tx.metadata as { payin?: { provider?: string } } | null)?.payin;
    const provider = opts.provider ?? payinMeta?.provider ?? this.configuredPspProvider();
    // Credit the amount the PSP actually confirmed (handles under/overpayment);
    // any divergence from the requested amount is flagged for reconciliation.
    const expectedMinor = tx.amountMinor.toString();
    const amountMinor = opts.amountMinor ?? expectedMinor;

    const destAccount = await this.ledger.getAccount(tx.destinationAccountId);
    const bankAccountId = await this.ensureBankSettlementAccount(provider, currency);

    const ledgerTx = await this.ledger.createTransaction({
      kind: 'PAYIN',
      externalRef: tx.id,
      metadata: { payin: true, provider },
    });

    const journal = await this.ledger.postJournalEntry({
      idempotencyKey: `exec:${tx.id}:payin`,
      transactionId: ledgerTx.id,
      memo: tx.memo ?? `pay-in ${currency}`,
      metadata: { kind: 'PAYIN', provider },
      postings: buildPayinPostings({
        bankAccountId,
        destinationAccountId: destAccount.id,
        destinationAccountType: destAccount.type,
        amountMinor,
        currency,
      }),
    });

    await this.transition(tx.id, 'SETTLED', 'pay-in confirmed', {
      ledgerEntryId: journal.id,
      settledAt: opts.settledAt ? new Date(opts.settledAt) : new Date(),
      detail: {
        payin: {
          outcome: 'SETTLED',
          amount_minor: amountMinor,
          currency,
          provider,
          ledger_transaction_id: ledgerTx.id,
          bank_account_id: bankAccountId,
          destination_account_id: destAccount.id,
          ...(amountMinor !== expectedMinor
            ? { amount_mismatch: { expected: expectedMinor, received: amountMinor } }
            : {}),
        },
      },
    });
    await this.publish(SUBJECTS.TX_SETTLED, {
      transaction_id: tx.id,
      kind: 'FIAT_PAYIN',
      ledger_entry_id: journal.id,
      settled_at: new Date().toISOString(),
    });
    fiatPayinsTotal.inc({ outcome: 'settled', provider });
  }

  /** Pay-ins awaiting payer funds — used by the pay-in confirmation poller. */
  async listAwaitingFiatPayin(limit: number): Promise<ExecutionTransaction[]> {
    return this.prisma.executionTransaction.findMany({
      where: { kind: 'FIAT_PAYIN', state: 'AWAITING_CONFIRMATION' },
      orderBy: { createdAt: 'asc' },
      take: limit,
    });
  }

  private configuredPspProvider(): string {
    return loadEnv(executionEnvSchema).FIAT_PSP_PROVIDER;
  }

  /** Resolve a ledger account by UUID or by account code. */
  private async resolveLedgerAccount(ref: string) {
    try {
      return await this.ledger.getAccount(ref);
    } catch {
      return this.ledger.getAccountByCode(ref);
    }
  }

  /** Ensure the PSP settled-cash asset account exists, e.g. `asset.bank.paystack.NGN`. */
  private async ensureBankSettlementAccount(provider: string, currency: string): Promise<string> {
    const env = loadEnv(executionEnvSchema);
    const code = bankSettlementAccountCode(
      provider,
      currency,
      env.EXECUTION_PAYIN_BANK_ACCOUNT_PREFIX,
    );
    try {
      const existing = await this.ledger.getAccountByCode(code);
      return existing.id;
    } catch {
      const created = await this.ledger.createAccount({
        code,
        type: 'ASSET',
        currency: currency.toUpperCase(),
        ownerKind: 'SYSTEM',
        ownerId: `psp-${provider.toLowerCase()}`,
        metadata: { role: 'psp_settlement', provider },
      });
      return created.id;
    }
  }

  // ───────────────────────────── Settlement (called by ConfirmationsService) ─────────────────────────────

  async markSettledByTxHash(input: {
    txHash: string;
    blockNumber?: number;
    blockHash?: string;
    chain?: FinalityChain;
    confirmationsDepth?: number;
  }): Promise<void> {
    const tx = await this.prisma.executionTransaction.findFirst({
      where: { txHash: input.txHash, state: 'AWAITING_CONFIRMATION' },
      include: { events: { orderBy: { occurredAt: 'desc' } } },
    });
    if (!tx) return;

    // Bridge txs settle via BridgeConfirmationsService (multi-leg, cross-chain).
    if (tx.kind === 'BRIDGE_DEPOSIT' || tx.kind === 'BRIDGE_WITHDRAW') return;

    // SalySD mint/redeem settle via SalysdConfirmationsService (reserve ledger semantics).
    if (tx.kind === 'SALYSD_MINT' || tx.kind === 'SALYSD_REDEEM') return;

    const chain = input.chain ?? chainFromTxKind(tx.kind);
    const confirmationsDepth =
      input.confirmationsDepth ?? (chain ? requiredConfirmations(chain) : undefined);
    if (chain && confirmationsDepth !== undefined) {
      assertFinalityMet({ chain, confirmationsDepth });
    }

    let settleEntryId: string | undefined;
    if (tx.kind === 'DEX_SWAP') {
      const dexDetail = extractDexDetail(tx.events);
      if (dexDetail) {
        settleEntryId = await this.ledgerReservation.settleDexSwap({
          txId: tx.id,
          walletId: dexDetail.wallet_id,
          tokenIn: dexDetail.token_in,
          tokenOut: dexDetail.token_out,
          amountInMinor: tx.amountMinor.toString(),
          amountOutMinor: dexDetail.expected_out,
        });
      }
    } else {
      settleEntryId = await this.ledgerReservation.settleChainPayout(tx);
    }

    const finality =
      chain && input.blockNumber !== undefined
        ? {
            chain,
            block_number: input.blockNumber,
            ...(input.blockHash ? { block_hash: input.blockHash } : {}),
            confirmation_depth: confirmationsDepth ?? requiredConfirmations(chain),
          }
        : undefined;

    await this.transition(tx.id, 'SETTLED', `confirmed at block ${input.blockNumber ?? '?'}`, {
      settledAt: new Date(),
      detail: {
        ...(settleEntryId ? { ledger_settle_entry_id: settleEntryId } : {}),
        ...(finality ? { finality } : {}),
        ...(tx.kind === 'DEX_SWAP' ? { dex: { confirmed_at_block: input.blockNumber } } : {}),
      },
    });
    await this.publish(SUBJECTS.TX_SETTLED, {
      transaction_id: tx.id,
      kind: tx.kind,
      tx_hash: input.txHash,
      block_number: input.blockNumber,
      ledger_entry_id: settleEntryId ?? tx.ledgerEntryId ?? undefined,
      settled_at: new Date().toISOString(),
    });
  }

  /**
   * Reverse SETTLED chain payouts whose settlement block falls in a reorged
   * range. Idempotent per transaction — already-REVERSED rows are skipped.
   */
  async handleChainReorg(input: {
    chain: FinalityChain;
    fromBlock: number;
    toBlock: number;
    orphanedBlockHash?: string;
  }): Promise<{ reversed: number }> {
    const kinds = [...txKindsForChain(input.chain)] as ExecutionTransactionKind[];
    const txs = await this.prisma.executionTransaction.findMany({
      where: { state: 'SETTLED', kind: { in: kinds } },
      include: { events: { orderBy: { occurredAt: 'desc' } } },
    });

    let reversed = 0;

    for (const tx of txs) {
      const settlement = extractSettlementFinality(tx.events);
      if (!settlement || settlement.chain !== input.chain) continue;
      if (
        settlement.block_number < input.fromBlock ||
        settlement.block_number > input.toBlock
      ) {
        continue;
      }
      const didReverse = await this.reverseSettledChainTx(tx, settlement, input);
      if (didReverse) reversed++;
    }

    if (reversed > 0) {
      this.logger.warn(
        `reorg on ${input.chain} blocks ${input.fromBlock}-${input.toBlock}: reversed ${reversed} settlement(s)`,
      );
    }
    return { reversed };
  }

  private async reverseSettledChainTx(
    tx: ExecutionTransaction & { events: ExecutionTransactionEvent[] },
    settlement: NonNullable<ReturnType<typeof extractSettlementFinality>>,
    reorg: { chain: FinalityChain; fromBlock: number; toBlock: number; orphanedBlockHash?: string },
  ): Promise<boolean> {
    if (tx.state === 'REVERSED') return false;

    const settleEntryId = settlement.ledger_settle_entry_id;
    if (!settleEntryId) {
      this.logger.warn(`cannot reverse tx ${tx.id}: missing ledger_settle_entry_id`);
      return false;
    }

    const reversalEntryId = await this.ledgerReservation.reverseChainSettlement(
      tx.id,
      settleEntryId,
    );

    await this.transition(
      tx.id,
      'REVERSING',
      `chain reorg on ${reorg.chain} blocks ${reorg.fromBlock}-${reorg.toBlock}`,
      { detail: { reorg, settlement } },
    );
    await this.transition(tx.id, 'REVERSED', 'settlement reversed due to chain reorg', {
      ...(reversalEntryId ? { reversalEntryId } : {}),
      detail: { reorg, settlement, reversal_entry_id: reversalEntryId },
    });

    if (reversalEntryId) {
      await this.publish(SUBJECTS.TX_REVERSED, {
        transaction_id: tx.id,
        kind: tx.kind,
        original_ledger_entry_id: settleEntryId,
        reversal_ledger_entry_id: reversalEntryId,
      });
    }
    return true;
  }

  /** Settle escrow payouts when DealFunded is observed (fallback if tx_hash not yet stored). */
  async markSettledByDealFunded(input: {
    txHash: string;
    dealId: string;
    blockNumber?: number;
  }): Promise<void> {
    let tx = await this.prisma.executionTransaction.findFirst({
      where: { txHash: input.txHash, state: 'AWAITING_CONFIRMATION' },
    });
    if (!tx) {
      tx = await this.prisma.executionTransaction.findFirst({
        where: {
          kind: 'ESCROW_PAYOUT',
          state: 'AWAITING_CONFIRMATION',
          events: {
            some: {
              detail: {
                path: ['escrow', 'deal_id'],
                equals: input.dealId,
              },
            },
          },
        },
      });
    }
    if (!tx) return;

    if (!tx.txHash) {
      await this.prisma.executionTransaction.update({
        where: { id: tx.id },
        data: { txHash: input.txHash },
      });
    }

    const settleEntryId = await this.ledgerReservation.settleChainPayout(tx);
    await this.escrowService.markFunded({
      dealId: input.dealId,
      txHash: input.txHash,
      blockNumber: input.blockNumber,
    });
    await this.transition(
      tx.id,
      'SETTLED',
      `DealFunded confirmed at block ${input.blockNumber ?? '?'}`,
      {
        settledAt: new Date(),
        txHash: input.txHash,
        detail: {
          escrow: { deal_id: input.dealId, confirmed_via: 'DealFunded' },
          ...(settleEntryId ? { ledger_settle_entry_id: settleEntryId } : {}),
        },
      },
    );
    await this.publish(SUBJECTS.TX_SETTLED, {
      transaction_id: tx.id,
      kind: tx.kind,
      tx_hash: input.txHash,
      block_number: input.blockNumber,
      ledger_entry_id: settleEntryId ?? tx.ledgerEntryId ?? undefined,
      settled_at: new Date().toISOString(),
    });
  }

  /** Poll fiat PSP status — called by FiatConfirmationsService. */
  async listAwaitingFiatConfirmation(limit: number) {
    return this.prisma.executionTransaction.findMany({
      where: { kind: 'FIAT_PAYOUT', state: 'AWAITING_CONFIRMATION' },
      orderBy: { updatedAt: 'asc' },
      take: limit,
    });
  }

  async markSettledByPspId(input: {
    txId: string;
    pspId: string;
    settledAt?: string;
    confirmedVia?: 'poll' | 'webhook';
  }): Promise<void> {
    const tx = await this.prisma.executionTransaction.findFirst({
      where: { id: input.txId, broadcastJobId: input.pspId, state: 'AWAITING_CONFIRMATION' },
    });
    if (!tx) return;

    const confirmedVia = input.confirmedVia ?? 'poll';
    const settleEntryId = await this.ledgerReservation.settleFiatPayout(tx);

    await this.transition(tx.id, 'SETTLED', `PSP ${input.pspId} settled`, {
      settledAt: input.settledAt ? new Date(input.settledAt) : new Date(),
      detail: {
        fiat: { psp_id: input.pspId, confirmed_via: confirmedVia },
        ...(settleEntryId ? { ledger_settle_entry_id: settleEntryId } : {}),
      },
    });
    await this.publish(SUBJECTS.TX_SETTLED, {
      transaction_id: tx.id,
      kind: 'FIAT_PAYOUT',
      ledger_entry_id: settleEntryId ?? tx.ledgerEntryId ?? undefined,
      settled_at: (input.settledAt ? new Date(input.settledAt) : new Date()).toISOString(),
    });

    await this.commitFiatRisk(tx);
    await this.maybeFinalizePayrollBatchFromLine(tx.id);
  }

  async markFailedByPspId(input: {
    txId: string;
    pspId: string;
    reason: string;
    confirmedVia?: 'poll' | 'webhook';
  }): Promise<void> {
    const tx = await this.prisma.executionTransaction.findFirst({
      where: { id: input.txId, broadcastJobId: input.pspId, state: 'AWAITING_CONFIRMATION' },
    });
    if (!tx) return;

    const confirmedVia = input.confirmedVia ?? 'poll';
    let reversalEntryId: string | undefined;
    if (tx.ledgerEntryId) {
      reversalEntryId = await this.ledgerReservation.releaseChainReservation(
        tx.id,
        tx.ledgerEntryId,
      );
    }

    await this.transition(tx.id, 'FAILED', input.reason, {
      error: input.reason,
      ...(reversalEntryId ? { reversalEntryId } : {}),
      detail: { fiat: { psp_id: input.pspId, failure: input.reason, confirmed_via: confirmedVia } },
    });
    await this.maybeFinalizePayrollBatchFromLine(tx.id);
  }

  /**
   * Apply a fiat settlement from a verified PSP webhook (fiat-listener).
   * Idempotent: no-op when the transaction is already terminal.
   */
  async confirmFiatFromWebhook(input: {
    txId: string;
    pspId?: string;
    outcome: 'SETTLED' | 'FAILED';
    reason?: string;
    settledAt?: string;
  }): Promise<{ applied: boolean; reason?: string }> {
    const tx = await this.prisma.executionTransaction.findFirst({
      where: {
        id: input.txId,
        kind: 'FIAT_PAYOUT',
        state: 'AWAITING_CONFIRMATION',
        ...(input.pspId ? { broadcastJobId: input.pspId } : {}),
      },
    });
    if (!tx) {
      const terminal = await this.prisma.executionTransaction.findFirst({
        where: { id: input.txId, kind: 'FIAT_PAYOUT', state: { in: ['SETTLED', 'FAILED'] } },
      });
      if (terminal) return { applied: false, reason: 'already_terminal' };
      return { applied: false, reason: 'not_found' };
    }

    const pspId = input.pspId ?? tx.broadcastJobId ?? input.txId;
    if (input.outcome === 'SETTLED') {
      await this.markSettledByPspId({
        txId: tx.id,
        pspId,
        settledAt: input.settledAt,
        confirmedVia: 'webhook',
      });
    } else {
      await this.markFailedByPspId({
        txId: tx.id,
        pspId,
        reason: input.reason ?? 'PSP reported failure',
        confirmedVia: 'webhook',
      });
    }
    return { applied: true };
  }

  // ───────────────────────────── Internals ─────────────────────────────

  private async listPayrollLineTransactions(parentId: string) {
    return this.prisma.executionTransaction.findMany({
      where: {
        metadata: {
          path: ['payroll_parent_id'],
          equals: parentId,
        },
      },
      orderBy: { createdAt: 'asc' },
      include: { events: { orderBy: { occurredAt: 'asc' } } },
    });
  }

  private async maybeFinalizePayrollBatchFromLine(lineTxId: string): Promise<void> {
    const line = await this.prisma.executionTransaction.findUnique({ where: { id: lineTxId } });
    if (!line) return;
    const meta = line.metadata as { payroll_parent_id?: string } | null;
    if (!meta?.payroll_parent_id) return;
    await this.maybeFinalizePayrollBatch(meta.payroll_parent_id);
  }

  /**
   * Reconcile parent PAYROLL_BATCH state when async line payouts settle or fail
   * (e.g. after PSP webhook confirmation).
   */
  async maybeFinalizePayrollBatch(parentId: string): Promise<void> {
    const parent = await this.prisma.executionTransaction.findUnique({
      where: { id: parentId },
      include: { events: { orderBy: { occurredAt: 'asc' } } },
    });
    if (!parent || parent.kind !== 'PAYROLL_BATCH') return;
    if (['SETTLED', 'FAILED', 'REJECTED', 'REVERSED'].includes(parent.state)) return;

    const parentMeta = parent.metadata as {
      payroll?: Partial<PayrollBatchSummary>;
      intent?: Intent;
    } | null;
    const intent = parentMeta?.intent;
    const batchMeta = parentMeta?.payroll;

    const children = await this.listPayrollLineTransactions(parentId);
    const lineResults = children.map(childTransactionToPayrollLineResult);
    const summary = summarizePayrollLines(lineResults);
    summary.batch_id = batchMeta?.batch_id ?? summary.batch_id;
    summary.name = batchMeta?.name;
    summary.pay_period = batchMeta?.pay_period;

    const outcome = resolvePayrollParentState(lineResults);

    if (outcome === 'SETTLED') {
      if (intent) {
        await this.risk.commit({
          intentId: intent.intent_id,
          actorExternalRef: intent.actor.id,
          counterpartyRef: `payroll:${summary.batch_id}`,
          amountUsdMinor: parent.amountMinor.toString(),
        });
      }
      await this.transition(parent.id, 'SETTLED', 'all payroll lines settled', {
        settledAt: new Date(),
        detail: { payroll: summary },
      });
      await this.publish(SUBJECTS.TX_SETTLED, {
        transaction_id: parent.id,
        kind: 'PAYROLL_BATCH',
        settled_at: new Date().toISOString(),
      });
      return;
    }

    if (outcome === 'FAILED') {
      await this.transition(parent.id, 'FAILED', 'one or more payroll lines failed', {
        error: `${summary.lines_failed} of ${summary.total_lines} lines failed`,
        detail: { payroll: summary },
      });
      return;
    }

    await this.prisma.executionTransaction.update({
      where: { id: parent.id },
      data: {
        metadata: {
          ...(parentMeta ?? {}),
          payroll: summary as unknown as Prisma.InputJsonValue,
        } as unknown as Prisma.InputJsonValue,
      },
    });
  }

  private async reserveFiatPayout(input: {
    txId: string;
    sourceAccountId: string;
    amountMinor: string;
    currency: string;
  }): Promise<void> {
    const ledgerEntryId = await this.ledgerReservation.reserveFiatPayout(input);
    await this.transition(
      input.txId,
      'RESERVED',
      undefined,
      ledgerEntryId ? { ledgerEntryId } : {},
    );
    if (ledgerEntryId) {
      await this.publish(SUBJECTS.TX_RESERVED, {
        transaction_id: input.txId,
        kind: 'FIAT_PAYOUT',
        ledger_entry_id: ledgerEntryId,
      });
    }
  }

  private async resolveFiatSourceAccount(intent: Intent): Promise<string> {
    if (intent.source.account_ref) {
      return intent.source.account_ref;
    }
    const env = loadEnv(executionEnvSchema);
    const currency = intent.source.amount.currency.toUpperCase();
    const code = `${env.EXECUTION_FIAT_SOURCE_ACCOUNT_PREFIX}.${intent.actor.id}.${currency.toLowerCase()}`;
    try {
      const account = await this.ledger.getAccountByCode(code);
      return account.id;
    } catch {
      throw ValidationError(
        'execution.fiat.no_source',
        `No fiat source ledger account (${code}). Set source.account_ref or fund the business ${currency} treasury account.`,
      );
    }
  }

  private async commitFiatRisk(tx: ExecutionTransaction): Promise<void> {
    const metadata = tx.metadata as { intent?: Intent } | null;
    const intent = metadata?.intent;
    if (!intent) return;
    const dest = deriveDestinationProperties(intent);
    await this.risk.commit({
      intentId: intent.intent_id,
      transactionId: tx.id,
      actorExternalRef: intent.actor.id,
      counterpartyRef: dest.counterpartyRef,
      amountUsdMinor: intent.source.amount.amount_minor,
    });
  }

  private async reserveChainPayout(input: {
    txId: string;
    kind: ExecutionTransactionKind;
    walletId: string;
    amountMinor: string;
    currency: string;
    rail: ChainReservationRail;
  }): Promise<void> {
    const ledgerEntryId = await this.ledgerReservation.reserveChainPayout(input);
    await this.transition(
      input.txId,
      'RESERVED',
      undefined,
      ledgerEntryId ? { ledgerEntryId } : {},
    );
    if (ledgerEntryId) {
      await this.publish(SUBJECTS.TX_RESERVED, {
        transaction_id: input.txId,
        kind: input.kind,
        ledger_entry_id: ledgerEntryId,
      });
    }
  }

  private async findByIdempotencyKey(key: string): Promise<TransactionWithEvents | null> {
    const tx = await this.prisma.executionTransaction.findUnique({
      where: { idempotencyKey: key },
      include: { events: { orderBy: { occurredAt: 'asc' } } },
    });
    return tx ?? null;
  }

  private async fetchWithEvents(id: string): Promise<TransactionWithEvents> {
    const tx = await this.prisma.executionTransaction.findUnique({
      where: { id },
      include: { events: { orderBy: { occurredAt: 'asc' } } },
    });
    if (!tx) throw NotFoundError('execution.tx.not_found', `Transaction ${id} not found`);
    return tx;
  }

  private async transition(
    id: string,
    to: ExecutionTransactionState,
    reason?: string,
    patch: Partial<{
      ledgerEntryId: string;
      reversalEntryId: string;
      broadcastJobId: string;
      txHash: string;
      settledAt: Date;
      error: string;
      routeDecisionId: string;
      selectedRail: string;
      quoteId: string;
      quoteSignature: string;
      riskAssessmentId: string;
      riskScore: number;
      complianceRunId: string;
      complianceCaseId: string;
    }> & { detail?: Record<string, unknown> } = {},
    outboxEvents: OutboxEnqueue[] = [],
  ): Promise<ExecutionTransaction> {
    return this.prisma.$transaction(async (tx) => {
      const current = await tx.executionTransaction.findUnique({ where: { id } });
      if (!current) throw NotFoundError('execution.tx.not_found', `Transaction ${id} not found`);
      assertTransition(current.state, to);

      const updated = await tx.executionTransaction.update({
        where: { id },
        data: {
          state: to,
          ledgerEntryId: patch.ledgerEntryId ?? undefined,
          reversalEntryId: patch.reversalEntryId ?? undefined,
          broadcastJobId: patch.broadcastJobId ?? undefined,
          txHash: patch.txHash ?? undefined,
          settledAt: patch.settledAt ?? undefined,
          error: patch.error ?? undefined,
          routeDecisionId: patch.routeDecisionId ?? undefined,
          selectedRail: patch.selectedRail ?? undefined,
          quoteId: patch.quoteId ?? undefined,
          quoteSignature: patch.quoteSignature ?? undefined,
          riskAssessmentId: patch.riskAssessmentId ?? undefined,
          riskScore: patch.riskScore ?? undefined,
          complianceRunId: patch.complianceRunId ?? undefined,
          complianceCaseId: patch.complianceCaseId ?? undefined,
        },
      });
      await tx.executionTransactionEvent.create({
        data: {
          transactionId: id,
          fromState: current.state,
          toState: to,
          reason: reason ?? null,
          detail: patch.detail != null ? (patch.detail as Prisma.InputJsonValue) : undefined,
        },
      });
      // Emit domain events transactionally — they commit atomically with the
      // state change, then the relay delivers them to NATS at-least-once.
      for (const evt of outboxEvents) {
        await this.outbox.enqueueTx(
          tx as OutboxTxClient,
          evt.subject,
          evt.payload,
          evt.correlationId ? { correlationId: evt.correlationId } : undefined,
        );
      }
      return updated;
    });
  }

  private async fail(id: string, err: unknown): Promise<void> {
    const message = err instanceof Error ? err.message : String(err);
    const reasonCode = isSalyChainError(err) ? err.code : 'execution.unexpected';
    try {
      const current = await this.prisma.executionTransaction.findUnique({ where: { id } });
      if (!current) return;
      if (current.state === 'FAILED' || current.state === 'REVERSED' || current.state === 'SETTLED')
        return;

      let reversalEntryId: string | undefined;
      if (current.ledgerEntryId && !current.reversalEntryId) {
        reversalEntryId = await this.ledgerReservation.releaseChainReservation(
          id,
          current.ledgerEntryId,
        );
        if (reversalEntryId) {
          await this.publish(SUBJECTS.TX_REVERSED, {
            transaction_id: id,
            kind: current.kind,
            original_ledger_entry_id: current.ledgerEntryId,
            reversal_ledger_entry_id: reversalEntryId,
          });
        }
      }

      await this.transition(
        id,
        current.state === 'CREATED' || current.state === 'SCREENED' ? 'REJECTED' : 'FAILED',
        message,
        {
          error: message,
          ...(reversalEntryId ? { reversalEntryId } : {}),
        },
      );
      await this.publish(SUBJECTS.TX_FAILED, {
        transaction_id: id,
        kind: current.kind,
        reason_code: reasonCode,
        reason_message: message,
        retryable: isSalyChainError(err) ? err.retryable : false,
      });
    } catch (innerErr) {
      this.logger.error(`failed to mark tx ${id} as failed: ${(innerErr as Error).message}`);
    }
  }

  private async recordEvent(
    transactionId: string,
    fromState: ExecutionTransactionState | null,
    toState: ExecutionTransactionState,
    reason?: string,
  ): Promise<ExecutionTransactionEvent> {
    return this.prisma.executionTransactionEvent.create({
      data: { transactionId, fromState: fromState ?? null, toState, reason: reason ?? null },
    });
  }

  private async publish<S extends Subject>(
    subject: S,
    payload: Omit<EventBySubject[S], 'schema_version' | 'event_id' | 'occurred_at'>,
  ): Promise<void> {
    try {
      // Route through the transactional outbox: the relay guarantees at-least-
      // once delivery, so a NATS outage can no longer silently drop events.
      await this.outbox.enqueue(subject, payload as Record<string, unknown>);
    } catch (err) {
      // An enqueue failure is a local DB write failure — unexpected. Log loudly
      // but never poison the orchestrator; the state change is durable on its own.
      this.logger.error(`outbox enqueue failed (${subject}): ${(err as Error).message}`);
      void ExternalError; // keep import in use
      void this.events; // bus is drained by the outbox relay, not here
    }
  }
}

/** An event to enqueue atomically with a state transition. */
export interface OutboxEnqueue {
  readonly subject: Subject;
  readonly payload: Record<string, unknown>;
  readonly correlationId?: string;
}

/** Rails the INTENT_ROUTED schema accepts (ESCROW has no intent-level event). */
const INTENT_ROUTABLE_RAILS = new Set(['INTERNAL', 'BASE', 'XRPL', 'L3', 'FIAT']);
function isIntentRoutableRail(rail: string): boolean {
  return INTENT_ROUTABLE_RAILS.has(rail);
}

/** Derive human-readable screening flags for the INTENT_SCREENED event. */
function screeningFlags(
  complianceDecision: 'ALLOW' | 'REVIEW' | 'BLOCK',
  riskDecision: 'ALLOW' | 'REVIEW' | 'BLOCK',
): string[] {
  const flags: string[] = [];
  if (complianceDecision === 'REVIEW') flags.push('compliance_review');
  if (riskDecision === 'REVIEW') flags.push('risk_review');
  return flags;
}

export type TransactionWithEvents = ExecutionTransaction & { events: ExecutionTransactionEvent[] };

export function toResponse(tx: TransactionWithEvents) {
  const metadata = tx.metadata as {
    payroll?: Record<string, unknown>;
    intent?: Intent;
  } | null;

  return {
    id: tx.id,
    kind: tx.kind,
    state: tx.state,
    source: {
      wallet_id: tx.sourceWalletId ?? undefined,
      account_id: tx.sourceAccountId ?? undefined,
      amount_minor: tx.amountMinor.toString(),
      currency: tx.currency,
    },
    destination: {
      wallet_id: tx.destinationWalletId ?? undefined,
      account_id: tx.destinationAccountId ?? undefined,
      address: tx.destinationAddress ?? undefined,
      chain: tx.destinationChain ?? undefined,
    },
    ledger_entry_id: tx.ledgerEntryId ?? undefined,
    reversal_entry_id: tx.reversalEntryId ?? undefined,
    broadcast_id: tx.broadcastJobId ?? undefined,
    tx_hash: tx.txHash ?? undefined,
    intent_id: tx.intentId ?? undefined,
    error: tx.error ?? undefined,
    route_decision_id: tx.routeDecisionId ?? undefined,
    selected_rail: tx.selectedRail ?? undefined,
    quote_id: tx.quoteId ?? undefined,
    risk_assessment_id: tx.riskAssessmentId ?? undefined,
    risk_score: tx.riskScore ?? undefined,
    compliance_run_id: tx.complianceRunId ?? undefined,
    compliance_case_id: tx.complianceCaseId ?? undefined,
    created_at: tx.createdAt.toISOString(),
    settled_at: tx.settledAt?.toISOString() ?? undefined,
    payroll: tx.kind === 'PAYROLL_BATCH' ? metadata?.payroll : undefined,
    topup:
      tx.kind === 'TOPUP'
        ? (extractTopupDetail(tx.events as { detail?: Record<string, unknown> | null }[]) ??
          undefined)
        : undefined,
    events: tx.events.map((e) => ({
      state: e.toState,
      at: e.occurredAt.toISOString(),
      detail: e.detail ?? (e.reason ? { reason: e.reason } : undefined),
    })),
  };
}

function isAssetNormal(type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE'): boolean {
  return type === 'ASSET' || type === 'EXPENSE';
}

/**
 * Translate an Intent's destination into our execution-tx shape:
 *   - kind: INTERNAL_TRANSFER / BASE_PAYOUT / XRPL_PAYOUT
 *   - address / chain / accountId
 *   - counterpartyRef: stable identifier used by the risk engine
 */
function deriveDestinationProperties(intent: Intent): {
  kind: ExecutionTransactionKind;
  chain?: string;
  address?: string;
  accountId?: string;
  counterpartyRef: string;
} {
  if (intent.kind === 'SWAP') {
    const onchain = intent.constraints?.swap_execution === 'onchain';
    if (onchain) {
      const ben = intent.destination.beneficiary;
      if (ben.kind !== 'WALLET' || ben.chain !== 'BASE') {
        throw ValidationError(
          'execution.dex.bad_destination',
          'On-chain DEX swap requires BASE wallet destination',
        );
      }
      return {
        kind: 'DEX_SWAP',
        chain: 'BASE',
        address: ben.address,
        counterpartyRef: `dex:${intent.source.amount.currency}:${intent.destination.currency}`,
      };
    }

    const ben = intent.destination.beneficiary;
    if (ben.kind !== 'INTERNAL_ACCOUNT') {
      throw ValidationError(
        'execution.swap.bad_destination',
        'SWAP requires INTERNAL_ACCOUNT destination',
      );
    }
    return {
      kind: 'SWAP',
      chain: 'INTERNAL',
      accountId: ben.account_ref,
      counterpartyRef: `swap:${intent.source.amount.currency}:${intent.destination.currency}`,
    };
  }

  if (intent.kind === 'TOPUP') {
    const ben = intent.destination.beneficiary;
    if (ben.kind !== 'INTERNAL_ACCOUNT') {
      throw ValidationError(
        'execution.topup.bad_destination',
        'TOPUP requires INTERNAL_ACCOUNT destination',
      );
    }
    return {
      kind: 'TOPUP',
      chain: 'INTERNAL',
      accountId: ben.account_ref,
      counterpartyRef: `topup:${ben.account_ref}`,
    };
  }

  const ben = intent.destination.beneficiary;
  switch (ben.kind) {
    case 'WALLET':
      if (ben.chain === 'INTERNAL') {
        return {
          kind: 'INTERNAL_TRANSFER',
          chain: 'INTERNAL',
          address: ben.address,
          accountId: ben.address,
          counterpartyRef: `internal:${ben.address}`,
        };
      }
      if (intent.constraints?.escrow_condition && ben.chain === 'BASE') {
        return {
          kind: 'ESCROW_PAYOUT',
          chain: ben.chain,
          address: ben.address,
          counterpartyRef: `escrow:base:${ben.address.toLowerCase()}`,
        };
      }
      return {
        kind:
          ben.chain === 'XRPL'
            ? 'XRPL_PAYOUT'
            : ben.chain === 'SALY_L3'
              ? 'L3_PAYOUT'
              : 'BASE_PAYOUT',
        chain: ben.chain,
        address: ben.address,
        counterpartyRef: `${ben.chain.toLowerCase()}:${ben.address.toLowerCase()}`,
      };
    case 'INTERNAL_ACCOUNT':
      return {
        kind: 'INTERNAL_TRANSFER',
        chain: 'INTERNAL',
        accountId: ben.account_ref,
        counterpartyRef: `account:${ben.account_ref}`,
      };
    case 'PHONE':
      return { kind: 'INTERNAL_TRANSFER', counterpartyRef: `phone:${ben.value}` };
    case 'EMAIL':
      return { kind: 'INTERNAL_TRANSFER', counterpartyRef: `email:${ben.value}` };
    case 'HANDLE':
      return { kind: 'INTERNAL_TRANSFER', counterpartyRef: `handle:${ben.value}` };
    case 'BANK':
      return {
        kind: 'FIAT_PAYOUT',
        address: ben.account_number,
        counterpartyRef: `bank:${ben.country}:${ben.bank_code}:${ben.account_number}`,
      };
  }
}

function destinationRoutingType(
  intent: Intent,
): 'WALLET' | 'LEDGER_ACCOUNT' | 'EXTERNAL_ADDRESS' | 'BANK_ACCOUNT' {
  const ben = intent.destination.beneficiary;
  switch (ben.kind) {
    case 'WALLET':
      return ben.chain === 'INTERNAL' ? 'LEDGER_ACCOUNT' : 'EXTERNAL_ADDRESS';
    case 'INTERNAL_ACCOUNT':
      return 'LEDGER_ACCOUNT';
    case 'BANK':
      return 'BANK_ACCOUNT';
    default:
      return 'LEDGER_ACCOUNT';
  }
}

function extractMemo(intent: Intent): string | undefined {
  if (intent.destination.beneficiary.kind === 'WALLET' && intent.destination.beneficiary.memo) {
    return intent.destination.beneficiary.memo;
  }
  if (
    intent.kind === 'INVOICE' &&
    intent.metadata &&
    typeof intent.metadata.invoice_id === 'string'
  ) {
    return `invoice:${intent.metadata.invoice_id}`;
  }
  if (intent.kind === 'PAYROLL') {
    const payroll = intent.metadata?.payroll as { batch_id?: string; name?: string } | undefined;
    if (payroll?.name) return `payroll:${payroll.name}`;
    if (payroll?.batch_id) return `payroll:${payroll.batch_id}`;
  }
  if (intent.kind === 'TOPUP') {
    const memo = intent.metadata?.memo;
    if (typeof memo === 'string' && memo.length > 0) return memo;
  }
  return undefined;
}

/** Reconstruct the persisted pay-in instruction from a transaction's metadata. */
function payinInstructionFromTx(tx: { metadata: unknown }): FiatPayinInstruction | null {
  const meta = tx.metadata as { payin?: { instruction?: FiatPayinInstruction } } | null;
  return meta?.payin?.instruction ?? null;
}

function resolveSubjectKind(actor: Intent['actor']): 'USER' | 'BUSINESS' | 'AGENT' {
  if (actor.type === 'BUSINESS') return 'BUSINESS';
  if (actor.type === 'AGENT') return 'AGENT';
  return 'USER';
}

/** Unix seconds for on-chain escrow deadline (0 = resolver-only refund path). */
function parseEscrowDeadline(intent: Intent): number {
  const iso = intent.constraints?.escrow_condition?.deadline_at ?? intent.constraints?.deadline_at;
  if (!iso) return 0;
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return 0;
  return Math.floor(ms / 1000);
}

function buildFiatDestination(intent: Intent): FiatDestination {
  const ben = intent.destination.beneficiary;
  if (ben.kind !== 'BANK') {
    throw ValidationError('execution.fiat.requires_bank', 'FIAT rail requires BANK beneficiary');
  }
  const rail = inferFiatRail(intent.destination.currency, ben.country);
  if (!rail) {
    throw ValidationError(
      'execution.fiat.unknown_rail',
      `No fiat rail for ${intent.destination.currency}/${ben.country}`,
    );
  }
  return {
    currency: intent.destination.currency.toUpperCase(),
    rail,
    accountIdentifier: ben.account_number,
    bankCode: ben.bank_code,
    holderName: ben.account_name ?? 'Recipient',
    countryCode: ben.country.toUpperCase(),
    reference: extractMemo(intent),
  };
}

function maskAccountNumber(account: string): string {
  if (account.length <= 4) return account;
  return `${'*'.repeat(Math.max(0, account.length - 4))}${account.slice(-4)}`;
}

void ConflictError; // reserved for richer state-validation errors later
