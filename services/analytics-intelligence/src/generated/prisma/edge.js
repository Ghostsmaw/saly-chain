
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

exports.Prisma.EntityScalarFieldEnum = {
  id: 'id',
  chain: 'chain',
  label: 'label',
  category: 'category',
  status: 'status',
  addressCount: 'addressCount',
  riskScore: 'riskScore',
  sanctioned: 'sanctioned',
  firstSeenAt: 'firstSeenAt',
  lastSeenAt: 'lastSeenAt',
  resolvedAt: 'resolvedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EntityMemberScalarFieldEnum = {
  id: 'id',
  entityId: 'entityId',
  chain: 'chain',
  address: 'address',
  transferEvents: 'transferEvents',
  label: 'label',
  addedAt: 'addedAt'
};

exports.Prisma.ResolutionRunScalarFieldEnum = {
  id: 'id',
  status: 'status',
  trigger: 'trigger',
  chain: 'chain',
  lookbackDays: 'lookbackDays',
  addressCount: 'addressCount',
  entityCount: 'entityCount',
  linkCount: 'linkCount',
  durationMs: 'durationMs',
  error: 'error',
  startedAt: 'startedAt',
  finishedAt: 'finishedAt',
  createdAt: 'createdAt'
};

exports.Prisma.AddressEmbeddingScalarFieldEnum = {
  id: 'id',
  chain: 'chain',
  address: 'address',
  dim: 'dim',
  vector: 'vector',
  model: 'model',
  updatedAt: 'updatedAt',
  createdAt: 'createdAt'
};

exports.Prisma.NlQueryScalarFieldEnum = {
  id: 'id',
  orgId: 'orgId',
  question: 'question',
  status: 'status',
  metric: 'metric',
  plan: 'plan',
  rowCount: 'rowCount',
  latencyMs: 'latencyMs',
  error: 'error',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.EntityStatus = exports.$Enums.EntityStatus = {
  ACTIVE: 'ACTIVE',
  MERGED: 'MERGED'
};

exports.ResolutionStatus = exports.$Enums.ResolutionStatus = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED'
};

exports.RunTrigger = exports.$Enums.RunTrigger = {
  MANUAL: 'MANUAL',
  SCHEDULE: 'SCHEDULE'
};

exports.NlQueryStatus = exports.$Enums.NlQueryStatus = {
  PLANNED: 'PLANNED',
  EXECUTED: 'EXECUTED',
  UNSUPPORTED: 'UNSUPPORTED',
  FAILED: 'FAILED'
};

exports.Prisma.ModelName = {
  Entity: 'Entity',
  EntityMember: 'EntityMember',
  ResolutionRun: 'ResolutionRun',
  AddressEmbedding: 'AddressEmbedding',
  NlQuery: 'NlQuery'
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
      "value": "/Users/ghost/Downloads/SalyChain/services/analytics-intelligence/src/generated/prisma",
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
    "sourceFilePath": "/Users/ghost/Downloads/SalyChain/services/analytics-intelligence/prisma/schema.prisma",
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
  "inlineSchema": "// =============================================================================\n// SalyChain Intelligence Service — Prisma schema (B8)\n//\n// Saly Intelligence is the AI layer over the analytics datasets. It persists:\n//\n//   Entity         — a resolved cluster of addresses believed to belong to one\n//                    real-world actor, with a derived label/category, an entity\n//                    risk score, and a sanctioned flag.\n//   EntityMember   — an (chain, address) belonging to an Entity, with the\n//                    activity counters that justified the link.\n//   ResolutionRun  — one entity-resolution batch (clustering pass) with counts.\n//   AddressEmbedding — a vector embedding for an address (deterministic local\n//                    embedder by default), used for similarity search.\n//   NlQuery        — an audit log of natural-language analytics questions, the\n//                    semantic-layer plan they compiled to, and the outcome.\n//\n// ClickHouse holds the raw activity; this Postgres DB holds the *derived\n// intelligence* (clusters, embeddings, query logs) that the rest of the platform\n// (notably services/risk) consumes.\n// =============================================================================\n\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nenum EntityStatus {\n  ACTIVE\n  MERGED /// folded into another entity by a later run\n}\n\nenum ResolutionStatus {\n  PENDING\n  RUNNING\n  SUCCEEDED\n  FAILED\n}\n\nenum RunTrigger {\n  MANUAL\n  SCHEDULE\n}\n\nenum NlQueryStatus {\n  PLANNED /// mapped to a plan but not executed\n  EXECUTED /// plan executed against the semantic layer\n  UNSUPPORTED /// could not be mapped to an allowlisted metric\n  FAILED /// execution error\n}\n\nmodel Entity {\n  id       String       @id @map(\"id\")\n  /// Primary chain for the cluster (clusters are per-chain in the MVP).\n  chain    String\n  label    String?\n  category String?\n  status   EntityStatus @default(ACTIVE)\n\n  addressCount Int     @default(0) @map(\"address_count\")\n  /// Derived entity risk score (0..100) consumed by services/risk.\n  riskScore    Int     @default(0) @map(\"risk_score\")\n  sanctioned   Boolean @default(false)\n\n  firstSeenAt DateTime? @map(\"first_seen_at\")\n  lastSeenAt  DateTime? @map(\"last_seen_at\")\n  resolvedAt  DateTime  @default(now()) @map(\"resolved_at\")\n\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  members EntityMember[]\n\n  @@index([chain, status])\n  @@index([sanctioned])\n  @@map(\"entities\")\n}\n\nmodel EntityMember {\n  id       String @id @map(\"id\")\n  entityId String @map(\"entity_id\")\n  chain    String\n  address  String\n\n  transferEvents Int      @default(0) @map(\"transfer_events\")\n  label          String?\n  addedAt        DateTime @default(now()) @map(\"added_at\")\n\n  entity Entity @relation(fields: [entityId], references: [id], onDelete: Cascade)\n\n  @@unique([chain, address])\n  @@index([entityId])\n  @@map(\"entity_members\")\n}\n\nmodel ResolutionRun {\n  id           String           @id @map(\"id\")\n  status       ResolutionStatus @default(PENDING)\n  trigger      RunTrigger       @default(MANUAL)\n  chain        String?\n  lookbackDays Int              @map(\"lookback_days\")\n\n  addressCount Int? @map(\"address_count\")\n  entityCount  Int? @map(\"entity_count\")\n  linkCount    Int? @map(\"link_count\")\n\n  durationMs Int?    @map(\"duration_ms\")\n  error      String?\n\n  startedAt  DateTime? @map(\"started_at\")\n  finishedAt DateTime? @map(\"finished_at\")\n  createdAt  DateTime  @default(now()) @map(\"created_at\")\n\n  @@index([status, createdAt])\n  @@map(\"resolution_runs\")\n}\n\nmodel AddressEmbedding {\n  id      String @id @map(\"id\")\n  chain   String\n  address String\n  dim     Int\n  /// Float[] embedding stored as JSON (no pgvector dependency in the MVP).\n  vector  Json\n  model   String\n\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n  createdAt DateTime @default(now()) @map(\"created_at\")\n\n  @@unique([chain, address])\n  @@map(\"address_embeddings\")\n}\n\nmodel NlQuery {\n  id        String        @id @map(\"id\")\n  orgId     String?       @map(\"org_id\")\n  question  String\n  status    NlQueryStatus\n  metric    String?\n  plan      Json\n  rowCount  Int?          @map(\"row_count\")\n  latencyMs Int?          @map(\"latency_ms\")\n  error     String?\n  createdAt DateTime      @default(now()) @map(\"created_at\")\n\n  @@index([orgId, createdAt])\n  @@map(\"nl_queries\")\n}\n",
  "inlineSchemaHash": "9429e80de343c79de249be459b541498e264e9fe8fc35025dbf6a7e247c92998",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Entity\":{\"dbName\":\"entities\",\"fields\":[{\"name\":\"id\",\"dbName\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chain\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Primary chain for the cluster (clusters are per-chain in the MVP).\"},{\"name\":\"label\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EntityStatus\",\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"addressCount\",\"dbName\":\"address_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"riskScore\",\"dbName\":\"risk_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Derived entity risk score (0..100) consumed by services/risk.\"},{\"name\":\"sanctioned\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"firstSeenAt\",\"dbName\":\"first_seen_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastSeenAt\",\"dbName\":\"last_seen_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resolvedAt\",\"dbName\":\"resolved_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EntityMember\",\"relationName\":\"EntityToEntityMember\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"EntityMember\":{\"dbName\":\"entity_members\",\"fields\":[{\"name\":\"id\",\"dbName\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entityId\",\"dbName\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chain\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transferEvents\",\"dbName\":\"transfer_events\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"label\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"addedAt\",\"dbName\":\"added_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entity\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Entity\",\"relationName\":\"EntityToEntityMember\",\"relationFromFields\":[\"entityId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"chain\",\"address\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"chain\",\"address\"]}],\"isGenerated\":false},\"ResolutionRun\":{\"dbName\":\"resolution_runs\",\"fields\":[{\"name\":\"id\",\"dbName\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ResolutionStatus\",\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trigger\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"RunTrigger\",\"default\":\"MANUAL\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chain\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lookbackDays\",\"dbName\":\"lookback_days\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"addressCount\",\"dbName\":\"address_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entityCount\",\"dbName\":\"entity_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"linkCount\",\"dbName\":\"link_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"durationMs\",\"dbName\":\"duration_ms\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"error\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startedAt\",\"dbName\":\"started_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"finishedAt\",\"dbName\":\"finished_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"AddressEmbedding\":{\"dbName\":\"address_embeddings\",\"fields\":[{\"name\":\"id\",\"dbName\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chain\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dim\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vector\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Float[] embedding stored as JSON (no pgvector dependency in the MVP).\"},{\"name\":\"model\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"chain\",\"address\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"chain\",\"address\"]}],\"isGenerated\":false},\"NlQuery\":{\"dbName\":\"nl_queries\",\"fields\":[{\"name\":\"id\",\"dbName\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orgId\",\"dbName\":\"org_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"question\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"NlQueryStatus\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metric\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"plan\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rowCount\",\"dbName\":\"row_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"latencyMs\",\"dbName\":\"latency_ms\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"error\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"EntityStatus\":{\"values\":[{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"MERGED\",\"dbName\":null,\"documentation\":\"folded into another entity by a later run\"}],\"dbName\":null},\"ResolutionStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"RUNNING\",\"dbName\":null},{\"name\":\"SUCCEEDED\",\"dbName\":null},{\"name\":\"FAILED\",\"dbName\":null}],\"dbName\":null},\"RunTrigger\":{\"values\":[{\"name\":\"MANUAL\",\"dbName\":null},{\"name\":\"SCHEDULE\",\"dbName\":null}],\"dbName\":null},\"NlQueryStatus\":{\"values\":[{\"name\":\"PLANNED\",\"dbName\":null,\"documentation\":\"mapped to a plan but not executed\"},{\"name\":\"EXECUTED\",\"dbName\":null,\"documentation\":\"plan executed against the semantic layer\"},{\"name\":\"UNSUPPORTED\",\"dbName\":null,\"documentation\":\"could not be mapped to an allowlisted metric\"},{\"name\":\"FAILED\",\"dbName\":null,\"documentation\":\"execution error\"}],\"dbName\":null}},\"types\":{}}")
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

