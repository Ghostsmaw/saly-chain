
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
 * Model Instrument
 * 
 */
export type Instrument = $Result.DefaultSelection<Prisma.$InstrumentPayload>
/**
 * Model Holding
 * 
 */
export type Holding = $Result.DefaultSelection<Prisma.$HoldingPayload>
/**
 * Model Loan
 * 
 */
export type Loan = $Result.DefaultSelection<Prisma.$LoanPayload>
/**
 * Model Cashflow
 * 
 */
export type Cashflow = $Result.DefaultSelection<Prisma.$CashflowPayload>
/**
 * Model DvpTrade
 * 
 */
export type DvpTrade = $Result.DefaultSelection<Prisma.$DvpTradePayload>

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


export const InstrumentType: {
  BOND: 'BOND',
  FUND: 'FUND',
  RWA: 'RWA'
};

export type InstrumentType = (typeof InstrumentType)[keyof typeof InstrumentType]


export const LoanStatus: {
  ACTIVE: 'ACTIVE',
  REPAID: 'REPAID',
  DEFAULTED: 'DEFAULTED',
  CANCELLED: 'CANCELLED'
};

export type LoanStatus = (typeof LoanStatus)[keyof typeof LoanStatus]


export const CashflowType: {
  COUPON: 'COUPON',
  DIVIDEND: 'DIVIDEND',
  REDEMPTION: 'REDEMPTION'
};

export type CashflowType = (typeof CashflowType)[keyof typeof CashflowType]


export const DvpStatus: {
  PENDING: 'PENDING',
  ESCROW_FUNDED: 'ESCROW_FUNDED',
  SETTLED: 'SETTLED',
  CANCELLED: 'CANCELLED'
};

export type DvpStatus = (typeof DvpStatus)[keyof typeof DvpStatus]

}

export type OutboxStatus = $Enums.OutboxStatus

export const OutboxStatus: typeof $Enums.OutboxStatus

export type InstrumentType = $Enums.InstrumentType

export const InstrumentType: typeof $Enums.InstrumentType

export type LoanStatus = $Enums.LoanStatus

export const LoanStatus: typeof $Enums.LoanStatus

export type CashflowType = $Enums.CashflowType

export const CashflowType: typeof $Enums.CashflowType

export type DvpStatus = $Enums.DvpStatus

export const DvpStatus: typeof $Enums.DvpStatus

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
   * `prisma.instrument`: Exposes CRUD operations for the **Instrument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Instruments
    * const instruments = await prisma.instrument.findMany()
    * ```
    */
  get instrument(): Prisma.InstrumentDelegate<ExtArgs>;

  /**
   * `prisma.holding`: Exposes CRUD operations for the **Holding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Holdings
    * const holdings = await prisma.holding.findMany()
    * ```
    */
  get holding(): Prisma.HoldingDelegate<ExtArgs>;

  /**
   * `prisma.loan`: Exposes CRUD operations for the **Loan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Loans
    * const loans = await prisma.loan.findMany()
    * ```
    */
  get loan(): Prisma.LoanDelegate<ExtArgs>;

  /**
   * `prisma.cashflow`: Exposes CRUD operations for the **Cashflow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cashflows
    * const cashflows = await prisma.cashflow.findMany()
    * ```
    */
  get cashflow(): Prisma.CashflowDelegate<ExtArgs>;

  /**
   * `prisma.dvpTrade`: Exposes CRUD operations for the **DvpTrade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DvpTrades
    * const dvpTrades = await prisma.dvpTrade.findMany()
    * ```
    */
  get dvpTrade(): Prisma.DvpTradeDelegate<ExtArgs>;
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
    Instrument: 'Instrument',
    Holding: 'Holding',
    Loan: 'Loan',
    Cashflow: 'Cashflow',
    DvpTrade: 'DvpTrade'
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
      modelProps: "eventOutbox" | "instrument" | "holding" | "loan" | "cashflow" | "dvpTrade"
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
      Instrument: {
        payload: Prisma.$InstrumentPayload<ExtArgs>
        fields: Prisma.InstrumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InstrumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InstrumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          findFirst: {
            args: Prisma.InstrumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InstrumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          findMany: {
            args: Prisma.InstrumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>[]
          }
          create: {
            args: Prisma.InstrumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          createMany: {
            args: Prisma.InstrumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InstrumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>[]
          }
          delete: {
            args: Prisma.InstrumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          update: {
            args: Prisma.InstrumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          deleteMany: {
            args: Prisma.InstrumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InstrumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InstrumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstrumentPayload>
          }
          aggregate: {
            args: Prisma.InstrumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstrument>
          }
          groupBy: {
            args: Prisma.InstrumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<InstrumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.InstrumentCountArgs<ExtArgs>
            result: $Utils.Optional<InstrumentCountAggregateOutputType> | number
          }
        }
      }
      Holding: {
        payload: Prisma.$HoldingPayload<ExtArgs>
        fields: Prisma.HoldingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HoldingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HoldingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          findFirst: {
            args: Prisma.HoldingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HoldingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          findMany: {
            args: Prisma.HoldingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>[]
          }
          create: {
            args: Prisma.HoldingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          createMany: {
            args: Prisma.HoldingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HoldingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>[]
          }
          delete: {
            args: Prisma.HoldingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          update: {
            args: Prisma.HoldingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          deleteMany: {
            args: Prisma.HoldingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HoldingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HoldingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          aggregate: {
            args: Prisma.HoldingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHolding>
          }
          groupBy: {
            args: Prisma.HoldingGroupByArgs<ExtArgs>
            result: $Utils.Optional<HoldingGroupByOutputType>[]
          }
          count: {
            args: Prisma.HoldingCountArgs<ExtArgs>
            result: $Utils.Optional<HoldingCountAggregateOutputType> | number
          }
        }
      }
      Loan: {
        payload: Prisma.$LoanPayload<ExtArgs>
        fields: Prisma.LoanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LoanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LoanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          findFirst: {
            args: Prisma.LoanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LoanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          findMany: {
            args: Prisma.LoanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>[]
          }
          create: {
            args: Prisma.LoanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          createMany: {
            args: Prisma.LoanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LoanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>[]
          }
          delete: {
            args: Prisma.LoanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          update: {
            args: Prisma.LoanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          deleteMany: {
            args: Prisma.LoanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LoanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LoanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LoanPayload>
          }
          aggregate: {
            args: Prisma.LoanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLoan>
          }
          groupBy: {
            args: Prisma.LoanGroupByArgs<ExtArgs>
            result: $Utils.Optional<LoanGroupByOutputType>[]
          }
          count: {
            args: Prisma.LoanCountArgs<ExtArgs>
            result: $Utils.Optional<LoanCountAggregateOutputType> | number
          }
        }
      }
      Cashflow: {
        payload: Prisma.$CashflowPayload<ExtArgs>
        fields: Prisma.CashflowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CashflowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashflowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CashflowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashflowPayload>
          }
          findFirst: {
            args: Prisma.CashflowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashflowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CashflowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashflowPayload>
          }
          findMany: {
            args: Prisma.CashflowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashflowPayload>[]
          }
          create: {
            args: Prisma.CashflowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashflowPayload>
          }
          createMany: {
            args: Prisma.CashflowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CashflowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashflowPayload>[]
          }
          delete: {
            args: Prisma.CashflowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashflowPayload>
          }
          update: {
            args: Prisma.CashflowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashflowPayload>
          }
          deleteMany: {
            args: Prisma.CashflowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CashflowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CashflowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CashflowPayload>
          }
          aggregate: {
            args: Prisma.CashflowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCashflow>
          }
          groupBy: {
            args: Prisma.CashflowGroupByArgs<ExtArgs>
            result: $Utils.Optional<CashflowGroupByOutputType>[]
          }
          count: {
            args: Prisma.CashflowCountArgs<ExtArgs>
            result: $Utils.Optional<CashflowCountAggregateOutputType> | number
          }
        }
      }
      DvpTrade: {
        payload: Prisma.$DvpTradePayload<ExtArgs>
        fields: Prisma.DvpTradeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DvpTradeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DvpTradePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DvpTradeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DvpTradePayload>
          }
          findFirst: {
            args: Prisma.DvpTradeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DvpTradePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DvpTradeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DvpTradePayload>
          }
          findMany: {
            args: Prisma.DvpTradeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DvpTradePayload>[]
          }
          create: {
            args: Prisma.DvpTradeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DvpTradePayload>
          }
          createMany: {
            args: Prisma.DvpTradeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DvpTradeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DvpTradePayload>[]
          }
          delete: {
            args: Prisma.DvpTradeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DvpTradePayload>
          }
          update: {
            args: Prisma.DvpTradeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DvpTradePayload>
          }
          deleteMany: {
            args: Prisma.DvpTradeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DvpTradeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DvpTradeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DvpTradePayload>
          }
          aggregate: {
            args: Prisma.DvpTradeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDvpTrade>
          }
          groupBy: {
            args: Prisma.DvpTradeGroupByArgs<ExtArgs>
            result: $Utils.Optional<DvpTradeGroupByOutputType>[]
          }
          count: {
            args: Prisma.DvpTradeCountArgs<ExtArgs>
            result: $Utils.Optional<DvpTradeCountAggregateOutputType> | number
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
   * Count Type InstrumentCountOutputType
   */

  export type InstrumentCountOutputType = {
    holdings: number
    cashflows: number
    loans: number
  }

  export type InstrumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    holdings?: boolean | InstrumentCountOutputTypeCountHoldingsArgs
    cashflows?: boolean | InstrumentCountOutputTypeCountCashflowsArgs
    loans?: boolean | InstrumentCountOutputTypeCountLoansArgs
  }

  // Custom InputTypes
  /**
   * InstrumentCountOutputType without action
   */
  export type InstrumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstrumentCountOutputType
     */
    select?: InstrumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InstrumentCountOutputType without action
   */
  export type InstrumentCountOutputTypeCountHoldingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoldingWhereInput
  }

  /**
   * InstrumentCountOutputType without action
   */
  export type InstrumentCountOutputTypeCountCashflowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CashflowWhereInput
  }

  /**
   * InstrumentCountOutputType without action
   */
  export type InstrumentCountOutputTypeCountLoansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
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
   * Model Instrument
   */

  export type AggregateInstrument = {
    _count: InstrumentCountAggregateOutputType | null
    _min: InstrumentMinAggregateOutputType | null
    _max: InstrumentMaxAggregateOutputType | null
  }

  export type InstrumentMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    type: $Enums.InstrumentType | null
    name: string | null
    issuerRef: string | null
    currency: string | null
    tokenId: string | null
    createdAt: Date | null
  }

  export type InstrumentMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    type: $Enums.InstrumentType | null
    name: string | null
    issuerRef: string | null
    currency: string | null
    tokenId: string | null
    createdAt: Date | null
  }

  export type InstrumentCountAggregateOutputType = {
    id: number
    orgId: number
    type: number
    name: number
    issuerRef: number
    currency: number
    terms: number
    tokenId: number
    createdAt: number
    _all: number
  }


  export type InstrumentMinAggregateInputType = {
    id?: true
    orgId?: true
    type?: true
    name?: true
    issuerRef?: true
    currency?: true
    tokenId?: true
    createdAt?: true
  }

  export type InstrumentMaxAggregateInputType = {
    id?: true
    orgId?: true
    type?: true
    name?: true
    issuerRef?: true
    currency?: true
    tokenId?: true
    createdAt?: true
  }

  export type InstrumentCountAggregateInputType = {
    id?: true
    orgId?: true
    type?: true
    name?: true
    issuerRef?: true
    currency?: true
    terms?: true
    tokenId?: true
    createdAt?: true
    _all?: true
  }

  export type InstrumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Instrument to aggregate.
     */
    where?: InstrumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instruments to fetch.
     */
    orderBy?: InstrumentOrderByWithRelationInput | InstrumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InstrumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instruments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instruments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Instruments
    **/
    _count?: true | InstrumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstrumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstrumentMaxAggregateInputType
  }

  export type GetInstrumentAggregateType<T extends InstrumentAggregateArgs> = {
        [P in keyof T & keyof AggregateInstrument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstrument[P]>
      : GetScalarType<T[P], AggregateInstrument[P]>
  }




  export type InstrumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstrumentWhereInput
    orderBy?: InstrumentOrderByWithAggregationInput | InstrumentOrderByWithAggregationInput[]
    by: InstrumentScalarFieldEnum[] | InstrumentScalarFieldEnum
    having?: InstrumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstrumentCountAggregateInputType | true
    _min?: InstrumentMinAggregateInputType
    _max?: InstrumentMaxAggregateInputType
  }

  export type InstrumentGroupByOutputType = {
    id: string
    orgId: string
    type: $Enums.InstrumentType
    name: string
    issuerRef: string
    currency: string
    terms: JsonValue | null
    tokenId: string | null
    createdAt: Date
    _count: InstrumentCountAggregateOutputType | null
    _min: InstrumentMinAggregateOutputType | null
    _max: InstrumentMaxAggregateOutputType | null
  }

  type GetInstrumentGroupByPayload<T extends InstrumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InstrumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstrumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstrumentGroupByOutputType[P]>
            : GetScalarType<T[P], InstrumentGroupByOutputType[P]>
        }
      >
    >


  export type InstrumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    type?: boolean
    name?: boolean
    issuerRef?: boolean
    currency?: boolean
    terms?: boolean
    tokenId?: boolean
    createdAt?: boolean
    holdings?: boolean | Instrument$holdingsArgs<ExtArgs>
    cashflows?: boolean | Instrument$cashflowsArgs<ExtArgs>
    loans?: boolean | Instrument$loansArgs<ExtArgs>
    _count?: boolean | InstrumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["instrument"]>

  export type InstrumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    type?: boolean
    name?: boolean
    issuerRef?: boolean
    currency?: boolean
    terms?: boolean
    tokenId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["instrument"]>

  export type InstrumentSelectScalar = {
    id?: boolean
    orgId?: boolean
    type?: boolean
    name?: boolean
    issuerRef?: boolean
    currency?: boolean
    terms?: boolean
    tokenId?: boolean
    createdAt?: boolean
  }

  export type InstrumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    holdings?: boolean | Instrument$holdingsArgs<ExtArgs>
    cashflows?: boolean | Instrument$cashflowsArgs<ExtArgs>
    loans?: boolean | Instrument$loansArgs<ExtArgs>
    _count?: boolean | InstrumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InstrumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $InstrumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Instrument"
    objects: {
      holdings: Prisma.$HoldingPayload<ExtArgs>[]
      cashflows: Prisma.$CashflowPayload<ExtArgs>[]
      loans: Prisma.$LoanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      type: $Enums.InstrumentType
      name: string
      issuerRef: string
      currency: string
      terms: Prisma.JsonValue | null
      tokenId: string | null
      createdAt: Date
    }, ExtArgs["result"]["instrument"]>
    composites: {}
  }

  type InstrumentGetPayload<S extends boolean | null | undefined | InstrumentDefaultArgs> = $Result.GetResult<Prisma.$InstrumentPayload, S>

  type InstrumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InstrumentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InstrumentCountAggregateInputType | true
    }

  export interface InstrumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Instrument'], meta: { name: 'Instrument' } }
    /**
     * Find zero or one Instrument that matches the filter.
     * @param {InstrumentFindUniqueArgs} args - Arguments to find a Instrument
     * @example
     * // Get one Instrument
     * const instrument = await prisma.instrument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstrumentFindUniqueArgs>(args: SelectSubset<T, InstrumentFindUniqueArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Instrument that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InstrumentFindUniqueOrThrowArgs} args - Arguments to find a Instrument
     * @example
     * // Get one Instrument
     * const instrument = await prisma.instrument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstrumentFindUniqueOrThrowArgs>(args: SelectSubset<T, InstrumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Instrument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentFindFirstArgs} args - Arguments to find a Instrument
     * @example
     * // Get one Instrument
     * const instrument = await prisma.instrument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstrumentFindFirstArgs>(args?: SelectSubset<T, InstrumentFindFirstArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Instrument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentFindFirstOrThrowArgs} args - Arguments to find a Instrument
     * @example
     * // Get one Instrument
     * const instrument = await prisma.instrument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstrumentFindFirstOrThrowArgs>(args?: SelectSubset<T, InstrumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Instruments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Instruments
     * const instruments = await prisma.instrument.findMany()
     * 
     * // Get first 10 Instruments
     * const instruments = await prisma.instrument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const instrumentWithIdOnly = await prisma.instrument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InstrumentFindManyArgs>(args?: SelectSubset<T, InstrumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Instrument.
     * @param {InstrumentCreateArgs} args - Arguments to create a Instrument.
     * @example
     * // Create one Instrument
     * const Instrument = await prisma.instrument.create({
     *   data: {
     *     // ... data to create a Instrument
     *   }
     * })
     * 
     */
    create<T extends InstrumentCreateArgs>(args: SelectSubset<T, InstrumentCreateArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Instruments.
     * @param {InstrumentCreateManyArgs} args - Arguments to create many Instruments.
     * @example
     * // Create many Instruments
     * const instrument = await prisma.instrument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InstrumentCreateManyArgs>(args?: SelectSubset<T, InstrumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Instruments and returns the data saved in the database.
     * @param {InstrumentCreateManyAndReturnArgs} args - Arguments to create many Instruments.
     * @example
     * // Create many Instruments
     * const instrument = await prisma.instrument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Instruments and only return the `id`
     * const instrumentWithIdOnly = await prisma.instrument.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InstrumentCreateManyAndReturnArgs>(args?: SelectSubset<T, InstrumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Instrument.
     * @param {InstrumentDeleteArgs} args - Arguments to delete one Instrument.
     * @example
     * // Delete one Instrument
     * const Instrument = await prisma.instrument.delete({
     *   where: {
     *     // ... filter to delete one Instrument
     *   }
     * })
     * 
     */
    delete<T extends InstrumentDeleteArgs>(args: SelectSubset<T, InstrumentDeleteArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Instrument.
     * @param {InstrumentUpdateArgs} args - Arguments to update one Instrument.
     * @example
     * // Update one Instrument
     * const instrument = await prisma.instrument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InstrumentUpdateArgs>(args: SelectSubset<T, InstrumentUpdateArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Instruments.
     * @param {InstrumentDeleteManyArgs} args - Arguments to filter Instruments to delete.
     * @example
     * // Delete a few Instruments
     * const { count } = await prisma.instrument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InstrumentDeleteManyArgs>(args?: SelectSubset<T, InstrumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Instruments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Instruments
     * const instrument = await prisma.instrument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InstrumentUpdateManyArgs>(args: SelectSubset<T, InstrumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Instrument.
     * @param {InstrumentUpsertArgs} args - Arguments to update or create a Instrument.
     * @example
     * // Update or create a Instrument
     * const instrument = await prisma.instrument.upsert({
     *   create: {
     *     // ... data to create a Instrument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Instrument we want to update
     *   }
     * })
     */
    upsert<T extends InstrumentUpsertArgs>(args: SelectSubset<T, InstrumentUpsertArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Instruments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentCountArgs} args - Arguments to filter Instruments to count.
     * @example
     * // Count the number of Instruments
     * const count = await prisma.instrument.count({
     *   where: {
     *     // ... the filter for the Instruments we want to count
     *   }
     * })
    **/
    count<T extends InstrumentCountArgs>(
      args?: Subset<T, InstrumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstrumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Instrument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InstrumentAggregateArgs>(args: Subset<T, InstrumentAggregateArgs>): Prisma.PrismaPromise<GetInstrumentAggregateType<T>>

    /**
     * Group by Instrument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstrumentGroupByArgs} args - Group by arguments.
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
      T extends InstrumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstrumentGroupByArgs['orderBy'] }
        : { orderBy?: InstrumentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InstrumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstrumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Instrument model
   */
  readonly fields: InstrumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Instrument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InstrumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    holdings<T extends Instrument$holdingsArgs<ExtArgs> = {}>(args?: Subset<T, Instrument$holdingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findMany"> | Null>
    cashflows<T extends Instrument$cashflowsArgs<ExtArgs> = {}>(args?: Subset<T, Instrument$cashflowsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashflowPayload<ExtArgs>, T, "findMany"> | Null>
    loans<T extends Instrument$loansArgs<ExtArgs> = {}>(args?: Subset<T, Instrument$loansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Instrument model
   */ 
  interface InstrumentFieldRefs {
    readonly id: FieldRef<"Instrument", 'String'>
    readonly orgId: FieldRef<"Instrument", 'String'>
    readonly type: FieldRef<"Instrument", 'InstrumentType'>
    readonly name: FieldRef<"Instrument", 'String'>
    readonly issuerRef: FieldRef<"Instrument", 'String'>
    readonly currency: FieldRef<"Instrument", 'String'>
    readonly terms: FieldRef<"Instrument", 'Json'>
    readonly tokenId: FieldRef<"Instrument", 'String'>
    readonly createdAt: FieldRef<"Instrument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Instrument findUnique
   */
  export type InstrumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter, which Instrument to fetch.
     */
    where: InstrumentWhereUniqueInput
  }

  /**
   * Instrument findUniqueOrThrow
   */
  export type InstrumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter, which Instrument to fetch.
     */
    where: InstrumentWhereUniqueInput
  }

  /**
   * Instrument findFirst
   */
  export type InstrumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter, which Instrument to fetch.
     */
    where?: InstrumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instruments to fetch.
     */
    orderBy?: InstrumentOrderByWithRelationInput | InstrumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Instruments.
     */
    cursor?: InstrumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instruments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instruments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Instruments.
     */
    distinct?: InstrumentScalarFieldEnum | InstrumentScalarFieldEnum[]
  }

  /**
   * Instrument findFirstOrThrow
   */
  export type InstrumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter, which Instrument to fetch.
     */
    where?: InstrumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instruments to fetch.
     */
    orderBy?: InstrumentOrderByWithRelationInput | InstrumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Instruments.
     */
    cursor?: InstrumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instruments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instruments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Instruments.
     */
    distinct?: InstrumentScalarFieldEnum | InstrumentScalarFieldEnum[]
  }

  /**
   * Instrument findMany
   */
  export type InstrumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter, which Instruments to fetch.
     */
    where?: InstrumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instruments to fetch.
     */
    orderBy?: InstrumentOrderByWithRelationInput | InstrumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Instruments.
     */
    cursor?: InstrumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instruments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instruments.
     */
    skip?: number
    distinct?: InstrumentScalarFieldEnum | InstrumentScalarFieldEnum[]
  }

  /**
   * Instrument create
   */
  export type InstrumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Instrument.
     */
    data: XOR<InstrumentCreateInput, InstrumentUncheckedCreateInput>
  }

  /**
   * Instrument createMany
   */
  export type InstrumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Instruments.
     */
    data: InstrumentCreateManyInput | InstrumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Instrument createManyAndReturn
   */
  export type InstrumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Instruments.
     */
    data: InstrumentCreateManyInput | InstrumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Instrument update
   */
  export type InstrumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Instrument.
     */
    data: XOR<InstrumentUpdateInput, InstrumentUncheckedUpdateInput>
    /**
     * Choose, which Instrument to update.
     */
    where: InstrumentWhereUniqueInput
  }

  /**
   * Instrument updateMany
   */
  export type InstrumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Instruments.
     */
    data: XOR<InstrumentUpdateManyMutationInput, InstrumentUncheckedUpdateManyInput>
    /**
     * Filter which Instruments to update
     */
    where?: InstrumentWhereInput
  }

  /**
   * Instrument upsert
   */
  export type InstrumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Instrument to update in case it exists.
     */
    where: InstrumentWhereUniqueInput
    /**
     * In case the Instrument found by the `where` argument doesn't exist, create a new Instrument with this data.
     */
    create: XOR<InstrumentCreateInput, InstrumentUncheckedCreateInput>
    /**
     * In case the Instrument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InstrumentUpdateInput, InstrumentUncheckedUpdateInput>
  }

  /**
   * Instrument delete
   */
  export type InstrumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    /**
     * Filter which Instrument to delete.
     */
    where: InstrumentWhereUniqueInput
  }

  /**
   * Instrument deleteMany
   */
  export type InstrumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Instruments to delete
     */
    where?: InstrumentWhereInput
  }

  /**
   * Instrument.holdings
   */
  export type Instrument$holdingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    where?: HoldingWhereInput
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    cursor?: HoldingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * Instrument.cashflows
   */
  export type Instrument$cashflowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cashflow
     */
    select?: CashflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashflowInclude<ExtArgs> | null
    where?: CashflowWhereInput
    orderBy?: CashflowOrderByWithRelationInput | CashflowOrderByWithRelationInput[]
    cursor?: CashflowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CashflowScalarFieldEnum | CashflowScalarFieldEnum[]
  }

  /**
   * Instrument.loans
   */
  export type Instrument$loansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    cursor?: LoanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Instrument without action
   */
  export type InstrumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
  }


  /**
   * Model Holding
   */

  export type AggregateHolding = {
    _count: HoldingCountAggregateOutputType | null
    _avg: HoldingAvgAggregateOutputType | null
    _sum: HoldingSumAggregateOutputType | null
    _min: HoldingMinAggregateOutputType | null
    _max: HoldingMaxAggregateOutputType | null
  }

  export type HoldingAvgAggregateOutputType = {
    unitsMinor: number | null
  }

  export type HoldingSumAggregateOutputType = {
    unitsMinor: bigint | null
  }

  export type HoldingMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    accountRef: string | null
    instrumentId: string | null
    unitsMinor: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HoldingMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    accountRef: string | null
    instrumentId: string | null
    unitsMinor: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HoldingCountAggregateOutputType = {
    id: number
    orgId: number
    accountRef: number
    instrumentId: number
    unitsMinor: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HoldingAvgAggregateInputType = {
    unitsMinor?: true
  }

  export type HoldingSumAggregateInputType = {
    unitsMinor?: true
  }

  export type HoldingMinAggregateInputType = {
    id?: true
    orgId?: true
    accountRef?: true
    instrumentId?: true
    unitsMinor?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HoldingMaxAggregateInputType = {
    id?: true
    orgId?: true
    accountRef?: true
    instrumentId?: true
    unitsMinor?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HoldingCountAggregateInputType = {
    id?: true
    orgId?: true
    accountRef?: true
    instrumentId?: true
    unitsMinor?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HoldingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Holding to aggregate.
     */
    where?: HoldingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HoldingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Holdings
    **/
    _count?: true | HoldingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HoldingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HoldingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HoldingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HoldingMaxAggregateInputType
  }

  export type GetHoldingAggregateType<T extends HoldingAggregateArgs> = {
        [P in keyof T & keyof AggregateHolding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHolding[P]>
      : GetScalarType<T[P], AggregateHolding[P]>
  }




  export type HoldingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoldingWhereInput
    orderBy?: HoldingOrderByWithAggregationInput | HoldingOrderByWithAggregationInput[]
    by: HoldingScalarFieldEnum[] | HoldingScalarFieldEnum
    having?: HoldingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HoldingCountAggregateInputType | true
    _avg?: HoldingAvgAggregateInputType
    _sum?: HoldingSumAggregateInputType
    _min?: HoldingMinAggregateInputType
    _max?: HoldingMaxAggregateInputType
  }

  export type HoldingGroupByOutputType = {
    id: string
    orgId: string
    accountRef: string
    instrumentId: string
    unitsMinor: bigint
    createdAt: Date
    updatedAt: Date
    _count: HoldingCountAggregateOutputType | null
    _avg: HoldingAvgAggregateOutputType | null
    _sum: HoldingSumAggregateOutputType | null
    _min: HoldingMinAggregateOutputType | null
    _max: HoldingMaxAggregateOutputType | null
  }

  type GetHoldingGroupByPayload<T extends HoldingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HoldingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HoldingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HoldingGroupByOutputType[P]>
            : GetScalarType<T[P], HoldingGroupByOutputType[P]>
        }
      >
    >


  export type HoldingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    accountRef?: boolean
    instrumentId?: boolean
    unitsMinor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["holding"]>

  export type HoldingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    accountRef?: boolean
    instrumentId?: boolean
    unitsMinor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["holding"]>

  export type HoldingSelectScalar = {
    id?: boolean
    orgId?: boolean
    accountRef?: boolean
    instrumentId?: boolean
    unitsMinor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HoldingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }
  export type HoldingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }

  export type $HoldingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Holding"
    objects: {
      instrument: Prisma.$InstrumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      accountRef: string
      instrumentId: string
      unitsMinor: bigint
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["holding"]>
    composites: {}
  }

  type HoldingGetPayload<S extends boolean | null | undefined | HoldingDefaultArgs> = $Result.GetResult<Prisma.$HoldingPayload, S>

  type HoldingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<HoldingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: HoldingCountAggregateInputType | true
    }

  export interface HoldingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Holding'], meta: { name: 'Holding' } }
    /**
     * Find zero or one Holding that matches the filter.
     * @param {HoldingFindUniqueArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HoldingFindUniqueArgs>(args: SelectSubset<T, HoldingFindUniqueArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Holding that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {HoldingFindUniqueOrThrowArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HoldingFindUniqueOrThrowArgs>(args: SelectSubset<T, HoldingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Holding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindFirstArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HoldingFindFirstArgs>(args?: SelectSubset<T, HoldingFindFirstArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Holding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindFirstOrThrowArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HoldingFindFirstOrThrowArgs>(args?: SelectSubset<T, HoldingFindFirstOrThrowArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Holdings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Holdings
     * const holdings = await prisma.holding.findMany()
     * 
     * // Get first 10 Holdings
     * const holdings = await prisma.holding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const holdingWithIdOnly = await prisma.holding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HoldingFindManyArgs>(args?: SelectSubset<T, HoldingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Holding.
     * @param {HoldingCreateArgs} args - Arguments to create a Holding.
     * @example
     * // Create one Holding
     * const Holding = await prisma.holding.create({
     *   data: {
     *     // ... data to create a Holding
     *   }
     * })
     * 
     */
    create<T extends HoldingCreateArgs>(args: SelectSubset<T, HoldingCreateArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Holdings.
     * @param {HoldingCreateManyArgs} args - Arguments to create many Holdings.
     * @example
     * // Create many Holdings
     * const holding = await prisma.holding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HoldingCreateManyArgs>(args?: SelectSubset<T, HoldingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Holdings and returns the data saved in the database.
     * @param {HoldingCreateManyAndReturnArgs} args - Arguments to create many Holdings.
     * @example
     * // Create many Holdings
     * const holding = await prisma.holding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Holdings and only return the `id`
     * const holdingWithIdOnly = await prisma.holding.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HoldingCreateManyAndReturnArgs>(args?: SelectSubset<T, HoldingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Holding.
     * @param {HoldingDeleteArgs} args - Arguments to delete one Holding.
     * @example
     * // Delete one Holding
     * const Holding = await prisma.holding.delete({
     *   where: {
     *     // ... filter to delete one Holding
     *   }
     * })
     * 
     */
    delete<T extends HoldingDeleteArgs>(args: SelectSubset<T, HoldingDeleteArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Holding.
     * @param {HoldingUpdateArgs} args - Arguments to update one Holding.
     * @example
     * // Update one Holding
     * const holding = await prisma.holding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HoldingUpdateArgs>(args: SelectSubset<T, HoldingUpdateArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Holdings.
     * @param {HoldingDeleteManyArgs} args - Arguments to filter Holdings to delete.
     * @example
     * // Delete a few Holdings
     * const { count } = await prisma.holding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HoldingDeleteManyArgs>(args?: SelectSubset<T, HoldingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Holdings
     * const holding = await prisma.holding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HoldingUpdateManyArgs>(args: SelectSubset<T, HoldingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Holding.
     * @param {HoldingUpsertArgs} args - Arguments to update or create a Holding.
     * @example
     * // Update or create a Holding
     * const holding = await prisma.holding.upsert({
     *   create: {
     *     // ... data to create a Holding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Holding we want to update
     *   }
     * })
     */
    upsert<T extends HoldingUpsertArgs>(args: SelectSubset<T, HoldingUpsertArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingCountArgs} args - Arguments to filter Holdings to count.
     * @example
     * // Count the number of Holdings
     * const count = await prisma.holding.count({
     *   where: {
     *     // ... the filter for the Holdings we want to count
     *   }
     * })
    **/
    count<T extends HoldingCountArgs>(
      args?: Subset<T, HoldingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HoldingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Holding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HoldingAggregateArgs>(args: Subset<T, HoldingAggregateArgs>): Prisma.PrismaPromise<GetHoldingAggregateType<T>>

    /**
     * Group by Holding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingGroupByArgs} args - Group by arguments.
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
      T extends HoldingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HoldingGroupByArgs['orderBy'] }
        : { orderBy?: HoldingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HoldingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHoldingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Holding model
   */
  readonly fields: HoldingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Holding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HoldingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instrument<T extends InstrumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstrumentDefaultArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Holding model
   */ 
  interface HoldingFieldRefs {
    readonly id: FieldRef<"Holding", 'String'>
    readonly orgId: FieldRef<"Holding", 'String'>
    readonly accountRef: FieldRef<"Holding", 'String'>
    readonly instrumentId: FieldRef<"Holding", 'String'>
    readonly unitsMinor: FieldRef<"Holding", 'BigInt'>
    readonly createdAt: FieldRef<"Holding", 'DateTime'>
    readonly updatedAt: FieldRef<"Holding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Holding findUnique
   */
  export type HoldingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holding to fetch.
     */
    where: HoldingWhereUniqueInput
  }

  /**
   * Holding findUniqueOrThrow
   */
  export type HoldingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holding to fetch.
     */
    where: HoldingWhereUniqueInput
  }

  /**
   * Holding findFirst
   */
  export type HoldingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holding to fetch.
     */
    where?: HoldingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Holdings.
     */
    cursor?: HoldingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Holdings.
     */
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * Holding findFirstOrThrow
   */
  export type HoldingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holding to fetch.
     */
    where?: HoldingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Holdings.
     */
    cursor?: HoldingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Holdings.
     */
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * Holding findMany
   */
  export type HoldingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holdings to fetch.
     */
    where?: HoldingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Holdings.
     */
    cursor?: HoldingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * Holding create
   */
  export type HoldingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * The data needed to create a Holding.
     */
    data: XOR<HoldingCreateInput, HoldingUncheckedCreateInput>
  }

  /**
   * Holding createMany
   */
  export type HoldingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Holdings.
     */
    data: HoldingCreateManyInput | HoldingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Holding createManyAndReturn
   */
  export type HoldingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Holdings.
     */
    data: HoldingCreateManyInput | HoldingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Holding update
   */
  export type HoldingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * The data needed to update a Holding.
     */
    data: XOR<HoldingUpdateInput, HoldingUncheckedUpdateInput>
    /**
     * Choose, which Holding to update.
     */
    where: HoldingWhereUniqueInput
  }

  /**
   * Holding updateMany
   */
  export type HoldingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Holdings.
     */
    data: XOR<HoldingUpdateManyMutationInput, HoldingUncheckedUpdateManyInput>
    /**
     * Filter which Holdings to update
     */
    where?: HoldingWhereInput
  }

  /**
   * Holding upsert
   */
  export type HoldingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * The filter to search for the Holding to update in case it exists.
     */
    where: HoldingWhereUniqueInput
    /**
     * In case the Holding found by the `where` argument doesn't exist, create a new Holding with this data.
     */
    create: XOR<HoldingCreateInput, HoldingUncheckedCreateInput>
    /**
     * In case the Holding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HoldingUpdateInput, HoldingUncheckedUpdateInput>
  }

  /**
   * Holding delete
   */
  export type HoldingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter which Holding to delete.
     */
    where: HoldingWhereUniqueInput
  }

  /**
   * Holding deleteMany
   */
  export type HoldingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Holdings to delete
     */
    where?: HoldingWhereInput
  }

  /**
   * Holding without action
   */
  export type HoldingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
  }


  /**
   * Model Loan
   */

  export type AggregateLoan = {
    _count: LoanCountAggregateOutputType | null
    _avg: LoanAvgAggregateOutputType | null
    _sum: LoanSumAggregateOutputType | null
    _min: LoanMinAggregateOutputType | null
    _max: LoanMaxAggregateOutputType | null
  }

  export type LoanAvgAggregateOutputType = {
    principalMinor: number | null
    rateBps: number | null
  }

  export type LoanSumAggregateOutputType = {
    principalMinor: bigint | null
    rateBps: number | null
  }

  export type LoanMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    instrumentId: string | null
    borrowerRef: string | null
    principalMinor: bigint | null
    rateBps: number | null
    collateralRef: string | null
    currency: string | null
    status: $Enums.LoanStatus | null
    intentId: string | null
    createdAt: Date | null
  }

  export type LoanMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    instrumentId: string | null
    borrowerRef: string | null
    principalMinor: bigint | null
    rateBps: number | null
    collateralRef: string | null
    currency: string | null
    status: $Enums.LoanStatus | null
    intentId: string | null
    createdAt: Date | null
  }

  export type LoanCountAggregateOutputType = {
    id: number
    orgId: number
    instrumentId: number
    borrowerRef: number
    principalMinor: number
    rateBps: number
    collateralRef: number
    currency: number
    status: number
    intentId: number
    createdAt: number
    _all: number
  }


  export type LoanAvgAggregateInputType = {
    principalMinor?: true
    rateBps?: true
  }

  export type LoanSumAggregateInputType = {
    principalMinor?: true
    rateBps?: true
  }

  export type LoanMinAggregateInputType = {
    id?: true
    orgId?: true
    instrumentId?: true
    borrowerRef?: true
    principalMinor?: true
    rateBps?: true
    collateralRef?: true
    currency?: true
    status?: true
    intentId?: true
    createdAt?: true
  }

  export type LoanMaxAggregateInputType = {
    id?: true
    orgId?: true
    instrumentId?: true
    borrowerRef?: true
    principalMinor?: true
    rateBps?: true
    collateralRef?: true
    currency?: true
    status?: true
    intentId?: true
    createdAt?: true
  }

  export type LoanCountAggregateInputType = {
    id?: true
    orgId?: true
    instrumentId?: true
    borrowerRef?: true
    principalMinor?: true
    rateBps?: true
    collateralRef?: true
    currency?: true
    status?: true
    intentId?: true
    createdAt?: true
    _all?: true
  }

  export type LoanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Loan to aggregate.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Loans
    **/
    _count?: true | LoanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LoanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LoanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LoanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LoanMaxAggregateInputType
  }

  export type GetLoanAggregateType<T extends LoanAggregateArgs> = {
        [P in keyof T & keyof AggregateLoan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLoan[P]>
      : GetScalarType<T[P], AggregateLoan[P]>
  }




  export type LoanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LoanWhereInput
    orderBy?: LoanOrderByWithAggregationInput | LoanOrderByWithAggregationInput[]
    by: LoanScalarFieldEnum[] | LoanScalarFieldEnum
    having?: LoanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LoanCountAggregateInputType | true
    _avg?: LoanAvgAggregateInputType
    _sum?: LoanSumAggregateInputType
    _min?: LoanMinAggregateInputType
    _max?: LoanMaxAggregateInputType
  }

  export type LoanGroupByOutputType = {
    id: string
    orgId: string
    instrumentId: string | null
    borrowerRef: string
    principalMinor: bigint
    rateBps: number
    collateralRef: string | null
    currency: string
    status: $Enums.LoanStatus
    intentId: string | null
    createdAt: Date
    _count: LoanCountAggregateOutputType | null
    _avg: LoanAvgAggregateOutputType | null
    _sum: LoanSumAggregateOutputType | null
    _min: LoanMinAggregateOutputType | null
    _max: LoanMaxAggregateOutputType | null
  }

  type GetLoanGroupByPayload<T extends LoanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LoanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LoanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LoanGroupByOutputType[P]>
            : GetScalarType<T[P], LoanGroupByOutputType[P]>
        }
      >
    >


  export type LoanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    instrumentId?: boolean
    borrowerRef?: boolean
    principalMinor?: boolean
    rateBps?: boolean
    collateralRef?: boolean
    currency?: boolean
    status?: boolean
    intentId?: boolean
    createdAt?: boolean
    instrument?: boolean | Loan$instrumentArgs<ExtArgs>
  }, ExtArgs["result"]["loan"]>

  export type LoanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    instrumentId?: boolean
    borrowerRef?: boolean
    principalMinor?: boolean
    rateBps?: boolean
    collateralRef?: boolean
    currency?: boolean
    status?: boolean
    intentId?: boolean
    createdAt?: boolean
    instrument?: boolean | Loan$instrumentArgs<ExtArgs>
  }, ExtArgs["result"]["loan"]>

  export type LoanSelectScalar = {
    id?: boolean
    orgId?: boolean
    instrumentId?: boolean
    borrowerRef?: boolean
    principalMinor?: boolean
    rateBps?: boolean
    collateralRef?: boolean
    currency?: boolean
    status?: boolean
    intentId?: boolean
    createdAt?: boolean
  }

  export type LoanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instrument?: boolean | Loan$instrumentArgs<ExtArgs>
  }
  export type LoanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instrument?: boolean | Loan$instrumentArgs<ExtArgs>
  }

  export type $LoanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Loan"
    objects: {
      instrument: Prisma.$InstrumentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      instrumentId: string | null
      borrowerRef: string
      principalMinor: bigint
      rateBps: number
      collateralRef: string | null
      currency: string
      status: $Enums.LoanStatus
      intentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["loan"]>
    composites: {}
  }

  type LoanGetPayload<S extends boolean | null | undefined | LoanDefaultArgs> = $Result.GetResult<Prisma.$LoanPayload, S>

  type LoanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LoanFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LoanCountAggregateInputType | true
    }

  export interface LoanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Loan'], meta: { name: 'Loan' } }
    /**
     * Find zero or one Loan that matches the filter.
     * @param {LoanFindUniqueArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoanFindUniqueArgs>(args: SelectSubset<T, LoanFindUniqueArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Loan that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LoanFindUniqueOrThrowArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoanFindUniqueOrThrowArgs>(args: SelectSubset<T, LoanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Loan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindFirstArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoanFindFirstArgs>(args?: SelectSubset<T, LoanFindFirstArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Loan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindFirstOrThrowArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoanFindFirstOrThrowArgs>(args?: SelectSubset<T, LoanFindFirstOrThrowArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Loans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Loans
     * const loans = await prisma.loan.findMany()
     * 
     * // Get first 10 Loans
     * const loans = await prisma.loan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const loanWithIdOnly = await prisma.loan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LoanFindManyArgs>(args?: SelectSubset<T, LoanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Loan.
     * @param {LoanCreateArgs} args - Arguments to create a Loan.
     * @example
     * // Create one Loan
     * const Loan = await prisma.loan.create({
     *   data: {
     *     // ... data to create a Loan
     *   }
     * })
     * 
     */
    create<T extends LoanCreateArgs>(args: SelectSubset<T, LoanCreateArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Loans.
     * @param {LoanCreateManyArgs} args - Arguments to create many Loans.
     * @example
     * // Create many Loans
     * const loan = await prisma.loan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LoanCreateManyArgs>(args?: SelectSubset<T, LoanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Loans and returns the data saved in the database.
     * @param {LoanCreateManyAndReturnArgs} args - Arguments to create many Loans.
     * @example
     * // Create many Loans
     * const loan = await prisma.loan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Loans and only return the `id`
     * const loanWithIdOnly = await prisma.loan.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LoanCreateManyAndReturnArgs>(args?: SelectSubset<T, LoanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Loan.
     * @param {LoanDeleteArgs} args - Arguments to delete one Loan.
     * @example
     * // Delete one Loan
     * const Loan = await prisma.loan.delete({
     *   where: {
     *     // ... filter to delete one Loan
     *   }
     * })
     * 
     */
    delete<T extends LoanDeleteArgs>(args: SelectSubset<T, LoanDeleteArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Loan.
     * @param {LoanUpdateArgs} args - Arguments to update one Loan.
     * @example
     * // Update one Loan
     * const loan = await prisma.loan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LoanUpdateArgs>(args: SelectSubset<T, LoanUpdateArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Loans.
     * @param {LoanDeleteManyArgs} args - Arguments to filter Loans to delete.
     * @example
     * // Delete a few Loans
     * const { count } = await prisma.loan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LoanDeleteManyArgs>(args?: SelectSubset<T, LoanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Loans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Loans
     * const loan = await prisma.loan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LoanUpdateManyArgs>(args: SelectSubset<T, LoanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Loan.
     * @param {LoanUpsertArgs} args - Arguments to update or create a Loan.
     * @example
     * // Update or create a Loan
     * const loan = await prisma.loan.upsert({
     *   create: {
     *     // ... data to create a Loan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Loan we want to update
     *   }
     * })
     */
    upsert<T extends LoanUpsertArgs>(args: SelectSubset<T, LoanUpsertArgs<ExtArgs>>): Prisma__LoanClient<$Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Loans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanCountArgs} args - Arguments to filter Loans to count.
     * @example
     * // Count the number of Loans
     * const count = await prisma.loan.count({
     *   where: {
     *     // ... the filter for the Loans we want to count
     *   }
     * })
    **/
    count<T extends LoanCountArgs>(
      args?: Subset<T, LoanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LoanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Loan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LoanAggregateArgs>(args: Subset<T, LoanAggregateArgs>): Prisma.PrismaPromise<GetLoanAggregateType<T>>

    /**
     * Group by Loan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanGroupByArgs} args - Group by arguments.
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
      T extends LoanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LoanGroupByArgs['orderBy'] }
        : { orderBy?: LoanGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LoanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Loan model
   */
  readonly fields: LoanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Loan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LoanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instrument<T extends Loan$instrumentArgs<ExtArgs> = {}>(args?: Subset<T, Loan$instrumentArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the Loan model
   */ 
  interface LoanFieldRefs {
    readonly id: FieldRef<"Loan", 'String'>
    readonly orgId: FieldRef<"Loan", 'String'>
    readonly instrumentId: FieldRef<"Loan", 'String'>
    readonly borrowerRef: FieldRef<"Loan", 'String'>
    readonly principalMinor: FieldRef<"Loan", 'BigInt'>
    readonly rateBps: FieldRef<"Loan", 'Int'>
    readonly collateralRef: FieldRef<"Loan", 'String'>
    readonly currency: FieldRef<"Loan", 'String'>
    readonly status: FieldRef<"Loan", 'LoanStatus'>
    readonly intentId: FieldRef<"Loan", 'String'>
    readonly createdAt: FieldRef<"Loan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Loan findUnique
   */
  export type LoanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan findUniqueOrThrow
   */
  export type LoanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan findFirst
   */
  export type LoanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Loans.
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Loans.
     */
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Loan findFirstOrThrow
   */
  export type LoanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loan to fetch.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Loans.
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Loans.
     */
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Loan findMany
   */
  export type LoanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter, which Loans to fetch.
     */
    where?: LoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Loans to fetch.
     */
    orderBy?: LoanOrderByWithRelationInput | LoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Loans.
     */
    cursor?: LoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Loans.
     */
    skip?: number
    distinct?: LoanScalarFieldEnum | LoanScalarFieldEnum[]
  }

  /**
   * Loan create
   */
  export type LoanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * The data needed to create a Loan.
     */
    data: XOR<LoanCreateInput, LoanUncheckedCreateInput>
  }

  /**
   * Loan createMany
   */
  export type LoanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Loans.
     */
    data: LoanCreateManyInput | LoanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Loan createManyAndReturn
   */
  export type LoanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Loans.
     */
    data: LoanCreateManyInput | LoanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Loan update
   */
  export type LoanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * The data needed to update a Loan.
     */
    data: XOR<LoanUpdateInput, LoanUncheckedUpdateInput>
    /**
     * Choose, which Loan to update.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan updateMany
   */
  export type LoanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Loans.
     */
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyInput>
    /**
     * Filter which Loans to update
     */
    where?: LoanWhereInput
  }

  /**
   * Loan upsert
   */
  export type LoanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * The filter to search for the Loan to update in case it exists.
     */
    where: LoanWhereUniqueInput
    /**
     * In case the Loan found by the `where` argument doesn't exist, create a new Loan with this data.
     */
    create: XOR<LoanCreateInput, LoanUncheckedCreateInput>
    /**
     * In case the Loan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LoanUpdateInput, LoanUncheckedUpdateInput>
  }

  /**
   * Loan delete
   */
  export type LoanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
    /**
     * Filter which Loan to delete.
     */
    where: LoanWhereUniqueInput
  }

  /**
   * Loan deleteMany
   */
  export type LoanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Loans to delete
     */
    where?: LoanWhereInput
  }

  /**
   * Loan.instrument
   */
  export type Loan$instrumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instrument
     */
    select?: InstrumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstrumentInclude<ExtArgs> | null
    where?: InstrumentWhereInput
  }

  /**
   * Loan without action
   */
  export type LoanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: LoanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LoanInclude<ExtArgs> | null
  }


  /**
   * Model Cashflow
   */

  export type AggregateCashflow = {
    _count: CashflowCountAggregateOutputType | null
    _avg: CashflowAvgAggregateOutputType | null
    _sum: CashflowSumAggregateOutputType | null
    _min: CashflowMinAggregateOutputType | null
    _max: CashflowMaxAggregateOutputType | null
  }

  export type CashflowAvgAggregateOutputType = {
    amountMinor: number | null
  }

  export type CashflowSumAggregateOutputType = {
    amountMinor: bigint | null
  }

  export type CashflowMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    instrumentId: string | null
    type: $Enums.CashflowType | null
    amountMinor: bigint | null
    currency: string | null
    scheduledAt: Date | null
    executedAt: Date | null
    batchIntentId: string | null
  }

  export type CashflowMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    instrumentId: string | null
    type: $Enums.CashflowType | null
    amountMinor: bigint | null
    currency: string | null
    scheduledAt: Date | null
    executedAt: Date | null
    batchIntentId: string | null
  }

  export type CashflowCountAggregateOutputType = {
    id: number
    orgId: number
    instrumentId: number
    type: number
    amountMinor: number
    currency: number
    scheduledAt: number
    executedAt: number
    batchIntentId: number
    _all: number
  }


  export type CashflowAvgAggregateInputType = {
    amountMinor?: true
  }

  export type CashflowSumAggregateInputType = {
    amountMinor?: true
  }

  export type CashflowMinAggregateInputType = {
    id?: true
    orgId?: true
    instrumentId?: true
    type?: true
    amountMinor?: true
    currency?: true
    scheduledAt?: true
    executedAt?: true
    batchIntentId?: true
  }

  export type CashflowMaxAggregateInputType = {
    id?: true
    orgId?: true
    instrumentId?: true
    type?: true
    amountMinor?: true
    currency?: true
    scheduledAt?: true
    executedAt?: true
    batchIntentId?: true
  }

  export type CashflowCountAggregateInputType = {
    id?: true
    orgId?: true
    instrumentId?: true
    type?: true
    amountMinor?: true
    currency?: true
    scheduledAt?: true
    executedAt?: true
    batchIntentId?: true
    _all?: true
  }

  export type CashflowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cashflow to aggregate.
     */
    where?: CashflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cashflows to fetch.
     */
    orderBy?: CashflowOrderByWithRelationInput | CashflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CashflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cashflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cashflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cashflows
    **/
    _count?: true | CashflowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CashflowAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CashflowSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CashflowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CashflowMaxAggregateInputType
  }

  export type GetCashflowAggregateType<T extends CashflowAggregateArgs> = {
        [P in keyof T & keyof AggregateCashflow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCashflow[P]>
      : GetScalarType<T[P], AggregateCashflow[P]>
  }




  export type CashflowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CashflowWhereInput
    orderBy?: CashflowOrderByWithAggregationInput | CashflowOrderByWithAggregationInput[]
    by: CashflowScalarFieldEnum[] | CashflowScalarFieldEnum
    having?: CashflowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CashflowCountAggregateInputType | true
    _avg?: CashflowAvgAggregateInputType
    _sum?: CashflowSumAggregateInputType
    _min?: CashflowMinAggregateInputType
    _max?: CashflowMaxAggregateInputType
  }

  export type CashflowGroupByOutputType = {
    id: string
    orgId: string
    instrumentId: string
    type: $Enums.CashflowType
    amountMinor: bigint
    currency: string
    scheduledAt: Date
    executedAt: Date | null
    batchIntentId: string | null
    _count: CashflowCountAggregateOutputType | null
    _avg: CashflowAvgAggregateOutputType | null
    _sum: CashflowSumAggregateOutputType | null
    _min: CashflowMinAggregateOutputType | null
    _max: CashflowMaxAggregateOutputType | null
  }

  type GetCashflowGroupByPayload<T extends CashflowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CashflowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CashflowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CashflowGroupByOutputType[P]>
            : GetScalarType<T[P], CashflowGroupByOutputType[P]>
        }
      >
    >


  export type CashflowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    instrumentId?: boolean
    type?: boolean
    amountMinor?: boolean
    currency?: boolean
    scheduledAt?: boolean
    executedAt?: boolean
    batchIntentId?: boolean
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cashflow"]>

  export type CashflowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    instrumentId?: boolean
    type?: boolean
    amountMinor?: boolean
    currency?: boolean
    scheduledAt?: boolean
    executedAt?: boolean
    batchIntentId?: boolean
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cashflow"]>

  export type CashflowSelectScalar = {
    id?: boolean
    orgId?: boolean
    instrumentId?: boolean
    type?: boolean
    amountMinor?: boolean
    currency?: boolean
    scheduledAt?: boolean
    executedAt?: boolean
    batchIntentId?: boolean
  }

  export type CashflowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }
  export type CashflowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instrument?: boolean | InstrumentDefaultArgs<ExtArgs>
  }

  export type $CashflowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cashflow"
    objects: {
      instrument: Prisma.$InstrumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      instrumentId: string
      type: $Enums.CashflowType
      amountMinor: bigint
      currency: string
      scheduledAt: Date
      executedAt: Date | null
      batchIntentId: string | null
    }, ExtArgs["result"]["cashflow"]>
    composites: {}
  }

  type CashflowGetPayload<S extends boolean | null | undefined | CashflowDefaultArgs> = $Result.GetResult<Prisma.$CashflowPayload, S>

  type CashflowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CashflowFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CashflowCountAggregateInputType | true
    }

  export interface CashflowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cashflow'], meta: { name: 'Cashflow' } }
    /**
     * Find zero or one Cashflow that matches the filter.
     * @param {CashflowFindUniqueArgs} args - Arguments to find a Cashflow
     * @example
     * // Get one Cashflow
     * const cashflow = await prisma.cashflow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CashflowFindUniqueArgs>(args: SelectSubset<T, CashflowFindUniqueArgs<ExtArgs>>): Prisma__CashflowClient<$Result.GetResult<Prisma.$CashflowPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Cashflow that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CashflowFindUniqueOrThrowArgs} args - Arguments to find a Cashflow
     * @example
     * // Get one Cashflow
     * const cashflow = await prisma.cashflow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CashflowFindUniqueOrThrowArgs>(args: SelectSubset<T, CashflowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CashflowClient<$Result.GetResult<Prisma.$CashflowPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Cashflow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashflowFindFirstArgs} args - Arguments to find a Cashflow
     * @example
     * // Get one Cashflow
     * const cashflow = await prisma.cashflow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CashflowFindFirstArgs>(args?: SelectSubset<T, CashflowFindFirstArgs<ExtArgs>>): Prisma__CashflowClient<$Result.GetResult<Prisma.$CashflowPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Cashflow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashflowFindFirstOrThrowArgs} args - Arguments to find a Cashflow
     * @example
     * // Get one Cashflow
     * const cashflow = await prisma.cashflow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CashflowFindFirstOrThrowArgs>(args?: SelectSubset<T, CashflowFindFirstOrThrowArgs<ExtArgs>>): Prisma__CashflowClient<$Result.GetResult<Prisma.$CashflowPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Cashflows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashflowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cashflows
     * const cashflows = await prisma.cashflow.findMany()
     * 
     * // Get first 10 Cashflows
     * const cashflows = await prisma.cashflow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cashflowWithIdOnly = await prisma.cashflow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CashflowFindManyArgs>(args?: SelectSubset<T, CashflowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashflowPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Cashflow.
     * @param {CashflowCreateArgs} args - Arguments to create a Cashflow.
     * @example
     * // Create one Cashflow
     * const Cashflow = await prisma.cashflow.create({
     *   data: {
     *     // ... data to create a Cashflow
     *   }
     * })
     * 
     */
    create<T extends CashflowCreateArgs>(args: SelectSubset<T, CashflowCreateArgs<ExtArgs>>): Prisma__CashflowClient<$Result.GetResult<Prisma.$CashflowPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Cashflows.
     * @param {CashflowCreateManyArgs} args - Arguments to create many Cashflows.
     * @example
     * // Create many Cashflows
     * const cashflow = await prisma.cashflow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CashflowCreateManyArgs>(args?: SelectSubset<T, CashflowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cashflows and returns the data saved in the database.
     * @param {CashflowCreateManyAndReturnArgs} args - Arguments to create many Cashflows.
     * @example
     * // Create many Cashflows
     * const cashflow = await prisma.cashflow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cashflows and only return the `id`
     * const cashflowWithIdOnly = await prisma.cashflow.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CashflowCreateManyAndReturnArgs>(args?: SelectSubset<T, CashflowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CashflowPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Cashflow.
     * @param {CashflowDeleteArgs} args - Arguments to delete one Cashflow.
     * @example
     * // Delete one Cashflow
     * const Cashflow = await prisma.cashflow.delete({
     *   where: {
     *     // ... filter to delete one Cashflow
     *   }
     * })
     * 
     */
    delete<T extends CashflowDeleteArgs>(args: SelectSubset<T, CashflowDeleteArgs<ExtArgs>>): Prisma__CashflowClient<$Result.GetResult<Prisma.$CashflowPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Cashflow.
     * @param {CashflowUpdateArgs} args - Arguments to update one Cashflow.
     * @example
     * // Update one Cashflow
     * const cashflow = await prisma.cashflow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CashflowUpdateArgs>(args: SelectSubset<T, CashflowUpdateArgs<ExtArgs>>): Prisma__CashflowClient<$Result.GetResult<Prisma.$CashflowPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Cashflows.
     * @param {CashflowDeleteManyArgs} args - Arguments to filter Cashflows to delete.
     * @example
     * // Delete a few Cashflows
     * const { count } = await prisma.cashflow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CashflowDeleteManyArgs>(args?: SelectSubset<T, CashflowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cashflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashflowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cashflows
     * const cashflow = await prisma.cashflow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CashflowUpdateManyArgs>(args: SelectSubset<T, CashflowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Cashflow.
     * @param {CashflowUpsertArgs} args - Arguments to update or create a Cashflow.
     * @example
     * // Update or create a Cashflow
     * const cashflow = await prisma.cashflow.upsert({
     *   create: {
     *     // ... data to create a Cashflow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cashflow we want to update
     *   }
     * })
     */
    upsert<T extends CashflowUpsertArgs>(args: SelectSubset<T, CashflowUpsertArgs<ExtArgs>>): Prisma__CashflowClient<$Result.GetResult<Prisma.$CashflowPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Cashflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashflowCountArgs} args - Arguments to filter Cashflows to count.
     * @example
     * // Count the number of Cashflows
     * const count = await prisma.cashflow.count({
     *   where: {
     *     // ... the filter for the Cashflows we want to count
     *   }
     * })
    **/
    count<T extends CashflowCountArgs>(
      args?: Subset<T, CashflowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CashflowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cashflow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashflowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CashflowAggregateArgs>(args: Subset<T, CashflowAggregateArgs>): Prisma.PrismaPromise<GetCashflowAggregateType<T>>

    /**
     * Group by Cashflow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CashflowGroupByArgs} args - Group by arguments.
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
      T extends CashflowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CashflowGroupByArgs['orderBy'] }
        : { orderBy?: CashflowGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CashflowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCashflowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cashflow model
   */
  readonly fields: CashflowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cashflow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CashflowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instrument<T extends InstrumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstrumentDefaultArgs<ExtArgs>>): Prisma__InstrumentClient<$Result.GetResult<Prisma.$InstrumentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Cashflow model
   */ 
  interface CashflowFieldRefs {
    readonly id: FieldRef<"Cashflow", 'String'>
    readonly orgId: FieldRef<"Cashflow", 'String'>
    readonly instrumentId: FieldRef<"Cashflow", 'String'>
    readonly type: FieldRef<"Cashflow", 'CashflowType'>
    readonly amountMinor: FieldRef<"Cashflow", 'BigInt'>
    readonly currency: FieldRef<"Cashflow", 'String'>
    readonly scheduledAt: FieldRef<"Cashflow", 'DateTime'>
    readonly executedAt: FieldRef<"Cashflow", 'DateTime'>
    readonly batchIntentId: FieldRef<"Cashflow", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Cashflow findUnique
   */
  export type CashflowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cashflow
     */
    select?: CashflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashflowInclude<ExtArgs> | null
    /**
     * Filter, which Cashflow to fetch.
     */
    where: CashflowWhereUniqueInput
  }

  /**
   * Cashflow findUniqueOrThrow
   */
  export type CashflowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cashflow
     */
    select?: CashflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashflowInclude<ExtArgs> | null
    /**
     * Filter, which Cashflow to fetch.
     */
    where: CashflowWhereUniqueInput
  }

  /**
   * Cashflow findFirst
   */
  export type CashflowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cashflow
     */
    select?: CashflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashflowInclude<ExtArgs> | null
    /**
     * Filter, which Cashflow to fetch.
     */
    where?: CashflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cashflows to fetch.
     */
    orderBy?: CashflowOrderByWithRelationInput | CashflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cashflows.
     */
    cursor?: CashflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cashflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cashflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cashflows.
     */
    distinct?: CashflowScalarFieldEnum | CashflowScalarFieldEnum[]
  }

  /**
   * Cashflow findFirstOrThrow
   */
  export type CashflowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cashflow
     */
    select?: CashflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashflowInclude<ExtArgs> | null
    /**
     * Filter, which Cashflow to fetch.
     */
    where?: CashflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cashflows to fetch.
     */
    orderBy?: CashflowOrderByWithRelationInput | CashflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cashflows.
     */
    cursor?: CashflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cashflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cashflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cashflows.
     */
    distinct?: CashflowScalarFieldEnum | CashflowScalarFieldEnum[]
  }

  /**
   * Cashflow findMany
   */
  export type CashflowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cashflow
     */
    select?: CashflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashflowInclude<ExtArgs> | null
    /**
     * Filter, which Cashflows to fetch.
     */
    where?: CashflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cashflows to fetch.
     */
    orderBy?: CashflowOrderByWithRelationInput | CashflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cashflows.
     */
    cursor?: CashflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cashflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cashflows.
     */
    skip?: number
    distinct?: CashflowScalarFieldEnum | CashflowScalarFieldEnum[]
  }

  /**
   * Cashflow create
   */
  export type CashflowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cashflow
     */
    select?: CashflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashflowInclude<ExtArgs> | null
    /**
     * The data needed to create a Cashflow.
     */
    data: XOR<CashflowCreateInput, CashflowUncheckedCreateInput>
  }

  /**
   * Cashflow createMany
   */
  export type CashflowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cashflows.
     */
    data: CashflowCreateManyInput | CashflowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cashflow createManyAndReturn
   */
  export type CashflowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cashflow
     */
    select?: CashflowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Cashflows.
     */
    data: CashflowCreateManyInput | CashflowCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashflowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Cashflow update
   */
  export type CashflowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cashflow
     */
    select?: CashflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashflowInclude<ExtArgs> | null
    /**
     * The data needed to update a Cashflow.
     */
    data: XOR<CashflowUpdateInput, CashflowUncheckedUpdateInput>
    /**
     * Choose, which Cashflow to update.
     */
    where: CashflowWhereUniqueInput
  }

  /**
   * Cashflow updateMany
   */
  export type CashflowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cashflows.
     */
    data: XOR<CashflowUpdateManyMutationInput, CashflowUncheckedUpdateManyInput>
    /**
     * Filter which Cashflows to update
     */
    where?: CashflowWhereInput
  }

  /**
   * Cashflow upsert
   */
  export type CashflowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cashflow
     */
    select?: CashflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashflowInclude<ExtArgs> | null
    /**
     * The filter to search for the Cashflow to update in case it exists.
     */
    where: CashflowWhereUniqueInput
    /**
     * In case the Cashflow found by the `where` argument doesn't exist, create a new Cashflow with this data.
     */
    create: XOR<CashflowCreateInput, CashflowUncheckedCreateInput>
    /**
     * In case the Cashflow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CashflowUpdateInput, CashflowUncheckedUpdateInput>
  }

  /**
   * Cashflow delete
   */
  export type CashflowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cashflow
     */
    select?: CashflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashflowInclude<ExtArgs> | null
    /**
     * Filter which Cashflow to delete.
     */
    where: CashflowWhereUniqueInput
  }

  /**
   * Cashflow deleteMany
   */
  export type CashflowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cashflows to delete
     */
    where?: CashflowWhereInput
  }

  /**
   * Cashflow without action
   */
  export type CashflowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cashflow
     */
    select?: CashflowSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CashflowInclude<ExtArgs> | null
  }


  /**
   * Model DvpTrade
   */

  export type AggregateDvpTrade = {
    _count: DvpTradeCountAggregateOutputType | null
    _avg: DvpTradeAvgAggregateOutputType | null
    _sum: DvpTradeSumAggregateOutputType | null
    _min: DvpTradeMinAggregateOutputType | null
    _max: DvpTradeMaxAggregateOutputType | null
  }

  export type DvpTradeAvgAggregateOutputType = {
    unitsMinor: number | null
    priceMinor: number | null
  }

  export type DvpTradeSumAggregateOutputType = {
    unitsMinor: bigint | null
    priceMinor: bigint | null
  }

  export type DvpTradeMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    buyerRef: string | null
    sellerRef: string | null
    instrumentId: string | null
    unitsMinor: bigint | null
    priceMinor: bigint | null
    currency: string | null
    status: $Enums.DvpStatus | null
    escrowIntentId: string | null
    createdAt: Date | null
  }

  export type DvpTradeMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    buyerRef: string | null
    sellerRef: string | null
    instrumentId: string | null
    unitsMinor: bigint | null
    priceMinor: bigint | null
    currency: string | null
    status: $Enums.DvpStatus | null
    escrowIntentId: string | null
    createdAt: Date | null
  }

  export type DvpTradeCountAggregateOutputType = {
    id: number
    orgId: number
    buyerRef: number
    sellerRef: number
    instrumentId: number
    unitsMinor: number
    priceMinor: number
    currency: number
    status: number
    escrowIntentId: number
    createdAt: number
    _all: number
  }


  export type DvpTradeAvgAggregateInputType = {
    unitsMinor?: true
    priceMinor?: true
  }

  export type DvpTradeSumAggregateInputType = {
    unitsMinor?: true
    priceMinor?: true
  }

  export type DvpTradeMinAggregateInputType = {
    id?: true
    orgId?: true
    buyerRef?: true
    sellerRef?: true
    instrumentId?: true
    unitsMinor?: true
    priceMinor?: true
    currency?: true
    status?: true
    escrowIntentId?: true
    createdAt?: true
  }

  export type DvpTradeMaxAggregateInputType = {
    id?: true
    orgId?: true
    buyerRef?: true
    sellerRef?: true
    instrumentId?: true
    unitsMinor?: true
    priceMinor?: true
    currency?: true
    status?: true
    escrowIntentId?: true
    createdAt?: true
  }

  export type DvpTradeCountAggregateInputType = {
    id?: true
    orgId?: true
    buyerRef?: true
    sellerRef?: true
    instrumentId?: true
    unitsMinor?: true
    priceMinor?: true
    currency?: true
    status?: true
    escrowIntentId?: true
    createdAt?: true
    _all?: true
  }

  export type DvpTradeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DvpTrade to aggregate.
     */
    where?: DvpTradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DvpTrades to fetch.
     */
    orderBy?: DvpTradeOrderByWithRelationInput | DvpTradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DvpTradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DvpTrades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DvpTrades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DvpTrades
    **/
    _count?: true | DvpTradeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DvpTradeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DvpTradeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DvpTradeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DvpTradeMaxAggregateInputType
  }

  export type GetDvpTradeAggregateType<T extends DvpTradeAggregateArgs> = {
        [P in keyof T & keyof AggregateDvpTrade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDvpTrade[P]>
      : GetScalarType<T[P], AggregateDvpTrade[P]>
  }




  export type DvpTradeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DvpTradeWhereInput
    orderBy?: DvpTradeOrderByWithAggregationInput | DvpTradeOrderByWithAggregationInput[]
    by: DvpTradeScalarFieldEnum[] | DvpTradeScalarFieldEnum
    having?: DvpTradeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DvpTradeCountAggregateInputType | true
    _avg?: DvpTradeAvgAggregateInputType
    _sum?: DvpTradeSumAggregateInputType
    _min?: DvpTradeMinAggregateInputType
    _max?: DvpTradeMaxAggregateInputType
  }

  export type DvpTradeGroupByOutputType = {
    id: string
    orgId: string
    buyerRef: string
    sellerRef: string
    instrumentId: string
    unitsMinor: bigint
    priceMinor: bigint
    currency: string
    status: $Enums.DvpStatus
    escrowIntentId: string | null
    createdAt: Date
    _count: DvpTradeCountAggregateOutputType | null
    _avg: DvpTradeAvgAggregateOutputType | null
    _sum: DvpTradeSumAggregateOutputType | null
    _min: DvpTradeMinAggregateOutputType | null
    _max: DvpTradeMaxAggregateOutputType | null
  }

  type GetDvpTradeGroupByPayload<T extends DvpTradeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DvpTradeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DvpTradeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DvpTradeGroupByOutputType[P]>
            : GetScalarType<T[P], DvpTradeGroupByOutputType[P]>
        }
      >
    >


  export type DvpTradeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    buyerRef?: boolean
    sellerRef?: boolean
    instrumentId?: boolean
    unitsMinor?: boolean
    priceMinor?: boolean
    currency?: boolean
    status?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["dvpTrade"]>

  export type DvpTradeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    buyerRef?: boolean
    sellerRef?: boolean
    instrumentId?: boolean
    unitsMinor?: boolean
    priceMinor?: boolean
    currency?: boolean
    status?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["dvpTrade"]>

  export type DvpTradeSelectScalar = {
    id?: boolean
    orgId?: boolean
    buyerRef?: boolean
    sellerRef?: boolean
    instrumentId?: boolean
    unitsMinor?: boolean
    priceMinor?: boolean
    currency?: boolean
    status?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }


  export type $DvpTradePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DvpTrade"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      buyerRef: string
      sellerRef: string
      instrumentId: string
      unitsMinor: bigint
      priceMinor: bigint
      currency: string
      status: $Enums.DvpStatus
      escrowIntentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["dvpTrade"]>
    composites: {}
  }

  type DvpTradeGetPayload<S extends boolean | null | undefined | DvpTradeDefaultArgs> = $Result.GetResult<Prisma.$DvpTradePayload, S>

  type DvpTradeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DvpTradeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DvpTradeCountAggregateInputType | true
    }

  export interface DvpTradeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DvpTrade'], meta: { name: 'DvpTrade' } }
    /**
     * Find zero or one DvpTrade that matches the filter.
     * @param {DvpTradeFindUniqueArgs} args - Arguments to find a DvpTrade
     * @example
     * // Get one DvpTrade
     * const dvpTrade = await prisma.dvpTrade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DvpTradeFindUniqueArgs>(args: SelectSubset<T, DvpTradeFindUniqueArgs<ExtArgs>>): Prisma__DvpTradeClient<$Result.GetResult<Prisma.$DvpTradePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DvpTrade that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DvpTradeFindUniqueOrThrowArgs} args - Arguments to find a DvpTrade
     * @example
     * // Get one DvpTrade
     * const dvpTrade = await prisma.dvpTrade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DvpTradeFindUniqueOrThrowArgs>(args: SelectSubset<T, DvpTradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DvpTradeClient<$Result.GetResult<Prisma.$DvpTradePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DvpTrade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DvpTradeFindFirstArgs} args - Arguments to find a DvpTrade
     * @example
     * // Get one DvpTrade
     * const dvpTrade = await prisma.dvpTrade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DvpTradeFindFirstArgs>(args?: SelectSubset<T, DvpTradeFindFirstArgs<ExtArgs>>): Prisma__DvpTradeClient<$Result.GetResult<Prisma.$DvpTradePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DvpTrade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DvpTradeFindFirstOrThrowArgs} args - Arguments to find a DvpTrade
     * @example
     * // Get one DvpTrade
     * const dvpTrade = await prisma.dvpTrade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DvpTradeFindFirstOrThrowArgs>(args?: SelectSubset<T, DvpTradeFindFirstOrThrowArgs<ExtArgs>>): Prisma__DvpTradeClient<$Result.GetResult<Prisma.$DvpTradePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DvpTrades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DvpTradeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DvpTrades
     * const dvpTrades = await prisma.dvpTrade.findMany()
     * 
     * // Get first 10 DvpTrades
     * const dvpTrades = await prisma.dvpTrade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dvpTradeWithIdOnly = await prisma.dvpTrade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DvpTradeFindManyArgs>(args?: SelectSubset<T, DvpTradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DvpTradePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DvpTrade.
     * @param {DvpTradeCreateArgs} args - Arguments to create a DvpTrade.
     * @example
     * // Create one DvpTrade
     * const DvpTrade = await prisma.dvpTrade.create({
     *   data: {
     *     // ... data to create a DvpTrade
     *   }
     * })
     * 
     */
    create<T extends DvpTradeCreateArgs>(args: SelectSubset<T, DvpTradeCreateArgs<ExtArgs>>): Prisma__DvpTradeClient<$Result.GetResult<Prisma.$DvpTradePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DvpTrades.
     * @param {DvpTradeCreateManyArgs} args - Arguments to create many DvpTrades.
     * @example
     * // Create many DvpTrades
     * const dvpTrade = await prisma.dvpTrade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DvpTradeCreateManyArgs>(args?: SelectSubset<T, DvpTradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DvpTrades and returns the data saved in the database.
     * @param {DvpTradeCreateManyAndReturnArgs} args - Arguments to create many DvpTrades.
     * @example
     * // Create many DvpTrades
     * const dvpTrade = await prisma.dvpTrade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DvpTrades and only return the `id`
     * const dvpTradeWithIdOnly = await prisma.dvpTrade.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DvpTradeCreateManyAndReturnArgs>(args?: SelectSubset<T, DvpTradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DvpTradePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DvpTrade.
     * @param {DvpTradeDeleteArgs} args - Arguments to delete one DvpTrade.
     * @example
     * // Delete one DvpTrade
     * const DvpTrade = await prisma.dvpTrade.delete({
     *   where: {
     *     // ... filter to delete one DvpTrade
     *   }
     * })
     * 
     */
    delete<T extends DvpTradeDeleteArgs>(args: SelectSubset<T, DvpTradeDeleteArgs<ExtArgs>>): Prisma__DvpTradeClient<$Result.GetResult<Prisma.$DvpTradePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DvpTrade.
     * @param {DvpTradeUpdateArgs} args - Arguments to update one DvpTrade.
     * @example
     * // Update one DvpTrade
     * const dvpTrade = await prisma.dvpTrade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DvpTradeUpdateArgs>(args: SelectSubset<T, DvpTradeUpdateArgs<ExtArgs>>): Prisma__DvpTradeClient<$Result.GetResult<Prisma.$DvpTradePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DvpTrades.
     * @param {DvpTradeDeleteManyArgs} args - Arguments to filter DvpTrades to delete.
     * @example
     * // Delete a few DvpTrades
     * const { count } = await prisma.dvpTrade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DvpTradeDeleteManyArgs>(args?: SelectSubset<T, DvpTradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DvpTrades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DvpTradeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DvpTrades
     * const dvpTrade = await prisma.dvpTrade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DvpTradeUpdateManyArgs>(args: SelectSubset<T, DvpTradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DvpTrade.
     * @param {DvpTradeUpsertArgs} args - Arguments to update or create a DvpTrade.
     * @example
     * // Update or create a DvpTrade
     * const dvpTrade = await prisma.dvpTrade.upsert({
     *   create: {
     *     // ... data to create a DvpTrade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DvpTrade we want to update
     *   }
     * })
     */
    upsert<T extends DvpTradeUpsertArgs>(args: SelectSubset<T, DvpTradeUpsertArgs<ExtArgs>>): Prisma__DvpTradeClient<$Result.GetResult<Prisma.$DvpTradePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DvpTrades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DvpTradeCountArgs} args - Arguments to filter DvpTrades to count.
     * @example
     * // Count the number of DvpTrades
     * const count = await prisma.dvpTrade.count({
     *   where: {
     *     // ... the filter for the DvpTrades we want to count
     *   }
     * })
    **/
    count<T extends DvpTradeCountArgs>(
      args?: Subset<T, DvpTradeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DvpTradeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DvpTrade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DvpTradeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DvpTradeAggregateArgs>(args: Subset<T, DvpTradeAggregateArgs>): Prisma.PrismaPromise<GetDvpTradeAggregateType<T>>

    /**
     * Group by DvpTrade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DvpTradeGroupByArgs} args - Group by arguments.
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
      T extends DvpTradeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DvpTradeGroupByArgs['orderBy'] }
        : { orderBy?: DvpTradeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DvpTradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDvpTradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DvpTrade model
   */
  readonly fields: DvpTradeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DvpTrade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DvpTradeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the DvpTrade model
   */ 
  interface DvpTradeFieldRefs {
    readonly id: FieldRef<"DvpTrade", 'String'>
    readonly orgId: FieldRef<"DvpTrade", 'String'>
    readonly buyerRef: FieldRef<"DvpTrade", 'String'>
    readonly sellerRef: FieldRef<"DvpTrade", 'String'>
    readonly instrumentId: FieldRef<"DvpTrade", 'String'>
    readonly unitsMinor: FieldRef<"DvpTrade", 'BigInt'>
    readonly priceMinor: FieldRef<"DvpTrade", 'BigInt'>
    readonly currency: FieldRef<"DvpTrade", 'String'>
    readonly status: FieldRef<"DvpTrade", 'DvpStatus'>
    readonly escrowIntentId: FieldRef<"DvpTrade", 'String'>
    readonly createdAt: FieldRef<"DvpTrade", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DvpTrade findUnique
   */
  export type DvpTradeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DvpTrade
     */
    select?: DvpTradeSelect<ExtArgs> | null
    /**
     * Filter, which DvpTrade to fetch.
     */
    where: DvpTradeWhereUniqueInput
  }

  /**
   * DvpTrade findUniqueOrThrow
   */
  export type DvpTradeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DvpTrade
     */
    select?: DvpTradeSelect<ExtArgs> | null
    /**
     * Filter, which DvpTrade to fetch.
     */
    where: DvpTradeWhereUniqueInput
  }

  /**
   * DvpTrade findFirst
   */
  export type DvpTradeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DvpTrade
     */
    select?: DvpTradeSelect<ExtArgs> | null
    /**
     * Filter, which DvpTrade to fetch.
     */
    where?: DvpTradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DvpTrades to fetch.
     */
    orderBy?: DvpTradeOrderByWithRelationInput | DvpTradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DvpTrades.
     */
    cursor?: DvpTradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DvpTrades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DvpTrades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DvpTrades.
     */
    distinct?: DvpTradeScalarFieldEnum | DvpTradeScalarFieldEnum[]
  }

  /**
   * DvpTrade findFirstOrThrow
   */
  export type DvpTradeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DvpTrade
     */
    select?: DvpTradeSelect<ExtArgs> | null
    /**
     * Filter, which DvpTrade to fetch.
     */
    where?: DvpTradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DvpTrades to fetch.
     */
    orderBy?: DvpTradeOrderByWithRelationInput | DvpTradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DvpTrades.
     */
    cursor?: DvpTradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DvpTrades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DvpTrades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DvpTrades.
     */
    distinct?: DvpTradeScalarFieldEnum | DvpTradeScalarFieldEnum[]
  }

  /**
   * DvpTrade findMany
   */
  export type DvpTradeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DvpTrade
     */
    select?: DvpTradeSelect<ExtArgs> | null
    /**
     * Filter, which DvpTrades to fetch.
     */
    where?: DvpTradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DvpTrades to fetch.
     */
    orderBy?: DvpTradeOrderByWithRelationInput | DvpTradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DvpTrades.
     */
    cursor?: DvpTradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DvpTrades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DvpTrades.
     */
    skip?: number
    distinct?: DvpTradeScalarFieldEnum | DvpTradeScalarFieldEnum[]
  }

  /**
   * DvpTrade create
   */
  export type DvpTradeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DvpTrade
     */
    select?: DvpTradeSelect<ExtArgs> | null
    /**
     * The data needed to create a DvpTrade.
     */
    data: XOR<DvpTradeCreateInput, DvpTradeUncheckedCreateInput>
  }

  /**
   * DvpTrade createMany
   */
  export type DvpTradeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DvpTrades.
     */
    data: DvpTradeCreateManyInput | DvpTradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DvpTrade createManyAndReturn
   */
  export type DvpTradeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DvpTrade
     */
    select?: DvpTradeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DvpTrades.
     */
    data: DvpTradeCreateManyInput | DvpTradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DvpTrade update
   */
  export type DvpTradeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DvpTrade
     */
    select?: DvpTradeSelect<ExtArgs> | null
    /**
     * The data needed to update a DvpTrade.
     */
    data: XOR<DvpTradeUpdateInput, DvpTradeUncheckedUpdateInput>
    /**
     * Choose, which DvpTrade to update.
     */
    where: DvpTradeWhereUniqueInput
  }

  /**
   * DvpTrade updateMany
   */
  export type DvpTradeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DvpTrades.
     */
    data: XOR<DvpTradeUpdateManyMutationInput, DvpTradeUncheckedUpdateManyInput>
    /**
     * Filter which DvpTrades to update
     */
    where?: DvpTradeWhereInput
  }

  /**
   * DvpTrade upsert
   */
  export type DvpTradeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DvpTrade
     */
    select?: DvpTradeSelect<ExtArgs> | null
    /**
     * The filter to search for the DvpTrade to update in case it exists.
     */
    where: DvpTradeWhereUniqueInput
    /**
     * In case the DvpTrade found by the `where` argument doesn't exist, create a new DvpTrade with this data.
     */
    create: XOR<DvpTradeCreateInput, DvpTradeUncheckedCreateInput>
    /**
     * In case the DvpTrade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DvpTradeUpdateInput, DvpTradeUncheckedUpdateInput>
  }

  /**
   * DvpTrade delete
   */
  export type DvpTradeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DvpTrade
     */
    select?: DvpTradeSelect<ExtArgs> | null
    /**
     * Filter which DvpTrade to delete.
     */
    where: DvpTradeWhereUniqueInput
  }

  /**
   * DvpTrade deleteMany
   */
  export type DvpTradeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DvpTrades to delete
     */
    where?: DvpTradeWhereInput
  }

  /**
   * DvpTrade without action
   */
  export type DvpTradeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DvpTrade
     */
    select?: DvpTradeSelect<ExtArgs> | null
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


  export const InstrumentScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    type: 'type',
    name: 'name',
    issuerRef: 'issuerRef',
    currency: 'currency',
    terms: 'terms',
    tokenId: 'tokenId',
    createdAt: 'createdAt'
  };

  export type InstrumentScalarFieldEnum = (typeof InstrumentScalarFieldEnum)[keyof typeof InstrumentScalarFieldEnum]


  export const HoldingScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    accountRef: 'accountRef',
    instrumentId: 'instrumentId',
    unitsMinor: 'unitsMinor',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HoldingScalarFieldEnum = (typeof HoldingScalarFieldEnum)[keyof typeof HoldingScalarFieldEnum]


  export const LoanScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    instrumentId: 'instrumentId',
    borrowerRef: 'borrowerRef',
    principalMinor: 'principalMinor',
    rateBps: 'rateBps',
    collateralRef: 'collateralRef',
    currency: 'currency',
    status: 'status',
    intentId: 'intentId',
    createdAt: 'createdAt'
  };

  export type LoanScalarFieldEnum = (typeof LoanScalarFieldEnum)[keyof typeof LoanScalarFieldEnum]


  export const CashflowScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    instrumentId: 'instrumentId',
    type: 'type',
    amountMinor: 'amountMinor',
    currency: 'currency',
    scheduledAt: 'scheduledAt',
    executedAt: 'executedAt',
    batchIntentId: 'batchIntentId'
  };

  export type CashflowScalarFieldEnum = (typeof CashflowScalarFieldEnum)[keyof typeof CashflowScalarFieldEnum]


  export const DvpTradeScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    buyerRef: 'buyerRef',
    sellerRef: 'sellerRef',
    instrumentId: 'instrumentId',
    unitsMinor: 'unitsMinor',
    priceMinor: 'priceMinor',
    currency: 'currency',
    status: 'status',
    escrowIntentId: 'escrowIntentId',
    createdAt: 'createdAt'
  };

  export type DvpTradeScalarFieldEnum = (typeof DvpTradeScalarFieldEnum)[keyof typeof DvpTradeScalarFieldEnum]


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
   * Reference to a field of type 'InstrumentType'
   */
  export type EnumInstrumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InstrumentType'>
    


  /**
   * Reference to a field of type 'InstrumentType[]'
   */
  export type ListEnumInstrumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InstrumentType[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'LoanStatus'
   */
  export type EnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus'>
    


  /**
   * Reference to a field of type 'LoanStatus[]'
   */
  export type ListEnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus[]'>
    


  /**
   * Reference to a field of type 'CashflowType'
   */
  export type EnumCashflowTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CashflowType'>
    


  /**
   * Reference to a field of type 'CashflowType[]'
   */
  export type ListEnumCashflowTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CashflowType[]'>
    


  /**
   * Reference to a field of type 'DvpStatus'
   */
  export type EnumDvpStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DvpStatus'>
    


  /**
   * Reference to a field of type 'DvpStatus[]'
   */
  export type ListEnumDvpStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DvpStatus[]'>
    


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

  export type InstrumentWhereInput = {
    AND?: InstrumentWhereInput | InstrumentWhereInput[]
    OR?: InstrumentWhereInput[]
    NOT?: InstrumentWhereInput | InstrumentWhereInput[]
    id?: StringFilter<"Instrument"> | string
    orgId?: StringFilter<"Instrument"> | string
    type?: EnumInstrumentTypeFilter<"Instrument"> | $Enums.InstrumentType
    name?: StringFilter<"Instrument"> | string
    issuerRef?: StringFilter<"Instrument"> | string
    currency?: StringFilter<"Instrument"> | string
    terms?: JsonNullableFilter<"Instrument">
    tokenId?: StringNullableFilter<"Instrument"> | string | null
    createdAt?: DateTimeFilter<"Instrument"> | Date | string
    holdings?: HoldingListRelationFilter
    cashflows?: CashflowListRelationFilter
    loans?: LoanListRelationFilter
  }

  export type InstrumentOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    issuerRef?: SortOrder
    currency?: SortOrder
    terms?: SortOrderInput | SortOrder
    tokenId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    holdings?: HoldingOrderByRelationAggregateInput
    cashflows?: CashflowOrderByRelationAggregateInput
    loans?: LoanOrderByRelationAggregateInput
  }

  export type InstrumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InstrumentWhereInput | InstrumentWhereInput[]
    OR?: InstrumentWhereInput[]
    NOT?: InstrumentWhereInput | InstrumentWhereInput[]
    orgId?: StringFilter<"Instrument"> | string
    type?: EnumInstrumentTypeFilter<"Instrument"> | $Enums.InstrumentType
    name?: StringFilter<"Instrument"> | string
    issuerRef?: StringFilter<"Instrument"> | string
    currency?: StringFilter<"Instrument"> | string
    terms?: JsonNullableFilter<"Instrument">
    tokenId?: StringNullableFilter<"Instrument"> | string | null
    createdAt?: DateTimeFilter<"Instrument"> | Date | string
    holdings?: HoldingListRelationFilter
    cashflows?: CashflowListRelationFilter
    loans?: LoanListRelationFilter
  }, "id">

  export type InstrumentOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    issuerRef?: SortOrder
    currency?: SortOrder
    terms?: SortOrderInput | SortOrder
    tokenId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: InstrumentCountOrderByAggregateInput
    _max?: InstrumentMaxOrderByAggregateInput
    _min?: InstrumentMinOrderByAggregateInput
  }

  export type InstrumentScalarWhereWithAggregatesInput = {
    AND?: InstrumentScalarWhereWithAggregatesInput | InstrumentScalarWhereWithAggregatesInput[]
    OR?: InstrumentScalarWhereWithAggregatesInput[]
    NOT?: InstrumentScalarWhereWithAggregatesInput | InstrumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Instrument"> | string
    orgId?: StringWithAggregatesFilter<"Instrument"> | string
    type?: EnumInstrumentTypeWithAggregatesFilter<"Instrument"> | $Enums.InstrumentType
    name?: StringWithAggregatesFilter<"Instrument"> | string
    issuerRef?: StringWithAggregatesFilter<"Instrument"> | string
    currency?: StringWithAggregatesFilter<"Instrument"> | string
    terms?: JsonNullableWithAggregatesFilter<"Instrument">
    tokenId?: StringNullableWithAggregatesFilter<"Instrument"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Instrument"> | Date | string
  }

  export type HoldingWhereInput = {
    AND?: HoldingWhereInput | HoldingWhereInput[]
    OR?: HoldingWhereInput[]
    NOT?: HoldingWhereInput | HoldingWhereInput[]
    id?: StringFilter<"Holding"> | string
    orgId?: StringFilter<"Holding"> | string
    accountRef?: StringFilter<"Holding"> | string
    instrumentId?: StringFilter<"Holding"> | string
    unitsMinor?: BigIntFilter<"Holding"> | bigint | number
    createdAt?: DateTimeFilter<"Holding"> | Date | string
    updatedAt?: DateTimeFilter<"Holding"> | Date | string
    instrument?: XOR<InstrumentRelationFilter, InstrumentWhereInput>
  }

  export type HoldingOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    accountRef?: SortOrder
    instrumentId?: SortOrder
    unitsMinor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    instrument?: InstrumentOrderByWithRelationInput
  }

  export type HoldingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orgId_accountRef_instrumentId?: HoldingOrgIdAccountRefInstrumentIdCompoundUniqueInput
    AND?: HoldingWhereInput | HoldingWhereInput[]
    OR?: HoldingWhereInput[]
    NOT?: HoldingWhereInput | HoldingWhereInput[]
    orgId?: StringFilter<"Holding"> | string
    accountRef?: StringFilter<"Holding"> | string
    instrumentId?: StringFilter<"Holding"> | string
    unitsMinor?: BigIntFilter<"Holding"> | bigint | number
    createdAt?: DateTimeFilter<"Holding"> | Date | string
    updatedAt?: DateTimeFilter<"Holding"> | Date | string
    instrument?: XOR<InstrumentRelationFilter, InstrumentWhereInput>
  }, "id" | "orgId_accountRef_instrumentId">

  export type HoldingOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    accountRef?: SortOrder
    instrumentId?: SortOrder
    unitsMinor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HoldingCountOrderByAggregateInput
    _avg?: HoldingAvgOrderByAggregateInput
    _max?: HoldingMaxOrderByAggregateInput
    _min?: HoldingMinOrderByAggregateInput
    _sum?: HoldingSumOrderByAggregateInput
  }

  export type HoldingScalarWhereWithAggregatesInput = {
    AND?: HoldingScalarWhereWithAggregatesInput | HoldingScalarWhereWithAggregatesInput[]
    OR?: HoldingScalarWhereWithAggregatesInput[]
    NOT?: HoldingScalarWhereWithAggregatesInput | HoldingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Holding"> | string
    orgId?: StringWithAggregatesFilter<"Holding"> | string
    accountRef?: StringWithAggregatesFilter<"Holding"> | string
    instrumentId?: StringWithAggregatesFilter<"Holding"> | string
    unitsMinor?: BigIntWithAggregatesFilter<"Holding"> | bigint | number
    createdAt?: DateTimeWithAggregatesFilter<"Holding"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Holding"> | Date | string
  }

  export type LoanWhereInput = {
    AND?: LoanWhereInput | LoanWhereInput[]
    OR?: LoanWhereInput[]
    NOT?: LoanWhereInput | LoanWhereInput[]
    id?: StringFilter<"Loan"> | string
    orgId?: StringFilter<"Loan"> | string
    instrumentId?: StringNullableFilter<"Loan"> | string | null
    borrowerRef?: StringFilter<"Loan"> | string
    principalMinor?: BigIntFilter<"Loan"> | bigint | number
    rateBps?: IntFilter<"Loan"> | number
    collateralRef?: StringNullableFilter<"Loan"> | string | null
    currency?: StringFilter<"Loan"> | string
    status?: EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus
    intentId?: StringNullableFilter<"Loan"> | string | null
    createdAt?: DateTimeFilter<"Loan"> | Date | string
    instrument?: XOR<InstrumentNullableRelationFilter, InstrumentWhereInput> | null
  }

  export type LoanOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    instrumentId?: SortOrderInput | SortOrder
    borrowerRef?: SortOrder
    principalMinor?: SortOrder
    rateBps?: SortOrder
    collateralRef?: SortOrderInput | SortOrder
    currency?: SortOrder
    status?: SortOrder
    intentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    instrument?: InstrumentOrderByWithRelationInput
  }

  export type LoanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LoanWhereInput | LoanWhereInput[]
    OR?: LoanWhereInput[]
    NOT?: LoanWhereInput | LoanWhereInput[]
    orgId?: StringFilter<"Loan"> | string
    instrumentId?: StringNullableFilter<"Loan"> | string | null
    borrowerRef?: StringFilter<"Loan"> | string
    principalMinor?: BigIntFilter<"Loan"> | bigint | number
    rateBps?: IntFilter<"Loan"> | number
    collateralRef?: StringNullableFilter<"Loan"> | string | null
    currency?: StringFilter<"Loan"> | string
    status?: EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus
    intentId?: StringNullableFilter<"Loan"> | string | null
    createdAt?: DateTimeFilter<"Loan"> | Date | string
    instrument?: XOR<InstrumentNullableRelationFilter, InstrumentWhereInput> | null
  }, "id">

  export type LoanOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    instrumentId?: SortOrderInput | SortOrder
    borrowerRef?: SortOrder
    principalMinor?: SortOrder
    rateBps?: SortOrder
    collateralRef?: SortOrderInput | SortOrder
    currency?: SortOrder
    status?: SortOrder
    intentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LoanCountOrderByAggregateInput
    _avg?: LoanAvgOrderByAggregateInput
    _max?: LoanMaxOrderByAggregateInput
    _min?: LoanMinOrderByAggregateInput
    _sum?: LoanSumOrderByAggregateInput
  }

  export type LoanScalarWhereWithAggregatesInput = {
    AND?: LoanScalarWhereWithAggregatesInput | LoanScalarWhereWithAggregatesInput[]
    OR?: LoanScalarWhereWithAggregatesInput[]
    NOT?: LoanScalarWhereWithAggregatesInput | LoanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Loan"> | string
    orgId?: StringWithAggregatesFilter<"Loan"> | string
    instrumentId?: StringNullableWithAggregatesFilter<"Loan"> | string | null
    borrowerRef?: StringWithAggregatesFilter<"Loan"> | string
    principalMinor?: BigIntWithAggregatesFilter<"Loan"> | bigint | number
    rateBps?: IntWithAggregatesFilter<"Loan"> | number
    collateralRef?: StringNullableWithAggregatesFilter<"Loan"> | string | null
    currency?: StringWithAggregatesFilter<"Loan"> | string
    status?: EnumLoanStatusWithAggregatesFilter<"Loan"> | $Enums.LoanStatus
    intentId?: StringNullableWithAggregatesFilter<"Loan"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Loan"> | Date | string
  }

  export type CashflowWhereInput = {
    AND?: CashflowWhereInput | CashflowWhereInput[]
    OR?: CashflowWhereInput[]
    NOT?: CashflowWhereInput | CashflowWhereInput[]
    id?: StringFilter<"Cashflow"> | string
    orgId?: StringFilter<"Cashflow"> | string
    instrumentId?: StringFilter<"Cashflow"> | string
    type?: EnumCashflowTypeFilter<"Cashflow"> | $Enums.CashflowType
    amountMinor?: BigIntFilter<"Cashflow"> | bigint | number
    currency?: StringFilter<"Cashflow"> | string
    scheduledAt?: DateTimeFilter<"Cashflow"> | Date | string
    executedAt?: DateTimeNullableFilter<"Cashflow"> | Date | string | null
    batchIntentId?: StringNullableFilter<"Cashflow"> | string | null
    instrument?: XOR<InstrumentRelationFilter, InstrumentWhereInput>
  }

  export type CashflowOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    instrumentId?: SortOrder
    type?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    scheduledAt?: SortOrder
    executedAt?: SortOrderInput | SortOrder
    batchIntentId?: SortOrderInput | SortOrder
    instrument?: InstrumentOrderByWithRelationInput
  }

  export type CashflowWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CashflowWhereInput | CashflowWhereInput[]
    OR?: CashflowWhereInput[]
    NOT?: CashflowWhereInput | CashflowWhereInput[]
    orgId?: StringFilter<"Cashflow"> | string
    instrumentId?: StringFilter<"Cashflow"> | string
    type?: EnumCashflowTypeFilter<"Cashflow"> | $Enums.CashflowType
    amountMinor?: BigIntFilter<"Cashflow"> | bigint | number
    currency?: StringFilter<"Cashflow"> | string
    scheduledAt?: DateTimeFilter<"Cashflow"> | Date | string
    executedAt?: DateTimeNullableFilter<"Cashflow"> | Date | string | null
    batchIntentId?: StringNullableFilter<"Cashflow"> | string | null
    instrument?: XOR<InstrumentRelationFilter, InstrumentWhereInput>
  }, "id">

  export type CashflowOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    instrumentId?: SortOrder
    type?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    scheduledAt?: SortOrder
    executedAt?: SortOrderInput | SortOrder
    batchIntentId?: SortOrderInput | SortOrder
    _count?: CashflowCountOrderByAggregateInput
    _avg?: CashflowAvgOrderByAggregateInput
    _max?: CashflowMaxOrderByAggregateInput
    _min?: CashflowMinOrderByAggregateInput
    _sum?: CashflowSumOrderByAggregateInput
  }

  export type CashflowScalarWhereWithAggregatesInput = {
    AND?: CashflowScalarWhereWithAggregatesInput | CashflowScalarWhereWithAggregatesInput[]
    OR?: CashflowScalarWhereWithAggregatesInput[]
    NOT?: CashflowScalarWhereWithAggregatesInput | CashflowScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Cashflow"> | string
    orgId?: StringWithAggregatesFilter<"Cashflow"> | string
    instrumentId?: StringWithAggregatesFilter<"Cashflow"> | string
    type?: EnumCashflowTypeWithAggregatesFilter<"Cashflow"> | $Enums.CashflowType
    amountMinor?: BigIntWithAggregatesFilter<"Cashflow"> | bigint | number
    currency?: StringWithAggregatesFilter<"Cashflow"> | string
    scheduledAt?: DateTimeWithAggregatesFilter<"Cashflow"> | Date | string
    executedAt?: DateTimeNullableWithAggregatesFilter<"Cashflow"> | Date | string | null
    batchIntentId?: StringNullableWithAggregatesFilter<"Cashflow"> | string | null
  }

  export type DvpTradeWhereInput = {
    AND?: DvpTradeWhereInput | DvpTradeWhereInput[]
    OR?: DvpTradeWhereInput[]
    NOT?: DvpTradeWhereInput | DvpTradeWhereInput[]
    id?: StringFilter<"DvpTrade"> | string
    orgId?: StringFilter<"DvpTrade"> | string
    buyerRef?: StringFilter<"DvpTrade"> | string
    sellerRef?: StringFilter<"DvpTrade"> | string
    instrumentId?: StringFilter<"DvpTrade"> | string
    unitsMinor?: BigIntFilter<"DvpTrade"> | bigint | number
    priceMinor?: BigIntFilter<"DvpTrade"> | bigint | number
    currency?: StringFilter<"DvpTrade"> | string
    status?: EnumDvpStatusFilter<"DvpTrade"> | $Enums.DvpStatus
    escrowIntentId?: StringNullableFilter<"DvpTrade"> | string | null
    createdAt?: DateTimeFilter<"DvpTrade"> | Date | string
  }

  export type DvpTradeOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    buyerRef?: SortOrder
    sellerRef?: SortOrder
    instrumentId?: SortOrder
    unitsMinor?: SortOrder
    priceMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type DvpTradeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DvpTradeWhereInput | DvpTradeWhereInput[]
    OR?: DvpTradeWhereInput[]
    NOT?: DvpTradeWhereInput | DvpTradeWhereInput[]
    orgId?: StringFilter<"DvpTrade"> | string
    buyerRef?: StringFilter<"DvpTrade"> | string
    sellerRef?: StringFilter<"DvpTrade"> | string
    instrumentId?: StringFilter<"DvpTrade"> | string
    unitsMinor?: BigIntFilter<"DvpTrade"> | bigint | number
    priceMinor?: BigIntFilter<"DvpTrade"> | bigint | number
    currency?: StringFilter<"DvpTrade"> | string
    status?: EnumDvpStatusFilter<"DvpTrade"> | $Enums.DvpStatus
    escrowIntentId?: StringNullableFilter<"DvpTrade"> | string | null
    createdAt?: DateTimeFilter<"DvpTrade"> | Date | string
  }, "id">

  export type DvpTradeOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    buyerRef?: SortOrder
    sellerRef?: SortOrder
    instrumentId?: SortOrder
    unitsMinor?: SortOrder
    priceMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DvpTradeCountOrderByAggregateInput
    _avg?: DvpTradeAvgOrderByAggregateInput
    _max?: DvpTradeMaxOrderByAggregateInput
    _min?: DvpTradeMinOrderByAggregateInput
    _sum?: DvpTradeSumOrderByAggregateInput
  }

  export type DvpTradeScalarWhereWithAggregatesInput = {
    AND?: DvpTradeScalarWhereWithAggregatesInput | DvpTradeScalarWhereWithAggregatesInput[]
    OR?: DvpTradeScalarWhereWithAggregatesInput[]
    NOT?: DvpTradeScalarWhereWithAggregatesInput | DvpTradeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DvpTrade"> | string
    orgId?: StringWithAggregatesFilter<"DvpTrade"> | string
    buyerRef?: StringWithAggregatesFilter<"DvpTrade"> | string
    sellerRef?: StringWithAggregatesFilter<"DvpTrade"> | string
    instrumentId?: StringWithAggregatesFilter<"DvpTrade"> | string
    unitsMinor?: BigIntWithAggregatesFilter<"DvpTrade"> | bigint | number
    priceMinor?: BigIntWithAggregatesFilter<"DvpTrade"> | bigint | number
    currency?: StringWithAggregatesFilter<"DvpTrade"> | string
    status?: EnumDvpStatusWithAggregatesFilter<"DvpTrade"> | $Enums.DvpStatus
    escrowIntentId?: StringNullableWithAggregatesFilter<"DvpTrade"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DvpTrade"> | Date | string
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

  export type InstrumentCreateInput = {
    id: string
    orgId: string
    type: $Enums.InstrumentType
    name: string
    issuerRef: string
    currency: string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: string | null
    createdAt?: Date | string
    holdings?: HoldingCreateNestedManyWithoutInstrumentInput
    cashflows?: CashflowCreateNestedManyWithoutInstrumentInput
    loans?: LoanCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentUncheckedCreateInput = {
    id: string
    orgId: string
    type: $Enums.InstrumentType
    name: string
    issuerRef: string
    currency: string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: string | null
    createdAt?: Date | string
    holdings?: HoldingUncheckedCreateNestedManyWithoutInstrumentInput
    cashflows?: CashflowUncheckedCreateNestedManyWithoutInstrumentInput
    loans?: LoanUncheckedCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumInstrumentTypeFieldUpdateOperationsInput | $Enums.InstrumentType
    name?: StringFieldUpdateOperationsInput | string
    issuerRef?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    holdings?: HoldingUpdateManyWithoutInstrumentNestedInput
    cashflows?: CashflowUpdateManyWithoutInstrumentNestedInput
    loans?: LoanUpdateManyWithoutInstrumentNestedInput
  }

  export type InstrumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumInstrumentTypeFieldUpdateOperationsInput | $Enums.InstrumentType
    name?: StringFieldUpdateOperationsInput | string
    issuerRef?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    holdings?: HoldingUncheckedUpdateManyWithoutInstrumentNestedInput
    cashflows?: CashflowUncheckedUpdateManyWithoutInstrumentNestedInput
    loans?: LoanUncheckedUpdateManyWithoutInstrumentNestedInput
  }

  export type InstrumentCreateManyInput = {
    id: string
    orgId: string
    type: $Enums.InstrumentType
    name: string
    issuerRef: string
    currency: string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: string | null
    createdAt?: Date | string
  }

  export type InstrumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumInstrumentTypeFieldUpdateOperationsInput | $Enums.InstrumentType
    name?: StringFieldUpdateOperationsInput | string
    issuerRef?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstrumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumInstrumentTypeFieldUpdateOperationsInput | $Enums.InstrumentType
    name?: StringFieldUpdateOperationsInput | string
    issuerRef?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingCreateInput = {
    id: string
    orgId: string
    accountRef: string
    unitsMinor: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
    instrument: InstrumentCreateNestedOneWithoutHoldingsInput
  }

  export type HoldingUncheckedCreateInput = {
    id: string
    orgId: string
    accountRef: string
    instrumentId: string
    unitsMinor: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HoldingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    accountRef?: StringFieldUpdateOperationsInput | string
    unitsMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instrument?: InstrumentUpdateOneRequiredWithoutHoldingsNestedInput
  }

  export type HoldingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    accountRef?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    unitsMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingCreateManyInput = {
    id: string
    orgId: string
    accountRef: string
    instrumentId: string
    unitsMinor: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HoldingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    accountRef?: StringFieldUpdateOperationsInput | string
    unitsMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    accountRef?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    unitsMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanCreateInput = {
    id: string
    orgId: string
    borrowerRef: string
    principalMinor: bigint | number
    rateBps: number
    collateralRef?: string | null
    currency: string
    status?: $Enums.LoanStatus
    intentId?: string | null
    createdAt?: Date | string
    instrument?: InstrumentCreateNestedOneWithoutLoansInput
  }

  export type LoanUncheckedCreateInput = {
    id: string
    orgId: string
    instrumentId?: string | null
    borrowerRef: string
    principalMinor: bigint | number
    rateBps: number
    collateralRef?: string | null
    currency: string
    status?: $Enums.LoanStatus
    intentId?: string | null
    createdAt?: Date | string
  }

  export type LoanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    borrowerRef?: StringFieldUpdateOperationsInput | string
    principalMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    rateBps?: IntFieldUpdateOperationsInput | number
    collateralRef?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instrument?: InstrumentUpdateOneWithoutLoansNestedInput
  }

  export type LoanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    instrumentId?: NullableStringFieldUpdateOperationsInput | string | null
    borrowerRef?: StringFieldUpdateOperationsInput | string
    principalMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    rateBps?: IntFieldUpdateOperationsInput | number
    collateralRef?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanCreateManyInput = {
    id: string
    orgId: string
    instrumentId?: string | null
    borrowerRef: string
    principalMinor: bigint | number
    rateBps: number
    collateralRef?: string | null
    currency: string
    status?: $Enums.LoanStatus
    intentId?: string | null
    createdAt?: Date | string
  }

  export type LoanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    borrowerRef?: StringFieldUpdateOperationsInput | string
    principalMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    rateBps?: IntFieldUpdateOperationsInput | number
    collateralRef?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    instrumentId?: NullableStringFieldUpdateOperationsInput | string | null
    borrowerRef?: StringFieldUpdateOperationsInput | string
    principalMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    rateBps?: IntFieldUpdateOperationsInput | number
    collateralRef?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CashflowCreateInput = {
    id: string
    orgId: string
    type: $Enums.CashflowType
    amountMinor: bigint | number
    currency: string
    scheduledAt: Date | string
    executedAt?: Date | string | null
    batchIntentId?: string | null
    instrument: InstrumentCreateNestedOneWithoutCashflowsInput
  }

  export type CashflowUncheckedCreateInput = {
    id: string
    orgId: string
    instrumentId: string
    type: $Enums.CashflowType
    amountMinor: bigint | number
    currency: string
    scheduledAt: Date | string
    executedAt?: Date | string | null
    batchIntentId?: string | null
  }

  export type CashflowUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumCashflowTypeFieldUpdateOperationsInput | $Enums.CashflowType
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    instrument?: InstrumentUpdateOneRequiredWithoutCashflowsNestedInput
  }

  export type CashflowUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    type?: EnumCashflowTypeFieldUpdateOperationsInput | $Enums.CashflowType
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchIntentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CashflowCreateManyInput = {
    id: string
    orgId: string
    instrumentId: string
    type: $Enums.CashflowType
    amountMinor: bigint | number
    currency: string
    scheduledAt: Date | string
    executedAt?: Date | string | null
    batchIntentId?: string | null
  }

  export type CashflowUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumCashflowTypeFieldUpdateOperationsInput | $Enums.CashflowType
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchIntentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CashflowUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    type?: EnumCashflowTypeFieldUpdateOperationsInput | $Enums.CashflowType
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchIntentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DvpTradeCreateInput = {
    id: string
    orgId: string
    buyerRef: string
    sellerRef: string
    instrumentId: string
    unitsMinor: bigint | number
    priceMinor: bigint | number
    currency: string
    status?: $Enums.DvpStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type DvpTradeUncheckedCreateInput = {
    id: string
    orgId: string
    buyerRef: string
    sellerRef: string
    instrumentId: string
    unitsMinor: bigint | number
    priceMinor: bigint | number
    currency: string
    status?: $Enums.DvpStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type DvpTradeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    buyerRef?: StringFieldUpdateOperationsInput | string
    sellerRef?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    unitsMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumDvpStatusFieldUpdateOperationsInput | $Enums.DvpStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DvpTradeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    buyerRef?: StringFieldUpdateOperationsInput | string
    sellerRef?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    unitsMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumDvpStatusFieldUpdateOperationsInput | $Enums.DvpStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DvpTradeCreateManyInput = {
    id: string
    orgId: string
    buyerRef: string
    sellerRef: string
    instrumentId: string
    unitsMinor: bigint | number
    priceMinor: bigint | number
    currency: string
    status?: $Enums.DvpStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type DvpTradeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    buyerRef?: StringFieldUpdateOperationsInput | string
    sellerRef?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    unitsMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumDvpStatusFieldUpdateOperationsInput | $Enums.DvpStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DvpTradeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    buyerRef?: StringFieldUpdateOperationsInput | string
    sellerRef?: StringFieldUpdateOperationsInput | string
    instrumentId?: StringFieldUpdateOperationsInput | string
    unitsMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumDvpStatusFieldUpdateOperationsInput | $Enums.DvpStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type EnumInstrumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InstrumentType | EnumInstrumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InstrumentType[] | ListEnumInstrumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstrumentType[] | ListEnumInstrumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInstrumentTypeFilter<$PrismaModel> | $Enums.InstrumentType
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

  export type HoldingListRelationFilter = {
    every?: HoldingWhereInput
    some?: HoldingWhereInput
    none?: HoldingWhereInput
  }

  export type CashflowListRelationFilter = {
    every?: CashflowWhereInput
    some?: CashflowWhereInput
    none?: CashflowWhereInput
  }

  export type LoanListRelationFilter = {
    every?: LoanWhereInput
    some?: LoanWhereInput
    none?: LoanWhereInput
  }

  export type HoldingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CashflowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LoanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InstrumentCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    issuerRef?: SortOrder
    currency?: SortOrder
    terms?: SortOrder
    tokenId?: SortOrder
    createdAt?: SortOrder
  }

  export type InstrumentMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    issuerRef?: SortOrder
    currency?: SortOrder
    tokenId?: SortOrder
    createdAt?: SortOrder
  }

  export type InstrumentMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    issuerRef?: SortOrder
    currency?: SortOrder
    tokenId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumInstrumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InstrumentType | EnumInstrumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InstrumentType[] | ListEnumInstrumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstrumentType[] | ListEnumInstrumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInstrumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.InstrumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInstrumentTypeFilter<$PrismaModel>
    _max?: NestedEnumInstrumentTypeFilter<$PrismaModel>
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

  export type InstrumentRelationFilter = {
    is?: InstrumentWhereInput
    isNot?: InstrumentWhereInput
  }

  export type HoldingOrgIdAccountRefInstrumentIdCompoundUniqueInput = {
    orgId: string
    accountRef: string
    instrumentId: string
  }

  export type HoldingCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    accountRef?: SortOrder
    instrumentId?: SortOrder
    unitsMinor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HoldingAvgOrderByAggregateInput = {
    unitsMinor?: SortOrder
  }

  export type HoldingMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    accountRef?: SortOrder
    instrumentId?: SortOrder
    unitsMinor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HoldingMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    accountRef?: SortOrder
    instrumentId?: SortOrder
    unitsMinor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HoldingSumOrderByAggregateInput = {
    unitsMinor?: SortOrder
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

  export type EnumLoanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusFilter<$PrismaModel> | $Enums.LoanStatus
  }

  export type InstrumentNullableRelationFilter = {
    is?: InstrumentWhereInput | null
    isNot?: InstrumentWhereInput | null
  }

  export type LoanCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    instrumentId?: SortOrder
    borrowerRef?: SortOrder
    principalMinor?: SortOrder
    rateBps?: SortOrder
    collateralRef?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    intentId?: SortOrder
    createdAt?: SortOrder
  }

  export type LoanAvgOrderByAggregateInput = {
    principalMinor?: SortOrder
    rateBps?: SortOrder
  }

  export type LoanMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    instrumentId?: SortOrder
    borrowerRef?: SortOrder
    principalMinor?: SortOrder
    rateBps?: SortOrder
    collateralRef?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    intentId?: SortOrder
    createdAt?: SortOrder
  }

  export type LoanMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    instrumentId?: SortOrder
    borrowerRef?: SortOrder
    principalMinor?: SortOrder
    rateBps?: SortOrder
    collateralRef?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    intentId?: SortOrder
    createdAt?: SortOrder
  }

  export type LoanSumOrderByAggregateInput = {
    principalMinor?: SortOrder
    rateBps?: SortOrder
  }

  export type EnumLoanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel> | $Enums.LoanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanStatusFilter<$PrismaModel>
    _max?: NestedEnumLoanStatusFilter<$PrismaModel>
  }

  export type EnumCashflowTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CashflowType | EnumCashflowTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CashflowType[] | ListEnumCashflowTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CashflowType[] | ListEnumCashflowTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCashflowTypeFilter<$PrismaModel> | $Enums.CashflowType
  }

  export type CashflowCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    instrumentId?: SortOrder
    type?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    scheduledAt?: SortOrder
    executedAt?: SortOrder
    batchIntentId?: SortOrder
  }

  export type CashflowAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type CashflowMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    instrumentId?: SortOrder
    type?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    scheduledAt?: SortOrder
    executedAt?: SortOrder
    batchIntentId?: SortOrder
  }

  export type CashflowMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    instrumentId?: SortOrder
    type?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    scheduledAt?: SortOrder
    executedAt?: SortOrder
    batchIntentId?: SortOrder
  }

  export type CashflowSumOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type EnumCashflowTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CashflowType | EnumCashflowTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CashflowType[] | ListEnumCashflowTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CashflowType[] | ListEnumCashflowTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCashflowTypeWithAggregatesFilter<$PrismaModel> | $Enums.CashflowType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCashflowTypeFilter<$PrismaModel>
    _max?: NestedEnumCashflowTypeFilter<$PrismaModel>
  }

  export type EnumDvpStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DvpStatus | EnumDvpStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DvpStatus[] | ListEnumDvpStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DvpStatus[] | ListEnumDvpStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDvpStatusFilter<$PrismaModel> | $Enums.DvpStatus
  }

  export type DvpTradeCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    buyerRef?: SortOrder
    sellerRef?: SortOrder
    instrumentId?: SortOrder
    unitsMinor?: SortOrder
    priceMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type DvpTradeAvgOrderByAggregateInput = {
    unitsMinor?: SortOrder
    priceMinor?: SortOrder
  }

  export type DvpTradeMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    buyerRef?: SortOrder
    sellerRef?: SortOrder
    instrumentId?: SortOrder
    unitsMinor?: SortOrder
    priceMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type DvpTradeMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    buyerRef?: SortOrder
    sellerRef?: SortOrder
    instrumentId?: SortOrder
    unitsMinor?: SortOrder
    priceMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type DvpTradeSumOrderByAggregateInput = {
    unitsMinor?: SortOrder
    priceMinor?: SortOrder
  }

  export type EnumDvpStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DvpStatus | EnumDvpStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DvpStatus[] | ListEnumDvpStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DvpStatus[] | ListEnumDvpStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDvpStatusWithAggregatesFilter<$PrismaModel> | $Enums.DvpStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDvpStatusFilter<$PrismaModel>
    _max?: NestedEnumDvpStatusFilter<$PrismaModel>
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

  export type HoldingCreateNestedManyWithoutInstrumentInput = {
    create?: XOR<HoldingCreateWithoutInstrumentInput, HoldingUncheckedCreateWithoutInstrumentInput> | HoldingCreateWithoutInstrumentInput[] | HoldingUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutInstrumentInput | HoldingCreateOrConnectWithoutInstrumentInput[]
    createMany?: HoldingCreateManyInstrumentInputEnvelope
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
  }

  export type CashflowCreateNestedManyWithoutInstrumentInput = {
    create?: XOR<CashflowCreateWithoutInstrumentInput, CashflowUncheckedCreateWithoutInstrumentInput> | CashflowCreateWithoutInstrumentInput[] | CashflowUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: CashflowCreateOrConnectWithoutInstrumentInput | CashflowCreateOrConnectWithoutInstrumentInput[]
    createMany?: CashflowCreateManyInstrumentInputEnvelope
    connect?: CashflowWhereUniqueInput | CashflowWhereUniqueInput[]
  }

  export type LoanCreateNestedManyWithoutInstrumentInput = {
    create?: XOR<LoanCreateWithoutInstrumentInput, LoanUncheckedCreateWithoutInstrumentInput> | LoanCreateWithoutInstrumentInput[] | LoanUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutInstrumentInput | LoanCreateOrConnectWithoutInstrumentInput[]
    createMany?: LoanCreateManyInstrumentInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type HoldingUncheckedCreateNestedManyWithoutInstrumentInput = {
    create?: XOR<HoldingCreateWithoutInstrumentInput, HoldingUncheckedCreateWithoutInstrumentInput> | HoldingCreateWithoutInstrumentInput[] | HoldingUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutInstrumentInput | HoldingCreateOrConnectWithoutInstrumentInput[]
    createMany?: HoldingCreateManyInstrumentInputEnvelope
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
  }

  export type CashflowUncheckedCreateNestedManyWithoutInstrumentInput = {
    create?: XOR<CashflowCreateWithoutInstrumentInput, CashflowUncheckedCreateWithoutInstrumentInput> | CashflowCreateWithoutInstrumentInput[] | CashflowUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: CashflowCreateOrConnectWithoutInstrumentInput | CashflowCreateOrConnectWithoutInstrumentInput[]
    createMany?: CashflowCreateManyInstrumentInputEnvelope
    connect?: CashflowWhereUniqueInput | CashflowWhereUniqueInput[]
  }

  export type LoanUncheckedCreateNestedManyWithoutInstrumentInput = {
    create?: XOR<LoanCreateWithoutInstrumentInput, LoanUncheckedCreateWithoutInstrumentInput> | LoanCreateWithoutInstrumentInput[] | LoanUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutInstrumentInput | LoanCreateOrConnectWithoutInstrumentInput[]
    createMany?: LoanCreateManyInstrumentInputEnvelope
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
  }

  export type EnumInstrumentTypeFieldUpdateOperationsInput = {
    set?: $Enums.InstrumentType
  }

  export type HoldingUpdateManyWithoutInstrumentNestedInput = {
    create?: XOR<HoldingCreateWithoutInstrumentInput, HoldingUncheckedCreateWithoutInstrumentInput> | HoldingCreateWithoutInstrumentInput[] | HoldingUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutInstrumentInput | HoldingCreateOrConnectWithoutInstrumentInput[]
    upsert?: HoldingUpsertWithWhereUniqueWithoutInstrumentInput | HoldingUpsertWithWhereUniqueWithoutInstrumentInput[]
    createMany?: HoldingCreateManyInstrumentInputEnvelope
    set?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    disconnect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    delete?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    update?: HoldingUpdateWithWhereUniqueWithoutInstrumentInput | HoldingUpdateWithWhereUniqueWithoutInstrumentInput[]
    updateMany?: HoldingUpdateManyWithWhereWithoutInstrumentInput | HoldingUpdateManyWithWhereWithoutInstrumentInput[]
    deleteMany?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
  }

  export type CashflowUpdateManyWithoutInstrumentNestedInput = {
    create?: XOR<CashflowCreateWithoutInstrumentInput, CashflowUncheckedCreateWithoutInstrumentInput> | CashflowCreateWithoutInstrumentInput[] | CashflowUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: CashflowCreateOrConnectWithoutInstrumentInput | CashflowCreateOrConnectWithoutInstrumentInput[]
    upsert?: CashflowUpsertWithWhereUniqueWithoutInstrumentInput | CashflowUpsertWithWhereUniqueWithoutInstrumentInput[]
    createMany?: CashflowCreateManyInstrumentInputEnvelope
    set?: CashflowWhereUniqueInput | CashflowWhereUniqueInput[]
    disconnect?: CashflowWhereUniqueInput | CashflowWhereUniqueInput[]
    delete?: CashflowWhereUniqueInput | CashflowWhereUniqueInput[]
    connect?: CashflowWhereUniqueInput | CashflowWhereUniqueInput[]
    update?: CashflowUpdateWithWhereUniqueWithoutInstrumentInput | CashflowUpdateWithWhereUniqueWithoutInstrumentInput[]
    updateMany?: CashflowUpdateManyWithWhereWithoutInstrumentInput | CashflowUpdateManyWithWhereWithoutInstrumentInput[]
    deleteMany?: CashflowScalarWhereInput | CashflowScalarWhereInput[]
  }

  export type LoanUpdateManyWithoutInstrumentNestedInput = {
    create?: XOR<LoanCreateWithoutInstrumentInput, LoanUncheckedCreateWithoutInstrumentInput> | LoanCreateWithoutInstrumentInput[] | LoanUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutInstrumentInput | LoanCreateOrConnectWithoutInstrumentInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutInstrumentInput | LoanUpsertWithWhereUniqueWithoutInstrumentInput[]
    createMany?: LoanCreateManyInstrumentInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutInstrumentInput | LoanUpdateWithWhereUniqueWithoutInstrumentInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutInstrumentInput | LoanUpdateManyWithWhereWithoutInstrumentInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type HoldingUncheckedUpdateManyWithoutInstrumentNestedInput = {
    create?: XOR<HoldingCreateWithoutInstrumentInput, HoldingUncheckedCreateWithoutInstrumentInput> | HoldingCreateWithoutInstrumentInput[] | HoldingUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutInstrumentInput | HoldingCreateOrConnectWithoutInstrumentInput[]
    upsert?: HoldingUpsertWithWhereUniqueWithoutInstrumentInput | HoldingUpsertWithWhereUniqueWithoutInstrumentInput[]
    createMany?: HoldingCreateManyInstrumentInputEnvelope
    set?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    disconnect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    delete?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    update?: HoldingUpdateWithWhereUniqueWithoutInstrumentInput | HoldingUpdateWithWhereUniqueWithoutInstrumentInput[]
    updateMany?: HoldingUpdateManyWithWhereWithoutInstrumentInput | HoldingUpdateManyWithWhereWithoutInstrumentInput[]
    deleteMany?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
  }

  export type CashflowUncheckedUpdateManyWithoutInstrumentNestedInput = {
    create?: XOR<CashflowCreateWithoutInstrumentInput, CashflowUncheckedCreateWithoutInstrumentInput> | CashflowCreateWithoutInstrumentInput[] | CashflowUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: CashflowCreateOrConnectWithoutInstrumentInput | CashflowCreateOrConnectWithoutInstrumentInput[]
    upsert?: CashflowUpsertWithWhereUniqueWithoutInstrumentInput | CashflowUpsertWithWhereUniqueWithoutInstrumentInput[]
    createMany?: CashflowCreateManyInstrumentInputEnvelope
    set?: CashflowWhereUniqueInput | CashflowWhereUniqueInput[]
    disconnect?: CashflowWhereUniqueInput | CashflowWhereUniqueInput[]
    delete?: CashflowWhereUniqueInput | CashflowWhereUniqueInput[]
    connect?: CashflowWhereUniqueInput | CashflowWhereUniqueInput[]
    update?: CashflowUpdateWithWhereUniqueWithoutInstrumentInput | CashflowUpdateWithWhereUniqueWithoutInstrumentInput[]
    updateMany?: CashflowUpdateManyWithWhereWithoutInstrumentInput | CashflowUpdateManyWithWhereWithoutInstrumentInput[]
    deleteMany?: CashflowScalarWhereInput | CashflowScalarWhereInput[]
  }

  export type LoanUncheckedUpdateManyWithoutInstrumentNestedInput = {
    create?: XOR<LoanCreateWithoutInstrumentInput, LoanUncheckedCreateWithoutInstrumentInput> | LoanCreateWithoutInstrumentInput[] | LoanUncheckedCreateWithoutInstrumentInput[]
    connectOrCreate?: LoanCreateOrConnectWithoutInstrumentInput | LoanCreateOrConnectWithoutInstrumentInput[]
    upsert?: LoanUpsertWithWhereUniqueWithoutInstrumentInput | LoanUpsertWithWhereUniqueWithoutInstrumentInput[]
    createMany?: LoanCreateManyInstrumentInputEnvelope
    set?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    disconnect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    delete?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    connect?: LoanWhereUniqueInput | LoanWhereUniqueInput[]
    update?: LoanUpdateWithWhereUniqueWithoutInstrumentInput | LoanUpdateWithWhereUniqueWithoutInstrumentInput[]
    updateMany?: LoanUpdateManyWithWhereWithoutInstrumentInput | LoanUpdateManyWithWhereWithoutInstrumentInput[]
    deleteMany?: LoanScalarWhereInput | LoanScalarWhereInput[]
  }

  export type InstrumentCreateNestedOneWithoutHoldingsInput = {
    create?: XOR<InstrumentCreateWithoutHoldingsInput, InstrumentUncheckedCreateWithoutHoldingsInput>
    connectOrCreate?: InstrumentCreateOrConnectWithoutHoldingsInput
    connect?: InstrumentWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type InstrumentUpdateOneRequiredWithoutHoldingsNestedInput = {
    create?: XOR<InstrumentCreateWithoutHoldingsInput, InstrumentUncheckedCreateWithoutHoldingsInput>
    connectOrCreate?: InstrumentCreateOrConnectWithoutHoldingsInput
    upsert?: InstrumentUpsertWithoutHoldingsInput
    connect?: InstrumentWhereUniqueInput
    update?: XOR<XOR<InstrumentUpdateToOneWithWhereWithoutHoldingsInput, InstrumentUpdateWithoutHoldingsInput>, InstrumentUncheckedUpdateWithoutHoldingsInput>
  }

  export type InstrumentCreateNestedOneWithoutLoansInput = {
    create?: XOR<InstrumentCreateWithoutLoansInput, InstrumentUncheckedCreateWithoutLoansInput>
    connectOrCreate?: InstrumentCreateOrConnectWithoutLoansInput
    connect?: InstrumentWhereUniqueInput
  }

  export type EnumLoanStatusFieldUpdateOperationsInput = {
    set?: $Enums.LoanStatus
  }

  export type InstrumentUpdateOneWithoutLoansNestedInput = {
    create?: XOR<InstrumentCreateWithoutLoansInput, InstrumentUncheckedCreateWithoutLoansInput>
    connectOrCreate?: InstrumentCreateOrConnectWithoutLoansInput
    upsert?: InstrumentUpsertWithoutLoansInput
    disconnect?: InstrumentWhereInput | boolean
    delete?: InstrumentWhereInput | boolean
    connect?: InstrumentWhereUniqueInput
    update?: XOR<XOR<InstrumentUpdateToOneWithWhereWithoutLoansInput, InstrumentUpdateWithoutLoansInput>, InstrumentUncheckedUpdateWithoutLoansInput>
  }

  export type InstrumentCreateNestedOneWithoutCashflowsInput = {
    create?: XOR<InstrumentCreateWithoutCashflowsInput, InstrumentUncheckedCreateWithoutCashflowsInput>
    connectOrCreate?: InstrumentCreateOrConnectWithoutCashflowsInput
    connect?: InstrumentWhereUniqueInput
  }

  export type EnumCashflowTypeFieldUpdateOperationsInput = {
    set?: $Enums.CashflowType
  }

  export type InstrumentUpdateOneRequiredWithoutCashflowsNestedInput = {
    create?: XOR<InstrumentCreateWithoutCashflowsInput, InstrumentUncheckedCreateWithoutCashflowsInput>
    connectOrCreate?: InstrumentCreateOrConnectWithoutCashflowsInput
    upsert?: InstrumentUpsertWithoutCashflowsInput
    connect?: InstrumentWhereUniqueInput
    update?: XOR<XOR<InstrumentUpdateToOneWithWhereWithoutCashflowsInput, InstrumentUpdateWithoutCashflowsInput>, InstrumentUncheckedUpdateWithoutCashflowsInput>
  }

  export type EnumDvpStatusFieldUpdateOperationsInput = {
    set?: $Enums.DvpStatus
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

  export type NestedEnumInstrumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InstrumentType | EnumInstrumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InstrumentType[] | ListEnumInstrumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstrumentType[] | ListEnumInstrumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInstrumentTypeFilter<$PrismaModel> | $Enums.InstrumentType
  }

  export type NestedEnumInstrumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InstrumentType | EnumInstrumentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InstrumentType[] | ListEnumInstrumentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstrumentType[] | ListEnumInstrumentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInstrumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.InstrumentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInstrumentTypeFilter<$PrismaModel>
    _max?: NestedEnumInstrumentTypeFilter<$PrismaModel>
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

  export type NestedEnumLoanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusFilter<$PrismaModel> | $Enums.LoanStatus
  }

  export type NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel> | $Enums.LoanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanStatusFilter<$PrismaModel>
    _max?: NestedEnumLoanStatusFilter<$PrismaModel>
  }

  export type NestedEnumCashflowTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CashflowType | EnumCashflowTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CashflowType[] | ListEnumCashflowTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CashflowType[] | ListEnumCashflowTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCashflowTypeFilter<$PrismaModel> | $Enums.CashflowType
  }

  export type NestedEnumCashflowTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CashflowType | EnumCashflowTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CashflowType[] | ListEnumCashflowTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CashflowType[] | ListEnumCashflowTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCashflowTypeWithAggregatesFilter<$PrismaModel> | $Enums.CashflowType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCashflowTypeFilter<$PrismaModel>
    _max?: NestedEnumCashflowTypeFilter<$PrismaModel>
  }

  export type NestedEnumDvpStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DvpStatus | EnumDvpStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DvpStatus[] | ListEnumDvpStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DvpStatus[] | ListEnumDvpStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDvpStatusFilter<$PrismaModel> | $Enums.DvpStatus
  }

  export type NestedEnumDvpStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DvpStatus | EnumDvpStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DvpStatus[] | ListEnumDvpStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DvpStatus[] | ListEnumDvpStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDvpStatusWithAggregatesFilter<$PrismaModel> | $Enums.DvpStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDvpStatusFilter<$PrismaModel>
    _max?: NestedEnumDvpStatusFilter<$PrismaModel>
  }

  export type HoldingCreateWithoutInstrumentInput = {
    id: string
    orgId: string
    accountRef: string
    unitsMinor: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HoldingUncheckedCreateWithoutInstrumentInput = {
    id: string
    orgId: string
    accountRef: string
    unitsMinor: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HoldingCreateOrConnectWithoutInstrumentInput = {
    where: HoldingWhereUniqueInput
    create: XOR<HoldingCreateWithoutInstrumentInput, HoldingUncheckedCreateWithoutInstrumentInput>
  }

  export type HoldingCreateManyInstrumentInputEnvelope = {
    data: HoldingCreateManyInstrumentInput | HoldingCreateManyInstrumentInput[]
    skipDuplicates?: boolean
  }

  export type CashflowCreateWithoutInstrumentInput = {
    id: string
    orgId: string
    type: $Enums.CashflowType
    amountMinor: bigint | number
    currency: string
    scheduledAt: Date | string
    executedAt?: Date | string | null
    batchIntentId?: string | null
  }

  export type CashflowUncheckedCreateWithoutInstrumentInput = {
    id: string
    orgId: string
    type: $Enums.CashflowType
    amountMinor: bigint | number
    currency: string
    scheduledAt: Date | string
    executedAt?: Date | string | null
    batchIntentId?: string | null
  }

  export type CashflowCreateOrConnectWithoutInstrumentInput = {
    where: CashflowWhereUniqueInput
    create: XOR<CashflowCreateWithoutInstrumentInput, CashflowUncheckedCreateWithoutInstrumentInput>
  }

  export type CashflowCreateManyInstrumentInputEnvelope = {
    data: CashflowCreateManyInstrumentInput | CashflowCreateManyInstrumentInput[]
    skipDuplicates?: boolean
  }

  export type LoanCreateWithoutInstrumentInput = {
    id: string
    orgId: string
    borrowerRef: string
    principalMinor: bigint | number
    rateBps: number
    collateralRef?: string | null
    currency: string
    status?: $Enums.LoanStatus
    intentId?: string | null
    createdAt?: Date | string
  }

  export type LoanUncheckedCreateWithoutInstrumentInput = {
    id: string
    orgId: string
    borrowerRef: string
    principalMinor: bigint | number
    rateBps: number
    collateralRef?: string | null
    currency: string
    status?: $Enums.LoanStatus
    intentId?: string | null
    createdAt?: Date | string
  }

  export type LoanCreateOrConnectWithoutInstrumentInput = {
    where: LoanWhereUniqueInput
    create: XOR<LoanCreateWithoutInstrumentInput, LoanUncheckedCreateWithoutInstrumentInput>
  }

  export type LoanCreateManyInstrumentInputEnvelope = {
    data: LoanCreateManyInstrumentInput | LoanCreateManyInstrumentInput[]
    skipDuplicates?: boolean
  }

  export type HoldingUpsertWithWhereUniqueWithoutInstrumentInput = {
    where: HoldingWhereUniqueInput
    update: XOR<HoldingUpdateWithoutInstrumentInput, HoldingUncheckedUpdateWithoutInstrumentInput>
    create: XOR<HoldingCreateWithoutInstrumentInput, HoldingUncheckedCreateWithoutInstrumentInput>
  }

  export type HoldingUpdateWithWhereUniqueWithoutInstrumentInput = {
    where: HoldingWhereUniqueInput
    data: XOR<HoldingUpdateWithoutInstrumentInput, HoldingUncheckedUpdateWithoutInstrumentInput>
  }

  export type HoldingUpdateManyWithWhereWithoutInstrumentInput = {
    where: HoldingScalarWhereInput
    data: XOR<HoldingUpdateManyMutationInput, HoldingUncheckedUpdateManyWithoutInstrumentInput>
  }

  export type HoldingScalarWhereInput = {
    AND?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
    OR?: HoldingScalarWhereInput[]
    NOT?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
    id?: StringFilter<"Holding"> | string
    orgId?: StringFilter<"Holding"> | string
    accountRef?: StringFilter<"Holding"> | string
    instrumentId?: StringFilter<"Holding"> | string
    unitsMinor?: BigIntFilter<"Holding"> | bigint | number
    createdAt?: DateTimeFilter<"Holding"> | Date | string
    updatedAt?: DateTimeFilter<"Holding"> | Date | string
  }

  export type CashflowUpsertWithWhereUniqueWithoutInstrumentInput = {
    where: CashflowWhereUniqueInput
    update: XOR<CashflowUpdateWithoutInstrumentInput, CashflowUncheckedUpdateWithoutInstrumentInput>
    create: XOR<CashflowCreateWithoutInstrumentInput, CashflowUncheckedCreateWithoutInstrumentInput>
  }

  export type CashflowUpdateWithWhereUniqueWithoutInstrumentInput = {
    where: CashflowWhereUniqueInput
    data: XOR<CashflowUpdateWithoutInstrumentInput, CashflowUncheckedUpdateWithoutInstrumentInput>
  }

  export type CashflowUpdateManyWithWhereWithoutInstrumentInput = {
    where: CashflowScalarWhereInput
    data: XOR<CashflowUpdateManyMutationInput, CashflowUncheckedUpdateManyWithoutInstrumentInput>
  }

  export type CashflowScalarWhereInput = {
    AND?: CashflowScalarWhereInput | CashflowScalarWhereInput[]
    OR?: CashflowScalarWhereInput[]
    NOT?: CashflowScalarWhereInput | CashflowScalarWhereInput[]
    id?: StringFilter<"Cashflow"> | string
    orgId?: StringFilter<"Cashflow"> | string
    instrumentId?: StringFilter<"Cashflow"> | string
    type?: EnumCashflowTypeFilter<"Cashflow"> | $Enums.CashflowType
    amountMinor?: BigIntFilter<"Cashflow"> | bigint | number
    currency?: StringFilter<"Cashflow"> | string
    scheduledAt?: DateTimeFilter<"Cashflow"> | Date | string
    executedAt?: DateTimeNullableFilter<"Cashflow"> | Date | string | null
    batchIntentId?: StringNullableFilter<"Cashflow"> | string | null
  }

  export type LoanUpsertWithWhereUniqueWithoutInstrumentInput = {
    where: LoanWhereUniqueInput
    update: XOR<LoanUpdateWithoutInstrumentInput, LoanUncheckedUpdateWithoutInstrumentInput>
    create: XOR<LoanCreateWithoutInstrumentInput, LoanUncheckedCreateWithoutInstrumentInput>
  }

  export type LoanUpdateWithWhereUniqueWithoutInstrumentInput = {
    where: LoanWhereUniqueInput
    data: XOR<LoanUpdateWithoutInstrumentInput, LoanUncheckedUpdateWithoutInstrumentInput>
  }

  export type LoanUpdateManyWithWhereWithoutInstrumentInput = {
    where: LoanScalarWhereInput
    data: XOR<LoanUpdateManyMutationInput, LoanUncheckedUpdateManyWithoutInstrumentInput>
  }

  export type LoanScalarWhereInput = {
    AND?: LoanScalarWhereInput | LoanScalarWhereInput[]
    OR?: LoanScalarWhereInput[]
    NOT?: LoanScalarWhereInput | LoanScalarWhereInput[]
    id?: StringFilter<"Loan"> | string
    orgId?: StringFilter<"Loan"> | string
    instrumentId?: StringNullableFilter<"Loan"> | string | null
    borrowerRef?: StringFilter<"Loan"> | string
    principalMinor?: BigIntFilter<"Loan"> | bigint | number
    rateBps?: IntFilter<"Loan"> | number
    collateralRef?: StringNullableFilter<"Loan"> | string | null
    currency?: StringFilter<"Loan"> | string
    status?: EnumLoanStatusFilter<"Loan"> | $Enums.LoanStatus
    intentId?: StringNullableFilter<"Loan"> | string | null
    createdAt?: DateTimeFilter<"Loan"> | Date | string
  }

  export type InstrumentCreateWithoutHoldingsInput = {
    id: string
    orgId: string
    type: $Enums.InstrumentType
    name: string
    issuerRef: string
    currency: string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: string | null
    createdAt?: Date | string
    cashflows?: CashflowCreateNestedManyWithoutInstrumentInput
    loans?: LoanCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentUncheckedCreateWithoutHoldingsInput = {
    id: string
    orgId: string
    type: $Enums.InstrumentType
    name: string
    issuerRef: string
    currency: string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: string | null
    createdAt?: Date | string
    cashflows?: CashflowUncheckedCreateNestedManyWithoutInstrumentInput
    loans?: LoanUncheckedCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentCreateOrConnectWithoutHoldingsInput = {
    where: InstrumentWhereUniqueInput
    create: XOR<InstrumentCreateWithoutHoldingsInput, InstrumentUncheckedCreateWithoutHoldingsInput>
  }

  export type InstrumentUpsertWithoutHoldingsInput = {
    update: XOR<InstrumentUpdateWithoutHoldingsInput, InstrumentUncheckedUpdateWithoutHoldingsInput>
    create: XOR<InstrumentCreateWithoutHoldingsInput, InstrumentUncheckedCreateWithoutHoldingsInput>
    where?: InstrumentWhereInput
  }

  export type InstrumentUpdateToOneWithWhereWithoutHoldingsInput = {
    where?: InstrumentWhereInput
    data: XOR<InstrumentUpdateWithoutHoldingsInput, InstrumentUncheckedUpdateWithoutHoldingsInput>
  }

  export type InstrumentUpdateWithoutHoldingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumInstrumentTypeFieldUpdateOperationsInput | $Enums.InstrumentType
    name?: StringFieldUpdateOperationsInput | string
    issuerRef?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cashflows?: CashflowUpdateManyWithoutInstrumentNestedInput
    loans?: LoanUpdateManyWithoutInstrumentNestedInput
  }

  export type InstrumentUncheckedUpdateWithoutHoldingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumInstrumentTypeFieldUpdateOperationsInput | $Enums.InstrumentType
    name?: StringFieldUpdateOperationsInput | string
    issuerRef?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cashflows?: CashflowUncheckedUpdateManyWithoutInstrumentNestedInput
    loans?: LoanUncheckedUpdateManyWithoutInstrumentNestedInput
  }

  export type InstrumentCreateWithoutLoansInput = {
    id: string
    orgId: string
    type: $Enums.InstrumentType
    name: string
    issuerRef: string
    currency: string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: string | null
    createdAt?: Date | string
    holdings?: HoldingCreateNestedManyWithoutInstrumentInput
    cashflows?: CashflowCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentUncheckedCreateWithoutLoansInput = {
    id: string
    orgId: string
    type: $Enums.InstrumentType
    name: string
    issuerRef: string
    currency: string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: string | null
    createdAt?: Date | string
    holdings?: HoldingUncheckedCreateNestedManyWithoutInstrumentInput
    cashflows?: CashflowUncheckedCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentCreateOrConnectWithoutLoansInput = {
    where: InstrumentWhereUniqueInput
    create: XOR<InstrumentCreateWithoutLoansInput, InstrumentUncheckedCreateWithoutLoansInput>
  }

  export type InstrumentUpsertWithoutLoansInput = {
    update: XOR<InstrumentUpdateWithoutLoansInput, InstrumentUncheckedUpdateWithoutLoansInput>
    create: XOR<InstrumentCreateWithoutLoansInput, InstrumentUncheckedCreateWithoutLoansInput>
    where?: InstrumentWhereInput
  }

  export type InstrumentUpdateToOneWithWhereWithoutLoansInput = {
    where?: InstrumentWhereInput
    data: XOR<InstrumentUpdateWithoutLoansInput, InstrumentUncheckedUpdateWithoutLoansInput>
  }

  export type InstrumentUpdateWithoutLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumInstrumentTypeFieldUpdateOperationsInput | $Enums.InstrumentType
    name?: StringFieldUpdateOperationsInput | string
    issuerRef?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    holdings?: HoldingUpdateManyWithoutInstrumentNestedInput
    cashflows?: CashflowUpdateManyWithoutInstrumentNestedInput
  }

  export type InstrumentUncheckedUpdateWithoutLoansInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumInstrumentTypeFieldUpdateOperationsInput | $Enums.InstrumentType
    name?: StringFieldUpdateOperationsInput | string
    issuerRef?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    holdings?: HoldingUncheckedUpdateManyWithoutInstrumentNestedInput
    cashflows?: CashflowUncheckedUpdateManyWithoutInstrumentNestedInput
  }

  export type InstrumentCreateWithoutCashflowsInput = {
    id: string
    orgId: string
    type: $Enums.InstrumentType
    name: string
    issuerRef: string
    currency: string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: string | null
    createdAt?: Date | string
    holdings?: HoldingCreateNestedManyWithoutInstrumentInput
    loans?: LoanCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentUncheckedCreateWithoutCashflowsInput = {
    id: string
    orgId: string
    type: $Enums.InstrumentType
    name: string
    issuerRef: string
    currency: string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: string | null
    createdAt?: Date | string
    holdings?: HoldingUncheckedCreateNestedManyWithoutInstrumentInput
    loans?: LoanUncheckedCreateNestedManyWithoutInstrumentInput
  }

  export type InstrumentCreateOrConnectWithoutCashflowsInput = {
    where: InstrumentWhereUniqueInput
    create: XOR<InstrumentCreateWithoutCashflowsInput, InstrumentUncheckedCreateWithoutCashflowsInput>
  }

  export type InstrumentUpsertWithoutCashflowsInput = {
    update: XOR<InstrumentUpdateWithoutCashflowsInput, InstrumentUncheckedUpdateWithoutCashflowsInput>
    create: XOR<InstrumentCreateWithoutCashflowsInput, InstrumentUncheckedCreateWithoutCashflowsInput>
    where?: InstrumentWhereInput
  }

  export type InstrumentUpdateToOneWithWhereWithoutCashflowsInput = {
    where?: InstrumentWhereInput
    data: XOR<InstrumentUpdateWithoutCashflowsInput, InstrumentUncheckedUpdateWithoutCashflowsInput>
  }

  export type InstrumentUpdateWithoutCashflowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumInstrumentTypeFieldUpdateOperationsInput | $Enums.InstrumentType
    name?: StringFieldUpdateOperationsInput | string
    issuerRef?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    holdings?: HoldingUpdateManyWithoutInstrumentNestedInput
    loans?: LoanUpdateManyWithoutInstrumentNestedInput
  }

  export type InstrumentUncheckedUpdateWithoutCashflowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumInstrumentTypeFieldUpdateOperationsInput | $Enums.InstrumentType
    name?: StringFieldUpdateOperationsInput | string
    issuerRef?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    terms?: NullableJsonNullValueInput | InputJsonValue
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    holdings?: HoldingUncheckedUpdateManyWithoutInstrumentNestedInput
    loans?: LoanUncheckedUpdateManyWithoutInstrumentNestedInput
  }

  export type HoldingCreateManyInstrumentInput = {
    id: string
    orgId: string
    accountRef: string
    unitsMinor: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CashflowCreateManyInstrumentInput = {
    id: string
    orgId: string
    type: $Enums.CashflowType
    amountMinor: bigint | number
    currency: string
    scheduledAt: Date | string
    executedAt?: Date | string | null
    batchIntentId?: string | null
  }

  export type LoanCreateManyInstrumentInput = {
    id: string
    orgId: string
    borrowerRef: string
    principalMinor: bigint | number
    rateBps: number
    collateralRef?: string | null
    currency: string
    status?: $Enums.LoanStatus
    intentId?: string | null
    createdAt?: Date | string
  }

  export type HoldingUpdateWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    accountRef?: StringFieldUpdateOperationsInput | string
    unitsMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingUncheckedUpdateWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    accountRef?: StringFieldUpdateOperationsInput | string
    unitsMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingUncheckedUpdateManyWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    accountRef?: StringFieldUpdateOperationsInput | string
    unitsMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CashflowUpdateWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumCashflowTypeFieldUpdateOperationsInput | $Enums.CashflowType
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchIntentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CashflowUncheckedUpdateWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumCashflowTypeFieldUpdateOperationsInput | $Enums.CashflowType
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchIntentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CashflowUncheckedUpdateManyWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumCashflowTypeFieldUpdateOperationsInput | $Enums.CashflowType
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    batchIntentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LoanUpdateWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    borrowerRef?: StringFieldUpdateOperationsInput | string
    principalMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    rateBps?: IntFieldUpdateOperationsInput | number
    collateralRef?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanUncheckedUpdateWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    borrowerRef?: StringFieldUpdateOperationsInput | string
    principalMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    rateBps?: IntFieldUpdateOperationsInput | number
    collateralRef?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LoanUncheckedUpdateManyWithoutInstrumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    borrowerRef?: StringFieldUpdateOperationsInput | string
    principalMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    rateBps?: IntFieldUpdateOperationsInput | number
    collateralRef?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use InstrumentCountOutputTypeDefaultArgs instead
     */
    export type InstrumentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InstrumentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventOutboxDefaultArgs instead
     */
    export type EventOutboxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventOutboxDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InstrumentDefaultArgs instead
     */
    export type InstrumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InstrumentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HoldingDefaultArgs instead
     */
    export type HoldingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HoldingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LoanDefaultArgs instead
     */
    export type LoanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LoanDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CashflowDefaultArgs instead
     */
    export type CashflowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CashflowDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DvpTradeDefaultArgs instead
     */
    export type DvpTradeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DvpTradeDefaultArgs<ExtArgs>

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