
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
 * Model Entity
 * 
 */
export type Entity = $Result.DefaultSelection<Prisma.$EntityPayload>
/**
 * Model EntityMember
 * 
 */
export type EntityMember = $Result.DefaultSelection<Prisma.$EntityMemberPayload>
/**
 * Model ResolutionRun
 * 
 */
export type ResolutionRun = $Result.DefaultSelection<Prisma.$ResolutionRunPayload>
/**
 * Model AddressEmbedding
 * 
 */
export type AddressEmbedding = $Result.DefaultSelection<Prisma.$AddressEmbeddingPayload>
/**
 * Model NlQuery
 * 
 */
export type NlQuery = $Result.DefaultSelection<Prisma.$NlQueryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EntityStatus: {
  ACTIVE: 'ACTIVE',
  MERGED: 'MERGED'
};

export type EntityStatus = (typeof EntityStatus)[keyof typeof EntityStatus]


export const ResolutionStatus: {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED'
};

export type ResolutionStatus = (typeof ResolutionStatus)[keyof typeof ResolutionStatus]


export const RunTrigger: {
  MANUAL: 'MANUAL',
  SCHEDULE: 'SCHEDULE'
};

export type RunTrigger = (typeof RunTrigger)[keyof typeof RunTrigger]


export const NlQueryStatus: {
  PLANNED: 'PLANNED',
  EXECUTED: 'EXECUTED',
  UNSUPPORTED: 'UNSUPPORTED',
  FAILED: 'FAILED'
};

export type NlQueryStatus = (typeof NlQueryStatus)[keyof typeof NlQueryStatus]

}

export type EntityStatus = $Enums.EntityStatus

export const EntityStatus: typeof $Enums.EntityStatus

export type ResolutionStatus = $Enums.ResolutionStatus

export const ResolutionStatus: typeof $Enums.ResolutionStatus

export type RunTrigger = $Enums.RunTrigger

export const RunTrigger: typeof $Enums.RunTrigger

export type NlQueryStatus = $Enums.NlQueryStatus

export const NlQueryStatus: typeof $Enums.NlQueryStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Entities
 * const entities = await prisma.entity.findMany()
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
   * // Fetch zero or more Entities
   * const entities = await prisma.entity.findMany()
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
   * `prisma.entity`: Exposes CRUD operations for the **Entity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Entities
    * const entities = await prisma.entity.findMany()
    * ```
    */
  get entity(): Prisma.EntityDelegate<ExtArgs>;

  /**
   * `prisma.entityMember`: Exposes CRUD operations for the **EntityMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EntityMembers
    * const entityMembers = await prisma.entityMember.findMany()
    * ```
    */
  get entityMember(): Prisma.EntityMemberDelegate<ExtArgs>;

  /**
   * `prisma.resolutionRun`: Exposes CRUD operations for the **ResolutionRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResolutionRuns
    * const resolutionRuns = await prisma.resolutionRun.findMany()
    * ```
    */
  get resolutionRun(): Prisma.ResolutionRunDelegate<ExtArgs>;

  /**
   * `prisma.addressEmbedding`: Exposes CRUD operations for the **AddressEmbedding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AddressEmbeddings
    * const addressEmbeddings = await prisma.addressEmbedding.findMany()
    * ```
    */
  get addressEmbedding(): Prisma.AddressEmbeddingDelegate<ExtArgs>;

  /**
   * `prisma.nlQuery`: Exposes CRUD operations for the **NlQuery** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NlQueries
    * const nlQueries = await prisma.nlQuery.findMany()
    * ```
    */
  get nlQuery(): Prisma.NlQueryDelegate<ExtArgs>;
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
    Entity: 'Entity',
    EntityMember: 'EntityMember',
    ResolutionRun: 'ResolutionRun',
    AddressEmbedding: 'AddressEmbedding',
    NlQuery: 'NlQuery'
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
      modelProps: "entity" | "entityMember" | "resolutionRun" | "addressEmbedding" | "nlQuery"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Entity: {
        payload: Prisma.$EntityPayload<ExtArgs>
        fields: Prisma.EntityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EntityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EntityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload>
          }
          findFirst: {
            args: Prisma.EntityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EntityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload>
          }
          findMany: {
            args: Prisma.EntityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload>[]
          }
          create: {
            args: Prisma.EntityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload>
          }
          createMany: {
            args: Prisma.EntityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EntityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload>[]
          }
          delete: {
            args: Prisma.EntityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload>
          }
          update: {
            args: Prisma.EntityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload>
          }
          deleteMany: {
            args: Prisma.EntityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EntityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EntityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityPayload>
          }
          aggregate: {
            args: Prisma.EntityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEntity>
          }
          groupBy: {
            args: Prisma.EntityGroupByArgs<ExtArgs>
            result: $Utils.Optional<EntityGroupByOutputType>[]
          }
          count: {
            args: Prisma.EntityCountArgs<ExtArgs>
            result: $Utils.Optional<EntityCountAggregateOutputType> | number
          }
        }
      }
      EntityMember: {
        payload: Prisma.$EntityMemberPayload<ExtArgs>
        fields: Prisma.EntityMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EntityMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EntityMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityMemberPayload>
          }
          findFirst: {
            args: Prisma.EntityMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EntityMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityMemberPayload>
          }
          findMany: {
            args: Prisma.EntityMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityMemberPayload>[]
          }
          create: {
            args: Prisma.EntityMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityMemberPayload>
          }
          createMany: {
            args: Prisma.EntityMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EntityMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityMemberPayload>[]
          }
          delete: {
            args: Prisma.EntityMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityMemberPayload>
          }
          update: {
            args: Prisma.EntityMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityMemberPayload>
          }
          deleteMany: {
            args: Prisma.EntityMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EntityMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EntityMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntityMemberPayload>
          }
          aggregate: {
            args: Prisma.EntityMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEntityMember>
          }
          groupBy: {
            args: Prisma.EntityMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<EntityMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.EntityMemberCountArgs<ExtArgs>
            result: $Utils.Optional<EntityMemberCountAggregateOutputType> | number
          }
        }
      }
      ResolutionRun: {
        payload: Prisma.$ResolutionRunPayload<ExtArgs>
        fields: Prisma.ResolutionRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResolutionRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResolutionRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResolutionRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResolutionRunPayload>
          }
          findFirst: {
            args: Prisma.ResolutionRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResolutionRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResolutionRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResolutionRunPayload>
          }
          findMany: {
            args: Prisma.ResolutionRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResolutionRunPayload>[]
          }
          create: {
            args: Prisma.ResolutionRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResolutionRunPayload>
          }
          createMany: {
            args: Prisma.ResolutionRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResolutionRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResolutionRunPayload>[]
          }
          delete: {
            args: Prisma.ResolutionRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResolutionRunPayload>
          }
          update: {
            args: Prisma.ResolutionRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResolutionRunPayload>
          }
          deleteMany: {
            args: Prisma.ResolutionRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResolutionRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ResolutionRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResolutionRunPayload>
          }
          aggregate: {
            args: Prisma.ResolutionRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResolutionRun>
          }
          groupBy: {
            args: Prisma.ResolutionRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResolutionRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResolutionRunCountArgs<ExtArgs>
            result: $Utils.Optional<ResolutionRunCountAggregateOutputType> | number
          }
        }
      }
      AddressEmbedding: {
        payload: Prisma.$AddressEmbeddingPayload<ExtArgs>
        fields: Prisma.AddressEmbeddingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressEmbeddingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressEmbeddingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressEmbeddingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressEmbeddingPayload>
          }
          findFirst: {
            args: Prisma.AddressEmbeddingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressEmbeddingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressEmbeddingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressEmbeddingPayload>
          }
          findMany: {
            args: Prisma.AddressEmbeddingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressEmbeddingPayload>[]
          }
          create: {
            args: Prisma.AddressEmbeddingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressEmbeddingPayload>
          }
          createMany: {
            args: Prisma.AddressEmbeddingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AddressEmbeddingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressEmbeddingPayload>[]
          }
          delete: {
            args: Prisma.AddressEmbeddingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressEmbeddingPayload>
          }
          update: {
            args: Prisma.AddressEmbeddingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressEmbeddingPayload>
          }
          deleteMany: {
            args: Prisma.AddressEmbeddingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressEmbeddingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AddressEmbeddingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressEmbeddingPayload>
          }
          aggregate: {
            args: Prisma.AddressEmbeddingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddressEmbedding>
          }
          groupBy: {
            args: Prisma.AddressEmbeddingGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressEmbeddingGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressEmbeddingCountArgs<ExtArgs>
            result: $Utils.Optional<AddressEmbeddingCountAggregateOutputType> | number
          }
        }
      }
      NlQuery: {
        payload: Prisma.$NlQueryPayload<ExtArgs>
        fields: Prisma.NlQueryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NlQueryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NlQueryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NlQueryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NlQueryPayload>
          }
          findFirst: {
            args: Prisma.NlQueryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NlQueryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NlQueryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NlQueryPayload>
          }
          findMany: {
            args: Prisma.NlQueryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NlQueryPayload>[]
          }
          create: {
            args: Prisma.NlQueryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NlQueryPayload>
          }
          createMany: {
            args: Prisma.NlQueryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NlQueryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NlQueryPayload>[]
          }
          delete: {
            args: Prisma.NlQueryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NlQueryPayload>
          }
          update: {
            args: Prisma.NlQueryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NlQueryPayload>
          }
          deleteMany: {
            args: Prisma.NlQueryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NlQueryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NlQueryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NlQueryPayload>
          }
          aggregate: {
            args: Prisma.NlQueryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNlQuery>
          }
          groupBy: {
            args: Prisma.NlQueryGroupByArgs<ExtArgs>
            result: $Utils.Optional<NlQueryGroupByOutputType>[]
          }
          count: {
            args: Prisma.NlQueryCountArgs<ExtArgs>
            result: $Utils.Optional<NlQueryCountAggregateOutputType> | number
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
   * Count Type EntityCountOutputType
   */

  export type EntityCountOutputType = {
    members: number
  }

  export type EntityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | EntityCountOutputTypeCountMembersArgs
  }

  // Custom InputTypes
  /**
   * EntityCountOutputType without action
   */
  export type EntityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityCountOutputType
     */
    select?: EntityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EntityCountOutputType without action
   */
  export type EntityCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntityMemberWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Entity
   */

  export type AggregateEntity = {
    _count: EntityCountAggregateOutputType | null
    _avg: EntityAvgAggregateOutputType | null
    _sum: EntitySumAggregateOutputType | null
    _min: EntityMinAggregateOutputType | null
    _max: EntityMaxAggregateOutputType | null
  }

  export type EntityAvgAggregateOutputType = {
    addressCount: number | null
    riskScore: number | null
  }

  export type EntitySumAggregateOutputType = {
    addressCount: number | null
    riskScore: number | null
  }

  export type EntityMinAggregateOutputType = {
    id: string | null
    chain: string | null
    label: string | null
    category: string | null
    status: $Enums.EntityStatus | null
    addressCount: number | null
    riskScore: number | null
    sanctioned: boolean | null
    firstSeenAt: Date | null
    lastSeenAt: Date | null
    resolvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EntityMaxAggregateOutputType = {
    id: string | null
    chain: string | null
    label: string | null
    category: string | null
    status: $Enums.EntityStatus | null
    addressCount: number | null
    riskScore: number | null
    sanctioned: boolean | null
    firstSeenAt: Date | null
    lastSeenAt: Date | null
    resolvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EntityCountAggregateOutputType = {
    id: number
    chain: number
    label: number
    category: number
    status: number
    addressCount: number
    riskScore: number
    sanctioned: number
    firstSeenAt: number
    lastSeenAt: number
    resolvedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EntityAvgAggregateInputType = {
    addressCount?: true
    riskScore?: true
  }

  export type EntitySumAggregateInputType = {
    addressCount?: true
    riskScore?: true
  }

  export type EntityMinAggregateInputType = {
    id?: true
    chain?: true
    label?: true
    category?: true
    status?: true
    addressCount?: true
    riskScore?: true
    sanctioned?: true
    firstSeenAt?: true
    lastSeenAt?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EntityMaxAggregateInputType = {
    id?: true
    chain?: true
    label?: true
    category?: true
    status?: true
    addressCount?: true
    riskScore?: true
    sanctioned?: true
    firstSeenAt?: true
    lastSeenAt?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EntityCountAggregateInputType = {
    id?: true
    chain?: true
    label?: true
    category?: true
    status?: true
    addressCount?: true
    riskScore?: true
    sanctioned?: true
    firstSeenAt?: true
    lastSeenAt?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EntityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Entity to aggregate.
     */
    where?: EntityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entities to fetch.
     */
    orderBy?: EntityOrderByWithRelationInput | EntityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EntityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Entities
    **/
    _count?: true | EntityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EntityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EntitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EntityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EntityMaxAggregateInputType
  }

  export type GetEntityAggregateType<T extends EntityAggregateArgs> = {
        [P in keyof T & keyof AggregateEntity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEntity[P]>
      : GetScalarType<T[P], AggregateEntity[P]>
  }




  export type EntityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntityWhereInput
    orderBy?: EntityOrderByWithAggregationInput | EntityOrderByWithAggregationInput[]
    by: EntityScalarFieldEnum[] | EntityScalarFieldEnum
    having?: EntityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EntityCountAggregateInputType | true
    _avg?: EntityAvgAggregateInputType
    _sum?: EntitySumAggregateInputType
    _min?: EntityMinAggregateInputType
    _max?: EntityMaxAggregateInputType
  }

  export type EntityGroupByOutputType = {
    id: string
    chain: string
    label: string | null
    category: string | null
    status: $Enums.EntityStatus
    addressCount: number
    riskScore: number
    sanctioned: boolean
    firstSeenAt: Date | null
    lastSeenAt: Date | null
    resolvedAt: Date
    createdAt: Date
    updatedAt: Date
    _count: EntityCountAggregateOutputType | null
    _avg: EntityAvgAggregateOutputType | null
    _sum: EntitySumAggregateOutputType | null
    _min: EntityMinAggregateOutputType | null
    _max: EntityMaxAggregateOutputType | null
  }

  type GetEntityGroupByPayload<T extends EntityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EntityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EntityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EntityGroupByOutputType[P]>
            : GetScalarType<T[P], EntityGroupByOutputType[P]>
        }
      >
    >


  export type EntitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chain?: boolean
    label?: boolean
    category?: boolean
    status?: boolean
    addressCount?: boolean
    riskScore?: boolean
    sanctioned?: boolean
    firstSeenAt?: boolean
    lastSeenAt?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    members?: boolean | Entity$membersArgs<ExtArgs>
    _count?: boolean | EntityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entity"]>

  export type EntitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chain?: boolean
    label?: boolean
    category?: boolean
    status?: boolean
    addressCount?: boolean
    riskScore?: boolean
    sanctioned?: boolean
    firstSeenAt?: boolean
    lastSeenAt?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["entity"]>

  export type EntitySelectScalar = {
    id?: boolean
    chain?: boolean
    label?: boolean
    category?: boolean
    status?: boolean
    addressCount?: boolean
    riskScore?: boolean
    sanctioned?: boolean
    firstSeenAt?: boolean
    lastSeenAt?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EntityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | Entity$membersArgs<ExtArgs>
    _count?: boolean | EntityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EntityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EntityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Entity"
    objects: {
      members: Prisma.$EntityMemberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      /**
       * Primary chain for the cluster (clusters are per-chain in the MVP).
       */
      chain: string
      label: string | null
      category: string | null
      status: $Enums.EntityStatus
      addressCount: number
      /**
       * Derived entity risk score (0..100) consumed by services/risk.
       */
      riskScore: number
      sanctioned: boolean
      firstSeenAt: Date | null
      lastSeenAt: Date | null
      resolvedAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["entity"]>
    composites: {}
  }

  type EntityGetPayload<S extends boolean | null | undefined | EntityDefaultArgs> = $Result.GetResult<Prisma.$EntityPayload, S>

  type EntityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EntityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EntityCountAggregateInputType | true
    }

  export interface EntityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Entity'], meta: { name: 'Entity' } }
    /**
     * Find zero or one Entity that matches the filter.
     * @param {EntityFindUniqueArgs} args - Arguments to find a Entity
     * @example
     * // Get one Entity
     * const entity = await prisma.entity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EntityFindUniqueArgs>(args: SelectSubset<T, EntityFindUniqueArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Entity that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EntityFindUniqueOrThrowArgs} args - Arguments to find a Entity
     * @example
     * // Get one Entity
     * const entity = await prisma.entity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EntityFindUniqueOrThrowArgs>(args: SelectSubset<T, EntityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Entity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityFindFirstArgs} args - Arguments to find a Entity
     * @example
     * // Get one Entity
     * const entity = await prisma.entity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EntityFindFirstArgs>(args?: SelectSubset<T, EntityFindFirstArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Entity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityFindFirstOrThrowArgs} args - Arguments to find a Entity
     * @example
     * // Get one Entity
     * const entity = await prisma.entity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EntityFindFirstOrThrowArgs>(args?: SelectSubset<T, EntityFindFirstOrThrowArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Entities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Entities
     * const entities = await prisma.entity.findMany()
     * 
     * // Get first 10 Entities
     * const entities = await prisma.entity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const entityWithIdOnly = await prisma.entity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EntityFindManyArgs>(args?: SelectSubset<T, EntityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Entity.
     * @param {EntityCreateArgs} args - Arguments to create a Entity.
     * @example
     * // Create one Entity
     * const Entity = await prisma.entity.create({
     *   data: {
     *     // ... data to create a Entity
     *   }
     * })
     * 
     */
    create<T extends EntityCreateArgs>(args: SelectSubset<T, EntityCreateArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Entities.
     * @param {EntityCreateManyArgs} args - Arguments to create many Entities.
     * @example
     * // Create many Entities
     * const entity = await prisma.entity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EntityCreateManyArgs>(args?: SelectSubset<T, EntityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Entities and returns the data saved in the database.
     * @param {EntityCreateManyAndReturnArgs} args - Arguments to create many Entities.
     * @example
     * // Create many Entities
     * const entity = await prisma.entity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Entities and only return the `id`
     * const entityWithIdOnly = await prisma.entity.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EntityCreateManyAndReturnArgs>(args?: SelectSubset<T, EntityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Entity.
     * @param {EntityDeleteArgs} args - Arguments to delete one Entity.
     * @example
     * // Delete one Entity
     * const Entity = await prisma.entity.delete({
     *   where: {
     *     // ... filter to delete one Entity
     *   }
     * })
     * 
     */
    delete<T extends EntityDeleteArgs>(args: SelectSubset<T, EntityDeleteArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Entity.
     * @param {EntityUpdateArgs} args - Arguments to update one Entity.
     * @example
     * // Update one Entity
     * const entity = await prisma.entity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EntityUpdateArgs>(args: SelectSubset<T, EntityUpdateArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Entities.
     * @param {EntityDeleteManyArgs} args - Arguments to filter Entities to delete.
     * @example
     * // Delete a few Entities
     * const { count } = await prisma.entity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EntityDeleteManyArgs>(args?: SelectSubset<T, EntityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Entities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Entities
     * const entity = await prisma.entity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EntityUpdateManyArgs>(args: SelectSubset<T, EntityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Entity.
     * @param {EntityUpsertArgs} args - Arguments to update or create a Entity.
     * @example
     * // Update or create a Entity
     * const entity = await prisma.entity.upsert({
     *   create: {
     *     // ... data to create a Entity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Entity we want to update
     *   }
     * })
     */
    upsert<T extends EntityUpsertArgs>(args: SelectSubset<T, EntityUpsertArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Entities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityCountArgs} args - Arguments to filter Entities to count.
     * @example
     * // Count the number of Entities
     * const count = await prisma.entity.count({
     *   where: {
     *     // ... the filter for the Entities we want to count
     *   }
     * })
    **/
    count<T extends EntityCountArgs>(
      args?: Subset<T, EntityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EntityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Entity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EntityAggregateArgs>(args: Subset<T, EntityAggregateArgs>): Prisma.PrismaPromise<GetEntityAggregateType<T>>

    /**
     * Group by Entity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityGroupByArgs} args - Group by arguments.
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
      T extends EntityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EntityGroupByArgs['orderBy'] }
        : { orderBy?: EntityGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EntityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Entity model
   */
  readonly fields: EntityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Entity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EntityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    members<T extends Entity$membersArgs<ExtArgs> = {}>(args?: Subset<T, Entity$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntityMemberPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Entity model
   */ 
  interface EntityFieldRefs {
    readonly id: FieldRef<"Entity", 'String'>
    readonly chain: FieldRef<"Entity", 'String'>
    readonly label: FieldRef<"Entity", 'String'>
    readonly category: FieldRef<"Entity", 'String'>
    readonly status: FieldRef<"Entity", 'EntityStatus'>
    readonly addressCount: FieldRef<"Entity", 'Int'>
    readonly riskScore: FieldRef<"Entity", 'Int'>
    readonly sanctioned: FieldRef<"Entity", 'Boolean'>
    readonly firstSeenAt: FieldRef<"Entity", 'DateTime'>
    readonly lastSeenAt: FieldRef<"Entity", 'DateTime'>
    readonly resolvedAt: FieldRef<"Entity", 'DateTime'>
    readonly createdAt: FieldRef<"Entity", 'DateTime'>
    readonly updatedAt: FieldRef<"Entity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Entity findUnique
   */
  export type EntityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * Filter, which Entity to fetch.
     */
    where: EntityWhereUniqueInput
  }

  /**
   * Entity findUniqueOrThrow
   */
  export type EntityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * Filter, which Entity to fetch.
     */
    where: EntityWhereUniqueInput
  }

  /**
   * Entity findFirst
   */
  export type EntityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * Filter, which Entity to fetch.
     */
    where?: EntityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entities to fetch.
     */
    orderBy?: EntityOrderByWithRelationInput | EntityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Entities.
     */
    cursor?: EntityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Entities.
     */
    distinct?: EntityScalarFieldEnum | EntityScalarFieldEnum[]
  }

  /**
   * Entity findFirstOrThrow
   */
  export type EntityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * Filter, which Entity to fetch.
     */
    where?: EntityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entities to fetch.
     */
    orderBy?: EntityOrderByWithRelationInput | EntityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Entities.
     */
    cursor?: EntityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Entities.
     */
    distinct?: EntityScalarFieldEnum | EntityScalarFieldEnum[]
  }

  /**
   * Entity findMany
   */
  export type EntityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * Filter, which Entities to fetch.
     */
    where?: EntityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Entities to fetch.
     */
    orderBy?: EntityOrderByWithRelationInput | EntityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Entities.
     */
    cursor?: EntityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Entities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Entities.
     */
    skip?: number
    distinct?: EntityScalarFieldEnum | EntityScalarFieldEnum[]
  }

  /**
   * Entity create
   */
  export type EntityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * The data needed to create a Entity.
     */
    data: XOR<EntityCreateInput, EntityUncheckedCreateInput>
  }

  /**
   * Entity createMany
   */
  export type EntityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Entities.
     */
    data: EntityCreateManyInput | EntityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Entity createManyAndReturn
   */
  export type EntityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Entities.
     */
    data: EntityCreateManyInput | EntityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Entity update
   */
  export type EntityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * The data needed to update a Entity.
     */
    data: XOR<EntityUpdateInput, EntityUncheckedUpdateInput>
    /**
     * Choose, which Entity to update.
     */
    where: EntityWhereUniqueInput
  }

  /**
   * Entity updateMany
   */
  export type EntityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Entities.
     */
    data: XOR<EntityUpdateManyMutationInput, EntityUncheckedUpdateManyInput>
    /**
     * Filter which Entities to update
     */
    where?: EntityWhereInput
  }

  /**
   * Entity upsert
   */
  export type EntityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * The filter to search for the Entity to update in case it exists.
     */
    where: EntityWhereUniqueInput
    /**
     * In case the Entity found by the `where` argument doesn't exist, create a new Entity with this data.
     */
    create: XOR<EntityCreateInput, EntityUncheckedCreateInput>
    /**
     * In case the Entity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EntityUpdateInput, EntityUncheckedUpdateInput>
  }

  /**
   * Entity delete
   */
  export type EntityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
    /**
     * Filter which Entity to delete.
     */
    where: EntityWhereUniqueInput
  }

  /**
   * Entity deleteMany
   */
  export type EntityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Entities to delete
     */
    where?: EntityWhereInput
  }

  /**
   * Entity.members
   */
  export type Entity$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityMember
     */
    select?: EntityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityMemberInclude<ExtArgs> | null
    where?: EntityMemberWhereInput
    orderBy?: EntityMemberOrderByWithRelationInput | EntityMemberOrderByWithRelationInput[]
    cursor?: EntityMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EntityMemberScalarFieldEnum | EntityMemberScalarFieldEnum[]
  }

  /**
   * Entity without action
   */
  export type EntityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: EntitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityInclude<ExtArgs> | null
  }


  /**
   * Model EntityMember
   */

  export type AggregateEntityMember = {
    _count: EntityMemberCountAggregateOutputType | null
    _avg: EntityMemberAvgAggregateOutputType | null
    _sum: EntityMemberSumAggregateOutputType | null
    _min: EntityMemberMinAggregateOutputType | null
    _max: EntityMemberMaxAggregateOutputType | null
  }

  export type EntityMemberAvgAggregateOutputType = {
    transferEvents: number | null
  }

  export type EntityMemberSumAggregateOutputType = {
    transferEvents: number | null
  }

  export type EntityMemberMinAggregateOutputType = {
    id: string | null
    entityId: string | null
    chain: string | null
    address: string | null
    transferEvents: number | null
    label: string | null
    addedAt: Date | null
  }

  export type EntityMemberMaxAggregateOutputType = {
    id: string | null
    entityId: string | null
    chain: string | null
    address: string | null
    transferEvents: number | null
    label: string | null
    addedAt: Date | null
  }

  export type EntityMemberCountAggregateOutputType = {
    id: number
    entityId: number
    chain: number
    address: number
    transferEvents: number
    label: number
    addedAt: number
    _all: number
  }


  export type EntityMemberAvgAggregateInputType = {
    transferEvents?: true
  }

  export type EntityMemberSumAggregateInputType = {
    transferEvents?: true
  }

  export type EntityMemberMinAggregateInputType = {
    id?: true
    entityId?: true
    chain?: true
    address?: true
    transferEvents?: true
    label?: true
    addedAt?: true
  }

  export type EntityMemberMaxAggregateInputType = {
    id?: true
    entityId?: true
    chain?: true
    address?: true
    transferEvents?: true
    label?: true
    addedAt?: true
  }

  export type EntityMemberCountAggregateInputType = {
    id?: true
    entityId?: true
    chain?: true
    address?: true
    transferEvents?: true
    label?: true
    addedAt?: true
    _all?: true
  }

  export type EntityMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EntityMember to aggregate.
     */
    where?: EntityMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntityMembers to fetch.
     */
    orderBy?: EntityMemberOrderByWithRelationInput | EntityMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EntityMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntityMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntityMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EntityMembers
    **/
    _count?: true | EntityMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EntityMemberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EntityMemberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EntityMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EntityMemberMaxAggregateInputType
  }

  export type GetEntityMemberAggregateType<T extends EntityMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateEntityMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEntityMember[P]>
      : GetScalarType<T[P], AggregateEntityMember[P]>
  }




  export type EntityMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntityMemberWhereInput
    orderBy?: EntityMemberOrderByWithAggregationInput | EntityMemberOrderByWithAggregationInput[]
    by: EntityMemberScalarFieldEnum[] | EntityMemberScalarFieldEnum
    having?: EntityMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EntityMemberCountAggregateInputType | true
    _avg?: EntityMemberAvgAggregateInputType
    _sum?: EntityMemberSumAggregateInputType
    _min?: EntityMemberMinAggregateInputType
    _max?: EntityMemberMaxAggregateInputType
  }

  export type EntityMemberGroupByOutputType = {
    id: string
    entityId: string
    chain: string
    address: string
    transferEvents: number
    label: string | null
    addedAt: Date
    _count: EntityMemberCountAggregateOutputType | null
    _avg: EntityMemberAvgAggregateOutputType | null
    _sum: EntityMemberSumAggregateOutputType | null
    _min: EntityMemberMinAggregateOutputType | null
    _max: EntityMemberMaxAggregateOutputType | null
  }

  type GetEntityMemberGroupByPayload<T extends EntityMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EntityMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EntityMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EntityMemberGroupByOutputType[P]>
            : GetScalarType<T[P], EntityMemberGroupByOutputType[P]>
        }
      >
    >


  export type EntityMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityId?: boolean
    chain?: boolean
    address?: boolean
    transferEvents?: boolean
    label?: boolean
    addedAt?: boolean
    entity?: boolean | EntityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entityMember"]>

  export type EntityMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityId?: boolean
    chain?: boolean
    address?: boolean
    transferEvents?: boolean
    label?: boolean
    addedAt?: boolean
    entity?: boolean | EntityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entityMember"]>

  export type EntityMemberSelectScalar = {
    id?: boolean
    entityId?: boolean
    chain?: boolean
    address?: boolean
    transferEvents?: boolean
    label?: boolean
    addedAt?: boolean
  }

  export type EntityMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entity?: boolean | EntityDefaultArgs<ExtArgs>
  }
  export type EntityMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entity?: boolean | EntityDefaultArgs<ExtArgs>
  }

  export type $EntityMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EntityMember"
    objects: {
      entity: Prisma.$EntityPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      entityId: string
      chain: string
      address: string
      transferEvents: number
      label: string | null
      addedAt: Date
    }, ExtArgs["result"]["entityMember"]>
    composites: {}
  }

  type EntityMemberGetPayload<S extends boolean | null | undefined | EntityMemberDefaultArgs> = $Result.GetResult<Prisma.$EntityMemberPayload, S>

  type EntityMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EntityMemberFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EntityMemberCountAggregateInputType | true
    }

  export interface EntityMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EntityMember'], meta: { name: 'EntityMember' } }
    /**
     * Find zero or one EntityMember that matches the filter.
     * @param {EntityMemberFindUniqueArgs} args - Arguments to find a EntityMember
     * @example
     * // Get one EntityMember
     * const entityMember = await prisma.entityMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EntityMemberFindUniqueArgs>(args: SelectSubset<T, EntityMemberFindUniqueArgs<ExtArgs>>): Prisma__EntityMemberClient<$Result.GetResult<Prisma.$EntityMemberPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one EntityMember that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EntityMemberFindUniqueOrThrowArgs} args - Arguments to find a EntityMember
     * @example
     * // Get one EntityMember
     * const entityMember = await prisma.entityMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EntityMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, EntityMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EntityMemberClient<$Result.GetResult<Prisma.$EntityMemberPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first EntityMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityMemberFindFirstArgs} args - Arguments to find a EntityMember
     * @example
     * // Get one EntityMember
     * const entityMember = await prisma.entityMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EntityMemberFindFirstArgs>(args?: SelectSubset<T, EntityMemberFindFirstArgs<ExtArgs>>): Prisma__EntityMemberClient<$Result.GetResult<Prisma.$EntityMemberPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first EntityMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityMemberFindFirstOrThrowArgs} args - Arguments to find a EntityMember
     * @example
     * // Get one EntityMember
     * const entityMember = await prisma.entityMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EntityMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, EntityMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__EntityMemberClient<$Result.GetResult<Prisma.$EntityMemberPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more EntityMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EntityMembers
     * const entityMembers = await prisma.entityMember.findMany()
     * 
     * // Get first 10 EntityMembers
     * const entityMembers = await prisma.entityMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const entityMemberWithIdOnly = await prisma.entityMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EntityMemberFindManyArgs>(args?: SelectSubset<T, EntityMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntityMemberPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a EntityMember.
     * @param {EntityMemberCreateArgs} args - Arguments to create a EntityMember.
     * @example
     * // Create one EntityMember
     * const EntityMember = await prisma.entityMember.create({
     *   data: {
     *     // ... data to create a EntityMember
     *   }
     * })
     * 
     */
    create<T extends EntityMemberCreateArgs>(args: SelectSubset<T, EntityMemberCreateArgs<ExtArgs>>): Prisma__EntityMemberClient<$Result.GetResult<Prisma.$EntityMemberPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many EntityMembers.
     * @param {EntityMemberCreateManyArgs} args - Arguments to create many EntityMembers.
     * @example
     * // Create many EntityMembers
     * const entityMember = await prisma.entityMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EntityMemberCreateManyArgs>(args?: SelectSubset<T, EntityMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EntityMembers and returns the data saved in the database.
     * @param {EntityMemberCreateManyAndReturnArgs} args - Arguments to create many EntityMembers.
     * @example
     * // Create many EntityMembers
     * const entityMember = await prisma.entityMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EntityMembers and only return the `id`
     * const entityMemberWithIdOnly = await prisma.entityMember.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EntityMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, EntityMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntityMemberPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a EntityMember.
     * @param {EntityMemberDeleteArgs} args - Arguments to delete one EntityMember.
     * @example
     * // Delete one EntityMember
     * const EntityMember = await prisma.entityMember.delete({
     *   where: {
     *     // ... filter to delete one EntityMember
     *   }
     * })
     * 
     */
    delete<T extends EntityMemberDeleteArgs>(args: SelectSubset<T, EntityMemberDeleteArgs<ExtArgs>>): Prisma__EntityMemberClient<$Result.GetResult<Prisma.$EntityMemberPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one EntityMember.
     * @param {EntityMemberUpdateArgs} args - Arguments to update one EntityMember.
     * @example
     * // Update one EntityMember
     * const entityMember = await prisma.entityMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EntityMemberUpdateArgs>(args: SelectSubset<T, EntityMemberUpdateArgs<ExtArgs>>): Prisma__EntityMemberClient<$Result.GetResult<Prisma.$EntityMemberPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more EntityMembers.
     * @param {EntityMemberDeleteManyArgs} args - Arguments to filter EntityMembers to delete.
     * @example
     * // Delete a few EntityMembers
     * const { count } = await prisma.entityMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EntityMemberDeleteManyArgs>(args?: SelectSubset<T, EntityMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EntityMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EntityMembers
     * const entityMember = await prisma.entityMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EntityMemberUpdateManyArgs>(args: SelectSubset<T, EntityMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EntityMember.
     * @param {EntityMemberUpsertArgs} args - Arguments to update or create a EntityMember.
     * @example
     * // Update or create a EntityMember
     * const entityMember = await prisma.entityMember.upsert({
     *   create: {
     *     // ... data to create a EntityMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EntityMember we want to update
     *   }
     * })
     */
    upsert<T extends EntityMemberUpsertArgs>(args: SelectSubset<T, EntityMemberUpsertArgs<ExtArgs>>): Prisma__EntityMemberClient<$Result.GetResult<Prisma.$EntityMemberPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of EntityMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityMemberCountArgs} args - Arguments to filter EntityMembers to count.
     * @example
     * // Count the number of EntityMembers
     * const count = await prisma.entityMember.count({
     *   where: {
     *     // ... the filter for the EntityMembers we want to count
     *   }
     * })
    **/
    count<T extends EntityMemberCountArgs>(
      args?: Subset<T, EntityMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EntityMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EntityMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EntityMemberAggregateArgs>(args: Subset<T, EntityMemberAggregateArgs>): Prisma.PrismaPromise<GetEntityMemberAggregateType<T>>

    /**
     * Group by EntityMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityMemberGroupByArgs} args - Group by arguments.
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
      T extends EntityMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EntityMemberGroupByArgs['orderBy'] }
        : { orderBy?: EntityMemberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EntityMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntityMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EntityMember model
   */
  readonly fields: EntityMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EntityMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EntityMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entity<T extends EntityDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EntityDefaultArgs<ExtArgs>>): Prisma__EntityClient<$Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the EntityMember model
   */ 
  interface EntityMemberFieldRefs {
    readonly id: FieldRef<"EntityMember", 'String'>
    readonly entityId: FieldRef<"EntityMember", 'String'>
    readonly chain: FieldRef<"EntityMember", 'String'>
    readonly address: FieldRef<"EntityMember", 'String'>
    readonly transferEvents: FieldRef<"EntityMember", 'Int'>
    readonly label: FieldRef<"EntityMember", 'String'>
    readonly addedAt: FieldRef<"EntityMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EntityMember findUnique
   */
  export type EntityMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityMember
     */
    select?: EntityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityMemberInclude<ExtArgs> | null
    /**
     * Filter, which EntityMember to fetch.
     */
    where: EntityMemberWhereUniqueInput
  }

  /**
   * EntityMember findUniqueOrThrow
   */
  export type EntityMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityMember
     */
    select?: EntityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityMemberInclude<ExtArgs> | null
    /**
     * Filter, which EntityMember to fetch.
     */
    where: EntityMemberWhereUniqueInput
  }

  /**
   * EntityMember findFirst
   */
  export type EntityMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityMember
     */
    select?: EntityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityMemberInclude<ExtArgs> | null
    /**
     * Filter, which EntityMember to fetch.
     */
    where?: EntityMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntityMembers to fetch.
     */
    orderBy?: EntityMemberOrderByWithRelationInput | EntityMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EntityMembers.
     */
    cursor?: EntityMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntityMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntityMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EntityMembers.
     */
    distinct?: EntityMemberScalarFieldEnum | EntityMemberScalarFieldEnum[]
  }

  /**
   * EntityMember findFirstOrThrow
   */
  export type EntityMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityMember
     */
    select?: EntityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityMemberInclude<ExtArgs> | null
    /**
     * Filter, which EntityMember to fetch.
     */
    where?: EntityMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntityMembers to fetch.
     */
    orderBy?: EntityMemberOrderByWithRelationInput | EntityMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EntityMembers.
     */
    cursor?: EntityMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntityMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntityMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EntityMembers.
     */
    distinct?: EntityMemberScalarFieldEnum | EntityMemberScalarFieldEnum[]
  }

  /**
   * EntityMember findMany
   */
  export type EntityMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityMember
     */
    select?: EntityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityMemberInclude<ExtArgs> | null
    /**
     * Filter, which EntityMembers to fetch.
     */
    where?: EntityMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntityMembers to fetch.
     */
    orderBy?: EntityMemberOrderByWithRelationInput | EntityMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EntityMembers.
     */
    cursor?: EntityMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntityMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntityMembers.
     */
    skip?: number
    distinct?: EntityMemberScalarFieldEnum | EntityMemberScalarFieldEnum[]
  }

  /**
   * EntityMember create
   */
  export type EntityMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityMember
     */
    select?: EntityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a EntityMember.
     */
    data: XOR<EntityMemberCreateInput, EntityMemberUncheckedCreateInput>
  }

  /**
   * EntityMember createMany
   */
  export type EntityMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EntityMembers.
     */
    data: EntityMemberCreateManyInput | EntityMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EntityMember createManyAndReturn
   */
  export type EntityMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityMember
     */
    select?: EntityMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many EntityMembers.
     */
    data: EntityMemberCreateManyInput | EntityMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EntityMember update
   */
  export type EntityMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityMember
     */
    select?: EntityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a EntityMember.
     */
    data: XOR<EntityMemberUpdateInput, EntityMemberUncheckedUpdateInput>
    /**
     * Choose, which EntityMember to update.
     */
    where: EntityMemberWhereUniqueInput
  }

  /**
   * EntityMember updateMany
   */
  export type EntityMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EntityMembers.
     */
    data: XOR<EntityMemberUpdateManyMutationInput, EntityMemberUncheckedUpdateManyInput>
    /**
     * Filter which EntityMembers to update
     */
    where?: EntityMemberWhereInput
  }

  /**
   * EntityMember upsert
   */
  export type EntityMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityMember
     */
    select?: EntityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the EntityMember to update in case it exists.
     */
    where: EntityMemberWhereUniqueInput
    /**
     * In case the EntityMember found by the `where` argument doesn't exist, create a new EntityMember with this data.
     */
    create: XOR<EntityMemberCreateInput, EntityMemberUncheckedCreateInput>
    /**
     * In case the EntityMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EntityMemberUpdateInput, EntityMemberUncheckedUpdateInput>
  }

  /**
   * EntityMember delete
   */
  export type EntityMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityMember
     */
    select?: EntityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityMemberInclude<ExtArgs> | null
    /**
     * Filter which EntityMember to delete.
     */
    where: EntityMemberWhereUniqueInput
  }

  /**
   * EntityMember deleteMany
   */
  export type EntityMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EntityMembers to delete
     */
    where?: EntityMemberWhereInput
  }

  /**
   * EntityMember without action
   */
  export type EntityMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityMember
     */
    select?: EntityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntityMemberInclude<ExtArgs> | null
  }


  /**
   * Model ResolutionRun
   */

  export type AggregateResolutionRun = {
    _count: ResolutionRunCountAggregateOutputType | null
    _avg: ResolutionRunAvgAggregateOutputType | null
    _sum: ResolutionRunSumAggregateOutputType | null
    _min: ResolutionRunMinAggregateOutputType | null
    _max: ResolutionRunMaxAggregateOutputType | null
  }

  export type ResolutionRunAvgAggregateOutputType = {
    lookbackDays: number | null
    addressCount: number | null
    entityCount: number | null
    linkCount: number | null
    durationMs: number | null
  }

  export type ResolutionRunSumAggregateOutputType = {
    lookbackDays: number | null
    addressCount: number | null
    entityCount: number | null
    linkCount: number | null
    durationMs: number | null
  }

  export type ResolutionRunMinAggregateOutputType = {
    id: string | null
    status: $Enums.ResolutionStatus | null
    trigger: $Enums.RunTrigger | null
    chain: string | null
    lookbackDays: number | null
    addressCount: number | null
    entityCount: number | null
    linkCount: number | null
    durationMs: number | null
    error: string | null
    startedAt: Date | null
    finishedAt: Date | null
    createdAt: Date | null
  }

  export type ResolutionRunMaxAggregateOutputType = {
    id: string | null
    status: $Enums.ResolutionStatus | null
    trigger: $Enums.RunTrigger | null
    chain: string | null
    lookbackDays: number | null
    addressCount: number | null
    entityCount: number | null
    linkCount: number | null
    durationMs: number | null
    error: string | null
    startedAt: Date | null
    finishedAt: Date | null
    createdAt: Date | null
  }

  export type ResolutionRunCountAggregateOutputType = {
    id: number
    status: number
    trigger: number
    chain: number
    lookbackDays: number
    addressCount: number
    entityCount: number
    linkCount: number
    durationMs: number
    error: number
    startedAt: number
    finishedAt: number
    createdAt: number
    _all: number
  }


  export type ResolutionRunAvgAggregateInputType = {
    lookbackDays?: true
    addressCount?: true
    entityCount?: true
    linkCount?: true
    durationMs?: true
  }

  export type ResolutionRunSumAggregateInputType = {
    lookbackDays?: true
    addressCount?: true
    entityCount?: true
    linkCount?: true
    durationMs?: true
  }

  export type ResolutionRunMinAggregateInputType = {
    id?: true
    status?: true
    trigger?: true
    chain?: true
    lookbackDays?: true
    addressCount?: true
    entityCount?: true
    linkCount?: true
    durationMs?: true
    error?: true
    startedAt?: true
    finishedAt?: true
    createdAt?: true
  }

  export type ResolutionRunMaxAggregateInputType = {
    id?: true
    status?: true
    trigger?: true
    chain?: true
    lookbackDays?: true
    addressCount?: true
    entityCount?: true
    linkCount?: true
    durationMs?: true
    error?: true
    startedAt?: true
    finishedAt?: true
    createdAt?: true
  }

  export type ResolutionRunCountAggregateInputType = {
    id?: true
    status?: true
    trigger?: true
    chain?: true
    lookbackDays?: true
    addressCount?: true
    entityCount?: true
    linkCount?: true
    durationMs?: true
    error?: true
    startedAt?: true
    finishedAt?: true
    createdAt?: true
    _all?: true
  }

  export type ResolutionRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResolutionRun to aggregate.
     */
    where?: ResolutionRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResolutionRuns to fetch.
     */
    orderBy?: ResolutionRunOrderByWithRelationInput | ResolutionRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResolutionRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResolutionRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResolutionRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResolutionRuns
    **/
    _count?: true | ResolutionRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResolutionRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResolutionRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResolutionRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResolutionRunMaxAggregateInputType
  }

  export type GetResolutionRunAggregateType<T extends ResolutionRunAggregateArgs> = {
        [P in keyof T & keyof AggregateResolutionRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResolutionRun[P]>
      : GetScalarType<T[P], AggregateResolutionRun[P]>
  }




  export type ResolutionRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResolutionRunWhereInput
    orderBy?: ResolutionRunOrderByWithAggregationInput | ResolutionRunOrderByWithAggregationInput[]
    by: ResolutionRunScalarFieldEnum[] | ResolutionRunScalarFieldEnum
    having?: ResolutionRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResolutionRunCountAggregateInputType | true
    _avg?: ResolutionRunAvgAggregateInputType
    _sum?: ResolutionRunSumAggregateInputType
    _min?: ResolutionRunMinAggregateInputType
    _max?: ResolutionRunMaxAggregateInputType
  }

  export type ResolutionRunGroupByOutputType = {
    id: string
    status: $Enums.ResolutionStatus
    trigger: $Enums.RunTrigger
    chain: string | null
    lookbackDays: number
    addressCount: number | null
    entityCount: number | null
    linkCount: number | null
    durationMs: number | null
    error: string | null
    startedAt: Date | null
    finishedAt: Date | null
    createdAt: Date
    _count: ResolutionRunCountAggregateOutputType | null
    _avg: ResolutionRunAvgAggregateOutputType | null
    _sum: ResolutionRunSumAggregateOutputType | null
    _min: ResolutionRunMinAggregateOutputType | null
    _max: ResolutionRunMaxAggregateOutputType | null
  }

  type GetResolutionRunGroupByPayload<T extends ResolutionRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResolutionRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResolutionRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResolutionRunGroupByOutputType[P]>
            : GetScalarType<T[P], ResolutionRunGroupByOutputType[P]>
        }
      >
    >


  export type ResolutionRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    trigger?: boolean
    chain?: boolean
    lookbackDays?: boolean
    addressCount?: boolean
    entityCount?: boolean
    linkCount?: boolean
    durationMs?: boolean
    error?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["resolutionRun"]>

  export type ResolutionRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    trigger?: boolean
    chain?: boolean
    lookbackDays?: boolean
    addressCount?: boolean
    entityCount?: boolean
    linkCount?: boolean
    durationMs?: boolean
    error?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["resolutionRun"]>

  export type ResolutionRunSelectScalar = {
    id?: boolean
    status?: boolean
    trigger?: boolean
    chain?: boolean
    lookbackDays?: boolean
    addressCount?: boolean
    entityCount?: boolean
    linkCount?: boolean
    durationMs?: boolean
    error?: boolean
    startedAt?: boolean
    finishedAt?: boolean
    createdAt?: boolean
  }


  export type $ResolutionRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResolutionRun"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: $Enums.ResolutionStatus
      trigger: $Enums.RunTrigger
      chain: string | null
      lookbackDays: number
      addressCount: number | null
      entityCount: number | null
      linkCount: number | null
      durationMs: number | null
      error: string | null
      startedAt: Date | null
      finishedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["resolutionRun"]>
    composites: {}
  }

  type ResolutionRunGetPayload<S extends boolean | null | undefined | ResolutionRunDefaultArgs> = $Result.GetResult<Prisma.$ResolutionRunPayload, S>

  type ResolutionRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ResolutionRunFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ResolutionRunCountAggregateInputType | true
    }

  export interface ResolutionRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResolutionRun'], meta: { name: 'ResolutionRun' } }
    /**
     * Find zero or one ResolutionRun that matches the filter.
     * @param {ResolutionRunFindUniqueArgs} args - Arguments to find a ResolutionRun
     * @example
     * // Get one ResolutionRun
     * const resolutionRun = await prisma.resolutionRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResolutionRunFindUniqueArgs>(args: SelectSubset<T, ResolutionRunFindUniqueArgs<ExtArgs>>): Prisma__ResolutionRunClient<$Result.GetResult<Prisma.$ResolutionRunPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ResolutionRun that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ResolutionRunFindUniqueOrThrowArgs} args - Arguments to find a ResolutionRun
     * @example
     * // Get one ResolutionRun
     * const resolutionRun = await prisma.resolutionRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResolutionRunFindUniqueOrThrowArgs>(args: SelectSubset<T, ResolutionRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResolutionRunClient<$Result.GetResult<Prisma.$ResolutionRunPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ResolutionRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResolutionRunFindFirstArgs} args - Arguments to find a ResolutionRun
     * @example
     * // Get one ResolutionRun
     * const resolutionRun = await prisma.resolutionRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResolutionRunFindFirstArgs>(args?: SelectSubset<T, ResolutionRunFindFirstArgs<ExtArgs>>): Prisma__ResolutionRunClient<$Result.GetResult<Prisma.$ResolutionRunPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ResolutionRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResolutionRunFindFirstOrThrowArgs} args - Arguments to find a ResolutionRun
     * @example
     * // Get one ResolutionRun
     * const resolutionRun = await prisma.resolutionRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResolutionRunFindFirstOrThrowArgs>(args?: SelectSubset<T, ResolutionRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResolutionRunClient<$Result.GetResult<Prisma.$ResolutionRunPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ResolutionRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResolutionRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResolutionRuns
     * const resolutionRuns = await prisma.resolutionRun.findMany()
     * 
     * // Get first 10 ResolutionRuns
     * const resolutionRuns = await prisma.resolutionRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resolutionRunWithIdOnly = await prisma.resolutionRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResolutionRunFindManyArgs>(args?: SelectSubset<T, ResolutionRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResolutionRunPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ResolutionRun.
     * @param {ResolutionRunCreateArgs} args - Arguments to create a ResolutionRun.
     * @example
     * // Create one ResolutionRun
     * const ResolutionRun = await prisma.resolutionRun.create({
     *   data: {
     *     // ... data to create a ResolutionRun
     *   }
     * })
     * 
     */
    create<T extends ResolutionRunCreateArgs>(args: SelectSubset<T, ResolutionRunCreateArgs<ExtArgs>>): Prisma__ResolutionRunClient<$Result.GetResult<Prisma.$ResolutionRunPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ResolutionRuns.
     * @param {ResolutionRunCreateManyArgs} args - Arguments to create many ResolutionRuns.
     * @example
     * // Create many ResolutionRuns
     * const resolutionRun = await prisma.resolutionRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResolutionRunCreateManyArgs>(args?: SelectSubset<T, ResolutionRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResolutionRuns and returns the data saved in the database.
     * @param {ResolutionRunCreateManyAndReturnArgs} args - Arguments to create many ResolutionRuns.
     * @example
     * // Create many ResolutionRuns
     * const resolutionRun = await prisma.resolutionRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResolutionRuns and only return the `id`
     * const resolutionRunWithIdOnly = await prisma.resolutionRun.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResolutionRunCreateManyAndReturnArgs>(args?: SelectSubset<T, ResolutionRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResolutionRunPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ResolutionRun.
     * @param {ResolutionRunDeleteArgs} args - Arguments to delete one ResolutionRun.
     * @example
     * // Delete one ResolutionRun
     * const ResolutionRun = await prisma.resolutionRun.delete({
     *   where: {
     *     // ... filter to delete one ResolutionRun
     *   }
     * })
     * 
     */
    delete<T extends ResolutionRunDeleteArgs>(args: SelectSubset<T, ResolutionRunDeleteArgs<ExtArgs>>): Prisma__ResolutionRunClient<$Result.GetResult<Prisma.$ResolutionRunPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ResolutionRun.
     * @param {ResolutionRunUpdateArgs} args - Arguments to update one ResolutionRun.
     * @example
     * // Update one ResolutionRun
     * const resolutionRun = await prisma.resolutionRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResolutionRunUpdateArgs>(args: SelectSubset<T, ResolutionRunUpdateArgs<ExtArgs>>): Prisma__ResolutionRunClient<$Result.GetResult<Prisma.$ResolutionRunPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ResolutionRuns.
     * @param {ResolutionRunDeleteManyArgs} args - Arguments to filter ResolutionRuns to delete.
     * @example
     * // Delete a few ResolutionRuns
     * const { count } = await prisma.resolutionRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResolutionRunDeleteManyArgs>(args?: SelectSubset<T, ResolutionRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResolutionRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResolutionRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResolutionRuns
     * const resolutionRun = await prisma.resolutionRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResolutionRunUpdateManyArgs>(args: SelectSubset<T, ResolutionRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ResolutionRun.
     * @param {ResolutionRunUpsertArgs} args - Arguments to update or create a ResolutionRun.
     * @example
     * // Update or create a ResolutionRun
     * const resolutionRun = await prisma.resolutionRun.upsert({
     *   create: {
     *     // ... data to create a ResolutionRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResolutionRun we want to update
     *   }
     * })
     */
    upsert<T extends ResolutionRunUpsertArgs>(args: SelectSubset<T, ResolutionRunUpsertArgs<ExtArgs>>): Prisma__ResolutionRunClient<$Result.GetResult<Prisma.$ResolutionRunPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ResolutionRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResolutionRunCountArgs} args - Arguments to filter ResolutionRuns to count.
     * @example
     * // Count the number of ResolutionRuns
     * const count = await prisma.resolutionRun.count({
     *   where: {
     *     // ... the filter for the ResolutionRuns we want to count
     *   }
     * })
    **/
    count<T extends ResolutionRunCountArgs>(
      args?: Subset<T, ResolutionRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResolutionRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResolutionRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResolutionRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ResolutionRunAggregateArgs>(args: Subset<T, ResolutionRunAggregateArgs>): Prisma.PrismaPromise<GetResolutionRunAggregateType<T>>

    /**
     * Group by ResolutionRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResolutionRunGroupByArgs} args - Group by arguments.
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
      T extends ResolutionRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResolutionRunGroupByArgs['orderBy'] }
        : { orderBy?: ResolutionRunGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ResolutionRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResolutionRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResolutionRun model
   */
  readonly fields: ResolutionRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResolutionRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResolutionRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ResolutionRun model
   */ 
  interface ResolutionRunFieldRefs {
    readonly id: FieldRef<"ResolutionRun", 'String'>
    readonly status: FieldRef<"ResolutionRun", 'ResolutionStatus'>
    readonly trigger: FieldRef<"ResolutionRun", 'RunTrigger'>
    readonly chain: FieldRef<"ResolutionRun", 'String'>
    readonly lookbackDays: FieldRef<"ResolutionRun", 'Int'>
    readonly addressCount: FieldRef<"ResolutionRun", 'Int'>
    readonly entityCount: FieldRef<"ResolutionRun", 'Int'>
    readonly linkCount: FieldRef<"ResolutionRun", 'Int'>
    readonly durationMs: FieldRef<"ResolutionRun", 'Int'>
    readonly error: FieldRef<"ResolutionRun", 'String'>
    readonly startedAt: FieldRef<"ResolutionRun", 'DateTime'>
    readonly finishedAt: FieldRef<"ResolutionRun", 'DateTime'>
    readonly createdAt: FieldRef<"ResolutionRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ResolutionRun findUnique
   */
  export type ResolutionRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResolutionRun
     */
    select?: ResolutionRunSelect<ExtArgs> | null
    /**
     * Filter, which ResolutionRun to fetch.
     */
    where: ResolutionRunWhereUniqueInput
  }

  /**
   * ResolutionRun findUniqueOrThrow
   */
  export type ResolutionRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResolutionRun
     */
    select?: ResolutionRunSelect<ExtArgs> | null
    /**
     * Filter, which ResolutionRun to fetch.
     */
    where: ResolutionRunWhereUniqueInput
  }

  /**
   * ResolutionRun findFirst
   */
  export type ResolutionRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResolutionRun
     */
    select?: ResolutionRunSelect<ExtArgs> | null
    /**
     * Filter, which ResolutionRun to fetch.
     */
    where?: ResolutionRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResolutionRuns to fetch.
     */
    orderBy?: ResolutionRunOrderByWithRelationInput | ResolutionRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResolutionRuns.
     */
    cursor?: ResolutionRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResolutionRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResolutionRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResolutionRuns.
     */
    distinct?: ResolutionRunScalarFieldEnum | ResolutionRunScalarFieldEnum[]
  }

  /**
   * ResolutionRun findFirstOrThrow
   */
  export type ResolutionRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResolutionRun
     */
    select?: ResolutionRunSelect<ExtArgs> | null
    /**
     * Filter, which ResolutionRun to fetch.
     */
    where?: ResolutionRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResolutionRuns to fetch.
     */
    orderBy?: ResolutionRunOrderByWithRelationInput | ResolutionRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResolutionRuns.
     */
    cursor?: ResolutionRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResolutionRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResolutionRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResolutionRuns.
     */
    distinct?: ResolutionRunScalarFieldEnum | ResolutionRunScalarFieldEnum[]
  }

  /**
   * ResolutionRun findMany
   */
  export type ResolutionRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResolutionRun
     */
    select?: ResolutionRunSelect<ExtArgs> | null
    /**
     * Filter, which ResolutionRuns to fetch.
     */
    where?: ResolutionRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResolutionRuns to fetch.
     */
    orderBy?: ResolutionRunOrderByWithRelationInput | ResolutionRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResolutionRuns.
     */
    cursor?: ResolutionRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResolutionRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResolutionRuns.
     */
    skip?: number
    distinct?: ResolutionRunScalarFieldEnum | ResolutionRunScalarFieldEnum[]
  }

  /**
   * ResolutionRun create
   */
  export type ResolutionRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResolutionRun
     */
    select?: ResolutionRunSelect<ExtArgs> | null
    /**
     * The data needed to create a ResolutionRun.
     */
    data: XOR<ResolutionRunCreateInput, ResolutionRunUncheckedCreateInput>
  }

  /**
   * ResolutionRun createMany
   */
  export type ResolutionRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResolutionRuns.
     */
    data: ResolutionRunCreateManyInput | ResolutionRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResolutionRun createManyAndReturn
   */
  export type ResolutionRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResolutionRun
     */
    select?: ResolutionRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ResolutionRuns.
     */
    data: ResolutionRunCreateManyInput | ResolutionRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResolutionRun update
   */
  export type ResolutionRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResolutionRun
     */
    select?: ResolutionRunSelect<ExtArgs> | null
    /**
     * The data needed to update a ResolutionRun.
     */
    data: XOR<ResolutionRunUpdateInput, ResolutionRunUncheckedUpdateInput>
    /**
     * Choose, which ResolutionRun to update.
     */
    where: ResolutionRunWhereUniqueInput
  }

  /**
   * ResolutionRun updateMany
   */
  export type ResolutionRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResolutionRuns.
     */
    data: XOR<ResolutionRunUpdateManyMutationInput, ResolutionRunUncheckedUpdateManyInput>
    /**
     * Filter which ResolutionRuns to update
     */
    where?: ResolutionRunWhereInput
  }

  /**
   * ResolutionRun upsert
   */
  export type ResolutionRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResolutionRun
     */
    select?: ResolutionRunSelect<ExtArgs> | null
    /**
     * The filter to search for the ResolutionRun to update in case it exists.
     */
    where: ResolutionRunWhereUniqueInput
    /**
     * In case the ResolutionRun found by the `where` argument doesn't exist, create a new ResolutionRun with this data.
     */
    create: XOR<ResolutionRunCreateInput, ResolutionRunUncheckedCreateInput>
    /**
     * In case the ResolutionRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResolutionRunUpdateInput, ResolutionRunUncheckedUpdateInput>
  }

  /**
   * ResolutionRun delete
   */
  export type ResolutionRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResolutionRun
     */
    select?: ResolutionRunSelect<ExtArgs> | null
    /**
     * Filter which ResolutionRun to delete.
     */
    where: ResolutionRunWhereUniqueInput
  }

  /**
   * ResolutionRun deleteMany
   */
  export type ResolutionRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResolutionRuns to delete
     */
    where?: ResolutionRunWhereInput
  }

  /**
   * ResolutionRun without action
   */
  export type ResolutionRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResolutionRun
     */
    select?: ResolutionRunSelect<ExtArgs> | null
  }


  /**
   * Model AddressEmbedding
   */

  export type AggregateAddressEmbedding = {
    _count: AddressEmbeddingCountAggregateOutputType | null
    _avg: AddressEmbeddingAvgAggregateOutputType | null
    _sum: AddressEmbeddingSumAggregateOutputType | null
    _min: AddressEmbeddingMinAggregateOutputType | null
    _max: AddressEmbeddingMaxAggregateOutputType | null
  }

  export type AddressEmbeddingAvgAggregateOutputType = {
    dim: number | null
  }

  export type AddressEmbeddingSumAggregateOutputType = {
    dim: number | null
  }

  export type AddressEmbeddingMinAggregateOutputType = {
    id: string | null
    chain: string | null
    address: string | null
    dim: number | null
    model: string | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type AddressEmbeddingMaxAggregateOutputType = {
    id: string | null
    chain: string | null
    address: string | null
    dim: number | null
    model: string | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type AddressEmbeddingCountAggregateOutputType = {
    id: number
    chain: number
    address: number
    dim: number
    vector: number
    model: number
    updatedAt: number
    createdAt: number
    _all: number
  }


  export type AddressEmbeddingAvgAggregateInputType = {
    dim?: true
  }

  export type AddressEmbeddingSumAggregateInputType = {
    dim?: true
  }

  export type AddressEmbeddingMinAggregateInputType = {
    id?: true
    chain?: true
    address?: true
    dim?: true
    model?: true
    updatedAt?: true
    createdAt?: true
  }

  export type AddressEmbeddingMaxAggregateInputType = {
    id?: true
    chain?: true
    address?: true
    dim?: true
    model?: true
    updatedAt?: true
    createdAt?: true
  }

  export type AddressEmbeddingCountAggregateInputType = {
    id?: true
    chain?: true
    address?: true
    dim?: true
    vector?: true
    model?: true
    updatedAt?: true
    createdAt?: true
    _all?: true
  }

  export type AddressEmbeddingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddressEmbedding to aggregate.
     */
    where?: AddressEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressEmbeddings to fetch.
     */
    orderBy?: AddressEmbeddingOrderByWithRelationInput | AddressEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AddressEmbeddings
    **/
    _count?: true | AddressEmbeddingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AddressEmbeddingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AddressEmbeddingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressEmbeddingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressEmbeddingMaxAggregateInputType
  }

  export type GetAddressEmbeddingAggregateType<T extends AddressEmbeddingAggregateArgs> = {
        [P in keyof T & keyof AggregateAddressEmbedding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddressEmbedding[P]>
      : GetScalarType<T[P], AggregateAddressEmbedding[P]>
  }




  export type AddressEmbeddingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressEmbeddingWhereInput
    orderBy?: AddressEmbeddingOrderByWithAggregationInput | AddressEmbeddingOrderByWithAggregationInput[]
    by: AddressEmbeddingScalarFieldEnum[] | AddressEmbeddingScalarFieldEnum
    having?: AddressEmbeddingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressEmbeddingCountAggregateInputType | true
    _avg?: AddressEmbeddingAvgAggregateInputType
    _sum?: AddressEmbeddingSumAggregateInputType
    _min?: AddressEmbeddingMinAggregateInputType
    _max?: AddressEmbeddingMaxAggregateInputType
  }

  export type AddressEmbeddingGroupByOutputType = {
    id: string
    chain: string
    address: string
    dim: number
    vector: JsonValue
    model: string
    updatedAt: Date
    createdAt: Date
    _count: AddressEmbeddingCountAggregateOutputType | null
    _avg: AddressEmbeddingAvgAggregateOutputType | null
    _sum: AddressEmbeddingSumAggregateOutputType | null
    _min: AddressEmbeddingMinAggregateOutputType | null
    _max: AddressEmbeddingMaxAggregateOutputType | null
  }

  type GetAddressEmbeddingGroupByPayload<T extends AddressEmbeddingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressEmbeddingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressEmbeddingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressEmbeddingGroupByOutputType[P]>
            : GetScalarType<T[P], AddressEmbeddingGroupByOutputType[P]>
        }
      >
    >


  export type AddressEmbeddingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chain?: boolean
    address?: boolean
    dim?: boolean
    vector?: boolean
    model?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["addressEmbedding"]>

  export type AddressEmbeddingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chain?: boolean
    address?: boolean
    dim?: boolean
    vector?: boolean
    model?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["addressEmbedding"]>

  export type AddressEmbeddingSelectScalar = {
    id?: boolean
    chain?: boolean
    address?: boolean
    dim?: boolean
    vector?: boolean
    model?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }


  export type $AddressEmbeddingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AddressEmbedding"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chain: string
      address: string
      dim: number
      /**
       * Float[] embedding stored as JSON (no pgvector dependency in the MVP).
       */
      vector: Prisma.JsonValue
      model: string
      updatedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["addressEmbedding"]>
    composites: {}
  }

  type AddressEmbeddingGetPayload<S extends boolean | null | undefined | AddressEmbeddingDefaultArgs> = $Result.GetResult<Prisma.$AddressEmbeddingPayload, S>

  type AddressEmbeddingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AddressEmbeddingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AddressEmbeddingCountAggregateInputType | true
    }

  export interface AddressEmbeddingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AddressEmbedding'], meta: { name: 'AddressEmbedding' } }
    /**
     * Find zero or one AddressEmbedding that matches the filter.
     * @param {AddressEmbeddingFindUniqueArgs} args - Arguments to find a AddressEmbedding
     * @example
     * // Get one AddressEmbedding
     * const addressEmbedding = await prisma.addressEmbedding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressEmbeddingFindUniqueArgs>(args: SelectSubset<T, AddressEmbeddingFindUniqueArgs<ExtArgs>>): Prisma__AddressEmbeddingClient<$Result.GetResult<Prisma.$AddressEmbeddingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AddressEmbedding that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AddressEmbeddingFindUniqueOrThrowArgs} args - Arguments to find a AddressEmbedding
     * @example
     * // Get one AddressEmbedding
     * const addressEmbedding = await prisma.addressEmbedding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressEmbeddingFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressEmbeddingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressEmbeddingClient<$Result.GetResult<Prisma.$AddressEmbeddingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AddressEmbedding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressEmbeddingFindFirstArgs} args - Arguments to find a AddressEmbedding
     * @example
     * // Get one AddressEmbedding
     * const addressEmbedding = await prisma.addressEmbedding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressEmbeddingFindFirstArgs>(args?: SelectSubset<T, AddressEmbeddingFindFirstArgs<ExtArgs>>): Prisma__AddressEmbeddingClient<$Result.GetResult<Prisma.$AddressEmbeddingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AddressEmbedding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressEmbeddingFindFirstOrThrowArgs} args - Arguments to find a AddressEmbedding
     * @example
     * // Get one AddressEmbedding
     * const addressEmbedding = await prisma.addressEmbedding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressEmbeddingFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressEmbeddingFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressEmbeddingClient<$Result.GetResult<Prisma.$AddressEmbeddingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AddressEmbeddings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressEmbeddingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AddressEmbeddings
     * const addressEmbeddings = await prisma.addressEmbedding.findMany()
     * 
     * // Get first 10 AddressEmbeddings
     * const addressEmbeddings = await prisma.addressEmbedding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressEmbeddingWithIdOnly = await prisma.addressEmbedding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressEmbeddingFindManyArgs>(args?: SelectSubset<T, AddressEmbeddingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressEmbeddingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AddressEmbedding.
     * @param {AddressEmbeddingCreateArgs} args - Arguments to create a AddressEmbedding.
     * @example
     * // Create one AddressEmbedding
     * const AddressEmbedding = await prisma.addressEmbedding.create({
     *   data: {
     *     // ... data to create a AddressEmbedding
     *   }
     * })
     * 
     */
    create<T extends AddressEmbeddingCreateArgs>(args: SelectSubset<T, AddressEmbeddingCreateArgs<ExtArgs>>): Prisma__AddressEmbeddingClient<$Result.GetResult<Prisma.$AddressEmbeddingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AddressEmbeddings.
     * @param {AddressEmbeddingCreateManyArgs} args - Arguments to create many AddressEmbeddings.
     * @example
     * // Create many AddressEmbeddings
     * const addressEmbedding = await prisma.addressEmbedding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressEmbeddingCreateManyArgs>(args?: SelectSubset<T, AddressEmbeddingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AddressEmbeddings and returns the data saved in the database.
     * @param {AddressEmbeddingCreateManyAndReturnArgs} args - Arguments to create many AddressEmbeddings.
     * @example
     * // Create many AddressEmbeddings
     * const addressEmbedding = await prisma.addressEmbedding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AddressEmbeddings and only return the `id`
     * const addressEmbeddingWithIdOnly = await prisma.addressEmbedding.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AddressEmbeddingCreateManyAndReturnArgs>(args?: SelectSubset<T, AddressEmbeddingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressEmbeddingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AddressEmbedding.
     * @param {AddressEmbeddingDeleteArgs} args - Arguments to delete one AddressEmbedding.
     * @example
     * // Delete one AddressEmbedding
     * const AddressEmbedding = await prisma.addressEmbedding.delete({
     *   where: {
     *     // ... filter to delete one AddressEmbedding
     *   }
     * })
     * 
     */
    delete<T extends AddressEmbeddingDeleteArgs>(args: SelectSubset<T, AddressEmbeddingDeleteArgs<ExtArgs>>): Prisma__AddressEmbeddingClient<$Result.GetResult<Prisma.$AddressEmbeddingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AddressEmbedding.
     * @param {AddressEmbeddingUpdateArgs} args - Arguments to update one AddressEmbedding.
     * @example
     * // Update one AddressEmbedding
     * const addressEmbedding = await prisma.addressEmbedding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressEmbeddingUpdateArgs>(args: SelectSubset<T, AddressEmbeddingUpdateArgs<ExtArgs>>): Prisma__AddressEmbeddingClient<$Result.GetResult<Prisma.$AddressEmbeddingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AddressEmbeddings.
     * @param {AddressEmbeddingDeleteManyArgs} args - Arguments to filter AddressEmbeddings to delete.
     * @example
     * // Delete a few AddressEmbeddings
     * const { count } = await prisma.addressEmbedding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressEmbeddingDeleteManyArgs>(args?: SelectSubset<T, AddressEmbeddingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AddressEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressEmbeddingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AddressEmbeddings
     * const addressEmbedding = await prisma.addressEmbedding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressEmbeddingUpdateManyArgs>(args: SelectSubset<T, AddressEmbeddingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AddressEmbedding.
     * @param {AddressEmbeddingUpsertArgs} args - Arguments to update or create a AddressEmbedding.
     * @example
     * // Update or create a AddressEmbedding
     * const addressEmbedding = await prisma.addressEmbedding.upsert({
     *   create: {
     *     // ... data to create a AddressEmbedding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AddressEmbedding we want to update
     *   }
     * })
     */
    upsert<T extends AddressEmbeddingUpsertArgs>(args: SelectSubset<T, AddressEmbeddingUpsertArgs<ExtArgs>>): Prisma__AddressEmbeddingClient<$Result.GetResult<Prisma.$AddressEmbeddingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AddressEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressEmbeddingCountArgs} args - Arguments to filter AddressEmbeddings to count.
     * @example
     * // Count the number of AddressEmbeddings
     * const count = await prisma.addressEmbedding.count({
     *   where: {
     *     // ... the filter for the AddressEmbeddings we want to count
     *   }
     * })
    **/
    count<T extends AddressEmbeddingCountArgs>(
      args?: Subset<T, AddressEmbeddingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressEmbeddingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AddressEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressEmbeddingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AddressEmbeddingAggregateArgs>(args: Subset<T, AddressEmbeddingAggregateArgs>): Prisma.PrismaPromise<GetAddressEmbeddingAggregateType<T>>

    /**
     * Group by AddressEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressEmbeddingGroupByArgs} args - Group by arguments.
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
      T extends AddressEmbeddingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressEmbeddingGroupByArgs['orderBy'] }
        : { orderBy?: AddressEmbeddingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AddressEmbeddingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressEmbeddingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AddressEmbedding model
   */
  readonly fields: AddressEmbeddingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AddressEmbedding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressEmbeddingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AddressEmbedding model
   */ 
  interface AddressEmbeddingFieldRefs {
    readonly id: FieldRef<"AddressEmbedding", 'String'>
    readonly chain: FieldRef<"AddressEmbedding", 'String'>
    readonly address: FieldRef<"AddressEmbedding", 'String'>
    readonly dim: FieldRef<"AddressEmbedding", 'Int'>
    readonly vector: FieldRef<"AddressEmbedding", 'Json'>
    readonly model: FieldRef<"AddressEmbedding", 'String'>
    readonly updatedAt: FieldRef<"AddressEmbedding", 'DateTime'>
    readonly createdAt: FieldRef<"AddressEmbedding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AddressEmbedding findUnique
   */
  export type AddressEmbeddingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressEmbedding
     */
    select?: AddressEmbeddingSelect<ExtArgs> | null
    /**
     * Filter, which AddressEmbedding to fetch.
     */
    where: AddressEmbeddingWhereUniqueInput
  }

  /**
   * AddressEmbedding findUniqueOrThrow
   */
  export type AddressEmbeddingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressEmbedding
     */
    select?: AddressEmbeddingSelect<ExtArgs> | null
    /**
     * Filter, which AddressEmbedding to fetch.
     */
    where: AddressEmbeddingWhereUniqueInput
  }

  /**
   * AddressEmbedding findFirst
   */
  export type AddressEmbeddingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressEmbedding
     */
    select?: AddressEmbeddingSelect<ExtArgs> | null
    /**
     * Filter, which AddressEmbedding to fetch.
     */
    where?: AddressEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressEmbeddings to fetch.
     */
    orderBy?: AddressEmbeddingOrderByWithRelationInput | AddressEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddressEmbeddings.
     */
    cursor?: AddressEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddressEmbeddings.
     */
    distinct?: AddressEmbeddingScalarFieldEnum | AddressEmbeddingScalarFieldEnum[]
  }

  /**
   * AddressEmbedding findFirstOrThrow
   */
  export type AddressEmbeddingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressEmbedding
     */
    select?: AddressEmbeddingSelect<ExtArgs> | null
    /**
     * Filter, which AddressEmbedding to fetch.
     */
    where?: AddressEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressEmbeddings to fetch.
     */
    orderBy?: AddressEmbeddingOrderByWithRelationInput | AddressEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AddressEmbeddings.
     */
    cursor?: AddressEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AddressEmbeddings.
     */
    distinct?: AddressEmbeddingScalarFieldEnum | AddressEmbeddingScalarFieldEnum[]
  }

  /**
   * AddressEmbedding findMany
   */
  export type AddressEmbeddingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressEmbedding
     */
    select?: AddressEmbeddingSelect<ExtArgs> | null
    /**
     * Filter, which AddressEmbeddings to fetch.
     */
    where?: AddressEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AddressEmbeddings to fetch.
     */
    orderBy?: AddressEmbeddingOrderByWithRelationInput | AddressEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AddressEmbeddings.
     */
    cursor?: AddressEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AddressEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AddressEmbeddings.
     */
    skip?: number
    distinct?: AddressEmbeddingScalarFieldEnum | AddressEmbeddingScalarFieldEnum[]
  }

  /**
   * AddressEmbedding create
   */
  export type AddressEmbeddingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressEmbedding
     */
    select?: AddressEmbeddingSelect<ExtArgs> | null
    /**
     * The data needed to create a AddressEmbedding.
     */
    data: XOR<AddressEmbeddingCreateInput, AddressEmbeddingUncheckedCreateInput>
  }

  /**
   * AddressEmbedding createMany
   */
  export type AddressEmbeddingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AddressEmbeddings.
     */
    data: AddressEmbeddingCreateManyInput | AddressEmbeddingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AddressEmbedding createManyAndReturn
   */
  export type AddressEmbeddingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressEmbedding
     */
    select?: AddressEmbeddingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AddressEmbeddings.
     */
    data: AddressEmbeddingCreateManyInput | AddressEmbeddingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AddressEmbedding update
   */
  export type AddressEmbeddingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressEmbedding
     */
    select?: AddressEmbeddingSelect<ExtArgs> | null
    /**
     * The data needed to update a AddressEmbedding.
     */
    data: XOR<AddressEmbeddingUpdateInput, AddressEmbeddingUncheckedUpdateInput>
    /**
     * Choose, which AddressEmbedding to update.
     */
    where: AddressEmbeddingWhereUniqueInput
  }

  /**
   * AddressEmbedding updateMany
   */
  export type AddressEmbeddingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AddressEmbeddings.
     */
    data: XOR<AddressEmbeddingUpdateManyMutationInput, AddressEmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which AddressEmbeddings to update
     */
    where?: AddressEmbeddingWhereInput
  }

  /**
   * AddressEmbedding upsert
   */
  export type AddressEmbeddingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressEmbedding
     */
    select?: AddressEmbeddingSelect<ExtArgs> | null
    /**
     * The filter to search for the AddressEmbedding to update in case it exists.
     */
    where: AddressEmbeddingWhereUniqueInput
    /**
     * In case the AddressEmbedding found by the `where` argument doesn't exist, create a new AddressEmbedding with this data.
     */
    create: XOR<AddressEmbeddingCreateInput, AddressEmbeddingUncheckedCreateInput>
    /**
     * In case the AddressEmbedding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressEmbeddingUpdateInput, AddressEmbeddingUncheckedUpdateInput>
  }

  /**
   * AddressEmbedding delete
   */
  export type AddressEmbeddingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressEmbedding
     */
    select?: AddressEmbeddingSelect<ExtArgs> | null
    /**
     * Filter which AddressEmbedding to delete.
     */
    where: AddressEmbeddingWhereUniqueInput
  }

  /**
   * AddressEmbedding deleteMany
   */
  export type AddressEmbeddingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AddressEmbeddings to delete
     */
    where?: AddressEmbeddingWhereInput
  }

  /**
   * AddressEmbedding without action
   */
  export type AddressEmbeddingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AddressEmbedding
     */
    select?: AddressEmbeddingSelect<ExtArgs> | null
  }


  /**
   * Model NlQuery
   */

  export type AggregateNlQuery = {
    _count: NlQueryCountAggregateOutputType | null
    _avg: NlQueryAvgAggregateOutputType | null
    _sum: NlQuerySumAggregateOutputType | null
    _min: NlQueryMinAggregateOutputType | null
    _max: NlQueryMaxAggregateOutputType | null
  }

  export type NlQueryAvgAggregateOutputType = {
    rowCount: number | null
    latencyMs: number | null
  }

  export type NlQuerySumAggregateOutputType = {
    rowCount: number | null
    latencyMs: number | null
  }

  export type NlQueryMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    question: string | null
    status: $Enums.NlQueryStatus | null
    metric: string | null
    rowCount: number | null
    latencyMs: number | null
    error: string | null
    createdAt: Date | null
  }

  export type NlQueryMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    question: string | null
    status: $Enums.NlQueryStatus | null
    metric: string | null
    rowCount: number | null
    latencyMs: number | null
    error: string | null
    createdAt: Date | null
  }

  export type NlQueryCountAggregateOutputType = {
    id: number
    orgId: number
    question: number
    status: number
    metric: number
    plan: number
    rowCount: number
    latencyMs: number
    error: number
    createdAt: number
    _all: number
  }


  export type NlQueryAvgAggregateInputType = {
    rowCount?: true
    latencyMs?: true
  }

  export type NlQuerySumAggregateInputType = {
    rowCount?: true
    latencyMs?: true
  }

  export type NlQueryMinAggregateInputType = {
    id?: true
    orgId?: true
    question?: true
    status?: true
    metric?: true
    rowCount?: true
    latencyMs?: true
    error?: true
    createdAt?: true
  }

  export type NlQueryMaxAggregateInputType = {
    id?: true
    orgId?: true
    question?: true
    status?: true
    metric?: true
    rowCount?: true
    latencyMs?: true
    error?: true
    createdAt?: true
  }

  export type NlQueryCountAggregateInputType = {
    id?: true
    orgId?: true
    question?: true
    status?: true
    metric?: true
    plan?: true
    rowCount?: true
    latencyMs?: true
    error?: true
    createdAt?: true
    _all?: true
  }

  export type NlQueryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NlQuery to aggregate.
     */
    where?: NlQueryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NlQueries to fetch.
     */
    orderBy?: NlQueryOrderByWithRelationInput | NlQueryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NlQueryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NlQueries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NlQueries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NlQueries
    **/
    _count?: true | NlQueryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NlQueryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NlQuerySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NlQueryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NlQueryMaxAggregateInputType
  }

  export type GetNlQueryAggregateType<T extends NlQueryAggregateArgs> = {
        [P in keyof T & keyof AggregateNlQuery]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNlQuery[P]>
      : GetScalarType<T[P], AggregateNlQuery[P]>
  }




  export type NlQueryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NlQueryWhereInput
    orderBy?: NlQueryOrderByWithAggregationInput | NlQueryOrderByWithAggregationInput[]
    by: NlQueryScalarFieldEnum[] | NlQueryScalarFieldEnum
    having?: NlQueryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NlQueryCountAggregateInputType | true
    _avg?: NlQueryAvgAggregateInputType
    _sum?: NlQuerySumAggregateInputType
    _min?: NlQueryMinAggregateInputType
    _max?: NlQueryMaxAggregateInputType
  }

  export type NlQueryGroupByOutputType = {
    id: string
    orgId: string | null
    question: string
    status: $Enums.NlQueryStatus
    metric: string | null
    plan: JsonValue
    rowCount: number | null
    latencyMs: number | null
    error: string | null
    createdAt: Date
    _count: NlQueryCountAggregateOutputType | null
    _avg: NlQueryAvgAggregateOutputType | null
    _sum: NlQuerySumAggregateOutputType | null
    _min: NlQueryMinAggregateOutputType | null
    _max: NlQueryMaxAggregateOutputType | null
  }

  type GetNlQueryGroupByPayload<T extends NlQueryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NlQueryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NlQueryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NlQueryGroupByOutputType[P]>
            : GetScalarType<T[P], NlQueryGroupByOutputType[P]>
        }
      >
    >


  export type NlQuerySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    question?: boolean
    status?: boolean
    metric?: boolean
    plan?: boolean
    rowCount?: boolean
    latencyMs?: boolean
    error?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["nlQuery"]>

  export type NlQuerySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    question?: boolean
    status?: boolean
    metric?: boolean
    plan?: boolean
    rowCount?: boolean
    latencyMs?: boolean
    error?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["nlQuery"]>

  export type NlQuerySelectScalar = {
    id?: boolean
    orgId?: boolean
    question?: boolean
    status?: boolean
    metric?: boolean
    plan?: boolean
    rowCount?: boolean
    latencyMs?: boolean
    error?: boolean
    createdAt?: boolean
  }


  export type $NlQueryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NlQuery"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string | null
      question: string
      status: $Enums.NlQueryStatus
      metric: string | null
      plan: Prisma.JsonValue
      rowCount: number | null
      latencyMs: number | null
      error: string | null
      createdAt: Date
    }, ExtArgs["result"]["nlQuery"]>
    composites: {}
  }

  type NlQueryGetPayload<S extends boolean | null | undefined | NlQueryDefaultArgs> = $Result.GetResult<Prisma.$NlQueryPayload, S>

  type NlQueryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NlQueryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NlQueryCountAggregateInputType | true
    }

  export interface NlQueryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NlQuery'], meta: { name: 'NlQuery' } }
    /**
     * Find zero or one NlQuery that matches the filter.
     * @param {NlQueryFindUniqueArgs} args - Arguments to find a NlQuery
     * @example
     * // Get one NlQuery
     * const nlQuery = await prisma.nlQuery.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NlQueryFindUniqueArgs>(args: SelectSubset<T, NlQueryFindUniqueArgs<ExtArgs>>): Prisma__NlQueryClient<$Result.GetResult<Prisma.$NlQueryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one NlQuery that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NlQueryFindUniqueOrThrowArgs} args - Arguments to find a NlQuery
     * @example
     * // Get one NlQuery
     * const nlQuery = await prisma.nlQuery.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NlQueryFindUniqueOrThrowArgs>(args: SelectSubset<T, NlQueryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NlQueryClient<$Result.GetResult<Prisma.$NlQueryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first NlQuery that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NlQueryFindFirstArgs} args - Arguments to find a NlQuery
     * @example
     * // Get one NlQuery
     * const nlQuery = await prisma.nlQuery.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NlQueryFindFirstArgs>(args?: SelectSubset<T, NlQueryFindFirstArgs<ExtArgs>>): Prisma__NlQueryClient<$Result.GetResult<Prisma.$NlQueryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first NlQuery that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NlQueryFindFirstOrThrowArgs} args - Arguments to find a NlQuery
     * @example
     * // Get one NlQuery
     * const nlQuery = await prisma.nlQuery.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NlQueryFindFirstOrThrowArgs>(args?: SelectSubset<T, NlQueryFindFirstOrThrowArgs<ExtArgs>>): Prisma__NlQueryClient<$Result.GetResult<Prisma.$NlQueryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more NlQueries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NlQueryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NlQueries
     * const nlQueries = await prisma.nlQuery.findMany()
     * 
     * // Get first 10 NlQueries
     * const nlQueries = await prisma.nlQuery.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nlQueryWithIdOnly = await prisma.nlQuery.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NlQueryFindManyArgs>(args?: SelectSubset<T, NlQueryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NlQueryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a NlQuery.
     * @param {NlQueryCreateArgs} args - Arguments to create a NlQuery.
     * @example
     * // Create one NlQuery
     * const NlQuery = await prisma.nlQuery.create({
     *   data: {
     *     // ... data to create a NlQuery
     *   }
     * })
     * 
     */
    create<T extends NlQueryCreateArgs>(args: SelectSubset<T, NlQueryCreateArgs<ExtArgs>>): Prisma__NlQueryClient<$Result.GetResult<Prisma.$NlQueryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many NlQueries.
     * @param {NlQueryCreateManyArgs} args - Arguments to create many NlQueries.
     * @example
     * // Create many NlQueries
     * const nlQuery = await prisma.nlQuery.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NlQueryCreateManyArgs>(args?: SelectSubset<T, NlQueryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NlQueries and returns the data saved in the database.
     * @param {NlQueryCreateManyAndReturnArgs} args - Arguments to create many NlQueries.
     * @example
     * // Create many NlQueries
     * const nlQuery = await prisma.nlQuery.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NlQueries and only return the `id`
     * const nlQueryWithIdOnly = await prisma.nlQuery.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NlQueryCreateManyAndReturnArgs>(args?: SelectSubset<T, NlQueryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NlQueryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a NlQuery.
     * @param {NlQueryDeleteArgs} args - Arguments to delete one NlQuery.
     * @example
     * // Delete one NlQuery
     * const NlQuery = await prisma.nlQuery.delete({
     *   where: {
     *     // ... filter to delete one NlQuery
     *   }
     * })
     * 
     */
    delete<T extends NlQueryDeleteArgs>(args: SelectSubset<T, NlQueryDeleteArgs<ExtArgs>>): Prisma__NlQueryClient<$Result.GetResult<Prisma.$NlQueryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one NlQuery.
     * @param {NlQueryUpdateArgs} args - Arguments to update one NlQuery.
     * @example
     * // Update one NlQuery
     * const nlQuery = await prisma.nlQuery.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NlQueryUpdateArgs>(args: SelectSubset<T, NlQueryUpdateArgs<ExtArgs>>): Prisma__NlQueryClient<$Result.GetResult<Prisma.$NlQueryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more NlQueries.
     * @param {NlQueryDeleteManyArgs} args - Arguments to filter NlQueries to delete.
     * @example
     * // Delete a few NlQueries
     * const { count } = await prisma.nlQuery.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NlQueryDeleteManyArgs>(args?: SelectSubset<T, NlQueryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NlQueries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NlQueryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NlQueries
     * const nlQuery = await prisma.nlQuery.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NlQueryUpdateManyArgs>(args: SelectSubset<T, NlQueryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one NlQuery.
     * @param {NlQueryUpsertArgs} args - Arguments to update or create a NlQuery.
     * @example
     * // Update or create a NlQuery
     * const nlQuery = await prisma.nlQuery.upsert({
     *   create: {
     *     // ... data to create a NlQuery
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NlQuery we want to update
     *   }
     * })
     */
    upsert<T extends NlQueryUpsertArgs>(args: SelectSubset<T, NlQueryUpsertArgs<ExtArgs>>): Prisma__NlQueryClient<$Result.GetResult<Prisma.$NlQueryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of NlQueries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NlQueryCountArgs} args - Arguments to filter NlQueries to count.
     * @example
     * // Count the number of NlQueries
     * const count = await prisma.nlQuery.count({
     *   where: {
     *     // ... the filter for the NlQueries we want to count
     *   }
     * })
    **/
    count<T extends NlQueryCountArgs>(
      args?: Subset<T, NlQueryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NlQueryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NlQuery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NlQueryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NlQueryAggregateArgs>(args: Subset<T, NlQueryAggregateArgs>): Prisma.PrismaPromise<GetNlQueryAggregateType<T>>

    /**
     * Group by NlQuery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NlQueryGroupByArgs} args - Group by arguments.
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
      T extends NlQueryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NlQueryGroupByArgs['orderBy'] }
        : { orderBy?: NlQueryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NlQueryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNlQueryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NlQuery model
   */
  readonly fields: NlQueryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NlQuery.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NlQueryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the NlQuery model
   */ 
  interface NlQueryFieldRefs {
    readonly id: FieldRef<"NlQuery", 'String'>
    readonly orgId: FieldRef<"NlQuery", 'String'>
    readonly question: FieldRef<"NlQuery", 'String'>
    readonly status: FieldRef<"NlQuery", 'NlQueryStatus'>
    readonly metric: FieldRef<"NlQuery", 'String'>
    readonly plan: FieldRef<"NlQuery", 'Json'>
    readonly rowCount: FieldRef<"NlQuery", 'Int'>
    readonly latencyMs: FieldRef<"NlQuery", 'Int'>
    readonly error: FieldRef<"NlQuery", 'String'>
    readonly createdAt: FieldRef<"NlQuery", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NlQuery findUnique
   */
  export type NlQueryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NlQuery
     */
    select?: NlQuerySelect<ExtArgs> | null
    /**
     * Filter, which NlQuery to fetch.
     */
    where: NlQueryWhereUniqueInput
  }

  /**
   * NlQuery findUniqueOrThrow
   */
  export type NlQueryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NlQuery
     */
    select?: NlQuerySelect<ExtArgs> | null
    /**
     * Filter, which NlQuery to fetch.
     */
    where: NlQueryWhereUniqueInput
  }

  /**
   * NlQuery findFirst
   */
  export type NlQueryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NlQuery
     */
    select?: NlQuerySelect<ExtArgs> | null
    /**
     * Filter, which NlQuery to fetch.
     */
    where?: NlQueryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NlQueries to fetch.
     */
    orderBy?: NlQueryOrderByWithRelationInput | NlQueryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NlQueries.
     */
    cursor?: NlQueryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NlQueries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NlQueries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NlQueries.
     */
    distinct?: NlQueryScalarFieldEnum | NlQueryScalarFieldEnum[]
  }

  /**
   * NlQuery findFirstOrThrow
   */
  export type NlQueryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NlQuery
     */
    select?: NlQuerySelect<ExtArgs> | null
    /**
     * Filter, which NlQuery to fetch.
     */
    where?: NlQueryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NlQueries to fetch.
     */
    orderBy?: NlQueryOrderByWithRelationInput | NlQueryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NlQueries.
     */
    cursor?: NlQueryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NlQueries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NlQueries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NlQueries.
     */
    distinct?: NlQueryScalarFieldEnum | NlQueryScalarFieldEnum[]
  }

  /**
   * NlQuery findMany
   */
  export type NlQueryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NlQuery
     */
    select?: NlQuerySelect<ExtArgs> | null
    /**
     * Filter, which NlQueries to fetch.
     */
    where?: NlQueryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NlQueries to fetch.
     */
    orderBy?: NlQueryOrderByWithRelationInput | NlQueryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NlQueries.
     */
    cursor?: NlQueryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NlQueries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NlQueries.
     */
    skip?: number
    distinct?: NlQueryScalarFieldEnum | NlQueryScalarFieldEnum[]
  }

  /**
   * NlQuery create
   */
  export type NlQueryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NlQuery
     */
    select?: NlQuerySelect<ExtArgs> | null
    /**
     * The data needed to create a NlQuery.
     */
    data: XOR<NlQueryCreateInput, NlQueryUncheckedCreateInput>
  }

  /**
   * NlQuery createMany
   */
  export type NlQueryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NlQueries.
     */
    data: NlQueryCreateManyInput | NlQueryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NlQuery createManyAndReturn
   */
  export type NlQueryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NlQuery
     */
    select?: NlQuerySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many NlQueries.
     */
    data: NlQueryCreateManyInput | NlQueryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NlQuery update
   */
  export type NlQueryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NlQuery
     */
    select?: NlQuerySelect<ExtArgs> | null
    /**
     * The data needed to update a NlQuery.
     */
    data: XOR<NlQueryUpdateInput, NlQueryUncheckedUpdateInput>
    /**
     * Choose, which NlQuery to update.
     */
    where: NlQueryWhereUniqueInput
  }

  /**
   * NlQuery updateMany
   */
  export type NlQueryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NlQueries.
     */
    data: XOR<NlQueryUpdateManyMutationInput, NlQueryUncheckedUpdateManyInput>
    /**
     * Filter which NlQueries to update
     */
    where?: NlQueryWhereInput
  }

  /**
   * NlQuery upsert
   */
  export type NlQueryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NlQuery
     */
    select?: NlQuerySelect<ExtArgs> | null
    /**
     * The filter to search for the NlQuery to update in case it exists.
     */
    where: NlQueryWhereUniqueInput
    /**
     * In case the NlQuery found by the `where` argument doesn't exist, create a new NlQuery with this data.
     */
    create: XOR<NlQueryCreateInput, NlQueryUncheckedCreateInput>
    /**
     * In case the NlQuery was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NlQueryUpdateInput, NlQueryUncheckedUpdateInput>
  }

  /**
   * NlQuery delete
   */
  export type NlQueryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NlQuery
     */
    select?: NlQuerySelect<ExtArgs> | null
    /**
     * Filter which NlQuery to delete.
     */
    where: NlQueryWhereUniqueInput
  }

  /**
   * NlQuery deleteMany
   */
  export type NlQueryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NlQueries to delete
     */
    where?: NlQueryWhereInput
  }

  /**
   * NlQuery without action
   */
  export type NlQueryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NlQuery
     */
    select?: NlQuerySelect<ExtArgs> | null
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


  export const EntityScalarFieldEnum: {
    id: 'id',
    chain: 'chain',
    label: 'label',
    category: 'category',
    status: 'status',
    addressCount: 'addressCount',
    riskScore: 'riskScore',
    sanctioned: 'sanctioned',
    firstSeenAt: 'firstSeenAt',
    lastSeenAt: 'lastSeenAt',
    resolvedAt: 'resolvedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EntityScalarFieldEnum = (typeof EntityScalarFieldEnum)[keyof typeof EntityScalarFieldEnum]


  export const EntityMemberScalarFieldEnum: {
    id: 'id',
    entityId: 'entityId',
    chain: 'chain',
    address: 'address',
    transferEvents: 'transferEvents',
    label: 'label',
    addedAt: 'addedAt'
  };

  export type EntityMemberScalarFieldEnum = (typeof EntityMemberScalarFieldEnum)[keyof typeof EntityMemberScalarFieldEnum]


  export const ResolutionRunScalarFieldEnum: {
    id: 'id',
    status: 'status',
    trigger: 'trigger',
    chain: 'chain',
    lookbackDays: 'lookbackDays',
    addressCount: 'addressCount',
    entityCount: 'entityCount',
    linkCount: 'linkCount',
    durationMs: 'durationMs',
    error: 'error',
    startedAt: 'startedAt',
    finishedAt: 'finishedAt',
    createdAt: 'createdAt'
  };

  export type ResolutionRunScalarFieldEnum = (typeof ResolutionRunScalarFieldEnum)[keyof typeof ResolutionRunScalarFieldEnum]


  export const AddressEmbeddingScalarFieldEnum: {
    id: 'id',
    chain: 'chain',
    address: 'address',
    dim: 'dim',
    vector: 'vector',
    model: 'model',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  };

  export type AddressEmbeddingScalarFieldEnum = (typeof AddressEmbeddingScalarFieldEnum)[keyof typeof AddressEmbeddingScalarFieldEnum]


  export const NlQueryScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    question: 'question',
    status: 'status',
    metric: 'metric',
    plan: 'plan',
    rowCount: 'rowCount',
    latencyMs: 'latencyMs',
    error: 'error',
    createdAt: 'createdAt'
  };

  export type NlQueryScalarFieldEnum = (typeof NlQueryScalarFieldEnum)[keyof typeof NlQueryScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'EntityStatus'
   */
  export type EnumEntityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EntityStatus'>
    


  /**
   * Reference to a field of type 'EntityStatus[]'
   */
  export type ListEnumEntityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EntityStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ResolutionStatus'
   */
  export type EnumResolutionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResolutionStatus'>
    


  /**
   * Reference to a field of type 'ResolutionStatus[]'
   */
  export type ListEnumResolutionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResolutionStatus[]'>
    


  /**
   * Reference to a field of type 'RunTrigger'
   */
  export type EnumRunTriggerFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RunTrigger'>
    


  /**
   * Reference to a field of type 'RunTrigger[]'
   */
  export type ListEnumRunTriggerFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RunTrigger[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'NlQueryStatus'
   */
  export type EnumNlQueryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NlQueryStatus'>
    


  /**
   * Reference to a field of type 'NlQueryStatus[]'
   */
  export type ListEnumNlQueryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NlQueryStatus[]'>
    


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


  export type EntityWhereInput = {
    AND?: EntityWhereInput | EntityWhereInput[]
    OR?: EntityWhereInput[]
    NOT?: EntityWhereInput | EntityWhereInput[]
    id?: StringFilter<"Entity"> | string
    chain?: StringFilter<"Entity"> | string
    label?: StringNullableFilter<"Entity"> | string | null
    category?: StringNullableFilter<"Entity"> | string | null
    status?: EnumEntityStatusFilter<"Entity"> | $Enums.EntityStatus
    addressCount?: IntFilter<"Entity"> | number
    riskScore?: IntFilter<"Entity"> | number
    sanctioned?: BoolFilter<"Entity"> | boolean
    firstSeenAt?: DateTimeNullableFilter<"Entity"> | Date | string | null
    lastSeenAt?: DateTimeNullableFilter<"Entity"> | Date | string | null
    resolvedAt?: DateTimeFilter<"Entity"> | Date | string
    createdAt?: DateTimeFilter<"Entity"> | Date | string
    updatedAt?: DateTimeFilter<"Entity"> | Date | string
    members?: EntityMemberListRelationFilter
  }

  export type EntityOrderByWithRelationInput = {
    id?: SortOrder
    chain?: SortOrder
    label?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    status?: SortOrder
    addressCount?: SortOrder
    riskScore?: SortOrder
    sanctioned?: SortOrder
    firstSeenAt?: SortOrderInput | SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    members?: EntityMemberOrderByRelationAggregateInput
  }

  export type EntityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EntityWhereInput | EntityWhereInput[]
    OR?: EntityWhereInput[]
    NOT?: EntityWhereInput | EntityWhereInput[]
    chain?: StringFilter<"Entity"> | string
    label?: StringNullableFilter<"Entity"> | string | null
    category?: StringNullableFilter<"Entity"> | string | null
    status?: EnumEntityStatusFilter<"Entity"> | $Enums.EntityStatus
    addressCount?: IntFilter<"Entity"> | number
    riskScore?: IntFilter<"Entity"> | number
    sanctioned?: BoolFilter<"Entity"> | boolean
    firstSeenAt?: DateTimeNullableFilter<"Entity"> | Date | string | null
    lastSeenAt?: DateTimeNullableFilter<"Entity"> | Date | string | null
    resolvedAt?: DateTimeFilter<"Entity"> | Date | string
    createdAt?: DateTimeFilter<"Entity"> | Date | string
    updatedAt?: DateTimeFilter<"Entity"> | Date | string
    members?: EntityMemberListRelationFilter
  }, "id">

  export type EntityOrderByWithAggregationInput = {
    id?: SortOrder
    chain?: SortOrder
    label?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    status?: SortOrder
    addressCount?: SortOrder
    riskScore?: SortOrder
    sanctioned?: SortOrder
    firstSeenAt?: SortOrderInput | SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EntityCountOrderByAggregateInput
    _avg?: EntityAvgOrderByAggregateInput
    _max?: EntityMaxOrderByAggregateInput
    _min?: EntityMinOrderByAggregateInput
    _sum?: EntitySumOrderByAggregateInput
  }

  export type EntityScalarWhereWithAggregatesInput = {
    AND?: EntityScalarWhereWithAggregatesInput | EntityScalarWhereWithAggregatesInput[]
    OR?: EntityScalarWhereWithAggregatesInput[]
    NOT?: EntityScalarWhereWithAggregatesInput | EntityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Entity"> | string
    chain?: StringWithAggregatesFilter<"Entity"> | string
    label?: StringNullableWithAggregatesFilter<"Entity"> | string | null
    category?: StringNullableWithAggregatesFilter<"Entity"> | string | null
    status?: EnumEntityStatusWithAggregatesFilter<"Entity"> | $Enums.EntityStatus
    addressCount?: IntWithAggregatesFilter<"Entity"> | number
    riskScore?: IntWithAggregatesFilter<"Entity"> | number
    sanctioned?: BoolWithAggregatesFilter<"Entity"> | boolean
    firstSeenAt?: DateTimeNullableWithAggregatesFilter<"Entity"> | Date | string | null
    lastSeenAt?: DateTimeNullableWithAggregatesFilter<"Entity"> | Date | string | null
    resolvedAt?: DateTimeWithAggregatesFilter<"Entity"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Entity"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Entity"> | Date | string
  }

  export type EntityMemberWhereInput = {
    AND?: EntityMemberWhereInput | EntityMemberWhereInput[]
    OR?: EntityMemberWhereInput[]
    NOT?: EntityMemberWhereInput | EntityMemberWhereInput[]
    id?: StringFilter<"EntityMember"> | string
    entityId?: StringFilter<"EntityMember"> | string
    chain?: StringFilter<"EntityMember"> | string
    address?: StringFilter<"EntityMember"> | string
    transferEvents?: IntFilter<"EntityMember"> | number
    label?: StringNullableFilter<"EntityMember"> | string | null
    addedAt?: DateTimeFilter<"EntityMember"> | Date | string
    entity?: XOR<EntityRelationFilter, EntityWhereInput>
  }

  export type EntityMemberOrderByWithRelationInput = {
    id?: SortOrder
    entityId?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    transferEvents?: SortOrder
    label?: SortOrderInput | SortOrder
    addedAt?: SortOrder
    entity?: EntityOrderByWithRelationInput
  }

  export type EntityMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    chain_address?: EntityMemberChainAddressCompoundUniqueInput
    AND?: EntityMemberWhereInput | EntityMemberWhereInput[]
    OR?: EntityMemberWhereInput[]
    NOT?: EntityMemberWhereInput | EntityMemberWhereInput[]
    entityId?: StringFilter<"EntityMember"> | string
    chain?: StringFilter<"EntityMember"> | string
    address?: StringFilter<"EntityMember"> | string
    transferEvents?: IntFilter<"EntityMember"> | number
    label?: StringNullableFilter<"EntityMember"> | string | null
    addedAt?: DateTimeFilter<"EntityMember"> | Date | string
    entity?: XOR<EntityRelationFilter, EntityWhereInput>
  }, "id" | "chain_address">

  export type EntityMemberOrderByWithAggregationInput = {
    id?: SortOrder
    entityId?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    transferEvents?: SortOrder
    label?: SortOrderInput | SortOrder
    addedAt?: SortOrder
    _count?: EntityMemberCountOrderByAggregateInput
    _avg?: EntityMemberAvgOrderByAggregateInput
    _max?: EntityMemberMaxOrderByAggregateInput
    _min?: EntityMemberMinOrderByAggregateInput
    _sum?: EntityMemberSumOrderByAggregateInput
  }

  export type EntityMemberScalarWhereWithAggregatesInput = {
    AND?: EntityMemberScalarWhereWithAggregatesInput | EntityMemberScalarWhereWithAggregatesInput[]
    OR?: EntityMemberScalarWhereWithAggregatesInput[]
    NOT?: EntityMemberScalarWhereWithAggregatesInput | EntityMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EntityMember"> | string
    entityId?: StringWithAggregatesFilter<"EntityMember"> | string
    chain?: StringWithAggregatesFilter<"EntityMember"> | string
    address?: StringWithAggregatesFilter<"EntityMember"> | string
    transferEvents?: IntWithAggregatesFilter<"EntityMember"> | number
    label?: StringNullableWithAggregatesFilter<"EntityMember"> | string | null
    addedAt?: DateTimeWithAggregatesFilter<"EntityMember"> | Date | string
  }

  export type ResolutionRunWhereInput = {
    AND?: ResolutionRunWhereInput | ResolutionRunWhereInput[]
    OR?: ResolutionRunWhereInput[]
    NOT?: ResolutionRunWhereInput | ResolutionRunWhereInput[]
    id?: StringFilter<"ResolutionRun"> | string
    status?: EnumResolutionStatusFilter<"ResolutionRun"> | $Enums.ResolutionStatus
    trigger?: EnumRunTriggerFilter<"ResolutionRun"> | $Enums.RunTrigger
    chain?: StringNullableFilter<"ResolutionRun"> | string | null
    lookbackDays?: IntFilter<"ResolutionRun"> | number
    addressCount?: IntNullableFilter<"ResolutionRun"> | number | null
    entityCount?: IntNullableFilter<"ResolutionRun"> | number | null
    linkCount?: IntNullableFilter<"ResolutionRun"> | number | null
    durationMs?: IntNullableFilter<"ResolutionRun"> | number | null
    error?: StringNullableFilter<"ResolutionRun"> | string | null
    startedAt?: DateTimeNullableFilter<"ResolutionRun"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"ResolutionRun"> | Date | string | null
    createdAt?: DateTimeFilter<"ResolutionRun"> | Date | string
  }

  export type ResolutionRunOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    trigger?: SortOrder
    chain?: SortOrderInput | SortOrder
    lookbackDays?: SortOrder
    addressCount?: SortOrderInput | SortOrder
    entityCount?: SortOrderInput | SortOrder
    linkCount?: SortOrderInput | SortOrder
    durationMs?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    finishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type ResolutionRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResolutionRunWhereInput | ResolutionRunWhereInput[]
    OR?: ResolutionRunWhereInput[]
    NOT?: ResolutionRunWhereInput | ResolutionRunWhereInput[]
    status?: EnumResolutionStatusFilter<"ResolutionRun"> | $Enums.ResolutionStatus
    trigger?: EnumRunTriggerFilter<"ResolutionRun"> | $Enums.RunTrigger
    chain?: StringNullableFilter<"ResolutionRun"> | string | null
    lookbackDays?: IntFilter<"ResolutionRun"> | number
    addressCount?: IntNullableFilter<"ResolutionRun"> | number | null
    entityCount?: IntNullableFilter<"ResolutionRun"> | number | null
    linkCount?: IntNullableFilter<"ResolutionRun"> | number | null
    durationMs?: IntNullableFilter<"ResolutionRun"> | number | null
    error?: StringNullableFilter<"ResolutionRun"> | string | null
    startedAt?: DateTimeNullableFilter<"ResolutionRun"> | Date | string | null
    finishedAt?: DateTimeNullableFilter<"ResolutionRun"> | Date | string | null
    createdAt?: DateTimeFilter<"ResolutionRun"> | Date | string
  }, "id">

  export type ResolutionRunOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    trigger?: SortOrder
    chain?: SortOrderInput | SortOrder
    lookbackDays?: SortOrder
    addressCount?: SortOrderInput | SortOrder
    entityCount?: SortOrderInput | SortOrder
    linkCount?: SortOrderInput | SortOrder
    durationMs?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    startedAt?: SortOrderInput | SortOrder
    finishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ResolutionRunCountOrderByAggregateInput
    _avg?: ResolutionRunAvgOrderByAggregateInput
    _max?: ResolutionRunMaxOrderByAggregateInput
    _min?: ResolutionRunMinOrderByAggregateInput
    _sum?: ResolutionRunSumOrderByAggregateInput
  }

  export type ResolutionRunScalarWhereWithAggregatesInput = {
    AND?: ResolutionRunScalarWhereWithAggregatesInput | ResolutionRunScalarWhereWithAggregatesInput[]
    OR?: ResolutionRunScalarWhereWithAggregatesInput[]
    NOT?: ResolutionRunScalarWhereWithAggregatesInput | ResolutionRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ResolutionRun"> | string
    status?: EnumResolutionStatusWithAggregatesFilter<"ResolutionRun"> | $Enums.ResolutionStatus
    trigger?: EnumRunTriggerWithAggregatesFilter<"ResolutionRun"> | $Enums.RunTrigger
    chain?: StringNullableWithAggregatesFilter<"ResolutionRun"> | string | null
    lookbackDays?: IntWithAggregatesFilter<"ResolutionRun"> | number
    addressCount?: IntNullableWithAggregatesFilter<"ResolutionRun"> | number | null
    entityCount?: IntNullableWithAggregatesFilter<"ResolutionRun"> | number | null
    linkCount?: IntNullableWithAggregatesFilter<"ResolutionRun"> | number | null
    durationMs?: IntNullableWithAggregatesFilter<"ResolutionRun"> | number | null
    error?: StringNullableWithAggregatesFilter<"ResolutionRun"> | string | null
    startedAt?: DateTimeNullableWithAggregatesFilter<"ResolutionRun"> | Date | string | null
    finishedAt?: DateTimeNullableWithAggregatesFilter<"ResolutionRun"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ResolutionRun"> | Date | string
  }

  export type AddressEmbeddingWhereInput = {
    AND?: AddressEmbeddingWhereInput | AddressEmbeddingWhereInput[]
    OR?: AddressEmbeddingWhereInput[]
    NOT?: AddressEmbeddingWhereInput | AddressEmbeddingWhereInput[]
    id?: StringFilter<"AddressEmbedding"> | string
    chain?: StringFilter<"AddressEmbedding"> | string
    address?: StringFilter<"AddressEmbedding"> | string
    dim?: IntFilter<"AddressEmbedding"> | number
    vector?: JsonFilter<"AddressEmbedding">
    model?: StringFilter<"AddressEmbedding"> | string
    updatedAt?: DateTimeFilter<"AddressEmbedding"> | Date | string
    createdAt?: DateTimeFilter<"AddressEmbedding"> | Date | string
  }

  export type AddressEmbeddingOrderByWithRelationInput = {
    id?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    dim?: SortOrder
    vector?: SortOrder
    model?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AddressEmbeddingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    chain_address?: AddressEmbeddingChainAddressCompoundUniqueInput
    AND?: AddressEmbeddingWhereInput | AddressEmbeddingWhereInput[]
    OR?: AddressEmbeddingWhereInput[]
    NOT?: AddressEmbeddingWhereInput | AddressEmbeddingWhereInput[]
    chain?: StringFilter<"AddressEmbedding"> | string
    address?: StringFilter<"AddressEmbedding"> | string
    dim?: IntFilter<"AddressEmbedding"> | number
    vector?: JsonFilter<"AddressEmbedding">
    model?: StringFilter<"AddressEmbedding"> | string
    updatedAt?: DateTimeFilter<"AddressEmbedding"> | Date | string
    createdAt?: DateTimeFilter<"AddressEmbedding"> | Date | string
  }, "id" | "chain_address">

  export type AddressEmbeddingOrderByWithAggregationInput = {
    id?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    dim?: SortOrder
    vector?: SortOrder
    model?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    _count?: AddressEmbeddingCountOrderByAggregateInput
    _avg?: AddressEmbeddingAvgOrderByAggregateInput
    _max?: AddressEmbeddingMaxOrderByAggregateInput
    _min?: AddressEmbeddingMinOrderByAggregateInput
    _sum?: AddressEmbeddingSumOrderByAggregateInput
  }

  export type AddressEmbeddingScalarWhereWithAggregatesInput = {
    AND?: AddressEmbeddingScalarWhereWithAggregatesInput | AddressEmbeddingScalarWhereWithAggregatesInput[]
    OR?: AddressEmbeddingScalarWhereWithAggregatesInput[]
    NOT?: AddressEmbeddingScalarWhereWithAggregatesInput | AddressEmbeddingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AddressEmbedding"> | string
    chain?: StringWithAggregatesFilter<"AddressEmbedding"> | string
    address?: StringWithAggregatesFilter<"AddressEmbedding"> | string
    dim?: IntWithAggregatesFilter<"AddressEmbedding"> | number
    vector?: JsonWithAggregatesFilter<"AddressEmbedding">
    model?: StringWithAggregatesFilter<"AddressEmbedding"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"AddressEmbedding"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"AddressEmbedding"> | Date | string
  }

  export type NlQueryWhereInput = {
    AND?: NlQueryWhereInput | NlQueryWhereInput[]
    OR?: NlQueryWhereInput[]
    NOT?: NlQueryWhereInput | NlQueryWhereInput[]
    id?: StringFilter<"NlQuery"> | string
    orgId?: StringNullableFilter<"NlQuery"> | string | null
    question?: StringFilter<"NlQuery"> | string
    status?: EnumNlQueryStatusFilter<"NlQuery"> | $Enums.NlQueryStatus
    metric?: StringNullableFilter<"NlQuery"> | string | null
    plan?: JsonFilter<"NlQuery">
    rowCount?: IntNullableFilter<"NlQuery"> | number | null
    latencyMs?: IntNullableFilter<"NlQuery"> | number | null
    error?: StringNullableFilter<"NlQuery"> | string | null
    createdAt?: DateTimeFilter<"NlQuery"> | Date | string
  }

  export type NlQueryOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrderInput | SortOrder
    question?: SortOrder
    status?: SortOrder
    metric?: SortOrderInput | SortOrder
    plan?: SortOrder
    rowCount?: SortOrderInput | SortOrder
    latencyMs?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type NlQueryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NlQueryWhereInput | NlQueryWhereInput[]
    OR?: NlQueryWhereInput[]
    NOT?: NlQueryWhereInput | NlQueryWhereInput[]
    orgId?: StringNullableFilter<"NlQuery"> | string | null
    question?: StringFilter<"NlQuery"> | string
    status?: EnumNlQueryStatusFilter<"NlQuery"> | $Enums.NlQueryStatus
    metric?: StringNullableFilter<"NlQuery"> | string | null
    plan?: JsonFilter<"NlQuery">
    rowCount?: IntNullableFilter<"NlQuery"> | number | null
    latencyMs?: IntNullableFilter<"NlQuery"> | number | null
    error?: StringNullableFilter<"NlQuery"> | string | null
    createdAt?: DateTimeFilter<"NlQuery"> | Date | string
  }, "id">

  export type NlQueryOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrderInput | SortOrder
    question?: SortOrder
    status?: SortOrder
    metric?: SortOrderInput | SortOrder
    plan?: SortOrder
    rowCount?: SortOrderInput | SortOrder
    latencyMs?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NlQueryCountOrderByAggregateInput
    _avg?: NlQueryAvgOrderByAggregateInput
    _max?: NlQueryMaxOrderByAggregateInput
    _min?: NlQueryMinOrderByAggregateInput
    _sum?: NlQuerySumOrderByAggregateInput
  }

  export type NlQueryScalarWhereWithAggregatesInput = {
    AND?: NlQueryScalarWhereWithAggregatesInput | NlQueryScalarWhereWithAggregatesInput[]
    OR?: NlQueryScalarWhereWithAggregatesInput[]
    NOT?: NlQueryScalarWhereWithAggregatesInput | NlQueryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NlQuery"> | string
    orgId?: StringNullableWithAggregatesFilter<"NlQuery"> | string | null
    question?: StringWithAggregatesFilter<"NlQuery"> | string
    status?: EnumNlQueryStatusWithAggregatesFilter<"NlQuery"> | $Enums.NlQueryStatus
    metric?: StringNullableWithAggregatesFilter<"NlQuery"> | string | null
    plan?: JsonWithAggregatesFilter<"NlQuery">
    rowCount?: IntNullableWithAggregatesFilter<"NlQuery"> | number | null
    latencyMs?: IntNullableWithAggregatesFilter<"NlQuery"> | number | null
    error?: StringNullableWithAggregatesFilter<"NlQuery"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NlQuery"> | Date | string
  }

  export type EntityCreateInput = {
    id: string
    chain: string
    label?: string | null
    category?: string | null
    status?: $Enums.EntityStatus
    addressCount?: number
    riskScore?: number
    sanctioned?: boolean
    firstSeenAt?: Date | string | null
    lastSeenAt?: Date | string | null
    resolvedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: EntityMemberCreateNestedManyWithoutEntityInput
  }

  export type EntityUncheckedCreateInput = {
    id: string
    chain: string
    label?: string | null
    category?: string | null
    status?: $Enums.EntityStatus
    addressCount?: number
    riskScore?: number
    sanctioned?: boolean
    firstSeenAt?: Date | string | null
    lastSeenAt?: Date | string | null
    resolvedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: EntityMemberUncheckedCreateNestedManyWithoutEntityInput
  }

  export type EntityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEntityStatusFieldUpdateOperationsInput | $Enums.EntityStatus
    addressCount?: IntFieldUpdateOperationsInput | number
    riskScore?: IntFieldUpdateOperationsInput | number
    sanctioned?: BoolFieldUpdateOperationsInput | boolean
    firstSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: EntityMemberUpdateManyWithoutEntityNestedInput
  }

  export type EntityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEntityStatusFieldUpdateOperationsInput | $Enums.EntityStatus
    addressCount?: IntFieldUpdateOperationsInput | number
    riskScore?: IntFieldUpdateOperationsInput | number
    sanctioned?: BoolFieldUpdateOperationsInput | boolean
    firstSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: EntityMemberUncheckedUpdateManyWithoutEntityNestedInput
  }

  export type EntityCreateManyInput = {
    id: string
    chain: string
    label?: string | null
    category?: string | null
    status?: $Enums.EntityStatus
    addressCount?: number
    riskScore?: number
    sanctioned?: boolean
    firstSeenAt?: Date | string | null
    lastSeenAt?: Date | string | null
    resolvedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEntityStatusFieldUpdateOperationsInput | $Enums.EntityStatus
    addressCount?: IntFieldUpdateOperationsInput | number
    riskScore?: IntFieldUpdateOperationsInput | number
    sanctioned?: BoolFieldUpdateOperationsInput | boolean
    firstSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEntityStatusFieldUpdateOperationsInput | $Enums.EntityStatus
    addressCount?: IntFieldUpdateOperationsInput | number
    riskScore?: IntFieldUpdateOperationsInput | number
    sanctioned?: BoolFieldUpdateOperationsInput | boolean
    firstSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntityMemberCreateInput = {
    id: string
    chain: string
    address: string
    transferEvents?: number
    label?: string | null
    addedAt?: Date | string
    entity: EntityCreateNestedOneWithoutMembersInput
  }

  export type EntityMemberUncheckedCreateInput = {
    id: string
    entityId: string
    chain: string
    address: string
    transferEvents?: number
    label?: string | null
    addedAt?: Date | string
  }

  export type EntityMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    transferEvents?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entity?: EntityUpdateOneRequiredWithoutMembersNestedInput
  }

  export type EntityMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    transferEvents?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntityMemberCreateManyInput = {
    id: string
    entityId: string
    chain: string
    address: string
    transferEvents?: number
    label?: string | null
    addedAt?: Date | string
  }

  export type EntityMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    transferEvents?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntityMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    transferEvents?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResolutionRunCreateInput = {
    id: string
    status?: $Enums.ResolutionStatus
    trigger?: $Enums.RunTrigger
    chain?: string | null
    lookbackDays: number
    addressCount?: number | null
    entityCount?: number | null
    linkCount?: number | null
    durationMs?: number | null
    error?: string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ResolutionRunUncheckedCreateInput = {
    id: string
    status?: $Enums.ResolutionStatus
    trigger?: $Enums.RunTrigger
    chain?: string | null
    lookbackDays: number
    addressCount?: number | null
    entityCount?: number | null
    linkCount?: number | null
    durationMs?: number | null
    error?: string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ResolutionRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumResolutionStatusFieldUpdateOperationsInput | $Enums.ResolutionStatus
    trigger?: EnumRunTriggerFieldUpdateOperationsInput | $Enums.RunTrigger
    chain?: NullableStringFieldUpdateOperationsInput | string | null
    lookbackDays?: IntFieldUpdateOperationsInput | number
    addressCount?: NullableIntFieldUpdateOperationsInput | number | null
    entityCount?: NullableIntFieldUpdateOperationsInput | number | null
    linkCount?: NullableIntFieldUpdateOperationsInput | number | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResolutionRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumResolutionStatusFieldUpdateOperationsInput | $Enums.ResolutionStatus
    trigger?: EnumRunTriggerFieldUpdateOperationsInput | $Enums.RunTrigger
    chain?: NullableStringFieldUpdateOperationsInput | string | null
    lookbackDays?: IntFieldUpdateOperationsInput | number
    addressCount?: NullableIntFieldUpdateOperationsInput | number | null
    entityCount?: NullableIntFieldUpdateOperationsInput | number | null
    linkCount?: NullableIntFieldUpdateOperationsInput | number | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResolutionRunCreateManyInput = {
    id: string
    status?: $Enums.ResolutionStatus
    trigger?: $Enums.RunTrigger
    chain?: string | null
    lookbackDays: number
    addressCount?: number | null
    entityCount?: number | null
    linkCount?: number | null
    durationMs?: number | null
    error?: string | null
    startedAt?: Date | string | null
    finishedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ResolutionRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumResolutionStatusFieldUpdateOperationsInput | $Enums.ResolutionStatus
    trigger?: EnumRunTriggerFieldUpdateOperationsInput | $Enums.RunTrigger
    chain?: NullableStringFieldUpdateOperationsInput | string | null
    lookbackDays?: IntFieldUpdateOperationsInput | number
    addressCount?: NullableIntFieldUpdateOperationsInput | number | null
    entityCount?: NullableIntFieldUpdateOperationsInput | number | null
    linkCount?: NullableIntFieldUpdateOperationsInput | number | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResolutionRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumResolutionStatusFieldUpdateOperationsInput | $Enums.ResolutionStatus
    trigger?: EnumRunTriggerFieldUpdateOperationsInput | $Enums.RunTrigger
    chain?: NullableStringFieldUpdateOperationsInput | string | null
    lookbackDays?: IntFieldUpdateOperationsInput | number
    addressCount?: NullableIntFieldUpdateOperationsInput | number | null
    entityCount?: NullableIntFieldUpdateOperationsInput | number | null
    linkCount?: NullableIntFieldUpdateOperationsInput | number | null
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressEmbeddingCreateInput = {
    id: string
    chain: string
    address: string
    dim: number
    vector: JsonNullValueInput | InputJsonValue
    model: string
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type AddressEmbeddingUncheckedCreateInput = {
    id: string
    chain: string
    address: string
    dim: number
    vector: JsonNullValueInput | InputJsonValue
    model: string
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type AddressEmbeddingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dim?: IntFieldUpdateOperationsInput | number
    vector?: JsonNullValueInput | InputJsonValue
    model?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressEmbeddingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dim?: IntFieldUpdateOperationsInput | number
    vector?: JsonNullValueInput | InputJsonValue
    model?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressEmbeddingCreateManyInput = {
    id: string
    chain: string
    address: string
    dim: number
    vector: JsonNullValueInput | InputJsonValue
    model: string
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type AddressEmbeddingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dim?: IntFieldUpdateOperationsInput | number
    vector?: JsonNullValueInput | InputJsonValue
    model?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressEmbeddingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dim?: IntFieldUpdateOperationsInput | number
    vector?: JsonNullValueInput | InputJsonValue
    model?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NlQueryCreateInput = {
    id: string
    orgId?: string | null
    question: string
    status: $Enums.NlQueryStatus
    metric?: string | null
    plan: JsonNullValueInput | InputJsonValue
    rowCount?: number | null
    latencyMs?: number | null
    error?: string | null
    createdAt?: Date | string
  }

  export type NlQueryUncheckedCreateInput = {
    id: string
    orgId?: string | null
    question: string
    status: $Enums.NlQueryStatus
    metric?: string | null
    plan: JsonNullValueInput | InputJsonValue
    rowCount?: number | null
    latencyMs?: number | null
    error?: string | null
    createdAt?: Date | string
  }

  export type NlQueryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    question?: StringFieldUpdateOperationsInput | string
    status?: EnumNlQueryStatusFieldUpdateOperationsInput | $Enums.NlQueryStatus
    metric?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: JsonNullValueInput | InputJsonValue
    rowCount?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NlQueryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    question?: StringFieldUpdateOperationsInput | string
    status?: EnumNlQueryStatusFieldUpdateOperationsInput | $Enums.NlQueryStatus
    metric?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: JsonNullValueInput | InputJsonValue
    rowCount?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NlQueryCreateManyInput = {
    id: string
    orgId?: string | null
    question: string
    status: $Enums.NlQueryStatus
    metric?: string | null
    plan: JsonNullValueInput | InputJsonValue
    rowCount?: number | null
    latencyMs?: number | null
    error?: string | null
    createdAt?: Date | string
  }

  export type NlQueryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    question?: StringFieldUpdateOperationsInput | string
    status?: EnumNlQueryStatusFieldUpdateOperationsInput | $Enums.NlQueryStatus
    metric?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: JsonNullValueInput | InputJsonValue
    rowCount?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NlQueryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    question?: StringFieldUpdateOperationsInput | string
    status?: EnumNlQueryStatusFieldUpdateOperationsInput | $Enums.NlQueryStatus
    metric?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: JsonNullValueInput | InputJsonValue
    rowCount?: NullableIntFieldUpdateOperationsInput | number | null
    latencyMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type EnumEntityStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EntityStatus | EnumEntityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EntityStatus[] | ListEnumEntityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntityStatus[] | ListEnumEntityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEntityStatusFilter<$PrismaModel> | $Enums.EntityStatus
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type EntityMemberListRelationFilter = {
    every?: EntityMemberWhereInput
    some?: EntityMemberWhereInput
    none?: EntityMemberWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EntityMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EntityCountOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    label?: SortOrder
    category?: SortOrder
    status?: SortOrder
    addressCount?: SortOrder
    riskScore?: SortOrder
    sanctioned?: SortOrder
    firstSeenAt?: SortOrder
    lastSeenAt?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntityAvgOrderByAggregateInput = {
    addressCount?: SortOrder
    riskScore?: SortOrder
  }

  export type EntityMaxOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    label?: SortOrder
    category?: SortOrder
    status?: SortOrder
    addressCount?: SortOrder
    riskScore?: SortOrder
    sanctioned?: SortOrder
    firstSeenAt?: SortOrder
    lastSeenAt?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntityMinOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    label?: SortOrder
    category?: SortOrder
    status?: SortOrder
    addressCount?: SortOrder
    riskScore?: SortOrder
    sanctioned?: SortOrder
    firstSeenAt?: SortOrder
    lastSeenAt?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EntitySumOrderByAggregateInput = {
    addressCount?: SortOrder
    riskScore?: SortOrder
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

  export type EnumEntityStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EntityStatus | EnumEntityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EntityStatus[] | ListEnumEntityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntityStatus[] | ListEnumEntityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEntityStatusWithAggregatesFilter<$PrismaModel> | $Enums.EntityStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEntityStatusFilter<$PrismaModel>
    _max?: NestedEnumEntityStatusFilter<$PrismaModel>
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type EntityRelationFilter = {
    is?: EntityWhereInput
    isNot?: EntityWhereInput
  }

  export type EntityMemberChainAddressCompoundUniqueInput = {
    chain: string
    address: string
  }

  export type EntityMemberCountOrderByAggregateInput = {
    id?: SortOrder
    entityId?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    transferEvents?: SortOrder
    label?: SortOrder
    addedAt?: SortOrder
  }

  export type EntityMemberAvgOrderByAggregateInput = {
    transferEvents?: SortOrder
  }

  export type EntityMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    entityId?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    transferEvents?: SortOrder
    label?: SortOrder
    addedAt?: SortOrder
  }

  export type EntityMemberMinOrderByAggregateInput = {
    id?: SortOrder
    entityId?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    transferEvents?: SortOrder
    label?: SortOrder
    addedAt?: SortOrder
  }

  export type EntityMemberSumOrderByAggregateInput = {
    transferEvents?: SortOrder
  }

  export type EnumResolutionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ResolutionStatus | EnumResolutionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResolutionStatus[] | ListEnumResolutionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResolutionStatus[] | ListEnumResolutionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumResolutionStatusFilter<$PrismaModel> | $Enums.ResolutionStatus
  }

  export type EnumRunTriggerFilter<$PrismaModel = never> = {
    equals?: $Enums.RunTrigger | EnumRunTriggerFieldRefInput<$PrismaModel>
    in?: $Enums.RunTrigger[] | ListEnumRunTriggerFieldRefInput<$PrismaModel>
    notIn?: $Enums.RunTrigger[] | ListEnumRunTriggerFieldRefInput<$PrismaModel>
    not?: NestedEnumRunTriggerFilter<$PrismaModel> | $Enums.RunTrigger
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

  export type ResolutionRunCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    trigger?: SortOrder
    chain?: SortOrder
    lookbackDays?: SortOrder
    addressCount?: SortOrder
    entityCount?: SortOrder
    linkCount?: SortOrder
    durationMs?: SortOrder
    error?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ResolutionRunAvgOrderByAggregateInput = {
    lookbackDays?: SortOrder
    addressCount?: SortOrder
    entityCount?: SortOrder
    linkCount?: SortOrder
    durationMs?: SortOrder
  }

  export type ResolutionRunMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    trigger?: SortOrder
    chain?: SortOrder
    lookbackDays?: SortOrder
    addressCount?: SortOrder
    entityCount?: SortOrder
    linkCount?: SortOrder
    durationMs?: SortOrder
    error?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ResolutionRunMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    trigger?: SortOrder
    chain?: SortOrder
    lookbackDays?: SortOrder
    addressCount?: SortOrder
    entityCount?: SortOrder
    linkCount?: SortOrder
    durationMs?: SortOrder
    error?: SortOrder
    startedAt?: SortOrder
    finishedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ResolutionRunSumOrderByAggregateInput = {
    lookbackDays?: SortOrder
    addressCount?: SortOrder
    entityCount?: SortOrder
    linkCount?: SortOrder
    durationMs?: SortOrder
  }

  export type EnumResolutionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResolutionStatus | EnumResolutionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResolutionStatus[] | ListEnumResolutionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResolutionStatus[] | ListEnumResolutionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumResolutionStatusWithAggregatesFilter<$PrismaModel> | $Enums.ResolutionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumResolutionStatusFilter<$PrismaModel>
    _max?: NestedEnumResolutionStatusFilter<$PrismaModel>
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

  export type AddressEmbeddingChainAddressCompoundUniqueInput = {
    chain: string
    address: string
  }

  export type AddressEmbeddingCountOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    dim?: SortOrder
    vector?: SortOrder
    model?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AddressEmbeddingAvgOrderByAggregateInput = {
    dim?: SortOrder
  }

  export type AddressEmbeddingMaxOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    dim?: SortOrder
    model?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AddressEmbeddingMinOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    dim?: SortOrder
    model?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AddressEmbeddingSumOrderByAggregateInput = {
    dim?: SortOrder
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

  export type EnumNlQueryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NlQueryStatus | EnumNlQueryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NlQueryStatus[] | ListEnumNlQueryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NlQueryStatus[] | ListEnumNlQueryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNlQueryStatusFilter<$PrismaModel> | $Enums.NlQueryStatus
  }

  export type NlQueryCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    question?: SortOrder
    status?: SortOrder
    metric?: SortOrder
    plan?: SortOrder
    rowCount?: SortOrder
    latencyMs?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
  }

  export type NlQueryAvgOrderByAggregateInput = {
    rowCount?: SortOrder
    latencyMs?: SortOrder
  }

  export type NlQueryMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    question?: SortOrder
    status?: SortOrder
    metric?: SortOrder
    rowCount?: SortOrder
    latencyMs?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
  }

  export type NlQueryMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    question?: SortOrder
    status?: SortOrder
    metric?: SortOrder
    rowCount?: SortOrder
    latencyMs?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
  }

  export type NlQuerySumOrderByAggregateInput = {
    rowCount?: SortOrder
    latencyMs?: SortOrder
  }

  export type EnumNlQueryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NlQueryStatus | EnumNlQueryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NlQueryStatus[] | ListEnumNlQueryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NlQueryStatus[] | ListEnumNlQueryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNlQueryStatusWithAggregatesFilter<$PrismaModel> | $Enums.NlQueryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNlQueryStatusFilter<$PrismaModel>
    _max?: NestedEnumNlQueryStatusFilter<$PrismaModel>
  }

  export type EntityMemberCreateNestedManyWithoutEntityInput = {
    create?: XOR<EntityMemberCreateWithoutEntityInput, EntityMemberUncheckedCreateWithoutEntityInput> | EntityMemberCreateWithoutEntityInput[] | EntityMemberUncheckedCreateWithoutEntityInput[]
    connectOrCreate?: EntityMemberCreateOrConnectWithoutEntityInput | EntityMemberCreateOrConnectWithoutEntityInput[]
    createMany?: EntityMemberCreateManyEntityInputEnvelope
    connect?: EntityMemberWhereUniqueInput | EntityMemberWhereUniqueInput[]
  }

  export type EntityMemberUncheckedCreateNestedManyWithoutEntityInput = {
    create?: XOR<EntityMemberCreateWithoutEntityInput, EntityMemberUncheckedCreateWithoutEntityInput> | EntityMemberCreateWithoutEntityInput[] | EntityMemberUncheckedCreateWithoutEntityInput[]
    connectOrCreate?: EntityMemberCreateOrConnectWithoutEntityInput | EntityMemberCreateOrConnectWithoutEntityInput[]
    createMany?: EntityMemberCreateManyEntityInputEnvelope
    connect?: EntityMemberWhereUniqueInput | EntityMemberWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumEntityStatusFieldUpdateOperationsInput = {
    set?: $Enums.EntityStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EntityMemberUpdateManyWithoutEntityNestedInput = {
    create?: XOR<EntityMemberCreateWithoutEntityInput, EntityMemberUncheckedCreateWithoutEntityInput> | EntityMemberCreateWithoutEntityInput[] | EntityMemberUncheckedCreateWithoutEntityInput[]
    connectOrCreate?: EntityMemberCreateOrConnectWithoutEntityInput | EntityMemberCreateOrConnectWithoutEntityInput[]
    upsert?: EntityMemberUpsertWithWhereUniqueWithoutEntityInput | EntityMemberUpsertWithWhereUniqueWithoutEntityInput[]
    createMany?: EntityMemberCreateManyEntityInputEnvelope
    set?: EntityMemberWhereUniqueInput | EntityMemberWhereUniqueInput[]
    disconnect?: EntityMemberWhereUniqueInput | EntityMemberWhereUniqueInput[]
    delete?: EntityMemberWhereUniqueInput | EntityMemberWhereUniqueInput[]
    connect?: EntityMemberWhereUniqueInput | EntityMemberWhereUniqueInput[]
    update?: EntityMemberUpdateWithWhereUniqueWithoutEntityInput | EntityMemberUpdateWithWhereUniqueWithoutEntityInput[]
    updateMany?: EntityMemberUpdateManyWithWhereWithoutEntityInput | EntityMemberUpdateManyWithWhereWithoutEntityInput[]
    deleteMany?: EntityMemberScalarWhereInput | EntityMemberScalarWhereInput[]
  }

  export type EntityMemberUncheckedUpdateManyWithoutEntityNestedInput = {
    create?: XOR<EntityMemberCreateWithoutEntityInput, EntityMemberUncheckedCreateWithoutEntityInput> | EntityMemberCreateWithoutEntityInput[] | EntityMemberUncheckedCreateWithoutEntityInput[]
    connectOrCreate?: EntityMemberCreateOrConnectWithoutEntityInput | EntityMemberCreateOrConnectWithoutEntityInput[]
    upsert?: EntityMemberUpsertWithWhereUniqueWithoutEntityInput | EntityMemberUpsertWithWhereUniqueWithoutEntityInput[]
    createMany?: EntityMemberCreateManyEntityInputEnvelope
    set?: EntityMemberWhereUniqueInput | EntityMemberWhereUniqueInput[]
    disconnect?: EntityMemberWhereUniqueInput | EntityMemberWhereUniqueInput[]
    delete?: EntityMemberWhereUniqueInput | EntityMemberWhereUniqueInput[]
    connect?: EntityMemberWhereUniqueInput | EntityMemberWhereUniqueInput[]
    update?: EntityMemberUpdateWithWhereUniqueWithoutEntityInput | EntityMemberUpdateWithWhereUniqueWithoutEntityInput[]
    updateMany?: EntityMemberUpdateManyWithWhereWithoutEntityInput | EntityMemberUpdateManyWithWhereWithoutEntityInput[]
    deleteMany?: EntityMemberScalarWhereInput | EntityMemberScalarWhereInput[]
  }

  export type EntityCreateNestedOneWithoutMembersInput = {
    create?: XOR<EntityCreateWithoutMembersInput, EntityUncheckedCreateWithoutMembersInput>
    connectOrCreate?: EntityCreateOrConnectWithoutMembersInput
    connect?: EntityWhereUniqueInput
  }

  export type EntityUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<EntityCreateWithoutMembersInput, EntityUncheckedCreateWithoutMembersInput>
    connectOrCreate?: EntityCreateOrConnectWithoutMembersInput
    upsert?: EntityUpsertWithoutMembersInput
    connect?: EntityWhereUniqueInput
    update?: XOR<XOR<EntityUpdateToOneWithWhereWithoutMembersInput, EntityUpdateWithoutMembersInput>, EntityUncheckedUpdateWithoutMembersInput>
  }

  export type EnumResolutionStatusFieldUpdateOperationsInput = {
    set?: $Enums.ResolutionStatus
  }

  export type EnumRunTriggerFieldUpdateOperationsInput = {
    set?: $Enums.RunTrigger
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumNlQueryStatusFieldUpdateOperationsInput = {
    set?: $Enums.NlQueryStatus
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

  export type NestedEnumEntityStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EntityStatus | EnumEntityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EntityStatus[] | ListEnumEntityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntityStatus[] | ListEnumEntityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEntityStatusFilter<$PrismaModel> | $Enums.EntityStatus
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedEnumEntityStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EntityStatus | EnumEntityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EntityStatus[] | ListEnumEntityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntityStatus[] | ListEnumEntityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEntityStatusWithAggregatesFilter<$PrismaModel> | $Enums.EntityStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEntityStatusFilter<$PrismaModel>
    _max?: NestedEnumEntityStatusFilter<$PrismaModel>
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumResolutionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ResolutionStatus | EnumResolutionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResolutionStatus[] | ListEnumResolutionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResolutionStatus[] | ListEnumResolutionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumResolutionStatusFilter<$PrismaModel> | $Enums.ResolutionStatus
  }

  export type NestedEnumRunTriggerFilter<$PrismaModel = never> = {
    equals?: $Enums.RunTrigger | EnumRunTriggerFieldRefInput<$PrismaModel>
    in?: $Enums.RunTrigger[] | ListEnumRunTriggerFieldRefInput<$PrismaModel>
    notIn?: $Enums.RunTrigger[] | ListEnumRunTriggerFieldRefInput<$PrismaModel>
    not?: NestedEnumRunTriggerFilter<$PrismaModel> | $Enums.RunTrigger
  }

  export type NestedEnumResolutionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResolutionStatus | EnumResolutionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResolutionStatus[] | ListEnumResolutionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ResolutionStatus[] | ListEnumResolutionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumResolutionStatusWithAggregatesFilter<$PrismaModel> | $Enums.ResolutionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumResolutionStatusFilter<$PrismaModel>
    _max?: NestedEnumResolutionStatusFilter<$PrismaModel>
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

  export type NestedEnumNlQueryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NlQueryStatus | EnumNlQueryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NlQueryStatus[] | ListEnumNlQueryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NlQueryStatus[] | ListEnumNlQueryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNlQueryStatusFilter<$PrismaModel> | $Enums.NlQueryStatus
  }

  export type NestedEnumNlQueryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NlQueryStatus | EnumNlQueryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NlQueryStatus[] | ListEnumNlQueryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NlQueryStatus[] | ListEnumNlQueryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNlQueryStatusWithAggregatesFilter<$PrismaModel> | $Enums.NlQueryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNlQueryStatusFilter<$PrismaModel>
    _max?: NestedEnumNlQueryStatusFilter<$PrismaModel>
  }

  export type EntityMemberCreateWithoutEntityInput = {
    id: string
    chain: string
    address: string
    transferEvents?: number
    label?: string | null
    addedAt?: Date | string
  }

  export type EntityMemberUncheckedCreateWithoutEntityInput = {
    id: string
    chain: string
    address: string
    transferEvents?: number
    label?: string | null
    addedAt?: Date | string
  }

  export type EntityMemberCreateOrConnectWithoutEntityInput = {
    where: EntityMemberWhereUniqueInput
    create: XOR<EntityMemberCreateWithoutEntityInput, EntityMemberUncheckedCreateWithoutEntityInput>
  }

  export type EntityMemberCreateManyEntityInputEnvelope = {
    data: EntityMemberCreateManyEntityInput | EntityMemberCreateManyEntityInput[]
    skipDuplicates?: boolean
  }

  export type EntityMemberUpsertWithWhereUniqueWithoutEntityInput = {
    where: EntityMemberWhereUniqueInput
    update: XOR<EntityMemberUpdateWithoutEntityInput, EntityMemberUncheckedUpdateWithoutEntityInput>
    create: XOR<EntityMemberCreateWithoutEntityInput, EntityMemberUncheckedCreateWithoutEntityInput>
  }

  export type EntityMemberUpdateWithWhereUniqueWithoutEntityInput = {
    where: EntityMemberWhereUniqueInput
    data: XOR<EntityMemberUpdateWithoutEntityInput, EntityMemberUncheckedUpdateWithoutEntityInput>
  }

  export type EntityMemberUpdateManyWithWhereWithoutEntityInput = {
    where: EntityMemberScalarWhereInput
    data: XOR<EntityMemberUpdateManyMutationInput, EntityMemberUncheckedUpdateManyWithoutEntityInput>
  }

  export type EntityMemberScalarWhereInput = {
    AND?: EntityMemberScalarWhereInput | EntityMemberScalarWhereInput[]
    OR?: EntityMemberScalarWhereInput[]
    NOT?: EntityMemberScalarWhereInput | EntityMemberScalarWhereInput[]
    id?: StringFilter<"EntityMember"> | string
    entityId?: StringFilter<"EntityMember"> | string
    chain?: StringFilter<"EntityMember"> | string
    address?: StringFilter<"EntityMember"> | string
    transferEvents?: IntFilter<"EntityMember"> | number
    label?: StringNullableFilter<"EntityMember"> | string | null
    addedAt?: DateTimeFilter<"EntityMember"> | Date | string
  }

  export type EntityCreateWithoutMembersInput = {
    id: string
    chain: string
    label?: string | null
    category?: string | null
    status?: $Enums.EntityStatus
    addressCount?: number
    riskScore?: number
    sanctioned?: boolean
    firstSeenAt?: Date | string | null
    lastSeenAt?: Date | string | null
    resolvedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntityUncheckedCreateWithoutMembersInput = {
    id: string
    chain: string
    label?: string | null
    category?: string | null
    status?: $Enums.EntityStatus
    addressCount?: number
    riskScore?: number
    sanctioned?: boolean
    firstSeenAt?: Date | string | null
    lastSeenAt?: Date | string | null
    resolvedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EntityCreateOrConnectWithoutMembersInput = {
    where: EntityWhereUniqueInput
    create: XOR<EntityCreateWithoutMembersInput, EntityUncheckedCreateWithoutMembersInput>
  }

  export type EntityUpsertWithoutMembersInput = {
    update: XOR<EntityUpdateWithoutMembersInput, EntityUncheckedUpdateWithoutMembersInput>
    create: XOR<EntityCreateWithoutMembersInput, EntityUncheckedCreateWithoutMembersInput>
    where?: EntityWhereInput
  }

  export type EntityUpdateToOneWithWhereWithoutMembersInput = {
    where?: EntityWhereInput
    data: XOR<EntityUpdateWithoutMembersInput, EntityUncheckedUpdateWithoutMembersInput>
  }

  export type EntityUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEntityStatusFieldUpdateOperationsInput | $Enums.EntityStatus
    addressCount?: IntFieldUpdateOperationsInput | number
    riskScore?: IntFieldUpdateOperationsInput | number
    sanctioned?: BoolFieldUpdateOperationsInput | boolean
    firstSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntityUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEntityStatusFieldUpdateOperationsInput | $Enums.EntityStatus
    addressCount?: IntFieldUpdateOperationsInput | number
    riskScore?: IntFieldUpdateOperationsInput | number
    sanctioned?: BoolFieldUpdateOperationsInput | boolean
    firstSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntityMemberCreateManyEntityInput = {
    id: string
    chain: string
    address: string
    transferEvents?: number
    label?: string | null
    addedAt?: Date | string
  }

  export type EntityMemberUpdateWithoutEntityInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    transferEvents?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntityMemberUncheckedUpdateWithoutEntityInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    transferEvents?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntityMemberUncheckedUpdateManyWithoutEntityInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    transferEvents?: IntFieldUpdateOperationsInput | number
    label?: NullableStringFieldUpdateOperationsInput | string | null
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use EntityCountOutputTypeDefaultArgs instead
     */
    export type EntityCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EntityCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EntityDefaultArgs instead
     */
    export type EntityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EntityDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EntityMemberDefaultArgs instead
     */
    export type EntityMemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EntityMemberDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ResolutionRunDefaultArgs instead
     */
    export type ResolutionRunArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ResolutionRunDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AddressEmbeddingDefaultArgs instead
     */
    export type AddressEmbeddingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AddressEmbeddingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NlQueryDefaultArgs instead
     */
    export type NlQueryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NlQueryDefaultArgs<ExtArgs>

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