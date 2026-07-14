
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
 * Model ExecutionTransaction
 * 
 */
export type ExecutionTransaction = $Result.DefaultSelection<Prisma.$ExecutionTransactionPayload>
/**
 * Model ExecutionTransactionEvent
 * 
 */
export type ExecutionTransactionEvent = $Result.DefaultSelection<Prisma.$ExecutionTransactionEventPayload>
/**
 * Model EventOutbox
 * Transactional outbox. Domain events are written here in the SAME DB
 * transaction as the state change they describe; a relay drains PENDING rows
 * to NATS. This removes the dual-write hazard — events survive broker outages
 * and process crashes. `eventId` is the JetStream msgID for at-least-once
 * delivery with broker-side de-duplication.
 */
export type EventOutbox = $Result.DefaultSelection<Prisma.$EventOutboxPayload>
/**
 * Model ExecutionConsumerCursor
 * 
 */
export type ExecutionConsumerCursor = $Result.DefaultSelection<Prisma.$ExecutionConsumerCursorPayload>
/**
 * Model EscrowDeal
 * Audit trail for on-chain SalyEscrow deals (indexed + operator actions).
 */
export type EscrowDeal = $Result.DefaultSelection<Prisma.$EscrowDealPayload>
/**
 * Model EscrowDealEvent
 * 
 */
export type EscrowDealEvent = $Result.DefaultSelection<Prisma.$EscrowDealEventPayload>
/**
 * Model ReconciliationRun
 * One execution of a reconciliation sweep (e.g. ledger↔fiat-pay-in rail).
 * Provides an immutable, queryable audit trail for finance ops.
 */
export type ReconciliationRun = $Result.DefaultSelection<Prisma.$ReconciliationRunPayload>
/**
 * Model ReconciliationBreak
 * A single discrepancy found during a reconciliation run. Breaks are durable
 * so they can be triaged/resolved by ops without re-running the sweep.
 */
export type ReconciliationBreak = $Result.DefaultSelection<Prisma.$ReconciliationBreakPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ExecutionTransactionKind: {
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

export type ExecutionTransactionKind = (typeof ExecutionTransactionKind)[keyof typeof ExecutionTransactionKind]


export const ExecutionTransactionState: {
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

export type ExecutionTransactionState = (typeof ExecutionTransactionState)[keyof typeof ExecutionTransactionState]


export const OutboxStatus: {
  PENDING: 'PENDING',
  PUBLISHED: 'PUBLISHED',
  FAILED: 'FAILED'
};

export type OutboxStatus = (typeof OutboxStatus)[keyof typeof OutboxStatus]


export const EscrowDealStatus: {
  FUNDING: 'FUNDING',
  FUNDED: 'FUNDED',
  RELEASED: 'RELEASED',
  REFUNDED: 'REFUNDED'
};

export type EscrowDealStatus = (typeof EscrowDealStatus)[keyof typeof EscrowDealStatus]


export const EscrowResolution: {
  RELEASE: 'RELEASE',
  REFUND: 'REFUND'
};

export type EscrowResolution = (typeof EscrowResolution)[keyof typeof EscrowResolution]


export const ReconciliationStatus: {
  OK: 'OK',
  BREAKS_FOUND: 'BREAKS_FOUND',
  ERROR: 'ERROR'
};

export type ReconciliationStatus = (typeof ReconciliationStatus)[keyof typeof ReconciliationStatus]

}

export type ExecutionTransactionKind = $Enums.ExecutionTransactionKind

export const ExecutionTransactionKind: typeof $Enums.ExecutionTransactionKind

export type ExecutionTransactionState = $Enums.ExecutionTransactionState

export const ExecutionTransactionState: typeof $Enums.ExecutionTransactionState

export type OutboxStatus = $Enums.OutboxStatus

export const OutboxStatus: typeof $Enums.OutboxStatus

export type EscrowDealStatus = $Enums.EscrowDealStatus

export const EscrowDealStatus: typeof $Enums.EscrowDealStatus

export type EscrowResolution = $Enums.EscrowResolution

export const EscrowResolution: typeof $Enums.EscrowResolution

export type ReconciliationStatus = $Enums.ReconciliationStatus

export const ReconciliationStatus: typeof $Enums.ReconciliationStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ExecutionTransactions
 * const executionTransactions = await prisma.executionTransaction.findMany()
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
   * // Fetch zero or more ExecutionTransactions
   * const executionTransactions = await prisma.executionTransaction.findMany()
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
   * `prisma.executionTransaction`: Exposes CRUD operations for the **ExecutionTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExecutionTransactions
    * const executionTransactions = await prisma.executionTransaction.findMany()
    * ```
    */
  get executionTransaction(): Prisma.ExecutionTransactionDelegate<ExtArgs>;

  /**
   * `prisma.executionTransactionEvent`: Exposes CRUD operations for the **ExecutionTransactionEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExecutionTransactionEvents
    * const executionTransactionEvents = await prisma.executionTransactionEvent.findMany()
    * ```
    */
  get executionTransactionEvent(): Prisma.ExecutionTransactionEventDelegate<ExtArgs>;

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
   * `prisma.executionConsumerCursor`: Exposes CRUD operations for the **ExecutionConsumerCursor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExecutionConsumerCursors
    * const executionConsumerCursors = await prisma.executionConsumerCursor.findMany()
    * ```
    */
  get executionConsumerCursor(): Prisma.ExecutionConsumerCursorDelegate<ExtArgs>;

  /**
   * `prisma.escrowDeal`: Exposes CRUD operations for the **EscrowDeal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EscrowDeals
    * const escrowDeals = await prisma.escrowDeal.findMany()
    * ```
    */
  get escrowDeal(): Prisma.EscrowDealDelegate<ExtArgs>;

  /**
   * `prisma.escrowDealEvent`: Exposes CRUD operations for the **EscrowDealEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EscrowDealEvents
    * const escrowDealEvents = await prisma.escrowDealEvent.findMany()
    * ```
    */
  get escrowDealEvent(): Prisma.EscrowDealEventDelegate<ExtArgs>;

  /**
   * `prisma.reconciliationRun`: Exposes CRUD operations for the **ReconciliationRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReconciliationRuns
    * const reconciliationRuns = await prisma.reconciliationRun.findMany()
    * ```
    */
  get reconciliationRun(): Prisma.ReconciliationRunDelegate<ExtArgs>;

  /**
   * `prisma.reconciliationBreak`: Exposes CRUD operations for the **ReconciliationBreak** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReconciliationBreaks
    * const reconciliationBreaks = await prisma.reconciliationBreak.findMany()
    * ```
    */
  get reconciliationBreak(): Prisma.ReconciliationBreakDelegate<ExtArgs>;
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
    ExecutionTransaction: 'ExecutionTransaction',
    ExecutionTransactionEvent: 'ExecutionTransactionEvent',
    EventOutbox: 'EventOutbox',
    ExecutionConsumerCursor: 'ExecutionConsumerCursor',
    EscrowDeal: 'EscrowDeal',
    EscrowDealEvent: 'EscrowDealEvent',
    ReconciliationRun: 'ReconciliationRun',
    ReconciliationBreak: 'ReconciliationBreak'
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
      modelProps: "executionTransaction" | "executionTransactionEvent" | "eventOutbox" | "executionConsumerCursor" | "escrowDeal" | "escrowDealEvent" | "reconciliationRun" | "reconciliationBreak"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ExecutionTransaction: {
        payload: Prisma.$ExecutionTransactionPayload<ExtArgs>
        fields: Prisma.ExecutionTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExecutionTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExecutionTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionPayload>
          }
          findFirst: {
            args: Prisma.ExecutionTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExecutionTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionPayload>
          }
          findMany: {
            args: Prisma.ExecutionTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionPayload>[]
          }
          create: {
            args: Prisma.ExecutionTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionPayload>
          }
          createMany: {
            args: Prisma.ExecutionTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExecutionTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionPayload>[]
          }
          delete: {
            args: Prisma.ExecutionTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionPayload>
          }
          update: {
            args: Prisma.ExecutionTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionPayload>
          }
          deleteMany: {
            args: Prisma.ExecutionTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExecutionTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExecutionTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionPayload>
          }
          aggregate: {
            args: Prisma.ExecutionTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExecutionTransaction>
          }
          groupBy: {
            args: Prisma.ExecutionTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExecutionTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExecutionTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<ExecutionTransactionCountAggregateOutputType> | number
          }
        }
      }
      ExecutionTransactionEvent: {
        payload: Prisma.$ExecutionTransactionEventPayload<ExtArgs>
        fields: Prisma.ExecutionTransactionEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExecutionTransactionEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExecutionTransactionEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionEventPayload>
          }
          findFirst: {
            args: Prisma.ExecutionTransactionEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExecutionTransactionEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionEventPayload>
          }
          findMany: {
            args: Prisma.ExecutionTransactionEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionEventPayload>[]
          }
          create: {
            args: Prisma.ExecutionTransactionEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionEventPayload>
          }
          createMany: {
            args: Prisma.ExecutionTransactionEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExecutionTransactionEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionEventPayload>[]
          }
          delete: {
            args: Prisma.ExecutionTransactionEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionEventPayload>
          }
          update: {
            args: Prisma.ExecutionTransactionEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionEventPayload>
          }
          deleteMany: {
            args: Prisma.ExecutionTransactionEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExecutionTransactionEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExecutionTransactionEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionTransactionEventPayload>
          }
          aggregate: {
            args: Prisma.ExecutionTransactionEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExecutionTransactionEvent>
          }
          groupBy: {
            args: Prisma.ExecutionTransactionEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExecutionTransactionEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExecutionTransactionEventCountArgs<ExtArgs>
            result: $Utils.Optional<ExecutionTransactionEventCountAggregateOutputType> | number
          }
        }
      }
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
      ExecutionConsumerCursor: {
        payload: Prisma.$ExecutionConsumerCursorPayload<ExtArgs>
        fields: Prisma.ExecutionConsumerCursorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExecutionConsumerCursorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionConsumerCursorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExecutionConsumerCursorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionConsumerCursorPayload>
          }
          findFirst: {
            args: Prisma.ExecutionConsumerCursorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionConsumerCursorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExecutionConsumerCursorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionConsumerCursorPayload>
          }
          findMany: {
            args: Prisma.ExecutionConsumerCursorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionConsumerCursorPayload>[]
          }
          create: {
            args: Prisma.ExecutionConsumerCursorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionConsumerCursorPayload>
          }
          createMany: {
            args: Prisma.ExecutionConsumerCursorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExecutionConsumerCursorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionConsumerCursorPayload>[]
          }
          delete: {
            args: Prisma.ExecutionConsumerCursorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionConsumerCursorPayload>
          }
          update: {
            args: Prisma.ExecutionConsumerCursorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionConsumerCursorPayload>
          }
          deleteMany: {
            args: Prisma.ExecutionConsumerCursorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExecutionConsumerCursorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExecutionConsumerCursorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExecutionConsumerCursorPayload>
          }
          aggregate: {
            args: Prisma.ExecutionConsumerCursorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExecutionConsumerCursor>
          }
          groupBy: {
            args: Prisma.ExecutionConsumerCursorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExecutionConsumerCursorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExecutionConsumerCursorCountArgs<ExtArgs>
            result: $Utils.Optional<ExecutionConsumerCursorCountAggregateOutputType> | number
          }
        }
      }
      EscrowDeal: {
        payload: Prisma.$EscrowDealPayload<ExtArgs>
        fields: Prisma.EscrowDealFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EscrowDealFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EscrowDealFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealPayload>
          }
          findFirst: {
            args: Prisma.EscrowDealFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EscrowDealFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealPayload>
          }
          findMany: {
            args: Prisma.EscrowDealFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealPayload>[]
          }
          create: {
            args: Prisma.EscrowDealCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealPayload>
          }
          createMany: {
            args: Prisma.EscrowDealCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EscrowDealCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealPayload>[]
          }
          delete: {
            args: Prisma.EscrowDealDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealPayload>
          }
          update: {
            args: Prisma.EscrowDealUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealPayload>
          }
          deleteMany: {
            args: Prisma.EscrowDealDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EscrowDealUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EscrowDealUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealPayload>
          }
          aggregate: {
            args: Prisma.EscrowDealAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEscrowDeal>
          }
          groupBy: {
            args: Prisma.EscrowDealGroupByArgs<ExtArgs>
            result: $Utils.Optional<EscrowDealGroupByOutputType>[]
          }
          count: {
            args: Prisma.EscrowDealCountArgs<ExtArgs>
            result: $Utils.Optional<EscrowDealCountAggregateOutputType> | number
          }
        }
      }
      EscrowDealEvent: {
        payload: Prisma.$EscrowDealEventPayload<ExtArgs>
        fields: Prisma.EscrowDealEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EscrowDealEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EscrowDealEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealEventPayload>
          }
          findFirst: {
            args: Prisma.EscrowDealEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EscrowDealEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealEventPayload>
          }
          findMany: {
            args: Prisma.EscrowDealEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealEventPayload>[]
          }
          create: {
            args: Prisma.EscrowDealEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealEventPayload>
          }
          createMany: {
            args: Prisma.EscrowDealEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EscrowDealEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealEventPayload>[]
          }
          delete: {
            args: Prisma.EscrowDealEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealEventPayload>
          }
          update: {
            args: Prisma.EscrowDealEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealEventPayload>
          }
          deleteMany: {
            args: Prisma.EscrowDealEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EscrowDealEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EscrowDealEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EscrowDealEventPayload>
          }
          aggregate: {
            args: Prisma.EscrowDealEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEscrowDealEvent>
          }
          groupBy: {
            args: Prisma.EscrowDealEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EscrowDealEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EscrowDealEventCountArgs<ExtArgs>
            result: $Utils.Optional<EscrowDealEventCountAggregateOutputType> | number
          }
        }
      }
      ReconciliationRun: {
        payload: Prisma.$ReconciliationRunPayload<ExtArgs>
        fields: Prisma.ReconciliationRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReconciliationRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReconciliationRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>
          }
          findFirst: {
            args: Prisma.ReconciliationRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReconciliationRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>
          }
          findMany: {
            args: Prisma.ReconciliationRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>[]
          }
          create: {
            args: Prisma.ReconciliationRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>
          }
          createMany: {
            args: Prisma.ReconciliationRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReconciliationRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>[]
          }
          delete: {
            args: Prisma.ReconciliationRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>
          }
          update: {
            args: Prisma.ReconciliationRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>
          }
          deleteMany: {
            args: Prisma.ReconciliationRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReconciliationRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReconciliationRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationRunPayload>
          }
          aggregate: {
            args: Prisma.ReconciliationRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReconciliationRun>
          }
          groupBy: {
            args: Prisma.ReconciliationRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReconciliationRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReconciliationRunCountArgs<ExtArgs>
            result: $Utils.Optional<ReconciliationRunCountAggregateOutputType> | number
          }
        }
      }
      ReconciliationBreak: {
        payload: Prisma.$ReconciliationBreakPayload<ExtArgs>
        fields: Prisma.ReconciliationBreakFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReconciliationBreakFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationBreakPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReconciliationBreakFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationBreakPayload>
          }
          findFirst: {
            args: Prisma.ReconciliationBreakFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationBreakPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReconciliationBreakFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationBreakPayload>
          }
          findMany: {
            args: Prisma.ReconciliationBreakFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationBreakPayload>[]
          }
          create: {
            args: Prisma.ReconciliationBreakCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationBreakPayload>
          }
          createMany: {
            args: Prisma.ReconciliationBreakCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReconciliationBreakCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationBreakPayload>[]
          }
          delete: {
            args: Prisma.ReconciliationBreakDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationBreakPayload>
          }
          update: {
            args: Prisma.ReconciliationBreakUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationBreakPayload>
          }
          deleteMany: {
            args: Prisma.ReconciliationBreakDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReconciliationBreakUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReconciliationBreakUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReconciliationBreakPayload>
          }
          aggregate: {
            args: Prisma.ReconciliationBreakAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReconciliationBreak>
          }
          groupBy: {
            args: Prisma.ReconciliationBreakGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReconciliationBreakGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReconciliationBreakCountArgs<ExtArgs>
            result: $Utils.Optional<ReconciliationBreakCountAggregateOutputType> | number
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
   * Count Type ExecutionTransactionCountOutputType
   */

  export type ExecutionTransactionCountOutputType = {
    events: number
  }

  export type ExecutionTransactionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | ExecutionTransactionCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * ExecutionTransactionCountOutputType without action
   */
  export type ExecutionTransactionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransactionCountOutputType
     */
    select?: ExecutionTransactionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExecutionTransactionCountOutputType without action
   */
  export type ExecutionTransactionCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExecutionTransactionEventWhereInput
  }


  /**
   * Count Type EscrowDealCountOutputType
   */

  export type EscrowDealCountOutputType = {
    events: number
  }

  export type EscrowDealCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | EscrowDealCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * EscrowDealCountOutputType without action
   */
  export type EscrowDealCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDealCountOutputType
     */
    select?: EscrowDealCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EscrowDealCountOutputType without action
   */
  export type EscrowDealCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EscrowDealEventWhereInput
  }


  /**
   * Count Type ReconciliationRunCountOutputType
   */

  export type ReconciliationRunCountOutputType = {
    breaks: number
  }

  export type ReconciliationRunCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    breaks?: boolean | ReconciliationRunCountOutputTypeCountBreaksArgs
  }

  // Custom InputTypes
  /**
   * ReconciliationRunCountOutputType without action
   */
  export type ReconciliationRunCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRunCountOutputType
     */
    select?: ReconciliationRunCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReconciliationRunCountOutputType without action
   */
  export type ReconciliationRunCountOutputTypeCountBreaksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReconciliationBreakWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ExecutionTransaction
   */

  export type AggregateExecutionTransaction = {
    _count: ExecutionTransactionCountAggregateOutputType | null
    _avg: ExecutionTransactionAvgAggregateOutputType | null
    _sum: ExecutionTransactionSumAggregateOutputType | null
    _min: ExecutionTransactionMinAggregateOutputType | null
    _max: ExecutionTransactionMaxAggregateOutputType | null
  }

  export type ExecutionTransactionAvgAggregateOutputType = {
    amountMinor: number | null
    riskScore: number | null
  }

  export type ExecutionTransactionSumAggregateOutputType = {
    amountMinor: bigint | null
    riskScore: number | null
  }

  export type ExecutionTransactionMinAggregateOutputType = {
    id: string | null
    idempotencyKey: string | null
    kind: $Enums.ExecutionTransactionKind | null
    state: $Enums.ExecutionTransactionState | null
    sourceWalletId: string | null
    sourceAccountId: string | null
    amountMinor: bigint | null
    currency: string | null
    destinationWalletId: string | null
    destinationAccountId: string | null
    destinationAddress: string | null
    destinationChain: string | null
    asset: string | null
    ledgerTransactionId: string | null
    ledgerEntryId: string | null
    reversalEntryId: string | null
    broadcastJobId: string | null
    txHash: string | null
    intentId: string | null
    orgId: string | null
    memo: string | null
    error: string | null
    routeDecisionId: string | null
    selectedRail: string | null
    quoteId: string | null
    quoteSignature: string | null
    riskAssessmentId: string | null
    riskScore: number | null
    complianceRunId: string | null
    complianceCaseId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    settledAt: Date | null
  }

  export type ExecutionTransactionMaxAggregateOutputType = {
    id: string | null
    idempotencyKey: string | null
    kind: $Enums.ExecutionTransactionKind | null
    state: $Enums.ExecutionTransactionState | null
    sourceWalletId: string | null
    sourceAccountId: string | null
    amountMinor: bigint | null
    currency: string | null
    destinationWalletId: string | null
    destinationAccountId: string | null
    destinationAddress: string | null
    destinationChain: string | null
    asset: string | null
    ledgerTransactionId: string | null
    ledgerEntryId: string | null
    reversalEntryId: string | null
    broadcastJobId: string | null
    txHash: string | null
    intentId: string | null
    orgId: string | null
    memo: string | null
    error: string | null
    routeDecisionId: string | null
    selectedRail: string | null
    quoteId: string | null
    quoteSignature: string | null
    riskAssessmentId: string | null
    riskScore: number | null
    complianceRunId: string | null
    complianceCaseId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    settledAt: Date | null
  }

  export type ExecutionTransactionCountAggregateOutputType = {
    id: number
    idempotencyKey: number
    kind: number
    state: number
    sourceWalletId: number
    sourceAccountId: number
    amountMinor: number
    currency: number
    destinationWalletId: number
    destinationAccountId: number
    destinationAddress: number
    destinationChain: number
    asset: number
    ledgerTransactionId: number
    ledgerEntryId: number
    reversalEntryId: number
    broadcastJobId: number
    txHash: number
    intentId: number
    orgId: number
    memo: number
    metadata: number
    error: number
    routeDecisionId: number
    selectedRail: number
    quoteId: number
    quoteSignature: number
    riskAssessmentId: number
    riskScore: number
    complianceRunId: number
    complianceCaseId: number
    createdAt: number
    updatedAt: number
    settledAt: number
    _all: number
  }


  export type ExecutionTransactionAvgAggregateInputType = {
    amountMinor?: true
    riskScore?: true
  }

  export type ExecutionTransactionSumAggregateInputType = {
    amountMinor?: true
    riskScore?: true
  }

  export type ExecutionTransactionMinAggregateInputType = {
    id?: true
    idempotencyKey?: true
    kind?: true
    state?: true
    sourceWalletId?: true
    sourceAccountId?: true
    amountMinor?: true
    currency?: true
    destinationWalletId?: true
    destinationAccountId?: true
    destinationAddress?: true
    destinationChain?: true
    asset?: true
    ledgerTransactionId?: true
    ledgerEntryId?: true
    reversalEntryId?: true
    broadcastJobId?: true
    txHash?: true
    intentId?: true
    orgId?: true
    memo?: true
    error?: true
    routeDecisionId?: true
    selectedRail?: true
    quoteId?: true
    quoteSignature?: true
    riskAssessmentId?: true
    riskScore?: true
    complianceRunId?: true
    complianceCaseId?: true
    createdAt?: true
    updatedAt?: true
    settledAt?: true
  }

  export type ExecutionTransactionMaxAggregateInputType = {
    id?: true
    idempotencyKey?: true
    kind?: true
    state?: true
    sourceWalletId?: true
    sourceAccountId?: true
    amountMinor?: true
    currency?: true
    destinationWalletId?: true
    destinationAccountId?: true
    destinationAddress?: true
    destinationChain?: true
    asset?: true
    ledgerTransactionId?: true
    ledgerEntryId?: true
    reversalEntryId?: true
    broadcastJobId?: true
    txHash?: true
    intentId?: true
    orgId?: true
    memo?: true
    error?: true
    routeDecisionId?: true
    selectedRail?: true
    quoteId?: true
    quoteSignature?: true
    riskAssessmentId?: true
    riskScore?: true
    complianceRunId?: true
    complianceCaseId?: true
    createdAt?: true
    updatedAt?: true
    settledAt?: true
  }

  export type ExecutionTransactionCountAggregateInputType = {
    id?: true
    idempotencyKey?: true
    kind?: true
    state?: true
    sourceWalletId?: true
    sourceAccountId?: true
    amountMinor?: true
    currency?: true
    destinationWalletId?: true
    destinationAccountId?: true
    destinationAddress?: true
    destinationChain?: true
    asset?: true
    ledgerTransactionId?: true
    ledgerEntryId?: true
    reversalEntryId?: true
    broadcastJobId?: true
    txHash?: true
    intentId?: true
    orgId?: true
    memo?: true
    metadata?: true
    error?: true
    routeDecisionId?: true
    selectedRail?: true
    quoteId?: true
    quoteSignature?: true
    riskAssessmentId?: true
    riskScore?: true
    complianceRunId?: true
    complianceCaseId?: true
    createdAt?: true
    updatedAt?: true
    settledAt?: true
    _all?: true
  }

  export type ExecutionTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExecutionTransaction to aggregate.
     */
    where?: ExecutionTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExecutionTransactions to fetch.
     */
    orderBy?: ExecutionTransactionOrderByWithRelationInput | ExecutionTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExecutionTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExecutionTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExecutionTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExecutionTransactions
    **/
    _count?: true | ExecutionTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExecutionTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExecutionTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExecutionTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExecutionTransactionMaxAggregateInputType
  }

  export type GetExecutionTransactionAggregateType<T extends ExecutionTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateExecutionTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExecutionTransaction[P]>
      : GetScalarType<T[P], AggregateExecutionTransaction[P]>
  }




  export type ExecutionTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExecutionTransactionWhereInput
    orderBy?: ExecutionTransactionOrderByWithAggregationInput | ExecutionTransactionOrderByWithAggregationInput[]
    by: ExecutionTransactionScalarFieldEnum[] | ExecutionTransactionScalarFieldEnum
    having?: ExecutionTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExecutionTransactionCountAggregateInputType | true
    _avg?: ExecutionTransactionAvgAggregateInputType
    _sum?: ExecutionTransactionSumAggregateInputType
    _min?: ExecutionTransactionMinAggregateInputType
    _max?: ExecutionTransactionMaxAggregateInputType
  }

  export type ExecutionTransactionGroupByOutputType = {
    id: string
    idempotencyKey: string
    kind: $Enums.ExecutionTransactionKind
    state: $Enums.ExecutionTransactionState
    sourceWalletId: string | null
    sourceAccountId: string | null
    amountMinor: bigint
    currency: string
    destinationWalletId: string | null
    destinationAccountId: string | null
    destinationAddress: string | null
    destinationChain: string | null
    asset: string | null
    ledgerTransactionId: string | null
    ledgerEntryId: string | null
    reversalEntryId: string | null
    broadcastJobId: string | null
    txHash: string | null
    intentId: string | null
    orgId: string | null
    memo: string | null
    metadata: JsonValue | null
    error: string | null
    routeDecisionId: string | null
    selectedRail: string | null
    quoteId: string | null
    quoteSignature: string | null
    riskAssessmentId: string | null
    riskScore: number | null
    complianceRunId: string | null
    complianceCaseId: string | null
    createdAt: Date
    updatedAt: Date
    settledAt: Date | null
    _count: ExecutionTransactionCountAggregateOutputType | null
    _avg: ExecutionTransactionAvgAggregateOutputType | null
    _sum: ExecutionTransactionSumAggregateOutputType | null
    _min: ExecutionTransactionMinAggregateOutputType | null
    _max: ExecutionTransactionMaxAggregateOutputType | null
  }

  type GetExecutionTransactionGroupByPayload<T extends ExecutionTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExecutionTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExecutionTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExecutionTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], ExecutionTransactionGroupByOutputType[P]>
        }
      >
    >


  export type ExecutionTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idempotencyKey?: boolean
    kind?: boolean
    state?: boolean
    sourceWalletId?: boolean
    sourceAccountId?: boolean
    amountMinor?: boolean
    currency?: boolean
    destinationWalletId?: boolean
    destinationAccountId?: boolean
    destinationAddress?: boolean
    destinationChain?: boolean
    asset?: boolean
    ledgerTransactionId?: boolean
    ledgerEntryId?: boolean
    reversalEntryId?: boolean
    broadcastJobId?: boolean
    txHash?: boolean
    intentId?: boolean
    orgId?: boolean
    memo?: boolean
    metadata?: boolean
    error?: boolean
    routeDecisionId?: boolean
    selectedRail?: boolean
    quoteId?: boolean
    quoteSignature?: boolean
    riskAssessmentId?: boolean
    riskScore?: boolean
    complianceRunId?: boolean
    complianceCaseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    settledAt?: boolean
    events?: boolean | ExecutionTransaction$eventsArgs<ExtArgs>
    _count?: boolean | ExecutionTransactionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["executionTransaction"]>

  export type ExecutionTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idempotencyKey?: boolean
    kind?: boolean
    state?: boolean
    sourceWalletId?: boolean
    sourceAccountId?: boolean
    amountMinor?: boolean
    currency?: boolean
    destinationWalletId?: boolean
    destinationAccountId?: boolean
    destinationAddress?: boolean
    destinationChain?: boolean
    asset?: boolean
    ledgerTransactionId?: boolean
    ledgerEntryId?: boolean
    reversalEntryId?: boolean
    broadcastJobId?: boolean
    txHash?: boolean
    intentId?: boolean
    orgId?: boolean
    memo?: boolean
    metadata?: boolean
    error?: boolean
    routeDecisionId?: boolean
    selectedRail?: boolean
    quoteId?: boolean
    quoteSignature?: boolean
    riskAssessmentId?: boolean
    riskScore?: boolean
    complianceRunId?: boolean
    complianceCaseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    settledAt?: boolean
  }, ExtArgs["result"]["executionTransaction"]>

  export type ExecutionTransactionSelectScalar = {
    id?: boolean
    idempotencyKey?: boolean
    kind?: boolean
    state?: boolean
    sourceWalletId?: boolean
    sourceAccountId?: boolean
    amountMinor?: boolean
    currency?: boolean
    destinationWalletId?: boolean
    destinationAccountId?: boolean
    destinationAddress?: boolean
    destinationChain?: boolean
    asset?: boolean
    ledgerTransactionId?: boolean
    ledgerEntryId?: boolean
    reversalEntryId?: boolean
    broadcastJobId?: boolean
    txHash?: boolean
    intentId?: boolean
    orgId?: boolean
    memo?: boolean
    metadata?: boolean
    error?: boolean
    routeDecisionId?: boolean
    selectedRail?: boolean
    quoteId?: boolean
    quoteSignature?: boolean
    riskAssessmentId?: boolean
    riskScore?: boolean
    complianceRunId?: boolean
    complianceCaseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    settledAt?: boolean
  }

  export type ExecutionTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | ExecutionTransaction$eventsArgs<ExtArgs>
    _count?: boolean | ExecutionTransactionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExecutionTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ExecutionTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExecutionTransaction"
    objects: {
      events: Prisma.$ExecutionTransactionEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idempotencyKey: string
      kind: $Enums.ExecutionTransactionKind
      state: $Enums.ExecutionTransactionState
      sourceWalletId: string | null
      sourceAccountId: string | null
      amountMinor: bigint
      currency: string
      destinationWalletId: string | null
      destinationAccountId: string | null
      destinationAddress: string | null
      destinationChain: string | null
      asset: string | null
      ledgerTransactionId: string | null
      ledgerEntryId: string | null
      reversalEntryId: string | null
      broadcastJobId: string | null
      txHash: string | null
      intentId: string | null
      /**
       * Owning organization (tenant). Null for consumer/JWT-originated transactions.
       */
      orgId: string | null
      memo: string | null
      metadata: Prisma.JsonValue | null
      error: string | null
      routeDecisionId: string | null
      selectedRail: string | null
      quoteId: string | null
      quoteSignature: string | null
      riskAssessmentId: string | null
      riskScore: number | null
      complianceRunId: string | null
      complianceCaseId: string | null
      createdAt: Date
      updatedAt: Date
      settledAt: Date | null
    }, ExtArgs["result"]["executionTransaction"]>
    composites: {}
  }

  type ExecutionTransactionGetPayload<S extends boolean | null | undefined | ExecutionTransactionDefaultArgs> = $Result.GetResult<Prisma.$ExecutionTransactionPayload, S>

  type ExecutionTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExecutionTransactionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExecutionTransactionCountAggregateInputType | true
    }

  export interface ExecutionTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExecutionTransaction'], meta: { name: 'ExecutionTransaction' } }
    /**
     * Find zero or one ExecutionTransaction that matches the filter.
     * @param {ExecutionTransactionFindUniqueArgs} args - Arguments to find a ExecutionTransaction
     * @example
     * // Get one ExecutionTransaction
     * const executionTransaction = await prisma.executionTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExecutionTransactionFindUniqueArgs>(args: SelectSubset<T, ExecutionTransactionFindUniqueArgs<ExtArgs>>): Prisma__ExecutionTransactionClient<$Result.GetResult<Prisma.$ExecutionTransactionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ExecutionTransaction that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExecutionTransactionFindUniqueOrThrowArgs} args - Arguments to find a ExecutionTransaction
     * @example
     * // Get one ExecutionTransaction
     * const executionTransaction = await prisma.executionTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExecutionTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, ExecutionTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExecutionTransactionClient<$Result.GetResult<Prisma.$ExecutionTransactionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ExecutionTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionTransactionFindFirstArgs} args - Arguments to find a ExecutionTransaction
     * @example
     * // Get one ExecutionTransaction
     * const executionTransaction = await prisma.executionTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExecutionTransactionFindFirstArgs>(args?: SelectSubset<T, ExecutionTransactionFindFirstArgs<ExtArgs>>): Prisma__ExecutionTransactionClient<$Result.GetResult<Prisma.$ExecutionTransactionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ExecutionTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionTransactionFindFirstOrThrowArgs} args - Arguments to find a ExecutionTransaction
     * @example
     * // Get one ExecutionTransaction
     * const executionTransaction = await prisma.executionTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExecutionTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, ExecutionTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExecutionTransactionClient<$Result.GetResult<Prisma.$ExecutionTransactionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ExecutionTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExecutionTransactions
     * const executionTransactions = await prisma.executionTransaction.findMany()
     * 
     * // Get first 10 ExecutionTransactions
     * const executionTransactions = await prisma.executionTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const executionTransactionWithIdOnly = await prisma.executionTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExecutionTransactionFindManyArgs>(args?: SelectSubset<T, ExecutionTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExecutionTransactionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ExecutionTransaction.
     * @param {ExecutionTransactionCreateArgs} args - Arguments to create a ExecutionTransaction.
     * @example
     * // Create one ExecutionTransaction
     * const ExecutionTransaction = await prisma.executionTransaction.create({
     *   data: {
     *     // ... data to create a ExecutionTransaction
     *   }
     * })
     * 
     */
    create<T extends ExecutionTransactionCreateArgs>(args: SelectSubset<T, ExecutionTransactionCreateArgs<ExtArgs>>): Prisma__ExecutionTransactionClient<$Result.GetResult<Prisma.$ExecutionTransactionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ExecutionTransactions.
     * @param {ExecutionTransactionCreateManyArgs} args - Arguments to create many ExecutionTransactions.
     * @example
     * // Create many ExecutionTransactions
     * const executionTransaction = await prisma.executionTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExecutionTransactionCreateManyArgs>(args?: SelectSubset<T, ExecutionTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExecutionTransactions and returns the data saved in the database.
     * @param {ExecutionTransactionCreateManyAndReturnArgs} args - Arguments to create many ExecutionTransactions.
     * @example
     * // Create many ExecutionTransactions
     * const executionTransaction = await prisma.executionTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExecutionTransactions and only return the `id`
     * const executionTransactionWithIdOnly = await prisma.executionTransaction.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExecutionTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, ExecutionTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExecutionTransactionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ExecutionTransaction.
     * @param {ExecutionTransactionDeleteArgs} args - Arguments to delete one ExecutionTransaction.
     * @example
     * // Delete one ExecutionTransaction
     * const ExecutionTransaction = await prisma.executionTransaction.delete({
     *   where: {
     *     // ... filter to delete one ExecutionTransaction
     *   }
     * })
     * 
     */
    delete<T extends ExecutionTransactionDeleteArgs>(args: SelectSubset<T, ExecutionTransactionDeleteArgs<ExtArgs>>): Prisma__ExecutionTransactionClient<$Result.GetResult<Prisma.$ExecutionTransactionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ExecutionTransaction.
     * @param {ExecutionTransactionUpdateArgs} args - Arguments to update one ExecutionTransaction.
     * @example
     * // Update one ExecutionTransaction
     * const executionTransaction = await prisma.executionTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExecutionTransactionUpdateArgs>(args: SelectSubset<T, ExecutionTransactionUpdateArgs<ExtArgs>>): Prisma__ExecutionTransactionClient<$Result.GetResult<Prisma.$ExecutionTransactionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ExecutionTransactions.
     * @param {ExecutionTransactionDeleteManyArgs} args - Arguments to filter ExecutionTransactions to delete.
     * @example
     * // Delete a few ExecutionTransactions
     * const { count } = await prisma.executionTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExecutionTransactionDeleteManyArgs>(args?: SelectSubset<T, ExecutionTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExecutionTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExecutionTransactions
     * const executionTransaction = await prisma.executionTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExecutionTransactionUpdateManyArgs>(args: SelectSubset<T, ExecutionTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ExecutionTransaction.
     * @param {ExecutionTransactionUpsertArgs} args - Arguments to update or create a ExecutionTransaction.
     * @example
     * // Update or create a ExecutionTransaction
     * const executionTransaction = await prisma.executionTransaction.upsert({
     *   create: {
     *     // ... data to create a ExecutionTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExecutionTransaction we want to update
     *   }
     * })
     */
    upsert<T extends ExecutionTransactionUpsertArgs>(args: SelectSubset<T, ExecutionTransactionUpsertArgs<ExtArgs>>): Prisma__ExecutionTransactionClient<$Result.GetResult<Prisma.$ExecutionTransactionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ExecutionTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionTransactionCountArgs} args - Arguments to filter ExecutionTransactions to count.
     * @example
     * // Count the number of ExecutionTransactions
     * const count = await prisma.executionTransaction.count({
     *   where: {
     *     // ... the filter for the ExecutionTransactions we want to count
     *   }
     * })
    **/
    count<T extends ExecutionTransactionCountArgs>(
      args?: Subset<T, ExecutionTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExecutionTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExecutionTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExecutionTransactionAggregateArgs>(args: Subset<T, ExecutionTransactionAggregateArgs>): Prisma.PrismaPromise<GetExecutionTransactionAggregateType<T>>

    /**
     * Group by ExecutionTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionTransactionGroupByArgs} args - Group by arguments.
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
      T extends ExecutionTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExecutionTransactionGroupByArgs['orderBy'] }
        : { orderBy?: ExecutionTransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ExecutionTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExecutionTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExecutionTransaction model
   */
  readonly fields: ExecutionTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExecutionTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExecutionTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    events<T extends ExecutionTransaction$eventsArgs<ExtArgs> = {}>(args?: Subset<T, ExecutionTransaction$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExecutionTransactionEventPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the ExecutionTransaction model
   */ 
  interface ExecutionTransactionFieldRefs {
    readonly id: FieldRef<"ExecutionTransaction", 'String'>
    readonly idempotencyKey: FieldRef<"ExecutionTransaction", 'String'>
    readonly kind: FieldRef<"ExecutionTransaction", 'ExecutionTransactionKind'>
    readonly state: FieldRef<"ExecutionTransaction", 'ExecutionTransactionState'>
    readonly sourceWalletId: FieldRef<"ExecutionTransaction", 'String'>
    readonly sourceAccountId: FieldRef<"ExecutionTransaction", 'String'>
    readonly amountMinor: FieldRef<"ExecutionTransaction", 'BigInt'>
    readonly currency: FieldRef<"ExecutionTransaction", 'String'>
    readonly destinationWalletId: FieldRef<"ExecutionTransaction", 'String'>
    readonly destinationAccountId: FieldRef<"ExecutionTransaction", 'String'>
    readonly destinationAddress: FieldRef<"ExecutionTransaction", 'String'>
    readonly destinationChain: FieldRef<"ExecutionTransaction", 'String'>
    readonly asset: FieldRef<"ExecutionTransaction", 'String'>
    readonly ledgerTransactionId: FieldRef<"ExecutionTransaction", 'String'>
    readonly ledgerEntryId: FieldRef<"ExecutionTransaction", 'String'>
    readonly reversalEntryId: FieldRef<"ExecutionTransaction", 'String'>
    readonly broadcastJobId: FieldRef<"ExecutionTransaction", 'String'>
    readonly txHash: FieldRef<"ExecutionTransaction", 'String'>
    readonly intentId: FieldRef<"ExecutionTransaction", 'String'>
    readonly orgId: FieldRef<"ExecutionTransaction", 'String'>
    readonly memo: FieldRef<"ExecutionTransaction", 'String'>
    readonly metadata: FieldRef<"ExecutionTransaction", 'Json'>
    readonly error: FieldRef<"ExecutionTransaction", 'String'>
    readonly routeDecisionId: FieldRef<"ExecutionTransaction", 'String'>
    readonly selectedRail: FieldRef<"ExecutionTransaction", 'String'>
    readonly quoteId: FieldRef<"ExecutionTransaction", 'String'>
    readonly quoteSignature: FieldRef<"ExecutionTransaction", 'String'>
    readonly riskAssessmentId: FieldRef<"ExecutionTransaction", 'String'>
    readonly riskScore: FieldRef<"ExecutionTransaction", 'Int'>
    readonly complianceRunId: FieldRef<"ExecutionTransaction", 'String'>
    readonly complianceCaseId: FieldRef<"ExecutionTransaction", 'String'>
    readonly createdAt: FieldRef<"ExecutionTransaction", 'DateTime'>
    readonly updatedAt: FieldRef<"ExecutionTransaction", 'DateTime'>
    readonly settledAt: FieldRef<"ExecutionTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExecutionTransaction findUnique
   */
  export type ExecutionTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransaction
     */
    select?: ExecutionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ExecutionTransaction to fetch.
     */
    where: ExecutionTransactionWhereUniqueInput
  }

  /**
   * ExecutionTransaction findUniqueOrThrow
   */
  export type ExecutionTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransaction
     */
    select?: ExecutionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ExecutionTransaction to fetch.
     */
    where: ExecutionTransactionWhereUniqueInput
  }

  /**
   * ExecutionTransaction findFirst
   */
  export type ExecutionTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransaction
     */
    select?: ExecutionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ExecutionTransaction to fetch.
     */
    where?: ExecutionTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExecutionTransactions to fetch.
     */
    orderBy?: ExecutionTransactionOrderByWithRelationInput | ExecutionTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExecutionTransactions.
     */
    cursor?: ExecutionTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExecutionTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExecutionTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExecutionTransactions.
     */
    distinct?: ExecutionTransactionScalarFieldEnum | ExecutionTransactionScalarFieldEnum[]
  }

  /**
   * ExecutionTransaction findFirstOrThrow
   */
  export type ExecutionTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransaction
     */
    select?: ExecutionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ExecutionTransaction to fetch.
     */
    where?: ExecutionTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExecutionTransactions to fetch.
     */
    orderBy?: ExecutionTransactionOrderByWithRelationInput | ExecutionTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExecutionTransactions.
     */
    cursor?: ExecutionTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExecutionTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExecutionTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExecutionTransactions.
     */
    distinct?: ExecutionTransactionScalarFieldEnum | ExecutionTransactionScalarFieldEnum[]
  }

  /**
   * ExecutionTransaction findMany
   */
  export type ExecutionTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransaction
     */
    select?: ExecutionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ExecutionTransactions to fetch.
     */
    where?: ExecutionTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExecutionTransactions to fetch.
     */
    orderBy?: ExecutionTransactionOrderByWithRelationInput | ExecutionTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExecutionTransactions.
     */
    cursor?: ExecutionTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExecutionTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExecutionTransactions.
     */
    skip?: number
    distinct?: ExecutionTransactionScalarFieldEnum | ExecutionTransactionScalarFieldEnum[]
  }

  /**
   * ExecutionTransaction create
   */
  export type ExecutionTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransaction
     */
    select?: ExecutionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a ExecutionTransaction.
     */
    data: XOR<ExecutionTransactionCreateInput, ExecutionTransactionUncheckedCreateInput>
  }

  /**
   * ExecutionTransaction createMany
   */
  export type ExecutionTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExecutionTransactions.
     */
    data: ExecutionTransactionCreateManyInput | ExecutionTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExecutionTransaction createManyAndReturn
   */
  export type ExecutionTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransaction
     */
    select?: ExecutionTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ExecutionTransactions.
     */
    data: ExecutionTransactionCreateManyInput | ExecutionTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExecutionTransaction update
   */
  export type ExecutionTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransaction
     */
    select?: ExecutionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a ExecutionTransaction.
     */
    data: XOR<ExecutionTransactionUpdateInput, ExecutionTransactionUncheckedUpdateInput>
    /**
     * Choose, which ExecutionTransaction to update.
     */
    where: ExecutionTransactionWhereUniqueInput
  }

  /**
   * ExecutionTransaction updateMany
   */
  export type ExecutionTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExecutionTransactions.
     */
    data: XOR<ExecutionTransactionUpdateManyMutationInput, ExecutionTransactionUncheckedUpdateManyInput>
    /**
     * Filter which ExecutionTransactions to update
     */
    where?: ExecutionTransactionWhereInput
  }

  /**
   * ExecutionTransaction upsert
   */
  export type ExecutionTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransaction
     */
    select?: ExecutionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the ExecutionTransaction to update in case it exists.
     */
    where: ExecutionTransactionWhereUniqueInput
    /**
     * In case the ExecutionTransaction found by the `where` argument doesn't exist, create a new ExecutionTransaction with this data.
     */
    create: XOR<ExecutionTransactionCreateInput, ExecutionTransactionUncheckedCreateInput>
    /**
     * In case the ExecutionTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExecutionTransactionUpdateInput, ExecutionTransactionUncheckedUpdateInput>
  }

  /**
   * ExecutionTransaction delete
   */
  export type ExecutionTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransaction
     */
    select?: ExecutionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionInclude<ExtArgs> | null
    /**
     * Filter which ExecutionTransaction to delete.
     */
    where: ExecutionTransactionWhereUniqueInput
  }

  /**
   * ExecutionTransaction deleteMany
   */
  export type ExecutionTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExecutionTransactions to delete
     */
    where?: ExecutionTransactionWhereInput
  }

  /**
   * ExecutionTransaction.events
   */
  export type ExecutionTransaction$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransactionEvent
     */
    select?: ExecutionTransactionEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionEventInclude<ExtArgs> | null
    where?: ExecutionTransactionEventWhereInput
    orderBy?: ExecutionTransactionEventOrderByWithRelationInput | ExecutionTransactionEventOrderByWithRelationInput[]
    cursor?: ExecutionTransactionEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExecutionTransactionEventScalarFieldEnum | ExecutionTransactionEventScalarFieldEnum[]
  }

  /**
   * ExecutionTransaction without action
   */
  export type ExecutionTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransaction
     */
    select?: ExecutionTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionInclude<ExtArgs> | null
  }


  /**
   * Model ExecutionTransactionEvent
   */

  export type AggregateExecutionTransactionEvent = {
    _count: ExecutionTransactionEventCountAggregateOutputType | null
    _min: ExecutionTransactionEventMinAggregateOutputType | null
    _max: ExecutionTransactionEventMaxAggregateOutputType | null
  }

  export type ExecutionTransactionEventMinAggregateOutputType = {
    id: string | null
    transactionId: string | null
    fromState: $Enums.ExecutionTransactionState | null
    toState: $Enums.ExecutionTransactionState | null
    reason: string | null
    occurredAt: Date | null
  }

  export type ExecutionTransactionEventMaxAggregateOutputType = {
    id: string | null
    transactionId: string | null
    fromState: $Enums.ExecutionTransactionState | null
    toState: $Enums.ExecutionTransactionState | null
    reason: string | null
    occurredAt: Date | null
  }

  export type ExecutionTransactionEventCountAggregateOutputType = {
    id: number
    transactionId: number
    fromState: number
    toState: number
    reason: number
    detail: number
    occurredAt: number
    _all: number
  }


  export type ExecutionTransactionEventMinAggregateInputType = {
    id?: true
    transactionId?: true
    fromState?: true
    toState?: true
    reason?: true
    occurredAt?: true
  }

  export type ExecutionTransactionEventMaxAggregateInputType = {
    id?: true
    transactionId?: true
    fromState?: true
    toState?: true
    reason?: true
    occurredAt?: true
  }

  export type ExecutionTransactionEventCountAggregateInputType = {
    id?: true
    transactionId?: true
    fromState?: true
    toState?: true
    reason?: true
    detail?: true
    occurredAt?: true
    _all?: true
  }

  export type ExecutionTransactionEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExecutionTransactionEvent to aggregate.
     */
    where?: ExecutionTransactionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExecutionTransactionEvents to fetch.
     */
    orderBy?: ExecutionTransactionEventOrderByWithRelationInput | ExecutionTransactionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExecutionTransactionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExecutionTransactionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExecutionTransactionEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExecutionTransactionEvents
    **/
    _count?: true | ExecutionTransactionEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExecutionTransactionEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExecutionTransactionEventMaxAggregateInputType
  }

  export type GetExecutionTransactionEventAggregateType<T extends ExecutionTransactionEventAggregateArgs> = {
        [P in keyof T & keyof AggregateExecutionTransactionEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExecutionTransactionEvent[P]>
      : GetScalarType<T[P], AggregateExecutionTransactionEvent[P]>
  }




  export type ExecutionTransactionEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExecutionTransactionEventWhereInput
    orderBy?: ExecutionTransactionEventOrderByWithAggregationInput | ExecutionTransactionEventOrderByWithAggregationInput[]
    by: ExecutionTransactionEventScalarFieldEnum[] | ExecutionTransactionEventScalarFieldEnum
    having?: ExecutionTransactionEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExecutionTransactionEventCountAggregateInputType | true
    _min?: ExecutionTransactionEventMinAggregateInputType
    _max?: ExecutionTransactionEventMaxAggregateInputType
  }

  export type ExecutionTransactionEventGroupByOutputType = {
    id: string
    transactionId: string
    fromState: $Enums.ExecutionTransactionState | null
    toState: $Enums.ExecutionTransactionState
    reason: string | null
    detail: JsonValue | null
    occurredAt: Date
    _count: ExecutionTransactionEventCountAggregateOutputType | null
    _min: ExecutionTransactionEventMinAggregateOutputType | null
    _max: ExecutionTransactionEventMaxAggregateOutputType | null
  }

  type GetExecutionTransactionEventGroupByPayload<T extends ExecutionTransactionEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExecutionTransactionEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExecutionTransactionEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExecutionTransactionEventGroupByOutputType[P]>
            : GetScalarType<T[P], ExecutionTransactionEventGroupByOutputType[P]>
        }
      >
    >


  export type ExecutionTransactionEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionId?: boolean
    fromState?: boolean
    toState?: boolean
    reason?: boolean
    detail?: boolean
    occurredAt?: boolean
    transaction?: boolean | ExecutionTransactionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["executionTransactionEvent"]>

  export type ExecutionTransactionEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transactionId?: boolean
    fromState?: boolean
    toState?: boolean
    reason?: boolean
    detail?: boolean
    occurredAt?: boolean
    transaction?: boolean | ExecutionTransactionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["executionTransactionEvent"]>

  export type ExecutionTransactionEventSelectScalar = {
    id?: boolean
    transactionId?: boolean
    fromState?: boolean
    toState?: boolean
    reason?: boolean
    detail?: boolean
    occurredAt?: boolean
  }

  export type ExecutionTransactionEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | ExecutionTransactionDefaultArgs<ExtArgs>
  }
  export type ExecutionTransactionEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | ExecutionTransactionDefaultArgs<ExtArgs>
  }

  export type $ExecutionTransactionEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExecutionTransactionEvent"
    objects: {
      transaction: Prisma.$ExecutionTransactionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      transactionId: string
      fromState: $Enums.ExecutionTransactionState | null
      toState: $Enums.ExecutionTransactionState
      reason: string | null
      detail: Prisma.JsonValue | null
      occurredAt: Date
    }, ExtArgs["result"]["executionTransactionEvent"]>
    composites: {}
  }

  type ExecutionTransactionEventGetPayload<S extends boolean | null | undefined | ExecutionTransactionEventDefaultArgs> = $Result.GetResult<Prisma.$ExecutionTransactionEventPayload, S>

  type ExecutionTransactionEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExecutionTransactionEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExecutionTransactionEventCountAggregateInputType | true
    }

  export interface ExecutionTransactionEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExecutionTransactionEvent'], meta: { name: 'ExecutionTransactionEvent' } }
    /**
     * Find zero or one ExecutionTransactionEvent that matches the filter.
     * @param {ExecutionTransactionEventFindUniqueArgs} args - Arguments to find a ExecutionTransactionEvent
     * @example
     * // Get one ExecutionTransactionEvent
     * const executionTransactionEvent = await prisma.executionTransactionEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExecutionTransactionEventFindUniqueArgs>(args: SelectSubset<T, ExecutionTransactionEventFindUniqueArgs<ExtArgs>>): Prisma__ExecutionTransactionEventClient<$Result.GetResult<Prisma.$ExecutionTransactionEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ExecutionTransactionEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExecutionTransactionEventFindUniqueOrThrowArgs} args - Arguments to find a ExecutionTransactionEvent
     * @example
     * // Get one ExecutionTransactionEvent
     * const executionTransactionEvent = await prisma.executionTransactionEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExecutionTransactionEventFindUniqueOrThrowArgs>(args: SelectSubset<T, ExecutionTransactionEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExecutionTransactionEventClient<$Result.GetResult<Prisma.$ExecutionTransactionEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ExecutionTransactionEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionTransactionEventFindFirstArgs} args - Arguments to find a ExecutionTransactionEvent
     * @example
     * // Get one ExecutionTransactionEvent
     * const executionTransactionEvent = await prisma.executionTransactionEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExecutionTransactionEventFindFirstArgs>(args?: SelectSubset<T, ExecutionTransactionEventFindFirstArgs<ExtArgs>>): Prisma__ExecutionTransactionEventClient<$Result.GetResult<Prisma.$ExecutionTransactionEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ExecutionTransactionEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionTransactionEventFindFirstOrThrowArgs} args - Arguments to find a ExecutionTransactionEvent
     * @example
     * // Get one ExecutionTransactionEvent
     * const executionTransactionEvent = await prisma.executionTransactionEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExecutionTransactionEventFindFirstOrThrowArgs>(args?: SelectSubset<T, ExecutionTransactionEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExecutionTransactionEventClient<$Result.GetResult<Prisma.$ExecutionTransactionEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ExecutionTransactionEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionTransactionEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExecutionTransactionEvents
     * const executionTransactionEvents = await prisma.executionTransactionEvent.findMany()
     * 
     * // Get first 10 ExecutionTransactionEvents
     * const executionTransactionEvents = await prisma.executionTransactionEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const executionTransactionEventWithIdOnly = await prisma.executionTransactionEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExecutionTransactionEventFindManyArgs>(args?: SelectSubset<T, ExecutionTransactionEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExecutionTransactionEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ExecutionTransactionEvent.
     * @param {ExecutionTransactionEventCreateArgs} args - Arguments to create a ExecutionTransactionEvent.
     * @example
     * // Create one ExecutionTransactionEvent
     * const ExecutionTransactionEvent = await prisma.executionTransactionEvent.create({
     *   data: {
     *     // ... data to create a ExecutionTransactionEvent
     *   }
     * })
     * 
     */
    create<T extends ExecutionTransactionEventCreateArgs>(args: SelectSubset<T, ExecutionTransactionEventCreateArgs<ExtArgs>>): Prisma__ExecutionTransactionEventClient<$Result.GetResult<Prisma.$ExecutionTransactionEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ExecutionTransactionEvents.
     * @param {ExecutionTransactionEventCreateManyArgs} args - Arguments to create many ExecutionTransactionEvents.
     * @example
     * // Create many ExecutionTransactionEvents
     * const executionTransactionEvent = await prisma.executionTransactionEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExecutionTransactionEventCreateManyArgs>(args?: SelectSubset<T, ExecutionTransactionEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExecutionTransactionEvents and returns the data saved in the database.
     * @param {ExecutionTransactionEventCreateManyAndReturnArgs} args - Arguments to create many ExecutionTransactionEvents.
     * @example
     * // Create many ExecutionTransactionEvents
     * const executionTransactionEvent = await prisma.executionTransactionEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExecutionTransactionEvents and only return the `id`
     * const executionTransactionEventWithIdOnly = await prisma.executionTransactionEvent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExecutionTransactionEventCreateManyAndReturnArgs>(args?: SelectSubset<T, ExecutionTransactionEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExecutionTransactionEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ExecutionTransactionEvent.
     * @param {ExecutionTransactionEventDeleteArgs} args - Arguments to delete one ExecutionTransactionEvent.
     * @example
     * // Delete one ExecutionTransactionEvent
     * const ExecutionTransactionEvent = await prisma.executionTransactionEvent.delete({
     *   where: {
     *     // ... filter to delete one ExecutionTransactionEvent
     *   }
     * })
     * 
     */
    delete<T extends ExecutionTransactionEventDeleteArgs>(args: SelectSubset<T, ExecutionTransactionEventDeleteArgs<ExtArgs>>): Prisma__ExecutionTransactionEventClient<$Result.GetResult<Prisma.$ExecutionTransactionEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ExecutionTransactionEvent.
     * @param {ExecutionTransactionEventUpdateArgs} args - Arguments to update one ExecutionTransactionEvent.
     * @example
     * // Update one ExecutionTransactionEvent
     * const executionTransactionEvent = await prisma.executionTransactionEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExecutionTransactionEventUpdateArgs>(args: SelectSubset<T, ExecutionTransactionEventUpdateArgs<ExtArgs>>): Prisma__ExecutionTransactionEventClient<$Result.GetResult<Prisma.$ExecutionTransactionEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ExecutionTransactionEvents.
     * @param {ExecutionTransactionEventDeleteManyArgs} args - Arguments to filter ExecutionTransactionEvents to delete.
     * @example
     * // Delete a few ExecutionTransactionEvents
     * const { count } = await prisma.executionTransactionEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExecutionTransactionEventDeleteManyArgs>(args?: SelectSubset<T, ExecutionTransactionEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExecutionTransactionEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionTransactionEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExecutionTransactionEvents
     * const executionTransactionEvent = await prisma.executionTransactionEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExecutionTransactionEventUpdateManyArgs>(args: SelectSubset<T, ExecutionTransactionEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ExecutionTransactionEvent.
     * @param {ExecutionTransactionEventUpsertArgs} args - Arguments to update or create a ExecutionTransactionEvent.
     * @example
     * // Update or create a ExecutionTransactionEvent
     * const executionTransactionEvent = await prisma.executionTransactionEvent.upsert({
     *   create: {
     *     // ... data to create a ExecutionTransactionEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExecutionTransactionEvent we want to update
     *   }
     * })
     */
    upsert<T extends ExecutionTransactionEventUpsertArgs>(args: SelectSubset<T, ExecutionTransactionEventUpsertArgs<ExtArgs>>): Prisma__ExecutionTransactionEventClient<$Result.GetResult<Prisma.$ExecutionTransactionEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ExecutionTransactionEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionTransactionEventCountArgs} args - Arguments to filter ExecutionTransactionEvents to count.
     * @example
     * // Count the number of ExecutionTransactionEvents
     * const count = await prisma.executionTransactionEvent.count({
     *   where: {
     *     // ... the filter for the ExecutionTransactionEvents we want to count
     *   }
     * })
    **/
    count<T extends ExecutionTransactionEventCountArgs>(
      args?: Subset<T, ExecutionTransactionEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExecutionTransactionEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExecutionTransactionEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionTransactionEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExecutionTransactionEventAggregateArgs>(args: Subset<T, ExecutionTransactionEventAggregateArgs>): Prisma.PrismaPromise<GetExecutionTransactionEventAggregateType<T>>

    /**
     * Group by ExecutionTransactionEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionTransactionEventGroupByArgs} args - Group by arguments.
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
      T extends ExecutionTransactionEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExecutionTransactionEventGroupByArgs['orderBy'] }
        : { orderBy?: ExecutionTransactionEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ExecutionTransactionEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExecutionTransactionEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExecutionTransactionEvent model
   */
  readonly fields: ExecutionTransactionEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExecutionTransactionEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExecutionTransactionEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transaction<T extends ExecutionTransactionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExecutionTransactionDefaultArgs<ExtArgs>>): Prisma__ExecutionTransactionClient<$Result.GetResult<Prisma.$ExecutionTransactionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ExecutionTransactionEvent model
   */ 
  interface ExecutionTransactionEventFieldRefs {
    readonly id: FieldRef<"ExecutionTransactionEvent", 'String'>
    readonly transactionId: FieldRef<"ExecutionTransactionEvent", 'String'>
    readonly fromState: FieldRef<"ExecutionTransactionEvent", 'ExecutionTransactionState'>
    readonly toState: FieldRef<"ExecutionTransactionEvent", 'ExecutionTransactionState'>
    readonly reason: FieldRef<"ExecutionTransactionEvent", 'String'>
    readonly detail: FieldRef<"ExecutionTransactionEvent", 'Json'>
    readonly occurredAt: FieldRef<"ExecutionTransactionEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExecutionTransactionEvent findUnique
   */
  export type ExecutionTransactionEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransactionEvent
     */
    select?: ExecutionTransactionEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionEventInclude<ExtArgs> | null
    /**
     * Filter, which ExecutionTransactionEvent to fetch.
     */
    where: ExecutionTransactionEventWhereUniqueInput
  }

  /**
   * ExecutionTransactionEvent findUniqueOrThrow
   */
  export type ExecutionTransactionEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransactionEvent
     */
    select?: ExecutionTransactionEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionEventInclude<ExtArgs> | null
    /**
     * Filter, which ExecutionTransactionEvent to fetch.
     */
    where: ExecutionTransactionEventWhereUniqueInput
  }

  /**
   * ExecutionTransactionEvent findFirst
   */
  export type ExecutionTransactionEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransactionEvent
     */
    select?: ExecutionTransactionEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionEventInclude<ExtArgs> | null
    /**
     * Filter, which ExecutionTransactionEvent to fetch.
     */
    where?: ExecutionTransactionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExecutionTransactionEvents to fetch.
     */
    orderBy?: ExecutionTransactionEventOrderByWithRelationInput | ExecutionTransactionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExecutionTransactionEvents.
     */
    cursor?: ExecutionTransactionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExecutionTransactionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExecutionTransactionEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExecutionTransactionEvents.
     */
    distinct?: ExecutionTransactionEventScalarFieldEnum | ExecutionTransactionEventScalarFieldEnum[]
  }

  /**
   * ExecutionTransactionEvent findFirstOrThrow
   */
  export type ExecutionTransactionEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransactionEvent
     */
    select?: ExecutionTransactionEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionEventInclude<ExtArgs> | null
    /**
     * Filter, which ExecutionTransactionEvent to fetch.
     */
    where?: ExecutionTransactionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExecutionTransactionEvents to fetch.
     */
    orderBy?: ExecutionTransactionEventOrderByWithRelationInput | ExecutionTransactionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExecutionTransactionEvents.
     */
    cursor?: ExecutionTransactionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExecutionTransactionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExecutionTransactionEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExecutionTransactionEvents.
     */
    distinct?: ExecutionTransactionEventScalarFieldEnum | ExecutionTransactionEventScalarFieldEnum[]
  }

  /**
   * ExecutionTransactionEvent findMany
   */
  export type ExecutionTransactionEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransactionEvent
     */
    select?: ExecutionTransactionEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionEventInclude<ExtArgs> | null
    /**
     * Filter, which ExecutionTransactionEvents to fetch.
     */
    where?: ExecutionTransactionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExecutionTransactionEvents to fetch.
     */
    orderBy?: ExecutionTransactionEventOrderByWithRelationInput | ExecutionTransactionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExecutionTransactionEvents.
     */
    cursor?: ExecutionTransactionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExecutionTransactionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExecutionTransactionEvents.
     */
    skip?: number
    distinct?: ExecutionTransactionEventScalarFieldEnum | ExecutionTransactionEventScalarFieldEnum[]
  }

  /**
   * ExecutionTransactionEvent create
   */
  export type ExecutionTransactionEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransactionEvent
     */
    select?: ExecutionTransactionEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionEventInclude<ExtArgs> | null
    /**
     * The data needed to create a ExecutionTransactionEvent.
     */
    data: XOR<ExecutionTransactionEventCreateInput, ExecutionTransactionEventUncheckedCreateInput>
  }

  /**
   * ExecutionTransactionEvent createMany
   */
  export type ExecutionTransactionEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExecutionTransactionEvents.
     */
    data: ExecutionTransactionEventCreateManyInput | ExecutionTransactionEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExecutionTransactionEvent createManyAndReturn
   */
  export type ExecutionTransactionEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransactionEvent
     */
    select?: ExecutionTransactionEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ExecutionTransactionEvents.
     */
    data: ExecutionTransactionEventCreateManyInput | ExecutionTransactionEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExecutionTransactionEvent update
   */
  export type ExecutionTransactionEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransactionEvent
     */
    select?: ExecutionTransactionEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionEventInclude<ExtArgs> | null
    /**
     * The data needed to update a ExecutionTransactionEvent.
     */
    data: XOR<ExecutionTransactionEventUpdateInput, ExecutionTransactionEventUncheckedUpdateInput>
    /**
     * Choose, which ExecutionTransactionEvent to update.
     */
    where: ExecutionTransactionEventWhereUniqueInput
  }

  /**
   * ExecutionTransactionEvent updateMany
   */
  export type ExecutionTransactionEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExecutionTransactionEvents.
     */
    data: XOR<ExecutionTransactionEventUpdateManyMutationInput, ExecutionTransactionEventUncheckedUpdateManyInput>
    /**
     * Filter which ExecutionTransactionEvents to update
     */
    where?: ExecutionTransactionEventWhereInput
  }

  /**
   * ExecutionTransactionEvent upsert
   */
  export type ExecutionTransactionEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransactionEvent
     */
    select?: ExecutionTransactionEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionEventInclude<ExtArgs> | null
    /**
     * The filter to search for the ExecutionTransactionEvent to update in case it exists.
     */
    where: ExecutionTransactionEventWhereUniqueInput
    /**
     * In case the ExecutionTransactionEvent found by the `where` argument doesn't exist, create a new ExecutionTransactionEvent with this data.
     */
    create: XOR<ExecutionTransactionEventCreateInput, ExecutionTransactionEventUncheckedCreateInput>
    /**
     * In case the ExecutionTransactionEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExecutionTransactionEventUpdateInput, ExecutionTransactionEventUncheckedUpdateInput>
  }

  /**
   * ExecutionTransactionEvent delete
   */
  export type ExecutionTransactionEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransactionEvent
     */
    select?: ExecutionTransactionEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionEventInclude<ExtArgs> | null
    /**
     * Filter which ExecutionTransactionEvent to delete.
     */
    where: ExecutionTransactionEventWhereUniqueInput
  }

  /**
   * ExecutionTransactionEvent deleteMany
   */
  export type ExecutionTransactionEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExecutionTransactionEvents to delete
     */
    where?: ExecutionTransactionEventWhereInput
  }

  /**
   * ExecutionTransactionEvent without action
   */
  export type ExecutionTransactionEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionTransactionEvent
     */
    select?: ExecutionTransactionEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExecutionTransactionEventInclude<ExtArgs> | null
  }


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
   * Model ExecutionConsumerCursor
   */

  export type AggregateExecutionConsumerCursor = {
    _count: ExecutionConsumerCursorCountAggregateOutputType | null
    _min: ExecutionConsumerCursorMinAggregateOutputType | null
    _max: ExecutionConsumerCursorMaxAggregateOutputType | null
  }

  export type ExecutionConsumerCursorMinAggregateOutputType = {
    consumerName: string | null
    lastEventId: string | null
    lastSeenAt: Date | null
  }

  export type ExecutionConsumerCursorMaxAggregateOutputType = {
    consumerName: string | null
    lastEventId: string | null
    lastSeenAt: Date | null
  }

  export type ExecutionConsumerCursorCountAggregateOutputType = {
    consumerName: number
    lastEventId: number
    lastSeenAt: number
    _all: number
  }


  export type ExecutionConsumerCursorMinAggregateInputType = {
    consumerName?: true
    lastEventId?: true
    lastSeenAt?: true
  }

  export type ExecutionConsumerCursorMaxAggregateInputType = {
    consumerName?: true
    lastEventId?: true
    lastSeenAt?: true
  }

  export type ExecutionConsumerCursorCountAggregateInputType = {
    consumerName?: true
    lastEventId?: true
    lastSeenAt?: true
    _all?: true
  }

  export type ExecutionConsumerCursorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExecutionConsumerCursor to aggregate.
     */
    where?: ExecutionConsumerCursorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExecutionConsumerCursors to fetch.
     */
    orderBy?: ExecutionConsumerCursorOrderByWithRelationInput | ExecutionConsumerCursorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExecutionConsumerCursorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExecutionConsumerCursors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExecutionConsumerCursors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExecutionConsumerCursors
    **/
    _count?: true | ExecutionConsumerCursorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExecutionConsumerCursorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExecutionConsumerCursorMaxAggregateInputType
  }

  export type GetExecutionConsumerCursorAggregateType<T extends ExecutionConsumerCursorAggregateArgs> = {
        [P in keyof T & keyof AggregateExecutionConsumerCursor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExecutionConsumerCursor[P]>
      : GetScalarType<T[P], AggregateExecutionConsumerCursor[P]>
  }




  export type ExecutionConsumerCursorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExecutionConsumerCursorWhereInput
    orderBy?: ExecutionConsumerCursorOrderByWithAggregationInput | ExecutionConsumerCursorOrderByWithAggregationInput[]
    by: ExecutionConsumerCursorScalarFieldEnum[] | ExecutionConsumerCursorScalarFieldEnum
    having?: ExecutionConsumerCursorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExecutionConsumerCursorCountAggregateInputType | true
    _min?: ExecutionConsumerCursorMinAggregateInputType
    _max?: ExecutionConsumerCursorMaxAggregateInputType
  }

  export type ExecutionConsumerCursorGroupByOutputType = {
    consumerName: string
    lastEventId: string | null
    lastSeenAt: Date
    _count: ExecutionConsumerCursorCountAggregateOutputType | null
    _min: ExecutionConsumerCursorMinAggregateOutputType | null
    _max: ExecutionConsumerCursorMaxAggregateOutputType | null
  }

  type GetExecutionConsumerCursorGroupByPayload<T extends ExecutionConsumerCursorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExecutionConsumerCursorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExecutionConsumerCursorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExecutionConsumerCursorGroupByOutputType[P]>
            : GetScalarType<T[P], ExecutionConsumerCursorGroupByOutputType[P]>
        }
      >
    >


  export type ExecutionConsumerCursorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    consumerName?: boolean
    lastEventId?: boolean
    lastSeenAt?: boolean
  }, ExtArgs["result"]["executionConsumerCursor"]>

  export type ExecutionConsumerCursorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    consumerName?: boolean
    lastEventId?: boolean
    lastSeenAt?: boolean
  }, ExtArgs["result"]["executionConsumerCursor"]>

  export type ExecutionConsumerCursorSelectScalar = {
    consumerName?: boolean
    lastEventId?: boolean
    lastSeenAt?: boolean
  }


  export type $ExecutionConsumerCursorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExecutionConsumerCursor"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      consumerName: string
      lastEventId: string | null
      lastSeenAt: Date
    }, ExtArgs["result"]["executionConsumerCursor"]>
    composites: {}
  }

  type ExecutionConsumerCursorGetPayload<S extends boolean | null | undefined | ExecutionConsumerCursorDefaultArgs> = $Result.GetResult<Prisma.$ExecutionConsumerCursorPayload, S>

  type ExecutionConsumerCursorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExecutionConsumerCursorFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExecutionConsumerCursorCountAggregateInputType | true
    }

  export interface ExecutionConsumerCursorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExecutionConsumerCursor'], meta: { name: 'ExecutionConsumerCursor' } }
    /**
     * Find zero or one ExecutionConsumerCursor that matches the filter.
     * @param {ExecutionConsumerCursorFindUniqueArgs} args - Arguments to find a ExecutionConsumerCursor
     * @example
     * // Get one ExecutionConsumerCursor
     * const executionConsumerCursor = await prisma.executionConsumerCursor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExecutionConsumerCursorFindUniqueArgs>(args: SelectSubset<T, ExecutionConsumerCursorFindUniqueArgs<ExtArgs>>): Prisma__ExecutionConsumerCursorClient<$Result.GetResult<Prisma.$ExecutionConsumerCursorPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ExecutionConsumerCursor that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExecutionConsumerCursorFindUniqueOrThrowArgs} args - Arguments to find a ExecutionConsumerCursor
     * @example
     * // Get one ExecutionConsumerCursor
     * const executionConsumerCursor = await prisma.executionConsumerCursor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExecutionConsumerCursorFindUniqueOrThrowArgs>(args: SelectSubset<T, ExecutionConsumerCursorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExecutionConsumerCursorClient<$Result.GetResult<Prisma.$ExecutionConsumerCursorPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ExecutionConsumerCursor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionConsumerCursorFindFirstArgs} args - Arguments to find a ExecutionConsumerCursor
     * @example
     * // Get one ExecutionConsumerCursor
     * const executionConsumerCursor = await prisma.executionConsumerCursor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExecutionConsumerCursorFindFirstArgs>(args?: SelectSubset<T, ExecutionConsumerCursorFindFirstArgs<ExtArgs>>): Prisma__ExecutionConsumerCursorClient<$Result.GetResult<Prisma.$ExecutionConsumerCursorPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ExecutionConsumerCursor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionConsumerCursorFindFirstOrThrowArgs} args - Arguments to find a ExecutionConsumerCursor
     * @example
     * // Get one ExecutionConsumerCursor
     * const executionConsumerCursor = await prisma.executionConsumerCursor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExecutionConsumerCursorFindFirstOrThrowArgs>(args?: SelectSubset<T, ExecutionConsumerCursorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExecutionConsumerCursorClient<$Result.GetResult<Prisma.$ExecutionConsumerCursorPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ExecutionConsumerCursors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionConsumerCursorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExecutionConsumerCursors
     * const executionConsumerCursors = await prisma.executionConsumerCursor.findMany()
     * 
     * // Get first 10 ExecutionConsumerCursors
     * const executionConsumerCursors = await prisma.executionConsumerCursor.findMany({ take: 10 })
     * 
     * // Only select the `consumerName`
     * const executionConsumerCursorWithConsumerNameOnly = await prisma.executionConsumerCursor.findMany({ select: { consumerName: true } })
     * 
     */
    findMany<T extends ExecutionConsumerCursorFindManyArgs>(args?: SelectSubset<T, ExecutionConsumerCursorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExecutionConsumerCursorPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ExecutionConsumerCursor.
     * @param {ExecutionConsumerCursorCreateArgs} args - Arguments to create a ExecutionConsumerCursor.
     * @example
     * // Create one ExecutionConsumerCursor
     * const ExecutionConsumerCursor = await prisma.executionConsumerCursor.create({
     *   data: {
     *     // ... data to create a ExecutionConsumerCursor
     *   }
     * })
     * 
     */
    create<T extends ExecutionConsumerCursorCreateArgs>(args: SelectSubset<T, ExecutionConsumerCursorCreateArgs<ExtArgs>>): Prisma__ExecutionConsumerCursorClient<$Result.GetResult<Prisma.$ExecutionConsumerCursorPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ExecutionConsumerCursors.
     * @param {ExecutionConsumerCursorCreateManyArgs} args - Arguments to create many ExecutionConsumerCursors.
     * @example
     * // Create many ExecutionConsumerCursors
     * const executionConsumerCursor = await prisma.executionConsumerCursor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExecutionConsumerCursorCreateManyArgs>(args?: SelectSubset<T, ExecutionConsumerCursorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExecutionConsumerCursors and returns the data saved in the database.
     * @param {ExecutionConsumerCursorCreateManyAndReturnArgs} args - Arguments to create many ExecutionConsumerCursors.
     * @example
     * // Create many ExecutionConsumerCursors
     * const executionConsumerCursor = await prisma.executionConsumerCursor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExecutionConsumerCursors and only return the `consumerName`
     * const executionConsumerCursorWithConsumerNameOnly = await prisma.executionConsumerCursor.createManyAndReturn({ 
     *   select: { consumerName: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExecutionConsumerCursorCreateManyAndReturnArgs>(args?: SelectSubset<T, ExecutionConsumerCursorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExecutionConsumerCursorPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ExecutionConsumerCursor.
     * @param {ExecutionConsumerCursorDeleteArgs} args - Arguments to delete one ExecutionConsumerCursor.
     * @example
     * // Delete one ExecutionConsumerCursor
     * const ExecutionConsumerCursor = await prisma.executionConsumerCursor.delete({
     *   where: {
     *     // ... filter to delete one ExecutionConsumerCursor
     *   }
     * })
     * 
     */
    delete<T extends ExecutionConsumerCursorDeleteArgs>(args: SelectSubset<T, ExecutionConsumerCursorDeleteArgs<ExtArgs>>): Prisma__ExecutionConsumerCursorClient<$Result.GetResult<Prisma.$ExecutionConsumerCursorPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ExecutionConsumerCursor.
     * @param {ExecutionConsumerCursorUpdateArgs} args - Arguments to update one ExecutionConsumerCursor.
     * @example
     * // Update one ExecutionConsumerCursor
     * const executionConsumerCursor = await prisma.executionConsumerCursor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExecutionConsumerCursorUpdateArgs>(args: SelectSubset<T, ExecutionConsumerCursorUpdateArgs<ExtArgs>>): Prisma__ExecutionConsumerCursorClient<$Result.GetResult<Prisma.$ExecutionConsumerCursorPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ExecutionConsumerCursors.
     * @param {ExecutionConsumerCursorDeleteManyArgs} args - Arguments to filter ExecutionConsumerCursors to delete.
     * @example
     * // Delete a few ExecutionConsumerCursors
     * const { count } = await prisma.executionConsumerCursor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExecutionConsumerCursorDeleteManyArgs>(args?: SelectSubset<T, ExecutionConsumerCursorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExecutionConsumerCursors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionConsumerCursorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExecutionConsumerCursors
     * const executionConsumerCursor = await prisma.executionConsumerCursor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExecutionConsumerCursorUpdateManyArgs>(args: SelectSubset<T, ExecutionConsumerCursorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ExecutionConsumerCursor.
     * @param {ExecutionConsumerCursorUpsertArgs} args - Arguments to update or create a ExecutionConsumerCursor.
     * @example
     * // Update or create a ExecutionConsumerCursor
     * const executionConsumerCursor = await prisma.executionConsumerCursor.upsert({
     *   create: {
     *     // ... data to create a ExecutionConsumerCursor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExecutionConsumerCursor we want to update
     *   }
     * })
     */
    upsert<T extends ExecutionConsumerCursorUpsertArgs>(args: SelectSubset<T, ExecutionConsumerCursorUpsertArgs<ExtArgs>>): Prisma__ExecutionConsumerCursorClient<$Result.GetResult<Prisma.$ExecutionConsumerCursorPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ExecutionConsumerCursors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionConsumerCursorCountArgs} args - Arguments to filter ExecutionConsumerCursors to count.
     * @example
     * // Count the number of ExecutionConsumerCursors
     * const count = await prisma.executionConsumerCursor.count({
     *   where: {
     *     // ... the filter for the ExecutionConsumerCursors we want to count
     *   }
     * })
    **/
    count<T extends ExecutionConsumerCursorCountArgs>(
      args?: Subset<T, ExecutionConsumerCursorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExecutionConsumerCursorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExecutionConsumerCursor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionConsumerCursorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExecutionConsumerCursorAggregateArgs>(args: Subset<T, ExecutionConsumerCursorAggregateArgs>): Prisma.PrismaPromise<GetExecutionConsumerCursorAggregateType<T>>

    /**
     * Group by ExecutionConsumerCursor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExecutionConsumerCursorGroupByArgs} args - Group by arguments.
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
      T extends ExecutionConsumerCursorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExecutionConsumerCursorGroupByArgs['orderBy'] }
        : { orderBy?: ExecutionConsumerCursorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ExecutionConsumerCursorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExecutionConsumerCursorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExecutionConsumerCursor model
   */
  readonly fields: ExecutionConsumerCursorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExecutionConsumerCursor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExecutionConsumerCursorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ExecutionConsumerCursor model
   */ 
  interface ExecutionConsumerCursorFieldRefs {
    readonly consumerName: FieldRef<"ExecutionConsumerCursor", 'String'>
    readonly lastEventId: FieldRef<"ExecutionConsumerCursor", 'String'>
    readonly lastSeenAt: FieldRef<"ExecutionConsumerCursor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExecutionConsumerCursor findUnique
   */
  export type ExecutionConsumerCursorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionConsumerCursor
     */
    select?: ExecutionConsumerCursorSelect<ExtArgs> | null
    /**
     * Filter, which ExecutionConsumerCursor to fetch.
     */
    where: ExecutionConsumerCursorWhereUniqueInput
  }

  /**
   * ExecutionConsumerCursor findUniqueOrThrow
   */
  export type ExecutionConsumerCursorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionConsumerCursor
     */
    select?: ExecutionConsumerCursorSelect<ExtArgs> | null
    /**
     * Filter, which ExecutionConsumerCursor to fetch.
     */
    where: ExecutionConsumerCursorWhereUniqueInput
  }

  /**
   * ExecutionConsumerCursor findFirst
   */
  export type ExecutionConsumerCursorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionConsumerCursor
     */
    select?: ExecutionConsumerCursorSelect<ExtArgs> | null
    /**
     * Filter, which ExecutionConsumerCursor to fetch.
     */
    where?: ExecutionConsumerCursorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExecutionConsumerCursors to fetch.
     */
    orderBy?: ExecutionConsumerCursorOrderByWithRelationInput | ExecutionConsumerCursorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExecutionConsumerCursors.
     */
    cursor?: ExecutionConsumerCursorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExecutionConsumerCursors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExecutionConsumerCursors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExecutionConsumerCursors.
     */
    distinct?: ExecutionConsumerCursorScalarFieldEnum | ExecutionConsumerCursorScalarFieldEnum[]
  }

  /**
   * ExecutionConsumerCursor findFirstOrThrow
   */
  export type ExecutionConsumerCursorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionConsumerCursor
     */
    select?: ExecutionConsumerCursorSelect<ExtArgs> | null
    /**
     * Filter, which ExecutionConsumerCursor to fetch.
     */
    where?: ExecutionConsumerCursorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExecutionConsumerCursors to fetch.
     */
    orderBy?: ExecutionConsumerCursorOrderByWithRelationInput | ExecutionConsumerCursorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExecutionConsumerCursors.
     */
    cursor?: ExecutionConsumerCursorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExecutionConsumerCursors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExecutionConsumerCursors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExecutionConsumerCursors.
     */
    distinct?: ExecutionConsumerCursorScalarFieldEnum | ExecutionConsumerCursorScalarFieldEnum[]
  }

  /**
   * ExecutionConsumerCursor findMany
   */
  export type ExecutionConsumerCursorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionConsumerCursor
     */
    select?: ExecutionConsumerCursorSelect<ExtArgs> | null
    /**
     * Filter, which ExecutionConsumerCursors to fetch.
     */
    where?: ExecutionConsumerCursorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExecutionConsumerCursors to fetch.
     */
    orderBy?: ExecutionConsumerCursorOrderByWithRelationInput | ExecutionConsumerCursorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExecutionConsumerCursors.
     */
    cursor?: ExecutionConsumerCursorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExecutionConsumerCursors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExecutionConsumerCursors.
     */
    skip?: number
    distinct?: ExecutionConsumerCursorScalarFieldEnum | ExecutionConsumerCursorScalarFieldEnum[]
  }

  /**
   * ExecutionConsumerCursor create
   */
  export type ExecutionConsumerCursorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionConsumerCursor
     */
    select?: ExecutionConsumerCursorSelect<ExtArgs> | null
    /**
     * The data needed to create a ExecutionConsumerCursor.
     */
    data: XOR<ExecutionConsumerCursorCreateInput, ExecutionConsumerCursorUncheckedCreateInput>
  }

  /**
   * ExecutionConsumerCursor createMany
   */
  export type ExecutionConsumerCursorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExecutionConsumerCursors.
     */
    data: ExecutionConsumerCursorCreateManyInput | ExecutionConsumerCursorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExecutionConsumerCursor createManyAndReturn
   */
  export type ExecutionConsumerCursorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionConsumerCursor
     */
    select?: ExecutionConsumerCursorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ExecutionConsumerCursors.
     */
    data: ExecutionConsumerCursorCreateManyInput | ExecutionConsumerCursorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExecutionConsumerCursor update
   */
  export type ExecutionConsumerCursorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionConsumerCursor
     */
    select?: ExecutionConsumerCursorSelect<ExtArgs> | null
    /**
     * The data needed to update a ExecutionConsumerCursor.
     */
    data: XOR<ExecutionConsumerCursorUpdateInput, ExecutionConsumerCursorUncheckedUpdateInput>
    /**
     * Choose, which ExecutionConsumerCursor to update.
     */
    where: ExecutionConsumerCursorWhereUniqueInput
  }

  /**
   * ExecutionConsumerCursor updateMany
   */
  export type ExecutionConsumerCursorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExecutionConsumerCursors.
     */
    data: XOR<ExecutionConsumerCursorUpdateManyMutationInput, ExecutionConsumerCursorUncheckedUpdateManyInput>
    /**
     * Filter which ExecutionConsumerCursors to update
     */
    where?: ExecutionConsumerCursorWhereInput
  }

  /**
   * ExecutionConsumerCursor upsert
   */
  export type ExecutionConsumerCursorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionConsumerCursor
     */
    select?: ExecutionConsumerCursorSelect<ExtArgs> | null
    /**
     * The filter to search for the ExecutionConsumerCursor to update in case it exists.
     */
    where: ExecutionConsumerCursorWhereUniqueInput
    /**
     * In case the ExecutionConsumerCursor found by the `where` argument doesn't exist, create a new ExecutionConsumerCursor with this data.
     */
    create: XOR<ExecutionConsumerCursorCreateInput, ExecutionConsumerCursorUncheckedCreateInput>
    /**
     * In case the ExecutionConsumerCursor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExecutionConsumerCursorUpdateInput, ExecutionConsumerCursorUncheckedUpdateInput>
  }

  /**
   * ExecutionConsumerCursor delete
   */
  export type ExecutionConsumerCursorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionConsumerCursor
     */
    select?: ExecutionConsumerCursorSelect<ExtArgs> | null
    /**
     * Filter which ExecutionConsumerCursor to delete.
     */
    where: ExecutionConsumerCursorWhereUniqueInput
  }

  /**
   * ExecutionConsumerCursor deleteMany
   */
  export type ExecutionConsumerCursorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExecutionConsumerCursors to delete
     */
    where?: ExecutionConsumerCursorWhereInput
  }

  /**
   * ExecutionConsumerCursor without action
   */
  export type ExecutionConsumerCursorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExecutionConsumerCursor
     */
    select?: ExecutionConsumerCursorSelect<ExtArgs> | null
  }


  /**
   * Model EscrowDeal
   */

  export type AggregateEscrowDeal = {
    _count: EscrowDealCountAggregateOutputType | null
    _avg: EscrowDealAvgAggregateOutputType | null
    _sum: EscrowDealSumAggregateOutputType | null
    _min: EscrowDealMinAggregateOutputType | null
    _max: EscrowDealMaxAggregateOutputType | null
  }

  export type EscrowDealAvgAggregateOutputType = {
    amountMinor: number | null
    deadline: number | null
  }

  export type EscrowDealSumAggregateOutputType = {
    amountMinor: bigint | null
    deadline: bigint | null
  }

  export type EscrowDealMinAggregateOutputType = {
    id: string | null
    dealId: string | null
    transactionId: string | null
    status: $Enums.EscrowDealStatus | null
    payer: string | null
    payee: string | null
    token: string | null
    amountMinor: bigint | null
    deadline: bigint | null
    escrowContract: string | null
    fundTxHash: string | null
    resolveTxHash: string | null
    resolution: $Enums.EscrowResolution | null
    fundedAt: Date | null
    resolvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EscrowDealMaxAggregateOutputType = {
    id: string | null
    dealId: string | null
    transactionId: string | null
    status: $Enums.EscrowDealStatus | null
    payer: string | null
    payee: string | null
    token: string | null
    amountMinor: bigint | null
    deadline: bigint | null
    escrowContract: string | null
    fundTxHash: string | null
    resolveTxHash: string | null
    resolution: $Enums.EscrowResolution | null
    fundedAt: Date | null
    resolvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EscrowDealCountAggregateOutputType = {
    id: number
    dealId: number
    transactionId: number
    status: number
    payer: number
    payee: number
    token: number
    amountMinor: number
    deadline: number
    escrowContract: number
    fundTxHash: number
    resolveTxHash: number
    resolution: number
    condition: number
    fundedAt: number
    resolvedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EscrowDealAvgAggregateInputType = {
    amountMinor?: true
    deadline?: true
  }

  export type EscrowDealSumAggregateInputType = {
    amountMinor?: true
    deadline?: true
  }

  export type EscrowDealMinAggregateInputType = {
    id?: true
    dealId?: true
    transactionId?: true
    status?: true
    payer?: true
    payee?: true
    token?: true
    amountMinor?: true
    deadline?: true
    escrowContract?: true
    fundTxHash?: true
    resolveTxHash?: true
    resolution?: true
    fundedAt?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EscrowDealMaxAggregateInputType = {
    id?: true
    dealId?: true
    transactionId?: true
    status?: true
    payer?: true
    payee?: true
    token?: true
    amountMinor?: true
    deadline?: true
    escrowContract?: true
    fundTxHash?: true
    resolveTxHash?: true
    resolution?: true
    fundedAt?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EscrowDealCountAggregateInputType = {
    id?: true
    dealId?: true
    transactionId?: true
    status?: true
    payer?: true
    payee?: true
    token?: true
    amountMinor?: true
    deadline?: true
    escrowContract?: true
    fundTxHash?: true
    resolveTxHash?: true
    resolution?: true
    condition?: true
    fundedAt?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EscrowDealAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EscrowDeal to aggregate.
     */
    where?: EscrowDealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EscrowDeals to fetch.
     */
    orderBy?: EscrowDealOrderByWithRelationInput | EscrowDealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EscrowDealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EscrowDeals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EscrowDeals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EscrowDeals
    **/
    _count?: true | EscrowDealCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EscrowDealAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EscrowDealSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EscrowDealMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EscrowDealMaxAggregateInputType
  }

  export type GetEscrowDealAggregateType<T extends EscrowDealAggregateArgs> = {
        [P in keyof T & keyof AggregateEscrowDeal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEscrowDeal[P]>
      : GetScalarType<T[P], AggregateEscrowDeal[P]>
  }




  export type EscrowDealGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EscrowDealWhereInput
    orderBy?: EscrowDealOrderByWithAggregationInput | EscrowDealOrderByWithAggregationInput[]
    by: EscrowDealScalarFieldEnum[] | EscrowDealScalarFieldEnum
    having?: EscrowDealScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EscrowDealCountAggregateInputType | true
    _avg?: EscrowDealAvgAggregateInputType
    _sum?: EscrowDealSumAggregateInputType
    _min?: EscrowDealMinAggregateInputType
    _max?: EscrowDealMaxAggregateInputType
  }

  export type EscrowDealGroupByOutputType = {
    id: string
    dealId: string
    transactionId: string | null
    status: $Enums.EscrowDealStatus
    payer: string
    payee: string
    token: string
    amountMinor: bigint
    deadline: bigint
    escrowContract: string
    fundTxHash: string | null
    resolveTxHash: string | null
    resolution: $Enums.EscrowResolution | null
    condition: JsonValue | null
    fundedAt: Date | null
    resolvedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: EscrowDealCountAggregateOutputType | null
    _avg: EscrowDealAvgAggregateOutputType | null
    _sum: EscrowDealSumAggregateOutputType | null
    _min: EscrowDealMinAggregateOutputType | null
    _max: EscrowDealMaxAggregateOutputType | null
  }

  type GetEscrowDealGroupByPayload<T extends EscrowDealGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EscrowDealGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EscrowDealGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EscrowDealGroupByOutputType[P]>
            : GetScalarType<T[P], EscrowDealGroupByOutputType[P]>
        }
      >
    >


  export type EscrowDealSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dealId?: boolean
    transactionId?: boolean
    status?: boolean
    payer?: boolean
    payee?: boolean
    token?: boolean
    amountMinor?: boolean
    deadline?: boolean
    escrowContract?: boolean
    fundTxHash?: boolean
    resolveTxHash?: boolean
    resolution?: boolean
    condition?: boolean
    fundedAt?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    events?: boolean | EscrowDeal$eventsArgs<ExtArgs>
    _count?: boolean | EscrowDealCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["escrowDeal"]>

  export type EscrowDealSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dealId?: boolean
    transactionId?: boolean
    status?: boolean
    payer?: boolean
    payee?: boolean
    token?: boolean
    amountMinor?: boolean
    deadline?: boolean
    escrowContract?: boolean
    fundTxHash?: boolean
    resolveTxHash?: boolean
    resolution?: boolean
    condition?: boolean
    fundedAt?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["escrowDeal"]>

  export type EscrowDealSelectScalar = {
    id?: boolean
    dealId?: boolean
    transactionId?: boolean
    status?: boolean
    payer?: boolean
    payee?: boolean
    token?: boolean
    amountMinor?: boolean
    deadline?: boolean
    escrowContract?: boolean
    fundTxHash?: boolean
    resolveTxHash?: boolean
    resolution?: boolean
    condition?: boolean
    fundedAt?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EscrowDealInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    events?: boolean | EscrowDeal$eventsArgs<ExtArgs>
    _count?: boolean | EscrowDealCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EscrowDealIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EscrowDealPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EscrowDeal"
    objects: {
      events: Prisma.$EscrowDealEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dealId: string
      transactionId: string | null
      status: $Enums.EscrowDealStatus
      payer: string
      payee: string
      token: string
      amountMinor: bigint
      deadline: bigint
      escrowContract: string
      fundTxHash: string | null
      resolveTxHash: string | null
      resolution: $Enums.EscrowResolution | null
      condition: Prisma.JsonValue | null
      fundedAt: Date | null
      resolvedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["escrowDeal"]>
    composites: {}
  }

  type EscrowDealGetPayload<S extends boolean | null | undefined | EscrowDealDefaultArgs> = $Result.GetResult<Prisma.$EscrowDealPayload, S>

  type EscrowDealCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EscrowDealFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EscrowDealCountAggregateInputType | true
    }

  export interface EscrowDealDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EscrowDeal'], meta: { name: 'EscrowDeal' } }
    /**
     * Find zero or one EscrowDeal that matches the filter.
     * @param {EscrowDealFindUniqueArgs} args - Arguments to find a EscrowDeal
     * @example
     * // Get one EscrowDeal
     * const escrowDeal = await prisma.escrowDeal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EscrowDealFindUniqueArgs>(args: SelectSubset<T, EscrowDealFindUniqueArgs<ExtArgs>>): Prisma__EscrowDealClient<$Result.GetResult<Prisma.$EscrowDealPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one EscrowDeal that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EscrowDealFindUniqueOrThrowArgs} args - Arguments to find a EscrowDeal
     * @example
     * // Get one EscrowDeal
     * const escrowDeal = await prisma.escrowDeal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EscrowDealFindUniqueOrThrowArgs>(args: SelectSubset<T, EscrowDealFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EscrowDealClient<$Result.GetResult<Prisma.$EscrowDealPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first EscrowDeal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EscrowDealFindFirstArgs} args - Arguments to find a EscrowDeal
     * @example
     * // Get one EscrowDeal
     * const escrowDeal = await prisma.escrowDeal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EscrowDealFindFirstArgs>(args?: SelectSubset<T, EscrowDealFindFirstArgs<ExtArgs>>): Prisma__EscrowDealClient<$Result.GetResult<Prisma.$EscrowDealPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first EscrowDeal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EscrowDealFindFirstOrThrowArgs} args - Arguments to find a EscrowDeal
     * @example
     * // Get one EscrowDeal
     * const escrowDeal = await prisma.escrowDeal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EscrowDealFindFirstOrThrowArgs>(args?: SelectSubset<T, EscrowDealFindFirstOrThrowArgs<ExtArgs>>): Prisma__EscrowDealClient<$Result.GetResult<Prisma.$EscrowDealPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more EscrowDeals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EscrowDealFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EscrowDeals
     * const escrowDeals = await prisma.escrowDeal.findMany()
     * 
     * // Get first 10 EscrowDeals
     * const escrowDeals = await prisma.escrowDeal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const escrowDealWithIdOnly = await prisma.escrowDeal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EscrowDealFindManyArgs>(args?: SelectSubset<T, EscrowDealFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EscrowDealPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a EscrowDeal.
     * @param {EscrowDealCreateArgs} args - Arguments to create a EscrowDeal.
     * @example
     * // Create one EscrowDeal
     * const EscrowDeal = await prisma.escrowDeal.create({
     *   data: {
     *     // ... data to create a EscrowDeal
     *   }
     * })
     * 
     */
    create<T extends EscrowDealCreateArgs>(args: SelectSubset<T, EscrowDealCreateArgs<ExtArgs>>): Prisma__EscrowDealClient<$Result.GetResult<Prisma.$EscrowDealPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many EscrowDeals.
     * @param {EscrowDealCreateManyArgs} args - Arguments to create many EscrowDeals.
     * @example
     * // Create many EscrowDeals
     * const escrowDeal = await prisma.escrowDeal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EscrowDealCreateManyArgs>(args?: SelectSubset<T, EscrowDealCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EscrowDeals and returns the data saved in the database.
     * @param {EscrowDealCreateManyAndReturnArgs} args - Arguments to create many EscrowDeals.
     * @example
     * // Create many EscrowDeals
     * const escrowDeal = await prisma.escrowDeal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EscrowDeals and only return the `id`
     * const escrowDealWithIdOnly = await prisma.escrowDeal.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EscrowDealCreateManyAndReturnArgs>(args?: SelectSubset<T, EscrowDealCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EscrowDealPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a EscrowDeal.
     * @param {EscrowDealDeleteArgs} args - Arguments to delete one EscrowDeal.
     * @example
     * // Delete one EscrowDeal
     * const EscrowDeal = await prisma.escrowDeal.delete({
     *   where: {
     *     // ... filter to delete one EscrowDeal
     *   }
     * })
     * 
     */
    delete<T extends EscrowDealDeleteArgs>(args: SelectSubset<T, EscrowDealDeleteArgs<ExtArgs>>): Prisma__EscrowDealClient<$Result.GetResult<Prisma.$EscrowDealPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one EscrowDeal.
     * @param {EscrowDealUpdateArgs} args - Arguments to update one EscrowDeal.
     * @example
     * // Update one EscrowDeal
     * const escrowDeal = await prisma.escrowDeal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EscrowDealUpdateArgs>(args: SelectSubset<T, EscrowDealUpdateArgs<ExtArgs>>): Prisma__EscrowDealClient<$Result.GetResult<Prisma.$EscrowDealPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more EscrowDeals.
     * @param {EscrowDealDeleteManyArgs} args - Arguments to filter EscrowDeals to delete.
     * @example
     * // Delete a few EscrowDeals
     * const { count } = await prisma.escrowDeal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EscrowDealDeleteManyArgs>(args?: SelectSubset<T, EscrowDealDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EscrowDeals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EscrowDealUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EscrowDeals
     * const escrowDeal = await prisma.escrowDeal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EscrowDealUpdateManyArgs>(args: SelectSubset<T, EscrowDealUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EscrowDeal.
     * @param {EscrowDealUpsertArgs} args - Arguments to update or create a EscrowDeal.
     * @example
     * // Update or create a EscrowDeal
     * const escrowDeal = await prisma.escrowDeal.upsert({
     *   create: {
     *     // ... data to create a EscrowDeal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EscrowDeal we want to update
     *   }
     * })
     */
    upsert<T extends EscrowDealUpsertArgs>(args: SelectSubset<T, EscrowDealUpsertArgs<ExtArgs>>): Prisma__EscrowDealClient<$Result.GetResult<Prisma.$EscrowDealPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of EscrowDeals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EscrowDealCountArgs} args - Arguments to filter EscrowDeals to count.
     * @example
     * // Count the number of EscrowDeals
     * const count = await prisma.escrowDeal.count({
     *   where: {
     *     // ... the filter for the EscrowDeals we want to count
     *   }
     * })
    **/
    count<T extends EscrowDealCountArgs>(
      args?: Subset<T, EscrowDealCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EscrowDealCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EscrowDeal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EscrowDealAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EscrowDealAggregateArgs>(args: Subset<T, EscrowDealAggregateArgs>): Prisma.PrismaPromise<GetEscrowDealAggregateType<T>>

    /**
     * Group by EscrowDeal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EscrowDealGroupByArgs} args - Group by arguments.
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
      T extends EscrowDealGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EscrowDealGroupByArgs['orderBy'] }
        : { orderBy?: EscrowDealGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EscrowDealGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEscrowDealGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EscrowDeal model
   */
  readonly fields: EscrowDealFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EscrowDeal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EscrowDealClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    events<T extends EscrowDeal$eventsArgs<ExtArgs> = {}>(args?: Subset<T, EscrowDeal$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EscrowDealEventPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the EscrowDeal model
   */ 
  interface EscrowDealFieldRefs {
    readonly id: FieldRef<"EscrowDeal", 'String'>
    readonly dealId: FieldRef<"EscrowDeal", 'String'>
    readonly transactionId: FieldRef<"EscrowDeal", 'String'>
    readonly status: FieldRef<"EscrowDeal", 'EscrowDealStatus'>
    readonly payer: FieldRef<"EscrowDeal", 'String'>
    readonly payee: FieldRef<"EscrowDeal", 'String'>
    readonly token: FieldRef<"EscrowDeal", 'String'>
    readonly amountMinor: FieldRef<"EscrowDeal", 'BigInt'>
    readonly deadline: FieldRef<"EscrowDeal", 'BigInt'>
    readonly escrowContract: FieldRef<"EscrowDeal", 'String'>
    readonly fundTxHash: FieldRef<"EscrowDeal", 'String'>
    readonly resolveTxHash: FieldRef<"EscrowDeal", 'String'>
    readonly resolution: FieldRef<"EscrowDeal", 'EscrowResolution'>
    readonly condition: FieldRef<"EscrowDeal", 'Json'>
    readonly fundedAt: FieldRef<"EscrowDeal", 'DateTime'>
    readonly resolvedAt: FieldRef<"EscrowDeal", 'DateTime'>
    readonly createdAt: FieldRef<"EscrowDeal", 'DateTime'>
    readonly updatedAt: FieldRef<"EscrowDeal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EscrowDeal findUnique
   */
  export type EscrowDealFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDeal
     */
    select?: EscrowDealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealInclude<ExtArgs> | null
    /**
     * Filter, which EscrowDeal to fetch.
     */
    where: EscrowDealWhereUniqueInput
  }

  /**
   * EscrowDeal findUniqueOrThrow
   */
  export type EscrowDealFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDeal
     */
    select?: EscrowDealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealInclude<ExtArgs> | null
    /**
     * Filter, which EscrowDeal to fetch.
     */
    where: EscrowDealWhereUniqueInput
  }

  /**
   * EscrowDeal findFirst
   */
  export type EscrowDealFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDeal
     */
    select?: EscrowDealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealInclude<ExtArgs> | null
    /**
     * Filter, which EscrowDeal to fetch.
     */
    where?: EscrowDealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EscrowDeals to fetch.
     */
    orderBy?: EscrowDealOrderByWithRelationInput | EscrowDealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EscrowDeals.
     */
    cursor?: EscrowDealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EscrowDeals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EscrowDeals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EscrowDeals.
     */
    distinct?: EscrowDealScalarFieldEnum | EscrowDealScalarFieldEnum[]
  }

  /**
   * EscrowDeal findFirstOrThrow
   */
  export type EscrowDealFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDeal
     */
    select?: EscrowDealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealInclude<ExtArgs> | null
    /**
     * Filter, which EscrowDeal to fetch.
     */
    where?: EscrowDealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EscrowDeals to fetch.
     */
    orderBy?: EscrowDealOrderByWithRelationInput | EscrowDealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EscrowDeals.
     */
    cursor?: EscrowDealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EscrowDeals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EscrowDeals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EscrowDeals.
     */
    distinct?: EscrowDealScalarFieldEnum | EscrowDealScalarFieldEnum[]
  }

  /**
   * EscrowDeal findMany
   */
  export type EscrowDealFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDeal
     */
    select?: EscrowDealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealInclude<ExtArgs> | null
    /**
     * Filter, which EscrowDeals to fetch.
     */
    where?: EscrowDealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EscrowDeals to fetch.
     */
    orderBy?: EscrowDealOrderByWithRelationInput | EscrowDealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EscrowDeals.
     */
    cursor?: EscrowDealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EscrowDeals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EscrowDeals.
     */
    skip?: number
    distinct?: EscrowDealScalarFieldEnum | EscrowDealScalarFieldEnum[]
  }

  /**
   * EscrowDeal create
   */
  export type EscrowDealCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDeal
     */
    select?: EscrowDealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealInclude<ExtArgs> | null
    /**
     * The data needed to create a EscrowDeal.
     */
    data: XOR<EscrowDealCreateInput, EscrowDealUncheckedCreateInput>
  }

  /**
   * EscrowDeal createMany
   */
  export type EscrowDealCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EscrowDeals.
     */
    data: EscrowDealCreateManyInput | EscrowDealCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EscrowDeal createManyAndReturn
   */
  export type EscrowDealCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDeal
     */
    select?: EscrowDealSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many EscrowDeals.
     */
    data: EscrowDealCreateManyInput | EscrowDealCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EscrowDeal update
   */
  export type EscrowDealUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDeal
     */
    select?: EscrowDealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealInclude<ExtArgs> | null
    /**
     * The data needed to update a EscrowDeal.
     */
    data: XOR<EscrowDealUpdateInput, EscrowDealUncheckedUpdateInput>
    /**
     * Choose, which EscrowDeal to update.
     */
    where: EscrowDealWhereUniqueInput
  }

  /**
   * EscrowDeal updateMany
   */
  export type EscrowDealUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EscrowDeals.
     */
    data: XOR<EscrowDealUpdateManyMutationInput, EscrowDealUncheckedUpdateManyInput>
    /**
     * Filter which EscrowDeals to update
     */
    where?: EscrowDealWhereInput
  }

  /**
   * EscrowDeal upsert
   */
  export type EscrowDealUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDeal
     */
    select?: EscrowDealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealInclude<ExtArgs> | null
    /**
     * The filter to search for the EscrowDeal to update in case it exists.
     */
    where: EscrowDealWhereUniqueInput
    /**
     * In case the EscrowDeal found by the `where` argument doesn't exist, create a new EscrowDeal with this data.
     */
    create: XOR<EscrowDealCreateInput, EscrowDealUncheckedCreateInput>
    /**
     * In case the EscrowDeal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EscrowDealUpdateInput, EscrowDealUncheckedUpdateInput>
  }

  /**
   * EscrowDeal delete
   */
  export type EscrowDealDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDeal
     */
    select?: EscrowDealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealInclude<ExtArgs> | null
    /**
     * Filter which EscrowDeal to delete.
     */
    where: EscrowDealWhereUniqueInput
  }

  /**
   * EscrowDeal deleteMany
   */
  export type EscrowDealDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EscrowDeals to delete
     */
    where?: EscrowDealWhereInput
  }

  /**
   * EscrowDeal.events
   */
  export type EscrowDeal$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDealEvent
     */
    select?: EscrowDealEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealEventInclude<ExtArgs> | null
    where?: EscrowDealEventWhereInput
    orderBy?: EscrowDealEventOrderByWithRelationInput | EscrowDealEventOrderByWithRelationInput[]
    cursor?: EscrowDealEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EscrowDealEventScalarFieldEnum | EscrowDealEventScalarFieldEnum[]
  }

  /**
   * EscrowDeal without action
   */
  export type EscrowDealDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDeal
     */
    select?: EscrowDealSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealInclude<ExtArgs> | null
  }


  /**
   * Model EscrowDealEvent
   */

  export type AggregateEscrowDealEvent = {
    _count: EscrowDealEventCountAggregateOutputType | null
    _min: EscrowDealEventMinAggregateOutputType | null
    _max: EscrowDealEventMaxAggregateOutputType | null
  }

  export type EscrowDealEventMinAggregateOutputType = {
    id: string | null
    dealRowId: string | null
    type: string | null
    txHash: string | null
    occurredAt: Date | null
  }

  export type EscrowDealEventMaxAggregateOutputType = {
    id: string | null
    dealRowId: string | null
    type: string | null
    txHash: string | null
    occurredAt: Date | null
  }

  export type EscrowDealEventCountAggregateOutputType = {
    id: number
    dealRowId: number
    type: number
    detail: number
    txHash: number
    occurredAt: number
    _all: number
  }


  export type EscrowDealEventMinAggregateInputType = {
    id?: true
    dealRowId?: true
    type?: true
    txHash?: true
    occurredAt?: true
  }

  export type EscrowDealEventMaxAggregateInputType = {
    id?: true
    dealRowId?: true
    type?: true
    txHash?: true
    occurredAt?: true
  }

  export type EscrowDealEventCountAggregateInputType = {
    id?: true
    dealRowId?: true
    type?: true
    detail?: true
    txHash?: true
    occurredAt?: true
    _all?: true
  }

  export type EscrowDealEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EscrowDealEvent to aggregate.
     */
    where?: EscrowDealEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EscrowDealEvents to fetch.
     */
    orderBy?: EscrowDealEventOrderByWithRelationInput | EscrowDealEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EscrowDealEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EscrowDealEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EscrowDealEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EscrowDealEvents
    **/
    _count?: true | EscrowDealEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EscrowDealEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EscrowDealEventMaxAggregateInputType
  }

  export type GetEscrowDealEventAggregateType<T extends EscrowDealEventAggregateArgs> = {
        [P in keyof T & keyof AggregateEscrowDealEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEscrowDealEvent[P]>
      : GetScalarType<T[P], AggregateEscrowDealEvent[P]>
  }




  export type EscrowDealEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EscrowDealEventWhereInput
    orderBy?: EscrowDealEventOrderByWithAggregationInput | EscrowDealEventOrderByWithAggregationInput[]
    by: EscrowDealEventScalarFieldEnum[] | EscrowDealEventScalarFieldEnum
    having?: EscrowDealEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EscrowDealEventCountAggregateInputType | true
    _min?: EscrowDealEventMinAggregateInputType
    _max?: EscrowDealEventMaxAggregateInputType
  }

  export type EscrowDealEventGroupByOutputType = {
    id: string
    dealRowId: string
    type: string
    detail: JsonValue | null
    txHash: string | null
    occurredAt: Date
    _count: EscrowDealEventCountAggregateOutputType | null
    _min: EscrowDealEventMinAggregateOutputType | null
    _max: EscrowDealEventMaxAggregateOutputType | null
  }

  type GetEscrowDealEventGroupByPayload<T extends EscrowDealEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EscrowDealEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EscrowDealEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EscrowDealEventGroupByOutputType[P]>
            : GetScalarType<T[P], EscrowDealEventGroupByOutputType[P]>
        }
      >
    >


  export type EscrowDealEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dealRowId?: boolean
    type?: boolean
    detail?: boolean
    txHash?: boolean
    occurredAt?: boolean
    deal?: boolean | EscrowDealDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["escrowDealEvent"]>

  export type EscrowDealEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dealRowId?: boolean
    type?: boolean
    detail?: boolean
    txHash?: boolean
    occurredAt?: boolean
    deal?: boolean | EscrowDealDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["escrowDealEvent"]>

  export type EscrowDealEventSelectScalar = {
    id?: boolean
    dealRowId?: boolean
    type?: boolean
    detail?: boolean
    txHash?: boolean
    occurredAt?: boolean
  }

  export type EscrowDealEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deal?: boolean | EscrowDealDefaultArgs<ExtArgs>
  }
  export type EscrowDealEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deal?: boolean | EscrowDealDefaultArgs<ExtArgs>
  }

  export type $EscrowDealEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EscrowDealEvent"
    objects: {
      deal: Prisma.$EscrowDealPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dealRowId: string
      type: string
      detail: Prisma.JsonValue | null
      txHash: string | null
      occurredAt: Date
    }, ExtArgs["result"]["escrowDealEvent"]>
    composites: {}
  }

  type EscrowDealEventGetPayload<S extends boolean | null | undefined | EscrowDealEventDefaultArgs> = $Result.GetResult<Prisma.$EscrowDealEventPayload, S>

  type EscrowDealEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EscrowDealEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EscrowDealEventCountAggregateInputType | true
    }

  export interface EscrowDealEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EscrowDealEvent'], meta: { name: 'EscrowDealEvent' } }
    /**
     * Find zero or one EscrowDealEvent that matches the filter.
     * @param {EscrowDealEventFindUniqueArgs} args - Arguments to find a EscrowDealEvent
     * @example
     * // Get one EscrowDealEvent
     * const escrowDealEvent = await prisma.escrowDealEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EscrowDealEventFindUniqueArgs>(args: SelectSubset<T, EscrowDealEventFindUniqueArgs<ExtArgs>>): Prisma__EscrowDealEventClient<$Result.GetResult<Prisma.$EscrowDealEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one EscrowDealEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EscrowDealEventFindUniqueOrThrowArgs} args - Arguments to find a EscrowDealEvent
     * @example
     * // Get one EscrowDealEvent
     * const escrowDealEvent = await prisma.escrowDealEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EscrowDealEventFindUniqueOrThrowArgs>(args: SelectSubset<T, EscrowDealEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EscrowDealEventClient<$Result.GetResult<Prisma.$EscrowDealEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first EscrowDealEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EscrowDealEventFindFirstArgs} args - Arguments to find a EscrowDealEvent
     * @example
     * // Get one EscrowDealEvent
     * const escrowDealEvent = await prisma.escrowDealEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EscrowDealEventFindFirstArgs>(args?: SelectSubset<T, EscrowDealEventFindFirstArgs<ExtArgs>>): Prisma__EscrowDealEventClient<$Result.GetResult<Prisma.$EscrowDealEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first EscrowDealEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EscrowDealEventFindFirstOrThrowArgs} args - Arguments to find a EscrowDealEvent
     * @example
     * // Get one EscrowDealEvent
     * const escrowDealEvent = await prisma.escrowDealEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EscrowDealEventFindFirstOrThrowArgs>(args?: SelectSubset<T, EscrowDealEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EscrowDealEventClient<$Result.GetResult<Prisma.$EscrowDealEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more EscrowDealEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EscrowDealEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EscrowDealEvents
     * const escrowDealEvents = await prisma.escrowDealEvent.findMany()
     * 
     * // Get first 10 EscrowDealEvents
     * const escrowDealEvents = await prisma.escrowDealEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const escrowDealEventWithIdOnly = await prisma.escrowDealEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EscrowDealEventFindManyArgs>(args?: SelectSubset<T, EscrowDealEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EscrowDealEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a EscrowDealEvent.
     * @param {EscrowDealEventCreateArgs} args - Arguments to create a EscrowDealEvent.
     * @example
     * // Create one EscrowDealEvent
     * const EscrowDealEvent = await prisma.escrowDealEvent.create({
     *   data: {
     *     // ... data to create a EscrowDealEvent
     *   }
     * })
     * 
     */
    create<T extends EscrowDealEventCreateArgs>(args: SelectSubset<T, EscrowDealEventCreateArgs<ExtArgs>>): Prisma__EscrowDealEventClient<$Result.GetResult<Prisma.$EscrowDealEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many EscrowDealEvents.
     * @param {EscrowDealEventCreateManyArgs} args - Arguments to create many EscrowDealEvents.
     * @example
     * // Create many EscrowDealEvents
     * const escrowDealEvent = await prisma.escrowDealEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EscrowDealEventCreateManyArgs>(args?: SelectSubset<T, EscrowDealEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EscrowDealEvents and returns the data saved in the database.
     * @param {EscrowDealEventCreateManyAndReturnArgs} args - Arguments to create many EscrowDealEvents.
     * @example
     * // Create many EscrowDealEvents
     * const escrowDealEvent = await prisma.escrowDealEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EscrowDealEvents and only return the `id`
     * const escrowDealEventWithIdOnly = await prisma.escrowDealEvent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EscrowDealEventCreateManyAndReturnArgs>(args?: SelectSubset<T, EscrowDealEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EscrowDealEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a EscrowDealEvent.
     * @param {EscrowDealEventDeleteArgs} args - Arguments to delete one EscrowDealEvent.
     * @example
     * // Delete one EscrowDealEvent
     * const EscrowDealEvent = await prisma.escrowDealEvent.delete({
     *   where: {
     *     // ... filter to delete one EscrowDealEvent
     *   }
     * })
     * 
     */
    delete<T extends EscrowDealEventDeleteArgs>(args: SelectSubset<T, EscrowDealEventDeleteArgs<ExtArgs>>): Prisma__EscrowDealEventClient<$Result.GetResult<Prisma.$EscrowDealEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one EscrowDealEvent.
     * @param {EscrowDealEventUpdateArgs} args - Arguments to update one EscrowDealEvent.
     * @example
     * // Update one EscrowDealEvent
     * const escrowDealEvent = await prisma.escrowDealEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EscrowDealEventUpdateArgs>(args: SelectSubset<T, EscrowDealEventUpdateArgs<ExtArgs>>): Prisma__EscrowDealEventClient<$Result.GetResult<Prisma.$EscrowDealEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more EscrowDealEvents.
     * @param {EscrowDealEventDeleteManyArgs} args - Arguments to filter EscrowDealEvents to delete.
     * @example
     * // Delete a few EscrowDealEvents
     * const { count } = await prisma.escrowDealEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EscrowDealEventDeleteManyArgs>(args?: SelectSubset<T, EscrowDealEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EscrowDealEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EscrowDealEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EscrowDealEvents
     * const escrowDealEvent = await prisma.escrowDealEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EscrowDealEventUpdateManyArgs>(args: SelectSubset<T, EscrowDealEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EscrowDealEvent.
     * @param {EscrowDealEventUpsertArgs} args - Arguments to update or create a EscrowDealEvent.
     * @example
     * // Update or create a EscrowDealEvent
     * const escrowDealEvent = await prisma.escrowDealEvent.upsert({
     *   create: {
     *     // ... data to create a EscrowDealEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EscrowDealEvent we want to update
     *   }
     * })
     */
    upsert<T extends EscrowDealEventUpsertArgs>(args: SelectSubset<T, EscrowDealEventUpsertArgs<ExtArgs>>): Prisma__EscrowDealEventClient<$Result.GetResult<Prisma.$EscrowDealEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of EscrowDealEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EscrowDealEventCountArgs} args - Arguments to filter EscrowDealEvents to count.
     * @example
     * // Count the number of EscrowDealEvents
     * const count = await prisma.escrowDealEvent.count({
     *   where: {
     *     // ... the filter for the EscrowDealEvents we want to count
     *   }
     * })
    **/
    count<T extends EscrowDealEventCountArgs>(
      args?: Subset<T, EscrowDealEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EscrowDealEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EscrowDealEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EscrowDealEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EscrowDealEventAggregateArgs>(args: Subset<T, EscrowDealEventAggregateArgs>): Prisma.PrismaPromise<GetEscrowDealEventAggregateType<T>>

    /**
     * Group by EscrowDealEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EscrowDealEventGroupByArgs} args - Group by arguments.
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
      T extends EscrowDealEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EscrowDealEventGroupByArgs['orderBy'] }
        : { orderBy?: EscrowDealEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EscrowDealEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEscrowDealEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EscrowDealEvent model
   */
  readonly fields: EscrowDealEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EscrowDealEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EscrowDealEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    deal<T extends EscrowDealDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EscrowDealDefaultArgs<ExtArgs>>): Prisma__EscrowDealClient<$Result.GetResult<Prisma.$EscrowDealPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the EscrowDealEvent model
   */ 
  interface EscrowDealEventFieldRefs {
    readonly id: FieldRef<"EscrowDealEvent", 'String'>
    readonly dealRowId: FieldRef<"EscrowDealEvent", 'String'>
    readonly type: FieldRef<"EscrowDealEvent", 'String'>
    readonly detail: FieldRef<"EscrowDealEvent", 'Json'>
    readonly txHash: FieldRef<"EscrowDealEvent", 'String'>
    readonly occurredAt: FieldRef<"EscrowDealEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EscrowDealEvent findUnique
   */
  export type EscrowDealEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDealEvent
     */
    select?: EscrowDealEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealEventInclude<ExtArgs> | null
    /**
     * Filter, which EscrowDealEvent to fetch.
     */
    where: EscrowDealEventWhereUniqueInput
  }

  /**
   * EscrowDealEvent findUniqueOrThrow
   */
  export type EscrowDealEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDealEvent
     */
    select?: EscrowDealEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealEventInclude<ExtArgs> | null
    /**
     * Filter, which EscrowDealEvent to fetch.
     */
    where: EscrowDealEventWhereUniqueInput
  }

  /**
   * EscrowDealEvent findFirst
   */
  export type EscrowDealEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDealEvent
     */
    select?: EscrowDealEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealEventInclude<ExtArgs> | null
    /**
     * Filter, which EscrowDealEvent to fetch.
     */
    where?: EscrowDealEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EscrowDealEvents to fetch.
     */
    orderBy?: EscrowDealEventOrderByWithRelationInput | EscrowDealEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EscrowDealEvents.
     */
    cursor?: EscrowDealEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EscrowDealEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EscrowDealEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EscrowDealEvents.
     */
    distinct?: EscrowDealEventScalarFieldEnum | EscrowDealEventScalarFieldEnum[]
  }

  /**
   * EscrowDealEvent findFirstOrThrow
   */
  export type EscrowDealEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDealEvent
     */
    select?: EscrowDealEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealEventInclude<ExtArgs> | null
    /**
     * Filter, which EscrowDealEvent to fetch.
     */
    where?: EscrowDealEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EscrowDealEvents to fetch.
     */
    orderBy?: EscrowDealEventOrderByWithRelationInput | EscrowDealEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EscrowDealEvents.
     */
    cursor?: EscrowDealEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EscrowDealEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EscrowDealEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EscrowDealEvents.
     */
    distinct?: EscrowDealEventScalarFieldEnum | EscrowDealEventScalarFieldEnum[]
  }

  /**
   * EscrowDealEvent findMany
   */
  export type EscrowDealEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDealEvent
     */
    select?: EscrowDealEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealEventInclude<ExtArgs> | null
    /**
     * Filter, which EscrowDealEvents to fetch.
     */
    where?: EscrowDealEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EscrowDealEvents to fetch.
     */
    orderBy?: EscrowDealEventOrderByWithRelationInput | EscrowDealEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EscrowDealEvents.
     */
    cursor?: EscrowDealEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EscrowDealEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EscrowDealEvents.
     */
    skip?: number
    distinct?: EscrowDealEventScalarFieldEnum | EscrowDealEventScalarFieldEnum[]
  }

  /**
   * EscrowDealEvent create
   */
  export type EscrowDealEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDealEvent
     */
    select?: EscrowDealEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealEventInclude<ExtArgs> | null
    /**
     * The data needed to create a EscrowDealEvent.
     */
    data: XOR<EscrowDealEventCreateInput, EscrowDealEventUncheckedCreateInput>
  }

  /**
   * EscrowDealEvent createMany
   */
  export type EscrowDealEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EscrowDealEvents.
     */
    data: EscrowDealEventCreateManyInput | EscrowDealEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EscrowDealEvent createManyAndReturn
   */
  export type EscrowDealEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDealEvent
     */
    select?: EscrowDealEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many EscrowDealEvents.
     */
    data: EscrowDealEventCreateManyInput | EscrowDealEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EscrowDealEvent update
   */
  export type EscrowDealEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDealEvent
     */
    select?: EscrowDealEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealEventInclude<ExtArgs> | null
    /**
     * The data needed to update a EscrowDealEvent.
     */
    data: XOR<EscrowDealEventUpdateInput, EscrowDealEventUncheckedUpdateInput>
    /**
     * Choose, which EscrowDealEvent to update.
     */
    where: EscrowDealEventWhereUniqueInput
  }

  /**
   * EscrowDealEvent updateMany
   */
  export type EscrowDealEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EscrowDealEvents.
     */
    data: XOR<EscrowDealEventUpdateManyMutationInput, EscrowDealEventUncheckedUpdateManyInput>
    /**
     * Filter which EscrowDealEvents to update
     */
    where?: EscrowDealEventWhereInput
  }

  /**
   * EscrowDealEvent upsert
   */
  export type EscrowDealEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDealEvent
     */
    select?: EscrowDealEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealEventInclude<ExtArgs> | null
    /**
     * The filter to search for the EscrowDealEvent to update in case it exists.
     */
    where: EscrowDealEventWhereUniqueInput
    /**
     * In case the EscrowDealEvent found by the `where` argument doesn't exist, create a new EscrowDealEvent with this data.
     */
    create: XOR<EscrowDealEventCreateInput, EscrowDealEventUncheckedCreateInput>
    /**
     * In case the EscrowDealEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EscrowDealEventUpdateInput, EscrowDealEventUncheckedUpdateInput>
  }

  /**
   * EscrowDealEvent delete
   */
  export type EscrowDealEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDealEvent
     */
    select?: EscrowDealEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealEventInclude<ExtArgs> | null
    /**
     * Filter which EscrowDealEvent to delete.
     */
    where: EscrowDealEventWhereUniqueInput
  }

  /**
   * EscrowDealEvent deleteMany
   */
  export type EscrowDealEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EscrowDealEvents to delete
     */
    where?: EscrowDealEventWhereInput
  }

  /**
   * EscrowDealEvent without action
   */
  export type EscrowDealEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EscrowDealEvent
     */
    select?: EscrowDealEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EscrowDealEventInclude<ExtArgs> | null
  }


  /**
   * Model ReconciliationRun
   */

  export type AggregateReconciliationRun = {
    _count: ReconciliationRunCountAggregateOutputType | null
    _avg: ReconciliationRunAvgAggregateOutputType | null
    _sum: ReconciliationRunSumAggregateOutputType | null
    _min: ReconciliationRunMinAggregateOutputType | null
    _max: ReconciliationRunMaxAggregateOutputType | null
  }

  export type ReconciliationRunAvgAggregateOutputType = {
    checkedCount: number | null
    breakCount: number | null
  }

  export type ReconciliationRunSumAggregateOutputType = {
    checkedCount: number | null
    breakCount: number | null
  }

  export type ReconciliationRunMinAggregateOutputType = {
    id: string | null
    scope: string | null
    status: $Enums.ReconciliationStatus | null
    startedAt: Date | null
    finishedAt: Date | null
    checkedCount: number | null
    breakCount: number | null
  }

  export type ReconciliationRunMaxAggregateOutputType = {
    id: string | null
    scope: string | null
    status: $Enums.ReconciliationStatus | null
    startedAt: Date | null
    finishedAt: Date | null
    checkedCount: number | null
    breakCount: number | null
  }

  export type ReconciliationRunCountAggregateOutputType = {
    id: number
    scope: number
    status: number
    startedAt: number
    finishedAt: number
    checkedCount: number
    breakCount: number
    summary: number
    _all: number
  }


  export type ReconciliationRunAvgAggregateInputType = {
    checkedCount?: true
    breakCount?: true
  }

  export type ReconciliationRunSumAggregateInputType = {
    checkedCount?: true
    breakCount?: true
  }

  export type ReconciliationRunMinAggregateInputType = {
    id?: true
    scope?: true
    status?: true
    startedAt?: true
    finishedAt?: true
    checkedCount?: true
    breakCount?: true
  }

  export type ReconciliationRunMaxAggregateInputType = {
    id?: true
    scope?: true
    status?: true
    startedAt?: true
    finishedAt?: true
    checkedCount?: true
    breakCount?: true
  }

  export type ReconciliationRunCountAggregateInputType = {
    id?: true
    scope?: true
    status?: true
    startedAt?: true
    finishedAt?: true
    checkedCount?: true
    breakCount?: true
    summary?: true
    _all?: true
  }

  export type ReconciliationRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReconciliationRun to aggregate.
     */
    where?: ReconciliationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReconciliationRuns to fetch.
     */
    orderBy?: ReconciliationRunOrderByWithRelationInput | ReconciliationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReconciliationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReconciliationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReconciliationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReconciliationRuns
    **/
    _count?: true | ReconciliationRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReconciliationRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReconciliationRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReconciliationRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReconciliationRunMaxAggregateInputType
  }

  export type GetReconciliationRunAggregateType<T extends ReconciliationRunAggregateArgs> = {
        [P in keyof T & keyof AggregateReconciliationRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReconciliationRun[P]>
      : GetScalarType<T[P], AggregateReconciliationRun[P]>
  }




  export type ReconciliationRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReconciliationRunWhereInput
    orderBy?: ReconciliationRunOrderByWithAggregationInput | ReconciliationRunOrderByWithAggregationInput[]
    by: ReconciliationRunScalarFieldEnum[] | ReconciliationRunScalarFieldEnum
    having?: ReconciliationRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReconciliationRunCountAggregateInputType | true
    _avg?: ReconciliationRunAvgAggregateInputType
    _sum?: ReconciliationRunSumAggregateInputType
    _min?: ReconciliationRunMinAggregateInputType
    _max?: ReconciliationRunMaxAggregateInputType
  }

  export type ReconciliationRunGroupByOutputType = {
    id: string
    scope: string
    status: $Enums.ReconciliationStatus
    startedAt: Date
    finishedAt: Date | null
    checkedCount: number
    breakCount: number
    summary: JsonValue | null
    _count: ReconciliationRunCountAggregateOutputType | null
    _avg: ReconciliationRunAvgAggregateOutputType | null
    _sum: ReconciliationRunSumAggregateOutputType | null
    _min: ReconciliationRunMinAggregateOutputType | null
    _max: ReconciliationRunMaxAggregateOutputType | null
  }

  type GetReconciliationRunGroupByPayload<T extends ReconciliationRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReconciliationRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReconciliationRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReconciliationRunGroupByOutputType[P]>
            : GetScalarType<T[P], ReconciliationRunGroupByOutputType[P]>
        }
      >
    >


  export type ReconciliationRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    scope?: boolean
    status?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    checkedCount?: boolean
    breakCount?: boolean
    summary?: boolean
    breaks?: boolean | ReconciliationRun$breaksArgs<ExtArgs>
    _count?: boolean | ReconciliationRunCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reconciliationRun"]>

  export type ReconciliationRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    scope?: boolean
    status?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    checkedCount?: boolean
    breakCount?: boolean
    summary?: boolean
  }, ExtArgs["result"]["reconciliationRun"]>

  export type ReconciliationRunSelectScalar = {
    id?: boolean
    scope?: boolean
    status?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    checkedCount?: boolean
    breakCount?: boolean
    summary?: boolean
  }

  export type ReconciliationRunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    breaks?: boolean | ReconciliationRun$breaksArgs<ExtArgs>
    _count?: boolean | ReconciliationRunCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReconciliationRunIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ReconciliationRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReconciliationRun"
    objects: {
      breaks: Prisma.$ReconciliationBreakPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      scope: string
      status: $Enums.ReconciliationStatus
      startedAt: Date
      finishedAt: Date | null
      checkedCount: number
      breakCount: number
      summary: Prisma.JsonValue | null
    }, ExtArgs["result"]["reconciliationRun"]>
    composites: {}
  }

  type ReconciliationRunGetPayload<S extends boolean | null | undefined | ReconciliationRunDefaultArgs> = $Result.GetResult<Prisma.$ReconciliationRunPayload, S>

  type ReconciliationRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReconciliationRunFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReconciliationRunCountAggregateInputType | true
    }

  export interface ReconciliationRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReconciliationRun'], meta: { name: 'ReconciliationRun' } }
    /**
     * Find zero or one ReconciliationRun that matches the filter.
     * @param {ReconciliationRunFindUniqueArgs} args - Arguments to find a ReconciliationRun
     * @example
     * // Get one ReconciliationRun
     * const reconciliationRun = await prisma.reconciliationRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReconciliationRunFindUniqueArgs>(args: SelectSubset<T, ReconciliationRunFindUniqueArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ReconciliationRun that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReconciliationRunFindUniqueOrThrowArgs} args - Arguments to find a ReconciliationRun
     * @example
     * // Get one ReconciliationRun
     * const reconciliationRun = await prisma.reconciliationRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReconciliationRunFindUniqueOrThrowArgs>(args: SelectSubset<T, ReconciliationRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ReconciliationRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationRunFindFirstArgs} args - Arguments to find a ReconciliationRun
     * @example
     * // Get one ReconciliationRun
     * const reconciliationRun = await prisma.reconciliationRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReconciliationRunFindFirstArgs>(args?: SelectSubset<T, ReconciliationRunFindFirstArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ReconciliationRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationRunFindFirstOrThrowArgs} args - Arguments to find a ReconciliationRun
     * @example
     * // Get one ReconciliationRun
     * const reconciliationRun = await prisma.reconciliationRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReconciliationRunFindFirstOrThrowArgs>(args?: SelectSubset<T, ReconciliationRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ReconciliationRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReconciliationRuns
     * const reconciliationRuns = await prisma.reconciliationRun.findMany()
     * 
     * // Get first 10 ReconciliationRuns
     * const reconciliationRuns = await prisma.reconciliationRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reconciliationRunWithIdOnly = await prisma.reconciliationRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReconciliationRunFindManyArgs>(args?: SelectSubset<T, ReconciliationRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ReconciliationRun.
     * @param {ReconciliationRunCreateArgs} args - Arguments to create a ReconciliationRun.
     * @example
     * // Create one ReconciliationRun
     * const ReconciliationRun = await prisma.reconciliationRun.create({
     *   data: {
     *     // ... data to create a ReconciliationRun
     *   }
     * })
     * 
     */
    create<T extends ReconciliationRunCreateArgs>(args: SelectSubset<T, ReconciliationRunCreateArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ReconciliationRuns.
     * @param {ReconciliationRunCreateManyArgs} args - Arguments to create many ReconciliationRuns.
     * @example
     * // Create many ReconciliationRuns
     * const reconciliationRun = await prisma.reconciliationRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReconciliationRunCreateManyArgs>(args?: SelectSubset<T, ReconciliationRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReconciliationRuns and returns the data saved in the database.
     * @param {ReconciliationRunCreateManyAndReturnArgs} args - Arguments to create many ReconciliationRuns.
     * @example
     * // Create many ReconciliationRuns
     * const reconciliationRun = await prisma.reconciliationRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReconciliationRuns and only return the `id`
     * const reconciliationRunWithIdOnly = await prisma.reconciliationRun.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReconciliationRunCreateManyAndReturnArgs>(args?: SelectSubset<T, ReconciliationRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ReconciliationRun.
     * @param {ReconciliationRunDeleteArgs} args - Arguments to delete one ReconciliationRun.
     * @example
     * // Delete one ReconciliationRun
     * const ReconciliationRun = await prisma.reconciliationRun.delete({
     *   where: {
     *     // ... filter to delete one ReconciliationRun
     *   }
     * })
     * 
     */
    delete<T extends ReconciliationRunDeleteArgs>(args: SelectSubset<T, ReconciliationRunDeleteArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ReconciliationRun.
     * @param {ReconciliationRunUpdateArgs} args - Arguments to update one ReconciliationRun.
     * @example
     * // Update one ReconciliationRun
     * const reconciliationRun = await prisma.reconciliationRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReconciliationRunUpdateArgs>(args: SelectSubset<T, ReconciliationRunUpdateArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ReconciliationRuns.
     * @param {ReconciliationRunDeleteManyArgs} args - Arguments to filter ReconciliationRuns to delete.
     * @example
     * // Delete a few ReconciliationRuns
     * const { count } = await prisma.reconciliationRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReconciliationRunDeleteManyArgs>(args?: SelectSubset<T, ReconciliationRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReconciliationRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReconciliationRuns
     * const reconciliationRun = await prisma.reconciliationRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReconciliationRunUpdateManyArgs>(args: SelectSubset<T, ReconciliationRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReconciliationRun.
     * @param {ReconciliationRunUpsertArgs} args - Arguments to update or create a ReconciliationRun.
     * @example
     * // Update or create a ReconciliationRun
     * const reconciliationRun = await prisma.reconciliationRun.upsert({
     *   create: {
     *     // ... data to create a ReconciliationRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReconciliationRun we want to update
     *   }
     * })
     */
    upsert<T extends ReconciliationRunUpsertArgs>(args: SelectSubset<T, ReconciliationRunUpsertArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ReconciliationRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationRunCountArgs} args - Arguments to filter ReconciliationRuns to count.
     * @example
     * // Count the number of ReconciliationRuns
     * const count = await prisma.reconciliationRun.count({
     *   where: {
     *     // ... the filter for the ReconciliationRuns we want to count
     *   }
     * })
    **/
    count<T extends ReconciliationRunCountArgs>(
      args?: Subset<T, ReconciliationRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReconciliationRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReconciliationRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReconciliationRunAggregateArgs>(args: Subset<T, ReconciliationRunAggregateArgs>): Prisma.PrismaPromise<GetReconciliationRunAggregateType<T>>

    /**
     * Group by ReconciliationRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationRunGroupByArgs} args - Group by arguments.
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
      T extends ReconciliationRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReconciliationRunGroupByArgs['orderBy'] }
        : { orderBy?: ReconciliationRunGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReconciliationRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReconciliationRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReconciliationRun model
   */
  readonly fields: ReconciliationRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReconciliationRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReconciliationRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    breaks<T extends ReconciliationRun$breaksArgs<ExtArgs> = {}>(args?: Subset<T, ReconciliationRun$breaksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReconciliationBreakPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the ReconciliationRun model
   */ 
  interface ReconciliationRunFieldRefs {
    readonly id: FieldRef<"ReconciliationRun", 'String'>
    readonly scope: FieldRef<"ReconciliationRun", 'String'>
    readonly status: FieldRef<"ReconciliationRun", 'ReconciliationStatus'>
    readonly startedAt: FieldRef<"ReconciliationRun", 'DateTime'>
    readonly finishedAt: FieldRef<"ReconciliationRun", 'DateTime'>
    readonly checkedCount: FieldRef<"ReconciliationRun", 'Int'>
    readonly breakCount: FieldRef<"ReconciliationRun", 'Int'>
    readonly summary: FieldRef<"ReconciliationRun", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * ReconciliationRun findUnique
   */
  export type ReconciliationRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationRunInclude<ExtArgs> | null
    /**
     * Filter, which ReconciliationRun to fetch.
     */
    where: ReconciliationRunWhereUniqueInput
  }

  /**
   * ReconciliationRun findUniqueOrThrow
   */
  export type ReconciliationRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationRunInclude<ExtArgs> | null
    /**
     * Filter, which ReconciliationRun to fetch.
     */
    where: ReconciliationRunWhereUniqueInput
  }

  /**
   * ReconciliationRun findFirst
   */
  export type ReconciliationRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationRunInclude<ExtArgs> | null
    /**
     * Filter, which ReconciliationRun to fetch.
     */
    where?: ReconciliationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReconciliationRuns to fetch.
     */
    orderBy?: ReconciliationRunOrderByWithRelationInput | ReconciliationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReconciliationRuns.
     */
    cursor?: ReconciliationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReconciliationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReconciliationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReconciliationRuns.
     */
    distinct?: ReconciliationRunScalarFieldEnum | ReconciliationRunScalarFieldEnum[]
  }

  /**
   * ReconciliationRun findFirstOrThrow
   */
  export type ReconciliationRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationRunInclude<ExtArgs> | null
    /**
     * Filter, which ReconciliationRun to fetch.
     */
    where?: ReconciliationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReconciliationRuns to fetch.
     */
    orderBy?: ReconciliationRunOrderByWithRelationInput | ReconciliationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReconciliationRuns.
     */
    cursor?: ReconciliationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReconciliationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReconciliationRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReconciliationRuns.
     */
    distinct?: ReconciliationRunScalarFieldEnum | ReconciliationRunScalarFieldEnum[]
  }

  /**
   * ReconciliationRun findMany
   */
  export type ReconciliationRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationRunInclude<ExtArgs> | null
    /**
     * Filter, which ReconciliationRuns to fetch.
     */
    where?: ReconciliationRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReconciliationRuns to fetch.
     */
    orderBy?: ReconciliationRunOrderByWithRelationInput | ReconciliationRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReconciliationRuns.
     */
    cursor?: ReconciliationRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReconciliationRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReconciliationRuns.
     */
    skip?: number
    distinct?: ReconciliationRunScalarFieldEnum | ReconciliationRunScalarFieldEnum[]
  }

  /**
   * ReconciliationRun create
   */
  export type ReconciliationRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationRunInclude<ExtArgs> | null
    /**
     * The data needed to create a ReconciliationRun.
     */
    data: XOR<ReconciliationRunCreateInput, ReconciliationRunUncheckedCreateInput>
  }

  /**
   * ReconciliationRun createMany
   */
  export type ReconciliationRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReconciliationRuns.
     */
    data: ReconciliationRunCreateManyInput | ReconciliationRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReconciliationRun createManyAndReturn
   */
  export type ReconciliationRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ReconciliationRuns.
     */
    data: ReconciliationRunCreateManyInput | ReconciliationRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReconciliationRun update
   */
  export type ReconciliationRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationRunInclude<ExtArgs> | null
    /**
     * The data needed to update a ReconciliationRun.
     */
    data: XOR<ReconciliationRunUpdateInput, ReconciliationRunUncheckedUpdateInput>
    /**
     * Choose, which ReconciliationRun to update.
     */
    where: ReconciliationRunWhereUniqueInput
  }

  /**
   * ReconciliationRun updateMany
   */
  export type ReconciliationRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReconciliationRuns.
     */
    data: XOR<ReconciliationRunUpdateManyMutationInput, ReconciliationRunUncheckedUpdateManyInput>
    /**
     * Filter which ReconciliationRuns to update
     */
    where?: ReconciliationRunWhereInput
  }

  /**
   * ReconciliationRun upsert
   */
  export type ReconciliationRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationRunInclude<ExtArgs> | null
    /**
     * The filter to search for the ReconciliationRun to update in case it exists.
     */
    where: ReconciliationRunWhereUniqueInput
    /**
     * In case the ReconciliationRun found by the `where` argument doesn't exist, create a new ReconciliationRun with this data.
     */
    create: XOR<ReconciliationRunCreateInput, ReconciliationRunUncheckedCreateInput>
    /**
     * In case the ReconciliationRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReconciliationRunUpdateInput, ReconciliationRunUncheckedUpdateInput>
  }

  /**
   * ReconciliationRun delete
   */
  export type ReconciliationRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationRunInclude<ExtArgs> | null
    /**
     * Filter which ReconciliationRun to delete.
     */
    where: ReconciliationRunWhereUniqueInput
  }

  /**
   * ReconciliationRun deleteMany
   */
  export type ReconciliationRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReconciliationRuns to delete
     */
    where?: ReconciliationRunWhereInput
  }

  /**
   * ReconciliationRun.breaks
   */
  export type ReconciliationRun$breaksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationBreak
     */
    select?: ReconciliationBreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationBreakInclude<ExtArgs> | null
    where?: ReconciliationBreakWhereInput
    orderBy?: ReconciliationBreakOrderByWithRelationInput | ReconciliationBreakOrderByWithRelationInput[]
    cursor?: ReconciliationBreakWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReconciliationBreakScalarFieldEnum | ReconciliationBreakScalarFieldEnum[]
  }

  /**
   * ReconciliationRun without action
   */
  export type ReconciliationRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationRun
     */
    select?: ReconciliationRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationRunInclude<ExtArgs> | null
  }


  /**
   * Model ReconciliationBreak
   */

  export type AggregateReconciliationBreak = {
    _count: ReconciliationBreakCountAggregateOutputType | null
    _min: ReconciliationBreakMinAggregateOutputType | null
    _max: ReconciliationBreakMaxAggregateOutputType | null
  }

  export type ReconciliationBreakMinAggregateOutputType = {
    id: string | null
    runId: string | null
    kind: string | null
    reference: string | null
    currency: string | null
    expectedMinor: string | null
    actualMinor: string | null
    createdAt: Date | null
  }

  export type ReconciliationBreakMaxAggregateOutputType = {
    id: string | null
    runId: string | null
    kind: string | null
    reference: string | null
    currency: string | null
    expectedMinor: string | null
    actualMinor: string | null
    createdAt: Date | null
  }

  export type ReconciliationBreakCountAggregateOutputType = {
    id: number
    runId: number
    kind: number
    reference: number
    currency: number
    expectedMinor: number
    actualMinor: number
    detail: number
    createdAt: number
    _all: number
  }


  export type ReconciliationBreakMinAggregateInputType = {
    id?: true
    runId?: true
    kind?: true
    reference?: true
    currency?: true
    expectedMinor?: true
    actualMinor?: true
    createdAt?: true
  }

  export type ReconciliationBreakMaxAggregateInputType = {
    id?: true
    runId?: true
    kind?: true
    reference?: true
    currency?: true
    expectedMinor?: true
    actualMinor?: true
    createdAt?: true
  }

  export type ReconciliationBreakCountAggregateInputType = {
    id?: true
    runId?: true
    kind?: true
    reference?: true
    currency?: true
    expectedMinor?: true
    actualMinor?: true
    detail?: true
    createdAt?: true
    _all?: true
  }

  export type ReconciliationBreakAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReconciliationBreak to aggregate.
     */
    where?: ReconciliationBreakWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReconciliationBreaks to fetch.
     */
    orderBy?: ReconciliationBreakOrderByWithRelationInput | ReconciliationBreakOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReconciliationBreakWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReconciliationBreaks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReconciliationBreaks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReconciliationBreaks
    **/
    _count?: true | ReconciliationBreakCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReconciliationBreakMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReconciliationBreakMaxAggregateInputType
  }

  export type GetReconciliationBreakAggregateType<T extends ReconciliationBreakAggregateArgs> = {
        [P in keyof T & keyof AggregateReconciliationBreak]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReconciliationBreak[P]>
      : GetScalarType<T[P], AggregateReconciliationBreak[P]>
  }




  export type ReconciliationBreakGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReconciliationBreakWhereInput
    orderBy?: ReconciliationBreakOrderByWithAggregationInput | ReconciliationBreakOrderByWithAggregationInput[]
    by: ReconciliationBreakScalarFieldEnum[] | ReconciliationBreakScalarFieldEnum
    having?: ReconciliationBreakScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReconciliationBreakCountAggregateInputType | true
    _min?: ReconciliationBreakMinAggregateInputType
    _max?: ReconciliationBreakMaxAggregateInputType
  }

  export type ReconciliationBreakGroupByOutputType = {
    id: string
    runId: string
    kind: string
    reference: string | null
    currency: string | null
    expectedMinor: string | null
    actualMinor: string | null
    detail: JsonValue | null
    createdAt: Date
    _count: ReconciliationBreakCountAggregateOutputType | null
    _min: ReconciliationBreakMinAggregateOutputType | null
    _max: ReconciliationBreakMaxAggregateOutputType | null
  }

  type GetReconciliationBreakGroupByPayload<T extends ReconciliationBreakGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReconciliationBreakGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReconciliationBreakGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReconciliationBreakGroupByOutputType[P]>
            : GetScalarType<T[P], ReconciliationBreakGroupByOutputType[P]>
        }
      >
    >


  export type ReconciliationBreakSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    kind?: boolean
    reference?: boolean
    currency?: boolean
    expectedMinor?: boolean
    actualMinor?: boolean
    detail?: boolean
    createdAt?: boolean
    run?: boolean | ReconciliationRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reconciliationBreak"]>

  export type ReconciliationBreakSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    kind?: boolean
    reference?: boolean
    currency?: boolean
    expectedMinor?: boolean
    actualMinor?: boolean
    detail?: boolean
    createdAt?: boolean
    run?: boolean | ReconciliationRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reconciliationBreak"]>

  export type ReconciliationBreakSelectScalar = {
    id?: boolean
    runId?: boolean
    kind?: boolean
    reference?: boolean
    currency?: boolean
    expectedMinor?: boolean
    actualMinor?: boolean
    detail?: boolean
    createdAt?: boolean
  }

  export type ReconciliationBreakInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | ReconciliationRunDefaultArgs<ExtArgs>
  }
  export type ReconciliationBreakIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | ReconciliationRunDefaultArgs<ExtArgs>
  }

  export type $ReconciliationBreakPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReconciliationBreak"
    objects: {
      run: Prisma.$ReconciliationRunPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      runId: string
      kind: string
      reference: string | null
      currency: string | null
      expectedMinor: string | null
      actualMinor: string | null
      detail: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["reconciliationBreak"]>
    composites: {}
  }

  type ReconciliationBreakGetPayload<S extends boolean | null | undefined | ReconciliationBreakDefaultArgs> = $Result.GetResult<Prisma.$ReconciliationBreakPayload, S>

  type ReconciliationBreakCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReconciliationBreakFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReconciliationBreakCountAggregateInputType | true
    }

  export interface ReconciliationBreakDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReconciliationBreak'], meta: { name: 'ReconciliationBreak' } }
    /**
     * Find zero or one ReconciliationBreak that matches the filter.
     * @param {ReconciliationBreakFindUniqueArgs} args - Arguments to find a ReconciliationBreak
     * @example
     * // Get one ReconciliationBreak
     * const reconciliationBreak = await prisma.reconciliationBreak.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReconciliationBreakFindUniqueArgs>(args: SelectSubset<T, ReconciliationBreakFindUniqueArgs<ExtArgs>>): Prisma__ReconciliationBreakClient<$Result.GetResult<Prisma.$ReconciliationBreakPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ReconciliationBreak that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReconciliationBreakFindUniqueOrThrowArgs} args - Arguments to find a ReconciliationBreak
     * @example
     * // Get one ReconciliationBreak
     * const reconciliationBreak = await prisma.reconciliationBreak.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReconciliationBreakFindUniqueOrThrowArgs>(args: SelectSubset<T, ReconciliationBreakFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReconciliationBreakClient<$Result.GetResult<Prisma.$ReconciliationBreakPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ReconciliationBreak that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationBreakFindFirstArgs} args - Arguments to find a ReconciliationBreak
     * @example
     * // Get one ReconciliationBreak
     * const reconciliationBreak = await prisma.reconciliationBreak.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReconciliationBreakFindFirstArgs>(args?: SelectSubset<T, ReconciliationBreakFindFirstArgs<ExtArgs>>): Prisma__ReconciliationBreakClient<$Result.GetResult<Prisma.$ReconciliationBreakPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ReconciliationBreak that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationBreakFindFirstOrThrowArgs} args - Arguments to find a ReconciliationBreak
     * @example
     * // Get one ReconciliationBreak
     * const reconciliationBreak = await prisma.reconciliationBreak.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReconciliationBreakFindFirstOrThrowArgs>(args?: SelectSubset<T, ReconciliationBreakFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReconciliationBreakClient<$Result.GetResult<Prisma.$ReconciliationBreakPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ReconciliationBreaks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationBreakFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReconciliationBreaks
     * const reconciliationBreaks = await prisma.reconciliationBreak.findMany()
     * 
     * // Get first 10 ReconciliationBreaks
     * const reconciliationBreaks = await prisma.reconciliationBreak.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reconciliationBreakWithIdOnly = await prisma.reconciliationBreak.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReconciliationBreakFindManyArgs>(args?: SelectSubset<T, ReconciliationBreakFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReconciliationBreakPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ReconciliationBreak.
     * @param {ReconciliationBreakCreateArgs} args - Arguments to create a ReconciliationBreak.
     * @example
     * // Create one ReconciliationBreak
     * const ReconciliationBreak = await prisma.reconciliationBreak.create({
     *   data: {
     *     // ... data to create a ReconciliationBreak
     *   }
     * })
     * 
     */
    create<T extends ReconciliationBreakCreateArgs>(args: SelectSubset<T, ReconciliationBreakCreateArgs<ExtArgs>>): Prisma__ReconciliationBreakClient<$Result.GetResult<Prisma.$ReconciliationBreakPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ReconciliationBreaks.
     * @param {ReconciliationBreakCreateManyArgs} args - Arguments to create many ReconciliationBreaks.
     * @example
     * // Create many ReconciliationBreaks
     * const reconciliationBreak = await prisma.reconciliationBreak.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReconciliationBreakCreateManyArgs>(args?: SelectSubset<T, ReconciliationBreakCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReconciliationBreaks and returns the data saved in the database.
     * @param {ReconciliationBreakCreateManyAndReturnArgs} args - Arguments to create many ReconciliationBreaks.
     * @example
     * // Create many ReconciliationBreaks
     * const reconciliationBreak = await prisma.reconciliationBreak.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReconciliationBreaks and only return the `id`
     * const reconciliationBreakWithIdOnly = await prisma.reconciliationBreak.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReconciliationBreakCreateManyAndReturnArgs>(args?: SelectSubset<T, ReconciliationBreakCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReconciliationBreakPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ReconciliationBreak.
     * @param {ReconciliationBreakDeleteArgs} args - Arguments to delete one ReconciliationBreak.
     * @example
     * // Delete one ReconciliationBreak
     * const ReconciliationBreak = await prisma.reconciliationBreak.delete({
     *   where: {
     *     // ... filter to delete one ReconciliationBreak
     *   }
     * })
     * 
     */
    delete<T extends ReconciliationBreakDeleteArgs>(args: SelectSubset<T, ReconciliationBreakDeleteArgs<ExtArgs>>): Prisma__ReconciliationBreakClient<$Result.GetResult<Prisma.$ReconciliationBreakPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ReconciliationBreak.
     * @param {ReconciliationBreakUpdateArgs} args - Arguments to update one ReconciliationBreak.
     * @example
     * // Update one ReconciliationBreak
     * const reconciliationBreak = await prisma.reconciliationBreak.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReconciliationBreakUpdateArgs>(args: SelectSubset<T, ReconciliationBreakUpdateArgs<ExtArgs>>): Prisma__ReconciliationBreakClient<$Result.GetResult<Prisma.$ReconciliationBreakPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ReconciliationBreaks.
     * @param {ReconciliationBreakDeleteManyArgs} args - Arguments to filter ReconciliationBreaks to delete.
     * @example
     * // Delete a few ReconciliationBreaks
     * const { count } = await prisma.reconciliationBreak.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReconciliationBreakDeleteManyArgs>(args?: SelectSubset<T, ReconciliationBreakDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReconciliationBreaks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationBreakUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReconciliationBreaks
     * const reconciliationBreak = await prisma.reconciliationBreak.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReconciliationBreakUpdateManyArgs>(args: SelectSubset<T, ReconciliationBreakUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReconciliationBreak.
     * @param {ReconciliationBreakUpsertArgs} args - Arguments to update or create a ReconciliationBreak.
     * @example
     * // Update or create a ReconciliationBreak
     * const reconciliationBreak = await prisma.reconciliationBreak.upsert({
     *   create: {
     *     // ... data to create a ReconciliationBreak
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReconciliationBreak we want to update
     *   }
     * })
     */
    upsert<T extends ReconciliationBreakUpsertArgs>(args: SelectSubset<T, ReconciliationBreakUpsertArgs<ExtArgs>>): Prisma__ReconciliationBreakClient<$Result.GetResult<Prisma.$ReconciliationBreakPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ReconciliationBreaks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationBreakCountArgs} args - Arguments to filter ReconciliationBreaks to count.
     * @example
     * // Count the number of ReconciliationBreaks
     * const count = await prisma.reconciliationBreak.count({
     *   where: {
     *     // ... the filter for the ReconciliationBreaks we want to count
     *   }
     * })
    **/
    count<T extends ReconciliationBreakCountArgs>(
      args?: Subset<T, ReconciliationBreakCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReconciliationBreakCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReconciliationBreak.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationBreakAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReconciliationBreakAggregateArgs>(args: Subset<T, ReconciliationBreakAggregateArgs>): Prisma.PrismaPromise<GetReconciliationBreakAggregateType<T>>

    /**
     * Group by ReconciliationBreak.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReconciliationBreakGroupByArgs} args - Group by arguments.
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
      T extends ReconciliationBreakGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReconciliationBreakGroupByArgs['orderBy'] }
        : { orderBy?: ReconciliationBreakGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReconciliationBreakGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReconciliationBreakGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReconciliationBreak model
   */
  readonly fields: ReconciliationBreakFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReconciliationBreak.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReconciliationBreakClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    run<T extends ReconciliationRunDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReconciliationRunDefaultArgs<ExtArgs>>): Prisma__ReconciliationRunClient<$Result.GetResult<Prisma.$ReconciliationRunPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ReconciliationBreak model
   */ 
  interface ReconciliationBreakFieldRefs {
    readonly id: FieldRef<"ReconciliationBreak", 'String'>
    readonly runId: FieldRef<"ReconciliationBreak", 'String'>
    readonly kind: FieldRef<"ReconciliationBreak", 'String'>
    readonly reference: FieldRef<"ReconciliationBreak", 'String'>
    readonly currency: FieldRef<"ReconciliationBreak", 'String'>
    readonly expectedMinor: FieldRef<"ReconciliationBreak", 'String'>
    readonly actualMinor: FieldRef<"ReconciliationBreak", 'String'>
    readonly detail: FieldRef<"ReconciliationBreak", 'Json'>
    readonly createdAt: FieldRef<"ReconciliationBreak", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReconciliationBreak findUnique
   */
  export type ReconciliationBreakFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationBreak
     */
    select?: ReconciliationBreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationBreakInclude<ExtArgs> | null
    /**
     * Filter, which ReconciliationBreak to fetch.
     */
    where: ReconciliationBreakWhereUniqueInput
  }

  /**
   * ReconciliationBreak findUniqueOrThrow
   */
  export type ReconciliationBreakFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationBreak
     */
    select?: ReconciliationBreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationBreakInclude<ExtArgs> | null
    /**
     * Filter, which ReconciliationBreak to fetch.
     */
    where: ReconciliationBreakWhereUniqueInput
  }

  /**
   * ReconciliationBreak findFirst
   */
  export type ReconciliationBreakFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationBreak
     */
    select?: ReconciliationBreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationBreakInclude<ExtArgs> | null
    /**
     * Filter, which ReconciliationBreak to fetch.
     */
    where?: ReconciliationBreakWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReconciliationBreaks to fetch.
     */
    orderBy?: ReconciliationBreakOrderByWithRelationInput | ReconciliationBreakOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReconciliationBreaks.
     */
    cursor?: ReconciliationBreakWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReconciliationBreaks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReconciliationBreaks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReconciliationBreaks.
     */
    distinct?: ReconciliationBreakScalarFieldEnum | ReconciliationBreakScalarFieldEnum[]
  }

  /**
   * ReconciliationBreak findFirstOrThrow
   */
  export type ReconciliationBreakFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationBreak
     */
    select?: ReconciliationBreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationBreakInclude<ExtArgs> | null
    /**
     * Filter, which ReconciliationBreak to fetch.
     */
    where?: ReconciliationBreakWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReconciliationBreaks to fetch.
     */
    orderBy?: ReconciliationBreakOrderByWithRelationInput | ReconciliationBreakOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReconciliationBreaks.
     */
    cursor?: ReconciliationBreakWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReconciliationBreaks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReconciliationBreaks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReconciliationBreaks.
     */
    distinct?: ReconciliationBreakScalarFieldEnum | ReconciliationBreakScalarFieldEnum[]
  }

  /**
   * ReconciliationBreak findMany
   */
  export type ReconciliationBreakFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationBreak
     */
    select?: ReconciliationBreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationBreakInclude<ExtArgs> | null
    /**
     * Filter, which ReconciliationBreaks to fetch.
     */
    where?: ReconciliationBreakWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReconciliationBreaks to fetch.
     */
    orderBy?: ReconciliationBreakOrderByWithRelationInput | ReconciliationBreakOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReconciliationBreaks.
     */
    cursor?: ReconciliationBreakWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReconciliationBreaks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReconciliationBreaks.
     */
    skip?: number
    distinct?: ReconciliationBreakScalarFieldEnum | ReconciliationBreakScalarFieldEnum[]
  }

  /**
   * ReconciliationBreak create
   */
  export type ReconciliationBreakCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationBreak
     */
    select?: ReconciliationBreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationBreakInclude<ExtArgs> | null
    /**
     * The data needed to create a ReconciliationBreak.
     */
    data: XOR<ReconciliationBreakCreateInput, ReconciliationBreakUncheckedCreateInput>
  }

  /**
   * ReconciliationBreak createMany
   */
  export type ReconciliationBreakCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReconciliationBreaks.
     */
    data: ReconciliationBreakCreateManyInput | ReconciliationBreakCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReconciliationBreak createManyAndReturn
   */
  export type ReconciliationBreakCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationBreak
     */
    select?: ReconciliationBreakSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ReconciliationBreaks.
     */
    data: ReconciliationBreakCreateManyInput | ReconciliationBreakCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationBreakIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReconciliationBreak update
   */
  export type ReconciliationBreakUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationBreak
     */
    select?: ReconciliationBreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationBreakInclude<ExtArgs> | null
    /**
     * The data needed to update a ReconciliationBreak.
     */
    data: XOR<ReconciliationBreakUpdateInput, ReconciliationBreakUncheckedUpdateInput>
    /**
     * Choose, which ReconciliationBreak to update.
     */
    where: ReconciliationBreakWhereUniqueInput
  }

  /**
   * ReconciliationBreak updateMany
   */
  export type ReconciliationBreakUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReconciliationBreaks.
     */
    data: XOR<ReconciliationBreakUpdateManyMutationInput, ReconciliationBreakUncheckedUpdateManyInput>
    /**
     * Filter which ReconciliationBreaks to update
     */
    where?: ReconciliationBreakWhereInput
  }

  /**
   * ReconciliationBreak upsert
   */
  export type ReconciliationBreakUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationBreak
     */
    select?: ReconciliationBreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationBreakInclude<ExtArgs> | null
    /**
     * The filter to search for the ReconciliationBreak to update in case it exists.
     */
    where: ReconciliationBreakWhereUniqueInput
    /**
     * In case the ReconciliationBreak found by the `where` argument doesn't exist, create a new ReconciliationBreak with this data.
     */
    create: XOR<ReconciliationBreakCreateInput, ReconciliationBreakUncheckedCreateInput>
    /**
     * In case the ReconciliationBreak was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReconciliationBreakUpdateInput, ReconciliationBreakUncheckedUpdateInput>
  }

  /**
   * ReconciliationBreak delete
   */
  export type ReconciliationBreakDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationBreak
     */
    select?: ReconciliationBreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationBreakInclude<ExtArgs> | null
    /**
     * Filter which ReconciliationBreak to delete.
     */
    where: ReconciliationBreakWhereUniqueInput
  }

  /**
   * ReconciliationBreak deleteMany
   */
  export type ReconciliationBreakDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReconciliationBreaks to delete
     */
    where?: ReconciliationBreakWhereInput
  }

  /**
   * ReconciliationBreak without action
   */
  export type ReconciliationBreakDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReconciliationBreak
     */
    select?: ReconciliationBreakSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReconciliationBreakInclude<ExtArgs> | null
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


  export const ExecutionTransactionScalarFieldEnum: {
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

  export type ExecutionTransactionScalarFieldEnum = (typeof ExecutionTransactionScalarFieldEnum)[keyof typeof ExecutionTransactionScalarFieldEnum]


  export const ExecutionTransactionEventScalarFieldEnum: {
    id: 'id',
    transactionId: 'transactionId',
    fromState: 'fromState',
    toState: 'toState',
    reason: 'reason',
    detail: 'detail',
    occurredAt: 'occurredAt'
  };

  export type ExecutionTransactionEventScalarFieldEnum = (typeof ExecutionTransactionEventScalarFieldEnum)[keyof typeof ExecutionTransactionEventScalarFieldEnum]


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


  export const ExecutionConsumerCursorScalarFieldEnum: {
    consumerName: 'consumerName',
    lastEventId: 'lastEventId',
    lastSeenAt: 'lastSeenAt'
  };

  export type ExecutionConsumerCursorScalarFieldEnum = (typeof ExecutionConsumerCursorScalarFieldEnum)[keyof typeof ExecutionConsumerCursorScalarFieldEnum]


  export const EscrowDealScalarFieldEnum: {
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

  export type EscrowDealScalarFieldEnum = (typeof EscrowDealScalarFieldEnum)[keyof typeof EscrowDealScalarFieldEnum]


  export const EscrowDealEventScalarFieldEnum: {
    id: 'id',
    dealRowId: 'dealRowId',
    type: 'type',
    detail: 'detail',
    txHash: 'txHash',
    occurredAt: 'occurredAt'
  };

  export type EscrowDealEventScalarFieldEnum = (typeof EscrowDealEventScalarFieldEnum)[keyof typeof EscrowDealEventScalarFieldEnum]


  export const ReconciliationRunScalarFieldEnum: {
    id: 'id',
    scope: 'scope',
    status: 'status',
    startedAt: 'startedAt',
    finishedAt: 'finishedAt',
    checkedCount: 'checkedCount',
    breakCount: 'breakCount',
    summary: 'summary'
  };

  export type ReconciliationRunScalarFieldEnum = (typeof ReconciliationRunScalarFieldEnum)[keyof typeof ReconciliationRunScalarFieldEnum]


  export const ReconciliationBreakScalarFieldEnum: {
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

  export type ReconciliationBreakScalarFieldEnum = (typeof ReconciliationBreakScalarFieldEnum)[keyof typeof ReconciliationBreakScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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
   * Reference to a field of type 'ExecutionTransactionKind'
   */
  export type EnumExecutionTransactionKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExecutionTransactionKind'>
    


  /**
   * Reference to a field of type 'ExecutionTransactionKind[]'
   */
  export type ListEnumExecutionTransactionKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExecutionTransactionKind[]'>
    


  /**
   * Reference to a field of type 'ExecutionTransactionState'
   */
  export type EnumExecutionTransactionStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExecutionTransactionState'>
    


  /**
   * Reference to a field of type 'ExecutionTransactionState[]'
   */
  export type ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExecutionTransactionState[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


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
   * Reference to a field of type 'OutboxStatus'
   */
  export type EnumOutboxStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OutboxStatus'>
    


  /**
   * Reference to a field of type 'OutboxStatus[]'
   */
  export type ListEnumOutboxStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OutboxStatus[]'>
    


  /**
   * Reference to a field of type 'EscrowDealStatus'
   */
  export type EnumEscrowDealStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EscrowDealStatus'>
    


  /**
   * Reference to a field of type 'EscrowDealStatus[]'
   */
  export type ListEnumEscrowDealStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EscrowDealStatus[]'>
    


  /**
   * Reference to a field of type 'EscrowResolution'
   */
  export type EnumEscrowResolutionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EscrowResolution'>
    


  /**
   * Reference to a field of type 'EscrowResolution[]'
   */
  export type ListEnumEscrowResolutionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EscrowResolution[]'>
    


  /**
   * Reference to a field of type 'ReconciliationStatus'
   */
  export type EnumReconciliationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReconciliationStatus'>
    


  /**
   * Reference to a field of type 'ReconciliationStatus[]'
   */
  export type ListEnumReconciliationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReconciliationStatus[]'>
    


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


  export type ExecutionTransactionWhereInput = {
    AND?: ExecutionTransactionWhereInput | ExecutionTransactionWhereInput[]
    OR?: ExecutionTransactionWhereInput[]
    NOT?: ExecutionTransactionWhereInput | ExecutionTransactionWhereInput[]
    id?: UuidFilter<"ExecutionTransaction"> | string
    idempotencyKey?: StringFilter<"ExecutionTransaction"> | string
    kind?: EnumExecutionTransactionKindFilter<"ExecutionTransaction"> | $Enums.ExecutionTransactionKind
    state?: EnumExecutionTransactionStateFilter<"ExecutionTransaction"> | $Enums.ExecutionTransactionState
    sourceWalletId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    sourceAccountId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    amountMinor?: BigIntFilter<"ExecutionTransaction"> | bigint | number
    currency?: StringFilter<"ExecutionTransaction"> | string
    destinationWalletId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    destinationAccountId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    destinationAddress?: StringNullableFilter<"ExecutionTransaction"> | string | null
    destinationChain?: StringNullableFilter<"ExecutionTransaction"> | string | null
    asset?: StringNullableFilter<"ExecutionTransaction"> | string | null
    ledgerTransactionId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    ledgerEntryId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    reversalEntryId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    broadcastJobId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    txHash?: StringNullableFilter<"ExecutionTransaction"> | string | null
    intentId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    orgId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    memo?: StringNullableFilter<"ExecutionTransaction"> | string | null
    metadata?: JsonNullableFilter<"ExecutionTransaction">
    error?: StringNullableFilter<"ExecutionTransaction"> | string | null
    routeDecisionId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    selectedRail?: StringNullableFilter<"ExecutionTransaction"> | string | null
    quoteId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    quoteSignature?: StringNullableFilter<"ExecutionTransaction"> | string | null
    riskAssessmentId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    riskScore?: IntNullableFilter<"ExecutionTransaction"> | number | null
    complianceRunId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    complianceCaseId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    createdAt?: DateTimeFilter<"ExecutionTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"ExecutionTransaction"> | Date | string
    settledAt?: DateTimeNullableFilter<"ExecutionTransaction"> | Date | string | null
    events?: ExecutionTransactionEventListRelationFilter
  }

  export type ExecutionTransactionOrderByWithRelationInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    kind?: SortOrder
    state?: SortOrder
    sourceWalletId?: SortOrderInput | SortOrder
    sourceAccountId?: SortOrderInput | SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    destinationWalletId?: SortOrderInput | SortOrder
    destinationAccountId?: SortOrderInput | SortOrder
    destinationAddress?: SortOrderInput | SortOrder
    destinationChain?: SortOrderInput | SortOrder
    asset?: SortOrderInput | SortOrder
    ledgerTransactionId?: SortOrderInput | SortOrder
    ledgerEntryId?: SortOrderInput | SortOrder
    reversalEntryId?: SortOrderInput | SortOrder
    broadcastJobId?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    intentId?: SortOrderInput | SortOrder
    orgId?: SortOrderInput | SortOrder
    memo?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    routeDecisionId?: SortOrderInput | SortOrder
    selectedRail?: SortOrderInput | SortOrder
    quoteId?: SortOrderInput | SortOrder
    quoteSignature?: SortOrderInput | SortOrder
    riskAssessmentId?: SortOrderInput | SortOrder
    riskScore?: SortOrderInput | SortOrder
    complianceRunId?: SortOrderInput | SortOrder
    complianceCaseId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settledAt?: SortOrderInput | SortOrder
    events?: ExecutionTransactionEventOrderByRelationAggregateInput
  }

  export type ExecutionTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idempotencyKey?: string
    AND?: ExecutionTransactionWhereInput | ExecutionTransactionWhereInput[]
    OR?: ExecutionTransactionWhereInput[]
    NOT?: ExecutionTransactionWhereInput | ExecutionTransactionWhereInput[]
    kind?: EnumExecutionTransactionKindFilter<"ExecutionTransaction"> | $Enums.ExecutionTransactionKind
    state?: EnumExecutionTransactionStateFilter<"ExecutionTransaction"> | $Enums.ExecutionTransactionState
    sourceWalletId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    sourceAccountId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    amountMinor?: BigIntFilter<"ExecutionTransaction"> | bigint | number
    currency?: StringFilter<"ExecutionTransaction"> | string
    destinationWalletId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    destinationAccountId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    destinationAddress?: StringNullableFilter<"ExecutionTransaction"> | string | null
    destinationChain?: StringNullableFilter<"ExecutionTransaction"> | string | null
    asset?: StringNullableFilter<"ExecutionTransaction"> | string | null
    ledgerTransactionId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    ledgerEntryId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    reversalEntryId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    broadcastJobId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    txHash?: StringNullableFilter<"ExecutionTransaction"> | string | null
    intentId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    orgId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    memo?: StringNullableFilter<"ExecutionTransaction"> | string | null
    metadata?: JsonNullableFilter<"ExecutionTransaction">
    error?: StringNullableFilter<"ExecutionTransaction"> | string | null
    routeDecisionId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    selectedRail?: StringNullableFilter<"ExecutionTransaction"> | string | null
    quoteId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    quoteSignature?: StringNullableFilter<"ExecutionTransaction"> | string | null
    riskAssessmentId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    riskScore?: IntNullableFilter<"ExecutionTransaction"> | number | null
    complianceRunId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    complianceCaseId?: StringNullableFilter<"ExecutionTransaction"> | string | null
    createdAt?: DateTimeFilter<"ExecutionTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"ExecutionTransaction"> | Date | string
    settledAt?: DateTimeNullableFilter<"ExecutionTransaction"> | Date | string | null
    events?: ExecutionTransactionEventListRelationFilter
  }, "id" | "idempotencyKey">

  export type ExecutionTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    kind?: SortOrder
    state?: SortOrder
    sourceWalletId?: SortOrderInput | SortOrder
    sourceAccountId?: SortOrderInput | SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    destinationWalletId?: SortOrderInput | SortOrder
    destinationAccountId?: SortOrderInput | SortOrder
    destinationAddress?: SortOrderInput | SortOrder
    destinationChain?: SortOrderInput | SortOrder
    asset?: SortOrderInput | SortOrder
    ledgerTransactionId?: SortOrderInput | SortOrder
    ledgerEntryId?: SortOrderInput | SortOrder
    reversalEntryId?: SortOrderInput | SortOrder
    broadcastJobId?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    intentId?: SortOrderInput | SortOrder
    orgId?: SortOrderInput | SortOrder
    memo?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    routeDecisionId?: SortOrderInput | SortOrder
    selectedRail?: SortOrderInput | SortOrder
    quoteId?: SortOrderInput | SortOrder
    quoteSignature?: SortOrderInput | SortOrder
    riskAssessmentId?: SortOrderInput | SortOrder
    riskScore?: SortOrderInput | SortOrder
    complianceRunId?: SortOrderInput | SortOrder
    complianceCaseId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settledAt?: SortOrderInput | SortOrder
    _count?: ExecutionTransactionCountOrderByAggregateInput
    _avg?: ExecutionTransactionAvgOrderByAggregateInput
    _max?: ExecutionTransactionMaxOrderByAggregateInput
    _min?: ExecutionTransactionMinOrderByAggregateInput
    _sum?: ExecutionTransactionSumOrderByAggregateInput
  }

  export type ExecutionTransactionScalarWhereWithAggregatesInput = {
    AND?: ExecutionTransactionScalarWhereWithAggregatesInput | ExecutionTransactionScalarWhereWithAggregatesInput[]
    OR?: ExecutionTransactionScalarWhereWithAggregatesInput[]
    NOT?: ExecutionTransactionScalarWhereWithAggregatesInput | ExecutionTransactionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ExecutionTransaction"> | string
    idempotencyKey?: StringWithAggregatesFilter<"ExecutionTransaction"> | string
    kind?: EnumExecutionTransactionKindWithAggregatesFilter<"ExecutionTransaction"> | $Enums.ExecutionTransactionKind
    state?: EnumExecutionTransactionStateWithAggregatesFilter<"ExecutionTransaction"> | $Enums.ExecutionTransactionState
    sourceWalletId?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    sourceAccountId?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    amountMinor?: BigIntWithAggregatesFilter<"ExecutionTransaction"> | bigint | number
    currency?: StringWithAggregatesFilter<"ExecutionTransaction"> | string
    destinationWalletId?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    destinationAccountId?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    destinationAddress?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    destinationChain?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    asset?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    ledgerTransactionId?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    ledgerEntryId?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    reversalEntryId?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    broadcastJobId?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    txHash?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    intentId?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    orgId?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    memo?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"ExecutionTransaction">
    error?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    routeDecisionId?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    selectedRail?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    quoteId?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    quoteSignature?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    riskAssessmentId?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    riskScore?: IntNullableWithAggregatesFilter<"ExecutionTransaction"> | number | null
    complianceRunId?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    complianceCaseId?: StringNullableWithAggregatesFilter<"ExecutionTransaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ExecutionTransaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ExecutionTransaction"> | Date | string
    settledAt?: DateTimeNullableWithAggregatesFilter<"ExecutionTransaction"> | Date | string | null
  }

  export type ExecutionTransactionEventWhereInput = {
    AND?: ExecutionTransactionEventWhereInput | ExecutionTransactionEventWhereInput[]
    OR?: ExecutionTransactionEventWhereInput[]
    NOT?: ExecutionTransactionEventWhereInput | ExecutionTransactionEventWhereInput[]
    id?: UuidFilter<"ExecutionTransactionEvent"> | string
    transactionId?: UuidFilter<"ExecutionTransactionEvent"> | string
    fromState?: EnumExecutionTransactionStateNullableFilter<"ExecutionTransactionEvent"> | $Enums.ExecutionTransactionState | null
    toState?: EnumExecutionTransactionStateFilter<"ExecutionTransactionEvent"> | $Enums.ExecutionTransactionState
    reason?: StringNullableFilter<"ExecutionTransactionEvent"> | string | null
    detail?: JsonNullableFilter<"ExecutionTransactionEvent">
    occurredAt?: DateTimeFilter<"ExecutionTransactionEvent"> | Date | string
    transaction?: XOR<ExecutionTransactionRelationFilter, ExecutionTransactionWhereInput>
  }

  export type ExecutionTransactionEventOrderByWithRelationInput = {
    id?: SortOrder
    transactionId?: SortOrder
    fromState?: SortOrderInput | SortOrder
    toState?: SortOrder
    reason?: SortOrderInput | SortOrder
    detail?: SortOrderInput | SortOrder
    occurredAt?: SortOrder
    transaction?: ExecutionTransactionOrderByWithRelationInput
  }

  export type ExecutionTransactionEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExecutionTransactionEventWhereInput | ExecutionTransactionEventWhereInput[]
    OR?: ExecutionTransactionEventWhereInput[]
    NOT?: ExecutionTransactionEventWhereInput | ExecutionTransactionEventWhereInput[]
    transactionId?: UuidFilter<"ExecutionTransactionEvent"> | string
    fromState?: EnumExecutionTransactionStateNullableFilter<"ExecutionTransactionEvent"> | $Enums.ExecutionTransactionState | null
    toState?: EnumExecutionTransactionStateFilter<"ExecutionTransactionEvent"> | $Enums.ExecutionTransactionState
    reason?: StringNullableFilter<"ExecutionTransactionEvent"> | string | null
    detail?: JsonNullableFilter<"ExecutionTransactionEvent">
    occurredAt?: DateTimeFilter<"ExecutionTransactionEvent"> | Date | string
    transaction?: XOR<ExecutionTransactionRelationFilter, ExecutionTransactionWhereInput>
  }, "id">

  export type ExecutionTransactionEventOrderByWithAggregationInput = {
    id?: SortOrder
    transactionId?: SortOrder
    fromState?: SortOrderInput | SortOrder
    toState?: SortOrder
    reason?: SortOrderInput | SortOrder
    detail?: SortOrderInput | SortOrder
    occurredAt?: SortOrder
    _count?: ExecutionTransactionEventCountOrderByAggregateInput
    _max?: ExecutionTransactionEventMaxOrderByAggregateInput
    _min?: ExecutionTransactionEventMinOrderByAggregateInput
  }

  export type ExecutionTransactionEventScalarWhereWithAggregatesInput = {
    AND?: ExecutionTransactionEventScalarWhereWithAggregatesInput | ExecutionTransactionEventScalarWhereWithAggregatesInput[]
    OR?: ExecutionTransactionEventScalarWhereWithAggregatesInput[]
    NOT?: ExecutionTransactionEventScalarWhereWithAggregatesInput | ExecutionTransactionEventScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ExecutionTransactionEvent"> | string
    transactionId?: UuidWithAggregatesFilter<"ExecutionTransactionEvent"> | string
    fromState?: EnumExecutionTransactionStateNullableWithAggregatesFilter<"ExecutionTransactionEvent"> | $Enums.ExecutionTransactionState | null
    toState?: EnumExecutionTransactionStateWithAggregatesFilter<"ExecutionTransactionEvent"> | $Enums.ExecutionTransactionState
    reason?: StringNullableWithAggregatesFilter<"ExecutionTransactionEvent"> | string | null
    detail?: JsonNullableWithAggregatesFilter<"ExecutionTransactionEvent">
    occurredAt?: DateTimeWithAggregatesFilter<"ExecutionTransactionEvent"> | Date | string
  }

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

  export type ExecutionConsumerCursorWhereInput = {
    AND?: ExecutionConsumerCursorWhereInput | ExecutionConsumerCursorWhereInput[]
    OR?: ExecutionConsumerCursorWhereInput[]
    NOT?: ExecutionConsumerCursorWhereInput | ExecutionConsumerCursorWhereInput[]
    consumerName?: StringFilter<"ExecutionConsumerCursor"> | string
    lastEventId?: StringNullableFilter<"ExecutionConsumerCursor"> | string | null
    lastSeenAt?: DateTimeFilter<"ExecutionConsumerCursor"> | Date | string
  }

  export type ExecutionConsumerCursorOrderByWithRelationInput = {
    consumerName?: SortOrder
    lastEventId?: SortOrderInput | SortOrder
    lastSeenAt?: SortOrder
  }

  export type ExecutionConsumerCursorWhereUniqueInput = Prisma.AtLeast<{
    consumerName?: string
    AND?: ExecutionConsumerCursorWhereInput | ExecutionConsumerCursorWhereInput[]
    OR?: ExecutionConsumerCursorWhereInput[]
    NOT?: ExecutionConsumerCursorWhereInput | ExecutionConsumerCursorWhereInput[]
    lastEventId?: StringNullableFilter<"ExecutionConsumerCursor"> | string | null
    lastSeenAt?: DateTimeFilter<"ExecutionConsumerCursor"> | Date | string
  }, "consumerName">

  export type ExecutionConsumerCursorOrderByWithAggregationInput = {
    consumerName?: SortOrder
    lastEventId?: SortOrderInput | SortOrder
    lastSeenAt?: SortOrder
    _count?: ExecutionConsumerCursorCountOrderByAggregateInput
    _max?: ExecutionConsumerCursorMaxOrderByAggregateInput
    _min?: ExecutionConsumerCursorMinOrderByAggregateInput
  }

  export type ExecutionConsumerCursorScalarWhereWithAggregatesInput = {
    AND?: ExecutionConsumerCursorScalarWhereWithAggregatesInput | ExecutionConsumerCursorScalarWhereWithAggregatesInput[]
    OR?: ExecutionConsumerCursorScalarWhereWithAggregatesInput[]
    NOT?: ExecutionConsumerCursorScalarWhereWithAggregatesInput | ExecutionConsumerCursorScalarWhereWithAggregatesInput[]
    consumerName?: StringWithAggregatesFilter<"ExecutionConsumerCursor"> | string
    lastEventId?: StringNullableWithAggregatesFilter<"ExecutionConsumerCursor"> | string | null
    lastSeenAt?: DateTimeWithAggregatesFilter<"ExecutionConsumerCursor"> | Date | string
  }

  export type EscrowDealWhereInput = {
    AND?: EscrowDealWhereInput | EscrowDealWhereInput[]
    OR?: EscrowDealWhereInput[]
    NOT?: EscrowDealWhereInput | EscrowDealWhereInput[]
    id?: UuidFilter<"EscrowDeal"> | string
    dealId?: StringFilter<"EscrowDeal"> | string
    transactionId?: UuidNullableFilter<"EscrowDeal"> | string | null
    status?: EnumEscrowDealStatusFilter<"EscrowDeal"> | $Enums.EscrowDealStatus
    payer?: StringFilter<"EscrowDeal"> | string
    payee?: StringFilter<"EscrowDeal"> | string
    token?: StringFilter<"EscrowDeal"> | string
    amountMinor?: BigIntFilter<"EscrowDeal"> | bigint | number
    deadline?: BigIntFilter<"EscrowDeal"> | bigint | number
    escrowContract?: StringFilter<"EscrowDeal"> | string
    fundTxHash?: StringNullableFilter<"EscrowDeal"> | string | null
    resolveTxHash?: StringNullableFilter<"EscrowDeal"> | string | null
    resolution?: EnumEscrowResolutionNullableFilter<"EscrowDeal"> | $Enums.EscrowResolution | null
    condition?: JsonNullableFilter<"EscrowDeal">
    fundedAt?: DateTimeNullableFilter<"EscrowDeal"> | Date | string | null
    resolvedAt?: DateTimeNullableFilter<"EscrowDeal"> | Date | string | null
    createdAt?: DateTimeFilter<"EscrowDeal"> | Date | string
    updatedAt?: DateTimeFilter<"EscrowDeal"> | Date | string
    events?: EscrowDealEventListRelationFilter
  }

  export type EscrowDealOrderByWithRelationInput = {
    id?: SortOrder
    dealId?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    status?: SortOrder
    payer?: SortOrder
    payee?: SortOrder
    token?: SortOrder
    amountMinor?: SortOrder
    deadline?: SortOrder
    escrowContract?: SortOrder
    fundTxHash?: SortOrderInput | SortOrder
    resolveTxHash?: SortOrderInput | SortOrder
    resolution?: SortOrderInput | SortOrder
    condition?: SortOrderInput | SortOrder
    fundedAt?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    events?: EscrowDealEventOrderByRelationAggregateInput
  }

  export type EscrowDealWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    dealId?: string
    AND?: EscrowDealWhereInput | EscrowDealWhereInput[]
    OR?: EscrowDealWhereInput[]
    NOT?: EscrowDealWhereInput | EscrowDealWhereInput[]
    transactionId?: UuidNullableFilter<"EscrowDeal"> | string | null
    status?: EnumEscrowDealStatusFilter<"EscrowDeal"> | $Enums.EscrowDealStatus
    payer?: StringFilter<"EscrowDeal"> | string
    payee?: StringFilter<"EscrowDeal"> | string
    token?: StringFilter<"EscrowDeal"> | string
    amountMinor?: BigIntFilter<"EscrowDeal"> | bigint | number
    deadline?: BigIntFilter<"EscrowDeal"> | bigint | number
    escrowContract?: StringFilter<"EscrowDeal"> | string
    fundTxHash?: StringNullableFilter<"EscrowDeal"> | string | null
    resolveTxHash?: StringNullableFilter<"EscrowDeal"> | string | null
    resolution?: EnumEscrowResolutionNullableFilter<"EscrowDeal"> | $Enums.EscrowResolution | null
    condition?: JsonNullableFilter<"EscrowDeal">
    fundedAt?: DateTimeNullableFilter<"EscrowDeal"> | Date | string | null
    resolvedAt?: DateTimeNullableFilter<"EscrowDeal"> | Date | string | null
    createdAt?: DateTimeFilter<"EscrowDeal"> | Date | string
    updatedAt?: DateTimeFilter<"EscrowDeal"> | Date | string
    events?: EscrowDealEventListRelationFilter
  }, "id" | "dealId">

  export type EscrowDealOrderByWithAggregationInput = {
    id?: SortOrder
    dealId?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    status?: SortOrder
    payer?: SortOrder
    payee?: SortOrder
    token?: SortOrder
    amountMinor?: SortOrder
    deadline?: SortOrder
    escrowContract?: SortOrder
    fundTxHash?: SortOrderInput | SortOrder
    resolveTxHash?: SortOrderInput | SortOrder
    resolution?: SortOrderInput | SortOrder
    condition?: SortOrderInput | SortOrder
    fundedAt?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EscrowDealCountOrderByAggregateInput
    _avg?: EscrowDealAvgOrderByAggregateInput
    _max?: EscrowDealMaxOrderByAggregateInput
    _min?: EscrowDealMinOrderByAggregateInput
    _sum?: EscrowDealSumOrderByAggregateInput
  }

  export type EscrowDealScalarWhereWithAggregatesInput = {
    AND?: EscrowDealScalarWhereWithAggregatesInput | EscrowDealScalarWhereWithAggregatesInput[]
    OR?: EscrowDealScalarWhereWithAggregatesInput[]
    NOT?: EscrowDealScalarWhereWithAggregatesInput | EscrowDealScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"EscrowDeal"> | string
    dealId?: StringWithAggregatesFilter<"EscrowDeal"> | string
    transactionId?: UuidNullableWithAggregatesFilter<"EscrowDeal"> | string | null
    status?: EnumEscrowDealStatusWithAggregatesFilter<"EscrowDeal"> | $Enums.EscrowDealStatus
    payer?: StringWithAggregatesFilter<"EscrowDeal"> | string
    payee?: StringWithAggregatesFilter<"EscrowDeal"> | string
    token?: StringWithAggregatesFilter<"EscrowDeal"> | string
    amountMinor?: BigIntWithAggregatesFilter<"EscrowDeal"> | bigint | number
    deadline?: BigIntWithAggregatesFilter<"EscrowDeal"> | bigint | number
    escrowContract?: StringWithAggregatesFilter<"EscrowDeal"> | string
    fundTxHash?: StringNullableWithAggregatesFilter<"EscrowDeal"> | string | null
    resolveTxHash?: StringNullableWithAggregatesFilter<"EscrowDeal"> | string | null
    resolution?: EnumEscrowResolutionNullableWithAggregatesFilter<"EscrowDeal"> | $Enums.EscrowResolution | null
    condition?: JsonNullableWithAggregatesFilter<"EscrowDeal">
    fundedAt?: DateTimeNullableWithAggregatesFilter<"EscrowDeal"> | Date | string | null
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"EscrowDeal"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EscrowDeal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EscrowDeal"> | Date | string
  }

  export type EscrowDealEventWhereInput = {
    AND?: EscrowDealEventWhereInput | EscrowDealEventWhereInput[]
    OR?: EscrowDealEventWhereInput[]
    NOT?: EscrowDealEventWhereInput | EscrowDealEventWhereInput[]
    id?: UuidFilter<"EscrowDealEvent"> | string
    dealRowId?: UuidFilter<"EscrowDealEvent"> | string
    type?: StringFilter<"EscrowDealEvent"> | string
    detail?: JsonNullableFilter<"EscrowDealEvent">
    txHash?: StringNullableFilter<"EscrowDealEvent"> | string | null
    occurredAt?: DateTimeFilter<"EscrowDealEvent"> | Date | string
    deal?: XOR<EscrowDealRelationFilter, EscrowDealWhereInput>
  }

  export type EscrowDealEventOrderByWithRelationInput = {
    id?: SortOrder
    dealRowId?: SortOrder
    type?: SortOrder
    detail?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    occurredAt?: SortOrder
    deal?: EscrowDealOrderByWithRelationInput
  }

  export type EscrowDealEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EscrowDealEventWhereInput | EscrowDealEventWhereInput[]
    OR?: EscrowDealEventWhereInput[]
    NOT?: EscrowDealEventWhereInput | EscrowDealEventWhereInput[]
    dealRowId?: UuidFilter<"EscrowDealEvent"> | string
    type?: StringFilter<"EscrowDealEvent"> | string
    detail?: JsonNullableFilter<"EscrowDealEvent">
    txHash?: StringNullableFilter<"EscrowDealEvent"> | string | null
    occurredAt?: DateTimeFilter<"EscrowDealEvent"> | Date | string
    deal?: XOR<EscrowDealRelationFilter, EscrowDealWhereInput>
  }, "id">

  export type EscrowDealEventOrderByWithAggregationInput = {
    id?: SortOrder
    dealRowId?: SortOrder
    type?: SortOrder
    detail?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    occurredAt?: SortOrder
    _count?: EscrowDealEventCountOrderByAggregateInput
    _max?: EscrowDealEventMaxOrderByAggregateInput
    _min?: EscrowDealEventMinOrderByAggregateInput
  }

  export type EscrowDealEventScalarWhereWithAggregatesInput = {
    AND?: EscrowDealEventScalarWhereWithAggregatesInput | EscrowDealEventScalarWhereWithAggregatesInput[]
    OR?: EscrowDealEventScalarWhereWithAggregatesInput[]
    NOT?: EscrowDealEventScalarWhereWithAggregatesInput | EscrowDealEventScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"EscrowDealEvent"> | string
    dealRowId?: UuidWithAggregatesFilter<"EscrowDealEvent"> | string
    type?: StringWithAggregatesFilter<"EscrowDealEvent"> | string
    detail?: JsonNullableWithAggregatesFilter<"EscrowDealEvent">
    txHash?: StringNullableWithAggregatesFilter<"EscrowDealEvent"> | string | null
    occurredAt?: DateTimeWithAggregatesFilter<"EscrowDealEvent"> | Date | string
  }

  export type ReconciliationRunWhereInput = {
    AND?: ReconciliationRunWhereInput | ReconciliationRunWhereInput[]
    OR?: ReconciliationRunWhereInput[]
    NOT?: ReconciliationRunWhereInput | ReconciliationRunWhereInput[]
    id?: UuidFilter<"ReconciliationRun"> | string
    scope?: StringFilter<"ReconciliationRun"> | string
    status?: EnumReconciliationStatusFilter<"ReconciliationRun"> | $Enums.ReconciliationStatus
    startedAt?: DateTimeFilter<"ReconciliationRun"> | Date | string
    finishedAt?: DateTimeNullableFilter<"ReconciliationRun"> | Date | string | null
    checkedCount?: IntFilter<"ReconciliationRun"> | number
    breakCount?: IntFilter<"ReconciliationRun"> | number
    summary?: JsonNullableFilter<"ReconciliationRun">
    breaks?: ReconciliationBreakListRelationFilter
  }

  export type ReconciliationRunOrderByWithRelationInput = {
    id?: SortOrder
    scope?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrderInput | SortOrder
    checkedCount?: SortOrder
    breakCount?: SortOrder
    summary?: SortOrderInput | SortOrder
    breaks?: ReconciliationBreakOrderByRelationAggregateInput
  }

  export type ReconciliationRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReconciliationRunWhereInput | ReconciliationRunWhereInput[]
    OR?: ReconciliationRunWhereInput[]
    NOT?: ReconciliationRunWhereInput | ReconciliationRunWhereInput[]
    scope?: StringFilter<"ReconciliationRun"> | string
    status?: EnumReconciliationStatusFilter<"ReconciliationRun"> | $Enums.ReconciliationStatus
    startedAt?: DateTimeFilter<"ReconciliationRun"> | Date | string
    finishedAt?: DateTimeNullableFilter<"ReconciliationRun"> | Date | string | null
    checkedCount?: IntFilter<"ReconciliationRun"> | number
    breakCount?: IntFilter<"ReconciliationRun"> | number
    summary?: JsonNullableFilter<"ReconciliationRun">
    breaks?: ReconciliationBreakListRelationFilter
  }, "id">

  export type ReconciliationRunOrderByWithAggregationInput = {
    id?: SortOrder
    scope?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrderInput | SortOrder
    checkedCount?: SortOrder
    breakCount?: SortOrder
    summary?: SortOrderInput | SortOrder
    _count?: ReconciliationRunCountOrderByAggregateInput
    _avg?: ReconciliationRunAvgOrderByAggregateInput
    _max?: ReconciliationRunMaxOrderByAggregateInput
    _min?: ReconciliationRunMinOrderByAggregateInput
    _sum?: ReconciliationRunSumOrderByAggregateInput
  }

  export type ReconciliationRunScalarWhereWithAggregatesInput = {
    AND?: ReconciliationRunScalarWhereWithAggregatesInput | ReconciliationRunScalarWhereWithAggregatesInput[]
    OR?: ReconciliationRunScalarWhereWithAggregatesInput[]
    NOT?: ReconciliationRunScalarWhereWithAggregatesInput | ReconciliationRunScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ReconciliationRun"> | string
    scope?: StringWithAggregatesFilter<"ReconciliationRun"> | string
    status?: EnumReconciliationStatusWithAggregatesFilter<"ReconciliationRun"> | $Enums.ReconciliationStatus
    startedAt?: DateTimeWithAggregatesFilter<"ReconciliationRun"> | Date | string
    finishedAt?: DateTimeNullableWithAggregatesFilter<"ReconciliationRun"> | Date | string | null
    checkedCount?: IntWithAggregatesFilter<"ReconciliationRun"> | number
    breakCount?: IntWithAggregatesFilter<"ReconciliationRun"> | number
    summary?: JsonNullableWithAggregatesFilter<"ReconciliationRun">
  }

  export type ReconciliationBreakWhereInput = {
    AND?: ReconciliationBreakWhereInput | ReconciliationBreakWhereInput[]
    OR?: ReconciliationBreakWhereInput[]
    NOT?: ReconciliationBreakWhereInput | ReconciliationBreakWhereInput[]
    id?: UuidFilter<"ReconciliationBreak"> | string
    runId?: UuidFilter<"ReconciliationBreak"> | string
    kind?: StringFilter<"ReconciliationBreak"> | string
    reference?: StringNullableFilter<"ReconciliationBreak"> | string | null
    currency?: StringNullableFilter<"ReconciliationBreak"> | string | null
    expectedMinor?: StringNullableFilter<"ReconciliationBreak"> | string | null
    actualMinor?: StringNullableFilter<"ReconciliationBreak"> | string | null
    detail?: JsonNullableFilter<"ReconciliationBreak">
    createdAt?: DateTimeFilter<"ReconciliationBreak"> | Date | string
    run?: XOR<ReconciliationRunRelationFilter, ReconciliationRunWhereInput>
  }

  export type ReconciliationBreakOrderByWithRelationInput = {
    id?: SortOrder
    runId?: SortOrder
    kind?: SortOrder
    reference?: SortOrderInput | SortOrder
    currency?: SortOrderInput | SortOrder
    expectedMinor?: SortOrderInput | SortOrder
    actualMinor?: SortOrderInput | SortOrder
    detail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    run?: ReconciliationRunOrderByWithRelationInput
  }

  export type ReconciliationBreakWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReconciliationBreakWhereInput | ReconciliationBreakWhereInput[]
    OR?: ReconciliationBreakWhereInput[]
    NOT?: ReconciliationBreakWhereInput | ReconciliationBreakWhereInput[]
    runId?: UuidFilter<"ReconciliationBreak"> | string
    kind?: StringFilter<"ReconciliationBreak"> | string
    reference?: StringNullableFilter<"ReconciliationBreak"> | string | null
    currency?: StringNullableFilter<"ReconciliationBreak"> | string | null
    expectedMinor?: StringNullableFilter<"ReconciliationBreak"> | string | null
    actualMinor?: StringNullableFilter<"ReconciliationBreak"> | string | null
    detail?: JsonNullableFilter<"ReconciliationBreak">
    createdAt?: DateTimeFilter<"ReconciliationBreak"> | Date | string
    run?: XOR<ReconciliationRunRelationFilter, ReconciliationRunWhereInput>
  }, "id">

  export type ReconciliationBreakOrderByWithAggregationInput = {
    id?: SortOrder
    runId?: SortOrder
    kind?: SortOrder
    reference?: SortOrderInput | SortOrder
    currency?: SortOrderInput | SortOrder
    expectedMinor?: SortOrderInput | SortOrder
    actualMinor?: SortOrderInput | SortOrder
    detail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ReconciliationBreakCountOrderByAggregateInput
    _max?: ReconciliationBreakMaxOrderByAggregateInput
    _min?: ReconciliationBreakMinOrderByAggregateInput
  }

  export type ReconciliationBreakScalarWhereWithAggregatesInput = {
    AND?: ReconciliationBreakScalarWhereWithAggregatesInput | ReconciliationBreakScalarWhereWithAggregatesInput[]
    OR?: ReconciliationBreakScalarWhereWithAggregatesInput[]
    NOT?: ReconciliationBreakScalarWhereWithAggregatesInput | ReconciliationBreakScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ReconciliationBreak"> | string
    runId?: UuidWithAggregatesFilter<"ReconciliationBreak"> | string
    kind?: StringWithAggregatesFilter<"ReconciliationBreak"> | string
    reference?: StringNullableWithAggregatesFilter<"ReconciliationBreak"> | string | null
    currency?: StringNullableWithAggregatesFilter<"ReconciliationBreak"> | string | null
    expectedMinor?: StringNullableWithAggregatesFilter<"ReconciliationBreak"> | string | null
    actualMinor?: StringNullableWithAggregatesFilter<"ReconciliationBreak"> | string | null
    detail?: JsonNullableWithAggregatesFilter<"ReconciliationBreak">
    createdAt?: DateTimeWithAggregatesFilter<"ReconciliationBreak"> | Date | string
  }

  export type ExecutionTransactionCreateInput = {
    id?: string
    idempotencyKey: string
    kind: $Enums.ExecutionTransactionKind
    state?: $Enums.ExecutionTransactionState
    sourceWalletId?: string | null
    sourceAccountId?: string | null
    amountMinor: bigint | number
    currency: string
    destinationWalletId?: string | null
    destinationAccountId?: string | null
    destinationAddress?: string | null
    destinationChain?: string | null
    asset?: string | null
    ledgerTransactionId?: string | null
    ledgerEntryId?: string | null
    reversalEntryId?: string | null
    broadcastJobId?: string | null
    txHash?: string | null
    intentId?: string | null
    orgId?: string | null
    memo?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    routeDecisionId?: string | null
    selectedRail?: string | null
    quoteId?: string | null
    quoteSignature?: string | null
    riskAssessmentId?: string | null
    riskScore?: number | null
    complianceRunId?: string | null
    complianceCaseId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settledAt?: Date | string | null
    events?: ExecutionTransactionEventCreateNestedManyWithoutTransactionInput
  }

  export type ExecutionTransactionUncheckedCreateInput = {
    id?: string
    idempotencyKey: string
    kind: $Enums.ExecutionTransactionKind
    state?: $Enums.ExecutionTransactionState
    sourceWalletId?: string | null
    sourceAccountId?: string | null
    amountMinor: bigint | number
    currency: string
    destinationWalletId?: string | null
    destinationAccountId?: string | null
    destinationAddress?: string | null
    destinationChain?: string | null
    asset?: string | null
    ledgerTransactionId?: string | null
    ledgerEntryId?: string | null
    reversalEntryId?: string | null
    broadcastJobId?: string | null
    txHash?: string | null
    intentId?: string | null
    orgId?: string | null
    memo?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    routeDecisionId?: string | null
    selectedRail?: string | null
    quoteId?: string | null
    quoteSignature?: string | null
    riskAssessmentId?: string | null
    riskScore?: number | null
    complianceRunId?: string | null
    complianceCaseId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settledAt?: Date | string | null
    events?: ExecutionTransactionEventUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type ExecutionTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    kind?: EnumExecutionTransactionKindFieldUpdateOperationsInput | $Enums.ExecutionTransactionKind
    state?: EnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState
    sourceWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    destinationWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    destinationChain?: NullableStringFieldUpdateOperationsInput | string | null
    asset?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    reversalEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    broadcastJobId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    routeDecisionId?: NullableStringFieldUpdateOperationsInput | string | null
    selectedRail?: NullableStringFieldUpdateOperationsInput | string | null
    quoteId?: NullableStringFieldUpdateOperationsInput | string | null
    quoteSignature?: NullableStringFieldUpdateOperationsInput | string | null
    riskAssessmentId?: NullableStringFieldUpdateOperationsInput | string | null
    riskScore?: NullableIntFieldUpdateOperationsInput | number | null
    complianceRunId?: NullableStringFieldUpdateOperationsInput | string | null
    complianceCaseId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    events?: ExecutionTransactionEventUpdateManyWithoutTransactionNestedInput
  }

  export type ExecutionTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    kind?: EnumExecutionTransactionKindFieldUpdateOperationsInput | $Enums.ExecutionTransactionKind
    state?: EnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState
    sourceWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    destinationWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    destinationChain?: NullableStringFieldUpdateOperationsInput | string | null
    asset?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    reversalEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    broadcastJobId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    routeDecisionId?: NullableStringFieldUpdateOperationsInput | string | null
    selectedRail?: NullableStringFieldUpdateOperationsInput | string | null
    quoteId?: NullableStringFieldUpdateOperationsInput | string | null
    quoteSignature?: NullableStringFieldUpdateOperationsInput | string | null
    riskAssessmentId?: NullableStringFieldUpdateOperationsInput | string | null
    riskScore?: NullableIntFieldUpdateOperationsInput | number | null
    complianceRunId?: NullableStringFieldUpdateOperationsInput | string | null
    complianceCaseId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    events?: ExecutionTransactionEventUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type ExecutionTransactionCreateManyInput = {
    id?: string
    idempotencyKey: string
    kind: $Enums.ExecutionTransactionKind
    state?: $Enums.ExecutionTransactionState
    sourceWalletId?: string | null
    sourceAccountId?: string | null
    amountMinor: bigint | number
    currency: string
    destinationWalletId?: string | null
    destinationAccountId?: string | null
    destinationAddress?: string | null
    destinationChain?: string | null
    asset?: string | null
    ledgerTransactionId?: string | null
    ledgerEntryId?: string | null
    reversalEntryId?: string | null
    broadcastJobId?: string | null
    txHash?: string | null
    intentId?: string | null
    orgId?: string | null
    memo?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    routeDecisionId?: string | null
    selectedRail?: string | null
    quoteId?: string | null
    quoteSignature?: string | null
    riskAssessmentId?: string | null
    riskScore?: number | null
    complianceRunId?: string | null
    complianceCaseId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settledAt?: Date | string | null
  }

  export type ExecutionTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    kind?: EnumExecutionTransactionKindFieldUpdateOperationsInput | $Enums.ExecutionTransactionKind
    state?: EnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState
    sourceWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    destinationWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    destinationChain?: NullableStringFieldUpdateOperationsInput | string | null
    asset?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    reversalEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    broadcastJobId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    routeDecisionId?: NullableStringFieldUpdateOperationsInput | string | null
    selectedRail?: NullableStringFieldUpdateOperationsInput | string | null
    quoteId?: NullableStringFieldUpdateOperationsInput | string | null
    quoteSignature?: NullableStringFieldUpdateOperationsInput | string | null
    riskAssessmentId?: NullableStringFieldUpdateOperationsInput | string | null
    riskScore?: NullableIntFieldUpdateOperationsInput | number | null
    complianceRunId?: NullableStringFieldUpdateOperationsInput | string | null
    complianceCaseId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExecutionTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    kind?: EnumExecutionTransactionKindFieldUpdateOperationsInput | $Enums.ExecutionTransactionKind
    state?: EnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState
    sourceWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    destinationWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    destinationChain?: NullableStringFieldUpdateOperationsInput | string | null
    asset?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    reversalEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    broadcastJobId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    routeDecisionId?: NullableStringFieldUpdateOperationsInput | string | null
    selectedRail?: NullableStringFieldUpdateOperationsInput | string | null
    quoteId?: NullableStringFieldUpdateOperationsInput | string | null
    quoteSignature?: NullableStringFieldUpdateOperationsInput | string | null
    riskAssessmentId?: NullableStringFieldUpdateOperationsInput | string | null
    riskScore?: NullableIntFieldUpdateOperationsInput | number | null
    complianceRunId?: NullableStringFieldUpdateOperationsInput | string | null
    complianceCaseId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExecutionTransactionEventCreateInput = {
    id?: string
    fromState?: $Enums.ExecutionTransactionState | null
    toState: $Enums.ExecutionTransactionState
    reason?: string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    transaction: ExecutionTransactionCreateNestedOneWithoutEventsInput
  }

  export type ExecutionTransactionEventUncheckedCreateInput = {
    id?: string
    transactionId: string
    fromState?: $Enums.ExecutionTransactionState | null
    toState: $Enums.ExecutionTransactionState
    reason?: string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
  }

  export type ExecutionTransactionEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromState?: NullableEnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState | null
    toState?: EnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: ExecutionTransactionUpdateOneRequiredWithoutEventsNestedInput
  }

  export type ExecutionTransactionEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    fromState?: NullableEnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState | null
    toState?: EnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExecutionTransactionEventCreateManyInput = {
    id?: string
    transactionId: string
    fromState?: $Enums.ExecutionTransactionState | null
    toState: $Enums.ExecutionTransactionState
    reason?: string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
  }

  export type ExecutionTransactionEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromState?: NullableEnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState | null
    toState?: EnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExecutionTransactionEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    transactionId?: StringFieldUpdateOperationsInput | string
    fromState?: NullableEnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState | null
    toState?: EnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type ExecutionConsumerCursorCreateInput = {
    consumerName: string
    lastEventId?: string | null
    lastSeenAt?: Date | string
  }

  export type ExecutionConsumerCursorUncheckedCreateInput = {
    consumerName: string
    lastEventId?: string | null
    lastSeenAt?: Date | string
  }

  export type ExecutionConsumerCursorUpdateInput = {
    consumerName?: StringFieldUpdateOperationsInput | string
    lastEventId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExecutionConsumerCursorUncheckedUpdateInput = {
    consumerName?: StringFieldUpdateOperationsInput | string
    lastEventId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExecutionConsumerCursorCreateManyInput = {
    consumerName: string
    lastEventId?: string | null
    lastSeenAt?: Date | string
  }

  export type ExecutionConsumerCursorUpdateManyMutationInput = {
    consumerName?: StringFieldUpdateOperationsInput | string
    lastEventId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExecutionConsumerCursorUncheckedUpdateManyInput = {
    consumerName?: StringFieldUpdateOperationsInput | string
    lastEventId?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EscrowDealCreateInput = {
    id?: string
    dealId: string
    transactionId?: string | null
    status?: $Enums.EscrowDealStatus
    payer: string
    payee: string
    token: string
    amountMinor: bigint | number
    deadline: bigint | number
    escrowContract: string
    fundTxHash?: string | null
    resolveTxHash?: string | null
    resolution?: $Enums.EscrowResolution | null
    condition?: NullableJsonNullValueInput | InputJsonValue
    fundedAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EscrowDealEventCreateNestedManyWithoutDealInput
  }

  export type EscrowDealUncheckedCreateInput = {
    id?: string
    dealId: string
    transactionId?: string | null
    status?: $Enums.EscrowDealStatus
    payer: string
    payee: string
    token: string
    amountMinor: bigint | number
    deadline: bigint | number
    escrowContract: string
    fundTxHash?: string | null
    resolveTxHash?: string | null
    resolution?: $Enums.EscrowResolution | null
    condition?: NullableJsonNullValueInput | InputJsonValue
    fundedAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    events?: EscrowDealEventUncheckedCreateNestedManyWithoutDealInput
  }

  export type EscrowDealUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dealId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEscrowDealStatusFieldUpdateOperationsInput | $Enums.EscrowDealStatus
    payer?: StringFieldUpdateOperationsInput | string
    payee?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    deadline?: BigIntFieldUpdateOperationsInput | bigint | number
    escrowContract?: StringFieldUpdateOperationsInput | string
    fundTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    resolveTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableEnumEscrowResolutionFieldUpdateOperationsInput | $Enums.EscrowResolution | null
    condition?: NullableJsonNullValueInput | InputJsonValue
    fundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EscrowDealEventUpdateManyWithoutDealNestedInput
  }

  export type EscrowDealUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dealId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEscrowDealStatusFieldUpdateOperationsInput | $Enums.EscrowDealStatus
    payer?: StringFieldUpdateOperationsInput | string
    payee?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    deadline?: BigIntFieldUpdateOperationsInput | bigint | number
    escrowContract?: StringFieldUpdateOperationsInput | string
    fundTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    resolveTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableEnumEscrowResolutionFieldUpdateOperationsInput | $Enums.EscrowResolution | null
    condition?: NullableJsonNullValueInput | InputJsonValue
    fundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    events?: EscrowDealEventUncheckedUpdateManyWithoutDealNestedInput
  }

  export type EscrowDealCreateManyInput = {
    id?: string
    dealId: string
    transactionId?: string | null
    status?: $Enums.EscrowDealStatus
    payer: string
    payee: string
    token: string
    amountMinor: bigint | number
    deadline: bigint | number
    escrowContract: string
    fundTxHash?: string | null
    resolveTxHash?: string | null
    resolution?: $Enums.EscrowResolution | null
    condition?: NullableJsonNullValueInput | InputJsonValue
    fundedAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EscrowDealUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dealId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEscrowDealStatusFieldUpdateOperationsInput | $Enums.EscrowDealStatus
    payer?: StringFieldUpdateOperationsInput | string
    payee?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    deadline?: BigIntFieldUpdateOperationsInput | bigint | number
    escrowContract?: StringFieldUpdateOperationsInput | string
    fundTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    resolveTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableEnumEscrowResolutionFieldUpdateOperationsInput | $Enums.EscrowResolution | null
    condition?: NullableJsonNullValueInput | InputJsonValue
    fundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EscrowDealUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dealId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEscrowDealStatusFieldUpdateOperationsInput | $Enums.EscrowDealStatus
    payer?: StringFieldUpdateOperationsInput | string
    payee?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    deadline?: BigIntFieldUpdateOperationsInput | bigint | number
    escrowContract?: StringFieldUpdateOperationsInput | string
    fundTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    resolveTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableEnumEscrowResolutionFieldUpdateOperationsInput | $Enums.EscrowResolution | null
    condition?: NullableJsonNullValueInput | InputJsonValue
    fundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EscrowDealEventCreateInput = {
    id?: string
    type: string
    detail?: NullableJsonNullValueInput | InputJsonValue
    txHash?: string | null
    occurredAt?: Date | string
    deal: EscrowDealCreateNestedOneWithoutEventsInput
  }

  export type EscrowDealEventUncheckedCreateInput = {
    id?: string
    dealRowId: string
    type: string
    detail?: NullableJsonNullValueInput | InputJsonValue
    txHash?: string | null
    occurredAt?: Date | string
  }

  export type EscrowDealEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    detail?: NullableJsonNullValueInput | InputJsonValue
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deal?: EscrowDealUpdateOneRequiredWithoutEventsNestedInput
  }

  export type EscrowDealEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dealRowId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    detail?: NullableJsonNullValueInput | InputJsonValue
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EscrowDealEventCreateManyInput = {
    id?: string
    dealRowId: string
    type: string
    detail?: NullableJsonNullValueInput | InputJsonValue
    txHash?: string | null
    occurredAt?: Date | string
  }

  export type EscrowDealEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    detail?: NullableJsonNullValueInput | InputJsonValue
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EscrowDealEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dealRowId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    detail?: NullableJsonNullValueInput | InputJsonValue
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReconciliationRunCreateInput = {
    id?: string
    scope: string
    status?: $Enums.ReconciliationStatus
    startedAt?: Date | string
    finishedAt?: Date | string | null
    checkedCount?: number
    breakCount?: number
    summary?: NullableJsonNullValueInput | InputJsonValue
    breaks?: ReconciliationBreakCreateNestedManyWithoutRunInput
  }

  export type ReconciliationRunUncheckedCreateInput = {
    id?: string
    scope: string
    status?: $Enums.ReconciliationStatus
    startedAt?: Date | string
    finishedAt?: Date | string | null
    checkedCount?: number
    breakCount?: number
    summary?: NullableJsonNullValueInput | InputJsonValue
    breaks?: ReconciliationBreakUncheckedCreateNestedManyWithoutRunInput
  }

  export type ReconciliationRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    status?: EnumReconciliationStatusFieldUpdateOperationsInput | $Enums.ReconciliationStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedCount?: IntFieldUpdateOperationsInput | number
    breakCount?: IntFieldUpdateOperationsInput | number
    summary?: NullableJsonNullValueInput | InputJsonValue
    breaks?: ReconciliationBreakUpdateManyWithoutRunNestedInput
  }

  export type ReconciliationRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    status?: EnumReconciliationStatusFieldUpdateOperationsInput | $Enums.ReconciliationStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedCount?: IntFieldUpdateOperationsInput | number
    breakCount?: IntFieldUpdateOperationsInput | number
    summary?: NullableJsonNullValueInput | InputJsonValue
    breaks?: ReconciliationBreakUncheckedUpdateManyWithoutRunNestedInput
  }

  export type ReconciliationRunCreateManyInput = {
    id?: string
    scope: string
    status?: $Enums.ReconciliationStatus
    startedAt?: Date | string
    finishedAt?: Date | string | null
    checkedCount?: number
    breakCount?: number
    summary?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ReconciliationRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    status?: EnumReconciliationStatusFieldUpdateOperationsInput | $Enums.ReconciliationStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedCount?: IntFieldUpdateOperationsInput | number
    breakCount?: IntFieldUpdateOperationsInput | number
    summary?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ReconciliationRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    status?: EnumReconciliationStatusFieldUpdateOperationsInput | $Enums.ReconciliationStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedCount?: IntFieldUpdateOperationsInput | number
    breakCount?: IntFieldUpdateOperationsInput | number
    summary?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ReconciliationBreakCreateInput = {
    id?: string
    kind: string
    reference?: string | null
    currency?: string | null
    expectedMinor?: string | null
    actualMinor?: string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    run: ReconciliationRunCreateNestedOneWithoutBreaksInput
  }

  export type ReconciliationBreakUncheckedCreateInput = {
    id?: string
    runId: string
    kind: string
    reference?: string | null
    currency?: string | null
    expectedMinor?: string | null
    actualMinor?: string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ReconciliationBreakUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    expectedMinor?: NullableStringFieldUpdateOperationsInput | string | null
    actualMinor?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    run?: ReconciliationRunUpdateOneRequiredWithoutBreaksNestedInput
  }

  export type ReconciliationBreakUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    expectedMinor?: NullableStringFieldUpdateOperationsInput | string | null
    actualMinor?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReconciliationBreakCreateManyInput = {
    id?: string
    runId: string
    kind: string
    reference?: string | null
    currency?: string | null
    expectedMinor?: string | null
    actualMinor?: string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ReconciliationBreakUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    expectedMinor?: NullableStringFieldUpdateOperationsInput | string | null
    actualMinor?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReconciliationBreakUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    expectedMinor?: NullableStringFieldUpdateOperationsInput | string | null
    actualMinor?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
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

  export type EnumExecutionTransactionKindFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionTransactionKind | EnumExecutionTransactionKindFieldRefInput<$PrismaModel>
    in?: $Enums.ExecutionTransactionKind[] | ListEnumExecutionTransactionKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExecutionTransactionKind[] | ListEnumExecutionTransactionKindFieldRefInput<$PrismaModel>
    not?: NestedEnumExecutionTransactionKindFilter<$PrismaModel> | $Enums.ExecutionTransactionKind
  }

  export type EnumExecutionTransactionStateFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionTransactionState | EnumExecutionTransactionStateFieldRefInput<$PrismaModel>
    in?: $Enums.ExecutionTransactionState[] | ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExecutionTransactionState[] | ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel>
    not?: NestedEnumExecutionTransactionStateFilter<$PrismaModel> | $Enums.ExecutionTransactionState
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

  export type ExecutionTransactionEventListRelationFilter = {
    every?: ExecutionTransactionEventWhereInput
    some?: ExecutionTransactionEventWhereInput
    none?: ExecutionTransactionEventWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ExecutionTransactionEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExecutionTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    kind?: SortOrder
    state?: SortOrder
    sourceWalletId?: SortOrder
    sourceAccountId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    destinationWalletId?: SortOrder
    destinationAccountId?: SortOrder
    destinationAddress?: SortOrder
    destinationChain?: SortOrder
    asset?: SortOrder
    ledgerTransactionId?: SortOrder
    ledgerEntryId?: SortOrder
    reversalEntryId?: SortOrder
    broadcastJobId?: SortOrder
    txHash?: SortOrder
    intentId?: SortOrder
    orgId?: SortOrder
    memo?: SortOrder
    metadata?: SortOrder
    error?: SortOrder
    routeDecisionId?: SortOrder
    selectedRail?: SortOrder
    quoteId?: SortOrder
    quoteSignature?: SortOrder
    riskAssessmentId?: SortOrder
    riskScore?: SortOrder
    complianceRunId?: SortOrder
    complianceCaseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settledAt?: SortOrder
  }

  export type ExecutionTransactionAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
    riskScore?: SortOrder
  }

  export type ExecutionTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    kind?: SortOrder
    state?: SortOrder
    sourceWalletId?: SortOrder
    sourceAccountId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    destinationWalletId?: SortOrder
    destinationAccountId?: SortOrder
    destinationAddress?: SortOrder
    destinationChain?: SortOrder
    asset?: SortOrder
    ledgerTransactionId?: SortOrder
    ledgerEntryId?: SortOrder
    reversalEntryId?: SortOrder
    broadcastJobId?: SortOrder
    txHash?: SortOrder
    intentId?: SortOrder
    orgId?: SortOrder
    memo?: SortOrder
    error?: SortOrder
    routeDecisionId?: SortOrder
    selectedRail?: SortOrder
    quoteId?: SortOrder
    quoteSignature?: SortOrder
    riskAssessmentId?: SortOrder
    riskScore?: SortOrder
    complianceRunId?: SortOrder
    complianceCaseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settledAt?: SortOrder
  }

  export type ExecutionTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    kind?: SortOrder
    state?: SortOrder
    sourceWalletId?: SortOrder
    sourceAccountId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    destinationWalletId?: SortOrder
    destinationAccountId?: SortOrder
    destinationAddress?: SortOrder
    destinationChain?: SortOrder
    asset?: SortOrder
    ledgerTransactionId?: SortOrder
    ledgerEntryId?: SortOrder
    reversalEntryId?: SortOrder
    broadcastJobId?: SortOrder
    txHash?: SortOrder
    intentId?: SortOrder
    orgId?: SortOrder
    memo?: SortOrder
    error?: SortOrder
    routeDecisionId?: SortOrder
    selectedRail?: SortOrder
    quoteId?: SortOrder
    quoteSignature?: SortOrder
    riskAssessmentId?: SortOrder
    riskScore?: SortOrder
    complianceRunId?: SortOrder
    complianceCaseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    settledAt?: SortOrder
  }

  export type ExecutionTransactionSumOrderByAggregateInput = {
    amountMinor?: SortOrder
    riskScore?: SortOrder
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

  export type EnumExecutionTransactionKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionTransactionKind | EnumExecutionTransactionKindFieldRefInput<$PrismaModel>
    in?: $Enums.ExecutionTransactionKind[] | ListEnumExecutionTransactionKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExecutionTransactionKind[] | ListEnumExecutionTransactionKindFieldRefInput<$PrismaModel>
    not?: NestedEnumExecutionTransactionKindWithAggregatesFilter<$PrismaModel> | $Enums.ExecutionTransactionKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExecutionTransactionKindFilter<$PrismaModel>
    _max?: NestedEnumExecutionTransactionKindFilter<$PrismaModel>
  }

  export type EnumExecutionTransactionStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionTransactionState | EnumExecutionTransactionStateFieldRefInput<$PrismaModel>
    in?: $Enums.ExecutionTransactionState[] | ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExecutionTransactionState[] | ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel>
    not?: NestedEnumExecutionTransactionStateWithAggregatesFilter<$PrismaModel> | $Enums.ExecutionTransactionState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExecutionTransactionStateFilter<$PrismaModel>
    _max?: NestedEnumExecutionTransactionStateFilter<$PrismaModel>
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

  export type EnumExecutionTransactionStateNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionTransactionState | EnumExecutionTransactionStateFieldRefInput<$PrismaModel> | null
    in?: $Enums.ExecutionTransactionState[] | ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ExecutionTransactionState[] | ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel> | null
    not?: NestedEnumExecutionTransactionStateNullableFilter<$PrismaModel> | $Enums.ExecutionTransactionState | null
  }

  export type ExecutionTransactionRelationFilter = {
    is?: ExecutionTransactionWhereInput
    isNot?: ExecutionTransactionWhereInput
  }

  export type ExecutionTransactionEventCountOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    fromState?: SortOrder
    toState?: SortOrder
    reason?: SortOrder
    detail?: SortOrder
    occurredAt?: SortOrder
  }

  export type ExecutionTransactionEventMaxOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    fromState?: SortOrder
    toState?: SortOrder
    reason?: SortOrder
    occurredAt?: SortOrder
  }

  export type ExecutionTransactionEventMinOrderByAggregateInput = {
    id?: SortOrder
    transactionId?: SortOrder
    fromState?: SortOrder
    toState?: SortOrder
    reason?: SortOrder
    occurredAt?: SortOrder
  }

  export type EnumExecutionTransactionStateNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionTransactionState | EnumExecutionTransactionStateFieldRefInput<$PrismaModel> | null
    in?: $Enums.ExecutionTransactionState[] | ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ExecutionTransactionState[] | ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel> | null
    not?: NestedEnumExecutionTransactionStateNullableWithAggregatesFilter<$PrismaModel> | $Enums.ExecutionTransactionState | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumExecutionTransactionStateNullableFilter<$PrismaModel>
    _max?: NestedEnumExecutionTransactionStateNullableFilter<$PrismaModel>
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

  export type ExecutionConsumerCursorCountOrderByAggregateInput = {
    consumerName?: SortOrder
    lastEventId?: SortOrder
    lastSeenAt?: SortOrder
  }

  export type ExecutionConsumerCursorMaxOrderByAggregateInput = {
    consumerName?: SortOrder
    lastEventId?: SortOrder
    lastSeenAt?: SortOrder
  }

  export type ExecutionConsumerCursorMinOrderByAggregateInput = {
    consumerName?: SortOrder
    lastEventId?: SortOrder
    lastSeenAt?: SortOrder
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type EnumEscrowDealStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EscrowDealStatus | EnumEscrowDealStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EscrowDealStatus[] | ListEnumEscrowDealStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EscrowDealStatus[] | ListEnumEscrowDealStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEscrowDealStatusFilter<$PrismaModel> | $Enums.EscrowDealStatus
  }

  export type EnumEscrowResolutionNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EscrowResolution | EnumEscrowResolutionFieldRefInput<$PrismaModel> | null
    in?: $Enums.EscrowResolution[] | ListEnumEscrowResolutionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EscrowResolution[] | ListEnumEscrowResolutionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEscrowResolutionNullableFilter<$PrismaModel> | $Enums.EscrowResolution | null
  }

  export type EscrowDealEventListRelationFilter = {
    every?: EscrowDealEventWhereInput
    some?: EscrowDealEventWhereInput
    none?: EscrowDealEventWhereInput
  }

  export type EscrowDealEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EscrowDealCountOrderByAggregateInput = {
    id?: SortOrder
    dealId?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
    payer?: SortOrder
    payee?: SortOrder
    token?: SortOrder
    amountMinor?: SortOrder
    deadline?: SortOrder
    escrowContract?: SortOrder
    fundTxHash?: SortOrder
    resolveTxHash?: SortOrder
    resolution?: SortOrder
    condition?: SortOrder
    fundedAt?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EscrowDealAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
    deadline?: SortOrder
  }

  export type EscrowDealMaxOrderByAggregateInput = {
    id?: SortOrder
    dealId?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
    payer?: SortOrder
    payee?: SortOrder
    token?: SortOrder
    amountMinor?: SortOrder
    deadline?: SortOrder
    escrowContract?: SortOrder
    fundTxHash?: SortOrder
    resolveTxHash?: SortOrder
    resolution?: SortOrder
    fundedAt?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EscrowDealMinOrderByAggregateInput = {
    id?: SortOrder
    dealId?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
    payer?: SortOrder
    payee?: SortOrder
    token?: SortOrder
    amountMinor?: SortOrder
    deadline?: SortOrder
    escrowContract?: SortOrder
    fundTxHash?: SortOrder
    resolveTxHash?: SortOrder
    resolution?: SortOrder
    fundedAt?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EscrowDealSumOrderByAggregateInput = {
    amountMinor?: SortOrder
    deadline?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumEscrowDealStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EscrowDealStatus | EnumEscrowDealStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EscrowDealStatus[] | ListEnumEscrowDealStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EscrowDealStatus[] | ListEnumEscrowDealStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEscrowDealStatusWithAggregatesFilter<$PrismaModel> | $Enums.EscrowDealStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEscrowDealStatusFilter<$PrismaModel>
    _max?: NestedEnumEscrowDealStatusFilter<$PrismaModel>
  }

  export type EnumEscrowResolutionNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EscrowResolution | EnumEscrowResolutionFieldRefInput<$PrismaModel> | null
    in?: $Enums.EscrowResolution[] | ListEnumEscrowResolutionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EscrowResolution[] | ListEnumEscrowResolutionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEscrowResolutionNullableWithAggregatesFilter<$PrismaModel> | $Enums.EscrowResolution | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEscrowResolutionNullableFilter<$PrismaModel>
    _max?: NestedEnumEscrowResolutionNullableFilter<$PrismaModel>
  }

  export type EscrowDealRelationFilter = {
    is?: EscrowDealWhereInput
    isNot?: EscrowDealWhereInput
  }

  export type EscrowDealEventCountOrderByAggregateInput = {
    id?: SortOrder
    dealRowId?: SortOrder
    type?: SortOrder
    detail?: SortOrder
    txHash?: SortOrder
    occurredAt?: SortOrder
  }

  export type EscrowDealEventMaxOrderByAggregateInput = {
    id?: SortOrder
    dealRowId?: SortOrder
    type?: SortOrder
    txHash?: SortOrder
    occurredAt?: SortOrder
  }

  export type EscrowDealEventMinOrderByAggregateInput = {
    id?: SortOrder
    dealRowId?: SortOrder
    type?: SortOrder
    txHash?: SortOrder
    occurredAt?: SortOrder
  }

  export type EnumReconciliationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReconciliationStatus | EnumReconciliationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReconciliationStatus[] | ListEnumReconciliationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReconciliationStatus[] | ListEnumReconciliationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReconciliationStatusFilter<$PrismaModel> | $Enums.ReconciliationStatus
  }

  export type ReconciliationBreakListRelationFilter = {
    every?: ReconciliationBreakWhereInput
    some?: ReconciliationBreakWhereInput
    none?: ReconciliationBreakWhereInput
  }

  export type ReconciliationBreakOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReconciliationRunCountOrderByAggregateInput = {
    id?: SortOrder
    scope?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    checkedCount?: SortOrder
    breakCount?: SortOrder
    summary?: SortOrder
  }

  export type ReconciliationRunAvgOrderByAggregateInput = {
    checkedCount?: SortOrder
    breakCount?: SortOrder
  }

  export type ReconciliationRunMaxOrderByAggregateInput = {
    id?: SortOrder
    scope?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    checkedCount?: SortOrder
    breakCount?: SortOrder
  }

  export type ReconciliationRunMinOrderByAggregateInput = {
    id?: SortOrder
    scope?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    checkedCount?: SortOrder
    breakCount?: SortOrder
  }

  export type ReconciliationRunSumOrderByAggregateInput = {
    checkedCount?: SortOrder
    breakCount?: SortOrder
  }

  export type EnumReconciliationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReconciliationStatus | EnumReconciliationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReconciliationStatus[] | ListEnumReconciliationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReconciliationStatus[] | ListEnumReconciliationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReconciliationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReconciliationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReconciliationStatusFilter<$PrismaModel>
    _max?: NestedEnumReconciliationStatusFilter<$PrismaModel>
  }

  export type ReconciliationRunRelationFilter = {
    is?: ReconciliationRunWhereInput
    isNot?: ReconciliationRunWhereInput
  }

  export type ReconciliationBreakCountOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    kind?: SortOrder
    reference?: SortOrder
    currency?: SortOrder
    expectedMinor?: SortOrder
    actualMinor?: SortOrder
    detail?: SortOrder
    createdAt?: SortOrder
  }

  export type ReconciliationBreakMaxOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    kind?: SortOrder
    reference?: SortOrder
    currency?: SortOrder
    expectedMinor?: SortOrder
    actualMinor?: SortOrder
    createdAt?: SortOrder
  }

  export type ReconciliationBreakMinOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    kind?: SortOrder
    reference?: SortOrder
    currency?: SortOrder
    expectedMinor?: SortOrder
    actualMinor?: SortOrder
    createdAt?: SortOrder
  }

  export type ExecutionTransactionEventCreateNestedManyWithoutTransactionInput = {
    create?: XOR<ExecutionTransactionEventCreateWithoutTransactionInput, ExecutionTransactionEventUncheckedCreateWithoutTransactionInput> | ExecutionTransactionEventCreateWithoutTransactionInput[] | ExecutionTransactionEventUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: ExecutionTransactionEventCreateOrConnectWithoutTransactionInput | ExecutionTransactionEventCreateOrConnectWithoutTransactionInput[]
    createMany?: ExecutionTransactionEventCreateManyTransactionInputEnvelope
    connect?: ExecutionTransactionEventWhereUniqueInput | ExecutionTransactionEventWhereUniqueInput[]
  }

  export type ExecutionTransactionEventUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<ExecutionTransactionEventCreateWithoutTransactionInput, ExecutionTransactionEventUncheckedCreateWithoutTransactionInput> | ExecutionTransactionEventCreateWithoutTransactionInput[] | ExecutionTransactionEventUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: ExecutionTransactionEventCreateOrConnectWithoutTransactionInput | ExecutionTransactionEventCreateOrConnectWithoutTransactionInput[]
    createMany?: ExecutionTransactionEventCreateManyTransactionInputEnvelope
    connect?: ExecutionTransactionEventWhereUniqueInput | ExecutionTransactionEventWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumExecutionTransactionKindFieldUpdateOperationsInput = {
    set?: $Enums.ExecutionTransactionKind
  }

  export type EnumExecutionTransactionStateFieldUpdateOperationsInput = {
    set?: $Enums.ExecutionTransactionState
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ExecutionTransactionEventUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<ExecutionTransactionEventCreateWithoutTransactionInput, ExecutionTransactionEventUncheckedCreateWithoutTransactionInput> | ExecutionTransactionEventCreateWithoutTransactionInput[] | ExecutionTransactionEventUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: ExecutionTransactionEventCreateOrConnectWithoutTransactionInput | ExecutionTransactionEventCreateOrConnectWithoutTransactionInput[]
    upsert?: ExecutionTransactionEventUpsertWithWhereUniqueWithoutTransactionInput | ExecutionTransactionEventUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: ExecutionTransactionEventCreateManyTransactionInputEnvelope
    set?: ExecutionTransactionEventWhereUniqueInput | ExecutionTransactionEventWhereUniqueInput[]
    disconnect?: ExecutionTransactionEventWhereUniqueInput | ExecutionTransactionEventWhereUniqueInput[]
    delete?: ExecutionTransactionEventWhereUniqueInput | ExecutionTransactionEventWhereUniqueInput[]
    connect?: ExecutionTransactionEventWhereUniqueInput | ExecutionTransactionEventWhereUniqueInput[]
    update?: ExecutionTransactionEventUpdateWithWhereUniqueWithoutTransactionInput | ExecutionTransactionEventUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: ExecutionTransactionEventUpdateManyWithWhereWithoutTransactionInput | ExecutionTransactionEventUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: ExecutionTransactionEventScalarWhereInput | ExecutionTransactionEventScalarWhereInput[]
  }

  export type ExecutionTransactionEventUncheckedUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<ExecutionTransactionEventCreateWithoutTransactionInput, ExecutionTransactionEventUncheckedCreateWithoutTransactionInput> | ExecutionTransactionEventCreateWithoutTransactionInput[] | ExecutionTransactionEventUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: ExecutionTransactionEventCreateOrConnectWithoutTransactionInput | ExecutionTransactionEventCreateOrConnectWithoutTransactionInput[]
    upsert?: ExecutionTransactionEventUpsertWithWhereUniqueWithoutTransactionInput | ExecutionTransactionEventUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: ExecutionTransactionEventCreateManyTransactionInputEnvelope
    set?: ExecutionTransactionEventWhereUniqueInput | ExecutionTransactionEventWhereUniqueInput[]
    disconnect?: ExecutionTransactionEventWhereUniqueInput | ExecutionTransactionEventWhereUniqueInput[]
    delete?: ExecutionTransactionEventWhereUniqueInput | ExecutionTransactionEventWhereUniqueInput[]
    connect?: ExecutionTransactionEventWhereUniqueInput | ExecutionTransactionEventWhereUniqueInput[]
    update?: ExecutionTransactionEventUpdateWithWhereUniqueWithoutTransactionInput | ExecutionTransactionEventUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: ExecutionTransactionEventUpdateManyWithWhereWithoutTransactionInput | ExecutionTransactionEventUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: ExecutionTransactionEventScalarWhereInput | ExecutionTransactionEventScalarWhereInput[]
  }

  export type ExecutionTransactionCreateNestedOneWithoutEventsInput = {
    create?: XOR<ExecutionTransactionCreateWithoutEventsInput, ExecutionTransactionUncheckedCreateWithoutEventsInput>
    connectOrCreate?: ExecutionTransactionCreateOrConnectWithoutEventsInput
    connect?: ExecutionTransactionWhereUniqueInput
  }

  export type NullableEnumExecutionTransactionStateFieldUpdateOperationsInput = {
    set?: $Enums.ExecutionTransactionState | null
  }

  export type ExecutionTransactionUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<ExecutionTransactionCreateWithoutEventsInput, ExecutionTransactionUncheckedCreateWithoutEventsInput>
    connectOrCreate?: ExecutionTransactionCreateOrConnectWithoutEventsInput
    upsert?: ExecutionTransactionUpsertWithoutEventsInput
    connect?: ExecutionTransactionWhereUniqueInput
    update?: XOR<XOR<ExecutionTransactionUpdateToOneWithWhereWithoutEventsInput, ExecutionTransactionUpdateWithoutEventsInput>, ExecutionTransactionUncheckedUpdateWithoutEventsInput>
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

  export type EscrowDealEventCreateNestedManyWithoutDealInput = {
    create?: XOR<EscrowDealEventCreateWithoutDealInput, EscrowDealEventUncheckedCreateWithoutDealInput> | EscrowDealEventCreateWithoutDealInput[] | EscrowDealEventUncheckedCreateWithoutDealInput[]
    connectOrCreate?: EscrowDealEventCreateOrConnectWithoutDealInput | EscrowDealEventCreateOrConnectWithoutDealInput[]
    createMany?: EscrowDealEventCreateManyDealInputEnvelope
    connect?: EscrowDealEventWhereUniqueInput | EscrowDealEventWhereUniqueInput[]
  }

  export type EscrowDealEventUncheckedCreateNestedManyWithoutDealInput = {
    create?: XOR<EscrowDealEventCreateWithoutDealInput, EscrowDealEventUncheckedCreateWithoutDealInput> | EscrowDealEventCreateWithoutDealInput[] | EscrowDealEventUncheckedCreateWithoutDealInput[]
    connectOrCreate?: EscrowDealEventCreateOrConnectWithoutDealInput | EscrowDealEventCreateOrConnectWithoutDealInput[]
    createMany?: EscrowDealEventCreateManyDealInputEnvelope
    connect?: EscrowDealEventWhereUniqueInput | EscrowDealEventWhereUniqueInput[]
  }

  export type EnumEscrowDealStatusFieldUpdateOperationsInput = {
    set?: $Enums.EscrowDealStatus
  }

  export type NullableEnumEscrowResolutionFieldUpdateOperationsInput = {
    set?: $Enums.EscrowResolution | null
  }

  export type EscrowDealEventUpdateManyWithoutDealNestedInput = {
    create?: XOR<EscrowDealEventCreateWithoutDealInput, EscrowDealEventUncheckedCreateWithoutDealInput> | EscrowDealEventCreateWithoutDealInput[] | EscrowDealEventUncheckedCreateWithoutDealInput[]
    connectOrCreate?: EscrowDealEventCreateOrConnectWithoutDealInput | EscrowDealEventCreateOrConnectWithoutDealInput[]
    upsert?: EscrowDealEventUpsertWithWhereUniqueWithoutDealInput | EscrowDealEventUpsertWithWhereUniqueWithoutDealInput[]
    createMany?: EscrowDealEventCreateManyDealInputEnvelope
    set?: EscrowDealEventWhereUniqueInput | EscrowDealEventWhereUniqueInput[]
    disconnect?: EscrowDealEventWhereUniqueInput | EscrowDealEventWhereUniqueInput[]
    delete?: EscrowDealEventWhereUniqueInput | EscrowDealEventWhereUniqueInput[]
    connect?: EscrowDealEventWhereUniqueInput | EscrowDealEventWhereUniqueInput[]
    update?: EscrowDealEventUpdateWithWhereUniqueWithoutDealInput | EscrowDealEventUpdateWithWhereUniqueWithoutDealInput[]
    updateMany?: EscrowDealEventUpdateManyWithWhereWithoutDealInput | EscrowDealEventUpdateManyWithWhereWithoutDealInput[]
    deleteMany?: EscrowDealEventScalarWhereInput | EscrowDealEventScalarWhereInput[]
  }

  export type EscrowDealEventUncheckedUpdateManyWithoutDealNestedInput = {
    create?: XOR<EscrowDealEventCreateWithoutDealInput, EscrowDealEventUncheckedCreateWithoutDealInput> | EscrowDealEventCreateWithoutDealInput[] | EscrowDealEventUncheckedCreateWithoutDealInput[]
    connectOrCreate?: EscrowDealEventCreateOrConnectWithoutDealInput | EscrowDealEventCreateOrConnectWithoutDealInput[]
    upsert?: EscrowDealEventUpsertWithWhereUniqueWithoutDealInput | EscrowDealEventUpsertWithWhereUniqueWithoutDealInput[]
    createMany?: EscrowDealEventCreateManyDealInputEnvelope
    set?: EscrowDealEventWhereUniqueInput | EscrowDealEventWhereUniqueInput[]
    disconnect?: EscrowDealEventWhereUniqueInput | EscrowDealEventWhereUniqueInput[]
    delete?: EscrowDealEventWhereUniqueInput | EscrowDealEventWhereUniqueInput[]
    connect?: EscrowDealEventWhereUniqueInput | EscrowDealEventWhereUniqueInput[]
    update?: EscrowDealEventUpdateWithWhereUniqueWithoutDealInput | EscrowDealEventUpdateWithWhereUniqueWithoutDealInput[]
    updateMany?: EscrowDealEventUpdateManyWithWhereWithoutDealInput | EscrowDealEventUpdateManyWithWhereWithoutDealInput[]
    deleteMany?: EscrowDealEventScalarWhereInput | EscrowDealEventScalarWhereInput[]
  }

  export type EscrowDealCreateNestedOneWithoutEventsInput = {
    create?: XOR<EscrowDealCreateWithoutEventsInput, EscrowDealUncheckedCreateWithoutEventsInput>
    connectOrCreate?: EscrowDealCreateOrConnectWithoutEventsInput
    connect?: EscrowDealWhereUniqueInput
  }

  export type EscrowDealUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<EscrowDealCreateWithoutEventsInput, EscrowDealUncheckedCreateWithoutEventsInput>
    connectOrCreate?: EscrowDealCreateOrConnectWithoutEventsInput
    upsert?: EscrowDealUpsertWithoutEventsInput
    connect?: EscrowDealWhereUniqueInput
    update?: XOR<XOR<EscrowDealUpdateToOneWithWhereWithoutEventsInput, EscrowDealUpdateWithoutEventsInput>, EscrowDealUncheckedUpdateWithoutEventsInput>
  }

  export type ReconciliationBreakCreateNestedManyWithoutRunInput = {
    create?: XOR<ReconciliationBreakCreateWithoutRunInput, ReconciliationBreakUncheckedCreateWithoutRunInput> | ReconciliationBreakCreateWithoutRunInput[] | ReconciliationBreakUncheckedCreateWithoutRunInput[]
    connectOrCreate?: ReconciliationBreakCreateOrConnectWithoutRunInput | ReconciliationBreakCreateOrConnectWithoutRunInput[]
    createMany?: ReconciliationBreakCreateManyRunInputEnvelope
    connect?: ReconciliationBreakWhereUniqueInput | ReconciliationBreakWhereUniqueInput[]
  }

  export type ReconciliationBreakUncheckedCreateNestedManyWithoutRunInput = {
    create?: XOR<ReconciliationBreakCreateWithoutRunInput, ReconciliationBreakUncheckedCreateWithoutRunInput> | ReconciliationBreakCreateWithoutRunInput[] | ReconciliationBreakUncheckedCreateWithoutRunInput[]
    connectOrCreate?: ReconciliationBreakCreateOrConnectWithoutRunInput | ReconciliationBreakCreateOrConnectWithoutRunInput[]
    createMany?: ReconciliationBreakCreateManyRunInputEnvelope
    connect?: ReconciliationBreakWhereUniqueInput | ReconciliationBreakWhereUniqueInput[]
  }

  export type EnumReconciliationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReconciliationStatus
  }

  export type ReconciliationBreakUpdateManyWithoutRunNestedInput = {
    create?: XOR<ReconciliationBreakCreateWithoutRunInput, ReconciliationBreakUncheckedCreateWithoutRunInput> | ReconciliationBreakCreateWithoutRunInput[] | ReconciliationBreakUncheckedCreateWithoutRunInput[]
    connectOrCreate?: ReconciliationBreakCreateOrConnectWithoutRunInput | ReconciliationBreakCreateOrConnectWithoutRunInput[]
    upsert?: ReconciliationBreakUpsertWithWhereUniqueWithoutRunInput | ReconciliationBreakUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: ReconciliationBreakCreateManyRunInputEnvelope
    set?: ReconciliationBreakWhereUniqueInput | ReconciliationBreakWhereUniqueInput[]
    disconnect?: ReconciliationBreakWhereUniqueInput | ReconciliationBreakWhereUniqueInput[]
    delete?: ReconciliationBreakWhereUniqueInput | ReconciliationBreakWhereUniqueInput[]
    connect?: ReconciliationBreakWhereUniqueInput | ReconciliationBreakWhereUniqueInput[]
    update?: ReconciliationBreakUpdateWithWhereUniqueWithoutRunInput | ReconciliationBreakUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: ReconciliationBreakUpdateManyWithWhereWithoutRunInput | ReconciliationBreakUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: ReconciliationBreakScalarWhereInput | ReconciliationBreakScalarWhereInput[]
  }

  export type ReconciliationBreakUncheckedUpdateManyWithoutRunNestedInput = {
    create?: XOR<ReconciliationBreakCreateWithoutRunInput, ReconciliationBreakUncheckedCreateWithoutRunInput> | ReconciliationBreakCreateWithoutRunInput[] | ReconciliationBreakUncheckedCreateWithoutRunInput[]
    connectOrCreate?: ReconciliationBreakCreateOrConnectWithoutRunInput | ReconciliationBreakCreateOrConnectWithoutRunInput[]
    upsert?: ReconciliationBreakUpsertWithWhereUniqueWithoutRunInput | ReconciliationBreakUpsertWithWhereUniqueWithoutRunInput[]
    createMany?: ReconciliationBreakCreateManyRunInputEnvelope
    set?: ReconciliationBreakWhereUniqueInput | ReconciliationBreakWhereUniqueInput[]
    disconnect?: ReconciliationBreakWhereUniqueInput | ReconciliationBreakWhereUniqueInput[]
    delete?: ReconciliationBreakWhereUniqueInput | ReconciliationBreakWhereUniqueInput[]
    connect?: ReconciliationBreakWhereUniqueInput | ReconciliationBreakWhereUniqueInput[]
    update?: ReconciliationBreakUpdateWithWhereUniqueWithoutRunInput | ReconciliationBreakUpdateWithWhereUniqueWithoutRunInput[]
    updateMany?: ReconciliationBreakUpdateManyWithWhereWithoutRunInput | ReconciliationBreakUpdateManyWithWhereWithoutRunInput[]
    deleteMany?: ReconciliationBreakScalarWhereInput | ReconciliationBreakScalarWhereInput[]
  }

  export type ReconciliationRunCreateNestedOneWithoutBreaksInput = {
    create?: XOR<ReconciliationRunCreateWithoutBreaksInput, ReconciliationRunUncheckedCreateWithoutBreaksInput>
    connectOrCreate?: ReconciliationRunCreateOrConnectWithoutBreaksInput
    connect?: ReconciliationRunWhereUniqueInput
  }

  export type ReconciliationRunUpdateOneRequiredWithoutBreaksNestedInput = {
    create?: XOR<ReconciliationRunCreateWithoutBreaksInput, ReconciliationRunUncheckedCreateWithoutBreaksInput>
    connectOrCreate?: ReconciliationRunCreateOrConnectWithoutBreaksInput
    upsert?: ReconciliationRunUpsertWithoutBreaksInput
    connect?: ReconciliationRunWhereUniqueInput
    update?: XOR<XOR<ReconciliationRunUpdateToOneWithWhereWithoutBreaksInput, ReconciliationRunUpdateWithoutBreaksInput>, ReconciliationRunUncheckedUpdateWithoutBreaksInput>
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

  export type NestedEnumExecutionTransactionKindFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionTransactionKind | EnumExecutionTransactionKindFieldRefInput<$PrismaModel>
    in?: $Enums.ExecutionTransactionKind[] | ListEnumExecutionTransactionKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExecutionTransactionKind[] | ListEnumExecutionTransactionKindFieldRefInput<$PrismaModel>
    not?: NestedEnumExecutionTransactionKindFilter<$PrismaModel> | $Enums.ExecutionTransactionKind
  }

  export type NestedEnumExecutionTransactionStateFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionTransactionState | EnumExecutionTransactionStateFieldRefInput<$PrismaModel>
    in?: $Enums.ExecutionTransactionState[] | ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExecutionTransactionState[] | ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel>
    not?: NestedEnumExecutionTransactionStateFilter<$PrismaModel> | $Enums.ExecutionTransactionState
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

  export type NestedEnumExecutionTransactionKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionTransactionKind | EnumExecutionTransactionKindFieldRefInput<$PrismaModel>
    in?: $Enums.ExecutionTransactionKind[] | ListEnumExecutionTransactionKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExecutionTransactionKind[] | ListEnumExecutionTransactionKindFieldRefInput<$PrismaModel>
    not?: NestedEnumExecutionTransactionKindWithAggregatesFilter<$PrismaModel> | $Enums.ExecutionTransactionKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExecutionTransactionKindFilter<$PrismaModel>
    _max?: NestedEnumExecutionTransactionKindFilter<$PrismaModel>
  }

  export type NestedEnumExecutionTransactionStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionTransactionState | EnumExecutionTransactionStateFieldRefInput<$PrismaModel>
    in?: $Enums.ExecutionTransactionState[] | ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExecutionTransactionState[] | ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel>
    not?: NestedEnumExecutionTransactionStateWithAggregatesFilter<$PrismaModel> | $Enums.ExecutionTransactionState
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExecutionTransactionStateFilter<$PrismaModel>
    _max?: NestedEnumExecutionTransactionStateFilter<$PrismaModel>
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

  export type NestedEnumExecutionTransactionStateNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionTransactionState | EnumExecutionTransactionStateFieldRefInput<$PrismaModel> | null
    in?: $Enums.ExecutionTransactionState[] | ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ExecutionTransactionState[] | ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel> | null
    not?: NestedEnumExecutionTransactionStateNullableFilter<$PrismaModel> | $Enums.ExecutionTransactionState | null
  }

  export type NestedEnumExecutionTransactionStateNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionTransactionState | EnumExecutionTransactionStateFieldRefInput<$PrismaModel> | null
    in?: $Enums.ExecutionTransactionState[] | ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ExecutionTransactionState[] | ListEnumExecutionTransactionStateFieldRefInput<$PrismaModel> | null
    not?: NestedEnumExecutionTransactionStateNullableWithAggregatesFilter<$PrismaModel> | $Enums.ExecutionTransactionState | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumExecutionTransactionStateNullableFilter<$PrismaModel>
    _max?: NestedEnumExecutionTransactionStateNullableFilter<$PrismaModel>
  }

  export type NestedEnumOutboxStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OutboxStatus | EnumOutboxStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OutboxStatus[] | ListEnumOutboxStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOutboxStatusFilter<$PrismaModel> | $Enums.OutboxStatus
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

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumEscrowDealStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EscrowDealStatus | EnumEscrowDealStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EscrowDealStatus[] | ListEnumEscrowDealStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EscrowDealStatus[] | ListEnumEscrowDealStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEscrowDealStatusFilter<$PrismaModel> | $Enums.EscrowDealStatus
  }

  export type NestedEnumEscrowResolutionNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EscrowResolution | EnumEscrowResolutionFieldRefInput<$PrismaModel> | null
    in?: $Enums.EscrowResolution[] | ListEnumEscrowResolutionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EscrowResolution[] | ListEnumEscrowResolutionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEscrowResolutionNullableFilter<$PrismaModel> | $Enums.EscrowResolution | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumEscrowDealStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EscrowDealStatus | EnumEscrowDealStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EscrowDealStatus[] | ListEnumEscrowDealStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EscrowDealStatus[] | ListEnumEscrowDealStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEscrowDealStatusWithAggregatesFilter<$PrismaModel> | $Enums.EscrowDealStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEscrowDealStatusFilter<$PrismaModel>
    _max?: NestedEnumEscrowDealStatusFilter<$PrismaModel>
  }

  export type NestedEnumEscrowResolutionNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EscrowResolution | EnumEscrowResolutionFieldRefInput<$PrismaModel> | null
    in?: $Enums.EscrowResolution[] | ListEnumEscrowResolutionFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EscrowResolution[] | ListEnumEscrowResolutionFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEscrowResolutionNullableWithAggregatesFilter<$PrismaModel> | $Enums.EscrowResolution | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEscrowResolutionNullableFilter<$PrismaModel>
    _max?: NestedEnumEscrowResolutionNullableFilter<$PrismaModel>
  }

  export type NestedEnumReconciliationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReconciliationStatus | EnumReconciliationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReconciliationStatus[] | ListEnumReconciliationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReconciliationStatus[] | ListEnumReconciliationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReconciliationStatusFilter<$PrismaModel> | $Enums.ReconciliationStatus
  }

  export type NestedEnumReconciliationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReconciliationStatus | EnumReconciliationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReconciliationStatus[] | ListEnumReconciliationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReconciliationStatus[] | ListEnumReconciliationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReconciliationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReconciliationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReconciliationStatusFilter<$PrismaModel>
    _max?: NestedEnumReconciliationStatusFilter<$PrismaModel>
  }

  export type ExecutionTransactionEventCreateWithoutTransactionInput = {
    id?: string
    fromState?: $Enums.ExecutionTransactionState | null
    toState: $Enums.ExecutionTransactionState
    reason?: string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
  }

  export type ExecutionTransactionEventUncheckedCreateWithoutTransactionInput = {
    id?: string
    fromState?: $Enums.ExecutionTransactionState | null
    toState: $Enums.ExecutionTransactionState
    reason?: string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
  }

  export type ExecutionTransactionEventCreateOrConnectWithoutTransactionInput = {
    where: ExecutionTransactionEventWhereUniqueInput
    create: XOR<ExecutionTransactionEventCreateWithoutTransactionInput, ExecutionTransactionEventUncheckedCreateWithoutTransactionInput>
  }

  export type ExecutionTransactionEventCreateManyTransactionInputEnvelope = {
    data: ExecutionTransactionEventCreateManyTransactionInput | ExecutionTransactionEventCreateManyTransactionInput[]
    skipDuplicates?: boolean
  }

  export type ExecutionTransactionEventUpsertWithWhereUniqueWithoutTransactionInput = {
    where: ExecutionTransactionEventWhereUniqueInput
    update: XOR<ExecutionTransactionEventUpdateWithoutTransactionInput, ExecutionTransactionEventUncheckedUpdateWithoutTransactionInput>
    create: XOR<ExecutionTransactionEventCreateWithoutTransactionInput, ExecutionTransactionEventUncheckedCreateWithoutTransactionInput>
  }

  export type ExecutionTransactionEventUpdateWithWhereUniqueWithoutTransactionInput = {
    where: ExecutionTransactionEventWhereUniqueInput
    data: XOR<ExecutionTransactionEventUpdateWithoutTransactionInput, ExecutionTransactionEventUncheckedUpdateWithoutTransactionInput>
  }

  export type ExecutionTransactionEventUpdateManyWithWhereWithoutTransactionInput = {
    where: ExecutionTransactionEventScalarWhereInput
    data: XOR<ExecutionTransactionEventUpdateManyMutationInput, ExecutionTransactionEventUncheckedUpdateManyWithoutTransactionInput>
  }

  export type ExecutionTransactionEventScalarWhereInput = {
    AND?: ExecutionTransactionEventScalarWhereInput | ExecutionTransactionEventScalarWhereInput[]
    OR?: ExecutionTransactionEventScalarWhereInput[]
    NOT?: ExecutionTransactionEventScalarWhereInput | ExecutionTransactionEventScalarWhereInput[]
    id?: UuidFilter<"ExecutionTransactionEvent"> | string
    transactionId?: UuidFilter<"ExecutionTransactionEvent"> | string
    fromState?: EnumExecutionTransactionStateNullableFilter<"ExecutionTransactionEvent"> | $Enums.ExecutionTransactionState | null
    toState?: EnumExecutionTransactionStateFilter<"ExecutionTransactionEvent"> | $Enums.ExecutionTransactionState
    reason?: StringNullableFilter<"ExecutionTransactionEvent"> | string | null
    detail?: JsonNullableFilter<"ExecutionTransactionEvent">
    occurredAt?: DateTimeFilter<"ExecutionTransactionEvent"> | Date | string
  }

  export type ExecutionTransactionCreateWithoutEventsInput = {
    id?: string
    idempotencyKey: string
    kind: $Enums.ExecutionTransactionKind
    state?: $Enums.ExecutionTransactionState
    sourceWalletId?: string | null
    sourceAccountId?: string | null
    amountMinor: bigint | number
    currency: string
    destinationWalletId?: string | null
    destinationAccountId?: string | null
    destinationAddress?: string | null
    destinationChain?: string | null
    asset?: string | null
    ledgerTransactionId?: string | null
    ledgerEntryId?: string | null
    reversalEntryId?: string | null
    broadcastJobId?: string | null
    txHash?: string | null
    intentId?: string | null
    orgId?: string | null
    memo?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    routeDecisionId?: string | null
    selectedRail?: string | null
    quoteId?: string | null
    quoteSignature?: string | null
    riskAssessmentId?: string | null
    riskScore?: number | null
    complianceRunId?: string | null
    complianceCaseId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settledAt?: Date | string | null
  }

  export type ExecutionTransactionUncheckedCreateWithoutEventsInput = {
    id?: string
    idempotencyKey: string
    kind: $Enums.ExecutionTransactionKind
    state?: $Enums.ExecutionTransactionState
    sourceWalletId?: string | null
    sourceAccountId?: string | null
    amountMinor: bigint | number
    currency: string
    destinationWalletId?: string | null
    destinationAccountId?: string | null
    destinationAddress?: string | null
    destinationChain?: string | null
    asset?: string | null
    ledgerTransactionId?: string | null
    ledgerEntryId?: string | null
    reversalEntryId?: string | null
    broadcastJobId?: string | null
    txHash?: string | null
    intentId?: string | null
    orgId?: string | null
    memo?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    routeDecisionId?: string | null
    selectedRail?: string | null
    quoteId?: string | null
    quoteSignature?: string | null
    riskAssessmentId?: string | null
    riskScore?: number | null
    complianceRunId?: string | null
    complianceCaseId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    settledAt?: Date | string | null
  }

  export type ExecutionTransactionCreateOrConnectWithoutEventsInput = {
    where: ExecutionTransactionWhereUniqueInput
    create: XOR<ExecutionTransactionCreateWithoutEventsInput, ExecutionTransactionUncheckedCreateWithoutEventsInput>
  }

  export type ExecutionTransactionUpsertWithoutEventsInput = {
    update: XOR<ExecutionTransactionUpdateWithoutEventsInput, ExecutionTransactionUncheckedUpdateWithoutEventsInput>
    create: XOR<ExecutionTransactionCreateWithoutEventsInput, ExecutionTransactionUncheckedCreateWithoutEventsInput>
    where?: ExecutionTransactionWhereInput
  }

  export type ExecutionTransactionUpdateToOneWithWhereWithoutEventsInput = {
    where?: ExecutionTransactionWhereInput
    data: XOR<ExecutionTransactionUpdateWithoutEventsInput, ExecutionTransactionUncheckedUpdateWithoutEventsInput>
  }

  export type ExecutionTransactionUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    kind?: EnumExecutionTransactionKindFieldUpdateOperationsInput | $Enums.ExecutionTransactionKind
    state?: EnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState
    sourceWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    destinationWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    destinationChain?: NullableStringFieldUpdateOperationsInput | string | null
    asset?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    reversalEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    broadcastJobId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    routeDecisionId?: NullableStringFieldUpdateOperationsInput | string | null
    selectedRail?: NullableStringFieldUpdateOperationsInput | string | null
    quoteId?: NullableStringFieldUpdateOperationsInput | string | null
    quoteSignature?: NullableStringFieldUpdateOperationsInput | string | null
    riskAssessmentId?: NullableStringFieldUpdateOperationsInput | string | null
    riskScore?: NullableIntFieldUpdateOperationsInput | number | null
    complianceRunId?: NullableStringFieldUpdateOperationsInput | string | null
    complianceCaseId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExecutionTransactionUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    kind?: EnumExecutionTransactionKindFieldUpdateOperationsInput | $Enums.ExecutionTransactionKind
    state?: EnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState
    sourceWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    sourceAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    destinationWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    destinationChain?: NullableStringFieldUpdateOperationsInput | string | null
    asset?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    reversalEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    broadcastJobId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    routeDecisionId?: NullableStringFieldUpdateOperationsInput | string | null
    selectedRail?: NullableStringFieldUpdateOperationsInput | string | null
    quoteId?: NullableStringFieldUpdateOperationsInput | string | null
    quoteSignature?: NullableStringFieldUpdateOperationsInput | string | null
    riskAssessmentId?: NullableStringFieldUpdateOperationsInput | string | null
    riskScore?: NullableIntFieldUpdateOperationsInput | number | null
    complianceRunId?: NullableStringFieldUpdateOperationsInput | string | null
    complianceCaseId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EscrowDealEventCreateWithoutDealInput = {
    id?: string
    type: string
    detail?: NullableJsonNullValueInput | InputJsonValue
    txHash?: string | null
    occurredAt?: Date | string
  }

  export type EscrowDealEventUncheckedCreateWithoutDealInput = {
    id?: string
    type: string
    detail?: NullableJsonNullValueInput | InputJsonValue
    txHash?: string | null
    occurredAt?: Date | string
  }

  export type EscrowDealEventCreateOrConnectWithoutDealInput = {
    where: EscrowDealEventWhereUniqueInput
    create: XOR<EscrowDealEventCreateWithoutDealInput, EscrowDealEventUncheckedCreateWithoutDealInput>
  }

  export type EscrowDealEventCreateManyDealInputEnvelope = {
    data: EscrowDealEventCreateManyDealInput | EscrowDealEventCreateManyDealInput[]
    skipDuplicates?: boolean
  }

  export type EscrowDealEventUpsertWithWhereUniqueWithoutDealInput = {
    where: EscrowDealEventWhereUniqueInput
    update: XOR<EscrowDealEventUpdateWithoutDealInput, EscrowDealEventUncheckedUpdateWithoutDealInput>
    create: XOR<EscrowDealEventCreateWithoutDealInput, EscrowDealEventUncheckedCreateWithoutDealInput>
  }

  export type EscrowDealEventUpdateWithWhereUniqueWithoutDealInput = {
    where: EscrowDealEventWhereUniqueInput
    data: XOR<EscrowDealEventUpdateWithoutDealInput, EscrowDealEventUncheckedUpdateWithoutDealInput>
  }

  export type EscrowDealEventUpdateManyWithWhereWithoutDealInput = {
    where: EscrowDealEventScalarWhereInput
    data: XOR<EscrowDealEventUpdateManyMutationInput, EscrowDealEventUncheckedUpdateManyWithoutDealInput>
  }

  export type EscrowDealEventScalarWhereInput = {
    AND?: EscrowDealEventScalarWhereInput | EscrowDealEventScalarWhereInput[]
    OR?: EscrowDealEventScalarWhereInput[]
    NOT?: EscrowDealEventScalarWhereInput | EscrowDealEventScalarWhereInput[]
    id?: UuidFilter<"EscrowDealEvent"> | string
    dealRowId?: UuidFilter<"EscrowDealEvent"> | string
    type?: StringFilter<"EscrowDealEvent"> | string
    detail?: JsonNullableFilter<"EscrowDealEvent">
    txHash?: StringNullableFilter<"EscrowDealEvent"> | string | null
    occurredAt?: DateTimeFilter<"EscrowDealEvent"> | Date | string
  }

  export type EscrowDealCreateWithoutEventsInput = {
    id?: string
    dealId: string
    transactionId?: string | null
    status?: $Enums.EscrowDealStatus
    payer: string
    payee: string
    token: string
    amountMinor: bigint | number
    deadline: bigint | number
    escrowContract: string
    fundTxHash?: string | null
    resolveTxHash?: string | null
    resolution?: $Enums.EscrowResolution | null
    condition?: NullableJsonNullValueInput | InputJsonValue
    fundedAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EscrowDealUncheckedCreateWithoutEventsInput = {
    id?: string
    dealId: string
    transactionId?: string | null
    status?: $Enums.EscrowDealStatus
    payer: string
    payee: string
    token: string
    amountMinor: bigint | number
    deadline: bigint | number
    escrowContract: string
    fundTxHash?: string | null
    resolveTxHash?: string | null
    resolution?: $Enums.EscrowResolution | null
    condition?: NullableJsonNullValueInput | InputJsonValue
    fundedAt?: Date | string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EscrowDealCreateOrConnectWithoutEventsInput = {
    where: EscrowDealWhereUniqueInput
    create: XOR<EscrowDealCreateWithoutEventsInput, EscrowDealUncheckedCreateWithoutEventsInput>
  }

  export type EscrowDealUpsertWithoutEventsInput = {
    update: XOR<EscrowDealUpdateWithoutEventsInput, EscrowDealUncheckedUpdateWithoutEventsInput>
    create: XOR<EscrowDealCreateWithoutEventsInput, EscrowDealUncheckedCreateWithoutEventsInput>
    where?: EscrowDealWhereInput
  }

  export type EscrowDealUpdateToOneWithWhereWithoutEventsInput = {
    where?: EscrowDealWhereInput
    data: XOR<EscrowDealUpdateWithoutEventsInput, EscrowDealUncheckedUpdateWithoutEventsInput>
  }

  export type EscrowDealUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    dealId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEscrowDealStatusFieldUpdateOperationsInput | $Enums.EscrowDealStatus
    payer?: StringFieldUpdateOperationsInput | string
    payee?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    deadline?: BigIntFieldUpdateOperationsInput | bigint | number
    escrowContract?: StringFieldUpdateOperationsInput | string
    fundTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    resolveTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableEnumEscrowResolutionFieldUpdateOperationsInput | $Enums.EscrowResolution | null
    condition?: NullableJsonNullValueInput | InputJsonValue
    fundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EscrowDealUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    dealId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEscrowDealStatusFieldUpdateOperationsInput | $Enums.EscrowDealStatus
    payer?: StringFieldUpdateOperationsInput | string
    payee?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    deadline?: BigIntFieldUpdateOperationsInput | bigint | number
    escrowContract?: StringFieldUpdateOperationsInput | string
    fundTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    resolveTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    resolution?: NullableEnumEscrowResolutionFieldUpdateOperationsInput | $Enums.EscrowResolution | null
    condition?: NullableJsonNullValueInput | InputJsonValue
    fundedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReconciliationBreakCreateWithoutRunInput = {
    id?: string
    kind: string
    reference?: string | null
    currency?: string | null
    expectedMinor?: string | null
    actualMinor?: string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ReconciliationBreakUncheckedCreateWithoutRunInput = {
    id?: string
    kind: string
    reference?: string | null
    currency?: string | null
    expectedMinor?: string | null
    actualMinor?: string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ReconciliationBreakCreateOrConnectWithoutRunInput = {
    where: ReconciliationBreakWhereUniqueInput
    create: XOR<ReconciliationBreakCreateWithoutRunInput, ReconciliationBreakUncheckedCreateWithoutRunInput>
  }

  export type ReconciliationBreakCreateManyRunInputEnvelope = {
    data: ReconciliationBreakCreateManyRunInput | ReconciliationBreakCreateManyRunInput[]
    skipDuplicates?: boolean
  }

  export type ReconciliationBreakUpsertWithWhereUniqueWithoutRunInput = {
    where: ReconciliationBreakWhereUniqueInput
    update: XOR<ReconciliationBreakUpdateWithoutRunInput, ReconciliationBreakUncheckedUpdateWithoutRunInput>
    create: XOR<ReconciliationBreakCreateWithoutRunInput, ReconciliationBreakUncheckedCreateWithoutRunInput>
  }

  export type ReconciliationBreakUpdateWithWhereUniqueWithoutRunInput = {
    where: ReconciliationBreakWhereUniqueInput
    data: XOR<ReconciliationBreakUpdateWithoutRunInput, ReconciliationBreakUncheckedUpdateWithoutRunInput>
  }

  export type ReconciliationBreakUpdateManyWithWhereWithoutRunInput = {
    where: ReconciliationBreakScalarWhereInput
    data: XOR<ReconciliationBreakUpdateManyMutationInput, ReconciliationBreakUncheckedUpdateManyWithoutRunInput>
  }

  export type ReconciliationBreakScalarWhereInput = {
    AND?: ReconciliationBreakScalarWhereInput | ReconciliationBreakScalarWhereInput[]
    OR?: ReconciliationBreakScalarWhereInput[]
    NOT?: ReconciliationBreakScalarWhereInput | ReconciliationBreakScalarWhereInput[]
    id?: UuidFilter<"ReconciliationBreak"> | string
    runId?: UuidFilter<"ReconciliationBreak"> | string
    kind?: StringFilter<"ReconciliationBreak"> | string
    reference?: StringNullableFilter<"ReconciliationBreak"> | string | null
    currency?: StringNullableFilter<"ReconciliationBreak"> | string | null
    expectedMinor?: StringNullableFilter<"ReconciliationBreak"> | string | null
    actualMinor?: StringNullableFilter<"ReconciliationBreak"> | string | null
    detail?: JsonNullableFilter<"ReconciliationBreak">
    createdAt?: DateTimeFilter<"ReconciliationBreak"> | Date | string
  }

  export type ReconciliationRunCreateWithoutBreaksInput = {
    id?: string
    scope: string
    status?: $Enums.ReconciliationStatus
    startedAt?: Date | string
    finishedAt?: Date | string | null
    checkedCount?: number
    breakCount?: number
    summary?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ReconciliationRunUncheckedCreateWithoutBreaksInput = {
    id?: string
    scope: string
    status?: $Enums.ReconciliationStatus
    startedAt?: Date | string
    finishedAt?: Date | string | null
    checkedCount?: number
    breakCount?: number
    summary?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ReconciliationRunCreateOrConnectWithoutBreaksInput = {
    where: ReconciliationRunWhereUniqueInput
    create: XOR<ReconciliationRunCreateWithoutBreaksInput, ReconciliationRunUncheckedCreateWithoutBreaksInput>
  }

  export type ReconciliationRunUpsertWithoutBreaksInput = {
    update: XOR<ReconciliationRunUpdateWithoutBreaksInput, ReconciliationRunUncheckedUpdateWithoutBreaksInput>
    create: XOR<ReconciliationRunCreateWithoutBreaksInput, ReconciliationRunUncheckedCreateWithoutBreaksInput>
    where?: ReconciliationRunWhereInput
  }

  export type ReconciliationRunUpdateToOneWithWhereWithoutBreaksInput = {
    where?: ReconciliationRunWhereInput
    data: XOR<ReconciliationRunUpdateWithoutBreaksInput, ReconciliationRunUncheckedUpdateWithoutBreaksInput>
  }

  export type ReconciliationRunUpdateWithoutBreaksInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    status?: EnumReconciliationStatusFieldUpdateOperationsInput | $Enums.ReconciliationStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedCount?: IntFieldUpdateOperationsInput | number
    breakCount?: IntFieldUpdateOperationsInput | number
    summary?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ReconciliationRunUncheckedUpdateWithoutBreaksInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    status?: EnumReconciliationStatusFieldUpdateOperationsInput | $Enums.ReconciliationStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    checkedCount?: IntFieldUpdateOperationsInput | number
    breakCount?: IntFieldUpdateOperationsInput | number
    summary?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ExecutionTransactionEventCreateManyTransactionInput = {
    id?: string
    fromState?: $Enums.ExecutionTransactionState | null
    toState: $Enums.ExecutionTransactionState
    reason?: string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
  }

  export type ExecutionTransactionEventUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromState?: NullableEnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState | null
    toState?: EnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExecutionTransactionEventUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromState?: NullableEnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState | null
    toState?: EnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExecutionTransactionEventUncheckedUpdateManyWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromState?: NullableEnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState | null
    toState?: EnumExecutionTransactionStateFieldUpdateOperationsInput | $Enums.ExecutionTransactionState
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EscrowDealEventCreateManyDealInput = {
    id?: string
    type: string
    detail?: NullableJsonNullValueInput | InputJsonValue
    txHash?: string | null
    occurredAt?: Date | string
  }

  export type EscrowDealEventUpdateWithoutDealInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    detail?: NullableJsonNullValueInput | InputJsonValue
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EscrowDealEventUncheckedUpdateWithoutDealInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    detail?: NullableJsonNullValueInput | InputJsonValue
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EscrowDealEventUncheckedUpdateManyWithoutDealInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    detail?: NullableJsonNullValueInput | InputJsonValue
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReconciliationBreakCreateManyRunInput = {
    id?: string
    kind: string
    reference?: string | null
    currency?: string | null
    expectedMinor?: string | null
    actualMinor?: string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ReconciliationBreakUpdateWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    expectedMinor?: NullableStringFieldUpdateOperationsInput | string | null
    actualMinor?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReconciliationBreakUncheckedUpdateWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    expectedMinor?: NullableStringFieldUpdateOperationsInput | string | null
    actualMinor?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReconciliationBreakUncheckedUpdateManyWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    expectedMinor?: NullableStringFieldUpdateOperationsInput | string | null
    actualMinor?: NullableStringFieldUpdateOperationsInput | string | null
    detail?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ExecutionTransactionCountOutputTypeDefaultArgs instead
     */
    export type ExecutionTransactionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExecutionTransactionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EscrowDealCountOutputTypeDefaultArgs instead
     */
    export type EscrowDealCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EscrowDealCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReconciliationRunCountOutputTypeDefaultArgs instead
     */
    export type ReconciliationRunCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReconciliationRunCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExecutionTransactionDefaultArgs instead
     */
    export type ExecutionTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExecutionTransactionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExecutionTransactionEventDefaultArgs instead
     */
    export type ExecutionTransactionEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExecutionTransactionEventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventOutboxDefaultArgs instead
     */
    export type EventOutboxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventOutboxDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExecutionConsumerCursorDefaultArgs instead
     */
    export type ExecutionConsumerCursorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExecutionConsumerCursorDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EscrowDealDefaultArgs instead
     */
    export type EscrowDealArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EscrowDealDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EscrowDealEventDefaultArgs instead
     */
    export type EscrowDealEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EscrowDealEventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReconciliationRunDefaultArgs instead
     */
    export type ReconciliationRunArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReconciliationRunDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReconciliationBreakDefaultArgs instead
     */
    export type ReconciliationBreakArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReconciliationBreakDefaultArgs<ExtArgs>

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