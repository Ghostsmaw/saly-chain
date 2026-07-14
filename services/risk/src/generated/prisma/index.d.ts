
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
 * Model ActorProfile
 * 
 */
export type ActorProfile = $Result.DefaultSelection<Prisma.$ActorProfilePayload>
/**
 * Model CounterpartyEdge
 * 
 */
export type CounterpartyEdge = $Result.DefaultSelection<Prisma.$CounterpartyEdgePayload>
/**
 * Model RiskAssessment
 * 
 */
export type RiskAssessment = $Result.DefaultSelection<Prisma.$RiskAssessmentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RiskDecision: {
  ALLOW: 'ALLOW',
  REVIEW: 'REVIEW',
  BLOCK: 'BLOCK'
};

export type RiskDecision = (typeof RiskDecision)[keyof typeof RiskDecision]

}

export type RiskDecision = $Enums.RiskDecision

export const RiskDecision: typeof $Enums.RiskDecision

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ActorProfiles
 * const actorProfiles = await prisma.actorProfile.findMany()
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
   * // Fetch zero or more ActorProfiles
   * const actorProfiles = await prisma.actorProfile.findMany()
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
   * `prisma.actorProfile`: Exposes CRUD operations for the **ActorProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActorProfiles
    * const actorProfiles = await prisma.actorProfile.findMany()
    * ```
    */
  get actorProfile(): Prisma.ActorProfileDelegate<ExtArgs>;

  /**
   * `prisma.counterpartyEdge`: Exposes CRUD operations for the **CounterpartyEdge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CounterpartyEdges
    * const counterpartyEdges = await prisma.counterpartyEdge.findMany()
    * ```
    */
  get counterpartyEdge(): Prisma.CounterpartyEdgeDelegate<ExtArgs>;

  /**
   * `prisma.riskAssessment`: Exposes CRUD operations for the **RiskAssessment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RiskAssessments
    * const riskAssessments = await prisma.riskAssessment.findMany()
    * ```
    */
  get riskAssessment(): Prisma.RiskAssessmentDelegate<ExtArgs>;
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
    ActorProfile: 'ActorProfile',
    CounterpartyEdge: 'CounterpartyEdge',
    RiskAssessment: 'RiskAssessment'
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
      modelProps: "actorProfile" | "counterpartyEdge" | "riskAssessment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ActorProfile: {
        payload: Prisma.$ActorProfilePayload<ExtArgs>
        fields: Prisma.ActorProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActorProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActorProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActorProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActorProfilePayload>
          }
          findFirst: {
            args: Prisma.ActorProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActorProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActorProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActorProfilePayload>
          }
          findMany: {
            args: Prisma.ActorProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActorProfilePayload>[]
          }
          create: {
            args: Prisma.ActorProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActorProfilePayload>
          }
          createMany: {
            args: Prisma.ActorProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActorProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActorProfilePayload>[]
          }
          delete: {
            args: Prisma.ActorProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActorProfilePayload>
          }
          update: {
            args: Prisma.ActorProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActorProfilePayload>
          }
          deleteMany: {
            args: Prisma.ActorProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActorProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActorProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActorProfilePayload>
          }
          aggregate: {
            args: Prisma.ActorProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActorProfile>
          }
          groupBy: {
            args: Prisma.ActorProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActorProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActorProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ActorProfileCountAggregateOutputType> | number
          }
        }
      }
      CounterpartyEdge: {
        payload: Prisma.$CounterpartyEdgePayload<ExtArgs>
        fields: Prisma.CounterpartyEdgeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CounterpartyEdgeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterpartyEdgePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CounterpartyEdgeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterpartyEdgePayload>
          }
          findFirst: {
            args: Prisma.CounterpartyEdgeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterpartyEdgePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CounterpartyEdgeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterpartyEdgePayload>
          }
          findMany: {
            args: Prisma.CounterpartyEdgeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterpartyEdgePayload>[]
          }
          create: {
            args: Prisma.CounterpartyEdgeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterpartyEdgePayload>
          }
          createMany: {
            args: Prisma.CounterpartyEdgeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CounterpartyEdgeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterpartyEdgePayload>[]
          }
          delete: {
            args: Prisma.CounterpartyEdgeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterpartyEdgePayload>
          }
          update: {
            args: Prisma.CounterpartyEdgeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterpartyEdgePayload>
          }
          deleteMany: {
            args: Prisma.CounterpartyEdgeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CounterpartyEdgeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CounterpartyEdgeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterpartyEdgePayload>
          }
          aggregate: {
            args: Prisma.CounterpartyEdgeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCounterpartyEdge>
          }
          groupBy: {
            args: Prisma.CounterpartyEdgeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CounterpartyEdgeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CounterpartyEdgeCountArgs<ExtArgs>
            result: $Utils.Optional<CounterpartyEdgeCountAggregateOutputType> | number
          }
        }
      }
      RiskAssessment: {
        payload: Prisma.$RiskAssessmentPayload<ExtArgs>
        fields: Prisma.RiskAssessmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RiskAssessmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RiskAssessmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>
          }
          findFirst: {
            args: Prisma.RiskAssessmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RiskAssessmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>
          }
          findMany: {
            args: Prisma.RiskAssessmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>[]
          }
          create: {
            args: Prisma.RiskAssessmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>
          }
          createMany: {
            args: Prisma.RiskAssessmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RiskAssessmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>[]
          }
          delete: {
            args: Prisma.RiskAssessmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>
          }
          update: {
            args: Prisma.RiskAssessmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>
          }
          deleteMany: {
            args: Prisma.RiskAssessmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RiskAssessmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RiskAssessmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiskAssessmentPayload>
          }
          aggregate: {
            args: Prisma.RiskAssessmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRiskAssessment>
          }
          groupBy: {
            args: Prisma.RiskAssessmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<RiskAssessmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.RiskAssessmentCountArgs<ExtArgs>
            result: $Utils.Optional<RiskAssessmentCountAggregateOutputType> | number
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
   * Models
   */

  /**
   * Model ActorProfile
   */

  export type AggregateActorProfile = {
    _count: ActorProfileCountAggregateOutputType | null
    _avg: ActorProfileAvgAggregateOutputType | null
    _sum: ActorProfileSumAggregateOutputType | null
    _min: ActorProfileMinAggregateOutputType | null
    _max: ActorProfileMaxAggregateOutputType | null
  }

  export type ActorProfileAvgAggregateOutputType = {
    rolling24hUsdMinor: number | null
    rolling24hCount: number | null
    lifetimeCount: number | null
    meanTicketUsdMinor: number | null
    stddevTicketUsdMinor: number | null
  }

  export type ActorProfileSumAggregateOutputType = {
    rolling24hUsdMinor: bigint | null
    rolling24hCount: number | null
    lifetimeCount: number | null
    meanTicketUsdMinor: bigint | null
    stddevTicketUsdMinor: bigint | null
  }

  export type ActorProfileMinAggregateOutputType = {
    externalRef: string | null
    rolling24hUsdMinor: bigint | null
    rolling24hCount: number | null
    lifetimeCount: number | null
    meanTicketUsdMinor: bigint | null
    stddevTicketUsdMinor: bigint | null
    lastSeenAt: Date | null
    updatedAt: Date | null
  }

  export type ActorProfileMaxAggregateOutputType = {
    externalRef: string | null
    rolling24hUsdMinor: bigint | null
    rolling24hCount: number | null
    lifetimeCount: number | null
    meanTicketUsdMinor: bigint | null
    stddevTicketUsdMinor: bigint | null
    lastSeenAt: Date | null
    updatedAt: Date | null
  }

  export type ActorProfileCountAggregateOutputType = {
    externalRef: number
    rolling24hUsdMinor: number
    rolling24hCount: number
    lifetimeCount: number
    meanTicketUsdMinor: number
    stddevTicketUsdMinor: number
    lastSeenAt: number
    updatedAt: number
    _all: number
  }


  export type ActorProfileAvgAggregateInputType = {
    rolling24hUsdMinor?: true
    rolling24hCount?: true
    lifetimeCount?: true
    meanTicketUsdMinor?: true
    stddevTicketUsdMinor?: true
  }

  export type ActorProfileSumAggregateInputType = {
    rolling24hUsdMinor?: true
    rolling24hCount?: true
    lifetimeCount?: true
    meanTicketUsdMinor?: true
    stddevTicketUsdMinor?: true
  }

  export type ActorProfileMinAggregateInputType = {
    externalRef?: true
    rolling24hUsdMinor?: true
    rolling24hCount?: true
    lifetimeCount?: true
    meanTicketUsdMinor?: true
    stddevTicketUsdMinor?: true
    lastSeenAt?: true
    updatedAt?: true
  }

  export type ActorProfileMaxAggregateInputType = {
    externalRef?: true
    rolling24hUsdMinor?: true
    rolling24hCount?: true
    lifetimeCount?: true
    meanTicketUsdMinor?: true
    stddevTicketUsdMinor?: true
    lastSeenAt?: true
    updatedAt?: true
  }

  export type ActorProfileCountAggregateInputType = {
    externalRef?: true
    rolling24hUsdMinor?: true
    rolling24hCount?: true
    lifetimeCount?: true
    meanTicketUsdMinor?: true
    stddevTicketUsdMinor?: true
    lastSeenAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ActorProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActorProfile to aggregate.
     */
    where?: ActorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActorProfiles to fetch.
     */
    orderBy?: ActorProfileOrderByWithRelationInput | ActorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActorProfiles
    **/
    _count?: true | ActorProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActorProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActorProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActorProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActorProfileMaxAggregateInputType
  }

  export type GetActorProfileAggregateType<T extends ActorProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateActorProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActorProfile[P]>
      : GetScalarType<T[P], AggregateActorProfile[P]>
  }




  export type ActorProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActorProfileWhereInput
    orderBy?: ActorProfileOrderByWithAggregationInput | ActorProfileOrderByWithAggregationInput[]
    by: ActorProfileScalarFieldEnum[] | ActorProfileScalarFieldEnum
    having?: ActorProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActorProfileCountAggregateInputType | true
    _avg?: ActorProfileAvgAggregateInputType
    _sum?: ActorProfileSumAggregateInputType
    _min?: ActorProfileMinAggregateInputType
    _max?: ActorProfileMaxAggregateInputType
  }

  export type ActorProfileGroupByOutputType = {
    externalRef: string
    rolling24hUsdMinor: bigint
    rolling24hCount: number
    lifetimeCount: number
    meanTicketUsdMinor: bigint
    stddevTicketUsdMinor: bigint
    lastSeenAt: Date | null
    updatedAt: Date
    _count: ActorProfileCountAggregateOutputType | null
    _avg: ActorProfileAvgAggregateOutputType | null
    _sum: ActorProfileSumAggregateOutputType | null
    _min: ActorProfileMinAggregateOutputType | null
    _max: ActorProfileMaxAggregateOutputType | null
  }

  type GetActorProfileGroupByPayload<T extends ActorProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActorProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActorProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActorProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ActorProfileGroupByOutputType[P]>
        }
      >
    >


  export type ActorProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    externalRef?: boolean
    rolling24hUsdMinor?: boolean
    rolling24hCount?: boolean
    lifetimeCount?: boolean
    meanTicketUsdMinor?: boolean
    stddevTicketUsdMinor?: boolean
    lastSeenAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["actorProfile"]>

  export type ActorProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    externalRef?: boolean
    rolling24hUsdMinor?: boolean
    rolling24hCount?: boolean
    lifetimeCount?: boolean
    meanTicketUsdMinor?: boolean
    stddevTicketUsdMinor?: boolean
    lastSeenAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["actorProfile"]>

  export type ActorProfileSelectScalar = {
    externalRef?: boolean
    rolling24hUsdMinor?: boolean
    rolling24hCount?: boolean
    lifetimeCount?: boolean
    meanTicketUsdMinor?: boolean
    stddevTicketUsdMinor?: boolean
    lastSeenAt?: boolean
    updatedAt?: boolean
  }


  export type $ActorProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActorProfile"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      externalRef: string
      /**
       * Total observed in the rolling 24h window across all currencies, normalized to
       * USD-cents using the snapshot rate. Source of truth lives in `RiskAssessment`.
       */
      rolling24hUsdMinor: bigint
      /**
       * Rolling 24h transaction count.
       */
      rolling24hCount: number
      /**
       * Lifetime tx count; informs "new user" boost.
       */
      lifetimeCount: number
      /**
       * Mean ticket size in USD-cents (EMA).
       */
      meanTicketUsdMinor: bigint
      /**
       * Standard-deviation of ticket size in USD-cents (online EMA approximation).
       */
      stddevTicketUsdMinor: bigint
      lastSeenAt: Date | null
      updatedAt: Date
    }, ExtArgs["result"]["actorProfile"]>
    composites: {}
  }

  type ActorProfileGetPayload<S extends boolean | null | undefined | ActorProfileDefaultArgs> = $Result.GetResult<Prisma.$ActorProfilePayload, S>

  type ActorProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ActorProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ActorProfileCountAggregateInputType | true
    }

  export interface ActorProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActorProfile'], meta: { name: 'ActorProfile' } }
    /**
     * Find zero or one ActorProfile that matches the filter.
     * @param {ActorProfileFindUniqueArgs} args - Arguments to find a ActorProfile
     * @example
     * // Get one ActorProfile
     * const actorProfile = await prisma.actorProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActorProfileFindUniqueArgs>(args: SelectSubset<T, ActorProfileFindUniqueArgs<ExtArgs>>): Prisma__ActorProfileClient<$Result.GetResult<Prisma.$ActorProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ActorProfile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ActorProfileFindUniqueOrThrowArgs} args - Arguments to find a ActorProfile
     * @example
     * // Get one ActorProfile
     * const actorProfile = await prisma.actorProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActorProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ActorProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActorProfileClient<$Result.GetResult<Prisma.$ActorProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ActorProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActorProfileFindFirstArgs} args - Arguments to find a ActorProfile
     * @example
     * // Get one ActorProfile
     * const actorProfile = await prisma.actorProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActorProfileFindFirstArgs>(args?: SelectSubset<T, ActorProfileFindFirstArgs<ExtArgs>>): Prisma__ActorProfileClient<$Result.GetResult<Prisma.$ActorProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ActorProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActorProfileFindFirstOrThrowArgs} args - Arguments to find a ActorProfile
     * @example
     * // Get one ActorProfile
     * const actorProfile = await prisma.actorProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActorProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ActorProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActorProfileClient<$Result.GetResult<Prisma.$ActorProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ActorProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActorProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActorProfiles
     * const actorProfiles = await prisma.actorProfile.findMany()
     * 
     * // Get first 10 ActorProfiles
     * const actorProfiles = await prisma.actorProfile.findMany({ take: 10 })
     * 
     * // Only select the `externalRef`
     * const actorProfileWithExternalRefOnly = await prisma.actorProfile.findMany({ select: { externalRef: true } })
     * 
     */
    findMany<T extends ActorProfileFindManyArgs>(args?: SelectSubset<T, ActorProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActorProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ActorProfile.
     * @param {ActorProfileCreateArgs} args - Arguments to create a ActorProfile.
     * @example
     * // Create one ActorProfile
     * const ActorProfile = await prisma.actorProfile.create({
     *   data: {
     *     // ... data to create a ActorProfile
     *   }
     * })
     * 
     */
    create<T extends ActorProfileCreateArgs>(args: SelectSubset<T, ActorProfileCreateArgs<ExtArgs>>): Prisma__ActorProfileClient<$Result.GetResult<Prisma.$ActorProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ActorProfiles.
     * @param {ActorProfileCreateManyArgs} args - Arguments to create many ActorProfiles.
     * @example
     * // Create many ActorProfiles
     * const actorProfile = await prisma.actorProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActorProfileCreateManyArgs>(args?: SelectSubset<T, ActorProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActorProfiles and returns the data saved in the database.
     * @param {ActorProfileCreateManyAndReturnArgs} args - Arguments to create many ActorProfiles.
     * @example
     * // Create many ActorProfiles
     * const actorProfile = await prisma.actorProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActorProfiles and only return the `externalRef`
     * const actorProfileWithExternalRefOnly = await prisma.actorProfile.createManyAndReturn({ 
     *   select: { externalRef: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActorProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ActorProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActorProfilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ActorProfile.
     * @param {ActorProfileDeleteArgs} args - Arguments to delete one ActorProfile.
     * @example
     * // Delete one ActorProfile
     * const ActorProfile = await prisma.actorProfile.delete({
     *   where: {
     *     // ... filter to delete one ActorProfile
     *   }
     * })
     * 
     */
    delete<T extends ActorProfileDeleteArgs>(args: SelectSubset<T, ActorProfileDeleteArgs<ExtArgs>>): Prisma__ActorProfileClient<$Result.GetResult<Prisma.$ActorProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ActorProfile.
     * @param {ActorProfileUpdateArgs} args - Arguments to update one ActorProfile.
     * @example
     * // Update one ActorProfile
     * const actorProfile = await prisma.actorProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActorProfileUpdateArgs>(args: SelectSubset<T, ActorProfileUpdateArgs<ExtArgs>>): Prisma__ActorProfileClient<$Result.GetResult<Prisma.$ActorProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ActorProfiles.
     * @param {ActorProfileDeleteManyArgs} args - Arguments to filter ActorProfiles to delete.
     * @example
     * // Delete a few ActorProfiles
     * const { count } = await prisma.actorProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActorProfileDeleteManyArgs>(args?: SelectSubset<T, ActorProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActorProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActorProfiles
     * const actorProfile = await prisma.actorProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActorProfileUpdateManyArgs>(args: SelectSubset<T, ActorProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ActorProfile.
     * @param {ActorProfileUpsertArgs} args - Arguments to update or create a ActorProfile.
     * @example
     * // Update or create a ActorProfile
     * const actorProfile = await prisma.actorProfile.upsert({
     *   create: {
     *     // ... data to create a ActorProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActorProfile we want to update
     *   }
     * })
     */
    upsert<T extends ActorProfileUpsertArgs>(args: SelectSubset<T, ActorProfileUpsertArgs<ExtArgs>>): Prisma__ActorProfileClient<$Result.GetResult<Prisma.$ActorProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ActorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActorProfileCountArgs} args - Arguments to filter ActorProfiles to count.
     * @example
     * // Count the number of ActorProfiles
     * const count = await prisma.actorProfile.count({
     *   where: {
     *     // ... the filter for the ActorProfiles we want to count
     *   }
     * })
    **/
    count<T extends ActorProfileCountArgs>(
      args?: Subset<T, ActorProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActorProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActorProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ActorProfileAggregateArgs>(args: Subset<T, ActorProfileAggregateArgs>): Prisma.PrismaPromise<GetActorProfileAggregateType<T>>

    /**
     * Group by ActorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActorProfileGroupByArgs} args - Group by arguments.
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
      T extends ActorProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActorProfileGroupByArgs['orderBy'] }
        : { orderBy?: ActorProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ActorProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActorProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActorProfile model
   */
  readonly fields: ActorProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActorProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActorProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ActorProfile model
   */ 
  interface ActorProfileFieldRefs {
    readonly externalRef: FieldRef<"ActorProfile", 'String'>
    readonly rolling24hUsdMinor: FieldRef<"ActorProfile", 'BigInt'>
    readonly rolling24hCount: FieldRef<"ActorProfile", 'Int'>
    readonly lifetimeCount: FieldRef<"ActorProfile", 'Int'>
    readonly meanTicketUsdMinor: FieldRef<"ActorProfile", 'BigInt'>
    readonly stddevTicketUsdMinor: FieldRef<"ActorProfile", 'BigInt'>
    readonly lastSeenAt: FieldRef<"ActorProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"ActorProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActorProfile findUnique
   */
  export type ActorProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActorProfile
     */
    select?: ActorProfileSelect<ExtArgs> | null
    /**
     * Filter, which ActorProfile to fetch.
     */
    where: ActorProfileWhereUniqueInput
  }

  /**
   * ActorProfile findUniqueOrThrow
   */
  export type ActorProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActorProfile
     */
    select?: ActorProfileSelect<ExtArgs> | null
    /**
     * Filter, which ActorProfile to fetch.
     */
    where: ActorProfileWhereUniqueInput
  }

  /**
   * ActorProfile findFirst
   */
  export type ActorProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActorProfile
     */
    select?: ActorProfileSelect<ExtArgs> | null
    /**
     * Filter, which ActorProfile to fetch.
     */
    where?: ActorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActorProfiles to fetch.
     */
    orderBy?: ActorProfileOrderByWithRelationInput | ActorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActorProfiles.
     */
    cursor?: ActorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActorProfiles.
     */
    distinct?: ActorProfileScalarFieldEnum | ActorProfileScalarFieldEnum[]
  }

  /**
   * ActorProfile findFirstOrThrow
   */
  export type ActorProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActorProfile
     */
    select?: ActorProfileSelect<ExtArgs> | null
    /**
     * Filter, which ActorProfile to fetch.
     */
    where?: ActorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActorProfiles to fetch.
     */
    orderBy?: ActorProfileOrderByWithRelationInput | ActorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActorProfiles.
     */
    cursor?: ActorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActorProfiles.
     */
    distinct?: ActorProfileScalarFieldEnum | ActorProfileScalarFieldEnum[]
  }

  /**
   * ActorProfile findMany
   */
  export type ActorProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActorProfile
     */
    select?: ActorProfileSelect<ExtArgs> | null
    /**
     * Filter, which ActorProfiles to fetch.
     */
    where?: ActorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActorProfiles to fetch.
     */
    orderBy?: ActorProfileOrderByWithRelationInput | ActorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActorProfiles.
     */
    cursor?: ActorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActorProfiles.
     */
    skip?: number
    distinct?: ActorProfileScalarFieldEnum | ActorProfileScalarFieldEnum[]
  }

  /**
   * ActorProfile create
   */
  export type ActorProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActorProfile
     */
    select?: ActorProfileSelect<ExtArgs> | null
    /**
     * The data needed to create a ActorProfile.
     */
    data: XOR<ActorProfileCreateInput, ActorProfileUncheckedCreateInput>
  }

  /**
   * ActorProfile createMany
   */
  export type ActorProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActorProfiles.
     */
    data: ActorProfileCreateManyInput | ActorProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActorProfile createManyAndReturn
   */
  export type ActorProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActorProfile
     */
    select?: ActorProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ActorProfiles.
     */
    data: ActorProfileCreateManyInput | ActorProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActorProfile update
   */
  export type ActorProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActorProfile
     */
    select?: ActorProfileSelect<ExtArgs> | null
    /**
     * The data needed to update a ActorProfile.
     */
    data: XOR<ActorProfileUpdateInput, ActorProfileUncheckedUpdateInput>
    /**
     * Choose, which ActorProfile to update.
     */
    where: ActorProfileWhereUniqueInput
  }

  /**
   * ActorProfile updateMany
   */
  export type ActorProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActorProfiles.
     */
    data: XOR<ActorProfileUpdateManyMutationInput, ActorProfileUncheckedUpdateManyInput>
    /**
     * Filter which ActorProfiles to update
     */
    where?: ActorProfileWhereInput
  }

  /**
   * ActorProfile upsert
   */
  export type ActorProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActorProfile
     */
    select?: ActorProfileSelect<ExtArgs> | null
    /**
     * The filter to search for the ActorProfile to update in case it exists.
     */
    where: ActorProfileWhereUniqueInput
    /**
     * In case the ActorProfile found by the `where` argument doesn't exist, create a new ActorProfile with this data.
     */
    create: XOR<ActorProfileCreateInput, ActorProfileUncheckedCreateInput>
    /**
     * In case the ActorProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActorProfileUpdateInput, ActorProfileUncheckedUpdateInput>
  }

  /**
   * ActorProfile delete
   */
  export type ActorProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActorProfile
     */
    select?: ActorProfileSelect<ExtArgs> | null
    /**
     * Filter which ActorProfile to delete.
     */
    where: ActorProfileWhereUniqueInput
  }

  /**
   * ActorProfile deleteMany
   */
  export type ActorProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActorProfiles to delete
     */
    where?: ActorProfileWhereInput
  }

  /**
   * ActorProfile without action
   */
  export type ActorProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActorProfile
     */
    select?: ActorProfileSelect<ExtArgs> | null
  }


  /**
   * Model CounterpartyEdge
   */

  export type AggregateCounterpartyEdge = {
    _count: CounterpartyEdgeCountAggregateOutputType | null
    _avg: CounterpartyEdgeAvgAggregateOutputType | null
    _sum: CounterpartyEdgeSumAggregateOutputType | null
    _min: CounterpartyEdgeMinAggregateOutputType | null
    _max: CounterpartyEdgeMaxAggregateOutputType | null
  }

  export type CounterpartyEdgeAvgAggregateOutputType = {
    txCount: number | null
    totalUsdMinor: number | null
  }

  export type CounterpartyEdgeSumAggregateOutputType = {
    txCount: number | null
    totalUsdMinor: bigint | null
  }

  export type CounterpartyEdgeMinAggregateOutputType = {
    id: string | null
    actorExternalRef: string | null
    counterpartyRef: string | null
    firstSeenAt: Date | null
    lastSeenAt: Date | null
    txCount: number | null
    totalUsdMinor: bigint | null
  }

  export type CounterpartyEdgeMaxAggregateOutputType = {
    id: string | null
    actorExternalRef: string | null
    counterpartyRef: string | null
    firstSeenAt: Date | null
    lastSeenAt: Date | null
    txCount: number | null
    totalUsdMinor: bigint | null
  }

  export type CounterpartyEdgeCountAggregateOutputType = {
    id: number
    actorExternalRef: number
    counterpartyRef: number
    firstSeenAt: number
    lastSeenAt: number
    txCount: number
    totalUsdMinor: number
    _all: number
  }


  export type CounterpartyEdgeAvgAggregateInputType = {
    txCount?: true
    totalUsdMinor?: true
  }

  export type CounterpartyEdgeSumAggregateInputType = {
    txCount?: true
    totalUsdMinor?: true
  }

  export type CounterpartyEdgeMinAggregateInputType = {
    id?: true
    actorExternalRef?: true
    counterpartyRef?: true
    firstSeenAt?: true
    lastSeenAt?: true
    txCount?: true
    totalUsdMinor?: true
  }

  export type CounterpartyEdgeMaxAggregateInputType = {
    id?: true
    actorExternalRef?: true
    counterpartyRef?: true
    firstSeenAt?: true
    lastSeenAt?: true
    txCount?: true
    totalUsdMinor?: true
  }

  export type CounterpartyEdgeCountAggregateInputType = {
    id?: true
    actorExternalRef?: true
    counterpartyRef?: true
    firstSeenAt?: true
    lastSeenAt?: true
    txCount?: true
    totalUsdMinor?: true
    _all?: true
  }

  export type CounterpartyEdgeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CounterpartyEdge to aggregate.
     */
    where?: CounterpartyEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CounterpartyEdges to fetch.
     */
    orderBy?: CounterpartyEdgeOrderByWithRelationInput | CounterpartyEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CounterpartyEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CounterpartyEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CounterpartyEdges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CounterpartyEdges
    **/
    _count?: true | CounterpartyEdgeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CounterpartyEdgeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CounterpartyEdgeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CounterpartyEdgeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CounterpartyEdgeMaxAggregateInputType
  }

  export type GetCounterpartyEdgeAggregateType<T extends CounterpartyEdgeAggregateArgs> = {
        [P in keyof T & keyof AggregateCounterpartyEdge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCounterpartyEdge[P]>
      : GetScalarType<T[P], AggregateCounterpartyEdge[P]>
  }




  export type CounterpartyEdgeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CounterpartyEdgeWhereInput
    orderBy?: CounterpartyEdgeOrderByWithAggregationInput | CounterpartyEdgeOrderByWithAggregationInput[]
    by: CounterpartyEdgeScalarFieldEnum[] | CounterpartyEdgeScalarFieldEnum
    having?: CounterpartyEdgeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CounterpartyEdgeCountAggregateInputType | true
    _avg?: CounterpartyEdgeAvgAggregateInputType
    _sum?: CounterpartyEdgeSumAggregateInputType
    _min?: CounterpartyEdgeMinAggregateInputType
    _max?: CounterpartyEdgeMaxAggregateInputType
  }

  export type CounterpartyEdgeGroupByOutputType = {
    id: string
    actorExternalRef: string
    counterpartyRef: string
    firstSeenAt: Date
    lastSeenAt: Date
    txCount: number
    totalUsdMinor: bigint
    _count: CounterpartyEdgeCountAggregateOutputType | null
    _avg: CounterpartyEdgeAvgAggregateOutputType | null
    _sum: CounterpartyEdgeSumAggregateOutputType | null
    _min: CounterpartyEdgeMinAggregateOutputType | null
    _max: CounterpartyEdgeMaxAggregateOutputType | null
  }

  type GetCounterpartyEdgeGroupByPayload<T extends CounterpartyEdgeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CounterpartyEdgeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CounterpartyEdgeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CounterpartyEdgeGroupByOutputType[P]>
            : GetScalarType<T[P], CounterpartyEdgeGroupByOutputType[P]>
        }
      >
    >


  export type CounterpartyEdgeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorExternalRef?: boolean
    counterpartyRef?: boolean
    firstSeenAt?: boolean
    lastSeenAt?: boolean
    txCount?: boolean
    totalUsdMinor?: boolean
  }, ExtArgs["result"]["counterpartyEdge"]>

  export type CounterpartyEdgeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorExternalRef?: boolean
    counterpartyRef?: boolean
    firstSeenAt?: boolean
    lastSeenAt?: boolean
    txCount?: boolean
    totalUsdMinor?: boolean
  }, ExtArgs["result"]["counterpartyEdge"]>

  export type CounterpartyEdgeSelectScalar = {
    id?: boolean
    actorExternalRef?: boolean
    counterpartyRef?: boolean
    firstSeenAt?: boolean
    lastSeenAt?: boolean
    txCount?: boolean
    totalUsdMinor?: boolean
  }


  export type $CounterpartyEdgePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CounterpartyEdge"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      actorExternalRef: string
      counterpartyRef: string
      firstSeenAt: Date
      lastSeenAt: Date
      txCount: number
      totalUsdMinor: bigint
    }, ExtArgs["result"]["counterpartyEdge"]>
    composites: {}
  }

  type CounterpartyEdgeGetPayload<S extends boolean | null | undefined | CounterpartyEdgeDefaultArgs> = $Result.GetResult<Prisma.$CounterpartyEdgePayload, S>

  type CounterpartyEdgeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CounterpartyEdgeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CounterpartyEdgeCountAggregateInputType | true
    }

  export interface CounterpartyEdgeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CounterpartyEdge'], meta: { name: 'CounterpartyEdge' } }
    /**
     * Find zero or one CounterpartyEdge that matches the filter.
     * @param {CounterpartyEdgeFindUniqueArgs} args - Arguments to find a CounterpartyEdge
     * @example
     * // Get one CounterpartyEdge
     * const counterpartyEdge = await prisma.counterpartyEdge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CounterpartyEdgeFindUniqueArgs>(args: SelectSubset<T, CounterpartyEdgeFindUniqueArgs<ExtArgs>>): Prisma__CounterpartyEdgeClient<$Result.GetResult<Prisma.$CounterpartyEdgePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CounterpartyEdge that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CounterpartyEdgeFindUniqueOrThrowArgs} args - Arguments to find a CounterpartyEdge
     * @example
     * // Get one CounterpartyEdge
     * const counterpartyEdge = await prisma.counterpartyEdge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CounterpartyEdgeFindUniqueOrThrowArgs>(args: SelectSubset<T, CounterpartyEdgeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CounterpartyEdgeClient<$Result.GetResult<Prisma.$CounterpartyEdgePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CounterpartyEdge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterpartyEdgeFindFirstArgs} args - Arguments to find a CounterpartyEdge
     * @example
     * // Get one CounterpartyEdge
     * const counterpartyEdge = await prisma.counterpartyEdge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CounterpartyEdgeFindFirstArgs>(args?: SelectSubset<T, CounterpartyEdgeFindFirstArgs<ExtArgs>>): Prisma__CounterpartyEdgeClient<$Result.GetResult<Prisma.$CounterpartyEdgePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CounterpartyEdge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterpartyEdgeFindFirstOrThrowArgs} args - Arguments to find a CounterpartyEdge
     * @example
     * // Get one CounterpartyEdge
     * const counterpartyEdge = await prisma.counterpartyEdge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CounterpartyEdgeFindFirstOrThrowArgs>(args?: SelectSubset<T, CounterpartyEdgeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CounterpartyEdgeClient<$Result.GetResult<Prisma.$CounterpartyEdgePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CounterpartyEdges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterpartyEdgeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CounterpartyEdges
     * const counterpartyEdges = await prisma.counterpartyEdge.findMany()
     * 
     * // Get first 10 CounterpartyEdges
     * const counterpartyEdges = await prisma.counterpartyEdge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const counterpartyEdgeWithIdOnly = await prisma.counterpartyEdge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CounterpartyEdgeFindManyArgs>(args?: SelectSubset<T, CounterpartyEdgeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CounterpartyEdgePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CounterpartyEdge.
     * @param {CounterpartyEdgeCreateArgs} args - Arguments to create a CounterpartyEdge.
     * @example
     * // Create one CounterpartyEdge
     * const CounterpartyEdge = await prisma.counterpartyEdge.create({
     *   data: {
     *     // ... data to create a CounterpartyEdge
     *   }
     * })
     * 
     */
    create<T extends CounterpartyEdgeCreateArgs>(args: SelectSubset<T, CounterpartyEdgeCreateArgs<ExtArgs>>): Prisma__CounterpartyEdgeClient<$Result.GetResult<Prisma.$CounterpartyEdgePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CounterpartyEdges.
     * @param {CounterpartyEdgeCreateManyArgs} args - Arguments to create many CounterpartyEdges.
     * @example
     * // Create many CounterpartyEdges
     * const counterpartyEdge = await prisma.counterpartyEdge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CounterpartyEdgeCreateManyArgs>(args?: SelectSubset<T, CounterpartyEdgeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CounterpartyEdges and returns the data saved in the database.
     * @param {CounterpartyEdgeCreateManyAndReturnArgs} args - Arguments to create many CounterpartyEdges.
     * @example
     * // Create many CounterpartyEdges
     * const counterpartyEdge = await prisma.counterpartyEdge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CounterpartyEdges and only return the `id`
     * const counterpartyEdgeWithIdOnly = await prisma.counterpartyEdge.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CounterpartyEdgeCreateManyAndReturnArgs>(args?: SelectSubset<T, CounterpartyEdgeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CounterpartyEdgePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CounterpartyEdge.
     * @param {CounterpartyEdgeDeleteArgs} args - Arguments to delete one CounterpartyEdge.
     * @example
     * // Delete one CounterpartyEdge
     * const CounterpartyEdge = await prisma.counterpartyEdge.delete({
     *   where: {
     *     // ... filter to delete one CounterpartyEdge
     *   }
     * })
     * 
     */
    delete<T extends CounterpartyEdgeDeleteArgs>(args: SelectSubset<T, CounterpartyEdgeDeleteArgs<ExtArgs>>): Prisma__CounterpartyEdgeClient<$Result.GetResult<Prisma.$CounterpartyEdgePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CounterpartyEdge.
     * @param {CounterpartyEdgeUpdateArgs} args - Arguments to update one CounterpartyEdge.
     * @example
     * // Update one CounterpartyEdge
     * const counterpartyEdge = await prisma.counterpartyEdge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CounterpartyEdgeUpdateArgs>(args: SelectSubset<T, CounterpartyEdgeUpdateArgs<ExtArgs>>): Prisma__CounterpartyEdgeClient<$Result.GetResult<Prisma.$CounterpartyEdgePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CounterpartyEdges.
     * @param {CounterpartyEdgeDeleteManyArgs} args - Arguments to filter CounterpartyEdges to delete.
     * @example
     * // Delete a few CounterpartyEdges
     * const { count } = await prisma.counterpartyEdge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CounterpartyEdgeDeleteManyArgs>(args?: SelectSubset<T, CounterpartyEdgeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CounterpartyEdges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterpartyEdgeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CounterpartyEdges
     * const counterpartyEdge = await prisma.counterpartyEdge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CounterpartyEdgeUpdateManyArgs>(args: SelectSubset<T, CounterpartyEdgeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CounterpartyEdge.
     * @param {CounterpartyEdgeUpsertArgs} args - Arguments to update or create a CounterpartyEdge.
     * @example
     * // Update or create a CounterpartyEdge
     * const counterpartyEdge = await prisma.counterpartyEdge.upsert({
     *   create: {
     *     // ... data to create a CounterpartyEdge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CounterpartyEdge we want to update
     *   }
     * })
     */
    upsert<T extends CounterpartyEdgeUpsertArgs>(args: SelectSubset<T, CounterpartyEdgeUpsertArgs<ExtArgs>>): Prisma__CounterpartyEdgeClient<$Result.GetResult<Prisma.$CounterpartyEdgePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CounterpartyEdges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterpartyEdgeCountArgs} args - Arguments to filter CounterpartyEdges to count.
     * @example
     * // Count the number of CounterpartyEdges
     * const count = await prisma.counterpartyEdge.count({
     *   where: {
     *     // ... the filter for the CounterpartyEdges we want to count
     *   }
     * })
    **/
    count<T extends CounterpartyEdgeCountArgs>(
      args?: Subset<T, CounterpartyEdgeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CounterpartyEdgeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CounterpartyEdge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterpartyEdgeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CounterpartyEdgeAggregateArgs>(args: Subset<T, CounterpartyEdgeAggregateArgs>): Prisma.PrismaPromise<GetCounterpartyEdgeAggregateType<T>>

    /**
     * Group by CounterpartyEdge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterpartyEdgeGroupByArgs} args - Group by arguments.
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
      T extends CounterpartyEdgeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CounterpartyEdgeGroupByArgs['orderBy'] }
        : { orderBy?: CounterpartyEdgeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CounterpartyEdgeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCounterpartyEdgeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CounterpartyEdge model
   */
  readonly fields: CounterpartyEdgeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CounterpartyEdge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CounterpartyEdgeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the CounterpartyEdge model
   */ 
  interface CounterpartyEdgeFieldRefs {
    readonly id: FieldRef<"CounterpartyEdge", 'String'>
    readonly actorExternalRef: FieldRef<"CounterpartyEdge", 'String'>
    readonly counterpartyRef: FieldRef<"CounterpartyEdge", 'String'>
    readonly firstSeenAt: FieldRef<"CounterpartyEdge", 'DateTime'>
    readonly lastSeenAt: FieldRef<"CounterpartyEdge", 'DateTime'>
    readonly txCount: FieldRef<"CounterpartyEdge", 'Int'>
    readonly totalUsdMinor: FieldRef<"CounterpartyEdge", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * CounterpartyEdge findUnique
   */
  export type CounterpartyEdgeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CounterpartyEdge
     */
    select?: CounterpartyEdgeSelect<ExtArgs> | null
    /**
     * Filter, which CounterpartyEdge to fetch.
     */
    where: CounterpartyEdgeWhereUniqueInput
  }

  /**
   * CounterpartyEdge findUniqueOrThrow
   */
  export type CounterpartyEdgeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CounterpartyEdge
     */
    select?: CounterpartyEdgeSelect<ExtArgs> | null
    /**
     * Filter, which CounterpartyEdge to fetch.
     */
    where: CounterpartyEdgeWhereUniqueInput
  }

  /**
   * CounterpartyEdge findFirst
   */
  export type CounterpartyEdgeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CounterpartyEdge
     */
    select?: CounterpartyEdgeSelect<ExtArgs> | null
    /**
     * Filter, which CounterpartyEdge to fetch.
     */
    where?: CounterpartyEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CounterpartyEdges to fetch.
     */
    orderBy?: CounterpartyEdgeOrderByWithRelationInput | CounterpartyEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CounterpartyEdges.
     */
    cursor?: CounterpartyEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CounterpartyEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CounterpartyEdges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CounterpartyEdges.
     */
    distinct?: CounterpartyEdgeScalarFieldEnum | CounterpartyEdgeScalarFieldEnum[]
  }

  /**
   * CounterpartyEdge findFirstOrThrow
   */
  export type CounterpartyEdgeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CounterpartyEdge
     */
    select?: CounterpartyEdgeSelect<ExtArgs> | null
    /**
     * Filter, which CounterpartyEdge to fetch.
     */
    where?: CounterpartyEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CounterpartyEdges to fetch.
     */
    orderBy?: CounterpartyEdgeOrderByWithRelationInput | CounterpartyEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CounterpartyEdges.
     */
    cursor?: CounterpartyEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CounterpartyEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CounterpartyEdges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CounterpartyEdges.
     */
    distinct?: CounterpartyEdgeScalarFieldEnum | CounterpartyEdgeScalarFieldEnum[]
  }

  /**
   * CounterpartyEdge findMany
   */
  export type CounterpartyEdgeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CounterpartyEdge
     */
    select?: CounterpartyEdgeSelect<ExtArgs> | null
    /**
     * Filter, which CounterpartyEdges to fetch.
     */
    where?: CounterpartyEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CounterpartyEdges to fetch.
     */
    orderBy?: CounterpartyEdgeOrderByWithRelationInput | CounterpartyEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CounterpartyEdges.
     */
    cursor?: CounterpartyEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CounterpartyEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CounterpartyEdges.
     */
    skip?: number
    distinct?: CounterpartyEdgeScalarFieldEnum | CounterpartyEdgeScalarFieldEnum[]
  }

  /**
   * CounterpartyEdge create
   */
  export type CounterpartyEdgeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CounterpartyEdge
     */
    select?: CounterpartyEdgeSelect<ExtArgs> | null
    /**
     * The data needed to create a CounterpartyEdge.
     */
    data: XOR<CounterpartyEdgeCreateInput, CounterpartyEdgeUncheckedCreateInput>
  }

  /**
   * CounterpartyEdge createMany
   */
  export type CounterpartyEdgeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CounterpartyEdges.
     */
    data: CounterpartyEdgeCreateManyInput | CounterpartyEdgeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CounterpartyEdge createManyAndReturn
   */
  export type CounterpartyEdgeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CounterpartyEdge
     */
    select?: CounterpartyEdgeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CounterpartyEdges.
     */
    data: CounterpartyEdgeCreateManyInput | CounterpartyEdgeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CounterpartyEdge update
   */
  export type CounterpartyEdgeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CounterpartyEdge
     */
    select?: CounterpartyEdgeSelect<ExtArgs> | null
    /**
     * The data needed to update a CounterpartyEdge.
     */
    data: XOR<CounterpartyEdgeUpdateInput, CounterpartyEdgeUncheckedUpdateInput>
    /**
     * Choose, which CounterpartyEdge to update.
     */
    where: CounterpartyEdgeWhereUniqueInput
  }

  /**
   * CounterpartyEdge updateMany
   */
  export type CounterpartyEdgeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CounterpartyEdges.
     */
    data: XOR<CounterpartyEdgeUpdateManyMutationInput, CounterpartyEdgeUncheckedUpdateManyInput>
    /**
     * Filter which CounterpartyEdges to update
     */
    where?: CounterpartyEdgeWhereInput
  }

  /**
   * CounterpartyEdge upsert
   */
  export type CounterpartyEdgeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CounterpartyEdge
     */
    select?: CounterpartyEdgeSelect<ExtArgs> | null
    /**
     * The filter to search for the CounterpartyEdge to update in case it exists.
     */
    where: CounterpartyEdgeWhereUniqueInput
    /**
     * In case the CounterpartyEdge found by the `where` argument doesn't exist, create a new CounterpartyEdge with this data.
     */
    create: XOR<CounterpartyEdgeCreateInput, CounterpartyEdgeUncheckedCreateInput>
    /**
     * In case the CounterpartyEdge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CounterpartyEdgeUpdateInput, CounterpartyEdgeUncheckedUpdateInput>
  }

  /**
   * CounterpartyEdge delete
   */
  export type CounterpartyEdgeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CounterpartyEdge
     */
    select?: CounterpartyEdgeSelect<ExtArgs> | null
    /**
     * Filter which CounterpartyEdge to delete.
     */
    where: CounterpartyEdgeWhereUniqueInput
  }

  /**
   * CounterpartyEdge deleteMany
   */
  export type CounterpartyEdgeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CounterpartyEdges to delete
     */
    where?: CounterpartyEdgeWhereInput
  }

  /**
   * CounterpartyEdge without action
   */
  export type CounterpartyEdgeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CounterpartyEdge
     */
    select?: CounterpartyEdgeSelect<ExtArgs> | null
  }


  /**
   * Model RiskAssessment
   */

  export type AggregateRiskAssessment = {
    _count: RiskAssessmentCountAggregateOutputType | null
    _avg: RiskAssessmentAvgAggregateOutputType | null
    _sum: RiskAssessmentSumAggregateOutputType | null
    _min: RiskAssessmentMinAggregateOutputType | null
    _max: RiskAssessmentMaxAggregateOutputType | null
  }

  export type RiskAssessmentAvgAggregateOutputType = {
    amountUsdMinor: number | null
    finalScore: number | null
  }

  export type RiskAssessmentSumAggregateOutputType = {
    amountUsdMinor: bigint | null
    finalScore: number | null
  }

  export type RiskAssessmentMinAggregateOutputType = {
    id: string | null
    intentId: string | null
    transactionId: string | null
    actorExternalRef: string | null
    counterpartyRef: string | null
    amountUsdMinor: bigint | null
    finalScore: number | null
    decision: $Enums.RiskDecision | null
    createdAt: Date | null
  }

  export type RiskAssessmentMaxAggregateOutputType = {
    id: string | null
    intentId: string | null
    transactionId: string | null
    actorExternalRef: string | null
    counterpartyRef: string | null
    amountUsdMinor: bigint | null
    finalScore: number | null
    decision: $Enums.RiskDecision | null
    createdAt: Date | null
  }

  export type RiskAssessmentCountAggregateOutputType = {
    id: number
    intentId: number
    transactionId: number
    actorExternalRef: number
    counterpartyRef: number
    amountUsdMinor: number
    components: number
    finalScore: number
    decision: number
    reasons: number
    createdAt: number
    _all: number
  }


  export type RiskAssessmentAvgAggregateInputType = {
    amountUsdMinor?: true
    finalScore?: true
  }

  export type RiskAssessmentSumAggregateInputType = {
    amountUsdMinor?: true
    finalScore?: true
  }

  export type RiskAssessmentMinAggregateInputType = {
    id?: true
    intentId?: true
    transactionId?: true
    actorExternalRef?: true
    counterpartyRef?: true
    amountUsdMinor?: true
    finalScore?: true
    decision?: true
    createdAt?: true
  }

  export type RiskAssessmentMaxAggregateInputType = {
    id?: true
    intentId?: true
    transactionId?: true
    actorExternalRef?: true
    counterpartyRef?: true
    amountUsdMinor?: true
    finalScore?: true
    decision?: true
    createdAt?: true
  }

  export type RiskAssessmentCountAggregateInputType = {
    id?: true
    intentId?: true
    transactionId?: true
    actorExternalRef?: true
    counterpartyRef?: true
    amountUsdMinor?: true
    components?: true
    finalScore?: true
    decision?: true
    reasons?: true
    createdAt?: true
    _all?: true
  }

  export type RiskAssessmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiskAssessment to aggregate.
     */
    where?: RiskAssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskAssessments to fetch.
     */
    orderBy?: RiskAssessmentOrderByWithRelationInput | RiskAssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RiskAssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskAssessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskAssessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RiskAssessments
    **/
    _count?: true | RiskAssessmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RiskAssessmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RiskAssessmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RiskAssessmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RiskAssessmentMaxAggregateInputType
  }

  export type GetRiskAssessmentAggregateType<T extends RiskAssessmentAggregateArgs> = {
        [P in keyof T & keyof AggregateRiskAssessment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRiskAssessment[P]>
      : GetScalarType<T[P], AggregateRiskAssessment[P]>
  }




  export type RiskAssessmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiskAssessmentWhereInput
    orderBy?: RiskAssessmentOrderByWithAggregationInput | RiskAssessmentOrderByWithAggregationInput[]
    by: RiskAssessmentScalarFieldEnum[] | RiskAssessmentScalarFieldEnum
    having?: RiskAssessmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RiskAssessmentCountAggregateInputType | true
    _avg?: RiskAssessmentAvgAggregateInputType
    _sum?: RiskAssessmentSumAggregateInputType
    _min?: RiskAssessmentMinAggregateInputType
    _max?: RiskAssessmentMaxAggregateInputType
  }

  export type RiskAssessmentGroupByOutputType = {
    id: string
    intentId: string | null
    transactionId: string | null
    actorExternalRef: string
    counterpartyRef: string | null
    amountUsdMinor: bigint
    components: JsonValue
    finalScore: number
    decision: $Enums.RiskDecision
    reasons: string[]
    createdAt: Date
    _count: RiskAssessmentCountAggregateOutputType | null
    _avg: RiskAssessmentAvgAggregateOutputType | null
    _sum: RiskAssessmentSumAggregateOutputType | null
    _min: RiskAssessmentMinAggregateOutputType | null
    _max: RiskAssessmentMaxAggregateOutputType | null
  }

  type GetRiskAssessmentGroupByPayload<T extends RiskAssessmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RiskAssessmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RiskAssessmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RiskAssessmentGroupByOutputType[P]>
            : GetScalarType<T[P], RiskAssessmentGroupByOutputType[P]>
        }
      >
    >


  export type RiskAssessmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    intentId?: boolean
    transactionId?: boolean
    actorExternalRef?: boolean
    counterpartyRef?: boolean
    amountUsdMinor?: boolean
    components?: boolean
    finalScore?: boolean
    decision?: boolean
    reasons?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["riskAssessment"]>

  export type RiskAssessmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    intentId?: boolean
    transactionId?: boolean
    actorExternalRef?: boolean
    counterpartyRef?: boolean
    amountUsdMinor?: boolean
    components?: boolean
    finalScore?: boolean
    decision?: boolean
    reasons?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["riskAssessment"]>

  export type RiskAssessmentSelectScalar = {
    id?: boolean
    intentId?: boolean
    transactionId?: boolean
    actorExternalRef?: boolean
    counterpartyRef?: boolean
    amountUsdMinor?: boolean
    components?: boolean
    finalScore?: boolean
    decision?: boolean
    reasons?: boolean
    createdAt?: boolean
  }


  export type $RiskAssessmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RiskAssessment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      intentId: string | null
      transactionId: string | null
      actorExternalRef: string
      counterpartyRef: string | null
      amountUsdMinor: bigint
      /**
       * Component scores (each 0..100) merged into the final score for transparency.
       */
      components: Prisma.JsonValue
      finalScore: number
      decision: $Enums.RiskDecision
      reasons: string[]
      createdAt: Date
    }, ExtArgs["result"]["riskAssessment"]>
    composites: {}
  }

  type RiskAssessmentGetPayload<S extends boolean | null | undefined | RiskAssessmentDefaultArgs> = $Result.GetResult<Prisma.$RiskAssessmentPayload, S>

  type RiskAssessmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RiskAssessmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RiskAssessmentCountAggregateInputType | true
    }

  export interface RiskAssessmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RiskAssessment'], meta: { name: 'RiskAssessment' } }
    /**
     * Find zero or one RiskAssessment that matches the filter.
     * @param {RiskAssessmentFindUniqueArgs} args - Arguments to find a RiskAssessment
     * @example
     * // Get one RiskAssessment
     * const riskAssessment = await prisma.riskAssessment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RiskAssessmentFindUniqueArgs>(args: SelectSubset<T, RiskAssessmentFindUniqueArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RiskAssessment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RiskAssessmentFindUniqueOrThrowArgs} args - Arguments to find a RiskAssessment
     * @example
     * // Get one RiskAssessment
     * const riskAssessment = await prisma.riskAssessment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RiskAssessmentFindUniqueOrThrowArgs>(args: SelectSubset<T, RiskAssessmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RiskAssessment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskAssessmentFindFirstArgs} args - Arguments to find a RiskAssessment
     * @example
     * // Get one RiskAssessment
     * const riskAssessment = await prisma.riskAssessment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RiskAssessmentFindFirstArgs>(args?: SelectSubset<T, RiskAssessmentFindFirstArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RiskAssessment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskAssessmentFindFirstOrThrowArgs} args - Arguments to find a RiskAssessment
     * @example
     * // Get one RiskAssessment
     * const riskAssessment = await prisma.riskAssessment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RiskAssessmentFindFirstOrThrowArgs>(args?: SelectSubset<T, RiskAssessmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RiskAssessments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskAssessmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RiskAssessments
     * const riskAssessments = await prisma.riskAssessment.findMany()
     * 
     * // Get first 10 RiskAssessments
     * const riskAssessments = await prisma.riskAssessment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const riskAssessmentWithIdOnly = await prisma.riskAssessment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RiskAssessmentFindManyArgs>(args?: SelectSubset<T, RiskAssessmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RiskAssessment.
     * @param {RiskAssessmentCreateArgs} args - Arguments to create a RiskAssessment.
     * @example
     * // Create one RiskAssessment
     * const RiskAssessment = await prisma.riskAssessment.create({
     *   data: {
     *     // ... data to create a RiskAssessment
     *   }
     * })
     * 
     */
    create<T extends RiskAssessmentCreateArgs>(args: SelectSubset<T, RiskAssessmentCreateArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RiskAssessments.
     * @param {RiskAssessmentCreateManyArgs} args - Arguments to create many RiskAssessments.
     * @example
     * // Create many RiskAssessments
     * const riskAssessment = await prisma.riskAssessment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RiskAssessmentCreateManyArgs>(args?: SelectSubset<T, RiskAssessmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RiskAssessments and returns the data saved in the database.
     * @param {RiskAssessmentCreateManyAndReturnArgs} args - Arguments to create many RiskAssessments.
     * @example
     * // Create many RiskAssessments
     * const riskAssessment = await prisma.riskAssessment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RiskAssessments and only return the `id`
     * const riskAssessmentWithIdOnly = await prisma.riskAssessment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RiskAssessmentCreateManyAndReturnArgs>(args?: SelectSubset<T, RiskAssessmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RiskAssessment.
     * @param {RiskAssessmentDeleteArgs} args - Arguments to delete one RiskAssessment.
     * @example
     * // Delete one RiskAssessment
     * const RiskAssessment = await prisma.riskAssessment.delete({
     *   where: {
     *     // ... filter to delete one RiskAssessment
     *   }
     * })
     * 
     */
    delete<T extends RiskAssessmentDeleteArgs>(args: SelectSubset<T, RiskAssessmentDeleteArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RiskAssessment.
     * @param {RiskAssessmentUpdateArgs} args - Arguments to update one RiskAssessment.
     * @example
     * // Update one RiskAssessment
     * const riskAssessment = await prisma.riskAssessment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RiskAssessmentUpdateArgs>(args: SelectSubset<T, RiskAssessmentUpdateArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RiskAssessments.
     * @param {RiskAssessmentDeleteManyArgs} args - Arguments to filter RiskAssessments to delete.
     * @example
     * // Delete a few RiskAssessments
     * const { count } = await prisma.riskAssessment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RiskAssessmentDeleteManyArgs>(args?: SelectSubset<T, RiskAssessmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RiskAssessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskAssessmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RiskAssessments
     * const riskAssessment = await prisma.riskAssessment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RiskAssessmentUpdateManyArgs>(args: SelectSubset<T, RiskAssessmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RiskAssessment.
     * @param {RiskAssessmentUpsertArgs} args - Arguments to update or create a RiskAssessment.
     * @example
     * // Update or create a RiskAssessment
     * const riskAssessment = await prisma.riskAssessment.upsert({
     *   create: {
     *     // ... data to create a RiskAssessment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RiskAssessment we want to update
     *   }
     * })
     */
    upsert<T extends RiskAssessmentUpsertArgs>(args: SelectSubset<T, RiskAssessmentUpsertArgs<ExtArgs>>): Prisma__RiskAssessmentClient<$Result.GetResult<Prisma.$RiskAssessmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RiskAssessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskAssessmentCountArgs} args - Arguments to filter RiskAssessments to count.
     * @example
     * // Count the number of RiskAssessments
     * const count = await prisma.riskAssessment.count({
     *   where: {
     *     // ... the filter for the RiskAssessments we want to count
     *   }
     * })
    **/
    count<T extends RiskAssessmentCountArgs>(
      args?: Subset<T, RiskAssessmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RiskAssessmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RiskAssessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskAssessmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RiskAssessmentAggregateArgs>(args: Subset<T, RiskAssessmentAggregateArgs>): Prisma.PrismaPromise<GetRiskAssessmentAggregateType<T>>

    /**
     * Group by RiskAssessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskAssessmentGroupByArgs} args - Group by arguments.
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
      T extends RiskAssessmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RiskAssessmentGroupByArgs['orderBy'] }
        : { orderBy?: RiskAssessmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RiskAssessmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRiskAssessmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RiskAssessment model
   */
  readonly fields: RiskAssessmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RiskAssessment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RiskAssessmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the RiskAssessment model
   */ 
  interface RiskAssessmentFieldRefs {
    readonly id: FieldRef<"RiskAssessment", 'String'>
    readonly intentId: FieldRef<"RiskAssessment", 'String'>
    readonly transactionId: FieldRef<"RiskAssessment", 'String'>
    readonly actorExternalRef: FieldRef<"RiskAssessment", 'String'>
    readonly counterpartyRef: FieldRef<"RiskAssessment", 'String'>
    readonly amountUsdMinor: FieldRef<"RiskAssessment", 'BigInt'>
    readonly components: FieldRef<"RiskAssessment", 'Json'>
    readonly finalScore: FieldRef<"RiskAssessment", 'Int'>
    readonly decision: FieldRef<"RiskAssessment", 'RiskDecision'>
    readonly reasons: FieldRef<"RiskAssessment", 'String[]'>
    readonly createdAt: FieldRef<"RiskAssessment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RiskAssessment findUnique
   */
  export type RiskAssessmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Filter, which RiskAssessment to fetch.
     */
    where: RiskAssessmentWhereUniqueInput
  }

  /**
   * RiskAssessment findUniqueOrThrow
   */
  export type RiskAssessmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Filter, which RiskAssessment to fetch.
     */
    where: RiskAssessmentWhereUniqueInput
  }

  /**
   * RiskAssessment findFirst
   */
  export type RiskAssessmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Filter, which RiskAssessment to fetch.
     */
    where?: RiskAssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskAssessments to fetch.
     */
    orderBy?: RiskAssessmentOrderByWithRelationInput | RiskAssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiskAssessments.
     */
    cursor?: RiskAssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskAssessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskAssessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiskAssessments.
     */
    distinct?: RiskAssessmentScalarFieldEnum | RiskAssessmentScalarFieldEnum[]
  }

  /**
   * RiskAssessment findFirstOrThrow
   */
  export type RiskAssessmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Filter, which RiskAssessment to fetch.
     */
    where?: RiskAssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskAssessments to fetch.
     */
    orderBy?: RiskAssessmentOrderByWithRelationInput | RiskAssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiskAssessments.
     */
    cursor?: RiskAssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskAssessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskAssessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiskAssessments.
     */
    distinct?: RiskAssessmentScalarFieldEnum | RiskAssessmentScalarFieldEnum[]
  }

  /**
   * RiskAssessment findMany
   */
  export type RiskAssessmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Filter, which RiskAssessments to fetch.
     */
    where?: RiskAssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiskAssessments to fetch.
     */
    orderBy?: RiskAssessmentOrderByWithRelationInput | RiskAssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RiskAssessments.
     */
    cursor?: RiskAssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiskAssessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiskAssessments.
     */
    skip?: number
    distinct?: RiskAssessmentScalarFieldEnum | RiskAssessmentScalarFieldEnum[]
  }

  /**
   * RiskAssessment create
   */
  export type RiskAssessmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * The data needed to create a RiskAssessment.
     */
    data: XOR<RiskAssessmentCreateInput, RiskAssessmentUncheckedCreateInput>
  }

  /**
   * RiskAssessment createMany
   */
  export type RiskAssessmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RiskAssessments.
     */
    data: RiskAssessmentCreateManyInput | RiskAssessmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RiskAssessment createManyAndReturn
   */
  export type RiskAssessmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RiskAssessments.
     */
    data: RiskAssessmentCreateManyInput | RiskAssessmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RiskAssessment update
   */
  export type RiskAssessmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * The data needed to update a RiskAssessment.
     */
    data: XOR<RiskAssessmentUpdateInput, RiskAssessmentUncheckedUpdateInput>
    /**
     * Choose, which RiskAssessment to update.
     */
    where: RiskAssessmentWhereUniqueInput
  }

  /**
   * RiskAssessment updateMany
   */
  export type RiskAssessmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RiskAssessments.
     */
    data: XOR<RiskAssessmentUpdateManyMutationInput, RiskAssessmentUncheckedUpdateManyInput>
    /**
     * Filter which RiskAssessments to update
     */
    where?: RiskAssessmentWhereInput
  }

  /**
   * RiskAssessment upsert
   */
  export type RiskAssessmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * The filter to search for the RiskAssessment to update in case it exists.
     */
    where: RiskAssessmentWhereUniqueInput
    /**
     * In case the RiskAssessment found by the `where` argument doesn't exist, create a new RiskAssessment with this data.
     */
    create: XOR<RiskAssessmentCreateInput, RiskAssessmentUncheckedCreateInput>
    /**
     * In case the RiskAssessment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RiskAssessmentUpdateInput, RiskAssessmentUncheckedUpdateInput>
  }

  /**
   * RiskAssessment delete
   */
  export type RiskAssessmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
    /**
     * Filter which RiskAssessment to delete.
     */
    where: RiskAssessmentWhereUniqueInput
  }

  /**
   * RiskAssessment deleteMany
   */
  export type RiskAssessmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiskAssessments to delete
     */
    where?: RiskAssessmentWhereInput
  }

  /**
   * RiskAssessment without action
   */
  export type RiskAssessmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiskAssessment
     */
    select?: RiskAssessmentSelect<ExtArgs> | null
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


  export const ActorProfileScalarFieldEnum: {
    externalRef: 'externalRef',
    rolling24hUsdMinor: 'rolling24hUsdMinor',
    rolling24hCount: 'rolling24hCount',
    lifetimeCount: 'lifetimeCount',
    meanTicketUsdMinor: 'meanTicketUsdMinor',
    stddevTicketUsdMinor: 'stddevTicketUsdMinor',
    lastSeenAt: 'lastSeenAt',
    updatedAt: 'updatedAt'
  };

  export type ActorProfileScalarFieldEnum = (typeof ActorProfileScalarFieldEnum)[keyof typeof ActorProfileScalarFieldEnum]


  export const CounterpartyEdgeScalarFieldEnum: {
    id: 'id',
    actorExternalRef: 'actorExternalRef',
    counterpartyRef: 'counterpartyRef',
    firstSeenAt: 'firstSeenAt',
    lastSeenAt: 'lastSeenAt',
    txCount: 'txCount',
    totalUsdMinor: 'totalUsdMinor'
  };

  export type CounterpartyEdgeScalarFieldEnum = (typeof CounterpartyEdgeScalarFieldEnum)[keyof typeof CounterpartyEdgeScalarFieldEnum]


  export const RiskAssessmentScalarFieldEnum: {
    id: 'id',
    intentId: 'intentId',
    transactionId: 'transactionId',
    actorExternalRef: 'actorExternalRef',
    counterpartyRef: 'counterpartyRef',
    amountUsdMinor: 'amountUsdMinor',
    components: 'components',
    finalScore: 'finalScore',
    decision: 'decision',
    reasons: 'reasons',
    createdAt: 'createdAt'
  };

  export type RiskAssessmentScalarFieldEnum = (typeof RiskAssessmentScalarFieldEnum)[keyof typeof RiskAssessmentScalarFieldEnum]


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
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'RiskDecision'
   */
  export type EnumRiskDecisionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RiskDecision'>
    


  /**
   * Reference to a field of type 'RiskDecision[]'
   */
  export type ListEnumRiskDecisionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RiskDecision[]'>
    


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


  export type ActorProfileWhereInput = {
    AND?: ActorProfileWhereInput | ActorProfileWhereInput[]
    OR?: ActorProfileWhereInput[]
    NOT?: ActorProfileWhereInput | ActorProfileWhereInput[]
    externalRef?: StringFilter<"ActorProfile"> | string
    rolling24hUsdMinor?: BigIntFilter<"ActorProfile"> | bigint | number
    rolling24hCount?: IntFilter<"ActorProfile"> | number
    lifetimeCount?: IntFilter<"ActorProfile"> | number
    meanTicketUsdMinor?: BigIntFilter<"ActorProfile"> | bigint | number
    stddevTicketUsdMinor?: BigIntFilter<"ActorProfile"> | bigint | number
    lastSeenAt?: DateTimeNullableFilter<"ActorProfile"> | Date | string | null
    updatedAt?: DateTimeFilter<"ActorProfile"> | Date | string
  }

  export type ActorProfileOrderByWithRelationInput = {
    externalRef?: SortOrder
    rolling24hUsdMinor?: SortOrder
    rolling24hCount?: SortOrder
    lifetimeCount?: SortOrder
    meanTicketUsdMinor?: SortOrder
    stddevTicketUsdMinor?: SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type ActorProfileWhereUniqueInput = Prisma.AtLeast<{
    externalRef?: string
    AND?: ActorProfileWhereInput | ActorProfileWhereInput[]
    OR?: ActorProfileWhereInput[]
    NOT?: ActorProfileWhereInput | ActorProfileWhereInput[]
    rolling24hUsdMinor?: BigIntFilter<"ActorProfile"> | bigint | number
    rolling24hCount?: IntFilter<"ActorProfile"> | number
    lifetimeCount?: IntFilter<"ActorProfile"> | number
    meanTicketUsdMinor?: BigIntFilter<"ActorProfile"> | bigint | number
    stddevTicketUsdMinor?: BigIntFilter<"ActorProfile"> | bigint | number
    lastSeenAt?: DateTimeNullableFilter<"ActorProfile"> | Date | string | null
    updatedAt?: DateTimeFilter<"ActorProfile"> | Date | string
  }, "externalRef">

  export type ActorProfileOrderByWithAggregationInput = {
    externalRef?: SortOrder
    rolling24hUsdMinor?: SortOrder
    rolling24hCount?: SortOrder
    lifetimeCount?: SortOrder
    meanTicketUsdMinor?: SortOrder
    stddevTicketUsdMinor?: SortOrder
    lastSeenAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: ActorProfileCountOrderByAggregateInput
    _avg?: ActorProfileAvgOrderByAggregateInput
    _max?: ActorProfileMaxOrderByAggregateInput
    _min?: ActorProfileMinOrderByAggregateInput
    _sum?: ActorProfileSumOrderByAggregateInput
  }

  export type ActorProfileScalarWhereWithAggregatesInput = {
    AND?: ActorProfileScalarWhereWithAggregatesInput | ActorProfileScalarWhereWithAggregatesInput[]
    OR?: ActorProfileScalarWhereWithAggregatesInput[]
    NOT?: ActorProfileScalarWhereWithAggregatesInput | ActorProfileScalarWhereWithAggregatesInput[]
    externalRef?: StringWithAggregatesFilter<"ActorProfile"> | string
    rolling24hUsdMinor?: BigIntWithAggregatesFilter<"ActorProfile"> | bigint | number
    rolling24hCount?: IntWithAggregatesFilter<"ActorProfile"> | number
    lifetimeCount?: IntWithAggregatesFilter<"ActorProfile"> | number
    meanTicketUsdMinor?: BigIntWithAggregatesFilter<"ActorProfile"> | bigint | number
    stddevTicketUsdMinor?: BigIntWithAggregatesFilter<"ActorProfile"> | bigint | number
    lastSeenAt?: DateTimeNullableWithAggregatesFilter<"ActorProfile"> | Date | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"ActorProfile"> | Date | string
  }

  export type CounterpartyEdgeWhereInput = {
    AND?: CounterpartyEdgeWhereInput | CounterpartyEdgeWhereInput[]
    OR?: CounterpartyEdgeWhereInput[]
    NOT?: CounterpartyEdgeWhereInput | CounterpartyEdgeWhereInput[]
    id?: UuidFilter<"CounterpartyEdge"> | string
    actorExternalRef?: StringFilter<"CounterpartyEdge"> | string
    counterpartyRef?: StringFilter<"CounterpartyEdge"> | string
    firstSeenAt?: DateTimeFilter<"CounterpartyEdge"> | Date | string
    lastSeenAt?: DateTimeFilter<"CounterpartyEdge"> | Date | string
    txCount?: IntFilter<"CounterpartyEdge"> | number
    totalUsdMinor?: BigIntFilter<"CounterpartyEdge"> | bigint | number
  }

  export type CounterpartyEdgeOrderByWithRelationInput = {
    id?: SortOrder
    actorExternalRef?: SortOrder
    counterpartyRef?: SortOrder
    firstSeenAt?: SortOrder
    lastSeenAt?: SortOrder
    txCount?: SortOrder
    totalUsdMinor?: SortOrder
  }

  export type CounterpartyEdgeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    actorExternalRef_counterpartyRef?: CounterpartyEdgeActorExternalRefCounterpartyRefCompoundUniqueInput
    AND?: CounterpartyEdgeWhereInput | CounterpartyEdgeWhereInput[]
    OR?: CounterpartyEdgeWhereInput[]
    NOT?: CounterpartyEdgeWhereInput | CounterpartyEdgeWhereInput[]
    actorExternalRef?: StringFilter<"CounterpartyEdge"> | string
    counterpartyRef?: StringFilter<"CounterpartyEdge"> | string
    firstSeenAt?: DateTimeFilter<"CounterpartyEdge"> | Date | string
    lastSeenAt?: DateTimeFilter<"CounterpartyEdge"> | Date | string
    txCount?: IntFilter<"CounterpartyEdge"> | number
    totalUsdMinor?: BigIntFilter<"CounterpartyEdge"> | bigint | number
  }, "id" | "actorExternalRef_counterpartyRef">

  export type CounterpartyEdgeOrderByWithAggregationInput = {
    id?: SortOrder
    actorExternalRef?: SortOrder
    counterpartyRef?: SortOrder
    firstSeenAt?: SortOrder
    lastSeenAt?: SortOrder
    txCount?: SortOrder
    totalUsdMinor?: SortOrder
    _count?: CounterpartyEdgeCountOrderByAggregateInput
    _avg?: CounterpartyEdgeAvgOrderByAggregateInput
    _max?: CounterpartyEdgeMaxOrderByAggregateInput
    _min?: CounterpartyEdgeMinOrderByAggregateInput
    _sum?: CounterpartyEdgeSumOrderByAggregateInput
  }

  export type CounterpartyEdgeScalarWhereWithAggregatesInput = {
    AND?: CounterpartyEdgeScalarWhereWithAggregatesInput | CounterpartyEdgeScalarWhereWithAggregatesInput[]
    OR?: CounterpartyEdgeScalarWhereWithAggregatesInput[]
    NOT?: CounterpartyEdgeScalarWhereWithAggregatesInput | CounterpartyEdgeScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CounterpartyEdge"> | string
    actorExternalRef?: StringWithAggregatesFilter<"CounterpartyEdge"> | string
    counterpartyRef?: StringWithAggregatesFilter<"CounterpartyEdge"> | string
    firstSeenAt?: DateTimeWithAggregatesFilter<"CounterpartyEdge"> | Date | string
    lastSeenAt?: DateTimeWithAggregatesFilter<"CounterpartyEdge"> | Date | string
    txCount?: IntWithAggregatesFilter<"CounterpartyEdge"> | number
    totalUsdMinor?: BigIntWithAggregatesFilter<"CounterpartyEdge"> | bigint | number
  }

  export type RiskAssessmentWhereInput = {
    AND?: RiskAssessmentWhereInput | RiskAssessmentWhereInput[]
    OR?: RiskAssessmentWhereInput[]
    NOT?: RiskAssessmentWhereInput | RiskAssessmentWhereInput[]
    id?: UuidFilter<"RiskAssessment"> | string
    intentId?: StringNullableFilter<"RiskAssessment"> | string | null
    transactionId?: StringNullableFilter<"RiskAssessment"> | string | null
    actorExternalRef?: StringFilter<"RiskAssessment"> | string
    counterpartyRef?: StringNullableFilter<"RiskAssessment"> | string | null
    amountUsdMinor?: BigIntFilter<"RiskAssessment"> | bigint | number
    components?: JsonFilter<"RiskAssessment">
    finalScore?: IntFilter<"RiskAssessment"> | number
    decision?: EnumRiskDecisionFilter<"RiskAssessment"> | $Enums.RiskDecision
    reasons?: StringNullableListFilter<"RiskAssessment">
    createdAt?: DateTimeFilter<"RiskAssessment"> | Date | string
  }

  export type RiskAssessmentOrderByWithRelationInput = {
    id?: SortOrder
    intentId?: SortOrderInput | SortOrder
    transactionId?: SortOrderInput | SortOrder
    actorExternalRef?: SortOrder
    counterpartyRef?: SortOrderInput | SortOrder
    amountUsdMinor?: SortOrder
    components?: SortOrder
    finalScore?: SortOrder
    decision?: SortOrder
    reasons?: SortOrder
    createdAt?: SortOrder
  }

  export type RiskAssessmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RiskAssessmentWhereInput | RiskAssessmentWhereInput[]
    OR?: RiskAssessmentWhereInput[]
    NOT?: RiskAssessmentWhereInput | RiskAssessmentWhereInput[]
    intentId?: StringNullableFilter<"RiskAssessment"> | string | null
    transactionId?: StringNullableFilter<"RiskAssessment"> | string | null
    actorExternalRef?: StringFilter<"RiskAssessment"> | string
    counterpartyRef?: StringNullableFilter<"RiskAssessment"> | string | null
    amountUsdMinor?: BigIntFilter<"RiskAssessment"> | bigint | number
    components?: JsonFilter<"RiskAssessment">
    finalScore?: IntFilter<"RiskAssessment"> | number
    decision?: EnumRiskDecisionFilter<"RiskAssessment"> | $Enums.RiskDecision
    reasons?: StringNullableListFilter<"RiskAssessment">
    createdAt?: DateTimeFilter<"RiskAssessment"> | Date | string
  }, "id">

  export type RiskAssessmentOrderByWithAggregationInput = {
    id?: SortOrder
    intentId?: SortOrderInput | SortOrder
    transactionId?: SortOrderInput | SortOrder
    actorExternalRef?: SortOrder
    counterpartyRef?: SortOrderInput | SortOrder
    amountUsdMinor?: SortOrder
    components?: SortOrder
    finalScore?: SortOrder
    decision?: SortOrder
    reasons?: SortOrder
    createdAt?: SortOrder
    _count?: RiskAssessmentCountOrderByAggregateInput
    _avg?: RiskAssessmentAvgOrderByAggregateInput
    _max?: RiskAssessmentMaxOrderByAggregateInput
    _min?: RiskAssessmentMinOrderByAggregateInput
    _sum?: RiskAssessmentSumOrderByAggregateInput
  }

  export type RiskAssessmentScalarWhereWithAggregatesInput = {
    AND?: RiskAssessmentScalarWhereWithAggregatesInput | RiskAssessmentScalarWhereWithAggregatesInput[]
    OR?: RiskAssessmentScalarWhereWithAggregatesInput[]
    NOT?: RiskAssessmentScalarWhereWithAggregatesInput | RiskAssessmentScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"RiskAssessment"> | string
    intentId?: StringNullableWithAggregatesFilter<"RiskAssessment"> | string | null
    transactionId?: StringNullableWithAggregatesFilter<"RiskAssessment"> | string | null
    actorExternalRef?: StringWithAggregatesFilter<"RiskAssessment"> | string
    counterpartyRef?: StringNullableWithAggregatesFilter<"RiskAssessment"> | string | null
    amountUsdMinor?: BigIntWithAggregatesFilter<"RiskAssessment"> | bigint | number
    components?: JsonWithAggregatesFilter<"RiskAssessment">
    finalScore?: IntWithAggregatesFilter<"RiskAssessment"> | number
    decision?: EnumRiskDecisionWithAggregatesFilter<"RiskAssessment"> | $Enums.RiskDecision
    reasons?: StringNullableListFilter<"RiskAssessment">
    createdAt?: DateTimeWithAggregatesFilter<"RiskAssessment"> | Date | string
  }

  export type ActorProfileCreateInput = {
    externalRef: string
    rolling24hUsdMinor?: bigint | number
    rolling24hCount?: number
    lifetimeCount?: number
    meanTicketUsdMinor?: bigint | number
    stddevTicketUsdMinor?: bigint | number
    lastSeenAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ActorProfileUncheckedCreateInput = {
    externalRef: string
    rolling24hUsdMinor?: bigint | number
    rolling24hCount?: number
    lifetimeCount?: number
    meanTicketUsdMinor?: bigint | number
    stddevTicketUsdMinor?: bigint | number
    lastSeenAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ActorProfileUpdateInput = {
    externalRef?: StringFieldUpdateOperationsInput | string
    rolling24hUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    rolling24hCount?: IntFieldUpdateOperationsInput | number
    lifetimeCount?: IntFieldUpdateOperationsInput | number
    meanTicketUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    stddevTicketUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActorProfileUncheckedUpdateInput = {
    externalRef?: StringFieldUpdateOperationsInput | string
    rolling24hUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    rolling24hCount?: IntFieldUpdateOperationsInput | number
    lifetimeCount?: IntFieldUpdateOperationsInput | number
    meanTicketUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    stddevTicketUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActorProfileCreateManyInput = {
    externalRef: string
    rolling24hUsdMinor?: bigint | number
    rolling24hCount?: number
    lifetimeCount?: number
    meanTicketUsdMinor?: bigint | number
    stddevTicketUsdMinor?: bigint | number
    lastSeenAt?: Date | string | null
    updatedAt?: Date | string
  }

  export type ActorProfileUpdateManyMutationInput = {
    externalRef?: StringFieldUpdateOperationsInput | string
    rolling24hUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    rolling24hCount?: IntFieldUpdateOperationsInput | number
    lifetimeCount?: IntFieldUpdateOperationsInput | number
    meanTicketUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    stddevTicketUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActorProfileUncheckedUpdateManyInput = {
    externalRef?: StringFieldUpdateOperationsInput | string
    rolling24hUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    rolling24hCount?: IntFieldUpdateOperationsInput | number
    lifetimeCount?: IntFieldUpdateOperationsInput | number
    meanTicketUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    stddevTicketUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    lastSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CounterpartyEdgeCreateInput = {
    id?: string
    actorExternalRef: string
    counterpartyRef: string
    firstSeenAt?: Date | string
    lastSeenAt?: Date | string
    txCount?: number
    totalUsdMinor?: bigint | number
  }

  export type CounterpartyEdgeUncheckedCreateInput = {
    id?: string
    actorExternalRef: string
    counterpartyRef: string
    firstSeenAt?: Date | string
    lastSeenAt?: Date | string
    txCount?: number
    totalUsdMinor?: bigint | number
  }

  export type CounterpartyEdgeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorExternalRef?: StringFieldUpdateOperationsInput | string
    counterpartyRef?: StringFieldUpdateOperationsInput | string
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    txCount?: IntFieldUpdateOperationsInput | number
    totalUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type CounterpartyEdgeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorExternalRef?: StringFieldUpdateOperationsInput | string
    counterpartyRef?: StringFieldUpdateOperationsInput | string
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    txCount?: IntFieldUpdateOperationsInput | number
    totalUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type CounterpartyEdgeCreateManyInput = {
    id?: string
    actorExternalRef: string
    counterpartyRef: string
    firstSeenAt?: Date | string
    lastSeenAt?: Date | string
    txCount?: number
    totalUsdMinor?: bigint | number
  }

  export type CounterpartyEdgeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorExternalRef?: StringFieldUpdateOperationsInput | string
    counterpartyRef?: StringFieldUpdateOperationsInput | string
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    txCount?: IntFieldUpdateOperationsInput | number
    totalUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type CounterpartyEdgeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorExternalRef?: StringFieldUpdateOperationsInput | string
    counterpartyRef?: StringFieldUpdateOperationsInput | string
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    txCount?: IntFieldUpdateOperationsInput | number
    totalUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type RiskAssessmentCreateInput = {
    id?: string
    intentId?: string | null
    transactionId?: string | null
    actorExternalRef: string
    counterpartyRef?: string | null
    amountUsdMinor: bigint | number
    components: JsonNullValueInput | InputJsonValue
    finalScore: number
    decision: $Enums.RiskDecision
    reasons?: RiskAssessmentCreatereasonsInput | string[]
    createdAt?: Date | string
  }

  export type RiskAssessmentUncheckedCreateInput = {
    id?: string
    intentId?: string | null
    transactionId?: string | null
    actorExternalRef: string
    counterpartyRef?: string | null
    amountUsdMinor: bigint | number
    components: JsonNullValueInput | InputJsonValue
    finalScore: number
    decision: $Enums.RiskDecision
    reasons?: RiskAssessmentCreatereasonsInput | string[]
    createdAt?: Date | string
  }

  export type RiskAssessmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    actorExternalRef?: StringFieldUpdateOperationsInput | string
    counterpartyRef?: NullableStringFieldUpdateOperationsInput | string | null
    amountUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    components?: JsonNullValueInput | InputJsonValue
    finalScore?: IntFieldUpdateOperationsInput | number
    decision?: EnumRiskDecisionFieldUpdateOperationsInput | $Enums.RiskDecision
    reasons?: RiskAssessmentUpdatereasonsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiskAssessmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    actorExternalRef?: StringFieldUpdateOperationsInput | string
    counterpartyRef?: NullableStringFieldUpdateOperationsInput | string | null
    amountUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    components?: JsonNullValueInput | InputJsonValue
    finalScore?: IntFieldUpdateOperationsInput | number
    decision?: EnumRiskDecisionFieldUpdateOperationsInput | $Enums.RiskDecision
    reasons?: RiskAssessmentUpdatereasonsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiskAssessmentCreateManyInput = {
    id?: string
    intentId?: string | null
    transactionId?: string | null
    actorExternalRef: string
    counterpartyRef?: string | null
    amountUsdMinor: bigint | number
    components: JsonNullValueInput | InputJsonValue
    finalScore: number
    decision: $Enums.RiskDecision
    reasons?: RiskAssessmentCreatereasonsInput | string[]
    createdAt?: Date | string
  }

  export type RiskAssessmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    actorExternalRef?: StringFieldUpdateOperationsInput | string
    counterpartyRef?: NullableStringFieldUpdateOperationsInput | string | null
    amountUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    components?: JsonNullValueInput | InputJsonValue
    finalScore?: IntFieldUpdateOperationsInput | number
    decision?: EnumRiskDecisionFieldUpdateOperationsInput | $Enums.RiskDecision
    reasons?: RiskAssessmentUpdatereasonsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiskAssessmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    actorExternalRef?: StringFieldUpdateOperationsInput | string
    counterpartyRef?: NullableStringFieldUpdateOperationsInput | string | null
    amountUsdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    components?: JsonNullValueInput | InputJsonValue
    finalScore?: IntFieldUpdateOperationsInput | number
    decision?: EnumRiskDecisionFieldUpdateOperationsInput | $Enums.RiskDecision
    reasons?: RiskAssessmentUpdatereasonsInput | string[]
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ActorProfileCountOrderByAggregateInput = {
    externalRef?: SortOrder
    rolling24hUsdMinor?: SortOrder
    rolling24hCount?: SortOrder
    lifetimeCount?: SortOrder
    meanTicketUsdMinor?: SortOrder
    stddevTicketUsdMinor?: SortOrder
    lastSeenAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActorProfileAvgOrderByAggregateInput = {
    rolling24hUsdMinor?: SortOrder
    rolling24hCount?: SortOrder
    lifetimeCount?: SortOrder
    meanTicketUsdMinor?: SortOrder
    stddevTicketUsdMinor?: SortOrder
  }

  export type ActorProfileMaxOrderByAggregateInput = {
    externalRef?: SortOrder
    rolling24hUsdMinor?: SortOrder
    rolling24hCount?: SortOrder
    lifetimeCount?: SortOrder
    meanTicketUsdMinor?: SortOrder
    stddevTicketUsdMinor?: SortOrder
    lastSeenAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActorProfileMinOrderByAggregateInput = {
    externalRef?: SortOrder
    rolling24hUsdMinor?: SortOrder
    rolling24hCount?: SortOrder
    lifetimeCount?: SortOrder
    meanTicketUsdMinor?: SortOrder
    stddevTicketUsdMinor?: SortOrder
    lastSeenAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActorProfileSumOrderByAggregateInput = {
    rolling24hUsdMinor?: SortOrder
    rolling24hCount?: SortOrder
    lifetimeCount?: SortOrder
    meanTicketUsdMinor?: SortOrder
    stddevTicketUsdMinor?: SortOrder
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

  export type CounterpartyEdgeActorExternalRefCounterpartyRefCompoundUniqueInput = {
    actorExternalRef: string
    counterpartyRef: string
  }

  export type CounterpartyEdgeCountOrderByAggregateInput = {
    id?: SortOrder
    actorExternalRef?: SortOrder
    counterpartyRef?: SortOrder
    firstSeenAt?: SortOrder
    lastSeenAt?: SortOrder
    txCount?: SortOrder
    totalUsdMinor?: SortOrder
  }

  export type CounterpartyEdgeAvgOrderByAggregateInput = {
    txCount?: SortOrder
    totalUsdMinor?: SortOrder
  }

  export type CounterpartyEdgeMaxOrderByAggregateInput = {
    id?: SortOrder
    actorExternalRef?: SortOrder
    counterpartyRef?: SortOrder
    firstSeenAt?: SortOrder
    lastSeenAt?: SortOrder
    txCount?: SortOrder
    totalUsdMinor?: SortOrder
  }

  export type CounterpartyEdgeMinOrderByAggregateInput = {
    id?: SortOrder
    actorExternalRef?: SortOrder
    counterpartyRef?: SortOrder
    firstSeenAt?: SortOrder
    lastSeenAt?: SortOrder
    txCount?: SortOrder
    totalUsdMinor?: SortOrder
  }

  export type CounterpartyEdgeSumOrderByAggregateInput = {
    txCount?: SortOrder
    totalUsdMinor?: SortOrder
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

  export type EnumRiskDecisionFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskDecision | EnumRiskDecisionFieldRefInput<$PrismaModel>
    in?: $Enums.RiskDecision[] | ListEnumRiskDecisionFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskDecision[] | ListEnumRiskDecisionFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskDecisionFilter<$PrismaModel> | $Enums.RiskDecision
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type RiskAssessmentCountOrderByAggregateInput = {
    id?: SortOrder
    intentId?: SortOrder
    transactionId?: SortOrder
    actorExternalRef?: SortOrder
    counterpartyRef?: SortOrder
    amountUsdMinor?: SortOrder
    components?: SortOrder
    finalScore?: SortOrder
    decision?: SortOrder
    reasons?: SortOrder
    createdAt?: SortOrder
  }

  export type RiskAssessmentAvgOrderByAggregateInput = {
    amountUsdMinor?: SortOrder
    finalScore?: SortOrder
  }

  export type RiskAssessmentMaxOrderByAggregateInput = {
    id?: SortOrder
    intentId?: SortOrder
    transactionId?: SortOrder
    actorExternalRef?: SortOrder
    counterpartyRef?: SortOrder
    amountUsdMinor?: SortOrder
    finalScore?: SortOrder
    decision?: SortOrder
    createdAt?: SortOrder
  }

  export type RiskAssessmentMinOrderByAggregateInput = {
    id?: SortOrder
    intentId?: SortOrder
    transactionId?: SortOrder
    actorExternalRef?: SortOrder
    counterpartyRef?: SortOrder
    amountUsdMinor?: SortOrder
    finalScore?: SortOrder
    decision?: SortOrder
    createdAt?: SortOrder
  }

  export type RiskAssessmentSumOrderByAggregateInput = {
    amountUsdMinor?: SortOrder
    finalScore?: SortOrder
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

  export type EnumRiskDecisionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskDecision | EnumRiskDecisionFieldRefInput<$PrismaModel>
    in?: $Enums.RiskDecision[] | ListEnumRiskDecisionFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskDecision[] | ListEnumRiskDecisionFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskDecisionWithAggregatesFilter<$PrismaModel> | $Enums.RiskDecision
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRiskDecisionFilter<$PrismaModel>
    _max?: NestedEnumRiskDecisionFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
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

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RiskAssessmentCreatereasonsInput = {
    set: string[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRiskDecisionFieldUpdateOperationsInput = {
    set?: $Enums.RiskDecision
  }

  export type RiskAssessmentUpdatereasonsInput = {
    set?: string[]
    push?: string | string[]
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

  export type NestedEnumRiskDecisionFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskDecision | EnumRiskDecisionFieldRefInput<$PrismaModel>
    in?: $Enums.RiskDecision[] | ListEnumRiskDecisionFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskDecision[] | ListEnumRiskDecisionFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskDecisionFilter<$PrismaModel> | $Enums.RiskDecision
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

  export type NestedEnumRiskDecisionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskDecision | EnumRiskDecisionFieldRefInput<$PrismaModel>
    in?: $Enums.RiskDecision[] | ListEnumRiskDecisionFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskDecision[] | ListEnumRiskDecisionFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskDecisionWithAggregatesFilter<$PrismaModel> | $Enums.RiskDecision
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRiskDecisionFilter<$PrismaModel>
    _max?: NestedEnumRiskDecisionFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ActorProfileDefaultArgs instead
     */
    export type ActorProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ActorProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CounterpartyEdgeDefaultArgs instead
     */
    export type CounterpartyEdgeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CounterpartyEdgeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RiskAssessmentDefaultArgs instead
     */
    export type RiskAssessmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RiskAssessmentDefaultArgs<ExtArgs>

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