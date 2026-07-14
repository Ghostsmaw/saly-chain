
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

exports.Prisma.ActorProfileScalarFieldEnum = {
  externalRef: 'externalRef',
  rolling24hUsdMinor: 'rolling24hUsdMinor',
  rolling24hCount: 'rolling24hCount',
  lifetimeCount: 'lifetimeCount',
  meanTicketUsdMinor: 'meanTicketUsdMinor',
  stddevTicketUsdMinor: 'stddevTicketUsdMinor',
  lastSeenAt: 'lastSeenAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CounterpartyEdgeScalarFieldEnum = {
  id: 'id',
  actorExternalRef: 'actorExternalRef',
  counterpartyRef: 'counterpartyRef',
  firstSeenAt: 'firstSeenAt',
  lastSeenAt: 'lastSeenAt',
  txCount: 'txCount',
  totalUsdMinor: 'totalUsdMinor'
};

exports.Prisma.RiskAssessmentScalarFieldEnum = {
  id: 'id',
  intentId: 'intentId',
  transactionId: 'transactionId',
  actorExternalRef: 'actorExternalRef',
  counterpartyRef: 'counterpartyRef',
  amountUsdMinor: 'amountUsdMinor',
  components: 'components',
  finalScore: 'finalScore',
  decision: 'decision',
  reasons: 'reasons',
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
exports.RiskDecision = exports.$Enums.RiskDecision = {
  ALLOW: 'ALLOW',
  REVIEW: 'REVIEW',
  BLOCK: 'BLOCK'
};

exports.Prisma.ModelName = {
  ActorProfile: 'ActorProfile',
  CounterpartyEdge: 'CounterpartyEdge',
  RiskAssessment: 'RiskAssessment'
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
      "value": "/Users/ghost/Downloads/SalyChain/services/risk/src/generated/prisma",
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
    "sourceFilePath": "/Users/ghost/Downloads/SalyChain/services/risk/prisma/schema.prisma",
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
  "inlineSchema": "// =============================================================================\n// SalyChain Risk Service — Prisma schema\n//\n//   * `ActorProfile` is the rolling profile per actor (user / business / agent):\n//     historical baselines, current 24h windows, last-seen counters.\n//   * `RiskAssessment` is the immutable audit log of every score the service\n//     has produced, with the input snapshot.\n//   * `CounterpartyEdge` tracks per-actor-to-counterparty history (first-time\n//     transfers, repeat patterns).\n// =============================================================================\n\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nenum RiskDecision {\n  ALLOW\n  REVIEW\n  BLOCK\n}\n\nmodel ActorProfile {\n  externalRef          String    @id @map(\"external_ref\")\n  /// Total observed in the rolling 24h window across all currencies, normalized to\n  /// USD-cents using the snapshot rate. Source of truth lives in `RiskAssessment`.\n  rolling24hUsdMinor   BigInt    @default(0) @map(\"rolling_24h_usd_minor\")\n  /// Rolling 24h transaction count.\n  rolling24hCount      Int       @default(0) @map(\"rolling_24h_count\")\n  /// Lifetime tx count; informs \"new user\" boost.\n  lifetimeCount        Int       @default(0) @map(\"lifetime_count\")\n  /// Mean ticket size in USD-cents (EMA).\n  meanTicketUsdMinor   BigInt    @default(0) @map(\"mean_ticket_usd_minor\")\n  /// Standard-deviation of ticket size in USD-cents (online EMA approximation).\n  stddevTicketUsdMinor BigInt    @default(0) @map(\"stddev_ticket_usd_minor\")\n  lastSeenAt           DateTime? @map(\"last_seen_at\")\n  updatedAt            DateTime  @updatedAt @map(\"updated_at\")\n\n  @@map(\"actor_profiles\")\n}\n\nmodel CounterpartyEdge {\n  id               String   @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  actorExternalRef String   @map(\"actor_external_ref\")\n  counterpartyRef  String   @map(\"counterparty_ref\")\n  firstSeenAt      DateTime @default(now()) @map(\"first_seen_at\")\n  lastSeenAt       DateTime @updatedAt @map(\"last_seen_at\")\n  txCount          Int      @default(0) @map(\"tx_count\")\n  totalUsdMinor    BigInt   @default(0) @map(\"total_usd_minor\")\n\n  @@unique([actorExternalRef, counterpartyRef])\n  @@map(\"counterparty_edges\")\n}\n\nmodel RiskAssessment {\n  id               String       @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  intentId         String?      @map(\"intent_id\")\n  transactionId    String?      @map(\"transaction_id\")\n  actorExternalRef String       @map(\"actor_external_ref\")\n  counterpartyRef  String?      @map(\"counterparty_ref\")\n  amountUsdMinor   BigInt       @map(\"amount_usd_minor\")\n  /// Component scores (each 0..100) merged into the final score for transparency.\n  components       Json\n  finalScore       Int          @map(\"final_score\")\n  decision         RiskDecision\n  reasons          String[]\n  createdAt        DateTime     @default(now()) @map(\"created_at\")\n\n  @@index([actorExternalRef, createdAt])\n  @@index([decision, createdAt])\n  @@map(\"risk_assessments\")\n}\n",
  "inlineSchemaHash": "754d9872ac1899481959a0b810b932537f4bce10677352202f6a62aeb14737a7",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"ActorProfile\":{\"dbName\":\"actor_profiles\",\"fields\":[{\"name\":\"externalRef\",\"dbName\":\"external_ref\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rolling24hUsdMinor\",\"dbName\":\"rolling_24h_usd_minor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Total observed in the rolling 24h window across all currencies, normalized to\\\\nUSD-cents using the snapshot rate. Source of truth lives in `RiskAssessment`.\"},{\"name\":\"rolling24hCount\",\"dbName\":\"rolling_24h_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Rolling 24h transaction count.\"},{\"name\":\"lifetimeCount\",\"dbName\":\"lifetime_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Lifetime tx count; informs \\\"new user\\\" boost.\"},{\"name\":\"meanTicketUsdMinor\",\"dbName\":\"mean_ticket_usd_minor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Mean ticket size in USD-cents (EMA).\"},{\"name\":\"stddevTicketUsdMinor\",\"dbName\":\"stddev_ticket_usd_minor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Standard-deviation of ticket size in USD-cents (online EMA approximation).\"},{\"name\":\"lastSeenAt\",\"dbName\":\"last_seen_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CounterpartyEdge\":{\"dbName\":\"counterparty_edges\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"actorExternalRef\",\"dbName\":\"actor_external_ref\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"counterpartyRef\",\"dbName\":\"counterparty_ref\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"firstSeenAt\",\"dbName\":\"first_seen_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastSeenAt\",\"dbName\":\"last_seen_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"txCount\",\"dbName\":\"tx_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalUsdMinor\",\"dbName\":\"total_usd_minor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"actorExternalRef\",\"counterpartyRef\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"actorExternalRef\",\"counterpartyRef\"]}],\"isGenerated\":false},\"RiskAssessment\":{\"dbName\":\"risk_assessments\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"intentId\",\"dbName\":\"intent_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactionId\",\"dbName\":\"transaction_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"actorExternalRef\",\"dbName\":\"actor_external_ref\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"counterpartyRef\",\"dbName\":\"counterparty_ref\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amountUsdMinor\",\"dbName\":\"amount_usd_minor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"components\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Component scores (each 0..100) merged into the final score for transparency.\"},{\"name\":\"finalScore\",\"dbName\":\"final_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"decision\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RiskDecision\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reasons\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"RiskDecision\":{\"values\":[{\"name\":\"ALLOW\",\"dbName\":null},{\"name\":\"REVIEW\",\"dbName\":null},{\"name\":\"BLOCK\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
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

