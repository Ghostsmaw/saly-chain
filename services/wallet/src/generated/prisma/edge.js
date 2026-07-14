
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
} = require('./runtime/edge.js')


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





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.WalletScalarFieldEnum = {
  id: 'id',
  chain: 'chain',
  address: 'address',
  kind: 'kind',
  status: 'status',
  ownerId: 'ownerId',
  ownerKind: 'ownerKind',
  label: 'label',
  signerKeyRef: 'signerKeyRef',
  ledgerAccountId: 'ledgerAccountId',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WalletPolicyScalarFieldEnum = {
  walletId: 'walletId',
  destinationAllowlist: 'destinationAllowlist',
  trustedIssuerAllowlist: 'trustedIssuerAllowlist',
  perTxCapMinor: 'perTxCapMinor',
  dailyCapMinor: 'dailyCapMinor',
  approvalThresholdMinor: 'approvalThresholdMinor',
  requiredApprovers: 'requiredApprovers',
  updatedAt: 'updatedAt'
};

exports.Prisma.BroadcastJobScalarFieldEnum = {
  id: 'id',
  idempotencyKey: 'idempotencyKey',
  walletId: 'walletId',
  chain: 'chain',
  kind: 'kind',
  destinationAddress: 'destinationAddress',
  amountMinor: 'amountMinor',
  asset: 'asset',
  iouIssuer: 'iouIssuer',
  destinationTag: 'destinationTag',
  memo: 'memo',
  intentId: 'intentId',
  dealId: 'dealId',
  escrowContract: 'escrowContract',
  escrowDeadline: 'escrowDeadline',
  swapPayload: 'swapPayload',
  bridgePayload: 'bridgePayload',
  salysdPayload: 'salysdPayload',
  contractCallPayload: 'contractCallPayload',
  rawTx: 'rawTx',
  txHash: 'txHash',
  confirmedAtBlock: 'confirmedAtBlock',
  status: 'status',
  attempts: 'attempts',
  lastError: 'lastError',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
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
exports.Chain = exports.$Enums.Chain = {
  BASE: 'BASE',
  XRPL: 'XRPL',
  ETHEREUM: 'ETHEREUM',
  POLYGON: 'POLYGON',
  INTERNAL: 'INTERNAL',
  SALY_L3: 'SALY_L3'
};

exports.WalletKind = exports.$Enums.WalletKind = {
  USER_CUSTODIAL: 'USER_CUSTODIAL',
  BUSINESS_CUSTODIAL: 'BUSINESS_CUSTODIAL',
  AGENT_CUSTODIAL: 'AGENT_CUSTODIAL',
  TREASURY: 'TREASURY',
  HOT_OPERATIONAL: 'HOT_OPERATIONAL',
  FEE_COLLECTION: 'FEE_COLLECTION'
};

exports.WalletStatus = exports.$Enums.WalletStatus = {
  PROVISIONING: 'PROVISIONING',
  ACTIVE: 'ACTIVE',
  FROZEN: 'FROZEN',
  ARCHIVED: 'ARCHIVED'
};

exports.BroadcastJobKind = exports.$Enums.BroadcastJobKind = {
  TRANSFER: 'TRANSFER',
  ESCROW_FUND: 'ESCROW_FUND',
  DEX_SWAP: 'DEX_SWAP',
  BRIDGE_DEPOSIT: 'BRIDGE_DEPOSIT',
  BRIDGE_WITHDRAW: 'BRIDGE_WITHDRAW',
  SALYSD_MINT: 'SALYSD_MINT',
  SALYSD_REDEEM: 'SALYSD_REDEEM',
  SALYSD_APPROVE: 'SALYSD_APPROVE',
  SALYSD_ORACLE_UPDATE: 'SALYSD_ORACLE_UPDATE',
  CONTRACT_CALL: 'CONTRACT_CALL'
};

exports.BroadcastJobStatus = exports.$Enums.BroadcastJobStatus = {
  PENDING: 'PENDING',
  SUBMITTED: 'SUBMITTED',
  CONFIRMED: 'CONFIRMED',
  FAILED: 'FAILED'
};

exports.Prisma.ModelName = {
  Wallet: 'Wallet',
  WalletPolicy: 'WalletPolicy',
  BroadcastJob: 'BroadcastJob'
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
      "value": "/Users/ghost/Downloads/SalyChain/services/wallet/src/generated/prisma",
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
    "previewFeatures": [
      "postgresqlExtensions"
    ],
    "sourceFilePath": "/Users/ghost/Downloads/SalyChain/services/wallet/prisma/schema.prisma",
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
  "inlineSchema": "// =============================================================================\n// SalyChain Wallet Service — Prisma schema\n//\n// Stores custodial wallet metadata only. Private key material lives behind the\n// signer service (see ADR-0005). Each wallet has a policy that the signer\n// evaluates before authorizing any signature.\n// =============================================================================\n\ngenerator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"postgresqlExtensions\"]\n  output          = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider   = \"postgresql\"\n  url        = env(\"DATABASE_URL\")\n  extensions = [pgcrypto]\n}\n\nenum Chain {\n  BASE\n  XRPL\n  ETHEREUM\n  POLYGON\n  INTERNAL\n  SALY_L3\n}\n\nenum WalletStatus {\n  PROVISIONING\n  ACTIVE\n  FROZEN\n  ARCHIVED\n}\n\nenum WalletKind {\n  USER_CUSTODIAL\n  BUSINESS_CUSTODIAL\n  AGENT_CUSTODIAL\n  TREASURY\n  HOT_OPERATIONAL\n  FEE_COLLECTION\n}\n\nmodel Wallet {\n  id              String       @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  chain           Chain\n  address         String\n  kind            WalletKind\n  status          WalletStatus @default(PROVISIONING)\n  ownerId         String?      @map(\"owner_id\")\n  ownerKind       String?      @map(\"owner_kind\")\n  label           String?\n  /// Reference to the key material held by the signer service (e.g. KMS key ARN\n  /// or MPC wallet id). Never the key itself.\n  signerKeyRef    String       @map(\"signer_key_ref\")\n  ledgerAccountId String?      @map(\"ledger_account_id\") @db.Uuid\n  metadata        Json?\n  createdAt       DateTime     @default(now()) @map(\"created_at\")\n  updatedAt       DateTime     @updatedAt @map(\"updated_at\")\n\n  policy WalletPolicy?\n\n  @@unique([chain, address])\n  @@index([ownerKind, ownerId])\n  @@map(\"wallets\")\n}\n\nmodel WalletPolicy {\n  walletId               String   @id @map(\"wallet_id\") @db.Uuid\n  /// JSON array of allowlisted destinations: chain + address (or \"*\").\n  destinationAllowlist   Json     @map(\"destination_allowlist\")\n  /// JSON array of trusted IOU issuers: `CURRENCY:issuerAddress` or `*`.\n  trustedIssuerAllowlist Json     @default(\"[]\") @map(\"trusted_issuer_allowlist\")\n  /// Per-transaction cap in minor units of the wallet's native asset.\n  perTxCapMinor          BigInt   @map(\"per_tx_cap_minor\")\n  /// 24h rolling cap in minor units.\n  dailyCapMinor          BigInt   @map(\"daily_cap_minor\")\n  /// Required approvers above the threshold (0 means no manual approval).\n  approvalThresholdMinor BigInt   @map(\"approval_threshold_minor\")\n  requiredApprovers      Int      @default(0) @map(\"required_approvers\")\n  updatedAt              DateTime @updatedAt @map(\"updated_at\")\n\n  wallet Wallet @relation(fields: [walletId], references: [id], onDelete: Cascade)\n\n  @@map(\"wallet_policies\")\n}\n\nenum BroadcastJobKind {\n  TRANSFER\n  ESCROW_FUND\n  DEX_SWAP\n  BRIDGE_DEPOSIT\n  BRIDGE_WITHDRAW\n  SALYSD_MINT\n  SALYSD_REDEEM\n  SALYSD_APPROVE\n  SALYSD_ORACLE_UPDATE\n  CONTRACT_CALL\n}\n\nmodel BroadcastJob {\n  id                  String             @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  /// Caller-supplied idempotency key. Unique per wallet (a wallet can't have two\n  /// outstanding broadcasts under the same key — replays return the existing job).\n  idempotencyKey      String             @map(\"idempotency_key\")\n  walletId            String             @map(\"wallet_id\") @db.Uuid\n  chain               Chain\n  kind                BroadcastJobKind   @default(TRANSFER)\n  /// Destination address (EVM hex or XRPL classic-address). For escrow, this is the payee.\n  destinationAddress  String             @map(\"destination_address\")\n  /// Amount in minor units of `asset`.\n  amountMinor         BigInt             @map(\"amount_minor\")\n  asset               String             @db.VarChar(16)\n  /// XRPL IOU issuer classic address (USD/EUR/etc.). Null for native XRP.\n  iouIssuer           String?            @map(\"iou_issuer\") @db.VarChar(42)\n  /// XRPL destination tag for hosted-wallet deposits.\n  destinationTag      Int?               @map(\"destination_tag\")\n  memo                String?\n  /// Correlates agent spend approvals when signing high-value transfers.\n  intentId            String?            @map(\"intent_id\")\n  /// On-chain escrow deal id (bytes32 hex). Set for ESCROW_FUND jobs.\n  dealId              String?            @map(\"deal_id\") @db.VarChar(66)\n  escrowContract      String?            @map(\"escrow_contract\")\n  escrowDeadline      BigInt?            @map(\"escrow_deadline\")\n  /// Uniswap V3 swap calldata bundle — set for DEX_SWAP jobs.\n  swapPayload         Json?              @map(\"swap_payload\")\n  /// OP-Stack bridge calldata bundle — set for BRIDGE_* jobs.\n  bridgePayload       Json?              @map(\"bridge_payload\")\n  /// SalySD mint/burn/approve bundle — set for SALYSD_* jobs.\n  salysdPayload       Json?              @map(\"salysd_payload\")\n  /// Generic contract call — set for CONTRACT_CALL jobs.\n  contractCallPayload Json?              @map(\"contract_call_payload\")\n  /// Populated after the signer returns. Null until signed.\n  rawTx               String?            @map(\"raw_tx\")\n  /// Populated after a successful broadcast. Unique across the namespace.\n  txHash              String?            @unique @map(\"tx_hash\")\n  /// Block number at which this job's tx was first observed mined.\n  confirmedAtBlock    BigInt?            @map(\"confirmed_at_block\")\n  status              BroadcastJobStatus @default(PENDING)\n  attempts            Int                @default(0)\n  lastError           String?            @map(\"last_error\")\n  createdAt           DateTime           @default(now()) @map(\"created_at\")\n  updatedAt           DateTime           @updatedAt @map(\"updated_at\")\n\n  @@unique([walletId, idempotencyKey])\n  @@index([walletId, createdAt])\n  @@index([status])\n  @@index([dealId])\n  @@map(\"broadcast_jobs\")\n}\n\nenum BroadcastJobStatus {\n  PENDING\n  SUBMITTED\n  CONFIRMED\n  FAILED\n}\n",
  "inlineSchemaHash": "373c5875255d1026a2632f6399f6270454f4fea5c7af2e9b15c468954eebbec5",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Wallet\":{\"dbName\":\"wallets\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chain\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Chain\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"kind\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"WalletKind\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"WalletStatus\",\"default\":\"PROVISIONING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownerId\",\"dbName\":\"owner_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownerKind\",\"dbName\":\"owner_kind\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"label\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"signerKeyRef\",\"dbName\":\"signer_key_ref\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Reference to the key material held by the signer service (e.g. KMS key ARN\\\\nor MPC wallet id). Never the key itself.\"},{\"name\":\"ledgerAccountId\",\"dbName\":\"ledger_account_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"policy\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"WalletPolicy\",\"relationName\":\"WalletToWalletPolicy\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"chain\",\"address\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"chain\",\"address\"]}],\"isGenerated\":false},\"WalletPolicy\":{\"dbName\":\"wallet_policies\",\"fields\":[{\"name\":\"walletId\",\"dbName\":\"wallet_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"destinationAllowlist\",\"dbName\":\"destination_allowlist\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"JSON array of allowlisted destinations: chain + address (or \\\"*\\\").\"},{\"name\":\"trustedIssuerAllowlist\",\"dbName\":\"trusted_issuer_allowlist\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"[]\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"JSON array of trusted IOU issuers: `CURRENCY:issuerAddress` or `*`.\"},{\"name\":\"perTxCapMinor\",\"dbName\":\"per_tx_cap_minor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Per-transaction cap in minor units of the wallet's native asset.\"},{\"name\":\"dailyCapMinor\",\"dbName\":\"daily_cap_minor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"24h rolling cap in minor units.\"},{\"name\":\"approvalThresholdMinor\",\"dbName\":\"approval_threshold_minor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Required approvers above the threshold (0 means no manual approval).\"},{\"name\":\"requiredApprovers\",\"dbName\":\"required_approvers\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"wallet\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Wallet\",\"relationName\":\"WalletToWalletPolicy\",\"relationFromFields\":[\"walletId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BroadcastJob\":{\"dbName\":\"broadcast_jobs\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"idempotencyKey\",\"dbName\":\"idempotency_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Caller-supplied idempotency key. Unique per wallet (a wallet can't have two\\\\noutstanding broadcasts under the same key — replays return the existing job).\"},{\"name\":\"walletId\",\"dbName\":\"wallet_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chain\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Chain\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"kind\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BroadcastJobKind\",\"default\":\"TRANSFER\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"destinationAddress\",\"dbName\":\"destination_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Destination address (EVM hex or XRPL classic-address). For escrow, this is the payee.\"},{\"name\":\"amountMinor\",\"dbName\":\"amount_minor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Amount in minor units of `asset`.\"},{\"name\":\"asset\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"iouIssuer\",\"dbName\":\"iou_issuer\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"XRPL IOU issuer classic address (USD/EUR/etc.). Null for native XRP.\"},{\"name\":\"destinationTag\",\"dbName\":\"destination_tag\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"XRPL destination tag for hosted-wallet deposits.\"},{\"name\":\"memo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"intentId\",\"dbName\":\"intent_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Correlates agent spend approvals when signing high-value transfers.\"},{\"name\":\"dealId\",\"dbName\":\"deal_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"On-chain escrow deal id (bytes32 hex). Set for ESCROW_FUND jobs.\"},{\"name\":\"escrowContract\",\"dbName\":\"escrow_contract\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"escrowDeadline\",\"dbName\":\"escrow_deadline\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"swapPayload\",\"dbName\":\"swap_payload\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Uniswap V3 swap calldata bundle — set for DEX_SWAP jobs.\"},{\"name\":\"bridgePayload\",\"dbName\":\"bridge_payload\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"OP-Stack bridge calldata bundle — set for BRIDGE_* jobs.\"},{\"name\":\"salysdPayload\",\"dbName\":\"salysd_payload\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"SalySD mint/burn/approve bundle — set for SALYSD_* jobs.\"},{\"name\":\"contractCallPayload\",\"dbName\":\"contract_call_payload\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Generic contract call — set for CONTRACT_CALL jobs.\"},{\"name\":\"rawTx\",\"dbName\":\"raw_tx\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Populated after the signer returns. Null until signed.\"},{\"name\":\"txHash\",\"dbName\":\"tx_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Populated after a successful broadcast. Unique across the namespace.\"},{\"name\":\"confirmedAtBlock\",\"dbName\":\"confirmed_at_block\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Block number at which this job's tx was first observed mined.\"},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BroadcastJobStatus\",\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attempts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastError\",\"dbName\":\"last_error\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[[\"walletId\",\"idempotencyKey\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"walletId\",\"idempotencyKey\"]}],\"isGenerated\":false}},\"enums\":{\"Chain\":{\"values\":[{\"name\":\"BASE\",\"dbName\":null},{\"name\":\"XRPL\",\"dbName\":null},{\"name\":\"ETHEREUM\",\"dbName\":null},{\"name\":\"POLYGON\",\"dbName\":null},{\"name\":\"INTERNAL\",\"dbName\":null},{\"name\":\"SALY_L3\",\"dbName\":null}],\"dbName\":null},\"WalletStatus\":{\"values\":[{\"name\":\"PROVISIONING\",\"dbName\":null},{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"FROZEN\",\"dbName\":null},{\"name\":\"ARCHIVED\",\"dbName\":null}],\"dbName\":null},\"WalletKind\":{\"values\":[{\"name\":\"USER_CUSTODIAL\",\"dbName\":null},{\"name\":\"BUSINESS_CUSTODIAL\",\"dbName\":null},{\"name\":\"AGENT_CUSTODIAL\",\"dbName\":null},{\"name\":\"TREASURY\",\"dbName\":null},{\"name\":\"HOT_OPERATIONAL\",\"dbName\":null},{\"name\":\"FEE_COLLECTION\",\"dbName\":null}],\"dbName\":null},\"BroadcastJobKind\":{\"values\":[{\"name\":\"TRANSFER\",\"dbName\":null},{\"name\":\"ESCROW_FUND\",\"dbName\":null},{\"name\":\"DEX_SWAP\",\"dbName\":null},{\"name\":\"BRIDGE_DEPOSIT\",\"dbName\":null},{\"name\":\"BRIDGE_WITHDRAW\",\"dbName\":null},{\"name\":\"SALYSD_MINT\",\"dbName\":null},{\"name\":\"SALYSD_REDEEM\",\"dbName\":null},{\"name\":\"SALYSD_APPROVE\",\"dbName\":null},{\"name\":\"SALYSD_ORACLE_UPDATE\",\"dbName\":null},{\"name\":\"CONTRACT_CALL\",\"dbName\":null}],\"dbName\":null},\"BroadcastJobStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"SUBMITTED\",\"dbName\":null},{\"name\":\"CONFIRMED\",\"dbName\":null},{\"name\":\"FAILED\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

