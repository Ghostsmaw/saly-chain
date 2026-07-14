
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

exports.Prisma.SignerKeyScalarFieldEnum = {
  id: 'id',
  keyRef: 'keyRef',
  chain: 'chain',
  publicAddress: 'publicAddress',
  wrappedPrivateKey: 'wrappedPrivateKey',
  wrappingKeyRef: 'wrappingKeyRef',
  status: 'status',
  label: 'label',
  createdAt: 'createdAt',
  rotatedAt: 'rotatedAt'
};

exports.Prisma.SignRequestScalarFieldEnum = {
  id: 'id',
  idempotencyKey: 'idempotencyKey',
  signerKeyId: 'signerKeyId',
  chain: 'chain',
  walletId: 'walletId',
  policyContext: 'policyContext',
  unsignedTxHash: 'unsignedTxHash',
  outcome: 'outcome',
  reasonCode: 'reasonCode',
  reasonMessage: 'reasonMessage',
  signedTxHash: 'signedTxHash',
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
exports.SignerChain = exports.$Enums.SignerChain = {
  BASE: 'BASE',
  XRPL: 'XRPL',
  ETHEREUM: 'ETHEREUM',
  POLYGON: 'POLYGON',
  SALY_L3: 'SALY_L3'
};

exports.SignerKeyStatus = exports.$Enums.SignerKeyStatus = {
  ACTIVE: 'ACTIVE',
  ROTATING: 'ROTATING',
  ARCHIVED: 'ARCHIVED'
};

exports.SignRequestOutcome = exports.$Enums.SignRequestOutcome = {
  SIGNED: 'SIGNED',
  POLICY_DENIED: 'POLICY_DENIED',
  ERROR: 'ERROR'
};

exports.Prisma.ModelName = {
  SignerKey: 'SignerKey',
  SignRequest: 'SignRequest'
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
      "value": "/Users/ghost/Downloads/SalyChain/services/signer/src/generated/prisma",
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
    "sourceFilePath": "/Users/ghost/Downloads/SalyChain/services/signer/prisma/schema.prisma",
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
  "inlineSchema": "// =============================================================================\n// SalyChain Signer Service — Prisma schema\n//\n// This schema is intentionally minimal:\n//\n//   * `SignerKey` stores ONLY the wrapped (KMS-encrypted) private key blob,\n//     the public address, the chain, and metadata. Plaintext key material\n//     never crosses this boundary.\n//   * `SignRequest` is the audit log: every signing call, including its\n//     idempotency key, policy snapshot, and outcome.\n// =============================================================================\n\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nenum SignerChain {\n  BASE\n  XRPL\n  ETHEREUM\n  POLYGON\n  SALY_L3\n}\n\nenum SignerKeyStatus {\n  ACTIVE\n  ROTATING\n  ARCHIVED\n}\n\nenum SignRequestOutcome {\n  SIGNED\n  POLICY_DENIED\n  ERROR\n}\n\nmodel SignerKey {\n  id                String          @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  keyRef            String          @unique @map(\"key_ref\")\n  chain             SignerChain\n  publicAddress     String          @map(\"public_address\")\n  /// Hex-encoded ciphertext of the private key under the configured KMS.\n  /// Format is provider-specific (local AES-256-GCM bundles iv|ciphertext|tag).\n  wrappedPrivateKey Bytes           @map(\"wrapped_private_key\")\n  /// Reference to the wrapping key (KMS key id / version) so we can rotate.\n  wrappingKeyRef    String          @map(\"wrapping_key_ref\")\n  status            SignerKeyStatus @default(ACTIVE)\n  label             String?\n  createdAt         DateTime        @default(now()) @map(\"created_at\")\n  rotatedAt         DateTime?       @map(\"rotated_at\")\n\n  signRequests SignRequest[]\n\n  @@unique([chain, publicAddress])\n  @@index([status])\n  @@map(\"signer_keys\")\n}\n\nmodel SignRequest {\n  id             String             @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  idempotencyKey String             @unique @map(\"idempotency_key\")\n  signerKeyId    String             @map(\"signer_key_id\") @db.Uuid\n  chain          SignerChain\n  walletId       String?            @map(\"wallet_id\")\n  /// Snapshot of the policy context evaluated for this request.\n  policyContext  Json               @map(\"policy_context\")\n  unsignedTxHash String             @map(\"unsigned_tx_hash\")\n  outcome        SignRequestOutcome\n  reasonCode     String?            @map(\"reason_code\")\n  reasonMessage  String?            @map(\"reason_message\")\n  signedTxHash   String?            @map(\"signed_tx_hash\")\n  createdAt      DateTime           @default(now()) @map(\"created_at\")\n\n  signerKey SignerKey @relation(fields: [signerKeyId], references: [id])\n\n  @@index([signerKeyId, createdAt])\n  @@index([outcome, createdAt])\n  @@map(\"sign_requests\")\n}\n",
  "inlineSchemaHash": "764b9c5c7ad59cc5dc8eb31e15d89029ebaef5ce5fd04d49052ba3f00c7679b9",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"SignerKey\":{\"dbName\":\"signer_keys\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"keyRef\",\"dbName\":\"key_ref\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chain\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SignerChain\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"publicAddress\",\"dbName\":\"public_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"wrappedPrivateKey\",\"dbName\":\"wrapped_private_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Hex-encoded ciphertext of the private key under the configured KMS.\\\\nFormat is provider-specific (local AES-256-GCM bundles iv|ciphertext|tag).\"},{\"name\":\"wrappingKeyRef\",\"dbName\":\"wrapping_key_ref\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Reference to the wrapping key (KMS key id / version) so we can rotate.\"},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"SignerKeyStatus\",\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"label\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rotatedAt\",\"dbName\":\"rotated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"signRequests\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SignRequest\",\"relationName\":\"SignRequestToSignerKey\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"chain\",\"publicAddress\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"chain\",\"publicAddress\"]}],\"isGenerated\":false},\"SignRequest\":{\"dbName\":\"sign_requests\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"idempotencyKey\",\"dbName\":\"idempotency_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"signerKeyId\",\"dbName\":\"signer_key_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chain\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SignerChain\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"walletId\",\"dbName\":\"wallet_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"policyContext\",\"dbName\":\"policy_context\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Snapshot of the policy context evaluated for this request.\"},{\"name\":\"unsignedTxHash\",\"dbName\":\"unsigned_tx_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"outcome\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SignRequestOutcome\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reasonCode\",\"dbName\":\"reason_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reasonMessage\",\"dbName\":\"reason_message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"signedTxHash\",\"dbName\":\"signed_tx_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"signerKey\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SignerKey\",\"relationName\":\"SignRequestToSignerKey\",\"relationFromFields\":[\"signerKeyId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"SignerChain\":{\"values\":[{\"name\":\"BASE\",\"dbName\":null},{\"name\":\"XRPL\",\"dbName\":null},{\"name\":\"ETHEREUM\",\"dbName\":null},{\"name\":\"POLYGON\",\"dbName\":null},{\"name\":\"SALY_L3\",\"dbName\":null}],\"dbName\":null},\"SignerKeyStatus\":{\"values\":[{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"ROTATING\",\"dbName\":null},{\"name\":\"ARCHIVED\",\"dbName\":null}],\"dbName\":null},\"SignRequestOutcome\":{\"values\":[{\"name\":\"SIGNED\",\"dbName\":null},{\"name\":\"POLICY_DENIED\",\"dbName\":null},{\"name\":\"ERROR\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
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

