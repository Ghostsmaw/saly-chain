
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
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Shipment
 * 
 */
export type Shipment = $Result.DefaultSelection<Prisma.$ShipmentPayload>
/**
 * Model CustodyEvent
 * 
 */
export type CustodyEvent = $Result.DefaultSelection<Prisma.$CustodyEventPayload>
/**
 * Model TradeDoc
 * 
 */
export type TradeDoc = $Result.DefaultSelection<Prisma.$TradeDocPayload>
/**
 * Model TradeFinance
 * 
 */
export type TradeFinance = $Result.DefaultSelection<Prisma.$TradeFinancePayload>
/**
 * Model ScmSettlement
 * 
 */
export type ScmSettlement = $Result.DefaultSelection<Prisma.$ScmSettlementPayload>

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


export const ShipmentStatus: {
  CREATED: 'CREATED',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',
  SETTLED: 'SETTLED'
};

export type ShipmentStatus = (typeof ShipmentStatus)[keyof typeof ShipmentStatus]


export const SettlementStatus: {
  PENDING: 'PENDING',
  ESCROW_FUNDED: 'ESCROW_FUNDED',
  RELEASED: 'RELEASED',
  CANCELLED: 'CANCELLED'
};

export type SettlementStatus = (typeof SettlementStatus)[keyof typeof SettlementStatus]

}

export type OutboxStatus = $Enums.OutboxStatus

export const OutboxStatus: typeof $Enums.OutboxStatus

export type ShipmentStatus = $Enums.ShipmentStatus

export const ShipmentStatus: typeof $Enums.ShipmentStatus

export type SettlementStatus = $Enums.SettlementStatus

export const SettlementStatus: typeof $Enums.SettlementStatus

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
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.shipment`: Exposes CRUD operations for the **Shipment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shipments
    * const shipments = await prisma.shipment.findMany()
    * ```
    */
  get shipment(): Prisma.ShipmentDelegate<ExtArgs>;

  /**
   * `prisma.custodyEvent`: Exposes CRUD operations for the **CustodyEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustodyEvents
    * const custodyEvents = await prisma.custodyEvent.findMany()
    * ```
    */
  get custodyEvent(): Prisma.CustodyEventDelegate<ExtArgs>;

  /**
   * `prisma.tradeDoc`: Exposes CRUD operations for the **TradeDoc** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TradeDocs
    * const tradeDocs = await prisma.tradeDoc.findMany()
    * ```
    */
  get tradeDoc(): Prisma.TradeDocDelegate<ExtArgs>;

  /**
   * `prisma.tradeFinance`: Exposes CRUD operations for the **TradeFinance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TradeFinances
    * const tradeFinances = await prisma.tradeFinance.findMany()
    * ```
    */
  get tradeFinance(): Prisma.TradeFinanceDelegate<ExtArgs>;

  /**
   * `prisma.scmSettlement`: Exposes CRUD operations for the **ScmSettlement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScmSettlements
    * const scmSettlements = await prisma.scmSettlement.findMany()
    * ```
    */
  get scmSettlement(): Prisma.ScmSettlementDelegate<ExtArgs>;
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
    Product: 'Product',
    Shipment: 'Shipment',
    CustodyEvent: 'CustodyEvent',
    TradeDoc: 'TradeDoc',
    TradeFinance: 'TradeFinance',
    ScmSettlement: 'ScmSettlement'
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
      modelProps: "eventOutbox" | "product" | "shipment" | "custodyEvent" | "tradeDoc" | "tradeFinance" | "scmSettlement"
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
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Shipment: {
        payload: Prisma.$ShipmentPayload<ExtArgs>
        fields: Prisma.ShipmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShipmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShipmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          findFirst: {
            args: Prisma.ShipmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShipmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          findMany: {
            args: Prisma.ShipmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>[]
          }
          create: {
            args: Prisma.ShipmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          createMany: {
            args: Prisma.ShipmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShipmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>[]
          }
          delete: {
            args: Prisma.ShipmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          update: {
            args: Prisma.ShipmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          deleteMany: {
            args: Prisma.ShipmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShipmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ShipmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          aggregate: {
            args: Prisma.ShipmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShipment>
          }
          groupBy: {
            args: Prisma.ShipmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShipmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShipmentCountArgs<ExtArgs>
            result: $Utils.Optional<ShipmentCountAggregateOutputType> | number
          }
        }
      }
      CustodyEvent: {
        payload: Prisma.$CustodyEventPayload<ExtArgs>
        fields: Prisma.CustodyEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustodyEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustodyEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyEventPayload>
          }
          findFirst: {
            args: Prisma.CustodyEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustodyEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyEventPayload>
          }
          findMany: {
            args: Prisma.CustodyEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyEventPayload>[]
          }
          create: {
            args: Prisma.CustodyEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyEventPayload>
          }
          createMany: {
            args: Prisma.CustodyEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustodyEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyEventPayload>[]
          }
          delete: {
            args: Prisma.CustodyEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyEventPayload>
          }
          update: {
            args: Prisma.CustodyEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyEventPayload>
          }
          deleteMany: {
            args: Prisma.CustodyEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustodyEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustodyEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyEventPayload>
          }
          aggregate: {
            args: Prisma.CustodyEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustodyEvent>
          }
          groupBy: {
            args: Prisma.CustodyEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustodyEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustodyEventCountArgs<ExtArgs>
            result: $Utils.Optional<CustodyEventCountAggregateOutputType> | number
          }
        }
      }
      TradeDoc: {
        payload: Prisma.$TradeDocPayload<ExtArgs>
        fields: Prisma.TradeDocFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeDocFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeDocPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeDocFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeDocPayload>
          }
          findFirst: {
            args: Prisma.TradeDocFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeDocPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeDocFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeDocPayload>
          }
          findMany: {
            args: Prisma.TradeDocFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeDocPayload>[]
          }
          create: {
            args: Prisma.TradeDocCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeDocPayload>
          }
          createMany: {
            args: Prisma.TradeDocCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeDocCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeDocPayload>[]
          }
          delete: {
            args: Prisma.TradeDocDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeDocPayload>
          }
          update: {
            args: Prisma.TradeDocUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeDocPayload>
          }
          deleteMany: {
            args: Prisma.TradeDocDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeDocUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TradeDocUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeDocPayload>
          }
          aggregate: {
            args: Prisma.TradeDocAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTradeDoc>
          }
          groupBy: {
            args: Prisma.TradeDocGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeDocGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeDocCountArgs<ExtArgs>
            result: $Utils.Optional<TradeDocCountAggregateOutputType> | number
          }
        }
      }
      TradeFinance: {
        payload: Prisma.$TradeFinancePayload<ExtArgs>
        fields: Prisma.TradeFinanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeFinanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeFinancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeFinanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeFinancePayload>
          }
          findFirst: {
            args: Prisma.TradeFinanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeFinancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeFinanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeFinancePayload>
          }
          findMany: {
            args: Prisma.TradeFinanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeFinancePayload>[]
          }
          create: {
            args: Prisma.TradeFinanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeFinancePayload>
          }
          createMany: {
            args: Prisma.TradeFinanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeFinanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeFinancePayload>[]
          }
          delete: {
            args: Prisma.TradeFinanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeFinancePayload>
          }
          update: {
            args: Prisma.TradeFinanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeFinancePayload>
          }
          deleteMany: {
            args: Prisma.TradeFinanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeFinanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TradeFinanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeFinancePayload>
          }
          aggregate: {
            args: Prisma.TradeFinanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTradeFinance>
          }
          groupBy: {
            args: Prisma.TradeFinanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeFinanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeFinanceCountArgs<ExtArgs>
            result: $Utils.Optional<TradeFinanceCountAggregateOutputType> | number
          }
        }
      }
      ScmSettlement: {
        payload: Prisma.$ScmSettlementPayload<ExtArgs>
        fields: Prisma.ScmSettlementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScmSettlementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScmSettlementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScmSettlementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScmSettlementPayload>
          }
          findFirst: {
            args: Prisma.ScmSettlementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScmSettlementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScmSettlementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScmSettlementPayload>
          }
          findMany: {
            args: Prisma.ScmSettlementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScmSettlementPayload>[]
          }
          create: {
            args: Prisma.ScmSettlementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScmSettlementPayload>
          }
          createMany: {
            args: Prisma.ScmSettlementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScmSettlementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScmSettlementPayload>[]
          }
          delete: {
            args: Prisma.ScmSettlementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScmSettlementPayload>
          }
          update: {
            args: Prisma.ScmSettlementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScmSettlementPayload>
          }
          deleteMany: {
            args: Prisma.ScmSettlementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScmSettlementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ScmSettlementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScmSettlementPayload>
          }
          aggregate: {
            args: Prisma.ScmSettlementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScmSettlement>
          }
          groupBy: {
            args: Prisma.ScmSettlementGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScmSettlementGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScmSettlementCountArgs<ExtArgs>
            result: $Utils.Optional<ScmSettlementCountAggregateOutputType> | number
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
   * Count Type ShipmentCountOutputType
   */

  export type ShipmentCountOutputType = {
    custody: number
    docs: number
  }

  export type ShipmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    custody?: boolean | ShipmentCountOutputTypeCountCustodyArgs
    docs?: boolean | ShipmentCountOutputTypeCountDocsArgs
  }

  // Custom InputTypes
  /**
   * ShipmentCountOutputType without action
   */
  export type ShipmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShipmentCountOutputType
     */
    select?: ShipmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ShipmentCountOutputType without action
   */
  export type ShipmentCountOutputTypeCountCustodyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustodyEventWhereInput
  }

  /**
   * ShipmentCountOutputType without action
   */
  export type ShipmentCountOutputTypeCountDocsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeDocWhereInput
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
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    sku: string | null
    name: string | null
    createdAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    sku: string | null
    name: string | null
    createdAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    orgId: number
    sku: number
    name: number
    createdAt: number
    _all: number
  }


  export type ProductMinAggregateInputType = {
    id?: true
    orgId?: true
    sku?: true
    name?: true
    createdAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    orgId?: true
    sku?: true
    name?: true
    createdAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    orgId?: true
    sku?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    orgId: string
    sku: string
    name: string
    createdAt: Date
    _count: ProductCountAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    sku?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    sku?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    orgId?: boolean
    sku?: boolean
    name?: boolean
    createdAt?: boolean
  }


  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      sku: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
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
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Product model
   */ 
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly orgId: FieldRef<"Product", 'String'>
    readonly sku: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
  }


  /**
   * Model Shipment
   */

  export type AggregateShipment = {
    _count: ShipmentCountAggregateOutputType | null
    _min: ShipmentMinAggregateOutputType | null
    _max: ShipmentMaxAggregateOutputType | null
  }

  export type ShipmentMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    productId: string | null
    origin: string | null
    destination: string | null
    status: $Enums.ShipmentStatus | null
    createdAt: Date | null
  }

  export type ShipmentMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    productId: string | null
    origin: string | null
    destination: string | null
    status: $Enums.ShipmentStatus | null
    createdAt: Date | null
  }

  export type ShipmentCountAggregateOutputType = {
    id: number
    orgId: number
    productId: number
    origin: number
    destination: number
    status: number
    createdAt: number
    _all: number
  }


  export type ShipmentMinAggregateInputType = {
    id?: true
    orgId?: true
    productId?: true
    origin?: true
    destination?: true
    status?: true
    createdAt?: true
  }

  export type ShipmentMaxAggregateInputType = {
    id?: true
    orgId?: true
    productId?: true
    origin?: true
    destination?: true
    status?: true
    createdAt?: true
  }

  export type ShipmentCountAggregateInputType = {
    id?: true
    orgId?: true
    productId?: true
    origin?: true
    destination?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type ShipmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shipment to aggregate.
     */
    where?: ShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Shipments
    **/
    _count?: true | ShipmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShipmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShipmentMaxAggregateInputType
  }

  export type GetShipmentAggregateType<T extends ShipmentAggregateArgs> = {
        [P in keyof T & keyof AggregateShipment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShipment[P]>
      : GetScalarType<T[P], AggregateShipment[P]>
  }




  export type ShipmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShipmentWhereInput
    orderBy?: ShipmentOrderByWithAggregationInput | ShipmentOrderByWithAggregationInput[]
    by: ShipmentScalarFieldEnum[] | ShipmentScalarFieldEnum
    having?: ShipmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShipmentCountAggregateInputType | true
    _min?: ShipmentMinAggregateInputType
    _max?: ShipmentMaxAggregateInputType
  }

  export type ShipmentGroupByOutputType = {
    id: string
    orgId: string
    productId: string | null
    origin: string
    destination: string
    status: $Enums.ShipmentStatus
    createdAt: Date
    _count: ShipmentCountAggregateOutputType | null
    _min: ShipmentMinAggregateOutputType | null
    _max: ShipmentMaxAggregateOutputType | null
  }

  type GetShipmentGroupByPayload<T extends ShipmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShipmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShipmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShipmentGroupByOutputType[P]>
            : GetScalarType<T[P], ShipmentGroupByOutputType[P]>
        }
      >
    >


  export type ShipmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    productId?: boolean
    origin?: boolean
    destination?: boolean
    status?: boolean
    createdAt?: boolean
    custody?: boolean | Shipment$custodyArgs<ExtArgs>
    docs?: boolean | Shipment$docsArgs<ExtArgs>
    _count?: boolean | ShipmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shipment"]>

  export type ShipmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    productId?: boolean
    origin?: boolean
    destination?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["shipment"]>

  export type ShipmentSelectScalar = {
    id?: boolean
    orgId?: boolean
    productId?: boolean
    origin?: boolean
    destination?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type ShipmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    custody?: boolean | Shipment$custodyArgs<ExtArgs>
    docs?: boolean | Shipment$docsArgs<ExtArgs>
    _count?: boolean | ShipmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ShipmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ShipmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Shipment"
    objects: {
      custody: Prisma.$CustodyEventPayload<ExtArgs>[]
      docs: Prisma.$TradeDocPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      productId: string | null
      origin: string
      destination: string
      status: $Enums.ShipmentStatus
      createdAt: Date
    }, ExtArgs["result"]["shipment"]>
    composites: {}
  }

  type ShipmentGetPayload<S extends boolean | null | undefined | ShipmentDefaultArgs> = $Result.GetResult<Prisma.$ShipmentPayload, S>

  type ShipmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ShipmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ShipmentCountAggregateInputType | true
    }

  export interface ShipmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Shipment'], meta: { name: 'Shipment' } }
    /**
     * Find zero or one Shipment that matches the filter.
     * @param {ShipmentFindUniqueArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShipmentFindUniqueArgs>(args: SelectSubset<T, ShipmentFindUniqueArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Shipment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ShipmentFindUniqueOrThrowArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShipmentFindUniqueOrThrowArgs>(args: SelectSubset<T, ShipmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Shipment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentFindFirstArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShipmentFindFirstArgs>(args?: SelectSubset<T, ShipmentFindFirstArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Shipment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentFindFirstOrThrowArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShipmentFindFirstOrThrowArgs>(args?: SelectSubset<T, ShipmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Shipments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shipments
     * const shipments = await prisma.shipment.findMany()
     * 
     * // Get first 10 Shipments
     * const shipments = await prisma.shipment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shipmentWithIdOnly = await prisma.shipment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShipmentFindManyArgs>(args?: SelectSubset<T, ShipmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Shipment.
     * @param {ShipmentCreateArgs} args - Arguments to create a Shipment.
     * @example
     * // Create one Shipment
     * const Shipment = await prisma.shipment.create({
     *   data: {
     *     // ... data to create a Shipment
     *   }
     * })
     * 
     */
    create<T extends ShipmentCreateArgs>(args: SelectSubset<T, ShipmentCreateArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Shipments.
     * @param {ShipmentCreateManyArgs} args - Arguments to create many Shipments.
     * @example
     * // Create many Shipments
     * const shipment = await prisma.shipment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShipmentCreateManyArgs>(args?: SelectSubset<T, ShipmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Shipments and returns the data saved in the database.
     * @param {ShipmentCreateManyAndReturnArgs} args - Arguments to create many Shipments.
     * @example
     * // Create many Shipments
     * const shipment = await prisma.shipment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Shipments and only return the `id`
     * const shipmentWithIdOnly = await prisma.shipment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShipmentCreateManyAndReturnArgs>(args?: SelectSubset<T, ShipmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Shipment.
     * @param {ShipmentDeleteArgs} args - Arguments to delete one Shipment.
     * @example
     * // Delete one Shipment
     * const Shipment = await prisma.shipment.delete({
     *   where: {
     *     // ... filter to delete one Shipment
     *   }
     * })
     * 
     */
    delete<T extends ShipmentDeleteArgs>(args: SelectSubset<T, ShipmentDeleteArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Shipment.
     * @param {ShipmentUpdateArgs} args - Arguments to update one Shipment.
     * @example
     * // Update one Shipment
     * const shipment = await prisma.shipment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShipmentUpdateArgs>(args: SelectSubset<T, ShipmentUpdateArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Shipments.
     * @param {ShipmentDeleteManyArgs} args - Arguments to filter Shipments to delete.
     * @example
     * // Delete a few Shipments
     * const { count } = await prisma.shipment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShipmentDeleteManyArgs>(args?: SelectSubset<T, ShipmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shipments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shipments
     * const shipment = await prisma.shipment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShipmentUpdateManyArgs>(args: SelectSubset<T, ShipmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Shipment.
     * @param {ShipmentUpsertArgs} args - Arguments to update or create a Shipment.
     * @example
     * // Update or create a Shipment
     * const shipment = await prisma.shipment.upsert({
     *   create: {
     *     // ... data to create a Shipment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shipment we want to update
     *   }
     * })
     */
    upsert<T extends ShipmentUpsertArgs>(args: SelectSubset<T, ShipmentUpsertArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Shipments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentCountArgs} args - Arguments to filter Shipments to count.
     * @example
     * // Count the number of Shipments
     * const count = await prisma.shipment.count({
     *   where: {
     *     // ... the filter for the Shipments we want to count
     *   }
     * })
    **/
    count<T extends ShipmentCountArgs>(
      args?: Subset<T, ShipmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShipmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ShipmentAggregateArgs>(args: Subset<T, ShipmentAggregateArgs>): Prisma.PrismaPromise<GetShipmentAggregateType<T>>

    /**
     * Group by Shipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentGroupByArgs} args - Group by arguments.
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
      T extends ShipmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShipmentGroupByArgs['orderBy'] }
        : { orderBy?: ShipmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ShipmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShipmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Shipment model
   */
  readonly fields: ShipmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Shipment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShipmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    custody<T extends Shipment$custodyArgs<ExtArgs> = {}>(args?: Subset<T, Shipment$custodyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustodyEventPayload<ExtArgs>, T, "findMany"> | Null>
    docs<T extends Shipment$docsArgs<ExtArgs> = {}>(args?: Subset<T, Shipment$docsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeDocPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Shipment model
   */ 
  interface ShipmentFieldRefs {
    readonly id: FieldRef<"Shipment", 'String'>
    readonly orgId: FieldRef<"Shipment", 'String'>
    readonly productId: FieldRef<"Shipment", 'String'>
    readonly origin: FieldRef<"Shipment", 'String'>
    readonly destination: FieldRef<"Shipment", 'String'>
    readonly status: FieldRef<"Shipment", 'ShipmentStatus'>
    readonly createdAt: FieldRef<"Shipment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Shipment findUnique
   */
  export type ShipmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * Filter, which Shipment to fetch.
     */
    where: ShipmentWhereUniqueInput
  }

  /**
   * Shipment findUniqueOrThrow
   */
  export type ShipmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * Filter, which Shipment to fetch.
     */
    where: ShipmentWhereUniqueInput
  }

  /**
   * Shipment findFirst
   */
  export type ShipmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * Filter, which Shipment to fetch.
     */
    where?: ShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shipments.
     */
    cursor?: ShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shipments.
     */
    distinct?: ShipmentScalarFieldEnum | ShipmentScalarFieldEnum[]
  }

  /**
   * Shipment findFirstOrThrow
   */
  export type ShipmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * Filter, which Shipment to fetch.
     */
    where?: ShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shipments.
     */
    cursor?: ShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shipments.
     */
    distinct?: ShipmentScalarFieldEnum | ShipmentScalarFieldEnum[]
  }

  /**
   * Shipment findMany
   */
  export type ShipmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * Filter, which Shipments to fetch.
     */
    where?: ShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Shipments.
     */
    cursor?: ShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shipments.
     */
    skip?: number
    distinct?: ShipmentScalarFieldEnum | ShipmentScalarFieldEnum[]
  }

  /**
   * Shipment create
   */
  export type ShipmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Shipment.
     */
    data: XOR<ShipmentCreateInput, ShipmentUncheckedCreateInput>
  }

  /**
   * Shipment createMany
   */
  export type ShipmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Shipments.
     */
    data: ShipmentCreateManyInput | ShipmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shipment createManyAndReturn
   */
  export type ShipmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Shipments.
     */
    data: ShipmentCreateManyInput | ShipmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shipment update
   */
  export type ShipmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Shipment.
     */
    data: XOR<ShipmentUpdateInput, ShipmentUncheckedUpdateInput>
    /**
     * Choose, which Shipment to update.
     */
    where: ShipmentWhereUniqueInput
  }

  /**
   * Shipment updateMany
   */
  export type ShipmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Shipments.
     */
    data: XOR<ShipmentUpdateManyMutationInput, ShipmentUncheckedUpdateManyInput>
    /**
     * Filter which Shipments to update
     */
    where?: ShipmentWhereInput
  }

  /**
   * Shipment upsert
   */
  export type ShipmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Shipment to update in case it exists.
     */
    where: ShipmentWhereUniqueInput
    /**
     * In case the Shipment found by the `where` argument doesn't exist, create a new Shipment with this data.
     */
    create: XOR<ShipmentCreateInput, ShipmentUncheckedCreateInput>
    /**
     * In case the Shipment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShipmentUpdateInput, ShipmentUncheckedUpdateInput>
  }

  /**
   * Shipment delete
   */
  export type ShipmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
    /**
     * Filter which Shipment to delete.
     */
    where: ShipmentWhereUniqueInput
  }

  /**
   * Shipment deleteMany
   */
  export type ShipmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shipments to delete
     */
    where?: ShipmentWhereInput
  }

  /**
   * Shipment.custody
   */
  export type Shipment$custodyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyEvent
     */
    select?: CustodyEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyEventInclude<ExtArgs> | null
    where?: CustodyEventWhereInput
    orderBy?: CustodyEventOrderByWithRelationInput | CustodyEventOrderByWithRelationInput[]
    cursor?: CustodyEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustodyEventScalarFieldEnum | CustodyEventScalarFieldEnum[]
  }

  /**
   * Shipment.docs
   */
  export type Shipment$docsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeDoc
     */
    select?: TradeDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeDocInclude<ExtArgs> | null
    where?: TradeDocWhereInput
    orderBy?: TradeDocOrderByWithRelationInput | TradeDocOrderByWithRelationInput[]
    cursor?: TradeDocWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeDocScalarFieldEnum | TradeDocScalarFieldEnum[]
  }

  /**
   * Shipment without action
   */
  export type ShipmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShipmentInclude<ExtArgs> | null
  }


  /**
   * Model CustodyEvent
   */

  export type AggregateCustodyEvent = {
    _count: CustodyEventCountAggregateOutputType | null
    _min: CustodyEventMinAggregateOutputType | null
    _max: CustodyEventMaxAggregateOutputType | null
  }

  export type CustodyEventMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    shipmentId: string | null
    actorRef: string | null
    attestationId: string | null
    createdAt: Date | null
  }

  export type CustodyEventMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    shipmentId: string | null
    actorRef: string | null
    attestationId: string | null
    createdAt: Date | null
  }

  export type CustodyEventCountAggregateOutputType = {
    id: number
    orgId: number
    shipmentId: number
    actorRef: number
    geo: number
    attestationId: number
    createdAt: number
    _all: number
  }


  export type CustodyEventMinAggregateInputType = {
    id?: true
    orgId?: true
    shipmentId?: true
    actorRef?: true
    attestationId?: true
    createdAt?: true
  }

  export type CustodyEventMaxAggregateInputType = {
    id?: true
    orgId?: true
    shipmentId?: true
    actorRef?: true
    attestationId?: true
    createdAt?: true
  }

  export type CustodyEventCountAggregateInputType = {
    id?: true
    orgId?: true
    shipmentId?: true
    actorRef?: true
    geo?: true
    attestationId?: true
    createdAt?: true
    _all?: true
  }

  export type CustodyEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustodyEvent to aggregate.
     */
    where?: CustodyEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustodyEvents to fetch.
     */
    orderBy?: CustodyEventOrderByWithRelationInput | CustodyEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustodyEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustodyEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustodyEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustodyEvents
    **/
    _count?: true | CustodyEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustodyEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustodyEventMaxAggregateInputType
  }

  export type GetCustodyEventAggregateType<T extends CustodyEventAggregateArgs> = {
        [P in keyof T & keyof AggregateCustodyEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustodyEvent[P]>
      : GetScalarType<T[P], AggregateCustodyEvent[P]>
  }




  export type CustodyEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustodyEventWhereInput
    orderBy?: CustodyEventOrderByWithAggregationInput | CustodyEventOrderByWithAggregationInput[]
    by: CustodyEventScalarFieldEnum[] | CustodyEventScalarFieldEnum
    having?: CustodyEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustodyEventCountAggregateInputType | true
    _min?: CustodyEventMinAggregateInputType
    _max?: CustodyEventMaxAggregateInputType
  }

  export type CustodyEventGroupByOutputType = {
    id: string
    orgId: string
    shipmentId: string
    actorRef: string
    geo: JsonValue | null
    attestationId: string | null
    createdAt: Date
    _count: CustodyEventCountAggregateOutputType | null
    _min: CustodyEventMinAggregateOutputType | null
    _max: CustodyEventMaxAggregateOutputType | null
  }

  type GetCustodyEventGroupByPayload<T extends CustodyEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustodyEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustodyEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustodyEventGroupByOutputType[P]>
            : GetScalarType<T[P], CustodyEventGroupByOutputType[P]>
        }
      >
    >


  export type CustodyEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    shipmentId?: boolean
    actorRef?: boolean
    geo?: boolean
    attestationId?: boolean
    createdAt?: boolean
    shipment?: boolean | ShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["custodyEvent"]>

  export type CustodyEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    shipmentId?: boolean
    actorRef?: boolean
    geo?: boolean
    attestationId?: boolean
    createdAt?: boolean
    shipment?: boolean | ShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["custodyEvent"]>

  export type CustodyEventSelectScalar = {
    id?: boolean
    orgId?: boolean
    shipmentId?: boolean
    actorRef?: boolean
    geo?: boolean
    attestationId?: boolean
    createdAt?: boolean
  }

  export type CustodyEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | ShipmentDefaultArgs<ExtArgs>
  }
  export type CustodyEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | ShipmentDefaultArgs<ExtArgs>
  }

  export type $CustodyEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustodyEvent"
    objects: {
      shipment: Prisma.$ShipmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      shipmentId: string
      actorRef: string
      geo: Prisma.JsonValue | null
      attestationId: string | null
      createdAt: Date
    }, ExtArgs["result"]["custodyEvent"]>
    composites: {}
  }

  type CustodyEventGetPayload<S extends boolean | null | undefined | CustodyEventDefaultArgs> = $Result.GetResult<Prisma.$CustodyEventPayload, S>

  type CustodyEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustodyEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustodyEventCountAggregateInputType | true
    }

  export interface CustodyEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustodyEvent'], meta: { name: 'CustodyEvent' } }
    /**
     * Find zero or one CustodyEvent that matches the filter.
     * @param {CustodyEventFindUniqueArgs} args - Arguments to find a CustodyEvent
     * @example
     * // Get one CustodyEvent
     * const custodyEvent = await prisma.custodyEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustodyEventFindUniqueArgs>(args: SelectSubset<T, CustodyEventFindUniqueArgs<ExtArgs>>): Prisma__CustodyEventClient<$Result.GetResult<Prisma.$CustodyEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CustodyEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustodyEventFindUniqueOrThrowArgs} args - Arguments to find a CustodyEvent
     * @example
     * // Get one CustodyEvent
     * const custodyEvent = await prisma.custodyEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustodyEventFindUniqueOrThrowArgs>(args: SelectSubset<T, CustodyEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustodyEventClient<$Result.GetResult<Prisma.$CustodyEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CustodyEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustodyEventFindFirstArgs} args - Arguments to find a CustodyEvent
     * @example
     * // Get one CustodyEvent
     * const custodyEvent = await prisma.custodyEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustodyEventFindFirstArgs>(args?: SelectSubset<T, CustodyEventFindFirstArgs<ExtArgs>>): Prisma__CustodyEventClient<$Result.GetResult<Prisma.$CustodyEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CustodyEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustodyEventFindFirstOrThrowArgs} args - Arguments to find a CustodyEvent
     * @example
     * // Get one CustodyEvent
     * const custodyEvent = await prisma.custodyEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustodyEventFindFirstOrThrowArgs>(args?: SelectSubset<T, CustodyEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustodyEventClient<$Result.GetResult<Prisma.$CustodyEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CustodyEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustodyEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustodyEvents
     * const custodyEvents = await prisma.custodyEvent.findMany()
     * 
     * // Get first 10 CustodyEvents
     * const custodyEvents = await prisma.custodyEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const custodyEventWithIdOnly = await prisma.custodyEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustodyEventFindManyArgs>(args?: SelectSubset<T, CustodyEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustodyEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CustodyEvent.
     * @param {CustodyEventCreateArgs} args - Arguments to create a CustodyEvent.
     * @example
     * // Create one CustodyEvent
     * const CustodyEvent = await prisma.custodyEvent.create({
     *   data: {
     *     // ... data to create a CustodyEvent
     *   }
     * })
     * 
     */
    create<T extends CustodyEventCreateArgs>(args: SelectSubset<T, CustodyEventCreateArgs<ExtArgs>>): Prisma__CustodyEventClient<$Result.GetResult<Prisma.$CustodyEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CustodyEvents.
     * @param {CustodyEventCreateManyArgs} args - Arguments to create many CustodyEvents.
     * @example
     * // Create many CustodyEvents
     * const custodyEvent = await prisma.custodyEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustodyEventCreateManyArgs>(args?: SelectSubset<T, CustodyEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustodyEvents and returns the data saved in the database.
     * @param {CustodyEventCreateManyAndReturnArgs} args - Arguments to create many CustodyEvents.
     * @example
     * // Create many CustodyEvents
     * const custodyEvent = await prisma.custodyEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustodyEvents and only return the `id`
     * const custodyEventWithIdOnly = await prisma.custodyEvent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustodyEventCreateManyAndReturnArgs>(args?: SelectSubset<T, CustodyEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustodyEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CustodyEvent.
     * @param {CustodyEventDeleteArgs} args - Arguments to delete one CustodyEvent.
     * @example
     * // Delete one CustodyEvent
     * const CustodyEvent = await prisma.custodyEvent.delete({
     *   where: {
     *     // ... filter to delete one CustodyEvent
     *   }
     * })
     * 
     */
    delete<T extends CustodyEventDeleteArgs>(args: SelectSubset<T, CustodyEventDeleteArgs<ExtArgs>>): Prisma__CustodyEventClient<$Result.GetResult<Prisma.$CustodyEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CustodyEvent.
     * @param {CustodyEventUpdateArgs} args - Arguments to update one CustodyEvent.
     * @example
     * // Update one CustodyEvent
     * const custodyEvent = await prisma.custodyEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustodyEventUpdateArgs>(args: SelectSubset<T, CustodyEventUpdateArgs<ExtArgs>>): Prisma__CustodyEventClient<$Result.GetResult<Prisma.$CustodyEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CustodyEvents.
     * @param {CustodyEventDeleteManyArgs} args - Arguments to filter CustodyEvents to delete.
     * @example
     * // Delete a few CustodyEvents
     * const { count } = await prisma.custodyEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustodyEventDeleteManyArgs>(args?: SelectSubset<T, CustodyEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustodyEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustodyEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustodyEvents
     * const custodyEvent = await prisma.custodyEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustodyEventUpdateManyArgs>(args: SelectSubset<T, CustodyEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CustodyEvent.
     * @param {CustodyEventUpsertArgs} args - Arguments to update or create a CustodyEvent.
     * @example
     * // Update or create a CustodyEvent
     * const custodyEvent = await prisma.custodyEvent.upsert({
     *   create: {
     *     // ... data to create a CustodyEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustodyEvent we want to update
     *   }
     * })
     */
    upsert<T extends CustodyEventUpsertArgs>(args: SelectSubset<T, CustodyEventUpsertArgs<ExtArgs>>): Prisma__CustodyEventClient<$Result.GetResult<Prisma.$CustodyEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CustodyEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustodyEventCountArgs} args - Arguments to filter CustodyEvents to count.
     * @example
     * // Count the number of CustodyEvents
     * const count = await prisma.custodyEvent.count({
     *   where: {
     *     // ... the filter for the CustodyEvents we want to count
     *   }
     * })
    **/
    count<T extends CustodyEventCountArgs>(
      args?: Subset<T, CustodyEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustodyEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustodyEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustodyEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustodyEventAggregateArgs>(args: Subset<T, CustodyEventAggregateArgs>): Prisma.PrismaPromise<GetCustodyEventAggregateType<T>>

    /**
     * Group by CustodyEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustodyEventGroupByArgs} args - Group by arguments.
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
      T extends CustodyEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustodyEventGroupByArgs['orderBy'] }
        : { orderBy?: CustodyEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustodyEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustodyEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustodyEvent model
   */
  readonly fields: CustodyEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustodyEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustodyEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shipment<T extends ShipmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShipmentDefaultArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the CustodyEvent model
   */ 
  interface CustodyEventFieldRefs {
    readonly id: FieldRef<"CustodyEvent", 'String'>
    readonly orgId: FieldRef<"CustodyEvent", 'String'>
    readonly shipmentId: FieldRef<"CustodyEvent", 'String'>
    readonly actorRef: FieldRef<"CustodyEvent", 'String'>
    readonly geo: FieldRef<"CustodyEvent", 'Json'>
    readonly attestationId: FieldRef<"CustodyEvent", 'String'>
    readonly createdAt: FieldRef<"CustodyEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustodyEvent findUnique
   */
  export type CustodyEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyEvent
     */
    select?: CustodyEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyEventInclude<ExtArgs> | null
    /**
     * Filter, which CustodyEvent to fetch.
     */
    where: CustodyEventWhereUniqueInput
  }

  /**
   * CustodyEvent findUniqueOrThrow
   */
  export type CustodyEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyEvent
     */
    select?: CustodyEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyEventInclude<ExtArgs> | null
    /**
     * Filter, which CustodyEvent to fetch.
     */
    where: CustodyEventWhereUniqueInput
  }

  /**
   * CustodyEvent findFirst
   */
  export type CustodyEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyEvent
     */
    select?: CustodyEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyEventInclude<ExtArgs> | null
    /**
     * Filter, which CustodyEvent to fetch.
     */
    where?: CustodyEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustodyEvents to fetch.
     */
    orderBy?: CustodyEventOrderByWithRelationInput | CustodyEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustodyEvents.
     */
    cursor?: CustodyEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustodyEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustodyEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustodyEvents.
     */
    distinct?: CustodyEventScalarFieldEnum | CustodyEventScalarFieldEnum[]
  }

  /**
   * CustodyEvent findFirstOrThrow
   */
  export type CustodyEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyEvent
     */
    select?: CustodyEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyEventInclude<ExtArgs> | null
    /**
     * Filter, which CustodyEvent to fetch.
     */
    where?: CustodyEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustodyEvents to fetch.
     */
    orderBy?: CustodyEventOrderByWithRelationInput | CustodyEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustodyEvents.
     */
    cursor?: CustodyEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustodyEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustodyEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustodyEvents.
     */
    distinct?: CustodyEventScalarFieldEnum | CustodyEventScalarFieldEnum[]
  }

  /**
   * CustodyEvent findMany
   */
  export type CustodyEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyEvent
     */
    select?: CustodyEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyEventInclude<ExtArgs> | null
    /**
     * Filter, which CustodyEvents to fetch.
     */
    where?: CustodyEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustodyEvents to fetch.
     */
    orderBy?: CustodyEventOrderByWithRelationInput | CustodyEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustodyEvents.
     */
    cursor?: CustodyEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustodyEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustodyEvents.
     */
    skip?: number
    distinct?: CustodyEventScalarFieldEnum | CustodyEventScalarFieldEnum[]
  }

  /**
   * CustodyEvent create
   */
  export type CustodyEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyEvent
     */
    select?: CustodyEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyEventInclude<ExtArgs> | null
    /**
     * The data needed to create a CustodyEvent.
     */
    data: XOR<CustodyEventCreateInput, CustodyEventUncheckedCreateInput>
  }

  /**
   * CustodyEvent createMany
   */
  export type CustodyEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustodyEvents.
     */
    data: CustodyEventCreateManyInput | CustodyEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustodyEvent createManyAndReturn
   */
  export type CustodyEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyEvent
     */
    select?: CustodyEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CustodyEvents.
     */
    data: CustodyEventCreateManyInput | CustodyEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustodyEvent update
   */
  export type CustodyEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyEvent
     */
    select?: CustodyEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyEventInclude<ExtArgs> | null
    /**
     * The data needed to update a CustodyEvent.
     */
    data: XOR<CustodyEventUpdateInput, CustodyEventUncheckedUpdateInput>
    /**
     * Choose, which CustodyEvent to update.
     */
    where: CustodyEventWhereUniqueInput
  }

  /**
   * CustodyEvent updateMany
   */
  export type CustodyEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustodyEvents.
     */
    data: XOR<CustodyEventUpdateManyMutationInput, CustodyEventUncheckedUpdateManyInput>
    /**
     * Filter which CustodyEvents to update
     */
    where?: CustodyEventWhereInput
  }

  /**
   * CustodyEvent upsert
   */
  export type CustodyEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyEvent
     */
    select?: CustodyEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyEventInclude<ExtArgs> | null
    /**
     * The filter to search for the CustodyEvent to update in case it exists.
     */
    where: CustodyEventWhereUniqueInput
    /**
     * In case the CustodyEvent found by the `where` argument doesn't exist, create a new CustodyEvent with this data.
     */
    create: XOR<CustodyEventCreateInput, CustodyEventUncheckedCreateInput>
    /**
     * In case the CustodyEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustodyEventUpdateInput, CustodyEventUncheckedUpdateInput>
  }

  /**
   * CustodyEvent delete
   */
  export type CustodyEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyEvent
     */
    select?: CustodyEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyEventInclude<ExtArgs> | null
    /**
     * Filter which CustodyEvent to delete.
     */
    where: CustodyEventWhereUniqueInput
  }

  /**
   * CustodyEvent deleteMany
   */
  export type CustodyEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustodyEvents to delete
     */
    where?: CustodyEventWhereInput
  }

  /**
   * CustodyEvent without action
   */
  export type CustodyEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyEvent
     */
    select?: CustodyEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyEventInclude<ExtArgs> | null
  }


  /**
   * Model TradeDoc
   */

  export type AggregateTradeDoc = {
    _count: TradeDocCountAggregateOutputType | null
    _min: TradeDocMinAggregateOutputType | null
    _max: TradeDocMaxAggregateOutputType | null
  }

  export type TradeDocMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    shipmentId: string | null
    docType: string | null
    dataHash: string | null
    createdAt: Date | null
  }

  export type TradeDocMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    shipmentId: string | null
    docType: string | null
    dataHash: string | null
    createdAt: Date | null
  }

  export type TradeDocCountAggregateOutputType = {
    id: number
    orgId: number
    shipmentId: number
    docType: number
    dataHash: number
    createdAt: number
    _all: number
  }


  export type TradeDocMinAggregateInputType = {
    id?: true
    orgId?: true
    shipmentId?: true
    docType?: true
    dataHash?: true
    createdAt?: true
  }

  export type TradeDocMaxAggregateInputType = {
    id?: true
    orgId?: true
    shipmentId?: true
    docType?: true
    dataHash?: true
    createdAt?: true
  }

  export type TradeDocCountAggregateInputType = {
    id?: true
    orgId?: true
    shipmentId?: true
    docType?: true
    dataHash?: true
    createdAt?: true
    _all?: true
  }

  export type TradeDocAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradeDoc to aggregate.
     */
    where?: TradeDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeDocs to fetch.
     */
    orderBy?: TradeDocOrderByWithRelationInput | TradeDocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeDocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeDocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TradeDocs
    **/
    _count?: true | TradeDocCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeDocMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeDocMaxAggregateInputType
  }

  export type GetTradeDocAggregateType<T extends TradeDocAggregateArgs> = {
        [P in keyof T & keyof AggregateTradeDoc]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTradeDoc[P]>
      : GetScalarType<T[P], AggregateTradeDoc[P]>
  }




  export type TradeDocGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeDocWhereInput
    orderBy?: TradeDocOrderByWithAggregationInput | TradeDocOrderByWithAggregationInput[]
    by: TradeDocScalarFieldEnum[] | TradeDocScalarFieldEnum
    having?: TradeDocScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeDocCountAggregateInputType | true
    _min?: TradeDocMinAggregateInputType
    _max?: TradeDocMaxAggregateInputType
  }

  export type TradeDocGroupByOutputType = {
    id: string
    orgId: string
    shipmentId: string
    docType: string
    dataHash: string
    createdAt: Date
    _count: TradeDocCountAggregateOutputType | null
    _min: TradeDocMinAggregateOutputType | null
    _max: TradeDocMaxAggregateOutputType | null
  }

  type GetTradeDocGroupByPayload<T extends TradeDocGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeDocGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeDocGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeDocGroupByOutputType[P]>
            : GetScalarType<T[P], TradeDocGroupByOutputType[P]>
        }
      >
    >


  export type TradeDocSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    shipmentId?: boolean
    docType?: boolean
    dataHash?: boolean
    createdAt?: boolean
    shipment?: boolean | ShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradeDoc"]>

  export type TradeDocSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    shipmentId?: boolean
    docType?: boolean
    dataHash?: boolean
    createdAt?: boolean
    shipment?: boolean | ShipmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradeDoc"]>

  export type TradeDocSelectScalar = {
    id?: boolean
    orgId?: boolean
    shipmentId?: boolean
    docType?: boolean
    dataHash?: boolean
    createdAt?: boolean
  }

  export type TradeDocInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | ShipmentDefaultArgs<ExtArgs>
  }
  export type TradeDocIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shipment?: boolean | ShipmentDefaultArgs<ExtArgs>
  }

  export type $TradeDocPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TradeDoc"
    objects: {
      shipment: Prisma.$ShipmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      shipmentId: string
      docType: string
      dataHash: string
      createdAt: Date
    }, ExtArgs["result"]["tradeDoc"]>
    composites: {}
  }

  type TradeDocGetPayload<S extends boolean | null | undefined | TradeDocDefaultArgs> = $Result.GetResult<Prisma.$TradeDocPayload, S>

  type TradeDocCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TradeDocFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TradeDocCountAggregateInputType | true
    }

  export interface TradeDocDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TradeDoc'], meta: { name: 'TradeDoc' } }
    /**
     * Find zero or one TradeDoc that matches the filter.
     * @param {TradeDocFindUniqueArgs} args - Arguments to find a TradeDoc
     * @example
     * // Get one TradeDoc
     * const tradeDoc = await prisma.tradeDoc.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeDocFindUniqueArgs>(args: SelectSubset<T, TradeDocFindUniqueArgs<ExtArgs>>): Prisma__TradeDocClient<$Result.GetResult<Prisma.$TradeDocPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TradeDoc that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TradeDocFindUniqueOrThrowArgs} args - Arguments to find a TradeDoc
     * @example
     * // Get one TradeDoc
     * const tradeDoc = await prisma.tradeDoc.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeDocFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeDocFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeDocClient<$Result.GetResult<Prisma.$TradeDocPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TradeDoc that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeDocFindFirstArgs} args - Arguments to find a TradeDoc
     * @example
     * // Get one TradeDoc
     * const tradeDoc = await prisma.tradeDoc.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeDocFindFirstArgs>(args?: SelectSubset<T, TradeDocFindFirstArgs<ExtArgs>>): Prisma__TradeDocClient<$Result.GetResult<Prisma.$TradeDocPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TradeDoc that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeDocFindFirstOrThrowArgs} args - Arguments to find a TradeDoc
     * @example
     * // Get one TradeDoc
     * const tradeDoc = await prisma.tradeDoc.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeDocFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeDocFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeDocClient<$Result.GetResult<Prisma.$TradeDocPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TradeDocs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeDocFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TradeDocs
     * const tradeDocs = await prisma.tradeDoc.findMany()
     * 
     * // Get first 10 TradeDocs
     * const tradeDocs = await prisma.tradeDoc.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeDocWithIdOnly = await prisma.tradeDoc.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeDocFindManyArgs>(args?: SelectSubset<T, TradeDocFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeDocPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TradeDoc.
     * @param {TradeDocCreateArgs} args - Arguments to create a TradeDoc.
     * @example
     * // Create one TradeDoc
     * const TradeDoc = await prisma.tradeDoc.create({
     *   data: {
     *     // ... data to create a TradeDoc
     *   }
     * })
     * 
     */
    create<T extends TradeDocCreateArgs>(args: SelectSubset<T, TradeDocCreateArgs<ExtArgs>>): Prisma__TradeDocClient<$Result.GetResult<Prisma.$TradeDocPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TradeDocs.
     * @param {TradeDocCreateManyArgs} args - Arguments to create many TradeDocs.
     * @example
     * // Create many TradeDocs
     * const tradeDoc = await prisma.tradeDoc.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeDocCreateManyArgs>(args?: SelectSubset<T, TradeDocCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TradeDocs and returns the data saved in the database.
     * @param {TradeDocCreateManyAndReturnArgs} args - Arguments to create many TradeDocs.
     * @example
     * // Create many TradeDocs
     * const tradeDoc = await prisma.tradeDoc.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TradeDocs and only return the `id`
     * const tradeDocWithIdOnly = await prisma.tradeDoc.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeDocCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeDocCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeDocPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TradeDoc.
     * @param {TradeDocDeleteArgs} args - Arguments to delete one TradeDoc.
     * @example
     * // Delete one TradeDoc
     * const TradeDoc = await prisma.tradeDoc.delete({
     *   where: {
     *     // ... filter to delete one TradeDoc
     *   }
     * })
     * 
     */
    delete<T extends TradeDocDeleteArgs>(args: SelectSubset<T, TradeDocDeleteArgs<ExtArgs>>): Prisma__TradeDocClient<$Result.GetResult<Prisma.$TradeDocPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TradeDoc.
     * @param {TradeDocUpdateArgs} args - Arguments to update one TradeDoc.
     * @example
     * // Update one TradeDoc
     * const tradeDoc = await prisma.tradeDoc.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeDocUpdateArgs>(args: SelectSubset<T, TradeDocUpdateArgs<ExtArgs>>): Prisma__TradeDocClient<$Result.GetResult<Prisma.$TradeDocPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TradeDocs.
     * @param {TradeDocDeleteManyArgs} args - Arguments to filter TradeDocs to delete.
     * @example
     * // Delete a few TradeDocs
     * const { count } = await prisma.tradeDoc.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeDocDeleteManyArgs>(args?: SelectSubset<T, TradeDocDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradeDocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeDocUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TradeDocs
     * const tradeDoc = await prisma.tradeDoc.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeDocUpdateManyArgs>(args: SelectSubset<T, TradeDocUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TradeDoc.
     * @param {TradeDocUpsertArgs} args - Arguments to update or create a TradeDoc.
     * @example
     * // Update or create a TradeDoc
     * const tradeDoc = await prisma.tradeDoc.upsert({
     *   create: {
     *     // ... data to create a TradeDoc
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TradeDoc we want to update
     *   }
     * })
     */
    upsert<T extends TradeDocUpsertArgs>(args: SelectSubset<T, TradeDocUpsertArgs<ExtArgs>>): Prisma__TradeDocClient<$Result.GetResult<Prisma.$TradeDocPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TradeDocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeDocCountArgs} args - Arguments to filter TradeDocs to count.
     * @example
     * // Count the number of TradeDocs
     * const count = await prisma.tradeDoc.count({
     *   where: {
     *     // ... the filter for the TradeDocs we want to count
     *   }
     * })
    **/
    count<T extends TradeDocCountArgs>(
      args?: Subset<T, TradeDocCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeDocCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TradeDoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeDocAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TradeDocAggregateArgs>(args: Subset<T, TradeDocAggregateArgs>): Prisma.PrismaPromise<GetTradeDocAggregateType<T>>

    /**
     * Group by TradeDoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeDocGroupByArgs} args - Group by arguments.
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
      T extends TradeDocGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeDocGroupByArgs['orderBy'] }
        : { orderBy?: TradeDocGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TradeDocGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeDocGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TradeDoc model
   */
  readonly fields: TradeDocFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TradeDoc.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeDocClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shipment<T extends ShipmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShipmentDefaultArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the TradeDoc model
   */ 
  interface TradeDocFieldRefs {
    readonly id: FieldRef<"TradeDoc", 'String'>
    readonly orgId: FieldRef<"TradeDoc", 'String'>
    readonly shipmentId: FieldRef<"TradeDoc", 'String'>
    readonly docType: FieldRef<"TradeDoc", 'String'>
    readonly dataHash: FieldRef<"TradeDoc", 'String'>
    readonly createdAt: FieldRef<"TradeDoc", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TradeDoc findUnique
   */
  export type TradeDocFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeDoc
     */
    select?: TradeDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeDocInclude<ExtArgs> | null
    /**
     * Filter, which TradeDoc to fetch.
     */
    where: TradeDocWhereUniqueInput
  }

  /**
   * TradeDoc findUniqueOrThrow
   */
  export type TradeDocFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeDoc
     */
    select?: TradeDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeDocInclude<ExtArgs> | null
    /**
     * Filter, which TradeDoc to fetch.
     */
    where: TradeDocWhereUniqueInput
  }

  /**
   * TradeDoc findFirst
   */
  export type TradeDocFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeDoc
     */
    select?: TradeDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeDocInclude<ExtArgs> | null
    /**
     * Filter, which TradeDoc to fetch.
     */
    where?: TradeDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeDocs to fetch.
     */
    orderBy?: TradeDocOrderByWithRelationInput | TradeDocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradeDocs.
     */
    cursor?: TradeDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeDocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeDocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradeDocs.
     */
    distinct?: TradeDocScalarFieldEnum | TradeDocScalarFieldEnum[]
  }

  /**
   * TradeDoc findFirstOrThrow
   */
  export type TradeDocFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeDoc
     */
    select?: TradeDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeDocInclude<ExtArgs> | null
    /**
     * Filter, which TradeDoc to fetch.
     */
    where?: TradeDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeDocs to fetch.
     */
    orderBy?: TradeDocOrderByWithRelationInput | TradeDocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradeDocs.
     */
    cursor?: TradeDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeDocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeDocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradeDocs.
     */
    distinct?: TradeDocScalarFieldEnum | TradeDocScalarFieldEnum[]
  }

  /**
   * TradeDoc findMany
   */
  export type TradeDocFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeDoc
     */
    select?: TradeDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeDocInclude<ExtArgs> | null
    /**
     * Filter, which TradeDocs to fetch.
     */
    where?: TradeDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeDocs to fetch.
     */
    orderBy?: TradeDocOrderByWithRelationInput | TradeDocOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TradeDocs.
     */
    cursor?: TradeDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeDocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeDocs.
     */
    skip?: number
    distinct?: TradeDocScalarFieldEnum | TradeDocScalarFieldEnum[]
  }

  /**
   * TradeDoc create
   */
  export type TradeDocCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeDoc
     */
    select?: TradeDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeDocInclude<ExtArgs> | null
    /**
     * The data needed to create a TradeDoc.
     */
    data: XOR<TradeDocCreateInput, TradeDocUncheckedCreateInput>
  }

  /**
   * TradeDoc createMany
   */
  export type TradeDocCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TradeDocs.
     */
    data: TradeDocCreateManyInput | TradeDocCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TradeDoc createManyAndReturn
   */
  export type TradeDocCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeDoc
     */
    select?: TradeDocSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TradeDocs.
     */
    data: TradeDocCreateManyInput | TradeDocCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeDocIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TradeDoc update
   */
  export type TradeDocUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeDoc
     */
    select?: TradeDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeDocInclude<ExtArgs> | null
    /**
     * The data needed to update a TradeDoc.
     */
    data: XOR<TradeDocUpdateInput, TradeDocUncheckedUpdateInput>
    /**
     * Choose, which TradeDoc to update.
     */
    where: TradeDocWhereUniqueInput
  }

  /**
   * TradeDoc updateMany
   */
  export type TradeDocUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TradeDocs.
     */
    data: XOR<TradeDocUpdateManyMutationInput, TradeDocUncheckedUpdateManyInput>
    /**
     * Filter which TradeDocs to update
     */
    where?: TradeDocWhereInput
  }

  /**
   * TradeDoc upsert
   */
  export type TradeDocUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeDoc
     */
    select?: TradeDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeDocInclude<ExtArgs> | null
    /**
     * The filter to search for the TradeDoc to update in case it exists.
     */
    where: TradeDocWhereUniqueInput
    /**
     * In case the TradeDoc found by the `where` argument doesn't exist, create a new TradeDoc with this data.
     */
    create: XOR<TradeDocCreateInput, TradeDocUncheckedCreateInput>
    /**
     * In case the TradeDoc was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeDocUpdateInput, TradeDocUncheckedUpdateInput>
  }

  /**
   * TradeDoc delete
   */
  export type TradeDocDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeDoc
     */
    select?: TradeDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeDocInclude<ExtArgs> | null
    /**
     * Filter which TradeDoc to delete.
     */
    where: TradeDocWhereUniqueInput
  }

  /**
   * TradeDoc deleteMany
   */
  export type TradeDocDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradeDocs to delete
     */
    where?: TradeDocWhereInput
  }

  /**
   * TradeDoc without action
   */
  export type TradeDocDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeDoc
     */
    select?: TradeDocSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeDocInclude<ExtArgs> | null
  }


  /**
   * Model TradeFinance
   */

  export type AggregateTradeFinance = {
    _count: TradeFinanceCountAggregateOutputType | null
    _avg: TradeFinanceAvgAggregateOutputType | null
    _sum: TradeFinanceSumAggregateOutputType | null
    _min: TradeFinanceMinAggregateOutputType | null
    _max: TradeFinanceMaxAggregateOutputType | null
  }

  export type TradeFinanceAvgAggregateOutputType = {
    amountMinor: number | null
  }

  export type TradeFinanceSumAggregateOutputType = {
    amountMinor: bigint | null
  }

  export type TradeFinanceMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    shipmentId: string | null
    financierRef: string | null
    amountMinor: bigint | null
    currency: string | null
    payoutIntentId: string | null
    createdAt: Date | null
  }

  export type TradeFinanceMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    shipmentId: string | null
    financierRef: string | null
    amountMinor: bigint | null
    currency: string | null
    payoutIntentId: string | null
    createdAt: Date | null
  }

  export type TradeFinanceCountAggregateOutputType = {
    id: number
    orgId: number
    shipmentId: number
    financierRef: number
    amountMinor: number
    currency: number
    payoutIntentId: number
    createdAt: number
    _all: number
  }


  export type TradeFinanceAvgAggregateInputType = {
    amountMinor?: true
  }

  export type TradeFinanceSumAggregateInputType = {
    amountMinor?: true
  }

  export type TradeFinanceMinAggregateInputType = {
    id?: true
    orgId?: true
    shipmentId?: true
    financierRef?: true
    amountMinor?: true
    currency?: true
    payoutIntentId?: true
    createdAt?: true
  }

  export type TradeFinanceMaxAggregateInputType = {
    id?: true
    orgId?: true
    shipmentId?: true
    financierRef?: true
    amountMinor?: true
    currency?: true
    payoutIntentId?: true
    createdAt?: true
  }

  export type TradeFinanceCountAggregateInputType = {
    id?: true
    orgId?: true
    shipmentId?: true
    financierRef?: true
    amountMinor?: true
    currency?: true
    payoutIntentId?: true
    createdAt?: true
    _all?: true
  }

  export type TradeFinanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradeFinance to aggregate.
     */
    where?: TradeFinanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeFinances to fetch.
     */
    orderBy?: TradeFinanceOrderByWithRelationInput | TradeFinanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeFinanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeFinances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeFinances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TradeFinances
    **/
    _count?: true | TradeFinanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TradeFinanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TradeFinanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeFinanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeFinanceMaxAggregateInputType
  }

  export type GetTradeFinanceAggregateType<T extends TradeFinanceAggregateArgs> = {
        [P in keyof T & keyof AggregateTradeFinance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTradeFinance[P]>
      : GetScalarType<T[P], AggregateTradeFinance[P]>
  }




  export type TradeFinanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeFinanceWhereInput
    orderBy?: TradeFinanceOrderByWithAggregationInput | TradeFinanceOrderByWithAggregationInput[]
    by: TradeFinanceScalarFieldEnum[] | TradeFinanceScalarFieldEnum
    having?: TradeFinanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeFinanceCountAggregateInputType | true
    _avg?: TradeFinanceAvgAggregateInputType
    _sum?: TradeFinanceSumAggregateInputType
    _min?: TradeFinanceMinAggregateInputType
    _max?: TradeFinanceMaxAggregateInputType
  }

  export type TradeFinanceGroupByOutputType = {
    id: string
    orgId: string
    shipmentId: string
    financierRef: string
    amountMinor: bigint
    currency: string
    payoutIntentId: string | null
    createdAt: Date
    _count: TradeFinanceCountAggregateOutputType | null
    _avg: TradeFinanceAvgAggregateOutputType | null
    _sum: TradeFinanceSumAggregateOutputType | null
    _min: TradeFinanceMinAggregateOutputType | null
    _max: TradeFinanceMaxAggregateOutputType | null
  }

  type GetTradeFinanceGroupByPayload<T extends TradeFinanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeFinanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeFinanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeFinanceGroupByOutputType[P]>
            : GetScalarType<T[P], TradeFinanceGroupByOutputType[P]>
        }
      >
    >


  export type TradeFinanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    shipmentId?: boolean
    financierRef?: boolean
    amountMinor?: boolean
    currency?: boolean
    payoutIntentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tradeFinance"]>

  export type TradeFinanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    shipmentId?: boolean
    financierRef?: boolean
    amountMinor?: boolean
    currency?: boolean
    payoutIntentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tradeFinance"]>

  export type TradeFinanceSelectScalar = {
    id?: boolean
    orgId?: boolean
    shipmentId?: boolean
    financierRef?: boolean
    amountMinor?: boolean
    currency?: boolean
    payoutIntentId?: boolean
    createdAt?: boolean
  }


  export type $TradeFinancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TradeFinance"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      shipmentId: string
      financierRef: string
      amountMinor: bigint
      currency: string
      payoutIntentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["tradeFinance"]>
    composites: {}
  }

  type TradeFinanceGetPayload<S extends boolean | null | undefined | TradeFinanceDefaultArgs> = $Result.GetResult<Prisma.$TradeFinancePayload, S>

  type TradeFinanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TradeFinanceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TradeFinanceCountAggregateInputType | true
    }

  export interface TradeFinanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TradeFinance'], meta: { name: 'TradeFinance' } }
    /**
     * Find zero or one TradeFinance that matches the filter.
     * @param {TradeFinanceFindUniqueArgs} args - Arguments to find a TradeFinance
     * @example
     * // Get one TradeFinance
     * const tradeFinance = await prisma.tradeFinance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeFinanceFindUniqueArgs>(args: SelectSubset<T, TradeFinanceFindUniqueArgs<ExtArgs>>): Prisma__TradeFinanceClient<$Result.GetResult<Prisma.$TradeFinancePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TradeFinance that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TradeFinanceFindUniqueOrThrowArgs} args - Arguments to find a TradeFinance
     * @example
     * // Get one TradeFinance
     * const tradeFinance = await prisma.tradeFinance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeFinanceFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeFinanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeFinanceClient<$Result.GetResult<Prisma.$TradeFinancePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TradeFinance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFinanceFindFirstArgs} args - Arguments to find a TradeFinance
     * @example
     * // Get one TradeFinance
     * const tradeFinance = await prisma.tradeFinance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeFinanceFindFirstArgs>(args?: SelectSubset<T, TradeFinanceFindFirstArgs<ExtArgs>>): Prisma__TradeFinanceClient<$Result.GetResult<Prisma.$TradeFinancePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TradeFinance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFinanceFindFirstOrThrowArgs} args - Arguments to find a TradeFinance
     * @example
     * // Get one TradeFinance
     * const tradeFinance = await prisma.tradeFinance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeFinanceFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeFinanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeFinanceClient<$Result.GetResult<Prisma.$TradeFinancePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TradeFinances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFinanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TradeFinances
     * const tradeFinances = await prisma.tradeFinance.findMany()
     * 
     * // Get first 10 TradeFinances
     * const tradeFinances = await prisma.tradeFinance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeFinanceWithIdOnly = await prisma.tradeFinance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeFinanceFindManyArgs>(args?: SelectSubset<T, TradeFinanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeFinancePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TradeFinance.
     * @param {TradeFinanceCreateArgs} args - Arguments to create a TradeFinance.
     * @example
     * // Create one TradeFinance
     * const TradeFinance = await prisma.tradeFinance.create({
     *   data: {
     *     // ... data to create a TradeFinance
     *   }
     * })
     * 
     */
    create<T extends TradeFinanceCreateArgs>(args: SelectSubset<T, TradeFinanceCreateArgs<ExtArgs>>): Prisma__TradeFinanceClient<$Result.GetResult<Prisma.$TradeFinancePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TradeFinances.
     * @param {TradeFinanceCreateManyArgs} args - Arguments to create many TradeFinances.
     * @example
     * // Create many TradeFinances
     * const tradeFinance = await prisma.tradeFinance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeFinanceCreateManyArgs>(args?: SelectSubset<T, TradeFinanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TradeFinances and returns the data saved in the database.
     * @param {TradeFinanceCreateManyAndReturnArgs} args - Arguments to create many TradeFinances.
     * @example
     * // Create many TradeFinances
     * const tradeFinance = await prisma.tradeFinance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TradeFinances and only return the `id`
     * const tradeFinanceWithIdOnly = await prisma.tradeFinance.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeFinanceCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeFinanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeFinancePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TradeFinance.
     * @param {TradeFinanceDeleteArgs} args - Arguments to delete one TradeFinance.
     * @example
     * // Delete one TradeFinance
     * const TradeFinance = await prisma.tradeFinance.delete({
     *   where: {
     *     // ... filter to delete one TradeFinance
     *   }
     * })
     * 
     */
    delete<T extends TradeFinanceDeleteArgs>(args: SelectSubset<T, TradeFinanceDeleteArgs<ExtArgs>>): Prisma__TradeFinanceClient<$Result.GetResult<Prisma.$TradeFinancePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TradeFinance.
     * @param {TradeFinanceUpdateArgs} args - Arguments to update one TradeFinance.
     * @example
     * // Update one TradeFinance
     * const tradeFinance = await prisma.tradeFinance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeFinanceUpdateArgs>(args: SelectSubset<T, TradeFinanceUpdateArgs<ExtArgs>>): Prisma__TradeFinanceClient<$Result.GetResult<Prisma.$TradeFinancePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TradeFinances.
     * @param {TradeFinanceDeleteManyArgs} args - Arguments to filter TradeFinances to delete.
     * @example
     * // Delete a few TradeFinances
     * const { count } = await prisma.tradeFinance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeFinanceDeleteManyArgs>(args?: SelectSubset<T, TradeFinanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradeFinances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFinanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TradeFinances
     * const tradeFinance = await prisma.tradeFinance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeFinanceUpdateManyArgs>(args: SelectSubset<T, TradeFinanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TradeFinance.
     * @param {TradeFinanceUpsertArgs} args - Arguments to update or create a TradeFinance.
     * @example
     * // Update or create a TradeFinance
     * const tradeFinance = await prisma.tradeFinance.upsert({
     *   create: {
     *     // ... data to create a TradeFinance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TradeFinance we want to update
     *   }
     * })
     */
    upsert<T extends TradeFinanceUpsertArgs>(args: SelectSubset<T, TradeFinanceUpsertArgs<ExtArgs>>): Prisma__TradeFinanceClient<$Result.GetResult<Prisma.$TradeFinancePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TradeFinances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFinanceCountArgs} args - Arguments to filter TradeFinances to count.
     * @example
     * // Count the number of TradeFinances
     * const count = await prisma.tradeFinance.count({
     *   where: {
     *     // ... the filter for the TradeFinances we want to count
     *   }
     * })
    **/
    count<T extends TradeFinanceCountArgs>(
      args?: Subset<T, TradeFinanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeFinanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TradeFinance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFinanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TradeFinanceAggregateArgs>(args: Subset<T, TradeFinanceAggregateArgs>): Prisma.PrismaPromise<GetTradeFinanceAggregateType<T>>

    /**
     * Group by TradeFinance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFinanceGroupByArgs} args - Group by arguments.
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
      T extends TradeFinanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeFinanceGroupByArgs['orderBy'] }
        : { orderBy?: TradeFinanceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TradeFinanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeFinanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TradeFinance model
   */
  readonly fields: TradeFinanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TradeFinance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeFinanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the TradeFinance model
   */ 
  interface TradeFinanceFieldRefs {
    readonly id: FieldRef<"TradeFinance", 'String'>
    readonly orgId: FieldRef<"TradeFinance", 'String'>
    readonly shipmentId: FieldRef<"TradeFinance", 'String'>
    readonly financierRef: FieldRef<"TradeFinance", 'String'>
    readonly amountMinor: FieldRef<"TradeFinance", 'BigInt'>
    readonly currency: FieldRef<"TradeFinance", 'String'>
    readonly payoutIntentId: FieldRef<"TradeFinance", 'String'>
    readonly createdAt: FieldRef<"TradeFinance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TradeFinance findUnique
   */
  export type TradeFinanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeFinance
     */
    select?: TradeFinanceSelect<ExtArgs> | null
    /**
     * Filter, which TradeFinance to fetch.
     */
    where: TradeFinanceWhereUniqueInput
  }

  /**
   * TradeFinance findUniqueOrThrow
   */
  export type TradeFinanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeFinance
     */
    select?: TradeFinanceSelect<ExtArgs> | null
    /**
     * Filter, which TradeFinance to fetch.
     */
    where: TradeFinanceWhereUniqueInput
  }

  /**
   * TradeFinance findFirst
   */
  export type TradeFinanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeFinance
     */
    select?: TradeFinanceSelect<ExtArgs> | null
    /**
     * Filter, which TradeFinance to fetch.
     */
    where?: TradeFinanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeFinances to fetch.
     */
    orderBy?: TradeFinanceOrderByWithRelationInput | TradeFinanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradeFinances.
     */
    cursor?: TradeFinanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeFinances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeFinances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradeFinances.
     */
    distinct?: TradeFinanceScalarFieldEnum | TradeFinanceScalarFieldEnum[]
  }

  /**
   * TradeFinance findFirstOrThrow
   */
  export type TradeFinanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeFinance
     */
    select?: TradeFinanceSelect<ExtArgs> | null
    /**
     * Filter, which TradeFinance to fetch.
     */
    where?: TradeFinanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeFinances to fetch.
     */
    orderBy?: TradeFinanceOrderByWithRelationInput | TradeFinanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradeFinances.
     */
    cursor?: TradeFinanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeFinances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeFinances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradeFinances.
     */
    distinct?: TradeFinanceScalarFieldEnum | TradeFinanceScalarFieldEnum[]
  }

  /**
   * TradeFinance findMany
   */
  export type TradeFinanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeFinance
     */
    select?: TradeFinanceSelect<ExtArgs> | null
    /**
     * Filter, which TradeFinances to fetch.
     */
    where?: TradeFinanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeFinances to fetch.
     */
    orderBy?: TradeFinanceOrderByWithRelationInput | TradeFinanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TradeFinances.
     */
    cursor?: TradeFinanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeFinances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeFinances.
     */
    skip?: number
    distinct?: TradeFinanceScalarFieldEnum | TradeFinanceScalarFieldEnum[]
  }

  /**
   * TradeFinance create
   */
  export type TradeFinanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeFinance
     */
    select?: TradeFinanceSelect<ExtArgs> | null
    /**
     * The data needed to create a TradeFinance.
     */
    data: XOR<TradeFinanceCreateInput, TradeFinanceUncheckedCreateInput>
  }

  /**
   * TradeFinance createMany
   */
  export type TradeFinanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TradeFinances.
     */
    data: TradeFinanceCreateManyInput | TradeFinanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TradeFinance createManyAndReturn
   */
  export type TradeFinanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeFinance
     */
    select?: TradeFinanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TradeFinances.
     */
    data: TradeFinanceCreateManyInput | TradeFinanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TradeFinance update
   */
  export type TradeFinanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeFinance
     */
    select?: TradeFinanceSelect<ExtArgs> | null
    /**
     * The data needed to update a TradeFinance.
     */
    data: XOR<TradeFinanceUpdateInput, TradeFinanceUncheckedUpdateInput>
    /**
     * Choose, which TradeFinance to update.
     */
    where: TradeFinanceWhereUniqueInput
  }

  /**
   * TradeFinance updateMany
   */
  export type TradeFinanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TradeFinances.
     */
    data: XOR<TradeFinanceUpdateManyMutationInput, TradeFinanceUncheckedUpdateManyInput>
    /**
     * Filter which TradeFinances to update
     */
    where?: TradeFinanceWhereInput
  }

  /**
   * TradeFinance upsert
   */
  export type TradeFinanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeFinance
     */
    select?: TradeFinanceSelect<ExtArgs> | null
    /**
     * The filter to search for the TradeFinance to update in case it exists.
     */
    where: TradeFinanceWhereUniqueInput
    /**
     * In case the TradeFinance found by the `where` argument doesn't exist, create a new TradeFinance with this data.
     */
    create: XOR<TradeFinanceCreateInput, TradeFinanceUncheckedCreateInput>
    /**
     * In case the TradeFinance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeFinanceUpdateInput, TradeFinanceUncheckedUpdateInput>
  }

  /**
   * TradeFinance delete
   */
  export type TradeFinanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeFinance
     */
    select?: TradeFinanceSelect<ExtArgs> | null
    /**
     * Filter which TradeFinance to delete.
     */
    where: TradeFinanceWhereUniqueInput
  }

  /**
   * TradeFinance deleteMany
   */
  export type TradeFinanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradeFinances to delete
     */
    where?: TradeFinanceWhereInput
  }

  /**
   * TradeFinance without action
   */
  export type TradeFinanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeFinance
     */
    select?: TradeFinanceSelect<ExtArgs> | null
  }


  /**
   * Model ScmSettlement
   */

  export type AggregateScmSettlement = {
    _count: ScmSettlementCountAggregateOutputType | null
    _avg: ScmSettlementAvgAggregateOutputType | null
    _sum: ScmSettlementSumAggregateOutputType | null
    _min: ScmSettlementMinAggregateOutputType | null
    _max: ScmSettlementMaxAggregateOutputType | null
  }

  export type ScmSettlementAvgAggregateOutputType = {
    amountMinor: number | null
  }

  export type ScmSettlementSumAggregateOutputType = {
    amountMinor: bigint | null
  }

  export type ScmSettlementMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    shipmentId: string | null
    amountMinor: bigint | null
    currency: string | null
    status: $Enums.SettlementStatus | null
    escrowIntentId: string | null
    createdAt: Date | null
  }

  export type ScmSettlementMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    shipmentId: string | null
    amountMinor: bigint | null
    currency: string | null
    status: $Enums.SettlementStatus | null
    escrowIntentId: string | null
    createdAt: Date | null
  }

  export type ScmSettlementCountAggregateOutputType = {
    id: number
    orgId: number
    shipmentId: number
    amountMinor: number
    currency: number
    status: number
    escrowIntentId: number
    createdAt: number
    _all: number
  }


  export type ScmSettlementAvgAggregateInputType = {
    amountMinor?: true
  }

  export type ScmSettlementSumAggregateInputType = {
    amountMinor?: true
  }

  export type ScmSettlementMinAggregateInputType = {
    id?: true
    orgId?: true
    shipmentId?: true
    amountMinor?: true
    currency?: true
    status?: true
    escrowIntentId?: true
    createdAt?: true
  }

  export type ScmSettlementMaxAggregateInputType = {
    id?: true
    orgId?: true
    shipmentId?: true
    amountMinor?: true
    currency?: true
    status?: true
    escrowIntentId?: true
    createdAt?: true
  }

  export type ScmSettlementCountAggregateInputType = {
    id?: true
    orgId?: true
    shipmentId?: true
    amountMinor?: true
    currency?: true
    status?: true
    escrowIntentId?: true
    createdAt?: true
    _all?: true
  }

  export type ScmSettlementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScmSettlement to aggregate.
     */
    where?: ScmSettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScmSettlements to fetch.
     */
    orderBy?: ScmSettlementOrderByWithRelationInput | ScmSettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScmSettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScmSettlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScmSettlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScmSettlements
    **/
    _count?: true | ScmSettlementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScmSettlementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScmSettlementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScmSettlementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScmSettlementMaxAggregateInputType
  }

  export type GetScmSettlementAggregateType<T extends ScmSettlementAggregateArgs> = {
        [P in keyof T & keyof AggregateScmSettlement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScmSettlement[P]>
      : GetScalarType<T[P], AggregateScmSettlement[P]>
  }




  export type ScmSettlementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScmSettlementWhereInput
    orderBy?: ScmSettlementOrderByWithAggregationInput | ScmSettlementOrderByWithAggregationInput[]
    by: ScmSettlementScalarFieldEnum[] | ScmSettlementScalarFieldEnum
    having?: ScmSettlementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScmSettlementCountAggregateInputType | true
    _avg?: ScmSettlementAvgAggregateInputType
    _sum?: ScmSettlementSumAggregateInputType
    _min?: ScmSettlementMinAggregateInputType
    _max?: ScmSettlementMaxAggregateInputType
  }

  export type ScmSettlementGroupByOutputType = {
    id: string
    orgId: string
    shipmentId: string
    amountMinor: bigint
    currency: string
    status: $Enums.SettlementStatus
    escrowIntentId: string | null
    createdAt: Date
    _count: ScmSettlementCountAggregateOutputType | null
    _avg: ScmSettlementAvgAggregateOutputType | null
    _sum: ScmSettlementSumAggregateOutputType | null
    _min: ScmSettlementMinAggregateOutputType | null
    _max: ScmSettlementMaxAggregateOutputType | null
  }

  type GetScmSettlementGroupByPayload<T extends ScmSettlementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScmSettlementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScmSettlementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScmSettlementGroupByOutputType[P]>
            : GetScalarType<T[P], ScmSettlementGroupByOutputType[P]>
        }
      >
    >


  export type ScmSettlementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    shipmentId?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["scmSettlement"]>

  export type ScmSettlementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    shipmentId?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["scmSettlement"]>

  export type ScmSettlementSelectScalar = {
    id?: boolean
    orgId?: boolean
    shipmentId?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }


  export type $ScmSettlementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScmSettlement"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      shipmentId: string
      amountMinor: bigint
      currency: string
      status: $Enums.SettlementStatus
      escrowIntentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["scmSettlement"]>
    composites: {}
  }

  type ScmSettlementGetPayload<S extends boolean | null | undefined | ScmSettlementDefaultArgs> = $Result.GetResult<Prisma.$ScmSettlementPayload, S>

  type ScmSettlementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ScmSettlementFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ScmSettlementCountAggregateInputType | true
    }

  export interface ScmSettlementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScmSettlement'], meta: { name: 'ScmSettlement' } }
    /**
     * Find zero or one ScmSettlement that matches the filter.
     * @param {ScmSettlementFindUniqueArgs} args - Arguments to find a ScmSettlement
     * @example
     * // Get one ScmSettlement
     * const scmSettlement = await prisma.scmSettlement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScmSettlementFindUniqueArgs>(args: SelectSubset<T, ScmSettlementFindUniqueArgs<ExtArgs>>): Prisma__ScmSettlementClient<$Result.GetResult<Prisma.$ScmSettlementPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ScmSettlement that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ScmSettlementFindUniqueOrThrowArgs} args - Arguments to find a ScmSettlement
     * @example
     * // Get one ScmSettlement
     * const scmSettlement = await prisma.scmSettlement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScmSettlementFindUniqueOrThrowArgs>(args: SelectSubset<T, ScmSettlementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScmSettlementClient<$Result.GetResult<Prisma.$ScmSettlementPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ScmSettlement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScmSettlementFindFirstArgs} args - Arguments to find a ScmSettlement
     * @example
     * // Get one ScmSettlement
     * const scmSettlement = await prisma.scmSettlement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScmSettlementFindFirstArgs>(args?: SelectSubset<T, ScmSettlementFindFirstArgs<ExtArgs>>): Prisma__ScmSettlementClient<$Result.GetResult<Prisma.$ScmSettlementPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ScmSettlement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScmSettlementFindFirstOrThrowArgs} args - Arguments to find a ScmSettlement
     * @example
     * // Get one ScmSettlement
     * const scmSettlement = await prisma.scmSettlement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScmSettlementFindFirstOrThrowArgs>(args?: SelectSubset<T, ScmSettlementFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScmSettlementClient<$Result.GetResult<Prisma.$ScmSettlementPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ScmSettlements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScmSettlementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScmSettlements
     * const scmSettlements = await prisma.scmSettlement.findMany()
     * 
     * // Get first 10 ScmSettlements
     * const scmSettlements = await prisma.scmSettlement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scmSettlementWithIdOnly = await prisma.scmSettlement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScmSettlementFindManyArgs>(args?: SelectSubset<T, ScmSettlementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScmSettlementPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ScmSettlement.
     * @param {ScmSettlementCreateArgs} args - Arguments to create a ScmSettlement.
     * @example
     * // Create one ScmSettlement
     * const ScmSettlement = await prisma.scmSettlement.create({
     *   data: {
     *     // ... data to create a ScmSettlement
     *   }
     * })
     * 
     */
    create<T extends ScmSettlementCreateArgs>(args: SelectSubset<T, ScmSettlementCreateArgs<ExtArgs>>): Prisma__ScmSettlementClient<$Result.GetResult<Prisma.$ScmSettlementPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ScmSettlements.
     * @param {ScmSettlementCreateManyArgs} args - Arguments to create many ScmSettlements.
     * @example
     * // Create many ScmSettlements
     * const scmSettlement = await prisma.scmSettlement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScmSettlementCreateManyArgs>(args?: SelectSubset<T, ScmSettlementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScmSettlements and returns the data saved in the database.
     * @param {ScmSettlementCreateManyAndReturnArgs} args - Arguments to create many ScmSettlements.
     * @example
     * // Create many ScmSettlements
     * const scmSettlement = await prisma.scmSettlement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScmSettlements and only return the `id`
     * const scmSettlementWithIdOnly = await prisma.scmSettlement.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScmSettlementCreateManyAndReturnArgs>(args?: SelectSubset<T, ScmSettlementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScmSettlementPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ScmSettlement.
     * @param {ScmSettlementDeleteArgs} args - Arguments to delete one ScmSettlement.
     * @example
     * // Delete one ScmSettlement
     * const ScmSettlement = await prisma.scmSettlement.delete({
     *   where: {
     *     // ... filter to delete one ScmSettlement
     *   }
     * })
     * 
     */
    delete<T extends ScmSettlementDeleteArgs>(args: SelectSubset<T, ScmSettlementDeleteArgs<ExtArgs>>): Prisma__ScmSettlementClient<$Result.GetResult<Prisma.$ScmSettlementPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ScmSettlement.
     * @param {ScmSettlementUpdateArgs} args - Arguments to update one ScmSettlement.
     * @example
     * // Update one ScmSettlement
     * const scmSettlement = await prisma.scmSettlement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScmSettlementUpdateArgs>(args: SelectSubset<T, ScmSettlementUpdateArgs<ExtArgs>>): Prisma__ScmSettlementClient<$Result.GetResult<Prisma.$ScmSettlementPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ScmSettlements.
     * @param {ScmSettlementDeleteManyArgs} args - Arguments to filter ScmSettlements to delete.
     * @example
     * // Delete a few ScmSettlements
     * const { count } = await prisma.scmSettlement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScmSettlementDeleteManyArgs>(args?: SelectSubset<T, ScmSettlementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScmSettlements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScmSettlementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScmSettlements
     * const scmSettlement = await prisma.scmSettlement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScmSettlementUpdateManyArgs>(args: SelectSubset<T, ScmSettlementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ScmSettlement.
     * @param {ScmSettlementUpsertArgs} args - Arguments to update or create a ScmSettlement.
     * @example
     * // Update or create a ScmSettlement
     * const scmSettlement = await prisma.scmSettlement.upsert({
     *   create: {
     *     // ... data to create a ScmSettlement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScmSettlement we want to update
     *   }
     * })
     */
    upsert<T extends ScmSettlementUpsertArgs>(args: SelectSubset<T, ScmSettlementUpsertArgs<ExtArgs>>): Prisma__ScmSettlementClient<$Result.GetResult<Prisma.$ScmSettlementPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ScmSettlements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScmSettlementCountArgs} args - Arguments to filter ScmSettlements to count.
     * @example
     * // Count the number of ScmSettlements
     * const count = await prisma.scmSettlement.count({
     *   where: {
     *     // ... the filter for the ScmSettlements we want to count
     *   }
     * })
    **/
    count<T extends ScmSettlementCountArgs>(
      args?: Subset<T, ScmSettlementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScmSettlementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScmSettlement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScmSettlementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ScmSettlementAggregateArgs>(args: Subset<T, ScmSettlementAggregateArgs>): Prisma.PrismaPromise<GetScmSettlementAggregateType<T>>

    /**
     * Group by ScmSettlement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScmSettlementGroupByArgs} args - Group by arguments.
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
      T extends ScmSettlementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScmSettlementGroupByArgs['orderBy'] }
        : { orderBy?: ScmSettlementGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ScmSettlementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScmSettlementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScmSettlement model
   */
  readonly fields: ScmSettlementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScmSettlement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScmSettlementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ScmSettlement model
   */ 
  interface ScmSettlementFieldRefs {
    readonly id: FieldRef<"ScmSettlement", 'String'>
    readonly orgId: FieldRef<"ScmSettlement", 'String'>
    readonly shipmentId: FieldRef<"ScmSettlement", 'String'>
    readonly amountMinor: FieldRef<"ScmSettlement", 'BigInt'>
    readonly currency: FieldRef<"ScmSettlement", 'String'>
    readonly status: FieldRef<"ScmSettlement", 'SettlementStatus'>
    readonly escrowIntentId: FieldRef<"ScmSettlement", 'String'>
    readonly createdAt: FieldRef<"ScmSettlement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ScmSettlement findUnique
   */
  export type ScmSettlementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScmSettlement
     */
    select?: ScmSettlementSelect<ExtArgs> | null
    /**
     * Filter, which ScmSettlement to fetch.
     */
    where: ScmSettlementWhereUniqueInput
  }

  /**
   * ScmSettlement findUniqueOrThrow
   */
  export type ScmSettlementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScmSettlement
     */
    select?: ScmSettlementSelect<ExtArgs> | null
    /**
     * Filter, which ScmSettlement to fetch.
     */
    where: ScmSettlementWhereUniqueInput
  }

  /**
   * ScmSettlement findFirst
   */
  export type ScmSettlementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScmSettlement
     */
    select?: ScmSettlementSelect<ExtArgs> | null
    /**
     * Filter, which ScmSettlement to fetch.
     */
    where?: ScmSettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScmSettlements to fetch.
     */
    orderBy?: ScmSettlementOrderByWithRelationInput | ScmSettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScmSettlements.
     */
    cursor?: ScmSettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScmSettlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScmSettlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScmSettlements.
     */
    distinct?: ScmSettlementScalarFieldEnum | ScmSettlementScalarFieldEnum[]
  }

  /**
   * ScmSettlement findFirstOrThrow
   */
  export type ScmSettlementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScmSettlement
     */
    select?: ScmSettlementSelect<ExtArgs> | null
    /**
     * Filter, which ScmSettlement to fetch.
     */
    where?: ScmSettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScmSettlements to fetch.
     */
    orderBy?: ScmSettlementOrderByWithRelationInput | ScmSettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScmSettlements.
     */
    cursor?: ScmSettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScmSettlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScmSettlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScmSettlements.
     */
    distinct?: ScmSettlementScalarFieldEnum | ScmSettlementScalarFieldEnum[]
  }

  /**
   * ScmSettlement findMany
   */
  export type ScmSettlementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScmSettlement
     */
    select?: ScmSettlementSelect<ExtArgs> | null
    /**
     * Filter, which ScmSettlements to fetch.
     */
    where?: ScmSettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScmSettlements to fetch.
     */
    orderBy?: ScmSettlementOrderByWithRelationInput | ScmSettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScmSettlements.
     */
    cursor?: ScmSettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScmSettlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScmSettlements.
     */
    skip?: number
    distinct?: ScmSettlementScalarFieldEnum | ScmSettlementScalarFieldEnum[]
  }

  /**
   * ScmSettlement create
   */
  export type ScmSettlementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScmSettlement
     */
    select?: ScmSettlementSelect<ExtArgs> | null
    /**
     * The data needed to create a ScmSettlement.
     */
    data: XOR<ScmSettlementCreateInput, ScmSettlementUncheckedCreateInput>
  }

  /**
   * ScmSettlement createMany
   */
  export type ScmSettlementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScmSettlements.
     */
    data: ScmSettlementCreateManyInput | ScmSettlementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScmSettlement createManyAndReturn
   */
  export type ScmSettlementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScmSettlement
     */
    select?: ScmSettlementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ScmSettlements.
     */
    data: ScmSettlementCreateManyInput | ScmSettlementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScmSettlement update
   */
  export type ScmSettlementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScmSettlement
     */
    select?: ScmSettlementSelect<ExtArgs> | null
    /**
     * The data needed to update a ScmSettlement.
     */
    data: XOR<ScmSettlementUpdateInput, ScmSettlementUncheckedUpdateInput>
    /**
     * Choose, which ScmSettlement to update.
     */
    where: ScmSettlementWhereUniqueInput
  }

  /**
   * ScmSettlement updateMany
   */
  export type ScmSettlementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScmSettlements.
     */
    data: XOR<ScmSettlementUpdateManyMutationInput, ScmSettlementUncheckedUpdateManyInput>
    /**
     * Filter which ScmSettlements to update
     */
    where?: ScmSettlementWhereInput
  }

  /**
   * ScmSettlement upsert
   */
  export type ScmSettlementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScmSettlement
     */
    select?: ScmSettlementSelect<ExtArgs> | null
    /**
     * The filter to search for the ScmSettlement to update in case it exists.
     */
    where: ScmSettlementWhereUniqueInput
    /**
     * In case the ScmSettlement found by the `where` argument doesn't exist, create a new ScmSettlement with this data.
     */
    create: XOR<ScmSettlementCreateInput, ScmSettlementUncheckedCreateInput>
    /**
     * In case the ScmSettlement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScmSettlementUpdateInput, ScmSettlementUncheckedUpdateInput>
  }

  /**
   * ScmSettlement delete
   */
  export type ScmSettlementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScmSettlement
     */
    select?: ScmSettlementSelect<ExtArgs> | null
    /**
     * Filter which ScmSettlement to delete.
     */
    where: ScmSettlementWhereUniqueInput
  }

  /**
   * ScmSettlement deleteMany
   */
  export type ScmSettlementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScmSettlements to delete
     */
    where?: ScmSettlementWhereInput
  }

  /**
   * ScmSettlement without action
   */
  export type ScmSettlementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScmSettlement
     */
    select?: ScmSettlementSelect<ExtArgs> | null
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


  export const ProductScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    sku: 'sku',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ShipmentScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    productId: 'productId',
    origin: 'origin',
    destination: 'destination',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type ShipmentScalarFieldEnum = (typeof ShipmentScalarFieldEnum)[keyof typeof ShipmentScalarFieldEnum]


  export const CustodyEventScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    shipmentId: 'shipmentId',
    actorRef: 'actorRef',
    geo: 'geo',
    attestationId: 'attestationId',
    createdAt: 'createdAt'
  };

  export type CustodyEventScalarFieldEnum = (typeof CustodyEventScalarFieldEnum)[keyof typeof CustodyEventScalarFieldEnum]


  export const TradeDocScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    shipmentId: 'shipmentId',
    docType: 'docType',
    dataHash: 'dataHash',
    createdAt: 'createdAt'
  };

  export type TradeDocScalarFieldEnum = (typeof TradeDocScalarFieldEnum)[keyof typeof TradeDocScalarFieldEnum]


  export const TradeFinanceScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    shipmentId: 'shipmentId',
    financierRef: 'financierRef',
    amountMinor: 'amountMinor',
    currency: 'currency',
    payoutIntentId: 'payoutIntentId',
    createdAt: 'createdAt'
  };

  export type TradeFinanceScalarFieldEnum = (typeof TradeFinanceScalarFieldEnum)[keyof typeof TradeFinanceScalarFieldEnum]


  export const ScmSettlementScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    shipmentId: 'shipmentId',
    amountMinor: 'amountMinor',
    currency: 'currency',
    status: 'status',
    escrowIntentId: 'escrowIntentId',
    createdAt: 'createdAt'
  };

  export type ScmSettlementScalarFieldEnum = (typeof ScmSettlementScalarFieldEnum)[keyof typeof ScmSettlementScalarFieldEnum]


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
   * Reference to a field of type 'ShipmentStatus'
   */
  export type EnumShipmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentStatus'>
    


  /**
   * Reference to a field of type 'ShipmentStatus[]'
   */
  export type ListEnumShipmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentStatus[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'SettlementStatus'
   */
  export type EnumSettlementStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SettlementStatus'>
    


  /**
   * Reference to a field of type 'SettlementStatus[]'
   */
  export type ListEnumSettlementStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SettlementStatus[]'>
    


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

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    orgId?: StringFilter<"Product"> | string
    sku?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orgId_sku?: ProductOrgIdSkuCompoundUniqueInput
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    orgId?: StringFilter<"Product"> | string
    sku?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
  }, "id" | "orgId_sku">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    orgId?: StringWithAggregatesFilter<"Product"> | string
    sku?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type ShipmentWhereInput = {
    AND?: ShipmentWhereInput | ShipmentWhereInput[]
    OR?: ShipmentWhereInput[]
    NOT?: ShipmentWhereInput | ShipmentWhereInput[]
    id?: StringFilter<"Shipment"> | string
    orgId?: StringFilter<"Shipment"> | string
    productId?: StringNullableFilter<"Shipment"> | string | null
    origin?: StringFilter<"Shipment"> | string
    destination?: StringFilter<"Shipment"> | string
    status?: EnumShipmentStatusFilter<"Shipment"> | $Enums.ShipmentStatus
    createdAt?: DateTimeFilter<"Shipment"> | Date | string
    custody?: CustodyEventListRelationFilter
    docs?: TradeDocListRelationFilter
  }

  export type ShipmentOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    productId?: SortOrderInput | SortOrder
    origin?: SortOrder
    destination?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    custody?: CustodyEventOrderByRelationAggregateInput
    docs?: TradeDocOrderByRelationAggregateInput
  }

  export type ShipmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ShipmentWhereInput | ShipmentWhereInput[]
    OR?: ShipmentWhereInput[]
    NOT?: ShipmentWhereInput | ShipmentWhereInput[]
    orgId?: StringFilter<"Shipment"> | string
    productId?: StringNullableFilter<"Shipment"> | string | null
    origin?: StringFilter<"Shipment"> | string
    destination?: StringFilter<"Shipment"> | string
    status?: EnumShipmentStatusFilter<"Shipment"> | $Enums.ShipmentStatus
    createdAt?: DateTimeFilter<"Shipment"> | Date | string
    custody?: CustodyEventListRelationFilter
    docs?: TradeDocListRelationFilter
  }, "id">

  export type ShipmentOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    productId?: SortOrderInput | SortOrder
    origin?: SortOrder
    destination?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: ShipmentCountOrderByAggregateInput
    _max?: ShipmentMaxOrderByAggregateInput
    _min?: ShipmentMinOrderByAggregateInput
  }

  export type ShipmentScalarWhereWithAggregatesInput = {
    AND?: ShipmentScalarWhereWithAggregatesInput | ShipmentScalarWhereWithAggregatesInput[]
    OR?: ShipmentScalarWhereWithAggregatesInput[]
    NOT?: ShipmentScalarWhereWithAggregatesInput | ShipmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Shipment"> | string
    orgId?: StringWithAggregatesFilter<"Shipment"> | string
    productId?: StringNullableWithAggregatesFilter<"Shipment"> | string | null
    origin?: StringWithAggregatesFilter<"Shipment"> | string
    destination?: StringWithAggregatesFilter<"Shipment"> | string
    status?: EnumShipmentStatusWithAggregatesFilter<"Shipment"> | $Enums.ShipmentStatus
    createdAt?: DateTimeWithAggregatesFilter<"Shipment"> | Date | string
  }

  export type CustodyEventWhereInput = {
    AND?: CustodyEventWhereInput | CustodyEventWhereInput[]
    OR?: CustodyEventWhereInput[]
    NOT?: CustodyEventWhereInput | CustodyEventWhereInput[]
    id?: StringFilter<"CustodyEvent"> | string
    orgId?: StringFilter<"CustodyEvent"> | string
    shipmentId?: StringFilter<"CustodyEvent"> | string
    actorRef?: StringFilter<"CustodyEvent"> | string
    geo?: JsonNullableFilter<"CustodyEvent">
    attestationId?: StringNullableFilter<"CustodyEvent"> | string | null
    createdAt?: DateTimeFilter<"CustodyEvent"> | Date | string
    shipment?: XOR<ShipmentRelationFilter, ShipmentWhereInput>
  }

  export type CustodyEventOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    actorRef?: SortOrder
    geo?: SortOrderInput | SortOrder
    attestationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    shipment?: ShipmentOrderByWithRelationInput
  }

  export type CustodyEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustodyEventWhereInput | CustodyEventWhereInput[]
    OR?: CustodyEventWhereInput[]
    NOT?: CustodyEventWhereInput | CustodyEventWhereInput[]
    orgId?: StringFilter<"CustodyEvent"> | string
    shipmentId?: StringFilter<"CustodyEvent"> | string
    actorRef?: StringFilter<"CustodyEvent"> | string
    geo?: JsonNullableFilter<"CustodyEvent">
    attestationId?: StringNullableFilter<"CustodyEvent"> | string | null
    createdAt?: DateTimeFilter<"CustodyEvent"> | Date | string
    shipment?: XOR<ShipmentRelationFilter, ShipmentWhereInput>
  }, "id">

  export type CustodyEventOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    actorRef?: SortOrder
    geo?: SortOrderInput | SortOrder
    attestationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CustodyEventCountOrderByAggregateInput
    _max?: CustodyEventMaxOrderByAggregateInput
    _min?: CustodyEventMinOrderByAggregateInput
  }

  export type CustodyEventScalarWhereWithAggregatesInput = {
    AND?: CustodyEventScalarWhereWithAggregatesInput | CustodyEventScalarWhereWithAggregatesInput[]
    OR?: CustodyEventScalarWhereWithAggregatesInput[]
    NOT?: CustodyEventScalarWhereWithAggregatesInput | CustodyEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustodyEvent"> | string
    orgId?: StringWithAggregatesFilter<"CustodyEvent"> | string
    shipmentId?: StringWithAggregatesFilter<"CustodyEvent"> | string
    actorRef?: StringWithAggregatesFilter<"CustodyEvent"> | string
    geo?: JsonNullableWithAggregatesFilter<"CustodyEvent">
    attestationId?: StringNullableWithAggregatesFilter<"CustodyEvent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CustodyEvent"> | Date | string
  }

  export type TradeDocWhereInput = {
    AND?: TradeDocWhereInput | TradeDocWhereInput[]
    OR?: TradeDocWhereInput[]
    NOT?: TradeDocWhereInput | TradeDocWhereInput[]
    id?: StringFilter<"TradeDoc"> | string
    orgId?: StringFilter<"TradeDoc"> | string
    shipmentId?: StringFilter<"TradeDoc"> | string
    docType?: StringFilter<"TradeDoc"> | string
    dataHash?: StringFilter<"TradeDoc"> | string
    createdAt?: DateTimeFilter<"TradeDoc"> | Date | string
    shipment?: XOR<ShipmentRelationFilter, ShipmentWhereInput>
  }

  export type TradeDocOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    docType?: SortOrder
    dataHash?: SortOrder
    createdAt?: SortOrder
    shipment?: ShipmentOrderByWithRelationInput
  }

  export type TradeDocWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TradeDocWhereInput | TradeDocWhereInput[]
    OR?: TradeDocWhereInput[]
    NOT?: TradeDocWhereInput | TradeDocWhereInput[]
    orgId?: StringFilter<"TradeDoc"> | string
    shipmentId?: StringFilter<"TradeDoc"> | string
    docType?: StringFilter<"TradeDoc"> | string
    dataHash?: StringFilter<"TradeDoc"> | string
    createdAt?: DateTimeFilter<"TradeDoc"> | Date | string
    shipment?: XOR<ShipmentRelationFilter, ShipmentWhereInput>
  }, "id">

  export type TradeDocOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    docType?: SortOrder
    dataHash?: SortOrder
    createdAt?: SortOrder
    _count?: TradeDocCountOrderByAggregateInput
    _max?: TradeDocMaxOrderByAggregateInput
    _min?: TradeDocMinOrderByAggregateInput
  }

  export type TradeDocScalarWhereWithAggregatesInput = {
    AND?: TradeDocScalarWhereWithAggregatesInput | TradeDocScalarWhereWithAggregatesInput[]
    OR?: TradeDocScalarWhereWithAggregatesInput[]
    NOT?: TradeDocScalarWhereWithAggregatesInput | TradeDocScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TradeDoc"> | string
    orgId?: StringWithAggregatesFilter<"TradeDoc"> | string
    shipmentId?: StringWithAggregatesFilter<"TradeDoc"> | string
    docType?: StringWithAggregatesFilter<"TradeDoc"> | string
    dataHash?: StringWithAggregatesFilter<"TradeDoc"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TradeDoc"> | Date | string
  }

  export type TradeFinanceWhereInput = {
    AND?: TradeFinanceWhereInput | TradeFinanceWhereInput[]
    OR?: TradeFinanceWhereInput[]
    NOT?: TradeFinanceWhereInput | TradeFinanceWhereInput[]
    id?: StringFilter<"TradeFinance"> | string
    orgId?: StringFilter<"TradeFinance"> | string
    shipmentId?: StringFilter<"TradeFinance"> | string
    financierRef?: StringFilter<"TradeFinance"> | string
    amountMinor?: BigIntFilter<"TradeFinance"> | bigint | number
    currency?: StringFilter<"TradeFinance"> | string
    payoutIntentId?: StringNullableFilter<"TradeFinance"> | string | null
    createdAt?: DateTimeFilter<"TradeFinance"> | Date | string
  }

  export type TradeFinanceOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    financierRef?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    payoutIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type TradeFinanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TradeFinanceWhereInput | TradeFinanceWhereInput[]
    OR?: TradeFinanceWhereInput[]
    NOT?: TradeFinanceWhereInput | TradeFinanceWhereInput[]
    orgId?: StringFilter<"TradeFinance"> | string
    shipmentId?: StringFilter<"TradeFinance"> | string
    financierRef?: StringFilter<"TradeFinance"> | string
    amountMinor?: BigIntFilter<"TradeFinance"> | bigint | number
    currency?: StringFilter<"TradeFinance"> | string
    payoutIntentId?: StringNullableFilter<"TradeFinance"> | string | null
    createdAt?: DateTimeFilter<"TradeFinance"> | Date | string
  }, "id">

  export type TradeFinanceOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    financierRef?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    payoutIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TradeFinanceCountOrderByAggregateInput
    _avg?: TradeFinanceAvgOrderByAggregateInput
    _max?: TradeFinanceMaxOrderByAggregateInput
    _min?: TradeFinanceMinOrderByAggregateInput
    _sum?: TradeFinanceSumOrderByAggregateInput
  }

  export type TradeFinanceScalarWhereWithAggregatesInput = {
    AND?: TradeFinanceScalarWhereWithAggregatesInput | TradeFinanceScalarWhereWithAggregatesInput[]
    OR?: TradeFinanceScalarWhereWithAggregatesInput[]
    NOT?: TradeFinanceScalarWhereWithAggregatesInput | TradeFinanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TradeFinance"> | string
    orgId?: StringWithAggregatesFilter<"TradeFinance"> | string
    shipmentId?: StringWithAggregatesFilter<"TradeFinance"> | string
    financierRef?: StringWithAggregatesFilter<"TradeFinance"> | string
    amountMinor?: BigIntWithAggregatesFilter<"TradeFinance"> | bigint | number
    currency?: StringWithAggregatesFilter<"TradeFinance"> | string
    payoutIntentId?: StringNullableWithAggregatesFilter<"TradeFinance"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TradeFinance"> | Date | string
  }

  export type ScmSettlementWhereInput = {
    AND?: ScmSettlementWhereInput | ScmSettlementWhereInput[]
    OR?: ScmSettlementWhereInput[]
    NOT?: ScmSettlementWhereInput | ScmSettlementWhereInput[]
    id?: StringFilter<"ScmSettlement"> | string
    orgId?: StringFilter<"ScmSettlement"> | string
    shipmentId?: StringFilter<"ScmSettlement"> | string
    amountMinor?: BigIntFilter<"ScmSettlement"> | bigint | number
    currency?: StringFilter<"ScmSettlement"> | string
    status?: EnumSettlementStatusFilter<"ScmSettlement"> | $Enums.SettlementStatus
    escrowIntentId?: StringNullableFilter<"ScmSettlement"> | string | null
    createdAt?: DateTimeFilter<"ScmSettlement"> | Date | string
  }

  export type ScmSettlementOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type ScmSettlementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScmSettlementWhereInput | ScmSettlementWhereInput[]
    OR?: ScmSettlementWhereInput[]
    NOT?: ScmSettlementWhereInput | ScmSettlementWhereInput[]
    orgId?: StringFilter<"ScmSettlement"> | string
    shipmentId?: StringFilter<"ScmSettlement"> | string
    amountMinor?: BigIntFilter<"ScmSettlement"> | bigint | number
    currency?: StringFilter<"ScmSettlement"> | string
    status?: EnumSettlementStatusFilter<"ScmSettlement"> | $Enums.SettlementStatus
    escrowIntentId?: StringNullableFilter<"ScmSettlement"> | string | null
    createdAt?: DateTimeFilter<"ScmSettlement"> | Date | string
  }, "id">

  export type ScmSettlementOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ScmSettlementCountOrderByAggregateInput
    _avg?: ScmSettlementAvgOrderByAggregateInput
    _max?: ScmSettlementMaxOrderByAggregateInput
    _min?: ScmSettlementMinOrderByAggregateInput
    _sum?: ScmSettlementSumOrderByAggregateInput
  }

  export type ScmSettlementScalarWhereWithAggregatesInput = {
    AND?: ScmSettlementScalarWhereWithAggregatesInput | ScmSettlementScalarWhereWithAggregatesInput[]
    OR?: ScmSettlementScalarWhereWithAggregatesInput[]
    NOT?: ScmSettlementScalarWhereWithAggregatesInput | ScmSettlementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ScmSettlement"> | string
    orgId?: StringWithAggregatesFilter<"ScmSettlement"> | string
    shipmentId?: StringWithAggregatesFilter<"ScmSettlement"> | string
    amountMinor?: BigIntWithAggregatesFilter<"ScmSettlement"> | bigint | number
    currency?: StringWithAggregatesFilter<"ScmSettlement"> | string
    status?: EnumSettlementStatusWithAggregatesFilter<"ScmSettlement"> | $Enums.SettlementStatus
    escrowIntentId?: StringNullableWithAggregatesFilter<"ScmSettlement"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ScmSettlement"> | Date | string
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

  export type ProductCreateInput = {
    id: string
    orgId: string
    sku: string
    name: string
    createdAt?: Date | string
  }

  export type ProductUncheckedCreateInput = {
    id: string
    orgId: string
    sku: string
    name: string
    createdAt?: Date | string
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateManyInput = {
    id: string
    orgId: string
    sku: string
    name: string
    createdAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShipmentCreateInput = {
    id: string
    orgId: string
    productId?: string | null
    origin: string
    destination: string
    status?: $Enums.ShipmentStatus
    createdAt?: Date | string
    custody?: CustodyEventCreateNestedManyWithoutShipmentInput
    docs?: TradeDocCreateNestedManyWithoutShipmentInput
  }

  export type ShipmentUncheckedCreateInput = {
    id: string
    orgId: string
    productId?: string | null
    origin: string
    destination: string
    status?: $Enums.ShipmentStatus
    createdAt?: Date | string
    custody?: CustodyEventUncheckedCreateNestedManyWithoutShipmentInput
    docs?: TradeDocUncheckedCreateNestedManyWithoutShipmentInput
  }

  export type ShipmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    custody?: CustodyEventUpdateManyWithoutShipmentNestedInput
    docs?: TradeDocUpdateManyWithoutShipmentNestedInput
  }

  export type ShipmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    custody?: CustodyEventUncheckedUpdateManyWithoutShipmentNestedInput
    docs?: TradeDocUncheckedUpdateManyWithoutShipmentNestedInput
  }

  export type ShipmentCreateManyInput = {
    id: string
    orgId: string
    productId?: string | null
    origin: string
    destination: string
    status?: $Enums.ShipmentStatus
    createdAt?: Date | string
  }

  export type ShipmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShipmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustodyEventCreateInput = {
    id: string
    orgId: string
    actorRef: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: string | null
    createdAt?: Date | string
    shipment: ShipmentCreateNestedOneWithoutCustodyInput
  }

  export type CustodyEventUncheckedCreateInput = {
    id: string
    orgId: string
    shipmentId: string
    actorRef: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type CustodyEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    actorRef?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shipment?: ShipmentUpdateOneRequiredWithoutCustodyNestedInput
  }

  export type CustodyEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    actorRef?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustodyEventCreateManyInput = {
    id: string
    orgId: string
    shipmentId: string
    actorRef: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type CustodyEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    actorRef?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustodyEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    actorRef?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeDocCreateInput = {
    id: string
    orgId: string
    docType: string
    dataHash: string
    createdAt?: Date | string
    shipment: ShipmentCreateNestedOneWithoutDocsInput
  }

  export type TradeDocUncheckedCreateInput = {
    id: string
    orgId: string
    shipmentId: string
    docType: string
    dataHash: string
    createdAt?: Date | string
  }

  export type TradeDocUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    dataHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shipment?: ShipmentUpdateOneRequiredWithoutDocsNestedInput
  }

  export type TradeDocUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    dataHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeDocCreateManyInput = {
    id: string
    orgId: string
    shipmentId: string
    docType: string
    dataHash: string
    createdAt?: Date | string
  }

  export type TradeDocUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    dataHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeDocUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    dataHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeFinanceCreateInput = {
    id: string
    orgId: string
    shipmentId: string
    financierRef: string
    amountMinor: bigint | number
    currency: string
    payoutIntentId?: string | null
    createdAt?: Date | string
  }

  export type TradeFinanceUncheckedCreateInput = {
    id: string
    orgId: string
    shipmentId: string
    financierRef: string
    amountMinor: bigint | number
    currency: string
    payoutIntentId?: string | null
    createdAt?: Date | string
  }

  export type TradeFinanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    financierRef?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    payoutIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeFinanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    financierRef?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    payoutIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeFinanceCreateManyInput = {
    id: string
    orgId: string
    shipmentId: string
    financierRef: string
    amountMinor: bigint | number
    currency: string
    payoutIntentId?: string | null
    createdAt?: Date | string
  }

  export type TradeFinanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    financierRef?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    payoutIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeFinanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    financierRef?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    payoutIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScmSettlementCreateInput = {
    id: string
    orgId: string
    shipmentId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.SettlementStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type ScmSettlementUncheckedCreateInput = {
    id: string
    orgId: string
    shipmentId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.SettlementStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type ScmSettlementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumSettlementStatusFieldUpdateOperationsInput | $Enums.SettlementStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScmSettlementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumSettlementStatusFieldUpdateOperationsInput | $Enums.SettlementStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScmSettlementCreateManyInput = {
    id: string
    orgId: string
    shipmentId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.SettlementStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type ScmSettlementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumSettlementStatusFieldUpdateOperationsInput | $Enums.SettlementStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScmSettlementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    shipmentId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumSettlementStatusFieldUpdateOperationsInput | $Enums.SettlementStatus
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

  export type ProductOrgIdSkuCompoundUniqueInput = {
    orgId: string
    sku: string
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumShipmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | EnumShipmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShipmentStatusFilter<$PrismaModel> | $Enums.ShipmentStatus
  }

  export type CustodyEventListRelationFilter = {
    every?: CustodyEventWhereInput
    some?: CustodyEventWhereInput
    none?: CustodyEventWhereInput
  }

  export type TradeDocListRelationFilter = {
    every?: TradeDocWhereInput
    some?: TradeDocWhereInput
    none?: TradeDocWhereInput
  }

  export type CustodyEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TradeDocOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ShipmentCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    productId?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ShipmentMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    productId?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ShipmentMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    productId?: SortOrder
    origin?: SortOrder
    destination?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumShipmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | EnumShipmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShipmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShipmentStatusFilter<$PrismaModel>
    _max?: NestedEnumShipmentStatusFilter<$PrismaModel>
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

  export type ShipmentRelationFilter = {
    is?: ShipmentWhereInput
    isNot?: ShipmentWhereInput
  }

  export type CustodyEventCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    actorRef?: SortOrder
    geo?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type CustodyEventMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    actorRef?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type CustodyEventMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    actorRef?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
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

  export type TradeDocCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    docType?: SortOrder
    dataHash?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeDocMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    docType?: SortOrder
    dataHash?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeDocMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    docType?: SortOrder
    dataHash?: SortOrder
    createdAt?: SortOrder
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

  export type TradeFinanceCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    financierRef?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    payoutIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeFinanceAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type TradeFinanceMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    financierRef?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    payoutIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeFinanceMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    financierRef?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    payoutIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeFinanceSumOrderByAggregateInput = {
    amountMinor?: SortOrder
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

  export type EnumSettlementStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementStatus | EnumSettlementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementStatusFilter<$PrismaModel> | $Enums.SettlementStatus
  }

  export type ScmSettlementCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ScmSettlementAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type ScmSettlementMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ScmSettlementMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    shipmentId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ScmSettlementSumOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type EnumSettlementStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementStatus | EnumSettlementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementStatusWithAggregatesFilter<$PrismaModel> | $Enums.SettlementStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSettlementStatusFilter<$PrismaModel>
    _max?: NestedEnumSettlementStatusFilter<$PrismaModel>
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

  export type CustodyEventCreateNestedManyWithoutShipmentInput = {
    create?: XOR<CustodyEventCreateWithoutShipmentInput, CustodyEventUncheckedCreateWithoutShipmentInput> | CustodyEventCreateWithoutShipmentInput[] | CustodyEventUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: CustodyEventCreateOrConnectWithoutShipmentInput | CustodyEventCreateOrConnectWithoutShipmentInput[]
    createMany?: CustodyEventCreateManyShipmentInputEnvelope
    connect?: CustodyEventWhereUniqueInput | CustodyEventWhereUniqueInput[]
  }

  export type TradeDocCreateNestedManyWithoutShipmentInput = {
    create?: XOR<TradeDocCreateWithoutShipmentInput, TradeDocUncheckedCreateWithoutShipmentInput> | TradeDocCreateWithoutShipmentInput[] | TradeDocUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: TradeDocCreateOrConnectWithoutShipmentInput | TradeDocCreateOrConnectWithoutShipmentInput[]
    createMany?: TradeDocCreateManyShipmentInputEnvelope
    connect?: TradeDocWhereUniqueInput | TradeDocWhereUniqueInput[]
  }

  export type CustodyEventUncheckedCreateNestedManyWithoutShipmentInput = {
    create?: XOR<CustodyEventCreateWithoutShipmentInput, CustodyEventUncheckedCreateWithoutShipmentInput> | CustodyEventCreateWithoutShipmentInput[] | CustodyEventUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: CustodyEventCreateOrConnectWithoutShipmentInput | CustodyEventCreateOrConnectWithoutShipmentInput[]
    createMany?: CustodyEventCreateManyShipmentInputEnvelope
    connect?: CustodyEventWhereUniqueInput | CustodyEventWhereUniqueInput[]
  }

  export type TradeDocUncheckedCreateNestedManyWithoutShipmentInput = {
    create?: XOR<TradeDocCreateWithoutShipmentInput, TradeDocUncheckedCreateWithoutShipmentInput> | TradeDocCreateWithoutShipmentInput[] | TradeDocUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: TradeDocCreateOrConnectWithoutShipmentInput | TradeDocCreateOrConnectWithoutShipmentInput[]
    createMany?: TradeDocCreateManyShipmentInputEnvelope
    connect?: TradeDocWhereUniqueInput | TradeDocWhereUniqueInput[]
  }

  export type EnumShipmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.ShipmentStatus
  }

  export type CustodyEventUpdateManyWithoutShipmentNestedInput = {
    create?: XOR<CustodyEventCreateWithoutShipmentInput, CustodyEventUncheckedCreateWithoutShipmentInput> | CustodyEventCreateWithoutShipmentInput[] | CustodyEventUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: CustodyEventCreateOrConnectWithoutShipmentInput | CustodyEventCreateOrConnectWithoutShipmentInput[]
    upsert?: CustodyEventUpsertWithWhereUniqueWithoutShipmentInput | CustodyEventUpsertWithWhereUniqueWithoutShipmentInput[]
    createMany?: CustodyEventCreateManyShipmentInputEnvelope
    set?: CustodyEventWhereUniqueInput | CustodyEventWhereUniqueInput[]
    disconnect?: CustodyEventWhereUniqueInput | CustodyEventWhereUniqueInput[]
    delete?: CustodyEventWhereUniqueInput | CustodyEventWhereUniqueInput[]
    connect?: CustodyEventWhereUniqueInput | CustodyEventWhereUniqueInput[]
    update?: CustodyEventUpdateWithWhereUniqueWithoutShipmentInput | CustodyEventUpdateWithWhereUniqueWithoutShipmentInput[]
    updateMany?: CustodyEventUpdateManyWithWhereWithoutShipmentInput | CustodyEventUpdateManyWithWhereWithoutShipmentInput[]
    deleteMany?: CustodyEventScalarWhereInput | CustodyEventScalarWhereInput[]
  }

  export type TradeDocUpdateManyWithoutShipmentNestedInput = {
    create?: XOR<TradeDocCreateWithoutShipmentInput, TradeDocUncheckedCreateWithoutShipmentInput> | TradeDocCreateWithoutShipmentInput[] | TradeDocUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: TradeDocCreateOrConnectWithoutShipmentInput | TradeDocCreateOrConnectWithoutShipmentInput[]
    upsert?: TradeDocUpsertWithWhereUniqueWithoutShipmentInput | TradeDocUpsertWithWhereUniqueWithoutShipmentInput[]
    createMany?: TradeDocCreateManyShipmentInputEnvelope
    set?: TradeDocWhereUniqueInput | TradeDocWhereUniqueInput[]
    disconnect?: TradeDocWhereUniqueInput | TradeDocWhereUniqueInput[]
    delete?: TradeDocWhereUniqueInput | TradeDocWhereUniqueInput[]
    connect?: TradeDocWhereUniqueInput | TradeDocWhereUniqueInput[]
    update?: TradeDocUpdateWithWhereUniqueWithoutShipmentInput | TradeDocUpdateWithWhereUniqueWithoutShipmentInput[]
    updateMany?: TradeDocUpdateManyWithWhereWithoutShipmentInput | TradeDocUpdateManyWithWhereWithoutShipmentInput[]
    deleteMany?: TradeDocScalarWhereInput | TradeDocScalarWhereInput[]
  }

  export type CustodyEventUncheckedUpdateManyWithoutShipmentNestedInput = {
    create?: XOR<CustodyEventCreateWithoutShipmentInput, CustodyEventUncheckedCreateWithoutShipmentInput> | CustodyEventCreateWithoutShipmentInput[] | CustodyEventUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: CustodyEventCreateOrConnectWithoutShipmentInput | CustodyEventCreateOrConnectWithoutShipmentInput[]
    upsert?: CustodyEventUpsertWithWhereUniqueWithoutShipmentInput | CustodyEventUpsertWithWhereUniqueWithoutShipmentInput[]
    createMany?: CustodyEventCreateManyShipmentInputEnvelope
    set?: CustodyEventWhereUniqueInput | CustodyEventWhereUniqueInput[]
    disconnect?: CustodyEventWhereUniqueInput | CustodyEventWhereUniqueInput[]
    delete?: CustodyEventWhereUniqueInput | CustodyEventWhereUniqueInput[]
    connect?: CustodyEventWhereUniqueInput | CustodyEventWhereUniqueInput[]
    update?: CustodyEventUpdateWithWhereUniqueWithoutShipmentInput | CustodyEventUpdateWithWhereUniqueWithoutShipmentInput[]
    updateMany?: CustodyEventUpdateManyWithWhereWithoutShipmentInput | CustodyEventUpdateManyWithWhereWithoutShipmentInput[]
    deleteMany?: CustodyEventScalarWhereInput | CustodyEventScalarWhereInput[]
  }

  export type TradeDocUncheckedUpdateManyWithoutShipmentNestedInput = {
    create?: XOR<TradeDocCreateWithoutShipmentInput, TradeDocUncheckedCreateWithoutShipmentInput> | TradeDocCreateWithoutShipmentInput[] | TradeDocUncheckedCreateWithoutShipmentInput[]
    connectOrCreate?: TradeDocCreateOrConnectWithoutShipmentInput | TradeDocCreateOrConnectWithoutShipmentInput[]
    upsert?: TradeDocUpsertWithWhereUniqueWithoutShipmentInput | TradeDocUpsertWithWhereUniqueWithoutShipmentInput[]
    createMany?: TradeDocCreateManyShipmentInputEnvelope
    set?: TradeDocWhereUniqueInput | TradeDocWhereUniqueInput[]
    disconnect?: TradeDocWhereUniqueInput | TradeDocWhereUniqueInput[]
    delete?: TradeDocWhereUniqueInput | TradeDocWhereUniqueInput[]
    connect?: TradeDocWhereUniqueInput | TradeDocWhereUniqueInput[]
    update?: TradeDocUpdateWithWhereUniqueWithoutShipmentInput | TradeDocUpdateWithWhereUniqueWithoutShipmentInput[]
    updateMany?: TradeDocUpdateManyWithWhereWithoutShipmentInput | TradeDocUpdateManyWithWhereWithoutShipmentInput[]
    deleteMany?: TradeDocScalarWhereInput | TradeDocScalarWhereInput[]
  }

  export type ShipmentCreateNestedOneWithoutCustodyInput = {
    create?: XOR<ShipmentCreateWithoutCustodyInput, ShipmentUncheckedCreateWithoutCustodyInput>
    connectOrCreate?: ShipmentCreateOrConnectWithoutCustodyInput
    connect?: ShipmentWhereUniqueInput
  }

  export type ShipmentUpdateOneRequiredWithoutCustodyNestedInput = {
    create?: XOR<ShipmentCreateWithoutCustodyInput, ShipmentUncheckedCreateWithoutCustodyInput>
    connectOrCreate?: ShipmentCreateOrConnectWithoutCustodyInput
    upsert?: ShipmentUpsertWithoutCustodyInput
    connect?: ShipmentWhereUniqueInput
    update?: XOR<XOR<ShipmentUpdateToOneWithWhereWithoutCustodyInput, ShipmentUpdateWithoutCustodyInput>, ShipmentUncheckedUpdateWithoutCustodyInput>
  }

  export type ShipmentCreateNestedOneWithoutDocsInput = {
    create?: XOR<ShipmentCreateWithoutDocsInput, ShipmentUncheckedCreateWithoutDocsInput>
    connectOrCreate?: ShipmentCreateOrConnectWithoutDocsInput
    connect?: ShipmentWhereUniqueInput
  }

  export type ShipmentUpdateOneRequiredWithoutDocsNestedInput = {
    create?: XOR<ShipmentCreateWithoutDocsInput, ShipmentUncheckedCreateWithoutDocsInput>
    connectOrCreate?: ShipmentCreateOrConnectWithoutDocsInput
    upsert?: ShipmentUpsertWithoutDocsInput
    connect?: ShipmentWhereUniqueInput
    update?: XOR<XOR<ShipmentUpdateToOneWithWhereWithoutDocsInput, ShipmentUpdateWithoutDocsInput>, ShipmentUncheckedUpdateWithoutDocsInput>
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumSettlementStatusFieldUpdateOperationsInput = {
    set?: $Enums.SettlementStatus
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

  export type NestedEnumShipmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | EnumShipmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShipmentStatusFilter<$PrismaModel> | $Enums.ShipmentStatus
  }

  export type NestedEnumShipmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentStatus | EnumShipmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShipmentStatus[] | ListEnumShipmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShipmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShipmentStatusFilter<$PrismaModel>
    _max?: NestedEnumShipmentStatusFilter<$PrismaModel>
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

  export type NestedEnumSettlementStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementStatus | EnumSettlementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementStatusFilter<$PrismaModel> | $Enums.SettlementStatus
  }

  export type NestedEnumSettlementStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementStatus | EnumSettlementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementStatusWithAggregatesFilter<$PrismaModel> | $Enums.SettlementStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSettlementStatusFilter<$PrismaModel>
    _max?: NestedEnumSettlementStatusFilter<$PrismaModel>
  }

  export type CustodyEventCreateWithoutShipmentInput = {
    id: string
    orgId: string
    actorRef: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type CustodyEventUncheckedCreateWithoutShipmentInput = {
    id: string
    orgId: string
    actorRef: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type CustodyEventCreateOrConnectWithoutShipmentInput = {
    where: CustodyEventWhereUniqueInput
    create: XOR<CustodyEventCreateWithoutShipmentInput, CustodyEventUncheckedCreateWithoutShipmentInput>
  }

  export type CustodyEventCreateManyShipmentInputEnvelope = {
    data: CustodyEventCreateManyShipmentInput | CustodyEventCreateManyShipmentInput[]
    skipDuplicates?: boolean
  }

  export type TradeDocCreateWithoutShipmentInput = {
    id: string
    orgId: string
    docType: string
    dataHash: string
    createdAt?: Date | string
  }

  export type TradeDocUncheckedCreateWithoutShipmentInput = {
    id: string
    orgId: string
    docType: string
    dataHash: string
    createdAt?: Date | string
  }

  export type TradeDocCreateOrConnectWithoutShipmentInput = {
    where: TradeDocWhereUniqueInput
    create: XOR<TradeDocCreateWithoutShipmentInput, TradeDocUncheckedCreateWithoutShipmentInput>
  }

  export type TradeDocCreateManyShipmentInputEnvelope = {
    data: TradeDocCreateManyShipmentInput | TradeDocCreateManyShipmentInput[]
    skipDuplicates?: boolean
  }

  export type CustodyEventUpsertWithWhereUniqueWithoutShipmentInput = {
    where: CustodyEventWhereUniqueInput
    update: XOR<CustodyEventUpdateWithoutShipmentInput, CustodyEventUncheckedUpdateWithoutShipmentInput>
    create: XOR<CustodyEventCreateWithoutShipmentInput, CustodyEventUncheckedCreateWithoutShipmentInput>
  }

  export type CustodyEventUpdateWithWhereUniqueWithoutShipmentInput = {
    where: CustodyEventWhereUniqueInput
    data: XOR<CustodyEventUpdateWithoutShipmentInput, CustodyEventUncheckedUpdateWithoutShipmentInput>
  }

  export type CustodyEventUpdateManyWithWhereWithoutShipmentInput = {
    where: CustodyEventScalarWhereInput
    data: XOR<CustodyEventUpdateManyMutationInput, CustodyEventUncheckedUpdateManyWithoutShipmentInput>
  }

  export type CustodyEventScalarWhereInput = {
    AND?: CustodyEventScalarWhereInput | CustodyEventScalarWhereInput[]
    OR?: CustodyEventScalarWhereInput[]
    NOT?: CustodyEventScalarWhereInput | CustodyEventScalarWhereInput[]
    id?: StringFilter<"CustodyEvent"> | string
    orgId?: StringFilter<"CustodyEvent"> | string
    shipmentId?: StringFilter<"CustodyEvent"> | string
    actorRef?: StringFilter<"CustodyEvent"> | string
    geo?: JsonNullableFilter<"CustodyEvent">
    attestationId?: StringNullableFilter<"CustodyEvent"> | string | null
    createdAt?: DateTimeFilter<"CustodyEvent"> | Date | string
  }

  export type TradeDocUpsertWithWhereUniqueWithoutShipmentInput = {
    where: TradeDocWhereUniqueInput
    update: XOR<TradeDocUpdateWithoutShipmentInput, TradeDocUncheckedUpdateWithoutShipmentInput>
    create: XOR<TradeDocCreateWithoutShipmentInput, TradeDocUncheckedCreateWithoutShipmentInput>
  }

  export type TradeDocUpdateWithWhereUniqueWithoutShipmentInput = {
    where: TradeDocWhereUniqueInput
    data: XOR<TradeDocUpdateWithoutShipmentInput, TradeDocUncheckedUpdateWithoutShipmentInput>
  }

  export type TradeDocUpdateManyWithWhereWithoutShipmentInput = {
    where: TradeDocScalarWhereInput
    data: XOR<TradeDocUpdateManyMutationInput, TradeDocUncheckedUpdateManyWithoutShipmentInput>
  }

  export type TradeDocScalarWhereInput = {
    AND?: TradeDocScalarWhereInput | TradeDocScalarWhereInput[]
    OR?: TradeDocScalarWhereInput[]
    NOT?: TradeDocScalarWhereInput | TradeDocScalarWhereInput[]
    id?: StringFilter<"TradeDoc"> | string
    orgId?: StringFilter<"TradeDoc"> | string
    shipmentId?: StringFilter<"TradeDoc"> | string
    docType?: StringFilter<"TradeDoc"> | string
    dataHash?: StringFilter<"TradeDoc"> | string
    createdAt?: DateTimeFilter<"TradeDoc"> | Date | string
  }

  export type ShipmentCreateWithoutCustodyInput = {
    id: string
    orgId: string
    productId?: string | null
    origin: string
    destination: string
    status?: $Enums.ShipmentStatus
    createdAt?: Date | string
    docs?: TradeDocCreateNestedManyWithoutShipmentInput
  }

  export type ShipmentUncheckedCreateWithoutCustodyInput = {
    id: string
    orgId: string
    productId?: string | null
    origin: string
    destination: string
    status?: $Enums.ShipmentStatus
    createdAt?: Date | string
    docs?: TradeDocUncheckedCreateNestedManyWithoutShipmentInput
  }

  export type ShipmentCreateOrConnectWithoutCustodyInput = {
    where: ShipmentWhereUniqueInput
    create: XOR<ShipmentCreateWithoutCustodyInput, ShipmentUncheckedCreateWithoutCustodyInput>
  }

  export type ShipmentUpsertWithoutCustodyInput = {
    update: XOR<ShipmentUpdateWithoutCustodyInput, ShipmentUncheckedUpdateWithoutCustodyInput>
    create: XOR<ShipmentCreateWithoutCustodyInput, ShipmentUncheckedCreateWithoutCustodyInput>
    where?: ShipmentWhereInput
  }

  export type ShipmentUpdateToOneWithWhereWithoutCustodyInput = {
    where?: ShipmentWhereInput
    data: XOR<ShipmentUpdateWithoutCustodyInput, ShipmentUncheckedUpdateWithoutCustodyInput>
  }

  export type ShipmentUpdateWithoutCustodyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    docs?: TradeDocUpdateManyWithoutShipmentNestedInput
  }

  export type ShipmentUncheckedUpdateWithoutCustodyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    docs?: TradeDocUncheckedUpdateManyWithoutShipmentNestedInput
  }

  export type ShipmentCreateWithoutDocsInput = {
    id: string
    orgId: string
    productId?: string | null
    origin: string
    destination: string
    status?: $Enums.ShipmentStatus
    createdAt?: Date | string
    custody?: CustodyEventCreateNestedManyWithoutShipmentInput
  }

  export type ShipmentUncheckedCreateWithoutDocsInput = {
    id: string
    orgId: string
    productId?: string | null
    origin: string
    destination: string
    status?: $Enums.ShipmentStatus
    createdAt?: Date | string
    custody?: CustodyEventUncheckedCreateNestedManyWithoutShipmentInput
  }

  export type ShipmentCreateOrConnectWithoutDocsInput = {
    where: ShipmentWhereUniqueInput
    create: XOR<ShipmentCreateWithoutDocsInput, ShipmentUncheckedCreateWithoutDocsInput>
  }

  export type ShipmentUpsertWithoutDocsInput = {
    update: XOR<ShipmentUpdateWithoutDocsInput, ShipmentUncheckedUpdateWithoutDocsInput>
    create: XOR<ShipmentCreateWithoutDocsInput, ShipmentUncheckedCreateWithoutDocsInput>
    where?: ShipmentWhereInput
  }

  export type ShipmentUpdateToOneWithWhereWithoutDocsInput = {
    where?: ShipmentWhereInput
    data: XOR<ShipmentUpdateWithoutDocsInput, ShipmentUncheckedUpdateWithoutDocsInput>
  }

  export type ShipmentUpdateWithoutDocsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    custody?: CustodyEventUpdateManyWithoutShipmentNestedInput
  }

  export type ShipmentUncheckedUpdateWithoutDocsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    origin?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    status?: EnumShipmentStatusFieldUpdateOperationsInput | $Enums.ShipmentStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    custody?: CustodyEventUncheckedUpdateManyWithoutShipmentNestedInput
  }

  export type CustodyEventCreateManyShipmentInput = {
    id: string
    orgId: string
    actorRef: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type TradeDocCreateManyShipmentInput = {
    id: string
    orgId: string
    docType: string
    dataHash: string
    createdAt?: Date | string
  }

  export type CustodyEventUpdateWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    actorRef?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustodyEventUncheckedUpdateWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    actorRef?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustodyEventUncheckedUpdateManyWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    actorRef?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeDocUpdateWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    dataHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeDocUncheckedUpdateWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    dataHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeDocUncheckedUpdateManyWithoutShipmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    docType?: StringFieldUpdateOperationsInput | string
    dataHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ShipmentCountOutputTypeDefaultArgs instead
     */
    export type ShipmentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ShipmentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventOutboxDefaultArgs instead
     */
    export type EventOutboxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventOutboxDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductDefaultArgs instead
     */
    export type ProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ShipmentDefaultArgs instead
     */
    export type ShipmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ShipmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustodyEventDefaultArgs instead
     */
    export type CustodyEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustodyEventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TradeDocDefaultArgs instead
     */
    export type TradeDocArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TradeDocDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TradeFinanceDefaultArgs instead
     */
    export type TradeFinanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TradeFinanceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ScmSettlementDefaultArgs instead
     */
    export type ScmSettlementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ScmSettlementDefaultArgs<ExtArgs>

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