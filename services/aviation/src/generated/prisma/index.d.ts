
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
 * Model Aircraft
 * 
 */
export type Aircraft = $Result.DefaultSelection<Prisma.$AircraftPayload>
/**
 * Model Part
 * 
 */
export type Part = $Result.DefaultSelection<Prisma.$PartPayload>
/**
 * Model MaintenanceEvent
 * 
 */
export type MaintenanceEvent = $Result.DefaultSelection<Prisma.$MaintenanceEventPayload>
/**
 * Model AirworthinessCert
 * 
 */
export type AirworthinessCert = $Result.DefaultSelection<Prisma.$AirworthinessCertPayload>
/**
 * Model AviationSettlement
 * 
 */
export type AviationSettlement = $Result.DefaultSelection<Prisma.$AviationSettlementPayload>

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


export const PartLifecycle: {
  NEW: 'NEW',
  INSTALLED: 'INSTALLED',
  REMOVED: 'REMOVED',
  SCRAPPED: 'SCRAPPED'
};

export type PartLifecycle = (typeof PartLifecycle)[keyof typeof PartLifecycle]


export const AviationSettlementStatus: {
  PENDING: 'PENDING',
  ESCROW_FUNDED: 'ESCROW_FUNDED',
  SETTLED: 'SETTLED',
  CANCELLED: 'CANCELLED'
};

export type AviationSettlementStatus = (typeof AviationSettlementStatus)[keyof typeof AviationSettlementStatus]

}

export type OutboxStatus = $Enums.OutboxStatus

export const OutboxStatus: typeof $Enums.OutboxStatus

export type PartLifecycle = $Enums.PartLifecycle

export const PartLifecycle: typeof $Enums.PartLifecycle

export type AviationSettlementStatus = $Enums.AviationSettlementStatus

export const AviationSettlementStatus: typeof $Enums.AviationSettlementStatus

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
   * `prisma.aircraft`: Exposes CRUD operations for the **Aircraft** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Aircraft
    * const aircraft = await prisma.aircraft.findMany()
    * ```
    */
  get aircraft(): Prisma.AircraftDelegate<ExtArgs>;

  /**
   * `prisma.part`: Exposes CRUD operations for the **Part** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parts
    * const parts = await prisma.part.findMany()
    * ```
    */
  get part(): Prisma.PartDelegate<ExtArgs>;

  /**
   * `prisma.maintenanceEvent`: Exposes CRUD operations for the **MaintenanceEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MaintenanceEvents
    * const maintenanceEvents = await prisma.maintenanceEvent.findMany()
    * ```
    */
  get maintenanceEvent(): Prisma.MaintenanceEventDelegate<ExtArgs>;

  /**
   * `prisma.airworthinessCert`: Exposes CRUD operations for the **AirworthinessCert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AirworthinessCerts
    * const airworthinessCerts = await prisma.airworthinessCert.findMany()
    * ```
    */
  get airworthinessCert(): Prisma.AirworthinessCertDelegate<ExtArgs>;

  /**
   * `prisma.aviationSettlement`: Exposes CRUD operations for the **AviationSettlement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AviationSettlements
    * const aviationSettlements = await prisma.aviationSettlement.findMany()
    * ```
    */
  get aviationSettlement(): Prisma.AviationSettlementDelegate<ExtArgs>;
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
    Aircraft: 'Aircraft',
    Part: 'Part',
    MaintenanceEvent: 'MaintenanceEvent',
    AirworthinessCert: 'AirworthinessCert',
    AviationSettlement: 'AviationSettlement'
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
      modelProps: "eventOutbox" | "aircraft" | "part" | "maintenanceEvent" | "airworthinessCert" | "aviationSettlement"
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
      Aircraft: {
        payload: Prisma.$AircraftPayload<ExtArgs>
        fields: Prisma.AircraftFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AircraftFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AircraftFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          findFirst: {
            args: Prisma.AircraftFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AircraftFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          findMany: {
            args: Prisma.AircraftFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>[]
          }
          create: {
            args: Prisma.AircraftCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          createMany: {
            args: Prisma.AircraftCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AircraftCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>[]
          }
          delete: {
            args: Prisma.AircraftDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          update: {
            args: Prisma.AircraftUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          deleteMany: {
            args: Prisma.AircraftDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AircraftUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AircraftUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          aggregate: {
            args: Prisma.AircraftAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAircraft>
          }
          groupBy: {
            args: Prisma.AircraftGroupByArgs<ExtArgs>
            result: $Utils.Optional<AircraftGroupByOutputType>[]
          }
          count: {
            args: Prisma.AircraftCountArgs<ExtArgs>
            result: $Utils.Optional<AircraftCountAggregateOutputType> | number
          }
        }
      }
      Part: {
        payload: Prisma.$PartPayload<ExtArgs>
        fields: Prisma.PartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          findFirst: {
            args: Prisma.PartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          findMany: {
            args: Prisma.PartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>[]
          }
          create: {
            args: Prisma.PartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          createMany: {
            args: Prisma.PartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PartCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>[]
          }
          delete: {
            args: Prisma.PartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          update: {
            args: Prisma.PartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          deleteMany: {
            args: Prisma.PartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          aggregate: {
            args: Prisma.PartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePart>
          }
          groupBy: {
            args: Prisma.PartGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartCountArgs<ExtArgs>
            result: $Utils.Optional<PartCountAggregateOutputType> | number
          }
        }
      }
      MaintenanceEvent: {
        payload: Prisma.$MaintenanceEventPayload<ExtArgs>
        fields: Prisma.MaintenanceEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MaintenanceEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MaintenanceEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceEventPayload>
          }
          findFirst: {
            args: Prisma.MaintenanceEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MaintenanceEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceEventPayload>
          }
          findMany: {
            args: Prisma.MaintenanceEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceEventPayload>[]
          }
          create: {
            args: Prisma.MaintenanceEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceEventPayload>
          }
          createMany: {
            args: Prisma.MaintenanceEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MaintenanceEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceEventPayload>[]
          }
          delete: {
            args: Prisma.MaintenanceEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceEventPayload>
          }
          update: {
            args: Prisma.MaintenanceEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceEventPayload>
          }
          deleteMany: {
            args: Prisma.MaintenanceEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MaintenanceEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MaintenanceEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MaintenanceEventPayload>
          }
          aggregate: {
            args: Prisma.MaintenanceEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMaintenanceEvent>
          }
          groupBy: {
            args: Prisma.MaintenanceEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<MaintenanceEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.MaintenanceEventCountArgs<ExtArgs>
            result: $Utils.Optional<MaintenanceEventCountAggregateOutputType> | number
          }
        }
      }
      AirworthinessCert: {
        payload: Prisma.$AirworthinessCertPayload<ExtArgs>
        fields: Prisma.AirworthinessCertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AirworthinessCertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirworthinessCertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AirworthinessCertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirworthinessCertPayload>
          }
          findFirst: {
            args: Prisma.AirworthinessCertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirworthinessCertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AirworthinessCertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirworthinessCertPayload>
          }
          findMany: {
            args: Prisma.AirworthinessCertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirworthinessCertPayload>[]
          }
          create: {
            args: Prisma.AirworthinessCertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirworthinessCertPayload>
          }
          createMany: {
            args: Prisma.AirworthinessCertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AirworthinessCertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirworthinessCertPayload>[]
          }
          delete: {
            args: Prisma.AirworthinessCertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirworthinessCertPayload>
          }
          update: {
            args: Prisma.AirworthinessCertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirworthinessCertPayload>
          }
          deleteMany: {
            args: Prisma.AirworthinessCertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AirworthinessCertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AirworthinessCertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AirworthinessCertPayload>
          }
          aggregate: {
            args: Prisma.AirworthinessCertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAirworthinessCert>
          }
          groupBy: {
            args: Prisma.AirworthinessCertGroupByArgs<ExtArgs>
            result: $Utils.Optional<AirworthinessCertGroupByOutputType>[]
          }
          count: {
            args: Prisma.AirworthinessCertCountArgs<ExtArgs>
            result: $Utils.Optional<AirworthinessCertCountAggregateOutputType> | number
          }
        }
      }
      AviationSettlement: {
        payload: Prisma.$AviationSettlementPayload<ExtArgs>
        fields: Prisma.AviationSettlementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AviationSettlementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AviationSettlementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AviationSettlementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AviationSettlementPayload>
          }
          findFirst: {
            args: Prisma.AviationSettlementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AviationSettlementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AviationSettlementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AviationSettlementPayload>
          }
          findMany: {
            args: Prisma.AviationSettlementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AviationSettlementPayload>[]
          }
          create: {
            args: Prisma.AviationSettlementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AviationSettlementPayload>
          }
          createMany: {
            args: Prisma.AviationSettlementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AviationSettlementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AviationSettlementPayload>[]
          }
          delete: {
            args: Prisma.AviationSettlementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AviationSettlementPayload>
          }
          update: {
            args: Prisma.AviationSettlementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AviationSettlementPayload>
          }
          deleteMany: {
            args: Prisma.AviationSettlementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AviationSettlementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AviationSettlementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AviationSettlementPayload>
          }
          aggregate: {
            args: Prisma.AviationSettlementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAviationSettlement>
          }
          groupBy: {
            args: Prisma.AviationSettlementGroupByArgs<ExtArgs>
            result: $Utils.Optional<AviationSettlementGroupByOutputType>[]
          }
          count: {
            args: Prisma.AviationSettlementCountArgs<ExtArgs>
            result: $Utils.Optional<AviationSettlementCountAggregateOutputType> | number
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
   * Count Type AircraftCountOutputType
   */

  export type AircraftCountOutputType = {
    parts: number
  }

  export type AircraftCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parts?: boolean | AircraftCountOutputTypeCountPartsArgs
  }

  // Custom InputTypes
  /**
   * AircraftCountOutputType without action
   */
  export type AircraftCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftCountOutputType
     */
    select?: AircraftCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AircraftCountOutputType without action
   */
  export type AircraftCountOutputTypeCountPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartWhereInput
  }


  /**
   * Count Type PartCountOutputType
   */

  export type PartCountOutputType = {
    maintenance: number
  }

  export type PartCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    maintenance?: boolean | PartCountOutputTypeCountMaintenanceArgs
  }

  // Custom InputTypes
  /**
   * PartCountOutputType without action
   */
  export type PartCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCountOutputType
     */
    select?: PartCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PartCountOutputType without action
   */
  export type PartCountOutputTypeCountMaintenanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaintenanceEventWhereInput
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
   * Model Aircraft
   */

  export type AggregateAircraft = {
    _count: AircraftCountAggregateOutputType | null
    _min: AircraftMinAggregateOutputType | null
    _max: AircraftMaxAggregateOutputType | null
  }

  export type AircraftMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    tail: string | null
    model: string | null
    ownerRef: string | null
    createdAt: Date | null
  }

  export type AircraftMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    tail: string | null
    model: string | null
    ownerRef: string | null
    createdAt: Date | null
  }

  export type AircraftCountAggregateOutputType = {
    id: number
    orgId: number
    tail: number
    model: number
    ownerRef: number
    createdAt: number
    _all: number
  }


  export type AircraftMinAggregateInputType = {
    id?: true
    orgId?: true
    tail?: true
    model?: true
    ownerRef?: true
    createdAt?: true
  }

  export type AircraftMaxAggregateInputType = {
    id?: true
    orgId?: true
    tail?: true
    model?: true
    ownerRef?: true
    createdAt?: true
  }

  export type AircraftCountAggregateInputType = {
    id?: true
    orgId?: true
    tail?: true
    model?: true
    ownerRef?: true
    createdAt?: true
    _all?: true
  }

  export type AircraftAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Aircraft to aggregate.
     */
    where?: AircraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aircraft to fetch.
     */
    orderBy?: AircraftOrderByWithRelationInput | AircraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AircraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aircraft from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aircraft.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Aircraft
    **/
    _count?: true | AircraftCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AircraftMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AircraftMaxAggregateInputType
  }

  export type GetAircraftAggregateType<T extends AircraftAggregateArgs> = {
        [P in keyof T & keyof AggregateAircraft]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAircraft[P]>
      : GetScalarType<T[P], AggregateAircraft[P]>
  }




  export type AircraftGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AircraftWhereInput
    orderBy?: AircraftOrderByWithAggregationInput | AircraftOrderByWithAggregationInput[]
    by: AircraftScalarFieldEnum[] | AircraftScalarFieldEnum
    having?: AircraftScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AircraftCountAggregateInputType | true
    _min?: AircraftMinAggregateInputType
    _max?: AircraftMaxAggregateInputType
  }

  export type AircraftGroupByOutputType = {
    id: string
    orgId: string
    tail: string
    model: string
    ownerRef: string
    createdAt: Date
    _count: AircraftCountAggregateOutputType | null
    _min: AircraftMinAggregateOutputType | null
    _max: AircraftMaxAggregateOutputType | null
  }

  type GetAircraftGroupByPayload<T extends AircraftGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AircraftGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AircraftGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AircraftGroupByOutputType[P]>
            : GetScalarType<T[P], AircraftGroupByOutputType[P]>
        }
      >
    >


  export type AircraftSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    tail?: boolean
    model?: boolean
    ownerRef?: boolean
    createdAt?: boolean
    parts?: boolean | Aircraft$partsArgs<ExtArgs>
    _count?: boolean | AircraftCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aircraft"]>

  export type AircraftSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    tail?: boolean
    model?: boolean
    ownerRef?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aircraft"]>

  export type AircraftSelectScalar = {
    id?: boolean
    orgId?: boolean
    tail?: boolean
    model?: boolean
    ownerRef?: boolean
    createdAt?: boolean
  }

  export type AircraftInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parts?: boolean | Aircraft$partsArgs<ExtArgs>
    _count?: boolean | AircraftCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AircraftIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AircraftPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Aircraft"
    objects: {
      parts: Prisma.$PartPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      tail: string
      model: string
      ownerRef: string
      createdAt: Date
    }, ExtArgs["result"]["aircraft"]>
    composites: {}
  }

  type AircraftGetPayload<S extends boolean | null | undefined | AircraftDefaultArgs> = $Result.GetResult<Prisma.$AircraftPayload, S>

  type AircraftCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AircraftFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AircraftCountAggregateInputType | true
    }

  export interface AircraftDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Aircraft'], meta: { name: 'Aircraft' } }
    /**
     * Find zero or one Aircraft that matches the filter.
     * @param {AircraftFindUniqueArgs} args - Arguments to find a Aircraft
     * @example
     * // Get one Aircraft
     * const aircraft = await prisma.aircraft.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AircraftFindUniqueArgs>(args: SelectSubset<T, AircraftFindUniqueArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Aircraft that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AircraftFindUniqueOrThrowArgs} args - Arguments to find a Aircraft
     * @example
     * // Get one Aircraft
     * const aircraft = await prisma.aircraft.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AircraftFindUniqueOrThrowArgs>(args: SelectSubset<T, AircraftFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Aircraft that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftFindFirstArgs} args - Arguments to find a Aircraft
     * @example
     * // Get one Aircraft
     * const aircraft = await prisma.aircraft.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AircraftFindFirstArgs>(args?: SelectSubset<T, AircraftFindFirstArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Aircraft that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftFindFirstOrThrowArgs} args - Arguments to find a Aircraft
     * @example
     * // Get one Aircraft
     * const aircraft = await prisma.aircraft.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AircraftFindFirstOrThrowArgs>(args?: SelectSubset<T, AircraftFindFirstOrThrowArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Aircraft that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Aircraft
     * const aircraft = await prisma.aircraft.findMany()
     * 
     * // Get first 10 Aircraft
     * const aircraft = await prisma.aircraft.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aircraftWithIdOnly = await prisma.aircraft.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AircraftFindManyArgs>(args?: SelectSubset<T, AircraftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Aircraft.
     * @param {AircraftCreateArgs} args - Arguments to create a Aircraft.
     * @example
     * // Create one Aircraft
     * const Aircraft = await prisma.aircraft.create({
     *   data: {
     *     // ... data to create a Aircraft
     *   }
     * })
     * 
     */
    create<T extends AircraftCreateArgs>(args: SelectSubset<T, AircraftCreateArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Aircraft.
     * @param {AircraftCreateManyArgs} args - Arguments to create many Aircraft.
     * @example
     * // Create many Aircraft
     * const aircraft = await prisma.aircraft.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AircraftCreateManyArgs>(args?: SelectSubset<T, AircraftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Aircraft and returns the data saved in the database.
     * @param {AircraftCreateManyAndReturnArgs} args - Arguments to create many Aircraft.
     * @example
     * // Create many Aircraft
     * const aircraft = await prisma.aircraft.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Aircraft and only return the `id`
     * const aircraftWithIdOnly = await prisma.aircraft.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AircraftCreateManyAndReturnArgs>(args?: SelectSubset<T, AircraftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Aircraft.
     * @param {AircraftDeleteArgs} args - Arguments to delete one Aircraft.
     * @example
     * // Delete one Aircraft
     * const Aircraft = await prisma.aircraft.delete({
     *   where: {
     *     // ... filter to delete one Aircraft
     *   }
     * })
     * 
     */
    delete<T extends AircraftDeleteArgs>(args: SelectSubset<T, AircraftDeleteArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Aircraft.
     * @param {AircraftUpdateArgs} args - Arguments to update one Aircraft.
     * @example
     * // Update one Aircraft
     * const aircraft = await prisma.aircraft.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AircraftUpdateArgs>(args: SelectSubset<T, AircraftUpdateArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Aircraft.
     * @param {AircraftDeleteManyArgs} args - Arguments to filter Aircraft to delete.
     * @example
     * // Delete a few Aircraft
     * const { count } = await prisma.aircraft.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AircraftDeleteManyArgs>(args?: SelectSubset<T, AircraftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Aircraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Aircraft
     * const aircraft = await prisma.aircraft.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AircraftUpdateManyArgs>(args: SelectSubset<T, AircraftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Aircraft.
     * @param {AircraftUpsertArgs} args - Arguments to update or create a Aircraft.
     * @example
     * // Update or create a Aircraft
     * const aircraft = await prisma.aircraft.upsert({
     *   create: {
     *     // ... data to create a Aircraft
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Aircraft we want to update
     *   }
     * })
     */
    upsert<T extends AircraftUpsertArgs>(args: SelectSubset<T, AircraftUpsertArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Aircraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftCountArgs} args - Arguments to filter Aircraft to count.
     * @example
     * // Count the number of Aircraft
     * const count = await prisma.aircraft.count({
     *   where: {
     *     // ... the filter for the Aircraft we want to count
     *   }
     * })
    **/
    count<T extends AircraftCountArgs>(
      args?: Subset<T, AircraftCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AircraftCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Aircraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AircraftAggregateArgs>(args: Subset<T, AircraftAggregateArgs>): Prisma.PrismaPromise<GetAircraftAggregateType<T>>

    /**
     * Group by Aircraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftGroupByArgs} args - Group by arguments.
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
      T extends AircraftGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AircraftGroupByArgs['orderBy'] }
        : { orderBy?: AircraftGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AircraftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAircraftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Aircraft model
   */
  readonly fields: AircraftFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Aircraft.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AircraftClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parts<T extends Aircraft$partsArgs<ExtArgs> = {}>(args?: Subset<T, Aircraft$partsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Aircraft model
   */ 
  interface AircraftFieldRefs {
    readonly id: FieldRef<"Aircraft", 'String'>
    readonly orgId: FieldRef<"Aircraft", 'String'>
    readonly tail: FieldRef<"Aircraft", 'String'>
    readonly model: FieldRef<"Aircraft", 'String'>
    readonly ownerRef: FieldRef<"Aircraft", 'String'>
    readonly createdAt: FieldRef<"Aircraft", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Aircraft findUnique
   */
  export type AircraftFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter, which Aircraft to fetch.
     */
    where: AircraftWhereUniqueInput
  }

  /**
   * Aircraft findUniqueOrThrow
   */
  export type AircraftFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter, which Aircraft to fetch.
     */
    where: AircraftWhereUniqueInput
  }

  /**
   * Aircraft findFirst
   */
  export type AircraftFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter, which Aircraft to fetch.
     */
    where?: AircraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aircraft to fetch.
     */
    orderBy?: AircraftOrderByWithRelationInput | AircraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Aircraft.
     */
    cursor?: AircraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aircraft from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aircraft.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Aircraft.
     */
    distinct?: AircraftScalarFieldEnum | AircraftScalarFieldEnum[]
  }

  /**
   * Aircraft findFirstOrThrow
   */
  export type AircraftFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter, which Aircraft to fetch.
     */
    where?: AircraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aircraft to fetch.
     */
    orderBy?: AircraftOrderByWithRelationInput | AircraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Aircraft.
     */
    cursor?: AircraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aircraft from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aircraft.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Aircraft.
     */
    distinct?: AircraftScalarFieldEnum | AircraftScalarFieldEnum[]
  }

  /**
   * Aircraft findMany
   */
  export type AircraftFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter, which Aircraft to fetch.
     */
    where?: AircraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aircraft to fetch.
     */
    orderBy?: AircraftOrderByWithRelationInput | AircraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Aircraft.
     */
    cursor?: AircraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aircraft from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aircraft.
     */
    skip?: number
    distinct?: AircraftScalarFieldEnum | AircraftScalarFieldEnum[]
  }

  /**
   * Aircraft create
   */
  export type AircraftCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * The data needed to create a Aircraft.
     */
    data: XOR<AircraftCreateInput, AircraftUncheckedCreateInput>
  }

  /**
   * Aircraft createMany
   */
  export type AircraftCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Aircraft.
     */
    data: AircraftCreateManyInput | AircraftCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Aircraft createManyAndReturn
   */
  export type AircraftCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Aircraft.
     */
    data: AircraftCreateManyInput | AircraftCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Aircraft update
   */
  export type AircraftUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * The data needed to update a Aircraft.
     */
    data: XOR<AircraftUpdateInput, AircraftUncheckedUpdateInput>
    /**
     * Choose, which Aircraft to update.
     */
    where: AircraftWhereUniqueInput
  }

  /**
   * Aircraft updateMany
   */
  export type AircraftUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Aircraft.
     */
    data: XOR<AircraftUpdateManyMutationInput, AircraftUncheckedUpdateManyInput>
    /**
     * Filter which Aircraft to update
     */
    where?: AircraftWhereInput
  }

  /**
   * Aircraft upsert
   */
  export type AircraftUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * The filter to search for the Aircraft to update in case it exists.
     */
    where: AircraftWhereUniqueInput
    /**
     * In case the Aircraft found by the `where` argument doesn't exist, create a new Aircraft with this data.
     */
    create: XOR<AircraftCreateInput, AircraftUncheckedCreateInput>
    /**
     * In case the Aircraft was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AircraftUpdateInput, AircraftUncheckedUpdateInput>
  }

  /**
   * Aircraft delete
   */
  export type AircraftDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter which Aircraft to delete.
     */
    where: AircraftWhereUniqueInput
  }

  /**
   * Aircraft deleteMany
   */
  export type AircraftDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Aircraft to delete
     */
    where?: AircraftWhereInput
  }

  /**
   * Aircraft.parts
   */
  export type Aircraft$partsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    where?: PartWhereInput
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    cursor?: PartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Aircraft without action
   */
  export type AircraftDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
  }


  /**
   * Model Part
   */

  export type AggregatePart = {
    _count: PartCountAggregateOutputType | null
    _min: PartMinAggregateOutputType | null
    _max: PartMaxAggregateOutputType | null
  }

  export type PartMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    aircraftId: string | null
    serial: string | null
    partType: string | null
    lifecycleStatus: $Enums.PartLifecycle | null
    tokenId: string | null
    createdAt: Date | null
  }

  export type PartMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    aircraftId: string | null
    serial: string | null
    partType: string | null
    lifecycleStatus: $Enums.PartLifecycle | null
    tokenId: string | null
    createdAt: Date | null
  }

  export type PartCountAggregateOutputType = {
    id: number
    orgId: number
    aircraftId: number
    serial: number
    partType: number
    lifecycleStatus: number
    tokenId: number
    createdAt: number
    _all: number
  }


  export type PartMinAggregateInputType = {
    id?: true
    orgId?: true
    aircraftId?: true
    serial?: true
    partType?: true
    lifecycleStatus?: true
    tokenId?: true
    createdAt?: true
  }

  export type PartMaxAggregateInputType = {
    id?: true
    orgId?: true
    aircraftId?: true
    serial?: true
    partType?: true
    lifecycleStatus?: true
    tokenId?: true
    createdAt?: true
  }

  export type PartCountAggregateInputType = {
    id?: true
    orgId?: true
    aircraftId?: true
    serial?: true
    partType?: true
    lifecycleStatus?: true
    tokenId?: true
    createdAt?: true
    _all?: true
  }

  export type PartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Part to aggregate.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Parts
    **/
    _count?: true | PartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartMaxAggregateInputType
  }

  export type GetPartAggregateType<T extends PartAggregateArgs> = {
        [P in keyof T & keyof AggregatePart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePart[P]>
      : GetScalarType<T[P], AggregatePart[P]>
  }




  export type PartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartWhereInput
    orderBy?: PartOrderByWithAggregationInput | PartOrderByWithAggregationInput[]
    by: PartScalarFieldEnum[] | PartScalarFieldEnum
    having?: PartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartCountAggregateInputType | true
    _min?: PartMinAggregateInputType
    _max?: PartMaxAggregateInputType
  }

  export type PartGroupByOutputType = {
    id: string
    orgId: string
    aircraftId: string | null
    serial: string
    partType: string
    lifecycleStatus: $Enums.PartLifecycle
    tokenId: string | null
    createdAt: Date
    _count: PartCountAggregateOutputType | null
    _min: PartMinAggregateOutputType | null
    _max: PartMaxAggregateOutputType | null
  }

  type GetPartGroupByPayload<T extends PartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartGroupByOutputType[P]>
            : GetScalarType<T[P], PartGroupByOutputType[P]>
        }
      >
    >


  export type PartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    aircraftId?: boolean
    serial?: boolean
    partType?: boolean
    lifecycleStatus?: boolean
    tokenId?: boolean
    createdAt?: boolean
    aircraft?: boolean | Part$aircraftArgs<ExtArgs>
    maintenance?: boolean | Part$maintenanceArgs<ExtArgs>
    _count?: boolean | PartCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["part"]>

  export type PartSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    aircraftId?: boolean
    serial?: boolean
    partType?: boolean
    lifecycleStatus?: boolean
    tokenId?: boolean
    createdAt?: boolean
    aircraft?: boolean | Part$aircraftArgs<ExtArgs>
  }, ExtArgs["result"]["part"]>

  export type PartSelectScalar = {
    id?: boolean
    orgId?: boolean
    aircraftId?: boolean
    serial?: boolean
    partType?: boolean
    lifecycleStatus?: boolean
    tokenId?: boolean
    createdAt?: boolean
  }

  export type PartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aircraft?: boolean | Part$aircraftArgs<ExtArgs>
    maintenance?: boolean | Part$maintenanceArgs<ExtArgs>
    _count?: boolean | PartCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PartIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aircraft?: boolean | Part$aircraftArgs<ExtArgs>
  }

  export type $PartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Part"
    objects: {
      aircraft: Prisma.$AircraftPayload<ExtArgs> | null
      maintenance: Prisma.$MaintenanceEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      aircraftId: string | null
      serial: string
      partType: string
      lifecycleStatus: $Enums.PartLifecycle
      tokenId: string | null
      createdAt: Date
    }, ExtArgs["result"]["part"]>
    composites: {}
  }

  type PartGetPayload<S extends boolean | null | undefined | PartDefaultArgs> = $Result.GetResult<Prisma.$PartPayload, S>

  type PartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PartFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PartCountAggregateInputType | true
    }

  export interface PartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Part'], meta: { name: 'Part' } }
    /**
     * Find zero or one Part that matches the filter.
     * @param {PartFindUniqueArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartFindUniqueArgs>(args: SelectSubset<T, PartFindUniqueArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Part that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PartFindUniqueOrThrowArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartFindUniqueOrThrowArgs>(args: SelectSubset<T, PartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Part that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindFirstArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartFindFirstArgs>(args?: SelectSubset<T, PartFindFirstArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Part that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindFirstOrThrowArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartFindFirstOrThrowArgs>(args?: SelectSubset<T, PartFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Parts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parts
     * const parts = await prisma.part.findMany()
     * 
     * // Get first 10 Parts
     * const parts = await prisma.part.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partWithIdOnly = await prisma.part.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartFindManyArgs>(args?: SelectSubset<T, PartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Part.
     * @param {PartCreateArgs} args - Arguments to create a Part.
     * @example
     * // Create one Part
     * const Part = await prisma.part.create({
     *   data: {
     *     // ... data to create a Part
     *   }
     * })
     * 
     */
    create<T extends PartCreateArgs>(args: SelectSubset<T, PartCreateArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Parts.
     * @param {PartCreateManyArgs} args - Arguments to create many Parts.
     * @example
     * // Create many Parts
     * const part = await prisma.part.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartCreateManyArgs>(args?: SelectSubset<T, PartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Parts and returns the data saved in the database.
     * @param {PartCreateManyAndReturnArgs} args - Arguments to create many Parts.
     * @example
     * // Create many Parts
     * const part = await prisma.part.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Parts and only return the `id`
     * const partWithIdOnly = await prisma.part.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PartCreateManyAndReturnArgs>(args?: SelectSubset<T, PartCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Part.
     * @param {PartDeleteArgs} args - Arguments to delete one Part.
     * @example
     * // Delete one Part
     * const Part = await prisma.part.delete({
     *   where: {
     *     // ... filter to delete one Part
     *   }
     * })
     * 
     */
    delete<T extends PartDeleteArgs>(args: SelectSubset<T, PartDeleteArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Part.
     * @param {PartUpdateArgs} args - Arguments to update one Part.
     * @example
     * // Update one Part
     * const part = await prisma.part.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartUpdateArgs>(args: SelectSubset<T, PartUpdateArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Parts.
     * @param {PartDeleteManyArgs} args - Arguments to filter Parts to delete.
     * @example
     * // Delete a few Parts
     * const { count } = await prisma.part.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartDeleteManyArgs>(args?: SelectSubset<T, PartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parts
     * const part = await prisma.part.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartUpdateManyArgs>(args: SelectSubset<T, PartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Part.
     * @param {PartUpsertArgs} args - Arguments to update or create a Part.
     * @example
     * // Update or create a Part
     * const part = await prisma.part.upsert({
     *   create: {
     *     // ... data to create a Part
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Part we want to update
     *   }
     * })
     */
    upsert<T extends PartUpsertArgs>(args: SelectSubset<T, PartUpsertArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Parts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartCountArgs} args - Arguments to filter Parts to count.
     * @example
     * // Count the number of Parts
     * const count = await prisma.part.count({
     *   where: {
     *     // ... the filter for the Parts we want to count
     *   }
     * })
    **/
    count<T extends PartCountArgs>(
      args?: Subset<T, PartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Part.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PartAggregateArgs>(args: Subset<T, PartAggregateArgs>): Prisma.PrismaPromise<GetPartAggregateType<T>>

    /**
     * Group by Part.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartGroupByArgs} args - Group by arguments.
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
      T extends PartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartGroupByArgs['orderBy'] }
        : { orderBy?: PartGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Part model
   */
  readonly fields: PartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Part.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    aircraft<T extends Part$aircraftArgs<ExtArgs> = {}>(args?: Subset<T, Part$aircraftArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    maintenance<T extends Part$maintenanceArgs<ExtArgs> = {}>(args?: Subset<T, Part$maintenanceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaintenanceEventPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Part model
   */ 
  interface PartFieldRefs {
    readonly id: FieldRef<"Part", 'String'>
    readonly orgId: FieldRef<"Part", 'String'>
    readonly aircraftId: FieldRef<"Part", 'String'>
    readonly serial: FieldRef<"Part", 'String'>
    readonly partType: FieldRef<"Part", 'String'>
    readonly lifecycleStatus: FieldRef<"Part", 'PartLifecycle'>
    readonly tokenId: FieldRef<"Part", 'String'>
    readonly createdAt: FieldRef<"Part", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Part findUnique
   */
  export type PartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part findUniqueOrThrow
   */
  export type PartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part findFirst
   */
  export type PartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part findFirstOrThrow
   */
  export type PartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part findMany
   */
  export type PartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Parts to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part create
   */
  export type PartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The data needed to create a Part.
     */
    data: XOR<PartCreateInput, PartUncheckedCreateInput>
  }

  /**
   * Part createMany
   */
  export type PartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Parts.
     */
    data: PartCreateManyInput | PartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Part createManyAndReturn
   */
  export type PartCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Parts.
     */
    data: PartCreateManyInput | PartCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Part update
   */
  export type PartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The data needed to update a Part.
     */
    data: XOR<PartUpdateInput, PartUncheckedUpdateInput>
    /**
     * Choose, which Part to update.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part updateMany
   */
  export type PartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Parts.
     */
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyInput>
    /**
     * Filter which Parts to update
     */
    where?: PartWhereInput
  }

  /**
   * Part upsert
   */
  export type PartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The filter to search for the Part to update in case it exists.
     */
    where: PartWhereUniqueInput
    /**
     * In case the Part found by the `where` argument doesn't exist, create a new Part with this data.
     */
    create: XOR<PartCreateInput, PartUncheckedCreateInput>
    /**
     * In case the Part was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartUpdateInput, PartUncheckedUpdateInput>
  }

  /**
   * Part delete
   */
  export type PartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter which Part to delete.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part deleteMany
   */
  export type PartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parts to delete
     */
    where?: PartWhereInput
  }

  /**
   * Part.aircraft
   */
  export type Part$aircraftArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    where?: AircraftWhereInput
  }

  /**
   * Part.maintenance
   */
  export type Part$maintenanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceEvent
     */
    select?: MaintenanceEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceEventInclude<ExtArgs> | null
    where?: MaintenanceEventWhereInput
    orderBy?: MaintenanceEventOrderByWithRelationInput | MaintenanceEventOrderByWithRelationInput[]
    cursor?: MaintenanceEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MaintenanceEventScalarFieldEnum | MaintenanceEventScalarFieldEnum[]
  }

  /**
   * Part without action
   */
  export type PartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
  }


  /**
   * Model MaintenanceEvent
   */

  export type AggregateMaintenanceEvent = {
    _count: MaintenanceEventCountAggregateOutputType | null
    _min: MaintenanceEventMinAggregateOutputType | null
    _max: MaintenanceEventMaxAggregateOutputType | null
  }

  export type MaintenanceEventMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    partId: string | null
    action: string | null
    technicianRef: string | null
    attestationId: string | null
    createdAt: Date | null
  }

  export type MaintenanceEventMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    partId: string | null
    action: string | null
    technicianRef: string | null
    attestationId: string | null
    createdAt: Date | null
  }

  export type MaintenanceEventCountAggregateOutputType = {
    id: number
    orgId: number
    partId: number
    action: number
    technicianRef: number
    attestationId: number
    createdAt: number
    _all: number
  }


  export type MaintenanceEventMinAggregateInputType = {
    id?: true
    orgId?: true
    partId?: true
    action?: true
    technicianRef?: true
    attestationId?: true
    createdAt?: true
  }

  export type MaintenanceEventMaxAggregateInputType = {
    id?: true
    orgId?: true
    partId?: true
    action?: true
    technicianRef?: true
    attestationId?: true
    createdAt?: true
  }

  export type MaintenanceEventCountAggregateInputType = {
    id?: true
    orgId?: true
    partId?: true
    action?: true
    technicianRef?: true
    attestationId?: true
    createdAt?: true
    _all?: true
  }

  export type MaintenanceEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaintenanceEvent to aggregate.
     */
    where?: MaintenanceEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaintenanceEvents to fetch.
     */
    orderBy?: MaintenanceEventOrderByWithRelationInput | MaintenanceEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MaintenanceEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaintenanceEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaintenanceEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MaintenanceEvents
    **/
    _count?: true | MaintenanceEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MaintenanceEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MaintenanceEventMaxAggregateInputType
  }

  export type GetMaintenanceEventAggregateType<T extends MaintenanceEventAggregateArgs> = {
        [P in keyof T & keyof AggregateMaintenanceEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMaintenanceEvent[P]>
      : GetScalarType<T[P], AggregateMaintenanceEvent[P]>
  }




  export type MaintenanceEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MaintenanceEventWhereInput
    orderBy?: MaintenanceEventOrderByWithAggregationInput | MaintenanceEventOrderByWithAggregationInput[]
    by: MaintenanceEventScalarFieldEnum[] | MaintenanceEventScalarFieldEnum
    having?: MaintenanceEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MaintenanceEventCountAggregateInputType | true
    _min?: MaintenanceEventMinAggregateInputType
    _max?: MaintenanceEventMaxAggregateInputType
  }

  export type MaintenanceEventGroupByOutputType = {
    id: string
    orgId: string
    partId: string
    action: string
    technicianRef: string
    attestationId: string | null
    createdAt: Date
    _count: MaintenanceEventCountAggregateOutputType | null
    _min: MaintenanceEventMinAggregateOutputType | null
    _max: MaintenanceEventMaxAggregateOutputType | null
  }

  type GetMaintenanceEventGroupByPayload<T extends MaintenanceEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MaintenanceEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MaintenanceEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MaintenanceEventGroupByOutputType[P]>
            : GetScalarType<T[P], MaintenanceEventGroupByOutputType[P]>
        }
      >
    >


  export type MaintenanceEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    partId?: boolean
    action?: boolean
    technicianRef?: boolean
    attestationId?: boolean
    createdAt?: boolean
    part?: boolean | PartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["maintenanceEvent"]>

  export type MaintenanceEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    partId?: boolean
    action?: boolean
    technicianRef?: boolean
    attestationId?: boolean
    createdAt?: boolean
    part?: boolean | PartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["maintenanceEvent"]>

  export type MaintenanceEventSelectScalar = {
    id?: boolean
    orgId?: boolean
    partId?: boolean
    action?: boolean
    technicianRef?: boolean
    attestationId?: boolean
    createdAt?: boolean
  }

  export type MaintenanceEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    part?: boolean | PartDefaultArgs<ExtArgs>
  }
  export type MaintenanceEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    part?: boolean | PartDefaultArgs<ExtArgs>
  }

  export type $MaintenanceEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MaintenanceEvent"
    objects: {
      part: Prisma.$PartPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      partId: string
      action: string
      technicianRef: string
      attestationId: string | null
      createdAt: Date
    }, ExtArgs["result"]["maintenanceEvent"]>
    composites: {}
  }

  type MaintenanceEventGetPayload<S extends boolean | null | undefined | MaintenanceEventDefaultArgs> = $Result.GetResult<Prisma.$MaintenanceEventPayload, S>

  type MaintenanceEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MaintenanceEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MaintenanceEventCountAggregateInputType | true
    }

  export interface MaintenanceEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MaintenanceEvent'], meta: { name: 'MaintenanceEvent' } }
    /**
     * Find zero or one MaintenanceEvent that matches the filter.
     * @param {MaintenanceEventFindUniqueArgs} args - Arguments to find a MaintenanceEvent
     * @example
     * // Get one MaintenanceEvent
     * const maintenanceEvent = await prisma.maintenanceEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MaintenanceEventFindUniqueArgs>(args: SelectSubset<T, MaintenanceEventFindUniqueArgs<ExtArgs>>): Prisma__MaintenanceEventClient<$Result.GetResult<Prisma.$MaintenanceEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MaintenanceEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MaintenanceEventFindUniqueOrThrowArgs} args - Arguments to find a MaintenanceEvent
     * @example
     * // Get one MaintenanceEvent
     * const maintenanceEvent = await prisma.maintenanceEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MaintenanceEventFindUniqueOrThrowArgs>(args: SelectSubset<T, MaintenanceEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MaintenanceEventClient<$Result.GetResult<Prisma.$MaintenanceEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MaintenanceEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceEventFindFirstArgs} args - Arguments to find a MaintenanceEvent
     * @example
     * // Get one MaintenanceEvent
     * const maintenanceEvent = await prisma.maintenanceEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MaintenanceEventFindFirstArgs>(args?: SelectSubset<T, MaintenanceEventFindFirstArgs<ExtArgs>>): Prisma__MaintenanceEventClient<$Result.GetResult<Prisma.$MaintenanceEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MaintenanceEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceEventFindFirstOrThrowArgs} args - Arguments to find a MaintenanceEvent
     * @example
     * // Get one MaintenanceEvent
     * const maintenanceEvent = await prisma.maintenanceEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MaintenanceEventFindFirstOrThrowArgs>(args?: SelectSubset<T, MaintenanceEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__MaintenanceEventClient<$Result.GetResult<Prisma.$MaintenanceEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MaintenanceEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MaintenanceEvents
     * const maintenanceEvents = await prisma.maintenanceEvent.findMany()
     * 
     * // Get first 10 MaintenanceEvents
     * const maintenanceEvents = await prisma.maintenanceEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const maintenanceEventWithIdOnly = await prisma.maintenanceEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MaintenanceEventFindManyArgs>(args?: SelectSubset<T, MaintenanceEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaintenanceEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MaintenanceEvent.
     * @param {MaintenanceEventCreateArgs} args - Arguments to create a MaintenanceEvent.
     * @example
     * // Create one MaintenanceEvent
     * const MaintenanceEvent = await prisma.maintenanceEvent.create({
     *   data: {
     *     // ... data to create a MaintenanceEvent
     *   }
     * })
     * 
     */
    create<T extends MaintenanceEventCreateArgs>(args: SelectSubset<T, MaintenanceEventCreateArgs<ExtArgs>>): Prisma__MaintenanceEventClient<$Result.GetResult<Prisma.$MaintenanceEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MaintenanceEvents.
     * @param {MaintenanceEventCreateManyArgs} args - Arguments to create many MaintenanceEvents.
     * @example
     * // Create many MaintenanceEvents
     * const maintenanceEvent = await prisma.maintenanceEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MaintenanceEventCreateManyArgs>(args?: SelectSubset<T, MaintenanceEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MaintenanceEvents and returns the data saved in the database.
     * @param {MaintenanceEventCreateManyAndReturnArgs} args - Arguments to create many MaintenanceEvents.
     * @example
     * // Create many MaintenanceEvents
     * const maintenanceEvent = await prisma.maintenanceEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MaintenanceEvents and only return the `id`
     * const maintenanceEventWithIdOnly = await prisma.maintenanceEvent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MaintenanceEventCreateManyAndReturnArgs>(args?: SelectSubset<T, MaintenanceEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MaintenanceEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MaintenanceEvent.
     * @param {MaintenanceEventDeleteArgs} args - Arguments to delete one MaintenanceEvent.
     * @example
     * // Delete one MaintenanceEvent
     * const MaintenanceEvent = await prisma.maintenanceEvent.delete({
     *   where: {
     *     // ... filter to delete one MaintenanceEvent
     *   }
     * })
     * 
     */
    delete<T extends MaintenanceEventDeleteArgs>(args: SelectSubset<T, MaintenanceEventDeleteArgs<ExtArgs>>): Prisma__MaintenanceEventClient<$Result.GetResult<Prisma.$MaintenanceEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MaintenanceEvent.
     * @param {MaintenanceEventUpdateArgs} args - Arguments to update one MaintenanceEvent.
     * @example
     * // Update one MaintenanceEvent
     * const maintenanceEvent = await prisma.maintenanceEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MaintenanceEventUpdateArgs>(args: SelectSubset<T, MaintenanceEventUpdateArgs<ExtArgs>>): Prisma__MaintenanceEventClient<$Result.GetResult<Prisma.$MaintenanceEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MaintenanceEvents.
     * @param {MaintenanceEventDeleteManyArgs} args - Arguments to filter MaintenanceEvents to delete.
     * @example
     * // Delete a few MaintenanceEvents
     * const { count } = await prisma.maintenanceEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MaintenanceEventDeleteManyArgs>(args?: SelectSubset<T, MaintenanceEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MaintenanceEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MaintenanceEvents
     * const maintenanceEvent = await prisma.maintenanceEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MaintenanceEventUpdateManyArgs>(args: SelectSubset<T, MaintenanceEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MaintenanceEvent.
     * @param {MaintenanceEventUpsertArgs} args - Arguments to update or create a MaintenanceEvent.
     * @example
     * // Update or create a MaintenanceEvent
     * const maintenanceEvent = await prisma.maintenanceEvent.upsert({
     *   create: {
     *     // ... data to create a MaintenanceEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MaintenanceEvent we want to update
     *   }
     * })
     */
    upsert<T extends MaintenanceEventUpsertArgs>(args: SelectSubset<T, MaintenanceEventUpsertArgs<ExtArgs>>): Prisma__MaintenanceEventClient<$Result.GetResult<Prisma.$MaintenanceEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MaintenanceEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceEventCountArgs} args - Arguments to filter MaintenanceEvents to count.
     * @example
     * // Count the number of MaintenanceEvents
     * const count = await prisma.maintenanceEvent.count({
     *   where: {
     *     // ... the filter for the MaintenanceEvents we want to count
     *   }
     * })
    **/
    count<T extends MaintenanceEventCountArgs>(
      args?: Subset<T, MaintenanceEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MaintenanceEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MaintenanceEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MaintenanceEventAggregateArgs>(args: Subset<T, MaintenanceEventAggregateArgs>): Prisma.PrismaPromise<GetMaintenanceEventAggregateType<T>>

    /**
     * Group by MaintenanceEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MaintenanceEventGroupByArgs} args - Group by arguments.
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
      T extends MaintenanceEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MaintenanceEventGroupByArgs['orderBy'] }
        : { orderBy?: MaintenanceEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MaintenanceEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMaintenanceEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MaintenanceEvent model
   */
  readonly fields: MaintenanceEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MaintenanceEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MaintenanceEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    part<T extends PartDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartDefaultArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the MaintenanceEvent model
   */ 
  interface MaintenanceEventFieldRefs {
    readonly id: FieldRef<"MaintenanceEvent", 'String'>
    readonly orgId: FieldRef<"MaintenanceEvent", 'String'>
    readonly partId: FieldRef<"MaintenanceEvent", 'String'>
    readonly action: FieldRef<"MaintenanceEvent", 'String'>
    readonly technicianRef: FieldRef<"MaintenanceEvent", 'String'>
    readonly attestationId: FieldRef<"MaintenanceEvent", 'String'>
    readonly createdAt: FieldRef<"MaintenanceEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MaintenanceEvent findUnique
   */
  export type MaintenanceEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceEvent
     */
    select?: MaintenanceEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceEventInclude<ExtArgs> | null
    /**
     * Filter, which MaintenanceEvent to fetch.
     */
    where: MaintenanceEventWhereUniqueInput
  }

  /**
   * MaintenanceEvent findUniqueOrThrow
   */
  export type MaintenanceEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceEvent
     */
    select?: MaintenanceEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceEventInclude<ExtArgs> | null
    /**
     * Filter, which MaintenanceEvent to fetch.
     */
    where: MaintenanceEventWhereUniqueInput
  }

  /**
   * MaintenanceEvent findFirst
   */
  export type MaintenanceEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceEvent
     */
    select?: MaintenanceEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceEventInclude<ExtArgs> | null
    /**
     * Filter, which MaintenanceEvent to fetch.
     */
    where?: MaintenanceEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaintenanceEvents to fetch.
     */
    orderBy?: MaintenanceEventOrderByWithRelationInput | MaintenanceEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaintenanceEvents.
     */
    cursor?: MaintenanceEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaintenanceEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaintenanceEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaintenanceEvents.
     */
    distinct?: MaintenanceEventScalarFieldEnum | MaintenanceEventScalarFieldEnum[]
  }

  /**
   * MaintenanceEvent findFirstOrThrow
   */
  export type MaintenanceEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceEvent
     */
    select?: MaintenanceEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceEventInclude<ExtArgs> | null
    /**
     * Filter, which MaintenanceEvent to fetch.
     */
    where?: MaintenanceEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaintenanceEvents to fetch.
     */
    orderBy?: MaintenanceEventOrderByWithRelationInput | MaintenanceEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MaintenanceEvents.
     */
    cursor?: MaintenanceEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaintenanceEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaintenanceEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MaintenanceEvents.
     */
    distinct?: MaintenanceEventScalarFieldEnum | MaintenanceEventScalarFieldEnum[]
  }

  /**
   * MaintenanceEvent findMany
   */
  export type MaintenanceEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceEvent
     */
    select?: MaintenanceEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceEventInclude<ExtArgs> | null
    /**
     * Filter, which MaintenanceEvents to fetch.
     */
    where?: MaintenanceEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MaintenanceEvents to fetch.
     */
    orderBy?: MaintenanceEventOrderByWithRelationInput | MaintenanceEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MaintenanceEvents.
     */
    cursor?: MaintenanceEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MaintenanceEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MaintenanceEvents.
     */
    skip?: number
    distinct?: MaintenanceEventScalarFieldEnum | MaintenanceEventScalarFieldEnum[]
  }

  /**
   * MaintenanceEvent create
   */
  export type MaintenanceEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceEvent
     */
    select?: MaintenanceEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceEventInclude<ExtArgs> | null
    /**
     * The data needed to create a MaintenanceEvent.
     */
    data: XOR<MaintenanceEventCreateInput, MaintenanceEventUncheckedCreateInput>
  }

  /**
   * MaintenanceEvent createMany
   */
  export type MaintenanceEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MaintenanceEvents.
     */
    data: MaintenanceEventCreateManyInput | MaintenanceEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MaintenanceEvent createManyAndReturn
   */
  export type MaintenanceEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceEvent
     */
    select?: MaintenanceEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MaintenanceEvents.
     */
    data: MaintenanceEventCreateManyInput | MaintenanceEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MaintenanceEvent update
   */
  export type MaintenanceEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceEvent
     */
    select?: MaintenanceEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceEventInclude<ExtArgs> | null
    /**
     * The data needed to update a MaintenanceEvent.
     */
    data: XOR<MaintenanceEventUpdateInput, MaintenanceEventUncheckedUpdateInput>
    /**
     * Choose, which MaintenanceEvent to update.
     */
    where: MaintenanceEventWhereUniqueInput
  }

  /**
   * MaintenanceEvent updateMany
   */
  export type MaintenanceEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MaintenanceEvents.
     */
    data: XOR<MaintenanceEventUpdateManyMutationInput, MaintenanceEventUncheckedUpdateManyInput>
    /**
     * Filter which MaintenanceEvents to update
     */
    where?: MaintenanceEventWhereInput
  }

  /**
   * MaintenanceEvent upsert
   */
  export type MaintenanceEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceEvent
     */
    select?: MaintenanceEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceEventInclude<ExtArgs> | null
    /**
     * The filter to search for the MaintenanceEvent to update in case it exists.
     */
    where: MaintenanceEventWhereUniqueInput
    /**
     * In case the MaintenanceEvent found by the `where` argument doesn't exist, create a new MaintenanceEvent with this data.
     */
    create: XOR<MaintenanceEventCreateInput, MaintenanceEventUncheckedCreateInput>
    /**
     * In case the MaintenanceEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MaintenanceEventUpdateInput, MaintenanceEventUncheckedUpdateInput>
  }

  /**
   * MaintenanceEvent delete
   */
  export type MaintenanceEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceEvent
     */
    select?: MaintenanceEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceEventInclude<ExtArgs> | null
    /**
     * Filter which MaintenanceEvent to delete.
     */
    where: MaintenanceEventWhereUniqueInput
  }

  /**
   * MaintenanceEvent deleteMany
   */
  export type MaintenanceEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MaintenanceEvents to delete
     */
    where?: MaintenanceEventWhereInput
  }

  /**
   * MaintenanceEvent without action
   */
  export type MaintenanceEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MaintenanceEvent
     */
    select?: MaintenanceEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MaintenanceEventInclude<ExtArgs> | null
  }


  /**
   * Model AirworthinessCert
   */

  export type AggregateAirworthinessCert = {
    _count: AirworthinessCertCountAggregateOutputType | null
    _min: AirworthinessCertMinAggregateOutputType | null
    _max: AirworthinessCertMaxAggregateOutputType | null
  }

  export type AirworthinessCertMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    aircraftId: string | null
    attestationId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type AirworthinessCertMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    aircraftId: string | null
    attestationId: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type AirworthinessCertCountAggregateOutputType = {
    id: number
    orgId: number
    aircraftId: number
    attestationId: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type AirworthinessCertMinAggregateInputType = {
    id?: true
    orgId?: true
    aircraftId?: true
    attestationId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type AirworthinessCertMaxAggregateInputType = {
    id?: true
    orgId?: true
    aircraftId?: true
    attestationId?: true
    expiresAt?: true
    createdAt?: true
  }

  export type AirworthinessCertCountAggregateInputType = {
    id?: true
    orgId?: true
    aircraftId?: true
    attestationId?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type AirworthinessCertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AirworthinessCert to aggregate.
     */
    where?: AirworthinessCertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AirworthinessCerts to fetch.
     */
    orderBy?: AirworthinessCertOrderByWithRelationInput | AirworthinessCertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AirworthinessCertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AirworthinessCerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AirworthinessCerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AirworthinessCerts
    **/
    _count?: true | AirworthinessCertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AirworthinessCertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AirworthinessCertMaxAggregateInputType
  }

  export type GetAirworthinessCertAggregateType<T extends AirworthinessCertAggregateArgs> = {
        [P in keyof T & keyof AggregateAirworthinessCert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAirworthinessCert[P]>
      : GetScalarType<T[P], AggregateAirworthinessCert[P]>
  }




  export type AirworthinessCertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AirworthinessCertWhereInput
    orderBy?: AirworthinessCertOrderByWithAggregationInput | AirworthinessCertOrderByWithAggregationInput[]
    by: AirworthinessCertScalarFieldEnum[] | AirworthinessCertScalarFieldEnum
    having?: AirworthinessCertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AirworthinessCertCountAggregateInputType | true
    _min?: AirworthinessCertMinAggregateInputType
    _max?: AirworthinessCertMaxAggregateInputType
  }

  export type AirworthinessCertGroupByOutputType = {
    id: string
    orgId: string
    aircraftId: string
    attestationId: string
    expiresAt: Date
    createdAt: Date
    _count: AirworthinessCertCountAggregateOutputType | null
    _min: AirworthinessCertMinAggregateOutputType | null
    _max: AirworthinessCertMaxAggregateOutputType | null
  }

  type GetAirworthinessCertGroupByPayload<T extends AirworthinessCertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AirworthinessCertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AirworthinessCertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AirworthinessCertGroupByOutputType[P]>
            : GetScalarType<T[P], AirworthinessCertGroupByOutputType[P]>
        }
      >
    >


  export type AirworthinessCertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    aircraftId?: boolean
    attestationId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["airworthinessCert"]>

  export type AirworthinessCertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    aircraftId?: boolean
    attestationId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["airworthinessCert"]>

  export type AirworthinessCertSelectScalar = {
    id?: boolean
    orgId?: boolean
    aircraftId?: boolean
    attestationId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }


  export type $AirworthinessCertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AirworthinessCert"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      aircraftId: string
      attestationId: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["airworthinessCert"]>
    composites: {}
  }

  type AirworthinessCertGetPayload<S extends boolean | null | undefined | AirworthinessCertDefaultArgs> = $Result.GetResult<Prisma.$AirworthinessCertPayload, S>

  type AirworthinessCertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AirworthinessCertFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AirworthinessCertCountAggregateInputType | true
    }

  export interface AirworthinessCertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AirworthinessCert'], meta: { name: 'AirworthinessCert' } }
    /**
     * Find zero or one AirworthinessCert that matches the filter.
     * @param {AirworthinessCertFindUniqueArgs} args - Arguments to find a AirworthinessCert
     * @example
     * // Get one AirworthinessCert
     * const airworthinessCert = await prisma.airworthinessCert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AirworthinessCertFindUniqueArgs>(args: SelectSubset<T, AirworthinessCertFindUniqueArgs<ExtArgs>>): Prisma__AirworthinessCertClient<$Result.GetResult<Prisma.$AirworthinessCertPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AirworthinessCert that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AirworthinessCertFindUniqueOrThrowArgs} args - Arguments to find a AirworthinessCert
     * @example
     * // Get one AirworthinessCert
     * const airworthinessCert = await prisma.airworthinessCert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AirworthinessCertFindUniqueOrThrowArgs>(args: SelectSubset<T, AirworthinessCertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AirworthinessCertClient<$Result.GetResult<Prisma.$AirworthinessCertPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AirworthinessCert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirworthinessCertFindFirstArgs} args - Arguments to find a AirworthinessCert
     * @example
     * // Get one AirworthinessCert
     * const airworthinessCert = await prisma.airworthinessCert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AirworthinessCertFindFirstArgs>(args?: SelectSubset<T, AirworthinessCertFindFirstArgs<ExtArgs>>): Prisma__AirworthinessCertClient<$Result.GetResult<Prisma.$AirworthinessCertPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AirworthinessCert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirworthinessCertFindFirstOrThrowArgs} args - Arguments to find a AirworthinessCert
     * @example
     * // Get one AirworthinessCert
     * const airworthinessCert = await prisma.airworthinessCert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AirworthinessCertFindFirstOrThrowArgs>(args?: SelectSubset<T, AirworthinessCertFindFirstOrThrowArgs<ExtArgs>>): Prisma__AirworthinessCertClient<$Result.GetResult<Prisma.$AirworthinessCertPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AirworthinessCerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirworthinessCertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AirworthinessCerts
     * const airworthinessCerts = await prisma.airworthinessCert.findMany()
     * 
     * // Get first 10 AirworthinessCerts
     * const airworthinessCerts = await prisma.airworthinessCert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const airworthinessCertWithIdOnly = await prisma.airworthinessCert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AirworthinessCertFindManyArgs>(args?: SelectSubset<T, AirworthinessCertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirworthinessCertPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AirworthinessCert.
     * @param {AirworthinessCertCreateArgs} args - Arguments to create a AirworthinessCert.
     * @example
     * // Create one AirworthinessCert
     * const AirworthinessCert = await prisma.airworthinessCert.create({
     *   data: {
     *     // ... data to create a AirworthinessCert
     *   }
     * })
     * 
     */
    create<T extends AirworthinessCertCreateArgs>(args: SelectSubset<T, AirworthinessCertCreateArgs<ExtArgs>>): Prisma__AirworthinessCertClient<$Result.GetResult<Prisma.$AirworthinessCertPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AirworthinessCerts.
     * @param {AirworthinessCertCreateManyArgs} args - Arguments to create many AirworthinessCerts.
     * @example
     * // Create many AirworthinessCerts
     * const airworthinessCert = await prisma.airworthinessCert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AirworthinessCertCreateManyArgs>(args?: SelectSubset<T, AirworthinessCertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AirworthinessCerts and returns the data saved in the database.
     * @param {AirworthinessCertCreateManyAndReturnArgs} args - Arguments to create many AirworthinessCerts.
     * @example
     * // Create many AirworthinessCerts
     * const airworthinessCert = await prisma.airworthinessCert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AirworthinessCerts and only return the `id`
     * const airworthinessCertWithIdOnly = await prisma.airworthinessCert.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AirworthinessCertCreateManyAndReturnArgs>(args?: SelectSubset<T, AirworthinessCertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AirworthinessCertPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AirworthinessCert.
     * @param {AirworthinessCertDeleteArgs} args - Arguments to delete one AirworthinessCert.
     * @example
     * // Delete one AirworthinessCert
     * const AirworthinessCert = await prisma.airworthinessCert.delete({
     *   where: {
     *     // ... filter to delete one AirworthinessCert
     *   }
     * })
     * 
     */
    delete<T extends AirworthinessCertDeleteArgs>(args: SelectSubset<T, AirworthinessCertDeleteArgs<ExtArgs>>): Prisma__AirworthinessCertClient<$Result.GetResult<Prisma.$AirworthinessCertPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AirworthinessCert.
     * @param {AirworthinessCertUpdateArgs} args - Arguments to update one AirworthinessCert.
     * @example
     * // Update one AirworthinessCert
     * const airworthinessCert = await prisma.airworthinessCert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AirworthinessCertUpdateArgs>(args: SelectSubset<T, AirworthinessCertUpdateArgs<ExtArgs>>): Prisma__AirworthinessCertClient<$Result.GetResult<Prisma.$AirworthinessCertPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AirworthinessCerts.
     * @param {AirworthinessCertDeleteManyArgs} args - Arguments to filter AirworthinessCerts to delete.
     * @example
     * // Delete a few AirworthinessCerts
     * const { count } = await prisma.airworthinessCert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AirworthinessCertDeleteManyArgs>(args?: SelectSubset<T, AirworthinessCertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AirworthinessCerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirworthinessCertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AirworthinessCerts
     * const airworthinessCert = await prisma.airworthinessCert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AirworthinessCertUpdateManyArgs>(args: SelectSubset<T, AirworthinessCertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AirworthinessCert.
     * @param {AirworthinessCertUpsertArgs} args - Arguments to update or create a AirworthinessCert.
     * @example
     * // Update or create a AirworthinessCert
     * const airworthinessCert = await prisma.airworthinessCert.upsert({
     *   create: {
     *     // ... data to create a AirworthinessCert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AirworthinessCert we want to update
     *   }
     * })
     */
    upsert<T extends AirworthinessCertUpsertArgs>(args: SelectSubset<T, AirworthinessCertUpsertArgs<ExtArgs>>): Prisma__AirworthinessCertClient<$Result.GetResult<Prisma.$AirworthinessCertPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AirworthinessCerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirworthinessCertCountArgs} args - Arguments to filter AirworthinessCerts to count.
     * @example
     * // Count the number of AirworthinessCerts
     * const count = await prisma.airworthinessCert.count({
     *   where: {
     *     // ... the filter for the AirworthinessCerts we want to count
     *   }
     * })
    **/
    count<T extends AirworthinessCertCountArgs>(
      args?: Subset<T, AirworthinessCertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AirworthinessCertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AirworthinessCert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirworthinessCertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AirworthinessCertAggregateArgs>(args: Subset<T, AirworthinessCertAggregateArgs>): Prisma.PrismaPromise<GetAirworthinessCertAggregateType<T>>

    /**
     * Group by AirworthinessCert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AirworthinessCertGroupByArgs} args - Group by arguments.
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
      T extends AirworthinessCertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AirworthinessCertGroupByArgs['orderBy'] }
        : { orderBy?: AirworthinessCertGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AirworthinessCertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAirworthinessCertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AirworthinessCert model
   */
  readonly fields: AirworthinessCertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AirworthinessCert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AirworthinessCertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AirworthinessCert model
   */ 
  interface AirworthinessCertFieldRefs {
    readonly id: FieldRef<"AirworthinessCert", 'String'>
    readonly orgId: FieldRef<"AirworthinessCert", 'String'>
    readonly aircraftId: FieldRef<"AirworthinessCert", 'String'>
    readonly attestationId: FieldRef<"AirworthinessCert", 'String'>
    readonly expiresAt: FieldRef<"AirworthinessCert", 'DateTime'>
    readonly createdAt: FieldRef<"AirworthinessCert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AirworthinessCert findUnique
   */
  export type AirworthinessCertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirworthinessCert
     */
    select?: AirworthinessCertSelect<ExtArgs> | null
    /**
     * Filter, which AirworthinessCert to fetch.
     */
    where: AirworthinessCertWhereUniqueInput
  }

  /**
   * AirworthinessCert findUniqueOrThrow
   */
  export type AirworthinessCertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirworthinessCert
     */
    select?: AirworthinessCertSelect<ExtArgs> | null
    /**
     * Filter, which AirworthinessCert to fetch.
     */
    where: AirworthinessCertWhereUniqueInput
  }

  /**
   * AirworthinessCert findFirst
   */
  export type AirworthinessCertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirworthinessCert
     */
    select?: AirworthinessCertSelect<ExtArgs> | null
    /**
     * Filter, which AirworthinessCert to fetch.
     */
    where?: AirworthinessCertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AirworthinessCerts to fetch.
     */
    orderBy?: AirworthinessCertOrderByWithRelationInput | AirworthinessCertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AirworthinessCerts.
     */
    cursor?: AirworthinessCertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AirworthinessCerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AirworthinessCerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AirworthinessCerts.
     */
    distinct?: AirworthinessCertScalarFieldEnum | AirworthinessCertScalarFieldEnum[]
  }

  /**
   * AirworthinessCert findFirstOrThrow
   */
  export type AirworthinessCertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirworthinessCert
     */
    select?: AirworthinessCertSelect<ExtArgs> | null
    /**
     * Filter, which AirworthinessCert to fetch.
     */
    where?: AirworthinessCertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AirworthinessCerts to fetch.
     */
    orderBy?: AirworthinessCertOrderByWithRelationInput | AirworthinessCertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AirworthinessCerts.
     */
    cursor?: AirworthinessCertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AirworthinessCerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AirworthinessCerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AirworthinessCerts.
     */
    distinct?: AirworthinessCertScalarFieldEnum | AirworthinessCertScalarFieldEnum[]
  }

  /**
   * AirworthinessCert findMany
   */
  export type AirworthinessCertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirworthinessCert
     */
    select?: AirworthinessCertSelect<ExtArgs> | null
    /**
     * Filter, which AirworthinessCerts to fetch.
     */
    where?: AirworthinessCertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AirworthinessCerts to fetch.
     */
    orderBy?: AirworthinessCertOrderByWithRelationInput | AirworthinessCertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AirworthinessCerts.
     */
    cursor?: AirworthinessCertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AirworthinessCerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AirworthinessCerts.
     */
    skip?: number
    distinct?: AirworthinessCertScalarFieldEnum | AirworthinessCertScalarFieldEnum[]
  }

  /**
   * AirworthinessCert create
   */
  export type AirworthinessCertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirworthinessCert
     */
    select?: AirworthinessCertSelect<ExtArgs> | null
    /**
     * The data needed to create a AirworthinessCert.
     */
    data: XOR<AirworthinessCertCreateInput, AirworthinessCertUncheckedCreateInput>
  }

  /**
   * AirworthinessCert createMany
   */
  export type AirworthinessCertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AirworthinessCerts.
     */
    data: AirworthinessCertCreateManyInput | AirworthinessCertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AirworthinessCert createManyAndReturn
   */
  export type AirworthinessCertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirworthinessCert
     */
    select?: AirworthinessCertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AirworthinessCerts.
     */
    data: AirworthinessCertCreateManyInput | AirworthinessCertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AirworthinessCert update
   */
  export type AirworthinessCertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirworthinessCert
     */
    select?: AirworthinessCertSelect<ExtArgs> | null
    /**
     * The data needed to update a AirworthinessCert.
     */
    data: XOR<AirworthinessCertUpdateInput, AirworthinessCertUncheckedUpdateInput>
    /**
     * Choose, which AirworthinessCert to update.
     */
    where: AirworthinessCertWhereUniqueInput
  }

  /**
   * AirworthinessCert updateMany
   */
  export type AirworthinessCertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AirworthinessCerts.
     */
    data: XOR<AirworthinessCertUpdateManyMutationInput, AirworthinessCertUncheckedUpdateManyInput>
    /**
     * Filter which AirworthinessCerts to update
     */
    where?: AirworthinessCertWhereInput
  }

  /**
   * AirworthinessCert upsert
   */
  export type AirworthinessCertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirworthinessCert
     */
    select?: AirworthinessCertSelect<ExtArgs> | null
    /**
     * The filter to search for the AirworthinessCert to update in case it exists.
     */
    where: AirworthinessCertWhereUniqueInput
    /**
     * In case the AirworthinessCert found by the `where` argument doesn't exist, create a new AirworthinessCert with this data.
     */
    create: XOR<AirworthinessCertCreateInput, AirworthinessCertUncheckedCreateInput>
    /**
     * In case the AirworthinessCert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AirworthinessCertUpdateInput, AirworthinessCertUncheckedUpdateInput>
  }

  /**
   * AirworthinessCert delete
   */
  export type AirworthinessCertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirworthinessCert
     */
    select?: AirworthinessCertSelect<ExtArgs> | null
    /**
     * Filter which AirworthinessCert to delete.
     */
    where: AirworthinessCertWhereUniqueInput
  }

  /**
   * AirworthinessCert deleteMany
   */
  export type AirworthinessCertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AirworthinessCerts to delete
     */
    where?: AirworthinessCertWhereInput
  }

  /**
   * AirworthinessCert without action
   */
  export type AirworthinessCertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AirworthinessCert
     */
    select?: AirworthinessCertSelect<ExtArgs> | null
  }


  /**
   * Model AviationSettlement
   */

  export type AggregateAviationSettlement = {
    _count: AviationSettlementCountAggregateOutputType | null
    _avg: AviationSettlementAvgAggregateOutputType | null
    _sum: AviationSettlementSumAggregateOutputType | null
    _min: AviationSettlementMinAggregateOutputType | null
    _max: AviationSettlementMaxAggregateOutputType | null
  }

  export type AviationSettlementAvgAggregateOutputType = {
    amountMinor: number | null
  }

  export type AviationSettlementSumAggregateOutputType = {
    amountMinor: bigint | null
  }

  export type AviationSettlementMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    partId: string | null
    buyerRef: string | null
    sellerRef: string | null
    amountMinor: bigint | null
    currency: string | null
    status: $Enums.AviationSettlementStatus | null
    escrowIntentId: string | null
    createdAt: Date | null
  }

  export type AviationSettlementMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    partId: string | null
    buyerRef: string | null
    sellerRef: string | null
    amountMinor: bigint | null
    currency: string | null
    status: $Enums.AviationSettlementStatus | null
    escrowIntentId: string | null
    createdAt: Date | null
  }

  export type AviationSettlementCountAggregateOutputType = {
    id: number
    orgId: number
    partId: number
    buyerRef: number
    sellerRef: number
    amountMinor: number
    currency: number
    status: number
    escrowIntentId: number
    createdAt: number
    _all: number
  }


  export type AviationSettlementAvgAggregateInputType = {
    amountMinor?: true
  }

  export type AviationSettlementSumAggregateInputType = {
    amountMinor?: true
  }

  export type AviationSettlementMinAggregateInputType = {
    id?: true
    orgId?: true
    partId?: true
    buyerRef?: true
    sellerRef?: true
    amountMinor?: true
    currency?: true
    status?: true
    escrowIntentId?: true
    createdAt?: true
  }

  export type AviationSettlementMaxAggregateInputType = {
    id?: true
    orgId?: true
    partId?: true
    buyerRef?: true
    sellerRef?: true
    amountMinor?: true
    currency?: true
    status?: true
    escrowIntentId?: true
    createdAt?: true
  }

  export type AviationSettlementCountAggregateInputType = {
    id?: true
    orgId?: true
    partId?: true
    buyerRef?: true
    sellerRef?: true
    amountMinor?: true
    currency?: true
    status?: true
    escrowIntentId?: true
    createdAt?: true
    _all?: true
  }

  export type AviationSettlementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AviationSettlement to aggregate.
     */
    where?: AviationSettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AviationSettlements to fetch.
     */
    orderBy?: AviationSettlementOrderByWithRelationInput | AviationSettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AviationSettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AviationSettlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AviationSettlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AviationSettlements
    **/
    _count?: true | AviationSettlementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AviationSettlementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AviationSettlementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AviationSettlementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AviationSettlementMaxAggregateInputType
  }

  export type GetAviationSettlementAggregateType<T extends AviationSettlementAggregateArgs> = {
        [P in keyof T & keyof AggregateAviationSettlement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAviationSettlement[P]>
      : GetScalarType<T[P], AggregateAviationSettlement[P]>
  }




  export type AviationSettlementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AviationSettlementWhereInput
    orderBy?: AviationSettlementOrderByWithAggregationInput | AviationSettlementOrderByWithAggregationInput[]
    by: AviationSettlementScalarFieldEnum[] | AviationSettlementScalarFieldEnum
    having?: AviationSettlementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AviationSettlementCountAggregateInputType | true
    _avg?: AviationSettlementAvgAggregateInputType
    _sum?: AviationSettlementSumAggregateInputType
    _min?: AviationSettlementMinAggregateInputType
    _max?: AviationSettlementMaxAggregateInputType
  }

  export type AviationSettlementGroupByOutputType = {
    id: string
    orgId: string
    partId: string
    buyerRef: string
    sellerRef: string
    amountMinor: bigint
    currency: string
    status: $Enums.AviationSettlementStatus
    escrowIntentId: string | null
    createdAt: Date
    _count: AviationSettlementCountAggregateOutputType | null
    _avg: AviationSettlementAvgAggregateOutputType | null
    _sum: AviationSettlementSumAggregateOutputType | null
    _min: AviationSettlementMinAggregateOutputType | null
    _max: AviationSettlementMaxAggregateOutputType | null
  }

  type GetAviationSettlementGroupByPayload<T extends AviationSettlementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AviationSettlementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AviationSettlementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AviationSettlementGroupByOutputType[P]>
            : GetScalarType<T[P], AviationSettlementGroupByOutputType[P]>
        }
      >
    >


  export type AviationSettlementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    partId?: boolean
    buyerRef?: boolean
    sellerRef?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aviationSettlement"]>

  export type AviationSettlementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    partId?: boolean
    buyerRef?: boolean
    sellerRef?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aviationSettlement"]>

  export type AviationSettlementSelectScalar = {
    id?: boolean
    orgId?: boolean
    partId?: boolean
    buyerRef?: boolean
    sellerRef?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }


  export type $AviationSettlementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AviationSettlement"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      partId: string
      buyerRef: string
      sellerRef: string
      amountMinor: bigint
      currency: string
      status: $Enums.AviationSettlementStatus
      escrowIntentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["aviationSettlement"]>
    composites: {}
  }

  type AviationSettlementGetPayload<S extends boolean | null | undefined | AviationSettlementDefaultArgs> = $Result.GetResult<Prisma.$AviationSettlementPayload, S>

  type AviationSettlementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AviationSettlementFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AviationSettlementCountAggregateInputType | true
    }

  export interface AviationSettlementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AviationSettlement'], meta: { name: 'AviationSettlement' } }
    /**
     * Find zero or one AviationSettlement that matches the filter.
     * @param {AviationSettlementFindUniqueArgs} args - Arguments to find a AviationSettlement
     * @example
     * // Get one AviationSettlement
     * const aviationSettlement = await prisma.aviationSettlement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AviationSettlementFindUniqueArgs>(args: SelectSubset<T, AviationSettlementFindUniqueArgs<ExtArgs>>): Prisma__AviationSettlementClient<$Result.GetResult<Prisma.$AviationSettlementPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AviationSettlement that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AviationSettlementFindUniqueOrThrowArgs} args - Arguments to find a AviationSettlement
     * @example
     * // Get one AviationSettlement
     * const aviationSettlement = await prisma.aviationSettlement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AviationSettlementFindUniqueOrThrowArgs>(args: SelectSubset<T, AviationSettlementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AviationSettlementClient<$Result.GetResult<Prisma.$AviationSettlementPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AviationSettlement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AviationSettlementFindFirstArgs} args - Arguments to find a AviationSettlement
     * @example
     * // Get one AviationSettlement
     * const aviationSettlement = await prisma.aviationSettlement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AviationSettlementFindFirstArgs>(args?: SelectSubset<T, AviationSettlementFindFirstArgs<ExtArgs>>): Prisma__AviationSettlementClient<$Result.GetResult<Prisma.$AviationSettlementPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AviationSettlement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AviationSettlementFindFirstOrThrowArgs} args - Arguments to find a AviationSettlement
     * @example
     * // Get one AviationSettlement
     * const aviationSettlement = await prisma.aviationSettlement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AviationSettlementFindFirstOrThrowArgs>(args?: SelectSubset<T, AviationSettlementFindFirstOrThrowArgs<ExtArgs>>): Prisma__AviationSettlementClient<$Result.GetResult<Prisma.$AviationSettlementPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AviationSettlements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AviationSettlementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AviationSettlements
     * const aviationSettlements = await prisma.aviationSettlement.findMany()
     * 
     * // Get first 10 AviationSettlements
     * const aviationSettlements = await prisma.aviationSettlement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aviationSettlementWithIdOnly = await prisma.aviationSettlement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AviationSettlementFindManyArgs>(args?: SelectSubset<T, AviationSettlementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AviationSettlementPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AviationSettlement.
     * @param {AviationSettlementCreateArgs} args - Arguments to create a AviationSettlement.
     * @example
     * // Create one AviationSettlement
     * const AviationSettlement = await prisma.aviationSettlement.create({
     *   data: {
     *     // ... data to create a AviationSettlement
     *   }
     * })
     * 
     */
    create<T extends AviationSettlementCreateArgs>(args: SelectSubset<T, AviationSettlementCreateArgs<ExtArgs>>): Prisma__AviationSettlementClient<$Result.GetResult<Prisma.$AviationSettlementPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AviationSettlements.
     * @param {AviationSettlementCreateManyArgs} args - Arguments to create many AviationSettlements.
     * @example
     * // Create many AviationSettlements
     * const aviationSettlement = await prisma.aviationSettlement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AviationSettlementCreateManyArgs>(args?: SelectSubset<T, AviationSettlementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AviationSettlements and returns the data saved in the database.
     * @param {AviationSettlementCreateManyAndReturnArgs} args - Arguments to create many AviationSettlements.
     * @example
     * // Create many AviationSettlements
     * const aviationSettlement = await prisma.aviationSettlement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AviationSettlements and only return the `id`
     * const aviationSettlementWithIdOnly = await prisma.aviationSettlement.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AviationSettlementCreateManyAndReturnArgs>(args?: SelectSubset<T, AviationSettlementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AviationSettlementPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AviationSettlement.
     * @param {AviationSettlementDeleteArgs} args - Arguments to delete one AviationSettlement.
     * @example
     * // Delete one AviationSettlement
     * const AviationSettlement = await prisma.aviationSettlement.delete({
     *   where: {
     *     // ... filter to delete one AviationSettlement
     *   }
     * })
     * 
     */
    delete<T extends AviationSettlementDeleteArgs>(args: SelectSubset<T, AviationSettlementDeleteArgs<ExtArgs>>): Prisma__AviationSettlementClient<$Result.GetResult<Prisma.$AviationSettlementPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AviationSettlement.
     * @param {AviationSettlementUpdateArgs} args - Arguments to update one AviationSettlement.
     * @example
     * // Update one AviationSettlement
     * const aviationSettlement = await prisma.aviationSettlement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AviationSettlementUpdateArgs>(args: SelectSubset<T, AviationSettlementUpdateArgs<ExtArgs>>): Prisma__AviationSettlementClient<$Result.GetResult<Prisma.$AviationSettlementPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AviationSettlements.
     * @param {AviationSettlementDeleteManyArgs} args - Arguments to filter AviationSettlements to delete.
     * @example
     * // Delete a few AviationSettlements
     * const { count } = await prisma.aviationSettlement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AviationSettlementDeleteManyArgs>(args?: SelectSubset<T, AviationSettlementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AviationSettlements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AviationSettlementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AviationSettlements
     * const aviationSettlement = await prisma.aviationSettlement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AviationSettlementUpdateManyArgs>(args: SelectSubset<T, AviationSettlementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AviationSettlement.
     * @param {AviationSettlementUpsertArgs} args - Arguments to update or create a AviationSettlement.
     * @example
     * // Update or create a AviationSettlement
     * const aviationSettlement = await prisma.aviationSettlement.upsert({
     *   create: {
     *     // ... data to create a AviationSettlement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AviationSettlement we want to update
     *   }
     * })
     */
    upsert<T extends AviationSettlementUpsertArgs>(args: SelectSubset<T, AviationSettlementUpsertArgs<ExtArgs>>): Prisma__AviationSettlementClient<$Result.GetResult<Prisma.$AviationSettlementPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AviationSettlements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AviationSettlementCountArgs} args - Arguments to filter AviationSettlements to count.
     * @example
     * // Count the number of AviationSettlements
     * const count = await prisma.aviationSettlement.count({
     *   where: {
     *     // ... the filter for the AviationSettlements we want to count
     *   }
     * })
    **/
    count<T extends AviationSettlementCountArgs>(
      args?: Subset<T, AviationSettlementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AviationSettlementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AviationSettlement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AviationSettlementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AviationSettlementAggregateArgs>(args: Subset<T, AviationSettlementAggregateArgs>): Prisma.PrismaPromise<GetAviationSettlementAggregateType<T>>

    /**
     * Group by AviationSettlement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AviationSettlementGroupByArgs} args - Group by arguments.
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
      T extends AviationSettlementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AviationSettlementGroupByArgs['orderBy'] }
        : { orderBy?: AviationSettlementGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AviationSettlementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAviationSettlementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AviationSettlement model
   */
  readonly fields: AviationSettlementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AviationSettlement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AviationSettlementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AviationSettlement model
   */ 
  interface AviationSettlementFieldRefs {
    readonly id: FieldRef<"AviationSettlement", 'String'>
    readonly orgId: FieldRef<"AviationSettlement", 'String'>
    readonly partId: FieldRef<"AviationSettlement", 'String'>
    readonly buyerRef: FieldRef<"AviationSettlement", 'String'>
    readonly sellerRef: FieldRef<"AviationSettlement", 'String'>
    readonly amountMinor: FieldRef<"AviationSettlement", 'BigInt'>
    readonly currency: FieldRef<"AviationSettlement", 'String'>
    readonly status: FieldRef<"AviationSettlement", 'AviationSettlementStatus'>
    readonly escrowIntentId: FieldRef<"AviationSettlement", 'String'>
    readonly createdAt: FieldRef<"AviationSettlement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AviationSettlement findUnique
   */
  export type AviationSettlementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AviationSettlement
     */
    select?: AviationSettlementSelect<ExtArgs> | null
    /**
     * Filter, which AviationSettlement to fetch.
     */
    where: AviationSettlementWhereUniqueInput
  }

  /**
   * AviationSettlement findUniqueOrThrow
   */
  export type AviationSettlementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AviationSettlement
     */
    select?: AviationSettlementSelect<ExtArgs> | null
    /**
     * Filter, which AviationSettlement to fetch.
     */
    where: AviationSettlementWhereUniqueInput
  }

  /**
   * AviationSettlement findFirst
   */
  export type AviationSettlementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AviationSettlement
     */
    select?: AviationSettlementSelect<ExtArgs> | null
    /**
     * Filter, which AviationSettlement to fetch.
     */
    where?: AviationSettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AviationSettlements to fetch.
     */
    orderBy?: AviationSettlementOrderByWithRelationInput | AviationSettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AviationSettlements.
     */
    cursor?: AviationSettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AviationSettlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AviationSettlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AviationSettlements.
     */
    distinct?: AviationSettlementScalarFieldEnum | AviationSettlementScalarFieldEnum[]
  }

  /**
   * AviationSettlement findFirstOrThrow
   */
  export type AviationSettlementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AviationSettlement
     */
    select?: AviationSettlementSelect<ExtArgs> | null
    /**
     * Filter, which AviationSettlement to fetch.
     */
    where?: AviationSettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AviationSettlements to fetch.
     */
    orderBy?: AviationSettlementOrderByWithRelationInput | AviationSettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AviationSettlements.
     */
    cursor?: AviationSettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AviationSettlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AviationSettlements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AviationSettlements.
     */
    distinct?: AviationSettlementScalarFieldEnum | AviationSettlementScalarFieldEnum[]
  }

  /**
   * AviationSettlement findMany
   */
  export type AviationSettlementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AviationSettlement
     */
    select?: AviationSettlementSelect<ExtArgs> | null
    /**
     * Filter, which AviationSettlements to fetch.
     */
    where?: AviationSettlementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AviationSettlements to fetch.
     */
    orderBy?: AviationSettlementOrderByWithRelationInput | AviationSettlementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AviationSettlements.
     */
    cursor?: AviationSettlementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AviationSettlements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AviationSettlements.
     */
    skip?: number
    distinct?: AviationSettlementScalarFieldEnum | AviationSettlementScalarFieldEnum[]
  }

  /**
   * AviationSettlement create
   */
  export type AviationSettlementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AviationSettlement
     */
    select?: AviationSettlementSelect<ExtArgs> | null
    /**
     * The data needed to create a AviationSettlement.
     */
    data: XOR<AviationSettlementCreateInput, AviationSettlementUncheckedCreateInput>
  }

  /**
   * AviationSettlement createMany
   */
  export type AviationSettlementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AviationSettlements.
     */
    data: AviationSettlementCreateManyInput | AviationSettlementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AviationSettlement createManyAndReturn
   */
  export type AviationSettlementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AviationSettlement
     */
    select?: AviationSettlementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AviationSettlements.
     */
    data: AviationSettlementCreateManyInput | AviationSettlementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AviationSettlement update
   */
  export type AviationSettlementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AviationSettlement
     */
    select?: AviationSettlementSelect<ExtArgs> | null
    /**
     * The data needed to update a AviationSettlement.
     */
    data: XOR<AviationSettlementUpdateInput, AviationSettlementUncheckedUpdateInput>
    /**
     * Choose, which AviationSettlement to update.
     */
    where: AviationSettlementWhereUniqueInput
  }

  /**
   * AviationSettlement updateMany
   */
  export type AviationSettlementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AviationSettlements.
     */
    data: XOR<AviationSettlementUpdateManyMutationInput, AviationSettlementUncheckedUpdateManyInput>
    /**
     * Filter which AviationSettlements to update
     */
    where?: AviationSettlementWhereInput
  }

  /**
   * AviationSettlement upsert
   */
  export type AviationSettlementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AviationSettlement
     */
    select?: AviationSettlementSelect<ExtArgs> | null
    /**
     * The filter to search for the AviationSettlement to update in case it exists.
     */
    where: AviationSettlementWhereUniqueInput
    /**
     * In case the AviationSettlement found by the `where` argument doesn't exist, create a new AviationSettlement with this data.
     */
    create: XOR<AviationSettlementCreateInput, AviationSettlementUncheckedCreateInput>
    /**
     * In case the AviationSettlement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AviationSettlementUpdateInput, AviationSettlementUncheckedUpdateInput>
  }

  /**
   * AviationSettlement delete
   */
  export type AviationSettlementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AviationSettlement
     */
    select?: AviationSettlementSelect<ExtArgs> | null
    /**
     * Filter which AviationSettlement to delete.
     */
    where: AviationSettlementWhereUniqueInput
  }

  /**
   * AviationSettlement deleteMany
   */
  export type AviationSettlementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AviationSettlements to delete
     */
    where?: AviationSettlementWhereInput
  }

  /**
   * AviationSettlement without action
   */
  export type AviationSettlementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AviationSettlement
     */
    select?: AviationSettlementSelect<ExtArgs> | null
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


  export const AircraftScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    tail: 'tail',
    model: 'model',
    ownerRef: 'ownerRef',
    createdAt: 'createdAt'
  };

  export type AircraftScalarFieldEnum = (typeof AircraftScalarFieldEnum)[keyof typeof AircraftScalarFieldEnum]


  export const PartScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    aircraftId: 'aircraftId',
    serial: 'serial',
    partType: 'partType',
    lifecycleStatus: 'lifecycleStatus',
    tokenId: 'tokenId',
    createdAt: 'createdAt'
  };

  export type PartScalarFieldEnum = (typeof PartScalarFieldEnum)[keyof typeof PartScalarFieldEnum]


  export const MaintenanceEventScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    partId: 'partId',
    action: 'action',
    technicianRef: 'technicianRef',
    attestationId: 'attestationId',
    createdAt: 'createdAt'
  };

  export type MaintenanceEventScalarFieldEnum = (typeof MaintenanceEventScalarFieldEnum)[keyof typeof MaintenanceEventScalarFieldEnum]


  export const AirworthinessCertScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    aircraftId: 'aircraftId',
    attestationId: 'attestationId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type AirworthinessCertScalarFieldEnum = (typeof AirworthinessCertScalarFieldEnum)[keyof typeof AirworthinessCertScalarFieldEnum]


  export const AviationSettlementScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    partId: 'partId',
    buyerRef: 'buyerRef',
    sellerRef: 'sellerRef',
    amountMinor: 'amountMinor',
    currency: 'currency',
    status: 'status',
    escrowIntentId: 'escrowIntentId',
    createdAt: 'createdAt'
  };

  export type AviationSettlementScalarFieldEnum = (typeof AviationSettlementScalarFieldEnum)[keyof typeof AviationSettlementScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'PartLifecycle'
   */
  export type EnumPartLifecycleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PartLifecycle'>
    


  /**
   * Reference to a field of type 'PartLifecycle[]'
   */
  export type ListEnumPartLifecycleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PartLifecycle[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'AviationSettlementStatus'
   */
  export type EnumAviationSettlementStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AviationSettlementStatus'>
    


  /**
   * Reference to a field of type 'AviationSettlementStatus[]'
   */
  export type ListEnumAviationSettlementStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AviationSettlementStatus[]'>
    


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

  export type AircraftWhereInput = {
    AND?: AircraftWhereInput | AircraftWhereInput[]
    OR?: AircraftWhereInput[]
    NOT?: AircraftWhereInput | AircraftWhereInput[]
    id?: StringFilter<"Aircraft"> | string
    orgId?: StringFilter<"Aircraft"> | string
    tail?: StringFilter<"Aircraft"> | string
    model?: StringFilter<"Aircraft"> | string
    ownerRef?: StringFilter<"Aircraft"> | string
    createdAt?: DateTimeFilter<"Aircraft"> | Date | string
    parts?: PartListRelationFilter
  }

  export type AircraftOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    tail?: SortOrder
    model?: SortOrder
    ownerRef?: SortOrder
    createdAt?: SortOrder
    parts?: PartOrderByRelationAggregateInput
  }

  export type AircraftWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orgId_tail?: AircraftOrgIdTailCompoundUniqueInput
    AND?: AircraftWhereInput | AircraftWhereInput[]
    OR?: AircraftWhereInput[]
    NOT?: AircraftWhereInput | AircraftWhereInput[]
    orgId?: StringFilter<"Aircraft"> | string
    tail?: StringFilter<"Aircraft"> | string
    model?: StringFilter<"Aircraft"> | string
    ownerRef?: StringFilter<"Aircraft"> | string
    createdAt?: DateTimeFilter<"Aircraft"> | Date | string
    parts?: PartListRelationFilter
  }, "id" | "orgId_tail">

  export type AircraftOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    tail?: SortOrder
    model?: SortOrder
    ownerRef?: SortOrder
    createdAt?: SortOrder
    _count?: AircraftCountOrderByAggregateInput
    _max?: AircraftMaxOrderByAggregateInput
    _min?: AircraftMinOrderByAggregateInput
  }

  export type AircraftScalarWhereWithAggregatesInput = {
    AND?: AircraftScalarWhereWithAggregatesInput | AircraftScalarWhereWithAggregatesInput[]
    OR?: AircraftScalarWhereWithAggregatesInput[]
    NOT?: AircraftScalarWhereWithAggregatesInput | AircraftScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Aircraft"> | string
    orgId?: StringWithAggregatesFilter<"Aircraft"> | string
    tail?: StringWithAggregatesFilter<"Aircraft"> | string
    model?: StringWithAggregatesFilter<"Aircraft"> | string
    ownerRef?: StringWithAggregatesFilter<"Aircraft"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Aircraft"> | Date | string
  }

  export type PartWhereInput = {
    AND?: PartWhereInput | PartWhereInput[]
    OR?: PartWhereInput[]
    NOT?: PartWhereInput | PartWhereInput[]
    id?: StringFilter<"Part"> | string
    orgId?: StringFilter<"Part"> | string
    aircraftId?: StringNullableFilter<"Part"> | string | null
    serial?: StringFilter<"Part"> | string
    partType?: StringFilter<"Part"> | string
    lifecycleStatus?: EnumPartLifecycleFilter<"Part"> | $Enums.PartLifecycle
    tokenId?: StringNullableFilter<"Part"> | string | null
    createdAt?: DateTimeFilter<"Part"> | Date | string
    aircraft?: XOR<AircraftNullableRelationFilter, AircraftWhereInput> | null
    maintenance?: MaintenanceEventListRelationFilter
  }

  export type PartOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    aircraftId?: SortOrderInput | SortOrder
    serial?: SortOrder
    partType?: SortOrder
    lifecycleStatus?: SortOrder
    tokenId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    aircraft?: AircraftOrderByWithRelationInput
    maintenance?: MaintenanceEventOrderByRelationAggregateInput
  }

  export type PartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orgId_serial?: PartOrgIdSerialCompoundUniqueInput
    AND?: PartWhereInput | PartWhereInput[]
    OR?: PartWhereInput[]
    NOT?: PartWhereInput | PartWhereInput[]
    orgId?: StringFilter<"Part"> | string
    aircraftId?: StringNullableFilter<"Part"> | string | null
    serial?: StringFilter<"Part"> | string
    partType?: StringFilter<"Part"> | string
    lifecycleStatus?: EnumPartLifecycleFilter<"Part"> | $Enums.PartLifecycle
    tokenId?: StringNullableFilter<"Part"> | string | null
    createdAt?: DateTimeFilter<"Part"> | Date | string
    aircraft?: XOR<AircraftNullableRelationFilter, AircraftWhereInput> | null
    maintenance?: MaintenanceEventListRelationFilter
  }, "id" | "orgId_serial">

  export type PartOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    aircraftId?: SortOrderInput | SortOrder
    serial?: SortOrder
    partType?: SortOrder
    lifecycleStatus?: SortOrder
    tokenId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PartCountOrderByAggregateInput
    _max?: PartMaxOrderByAggregateInput
    _min?: PartMinOrderByAggregateInput
  }

  export type PartScalarWhereWithAggregatesInput = {
    AND?: PartScalarWhereWithAggregatesInput | PartScalarWhereWithAggregatesInput[]
    OR?: PartScalarWhereWithAggregatesInput[]
    NOT?: PartScalarWhereWithAggregatesInput | PartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Part"> | string
    orgId?: StringWithAggregatesFilter<"Part"> | string
    aircraftId?: StringNullableWithAggregatesFilter<"Part"> | string | null
    serial?: StringWithAggregatesFilter<"Part"> | string
    partType?: StringWithAggregatesFilter<"Part"> | string
    lifecycleStatus?: EnumPartLifecycleWithAggregatesFilter<"Part"> | $Enums.PartLifecycle
    tokenId?: StringNullableWithAggregatesFilter<"Part"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Part"> | Date | string
  }

  export type MaintenanceEventWhereInput = {
    AND?: MaintenanceEventWhereInput | MaintenanceEventWhereInput[]
    OR?: MaintenanceEventWhereInput[]
    NOT?: MaintenanceEventWhereInput | MaintenanceEventWhereInput[]
    id?: StringFilter<"MaintenanceEvent"> | string
    orgId?: StringFilter<"MaintenanceEvent"> | string
    partId?: StringFilter<"MaintenanceEvent"> | string
    action?: StringFilter<"MaintenanceEvent"> | string
    technicianRef?: StringFilter<"MaintenanceEvent"> | string
    attestationId?: StringNullableFilter<"MaintenanceEvent"> | string | null
    createdAt?: DateTimeFilter<"MaintenanceEvent"> | Date | string
    part?: XOR<PartRelationFilter, PartWhereInput>
  }

  export type MaintenanceEventOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    partId?: SortOrder
    action?: SortOrder
    technicianRef?: SortOrder
    attestationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    part?: PartOrderByWithRelationInput
  }

  export type MaintenanceEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MaintenanceEventWhereInput | MaintenanceEventWhereInput[]
    OR?: MaintenanceEventWhereInput[]
    NOT?: MaintenanceEventWhereInput | MaintenanceEventWhereInput[]
    orgId?: StringFilter<"MaintenanceEvent"> | string
    partId?: StringFilter<"MaintenanceEvent"> | string
    action?: StringFilter<"MaintenanceEvent"> | string
    technicianRef?: StringFilter<"MaintenanceEvent"> | string
    attestationId?: StringNullableFilter<"MaintenanceEvent"> | string | null
    createdAt?: DateTimeFilter<"MaintenanceEvent"> | Date | string
    part?: XOR<PartRelationFilter, PartWhereInput>
  }, "id">

  export type MaintenanceEventOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    partId?: SortOrder
    action?: SortOrder
    technicianRef?: SortOrder
    attestationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MaintenanceEventCountOrderByAggregateInput
    _max?: MaintenanceEventMaxOrderByAggregateInput
    _min?: MaintenanceEventMinOrderByAggregateInput
  }

  export type MaintenanceEventScalarWhereWithAggregatesInput = {
    AND?: MaintenanceEventScalarWhereWithAggregatesInput | MaintenanceEventScalarWhereWithAggregatesInput[]
    OR?: MaintenanceEventScalarWhereWithAggregatesInput[]
    NOT?: MaintenanceEventScalarWhereWithAggregatesInput | MaintenanceEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MaintenanceEvent"> | string
    orgId?: StringWithAggregatesFilter<"MaintenanceEvent"> | string
    partId?: StringWithAggregatesFilter<"MaintenanceEvent"> | string
    action?: StringWithAggregatesFilter<"MaintenanceEvent"> | string
    technicianRef?: StringWithAggregatesFilter<"MaintenanceEvent"> | string
    attestationId?: StringNullableWithAggregatesFilter<"MaintenanceEvent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MaintenanceEvent"> | Date | string
  }

  export type AirworthinessCertWhereInput = {
    AND?: AirworthinessCertWhereInput | AirworthinessCertWhereInput[]
    OR?: AirworthinessCertWhereInput[]
    NOT?: AirworthinessCertWhereInput | AirworthinessCertWhereInput[]
    id?: StringFilter<"AirworthinessCert"> | string
    orgId?: StringFilter<"AirworthinessCert"> | string
    aircraftId?: StringFilter<"AirworthinessCert"> | string
    attestationId?: StringFilter<"AirworthinessCert"> | string
    expiresAt?: DateTimeFilter<"AirworthinessCert"> | Date | string
    createdAt?: DateTimeFilter<"AirworthinessCert"> | Date | string
  }

  export type AirworthinessCertOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    aircraftId?: SortOrder
    attestationId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AirworthinessCertWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AirworthinessCertWhereInput | AirworthinessCertWhereInput[]
    OR?: AirworthinessCertWhereInput[]
    NOT?: AirworthinessCertWhereInput | AirworthinessCertWhereInput[]
    orgId?: StringFilter<"AirworthinessCert"> | string
    aircraftId?: StringFilter<"AirworthinessCert"> | string
    attestationId?: StringFilter<"AirworthinessCert"> | string
    expiresAt?: DateTimeFilter<"AirworthinessCert"> | Date | string
    createdAt?: DateTimeFilter<"AirworthinessCert"> | Date | string
  }, "id">

  export type AirworthinessCertOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    aircraftId?: SortOrder
    attestationId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: AirworthinessCertCountOrderByAggregateInput
    _max?: AirworthinessCertMaxOrderByAggregateInput
    _min?: AirworthinessCertMinOrderByAggregateInput
  }

  export type AirworthinessCertScalarWhereWithAggregatesInput = {
    AND?: AirworthinessCertScalarWhereWithAggregatesInput | AirworthinessCertScalarWhereWithAggregatesInput[]
    OR?: AirworthinessCertScalarWhereWithAggregatesInput[]
    NOT?: AirworthinessCertScalarWhereWithAggregatesInput | AirworthinessCertScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AirworthinessCert"> | string
    orgId?: StringWithAggregatesFilter<"AirworthinessCert"> | string
    aircraftId?: StringWithAggregatesFilter<"AirworthinessCert"> | string
    attestationId?: StringWithAggregatesFilter<"AirworthinessCert"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"AirworthinessCert"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"AirworthinessCert"> | Date | string
  }

  export type AviationSettlementWhereInput = {
    AND?: AviationSettlementWhereInput | AviationSettlementWhereInput[]
    OR?: AviationSettlementWhereInput[]
    NOT?: AviationSettlementWhereInput | AviationSettlementWhereInput[]
    id?: StringFilter<"AviationSettlement"> | string
    orgId?: StringFilter<"AviationSettlement"> | string
    partId?: StringFilter<"AviationSettlement"> | string
    buyerRef?: StringFilter<"AviationSettlement"> | string
    sellerRef?: StringFilter<"AviationSettlement"> | string
    amountMinor?: BigIntFilter<"AviationSettlement"> | bigint | number
    currency?: StringFilter<"AviationSettlement"> | string
    status?: EnumAviationSettlementStatusFilter<"AviationSettlement"> | $Enums.AviationSettlementStatus
    escrowIntentId?: StringNullableFilter<"AviationSettlement"> | string | null
    createdAt?: DateTimeFilter<"AviationSettlement"> | Date | string
  }

  export type AviationSettlementOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    partId?: SortOrder
    buyerRef?: SortOrder
    sellerRef?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AviationSettlementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AviationSettlementWhereInput | AviationSettlementWhereInput[]
    OR?: AviationSettlementWhereInput[]
    NOT?: AviationSettlementWhereInput | AviationSettlementWhereInput[]
    orgId?: StringFilter<"AviationSettlement"> | string
    partId?: StringFilter<"AviationSettlement"> | string
    buyerRef?: StringFilter<"AviationSettlement"> | string
    sellerRef?: StringFilter<"AviationSettlement"> | string
    amountMinor?: BigIntFilter<"AviationSettlement"> | bigint | number
    currency?: StringFilter<"AviationSettlement"> | string
    status?: EnumAviationSettlementStatusFilter<"AviationSettlement"> | $Enums.AviationSettlementStatus
    escrowIntentId?: StringNullableFilter<"AviationSettlement"> | string | null
    createdAt?: DateTimeFilter<"AviationSettlement"> | Date | string
  }, "id">

  export type AviationSettlementOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    partId?: SortOrder
    buyerRef?: SortOrder
    sellerRef?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AviationSettlementCountOrderByAggregateInput
    _avg?: AviationSettlementAvgOrderByAggregateInput
    _max?: AviationSettlementMaxOrderByAggregateInput
    _min?: AviationSettlementMinOrderByAggregateInput
    _sum?: AviationSettlementSumOrderByAggregateInput
  }

  export type AviationSettlementScalarWhereWithAggregatesInput = {
    AND?: AviationSettlementScalarWhereWithAggregatesInput | AviationSettlementScalarWhereWithAggregatesInput[]
    OR?: AviationSettlementScalarWhereWithAggregatesInput[]
    NOT?: AviationSettlementScalarWhereWithAggregatesInput | AviationSettlementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AviationSettlement"> | string
    orgId?: StringWithAggregatesFilter<"AviationSettlement"> | string
    partId?: StringWithAggregatesFilter<"AviationSettlement"> | string
    buyerRef?: StringWithAggregatesFilter<"AviationSettlement"> | string
    sellerRef?: StringWithAggregatesFilter<"AviationSettlement"> | string
    amountMinor?: BigIntWithAggregatesFilter<"AviationSettlement"> | bigint | number
    currency?: StringWithAggregatesFilter<"AviationSettlement"> | string
    status?: EnumAviationSettlementStatusWithAggregatesFilter<"AviationSettlement"> | $Enums.AviationSettlementStatus
    escrowIntentId?: StringNullableWithAggregatesFilter<"AviationSettlement"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AviationSettlement"> | Date | string
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

  export type AircraftCreateInput = {
    id: string
    orgId: string
    tail: string
    model: string
    ownerRef: string
    createdAt?: Date | string
    parts?: PartCreateNestedManyWithoutAircraftInput
  }

  export type AircraftUncheckedCreateInput = {
    id: string
    orgId: string
    tail: string
    model: string
    ownerRef: string
    createdAt?: Date | string
    parts?: PartUncheckedCreateNestedManyWithoutAircraftInput
  }

  export type AircraftUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    tail?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    ownerRef?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parts?: PartUpdateManyWithoutAircraftNestedInput
  }

  export type AircraftUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    tail?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    ownerRef?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parts?: PartUncheckedUpdateManyWithoutAircraftNestedInput
  }

  export type AircraftCreateManyInput = {
    id: string
    orgId: string
    tail: string
    model: string
    ownerRef: string
    createdAt?: Date | string
  }

  export type AircraftUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    tail?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    ownerRef?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AircraftUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    tail?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    ownerRef?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartCreateInput = {
    id: string
    orgId: string
    serial: string
    partType: string
    lifecycleStatus?: $Enums.PartLifecycle
    tokenId?: string | null
    createdAt?: Date | string
    aircraft?: AircraftCreateNestedOneWithoutPartsInput
    maintenance?: MaintenanceEventCreateNestedManyWithoutPartInput
  }

  export type PartUncheckedCreateInput = {
    id: string
    orgId: string
    aircraftId?: string | null
    serial: string
    partType: string
    lifecycleStatus?: $Enums.PartLifecycle
    tokenId?: string | null
    createdAt?: Date | string
    maintenance?: MaintenanceEventUncheckedCreateNestedManyWithoutPartInput
  }

  export type PartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    partType?: StringFieldUpdateOperationsInput | string
    lifecycleStatus?: EnumPartLifecycleFieldUpdateOperationsInput | $Enums.PartLifecycle
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aircraft?: AircraftUpdateOneWithoutPartsNestedInput
    maintenance?: MaintenanceEventUpdateManyWithoutPartNestedInput
  }

  export type PartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    aircraftId?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    partType?: StringFieldUpdateOperationsInput | string
    lifecycleStatus?: EnumPartLifecycleFieldUpdateOperationsInput | $Enums.PartLifecycle
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenance?: MaintenanceEventUncheckedUpdateManyWithoutPartNestedInput
  }

  export type PartCreateManyInput = {
    id: string
    orgId: string
    aircraftId?: string | null
    serial: string
    partType: string
    lifecycleStatus?: $Enums.PartLifecycle
    tokenId?: string | null
    createdAt?: Date | string
  }

  export type PartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    partType?: StringFieldUpdateOperationsInput | string
    lifecycleStatus?: EnumPartLifecycleFieldUpdateOperationsInput | $Enums.PartLifecycle
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    aircraftId?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    partType?: StringFieldUpdateOperationsInput | string
    lifecycleStatus?: EnumPartLifecycleFieldUpdateOperationsInput | $Enums.PartLifecycle
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintenanceEventCreateInput = {
    id: string
    orgId: string
    action: string
    technicianRef: string
    attestationId?: string | null
    createdAt?: Date | string
    part: PartCreateNestedOneWithoutMaintenanceInput
  }

  export type MaintenanceEventUncheckedCreateInput = {
    id: string
    orgId: string
    partId: string
    action: string
    technicianRef: string
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type MaintenanceEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    technicianRef?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    part?: PartUpdateOneRequiredWithoutMaintenanceNestedInput
  }

  export type MaintenanceEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    technicianRef?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintenanceEventCreateManyInput = {
    id: string
    orgId: string
    partId: string
    action: string
    technicianRef: string
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type MaintenanceEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    technicianRef?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintenanceEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    technicianRef?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AirworthinessCertCreateInput = {
    id: string
    orgId: string
    aircraftId: string
    attestationId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type AirworthinessCertUncheckedCreateInput = {
    id: string
    orgId: string
    aircraftId: string
    attestationId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type AirworthinessCertUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    aircraftId?: StringFieldUpdateOperationsInput | string
    attestationId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AirworthinessCertUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    aircraftId?: StringFieldUpdateOperationsInput | string
    attestationId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AirworthinessCertCreateManyInput = {
    id: string
    orgId: string
    aircraftId: string
    attestationId: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type AirworthinessCertUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    aircraftId?: StringFieldUpdateOperationsInput | string
    attestationId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AirworthinessCertUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    aircraftId?: StringFieldUpdateOperationsInput | string
    attestationId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AviationSettlementCreateInput = {
    id: string
    orgId: string
    partId: string
    buyerRef: string
    sellerRef: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.AviationSettlementStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type AviationSettlementUncheckedCreateInput = {
    id: string
    orgId: string
    partId: string
    buyerRef: string
    sellerRef: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.AviationSettlementStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type AviationSettlementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    buyerRef?: StringFieldUpdateOperationsInput | string
    sellerRef?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumAviationSettlementStatusFieldUpdateOperationsInput | $Enums.AviationSettlementStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AviationSettlementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    buyerRef?: StringFieldUpdateOperationsInput | string
    sellerRef?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumAviationSettlementStatusFieldUpdateOperationsInput | $Enums.AviationSettlementStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AviationSettlementCreateManyInput = {
    id: string
    orgId: string
    partId: string
    buyerRef: string
    sellerRef: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.AviationSettlementStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type AviationSettlementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    buyerRef?: StringFieldUpdateOperationsInput | string
    sellerRef?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumAviationSettlementStatusFieldUpdateOperationsInput | $Enums.AviationSettlementStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AviationSettlementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    buyerRef?: StringFieldUpdateOperationsInput | string
    sellerRef?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumAviationSettlementStatusFieldUpdateOperationsInput | $Enums.AviationSettlementStatus
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

  export type PartListRelationFilter = {
    every?: PartWhereInput
    some?: PartWhereInput
    none?: PartWhereInput
  }

  export type PartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AircraftOrgIdTailCompoundUniqueInput = {
    orgId: string
    tail: string
  }

  export type AircraftCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    tail?: SortOrder
    model?: SortOrder
    ownerRef?: SortOrder
    createdAt?: SortOrder
  }

  export type AircraftMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    tail?: SortOrder
    model?: SortOrder
    ownerRef?: SortOrder
    createdAt?: SortOrder
  }

  export type AircraftMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    tail?: SortOrder
    model?: SortOrder
    ownerRef?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumPartLifecycleFilter<$PrismaModel = never> = {
    equals?: $Enums.PartLifecycle | EnumPartLifecycleFieldRefInput<$PrismaModel>
    in?: $Enums.PartLifecycle[] | ListEnumPartLifecycleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartLifecycle[] | ListEnumPartLifecycleFieldRefInput<$PrismaModel>
    not?: NestedEnumPartLifecycleFilter<$PrismaModel> | $Enums.PartLifecycle
  }

  export type AircraftNullableRelationFilter = {
    is?: AircraftWhereInput | null
    isNot?: AircraftWhereInput | null
  }

  export type MaintenanceEventListRelationFilter = {
    every?: MaintenanceEventWhereInput
    some?: MaintenanceEventWhereInput
    none?: MaintenanceEventWhereInput
  }

  export type MaintenanceEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PartOrgIdSerialCompoundUniqueInput = {
    orgId: string
    serial: string
  }

  export type PartCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    aircraftId?: SortOrder
    serial?: SortOrder
    partType?: SortOrder
    lifecycleStatus?: SortOrder
    tokenId?: SortOrder
    createdAt?: SortOrder
  }

  export type PartMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    aircraftId?: SortOrder
    serial?: SortOrder
    partType?: SortOrder
    lifecycleStatus?: SortOrder
    tokenId?: SortOrder
    createdAt?: SortOrder
  }

  export type PartMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    aircraftId?: SortOrder
    serial?: SortOrder
    partType?: SortOrder
    lifecycleStatus?: SortOrder
    tokenId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumPartLifecycleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PartLifecycle | EnumPartLifecycleFieldRefInput<$PrismaModel>
    in?: $Enums.PartLifecycle[] | ListEnumPartLifecycleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartLifecycle[] | ListEnumPartLifecycleFieldRefInput<$PrismaModel>
    not?: NestedEnumPartLifecycleWithAggregatesFilter<$PrismaModel> | $Enums.PartLifecycle
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPartLifecycleFilter<$PrismaModel>
    _max?: NestedEnumPartLifecycleFilter<$PrismaModel>
  }

  export type PartRelationFilter = {
    is?: PartWhereInput
    isNot?: PartWhereInput
  }

  export type MaintenanceEventCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    partId?: SortOrder
    action?: SortOrder
    technicianRef?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type MaintenanceEventMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    partId?: SortOrder
    action?: SortOrder
    technicianRef?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type MaintenanceEventMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    partId?: SortOrder
    action?: SortOrder
    technicianRef?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type AirworthinessCertCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    aircraftId?: SortOrder
    attestationId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AirworthinessCertMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    aircraftId?: SortOrder
    attestationId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AirworthinessCertMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    aircraftId?: SortOrder
    attestationId?: SortOrder
    expiresAt?: SortOrder
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

  export type EnumAviationSettlementStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AviationSettlementStatus | EnumAviationSettlementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AviationSettlementStatus[] | ListEnumAviationSettlementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AviationSettlementStatus[] | ListEnumAviationSettlementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAviationSettlementStatusFilter<$PrismaModel> | $Enums.AviationSettlementStatus
  }

  export type AviationSettlementCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    partId?: SortOrder
    buyerRef?: SortOrder
    sellerRef?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AviationSettlementAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type AviationSettlementMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    partId?: SortOrder
    buyerRef?: SortOrder
    sellerRef?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AviationSettlementMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    partId?: SortOrder
    buyerRef?: SortOrder
    sellerRef?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type AviationSettlementSumOrderByAggregateInput = {
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

  export type EnumAviationSettlementStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AviationSettlementStatus | EnumAviationSettlementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AviationSettlementStatus[] | ListEnumAviationSettlementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AviationSettlementStatus[] | ListEnumAviationSettlementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAviationSettlementStatusWithAggregatesFilter<$PrismaModel> | $Enums.AviationSettlementStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAviationSettlementStatusFilter<$PrismaModel>
    _max?: NestedEnumAviationSettlementStatusFilter<$PrismaModel>
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

  export type PartCreateNestedManyWithoutAircraftInput = {
    create?: XOR<PartCreateWithoutAircraftInput, PartUncheckedCreateWithoutAircraftInput> | PartCreateWithoutAircraftInput[] | PartUncheckedCreateWithoutAircraftInput[]
    connectOrCreate?: PartCreateOrConnectWithoutAircraftInput | PartCreateOrConnectWithoutAircraftInput[]
    createMany?: PartCreateManyAircraftInputEnvelope
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
  }

  export type PartUncheckedCreateNestedManyWithoutAircraftInput = {
    create?: XOR<PartCreateWithoutAircraftInput, PartUncheckedCreateWithoutAircraftInput> | PartCreateWithoutAircraftInput[] | PartUncheckedCreateWithoutAircraftInput[]
    connectOrCreate?: PartCreateOrConnectWithoutAircraftInput | PartCreateOrConnectWithoutAircraftInput[]
    createMany?: PartCreateManyAircraftInputEnvelope
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
  }

  export type PartUpdateManyWithoutAircraftNestedInput = {
    create?: XOR<PartCreateWithoutAircraftInput, PartUncheckedCreateWithoutAircraftInput> | PartCreateWithoutAircraftInput[] | PartUncheckedCreateWithoutAircraftInput[]
    connectOrCreate?: PartCreateOrConnectWithoutAircraftInput | PartCreateOrConnectWithoutAircraftInput[]
    upsert?: PartUpsertWithWhereUniqueWithoutAircraftInput | PartUpsertWithWhereUniqueWithoutAircraftInput[]
    createMany?: PartCreateManyAircraftInputEnvelope
    set?: PartWhereUniqueInput | PartWhereUniqueInput[]
    disconnect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    delete?: PartWhereUniqueInput | PartWhereUniqueInput[]
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    update?: PartUpdateWithWhereUniqueWithoutAircraftInput | PartUpdateWithWhereUniqueWithoutAircraftInput[]
    updateMany?: PartUpdateManyWithWhereWithoutAircraftInput | PartUpdateManyWithWhereWithoutAircraftInput[]
    deleteMany?: PartScalarWhereInput | PartScalarWhereInput[]
  }

  export type PartUncheckedUpdateManyWithoutAircraftNestedInput = {
    create?: XOR<PartCreateWithoutAircraftInput, PartUncheckedCreateWithoutAircraftInput> | PartCreateWithoutAircraftInput[] | PartUncheckedCreateWithoutAircraftInput[]
    connectOrCreate?: PartCreateOrConnectWithoutAircraftInput | PartCreateOrConnectWithoutAircraftInput[]
    upsert?: PartUpsertWithWhereUniqueWithoutAircraftInput | PartUpsertWithWhereUniqueWithoutAircraftInput[]
    createMany?: PartCreateManyAircraftInputEnvelope
    set?: PartWhereUniqueInput | PartWhereUniqueInput[]
    disconnect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    delete?: PartWhereUniqueInput | PartWhereUniqueInput[]
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    update?: PartUpdateWithWhereUniqueWithoutAircraftInput | PartUpdateWithWhereUniqueWithoutAircraftInput[]
    updateMany?: PartUpdateManyWithWhereWithoutAircraftInput | PartUpdateManyWithWhereWithoutAircraftInput[]
    deleteMany?: PartScalarWhereInput | PartScalarWhereInput[]
  }

  export type AircraftCreateNestedOneWithoutPartsInput = {
    create?: XOR<AircraftCreateWithoutPartsInput, AircraftUncheckedCreateWithoutPartsInput>
    connectOrCreate?: AircraftCreateOrConnectWithoutPartsInput
    connect?: AircraftWhereUniqueInput
  }

  export type MaintenanceEventCreateNestedManyWithoutPartInput = {
    create?: XOR<MaintenanceEventCreateWithoutPartInput, MaintenanceEventUncheckedCreateWithoutPartInput> | MaintenanceEventCreateWithoutPartInput[] | MaintenanceEventUncheckedCreateWithoutPartInput[]
    connectOrCreate?: MaintenanceEventCreateOrConnectWithoutPartInput | MaintenanceEventCreateOrConnectWithoutPartInput[]
    createMany?: MaintenanceEventCreateManyPartInputEnvelope
    connect?: MaintenanceEventWhereUniqueInput | MaintenanceEventWhereUniqueInput[]
  }

  export type MaintenanceEventUncheckedCreateNestedManyWithoutPartInput = {
    create?: XOR<MaintenanceEventCreateWithoutPartInput, MaintenanceEventUncheckedCreateWithoutPartInput> | MaintenanceEventCreateWithoutPartInput[] | MaintenanceEventUncheckedCreateWithoutPartInput[]
    connectOrCreate?: MaintenanceEventCreateOrConnectWithoutPartInput | MaintenanceEventCreateOrConnectWithoutPartInput[]
    createMany?: MaintenanceEventCreateManyPartInputEnvelope
    connect?: MaintenanceEventWhereUniqueInput | MaintenanceEventWhereUniqueInput[]
  }

  export type EnumPartLifecycleFieldUpdateOperationsInput = {
    set?: $Enums.PartLifecycle
  }

  export type AircraftUpdateOneWithoutPartsNestedInput = {
    create?: XOR<AircraftCreateWithoutPartsInput, AircraftUncheckedCreateWithoutPartsInput>
    connectOrCreate?: AircraftCreateOrConnectWithoutPartsInput
    upsert?: AircraftUpsertWithoutPartsInput
    disconnect?: AircraftWhereInput | boolean
    delete?: AircraftWhereInput | boolean
    connect?: AircraftWhereUniqueInput
    update?: XOR<XOR<AircraftUpdateToOneWithWhereWithoutPartsInput, AircraftUpdateWithoutPartsInput>, AircraftUncheckedUpdateWithoutPartsInput>
  }

  export type MaintenanceEventUpdateManyWithoutPartNestedInput = {
    create?: XOR<MaintenanceEventCreateWithoutPartInput, MaintenanceEventUncheckedCreateWithoutPartInput> | MaintenanceEventCreateWithoutPartInput[] | MaintenanceEventUncheckedCreateWithoutPartInput[]
    connectOrCreate?: MaintenanceEventCreateOrConnectWithoutPartInput | MaintenanceEventCreateOrConnectWithoutPartInput[]
    upsert?: MaintenanceEventUpsertWithWhereUniqueWithoutPartInput | MaintenanceEventUpsertWithWhereUniqueWithoutPartInput[]
    createMany?: MaintenanceEventCreateManyPartInputEnvelope
    set?: MaintenanceEventWhereUniqueInput | MaintenanceEventWhereUniqueInput[]
    disconnect?: MaintenanceEventWhereUniqueInput | MaintenanceEventWhereUniqueInput[]
    delete?: MaintenanceEventWhereUniqueInput | MaintenanceEventWhereUniqueInput[]
    connect?: MaintenanceEventWhereUniqueInput | MaintenanceEventWhereUniqueInput[]
    update?: MaintenanceEventUpdateWithWhereUniqueWithoutPartInput | MaintenanceEventUpdateWithWhereUniqueWithoutPartInput[]
    updateMany?: MaintenanceEventUpdateManyWithWhereWithoutPartInput | MaintenanceEventUpdateManyWithWhereWithoutPartInput[]
    deleteMany?: MaintenanceEventScalarWhereInput | MaintenanceEventScalarWhereInput[]
  }

  export type MaintenanceEventUncheckedUpdateManyWithoutPartNestedInput = {
    create?: XOR<MaintenanceEventCreateWithoutPartInput, MaintenanceEventUncheckedCreateWithoutPartInput> | MaintenanceEventCreateWithoutPartInput[] | MaintenanceEventUncheckedCreateWithoutPartInput[]
    connectOrCreate?: MaintenanceEventCreateOrConnectWithoutPartInput | MaintenanceEventCreateOrConnectWithoutPartInput[]
    upsert?: MaintenanceEventUpsertWithWhereUniqueWithoutPartInput | MaintenanceEventUpsertWithWhereUniqueWithoutPartInput[]
    createMany?: MaintenanceEventCreateManyPartInputEnvelope
    set?: MaintenanceEventWhereUniqueInput | MaintenanceEventWhereUniqueInput[]
    disconnect?: MaintenanceEventWhereUniqueInput | MaintenanceEventWhereUniqueInput[]
    delete?: MaintenanceEventWhereUniqueInput | MaintenanceEventWhereUniqueInput[]
    connect?: MaintenanceEventWhereUniqueInput | MaintenanceEventWhereUniqueInput[]
    update?: MaintenanceEventUpdateWithWhereUniqueWithoutPartInput | MaintenanceEventUpdateWithWhereUniqueWithoutPartInput[]
    updateMany?: MaintenanceEventUpdateManyWithWhereWithoutPartInput | MaintenanceEventUpdateManyWithWhereWithoutPartInput[]
    deleteMany?: MaintenanceEventScalarWhereInput | MaintenanceEventScalarWhereInput[]
  }

  export type PartCreateNestedOneWithoutMaintenanceInput = {
    create?: XOR<PartCreateWithoutMaintenanceInput, PartUncheckedCreateWithoutMaintenanceInput>
    connectOrCreate?: PartCreateOrConnectWithoutMaintenanceInput
    connect?: PartWhereUniqueInput
  }

  export type PartUpdateOneRequiredWithoutMaintenanceNestedInput = {
    create?: XOR<PartCreateWithoutMaintenanceInput, PartUncheckedCreateWithoutMaintenanceInput>
    connectOrCreate?: PartCreateOrConnectWithoutMaintenanceInput
    upsert?: PartUpsertWithoutMaintenanceInput
    connect?: PartWhereUniqueInput
    update?: XOR<XOR<PartUpdateToOneWithWhereWithoutMaintenanceInput, PartUpdateWithoutMaintenanceInput>, PartUncheckedUpdateWithoutMaintenanceInput>
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumAviationSettlementStatusFieldUpdateOperationsInput = {
    set?: $Enums.AviationSettlementStatus
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

  export type NestedEnumPartLifecycleFilter<$PrismaModel = never> = {
    equals?: $Enums.PartLifecycle | EnumPartLifecycleFieldRefInput<$PrismaModel>
    in?: $Enums.PartLifecycle[] | ListEnumPartLifecycleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartLifecycle[] | ListEnumPartLifecycleFieldRefInput<$PrismaModel>
    not?: NestedEnumPartLifecycleFilter<$PrismaModel> | $Enums.PartLifecycle
  }

  export type NestedEnumPartLifecycleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PartLifecycle | EnumPartLifecycleFieldRefInput<$PrismaModel>
    in?: $Enums.PartLifecycle[] | ListEnumPartLifecycleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartLifecycle[] | ListEnumPartLifecycleFieldRefInput<$PrismaModel>
    not?: NestedEnumPartLifecycleWithAggregatesFilter<$PrismaModel> | $Enums.PartLifecycle
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPartLifecycleFilter<$PrismaModel>
    _max?: NestedEnumPartLifecycleFilter<$PrismaModel>
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

  export type NestedEnumAviationSettlementStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AviationSettlementStatus | EnumAviationSettlementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AviationSettlementStatus[] | ListEnumAviationSettlementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AviationSettlementStatus[] | ListEnumAviationSettlementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAviationSettlementStatusFilter<$PrismaModel> | $Enums.AviationSettlementStatus
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

  export type NestedEnumAviationSettlementStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AviationSettlementStatus | EnumAviationSettlementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AviationSettlementStatus[] | ListEnumAviationSettlementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AviationSettlementStatus[] | ListEnumAviationSettlementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAviationSettlementStatusWithAggregatesFilter<$PrismaModel> | $Enums.AviationSettlementStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAviationSettlementStatusFilter<$PrismaModel>
    _max?: NestedEnumAviationSettlementStatusFilter<$PrismaModel>
  }

  export type PartCreateWithoutAircraftInput = {
    id: string
    orgId: string
    serial: string
    partType: string
    lifecycleStatus?: $Enums.PartLifecycle
    tokenId?: string | null
    createdAt?: Date | string
    maintenance?: MaintenanceEventCreateNestedManyWithoutPartInput
  }

  export type PartUncheckedCreateWithoutAircraftInput = {
    id: string
    orgId: string
    serial: string
    partType: string
    lifecycleStatus?: $Enums.PartLifecycle
    tokenId?: string | null
    createdAt?: Date | string
    maintenance?: MaintenanceEventUncheckedCreateNestedManyWithoutPartInput
  }

  export type PartCreateOrConnectWithoutAircraftInput = {
    where: PartWhereUniqueInput
    create: XOR<PartCreateWithoutAircraftInput, PartUncheckedCreateWithoutAircraftInput>
  }

  export type PartCreateManyAircraftInputEnvelope = {
    data: PartCreateManyAircraftInput | PartCreateManyAircraftInput[]
    skipDuplicates?: boolean
  }

  export type PartUpsertWithWhereUniqueWithoutAircraftInput = {
    where: PartWhereUniqueInput
    update: XOR<PartUpdateWithoutAircraftInput, PartUncheckedUpdateWithoutAircraftInput>
    create: XOR<PartCreateWithoutAircraftInput, PartUncheckedCreateWithoutAircraftInput>
  }

  export type PartUpdateWithWhereUniqueWithoutAircraftInput = {
    where: PartWhereUniqueInput
    data: XOR<PartUpdateWithoutAircraftInput, PartUncheckedUpdateWithoutAircraftInput>
  }

  export type PartUpdateManyWithWhereWithoutAircraftInput = {
    where: PartScalarWhereInput
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyWithoutAircraftInput>
  }

  export type PartScalarWhereInput = {
    AND?: PartScalarWhereInput | PartScalarWhereInput[]
    OR?: PartScalarWhereInput[]
    NOT?: PartScalarWhereInput | PartScalarWhereInput[]
    id?: StringFilter<"Part"> | string
    orgId?: StringFilter<"Part"> | string
    aircraftId?: StringNullableFilter<"Part"> | string | null
    serial?: StringFilter<"Part"> | string
    partType?: StringFilter<"Part"> | string
    lifecycleStatus?: EnumPartLifecycleFilter<"Part"> | $Enums.PartLifecycle
    tokenId?: StringNullableFilter<"Part"> | string | null
    createdAt?: DateTimeFilter<"Part"> | Date | string
  }

  export type AircraftCreateWithoutPartsInput = {
    id: string
    orgId: string
    tail: string
    model: string
    ownerRef: string
    createdAt?: Date | string
  }

  export type AircraftUncheckedCreateWithoutPartsInput = {
    id: string
    orgId: string
    tail: string
    model: string
    ownerRef: string
    createdAt?: Date | string
  }

  export type AircraftCreateOrConnectWithoutPartsInput = {
    where: AircraftWhereUniqueInput
    create: XOR<AircraftCreateWithoutPartsInput, AircraftUncheckedCreateWithoutPartsInput>
  }

  export type MaintenanceEventCreateWithoutPartInput = {
    id: string
    orgId: string
    action: string
    technicianRef: string
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type MaintenanceEventUncheckedCreateWithoutPartInput = {
    id: string
    orgId: string
    action: string
    technicianRef: string
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type MaintenanceEventCreateOrConnectWithoutPartInput = {
    where: MaintenanceEventWhereUniqueInput
    create: XOR<MaintenanceEventCreateWithoutPartInput, MaintenanceEventUncheckedCreateWithoutPartInput>
  }

  export type MaintenanceEventCreateManyPartInputEnvelope = {
    data: MaintenanceEventCreateManyPartInput | MaintenanceEventCreateManyPartInput[]
    skipDuplicates?: boolean
  }

  export type AircraftUpsertWithoutPartsInput = {
    update: XOR<AircraftUpdateWithoutPartsInput, AircraftUncheckedUpdateWithoutPartsInput>
    create: XOR<AircraftCreateWithoutPartsInput, AircraftUncheckedCreateWithoutPartsInput>
    where?: AircraftWhereInput
  }

  export type AircraftUpdateToOneWithWhereWithoutPartsInput = {
    where?: AircraftWhereInput
    data: XOR<AircraftUpdateWithoutPartsInput, AircraftUncheckedUpdateWithoutPartsInput>
  }

  export type AircraftUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    tail?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    ownerRef?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AircraftUncheckedUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    tail?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    ownerRef?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintenanceEventUpsertWithWhereUniqueWithoutPartInput = {
    where: MaintenanceEventWhereUniqueInput
    update: XOR<MaintenanceEventUpdateWithoutPartInput, MaintenanceEventUncheckedUpdateWithoutPartInput>
    create: XOR<MaintenanceEventCreateWithoutPartInput, MaintenanceEventUncheckedCreateWithoutPartInput>
  }

  export type MaintenanceEventUpdateWithWhereUniqueWithoutPartInput = {
    where: MaintenanceEventWhereUniqueInput
    data: XOR<MaintenanceEventUpdateWithoutPartInput, MaintenanceEventUncheckedUpdateWithoutPartInput>
  }

  export type MaintenanceEventUpdateManyWithWhereWithoutPartInput = {
    where: MaintenanceEventScalarWhereInput
    data: XOR<MaintenanceEventUpdateManyMutationInput, MaintenanceEventUncheckedUpdateManyWithoutPartInput>
  }

  export type MaintenanceEventScalarWhereInput = {
    AND?: MaintenanceEventScalarWhereInput | MaintenanceEventScalarWhereInput[]
    OR?: MaintenanceEventScalarWhereInput[]
    NOT?: MaintenanceEventScalarWhereInput | MaintenanceEventScalarWhereInput[]
    id?: StringFilter<"MaintenanceEvent"> | string
    orgId?: StringFilter<"MaintenanceEvent"> | string
    partId?: StringFilter<"MaintenanceEvent"> | string
    action?: StringFilter<"MaintenanceEvent"> | string
    technicianRef?: StringFilter<"MaintenanceEvent"> | string
    attestationId?: StringNullableFilter<"MaintenanceEvent"> | string | null
    createdAt?: DateTimeFilter<"MaintenanceEvent"> | Date | string
  }

  export type PartCreateWithoutMaintenanceInput = {
    id: string
    orgId: string
    serial: string
    partType: string
    lifecycleStatus?: $Enums.PartLifecycle
    tokenId?: string | null
    createdAt?: Date | string
    aircraft?: AircraftCreateNestedOneWithoutPartsInput
  }

  export type PartUncheckedCreateWithoutMaintenanceInput = {
    id: string
    orgId: string
    aircraftId?: string | null
    serial: string
    partType: string
    lifecycleStatus?: $Enums.PartLifecycle
    tokenId?: string | null
    createdAt?: Date | string
  }

  export type PartCreateOrConnectWithoutMaintenanceInput = {
    where: PartWhereUniqueInput
    create: XOR<PartCreateWithoutMaintenanceInput, PartUncheckedCreateWithoutMaintenanceInput>
  }

  export type PartUpsertWithoutMaintenanceInput = {
    update: XOR<PartUpdateWithoutMaintenanceInput, PartUncheckedUpdateWithoutMaintenanceInput>
    create: XOR<PartCreateWithoutMaintenanceInput, PartUncheckedCreateWithoutMaintenanceInput>
    where?: PartWhereInput
  }

  export type PartUpdateToOneWithWhereWithoutMaintenanceInput = {
    where?: PartWhereInput
    data: XOR<PartUpdateWithoutMaintenanceInput, PartUncheckedUpdateWithoutMaintenanceInput>
  }

  export type PartUpdateWithoutMaintenanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    partType?: StringFieldUpdateOperationsInput | string
    lifecycleStatus?: EnumPartLifecycleFieldUpdateOperationsInput | $Enums.PartLifecycle
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aircraft?: AircraftUpdateOneWithoutPartsNestedInput
  }

  export type PartUncheckedUpdateWithoutMaintenanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    aircraftId?: NullableStringFieldUpdateOperationsInput | string | null
    serial?: StringFieldUpdateOperationsInput | string
    partType?: StringFieldUpdateOperationsInput | string
    lifecycleStatus?: EnumPartLifecycleFieldUpdateOperationsInput | $Enums.PartLifecycle
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartCreateManyAircraftInput = {
    id: string
    orgId: string
    serial: string
    partType: string
    lifecycleStatus?: $Enums.PartLifecycle
    tokenId?: string | null
    createdAt?: Date | string
  }

  export type PartUpdateWithoutAircraftInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    partType?: StringFieldUpdateOperationsInput | string
    lifecycleStatus?: EnumPartLifecycleFieldUpdateOperationsInput | $Enums.PartLifecycle
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenance?: MaintenanceEventUpdateManyWithoutPartNestedInput
  }

  export type PartUncheckedUpdateWithoutAircraftInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    partType?: StringFieldUpdateOperationsInput | string
    lifecycleStatus?: EnumPartLifecycleFieldUpdateOperationsInput | $Enums.PartLifecycle
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    maintenance?: MaintenanceEventUncheckedUpdateManyWithoutPartNestedInput
  }

  export type PartUncheckedUpdateManyWithoutAircraftInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    serial?: StringFieldUpdateOperationsInput | string
    partType?: StringFieldUpdateOperationsInput | string
    lifecycleStatus?: EnumPartLifecycleFieldUpdateOperationsInput | $Enums.PartLifecycle
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintenanceEventCreateManyPartInput = {
    id: string
    orgId: string
    action: string
    technicianRef: string
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type MaintenanceEventUpdateWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    technicianRef?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintenanceEventUncheckedUpdateWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    technicianRef?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MaintenanceEventUncheckedUpdateManyWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    technicianRef?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use AircraftCountOutputTypeDefaultArgs instead
     */
    export type AircraftCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AircraftCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PartCountOutputTypeDefaultArgs instead
     */
    export type PartCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PartCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventOutboxDefaultArgs instead
     */
    export type EventOutboxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventOutboxDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AircraftDefaultArgs instead
     */
    export type AircraftArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AircraftDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PartDefaultArgs instead
     */
    export type PartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PartDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MaintenanceEventDefaultArgs instead
     */
    export type MaintenanceEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MaintenanceEventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AirworthinessCertDefaultArgs instead
     */
    export type AirworthinessCertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AirworthinessCertDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AviationSettlementDefaultArgs instead
     */
    export type AviationSettlementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AviationSettlementDefaultArgs<ExtArgs>

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