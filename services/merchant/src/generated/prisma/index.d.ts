
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
 * Model PaymentLink
 * 
 */
export type PaymentLink = $Result.DefaultSelection<Prisma.$PaymentLinkPayload>
/**
 * Model CheckoutSession
 * 
 */
export type CheckoutSession = $Result.DefaultSelection<Prisma.$CheckoutSessionPayload>
/**
 * Model SettlementReport
 * 
 */
export type SettlementReport = $Result.DefaultSelection<Prisma.$SettlementReportPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PaymentLinkStatus: {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED'
};

export type PaymentLinkStatus = (typeof PaymentLinkStatus)[keyof typeof PaymentLinkStatus]


export const CheckoutSessionStatus: {
  OPEN: 'OPEN',
  AWAITING_PAYMENT: 'AWAITING_PAYMENT',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  EXPIRED: 'EXPIRED'
};

export type CheckoutSessionStatus = (typeof CheckoutSessionStatus)[keyof typeof CheckoutSessionStatus]


export const SettlementReportStatus: {
  PENDING: 'PENDING',
  READY: 'READY',
  FAILED: 'FAILED'
};

export type SettlementReportStatus = (typeof SettlementReportStatus)[keyof typeof SettlementReportStatus]

}

export type PaymentLinkStatus = $Enums.PaymentLinkStatus

export const PaymentLinkStatus: typeof $Enums.PaymentLinkStatus

export type CheckoutSessionStatus = $Enums.CheckoutSessionStatus

export const CheckoutSessionStatus: typeof $Enums.CheckoutSessionStatus

export type SettlementReportStatus = $Enums.SettlementReportStatus

export const SettlementReportStatus: typeof $Enums.SettlementReportStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PaymentLinks
 * const paymentLinks = await prisma.paymentLink.findMany()
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
   * // Fetch zero or more PaymentLinks
   * const paymentLinks = await prisma.paymentLink.findMany()
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
   * `prisma.paymentLink`: Exposes CRUD operations for the **PaymentLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentLinks
    * const paymentLinks = await prisma.paymentLink.findMany()
    * ```
    */
  get paymentLink(): Prisma.PaymentLinkDelegate<ExtArgs>;

  /**
   * `prisma.checkoutSession`: Exposes CRUD operations for the **CheckoutSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CheckoutSessions
    * const checkoutSessions = await prisma.checkoutSession.findMany()
    * ```
    */
  get checkoutSession(): Prisma.CheckoutSessionDelegate<ExtArgs>;

  /**
   * `prisma.settlementReport`: Exposes CRUD operations for the **SettlementReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SettlementReports
    * const settlementReports = await prisma.settlementReport.findMany()
    * ```
    */
  get settlementReport(): Prisma.SettlementReportDelegate<ExtArgs>;
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
    PaymentLink: 'PaymentLink',
    CheckoutSession: 'CheckoutSession',
    SettlementReport: 'SettlementReport'
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
      modelProps: "paymentLink" | "checkoutSession" | "settlementReport"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      PaymentLink: {
        payload: Prisma.$PaymentLinkPayload<ExtArgs>
        fields: Prisma.PaymentLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>
          }
          findFirst: {
            args: Prisma.PaymentLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>
          }
          findMany: {
            args: Prisma.PaymentLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>[]
          }
          create: {
            args: Prisma.PaymentLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>
          }
          createMany: {
            args: Prisma.PaymentLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>[]
          }
          delete: {
            args: Prisma.PaymentLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>
          }
          update: {
            args: Prisma.PaymentLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>
          }
          deleteMany: {
            args: Prisma.PaymentLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentLinkPayload>
          }
          aggregate: {
            args: Prisma.PaymentLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentLink>
          }
          groupBy: {
            args: Prisma.PaymentLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentLinkCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentLinkCountAggregateOutputType> | number
          }
        }
      }
      CheckoutSession: {
        payload: Prisma.$CheckoutSessionPayload<ExtArgs>
        fields: Prisma.CheckoutSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CheckoutSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CheckoutSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload>
          }
          findFirst: {
            args: Prisma.CheckoutSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CheckoutSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload>
          }
          findMany: {
            args: Prisma.CheckoutSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload>[]
          }
          create: {
            args: Prisma.CheckoutSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload>
          }
          createMany: {
            args: Prisma.CheckoutSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CheckoutSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload>[]
          }
          delete: {
            args: Prisma.CheckoutSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload>
          }
          update: {
            args: Prisma.CheckoutSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload>
          }
          deleteMany: {
            args: Prisma.CheckoutSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CheckoutSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CheckoutSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CheckoutSessionPayload>
          }
          aggregate: {
            args: Prisma.CheckoutSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCheckoutSession>
          }
          groupBy: {
            args: Prisma.CheckoutSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CheckoutSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CheckoutSessionCountArgs<ExtArgs>
            result: $Utils.Optional<CheckoutSessionCountAggregateOutputType> | number
          }
        }
      }
      SettlementReport: {
        payload: Prisma.$SettlementReportPayload<ExtArgs>
        fields: Prisma.SettlementReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettlementReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettlementReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementReportPayload>
          }
          findFirst: {
            args: Prisma.SettlementReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettlementReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementReportPayload>
          }
          findMany: {
            args: Prisma.SettlementReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementReportPayload>[]
          }
          create: {
            args: Prisma.SettlementReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementReportPayload>
          }
          createMany: {
            args: Prisma.SettlementReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettlementReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementReportPayload>[]
          }
          delete: {
            args: Prisma.SettlementReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementReportPayload>
          }
          update: {
            args: Prisma.SettlementReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementReportPayload>
          }
          deleteMany: {
            args: Prisma.SettlementReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettlementReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SettlementReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettlementReportPayload>
          }
          aggregate: {
            args: Prisma.SettlementReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSettlementReport>
          }
          groupBy: {
            args: Prisma.SettlementReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettlementReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettlementReportCountArgs<ExtArgs>
            result: $Utils.Optional<SettlementReportCountAggregateOutputType> | number
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
   * Count Type PaymentLinkCountOutputType
   */

  export type PaymentLinkCountOutputType = {
    checkoutSessions: number
  }

  export type PaymentLinkCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    checkoutSessions?: boolean | PaymentLinkCountOutputTypeCountCheckoutSessionsArgs
  }

  // Custom InputTypes
  /**
   * PaymentLinkCountOutputType without action
   */
  export type PaymentLinkCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLinkCountOutputType
     */
    select?: PaymentLinkCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PaymentLinkCountOutputType without action
   */
  export type PaymentLinkCountOutputTypeCountCheckoutSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CheckoutSessionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model PaymentLink
   */

  export type AggregatePaymentLink = {
    _count: PaymentLinkCountAggregateOutputType | null
    _avg: PaymentLinkAvgAggregateOutputType | null
    _sum: PaymentLinkSumAggregateOutputType | null
    _min: PaymentLinkMinAggregateOutputType | null
    _max: PaymentLinkMaxAggregateOutputType | null
  }

  export type PaymentLinkAvgAggregateOutputType = {
    amountMinor: number | null
  }

  export type PaymentLinkSumAggregateOutputType = {
    amountMinor: bigint | null
  }

  export type PaymentLinkMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    slug: string | null
    title: string | null
    description: string | null
    amountMinor: bigint | null
    currency: string | null
    country: string | null
    actorId: string | null
    destinationAccountRef: string | null
    status: $Enums.PaymentLinkStatus | null
    successRedirectUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentLinkMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    slug: string | null
    title: string | null
    description: string | null
    amountMinor: bigint | null
    currency: string | null
    country: string | null
    actorId: string | null
    destinationAccountRef: string | null
    status: $Enums.PaymentLinkStatus | null
    successRedirectUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentLinkCountAggregateOutputType = {
    id: number
    orgId: number
    slug: number
    title: number
    description: number
    amountMinor: number
    currency: number
    country: number
    actorId: number
    destinationAccountRef: number
    status: number
    successRedirectUrl: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentLinkAvgAggregateInputType = {
    amountMinor?: true
  }

  export type PaymentLinkSumAggregateInputType = {
    amountMinor?: true
  }

  export type PaymentLinkMinAggregateInputType = {
    id?: true
    orgId?: true
    slug?: true
    title?: true
    description?: true
    amountMinor?: true
    currency?: true
    country?: true
    actorId?: true
    destinationAccountRef?: true
    status?: true
    successRedirectUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentLinkMaxAggregateInputType = {
    id?: true
    orgId?: true
    slug?: true
    title?: true
    description?: true
    amountMinor?: true
    currency?: true
    country?: true
    actorId?: true
    destinationAccountRef?: true
    status?: true
    successRedirectUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentLinkCountAggregateInputType = {
    id?: true
    orgId?: true
    slug?: true
    title?: true
    description?: true
    amountMinor?: true
    currency?: true
    country?: true
    actorId?: true
    destinationAccountRef?: true
    status?: true
    successRedirectUrl?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentLink to aggregate.
     */
    where?: PaymentLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentLinks to fetch.
     */
    orderBy?: PaymentLinkOrderByWithRelationInput | PaymentLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentLinks
    **/
    _count?: true | PaymentLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentLinkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentLinkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentLinkMaxAggregateInputType
  }

  export type GetPaymentLinkAggregateType<T extends PaymentLinkAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentLink[P]>
      : GetScalarType<T[P], AggregatePaymentLink[P]>
  }




  export type PaymentLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentLinkWhereInput
    orderBy?: PaymentLinkOrderByWithAggregationInput | PaymentLinkOrderByWithAggregationInput[]
    by: PaymentLinkScalarFieldEnum[] | PaymentLinkScalarFieldEnum
    having?: PaymentLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentLinkCountAggregateInputType | true
    _avg?: PaymentLinkAvgAggregateInputType
    _sum?: PaymentLinkSumAggregateInputType
    _min?: PaymentLinkMinAggregateInputType
    _max?: PaymentLinkMaxAggregateInputType
  }

  export type PaymentLinkGroupByOutputType = {
    id: string
    orgId: string
    slug: string
    title: string
    description: string | null
    amountMinor: bigint
    currency: string
    country: string
    actorId: string
    destinationAccountRef: string
    status: $Enums.PaymentLinkStatus
    successRedirectUrl: string | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentLinkCountAggregateOutputType | null
    _avg: PaymentLinkAvgAggregateOutputType | null
    _sum: PaymentLinkSumAggregateOutputType | null
    _min: PaymentLinkMinAggregateOutputType | null
    _max: PaymentLinkMaxAggregateOutputType | null
  }

  type GetPaymentLinkGroupByPayload<T extends PaymentLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentLinkGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentLinkGroupByOutputType[P]>
        }
      >
    >


  export type PaymentLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    amountMinor?: boolean
    currency?: boolean
    country?: boolean
    actorId?: boolean
    destinationAccountRef?: boolean
    status?: boolean
    successRedirectUrl?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    checkoutSessions?: boolean | PaymentLink$checkoutSessionsArgs<ExtArgs>
    _count?: boolean | PaymentLinkCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentLink"]>

  export type PaymentLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    amountMinor?: boolean
    currency?: boolean
    country?: boolean
    actorId?: boolean
    destinationAccountRef?: boolean
    status?: boolean
    successRedirectUrl?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["paymentLink"]>

  export type PaymentLinkSelectScalar = {
    id?: boolean
    orgId?: boolean
    slug?: boolean
    title?: boolean
    description?: boolean
    amountMinor?: boolean
    currency?: boolean
    country?: boolean
    actorId?: boolean
    destinationAccountRef?: boolean
    status?: boolean
    successRedirectUrl?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    checkoutSessions?: boolean | PaymentLink$checkoutSessionsArgs<ExtArgs>
    _count?: boolean | PaymentLinkCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PaymentLinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PaymentLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentLink"
    objects: {
      checkoutSessions: Prisma.$CheckoutSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      /**
       * Public slug embedded in hosted checkout URLs (unguessable).
       */
      slug: string
      title: string
      description: string | null
      amountMinor: bigint
      currency: string
      country: string
      actorId: string
      destinationAccountRef: string
      status: $Enums.PaymentLinkStatus
      successRedirectUrl: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["paymentLink"]>
    composites: {}
  }

  type PaymentLinkGetPayload<S extends boolean | null | undefined | PaymentLinkDefaultArgs> = $Result.GetResult<Prisma.$PaymentLinkPayload, S>

  type PaymentLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PaymentLinkFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PaymentLinkCountAggregateInputType | true
    }

  export interface PaymentLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentLink'], meta: { name: 'PaymentLink' } }
    /**
     * Find zero or one PaymentLink that matches the filter.
     * @param {PaymentLinkFindUniqueArgs} args - Arguments to find a PaymentLink
     * @example
     * // Get one PaymentLink
     * const paymentLink = await prisma.paymentLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentLinkFindUniqueArgs>(args: SelectSubset<T, PaymentLinkFindUniqueArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PaymentLink that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PaymentLinkFindUniqueOrThrowArgs} args - Arguments to find a PaymentLink
     * @example
     * // Get one PaymentLink
     * const paymentLink = await prisma.paymentLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PaymentLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLinkFindFirstArgs} args - Arguments to find a PaymentLink
     * @example
     * // Get one PaymentLink
     * const paymentLink = await prisma.paymentLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentLinkFindFirstArgs>(args?: SelectSubset<T, PaymentLinkFindFirstArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PaymentLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLinkFindFirstOrThrowArgs} args - Arguments to find a PaymentLink
     * @example
     * // Get one PaymentLink
     * const paymentLink = await prisma.paymentLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PaymentLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentLinks
     * const paymentLinks = await prisma.paymentLink.findMany()
     * 
     * // Get first 10 PaymentLinks
     * const paymentLinks = await prisma.paymentLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentLinkWithIdOnly = await prisma.paymentLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentLinkFindManyArgs>(args?: SelectSubset<T, PaymentLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PaymentLink.
     * @param {PaymentLinkCreateArgs} args - Arguments to create a PaymentLink.
     * @example
     * // Create one PaymentLink
     * const PaymentLink = await prisma.paymentLink.create({
     *   data: {
     *     // ... data to create a PaymentLink
     *   }
     * })
     * 
     */
    create<T extends PaymentLinkCreateArgs>(args: SelectSubset<T, PaymentLinkCreateArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PaymentLinks.
     * @param {PaymentLinkCreateManyArgs} args - Arguments to create many PaymentLinks.
     * @example
     * // Create many PaymentLinks
     * const paymentLink = await prisma.paymentLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentLinkCreateManyArgs>(args?: SelectSubset<T, PaymentLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentLinks and returns the data saved in the database.
     * @param {PaymentLinkCreateManyAndReturnArgs} args - Arguments to create many PaymentLinks.
     * @example
     * // Create many PaymentLinks
     * const paymentLink = await prisma.paymentLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentLinks and only return the `id`
     * const paymentLinkWithIdOnly = await prisma.paymentLink.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PaymentLink.
     * @param {PaymentLinkDeleteArgs} args - Arguments to delete one PaymentLink.
     * @example
     * // Delete one PaymentLink
     * const PaymentLink = await prisma.paymentLink.delete({
     *   where: {
     *     // ... filter to delete one PaymentLink
     *   }
     * })
     * 
     */
    delete<T extends PaymentLinkDeleteArgs>(args: SelectSubset<T, PaymentLinkDeleteArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PaymentLink.
     * @param {PaymentLinkUpdateArgs} args - Arguments to update one PaymentLink.
     * @example
     * // Update one PaymentLink
     * const paymentLink = await prisma.paymentLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentLinkUpdateArgs>(args: SelectSubset<T, PaymentLinkUpdateArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PaymentLinks.
     * @param {PaymentLinkDeleteManyArgs} args - Arguments to filter PaymentLinks to delete.
     * @example
     * // Delete a few PaymentLinks
     * const { count } = await prisma.paymentLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentLinkDeleteManyArgs>(args?: SelectSubset<T, PaymentLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentLinks
     * const paymentLink = await prisma.paymentLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentLinkUpdateManyArgs>(args: SelectSubset<T, PaymentLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PaymentLink.
     * @param {PaymentLinkUpsertArgs} args - Arguments to update or create a PaymentLink.
     * @example
     * // Update or create a PaymentLink
     * const paymentLink = await prisma.paymentLink.upsert({
     *   create: {
     *     // ... data to create a PaymentLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentLink we want to update
     *   }
     * })
     */
    upsert<T extends PaymentLinkUpsertArgs>(args: SelectSubset<T, PaymentLinkUpsertArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PaymentLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLinkCountArgs} args - Arguments to filter PaymentLinks to count.
     * @example
     * // Count the number of PaymentLinks
     * const count = await prisma.paymentLink.count({
     *   where: {
     *     // ... the filter for the PaymentLinks we want to count
     *   }
     * })
    **/
    count<T extends PaymentLinkCountArgs>(
      args?: Subset<T, PaymentLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PaymentLinkAggregateArgs>(args: Subset<T, PaymentLinkAggregateArgs>): Prisma.PrismaPromise<GetPaymentLinkAggregateType<T>>

    /**
     * Group by PaymentLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentLinkGroupByArgs} args - Group by arguments.
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
      T extends PaymentLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentLinkGroupByArgs['orderBy'] }
        : { orderBy?: PaymentLinkGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PaymentLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentLink model
   */
  readonly fields: PaymentLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    checkoutSessions<T extends PaymentLink$checkoutSessionsArgs<ExtArgs> = {}>(args?: Subset<T, PaymentLink$checkoutSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the PaymentLink model
   */ 
  interface PaymentLinkFieldRefs {
    readonly id: FieldRef<"PaymentLink", 'String'>
    readonly orgId: FieldRef<"PaymentLink", 'String'>
    readonly slug: FieldRef<"PaymentLink", 'String'>
    readonly title: FieldRef<"PaymentLink", 'String'>
    readonly description: FieldRef<"PaymentLink", 'String'>
    readonly amountMinor: FieldRef<"PaymentLink", 'BigInt'>
    readonly currency: FieldRef<"PaymentLink", 'String'>
    readonly country: FieldRef<"PaymentLink", 'String'>
    readonly actorId: FieldRef<"PaymentLink", 'String'>
    readonly destinationAccountRef: FieldRef<"PaymentLink", 'String'>
    readonly status: FieldRef<"PaymentLink", 'PaymentLinkStatus'>
    readonly successRedirectUrl: FieldRef<"PaymentLink", 'String'>
    readonly metadata: FieldRef<"PaymentLink", 'Json'>
    readonly createdAt: FieldRef<"PaymentLink", 'DateTime'>
    readonly updatedAt: FieldRef<"PaymentLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PaymentLink findUnique
   */
  export type PaymentLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * Filter, which PaymentLink to fetch.
     */
    where: PaymentLinkWhereUniqueInput
  }

  /**
   * PaymentLink findUniqueOrThrow
   */
  export type PaymentLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * Filter, which PaymentLink to fetch.
     */
    where: PaymentLinkWhereUniqueInput
  }

  /**
   * PaymentLink findFirst
   */
  export type PaymentLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * Filter, which PaymentLink to fetch.
     */
    where?: PaymentLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentLinks to fetch.
     */
    orderBy?: PaymentLinkOrderByWithRelationInput | PaymentLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentLinks.
     */
    cursor?: PaymentLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentLinks.
     */
    distinct?: PaymentLinkScalarFieldEnum | PaymentLinkScalarFieldEnum[]
  }

  /**
   * PaymentLink findFirstOrThrow
   */
  export type PaymentLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * Filter, which PaymentLink to fetch.
     */
    where?: PaymentLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentLinks to fetch.
     */
    orderBy?: PaymentLinkOrderByWithRelationInput | PaymentLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentLinks.
     */
    cursor?: PaymentLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentLinks.
     */
    distinct?: PaymentLinkScalarFieldEnum | PaymentLinkScalarFieldEnum[]
  }

  /**
   * PaymentLink findMany
   */
  export type PaymentLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * Filter, which PaymentLinks to fetch.
     */
    where?: PaymentLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentLinks to fetch.
     */
    orderBy?: PaymentLinkOrderByWithRelationInput | PaymentLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentLinks.
     */
    cursor?: PaymentLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentLinks.
     */
    skip?: number
    distinct?: PaymentLinkScalarFieldEnum | PaymentLinkScalarFieldEnum[]
  }

  /**
   * PaymentLink create
   */
  export type PaymentLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentLink.
     */
    data: XOR<PaymentLinkCreateInput, PaymentLinkUncheckedCreateInput>
  }

  /**
   * PaymentLink createMany
   */
  export type PaymentLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentLinks.
     */
    data: PaymentLinkCreateManyInput | PaymentLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentLink createManyAndReturn
   */
  export type PaymentLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PaymentLinks.
     */
    data: PaymentLinkCreateManyInput | PaymentLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentLink update
   */
  export type PaymentLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentLink.
     */
    data: XOR<PaymentLinkUpdateInput, PaymentLinkUncheckedUpdateInput>
    /**
     * Choose, which PaymentLink to update.
     */
    where: PaymentLinkWhereUniqueInput
  }

  /**
   * PaymentLink updateMany
   */
  export type PaymentLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentLinks.
     */
    data: XOR<PaymentLinkUpdateManyMutationInput, PaymentLinkUncheckedUpdateManyInput>
    /**
     * Filter which PaymentLinks to update
     */
    where?: PaymentLinkWhereInput
  }

  /**
   * PaymentLink upsert
   */
  export type PaymentLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentLink to update in case it exists.
     */
    where: PaymentLinkWhereUniqueInput
    /**
     * In case the PaymentLink found by the `where` argument doesn't exist, create a new PaymentLink with this data.
     */
    create: XOR<PaymentLinkCreateInput, PaymentLinkUncheckedCreateInput>
    /**
     * In case the PaymentLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentLinkUpdateInput, PaymentLinkUncheckedUpdateInput>
  }

  /**
   * PaymentLink delete
   */
  export type PaymentLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    /**
     * Filter which PaymentLink to delete.
     */
    where: PaymentLinkWhereUniqueInput
  }

  /**
   * PaymentLink deleteMany
   */
  export type PaymentLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentLinks to delete
     */
    where?: PaymentLinkWhereInput
  }

  /**
   * PaymentLink.checkoutSessions
   */
  export type PaymentLink$checkoutSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    where?: CheckoutSessionWhereInput
    orderBy?: CheckoutSessionOrderByWithRelationInput | CheckoutSessionOrderByWithRelationInput[]
    cursor?: CheckoutSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CheckoutSessionScalarFieldEnum | CheckoutSessionScalarFieldEnum[]
  }

  /**
   * PaymentLink without action
   */
  export type PaymentLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
  }


  /**
   * Model CheckoutSession
   */

  export type AggregateCheckoutSession = {
    _count: CheckoutSessionCountAggregateOutputType | null
    _avg: CheckoutSessionAvgAggregateOutputType | null
    _sum: CheckoutSessionSumAggregateOutputType | null
    _min: CheckoutSessionMinAggregateOutputType | null
    _max: CheckoutSessionMaxAggregateOutputType | null
  }

  export type CheckoutSessionAvgAggregateOutputType = {
    amountMinor: number | null
  }

  export type CheckoutSessionSumAggregateOutputType = {
    amountMinor: bigint | null
  }

  export type CheckoutSessionMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    paymentLinkId: string | null
    idempotencyKey: string | null
    status: $Enums.CheckoutSessionStatus | null
    amountMinor: bigint | null
    currency: string | null
    country: string | null
    destinationAccountRef: string | null
    actorId: string | null
    customerName: string | null
    customerEmail: string | null
    intentId: string | null
    executionTransactionId: string | null
    expiresAt: Date | null
    completedAt: Date | null
    failureReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CheckoutSessionMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    paymentLinkId: string | null
    idempotencyKey: string | null
    status: $Enums.CheckoutSessionStatus | null
    amountMinor: bigint | null
    currency: string | null
    country: string | null
    destinationAccountRef: string | null
    actorId: string | null
    customerName: string | null
    customerEmail: string | null
    intentId: string | null
    executionTransactionId: string | null
    expiresAt: Date | null
    completedAt: Date | null
    failureReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CheckoutSessionCountAggregateOutputType = {
    id: number
    orgId: number
    paymentLinkId: number
    idempotencyKey: number
    status: number
    amountMinor: number
    currency: number
    country: number
    destinationAccountRef: number
    actorId: number
    customerName: number
    customerEmail: number
    intentId: number
    executionTransactionId: number
    instruction: number
    expiresAt: number
    completedAt: number
    failureReason: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CheckoutSessionAvgAggregateInputType = {
    amountMinor?: true
  }

  export type CheckoutSessionSumAggregateInputType = {
    amountMinor?: true
  }

  export type CheckoutSessionMinAggregateInputType = {
    id?: true
    orgId?: true
    paymentLinkId?: true
    idempotencyKey?: true
    status?: true
    amountMinor?: true
    currency?: true
    country?: true
    destinationAccountRef?: true
    actorId?: true
    customerName?: true
    customerEmail?: true
    intentId?: true
    executionTransactionId?: true
    expiresAt?: true
    completedAt?: true
    failureReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CheckoutSessionMaxAggregateInputType = {
    id?: true
    orgId?: true
    paymentLinkId?: true
    idempotencyKey?: true
    status?: true
    amountMinor?: true
    currency?: true
    country?: true
    destinationAccountRef?: true
    actorId?: true
    customerName?: true
    customerEmail?: true
    intentId?: true
    executionTransactionId?: true
    expiresAt?: true
    completedAt?: true
    failureReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CheckoutSessionCountAggregateInputType = {
    id?: true
    orgId?: true
    paymentLinkId?: true
    idempotencyKey?: true
    status?: true
    amountMinor?: true
    currency?: true
    country?: true
    destinationAccountRef?: true
    actorId?: true
    customerName?: true
    customerEmail?: true
    intentId?: true
    executionTransactionId?: true
    instruction?: true
    expiresAt?: true
    completedAt?: true
    failureReason?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CheckoutSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CheckoutSession to aggregate.
     */
    where?: CheckoutSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckoutSessions to fetch.
     */
    orderBy?: CheckoutSessionOrderByWithRelationInput | CheckoutSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CheckoutSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckoutSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckoutSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CheckoutSessions
    **/
    _count?: true | CheckoutSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CheckoutSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CheckoutSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CheckoutSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CheckoutSessionMaxAggregateInputType
  }

  export type GetCheckoutSessionAggregateType<T extends CheckoutSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateCheckoutSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCheckoutSession[P]>
      : GetScalarType<T[P], AggregateCheckoutSession[P]>
  }




  export type CheckoutSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CheckoutSessionWhereInput
    orderBy?: CheckoutSessionOrderByWithAggregationInput | CheckoutSessionOrderByWithAggregationInput[]
    by: CheckoutSessionScalarFieldEnum[] | CheckoutSessionScalarFieldEnum
    having?: CheckoutSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CheckoutSessionCountAggregateInputType | true
    _avg?: CheckoutSessionAvgAggregateInputType
    _sum?: CheckoutSessionSumAggregateInputType
    _min?: CheckoutSessionMinAggregateInputType
    _max?: CheckoutSessionMaxAggregateInputType
  }

  export type CheckoutSessionGroupByOutputType = {
    id: string
    orgId: string
    paymentLinkId: string | null
    idempotencyKey: string
    status: $Enums.CheckoutSessionStatus
    amountMinor: bigint
    currency: string
    country: string
    destinationAccountRef: string
    actorId: string
    customerName: string
    customerEmail: string | null
    intentId: string | null
    executionTransactionId: string | null
    instruction: JsonValue | null
    expiresAt: Date | null
    completedAt: Date | null
    failureReason: string | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: CheckoutSessionCountAggregateOutputType | null
    _avg: CheckoutSessionAvgAggregateOutputType | null
    _sum: CheckoutSessionSumAggregateOutputType | null
    _min: CheckoutSessionMinAggregateOutputType | null
    _max: CheckoutSessionMaxAggregateOutputType | null
  }

  type GetCheckoutSessionGroupByPayload<T extends CheckoutSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CheckoutSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CheckoutSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CheckoutSessionGroupByOutputType[P]>
            : GetScalarType<T[P], CheckoutSessionGroupByOutputType[P]>
        }
      >
    >


  export type CheckoutSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    paymentLinkId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    amountMinor?: boolean
    currency?: boolean
    country?: boolean
    destinationAccountRef?: boolean
    actorId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    intentId?: boolean
    executionTransactionId?: boolean
    instruction?: boolean
    expiresAt?: boolean
    completedAt?: boolean
    failureReason?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paymentLink?: boolean | CheckoutSession$paymentLinkArgs<ExtArgs>
  }, ExtArgs["result"]["checkoutSession"]>

  export type CheckoutSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    paymentLinkId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    amountMinor?: boolean
    currency?: boolean
    country?: boolean
    destinationAccountRef?: boolean
    actorId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    intentId?: boolean
    executionTransactionId?: boolean
    instruction?: boolean
    expiresAt?: boolean
    completedAt?: boolean
    failureReason?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paymentLink?: boolean | CheckoutSession$paymentLinkArgs<ExtArgs>
  }, ExtArgs["result"]["checkoutSession"]>

  export type CheckoutSessionSelectScalar = {
    id?: boolean
    orgId?: boolean
    paymentLinkId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    amountMinor?: boolean
    currency?: boolean
    country?: boolean
    destinationAccountRef?: boolean
    actorId?: boolean
    customerName?: boolean
    customerEmail?: boolean
    intentId?: boolean
    executionTransactionId?: boolean
    instruction?: boolean
    expiresAt?: boolean
    completedAt?: boolean
    failureReason?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CheckoutSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentLink?: boolean | CheckoutSession$paymentLinkArgs<ExtArgs>
  }
  export type CheckoutSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentLink?: boolean | CheckoutSession$paymentLinkArgs<ExtArgs>
  }

  export type $CheckoutSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CheckoutSession"
    objects: {
      paymentLink: Prisma.$PaymentLinkPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      paymentLinkId: string | null
      idempotencyKey: string
      status: $Enums.CheckoutSessionStatus
      amountMinor: bigint
      currency: string
      country: string
      destinationAccountRef: string
      actorId: string
      customerName: string
      customerEmail: string | null
      intentId: string | null
      executionTransactionId: string | null
      instruction: Prisma.JsonValue | null
      expiresAt: Date | null
      completedAt: Date | null
      failureReason: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["checkoutSession"]>
    composites: {}
  }

  type CheckoutSessionGetPayload<S extends boolean | null | undefined | CheckoutSessionDefaultArgs> = $Result.GetResult<Prisma.$CheckoutSessionPayload, S>

  type CheckoutSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CheckoutSessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CheckoutSessionCountAggregateInputType | true
    }

  export interface CheckoutSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CheckoutSession'], meta: { name: 'CheckoutSession' } }
    /**
     * Find zero or one CheckoutSession that matches the filter.
     * @param {CheckoutSessionFindUniqueArgs} args - Arguments to find a CheckoutSession
     * @example
     * // Get one CheckoutSession
     * const checkoutSession = await prisma.checkoutSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CheckoutSessionFindUniqueArgs>(args: SelectSubset<T, CheckoutSessionFindUniqueArgs<ExtArgs>>): Prisma__CheckoutSessionClient<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CheckoutSession that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CheckoutSessionFindUniqueOrThrowArgs} args - Arguments to find a CheckoutSession
     * @example
     * // Get one CheckoutSession
     * const checkoutSession = await prisma.checkoutSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CheckoutSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, CheckoutSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CheckoutSessionClient<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CheckoutSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSessionFindFirstArgs} args - Arguments to find a CheckoutSession
     * @example
     * // Get one CheckoutSession
     * const checkoutSession = await prisma.checkoutSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CheckoutSessionFindFirstArgs>(args?: SelectSubset<T, CheckoutSessionFindFirstArgs<ExtArgs>>): Prisma__CheckoutSessionClient<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CheckoutSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSessionFindFirstOrThrowArgs} args - Arguments to find a CheckoutSession
     * @example
     * // Get one CheckoutSession
     * const checkoutSession = await prisma.checkoutSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CheckoutSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, CheckoutSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CheckoutSessionClient<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CheckoutSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CheckoutSessions
     * const checkoutSessions = await prisma.checkoutSession.findMany()
     * 
     * // Get first 10 CheckoutSessions
     * const checkoutSessions = await prisma.checkoutSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const checkoutSessionWithIdOnly = await prisma.checkoutSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CheckoutSessionFindManyArgs>(args?: SelectSubset<T, CheckoutSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CheckoutSession.
     * @param {CheckoutSessionCreateArgs} args - Arguments to create a CheckoutSession.
     * @example
     * // Create one CheckoutSession
     * const CheckoutSession = await prisma.checkoutSession.create({
     *   data: {
     *     // ... data to create a CheckoutSession
     *   }
     * })
     * 
     */
    create<T extends CheckoutSessionCreateArgs>(args: SelectSubset<T, CheckoutSessionCreateArgs<ExtArgs>>): Prisma__CheckoutSessionClient<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CheckoutSessions.
     * @param {CheckoutSessionCreateManyArgs} args - Arguments to create many CheckoutSessions.
     * @example
     * // Create many CheckoutSessions
     * const checkoutSession = await prisma.checkoutSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CheckoutSessionCreateManyArgs>(args?: SelectSubset<T, CheckoutSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CheckoutSessions and returns the data saved in the database.
     * @param {CheckoutSessionCreateManyAndReturnArgs} args - Arguments to create many CheckoutSessions.
     * @example
     * // Create many CheckoutSessions
     * const checkoutSession = await prisma.checkoutSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CheckoutSessions and only return the `id`
     * const checkoutSessionWithIdOnly = await prisma.checkoutSession.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CheckoutSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, CheckoutSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CheckoutSession.
     * @param {CheckoutSessionDeleteArgs} args - Arguments to delete one CheckoutSession.
     * @example
     * // Delete one CheckoutSession
     * const CheckoutSession = await prisma.checkoutSession.delete({
     *   where: {
     *     // ... filter to delete one CheckoutSession
     *   }
     * })
     * 
     */
    delete<T extends CheckoutSessionDeleteArgs>(args: SelectSubset<T, CheckoutSessionDeleteArgs<ExtArgs>>): Prisma__CheckoutSessionClient<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CheckoutSession.
     * @param {CheckoutSessionUpdateArgs} args - Arguments to update one CheckoutSession.
     * @example
     * // Update one CheckoutSession
     * const checkoutSession = await prisma.checkoutSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CheckoutSessionUpdateArgs>(args: SelectSubset<T, CheckoutSessionUpdateArgs<ExtArgs>>): Prisma__CheckoutSessionClient<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CheckoutSessions.
     * @param {CheckoutSessionDeleteManyArgs} args - Arguments to filter CheckoutSessions to delete.
     * @example
     * // Delete a few CheckoutSessions
     * const { count } = await prisma.checkoutSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CheckoutSessionDeleteManyArgs>(args?: SelectSubset<T, CheckoutSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CheckoutSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CheckoutSessions
     * const checkoutSession = await prisma.checkoutSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CheckoutSessionUpdateManyArgs>(args: SelectSubset<T, CheckoutSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CheckoutSession.
     * @param {CheckoutSessionUpsertArgs} args - Arguments to update or create a CheckoutSession.
     * @example
     * // Update or create a CheckoutSession
     * const checkoutSession = await prisma.checkoutSession.upsert({
     *   create: {
     *     // ... data to create a CheckoutSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CheckoutSession we want to update
     *   }
     * })
     */
    upsert<T extends CheckoutSessionUpsertArgs>(args: SelectSubset<T, CheckoutSessionUpsertArgs<ExtArgs>>): Prisma__CheckoutSessionClient<$Result.GetResult<Prisma.$CheckoutSessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CheckoutSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSessionCountArgs} args - Arguments to filter CheckoutSessions to count.
     * @example
     * // Count the number of CheckoutSessions
     * const count = await prisma.checkoutSession.count({
     *   where: {
     *     // ... the filter for the CheckoutSessions we want to count
     *   }
     * })
    **/
    count<T extends CheckoutSessionCountArgs>(
      args?: Subset<T, CheckoutSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CheckoutSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CheckoutSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CheckoutSessionAggregateArgs>(args: Subset<T, CheckoutSessionAggregateArgs>): Prisma.PrismaPromise<GetCheckoutSessionAggregateType<T>>

    /**
     * Group by CheckoutSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CheckoutSessionGroupByArgs} args - Group by arguments.
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
      T extends CheckoutSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CheckoutSessionGroupByArgs['orderBy'] }
        : { orderBy?: CheckoutSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CheckoutSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCheckoutSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CheckoutSession model
   */
  readonly fields: CheckoutSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CheckoutSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CheckoutSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    paymentLink<T extends CheckoutSession$paymentLinkArgs<ExtArgs> = {}>(args?: Subset<T, CheckoutSession$paymentLinkArgs<ExtArgs>>): Prisma__PaymentLinkClient<$Result.GetResult<Prisma.$PaymentLinkPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the CheckoutSession model
   */ 
  interface CheckoutSessionFieldRefs {
    readonly id: FieldRef<"CheckoutSession", 'String'>
    readonly orgId: FieldRef<"CheckoutSession", 'String'>
    readonly paymentLinkId: FieldRef<"CheckoutSession", 'String'>
    readonly idempotencyKey: FieldRef<"CheckoutSession", 'String'>
    readonly status: FieldRef<"CheckoutSession", 'CheckoutSessionStatus'>
    readonly amountMinor: FieldRef<"CheckoutSession", 'BigInt'>
    readonly currency: FieldRef<"CheckoutSession", 'String'>
    readonly country: FieldRef<"CheckoutSession", 'String'>
    readonly destinationAccountRef: FieldRef<"CheckoutSession", 'String'>
    readonly actorId: FieldRef<"CheckoutSession", 'String'>
    readonly customerName: FieldRef<"CheckoutSession", 'String'>
    readonly customerEmail: FieldRef<"CheckoutSession", 'String'>
    readonly intentId: FieldRef<"CheckoutSession", 'String'>
    readonly executionTransactionId: FieldRef<"CheckoutSession", 'String'>
    readonly instruction: FieldRef<"CheckoutSession", 'Json'>
    readonly expiresAt: FieldRef<"CheckoutSession", 'DateTime'>
    readonly completedAt: FieldRef<"CheckoutSession", 'DateTime'>
    readonly failureReason: FieldRef<"CheckoutSession", 'String'>
    readonly metadata: FieldRef<"CheckoutSession", 'Json'>
    readonly createdAt: FieldRef<"CheckoutSession", 'DateTime'>
    readonly updatedAt: FieldRef<"CheckoutSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CheckoutSession findUnique
   */
  export type CheckoutSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * Filter, which CheckoutSession to fetch.
     */
    where: CheckoutSessionWhereUniqueInput
  }

  /**
   * CheckoutSession findUniqueOrThrow
   */
  export type CheckoutSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * Filter, which CheckoutSession to fetch.
     */
    where: CheckoutSessionWhereUniqueInput
  }

  /**
   * CheckoutSession findFirst
   */
  export type CheckoutSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * Filter, which CheckoutSession to fetch.
     */
    where?: CheckoutSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckoutSessions to fetch.
     */
    orderBy?: CheckoutSessionOrderByWithRelationInput | CheckoutSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CheckoutSessions.
     */
    cursor?: CheckoutSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckoutSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckoutSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CheckoutSessions.
     */
    distinct?: CheckoutSessionScalarFieldEnum | CheckoutSessionScalarFieldEnum[]
  }

  /**
   * CheckoutSession findFirstOrThrow
   */
  export type CheckoutSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * Filter, which CheckoutSession to fetch.
     */
    where?: CheckoutSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckoutSessions to fetch.
     */
    orderBy?: CheckoutSessionOrderByWithRelationInput | CheckoutSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CheckoutSessions.
     */
    cursor?: CheckoutSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckoutSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckoutSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CheckoutSessions.
     */
    distinct?: CheckoutSessionScalarFieldEnum | CheckoutSessionScalarFieldEnum[]
  }

  /**
   * CheckoutSession findMany
   */
  export type CheckoutSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * Filter, which CheckoutSessions to fetch.
     */
    where?: CheckoutSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CheckoutSessions to fetch.
     */
    orderBy?: CheckoutSessionOrderByWithRelationInput | CheckoutSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CheckoutSessions.
     */
    cursor?: CheckoutSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CheckoutSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CheckoutSessions.
     */
    skip?: number
    distinct?: CheckoutSessionScalarFieldEnum | CheckoutSessionScalarFieldEnum[]
  }

  /**
   * CheckoutSession create
   */
  export type CheckoutSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a CheckoutSession.
     */
    data: XOR<CheckoutSessionCreateInput, CheckoutSessionUncheckedCreateInput>
  }

  /**
   * CheckoutSession createMany
   */
  export type CheckoutSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CheckoutSessions.
     */
    data: CheckoutSessionCreateManyInput | CheckoutSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CheckoutSession createManyAndReturn
   */
  export type CheckoutSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CheckoutSessions.
     */
    data: CheckoutSessionCreateManyInput | CheckoutSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CheckoutSession update
   */
  export type CheckoutSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a CheckoutSession.
     */
    data: XOR<CheckoutSessionUpdateInput, CheckoutSessionUncheckedUpdateInput>
    /**
     * Choose, which CheckoutSession to update.
     */
    where: CheckoutSessionWhereUniqueInput
  }

  /**
   * CheckoutSession updateMany
   */
  export type CheckoutSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CheckoutSessions.
     */
    data: XOR<CheckoutSessionUpdateManyMutationInput, CheckoutSessionUncheckedUpdateManyInput>
    /**
     * Filter which CheckoutSessions to update
     */
    where?: CheckoutSessionWhereInput
  }

  /**
   * CheckoutSession upsert
   */
  export type CheckoutSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the CheckoutSession to update in case it exists.
     */
    where: CheckoutSessionWhereUniqueInput
    /**
     * In case the CheckoutSession found by the `where` argument doesn't exist, create a new CheckoutSession with this data.
     */
    create: XOR<CheckoutSessionCreateInput, CheckoutSessionUncheckedCreateInput>
    /**
     * In case the CheckoutSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CheckoutSessionUpdateInput, CheckoutSessionUncheckedUpdateInput>
  }

  /**
   * CheckoutSession delete
   */
  export type CheckoutSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
    /**
     * Filter which CheckoutSession to delete.
     */
    where: CheckoutSessionWhereUniqueInput
  }

  /**
   * CheckoutSession deleteMany
   */
  export type CheckoutSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CheckoutSessions to delete
     */
    where?: CheckoutSessionWhereInput
  }

  /**
   * CheckoutSession.paymentLink
   */
  export type CheckoutSession$paymentLinkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentLink
     */
    select?: PaymentLinkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentLinkInclude<ExtArgs> | null
    where?: PaymentLinkWhereInput
  }

  /**
   * CheckoutSession without action
   */
  export type CheckoutSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CheckoutSession
     */
    select?: CheckoutSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CheckoutSessionInclude<ExtArgs> | null
  }


  /**
   * Model SettlementReport
   */

  export type AggregateSettlementReport = {
    _count: SettlementReportCountAggregateOutputType | null
    _avg: SettlementReportAvgAggregateOutputType | null
    _sum: SettlementReportSumAggregateOutputType | null
    _min: SettlementReportMinAggregateOutputType | null
    _max: SettlementReportMaxAggregateOutputType | null
  }

  export type SettlementReportAvgAggregateOutputType = {
    totalSettledMinor: number | null
    transactionCount: number | null
  }

  export type SettlementReportSumAggregateOutputType = {
    totalSettledMinor: bigint | null
    transactionCount: number | null
  }

  export type SettlementReportMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    periodStart: Date | null
    periodEnd: Date | null
    currency: string | null
    status: $Enums.SettlementReportStatus | null
    totalSettledMinor: bigint | null
    transactionCount: number | null
    error: string | null
    generatedAt: Date | null
    createdAt: Date | null
  }

  export type SettlementReportMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    periodStart: Date | null
    periodEnd: Date | null
    currency: string | null
    status: $Enums.SettlementReportStatus | null
    totalSettledMinor: bigint | null
    transactionCount: number | null
    error: string | null
    generatedAt: Date | null
    createdAt: Date | null
  }

  export type SettlementReportCountAggregateOutputType = {
    id: number
    orgId: number
    periodStart: number
    periodEnd: number
    currency: number
    status: number
    totalSettledMinor: number
    transactionCount: number
    lines: number
    error: number
    generatedAt: number
    createdAt: number
    _all: number
  }


  export type SettlementReportAvgAggregateInputType = {
    totalSettledMinor?: true
    transactionCount?: true
  }

  export type SettlementReportSumAggregateInputType = {
    totalSettledMinor?: true
    transactionCount?: true
  }

  export type SettlementReportMinAggregateInputType = {
    id?: true
    orgId?: true
    periodStart?: true
    periodEnd?: true
    currency?: true
    status?: true
    totalSettledMinor?: true
    transactionCount?: true
    error?: true
    generatedAt?: true
    createdAt?: true
  }

  export type SettlementReportMaxAggregateInputType = {
    id?: true
    orgId?: true
    periodStart?: true
    periodEnd?: true
    currency?: true
    status?: true
    totalSettledMinor?: true
    transactionCount?: true
    error?: true
    generatedAt?: true
    createdAt?: true
  }

  export type SettlementReportCountAggregateInputType = {
    id?: true
    orgId?: true
    periodStart?: true
    periodEnd?: true
    currency?: true
    status?: true
    totalSettledMinor?: true
    transactionCount?: true
    lines?: true
    error?: true
    generatedAt?: true
    createdAt?: true
    _all?: true
  }

  export type SettlementReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SettlementReport to aggregate.
     */
    where?: SettlementReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SettlementReports to fetch.
     */
    orderBy?: SettlementReportOrderByWithRelationInput | SettlementReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettlementReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SettlementReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SettlementReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SettlementReports
    **/
    _count?: true | SettlementReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SettlementReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SettlementReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettlementReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettlementReportMaxAggregateInputType
  }

  export type GetSettlementReportAggregateType<T extends SettlementReportAggregateArgs> = {
        [P in keyof T & keyof AggregateSettlementReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSettlementReport[P]>
      : GetScalarType<T[P], AggregateSettlementReport[P]>
  }




  export type SettlementReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettlementReportWhereInput
    orderBy?: SettlementReportOrderByWithAggregationInput | SettlementReportOrderByWithAggregationInput[]
    by: SettlementReportScalarFieldEnum[] | SettlementReportScalarFieldEnum
    having?: SettlementReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettlementReportCountAggregateInputType | true
    _avg?: SettlementReportAvgAggregateInputType
    _sum?: SettlementReportSumAggregateInputType
    _min?: SettlementReportMinAggregateInputType
    _max?: SettlementReportMaxAggregateInputType
  }

  export type SettlementReportGroupByOutputType = {
    id: string
    orgId: string
    periodStart: Date
    periodEnd: Date
    currency: string | null
    status: $Enums.SettlementReportStatus
    totalSettledMinor: bigint | null
    transactionCount: number | null
    lines: JsonValue | null
    error: string | null
    generatedAt: Date | null
    createdAt: Date
    _count: SettlementReportCountAggregateOutputType | null
    _avg: SettlementReportAvgAggregateOutputType | null
    _sum: SettlementReportSumAggregateOutputType | null
    _min: SettlementReportMinAggregateOutputType | null
    _max: SettlementReportMaxAggregateOutputType | null
  }

  type GetSettlementReportGroupByPayload<T extends SettlementReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettlementReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettlementReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettlementReportGroupByOutputType[P]>
            : GetScalarType<T[P], SettlementReportGroupByOutputType[P]>
        }
      >
    >


  export type SettlementReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    currency?: boolean
    status?: boolean
    totalSettledMinor?: boolean
    transactionCount?: boolean
    lines?: boolean
    error?: boolean
    generatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["settlementReport"]>

  export type SettlementReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    currency?: boolean
    status?: boolean
    totalSettledMinor?: boolean
    transactionCount?: boolean
    lines?: boolean
    error?: boolean
    generatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["settlementReport"]>

  export type SettlementReportSelectScalar = {
    id?: boolean
    orgId?: boolean
    periodStart?: boolean
    periodEnd?: boolean
    currency?: boolean
    status?: boolean
    totalSettledMinor?: boolean
    transactionCount?: boolean
    lines?: boolean
    error?: boolean
    generatedAt?: boolean
    createdAt?: boolean
  }


  export type $SettlementReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SettlementReport"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      periodStart: Date
      periodEnd: Date
      currency: string | null
      status: $Enums.SettlementReportStatus
      totalSettledMinor: bigint | null
      transactionCount: number | null
      lines: Prisma.JsonValue | null
      error: string | null
      generatedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["settlementReport"]>
    composites: {}
  }

  type SettlementReportGetPayload<S extends boolean | null | undefined | SettlementReportDefaultArgs> = $Result.GetResult<Prisma.$SettlementReportPayload, S>

  type SettlementReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SettlementReportFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SettlementReportCountAggregateInputType | true
    }

  export interface SettlementReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SettlementReport'], meta: { name: 'SettlementReport' } }
    /**
     * Find zero or one SettlementReport that matches the filter.
     * @param {SettlementReportFindUniqueArgs} args - Arguments to find a SettlementReport
     * @example
     * // Get one SettlementReport
     * const settlementReport = await prisma.settlementReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettlementReportFindUniqueArgs>(args: SelectSubset<T, SettlementReportFindUniqueArgs<ExtArgs>>): Prisma__SettlementReportClient<$Result.GetResult<Prisma.$SettlementReportPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SettlementReport that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SettlementReportFindUniqueOrThrowArgs} args - Arguments to find a SettlementReport
     * @example
     * // Get one SettlementReport
     * const settlementReport = await prisma.settlementReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettlementReportFindUniqueOrThrowArgs>(args: SelectSubset<T, SettlementReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettlementReportClient<$Result.GetResult<Prisma.$SettlementReportPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SettlementReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementReportFindFirstArgs} args - Arguments to find a SettlementReport
     * @example
     * // Get one SettlementReport
     * const settlementReport = await prisma.settlementReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettlementReportFindFirstArgs>(args?: SelectSubset<T, SettlementReportFindFirstArgs<ExtArgs>>): Prisma__SettlementReportClient<$Result.GetResult<Prisma.$SettlementReportPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SettlementReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementReportFindFirstOrThrowArgs} args - Arguments to find a SettlementReport
     * @example
     * // Get one SettlementReport
     * const settlementReport = await prisma.settlementReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettlementReportFindFirstOrThrowArgs>(args?: SelectSubset<T, SettlementReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettlementReportClient<$Result.GetResult<Prisma.$SettlementReportPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SettlementReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SettlementReports
     * const settlementReports = await prisma.settlementReport.findMany()
     * 
     * // Get first 10 SettlementReports
     * const settlementReports = await prisma.settlementReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const settlementReportWithIdOnly = await prisma.settlementReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SettlementReportFindManyArgs>(args?: SelectSubset<T, SettlementReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettlementReportPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SettlementReport.
     * @param {SettlementReportCreateArgs} args - Arguments to create a SettlementReport.
     * @example
     * // Create one SettlementReport
     * const SettlementReport = await prisma.settlementReport.create({
     *   data: {
     *     // ... data to create a SettlementReport
     *   }
     * })
     * 
     */
    create<T extends SettlementReportCreateArgs>(args: SelectSubset<T, SettlementReportCreateArgs<ExtArgs>>): Prisma__SettlementReportClient<$Result.GetResult<Prisma.$SettlementReportPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SettlementReports.
     * @param {SettlementReportCreateManyArgs} args - Arguments to create many SettlementReports.
     * @example
     * // Create many SettlementReports
     * const settlementReport = await prisma.settlementReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettlementReportCreateManyArgs>(args?: SelectSubset<T, SettlementReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SettlementReports and returns the data saved in the database.
     * @param {SettlementReportCreateManyAndReturnArgs} args - Arguments to create many SettlementReports.
     * @example
     * // Create many SettlementReports
     * const settlementReport = await prisma.settlementReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SettlementReports and only return the `id`
     * const settlementReportWithIdOnly = await prisma.settlementReport.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettlementReportCreateManyAndReturnArgs>(args?: SelectSubset<T, SettlementReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettlementReportPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SettlementReport.
     * @param {SettlementReportDeleteArgs} args - Arguments to delete one SettlementReport.
     * @example
     * // Delete one SettlementReport
     * const SettlementReport = await prisma.settlementReport.delete({
     *   where: {
     *     // ... filter to delete one SettlementReport
     *   }
     * })
     * 
     */
    delete<T extends SettlementReportDeleteArgs>(args: SelectSubset<T, SettlementReportDeleteArgs<ExtArgs>>): Prisma__SettlementReportClient<$Result.GetResult<Prisma.$SettlementReportPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SettlementReport.
     * @param {SettlementReportUpdateArgs} args - Arguments to update one SettlementReport.
     * @example
     * // Update one SettlementReport
     * const settlementReport = await prisma.settlementReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettlementReportUpdateArgs>(args: SelectSubset<T, SettlementReportUpdateArgs<ExtArgs>>): Prisma__SettlementReportClient<$Result.GetResult<Prisma.$SettlementReportPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SettlementReports.
     * @param {SettlementReportDeleteManyArgs} args - Arguments to filter SettlementReports to delete.
     * @example
     * // Delete a few SettlementReports
     * const { count } = await prisma.settlementReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettlementReportDeleteManyArgs>(args?: SelectSubset<T, SettlementReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SettlementReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SettlementReports
     * const settlementReport = await prisma.settlementReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettlementReportUpdateManyArgs>(args: SelectSubset<T, SettlementReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SettlementReport.
     * @param {SettlementReportUpsertArgs} args - Arguments to update or create a SettlementReport.
     * @example
     * // Update or create a SettlementReport
     * const settlementReport = await prisma.settlementReport.upsert({
     *   create: {
     *     // ... data to create a SettlementReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SettlementReport we want to update
     *   }
     * })
     */
    upsert<T extends SettlementReportUpsertArgs>(args: SelectSubset<T, SettlementReportUpsertArgs<ExtArgs>>): Prisma__SettlementReportClient<$Result.GetResult<Prisma.$SettlementReportPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SettlementReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementReportCountArgs} args - Arguments to filter SettlementReports to count.
     * @example
     * // Count the number of SettlementReports
     * const count = await prisma.settlementReport.count({
     *   where: {
     *     // ... the filter for the SettlementReports we want to count
     *   }
     * })
    **/
    count<T extends SettlementReportCountArgs>(
      args?: Subset<T, SettlementReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettlementReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SettlementReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SettlementReportAggregateArgs>(args: Subset<T, SettlementReportAggregateArgs>): Prisma.PrismaPromise<GetSettlementReportAggregateType<T>>

    /**
     * Group by SettlementReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettlementReportGroupByArgs} args - Group by arguments.
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
      T extends SettlementReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettlementReportGroupByArgs['orderBy'] }
        : { orderBy?: SettlementReportGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SettlementReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettlementReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SettlementReport model
   */
  readonly fields: SettlementReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SettlementReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettlementReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SettlementReport model
   */ 
  interface SettlementReportFieldRefs {
    readonly id: FieldRef<"SettlementReport", 'String'>
    readonly orgId: FieldRef<"SettlementReport", 'String'>
    readonly periodStart: FieldRef<"SettlementReport", 'DateTime'>
    readonly periodEnd: FieldRef<"SettlementReport", 'DateTime'>
    readonly currency: FieldRef<"SettlementReport", 'String'>
    readonly status: FieldRef<"SettlementReport", 'SettlementReportStatus'>
    readonly totalSettledMinor: FieldRef<"SettlementReport", 'BigInt'>
    readonly transactionCount: FieldRef<"SettlementReport", 'Int'>
    readonly lines: FieldRef<"SettlementReport", 'Json'>
    readonly error: FieldRef<"SettlementReport", 'String'>
    readonly generatedAt: FieldRef<"SettlementReport", 'DateTime'>
    readonly createdAt: FieldRef<"SettlementReport", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SettlementReport findUnique
   */
  export type SettlementReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementReport
     */
    select?: SettlementReportSelect<ExtArgs> | null
    /**
     * Filter, which SettlementReport to fetch.
     */
    where: SettlementReportWhereUniqueInput
  }

  /**
   * SettlementReport findUniqueOrThrow
   */
  export type SettlementReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementReport
     */
    select?: SettlementReportSelect<ExtArgs> | null
    /**
     * Filter, which SettlementReport to fetch.
     */
    where: SettlementReportWhereUniqueInput
  }

  /**
   * SettlementReport findFirst
   */
  export type SettlementReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementReport
     */
    select?: SettlementReportSelect<ExtArgs> | null
    /**
     * Filter, which SettlementReport to fetch.
     */
    where?: SettlementReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SettlementReports to fetch.
     */
    orderBy?: SettlementReportOrderByWithRelationInput | SettlementReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SettlementReports.
     */
    cursor?: SettlementReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SettlementReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SettlementReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SettlementReports.
     */
    distinct?: SettlementReportScalarFieldEnum | SettlementReportScalarFieldEnum[]
  }

  /**
   * SettlementReport findFirstOrThrow
   */
  export type SettlementReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementReport
     */
    select?: SettlementReportSelect<ExtArgs> | null
    /**
     * Filter, which SettlementReport to fetch.
     */
    where?: SettlementReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SettlementReports to fetch.
     */
    orderBy?: SettlementReportOrderByWithRelationInput | SettlementReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SettlementReports.
     */
    cursor?: SettlementReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SettlementReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SettlementReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SettlementReports.
     */
    distinct?: SettlementReportScalarFieldEnum | SettlementReportScalarFieldEnum[]
  }

  /**
   * SettlementReport findMany
   */
  export type SettlementReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementReport
     */
    select?: SettlementReportSelect<ExtArgs> | null
    /**
     * Filter, which SettlementReports to fetch.
     */
    where?: SettlementReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SettlementReports to fetch.
     */
    orderBy?: SettlementReportOrderByWithRelationInput | SettlementReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SettlementReports.
     */
    cursor?: SettlementReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SettlementReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SettlementReports.
     */
    skip?: number
    distinct?: SettlementReportScalarFieldEnum | SettlementReportScalarFieldEnum[]
  }

  /**
   * SettlementReport create
   */
  export type SettlementReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementReport
     */
    select?: SettlementReportSelect<ExtArgs> | null
    /**
     * The data needed to create a SettlementReport.
     */
    data: XOR<SettlementReportCreateInput, SettlementReportUncheckedCreateInput>
  }

  /**
   * SettlementReport createMany
   */
  export type SettlementReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SettlementReports.
     */
    data: SettlementReportCreateManyInput | SettlementReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SettlementReport createManyAndReturn
   */
  export type SettlementReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementReport
     */
    select?: SettlementReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SettlementReports.
     */
    data: SettlementReportCreateManyInput | SettlementReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SettlementReport update
   */
  export type SettlementReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementReport
     */
    select?: SettlementReportSelect<ExtArgs> | null
    /**
     * The data needed to update a SettlementReport.
     */
    data: XOR<SettlementReportUpdateInput, SettlementReportUncheckedUpdateInput>
    /**
     * Choose, which SettlementReport to update.
     */
    where: SettlementReportWhereUniqueInput
  }

  /**
   * SettlementReport updateMany
   */
  export type SettlementReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SettlementReports.
     */
    data: XOR<SettlementReportUpdateManyMutationInput, SettlementReportUncheckedUpdateManyInput>
    /**
     * Filter which SettlementReports to update
     */
    where?: SettlementReportWhereInput
  }

  /**
   * SettlementReport upsert
   */
  export type SettlementReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementReport
     */
    select?: SettlementReportSelect<ExtArgs> | null
    /**
     * The filter to search for the SettlementReport to update in case it exists.
     */
    where: SettlementReportWhereUniqueInput
    /**
     * In case the SettlementReport found by the `where` argument doesn't exist, create a new SettlementReport with this data.
     */
    create: XOR<SettlementReportCreateInput, SettlementReportUncheckedCreateInput>
    /**
     * In case the SettlementReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettlementReportUpdateInput, SettlementReportUncheckedUpdateInput>
  }

  /**
   * SettlementReport delete
   */
  export type SettlementReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementReport
     */
    select?: SettlementReportSelect<ExtArgs> | null
    /**
     * Filter which SettlementReport to delete.
     */
    where: SettlementReportWhereUniqueInput
  }

  /**
   * SettlementReport deleteMany
   */
  export type SettlementReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SettlementReports to delete
     */
    where?: SettlementReportWhereInput
  }

  /**
   * SettlementReport without action
   */
  export type SettlementReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SettlementReport
     */
    select?: SettlementReportSelect<ExtArgs> | null
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


  export const PaymentLinkScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    slug: 'slug',
    title: 'title',
    description: 'description',
    amountMinor: 'amountMinor',
    currency: 'currency',
    country: 'country',
    actorId: 'actorId',
    destinationAccountRef: 'destinationAccountRef',
    status: 'status',
    successRedirectUrl: 'successRedirectUrl',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentLinkScalarFieldEnum = (typeof PaymentLinkScalarFieldEnum)[keyof typeof PaymentLinkScalarFieldEnum]


  export const CheckoutSessionScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    paymentLinkId: 'paymentLinkId',
    idempotencyKey: 'idempotencyKey',
    status: 'status',
    amountMinor: 'amountMinor',
    currency: 'currency',
    country: 'country',
    destinationAccountRef: 'destinationAccountRef',
    actorId: 'actorId',
    customerName: 'customerName',
    customerEmail: 'customerEmail',
    intentId: 'intentId',
    executionTransactionId: 'executionTransactionId',
    instruction: 'instruction',
    expiresAt: 'expiresAt',
    completedAt: 'completedAt',
    failureReason: 'failureReason',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CheckoutSessionScalarFieldEnum = (typeof CheckoutSessionScalarFieldEnum)[keyof typeof CheckoutSessionScalarFieldEnum]


  export const SettlementReportScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    periodStart: 'periodStart',
    periodEnd: 'periodEnd',
    currency: 'currency',
    status: 'status',
    totalSettledMinor: 'totalSettledMinor',
    transactionCount: 'transactionCount',
    lines: 'lines',
    error: 'error',
    generatedAt: 'generatedAt',
    createdAt: 'createdAt'
  };

  export type SettlementReportScalarFieldEnum = (typeof SettlementReportScalarFieldEnum)[keyof typeof SettlementReportScalarFieldEnum]


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
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'PaymentLinkStatus'
   */
  export type EnumPaymentLinkStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentLinkStatus'>
    


  /**
   * Reference to a field of type 'PaymentLinkStatus[]'
   */
  export type ListEnumPaymentLinkStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentLinkStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'CheckoutSessionStatus'
   */
  export type EnumCheckoutSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CheckoutSessionStatus'>
    


  /**
   * Reference to a field of type 'CheckoutSessionStatus[]'
   */
  export type ListEnumCheckoutSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CheckoutSessionStatus[]'>
    


  /**
   * Reference to a field of type 'SettlementReportStatus'
   */
  export type EnumSettlementReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SettlementReportStatus'>
    


  /**
   * Reference to a field of type 'SettlementReportStatus[]'
   */
  export type ListEnumSettlementReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SettlementReportStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


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


  export type PaymentLinkWhereInput = {
    AND?: PaymentLinkWhereInput | PaymentLinkWhereInput[]
    OR?: PaymentLinkWhereInput[]
    NOT?: PaymentLinkWhereInput | PaymentLinkWhereInput[]
    id?: UuidFilter<"PaymentLink"> | string
    orgId?: StringFilter<"PaymentLink"> | string
    slug?: StringFilter<"PaymentLink"> | string
    title?: StringFilter<"PaymentLink"> | string
    description?: StringNullableFilter<"PaymentLink"> | string | null
    amountMinor?: BigIntFilter<"PaymentLink"> | bigint | number
    currency?: StringFilter<"PaymentLink"> | string
    country?: StringFilter<"PaymentLink"> | string
    actorId?: StringFilter<"PaymentLink"> | string
    destinationAccountRef?: StringFilter<"PaymentLink"> | string
    status?: EnumPaymentLinkStatusFilter<"PaymentLink"> | $Enums.PaymentLinkStatus
    successRedirectUrl?: StringNullableFilter<"PaymentLink"> | string | null
    metadata?: JsonNullableFilter<"PaymentLink">
    createdAt?: DateTimeFilter<"PaymentLink"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentLink"> | Date | string
    checkoutSessions?: CheckoutSessionListRelationFilter
  }

  export type PaymentLinkOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    country?: SortOrder
    actorId?: SortOrder
    destinationAccountRef?: SortOrder
    status?: SortOrder
    successRedirectUrl?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    checkoutSessions?: CheckoutSessionOrderByRelationAggregateInput
  }

  export type PaymentLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: PaymentLinkWhereInput | PaymentLinkWhereInput[]
    OR?: PaymentLinkWhereInput[]
    NOT?: PaymentLinkWhereInput | PaymentLinkWhereInput[]
    orgId?: StringFilter<"PaymentLink"> | string
    title?: StringFilter<"PaymentLink"> | string
    description?: StringNullableFilter<"PaymentLink"> | string | null
    amountMinor?: BigIntFilter<"PaymentLink"> | bigint | number
    currency?: StringFilter<"PaymentLink"> | string
    country?: StringFilter<"PaymentLink"> | string
    actorId?: StringFilter<"PaymentLink"> | string
    destinationAccountRef?: StringFilter<"PaymentLink"> | string
    status?: EnumPaymentLinkStatusFilter<"PaymentLink"> | $Enums.PaymentLinkStatus
    successRedirectUrl?: StringNullableFilter<"PaymentLink"> | string | null
    metadata?: JsonNullableFilter<"PaymentLink">
    createdAt?: DateTimeFilter<"PaymentLink"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentLink"> | Date | string
    checkoutSessions?: CheckoutSessionListRelationFilter
  }, "id" | "slug">

  export type PaymentLinkOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    country?: SortOrder
    actorId?: SortOrder
    destinationAccountRef?: SortOrder
    status?: SortOrder
    successRedirectUrl?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentLinkCountOrderByAggregateInput
    _avg?: PaymentLinkAvgOrderByAggregateInput
    _max?: PaymentLinkMaxOrderByAggregateInput
    _min?: PaymentLinkMinOrderByAggregateInput
    _sum?: PaymentLinkSumOrderByAggregateInput
  }

  export type PaymentLinkScalarWhereWithAggregatesInput = {
    AND?: PaymentLinkScalarWhereWithAggregatesInput | PaymentLinkScalarWhereWithAggregatesInput[]
    OR?: PaymentLinkScalarWhereWithAggregatesInput[]
    NOT?: PaymentLinkScalarWhereWithAggregatesInput | PaymentLinkScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PaymentLink"> | string
    orgId?: StringWithAggregatesFilter<"PaymentLink"> | string
    slug?: StringWithAggregatesFilter<"PaymentLink"> | string
    title?: StringWithAggregatesFilter<"PaymentLink"> | string
    description?: StringNullableWithAggregatesFilter<"PaymentLink"> | string | null
    amountMinor?: BigIntWithAggregatesFilter<"PaymentLink"> | bigint | number
    currency?: StringWithAggregatesFilter<"PaymentLink"> | string
    country?: StringWithAggregatesFilter<"PaymentLink"> | string
    actorId?: StringWithAggregatesFilter<"PaymentLink"> | string
    destinationAccountRef?: StringWithAggregatesFilter<"PaymentLink"> | string
    status?: EnumPaymentLinkStatusWithAggregatesFilter<"PaymentLink"> | $Enums.PaymentLinkStatus
    successRedirectUrl?: StringNullableWithAggregatesFilter<"PaymentLink"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"PaymentLink">
    createdAt?: DateTimeWithAggregatesFilter<"PaymentLink"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PaymentLink"> | Date | string
  }

  export type CheckoutSessionWhereInput = {
    AND?: CheckoutSessionWhereInput | CheckoutSessionWhereInput[]
    OR?: CheckoutSessionWhereInput[]
    NOT?: CheckoutSessionWhereInput | CheckoutSessionWhereInput[]
    id?: UuidFilter<"CheckoutSession"> | string
    orgId?: StringFilter<"CheckoutSession"> | string
    paymentLinkId?: UuidNullableFilter<"CheckoutSession"> | string | null
    idempotencyKey?: StringFilter<"CheckoutSession"> | string
    status?: EnumCheckoutSessionStatusFilter<"CheckoutSession"> | $Enums.CheckoutSessionStatus
    amountMinor?: BigIntFilter<"CheckoutSession"> | bigint | number
    currency?: StringFilter<"CheckoutSession"> | string
    country?: StringFilter<"CheckoutSession"> | string
    destinationAccountRef?: StringFilter<"CheckoutSession"> | string
    actorId?: StringFilter<"CheckoutSession"> | string
    customerName?: StringFilter<"CheckoutSession"> | string
    customerEmail?: StringNullableFilter<"CheckoutSession"> | string | null
    intentId?: StringNullableFilter<"CheckoutSession"> | string | null
    executionTransactionId?: StringNullableFilter<"CheckoutSession"> | string | null
    instruction?: JsonNullableFilter<"CheckoutSession">
    expiresAt?: DateTimeNullableFilter<"CheckoutSession"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CheckoutSession"> | Date | string | null
    failureReason?: StringNullableFilter<"CheckoutSession"> | string | null
    metadata?: JsonNullableFilter<"CheckoutSession">
    createdAt?: DateTimeFilter<"CheckoutSession"> | Date | string
    updatedAt?: DateTimeFilter<"CheckoutSession"> | Date | string
    paymentLink?: XOR<PaymentLinkNullableRelationFilter, PaymentLinkWhereInput> | null
  }

  export type CheckoutSessionOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    paymentLinkId?: SortOrderInput | SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    country?: SortOrder
    destinationAccountRef?: SortOrder
    actorId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrderInput | SortOrder
    intentId?: SortOrderInput | SortOrder
    executionTransactionId?: SortOrderInput | SortOrder
    instruction?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    failureReason?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paymentLink?: PaymentLinkOrderByWithRelationInput
  }

  export type CheckoutSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idempotencyKey?: string
    AND?: CheckoutSessionWhereInput | CheckoutSessionWhereInput[]
    OR?: CheckoutSessionWhereInput[]
    NOT?: CheckoutSessionWhereInput | CheckoutSessionWhereInput[]
    orgId?: StringFilter<"CheckoutSession"> | string
    paymentLinkId?: UuidNullableFilter<"CheckoutSession"> | string | null
    status?: EnumCheckoutSessionStatusFilter<"CheckoutSession"> | $Enums.CheckoutSessionStatus
    amountMinor?: BigIntFilter<"CheckoutSession"> | bigint | number
    currency?: StringFilter<"CheckoutSession"> | string
    country?: StringFilter<"CheckoutSession"> | string
    destinationAccountRef?: StringFilter<"CheckoutSession"> | string
    actorId?: StringFilter<"CheckoutSession"> | string
    customerName?: StringFilter<"CheckoutSession"> | string
    customerEmail?: StringNullableFilter<"CheckoutSession"> | string | null
    intentId?: StringNullableFilter<"CheckoutSession"> | string | null
    executionTransactionId?: StringNullableFilter<"CheckoutSession"> | string | null
    instruction?: JsonNullableFilter<"CheckoutSession">
    expiresAt?: DateTimeNullableFilter<"CheckoutSession"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CheckoutSession"> | Date | string | null
    failureReason?: StringNullableFilter<"CheckoutSession"> | string | null
    metadata?: JsonNullableFilter<"CheckoutSession">
    createdAt?: DateTimeFilter<"CheckoutSession"> | Date | string
    updatedAt?: DateTimeFilter<"CheckoutSession"> | Date | string
    paymentLink?: XOR<PaymentLinkNullableRelationFilter, PaymentLinkWhereInput> | null
  }, "id" | "idempotencyKey">

  export type CheckoutSessionOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    paymentLinkId?: SortOrderInput | SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    country?: SortOrder
    destinationAccountRef?: SortOrder
    actorId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrderInput | SortOrder
    intentId?: SortOrderInput | SortOrder
    executionTransactionId?: SortOrderInput | SortOrder
    instruction?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    failureReason?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CheckoutSessionCountOrderByAggregateInput
    _avg?: CheckoutSessionAvgOrderByAggregateInput
    _max?: CheckoutSessionMaxOrderByAggregateInput
    _min?: CheckoutSessionMinOrderByAggregateInput
    _sum?: CheckoutSessionSumOrderByAggregateInput
  }

  export type CheckoutSessionScalarWhereWithAggregatesInput = {
    AND?: CheckoutSessionScalarWhereWithAggregatesInput | CheckoutSessionScalarWhereWithAggregatesInput[]
    OR?: CheckoutSessionScalarWhereWithAggregatesInput[]
    NOT?: CheckoutSessionScalarWhereWithAggregatesInput | CheckoutSessionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CheckoutSession"> | string
    orgId?: StringWithAggregatesFilter<"CheckoutSession"> | string
    paymentLinkId?: UuidNullableWithAggregatesFilter<"CheckoutSession"> | string | null
    idempotencyKey?: StringWithAggregatesFilter<"CheckoutSession"> | string
    status?: EnumCheckoutSessionStatusWithAggregatesFilter<"CheckoutSession"> | $Enums.CheckoutSessionStatus
    amountMinor?: BigIntWithAggregatesFilter<"CheckoutSession"> | bigint | number
    currency?: StringWithAggregatesFilter<"CheckoutSession"> | string
    country?: StringWithAggregatesFilter<"CheckoutSession"> | string
    destinationAccountRef?: StringWithAggregatesFilter<"CheckoutSession"> | string
    actorId?: StringWithAggregatesFilter<"CheckoutSession"> | string
    customerName?: StringWithAggregatesFilter<"CheckoutSession"> | string
    customerEmail?: StringNullableWithAggregatesFilter<"CheckoutSession"> | string | null
    intentId?: StringNullableWithAggregatesFilter<"CheckoutSession"> | string | null
    executionTransactionId?: StringNullableWithAggregatesFilter<"CheckoutSession"> | string | null
    instruction?: JsonNullableWithAggregatesFilter<"CheckoutSession">
    expiresAt?: DateTimeNullableWithAggregatesFilter<"CheckoutSession"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"CheckoutSession"> | Date | string | null
    failureReason?: StringNullableWithAggregatesFilter<"CheckoutSession"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"CheckoutSession">
    createdAt?: DateTimeWithAggregatesFilter<"CheckoutSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CheckoutSession"> | Date | string
  }

  export type SettlementReportWhereInput = {
    AND?: SettlementReportWhereInput | SettlementReportWhereInput[]
    OR?: SettlementReportWhereInput[]
    NOT?: SettlementReportWhereInput | SettlementReportWhereInput[]
    id?: UuidFilter<"SettlementReport"> | string
    orgId?: StringFilter<"SettlementReport"> | string
    periodStart?: DateTimeFilter<"SettlementReport"> | Date | string
    periodEnd?: DateTimeFilter<"SettlementReport"> | Date | string
    currency?: StringNullableFilter<"SettlementReport"> | string | null
    status?: EnumSettlementReportStatusFilter<"SettlementReport"> | $Enums.SettlementReportStatus
    totalSettledMinor?: BigIntNullableFilter<"SettlementReport"> | bigint | number | null
    transactionCount?: IntNullableFilter<"SettlementReport"> | number | null
    lines?: JsonNullableFilter<"SettlementReport">
    error?: StringNullableFilter<"SettlementReport"> | string | null
    generatedAt?: DateTimeNullableFilter<"SettlementReport"> | Date | string | null
    createdAt?: DateTimeFilter<"SettlementReport"> | Date | string
  }

  export type SettlementReportOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    currency?: SortOrderInput | SortOrder
    status?: SortOrder
    totalSettledMinor?: SortOrderInput | SortOrder
    transactionCount?: SortOrderInput | SortOrder
    lines?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    generatedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type SettlementReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SettlementReportWhereInput | SettlementReportWhereInput[]
    OR?: SettlementReportWhereInput[]
    NOT?: SettlementReportWhereInput | SettlementReportWhereInput[]
    orgId?: StringFilter<"SettlementReport"> | string
    periodStart?: DateTimeFilter<"SettlementReport"> | Date | string
    periodEnd?: DateTimeFilter<"SettlementReport"> | Date | string
    currency?: StringNullableFilter<"SettlementReport"> | string | null
    status?: EnumSettlementReportStatusFilter<"SettlementReport"> | $Enums.SettlementReportStatus
    totalSettledMinor?: BigIntNullableFilter<"SettlementReport"> | bigint | number | null
    transactionCount?: IntNullableFilter<"SettlementReport"> | number | null
    lines?: JsonNullableFilter<"SettlementReport">
    error?: StringNullableFilter<"SettlementReport"> | string | null
    generatedAt?: DateTimeNullableFilter<"SettlementReport"> | Date | string | null
    createdAt?: DateTimeFilter<"SettlementReport"> | Date | string
  }, "id">

  export type SettlementReportOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    currency?: SortOrderInput | SortOrder
    status?: SortOrder
    totalSettledMinor?: SortOrderInput | SortOrder
    transactionCount?: SortOrderInput | SortOrder
    lines?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    generatedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SettlementReportCountOrderByAggregateInput
    _avg?: SettlementReportAvgOrderByAggregateInput
    _max?: SettlementReportMaxOrderByAggregateInput
    _min?: SettlementReportMinOrderByAggregateInput
    _sum?: SettlementReportSumOrderByAggregateInput
  }

  export type SettlementReportScalarWhereWithAggregatesInput = {
    AND?: SettlementReportScalarWhereWithAggregatesInput | SettlementReportScalarWhereWithAggregatesInput[]
    OR?: SettlementReportScalarWhereWithAggregatesInput[]
    NOT?: SettlementReportScalarWhereWithAggregatesInput | SettlementReportScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"SettlementReport"> | string
    orgId?: StringWithAggregatesFilter<"SettlementReport"> | string
    periodStart?: DateTimeWithAggregatesFilter<"SettlementReport"> | Date | string
    periodEnd?: DateTimeWithAggregatesFilter<"SettlementReport"> | Date | string
    currency?: StringNullableWithAggregatesFilter<"SettlementReport"> | string | null
    status?: EnumSettlementReportStatusWithAggregatesFilter<"SettlementReport"> | $Enums.SettlementReportStatus
    totalSettledMinor?: BigIntNullableWithAggregatesFilter<"SettlementReport"> | bigint | number | null
    transactionCount?: IntNullableWithAggregatesFilter<"SettlementReport"> | number | null
    lines?: JsonNullableWithAggregatesFilter<"SettlementReport">
    error?: StringNullableWithAggregatesFilter<"SettlementReport"> | string | null
    generatedAt?: DateTimeNullableWithAggregatesFilter<"SettlementReport"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SettlementReport"> | Date | string
  }

  export type PaymentLinkCreateInput = {
    id?: string
    orgId: string
    slug: string
    title: string
    description?: string | null
    amountMinor: bigint | number
    currency: string
    country: string
    actorId: string
    destinationAccountRef: string
    status?: $Enums.PaymentLinkStatus
    successRedirectUrl?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    checkoutSessions?: CheckoutSessionCreateNestedManyWithoutPaymentLinkInput
  }

  export type PaymentLinkUncheckedCreateInput = {
    id?: string
    orgId: string
    slug: string
    title: string
    description?: string | null
    amountMinor: bigint | number
    currency: string
    country: string
    actorId: string
    destinationAccountRef: string
    status?: $Enums.PaymentLinkStatus
    successRedirectUrl?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    checkoutSessions?: CheckoutSessionUncheckedCreateNestedManyWithoutPaymentLinkInput
  }

  export type PaymentLinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    destinationAccountRef?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentLinkStatusFieldUpdateOperationsInput | $Enums.PaymentLinkStatus
    successRedirectUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkoutSessions?: CheckoutSessionUpdateManyWithoutPaymentLinkNestedInput
  }

  export type PaymentLinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    destinationAccountRef?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentLinkStatusFieldUpdateOperationsInput | $Enums.PaymentLinkStatus
    successRedirectUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checkoutSessions?: CheckoutSessionUncheckedUpdateManyWithoutPaymentLinkNestedInput
  }

  export type PaymentLinkCreateManyInput = {
    id?: string
    orgId: string
    slug: string
    title: string
    description?: string | null
    amountMinor: bigint | number
    currency: string
    country: string
    actorId: string
    destinationAccountRef: string
    status?: $Enums.PaymentLinkStatus
    successRedirectUrl?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentLinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    destinationAccountRef?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentLinkStatusFieldUpdateOperationsInput | $Enums.PaymentLinkStatus
    successRedirectUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentLinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    destinationAccountRef?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentLinkStatusFieldUpdateOperationsInput | $Enums.PaymentLinkStatus
    successRedirectUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutSessionCreateInput = {
    id?: string
    orgId: string
    idempotencyKey: string
    status?: $Enums.CheckoutSessionStatus
    amountMinor: bigint | number
    currency: string
    country: string
    destinationAccountRef: string
    actorId: string
    customerName: string
    customerEmail?: string | null
    intentId?: string | null
    executionTransactionId?: string | null
    instruction?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: Date | string | null
    completedAt?: Date | string | null
    failureReason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentLink?: PaymentLinkCreateNestedOneWithoutCheckoutSessionsInput
  }

  export type CheckoutSessionUncheckedCreateInput = {
    id?: string
    orgId: string
    paymentLinkId?: string | null
    idempotencyKey: string
    status?: $Enums.CheckoutSessionStatus
    amountMinor: bigint | number
    currency: string
    country: string
    destinationAccountRef: string
    actorId: string
    customerName: string
    customerEmail?: string | null
    intentId?: string | null
    executionTransactionId?: string | null
    instruction?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: Date | string | null
    completedAt?: Date | string | null
    failureReason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CheckoutSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumCheckoutSessionStatusFieldUpdateOperationsInput | $Enums.CheckoutSessionStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    destinationAccountRef?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    instruction?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentLink?: PaymentLinkUpdateOneWithoutCheckoutSessionsNestedInput
  }

  export type CheckoutSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    paymentLinkId?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumCheckoutSessionStatusFieldUpdateOperationsInput | $Enums.CheckoutSessionStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    destinationAccountRef?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    instruction?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutSessionCreateManyInput = {
    id?: string
    orgId: string
    paymentLinkId?: string | null
    idempotencyKey: string
    status?: $Enums.CheckoutSessionStatus
    amountMinor: bigint | number
    currency: string
    country: string
    destinationAccountRef: string
    actorId: string
    customerName: string
    customerEmail?: string | null
    intentId?: string | null
    executionTransactionId?: string | null
    instruction?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: Date | string | null
    completedAt?: Date | string | null
    failureReason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CheckoutSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumCheckoutSessionStatusFieldUpdateOperationsInput | $Enums.CheckoutSessionStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    destinationAccountRef?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    instruction?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    paymentLinkId?: NullableStringFieldUpdateOperationsInput | string | null
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumCheckoutSessionStatusFieldUpdateOperationsInput | $Enums.CheckoutSessionStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    destinationAccountRef?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    instruction?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettlementReportCreateInput = {
    id?: string
    orgId: string
    periodStart: Date | string
    periodEnd: Date | string
    currency?: string | null
    status?: $Enums.SettlementReportStatus
    totalSettledMinor?: bigint | number | null
    transactionCount?: number | null
    lines?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    generatedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SettlementReportUncheckedCreateInput = {
    id?: string
    orgId: string
    periodStart: Date | string
    periodEnd: Date | string
    currency?: string | null
    status?: $Enums.SettlementReportStatus
    totalSettledMinor?: bigint | number | null
    transactionCount?: number | null
    lines?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    generatedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SettlementReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSettlementReportStatusFieldUpdateOperationsInput | $Enums.SettlementReportStatus
    totalSettledMinor?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    transactionCount?: NullableIntFieldUpdateOperationsInput | number | null
    lines?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettlementReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSettlementReportStatusFieldUpdateOperationsInput | $Enums.SettlementReportStatus
    totalSettledMinor?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    transactionCount?: NullableIntFieldUpdateOperationsInput | number | null
    lines?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettlementReportCreateManyInput = {
    id?: string
    orgId: string
    periodStart: Date | string
    periodEnd: Date | string
    currency?: string | null
    status?: $Enums.SettlementReportStatus
    totalSettledMinor?: bigint | number | null
    transactionCount?: number | null
    lines?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    generatedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type SettlementReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSettlementReportStatusFieldUpdateOperationsInput | $Enums.SettlementReportStatus
    totalSettledMinor?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    transactionCount?: NullableIntFieldUpdateOperationsInput | number | null
    lines?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettlementReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    periodStart?: DateTimeFieldUpdateOperationsInput | Date | string
    periodEnd?: DateTimeFieldUpdateOperationsInput | Date | string
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumSettlementReportStatusFieldUpdateOperationsInput | $Enums.SettlementReportStatus
    totalSettledMinor?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    transactionCount?: NullableIntFieldUpdateOperationsInput | number | null
    lines?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    generatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type EnumPaymentLinkStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentLinkStatus | EnumPaymentLinkStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentLinkStatus[] | ListEnumPaymentLinkStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentLinkStatus[] | ListEnumPaymentLinkStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentLinkStatusFilter<$PrismaModel> | $Enums.PaymentLinkStatus
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

  export type CheckoutSessionListRelationFilter = {
    every?: CheckoutSessionWhereInput
    some?: CheckoutSessionWhereInput
    none?: CheckoutSessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CheckoutSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentLinkCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    country?: SortOrder
    actorId?: SortOrder
    destinationAccountRef?: SortOrder
    status?: SortOrder
    successRedirectUrl?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentLinkAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type PaymentLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    country?: SortOrder
    actorId?: SortOrder
    destinationAccountRef?: SortOrder
    status?: SortOrder
    successRedirectUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentLinkMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    country?: SortOrder
    actorId?: SortOrder
    destinationAccountRef?: SortOrder
    status?: SortOrder
    successRedirectUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentLinkSumOrderByAggregateInput = {
    amountMinor?: SortOrder
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

  export type EnumPaymentLinkStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentLinkStatus | EnumPaymentLinkStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentLinkStatus[] | ListEnumPaymentLinkStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentLinkStatus[] | ListEnumPaymentLinkStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentLinkStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentLinkStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentLinkStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentLinkStatusFilter<$PrismaModel>
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

  export type EnumCheckoutSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CheckoutSessionStatus | EnumCheckoutSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CheckoutSessionStatus[] | ListEnumCheckoutSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CheckoutSessionStatus[] | ListEnumCheckoutSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCheckoutSessionStatusFilter<$PrismaModel> | $Enums.CheckoutSessionStatus
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

  export type PaymentLinkNullableRelationFilter = {
    is?: PaymentLinkWhereInput | null
    isNot?: PaymentLinkWhereInput | null
  }

  export type CheckoutSessionCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    paymentLinkId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    country?: SortOrder
    destinationAccountRef?: SortOrder
    actorId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    intentId?: SortOrder
    executionTransactionId?: SortOrder
    instruction?: SortOrder
    expiresAt?: SortOrder
    completedAt?: SortOrder
    failureReason?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CheckoutSessionAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type CheckoutSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    paymentLinkId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    country?: SortOrder
    destinationAccountRef?: SortOrder
    actorId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    intentId?: SortOrder
    executionTransactionId?: SortOrder
    expiresAt?: SortOrder
    completedAt?: SortOrder
    failureReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CheckoutSessionMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    paymentLinkId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    country?: SortOrder
    destinationAccountRef?: SortOrder
    actorId?: SortOrder
    customerName?: SortOrder
    customerEmail?: SortOrder
    intentId?: SortOrder
    executionTransactionId?: SortOrder
    expiresAt?: SortOrder
    completedAt?: SortOrder
    failureReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CheckoutSessionSumOrderByAggregateInput = {
    amountMinor?: SortOrder
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

  export type EnumCheckoutSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CheckoutSessionStatus | EnumCheckoutSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CheckoutSessionStatus[] | ListEnumCheckoutSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CheckoutSessionStatus[] | ListEnumCheckoutSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCheckoutSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.CheckoutSessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCheckoutSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumCheckoutSessionStatusFilter<$PrismaModel>
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

  export type EnumSettlementReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementReportStatus | EnumSettlementReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementReportStatus[] | ListEnumSettlementReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementReportStatus[] | ListEnumSettlementReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementReportStatusFilter<$PrismaModel> | $Enums.SettlementReportStatus
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

  export type SettlementReportCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    totalSettledMinor?: SortOrder
    transactionCount?: SortOrder
    lines?: SortOrder
    error?: SortOrder
    generatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SettlementReportAvgOrderByAggregateInput = {
    totalSettledMinor?: SortOrder
    transactionCount?: SortOrder
  }

  export type SettlementReportMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    totalSettledMinor?: SortOrder
    transactionCount?: SortOrder
    error?: SortOrder
    generatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SettlementReportMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    periodStart?: SortOrder
    periodEnd?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    totalSettledMinor?: SortOrder
    transactionCount?: SortOrder
    error?: SortOrder
    generatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SettlementReportSumOrderByAggregateInput = {
    totalSettledMinor?: SortOrder
    transactionCount?: SortOrder
  }

  export type EnumSettlementReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementReportStatus | EnumSettlementReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementReportStatus[] | ListEnumSettlementReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementReportStatus[] | ListEnumSettlementReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.SettlementReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSettlementReportStatusFilter<$PrismaModel>
    _max?: NestedEnumSettlementReportStatusFilter<$PrismaModel>
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

  export type CheckoutSessionCreateNestedManyWithoutPaymentLinkInput = {
    create?: XOR<CheckoutSessionCreateWithoutPaymentLinkInput, CheckoutSessionUncheckedCreateWithoutPaymentLinkInput> | CheckoutSessionCreateWithoutPaymentLinkInput[] | CheckoutSessionUncheckedCreateWithoutPaymentLinkInput[]
    connectOrCreate?: CheckoutSessionCreateOrConnectWithoutPaymentLinkInput | CheckoutSessionCreateOrConnectWithoutPaymentLinkInput[]
    createMany?: CheckoutSessionCreateManyPaymentLinkInputEnvelope
    connect?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
  }

  export type CheckoutSessionUncheckedCreateNestedManyWithoutPaymentLinkInput = {
    create?: XOR<CheckoutSessionCreateWithoutPaymentLinkInput, CheckoutSessionUncheckedCreateWithoutPaymentLinkInput> | CheckoutSessionCreateWithoutPaymentLinkInput[] | CheckoutSessionUncheckedCreateWithoutPaymentLinkInput[]
    connectOrCreate?: CheckoutSessionCreateOrConnectWithoutPaymentLinkInput | CheckoutSessionCreateOrConnectWithoutPaymentLinkInput[]
    createMany?: CheckoutSessionCreateManyPaymentLinkInputEnvelope
    connect?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
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

  export type EnumPaymentLinkStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentLinkStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CheckoutSessionUpdateManyWithoutPaymentLinkNestedInput = {
    create?: XOR<CheckoutSessionCreateWithoutPaymentLinkInput, CheckoutSessionUncheckedCreateWithoutPaymentLinkInput> | CheckoutSessionCreateWithoutPaymentLinkInput[] | CheckoutSessionUncheckedCreateWithoutPaymentLinkInput[]
    connectOrCreate?: CheckoutSessionCreateOrConnectWithoutPaymentLinkInput | CheckoutSessionCreateOrConnectWithoutPaymentLinkInput[]
    upsert?: CheckoutSessionUpsertWithWhereUniqueWithoutPaymentLinkInput | CheckoutSessionUpsertWithWhereUniqueWithoutPaymentLinkInput[]
    createMany?: CheckoutSessionCreateManyPaymentLinkInputEnvelope
    set?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
    disconnect?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
    delete?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
    connect?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
    update?: CheckoutSessionUpdateWithWhereUniqueWithoutPaymentLinkInput | CheckoutSessionUpdateWithWhereUniqueWithoutPaymentLinkInput[]
    updateMany?: CheckoutSessionUpdateManyWithWhereWithoutPaymentLinkInput | CheckoutSessionUpdateManyWithWhereWithoutPaymentLinkInput[]
    deleteMany?: CheckoutSessionScalarWhereInput | CheckoutSessionScalarWhereInput[]
  }

  export type CheckoutSessionUncheckedUpdateManyWithoutPaymentLinkNestedInput = {
    create?: XOR<CheckoutSessionCreateWithoutPaymentLinkInput, CheckoutSessionUncheckedCreateWithoutPaymentLinkInput> | CheckoutSessionCreateWithoutPaymentLinkInput[] | CheckoutSessionUncheckedCreateWithoutPaymentLinkInput[]
    connectOrCreate?: CheckoutSessionCreateOrConnectWithoutPaymentLinkInput | CheckoutSessionCreateOrConnectWithoutPaymentLinkInput[]
    upsert?: CheckoutSessionUpsertWithWhereUniqueWithoutPaymentLinkInput | CheckoutSessionUpsertWithWhereUniqueWithoutPaymentLinkInput[]
    createMany?: CheckoutSessionCreateManyPaymentLinkInputEnvelope
    set?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
    disconnect?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
    delete?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
    connect?: CheckoutSessionWhereUniqueInput | CheckoutSessionWhereUniqueInput[]
    update?: CheckoutSessionUpdateWithWhereUniqueWithoutPaymentLinkInput | CheckoutSessionUpdateWithWhereUniqueWithoutPaymentLinkInput[]
    updateMany?: CheckoutSessionUpdateManyWithWhereWithoutPaymentLinkInput | CheckoutSessionUpdateManyWithWhereWithoutPaymentLinkInput[]
    deleteMany?: CheckoutSessionScalarWhereInput | CheckoutSessionScalarWhereInput[]
  }

  export type PaymentLinkCreateNestedOneWithoutCheckoutSessionsInput = {
    create?: XOR<PaymentLinkCreateWithoutCheckoutSessionsInput, PaymentLinkUncheckedCreateWithoutCheckoutSessionsInput>
    connectOrCreate?: PaymentLinkCreateOrConnectWithoutCheckoutSessionsInput
    connect?: PaymentLinkWhereUniqueInput
  }

  export type EnumCheckoutSessionStatusFieldUpdateOperationsInput = {
    set?: $Enums.CheckoutSessionStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PaymentLinkUpdateOneWithoutCheckoutSessionsNestedInput = {
    create?: XOR<PaymentLinkCreateWithoutCheckoutSessionsInput, PaymentLinkUncheckedCreateWithoutCheckoutSessionsInput>
    connectOrCreate?: PaymentLinkCreateOrConnectWithoutCheckoutSessionsInput
    upsert?: PaymentLinkUpsertWithoutCheckoutSessionsInput
    disconnect?: PaymentLinkWhereInput | boolean
    delete?: PaymentLinkWhereInput | boolean
    connect?: PaymentLinkWhereUniqueInput
    update?: XOR<XOR<PaymentLinkUpdateToOneWithWhereWithoutCheckoutSessionsInput, PaymentLinkUpdateWithoutCheckoutSessionsInput>, PaymentLinkUncheckedUpdateWithoutCheckoutSessionsInput>
  }

  export type EnumSettlementReportStatusFieldUpdateOperationsInput = {
    set?: $Enums.SettlementReportStatus
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
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

  export type NestedEnumPaymentLinkStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentLinkStatus | EnumPaymentLinkStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentLinkStatus[] | ListEnumPaymentLinkStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentLinkStatus[] | ListEnumPaymentLinkStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentLinkStatusFilter<$PrismaModel> | $Enums.PaymentLinkStatus
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

  export type NestedEnumPaymentLinkStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentLinkStatus | EnumPaymentLinkStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentLinkStatus[] | ListEnumPaymentLinkStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentLinkStatus[] | ListEnumPaymentLinkStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentLinkStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentLinkStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentLinkStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentLinkStatusFilter<$PrismaModel>
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

  export type NestedEnumCheckoutSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CheckoutSessionStatus | EnumCheckoutSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CheckoutSessionStatus[] | ListEnumCheckoutSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CheckoutSessionStatus[] | ListEnumCheckoutSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCheckoutSessionStatusFilter<$PrismaModel> | $Enums.CheckoutSessionStatus
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

  export type NestedEnumCheckoutSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CheckoutSessionStatus | EnumCheckoutSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CheckoutSessionStatus[] | ListEnumCheckoutSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CheckoutSessionStatus[] | ListEnumCheckoutSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCheckoutSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.CheckoutSessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCheckoutSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumCheckoutSessionStatusFilter<$PrismaModel>
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

  export type NestedEnumSettlementReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementReportStatus | EnumSettlementReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementReportStatus[] | ListEnumSettlementReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementReportStatus[] | ListEnumSettlementReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementReportStatusFilter<$PrismaModel> | $Enums.SettlementReportStatus
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

  export type NestedEnumSettlementReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementReportStatus | EnumSettlementReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementReportStatus[] | ListEnumSettlementReportStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementReportStatus[] | ListEnumSettlementReportStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.SettlementReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSettlementReportStatusFilter<$PrismaModel>
    _max?: NestedEnumSettlementReportStatusFilter<$PrismaModel>
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

  export type CheckoutSessionCreateWithoutPaymentLinkInput = {
    id?: string
    orgId: string
    idempotencyKey: string
    status?: $Enums.CheckoutSessionStatus
    amountMinor: bigint | number
    currency: string
    country: string
    destinationAccountRef: string
    actorId: string
    customerName: string
    customerEmail?: string | null
    intentId?: string | null
    executionTransactionId?: string | null
    instruction?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: Date | string | null
    completedAt?: Date | string | null
    failureReason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CheckoutSessionUncheckedCreateWithoutPaymentLinkInput = {
    id?: string
    orgId: string
    idempotencyKey: string
    status?: $Enums.CheckoutSessionStatus
    amountMinor: bigint | number
    currency: string
    country: string
    destinationAccountRef: string
    actorId: string
    customerName: string
    customerEmail?: string | null
    intentId?: string | null
    executionTransactionId?: string | null
    instruction?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: Date | string | null
    completedAt?: Date | string | null
    failureReason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CheckoutSessionCreateOrConnectWithoutPaymentLinkInput = {
    where: CheckoutSessionWhereUniqueInput
    create: XOR<CheckoutSessionCreateWithoutPaymentLinkInput, CheckoutSessionUncheckedCreateWithoutPaymentLinkInput>
  }

  export type CheckoutSessionCreateManyPaymentLinkInputEnvelope = {
    data: CheckoutSessionCreateManyPaymentLinkInput | CheckoutSessionCreateManyPaymentLinkInput[]
    skipDuplicates?: boolean
  }

  export type CheckoutSessionUpsertWithWhereUniqueWithoutPaymentLinkInput = {
    where: CheckoutSessionWhereUniqueInput
    update: XOR<CheckoutSessionUpdateWithoutPaymentLinkInput, CheckoutSessionUncheckedUpdateWithoutPaymentLinkInput>
    create: XOR<CheckoutSessionCreateWithoutPaymentLinkInput, CheckoutSessionUncheckedCreateWithoutPaymentLinkInput>
  }

  export type CheckoutSessionUpdateWithWhereUniqueWithoutPaymentLinkInput = {
    where: CheckoutSessionWhereUniqueInput
    data: XOR<CheckoutSessionUpdateWithoutPaymentLinkInput, CheckoutSessionUncheckedUpdateWithoutPaymentLinkInput>
  }

  export type CheckoutSessionUpdateManyWithWhereWithoutPaymentLinkInput = {
    where: CheckoutSessionScalarWhereInput
    data: XOR<CheckoutSessionUpdateManyMutationInput, CheckoutSessionUncheckedUpdateManyWithoutPaymentLinkInput>
  }

  export type CheckoutSessionScalarWhereInput = {
    AND?: CheckoutSessionScalarWhereInput | CheckoutSessionScalarWhereInput[]
    OR?: CheckoutSessionScalarWhereInput[]
    NOT?: CheckoutSessionScalarWhereInput | CheckoutSessionScalarWhereInput[]
    id?: UuidFilter<"CheckoutSession"> | string
    orgId?: StringFilter<"CheckoutSession"> | string
    paymentLinkId?: UuidNullableFilter<"CheckoutSession"> | string | null
    idempotencyKey?: StringFilter<"CheckoutSession"> | string
    status?: EnumCheckoutSessionStatusFilter<"CheckoutSession"> | $Enums.CheckoutSessionStatus
    amountMinor?: BigIntFilter<"CheckoutSession"> | bigint | number
    currency?: StringFilter<"CheckoutSession"> | string
    country?: StringFilter<"CheckoutSession"> | string
    destinationAccountRef?: StringFilter<"CheckoutSession"> | string
    actorId?: StringFilter<"CheckoutSession"> | string
    customerName?: StringFilter<"CheckoutSession"> | string
    customerEmail?: StringNullableFilter<"CheckoutSession"> | string | null
    intentId?: StringNullableFilter<"CheckoutSession"> | string | null
    executionTransactionId?: StringNullableFilter<"CheckoutSession"> | string | null
    instruction?: JsonNullableFilter<"CheckoutSession">
    expiresAt?: DateTimeNullableFilter<"CheckoutSession"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CheckoutSession"> | Date | string | null
    failureReason?: StringNullableFilter<"CheckoutSession"> | string | null
    metadata?: JsonNullableFilter<"CheckoutSession">
    createdAt?: DateTimeFilter<"CheckoutSession"> | Date | string
    updatedAt?: DateTimeFilter<"CheckoutSession"> | Date | string
  }

  export type PaymentLinkCreateWithoutCheckoutSessionsInput = {
    id?: string
    orgId: string
    slug: string
    title: string
    description?: string | null
    amountMinor: bigint | number
    currency: string
    country: string
    actorId: string
    destinationAccountRef: string
    status?: $Enums.PaymentLinkStatus
    successRedirectUrl?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentLinkUncheckedCreateWithoutCheckoutSessionsInput = {
    id?: string
    orgId: string
    slug: string
    title: string
    description?: string | null
    amountMinor: bigint | number
    currency: string
    country: string
    actorId: string
    destinationAccountRef: string
    status?: $Enums.PaymentLinkStatus
    successRedirectUrl?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentLinkCreateOrConnectWithoutCheckoutSessionsInput = {
    where: PaymentLinkWhereUniqueInput
    create: XOR<PaymentLinkCreateWithoutCheckoutSessionsInput, PaymentLinkUncheckedCreateWithoutCheckoutSessionsInput>
  }

  export type PaymentLinkUpsertWithoutCheckoutSessionsInput = {
    update: XOR<PaymentLinkUpdateWithoutCheckoutSessionsInput, PaymentLinkUncheckedUpdateWithoutCheckoutSessionsInput>
    create: XOR<PaymentLinkCreateWithoutCheckoutSessionsInput, PaymentLinkUncheckedCreateWithoutCheckoutSessionsInput>
    where?: PaymentLinkWhereInput
  }

  export type PaymentLinkUpdateToOneWithWhereWithoutCheckoutSessionsInput = {
    where?: PaymentLinkWhereInput
    data: XOR<PaymentLinkUpdateWithoutCheckoutSessionsInput, PaymentLinkUncheckedUpdateWithoutCheckoutSessionsInput>
  }

  export type PaymentLinkUpdateWithoutCheckoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    destinationAccountRef?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentLinkStatusFieldUpdateOperationsInput | $Enums.PaymentLinkStatus
    successRedirectUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentLinkUncheckedUpdateWithoutCheckoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    destinationAccountRef?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentLinkStatusFieldUpdateOperationsInput | $Enums.PaymentLinkStatus
    successRedirectUrl?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutSessionCreateManyPaymentLinkInput = {
    id?: string
    orgId: string
    idempotencyKey: string
    status?: $Enums.CheckoutSessionStatus
    amountMinor: bigint | number
    currency: string
    country: string
    destinationAccountRef: string
    actorId: string
    customerName: string
    customerEmail?: string | null
    intentId?: string | null
    executionTransactionId?: string | null
    instruction?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: Date | string | null
    completedAt?: Date | string | null
    failureReason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CheckoutSessionUpdateWithoutPaymentLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumCheckoutSessionStatusFieldUpdateOperationsInput | $Enums.CheckoutSessionStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    destinationAccountRef?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    instruction?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutSessionUncheckedUpdateWithoutPaymentLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumCheckoutSessionStatusFieldUpdateOperationsInput | $Enums.CheckoutSessionStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    destinationAccountRef?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    instruction?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CheckoutSessionUncheckedUpdateManyWithoutPaymentLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumCheckoutSessionStatusFieldUpdateOperationsInput | $Enums.CheckoutSessionStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    destinationAccountRef?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    customerName?: StringFieldUpdateOperationsInput | string
    customerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    instruction?: NullableJsonNullValueInput | InputJsonValue
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PaymentLinkCountOutputTypeDefaultArgs instead
     */
    export type PaymentLinkCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaymentLinkCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaymentLinkDefaultArgs instead
     */
    export type PaymentLinkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaymentLinkDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CheckoutSessionDefaultArgs instead
     */
    export type CheckoutSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CheckoutSessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SettlementReportDefaultArgs instead
     */
    export type SettlementReportArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SettlementReportDefaultArgs<ExtArgs>

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