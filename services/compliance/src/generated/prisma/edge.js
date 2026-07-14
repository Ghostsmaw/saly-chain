
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

exports.Prisma.ComplianceSubjectScalarFieldEnum = {
  id: 'id',
  externalRef: 'externalRef',
  kind: 'kind',
  displayName: 'displayName',
  countryCode: 'countryCode',
  tier: 'tier',
  tierUpdatedAt: 'tierUpdatedAt',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ScreeningResultScalarFieldEnum = {
  id: 'id',
  subjectId: 'subjectId',
  targetIdentifier: 'targetIdentifier',
  category: 'category',
  decision: 'decision',
  provider: 'provider',
  score: 'score',
  matchedListIds: 'matchedListIds',
  details: 'details',
  createdAt: 'createdAt'
};

exports.Prisma.ComplianceCaseScalarFieldEnum = {
  id: 'id',
  subjectId: 'subjectId',
  intentId: 'intentId',
  transactionId: 'transactionId',
  status: 'status',
  priority: 'priority',
  summary: 'summary',
  notes: 'notes',
  assignedTo: 'assignedTo',
  resolvedAt: 'resolvedAt',
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
exports.SubjectKind = exports.$Enums.SubjectKind = {
  USER: 'USER',
  BUSINESS: 'BUSINESS',
  COUNTERPARTY: 'COUNTERPARTY',
  AGENT: 'AGENT'
};

exports.VerificationTier = exports.$Enums.VerificationTier = {
  TIER_0: 'TIER_0',
  TIER_1: 'TIER_1',
  TIER_2: 'TIER_2',
  TIER_3: 'TIER_3',
  TIER_REJECTED: 'TIER_REJECTED'
};

exports.ScreeningCategory = exports.$Enums.ScreeningCategory = {
  SANCTIONS: 'SANCTIONS',
  PEP: 'PEP',
  ADVERSE_MEDIA: 'ADVERSE_MEDIA',
  ADDRESS_RISK: 'ADDRESS_RISK',
  COUNTRY_RISK: 'COUNTRY_RISK'
};

exports.ScreeningDecision = exports.$Enums.ScreeningDecision = {
  ALLOW: 'ALLOW',
  REVIEW: 'REVIEW',
  BLOCK: 'BLOCK'
};

exports.CaseStatus = exports.$Enums.CaseStatus = {
  OPEN: 'OPEN',
  IN_REVIEW: 'IN_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  ESCALATED: 'ESCALATED'
};

exports.CasePriority = exports.$Enums.CasePriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

exports.Prisma.ModelName = {
  ComplianceSubject: 'ComplianceSubject',
  ScreeningResult: 'ScreeningResult',
  ComplianceCase: 'ComplianceCase'
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
      "value": "/Users/ghost/Downloads/SalyChain/services/compliance/src/generated/prisma",
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
    "sourceFilePath": "/Users/ghost/Downloads/SalyChain/services/compliance/prisma/schema.prisma",
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
  "inlineSchema": "// =============================================================================\n// SalyChain Compliance Service — Prisma schema\n//\n//   * `ComplianceSubject` is the per-actor verification record (KYC/KYB tier,\n//     country of residence, etc.).\n//   * `ScreeningResult` records every sanctions / PEP / adverse-media check we\n//     run; immutable, retained for regulator audit.\n//   * `ComplianceCase` is the open work queue for human reviewers when\n//     screening yields a flag.\n// =============================================================================\n\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nenum SubjectKind {\n  USER\n  BUSINESS\n  COUNTERPARTY\n  AGENT\n}\n\nenum VerificationTier {\n  TIER_0 /// Unverified — minimal limits\n  TIER_1 /// Email + phone verified\n  TIER_2 /// Government ID verified\n  TIER_3 /// Full KYC/KYB + proof of address\n  TIER_REJECTED\n}\n\nenum ScreeningDecision {\n  ALLOW\n  REVIEW\n  BLOCK\n}\n\nenum ScreeningCategory {\n  SANCTIONS\n  PEP\n  ADVERSE_MEDIA\n  ADDRESS_RISK\n  COUNTRY_RISK\n}\n\nenum CaseStatus {\n  OPEN\n  IN_REVIEW\n  APPROVED\n  REJECTED\n  ESCALATED\n}\n\nenum CasePriority {\n  LOW\n  MEDIUM\n  HIGH\n  CRITICAL\n}\n\nmodel ComplianceSubject {\n  id            String           @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  externalRef   String           @unique @map(\"external_ref\")\n  kind          SubjectKind\n  displayName   String?          @map(\"display_name\")\n  countryCode   String?          @map(\"country_code\") @db.Char(2)\n  tier          VerificationTier @default(TIER_0)\n  tierUpdatedAt DateTime?        @map(\"tier_updated_at\")\n  metadata      Json?\n  createdAt     DateTime         @default(now()) @map(\"created_at\")\n  updatedAt     DateTime         @updatedAt @map(\"updated_at\")\n\n  screenings ScreeningResult[]\n  cases      ComplianceCase[]\n\n  @@index([kind, tier])\n  @@map(\"compliance_subjects\")\n}\n\nmodel ScreeningResult {\n  id               String            @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  subjectId        String?           @map(\"subject_id\") @db.Uuid\n  /// Free-form target identifier when no subject exists (e.g. raw chain address).\n  targetIdentifier String            @map(\"target_identifier\")\n  category         ScreeningCategory\n  decision         ScreeningDecision\n  /// Provider that produced this result (`embedded`, `chainalysis`, etc.).\n  provider         String\n  score            Int               @default(0) /// 0..100, higher = riskier\n  matchedListIds   String[]          @default([]) @map(\"matched_list_ids\")\n  details          Json?\n  createdAt        DateTime          @default(now()) @map(\"created_at\")\n\n  subject ComplianceSubject? @relation(fields: [subjectId], references: [id], onDelete: SetNull)\n\n  @@index([subjectId, createdAt])\n  @@index([category, decision])\n  @@map(\"screening_results\")\n}\n\nmodel ComplianceCase {\n  id            String       @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  subjectId     String?      @map(\"subject_id\") @db.Uuid\n  intentId      String?      @map(\"intent_id\")\n  transactionId String?      @map(\"transaction_id\")\n  status        CaseStatus   @default(OPEN)\n  priority      CasePriority @default(MEDIUM)\n  /// Free-form summary set by the screening service or analyst.\n  summary       String\n  /// Append-only review notes (each note is `{ author, body, at }`).\n  notes         Json         @default(\"[]\")\n  assignedTo    String?      @map(\"assigned_to\")\n  resolvedAt    DateTime?    @map(\"resolved_at\")\n  createdAt     DateTime     @default(now()) @map(\"created_at\")\n  updatedAt     DateTime     @updatedAt @map(\"updated_at\")\n\n  subject ComplianceSubject? @relation(fields: [subjectId], references: [id], onDelete: SetNull)\n\n  @@index([status, priority, createdAt])\n  @@map(\"compliance_cases\")\n}\n",
  "inlineSchemaHash": "b0ceec928569dca299edd5a054dec5e3f7aa7deb0c30fd4f397d276b5df9c3a9",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"ComplianceSubject\":{\"dbName\":\"compliance_subjects\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"externalRef\",\"dbName\":\"external_ref\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"kind\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SubjectKind\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"displayName\",\"dbName\":\"display_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryCode\",\"dbName\":\"country_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tier\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"VerificationTier\",\"default\":\"TIER_0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tierUpdatedAt\",\"dbName\":\"tier_updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"screenings\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ScreeningResult\",\"relationName\":\"ComplianceSubjectToScreeningResult\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cases\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ComplianceCase\",\"relationName\":\"ComplianceCaseToComplianceSubject\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ScreeningResult\":{\"dbName\":\"screening_results\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subjectId\",\"dbName\":\"subject_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"targetIdentifier\",\"dbName\":\"target_identifier\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Free-form target identifier when no subject exists (e.g. raw chain address).\"},{\"name\":\"category\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ScreeningCategory\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"decision\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ScreeningDecision\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Provider that produced this result (`embedded`, `chainalysis`, etc.).\"},{\"name\":\"score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"0..100, higher = riskier\"},{\"name\":\"matchedListIds\",\"dbName\":\"matched_list_ids\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"details\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subject\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ComplianceSubject\",\"relationName\":\"ComplianceSubjectToScreeningResult\",\"relationFromFields\":[\"subjectId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ComplianceCase\":{\"dbName\":\"compliance_cases\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subjectId\",\"dbName\":\"subject_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"intentId\",\"dbName\":\"intent_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactionId\",\"dbName\":\"transaction_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"CaseStatus\",\"default\":\"OPEN\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"priority\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"CasePriority\",\"default\":\"MEDIUM\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"summary\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Free-form summary set by the screening service or analyst.\"},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"[]\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Append-only review notes (each note is `{ author, body, at }`).\"},{\"name\":\"assignedTo\",\"dbName\":\"assigned_to\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resolvedAt\",\"dbName\":\"resolved_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"subject\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ComplianceSubject\",\"relationName\":\"ComplianceCaseToComplianceSubject\",\"relationFromFields\":[\"subjectId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"SubjectKind\":{\"values\":[{\"name\":\"USER\",\"dbName\":null},{\"name\":\"BUSINESS\",\"dbName\":null},{\"name\":\"COUNTERPARTY\",\"dbName\":null},{\"name\":\"AGENT\",\"dbName\":null}],\"dbName\":null},\"VerificationTier\":{\"values\":[{\"name\":\"TIER_0\",\"dbName\":null,\"documentation\":\"Unverified — minimal limits\"},{\"name\":\"TIER_1\",\"dbName\":null,\"documentation\":\"Email + phone verified\"},{\"name\":\"TIER_2\",\"dbName\":null,\"documentation\":\"Government ID verified\"},{\"name\":\"TIER_3\",\"dbName\":null,\"documentation\":\"Full KYC/KYB + proof of address\"},{\"name\":\"TIER_REJECTED\",\"dbName\":null}],\"dbName\":null},\"ScreeningDecision\":{\"values\":[{\"name\":\"ALLOW\",\"dbName\":null},{\"name\":\"REVIEW\",\"dbName\":null},{\"name\":\"BLOCK\",\"dbName\":null}],\"dbName\":null},\"ScreeningCategory\":{\"values\":[{\"name\":\"SANCTIONS\",\"dbName\":null},{\"name\":\"PEP\",\"dbName\":null},{\"name\":\"ADVERSE_MEDIA\",\"dbName\":null},{\"name\":\"ADDRESS_RISK\",\"dbName\":null},{\"name\":\"COUNTRY_RISK\",\"dbName\":null}],\"dbName\":null},\"CaseStatus\":{\"values\":[{\"name\":\"OPEN\",\"dbName\":null},{\"name\":\"IN_REVIEW\",\"dbName\":null},{\"name\":\"APPROVED\",\"dbName\":null},{\"name\":\"REJECTED\",\"dbName\":null},{\"name\":\"ESCALATED\",\"dbName\":null}],\"dbName\":null},\"CasePriority\":{\"values\":[{\"name\":\"LOW\",\"dbName\":null},{\"name\":\"MEDIUM\",\"dbName\":null},{\"name\":\"HIGH\",\"dbName\":null},{\"name\":\"CRITICAL\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
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

