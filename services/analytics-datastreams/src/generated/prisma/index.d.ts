
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
 * Model Stream
 * 
 */
export type Stream = $Result.DefaultSelection<Prisma.$StreamPayload>
/**
 * Model StreamDelivery
 * 
 */
export type StreamDelivery = $Result.DefaultSelection<Prisma.$StreamDeliveryPayload>
/**
 * Model StreamDeadLetter
 * 
 */
export type StreamDeadLetter = $Result.DefaultSelection<Prisma.$StreamDeadLetterPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const StreamStatus: {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  DISABLED: 'DISABLED'
};

export type StreamStatus = (typeof StreamStatus)[keyof typeof StreamStatus]


export const StreamSink: {
  WEBHOOK: 'WEBHOOK',
  KAFKA: 'KAFKA',
  WEBSOCKET: 'WEBSOCKET'
};

export type StreamSink = (typeof StreamSink)[keyof typeof StreamSink]


export const StreamDeliveryStatus: {
  PENDING: 'PENDING',
  IN_FLIGHT: 'IN_FLIGHT',
  SUCCEEDED: 'SUCCEEDED',
  RETRYABLE: 'RETRYABLE',
  FAILED: 'FAILED',
  DEAD: 'DEAD'
};

export type StreamDeliveryStatus = (typeof StreamDeliveryStatus)[keyof typeof StreamDeliveryStatus]

}

export type StreamStatus = $Enums.StreamStatus

export const StreamStatus: typeof $Enums.StreamStatus

export type StreamSink = $Enums.StreamSink

export const StreamSink: typeof $Enums.StreamSink

export type StreamDeliveryStatus = $Enums.StreamDeliveryStatus

export const StreamDeliveryStatus: typeof $Enums.StreamDeliveryStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Streams
 * const streams = await prisma.stream.findMany()
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
   * // Fetch zero or more Streams
   * const streams = await prisma.stream.findMany()
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
   * `prisma.stream`: Exposes CRUD operations for the **Stream** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Streams
    * const streams = await prisma.stream.findMany()
    * ```
    */
  get stream(): Prisma.StreamDelegate<ExtArgs>;

  /**
   * `prisma.streamDelivery`: Exposes CRUD operations for the **StreamDelivery** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StreamDeliveries
    * const streamDeliveries = await prisma.streamDelivery.findMany()
    * ```
    */
  get streamDelivery(): Prisma.StreamDeliveryDelegate<ExtArgs>;

  /**
   * `prisma.streamDeadLetter`: Exposes CRUD operations for the **StreamDeadLetter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StreamDeadLetters
    * const streamDeadLetters = await prisma.streamDeadLetter.findMany()
    * ```
    */
  get streamDeadLetter(): Prisma.StreamDeadLetterDelegate<ExtArgs>;
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
    Stream: 'Stream',
    StreamDelivery: 'StreamDelivery',
    StreamDeadLetter: 'StreamDeadLetter'
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
      modelProps: "stream" | "streamDelivery" | "streamDeadLetter"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Stream: {
        payload: Prisma.$StreamPayload<ExtArgs>
        fields: Prisma.StreamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StreamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StreamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          findFirst: {
            args: Prisma.StreamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StreamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          findMany: {
            args: Prisma.StreamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[]
          }
          create: {
            args: Prisma.StreamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          createMany: {
            args: Prisma.StreamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StreamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[]
          }
          delete: {
            args: Prisma.StreamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          update: {
            args: Prisma.StreamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          deleteMany: {
            args: Prisma.StreamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StreamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StreamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          aggregate: {
            args: Prisma.StreamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStream>
          }
          groupBy: {
            args: Prisma.StreamGroupByArgs<ExtArgs>
            result: $Utils.Optional<StreamGroupByOutputType>[]
          }
          count: {
            args: Prisma.StreamCountArgs<ExtArgs>
            result: $Utils.Optional<StreamCountAggregateOutputType> | number
          }
        }
      }
      StreamDelivery: {
        payload: Prisma.$StreamDeliveryPayload<ExtArgs>
        fields: Prisma.StreamDeliveryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StreamDeliveryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeliveryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StreamDeliveryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeliveryPayload>
          }
          findFirst: {
            args: Prisma.StreamDeliveryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeliveryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StreamDeliveryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeliveryPayload>
          }
          findMany: {
            args: Prisma.StreamDeliveryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeliveryPayload>[]
          }
          create: {
            args: Prisma.StreamDeliveryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeliveryPayload>
          }
          createMany: {
            args: Prisma.StreamDeliveryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StreamDeliveryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeliveryPayload>[]
          }
          delete: {
            args: Prisma.StreamDeliveryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeliveryPayload>
          }
          update: {
            args: Prisma.StreamDeliveryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeliveryPayload>
          }
          deleteMany: {
            args: Prisma.StreamDeliveryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StreamDeliveryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StreamDeliveryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeliveryPayload>
          }
          aggregate: {
            args: Prisma.StreamDeliveryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStreamDelivery>
          }
          groupBy: {
            args: Prisma.StreamDeliveryGroupByArgs<ExtArgs>
            result: $Utils.Optional<StreamDeliveryGroupByOutputType>[]
          }
          count: {
            args: Prisma.StreamDeliveryCountArgs<ExtArgs>
            result: $Utils.Optional<StreamDeliveryCountAggregateOutputType> | number
          }
        }
      }
      StreamDeadLetter: {
        payload: Prisma.$StreamDeadLetterPayload<ExtArgs>
        fields: Prisma.StreamDeadLetterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StreamDeadLetterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeadLetterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StreamDeadLetterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeadLetterPayload>
          }
          findFirst: {
            args: Prisma.StreamDeadLetterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeadLetterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StreamDeadLetterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeadLetterPayload>
          }
          findMany: {
            args: Prisma.StreamDeadLetterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeadLetterPayload>[]
          }
          create: {
            args: Prisma.StreamDeadLetterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeadLetterPayload>
          }
          createMany: {
            args: Prisma.StreamDeadLetterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StreamDeadLetterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeadLetterPayload>[]
          }
          delete: {
            args: Prisma.StreamDeadLetterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeadLetterPayload>
          }
          update: {
            args: Prisma.StreamDeadLetterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeadLetterPayload>
          }
          deleteMany: {
            args: Prisma.StreamDeadLetterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StreamDeadLetterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StreamDeadLetterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamDeadLetterPayload>
          }
          aggregate: {
            args: Prisma.StreamDeadLetterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStreamDeadLetter>
          }
          groupBy: {
            args: Prisma.StreamDeadLetterGroupByArgs<ExtArgs>
            result: $Utils.Optional<StreamDeadLetterGroupByOutputType>[]
          }
          count: {
            args: Prisma.StreamDeadLetterCountArgs<ExtArgs>
            result: $Utils.Optional<StreamDeadLetterCountAggregateOutputType> | number
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
   * Count Type StreamCountOutputType
   */

  export type StreamCountOutputType = {
    deliveries: number
  }

  export type StreamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deliveries?: boolean | StreamCountOutputTypeCountDeliveriesArgs
  }

  // Custom InputTypes
  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamCountOutputType
     */
    select?: StreamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StreamCountOutputType without action
   */
  export type StreamCountOutputTypeCountDeliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamDeliveryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Stream
   */

  export type AggregateStream = {
    _count: StreamCountAggregateOutputType | null
    _avg: StreamAvgAggregateOutputType | null
    _sum: StreamSumAggregateOutputType | null
    _min: StreamMinAggregateOutputType | null
    _max: StreamMaxAggregateOutputType | null
  }

  export type StreamAvgAggregateOutputType = {
    consecutiveFailures: number | null
    matchedTotal: number | null
  }

  export type StreamSumAggregateOutputType = {
    consecutiveFailures: number | null
    matchedTotal: bigint | null
  }

  export type StreamMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    name: string | null
    description: string | null
    status: $Enums.StreamStatus | null
    sink: $Enums.StreamSink | null
    url: string | null
    signingSecret: string | null
    signingKeyId: string | null
    kafkaTopic: string | null
    consecutiveFailures: number | null
    disabledAt: Date | null
    matchedTotal: bigint | null
    lastMatchedAt: Date | null
    lastDeliveredAt: Date | null
    lastAttemptedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StreamMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    name: string | null
    description: string | null
    status: $Enums.StreamStatus | null
    sink: $Enums.StreamSink | null
    url: string | null
    signingSecret: string | null
    signingKeyId: string | null
    kafkaTopic: string | null
    consecutiveFailures: number | null
    disabledAt: Date | null
    matchedTotal: bigint | null
    lastMatchedAt: Date | null
    lastDeliveredAt: Date | null
    lastAttemptedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StreamCountAggregateOutputType = {
    id: number
    orgId: number
    name: number
    description: number
    status: number
    sink: number
    filter: number
    url: number
    signingSecret: number
    signingKeyId: number
    kafkaTopic: number
    consecutiveFailures: number
    disabledAt: number
    matchedTotal: number
    lastMatchedAt: number
    lastDeliveredAt: number
    lastAttemptedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StreamAvgAggregateInputType = {
    consecutiveFailures?: true
    matchedTotal?: true
  }

  export type StreamSumAggregateInputType = {
    consecutiveFailures?: true
    matchedTotal?: true
  }

  export type StreamMinAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    description?: true
    status?: true
    sink?: true
    url?: true
    signingSecret?: true
    signingKeyId?: true
    kafkaTopic?: true
    consecutiveFailures?: true
    disabledAt?: true
    matchedTotal?: true
    lastMatchedAt?: true
    lastDeliveredAt?: true
    lastAttemptedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StreamMaxAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    description?: true
    status?: true
    sink?: true
    url?: true
    signingSecret?: true
    signingKeyId?: true
    kafkaTopic?: true
    consecutiveFailures?: true
    disabledAt?: true
    matchedTotal?: true
    lastMatchedAt?: true
    lastDeliveredAt?: true
    lastAttemptedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StreamCountAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    description?: true
    status?: true
    sink?: true
    filter?: true
    url?: true
    signingSecret?: true
    signingKeyId?: true
    kafkaTopic?: true
    consecutiveFailures?: true
    disabledAt?: true
    matchedTotal?: true
    lastMatchedAt?: true
    lastDeliveredAt?: true
    lastAttemptedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StreamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stream to aggregate.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Streams
    **/
    _count?: true | StreamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StreamAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StreamSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StreamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StreamMaxAggregateInputType
  }

  export type GetStreamAggregateType<T extends StreamAggregateArgs> = {
        [P in keyof T & keyof AggregateStream]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStream[P]>
      : GetScalarType<T[P], AggregateStream[P]>
  }




  export type StreamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamWhereInput
    orderBy?: StreamOrderByWithAggregationInput | StreamOrderByWithAggregationInput[]
    by: StreamScalarFieldEnum[] | StreamScalarFieldEnum
    having?: StreamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StreamCountAggregateInputType | true
    _avg?: StreamAvgAggregateInputType
    _sum?: StreamSumAggregateInputType
    _min?: StreamMinAggregateInputType
    _max?: StreamMaxAggregateInputType
  }

  export type StreamGroupByOutputType = {
    id: string
    orgId: string
    name: string
    description: string | null
    status: $Enums.StreamStatus
    sink: $Enums.StreamSink
    filter: JsonValue
    url: string | null
    signingSecret: string
    signingKeyId: string
    kafkaTopic: string | null
    consecutiveFailures: number
    disabledAt: Date | null
    matchedTotal: bigint
    lastMatchedAt: Date | null
    lastDeliveredAt: Date | null
    lastAttemptedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: StreamCountAggregateOutputType | null
    _avg: StreamAvgAggregateOutputType | null
    _sum: StreamSumAggregateOutputType | null
    _min: StreamMinAggregateOutputType | null
    _max: StreamMaxAggregateOutputType | null
  }

  type GetStreamGroupByPayload<T extends StreamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StreamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StreamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StreamGroupByOutputType[P]>
            : GetScalarType<T[P], StreamGroupByOutputType[P]>
        }
      >
    >


  export type StreamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    sink?: boolean
    filter?: boolean
    url?: boolean
    signingSecret?: boolean
    signingKeyId?: boolean
    kafkaTopic?: boolean
    consecutiveFailures?: boolean
    disabledAt?: boolean
    matchedTotal?: boolean
    lastMatchedAt?: boolean
    lastDeliveredAt?: boolean
    lastAttemptedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deliveries?: boolean | Stream$deliveriesArgs<ExtArgs>
    _count?: boolean | StreamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    sink?: boolean
    filter?: boolean
    url?: boolean
    signingSecret?: boolean
    signingKeyId?: boolean
    kafkaTopic?: boolean
    consecutiveFailures?: boolean
    disabledAt?: boolean
    matchedTotal?: boolean
    lastMatchedAt?: boolean
    lastDeliveredAt?: boolean
    lastAttemptedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectScalar = {
    id?: boolean
    orgId?: boolean
    name?: boolean
    description?: boolean
    status?: boolean
    sink?: boolean
    filter?: boolean
    url?: boolean
    signingSecret?: boolean
    signingKeyId?: boolean
    kafkaTopic?: boolean
    consecutiveFailures?: boolean
    disabledAt?: boolean
    matchedTotal?: boolean
    lastMatchedAt?: boolean
    lastDeliveredAt?: boolean
    lastAttemptedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StreamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deliveries?: boolean | Stream$deliveriesArgs<ExtArgs>
    _count?: boolean | StreamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StreamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StreamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stream"
    objects: {
      deliveries: Prisma.$StreamDeliveryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      name: string
      description: string | null
      status: $Enums.StreamStatus
      sink: $Enums.StreamSink
      /**
       * Filter predicate (validated by the StreamFilter zod schema in the app
       * layer before persistence). Stored as JSON so the predicate surface can
       * evolve without a migration.
       */
      filter: Prisma.JsonValue
      url: string | null
      /**
       * Hex-encoded HMAC signing secret. The subscriber verifies every delivery
       * using this secret. Rotation issues a new secret + key id.
       */
      signingSecret: string
      signingKeyId: string
      kafkaTopic: string | null
      consecutiveFailures: number
      disabledAt: Date | null
      matchedTotal: bigint
      lastMatchedAt: Date | null
      lastDeliveredAt: Date | null
      lastAttemptedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stream"]>
    composites: {}
  }

  type StreamGetPayload<S extends boolean | null | undefined | StreamDefaultArgs> = $Result.GetResult<Prisma.$StreamPayload, S>

  type StreamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StreamFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StreamCountAggregateInputType | true
    }

  export interface StreamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stream'], meta: { name: 'Stream' } }
    /**
     * Find zero or one Stream that matches the filter.
     * @param {StreamFindUniqueArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StreamFindUniqueArgs>(args: SelectSubset<T, StreamFindUniqueArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Stream that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StreamFindUniqueOrThrowArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StreamFindUniqueOrThrowArgs>(args: SelectSubset<T, StreamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Stream that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindFirstArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StreamFindFirstArgs>(args?: SelectSubset<T, StreamFindFirstArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Stream that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindFirstOrThrowArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StreamFindFirstOrThrowArgs>(args?: SelectSubset<T, StreamFindFirstOrThrowArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Streams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Streams
     * const streams = await prisma.stream.findMany()
     * 
     * // Get first 10 Streams
     * const streams = await prisma.stream.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const streamWithIdOnly = await prisma.stream.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StreamFindManyArgs>(args?: SelectSubset<T, StreamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Stream.
     * @param {StreamCreateArgs} args - Arguments to create a Stream.
     * @example
     * // Create one Stream
     * const Stream = await prisma.stream.create({
     *   data: {
     *     // ... data to create a Stream
     *   }
     * })
     * 
     */
    create<T extends StreamCreateArgs>(args: SelectSubset<T, StreamCreateArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Streams.
     * @param {StreamCreateManyArgs} args - Arguments to create many Streams.
     * @example
     * // Create many Streams
     * const stream = await prisma.stream.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StreamCreateManyArgs>(args?: SelectSubset<T, StreamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Streams and returns the data saved in the database.
     * @param {StreamCreateManyAndReturnArgs} args - Arguments to create many Streams.
     * @example
     * // Create many Streams
     * const stream = await prisma.stream.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Streams and only return the `id`
     * const streamWithIdOnly = await prisma.stream.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StreamCreateManyAndReturnArgs>(args?: SelectSubset<T, StreamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Stream.
     * @param {StreamDeleteArgs} args - Arguments to delete one Stream.
     * @example
     * // Delete one Stream
     * const Stream = await prisma.stream.delete({
     *   where: {
     *     // ... filter to delete one Stream
     *   }
     * })
     * 
     */
    delete<T extends StreamDeleteArgs>(args: SelectSubset<T, StreamDeleteArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Stream.
     * @param {StreamUpdateArgs} args - Arguments to update one Stream.
     * @example
     * // Update one Stream
     * const stream = await prisma.stream.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StreamUpdateArgs>(args: SelectSubset<T, StreamUpdateArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Streams.
     * @param {StreamDeleteManyArgs} args - Arguments to filter Streams to delete.
     * @example
     * // Delete a few Streams
     * const { count } = await prisma.stream.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StreamDeleteManyArgs>(args?: SelectSubset<T, StreamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Streams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Streams
     * const stream = await prisma.stream.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StreamUpdateManyArgs>(args: SelectSubset<T, StreamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Stream.
     * @param {StreamUpsertArgs} args - Arguments to update or create a Stream.
     * @example
     * // Update or create a Stream
     * const stream = await prisma.stream.upsert({
     *   create: {
     *     // ... data to create a Stream
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stream we want to update
     *   }
     * })
     */
    upsert<T extends StreamUpsertArgs>(args: SelectSubset<T, StreamUpsertArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Streams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamCountArgs} args - Arguments to filter Streams to count.
     * @example
     * // Count the number of Streams
     * const count = await prisma.stream.count({
     *   where: {
     *     // ... the filter for the Streams we want to count
     *   }
     * })
    **/
    count<T extends StreamCountArgs>(
      args?: Subset<T, StreamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StreamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stream.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StreamAggregateArgs>(args: Subset<T, StreamAggregateArgs>): Prisma.PrismaPromise<GetStreamAggregateType<T>>

    /**
     * Group by Stream.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamGroupByArgs} args - Group by arguments.
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
      T extends StreamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StreamGroupByArgs['orderBy'] }
        : { orderBy?: StreamGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StreamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStreamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stream model
   */
  readonly fields: StreamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stream.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StreamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    deliveries<T extends Stream$deliveriesArgs<ExtArgs> = {}>(args?: Subset<T, Stream$deliveriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamDeliveryPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Stream model
   */ 
  interface StreamFieldRefs {
    readonly id: FieldRef<"Stream", 'String'>
    readonly orgId: FieldRef<"Stream", 'String'>
    readonly name: FieldRef<"Stream", 'String'>
    readonly description: FieldRef<"Stream", 'String'>
    readonly status: FieldRef<"Stream", 'StreamStatus'>
    readonly sink: FieldRef<"Stream", 'StreamSink'>
    readonly filter: FieldRef<"Stream", 'Json'>
    readonly url: FieldRef<"Stream", 'String'>
    readonly signingSecret: FieldRef<"Stream", 'String'>
    readonly signingKeyId: FieldRef<"Stream", 'String'>
    readonly kafkaTopic: FieldRef<"Stream", 'String'>
    readonly consecutiveFailures: FieldRef<"Stream", 'Int'>
    readonly disabledAt: FieldRef<"Stream", 'DateTime'>
    readonly matchedTotal: FieldRef<"Stream", 'BigInt'>
    readonly lastMatchedAt: FieldRef<"Stream", 'DateTime'>
    readonly lastDeliveredAt: FieldRef<"Stream", 'DateTime'>
    readonly lastAttemptedAt: FieldRef<"Stream", 'DateTime'>
    readonly createdAt: FieldRef<"Stream", 'DateTime'>
    readonly updatedAt: FieldRef<"Stream", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Stream findUnique
   */
  export type StreamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream findUniqueOrThrow
   */
  export type StreamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream findFirst
   */
  export type StreamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Streams.
     */
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream findFirstOrThrow
   */
  export type StreamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Streams.
     */
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream findMany
   */
  export type StreamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Streams to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream create
   */
  export type StreamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * The data needed to create a Stream.
     */
    data: XOR<StreamCreateInput, StreamUncheckedCreateInput>
  }

  /**
   * Stream createMany
   */
  export type StreamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Streams.
     */
    data: StreamCreateManyInput | StreamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stream createManyAndReturn
   */
  export type StreamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Streams.
     */
    data: StreamCreateManyInput | StreamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stream update
   */
  export type StreamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * The data needed to update a Stream.
     */
    data: XOR<StreamUpdateInput, StreamUncheckedUpdateInput>
    /**
     * Choose, which Stream to update.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream updateMany
   */
  export type StreamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Streams.
     */
    data: XOR<StreamUpdateManyMutationInput, StreamUncheckedUpdateManyInput>
    /**
     * Filter which Streams to update
     */
    where?: StreamWhereInput
  }

  /**
   * Stream upsert
   */
  export type StreamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * The filter to search for the Stream to update in case it exists.
     */
    where: StreamWhereUniqueInput
    /**
     * In case the Stream found by the `where` argument doesn't exist, create a new Stream with this data.
     */
    create: XOR<StreamCreateInput, StreamUncheckedCreateInput>
    /**
     * In case the Stream was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StreamUpdateInput, StreamUncheckedUpdateInput>
  }

  /**
   * Stream delete
   */
  export type StreamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter which Stream to delete.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream deleteMany
   */
  export type StreamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Streams to delete
     */
    where?: StreamWhereInput
  }

  /**
   * Stream.deliveries
   */
  export type Stream$deliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDelivery
     */
    select?: StreamDeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamDeliveryInclude<ExtArgs> | null
    where?: StreamDeliveryWhereInput
    orderBy?: StreamDeliveryOrderByWithRelationInput | StreamDeliveryOrderByWithRelationInput[]
    cursor?: StreamDeliveryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StreamDeliveryScalarFieldEnum | StreamDeliveryScalarFieldEnum[]
  }

  /**
   * Stream without action
   */
  export type StreamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
  }


  /**
   * Model StreamDelivery
   */

  export type AggregateStreamDelivery = {
    _count: StreamDeliveryCountAggregateOutputType | null
    _avg: StreamDeliveryAvgAggregateOutputType | null
    _sum: StreamDeliverySumAggregateOutputType | null
    _min: StreamDeliveryMinAggregateOutputType | null
    _max: StreamDeliveryMaxAggregateOutputType | null
  }

  export type StreamDeliveryAvgAggregateOutputType = {
    attempts: number | null
    lastStatusCode: number | null
    lastLatencyMs: number | null
  }

  export type StreamDeliverySumAggregateOutputType = {
    attempts: number | null
    lastStatusCode: number | null
    lastLatencyMs: number | null
  }

  export type StreamDeliveryMinAggregateOutputType = {
    id: string | null
    streamId: string | null
    subject: string | null
    eventId: string | null
    attempts: number | null
    status: $Enums.StreamDeliveryStatus | null
    lastStatusCode: number | null
    lastResponseExcerpt: string | null
    lastLatencyMs: number | null
    lastError: string | null
    nextAttemptAt: Date | null
    succeededAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StreamDeliveryMaxAggregateOutputType = {
    id: string | null
    streamId: string | null
    subject: string | null
    eventId: string | null
    attempts: number | null
    status: $Enums.StreamDeliveryStatus | null
    lastStatusCode: number | null
    lastResponseExcerpt: string | null
    lastLatencyMs: number | null
    lastError: string | null
    nextAttemptAt: Date | null
    succeededAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StreamDeliveryCountAggregateOutputType = {
    id: number
    streamId: number
    subject: number
    eventId: number
    payload: number
    attempts: number
    status: number
    lastStatusCode: number
    lastResponseExcerpt: number
    lastLatencyMs: number
    lastError: number
    nextAttemptAt: number
    succeededAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StreamDeliveryAvgAggregateInputType = {
    attempts?: true
    lastStatusCode?: true
    lastLatencyMs?: true
  }

  export type StreamDeliverySumAggregateInputType = {
    attempts?: true
    lastStatusCode?: true
    lastLatencyMs?: true
  }

  export type StreamDeliveryMinAggregateInputType = {
    id?: true
    streamId?: true
    subject?: true
    eventId?: true
    attempts?: true
    status?: true
    lastStatusCode?: true
    lastResponseExcerpt?: true
    lastLatencyMs?: true
    lastError?: true
    nextAttemptAt?: true
    succeededAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StreamDeliveryMaxAggregateInputType = {
    id?: true
    streamId?: true
    subject?: true
    eventId?: true
    attempts?: true
    status?: true
    lastStatusCode?: true
    lastResponseExcerpt?: true
    lastLatencyMs?: true
    lastError?: true
    nextAttemptAt?: true
    succeededAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StreamDeliveryCountAggregateInputType = {
    id?: true
    streamId?: true
    subject?: true
    eventId?: true
    payload?: true
    attempts?: true
    status?: true
    lastStatusCode?: true
    lastResponseExcerpt?: true
    lastLatencyMs?: true
    lastError?: true
    nextAttemptAt?: true
    succeededAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StreamDeliveryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StreamDelivery to aggregate.
     */
    where?: StreamDeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StreamDeliveries to fetch.
     */
    orderBy?: StreamDeliveryOrderByWithRelationInput | StreamDeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StreamDeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StreamDeliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StreamDeliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StreamDeliveries
    **/
    _count?: true | StreamDeliveryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StreamDeliveryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StreamDeliverySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StreamDeliveryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StreamDeliveryMaxAggregateInputType
  }

  export type GetStreamDeliveryAggregateType<T extends StreamDeliveryAggregateArgs> = {
        [P in keyof T & keyof AggregateStreamDelivery]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStreamDelivery[P]>
      : GetScalarType<T[P], AggregateStreamDelivery[P]>
  }




  export type StreamDeliveryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamDeliveryWhereInput
    orderBy?: StreamDeliveryOrderByWithAggregationInput | StreamDeliveryOrderByWithAggregationInput[]
    by: StreamDeliveryScalarFieldEnum[] | StreamDeliveryScalarFieldEnum
    having?: StreamDeliveryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StreamDeliveryCountAggregateInputType | true
    _avg?: StreamDeliveryAvgAggregateInputType
    _sum?: StreamDeliverySumAggregateInputType
    _min?: StreamDeliveryMinAggregateInputType
    _max?: StreamDeliveryMaxAggregateInputType
  }

  export type StreamDeliveryGroupByOutputType = {
    id: string
    streamId: string
    subject: string
    eventId: string
    payload: JsonValue
    attempts: number
    status: $Enums.StreamDeliveryStatus
    lastStatusCode: number | null
    lastResponseExcerpt: string | null
    lastLatencyMs: number | null
    lastError: string | null
    nextAttemptAt: Date | null
    succeededAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: StreamDeliveryCountAggregateOutputType | null
    _avg: StreamDeliveryAvgAggregateOutputType | null
    _sum: StreamDeliverySumAggregateOutputType | null
    _min: StreamDeliveryMinAggregateOutputType | null
    _max: StreamDeliveryMaxAggregateOutputType | null
  }

  type GetStreamDeliveryGroupByPayload<T extends StreamDeliveryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StreamDeliveryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StreamDeliveryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StreamDeliveryGroupByOutputType[P]>
            : GetScalarType<T[P], StreamDeliveryGroupByOutputType[P]>
        }
      >
    >


  export type StreamDeliverySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    subject?: boolean
    eventId?: boolean
    payload?: boolean
    attempts?: boolean
    status?: boolean
    lastStatusCode?: boolean
    lastResponseExcerpt?: boolean
    lastLatencyMs?: boolean
    lastError?: boolean
    nextAttemptAt?: boolean
    succeededAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["streamDelivery"]>

  export type StreamDeliverySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    streamId?: boolean
    subject?: boolean
    eventId?: boolean
    payload?: boolean
    attempts?: boolean
    status?: boolean
    lastStatusCode?: boolean
    lastResponseExcerpt?: boolean
    lastLatencyMs?: boolean
    lastError?: boolean
    nextAttemptAt?: boolean
    succeededAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["streamDelivery"]>

  export type StreamDeliverySelectScalar = {
    id?: boolean
    streamId?: boolean
    subject?: boolean
    eventId?: boolean
    payload?: boolean
    attempts?: boolean
    status?: boolean
    lastStatusCode?: boolean
    lastResponseExcerpt?: boolean
    lastLatencyMs?: boolean
    lastError?: boolean
    nextAttemptAt?: boolean
    succeededAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StreamDeliveryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }
  export type StreamDeliveryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stream?: boolean | StreamDefaultArgs<ExtArgs>
  }

  export type $StreamDeliveryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StreamDelivery"
    objects: {
      stream: Prisma.$StreamPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      streamId: string
      /**
       * NATS subject (e.g. `salychain.chain.base.transfer_observed`).
       */
      subject: string
      /**
       * Idempotency key — `event_id` from the source event.
       */
      eventId: string
      payload: Prisma.JsonValue
      attempts: number
      status: $Enums.StreamDeliveryStatus
      lastStatusCode: number | null
      lastResponseExcerpt: string | null
      lastLatencyMs: number | null
      lastError: string | null
      nextAttemptAt: Date | null
      succeededAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["streamDelivery"]>
    composites: {}
  }

  type StreamDeliveryGetPayload<S extends boolean | null | undefined | StreamDeliveryDefaultArgs> = $Result.GetResult<Prisma.$StreamDeliveryPayload, S>

  type StreamDeliveryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StreamDeliveryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StreamDeliveryCountAggregateInputType | true
    }

  export interface StreamDeliveryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StreamDelivery'], meta: { name: 'StreamDelivery' } }
    /**
     * Find zero or one StreamDelivery that matches the filter.
     * @param {StreamDeliveryFindUniqueArgs} args - Arguments to find a StreamDelivery
     * @example
     * // Get one StreamDelivery
     * const streamDelivery = await prisma.streamDelivery.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StreamDeliveryFindUniqueArgs>(args: SelectSubset<T, StreamDeliveryFindUniqueArgs<ExtArgs>>): Prisma__StreamDeliveryClient<$Result.GetResult<Prisma.$StreamDeliveryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StreamDelivery that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StreamDeliveryFindUniqueOrThrowArgs} args - Arguments to find a StreamDelivery
     * @example
     * // Get one StreamDelivery
     * const streamDelivery = await prisma.streamDelivery.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StreamDeliveryFindUniqueOrThrowArgs>(args: SelectSubset<T, StreamDeliveryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StreamDeliveryClient<$Result.GetResult<Prisma.$StreamDeliveryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StreamDelivery that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamDeliveryFindFirstArgs} args - Arguments to find a StreamDelivery
     * @example
     * // Get one StreamDelivery
     * const streamDelivery = await prisma.streamDelivery.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StreamDeliveryFindFirstArgs>(args?: SelectSubset<T, StreamDeliveryFindFirstArgs<ExtArgs>>): Prisma__StreamDeliveryClient<$Result.GetResult<Prisma.$StreamDeliveryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StreamDelivery that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamDeliveryFindFirstOrThrowArgs} args - Arguments to find a StreamDelivery
     * @example
     * // Get one StreamDelivery
     * const streamDelivery = await prisma.streamDelivery.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StreamDeliveryFindFirstOrThrowArgs>(args?: SelectSubset<T, StreamDeliveryFindFirstOrThrowArgs<ExtArgs>>): Prisma__StreamDeliveryClient<$Result.GetResult<Prisma.$StreamDeliveryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StreamDeliveries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamDeliveryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StreamDeliveries
     * const streamDeliveries = await prisma.streamDelivery.findMany()
     * 
     * // Get first 10 StreamDeliveries
     * const streamDeliveries = await prisma.streamDelivery.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const streamDeliveryWithIdOnly = await prisma.streamDelivery.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StreamDeliveryFindManyArgs>(args?: SelectSubset<T, StreamDeliveryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamDeliveryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StreamDelivery.
     * @param {StreamDeliveryCreateArgs} args - Arguments to create a StreamDelivery.
     * @example
     * // Create one StreamDelivery
     * const StreamDelivery = await prisma.streamDelivery.create({
     *   data: {
     *     // ... data to create a StreamDelivery
     *   }
     * })
     * 
     */
    create<T extends StreamDeliveryCreateArgs>(args: SelectSubset<T, StreamDeliveryCreateArgs<ExtArgs>>): Prisma__StreamDeliveryClient<$Result.GetResult<Prisma.$StreamDeliveryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StreamDeliveries.
     * @param {StreamDeliveryCreateManyArgs} args - Arguments to create many StreamDeliveries.
     * @example
     * // Create many StreamDeliveries
     * const streamDelivery = await prisma.streamDelivery.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StreamDeliveryCreateManyArgs>(args?: SelectSubset<T, StreamDeliveryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StreamDeliveries and returns the data saved in the database.
     * @param {StreamDeliveryCreateManyAndReturnArgs} args - Arguments to create many StreamDeliveries.
     * @example
     * // Create many StreamDeliveries
     * const streamDelivery = await prisma.streamDelivery.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StreamDeliveries and only return the `id`
     * const streamDeliveryWithIdOnly = await prisma.streamDelivery.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StreamDeliveryCreateManyAndReturnArgs>(args?: SelectSubset<T, StreamDeliveryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamDeliveryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a StreamDelivery.
     * @param {StreamDeliveryDeleteArgs} args - Arguments to delete one StreamDelivery.
     * @example
     * // Delete one StreamDelivery
     * const StreamDelivery = await prisma.streamDelivery.delete({
     *   where: {
     *     // ... filter to delete one StreamDelivery
     *   }
     * })
     * 
     */
    delete<T extends StreamDeliveryDeleteArgs>(args: SelectSubset<T, StreamDeliveryDeleteArgs<ExtArgs>>): Prisma__StreamDeliveryClient<$Result.GetResult<Prisma.$StreamDeliveryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StreamDelivery.
     * @param {StreamDeliveryUpdateArgs} args - Arguments to update one StreamDelivery.
     * @example
     * // Update one StreamDelivery
     * const streamDelivery = await prisma.streamDelivery.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StreamDeliveryUpdateArgs>(args: SelectSubset<T, StreamDeliveryUpdateArgs<ExtArgs>>): Prisma__StreamDeliveryClient<$Result.GetResult<Prisma.$StreamDeliveryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StreamDeliveries.
     * @param {StreamDeliveryDeleteManyArgs} args - Arguments to filter StreamDeliveries to delete.
     * @example
     * // Delete a few StreamDeliveries
     * const { count } = await prisma.streamDelivery.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StreamDeliveryDeleteManyArgs>(args?: SelectSubset<T, StreamDeliveryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StreamDeliveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamDeliveryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StreamDeliveries
     * const streamDelivery = await prisma.streamDelivery.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StreamDeliveryUpdateManyArgs>(args: SelectSubset<T, StreamDeliveryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StreamDelivery.
     * @param {StreamDeliveryUpsertArgs} args - Arguments to update or create a StreamDelivery.
     * @example
     * // Update or create a StreamDelivery
     * const streamDelivery = await prisma.streamDelivery.upsert({
     *   create: {
     *     // ... data to create a StreamDelivery
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StreamDelivery we want to update
     *   }
     * })
     */
    upsert<T extends StreamDeliveryUpsertArgs>(args: SelectSubset<T, StreamDeliveryUpsertArgs<ExtArgs>>): Prisma__StreamDeliveryClient<$Result.GetResult<Prisma.$StreamDeliveryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StreamDeliveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamDeliveryCountArgs} args - Arguments to filter StreamDeliveries to count.
     * @example
     * // Count the number of StreamDeliveries
     * const count = await prisma.streamDelivery.count({
     *   where: {
     *     // ... the filter for the StreamDeliveries we want to count
     *   }
     * })
    **/
    count<T extends StreamDeliveryCountArgs>(
      args?: Subset<T, StreamDeliveryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StreamDeliveryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StreamDelivery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamDeliveryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StreamDeliveryAggregateArgs>(args: Subset<T, StreamDeliveryAggregateArgs>): Prisma.PrismaPromise<GetStreamDeliveryAggregateType<T>>

    /**
     * Group by StreamDelivery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamDeliveryGroupByArgs} args - Group by arguments.
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
      T extends StreamDeliveryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StreamDeliveryGroupByArgs['orderBy'] }
        : { orderBy?: StreamDeliveryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StreamDeliveryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStreamDeliveryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StreamDelivery model
   */
  readonly fields: StreamDeliveryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StreamDelivery.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StreamDeliveryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stream<T extends StreamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StreamDefaultArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the StreamDelivery model
   */ 
  interface StreamDeliveryFieldRefs {
    readonly id: FieldRef<"StreamDelivery", 'String'>
    readonly streamId: FieldRef<"StreamDelivery", 'String'>
    readonly subject: FieldRef<"StreamDelivery", 'String'>
    readonly eventId: FieldRef<"StreamDelivery", 'String'>
    readonly payload: FieldRef<"StreamDelivery", 'Json'>
    readonly attempts: FieldRef<"StreamDelivery", 'Int'>
    readonly status: FieldRef<"StreamDelivery", 'StreamDeliveryStatus'>
    readonly lastStatusCode: FieldRef<"StreamDelivery", 'Int'>
    readonly lastResponseExcerpt: FieldRef<"StreamDelivery", 'String'>
    readonly lastLatencyMs: FieldRef<"StreamDelivery", 'Int'>
    readonly lastError: FieldRef<"StreamDelivery", 'String'>
    readonly nextAttemptAt: FieldRef<"StreamDelivery", 'DateTime'>
    readonly succeededAt: FieldRef<"StreamDelivery", 'DateTime'>
    readonly createdAt: FieldRef<"StreamDelivery", 'DateTime'>
    readonly updatedAt: FieldRef<"StreamDelivery", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StreamDelivery findUnique
   */
  export type StreamDeliveryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDelivery
     */
    select?: StreamDeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamDeliveryInclude<ExtArgs> | null
    /**
     * Filter, which StreamDelivery to fetch.
     */
    where: StreamDeliveryWhereUniqueInput
  }

  /**
   * StreamDelivery findUniqueOrThrow
   */
  export type StreamDeliveryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDelivery
     */
    select?: StreamDeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamDeliveryInclude<ExtArgs> | null
    /**
     * Filter, which StreamDelivery to fetch.
     */
    where: StreamDeliveryWhereUniqueInput
  }

  /**
   * StreamDelivery findFirst
   */
  export type StreamDeliveryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDelivery
     */
    select?: StreamDeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamDeliveryInclude<ExtArgs> | null
    /**
     * Filter, which StreamDelivery to fetch.
     */
    where?: StreamDeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StreamDeliveries to fetch.
     */
    orderBy?: StreamDeliveryOrderByWithRelationInput | StreamDeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StreamDeliveries.
     */
    cursor?: StreamDeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StreamDeliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StreamDeliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StreamDeliveries.
     */
    distinct?: StreamDeliveryScalarFieldEnum | StreamDeliveryScalarFieldEnum[]
  }

  /**
   * StreamDelivery findFirstOrThrow
   */
  export type StreamDeliveryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDelivery
     */
    select?: StreamDeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamDeliveryInclude<ExtArgs> | null
    /**
     * Filter, which StreamDelivery to fetch.
     */
    where?: StreamDeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StreamDeliveries to fetch.
     */
    orderBy?: StreamDeliveryOrderByWithRelationInput | StreamDeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StreamDeliveries.
     */
    cursor?: StreamDeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StreamDeliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StreamDeliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StreamDeliveries.
     */
    distinct?: StreamDeliveryScalarFieldEnum | StreamDeliveryScalarFieldEnum[]
  }

  /**
   * StreamDelivery findMany
   */
  export type StreamDeliveryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDelivery
     */
    select?: StreamDeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamDeliveryInclude<ExtArgs> | null
    /**
     * Filter, which StreamDeliveries to fetch.
     */
    where?: StreamDeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StreamDeliveries to fetch.
     */
    orderBy?: StreamDeliveryOrderByWithRelationInput | StreamDeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StreamDeliveries.
     */
    cursor?: StreamDeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StreamDeliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StreamDeliveries.
     */
    skip?: number
    distinct?: StreamDeliveryScalarFieldEnum | StreamDeliveryScalarFieldEnum[]
  }

  /**
   * StreamDelivery create
   */
  export type StreamDeliveryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDelivery
     */
    select?: StreamDeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamDeliveryInclude<ExtArgs> | null
    /**
     * The data needed to create a StreamDelivery.
     */
    data: XOR<StreamDeliveryCreateInput, StreamDeliveryUncheckedCreateInput>
  }

  /**
   * StreamDelivery createMany
   */
  export type StreamDeliveryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StreamDeliveries.
     */
    data: StreamDeliveryCreateManyInput | StreamDeliveryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StreamDelivery createManyAndReturn
   */
  export type StreamDeliveryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDelivery
     */
    select?: StreamDeliverySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many StreamDeliveries.
     */
    data: StreamDeliveryCreateManyInput | StreamDeliveryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamDeliveryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StreamDelivery update
   */
  export type StreamDeliveryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDelivery
     */
    select?: StreamDeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamDeliveryInclude<ExtArgs> | null
    /**
     * The data needed to update a StreamDelivery.
     */
    data: XOR<StreamDeliveryUpdateInput, StreamDeliveryUncheckedUpdateInput>
    /**
     * Choose, which StreamDelivery to update.
     */
    where: StreamDeliveryWhereUniqueInput
  }

  /**
   * StreamDelivery updateMany
   */
  export type StreamDeliveryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StreamDeliveries.
     */
    data: XOR<StreamDeliveryUpdateManyMutationInput, StreamDeliveryUncheckedUpdateManyInput>
    /**
     * Filter which StreamDeliveries to update
     */
    where?: StreamDeliveryWhereInput
  }

  /**
   * StreamDelivery upsert
   */
  export type StreamDeliveryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDelivery
     */
    select?: StreamDeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamDeliveryInclude<ExtArgs> | null
    /**
     * The filter to search for the StreamDelivery to update in case it exists.
     */
    where: StreamDeliveryWhereUniqueInput
    /**
     * In case the StreamDelivery found by the `where` argument doesn't exist, create a new StreamDelivery with this data.
     */
    create: XOR<StreamDeliveryCreateInput, StreamDeliveryUncheckedCreateInput>
    /**
     * In case the StreamDelivery was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StreamDeliveryUpdateInput, StreamDeliveryUncheckedUpdateInput>
  }

  /**
   * StreamDelivery delete
   */
  export type StreamDeliveryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDelivery
     */
    select?: StreamDeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamDeliveryInclude<ExtArgs> | null
    /**
     * Filter which StreamDelivery to delete.
     */
    where: StreamDeliveryWhereUniqueInput
  }

  /**
   * StreamDelivery deleteMany
   */
  export type StreamDeliveryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StreamDeliveries to delete
     */
    where?: StreamDeliveryWhereInput
  }

  /**
   * StreamDelivery without action
   */
  export type StreamDeliveryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDelivery
     */
    select?: StreamDeliverySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamDeliveryInclude<ExtArgs> | null
  }


  /**
   * Model StreamDeadLetter
   */

  export type AggregateStreamDeadLetter = {
    _count: StreamDeadLetterCountAggregateOutputType | null
    _avg: StreamDeadLetterAvgAggregateOutputType | null
    _sum: StreamDeadLetterSumAggregateOutputType | null
    _min: StreamDeadLetterMinAggregateOutputType | null
    _max: StreamDeadLetterMaxAggregateOutputType | null
  }

  export type StreamDeadLetterAvgAggregateOutputType = {
    attempts: number | null
    lastStatusCode: number | null
  }

  export type StreamDeadLetterSumAggregateOutputType = {
    attempts: number | null
    lastStatusCode: number | null
  }

  export type StreamDeadLetterMinAggregateOutputType = {
    id: string | null
    deliveryId: string | null
    streamId: string | null
    subject: string | null
    eventId: string | null
    attempts: number | null
    lastStatusCode: number | null
    lastError: string | null
    createdAt: Date | null
  }

  export type StreamDeadLetterMaxAggregateOutputType = {
    id: string | null
    deliveryId: string | null
    streamId: string | null
    subject: string | null
    eventId: string | null
    attempts: number | null
    lastStatusCode: number | null
    lastError: string | null
    createdAt: Date | null
  }

  export type StreamDeadLetterCountAggregateOutputType = {
    id: number
    deliveryId: number
    streamId: number
    subject: number
    eventId: number
    payload: number
    attempts: number
    lastStatusCode: number
    lastError: number
    createdAt: number
    _all: number
  }


  export type StreamDeadLetterAvgAggregateInputType = {
    attempts?: true
    lastStatusCode?: true
  }

  export type StreamDeadLetterSumAggregateInputType = {
    attempts?: true
    lastStatusCode?: true
  }

  export type StreamDeadLetterMinAggregateInputType = {
    id?: true
    deliveryId?: true
    streamId?: true
    subject?: true
    eventId?: true
    attempts?: true
    lastStatusCode?: true
    lastError?: true
    createdAt?: true
  }

  export type StreamDeadLetterMaxAggregateInputType = {
    id?: true
    deliveryId?: true
    streamId?: true
    subject?: true
    eventId?: true
    attempts?: true
    lastStatusCode?: true
    lastError?: true
    createdAt?: true
  }

  export type StreamDeadLetterCountAggregateInputType = {
    id?: true
    deliveryId?: true
    streamId?: true
    subject?: true
    eventId?: true
    payload?: true
    attempts?: true
    lastStatusCode?: true
    lastError?: true
    createdAt?: true
    _all?: true
  }

  export type StreamDeadLetterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StreamDeadLetter to aggregate.
     */
    where?: StreamDeadLetterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StreamDeadLetters to fetch.
     */
    orderBy?: StreamDeadLetterOrderByWithRelationInput | StreamDeadLetterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StreamDeadLetterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StreamDeadLetters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StreamDeadLetters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StreamDeadLetters
    **/
    _count?: true | StreamDeadLetterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StreamDeadLetterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StreamDeadLetterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StreamDeadLetterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StreamDeadLetterMaxAggregateInputType
  }

  export type GetStreamDeadLetterAggregateType<T extends StreamDeadLetterAggregateArgs> = {
        [P in keyof T & keyof AggregateStreamDeadLetter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStreamDeadLetter[P]>
      : GetScalarType<T[P], AggregateStreamDeadLetter[P]>
  }




  export type StreamDeadLetterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamDeadLetterWhereInput
    orderBy?: StreamDeadLetterOrderByWithAggregationInput | StreamDeadLetterOrderByWithAggregationInput[]
    by: StreamDeadLetterScalarFieldEnum[] | StreamDeadLetterScalarFieldEnum
    having?: StreamDeadLetterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StreamDeadLetterCountAggregateInputType | true
    _avg?: StreamDeadLetterAvgAggregateInputType
    _sum?: StreamDeadLetterSumAggregateInputType
    _min?: StreamDeadLetterMinAggregateInputType
    _max?: StreamDeadLetterMaxAggregateInputType
  }

  export type StreamDeadLetterGroupByOutputType = {
    id: string
    deliveryId: string
    streamId: string
    subject: string
    eventId: string
    payload: JsonValue
    attempts: number
    lastStatusCode: number | null
    lastError: string | null
    createdAt: Date
    _count: StreamDeadLetterCountAggregateOutputType | null
    _avg: StreamDeadLetterAvgAggregateOutputType | null
    _sum: StreamDeadLetterSumAggregateOutputType | null
    _min: StreamDeadLetterMinAggregateOutputType | null
    _max: StreamDeadLetterMaxAggregateOutputType | null
  }

  type GetStreamDeadLetterGroupByPayload<T extends StreamDeadLetterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StreamDeadLetterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StreamDeadLetterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StreamDeadLetterGroupByOutputType[P]>
            : GetScalarType<T[P], StreamDeadLetterGroupByOutputType[P]>
        }
      >
    >


  export type StreamDeadLetterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deliveryId?: boolean
    streamId?: boolean
    subject?: boolean
    eventId?: boolean
    payload?: boolean
    attempts?: boolean
    lastStatusCode?: boolean
    lastError?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["streamDeadLetter"]>

  export type StreamDeadLetterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deliveryId?: boolean
    streamId?: boolean
    subject?: boolean
    eventId?: boolean
    payload?: boolean
    attempts?: boolean
    lastStatusCode?: boolean
    lastError?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["streamDeadLetter"]>

  export type StreamDeadLetterSelectScalar = {
    id?: boolean
    deliveryId?: boolean
    streamId?: boolean
    subject?: boolean
    eventId?: boolean
    payload?: boolean
    attempts?: boolean
    lastStatusCode?: boolean
    lastError?: boolean
    createdAt?: boolean
  }


  export type $StreamDeadLetterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StreamDeadLetter"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      deliveryId: string
      streamId: string
      subject: string
      eventId: string
      payload: Prisma.JsonValue
      attempts: number
      lastStatusCode: number | null
      lastError: string | null
      createdAt: Date
    }, ExtArgs["result"]["streamDeadLetter"]>
    composites: {}
  }

  type StreamDeadLetterGetPayload<S extends boolean | null | undefined | StreamDeadLetterDefaultArgs> = $Result.GetResult<Prisma.$StreamDeadLetterPayload, S>

  type StreamDeadLetterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StreamDeadLetterFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StreamDeadLetterCountAggregateInputType | true
    }

  export interface StreamDeadLetterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StreamDeadLetter'], meta: { name: 'StreamDeadLetter' } }
    /**
     * Find zero or one StreamDeadLetter that matches the filter.
     * @param {StreamDeadLetterFindUniqueArgs} args - Arguments to find a StreamDeadLetter
     * @example
     * // Get one StreamDeadLetter
     * const streamDeadLetter = await prisma.streamDeadLetter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StreamDeadLetterFindUniqueArgs>(args: SelectSubset<T, StreamDeadLetterFindUniqueArgs<ExtArgs>>): Prisma__StreamDeadLetterClient<$Result.GetResult<Prisma.$StreamDeadLetterPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StreamDeadLetter that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StreamDeadLetterFindUniqueOrThrowArgs} args - Arguments to find a StreamDeadLetter
     * @example
     * // Get one StreamDeadLetter
     * const streamDeadLetter = await prisma.streamDeadLetter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StreamDeadLetterFindUniqueOrThrowArgs>(args: SelectSubset<T, StreamDeadLetterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StreamDeadLetterClient<$Result.GetResult<Prisma.$StreamDeadLetterPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StreamDeadLetter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamDeadLetterFindFirstArgs} args - Arguments to find a StreamDeadLetter
     * @example
     * // Get one StreamDeadLetter
     * const streamDeadLetter = await prisma.streamDeadLetter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StreamDeadLetterFindFirstArgs>(args?: SelectSubset<T, StreamDeadLetterFindFirstArgs<ExtArgs>>): Prisma__StreamDeadLetterClient<$Result.GetResult<Prisma.$StreamDeadLetterPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StreamDeadLetter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamDeadLetterFindFirstOrThrowArgs} args - Arguments to find a StreamDeadLetter
     * @example
     * // Get one StreamDeadLetter
     * const streamDeadLetter = await prisma.streamDeadLetter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StreamDeadLetterFindFirstOrThrowArgs>(args?: SelectSubset<T, StreamDeadLetterFindFirstOrThrowArgs<ExtArgs>>): Prisma__StreamDeadLetterClient<$Result.GetResult<Prisma.$StreamDeadLetterPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StreamDeadLetters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamDeadLetterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StreamDeadLetters
     * const streamDeadLetters = await prisma.streamDeadLetter.findMany()
     * 
     * // Get first 10 StreamDeadLetters
     * const streamDeadLetters = await prisma.streamDeadLetter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const streamDeadLetterWithIdOnly = await prisma.streamDeadLetter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StreamDeadLetterFindManyArgs>(args?: SelectSubset<T, StreamDeadLetterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamDeadLetterPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StreamDeadLetter.
     * @param {StreamDeadLetterCreateArgs} args - Arguments to create a StreamDeadLetter.
     * @example
     * // Create one StreamDeadLetter
     * const StreamDeadLetter = await prisma.streamDeadLetter.create({
     *   data: {
     *     // ... data to create a StreamDeadLetter
     *   }
     * })
     * 
     */
    create<T extends StreamDeadLetterCreateArgs>(args: SelectSubset<T, StreamDeadLetterCreateArgs<ExtArgs>>): Prisma__StreamDeadLetterClient<$Result.GetResult<Prisma.$StreamDeadLetterPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StreamDeadLetters.
     * @param {StreamDeadLetterCreateManyArgs} args - Arguments to create many StreamDeadLetters.
     * @example
     * // Create many StreamDeadLetters
     * const streamDeadLetter = await prisma.streamDeadLetter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StreamDeadLetterCreateManyArgs>(args?: SelectSubset<T, StreamDeadLetterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StreamDeadLetters and returns the data saved in the database.
     * @param {StreamDeadLetterCreateManyAndReturnArgs} args - Arguments to create many StreamDeadLetters.
     * @example
     * // Create many StreamDeadLetters
     * const streamDeadLetter = await prisma.streamDeadLetter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StreamDeadLetters and only return the `id`
     * const streamDeadLetterWithIdOnly = await prisma.streamDeadLetter.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StreamDeadLetterCreateManyAndReturnArgs>(args?: SelectSubset<T, StreamDeadLetterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamDeadLetterPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a StreamDeadLetter.
     * @param {StreamDeadLetterDeleteArgs} args - Arguments to delete one StreamDeadLetter.
     * @example
     * // Delete one StreamDeadLetter
     * const StreamDeadLetter = await prisma.streamDeadLetter.delete({
     *   where: {
     *     // ... filter to delete one StreamDeadLetter
     *   }
     * })
     * 
     */
    delete<T extends StreamDeadLetterDeleteArgs>(args: SelectSubset<T, StreamDeadLetterDeleteArgs<ExtArgs>>): Prisma__StreamDeadLetterClient<$Result.GetResult<Prisma.$StreamDeadLetterPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StreamDeadLetter.
     * @param {StreamDeadLetterUpdateArgs} args - Arguments to update one StreamDeadLetter.
     * @example
     * // Update one StreamDeadLetter
     * const streamDeadLetter = await prisma.streamDeadLetter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StreamDeadLetterUpdateArgs>(args: SelectSubset<T, StreamDeadLetterUpdateArgs<ExtArgs>>): Prisma__StreamDeadLetterClient<$Result.GetResult<Prisma.$StreamDeadLetterPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StreamDeadLetters.
     * @param {StreamDeadLetterDeleteManyArgs} args - Arguments to filter StreamDeadLetters to delete.
     * @example
     * // Delete a few StreamDeadLetters
     * const { count } = await prisma.streamDeadLetter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StreamDeadLetterDeleteManyArgs>(args?: SelectSubset<T, StreamDeadLetterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StreamDeadLetters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamDeadLetterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StreamDeadLetters
     * const streamDeadLetter = await prisma.streamDeadLetter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StreamDeadLetterUpdateManyArgs>(args: SelectSubset<T, StreamDeadLetterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StreamDeadLetter.
     * @param {StreamDeadLetterUpsertArgs} args - Arguments to update or create a StreamDeadLetter.
     * @example
     * // Update or create a StreamDeadLetter
     * const streamDeadLetter = await prisma.streamDeadLetter.upsert({
     *   create: {
     *     // ... data to create a StreamDeadLetter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StreamDeadLetter we want to update
     *   }
     * })
     */
    upsert<T extends StreamDeadLetterUpsertArgs>(args: SelectSubset<T, StreamDeadLetterUpsertArgs<ExtArgs>>): Prisma__StreamDeadLetterClient<$Result.GetResult<Prisma.$StreamDeadLetterPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StreamDeadLetters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamDeadLetterCountArgs} args - Arguments to filter StreamDeadLetters to count.
     * @example
     * // Count the number of StreamDeadLetters
     * const count = await prisma.streamDeadLetter.count({
     *   where: {
     *     // ... the filter for the StreamDeadLetters we want to count
     *   }
     * })
    **/
    count<T extends StreamDeadLetterCountArgs>(
      args?: Subset<T, StreamDeadLetterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StreamDeadLetterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StreamDeadLetter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamDeadLetterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StreamDeadLetterAggregateArgs>(args: Subset<T, StreamDeadLetterAggregateArgs>): Prisma.PrismaPromise<GetStreamDeadLetterAggregateType<T>>

    /**
     * Group by StreamDeadLetter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamDeadLetterGroupByArgs} args - Group by arguments.
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
      T extends StreamDeadLetterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StreamDeadLetterGroupByArgs['orderBy'] }
        : { orderBy?: StreamDeadLetterGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StreamDeadLetterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStreamDeadLetterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StreamDeadLetter model
   */
  readonly fields: StreamDeadLetterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StreamDeadLetter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StreamDeadLetterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the StreamDeadLetter model
   */ 
  interface StreamDeadLetterFieldRefs {
    readonly id: FieldRef<"StreamDeadLetter", 'String'>
    readonly deliveryId: FieldRef<"StreamDeadLetter", 'String'>
    readonly streamId: FieldRef<"StreamDeadLetter", 'String'>
    readonly subject: FieldRef<"StreamDeadLetter", 'String'>
    readonly eventId: FieldRef<"StreamDeadLetter", 'String'>
    readonly payload: FieldRef<"StreamDeadLetter", 'Json'>
    readonly attempts: FieldRef<"StreamDeadLetter", 'Int'>
    readonly lastStatusCode: FieldRef<"StreamDeadLetter", 'Int'>
    readonly lastError: FieldRef<"StreamDeadLetter", 'String'>
    readonly createdAt: FieldRef<"StreamDeadLetter", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StreamDeadLetter findUnique
   */
  export type StreamDeadLetterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDeadLetter
     */
    select?: StreamDeadLetterSelect<ExtArgs> | null
    /**
     * Filter, which StreamDeadLetter to fetch.
     */
    where: StreamDeadLetterWhereUniqueInput
  }

  /**
   * StreamDeadLetter findUniqueOrThrow
   */
  export type StreamDeadLetterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDeadLetter
     */
    select?: StreamDeadLetterSelect<ExtArgs> | null
    /**
     * Filter, which StreamDeadLetter to fetch.
     */
    where: StreamDeadLetterWhereUniqueInput
  }

  /**
   * StreamDeadLetter findFirst
   */
  export type StreamDeadLetterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDeadLetter
     */
    select?: StreamDeadLetterSelect<ExtArgs> | null
    /**
     * Filter, which StreamDeadLetter to fetch.
     */
    where?: StreamDeadLetterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StreamDeadLetters to fetch.
     */
    orderBy?: StreamDeadLetterOrderByWithRelationInput | StreamDeadLetterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StreamDeadLetters.
     */
    cursor?: StreamDeadLetterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StreamDeadLetters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StreamDeadLetters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StreamDeadLetters.
     */
    distinct?: StreamDeadLetterScalarFieldEnum | StreamDeadLetterScalarFieldEnum[]
  }

  /**
   * StreamDeadLetter findFirstOrThrow
   */
  export type StreamDeadLetterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDeadLetter
     */
    select?: StreamDeadLetterSelect<ExtArgs> | null
    /**
     * Filter, which StreamDeadLetter to fetch.
     */
    where?: StreamDeadLetterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StreamDeadLetters to fetch.
     */
    orderBy?: StreamDeadLetterOrderByWithRelationInput | StreamDeadLetterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StreamDeadLetters.
     */
    cursor?: StreamDeadLetterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StreamDeadLetters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StreamDeadLetters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StreamDeadLetters.
     */
    distinct?: StreamDeadLetterScalarFieldEnum | StreamDeadLetterScalarFieldEnum[]
  }

  /**
   * StreamDeadLetter findMany
   */
  export type StreamDeadLetterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDeadLetter
     */
    select?: StreamDeadLetterSelect<ExtArgs> | null
    /**
     * Filter, which StreamDeadLetters to fetch.
     */
    where?: StreamDeadLetterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StreamDeadLetters to fetch.
     */
    orderBy?: StreamDeadLetterOrderByWithRelationInput | StreamDeadLetterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StreamDeadLetters.
     */
    cursor?: StreamDeadLetterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StreamDeadLetters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StreamDeadLetters.
     */
    skip?: number
    distinct?: StreamDeadLetterScalarFieldEnum | StreamDeadLetterScalarFieldEnum[]
  }

  /**
   * StreamDeadLetter create
   */
  export type StreamDeadLetterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDeadLetter
     */
    select?: StreamDeadLetterSelect<ExtArgs> | null
    /**
     * The data needed to create a StreamDeadLetter.
     */
    data: XOR<StreamDeadLetterCreateInput, StreamDeadLetterUncheckedCreateInput>
  }

  /**
   * StreamDeadLetter createMany
   */
  export type StreamDeadLetterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StreamDeadLetters.
     */
    data: StreamDeadLetterCreateManyInput | StreamDeadLetterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StreamDeadLetter createManyAndReturn
   */
  export type StreamDeadLetterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDeadLetter
     */
    select?: StreamDeadLetterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many StreamDeadLetters.
     */
    data: StreamDeadLetterCreateManyInput | StreamDeadLetterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StreamDeadLetter update
   */
  export type StreamDeadLetterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDeadLetter
     */
    select?: StreamDeadLetterSelect<ExtArgs> | null
    /**
     * The data needed to update a StreamDeadLetter.
     */
    data: XOR<StreamDeadLetterUpdateInput, StreamDeadLetterUncheckedUpdateInput>
    /**
     * Choose, which StreamDeadLetter to update.
     */
    where: StreamDeadLetterWhereUniqueInput
  }

  /**
   * StreamDeadLetter updateMany
   */
  export type StreamDeadLetterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StreamDeadLetters.
     */
    data: XOR<StreamDeadLetterUpdateManyMutationInput, StreamDeadLetterUncheckedUpdateManyInput>
    /**
     * Filter which StreamDeadLetters to update
     */
    where?: StreamDeadLetterWhereInput
  }

  /**
   * StreamDeadLetter upsert
   */
  export type StreamDeadLetterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDeadLetter
     */
    select?: StreamDeadLetterSelect<ExtArgs> | null
    /**
     * The filter to search for the StreamDeadLetter to update in case it exists.
     */
    where: StreamDeadLetterWhereUniqueInput
    /**
     * In case the StreamDeadLetter found by the `where` argument doesn't exist, create a new StreamDeadLetter with this data.
     */
    create: XOR<StreamDeadLetterCreateInput, StreamDeadLetterUncheckedCreateInput>
    /**
     * In case the StreamDeadLetter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StreamDeadLetterUpdateInput, StreamDeadLetterUncheckedUpdateInput>
  }

  /**
   * StreamDeadLetter delete
   */
  export type StreamDeadLetterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDeadLetter
     */
    select?: StreamDeadLetterSelect<ExtArgs> | null
    /**
     * Filter which StreamDeadLetter to delete.
     */
    where: StreamDeadLetterWhereUniqueInput
  }

  /**
   * StreamDeadLetter deleteMany
   */
  export type StreamDeadLetterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StreamDeadLetters to delete
     */
    where?: StreamDeadLetterWhereInput
  }

  /**
   * StreamDeadLetter without action
   */
  export type StreamDeadLetterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StreamDeadLetter
     */
    select?: StreamDeadLetterSelect<ExtArgs> | null
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


  export const StreamScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    name: 'name',
    description: 'description',
    status: 'status',
    sink: 'sink',
    filter: 'filter',
    url: 'url',
    signingSecret: 'signingSecret',
    signingKeyId: 'signingKeyId',
    kafkaTopic: 'kafkaTopic',
    consecutiveFailures: 'consecutiveFailures',
    disabledAt: 'disabledAt',
    matchedTotal: 'matchedTotal',
    lastMatchedAt: 'lastMatchedAt',
    lastDeliveredAt: 'lastDeliveredAt',
    lastAttemptedAt: 'lastAttemptedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StreamScalarFieldEnum = (typeof StreamScalarFieldEnum)[keyof typeof StreamScalarFieldEnum]


  export const StreamDeliveryScalarFieldEnum: {
    id: 'id',
    streamId: 'streamId',
    subject: 'subject',
    eventId: 'eventId',
    payload: 'payload',
    attempts: 'attempts',
    status: 'status',
    lastStatusCode: 'lastStatusCode',
    lastResponseExcerpt: 'lastResponseExcerpt',
    lastLatencyMs: 'lastLatencyMs',
    lastError: 'lastError',
    nextAttemptAt: 'nextAttemptAt',
    succeededAt: 'succeededAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StreamDeliveryScalarFieldEnum = (typeof StreamDeliveryScalarFieldEnum)[keyof typeof StreamDeliveryScalarFieldEnum]


  export const StreamDeadLetterScalarFieldEnum: {
    id: 'id',
    deliveryId: 'deliveryId',
    streamId: 'streamId',
    subject: 'subject',
    eventId: 'eventId',
    payload: 'payload',
    attempts: 'attempts',
    lastStatusCode: 'lastStatusCode',
    lastError: 'lastError',
    createdAt: 'createdAt'
  };

  export type StreamDeadLetterScalarFieldEnum = (typeof StreamDeadLetterScalarFieldEnum)[keyof typeof StreamDeadLetterScalarFieldEnum]


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
   * Reference to a field of type 'StreamStatus'
   */
  export type EnumStreamStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StreamStatus'>
    


  /**
   * Reference to a field of type 'StreamStatus[]'
   */
  export type ListEnumStreamStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StreamStatus[]'>
    


  /**
   * Reference to a field of type 'StreamSink'
   */
  export type EnumStreamSinkFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StreamSink'>
    


  /**
   * Reference to a field of type 'StreamSink[]'
   */
  export type ListEnumStreamSinkFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StreamSink[]'>
    


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
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'StreamDeliveryStatus'
   */
  export type EnumStreamDeliveryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StreamDeliveryStatus'>
    


  /**
   * Reference to a field of type 'StreamDeliveryStatus[]'
   */
  export type ListEnumStreamDeliveryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StreamDeliveryStatus[]'>
    


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


  export type StreamWhereInput = {
    AND?: StreamWhereInput | StreamWhereInput[]
    OR?: StreamWhereInput[]
    NOT?: StreamWhereInput | StreamWhereInput[]
    id?: StringFilter<"Stream"> | string
    orgId?: StringFilter<"Stream"> | string
    name?: StringFilter<"Stream"> | string
    description?: StringNullableFilter<"Stream"> | string | null
    status?: EnumStreamStatusFilter<"Stream"> | $Enums.StreamStatus
    sink?: EnumStreamSinkFilter<"Stream"> | $Enums.StreamSink
    filter?: JsonFilter<"Stream">
    url?: StringNullableFilter<"Stream"> | string | null
    signingSecret?: StringFilter<"Stream"> | string
    signingKeyId?: StringFilter<"Stream"> | string
    kafkaTopic?: StringNullableFilter<"Stream"> | string | null
    consecutiveFailures?: IntFilter<"Stream"> | number
    disabledAt?: DateTimeNullableFilter<"Stream"> | Date | string | null
    matchedTotal?: BigIntFilter<"Stream"> | bigint | number
    lastMatchedAt?: DateTimeNullableFilter<"Stream"> | Date | string | null
    lastDeliveredAt?: DateTimeNullableFilter<"Stream"> | Date | string | null
    lastAttemptedAt?: DateTimeNullableFilter<"Stream"> | Date | string | null
    createdAt?: DateTimeFilter<"Stream"> | Date | string
    updatedAt?: DateTimeFilter<"Stream"> | Date | string
    deliveries?: StreamDeliveryListRelationFilter
  }

  export type StreamOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    sink?: SortOrder
    filter?: SortOrder
    url?: SortOrderInput | SortOrder
    signingSecret?: SortOrder
    signingKeyId?: SortOrder
    kafkaTopic?: SortOrderInput | SortOrder
    consecutiveFailures?: SortOrder
    disabledAt?: SortOrderInput | SortOrder
    matchedTotal?: SortOrder
    lastMatchedAt?: SortOrderInput | SortOrder
    lastDeliveredAt?: SortOrderInput | SortOrder
    lastAttemptedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deliveries?: StreamDeliveryOrderByRelationAggregateInput
  }

  export type StreamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StreamWhereInput | StreamWhereInput[]
    OR?: StreamWhereInput[]
    NOT?: StreamWhereInput | StreamWhereInput[]
    orgId?: StringFilter<"Stream"> | string
    name?: StringFilter<"Stream"> | string
    description?: StringNullableFilter<"Stream"> | string | null
    status?: EnumStreamStatusFilter<"Stream"> | $Enums.StreamStatus
    sink?: EnumStreamSinkFilter<"Stream"> | $Enums.StreamSink
    filter?: JsonFilter<"Stream">
    url?: StringNullableFilter<"Stream"> | string | null
    signingSecret?: StringFilter<"Stream"> | string
    signingKeyId?: StringFilter<"Stream"> | string
    kafkaTopic?: StringNullableFilter<"Stream"> | string | null
    consecutiveFailures?: IntFilter<"Stream"> | number
    disabledAt?: DateTimeNullableFilter<"Stream"> | Date | string | null
    matchedTotal?: BigIntFilter<"Stream"> | bigint | number
    lastMatchedAt?: DateTimeNullableFilter<"Stream"> | Date | string | null
    lastDeliveredAt?: DateTimeNullableFilter<"Stream"> | Date | string | null
    lastAttemptedAt?: DateTimeNullableFilter<"Stream"> | Date | string | null
    createdAt?: DateTimeFilter<"Stream"> | Date | string
    updatedAt?: DateTimeFilter<"Stream"> | Date | string
    deliveries?: StreamDeliveryListRelationFilter
  }, "id">

  export type StreamOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    sink?: SortOrder
    filter?: SortOrder
    url?: SortOrderInput | SortOrder
    signingSecret?: SortOrder
    signingKeyId?: SortOrder
    kafkaTopic?: SortOrderInput | SortOrder
    consecutiveFailures?: SortOrder
    disabledAt?: SortOrderInput | SortOrder
    matchedTotal?: SortOrder
    lastMatchedAt?: SortOrderInput | SortOrder
    lastDeliveredAt?: SortOrderInput | SortOrder
    lastAttemptedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StreamCountOrderByAggregateInput
    _avg?: StreamAvgOrderByAggregateInput
    _max?: StreamMaxOrderByAggregateInput
    _min?: StreamMinOrderByAggregateInput
    _sum?: StreamSumOrderByAggregateInput
  }

  export type StreamScalarWhereWithAggregatesInput = {
    AND?: StreamScalarWhereWithAggregatesInput | StreamScalarWhereWithAggregatesInput[]
    OR?: StreamScalarWhereWithAggregatesInput[]
    NOT?: StreamScalarWhereWithAggregatesInput | StreamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Stream"> | string
    orgId?: StringWithAggregatesFilter<"Stream"> | string
    name?: StringWithAggregatesFilter<"Stream"> | string
    description?: StringNullableWithAggregatesFilter<"Stream"> | string | null
    status?: EnumStreamStatusWithAggregatesFilter<"Stream"> | $Enums.StreamStatus
    sink?: EnumStreamSinkWithAggregatesFilter<"Stream"> | $Enums.StreamSink
    filter?: JsonWithAggregatesFilter<"Stream">
    url?: StringNullableWithAggregatesFilter<"Stream"> | string | null
    signingSecret?: StringWithAggregatesFilter<"Stream"> | string
    signingKeyId?: StringWithAggregatesFilter<"Stream"> | string
    kafkaTopic?: StringNullableWithAggregatesFilter<"Stream"> | string | null
    consecutiveFailures?: IntWithAggregatesFilter<"Stream"> | number
    disabledAt?: DateTimeNullableWithAggregatesFilter<"Stream"> | Date | string | null
    matchedTotal?: BigIntWithAggregatesFilter<"Stream"> | bigint | number
    lastMatchedAt?: DateTimeNullableWithAggregatesFilter<"Stream"> | Date | string | null
    lastDeliveredAt?: DateTimeNullableWithAggregatesFilter<"Stream"> | Date | string | null
    lastAttemptedAt?: DateTimeNullableWithAggregatesFilter<"Stream"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Stream"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Stream"> | Date | string
  }

  export type StreamDeliveryWhereInput = {
    AND?: StreamDeliveryWhereInput | StreamDeliveryWhereInput[]
    OR?: StreamDeliveryWhereInput[]
    NOT?: StreamDeliveryWhereInput | StreamDeliveryWhereInput[]
    id?: StringFilter<"StreamDelivery"> | string
    streamId?: StringFilter<"StreamDelivery"> | string
    subject?: StringFilter<"StreamDelivery"> | string
    eventId?: StringFilter<"StreamDelivery"> | string
    payload?: JsonFilter<"StreamDelivery">
    attempts?: IntFilter<"StreamDelivery"> | number
    status?: EnumStreamDeliveryStatusFilter<"StreamDelivery"> | $Enums.StreamDeliveryStatus
    lastStatusCode?: IntNullableFilter<"StreamDelivery"> | number | null
    lastResponseExcerpt?: StringNullableFilter<"StreamDelivery"> | string | null
    lastLatencyMs?: IntNullableFilter<"StreamDelivery"> | number | null
    lastError?: StringNullableFilter<"StreamDelivery"> | string | null
    nextAttemptAt?: DateTimeNullableFilter<"StreamDelivery"> | Date | string | null
    succeededAt?: DateTimeNullableFilter<"StreamDelivery"> | Date | string | null
    createdAt?: DateTimeFilter<"StreamDelivery"> | Date | string
    updatedAt?: DateTimeFilter<"StreamDelivery"> | Date | string
    stream?: XOR<StreamRelationFilter, StreamWhereInput>
  }

  export type StreamDeliveryOrderByWithRelationInput = {
    id?: SortOrder
    streamId?: SortOrder
    subject?: SortOrder
    eventId?: SortOrder
    payload?: SortOrder
    attempts?: SortOrder
    status?: SortOrder
    lastStatusCode?: SortOrderInput | SortOrder
    lastResponseExcerpt?: SortOrderInput | SortOrder
    lastLatencyMs?: SortOrderInput | SortOrder
    lastError?: SortOrderInput | SortOrder
    nextAttemptAt?: SortOrderInput | SortOrder
    succeededAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stream?: StreamOrderByWithRelationInput
  }

  export type StreamDeliveryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    streamId_eventId?: StreamDeliveryStreamIdEventIdCompoundUniqueInput
    AND?: StreamDeliveryWhereInput | StreamDeliveryWhereInput[]
    OR?: StreamDeliveryWhereInput[]
    NOT?: StreamDeliveryWhereInput | StreamDeliveryWhereInput[]
    streamId?: StringFilter<"StreamDelivery"> | string
    subject?: StringFilter<"StreamDelivery"> | string
    eventId?: StringFilter<"StreamDelivery"> | string
    payload?: JsonFilter<"StreamDelivery">
    attempts?: IntFilter<"StreamDelivery"> | number
    status?: EnumStreamDeliveryStatusFilter<"StreamDelivery"> | $Enums.StreamDeliveryStatus
    lastStatusCode?: IntNullableFilter<"StreamDelivery"> | number | null
    lastResponseExcerpt?: StringNullableFilter<"StreamDelivery"> | string | null
    lastLatencyMs?: IntNullableFilter<"StreamDelivery"> | number | null
    lastError?: StringNullableFilter<"StreamDelivery"> | string | null
    nextAttemptAt?: DateTimeNullableFilter<"StreamDelivery"> | Date | string | null
    succeededAt?: DateTimeNullableFilter<"StreamDelivery"> | Date | string | null
    createdAt?: DateTimeFilter<"StreamDelivery"> | Date | string
    updatedAt?: DateTimeFilter<"StreamDelivery"> | Date | string
    stream?: XOR<StreamRelationFilter, StreamWhereInput>
  }, "id" | "streamId_eventId">

  export type StreamDeliveryOrderByWithAggregationInput = {
    id?: SortOrder
    streamId?: SortOrder
    subject?: SortOrder
    eventId?: SortOrder
    payload?: SortOrder
    attempts?: SortOrder
    status?: SortOrder
    lastStatusCode?: SortOrderInput | SortOrder
    lastResponseExcerpt?: SortOrderInput | SortOrder
    lastLatencyMs?: SortOrderInput | SortOrder
    lastError?: SortOrderInput | SortOrder
    nextAttemptAt?: SortOrderInput | SortOrder
    succeededAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StreamDeliveryCountOrderByAggregateInput
    _avg?: StreamDeliveryAvgOrderByAggregateInput
    _max?: StreamDeliveryMaxOrderByAggregateInput
    _min?: StreamDeliveryMinOrderByAggregateInput
    _sum?: StreamDeliverySumOrderByAggregateInput
  }

  export type StreamDeliveryScalarWhereWithAggregatesInput = {
    AND?: StreamDeliveryScalarWhereWithAggregatesInput | StreamDeliveryScalarWhereWithAggregatesInput[]
    OR?: StreamDeliveryScalarWhereWithAggregatesInput[]
    NOT?: StreamDeliveryScalarWhereWithAggregatesInput | StreamDeliveryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StreamDelivery"> | string
    streamId?: StringWithAggregatesFilter<"StreamDelivery"> | string
    subject?: StringWithAggregatesFilter<"StreamDelivery"> | string
    eventId?: StringWithAggregatesFilter<"StreamDelivery"> | string
    payload?: JsonWithAggregatesFilter<"StreamDelivery">
    attempts?: IntWithAggregatesFilter<"StreamDelivery"> | number
    status?: EnumStreamDeliveryStatusWithAggregatesFilter<"StreamDelivery"> | $Enums.StreamDeliveryStatus
    lastStatusCode?: IntNullableWithAggregatesFilter<"StreamDelivery"> | number | null
    lastResponseExcerpt?: StringNullableWithAggregatesFilter<"StreamDelivery"> | string | null
    lastLatencyMs?: IntNullableWithAggregatesFilter<"StreamDelivery"> | number | null
    lastError?: StringNullableWithAggregatesFilter<"StreamDelivery"> | string | null
    nextAttemptAt?: DateTimeNullableWithAggregatesFilter<"StreamDelivery"> | Date | string | null
    succeededAt?: DateTimeNullableWithAggregatesFilter<"StreamDelivery"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StreamDelivery"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StreamDelivery"> | Date | string
  }

  export type StreamDeadLetterWhereInput = {
    AND?: StreamDeadLetterWhereInput | StreamDeadLetterWhereInput[]
    OR?: StreamDeadLetterWhereInput[]
    NOT?: StreamDeadLetterWhereInput | StreamDeadLetterWhereInput[]
    id?: StringFilter<"StreamDeadLetter"> | string
    deliveryId?: StringFilter<"StreamDeadLetter"> | string
    streamId?: StringFilter<"StreamDeadLetter"> | string
    subject?: StringFilter<"StreamDeadLetter"> | string
    eventId?: StringFilter<"StreamDeadLetter"> | string
    payload?: JsonFilter<"StreamDeadLetter">
    attempts?: IntFilter<"StreamDeadLetter"> | number
    lastStatusCode?: IntNullableFilter<"StreamDeadLetter"> | number | null
    lastError?: StringNullableFilter<"StreamDeadLetter"> | string | null
    createdAt?: DateTimeFilter<"StreamDeadLetter"> | Date | string
  }

  export type StreamDeadLetterOrderByWithRelationInput = {
    id?: SortOrder
    deliveryId?: SortOrder
    streamId?: SortOrder
    subject?: SortOrder
    eventId?: SortOrder
    payload?: SortOrder
    attempts?: SortOrder
    lastStatusCode?: SortOrderInput | SortOrder
    lastError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type StreamDeadLetterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    deliveryId?: string
    AND?: StreamDeadLetterWhereInput | StreamDeadLetterWhereInput[]
    OR?: StreamDeadLetterWhereInput[]
    NOT?: StreamDeadLetterWhereInput | StreamDeadLetterWhereInput[]
    streamId?: StringFilter<"StreamDeadLetter"> | string
    subject?: StringFilter<"StreamDeadLetter"> | string
    eventId?: StringFilter<"StreamDeadLetter"> | string
    payload?: JsonFilter<"StreamDeadLetter">
    attempts?: IntFilter<"StreamDeadLetter"> | number
    lastStatusCode?: IntNullableFilter<"StreamDeadLetter"> | number | null
    lastError?: StringNullableFilter<"StreamDeadLetter"> | string | null
    createdAt?: DateTimeFilter<"StreamDeadLetter"> | Date | string
  }, "id" | "deliveryId">

  export type StreamDeadLetterOrderByWithAggregationInput = {
    id?: SortOrder
    deliveryId?: SortOrder
    streamId?: SortOrder
    subject?: SortOrder
    eventId?: SortOrder
    payload?: SortOrder
    attempts?: SortOrder
    lastStatusCode?: SortOrderInput | SortOrder
    lastError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: StreamDeadLetterCountOrderByAggregateInput
    _avg?: StreamDeadLetterAvgOrderByAggregateInput
    _max?: StreamDeadLetterMaxOrderByAggregateInput
    _min?: StreamDeadLetterMinOrderByAggregateInput
    _sum?: StreamDeadLetterSumOrderByAggregateInput
  }

  export type StreamDeadLetterScalarWhereWithAggregatesInput = {
    AND?: StreamDeadLetterScalarWhereWithAggregatesInput | StreamDeadLetterScalarWhereWithAggregatesInput[]
    OR?: StreamDeadLetterScalarWhereWithAggregatesInput[]
    NOT?: StreamDeadLetterScalarWhereWithAggregatesInput | StreamDeadLetterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StreamDeadLetter"> | string
    deliveryId?: StringWithAggregatesFilter<"StreamDeadLetter"> | string
    streamId?: StringWithAggregatesFilter<"StreamDeadLetter"> | string
    subject?: StringWithAggregatesFilter<"StreamDeadLetter"> | string
    eventId?: StringWithAggregatesFilter<"StreamDeadLetter"> | string
    payload?: JsonWithAggregatesFilter<"StreamDeadLetter">
    attempts?: IntWithAggregatesFilter<"StreamDeadLetter"> | number
    lastStatusCode?: IntNullableWithAggregatesFilter<"StreamDeadLetter"> | number | null
    lastError?: StringNullableWithAggregatesFilter<"StreamDeadLetter"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StreamDeadLetter"> | Date | string
  }

  export type StreamCreateInput = {
    id: string
    orgId: string
    name: string
    description?: string | null
    status?: $Enums.StreamStatus
    sink?: $Enums.StreamSink
    filter?: JsonNullValueInput | InputJsonValue
    url?: string | null
    signingSecret: string
    signingKeyId: string
    kafkaTopic?: string | null
    consecutiveFailures?: number
    disabledAt?: Date | string | null
    matchedTotal?: bigint | number
    lastMatchedAt?: Date | string | null
    lastDeliveredAt?: Date | string | null
    lastAttemptedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: StreamDeliveryCreateNestedManyWithoutStreamInput
  }

  export type StreamUncheckedCreateInput = {
    id: string
    orgId: string
    name: string
    description?: string | null
    status?: $Enums.StreamStatus
    sink?: $Enums.StreamSink
    filter?: JsonNullValueInput | InputJsonValue
    url?: string | null
    signingSecret: string
    signingKeyId: string
    kafkaTopic?: string | null
    consecutiveFailures?: number
    disabledAt?: Date | string | null
    matchedTotal?: bigint | number
    lastMatchedAt?: Date | string | null
    lastDeliveredAt?: Date | string | null
    lastAttemptedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: StreamDeliveryUncheckedCreateNestedManyWithoutStreamInput
  }

  export type StreamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStreamStatusFieldUpdateOperationsInput | $Enums.StreamStatus
    sink?: EnumStreamSinkFieldUpdateOperationsInput | $Enums.StreamSink
    filter?: JsonNullValueInput | InputJsonValue
    url?: NullableStringFieldUpdateOperationsInput | string | null
    signingSecret?: StringFieldUpdateOperationsInput | string
    signingKeyId?: StringFieldUpdateOperationsInput | string
    kafkaTopic?: NullableStringFieldUpdateOperationsInput | string | null
    consecutiveFailures?: IntFieldUpdateOperationsInput | number
    disabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matchedTotal?: BigIntFieldUpdateOperationsInput | bigint | number
    lastMatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastDeliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAttemptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: StreamDeliveryUpdateManyWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStreamStatusFieldUpdateOperationsInput | $Enums.StreamStatus
    sink?: EnumStreamSinkFieldUpdateOperationsInput | $Enums.StreamSink
    filter?: JsonNullValueInput | InputJsonValue
    url?: NullableStringFieldUpdateOperationsInput | string | null
    signingSecret?: StringFieldUpdateOperationsInput | string
    signingKeyId?: StringFieldUpdateOperationsInput | string
    kafkaTopic?: NullableStringFieldUpdateOperationsInput | string | null
    consecutiveFailures?: IntFieldUpdateOperationsInput | number
    disabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matchedTotal?: BigIntFieldUpdateOperationsInput | bigint | number
    lastMatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastDeliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAttemptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: StreamDeliveryUncheckedUpdateManyWithoutStreamNestedInput
  }

  export type StreamCreateManyInput = {
    id: string
    orgId: string
    name: string
    description?: string | null
    status?: $Enums.StreamStatus
    sink?: $Enums.StreamSink
    filter?: JsonNullValueInput | InputJsonValue
    url?: string | null
    signingSecret: string
    signingKeyId: string
    kafkaTopic?: string | null
    consecutiveFailures?: number
    disabledAt?: Date | string | null
    matchedTotal?: bigint | number
    lastMatchedAt?: Date | string | null
    lastDeliveredAt?: Date | string | null
    lastAttemptedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StreamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStreamStatusFieldUpdateOperationsInput | $Enums.StreamStatus
    sink?: EnumStreamSinkFieldUpdateOperationsInput | $Enums.StreamSink
    filter?: JsonNullValueInput | InputJsonValue
    url?: NullableStringFieldUpdateOperationsInput | string | null
    signingSecret?: StringFieldUpdateOperationsInput | string
    signingKeyId?: StringFieldUpdateOperationsInput | string
    kafkaTopic?: NullableStringFieldUpdateOperationsInput | string | null
    consecutiveFailures?: IntFieldUpdateOperationsInput | number
    disabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matchedTotal?: BigIntFieldUpdateOperationsInput | bigint | number
    lastMatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastDeliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAttemptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStreamStatusFieldUpdateOperationsInput | $Enums.StreamStatus
    sink?: EnumStreamSinkFieldUpdateOperationsInput | $Enums.StreamSink
    filter?: JsonNullValueInput | InputJsonValue
    url?: NullableStringFieldUpdateOperationsInput | string | null
    signingSecret?: StringFieldUpdateOperationsInput | string
    signingKeyId?: StringFieldUpdateOperationsInput | string
    kafkaTopic?: NullableStringFieldUpdateOperationsInput | string | null
    consecutiveFailures?: IntFieldUpdateOperationsInput | number
    disabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matchedTotal?: BigIntFieldUpdateOperationsInput | bigint | number
    lastMatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastDeliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAttemptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamDeliveryCreateInput = {
    id: string
    subject: string
    eventId: string
    payload: JsonNullValueInput | InputJsonValue
    attempts?: number
    status?: $Enums.StreamDeliveryStatus
    lastStatusCode?: number | null
    lastResponseExcerpt?: string | null
    lastLatencyMs?: number | null
    lastError?: string | null
    nextAttemptAt?: Date | string | null
    succeededAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stream: StreamCreateNestedOneWithoutDeliveriesInput
  }

  export type StreamDeliveryUncheckedCreateInput = {
    id: string
    streamId: string
    subject: string
    eventId: string
    payload: JsonNullValueInput | InputJsonValue
    attempts?: number
    status?: $Enums.StreamDeliveryStatus
    lastStatusCode?: number | null
    lastResponseExcerpt?: string | null
    lastLatencyMs?: number | null
    lastError?: string | null
    nextAttemptAt?: Date | string | null
    succeededAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StreamDeliveryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    attempts?: IntFieldUpdateOperationsInput | number
    status?: EnumStreamDeliveryStatusFieldUpdateOperationsInput | $Enums.StreamDeliveryStatus
    lastStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    lastResponseExcerpt?: NullableStringFieldUpdateOperationsInput | string | null
    lastLatencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    nextAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stream?: StreamUpdateOneRequiredWithoutDeliveriesNestedInput
  }

  export type StreamDeliveryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    attempts?: IntFieldUpdateOperationsInput | number
    status?: EnumStreamDeliveryStatusFieldUpdateOperationsInput | $Enums.StreamDeliveryStatus
    lastStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    lastResponseExcerpt?: NullableStringFieldUpdateOperationsInput | string | null
    lastLatencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    nextAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamDeliveryCreateManyInput = {
    id: string
    streamId: string
    subject: string
    eventId: string
    payload: JsonNullValueInput | InputJsonValue
    attempts?: number
    status?: $Enums.StreamDeliveryStatus
    lastStatusCode?: number | null
    lastResponseExcerpt?: string | null
    lastLatencyMs?: number | null
    lastError?: string | null
    nextAttemptAt?: Date | string | null
    succeededAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StreamDeliveryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    attempts?: IntFieldUpdateOperationsInput | number
    status?: EnumStreamDeliveryStatusFieldUpdateOperationsInput | $Enums.StreamDeliveryStatus
    lastStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    lastResponseExcerpt?: NullableStringFieldUpdateOperationsInput | string | null
    lastLatencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    nextAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamDeliveryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    attempts?: IntFieldUpdateOperationsInput | number
    status?: EnumStreamDeliveryStatusFieldUpdateOperationsInput | $Enums.StreamDeliveryStatus
    lastStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    lastResponseExcerpt?: NullableStringFieldUpdateOperationsInput | string | null
    lastLatencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    nextAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamDeadLetterCreateInput = {
    id: string
    deliveryId: string
    streamId: string
    subject: string
    eventId: string
    payload: JsonNullValueInput | InputJsonValue
    attempts: number
    lastStatusCode?: number | null
    lastError?: string | null
    createdAt?: Date | string
  }

  export type StreamDeadLetterUncheckedCreateInput = {
    id: string
    deliveryId: string
    streamId: string
    subject: string
    eventId: string
    payload: JsonNullValueInput | InputJsonValue
    attempts: number
    lastStatusCode?: number | null
    lastError?: string | null
    createdAt?: Date | string
  }

  export type StreamDeadLetterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deliveryId?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    attempts?: IntFieldUpdateOperationsInput | number
    lastStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamDeadLetterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deliveryId?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    attempts?: IntFieldUpdateOperationsInput | number
    lastStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamDeadLetterCreateManyInput = {
    id: string
    deliveryId: string
    streamId: string
    subject: string
    eventId: string
    payload: JsonNullValueInput | InputJsonValue
    attempts: number
    lastStatusCode?: number | null
    lastError?: string | null
    createdAt?: Date | string
  }

  export type StreamDeadLetterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    deliveryId?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    attempts?: IntFieldUpdateOperationsInput | number
    lastStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamDeadLetterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    deliveryId?: StringFieldUpdateOperationsInput | string
    streamId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    attempts?: IntFieldUpdateOperationsInput | number
    lastStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type EnumStreamStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamStatus | EnumStreamStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StreamStatus[] | ListEnumStreamStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamStatus[] | ListEnumStreamStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamStatusFilter<$PrismaModel> | $Enums.StreamStatus
  }

  export type EnumStreamSinkFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamSink | EnumStreamSinkFieldRefInput<$PrismaModel>
    in?: $Enums.StreamSink[] | ListEnumStreamSinkFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamSink[] | ListEnumStreamSinkFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamSinkFilter<$PrismaModel> | $Enums.StreamSink
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

  export type StreamDeliveryListRelationFilter = {
    every?: StreamDeliveryWhereInput
    some?: StreamDeliveryWhereInput
    none?: StreamDeliveryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StreamDeliveryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StreamCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    sink?: SortOrder
    filter?: SortOrder
    url?: SortOrder
    signingSecret?: SortOrder
    signingKeyId?: SortOrder
    kafkaTopic?: SortOrder
    consecutiveFailures?: SortOrder
    disabledAt?: SortOrder
    matchedTotal?: SortOrder
    lastMatchedAt?: SortOrder
    lastDeliveredAt?: SortOrder
    lastAttemptedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StreamAvgOrderByAggregateInput = {
    consecutiveFailures?: SortOrder
    matchedTotal?: SortOrder
  }

  export type StreamMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    sink?: SortOrder
    url?: SortOrder
    signingSecret?: SortOrder
    signingKeyId?: SortOrder
    kafkaTopic?: SortOrder
    consecutiveFailures?: SortOrder
    disabledAt?: SortOrder
    matchedTotal?: SortOrder
    lastMatchedAt?: SortOrder
    lastDeliveredAt?: SortOrder
    lastAttemptedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StreamMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    status?: SortOrder
    sink?: SortOrder
    url?: SortOrder
    signingSecret?: SortOrder
    signingKeyId?: SortOrder
    kafkaTopic?: SortOrder
    consecutiveFailures?: SortOrder
    disabledAt?: SortOrder
    matchedTotal?: SortOrder
    lastMatchedAt?: SortOrder
    lastDeliveredAt?: SortOrder
    lastAttemptedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StreamSumOrderByAggregateInput = {
    consecutiveFailures?: SortOrder
    matchedTotal?: SortOrder
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

  export type EnumStreamStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamStatus | EnumStreamStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StreamStatus[] | ListEnumStreamStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamStatus[] | ListEnumStreamStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamStatusWithAggregatesFilter<$PrismaModel> | $Enums.StreamStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStreamStatusFilter<$PrismaModel>
    _max?: NestedEnumStreamStatusFilter<$PrismaModel>
  }

  export type EnumStreamSinkWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamSink | EnumStreamSinkFieldRefInput<$PrismaModel>
    in?: $Enums.StreamSink[] | ListEnumStreamSinkFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamSink[] | ListEnumStreamSinkFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamSinkWithAggregatesFilter<$PrismaModel> | $Enums.StreamSink
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStreamSinkFilter<$PrismaModel>
    _max?: NestedEnumStreamSinkFilter<$PrismaModel>
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

  export type EnumStreamDeliveryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamDeliveryStatus | EnumStreamDeliveryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StreamDeliveryStatus[] | ListEnumStreamDeliveryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamDeliveryStatus[] | ListEnumStreamDeliveryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamDeliveryStatusFilter<$PrismaModel> | $Enums.StreamDeliveryStatus
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

  export type StreamRelationFilter = {
    is?: StreamWhereInput
    isNot?: StreamWhereInput
  }

  export type StreamDeliveryStreamIdEventIdCompoundUniqueInput = {
    streamId: string
    eventId: string
  }

  export type StreamDeliveryCountOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    subject?: SortOrder
    eventId?: SortOrder
    payload?: SortOrder
    attempts?: SortOrder
    status?: SortOrder
    lastStatusCode?: SortOrder
    lastResponseExcerpt?: SortOrder
    lastLatencyMs?: SortOrder
    lastError?: SortOrder
    nextAttemptAt?: SortOrder
    succeededAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StreamDeliveryAvgOrderByAggregateInput = {
    attempts?: SortOrder
    lastStatusCode?: SortOrder
    lastLatencyMs?: SortOrder
  }

  export type StreamDeliveryMaxOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    subject?: SortOrder
    eventId?: SortOrder
    attempts?: SortOrder
    status?: SortOrder
    lastStatusCode?: SortOrder
    lastResponseExcerpt?: SortOrder
    lastLatencyMs?: SortOrder
    lastError?: SortOrder
    nextAttemptAt?: SortOrder
    succeededAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StreamDeliveryMinOrderByAggregateInput = {
    id?: SortOrder
    streamId?: SortOrder
    subject?: SortOrder
    eventId?: SortOrder
    attempts?: SortOrder
    status?: SortOrder
    lastStatusCode?: SortOrder
    lastResponseExcerpt?: SortOrder
    lastLatencyMs?: SortOrder
    lastError?: SortOrder
    nextAttemptAt?: SortOrder
    succeededAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StreamDeliverySumOrderByAggregateInput = {
    attempts?: SortOrder
    lastStatusCode?: SortOrder
    lastLatencyMs?: SortOrder
  }

  export type EnumStreamDeliveryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamDeliveryStatus | EnumStreamDeliveryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StreamDeliveryStatus[] | ListEnumStreamDeliveryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamDeliveryStatus[] | ListEnumStreamDeliveryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamDeliveryStatusWithAggregatesFilter<$PrismaModel> | $Enums.StreamDeliveryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStreamDeliveryStatusFilter<$PrismaModel>
    _max?: NestedEnumStreamDeliveryStatusFilter<$PrismaModel>
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

  export type StreamDeadLetterCountOrderByAggregateInput = {
    id?: SortOrder
    deliveryId?: SortOrder
    streamId?: SortOrder
    subject?: SortOrder
    eventId?: SortOrder
    payload?: SortOrder
    attempts?: SortOrder
    lastStatusCode?: SortOrder
    lastError?: SortOrder
    createdAt?: SortOrder
  }

  export type StreamDeadLetterAvgOrderByAggregateInput = {
    attempts?: SortOrder
    lastStatusCode?: SortOrder
  }

  export type StreamDeadLetterMaxOrderByAggregateInput = {
    id?: SortOrder
    deliveryId?: SortOrder
    streamId?: SortOrder
    subject?: SortOrder
    eventId?: SortOrder
    attempts?: SortOrder
    lastStatusCode?: SortOrder
    lastError?: SortOrder
    createdAt?: SortOrder
  }

  export type StreamDeadLetterMinOrderByAggregateInput = {
    id?: SortOrder
    deliveryId?: SortOrder
    streamId?: SortOrder
    subject?: SortOrder
    eventId?: SortOrder
    attempts?: SortOrder
    lastStatusCode?: SortOrder
    lastError?: SortOrder
    createdAt?: SortOrder
  }

  export type StreamDeadLetterSumOrderByAggregateInput = {
    attempts?: SortOrder
    lastStatusCode?: SortOrder
  }

  export type StreamDeliveryCreateNestedManyWithoutStreamInput = {
    create?: XOR<StreamDeliveryCreateWithoutStreamInput, StreamDeliveryUncheckedCreateWithoutStreamInput> | StreamDeliveryCreateWithoutStreamInput[] | StreamDeliveryUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: StreamDeliveryCreateOrConnectWithoutStreamInput | StreamDeliveryCreateOrConnectWithoutStreamInput[]
    createMany?: StreamDeliveryCreateManyStreamInputEnvelope
    connect?: StreamDeliveryWhereUniqueInput | StreamDeliveryWhereUniqueInput[]
  }

  export type StreamDeliveryUncheckedCreateNestedManyWithoutStreamInput = {
    create?: XOR<StreamDeliveryCreateWithoutStreamInput, StreamDeliveryUncheckedCreateWithoutStreamInput> | StreamDeliveryCreateWithoutStreamInput[] | StreamDeliveryUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: StreamDeliveryCreateOrConnectWithoutStreamInput | StreamDeliveryCreateOrConnectWithoutStreamInput[]
    createMany?: StreamDeliveryCreateManyStreamInputEnvelope
    connect?: StreamDeliveryWhereUniqueInput | StreamDeliveryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumStreamStatusFieldUpdateOperationsInput = {
    set?: $Enums.StreamStatus
  }

  export type EnumStreamSinkFieldUpdateOperationsInput = {
    set?: $Enums.StreamSink
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StreamDeliveryUpdateManyWithoutStreamNestedInput = {
    create?: XOR<StreamDeliveryCreateWithoutStreamInput, StreamDeliveryUncheckedCreateWithoutStreamInput> | StreamDeliveryCreateWithoutStreamInput[] | StreamDeliveryUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: StreamDeliveryCreateOrConnectWithoutStreamInput | StreamDeliveryCreateOrConnectWithoutStreamInput[]
    upsert?: StreamDeliveryUpsertWithWhereUniqueWithoutStreamInput | StreamDeliveryUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: StreamDeliveryCreateManyStreamInputEnvelope
    set?: StreamDeliveryWhereUniqueInput | StreamDeliveryWhereUniqueInput[]
    disconnect?: StreamDeliveryWhereUniqueInput | StreamDeliveryWhereUniqueInput[]
    delete?: StreamDeliveryWhereUniqueInput | StreamDeliveryWhereUniqueInput[]
    connect?: StreamDeliveryWhereUniqueInput | StreamDeliveryWhereUniqueInput[]
    update?: StreamDeliveryUpdateWithWhereUniqueWithoutStreamInput | StreamDeliveryUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: StreamDeliveryUpdateManyWithWhereWithoutStreamInput | StreamDeliveryUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: StreamDeliveryScalarWhereInput | StreamDeliveryScalarWhereInput[]
  }

  export type StreamDeliveryUncheckedUpdateManyWithoutStreamNestedInput = {
    create?: XOR<StreamDeliveryCreateWithoutStreamInput, StreamDeliveryUncheckedCreateWithoutStreamInput> | StreamDeliveryCreateWithoutStreamInput[] | StreamDeliveryUncheckedCreateWithoutStreamInput[]
    connectOrCreate?: StreamDeliveryCreateOrConnectWithoutStreamInput | StreamDeliveryCreateOrConnectWithoutStreamInput[]
    upsert?: StreamDeliveryUpsertWithWhereUniqueWithoutStreamInput | StreamDeliveryUpsertWithWhereUniqueWithoutStreamInput[]
    createMany?: StreamDeliveryCreateManyStreamInputEnvelope
    set?: StreamDeliveryWhereUniqueInput | StreamDeliveryWhereUniqueInput[]
    disconnect?: StreamDeliveryWhereUniqueInput | StreamDeliveryWhereUniqueInput[]
    delete?: StreamDeliveryWhereUniqueInput | StreamDeliveryWhereUniqueInput[]
    connect?: StreamDeliveryWhereUniqueInput | StreamDeliveryWhereUniqueInput[]
    update?: StreamDeliveryUpdateWithWhereUniqueWithoutStreamInput | StreamDeliveryUpdateWithWhereUniqueWithoutStreamInput[]
    updateMany?: StreamDeliveryUpdateManyWithWhereWithoutStreamInput | StreamDeliveryUpdateManyWithWhereWithoutStreamInput[]
    deleteMany?: StreamDeliveryScalarWhereInput | StreamDeliveryScalarWhereInput[]
  }

  export type StreamCreateNestedOneWithoutDeliveriesInput = {
    create?: XOR<StreamCreateWithoutDeliveriesInput, StreamUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: StreamCreateOrConnectWithoutDeliveriesInput
    connect?: StreamWhereUniqueInput
  }

  export type EnumStreamDeliveryStatusFieldUpdateOperationsInput = {
    set?: $Enums.StreamDeliveryStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StreamUpdateOneRequiredWithoutDeliveriesNestedInput = {
    create?: XOR<StreamCreateWithoutDeliveriesInput, StreamUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: StreamCreateOrConnectWithoutDeliveriesInput
    upsert?: StreamUpsertWithoutDeliveriesInput
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutDeliveriesInput, StreamUpdateWithoutDeliveriesInput>, StreamUncheckedUpdateWithoutDeliveriesInput>
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

  export type NestedEnumStreamStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamStatus | EnumStreamStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StreamStatus[] | ListEnumStreamStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamStatus[] | ListEnumStreamStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamStatusFilter<$PrismaModel> | $Enums.StreamStatus
  }

  export type NestedEnumStreamSinkFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamSink | EnumStreamSinkFieldRefInput<$PrismaModel>
    in?: $Enums.StreamSink[] | ListEnumStreamSinkFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamSink[] | ListEnumStreamSinkFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamSinkFilter<$PrismaModel> | $Enums.StreamSink
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

  export type NestedEnumStreamStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamStatus | EnumStreamStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StreamStatus[] | ListEnumStreamStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamStatus[] | ListEnumStreamStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamStatusWithAggregatesFilter<$PrismaModel> | $Enums.StreamStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStreamStatusFilter<$PrismaModel>
    _max?: NestedEnumStreamStatusFilter<$PrismaModel>
  }

  export type NestedEnumStreamSinkWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamSink | EnumStreamSinkFieldRefInput<$PrismaModel>
    in?: $Enums.StreamSink[] | ListEnumStreamSinkFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamSink[] | ListEnumStreamSinkFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamSinkWithAggregatesFilter<$PrismaModel> | $Enums.StreamSink
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStreamSinkFilter<$PrismaModel>
    _max?: NestedEnumStreamSinkFilter<$PrismaModel>
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

  export type NestedEnumStreamDeliveryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamDeliveryStatus | EnumStreamDeliveryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StreamDeliveryStatus[] | ListEnumStreamDeliveryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamDeliveryStatus[] | ListEnumStreamDeliveryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamDeliveryStatusFilter<$PrismaModel> | $Enums.StreamDeliveryStatus
  }

  export type NestedEnumStreamDeliveryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StreamDeliveryStatus | EnumStreamDeliveryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StreamDeliveryStatus[] | ListEnumStreamDeliveryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StreamDeliveryStatus[] | ListEnumStreamDeliveryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStreamDeliveryStatusWithAggregatesFilter<$PrismaModel> | $Enums.StreamDeliveryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStreamDeliveryStatusFilter<$PrismaModel>
    _max?: NestedEnumStreamDeliveryStatusFilter<$PrismaModel>
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

  export type StreamDeliveryCreateWithoutStreamInput = {
    id: string
    subject: string
    eventId: string
    payload: JsonNullValueInput | InputJsonValue
    attempts?: number
    status?: $Enums.StreamDeliveryStatus
    lastStatusCode?: number | null
    lastResponseExcerpt?: string | null
    lastLatencyMs?: number | null
    lastError?: string | null
    nextAttemptAt?: Date | string | null
    succeededAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StreamDeliveryUncheckedCreateWithoutStreamInput = {
    id: string
    subject: string
    eventId: string
    payload: JsonNullValueInput | InputJsonValue
    attempts?: number
    status?: $Enums.StreamDeliveryStatus
    lastStatusCode?: number | null
    lastResponseExcerpt?: string | null
    lastLatencyMs?: number | null
    lastError?: string | null
    nextAttemptAt?: Date | string | null
    succeededAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StreamDeliveryCreateOrConnectWithoutStreamInput = {
    where: StreamDeliveryWhereUniqueInput
    create: XOR<StreamDeliveryCreateWithoutStreamInput, StreamDeliveryUncheckedCreateWithoutStreamInput>
  }

  export type StreamDeliveryCreateManyStreamInputEnvelope = {
    data: StreamDeliveryCreateManyStreamInput | StreamDeliveryCreateManyStreamInput[]
    skipDuplicates?: boolean
  }

  export type StreamDeliveryUpsertWithWhereUniqueWithoutStreamInput = {
    where: StreamDeliveryWhereUniqueInput
    update: XOR<StreamDeliveryUpdateWithoutStreamInput, StreamDeliveryUncheckedUpdateWithoutStreamInput>
    create: XOR<StreamDeliveryCreateWithoutStreamInput, StreamDeliveryUncheckedCreateWithoutStreamInput>
  }

  export type StreamDeliveryUpdateWithWhereUniqueWithoutStreamInput = {
    where: StreamDeliveryWhereUniqueInput
    data: XOR<StreamDeliveryUpdateWithoutStreamInput, StreamDeliveryUncheckedUpdateWithoutStreamInput>
  }

  export type StreamDeliveryUpdateManyWithWhereWithoutStreamInput = {
    where: StreamDeliveryScalarWhereInput
    data: XOR<StreamDeliveryUpdateManyMutationInput, StreamDeliveryUncheckedUpdateManyWithoutStreamInput>
  }

  export type StreamDeliveryScalarWhereInput = {
    AND?: StreamDeliveryScalarWhereInput | StreamDeliveryScalarWhereInput[]
    OR?: StreamDeliveryScalarWhereInput[]
    NOT?: StreamDeliveryScalarWhereInput | StreamDeliveryScalarWhereInput[]
    id?: StringFilter<"StreamDelivery"> | string
    streamId?: StringFilter<"StreamDelivery"> | string
    subject?: StringFilter<"StreamDelivery"> | string
    eventId?: StringFilter<"StreamDelivery"> | string
    payload?: JsonFilter<"StreamDelivery">
    attempts?: IntFilter<"StreamDelivery"> | number
    status?: EnumStreamDeliveryStatusFilter<"StreamDelivery"> | $Enums.StreamDeliveryStatus
    lastStatusCode?: IntNullableFilter<"StreamDelivery"> | number | null
    lastResponseExcerpt?: StringNullableFilter<"StreamDelivery"> | string | null
    lastLatencyMs?: IntNullableFilter<"StreamDelivery"> | number | null
    lastError?: StringNullableFilter<"StreamDelivery"> | string | null
    nextAttemptAt?: DateTimeNullableFilter<"StreamDelivery"> | Date | string | null
    succeededAt?: DateTimeNullableFilter<"StreamDelivery"> | Date | string | null
    createdAt?: DateTimeFilter<"StreamDelivery"> | Date | string
    updatedAt?: DateTimeFilter<"StreamDelivery"> | Date | string
  }

  export type StreamCreateWithoutDeliveriesInput = {
    id: string
    orgId: string
    name: string
    description?: string | null
    status?: $Enums.StreamStatus
    sink?: $Enums.StreamSink
    filter?: JsonNullValueInput | InputJsonValue
    url?: string | null
    signingSecret: string
    signingKeyId: string
    kafkaTopic?: string | null
    consecutiveFailures?: number
    disabledAt?: Date | string | null
    matchedTotal?: bigint | number
    lastMatchedAt?: Date | string | null
    lastDeliveredAt?: Date | string | null
    lastAttemptedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StreamUncheckedCreateWithoutDeliveriesInput = {
    id: string
    orgId: string
    name: string
    description?: string | null
    status?: $Enums.StreamStatus
    sink?: $Enums.StreamSink
    filter?: JsonNullValueInput | InputJsonValue
    url?: string | null
    signingSecret: string
    signingKeyId: string
    kafkaTopic?: string | null
    consecutiveFailures?: number
    disabledAt?: Date | string | null
    matchedTotal?: bigint | number
    lastMatchedAt?: Date | string | null
    lastDeliveredAt?: Date | string | null
    lastAttemptedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StreamCreateOrConnectWithoutDeliveriesInput = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutDeliveriesInput, StreamUncheckedCreateWithoutDeliveriesInput>
  }

  export type StreamUpsertWithoutDeliveriesInput = {
    update: XOR<StreamUpdateWithoutDeliveriesInput, StreamUncheckedUpdateWithoutDeliveriesInput>
    create: XOR<StreamCreateWithoutDeliveriesInput, StreamUncheckedCreateWithoutDeliveriesInput>
    where?: StreamWhereInput
  }

  export type StreamUpdateToOneWithWhereWithoutDeliveriesInput = {
    where?: StreamWhereInput
    data: XOR<StreamUpdateWithoutDeliveriesInput, StreamUncheckedUpdateWithoutDeliveriesInput>
  }

  export type StreamUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStreamStatusFieldUpdateOperationsInput | $Enums.StreamStatus
    sink?: EnumStreamSinkFieldUpdateOperationsInput | $Enums.StreamSink
    filter?: JsonNullValueInput | InputJsonValue
    url?: NullableStringFieldUpdateOperationsInput | string | null
    signingSecret?: StringFieldUpdateOperationsInput | string
    signingKeyId?: StringFieldUpdateOperationsInput | string
    kafkaTopic?: NullableStringFieldUpdateOperationsInput | string | null
    consecutiveFailures?: IntFieldUpdateOperationsInput | number
    disabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matchedTotal?: BigIntFieldUpdateOperationsInput | bigint | number
    lastMatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastDeliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAttemptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamUncheckedUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStreamStatusFieldUpdateOperationsInput | $Enums.StreamStatus
    sink?: EnumStreamSinkFieldUpdateOperationsInput | $Enums.StreamSink
    filter?: JsonNullValueInput | InputJsonValue
    url?: NullableStringFieldUpdateOperationsInput | string | null
    signingSecret?: StringFieldUpdateOperationsInput | string
    signingKeyId?: StringFieldUpdateOperationsInput | string
    kafkaTopic?: NullableStringFieldUpdateOperationsInput | string | null
    consecutiveFailures?: IntFieldUpdateOperationsInput | number
    disabledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    matchedTotal?: BigIntFieldUpdateOperationsInput | bigint | number
    lastMatchedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastDeliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAttemptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamDeliveryCreateManyStreamInput = {
    id: string
    subject: string
    eventId: string
    payload: JsonNullValueInput | InputJsonValue
    attempts?: number
    status?: $Enums.StreamDeliveryStatus
    lastStatusCode?: number | null
    lastResponseExcerpt?: string | null
    lastLatencyMs?: number | null
    lastError?: string | null
    nextAttemptAt?: Date | string | null
    succeededAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StreamDeliveryUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    attempts?: IntFieldUpdateOperationsInput | number
    status?: EnumStreamDeliveryStatusFieldUpdateOperationsInput | $Enums.StreamDeliveryStatus
    lastStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    lastResponseExcerpt?: NullableStringFieldUpdateOperationsInput | string | null
    lastLatencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    nextAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamDeliveryUncheckedUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    attempts?: IntFieldUpdateOperationsInput | number
    status?: EnumStreamDeliveryStatusFieldUpdateOperationsInput | $Enums.StreamDeliveryStatus
    lastStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    lastResponseExcerpt?: NullableStringFieldUpdateOperationsInput | string | null
    lastLatencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    nextAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamDeliveryUncheckedUpdateManyWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    attempts?: IntFieldUpdateOperationsInput | number
    status?: EnumStreamDeliveryStatusFieldUpdateOperationsInput | $Enums.StreamDeliveryStatus
    lastStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    lastResponseExcerpt?: NullableStringFieldUpdateOperationsInput | string | null
    lastLatencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    nextAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use StreamCountOutputTypeDefaultArgs instead
     */
    export type StreamCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StreamCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StreamDefaultArgs instead
     */
    export type StreamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StreamDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StreamDeliveryDefaultArgs instead
     */
    export type StreamDeliveryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StreamDeliveryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StreamDeadLetterDefaultArgs instead
     */
    export type StreamDeadLetterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StreamDeadLetterDefaultArgs<ExtArgs>

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