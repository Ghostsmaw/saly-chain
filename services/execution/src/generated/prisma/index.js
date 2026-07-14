
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/library.js')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

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




  const path = require('path')

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
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/ghost/Downloads/SalyChain/services/execution/src/generated/prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/Users/ghost/Downloads/SalyChain/services/execution/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// =============================================================================\n// SalyChain Execution Service — Prisma schema\n//\n// The execution service owns the business-level transaction state and its\n// audit trail. It does NOT own monetary truth (the ledger does) or key\n// material (the signer does). It is the orchestrator + state machine.\n// =============================================================================\n\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nenum ExecutionTransactionKind {\n  INTERNAL_TRANSFER\n  BASE_PAYOUT\n  XRPL_PAYOUT\n  L3_PAYOUT\n  ESCROW_PAYOUT\n  PAYROLL_BATCH\n  FIAT_PAYOUT\n  FIAT_PAYIN\n  SWAP\n  TOPUP\n  DEX_SWAP\n  BRIDGE_DEPOSIT\n  BRIDGE_WITHDRAW\n  SALYSD_MINT\n  SALYSD_REDEEM\n}\n\nenum ExecutionTransactionState {\n  CREATED\n  SCREENED\n  ROUTED\n  QUOTED\n  RESERVED\n  EXECUTING\n  AWAITING_APPROVAL\n  AWAITING_CONFIRMATION\n  SETTLED\n  FAILED\n  REVERSING\n  REVERSED\n  REJECTED\n}\n\nmodel ExecutionTransaction {\n  id             String                    @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  idempotencyKey String                    @unique @map(\"idempotency_key\")\n  kind           ExecutionTransactionKind\n  state          ExecutionTransactionState @default(CREATED)\n\n  // Source (one of wallet or account is set, depending on kind).\n  sourceWalletId  String? @map(\"source_wallet_id\")\n  sourceAccountId String? @map(\"source_account_id\")\n  amountMinor     BigInt  @map(\"amount_minor\")\n  currency        String  @db.VarChar(8)\n\n  // Destination.\n  destinationWalletId  String? @map(\"destination_wallet_id\")\n  destinationAccountId String? @map(\"destination_account_id\")\n  destinationAddress   String? @map(\"destination_address\")\n  destinationChain     String? @map(\"destination_chain\")\n  asset                String? @db.VarChar(16)\n\n  // Pointers to artifacts created during execution.\n  ledgerTransactionId String? @map(\"ledger_transaction_id\")\n  ledgerEntryId       String? @map(\"ledger_entry_id\")\n  reversalEntryId     String? @map(\"reversal_entry_id\")\n  broadcastJobId      String? @map(\"broadcast_job_id\")\n  txHash              String? @map(\"tx_hash\")\n\n  intentId String? @map(\"intent_id\")\n  /// Owning organization (tenant). Null for consumer/JWT-originated transactions.\n  orgId    String? @map(\"org_id\")\n  memo     String?\n  metadata Json?\n  error    String?\n\n  // S2 — orchestration artifacts (purely audit; truth lives in source services).\n  routeDecisionId  String? @map(\"route_decision_id\")\n  selectedRail     String? @map(\"selected_rail\")\n  quoteId          String? @map(\"quote_id\")\n  quoteSignature   String? @map(\"quote_signature\")\n  riskAssessmentId String? @map(\"risk_assessment_id\")\n  riskScore        Int?    @map(\"risk_score\")\n  complianceRunId  String? @map(\"compliance_run_id\")\n  complianceCaseId String? @map(\"compliance_case_id\")\n\n  createdAt DateTime  @default(now()) @map(\"created_at\")\n  updatedAt DateTime  @updatedAt @map(\"updated_at\")\n  settledAt DateTime? @map(\"settled_at\")\n\n  events ExecutionTransactionEvent[]\n\n  @@index([state, createdAt])\n  @@index([kind, createdAt])\n  @@index([txHash])\n  @@index([orgId, createdAt])\n  @@map(\"execution_transactions\")\n}\n\nmodel ExecutionTransactionEvent {\n  id            String                     @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  transactionId String                     @map(\"transaction_id\") @db.Uuid\n  fromState     ExecutionTransactionState? @map(\"from_state\")\n  toState       ExecutionTransactionState  @map(\"to_state\")\n  reason        String?\n  detail        Json?\n  occurredAt    DateTime                   @default(now()) @map(\"occurred_at\")\n\n  transaction ExecutionTransaction @relation(fields: [transactionId], references: [id], onDelete: Cascade)\n\n  @@index([transactionId, occurredAt])\n  @@map(\"execution_transaction_events\")\n}\n\nenum OutboxStatus {\n  PENDING\n  PUBLISHED\n  FAILED\n}\n\n/// Transactional outbox. Domain events are written here in the SAME DB\n/// transaction as the state change they describe; a relay drains PENDING rows\n/// to NATS. This removes the dual-write hazard — events survive broker outages\n/// and process crashes. `eventId` is the JetStream msgID for at-least-once\n/// delivery with broker-side de-duplication.\nmodel EventOutbox {\n  id          String       @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  eventId     String       @unique @map(\"event_id\")\n  subject     String\n  payload     Json\n  status      OutboxStatus @default(PENDING)\n  attempts    Int          @default(0)\n  lastError   String?      @map(\"last_error\")\n  createdAt   DateTime     @default(now()) @map(\"created_at\")\n  publishedAt DateTime?    @map(\"published_at\")\n\n  @@index([status, createdAt])\n  @@map(\"event_outbox\")\n}\n\n// Cursor for the NATS consumer that processes chain confirmations. Lets the\n// service resume cleanly after a restart without missing settled events.\nmodel ExecutionConsumerCursor {\n  consumerName String   @id @map(\"consumer_name\")\n  lastEventId  String?  @map(\"last_event_id\")\n  lastSeenAt   DateTime @updatedAt @map(\"last_seen_at\")\n\n  @@map(\"execution_consumer_cursors\")\n}\n\nenum EscrowDealStatus {\n  FUNDING\n  FUNDED\n  RELEASED\n  REFUNDED\n}\n\nenum EscrowResolution {\n  RELEASE\n  REFUND\n}\n\n/// Audit trail for on-chain SalyEscrow deals (indexed + operator actions).\nmodel EscrowDeal {\n  id             String            @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  dealId         String            @unique @map(\"deal_id\") @db.VarChar(66)\n  transactionId  String?           @map(\"transaction_id\") @db.Uuid\n  status         EscrowDealStatus  @default(FUNDING)\n  payer          String            @db.VarChar(42)\n  payee          String            @db.VarChar(42)\n  token          String            @db.VarChar(42)\n  amountMinor    BigInt            @map(\"amount_minor\")\n  deadline       BigInt\n  escrowContract String            @map(\"escrow_contract\") @db.VarChar(42)\n  fundTxHash     String?           @map(\"fund_tx_hash\")\n  resolveTxHash  String?           @map(\"resolve_tx_hash\")\n  resolution     EscrowResolution?\n  condition      Json?\n  fundedAt       DateTime?         @map(\"funded_at\")\n  resolvedAt     DateTime?         @map(\"resolved_at\")\n  createdAt      DateTime          @default(now()) @map(\"created_at\")\n  updatedAt      DateTime          @updatedAt @map(\"updated_at\")\n\n  events EscrowDealEvent[]\n\n  @@index([status, createdAt])\n  @@index([transactionId])\n  @@map(\"escrow_deals\")\n}\n\nmodel EscrowDealEvent {\n  id         String   @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  dealRowId  String   @map(\"deal_row_id\") @db.Uuid\n  type       String   @db.VarChar(32)\n  detail     Json?\n  txHash     String?  @map(\"tx_hash\")\n  occurredAt DateTime @default(now()) @map(\"occurred_at\")\n\n  deal EscrowDeal @relation(fields: [dealRowId], references: [id], onDelete: Cascade)\n\n  @@index([dealRowId, occurredAt])\n  @@map(\"escrow_deal_events\")\n}\n\nenum ReconciliationStatus {\n  OK\n  BREAKS_FOUND\n  ERROR\n}\n\n/// One execution of a reconciliation sweep (e.g. ledger↔fiat-pay-in rail).\n/// Provides an immutable, queryable audit trail for finance ops.\nmodel ReconciliationRun {\n  id           String               @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  scope        String               @db.VarChar(48)\n  status       ReconciliationStatus @default(OK)\n  startedAt    DateTime             @default(now()) @map(\"started_at\")\n  finishedAt   DateTime?            @map(\"finished_at\")\n  checkedCount Int                  @default(0) @map(\"checked_count\")\n  breakCount   Int                  @default(0) @map(\"break_count\")\n  summary      Json?\n\n  breaks ReconciliationBreak[]\n\n  @@index([scope, startedAt])\n  @@map(\"reconciliation_runs\")\n}\n\n/// A single discrepancy found during a reconciliation run. Breaks are durable\n/// so they can be triaged/resolved by ops without re-running the sweep.\nmodel ReconciliationBreak {\n  id            String   @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  runId         String   @map(\"run_id\") @db.Uuid\n  kind          String   @db.VarChar(48)\n  reference     String?\n  currency      String?  @db.VarChar(8)\n  expectedMinor String?  @map(\"expected_minor\")\n  actualMinor   String?  @map(\"actual_minor\")\n  detail        Json?\n  createdAt     DateTime @default(now()) @map(\"created_at\")\n\n  run ReconciliationRun @relation(fields: [runId], references: [id], onDelete: Cascade)\n\n  @@index([runId])\n  @@index([kind, createdAt])\n  @@map(\"reconciliation_breaks\")\n}\n",
  "inlineSchemaHash": "3b48ad33b918ad209633176df932bb19c2a673cc2b4c9c92a5e80f5df3b43fb5",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "src/generated/prisma",
    "generated/prisma",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"ExecutionTransaction\":{\"dbName\":\"execution_transactions\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"idempotencyKey\",\"dbName\":\"idempotency_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"kind\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ExecutionTransactionKind\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ExecutionTransactionState\",\"default\":\"CREATED\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sourceWalletId\",\"dbName\":\"source_wallet_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sourceAccountId\",\"dbName\":\"source_account_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amountMinor\",\"dbName\":\"amount_minor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currency\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"destinationWalletId\",\"dbName\":\"destination_wallet_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"destinationAccountId\",\"dbName\":\"destination_account_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"destinationAddress\",\"dbName\":\"destination_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"destinationChain\",\"dbName\":\"destination_chain\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"asset\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ledgerTransactionId\",\"dbName\":\"ledger_transaction_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ledgerEntryId\",\"dbName\":\"ledger_entry_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reversalEntryId\",\"dbName\":\"reversal_entry_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"broadcastJobId\",\"dbName\":\"broadcast_job_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"txHash\",\"dbName\":\"tx_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"intentId\",\"dbName\":\"intent_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orgId\",\"dbName\":\"org_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Owning organization (tenant). Null for consumer/JWT-originated transactions.\"},{\"name\":\"memo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"error\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"routeDecisionId\",\"dbName\":\"route_decision_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"selectedRail\",\"dbName\":\"selected_rail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quoteId\",\"dbName\":\"quote_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quoteSignature\",\"dbName\":\"quote_signature\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"riskAssessmentId\",\"dbName\":\"risk_assessment_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"riskScore\",\"dbName\":\"risk_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"complianceRunId\",\"dbName\":\"compliance_run_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"complianceCaseId\",\"dbName\":\"compliance_case_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"settledAt\",\"dbName\":\"settled_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"events\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ExecutionTransactionEvent\",\"relationName\":\"ExecutionTransactionToExecutionTransactionEvent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ExecutionTransactionEvent\":{\"dbName\":\"execution_transaction_events\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactionId\",\"dbName\":\"transaction_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fromState\",\"dbName\":\"from_state\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ExecutionTransactionState\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"toState\",\"dbName\":\"to_state\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ExecutionTransactionState\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"detail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"occurredAt\",\"dbName\":\"occurred_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transaction\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ExecutionTransaction\",\"relationName\":\"ExecutionTransactionToExecutionTransactionEvent\",\"relationFromFields\":[\"transactionId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"EventOutbox\":{\"dbName\":\"event_outbox\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventId\",\"dbName\":\"event_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subject\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payload\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"OutboxStatus\",\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attempts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastError\",\"dbName\":\"last_error\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"publishedAt\",\"dbName\":\"published_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Transactional outbox. Domain events are written here in the SAME DB\\\\ntransaction as the state change they describe; a relay drains PENDING rows\\\\nto NATS. This removes the dual-write hazard — events survive broker outages\\\\nand process crashes. `eventId` is the JetStream msgID for at-least-once\\\\ndelivery with broker-side de-duplication.\"},\"ExecutionConsumerCursor\":{\"dbName\":\"execution_consumer_cursors\",\"fields\":[{\"name\":\"consumerName\",\"dbName\":\"consumer_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastEventId\",\"dbName\":\"last_event_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastSeenAt\",\"dbName\":\"last_seen_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"EscrowDeal\":{\"dbName\":\"escrow_deals\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dealId\",\"dbName\":\"deal_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactionId\",\"dbName\":\"transaction_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EscrowDealStatus\",\"default\":\"FUNDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payer\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payee\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amountMinor\",\"dbName\":\"amount_minor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deadline\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"escrowContract\",\"dbName\":\"escrow_contract\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fundTxHash\",\"dbName\":\"fund_tx_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resolveTxHash\",\"dbName\":\"resolve_tx_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resolution\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EscrowResolution\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"condition\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fundedAt\",\"dbName\":\"funded_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resolvedAt\",\"dbName\":\"resolved_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"events\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EscrowDealEvent\",\"relationName\":\"EscrowDealToEscrowDealEvent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"Audit trail for on-chain SalyEscrow deals (indexed + operator actions).\"},\"EscrowDealEvent\":{\"dbName\":\"escrow_deal_events\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dealRowId\",\"dbName\":\"deal_row_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"detail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"txHash\",\"dbName\":\"tx_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"occurredAt\",\"dbName\":\"occurred_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deal\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EscrowDeal\",\"relationName\":\"EscrowDealToEscrowDealEvent\",\"relationFromFields\":[\"dealRowId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ReconciliationRun\":{\"dbName\":\"reconciliation_runs\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"scope\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ReconciliationStatus\",\"default\":\"OK\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startedAt\",\"dbName\":\"started_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"finishedAt\",\"dbName\":\"finished_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"checkedCount\",\"dbName\":\"checked_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"breakCount\",\"dbName\":\"break_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"summary\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"breaks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ReconciliationBreak\",\"relationName\":\"ReconciliationBreakToReconciliationRun\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"One execution of a reconciliation sweep (e.g. ledger↔fiat-pay-in rail).\\\\nProvides an immutable, queryable audit trail for finance ops.\"},\"ReconciliationBreak\":{\"dbName\":\"reconciliation_breaks\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"runId\",\"dbName\":\"run_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"kind\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reference\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currency\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expectedMinor\",\"dbName\":\"expected_minor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"actualMinor\",\"dbName\":\"actual_minor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"detail\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"run\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ReconciliationRun\",\"relationName\":\"ReconciliationBreakToReconciliationRun\",\"relationFromFields\":[\"runId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"A single discrepancy found during a reconciliation run. Breaks are durable\\\\nso they can be triaged/resolved by ops without re-running the sweep.\"}},\"enums\":{\"ExecutionTransactionKind\":{\"values\":[{\"name\":\"INTERNAL_TRANSFER\",\"dbName\":null},{\"name\":\"BASE_PAYOUT\",\"dbName\":null},{\"name\":\"XRPL_PAYOUT\",\"dbName\":null},{\"name\":\"L3_PAYOUT\",\"dbName\":null},{\"name\":\"ESCROW_PAYOUT\",\"dbName\":null},{\"name\":\"PAYROLL_BATCH\",\"dbName\":null},{\"name\":\"FIAT_PAYOUT\",\"dbName\":null},{\"name\":\"FIAT_PAYIN\",\"dbName\":null},{\"name\":\"SWAP\",\"dbName\":null},{\"name\":\"TOPUP\",\"dbName\":null},{\"name\":\"DEX_SWAP\",\"dbName\":null},{\"name\":\"BRIDGE_DEPOSIT\",\"dbName\":null},{\"name\":\"BRIDGE_WITHDRAW\",\"dbName\":null},{\"name\":\"SALYSD_MINT\",\"dbName\":null},{\"name\":\"SALYSD_REDEEM\",\"dbName\":null}],\"dbName\":null},\"ExecutionTransactionState\":{\"values\":[{\"name\":\"CREATED\",\"dbName\":null},{\"name\":\"SCREENED\",\"dbName\":null},{\"name\":\"ROUTED\",\"dbName\":null},{\"name\":\"QUOTED\",\"dbName\":null},{\"name\":\"RESERVED\",\"dbName\":null},{\"name\":\"EXECUTING\",\"dbName\":null},{\"name\":\"AWAITING_APPROVAL\",\"dbName\":null},{\"name\":\"AWAITING_CONFIRMATION\",\"dbName\":null},{\"name\":\"SETTLED\",\"dbName\":null},{\"name\":\"FAILED\",\"dbName\":null},{\"name\":\"REVERSING\",\"dbName\":null},{\"name\":\"REVERSED\",\"dbName\":null},{\"name\":\"REJECTED\",\"dbName\":null}],\"dbName\":null},\"OutboxStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"PUBLISHED\",\"dbName\":null},{\"name\":\"FAILED\",\"dbName\":null}],\"dbName\":null},\"EscrowDealStatus\":{\"values\":[{\"name\":\"FUNDING\",\"dbName\":null},{\"name\":\"FUNDED\",\"dbName\":null},{\"name\":\"RELEASED\",\"dbName\":null},{\"name\":\"REFUNDED\",\"dbName\":null}],\"dbName\":null},\"EscrowResolution\":{\"values\":[{\"name\":\"RELEASE\",\"dbName\":null},{\"name\":\"REFUND\",\"dbName\":null}],\"dbName\":null},\"ReconciliationStatus\":{\"values\":[{\"name\":\"OK\",\"dbName\":null},{\"name\":\"BREAKS_FOUND\",\"dbName\":null},{\"name\":\"ERROR\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-darwin-arm64.dylib.node");
path.join(process.cwd(), "src/generated/prisma/libquery_engine-darwin-arm64.dylib.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "src/generated/prisma/schema.prisma")
