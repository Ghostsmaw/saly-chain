
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

exports.Prisma.DatashareScalarFieldEnum = {
  id: 'id',
  orgId: 'orgId',
  name: 'name',
  description: 'description',
  status: 'status',
  datasetId: 'datasetId',
  params: 'params',
  policy: 'policy',
  destination: 'destination',
  destinationConfig: 'destinationConfig',
  format: 'format',
  schedule: 'schedule',
  runCount: 'runCount',
  lastRunAt: 'lastRunAt',
  lastSuccessAt: 'lastSuccessAt',
  lastRunStatus: 'lastRunStatus',
  lastRowCount: 'lastRowCount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ShareRunScalarFieldEnum = {
  id: 'id',
  shareId: 'shareId',
  status: 'status',
  trigger: 'trigger',
  rowCount: 'rowCount',
  byteCount: 'byteCount',
  location: 'location',
  format: 'format',
  durationMs: 'durationMs',
  error: 'error',
  startedAt: 'startedAt',
  finishedAt: 'finishedAt',
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
exports.DatashareStatus = exports.$Enums.DatashareStatus = {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED'
};

exports.DatashareDestination = exports.$Enums.DatashareDestination = {
  S3: 'S3',
  SNOWFLAKE: 'SNOWFLAKE',
  BIGQUERY: 'BIGQUERY',
  DATABRICKS: 'DATABRICKS'
};

exports.DatashareFormat = exports.$Enums.DatashareFormat = {
  CSV: 'CSV',
  JSON: 'JSON',
  PARQUET: 'PARQUET'
};

exports.ShareRunStatus = exports.$Enums.ShareRunStatus = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED'
};

exports.RunTrigger = exports.$Enums.RunTrigger = {
  MANUAL: 'MANUAL',
  SCHEDULE: 'SCHEDULE'
};

exports.Prisma.ModelName = {
  Datashare: 'Datashare',
  ShareRun: 'ShareRun'
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
      "value": "/Users/ghost/Downloads/SalyChain/services/analytics-datashares/src/generated/prisma",
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
    "sourceFilePath": "/Users/ghost/Downloads/SalyChain/services/analytics-datashares/prisma/schema.prisma",
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
  "inlineSchema": "// =============================================================================\n// SalyChain Datashares Service — Prisma schema (B7)\n//\n// Saly Datashares lets a partner subscribe to a *curated, governed* dataset and\n// have it materialized on a schedule into a destination they control — an object\n// store (S3/MinIO) today, warehouse-native shares (Snowflake/BigQuery/Databricks)\n// when enabled. Two models:\n//\n//   Datashare  — an org's subscription to a named curated dataset, with the\n//                dataset parameters, an access/redaction policy (column\n//                masking/drop/hash + row filters), a destination + its config,\n//                an output format, and an optional cron schedule.\n//   ShareRun   — one materialization of a datashare: query → policy → serialize\n//                → export. Append-only audit trail with row/byte counts, the\n//                resulting object location, and timing/error metadata.\n//\n// Unlike Datastreams (push, at-least-once, per-event), Datashares is pull/batch:\n// each run produces a single governed extract. Runs are idempotent per run id;\n// a scheduled run for a period can be re-driven safely (it overwrites its own\n// object key namespace).\n// =============================================================================\n\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nenum DatashareStatus {\n  ACTIVE\n  PAUSED\n}\n\nenum DatashareDestination {\n  S3 /// object-store drop (CSV/JSON/Parquet) — implemented\n  SNOWFLAKE /// Snowflake Secure Share — config-validated, requires driver+creds\n  BIGQUERY /// BigQuery Analytics Hub — config-validated, requires driver+creds\n  DATABRICKS /// Databricks Delta Share — config-validated, requires driver+creds\n}\n\nenum DatashareFormat {\n  CSV\n  JSON\n  PARQUET\n}\n\nenum ShareRunStatus {\n  PENDING /// queued, not yet started\n  RUNNING /// worker is materializing\n  SUCCEEDED\n  FAILED\n}\n\nenum RunTrigger {\n  MANUAL /// operator/API triggered a one-off run\n  SCHEDULE /// produced by the cron job scheduler\n}\n\nmodel Datashare {\n  id          String          @id @map(\"id\")\n  orgId       String          @map(\"org_id\")\n  name        String\n  description String?\n  status      DatashareStatus @default(ACTIVE)\n\n  /// Curated dataset id (allowlisted in named-datasets.ts).\n  datasetId String @map(\"dataset_id\")\n  /// Validated dataset parameters (e.g. chain, lookback days, limit).\n  params    Json   @default(\"{}\")\n  /// Access/redaction policy (validated by the AccessPolicy zod schema).\n  policy    Json   @default(\"{}\")\n\n  destination       DatashareDestination @default(S3)\n  /// Destination connection config (bucket/prefix, or warehouse coordinates).\n  destinationConfig Json                 @default(\"{}\") @map(\"destination_config\")\n  format            DatashareFormat      @default(JSON)\n\n  /// Optional cron pattern (e.g. \"0 * * * *\"). Null ⇒ manual-only.\n  schedule String?\n\n  // ── Stats / health ────────────────────────────────────────────────────────\n  runCount      BigInt          @default(0) @map(\"run_count\")\n  lastRunAt     DateTime?       @map(\"last_run_at\")\n  lastSuccessAt DateTime?       @map(\"last_success_at\")\n  lastRunStatus ShareRunStatus? @map(\"last_run_status\")\n  lastRowCount  Int?            @map(\"last_row_count\")\n\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  updatedAt DateTime @updatedAt @map(\"updated_at\")\n\n  runs ShareRun[]\n\n  @@index([orgId, status])\n  @@index([status, schedule])\n  @@map(\"datashares\")\n}\n\nmodel ShareRun {\n  id      String         @id @map(\"id\")\n  shareId String         @map(\"share_id\")\n  status  ShareRunStatus @default(PENDING)\n  trigger RunTrigger     @default(MANUAL)\n\n  rowCount   Int?            @map(\"row_count\")\n  byteCount  Int?            @map(\"byte_count\")\n  /// Resulting object URI (s3://…) or warehouse share reference.\n  location   String?\n  format     DatashareFormat\n  durationMs Int?            @map(\"duration_ms\")\n  error      String?\n\n  startedAt  DateTime? @map(\"started_at\")\n  finishedAt DateTime? @map(\"finished_at\")\n  createdAt  DateTime  @default(now()) @map(\"created_at\")\n\n  share Datashare @relation(fields: [shareId], references: [id], onDelete: Cascade)\n\n  @@index([shareId, createdAt])\n  @@index([status])\n  @@map(\"share_runs\")\n}\n",
  "inlineSchemaHash": "39b5882100fde21e1d5ed11eeddb23d76b12ce34607b3b250086d9235b25c521",
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

config.runtimeDataModel = JSON.parse("{\"models\":{\"Datashare\":{\"dbName\":\"datashares\",\"fields\":[{\"name\":\"id\",\"dbName\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orgId\",\"dbName\":\"org_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DatashareStatus\",\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"datasetId\",\"dbName\":\"dataset_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Curated dataset id (allowlisted in named-datasets.ts).\"},{\"name\":\"params\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Validated dataset parameters (e.g. chain, lookback days, limit).\"},{\"name\":\"policy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Access/redaction policy (validated by the AccessPolicy zod schema).\"},{\"name\":\"destination\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DatashareDestination\",\"default\":\"S3\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"destinationConfig\",\"dbName\":\"destination_config\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{}\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Destination connection config (bucket/prefix, or warehouse coordinates).\"},{\"name\":\"format\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DatashareFormat\",\"default\":\"JSON\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"schedule\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Optional cron pattern (e.g. \\\"0 * * * *\\\"). Null ⇒ manual-only.\"},{\"name\":\"runCount\",\"dbName\":\"run_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastRunAt\",\"dbName\":\"last_run_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastSuccessAt\",\"dbName\":\"last_success_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastRunStatus\",\"dbName\":\"last_run_status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ShareRunStatus\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastRowCount\",\"dbName\":\"last_row_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"runs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ShareRun\",\"relationName\":\"DatashareToShareRun\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ShareRun\":{\"dbName\":\"share_runs\",\"fields\":[{\"name\":\"id\",\"dbName\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"shareId\",\"dbName\":\"share_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ShareRunStatus\",\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trigger\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"RunTrigger\",\"default\":\"MANUAL\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rowCount\",\"dbName\":\"row_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"byteCount\",\"dbName\":\"byte_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"location\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Resulting object URI (s3://…) or warehouse share reference.\"},{\"name\":\"format\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DatashareFormat\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"durationMs\",\"dbName\":\"duration_ms\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"error\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startedAt\",\"dbName\":\"started_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"finishedAt\",\"dbName\":\"finished_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"share\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Datashare\",\"relationName\":\"DatashareToShareRun\",\"relationFromFields\":[\"shareId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"DatashareStatus\":{\"values\":[{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"PAUSED\",\"dbName\":null}],\"dbName\":null},\"DatashareDestination\":{\"values\":[{\"name\":\"S3\",\"dbName\":null,\"documentation\":\"object-store drop (CSV/JSON/Parquet) — implemented\"},{\"name\":\"SNOWFLAKE\",\"dbName\":null,\"documentation\":\"Snowflake Secure Share — config-validated, requires driver+creds\"},{\"name\":\"BIGQUERY\",\"dbName\":null,\"documentation\":\"BigQuery Analytics Hub — config-validated, requires driver+creds\"},{\"name\":\"DATABRICKS\",\"dbName\":null,\"documentation\":\"Databricks Delta Share — config-validated, requires driver+creds\"}],\"dbName\":null},\"DatashareFormat\":{\"values\":[{\"name\":\"CSV\",\"dbName\":null},{\"name\":\"JSON\",\"dbName\":null},{\"name\":\"PARQUET\",\"dbName\":null}],\"dbName\":null},\"ShareRunStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null,\"documentation\":\"queued, not yet started\"},{\"name\":\"RUNNING\",\"dbName\":null,\"documentation\":\"worker is materializing\"},{\"name\":\"SUCCEEDED\",\"dbName\":null},{\"name\":\"FAILED\",\"dbName\":null}],\"dbName\":null},\"RunTrigger\":{\"values\":[{\"name\":\"MANUAL\",\"dbName\":null,\"documentation\":\"operator/API triggered a one-off run\"},{\"name\":\"SCHEDULE\",\"dbName\":null,\"documentation\":\"produced by the cron job scheduler\"}],\"dbName\":null}},\"types\":{}}")
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
