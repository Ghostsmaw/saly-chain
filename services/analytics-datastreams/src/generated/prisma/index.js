
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

exports.Prisma.StreamScalarFieldEnum = {
  id: 'id',
  orgId: 'orgId',
  name: 'name',
  description: 'description',
  status: 'status',
  sink: 'sink',
  filter: 'filter',
  url: 'url',
  signingSecret: 'signingSecret',
  signingKeyId: 'signingKeyId',
  kafkaTopic: 'kafkaTopic',
  consecutiveFailures: 'consecutiveFailures',
  disabledAt: 'disabledAt',
  matchedTotal: 'matchedTotal',
  lastMatchedAt: 'lastMatchedAt',
  lastDeliveredAt: 'lastDeliveredAt',
  lastAttemptedAt: 'lastAttemptedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StreamDeliveryScalarFieldEnum = {
  id: 'id',
  streamId: 'streamId',
  subject: 'subject',
  eventId: 'eventId',
  payload: 'payload',
  attempts: 'attempts',
  status: 'status',
  lastStatusCode: 'lastStatusCode',
  lastResponseExcerpt: 'lastResponseExcerpt',
  lastLatencyMs: 'lastLatencyMs',
  lastError: 'lastError',
  nextAttemptAt: 'nextAttemptAt',
  succeededAt: 'succeededAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StreamDeadLetterScalarFieldEnum = {
  id: 'id',
  deliveryId: 'deliveryId',
  streamId: 'streamId',
  subject: 'subject',
  eventId: 'eventId',
  payload: 'payload',
  attempts: 'attempts',
  lastStatusCode: 'lastStatusCode',
  lastError: 'lastError',
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

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.StreamStatus = exports.$Enums.StreamStatus = {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  DISABLED: 'DISABLED'
};

exports.StreamSink = exports.$Enums.StreamSink = {
  WEBHOOK: 'WEBHOOK',
  KAFKA: 'KAFKA',
  WEBSOCKET: 'WEBSOCKET'
};

exports.StreamDeliveryStatus = exports.$Enums.StreamDeliveryStatus = {
  PENDING: 'PENDING',
  IN_FLIGHT: 'IN_FLIGHT',
  SUCCEEDED: 'SUCCEEDED',
  RETRYABLE: 'RETRYABLE',
  FAILED: 'FAILED',
  DEAD: 'DEAD'
};

exports.Prisma.ModelName = {
  Stream: 'Stream',
  StreamDelivery: 'StreamDelivery',
  StreamDeadLetter: 'StreamDeadLetter'
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
      "value": "/Users/ghost/Downloads/SalyChain/services/analytics-datastreams/src/generated/prisma",
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
    "sourceFilePath": "/Users/ghost/Downloads/SalyChain/services/analytics-datastreams/prisma/schema.prisma",
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
  "inlineSchema": "// =============================================================================\n// SalyChain Datastreams Service — Prisma schema (B6)\n//\n// Saly Datastreams lets a partner subscribe to a *filtered* slice of the live\n// event spine and have matching events pushed to a destination (sink) of their\n// choosing. Three core models:\n//\n//   Stream             — an org's filtered subscription. Owns a filter spec\n//                        (chain/asset/address/amount/event-type predicates), a\n//                        sink (WEBHOOK | KAFKA), sink config, a rotatable HMAC\n//                        signing secret, and health counters.\n//   StreamDelivery     — one attempt to push one matched event to one stream's\n//                        sink. Append-only; idempotent on (streamId, eventId).\n//   StreamDeadLetter   — resting place for deliveries that exhausted retries,\n//                        with enough metadata to replay.\n//\n// Same outbox-style guarantee as the webhooks service: every matched event is\n// materialized as a StreamDelivery row up-front, then a BullMQ worker drains it\n// with HMAC signing + exponential backoff + dead-letter on exhaustion. Delivery\n// is at-least-once; the (streamId, eventId) unique constraint dedupes redelivery\n// from the at-least-once NATS consumer.\n// =============================================================================\n\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nenum StreamStatus {\n  ACTIVE\n  PAUSED\n  DISABLED /// auto-disabled after too many consecutive delivery failures\n}\n\nenum StreamSink {\n  WEBHOOK /// HMAC-signed HTTPS POST (retry + DLQ)\n  KAFKA /// produce to a managed Kafka/Redpanda topic (enterprise volume)\n  WEBSOCKET /// best-effort live fan-out to connected dashboard clients (no DLQ)\n}\n\nenum StreamDeliveryStatus {\n  PENDING /// queued, not yet attempted\n  IN_FLIGHT /// worker has it\n  SUCCEEDED /// sink accepted the event\n  RETRYABLE /// transient failure — will be retried with backoff\n  FAILED /// permanent caller error (e.g. 4xx) — will not retry\n  DEAD /// exhausted attempts → StreamDeadLetter row created\n}\n\nmodel Stream {\n  id          String       @id @map(\"id\")\n  orgId       String       @map(\"org_id\")\n  name        String\n  description String?\n  status      StreamStatus @default(ACTIVE)\n  sink        StreamSink   @default(WEBHOOK)\n\n  /// Filter predicate (validated by the StreamFilter zod schema in the app\n  /// layer before persistence). Stored as JSON so the predicate surface can\n  /// evolve without a migration.\n  filter Json @default(\"{}\")\n\n  // ── Webhook sink config ──────────────────────────────────────────────────\n  url           String?\n  /// Hex-encoded HMAC signing secret. The subscriber verifies every delivery\n  /// using this secret. Rotation issues a new secret + key id.\n  signingSecret String  @map(\"signing_secret\")\n  signingKeyId  String  @map(\"signing_key_id\")\n\n  // ── Kafka sink config ────────────────────────────────────────────────────\n  kafkaTopic String? @map(\"kafka_topic\")\n\n  // ── Health / stats ───────────────────────────────────────────────────────\n  consecutiveFailures Int       @default(0) @map(\"consecutive_failures\")\n  disabledAt          DateTime? @map(\"disabled_at\")\n  matchedTotal        BigInt    @default(0) @map(\"matched_total\")\n  lastMatchedAt       DateTime? @map(\"last_matched_at\")\n  lastDeliveredAt     DateTime? @map(\"last_delivered_at\")\n  lastAttemptedAt     DateTime? @map(\"last_attempted_at\")\n\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  deliveries StreamDelivery[]\n\n  @@index([orgId, status])\n  @@index([status])\n  @@map(\"streams\")\n}\n\nmodel StreamDelivery {\n  id       String               @id @map(\"id\")\n  streamId String               @map(\"stream_id\")\n  /// NATS subject (e.g. `salychain.chain.base.transfer_observed`).\n  subject  String\n  /// Idempotency key — `event_id` from the source event.\n  eventId  String               @map(\"event_id\")\n  payload  Json\n  attempts Int                  @default(0)\n  status   StreamDeliveryStatus @default(PENDING)\n\n  lastStatusCode      Int?      @map(\"last_status_code\")\n  lastResponseExcerpt String?   @map(\"last_response_excerpt\")\n  lastLatencyMs       Int?      @map(\"last_latency_ms\")\n  lastError           String?   @map(\"last_error\")\n  nextAttemptAt       DateTime? @map(\"next_attempt_at\")\n  succeededAt         DateTime? @map(\"succeeded_at\")\n  createdAt           DateTime  @default(now()) @map(\"created_at\")\n  updatedAt           DateTime  @updatedAt @map(\"updated_at\")\n\n  stream Stream @relation(fields: [streamId], references: [id], onDelete: Cascade)\n\n  @@unique([streamId, eventId])\n  @@index([status, nextAttemptAt])\n  @@index([streamId, createdAt])\n  @@map(\"stream_deliveries\")\n}\n\nmodel StreamDeadLetter {\n  id             String   @id @map(\"id\")\n  deliveryId     String   @unique @map(\"delivery_id\")\n  streamId       String   @map(\"stream_id\")\n  subject        String\n  eventId        String   @map(\"event_id\")\n  payload        Json\n  attempts       Int\n  lastStatusCode Int?     @map(\"last_status_code\")\n  lastError      String?  @map(\"last_error\")\n  createdAt      DateTime @default(now()) @map(\"created_at\")\n\n  @@index([streamId, createdAt])\n  @@map(\"stream_dead_letters\")\n}\n",
  "inlineSchemaHash": "ccf71f2cc22731c7f6befa20456d76d336a46dad7ad830d3277366af895aa4b4",
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

config.runtimeDataModel = JSON.parse("{\"models\":{\"Stream\":{\"dbName\":\"streams\",\"fields\":[{\"name\":\"id\",\"dbName\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orgId\",\"dbName\":\"org_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"StreamStatus\",\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sink\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"StreamSink\",\"default\":\"WEBHOOK\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"filter\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Filter predicate (validated by the StreamFilter zod schema in the app\\\\nlayer before persistence). Stored as JSON so the predicate surface can\\\\nevolve without a migration.\"},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"signingSecret\",\"dbName\":\"signing_secret\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Hex-encoded HMAC signing secret. The subscriber verifies every delivery\\\\nusing this secret. Rotation issues a new secret + key id.\"},{\"name\":\"signingKeyId\",\"dbName\":\"signing_key_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"kafkaTopic\",\"dbName\":\"kafka_topic\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"consecutiveFailures\",\"dbName\":\"consecutive_failures\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"disabledAt\",\"dbName\":\"disabled_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"matchedTotal\",\"dbName\":\"matched_total\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastMatchedAt\",\"dbName\":\"last_matched_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastDeliveredAt\",\"dbName\":\"last_delivered_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastAttemptedAt\",\"dbName\":\"last_attempted_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"deliveries\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"StreamDelivery\",\"relationName\":\"StreamToStreamDelivery\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"StreamDelivery\":{\"dbName\":\"stream_deliveries\",\"fields\":[{\"name\":\"id\",\"dbName\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"streamId\",\"dbName\":\"stream_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subject\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"NATS subject (e.g. `salychain.chain.base.transfer_observed`).\"},{\"name\":\"eventId\",\"dbName\":\"event_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Idempotency key — `event_id` from the source event.\"},{\"name\":\"payload\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attempts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"StreamDeliveryStatus\",\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastStatusCode\",\"dbName\":\"last_status_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastResponseExcerpt\",\"dbName\":\"last_response_excerpt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastLatencyMs\",\"dbName\":\"last_latency_ms\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastError\",\"dbName\":\"last_error\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nextAttemptAt\",\"dbName\":\"next_attempt_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"succeededAt\",\"dbName\":\"succeeded_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"stream\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Stream\",\"relationName\":\"StreamToStreamDelivery\",\"relationFromFields\":[\"streamId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"streamId\",\"eventId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"streamId\",\"eventId\"]}],\"isGenerated\":false},\"StreamDeadLetter\":{\"dbName\":\"stream_dead_letters\",\"fields\":[{\"name\":\"id\",\"dbName\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deliveryId\",\"dbName\":\"delivery_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"streamId\",\"dbName\":\"stream_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subject\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventId\",\"dbName\":\"event_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payload\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attempts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastStatusCode\",\"dbName\":\"last_status_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastError\",\"dbName\":\"last_error\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"StreamStatus\":{\"values\":[{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"PAUSED\",\"dbName\":null},{\"name\":\"DISABLED\",\"dbName\":null,\"documentation\":\"auto-disabled after too many consecutive delivery failures\"}],\"dbName\":null},\"StreamSink\":{\"values\":[{\"name\":\"WEBHOOK\",\"dbName\":null,\"documentation\":\"HMAC-signed HTTPS POST (retry + DLQ)\"},{\"name\":\"KAFKA\",\"dbName\":null,\"documentation\":\"produce to a managed Kafka/Redpanda topic (enterprise volume)\"},{\"name\":\"WEBSOCKET\",\"dbName\":null,\"documentation\":\"best-effort live fan-out to connected dashboard clients (no DLQ)\"}],\"dbName\":null},\"StreamDeliveryStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null,\"documentation\":\"queued, not yet attempted\"},{\"name\":\"IN_FLIGHT\",\"dbName\":null,\"documentation\":\"worker has it\"},{\"name\":\"SUCCEEDED\",\"dbName\":null,\"documentation\":\"sink accepted the event\"},{\"name\":\"RETRYABLE\",\"dbName\":null,\"documentation\":\"transient failure — will be retried with backoff\"},{\"name\":\"FAILED\",\"dbName\":null,\"documentation\":\"permanent caller error (e.g. 4xx) — will not retry\"},{\"name\":\"DEAD\",\"dbName\":null,\"documentation\":\"exhausted attempts → StreamDeadLetter row created\"}],\"dbName\":null}},\"types\":{}}")
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
