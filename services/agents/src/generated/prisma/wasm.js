
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

exports.Prisma.AgentScalarFieldEnum = {
  id: 'id',
  ownerId: 'ownerId',
  ownerKind: 'ownerKind',
  orgId: 'orgId',
  name: 'name',
  status: 'status',
  metadata: 'metadata',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AgentSpendingPolicyScalarFieldEnum = {
  id: 'id',
  agentId: 'agentId',
  perTxCapMinor: 'perTxCapMinor',
  dailyCapMinor: 'dailyCapMinor',
  monthlyCapMinor: 'monthlyCapMinor',
  destinationAllowlist: 'destinationAllowlist',
  approvalThresholdMinor: 'approvalThresholdMinor',
  requiredApprovers: 'requiredApprovers',
  currency: 'currency',
  version: 'version',
  updatedAt: 'updatedAt'
};

exports.Prisma.AgentReasoningLogScalarFieldEnum = {
  id: 'id',
  agentId: 'agentId',
  intentId: 'intentId',
  traceId: 'traceId',
  summary: 'summary',
  steps: 'steps',
  createdAt: 'createdAt'
};

exports.Prisma.SpendApprovalRequestScalarFieldEnum = {
  id: 'id',
  agentId: 'agentId',
  intentId: 'intentId',
  amountMinor: 'amountMinor',
  destination: 'destination',
  approvalCount: 'approvalCount',
  requiredApprovers: 'requiredApprovers',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SpendApprovalVoteScalarFieldEnum = {
  id: 'id',
  requestId: 'requestId',
  approverId: 'approverId',
  createdAt: 'createdAt'
};

exports.Prisma.AgentServiceScalarFieldEnum = {
  id: 'id',
  agentId: 'agentId',
  name: 'name',
  description: 'description',
  priceMinor: 'priceMinor',
  currency: 'currency',
  capability: 'capability',
  status: 'status',
  createdAt: 'createdAt'
};

exports.Prisma.AgentSubscriptionScalarFieldEnum = {
  id: 'id',
  serviceId: 'serviceId',
  subscriberAgentId: 'subscriberAgentId',
  status: 'status',
  renewAt: 'renewAt',
  intentId: 'intentId',
  createdAt: 'createdAt'
};

exports.Prisma.AgentMarketplaceListingScalarFieldEnum = {
  id: 'id',
  serviceId: 'serviceId',
  tags: 'tags',
  ratingBps: 'ratingBps',
  visible: 'visible',
  onChainId: 'onChainId',
  createdAt: 'createdAt'
};

exports.Prisma.AgentInvoiceScalarFieldEnum = {
  id: 'id',
  agentId: 'agentId',
  payerAgentId: 'payerAgentId',
  amountMinor: 'amountMinor',
  currency: 'currency',
  status: 'status',
  intentId: 'intentId',
  memo: 'memo',
  createdAt: 'createdAt'
};

exports.Prisma.UsageMeterScalarFieldEnum = {
  id: 'id',
  agentId: 'agentId',
  serviceId: 'serviceId',
  units: 'units',
  amountMinor: 'amountMinor',
  currency: 'currency',
  periodStart: 'periodStart',
  periodEnd: 'periodEnd',
  settled: 'settled',
  intentId: 'intentId',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
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
exports.OutboxStatus = exports.$Enums.OutboxStatus = {
  PENDING: 'PENDING',
  PUBLISHED: 'PUBLISHED',
  FAILED: 'FAILED'
};

exports.OwnerKind = exports.$Enums.OwnerKind = {
  USER: 'USER',
  BUSINESS: 'BUSINESS'
};

exports.AgentStatus = exports.$Enums.AgentStatus = {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  ARCHIVED: 'ARCHIVED'
};

exports.SpendApprovalStatus = exports.$Enums.SpendApprovalStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED'
};

exports.AgentServiceStatus = exports.$Enums.AgentServiceStatus = {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  ARCHIVED: 'ARCHIVED'
};

exports.SubscriptionStatus = exports.$Enums.SubscriptionStatus = {
  ACTIVE: 'ACTIVE',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED'
};

exports.AgentInvoiceStatus = exports.$Enums.AgentInvoiceStatus = {
  OPEN: 'OPEN',
  PAID: 'PAID',
  VOID: 'VOID'
};

exports.Prisma.ModelName = {
  EventOutbox: 'EventOutbox',
  Agent: 'Agent',
  AgentSpendingPolicy: 'AgentSpendingPolicy',
  AgentReasoningLog: 'AgentReasoningLog',
  SpendApprovalRequest: 'SpendApprovalRequest',
  SpendApprovalVote: 'SpendApprovalVote',
  AgentService: 'AgentService',
  AgentSubscription: 'AgentSubscription',
  AgentMarketplaceListing: 'AgentMarketplaceListing',
  AgentInvoice: 'AgentInvoice',
  UsageMeter: 'UsageMeter'
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
