
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model EventOutbox
 * 
 */
export type EventOutbox = $Result.DefaultSelection<Prisma.$EventOutboxPayload>
/**
 * Model Agent
 * 
 */
export type Agent = $Result.DefaultSelection<Prisma.$AgentPayload>
/**
 * Model AgentSpendingPolicy
 * 
 */
export type AgentSpendingPolicy = $Result.DefaultSelection<Prisma.$AgentSpendingPolicyPayload>
/**
 * Model AgentReasoningLog
 * 
 */
export type AgentReasoningLog = $Result.DefaultSelection<Prisma.$AgentReasoningLogPayload>
/**
 * Model SpendApprovalRequest
 * 
 */
export type SpendApprovalRequest = $Result.DefaultSelection<Prisma.$SpendApprovalRequestPayload>
/**
 * Model SpendApprovalVote
 * 
 */
export type SpendApprovalVote = $Result.DefaultSelection<Prisma.$SpendApprovalVotePayload>
/**
 * Model AgentService
 * 
 */
export type AgentService = $Result.DefaultSelection<Prisma.$AgentServicePayload>
/**
 * Model AgentSubscription
 * 
 */
export type AgentSubscription = $Result.DefaultSelection<Prisma.$AgentSubscriptionPayload>
/**
 * Model AgentMarketplaceListing
 * 
 */
export type AgentMarketplaceListing = $Result.DefaultSelection<Prisma.$AgentMarketplaceListingPayload>
/**
 * Model AgentInvoice
 * 
 */
export type AgentInvoice = $Result.DefaultSelection<Prisma.$AgentInvoicePayload>
/**
 * Model UsageMeter
 * 
 */
export type UsageMeter = $Result.DefaultSelection<Prisma.$UsageMeterPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OutboxStatus: {
  PENDING: 'PENDING',
  PUBLISHED: 'PUBLISHED',
  FAILED: 'FAILED'
};

export type OutboxStatus = (typeof OutboxStatus)[keyof typeof OutboxStatus]


export const OwnerKind: {
  USER: 'USER',
  BUSINESS: 'BUSINESS'
};

export type OwnerKind = (typeof OwnerKind)[keyof typeof OwnerKind]


export const AgentStatus: {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  ARCHIVED: 'ARCHIVED'
};

export type AgentStatus = (typeof AgentStatus)[keyof typeof AgentStatus]


export const SpendApprovalStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED'
};

export type SpendApprovalStatus = (typeof SpendApprovalStatus)[keyof typeof SpendApprovalStatus]


export const AgentServiceStatus: {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  ARCHIVED: 'ARCHIVED'
};

export type AgentServiceStatus = (typeof AgentServiceStatus)[keyof typeof AgentServiceStatus]


export const SubscriptionStatus: {
  ACTIVE: 'ACTIVE',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED'
};

export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]


export const AgentInvoiceStatus: {
  OPEN: 'OPEN',
  PAID: 'PAID',
  VOID: 'VOID'
};

export type AgentInvoiceStatus = (typeof AgentInvoiceStatus)[keyof typeof AgentInvoiceStatus]

}

export type OutboxStatus = $Enums.OutboxStatus

export const OutboxStatus: typeof $Enums.OutboxStatus

export type OwnerKind = $Enums.OwnerKind

export const OwnerKind: typeof $Enums.OwnerKind

export type AgentStatus = $Enums.AgentStatus

export const AgentStatus: typeof $Enums.AgentStatus

export type SpendApprovalStatus = $Enums.SpendApprovalStatus

export const SpendApprovalStatus: typeof $Enums.SpendApprovalStatus

export type AgentServiceStatus = $Enums.AgentServiceStatus

export const AgentServiceStatus: typeof $Enums.AgentServiceStatus

export type SubscriptionStatus = $Enums.SubscriptionStatus

export const SubscriptionStatus: typeof $Enums.SubscriptionStatus

export type AgentInvoiceStatus = $Enums.AgentInvoiceStatus

export const AgentInvoiceStatus: typeof $Enums.AgentInvoiceStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more EventOutboxes
 * const eventOutboxes = await prisma.eventOutbox.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more EventOutboxes
   * const eventOutboxes = await prisma.eventOutbox.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.eventOutbox`: Exposes CRUD operations for the **EventOutbox** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventOutboxes
    * const eventOutboxes = await prisma.eventOutbox.findMany()
    * ```
    */
  get eventOutbox(): Prisma.EventOutboxDelegate<ExtArgs>;

  /**
   * `prisma.agent`: Exposes CRUD operations for the **Agent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agents
    * const agents = await prisma.agent.findMany()
    * ```
    */
  get agent(): Prisma.AgentDelegate<ExtArgs>;

  /**
   * `prisma.agentSpendingPolicy`: Exposes CRUD operations for the **AgentSpendingPolicy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentSpendingPolicies
    * const agentSpendingPolicies = await prisma.agentSpendingPolicy.findMany()
    * ```
    */
  get agentSpendingPolicy(): Prisma.AgentSpendingPolicyDelegate<ExtArgs>;

  /**
   * `prisma.agentReasoningLog`: Exposes CRUD operations for the **AgentReasoningLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentReasoningLogs
    * const agentReasoningLogs = await prisma.agentReasoningLog.findMany()
    * ```
    */
  get agentReasoningLog(): Prisma.AgentReasoningLogDelegate<ExtArgs>;

  /**
   * `prisma.spendApprovalRequest`: Exposes CRUD operations for the **SpendApprovalRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SpendApprovalRequests
    * const spendApprovalRequests = await prisma.spendApprovalRequest.findMany()
    * ```
    */
  get spendApprovalRequest(): Prisma.SpendApprovalRequestDelegate<ExtArgs>;

  /**
   * `prisma.spendApprovalVote`: Exposes CRUD operations for the **SpendApprovalVote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SpendApprovalVotes
    * const spendApprovalVotes = await prisma.spendApprovalVote.findMany()
    * ```
    */
  get spendApprovalVote(): Prisma.SpendApprovalVoteDelegate<ExtArgs>;

  /**
   * `prisma.agentService`: Exposes CRUD operations for the **AgentService** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentServices
    * const agentServices = await prisma.agentService.findMany()
    * ```
    */
  get agentService(): Prisma.AgentServiceDelegate<ExtArgs>;

  /**
   * `prisma.agentSubscription`: Exposes CRUD operations for the **AgentSubscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentSubscriptions
    * const agentSubscriptions = await prisma.agentSubscription.findMany()
    * ```
    */
  get agentSubscription(): Prisma.AgentSubscriptionDelegate<ExtArgs>;

  /**
   * `prisma.agentMarketplaceListing`: Exposes CRUD operations for the **AgentMarketplaceListing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentMarketplaceListings
    * const agentMarketplaceListings = await prisma.agentMarketplaceListing.findMany()
    * ```
    */
  get agentMarketplaceListing(): Prisma.AgentMarketplaceListingDelegate<ExtArgs>;

  /**
   * `prisma.agentInvoice`: Exposes CRUD operations for the **AgentInvoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentInvoices
    * const agentInvoices = await prisma.agentInvoice.findMany()
    * ```
    */
  get agentInvoice(): Prisma.AgentInvoiceDelegate<ExtArgs>;

  /**
   * `prisma.usageMeter`: Exposes CRUD operations for the **UsageMeter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsageMeters
    * const usageMeters = await prisma.usageMeter.findMany()
    * ```
    */
  get usageMeter(): Prisma.UsageMeterDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "eventOutbox" | "agent" | "agentSpendingPolicy" | "agentReasoningLog" | "spendApprovalRequest" | "spendApprovalVote" | "agentService" | "agentSubscription" | "agentMarketplaceListing" | "agentInvoice" | "usageMeter"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      EventOutbox: {
        payload: Prisma.$EventOutboxPayload<ExtArgs>
        fields: Prisma.EventOutboxFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventOutboxFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventOutboxPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventOutboxFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventOutboxPayload>
          }
          findFirst: {
            args: Prisma.EventOutboxFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventOutboxPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventOutboxFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventOutboxPayload>
          }
          findMany: {
            args: Prisma.EventOutboxFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventOutboxPayload>[]
          }
          create: {
            args: Prisma.EventOutboxCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventOutboxPayload>
          }
          createMany: {
            args: Prisma.EventOutboxCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventOutboxCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventOutboxPayload>[]
          }
          delete: {
            args: Prisma.EventOutboxDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventOutboxPayload>
          }
          update: {
            args: Prisma.EventOutboxUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventOutboxPayload>
          }
          deleteMany: {
            args: Prisma.EventOutboxDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventOutboxUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EventOutboxUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventOutboxPayload>
          }
          aggregate: {
            args: Prisma.EventOutboxAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventOutbox>
          }
          groupBy: {
            args: Prisma.EventOutboxGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventOutboxGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventOutboxCountArgs<ExtArgs>
            result: $Utils.Optional<EventOutboxCountAggregateOutputType> | number
          }
        }
      }
      Agent: {
        payload: Prisma.$AgentPayload<ExtArgs>
        fields: Prisma.AgentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findFirst: {
            args: Prisma.AgentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findMany: {
            args: Prisma.AgentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          create: {
            args: Prisma.AgentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          createMany: {
            args: Prisma.AgentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          delete: {
            args: Prisma.AgentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          update: {
            args: Prisma.AgentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          deleteMany: {
            args: Prisma.AgentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AgentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          aggregate: {
            args: Prisma.AgentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent>
          }
          groupBy: {
            args: Prisma.AgentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentCountArgs<ExtArgs>
            result: $Utils.Optional<AgentCountAggregateOutputType> | number
          }
        }
      }
      AgentSpendingPolicy: {
        payload: Prisma.$AgentSpendingPolicyPayload<ExtArgs>
        fields: Prisma.AgentSpendingPolicyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentSpendingPolicyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSpendingPolicyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentSpendingPolicyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSpendingPolicyPayload>
          }
          findFirst: {
            args: Prisma.AgentSpendingPolicyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSpendingPolicyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentSpendingPolicyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSpendingPolicyPayload>
          }
          findMany: {
            args: Prisma.AgentSpendingPolicyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSpendingPolicyPayload>[]
          }
          create: {
            args: Prisma.AgentSpendingPolicyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSpendingPolicyPayload>
          }
          createMany: {
            args: Prisma.AgentSpendingPolicyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentSpendingPolicyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSpendingPolicyPayload>[]
          }
          delete: {
            args: Prisma.AgentSpendingPolicyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSpendingPolicyPayload>
          }
          update: {
            args: Prisma.AgentSpendingPolicyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSpendingPolicyPayload>
          }
          deleteMany: {
            args: Prisma.AgentSpendingPolicyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentSpendingPolicyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AgentSpendingPolicyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSpendingPolicyPayload>
          }
          aggregate: {
            args: Prisma.AgentSpendingPolicyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentSpendingPolicy>
          }
          groupBy: {
            args: Prisma.AgentSpendingPolicyGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentSpendingPolicyGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentSpendingPolicyCountArgs<ExtArgs>
            result: $Utils.Optional<AgentSpendingPolicyCountAggregateOutputType> | number
          }
        }
      }
      AgentReasoningLog: {
        payload: Prisma.$AgentReasoningLogPayload<ExtArgs>
        fields: Prisma.AgentReasoningLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentReasoningLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentReasoningLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentReasoningLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentReasoningLogPayload>
          }
          findFirst: {
            args: Prisma.AgentReasoningLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentReasoningLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentReasoningLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentReasoningLogPayload>
          }
          findMany: {
            args: Prisma.AgentReasoningLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentReasoningLogPayload>[]
          }
          create: {
            args: Prisma.AgentReasoningLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentReasoningLogPayload>
          }
          createMany: {
            args: Prisma.AgentReasoningLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentReasoningLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentReasoningLogPayload>[]
          }
          delete: {
            args: Prisma.AgentReasoningLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentReasoningLogPayload>
          }
          update: {
            args: Prisma.AgentReasoningLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentReasoningLogPayload>
          }
          deleteMany: {
            args: Prisma.AgentReasoningLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentReasoningLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AgentReasoningLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentReasoningLogPayload>
          }
          aggregate: {
            args: Prisma.AgentReasoningLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentReasoningLog>
          }
          groupBy: {
            args: Prisma.AgentReasoningLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentReasoningLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentReasoningLogCountArgs<ExtArgs>
            result: $Utils.Optional<AgentReasoningLogCountAggregateOutputType> | number
          }
        }
      }
      SpendApprovalRequest: {
        payload: Prisma.$SpendApprovalRequestPayload<ExtArgs>
        fields: Prisma.SpendApprovalRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpendApprovalRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpendApprovalRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalRequestPayload>
          }
          findFirst: {
            args: Prisma.SpendApprovalRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpendApprovalRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalRequestPayload>
          }
          findMany: {
            args: Prisma.SpendApprovalRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalRequestPayload>[]
          }
          create: {
            args: Prisma.SpendApprovalRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalRequestPayload>
          }
          createMany: {
            args: Prisma.SpendApprovalRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SpendApprovalRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalRequestPayload>[]
          }
          delete: {
            args: Prisma.SpendApprovalRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalRequestPayload>
          }
          update: {
            args: Prisma.SpendApprovalRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalRequestPayload>
          }
          deleteMany: {
            args: Prisma.SpendApprovalRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpendApprovalRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SpendApprovalRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalRequestPayload>
          }
          aggregate: {
            args: Prisma.SpendApprovalRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpendApprovalRequest>
          }
          groupBy: {
            args: Prisma.SpendApprovalRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpendApprovalRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpendApprovalRequestCountArgs<ExtArgs>
            result: $Utils.Optional<SpendApprovalRequestCountAggregateOutputType> | number
          }
        }
      }
      SpendApprovalVote: {
        payload: Prisma.$SpendApprovalVotePayload<ExtArgs>
        fields: Prisma.SpendApprovalVoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpendApprovalVoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalVotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpendApprovalVoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalVotePayload>
          }
          findFirst: {
            args: Prisma.SpendApprovalVoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalVotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpendApprovalVoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalVotePayload>
          }
          findMany: {
            args: Prisma.SpendApprovalVoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalVotePayload>[]
          }
          create: {
            args: Prisma.SpendApprovalVoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalVotePayload>
          }
          createMany: {
            args: Prisma.SpendApprovalVoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SpendApprovalVoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalVotePayload>[]
          }
          delete: {
            args: Prisma.SpendApprovalVoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalVotePayload>
          }
          update: {
            args: Prisma.SpendApprovalVoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalVotePayload>
          }
          deleteMany: {
            args: Prisma.SpendApprovalVoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpendApprovalVoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SpendApprovalVoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpendApprovalVotePayload>
          }
          aggregate: {
            args: Prisma.SpendApprovalVoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpendApprovalVote>
          }
          groupBy: {
            args: Prisma.SpendApprovalVoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpendApprovalVoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpendApprovalVoteCountArgs<ExtArgs>
            result: $Utils.Optional<SpendApprovalVoteCountAggregateOutputType> | number
          }
        }
      }
      AgentService: {
        payload: Prisma.$AgentServicePayload<ExtArgs>
        fields: Prisma.AgentServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentServicePayload>
          }
          findFirst: {
            args: Prisma.AgentServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentServicePayload>
          }
          findMany: {
            args: Prisma.AgentServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentServicePayload>[]
          }
          create: {
            args: Prisma.AgentServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentServicePayload>
          }
          createMany: {
            args: Prisma.AgentServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentServicePayload>[]
          }
          delete: {
            args: Prisma.AgentServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentServicePayload>
          }
          update: {
            args: Prisma.AgentServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentServicePayload>
          }
          deleteMany: {
            args: Prisma.AgentServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AgentServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentServicePayload>
          }
          aggregate: {
            args: Prisma.AgentServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentService>
          }
          groupBy: {
            args: Prisma.AgentServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentServiceCountArgs<ExtArgs>
            result: $Utils.Optional<AgentServiceCountAggregateOutputType> | number
          }
        }
      }
      AgentSubscription: {
        payload: Prisma.$AgentSubscriptionPayload<ExtArgs>
        fields: Prisma.AgentSubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentSubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentSubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSubscriptionPayload>
          }
          findFirst: {
            args: Prisma.AgentSubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentSubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSubscriptionPayload>
          }
          findMany: {
            args: Prisma.AgentSubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSubscriptionPayload>[]
          }
          create: {
            args: Prisma.AgentSubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSubscriptionPayload>
          }
          createMany: {
            args: Prisma.AgentSubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentSubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSubscriptionPayload>[]
          }
          delete: {
            args: Prisma.AgentSubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSubscriptionPayload>
          }
          update: {
            args: Prisma.AgentSubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.AgentSubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentSubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AgentSubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentSubscriptionPayload>
          }
          aggregate: {
            args: Prisma.AgentSubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentSubscription>
          }
          groupBy: {
            args: Prisma.AgentSubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentSubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentSubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<AgentSubscriptionCountAggregateOutputType> | number
          }
        }
      }
      AgentMarketplaceListing: {
        payload: Prisma.$AgentMarketplaceListingPayload<ExtArgs>
        fields: Prisma.AgentMarketplaceListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentMarketplaceListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMarketplaceListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentMarketplaceListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMarketplaceListingPayload>
          }
          findFirst: {
            args: Prisma.AgentMarketplaceListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMarketplaceListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentMarketplaceListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMarketplaceListingPayload>
          }
          findMany: {
            args: Prisma.AgentMarketplaceListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMarketplaceListingPayload>[]
          }
          create: {
            args: Prisma.AgentMarketplaceListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMarketplaceListingPayload>
          }
          createMany: {
            args: Prisma.AgentMarketplaceListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentMarketplaceListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMarketplaceListingPayload>[]
          }
          delete: {
            args: Prisma.AgentMarketplaceListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMarketplaceListingPayload>
          }
          update: {
            args: Prisma.AgentMarketplaceListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMarketplaceListingPayload>
          }
          deleteMany: {
            args: Prisma.AgentMarketplaceListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentMarketplaceListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AgentMarketplaceListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMarketplaceListingPayload>
          }
          aggregate: {
            args: Prisma.AgentMarketplaceListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentMarketplaceListing>
          }
          groupBy: {
            args: Prisma.AgentMarketplaceListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentMarketplaceListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentMarketplaceListingCountArgs<ExtArgs>
            result: $Utils.Optional<AgentMarketplaceListingCountAggregateOutputType> | number
          }
        }
      }
      AgentInvoice: {
        payload: Prisma.$AgentInvoicePayload<ExtArgs>
        fields: Prisma.AgentInvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentInvoiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentInvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentInvoiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentInvoicePayload>
          }
          findFirst: {
            args: Prisma.AgentInvoiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentInvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentInvoiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentInvoicePayload>
          }
          findMany: {
            args: Prisma.AgentInvoiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentInvoicePayload>[]
          }
          create: {
            args: Prisma.AgentInvoiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentInvoicePayload>
          }
          createMany: {
            args: Prisma.AgentInvoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentInvoiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentInvoicePayload>[]
          }
          delete: {
            args: Prisma.AgentInvoiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentInvoicePayload>
          }
          update: {
            args: Prisma.AgentInvoiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentInvoicePayload>
          }
          deleteMany: {
            args: Prisma.AgentInvoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentInvoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AgentInvoiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentInvoicePayload>
          }
          aggregate: {
            args: Prisma.AgentInvoiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentInvoice>
          }
          groupBy: {
            args: Prisma.AgentInvoiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentInvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentInvoiceCountArgs<ExtArgs>
            result: $Utils.Optional<AgentInvoiceCountAggregateOutputType> | number
          }
        }
      }
      UsageMeter: {
        payload: Prisma.$UsageMeterPayload<ExtArgs>
        fields: Prisma.UsageMeterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsageMeterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMeterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsageMeterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMeterPayload>
          }
          findFirst: {
            args: Prisma.UsageMeterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMeterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsageMeterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMeterPayload>
          }
          findMany: {
            args: Prisma.UsageMeterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMeterPayload>[]
          }
          create: {
            args: Prisma.UsageMeterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMeterPayload>
          }
          createMany: {
            args: Prisma.UsageMeterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsageMeterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMeterPayload>[]
          }
          delete: {
            args: Prisma.UsageMeterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMeterPayload>
          }
          update: {
            args: Prisma.UsageMeterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMeterPayload>
          }
          deleteMany: {
            args: Prisma.UsageMeterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsageMeterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UsageMeterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageMeterPayload>
          }
          aggregate: {
            args: Prisma.UsageMeterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsageMeter>
          }
          groupBy: {
            args: Prisma.UsageMeterGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsageMeterGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsageMeterCountArgs<ExtArgs>
            result: $Utils.Optional<UsageMeterCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AgentCountOutputType
   */

  export type AgentCountOutputType = {
    reasoningLogs: number
    approvalRequests: number
    invoices: number
    services: number
  }

  export type AgentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reasoningLogs?: boolean | AgentCountOutputTypeCountReasoningLogsArgs
    approvalRequests?: boolean | AgentCountOutputTypeCountApprovalRequestsArgs
    invoices?: boolean | AgentCountOutputTypeCountInvoicesArgs
    services?: boolean | AgentCountOutputTypeCountServicesArgs
  }

  // Custom InputTypes
  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCountOutputType
     */
    select?: AgentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountReasoningLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentReasoningLogWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountApprovalRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpendApprovalRequestWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountInvoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentInvoiceWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentServiceWhereInput
  }


  /**
   * Count Type SpendApprovalRequestCountOutputType
   */

  export type SpendApprovalRequestCountOutputType = {
    votes: number
  }

  export type SpendApprovalRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    votes?: boolean | SpendApprovalRequestCountOutputTypeCountVotesArgs
  }

  // Custom InputTypes
  /**
   * SpendApprovalRequestCountOutputType without action
   */
  export type SpendApprovalRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalRequestCountOutputType
     */
    select?: SpendApprovalRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SpendApprovalRequestCountOutputType without action
   */
  export type SpendApprovalRequestCountOutputTypeCountVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpendApprovalVoteWhereInput
  }


  /**
   * Count Type AgentServiceCountOutputType
   */

  export type AgentServiceCountOutputType = {
    subscriptions: number
    listings: number
  }

  export type AgentServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | AgentServiceCountOutputTypeCountSubscriptionsArgs
    listings?: boolean | AgentServiceCountOutputTypeCountListingsArgs
  }

  // Custom InputTypes
  /**
   * AgentServiceCountOutputType without action
   */
  export type AgentServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentServiceCountOutputType
     */
    select?: AgentServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgentServiceCountOutputType without action
   */
  export type AgentServiceCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentSubscriptionWhereInput
  }

  /**
   * AgentServiceCountOutputType without action
   */
  export type AgentServiceCountOutputTypeCountListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentMarketplaceListingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model EventOutbox
   */

  export type AggregateEventOutbox = {
    _count: EventOutboxCountAggregateOutputType | null
    _avg: EventOutboxAvgAggregateOutputType | null
    _sum: EventOutboxSumAggregateOutputType | null
    _min: EventOutboxMinAggregateOutputType | null
    _max: EventOutboxMaxAggregateOutputType | null
  }

  export type EventOutboxAvgAggregateOutputType = {
    attempts: number | null
  }

  export type EventOutboxSumAggregateOutputType = {
    attempts: number | null
  }

  export type EventOutboxMinAggregateOutputType = {
    id: string | null
    eventId: string | null
    subject: string | null
    status: $Enums.OutboxStatus | null
    attempts: number | null
    lastError: string | null
    createdAt: Date | null
    publishedAt: Date | null
  }

  export type EventOutboxMaxAggregateOutputType = {
    id: string | null
    eventId: string | null
    subject: string | null
    status: $Enums.OutboxStatus | null
    attempts: number | null
    lastError: string | null
    createdAt: Date | null
    publishedAt: Date | null
  }

  export type EventOutboxCountAggregateOutputType = {
    id: number
    eventId: number
    subject: number
    payload: number
    status: number
    attempts: number
    lastError: number
    createdAt: number
    publishedAt: number
    _all: number
  }


  export type EventOutboxAvgAggregateInputType = {
    attempts?: true
  }

  export type EventOutboxSumAggregateInputType = {
    attempts?: true
  }

  export type EventOutboxMinAggregateInputType = {
    id?: true
    eventId?: true
    subject?: true
    status?: true
    attempts?: true
    lastError?: true
    createdAt?: true
    publishedAt?: true
  }

  export type EventOutboxMaxAggregateInputType = {
    id?: true
    eventId?: true
    subject?: true
    status?: true
    attempts?: true
    lastError?: true
    createdAt?: true
    publishedAt?: true
  }

  export type EventOutboxCountAggregateInputType = {
    id?: true
    eventId?: true
    subject?: true
    payload?: true
    status?: true
    attempts?: true
    lastError?: true
    createdAt?: true
    publishedAt?: true
    _all?: true
  }

  export type EventOutboxAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventOutbox to aggregate.
     */
    where?: EventOutboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventOutboxes to fetch.
     */
    orderBy?: EventOutboxOrderByWithRelationInput | EventOutboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventOutboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventOutboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventOutboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventOutboxes
    **/
    _count?: true | EventOutboxCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventOutboxAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventOutboxSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventOutboxMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventOutboxMaxAggregateInputType
  }

  export type GetEventOutboxAggregateType<T extends EventOutboxAggregateArgs> = {
        [P in keyof T & keyof AggregateEventOutbox]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventOutbox[P]>
      : GetScalarType<T[P], AggregateEventOutbox[P]>
  }




  export type EventOutboxGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventOutboxWhereInput
    orderBy?: EventOutboxOrderByWithAggregationInput | EventOutboxOrderByWithAggregationInput[]
    by: EventOutboxScalarFieldEnum[] | EventOutboxScalarFieldEnum
    having?: EventOutboxScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventOutboxCountAggregateInputType | true
    _avg?: EventOutboxAvgAggregateInputType
    _sum?: EventOutboxSumAggregateInputType
    _min?: EventOutboxMinAggregateInputType
    _max?: EventOutboxMaxAggregateInputType
  }

  export type EventOutboxGroupByOutputType = {
    id: string
    eventId: string
    subject: string
    payload: JsonValue
    status: $Enums.OutboxStatus
    attempts: number
    lastError: string | null
    createdAt: Date
    publishedAt: Date | null
    _count: EventOutboxCountAggregateOutputType | null
    _avg: EventOutboxAvgAggregateOutputType | null
    _sum: EventOutboxSumAggregateOutputType | null
    _min: EventOutboxMinAggregateOutputType | null
    _max: EventOutboxMaxAggregateOutputType | null
  }

  type GetEventOutboxGroupByPayload<T extends EventOutboxGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventOutboxGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventOutboxGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventOutboxGroupByOutputType[P]>
            : GetScalarType<T[P], EventOutboxGroupByOutputType[P]>
        }
      >
    >


  export type EventOutboxSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    subject?: boolean
    payload?: boolean
    status?: boolean
    attempts?: boolean
    lastError?: boolean
    createdAt?: boolean
    publishedAt?: boolean
  }, ExtArgs["result"]["eventOutbox"]>

  export type EventOutboxSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    subject?: boolean
    payload?: boolean
    status?: boolean
    attempts?: boolean
    lastError?: boolean
    createdAt?: boolean
    publishedAt?: boolean
  }, ExtArgs["result"]["eventOutbox"]>

  export type EventOutboxSelectScalar = {
    id?: boolean
    eventId?: boolean
    subject?: boolean
    payload?: boolean
    status?: boolean
    attempts?: boolean
    lastError?: boolean
    createdAt?: boolean
    publishedAt?: boolean
  }


  export type $EventOutboxPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventOutbox"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventId: string
      subject: string
      payload: Prisma.JsonValue
      status: $Enums.OutboxStatus
      attempts: number
      lastError: string | null
      createdAt: Date
      publishedAt: Date | null
    }, ExtArgs["result"]["eventOutbox"]>
    composites: {}
  }

  type EventOutboxGetPayload<S extends boolean | null | undefined | EventOutboxDefaultArgs> = $Result.GetResult<Prisma.$EventOutboxPayload, S>

  type EventOutboxCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EventOutboxFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EventOutboxCountAggregateInputType | true
    }

  export interface EventOutboxDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventOutbox'], meta: { name: 'EventOutbox' } }
    /**
     * Find zero or one EventOutbox that matches the filter.
     * @param {EventOutboxFindUniqueArgs} args - Arguments to find a EventOutbox
     * @example
     * // Get one EventOutbox
     * const eventOutbox = await prisma.eventOutbox.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventOutboxFindUniqueArgs>(args: SelectSubset<T, EventOutboxFindUniqueArgs<ExtArgs>>): Prisma__EventOutboxClient<$Result.GetResult<Prisma.$EventOutboxPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one EventOutbox that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EventOutboxFindUniqueOrThrowArgs} args - Arguments to find a EventOutbox
     * @example
     * // Get one EventOutbox
     * const eventOutbox = await prisma.eventOutbox.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventOutboxFindUniqueOrThrowArgs>(args: SelectSubset<T, EventOutboxFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventOutboxClient<$Result.GetResult<Prisma.$EventOutboxPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first EventOutbox that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventOutboxFindFirstArgs} args - Arguments to find a EventOutbox
     * @example
     * // Get one EventOutbox
     * const eventOutbox = await prisma.eventOutbox.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventOutboxFindFirstArgs>(args?: SelectSubset<T, EventOutboxFindFirstArgs<ExtArgs>>): Prisma__EventOutboxClient<$Result.GetResult<Prisma.$EventOutboxPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first EventOutbox that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventOutboxFindFirstOrThrowArgs} args - Arguments to find a EventOutbox
     * @example
     * // Get one EventOutbox
     * const eventOutbox = await prisma.eventOutbox.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventOutboxFindFirstOrThrowArgs>(args?: SelectSubset<T, EventOutboxFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventOutboxClient<$Result.GetResult<Prisma.$EventOutboxPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more EventOutboxes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventOutboxFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventOutboxes
     * const eventOutboxes = await prisma.eventOutbox.findMany()
     * 
     * // Get first 10 EventOutboxes
     * const eventOutboxes = await prisma.eventOutbox.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventOutboxWithIdOnly = await prisma.eventOutbox.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventOutboxFindManyArgs>(args?: SelectSubset<T, EventOutboxFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventOutboxPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a EventOutbox.
     * @param {EventOutboxCreateArgs} args - Arguments to create a EventOutbox.
     * @example
     * // Create one EventOutbox
     * const EventOutbox = await prisma.eventOutbox.create({
     *   data: {
     *     // ... data to create a EventOutbox
     *   }
     * })
     * 
     */
    create<T extends EventOutboxCreateArgs>(args: SelectSubset<T, EventOutboxCreateArgs<ExtArgs>>): Prisma__EventOutboxClient<$Result.GetResult<Prisma.$EventOutboxPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many EventOutboxes.
     * @param {EventOutboxCreateManyArgs} args - Arguments to create many EventOutboxes.
     * @example
     * // Create many EventOutboxes
     * const eventOutbox = await prisma.eventOutbox.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventOutboxCreateManyArgs>(args?: SelectSubset<T, EventOutboxCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventOutboxes and returns the data saved in the database.
     * @param {EventOutboxCreateManyAndReturnArgs} args - Arguments to create many EventOutboxes.
     * @example
     * // Create many EventOutboxes
     * const eventOutbox = await prisma.eventOutbox.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventOutboxes and only return the `id`
     * const eventOutboxWithIdOnly = await prisma.eventOutbox.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventOutboxCreateManyAndReturnArgs>(args?: SelectSubset<T, EventOutboxCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventOutboxPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a EventOutbox.
     * @param {EventOutboxDeleteArgs} args - Arguments to delete one EventOutbox.
     * @example
     * // Delete one EventOutbox
     * const EventOutbox = await prisma.eventOutbox.delete({
     *   where: {
     *     // ... filter to delete one EventOutbox
     *   }
     * })
     * 
     */
    delete<T extends EventOutboxDeleteArgs>(args: SelectSubset<T, EventOutboxDeleteArgs<ExtArgs>>): Prisma__EventOutboxClient<$Result.GetResult<Prisma.$EventOutboxPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one EventOutbox.
     * @param {EventOutboxUpdateArgs} args - Arguments to update one EventOutbox.
     * @example
     * // Update one EventOutbox
     * const eventOutbox = await prisma.eventOutbox.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventOutboxUpdateArgs>(args: SelectSubset<T, EventOutboxUpdateArgs<ExtArgs>>): Prisma__EventOutboxClient<$Result.GetResult<Prisma.$EventOutboxPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more EventOutboxes.
     * @param {EventOutboxDeleteManyArgs} args - Arguments to filter EventOutboxes to delete.
     * @example
     * // Delete a few EventOutboxes
     * const { count } = await prisma.eventOutbox.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventOutboxDeleteManyArgs>(args?: SelectSubset<T, EventOutboxDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventOutboxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventOutboxUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventOutboxes
     * const eventOutbox = await prisma.eventOutbox.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventOutboxUpdateManyArgs>(args: SelectSubset<T, EventOutboxUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EventOutbox.
     * @param {EventOutboxUpsertArgs} args - Arguments to update or create a EventOutbox.
     * @example
     * // Update or create a EventOutbox
     * const eventOutbox = await prisma.eventOutbox.upsert({
     *   create: {
     *     // ... data to create a EventOutbox
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventOutbox we want to update
     *   }
     * })
     */
    upsert<T extends EventOutboxUpsertArgs>(args: SelectSubset<T, EventOutboxUpsertArgs<ExtArgs>>): Prisma__EventOutboxClient<$Result.GetResult<Prisma.$EventOutboxPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of EventOutboxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventOutboxCountArgs} args - Arguments to filter EventOutboxes to count.
     * @example
     * // Count the number of EventOutboxes
     * const count = await prisma.eventOutbox.count({
     *   where: {
     *     // ... the filter for the EventOutboxes we want to count
     *   }
     * })
    **/
    count<T extends EventOutboxCountArgs>(
      args?: Subset<T, EventOutboxCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventOutboxCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventOutbox.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventOutboxAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventOutboxAggregateArgs>(args: Subset<T, EventOutboxAggregateArgs>): Prisma.PrismaPromise<GetEventOutboxAggregateType<T>>

    /**
     * Group by EventOutbox.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventOutboxGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventOutboxGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventOutboxGroupByArgs['orderBy'] }
        : { orderBy?: EventOutboxGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventOutboxGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventOutboxGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventOutbox model
   */
  readonly fields: EventOutboxFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventOutbox.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventOutboxClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EventOutbox model
   */ 
  interface EventOutboxFieldRefs {
    readonly id: FieldRef<"EventOutbox", 'String'>
    readonly eventId: FieldRef<"EventOutbox", 'String'>
    readonly subject: FieldRef<"EventOutbox", 'String'>
    readonly payload: FieldRef<"EventOutbox", 'Json'>
    readonly status: FieldRef<"EventOutbox", 'OutboxStatus'>
    readonly attempts: FieldRef<"EventOutbox", 'Int'>
    readonly lastError: FieldRef<"EventOutbox", 'String'>
    readonly createdAt: FieldRef<"EventOutbox", 'DateTime'>
    readonly publishedAt: FieldRef<"EventOutbox", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EventOutbox findUnique
   */
  export type EventOutboxFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventOutbox
     */
    select?: EventOutboxSelect<ExtArgs> | null
    /**
     * Filter, which EventOutbox to fetch.
     */
    where: EventOutboxWhereUniqueInput
  }

  /**
   * EventOutbox findUniqueOrThrow
   */
  export type EventOutboxFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventOutbox
     */
    select?: EventOutboxSelect<ExtArgs> | null
    /**
     * Filter, which EventOutbox to fetch.
     */
    where: EventOutboxWhereUniqueInput
  }

  /**
   * EventOutbox findFirst
   */
  export type EventOutboxFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventOutbox
     */
    select?: EventOutboxSelect<ExtArgs> | null
    /**
     * Filter, which EventOutbox to fetch.
     */
    where?: EventOutboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventOutboxes to fetch.
     */
    orderBy?: EventOutboxOrderByWithRelationInput | EventOutboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventOutboxes.
     */
    cursor?: EventOutboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventOutboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventOutboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventOutboxes.
     */
    distinct?: EventOutboxScalarFieldEnum | EventOutboxScalarFieldEnum[]
  }

  /**
   * EventOutbox findFirstOrThrow
   */
  export type EventOutboxFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventOutbox
     */
    select?: EventOutboxSelect<ExtArgs> | null
    /**
     * Filter, which EventOutbox to fetch.
     */
    where?: EventOutboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventOutboxes to fetch.
     */
    orderBy?: EventOutboxOrderByWithRelationInput | EventOutboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventOutboxes.
     */
    cursor?: EventOutboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventOutboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventOutboxes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventOutboxes.
     */
    distinct?: EventOutboxScalarFieldEnum | EventOutboxScalarFieldEnum[]
  }

  /**
   * EventOutbox findMany
   */
  export type EventOutboxFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventOutbox
     */
    select?: EventOutboxSelect<ExtArgs> | null
    /**
     * Filter, which EventOutboxes to fetch.
     */
    where?: EventOutboxWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventOutboxes to fetch.
     */
    orderBy?: EventOutboxOrderByWithRelationInput | EventOutboxOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventOutboxes.
     */
    cursor?: EventOutboxWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventOutboxes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventOutboxes.
     */
    skip?: number
    distinct?: EventOutboxScalarFieldEnum | EventOutboxScalarFieldEnum[]
  }

  /**
   * EventOutbox create
   */
  export type EventOutboxCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventOutbox
     */
    select?: EventOutboxSelect<ExtArgs> | null
    /**
     * The data needed to create a EventOutbox.
     */
    data: XOR<EventOutboxCreateInput, EventOutboxUncheckedCreateInput>
  }

  /**
   * EventOutbox createMany
   */
  export type EventOutboxCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventOutboxes.
     */
    data: EventOutboxCreateManyInput | EventOutboxCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventOutbox createManyAndReturn
   */
  export type EventOutboxCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventOutbox
     */
    select?: EventOutboxSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many EventOutboxes.
     */
    data: EventOutboxCreateManyInput | EventOutboxCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventOutbox update
   */
  export type EventOutboxUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventOutbox
     */
    select?: EventOutboxSelect<ExtArgs> | null
    /**
     * The data needed to update a EventOutbox.
     */
    data: XOR<EventOutboxUpdateInput, EventOutboxUncheckedUpdateInput>
    /**
     * Choose, which EventOutbox to update.
     */
    where: EventOutboxWhereUniqueInput
  }

  /**
   * EventOutbox updateMany
   */
  export type EventOutboxUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventOutboxes.
     */
    data: XOR<EventOutboxUpdateManyMutationInput, EventOutboxUncheckedUpdateManyInput>
    /**
     * Filter which EventOutboxes to update
     */
    where?: EventOutboxWhereInput
  }

  /**
   * EventOutbox upsert
   */
  export type EventOutboxUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventOutbox
     */
    select?: EventOutboxSelect<ExtArgs> | null
    /**
     * The filter to search for the EventOutbox to update in case it exists.
     */
    where: EventOutboxWhereUniqueInput
    /**
     * In case the EventOutbox found by the `where` argument doesn't exist, create a new EventOutbox with this data.
     */
    create: XOR<EventOutboxCreateInput, EventOutboxUncheckedCreateInput>
    /**
     * In case the EventOutbox was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventOutboxUpdateInput, EventOutboxUncheckedUpdateInput>
  }

  /**
   * EventOutbox delete
   */
  export type EventOutboxDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventOutbox
     */
    select?: EventOutboxSelect<ExtArgs> | null
    /**
     * Filter which EventOutbox to delete.
     */
    where: EventOutboxWhereUniqueInput
  }

  /**
   * EventOutbox deleteMany
   */
  export type EventOutboxDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventOutboxes to delete
     */
    where?: EventOutboxWhereInput
  }

  /**
   * EventOutbox without action
   */
  export type EventOutboxDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventOutbox
     */
    select?: EventOutboxSelect<ExtArgs> | null
  }


  /**
   * Model Agent
   */

  export type AggregateAgent = {
    _count: AgentCountAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  export type AgentMinAggregateOutputType = {
    id: string | null
    ownerId: string | null
    ownerKind: $Enums.OwnerKind | null
    orgId: string | null
    name: string | null
    status: $Enums.AgentStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentMaxAggregateOutputType = {
    id: string | null
    ownerId: string | null
    ownerKind: $Enums.OwnerKind | null
    orgId: string | null
    name: string | null
    status: $Enums.AgentStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentCountAggregateOutputType = {
    id: number
    ownerId: number
    ownerKind: number
    orgId: number
    name: number
    status: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AgentMinAggregateInputType = {
    id?: true
    ownerId?: true
    ownerKind?: true
    orgId?: true
    name?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentMaxAggregateInputType = {
    id?: true
    ownerId?: true
    ownerKind?: true
    orgId?: true
    name?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentCountAggregateInputType = {
    id?: true
    ownerId?: true
    ownerKind?: true
    orgId?: true
    name?: true
    status?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AgentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agent to aggregate.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Agents
    **/
    _count?: true | AgentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentMaxAggregateInputType
  }

  export type GetAgentAggregateType<T extends AgentAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent[P]>
      : GetScalarType<T[P], AggregateAgent[P]>
  }




  export type AgentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentWhereInput
    orderBy?: AgentOrderByWithAggregationInput | AgentOrderByWithAggregationInput[]
    by: AgentScalarFieldEnum[] | AgentScalarFieldEnum
    having?: AgentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentCountAggregateInputType | true
    _min?: AgentMinAggregateInputType
    _max?: AgentMaxAggregateInputType
  }

  export type AgentGroupByOutputType = {
    id: string
    ownerId: string
    ownerKind: $Enums.OwnerKind
    orgId: string | null
    name: string
    status: $Enums.AgentStatus
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: AgentCountAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  type GetAgentGroupByPayload<T extends AgentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentGroupByOutputType[P]>
            : GetScalarType<T[P], AgentGroupByOutputType[P]>
        }
      >
    >


  export type AgentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    ownerKind?: boolean
    orgId?: boolean
    name?: boolean
    status?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    policy?: boolean | Agent$policyArgs<ExtArgs>
    reasoningLogs?: boolean | Agent$reasoningLogsArgs<ExtArgs>
    approvalRequests?: boolean | Agent$approvalRequestsArgs<ExtArgs>
    invoices?: boolean | Agent$invoicesArgs<ExtArgs>
    services?: boolean | Agent$servicesArgs<ExtArgs>
    _count?: boolean | AgentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    ownerKind?: boolean
    orgId?: boolean
    name?: boolean
    status?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectScalar = {
    id?: boolean
    ownerId?: boolean
    ownerKind?: boolean
    orgId?: boolean
    name?: boolean
    status?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AgentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    policy?: boolean | Agent$policyArgs<ExtArgs>
    reasoningLogs?: boolean | Agent$reasoningLogsArgs<ExtArgs>
    approvalRequests?: boolean | Agent$approvalRequestsArgs<ExtArgs>
    invoices?: boolean | Agent$invoicesArgs<ExtArgs>
    services?: boolean | Agent$servicesArgs<ExtArgs>
    _count?: boolean | AgentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AgentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AgentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Agent"
    objects: {
      policy: Prisma.$AgentSpendingPolicyPayload<ExtArgs> | null
      reasoningLogs: Prisma.$AgentReasoningLogPayload<ExtArgs>[]
      approvalRequests: Prisma.$SpendApprovalRequestPayload<ExtArgs>[]
      invoices: Prisma.$AgentInvoicePayload<ExtArgs>[]
      services: Prisma.$AgentServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ownerId: string
      ownerKind: $Enums.OwnerKind
      orgId: string | null
      name: string
      status: $Enums.AgentStatus
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["agent"]>
    composites: {}
  }

  type AgentGetPayload<S extends boolean | null | undefined | AgentDefaultArgs> = $Result.GetResult<Prisma.$AgentPayload, S>

  type AgentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AgentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AgentCountAggregateInputType | true
    }

  export interface AgentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Agent'], meta: { name: 'Agent' } }
    /**
     * Find zero or one Agent that matches the filter.
     * @param {AgentFindUniqueArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentFindUniqueArgs>(args: SelectSubset<T, AgentFindUniqueArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Agent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AgentFindUniqueOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Agent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentFindFirstArgs>(args?: SelectSubset<T, AgentFindFirstArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Agent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Agents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agents
     * const agents = await prisma.agent.findMany()
     * 
     * // Get first 10 Agents
     * const agents = await prisma.agent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentWithIdOnly = await prisma.agent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentFindManyArgs>(args?: SelectSubset<T, AgentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Agent.
     * @param {AgentCreateArgs} args - Arguments to create a Agent.
     * @example
     * // Create one Agent
     * const Agent = await prisma.agent.create({
     *   data: {
     *     // ... data to create a Agent
     *   }
     * })
     * 
     */
    create<T extends AgentCreateArgs>(args: SelectSubset<T, AgentCreateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Agents.
     * @param {AgentCreateManyArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentCreateManyArgs>(args?: SelectSubset<T, AgentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agents and returns the data saved in the database.
     * @param {AgentCreateManyAndReturnArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Agent.
     * @param {AgentDeleteArgs} args - Arguments to delete one Agent.
     * @example
     * // Delete one Agent
     * const Agent = await prisma.agent.delete({
     *   where: {
     *     // ... filter to delete one Agent
     *   }
     * })
     * 
     */
    delete<T extends AgentDeleteArgs>(args: SelectSubset<T, AgentDeleteArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Agent.
     * @param {AgentUpdateArgs} args - Arguments to update one Agent.
     * @example
     * // Update one Agent
     * const agent = await prisma.agent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentUpdateArgs>(args: SelectSubset<T, AgentUpdateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Agents.
     * @param {AgentDeleteManyArgs} args - Arguments to filter Agents to delete.
     * @example
     * // Delete a few Agents
     * const { count } = await prisma.agent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentDeleteManyArgs>(args?: SelectSubset<T, AgentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentUpdateManyArgs>(args: SelectSubset<T, AgentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Agent.
     * @param {AgentUpsertArgs} args - Arguments to update or create a Agent.
     * @example
     * // Update or create a Agent
     * const agent = await prisma.agent.upsert({
     *   create: {
     *     // ... data to create a Agent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent we want to update
     *   }
     * })
     */
    upsert<T extends AgentUpsertArgs>(args: SelectSubset<T, AgentUpsertArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCountArgs} args - Arguments to filter Agents to count.
     * @example
     * // Count the number of Agents
     * const count = await prisma.agent.count({
     *   where: {
     *     // ... the filter for the Agents we want to count
     *   }
     * })
    **/
    count<T extends AgentCountArgs>(
      args?: Subset<T, AgentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentAggregateArgs>(args: Subset<T, AgentAggregateArgs>): Prisma.PrismaPromise<GetAgentAggregateType<T>>

    /**
     * Group by Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentGroupByArgs['orderBy'] }
        : { orderBy?: AgentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Agent model
   */
  readonly fields: AgentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    policy<T extends Agent$policyArgs<ExtArgs> = {}>(args?: Subset<T, Agent$policyArgs<ExtArgs>>): Prisma__AgentSpendingPolicyClient<$Result.GetResult<Prisma.$AgentSpendingPolicyPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    reasoningLogs<T extends Agent$reasoningLogsArgs<ExtArgs> = {}>(args?: Subset<T, Agent$reasoningLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentReasoningLogPayload<ExtArgs>, T, "findMany"> | Null>
    approvalRequests<T extends Agent$approvalRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Agent$approvalRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpendApprovalRequestPayload<ExtArgs>, T, "findMany"> | Null>
    invoices<T extends Agent$invoicesArgs<ExtArgs> = {}>(args?: Subset<T, Agent$invoicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentInvoicePayload<ExtArgs>, T, "findMany"> | Null>
    services<T extends Agent$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Agent$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentServicePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Agent model
   */ 
  interface AgentFieldRefs {
    readonly id: FieldRef<"Agent", 'String'>
    readonly ownerId: FieldRef<"Agent", 'String'>
    readonly ownerKind: FieldRef<"Agent", 'OwnerKind'>
    readonly orgId: FieldRef<"Agent", 'String'>
    readonly name: FieldRef<"Agent", 'String'>
    readonly status: FieldRef<"Agent", 'AgentStatus'>
    readonly metadata: FieldRef<"Agent", 'Json'>
    readonly createdAt: FieldRef<"Agent", 'DateTime'>
    readonly updatedAt: FieldRef<"Agent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Agent findUnique
   */
  export type AgentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findUniqueOrThrow
   */
  export type AgentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findFirst
   */
  export type AgentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findFirstOrThrow
   */
  export type AgentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findMany
   */
  export type AgentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agents to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent create
   */
  export type AgentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to create a Agent.
     */
    data: XOR<AgentCreateInput, AgentUncheckedCreateInput>
  }

  /**
   * Agent createMany
   */
  export type AgentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agent createManyAndReturn
   */
  export type AgentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agent update
   */
  export type AgentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to update a Agent.
     */
    data: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
    /**
     * Choose, which Agent to update.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent updateMany
   */
  export type AgentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
  }

  /**
   * Agent upsert
   */
  export type AgentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The filter to search for the Agent to update in case it exists.
     */
    where: AgentWhereUniqueInput
    /**
     * In case the Agent found by the `where` argument doesn't exist, create a new Agent with this data.
     */
    create: XOR<AgentCreateInput, AgentUncheckedCreateInput>
    /**
     * In case the Agent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
  }

  /**
   * Agent delete
   */
  export type AgentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter which Agent to delete.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent deleteMany
   */
  export type AgentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agents to delete
     */
    where?: AgentWhereInput
  }

  /**
   * Agent.policy
   */
  export type Agent$policyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSpendingPolicy
     */
    select?: AgentSpendingPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSpendingPolicyInclude<ExtArgs> | null
    where?: AgentSpendingPolicyWhereInput
  }

  /**
   * Agent.reasoningLogs
   */
  export type Agent$reasoningLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentReasoningLog
     */
    select?: AgentReasoningLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentReasoningLogInclude<ExtArgs> | null
    where?: AgentReasoningLogWhereInput
    orderBy?: AgentReasoningLogOrderByWithRelationInput | AgentReasoningLogOrderByWithRelationInput[]
    cursor?: AgentReasoningLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentReasoningLogScalarFieldEnum | AgentReasoningLogScalarFieldEnum[]
  }

  /**
   * Agent.approvalRequests
   */
  export type Agent$approvalRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalRequest
     */
    select?: SpendApprovalRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalRequestInclude<ExtArgs> | null
    where?: SpendApprovalRequestWhereInput
    orderBy?: SpendApprovalRequestOrderByWithRelationInput | SpendApprovalRequestOrderByWithRelationInput[]
    cursor?: SpendApprovalRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpendApprovalRequestScalarFieldEnum | SpendApprovalRequestScalarFieldEnum[]
  }

  /**
   * Agent.invoices
   */
  export type Agent$invoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentInvoice
     */
    select?: AgentInvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInvoiceInclude<ExtArgs> | null
    where?: AgentInvoiceWhereInput
    orderBy?: AgentInvoiceOrderByWithRelationInput | AgentInvoiceOrderByWithRelationInput[]
    cursor?: AgentInvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentInvoiceScalarFieldEnum | AgentInvoiceScalarFieldEnum[]
  }

  /**
   * Agent.services
   */
  export type Agent$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentService
     */
    select?: AgentServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentServiceInclude<ExtArgs> | null
    where?: AgentServiceWhereInput
    orderBy?: AgentServiceOrderByWithRelationInput | AgentServiceOrderByWithRelationInput[]
    cursor?: AgentServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentServiceScalarFieldEnum | AgentServiceScalarFieldEnum[]
  }

  /**
   * Agent without action
   */
  export type AgentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
  }


  /**
   * Model AgentSpendingPolicy
   */

  export type AggregateAgentSpendingPolicy = {
    _count: AgentSpendingPolicyCountAggregateOutputType | null
    _avg: AgentSpendingPolicyAvgAggregateOutputType | null
    _sum: AgentSpendingPolicySumAggregateOutputType | null
    _min: AgentSpendingPolicyMinAggregateOutputType | null
    _max: AgentSpendingPolicyMaxAggregateOutputType | null
  }

  export type AgentSpendingPolicyAvgAggregateOutputType = {
    perTxCapMinor: number | null
    dailyCapMinor: number | null
    monthlyCapMinor: number | null
    approvalThresholdMinor: number | null
    requiredApprovers: number | null
    version: number | null
  }

  export type AgentSpendingPolicySumAggregateOutputType = {
    perTxCapMinor: bigint | null
    dailyCapMinor: bigint | null
    monthlyCapMinor: bigint | null
    approvalThresholdMinor: bigint | null
    requiredApprovers: number | null
    version: number | null
  }

  export type AgentSpendingPolicyMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    perTxCapMinor: bigint | null
    dailyCapMinor: bigint | null
    monthlyCapMinor: bigint | null
    approvalThresholdMinor: bigint | null
    requiredApprovers: number | null
    currency: string | null
    version: number | null
    updatedAt: Date | null
  }

  export type AgentSpendingPolicyMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    perTxCapMinor: bigint | null
    dailyCapMinor: bigint | null
    monthlyCapMinor: bigint | null
    approvalThresholdMinor: bigint | null
    requiredApprovers: number | null
    currency: string | null
    version: number | null
    updatedAt: Date | null
  }

  export type AgentSpendingPolicyCountAggregateOutputType = {
    id: number
    agentId: number
    perTxCapMinor: number
    dailyCapMinor: number
    monthlyCapMinor: number
    destinationAllowlist: number
    approvalThresholdMinor: number
    requiredApprovers: number
    currency: number
    version: number
    updatedAt: number
    _all: number
  }


  export type AgentSpendingPolicyAvgAggregateInputType = {
    perTxCapMinor?: true
    dailyCapMinor?: true
    monthlyCapMinor?: true
    approvalThresholdMinor?: true
    requiredApprovers?: true
    version?: true
  }

  export type AgentSpendingPolicySumAggregateInputType = {
    perTxCapMinor?: true
    dailyCapMinor?: true
    monthlyCapMinor?: true
    approvalThresholdMinor?: true
    requiredApprovers?: true
    version?: true
  }

  export type AgentSpendingPolicyMinAggregateInputType = {
    id?: true
    agentId?: true
    perTxCapMinor?: true
    dailyCapMinor?: true
    monthlyCapMinor?: true
    approvalThresholdMinor?: true
    requiredApprovers?: true
    currency?: true
    version?: true
    updatedAt?: true
  }

  export type AgentSpendingPolicyMaxAggregateInputType = {
    id?: true
    agentId?: true
    perTxCapMinor?: true
    dailyCapMinor?: true
    monthlyCapMinor?: true
    approvalThresholdMinor?: true
    requiredApprovers?: true
    currency?: true
    version?: true
    updatedAt?: true
  }

  export type AgentSpendingPolicyCountAggregateInputType = {
    id?: true
    agentId?: true
    perTxCapMinor?: true
    dailyCapMinor?: true
    monthlyCapMinor?: true
    destinationAllowlist?: true
    approvalThresholdMinor?: true
    requiredApprovers?: true
    currency?: true
    version?: true
    updatedAt?: true
    _all?: true
  }

  export type AgentSpendingPolicyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentSpendingPolicy to aggregate.
     */
    where?: AgentSpendingPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentSpendingPolicies to fetch.
     */
    orderBy?: AgentSpendingPolicyOrderByWithRelationInput | AgentSpendingPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentSpendingPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentSpendingPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentSpendingPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentSpendingPolicies
    **/
    _count?: true | AgentSpendingPolicyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentSpendingPolicyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentSpendingPolicySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentSpendingPolicyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentSpendingPolicyMaxAggregateInputType
  }

  export type GetAgentSpendingPolicyAggregateType<T extends AgentSpendingPolicyAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentSpendingPolicy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentSpendingPolicy[P]>
      : GetScalarType<T[P], AggregateAgentSpendingPolicy[P]>
  }




  export type AgentSpendingPolicyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentSpendingPolicyWhereInput
    orderBy?: AgentSpendingPolicyOrderByWithAggregationInput | AgentSpendingPolicyOrderByWithAggregationInput[]
    by: AgentSpendingPolicyScalarFieldEnum[] | AgentSpendingPolicyScalarFieldEnum
    having?: AgentSpendingPolicyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentSpendingPolicyCountAggregateInputType | true
    _avg?: AgentSpendingPolicyAvgAggregateInputType
    _sum?: AgentSpendingPolicySumAggregateInputType
    _min?: AgentSpendingPolicyMinAggregateInputType
    _max?: AgentSpendingPolicyMaxAggregateInputType
  }

  export type AgentSpendingPolicyGroupByOutputType = {
    id: string
    agentId: string
    perTxCapMinor: bigint
    dailyCapMinor: bigint
    monthlyCapMinor: bigint | null
    destinationAllowlist: JsonValue
    approvalThresholdMinor: bigint
    requiredApprovers: number
    currency: string
    version: number
    updatedAt: Date
    _count: AgentSpendingPolicyCountAggregateOutputType | null
    _avg: AgentSpendingPolicyAvgAggregateOutputType | null
    _sum: AgentSpendingPolicySumAggregateOutputType | null
    _min: AgentSpendingPolicyMinAggregateOutputType | null
    _max: AgentSpendingPolicyMaxAggregateOutputType | null
  }

  type GetAgentSpendingPolicyGroupByPayload<T extends AgentSpendingPolicyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentSpendingPolicyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentSpendingPolicyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentSpendingPolicyGroupByOutputType[P]>
            : GetScalarType<T[P], AgentSpendingPolicyGroupByOutputType[P]>
        }
      >
    >


  export type AgentSpendingPolicySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    perTxCapMinor?: boolean
    dailyCapMinor?: boolean
    monthlyCapMinor?: boolean
    destinationAllowlist?: boolean
    approvalThresholdMinor?: boolean
    requiredApprovers?: boolean
    currency?: boolean
    version?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentSpendingPolicy"]>

  export type AgentSpendingPolicySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    perTxCapMinor?: boolean
    dailyCapMinor?: boolean
    monthlyCapMinor?: boolean
    destinationAllowlist?: boolean
    approvalThresholdMinor?: boolean
    requiredApprovers?: boolean
    currency?: boolean
    version?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentSpendingPolicy"]>

  export type AgentSpendingPolicySelectScalar = {
    id?: boolean
    agentId?: boolean
    perTxCapMinor?: boolean
    dailyCapMinor?: boolean
    monthlyCapMinor?: boolean
    destinationAllowlist?: boolean
    approvalThresholdMinor?: boolean
    requiredApprovers?: boolean
    currency?: boolean
    version?: boolean
    updatedAt?: boolean
  }

  export type AgentSpendingPolicyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type AgentSpendingPolicyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $AgentSpendingPolicyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentSpendingPolicy"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      perTxCapMinor: bigint
      dailyCapMinor: bigint
      monthlyCapMinor: bigint | null
      destinationAllowlist: Prisma.JsonValue
      approvalThresholdMinor: bigint
      requiredApprovers: number
      currency: string
      version: number
      updatedAt: Date
    }, ExtArgs["result"]["agentSpendingPolicy"]>
    composites: {}
  }

  type AgentSpendingPolicyGetPayload<S extends boolean | null | undefined | AgentSpendingPolicyDefaultArgs> = $Result.GetResult<Prisma.$AgentSpendingPolicyPayload, S>

  type AgentSpendingPolicyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AgentSpendingPolicyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AgentSpendingPolicyCountAggregateInputType | true
    }

  export interface AgentSpendingPolicyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentSpendingPolicy'], meta: { name: 'AgentSpendingPolicy' } }
    /**
     * Find zero or one AgentSpendingPolicy that matches the filter.
     * @param {AgentSpendingPolicyFindUniqueArgs} args - Arguments to find a AgentSpendingPolicy
     * @example
     * // Get one AgentSpendingPolicy
     * const agentSpendingPolicy = await prisma.agentSpendingPolicy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentSpendingPolicyFindUniqueArgs>(args: SelectSubset<T, AgentSpendingPolicyFindUniqueArgs<ExtArgs>>): Prisma__AgentSpendingPolicyClient<$Result.GetResult<Prisma.$AgentSpendingPolicyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AgentSpendingPolicy that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AgentSpendingPolicyFindUniqueOrThrowArgs} args - Arguments to find a AgentSpendingPolicy
     * @example
     * // Get one AgentSpendingPolicy
     * const agentSpendingPolicy = await prisma.agentSpendingPolicy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentSpendingPolicyFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentSpendingPolicyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentSpendingPolicyClient<$Result.GetResult<Prisma.$AgentSpendingPolicyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AgentSpendingPolicy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentSpendingPolicyFindFirstArgs} args - Arguments to find a AgentSpendingPolicy
     * @example
     * // Get one AgentSpendingPolicy
     * const agentSpendingPolicy = await prisma.agentSpendingPolicy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentSpendingPolicyFindFirstArgs>(args?: SelectSubset<T, AgentSpendingPolicyFindFirstArgs<ExtArgs>>): Prisma__AgentSpendingPolicyClient<$Result.GetResult<Prisma.$AgentSpendingPolicyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AgentSpendingPolicy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentSpendingPolicyFindFirstOrThrowArgs} args - Arguments to find a AgentSpendingPolicy
     * @example
     * // Get one AgentSpendingPolicy
     * const agentSpendingPolicy = await prisma.agentSpendingPolicy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentSpendingPolicyFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentSpendingPolicyFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentSpendingPolicyClient<$Result.GetResult<Prisma.$AgentSpendingPolicyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AgentSpendingPolicies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentSpendingPolicyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentSpendingPolicies
     * const agentSpendingPolicies = await prisma.agentSpendingPolicy.findMany()
     * 
     * // Get first 10 AgentSpendingPolicies
     * const agentSpendingPolicies = await prisma.agentSpendingPolicy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentSpendingPolicyWithIdOnly = await prisma.agentSpendingPolicy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentSpendingPolicyFindManyArgs>(args?: SelectSubset<T, AgentSpendingPolicyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentSpendingPolicyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AgentSpendingPolicy.
     * @param {AgentSpendingPolicyCreateArgs} args - Arguments to create a AgentSpendingPolicy.
     * @example
     * // Create one AgentSpendingPolicy
     * const AgentSpendingPolicy = await prisma.agentSpendingPolicy.create({
     *   data: {
     *     // ... data to create a AgentSpendingPolicy
     *   }
     * })
     * 
     */
    create<T extends AgentSpendingPolicyCreateArgs>(args: SelectSubset<T, AgentSpendingPolicyCreateArgs<ExtArgs>>): Prisma__AgentSpendingPolicyClient<$Result.GetResult<Prisma.$AgentSpendingPolicyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AgentSpendingPolicies.
     * @param {AgentSpendingPolicyCreateManyArgs} args - Arguments to create many AgentSpendingPolicies.
     * @example
     * // Create many AgentSpendingPolicies
     * const agentSpendingPolicy = await prisma.agentSpendingPolicy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentSpendingPolicyCreateManyArgs>(args?: SelectSubset<T, AgentSpendingPolicyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentSpendingPolicies and returns the data saved in the database.
     * @param {AgentSpendingPolicyCreateManyAndReturnArgs} args - Arguments to create many AgentSpendingPolicies.
     * @example
     * // Create many AgentSpendingPolicies
     * const agentSpendingPolicy = await prisma.agentSpendingPolicy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentSpendingPolicies and only return the `id`
     * const agentSpendingPolicyWithIdOnly = await prisma.agentSpendingPolicy.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentSpendingPolicyCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentSpendingPolicyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentSpendingPolicyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AgentSpendingPolicy.
     * @param {AgentSpendingPolicyDeleteArgs} args - Arguments to delete one AgentSpendingPolicy.
     * @example
     * // Delete one AgentSpendingPolicy
     * const AgentSpendingPolicy = await prisma.agentSpendingPolicy.delete({
     *   where: {
     *     // ... filter to delete one AgentSpendingPolicy
     *   }
     * })
     * 
     */
    delete<T extends AgentSpendingPolicyDeleteArgs>(args: SelectSubset<T, AgentSpendingPolicyDeleteArgs<ExtArgs>>): Prisma__AgentSpendingPolicyClient<$Result.GetResult<Prisma.$AgentSpendingPolicyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AgentSpendingPolicy.
     * @param {AgentSpendingPolicyUpdateArgs} args - Arguments to update one AgentSpendingPolicy.
     * @example
     * // Update one AgentSpendingPolicy
     * const agentSpendingPolicy = await prisma.agentSpendingPolicy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentSpendingPolicyUpdateArgs>(args: SelectSubset<T, AgentSpendingPolicyUpdateArgs<ExtArgs>>): Prisma__AgentSpendingPolicyClient<$Result.GetResult<Prisma.$AgentSpendingPolicyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AgentSpendingPolicies.
     * @param {AgentSpendingPolicyDeleteManyArgs} args - Arguments to filter AgentSpendingPolicies to delete.
     * @example
     * // Delete a few AgentSpendingPolicies
     * const { count } = await prisma.agentSpendingPolicy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentSpendingPolicyDeleteManyArgs>(args?: SelectSubset<T, AgentSpendingPolicyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentSpendingPolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentSpendingPolicyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentSpendingPolicies
     * const agentSpendingPolicy = await prisma.agentSpendingPolicy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentSpendingPolicyUpdateManyArgs>(args: SelectSubset<T, AgentSpendingPolicyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AgentSpendingPolicy.
     * @param {AgentSpendingPolicyUpsertArgs} args - Arguments to update or create a AgentSpendingPolicy.
     * @example
     * // Update or create a AgentSpendingPolicy
     * const agentSpendingPolicy = await prisma.agentSpendingPolicy.upsert({
     *   create: {
     *     // ... data to create a AgentSpendingPolicy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentSpendingPolicy we want to update
     *   }
     * })
     */
    upsert<T extends AgentSpendingPolicyUpsertArgs>(args: SelectSubset<T, AgentSpendingPolicyUpsertArgs<ExtArgs>>): Prisma__AgentSpendingPolicyClient<$Result.GetResult<Prisma.$AgentSpendingPolicyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AgentSpendingPolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentSpendingPolicyCountArgs} args - Arguments to filter AgentSpendingPolicies to count.
     * @example
     * // Count the number of AgentSpendingPolicies
     * const count = await prisma.agentSpendingPolicy.count({
     *   where: {
     *     // ... the filter for the AgentSpendingPolicies we want to count
     *   }
     * })
    **/
    count<T extends AgentSpendingPolicyCountArgs>(
      args?: Subset<T, AgentSpendingPolicyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentSpendingPolicyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentSpendingPolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentSpendingPolicyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentSpendingPolicyAggregateArgs>(args: Subset<T, AgentSpendingPolicyAggregateArgs>): Prisma.PrismaPromise<GetAgentSpendingPolicyAggregateType<T>>

    /**
     * Group by AgentSpendingPolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentSpendingPolicyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentSpendingPolicyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentSpendingPolicyGroupByArgs['orderBy'] }
        : { orderBy?: AgentSpendingPolicyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentSpendingPolicyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentSpendingPolicyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentSpendingPolicy model
   */
  readonly fields: AgentSpendingPolicyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentSpendingPolicy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentSpendingPolicyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentSpendingPolicy model
   */ 
  interface AgentSpendingPolicyFieldRefs {
    readonly id: FieldRef<"AgentSpendingPolicy", 'String'>
    readonly agentId: FieldRef<"AgentSpendingPolicy", 'String'>
    readonly perTxCapMinor: FieldRef<"AgentSpendingPolicy", 'BigInt'>
    readonly dailyCapMinor: FieldRef<"AgentSpendingPolicy", 'BigInt'>
    readonly monthlyCapMinor: FieldRef<"AgentSpendingPolicy", 'BigInt'>
    readonly destinationAllowlist: FieldRef<"AgentSpendingPolicy", 'Json'>
    readonly approvalThresholdMinor: FieldRef<"AgentSpendingPolicy", 'BigInt'>
    readonly requiredApprovers: FieldRef<"AgentSpendingPolicy", 'Int'>
    readonly currency: FieldRef<"AgentSpendingPolicy", 'String'>
    readonly version: FieldRef<"AgentSpendingPolicy", 'Int'>
    readonly updatedAt: FieldRef<"AgentSpendingPolicy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentSpendingPolicy findUnique
   */
  export type AgentSpendingPolicyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSpendingPolicy
     */
    select?: AgentSpendingPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSpendingPolicyInclude<ExtArgs> | null
    /**
     * Filter, which AgentSpendingPolicy to fetch.
     */
    where: AgentSpendingPolicyWhereUniqueInput
  }

  /**
   * AgentSpendingPolicy findUniqueOrThrow
   */
  export type AgentSpendingPolicyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSpendingPolicy
     */
    select?: AgentSpendingPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSpendingPolicyInclude<ExtArgs> | null
    /**
     * Filter, which AgentSpendingPolicy to fetch.
     */
    where: AgentSpendingPolicyWhereUniqueInput
  }

  /**
   * AgentSpendingPolicy findFirst
   */
  export type AgentSpendingPolicyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSpendingPolicy
     */
    select?: AgentSpendingPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSpendingPolicyInclude<ExtArgs> | null
    /**
     * Filter, which AgentSpendingPolicy to fetch.
     */
    where?: AgentSpendingPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentSpendingPolicies to fetch.
     */
    orderBy?: AgentSpendingPolicyOrderByWithRelationInput | AgentSpendingPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentSpendingPolicies.
     */
    cursor?: AgentSpendingPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentSpendingPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentSpendingPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentSpendingPolicies.
     */
    distinct?: AgentSpendingPolicyScalarFieldEnum | AgentSpendingPolicyScalarFieldEnum[]
  }

  /**
   * AgentSpendingPolicy findFirstOrThrow
   */
  export type AgentSpendingPolicyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSpendingPolicy
     */
    select?: AgentSpendingPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSpendingPolicyInclude<ExtArgs> | null
    /**
     * Filter, which AgentSpendingPolicy to fetch.
     */
    where?: AgentSpendingPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentSpendingPolicies to fetch.
     */
    orderBy?: AgentSpendingPolicyOrderByWithRelationInput | AgentSpendingPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentSpendingPolicies.
     */
    cursor?: AgentSpendingPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentSpendingPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentSpendingPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentSpendingPolicies.
     */
    distinct?: AgentSpendingPolicyScalarFieldEnum | AgentSpendingPolicyScalarFieldEnum[]
  }

  /**
   * AgentSpendingPolicy findMany
   */
  export type AgentSpendingPolicyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSpendingPolicy
     */
    select?: AgentSpendingPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSpendingPolicyInclude<ExtArgs> | null
    /**
     * Filter, which AgentSpendingPolicies to fetch.
     */
    where?: AgentSpendingPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentSpendingPolicies to fetch.
     */
    orderBy?: AgentSpendingPolicyOrderByWithRelationInput | AgentSpendingPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentSpendingPolicies.
     */
    cursor?: AgentSpendingPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentSpendingPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentSpendingPolicies.
     */
    skip?: number
    distinct?: AgentSpendingPolicyScalarFieldEnum | AgentSpendingPolicyScalarFieldEnum[]
  }

  /**
   * AgentSpendingPolicy create
   */
  export type AgentSpendingPolicyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSpendingPolicy
     */
    select?: AgentSpendingPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSpendingPolicyInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentSpendingPolicy.
     */
    data: XOR<AgentSpendingPolicyCreateInput, AgentSpendingPolicyUncheckedCreateInput>
  }

  /**
   * AgentSpendingPolicy createMany
   */
  export type AgentSpendingPolicyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentSpendingPolicies.
     */
    data: AgentSpendingPolicyCreateManyInput | AgentSpendingPolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentSpendingPolicy createManyAndReturn
   */
  export type AgentSpendingPolicyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSpendingPolicy
     */
    select?: AgentSpendingPolicySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AgentSpendingPolicies.
     */
    data: AgentSpendingPolicyCreateManyInput | AgentSpendingPolicyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSpendingPolicyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentSpendingPolicy update
   */
  export type AgentSpendingPolicyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSpendingPolicy
     */
    select?: AgentSpendingPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSpendingPolicyInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentSpendingPolicy.
     */
    data: XOR<AgentSpendingPolicyUpdateInput, AgentSpendingPolicyUncheckedUpdateInput>
    /**
     * Choose, which AgentSpendingPolicy to update.
     */
    where: AgentSpendingPolicyWhereUniqueInput
  }

  /**
   * AgentSpendingPolicy updateMany
   */
  export type AgentSpendingPolicyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentSpendingPolicies.
     */
    data: XOR<AgentSpendingPolicyUpdateManyMutationInput, AgentSpendingPolicyUncheckedUpdateManyInput>
    /**
     * Filter which AgentSpendingPolicies to update
     */
    where?: AgentSpendingPolicyWhereInput
  }

  /**
   * AgentSpendingPolicy upsert
   */
  export type AgentSpendingPolicyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSpendingPolicy
     */
    select?: AgentSpendingPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSpendingPolicyInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentSpendingPolicy to update in case it exists.
     */
    where: AgentSpendingPolicyWhereUniqueInput
    /**
     * In case the AgentSpendingPolicy found by the `where` argument doesn't exist, create a new AgentSpendingPolicy with this data.
     */
    create: XOR<AgentSpendingPolicyCreateInput, AgentSpendingPolicyUncheckedCreateInput>
    /**
     * In case the AgentSpendingPolicy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentSpendingPolicyUpdateInput, AgentSpendingPolicyUncheckedUpdateInput>
  }

  /**
   * AgentSpendingPolicy delete
   */
  export type AgentSpendingPolicyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSpendingPolicy
     */
    select?: AgentSpendingPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSpendingPolicyInclude<ExtArgs> | null
    /**
     * Filter which AgentSpendingPolicy to delete.
     */
    where: AgentSpendingPolicyWhereUniqueInput
  }

  /**
   * AgentSpendingPolicy deleteMany
   */
  export type AgentSpendingPolicyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentSpendingPolicies to delete
     */
    where?: AgentSpendingPolicyWhereInput
  }

  /**
   * AgentSpendingPolicy without action
   */
  export type AgentSpendingPolicyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSpendingPolicy
     */
    select?: AgentSpendingPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSpendingPolicyInclude<ExtArgs> | null
  }


  /**
   * Model AgentReasoningLog
   */

  export type AggregateAgentReasoningLog = {
    _count: AgentReasoningLogCountAggregateOutputType | null
    _min: AgentReasoningLogMinAggregateOutputType | null
    _max: AgentReasoningLogMaxAggregateOutputType | null
  }

  export type AgentReasoningLogMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    intentId: string | null
    traceId: string | null
    summary: string | null
    createdAt: Date | null
  }

  export type AgentReasoningLogMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    intentId: string | null
    traceId: string | null
    summary: string | null
    createdAt: Date | null
  }

  export type AgentReasoningLogCountAggregateOutputType = {
    id: number
    agentId: number
    intentId: number
    traceId: number
    summary: number
    steps: number
    createdAt: number
    _all: number
  }


  export type AgentReasoningLogMinAggregateInputType = {
    id?: true
    agentId?: true
    intentId?: true
    traceId?: true
    summary?: true
    createdAt?: true
  }

  export type AgentReasoningLogMaxAggregateInputType = {
    id?: true
    agentId?: true
    intentId?: true
    traceId?: true
    summary?: true
    createdAt?: true
  }

  export type AgentReasoningLogCountAggregateInputType = {
    id?: true
    agentId?: true
    intentId?: true
    traceId?: true
    summary?: true
    steps?: true
    createdAt?: true
    _all?: true
  }

  export type AgentReasoningLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentReasoningLog to aggregate.
     */
    where?: AgentReasoningLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentReasoningLogs to fetch.
     */
    orderBy?: AgentReasoningLogOrderByWithRelationInput | AgentReasoningLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentReasoningLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentReasoningLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentReasoningLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentReasoningLogs
    **/
    _count?: true | AgentReasoningLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentReasoningLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentReasoningLogMaxAggregateInputType
  }

  export type GetAgentReasoningLogAggregateType<T extends AgentReasoningLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentReasoningLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentReasoningLog[P]>
      : GetScalarType<T[P], AggregateAgentReasoningLog[P]>
  }




  export type AgentReasoningLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentReasoningLogWhereInput
    orderBy?: AgentReasoningLogOrderByWithAggregationInput | AgentReasoningLogOrderByWithAggregationInput[]
    by: AgentReasoningLogScalarFieldEnum[] | AgentReasoningLogScalarFieldEnum
    having?: AgentReasoningLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentReasoningLogCountAggregateInputType | true
    _min?: AgentReasoningLogMinAggregateInputType
    _max?: AgentReasoningLogMaxAggregateInputType
  }

  export type AgentReasoningLogGroupByOutputType = {
    id: string
    agentId: string
    intentId: string | null
    traceId: string | null
    summary: string
    steps: JsonValue
    createdAt: Date
    _count: AgentReasoningLogCountAggregateOutputType | null
    _min: AgentReasoningLogMinAggregateOutputType | null
    _max: AgentReasoningLogMaxAggregateOutputType | null
  }

  type GetAgentReasoningLogGroupByPayload<T extends AgentReasoningLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentReasoningLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentReasoningLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentReasoningLogGroupByOutputType[P]>
            : GetScalarType<T[P], AgentReasoningLogGroupByOutputType[P]>
        }
      >
    >


  export type AgentReasoningLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    intentId?: boolean
    traceId?: boolean
    summary?: boolean
    steps?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentReasoningLog"]>

  export type AgentReasoningLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    intentId?: boolean
    traceId?: boolean
    summary?: boolean
    steps?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentReasoningLog"]>

  export type AgentReasoningLogSelectScalar = {
    id?: boolean
    agentId?: boolean
    intentId?: boolean
    traceId?: boolean
    summary?: boolean
    steps?: boolean
    createdAt?: boolean
  }

  export type AgentReasoningLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type AgentReasoningLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $AgentReasoningLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentReasoningLog"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      intentId: string | null
      traceId: string | null
      summary: string
      steps: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["agentReasoningLog"]>
    composites: {}
  }

  type AgentReasoningLogGetPayload<S extends boolean | null | undefined | AgentReasoningLogDefaultArgs> = $Result.GetResult<Prisma.$AgentReasoningLogPayload, S>

  type AgentReasoningLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AgentReasoningLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AgentReasoningLogCountAggregateInputType | true
    }

  export interface AgentReasoningLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentReasoningLog'], meta: { name: 'AgentReasoningLog' } }
    /**
     * Find zero or one AgentReasoningLog that matches the filter.
     * @param {AgentReasoningLogFindUniqueArgs} args - Arguments to find a AgentReasoningLog
     * @example
     * // Get one AgentReasoningLog
     * const agentReasoningLog = await prisma.agentReasoningLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentReasoningLogFindUniqueArgs>(args: SelectSubset<T, AgentReasoningLogFindUniqueArgs<ExtArgs>>): Prisma__AgentReasoningLogClient<$Result.GetResult<Prisma.$AgentReasoningLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AgentReasoningLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AgentReasoningLogFindUniqueOrThrowArgs} args - Arguments to find a AgentReasoningLog
     * @example
     * // Get one AgentReasoningLog
     * const agentReasoningLog = await prisma.agentReasoningLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentReasoningLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentReasoningLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentReasoningLogClient<$Result.GetResult<Prisma.$AgentReasoningLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AgentReasoningLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentReasoningLogFindFirstArgs} args - Arguments to find a AgentReasoningLog
     * @example
     * // Get one AgentReasoningLog
     * const agentReasoningLog = await prisma.agentReasoningLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentReasoningLogFindFirstArgs>(args?: SelectSubset<T, AgentReasoningLogFindFirstArgs<ExtArgs>>): Prisma__AgentReasoningLogClient<$Result.GetResult<Prisma.$AgentReasoningLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AgentReasoningLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentReasoningLogFindFirstOrThrowArgs} args - Arguments to find a AgentReasoningLog
     * @example
     * // Get one AgentReasoningLog
     * const agentReasoningLog = await prisma.agentReasoningLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentReasoningLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentReasoningLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentReasoningLogClient<$Result.GetResult<Prisma.$AgentReasoningLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AgentReasoningLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentReasoningLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentReasoningLogs
     * const agentReasoningLogs = await prisma.agentReasoningLog.findMany()
     * 
     * // Get first 10 AgentReasoningLogs
     * const agentReasoningLogs = await prisma.agentReasoningLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentReasoningLogWithIdOnly = await prisma.agentReasoningLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentReasoningLogFindManyArgs>(args?: SelectSubset<T, AgentReasoningLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentReasoningLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AgentReasoningLog.
     * @param {AgentReasoningLogCreateArgs} args - Arguments to create a AgentReasoningLog.
     * @example
     * // Create one AgentReasoningLog
     * const AgentReasoningLog = await prisma.agentReasoningLog.create({
     *   data: {
     *     // ... data to create a AgentReasoningLog
     *   }
     * })
     * 
     */
    create<T extends AgentReasoningLogCreateArgs>(args: SelectSubset<T, AgentReasoningLogCreateArgs<ExtArgs>>): Prisma__AgentReasoningLogClient<$Result.GetResult<Prisma.$AgentReasoningLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AgentReasoningLogs.
     * @param {AgentReasoningLogCreateManyArgs} args - Arguments to create many AgentReasoningLogs.
     * @example
     * // Create many AgentReasoningLogs
     * const agentReasoningLog = await prisma.agentReasoningLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentReasoningLogCreateManyArgs>(args?: SelectSubset<T, AgentReasoningLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentReasoningLogs and returns the data saved in the database.
     * @param {AgentReasoningLogCreateManyAndReturnArgs} args - Arguments to create many AgentReasoningLogs.
     * @example
     * // Create many AgentReasoningLogs
     * const agentReasoningLog = await prisma.agentReasoningLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentReasoningLogs and only return the `id`
     * const agentReasoningLogWithIdOnly = await prisma.agentReasoningLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentReasoningLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentReasoningLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentReasoningLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AgentReasoningLog.
     * @param {AgentReasoningLogDeleteArgs} args - Arguments to delete one AgentReasoningLog.
     * @example
     * // Delete one AgentReasoningLog
     * const AgentReasoningLog = await prisma.agentReasoningLog.delete({
     *   where: {
     *     // ... filter to delete one AgentReasoningLog
     *   }
     * })
     * 
     */
    delete<T extends AgentReasoningLogDeleteArgs>(args: SelectSubset<T, AgentReasoningLogDeleteArgs<ExtArgs>>): Prisma__AgentReasoningLogClient<$Result.GetResult<Prisma.$AgentReasoningLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AgentReasoningLog.
     * @param {AgentReasoningLogUpdateArgs} args - Arguments to update one AgentReasoningLog.
     * @example
     * // Update one AgentReasoningLog
     * const agentReasoningLog = await prisma.agentReasoningLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentReasoningLogUpdateArgs>(args: SelectSubset<T, AgentReasoningLogUpdateArgs<ExtArgs>>): Prisma__AgentReasoningLogClient<$Result.GetResult<Prisma.$AgentReasoningLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AgentReasoningLogs.
     * @param {AgentReasoningLogDeleteManyArgs} args - Arguments to filter AgentReasoningLogs to delete.
     * @example
     * // Delete a few AgentReasoningLogs
     * const { count } = await prisma.agentReasoningLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentReasoningLogDeleteManyArgs>(args?: SelectSubset<T, AgentReasoningLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentReasoningLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentReasoningLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentReasoningLogs
     * const agentReasoningLog = await prisma.agentReasoningLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentReasoningLogUpdateManyArgs>(args: SelectSubset<T, AgentReasoningLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AgentReasoningLog.
     * @param {AgentReasoningLogUpsertArgs} args - Arguments to update or create a AgentReasoningLog.
     * @example
     * // Update or create a AgentReasoningLog
     * const agentReasoningLog = await prisma.agentReasoningLog.upsert({
     *   create: {
     *     // ... data to create a AgentReasoningLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentReasoningLog we want to update
     *   }
     * })
     */
    upsert<T extends AgentReasoningLogUpsertArgs>(args: SelectSubset<T, AgentReasoningLogUpsertArgs<ExtArgs>>): Prisma__AgentReasoningLogClient<$Result.GetResult<Prisma.$AgentReasoningLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AgentReasoningLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentReasoningLogCountArgs} args - Arguments to filter AgentReasoningLogs to count.
     * @example
     * // Count the number of AgentReasoningLogs
     * const count = await prisma.agentReasoningLog.count({
     *   where: {
     *     // ... the filter for the AgentReasoningLogs we want to count
     *   }
     * })
    **/
    count<T extends AgentReasoningLogCountArgs>(
      args?: Subset<T, AgentReasoningLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentReasoningLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentReasoningLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentReasoningLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentReasoningLogAggregateArgs>(args: Subset<T, AgentReasoningLogAggregateArgs>): Prisma.PrismaPromise<GetAgentReasoningLogAggregateType<T>>

    /**
     * Group by AgentReasoningLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentReasoningLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentReasoningLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentReasoningLogGroupByArgs['orderBy'] }
        : { orderBy?: AgentReasoningLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentReasoningLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentReasoningLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentReasoningLog model
   */
  readonly fields: AgentReasoningLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentReasoningLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentReasoningLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentReasoningLog model
   */ 
  interface AgentReasoningLogFieldRefs {
    readonly id: FieldRef<"AgentReasoningLog", 'String'>
    readonly agentId: FieldRef<"AgentReasoningLog", 'String'>
    readonly intentId: FieldRef<"AgentReasoningLog", 'String'>
    readonly traceId: FieldRef<"AgentReasoningLog", 'String'>
    readonly summary: FieldRef<"AgentReasoningLog", 'String'>
    readonly steps: FieldRef<"AgentReasoningLog", 'Json'>
    readonly createdAt: FieldRef<"AgentReasoningLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentReasoningLog findUnique
   */
  export type AgentReasoningLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentReasoningLog
     */
    select?: AgentReasoningLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentReasoningLogInclude<ExtArgs> | null
    /**
     * Filter, which AgentReasoningLog to fetch.
     */
    where: AgentReasoningLogWhereUniqueInput
  }

  /**
   * AgentReasoningLog findUniqueOrThrow
   */
  export type AgentReasoningLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentReasoningLog
     */
    select?: AgentReasoningLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentReasoningLogInclude<ExtArgs> | null
    /**
     * Filter, which AgentReasoningLog to fetch.
     */
    where: AgentReasoningLogWhereUniqueInput
  }

  /**
   * AgentReasoningLog findFirst
   */
  export type AgentReasoningLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentReasoningLog
     */
    select?: AgentReasoningLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentReasoningLogInclude<ExtArgs> | null
    /**
     * Filter, which AgentReasoningLog to fetch.
     */
    where?: AgentReasoningLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentReasoningLogs to fetch.
     */
    orderBy?: AgentReasoningLogOrderByWithRelationInput | AgentReasoningLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentReasoningLogs.
     */
    cursor?: AgentReasoningLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentReasoningLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentReasoningLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentReasoningLogs.
     */
    distinct?: AgentReasoningLogScalarFieldEnum | AgentReasoningLogScalarFieldEnum[]
  }

  /**
   * AgentReasoningLog findFirstOrThrow
   */
  export type AgentReasoningLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentReasoningLog
     */
    select?: AgentReasoningLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentReasoningLogInclude<ExtArgs> | null
    /**
     * Filter, which AgentReasoningLog to fetch.
     */
    where?: AgentReasoningLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentReasoningLogs to fetch.
     */
    orderBy?: AgentReasoningLogOrderByWithRelationInput | AgentReasoningLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentReasoningLogs.
     */
    cursor?: AgentReasoningLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentReasoningLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentReasoningLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentReasoningLogs.
     */
    distinct?: AgentReasoningLogScalarFieldEnum | AgentReasoningLogScalarFieldEnum[]
  }

  /**
   * AgentReasoningLog findMany
   */
  export type AgentReasoningLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentReasoningLog
     */
    select?: AgentReasoningLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentReasoningLogInclude<ExtArgs> | null
    /**
     * Filter, which AgentReasoningLogs to fetch.
     */
    where?: AgentReasoningLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentReasoningLogs to fetch.
     */
    orderBy?: AgentReasoningLogOrderByWithRelationInput | AgentReasoningLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentReasoningLogs.
     */
    cursor?: AgentReasoningLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentReasoningLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentReasoningLogs.
     */
    skip?: number
    distinct?: AgentReasoningLogScalarFieldEnum | AgentReasoningLogScalarFieldEnum[]
  }

  /**
   * AgentReasoningLog create
   */
  export type AgentReasoningLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentReasoningLog
     */
    select?: AgentReasoningLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentReasoningLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentReasoningLog.
     */
    data: XOR<AgentReasoningLogCreateInput, AgentReasoningLogUncheckedCreateInput>
  }

  /**
   * AgentReasoningLog createMany
   */
  export type AgentReasoningLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentReasoningLogs.
     */
    data: AgentReasoningLogCreateManyInput | AgentReasoningLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentReasoningLog createManyAndReturn
   */
  export type AgentReasoningLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentReasoningLog
     */
    select?: AgentReasoningLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AgentReasoningLogs.
     */
    data: AgentReasoningLogCreateManyInput | AgentReasoningLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentReasoningLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentReasoningLog update
   */
  export type AgentReasoningLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentReasoningLog
     */
    select?: AgentReasoningLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentReasoningLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentReasoningLog.
     */
    data: XOR<AgentReasoningLogUpdateInput, AgentReasoningLogUncheckedUpdateInput>
    /**
     * Choose, which AgentReasoningLog to update.
     */
    where: AgentReasoningLogWhereUniqueInput
  }

  /**
   * AgentReasoningLog updateMany
   */
  export type AgentReasoningLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentReasoningLogs.
     */
    data: XOR<AgentReasoningLogUpdateManyMutationInput, AgentReasoningLogUncheckedUpdateManyInput>
    /**
     * Filter which AgentReasoningLogs to update
     */
    where?: AgentReasoningLogWhereInput
  }

  /**
   * AgentReasoningLog upsert
   */
  export type AgentReasoningLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentReasoningLog
     */
    select?: AgentReasoningLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentReasoningLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentReasoningLog to update in case it exists.
     */
    where: AgentReasoningLogWhereUniqueInput
    /**
     * In case the AgentReasoningLog found by the `where` argument doesn't exist, create a new AgentReasoningLog with this data.
     */
    create: XOR<AgentReasoningLogCreateInput, AgentReasoningLogUncheckedCreateInput>
    /**
     * In case the AgentReasoningLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentReasoningLogUpdateInput, AgentReasoningLogUncheckedUpdateInput>
  }

  /**
   * AgentReasoningLog delete
   */
  export type AgentReasoningLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentReasoningLog
     */
    select?: AgentReasoningLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentReasoningLogInclude<ExtArgs> | null
    /**
     * Filter which AgentReasoningLog to delete.
     */
    where: AgentReasoningLogWhereUniqueInput
  }

  /**
   * AgentReasoningLog deleteMany
   */
  export type AgentReasoningLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentReasoningLogs to delete
     */
    where?: AgentReasoningLogWhereInput
  }

  /**
   * AgentReasoningLog without action
   */
  export type AgentReasoningLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentReasoningLog
     */
    select?: AgentReasoningLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentReasoningLogInclude<ExtArgs> | null
  }


  /**
   * Model SpendApprovalRequest
   */

  export type AggregateSpendApprovalRequest = {
    _count: SpendApprovalRequestCountAggregateOutputType | null
    _avg: SpendApprovalRequestAvgAggregateOutputType | null
    _sum: SpendApprovalRequestSumAggregateOutputType | null
    _min: SpendApprovalRequestMinAggregateOutputType | null
    _max: SpendApprovalRequestMaxAggregateOutputType | null
  }

  export type SpendApprovalRequestAvgAggregateOutputType = {
    amountMinor: number | null
    approvalCount: number | null
    requiredApprovers: number | null
  }

  export type SpendApprovalRequestSumAggregateOutputType = {
    amountMinor: bigint | null
    approvalCount: number | null
    requiredApprovers: number | null
  }

  export type SpendApprovalRequestMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    intentId: string | null
    amountMinor: bigint | null
    destination: string | null
    approvalCount: number | null
    requiredApprovers: number | null
    status: $Enums.SpendApprovalStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpendApprovalRequestMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    intentId: string | null
    amountMinor: bigint | null
    destination: string | null
    approvalCount: number | null
    requiredApprovers: number | null
    status: $Enums.SpendApprovalStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpendApprovalRequestCountAggregateOutputType = {
    id: number
    agentId: number
    intentId: number
    amountMinor: number
    destination: number
    approvalCount: number
    requiredApprovers: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SpendApprovalRequestAvgAggregateInputType = {
    amountMinor?: true
    approvalCount?: true
    requiredApprovers?: true
  }

  export type SpendApprovalRequestSumAggregateInputType = {
    amountMinor?: true
    approvalCount?: true
    requiredApprovers?: true
  }

  export type SpendApprovalRequestMinAggregateInputType = {
    id?: true
    agentId?: true
    intentId?: true
    amountMinor?: true
    destination?: true
    approvalCount?: true
    requiredApprovers?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpendApprovalRequestMaxAggregateInputType = {
    id?: true
    agentId?: true
    intentId?: true
    amountMinor?: true
    destination?: true
    approvalCount?: true
    requiredApprovers?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpendApprovalRequestCountAggregateInputType = {
    id?: true
    agentId?: true
    intentId?: true
    amountMinor?: true
    destination?: true
    approvalCount?: true
    requiredApprovers?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SpendApprovalRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SpendApprovalRequest to aggregate.
     */
    where?: SpendApprovalRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpendApprovalRequests to fetch.
     */
    orderBy?: SpendApprovalRequestOrderByWithRelationInput | SpendApprovalRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpendApprovalRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpendApprovalRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpendApprovalRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SpendApprovalRequests
    **/
    _count?: true | SpendApprovalRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpendApprovalRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpendApprovalRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpendApprovalRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpendApprovalRequestMaxAggregateInputType
  }

  export type GetSpendApprovalRequestAggregateType<T extends SpendApprovalRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateSpendApprovalRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpendApprovalRequest[P]>
      : GetScalarType<T[P], AggregateSpendApprovalRequest[P]>
  }




  export type SpendApprovalRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpendApprovalRequestWhereInput
    orderBy?: SpendApprovalRequestOrderByWithAggregationInput | SpendApprovalRequestOrderByWithAggregationInput[]
    by: SpendApprovalRequestScalarFieldEnum[] | SpendApprovalRequestScalarFieldEnum
    having?: SpendApprovalRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpendApprovalRequestCountAggregateInputType | true
    _avg?: SpendApprovalRequestAvgAggregateInputType
    _sum?: SpendApprovalRequestSumAggregateInputType
    _min?: SpendApprovalRequestMinAggregateInputType
    _max?: SpendApprovalRequestMaxAggregateInputType
  }

  export type SpendApprovalRequestGroupByOutputType = {
    id: string
    agentId: string
    intentId: string | null
    amountMinor: bigint
    destination: string
    approvalCount: number
    requiredApprovers: number
    status: $Enums.SpendApprovalStatus
    createdAt: Date
    updatedAt: Date
    _count: SpendApprovalRequestCountAggregateOutputType | null
    _avg: SpendApprovalRequestAvgAggregateOutputType | null
    _sum: SpendApprovalRequestSumAggregateOutputType | null
    _min: SpendApprovalRequestMinAggregateOutputType | null
    _max: SpendApprovalRequestMaxAggregateOutputType | null
  }

  type GetSpendApprovalRequestGroupByPayload<T extends SpendApprovalRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpendApprovalRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpendApprovalRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpendApprovalRequestGroupByOutputType[P]>
            : GetScalarType<T[P], SpendApprovalRequestGroupByOutputType[P]>
        }
      >
    >


  export type SpendApprovalRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    intentId?: boolean
    amountMinor?: boolean
    destination?: boolean
    approvalCount?: boolean
    requiredApprovers?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    votes?: boolean | SpendApprovalRequest$votesArgs<ExtArgs>
    _count?: boolean | SpendApprovalRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spendApprovalRequest"]>

  export type SpendApprovalRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    intentId?: boolean
    amountMinor?: boolean
    destination?: boolean
    approvalCount?: boolean
    requiredApprovers?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spendApprovalRequest"]>

  export type SpendApprovalRequestSelectScalar = {
    id?: boolean
    agentId?: boolean
    intentId?: boolean
    amountMinor?: boolean
    destination?: boolean
    approvalCount?: boolean
    requiredApprovers?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SpendApprovalRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    votes?: boolean | SpendApprovalRequest$votesArgs<ExtArgs>
    _count?: boolean | SpendApprovalRequestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SpendApprovalRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $SpendApprovalRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SpendApprovalRequest"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
      votes: Prisma.$SpendApprovalVotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      intentId: string | null
      amountMinor: bigint
      destination: string
      approvalCount: number
      requiredApprovers: number
      status: $Enums.SpendApprovalStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["spendApprovalRequest"]>
    composites: {}
  }

  type SpendApprovalRequestGetPayload<S extends boolean | null | undefined | SpendApprovalRequestDefaultArgs> = $Result.GetResult<Prisma.$SpendApprovalRequestPayload, S>

  type SpendApprovalRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SpendApprovalRequestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SpendApprovalRequestCountAggregateInputType | true
    }

  export interface SpendApprovalRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SpendApprovalRequest'], meta: { name: 'SpendApprovalRequest' } }
    /**
     * Find zero or one SpendApprovalRequest that matches the filter.
     * @param {SpendApprovalRequestFindUniqueArgs} args - Arguments to find a SpendApprovalRequest
     * @example
     * // Get one SpendApprovalRequest
     * const spendApprovalRequest = await prisma.spendApprovalRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpendApprovalRequestFindUniqueArgs>(args: SelectSubset<T, SpendApprovalRequestFindUniqueArgs<ExtArgs>>): Prisma__SpendApprovalRequestClient<$Result.GetResult<Prisma.$SpendApprovalRequestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SpendApprovalRequest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SpendApprovalRequestFindUniqueOrThrowArgs} args - Arguments to find a SpendApprovalRequest
     * @example
     * // Get one SpendApprovalRequest
     * const spendApprovalRequest = await prisma.spendApprovalRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpendApprovalRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, SpendApprovalRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpendApprovalRequestClient<$Result.GetResult<Prisma.$SpendApprovalRequestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SpendApprovalRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpendApprovalRequestFindFirstArgs} args - Arguments to find a SpendApprovalRequest
     * @example
     * // Get one SpendApprovalRequest
     * const spendApprovalRequest = await prisma.spendApprovalRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpendApprovalRequestFindFirstArgs>(args?: SelectSubset<T, SpendApprovalRequestFindFirstArgs<ExtArgs>>): Prisma__SpendApprovalRequestClient<$Result.GetResult<Prisma.$SpendApprovalRequestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SpendApprovalRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpendApprovalRequestFindFirstOrThrowArgs} args - Arguments to find a SpendApprovalRequest
     * @example
     * // Get one SpendApprovalRequest
     * const spendApprovalRequest = await prisma.spendApprovalRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpendApprovalRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, SpendApprovalRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpendApprovalRequestClient<$Result.GetResult<Prisma.$SpendApprovalRequestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SpendApprovalRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpendApprovalRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SpendApprovalRequests
     * const spendApprovalRequests = await prisma.spendApprovalRequest.findMany()
     * 
     * // Get first 10 SpendApprovalRequests
     * const spendApprovalRequests = await prisma.spendApprovalRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spendApprovalRequestWithIdOnly = await prisma.spendApprovalRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpendApprovalRequestFindManyArgs>(args?: SelectSubset<T, SpendApprovalRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpendApprovalRequestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SpendApprovalRequest.
     * @param {SpendApprovalRequestCreateArgs} args - Arguments to create a SpendApprovalRequest.
     * @example
     * // Create one SpendApprovalRequest
     * const SpendApprovalRequest = await prisma.spendApprovalRequest.create({
     *   data: {
     *     // ... data to create a SpendApprovalRequest
     *   }
     * })
     * 
     */
    create<T extends SpendApprovalRequestCreateArgs>(args: SelectSubset<T, SpendApprovalRequestCreateArgs<ExtArgs>>): Prisma__SpendApprovalRequestClient<$Result.GetResult<Prisma.$SpendApprovalRequestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SpendApprovalRequests.
     * @param {SpendApprovalRequestCreateManyArgs} args - Arguments to create many SpendApprovalRequests.
     * @example
     * // Create many SpendApprovalRequests
     * const spendApprovalRequest = await prisma.spendApprovalRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpendApprovalRequestCreateManyArgs>(args?: SelectSubset<T, SpendApprovalRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SpendApprovalRequests and returns the data saved in the database.
     * @param {SpendApprovalRequestCreateManyAndReturnArgs} args - Arguments to create many SpendApprovalRequests.
     * @example
     * // Create many SpendApprovalRequests
     * const spendApprovalRequest = await prisma.spendApprovalRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SpendApprovalRequests and only return the `id`
     * const spendApprovalRequestWithIdOnly = await prisma.spendApprovalRequest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SpendApprovalRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, SpendApprovalRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpendApprovalRequestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SpendApprovalRequest.
     * @param {SpendApprovalRequestDeleteArgs} args - Arguments to delete one SpendApprovalRequest.
     * @example
     * // Delete one SpendApprovalRequest
     * const SpendApprovalRequest = await prisma.spendApprovalRequest.delete({
     *   where: {
     *     // ... filter to delete one SpendApprovalRequest
     *   }
     * })
     * 
     */
    delete<T extends SpendApprovalRequestDeleteArgs>(args: SelectSubset<T, SpendApprovalRequestDeleteArgs<ExtArgs>>): Prisma__SpendApprovalRequestClient<$Result.GetResult<Prisma.$SpendApprovalRequestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SpendApprovalRequest.
     * @param {SpendApprovalRequestUpdateArgs} args - Arguments to update one SpendApprovalRequest.
     * @example
     * // Update one SpendApprovalRequest
     * const spendApprovalRequest = await prisma.spendApprovalRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpendApprovalRequestUpdateArgs>(args: SelectSubset<T, SpendApprovalRequestUpdateArgs<ExtArgs>>): Prisma__SpendApprovalRequestClient<$Result.GetResult<Prisma.$SpendApprovalRequestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SpendApprovalRequests.
     * @param {SpendApprovalRequestDeleteManyArgs} args - Arguments to filter SpendApprovalRequests to delete.
     * @example
     * // Delete a few SpendApprovalRequests
     * const { count } = await prisma.spendApprovalRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpendApprovalRequestDeleteManyArgs>(args?: SelectSubset<T, SpendApprovalRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SpendApprovalRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpendApprovalRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SpendApprovalRequests
     * const spendApprovalRequest = await prisma.spendApprovalRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpendApprovalRequestUpdateManyArgs>(args: SelectSubset<T, SpendApprovalRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SpendApprovalRequest.
     * @param {SpendApprovalRequestUpsertArgs} args - Arguments to update or create a SpendApprovalRequest.
     * @example
     * // Update or create a SpendApprovalRequest
     * const spendApprovalRequest = await prisma.spendApprovalRequest.upsert({
     *   create: {
     *     // ... data to create a SpendApprovalRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SpendApprovalRequest we want to update
     *   }
     * })
     */
    upsert<T extends SpendApprovalRequestUpsertArgs>(args: SelectSubset<T, SpendApprovalRequestUpsertArgs<ExtArgs>>): Prisma__SpendApprovalRequestClient<$Result.GetResult<Prisma.$SpendApprovalRequestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SpendApprovalRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpendApprovalRequestCountArgs} args - Arguments to filter SpendApprovalRequests to count.
     * @example
     * // Count the number of SpendApprovalRequests
     * const count = await prisma.spendApprovalRequest.count({
     *   where: {
     *     // ... the filter for the SpendApprovalRequests we want to count
     *   }
     * })
    **/
    count<T extends SpendApprovalRequestCountArgs>(
      args?: Subset<T, SpendApprovalRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpendApprovalRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SpendApprovalRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpendApprovalRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpendApprovalRequestAggregateArgs>(args: Subset<T, SpendApprovalRequestAggregateArgs>): Prisma.PrismaPromise<GetSpendApprovalRequestAggregateType<T>>

    /**
     * Group by SpendApprovalRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpendApprovalRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SpendApprovalRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpendApprovalRequestGroupByArgs['orderBy'] }
        : { orderBy?: SpendApprovalRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SpendApprovalRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpendApprovalRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SpendApprovalRequest model
   */
  readonly fields: SpendApprovalRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SpendApprovalRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpendApprovalRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    votes<T extends SpendApprovalRequest$votesArgs<ExtArgs> = {}>(args?: Subset<T, SpendApprovalRequest$votesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpendApprovalVotePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SpendApprovalRequest model
   */ 
  interface SpendApprovalRequestFieldRefs {
    readonly id: FieldRef<"SpendApprovalRequest", 'String'>
    readonly agentId: FieldRef<"SpendApprovalRequest", 'String'>
    readonly intentId: FieldRef<"SpendApprovalRequest", 'String'>
    readonly amountMinor: FieldRef<"SpendApprovalRequest", 'BigInt'>
    readonly destination: FieldRef<"SpendApprovalRequest", 'String'>
    readonly approvalCount: FieldRef<"SpendApprovalRequest", 'Int'>
    readonly requiredApprovers: FieldRef<"SpendApprovalRequest", 'Int'>
    readonly status: FieldRef<"SpendApprovalRequest", 'SpendApprovalStatus'>
    readonly createdAt: FieldRef<"SpendApprovalRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"SpendApprovalRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SpendApprovalRequest findUnique
   */
  export type SpendApprovalRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalRequest
     */
    select?: SpendApprovalRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter, which SpendApprovalRequest to fetch.
     */
    where: SpendApprovalRequestWhereUniqueInput
  }

  /**
   * SpendApprovalRequest findUniqueOrThrow
   */
  export type SpendApprovalRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalRequest
     */
    select?: SpendApprovalRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter, which SpendApprovalRequest to fetch.
     */
    where: SpendApprovalRequestWhereUniqueInput
  }

  /**
   * SpendApprovalRequest findFirst
   */
  export type SpendApprovalRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalRequest
     */
    select?: SpendApprovalRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter, which SpendApprovalRequest to fetch.
     */
    where?: SpendApprovalRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpendApprovalRequests to fetch.
     */
    orderBy?: SpendApprovalRequestOrderByWithRelationInput | SpendApprovalRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SpendApprovalRequests.
     */
    cursor?: SpendApprovalRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpendApprovalRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpendApprovalRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SpendApprovalRequests.
     */
    distinct?: SpendApprovalRequestScalarFieldEnum | SpendApprovalRequestScalarFieldEnum[]
  }

  /**
   * SpendApprovalRequest findFirstOrThrow
   */
  export type SpendApprovalRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalRequest
     */
    select?: SpendApprovalRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter, which SpendApprovalRequest to fetch.
     */
    where?: SpendApprovalRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpendApprovalRequests to fetch.
     */
    orderBy?: SpendApprovalRequestOrderByWithRelationInput | SpendApprovalRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SpendApprovalRequests.
     */
    cursor?: SpendApprovalRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpendApprovalRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpendApprovalRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SpendApprovalRequests.
     */
    distinct?: SpendApprovalRequestScalarFieldEnum | SpendApprovalRequestScalarFieldEnum[]
  }

  /**
   * SpendApprovalRequest findMany
   */
  export type SpendApprovalRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalRequest
     */
    select?: SpendApprovalRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter, which SpendApprovalRequests to fetch.
     */
    where?: SpendApprovalRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpendApprovalRequests to fetch.
     */
    orderBy?: SpendApprovalRequestOrderByWithRelationInput | SpendApprovalRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SpendApprovalRequests.
     */
    cursor?: SpendApprovalRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpendApprovalRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpendApprovalRequests.
     */
    skip?: number
    distinct?: SpendApprovalRequestScalarFieldEnum | SpendApprovalRequestScalarFieldEnum[]
  }

  /**
   * SpendApprovalRequest create
   */
  export type SpendApprovalRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalRequest
     */
    select?: SpendApprovalRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a SpendApprovalRequest.
     */
    data: XOR<SpendApprovalRequestCreateInput, SpendApprovalRequestUncheckedCreateInput>
  }

  /**
   * SpendApprovalRequest createMany
   */
  export type SpendApprovalRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SpendApprovalRequests.
     */
    data: SpendApprovalRequestCreateManyInput | SpendApprovalRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SpendApprovalRequest createManyAndReturn
   */
  export type SpendApprovalRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalRequest
     */
    select?: SpendApprovalRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SpendApprovalRequests.
     */
    data: SpendApprovalRequestCreateManyInput | SpendApprovalRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SpendApprovalRequest update
   */
  export type SpendApprovalRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalRequest
     */
    select?: SpendApprovalRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a SpendApprovalRequest.
     */
    data: XOR<SpendApprovalRequestUpdateInput, SpendApprovalRequestUncheckedUpdateInput>
    /**
     * Choose, which SpendApprovalRequest to update.
     */
    where: SpendApprovalRequestWhereUniqueInput
  }

  /**
   * SpendApprovalRequest updateMany
   */
  export type SpendApprovalRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SpendApprovalRequests.
     */
    data: XOR<SpendApprovalRequestUpdateManyMutationInput, SpendApprovalRequestUncheckedUpdateManyInput>
    /**
     * Filter which SpendApprovalRequests to update
     */
    where?: SpendApprovalRequestWhereInput
  }

  /**
   * SpendApprovalRequest upsert
   */
  export type SpendApprovalRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalRequest
     */
    select?: SpendApprovalRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the SpendApprovalRequest to update in case it exists.
     */
    where: SpendApprovalRequestWhereUniqueInput
    /**
     * In case the SpendApprovalRequest found by the `where` argument doesn't exist, create a new SpendApprovalRequest with this data.
     */
    create: XOR<SpendApprovalRequestCreateInput, SpendApprovalRequestUncheckedCreateInput>
    /**
     * In case the SpendApprovalRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpendApprovalRequestUpdateInput, SpendApprovalRequestUncheckedUpdateInput>
  }

  /**
   * SpendApprovalRequest delete
   */
  export type SpendApprovalRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalRequest
     */
    select?: SpendApprovalRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalRequestInclude<ExtArgs> | null
    /**
     * Filter which SpendApprovalRequest to delete.
     */
    where: SpendApprovalRequestWhereUniqueInput
  }

  /**
   * SpendApprovalRequest deleteMany
   */
  export type SpendApprovalRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SpendApprovalRequests to delete
     */
    where?: SpendApprovalRequestWhereInput
  }

  /**
   * SpendApprovalRequest.votes
   */
  export type SpendApprovalRequest$votesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalVote
     */
    select?: SpendApprovalVoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalVoteInclude<ExtArgs> | null
    where?: SpendApprovalVoteWhereInput
    orderBy?: SpendApprovalVoteOrderByWithRelationInput | SpendApprovalVoteOrderByWithRelationInput[]
    cursor?: SpendApprovalVoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpendApprovalVoteScalarFieldEnum | SpendApprovalVoteScalarFieldEnum[]
  }

  /**
   * SpendApprovalRequest without action
   */
  export type SpendApprovalRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalRequest
     */
    select?: SpendApprovalRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalRequestInclude<ExtArgs> | null
  }


  /**
   * Model SpendApprovalVote
   */

  export type AggregateSpendApprovalVote = {
    _count: SpendApprovalVoteCountAggregateOutputType | null
    _min: SpendApprovalVoteMinAggregateOutputType | null
    _max: SpendApprovalVoteMaxAggregateOutputType | null
  }

  export type SpendApprovalVoteMinAggregateOutputType = {
    id: string | null
    requestId: string | null
    approverId: string | null
    createdAt: Date | null
  }

  export type SpendApprovalVoteMaxAggregateOutputType = {
    id: string | null
    requestId: string | null
    approverId: string | null
    createdAt: Date | null
  }

  export type SpendApprovalVoteCountAggregateOutputType = {
    id: number
    requestId: number
    approverId: number
    createdAt: number
    _all: number
  }


  export type SpendApprovalVoteMinAggregateInputType = {
    id?: true
    requestId?: true
    approverId?: true
    createdAt?: true
  }

  export type SpendApprovalVoteMaxAggregateInputType = {
    id?: true
    requestId?: true
    approverId?: true
    createdAt?: true
  }

  export type SpendApprovalVoteCountAggregateInputType = {
    id?: true
    requestId?: true
    approverId?: true
    createdAt?: true
    _all?: true
  }

  export type SpendApprovalVoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SpendApprovalVote to aggregate.
     */
    where?: SpendApprovalVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpendApprovalVotes to fetch.
     */
    orderBy?: SpendApprovalVoteOrderByWithRelationInput | SpendApprovalVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpendApprovalVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpendApprovalVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpendApprovalVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SpendApprovalVotes
    **/
    _count?: true | SpendApprovalVoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpendApprovalVoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpendApprovalVoteMaxAggregateInputType
  }

  export type GetSpendApprovalVoteAggregateType<T extends SpendApprovalVoteAggregateArgs> = {
        [P in keyof T & keyof AggregateSpendApprovalVote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpendApprovalVote[P]>
      : GetScalarType<T[P], AggregateSpendApprovalVote[P]>
  }




  export type SpendApprovalVoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpendApprovalVoteWhereInput
    orderBy?: SpendApprovalVoteOrderByWithAggregationInput | SpendApprovalVoteOrderByWithAggregationInput[]
    by: SpendApprovalVoteScalarFieldEnum[] | SpendApprovalVoteScalarFieldEnum
    having?: SpendApprovalVoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpendApprovalVoteCountAggregateInputType | true
    _min?: SpendApprovalVoteMinAggregateInputType
    _max?: SpendApprovalVoteMaxAggregateInputType
  }

  export type SpendApprovalVoteGroupByOutputType = {
    id: string
    requestId: string
    approverId: string
    createdAt: Date
    _count: SpendApprovalVoteCountAggregateOutputType | null
    _min: SpendApprovalVoteMinAggregateOutputType | null
    _max: SpendApprovalVoteMaxAggregateOutputType | null
  }

  type GetSpendApprovalVoteGroupByPayload<T extends SpendApprovalVoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpendApprovalVoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpendApprovalVoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpendApprovalVoteGroupByOutputType[P]>
            : GetScalarType<T[P], SpendApprovalVoteGroupByOutputType[P]>
        }
      >
    >


  export type SpendApprovalVoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    approverId?: boolean
    createdAt?: boolean
    request?: boolean | SpendApprovalRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spendApprovalVote"]>

  export type SpendApprovalVoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    approverId?: boolean
    createdAt?: boolean
    request?: boolean | SpendApprovalRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spendApprovalVote"]>

  export type SpendApprovalVoteSelectScalar = {
    id?: boolean
    requestId?: boolean
    approverId?: boolean
    createdAt?: boolean
  }

  export type SpendApprovalVoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | SpendApprovalRequestDefaultArgs<ExtArgs>
  }
  export type SpendApprovalVoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | SpendApprovalRequestDefaultArgs<ExtArgs>
  }

  export type $SpendApprovalVotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SpendApprovalVote"
    objects: {
      request: Prisma.$SpendApprovalRequestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      requestId: string
      approverId: string
      createdAt: Date
    }, ExtArgs["result"]["spendApprovalVote"]>
    composites: {}
  }

  type SpendApprovalVoteGetPayload<S extends boolean | null | undefined | SpendApprovalVoteDefaultArgs> = $Result.GetResult<Prisma.$SpendApprovalVotePayload, S>

  type SpendApprovalVoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SpendApprovalVoteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SpendApprovalVoteCountAggregateInputType | true
    }

  export interface SpendApprovalVoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SpendApprovalVote'], meta: { name: 'SpendApprovalVote' } }
    /**
     * Find zero or one SpendApprovalVote that matches the filter.
     * @param {SpendApprovalVoteFindUniqueArgs} args - Arguments to find a SpendApprovalVote
     * @example
     * // Get one SpendApprovalVote
     * const spendApprovalVote = await prisma.spendApprovalVote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpendApprovalVoteFindUniqueArgs>(args: SelectSubset<T, SpendApprovalVoteFindUniqueArgs<ExtArgs>>): Prisma__SpendApprovalVoteClient<$Result.GetResult<Prisma.$SpendApprovalVotePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SpendApprovalVote that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SpendApprovalVoteFindUniqueOrThrowArgs} args - Arguments to find a SpendApprovalVote
     * @example
     * // Get one SpendApprovalVote
     * const spendApprovalVote = await prisma.spendApprovalVote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpendApprovalVoteFindUniqueOrThrowArgs>(args: SelectSubset<T, SpendApprovalVoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpendApprovalVoteClient<$Result.GetResult<Prisma.$SpendApprovalVotePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SpendApprovalVote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpendApprovalVoteFindFirstArgs} args - Arguments to find a SpendApprovalVote
     * @example
     * // Get one SpendApprovalVote
     * const spendApprovalVote = await prisma.spendApprovalVote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpendApprovalVoteFindFirstArgs>(args?: SelectSubset<T, SpendApprovalVoteFindFirstArgs<ExtArgs>>): Prisma__SpendApprovalVoteClient<$Result.GetResult<Prisma.$SpendApprovalVotePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SpendApprovalVote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpendApprovalVoteFindFirstOrThrowArgs} args - Arguments to find a SpendApprovalVote
     * @example
     * // Get one SpendApprovalVote
     * const spendApprovalVote = await prisma.spendApprovalVote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpendApprovalVoteFindFirstOrThrowArgs>(args?: SelectSubset<T, SpendApprovalVoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpendApprovalVoteClient<$Result.GetResult<Prisma.$SpendApprovalVotePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SpendApprovalVotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpendApprovalVoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SpendApprovalVotes
     * const spendApprovalVotes = await prisma.spendApprovalVote.findMany()
     * 
     * // Get first 10 SpendApprovalVotes
     * const spendApprovalVotes = await prisma.spendApprovalVote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spendApprovalVoteWithIdOnly = await prisma.spendApprovalVote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpendApprovalVoteFindManyArgs>(args?: SelectSubset<T, SpendApprovalVoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpendApprovalVotePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SpendApprovalVote.
     * @param {SpendApprovalVoteCreateArgs} args - Arguments to create a SpendApprovalVote.
     * @example
     * // Create one SpendApprovalVote
     * const SpendApprovalVote = await prisma.spendApprovalVote.create({
     *   data: {
     *     // ... data to create a SpendApprovalVote
     *   }
     * })
     * 
     */
    create<T extends SpendApprovalVoteCreateArgs>(args: SelectSubset<T, SpendApprovalVoteCreateArgs<ExtArgs>>): Prisma__SpendApprovalVoteClient<$Result.GetResult<Prisma.$SpendApprovalVotePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SpendApprovalVotes.
     * @param {SpendApprovalVoteCreateManyArgs} args - Arguments to create many SpendApprovalVotes.
     * @example
     * // Create many SpendApprovalVotes
     * const spendApprovalVote = await prisma.spendApprovalVote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpendApprovalVoteCreateManyArgs>(args?: SelectSubset<T, SpendApprovalVoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SpendApprovalVotes and returns the data saved in the database.
     * @param {SpendApprovalVoteCreateManyAndReturnArgs} args - Arguments to create many SpendApprovalVotes.
     * @example
     * // Create many SpendApprovalVotes
     * const spendApprovalVote = await prisma.spendApprovalVote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SpendApprovalVotes and only return the `id`
     * const spendApprovalVoteWithIdOnly = await prisma.spendApprovalVote.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SpendApprovalVoteCreateManyAndReturnArgs>(args?: SelectSubset<T, SpendApprovalVoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpendApprovalVotePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SpendApprovalVote.
     * @param {SpendApprovalVoteDeleteArgs} args - Arguments to delete one SpendApprovalVote.
     * @example
     * // Delete one SpendApprovalVote
     * const SpendApprovalVote = await prisma.spendApprovalVote.delete({
     *   where: {
     *     // ... filter to delete one SpendApprovalVote
     *   }
     * })
     * 
     */
    delete<T extends SpendApprovalVoteDeleteArgs>(args: SelectSubset<T, SpendApprovalVoteDeleteArgs<ExtArgs>>): Prisma__SpendApprovalVoteClient<$Result.GetResult<Prisma.$SpendApprovalVotePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SpendApprovalVote.
     * @param {SpendApprovalVoteUpdateArgs} args - Arguments to update one SpendApprovalVote.
     * @example
     * // Update one SpendApprovalVote
     * const spendApprovalVote = await prisma.spendApprovalVote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpendApprovalVoteUpdateArgs>(args: SelectSubset<T, SpendApprovalVoteUpdateArgs<ExtArgs>>): Prisma__SpendApprovalVoteClient<$Result.GetResult<Prisma.$SpendApprovalVotePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SpendApprovalVotes.
     * @param {SpendApprovalVoteDeleteManyArgs} args - Arguments to filter SpendApprovalVotes to delete.
     * @example
     * // Delete a few SpendApprovalVotes
     * const { count } = await prisma.spendApprovalVote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpendApprovalVoteDeleteManyArgs>(args?: SelectSubset<T, SpendApprovalVoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SpendApprovalVotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpendApprovalVoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SpendApprovalVotes
     * const spendApprovalVote = await prisma.spendApprovalVote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpendApprovalVoteUpdateManyArgs>(args: SelectSubset<T, SpendApprovalVoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SpendApprovalVote.
     * @param {SpendApprovalVoteUpsertArgs} args - Arguments to update or create a SpendApprovalVote.
     * @example
     * // Update or create a SpendApprovalVote
     * const spendApprovalVote = await prisma.spendApprovalVote.upsert({
     *   create: {
     *     // ... data to create a SpendApprovalVote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SpendApprovalVote we want to update
     *   }
     * })
     */
    upsert<T extends SpendApprovalVoteUpsertArgs>(args: SelectSubset<T, SpendApprovalVoteUpsertArgs<ExtArgs>>): Prisma__SpendApprovalVoteClient<$Result.GetResult<Prisma.$SpendApprovalVotePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SpendApprovalVotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpendApprovalVoteCountArgs} args - Arguments to filter SpendApprovalVotes to count.
     * @example
     * // Count the number of SpendApprovalVotes
     * const count = await prisma.spendApprovalVote.count({
     *   where: {
     *     // ... the filter for the SpendApprovalVotes we want to count
     *   }
     * })
    **/
    count<T extends SpendApprovalVoteCountArgs>(
      args?: Subset<T, SpendApprovalVoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpendApprovalVoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SpendApprovalVote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpendApprovalVoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpendApprovalVoteAggregateArgs>(args: Subset<T, SpendApprovalVoteAggregateArgs>): Prisma.PrismaPromise<GetSpendApprovalVoteAggregateType<T>>

    /**
     * Group by SpendApprovalVote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpendApprovalVoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SpendApprovalVoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpendApprovalVoteGroupByArgs['orderBy'] }
        : { orderBy?: SpendApprovalVoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SpendApprovalVoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpendApprovalVoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SpendApprovalVote model
   */
  readonly fields: SpendApprovalVoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SpendApprovalVote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpendApprovalVoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    request<T extends SpendApprovalRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SpendApprovalRequestDefaultArgs<ExtArgs>>): Prisma__SpendApprovalRequestClient<$Result.GetResult<Prisma.$SpendApprovalRequestPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SpendApprovalVote model
   */ 
  interface SpendApprovalVoteFieldRefs {
    readonly id: FieldRef<"SpendApprovalVote", 'String'>
    readonly requestId: FieldRef<"SpendApprovalVote", 'String'>
    readonly approverId: FieldRef<"SpendApprovalVote", 'String'>
    readonly createdAt: FieldRef<"SpendApprovalVote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SpendApprovalVote findUnique
   */
  export type SpendApprovalVoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalVote
     */
    select?: SpendApprovalVoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalVoteInclude<ExtArgs> | null
    /**
     * Filter, which SpendApprovalVote to fetch.
     */
    where: SpendApprovalVoteWhereUniqueInput
  }

  /**
   * SpendApprovalVote findUniqueOrThrow
   */
  export type SpendApprovalVoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalVote
     */
    select?: SpendApprovalVoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalVoteInclude<ExtArgs> | null
    /**
     * Filter, which SpendApprovalVote to fetch.
     */
    where: SpendApprovalVoteWhereUniqueInput
  }

  /**
   * SpendApprovalVote findFirst
   */
  export type SpendApprovalVoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalVote
     */
    select?: SpendApprovalVoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalVoteInclude<ExtArgs> | null
    /**
     * Filter, which SpendApprovalVote to fetch.
     */
    where?: SpendApprovalVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpendApprovalVotes to fetch.
     */
    orderBy?: SpendApprovalVoteOrderByWithRelationInput | SpendApprovalVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SpendApprovalVotes.
     */
    cursor?: SpendApprovalVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpendApprovalVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpendApprovalVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SpendApprovalVotes.
     */
    distinct?: SpendApprovalVoteScalarFieldEnum | SpendApprovalVoteScalarFieldEnum[]
  }

  /**
   * SpendApprovalVote findFirstOrThrow
   */
  export type SpendApprovalVoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalVote
     */
    select?: SpendApprovalVoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalVoteInclude<ExtArgs> | null
    /**
     * Filter, which SpendApprovalVote to fetch.
     */
    where?: SpendApprovalVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpendApprovalVotes to fetch.
     */
    orderBy?: SpendApprovalVoteOrderByWithRelationInput | SpendApprovalVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SpendApprovalVotes.
     */
    cursor?: SpendApprovalVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpendApprovalVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpendApprovalVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SpendApprovalVotes.
     */
    distinct?: SpendApprovalVoteScalarFieldEnum | SpendApprovalVoteScalarFieldEnum[]
  }

  /**
   * SpendApprovalVote findMany
   */
  export type SpendApprovalVoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalVote
     */
    select?: SpendApprovalVoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalVoteInclude<ExtArgs> | null
    /**
     * Filter, which SpendApprovalVotes to fetch.
     */
    where?: SpendApprovalVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpendApprovalVotes to fetch.
     */
    orderBy?: SpendApprovalVoteOrderByWithRelationInput | SpendApprovalVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SpendApprovalVotes.
     */
    cursor?: SpendApprovalVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpendApprovalVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpendApprovalVotes.
     */
    skip?: number
    distinct?: SpendApprovalVoteScalarFieldEnum | SpendApprovalVoteScalarFieldEnum[]
  }

  /**
   * SpendApprovalVote create
   */
  export type SpendApprovalVoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalVote
     */
    select?: SpendApprovalVoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalVoteInclude<ExtArgs> | null
    /**
     * The data needed to create a SpendApprovalVote.
     */
    data: XOR<SpendApprovalVoteCreateInput, SpendApprovalVoteUncheckedCreateInput>
  }

  /**
   * SpendApprovalVote createMany
   */
  export type SpendApprovalVoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SpendApprovalVotes.
     */
    data: SpendApprovalVoteCreateManyInput | SpendApprovalVoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SpendApprovalVote createManyAndReturn
   */
  export type SpendApprovalVoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalVote
     */
    select?: SpendApprovalVoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SpendApprovalVotes.
     */
    data: SpendApprovalVoteCreateManyInput | SpendApprovalVoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalVoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SpendApprovalVote update
   */
  export type SpendApprovalVoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalVote
     */
    select?: SpendApprovalVoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalVoteInclude<ExtArgs> | null
    /**
     * The data needed to update a SpendApprovalVote.
     */
    data: XOR<SpendApprovalVoteUpdateInput, SpendApprovalVoteUncheckedUpdateInput>
    /**
     * Choose, which SpendApprovalVote to update.
     */
    where: SpendApprovalVoteWhereUniqueInput
  }

  /**
   * SpendApprovalVote updateMany
   */
  export type SpendApprovalVoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SpendApprovalVotes.
     */
    data: XOR<SpendApprovalVoteUpdateManyMutationInput, SpendApprovalVoteUncheckedUpdateManyInput>
    /**
     * Filter which SpendApprovalVotes to update
     */
    where?: SpendApprovalVoteWhereInput
  }

  /**
   * SpendApprovalVote upsert
   */
  export type SpendApprovalVoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalVote
     */
    select?: SpendApprovalVoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalVoteInclude<ExtArgs> | null
    /**
     * The filter to search for the SpendApprovalVote to update in case it exists.
     */
    where: SpendApprovalVoteWhereUniqueInput
    /**
     * In case the SpendApprovalVote found by the `where` argument doesn't exist, create a new SpendApprovalVote with this data.
     */
    create: XOR<SpendApprovalVoteCreateInput, SpendApprovalVoteUncheckedCreateInput>
    /**
     * In case the SpendApprovalVote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpendApprovalVoteUpdateInput, SpendApprovalVoteUncheckedUpdateInput>
  }

  /**
   * SpendApprovalVote delete
   */
  export type SpendApprovalVoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalVote
     */
    select?: SpendApprovalVoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalVoteInclude<ExtArgs> | null
    /**
     * Filter which SpendApprovalVote to delete.
     */
    where: SpendApprovalVoteWhereUniqueInput
  }

  /**
   * SpendApprovalVote deleteMany
   */
  export type SpendApprovalVoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SpendApprovalVotes to delete
     */
    where?: SpendApprovalVoteWhereInput
  }

  /**
   * SpendApprovalVote without action
   */
  export type SpendApprovalVoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpendApprovalVote
     */
    select?: SpendApprovalVoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpendApprovalVoteInclude<ExtArgs> | null
  }


  /**
   * Model AgentService
   */

  export type AggregateAgentService = {
    _count: AgentServiceCountAggregateOutputType | null
    _avg: AgentServiceAvgAggregateOutputType | null
    _sum: AgentServiceSumAggregateOutputType | null
    _min: AgentServiceMinAggregateOutputType | null
    _max: AgentServiceMaxAggregateOutputType | null
  }

  export type AgentServiceAvgAggregateOutputType = {
    priceMinor: number | null
  }

  export type AgentServiceSumAggregateOutputType = {
    priceMinor: bigint | null
  }

  export type AgentServiceMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    name: string | null
    description: string | null
    priceMinor: bigint | null
    currency: string | null
    status: $Enums.AgentServiceStatus | null
    createdAt: Date | null
  }

  export type AgentServiceMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    name: string | null
    description: string | null
    priceMinor: bigint | null
    currency: string | null
    status: $Enums.AgentServiceStatus | null
    createdAt: Date | null
  }

  export type AgentServiceCountAggregateOutputType = {
    id: number
    agentId: number
    name: number
    description: number
    priceMinor: number
    currency: number
    capability: number
    status: number
    createdAt: number
    _all: number
  }


  export type AgentServiceAvgAggregateInputType = {
    priceMinor?: true
  }

  export type AgentServiceSumAggregateInputType = {
    priceMinor?: true
  }

  export type AgentServiceMinAggregateInputType = {
    id?: true
    agentId?: true
    name?: true
    description?: true
    priceMinor?: true
    currency?: true
    status?: true
    createdAt?: true
  }

  export type AgentServiceMaxAggregateInputType = {
    id?: true
    agentId?: true
    name?: true
    description?: true
    priceMinor?: true
    currency?: true
    status?: true
    createdAt?: true
  }

  export type AgentServiceCountAggregateInputType = {
    id?: true
    agentId?: true
    name?: true
    description?: true
    priceMinor?: true
    currency?: true
    capability?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type AgentServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentService to aggregate.
     */
    where?: AgentServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentServices to fetch.
     */
    orderBy?: AgentServiceOrderByWithRelationInput | AgentServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentServices
    **/
    _count?: true | AgentServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentServiceMaxAggregateInputType
  }

  export type GetAgentServiceAggregateType<T extends AgentServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentService[P]>
      : GetScalarType<T[P], AggregateAgentService[P]>
  }




  export type AgentServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentServiceWhereInput
    orderBy?: AgentServiceOrderByWithAggregationInput | AgentServiceOrderByWithAggregationInput[]
    by: AgentServiceScalarFieldEnum[] | AgentServiceScalarFieldEnum
    having?: AgentServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentServiceCountAggregateInputType | true
    _avg?: AgentServiceAvgAggregateInputType
    _sum?: AgentServiceSumAggregateInputType
    _min?: AgentServiceMinAggregateInputType
    _max?: AgentServiceMaxAggregateInputType
  }

  export type AgentServiceGroupByOutputType = {
    id: string
    agentId: string
    name: string
    description: string | null
    priceMinor: bigint
    currency: string
    capability: JsonValue | null
    status: $Enums.AgentServiceStatus
    createdAt: Date
    _count: AgentServiceCountAggregateOutputType | null
    _avg: AgentServiceAvgAggregateOutputType | null
    _sum: AgentServiceSumAggregateOutputType | null
    _min: AgentServiceMinAggregateOutputType | null
    _max: AgentServiceMaxAggregateOutputType | null
  }

  type GetAgentServiceGroupByPayload<T extends AgentServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentServiceGroupByOutputType[P]>
            : GetScalarType<T[P], AgentServiceGroupByOutputType[P]>
        }
      >
    >


  export type AgentServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    name?: boolean
    description?: boolean
    priceMinor?: boolean
    currency?: boolean
    capability?: boolean
    status?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    subscriptions?: boolean | AgentService$subscriptionsArgs<ExtArgs>
    listings?: boolean | AgentService$listingsArgs<ExtArgs>
    _count?: boolean | AgentServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentService"]>

  export type AgentServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    name?: boolean
    description?: boolean
    priceMinor?: boolean
    currency?: boolean
    capability?: boolean
    status?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentService"]>

  export type AgentServiceSelectScalar = {
    id?: boolean
    agentId?: boolean
    name?: boolean
    description?: boolean
    priceMinor?: boolean
    currency?: boolean
    capability?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type AgentServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    subscriptions?: boolean | AgentService$subscriptionsArgs<ExtArgs>
    listings?: boolean | AgentService$listingsArgs<ExtArgs>
    _count?: boolean | AgentServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AgentServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $AgentServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentService"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
      subscriptions: Prisma.$AgentSubscriptionPayload<ExtArgs>[]
      listings: Prisma.$AgentMarketplaceListingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      name: string
      description: string | null
      priceMinor: bigint
      currency: string
      capability: Prisma.JsonValue | null
      status: $Enums.AgentServiceStatus
      createdAt: Date
    }, ExtArgs["result"]["agentService"]>
    composites: {}
  }

  type AgentServiceGetPayload<S extends boolean | null | undefined | AgentServiceDefaultArgs> = $Result.GetResult<Prisma.$AgentServicePayload, S>

  type AgentServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AgentServiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AgentServiceCountAggregateInputType | true
    }

  export interface AgentServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentService'], meta: { name: 'AgentService' } }
    /**
     * Find zero or one AgentService that matches the filter.
     * @param {AgentServiceFindUniqueArgs} args - Arguments to find a AgentService
     * @example
     * // Get one AgentService
     * const agentService = await prisma.agentService.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentServiceFindUniqueArgs>(args: SelectSubset<T, AgentServiceFindUniqueArgs<ExtArgs>>): Prisma__AgentServiceClient<$Result.GetResult<Prisma.$AgentServicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AgentService that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AgentServiceFindUniqueOrThrowArgs} args - Arguments to find a AgentService
     * @example
     * // Get one AgentService
     * const agentService = await prisma.agentService.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentServiceClient<$Result.GetResult<Prisma.$AgentServicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AgentService that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentServiceFindFirstArgs} args - Arguments to find a AgentService
     * @example
     * // Get one AgentService
     * const agentService = await prisma.agentService.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentServiceFindFirstArgs>(args?: SelectSubset<T, AgentServiceFindFirstArgs<ExtArgs>>): Prisma__AgentServiceClient<$Result.GetResult<Prisma.$AgentServicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AgentService that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentServiceFindFirstOrThrowArgs} args - Arguments to find a AgentService
     * @example
     * // Get one AgentService
     * const agentService = await prisma.agentService.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentServiceClient<$Result.GetResult<Prisma.$AgentServicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AgentServices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentServices
     * const agentServices = await prisma.agentService.findMany()
     * 
     * // Get first 10 AgentServices
     * const agentServices = await prisma.agentService.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentServiceWithIdOnly = await prisma.agentService.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentServiceFindManyArgs>(args?: SelectSubset<T, AgentServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentServicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AgentService.
     * @param {AgentServiceCreateArgs} args - Arguments to create a AgentService.
     * @example
     * // Create one AgentService
     * const AgentService = await prisma.agentService.create({
     *   data: {
     *     // ... data to create a AgentService
     *   }
     * })
     * 
     */
    create<T extends AgentServiceCreateArgs>(args: SelectSubset<T, AgentServiceCreateArgs<ExtArgs>>): Prisma__AgentServiceClient<$Result.GetResult<Prisma.$AgentServicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AgentServices.
     * @param {AgentServiceCreateManyArgs} args - Arguments to create many AgentServices.
     * @example
     * // Create many AgentServices
     * const agentService = await prisma.agentService.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentServiceCreateManyArgs>(args?: SelectSubset<T, AgentServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentServices and returns the data saved in the database.
     * @param {AgentServiceCreateManyAndReturnArgs} args - Arguments to create many AgentServices.
     * @example
     * // Create many AgentServices
     * const agentService = await prisma.agentService.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentServices and only return the `id`
     * const agentServiceWithIdOnly = await prisma.agentService.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentServicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AgentService.
     * @param {AgentServiceDeleteArgs} args - Arguments to delete one AgentService.
     * @example
     * // Delete one AgentService
     * const AgentService = await prisma.agentService.delete({
     *   where: {
     *     // ... filter to delete one AgentService
     *   }
     * })
     * 
     */
    delete<T extends AgentServiceDeleteArgs>(args: SelectSubset<T, AgentServiceDeleteArgs<ExtArgs>>): Prisma__AgentServiceClient<$Result.GetResult<Prisma.$AgentServicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AgentService.
     * @param {AgentServiceUpdateArgs} args - Arguments to update one AgentService.
     * @example
     * // Update one AgentService
     * const agentService = await prisma.agentService.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentServiceUpdateArgs>(args: SelectSubset<T, AgentServiceUpdateArgs<ExtArgs>>): Prisma__AgentServiceClient<$Result.GetResult<Prisma.$AgentServicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AgentServices.
     * @param {AgentServiceDeleteManyArgs} args - Arguments to filter AgentServices to delete.
     * @example
     * // Delete a few AgentServices
     * const { count } = await prisma.agentService.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentServiceDeleteManyArgs>(args?: SelectSubset<T, AgentServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentServices
     * const agentService = await prisma.agentService.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentServiceUpdateManyArgs>(args: SelectSubset<T, AgentServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AgentService.
     * @param {AgentServiceUpsertArgs} args - Arguments to update or create a AgentService.
     * @example
     * // Update or create a AgentService
     * const agentService = await prisma.agentService.upsert({
     *   create: {
     *     // ... data to create a AgentService
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentService we want to update
     *   }
     * })
     */
    upsert<T extends AgentServiceUpsertArgs>(args: SelectSubset<T, AgentServiceUpsertArgs<ExtArgs>>): Prisma__AgentServiceClient<$Result.GetResult<Prisma.$AgentServicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AgentServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentServiceCountArgs} args - Arguments to filter AgentServices to count.
     * @example
     * // Count the number of AgentServices
     * const count = await prisma.agentService.count({
     *   where: {
     *     // ... the filter for the AgentServices we want to count
     *   }
     * })
    **/
    count<T extends AgentServiceCountArgs>(
      args?: Subset<T, AgentServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentServiceAggregateArgs>(args: Subset<T, AgentServiceAggregateArgs>): Prisma.PrismaPromise<GetAgentServiceAggregateType<T>>

    /**
     * Group by AgentService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentServiceGroupByArgs['orderBy'] }
        : { orderBy?: AgentServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentService model
   */
  readonly fields: AgentServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentService.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    subscriptions<T extends AgentService$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, AgentService$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentSubscriptionPayload<ExtArgs>, T, "findMany"> | Null>
    listings<T extends AgentService$listingsArgs<ExtArgs> = {}>(args?: Subset<T, AgentService$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentMarketplaceListingPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentService model
   */ 
  interface AgentServiceFieldRefs {
    readonly id: FieldRef<"AgentService", 'String'>
    readonly agentId: FieldRef<"AgentService", 'String'>
    readonly name: FieldRef<"AgentService", 'String'>
    readonly description: FieldRef<"AgentService", 'String'>
    readonly priceMinor: FieldRef<"AgentService", 'BigInt'>
    readonly currency: FieldRef<"AgentService", 'String'>
    readonly capability: FieldRef<"AgentService", 'Json'>
    readonly status: FieldRef<"AgentService", 'AgentServiceStatus'>
    readonly createdAt: FieldRef<"AgentService", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentService findUnique
   */
  export type AgentServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentService
     */
    select?: AgentServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentServiceInclude<ExtArgs> | null
    /**
     * Filter, which AgentService to fetch.
     */
    where: AgentServiceWhereUniqueInput
  }

  /**
   * AgentService findUniqueOrThrow
   */
  export type AgentServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentService
     */
    select?: AgentServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentServiceInclude<ExtArgs> | null
    /**
     * Filter, which AgentService to fetch.
     */
    where: AgentServiceWhereUniqueInput
  }

  /**
   * AgentService findFirst
   */
  export type AgentServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentService
     */
    select?: AgentServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentServiceInclude<ExtArgs> | null
    /**
     * Filter, which AgentService to fetch.
     */
    where?: AgentServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentServices to fetch.
     */
    orderBy?: AgentServiceOrderByWithRelationInput | AgentServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentServices.
     */
    cursor?: AgentServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentServices.
     */
    distinct?: AgentServiceScalarFieldEnum | AgentServiceScalarFieldEnum[]
  }

  /**
   * AgentService findFirstOrThrow
   */
  export type AgentServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentService
     */
    select?: AgentServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentServiceInclude<ExtArgs> | null
    /**
     * Filter, which AgentService to fetch.
     */
    where?: AgentServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentServices to fetch.
     */
    orderBy?: AgentServiceOrderByWithRelationInput | AgentServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentServices.
     */
    cursor?: AgentServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentServices.
     */
    distinct?: AgentServiceScalarFieldEnum | AgentServiceScalarFieldEnum[]
  }

  /**
   * AgentService findMany
   */
  export type AgentServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentService
     */
    select?: AgentServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentServiceInclude<ExtArgs> | null
    /**
     * Filter, which AgentServices to fetch.
     */
    where?: AgentServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentServices to fetch.
     */
    orderBy?: AgentServiceOrderByWithRelationInput | AgentServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentServices.
     */
    cursor?: AgentServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentServices.
     */
    skip?: number
    distinct?: AgentServiceScalarFieldEnum | AgentServiceScalarFieldEnum[]
  }

  /**
   * AgentService create
   */
  export type AgentServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentService
     */
    select?: AgentServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentService.
     */
    data: XOR<AgentServiceCreateInput, AgentServiceUncheckedCreateInput>
  }

  /**
   * AgentService createMany
   */
  export type AgentServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentServices.
     */
    data: AgentServiceCreateManyInput | AgentServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentService createManyAndReturn
   */
  export type AgentServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentService
     */
    select?: AgentServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AgentServices.
     */
    data: AgentServiceCreateManyInput | AgentServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentService update
   */
  export type AgentServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentService
     */
    select?: AgentServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentService.
     */
    data: XOR<AgentServiceUpdateInput, AgentServiceUncheckedUpdateInput>
    /**
     * Choose, which AgentService to update.
     */
    where: AgentServiceWhereUniqueInput
  }

  /**
   * AgentService updateMany
   */
  export type AgentServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentServices.
     */
    data: XOR<AgentServiceUpdateManyMutationInput, AgentServiceUncheckedUpdateManyInput>
    /**
     * Filter which AgentServices to update
     */
    where?: AgentServiceWhereInput
  }

  /**
   * AgentService upsert
   */
  export type AgentServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentService
     */
    select?: AgentServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentService to update in case it exists.
     */
    where: AgentServiceWhereUniqueInput
    /**
     * In case the AgentService found by the `where` argument doesn't exist, create a new AgentService with this data.
     */
    create: XOR<AgentServiceCreateInput, AgentServiceUncheckedCreateInput>
    /**
     * In case the AgentService was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentServiceUpdateInput, AgentServiceUncheckedUpdateInput>
  }

  /**
   * AgentService delete
   */
  export type AgentServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentService
     */
    select?: AgentServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentServiceInclude<ExtArgs> | null
    /**
     * Filter which AgentService to delete.
     */
    where: AgentServiceWhereUniqueInput
  }

  /**
   * AgentService deleteMany
   */
  export type AgentServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentServices to delete
     */
    where?: AgentServiceWhereInput
  }

  /**
   * AgentService.subscriptions
   */
  export type AgentService$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSubscription
     */
    select?: AgentSubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSubscriptionInclude<ExtArgs> | null
    where?: AgentSubscriptionWhereInput
    orderBy?: AgentSubscriptionOrderByWithRelationInput | AgentSubscriptionOrderByWithRelationInput[]
    cursor?: AgentSubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentSubscriptionScalarFieldEnum | AgentSubscriptionScalarFieldEnum[]
  }

  /**
   * AgentService.listings
   */
  export type AgentService$listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMarketplaceListing
     */
    select?: AgentMarketplaceListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMarketplaceListingInclude<ExtArgs> | null
    where?: AgentMarketplaceListingWhereInput
    orderBy?: AgentMarketplaceListingOrderByWithRelationInput | AgentMarketplaceListingOrderByWithRelationInput[]
    cursor?: AgentMarketplaceListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentMarketplaceListingScalarFieldEnum | AgentMarketplaceListingScalarFieldEnum[]
  }

  /**
   * AgentService without action
   */
  export type AgentServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentService
     */
    select?: AgentServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentServiceInclude<ExtArgs> | null
  }


  /**
   * Model AgentSubscription
   */

  export type AggregateAgentSubscription = {
    _count: AgentSubscriptionCountAggregateOutputType | null
    _min: AgentSubscriptionMinAggregateOutputType | null
    _max: AgentSubscriptionMaxAggregateOutputType | null
  }

  export type AgentSubscriptionMinAggregateOutputType = {
    id: string | null
    serviceId: string | null
    subscriberAgentId: string | null
    status: $Enums.SubscriptionStatus | null
    renewAt: Date | null
    intentId: string | null
    createdAt: Date | null
  }

  export type AgentSubscriptionMaxAggregateOutputType = {
    id: string | null
    serviceId: string | null
    subscriberAgentId: string | null
    status: $Enums.SubscriptionStatus | null
    renewAt: Date | null
    intentId: string | null
    createdAt: Date | null
  }

  export type AgentSubscriptionCountAggregateOutputType = {
    id: number
    serviceId: number
    subscriberAgentId: number
    status: number
    renewAt: number
    intentId: number
    createdAt: number
    _all: number
  }


  export type AgentSubscriptionMinAggregateInputType = {
    id?: true
    serviceId?: true
    subscriberAgentId?: true
    status?: true
    renewAt?: true
    intentId?: true
    createdAt?: true
  }

  export type AgentSubscriptionMaxAggregateInputType = {
    id?: true
    serviceId?: true
    subscriberAgentId?: true
    status?: true
    renewAt?: true
    intentId?: true
    createdAt?: true
  }

  export type AgentSubscriptionCountAggregateInputType = {
    id?: true
    serviceId?: true
    subscriberAgentId?: true
    status?: true
    renewAt?: true
    intentId?: true
    createdAt?: true
    _all?: true
  }

  export type AgentSubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentSubscription to aggregate.
     */
    where?: AgentSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentSubscriptions to fetch.
     */
    orderBy?: AgentSubscriptionOrderByWithRelationInput | AgentSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentSubscriptions
    **/
    _count?: true | AgentSubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentSubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentSubscriptionMaxAggregateInputType
  }

  export type GetAgentSubscriptionAggregateType<T extends AgentSubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentSubscription[P]>
      : GetScalarType<T[P], AggregateAgentSubscription[P]>
  }




  export type AgentSubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentSubscriptionWhereInput
    orderBy?: AgentSubscriptionOrderByWithAggregationInput | AgentSubscriptionOrderByWithAggregationInput[]
    by: AgentSubscriptionScalarFieldEnum[] | AgentSubscriptionScalarFieldEnum
    having?: AgentSubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentSubscriptionCountAggregateInputType | true
    _min?: AgentSubscriptionMinAggregateInputType
    _max?: AgentSubscriptionMaxAggregateInputType
  }

  export type AgentSubscriptionGroupByOutputType = {
    id: string
    serviceId: string
    subscriberAgentId: string
    status: $Enums.SubscriptionStatus
    renewAt: Date | null
    intentId: string | null
    createdAt: Date
    _count: AgentSubscriptionCountAggregateOutputType | null
    _min: AgentSubscriptionMinAggregateOutputType | null
    _max: AgentSubscriptionMaxAggregateOutputType | null
  }

  type GetAgentSubscriptionGroupByPayload<T extends AgentSubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentSubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentSubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentSubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], AgentSubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type AgentSubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    subscriberAgentId?: boolean
    status?: boolean
    renewAt?: boolean
    intentId?: boolean
    createdAt?: boolean
    service?: boolean | AgentServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentSubscription"]>

  export type AgentSubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    subscriberAgentId?: boolean
    status?: boolean
    renewAt?: boolean
    intentId?: boolean
    createdAt?: boolean
    service?: boolean | AgentServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentSubscription"]>

  export type AgentSubscriptionSelectScalar = {
    id?: boolean
    serviceId?: boolean
    subscriberAgentId?: boolean
    status?: boolean
    renewAt?: boolean
    intentId?: boolean
    createdAt?: boolean
  }

  export type AgentSubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | AgentServiceDefaultArgs<ExtArgs>
  }
  export type AgentSubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | AgentServiceDefaultArgs<ExtArgs>
  }

  export type $AgentSubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentSubscription"
    objects: {
      service: Prisma.$AgentServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      serviceId: string
      subscriberAgentId: string
      status: $Enums.SubscriptionStatus
      renewAt: Date | null
      intentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["agentSubscription"]>
    composites: {}
  }

  type AgentSubscriptionGetPayload<S extends boolean | null | undefined | AgentSubscriptionDefaultArgs> = $Result.GetResult<Prisma.$AgentSubscriptionPayload, S>

  type AgentSubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AgentSubscriptionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AgentSubscriptionCountAggregateInputType | true
    }

  export interface AgentSubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentSubscription'], meta: { name: 'AgentSubscription' } }
    /**
     * Find zero or one AgentSubscription that matches the filter.
     * @param {AgentSubscriptionFindUniqueArgs} args - Arguments to find a AgentSubscription
     * @example
     * // Get one AgentSubscription
     * const agentSubscription = await prisma.agentSubscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentSubscriptionFindUniqueArgs>(args: SelectSubset<T, AgentSubscriptionFindUniqueArgs<ExtArgs>>): Prisma__AgentSubscriptionClient<$Result.GetResult<Prisma.$AgentSubscriptionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AgentSubscription that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AgentSubscriptionFindUniqueOrThrowArgs} args - Arguments to find a AgentSubscription
     * @example
     * // Get one AgentSubscription
     * const agentSubscription = await prisma.agentSubscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentSubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentSubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentSubscriptionClient<$Result.GetResult<Prisma.$AgentSubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AgentSubscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentSubscriptionFindFirstArgs} args - Arguments to find a AgentSubscription
     * @example
     * // Get one AgentSubscription
     * const agentSubscription = await prisma.agentSubscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentSubscriptionFindFirstArgs>(args?: SelectSubset<T, AgentSubscriptionFindFirstArgs<ExtArgs>>): Prisma__AgentSubscriptionClient<$Result.GetResult<Prisma.$AgentSubscriptionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AgentSubscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentSubscriptionFindFirstOrThrowArgs} args - Arguments to find a AgentSubscription
     * @example
     * // Get one AgentSubscription
     * const agentSubscription = await prisma.agentSubscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentSubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentSubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentSubscriptionClient<$Result.GetResult<Prisma.$AgentSubscriptionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AgentSubscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentSubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentSubscriptions
     * const agentSubscriptions = await prisma.agentSubscription.findMany()
     * 
     * // Get first 10 AgentSubscriptions
     * const agentSubscriptions = await prisma.agentSubscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentSubscriptionWithIdOnly = await prisma.agentSubscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentSubscriptionFindManyArgs>(args?: SelectSubset<T, AgentSubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentSubscriptionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AgentSubscription.
     * @param {AgentSubscriptionCreateArgs} args - Arguments to create a AgentSubscription.
     * @example
     * // Create one AgentSubscription
     * const AgentSubscription = await prisma.agentSubscription.create({
     *   data: {
     *     // ... data to create a AgentSubscription
     *   }
     * })
     * 
     */
    create<T extends AgentSubscriptionCreateArgs>(args: SelectSubset<T, AgentSubscriptionCreateArgs<ExtArgs>>): Prisma__AgentSubscriptionClient<$Result.GetResult<Prisma.$AgentSubscriptionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AgentSubscriptions.
     * @param {AgentSubscriptionCreateManyArgs} args - Arguments to create many AgentSubscriptions.
     * @example
     * // Create many AgentSubscriptions
     * const agentSubscription = await prisma.agentSubscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentSubscriptionCreateManyArgs>(args?: SelectSubset<T, AgentSubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentSubscriptions and returns the data saved in the database.
     * @param {AgentSubscriptionCreateManyAndReturnArgs} args - Arguments to create many AgentSubscriptions.
     * @example
     * // Create many AgentSubscriptions
     * const agentSubscription = await prisma.agentSubscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentSubscriptions and only return the `id`
     * const agentSubscriptionWithIdOnly = await prisma.agentSubscription.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentSubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentSubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentSubscriptionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AgentSubscription.
     * @param {AgentSubscriptionDeleteArgs} args - Arguments to delete one AgentSubscription.
     * @example
     * // Delete one AgentSubscription
     * const AgentSubscription = await prisma.agentSubscription.delete({
     *   where: {
     *     // ... filter to delete one AgentSubscription
     *   }
     * })
     * 
     */
    delete<T extends AgentSubscriptionDeleteArgs>(args: SelectSubset<T, AgentSubscriptionDeleteArgs<ExtArgs>>): Prisma__AgentSubscriptionClient<$Result.GetResult<Prisma.$AgentSubscriptionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AgentSubscription.
     * @param {AgentSubscriptionUpdateArgs} args - Arguments to update one AgentSubscription.
     * @example
     * // Update one AgentSubscription
     * const agentSubscription = await prisma.agentSubscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentSubscriptionUpdateArgs>(args: SelectSubset<T, AgentSubscriptionUpdateArgs<ExtArgs>>): Prisma__AgentSubscriptionClient<$Result.GetResult<Prisma.$AgentSubscriptionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AgentSubscriptions.
     * @param {AgentSubscriptionDeleteManyArgs} args - Arguments to filter AgentSubscriptions to delete.
     * @example
     * // Delete a few AgentSubscriptions
     * const { count } = await prisma.agentSubscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentSubscriptionDeleteManyArgs>(args?: SelectSubset<T, AgentSubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentSubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentSubscriptions
     * const agentSubscription = await prisma.agentSubscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentSubscriptionUpdateManyArgs>(args: SelectSubset<T, AgentSubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AgentSubscription.
     * @param {AgentSubscriptionUpsertArgs} args - Arguments to update or create a AgentSubscription.
     * @example
     * // Update or create a AgentSubscription
     * const agentSubscription = await prisma.agentSubscription.upsert({
     *   create: {
     *     // ... data to create a AgentSubscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentSubscription we want to update
     *   }
     * })
     */
    upsert<T extends AgentSubscriptionUpsertArgs>(args: SelectSubset<T, AgentSubscriptionUpsertArgs<ExtArgs>>): Prisma__AgentSubscriptionClient<$Result.GetResult<Prisma.$AgentSubscriptionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AgentSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentSubscriptionCountArgs} args - Arguments to filter AgentSubscriptions to count.
     * @example
     * // Count the number of AgentSubscriptions
     * const count = await prisma.agentSubscription.count({
     *   where: {
     *     // ... the filter for the AgentSubscriptions we want to count
     *   }
     * })
    **/
    count<T extends AgentSubscriptionCountArgs>(
      args?: Subset<T, AgentSubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentSubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentSubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentSubscriptionAggregateArgs>(args: Subset<T, AgentSubscriptionAggregateArgs>): Prisma.PrismaPromise<GetAgentSubscriptionAggregateType<T>>

    /**
     * Group by AgentSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentSubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentSubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentSubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: AgentSubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentSubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentSubscription model
   */
  readonly fields: AgentSubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentSubscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentSubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service<T extends AgentServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentServiceDefaultArgs<ExtArgs>>): Prisma__AgentServiceClient<$Result.GetResult<Prisma.$AgentServicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentSubscription model
   */ 
  interface AgentSubscriptionFieldRefs {
    readonly id: FieldRef<"AgentSubscription", 'String'>
    readonly serviceId: FieldRef<"AgentSubscription", 'String'>
    readonly subscriberAgentId: FieldRef<"AgentSubscription", 'String'>
    readonly status: FieldRef<"AgentSubscription", 'SubscriptionStatus'>
    readonly renewAt: FieldRef<"AgentSubscription", 'DateTime'>
    readonly intentId: FieldRef<"AgentSubscription", 'String'>
    readonly createdAt: FieldRef<"AgentSubscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentSubscription findUnique
   */
  export type AgentSubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSubscription
     */
    select?: AgentSubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which AgentSubscription to fetch.
     */
    where: AgentSubscriptionWhereUniqueInput
  }

  /**
   * AgentSubscription findUniqueOrThrow
   */
  export type AgentSubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSubscription
     */
    select?: AgentSubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which AgentSubscription to fetch.
     */
    where: AgentSubscriptionWhereUniqueInput
  }

  /**
   * AgentSubscription findFirst
   */
  export type AgentSubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSubscription
     */
    select?: AgentSubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which AgentSubscription to fetch.
     */
    where?: AgentSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentSubscriptions to fetch.
     */
    orderBy?: AgentSubscriptionOrderByWithRelationInput | AgentSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentSubscriptions.
     */
    cursor?: AgentSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentSubscriptions.
     */
    distinct?: AgentSubscriptionScalarFieldEnum | AgentSubscriptionScalarFieldEnum[]
  }

  /**
   * AgentSubscription findFirstOrThrow
   */
  export type AgentSubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSubscription
     */
    select?: AgentSubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which AgentSubscription to fetch.
     */
    where?: AgentSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentSubscriptions to fetch.
     */
    orderBy?: AgentSubscriptionOrderByWithRelationInput | AgentSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentSubscriptions.
     */
    cursor?: AgentSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentSubscriptions.
     */
    distinct?: AgentSubscriptionScalarFieldEnum | AgentSubscriptionScalarFieldEnum[]
  }

  /**
   * AgentSubscription findMany
   */
  export type AgentSubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSubscription
     */
    select?: AgentSubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which AgentSubscriptions to fetch.
     */
    where?: AgentSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentSubscriptions to fetch.
     */
    orderBy?: AgentSubscriptionOrderByWithRelationInput | AgentSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentSubscriptions.
     */
    cursor?: AgentSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentSubscriptions.
     */
    skip?: number
    distinct?: AgentSubscriptionScalarFieldEnum | AgentSubscriptionScalarFieldEnum[]
  }

  /**
   * AgentSubscription create
   */
  export type AgentSubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSubscription
     */
    select?: AgentSubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentSubscription.
     */
    data: XOR<AgentSubscriptionCreateInput, AgentSubscriptionUncheckedCreateInput>
  }

  /**
   * AgentSubscription createMany
   */
  export type AgentSubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentSubscriptions.
     */
    data: AgentSubscriptionCreateManyInput | AgentSubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentSubscription createManyAndReturn
   */
  export type AgentSubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSubscription
     */
    select?: AgentSubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AgentSubscriptions.
     */
    data: AgentSubscriptionCreateManyInput | AgentSubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentSubscription update
   */
  export type AgentSubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSubscription
     */
    select?: AgentSubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentSubscription.
     */
    data: XOR<AgentSubscriptionUpdateInput, AgentSubscriptionUncheckedUpdateInput>
    /**
     * Choose, which AgentSubscription to update.
     */
    where: AgentSubscriptionWhereUniqueInput
  }

  /**
   * AgentSubscription updateMany
   */
  export type AgentSubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentSubscriptions.
     */
    data: XOR<AgentSubscriptionUpdateManyMutationInput, AgentSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which AgentSubscriptions to update
     */
    where?: AgentSubscriptionWhereInput
  }

  /**
   * AgentSubscription upsert
   */
  export type AgentSubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSubscription
     */
    select?: AgentSubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentSubscription to update in case it exists.
     */
    where: AgentSubscriptionWhereUniqueInput
    /**
     * In case the AgentSubscription found by the `where` argument doesn't exist, create a new AgentSubscription with this data.
     */
    create: XOR<AgentSubscriptionCreateInput, AgentSubscriptionUncheckedCreateInput>
    /**
     * In case the AgentSubscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentSubscriptionUpdateInput, AgentSubscriptionUncheckedUpdateInput>
  }

  /**
   * AgentSubscription delete
   */
  export type AgentSubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSubscription
     */
    select?: AgentSubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSubscriptionInclude<ExtArgs> | null
    /**
     * Filter which AgentSubscription to delete.
     */
    where: AgentSubscriptionWhereUniqueInput
  }

  /**
   * AgentSubscription deleteMany
   */
  export type AgentSubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentSubscriptions to delete
     */
    where?: AgentSubscriptionWhereInput
  }

  /**
   * AgentSubscription without action
   */
  export type AgentSubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentSubscription
     */
    select?: AgentSubscriptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentSubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model AgentMarketplaceListing
   */

  export type AggregateAgentMarketplaceListing = {
    _count: AgentMarketplaceListingCountAggregateOutputType | null
    _avg: AgentMarketplaceListingAvgAggregateOutputType | null
    _sum: AgentMarketplaceListingSumAggregateOutputType | null
    _min: AgentMarketplaceListingMinAggregateOutputType | null
    _max: AgentMarketplaceListingMaxAggregateOutputType | null
  }

  export type AgentMarketplaceListingAvgAggregateOutputType = {
    ratingBps: number | null
  }

  export type AgentMarketplaceListingSumAggregateOutputType = {
    ratingBps: number | null
  }

  export type AgentMarketplaceListingMinAggregateOutputType = {
    id: string | null
    serviceId: string | null
    ratingBps: number | null
    visible: boolean | null
    onChainId: string | null
    createdAt: Date | null
  }

  export type AgentMarketplaceListingMaxAggregateOutputType = {
    id: string | null
    serviceId: string | null
    ratingBps: number | null
    visible: boolean | null
    onChainId: string | null
    createdAt: Date | null
  }

  export type AgentMarketplaceListingCountAggregateOutputType = {
    id: number
    serviceId: number
    tags: number
    ratingBps: number
    visible: number
    onChainId: number
    createdAt: number
    _all: number
  }


  export type AgentMarketplaceListingAvgAggregateInputType = {
    ratingBps?: true
  }

  export type AgentMarketplaceListingSumAggregateInputType = {
    ratingBps?: true
  }

  export type AgentMarketplaceListingMinAggregateInputType = {
    id?: true
    serviceId?: true
    ratingBps?: true
    visible?: true
    onChainId?: true
    createdAt?: true
  }

  export type AgentMarketplaceListingMaxAggregateInputType = {
    id?: true
    serviceId?: true
    ratingBps?: true
    visible?: true
    onChainId?: true
    createdAt?: true
  }

  export type AgentMarketplaceListingCountAggregateInputType = {
    id?: true
    serviceId?: true
    tags?: true
    ratingBps?: true
    visible?: true
    onChainId?: true
    createdAt?: true
    _all?: true
  }

  export type AgentMarketplaceListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentMarketplaceListing to aggregate.
     */
    where?: AgentMarketplaceListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentMarketplaceListings to fetch.
     */
    orderBy?: AgentMarketplaceListingOrderByWithRelationInput | AgentMarketplaceListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentMarketplaceListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentMarketplaceListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentMarketplaceListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentMarketplaceListings
    **/
    _count?: true | AgentMarketplaceListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentMarketplaceListingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentMarketplaceListingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentMarketplaceListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentMarketplaceListingMaxAggregateInputType
  }

  export type GetAgentMarketplaceListingAggregateType<T extends AgentMarketplaceListingAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentMarketplaceListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentMarketplaceListing[P]>
      : GetScalarType<T[P], AggregateAgentMarketplaceListing[P]>
  }




  export type AgentMarketplaceListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentMarketplaceListingWhereInput
    orderBy?: AgentMarketplaceListingOrderByWithAggregationInput | AgentMarketplaceListingOrderByWithAggregationInput[]
    by: AgentMarketplaceListingScalarFieldEnum[] | AgentMarketplaceListingScalarFieldEnum
    having?: AgentMarketplaceListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentMarketplaceListingCountAggregateInputType | true
    _avg?: AgentMarketplaceListingAvgAggregateInputType
    _sum?: AgentMarketplaceListingSumAggregateInputType
    _min?: AgentMarketplaceListingMinAggregateInputType
    _max?: AgentMarketplaceListingMaxAggregateInputType
  }

  export type AgentMarketplaceListingGroupByOutputType = {
    id: string
    serviceId: string
    tags: JsonValue | null
    ratingBps: number | null
    visible: boolean
    onChainId: string | null
    createdAt: Date
    _count: AgentMarketplaceListingCountAggregateOutputType | null
    _avg: AgentMarketplaceListingAvgAggregateOutputType | null
    _sum: AgentMarketplaceListingSumAggregateOutputType | null
    _min: AgentMarketplaceListingMinAggregateOutputType | null
    _max: AgentMarketplaceListingMaxAggregateOutputType | null
  }

  type GetAgentMarketplaceListingGroupByPayload<T extends AgentMarketplaceListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentMarketplaceListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentMarketplaceListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentMarketplaceListingGroupByOutputType[P]>
            : GetScalarType<T[P], AgentMarketplaceListingGroupByOutputType[P]>
        }
      >
    >


  export type AgentMarketplaceListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    tags?: boolean
    ratingBps?: boolean
    visible?: boolean
    onChainId?: boolean
    createdAt?: boolean
    service?: boolean | AgentServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentMarketplaceListing"]>

  export type AgentMarketplaceListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceId?: boolean
    tags?: boolean
    ratingBps?: boolean
    visible?: boolean
    onChainId?: boolean
    createdAt?: boolean
    service?: boolean | AgentServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentMarketplaceListing"]>

  export type AgentMarketplaceListingSelectScalar = {
    id?: boolean
    serviceId?: boolean
    tags?: boolean
    ratingBps?: boolean
    visible?: boolean
    onChainId?: boolean
    createdAt?: boolean
  }

  export type AgentMarketplaceListingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | AgentServiceDefaultArgs<ExtArgs>
  }
  export type AgentMarketplaceListingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | AgentServiceDefaultArgs<ExtArgs>
  }

  export type $AgentMarketplaceListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentMarketplaceListing"
    objects: {
      service: Prisma.$AgentServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      serviceId: string
      tags: Prisma.JsonValue | null
      ratingBps: number | null
      visible: boolean
      onChainId: string | null
      createdAt: Date
    }, ExtArgs["result"]["agentMarketplaceListing"]>
    composites: {}
  }

  type AgentMarketplaceListingGetPayload<S extends boolean | null | undefined | AgentMarketplaceListingDefaultArgs> = $Result.GetResult<Prisma.$AgentMarketplaceListingPayload, S>

  type AgentMarketplaceListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AgentMarketplaceListingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AgentMarketplaceListingCountAggregateInputType | true
    }

  export interface AgentMarketplaceListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentMarketplaceListing'], meta: { name: 'AgentMarketplaceListing' } }
    /**
     * Find zero or one AgentMarketplaceListing that matches the filter.
     * @param {AgentMarketplaceListingFindUniqueArgs} args - Arguments to find a AgentMarketplaceListing
     * @example
     * // Get one AgentMarketplaceListing
     * const agentMarketplaceListing = await prisma.agentMarketplaceListing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentMarketplaceListingFindUniqueArgs>(args: SelectSubset<T, AgentMarketplaceListingFindUniqueArgs<ExtArgs>>): Prisma__AgentMarketplaceListingClient<$Result.GetResult<Prisma.$AgentMarketplaceListingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AgentMarketplaceListing that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AgentMarketplaceListingFindUniqueOrThrowArgs} args - Arguments to find a AgentMarketplaceListing
     * @example
     * // Get one AgentMarketplaceListing
     * const agentMarketplaceListing = await prisma.agentMarketplaceListing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentMarketplaceListingFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentMarketplaceListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentMarketplaceListingClient<$Result.GetResult<Prisma.$AgentMarketplaceListingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AgentMarketplaceListing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentMarketplaceListingFindFirstArgs} args - Arguments to find a AgentMarketplaceListing
     * @example
     * // Get one AgentMarketplaceListing
     * const agentMarketplaceListing = await prisma.agentMarketplaceListing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentMarketplaceListingFindFirstArgs>(args?: SelectSubset<T, AgentMarketplaceListingFindFirstArgs<ExtArgs>>): Prisma__AgentMarketplaceListingClient<$Result.GetResult<Prisma.$AgentMarketplaceListingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AgentMarketplaceListing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentMarketplaceListingFindFirstOrThrowArgs} args - Arguments to find a AgentMarketplaceListing
     * @example
     * // Get one AgentMarketplaceListing
     * const agentMarketplaceListing = await prisma.agentMarketplaceListing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentMarketplaceListingFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentMarketplaceListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentMarketplaceListingClient<$Result.GetResult<Prisma.$AgentMarketplaceListingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AgentMarketplaceListings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentMarketplaceListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentMarketplaceListings
     * const agentMarketplaceListings = await prisma.agentMarketplaceListing.findMany()
     * 
     * // Get first 10 AgentMarketplaceListings
     * const agentMarketplaceListings = await prisma.agentMarketplaceListing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentMarketplaceListingWithIdOnly = await prisma.agentMarketplaceListing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentMarketplaceListingFindManyArgs>(args?: SelectSubset<T, AgentMarketplaceListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentMarketplaceListingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AgentMarketplaceListing.
     * @param {AgentMarketplaceListingCreateArgs} args - Arguments to create a AgentMarketplaceListing.
     * @example
     * // Create one AgentMarketplaceListing
     * const AgentMarketplaceListing = await prisma.agentMarketplaceListing.create({
     *   data: {
     *     // ... data to create a AgentMarketplaceListing
     *   }
     * })
     * 
     */
    create<T extends AgentMarketplaceListingCreateArgs>(args: SelectSubset<T, AgentMarketplaceListingCreateArgs<ExtArgs>>): Prisma__AgentMarketplaceListingClient<$Result.GetResult<Prisma.$AgentMarketplaceListingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AgentMarketplaceListings.
     * @param {AgentMarketplaceListingCreateManyArgs} args - Arguments to create many AgentMarketplaceListings.
     * @example
     * // Create many AgentMarketplaceListings
     * const agentMarketplaceListing = await prisma.agentMarketplaceListing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentMarketplaceListingCreateManyArgs>(args?: SelectSubset<T, AgentMarketplaceListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentMarketplaceListings and returns the data saved in the database.
     * @param {AgentMarketplaceListingCreateManyAndReturnArgs} args - Arguments to create many AgentMarketplaceListings.
     * @example
     * // Create many AgentMarketplaceListings
     * const agentMarketplaceListing = await prisma.agentMarketplaceListing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentMarketplaceListings and only return the `id`
     * const agentMarketplaceListingWithIdOnly = await prisma.agentMarketplaceListing.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentMarketplaceListingCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentMarketplaceListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentMarketplaceListingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AgentMarketplaceListing.
     * @param {AgentMarketplaceListingDeleteArgs} args - Arguments to delete one AgentMarketplaceListing.
     * @example
     * // Delete one AgentMarketplaceListing
     * const AgentMarketplaceListing = await prisma.agentMarketplaceListing.delete({
     *   where: {
     *     // ... filter to delete one AgentMarketplaceListing
     *   }
     * })
     * 
     */
    delete<T extends AgentMarketplaceListingDeleteArgs>(args: SelectSubset<T, AgentMarketplaceListingDeleteArgs<ExtArgs>>): Prisma__AgentMarketplaceListingClient<$Result.GetResult<Prisma.$AgentMarketplaceListingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AgentMarketplaceListing.
     * @param {AgentMarketplaceListingUpdateArgs} args - Arguments to update one AgentMarketplaceListing.
     * @example
     * // Update one AgentMarketplaceListing
     * const agentMarketplaceListing = await prisma.agentMarketplaceListing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentMarketplaceListingUpdateArgs>(args: SelectSubset<T, AgentMarketplaceListingUpdateArgs<ExtArgs>>): Prisma__AgentMarketplaceListingClient<$Result.GetResult<Prisma.$AgentMarketplaceListingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AgentMarketplaceListings.
     * @param {AgentMarketplaceListingDeleteManyArgs} args - Arguments to filter AgentMarketplaceListings to delete.
     * @example
     * // Delete a few AgentMarketplaceListings
     * const { count } = await prisma.agentMarketplaceListing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentMarketplaceListingDeleteManyArgs>(args?: SelectSubset<T, AgentMarketplaceListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentMarketplaceListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentMarketplaceListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentMarketplaceListings
     * const agentMarketplaceListing = await prisma.agentMarketplaceListing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentMarketplaceListingUpdateManyArgs>(args: SelectSubset<T, AgentMarketplaceListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AgentMarketplaceListing.
     * @param {AgentMarketplaceListingUpsertArgs} args - Arguments to update or create a AgentMarketplaceListing.
     * @example
     * // Update or create a AgentMarketplaceListing
     * const agentMarketplaceListing = await prisma.agentMarketplaceListing.upsert({
     *   create: {
     *     // ... data to create a AgentMarketplaceListing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentMarketplaceListing we want to update
     *   }
     * })
     */
    upsert<T extends AgentMarketplaceListingUpsertArgs>(args: SelectSubset<T, AgentMarketplaceListingUpsertArgs<ExtArgs>>): Prisma__AgentMarketplaceListingClient<$Result.GetResult<Prisma.$AgentMarketplaceListingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AgentMarketplaceListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentMarketplaceListingCountArgs} args - Arguments to filter AgentMarketplaceListings to count.
     * @example
     * // Count the number of AgentMarketplaceListings
     * const count = await prisma.agentMarketplaceListing.count({
     *   where: {
     *     // ... the filter for the AgentMarketplaceListings we want to count
     *   }
     * })
    **/
    count<T extends AgentMarketplaceListingCountArgs>(
      args?: Subset<T, AgentMarketplaceListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentMarketplaceListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentMarketplaceListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentMarketplaceListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentMarketplaceListingAggregateArgs>(args: Subset<T, AgentMarketplaceListingAggregateArgs>): Prisma.PrismaPromise<GetAgentMarketplaceListingAggregateType<T>>

    /**
     * Group by AgentMarketplaceListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentMarketplaceListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentMarketplaceListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentMarketplaceListingGroupByArgs['orderBy'] }
        : { orderBy?: AgentMarketplaceListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentMarketplaceListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentMarketplaceListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentMarketplaceListing model
   */
  readonly fields: AgentMarketplaceListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentMarketplaceListing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentMarketplaceListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    service<T extends AgentServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentServiceDefaultArgs<ExtArgs>>): Prisma__AgentServiceClient<$Result.GetResult<Prisma.$AgentServicePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentMarketplaceListing model
   */ 
  interface AgentMarketplaceListingFieldRefs {
    readonly id: FieldRef<"AgentMarketplaceListing", 'String'>
    readonly serviceId: FieldRef<"AgentMarketplaceListing", 'String'>
    readonly tags: FieldRef<"AgentMarketplaceListing", 'Json'>
    readonly ratingBps: FieldRef<"AgentMarketplaceListing", 'Int'>
    readonly visible: FieldRef<"AgentMarketplaceListing", 'Boolean'>
    readonly onChainId: FieldRef<"AgentMarketplaceListing", 'String'>
    readonly createdAt: FieldRef<"AgentMarketplaceListing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentMarketplaceListing findUnique
   */
  export type AgentMarketplaceListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMarketplaceListing
     */
    select?: AgentMarketplaceListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMarketplaceListingInclude<ExtArgs> | null
    /**
     * Filter, which AgentMarketplaceListing to fetch.
     */
    where: AgentMarketplaceListingWhereUniqueInput
  }

  /**
   * AgentMarketplaceListing findUniqueOrThrow
   */
  export type AgentMarketplaceListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMarketplaceListing
     */
    select?: AgentMarketplaceListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMarketplaceListingInclude<ExtArgs> | null
    /**
     * Filter, which AgentMarketplaceListing to fetch.
     */
    where: AgentMarketplaceListingWhereUniqueInput
  }

  /**
   * AgentMarketplaceListing findFirst
   */
  export type AgentMarketplaceListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMarketplaceListing
     */
    select?: AgentMarketplaceListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMarketplaceListingInclude<ExtArgs> | null
    /**
     * Filter, which AgentMarketplaceListing to fetch.
     */
    where?: AgentMarketplaceListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentMarketplaceListings to fetch.
     */
    orderBy?: AgentMarketplaceListingOrderByWithRelationInput | AgentMarketplaceListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentMarketplaceListings.
     */
    cursor?: AgentMarketplaceListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentMarketplaceListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentMarketplaceListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentMarketplaceListings.
     */
    distinct?: AgentMarketplaceListingScalarFieldEnum | AgentMarketplaceListingScalarFieldEnum[]
  }

  /**
   * AgentMarketplaceListing findFirstOrThrow
   */
  export type AgentMarketplaceListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMarketplaceListing
     */
    select?: AgentMarketplaceListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMarketplaceListingInclude<ExtArgs> | null
    /**
     * Filter, which AgentMarketplaceListing to fetch.
     */
    where?: AgentMarketplaceListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentMarketplaceListings to fetch.
     */
    orderBy?: AgentMarketplaceListingOrderByWithRelationInput | AgentMarketplaceListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentMarketplaceListings.
     */
    cursor?: AgentMarketplaceListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentMarketplaceListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentMarketplaceListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentMarketplaceListings.
     */
    distinct?: AgentMarketplaceListingScalarFieldEnum | AgentMarketplaceListingScalarFieldEnum[]
  }

  /**
   * AgentMarketplaceListing findMany
   */
  export type AgentMarketplaceListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMarketplaceListing
     */
    select?: AgentMarketplaceListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMarketplaceListingInclude<ExtArgs> | null
    /**
     * Filter, which AgentMarketplaceListings to fetch.
     */
    where?: AgentMarketplaceListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentMarketplaceListings to fetch.
     */
    orderBy?: AgentMarketplaceListingOrderByWithRelationInput | AgentMarketplaceListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentMarketplaceListings.
     */
    cursor?: AgentMarketplaceListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentMarketplaceListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentMarketplaceListings.
     */
    skip?: number
    distinct?: AgentMarketplaceListingScalarFieldEnum | AgentMarketplaceListingScalarFieldEnum[]
  }

  /**
   * AgentMarketplaceListing create
   */
  export type AgentMarketplaceListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMarketplaceListing
     */
    select?: AgentMarketplaceListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMarketplaceListingInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentMarketplaceListing.
     */
    data: XOR<AgentMarketplaceListingCreateInput, AgentMarketplaceListingUncheckedCreateInput>
  }

  /**
   * AgentMarketplaceListing createMany
   */
  export type AgentMarketplaceListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentMarketplaceListings.
     */
    data: AgentMarketplaceListingCreateManyInput | AgentMarketplaceListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentMarketplaceListing createManyAndReturn
   */
  export type AgentMarketplaceListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMarketplaceListing
     */
    select?: AgentMarketplaceListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AgentMarketplaceListings.
     */
    data: AgentMarketplaceListingCreateManyInput | AgentMarketplaceListingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMarketplaceListingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentMarketplaceListing update
   */
  export type AgentMarketplaceListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMarketplaceListing
     */
    select?: AgentMarketplaceListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMarketplaceListingInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentMarketplaceListing.
     */
    data: XOR<AgentMarketplaceListingUpdateInput, AgentMarketplaceListingUncheckedUpdateInput>
    /**
     * Choose, which AgentMarketplaceListing to update.
     */
    where: AgentMarketplaceListingWhereUniqueInput
  }

  /**
   * AgentMarketplaceListing updateMany
   */
  export type AgentMarketplaceListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentMarketplaceListings.
     */
    data: XOR<AgentMarketplaceListingUpdateManyMutationInput, AgentMarketplaceListingUncheckedUpdateManyInput>
    /**
     * Filter which AgentMarketplaceListings to update
     */
    where?: AgentMarketplaceListingWhereInput
  }

  /**
   * AgentMarketplaceListing upsert
   */
  export type AgentMarketplaceListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMarketplaceListing
     */
    select?: AgentMarketplaceListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMarketplaceListingInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentMarketplaceListing to update in case it exists.
     */
    where: AgentMarketplaceListingWhereUniqueInput
    /**
     * In case the AgentMarketplaceListing found by the `where` argument doesn't exist, create a new AgentMarketplaceListing with this data.
     */
    create: XOR<AgentMarketplaceListingCreateInput, AgentMarketplaceListingUncheckedCreateInput>
    /**
     * In case the AgentMarketplaceListing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentMarketplaceListingUpdateInput, AgentMarketplaceListingUncheckedUpdateInput>
  }

  /**
   * AgentMarketplaceListing delete
   */
  export type AgentMarketplaceListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMarketplaceListing
     */
    select?: AgentMarketplaceListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMarketplaceListingInclude<ExtArgs> | null
    /**
     * Filter which AgentMarketplaceListing to delete.
     */
    where: AgentMarketplaceListingWhereUniqueInput
  }

  /**
   * AgentMarketplaceListing deleteMany
   */
  export type AgentMarketplaceListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentMarketplaceListings to delete
     */
    where?: AgentMarketplaceListingWhereInput
  }

  /**
   * AgentMarketplaceListing without action
   */
  export type AgentMarketplaceListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMarketplaceListing
     */
    select?: AgentMarketplaceListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMarketplaceListingInclude<ExtArgs> | null
  }


  /**
   * Model AgentInvoice
   */

  export type AggregateAgentInvoice = {
    _count: AgentInvoiceCountAggregateOutputType | null
    _avg: AgentInvoiceAvgAggregateOutputType | null
    _sum: AgentInvoiceSumAggregateOutputType | null
    _min: AgentInvoiceMinAggregateOutputType | null
    _max: AgentInvoiceMaxAggregateOutputType | null
  }

  export type AgentInvoiceAvgAggregateOutputType = {
    amountMinor: number | null
  }

  export type AgentInvoiceSumAggregateOutputType = {
    amountMinor: bigint | null
  }

  export type AgentInvoiceMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    payerAgentId: string | null
    amountMinor: bigint | null
    currency: string | null
    status: $Enums.AgentInvoiceStatus | null
    intentId: string | null
    memo: string | null
    createdAt: Date | null
  }

  export type AgentInvoiceMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    payerAgentId: string | null
    amountMinor: bigint | null
    currency: string | null
    status: $Enums.AgentInvoiceStatus | null
    intentId: string | null
    memo: string | null
    createdAt: Date | null
  }

  export type AgentInvoiceCountAggregateOutputType = {
    id: number
    agentId: number
    payerAgentId: number
    amountMinor: number
    currency: number
    status: number
    intentId: number
    memo: number
    createdAt: number
    _all: number
  }


  export type AgentInvoiceAvgAggregateInputType = {
    amountMinor?: true
  }

  export type AgentInvoiceSumAggregateInputType = {
    amountMinor?: true
  }

  export type AgentInvoiceMinAggregateInputType = {
    id?: true
    agentId?: true
    payerAgentId?: true
    amountMinor?: true
    currency?: true
    status?: true
    intentId?: true
    memo?: true
    createdAt?: true
  }

  export type AgentInvoiceMaxAggregateInputType = {
    id?: true
    agentId?: true
    payerAgentId?: true
    amountMinor?: true
    currency?: true
    status?: true
    intentId?: true
    memo?: true
    createdAt?: true
  }

  export type AgentInvoiceCountAggregateInputType = {
    id?: true
    agentId?: true
    payerAgentId?: true
    amountMinor?: true
    currency?: true
    status?: true
    intentId?: true
    memo?: true
    createdAt?: true
    _all?: true
  }

  export type AgentInvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentInvoice to aggregate.
     */
    where?: AgentInvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentInvoices to fetch.
     */
    orderBy?: AgentInvoiceOrderByWithRelationInput | AgentInvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentInvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentInvoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentInvoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentInvoices
    **/
    _count?: true | AgentInvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentInvoiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentInvoiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentInvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentInvoiceMaxAggregateInputType
  }

  export type GetAgentInvoiceAggregateType<T extends AgentInvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentInvoice[P]>
      : GetScalarType<T[P], AggregateAgentInvoice[P]>
  }




  export type AgentInvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentInvoiceWhereInput
    orderBy?: AgentInvoiceOrderByWithAggregationInput | AgentInvoiceOrderByWithAggregationInput[]
    by: AgentInvoiceScalarFieldEnum[] | AgentInvoiceScalarFieldEnum
    having?: AgentInvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentInvoiceCountAggregateInputType | true
    _avg?: AgentInvoiceAvgAggregateInputType
    _sum?: AgentInvoiceSumAggregateInputType
    _min?: AgentInvoiceMinAggregateInputType
    _max?: AgentInvoiceMaxAggregateInputType
  }

  export type AgentInvoiceGroupByOutputType = {
    id: string
    agentId: string
    payerAgentId: string
    amountMinor: bigint
    currency: string
    status: $Enums.AgentInvoiceStatus
    intentId: string | null
    memo: string | null
    createdAt: Date
    _count: AgentInvoiceCountAggregateOutputType | null
    _avg: AgentInvoiceAvgAggregateOutputType | null
    _sum: AgentInvoiceSumAggregateOutputType | null
    _min: AgentInvoiceMinAggregateOutputType | null
    _max: AgentInvoiceMaxAggregateOutputType | null
  }

  type GetAgentInvoiceGroupByPayload<T extends AgentInvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentInvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentInvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentInvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], AgentInvoiceGroupByOutputType[P]>
        }
      >
    >


  export type AgentInvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    payerAgentId?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    intentId?: boolean
    memo?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentInvoice"]>

  export type AgentInvoiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    payerAgentId?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    intentId?: boolean
    memo?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentInvoice"]>

  export type AgentInvoiceSelectScalar = {
    id?: boolean
    agentId?: boolean
    payerAgentId?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    intentId?: boolean
    memo?: boolean
    createdAt?: boolean
  }

  export type AgentInvoiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type AgentInvoiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $AgentInvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentInvoice"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      payerAgentId: string
      amountMinor: bigint
      currency: string
      status: $Enums.AgentInvoiceStatus
      intentId: string | null
      memo: string | null
      createdAt: Date
    }, ExtArgs["result"]["agentInvoice"]>
    composites: {}
  }

  type AgentInvoiceGetPayload<S extends boolean | null | undefined | AgentInvoiceDefaultArgs> = $Result.GetResult<Prisma.$AgentInvoicePayload, S>

  type AgentInvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AgentInvoiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AgentInvoiceCountAggregateInputType | true
    }

  export interface AgentInvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentInvoice'], meta: { name: 'AgentInvoice' } }
    /**
     * Find zero or one AgentInvoice that matches the filter.
     * @param {AgentInvoiceFindUniqueArgs} args - Arguments to find a AgentInvoice
     * @example
     * // Get one AgentInvoice
     * const agentInvoice = await prisma.agentInvoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentInvoiceFindUniqueArgs>(args: SelectSubset<T, AgentInvoiceFindUniqueArgs<ExtArgs>>): Prisma__AgentInvoiceClient<$Result.GetResult<Prisma.$AgentInvoicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AgentInvoice that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AgentInvoiceFindUniqueOrThrowArgs} args - Arguments to find a AgentInvoice
     * @example
     * // Get one AgentInvoice
     * const agentInvoice = await prisma.agentInvoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentInvoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentInvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentInvoiceClient<$Result.GetResult<Prisma.$AgentInvoicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AgentInvoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentInvoiceFindFirstArgs} args - Arguments to find a AgentInvoice
     * @example
     * // Get one AgentInvoice
     * const agentInvoice = await prisma.agentInvoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentInvoiceFindFirstArgs>(args?: SelectSubset<T, AgentInvoiceFindFirstArgs<ExtArgs>>): Prisma__AgentInvoiceClient<$Result.GetResult<Prisma.$AgentInvoicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AgentInvoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentInvoiceFindFirstOrThrowArgs} args - Arguments to find a AgentInvoice
     * @example
     * // Get one AgentInvoice
     * const agentInvoice = await prisma.agentInvoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentInvoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentInvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentInvoiceClient<$Result.GetResult<Prisma.$AgentInvoicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AgentInvoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentInvoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentInvoices
     * const agentInvoices = await prisma.agentInvoice.findMany()
     * 
     * // Get first 10 AgentInvoices
     * const agentInvoices = await prisma.agentInvoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentInvoiceWithIdOnly = await prisma.agentInvoice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentInvoiceFindManyArgs>(args?: SelectSubset<T, AgentInvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentInvoicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AgentInvoice.
     * @param {AgentInvoiceCreateArgs} args - Arguments to create a AgentInvoice.
     * @example
     * // Create one AgentInvoice
     * const AgentInvoice = await prisma.agentInvoice.create({
     *   data: {
     *     // ... data to create a AgentInvoice
     *   }
     * })
     * 
     */
    create<T extends AgentInvoiceCreateArgs>(args: SelectSubset<T, AgentInvoiceCreateArgs<ExtArgs>>): Prisma__AgentInvoiceClient<$Result.GetResult<Prisma.$AgentInvoicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AgentInvoices.
     * @param {AgentInvoiceCreateManyArgs} args - Arguments to create many AgentInvoices.
     * @example
     * // Create many AgentInvoices
     * const agentInvoice = await prisma.agentInvoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentInvoiceCreateManyArgs>(args?: SelectSubset<T, AgentInvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentInvoices and returns the data saved in the database.
     * @param {AgentInvoiceCreateManyAndReturnArgs} args - Arguments to create many AgentInvoices.
     * @example
     * // Create many AgentInvoices
     * const agentInvoice = await prisma.agentInvoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentInvoices and only return the `id`
     * const agentInvoiceWithIdOnly = await prisma.agentInvoice.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentInvoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentInvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentInvoicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AgentInvoice.
     * @param {AgentInvoiceDeleteArgs} args - Arguments to delete one AgentInvoice.
     * @example
     * // Delete one AgentInvoice
     * const AgentInvoice = await prisma.agentInvoice.delete({
     *   where: {
     *     // ... filter to delete one AgentInvoice
     *   }
     * })
     * 
     */
    delete<T extends AgentInvoiceDeleteArgs>(args: SelectSubset<T, AgentInvoiceDeleteArgs<ExtArgs>>): Prisma__AgentInvoiceClient<$Result.GetResult<Prisma.$AgentInvoicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AgentInvoice.
     * @param {AgentInvoiceUpdateArgs} args - Arguments to update one AgentInvoice.
     * @example
     * // Update one AgentInvoice
     * const agentInvoice = await prisma.agentInvoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentInvoiceUpdateArgs>(args: SelectSubset<T, AgentInvoiceUpdateArgs<ExtArgs>>): Prisma__AgentInvoiceClient<$Result.GetResult<Prisma.$AgentInvoicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AgentInvoices.
     * @param {AgentInvoiceDeleteManyArgs} args - Arguments to filter AgentInvoices to delete.
     * @example
     * // Delete a few AgentInvoices
     * const { count } = await prisma.agentInvoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentInvoiceDeleteManyArgs>(args?: SelectSubset<T, AgentInvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentInvoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentInvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentInvoices
     * const agentInvoice = await prisma.agentInvoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentInvoiceUpdateManyArgs>(args: SelectSubset<T, AgentInvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AgentInvoice.
     * @param {AgentInvoiceUpsertArgs} args - Arguments to update or create a AgentInvoice.
     * @example
     * // Update or create a AgentInvoice
     * const agentInvoice = await prisma.agentInvoice.upsert({
     *   create: {
     *     // ... data to create a AgentInvoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentInvoice we want to update
     *   }
     * })
     */
    upsert<T extends AgentInvoiceUpsertArgs>(args: SelectSubset<T, AgentInvoiceUpsertArgs<ExtArgs>>): Prisma__AgentInvoiceClient<$Result.GetResult<Prisma.$AgentInvoicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AgentInvoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentInvoiceCountArgs} args - Arguments to filter AgentInvoices to count.
     * @example
     * // Count the number of AgentInvoices
     * const count = await prisma.agentInvoice.count({
     *   where: {
     *     // ... the filter for the AgentInvoices we want to count
     *   }
     * })
    **/
    count<T extends AgentInvoiceCountArgs>(
      args?: Subset<T, AgentInvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentInvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentInvoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentInvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentInvoiceAggregateArgs>(args: Subset<T, AgentInvoiceAggregateArgs>): Prisma.PrismaPromise<GetAgentInvoiceAggregateType<T>>

    /**
     * Group by AgentInvoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentInvoiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentInvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentInvoiceGroupByArgs['orderBy'] }
        : { orderBy?: AgentInvoiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentInvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentInvoice model
   */
  readonly fields: AgentInvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentInvoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentInvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentInvoice model
   */ 
  interface AgentInvoiceFieldRefs {
    readonly id: FieldRef<"AgentInvoice", 'String'>
    readonly agentId: FieldRef<"AgentInvoice", 'String'>
    readonly payerAgentId: FieldRef<"AgentInvoice", 'String'>
    readonly amountMinor: FieldRef<"AgentInvoice", 'BigInt'>
    readonly currency: FieldRef<"AgentInvoice", 'String'>
    readonly status: FieldRef<"AgentInvoice", 'AgentInvoiceStatus'>
    readonly intentId: FieldRef<"AgentInvoice", 'String'>
    readonly memo: FieldRef<"AgentInvoice", 'String'>
    readonly createdAt: FieldRef<"AgentInvoice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentInvoice findUnique
   */
  export type AgentInvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentInvoice
     */
    select?: AgentInvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInvoiceInclude<ExtArgs> | null
    /**
     * Filter, which AgentInvoice to fetch.
     */
    where: AgentInvoiceWhereUniqueInput
  }

  /**
   * AgentInvoice findUniqueOrThrow
   */
  export type AgentInvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentInvoice
     */
    select?: AgentInvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInvoiceInclude<ExtArgs> | null
    /**
     * Filter, which AgentInvoice to fetch.
     */
    where: AgentInvoiceWhereUniqueInput
  }

  /**
   * AgentInvoice findFirst
   */
  export type AgentInvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentInvoice
     */
    select?: AgentInvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInvoiceInclude<ExtArgs> | null
    /**
     * Filter, which AgentInvoice to fetch.
     */
    where?: AgentInvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentInvoices to fetch.
     */
    orderBy?: AgentInvoiceOrderByWithRelationInput | AgentInvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentInvoices.
     */
    cursor?: AgentInvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentInvoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentInvoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentInvoices.
     */
    distinct?: AgentInvoiceScalarFieldEnum | AgentInvoiceScalarFieldEnum[]
  }

  /**
   * AgentInvoice findFirstOrThrow
   */
  export type AgentInvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentInvoice
     */
    select?: AgentInvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInvoiceInclude<ExtArgs> | null
    /**
     * Filter, which AgentInvoice to fetch.
     */
    where?: AgentInvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentInvoices to fetch.
     */
    orderBy?: AgentInvoiceOrderByWithRelationInput | AgentInvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentInvoices.
     */
    cursor?: AgentInvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentInvoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentInvoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentInvoices.
     */
    distinct?: AgentInvoiceScalarFieldEnum | AgentInvoiceScalarFieldEnum[]
  }

  /**
   * AgentInvoice findMany
   */
  export type AgentInvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentInvoice
     */
    select?: AgentInvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInvoiceInclude<ExtArgs> | null
    /**
     * Filter, which AgentInvoices to fetch.
     */
    where?: AgentInvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentInvoices to fetch.
     */
    orderBy?: AgentInvoiceOrderByWithRelationInput | AgentInvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentInvoices.
     */
    cursor?: AgentInvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentInvoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentInvoices.
     */
    skip?: number
    distinct?: AgentInvoiceScalarFieldEnum | AgentInvoiceScalarFieldEnum[]
  }

  /**
   * AgentInvoice create
   */
  export type AgentInvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentInvoice
     */
    select?: AgentInvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInvoiceInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentInvoice.
     */
    data: XOR<AgentInvoiceCreateInput, AgentInvoiceUncheckedCreateInput>
  }

  /**
   * AgentInvoice createMany
   */
  export type AgentInvoiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentInvoices.
     */
    data: AgentInvoiceCreateManyInput | AgentInvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AgentInvoice createManyAndReturn
   */
  export type AgentInvoiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentInvoice
     */
    select?: AgentInvoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AgentInvoices.
     */
    data: AgentInvoiceCreateManyInput | AgentInvoiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInvoiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentInvoice update
   */
  export type AgentInvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentInvoice
     */
    select?: AgentInvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInvoiceInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentInvoice.
     */
    data: XOR<AgentInvoiceUpdateInput, AgentInvoiceUncheckedUpdateInput>
    /**
     * Choose, which AgentInvoice to update.
     */
    where: AgentInvoiceWhereUniqueInput
  }

  /**
   * AgentInvoice updateMany
   */
  export type AgentInvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentInvoices.
     */
    data: XOR<AgentInvoiceUpdateManyMutationInput, AgentInvoiceUncheckedUpdateManyInput>
    /**
     * Filter which AgentInvoices to update
     */
    where?: AgentInvoiceWhereInput
  }

  /**
   * AgentInvoice upsert
   */
  export type AgentInvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentInvoice
     */
    select?: AgentInvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInvoiceInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentInvoice to update in case it exists.
     */
    where: AgentInvoiceWhereUniqueInput
    /**
     * In case the AgentInvoice found by the `where` argument doesn't exist, create a new AgentInvoice with this data.
     */
    create: XOR<AgentInvoiceCreateInput, AgentInvoiceUncheckedCreateInput>
    /**
     * In case the AgentInvoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentInvoiceUpdateInput, AgentInvoiceUncheckedUpdateInput>
  }

  /**
   * AgentInvoice delete
   */
  export type AgentInvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentInvoice
     */
    select?: AgentInvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInvoiceInclude<ExtArgs> | null
    /**
     * Filter which AgentInvoice to delete.
     */
    where: AgentInvoiceWhereUniqueInput
  }

  /**
   * AgentInvoice deleteMany
   */
  export type AgentInvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentInvoices to delete
     */
    where?: AgentInvoiceWhereInput
  }

  /**
   * AgentInvoice without action
   */
  export type AgentInvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentInvoice
     */
    select?: AgentInvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInvoiceInclude<ExtArgs> | null
  }


  /**
   * Model UsageMeter
   */

  export type AggregateUsageMeter = {
    _count: UsageMeterCountAggregateOutputType | null
    _avg: UsageMeterAvgAggregateOutputType | null
    _sum: UsageMeterSumAggregateOutputType | null
    _min: UsageMeterMinAggregateOutputType | null
    _max: UsageMeterMaxAggregateOutputType | null
  }

  export type UsageMeterAvgAggregateOutputType = {
    units: number | null
    amountMinor: number | null
  }

  export type UsageMeterSumAggregateOutputType = {
    units: bigint | null
    amountMinor: bigint | null
  }

  export type UsageMeterMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    serviceId: string | null
    units: bigint | null
    amountMinor: bigint | null
    currency: string | null
    periodStart: Date | null
    periodEnd: Date | null
    settled: boolean | null
    intentId: string | null
    createdAt: Date | null
  }

  export type UsageMeterMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    serviceId: string | null
    units: bigint | null
    amountMinor: bigint | null
    currency: string | null
    periodStart: Date | null
    periodEnd: Date | null
    settled: boolean | null
    intentId: string | null
    createdAt: Date | null
  }

  export type UsageMeterCountAggregateOutputType = {
    id: number
    agentId: number
    serviceId: number
    units: number
    amountMinor: number
    currency: number
    periodStart: number
    periodEnd: number
    settled: number
    intentId: number
    createdAt: number
    _all: number
  }


  export type UsageMeterAvgAggregateInputType = {
    units?: true
    amountMinor?: true
  }

  export type UsageMeterSumAggregateInputType = {
    units?: true
    amountMinor?: true
  }

  export type UsageMeterMinAggregateInputType = {
    id?: true
    agentId?: true
    serviceId?: true
    units?: true
    amountMinor?: true
    currency?: true
    periodStart?: true
    periodEnd?: true
    settled?: true
    intentId?: true
    createdAt?: true
  }

  export type UsageMeterMaxAggregateInputType = {
    id?: true
    agentId?: true
    serviceId?: true
    units?: true
    amountMinor?: true
    currency?: true
    periodStart?: true
    periodEnd?: true
    settled?: true
    intentId?: true
    createdAt?: true
  }

  export type UsageMeterCountAggregateInputType = {
    id?: true
    agentId?: true
    serviceId?: true
    units?: true
    amountMinor?: true
    currency?: true
    periodStart?: true
    periodEnd?: true
    settled?: true
    intentId?: true
    createdAt?: true
    _all?: true
  }

  export type UsageMeterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageMeter to aggregate.
     */
    where?: UsageMeterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageMeters to fetch.
     */
    orderBy?: UsageMeterOrderByWithRelationInput | UsageMeterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsageMeterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageMeters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageMeters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsageMeters
    **/
    _count?: true | UsageMeterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsageMeterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsageMeterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsageMeterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsageMeterMaxAggregateInputType
  }

  export type GetUsageMeterAggregateType<T extends UsageMeterAggregateArgs> = {
        [P in keyof T & keyof AggregateUsageMeter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsageMeter[P]>
      : GetScalarType<T[P], AggregateUsageMeter[P]>
  }




  export type UsageMeterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageMeterWhereInput
    orderBy?: UsageMeterOrderByWithAggregationInput | UsageMeterOrderByWithAggregationInput[]
    by: UsageMeterScalarFieldEnum[] | UsageMeterScalarFieldEnum
    having?: UsageMeterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsageMeterCountAggregateInputType | true
    _avg?: UsageMeterAvgAggregateInputType
    _sum?: UsageMeterSumAggregateInputType
    _min?: UsageMeterMinAggregateInputType
    _max?: UsageMeterMaxAggregateInputType
  }

  export type UsageMeterGroupByOutputType = {
    id: string
    agentId: string
    serviceId: string | null
    units: bigint
    amountMinor: bigint
    currency: string
    periodStart: Date
    periodEnd: Date
    settled: boolean
    intentId: string | null
    createdAt: Date
    _count: UsageMeterCountAggregateOutputType | null
    _avg: UsageMeterAvgAggregateOutputType | null
    _sum: UsageMeterSumAggregateOutputType | null
    _min: UsageMeterMinAggregateOutputType | null
    _max: UsageMeterMaxAggregateOutputType | null
  }

  type GetUsageMeterGroupByPayload<T extends UsageMeterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsageMeterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsageMeterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsageMeterGroupByOutputType[P]>
            : GetScalarType<T[P], UsageMeterGroupByOutputType[P]>
        }
      >
    >


  export type UsageMeterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    serviceId?: boolean
    units?: boolean
    amountMinor?: boolean
    currency?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    settled?: boolean
    intentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["usageMeter"]>

  export type UsageMeterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    serviceId?: boolean
    units?: boolean
    amountMinor?: boolean
    currency?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    settled?: boolean
    intentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["usageMeter"]>

  export type UsageMeterSelectScalar = {
    id?: boolean
    agentId?: boolean
    serviceId?: boolean
    units?: boolean
    amountMinor?: boolean
    currency?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    settled?: boolean
    intentId?: boolean
    createdAt?: boolean
  }


  export type $UsageMeterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UsageMeter"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      serviceId: string | null
      units: bigint
      amountMinor: bigint
      currency: string
      periodStart: Date
      periodEnd: Date
      settled: boolean
      intentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["usageMeter"]>
    composites: {}
  }

  type UsageMeterGetPayload<S extends boolean | null | undefined | UsageMeterDefaultArgs> = $Result.GetResult<Prisma.$UsageMeterPayload, S>

  type UsageMeterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UsageMeterFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UsageMeterCountAggregateInputType | true
    }

  export interface UsageMeterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UsageMeter'], meta: { name: 'UsageMeter' } }
    /**
     * Find zero or one UsageMeter that matches the filter.
     * @param {UsageMeterFindUniqueArgs} args - Arguments to find a UsageMeter
     * @example
     * // Get one UsageMeter
     * const usageMeter = await prisma.usageMeter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsageMeterFindUniqueArgs>(args: SelectSubset<T, UsageMeterFindUniqueArgs<ExtArgs>>): Prisma__UsageMeterClient<$Result.GetResult<Prisma.$UsageMeterPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UsageMeter that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UsageMeterFindUniqueOrThrowArgs} args - Arguments to find a UsageMeter
     * @example
     * // Get one UsageMeter
     * const usageMeter = await prisma.usageMeter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsageMeterFindUniqueOrThrowArgs>(args: SelectSubset<T, UsageMeterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsageMeterClient<$Result.GetResult<Prisma.$UsageMeterPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UsageMeter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMeterFindFirstArgs} args - Arguments to find a UsageMeter
     * @example
     * // Get one UsageMeter
     * const usageMeter = await prisma.usageMeter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsageMeterFindFirstArgs>(args?: SelectSubset<T, UsageMeterFindFirstArgs<ExtArgs>>): Prisma__UsageMeterClient<$Result.GetResult<Prisma.$UsageMeterPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UsageMeter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMeterFindFirstOrThrowArgs} args - Arguments to find a UsageMeter
     * @example
     * // Get one UsageMeter
     * const usageMeter = await prisma.usageMeter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsageMeterFindFirstOrThrowArgs>(args?: SelectSubset<T, UsageMeterFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsageMeterClient<$Result.GetResult<Prisma.$UsageMeterPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UsageMeters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMeterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsageMeters
     * const usageMeters = await prisma.usageMeter.findMany()
     * 
     * // Get first 10 UsageMeters
     * const usageMeters = await prisma.usageMeter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usageMeterWithIdOnly = await prisma.usageMeter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsageMeterFindManyArgs>(args?: SelectSubset<T, UsageMeterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageMeterPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UsageMeter.
     * @param {UsageMeterCreateArgs} args - Arguments to create a UsageMeter.
     * @example
     * // Create one UsageMeter
     * const UsageMeter = await prisma.usageMeter.create({
     *   data: {
     *     // ... data to create a UsageMeter
     *   }
     * })
     * 
     */
    create<T extends UsageMeterCreateArgs>(args: SelectSubset<T, UsageMeterCreateArgs<ExtArgs>>): Prisma__UsageMeterClient<$Result.GetResult<Prisma.$UsageMeterPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UsageMeters.
     * @param {UsageMeterCreateManyArgs} args - Arguments to create many UsageMeters.
     * @example
     * // Create many UsageMeters
     * const usageMeter = await prisma.usageMeter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsageMeterCreateManyArgs>(args?: SelectSubset<T, UsageMeterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UsageMeters and returns the data saved in the database.
     * @param {UsageMeterCreateManyAndReturnArgs} args - Arguments to create many UsageMeters.
     * @example
     * // Create many UsageMeters
     * const usageMeter = await prisma.usageMeter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UsageMeters and only return the `id`
     * const usageMeterWithIdOnly = await prisma.usageMeter.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsageMeterCreateManyAndReturnArgs>(args?: SelectSubset<T, UsageMeterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageMeterPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UsageMeter.
     * @param {UsageMeterDeleteArgs} args - Arguments to delete one UsageMeter.
     * @example
     * // Delete one UsageMeter
     * const UsageMeter = await prisma.usageMeter.delete({
     *   where: {
     *     // ... filter to delete one UsageMeter
     *   }
     * })
     * 
     */
    delete<T extends UsageMeterDeleteArgs>(args: SelectSubset<T, UsageMeterDeleteArgs<ExtArgs>>): Prisma__UsageMeterClient<$Result.GetResult<Prisma.$UsageMeterPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UsageMeter.
     * @param {UsageMeterUpdateArgs} args - Arguments to update one UsageMeter.
     * @example
     * // Update one UsageMeter
     * const usageMeter = await prisma.usageMeter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsageMeterUpdateArgs>(args: SelectSubset<T, UsageMeterUpdateArgs<ExtArgs>>): Prisma__UsageMeterClient<$Result.GetResult<Prisma.$UsageMeterPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UsageMeters.
     * @param {UsageMeterDeleteManyArgs} args - Arguments to filter UsageMeters to delete.
     * @example
     * // Delete a few UsageMeters
     * const { count } = await prisma.usageMeter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsageMeterDeleteManyArgs>(args?: SelectSubset<T, UsageMeterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageMeters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMeterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsageMeters
     * const usageMeter = await prisma.usageMeter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsageMeterUpdateManyArgs>(args: SelectSubset<T, UsageMeterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UsageMeter.
     * @param {UsageMeterUpsertArgs} args - Arguments to update or create a UsageMeter.
     * @example
     * // Update or create a UsageMeter
     * const usageMeter = await prisma.usageMeter.upsert({
     *   create: {
     *     // ... data to create a UsageMeter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsageMeter we want to update
     *   }
     * })
     */
    upsert<T extends UsageMeterUpsertArgs>(args: SelectSubset<T, UsageMeterUpsertArgs<ExtArgs>>): Prisma__UsageMeterClient<$Result.GetResult<Prisma.$UsageMeterPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UsageMeters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMeterCountArgs} args - Arguments to filter UsageMeters to count.
     * @example
     * // Count the number of UsageMeters
     * const count = await prisma.usageMeter.count({
     *   where: {
     *     // ... the filter for the UsageMeters we want to count
     *   }
     * })
    **/
    count<T extends UsageMeterCountArgs>(
      args?: Subset<T, UsageMeterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsageMeterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsageMeter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMeterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsageMeterAggregateArgs>(args: Subset<T, UsageMeterAggregateArgs>): Prisma.PrismaPromise<GetUsageMeterAggregateType<T>>

    /**
     * Group by UsageMeter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageMeterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsageMeterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsageMeterGroupByArgs['orderBy'] }
        : { orderBy?: UsageMeterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsageMeterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsageMeterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UsageMeter model
   */
  readonly fields: UsageMeterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsageMeter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsageMeterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UsageMeter model
   */ 
  interface UsageMeterFieldRefs {
    readonly id: FieldRef<"UsageMeter", 'String'>
    readonly agentId: FieldRef<"UsageMeter", 'String'>
    readonly serviceId: FieldRef<"UsageMeter", 'String'>
    readonly units: FieldRef<"UsageMeter", 'BigInt'>
    readonly amountMinor: FieldRef<"UsageMeter", 'BigInt'>
    readonly currency: FieldRef<"UsageMeter", 'String'>
    readonly periodStart: FieldRef<"UsageMeter", 'DateTime'>
    readonly periodEnd: FieldRef<"UsageMeter", 'DateTime'>
    readonly settled: FieldRef<"UsageMeter", 'Boolean'>
    readonly intentId: FieldRef<"UsageMeter", 'String'>
    readonly createdAt: FieldRef<"UsageMeter", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UsageMeter findUnique
   */
  export type UsageMeterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMeter
     */
    select?: UsageMeterSelect<ExtArgs> | null
    /**
     * Filter, which UsageMeter to fetch.
     */
    where: UsageMeterWhereUniqueInput
  }

  /**
   * UsageMeter findUniqueOrThrow
   */
  export type UsageMeterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMeter
     */
    select?: UsageMeterSelect<ExtArgs> | null
    /**
     * Filter, which UsageMeter to fetch.
     */
    where: UsageMeterWhereUniqueInput
  }

  /**
   * UsageMeter findFirst
   */
  export type UsageMeterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMeter
     */
    select?: UsageMeterSelect<ExtArgs> | null
    /**
     * Filter, which UsageMeter to fetch.
     */
    where?: UsageMeterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageMeters to fetch.
     */
    orderBy?: UsageMeterOrderByWithRelationInput | UsageMeterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageMeters.
     */
    cursor?: UsageMeterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageMeters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageMeters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageMeters.
     */
    distinct?: UsageMeterScalarFieldEnum | UsageMeterScalarFieldEnum[]
  }

  /**
   * UsageMeter findFirstOrThrow
   */
  export type UsageMeterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMeter
     */
    select?: UsageMeterSelect<ExtArgs> | null
    /**
     * Filter, which UsageMeter to fetch.
     */
    where?: UsageMeterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageMeters to fetch.
     */
    orderBy?: UsageMeterOrderByWithRelationInput | UsageMeterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageMeters.
     */
    cursor?: UsageMeterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageMeters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageMeters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageMeters.
     */
    distinct?: UsageMeterScalarFieldEnum | UsageMeterScalarFieldEnum[]
  }

  /**
   * UsageMeter findMany
   */
  export type UsageMeterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMeter
     */
    select?: UsageMeterSelect<ExtArgs> | null
    /**
     * Filter, which UsageMeters to fetch.
     */
    where?: UsageMeterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageMeters to fetch.
     */
    orderBy?: UsageMeterOrderByWithRelationInput | UsageMeterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsageMeters.
     */
    cursor?: UsageMeterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageMeters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageMeters.
     */
    skip?: number
    distinct?: UsageMeterScalarFieldEnum | UsageMeterScalarFieldEnum[]
  }

  /**
   * UsageMeter create
   */
  export type UsageMeterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMeter
     */
    select?: UsageMeterSelect<ExtArgs> | null
    /**
     * The data needed to create a UsageMeter.
     */
    data: XOR<UsageMeterCreateInput, UsageMeterUncheckedCreateInput>
  }

  /**
   * UsageMeter createMany
   */
  export type UsageMeterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsageMeters.
     */
    data: UsageMeterCreateManyInput | UsageMeterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsageMeter createManyAndReturn
   */
  export type UsageMeterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMeter
     */
    select?: UsageMeterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UsageMeters.
     */
    data: UsageMeterCreateManyInput | UsageMeterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsageMeter update
   */
  export type UsageMeterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMeter
     */
    select?: UsageMeterSelect<ExtArgs> | null
    /**
     * The data needed to update a UsageMeter.
     */
    data: XOR<UsageMeterUpdateInput, UsageMeterUncheckedUpdateInput>
    /**
     * Choose, which UsageMeter to update.
     */
    where: UsageMeterWhereUniqueInput
  }

  /**
   * UsageMeter updateMany
   */
  export type UsageMeterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UsageMeters.
     */
    data: XOR<UsageMeterUpdateManyMutationInput, UsageMeterUncheckedUpdateManyInput>
    /**
     * Filter which UsageMeters to update
     */
    where?: UsageMeterWhereInput
  }

  /**
   * UsageMeter upsert
   */
  export type UsageMeterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMeter
     */
    select?: UsageMeterSelect<ExtArgs> | null
    /**
     * The filter to search for the UsageMeter to update in case it exists.
     */
    where: UsageMeterWhereUniqueInput
    /**
     * In case the UsageMeter found by the `where` argument doesn't exist, create a new UsageMeter with this data.
     */
    create: XOR<UsageMeterCreateInput, UsageMeterUncheckedCreateInput>
    /**
     * In case the UsageMeter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsageMeterUpdateInput, UsageMeterUncheckedUpdateInput>
  }

  /**
   * UsageMeter delete
   */
  export type UsageMeterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMeter
     */
    select?: UsageMeterSelect<ExtArgs> | null
    /**
     * Filter which UsageMeter to delete.
     */
    where: UsageMeterWhereUniqueInput
  }

  /**
   * UsageMeter deleteMany
   */
  export type UsageMeterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageMeters to delete
     */
    where?: UsageMeterWhereInput
  }

  /**
   * UsageMeter without action
   */
  export type UsageMeterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageMeter
     */
    select?: UsageMeterSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const EventOutboxScalarFieldEnum: {
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

  export type EventOutboxScalarFieldEnum = (typeof EventOutboxScalarFieldEnum)[keyof typeof EventOutboxScalarFieldEnum]


  export const AgentScalarFieldEnum: {
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

  export type AgentScalarFieldEnum = (typeof AgentScalarFieldEnum)[keyof typeof AgentScalarFieldEnum]


  export const AgentSpendingPolicyScalarFieldEnum: {
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

  export type AgentSpendingPolicyScalarFieldEnum = (typeof AgentSpendingPolicyScalarFieldEnum)[keyof typeof AgentSpendingPolicyScalarFieldEnum]


  export const AgentReasoningLogScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    intentId: 'intentId',
    traceId: 'traceId',
    summary: 'summary',
    steps: 'steps',
    createdAt: 'createdAt'
  };

  export type AgentReasoningLogScalarFieldEnum = (typeof AgentReasoningLogScalarFieldEnum)[keyof typeof AgentReasoningLogScalarFieldEnum]


  export const SpendApprovalRequestScalarFieldEnum: {
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

  export type SpendApprovalRequestScalarFieldEnum = (typeof SpendApprovalRequestScalarFieldEnum)[keyof typeof SpendApprovalRequestScalarFieldEnum]


  export const SpendApprovalVoteScalarFieldEnum: {
    id: 'id',
    requestId: 'requestId',
    approverId: 'approverId',
    createdAt: 'createdAt'
  };

  export type SpendApprovalVoteScalarFieldEnum = (typeof SpendApprovalVoteScalarFieldEnum)[keyof typeof SpendApprovalVoteScalarFieldEnum]


  export const AgentServiceScalarFieldEnum: {
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

  export type AgentServiceScalarFieldEnum = (typeof AgentServiceScalarFieldEnum)[keyof typeof AgentServiceScalarFieldEnum]


  export const AgentSubscriptionScalarFieldEnum: {
    id: 'id',
    serviceId: 'serviceId',
    subscriberAgentId: 'subscriberAgentId',
    status: 'status',
    renewAt: 'renewAt',
    intentId: 'intentId',
    createdAt: 'createdAt'
  };

  export type AgentSubscriptionScalarFieldEnum = (typeof AgentSubscriptionScalarFieldEnum)[keyof typeof AgentSubscriptionScalarFieldEnum]


  export const AgentMarketplaceListingScalarFieldEnum: {
    id: 'id',
    serviceId: 'serviceId',
    tags: 'tags',
    ratingBps: 'ratingBps',
    visible: 'visible',
    onChainId: 'onChainId',
    createdAt: 'createdAt'
  };

  export type AgentMarketplaceListingScalarFieldEnum = (typeof AgentMarketplaceListingScalarFieldEnum)[keyof typeof AgentMarketplaceListingScalarFieldEnum]


  export const AgentInvoiceScalarFieldEnum: {
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

  export type AgentInvoiceScalarFieldEnum = (typeof AgentInvoiceScalarFieldEnum)[keyof typeof AgentInvoiceScalarFieldEnum]


  export const UsageMeterScalarFieldEnum: {
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

  export type UsageMeterScalarFieldEnum = (typeof UsageMeterScalarFieldEnum)[keyof typeof UsageMeterScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'OutboxStatus'
   */
  export type EnumOutboxStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OutboxStatus'>
    


  /**
   * Reference to a field of type 'OutboxStatus[]'
   */
  export type ListEnumOutboxStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OutboxStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'OwnerKind'
   */
  export type EnumOwnerKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OwnerKind'>
    


  /**
   * Reference to a field of type 'OwnerKind[]'
   */
  export type ListEnumOwnerKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OwnerKind[]'>
    


  /**
   * Reference to a field of type 'AgentStatus'
   */
  export type EnumAgentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgentStatus'>
    


  /**
   * Reference to a field of type 'AgentStatus[]'
   */
  export type ListEnumAgentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgentStatus[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'SpendApprovalStatus'
   */
  export type EnumSpendApprovalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SpendApprovalStatus'>
    


  /**
   * Reference to a field of type 'SpendApprovalStatus[]'
   */
  export type ListEnumSpendApprovalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SpendApprovalStatus[]'>
    


  /**
   * Reference to a field of type 'AgentServiceStatus'
   */
  export type EnumAgentServiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgentServiceStatus'>
    


  /**
   * Reference to a field of type 'AgentServiceStatus[]'
   */
  export type ListEnumAgentServiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgentServiceStatus[]'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus'
   */
  export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus[]'
   */
  export type ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'AgentInvoiceStatus'
   */
  export type EnumAgentInvoiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgentInvoiceStatus'>
    


  /**
   * Reference to a field of type 'AgentInvoiceStatus[]'
   */
  export type ListEnumAgentInvoiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgentInvoiceStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type EventOutboxWhereInput = {
    AND?: EventOutboxWhereInput | EventOutboxWhereInput[]
    OR?: EventOutboxWhereInput[]
    NOT?: EventOutboxWhereInput | EventOutboxWhereInput[]
    id?: UuidFilter<"EventOutbox"> | string
    eventId?: StringFilter<"EventOutbox"> | string
    subject?: StringFilter<"EventOutbox"> | string
    payload?: JsonFilter<"EventOutbox">
    status?: EnumOutboxStatusFilter<"EventOutbox"> | $Enums.OutboxStatus
    attempts?: IntFilter<"EventOutbox"> | number
    lastError?: StringNullableFilter<"EventOutbox"> | string | null
    createdAt?: DateTimeFilter<"EventOutbox"> | Date | string
    publishedAt?: DateTimeNullableFilter<"EventOutbox"> | Date | string | null
  }

  export type EventOutboxOrderByWithRelationInput = {
    id?: SortOrder
    eventId?: SortOrder
    subject?: SortOrder
    payload?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
  }

  export type EventOutboxWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    eventId?: string
    AND?: EventOutboxWhereInput | EventOutboxWhereInput[]
    OR?: EventOutboxWhereInput[]
    NOT?: EventOutboxWhereInput | EventOutboxWhereInput[]
    subject?: StringFilter<"EventOutbox"> | string
    payload?: JsonFilter<"EventOutbox">
    status?: EnumOutboxStatusFilter<"EventOutbox"> | $Enums.OutboxStatus
    attempts?: IntFilter<"EventOutbox"> | number
    lastError?: StringNullableFilter<"EventOutbox"> | string | null
    createdAt?: DateTimeFilter<"EventOutbox"> | Date | string
    publishedAt?: DateTimeNullableFilter<"EventOutbox"> | Date | string | null
  }, "id" | "eventId">

  export type EventOutboxOrderByWithAggregationInput = {
    id?: SortOrder
    eventId?: SortOrder
    subject?: SortOrder
    payload?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    _count?: EventOutboxCountOrderByAggregateInput
    _avg?: EventOutboxAvgOrderByAggregateInput
    _max?: EventOutboxMaxOrderByAggregateInput
    _min?: EventOutboxMinOrderByAggregateInput
    _sum?: EventOutboxSumOrderByAggregateInput
  }

  export type EventOutboxScalarWhereWithAggregatesInput = {
    AND?: EventOutboxScalarWhereWithAggregatesInput | EventOutboxScalarWhereWithAggregatesInput[]
    OR?: EventOutboxScalarWhereWithAggregatesInput[]
    NOT?: EventOutboxScalarWhereWithAggregatesInput | EventOutboxScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"EventOutbox"> | string
    eventId?: StringWithAggregatesFilter<"EventOutbox"> | string
    subject?: StringWithAggregatesFilter<"EventOutbox"> | string
    payload?: JsonWithAggregatesFilter<"EventOutbox">
    status?: EnumOutboxStatusWithAggregatesFilter<"EventOutbox"> | $Enums.OutboxStatus
    attempts?: IntWithAggregatesFilter<"EventOutbox"> | number
    lastError?: StringNullableWithAggregatesFilter<"EventOutbox"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EventOutbox"> | Date | string
    publishedAt?: DateTimeNullableWithAggregatesFilter<"EventOutbox"> | Date | string | null
  }

  export type AgentWhereInput = {
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    id?: StringFilter<"Agent"> | string
    ownerId?: StringFilter<"Agent"> | string
    ownerKind?: EnumOwnerKindFilter<"Agent"> | $Enums.OwnerKind
    orgId?: StringNullableFilter<"Agent"> | string | null
    name?: StringFilter<"Agent"> | string
    status?: EnumAgentStatusFilter<"Agent"> | $Enums.AgentStatus
    metadata?: JsonNullableFilter<"Agent">
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    policy?: XOR<AgentSpendingPolicyNullableRelationFilter, AgentSpendingPolicyWhereInput> | null
    reasoningLogs?: AgentReasoningLogListRelationFilter
    approvalRequests?: SpendApprovalRequestListRelationFilter
    invoices?: AgentInvoiceListRelationFilter
    services?: AgentServiceListRelationFilter
  }

  export type AgentOrderByWithRelationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    ownerKind?: SortOrder
    orgId?: SortOrderInput | SortOrder
    name?: SortOrder
    status?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    policy?: AgentSpendingPolicyOrderByWithRelationInput
    reasoningLogs?: AgentReasoningLogOrderByRelationAggregateInput
    approvalRequests?: SpendApprovalRequestOrderByRelationAggregateInput
    invoices?: AgentInvoiceOrderByRelationAggregateInput
    services?: AgentServiceOrderByRelationAggregateInput
  }

  export type AgentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    ownerId?: StringFilter<"Agent"> | string
    ownerKind?: EnumOwnerKindFilter<"Agent"> | $Enums.OwnerKind
    orgId?: StringNullableFilter<"Agent"> | string | null
    name?: StringFilter<"Agent"> | string
    status?: EnumAgentStatusFilter<"Agent"> | $Enums.AgentStatus
    metadata?: JsonNullableFilter<"Agent">
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    policy?: XOR<AgentSpendingPolicyNullableRelationFilter, AgentSpendingPolicyWhereInput> | null
    reasoningLogs?: AgentReasoningLogListRelationFilter
    approvalRequests?: SpendApprovalRequestListRelationFilter
    invoices?: AgentInvoiceListRelationFilter
    services?: AgentServiceListRelationFilter
  }, "id">

  export type AgentOrderByWithAggregationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    ownerKind?: SortOrder
    orgId?: SortOrderInput | SortOrder
    name?: SortOrder
    status?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AgentCountOrderByAggregateInput
    _max?: AgentMaxOrderByAggregateInput
    _min?: AgentMinOrderByAggregateInput
  }

  export type AgentScalarWhereWithAggregatesInput = {
    AND?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    OR?: AgentScalarWhereWithAggregatesInput[]
    NOT?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Agent"> | string
    ownerId?: StringWithAggregatesFilter<"Agent"> | string
    ownerKind?: EnumOwnerKindWithAggregatesFilter<"Agent"> | $Enums.OwnerKind
    orgId?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    name?: StringWithAggregatesFilter<"Agent"> | string
    status?: EnumAgentStatusWithAggregatesFilter<"Agent"> | $Enums.AgentStatus
    metadata?: JsonNullableWithAggregatesFilter<"Agent">
    createdAt?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
  }

  export type AgentSpendingPolicyWhereInput = {
    AND?: AgentSpendingPolicyWhereInput | AgentSpendingPolicyWhereInput[]
    OR?: AgentSpendingPolicyWhereInput[]
    NOT?: AgentSpendingPolicyWhereInput | AgentSpendingPolicyWhereInput[]
    id?: UuidFilter<"AgentSpendingPolicy"> | string
    agentId?: StringFilter<"AgentSpendingPolicy"> | string
    perTxCapMinor?: BigIntFilter<"AgentSpendingPolicy"> | bigint | number
    dailyCapMinor?: BigIntFilter<"AgentSpendingPolicy"> | bigint | number
    monthlyCapMinor?: BigIntNullableFilter<"AgentSpendingPolicy"> | bigint | number | null
    destinationAllowlist?: JsonFilter<"AgentSpendingPolicy">
    approvalThresholdMinor?: BigIntFilter<"AgentSpendingPolicy"> | bigint | number
    requiredApprovers?: IntFilter<"AgentSpendingPolicy"> | number
    currency?: StringFilter<"AgentSpendingPolicy"> | string
    version?: IntFilter<"AgentSpendingPolicy"> | number
    updatedAt?: DateTimeFilter<"AgentSpendingPolicy"> | Date | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
  }

  export type AgentSpendingPolicyOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    perTxCapMinor?: SortOrder
    dailyCapMinor?: SortOrder
    monthlyCapMinor?: SortOrderInput | SortOrder
    destinationAllowlist?: SortOrder
    approvalThresholdMinor?: SortOrder
    requiredApprovers?: SortOrder
    currency?: SortOrder
    version?: SortOrder
    updatedAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
  }

  export type AgentSpendingPolicyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    agentId?: string
    AND?: AgentSpendingPolicyWhereInput | AgentSpendingPolicyWhereInput[]
    OR?: AgentSpendingPolicyWhereInput[]
    NOT?: AgentSpendingPolicyWhereInput | AgentSpendingPolicyWhereInput[]
    perTxCapMinor?: BigIntFilter<"AgentSpendingPolicy"> | bigint | number
    dailyCapMinor?: BigIntFilter<"AgentSpendingPolicy"> | bigint | number
    monthlyCapMinor?: BigIntNullableFilter<"AgentSpendingPolicy"> | bigint | number | null
    destinationAllowlist?: JsonFilter<"AgentSpendingPolicy">
    approvalThresholdMinor?: BigIntFilter<"AgentSpendingPolicy"> | bigint | number
    requiredApprovers?: IntFilter<"AgentSpendingPolicy"> | number
    currency?: StringFilter<"AgentSpendingPolicy"> | string
    version?: IntFilter<"AgentSpendingPolicy"> | number
    updatedAt?: DateTimeFilter<"AgentSpendingPolicy"> | Date | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
  }, "id" | "agentId">

  export type AgentSpendingPolicyOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    perTxCapMinor?: SortOrder
    dailyCapMinor?: SortOrder
    monthlyCapMinor?: SortOrderInput | SortOrder
    destinationAllowlist?: SortOrder
    approvalThresholdMinor?: SortOrder
    requiredApprovers?: SortOrder
    currency?: SortOrder
    version?: SortOrder
    updatedAt?: SortOrder
    _count?: AgentSpendingPolicyCountOrderByAggregateInput
    _avg?: AgentSpendingPolicyAvgOrderByAggregateInput
    _max?: AgentSpendingPolicyMaxOrderByAggregateInput
    _min?: AgentSpendingPolicyMinOrderByAggregateInput
    _sum?: AgentSpendingPolicySumOrderByAggregateInput
  }

  export type AgentSpendingPolicyScalarWhereWithAggregatesInput = {
    AND?: AgentSpendingPolicyScalarWhereWithAggregatesInput | AgentSpendingPolicyScalarWhereWithAggregatesInput[]
    OR?: AgentSpendingPolicyScalarWhereWithAggregatesInput[]
    NOT?: AgentSpendingPolicyScalarWhereWithAggregatesInput | AgentSpendingPolicyScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"AgentSpendingPolicy"> | string
    agentId?: StringWithAggregatesFilter<"AgentSpendingPolicy"> | string
    perTxCapMinor?: BigIntWithAggregatesFilter<"AgentSpendingPolicy"> | bigint | number
    dailyCapMinor?: BigIntWithAggregatesFilter<"AgentSpendingPolicy"> | bigint | number
    monthlyCapMinor?: BigIntNullableWithAggregatesFilter<"AgentSpendingPolicy"> | bigint | number | null
    destinationAllowlist?: JsonWithAggregatesFilter<"AgentSpendingPolicy">
    approvalThresholdMinor?: BigIntWithAggregatesFilter<"AgentSpendingPolicy"> | bigint | number
    requiredApprovers?: IntWithAggregatesFilter<"AgentSpendingPolicy"> | number
    currency?: StringWithAggregatesFilter<"AgentSpendingPolicy"> | string
    version?: IntWithAggregatesFilter<"AgentSpendingPolicy"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"AgentSpendingPolicy"> | Date | string
  }

  export type AgentReasoningLogWhereInput = {
    AND?: AgentReasoningLogWhereInput | AgentReasoningLogWhereInput[]
    OR?: AgentReasoningLogWhereInput[]
    NOT?: AgentReasoningLogWhereInput | AgentReasoningLogWhereInput[]
    id?: StringFilter<"AgentReasoningLog"> | string
    agentId?: StringFilter<"AgentReasoningLog"> | string
    intentId?: StringNullableFilter<"AgentReasoningLog"> | string | null
    traceId?: StringNullableFilter<"AgentReasoningLog"> | string | null
    summary?: StringFilter<"AgentReasoningLog"> | string
    steps?: JsonFilter<"AgentReasoningLog">
    createdAt?: DateTimeFilter<"AgentReasoningLog"> | Date | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
  }

  export type AgentReasoningLogOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    intentId?: SortOrderInput | SortOrder
    traceId?: SortOrderInput | SortOrder
    summary?: SortOrder
    steps?: SortOrder
    createdAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
  }

  export type AgentReasoningLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgentReasoningLogWhereInput | AgentReasoningLogWhereInput[]
    OR?: AgentReasoningLogWhereInput[]
    NOT?: AgentReasoningLogWhereInput | AgentReasoningLogWhereInput[]
    agentId?: StringFilter<"AgentReasoningLog"> | string
    intentId?: StringNullableFilter<"AgentReasoningLog"> | string | null
    traceId?: StringNullableFilter<"AgentReasoningLog"> | string | null
    summary?: StringFilter<"AgentReasoningLog"> | string
    steps?: JsonFilter<"AgentReasoningLog">
    createdAt?: DateTimeFilter<"AgentReasoningLog"> | Date | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
  }, "id">

  export type AgentReasoningLogOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    intentId?: SortOrderInput | SortOrder
    traceId?: SortOrderInput | SortOrder
    summary?: SortOrder
    steps?: SortOrder
    createdAt?: SortOrder
    _count?: AgentReasoningLogCountOrderByAggregateInput
    _max?: AgentReasoningLogMaxOrderByAggregateInput
    _min?: AgentReasoningLogMinOrderByAggregateInput
  }

  export type AgentReasoningLogScalarWhereWithAggregatesInput = {
    AND?: AgentReasoningLogScalarWhereWithAggregatesInput | AgentReasoningLogScalarWhereWithAggregatesInput[]
    OR?: AgentReasoningLogScalarWhereWithAggregatesInput[]
    NOT?: AgentReasoningLogScalarWhereWithAggregatesInput | AgentReasoningLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentReasoningLog"> | string
    agentId?: StringWithAggregatesFilter<"AgentReasoningLog"> | string
    intentId?: StringNullableWithAggregatesFilter<"AgentReasoningLog"> | string | null
    traceId?: StringNullableWithAggregatesFilter<"AgentReasoningLog"> | string | null
    summary?: StringWithAggregatesFilter<"AgentReasoningLog"> | string
    steps?: JsonWithAggregatesFilter<"AgentReasoningLog">
    createdAt?: DateTimeWithAggregatesFilter<"AgentReasoningLog"> | Date | string
  }

  export type SpendApprovalRequestWhereInput = {
    AND?: SpendApprovalRequestWhereInput | SpendApprovalRequestWhereInput[]
    OR?: SpendApprovalRequestWhereInput[]
    NOT?: SpendApprovalRequestWhereInput | SpendApprovalRequestWhereInput[]
    id?: StringFilter<"SpendApprovalRequest"> | string
    agentId?: StringFilter<"SpendApprovalRequest"> | string
    intentId?: StringNullableFilter<"SpendApprovalRequest"> | string | null
    amountMinor?: BigIntFilter<"SpendApprovalRequest"> | bigint | number
    destination?: StringFilter<"SpendApprovalRequest"> | string
    approvalCount?: IntFilter<"SpendApprovalRequest"> | number
    requiredApprovers?: IntFilter<"SpendApprovalRequest"> | number
    status?: EnumSpendApprovalStatusFilter<"SpendApprovalRequest"> | $Enums.SpendApprovalStatus
    createdAt?: DateTimeFilter<"SpendApprovalRequest"> | Date | string
    updatedAt?: DateTimeFilter<"SpendApprovalRequest"> | Date | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
    votes?: SpendApprovalVoteListRelationFilter
  }

  export type SpendApprovalRequestOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    intentId?: SortOrderInput | SortOrder
    amountMinor?: SortOrder
    destination?: SortOrder
    approvalCount?: SortOrder
    requiredApprovers?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
    votes?: SpendApprovalVoteOrderByRelationAggregateInput
  }

  export type SpendApprovalRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SpendApprovalRequestWhereInput | SpendApprovalRequestWhereInput[]
    OR?: SpendApprovalRequestWhereInput[]
    NOT?: SpendApprovalRequestWhereInput | SpendApprovalRequestWhereInput[]
    agentId?: StringFilter<"SpendApprovalRequest"> | string
    intentId?: StringNullableFilter<"SpendApprovalRequest"> | string | null
    amountMinor?: BigIntFilter<"SpendApprovalRequest"> | bigint | number
    destination?: StringFilter<"SpendApprovalRequest"> | string
    approvalCount?: IntFilter<"SpendApprovalRequest"> | number
    requiredApprovers?: IntFilter<"SpendApprovalRequest"> | number
    status?: EnumSpendApprovalStatusFilter<"SpendApprovalRequest"> | $Enums.SpendApprovalStatus
    createdAt?: DateTimeFilter<"SpendApprovalRequest"> | Date | string
    updatedAt?: DateTimeFilter<"SpendApprovalRequest"> | Date | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
    votes?: SpendApprovalVoteListRelationFilter
  }, "id">

  export type SpendApprovalRequestOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    intentId?: SortOrderInput | SortOrder
    amountMinor?: SortOrder
    destination?: SortOrder
    approvalCount?: SortOrder
    requiredApprovers?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SpendApprovalRequestCountOrderByAggregateInput
    _avg?: SpendApprovalRequestAvgOrderByAggregateInput
    _max?: SpendApprovalRequestMaxOrderByAggregateInput
    _min?: SpendApprovalRequestMinOrderByAggregateInput
    _sum?: SpendApprovalRequestSumOrderByAggregateInput
  }

  export type SpendApprovalRequestScalarWhereWithAggregatesInput = {
    AND?: SpendApprovalRequestScalarWhereWithAggregatesInput | SpendApprovalRequestScalarWhereWithAggregatesInput[]
    OR?: SpendApprovalRequestScalarWhereWithAggregatesInput[]
    NOT?: SpendApprovalRequestScalarWhereWithAggregatesInput | SpendApprovalRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SpendApprovalRequest"> | string
    agentId?: StringWithAggregatesFilter<"SpendApprovalRequest"> | string
    intentId?: StringNullableWithAggregatesFilter<"SpendApprovalRequest"> | string | null
    amountMinor?: BigIntWithAggregatesFilter<"SpendApprovalRequest"> | bigint | number
    destination?: StringWithAggregatesFilter<"SpendApprovalRequest"> | string
    approvalCount?: IntWithAggregatesFilter<"SpendApprovalRequest"> | number
    requiredApprovers?: IntWithAggregatesFilter<"SpendApprovalRequest"> | number
    status?: EnumSpendApprovalStatusWithAggregatesFilter<"SpendApprovalRequest"> | $Enums.SpendApprovalStatus
    createdAt?: DateTimeWithAggregatesFilter<"SpendApprovalRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SpendApprovalRequest"> | Date | string
  }

  export type SpendApprovalVoteWhereInput = {
    AND?: SpendApprovalVoteWhereInput | SpendApprovalVoteWhereInput[]
    OR?: SpendApprovalVoteWhereInput[]
    NOT?: SpendApprovalVoteWhereInput | SpendApprovalVoteWhereInput[]
    id?: StringFilter<"SpendApprovalVote"> | string
    requestId?: StringFilter<"SpendApprovalVote"> | string
    approverId?: StringFilter<"SpendApprovalVote"> | string
    createdAt?: DateTimeFilter<"SpendApprovalVote"> | Date | string
    request?: XOR<SpendApprovalRequestRelationFilter, SpendApprovalRequestWhereInput>
  }

  export type SpendApprovalVoteOrderByWithRelationInput = {
    id?: SortOrder
    requestId?: SortOrder
    approverId?: SortOrder
    createdAt?: SortOrder
    request?: SpendApprovalRequestOrderByWithRelationInput
  }

  export type SpendApprovalVoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    requestId_approverId?: SpendApprovalVoteRequestIdApproverIdCompoundUniqueInput
    AND?: SpendApprovalVoteWhereInput | SpendApprovalVoteWhereInput[]
    OR?: SpendApprovalVoteWhereInput[]
    NOT?: SpendApprovalVoteWhereInput | SpendApprovalVoteWhereInput[]
    requestId?: StringFilter<"SpendApprovalVote"> | string
    approverId?: StringFilter<"SpendApprovalVote"> | string
    createdAt?: DateTimeFilter<"SpendApprovalVote"> | Date | string
    request?: XOR<SpendApprovalRequestRelationFilter, SpendApprovalRequestWhereInput>
  }, "id" | "requestId_approverId">

  export type SpendApprovalVoteOrderByWithAggregationInput = {
    id?: SortOrder
    requestId?: SortOrder
    approverId?: SortOrder
    createdAt?: SortOrder
    _count?: SpendApprovalVoteCountOrderByAggregateInput
    _max?: SpendApprovalVoteMaxOrderByAggregateInput
    _min?: SpendApprovalVoteMinOrderByAggregateInput
  }

  export type SpendApprovalVoteScalarWhereWithAggregatesInput = {
    AND?: SpendApprovalVoteScalarWhereWithAggregatesInput | SpendApprovalVoteScalarWhereWithAggregatesInput[]
    OR?: SpendApprovalVoteScalarWhereWithAggregatesInput[]
    NOT?: SpendApprovalVoteScalarWhereWithAggregatesInput | SpendApprovalVoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SpendApprovalVote"> | string
    requestId?: StringWithAggregatesFilter<"SpendApprovalVote"> | string
    approverId?: StringWithAggregatesFilter<"SpendApprovalVote"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SpendApprovalVote"> | Date | string
  }

  export type AgentServiceWhereInput = {
    AND?: AgentServiceWhereInput | AgentServiceWhereInput[]
    OR?: AgentServiceWhereInput[]
    NOT?: AgentServiceWhereInput | AgentServiceWhereInput[]
    id?: StringFilter<"AgentService"> | string
    agentId?: StringFilter<"AgentService"> | string
    name?: StringFilter<"AgentService"> | string
    description?: StringNullableFilter<"AgentService"> | string | null
    priceMinor?: BigIntFilter<"AgentService"> | bigint | number
    currency?: StringFilter<"AgentService"> | string
    capability?: JsonNullableFilter<"AgentService">
    status?: EnumAgentServiceStatusFilter<"AgentService"> | $Enums.AgentServiceStatus
    createdAt?: DateTimeFilter<"AgentService"> | Date | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
    subscriptions?: AgentSubscriptionListRelationFilter
    listings?: AgentMarketplaceListingListRelationFilter
  }

  export type AgentServiceOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    priceMinor?: SortOrder
    currency?: SortOrder
    capability?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
    subscriptions?: AgentSubscriptionOrderByRelationAggregateInput
    listings?: AgentMarketplaceListingOrderByRelationAggregateInput
  }

  export type AgentServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgentServiceWhereInput | AgentServiceWhereInput[]
    OR?: AgentServiceWhereInput[]
    NOT?: AgentServiceWhereInput | AgentServiceWhereInput[]
    agentId?: StringFilter<"AgentService"> | string
    name?: StringFilter<"AgentService"> | string
    description?: StringNullableFilter<"AgentService"> | string | null
    priceMinor?: BigIntFilter<"AgentService"> | bigint | number
    currency?: StringFilter<"AgentService"> | string
    capability?: JsonNullableFilter<"AgentService">
    status?: EnumAgentServiceStatusFilter<"AgentService"> | $Enums.AgentServiceStatus
    createdAt?: DateTimeFilter<"AgentService"> | Date | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
    subscriptions?: AgentSubscriptionListRelationFilter
    listings?: AgentMarketplaceListingListRelationFilter
  }, "id">

  export type AgentServiceOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    priceMinor?: SortOrder
    currency?: SortOrder
    capability?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: AgentServiceCountOrderByAggregateInput
    _avg?: AgentServiceAvgOrderByAggregateInput
    _max?: AgentServiceMaxOrderByAggregateInput
    _min?: AgentServiceMinOrderByAggregateInput
    _sum?: AgentServiceSumOrderByAggregateInput
  }

  export type AgentServiceScalarWhereWithAggregatesInput = {
    AND?: AgentServiceScalarWhereWithAggregatesInput | AgentServiceScalarWhereWithAggregatesInput[]
    OR?: AgentServiceScalarWhereWithAggregatesInput[]
    NOT?: AgentServiceScalarWhereWithAggregatesInput | AgentServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentService"> | string
    agentId?: StringWithAggregatesFilter<"AgentService"> | string
    name?: StringWithAggregatesFilter<"AgentService"> | string
    description?: StringNullableWithAggregatesFilter<"AgentService"> | string | null
    priceMinor?: BigIntWithAggregatesFilter<"AgentService"> | bigint | number
    currency?: StringWithAggregatesFilter<"AgentService"> | string
    capability?: JsonNullableWithAggregatesFilter<"AgentService">
    status?: EnumAgentServiceStatusWithAggregatesFilter<"AgentService"> | $Enums.AgentServiceStatus
    createdAt?: DateTimeWithAggregatesFilter<"AgentService"> | Date | string
  }

  export type AgentSubscriptionWhereInput = {
    AND?: AgentSubscriptionWhereInput | AgentSubscriptionWhereInput[]
    OR?: AgentSubscriptionWhereInput[]
    NOT?: AgentSubscriptionWhereInput | AgentSubscriptionWhereInput[]
    id?: StringFilter<"AgentSubscription"> | string
    serviceId?: StringFilter<"AgentSubscription"> | string
    subscriberAgentId?: StringFilter<"AgentSubscription"> | string
    status?: EnumSubscriptionStatusFilter<"AgentSubscription"> | $Enums.SubscriptionStatus
    renewAt?: DateTimeNullableFilter<"AgentSubscription"> | Date | string | null
    intentId?: StringNullableFilter<"AgentSubscription"> | string | null
    createdAt?: DateTimeFilter<"AgentSubscription"> | Date | string
    service?: XOR<AgentServiceRelationFilter, AgentServiceWhereInput>
  }

  export type AgentSubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    subscriberAgentId?: SortOrder
    status?: SortOrder
    renewAt?: SortOrderInput | SortOrder
    intentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    service?: AgentServiceOrderByWithRelationInput
  }

  export type AgentSubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgentSubscriptionWhereInput | AgentSubscriptionWhereInput[]
    OR?: AgentSubscriptionWhereInput[]
    NOT?: AgentSubscriptionWhereInput | AgentSubscriptionWhereInput[]
    serviceId?: StringFilter<"AgentSubscription"> | string
    subscriberAgentId?: StringFilter<"AgentSubscription"> | string
    status?: EnumSubscriptionStatusFilter<"AgentSubscription"> | $Enums.SubscriptionStatus
    renewAt?: DateTimeNullableFilter<"AgentSubscription"> | Date | string | null
    intentId?: StringNullableFilter<"AgentSubscription"> | string | null
    createdAt?: DateTimeFilter<"AgentSubscription"> | Date | string
    service?: XOR<AgentServiceRelationFilter, AgentServiceWhereInput>
  }, "id">

  export type AgentSubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    subscriberAgentId?: SortOrder
    status?: SortOrder
    renewAt?: SortOrderInput | SortOrder
    intentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AgentSubscriptionCountOrderByAggregateInput
    _max?: AgentSubscriptionMaxOrderByAggregateInput
    _min?: AgentSubscriptionMinOrderByAggregateInput
  }

  export type AgentSubscriptionScalarWhereWithAggregatesInput = {
    AND?: AgentSubscriptionScalarWhereWithAggregatesInput | AgentSubscriptionScalarWhereWithAggregatesInput[]
    OR?: AgentSubscriptionScalarWhereWithAggregatesInput[]
    NOT?: AgentSubscriptionScalarWhereWithAggregatesInput | AgentSubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentSubscription"> | string
    serviceId?: StringWithAggregatesFilter<"AgentSubscription"> | string
    subscriberAgentId?: StringWithAggregatesFilter<"AgentSubscription"> | string
    status?: EnumSubscriptionStatusWithAggregatesFilter<"AgentSubscription"> | $Enums.SubscriptionStatus
    renewAt?: DateTimeNullableWithAggregatesFilter<"AgentSubscription"> | Date | string | null
    intentId?: StringNullableWithAggregatesFilter<"AgentSubscription"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AgentSubscription"> | Date | string
  }

  export type AgentMarketplaceListingWhereInput = {
    AND?: AgentMarketplaceListingWhereInput | AgentMarketplaceListingWhereInput[]
    OR?: AgentMarketplaceListingWhereInput[]
    NOT?: AgentMarketplaceListingWhereInput | AgentMarketplaceListingWhereInput[]
    id?: StringFilter<"AgentMarketplaceListing"> | string
    serviceId?: StringFilter<"AgentMarketplaceListing"> | string
    tags?: JsonNullableFilter<"AgentMarketplaceListing">
    ratingBps?: IntNullableFilter<"AgentMarketplaceListing"> | number | null
    visible?: BoolFilter<"AgentMarketplaceListing"> | boolean
    onChainId?: StringNullableFilter<"AgentMarketplaceListing"> | string | null
    createdAt?: DateTimeFilter<"AgentMarketplaceListing"> | Date | string
    service?: XOR<AgentServiceRelationFilter, AgentServiceWhereInput>
  }

  export type AgentMarketplaceListingOrderByWithRelationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    tags?: SortOrderInput | SortOrder
    ratingBps?: SortOrderInput | SortOrder
    visible?: SortOrder
    onChainId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    service?: AgentServiceOrderByWithRelationInput
  }

  export type AgentMarketplaceListingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgentMarketplaceListingWhereInput | AgentMarketplaceListingWhereInput[]
    OR?: AgentMarketplaceListingWhereInput[]
    NOT?: AgentMarketplaceListingWhereInput | AgentMarketplaceListingWhereInput[]
    serviceId?: StringFilter<"AgentMarketplaceListing"> | string
    tags?: JsonNullableFilter<"AgentMarketplaceListing">
    ratingBps?: IntNullableFilter<"AgentMarketplaceListing"> | number | null
    visible?: BoolFilter<"AgentMarketplaceListing"> | boolean
    onChainId?: StringNullableFilter<"AgentMarketplaceListing"> | string | null
    createdAt?: DateTimeFilter<"AgentMarketplaceListing"> | Date | string
    service?: XOR<AgentServiceRelationFilter, AgentServiceWhereInput>
  }, "id">

  export type AgentMarketplaceListingOrderByWithAggregationInput = {
    id?: SortOrder
    serviceId?: SortOrder
    tags?: SortOrderInput | SortOrder
    ratingBps?: SortOrderInput | SortOrder
    visible?: SortOrder
    onChainId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AgentMarketplaceListingCountOrderByAggregateInput
    _avg?: AgentMarketplaceListingAvgOrderByAggregateInput
    _max?: AgentMarketplaceListingMaxOrderByAggregateInput
    _min?: AgentMarketplaceListingMinOrderByAggregateInput
    _sum?: AgentMarketplaceListingSumOrderByAggregateInput
  }

  export type AgentMarketplaceListingScalarWhereWithAggregatesInput = {
    AND?: AgentMarketplaceListingScalarWhereWithAggregatesInput | AgentMarketplaceListingScalarWhereWithAggregatesInput[]
    OR?: AgentMarketplaceListingScalarWhereWithAggregatesInput[]
    NOT?: AgentMarketplaceListingScalarWhereWithAggregatesInput | AgentMarketplaceListingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentMarketplaceListing"> | string
    serviceId?: StringWithAggregatesFilter<"AgentMarketplaceListing"> | string
    tags?: JsonNullableWithAggregatesFilter<"AgentMarketplaceListing">
    ratingBps?: IntNullableWithAggregatesFilter<"AgentMarketplaceListing"> | number | null
    visible?: BoolWithAggregatesFilter<"AgentMarketplaceListing"> | boolean
    onChainId?: StringNullableWithAggregatesFilter<"AgentMarketplaceListing"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AgentMarketplaceListing"> | Date | string
  }

  export type AgentInvoiceWhereInput = {
    AND?: AgentInvoiceWhereInput | AgentInvoiceWhereInput[]
    OR?: AgentInvoiceWhereInput[]
    NOT?: AgentInvoiceWhereInput | AgentInvoiceWhereInput[]
    id?: StringFilter<"AgentInvoice"> | string
    agentId?: StringFilter<"AgentInvoice"> | string
    payerAgentId?: StringFilter<"AgentInvoice"> | string
    amountMinor?: BigIntFilter<"AgentInvoice"> | bigint | number
    currency?: StringFilter<"AgentInvoice"> | string
    status?: EnumAgentInvoiceStatusFilter<"AgentInvoice"> | $Enums.AgentInvoiceStatus
    intentId?: StringNullableFilter<"AgentInvoice"> | string | null
    memo?: StringNullableFilter<"AgentInvoice"> | string | null
    createdAt?: DateTimeFilter<"AgentInvoice"> | Date | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
  }

  export type AgentInvoiceOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    payerAgentId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    intentId?: SortOrderInput | SortOrder
    memo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
  }

  export type AgentInvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgentInvoiceWhereInput | AgentInvoiceWhereInput[]
    OR?: AgentInvoiceWhereInput[]
    NOT?: AgentInvoiceWhereInput | AgentInvoiceWhereInput[]
    agentId?: StringFilter<"AgentInvoice"> | string
    payerAgentId?: StringFilter<"AgentInvoice"> | string
    amountMinor?: BigIntFilter<"AgentInvoice"> | bigint | number
    currency?: StringFilter<"AgentInvoice"> | string
    status?: EnumAgentInvoiceStatusFilter<"AgentInvoice"> | $Enums.AgentInvoiceStatus
    intentId?: StringNullableFilter<"AgentInvoice"> | string | null
    memo?: StringNullableFilter<"AgentInvoice"> | string | null
    createdAt?: DateTimeFilter<"AgentInvoice"> | Date | string
    agent?: XOR<AgentRelationFilter, AgentWhereInput>
  }, "id">

  export type AgentInvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    payerAgentId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    intentId?: SortOrderInput | SortOrder
    memo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AgentInvoiceCountOrderByAggregateInput
    _avg?: AgentInvoiceAvgOrderByAggregateInput
    _max?: AgentInvoiceMaxOrderByAggregateInput
    _min?: AgentInvoiceMinOrderByAggregateInput
    _sum?: AgentInvoiceSumOrderByAggregateInput
  }

  export type AgentInvoiceScalarWhereWithAggregatesInput = {
    AND?: AgentInvoiceScalarWhereWithAggregatesInput | AgentInvoiceScalarWhereWithAggregatesInput[]
    OR?: AgentInvoiceScalarWhereWithAggregatesInput[]
    NOT?: AgentInvoiceScalarWhereWithAggregatesInput | AgentInvoiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentInvoice"> | string
    agentId?: StringWithAggregatesFilter<"AgentInvoice"> | string
    payerAgentId?: StringWithAggregatesFilter<"AgentInvoice"> | string
    amountMinor?: BigIntWithAggregatesFilter<"AgentInvoice"> | bigint | number
    currency?: StringWithAggregatesFilter<"AgentInvoice"> | string
    status?: EnumAgentInvoiceStatusWithAggregatesFilter<"AgentInvoice"> | $Enums.AgentInvoiceStatus
    intentId?: StringNullableWithAggregatesFilter<"AgentInvoice"> | string | null
    memo?: StringNullableWithAggregatesFilter<"AgentInvoice"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AgentInvoice"> | Date | string
  }

  export type UsageMeterWhereInput = {
    AND?: UsageMeterWhereInput | UsageMeterWhereInput[]
    OR?: UsageMeterWhereInput[]
    NOT?: UsageMeterWhereInput | UsageMeterWhereInput[]
    id?: StringFilter<"UsageMeter"> | string
    agentId?: StringFilter<"UsageMeter"> | string
    serviceId?: StringNullableFilter<"UsageMeter"> | string | null
    units?: BigIntFilter<"UsageMeter"> | bigint | number
    amountMinor?: BigIntFilter<"UsageMeter"> | bigint | number
    currency?: StringFilter<"UsageMeter"> | string
    periodStart?: DateTimeFilter<"UsageMeter"> | Date | string
    periodEnd?: DateTimeFilter<"UsageMeter"> | Date | string
    settled?: BoolFilter<"UsageMeter"> | boolean
    intentId?: StringNullableFilter<"UsageMeter"> | string | null
    createdAt?: DateTimeFilter<"UsageMeter"> | Date | string
  }

  export type UsageMeterOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    serviceId?: SortOrderInput | SortOrder
    units?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    settled?: SortOrder
    intentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type UsageMeterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UsageMeterWhereInput | UsageMeterWhereInput[]
    OR?: UsageMeterWhereInput[]
    NOT?: UsageMeterWhereInput | UsageMeterWhereInput[]
    agentId?: StringFilter<"UsageMeter"> | string
    serviceId?: StringNullableFilter<"UsageMeter"> | string | null
    units?: BigIntFilter<"UsageMeter"> | bigint | number
    amountMinor?: BigIntFilter<"UsageMeter"> | bigint | number
    currency?: StringFilter<"UsageMeter"> | string
    periodStart?: DateTimeFilter<"UsageMeter"> | Date | string
    periodEnd?: DateTimeFilter<"UsageMeter"> | Date | string
    settled?: BoolFilter<"UsageMeter"> | boolean
    intentId?: StringNullableFilter<"UsageMeter"> | string | null
    createdAt?: DateTimeFilter<"UsageMeter"> | Date | string
  }, "id">

  export type UsageMeterOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    serviceId?: SortOrderInput | SortOrder
    units?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    settled?: SortOrder
    intentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UsageMeterCountOrderByAggregateInput
    _avg?: UsageMeterAvgOrderByAggregateInput
    _max?: UsageMeterMaxOrderByAggregateInput
    _min?: UsageMeterMinOrderByAggregateInput
    _sum?: UsageMeterSumOrderByAggregateInput
  }

  export type UsageMeterScalarWhereWithAggregatesInput = {
    AND?: UsageMeterScalarWhereWithAggregatesInput | UsageMeterScalarWhereWithAggregatesInput[]
    OR?: UsageMeterScalarWhereWithAggregatesInput[]
    NOT?: UsageMeterScalarWhereWithAggregatesInput | UsageMeterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UsageMeter"> | string
    agentId?: StringWithAggregatesFilter<"UsageMeter"> | string
    serviceId?: StringNullableWithAggregatesFilter<"UsageMeter"> | string | null
    units?: BigIntWithAggregatesFilter<"UsageMeter"> | bigint | number
    amountMinor?: BigIntWithAggregatesFilter<"UsageMeter"> | bigint | number
    currency?: StringWithAggregatesFilter<"UsageMeter"> | string
    periodStart?: DateTimeWithAggregatesFilter<"UsageMeter"> | Date | string
    periodEnd?: DateTimeWithAggregatesFilter<"UsageMeter"> | Date | string
    settled?: BoolWithAggregatesFilter<"UsageMeter"> | boolean
    intentId?: StringNullableWithAggregatesFilter<"UsageMeter"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UsageMeter"> | Date | string
  }

  export type EventOutboxCreateInput = {
    id?: string
    eventId: string
    subject: string
    payload: JsonNullValueInput | InputJsonValue
    status?: $Enums.OutboxStatus
    attempts?: number
    lastError?: string | null
    createdAt?: Date | string
    publishedAt?: Date | string | null
  }

  export type EventOutboxUncheckedCreateInput = {
    id?: string
    eventId: string
    subject: string
    payload: JsonNullValueInput | InputJsonValue
    status?: $Enums.OutboxStatus
    attempts?: number
    lastError?: string | null
    createdAt?: Date | string
    publishedAt?: Date | string | null
  }

  export type EventOutboxUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: EnumOutboxStatusFieldUpdateOperationsInput | $Enums.OutboxStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EventOutboxUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: EnumOutboxStatusFieldUpdateOperationsInput | $Enums.OutboxStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EventOutboxCreateManyInput = {
    id?: string
    eventId: string
    subject: string
    payload: JsonNullValueInput | InputJsonValue
    status?: $Enums.OutboxStatus
    attempts?: number
    lastError?: string | null
    createdAt?: Date | string
    publishedAt?: Date | string | null
  }

  export type EventOutboxUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: EnumOutboxStatusFieldUpdateOperationsInput | $Enums.OutboxStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EventOutboxUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    status?: EnumOutboxStatusFieldUpdateOperationsInput | $Enums.OutboxStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AgentCreateInput = {
    id: string
    ownerId: string
    ownerKind: $Enums.OwnerKind
    orgId?: string | null
    name: string
    status?: $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    policy?: AgentSpendingPolicyCreateNestedOneWithoutAgentInput
    reasoningLogs?: AgentReasoningLogCreateNestedManyWithoutAgentInput
    approvalRequests?: SpendApprovalRequestCreateNestedManyWithoutAgentInput
    invoices?: AgentInvoiceCreateNestedManyWithoutAgentInput
    services?: AgentServiceCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateInput = {
    id: string
    ownerId: string
    ownerKind: $Enums.OwnerKind
    orgId?: string | null
    name: string
    status?: $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    policy?: AgentSpendingPolicyUncheckedCreateNestedOneWithoutAgentInput
    reasoningLogs?: AgentReasoningLogUncheckedCreateNestedManyWithoutAgentInput
    approvalRequests?: SpendApprovalRequestUncheckedCreateNestedManyWithoutAgentInput
    invoices?: AgentInvoiceUncheckedCreateNestedManyWithoutAgentInput
    services?: AgentServiceUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerKind?: EnumOwnerKindFieldUpdateOperationsInput | $Enums.OwnerKind
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy?: AgentSpendingPolicyUpdateOneWithoutAgentNestedInput
    reasoningLogs?: AgentReasoningLogUpdateManyWithoutAgentNestedInput
    approvalRequests?: SpendApprovalRequestUpdateManyWithoutAgentNestedInput
    invoices?: AgentInvoiceUpdateManyWithoutAgentNestedInput
    services?: AgentServiceUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerKind?: EnumOwnerKindFieldUpdateOperationsInput | $Enums.OwnerKind
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy?: AgentSpendingPolicyUncheckedUpdateOneWithoutAgentNestedInput
    reasoningLogs?: AgentReasoningLogUncheckedUpdateManyWithoutAgentNestedInput
    approvalRequests?: SpendApprovalRequestUncheckedUpdateManyWithoutAgentNestedInput
    invoices?: AgentInvoiceUncheckedUpdateManyWithoutAgentNestedInput
    services?: AgentServiceUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentCreateManyInput = {
    id: string
    ownerId: string
    ownerKind: $Enums.OwnerKind
    orgId?: string | null
    name: string
    status?: $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerKind?: EnumOwnerKindFieldUpdateOperationsInput | $Enums.OwnerKind
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerKind?: EnumOwnerKindFieldUpdateOperationsInput | $Enums.OwnerKind
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentSpendingPolicyCreateInput = {
    id?: string
    perTxCapMinor: bigint | number
    dailyCapMinor: bigint | number
    monthlyCapMinor?: bigint | number | null
    destinationAllowlist: JsonNullValueInput | InputJsonValue
    approvalThresholdMinor: bigint | number
    requiredApprovers?: number
    currency?: string
    version?: number
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutPolicyInput
  }

  export type AgentSpendingPolicyUncheckedCreateInput = {
    id?: string
    agentId: string
    perTxCapMinor: bigint | number
    dailyCapMinor: bigint | number
    monthlyCapMinor?: bigint | number | null
    destinationAllowlist: JsonNullValueInput | InputJsonValue
    approvalThresholdMinor: bigint | number
    requiredApprovers?: number
    currency?: string
    version?: number
    updatedAt?: Date | string
  }

  export type AgentSpendingPolicyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    perTxCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    dailyCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    monthlyCapMinor?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    destinationAllowlist?: JsonNullValueInput | InputJsonValue
    approvalThresholdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutPolicyNestedInput
  }

  export type AgentSpendingPolicyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    perTxCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    dailyCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    monthlyCapMinor?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    destinationAllowlist?: JsonNullValueInput | InputJsonValue
    approvalThresholdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentSpendingPolicyCreateManyInput = {
    id?: string
    agentId: string
    perTxCapMinor: bigint | number
    dailyCapMinor: bigint | number
    monthlyCapMinor?: bigint | number | null
    destinationAllowlist: JsonNullValueInput | InputJsonValue
    approvalThresholdMinor: bigint | number
    requiredApprovers?: number
    currency?: string
    version?: number
    updatedAt?: Date | string
  }

  export type AgentSpendingPolicyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    perTxCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    dailyCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    monthlyCapMinor?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    destinationAllowlist?: JsonNullValueInput | InputJsonValue
    approvalThresholdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentSpendingPolicyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    perTxCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    dailyCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    monthlyCapMinor?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    destinationAllowlist?: JsonNullValueInput | InputJsonValue
    approvalThresholdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentReasoningLogCreateInput = {
    id: string
    intentId?: string | null
    traceId?: string | null
    summary: string
    steps: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    agent: AgentCreateNestedOneWithoutReasoningLogsInput
  }

  export type AgentReasoningLogUncheckedCreateInput = {
    id: string
    agentId: string
    intentId?: string | null
    traceId?: string | null
    summary: string
    steps: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AgentReasoningLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutReasoningLogsNestedInput
  }

  export type AgentReasoningLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentReasoningLogCreateManyInput = {
    id: string
    agentId: string
    intentId?: string | null
    traceId?: string | null
    summary: string
    steps: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AgentReasoningLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentReasoningLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpendApprovalRequestCreateInput = {
    id: string
    intentId?: string | null
    amountMinor: bigint | number
    destination: string
    approvalCount?: number
    requiredApprovers: number
    status?: $Enums.SpendApprovalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutApprovalRequestsInput
    votes?: SpendApprovalVoteCreateNestedManyWithoutRequestInput
  }

  export type SpendApprovalRequestUncheckedCreateInput = {
    id: string
    agentId: string
    intentId?: string | null
    amountMinor: bigint | number
    destination: string
    approvalCount?: number
    requiredApprovers: number
    status?: $Enums.SpendApprovalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    votes?: SpendApprovalVoteUncheckedCreateNestedManyWithoutRequestInput
  }

  export type SpendApprovalRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    destination?: StringFieldUpdateOperationsInput | string
    approvalCount?: IntFieldUpdateOperationsInput | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    status?: EnumSpendApprovalStatusFieldUpdateOperationsInput | $Enums.SpendApprovalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutApprovalRequestsNestedInput
    votes?: SpendApprovalVoteUpdateManyWithoutRequestNestedInput
  }

  export type SpendApprovalRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    destination?: StringFieldUpdateOperationsInput | string
    approvalCount?: IntFieldUpdateOperationsInput | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    status?: EnumSpendApprovalStatusFieldUpdateOperationsInput | $Enums.SpendApprovalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: SpendApprovalVoteUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type SpendApprovalRequestCreateManyInput = {
    id: string
    agentId: string
    intentId?: string | null
    amountMinor: bigint | number
    destination: string
    approvalCount?: number
    requiredApprovers: number
    status?: $Enums.SpendApprovalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpendApprovalRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    destination?: StringFieldUpdateOperationsInput | string
    approvalCount?: IntFieldUpdateOperationsInput | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    status?: EnumSpendApprovalStatusFieldUpdateOperationsInput | $Enums.SpendApprovalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpendApprovalRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    destination?: StringFieldUpdateOperationsInput | string
    approvalCount?: IntFieldUpdateOperationsInput | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    status?: EnumSpendApprovalStatusFieldUpdateOperationsInput | $Enums.SpendApprovalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpendApprovalVoteCreateInput = {
    id: string
    approverId: string
    createdAt?: Date | string
    request: SpendApprovalRequestCreateNestedOneWithoutVotesInput
  }

  export type SpendApprovalVoteUncheckedCreateInput = {
    id: string
    requestId: string
    approverId: string
    createdAt?: Date | string
  }

  export type SpendApprovalVoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    approverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    request?: SpendApprovalRequestUpdateOneRequiredWithoutVotesNestedInput
  }

  export type SpendApprovalVoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    approverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpendApprovalVoteCreateManyInput = {
    id: string
    requestId: string
    approverId: string
    createdAt?: Date | string
  }

  export type SpendApprovalVoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    approverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpendApprovalVoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    approverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentServiceCreateInput = {
    id: string
    name: string
    description?: string | null
    priceMinor: bigint | number
    currency?: string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.AgentServiceStatus
    createdAt?: Date | string
    agent: AgentCreateNestedOneWithoutServicesInput
    subscriptions?: AgentSubscriptionCreateNestedManyWithoutServiceInput
    listings?: AgentMarketplaceListingCreateNestedManyWithoutServiceInput
  }

  export type AgentServiceUncheckedCreateInput = {
    id: string
    agentId: string
    name: string
    description?: string | null
    priceMinor: bigint | number
    currency?: string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.AgentServiceStatus
    createdAt?: Date | string
    subscriptions?: AgentSubscriptionUncheckedCreateNestedManyWithoutServiceInput
    listings?: AgentMarketplaceListingUncheckedCreateNestedManyWithoutServiceInput
  }

  export type AgentServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumAgentServiceStatusFieldUpdateOperationsInput | $Enums.AgentServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutServicesNestedInput
    subscriptions?: AgentSubscriptionUpdateManyWithoutServiceNestedInput
    listings?: AgentMarketplaceListingUpdateManyWithoutServiceNestedInput
  }

  export type AgentServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumAgentServiceStatusFieldUpdateOperationsInput | $Enums.AgentServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: AgentSubscriptionUncheckedUpdateManyWithoutServiceNestedInput
    listings?: AgentMarketplaceListingUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type AgentServiceCreateManyInput = {
    id: string
    agentId: string
    name: string
    description?: string | null
    priceMinor: bigint | number
    currency?: string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.AgentServiceStatus
    createdAt?: Date | string
  }

  export type AgentServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumAgentServiceStatusFieldUpdateOperationsInput | $Enums.AgentServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumAgentServiceStatusFieldUpdateOperationsInput | $Enums.AgentServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentSubscriptionCreateInput = {
    id: string
    subscriberAgentId: string
    status?: $Enums.SubscriptionStatus
    renewAt?: Date | string | null
    intentId?: string | null
    createdAt?: Date | string
    service: AgentServiceCreateNestedOneWithoutSubscriptionsInput
  }

  export type AgentSubscriptionUncheckedCreateInput = {
    id: string
    serviceId: string
    subscriberAgentId: string
    status?: $Enums.SubscriptionStatus
    renewAt?: Date | string | null
    intentId?: string | null
    createdAt?: Date | string
  }

  export type AgentSubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriberAgentId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    renewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: AgentServiceUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type AgentSubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    subscriberAgentId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    renewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentSubscriptionCreateManyInput = {
    id: string
    serviceId: string
    subscriberAgentId: string
    status?: $Enums.SubscriptionStatus
    renewAt?: Date | string | null
    intentId?: string | null
    createdAt?: Date | string
  }

  export type AgentSubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriberAgentId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    renewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentSubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    subscriberAgentId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    renewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentMarketplaceListingCreateInput = {
    id: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    ratingBps?: number | null
    visible?: boolean
    onChainId?: string | null
    createdAt?: Date | string
    service: AgentServiceCreateNestedOneWithoutListingsInput
  }

  export type AgentMarketplaceListingUncheckedCreateInput = {
    id: string
    serviceId: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    ratingBps?: number | null
    visible?: boolean
    onChainId?: string | null
    createdAt?: Date | string
  }

  export type AgentMarketplaceListingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    ratingBps?: NullableIntFieldUpdateOperationsInput | number | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    onChainId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    service?: AgentServiceUpdateOneRequiredWithoutListingsNestedInput
  }

  export type AgentMarketplaceListingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    ratingBps?: NullableIntFieldUpdateOperationsInput | number | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    onChainId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentMarketplaceListingCreateManyInput = {
    id: string
    serviceId: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    ratingBps?: number | null
    visible?: boolean
    onChainId?: string | null
    createdAt?: Date | string
  }

  export type AgentMarketplaceListingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    ratingBps?: NullableIntFieldUpdateOperationsInput | number | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    onChainId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentMarketplaceListingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    ratingBps?: NullableIntFieldUpdateOperationsInput | number | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    onChainId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentInvoiceCreateInput = {
    id: string
    payerAgentId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.AgentInvoiceStatus
    intentId?: string | null
    memo?: string | null
    createdAt?: Date | string
    agent: AgentCreateNestedOneWithoutInvoicesInput
  }

  export type AgentInvoiceUncheckedCreateInput = {
    id: string
    agentId: string
    payerAgentId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.AgentInvoiceStatus
    intentId?: string | null
    memo?: string | null
    createdAt?: Date | string
  }

  export type AgentInvoiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    payerAgentId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentInvoiceStatusFieldUpdateOperationsInput | $Enums.AgentInvoiceStatus
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutInvoicesNestedInput
  }

  export type AgentInvoiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    payerAgentId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentInvoiceStatusFieldUpdateOperationsInput | $Enums.AgentInvoiceStatus
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentInvoiceCreateManyInput = {
    id: string
    agentId: string
    payerAgentId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.AgentInvoiceStatus
    intentId?: string | null
    memo?: string | null
    createdAt?: Date | string
  }

  export type AgentInvoiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    payerAgentId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentInvoiceStatusFieldUpdateOperationsInput | $Enums.AgentInvoiceStatus
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentInvoiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    payerAgentId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentInvoiceStatusFieldUpdateOperationsInput | $Enums.AgentInvoiceStatus
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageMeterCreateInput = {
    id: string
    agentId: string
    serviceId?: string | null
    units: bigint | number
    amountMinor: bigint | number
    currency: string
    periodStart: Date | string
    periodEnd: Date | string
    settled?: boolean
    intentId?: string | null
    createdAt?: Date | string
  }

  export type UsageMeterUncheckedCreateInput = {
    id: string
    agentId: string
    serviceId?: string | null
    units: bigint | number
    amountMinor: bigint | number
    currency: string
    periodStart: Date | string
    periodEnd: Date | string
    settled?: boolean
    intentId?: string | null
    createdAt?: Date | string
  }

  export type UsageMeterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    units?: BigIntFieldUpdateOperationsInput | bigint | number
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    settled?: BoolFieldUpdateOperationsInput | boolean
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageMeterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    units?: BigIntFieldUpdateOperationsInput | bigint | number
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    settled?: BoolFieldUpdateOperationsInput | boolean
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageMeterCreateManyInput = {
    id: string
    agentId: string
    serviceId?: string | null
    units: bigint | number
    amountMinor: bigint | number
    currency: string
    periodStart: Date | string
    periodEnd: Date | string
    settled?: boolean
    intentId?: string | null
    createdAt?: Date | string
  }

  export type UsageMeterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    units?: BigIntFieldUpdateOperationsInput | bigint | number
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    settled?: BoolFieldUpdateOperationsInput | boolean
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageMeterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    units?: BigIntFieldUpdateOperationsInput | bigint | number
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    settled?: BoolFieldUpdateOperationsInput | boolean
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumOutboxStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboxStatus | EnumOutboxStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOutboxStatusFilter<$PrismaModel> | $Enums.OutboxStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EventOutboxCountOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    subject?: SortOrder
    payload?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type EventOutboxAvgOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type EventOutboxMaxOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type EventOutboxMinOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrder
    createdAt?: SortOrder
    publishedAt?: SortOrder
  }

  export type EventOutboxSumOrderByAggregateInput = {
    attempts?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumOutboxStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboxStatus | EnumOutboxStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOutboxStatusWithAggregatesFilter<$PrismaModel> | $Enums.OutboxStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOutboxStatusFilter<$PrismaModel>
    _max?: NestedEnumOutboxStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumOwnerKindFilter<$PrismaModel = never> = {
    equals?: $Enums.OwnerKind | EnumOwnerKindFieldRefInput<$PrismaModel>
    in?: $Enums.OwnerKind[] | ListEnumOwnerKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.OwnerKind[] | ListEnumOwnerKindFieldRefInput<$PrismaModel>
    not?: NestedEnumOwnerKindFilter<$PrismaModel> | $Enums.OwnerKind
  }

  export type EnumAgentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentStatus | EnumAgentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentStatus[] | ListEnumAgentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentStatus[] | ListEnumAgentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentStatusFilter<$PrismaModel> | $Enums.AgentStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AgentSpendingPolicyNullableRelationFilter = {
    is?: AgentSpendingPolicyWhereInput | null
    isNot?: AgentSpendingPolicyWhereInput | null
  }

  export type AgentReasoningLogListRelationFilter = {
    every?: AgentReasoningLogWhereInput
    some?: AgentReasoningLogWhereInput
    none?: AgentReasoningLogWhereInput
  }

  export type SpendApprovalRequestListRelationFilter = {
    every?: SpendApprovalRequestWhereInput
    some?: SpendApprovalRequestWhereInput
    none?: SpendApprovalRequestWhereInput
  }

  export type AgentInvoiceListRelationFilter = {
    every?: AgentInvoiceWhereInput
    some?: AgentInvoiceWhereInput
    none?: AgentInvoiceWhereInput
  }

  export type AgentServiceListRelationFilter = {
    every?: AgentServiceWhereInput
    some?: AgentServiceWhereInput
    none?: AgentServiceWhereInput
  }

  export type AgentReasoningLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SpendApprovalRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentInvoiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentCountOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    ownerKind?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentMaxOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    ownerKind?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentMinOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    ownerKind?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumOwnerKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OwnerKind | EnumOwnerKindFieldRefInput<$PrismaModel>
    in?: $Enums.OwnerKind[] | ListEnumOwnerKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.OwnerKind[] | ListEnumOwnerKindFieldRefInput<$PrismaModel>
    not?: NestedEnumOwnerKindWithAggregatesFilter<$PrismaModel> | $Enums.OwnerKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOwnerKindFilter<$PrismaModel>
    _max?: NestedEnumOwnerKindFilter<$PrismaModel>
  }

  export type EnumAgentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentStatus | EnumAgentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentStatus[] | ListEnumAgentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentStatus[] | ListEnumAgentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AgentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAgentStatusFilter<$PrismaModel>
    _max?: NestedEnumAgentStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type AgentRelationFilter = {
    is?: AgentWhereInput
    isNot?: AgentWhereInput
  }

  export type AgentSpendingPolicyCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    perTxCapMinor?: SortOrder
    dailyCapMinor?: SortOrder
    monthlyCapMinor?: SortOrder
    destinationAllowlist?: SortOrder
    approvalThresholdMinor?: SortOrder
    requiredApprovers?: SortOrder
    currency?: SortOrder
    version?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentSpendingPolicyAvgOrderByAggregateInput = {
    perTxCapMinor?: SortOrder
    dailyCapMinor?: SortOrder
    monthlyCapMinor?: SortOrder
    approvalThresholdMinor?: SortOrder
    requiredApprovers?: SortOrder
    version?: SortOrder
  }

  export type AgentSpendingPolicyMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    perTxCapMinor?: SortOrder
    dailyCapMinor?: SortOrder
    monthlyCapMinor?: SortOrder
    approvalThresholdMinor?: SortOrder
    requiredApprovers?: SortOrder
    currency?: SortOrder
    version?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentSpendingPolicyMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    perTxCapMinor?: SortOrder
    dailyCapMinor?: SortOrder
    monthlyCapMinor?: SortOrder
    approvalThresholdMinor?: SortOrder
    requiredApprovers?: SortOrder
    currency?: SortOrder
    version?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentSpendingPolicySumOrderByAggregateInput = {
    perTxCapMinor?: SortOrder
    dailyCapMinor?: SortOrder
    monthlyCapMinor?: SortOrder
    approvalThresholdMinor?: SortOrder
    requiredApprovers?: SortOrder
    version?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type AgentReasoningLogCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    intentId?: SortOrder
    traceId?: SortOrder
    summary?: SortOrder
    steps?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentReasoningLogMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    intentId?: SortOrder
    traceId?: SortOrder
    summary?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentReasoningLogMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    intentId?: SortOrder
    traceId?: SortOrder
    summary?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumSpendApprovalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SpendApprovalStatus | EnumSpendApprovalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SpendApprovalStatus[] | ListEnumSpendApprovalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SpendApprovalStatus[] | ListEnumSpendApprovalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSpendApprovalStatusFilter<$PrismaModel> | $Enums.SpendApprovalStatus
  }

  export type SpendApprovalVoteListRelationFilter = {
    every?: SpendApprovalVoteWhereInput
    some?: SpendApprovalVoteWhereInput
    none?: SpendApprovalVoteWhereInput
  }

  export type SpendApprovalVoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SpendApprovalRequestCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    intentId?: SortOrder
    amountMinor?: SortOrder
    destination?: SortOrder
    approvalCount?: SortOrder
    requiredApprovers?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpendApprovalRequestAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
    approvalCount?: SortOrder
    requiredApprovers?: SortOrder
  }

  export type SpendApprovalRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    intentId?: SortOrder
    amountMinor?: SortOrder
    destination?: SortOrder
    approvalCount?: SortOrder
    requiredApprovers?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpendApprovalRequestMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    intentId?: SortOrder
    amountMinor?: SortOrder
    destination?: SortOrder
    approvalCount?: SortOrder
    requiredApprovers?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpendApprovalRequestSumOrderByAggregateInput = {
    amountMinor?: SortOrder
    approvalCount?: SortOrder
    requiredApprovers?: SortOrder
  }

  export type EnumSpendApprovalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SpendApprovalStatus | EnumSpendApprovalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SpendApprovalStatus[] | ListEnumSpendApprovalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SpendApprovalStatus[] | ListEnumSpendApprovalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSpendApprovalStatusWithAggregatesFilter<$PrismaModel> | $Enums.SpendApprovalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSpendApprovalStatusFilter<$PrismaModel>
    _max?: NestedEnumSpendApprovalStatusFilter<$PrismaModel>
  }

  export type SpendApprovalRequestRelationFilter = {
    is?: SpendApprovalRequestWhereInput
    isNot?: SpendApprovalRequestWhereInput
  }

  export type SpendApprovalVoteRequestIdApproverIdCompoundUniqueInput = {
    requestId: string
    approverId: string
  }

  export type SpendApprovalVoteCountOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    approverId?: SortOrder
    createdAt?: SortOrder
  }

  export type SpendApprovalVoteMaxOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    approverId?: SortOrder
    createdAt?: SortOrder
  }

  export type SpendApprovalVoteMinOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    approverId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAgentServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentServiceStatus | EnumAgentServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentServiceStatus[] | ListEnumAgentServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentServiceStatus[] | ListEnumAgentServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentServiceStatusFilter<$PrismaModel> | $Enums.AgentServiceStatus
  }

  export type AgentSubscriptionListRelationFilter = {
    every?: AgentSubscriptionWhereInput
    some?: AgentSubscriptionWhereInput
    none?: AgentSubscriptionWhereInput
  }

  export type AgentMarketplaceListingListRelationFilter = {
    every?: AgentMarketplaceListingWhereInput
    some?: AgentMarketplaceListingWhereInput
    none?: AgentMarketplaceListingWhereInput
  }

  export type AgentSubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentMarketplaceListingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentServiceCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMinor?: SortOrder
    currency?: SortOrder
    capability?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentServiceAvgOrderByAggregateInput = {
    priceMinor?: SortOrder
  }

  export type AgentServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentServiceMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentServiceSumOrderByAggregateInput = {
    priceMinor?: SortOrder
  }

  export type EnumAgentServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentServiceStatus | EnumAgentServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentServiceStatus[] | ListEnumAgentServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentServiceStatus[] | ListEnumAgentServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.AgentServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAgentServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumAgentServiceStatusFilter<$PrismaModel>
  }

  export type EnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type AgentServiceRelationFilter = {
    is?: AgentServiceWhereInput
    isNot?: AgentServiceWhereInput
  }

  export type AgentSubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    subscriberAgentId?: SortOrder
    status?: SortOrder
    renewAt?: SortOrder
    intentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentSubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    subscriberAgentId?: SortOrder
    status?: SortOrder
    renewAt?: SortOrder
    intentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentSubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    subscriberAgentId?: SortOrder
    status?: SortOrder
    renewAt?: SortOrder
    intentId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AgentMarketplaceListingCountOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    tags?: SortOrder
    ratingBps?: SortOrder
    visible?: SortOrder
    onChainId?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentMarketplaceListingAvgOrderByAggregateInput = {
    ratingBps?: SortOrder
  }

  export type AgentMarketplaceListingMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    ratingBps?: SortOrder
    visible?: SortOrder
    onChainId?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentMarketplaceListingMinOrderByAggregateInput = {
    id?: SortOrder
    serviceId?: SortOrder
    ratingBps?: SortOrder
    visible?: SortOrder
    onChainId?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentMarketplaceListingSumOrderByAggregateInput = {
    ratingBps?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumAgentInvoiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentInvoiceStatus | EnumAgentInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentInvoiceStatus[] | ListEnumAgentInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentInvoiceStatus[] | ListEnumAgentInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentInvoiceStatusFilter<$PrismaModel> | $Enums.AgentInvoiceStatus
  }

  export type AgentInvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    payerAgentId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    intentId?: SortOrder
    memo?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentInvoiceAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type AgentInvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    payerAgentId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    intentId?: SortOrder
    memo?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentInvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    payerAgentId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    intentId?: SortOrder
    memo?: SortOrder
    createdAt?: SortOrder
  }

  export type AgentInvoiceSumOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type EnumAgentInvoiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentInvoiceStatus | EnumAgentInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentInvoiceStatus[] | ListEnumAgentInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentInvoiceStatus[] | ListEnumAgentInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentInvoiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.AgentInvoiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAgentInvoiceStatusFilter<$PrismaModel>
    _max?: NestedEnumAgentInvoiceStatusFilter<$PrismaModel>
  }

  export type UsageMeterCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    serviceId?: SortOrder
    units?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    settled?: SortOrder
    intentId?: SortOrder
    createdAt?: SortOrder
  }

  export type UsageMeterAvgOrderByAggregateInput = {
    units?: SortOrder
    amountMinor?: SortOrder
  }

  export type UsageMeterMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    serviceId?: SortOrder
    units?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    settled?: SortOrder
    intentId?: SortOrder
    createdAt?: SortOrder
  }

  export type UsageMeterMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    serviceId?: SortOrder
    units?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    settled?: SortOrder
    intentId?: SortOrder
    createdAt?: SortOrder
  }

  export type UsageMeterSumOrderByAggregateInput = {
    units?: SortOrder
    amountMinor?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumOutboxStatusFieldUpdateOperationsInput = {
    set?: $Enums.OutboxStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AgentSpendingPolicyCreateNestedOneWithoutAgentInput = {
    create?: XOR<AgentSpendingPolicyCreateWithoutAgentInput, AgentSpendingPolicyUncheckedCreateWithoutAgentInput>
    connectOrCreate?: AgentSpendingPolicyCreateOrConnectWithoutAgentInput
    connect?: AgentSpendingPolicyWhereUniqueInput
  }

  export type AgentReasoningLogCreateNestedManyWithoutAgentInput = {
    create?: XOR<AgentReasoningLogCreateWithoutAgentInput, AgentReasoningLogUncheckedCreateWithoutAgentInput> | AgentReasoningLogCreateWithoutAgentInput[] | AgentReasoningLogUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentReasoningLogCreateOrConnectWithoutAgentInput | AgentReasoningLogCreateOrConnectWithoutAgentInput[]
    createMany?: AgentReasoningLogCreateManyAgentInputEnvelope
    connect?: AgentReasoningLogWhereUniqueInput | AgentReasoningLogWhereUniqueInput[]
  }

  export type SpendApprovalRequestCreateNestedManyWithoutAgentInput = {
    create?: XOR<SpendApprovalRequestCreateWithoutAgentInput, SpendApprovalRequestUncheckedCreateWithoutAgentInput> | SpendApprovalRequestCreateWithoutAgentInput[] | SpendApprovalRequestUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: SpendApprovalRequestCreateOrConnectWithoutAgentInput | SpendApprovalRequestCreateOrConnectWithoutAgentInput[]
    createMany?: SpendApprovalRequestCreateManyAgentInputEnvelope
    connect?: SpendApprovalRequestWhereUniqueInput | SpendApprovalRequestWhereUniqueInput[]
  }

  export type AgentInvoiceCreateNestedManyWithoutAgentInput = {
    create?: XOR<AgentInvoiceCreateWithoutAgentInput, AgentInvoiceUncheckedCreateWithoutAgentInput> | AgentInvoiceCreateWithoutAgentInput[] | AgentInvoiceUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentInvoiceCreateOrConnectWithoutAgentInput | AgentInvoiceCreateOrConnectWithoutAgentInput[]
    createMany?: AgentInvoiceCreateManyAgentInputEnvelope
    connect?: AgentInvoiceWhereUniqueInput | AgentInvoiceWhereUniqueInput[]
  }

  export type AgentServiceCreateNestedManyWithoutAgentInput = {
    create?: XOR<AgentServiceCreateWithoutAgentInput, AgentServiceUncheckedCreateWithoutAgentInput> | AgentServiceCreateWithoutAgentInput[] | AgentServiceUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentServiceCreateOrConnectWithoutAgentInput | AgentServiceCreateOrConnectWithoutAgentInput[]
    createMany?: AgentServiceCreateManyAgentInputEnvelope
    connect?: AgentServiceWhereUniqueInput | AgentServiceWhereUniqueInput[]
  }

  export type AgentSpendingPolicyUncheckedCreateNestedOneWithoutAgentInput = {
    create?: XOR<AgentSpendingPolicyCreateWithoutAgentInput, AgentSpendingPolicyUncheckedCreateWithoutAgentInput>
    connectOrCreate?: AgentSpendingPolicyCreateOrConnectWithoutAgentInput
    connect?: AgentSpendingPolicyWhereUniqueInput
  }

  export type AgentReasoningLogUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<AgentReasoningLogCreateWithoutAgentInput, AgentReasoningLogUncheckedCreateWithoutAgentInput> | AgentReasoningLogCreateWithoutAgentInput[] | AgentReasoningLogUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentReasoningLogCreateOrConnectWithoutAgentInput | AgentReasoningLogCreateOrConnectWithoutAgentInput[]
    createMany?: AgentReasoningLogCreateManyAgentInputEnvelope
    connect?: AgentReasoningLogWhereUniqueInput | AgentReasoningLogWhereUniqueInput[]
  }

  export type SpendApprovalRequestUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<SpendApprovalRequestCreateWithoutAgentInput, SpendApprovalRequestUncheckedCreateWithoutAgentInput> | SpendApprovalRequestCreateWithoutAgentInput[] | SpendApprovalRequestUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: SpendApprovalRequestCreateOrConnectWithoutAgentInput | SpendApprovalRequestCreateOrConnectWithoutAgentInput[]
    createMany?: SpendApprovalRequestCreateManyAgentInputEnvelope
    connect?: SpendApprovalRequestWhereUniqueInput | SpendApprovalRequestWhereUniqueInput[]
  }

  export type AgentInvoiceUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<AgentInvoiceCreateWithoutAgentInput, AgentInvoiceUncheckedCreateWithoutAgentInput> | AgentInvoiceCreateWithoutAgentInput[] | AgentInvoiceUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentInvoiceCreateOrConnectWithoutAgentInput | AgentInvoiceCreateOrConnectWithoutAgentInput[]
    createMany?: AgentInvoiceCreateManyAgentInputEnvelope
    connect?: AgentInvoiceWhereUniqueInput | AgentInvoiceWhereUniqueInput[]
  }

  export type AgentServiceUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<AgentServiceCreateWithoutAgentInput, AgentServiceUncheckedCreateWithoutAgentInput> | AgentServiceCreateWithoutAgentInput[] | AgentServiceUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentServiceCreateOrConnectWithoutAgentInput | AgentServiceCreateOrConnectWithoutAgentInput[]
    createMany?: AgentServiceCreateManyAgentInputEnvelope
    connect?: AgentServiceWhereUniqueInput | AgentServiceWhereUniqueInput[]
  }

  export type EnumOwnerKindFieldUpdateOperationsInput = {
    set?: $Enums.OwnerKind
  }

  export type EnumAgentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AgentStatus
  }

  export type AgentSpendingPolicyUpdateOneWithoutAgentNestedInput = {
    create?: XOR<AgentSpendingPolicyCreateWithoutAgentInput, AgentSpendingPolicyUncheckedCreateWithoutAgentInput>
    connectOrCreate?: AgentSpendingPolicyCreateOrConnectWithoutAgentInput
    upsert?: AgentSpendingPolicyUpsertWithoutAgentInput
    disconnect?: AgentSpendingPolicyWhereInput | boolean
    delete?: AgentSpendingPolicyWhereInput | boolean
    connect?: AgentSpendingPolicyWhereUniqueInput
    update?: XOR<XOR<AgentSpendingPolicyUpdateToOneWithWhereWithoutAgentInput, AgentSpendingPolicyUpdateWithoutAgentInput>, AgentSpendingPolicyUncheckedUpdateWithoutAgentInput>
  }

  export type AgentReasoningLogUpdateManyWithoutAgentNestedInput = {
    create?: XOR<AgentReasoningLogCreateWithoutAgentInput, AgentReasoningLogUncheckedCreateWithoutAgentInput> | AgentReasoningLogCreateWithoutAgentInput[] | AgentReasoningLogUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentReasoningLogCreateOrConnectWithoutAgentInput | AgentReasoningLogCreateOrConnectWithoutAgentInput[]
    upsert?: AgentReasoningLogUpsertWithWhereUniqueWithoutAgentInput | AgentReasoningLogUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: AgentReasoningLogCreateManyAgentInputEnvelope
    set?: AgentReasoningLogWhereUniqueInput | AgentReasoningLogWhereUniqueInput[]
    disconnect?: AgentReasoningLogWhereUniqueInput | AgentReasoningLogWhereUniqueInput[]
    delete?: AgentReasoningLogWhereUniqueInput | AgentReasoningLogWhereUniqueInput[]
    connect?: AgentReasoningLogWhereUniqueInput | AgentReasoningLogWhereUniqueInput[]
    update?: AgentReasoningLogUpdateWithWhereUniqueWithoutAgentInput | AgentReasoningLogUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: AgentReasoningLogUpdateManyWithWhereWithoutAgentInput | AgentReasoningLogUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: AgentReasoningLogScalarWhereInput | AgentReasoningLogScalarWhereInput[]
  }

  export type SpendApprovalRequestUpdateManyWithoutAgentNestedInput = {
    create?: XOR<SpendApprovalRequestCreateWithoutAgentInput, SpendApprovalRequestUncheckedCreateWithoutAgentInput> | SpendApprovalRequestCreateWithoutAgentInput[] | SpendApprovalRequestUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: SpendApprovalRequestCreateOrConnectWithoutAgentInput | SpendApprovalRequestCreateOrConnectWithoutAgentInput[]
    upsert?: SpendApprovalRequestUpsertWithWhereUniqueWithoutAgentInput | SpendApprovalRequestUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: SpendApprovalRequestCreateManyAgentInputEnvelope
    set?: SpendApprovalRequestWhereUniqueInput | SpendApprovalRequestWhereUniqueInput[]
    disconnect?: SpendApprovalRequestWhereUniqueInput | SpendApprovalRequestWhereUniqueInput[]
    delete?: SpendApprovalRequestWhereUniqueInput | SpendApprovalRequestWhereUniqueInput[]
    connect?: SpendApprovalRequestWhereUniqueInput | SpendApprovalRequestWhereUniqueInput[]
    update?: SpendApprovalRequestUpdateWithWhereUniqueWithoutAgentInput | SpendApprovalRequestUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: SpendApprovalRequestUpdateManyWithWhereWithoutAgentInput | SpendApprovalRequestUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: SpendApprovalRequestScalarWhereInput | SpendApprovalRequestScalarWhereInput[]
  }

  export type AgentInvoiceUpdateManyWithoutAgentNestedInput = {
    create?: XOR<AgentInvoiceCreateWithoutAgentInput, AgentInvoiceUncheckedCreateWithoutAgentInput> | AgentInvoiceCreateWithoutAgentInput[] | AgentInvoiceUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentInvoiceCreateOrConnectWithoutAgentInput | AgentInvoiceCreateOrConnectWithoutAgentInput[]
    upsert?: AgentInvoiceUpsertWithWhereUniqueWithoutAgentInput | AgentInvoiceUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: AgentInvoiceCreateManyAgentInputEnvelope
    set?: AgentInvoiceWhereUniqueInput | AgentInvoiceWhereUniqueInput[]
    disconnect?: AgentInvoiceWhereUniqueInput | AgentInvoiceWhereUniqueInput[]
    delete?: AgentInvoiceWhereUniqueInput | AgentInvoiceWhereUniqueInput[]
    connect?: AgentInvoiceWhereUniqueInput | AgentInvoiceWhereUniqueInput[]
    update?: AgentInvoiceUpdateWithWhereUniqueWithoutAgentInput | AgentInvoiceUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: AgentInvoiceUpdateManyWithWhereWithoutAgentInput | AgentInvoiceUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: AgentInvoiceScalarWhereInput | AgentInvoiceScalarWhereInput[]
  }

  export type AgentServiceUpdateManyWithoutAgentNestedInput = {
    create?: XOR<AgentServiceCreateWithoutAgentInput, AgentServiceUncheckedCreateWithoutAgentInput> | AgentServiceCreateWithoutAgentInput[] | AgentServiceUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentServiceCreateOrConnectWithoutAgentInput | AgentServiceCreateOrConnectWithoutAgentInput[]
    upsert?: AgentServiceUpsertWithWhereUniqueWithoutAgentInput | AgentServiceUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: AgentServiceCreateManyAgentInputEnvelope
    set?: AgentServiceWhereUniqueInput | AgentServiceWhereUniqueInput[]
    disconnect?: AgentServiceWhereUniqueInput | AgentServiceWhereUniqueInput[]
    delete?: AgentServiceWhereUniqueInput | AgentServiceWhereUniqueInput[]
    connect?: AgentServiceWhereUniqueInput | AgentServiceWhereUniqueInput[]
    update?: AgentServiceUpdateWithWhereUniqueWithoutAgentInput | AgentServiceUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: AgentServiceUpdateManyWithWhereWithoutAgentInput | AgentServiceUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: AgentServiceScalarWhereInput | AgentServiceScalarWhereInput[]
  }

  export type AgentSpendingPolicyUncheckedUpdateOneWithoutAgentNestedInput = {
    create?: XOR<AgentSpendingPolicyCreateWithoutAgentInput, AgentSpendingPolicyUncheckedCreateWithoutAgentInput>
    connectOrCreate?: AgentSpendingPolicyCreateOrConnectWithoutAgentInput
    upsert?: AgentSpendingPolicyUpsertWithoutAgentInput
    disconnect?: AgentSpendingPolicyWhereInput | boolean
    delete?: AgentSpendingPolicyWhereInput | boolean
    connect?: AgentSpendingPolicyWhereUniqueInput
    update?: XOR<XOR<AgentSpendingPolicyUpdateToOneWithWhereWithoutAgentInput, AgentSpendingPolicyUpdateWithoutAgentInput>, AgentSpendingPolicyUncheckedUpdateWithoutAgentInput>
  }

  export type AgentReasoningLogUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<AgentReasoningLogCreateWithoutAgentInput, AgentReasoningLogUncheckedCreateWithoutAgentInput> | AgentReasoningLogCreateWithoutAgentInput[] | AgentReasoningLogUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentReasoningLogCreateOrConnectWithoutAgentInput | AgentReasoningLogCreateOrConnectWithoutAgentInput[]
    upsert?: AgentReasoningLogUpsertWithWhereUniqueWithoutAgentInput | AgentReasoningLogUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: AgentReasoningLogCreateManyAgentInputEnvelope
    set?: AgentReasoningLogWhereUniqueInput | AgentReasoningLogWhereUniqueInput[]
    disconnect?: AgentReasoningLogWhereUniqueInput | AgentReasoningLogWhereUniqueInput[]
    delete?: AgentReasoningLogWhereUniqueInput | AgentReasoningLogWhereUniqueInput[]
    connect?: AgentReasoningLogWhereUniqueInput | AgentReasoningLogWhereUniqueInput[]
    update?: AgentReasoningLogUpdateWithWhereUniqueWithoutAgentInput | AgentReasoningLogUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: AgentReasoningLogUpdateManyWithWhereWithoutAgentInput | AgentReasoningLogUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: AgentReasoningLogScalarWhereInput | AgentReasoningLogScalarWhereInput[]
  }

  export type SpendApprovalRequestUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<SpendApprovalRequestCreateWithoutAgentInput, SpendApprovalRequestUncheckedCreateWithoutAgentInput> | SpendApprovalRequestCreateWithoutAgentInput[] | SpendApprovalRequestUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: SpendApprovalRequestCreateOrConnectWithoutAgentInput | SpendApprovalRequestCreateOrConnectWithoutAgentInput[]
    upsert?: SpendApprovalRequestUpsertWithWhereUniqueWithoutAgentInput | SpendApprovalRequestUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: SpendApprovalRequestCreateManyAgentInputEnvelope
    set?: SpendApprovalRequestWhereUniqueInput | SpendApprovalRequestWhereUniqueInput[]
    disconnect?: SpendApprovalRequestWhereUniqueInput | SpendApprovalRequestWhereUniqueInput[]
    delete?: SpendApprovalRequestWhereUniqueInput | SpendApprovalRequestWhereUniqueInput[]
    connect?: SpendApprovalRequestWhereUniqueInput | SpendApprovalRequestWhereUniqueInput[]
    update?: SpendApprovalRequestUpdateWithWhereUniqueWithoutAgentInput | SpendApprovalRequestUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: SpendApprovalRequestUpdateManyWithWhereWithoutAgentInput | SpendApprovalRequestUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: SpendApprovalRequestScalarWhereInput | SpendApprovalRequestScalarWhereInput[]
  }

  export type AgentInvoiceUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<AgentInvoiceCreateWithoutAgentInput, AgentInvoiceUncheckedCreateWithoutAgentInput> | AgentInvoiceCreateWithoutAgentInput[] | AgentInvoiceUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentInvoiceCreateOrConnectWithoutAgentInput | AgentInvoiceCreateOrConnectWithoutAgentInput[]
    upsert?: AgentInvoiceUpsertWithWhereUniqueWithoutAgentInput | AgentInvoiceUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: AgentInvoiceCreateManyAgentInputEnvelope
    set?: AgentInvoiceWhereUniqueInput | AgentInvoiceWhereUniqueInput[]
    disconnect?: AgentInvoiceWhereUniqueInput | AgentInvoiceWhereUniqueInput[]
    delete?: AgentInvoiceWhereUniqueInput | AgentInvoiceWhereUniqueInput[]
    connect?: AgentInvoiceWhereUniqueInput | AgentInvoiceWhereUniqueInput[]
    update?: AgentInvoiceUpdateWithWhereUniqueWithoutAgentInput | AgentInvoiceUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: AgentInvoiceUpdateManyWithWhereWithoutAgentInput | AgentInvoiceUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: AgentInvoiceScalarWhereInput | AgentInvoiceScalarWhereInput[]
  }

  export type AgentServiceUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<AgentServiceCreateWithoutAgentInput, AgentServiceUncheckedCreateWithoutAgentInput> | AgentServiceCreateWithoutAgentInput[] | AgentServiceUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentServiceCreateOrConnectWithoutAgentInput | AgentServiceCreateOrConnectWithoutAgentInput[]
    upsert?: AgentServiceUpsertWithWhereUniqueWithoutAgentInput | AgentServiceUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: AgentServiceCreateManyAgentInputEnvelope
    set?: AgentServiceWhereUniqueInput | AgentServiceWhereUniqueInput[]
    disconnect?: AgentServiceWhereUniqueInput | AgentServiceWhereUniqueInput[]
    delete?: AgentServiceWhereUniqueInput | AgentServiceWhereUniqueInput[]
    connect?: AgentServiceWhereUniqueInput | AgentServiceWhereUniqueInput[]
    update?: AgentServiceUpdateWithWhereUniqueWithoutAgentInput | AgentServiceUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: AgentServiceUpdateManyWithWhereWithoutAgentInput | AgentServiceUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: AgentServiceScalarWhereInput | AgentServiceScalarWhereInput[]
  }

  export type AgentCreateNestedOneWithoutPolicyInput = {
    create?: XOR<AgentCreateWithoutPolicyInput, AgentUncheckedCreateWithoutPolicyInput>
    connectOrCreate?: AgentCreateOrConnectWithoutPolicyInput
    connect?: AgentWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type AgentUpdateOneRequiredWithoutPolicyNestedInput = {
    create?: XOR<AgentCreateWithoutPolicyInput, AgentUncheckedCreateWithoutPolicyInput>
    connectOrCreate?: AgentCreateOrConnectWithoutPolicyInput
    upsert?: AgentUpsertWithoutPolicyInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutPolicyInput, AgentUpdateWithoutPolicyInput>, AgentUncheckedUpdateWithoutPolicyInput>
  }

  export type AgentCreateNestedOneWithoutReasoningLogsInput = {
    create?: XOR<AgentCreateWithoutReasoningLogsInput, AgentUncheckedCreateWithoutReasoningLogsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutReasoningLogsInput
    connect?: AgentWhereUniqueInput
  }

  export type AgentUpdateOneRequiredWithoutReasoningLogsNestedInput = {
    create?: XOR<AgentCreateWithoutReasoningLogsInput, AgentUncheckedCreateWithoutReasoningLogsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutReasoningLogsInput
    upsert?: AgentUpsertWithoutReasoningLogsInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutReasoningLogsInput, AgentUpdateWithoutReasoningLogsInput>, AgentUncheckedUpdateWithoutReasoningLogsInput>
  }

  export type AgentCreateNestedOneWithoutApprovalRequestsInput = {
    create?: XOR<AgentCreateWithoutApprovalRequestsInput, AgentUncheckedCreateWithoutApprovalRequestsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutApprovalRequestsInput
    connect?: AgentWhereUniqueInput
  }

  export type SpendApprovalVoteCreateNestedManyWithoutRequestInput = {
    create?: XOR<SpendApprovalVoteCreateWithoutRequestInput, SpendApprovalVoteUncheckedCreateWithoutRequestInput> | SpendApprovalVoteCreateWithoutRequestInput[] | SpendApprovalVoteUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: SpendApprovalVoteCreateOrConnectWithoutRequestInput | SpendApprovalVoteCreateOrConnectWithoutRequestInput[]
    createMany?: SpendApprovalVoteCreateManyRequestInputEnvelope
    connect?: SpendApprovalVoteWhereUniqueInput | SpendApprovalVoteWhereUniqueInput[]
  }

  export type SpendApprovalVoteUncheckedCreateNestedManyWithoutRequestInput = {
    create?: XOR<SpendApprovalVoteCreateWithoutRequestInput, SpendApprovalVoteUncheckedCreateWithoutRequestInput> | SpendApprovalVoteCreateWithoutRequestInput[] | SpendApprovalVoteUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: SpendApprovalVoteCreateOrConnectWithoutRequestInput | SpendApprovalVoteCreateOrConnectWithoutRequestInput[]
    createMany?: SpendApprovalVoteCreateManyRequestInputEnvelope
    connect?: SpendApprovalVoteWhereUniqueInput | SpendApprovalVoteWhereUniqueInput[]
  }

  export type EnumSpendApprovalStatusFieldUpdateOperationsInput = {
    set?: $Enums.SpendApprovalStatus
  }

  export type AgentUpdateOneRequiredWithoutApprovalRequestsNestedInput = {
    create?: XOR<AgentCreateWithoutApprovalRequestsInput, AgentUncheckedCreateWithoutApprovalRequestsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutApprovalRequestsInput
    upsert?: AgentUpsertWithoutApprovalRequestsInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutApprovalRequestsInput, AgentUpdateWithoutApprovalRequestsInput>, AgentUncheckedUpdateWithoutApprovalRequestsInput>
  }

  export type SpendApprovalVoteUpdateManyWithoutRequestNestedInput = {
    create?: XOR<SpendApprovalVoteCreateWithoutRequestInput, SpendApprovalVoteUncheckedCreateWithoutRequestInput> | SpendApprovalVoteCreateWithoutRequestInput[] | SpendApprovalVoteUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: SpendApprovalVoteCreateOrConnectWithoutRequestInput | SpendApprovalVoteCreateOrConnectWithoutRequestInput[]
    upsert?: SpendApprovalVoteUpsertWithWhereUniqueWithoutRequestInput | SpendApprovalVoteUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: SpendApprovalVoteCreateManyRequestInputEnvelope
    set?: SpendApprovalVoteWhereUniqueInput | SpendApprovalVoteWhereUniqueInput[]
    disconnect?: SpendApprovalVoteWhereUniqueInput | SpendApprovalVoteWhereUniqueInput[]
    delete?: SpendApprovalVoteWhereUniqueInput | SpendApprovalVoteWhereUniqueInput[]
    connect?: SpendApprovalVoteWhereUniqueInput | SpendApprovalVoteWhereUniqueInput[]
    update?: SpendApprovalVoteUpdateWithWhereUniqueWithoutRequestInput | SpendApprovalVoteUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: SpendApprovalVoteUpdateManyWithWhereWithoutRequestInput | SpendApprovalVoteUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: SpendApprovalVoteScalarWhereInput | SpendApprovalVoteScalarWhereInput[]
  }

  export type SpendApprovalVoteUncheckedUpdateManyWithoutRequestNestedInput = {
    create?: XOR<SpendApprovalVoteCreateWithoutRequestInput, SpendApprovalVoteUncheckedCreateWithoutRequestInput> | SpendApprovalVoteCreateWithoutRequestInput[] | SpendApprovalVoteUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: SpendApprovalVoteCreateOrConnectWithoutRequestInput | SpendApprovalVoteCreateOrConnectWithoutRequestInput[]
    upsert?: SpendApprovalVoteUpsertWithWhereUniqueWithoutRequestInput | SpendApprovalVoteUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: SpendApprovalVoteCreateManyRequestInputEnvelope
    set?: SpendApprovalVoteWhereUniqueInput | SpendApprovalVoteWhereUniqueInput[]
    disconnect?: SpendApprovalVoteWhereUniqueInput | SpendApprovalVoteWhereUniqueInput[]
    delete?: SpendApprovalVoteWhereUniqueInput | SpendApprovalVoteWhereUniqueInput[]
    connect?: SpendApprovalVoteWhereUniqueInput | SpendApprovalVoteWhereUniqueInput[]
    update?: SpendApprovalVoteUpdateWithWhereUniqueWithoutRequestInput | SpendApprovalVoteUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: SpendApprovalVoteUpdateManyWithWhereWithoutRequestInput | SpendApprovalVoteUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: SpendApprovalVoteScalarWhereInput | SpendApprovalVoteScalarWhereInput[]
  }

  export type SpendApprovalRequestCreateNestedOneWithoutVotesInput = {
    create?: XOR<SpendApprovalRequestCreateWithoutVotesInput, SpendApprovalRequestUncheckedCreateWithoutVotesInput>
    connectOrCreate?: SpendApprovalRequestCreateOrConnectWithoutVotesInput
    connect?: SpendApprovalRequestWhereUniqueInput
  }

  export type SpendApprovalRequestUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<SpendApprovalRequestCreateWithoutVotesInput, SpendApprovalRequestUncheckedCreateWithoutVotesInput>
    connectOrCreate?: SpendApprovalRequestCreateOrConnectWithoutVotesInput
    upsert?: SpendApprovalRequestUpsertWithoutVotesInput
    connect?: SpendApprovalRequestWhereUniqueInput
    update?: XOR<XOR<SpendApprovalRequestUpdateToOneWithWhereWithoutVotesInput, SpendApprovalRequestUpdateWithoutVotesInput>, SpendApprovalRequestUncheckedUpdateWithoutVotesInput>
  }

  export type AgentCreateNestedOneWithoutServicesInput = {
    create?: XOR<AgentCreateWithoutServicesInput, AgentUncheckedCreateWithoutServicesInput>
    connectOrCreate?: AgentCreateOrConnectWithoutServicesInput
    connect?: AgentWhereUniqueInput
  }

  export type AgentSubscriptionCreateNestedManyWithoutServiceInput = {
    create?: XOR<AgentSubscriptionCreateWithoutServiceInput, AgentSubscriptionUncheckedCreateWithoutServiceInput> | AgentSubscriptionCreateWithoutServiceInput[] | AgentSubscriptionUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AgentSubscriptionCreateOrConnectWithoutServiceInput | AgentSubscriptionCreateOrConnectWithoutServiceInput[]
    createMany?: AgentSubscriptionCreateManyServiceInputEnvelope
    connect?: AgentSubscriptionWhereUniqueInput | AgentSubscriptionWhereUniqueInput[]
  }

  export type AgentMarketplaceListingCreateNestedManyWithoutServiceInput = {
    create?: XOR<AgentMarketplaceListingCreateWithoutServiceInput, AgentMarketplaceListingUncheckedCreateWithoutServiceInput> | AgentMarketplaceListingCreateWithoutServiceInput[] | AgentMarketplaceListingUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AgentMarketplaceListingCreateOrConnectWithoutServiceInput | AgentMarketplaceListingCreateOrConnectWithoutServiceInput[]
    createMany?: AgentMarketplaceListingCreateManyServiceInputEnvelope
    connect?: AgentMarketplaceListingWhereUniqueInput | AgentMarketplaceListingWhereUniqueInput[]
  }

  export type AgentSubscriptionUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<AgentSubscriptionCreateWithoutServiceInput, AgentSubscriptionUncheckedCreateWithoutServiceInput> | AgentSubscriptionCreateWithoutServiceInput[] | AgentSubscriptionUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AgentSubscriptionCreateOrConnectWithoutServiceInput | AgentSubscriptionCreateOrConnectWithoutServiceInput[]
    createMany?: AgentSubscriptionCreateManyServiceInputEnvelope
    connect?: AgentSubscriptionWhereUniqueInput | AgentSubscriptionWhereUniqueInput[]
  }

  export type AgentMarketplaceListingUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<AgentMarketplaceListingCreateWithoutServiceInput, AgentMarketplaceListingUncheckedCreateWithoutServiceInput> | AgentMarketplaceListingCreateWithoutServiceInput[] | AgentMarketplaceListingUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AgentMarketplaceListingCreateOrConnectWithoutServiceInput | AgentMarketplaceListingCreateOrConnectWithoutServiceInput[]
    createMany?: AgentMarketplaceListingCreateManyServiceInputEnvelope
    connect?: AgentMarketplaceListingWhereUniqueInput | AgentMarketplaceListingWhereUniqueInput[]
  }

  export type EnumAgentServiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.AgentServiceStatus
  }

  export type AgentUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<AgentCreateWithoutServicesInput, AgentUncheckedCreateWithoutServicesInput>
    connectOrCreate?: AgentCreateOrConnectWithoutServicesInput
    upsert?: AgentUpsertWithoutServicesInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutServicesInput, AgentUpdateWithoutServicesInput>, AgentUncheckedUpdateWithoutServicesInput>
  }

  export type AgentSubscriptionUpdateManyWithoutServiceNestedInput = {
    create?: XOR<AgentSubscriptionCreateWithoutServiceInput, AgentSubscriptionUncheckedCreateWithoutServiceInput> | AgentSubscriptionCreateWithoutServiceInput[] | AgentSubscriptionUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AgentSubscriptionCreateOrConnectWithoutServiceInput | AgentSubscriptionCreateOrConnectWithoutServiceInput[]
    upsert?: AgentSubscriptionUpsertWithWhereUniqueWithoutServiceInput | AgentSubscriptionUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: AgentSubscriptionCreateManyServiceInputEnvelope
    set?: AgentSubscriptionWhereUniqueInput | AgentSubscriptionWhereUniqueInput[]
    disconnect?: AgentSubscriptionWhereUniqueInput | AgentSubscriptionWhereUniqueInput[]
    delete?: AgentSubscriptionWhereUniqueInput | AgentSubscriptionWhereUniqueInput[]
    connect?: AgentSubscriptionWhereUniqueInput | AgentSubscriptionWhereUniqueInput[]
    update?: AgentSubscriptionUpdateWithWhereUniqueWithoutServiceInput | AgentSubscriptionUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: AgentSubscriptionUpdateManyWithWhereWithoutServiceInput | AgentSubscriptionUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: AgentSubscriptionScalarWhereInput | AgentSubscriptionScalarWhereInput[]
  }

  export type AgentMarketplaceListingUpdateManyWithoutServiceNestedInput = {
    create?: XOR<AgentMarketplaceListingCreateWithoutServiceInput, AgentMarketplaceListingUncheckedCreateWithoutServiceInput> | AgentMarketplaceListingCreateWithoutServiceInput[] | AgentMarketplaceListingUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AgentMarketplaceListingCreateOrConnectWithoutServiceInput | AgentMarketplaceListingCreateOrConnectWithoutServiceInput[]
    upsert?: AgentMarketplaceListingUpsertWithWhereUniqueWithoutServiceInput | AgentMarketplaceListingUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: AgentMarketplaceListingCreateManyServiceInputEnvelope
    set?: AgentMarketplaceListingWhereUniqueInput | AgentMarketplaceListingWhereUniqueInput[]
    disconnect?: AgentMarketplaceListingWhereUniqueInput | AgentMarketplaceListingWhereUniqueInput[]
    delete?: AgentMarketplaceListingWhereUniqueInput | AgentMarketplaceListingWhereUniqueInput[]
    connect?: AgentMarketplaceListingWhereUniqueInput | AgentMarketplaceListingWhereUniqueInput[]
    update?: AgentMarketplaceListingUpdateWithWhereUniqueWithoutServiceInput | AgentMarketplaceListingUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: AgentMarketplaceListingUpdateManyWithWhereWithoutServiceInput | AgentMarketplaceListingUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: AgentMarketplaceListingScalarWhereInput | AgentMarketplaceListingScalarWhereInput[]
  }

  export type AgentSubscriptionUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<AgentSubscriptionCreateWithoutServiceInput, AgentSubscriptionUncheckedCreateWithoutServiceInput> | AgentSubscriptionCreateWithoutServiceInput[] | AgentSubscriptionUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AgentSubscriptionCreateOrConnectWithoutServiceInput | AgentSubscriptionCreateOrConnectWithoutServiceInput[]
    upsert?: AgentSubscriptionUpsertWithWhereUniqueWithoutServiceInput | AgentSubscriptionUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: AgentSubscriptionCreateManyServiceInputEnvelope
    set?: AgentSubscriptionWhereUniqueInput | AgentSubscriptionWhereUniqueInput[]
    disconnect?: AgentSubscriptionWhereUniqueInput | AgentSubscriptionWhereUniqueInput[]
    delete?: AgentSubscriptionWhereUniqueInput | AgentSubscriptionWhereUniqueInput[]
    connect?: AgentSubscriptionWhereUniqueInput | AgentSubscriptionWhereUniqueInput[]
    update?: AgentSubscriptionUpdateWithWhereUniqueWithoutServiceInput | AgentSubscriptionUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: AgentSubscriptionUpdateManyWithWhereWithoutServiceInput | AgentSubscriptionUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: AgentSubscriptionScalarWhereInput | AgentSubscriptionScalarWhereInput[]
  }

  export type AgentMarketplaceListingUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<AgentMarketplaceListingCreateWithoutServiceInput, AgentMarketplaceListingUncheckedCreateWithoutServiceInput> | AgentMarketplaceListingCreateWithoutServiceInput[] | AgentMarketplaceListingUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: AgentMarketplaceListingCreateOrConnectWithoutServiceInput | AgentMarketplaceListingCreateOrConnectWithoutServiceInput[]
    upsert?: AgentMarketplaceListingUpsertWithWhereUniqueWithoutServiceInput | AgentMarketplaceListingUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: AgentMarketplaceListingCreateManyServiceInputEnvelope
    set?: AgentMarketplaceListingWhereUniqueInput | AgentMarketplaceListingWhereUniqueInput[]
    disconnect?: AgentMarketplaceListingWhereUniqueInput | AgentMarketplaceListingWhereUniqueInput[]
    delete?: AgentMarketplaceListingWhereUniqueInput | AgentMarketplaceListingWhereUniqueInput[]
    connect?: AgentMarketplaceListingWhereUniqueInput | AgentMarketplaceListingWhereUniqueInput[]
    update?: AgentMarketplaceListingUpdateWithWhereUniqueWithoutServiceInput | AgentMarketplaceListingUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: AgentMarketplaceListingUpdateManyWithWhereWithoutServiceInput | AgentMarketplaceListingUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: AgentMarketplaceListingScalarWhereInput | AgentMarketplaceListingScalarWhereInput[]
  }

  export type AgentServiceCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<AgentServiceCreateWithoutSubscriptionsInput, AgentServiceUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: AgentServiceCreateOrConnectWithoutSubscriptionsInput
    connect?: AgentServiceWhereUniqueInput
  }

  export type EnumSubscriptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionStatus
  }

  export type AgentServiceUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<AgentServiceCreateWithoutSubscriptionsInput, AgentServiceUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: AgentServiceCreateOrConnectWithoutSubscriptionsInput
    upsert?: AgentServiceUpsertWithoutSubscriptionsInput
    connect?: AgentServiceWhereUniqueInput
    update?: XOR<XOR<AgentServiceUpdateToOneWithWhereWithoutSubscriptionsInput, AgentServiceUpdateWithoutSubscriptionsInput>, AgentServiceUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type AgentServiceCreateNestedOneWithoutListingsInput = {
    create?: XOR<AgentServiceCreateWithoutListingsInput, AgentServiceUncheckedCreateWithoutListingsInput>
    connectOrCreate?: AgentServiceCreateOrConnectWithoutListingsInput
    connect?: AgentServiceWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AgentServiceUpdateOneRequiredWithoutListingsNestedInput = {
    create?: XOR<AgentServiceCreateWithoutListingsInput, AgentServiceUncheckedCreateWithoutListingsInput>
    connectOrCreate?: AgentServiceCreateOrConnectWithoutListingsInput
    upsert?: AgentServiceUpsertWithoutListingsInput
    connect?: AgentServiceWhereUniqueInput
    update?: XOR<XOR<AgentServiceUpdateToOneWithWhereWithoutListingsInput, AgentServiceUpdateWithoutListingsInput>, AgentServiceUncheckedUpdateWithoutListingsInput>
  }

  export type AgentCreateNestedOneWithoutInvoicesInput = {
    create?: XOR<AgentCreateWithoutInvoicesInput, AgentUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: AgentCreateOrConnectWithoutInvoicesInput
    connect?: AgentWhereUniqueInput
  }

  export type EnumAgentInvoiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.AgentInvoiceStatus
  }

  export type AgentUpdateOneRequiredWithoutInvoicesNestedInput = {
    create?: XOR<AgentCreateWithoutInvoicesInput, AgentUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: AgentCreateOrConnectWithoutInvoicesInput
    upsert?: AgentUpsertWithoutInvoicesInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutInvoicesInput, AgentUpdateWithoutInvoicesInput>, AgentUncheckedUpdateWithoutInvoicesInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumOutboxStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboxStatus | EnumOutboxStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOutboxStatusFilter<$PrismaModel> | $Enums.OutboxStatus
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumOutboxStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboxStatus | EnumOutboxStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOutboxStatusWithAggregatesFilter<$PrismaModel> | $Enums.OutboxStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOutboxStatusFilter<$PrismaModel>
    _max?: NestedEnumOutboxStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumOwnerKindFilter<$PrismaModel = never> = {
    equals?: $Enums.OwnerKind | EnumOwnerKindFieldRefInput<$PrismaModel>
    in?: $Enums.OwnerKind[] | ListEnumOwnerKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.OwnerKind[] | ListEnumOwnerKindFieldRefInput<$PrismaModel>
    not?: NestedEnumOwnerKindFilter<$PrismaModel> | $Enums.OwnerKind
  }

  export type NestedEnumAgentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentStatus | EnumAgentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentStatus[] | ListEnumAgentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentStatus[] | ListEnumAgentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentStatusFilter<$PrismaModel> | $Enums.AgentStatus
  }

  export type NestedEnumOwnerKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OwnerKind | EnumOwnerKindFieldRefInput<$PrismaModel>
    in?: $Enums.OwnerKind[] | ListEnumOwnerKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.OwnerKind[] | ListEnumOwnerKindFieldRefInput<$PrismaModel>
    not?: NestedEnumOwnerKindWithAggregatesFilter<$PrismaModel> | $Enums.OwnerKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOwnerKindFilter<$PrismaModel>
    _max?: NestedEnumOwnerKindFilter<$PrismaModel>
  }

  export type NestedEnumAgentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentStatus | EnumAgentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentStatus[] | ListEnumAgentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentStatus[] | ListEnumAgentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AgentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAgentStatusFilter<$PrismaModel>
    _max?: NestedEnumAgentStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSpendApprovalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SpendApprovalStatus | EnumSpendApprovalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SpendApprovalStatus[] | ListEnumSpendApprovalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SpendApprovalStatus[] | ListEnumSpendApprovalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSpendApprovalStatusFilter<$PrismaModel> | $Enums.SpendApprovalStatus
  }

  export type NestedEnumSpendApprovalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SpendApprovalStatus | EnumSpendApprovalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SpendApprovalStatus[] | ListEnumSpendApprovalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SpendApprovalStatus[] | ListEnumSpendApprovalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSpendApprovalStatusWithAggregatesFilter<$PrismaModel> | $Enums.SpendApprovalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSpendApprovalStatusFilter<$PrismaModel>
    _max?: NestedEnumSpendApprovalStatusFilter<$PrismaModel>
  }

  export type NestedEnumAgentServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentServiceStatus | EnumAgentServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentServiceStatus[] | ListEnumAgentServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentServiceStatus[] | ListEnumAgentServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentServiceStatusFilter<$PrismaModel> | $Enums.AgentServiceStatus
  }

  export type NestedEnumAgentServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentServiceStatus | EnumAgentServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentServiceStatus[] | ListEnumAgentServiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentServiceStatus[] | ListEnumAgentServiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.AgentServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAgentServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumAgentServiceStatusFilter<$PrismaModel>
  }

  export type NestedEnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumAgentInvoiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentInvoiceStatus | EnumAgentInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentInvoiceStatus[] | ListEnumAgentInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentInvoiceStatus[] | ListEnumAgentInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentInvoiceStatusFilter<$PrismaModel> | $Enums.AgentInvoiceStatus
  }

  export type NestedEnumAgentInvoiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentInvoiceStatus | EnumAgentInvoiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentInvoiceStatus[] | ListEnumAgentInvoiceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AgentInvoiceStatus[] | ListEnumAgentInvoiceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAgentInvoiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.AgentInvoiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAgentInvoiceStatusFilter<$PrismaModel>
    _max?: NestedEnumAgentInvoiceStatusFilter<$PrismaModel>
  }

  export type AgentSpendingPolicyCreateWithoutAgentInput = {
    id?: string
    perTxCapMinor: bigint | number
    dailyCapMinor: bigint | number
    monthlyCapMinor?: bigint | number | null
    destinationAllowlist: JsonNullValueInput | InputJsonValue
    approvalThresholdMinor: bigint | number
    requiredApprovers?: number
    currency?: string
    version?: number
    updatedAt?: Date | string
  }

  export type AgentSpendingPolicyUncheckedCreateWithoutAgentInput = {
    id?: string
    perTxCapMinor: bigint | number
    dailyCapMinor: bigint | number
    monthlyCapMinor?: bigint | number | null
    destinationAllowlist: JsonNullValueInput | InputJsonValue
    approvalThresholdMinor: bigint | number
    requiredApprovers?: number
    currency?: string
    version?: number
    updatedAt?: Date | string
  }

  export type AgentSpendingPolicyCreateOrConnectWithoutAgentInput = {
    where: AgentSpendingPolicyWhereUniqueInput
    create: XOR<AgentSpendingPolicyCreateWithoutAgentInput, AgentSpendingPolicyUncheckedCreateWithoutAgentInput>
  }

  export type AgentReasoningLogCreateWithoutAgentInput = {
    id: string
    intentId?: string | null
    traceId?: string | null
    summary: string
    steps: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AgentReasoningLogUncheckedCreateWithoutAgentInput = {
    id: string
    intentId?: string | null
    traceId?: string | null
    summary: string
    steps: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AgentReasoningLogCreateOrConnectWithoutAgentInput = {
    where: AgentReasoningLogWhereUniqueInput
    create: XOR<AgentReasoningLogCreateWithoutAgentInput, AgentReasoningLogUncheckedCreateWithoutAgentInput>
  }

  export type AgentReasoningLogCreateManyAgentInputEnvelope = {
    data: AgentReasoningLogCreateManyAgentInput | AgentReasoningLogCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type SpendApprovalRequestCreateWithoutAgentInput = {
    id: string
    intentId?: string | null
    amountMinor: bigint | number
    destination: string
    approvalCount?: number
    requiredApprovers: number
    status?: $Enums.SpendApprovalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    votes?: SpendApprovalVoteCreateNestedManyWithoutRequestInput
  }

  export type SpendApprovalRequestUncheckedCreateWithoutAgentInput = {
    id: string
    intentId?: string | null
    amountMinor: bigint | number
    destination: string
    approvalCount?: number
    requiredApprovers: number
    status?: $Enums.SpendApprovalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    votes?: SpendApprovalVoteUncheckedCreateNestedManyWithoutRequestInput
  }

  export type SpendApprovalRequestCreateOrConnectWithoutAgentInput = {
    where: SpendApprovalRequestWhereUniqueInput
    create: XOR<SpendApprovalRequestCreateWithoutAgentInput, SpendApprovalRequestUncheckedCreateWithoutAgentInput>
  }

  export type SpendApprovalRequestCreateManyAgentInputEnvelope = {
    data: SpendApprovalRequestCreateManyAgentInput | SpendApprovalRequestCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type AgentInvoiceCreateWithoutAgentInput = {
    id: string
    payerAgentId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.AgentInvoiceStatus
    intentId?: string | null
    memo?: string | null
    createdAt?: Date | string
  }

  export type AgentInvoiceUncheckedCreateWithoutAgentInput = {
    id: string
    payerAgentId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.AgentInvoiceStatus
    intentId?: string | null
    memo?: string | null
    createdAt?: Date | string
  }

  export type AgentInvoiceCreateOrConnectWithoutAgentInput = {
    where: AgentInvoiceWhereUniqueInput
    create: XOR<AgentInvoiceCreateWithoutAgentInput, AgentInvoiceUncheckedCreateWithoutAgentInput>
  }

  export type AgentInvoiceCreateManyAgentInputEnvelope = {
    data: AgentInvoiceCreateManyAgentInput | AgentInvoiceCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type AgentServiceCreateWithoutAgentInput = {
    id: string
    name: string
    description?: string | null
    priceMinor: bigint | number
    currency?: string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.AgentServiceStatus
    createdAt?: Date | string
    subscriptions?: AgentSubscriptionCreateNestedManyWithoutServiceInput
    listings?: AgentMarketplaceListingCreateNestedManyWithoutServiceInput
  }

  export type AgentServiceUncheckedCreateWithoutAgentInput = {
    id: string
    name: string
    description?: string | null
    priceMinor: bigint | number
    currency?: string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.AgentServiceStatus
    createdAt?: Date | string
    subscriptions?: AgentSubscriptionUncheckedCreateNestedManyWithoutServiceInput
    listings?: AgentMarketplaceListingUncheckedCreateNestedManyWithoutServiceInput
  }

  export type AgentServiceCreateOrConnectWithoutAgentInput = {
    where: AgentServiceWhereUniqueInput
    create: XOR<AgentServiceCreateWithoutAgentInput, AgentServiceUncheckedCreateWithoutAgentInput>
  }

  export type AgentServiceCreateManyAgentInputEnvelope = {
    data: AgentServiceCreateManyAgentInput | AgentServiceCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type AgentSpendingPolicyUpsertWithoutAgentInput = {
    update: XOR<AgentSpendingPolicyUpdateWithoutAgentInput, AgentSpendingPolicyUncheckedUpdateWithoutAgentInput>
    create: XOR<AgentSpendingPolicyCreateWithoutAgentInput, AgentSpendingPolicyUncheckedCreateWithoutAgentInput>
    where?: AgentSpendingPolicyWhereInput
  }

  export type AgentSpendingPolicyUpdateToOneWithWhereWithoutAgentInput = {
    where?: AgentSpendingPolicyWhereInput
    data: XOR<AgentSpendingPolicyUpdateWithoutAgentInput, AgentSpendingPolicyUncheckedUpdateWithoutAgentInput>
  }

  export type AgentSpendingPolicyUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    perTxCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    dailyCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    monthlyCapMinor?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    destinationAllowlist?: JsonNullValueInput | InputJsonValue
    approvalThresholdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentSpendingPolicyUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    perTxCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    dailyCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    monthlyCapMinor?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    destinationAllowlist?: JsonNullValueInput | InputJsonValue
    approvalThresholdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentReasoningLogUpsertWithWhereUniqueWithoutAgentInput = {
    where: AgentReasoningLogWhereUniqueInput
    update: XOR<AgentReasoningLogUpdateWithoutAgentInput, AgentReasoningLogUncheckedUpdateWithoutAgentInput>
    create: XOR<AgentReasoningLogCreateWithoutAgentInput, AgentReasoningLogUncheckedCreateWithoutAgentInput>
  }

  export type AgentReasoningLogUpdateWithWhereUniqueWithoutAgentInput = {
    where: AgentReasoningLogWhereUniqueInput
    data: XOR<AgentReasoningLogUpdateWithoutAgentInput, AgentReasoningLogUncheckedUpdateWithoutAgentInput>
  }

  export type AgentReasoningLogUpdateManyWithWhereWithoutAgentInput = {
    where: AgentReasoningLogScalarWhereInput
    data: XOR<AgentReasoningLogUpdateManyMutationInput, AgentReasoningLogUncheckedUpdateManyWithoutAgentInput>
  }

  export type AgentReasoningLogScalarWhereInput = {
    AND?: AgentReasoningLogScalarWhereInput | AgentReasoningLogScalarWhereInput[]
    OR?: AgentReasoningLogScalarWhereInput[]
    NOT?: AgentReasoningLogScalarWhereInput | AgentReasoningLogScalarWhereInput[]
    id?: StringFilter<"AgentReasoningLog"> | string
    agentId?: StringFilter<"AgentReasoningLog"> | string
    intentId?: StringNullableFilter<"AgentReasoningLog"> | string | null
    traceId?: StringNullableFilter<"AgentReasoningLog"> | string | null
    summary?: StringFilter<"AgentReasoningLog"> | string
    steps?: JsonFilter<"AgentReasoningLog">
    createdAt?: DateTimeFilter<"AgentReasoningLog"> | Date | string
  }

  export type SpendApprovalRequestUpsertWithWhereUniqueWithoutAgentInput = {
    where: SpendApprovalRequestWhereUniqueInput
    update: XOR<SpendApprovalRequestUpdateWithoutAgentInput, SpendApprovalRequestUncheckedUpdateWithoutAgentInput>
    create: XOR<SpendApprovalRequestCreateWithoutAgentInput, SpendApprovalRequestUncheckedCreateWithoutAgentInput>
  }

  export type SpendApprovalRequestUpdateWithWhereUniqueWithoutAgentInput = {
    where: SpendApprovalRequestWhereUniqueInput
    data: XOR<SpendApprovalRequestUpdateWithoutAgentInput, SpendApprovalRequestUncheckedUpdateWithoutAgentInput>
  }

  export type SpendApprovalRequestUpdateManyWithWhereWithoutAgentInput = {
    where: SpendApprovalRequestScalarWhereInput
    data: XOR<SpendApprovalRequestUpdateManyMutationInput, SpendApprovalRequestUncheckedUpdateManyWithoutAgentInput>
  }

  export type SpendApprovalRequestScalarWhereInput = {
    AND?: SpendApprovalRequestScalarWhereInput | SpendApprovalRequestScalarWhereInput[]
    OR?: SpendApprovalRequestScalarWhereInput[]
    NOT?: SpendApprovalRequestScalarWhereInput | SpendApprovalRequestScalarWhereInput[]
    id?: StringFilter<"SpendApprovalRequest"> | string
    agentId?: StringFilter<"SpendApprovalRequest"> | string
    intentId?: StringNullableFilter<"SpendApprovalRequest"> | string | null
    amountMinor?: BigIntFilter<"SpendApprovalRequest"> | bigint | number
    destination?: StringFilter<"SpendApprovalRequest"> | string
    approvalCount?: IntFilter<"SpendApprovalRequest"> | number
    requiredApprovers?: IntFilter<"SpendApprovalRequest"> | number
    status?: EnumSpendApprovalStatusFilter<"SpendApprovalRequest"> | $Enums.SpendApprovalStatus
    createdAt?: DateTimeFilter<"SpendApprovalRequest"> | Date | string
    updatedAt?: DateTimeFilter<"SpendApprovalRequest"> | Date | string
  }

  export type AgentInvoiceUpsertWithWhereUniqueWithoutAgentInput = {
    where: AgentInvoiceWhereUniqueInput
    update: XOR<AgentInvoiceUpdateWithoutAgentInput, AgentInvoiceUncheckedUpdateWithoutAgentInput>
    create: XOR<AgentInvoiceCreateWithoutAgentInput, AgentInvoiceUncheckedCreateWithoutAgentInput>
  }

  export type AgentInvoiceUpdateWithWhereUniqueWithoutAgentInput = {
    where: AgentInvoiceWhereUniqueInput
    data: XOR<AgentInvoiceUpdateWithoutAgentInput, AgentInvoiceUncheckedUpdateWithoutAgentInput>
  }

  export type AgentInvoiceUpdateManyWithWhereWithoutAgentInput = {
    where: AgentInvoiceScalarWhereInput
    data: XOR<AgentInvoiceUpdateManyMutationInput, AgentInvoiceUncheckedUpdateManyWithoutAgentInput>
  }

  export type AgentInvoiceScalarWhereInput = {
    AND?: AgentInvoiceScalarWhereInput | AgentInvoiceScalarWhereInput[]
    OR?: AgentInvoiceScalarWhereInput[]
    NOT?: AgentInvoiceScalarWhereInput | AgentInvoiceScalarWhereInput[]
    id?: StringFilter<"AgentInvoice"> | string
    agentId?: StringFilter<"AgentInvoice"> | string
    payerAgentId?: StringFilter<"AgentInvoice"> | string
    amountMinor?: BigIntFilter<"AgentInvoice"> | bigint | number
    currency?: StringFilter<"AgentInvoice"> | string
    status?: EnumAgentInvoiceStatusFilter<"AgentInvoice"> | $Enums.AgentInvoiceStatus
    intentId?: StringNullableFilter<"AgentInvoice"> | string | null
    memo?: StringNullableFilter<"AgentInvoice"> | string | null
    createdAt?: DateTimeFilter<"AgentInvoice"> | Date | string
  }

  export type AgentServiceUpsertWithWhereUniqueWithoutAgentInput = {
    where: AgentServiceWhereUniqueInput
    update: XOR<AgentServiceUpdateWithoutAgentInput, AgentServiceUncheckedUpdateWithoutAgentInput>
    create: XOR<AgentServiceCreateWithoutAgentInput, AgentServiceUncheckedCreateWithoutAgentInput>
  }

  export type AgentServiceUpdateWithWhereUniqueWithoutAgentInput = {
    where: AgentServiceWhereUniqueInput
    data: XOR<AgentServiceUpdateWithoutAgentInput, AgentServiceUncheckedUpdateWithoutAgentInput>
  }

  export type AgentServiceUpdateManyWithWhereWithoutAgentInput = {
    where: AgentServiceScalarWhereInput
    data: XOR<AgentServiceUpdateManyMutationInput, AgentServiceUncheckedUpdateManyWithoutAgentInput>
  }

  export type AgentServiceScalarWhereInput = {
    AND?: AgentServiceScalarWhereInput | AgentServiceScalarWhereInput[]
    OR?: AgentServiceScalarWhereInput[]
    NOT?: AgentServiceScalarWhereInput | AgentServiceScalarWhereInput[]
    id?: StringFilter<"AgentService"> | string
    agentId?: StringFilter<"AgentService"> | string
    name?: StringFilter<"AgentService"> | string
    description?: StringNullableFilter<"AgentService"> | string | null
    priceMinor?: BigIntFilter<"AgentService"> | bigint | number
    currency?: StringFilter<"AgentService"> | string
    capability?: JsonNullableFilter<"AgentService">
    status?: EnumAgentServiceStatusFilter<"AgentService"> | $Enums.AgentServiceStatus
    createdAt?: DateTimeFilter<"AgentService"> | Date | string
  }

  export type AgentCreateWithoutPolicyInput = {
    id: string
    ownerId: string
    ownerKind: $Enums.OwnerKind
    orgId?: string | null
    name: string
    status?: $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    reasoningLogs?: AgentReasoningLogCreateNestedManyWithoutAgentInput
    approvalRequests?: SpendApprovalRequestCreateNestedManyWithoutAgentInput
    invoices?: AgentInvoiceCreateNestedManyWithoutAgentInput
    services?: AgentServiceCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutPolicyInput = {
    id: string
    ownerId: string
    ownerKind: $Enums.OwnerKind
    orgId?: string | null
    name: string
    status?: $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    reasoningLogs?: AgentReasoningLogUncheckedCreateNestedManyWithoutAgentInput
    approvalRequests?: SpendApprovalRequestUncheckedCreateNestedManyWithoutAgentInput
    invoices?: AgentInvoiceUncheckedCreateNestedManyWithoutAgentInput
    services?: AgentServiceUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutPolicyInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutPolicyInput, AgentUncheckedCreateWithoutPolicyInput>
  }

  export type AgentUpsertWithoutPolicyInput = {
    update: XOR<AgentUpdateWithoutPolicyInput, AgentUncheckedUpdateWithoutPolicyInput>
    create: XOR<AgentCreateWithoutPolicyInput, AgentUncheckedCreateWithoutPolicyInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutPolicyInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutPolicyInput, AgentUncheckedUpdateWithoutPolicyInput>
  }

  export type AgentUpdateWithoutPolicyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerKind?: EnumOwnerKindFieldUpdateOperationsInput | $Enums.OwnerKind
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reasoningLogs?: AgentReasoningLogUpdateManyWithoutAgentNestedInput
    approvalRequests?: SpendApprovalRequestUpdateManyWithoutAgentNestedInput
    invoices?: AgentInvoiceUpdateManyWithoutAgentNestedInput
    services?: AgentServiceUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutPolicyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerKind?: EnumOwnerKindFieldUpdateOperationsInput | $Enums.OwnerKind
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reasoningLogs?: AgentReasoningLogUncheckedUpdateManyWithoutAgentNestedInput
    approvalRequests?: SpendApprovalRequestUncheckedUpdateManyWithoutAgentNestedInput
    invoices?: AgentInvoiceUncheckedUpdateManyWithoutAgentNestedInput
    services?: AgentServiceUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentCreateWithoutReasoningLogsInput = {
    id: string
    ownerId: string
    ownerKind: $Enums.OwnerKind
    orgId?: string | null
    name: string
    status?: $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    policy?: AgentSpendingPolicyCreateNestedOneWithoutAgentInput
    approvalRequests?: SpendApprovalRequestCreateNestedManyWithoutAgentInput
    invoices?: AgentInvoiceCreateNestedManyWithoutAgentInput
    services?: AgentServiceCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutReasoningLogsInput = {
    id: string
    ownerId: string
    ownerKind: $Enums.OwnerKind
    orgId?: string | null
    name: string
    status?: $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    policy?: AgentSpendingPolicyUncheckedCreateNestedOneWithoutAgentInput
    approvalRequests?: SpendApprovalRequestUncheckedCreateNestedManyWithoutAgentInput
    invoices?: AgentInvoiceUncheckedCreateNestedManyWithoutAgentInput
    services?: AgentServiceUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutReasoningLogsInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutReasoningLogsInput, AgentUncheckedCreateWithoutReasoningLogsInput>
  }

  export type AgentUpsertWithoutReasoningLogsInput = {
    update: XOR<AgentUpdateWithoutReasoningLogsInput, AgentUncheckedUpdateWithoutReasoningLogsInput>
    create: XOR<AgentCreateWithoutReasoningLogsInput, AgentUncheckedCreateWithoutReasoningLogsInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutReasoningLogsInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutReasoningLogsInput, AgentUncheckedUpdateWithoutReasoningLogsInput>
  }

  export type AgentUpdateWithoutReasoningLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerKind?: EnumOwnerKindFieldUpdateOperationsInput | $Enums.OwnerKind
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy?: AgentSpendingPolicyUpdateOneWithoutAgentNestedInput
    approvalRequests?: SpendApprovalRequestUpdateManyWithoutAgentNestedInput
    invoices?: AgentInvoiceUpdateManyWithoutAgentNestedInput
    services?: AgentServiceUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutReasoningLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerKind?: EnumOwnerKindFieldUpdateOperationsInput | $Enums.OwnerKind
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy?: AgentSpendingPolicyUncheckedUpdateOneWithoutAgentNestedInput
    approvalRequests?: SpendApprovalRequestUncheckedUpdateManyWithoutAgentNestedInput
    invoices?: AgentInvoiceUncheckedUpdateManyWithoutAgentNestedInput
    services?: AgentServiceUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentCreateWithoutApprovalRequestsInput = {
    id: string
    ownerId: string
    ownerKind: $Enums.OwnerKind
    orgId?: string | null
    name: string
    status?: $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    policy?: AgentSpendingPolicyCreateNestedOneWithoutAgentInput
    reasoningLogs?: AgentReasoningLogCreateNestedManyWithoutAgentInput
    invoices?: AgentInvoiceCreateNestedManyWithoutAgentInput
    services?: AgentServiceCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutApprovalRequestsInput = {
    id: string
    ownerId: string
    ownerKind: $Enums.OwnerKind
    orgId?: string | null
    name: string
    status?: $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    policy?: AgentSpendingPolicyUncheckedCreateNestedOneWithoutAgentInput
    reasoningLogs?: AgentReasoningLogUncheckedCreateNestedManyWithoutAgentInput
    invoices?: AgentInvoiceUncheckedCreateNestedManyWithoutAgentInput
    services?: AgentServiceUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutApprovalRequestsInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutApprovalRequestsInput, AgentUncheckedCreateWithoutApprovalRequestsInput>
  }

  export type SpendApprovalVoteCreateWithoutRequestInput = {
    id: string
    approverId: string
    createdAt?: Date | string
  }

  export type SpendApprovalVoteUncheckedCreateWithoutRequestInput = {
    id: string
    approverId: string
    createdAt?: Date | string
  }

  export type SpendApprovalVoteCreateOrConnectWithoutRequestInput = {
    where: SpendApprovalVoteWhereUniqueInput
    create: XOR<SpendApprovalVoteCreateWithoutRequestInput, SpendApprovalVoteUncheckedCreateWithoutRequestInput>
  }

  export type SpendApprovalVoteCreateManyRequestInputEnvelope = {
    data: SpendApprovalVoteCreateManyRequestInput | SpendApprovalVoteCreateManyRequestInput[]
    skipDuplicates?: boolean
  }

  export type AgentUpsertWithoutApprovalRequestsInput = {
    update: XOR<AgentUpdateWithoutApprovalRequestsInput, AgentUncheckedUpdateWithoutApprovalRequestsInput>
    create: XOR<AgentCreateWithoutApprovalRequestsInput, AgentUncheckedCreateWithoutApprovalRequestsInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutApprovalRequestsInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutApprovalRequestsInput, AgentUncheckedUpdateWithoutApprovalRequestsInput>
  }

  export type AgentUpdateWithoutApprovalRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerKind?: EnumOwnerKindFieldUpdateOperationsInput | $Enums.OwnerKind
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy?: AgentSpendingPolicyUpdateOneWithoutAgentNestedInput
    reasoningLogs?: AgentReasoningLogUpdateManyWithoutAgentNestedInput
    invoices?: AgentInvoiceUpdateManyWithoutAgentNestedInput
    services?: AgentServiceUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutApprovalRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerKind?: EnumOwnerKindFieldUpdateOperationsInput | $Enums.OwnerKind
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy?: AgentSpendingPolicyUncheckedUpdateOneWithoutAgentNestedInput
    reasoningLogs?: AgentReasoningLogUncheckedUpdateManyWithoutAgentNestedInput
    invoices?: AgentInvoiceUncheckedUpdateManyWithoutAgentNestedInput
    services?: AgentServiceUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type SpendApprovalVoteUpsertWithWhereUniqueWithoutRequestInput = {
    where: SpendApprovalVoteWhereUniqueInput
    update: XOR<SpendApprovalVoteUpdateWithoutRequestInput, SpendApprovalVoteUncheckedUpdateWithoutRequestInput>
    create: XOR<SpendApprovalVoteCreateWithoutRequestInput, SpendApprovalVoteUncheckedCreateWithoutRequestInput>
  }

  export type SpendApprovalVoteUpdateWithWhereUniqueWithoutRequestInput = {
    where: SpendApprovalVoteWhereUniqueInput
    data: XOR<SpendApprovalVoteUpdateWithoutRequestInput, SpendApprovalVoteUncheckedUpdateWithoutRequestInput>
  }

  export type SpendApprovalVoteUpdateManyWithWhereWithoutRequestInput = {
    where: SpendApprovalVoteScalarWhereInput
    data: XOR<SpendApprovalVoteUpdateManyMutationInput, SpendApprovalVoteUncheckedUpdateManyWithoutRequestInput>
  }

  export type SpendApprovalVoteScalarWhereInput = {
    AND?: SpendApprovalVoteScalarWhereInput | SpendApprovalVoteScalarWhereInput[]
    OR?: SpendApprovalVoteScalarWhereInput[]
    NOT?: SpendApprovalVoteScalarWhereInput | SpendApprovalVoteScalarWhereInput[]
    id?: StringFilter<"SpendApprovalVote"> | string
    requestId?: StringFilter<"SpendApprovalVote"> | string
    approverId?: StringFilter<"SpendApprovalVote"> | string
    createdAt?: DateTimeFilter<"SpendApprovalVote"> | Date | string
  }

  export type SpendApprovalRequestCreateWithoutVotesInput = {
    id: string
    intentId?: string | null
    amountMinor: bigint | number
    destination: string
    approvalCount?: number
    requiredApprovers: number
    status?: $Enums.SpendApprovalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutApprovalRequestsInput
  }

  export type SpendApprovalRequestUncheckedCreateWithoutVotesInput = {
    id: string
    agentId: string
    intentId?: string | null
    amountMinor: bigint | number
    destination: string
    approvalCount?: number
    requiredApprovers: number
    status?: $Enums.SpendApprovalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpendApprovalRequestCreateOrConnectWithoutVotesInput = {
    where: SpendApprovalRequestWhereUniqueInput
    create: XOR<SpendApprovalRequestCreateWithoutVotesInput, SpendApprovalRequestUncheckedCreateWithoutVotesInput>
  }

  export type SpendApprovalRequestUpsertWithoutVotesInput = {
    update: XOR<SpendApprovalRequestUpdateWithoutVotesInput, SpendApprovalRequestUncheckedUpdateWithoutVotesInput>
    create: XOR<SpendApprovalRequestCreateWithoutVotesInput, SpendApprovalRequestUncheckedCreateWithoutVotesInput>
    where?: SpendApprovalRequestWhereInput
  }

  export type SpendApprovalRequestUpdateToOneWithWhereWithoutVotesInput = {
    where?: SpendApprovalRequestWhereInput
    data: XOR<SpendApprovalRequestUpdateWithoutVotesInput, SpendApprovalRequestUncheckedUpdateWithoutVotesInput>
  }

  export type SpendApprovalRequestUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    destination?: StringFieldUpdateOperationsInput | string
    approvalCount?: IntFieldUpdateOperationsInput | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    status?: EnumSpendApprovalStatusFieldUpdateOperationsInput | $Enums.SpendApprovalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutApprovalRequestsNestedInput
  }

  export type SpendApprovalRequestUncheckedUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    destination?: StringFieldUpdateOperationsInput | string
    approvalCount?: IntFieldUpdateOperationsInput | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    status?: EnumSpendApprovalStatusFieldUpdateOperationsInput | $Enums.SpendApprovalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentCreateWithoutServicesInput = {
    id: string
    ownerId: string
    ownerKind: $Enums.OwnerKind
    orgId?: string | null
    name: string
    status?: $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    policy?: AgentSpendingPolicyCreateNestedOneWithoutAgentInput
    reasoningLogs?: AgentReasoningLogCreateNestedManyWithoutAgentInput
    approvalRequests?: SpendApprovalRequestCreateNestedManyWithoutAgentInput
    invoices?: AgentInvoiceCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutServicesInput = {
    id: string
    ownerId: string
    ownerKind: $Enums.OwnerKind
    orgId?: string | null
    name: string
    status?: $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    policy?: AgentSpendingPolicyUncheckedCreateNestedOneWithoutAgentInput
    reasoningLogs?: AgentReasoningLogUncheckedCreateNestedManyWithoutAgentInput
    approvalRequests?: SpendApprovalRequestUncheckedCreateNestedManyWithoutAgentInput
    invoices?: AgentInvoiceUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutServicesInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutServicesInput, AgentUncheckedCreateWithoutServicesInput>
  }

  export type AgentSubscriptionCreateWithoutServiceInput = {
    id: string
    subscriberAgentId: string
    status?: $Enums.SubscriptionStatus
    renewAt?: Date | string | null
    intentId?: string | null
    createdAt?: Date | string
  }

  export type AgentSubscriptionUncheckedCreateWithoutServiceInput = {
    id: string
    subscriberAgentId: string
    status?: $Enums.SubscriptionStatus
    renewAt?: Date | string | null
    intentId?: string | null
    createdAt?: Date | string
  }

  export type AgentSubscriptionCreateOrConnectWithoutServiceInput = {
    where: AgentSubscriptionWhereUniqueInput
    create: XOR<AgentSubscriptionCreateWithoutServiceInput, AgentSubscriptionUncheckedCreateWithoutServiceInput>
  }

  export type AgentSubscriptionCreateManyServiceInputEnvelope = {
    data: AgentSubscriptionCreateManyServiceInput | AgentSubscriptionCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type AgentMarketplaceListingCreateWithoutServiceInput = {
    id: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    ratingBps?: number | null
    visible?: boolean
    onChainId?: string | null
    createdAt?: Date | string
  }

  export type AgentMarketplaceListingUncheckedCreateWithoutServiceInput = {
    id: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    ratingBps?: number | null
    visible?: boolean
    onChainId?: string | null
    createdAt?: Date | string
  }

  export type AgentMarketplaceListingCreateOrConnectWithoutServiceInput = {
    where: AgentMarketplaceListingWhereUniqueInput
    create: XOR<AgentMarketplaceListingCreateWithoutServiceInput, AgentMarketplaceListingUncheckedCreateWithoutServiceInput>
  }

  export type AgentMarketplaceListingCreateManyServiceInputEnvelope = {
    data: AgentMarketplaceListingCreateManyServiceInput | AgentMarketplaceListingCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type AgentUpsertWithoutServicesInput = {
    update: XOR<AgentUpdateWithoutServicesInput, AgentUncheckedUpdateWithoutServicesInput>
    create: XOR<AgentCreateWithoutServicesInput, AgentUncheckedCreateWithoutServicesInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutServicesInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutServicesInput, AgentUncheckedUpdateWithoutServicesInput>
  }

  export type AgentUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerKind?: EnumOwnerKindFieldUpdateOperationsInput | $Enums.OwnerKind
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy?: AgentSpendingPolicyUpdateOneWithoutAgentNestedInput
    reasoningLogs?: AgentReasoningLogUpdateManyWithoutAgentNestedInput
    approvalRequests?: SpendApprovalRequestUpdateManyWithoutAgentNestedInput
    invoices?: AgentInvoiceUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerKind?: EnumOwnerKindFieldUpdateOperationsInput | $Enums.OwnerKind
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy?: AgentSpendingPolicyUncheckedUpdateOneWithoutAgentNestedInput
    reasoningLogs?: AgentReasoningLogUncheckedUpdateManyWithoutAgentNestedInput
    approvalRequests?: SpendApprovalRequestUncheckedUpdateManyWithoutAgentNestedInput
    invoices?: AgentInvoiceUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentSubscriptionUpsertWithWhereUniqueWithoutServiceInput = {
    where: AgentSubscriptionWhereUniqueInput
    update: XOR<AgentSubscriptionUpdateWithoutServiceInput, AgentSubscriptionUncheckedUpdateWithoutServiceInput>
    create: XOR<AgentSubscriptionCreateWithoutServiceInput, AgentSubscriptionUncheckedCreateWithoutServiceInput>
  }

  export type AgentSubscriptionUpdateWithWhereUniqueWithoutServiceInput = {
    where: AgentSubscriptionWhereUniqueInput
    data: XOR<AgentSubscriptionUpdateWithoutServiceInput, AgentSubscriptionUncheckedUpdateWithoutServiceInput>
  }

  export type AgentSubscriptionUpdateManyWithWhereWithoutServiceInput = {
    where: AgentSubscriptionScalarWhereInput
    data: XOR<AgentSubscriptionUpdateManyMutationInput, AgentSubscriptionUncheckedUpdateManyWithoutServiceInput>
  }

  export type AgentSubscriptionScalarWhereInput = {
    AND?: AgentSubscriptionScalarWhereInput | AgentSubscriptionScalarWhereInput[]
    OR?: AgentSubscriptionScalarWhereInput[]
    NOT?: AgentSubscriptionScalarWhereInput | AgentSubscriptionScalarWhereInput[]
    id?: StringFilter<"AgentSubscription"> | string
    serviceId?: StringFilter<"AgentSubscription"> | string
    subscriberAgentId?: StringFilter<"AgentSubscription"> | string
    status?: EnumSubscriptionStatusFilter<"AgentSubscription"> | $Enums.SubscriptionStatus
    renewAt?: DateTimeNullableFilter<"AgentSubscription"> | Date | string | null
    intentId?: StringNullableFilter<"AgentSubscription"> | string | null
    createdAt?: DateTimeFilter<"AgentSubscription"> | Date | string
  }

  export type AgentMarketplaceListingUpsertWithWhereUniqueWithoutServiceInput = {
    where: AgentMarketplaceListingWhereUniqueInput
    update: XOR<AgentMarketplaceListingUpdateWithoutServiceInput, AgentMarketplaceListingUncheckedUpdateWithoutServiceInput>
    create: XOR<AgentMarketplaceListingCreateWithoutServiceInput, AgentMarketplaceListingUncheckedCreateWithoutServiceInput>
  }

  export type AgentMarketplaceListingUpdateWithWhereUniqueWithoutServiceInput = {
    where: AgentMarketplaceListingWhereUniqueInput
    data: XOR<AgentMarketplaceListingUpdateWithoutServiceInput, AgentMarketplaceListingUncheckedUpdateWithoutServiceInput>
  }

  export type AgentMarketplaceListingUpdateManyWithWhereWithoutServiceInput = {
    where: AgentMarketplaceListingScalarWhereInput
    data: XOR<AgentMarketplaceListingUpdateManyMutationInput, AgentMarketplaceListingUncheckedUpdateManyWithoutServiceInput>
  }

  export type AgentMarketplaceListingScalarWhereInput = {
    AND?: AgentMarketplaceListingScalarWhereInput | AgentMarketplaceListingScalarWhereInput[]
    OR?: AgentMarketplaceListingScalarWhereInput[]
    NOT?: AgentMarketplaceListingScalarWhereInput | AgentMarketplaceListingScalarWhereInput[]
    id?: StringFilter<"AgentMarketplaceListing"> | string
    serviceId?: StringFilter<"AgentMarketplaceListing"> | string
    tags?: JsonNullableFilter<"AgentMarketplaceListing">
    ratingBps?: IntNullableFilter<"AgentMarketplaceListing"> | number | null
    visible?: BoolFilter<"AgentMarketplaceListing"> | boolean
    onChainId?: StringNullableFilter<"AgentMarketplaceListing"> | string | null
    createdAt?: DateTimeFilter<"AgentMarketplaceListing"> | Date | string
  }

  export type AgentServiceCreateWithoutSubscriptionsInput = {
    id: string
    name: string
    description?: string | null
    priceMinor: bigint | number
    currency?: string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.AgentServiceStatus
    createdAt?: Date | string
    agent: AgentCreateNestedOneWithoutServicesInput
    listings?: AgentMarketplaceListingCreateNestedManyWithoutServiceInput
  }

  export type AgentServiceUncheckedCreateWithoutSubscriptionsInput = {
    id: string
    agentId: string
    name: string
    description?: string | null
    priceMinor: bigint | number
    currency?: string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.AgentServiceStatus
    createdAt?: Date | string
    listings?: AgentMarketplaceListingUncheckedCreateNestedManyWithoutServiceInput
  }

  export type AgentServiceCreateOrConnectWithoutSubscriptionsInput = {
    where: AgentServiceWhereUniqueInput
    create: XOR<AgentServiceCreateWithoutSubscriptionsInput, AgentServiceUncheckedCreateWithoutSubscriptionsInput>
  }

  export type AgentServiceUpsertWithoutSubscriptionsInput = {
    update: XOR<AgentServiceUpdateWithoutSubscriptionsInput, AgentServiceUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<AgentServiceCreateWithoutSubscriptionsInput, AgentServiceUncheckedCreateWithoutSubscriptionsInput>
    where?: AgentServiceWhereInput
  }

  export type AgentServiceUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: AgentServiceWhereInput
    data: XOR<AgentServiceUpdateWithoutSubscriptionsInput, AgentServiceUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type AgentServiceUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumAgentServiceStatusFieldUpdateOperationsInput | $Enums.AgentServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutServicesNestedInput
    listings?: AgentMarketplaceListingUpdateManyWithoutServiceNestedInput
  }

  export type AgentServiceUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumAgentServiceStatusFieldUpdateOperationsInput | $Enums.AgentServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: AgentMarketplaceListingUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type AgentServiceCreateWithoutListingsInput = {
    id: string
    name: string
    description?: string | null
    priceMinor: bigint | number
    currency?: string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.AgentServiceStatus
    createdAt?: Date | string
    agent: AgentCreateNestedOneWithoutServicesInput
    subscriptions?: AgentSubscriptionCreateNestedManyWithoutServiceInput
  }

  export type AgentServiceUncheckedCreateWithoutListingsInput = {
    id: string
    agentId: string
    name: string
    description?: string | null
    priceMinor: bigint | number
    currency?: string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.AgentServiceStatus
    createdAt?: Date | string
    subscriptions?: AgentSubscriptionUncheckedCreateNestedManyWithoutServiceInput
  }

  export type AgentServiceCreateOrConnectWithoutListingsInput = {
    where: AgentServiceWhereUniqueInput
    create: XOR<AgentServiceCreateWithoutListingsInput, AgentServiceUncheckedCreateWithoutListingsInput>
  }

  export type AgentServiceUpsertWithoutListingsInput = {
    update: XOR<AgentServiceUpdateWithoutListingsInput, AgentServiceUncheckedUpdateWithoutListingsInput>
    create: XOR<AgentServiceCreateWithoutListingsInput, AgentServiceUncheckedCreateWithoutListingsInput>
    where?: AgentServiceWhereInput
  }

  export type AgentServiceUpdateToOneWithWhereWithoutListingsInput = {
    where?: AgentServiceWhereInput
    data: XOR<AgentServiceUpdateWithoutListingsInput, AgentServiceUncheckedUpdateWithoutListingsInput>
  }

  export type AgentServiceUpdateWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumAgentServiceStatusFieldUpdateOperationsInput | $Enums.AgentServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutServicesNestedInput
    subscriptions?: AgentSubscriptionUpdateManyWithoutServiceNestedInput
  }

  export type AgentServiceUncheckedUpdateWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumAgentServiceStatusFieldUpdateOperationsInput | $Enums.AgentServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: AgentSubscriptionUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type AgentCreateWithoutInvoicesInput = {
    id: string
    ownerId: string
    ownerKind: $Enums.OwnerKind
    orgId?: string | null
    name: string
    status?: $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    policy?: AgentSpendingPolicyCreateNestedOneWithoutAgentInput
    reasoningLogs?: AgentReasoningLogCreateNestedManyWithoutAgentInput
    approvalRequests?: SpendApprovalRequestCreateNestedManyWithoutAgentInput
    services?: AgentServiceCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutInvoicesInput = {
    id: string
    ownerId: string
    ownerKind: $Enums.OwnerKind
    orgId?: string | null
    name: string
    status?: $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    policy?: AgentSpendingPolicyUncheckedCreateNestedOneWithoutAgentInput
    reasoningLogs?: AgentReasoningLogUncheckedCreateNestedManyWithoutAgentInput
    approvalRequests?: SpendApprovalRequestUncheckedCreateNestedManyWithoutAgentInput
    services?: AgentServiceUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutInvoicesInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutInvoicesInput, AgentUncheckedCreateWithoutInvoicesInput>
  }

  export type AgentUpsertWithoutInvoicesInput = {
    update: XOR<AgentUpdateWithoutInvoicesInput, AgentUncheckedUpdateWithoutInvoicesInput>
    create: XOR<AgentCreateWithoutInvoicesInput, AgentUncheckedCreateWithoutInvoicesInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutInvoicesInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutInvoicesInput, AgentUncheckedUpdateWithoutInvoicesInput>
  }

  export type AgentUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerKind?: EnumOwnerKindFieldUpdateOperationsInput | $Enums.OwnerKind
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy?: AgentSpendingPolicyUpdateOneWithoutAgentNestedInput
    reasoningLogs?: AgentReasoningLogUpdateManyWithoutAgentNestedInput
    approvalRequests?: SpendApprovalRequestUpdateManyWithoutAgentNestedInput
    services?: AgentServiceUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutInvoicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    ownerKind?: EnumOwnerKindFieldUpdateOperationsInput | $Enums.OwnerKind
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy?: AgentSpendingPolicyUncheckedUpdateOneWithoutAgentNestedInput
    reasoningLogs?: AgentReasoningLogUncheckedUpdateManyWithoutAgentNestedInput
    approvalRequests?: SpendApprovalRequestUncheckedUpdateManyWithoutAgentNestedInput
    services?: AgentServiceUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentReasoningLogCreateManyAgentInput = {
    id: string
    intentId?: string | null
    traceId?: string | null
    summary: string
    steps: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SpendApprovalRequestCreateManyAgentInput = {
    id: string
    intentId?: string | null
    amountMinor: bigint | number
    destination: string
    approvalCount?: number
    requiredApprovers: number
    status?: $Enums.SpendApprovalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentInvoiceCreateManyAgentInput = {
    id: string
    payerAgentId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.AgentInvoiceStatus
    intentId?: string | null
    memo?: string | null
    createdAt?: Date | string
  }

  export type AgentServiceCreateManyAgentInput = {
    id: string
    name: string
    description?: string | null
    priceMinor: bigint | number
    currency?: string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: $Enums.AgentServiceStatus
    createdAt?: Date | string
  }

  export type AgentReasoningLogUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentReasoningLogUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentReasoningLogUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: StringFieldUpdateOperationsInput | string
    steps?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpendApprovalRequestUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    destination?: StringFieldUpdateOperationsInput | string
    approvalCount?: IntFieldUpdateOperationsInput | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    status?: EnumSpendApprovalStatusFieldUpdateOperationsInput | $Enums.SpendApprovalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: SpendApprovalVoteUpdateManyWithoutRequestNestedInput
  }

  export type SpendApprovalRequestUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    destination?: StringFieldUpdateOperationsInput | string
    approvalCount?: IntFieldUpdateOperationsInput | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    status?: EnumSpendApprovalStatusFieldUpdateOperationsInput | $Enums.SpendApprovalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: SpendApprovalVoteUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type SpendApprovalRequestUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    destination?: StringFieldUpdateOperationsInput | string
    approvalCount?: IntFieldUpdateOperationsInput | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    status?: EnumSpendApprovalStatusFieldUpdateOperationsInput | $Enums.SpendApprovalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentInvoiceUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    payerAgentId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentInvoiceStatusFieldUpdateOperationsInput | $Enums.AgentInvoiceStatus
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentInvoiceUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    payerAgentId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentInvoiceStatusFieldUpdateOperationsInput | $Enums.AgentInvoiceStatus
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentInvoiceUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    payerAgentId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumAgentInvoiceStatusFieldUpdateOperationsInput | $Enums.AgentInvoiceStatus
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentServiceUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumAgentServiceStatusFieldUpdateOperationsInput | $Enums.AgentServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: AgentSubscriptionUpdateManyWithoutServiceNestedInput
    listings?: AgentMarketplaceListingUpdateManyWithoutServiceNestedInput
  }

  export type AgentServiceUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumAgentServiceStatusFieldUpdateOperationsInput | $Enums.AgentServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscriptions?: AgentSubscriptionUncheckedUpdateManyWithoutServiceNestedInput
    listings?: AgentMarketplaceListingUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type AgentServiceUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    capability?: NullableJsonNullValueInput | InputJsonValue
    status?: EnumAgentServiceStatusFieldUpdateOperationsInput | $Enums.AgentServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpendApprovalVoteCreateManyRequestInput = {
    id: string
    approverId: string
    createdAt?: Date | string
  }

  export type SpendApprovalVoteUpdateWithoutRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    approverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpendApprovalVoteUncheckedUpdateWithoutRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    approverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpendApprovalVoteUncheckedUpdateManyWithoutRequestInput = {
    id?: StringFieldUpdateOperationsInput | string
    approverId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentSubscriptionCreateManyServiceInput = {
    id: string
    subscriberAgentId: string
    status?: $Enums.SubscriptionStatus
    renewAt?: Date | string | null
    intentId?: string | null
    createdAt?: Date | string
  }

  export type AgentMarketplaceListingCreateManyServiceInput = {
    id: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    ratingBps?: number | null
    visible?: boolean
    onChainId?: string | null
    createdAt?: Date | string
  }

  export type AgentSubscriptionUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriberAgentId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    renewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentSubscriptionUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriberAgentId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    renewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentSubscriptionUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    subscriberAgentId?: StringFieldUpdateOperationsInput | string
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    renewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentMarketplaceListingUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    ratingBps?: NullableIntFieldUpdateOperationsInput | number | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    onChainId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentMarketplaceListingUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    ratingBps?: NullableIntFieldUpdateOperationsInput | number | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    onChainId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentMarketplaceListingUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    ratingBps?: NullableIntFieldUpdateOperationsInput | number | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    onChainId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use AgentCountOutputTypeDefaultArgs instead
     */
    export type AgentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AgentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SpendApprovalRequestCountOutputTypeDefaultArgs instead
     */
    export type SpendApprovalRequestCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SpendApprovalRequestCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AgentServiceCountOutputTypeDefaultArgs instead
     */
    export type AgentServiceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AgentServiceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventOutboxDefaultArgs instead
     */
    export type EventOutboxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventOutboxDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AgentDefaultArgs instead
     */
    export type AgentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AgentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AgentSpendingPolicyDefaultArgs instead
     */
    export type AgentSpendingPolicyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AgentSpendingPolicyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AgentReasoningLogDefaultArgs instead
     */
    export type AgentReasoningLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AgentReasoningLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SpendApprovalRequestDefaultArgs instead
     */
    export type SpendApprovalRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SpendApprovalRequestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SpendApprovalVoteDefaultArgs instead
     */
    export type SpendApprovalVoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SpendApprovalVoteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AgentServiceDefaultArgs instead
     */
    export type AgentServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AgentServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AgentSubscriptionDefaultArgs instead
     */
    export type AgentSubscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AgentSubscriptionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AgentMarketplaceListingDefaultArgs instead
     */
    export type AgentMarketplaceListingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AgentMarketplaceListingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AgentInvoiceDefaultArgs instead
     */
    export type AgentInvoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AgentInvoiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UsageMeterDefaultArgs instead
     */
    export type UsageMeterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UsageMeterDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}