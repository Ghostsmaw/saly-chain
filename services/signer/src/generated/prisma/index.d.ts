
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
 * Model SignerKey
 * 
 */
export type SignerKey = $Result.DefaultSelection<Prisma.$SignerKeyPayload>
/**
 * Model SignRequest
 * 
 */
export type SignRequest = $Result.DefaultSelection<Prisma.$SignRequestPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const SignerChain: {
  BASE: 'BASE',
  XRPL: 'XRPL',
  ETHEREUM: 'ETHEREUM',
  POLYGON: 'POLYGON',
  SALY_L3: 'SALY_L3'
};

export type SignerChain = (typeof SignerChain)[keyof typeof SignerChain]


export const SignerKeyStatus: {
  ACTIVE: 'ACTIVE',
  ROTATING: 'ROTATING',
  ARCHIVED: 'ARCHIVED'
};

export type SignerKeyStatus = (typeof SignerKeyStatus)[keyof typeof SignerKeyStatus]


export const SignRequestOutcome: {
  SIGNED: 'SIGNED',
  POLICY_DENIED: 'POLICY_DENIED',
  ERROR: 'ERROR'
};

export type SignRequestOutcome = (typeof SignRequestOutcome)[keyof typeof SignRequestOutcome]

}

export type SignerChain = $Enums.SignerChain

export const SignerChain: typeof $Enums.SignerChain

export type SignerKeyStatus = $Enums.SignerKeyStatus

export const SignerKeyStatus: typeof $Enums.SignerKeyStatus

export type SignRequestOutcome = $Enums.SignRequestOutcome

export const SignRequestOutcome: typeof $Enums.SignRequestOutcome

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more SignerKeys
 * const signerKeys = await prisma.signerKey.findMany()
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
   * // Fetch zero or more SignerKeys
   * const signerKeys = await prisma.signerKey.findMany()
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
   * `prisma.signerKey`: Exposes CRUD operations for the **SignerKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SignerKeys
    * const signerKeys = await prisma.signerKey.findMany()
    * ```
    */
  get signerKey(): Prisma.SignerKeyDelegate<ExtArgs>;

  /**
   * `prisma.signRequest`: Exposes CRUD operations for the **SignRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SignRequests
    * const signRequests = await prisma.signRequest.findMany()
    * ```
    */
  get signRequest(): Prisma.SignRequestDelegate<ExtArgs>;
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
    SignerKey: 'SignerKey',
    SignRequest: 'SignRequest'
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
      modelProps: "signerKey" | "signRequest"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      SignerKey: {
        payload: Prisma.$SignerKeyPayload<ExtArgs>
        fields: Prisma.SignerKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SignerKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignerKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SignerKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignerKeyPayload>
          }
          findFirst: {
            args: Prisma.SignerKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignerKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SignerKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignerKeyPayload>
          }
          findMany: {
            args: Prisma.SignerKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignerKeyPayload>[]
          }
          create: {
            args: Prisma.SignerKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignerKeyPayload>
          }
          createMany: {
            args: Prisma.SignerKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SignerKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignerKeyPayload>[]
          }
          delete: {
            args: Prisma.SignerKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignerKeyPayload>
          }
          update: {
            args: Prisma.SignerKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignerKeyPayload>
          }
          deleteMany: {
            args: Prisma.SignerKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SignerKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SignerKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignerKeyPayload>
          }
          aggregate: {
            args: Prisma.SignerKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSignerKey>
          }
          groupBy: {
            args: Prisma.SignerKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<SignerKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.SignerKeyCountArgs<ExtArgs>
            result: $Utils.Optional<SignerKeyCountAggregateOutputType> | number
          }
        }
      }
      SignRequest: {
        payload: Prisma.$SignRequestPayload<ExtArgs>
        fields: Prisma.SignRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SignRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SignRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignRequestPayload>
          }
          findFirst: {
            args: Prisma.SignRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SignRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignRequestPayload>
          }
          findMany: {
            args: Prisma.SignRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignRequestPayload>[]
          }
          create: {
            args: Prisma.SignRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignRequestPayload>
          }
          createMany: {
            args: Prisma.SignRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SignRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignRequestPayload>[]
          }
          delete: {
            args: Prisma.SignRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignRequestPayload>
          }
          update: {
            args: Prisma.SignRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignRequestPayload>
          }
          deleteMany: {
            args: Prisma.SignRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SignRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SignRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SignRequestPayload>
          }
          aggregate: {
            args: Prisma.SignRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSignRequest>
          }
          groupBy: {
            args: Prisma.SignRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<SignRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.SignRequestCountArgs<ExtArgs>
            result: $Utils.Optional<SignRequestCountAggregateOutputType> | number
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
   * Count Type SignerKeyCountOutputType
   */

  export type SignerKeyCountOutputType = {
    signRequests: number
  }

  export type SignerKeyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    signRequests?: boolean | SignerKeyCountOutputTypeCountSignRequestsArgs
  }

  // Custom InputTypes
  /**
   * SignerKeyCountOutputType without action
   */
  export type SignerKeyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignerKeyCountOutputType
     */
    select?: SignerKeyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SignerKeyCountOutputType without action
   */
  export type SignerKeyCountOutputTypeCountSignRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignRequestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model SignerKey
   */

  export type AggregateSignerKey = {
    _count: SignerKeyCountAggregateOutputType | null
    _min: SignerKeyMinAggregateOutputType | null
    _max: SignerKeyMaxAggregateOutputType | null
  }

  export type SignerKeyMinAggregateOutputType = {
    id: string | null
    keyRef: string | null
    chain: $Enums.SignerChain | null
    publicAddress: string | null
    wrappedPrivateKey: Buffer | null
    wrappingKeyRef: string | null
    status: $Enums.SignerKeyStatus | null
    label: string | null
    createdAt: Date | null
    rotatedAt: Date | null
  }

  export type SignerKeyMaxAggregateOutputType = {
    id: string | null
    keyRef: string | null
    chain: $Enums.SignerChain | null
    publicAddress: string | null
    wrappedPrivateKey: Buffer | null
    wrappingKeyRef: string | null
    status: $Enums.SignerKeyStatus | null
    label: string | null
    createdAt: Date | null
    rotatedAt: Date | null
  }

  export type SignerKeyCountAggregateOutputType = {
    id: number
    keyRef: number
    chain: number
    publicAddress: number
    wrappedPrivateKey: number
    wrappingKeyRef: number
    status: number
    label: number
    createdAt: number
    rotatedAt: number
    _all: number
  }


  export type SignerKeyMinAggregateInputType = {
    id?: true
    keyRef?: true
    chain?: true
    publicAddress?: true
    wrappedPrivateKey?: true
    wrappingKeyRef?: true
    status?: true
    label?: true
    createdAt?: true
    rotatedAt?: true
  }

  export type SignerKeyMaxAggregateInputType = {
    id?: true
    keyRef?: true
    chain?: true
    publicAddress?: true
    wrappedPrivateKey?: true
    wrappingKeyRef?: true
    status?: true
    label?: true
    createdAt?: true
    rotatedAt?: true
  }

  export type SignerKeyCountAggregateInputType = {
    id?: true
    keyRef?: true
    chain?: true
    publicAddress?: true
    wrappedPrivateKey?: true
    wrappingKeyRef?: true
    status?: true
    label?: true
    createdAt?: true
    rotatedAt?: true
    _all?: true
  }

  export type SignerKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SignerKey to aggregate.
     */
    where?: SignerKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignerKeys to fetch.
     */
    orderBy?: SignerKeyOrderByWithRelationInput | SignerKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SignerKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignerKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignerKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SignerKeys
    **/
    _count?: true | SignerKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SignerKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SignerKeyMaxAggregateInputType
  }

  export type GetSignerKeyAggregateType<T extends SignerKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateSignerKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSignerKey[P]>
      : GetScalarType<T[P], AggregateSignerKey[P]>
  }




  export type SignerKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignerKeyWhereInput
    orderBy?: SignerKeyOrderByWithAggregationInput | SignerKeyOrderByWithAggregationInput[]
    by: SignerKeyScalarFieldEnum[] | SignerKeyScalarFieldEnum
    having?: SignerKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SignerKeyCountAggregateInputType | true
    _min?: SignerKeyMinAggregateInputType
    _max?: SignerKeyMaxAggregateInputType
  }

  export type SignerKeyGroupByOutputType = {
    id: string
    keyRef: string
    chain: $Enums.SignerChain
    publicAddress: string
    wrappedPrivateKey: Buffer
    wrappingKeyRef: string
    status: $Enums.SignerKeyStatus
    label: string | null
    createdAt: Date
    rotatedAt: Date | null
    _count: SignerKeyCountAggregateOutputType | null
    _min: SignerKeyMinAggregateOutputType | null
    _max: SignerKeyMaxAggregateOutputType | null
  }

  type GetSignerKeyGroupByPayload<T extends SignerKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SignerKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SignerKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SignerKeyGroupByOutputType[P]>
            : GetScalarType<T[P], SignerKeyGroupByOutputType[P]>
        }
      >
    >


  export type SignerKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    keyRef?: boolean
    chain?: boolean
    publicAddress?: boolean
    wrappedPrivateKey?: boolean
    wrappingKeyRef?: boolean
    status?: boolean
    label?: boolean
    createdAt?: boolean
    rotatedAt?: boolean
    signRequests?: boolean | SignerKey$signRequestsArgs<ExtArgs>
    _count?: boolean | SignerKeyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["signerKey"]>

  export type SignerKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    keyRef?: boolean
    chain?: boolean
    publicAddress?: boolean
    wrappedPrivateKey?: boolean
    wrappingKeyRef?: boolean
    status?: boolean
    label?: boolean
    createdAt?: boolean
    rotatedAt?: boolean
  }, ExtArgs["result"]["signerKey"]>

  export type SignerKeySelectScalar = {
    id?: boolean
    keyRef?: boolean
    chain?: boolean
    publicAddress?: boolean
    wrappedPrivateKey?: boolean
    wrappingKeyRef?: boolean
    status?: boolean
    label?: boolean
    createdAt?: boolean
    rotatedAt?: boolean
  }

  export type SignerKeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    signRequests?: boolean | SignerKey$signRequestsArgs<ExtArgs>
    _count?: boolean | SignerKeyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SignerKeyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SignerKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SignerKey"
    objects: {
      signRequests: Prisma.$SignRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      keyRef: string
      chain: $Enums.SignerChain
      publicAddress: string
      /**
       * Hex-encoded ciphertext of the private key under the configured KMS.
       * Format is provider-specific (local AES-256-GCM bundles iv|ciphertext|tag).
       */
      wrappedPrivateKey: Buffer
      /**
       * Reference to the wrapping key (KMS key id / version) so we can rotate.
       */
      wrappingKeyRef: string
      status: $Enums.SignerKeyStatus
      label: string | null
      createdAt: Date
      rotatedAt: Date | null
    }, ExtArgs["result"]["signerKey"]>
    composites: {}
  }

  type SignerKeyGetPayload<S extends boolean | null | undefined | SignerKeyDefaultArgs> = $Result.GetResult<Prisma.$SignerKeyPayload, S>

  type SignerKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SignerKeyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SignerKeyCountAggregateInputType | true
    }

  export interface SignerKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SignerKey'], meta: { name: 'SignerKey' } }
    /**
     * Find zero or one SignerKey that matches the filter.
     * @param {SignerKeyFindUniqueArgs} args - Arguments to find a SignerKey
     * @example
     * // Get one SignerKey
     * const signerKey = await prisma.signerKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SignerKeyFindUniqueArgs>(args: SelectSubset<T, SignerKeyFindUniqueArgs<ExtArgs>>): Prisma__SignerKeyClient<$Result.GetResult<Prisma.$SignerKeyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SignerKey that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SignerKeyFindUniqueOrThrowArgs} args - Arguments to find a SignerKey
     * @example
     * // Get one SignerKey
     * const signerKey = await prisma.signerKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SignerKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, SignerKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SignerKeyClient<$Result.GetResult<Prisma.$SignerKeyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SignerKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignerKeyFindFirstArgs} args - Arguments to find a SignerKey
     * @example
     * // Get one SignerKey
     * const signerKey = await prisma.signerKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SignerKeyFindFirstArgs>(args?: SelectSubset<T, SignerKeyFindFirstArgs<ExtArgs>>): Prisma__SignerKeyClient<$Result.GetResult<Prisma.$SignerKeyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SignerKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignerKeyFindFirstOrThrowArgs} args - Arguments to find a SignerKey
     * @example
     * // Get one SignerKey
     * const signerKey = await prisma.signerKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SignerKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, SignerKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__SignerKeyClient<$Result.GetResult<Prisma.$SignerKeyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SignerKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignerKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SignerKeys
     * const signerKeys = await prisma.signerKey.findMany()
     * 
     * // Get first 10 SignerKeys
     * const signerKeys = await prisma.signerKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const signerKeyWithIdOnly = await prisma.signerKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SignerKeyFindManyArgs>(args?: SelectSubset<T, SignerKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignerKeyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SignerKey.
     * @param {SignerKeyCreateArgs} args - Arguments to create a SignerKey.
     * @example
     * // Create one SignerKey
     * const SignerKey = await prisma.signerKey.create({
     *   data: {
     *     // ... data to create a SignerKey
     *   }
     * })
     * 
     */
    create<T extends SignerKeyCreateArgs>(args: SelectSubset<T, SignerKeyCreateArgs<ExtArgs>>): Prisma__SignerKeyClient<$Result.GetResult<Prisma.$SignerKeyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SignerKeys.
     * @param {SignerKeyCreateManyArgs} args - Arguments to create many SignerKeys.
     * @example
     * // Create many SignerKeys
     * const signerKey = await prisma.signerKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SignerKeyCreateManyArgs>(args?: SelectSubset<T, SignerKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SignerKeys and returns the data saved in the database.
     * @param {SignerKeyCreateManyAndReturnArgs} args - Arguments to create many SignerKeys.
     * @example
     * // Create many SignerKeys
     * const signerKey = await prisma.signerKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SignerKeys and only return the `id`
     * const signerKeyWithIdOnly = await prisma.signerKey.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SignerKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, SignerKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignerKeyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SignerKey.
     * @param {SignerKeyDeleteArgs} args - Arguments to delete one SignerKey.
     * @example
     * // Delete one SignerKey
     * const SignerKey = await prisma.signerKey.delete({
     *   where: {
     *     // ... filter to delete one SignerKey
     *   }
     * })
     * 
     */
    delete<T extends SignerKeyDeleteArgs>(args: SelectSubset<T, SignerKeyDeleteArgs<ExtArgs>>): Prisma__SignerKeyClient<$Result.GetResult<Prisma.$SignerKeyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SignerKey.
     * @param {SignerKeyUpdateArgs} args - Arguments to update one SignerKey.
     * @example
     * // Update one SignerKey
     * const signerKey = await prisma.signerKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SignerKeyUpdateArgs>(args: SelectSubset<T, SignerKeyUpdateArgs<ExtArgs>>): Prisma__SignerKeyClient<$Result.GetResult<Prisma.$SignerKeyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SignerKeys.
     * @param {SignerKeyDeleteManyArgs} args - Arguments to filter SignerKeys to delete.
     * @example
     * // Delete a few SignerKeys
     * const { count } = await prisma.signerKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SignerKeyDeleteManyArgs>(args?: SelectSubset<T, SignerKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SignerKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignerKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SignerKeys
     * const signerKey = await prisma.signerKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SignerKeyUpdateManyArgs>(args: SelectSubset<T, SignerKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SignerKey.
     * @param {SignerKeyUpsertArgs} args - Arguments to update or create a SignerKey.
     * @example
     * // Update or create a SignerKey
     * const signerKey = await prisma.signerKey.upsert({
     *   create: {
     *     // ... data to create a SignerKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SignerKey we want to update
     *   }
     * })
     */
    upsert<T extends SignerKeyUpsertArgs>(args: SelectSubset<T, SignerKeyUpsertArgs<ExtArgs>>): Prisma__SignerKeyClient<$Result.GetResult<Prisma.$SignerKeyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SignerKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignerKeyCountArgs} args - Arguments to filter SignerKeys to count.
     * @example
     * // Count the number of SignerKeys
     * const count = await prisma.signerKey.count({
     *   where: {
     *     // ... the filter for the SignerKeys we want to count
     *   }
     * })
    **/
    count<T extends SignerKeyCountArgs>(
      args?: Subset<T, SignerKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SignerKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SignerKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignerKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SignerKeyAggregateArgs>(args: Subset<T, SignerKeyAggregateArgs>): Prisma.PrismaPromise<GetSignerKeyAggregateType<T>>

    /**
     * Group by SignerKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignerKeyGroupByArgs} args - Group by arguments.
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
      T extends SignerKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SignerKeyGroupByArgs['orderBy'] }
        : { orderBy?: SignerKeyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SignerKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSignerKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SignerKey model
   */
  readonly fields: SignerKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SignerKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SignerKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    signRequests<T extends SignerKey$signRequestsArgs<ExtArgs> = {}>(args?: Subset<T, SignerKey$signRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignRequestPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the SignerKey model
   */ 
  interface SignerKeyFieldRefs {
    readonly id: FieldRef<"SignerKey", 'String'>
    readonly keyRef: FieldRef<"SignerKey", 'String'>
    readonly chain: FieldRef<"SignerKey", 'SignerChain'>
    readonly publicAddress: FieldRef<"SignerKey", 'String'>
    readonly wrappedPrivateKey: FieldRef<"SignerKey", 'Bytes'>
    readonly wrappingKeyRef: FieldRef<"SignerKey", 'String'>
    readonly status: FieldRef<"SignerKey", 'SignerKeyStatus'>
    readonly label: FieldRef<"SignerKey", 'String'>
    readonly createdAt: FieldRef<"SignerKey", 'DateTime'>
    readonly rotatedAt: FieldRef<"SignerKey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SignerKey findUnique
   */
  export type SignerKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignerKey
     */
    select?: SignerKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignerKeyInclude<ExtArgs> | null
    /**
     * Filter, which SignerKey to fetch.
     */
    where: SignerKeyWhereUniqueInput
  }

  /**
   * SignerKey findUniqueOrThrow
   */
  export type SignerKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignerKey
     */
    select?: SignerKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignerKeyInclude<ExtArgs> | null
    /**
     * Filter, which SignerKey to fetch.
     */
    where: SignerKeyWhereUniqueInput
  }

  /**
   * SignerKey findFirst
   */
  export type SignerKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignerKey
     */
    select?: SignerKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignerKeyInclude<ExtArgs> | null
    /**
     * Filter, which SignerKey to fetch.
     */
    where?: SignerKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignerKeys to fetch.
     */
    orderBy?: SignerKeyOrderByWithRelationInput | SignerKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SignerKeys.
     */
    cursor?: SignerKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignerKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignerKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SignerKeys.
     */
    distinct?: SignerKeyScalarFieldEnum | SignerKeyScalarFieldEnum[]
  }

  /**
   * SignerKey findFirstOrThrow
   */
  export type SignerKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignerKey
     */
    select?: SignerKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignerKeyInclude<ExtArgs> | null
    /**
     * Filter, which SignerKey to fetch.
     */
    where?: SignerKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignerKeys to fetch.
     */
    orderBy?: SignerKeyOrderByWithRelationInput | SignerKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SignerKeys.
     */
    cursor?: SignerKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignerKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignerKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SignerKeys.
     */
    distinct?: SignerKeyScalarFieldEnum | SignerKeyScalarFieldEnum[]
  }

  /**
   * SignerKey findMany
   */
  export type SignerKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignerKey
     */
    select?: SignerKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignerKeyInclude<ExtArgs> | null
    /**
     * Filter, which SignerKeys to fetch.
     */
    where?: SignerKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignerKeys to fetch.
     */
    orderBy?: SignerKeyOrderByWithRelationInput | SignerKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SignerKeys.
     */
    cursor?: SignerKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignerKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignerKeys.
     */
    skip?: number
    distinct?: SignerKeyScalarFieldEnum | SignerKeyScalarFieldEnum[]
  }

  /**
   * SignerKey create
   */
  export type SignerKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignerKey
     */
    select?: SignerKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignerKeyInclude<ExtArgs> | null
    /**
     * The data needed to create a SignerKey.
     */
    data: XOR<SignerKeyCreateInput, SignerKeyUncheckedCreateInput>
  }

  /**
   * SignerKey createMany
   */
  export type SignerKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SignerKeys.
     */
    data: SignerKeyCreateManyInput | SignerKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SignerKey createManyAndReturn
   */
  export type SignerKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignerKey
     */
    select?: SignerKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SignerKeys.
     */
    data: SignerKeyCreateManyInput | SignerKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SignerKey update
   */
  export type SignerKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignerKey
     */
    select?: SignerKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignerKeyInclude<ExtArgs> | null
    /**
     * The data needed to update a SignerKey.
     */
    data: XOR<SignerKeyUpdateInput, SignerKeyUncheckedUpdateInput>
    /**
     * Choose, which SignerKey to update.
     */
    where: SignerKeyWhereUniqueInput
  }

  /**
   * SignerKey updateMany
   */
  export type SignerKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SignerKeys.
     */
    data: XOR<SignerKeyUpdateManyMutationInput, SignerKeyUncheckedUpdateManyInput>
    /**
     * Filter which SignerKeys to update
     */
    where?: SignerKeyWhereInput
  }

  /**
   * SignerKey upsert
   */
  export type SignerKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignerKey
     */
    select?: SignerKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignerKeyInclude<ExtArgs> | null
    /**
     * The filter to search for the SignerKey to update in case it exists.
     */
    where: SignerKeyWhereUniqueInput
    /**
     * In case the SignerKey found by the `where` argument doesn't exist, create a new SignerKey with this data.
     */
    create: XOR<SignerKeyCreateInput, SignerKeyUncheckedCreateInput>
    /**
     * In case the SignerKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SignerKeyUpdateInput, SignerKeyUncheckedUpdateInput>
  }

  /**
   * SignerKey delete
   */
  export type SignerKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignerKey
     */
    select?: SignerKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignerKeyInclude<ExtArgs> | null
    /**
     * Filter which SignerKey to delete.
     */
    where: SignerKeyWhereUniqueInput
  }

  /**
   * SignerKey deleteMany
   */
  export type SignerKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SignerKeys to delete
     */
    where?: SignerKeyWhereInput
  }

  /**
   * SignerKey.signRequests
   */
  export type SignerKey$signRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignRequest
     */
    select?: SignRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignRequestInclude<ExtArgs> | null
    where?: SignRequestWhereInput
    orderBy?: SignRequestOrderByWithRelationInput | SignRequestOrderByWithRelationInput[]
    cursor?: SignRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SignRequestScalarFieldEnum | SignRequestScalarFieldEnum[]
  }

  /**
   * SignerKey without action
   */
  export type SignerKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignerKey
     */
    select?: SignerKeySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignerKeyInclude<ExtArgs> | null
  }


  /**
   * Model SignRequest
   */

  export type AggregateSignRequest = {
    _count: SignRequestCountAggregateOutputType | null
    _min: SignRequestMinAggregateOutputType | null
    _max: SignRequestMaxAggregateOutputType | null
  }

  export type SignRequestMinAggregateOutputType = {
    id: string | null
    idempotencyKey: string | null
    signerKeyId: string | null
    chain: $Enums.SignerChain | null
    walletId: string | null
    unsignedTxHash: string | null
    outcome: $Enums.SignRequestOutcome | null
    reasonCode: string | null
    reasonMessage: string | null
    signedTxHash: string | null
    createdAt: Date | null
  }

  export type SignRequestMaxAggregateOutputType = {
    id: string | null
    idempotencyKey: string | null
    signerKeyId: string | null
    chain: $Enums.SignerChain | null
    walletId: string | null
    unsignedTxHash: string | null
    outcome: $Enums.SignRequestOutcome | null
    reasonCode: string | null
    reasonMessage: string | null
    signedTxHash: string | null
    createdAt: Date | null
  }

  export type SignRequestCountAggregateOutputType = {
    id: number
    idempotencyKey: number
    signerKeyId: number
    chain: number
    walletId: number
    policyContext: number
    unsignedTxHash: number
    outcome: number
    reasonCode: number
    reasonMessage: number
    signedTxHash: number
    createdAt: number
    _all: number
  }


  export type SignRequestMinAggregateInputType = {
    id?: true
    idempotencyKey?: true
    signerKeyId?: true
    chain?: true
    walletId?: true
    unsignedTxHash?: true
    outcome?: true
    reasonCode?: true
    reasonMessage?: true
    signedTxHash?: true
    createdAt?: true
  }

  export type SignRequestMaxAggregateInputType = {
    id?: true
    idempotencyKey?: true
    signerKeyId?: true
    chain?: true
    walletId?: true
    unsignedTxHash?: true
    outcome?: true
    reasonCode?: true
    reasonMessage?: true
    signedTxHash?: true
    createdAt?: true
  }

  export type SignRequestCountAggregateInputType = {
    id?: true
    idempotencyKey?: true
    signerKeyId?: true
    chain?: true
    walletId?: true
    policyContext?: true
    unsignedTxHash?: true
    outcome?: true
    reasonCode?: true
    reasonMessage?: true
    signedTxHash?: true
    createdAt?: true
    _all?: true
  }

  export type SignRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SignRequest to aggregate.
     */
    where?: SignRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignRequests to fetch.
     */
    orderBy?: SignRequestOrderByWithRelationInput | SignRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SignRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SignRequests
    **/
    _count?: true | SignRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SignRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SignRequestMaxAggregateInputType
  }

  export type GetSignRequestAggregateType<T extends SignRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateSignRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSignRequest[P]>
      : GetScalarType<T[P], AggregateSignRequest[P]>
  }




  export type SignRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SignRequestWhereInput
    orderBy?: SignRequestOrderByWithAggregationInput | SignRequestOrderByWithAggregationInput[]
    by: SignRequestScalarFieldEnum[] | SignRequestScalarFieldEnum
    having?: SignRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SignRequestCountAggregateInputType | true
    _min?: SignRequestMinAggregateInputType
    _max?: SignRequestMaxAggregateInputType
  }

  export type SignRequestGroupByOutputType = {
    id: string
    idempotencyKey: string
    signerKeyId: string
    chain: $Enums.SignerChain
    walletId: string | null
    policyContext: JsonValue
    unsignedTxHash: string
    outcome: $Enums.SignRequestOutcome
    reasonCode: string | null
    reasonMessage: string | null
    signedTxHash: string | null
    createdAt: Date
    _count: SignRequestCountAggregateOutputType | null
    _min: SignRequestMinAggregateOutputType | null
    _max: SignRequestMaxAggregateOutputType | null
  }

  type GetSignRequestGroupByPayload<T extends SignRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SignRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SignRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SignRequestGroupByOutputType[P]>
            : GetScalarType<T[P], SignRequestGroupByOutputType[P]>
        }
      >
    >


  export type SignRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idempotencyKey?: boolean
    signerKeyId?: boolean
    chain?: boolean
    walletId?: boolean
    policyContext?: boolean
    unsignedTxHash?: boolean
    outcome?: boolean
    reasonCode?: boolean
    reasonMessage?: boolean
    signedTxHash?: boolean
    createdAt?: boolean
    signerKey?: boolean | SignerKeyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["signRequest"]>

  export type SignRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idempotencyKey?: boolean
    signerKeyId?: boolean
    chain?: boolean
    walletId?: boolean
    policyContext?: boolean
    unsignedTxHash?: boolean
    outcome?: boolean
    reasonCode?: boolean
    reasonMessage?: boolean
    signedTxHash?: boolean
    createdAt?: boolean
    signerKey?: boolean | SignerKeyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["signRequest"]>

  export type SignRequestSelectScalar = {
    id?: boolean
    idempotencyKey?: boolean
    signerKeyId?: boolean
    chain?: boolean
    walletId?: boolean
    policyContext?: boolean
    unsignedTxHash?: boolean
    outcome?: boolean
    reasonCode?: boolean
    reasonMessage?: boolean
    signedTxHash?: boolean
    createdAt?: boolean
  }

  export type SignRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    signerKey?: boolean | SignerKeyDefaultArgs<ExtArgs>
  }
  export type SignRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    signerKey?: boolean | SignerKeyDefaultArgs<ExtArgs>
  }

  export type $SignRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SignRequest"
    objects: {
      signerKey: Prisma.$SignerKeyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idempotencyKey: string
      signerKeyId: string
      chain: $Enums.SignerChain
      walletId: string | null
      /**
       * Snapshot of the policy context evaluated for this request.
       */
      policyContext: Prisma.JsonValue
      unsignedTxHash: string
      outcome: $Enums.SignRequestOutcome
      reasonCode: string | null
      reasonMessage: string | null
      signedTxHash: string | null
      createdAt: Date
    }, ExtArgs["result"]["signRequest"]>
    composites: {}
  }

  type SignRequestGetPayload<S extends boolean | null | undefined | SignRequestDefaultArgs> = $Result.GetResult<Prisma.$SignRequestPayload, S>

  type SignRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SignRequestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SignRequestCountAggregateInputType | true
    }

  export interface SignRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SignRequest'], meta: { name: 'SignRequest' } }
    /**
     * Find zero or one SignRequest that matches the filter.
     * @param {SignRequestFindUniqueArgs} args - Arguments to find a SignRequest
     * @example
     * // Get one SignRequest
     * const signRequest = await prisma.signRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SignRequestFindUniqueArgs>(args: SelectSubset<T, SignRequestFindUniqueArgs<ExtArgs>>): Prisma__SignRequestClient<$Result.GetResult<Prisma.$SignRequestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SignRequest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SignRequestFindUniqueOrThrowArgs} args - Arguments to find a SignRequest
     * @example
     * // Get one SignRequest
     * const signRequest = await prisma.signRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SignRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, SignRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SignRequestClient<$Result.GetResult<Prisma.$SignRequestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SignRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignRequestFindFirstArgs} args - Arguments to find a SignRequest
     * @example
     * // Get one SignRequest
     * const signRequest = await prisma.signRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SignRequestFindFirstArgs>(args?: SelectSubset<T, SignRequestFindFirstArgs<ExtArgs>>): Prisma__SignRequestClient<$Result.GetResult<Prisma.$SignRequestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SignRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignRequestFindFirstOrThrowArgs} args - Arguments to find a SignRequest
     * @example
     * // Get one SignRequest
     * const signRequest = await prisma.signRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SignRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, SignRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__SignRequestClient<$Result.GetResult<Prisma.$SignRequestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SignRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SignRequests
     * const signRequests = await prisma.signRequest.findMany()
     * 
     * // Get first 10 SignRequests
     * const signRequests = await prisma.signRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const signRequestWithIdOnly = await prisma.signRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SignRequestFindManyArgs>(args?: SelectSubset<T, SignRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignRequestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SignRequest.
     * @param {SignRequestCreateArgs} args - Arguments to create a SignRequest.
     * @example
     * // Create one SignRequest
     * const SignRequest = await prisma.signRequest.create({
     *   data: {
     *     // ... data to create a SignRequest
     *   }
     * })
     * 
     */
    create<T extends SignRequestCreateArgs>(args: SelectSubset<T, SignRequestCreateArgs<ExtArgs>>): Prisma__SignRequestClient<$Result.GetResult<Prisma.$SignRequestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SignRequests.
     * @param {SignRequestCreateManyArgs} args - Arguments to create many SignRequests.
     * @example
     * // Create many SignRequests
     * const signRequest = await prisma.signRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SignRequestCreateManyArgs>(args?: SelectSubset<T, SignRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SignRequests and returns the data saved in the database.
     * @param {SignRequestCreateManyAndReturnArgs} args - Arguments to create many SignRequests.
     * @example
     * // Create many SignRequests
     * const signRequest = await prisma.signRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SignRequests and only return the `id`
     * const signRequestWithIdOnly = await prisma.signRequest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SignRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, SignRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SignRequestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SignRequest.
     * @param {SignRequestDeleteArgs} args - Arguments to delete one SignRequest.
     * @example
     * // Delete one SignRequest
     * const SignRequest = await prisma.signRequest.delete({
     *   where: {
     *     // ... filter to delete one SignRequest
     *   }
     * })
     * 
     */
    delete<T extends SignRequestDeleteArgs>(args: SelectSubset<T, SignRequestDeleteArgs<ExtArgs>>): Prisma__SignRequestClient<$Result.GetResult<Prisma.$SignRequestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SignRequest.
     * @param {SignRequestUpdateArgs} args - Arguments to update one SignRequest.
     * @example
     * // Update one SignRequest
     * const signRequest = await prisma.signRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SignRequestUpdateArgs>(args: SelectSubset<T, SignRequestUpdateArgs<ExtArgs>>): Prisma__SignRequestClient<$Result.GetResult<Prisma.$SignRequestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SignRequests.
     * @param {SignRequestDeleteManyArgs} args - Arguments to filter SignRequests to delete.
     * @example
     * // Delete a few SignRequests
     * const { count } = await prisma.signRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SignRequestDeleteManyArgs>(args?: SelectSubset<T, SignRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SignRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SignRequests
     * const signRequest = await prisma.signRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SignRequestUpdateManyArgs>(args: SelectSubset<T, SignRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SignRequest.
     * @param {SignRequestUpsertArgs} args - Arguments to update or create a SignRequest.
     * @example
     * // Update or create a SignRequest
     * const signRequest = await prisma.signRequest.upsert({
     *   create: {
     *     // ... data to create a SignRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SignRequest we want to update
     *   }
     * })
     */
    upsert<T extends SignRequestUpsertArgs>(args: SelectSubset<T, SignRequestUpsertArgs<ExtArgs>>): Prisma__SignRequestClient<$Result.GetResult<Prisma.$SignRequestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SignRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignRequestCountArgs} args - Arguments to filter SignRequests to count.
     * @example
     * // Count the number of SignRequests
     * const count = await prisma.signRequest.count({
     *   where: {
     *     // ... the filter for the SignRequests we want to count
     *   }
     * })
    **/
    count<T extends SignRequestCountArgs>(
      args?: Subset<T, SignRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SignRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SignRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SignRequestAggregateArgs>(args: Subset<T, SignRequestAggregateArgs>): Prisma.PrismaPromise<GetSignRequestAggregateType<T>>

    /**
     * Group by SignRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SignRequestGroupByArgs} args - Group by arguments.
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
      T extends SignRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SignRequestGroupByArgs['orderBy'] }
        : { orderBy?: SignRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SignRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSignRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SignRequest model
   */
  readonly fields: SignRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SignRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SignRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    signerKey<T extends SignerKeyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SignerKeyDefaultArgs<ExtArgs>>): Prisma__SignerKeyClient<$Result.GetResult<Prisma.$SignerKeyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the SignRequest model
   */ 
  interface SignRequestFieldRefs {
    readonly id: FieldRef<"SignRequest", 'String'>
    readonly idempotencyKey: FieldRef<"SignRequest", 'String'>
    readonly signerKeyId: FieldRef<"SignRequest", 'String'>
    readonly chain: FieldRef<"SignRequest", 'SignerChain'>
    readonly walletId: FieldRef<"SignRequest", 'String'>
    readonly policyContext: FieldRef<"SignRequest", 'Json'>
    readonly unsignedTxHash: FieldRef<"SignRequest", 'String'>
    readonly outcome: FieldRef<"SignRequest", 'SignRequestOutcome'>
    readonly reasonCode: FieldRef<"SignRequest", 'String'>
    readonly reasonMessage: FieldRef<"SignRequest", 'String'>
    readonly signedTxHash: FieldRef<"SignRequest", 'String'>
    readonly createdAt: FieldRef<"SignRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SignRequest findUnique
   */
  export type SignRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignRequest
     */
    select?: SignRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignRequestInclude<ExtArgs> | null
    /**
     * Filter, which SignRequest to fetch.
     */
    where: SignRequestWhereUniqueInput
  }

  /**
   * SignRequest findUniqueOrThrow
   */
  export type SignRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignRequest
     */
    select?: SignRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignRequestInclude<ExtArgs> | null
    /**
     * Filter, which SignRequest to fetch.
     */
    where: SignRequestWhereUniqueInput
  }

  /**
   * SignRequest findFirst
   */
  export type SignRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignRequest
     */
    select?: SignRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignRequestInclude<ExtArgs> | null
    /**
     * Filter, which SignRequest to fetch.
     */
    where?: SignRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignRequests to fetch.
     */
    orderBy?: SignRequestOrderByWithRelationInput | SignRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SignRequests.
     */
    cursor?: SignRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SignRequests.
     */
    distinct?: SignRequestScalarFieldEnum | SignRequestScalarFieldEnum[]
  }

  /**
   * SignRequest findFirstOrThrow
   */
  export type SignRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignRequest
     */
    select?: SignRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignRequestInclude<ExtArgs> | null
    /**
     * Filter, which SignRequest to fetch.
     */
    where?: SignRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignRequests to fetch.
     */
    orderBy?: SignRequestOrderByWithRelationInput | SignRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SignRequests.
     */
    cursor?: SignRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SignRequests.
     */
    distinct?: SignRequestScalarFieldEnum | SignRequestScalarFieldEnum[]
  }

  /**
   * SignRequest findMany
   */
  export type SignRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignRequest
     */
    select?: SignRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignRequestInclude<ExtArgs> | null
    /**
     * Filter, which SignRequests to fetch.
     */
    where?: SignRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SignRequests to fetch.
     */
    orderBy?: SignRequestOrderByWithRelationInput | SignRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SignRequests.
     */
    cursor?: SignRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SignRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SignRequests.
     */
    skip?: number
    distinct?: SignRequestScalarFieldEnum | SignRequestScalarFieldEnum[]
  }

  /**
   * SignRequest create
   */
  export type SignRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignRequest
     */
    select?: SignRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a SignRequest.
     */
    data: XOR<SignRequestCreateInput, SignRequestUncheckedCreateInput>
  }

  /**
   * SignRequest createMany
   */
  export type SignRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SignRequests.
     */
    data: SignRequestCreateManyInput | SignRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SignRequest createManyAndReturn
   */
  export type SignRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignRequest
     */
    select?: SignRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SignRequests.
     */
    data: SignRequestCreateManyInput | SignRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SignRequest update
   */
  export type SignRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignRequest
     */
    select?: SignRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a SignRequest.
     */
    data: XOR<SignRequestUpdateInput, SignRequestUncheckedUpdateInput>
    /**
     * Choose, which SignRequest to update.
     */
    where: SignRequestWhereUniqueInput
  }

  /**
   * SignRequest updateMany
   */
  export type SignRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SignRequests.
     */
    data: XOR<SignRequestUpdateManyMutationInput, SignRequestUncheckedUpdateManyInput>
    /**
     * Filter which SignRequests to update
     */
    where?: SignRequestWhereInput
  }

  /**
   * SignRequest upsert
   */
  export type SignRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignRequest
     */
    select?: SignRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the SignRequest to update in case it exists.
     */
    where: SignRequestWhereUniqueInput
    /**
     * In case the SignRequest found by the `where` argument doesn't exist, create a new SignRequest with this data.
     */
    create: XOR<SignRequestCreateInput, SignRequestUncheckedCreateInput>
    /**
     * In case the SignRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SignRequestUpdateInput, SignRequestUncheckedUpdateInput>
  }

  /**
   * SignRequest delete
   */
  export type SignRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignRequest
     */
    select?: SignRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignRequestInclude<ExtArgs> | null
    /**
     * Filter which SignRequest to delete.
     */
    where: SignRequestWhereUniqueInput
  }

  /**
   * SignRequest deleteMany
   */
  export type SignRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SignRequests to delete
     */
    where?: SignRequestWhereInput
  }

  /**
   * SignRequest without action
   */
  export type SignRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SignRequest
     */
    select?: SignRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SignRequestInclude<ExtArgs> | null
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


  export const SignerKeyScalarFieldEnum: {
    id: 'id',
    keyRef: 'keyRef',
    chain: 'chain',
    publicAddress: 'publicAddress',
    wrappedPrivateKey: 'wrappedPrivateKey',
    wrappingKeyRef: 'wrappingKeyRef',
    status: 'status',
    label: 'label',
    createdAt: 'createdAt',
    rotatedAt: 'rotatedAt'
  };

  export type SignerKeyScalarFieldEnum = (typeof SignerKeyScalarFieldEnum)[keyof typeof SignerKeyScalarFieldEnum]


  export const SignRequestScalarFieldEnum: {
    id: 'id',
    idempotencyKey: 'idempotencyKey',
    signerKeyId: 'signerKeyId',
    chain: 'chain',
    walletId: 'walletId',
    policyContext: 'policyContext',
    unsignedTxHash: 'unsignedTxHash',
    outcome: 'outcome',
    reasonCode: 'reasonCode',
    reasonMessage: 'reasonMessage',
    signedTxHash: 'signedTxHash',
    createdAt: 'createdAt'
  };

  export type SignRequestScalarFieldEnum = (typeof SignRequestScalarFieldEnum)[keyof typeof SignRequestScalarFieldEnum]


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
   * Reference to a field of type 'SignerChain'
   */
  export type EnumSignerChainFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SignerChain'>
    


  /**
   * Reference to a field of type 'SignerChain[]'
   */
  export type ListEnumSignerChainFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SignerChain[]'>
    


  /**
   * Reference to a field of type 'Bytes'
   */
  export type BytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes'>
    


  /**
   * Reference to a field of type 'Bytes[]'
   */
  export type ListBytesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Bytes[]'>
    


  /**
   * Reference to a field of type 'SignerKeyStatus'
   */
  export type EnumSignerKeyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SignerKeyStatus'>
    


  /**
   * Reference to a field of type 'SignerKeyStatus[]'
   */
  export type ListEnumSignerKeyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SignerKeyStatus[]'>
    


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
   * Reference to a field of type 'SignRequestOutcome'
   */
  export type EnumSignRequestOutcomeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SignRequestOutcome'>
    


  /**
   * Reference to a field of type 'SignRequestOutcome[]'
   */
  export type ListEnumSignRequestOutcomeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SignRequestOutcome[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type SignerKeyWhereInput = {
    AND?: SignerKeyWhereInput | SignerKeyWhereInput[]
    OR?: SignerKeyWhereInput[]
    NOT?: SignerKeyWhereInput | SignerKeyWhereInput[]
    id?: UuidFilter<"SignerKey"> | string
    keyRef?: StringFilter<"SignerKey"> | string
    chain?: EnumSignerChainFilter<"SignerKey"> | $Enums.SignerChain
    publicAddress?: StringFilter<"SignerKey"> | string
    wrappedPrivateKey?: BytesFilter<"SignerKey"> | Buffer
    wrappingKeyRef?: StringFilter<"SignerKey"> | string
    status?: EnumSignerKeyStatusFilter<"SignerKey"> | $Enums.SignerKeyStatus
    label?: StringNullableFilter<"SignerKey"> | string | null
    createdAt?: DateTimeFilter<"SignerKey"> | Date | string
    rotatedAt?: DateTimeNullableFilter<"SignerKey"> | Date | string | null
    signRequests?: SignRequestListRelationFilter
  }

  export type SignerKeyOrderByWithRelationInput = {
    id?: SortOrder
    keyRef?: SortOrder
    chain?: SortOrder
    publicAddress?: SortOrder
    wrappedPrivateKey?: SortOrder
    wrappingKeyRef?: SortOrder
    status?: SortOrder
    label?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    rotatedAt?: SortOrderInput | SortOrder
    signRequests?: SignRequestOrderByRelationAggregateInput
  }

  export type SignerKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    keyRef?: string
    chain_publicAddress?: SignerKeyChainPublicAddressCompoundUniqueInput
    AND?: SignerKeyWhereInput | SignerKeyWhereInput[]
    OR?: SignerKeyWhereInput[]
    NOT?: SignerKeyWhereInput | SignerKeyWhereInput[]
    chain?: EnumSignerChainFilter<"SignerKey"> | $Enums.SignerChain
    publicAddress?: StringFilter<"SignerKey"> | string
    wrappedPrivateKey?: BytesFilter<"SignerKey"> | Buffer
    wrappingKeyRef?: StringFilter<"SignerKey"> | string
    status?: EnumSignerKeyStatusFilter<"SignerKey"> | $Enums.SignerKeyStatus
    label?: StringNullableFilter<"SignerKey"> | string | null
    createdAt?: DateTimeFilter<"SignerKey"> | Date | string
    rotatedAt?: DateTimeNullableFilter<"SignerKey"> | Date | string | null
    signRequests?: SignRequestListRelationFilter
  }, "id" | "keyRef" | "chain_publicAddress">

  export type SignerKeyOrderByWithAggregationInput = {
    id?: SortOrder
    keyRef?: SortOrder
    chain?: SortOrder
    publicAddress?: SortOrder
    wrappedPrivateKey?: SortOrder
    wrappingKeyRef?: SortOrder
    status?: SortOrder
    label?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    rotatedAt?: SortOrderInput | SortOrder
    _count?: SignerKeyCountOrderByAggregateInput
    _max?: SignerKeyMaxOrderByAggregateInput
    _min?: SignerKeyMinOrderByAggregateInput
  }

  export type SignerKeyScalarWhereWithAggregatesInput = {
    AND?: SignerKeyScalarWhereWithAggregatesInput | SignerKeyScalarWhereWithAggregatesInput[]
    OR?: SignerKeyScalarWhereWithAggregatesInput[]
    NOT?: SignerKeyScalarWhereWithAggregatesInput | SignerKeyScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"SignerKey"> | string
    keyRef?: StringWithAggregatesFilter<"SignerKey"> | string
    chain?: EnumSignerChainWithAggregatesFilter<"SignerKey"> | $Enums.SignerChain
    publicAddress?: StringWithAggregatesFilter<"SignerKey"> | string
    wrappedPrivateKey?: BytesWithAggregatesFilter<"SignerKey"> | Buffer
    wrappingKeyRef?: StringWithAggregatesFilter<"SignerKey"> | string
    status?: EnumSignerKeyStatusWithAggregatesFilter<"SignerKey"> | $Enums.SignerKeyStatus
    label?: StringNullableWithAggregatesFilter<"SignerKey"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SignerKey"> | Date | string
    rotatedAt?: DateTimeNullableWithAggregatesFilter<"SignerKey"> | Date | string | null
  }

  export type SignRequestWhereInput = {
    AND?: SignRequestWhereInput | SignRequestWhereInput[]
    OR?: SignRequestWhereInput[]
    NOT?: SignRequestWhereInput | SignRequestWhereInput[]
    id?: UuidFilter<"SignRequest"> | string
    idempotencyKey?: StringFilter<"SignRequest"> | string
    signerKeyId?: UuidFilter<"SignRequest"> | string
    chain?: EnumSignerChainFilter<"SignRequest"> | $Enums.SignerChain
    walletId?: StringNullableFilter<"SignRequest"> | string | null
    policyContext?: JsonFilter<"SignRequest">
    unsignedTxHash?: StringFilter<"SignRequest"> | string
    outcome?: EnumSignRequestOutcomeFilter<"SignRequest"> | $Enums.SignRequestOutcome
    reasonCode?: StringNullableFilter<"SignRequest"> | string | null
    reasonMessage?: StringNullableFilter<"SignRequest"> | string | null
    signedTxHash?: StringNullableFilter<"SignRequest"> | string | null
    createdAt?: DateTimeFilter<"SignRequest"> | Date | string
    signerKey?: XOR<SignerKeyRelationFilter, SignerKeyWhereInput>
  }

  export type SignRequestOrderByWithRelationInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    signerKeyId?: SortOrder
    chain?: SortOrder
    walletId?: SortOrderInput | SortOrder
    policyContext?: SortOrder
    unsignedTxHash?: SortOrder
    outcome?: SortOrder
    reasonCode?: SortOrderInput | SortOrder
    reasonMessage?: SortOrderInput | SortOrder
    signedTxHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    signerKey?: SignerKeyOrderByWithRelationInput
  }

  export type SignRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idempotencyKey?: string
    AND?: SignRequestWhereInput | SignRequestWhereInput[]
    OR?: SignRequestWhereInput[]
    NOT?: SignRequestWhereInput | SignRequestWhereInput[]
    signerKeyId?: UuidFilter<"SignRequest"> | string
    chain?: EnumSignerChainFilter<"SignRequest"> | $Enums.SignerChain
    walletId?: StringNullableFilter<"SignRequest"> | string | null
    policyContext?: JsonFilter<"SignRequest">
    unsignedTxHash?: StringFilter<"SignRequest"> | string
    outcome?: EnumSignRequestOutcomeFilter<"SignRequest"> | $Enums.SignRequestOutcome
    reasonCode?: StringNullableFilter<"SignRequest"> | string | null
    reasonMessage?: StringNullableFilter<"SignRequest"> | string | null
    signedTxHash?: StringNullableFilter<"SignRequest"> | string | null
    createdAt?: DateTimeFilter<"SignRequest"> | Date | string
    signerKey?: XOR<SignerKeyRelationFilter, SignerKeyWhereInput>
  }, "id" | "idempotencyKey">

  export type SignRequestOrderByWithAggregationInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    signerKeyId?: SortOrder
    chain?: SortOrder
    walletId?: SortOrderInput | SortOrder
    policyContext?: SortOrder
    unsignedTxHash?: SortOrder
    outcome?: SortOrder
    reasonCode?: SortOrderInput | SortOrder
    reasonMessage?: SortOrderInput | SortOrder
    signedTxHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SignRequestCountOrderByAggregateInput
    _max?: SignRequestMaxOrderByAggregateInput
    _min?: SignRequestMinOrderByAggregateInput
  }

  export type SignRequestScalarWhereWithAggregatesInput = {
    AND?: SignRequestScalarWhereWithAggregatesInput | SignRequestScalarWhereWithAggregatesInput[]
    OR?: SignRequestScalarWhereWithAggregatesInput[]
    NOT?: SignRequestScalarWhereWithAggregatesInput | SignRequestScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"SignRequest"> | string
    idempotencyKey?: StringWithAggregatesFilter<"SignRequest"> | string
    signerKeyId?: UuidWithAggregatesFilter<"SignRequest"> | string
    chain?: EnumSignerChainWithAggregatesFilter<"SignRequest"> | $Enums.SignerChain
    walletId?: StringNullableWithAggregatesFilter<"SignRequest"> | string | null
    policyContext?: JsonWithAggregatesFilter<"SignRequest">
    unsignedTxHash?: StringWithAggregatesFilter<"SignRequest"> | string
    outcome?: EnumSignRequestOutcomeWithAggregatesFilter<"SignRequest"> | $Enums.SignRequestOutcome
    reasonCode?: StringNullableWithAggregatesFilter<"SignRequest"> | string | null
    reasonMessage?: StringNullableWithAggregatesFilter<"SignRequest"> | string | null
    signedTxHash?: StringNullableWithAggregatesFilter<"SignRequest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SignRequest"> | Date | string
  }

  export type SignerKeyCreateInput = {
    id?: string
    keyRef: string
    chain: $Enums.SignerChain
    publicAddress: string
    wrappedPrivateKey: Buffer
    wrappingKeyRef: string
    status?: $Enums.SignerKeyStatus
    label?: string | null
    createdAt?: Date | string
    rotatedAt?: Date | string | null
    signRequests?: SignRequestCreateNestedManyWithoutSignerKeyInput
  }

  export type SignerKeyUncheckedCreateInput = {
    id?: string
    keyRef: string
    chain: $Enums.SignerChain
    publicAddress: string
    wrappedPrivateKey: Buffer
    wrappingKeyRef: string
    status?: $Enums.SignerKeyStatus
    label?: string | null
    createdAt?: Date | string
    rotatedAt?: Date | string | null
    signRequests?: SignRequestUncheckedCreateNestedManyWithoutSignerKeyInput
  }

  export type SignerKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    keyRef?: StringFieldUpdateOperationsInput | string
    chain?: EnumSignerChainFieldUpdateOperationsInput | $Enums.SignerChain
    publicAddress?: StringFieldUpdateOperationsInput | string
    wrappedPrivateKey?: BytesFieldUpdateOperationsInput | Buffer
    wrappingKeyRef?: StringFieldUpdateOperationsInput | string
    status?: EnumSignerKeyStatusFieldUpdateOperationsInput | $Enums.SignerKeyStatus
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rotatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signRequests?: SignRequestUpdateManyWithoutSignerKeyNestedInput
  }

  export type SignerKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    keyRef?: StringFieldUpdateOperationsInput | string
    chain?: EnumSignerChainFieldUpdateOperationsInput | $Enums.SignerChain
    publicAddress?: StringFieldUpdateOperationsInput | string
    wrappedPrivateKey?: BytesFieldUpdateOperationsInput | Buffer
    wrappingKeyRef?: StringFieldUpdateOperationsInput | string
    status?: EnumSignerKeyStatusFieldUpdateOperationsInput | $Enums.SignerKeyStatus
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rotatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    signRequests?: SignRequestUncheckedUpdateManyWithoutSignerKeyNestedInput
  }

  export type SignerKeyCreateManyInput = {
    id?: string
    keyRef: string
    chain: $Enums.SignerChain
    publicAddress: string
    wrappedPrivateKey: Buffer
    wrappingKeyRef: string
    status?: $Enums.SignerKeyStatus
    label?: string | null
    createdAt?: Date | string
    rotatedAt?: Date | string | null
  }

  export type SignerKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    keyRef?: StringFieldUpdateOperationsInput | string
    chain?: EnumSignerChainFieldUpdateOperationsInput | $Enums.SignerChain
    publicAddress?: StringFieldUpdateOperationsInput | string
    wrappedPrivateKey?: BytesFieldUpdateOperationsInput | Buffer
    wrappingKeyRef?: StringFieldUpdateOperationsInput | string
    status?: EnumSignerKeyStatusFieldUpdateOperationsInput | $Enums.SignerKeyStatus
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rotatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SignerKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    keyRef?: StringFieldUpdateOperationsInput | string
    chain?: EnumSignerChainFieldUpdateOperationsInput | $Enums.SignerChain
    publicAddress?: StringFieldUpdateOperationsInput | string
    wrappedPrivateKey?: BytesFieldUpdateOperationsInput | Buffer
    wrappingKeyRef?: StringFieldUpdateOperationsInput | string
    status?: EnumSignerKeyStatusFieldUpdateOperationsInput | $Enums.SignerKeyStatus
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rotatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SignRequestCreateInput = {
    id?: string
    idempotencyKey: string
    chain: $Enums.SignerChain
    walletId?: string | null
    policyContext: JsonNullValueInput | InputJsonValue
    unsignedTxHash: string
    outcome: $Enums.SignRequestOutcome
    reasonCode?: string | null
    reasonMessage?: string | null
    signedTxHash?: string | null
    createdAt?: Date | string
    signerKey: SignerKeyCreateNestedOneWithoutSignRequestsInput
  }

  export type SignRequestUncheckedCreateInput = {
    id?: string
    idempotencyKey: string
    signerKeyId: string
    chain: $Enums.SignerChain
    walletId?: string | null
    policyContext: JsonNullValueInput | InputJsonValue
    unsignedTxHash: string
    outcome: $Enums.SignRequestOutcome
    reasonCode?: string | null
    reasonMessage?: string | null
    signedTxHash?: string | null
    createdAt?: Date | string
  }

  export type SignRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    chain?: EnumSignerChainFieldUpdateOperationsInput | $Enums.SignerChain
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    policyContext?: JsonNullValueInput | InputJsonValue
    unsignedTxHash?: StringFieldUpdateOperationsInput | string
    outcome?: EnumSignRequestOutcomeFieldUpdateOperationsInput | $Enums.SignRequestOutcome
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    reasonMessage?: NullableStringFieldUpdateOperationsInput | string | null
    signedTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signerKey?: SignerKeyUpdateOneRequiredWithoutSignRequestsNestedInput
  }

  export type SignRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    signerKeyId?: StringFieldUpdateOperationsInput | string
    chain?: EnumSignerChainFieldUpdateOperationsInput | $Enums.SignerChain
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    policyContext?: JsonNullValueInput | InputJsonValue
    unsignedTxHash?: StringFieldUpdateOperationsInput | string
    outcome?: EnumSignRequestOutcomeFieldUpdateOperationsInput | $Enums.SignRequestOutcome
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    reasonMessage?: NullableStringFieldUpdateOperationsInput | string | null
    signedTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignRequestCreateManyInput = {
    id?: string
    idempotencyKey: string
    signerKeyId: string
    chain: $Enums.SignerChain
    walletId?: string | null
    policyContext: JsonNullValueInput | InputJsonValue
    unsignedTxHash: string
    outcome: $Enums.SignRequestOutcome
    reasonCode?: string | null
    reasonMessage?: string | null
    signedTxHash?: string | null
    createdAt?: Date | string
  }

  export type SignRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    chain?: EnumSignerChainFieldUpdateOperationsInput | $Enums.SignerChain
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    policyContext?: JsonNullValueInput | InputJsonValue
    unsignedTxHash?: StringFieldUpdateOperationsInput | string
    outcome?: EnumSignRequestOutcomeFieldUpdateOperationsInput | $Enums.SignRequestOutcome
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    reasonMessage?: NullableStringFieldUpdateOperationsInput | string | null
    signedTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    signerKeyId?: StringFieldUpdateOperationsInput | string
    chain?: EnumSignerChainFieldUpdateOperationsInput | $Enums.SignerChain
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    policyContext?: JsonNullValueInput | InputJsonValue
    unsignedTxHash?: StringFieldUpdateOperationsInput | string
    outcome?: EnumSignRequestOutcomeFieldUpdateOperationsInput | $Enums.SignRequestOutcome
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    reasonMessage?: NullableStringFieldUpdateOperationsInput | string | null
    signedTxHash?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type EnumSignerChainFilter<$PrismaModel = never> = {
    equals?: $Enums.SignerChain | EnumSignerChainFieldRefInput<$PrismaModel>
    in?: $Enums.SignerChain[] | ListEnumSignerChainFieldRefInput<$PrismaModel>
    notIn?: $Enums.SignerChain[] | ListEnumSignerChainFieldRefInput<$PrismaModel>
    not?: NestedEnumSignerChainFilter<$PrismaModel> | $Enums.SignerChain
  }

  export type BytesFilter<$PrismaModel = never> = {
    equals?: Buffer | BytesFieldRefInput<$PrismaModel>
    in?: Buffer[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Buffer[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesFilter<$PrismaModel> | Buffer
  }

  export type EnumSignerKeyStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SignerKeyStatus | EnumSignerKeyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SignerKeyStatus[] | ListEnumSignerKeyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SignerKeyStatus[] | ListEnumSignerKeyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSignerKeyStatusFilter<$PrismaModel> | $Enums.SignerKeyStatus
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

  export type SignRequestListRelationFilter = {
    every?: SignRequestWhereInput
    some?: SignRequestWhereInput
    none?: SignRequestWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SignRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SignerKeyChainPublicAddressCompoundUniqueInput = {
    chain: $Enums.SignerChain
    publicAddress: string
  }

  export type SignerKeyCountOrderByAggregateInput = {
    id?: SortOrder
    keyRef?: SortOrder
    chain?: SortOrder
    publicAddress?: SortOrder
    wrappedPrivateKey?: SortOrder
    wrappingKeyRef?: SortOrder
    status?: SortOrder
    label?: SortOrder
    createdAt?: SortOrder
    rotatedAt?: SortOrder
  }

  export type SignerKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    keyRef?: SortOrder
    chain?: SortOrder
    publicAddress?: SortOrder
    wrappedPrivateKey?: SortOrder
    wrappingKeyRef?: SortOrder
    status?: SortOrder
    label?: SortOrder
    createdAt?: SortOrder
    rotatedAt?: SortOrder
  }

  export type SignerKeyMinOrderByAggregateInput = {
    id?: SortOrder
    keyRef?: SortOrder
    chain?: SortOrder
    publicAddress?: SortOrder
    wrappedPrivateKey?: SortOrder
    wrappingKeyRef?: SortOrder
    status?: SortOrder
    label?: SortOrder
    createdAt?: SortOrder
    rotatedAt?: SortOrder
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

  export type EnumSignerChainWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SignerChain | EnumSignerChainFieldRefInput<$PrismaModel>
    in?: $Enums.SignerChain[] | ListEnumSignerChainFieldRefInput<$PrismaModel>
    notIn?: $Enums.SignerChain[] | ListEnumSignerChainFieldRefInput<$PrismaModel>
    not?: NestedEnumSignerChainWithAggregatesFilter<$PrismaModel> | $Enums.SignerChain
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSignerChainFilter<$PrismaModel>
    _max?: NestedEnumSignerChainFilter<$PrismaModel>
  }

  export type BytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Buffer | BytesFieldRefInput<$PrismaModel>
    in?: Buffer[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Buffer[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Buffer
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type EnumSignerKeyStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SignerKeyStatus | EnumSignerKeyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SignerKeyStatus[] | ListEnumSignerKeyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SignerKeyStatus[] | ListEnumSignerKeyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSignerKeyStatusWithAggregatesFilter<$PrismaModel> | $Enums.SignerKeyStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSignerKeyStatusFilter<$PrismaModel>
    _max?: NestedEnumSignerKeyStatusFilter<$PrismaModel>
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

  export type EnumSignRequestOutcomeFilter<$PrismaModel = never> = {
    equals?: $Enums.SignRequestOutcome | EnumSignRequestOutcomeFieldRefInput<$PrismaModel>
    in?: $Enums.SignRequestOutcome[] | ListEnumSignRequestOutcomeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SignRequestOutcome[] | ListEnumSignRequestOutcomeFieldRefInput<$PrismaModel>
    not?: NestedEnumSignRequestOutcomeFilter<$PrismaModel> | $Enums.SignRequestOutcome
  }

  export type SignerKeyRelationFilter = {
    is?: SignerKeyWhereInput
    isNot?: SignerKeyWhereInput
  }

  export type SignRequestCountOrderByAggregateInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    signerKeyId?: SortOrder
    chain?: SortOrder
    walletId?: SortOrder
    policyContext?: SortOrder
    unsignedTxHash?: SortOrder
    outcome?: SortOrder
    reasonCode?: SortOrder
    reasonMessage?: SortOrder
    signedTxHash?: SortOrder
    createdAt?: SortOrder
  }

  export type SignRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    signerKeyId?: SortOrder
    chain?: SortOrder
    walletId?: SortOrder
    unsignedTxHash?: SortOrder
    outcome?: SortOrder
    reasonCode?: SortOrder
    reasonMessage?: SortOrder
    signedTxHash?: SortOrder
    createdAt?: SortOrder
  }

  export type SignRequestMinOrderByAggregateInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    signerKeyId?: SortOrder
    chain?: SortOrder
    walletId?: SortOrder
    unsignedTxHash?: SortOrder
    outcome?: SortOrder
    reasonCode?: SortOrder
    reasonMessage?: SortOrder
    signedTxHash?: SortOrder
    createdAt?: SortOrder
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

  export type EnumSignRequestOutcomeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SignRequestOutcome | EnumSignRequestOutcomeFieldRefInput<$PrismaModel>
    in?: $Enums.SignRequestOutcome[] | ListEnumSignRequestOutcomeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SignRequestOutcome[] | ListEnumSignRequestOutcomeFieldRefInput<$PrismaModel>
    not?: NestedEnumSignRequestOutcomeWithAggregatesFilter<$PrismaModel> | $Enums.SignRequestOutcome
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSignRequestOutcomeFilter<$PrismaModel>
    _max?: NestedEnumSignRequestOutcomeFilter<$PrismaModel>
  }

  export type SignRequestCreateNestedManyWithoutSignerKeyInput = {
    create?: XOR<SignRequestCreateWithoutSignerKeyInput, SignRequestUncheckedCreateWithoutSignerKeyInput> | SignRequestCreateWithoutSignerKeyInput[] | SignRequestUncheckedCreateWithoutSignerKeyInput[]
    connectOrCreate?: SignRequestCreateOrConnectWithoutSignerKeyInput | SignRequestCreateOrConnectWithoutSignerKeyInput[]
    createMany?: SignRequestCreateManySignerKeyInputEnvelope
    connect?: SignRequestWhereUniqueInput | SignRequestWhereUniqueInput[]
  }

  export type SignRequestUncheckedCreateNestedManyWithoutSignerKeyInput = {
    create?: XOR<SignRequestCreateWithoutSignerKeyInput, SignRequestUncheckedCreateWithoutSignerKeyInput> | SignRequestCreateWithoutSignerKeyInput[] | SignRequestUncheckedCreateWithoutSignerKeyInput[]
    connectOrCreate?: SignRequestCreateOrConnectWithoutSignerKeyInput | SignRequestCreateOrConnectWithoutSignerKeyInput[]
    createMany?: SignRequestCreateManySignerKeyInputEnvelope
    connect?: SignRequestWhereUniqueInput | SignRequestWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumSignerChainFieldUpdateOperationsInput = {
    set?: $Enums.SignerChain
  }

  export type BytesFieldUpdateOperationsInput = {
    set?: Buffer
  }

  export type EnumSignerKeyStatusFieldUpdateOperationsInput = {
    set?: $Enums.SignerKeyStatus
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

  export type SignRequestUpdateManyWithoutSignerKeyNestedInput = {
    create?: XOR<SignRequestCreateWithoutSignerKeyInput, SignRequestUncheckedCreateWithoutSignerKeyInput> | SignRequestCreateWithoutSignerKeyInput[] | SignRequestUncheckedCreateWithoutSignerKeyInput[]
    connectOrCreate?: SignRequestCreateOrConnectWithoutSignerKeyInput | SignRequestCreateOrConnectWithoutSignerKeyInput[]
    upsert?: SignRequestUpsertWithWhereUniqueWithoutSignerKeyInput | SignRequestUpsertWithWhereUniqueWithoutSignerKeyInput[]
    createMany?: SignRequestCreateManySignerKeyInputEnvelope
    set?: SignRequestWhereUniqueInput | SignRequestWhereUniqueInput[]
    disconnect?: SignRequestWhereUniqueInput | SignRequestWhereUniqueInput[]
    delete?: SignRequestWhereUniqueInput | SignRequestWhereUniqueInput[]
    connect?: SignRequestWhereUniqueInput | SignRequestWhereUniqueInput[]
    update?: SignRequestUpdateWithWhereUniqueWithoutSignerKeyInput | SignRequestUpdateWithWhereUniqueWithoutSignerKeyInput[]
    updateMany?: SignRequestUpdateManyWithWhereWithoutSignerKeyInput | SignRequestUpdateManyWithWhereWithoutSignerKeyInput[]
    deleteMany?: SignRequestScalarWhereInput | SignRequestScalarWhereInput[]
  }

  export type SignRequestUncheckedUpdateManyWithoutSignerKeyNestedInput = {
    create?: XOR<SignRequestCreateWithoutSignerKeyInput, SignRequestUncheckedCreateWithoutSignerKeyInput> | SignRequestCreateWithoutSignerKeyInput[] | SignRequestUncheckedCreateWithoutSignerKeyInput[]
    connectOrCreate?: SignRequestCreateOrConnectWithoutSignerKeyInput | SignRequestCreateOrConnectWithoutSignerKeyInput[]
    upsert?: SignRequestUpsertWithWhereUniqueWithoutSignerKeyInput | SignRequestUpsertWithWhereUniqueWithoutSignerKeyInput[]
    createMany?: SignRequestCreateManySignerKeyInputEnvelope
    set?: SignRequestWhereUniqueInput | SignRequestWhereUniqueInput[]
    disconnect?: SignRequestWhereUniqueInput | SignRequestWhereUniqueInput[]
    delete?: SignRequestWhereUniqueInput | SignRequestWhereUniqueInput[]
    connect?: SignRequestWhereUniqueInput | SignRequestWhereUniqueInput[]
    update?: SignRequestUpdateWithWhereUniqueWithoutSignerKeyInput | SignRequestUpdateWithWhereUniqueWithoutSignerKeyInput[]
    updateMany?: SignRequestUpdateManyWithWhereWithoutSignerKeyInput | SignRequestUpdateManyWithWhereWithoutSignerKeyInput[]
    deleteMany?: SignRequestScalarWhereInput | SignRequestScalarWhereInput[]
  }

  export type SignerKeyCreateNestedOneWithoutSignRequestsInput = {
    create?: XOR<SignerKeyCreateWithoutSignRequestsInput, SignerKeyUncheckedCreateWithoutSignRequestsInput>
    connectOrCreate?: SignerKeyCreateOrConnectWithoutSignRequestsInput
    connect?: SignerKeyWhereUniqueInput
  }

  export type EnumSignRequestOutcomeFieldUpdateOperationsInput = {
    set?: $Enums.SignRequestOutcome
  }

  export type SignerKeyUpdateOneRequiredWithoutSignRequestsNestedInput = {
    create?: XOR<SignerKeyCreateWithoutSignRequestsInput, SignerKeyUncheckedCreateWithoutSignRequestsInput>
    connectOrCreate?: SignerKeyCreateOrConnectWithoutSignRequestsInput
    upsert?: SignerKeyUpsertWithoutSignRequestsInput
    connect?: SignerKeyWhereUniqueInput
    update?: XOR<XOR<SignerKeyUpdateToOneWithWhereWithoutSignRequestsInput, SignerKeyUpdateWithoutSignRequestsInput>, SignerKeyUncheckedUpdateWithoutSignRequestsInput>
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

  export type NestedEnumSignerChainFilter<$PrismaModel = never> = {
    equals?: $Enums.SignerChain | EnumSignerChainFieldRefInput<$PrismaModel>
    in?: $Enums.SignerChain[] | ListEnumSignerChainFieldRefInput<$PrismaModel>
    notIn?: $Enums.SignerChain[] | ListEnumSignerChainFieldRefInput<$PrismaModel>
    not?: NestedEnumSignerChainFilter<$PrismaModel> | $Enums.SignerChain
  }

  export type NestedBytesFilter<$PrismaModel = never> = {
    equals?: Buffer | BytesFieldRefInput<$PrismaModel>
    in?: Buffer[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Buffer[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesFilter<$PrismaModel> | Buffer
  }

  export type NestedEnumSignerKeyStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SignerKeyStatus | EnumSignerKeyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SignerKeyStatus[] | ListEnumSignerKeyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SignerKeyStatus[] | ListEnumSignerKeyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSignerKeyStatusFilter<$PrismaModel> | $Enums.SignerKeyStatus
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

  export type NestedEnumSignerChainWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SignerChain | EnumSignerChainFieldRefInput<$PrismaModel>
    in?: $Enums.SignerChain[] | ListEnumSignerChainFieldRefInput<$PrismaModel>
    notIn?: $Enums.SignerChain[] | ListEnumSignerChainFieldRefInput<$PrismaModel>
    not?: NestedEnumSignerChainWithAggregatesFilter<$PrismaModel> | $Enums.SignerChain
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSignerChainFilter<$PrismaModel>
    _max?: NestedEnumSignerChainFilter<$PrismaModel>
  }

  export type NestedBytesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Buffer | BytesFieldRefInput<$PrismaModel>
    in?: Buffer[] | ListBytesFieldRefInput<$PrismaModel>
    notIn?: Buffer[] | ListBytesFieldRefInput<$PrismaModel>
    not?: NestedBytesWithAggregatesFilter<$PrismaModel> | Buffer
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBytesFilter<$PrismaModel>
    _max?: NestedBytesFilter<$PrismaModel>
  }

  export type NestedEnumSignerKeyStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SignerKeyStatus | EnumSignerKeyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SignerKeyStatus[] | ListEnumSignerKeyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SignerKeyStatus[] | ListEnumSignerKeyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSignerKeyStatusWithAggregatesFilter<$PrismaModel> | $Enums.SignerKeyStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSignerKeyStatusFilter<$PrismaModel>
    _max?: NestedEnumSignerKeyStatusFilter<$PrismaModel>
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

  export type NestedEnumSignRequestOutcomeFilter<$PrismaModel = never> = {
    equals?: $Enums.SignRequestOutcome | EnumSignRequestOutcomeFieldRefInput<$PrismaModel>
    in?: $Enums.SignRequestOutcome[] | ListEnumSignRequestOutcomeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SignRequestOutcome[] | ListEnumSignRequestOutcomeFieldRefInput<$PrismaModel>
    not?: NestedEnumSignRequestOutcomeFilter<$PrismaModel> | $Enums.SignRequestOutcome
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

  export type NestedEnumSignRequestOutcomeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SignRequestOutcome | EnumSignRequestOutcomeFieldRefInput<$PrismaModel>
    in?: $Enums.SignRequestOutcome[] | ListEnumSignRequestOutcomeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SignRequestOutcome[] | ListEnumSignRequestOutcomeFieldRefInput<$PrismaModel>
    not?: NestedEnumSignRequestOutcomeWithAggregatesFilter<$PrismaModel> | $Enums.SignRequestOutcome
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSignRequestOutcomeFilter<$PrismaModel>
    _max?: NestedEnumSignRequestOutcomeFilter<$PrismaModel>
  }

  export type SignRequestCreateWithoutSignerKeyInput = {
    id?: string
    idempotencyKey: string
    chain: $Enums.SignerChain
    walletId?: string | null
    policyContext: JsonNullValueInput | InputJsonValue
    unsignedTxHash: string
    outcome: $Enums.SignRequestOutcome
    reasonCode?: string | null
    reasonMessage?: string | null
    signedTxHash?: string | null
    createdAt?: Date | string
  }

  export type SignRequestUncheckedCreateWithoutSignerKeyInput = {
    id?: string
    idempotencyKey: string
    chain: $Enums.SignerChain
    walletId?: string | null
    policyContext: JsonNullValueInput | InputJsonValue
    unsignedTxHash: string
    outcome: $Enums.SignRequestOutcome
    reasonCode?: string | null
    reasonMessage?: string | null
    signedTxHash?: string | null
    createdAt?: Date | string
  }

  export type SignRequestCreateOrConnectWithoutSignerKeyInput = {
    where: SignRequestWhereUniqueInput
    create: XOR<SignRequestCreateWithoutSignerKeyInput, SignRequestUncheckedCreateWithoutSignerKeyInput>
  }

  export type SignRequestCreateManySignerKeyInputEnvelope = {
    data: SignRequestCreateManySignerKeyInput | SignRequestCreateManySignerKeyInput[]
    skipDuplicates?: boolean
  }

  export type SignRequestUpsertWithWhereUniqueWithoutSignerKeyInput = {
    where: SignRequestWhereUniqueInput
    update: XOR<SignRequestUpdateWithoutSignerKeyInput, SignRequestUncheckedUpdateWithoutSignerKeyInput>
    create: XOR<SignRequestCreateWithoutSignerKeyInput, SignRequestUncheckedCreateWithoutSignerKeyInput>
  }

  export type SignRequestUpdateWithWhereUniqueWithoutSignerKeyInput = {
    where: SignRequestWhereUniqueInput
    data: XOR<SignRequestUpdateWithoutSignerKeyInput, SignRequestUncheckedUpdateWithoutSignerKeyInput>
  }

  export type SignRequestUpdateManyWithWhereWithoutSignerKeyInput = {
    where: SignRequestScalarWhereInput
    data: XOR<SignRequestUpdateManyMutationInput, SignRequestUncheckedUpdateManyWithoutSignerKeyInput>
  }

  export type SignRequestScalarWhereInput = {
    AND?: SignRequestScalarWhereInput | SignRequestScalarWhereInput[]
    OR?: SignRequestScalarWhereInput[]
    NOT?: SignRequestScalarWhereInput | SignRequestScalarWhereInput[]
    id?: UuidFilter<"SignRequest"> | string
    idempotencyKey?: StringFilter<"SignRequest"> | string
    signerKeyId?: UuidFilter<"SignRequest"> | string
    chain?: EnumSignerChainFilter<"SignRequest"> | $Enums.SignerChain
    walletId?: StringNullableFilter<"SignRequest"> | string | null
    policyContext?: JsonFilter<"SignRequest">
    unsignedTxHash?: StringFilter<"SignRequest"> | string
    outcome?: EnumSignRequestOutcomeFilter<"SignRequest"> | $Enums.SignRequestOutcome
    reasonCode?: StringNullableFilter<"SignRequest"> | string | null
    reasonMessage?: StringNullableFilter<"SignRequest"> | string | null
    signedTxHash?: StringNullableFilter<"SignRequest"> | string | null
    createdAt?: DateTimeFilter<"SignRequest"> | Date | string
  }

  export type SignerKeyCreateWithoutSignRequestsInput = {
    id?: string
    keyRef: string
    chain: $Enums.SignerChain
    publicAddress: string
    wrappedPrivateKey: Buffer
    wrappingKeyRef: string
    status?: $Enums.SignerKeyStatus
    label?: string | null
    createdAt?: Date | string
    rotatedAt?: Date | string | null
  }

  export type SignerKeyUncheckedCreateWithoutSignRequestsInput = {
    id?: string
    keyRef: string
    chain: $Enums.SignerChain
    publicAddress: string
    wrappedPrivateKey: Buffer
    wrappingKeyRef: string
    status?: $Enums.SignerKeyStatus
    label?: string | null
    createdAt?: Date | string
    rotatedAt?: Date | string | null
  }

  export type SignerKeyCreateOrConnectWithoutSignRequestsInput = {
    where: SignerKeyWhereUniqueInput
    create: XOR<SignerKeyCreateWithoutSignRequestsInput, SignerKeyUncheckedCreateWithoutSignRequestsInput>
  }

  export type SignerKeyUpsertWithoutSignRequestsInput = {
    update: XOR<SignerKeyUpdateWithoutSignRequestsInput, SignerKeyUncheckedUpdateWithoutSignRequestsInput>
    create: XOR<SignerKeyCreateWithoutSignRequestsInput, SignerKeyUncheckedCreateWithoutSignRequestsInput>
    where?: SignerKeyWhereInput
  }

  export type SignerKeyUpdateToOneWithWhereWithoutSignRequestsInput = {
    where?: SignerKeyWhereInput
    data: XOR<SignerKeyUpdateWithoutSignRequestsInput, SignerKeyUncheckedUpdateWithoutSignRequestsInput>
  }

  export type SignerKeyUpdateWithoutSignRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    keyRef?: StringFieldUpdateOperationsInput | string
    chain?: EnumSignerChainFieldUpdateOperationsInput | $Enums.SignerChain
    publicAddress?: StringFieldUpdateOperationsInput | string
    wrappedPrivateKey?: BytesFieldUpdateOperationsInput | Buffer
    wrappingKeyRef?: StringFieldUpdateOperationsInput | string
    status?: EnumSignerKeyStatusFieldUpdateOperationsInput | $Enums.SignerKeyStatus
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rotatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SignerKeyUncheckedUpdateWithoutSignRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    keyRef?: StringFieldUpdateOperationsInput | string
    chain?: EnumSignerChainFieldUpdateOperationsInput | $Enums.SignerChain
    publicAddress?: StringFieldUpdateOperationsInput | string
    wrappedPrivateKey?: BytesFieldUpdateOperationsInput | Buffer
    wrappingKeyRef?: StringFieldUpdateOperationsInput | string
    status?: EnumSignerKeyStatusFieldUpdateOperationsInput | $Enums.SignerKeyStatus
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rotatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SignRequestCreateManySignerKeyInput = {
    id?: string
    idempotencyKey: string
    chain: $Enums.SignerChain
    walletId?: string | null
    policyContext: JsonNullValueInput | InputJsonValue
    unsignedTxHash: string
    outcome: $Enums.SignRequestOutcome
    reasonCode?: string | null
    reasonMessage?: string | null
    signedTxHash?: string | null
    createdAt?: Date | string
  }

  export type SignRequestUpdateWithoutSignerKeyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    chain?: EnumSignerChainFieldUpdateOperationsInput | $Enums.SignerChain
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    policyContext?: JsonNullValueInput | InputJsonValue
    unsignedTxHash?: StringFieldUpdateOperationsInput | string
    outcome?: EnumSignRequestOutcomeFieldUpdateOperationsInput | $Enums.SignRequestOutcome
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    reasonMessage?: NullableStringFieldUpdateOperationsInput | string | null
    signedTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignRequestUncheckedUpdateWithoutSignerKeyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    chain?: EnumSignerChainFieldUpdateOperationsInput | $Enums.SignerChain
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    policyContext?: JsonNullValueInput | InputJsonValue
    unsignedTxHash?: StringFieldUpdateOperationsInput | string
    outcome?: EnumSignRequestOutcomeFieldUpdateOperationsInput | $Enums.SignRequestOutcome
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    reasonMessage?: NullableStringFieldUpdateOperationsInput | string | null
    signedTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SignRequestUncheckedUpdateManyWithoutSignerKeyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    chain?: EnumSignerChainFieldUpdateOperationsInput | $Enums.SignerChain
    walletId?: NullableStringFieldUpdateOperationsInput | string | null
    policyContext?: JsonNullValueInput | InputJsonValue
    unsignedTxHash?: StringFieldUpdateOperationsInput | string
    outcome?: EnumSignRequestOutcomeFieldUpdateOperationsInput | $Enums.SignRequestOutcome
    reasonCode?: NullableStringFieldUpdateOperationsInput | string | null
    reasonMessage?: NullableStringFieldUpdateOperationsInput | string | null
    signedTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use SignerKeyCountOutputTypeDefaultArgs instead
     */
    export type SignerKeyCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SignerKeyCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SignerKeyDefaultArgs instead
     */
    export type SignerKeyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SignerKeyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SignRequestDefaultArgs instead
     */
    export type SignRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SignRequestDefaultArgs<ExtArgs>

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