
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.ExecutionTransactionScalarFieldEnum = {
  id: 'id',
  idempotencyKey: 'idempotencyKey',
  kind: 'kind',
  state: 'state',
  sourceWalletId: 'sourceWalletId',
  sourceAccountId: 'sourceAccountId',
  amountMinor: 'amountMinor',
  currency: 'currency',
  destinationWalletId: 'destinationWalletId',
  destinationAccountId: 'destinationAccountId',
  destinationAddress: 'destinationAddress',
  destinationChain: 'destinationChain',
  asset: 'asset',
  ledgerTransactionId: 'ledgerTransactionId',
  ledgerEntryId: 'ledgerEntryId',
  reversalEntryId: 'reversalEntryId',
  broadcastJobId: 'broadcastJobId',
  txHash: 'txHash',
  intentId: 'intentId',
  orgId: 'orgId',
  memo: 'memo',
  metadata: 'metadata',
  error: 'error',
  routeDecisionId: 'routeDecisionId',
  selectedRail: 'selectedRail',
  quoteId: 'quoteId',
  quoteSignature: 'quoteSignature',
  riskAssessmentId: 'riskAssessmentId',
  riskScore: 'riskScore',
  complianceRunId: 'complianceRunId',
  complianceCaseId: 'complianceCaseId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  settledAt: 'settledAt'
};

exports.Prisma.ExecutionTransactionEventScalarFieldEnum = {
  id: 'id',
  transactionId: 'transactionId',
  fromState: 'fromState',
  toState: 'toState',
  reason: 'reason',
  detail: 'detail',
  occurredAt: 'occurredAt'
};

exports.Prisma.EventOutboxScalarFieldEnum = {
  id: 'id',
  eventId: 'eventId',
  subject: 'subject',
  payload: 'payload',
  status: 'status',
  attempts: 'attempts',
  lastError: 'lastError',
  createdAt: 'createdAt',
  publishedAt: 'publishedAt'
};

exports.Prisma.ExecutionConsumerCursorScalarFieldEnum = {
  consumerName: 'consumerName',
  lastEventId: 'lastEventId',
  lastSeenAt: 'lastSeenAt'
};

exports.Prisma.EscrowDealScalarFieldEnum = {
  id: 'id',
  dealId: 'dealId',
  transactionId: 'transactionId',
  status: 'status',
  payer: 'payer',
  payee: 'payee',
  token: 'token',
  amountMinor: 'amountMinor',
  deadline: 'deadline',
  escrowContract: 'escrowContract',
  fundTxHash: 'fundTxHash',
  resolveTxHash: 'resolveTxHash',
  resolution: 'resolution',
  condition: 'condition',
  fundedAt: 'fundedAt',
  resolvedAt: 'resolvedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EscrowDealEventScalarFieldEnum = {
  id: 'id',
  dealRowId: 'dealRowId',
  type: 'type',
  detail: 'detail',
  txHash: 'txHash',
  occurredAt: 'occurredAt'
};

exports.Prisma.ReconciliationRunScalarFieldEnum = {
  id: 'id',
  scope: 'scope',
  status: 'status',
  startedAt: 'startedAt',
  finishedAt: 'finishedAt',
  checkedCount: 'checkedCount',
  breakCount: 'breakCount',
  summary: 'summary'
};

exports.Prisma.ReconciliationBreakScalarFieldEnum = {
  id: 'id',
  runId: 'runId',
  kind: 'kind',
  reference: 'reference',
  currency: 'currency',
  expectedMinor: 'expectedMinor',
  actualMinor: 'actualMinor',
  detail: 'detail',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.ExecutionTransactionKind = exports.$Enums.ExecutionTransactionKind = {
  INTERNAL_TRANSFER: 'INTERNAL_TRANSFER',
  BASE_PAYOUT: 'BASE_PAYOUT',
  XRPL_PAYOUT: 'XRPL_PAYOUT',
  L3_PAYOUT: 'L3_PAYOUT',
  ESCROW_PAYOUT: 'ESCROW_PAYOUT',
  PAYROLL_BATCH: 'PAYROLL_BATCH',
  FIAT_PAYOUT: 'FIAT_PAYOUT',
  FIAT_PAYIN: 'FIAT_PAYIN',
  SWAP: 'SWAP',
  TOPUP: 'TOPUP',
  DEX_SWAP: 'DEX_SWAP',
  BRIDGE_DEPOSIT: 'BRIDGE_DEPOSIT',
  BRIDGE_WITHDRAW: 'BRIDGE_WITHDRAW',
  SALYSD_MINT: 'SALYSD_MINT',
  SALYSD_REDEEM: 'SALYSD_REDEEM'
};

exports.ExecutionTransactionState = exports.$Enums.ExecutionTransactionState = {
  CREATED: 'CREATED',
  SCREENED: 'SCREENED',
  ROUTED: 'ROUTED',
  QUOTED: 'QUOTED',
  RESERVED: 'RESERVED',
  EXECUTING: 'EXECUTING',
  AWAITING_APPROVAL: 'AWAITING_APPROVAL',
  AWAITING_CONFIRMATION: 'AWAITING_CONFIRMATION',
  SETTLED: 'SETTLED',
  FAILED: 'FAILED',
  REVERSING: 'REVERSING',
  REVERSED: 'REVERSED',
  REJECTED: 'REJECTED'
};

exports.OutboxStatus = exports.$Enums.OutboxStatus = {
  PENDING: 'PENDING',
  PUBLISHED: 'PUBLISHED',
  FAILED: 'FAILED'
};

exports.EscrowDealStatus = exports.$Enums.EscrowDealStatus = {
  FUNDING: 'FUNDING',
  FUNDED: 'FUNDED',
  RELEASED: 'RELEASED',
  REFUNDED: 'REFUNDED'
};

exports.EscrowResolution = exports.$Enums.EscrowResolution = {
  RELEASE: 'RELEASE',
  REFUND: 'REFUND'
};

exports.ReconciliationStatus = exports.$Enums.ReconciliationStatus = {
  OK: 'OK',
  BREAKS_FOUND: 'BREAKS_FOUND',
  ERROR: 'ERROR'
};

exports.Prisma.ModelName = {
  ExecutionTransaction: 'ExecutionTransaction',
  ExecutionTransactionEvent: 'ExecutionTransactionEvent',
  EventOutbox: 'EventOutbox',
  ExecutionConsumerCursor: 'ExecutionConsumerCursor',
  EscrowDeal: 'EscrowDeal',
  EscrowDealEvent: 'EscrowDealEvent',
  ReconciliationRun: 'ReconciliationRun',
  ReconciliationBreak: 'ReconciliationBreak'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
