
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
 * Model Datashare
 * 
 */
export type Datashare = $Result.DefaultSelection<Prisma.$DatasharePayload>
/**
 * Model ShareRun
 * 
 */
export type ShareRun = $Result.DefaultSelection<Prisma.$ShareRunPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const DatashareStatus: {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED'
};

export type DatashareStatus = (typeof DatashareStatus)[keyof typeof DatashareStatus]


export const DatashareDestination: {
  S3: 'S3',
  SNOWFLAKE: 'SNOWFLAKE',
  BIGQUERY: 'BIGQUERY',
  DATABRICKS: 'DATABRICKS'
};

export type DatashareDestination = (typeof DatashareDestination)[keyof typeof DatashareDestination]


export const DatashareFormat: {
  CSV: 'CSV',
  JSON: 'JSON',
  PARQUET: 'PARQUET'
};

export type DatashareFormat = (typeof DatashareFormat)[keyof typeof DatashareFormat]


export const ShareRunStatus: {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED'
};

export type ShareRunStatus = (typeof ShareRunStatus)[keyof typeof ShareRunStatus]


export const RunTrigger: {
  MANUAL: 'MANUAL',
  SCHEDULE: 'SCHEDULE'
};

export type RunTrigger = (typeof RunTrigger)[keyof typeof RunTrigger]

}

export type DatashareStatus = $Enums.DatashareStatus

export const DatashareStatus: typeof $Enums.DatashareStatus

export type DatashareDestination = $Enums.DatashareDestination

export const DatashareDestination: typeof $Enums.DatashareDestination

export type DatashareFormat = $Enums.DatashareFormat

export const DatashareFormat: typeof $Enums.DatashareFormat

export type ShareRunStatus = $Enums.ShareRunStatus

export const ShareRunStatus: typeof $Enums.ShareRunStatus

export type RunTrigger = $Enums.RunTrigger

export const RunTrigger: typeof $Enums.RunTrigger

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Datashares
 * const datashares = await prisma.datashare.findMany()
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
   * // Fetch zero or more Datashares
   * const datashares = await prisma.datashare.findMany()
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
   * `prisma.datashare`: Exposes CRUD operations for the **Datashare** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Datashares
    * const datashares = await prisma.datashare.findMany()
    * ```
    */
  get datashare(): Prisma.DatashareDelegate<ExtArgs>;

  /**
   * `prisma.shareRun`: Exposes CRUD operations for the **ShareRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ShareRuns
    * const shareRuns = await prisma.shareRun.findMany()
    * ```
    */
  get shareRun(): Prisma.ShareRunDelegate<ExtArgs>;
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
    Datashare: 'Datashare',
    ShareRun: 'ShareRun'
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
      modelProps: "datashare" | "shareRun"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Datashare: {
        payload: Prisma.$DatasharePayload<ExtArgs>
        fields: Prisma.DatashareFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DatashareFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasharePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DatashareFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasharePayload>
          }
          findFirst: {
            args: Prisma.DatashareFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasharePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DatashareFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasharePayload>
          }
          findMany: {
            args: Prisma.DatashareFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasharePayload>[]
          }
          create: {
            args: Prisma.DatashareCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasharePayload>
          }
          createMany: {
            args: Prisma.DatashareCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DatashareCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasharePayload>[]
          }
          delete: {
            args: Prisma.DatashareDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasharePayload>
          }
          update: {
            args: Prisma.DatashareUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasharePayload>
          }
          deleteMany: {
            args: Prisma.DatashareDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DatashareUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DatashareUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatasharePayload>
          }
          aggregate: {
            args: Prisma.DatashareAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDatashare>
          }
          groupBy: {
            args: Prisma.DatashareGroupByArgs<ExtArgs>
            result: $Utils.Optional<DatashareGroupByOutputType>[]
          }
          count: {
            args: Prisma.DatashareCountArgs<ExtArgs>
            result: $Utils.Optional<DatashareCountAggregateOutputType> | number
          }
        }
      }
      ShareRun: {
        payload: Prisma.$ShareRunPayload<ExtArgs>
        fields: Prisma.ShareRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShareRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShareRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShareRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShareRunPayload>
          }
          findFirst: {
            args: Prisma.ShareRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShareRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShareRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShareRunPayload>
          }
          findMany: {
            args: Prisma.ShareRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShareRunPayload>[]
          }
          create: {
            args: Prisma.ShareRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShareRunPayload>
          }
          createMany: {
            args: Prisma.ShareRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShareRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShareRunPayload>[]
          }
          delete: {
            args: Prisma.ShareRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShareRunPayload>
          }
          update: {
            args: Prisma.ShareRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShareRunPayload>
          }
          deleteMany: {
            args: Prisma.ShareRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShareRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ShareRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShareRunPayload>
          }
          aggregate: {
            args: Prisma.ShareRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShareRun>
          }
          groupBy: {
            args: Prisma.ShareRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShareRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShareRunCountArgs<ExtArgs>
            result: $Utils.Optional<ShareRunCountAggregateOutputType> | number
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
   * Count Type DatashareCountOutputType
   */

  export type DatashareCountOutputType = {
    runs: number
  }

  export type DatashareCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    runs?: boolean | DatashareCountOutputTypeCountRunsArgs
  }

  // Custom InputTypes
  /**
   * DatashareCountOutputType without action
   */
  export type DatashareCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatashareCountOutputType
     */
    select?: DatashareCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DatashareCountOutputType without action
   */
  export type DatashareCountOutputTypeCountRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShareRunWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Datashare
   */

  export type AggregateDatashare = {
    _count: DatashareCountAggregateOutputType | null
    _avg: DatashareAvgAggregateOutputType | null
    _sum: DatashareSumAggregateOutputType | null
    _min: DatashareMinAggregateOutputType | null
    _max: DatashareMaxAggregateOutputType | null
  }

  export type DatashareAvgAggregateOutputType = {
    runCount: number | null
    lastRowCount: number | null
  }

  export type DatashareSumAggregateOutputType = {
    runCount: bigint | null
    lastRowCount: number | null
  }

  export type DatashareMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    name: string | null
    description: string | null
    status: $Enums.DatashareStatus | null
    datasetId: string | null
    destination: $Enums.DatashareDestination | null
    format: $Enums.DatashareFormat | null
    schedule: string | null
    runCount: bigint | null
    lastRunAt: Date | null
    lastSuccessAt: Date | null
    lastRunStatus: $Enums.ShareRunStatus | null
    lastRowCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DatashareMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    name: string | null
    description: string | null
    status: $Enums.DatashareStatus | null
    datasetId: string | null
    destination: $Enums.DatashareDestination | null
    format: $Enums.DatashareFormat | null
    schedule: string | null
    runCount: bigint | null
    lastRunAt: Date | null
    lastSuccessAt: Date | null
    lastRunStatus: $Enums.ShareRunStatus | null
    lastRowCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DatashareCountAggregateOutputType = {
    id: number
    orgId: number
    name: number
    description: number
    status: number
    datasetId: number
    params: number
    policy: number
    destination: number
    destinationConfig: number
    format: number
    schedule: number
    runCount: number
    lastRunAt: number
    lastSuccessAt: number
    lastRunStatus: number
    lastRowCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DatashareAvgAggregateInputType = {
    runCount?: true
    lastRowCount?: true
  }

  export type DatashareSumAggregateInputType = {
    runCount?: true
    lastRowCount?: true
  }

  export type DatashareMinAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    description?: true
    status?: true
    datasetId?: true
    destination?: true
    format?: true
    schedule?: true
    runCount?: true
    lastRunAt?: true
    lastSuccessAt?: true
    lastRunStatus?: true
    lastRowCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DatashareMaxAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    description?: true
    status?: true
    datasetId?: true
    destination?: true
    format?: true
    schedule?: true
    runCount?: true
    lastRunAt?: true
    lastSuccessAt?: true
    lastRunStatus?: true
    lastRowCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DatashareCountAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    description?: true
    status?: true
    datasetId?: true
    params?: true
    policy?: true
    destination?: true
    destinationConfig?: true
    format?: true
    schedule?: true
    runCount?: true
    lastRunAt?: true
    lastSuccessAt?: true
    lastRunStatus?: true
    lastRowCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DatashareAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Datashare to aggregate.
     */
    where?: DatashareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Datashares to fetch.
     */
    orderBy?: DatashareOrderByWithRelationInput | DatashareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DatashareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Datashares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Datashares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Datashares
    **/
    _count?: true | DatashareCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DatashareAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DatashareSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DatashareMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DatashareMaxAggregateInputType
  }

  export type GetDatashareAggregateType<T extends DatashareAggregateArgs> = {
        [P in keyof T & keyof AggregateDatashare]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDatashare[P]>
      : GetScalarType<T[P], AggregateDatashare[P]>
  }




  export type DatashareGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DatashareWhereInput
    orderBy?: DatashareOrderByWithAggregationInput | DatashareOrderByWithAggregationInput[]
    by: DatashareScalarFieldEnum[] | DatashareScalarFieldEnum
    having?: DatashareScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DatashareCountAggregateInputType | true
    _avg?: DatashareAvgAggregateInputType
    _sum?: DatashareSumAggregateInputType
    _min?: DatashareMinAggregateInputType
    _max?: DatashareMaxAggregateInputType
  }

  export type DatashareGroupByOutputType = {
    id: string
    orgId: string
    name: string
    description: string | null
    status: $Enums.DatashareStatus
    datasetId: string
    params: JsonValue
    policy: JsonValue
    destination: $Enums.DatashareDestination
    destinationConfig: JsonValue
    format: $Enums.DatashareFormat
    schedule: string | null
    runCount: bigint
    lastRunAt: Date | null
    lastSuccessAt: Date | null
    lastRunStatus: $Enums.ShareRunStatus | null
    lastRowCount: number | null
    createdAt: Date
    updatedAt: Date
    _count: DatashareCountAggregateOutputType | null
    _avg: DatashareAvgAggregateOutputType | null
    _sum: DatashareSumAggregateOutputType | null
    _min: DatashareMinAggregateOutputType | null
    _max: DatashareMaxAggregateOutputType | null
  }

  type GetDatashareGroupByPayload<T extends DatashareGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DatashareGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DatashareGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DatashareGroupByOutputType[P]>
            : GetScalarType<T[P], DatashareGroupByOutputType[P]>
        }
      >
    >


  export type DatashareSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    datasetId?: boolean
    params?: boolean
    policy?: boolean
    destination?: boolean
    destinationConfig?: boolean
    format?: boolean
    schedule?: boolean
    runCount?: boolean
    lastRunAt?: boolean
    lastSuccessAt?: boolean
    lastRunStatus?: boolean
    lastRowCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    runs?: boolean | Datashare$runsArgs<ExtArgs>
    _count?: boolean | DatashareCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["datashare"]>

  export type DatashareSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    datasetId?: boolean
    params?: boolean
    policy?: boolean
    destination?: boolean
    destinationConfig?: boolean
    format?: boolean
    schedule?: boolean
    runCount?: boolean
    lastRunAt?: boolean
    lastSuccessAt?: boolean
    lastRunStatus?: boolean
    lastRowCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["datashare"]>

  export type DatashareSelectScalar = {
    id?: boolean
    orgId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    datasetId?: boolean
    params?: boolean
    policy?: boolean
    destination?: boolean
    destinationConfig?: boolean
    format?: boolean
    schedule?: boolean
    runCount?: boolean
    lastRunAt?: boolean
    lastSuccessAt?: boolean
    lastRunStatus?: boolean
    lastRowCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DatashareInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    runs?: boolean | Datashare$runsArgs<ExtArgs>
    _count?: boolean | DatashareCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DatashareIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DatasharePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Datashare"
    objects: {
      runs: Prisma.$ShareRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      name: string
      description: string | null
      status: $Enums.DatashareStatus
      /**
       * Curated dataset id (allowlisted in named-datasets.ts).
       */
      datasetId: string
      /**
       * Validated dataset parameters (e.g. chain, lookback days, limit).
       */
      params: Prisma.JsonValue
      /**
       * Access/redaction policy (validated by the AccessPolicy zod schema).
       */
      policy: Prisma.JsonValue
      destination: $Enums.DatashareDestination
      /**
       * Destination connection config (bucket/prefix, or warehouse coordinates).
       */
      destinationConfig: Prisma.JsonValue
      format: $Enums.DatashareFormat
      /**
       * Optional cron pattern (e.g. "0 * * * *"). Null ⇒ manual-only.
       */
      schedule: string | null
      runCount: bigint
      lastRunAt: Date | null
      lastSuccessAt: Date | null
      lastRunStatus: $Enums.ShareRunStatus | null
      lastRowCount: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["datashare"]>
    composites: {}
  }

  type DatashareGetPayload<S extends boolean | null | undefined | DatashareDefaultArgs> = $Result.GetResult<Prisma.$DatasharePayload, S>

  type DatashareCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DatashareFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DatashareCountAggregateInputType | true
    }

  export interface DatashareDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Datashare'], meta: { name: 'Datashare' } }
    /**
     * Find zero or one Datashare that matches the filter.
     * @param {DatashareFindUniqueArgs} args - Arguments to find a Datashare
     * @example
     * // Get one Datashare
     * const datashare = await prisma.datashare.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DatashareFindUniqueArgs>(args: SelectSubset<T, DatashareFindUniqueArgs<ExtArgs>>): Prisma__DatashareClient<$Result.GetResult<Prisma.$DatasharePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Datashare that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DatashareFindUniqueOrThrowArgs} args - Arguments to find a Datashare
     * @example
     * // Get one Datashare
     * const datashare = await prisma.datashare.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DatashareFindUniqueOrThrowArgs>(args: SelectSubset<T, DatashareFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DatashareClient<$Result.GetResult<Prisma.$DatasharePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Datashare that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatashareFindFirstArgs} args - Arguments to find a Datashare
     * @example
     * // Get one Datashare
     * const datashare = await prisma.datashare.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DatashareFindFirstArgs>(args?: SelectSubset<T, DatashareFindFirstArgs<ExtArgs>>): Prisma__DatashareClient<$Result.GetResult<Prisma.$DatasharePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Datashare that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatashareFindFirstOrThrowArgs} args - Arguments to find a Datashare
     * @example
     * // Get one Datashare
     * const datashare = await prisma.datashare.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DatashareFindFirstOrThrowArgs>(args?: SelectSubset<T, DatashareFindFirstOrThrowArgs<ExtArgs>>): Prisma__DatashareClient<$Result.GetResult<Prisma.$DatasharePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Datashares that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatashareFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Datashares
     * const datashares = await prisma.datashare.findMany()
     * 
     * // Get first 10 Datashares
     * const datashares = await prisma.datashare.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const datashareWithIdOnly = await prisma.datashare.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DatashareFindManyArgs>(args?: SelectSubset<T, DatashareFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DatasharePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Datashare.
     * @param {DatashareCreateArgs} args - Arguments to create a Datashare.
     * @example
     * // Create one Datashare
     * const Datashare = await prisma.datashare.create({
     *   data: {
     *     // ... data to create a Datashare
     *   }
     * })
     * 
     */
    create<T extends DatashareCreateArgs>(args: SelectSubset<T, DatashareCreateArgs<ExtArgs>>): Prisma__DatashareClient<$Result.GetResult<Prisma.$DatasharePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Datashares.
     * @param {DatashareCreateManyArgs} args - Arguments to create many Datashares.
     * @example
     * // Create many Datashares
     * const datashare = await prisma.datashare.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DatashareCreateManyArgs>(args?: SelectSubset<T, DatashareCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Datashares and returns the data saved in the database.
     * @param {DatashareCreateManyAndReturnArgs} args - Arguments to create many Datashares.
     * @example
     * // Create many Datashares
     * const datashare = await prisma.datashare.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Datashares and only return the `id`
     * const datashareWithIdOnly = await prisma.datashare.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DatashareCreateManyAndReturnArgs>(args?: SelectSubset<T, DatashareCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DatasharePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Datashare.
     * @param {DatashareDeleteArgs} args - Arguments to delete one Datashare.
     * @example
     * // Delete one Datashare
     * const Datashare = await prisma.datashare.delete({
     *   where: {
     *     // ... filter to delete one Datashare
     *   }
     * })
     * 
     */
    delete<T extends DatashareDeleteArgs>(args: SelectSubset<T, DatashareDeleteArgs<ExtArgs>>): Prisma__DatashareClient<$Result.GetResult<Prisma.$DatasharePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Datashare.
     * @param {DatashareUpdateArgs} args - Arguments to update one Datashare.
     * @example
     * // Update one Datashare
     * const datashare = await prisma.datashare.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DatashareUpdateArgs>(args: SelectSubset<T, DatashareUpdateArgs<ExtArgs>>): Prisma__DatashareClient<$Result.GetResult<Prisma.$DatasharePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Datashares.
     * @param {DatashareDeleteManyArgs} args - Arguments to filter Datashares to delete.
     * @example
     * // Delete a few Datashares
     * const { count } = await prisma.datashare.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DatashareDeleteManyArgs>(args?: SelectSubset<T, DatashareDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Datashares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatashareUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Datashares
     * const datashare = await prisma.datashare.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DatashareUpdateManyArgs>(args: SelectSubset<T, DatashareUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Datashare.
     * @param {DatashareUpsertArgs} args - Arguments to update or create a Datashare.
     * @example
     * // Update or create a Datashare
     * const datashare = await prisma.datashare.upsert({
     *   create: {
     *     // ... data to create a Datashare
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Datashare we want to update
     *   }
     * })
     */
    upsert<T extends DatashareUpsertArgs>(args: SelectSubset<T, DatashareUpsertArgs<ExtArgs>>): Prisma__DatashareClient<$Result.GetResult<Prisma.$DatasharePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Datashares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatashareCountArgs} args - Arguments to filter Datashares to count.
     * @example
     * // Count the number of Datashares
     * const count = await prisma.datashare.count({
     *   where: {
     *     // ... the filter for the Datashares we want to count
     *   }
     * })
    **/
    count<T extends DatashareCountArgs>(
      args?: Subset<T, DatashareCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DatashareCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Datashare.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatashareAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DatashareAggregateArgs>(args: Subset<T, DatashareAggregateArgs>): Prisma.PrismaPromise<GetDatashareAggregateType<T>>

    /**
     * Group by Datashare.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatashareGroupByArgs} args - Group by arguments.
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
      T extends DatashareGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DatashareGroupByArgs['orderBy'] }
        : { orderBy?: DatashareGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DatashareGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDatashareGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Datashare model
   */
  readonly fields: DatashareFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Datashare.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DatashareClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    runs<T extends Datashare$runsArgs<ExtArgs> = {}>(args?: Subset<T, Datashare$runsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShareRunPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Datashare model
   */ 
  interface DatashareFieldRefs {
    readonly id: FieldRef<"Datashare", 'String'>
    readonly orgId: FieldRef<"Datashare", 'String'>
    readonly name: FieldRef<"Datashare", 'String'>
    readonly description: FieldRef<"Datashare", 'String'>
    readonly status: FieldRef<"Datashare", 'DatashareStatus'>
    readonly datasetId: FieldRef<"Datashare", 'String'>
    readonly params: FieldRef<"Datashare", 'Json'>
    readonly policy: FieldRef<"Datashare", 'Json'>
    readonly destination: FieldRef<"Datashare", 'DatashareDestination'>
    readonly destinationConfig: FieldRef<"Datashare", 'Json'>
    readonly format: FieldRef<"Datashare", 'DatashareFormat'>
    readonly schedule: FieldRef<"Datashare", 'String'>
    readonly runCount: FieldRef<"Datashare", 'BigInt'>
    readonly lastRunAt: FieldRef<"Datashare", 'DateTime'>
    readonly lastSuccessAt: FieldRef<"Datashare", 'DateTime'>
    readonly lastRunStatus: FieldRef<"Datashare", 'ShareRunStatus'>
    readonly lastRowCount: FieldRef<"Datashare", 'Int'>
    readonly createdAt: FieldRef<"Datashare", 'DateTime'>
    readonly updatedAt: FieldRef<"Datashare", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Datashare findUnique
   */
  export type DatashareFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Datashare
     */
    select?: DatashareSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatashareInclude<ExtArgs> | null
    /**
     * Filter, which Datashare to fetch.
     */
    where: DatashareWhereUniqueInput
  }

  /**
   * Datashare findUniqueOrThrow
   */
  export type DatashareFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Datashare
     */
    select?: DatashareSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatashareInclude<ExtArgs> | null
    /**
     * Filter, which Datashare to fetch.
     */
    where: DatashareWhereUniqueInput
  }

  /**
   * Datashare findFirst
   */
  export type DatashareFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Datashare
     */
    select?: DatashareSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatashareInclude<ExtArgs> | null
    /**
     * Filter, which Datashare to fetch.
     */
    where?: DatashareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Datashares to fetch.
     */
    orderBy?: DatashareOrderByWithRelationInput | DatashareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Datashares.
     */
    cursor?: DatashareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Datashares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Datashares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Datashares.
     */
    distinct?: DatashareScalarFieldEnum | DatashareScalarFieldEnum[]
  }

  /**
   * Datashare findFirstOrThrow
   */
  export type DatashareFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Datashare
     */
    select?: DatashareSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatashareInclude<ExtArgs> | null
    /**
     * Filter, which Datashare to fetch.
     */
    where?: DatashareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Datashares to fetch.
     */
    orderBy?: DatashareOrderByWithRelationInput | DatashareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Datashares.
     */
    cursor?: DatashareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Datashares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Datashares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Datashares.
     */
    distinct?: DatashareScalarFieldEnum | DatashareScalarFieldEnum[]
  }

  /**
   * Datashare findMany
   */
  export type DatashareFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Datashare
     */
    select?: DatashareSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatashareInclude<ExtArgs> | null
    /**
     * Filter, which Datashares to fetch.
     */
    where?: DatashareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Datashares to fetch.
     */
    orderBy?: DatashareOrderByWithRelationInput | DatashareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Datashares.
     */
    cursor?: DatashareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Datashares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Datashares.
     */
    skip?: number
    distinct?: DatashareScalarFieldEnum | DatashareScalarFieldEnum[]
  }

  /**
   * Datashare create
   */
  export type DatashareCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Datashare
     */
    select?: DatashareSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatashareInclude<ExtArgs> | null
    /**
     * The data needed to create a Datashare.
     */
    data: XOR<DatashareCreateInput, DatashareUncheckedCreateInput>
  }

  /**
   * Datashare createMany
   */
  export type DatashareCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Datashares.
     */
    data: DatashareCreateManyInput | DatashareCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Datashare createManyAndReturn
   */
  export type DatashareCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Datashare
     */
    select?: DatashareSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Datashares.
     */
    data: DatashareCreateManyInput | DatashareCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Datashare update
   */
  export type DatashareUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Datashare
     */
    select?: DatashareSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatashareInclude<ExtArgs> | null
    /**
     * The data needed to update a Datashare.
     */
    data: XOR<DatashareUpdateInput, DatashareUncheckedUpdateInput>
    /**
     * Choose, which Datashare to update.
     */
    where: DatashareWhereUniqueInput
  }

  /**
   * Datashare updateMany
   */
  export type DatashareUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Datashares.
     */
    data: XOR<DatashareUpdateManyMutationInput, DatashareUncheckedUpdateManyInput>
    /**
     * Filter which Datashares to update
     */
    where?: DatashareWhereInput
  }

  /**
   * Datashare upsert
   */
  export type DatashareUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Datashare
     */
    select?: DatashareSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatashareInclude<ExtArgs> | null
    /**
     * The filter to search for the Datashare to update in case it exists.
     */
    where: DatashareWhereUniqueInput
    /**
     * In case the Datashare found by the `where` argument doesn't exist, create a new Datashare with this data.
     */
    create: XOR<DatashareCreateInput, DatashareUncheckedCreateInput>
    /**
     * In case the Datashare was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DatashareUpdateInput, DatashareUncheckedUpdateInput>
  }

  /**
   * Datashare delete
   */
  export type DatashareDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Datashare
     */
    select?: DatashareSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatashareInclude<ExtArgs> | null
    /**
     * Filter which Datashare to delete.
     */
    where: DatashareWhereUniqueInput
  }

  /**
   * Datashare deleteMany
   */
  export type DatashareDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Datashares to delete
     */
    where?: DatashareWhereInput
  }

  /**
   * Datashare.runs
   */
  export type Datashare$runsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShareRun
     */
    select?: ShareRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareRunInclude<ExtArgs> | null
    where?: ShareRunWhereInput
    orderBy?: ShareRunOrderByWithRelationInput | ShareRunOrderByWithRelationInput[]
    cursor?: ShareRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShareRunScalarFieldEnum | ShareRunScalarFieldEnum[]
  }

  /**
   * Datashare without action
   */
  export type DatashareDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Datashare
     */
    select?: DatashareSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatashareInclude<ExtArgs> | null
  }


  /**
   * Model ShareRun
   */

  export type AggregateShareRun = {
    _count: ShareRunCountAggregateOutputType | null
    _avg: ShareRunAvgAggregateOutputType | null
    _sum: ShareRunSumAggregateOutputType | null
    _min: ShareRunMinAggregateOutputType | null
    _max: ShareRunMaxAggregateOutputType | null
  }

  export type ShareRunAvgAggregateOutputType = {
    rowCount: number | null
    byteCount: number | null
    durationMs: number | null
  }

  export type ShareRunSumAggregateOutputType = {
    rowCount: number | null
    byteCount: number | null
    durationMs: number | null
  }

  export type ShareRunMinAggregateOutputType = {
    id: string | null
    shareId: string | null
    status: $Enums.ShareRunStatus | null
    trigger: $Enums.RunTrigger | null
    rowCount: number | null
    byteCount: number | null
    location: string | null
    format: $Enums.DatashareFormat | null
    durationMs: number | null
    error: string | null
    startedAt: Date | null
    finishedAt: Date | null
    createdAt: Date | null
  }

  export type ShareRunMaxAggregateOutputType = {
    id: string | null
    shareId: string | null
    status: $Enums.ShareRunStatus | null
    trigger: $Enums.RunTrigger | null
    rowCount: number | null
    byteCount: number | null
    location: string | null
    format: $Enums.DatashareFormat | null
    durationMs: number | null
    error: string | null
    startedAt: Date | null
    finishedAt: Date | null
    createdAt: Date | null
  }

  export type ShareRunCountAggregateOutputType = {
    id: number
    shareId: number
    status: number
    trigger: number
    rowCount: number
    byteCount: number
    location: number
    format: number
    durationMs: number
    error: number
    startedAt: number
    finishedAt: number
    createdAt: number
    _all: number
  }


  export type ShareRunAvgAggregateInputType = {
    rowCount?: true
    byteCount?: true
    durationMs?: true
  }

  export type ShareRunSumAggregateInputType = {
    rowCount?: true
    byteCount?: true
    durationMs?: true
  }

  export type ShareRunMinAggregateInputType = {
    id?: true
    shareId?: true
    status?: true
    trigger?: true
    rowCount?: true
    byteCount?: true
    location?: true
    format?: true
    durationMs?: true
    error?: true
    startedAt?: true
    finishedAt?: true
    createdAt?: true
  }

  export type ShareRunMaxAggregateInputType = {
    id?: true
    shareId?: true
    status?: true
    trigger?: true
    rowCount?: true
    byteCount?: true
    location?: true
    format?: true
    durationMs?: true
    error?: true
    startedAt?: true
    finishedAt?: true
    createdAt?: true
  }

  export type ShareRunCountAggregateInputType = {
    id?: true
    shareId?: true
    status?: true
    trigger?: true
    rowCount?: true
    byteCount?: true
    location?: true
    format?: true
    durationMs?: true
    error?: true
    startedAt?: true
    finishedAt?: true
    createdAt?: true
    _all?: true
  }

  export type ShareRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShareRun to aggregate.
     */
    where?: ShareRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShareRuns to fetch.
     */
    orderBy?: ShareRunOrderByWithRelationInput | ShareRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShareRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShareRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShareRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ShareRuns
    **/
    _count?: true | ShareRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShareRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShareRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShareRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShareRunMaxAggregateInputType
  }

  export type GetShareRunAggregateType<T extends ShareRunAggregateArgs> = {
        [P in keyof T & keyof AggregateShareRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShareRun[P]>
      : GetScalarType<T[P], AggregateShareRun[P]>
  }




  export type ShareRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShareRunWhereInput
    orderBy?: ShareRunOrderByWithAggregationInput | ShareRunOrderByWithAggregationInput[]
    by: ShareRunScalarFieldEnum[] | ShareRunScalarFieldEnum
    having?: ShareRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShareRunCountAggregateInputType | true
    _avg?: ShareRunAvgAggregateInputType
    _sum?: ShareRunSumAggregateInputType
    _min?: ShareRunMinAggregateInputType
    _max?: ShareRunMaxAggregateInputType
  }

  export type ShareRunGroupByOutputType = {
    id: string
    shareId: string
    status: $Enums.ShareRunStatus
    trigger: $Enums.RunTrigger
    rowCount: number | null
    byteCount: number | null
    location: string | null
    format: $Enums.DatashareFormat
    durationMs: number | null
    error: string | null
    startedAt: Date | null
    finishedAt: Date | null
    createdAt: Date
    _count: ShareRunCountAggregateOutputType | null
    _avg: ShareRunAvgAggregateOutputType | null
    _sum: ShareRunSumAggregateOutputType | null
    _min: ShareRunMinAggregateOutputType | null
    _max: ShareRunMaxAggregateOutputType | null
  }

  type GetShareRunGroupByPayload<T extends ShareRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShareRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShareRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShareRunGroupByOutputType[P]>
            : GetScalarType<T[P], ShareRunGroupByOutputType[P]>
        }
      >
    >


  export type ShareRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shareId?: boolean
    status?: boolean
    trigger?: boolean
    rowCount?: boolean
    byteCount?: boolean
    location?: boolean
    format?: boolean
    durationMs?: boolean
    error?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdAt?: boolean
    share?: boolean | DatashareDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shareRun"]>

  export type ShareRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shareId?: boolean
    status?: boolean
    trigger?: boolean
    rowCount?: boolean
    byteCount?: boolean
    location?: boolean
    format?: boolean
    durationMs?: boolean
    error?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdAt?: boolean
    share?: boolean | DatashareDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shareRun"]>

  export type ShareRunSelectScalar = {
    id?: boolean
    shareId?: boolean
    status?: boolean
    trigger?: boolean
    rowCount?: boolean
    byteCount?: boolean
    location?: boolean
    format?: boolean
    durationMs?: boolean
    error?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdAt?: boolean
  }

  export type ShareRunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    share?: boolean | DatashareDefaultArgs<ExtArgs>
  }
  export type ShareRunIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    share?: boolean | DatashareDefaultArgs<ExtArgs>
  }

  export type $ShareRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ShareRun"
    objects: {
      share: Prisma.$DatasharePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shareId: string
      status: $Enums.ShareRunStatus
      trigger: $Enums.RunTrigger
      rowCount: number | null
      byteCount: number | null
      /**
       * Resulting object URI (s3://…) or warehouse share reference.
       */
      location: string | null
      format: $Enums.DatashareFormat
      durationMs: number | null
      error: string | null
      startedAt: Date | null
      finishedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["shareRun"]>
    composites: {}
  }

  type ShareRunGetPayload<S extends boolean | null | undefined | ShareRunDefaultArgs> = $Result.GetResult<Prisma.$ShareRunPayload, S>

  type ShareRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ShareRunFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ShareRunCountAggregateInputType | true
    }

  export interface ShareRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ShareRun'], meta: { name: 'ShareRun' } }
    /**
     * Find zero or one ShareRun that matches the filter.
     * @param {ShareRunFindUniqueArgs} args - Arguments to find a ShareRun
     * @example
     * // Get one ShareRun
     * const shareRun = await prisma.shareRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShareRunFindUniqueArgs>(args: SelectSubset<T, ShareRunFindUniqueArgs<ExtArgs>>): Prisma__ShareRunClient<$Result.GetResult<Prisma.$ShareRunPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ShareRun that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ShareRunFindUniqueOrThrowArgs} args - Arguments to find a ShareRun
     * @example
     * // Get one ShareRun
     * const shareRun = await prisma.shareRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShareRunFindUniqueOrThrowArgs>(args: SelectSubset<T, ShareRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShareRunClient<$Result.GetResult<Prisma.$ShareRunPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ShareRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShareRunFindFirstArgs} args - Arguments to find a ShareRun
     * @example
     * // Get one ShareRun
     * const shareRun = await prisma.shareRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShareRunFindFirstArgs>(args?: SelectSubset<T, ShareRunFindFirstArgs<ExtArgs>>): Prisma__ShareRunClient<$Result.GetResult<Prisma.$ShareRunPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ShareRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShareRunFindFirstOrThrowArgs} args - Arguments to find a ShareRun
     * @example
     * // Get one ShareRun
     * const shareRun = await prisma.shareRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShareRunFindFirstOrThrowArgs>(args?: SelectSubset<T, ShareRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShareRunClient<$Result.GetResult<Prisma.$ShareRunPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ShareRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShareRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ShareRuns
     * const shareRuns = await prisma.shareRun.findMany()
     * 
     * // Get first 10 ShareRuns
     * const shareRuns = await prisma.shareRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shareRunWithIdOnly = await prisma.shareRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShareRunFindManyArgs>(args?: SelectSubset<T, ShareRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShareRunPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ShareRun.
     * @param {ShareRunCreateArgs} args - Arguments to create a ShareRun.
     * @example
     * // Create one ShareRun
     * const ShareRun = await prisma.shareRun.create({
     *   data: {
     *     // ... data to create a ShareRun
     *   }
     * })
     * 
     */
    create<T extends ShareRunCreateArgs>(args: SelectSubset<T, ShareRunCreateArgs<ExtArgs>>): Prisma__ShareRunClient<$Result.GetResult<Prisma.$ShareRunPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ShareRuns.
     * @param {ShareRunCreateManyArgs} args - Arguments to create many ShareRuns.
     * @example
     * // Create many ShareRuns
     * const shareRun = await prisma.shareRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShareRunCreateManyArgs>(args?: SelectSubset<T, ShareRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ShareRuns and returns the data saved in the database.
     * @param {ShareRunCreateManyAndReturnArgs} args - Arguments to create many ShareRuns.
     * @example
     * // Create many ShareRuns
     * const shareRun = await prisma.shareRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ShareRuns and only return the `id`
     * const shareRunWithIdOnly = await prisma.shareRun.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShareRunCreateManyAndReturnArgs>(args?: SelectSubset<T, ShareRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShareRunPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ShareRun.
     * @param {ShareRunDeleteArgs} args - Arguments to delete one ShareRun.
     * @example
     * // Delete one ShareRun
     * const ShareRun = await prisma.shareRun.delete({
     *   where: {
     *     // ... filter to delete one ShareRun
     *   }
     * })
     * 
     */
    delete<T extends ShareRunDeleteArgs>(args: SelectSubset<T, ShareRunDeleteArgs<ExtArgs>>): Prisma__ShareRunClient<$Result.GetResult<Prisma.$ShareRunPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ShareRun.
     * @param {ShareRunUpdateArgs} args - Arguments to update one ShareRun.
     * @example
     * // Update one ShareRun
     * const shareRun = await prisma.shareRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShareRunUpdateArgs>(args: SelectSubset<T, ShareRunUpdateArgs<ExtArgs>>): Prisma__ShareRunClient<$Result.GetResult<Prisma.$ShareRunPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ShareRuns.
     * @param {ShareRunDeleteManyArgs} args - Arguments to filter ShareRuns to delete.
     * @example
     * // Delete a few ShareRuns
     * const { count } = await prisma.shareRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShareRunDeleteManyArgs>(args?: SelectSubset<T, ShareRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShareRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShareRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ShareRuns
     * const shareRun = await prisma.shareRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShareRunUpdateManyArgs>(args: SelectSubset<T, ShareRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ShareRun.
     * @param {ShareRunUpsertArgs} args - Arguments to update or create a ShareRun.
     * @example
     * // Update or create a ShareRun
     * const shareRun = await prisma.shareRun.upsert({
     *   create: {
     *     // ... data to create a ShareRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ShareRun we want to update
     *   }
     * })
     */
    upsert<T extends ShareRunUpsertArgs>(args: SelectSubset<T, ShareRunUpsertArgs<ExtArgs>>): Prisma__ShareRunClient<$Result.GetResult<Prisma.$ShareRunPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ShareRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShareRunCountArgs} args - Arguments to filter ShareRuns to count.
     * @example
     * // Count the number of ShareRuns
     * const count = await prisma.shareRun.count({
     *   where: {
     *     // ... the filter for the ShareRuns we want to count
     *   }
     * })
    **/
    count<T extends ShareRunCountArgs>(
      args?: Subset<T, ShareRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShareRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ShareRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShareRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ShareRunAggregateArgs>(args: Subset<T, ShareRunAggregateArgs>): Prisma.PrismaPromise<GetShareRunAggregateType<T>>

    /**
     * Group by ShareRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShareRunGroupByArgs} args - Group by arguments.
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
      T extends ShareRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShareRunGroupByArgs['orderBy'] }
        : { orderBy?: ShareRunGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ShareRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShareRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ShareRun model
   */
  readonly fields: ShareRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ShareRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShareRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    share<T extends DatashareDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DatashareDefaultArgs<ExtArgs>>): Prisma__DatashareClient<$Result.GetResult<Prisma.$DatasharePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ShareRun model
   */ 
  interface ShareRunFieldRefs {
    readonly id: FieldRef<"ShareRun", 'String'>
    readonly shareId: FieldRef<"ShareRun", 'String'>
    readonly status: FieldRef<"ShareRun", 'ShareRunStatus'>
    readonly trigger: FieldRef<"ShareRun", 'RunTrigger'>
    readonly rowCount: FieldRef<"ShareRun", 'Int'>
    readonly byteCount: FieldRef<"ShareRun", 'Int'>
    readonly location: FieldRef<"ShareRun", 'String'>
    readonly format: FieldRef<"ShareRun", 'DatashareFormat'>
    readonly durationMs: FieldRef<"ShareRun", 'Int'>
    readonly error: FieldRef<"ShareRun", 'String'>
    readonly startedAt: FieldRef<"ShareRun", 'DateTime'>
    readonly finishedAt: FieldRef<"ShareRun", 'DateTime'>
    readonly createdAt: FieldRef<"ShareRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ShareRun findUnique
   */
  export type ShareRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShareRun
     */
    select?: ShareRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareRunInclude<ExtArgs> | null
    /**
     * Filter, which ShareRun to fetch.
     */
    where: ShareRunWhereUniqueInput
  }

  /**
   * ShareRun findUniqueOrThrow
   */
  export type ShareRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShareRun
     */
    select?: ShareRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareRunInclude<ExtArgs> | null
    /**
     * Filter, which ShareRun to fetch.
     */
    where: ShareRunWhereUniqueInput
  }

  /**
   * ShareRun findFirst
   */
  export type ShareRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShareRun
     */
    select?: ShareRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareRunInclude<ExtArgs> | null
    /**
     * Filter, which ShareRun to fetch.
     */
    where?: ShareRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShareRuns to fetch.
     */
    orderBy?: ShareRunOrderByWithRelationInput | ShareRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShareRuns.
     */
    cursor?: ShareRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShareRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShareRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShareRuns.
     */
    distinct?: ShareRunScalarFieldEnum | ShareRunScalarFieldEnum[]
  }

  /**
   * ShareRun findFirstOrThrow
   */
  export type ShareRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShareRun
     */
    select?: ShareRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareRunInclude<ExtArgs> | null
    /**
     * Filter, which ShareRun to fetch.
     */
    where?: ShareRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShareRuns to fetch.
     */
    orderBy?: ShareRunOrderByWithRelationInput | ShareRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShareRuns.
     */
    cursor?: ShareRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShareRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShareRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShareRuns.
     */
    distinct?: ShareRunScalarFieldEnum | ShareRunScalarFieldEnum[]
  }

  /**
   * ShareRun findMany
   */
  export type ShareRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShareRun
     */
    select?: ShareRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareRunInclude<ExtArgs> | null
    /**
     * Filter, which ShareRuns to fetch.
     */
    where?: ShareRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShareRuns to fetch.
     */
    orderBy?: ShareRunOrderByWithRelationInput | ShareRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ShareRuns.
     */
    cursor?: ShareRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShareRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShareRuns.
     */
    skip?: number
    distinct?: ShareRunScalarFieldEnum | ShareRunScalarFieldEnum[]
  }

  /**
   * ShareRun create
   */
  export type ShareRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShareRun
     */
    select?: ShareRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareRunInclude<ExtArgs> | null
    /**
     * The data needed to create a ShareRun.
     */
    data: XOR<ShareRunCreateInput, ShareRunUncheckedCreateInput>
  }

  /**
   * ShareRun createMany
   */
  export type ShareRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ShareRuns.
     */
    data: ShareRunCreateManyInput | ShareRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ShareRun createManyAndReturn
   */
  export type ShareRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShareRun
     */
    select?: ShareRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ShareRuns.
     */
    data: ShareRunCreateManyInput | ShareRunCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareRunIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ShareRun update
   */
  export type ShareRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShareRun
     */
    select?: ShareRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareRunInclude<ExtArgs> | null
    /**
     * The data needed to update a ShareRun.
     */
    data: XOR<ShareRunUpdateInput, ShareRunUncheckedUpdateInput>
    /**
     * Choose, which ShareRun to update.
     */
    where: ShareRunWhereUniqueInput
  }

  /**
   * ShareRun updateMany
   */
  export type ShareRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ShareRuns.
     */
    data: XOR<ShareRunUpdateManyMutationInput, ShareRunUncheckedUpdateManyInput>
    /**
     * Filter which ShareRuns to update
     */
    where?: ShareRunWhereInput
  }

  /**
   * ShareRun upsert
   */
  export type ShareRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShareRun
     */
    select?: ShareRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareRunInclude<ExtArgs> | null
    /**
     * The filter to search for the ShareRun to update in case it exists.
     */
    where: ShareRunWhereUniqueInput
    /**
     * In case the ShareRun found by the `where` argument doesn't exist, create a new ShareRun with this data.
     */
    create: XOR<ShareRunCreateInput, ShareRunUncheckedCreateInput>
    /**
     * In case the ShareRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShareRunUpdateInput, ShareRunUncheckedUpdateInput>
  }

  /**
   * ShareRun delete
   */
  export type ShareRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShareRun
     */
    select?: ShareRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareRunInclude<ExtArgs> | null
    /**
     * Filter which ShareRun to delete.
     */
    where: ShareRunWhereUniqueInput
  }

  /**
   * ShareRun deleteMany
   */
  export type ShareRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShareRuns to delete
     */
    where?: ShareRunWhereInput
  }

  /**
   * ShareRun without action
   */
  export type ShareRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShareRun
     */
    select?: ShareRunSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareRunInclude<ExtArgs> | null
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


  export const DatashareScalarFieldEnum: {
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

  export type DatashareScalarFieldEnum = (typeof DatashareScalarFieldEnum)[keyof typeof DatashareScalarFieldEnum]


  export const ShareRunScalarFieldEnum: {
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

  export type ShareRunScalarFieldEnum = (typeof ShareRunScalarFieldEnum)[keyof typeof ShareRunScalarFieldEnum]


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
   * Reference to a field of type 'DatashareStatus'
   */
  export type EnumDatashareStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DatashareStatus'>
    


  /**
   * Reference to a field of type 'DatashareStatus[]'
   */
  export type ListEnumDatashareStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DatashareStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'DatashareDestination'
   */
  export type EnumDatashareDestinationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DatashareDestination'>
    


  /**
   * Reference to a field of type 'DatashareDestination[]'
   */
  export type ListEnumDatashareDestinationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DatashareDestination[]'>
    


  /**
   * Reference to a field of type 'DatashareFormat'
   */
  export type EnumDatashareFormatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DatashareFormat'>
    


  /**
   * Reference to a field of type 'DatashareFormat[]'
   */
  export type ListEnumDatashareFormatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DatashareFormat[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ShareRunStatus'
   */
  export type EnumShareRunStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShareRunStatus'>
    


  /**
   * Reference to a field of type 'ShareRunStatus[]'
   */
  export type ListEnumShareRunStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShareRunStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'RunTrigger'
   */
  export type EnumRunTriggerFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RunTrigger'>
    


  /**
   * Reference to a field of type 'RunTrigger[]'
   */
  export type ListEnumRunTriggerFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RunTrigger[]'>
    


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


  export type DatashareWhereInput = {
    AND?: DatashareWhereInput | DatashareWhereInput[]
    OR?: DatashareWhereInput[]
    NOT?: DatashareWhereInput | DatashareWhereInput[]
    id?: StringFilter<"Datashare"> | string
    orgId?: StringFilter<"Datashare"> | string
    name?: StringFilter<"Datashare"> | string
    description?: StringNullableFilter<"Datashare"> | string | null
    status?: EnumDatashareStatusFilter<"Datashare"> | $Enums.DatashareStatus
    datasetId?: StringFilter<"Datashare"> | string
    params?: JsonFilter<"Datashare">
    policy?: JsonFilter<"Datashare">
    destination?: EnumDatashareDestinationFilter<"Datashare"> | $Enums.DatashareDestination
    destinationConfig?: JsonFilter<"Datashare">
    format?: EnumDatashareFormatFilter<"Datashare"> | $Enums.DatashareFormat
    schedule?: StringNullableFilter<"Datashare"> | string | null
    runCount?: BigIntFilter<"Datashare"> | bigint | number
    lastRunAt?: DateTimeNullableFilter<"Datashare"> | Date | string | null
    lastSuccessAt?: DateTimeNullableFilter<"Datashare"> | Date | string | null
    lastRunStatus?: EnumShareRunStatusNullableFilter<"Datashare"> | $Enums.ShareRunStatus | null
    lastRowCount?: IntNullableFilter<"Datashare"> | number | null
    createdAt?: DateTimeFilter<"Datashare"> | Date | string
    updatedAt?: DateTimeFilter<"Datashare"> | Date | string
    runs?: ShareRunListRelationFilter
  }

  export type DatashareOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    datasetId?: SortOrder
    params?: SortOrder
    policy?: SortOrder
    destination?: SortOrder
    destinationConfig?: SortOrder
    format?: SortOrder
    schedule?: SortOrderInput | SortOrder
    runCount?: SortOrder
    lastRunAt?: SortOrderInput | SortOrder
    lastSuccessAt?: SortOrderInput | SortOrder
    lastRunStatus?: SortOrderInput | SortOrder
    lastRowCount?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    runs?: ShareRunOrderByRelationAggregateInput
  }

  export type DatashareWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DatashareWhereInput | DatashareWhereInput[]
    OR?: DatashareWhereInput[]
    NOT?: DatashareWhereInput | DatashareWhereInput[]
    orgId?: StringFilter<"Datashare"> | string
    name?: StringFilter<"Datashare"> | string
    description?: StringNullableFilter<"Datashare"> | string | null
    status?: EnumDatashareStatusFilter<"Datashare"> | $Enums.DatashareStatus
    datasetId?: StringFilter<"Datashare"> | string
    params?: JsonFilter<"Datashare">
    policy?: JsonFilter<"Datashare">
    destination?: EnumDatashareDestinationFilter<"Datashare"> | $Enums.DatashareDestination
    destinationConfig?: JsonFilter<"Datashare">
    format?: EnumDatashareFormatFilter<"Datashare"> | $Enums.DatashareFormat
    schedule?: StringNullableFilter<"Datashare"> | string | null
    runCount?: BigIntFilter<"Datashare"> | bigint | number
    lastRunAt?: DateTimeNullableFilter<"Datashare"> | Date | string | null
    lastSuccessAt?: DateTimeNullableFilter<"Datashare"> | Date | string | null
    lastRunStatus?: EnumShareRunStatusNullableFilter<"Datashare"> | $Enums.ShareRunStatus | null
    lastRowCount?: IntNullableFilter<"Datashare"> | number | null
    createdAt?: DateTimeFilter<"Datashare"> | Date | string
    updatedAt?: DateTimeFilter<"Datashare"> | Date | string
    runs?: ShareRunListRelationFilter
  }, "id">

  export type DatashareOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    datasetId?: SortOrder
    params?: SortOrder
    policy?: SortOrder
    destination?: SortOrder
    destinationConfig?: SortOrder
    format?: SortOrder
    schedule?: SortOrderInput | SortOrder
    runCount?: SortOrder
    lastRunAt?: SortOrderInput | SortOrder
    lastSuccessAt?: SortOrderInput | SortOrder
    lastRunStatus?: SortOrderInput | SortOrder
    lastRowCount?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DatashareCountOrderByAggregateInput
    _avg?: DatashareAvgOrderByAggregateInput
    _max?: DatashareMaxOrderByAggregateInput
    _min?: DatashareMinOrderByAggregateInput
    _sum?: DatashareSumOrderByAggregateInput
  }

  export type DatashareScalarWhereWithAggregatesInput = {
    AND?: DatashareScalarWhereWithAggregatesInput | DatashareScalarWhereWithAggregatesInput[]
    OR?: DatashareScalarWhereWithAggregatesInput[]
    NOT?: DatashareScalarWhereWithAggregatesInput | DatashareScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Datashare"> | string
    orgId?: StringWithAggregatesFilter<"Datashare"> | string
    name?: StringWithAggregatesFilter<"Datashare"> | string
    description?: StringNullableWithAggregatesFilter<"Datashare"> | string | null
    status?: EnumDatashareStatusWithAggregatesFilter<"Datashare"> | $Enums.DatashareStatus
    datasetId?: StringWithAggregatesFilter<"Datashare"> | string
    params?: JsonWithAggregatesFilter<"Datashare">
    policy?: JsonWithAggregatesFilter<"Datashare">
    destination?: EnumDatashareDestinationWithAggregatesFilter<"Datashare"> | $Enums.DatashareDestination
    destinationConfig?: JsonWithAggregatesFilter<"Datashare">
    format?: EnumDatashareFormatWithAggregatesFilter<"Datashare"> | $Enums.DatashareFormat
    schedule?: StringNullableWithAggregatesFilter<"Datashare"> | string | null
    runCount?: BigIntWithAggregatesFilter<"Datashare"> | bigint | number
    lastRunAt?: DateTimeNullableWithAggregatesFilter<"Datashare"> | Date | string | null
    lastSuccessAt?: DateTimeNullableWithAggregatesFilter<"Datashare"> | Date | string | null
    lastRunStatus?: EnumShareRunStatusNullableWithAggregatesFilter<"Datashare"> | $Enums.ShareRunStatus | null
    lastRowCount?: IntNullableWithAggregatesFilter<"Datashare"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Datashare"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Datashare"> | Date | string
  }

  export type ShareRunWhereInput = {
    AND?: ShareRunWhereInput | ShareRunWhereInput[]
    OR?: ShareRunWhereInput[]
    NOT?: ShareRunWhereInput | ShareRunWhereInput[]
    id?: StringFilter<"ShareRun"> | string
    shareId?: StringFilter<"ShareRun"> | string
    status?: EnumShareRunStatusFilter<"ShareRun"> | $Enums.ShareRunStatus
    trigger?: EnumRunTriggerFilter<"ShareRun"> | $Enums.RunTrigger
    rowCount?: IntNullableFilter<"ShareRun"> | number | null
    byteCount?: IntNullableFilter<"ShareRun"> | number | null
    location?: StringNullableFilter<"ShareRun"> | string | null
    format?: EnumDatashareFormatFilter<"ShareRun"> | $Enums.DatashareFormat
    durationMs?: IntNullableFilter<"ShareRun"> | number | null
    error?: StringNullableFilter<"ShareRun"> | string | null
    startedAt?: DateTimeNullableFilter<"ShareRun"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"ShareRun"> | Date | string | null
    createdAt?: DateTimeFilter<"ShareRun"> | Date | string
    share?: XOR<DatashareRelationFilter, DatashareWhereInput>
  }

  export type ShareRunOrderByWithRelationInput = {
    id?: SortOrder
    shareId?: SortOrder
    status?: SortOrder
    trigger?: SortOrder
    rowCount?: SortOrderInput | SortOrder
    byteCount?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    format?: SortOrder
    durationMs?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    finishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    share?: DatashareOrderByWithRelationInput
  }

  export type ShareRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ShareRunWhereInput | ShareRunWhereInput[]
    OR?: ShareRunWhereInput[]
    NOT?: ShareRunWhereInput | ShareRunWhereInput[]
    shareId?: StringFilter<"ShareRun"> | string
    status?: EnumShareRunStatusFilter<"ShareRun"> | $Enums.ShareRunStatus
    trigger?: EnumRunTriggerFilter<"ShareRun"> | $Enums.RunTrigger
    rowCount?: IntNullableFilter<"ShareRun"> | number | null
    byteCount?: IntNullableFilter<"ShareRun"> | number | null
    location?: StringNullableFilter<"ShareRun"> | string | null
    format?: EnumDatashareFormatFilter<"ShareRun"> | $Enums.DatashareFormat
    durationMs?: IntNullableFilter<"ShareRun"> | number | null
    error?: StringNullableFilter<"ShareRun"> | string | null
    startedAt?: DateTimeNullableFilter<"ShareRun"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"ShareRun"> | Date | string | null
    createdAt?: DateTimeFilter<"ShareRun"> | Date | string
    share?: XOR<DatashareRelationFilter, DatashareWhereInput>
  }, "id">

  export type ShareRunOrderByWithAggregationInput = {
    id?: SortOrder
    shareId?: SortOrder
    status?: SortOrder
    trigger?: SortOrder
    rowCount?: SortOrderInput | SortOrder
    byteCount?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    format?: SortOrder
    durationMs?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    finishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ShareRunCountOrderByAggregateInput
    _avg?: ShareRunAvgOrderByAggregateInput
    _max?: ShareRunMaxOrderByAggregateInput
    _min?: ShareRunMinOrderByAggregateInput
    _sum?: ShareRunSumOrderByAggregateInput
  }

  export type ShareRunScalarWhereWithAggregatesInput = {
    AND?: ShareRunScalarWhereWithAggregatesInput | ShareRunScalarWhereWithAggregatesInput[]
    OR?: ShareRunScalarWhereWithAggregatesInput[]
    NOT?: ShareRunScalarWhereWithAggregatesInput | ShareRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ShareRun"> | string
    shareId?: StringWithAggregatesFilter<"ShareRun"> | string
    status?: EnumShareRunStatusWithAggregatesFilter<"ShareRun"> | $Enums.ShareRunStatus
    trigger?: EnumRunTriggerWithAggregatesFilter<"ShareRun"> | $Enums.RunTrigger
    rowCount?: IntNullableWithAggregatesFilter<"ShareRun"> | number | null
    byteCount?: IntNullableWithAggregatesFilter<"ShareRun"> | number | null
    location?: StringNullableWithAggregatesFilter<"ShareRun"> | string | null
    format?: EnumDatashareFormatWithAggregatesFilter<"ShareRun"> | $Enums.DatashareFormat
    durationMs?: IntNullableWithAggregatesFilter<"ShareRun"> | number | null
    error?: StringNullableWithAggregatesFilter<"ShareRun"> | string | null
    startedAt?: DateTimeNullableWithAggregatesFilter<"ShareRun"> | Date | string | null
    finishedAt?: DateTimeNullableWithAggregatesFilter<"ShareRun"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ShareRun"> | Date | string
  }

  export type DatashareCreateInput = {
    id: string
    orgId: string
    name: string
    description?: string | null
    status?: $Enums.DatashareStatus
    datasetId: string
    params?: JsonNullValueInput | InputJsonValue
    policy?: JsonNullValueInput | InputJsonValue
    destination?: $Enums.DatashareDestination
    destinationConfig?: JsonNullValueInput | InputJsonValue
    format?: $Enums.DatashareFormat
    schedule?: string | null
    runCount?: bigint | number
    lastRunAt?: Date | string | null
    lastSuccessAt?: Date | string | null
    lastRunStatus?: $Enums.ShareRunStatus | null
    lastRowCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    runs?: ShareRunCreateNestedManyWithoutShareInput
  }

  export type DatashareUncheckedCreateInput = {
    id: string
    orgId: string
    name: string
    description?: string | null
    status?: $Enums.DatashareStatus
    datasetId: string
    params?: JsonNullValueInput | InputJsonValue
    policy?: JsonNullValueInput | InputJsonValue
    destination?: $Enums.DatashareDestination
    destinationConfig?: JsonNullValueInput | InputJsonValue
    format?: $Enums.DatashareFormat
    schedule?: string | null
    runCount?: bigint | number
    lastRunAt?: Date | string | null
    lastSuccessAt?: Date | string | null
    lastRunStatus?: $Enums.ShareRunStatus | null
    lastRowCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    runs?: ShareRunUncheckedCreateNestedManyWithoutShareInput
  }

  export type DatashareUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDatashareStatusFieldUpdateOperationsInput | $Enums.DatashareStatus
    datasetId?: StringFieldUpdateOperationsInput | string
    params?: JsonNullValueInput | InputJsonValue
    policy?: JsonNullValueInput | InputJsonValue
    destination?: EnumDatashareDestinationFieldUpdateOperationsInput | $Enums.DatashareDestination
    destinationConfig?: JsonNullValueInput | InputJsonValue
    format?: EnumDatashareFormatFieldUpdateOperationsInput | $Enums.DatashareFormat
    schedule?: NullableStringFieldUpdateOperationsInput | string | null
    runCount?: BigIntFieldUpdateOperationsInput | bigint | number
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSuccessAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastRunStatus?: NullableEnumShareRunStatusFieldUpdateOperationsInput | $Enums.ShareRunStatus | null
    lastRowCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runs?: ShareRunUpdateManyWithoutShareNestedInput
  }

  export type DatashareUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDatashareStatusFieldUpdateOperationsInput | $Enums.DatashareStatus
    datasetId?: StringFieldUpdateOperationsInput | string
    params?: JsonNullValueInput | InputJsonValue
    policy?: JsonNullValueInput | InputJsonValue
    destination?: EnumDatashareDestinationFieldUpdateOperationsInput | $Enums.DatashareDestination
    destinationConfig?: JsonNullValueInput | InputJsonValue
    format?: EnumDatashareFormatFieldUpdateOperationsInput | $Enums.DatashareFormat
    schedule?: NullableStringFieldUpdateOperationsInput | string | null
    runCount?: BigIntFieldUpdateOperationsInput | bigint | number
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSuccessAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastRunStatus?: NullableEnumShareRunStatusFieldUpdateOperationsInput | $Enums.ShareRunStatus | null
    lastRowCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runs?: ShareRunUncheckedUpdateManyWithoutShareNestedInput
  }

  export type DatashareCreateManyInput = {
    id: string
    orgId: string
    name: string
    description?: string | null
    status?: $Enums.DatashareStatus
    datasetId: string
    params?: JsonNullValueInput | InputJsonValue
    policy?: JsonNullValueInput | InputJsonValue
    destination?: $Enums.DatashareDestination
    destinationConfig?: JsonNullValueInput | InputJsonValue
    format?: $Enums.DatashareFormat
    schedule?: string | null
    runCount?: bigint | number
    lastRunAt?: Date | string | null
    lastSuccessAt?: Date | string | null
    lastRunStatus?: $Enums.ShareRunStatus | null
    lastRowCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DatashareUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDatashareStatusFieldUpdateOperationsInput | $Enums.DatashareStatus
    datasetId?: StringFieldUpdateOperationsInput | string
    params?: JsonNullValueInput | InputJsonValue
    policy?: JsonNullValueInput | InputJsonValue
    destination?: EnumDatashareDestinationFieldUpdateOperationsInput | $Enums.DatashareDestination
    destinationConfig?: JsonNullValueInput | InputJsonValue
    format?: EnumDatashareFormatFieldUpdateOperationsInput | $Enums.DatashareFormat
    schedule?: NullableStringFieldUpdateOperationsInput | string | null
    runCount?: BigIntFieldUpdateOperationsInput | bigint | number
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSuccessAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastRunStatus?: NullableEnumShareRunStatusFieldUpdateOperationsInput | $Enums.ShareRunStatus | null
    lastRowCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DatashareUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDatashareStatusFieldUpdateOperationsInput | $Enums.DatashareStatus
    datasetId?: StringFieldUpdateOperationsInput | string
    params?: JsonNullValueInput | InputJsonValue
    policy?: JsonNullValueInput | InputJsonValue
    destination?: EnumDatashareDestinationFieldUpdateOperationsInput | $Enums.DatashareDestination
    destinationConfig?: JsonNullValueInput | InputJsonValue
    format?: EnumDatashareFormatFieldUpdateOperationsInput | $Enums.DatashareFormat
    schedule?: NullableStringFieldUpdateOperationsInput | string | null
    runCount?: BigIntFieldUpdateOperationsInput | bigint | number
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSuccessAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastRunStatus?: NullableEnumShareRunStatusFieldUpdateOperationsInput | $Enums.ShareRunStatus | null
    lastRowCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShareRunCreateInput = {
    id: string
    status?: $Enums.ShareRunStatus
    trigger?: $Enums.RunTrigger
    rowCount?: number | null
    byteCount?: number | null
    location?: string | null
    format: $Enums.DatashareFormat
    durationMs?: number | null
    error?: string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
    share: DatashareCreateNestedOneWithoutRunsInput
  }

  export type ShareRunUncheckedCreateInput = {
    id: string
    shareId: string
    status?: $Enums.ShareRunStatus
    trigger?: $Enums.RunTrigger
    rowCount?: number | null
    byteCount?: number | null
    location?: string | null
    format: $Enums.DatashareFormat
    durationMs?: number | null
    error?: string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ShareRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumShareRunStatusFieldUpdateOperationsInput | $Enums.ShareRunStatus
    trigger?: EnumRunTriggerFieldUpdateOperationsInput | $Enums.RunTrigger
    rowCount?: NullableIntFieldUpdateOperationsInput | number | null
    byteCount?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    format?: EnumDatashareFormatFieldUpdateOperationsInput | $Enums.DatashareFormat
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    share?: DatashareUpdateOneRequiredWithoutRunsNestedInput
  }

  export type ShareRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shareId?: StringFieldUpdateOperationsInput | string
    status?: EnumShareRunStatusFieldUpdateOperationsInput | $Enums.ShareRunStatus
    trigger?: EnumRunTriggerFieldUpdateOperationsInput | $Enums.RunTrigger
    rowCount?: NullableIntFieldUpdateOperationsInput | number | null
    byteCount?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    format?: EnumDatashareFormatFieldUpdateOperationsInput | $Enums.DatashareFormat
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShareRunCreateManyInput = {
    id: string
    shareId: string
    status?: $Enums.ShareRunStatus
    trigger?: $Enums.RunTrigger
    rowCount?: number | null
    byteCount?: number | null
    location?: string | null
    format: $Enums.DatashareFormat
    durationMs?: number | null
    error?: string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ShareRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumShareRunStatusFieldUpdateOperationsInput | $Enums.ShareRunStatus
    trigger?: EnumRunTriggerFieldUpdateOperationsInput | $Enums.RunTrigger
    rowCount?: NullableIntFieldUpdateOperationsInput | number | null
    byteCount?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    format?: EnumDatashareFormatFieldUpdateOperationsInput | $Enums.DatashareFormat
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShareRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shareId?: StringFieldUpdateOperationsInput | string
    status?: EnumShareRunStatusFieldUpdateOperationsInput | $Enums.ShareRunStatus
    trigger?: EnumRunTriggerFieldUpdateOperationsInput | $Enums.RunTrigger
    rowCount?: NullableIntFieldUpdateOperationsInput | number | null
    byteCount?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    format?: EnumDatashareFormatFieldUpdateOperationsInput | $Enums.DatashareFormat
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumDatashareStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DatashareStatus | EnumDatashareStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DatashareStatus[] | ListEnumDatashareStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DatashareStatus[] | ListEnumDatashareStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDatashareStatusFilter<$PrismaModel> | $Enums.DatashareStatus
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

  export type EnumDatashareDestinationFilter<$PrismaModel = never> = {
    equals?: $Enums.DatashareDestination | EnumDatashareDestinationFieldRefInput<$PrismaModel>
    in?: $Enums.DatashareDestination[] | ListEnumDatashareDestinationFieldRefInput<$PrismaModel>
    notIn?: $Enums.DatashareDestination[] | ListEnumDatashareDestinationFieldRefInput<$PrismaModel>
    not?: NestedEnumDatashareDestinationFilter<$PrismaModel> | $Enums.DatashareDestination
  }

  export type EnumDatashareFormatFilter<$PrismaModel = never> = {
    equals?: $Enums.DatashareFormat | EnumDatashareFormatFieldRefInput<$PrismaModel>
    in?: $Enums.DatashareFormat[] | ListEnumDatashareFormatFieldRefInput<$PrismaModel>
    notIn?: $Enums.DatashareFormat[] | ListEnumDatashareFormatFieldRefInput<$PrismaModel>
    not?: NestedEnumDatashareFormatFilter<$PrismaModel> | $Enums.DatashareFormat
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

  export type EnumShareRunStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ShareRunStatus | EnumShareRunStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.ShareRunStatus[] | ListEnumShareRunStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ShareRunStatus[] | ListEnumShareRunStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumShareRunStatusNullableFilter<$PrismaModel> | $Enums.ShareRunStatus | null
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

  export type ShareRunListRelationFilter = {
    every?: ShareRunWhereInput
    some?: ShareRunWhereInput
    none?: ShareRunWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ShareRunOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DatashareCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    datasetId?: SortOrder
    params?: SortOrder
    policy?: SortOrder
    destination?: SortOrder
    destinationConfig?: SortOrder
    format?: SortOrder
    schedule?: SortOrder
    runCount?: SortOrder
    lastRunAt?: SortOrder
    lastSuccessAt?: SortOrder
    lastRunStatus?: SortOrder
    lastRowCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DatashareAvgOrderByAggregateInput = {
    runCount?: SortOrder
    lastRowCount?: SortOrder
  }

  export type DatashareMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    datasetId?: SortOrder
    destination?: SortOrder
    format?: SortOrder
    schedule?: SortOrder
    runCount?: SortOrder
    lastRunAt?: SortOrder
    lastSuccessAt?: SortOrder
    lastRunStatus?: SortOrder
    lastRowCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DatashareMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    datasetId?: SortOrder
    destination?: SortOrder
    format?: SortOrder
    schedule?: SortOrder
    runCount?: SortOrder
    lastRunAt?: SortOrder
    lastSuccessAt?: SortOrder
    lastRunStatus?: SortOrder
    lastRowCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DatashareSumOrderByAggregateInput = {
    runCount?: SortOrder
    lastRowCount?: SortOrder
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

  export type EnumDatashareStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DatashareStatus | EnumDatashareStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DatashareStatus[] | ListEnumDatashareStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DatashareStatus[] | ListEnumDatashareStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDatashareStatusWithAggregatesFilter<$PrismaModel> | $Enums.DatashareStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDatashareStatusFilter<$PrismaModel>
    _max?: NestedEnumDatashareStatusFilter<$PrismaModel>
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

  export type EnumDatashareDestinationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DatashareDestination | EnumDatashareDestinationFieldRefInput<$PrismaModel>
    in?: $Enums.DatashareDestination[] | ListEnumDatashareDestinationFieldRefInput<$PrismaModel>
    notIn?: $Enums.DatashareDestination[] | ListEnumDatashareDestinationFieldRefInput<$PrismaModel>
    not?: NestedEnumDatashareDestinationWithAggregatesFilter<$PrismaModel> | $Enums.DatashareDestination
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDatashareDestinationFilter<$PrismaModel>
    _max?: NestedEnumDatashareDestinationFilter<$PrismaModel>
  }

  export type EnumDatashareFormatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DatashareFormat | EnumDatashareFormatFieldRefInput<$PrismaModel>
    in?: $Enums.DatashareFormat[] | ListEnumDatashareFormatFieldRefInput<$PrismaModel>
    notIn?: $Enums.DatashareFormat[] | ListEnumDatashareFormatFieldRefInput<$PrismaModel>
    not?: NestedEnumDatashareFormatWithAggregatesFilter<$PrismaModel> | $Enums.DatashareFormat
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDatashareFormatFilter<$PrismaModel>
    _max?: NestedEnumDatashareFormatFilter<$PrismaModel>
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

  export type EnumShareRunStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShareRunStatus | EnumShareRunStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.ShareRunStatus[] | ListEnumShareRunStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ShareRunStatus[] | ListEnumShareRunStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumShareRunStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.ShareRunStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumShareRunStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumShareRunStatusNullableFilter<$PrismaModel>
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

  export type EnumShareRunStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShareRunStatus | EnumShareRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShareRunStatus[] | ListEnumShareRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShareRunStatus[] | ListEnumShareRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShareRunStatusFilter<$PrismaModel> | $Enums.ShareRunStatus
  }

  export type EnumRunTriggerFilter<$PrismaModel = never> = {
    equals?: $Enums.RunTrigger | EnumRunTriggerFieldRefInput<$PrismaModel>
    in?: $Enums.RunTrigger[] | ListEnumRunTriggerFieldRefInput<$PrismaModel>
    notIn?: $Enums.RunTrigger[] | ListEnumRunTriggerFieldRefInput<$PrismaModel>
    not?: NestedEnumRunTriggerFilter<$PrismaModel> | $Enums.RunTrigger
  }

  export type DatashareRelationFilter = {
    is?: DatashareWhereInput
    isNot?: DatashareWhereInput
  }

  export type ShareRunCountOrderByAggregateInput = {
    id?: SortOrder
    shareId?: SortOrder
    status?: SortOrder
    trigger?: SortOrder
    rowCount?: SortOrder
    byteCount?: SortOrder
    location?: SortOrder
    format?: SortOrder
    durationMs?: SortOrder
    error?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ShareRunAvgOrderByAggregateInput = {
    rowCount?: SortOrder
    byteCount?: SortOrder
    durationMs?: SortOrder
  }

  export type ShareRunMaxOrderByAggregateInput = {
    id?: SortOrder
    shareId?: SortOrder
    status?: SortOrder
    trigger?: SortOrder
    rowCount?: SortOrder
    byteCount?: SortOrder
    location?: SortOrder
    format?: SortOrder
    durationMs?: SortOrder
    error?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ShareRunMinOrderByAggregateInput = {
    id?: SortOrder
    shareId?: SortOrder
    status?: SortOrder
    trigger?: SortOrder
    rowCount?: SortOrder
    byteCount?: SortOrder
    location?: SortOrder
    format?: SortOrder
    durationMs?: SortOrder
    error?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ShareRunSumOrderByAggregateInput = {
    rowCount?: SortOrder
    byteCount?: SortOrder
    durationMs?: SortOrder
  }

  export type EnumShareRunStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShareRunStatus | EnumShareRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShareRunStatus[] | ListEnumShareRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShareRunStatus[] | ListEnumShareRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShareRunStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShareRunStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShareRunStatusFilter<$PrismaModel>
    _max?: NestedEnumShareRunStatusFilter<$PrismaModel>
  }

  export type EnumRunTriggerWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RunTrigger | EnumRunTriggerFieldRefInput<$PrismaModel>
    in?: $Enums.RunTrigger[] | ListEnumRunTriggerFieldRefInput<$PrismaModel>
    notIn?: $Enums.RunTrigger[] | ListEnumRunTriggerFieldRefInput<$PrismaModel>
    not?: NestedEnumRunTriggerWithAggregatesFilter<$PrismaModel> | $Enums.RunTrigger
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRunTriggerFilter<$PrismaModel>
    _max?: NestedEnumRunTriggerFilter<$PrismaModel>
  }

  export type ShareRunCreateNestedManyWithoutShareInput = {
    create?: XOR<ShareRunCreateWithoutShareInput, ShareRunUncheckedCreateWithoutShareInput> | ShareRunCreateWithoutShareInput[] | ShareRunUncheckedCreateWithoutShareInput[]
    connectOrCreate?: ShareRunCreateOrConnectWithoutShareInput | ShareRunCreateOrConnectWithoutShareInput[]
    createMany?: ShareRunCreateManyShareInputEnvelope
    connect?: ShareRunWhereUniqueInput | ShareRunWhereUniqueInput[]
  }

  export type ShareRunUncheckedCreateNestedManyWithoutShareInput = {
    create?: XOR<ShareRunCreateWithoutShareInput, ShareRunUncheckedCreateWithoutShareInput> | ShareRunCreateWithoutShareInput[] | ShareRunUncheckedCreateWithoutShareInput[]
    connectOrCreate?: ShareRunCreateOrConnectWithoutShareInput | ShareRunCreateOrConnectWithoutShareInput[]
    createMany?: ShareRunCreateManyShareInputEnvelope
    connect?: ShareRunWhereUniqueInput | ShareRunWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumDatashareStatusFieldUpdateOperationsInput = {
    set?: $Enums.DatashareStatus
  }

  export type EnumDatashareDestinationFieldUpdateOperationsInput = {
    set?: $Enums.DatashareDestination
  }

  export type EnumDatashareFormatFieldUpdateOperationsInput = {
    set?: $Enums.DatashareFormat
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableEnumShareRunStatusFieldUpdateOperationsInput = {
    set?: $Enums.ShareRunStatus | null
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

  export type ShareRunUpdateManyWithoutShareNestedInput = {
    create?: XOR<ShareRunCreateWithoutShareInput, ShareRunUncheckedCreateWithoutShareInput> | ShareRunCreateWithoutShareInput[] | ShareRunUncheckedCreateWithoutShareInput[]
    connectOrCreate?: ShareRunCreateOrConnectWithoutShareInput | ShareRunCreateOrConnectWithoutShareInput[]
    upsert?: ShareRunUpsertWithWhereUniqueWithoutShareInput | ShareRunUpsertWithWhereUniqueWithoutShareInput[]
    createMany?: ShareRunCreateManyShareInputEnvelope
    set?: ShareRunWhereUniqueInput | ShareRunWhereUniqueInput[]
    disconnect?: ShareRunWhereUniqueInput | ShareRunWhereUniqueInput[]
    delete?: ShareRunWhereUniqueInput | ShareRunWhereUniqueInput[]
    connect?: ShareRunWhereUniqueInput | ShareRunWhereUniqueInput[]
    update?: ShareRunUpdateWithWhereUniqueWithoutShareInput | ShareRunUpdateWithWhereUniqueWithoutShareInput[]
    updateMany?: ShareRunUpdateManyWithWhereWithoutShareInput | ShareRunUpdateManyWithWhereWithoutShareInput[]
    deleteMany?: ShareRunScalarWhereInput | ShareRunScalarWhereInput[]
  }

  export type ShareRunUncheckedUpdateManyWithoutShareNestedInput = {
    create?: XOR<ShareRunCreateWithoutShareInput, ShareRunUncheckedCreateWithoutShareInput> | ShareRunCreateWithoutShareInput[] | ShareRunUncheckedCreateWithoutShareInput[]
    connectOrCreate?: ShareRunCreateOrConnectWithoutShareInput | ShareRunCreateOrConnectWithoutShareInput[]
    upsert?: ShareRunUpsertWithWhereUniqueWithoutShareInput | ShareRunUpsertWithWhereUniqueWithoutShareInput[]
    createMany?: ShareRunCreateManyShareInputEnvelope
    set?: ShareRunWhereUniqueInput | ShareRunWhereUniqueInput[]
    disconnect?: ShareRunWhereUniqueInput | ShareRunWhereUniqueInput[]
    delete?: ShareRunWhereUniqueInput | ShareRunWhereUniqueInput[]
    connect?: ShareRunWhereUniqueInput | ShareRunWhereUniqueInput[]
    update?: ShareRunUpdateWithWhereUniqueWithoutShareInput | ShareRunUpdateWithWhereUniqueWithoutShareInput[]
    updateMany?: ShareRunUpdateManyWithWhereWithoutShareInput | ShareRunUpdateManyWithWhereWithoutShareInput[]
    deleteMany?: ShareRunScalarWhereInput | ShareRunScalarWhereInput[]
  }

  export type DatashareCreateNestedOneWithoutRunsInput = {
    create?: XOR<DatashareCreateWithoutRunsInput, DatashareUncheckedCreateWithoutRunsInput>
    connectOrCreate?: DatashareCreateOrConnectWithoutRunsInput
    connect?: DatashareWhereUniqueInput
  }

  export type EnumShareRunStatusFieldUpdateOperationsInput = {
    set?: $Enums.ShareRunStatus
  }

  export type EnumRunTriggerFieldUpdateOperationsInput = {
    set?: $Enums.RunTrigger
  }

  export type DatashareUpdateOneRequiredWithoutRunsNestedInput = {
    create?: XOR<DatashareCreateWithoutRunsInput, DatashareUncheckedCreateWithoutRunsInput>
    connectOrCreate?: DatashareCreateOrConnectWithoutRunsInput
    upsert?: DatashareUpsertWithoutRunsInput
    connect?: DatashareWhereUniqueInput
    update?: XOR<XOR<DatashareUpdateToOneWithWhereWithoutRunsInput, DatashareUpdateWithoutRunsInput>, DatashareUncheckedUpdateWithoutRunsInput>
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

  export type NestedEnumDatashareStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DatashareStatus | EnumDatashareStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DatashareStatus[] | ListEnumDatashareStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DatashareStatus[] | ListEnumDatashareStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDatashareStatusFilter<$PrismaModel> | $Enums.DatashareStatus
  }

  export type NestedEnumDatashareDestinationFilter<$PrismaModel = never> = {
    equals?: $Enums.DatashareDestination | EnumDatashareDestinationFieldRefInput<$PrismaModel>
    in?: $Enums.DatashareDestination[] | ListEnumDatashareDestinationFieldRefInput<$PrismaModel>
    notIn?: $Enums.DatashareDestination[] | ListEnumDatashareDestinationFieldRefInput<$PrismaModel>
    not?: NestedEnumDatashareDestinationFilter<$PrismaModel> | $Enums.DatashareDestination
  }

  export type NestedEnumDatashareFormatFilter<$PrismaModel = never> = {
    equals?: $Enums.DatashareFormat | EnumDatashareFormatFieldRefInput<$PrismaModel>
    in?: $Enums.DatashareFormat[] | ListEnumDatashareFormatFieldRefInput<$PrismaModel>
    notIn?: $Enums.DatashareFormat[] | ListEnumDatashareFormatFieldRefInput<$PrismaModel>
    not?: NestedEnumDatashareFormatFilter<$PrismaModel> | $Enums.DatashareFormat
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

  export type NestedEnumShareRunStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ShareRunStatus | EnumShareRunStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.ShareRunStatus[] | ListEnumShareRunStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ShareRunStatus[] | ListEnumShareRunStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumShareRunStatusNullableFilter<$PrismaModel> | $Enums.ShareRunStatus | null
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

  export type NestedEnumDatashareStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DatashareStatus | EnumDatashareStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DatashareStatus[] | ListEnumDatashareStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DatashareStatus[] | ListEnumDatashareStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDatashareStatusWithAggregatesFilter<$PrismaModel> | $Enums.DatashareStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDatashareStatusFilter<$PrismaModel>
    _max?: NestedEnumDatashareStatusFilter<$PrismaModel>
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

  export type NestedEnumDatashareDestinationWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DatashareDestination | EnumDatashareDestinationFieldRefInput<$PrismaModel>
    in?: $Enums.DatashareDestination[] | ListEnumDatashareDestinationFieldRefInput<$PrismaModel>
    notIn?: $Enums.DatashareDestination[] | ListEnumDatashareDestinationFieldRefInput<$PrismaModel>
    not?: NestedEnumDatashareDestinationWithAggregatesFilter<$PrismaModel> | $Enums.DatashareDestination
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDatashareDestinationFilter<$PrismaModel>
    _max?: NestedEnumDatashareDestinationFilter<$PrismaModel>
  }

  export type NestedEnumDatashareFormatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DatashareFormat | EnumDatashareFormatFieldRefInput<$PrismaModel>
    in?: $Enums.DatashareFormat[] | ListEnumDatashareFormatFieldRefInput<$PrismaModel>
    notIn?: $Enums.DatashareFormat[] | ListEnumDatashareFormatFieldRefInput<$PrismaModel>
    not?: NestedEnumDatashareFormatWithAggregatesFilter<$PrismaModel> | $Enums.DatashareFormat
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDatashareFormatFilter<$PrismaModel>
    _max?: NestedEnumDatashareFormatFilter<$PrismaModel>
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

  export type NestedEnumShareRunStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShareRunStatus | EnumShareRunStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.ShareRunStatus[] | ListEnumShareRunStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ShareRunStatus[] | ListEnumShareRunStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumShareRunStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.ShareRunStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumShareRunStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumShareRunStatusNullableFilter<$PrismaModel>
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

  export type NestedEnumShareRunStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ShareRunStatus | EnumShareRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShareRunStatus[] | ListEnumShareRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShareRunStatus[] | ListEnumShareRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShareRunStatusFilter<$PrismaModel> | $Enums.ShareRunStatus
  }

  export type NestedEnumRunTriggerFilter<$PrismaModel = never> = {
    equals?: $Enums.RunTrigger | EnumRunTriggerFieldRefInput<$PrismaModel>
    in?: $Enums.RunTrigger[] | ListEnumRunTriggerFieldRefInput<$PrismaModel>
    notIn?: $Enums.RunTrigger[] | ListEnumRunTriggerFieldRefInput<$PrismaModel>
    not?: NestedEnumRunTriggerFilter<$PrismaModel> | $Enums.RunTrigger
  }

  export type NestedEnumShareRunStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShareRunStatus | EnumShareRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ShareRunStatus[] | ListEnumShareRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShareRunStatus[] | ListEnumShareRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumShareRunStatusWithAggregatesFilter<$PrismaModel> | $Enums.ShareRunStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShareRunStatusFilter<$PrismaModel>
    _max?: NestedEnumShareRunStatusFilter<$PrismaModel>
  }

  export type NestedEnumRunTriggerWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RunTrigger | EnumRunTriggerFieldRefInput<$PrismaModel>
    in?: $Enums.RunTrigger[] | ListEnumRunTriggerFieldRefInput<$PrismaModel>
    notIn?: $Enums.RunTrigger[] | ListEnumRunTriggerFieldRefInput<$PrismaModel>
    not?: NestedEnumRunTriggerWithAggregatesFilter<$PrismaModel> | $Enums.RunTrigger
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRunTriggerFilter<$PrismaModel>
    _max?: NestedEnumRunTriggerFilter<$PrismaModel>
  }

  export type ShareRunCreateWithoutShareInput = {
    id: string
    status?: $Enums.ShareRunStatus
    trigger?: $Enums.RunTrigger
    rowCount?: number | null
    byteCount?: number | null
    location?: string | null
    format: $Enums.DatashareFormat
    durationMs?: number | null
    error?: string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ShareRunUncheckedCreateWithoutShareInput = {
    id: string
    status?: $Enums.ShareRunStatus
    trigger?: $Enums.RunTrigger
    rowCount?: number | null
    byteCount?: number | null
    location?: string | null
    format: $Enums.DatashareFormat
    durationMs?: number | null
    error?: string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ShareRunCreateOrConnectWithoutShareInput = {
    where: ShareRunWhereUniqueInput
    create: XOR<ShareRunCreateWithoutShareInput, ShareRunUncheckedCreateWithoutShareInput>
  }

  export type ShareRunCreateManyShareInputEnvelope = {
    data: ShareRunCreateManyShareInput | ShareRunCreateManyShareInput[]
    skipDuplicates?: boolean
  }

  export type ShareRunUpsertWithWhereUniqueWithoutShareInput = {
    where: ShareRunWhereUniqueInput
    update: XOR<ShareRunUpdateWithoutShareInput, ShareRunUncheckedUpdateWithoutShareInput>
    create: XOR<ShareRunCreateWithoutShareInput, ShareRunUncheckedCreateWithoutShareInput>
  }

  export type ShareRunUpdateWithWhereUniqueWithoutShareInput = {
    where: ShareRunWhereUniqueInput
    data: XOR<ShareRunUpdateWithoutShareInput, ShareRunUncheckedUpdateWithoutShareInput>
  }

  export type ShareRunUpdateManyWithWhereWithoutShareInput = {
    where: ShareRunScalarWhereInput
    data: XOR<ShareRunUpdateManyMutationInput, ShareRunUncheckedUpdateManyWithoutShareInput>
  }

  export type ShareRunScalarWhereInput = {
    AND?: ShareRunScalarWhereInput | ShareRunScalarWhereInput[]
    OR?: ShareRunScalarWhereInput[]
    NOT?: ShareRunScalarWhereInput | ShareRunScalarWhereInput[]
    id?: StringFilter<"ShareRun"> | string
    shareId?: StringFilter<"ShareRun"> | string
    status?: EnumShareRunStatusFilter<"ShareRun"> | $Enums.ShareRunStatus
    trigger?: EnumRunTriggerFilter<"ShareRun"> | $Enums.RunTrigger
    rowCount?: IntNullableFilter<"ShareRun"> | number | null
    byteCount?: IntNullableFilter<"ShareRun"> | number | null
    location?: StringNullableFilter<"ShareRun"> | string | null
    format?: EnumDatashareFormatFilter<"ShareRun"> | $Enums.DatashareFormat
    durationMs?: IntNullableFilter<"ShareRun"> | number | null
    error?: StringNullableFilter<"ShareRun"> | string | null
    startedAt?: DateTimeNullableFilter<"ShareRun"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"ShareRun"> | Date | string | null
    createdAt?: DateTimeFilter<"ShareRun"> | Date | string
  }

  export type DatashareCreateWithoutRunsInput = {
    id: string
    orgId: string
    name: string
    description?: string | null
    status?: $Enums.DatashareStatus
    datasetId: string
    params?: JsonNullValueInput | InputJsonValue
    policy?: JsonNullValueInput | InputJsonValue
    destination?: $Enums.DatashareDestination
    destinationConfig?: JsonNullValueInput | InputJsonValue
    format?: $Enums.DatashareFormat
    schedule?: string | null
    runCount?: bigint | number
    lastRunAt?: Date | string | null
    lastSuccessAt?: Date | string | null
    lastRunStatus?: $Enums.ShareRunStatus | null
    lastRowCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DatashareUncheckedCreateWithoutRunsInput = {
    id: string
    orgId: string
    name: string
    description?: string | null
    status?: $Enums.DatashareStatus
    datasetId: string
    params?: JsonNullValueInput | InputJsonValue
    policy?: JsonNullValueInput | InputJsonValue
    destination?: $Enums.DatashareDestination
    destinationConfig?: JsonNullValueInput | InputJsonValue
    format?: $Enums.DatashareFormat
    schedule?: string | null
    runCount?: bigint | number
    lastRunAt?: Date | string | null
    lastSuccessAt?: Date | string | null
    lastRunStatus?: $Enums.ShareRunStatus | null
    lastRowCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DatashareCreateOrConnectWithoutRunsInput = {
    where: DatashareWhereUniqueInput
    create: XOR<DatashareCreateWithoutRunsInput, DatashareUncheckedCreateWithoutRunsInput>
  }

  export type DatashareUpsertWithoutRunsInput = {
    update: XOR<DatashareUpdateWithoutRunsInput, DatashareUncheckedUpdateWithoutRunsInput>
    create: XOR<DatashareCreateWithoutRunsInput, DatashareUncheckedCreateWithoutRunsInput>
    where?: DatashareWhereInput
  }

  export type DatashareUpdateToOneWithWhereWithoutRunsInput = {
    where?: DatashareWhereInput
    data: XOR<DatashareUpdateWithoutRunsInput, DatashareUncheckedUpdateWithoutRunsInput>
  }

  export type DatashareUpdateWithoutRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDatashareStatusFieldUpdateOperationsInput | $Enums.DatashareStatus
    datasetId?: StringFieldUpdateOperationsInput | string
    params?: JsonNullValueInput | InputJsonValue
    policy?: JsonNullValueInput | InputJsonValue
    destination?: EnumDatashareDestinationFieldUpdateOperationsInput | $Enums.DatashareDestination
    destinationConfig?: JsonNullValueInput | InputJsonValue
    format?: EnumDatashareFormatFieldUpdateOperationsInput | $Enums.DatashareFormat
    schedule?: NullableStringFieldUpdateOperationsInput | string | null
    runCount?: BigIntFieldUpdateOperationsInput | bigint | number
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSuccessAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastRunStatus?: NullableEnumShareRunStatusFieldUpdateOperationsInput | $Enums.ShareRunStatus | null
    lastRowCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DatashareUncheckedUpdateWithoutRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumDatashareStatusFieldUpdateOperationsInput | $Enums.DatashareStatus
    datasetId?: StringFieldUpdateOperationsInput | string
    params?: JsonNullValueInput | InputJsonValue
    policy?: JsonNullValueInput | InputJsonValue
    destination?: EnumDatashareDestinationFieldUpdateOperationsInput | $Enums.DatashareDestination
    destinationConfig?: JsonNullValueInput | InputJsonValue
    format?: EnumDatashareFormatFieldUpdateOperationsInput | $Enums.DatashareFormat
    schedule?: NullableStringFieldUpdateOperationsInput | string | null
    runCount?: BigIntFieldUpdateOperationsInput | bigint | number
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSuccessAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastRunStatus?: NullableEnumShareRunStatusFieldUpdateOperationsInput | $Enums.ShareRunStatus | null
    lastRowCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShareRunCreateManyShareInput = {
    id: string
    status?: $Enums.ShareRunStatus
    trigger?: $Enums.RunTrigger
    rowCount?: number | null
    byteCount?: number | null
    location?: string | null
    format: $Enums.DatashareFormat
    durationMs?: number | null
    error?: string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ShareRunUpdateWithoutShareInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumShareRunStatusFieldUpdateOperationsInput | $Enums.ShareRunStatus
    trigger?: EnumRunTriggerFieldUpdateOperationsInput | $Enums.RunTrigger
    rowCount?: NullableIntFieldUpdateOperationsInput | number | null
    byteCount?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    format?: EnumDatashareFormatFieldUpdateOperationsInput | $Enums.DatashareFormat
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShareRunUncheckedUpdateWithoutShareInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumShareRunStatusFieldUpdateOperationsInput | $Enums.ShareRunStatus
    trigger?: EnumRunTriggerFieldUpdateOperationsInput | $Enums.RunTrigger
    rowCount?: NullableIntFieldUpdateOperationsInput | number | null
    byteCount?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    format?: EnumDatashareFormatFieldUpdateOperationsInput | $Enums.DatashareFormat
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShareRunUncheckedUpdateManyWithoutShareInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumShareRunStatusFieldUpdateOperationsInput | $Enums.ShareRunStatus
    trigger?: EnumRunTriggerFieldUpdateOperationsInput | $Enums.RunTrigger
    rowCount?: NullableIntFieldUpdateOperationsInput | number | null
    byteCount?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    format?: EnumDatashareFormatFieldUpdateOperationsInput | $Enums.DatashareFormat
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use DatashareCountOutputTypeDefaultArgs instead
     */
    export type DatashareCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DatashareCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DatashareDefaultArgs instead
     */
    export type DatashareArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DatashareDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ShareRunDefaultArgs instead
     */
    export type ShareRunArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ShareRunDefaultArgs<ExtArgs>

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