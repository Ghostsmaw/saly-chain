
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
 * Model ReserveAccount
 * 
 */
export type ReserveAccount = $Result.DefaultSelection<Prisma.$ReserveAccountPayload>
/**
 * Model MintRequest
 * 
 */
export type MintRequest = $Result.DefaultSelection<Prisma.$MintRequestPayload>
/**
 * Model RedeemRequest
 * 
 */
export type RedeemRequest = $Result.DefaultSelection<Prisma.$RedeemRequestPayload>
/**
 * Model SupplySnapshot
 * 
 */
export type SupplySnapshot = $Result.DefaultSelection<Prisma.$SupplySnapshotPayload>
/**
 * Model ReserveAttestation
 * 
 */
export type ReserveAttestation = $Result.DefaultSelection<Prisma.$ReserveAttestationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const StablecoinChain: {
  SALY_L3: 'SALY_L3',
  BASE: 'BASE'
};

export type StablecoinChain = (typeof StablecoinChain)[keyof typeof StablecoinChain]


export const MintRequestStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  MINTING: 'MINTING',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED',
  FAILED: 'FAILED'
};

export type MintRequestStatus = (typeof MintRequestStatus)[keyof typeof MintRequestStatus]


export const RedeemRequestStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  BURNING: 'BURNING',
  PAYOUT: 'PAYOUT',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED',
  FAILED: 'FAILED'
};

export type RedeemRequestStatus = (typeof RedeemRequestStatus)[keyof typeof RedeemRequestStatus]

}

export type StablecoinChain = $Enums.StablecoinChain

export const StablecoinChain: typeof $Enums.StablecoinChain

export type MintRequestStatus = $Enums.MintRequestStatus

export const MintRequestStatus: typeof $Enums.MintRequestStatus

export type RedeemRequestStatus = $Enums.RedeemRequestStatus

export const RedeemRequestStatus: typeof $Enums.RedeemRequestStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ReserveAccounts
 * const reserveAccounts = await prisma.reserveAccount.findMany()
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
   * // Fetch zero or more ReserveAccounts
   * const reserveAccounts = await prisma.reserveAccount.findMany()
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
   * `prisma.reserveAccount`: Exposes CRUD operations for the **ReserveAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReserveAccounts
    * const reserveAccounts = await prisma.reserveAccount.findMany()
    * ```
    */
  get reserveAccount(): Prisma.ReserveAccountDelegate<ExtArgs>;

  /**
   * `prisma.mintRequest`: Exposes CRUD operations for the **MintRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MintRequests
    * const mintRequests = await prisma.mintRequest.findMany()
    * ```
    */
  get mintRequest(): Prisma.MintRequestDelegate<ExtArgs>;

  /**
   * `prisma.redeemRequest`: Exposes CRUD operations for the **RedeemRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RedeemRequests
    * const redeemRequests = await prisma.redeemRequest.findMany()
    * ```
    */
  get redeemRequest(): Prisma.RedeemRequestDelegate<ExtArgs>;

  /**
   * `prisma.supplySnapshot`: Exposes CRUD operations for the **SupplySnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupplySnapshots
    * const supplySnapshots = await prisma.supplySnapshot.findMany()
    * ```
    */
  get supplySnapshot(): Prisma.SupplySnapshotDelegate<ExtArgs>;

  /**
   * `prisma.reserveAttestation`: Exposes CRUD operations for the **ReserveAttestation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReserveAttestations
    * const reserveAttestations = await prisma.reserveAttestation.findMany()
    * ```
    */
  get reserveAttestation(): Prisma.ReserveAttestationDelegate<ExtArgs>;
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
    ReserveAccount: 'ReserveAccount',
    MintRequest: 'MintRequest',
    RedeemRequest: 'RedeemRequest',
    SupplySnapshot: 'SupplySnapshot',
    ReserveAttestation: 'ReserveAttestation'
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
      modelProps: "reserveAccount" | "mintRequest" | "redeemRequest" | "supplySnapshot" | "reserveAttestation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ReserveAccount: {
        payload: Prisma.$ReserveAccountPayload<ExtArgs>
        fields: Prisma.ReserveAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReserveAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReserveAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAccountPayload>
          }
          findFirst: {
            args: Prisma.ReserveAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReserveAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAccountPayload>
          }
          findMany: {
            args: Prisma.ReserveAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAccountPayload>[]
          }
          create: {
            args: Prisma.ReserveAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAccountPayload>
          }
          createMany: {
            args: Prisma.ReserveAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReserveAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAccountPayload>[]
          }
          delete: {
            args: Prisma.ReserveAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAccountPayload>
          }
          update: {
            args: Prisma.ReserveAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAccountPayload>
          }
          deleteMany: {
            args: Prisma.ReserveAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReserveAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReserveAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAccountPayload>
          }
          aggregate: {
            args: Prisma.ReserveAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReserveAccount>
          }
          groupBy: {
            args: Prisma.ReserveAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReserveAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReserveAccountCountArgs<ExtArgs>
            result: $Utils.Optional<ReserveAccountCountAggregateOutputType> | number
          }
        }
      }
      MintRequest: {
        payload: Prisma.$MintRequestPayload<ExtArgs>
        fields: Prisma.MintRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MintRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MintRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintRequestPayload>
          }
          findFirst: {
            args: Prisma.MintRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MintRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintRequestPayload>
          }
          findMany: {
            args: Prisma.MintRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintRequestPayload>[]
          }
          create: {
            args: Prisma.MintRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintRequestPayload>
          }
          createMany: {
            args: Prisma.MintRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MintRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintRequestPayload>[]
          }
          delete: {
            args: Prisma.MintRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintRequestPayload>
          }
          update: {
            args: Prisma.MintRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintRequestPayload>
          }
          deleteMany: {
            args: Prisma.MintRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MintRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MintRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MintRequestPayload>
          }
          aggregate: {
            args: Prisma.MintRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMintRequest>
          }
          groupBy: {
            args: Prisma.MintRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<MintRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.MintRequestCountArgs<ExtArgs>
            result: $Utils.Optional<MintRequestCountAggregateOutputType> | number
          }
        }
      }
      RedeemRequest: {
        payload: Prisma.$RedeemRequestPayload<ExtArgs>
        fields: Prisma.RedeemRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RedeemRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RedeemRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemRequestPayload>
          }
          findFirst: {
            args: Prisma.RedeemRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RedeemRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemRequestPayload>
          }
          findMany: {
            args: Prisma.RedeemRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemRequestPayload>[]
          }
          create: {
            args: Prisma.RedeemRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemRequestPayload>
          }
          createMany: {
            args: Prisma.RedeemRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RedeemRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemRequestPayload>[]
          }
          delete: {
            args: Prisma.RedeemRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemRequestPayload>
          }
          update: {
            args: Prisma.RedeemRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemRequestPayload>
          }
          deleteMany: {
            args: Prisma.RedeemRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RedeemRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RedeemRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemRequestPayload>
          }
          aggregate: {
            args: Prisma.RedeemRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRedeemRequest>
          }
          groupBy: {
            args: Prisma.RedeemRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<RedeemRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.RedeemRequestCountArgs<ExtArgs>
            result: $Utils.Optional<RedeemRequestCountAggregateOutputType> | number
          }
        }
      }
      SupplySnapshot: {
        payload: Prisma.$SupplySnapshotPayload<ExtArgs>
        fields: Prisma.SupplySnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupplySnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplySnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupplySnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplySnapshotPayload>
          }
          findFirst: {
            args: Prisma.SupplySnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplySnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupplySnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplySnapshotPayload>
          }
          findMany: {
            args: Prisma.SupplySnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplySnapshotPayload>[]
          }
          create: {
            args: Prisma.SupplySnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplySnapshotPayload>
          }
          createMany: {
            args: Prisma.SupplySnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupplySnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplySnapshotPayload>[]
          }
          delete: {
            args: Prisma.SupplySnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplySnapshotPayload>
          }
          update: {
            args: Prisma.SupplySnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplySnapshotPayload>
          }
          deleteMany: {
            args: Prisma.SupplySnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupplySnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SupplySnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplySnapshotPayload>
          }
          aggregate: {
            args: Prisma.SupplySnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupplySnapshot>
          }
          groupBy: {
            args: Prisma.SupplySnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupplySnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupplySnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<SupplySnapshotCountAggregateOutputType> | number
          }
        }
      }
      ReserveAttestation: {
        payload: Prisma.$ReserveAttestationPayload<ExtArgs>
        fields: Prisma.ReserveAttestationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReserveAttestationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAttestationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReserveAttestationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAttestationPayload>
          }
          findFirst: {
            args: Prisma.ReserveAttestationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAttestationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReserveAttestationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAttestationPayload>
          }
          findMany: {
            args: Prisma.ReserveAttestationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAttestationPayload>[]
          }
          create: {
            args: Prisma.ReserveAttestationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAttestationPayload>
          }
          createMany: {
            args: Prisma.ReserveAttestationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReserveAttestationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAttestationPayload>[]
          }
          delete: {
            args: Prisma.ReserveAttestationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAttestationPayload>
          }
          update: {
            args: Prisma.ReserveAttestationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAttestationPayload>
          }
          deleteMany: {
            args: Prisma.ReserveAttestationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReserveAttestationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReserveAttestationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReserveAttestationPayload>
          }
          aggregate: {
            args: Prisma.ReserveAttestationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReserveAttestation>
          }
          groupBy: {
            args: Prisma.ReserveAttestationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReserveAttestationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReserveAttestationCountArgs<ExtArgs>
            result: $Utils.Optional<ReserveAttestationCountAggregateOutputType> | number
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
   * Count Type ReserveAccountCountOutputType
   */

  export type ReserveAccountCountOutputType = {
    mintRequests: number
  }

  export type ReserveAccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mintRequests?: boolean | ReserveAccountCountOutputTypeCountMintRequestsArgs
  }

  // Custom InputTypes
  /**
   * ReserveAccountCountOutputType without action
   */
  export type ReserveAccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAccountCountOutputType
     */
    select?: ReserveAccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReserveAccountCountOutputType without action
   */
  export type ReserveAccountCountOutputTypeCountMintRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MintRequestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ReserveAccount
   */

  export type AggregateReserveAccount = {
    _count: ReserveAccountCountAggregateOutputType | null
    _avg: ReserveAccountAvgAggregateOutputType | null
    _sum: ReserveAccountSumAggregateOutputType | null
    _min: ReserveAccountMinAggregateOutputType | null
    _max: ReserveAccountMaxAggregateOutputType | null
  }

  export type ReserveAccountAvgAggregateOutputType = {
    balanceMinor: number | null
    authorizedCeilingMinor: number | null
  }

  export type ReserveAccountSumAggregateOutputType = {
    balanceMinor: bigint | null
    authorizedCeilingMinor: bigint | null
  }

  export type ReserveAccountMinAggregateOutputType = {
    id: string | null
    custodian: string | null
    currency: string | null
    balanceMinor: bigint | null
    authorizedCeilingMinor: bigint | null
    attestationHash: string | null
    attestationUrl: string | null
    asOf: Date | null
    chain: $Enums.StablecoinChain | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReserveAccountMaxAggregateOutputType = {
    id: string | null
    custodian: string | null
    currency: string | null
    balanceMinor: bigint | null
    authorizedCeilingMinor: bigint | null
    attestationHash: string | null
    attestationUrl: string | null
    asOf: Date | null
    chain: $Enums.StablecoinChain | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReserveAccountCountAggregateOutputType = {
    id: number
    custodian: number
    currency: number
    balanceMinor: number
    authorizedCeilingMinor: number
    attestationHash: number
    attestationUrl: number
    asOf: number
    chain: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReserveAccountAvgAggregateInputType = {
    balanceMinor?: true
    authorizedCeilingMinor?: true
  }

  export type ReserveAccountSumAggregateInputType = {
    balanceMinor?: true
    authorizedCeilingMinor?: true
  }

  export type ReserveAccountMinAggregateInputType = {
    id?: true
    custodian?: true
    currency?: true
    balanceMinor?: true
    authorizedCeilingMinor?: true
    attestationHash?: true
    attestationUrl?: true
    asOf?: true
    chain?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReserveAccountMaxAggregateInputType = {
    id?: true
    custodian?: true
    currency?: true
    balanceMinor?: true
    authorizedCeilingMinor?: true
    attestationHash?: true
    attestationUrl?: true
    asOf?: true
    chain?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReserveAccountCountAggregateInputType = {
    id?: true
    custodian?: true
    currency?: true
    balanceMinor?: true
    authorizedCeilingMinor?: true
    attestationHash?: true
    attestationUrl?: true
    asOf?: true
    chain?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReserveAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReserveAccount to aggregate.
     */
    where?: ReserveAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReserveAccounts to fetch.
     */
    orderBy?: ReserveAccountOrderByWithRelationInput | ReserveAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReserveAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReserveAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReserveAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReserveAccounts
    **/
    _count?: true | ReserveAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReserveAccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReserveAccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReserveAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReserveAccountMaxAggregateInputType
  }

  export type GetReserveAccountAggregateType<T extends ReserveAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateReserveAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReserveAccount[P]>
      : GetScalarType<T[P], AggregateReserveAccount[P]>
  }




  export type ReserveAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReserveAccountWhereInput
    orderBy?: ReserveAccountOrderByWithAggregationInput | ReserveAccountOrderByWithAggregationInput[]
    by: ReserveAccountScalarFieldEnum[] | ReserveAccountScalarFieldEnum
    having?: ReserveAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReserveAccountCountAggregateInputType | true
    _avg?: ReserveAccountAvgAggregateInputType
    _sum?: ReserveAccountSumAggregateInputType
    _min?: ReserveAccountMinAggregateInputType
    _max?: ReserveAccountMaxAggregateInputType
  }

  export type ReserveAccountGroupByOutputType = {
    id: string
    custodian: string
    currency: string
    balanceMinor: bigint
    authorizedCeilingMinor: bigint
    attestationHash: string | null
    attestationUrl: string | null
    asOf: Date | null
    chain: $Enums.StablecoinChain
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: ReserveAccountCountAggregateOutputType | null
    _avg: ReserveAccountAvgAggregateOutputType | null
    _sum: ReserveAccountSumAggregateOutputType | null
    _min: ReserveAccountMinAggregateOutputType | null
    _max: ReserveAccountMaxAggregateOutputType | null
  }

  type GetReserveAccountGroupByPayload<T extends ReserveAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReserveAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReserveAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReserveAccountGroupByOutputType[P]>
            : GetScalarType<T[P], ReserveAccountGroupByOutputType[P]>
        }
      >
    >


  export type ReserveAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    custodian?: boolean
    currency?: boolean
    balanceMinor?: boolean
    authorizedCeilingMinor?: boolean
    attestationHash?: boolean
    attestationUrl?: boolean
    asOf?: boolean
    chain?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    mintRequests?: boolean | ReserveAccount$mintRequestsArgs<ExtArgs>
    _count?: boolean | ReserveAccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reserveAccount"]>

  export type ReserveAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    custodian?: boolean
    currency?: boolean
    balanceMinor?: boolean
    authorizedCeilingMinor?: boolean
    attestationHash?: boolean
    attestationUrl?: boolean
    asOf?: boolean
    chain?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["reserveAccount"]>

  export type ReserveAccountSelectScalar = {
    id?: boolean
    custodian?: boolean
    currency?: boolean
    balanceMinor?: boolean
    authorizedCeilingMinor?: boolean
    attestationHash?: boolean
    attestationUrl?: boolean
    asOf?: boolean
    chain?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReserveAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mintRequests?: boolean | ReserveAccount$mintRequestsArgs<ExtArgs>
    _count?: boolean | ReserveAccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReserveAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ReserveAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReserveAccount"
    objects: {
      mintRequests: Prisma.$MintRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      custodian: string
      currency: string
      balanceMinor: bigint
      authorizedCeilingMinor: bigint
      attestationHash: string | null
      attestationUrl: string | null
      asOf: Date | null
      chain: $Enums.StablecoinChain
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["reserveAccount"]>
    composites: {}
  }

  type ReserveAccountGetPayload<S extends boolean | null | undefined | ReserveAccountDefaultArgs> = $Result.GetResult<Prisma.$ReserveAccountPayload, S>

  type ReserveAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReserveAccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReserveAccountCountAggregateInputType | true
    }

  export interface ReserveAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReserveAccount'], meta: { name: 'ReserveAccount' } }
    /**
     * Find zero or one ReserveAccount that matches the filter.
     * @param {ReserveAccountFindUniqueArgs} args - Arguments to find a ReserveAccount
     * @example
     * // Get one ReserveAccount
     * const reserveAccount = await prisma.reserveAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReserveAccountFindUniqueArgs>(args: SelectSubset<T, ReserveAccountFindUniqueArgs<ExtArgs>>): Prisma__ReserveAccountClient<$Result.GetResult<Prisma.$ReserveAccountPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ReserveAccount that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReserveAccountFindUniqueOrThrowArgs} args - Arguments to find a ReserveAccount
     * @example
     * // Get one ReserveAccount
     * const reserveAccount = await prisma.reserveAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReserveAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, ReserveAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReserveAccountClient<$Result.GetResult<Prisma.$ReserveAccountPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ReserveAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReserveAccountFindFirstArgs} args - Arguments to find a ReserveAccount
     * @example
     * // Get one ReserveAccount
     * const reserveAccount = await prisma.reserveAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReserveAccountFindFirstArgs>(args?: SelectSubset<T, ReserveAccountFindFirstArgs<ExtArgs>>): Prisma__ReserveAccountClient<$Result.GetResult<Prisma.$ReserveAccountPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ReserveAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReserveAccountFindFirstOrThrowArgs} args - Arguments to find a ReserveAccount
     * @example
     * // Get one ReserveAccount
     * const reserveAccount = await prisma.reserveAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReserveAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, ReserveAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReserveAccountClient<$Result.GetResult<Prisma.$ReserveAccountPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ReserveAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReserveAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReserveAccounts
     * const reserveAccounts = await prisma.reserveAccount.findMany()
     * 
     * // Get first 10 ReserveAccounts
     * const reserveAccounts = await prisma.reserveAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reserveAccountWithIdOnly = await prisma.reserveAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReserveAccountFindManyArgs>(args?: SelectSubset<T, ReserveAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReserveAccountPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ReserveAccount.
     * @param {ReserveAccountCreateArgs} args - Arguments to create a ReserveAccount.
     * @example
     * // Create one ReserveAccount
     * const ReserveAccount = await prisma.reserveAccount.create({
     *   data: {
     *     // ... data to create a ReserveAccount
     *   }
     * })
     * 
     */
    create<T extends ReserveAccountCreateArgs>(args: SelectSubset<T, ReserveAccountCreateArgs<ExtArgs>>): Prisma__ReserveAccountClient<$Result.GetResult<Prisma.$ReserveAccountPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ReserveAccounts.
     * @param {ReserveAccountCreateManyArgs} args - Arguments to create many ReserveAccounts.
     * @example
     * // Create many ReserveAccounts
     * const reserveAccount = await prisma.reserveAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReserveAccountCreateManyArgs>(args?: SelectSubset<T, ReserveAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReserveAccounts and returns the data saved in the database.
     * @param {ReserveAccountCreateManyAndReturnArgs} args - Arguments to create many ReserveAccounts.
     * @example
     * // Create many ReserveAccounts
     * const reserveAccount = await prisma.reserveAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReserveAccounts and only return the `id`
     * const reserveAccountWithIdOnly = await prisma.reserveAccount.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReserveAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, ReserveAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReserveAccountPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ReserveAccount.
     * @param {ReserveAccountDeleteArgs} args - Arguments to delete one ReserveAccount.
     * @example
     * // Delete one ReserveAccount
     * const ReserveAccount = await prisma.reserveAccount.delete({
     *   where: {
     *     // ... filter to delete one ReserveAccount
     *   }
     * })
     * 
     */
    delete<T extends ReserveAccountDeleteArgs>(args: SelectSubset<T, ReserveAccountDeleteArgs<ExtArgs>>): Prisma__ReserveAccountClient<$Result.GetResult<Prisma.$ReserveAccountPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ReserveAccount.
     * @param {ReserveAccountUpdateArgs} args - Arguments to update one ReserveAccount.
     * @example
     * // Update one ReserveAccount
     * const reserveAccount = await prisma.reserveAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReserveAccountUpdateArgs>(args: SelectSubset<T, ReserveAccountUpdateArgs<ExtArgs>>): Prisma__ReserveAccountClient<$Result.GetResult<Prisma.$ReserveAccountPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ReserveAccounts.
     * @param {ReserveAccountDeleteManyArgs} args - Arguments to filter ReserveAccounts to delete.
     * @example
     * // Delete a few ReserveAccounts
     * const { count } = await prisma.reserveAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReserveAccountDeleteManyArgs>(args?: SelectSubset<T, ReserveAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReserveAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReserveAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReserveAccounts
     * const reserveAccount = await prisma.reserveAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReserveAccountUpdateManyArgs>(args: SelectSubset<T, ReserveAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReserveAccount.
     * @param {ReserveAccountUpsertArgs} args - Arguments to update or create a ReserveAccount.
     * @example
     * // Update or create a ReserveAccount
     * const reserveAccount = await prisma.reserveAccount.upsert({
     *   create: {
     *     // ... data to create a ReserveAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReserveAccount we want to update
     *   }
     * })
     */
    upsert<T extends ReserveAccountUpsertArgs>(args: SelectSubset<T, ReserveAccountUpsertArgs<ExtArgs>>): Prisma__ReserveAccountClient<$Result.GetResult<Prisma.$ReserveAccountPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ReserveAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReserveAccountCountArgs} args - Arguments to filter ReserveAccounts to count.
     * @example
     * // Count the number of ReserveAccounts
     * const count = await prisma.reserveAccount.count({
     *   where: {
     *     // ... the filter for the ReserveAccounts we want to count
     *   }
     * })
    **/
    count<T extends ReserveAccountCountArgs>(
      args?: Subset<T, ReserveAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReserveAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReserveAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReserveAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReserveAccountAggregateArgs>(args: Subset<T, ReserveAccountAggregateArgs>): Prisma.PrismaPromise<GetReserveAccountAggregateType<T>>

    /**
     * Group by ReserveAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReserveAccountGroupByArgs} args - Group by arguments.
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
      T extends ReserveAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReserveAccountGroupByArgs['orderBy'] }
        : { orderBy?: ReserveAccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReserveAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReserveAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReserveAccount model
   */
  readonly fields: ReserveAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReserveAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReserveAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mintRequests<T extends ReserveAccount$mintRequestsArgs<ExtArgs> = {}>(args?: Subset<T, ReserveAccount$mintRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MintRequestPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the ReserveAccount model
   */ 
  interface ReserveAccountFieldRefs {
    readonly id: FieldRef<"ReserveAccount", 'String'>
    readonly custodian: FieldRef<"ReserveAccount", 'String'>
    readonly currency: FieldRef<"ReserveAccount", 'String'>
    readonly balanceMinor: FieldRef<"ReserveAccount", 'BigInt'>
    readonly authorizedCeilingMinor: FieldRef<"ReserveAccount", 'BigInt'>
    readonly attestationHash: FieldRef<"ReserveAccount", 'String'>
    readonly attestationUrl: FieldRef<"ReserveAccount", 'String'>
    readonly asOf: FieldRef<"ReserveAccount", 'DateTime'>
    readonly chain: FieldRef<"ReserveAccount", 'StablecoinChain'>
    readonly metadata: FieldRef<"ReserveAccount", 'Json'>
    readonly createdAt: FieldRef<"ReserveAccount", 'DateTime'>
    readonly updatedAt: FieldRef<"ReserveAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReserveAccount findUnique
   */
  export type ReserveAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAccount
     */
    select?: ReserveAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReserveAccountInclude<ExtArgs> | null
    /**
     * Filter, which ReserveAccount to fetch.
     */
    where: ReserveAccountWhereUniqueInput
  }

  /**
   * ReserveAccount findUniqueOrThrow
   */
  export type ReserveAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAccount
     */
    select?: ReserveAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReserveAccountInclude<ExtArgs> | null
    /**
     * Filter, which ReserveAccount to fetch.
     */
    where: ReserveAccountWhereUniqueInput
  }

  /**
   * ReserveAccount findFirst
   */
  export type ReserveAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAccount
     */
    select?: ReserveAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReserveAccountInclude<ExtArgs> | null
    /**
     * Filter, which ReserveAccount to fetch.
     */
    where?: ReserveAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReserveAccounts to fetch.
     */
    orderBy?: ReserveAccountOrderByWithRelationInput | ReserveAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReserveAccounts.
     */
    cursor?: ReserveAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReserveAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReserveAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReserveAccounts.
     */
    distinct?: ReserveAccountScalarFieldEnum | ReserveAccountScalarFieldEnum[]
  }

  /**
   * ReserveAccount findFirstOrThrow
   */
  export type ReserveAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAccount
     */
    select?: ReserveAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReserveAccountInclude<ExtArgs> | null
    /**
     * Filter, which ReserveAccount to fetch.
     */
    where?: ReserveAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReserveAccounts to fetch.
     */
    orderBy?: ReserveAccountOrderByWithRelationInput | ReserveAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReserveAccounts.
     */
    cursor?: ReserveAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReserveAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReserveAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReserveAccounts.
     */
    distinct?: ReserveAccountScalarFieldEnum | ReserveAccountScalarFieldEnum[]
  }

  /**
   * ReserveAccount findMany
   */
  export type ReserveAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAccount
     */
    select?: ReserveAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReserveAccountInclude<ExtArgs> | null
    /**
     * Filter, which ReserveAccounts to fetch.
     */
    where?: ReserveAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReserveAccounts to fetch.
     */
    orderBy?: ReserveAccountOrderByWithRelationInput | ReserveAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReserveAccounts.
     */
    cursor?: ReserveAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReserveAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReserveAccounts.
     */
    skip?: number
    distinct?: ReserveAccountScalarFieldEnum | ReserveAccountScalarFieldEnum[]
  }

  /**
   * ReserveAccount create
   */
  export type ReserveAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAccount
     */
    select?: ReserveAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReserveAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a ReserveAccount.
     */
    data: XOR<ReserveAccountCreateInput, ReserveAccountUncheckedCreateInput>
  }

  /**
   * ReserveAccount createMany
   */
  export type ReserveAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReserveAccounts.
     */
    data: ReserveAccountCreateManyInput | ReserveAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReserveAccount createManyAndReturn
   */
  export type ReserveAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAccount
     */
    select?: ReserveAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ReserveAccounts.
     */
    data: ReserveAccountCreateManyInput | ReserveAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReserveAccount update
   */
  export type ReserveAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAccount
     */
    select?: ReserveAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReserveAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a ReserveAccount.
     */
    data: XOR<ReserveAccountUpdateInput, ReserveAccountUncheckedUpdateInput>
    /**
     * Choose, which ReserveAccount to update.
     */
    where: ReserveAccountWhereUniqueInput
  }

  /**
   * ReserveAccount updateMany
   */
  export type ReserveAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReserveAccounts.
     */
    data: XOR<ReserveAccountUpdateManyMutationInput, ReserveAccountUncheckedUpdateManyInput>
    /**
     * Filter which ReserveAccounts to update
     */
    where?: ReserveAccountWhereInput
  }

  /**
   * ReserveAccount upsert
   */
  export type ReserveAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAccount
     */
    select?: ReserveAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReserveAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the ReserveAccount to update in case it exists.
     */
    where: ReserveAccountWhereUniqueInput
    /**
     * In case the ReserveAccount found by the `where` argument doesn't exist, create a new ReserveAccount with this data.
     */
    create: XOR<ReserveAccountCreateInput, ReserveAccountUncheckedCreateInput>
    /**
     * In case the ReserveAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReserveAccountUpdateInput, ReserveAccountUncheckedUpdateInput>
  }

  /**
   * ReserveAccount delete
   */
  export type ReserveAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAccount
     */
    select?: ReserveAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReserveAccountInclude<ExtArgs> | null
    /**
     * Filter which ReserveAccount to delete.
     */
    where: ReserveAccountWhereUniqueInput
  }

  /**
   * ReserveAccount deleteMany
   */
  export type ReserveAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReserveAccounts to delete
     */
    where?: ReserveAccountWhereInput
  }

  /**
   * ReserveAccount.mintRequests
   */
  export type ReserveAccount$mintRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintRequest
     */
    select?: MintRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintRequestInclude<ExtArgs> | null
    where?: MintRequestWhereInput
    orderBy?: MintRequestOrderByWithRelationInput | MintRequestOrderByWithRelationInput[]
    cursor?: MintRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MintRequestScalarFieldEnum | MintRequestScalarFieldEnum[]
  }

  /**
   * ReserveAccount without action
   */
  export type ReserveAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAccount
     */
    select?: ReserveAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReserveAccountInclude<ExtArgs> | null
  }


  /**
   * Model MintRequest
   */

  export type AggregateMintRequest = {
    _count: MintRequestCountAggregateOutputType | null
    _avg: MintRequestAvgAggregateOutputType | null
    _sum: MintRequestSumAggregateOutputType | null
    _min: MintRequestMinAggregateOutputType | null
    _max: MintRequestMaxAggregateOutputType | null
  }

  export type MintRequestAvgAggregateOutputType = {
    amountMinor: number | null
  }

  export type MintRequestSumAggregateOutputType = {
    amountMinor: bigint | null
  }

  export type MintRequestMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    idempotencyKey: string | null
    status: $Enums.MintRequestStatus | null
    amountMinor: bigint | null
    currency: string | null
    chain: $Enums.StablecoinChain | null
    reserveAccountId: string | null
    destinationWalletId: string | null
    destinationAddress: string | null
    executionTransactionId: string | null
    txHash: string | null
    ledgerEntryId: string | null
    failureReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MintRequestMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    idempotencyKey: string | null
    status: $Enums.MintRequestStatus | null
    amountMinor: bigint | null
    currency: string | null
    chain: $Enums.StablecoinChain | null
    reserveAccountId: string | null
    destinationWalletId: string | null
    destinationAddress: string | null
    executionTransactionId: string | null
    txHash: string | null
    ledgerEntryId: string | null
    failureReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MintRequestCountAggregateOutputType = {
    id: number
    orgId: number
    idempotencyKey: number
    status: number
    amountMinor: number
    currency: number
    chain: number
    reserveAccountId: number
    destinationWalletId: number
    destinationAddress: number
    executionTransactionId: number
    txHash: number
    ledgerEntryId: number
    failureReason: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MintRequestAvgAggregateInputType = {
    amountMinor?: true
  }

  export type MintRequestSumAggregateInputType = {
    amountMinor?: true
  }

  export type MintRequestMinAggregateInputType = {
    id?: true
    orgId?: true
    idempotencyKey?: true
    status?: true
    amountMinor?: true
    currency?: true
    chain?: true
    reserveAccountId?: true
    destinationWalletId?: true
    destinationAddress?: true
    executionTransactionId?: true
    txHash?: true
    ledgerEntryId?: true
    failureReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MintRequestMaxAggregateInputType = {
    id?: true
    orgId?: true
    idempotencyKey?: true
    status?: true
    amountMinor?: true
    currency?: true
    chain?: true
    reserveAccountId?: true
    destinationWalletId?: true
    destinationAddress?: true
    executionTransactionId?: true
    txHash?: true
    ledgerEntryId?: true
    failureReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MintRequestCountAggregateInputType = {
    id?: true
    orgId?: true
    idempotencyKey?: true
    status?: true
    amountMinor?: true
    currency?: true
    chain?: true
    reserveAccountId?: true
    destinationWalletId?: true
    destinationAddress?: true
    executionTransactionId?: true
    txHash?: true
    ledgerEntryId?: true
    failureReason?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MintRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MintRequest to aggregate.
     */
    where?: MintRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MintRequests to fetch.
     */
    orderBy?: MintRequestOrderByWithRelationInput | MintRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MintRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MintRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MintRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MintRequests
    **/
    _count?: true | MintRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MintRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MintRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MintRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MintRequestMaxAggregateInputType
  }

  export type GetMintRequestAggregateType<T extends MintRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateMintRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMintRequest[P]>
      : GetScalarType<T[P], AggregateMintRequest[P]>
  }




  export type MintRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MintRequestWhereInput
    orderBy?: MintRequestOrderByWithAggregationInput | MintRequestOrderByWithAggregationInput[]
    by: MintRequestScalarFieldEnum[] | MintRequestScalarFieldEnum
    having?: MintRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MintRequestCountAggregateInputType | true
    _avg?: MintRequestAvgAggregateInputType
    _sum?: MintRequestSumAggregateInputType
    _min?: MintRequestMinAggregateInputType
    _max?: MintRequestMaxAggregateInputType
  }

  export type MintRequestGroupByOutputType = {
    id: string
    orgId: string
    idempotencyKey: string
    status: $Enums.MintRequestStatus
    amountMinor: bigint
    currency: string
    chain: $Enums.StablecoinChain
    reserveAccountId: string
    destinationWalletId: string | null
    destinationAddress: string | null
    executionTransactionId: string | null
    txHash: string | null
    ledgerEntryId: string | null
    failureReason: string | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: MintRequestCountAggregateOutputType | null
    _avg: MintRequestAvgAggregateOutputType | null
    _sum: MintRequestSumAggregateOutputType | null
    _min: MintRequestMinAggregateOutputType | null
    _max: MintRequestMaxAggregateOutputType | null
  }

  type GetMintRequestGroupByPayload<T extends MintRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MintRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MintRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MintRequestGroupByOutputType[P]>
            : GetScalarType<T[P], MintRequestGroupByOutputType[P]>
        }
      >
    >


  export type MintRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    amountMinor?: boolean
    currency?: boolean
    chain?: boolean
    reserveAccountId?: boolean
    destinationWalletId?: boolean
    destinationAddress?: boolean
    executionTransactionId?: boolean
    txHash?: boolean
    ledgerEntryId?: boolean
    failureReason?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reserveAccount?: boolean | ReserveAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mintRequest"]>

  export type MintRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    amountMinor?: boolean
    currency?: boolean
    chain?: boolean
    reserveAccountId?: boolean
    destinationWalletId?: boolean
    destinationAddress?: boolean
    executionTransactionId?: boolean
    txHash?: boolean
    ledgerEntryId?: boolean
    failureReason?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    reserveAccount?: boolean | ReserveAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mintRequest"]>

  export type MintRequestSelectScalar = {
    id?: boolean
    orgId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    amountMinor?: boolean
    currency?: boolean
    chain?: boolean
    reserveAccountId?: boolean
    destinationWalletId?: boolean
    destinationAddress?: boolean
    executionTransactionId?: boolean
    txHash?: boolean
    ledgerEntryId?: boolean
    failureReason?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MintRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reserveAccount?: boolean | ReserveAccountDefaultArgs<ExtArgs>
  }
  export type MintRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reserveAccount?: boolean | ReserveAccountDefaultArgs<ExtArgs>
  }

  export type $MintRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MintRequest"
    objects: {
      reserveAccount: Prisma.$ReserveAccountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      idempotencyKey: string
      status: $Enums.MintRequestStatus
      amountMinor: bigint
      currency: string
      chain: $Enums.StablecoinChain
      reserveAccountId: string
      destinationWalletId: string | null
      destinationAddress: string | null
      executionTransactionId: string | null
      txHash: string | null
      ledgerEntryId: string | null
      failureReason: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mintRequest"]>
    composites: {}
  }

  type MintRequestGetPayload<S extends boolean | null | undefined | MintRequestDefaultArgs> = $Result.GetResult<Prisma.$MintRequestPayload, S>

  type MintRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MintRequestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MintRequestCountAggregateInputType | true
    }

  export interface MintRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MintRequest'], meta: { name: 'MintRequest' } }
    /**
     * Find zero or one MintRequest that matches the filter.
     * @param {MintRequestFindUniqueArgs} args - Arguments to find a MintRequest
     * @example
     * // Get one MintRequest
     * const mintRequest = await prisma.mintRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MintRequestFindUniqueArgs>(args: SelectSubset<T, MintRequestFindUniqueArgs<ExtArgs>>): Prisma__MintRequestClient<$Result.GetResult<Prisma.$MintRequestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MintRequest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MintRequestFindUniqueOrThrowArgs} args - Arguments to find a MintRequest
     * @example
     * // Get one MintRequest
     * const mintRequest = await prisma.mintRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MintRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, MintRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MintRequestClient<$Result.GetResult<Prisma.$MintRequestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MintRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MintRequestFindFirstArgs} args - Arguments to find a MintRequest
     * @example
     * // Get one MintRequest
     * const mintRequest = await prisma.mintRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MintRequestFindFirstArgs>(args?: SelectSubset<T, MintRequestFindFirstArgs<ExtArgs>>): Prisma__MintRequestClient<$Result.GetResult<Prisma.$MintRequestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MintRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MintRequestFindFirstOrThrowArgs} args - Arguments to find a MintRequest
     * @example
     * // Get one MintRequest
     * const mintRequest = await prisma.mintRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MintRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, MintRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__MintRequestClient<$Result.GetResult<Prisma.$MintRequestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MintRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MintRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MintRequests
     * const mintRequests = await prisma.mintRequest.findMany()
     * 
     * // Get first 10 MintRequests
     * const mintRequests = await prisma.mintRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mintRequestWithIdOnly = await prisma.mintRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MintRequestFindManyArgs>(args?: SelectSubset<T, MintRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MintRequestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MintRequest.
     * @param {MintRequestCreateArgs} args - Arguments to create a MintRequest.
     * @example
     * // Create one MintRequest
     * const MintRequest = await prisma.mintRequest.create({
     *   data: {
     *     // ... data to create a MintRequest
     *   }
     * })
     * 
     */
    create<T extends MintRequestCreateArgs>(args: SelectSubset<T, MintRequestCreateArgs<ExtArgs>>): Prisma__MintRequestClient<$Result.GetResult<Prisma.$MintRequestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MintRequests.
     * @param {MintRequestCreateManyArgs} args - Arguments to create many MintRequests.
     * @example
     * // Create many MintRequests
     * const mintRequest = await prisma.mintRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MintRequestCreateManyArgs>(args?: SelectSubset<T, MintRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MintRequests and returns the data saved in the database.
     * @param {MintRequestCreateManyAndReturnArgs} args - Arguments to create many MintRequests.
     * @example
     * // Create many MintRequests
     * const mintRequest = await prisma.mintRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MintRequests and only return the `id`
     * const mintRequestWithIdOnly = await prisma.mintRequest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MintRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, MintRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MintRequestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MintRequest.
     * @param {MintRequestDeleteArgs} args - Arguments to delete one MintRequest.
     * @example
     * // Delete one MintRequest
     * const MintRequest = await prisma.mintRequest.delete({
     *   where: {
     *     // ... filter to delete one MintRequest
     *   }
     * })
     * 
     */
    delete<T extends MintRequestDeleteArgs>(args: SelectSubset<T, MintRequestDeleteArgs<ExtArgs>>): Prisma__MintRequestClient<$Result.GetResult<Prisma.$MintRequestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MintRequest.
     * @param {MintRequestUpdateArgs} args - Arguments to update one MintRequest.
     * @example
     * // Update one MintRequest
     * const mintRequest = await prisma.mintRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MintRequestUpdateArgs>(args: SelectSubset<T, MintRequestUpdateArgs<ExtArgs>>): Prisma__MintRequestClient<$Result.GetResult<Prisma.$MintRequestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MintRequests.
     * @param {MintRequestDeleteManyArgs} args - Arguments to filter MintRequests to delete.
     * @example
     * // Delete a few MintRequests
     * const { count } = await prisma.mintRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MintRequestDeleteManyArgs>(args?: SelectSubset<T, MintRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MintRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MintRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MintRequests
     * const mintRequest = await prisma.mintRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MintRequestUpdateManyArgs>(args: SelectSubset<T, MintRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MintRequest.
     * @param {MintRequestUpsertArgs} args - Arguments to update or create a MintRequest.
     * @example
     * // Update or create a MintRequest
     * const mintRequest = await prisma.mintRequest.upsert({
     *   create: {
     *     // ... data to create a MintRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MintRequest we want to update
     *   }
     * })
     */
    upsert<T extends MintRequestUpsertArgs>(args: SelectSubset<T, MintRequestUpsertArgs<ExtArgs>>): Prisma__MintRequestClient<$Result.GetResult<Prisma.$MintRequestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MintRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MintRequestCountArgs} args - Arguments to filter MintRequests to count.
     * @example
     * // Count the number of MintRequests
     * const count = await prisma.mintRequest.count({
     *   where: {
     *     // ... the filter for the MintRequests we want to count
     *   }
     * })
    **/
    count<T extends MintRequestCountArgs>(
      args?: Subset<T, MintRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MintRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MintRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MintRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MintRequestAggregateArgs>(args: Subset<T, MintRequestAggregateArgs>): Prisma.PrismaPromise<GetMintRequestAggregateType<T>>

    /**
     * Group by MintRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MintRequestGroupByArgs} args - Group by arguments.
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
      T extends MintRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MintRequestGroupByArgs['orderBy'] }
        : { orderBy?: MintRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MintRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMintRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MintRequest model
   */
  readonly fields: MintRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MintRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MintRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reserveAccount<T extends ReserveAccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReserveAccountDefaultArgs<ExtArgs>>): Prisma__ReserveAccountClient<$Result.GetResult<Prisma.$ReserveAccountPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the MintRequest model
   */ 
  interface MintRequestFieldRefs {
    readonly id: FieldRef<"MintRequest", 'String'>
    readonly orgId: FieldRef<"MintRequest", 'String'>
    readonly idempotencyKey: FieldRef<"MintRequest", 'String'>
    readonly status: FieldRef<"MintRequest", 'MintRequestStatus'>
    readonly amountMinor: FieldRef<"MintRequest", 'BigInt'>
    readonly currency: FieldRef<"MintRequest", 'String'>
    readonly chain: FieldRef<"MintRequest", 'StablecoinChain'>
    readonly reserveAccountId: FieldRef<"MintRequest", 'String'>
    readonly destinationWalletId: FieldRef<"MintRequest", 'String'>
    readonly destinationAddress: FieldRef<"MintRequest", 'String'>
    readonly executionTransactionId: FieldRef<"MintRequest", 'String'>
    readonly txHash: FieldRef<"MintRequest", 'String'>
    readonly ledgerEntryId: FieldRef<"MintRequest", 'String'>
    readonly failureReason: FieldRef<"MintRequest", 'String'>
    readonly metadata: FieldRef<"MintRequest", 'Json'>
    readonly createdAt: FieldRef<"MintRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"MintRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MintRequest findUnique
   */
  export type MintRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintRequest
     */
    select?: MintRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintRequestInclude<ExtArgs> | null
    /**
     * Filter, which MintRequest to fetch.
     */
    where: MintRequestWhereUniqueInput
  }

  /**
   * MintRequest findUniqueOrThrow
   */
  export type MintRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintRequest
     */
    select?: MintRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintRequestInclude<ExtArgs> | null
    /**
     * Filter, which MintRequest to fetch.
     */
    where: MintRequestWhereUniqueInput
  }

  /**
   * MintRequest findFirst
   */
  export type MintRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintRequest
     */
    select?: MintRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintRequestInclude<ExtArgs> | null
    /**
     * Filter, which MintRequest to fetch.
     */
    where?: MintRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MintRequests to fetch.
     */
    orderBy?: MintRequestOrderByWithRelationInput | MintRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MintRequests.
     */
    cursor?: MintRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MintRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MintRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MintRequests.
     */
    distinct?: MintRequestScalarFieldEnum | MintRequestScalarFieldEnum[]
  }

  /**
   * MintRequest findFirstOrThrow
   */
  export type MintRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintRequest
     */
    select?: MintRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintRequestInclude<ExtArgs> | null
    /**
     * Filter, which MintRequest to fetch.
     */
    where?: MintRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MintRequests to fetch.
     */
    orderBy?: MintRequestOrderByWithRelationInput | MintRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MintRequests.
     */
    cursor?: MintRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MintRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MintRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MintRequests.
     */
    distinct?: MintRequestScalarFieldEnum | MintRequestScalarFieldEnum[]
  }

  /**
   * MintRequest findMany
   */
  export type MintRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintRequest
     */
    select?: MintRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintRequestInclude<ExtArgs> | null
    /**
     * Filter, which MintRequests to fetch.
     */
    where?: MintRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MintRequests to fetch.
     */
    orderBy?: MintRequestOrderByWithRelationInput | MintRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MintRequests.
     */
    cursor?: MintRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MintRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MintRequests.
     */
    skip?: number
    distinct?: MintRequestScalarFieldEnum | MintRequestScalarFieldEnum[]
  }

  /**
   * MintRequest create
   */
  export type MintRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintRequest
     */
    select?: MintRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a MintRequest.
     */
    data: XOR<MintRequestCreateInput, MintRequestUncheckedCreateInput>
  }

  /**
   * MintRequest createMany
   */
  export type MintRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MintRequests.
     */
    data: MintRequestCreateManyInput | MintRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MintRequest createManyAndReturn
   */
  export type MintRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintRequest
     */
    select?: MintRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MintRequests.
     */
    data: MintRequestCreateManyInput | MintRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MintRequest update
   */
  export type MintRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintRequest
     */
    select?: MintRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a MintRequest.
     */
    data: XOR<MintRequestUpdateInput, MintRequestUncheckedUpdateInput>
    /**
     * Choose, which MintRequest to update.
     */
    where: MintRequestWhereUniqueInput
  }

  /**
   * MintRequest updateMany
   */
  export type MintRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MintRequests.
     */
    data: XOR<MintRequestUpdateManyMutationInput, MintRequestUncheckedUpdateManyInput>
    /**
     * Filter which MintRequests to update
     */
    where?: MintRequestWhereInput
  }

  /**
   * MintRequest upsert
   */
  export type MintRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintRequest
     */
    select?: MintRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the MintRequest to update in case it exists.
     */
    where: MintRequestWhereUniqueInput
    /**
     * In case the MintRequest found by the `where` argument doesn't exist, create a new MintRequest with this data.
     */
    create: XOR<MintRequestCreateInput, MintRequestUncheckedCreateInput>
    /**
     * In case the MintRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MintRequestUpdateInput, MintRequestUncheckedUpdateInput>
  }

  /**
   * MintRequest delete
   */
  export type MintRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintRequest
     */
    select?: MintRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintRequestInclude<ExtArgs> | null
    /**
     * Filter which MintRequest to delete.
     */
    where: MintRequestWhereUniqueInput
  }

  /**
   * MintRequest deleteMany
   */
  export type MintRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MintRequests to delete
     */
    where?: MintRequestWhereInput
  }

  /**
   * MintRequest without action
   */
  export type MintRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MintRequest
     */
    select?: MintRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MintRequestInclude<ExtArgs> | null
  }


  /**
   * Model RedeemRequest
   */

  export type AggregateRedeemRequest = {
    _count: RedeemRequestCountAggregateOutputType | null
    _avg: RedeemRequestAvgAggregateOutputType | null
    _sum: RedeemRequestSumAggregateOutputType | null
    _min: RedeemRequestMinAggregateOutputType | null
    _max: RedeemRequestMaxAggregateOutputType | null
  }

  export type RedeemRequestAvgAggregateOutputType = {
    amountMinor: number | null
  }

  export type RedeemRequestSumAggregateOutputType = {
    amountMinor: bigint | null
  }

  export type RedeemRequestMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    idempotencyKey: string | null
    status: $Enums.RedeemRequestStatus | null
    amountMinor: bigint | null
    currency: string | null
    chain: $Enums.StablecoinChain | null
    sourceWalletId: string | null
    payoutRail: string | null
    executionTransactionId: string | null
    txHash: string | null
    ledgerEntryId: string | null
    failureReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RedeemRequestMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    idempotencyKey: string | null
    status: $Enums.RedeemRequestStatus | null
    amountMinor: bigint | null
    currency: string | null
    chain: $Enums.StablecoinChain | null
    sourceWalletId: string | null
    payoutRail: string | null
    executionTransactionId: string | null
    txHash: string | null
    ledgerEntryId: string | null
    failureReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RedeemRequestCountAggregateOutputType = {
    id: number
    orgId: number
    idempotencyKey: number
    status: number
    amountMinor: number
    currency: number
    chain: number
    sourceWalletId: number
    payoutRail: number
    executionTransactionId: number
    txHash: number
    ledgerEntryId: number
    failureReason: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RedeemRequestAvgAggregateInputType = {
    amountMinor?: true
  }

  export type RedeemRequestSumAggregateInputType = {
    amountMinor?: true
  }

  export type RedeemRequestMinAggregateInputType = {
    id?: true
    orgId?: true
    idempotencyKey?: true
    status?: true
    amountMinor?: true
    currency?: true
    chain?: true
    sourceWalletId?: true
    payoutRail?: true
    executionTransactionId?: true
    txHash?: true
    ledgerEntryId?: true
    failureReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RedeemRequestMaxAggregateInputType = {
    id?: true
    orgId?: true
    idempotencyKey?: true
    status?: true
    amountMinor?: true
    currency?: true
    chain?: true
    sourceWalletId?: true
    payoutRail?: true
    executionTransactionId?: true
    txHash?: true
    ledgerEntryId?: true
    failureReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RedeemRequestCountAggregateInputType = {
    id?: true
    orgId?: true
    idempotencyKey?: true
    status?: true
    amountMinor?: true
    currency?: true
    chain?: true
    sourceWalletId?: true
    payoutRail?: true
    executionTransactionId?: true
    txHash?: true
    ledgerEntryId?: true
    failureReason?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RedeemRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RedeemRequest to aggregate.
     */
    where?: RedeemRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RedeemRequests to fetch.
     */
    orderBy?: RedeemRequestOrderByWithRelationInput | RedeemRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RedeemRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RedeemRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RedeemRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RedeemRequests
    **/
    _count?: true | RedeemRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RedeemRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RedeemRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RedeemRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RedeemRequestMaxAggregateInputType
  }

  export type GetRedeemRequestAggregateType<T extends RedeemRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateRedeemRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRedeemRequest[P]>
      : GetScalarType<T[P], AggregateRedeemRequest[P]>
  }




  export type RedeemRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RedeemRequestWhereInput
    orderBy?: RedeemRequestOrderByWithAggregationInput | RedeemRequestOrderByWithAggregationInput[]
    by: RedeemRequestScalarFieldEnum[] | RedeemRequestScalarFieldEnum
    having?: RedeemRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RedeemRequestCountAggregateInputType | true
    _avg?: RedeemRequestAvgAggregateInputType
    _sum?: RedeemRequestSumAggregateInputType
    _min?: RedeemRequestMinAggregateInputType
    _max?: RedeemRequestMaxAggregateInputType
  }

  export type RedeemRequestGroupByOutputType = {
    id: string
    orgId: string
    idempotencyKey: string
    status: $Enums.RedeemRequestStatus
    amountMinor: bigint
    currency: string
    chain: $Enums.StablecoinChain
    sourceWalletId: string
    payoutRail: string
    executionTransactionId: string | null
    txHash: string | null
    ledgerEntryId: string | null
    failureReason: string | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: RedeemRequestCountAggregateOutputType | null
    _avg: RedeemRequestAvgAggregateOutputType | null
    _sum: RedeemRequestSumAggregateOutputType | null
    _min: RedeemRequestMinAggregateOutputType | null
    _max: RedeemRequestMaxAggregateOutputType | null
  }

  type GetRedeemRequestGroupByPayload<T extends RedeemRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RedeemRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RedeemRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RedeemRequestGroupByOutputType[P]>
            : GetScalarType<T[P], RedeemRequestGroupByOutputType[P]>
        }
      >
    >


  export type RedeemRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    amountMinor?: boolean
    currency?: boolean
    chain?: boolean
    sourceWalletId?: boolean
    payoutRail?: boolean
    executionTransactionId?: boolean
    txHash?: boolean
    ledgerEntryId?: boolean
    failureReason?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["redeemRequest"]>

  export type RedeemRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    amountMinor?: boolean
    currency?: boolean
    chain?: boolean
    sourceWalletId?: boolean
    payoutRail?: boolean
    executionTransactionId?: boolean
    txHash?: boolean
    ledgerEntryId?: boolean
    failureReason?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["redeemRequest"]>

  export type RedeemRequestSelectScalar = {
    id?: boolean
    orgId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    amountMinor?: boolean
    currency?: boolean
    chain?: boolean
    sourceWalletId?: boolean
    payoutRail?: boolean
    executionTransactionId?: boolean
    txHash?: boolean
    ledgerEntryId?: boolean
    failureReason?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $RedeemRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RedeemRequest"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      idempotencyKey: string
      status: $Enums.RedeemRequestStatus
      amountMinor: bigint
      currency: string
      chain: $Enums.StablecoinChain
      sourceWalletId: string
      payoutRail: string
      executionTransactionId: string | null
      txHash: string | null
      ledgerEntryId: string | null
      failureReason: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["redeemRequest"]>
    composites: {}
  }

  type RedeemRequestGetPayload<S extends boolean | null | undefined | RedeemRequestDefaultArgs> = $Result.GetResult<Prisma.$RedeemRequestPayload, S>

  type RedeemRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RedeemRequestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RedeemRequestCountAggregateInputType | true
    }

  export interface RedeemRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RedeemRequest'], meta: { name: 'RedeemRequest' } }
    /**
     * Find zero or one RedeemRequest that matches the filter.
     * @param {RedeemRequestFindUniqueArgs} args - Arguments to find a RedeemRequest
     * @example
     * // Get one RedeemRequest
     * const redeemRequest = await prisma.redeemRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RedeemRequestFindUniqueArgs>(args: SelectSubset<T, RedeemRequestFindUniqueArgs<ExtArgs>>): Prisma__RedeemRequestClient<$Result.GetResult<Prisma.$RedeemRequestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RedeemRequest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RedeemRequestFindUniqueOrThrowArgs} args - Arguments to find a RedeemRequest
     * @example
     * // Get one RedeemRequest
     * const redeemRequest = await prisma.redeemRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RedeemRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, RedeemRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RedeemRequestClient<$Result.GetResult<Prisma.$RedeemRequestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RedeemRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemRequestFindFirstArgs} args - Arguments to find a RedeemRequest
     * @example
     * // Get one RedeemRequest
     * const redeemRequest = await prisma.redeemRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RedeemRequestFindFirstArgs>(args?: SelectSubset<T, RedeemRequestFindFirstArgs<ExtArgs>>): Prisma__RedeemRequestClient<$Result.GetResult<Prisma.$RedeemRequestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RedeemRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemRequestFindFirstOrThrowArgs} args - Arguments to find a RedeemRequest
     * @example
     * // Get one RedeemRequest
     * const redeemRequest = await prisma.redeemRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RedeemRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, RedeemRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__RedeemRequestClient<$Result.GetResult<Prisma.$RedeemRequestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RedeemRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RedeemRequests
     * const redeemRequests = await prisma.redeemRequest.findMany()
     * 
     * // Get first 10 RedeemRequests
     * const redeemRequests = await prisma.redeemRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const redeemRequestWithIdOnly = await prisma.redeemRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RedeemRequestFindManyArgs>(args?: SelectSubset<T, RedeemRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RedeemRequestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RedeemRequest.
     * @param {RedeemRequestCreateArgs} args - Arguments to create a RedeemRequest.
     * @example
     * // Create one RedeemRequest
     * const RedeemRequest = await prisma.redeemRequest.create({
     *   data: {
     *     // ... data to create a RedeemRequest
     *   }
     * })
     * 
     */
    create<T extends RedeemRequestCreateArgs>(args: SelectSubset<T, RedeemRequestCreateArgs<ExtArgs>>): Prisma__RedeemRequestClient<$Result.GetResult<Prisma.$RedeemRequestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RedeemRequests.
     * @param {RedeemRequestCreateManyArgs} args - Arguments to create many RedeemRequests.
     * @example
     * // Create many RedeemRequests
     * const redeemRequest = await prisma.redeemRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RedeemRequestCreateManyArgs>(args?: SelectSubset<T, RedeemRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RedeemRequests and returns the data saved in the database.
     * @param {RedeemRequestCreateManyAndReturnArgs} args - Arguments to create many RedeemRequests.
     * @example
     * // Create many RedeemRequests
     * const redeemRequest = await prisma.redeemRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RedeemRequests and only return the `id`
     * const redeemRequestWithIdOnly = await prisma.redeemRequest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RedeemRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, RedeemRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RedeemRequestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RedeemRequest.
     * @param {RedeemRequestDeleteArgs} args - Arguments to delete one RedeemRequest.
     * @example
     * // Delete one RedeemRequest
     * const RedeemRequest = await prisma.redeemRequest.delete({
     *   where: {
     *     // ... filter to delete one RedeemRequest
     *   }
     * })
     * 
     */
    delete<T extends RedeemRequestDeleteArgs>(args: SelectSubset<T, RedeemRequestDeleteArgs<ExtArgs>>): Prisma__RedeemRequestClient<$Result.GetResult<Prisma.$RedeemRequestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RedeemRequest.
     * @param {RedeemRequestUpdateArgs} args - Arguments to update one RedeemRequest.
     * @example
     * // Update one RedeemRequest
     * const redeemRequest = await prisma.redeemRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RedeemRequestUpdateArgs>(args: SelectSubset<T, RedeemRequestUpdateArgs<ExtArgs>>): Prisma__RedeemRequestClient<$Result.GetResult<Prisma.$RedeemRequestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RedeemRequests.
     * @param {RedeemRequestDeleteManyArgs} args - Arguments to filter RedeemRequests to delete.
     * @example
     * // Delete a few RedeemRequests
     * const { count } = await prisma.redeemRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RedeemRequestDeleteManyArgs>(args?: SelectSubset<T, RedeemRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RedeemRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RedeemRequests
     * const redeemRequest = await prisma.redeemRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RedeemRequestUpdateManyArgs>(args: SelectSubset<T, RedeemRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RedeemRequest.
     * @param {RedeemRequestUpsertArgs} args - Arguments to update or create a RedeemRequest.
     * @example
     * // Update or create a RedeemRequest
     * const redeemRequest = await prisma.redeemRequest.upsert({
     *   create: {
     *     // ... data to create a RedeemRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RedeemRequest we want to update
     *   }
     * })
     */
    upsert<T extends RedeemRequestUpsertArgs>(args: SelectSubset<T, RedeemRequestUpsertArgs<ExtArgs>>): Prisma__RedeemRequestClient<$Result.GetResult<Prisma.$RedeemRequestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RedeemRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemRequestCountArgs} args - Arguments to filter RedeemRequests to count.
     * @example
     * // Count the number of RedeemRequests
     * const count = await prisma.redeemRequest.count({
     *   where: {
     *     // ... the filter for the RedeemRequests we want to count
     *   }
     * })
    **/
    count<T extends RedeemRequestCountArgs>(
      args?: Subset<T, RedeemRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RedeemRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RedeemRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RedeemRequestAggregateArgs>(args: Subset<T, RedeemRequestAggregateArgs>): Prisma.PrismaPromise<GetRedeemRequestAggregateType<T>>

    /**
     * Group by RedeemRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemRequestGroupByArgs} args - Group by arguments.
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
      T extends RedeemRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RedeemRequestGroupByArgs['orderBy'] }
        : { orderBy?: RedeemRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RedeemRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRedeemRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RedeemRequest model
   */
  readonly fields: RedeemRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RedeemRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RedeemRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the RedeemRequest model
   */ 
  interface RedeemRequestFieldRefs {
    readonly id: FieldRef<"RedeemRequest", 'String'>
    readonly orgId: FieldRef<"RedeemRequest", 'String'>
    readonly idempotencyKey: FieldRef<"RedeemRequest", 'String'>
    readonly status: FieldRef<"RedeemRequest", 'RedeemRequestStatus'>
    readonly amountMinor: FieldRef<"RedeemRequest", 'BigInt'>
    readonly currency: FieldRef<"RedeemRequest", 'String'>
    readonly chain: FieldRef<"RedeemRequest", 'StablecoinChain'>
    readonly sourceWalletId: FieldRef<"RedeemRequest", 'String'>
    readonly payoutRail: FieldRef<"RedeemRequest", 'String'>
    readonly executionTransactionId: FieldRef<"RedeemRequest", 'String'>
    readonly txHash: FieldRef<"RedeemRequest", 'String'>
    readonly ledgerEntryId: FieldRef<"RedeemRequest", 'String'>
    readonly failureReason: FieldRef<"RedeemRequest", 'String'>
    readonly metadata: FieldRef<"RedeemRequest", 'Json'>
    readonly createdAt: FieldRef<"RedeemRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"RedeemRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RedeemRequest findUnique
   */
  export type RedeemRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemRequest
     */
    select?: RedeemRequestSelect<ExtArgs> | null
    /**
     * Filter, which RedeemRequest to fetch.
     */
    where: RedeemRequestWhereUniqueInput
  }

  /**
   * RedeemRequest findUniqueOrThrow
   */
  export type RedeemRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemRequest
     */
    select?: RedeemRequestSelect<ExtArgs> | null
    /**
     * Filter, which RedeemRequest to fetch.
     */
    where: RedeemRequestWhereUniqueInput
  }

  /**
   * RedeemRequest findFirst
   */
  export type RedeemRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemRequest
     */
    select?: RedeemRequestSelect<ExtArgs> | null
    /**
     * Filter, which RedeemRequest to fetch.
     */
    where?: RedeemRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RedeemRequests to fetch.
     */
    orderBy?: RedeemRequestOrderByWithRelationInput | RedeemRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RedeemRequests.
     */
    cursor?: RedeemRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RedeemRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RedeemRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RedeemRequests.
     */
    distinct?: RedeemRequestScalarFieldEnum | RedeemRequestScalarFieldEnum[]
  }

  /**
   * RedeemRequest findFirstOrThrow
   */
  export type RedeemRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemRequest
     */
    select?: RedeemRequestSelect<ExtArgs> | null
    /**
     * Filter, which RedeemRequest to fetch.
     */
    where?: RedeemRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RedeemRequests to fetch.
     */
    orderBy?: RedeemRequestOrderByWithRelationInput | RedeemRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RedeemRequests.
     */
    cursor?: RedeemRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RedeemRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RedeemRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RedeemRequests.
     */
    distinct?: RedeemRequestScalarFieldEnum | RedeemRequestScalarFieldEnum[]
  }

  /**
   * RedeemRequest findMany
   */
  export type RedeemRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemRequest
     */
    select?: RedeemRequestSelect<ExtArgs> | null
    /**
     * Filter, which RedeemRequests to fetch.
     */
    where?: RedeemRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RedeemRequests to fetch.
     */
    orderBy?: RedeemRequestOrderByWithRelationInput | RedeemRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RedeemRequests.
     */
    cursor?: RedeemRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RedeemRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RedeemRequests.
     */
    skip?: number
    distinct?: RedeemRequestScalarFieldEnum | RedeemRequestScalarFieldEnum[]
  }

  /**
   * RedeemRequest create
   */
  export type RedeemRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemRequest
     */
    select?: RedeemRequestSelect<ExtArgs> | null
    /**
     * The data needed to create a RedeemRequest.
     */
    data: XOR<RedeemRequestCreateInput, RedeemRequestUncheckedCreateInput>
  }

  /**
   * RedeemRequest createMany
   */
  export type RedeemRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RedeemRequests.
     */
    data: RedeemRequestCreateManyInput | RedeemRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RedeemRequest createManyAndReturn
   */
  export type RedeemRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemRequest
     */
    select?: RedeemRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RedeemRequests.
     */
    data: RedeemRequestCreateManyInput | RedeemRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RedeemRequest update
   */
  export type RedeemRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemRequest
     */
    select?: RedeemRequestSelect<ExtArgs> | null
    /**
     * The data needed to update a RedeemRequest.
     */
    data: XOR<RedeemRequestUpdateInput, RedeemRequestUncheckedUpdateInput>
    /**
     * Choose, which RedeemRequest to update.
     */
    where: RedeemRequestWhereUniqueInput
  }

  /**
   * RedeemRequest updateMany
   */
  export type RedeemRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RedeemRequests.
     */
    data: XOR<RedeemRequestUpdateManyMutationInput, RedeemRequestUncheckedUpdateManyInput>
    /**
     * Filter which RedeemRequests to update
     */
    where?: RedeemRequestWhereInput
  }

  /**
   * RedeemRequest upsert
   */
  export type RedeemRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemRequest
     */
    select?: RedeemRequestSelect<ExtArgs> | null
    /**
     * The filter to search for the RedeemRequest to update in case it exists.
     */
    where: RedeemRequestWhereUniqueInput
    /**
     * In case the RedeemRequest found by the `where` argument doesn't exist, create a new RedeemRequest with this data.
     */
    create: XOR<RedeemRequestCreateInput, RedeemRequestUncheckedCreateInput>
    /**
     * In case the RedeemRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RedeemRequestUpdateInput, RedeemRequestUncheckedUpdateInput>
  }

  /**
   * RedeemRequest delete
   */
  export type RedeemRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemRequest
     */
    select?: RedeemRequestSelect<ExtArgs> | null
    /**
     * Filter which RedeemRequest to delete.
     */
    where: RedeemRequestWhereUniqueInput
  }

  /**
   * RedeemRequest deleteMany
   */
  export type RedeemRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RedeemRequests to delete
     */
    where?: RedeemRequestWhereInput
  }

  /**
   * RedeemRequest without action
   */
  export type RedeemRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemRequest
     */
    select?: RedeemRequestSelect<ExtArgs> | null
  }


  /**
   * Model SupplySnapshot
   */

  export type AggregateSupplySnapshot = {
    _count: SupplySnapshotCountAggregateOutputType | null
    _avg: SupplySnapshotAvgAggregateOutputType | null
    _sum: SupplySnapshotSumAggregateOutputType | null
    _min: SupplySnapshotMinAggregateOutputType | null
    _max: SupplySnapshotMaxAggregateOutputType | null
  }

  export type SupplySnapshotAvgAggregateOutputType = {
    onChainSupplyMinor: number | null
    reserveTotalMinor: number | null
    reserveRatioBps: number | null
  }

  export type SupplySnapshotSumAggregateOutputType = {
    onChainSupplyMinor: bigint | null
    reserveTotalMinor: bigint | null
    reserveRatioBps: number | null
  }

  export type SupplySnapshotMinAggregateOutputType = {
    id: string | null
    chain: $Enums.StablecoinChain | null
    onChainSupplyMinor: bigint | null
    reserveTotalMinor: bigint | null
    reserveRatioBps: number | null
    capturedAt: Date | null
  }

  export type SupplySnapshotMaxAggregateOutputType = {
    id: string | null
    chain: $Enums.StablecoinChain | null
    onChainSupplyMinor: bigint | null
    reserveTotalMinor: bigint | null
    reserveRatioBps: number | null
    capturedAt: Date | null
  }

  export type SupplySnapshotCountAggregateOutputType = {
    id: number
    chain: number
    onChainSupplyMinor: number
    reserveTotalMinor: number
    reserveRatioBps: number
    capturedAt: number
    _all: number
  }


  export type SupplySnapshotAvgAggregateInputType = {
    onChainSupplyMinor?: true
    reserveTotalMinor?: true
    reserveRatioBps?: true
  }

  export type SupplySnapshotSumAggregateInputType = {
    onChainSupplyMinor?: true
    reserveTotalMinor?: true
    reserveRatioBps?: true
  }

  export type SupplySnapshotMinAggregateInputType = {
    id?: true
    chain?: true
    onChainSupplyMinor?: true
    reserveTotalMinor?: true
    reserveRatioBps?: true
    capturedAt?: true
  }

  export type SupplySnapshotMaxAggregateInputType = {
    id?: true
    chain?: true
    onChainSupplyMinor?: true
    reserveTotalMinor?: true
    reserveRatioBps?: true
    capturedAt?: true
  }

  export type SupplySnapshotCountAggregateInputType = {
    id?: true
    chain?: true
    onChainSupplyMinor?: true
    reserveTotalMinor?: true
    reserveRatioBps?: true
    capturedAt?: true
    _all?: true
  }

  export type SupplySnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupplySnapshot to aggregate.
     */
    where?: SupplySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplySnapshots to fetch.
     */
    orderBy?: SupplySnapshotOrderByWithRelationInput | SupplySnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupplySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplySnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplySnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupplySnapshots
    **/
    _count?: true | SupplySnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SupplySnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SupplySnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupplySnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupplySnapshotMaxAggregateInputType
  }

  export type GetSupplySnapshotAggregateType<T extends SupplySnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateSupplySnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupplySnapshot[P]>
      : GetScalarType<T[P], AggregateSupplySnapshot[P]>
  }




  export type SupplySnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplySnapshotWhereInput
    orderBy?: SupplySnapshotOrderByWithAggregationInput | SupplySnapshotOrderByWithAggregationInput[]
    by: SupplySnapshotScalarFieldEnum[] | SupplySnapshotScalarFieldEnum
    having?: SupplySnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupplySnapshotCountAggregateInputType | true
    _avg?: SupplySnapshotAvgAggregateInputType
    _sum?: SupplySnapshotSumAggregateInputType
    _min?: SupplySnapshotMinAggregateInputType
    _max?: SupplySnapshotMaxAggregateInputType
  }

  export type SupplySnapshotGroupByOutputType = {
    id: string
    chain: $Enums.StablecoinChain
    onChainSupplyMinor: bigint
    reserveTotalMinor: bigint
    reserveRatioBps: number
    capturedAt: Date
    _count: SupplySnapshotCountAggregateOutputType | null
    _avg: SupplySnapshotAvgAggregateOutputType | null
    _sum: SupplySnapshotSumAggregateOutputType | null
    _min: SupplySnapshotMinAggregateOutputType | null
    _max: SupplySnapshotMaxAggregateOutputType | null
  }

  type GetSupplySnapshotGroupByPayload<T extends SupplySnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupplySnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupplySnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupplySnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], SupplySnapshotGroupByOutputType[P]>
        }
      >
    >


  export type SupplySnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chain?: boolean
    onChainSupplyMinor?: boolean
    reserveTotalMinor?: boolean
    reserveRatioBps?: boolean
    capturedAt?: boolean
  }, ExtArgs["result"]["supplySnapshot"]>

  export type SupplySnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chain?: boolean
    onChainSupplyMinor?: boolean
    reserveTotalMinor?: boolean
    reserveRatioBps?: boolean
    capturedAt?: boolean
  }, ExtArgs["result"]["supplySnapshot"]>

  export type SupplySnapshotSelectScalar = {
    id?: boolean
    chain?: boolean
    onChainSupplyMinor?: boolean
    reserveTotalMinor?: boolean
    reserveRatioBps?: boolean
    capturedAt?: boolean
  }


  export type $SupplySnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupplySnapshot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chain: $Enums.StablecoinChain
      onChainSupplyMinor: bigint
      reserveTotalMinor: bigint
      reserveRatioBps: number
      capturedAt: Date
    }, ExtArgs["result"]["supplySnapshot"]>
    composites: {}
  }

  type SupplySnapshotGetPayload<S extends boolean | null | undefined | SupplySnapshotDefaultArgs> = $Result.GetResult<Prisma.$SupplySnapshotPayload, S>

  type SupplySnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SupplySnapshotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SupplySnapshotCountAggregateInputType | true
    }

  export interface SupplySnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupplySnapshot'], meta: { name: 'SupplySnapshot' } }
    /**
     * Find zero or one SupplySnapshot that matches the filter.
     * @param {SupplySnapshotFindUniqueArgs} args - Arguments to find a SupplySnapshot
     * @example
     * // Get one SupplySnapshot
     * const supplySnapshot = await prisma.supplySnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupplySnapshotFindUniqueArgs>(args: SelectSubset<T, SupplySnapshotFindUniqueArgs<ExtArgs>>): Prisma__SupplySnapshotClient<$Result.GetResult<Prisma.$SupplySnapshotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SupplySnapshot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SupplySnapshotFindUniqueOrThrowArgs} args - Arguments to find a SupplySnapshot
     * @example
     * // Get one SupplySnapshot
     * const supplySnapshot = await prisma.supplySnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupplySnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, SupplySnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupplySnapshotClient<$Result.GetResult<Prisma.$SupplySnapshotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SupplySnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplySnapshotFindFirstArgs} args - Arguments to find a SupplySnapshot
     * @example
     * // Get one SupplySnapshot
     * const supplySnapshot = await prisma.supplySnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupplySnapshotFindFirstArgs>(args?: SelectSubset<T, SupplySnapshotFindFirstArgs<ExtArgs>>): Prisma__SupplySnapshotClient<$Result.GetResult<Prisma.$SupplySnapshotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SupplySnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplySnapshotFindFirstOrThrowArgs} args - Arguments to find a SupplySnapshot
     * @example
     * // Get one SupplySnapshot
     * const supplySnapshot = await prisma.supplySnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupplySnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, SupplySnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupplySnapshotClient<$Result.GetResult<Prisma.$SupplySnapshotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SupplySnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplySnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupplySnapshots
     * const supplySnapshots = await prisma.supplySnapshot.findMany()
     * 
     * // Get first 10 SupplySnapshots
     * const supplySnapshots = await prisma.supplySnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supplySnapshotWithIdOnly = await prisma.supplySnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupplySnapshotFindManyArgs>(args?: SelectSubset<T, SupplySnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplySnapshotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SupplySnapshot.
     * @param {SupplySnapshotCreateArgs} args - Arguments to create a SupplySnapshot.
     * @example
     * // Create one SupplySnapshot
     * const SupplySnapshot = await prisma.supplySnapshot.create({
     *   data: {
     *     // ... data to create a SupplySnapshot
     *   }
     * })
     * 
     */
    create<T extends SupplySnapshotCreateArgs>(args: SelectSubset<T, SupplySnapshotCreateArgs<ExtArgs>>): Prisma__SupplySnapshotClient<$Result.GetResult<Prisma.$SupplySnapshotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SupplySnapshots.
     * @param {SupplySnapshotCreateManyArgs} args - Arguments to create many SupplySnapshots.
     * @example
     * // Create many SupplySnapshots
     * const supplySnapshot = await prisma.supplySnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupplySnapshotCreateManyArgs>(args?: SelectSubset<T, SupplySnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SupplySnapshots and returns the data saved in the database.
     * @param {SupplySnapshotCreateManyAndReturnArgs} args - Arguments to create many SupplySnapshots.
     * @example
     * // Create many SupplySnapshots
     * const supplySnapshot = await prisma.supplySnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SupplySnapshots and only return the `id`
     * const supplySnapshotWithIdOnly = await prisma.supplySnapshot.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupplySnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, SupplySnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplySnapshotPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SupplySnapshot.
     * @param {SupplySnapshotDeleteArgs} args - Arguments to delete one SupplySnapshot.
     * @example
     * // Delete one SupplySnapshot
     * const SupplySnapshot = await prisma.supplySnapshot.delete({
     *   where: {
     *     // ... filter to delete one SupplySnapshot
     *   }
     * })
     * 
     */
    delete<T extends SupplySnapshotDeleteArgs>(args: SelectSubset<T, SupplySnapshotDeleteArgs<ExtArgs>>): Prisma__SupplySnapshotClient<$Result.GetResult<Prisma.$SupplySnapshotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SupplySnapshot.
     * @param {SupplySnapshotUpdateArgs} args - Arguments to update one SupplySnapshot.
     * @example
     * // Update one SupplySnapshot
     * const supplySnapshot = await prisma.supplySnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupplySnapshotUpdateArgs>(args: SelectSubset<T, SupplySnapshotUpdateArgs<ExtArgs>>): Prisma__SupplySnapshotClient<$Result.GetResult<Prisma.$SupplySnapshotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SupplySnapshots.
     * @param {SupplySnapshotDeleteManyArgs} args - Arguments to filter SupplySnapshots to delete.
     * @example
     * // Delete a few SupplySnapshots
     * const { count } = await prisma.supplySnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupplySnapshotDeleteManyArgs>(args?: SelectSubset<T, SupplySnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupplySnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplySnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupplySnapshots
     * const supplySnapshot = await prisma.supplySnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupplySnapshotUpdateManyArgs>(args: SelectSubset<T, SupplySnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SupplySnapshot.
     * @param {SupplySnapshotUpsertArgs} args - Arguments to update or create a SupplySnapshot.
     * @example
     * // Update or create a SupplySnapshot
     * const supplySnapshot = await prisma.supplySnapshot.upsert({
     *   create: {
     *     // ... data to create a SupplySnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupplySnapshot we want to update
     *   }
     * })
     */
    upsert<T extends SupplySnapshotUpsertArgs>(args: SelectSubset<T, SupplySnapshotUpsertArgs<ExtArgs>>): Prisma__SupplySnapshotClient<$Result.GetResult<Prisma.$SupplySnapshotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SupplySnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplySnapshotCountArgs} args - Arguments to filter SupplySnapshots to count.
     * @example
     * // Count the number of SupplySnapshots
     * const count = await prisma.supplySnapshot.count({
     *   where: {
     *     // ... the filter for the SupplySnapshots we want to count
     *   }
     * })
    **/
    count<T extends SupplySnapshotCountArgs>(
      args?: Subset<T, SupplySnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupplySnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupplySnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplySnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SupplySnapshotAggregateArgs>(args: Subset<T, SupplySnapshotAggregateArgs>): Prisma.PrismaPromise<GetSupplySnapshotAggregateType<T>>

    /**
     * Group by SupplySnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplySnapshotGroupByArgs} args - Group by arguments.
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
      T extends SupplySnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupplySnapshotGroupByArgs['orderBy'] }
        : { orderBy?: SupplySnapshotGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SupplySnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplySnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupplySnapshot model
   */
  readonly fields: SupplySnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupplySnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupplySnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SupplySnapshot model
   */ 
  interface SupplySnapshotFieldRefs {
    readonly id: FieldRef<"SupplySnapshot", 'String'>
    readonly chain: FieldRef<"SupplySnapshot", 'StablecoinChain'>
    readonly onChainSupplyMinor: FieldRef<"SupplySnapshot", 'BigInt'>
    readonly reserveTotalMinor: FieldRef<"SupplySnapshot", 'BigInt'>
    readonly reserveRatioBps: FieldRef<"SupplySnapshot", 'Int'>
    readonly capturedAt: FieldRef<"SupplySnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SupplySnapshot findUnique
   */
  export type SupplySnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplySnapshot
     */
    select?: SupplySnapshotSelect<ExtArgs> | null
    /**
     * Filter, which SupplySnapshot to fetch.
     */
    where: SupplySnapshotWhereUniqueInput
  }

  /**
   * SupplySnapshot findUniqueOrThrow
   */
  export type SupplySnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplySnapshot
     */
    select?: SupplySnapshotSelect<ExtArgs> | null
    /**
     * Filter, which SupplySnapshot to fetch.
     */
    where: SupplySnapshotWhereUniqueInput
  }

  /**
   * SupplySnapshot findFirst
   */
  export type SupplySnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplySnapshot
     */
    select?: SupplySnapshotSelect<ExtArgs> | null
    /**
     * Filter, which SupplySnapshot to fetch.
     */
    where?: SupplySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplySnapshots to fetch.
     */
    orderBy?: SupplySnapshotOrderByWithRelationInput | SupplySnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupplySnapshots.
     */
    cursor?: SupplySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplySnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplySnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupplySnapshots.
     */
    distinct?: SupplySnapshotScalarFieldEnum | SupplySnapshotScalarFieldEnum[]
  }

  /**
   * SupplySnapshot findFirstOrThrow
   */
  export type SupplySnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplySnapshot
     */
    select?: SupplySnapshotSelect<ExtArgs> | null
    /**
     * Filter, which SupplySnapshot to fetch.
     */
    where?: SupplySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplySnapshots to fetch.
     */
    orderBy?: SupplySnapshotOrderByWithRelationInput | SupplySnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupplySnapshots.
     */
    cursor?: SupplySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplySnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplySnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupplySnapshots.
     */
    distinct?: SupplySnapshotScalarFieldEnum | SupplySnapshotScalarFieldEnum[]
  }

  /**
   * SupplySnapshot findMany
   */
  export type SupplySnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplySnapshot
     */
    select?: SupplySnapshotSelect<ExtArgs> | null
    /**
     * Filter, which SupplySnapshots to fetch.
     */
    where?: SupplySnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupplySnapshots to fetch.
     */
    orderBy?: SupplySnapshotOrderByWithRelationInput | SupplySnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupplySnapshots.
     */
    cursor?: SupplySnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupplySnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupplySnapshots.
     */
    skip?: number
    distinct?: SupplySnapshotScalarFieldEnum | SupplySnapshotScalarFieldEnum[]
  }

  /**
   * SupplySnapshot create
   */
  export type SupplySnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplySnapshot
     */
    select?: SupplySnapshotSelect<ExtArgs> | null
    /**
     * The data needed to create a SupplySnapshot.
     */
    data: XOR<SupplySnapshotCreateInput, SupplySnapshotUncheckedCreateInput>
  }

  /**
   * SupplySnapshot createMany
   */
  export type SupplySnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupplySnapshots.
     */
    data: SupplySnapshotCreateManyInput | SupplySnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupplySnapshot createManyAndReturn
   */
  export type SupplySnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplySnapshot
     */
    select?: SupplySnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SupplySnapshots.
     */
    data: SupplySnapshotCreateManyInput | SupplySnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupplySnapshot update
   */
  export type SupplySnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplySnapshot
     */
    select?: SupplySnapshotSelect<ExtArgs> | null
    /**
     * The data needed to update a SupplySnapshot.
     */
    data: XOR<SupplySnapshotUpdateInput, SupplySnapshotUncheckedUpdateInput>
    /**
     * Choose, which SupplySnapshot to update.
     */
    where: SupplySnapshotWhereUniqueInput
  }

  /**
   * SupplySnapshot updateMany
   */
  export type SupplySnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupplySnapshots.
     */
    data: XOR<SupplySnapshotUpdateManyMutationInput, SupplySnapshotUncheckedUpdateManyInput>
    /**
     * Filter which SupplySnapshots to update
     */
    where?: SupplySnapshotWhereInput
  }

  /**
   * SupplySnapshot upsert
   */
  export type SupplySnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplySnapshot
     */
    select?: SupplySnapshotSelect<ExtArgs> | null
    /**
     * The filter to search for the SupplySnapshot to update in case it exists.
     */
    where: SupplySnapshotWhereUniqueInput
    /**
     * In case the SupplySnapshot found by the `where` argument doesn't exist, create a new SupplySnapshot with this data.
     */
    create: XOR<SupplySnapshotCreateInput, SupplySnapshotUncheckedCreateInput>
    /**
     * In case the SupplySnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupplySnapshotUpdateInput, SupplySnapshotUncheckedUpdateInput>
  }

  /**
   * SupplySnapshot delete
   */
  export type SupplySnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplySnapshot
     */
    select?: SupplySnapshotSelect<ExtArgs> | null
    /**
     * Filter which SupplySnapshot to delete.
     */
    where: SupplySnapshotWhereUniqueInput
  }

  /**
   * SupplySnapshot deleteMany
   */
  export type SupplySnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupplySnapshots to delete
     */
    where?: SupplySnapshotWhereInput
  }

  /**
   * SupplySnapshot without action
   */
  export type SupplySnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplySnapshot
     */
    select?: SupplySnapshotSelect<ExtArgs> | null
  }


  /**
   * Model ReserveAttestation
   */

  export type AggregateReserveAttestation = {
    _count: ReserveAttestationCountAggregateOutputType | null
    _avg: ReserveAttestationAvgAggregateOutputType | null
    _sum: ReserveAttestationSumAggregateOutputType | null
    _min: ReserveAttestationMinAggregateOutputType | null
    _max: ReserveAttestationMaxAggregateOutputType | null
  }

  export type ReserveAttestationAvgAggregateOutputType = {
    balanceMinor: number | null
    authorizedCeilingMinor: number | null
  }

  export type ReserveAttestationSumAggregateOutputType = {
    balanceMinor: bigint | null
    authorizedCeilingMinor: bigint | null
  }

  export type ReserveAttestationMinAggregateOutputType = {
    id: string | null
    reserveAccountId: string | null
    attestationHash: string | null
    balanceMinor: bigint | null
    authorizedCeilingMinor: bigint | null
    attestationUrl: string | null
    asOf: Date | null
    createdAt: Date | null
  }

  export type ReserveAttestationMaxAggregateOutputType = {
    id: string | null
    reserveAccountId: string | null
    attestationHash: string | null
    balanceMinor: bigint | null
    authorizedCeilingMinor: bigint | null
    attestationUrl: string | null
    asOf: Date | null
    createdAt: Date | null
  }

  export type ReserveAttestationCountAggregateOutputType = {
    id: number
    reserveAccountId: number
    attestationHash: number
    balanceMinor: number
    authorizedCeilingMinor: number
    attestationUrl: number
    asOf: number
    createdAt: number
    _all: number
  }


  export type ReserveAttestationAvgAggregateInputType = {
    balanceMinor?: true
    authorizedCeilingMinor?: true
  }

  export type ReserveAttestationSumAggregateInputType = {
    balanceMinor?: true
    authorizedCeilingMinor?: true
  }

  export type ReserveAttestationMinAggregateInputType = {
    id?: true
    reserveAccountId?: true
    attestationHash?: true
    balanceMinor?: true
    authorizedCeilingMinor?: true
    attestationUrl?: true
    asOf?: true
    createdAt?: true
  }

  export type ReserveAttestationMaxAggregateInputType = {
    id?: true
    reserveAccountId?: true
    attestationHash?: true
    balanceMinor?: true
    authorizedCeilingMinor?: true
    attestationUrl?: true
    asOf?: true
    createdAt?: true
  }

  export type ReserveAttestationCountAggregateInputType = {
    id?: true
    reserveAccountId?: true
    attestationHash?: true
    balanceMinor?: true
    authorizedCeilingMinor?: true
    attestationUrl?: true
    asOf?: true
    createdAt?: true
    _all?: true
  }

  export type ReserveAttestationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReserveAttestation to aggregate.
     */
    where?: ReserveAttestationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReserveAttestations to fetch.
     */
    orderBy?: ReserveAttestationOrderByWithRelationInput | ReserveAttestationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReserveAttestationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReserveAttestations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReserveAttestations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReserveAttestations
    **/
    _count?: true | ReserveAttestationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReserveAttestationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReserveAttestationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReserveAttestationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReserveAttestationMaxAggregateInputType
  }

  export type GetReserveAttestationAggregateType<T extends ReserveAttestationAggregateArgs> = {
        [P in keyof T & keyof AggregateReserveAttestation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReserveAttestation[P]>
      : GetScalarType<T[P], AggregateReserveAttestation[P]>
  }




  export type ReserveAttestationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReserveAttestationWhereInput
    orderBy?: ReserveAttestationOrderByWithAggregationInput | ReserveAttestationOrderByWithAggregationInput[]
    by: ReserveAttestationScalarFieldEnum[] | ReserveAttestationScalarFieldEnum
    having?: ReserveAttestationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReserveAttestationCountAggregateInputType | true
    _avg?: ReserveAttestationAvgAggregateInputType
    _sum?: ReserveAttestationSumAggregateInputType
    _min?: ReserveAttestationMinAggregateInputType
    _max?: ReserveAttestationMaxAggregateInputType
  }

  export type ReserveAttestationGroupByOutputType = {
    id: string
    reserveAccountId: string
    attestationHash: string
    balanceMinor: bigint
    authorizedCeilingMinor: bigint
    attestationUrl: string | null
    asOf: Date
    createdAt: Date
    _count: ReserveAttestationCountAggregateOutputType | null
    _avg: ReserveAttestationAvgAggregateOutputType | null
    _sum: ReserveAttestationSumAggregateOutputType | null
    _min: ReserveAttestationMinAggregateOutputType | null
    _max: ReserveAttestationMaxAggregateOutputType | null
  }

  type GetReserveAttestationGroupByPayload<T extends ReserveAttestationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReserveAttestationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReserveAttestationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReserveAttestationGroupByOutputType[P]>
            : GetScalarType<T[P], ReserveAttestationGroupByOutputType[P]>
        }
      >
    >


  export type ReserveAttestationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reserveAccountId?: boolean
    attestationHash?: boolean
    balanceMinor?: boolean
    authorizedCeilingMinor?: boolean
    attestationUrl?: boolean
    asOf?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["reserveAttestation"]>

  export type ReserveAttestationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reserveAccountId?: boolean
    attestationHash?: boolean
    balanceMinor?: boolean
    authorizedCeilingMinor?: boolean
    attestationUrl?: boolean
    asOf?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["reserveAttestation"]>

  export type ReserveAttestationSelectScalar = {
    id?: boolean
    reserveAccountId?: boolean
    attestationHash?: boolean
    balanceMinor?: boolean
    authorizedCeilingMinor?: boolean
    attestationUrl?: boolean
    asOf?: boolean
    createdAt?: boolean
  }


  export type $ReserveAttestationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReserveAttestation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reserveAccountId: string
      attestationHash: string
      balanceMinor: bigint
      authorizedCeilingMinor: bigint
      attestationUrl: string | null
      asOf: Date
      createdAt: Date
    }, ExtArgs["result"]["reserveAttestation"]>
    composites: {}
  }

  type ReserveAttestationGetPayload<S extends boolean | null | undefined | ReserveAttestationDefaultArgs> = $Result.GetResult<Prisma.$ReserveAttestationPayload, S>

  type ReserveAttestationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReserveAttestationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReserveAttestationCountAggregateInputType | true
    }

  export interface ReserveAttestationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReserveAttestation'], meta: { name: 'ReserveAttestation' } }
    /**
     * Find zero or one ReserveAttestation that matches the filter.
     * @param {ReserveAttestationFindUniqueArgs} args - Arguments to find a ReserveAttestation
     * @example
     * // Get one ReserveAttestation
     * const reserveAttestation = await prisma.reserveAttestation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReserveAttestationFindUniqueArgs>(args: SelectSubset<T, ReserveAttestationFindUniqueArgs<ExtArgs>>): Prisma__ReserveAttestationClient<$Result.GetResult<Prisma.$ReserveAttestationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ReserveAttestation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReserveAttestationFindUniqueOrThrowArgs} args - Arguments to find a ReserveAttestation
     * @example
     * // Get one ReserveAttestation
     * const reserveAttestation = await prisma.reserveAttestation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReserveAttestationFindUniqueOrThrowArgs>(args: SelectSubset<T, ReserveAttestationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReserveAttestationClient<$Result.GetResult<Prisma.$ReserveAttestationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ReserveAttestation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReserveAttestationFindFirstArgs} args - Arguments to find a ReserveAttestation
     * @example
     * // Get one ReserveAttestation
     * const reserveAttestation = await prisma.reserveAttestation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReserveAttestationFindFirstArgs>(args?: SelectSubset<T, ReserveAttestationFindFirstArgs<ExtArgs>>): Prisma__ReserveAttestationClient<$Result.GetResult<Prisma.$ReserveAttestationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ReserveAttestation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReserveAttestationFindFirstOrThrowArgs} args - Arguments to find a ReserveAttestation
     * @example
     * // Get one ReserveAttestation
     * const reserveAttestation = await prisma.reserveAttestation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReserveAttestationFindFirstOrThrowArgs>(args?: SelectSubset<T, ReserveAttestationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReserveAttestationClient<$Result.GetResult<Prisma.$ReserveAttestationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ReserveAttestations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReserveAttestationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReserveAttestations
     * const reserveAttestations = await prisma.reserveAttestation.findMany()
     * 
     * // Get first 10 ReserveAttestations
     * const reserveAttestations = await prisma.reserveAttestation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reserveAttestationWithIdOnly = await prisma.reserveAttestation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReserveAttestationFindManyArgs>(args?: SelectSubset<T, ReserveAttestationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReserveAttestationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ReserveAttestation.
     * @param {ReserveAttestationCreateArgs} args - Arguments to create a ReserveAttestation.
     * @example
     * // Create one ReserveAttestation
     * const ReserveAttestation = await prisma.reserveAttestation.create({
     *   data: {
     *     // ... data to create a ReserveAttestation
     *   }
     * })
     * 
     */
    create<T extends ReserveAttestationCreateArgs>(args: SelectSubset<T, ReserveAttestationCreateArgs<ExtArgs>>): Prisma__ReserveAttestationClient<$Result.GetResult<Prisma.$ReserveAttestationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ReserveAttestations.
     * @param {ReserveAttestationCreateManyArgs} args - Arguments to create many ReserveAttestations.
     * @example
     * // Create many ReserveAttestations
     * const reserveAttestation = await prisma.reserveAttestation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReserveAttestationCreateManyArgs>(args?: SelectSubset<T, ReserveAttestationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReserveAttestations and returns the data saved in the database.
     * @param {ReserveAttestationCreateManyAndReturnArgs} args - Arguments to create many ReserveAttestations.
     * @example
     * // Create many ReserveAttestations
     * const reserveAttestation = await prisma.reserveAttestation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReserveAttestations and only return the `id`
     * const reserveAttestationWithIdOnly = await prisma.reserveAttestation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReserveAttestationCreateManyAndReturnArgs>(args?: SelectSubset<T, ReserveAttestationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReserveAttestationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ReserveAttestation.
     * @param {ReserveAttestationDeleteArgs} args - Arguments to delete one ReserveAttestation.
     * @example
     * // Delete one ReserveAttestation
     * const ReserveAttestation = await prisma.reserveAttestation.delete({
     *   where: {
     *     // ... filter to delete one ReserveAttestation
     *   }
     * })
     * 
     */
    delete<T extends ReserveAttestationDeleteArgs>(args: SelectSubset<T, ReserveAttestationDeleteArgs<ExtArgs>>): Prisma__ReserveAttestationClient<$Result.GetResult<Prisma.$ReserveAttestationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ReserveAttestation.
     * @param {ReserveAttestationUpdateArgs} args - Arguments to update one ReserveAttestation.
     * @example
     * // Update one ReserveAttestation
     * const reserveAttestation = await prisma.reserveAttestation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReserveAttestationUpdateArgs>(args: SelectSubset<T, ReserveAttestationUpdateArgs<ExtArgs>>): Prisma__ReserveAttestationClient<$Result.GetResult<Prisma.$ReserveAttestationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ReserveAttestations.
     * @param {ReserveAttestationDeleteManyArgs} args - Arguments to filter ReserveAttestations to delete.
     * @example
     * // Delete a few ReserveAttestations
     * const { count } = await prisma.reserveAttestation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReserveAttestationDeleteManyArgs>(args?: SelectSubset<T, ReserveAttestationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReserveAttestations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReserveAttestationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReserveAttestations
     * const reserveAttestation = await prisma.reserveAttestation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReserveAttestationUpdateManyArgs>(args: SelectSubset<T, ReserveAttestationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReserveAttestation.
     * @param {ReserveAttestationUpsertArgs} args - Arguments to update or create a ReserveAttestation.
     * @example
     * // Update or create a ReserveAttestation
     * const reserveAttestation = await prisma.reserveAttestation.upsert({
     *   create: {
     *     // ... data to create a ReserveAttestation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReserveAttestation we want to update
     *   }
     * })
     */
    upsert<T extends ReserveAttestationUpsertArgs>(args: SelectSubset<T, ReserveAttestationUpsertArgs<ExtArgs>>): Prisma__ReserveAttestationClient<$Result.GetResult<Prisma.$ReserveAttestationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ReserveAttestations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReserveAttestationCountArgs} args - Arguments to filter ReserveAttestations to count.
     * @example
     * // Count the number of ReserveAttestations
     * const count = await prisma.reserveAttestation.count({
     *   where: {
     *     // ... the filter for the ReserveAttestations we want to count
     *   }
     * })
    **/
    count<T extends ReserveAttestationCountArgs>(
      args?: Subset<T, ReserveAttestationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReserveAttestationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReserveAttestation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReserveAttestationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReserveAttestationAggregateArgs>(args: Subset<T, ReserveAttestationAggregateArgs>): Prisma.PrismaPromise<GetReserveAttestationAggregateType<T>>

    /**
     * Group by ReserveAttestation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReserveAttestationGroupByArgs} args - Group by arguments.
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
      T extends ReserveAttestationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReserveAttestationGroupByArgs['orderBy'] }
        : { orderBy?: ReserveAttestationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReserveAttestationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReserveAttestationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReserveAttestation model
   */
  readonly fields: ReserveAttestationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReserveAttestation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReserveAttestationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ReserveAttestation model
   */ 
  interface ReserveAttestationFieldRefs {
    readonly id: FieldRef<"ReserveAttestation", 'String'>
    readonly reserveAccountId: FieldRef<"ReserveAttestation", 'String'>
    readonly attestationHash: FieldRef<"ReserveAttestation", 'String'>
    readonly balanceMinor: FieldRef<"ReserveAttestation", 'BigInt'>
    readonly authorizedCeilingMinor: FieldRef<"ReserveAttestation", 'BigInt'>
    readonly attestationUrl: FieldRef<"ReserveAttestation", 'String'>
    readonly asOf: FieldRef<"ReserveAttestation", 'DateTime'>
    readonly createdAt: FieldRef<"ReserveAttestation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReserveAttestation findUnique
   */
  export type ReserveAttestationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAttestation
     */
    select?: ReserveAttestationSelect<ExtArgs> | null
    /**
     * Filter, which ReserveAttestation to fetch.
     */
    where: ReserveAttestationWhereUniqueInput
  }

  /**
   * ReserveAttestation findUniqueOrThrow
   */
  export type ReserveAttestationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAttestation
     */
    select?: ReserveAttestationSelect<ExtArgs> | null
    /**
     * Filter, which ReserveAttestation to fetch.
     */
    where: ReserveAttestationWhereUniqueInput
  }

  /**
   * ReserveAttestation findFirst
   */
  export type ReserveAttestationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAttestation
     */
    select?: ReserveAttestationSelect<ExtArgs> | null
    /**
     * Filter, which ReserveAttestation to fetch.
     */
    where?: ReserveAttestationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReserveAttestations to fetch.
     */
    orderBy?: ReserveAttestationOrderByWithRelationInput | ReserveAttestationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReserveAttestations.
     */
    cursor?: ReserveAttestationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReserveAttestations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReserveAttestations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReserveAttestations.
     */
    distinct?: ReserveAttestationScalarFieldEnum | ReserveAttestationScalarFieldEnum[]
  }

  /**
   * ReserveAttestation findFirstOrThrow
   */
  export type ReserveAttestationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAttestation
     */
    select?: ReserveAttestationSelect<ExtArgs> | null
    /**
     * Filter, which ReserveAttestation to fetch.
     */
    where?: ReserveAttestationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReserveAttestations to fetch.
     */
    orderBy?: ReserveAttestationOrderByWithRelationInput | ReserveAttestationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReserveAttestations.
     */
    cursor?: ReserveAttestationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReserveAttestations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReserveAttestations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReserveAttestations.
     */
    distinct?: ReserveAttestationScalarFieldEnum | ReserveAttestationScalarFieldEnum[]
  }

  /**
   * ReserveAttestation findMany
   */
  export type ReserveAttestationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAttestation
     */
    select?: ReserveAttestationSelect<ExtArgs> | null
    /**
     * Filter, which ReserveAttestations to fetch.
     */
    where?: ReserveAttestationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReserveAttestations to fetch.
     */
    orderBy?: ReserveAttestationOrderByWithRelationInput | ReserveAttestationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReserveAttestations.
     */
    cursor?: ReserveAttestationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReserveAttestations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReserveAttestations.
     */
    skip?: number
    distinct?: ReserveAttestationScalarFieldEnum | ReserveAttestationScalarFieldEnum[]
  }

  /**
   * ReserveAttestation create
   */
  export type ReserveAttestationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAttestation
     */
    select?: ReserveAttestationSelect<ExtArgs> | null
    /**
     * The data needed to create a ReserveAttestation.
     */
    data: XOR<ReserveAttestationCreateInput, ReserveAttestationUncheckedCreateInput>
  }

  /**
   * ReserveAttestation createMany
   */
  export type ReserveAttestationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReserveAttestations.
     */
    data: ReserveAttestationCreateManyInput | ReserveAttestationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReserveAttestation createManyAndReturn
   */
  export type ReserveAttestationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAttestation
     */
    select?: ReserveAttestationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ReserveAttestations.
     */
    data: ReserveAttestationCreateManyInput | ReserveAttestationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReserveAttestation update
   */
  export type ReserveAttestationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAttestation
     */
    select?: ReserveAttestationSelect<ExtArgs> | null
    /**
     * The data needed to update a ReserveAttestation.
     */
    data: XOR<ReserveAttestationUpdateInput, ReserveAttestationUncheckedUpdateInput>
    /**
     * Choose, which ReserveAttestation to update.
     */
    where: ReserveAttestationWhereUniqueInput
  }

  /**
   * ReserveAttestation updateMany
   */
  export type ReserveAttestationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReserveAttestations.
     */
    data: XOR<ReserveAttestationUpdateManyMutationInput, ReserveAttestationUncheckedUpdateManyInput>
    /**
     * Filter which ReserveAttestations to update
     */
    where?: ReserveAttestationWhereInput
  }

  /**
   * ReserveAttestation upsert
   */
  export type ReserveAttestationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAttestation
     */
    select?: ReserveAttestationSelect<ExtArgs> | null
    /**
     * The filter to search for the ReserveAttestation to update in case it exists.
     */
    where: ReserveAttestationWhereUniqueInput
    /**
     * In case the ReserveAttestation found by the `where` argument doesn't exist, create a new ReserveAttestation with this data.
     */
    create: XOR<ReserveAttestationCreateInput, ReserveAttestationUncheckedCreateInput>
    /**
     * In case the ReserveAttestation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReserveAttestationUpdateInput, ReserveAttestationUncheckedUpdateInput>
  }

  /**
   * ReserveAttestation delete
   */
  export type ReserveAttestationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAttestation
     */
    select?: ReserveAttestationSelect<ExtArgs> | null
    /**
     * Filter which ReserveAttestation to delete.
     */
    where: ReserveAttestationWhereUniqueInput
  }

  /**
   * ReserveAttestation deleteMany
   */
  export type ReserveAttestationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReserveAttestations to delete
     */
    where?: ReserveAttestationWhereInput
  }

  /**
   * ReserveAttestation without action
   */
  export type ReserveAttestationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReserveAttestation
     */
    select?: ReserveAttestationSelect<ExtArgs> | null
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


  export const ReserveAccountScalarFieldEnum: {
    id: 'id',
    custodian: 'custodian',
    currency: 'currency',
    balanceMinor: 'balanceMinor',
    authorizedCeilingMinor: 'authorizedCeilingMinor',
    attestationHash: 'attestationHash',
    attestationUrl: 'attestationUrl',
    asOf: 'asOf',
    chain: 'chain',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReserveAccountScalarFieldEnum = (typeof ReserveAccountScalarFieldEnum)[keyof typeof ReserveAccountScalarFieldEnum]


  export const MintRequestScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    idempotencyKey: 'idempotencyKey',
    status: 'status',
    amountMinor: 'amountMinor',
    currency: 'currency',
    chain: 'chain',
    reserveAccountId: 'reserveAccountId',
    destinationWalletId: 'destinationWalletId',
    destinationAddress: 'destinationAddress',
    executionTransactionId: 'executionTransactionId',
    txHash: 'txHash',
    ledgerEntryId: 'ledgerEntryId',
    failureReason: 'failureReason',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MintRequestScalarFieldEnum = (typeof MintRequestScalarFieldEnum)[keyof typeof MintRequestScalarFieldEnum]


  export const RedeemRequestScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    idempotencyKey: 'idempotencyKey',
    status: 'status',
    amountMinor: 'amountMinor',
    currency: 'currency',
    chain: 'chain',
    sourceWalletId: 'sourceWalletId',
    payoutRail: 'payoutRail',
    executionTransactionId: 'executionTransactionId',
    txHash: 'txHash',
    ledgerEntryId: 'ledgerEntryId',
    failureReason: 'failureReason',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RedeemRequestScalarFieldEnum = (typeof RedeemRequestScalarFieldEnum)[keyof typeof RedeemRequestScalarFieldEnum]


  export const SupplySnapshotScalarFieldEnum: {
    id: 'id',
    chain: 'chain',
    onChainSupplyMinor: 'onChainSupplyMinor',
    reserveTotalMinor: 'reserveTotalMinor',
    reserveRatioBps: 'reserveRatioBps',
    capturedAt: 'capturedAt'
  };

  export type SupplySnapshotScalarFieldEnum = (typeof SupplySnapshotScalarFieldEnum)[keyof typeof SupplySnapshotScalarFieldEnum]


  export const ReserveAttestationScalarFieldEnum: {
    id: 'id',
    reserveAccountId: 'reserveAccountId',
    attestationHash: 'attestationHash',
    balanceMinor: 'balanceMinor',
    authorizedCeilingMinor: 'authorizedCeilingMinor',
    attestationUrl: 'attestationUrl',
    asOf: 'asOf',
    createdAt: 'createdAt'
  };

  export type ReserveAttestationScalarFieldEnum = (typeof ReserveAttestationScalarFieldEnum)[keyof typeof ReserveAttestationScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'StablecoinChain'
   */
  export type EnumStablecoinChainFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StablecoinChain'>
    


  /**
   * Reference to a field of type 'StablecoinChain[]'
   */
  export type ListEnumStablecoinChainFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StablecoinChain[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'MintRequestStatus'
   */
  export type EnumMintRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MintRequestStatus'>
    


  /**
   * Reference to a field of type 'MintRequestStatus[]'
   */
  export type ListEnumMintRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MintRequestStatus[]'>
    


  /**
   * Reference to a field of type 'RedeemRequestStatus'
   */
  export type EnumRedeemRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RedeemRequestStatus'>
    


  /**
   * Reference to a field of type 'RedeemRequestStatus[]'
   */
  export type ListEnumRedeemRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RedeemRequestStatus[]'>
    


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


  export type ReserveAccountWhereInput = {
    AND?: ReserveAccountWhereInput | ReserveAccountWhereInput[]
    OR?: ReserveAccountWhereInput[]
    NOT?: ReserveAccountWhereInput | ReserveAccountWhereInput[]
    id?: UuidFilter<"ReserveAccount"> | string
    custodian?: StringFilter<"ReserveAccount"> | string
    currency?: StringFilter<"ReserveAccount"> | string
    balanceMinor?: BigIntFilter<"ReserveAccount"> | bigint | number
    authorizedCeilingMinor?: BigIntFilter<"ReserveAccount"> | bigint | number
    attestationHash?: StringNullableFilter<"ReserveAccount"> | string | null
    attestationUrl?: StringNullableFilter<"ReserveAccount"> | string | null
    asOf?: DateTimeNullableFilter<"ReserveAccount"> | Date | string | null
    chain?: EnumStablecoinChainFilter<"ReserveAccount"> | $Enums.StablecoinChain
    metadata?: JsonNullableFilter<"ReserveAccount">
    createdAt?: DateTimeFilter<"ReserveAccount"> | Date | string
    updatedAt?: DateTimeFilter<"ReserveAccount"> | Date | string
    mintRequests?: MintRequestListRelationFilter
  }

  export type ReserveAccountOrderByWithRelationInput = {
    id?: SortOrder
    custodian?: SortOrder
    currency?: SortOrder
    balanceMinor?: SortOrder
    authorizedCeilingMinor?: SortOrder
    attestationHash?: SortOrderInput | SortOrder
    attestationUrl?: SortOrderInput | SortOrder
    asOf?: SortOrderInput | SortOrder
    chain?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    mintRequests?: MintRequestOrderByRelationAggregateInput
  }

  export type ReserveAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReserveAccountWhereInput | ReserveAccountWhereInput[]
    OR?: ReserveAccountWhereInput[]
    NOT?: ReserveAccountWhereInput | ReserveAccountWhereInput[]
    custodian?: StringFilter<"ReserveAccount"> | string
    currency?: StringFilter<"ReserveAccount"> | string
    balanceMinor?: BigIntFilter<"ReserveAccount"> | bigint | number
    authorizedCeilingMinor?: BigIntFilter<"ReserveAccount"> | bigint | number
    attestationHash?: StringNullableFilter<"ReserveAccount"> | string | null
    attestationUrl?: StringNullableFilter<"ReserveAccount"> | string | null
    asOf?: DateTimeNullableFilter<"ReserveAccount"> | Date | string | null
    chain?: EnumStablecoinChainFilter<"ReserveAccount"> | $Enums.StablecoinChain
    metadata?: JsonNullableFilter<"ReserveAccount">
    createdAt?: DateTimeFilter<"ReserveAccount"> | Date | string
    updatedAt?: DateTimeFilter<"ReserveAccount"> | Date | string
    mintRequests?: MintRequestListRelationFilter
  }, "id">

  export type ReserveAccountOrderByWithAggregationInput = {
    id?: SortOrder
    custodian?: SortOrder
    currency?: SortOrder
    balanceMinor?: SortOrder
    authorizedCeilingMinor?: SortOrder
    attestationHash?: SortOrderInput | SortOrder
    attestationUrl?: SortOrderInput | SortOrder
    asOf?: SortOrderInput | SortOrder
    chain?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReserveAccountCountOrderByAggregateInput
    _avg?: ReserveAccountAvgOrderByAggregateInput
    _max?: ReserveAccountMaxOrderByAggregateInput
    _min?: ReserveAccountMinOrderByAggregateInput
    _sum?: ReserveAccountSumOrderByAggregateInput
  }

  export type ReserveAccountScalarWhereWithAggregatesInput = {
    AND?: ReserveAccountScalarWhereWithAggregatesInput | ReserveAccountScalarWhereWithAggregatesInput[]
    OR?: ReserveAccountScalarWhereWithAggregatesInput[]
    NOT?: ReserveAccountScalarWhereWithAggregatesInput | ReserveAccountScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ReserveAccount"> | string
    custodian?: StringWithAggregatesFilter<"ReserveAccount"> | string
    currency?: StringWithAggregatesFilter<"ReserveAccount"> | string
    balanceMinor?: BigIntWithAggregatesFilter<"ReserveAccount"> | bigint | number
    authorizedCeilingMinor?: BigIntWithAggregatesFilter<"ReserveAccount"> | bigint | number
    attestationHash?: StringNullableWithAggregatesFilter<"ReserveAccount"> | string | null
    attestationUrl?: StringNullableWithAggregatesFilter<"ReserveAccount"> | string | null
    asOf?: DateTimeNullableWithAggregatesFilter<"ReserveAccount"> | Date | string | null
    chain?: EnumStablecoinChainWithAggregatesFilter<"ReserveAccount"> | $Enums.StablecoinChain
    metadata?: JsonNullableWithAggregatesFilter<"ReserveAccount">
    createdAt?: DateTimeWithAggregatesFilter<"ReserveAccount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ReserveAccount"> | Date | string
  }

  export type MintRequestWhereInput = {
    AND?: MintRequestWhereInput | MintRequestWhereInput[]
    OR?: MintRequestWhereInput[]
    NOT?: MintRequestWhereInput | MintRequestWhereInput[]
    id?: UuidFilter<"MintRequest"> | string
    orgId?: StringFilter<"MintRequest"> | string
    idempotencyKey?: StringFilter<"MintRequest"> | string
    status?: EnumMintRequestStatusFilter<"MintRequest"> | $Enums.MintRequestStatus
    amountMinor?: BigIntFilter<"MintRequest"> | bigint | number
    currency?: StringFilter<"MintRequest"> | string
    chain?: EnumStablecoinChainFilter<"MintRequest"> | $Enums.StablecoinChain
    reserveAccountId?: UuidFilter<"MintRequest"> | string
    destinationWalletId?: StringNullableFilter<"MintRequest"> | string | null
    destinationAddress?: StringNullableFilter<"MintRequest"> | string | null
    executionTransactionId?: StringNullableFilter<"MintRequest"> | string | null
    txHash?: StringNullableFilter<"MintRequest"> | string | null
    ledgerEntryId?: StringNullableFilter<"MintRequest"> | string | null
    failureReason?: StringNullableFilter<"MintRequest"> | string | null
    metadata?: JsonNullableFilter<"MintRequest">
    createdAt?: DateTimeFilter<"MintRequest"> | Date | string
    updatedAt?: DateTimeFilter<"MintRequest"> | Date | string
    reserveAccount?: XOR<ReserveAccountRelationFilter, ReserveAccountWhereInput>
  }

  export type MintRequestOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    chain?: SortOrder
    reserveAccountId?: SortOrder
    destinationWalletId?: SortOrderInput | SortOrder
    destinationAddress?: SortOrderInput | SortOrder
    executionTransactionId?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    ledgerEntryId?: SortOrderInput | SortOrder
    failureReason?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    reserveAccount?: ReserveAccountOrderByWithRelationInput
  }

  export type MintRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idempotencyKey?: string
    AND?: MintRequestWhereInput | MintRequestWhereInput[]
    OR?: MintRequestWhereInput[]
    NOT?: MintRequestWhereInput | MintRequestWhereInput[]
    orgId?: StringFilter<"MintRequest"> | string
    status?: EnumMintRequestStatusFilter<"MintRequest"> | $Enums.MintRequestStatus
    amountMinor?: BigIntFilter<"MintRequest"> | bigint | number
    currency?: StringFilter<"MintRequest"> | string
    chain?: EnumStablecoinChainFilter<"MintRequest"> | $Enums.StablecoinChain
    reserveAccountId?: UuidFilter<"MintRequest"> | string
    destinationWalletId?: StringNullableFilter<"MintRequest"> | string | null
    destinationAddress?: StringNullableFilter<"MintRequest"> | string | null
    executionTransactionId?: StringNullableFilter<"MintRequest"> | string | null
    txHash?: StringNullableFilter<"MintRequest"> | string | null
    ledgerEntryId?: StringNullableFilter<"MintRequest"> | string | null
    failureReason?: StringNullableFilter<"MintRequest"> | string | null
    metadata?: JsonNullableFilter<"MintRequest">
    createdAt?: DateTimeFilter<"MintRequest"> | Date | string
    updatedAt?: DateTimeFilter<"MintRequest"> | Date | string
    reserveAccount?: XOR<ReserveAccountRelationFilter, ReserveAccountWhereInput>
  }, "id" | "idempotencyKey">

  export type MintRequestOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    chain?: SortOrder
    reserveAccountId?: SortOrder
    destinationWalletId?: SortOrderInput | SortOrder
    destinationAddress?: SortOrderInput | SortOrder
    executionTransactionId?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    ledgerEntryId?: SortOrderInput | SortOrder
    failureReason?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MintRequestCountOrderByAggregateInput
    _avg?: MintRequestAvgOrderByAggregateInput
    _max?: MintRequestMaxOrderByAggregateInput
    _min?: MintRequestMinOrderByAggregateInput
    _sum?: MintRequestSumOrderByAggregateInput
  }

  export type MintRequestScalarWhereWithAggregatesInput = {
    AND?: MintRequestScalarWhereWithAggregatesInput | MintRequestScalarWhereWithAggregatesInput[]
    OR?: MintRequestScalarWhereWithAggregatesInput[]
    NOT?: MintRequestScalarWhereWithAggregatesInput | MintRequestScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"MintRequest"> | string
    orgId?: StringWithAggregatesFilter<"MintRequest"> | string
    idempotencyKey?: StringWithAggregatesFilter<"MintRequest"> | string
    status?: EnumMintRequestStatusWithAggregatesFilter<"MintRequest"> | $Enums.MintRequestStatus
    amountMinor?: BigIntWithAggregatesFilter<"MintRequest"> | bigint | number
    currency?: StringWithAggregatesFilter<"MintRequest"> | string
    chain?: EnumStablecoinChainWithAggregatesFilter<"MintRequest"> | $Enums.StablecoinChain
    reserveAccountId?: UuidWithAggregatesFilter<"MintRequest"> | string
    destinationWalletId?: StringNullableWithAggregatesFilter<"MintRequest"> | string | null
    destinationAddress?: StringNullableWithAggregatesFilter<"MintRequest"> | string | null
    executionTransactionId?: StringNullableWithAggregatesFilter<"MintRequest"> | string | null
    txHash?: StringNullableWithAggregatesFilter<"MintRequest"> | string | null
    ledgerEntryId?: StringNullableWithAggregatesFilter<"MintRequest"> | string | null
    failureReason?: StringNullableWithAggregatesFilter<"MintRequest"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"MintRequest">
    createdAt?: DateTimeWithAggregatesFilter<"MintRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MintRequest"> | Date | string
  }

  export type RedeemRequestWhereInput = {
    AND?: RedeemRequestWhereInput | RedeemRequestWhereInput[]
    OR?: RedeemRequestWhereInput[]
    NOT?: RedeemRequestWhereInput | RedeemRequestWhereInput[]
    id?: UuidFilter<"RedeemRequest"> | string
    orgId?: StringFilter<"RedeemRequest"> | string
    idempotencyKey?: StringFilter<"RedeemRequest"> | string
    status?: EnumRedeemRequestStatusFilter<"RedeemRequest"> | $Enums.RedeemRequestStatus
    amountMinor?: BigIntFilter<"RedeemRequest"> | bigint | number
    currency?: StringFilter<"RedeemRequest"> | string
    chain?: EnumStablecoinChainFilter<"RedeemRequest"> | $Enums.StablecoinChain
    sourceWalletId?: StringFilter<"RedeemRequest"> | string
    payoutRail?: StringFilter<"RedeemRequest"> | string
    executionTransactionId?: StringNullableFilter<"RedeemRequest"> | string | null
    txHash?: StringNullableFilter<"RedeemRequest"> | string | null
    ledgerEntryId?: StringNullableFilter<"RedeemRequest"> | string | null
    failureReason?: StringNullableFilter<"RedeemRequest"> | string | null
    metadata?: JsonNullableFilter<"RedeemRequest">
    createdAt?: DateTimeFilter<"RedeemRequest"> | Date | string
    updatedAt?: DateTimeFilter<"RedeemRequest"> | Date | string
  }

  export type RedeemRequestOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    chain?: SortOrder
    sourceWalletId?: SortOrder
    payoutRail?: SortOrder
    executionTransactionId?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    ledgerEntryId?: SortOrderInput | SortOrder
    failureReason?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RedeemRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    idempotencyKey?: string
    AND?: RedeemRequestWhereInput | RedeemRequestWhereInput[]
    OR?: RedeemRequestWhereInput[]
    NOT?: RedeemRequestWhereInput | RedeemRequestWhereInput[]
    orgId?: StringFilter<"RedeemRequest"> | string
    status?: EnumRedeemRequestStatusFilter<"RedeemRequest"> | $Enums.RedeemRequestStatus
    amountMinor?: BigIntFilter<"RedeemRequest"> | bigint | number
    currency?: StringFilter<"RedeemRequest"> | string
    chain?: EnumStablecoinChainFilter<"RedeemRequest"> | $Enums.StablecoinChain
    sourceWalletId?: StringFilter<"RedeemRequest"> | string
    payoutRail?: StringFilter<"RedeemRequest"> | string
    executionTransactionId?: StringNullableFilter<"RedeemRequest"> | string | null
    txHash?: StringNullableFilter<"RedeemRequest"> | string | null
    ledgerEntryId?: StringNullableFilter<"RedeemRequest"> | string | null
    failureReason?: StringNullableFilter<"RedeemRequest"> | string | null
    metadata?: JsonNullableFilter<"RedeemRequest">
    createdAt?: DateTimeFilter<"RedeemRequest"> | Date | string
    updatedAt?: DateTimeFilter<"RedeemRequest"> | Date | string
  }, "id" | "idempotencyKey">

  export type RedeemRequestOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    chain?: SortOrder
    sourceWalletId?: SortOrder
    payoutRail?: SortOrder
    executionTransactionId?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    ledgerEntryId?: SortOrderInput | SortOrder
    failureReason?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RedeemRequestCountOrderByAggregateInput
    _avg?: RedeemRequestAvgOrderByAggregateInput
    _max?: RedeemRequestMaxOrderByAggregateInput
    _min?: RedeemRequestMinOrderByAggregateInput
    _sum?: RedeemRequestSumOrderByAggregateInput
  }

  export type RedeemRequestScalarWhereWithAggregatesInput = {
    AND?: RedeemRequestScalarWhereWithAggregatesInput | RedeemRequestScalarWhereWithAggregatesInput[]
    OR?: RedeemRequestScalarWhereWithAggregatesInput[]
    NOT?: RedeemRequestScalarWhereWithAggregatesInput | RedeemRequestScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"RedeemRequest"> | string
    orgId?: StringWithAggregatesFilter<"RedeemRequest"> | string
    idempotencyKey?: StringWithAggregatesFilter<"RedeemRequest"> | string
    status?: EnumRedeemRequestStatusWithAggregatesFilter<"RedeemRequest"> | $Enums.RedeemRequestStatus
    amountMinor?: BigIntWithAggregatesFilter<"RedeemRequest"> | bigint | number
    currency?: StringWithAggregatesFilter<"RedeemRequest"> | string
    chain?: EnumStablecoinChainWithAggregatesFilter<"RedeemRequest"> | $Enums.StablecoinChain
    sourceWalletId?: StringWithAggregatesFilter<"RedeemRequest"> | string
    payoutRail?: StringWithAggregatesFilter<"RedeemRequest"> | string
    executionTransactionId?: StringNullableWithAggregatesFilter<"RedeemRequest"> | string | null
    txHash?: StringNullableWithAggregatesFilter<"RedeemRequest"> | string | null
    ledgerEntryId?: StringNullableWithAggregatesFilter<"RedeemRequest"> | string | null
    failureReason?: StringNullableWithAggregatesFilter<"RedeemRequest"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"RedeemRequest">
    createdAt?: DateTimeWithAggregatesFilter<"RedeemRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RedeemRequest"> | Date | string
  }

  export type SupplySnapshotWhereInput = {
    AND?: SupplySnapshotWhereInput | SupplySnapshotWhereInput[]
    OR?: SupplySnapshotWhereInput[]
    NOT?: SupplySnapshotWhereInput | SupplySnapshotWhereInput[]
    id?: UuidFilter<"SupplySnapshot"> | string
    chain?: EnumStablecoinChainFilter<"SupplySnapshot"> | $Enums.StablecoinChain
    onChainSupplyMinor?: BigIntFilter<"SupplySnapshot"> | bigint | number
    reserveTotalMinor?: BigIntFilter<"SupplySnapshot"> | bigint | number
    reserveRatioBps?: IntFilter<"SupplySnapshot"> | number
    capturedAt?: DateTimeFilter<"SupplySnapshot"> | Date | string
  }

  export type SupplySnapshotOrderByWithRelationInput = {
    id?: SortOrder
    chain?: SortOrder
    onChainSupplyMinor?: SortOrder
    reserveTotalMinor?: SortOrder
    reserveRatioBps?: SortOrder
    capturedAt?: SortOrder
  }

  export type SupplySnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SupplySnapshotWhereInput | SupplySnapshotWhereInput[]
    OR?: SupplySnapshotWhereInput[]
    NOT?: SupplySnapshotWhereInput | SupplySnapshotWhereInput[]
    chain?: EnumStablecoinChainFilter<"SupplySnapshot"> | $Enums.StablecoinChain
    onChainSupplyMinor?: BigIntFilter<"SupplySnapshot"> | bigint | number
    reserveTotalMinor?: BigIntFilter<"SupplySnapshot"> | bigint | number
    reserveRatioBps?: IntFilter<"SupplySnapshot"> | number
    capturedAt?: DateTimeFilter<"SupplySnapshot"> | Date | string
  }, "id">

  export type SupplySnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    chain?: SortOrder
    onChainSupplyMinor?: SortOrder
    reserveTotalMinor?: SortOrder
    reserveRatioBps?: SortOrder
    capturedAt?: SortOrder
    _count?: SupplySnapshotCountOrderByAggregateInput
    _avg?: SupplySnapshotAvgOrderByAggregateInput
    _max?: SupplySnapshotMaxOrderByAggregateInput
    _min?: SupplySnapshotMinOrderByAggregateInput
    _sum?: SupplySnapshotSumOrderByAggregateInput
  }

  export type SupplySnapshotScalarWhereWithAggregatesInput = {
    AND?: SupplySnapshotScalarWhereWithAggregatesInput | SupplySnapshotScalarWhereWithAggregatesInput[]
    OR?: SupplySnapshotScalarWhereWithAggregatesInput[]
    NOT?: SupplySnapshotScalarWhereWithAggregatesInput | SupplySnapshotScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"SupplySnapshot"> | string
    chain?: EnumStablecoinChainWithAggregatesFilter<"SupplySnapshot"> | $Enums.StablecoinChain
    onChainSupplyMinor?: BigIntWithAggregatesFilter<"SupplySnapshot"> | bigint | number
    reserveTotalMinor?: BigIntWithAggregatesFilter<"SupplySnapshot"> | bigint | number
    reserveRatioBps?: IntWithAggregatesFilter<"SupplySnapshot"> | number
    capturedAt?: DateTimeWithAggregatesFilter<"SupplySnapshot"> | Date | string
  }

  export type ReserveAttestationWhereInput = {
    AND?: ReserveAttestationWhereInput | ReserveAttestationWhereInput[]
    OR?: ReserveAttestationWhereInput[]
    NOT?: ReserveAttestationWhereInput | ReserveAttestationWhereInput[]
    id?: UuidFilter<"ReserveAttestation"> | string
    reserveAccountId?: UuidFilter<"ReserveAttestation"> | string
    attestationHash?: StringFilter<"ReserveAttestation"> | string
    balanceMinor?: BigIntFilter<"ReserveAttestation"> | bigint | number
    authorizedCeilingMinor?: BigIntFilter<"ReserveAttestation"> | bigint | number
    attestationUrl?: StringNullableFilter<"ReserveAttestation"> | string | null
    asOf?: DateTimeFilter<"ReserveAttestation"> | Date | string
    createdAt?: DateTimeFilter<"ReserveAttestation"> | Date | string
  }

  export type ReserveAttestationOrderByWithRelationInput = {
    id?: SortOrder
    reserveAccountId?: SortOrder
    attestationHash?: SortOrder
    balanceMinor?: SortOrder
    authorizedCeilingMinor?: SortOrder
    attestationUrl?: SortOrderInput | SortOrder
    asOf?: SortOrder
    createdAt?: SortOrder
  }

  export type ReserveAttestationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReserveAttestationWhereInput | ReserveAttestationWhereInput[]
    OR?: ReserveAttestationWhereInput[]
    NOT?: ReserveAttestationWhereInput | ReserveAttestationWhereInput[]
    reserveAccountId?: UuidFilter<"ReserveAttestation"> | string
    attestationHash?: StringFilter<"ReserveAttestation"> | string
    balanceMinor?: BigIntFilter<"ReserveAttestation"> | bigint | number
    authorizedCeilingMinor?: BigIntFilter<"ReserveAttestation"> | bigint | number
    attestationUrl?: StringNullableFilter<"ReserveAttestation"> | string | null
    asOf?: DateTimeFilter<"ReserveAttestation"> | Date | string
    createdAt?: DateTimeFilter<"ReserveAttestation"> | Date | string
  }, "id">

  export type ReserveAttestationOrderByWithAggregationInput = {
    id?: SortOrder
    reserveAccountId?: SortOrder
    attestationHash?: SortOrder
    balanceMinor?: SortOrder
    authorizedCeilingMinor?: SortOrder
    attestationUrl?: SortOrderInput | SortOrder
    asOf?: SortOrder
    createdAt?: SortOrder
    _count?: ReserveAttestationCountOrderByAggregateInput
    _avg?: ReserveAttestationAvgOrderByAggregateInput
    _max?: ReserveAttestationMaxOrderByAggregateInput
    _min?: ReserveAttestationMinOrderByAggregateInput
    _sum?: ReserveAttestationSumOrderByAggregateInput
  }

  export type ReserveAttestationScalarWhereWithAggregatesInput = {
    AND?: ReserveAttestationScalarWhereWithAggregatesInput | ReserveAttestationScalarWhereWithAggregatesInput[]
    OR?: ReserveAttestationScalarWhereWithAggregatesInput[]
    NOT?: ReserveAttestationScalarWhereWithAggregatesInput | ReserveAttestationScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ReserveAttestation"> | string
    reserveAccountId?: UuidWithAggregatesFilter<"ReserveAttestation"> | string
    attestationHash?: StringWithAggregatesFilter<"ReserveAttestation"> | string
    balanceMinor?: BigIntWithAggregatesFilter<"ReserveAttestation"> | bigint | number
    authorizedCeilingMinor?: BigIntWithAggregatesFilter<"ReserveAttestation"> | bigint | number
    attestationUrl?: StringNullableWithAggregatesFilter<"ReserveAttestation"> | string | null
    asOf?: DateTimeWithAggregatesFilter<"ReserveAttestation"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ReserveAttestation"> | Date | string
  }

  export type ReserveAccountCreateInput = {
    id?: string
    custodian: string
    currency?: string
    balanceMinor: bigint | number
    authorizedCeilingMinor: bigint | number
    attestationHash?: string | null
    attestationUrl?: string | null
    asOf?: Date | string | null
    chain?: $Enums.StablecoinChain
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    mintRequests?: MintRequestCreateNestedManyWithoutReserveAccountInput
  }

  export type ReserveAccountUncheckedCreateInput = {
    id?: string
    custodian: string
    currency?: string
    balanceMinor: bigint | number
    authorizedCeilingMinor: bigint | number
    attestationHash?: string | null
    attestationUrl?: string | null
    asOf?: Date | string | null
    chain?: $Enums.StablecoinChain
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    mintRequests?: MintRequestUncheckedCreateNestedManyWithoutReserveAccountInput
  }

  export type ReserveAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    custodian?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balanceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    authorizedCeilingMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    attestationHash?: NullableStringFieldUpdateOperationsInput | string | null
    attestationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    asOf?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mintRequests?: MintRequestUpdateManyWithoutReserveAccountNestedInput
  }

  export type ReserveAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    custodian?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balanceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    authorizedCeilingMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    attestationHash?: NullableStringFieldUpdateOperationsInput | string | null
    attestationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    asOf?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mintRequests?: MintRequestUncheckedUpdateManyWithoutReserveAccountNestedInput
  }

  export type ReserveAccountCreateManyInput = {
    id?: string
    custodian: string
    currency?: string
    balanceMinor: bigint | number
    authorizedCeilingMinor: bigint | number
    attestationHash?: string | null
    attestationUrl?: string | null
    asOf?: Date | string | null
    chain?: $Enums.StablecoinChain
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReserveAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    custodian?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balanceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    authorizedCeilingMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    attestationHash?: NullableStringFieldUpdateOperationsInput | string | null
    attestationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    asOf?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReserveAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    custodian?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balanceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    authorizedCeilingMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    attestationHash?: NullableStringFieldUpdateOperationsInput | string | null
    attestationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    asOf?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MintRequestCreateInput = {
    id?: string
    orgId: string
    idempotencyKey: string
    status?: $Enums.MintRequestStatus
    amountMinor: bigint | number
    currency?: string
    chain?: $Enums.StablecoinChain
    destinationWalletId?: string | null
    destinationAddress?: string | null
    executionTransactionId?: string | null
    txHash?: string | null
    ledgerEntryId?: string | null
    failureReason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    reserveAccount: ReserveAccountCreateNestedOneWithoutMintRequestsInput
  }

  export type MintRequestUncheckedCreateInput = {
    id?: string
    orgId: string
    idempotencyKey: string
    status?: $Enums.MintRequestStatus
    amountMinor: bigint | number
    currency?: string
    chain?: $Enums.StablecoinChain
    reserveAccountId: string
    destinationWalletId?: string | null
    destinationAddress?: string | null
    executionTransactionId?: string | null
    txHash?: string | null
    ledgerEntryId?: string | null
    failureReason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MintRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumMintRequestStatusFieldUpdateOperationsInput | $Enums.MintRequestStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    destinationWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reserveAccount?: ReserveAccountUpdateOneRequiredWithoutMintRequestsNestedInput
  }

  export type MintRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumMintRequestStatusFieldUpdateOperationsInput | $Enums.MintRequestStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    reserveAccountId?: StringFieldUpdateOperationsInput | string
    destinationWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MintRequestCreateManyInput = {
    id?: string
    orgId: string
    idempotencyKey: string
    status?: $Enums.MintRequestStatus
    amountMinor: bigint | number
    currency?: string
    chain?: $Enums.StablecoinChain
    reserveAccountId: string
    destinationWalletId?: string | null
    destinationAddress?: string | null
    executionTransactionId?: string | null
    txHash?: string | null
    ledgerEntryId?: string | null
    failureReason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MintRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumMintRequestStatusFieldUpdateOperationsInput | $Enums.MintRequestStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    destinationWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MintRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumMintRequestStatusFieldUpdateOperationsInput | $Enums.MintRequestStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    reserveAccountId?: StringFieldUpdateOperationsInput | string
    destinationWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RedeemRequestCreateInput = {
    id?: string
    orgId: string
    idempotencyKey: string
    status?: $Enums.RedeemRequestStatus
    amountMinor: bigint | number
    currency?: string
    chain?: $Enums.StablecoinChain
    sourceWalletId: string
    payoutRail: string
    executionTransactionId?: string | null
    txHash?: string | null
    ledgerEntryId?: string | null
    failureReason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RedeemRequestUncheckedCreateInput = {
    id?: string
    orgId: string
    idempotencyKey: string
    status?: $Enums.RedeemRequestStatus
    amountMinor: bigint | number
    currency?: string
    chain?: $Enums.StablecoinChain
    sourceWalletId: string
    payoutRail: string
    executionTransactionId?: string | null
    txHash?: string | null
    ledgerEntryId?: string | null
    failureReason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RedeemRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumRedeemRequestStatusFieldUpdateOperationsInput | $Enums.RedeemRequestStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    sourceWalletId?: StringFieldUpdateOperationsInput | string
    payoutRail?: StringFieldUpdateOperationsInput | string
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RedeemRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumRedeemRequestStatusFieldUpdateOperationsInput | $Enums.RedeemRequestStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    sourceWalletId?: StringFieldUpdateOperationsInput | string
    payoutRail?: StringFieldUpdateOperationsInput | string
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RedeemRequestCreateManyInput = {
    id?: string
    orgId: string
    idempotencyKey: string
    status?: $Enums.RedeemRequestStatus
    amountMinor: bigint | number
    currency?: string
    chain?: $Enums.StablecoinChain
    sourceWalletId: string
    payoutRail: string
    executionTransactionId?: string | null
    txHash?: string | null
    ledgerEntryId?: string | null
    failureReason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RedeemRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumRedeemRequestStatusFieldUpdateOperationsInput | $Enums.RedeemRequestStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    sourceWalletId?: StringFieldUpdateOperationsInput | string
    payoutRail?: StringFieldUpdateOperationsInput | string
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RedeemRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumRedeemRequestStatusFieldUpdateOperationsInput | $Enums.RedeemRequestStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    sourceWalletId?: StringFieldUpdateOperationsInput | string
    payoutRail?: StringFieldUpdateOperationsInput | string
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplySnapshotCreateInput = {
    id?: string
    chain: $Enums.StablecoinChain
    onChainSupplyMinor: bigint | number
    reserveTotalMinor: bigint | number
    reserveRatioBps: number
    capturedAt?: Date | string
  }

  export type SupplySnapshotUncheckedCreateInput = {
    id?: string
    chain: $Enums.StablecoinChain
    onChainSupplyMinor: bigint | number
    reserveTotalMinor: bigint | number
    reserveRatioBps: number
    capturedAt?: Date | string
  }

  export type SupplySnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    onChainSupplyMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    reserveTotalMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    reserveRatioBps?: IntFieldUpdateOperationsInput | number
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplySnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    onChainSupplyMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    reserveTotalMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    reserveRatioBps?: IntFieldUpdateOperationsInput | number
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplySnapshotCreateManyInput = {
    id?: string
    chain: $Enums.StablecoinChain
    onChainSupplyMinor: bigint | number
    reserveTotalMinor: bigint | number
    reserveRatioBps: number
    capturedAt?: Date | string
  }

  export type SupplySnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    onChainSupplyMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    reserveTotalMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    reserveRatioBps?: IntFieldUpdateOperationsInput | number
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplySnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    onChainSupplyMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    reserveTotalMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    reserveRatioBps?: IntFieldUpdateOperationsInput | number
    capturedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReserveAttestationCreateInput = {
    id?: string
    reserveAccountId: string
    attestationHash: string
    balanceMinor: bigint | number
    authorizedCeilingMinor: bigint | number
    attestationUrl?: string | null
    asOf: Date | string
    createdAt?: Date | string
  }

  export type ReserveAttestationUncheckedCreateInput = {
    id?: string
    reserveAccountId: string
    attestationHash: string
    balanceMinor: bigint | number
    authorizedCeilingMinor: bigint | number
    attestationUrl?: string | null
    asOf: Date | string
    createdAt?: Date | string
  }

  export type ReserveAttestationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reserveAccountId?: StringFieldUpdateOperationsInput | string
    attestationHash?: StringFieldUpdateOperationsInput | string
    balanceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    authorizedCeilingMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    attestationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    asOf?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReserveAttestationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reserveAccountId?: StringFieldUpdateOperationsInput | string
    attestationHash?: StringFieldUpdateOperationsInput | string
    balanceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    authorizedCeilingMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    attestationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    asOf?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReserveAttestationCreateManyInput = {
    id?: string
    reserveAccountId: string
    attestationHash: string
    balanceMinor: bigint | number
    authorizedCeilingMinor: bigint | number
    attestationUrl?: string | null
    asOf: Date | string
    createdAt?: Date | string
  }

  export type ReserveAttestationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reserveAccountId?: StringFieldUpdateOperationsInput | string
    attestationHash?: StringFieldUpdateOperationsInput | string
    balanceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    authorizedCeilingMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    attestationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    asOf?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReserveAttestationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reserveAccountId?: StringFieldUpdateOperationsInput | string
    attestationHash?: StringFieldUpdateOperationsInput | string
    balanceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    authorizedCeilingMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    attestationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    asOf?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumStablecoinChainFilter<$PrismaModel = never> = {
    equals?: $Enums.StablecoinChain | EnumStablecoinChainFieldRefInput<$PrismaModel>
    in?: $Enums.StablecoinChain[] | ListEnumStablecoinChainFieldRefInput<$PrismaModel>
    notIn?: $Enums.StablecoinChain[] | ListEnumStablecoinChainFieldRefInput<$PrismaModel>
    not?: NestedEnumStablecoinChainFilter<$PrismaModel> | $Enums.StablecoinChain
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

  export type MintRequestListRelationFilter = {
    every?: MintRequestWhereInput
    some?: MintRequestWhereInput
    none?: MintRequestWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MintRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReserveAccountCountOrderByAggregateInput = {
    id?: SortOrder
    custodian?: SortOrder
    currency?: SortOrder
    balanceMinor?: SortOrder
    authorizedCeilingMinor?: SortOrder
    attestationHash?: SortOrder
    attestationUrl?: SortOrder
    asOf?: SortOrder
    chain?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReserveAccountAvgOrderByAggregateInput = {
    balanceMinor?: SortOrder
    authorizedCeilingMinor?: SortOrder
  }

  export type ReserveAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    custodian?: SortOrder
    currency?: SortOrder
    balanceMinor?: SortOrder
    authorizedCeilingMinor?: SortOrder
    attestationHash?: SortOrder
    attestationUrl?: SortOrder
    asOf?: SortOrder
    chain?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReserveAccountMinOrderByAggregateInput = {
    id?: SortOrder
    custodian?: SortOrder
    currency?: SortOrder
    balanceMinor?: SortOrder
    authorizedCeilingMinor?: SortOrder
    attestationHash?: SortOrder
    attestationUrl?: SortOrder
    asOf?: SortOrder
    chain?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReserveAccountSumOrderByAggregateInput = {
    balanceMinor?: SortOrder
    authorizedCeilingMinor?: SortOrder
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

  export type EnumStablecoinChainWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StablecoinChain | EnumStablecoinChainFieldRefInput<$PrismaModel>
    in?: $Enums.StablecoinChain[] | ListEnumStablecoinChainFieldRefInput<$PrismaModel>
    notIn?: $Enums.StablecoinChain[] | ListEnumStablecoinChainFieldRefInput<$PrismaModel>
    not?: NestedEnumStablecoinChainWithAggregatesFilter<$PrismaModel> | $Enums.StablecoinChain
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStablecoinChainFilter<$PrismaModel>
    _max?: NestedEnumStablecoinChainFilter<$PrismaModel>
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

  export type EnumMintRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MintRequestStatus | EnumMintRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MintRequestStatus[] | ListEnumMintRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MintRequestStatus[] | ListEnumMintRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMintRequestStatusFilter<$PrismaModel> | $Enums.MintRequestStatus
  }

  export type ReserveAccountRelationFilter = {
    is?: ReserveAccountWhereInput
    isNot?: ReserveAccountWhereInput
  }

  export type MintRequestCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    chain?: SortOrder
    reserveAccountId?: SortOrder
    destinationWalletId?: SortOrder
    destinationAddress?: SortOrder
    executionTransactionId?: SortOrder
    txHash?: SortOrder
    ledgerEntryId?: SortOrder
    failureReason?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MintRequestAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type MintRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    chain?: SortOrder
    reserveAccountId?: SortOrder
    destinationWalletId?: SortOrder
    destinationAddress?: SortOrder
    executionTransactionId?: SortOrder
    txHash?: SortOrder
    ledgerEntryId?: SortOrder
    failureReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MintRequestMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    chain?: SortOrder
    reserveAccountId?: SortOrder
    destinationWalletId?: SortOrder
    destinationAddress?: SortOrder
    executionTransactionId?: SortOrder
    txHash?: SortOrder
    ledgerEntryId?: SortOrder
    failureReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MintRequestSumOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type EnumMintRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MintRequestStatus | EnumMintRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MintRequestStatus[] | ListEnumMintRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MintRequestStatus[] | ListEnumMintRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMintRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.MintRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMintRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumMintRequestStatusFilter<$PrismaModel>
  }

  export type EnumRedeemRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RedeemRequestStatus | EnumRedeemRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RedeemRequestStatus[] | ListEnumRedeemRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RedeemRequestStatus[] | ListEnumRedeemRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRedeemRequestStatusFilter<$PrismaModel> | $Enums.RedeemRequestStatus
  }

  export type RedeemRequestCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    chain?: SortOrder
    sourceWalletId?: SortOrder
    payoutRail?: SortOrder
    executionTransactionId?: SortOrder
    txHash?: SortOrder
    ledgerEntryId?: SortOrder
    failureReason?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RedeemRequestAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type RedeemRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    chain?: SortOrder
    sourceWalletId?: SortOrder
    payoutRail?: SortOrder
    executionTransactionId?: SortOrder
    txHash?: SortOrder
    ledgerEntryId?: SortOrder
    failureReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RedeemRequestMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    chain?: SortOrder
    sourceWalletId?: SortOrder
    payoutRail?: SortOrder
    executionTransactionId?: SortOrder
    txHash?: SortOrder
    ledgerEntryId?: SortOrder
    failureReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RedeemRequestSumOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type EnumRedeemRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RedeemRequestStatus | EnumRedeemRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RedeemRequestStatus[] | ListEnumRedeemRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RedeemRequestStatus[] | ListEnumRedeemRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRedeemRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RedeemRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRedeemRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRedeemRequestStatusFilter<$PrismaModel>
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

  export type SupplySnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    onChainSupplyMinor?: SortOrder
    reserveTotalMinor?: SortOrder
    reserveRatioBps?: SortOrder
    capturedAt?: SortOrder
  }

  export type SupplySnapshotAvgOrderByAggregateInput = {
    onChainSupplyMinor?: SortOrder
    reserveTotalMinor?: SortOrder
    reserveRatioBps?: SortOrder
  }

  export type SupplySnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    onChainSupplyMinor?: SortOrder
    reserveTotalMinor?: SortOrder
    reserveRatioBps?: SortOrder
    capturedAt?: SortOrder
  }

  export type SupplySnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    onChainSupplyMinor?: SortOrder
    reserveTotalMinor?: SortOrder
    reserveRatioBps?: SortOrder
    capturedAt?: SortOrder
  }

  export type SupplySnapshotSumOrderByAggregateInput = {
    onChainSupplyMinor?: SortOrder
    reserveTotalMinor?: SortOrder
    reserveRatioBps?: SortOrder
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

  export type ReserveAttestationCountOrderByAggregateInput = {
    id?: SortOrder
    reserveAccountId?: SortOrder
    attestationHash?: SortOrder
    balanceMinor?: SortOrder
    authorizedCeilingMinor?: SortOrder
    attestationUrl?: SortOrder
    asOf?: SortOrder
    createdAt?: SortOrder
  }

  export type ReserveAttestationAvgOrderByAggregateInput = {
    balanceMinor?: SortOrder
    authorizedCeilingMinor?: SortOrder
  }

  export type ReserveAttestationMaxOrderByAggregateInput = {
    id?: SortOrder
    reserveAccountId?: SortOrder
    attestationHash?: SortOrder
    balanceMinor?: SortOrder
    authorizedCeilingMinor?: SortOrder
    attestationUrl?: SortOrder
    asOf?: SortOrder
    createdAt?: SortOrder
  }

  export type ReserveAttestationMinOrderByAggregateInput = {
    id?: SortOrder
    reserveAccountId?: SortOrder
    attestationHash?: SortOrder
    balanceMinor?: SortOrder
    authorizedCeilingMinor?: SortOrder
    attestationUrl?: SortOrder
    asOf?: SortOrder
    createdAt?: SortOrder
  }

  export type ReserveAttestationSumOrderByAggregateInput = {
    balanceMinor?: SortOrder
    authorizedCeilingMinor?: SortOrder
  }

  export type MintRequestCreateNestedManyWithoutReserveAccountInput = {
    create?: XOR<MintRequestCreateWithoutReserveAccountInput, MintRequestUncheckedCreateWithoutReserveAccountInput> | MintRequestCreateWithoutReserveAccountInput[] | MintRequestUncheckedCreateWithoutReserveAccountInput[]
    connectOrCreate?: MintRequestCreateOrConnectWithoutReserveAccountInput | MintRequestCreateOrConnectWithoutReserveAccountInput[]
    createMany?: MintRequestCreateManyReserveAccountInputEnvelope
    connect?: MintRequestWhereUniqueInput | MintRequestWhereUniqueInput[]
  }

  export type MintRequestUncheckedCreateNestedManyWithoutReserveAccountInput = {
    create?: XOR<MintRequestCreateWithoutReserveAccountInput, MintRequestUncheckedCreateWithoutReserveAccountInput> | MintRequestCreateWithoutReserveAccountInput[] | MintRequestUncheckedCreateWithoutReserveAccountInput[]
    connectOrCreate?: MintRequestCreateOrConnectWithoutReserveAccountInput | MintRequestCreateOrConnectWithoutReserveAccountInput[]
    createMany?: MintRequestCreateManyReserveAccountInputEnvelope
    connect?: MintRequestWhereUniqueInput | MintRequestWhereUniqueInput[]
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

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumStablecoinChainFieldUpdateOperationsInput = {
    set?: $Enums.StablecoinChain
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MintRequestUpdateManyWithoutReserveAccountNestedInput = {
    create?: XOR<MintRequestCreateWithoutReserveAccountInput, MintRequestUncheckedCreateWithoutReserveAccountInput> | MintRequestCreateWithoutReserveAccountInput[] | MintRequestUncheckedCreateWithoutReserveAccountInput[]
    connectOrCreate?: MintRequestCreateOrConnectWithoutReserveAccountInput | MintRequestCreateOrConnectWithoutReserveAccountInput[]
    upsert?: MintRequestUpsertWithWhereUniqueWithoutReserveAccountInput | MintRequestUpsertWithWhereUniqueWithoutReserveAccountInput[]
    createMany?: MintRequestCreateManyReserveAccountInputEnvelope
    set?: MintRequestWhereUniqueInput | MintRequestWhereUniqueInput[]
    disconnect?: MintRequestWhereUniqueInput | MintRequestWhereUniqueInput[]
    delete?: MintRequestWhereUniqueInput | MintRequestWhereUniqueInput[]
    connect?: MintRequestWhereUniqueInput | MintRequestWhereUniqueInput[]
    update?: MintRequestUpdateWithWhereUniqueWithoutReserveAccountInput | MintRequestUpdateWithWhereUniqueWithoutReserveAccountInput[]
    updateMany?: MintRequestUpdateManyWithWhereWithoutReserveAccountInput | MintRequestUpdateManyWithWhereWithoutReserveAccountInput[]
    deleteMany?: MintRequestScalarWhereInput | MintRequestScalarWhereInput[]
  }

  export type MintRequestUncheckedUpdateManyWithoutReserveAccountNestedInput = {
    create?: XOR<MintRequestCreateWithoutReserveAccountInput, MintRequestUncheckedCreateWithoutReserveAccountInput> | MintRequestCreateWithoutReserveAccountInput[] | MintRequestUncheckedCreateWithoutReserveAccountInput[]
    connectOrCreate?: MintRequestCreateOrConnectWithoutReserveAccountInput | MintRequestCreateOrConnectWithoutReserveAccountInput[]
    upsert?: MintRequestUpsertWithWhereUniqueWithoutReserveAccountInput | MintRequestUpsertWithWhereUniqueWithoutReserveAccountInput[]
    createMany?: MintRequestCreateManyReserveAccountInputEnvelope
    set?: MintRequestWhereUniqueInput | MintRequestWhereUniqueInput[]
    disconnect?: MintRequestWhereUniqueInput | MintRequestWhereUniqueInput[]
    delete?: MintRequestWhereUniqueInput | MintRequestWhereUniqueInput[]
    connect?: MintRequestWhereUniqueInput | MintRequestWhereUniqueInput[]
    update?: MintRequestUpdateWithWhereUniqueWithoutReserveAccountInput | MintRequestUpdateWithWhereUniqueWithoutReserveAccountInput[]
    updateMany?: MintRequestUpdateManyWithWhereWithoutReserveAccountInput | MintRequestUpdateManyWithWhereWithoutReserveAccountInput[]
    deleteMany?: MintRequestScalarWhereInput | MintRequestScalarWhereInput[]
  }

  export type ReserveAccountCreateNestedOneWithoutMintRequestsInput = {
    create?: XOR<ReserveAccountCreateWithoutMintRequestsInput, ReserveAccountUncheckedCreateWithoutMintRequestsInput>
    connectOrCreate?: ReserveAccountCreateOrConnectWithoutMintRequestsInput
    connect?: ReserveAccountWhereUniqueInput
  }

  export type EnumMintRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.MintRequestStatus
  }

  export type ReserveAccountUpdateOneRequiredWithoutMintRequestsNestedInput = {
    create?: XOR<ReserveAccountCreateWithoutMintRequestsInput, ReserveAccountUncheckedCreateWithoutMintRequestsInput>
    connectOrCreate?: ReserveAccountCreateOrConnectWithoutMintRequestsInput
    upsert?: ReserveAccountUpsertWithoutMintRequestsInput
    connect?: ReserveAccountWhereUniqueInput
    update?: XOR<XOR<ReserveAccountUpdateToOneWithWhereWithoutMintRequestsInput, ReserveAccountUpdateWithoutMintRequestsInput>, ReserveAccountUncheckedUpdateWithoutMintRequestsInput>
  }

  export type EnumRedeemRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.RedeemRequestStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
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

  export type NestedEnumStablecoinChainFilter<$PrismaModel = never> = {
    equals?: $Enums.StablecoinChain | EnumStablecoinChainFieldRefInput<$PrismaModel>
    in?: $Enums.StablecoinChain[] | ListEnumStablecoinChainFieldRefInput<$PrismaModel>
    notIn?: $Enums.StablecoinChain[] | ListEnumStablecoinChainFieldRefInput<$PrismaModel>
    not?: NestedEnumStablecoinChainFilter<$PrismaModel> | $Enums.StablecoinChain
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

  export type NestedEnumStablecoinChainWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StablecoinChain | EnumStablecoinChainFieldRefInput<$PrismaModel>
    in?: $Enums.StablecoinChain[] | ListEnumStablecoinChainFieldRefInput<$PrismaModel>
    notIn?: $Enums.StablecoinChain[] | ListEnumStablecoinChainFieldRefInput<$PrismaModel>
    not?: NestedEnumStablecoinChainWithAggregatesFilter<$PrismaModel> | $Enums.StablecoinChain
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStablecoinChainFilter<$PrismaModel>
    _max?: NestedEnumStablecoinChainFilter<$PrismaModel>
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

  export type NestedEnumMintRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MintRequestStatus | EnumMintRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MintRequestStatus[] | ListEnumMintRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MintRequestStatus[] | ListEnumMintRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMintRequestStatusFilter<$PrismaModel> | $Enums.MintRequestStatus
  }

  export type NestedEnumMintRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MintRequestStatus | EnumMintRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MintRequestStatus[] | ListEnumMintRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MintRequestStatus[] | ListEnumMintRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMintRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.MintRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMintRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumMintRequestStatusFilter<$PrismaModel>
  }

  export type NestedEnumRedeemRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RedeemRequestStatus | EnumRedeemRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RedeemRequestStatus[] | ListEnumRedeemRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RedeemRequestStatus[] | ListEnumRedeemRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRedeemRequestStatusFilter<$PrismaModel> | $Enums.RedeemRequestStatus
  }

  export type NestedEnumRedeemRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RedeemRequestStatus | EnumRedeemRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RedeemRequestStatus[] | ListEnumRedeemRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RedeemRequestStatus[] | ListEnumRedeemRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRedeemRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RedeemRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRedeemRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRedeemRequestStatusFilter<$PrismaModel>
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

  export type MintRequestCreateWithoutReserveAccountInput = {
    id?: string
    orgId: string
    idempotencyKey: string
    status?: $Enums.MintRequestStatus
    amountMinor: bigint | number
    currency?: string
    chain?: $Enums.StablecoinChain
    destinationWalletId?: string | null
    destinationAddress?: string | null
    executionTransactionId?: string | null
    txHash?: string | null
    ledgerEntryId?: string | null
    failureReason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MintRequestUncheckedCreateWithoutReserveAccountInput = {
    id?: string
    orgId: string
    idempotencyKey: string
    status?: $Enums.MintRequestStatus
    amountMinor: bigint | number
    currency?: string
    chain?: $Enums.StablecoinChain
    destinationWalletId?: string | null
    destinationAddress?: string | null
    executionTransactionId?: string | null
    txHash?: string | null
    ledgerEntryId?: string | null
    failureReason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MintRequestCreateOrConnectWithoutReserveAccountInput = {
    where: MintRequestWhereUniqueInput
    create: XOR<MintRequestCreateWithoutReserveAccountInput, MintRequestUncheckedCreateWithoutReserveAccountInput>
  }

  export type MintRequestCreateManyReserveAccountInputEnvelope = {
    data: MintRequestCreateManyReserveAccountInput | MintRequestCreateManyReserveAccountInput[]
    skipDuplicates?: boolean
  }

  export type MintRequestUpsertWithWhereUniqueWithoutReserveAccountInput = {
    where: MintRequestWhereUniqueInput
    update: XOR<MintRequestUpdateWithoutReserveAccountInput, MintRequestUncheckedUpdateWithoutReserveAccountInput>
    create: XOR<MintRequestCreateWithoutReserveAccountInput, MintRequestUncheckedCreateWithoutReserveAccountInput>
  }

  export type MintRequestUpdateWithWhereUniqueWithoutReserveAccountInput = {
    where: MintRequestWhereUniqueInput
    data: XOR<MintRequestUpdateWithoutReserveAccountInput, MintRequestUncheckedUpdateWithoutReserveAccountInput>
  }

  export type MintRequestUpdateManyWithWhereWithoutReserveAccountInput = {
    where: MintRequestScalarWhereInput
    data: XOR<MintRequestUpdateManyMutationInput, MintRequestUncheckedUpdateManyWithoutReserveAccountInput>
  }

  export type MintRequestScalarWhereInput = {
    AND?: MintRequestScalarWhereInput | MintRequestScalarWhereInput[]
    OR?: MintRequestScalarWhereInput[]
    NOT?: MintRequestScalarWhereInput | MintRequestScalarWhereInput[]
    id?: UuidFilter<"MintRequest"> | string
    orgId?: StringFilter<"MintRequest"> | string
    idempotencyKey?: StringFilter<"MintRequest"> | string
    status?: EnumMintRequestStatusFilter<"MintRequest"> | $Enums.MintRequestStatus
    amountMinor?: BigIntFilter<"MintRequest"> | bigint | number
    currency?: StringFilter<"MintRequest"> | string
    chain?: EnumStablecoinChainFilter<"MintRequest"> | $Enums.StablecoinChain
    reserveAccountId?: UuidFilter<"MintRequest"> | string
    destinationWalletId?: StringNullableFilter<"MintRequest"> | string | null
    destinationAddress?: StringNullableFilter<"MintRequest"> | string | null
    executionTransactionId?: StringNullableFilter<"MintRequest"> | string | null
    txHash?: StringNullableFilter<"MintRequest"> | string | null
    ledgerEntryId?: StringNullableFilter<"MintRequest"> | string | null
    failureReason?: StringNullableFilter<"MintRequest"> | string | null
    metadata?: JsonNullableFilter<"MintRequest">
    createdAt?: DateTimeFilter<"MintRequest"> | Date | string
    updatedAt?: DateTimeFilter<"MintRequest"> | Date | string
  }

  export type ReserveAccountCreateWithoutMintRequestsInput = {
    id?: string
    custodian: string
    currency?: string
    balanceMinor: bigint | number
    authorizedCeilingMinor: bigint | number
    attestationHash?: string | null
    attestationUrl?: string | null
    asOf?: Date | string | null
    chain?: $Enums.StablecoinChain
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReserveAccountUncheckedCreateWithoutMintRequestsInput = {
    id?: string
    custodian: string
    currency?: string
    balanceMinor: bigint | number
    authorizedCeilingMinor: bigint | number
    attestationHash?: string | null
    attestationUrl?: string | null
    asOf?: Date | string | null
    chain?: $Enums.StablecoinChain
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReserveAccountCreateOrConnectWithoutMintRequestsInput = {
    where: ReserveAccountWhereUniqueInput
    create: XOR<ReserveAccountCreateWithoutMintRequestsInput, ReserveAccountUncheckedCreateWithoutMintRequestsInput>
  }

  export type ReserveAccountUpsertWithoutMintRequestsInput = {
    update: XOR<ReserveAccountUpdateWithoutMintRequestsInput, ReserveAccountUncheckedUpdateWithoutMintRequestsInput>
    create: XOR<ReserveAccountCreateWithoutMintRequestsInput, ReserveAccountUncheckedCreateWithoutMintRequestsInput>
    where?: ReserveAccountWhereInput
  }

  export type ReserveAccountUpdateToOneWithWhereWithoutMintRequestsInput = {
    where?: ReserveAccountWhereInput
    data: XOR<ReserveAccountUpdateWithoutMintRequestsInput, ReserveAccountUncheckedUpdateWithoutMintRequestsInput>
  }

  export type ReserveAccountUpdateWithoutMintRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    custodian?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balanceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    authorizedCeilingMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    attestationHash?: NullableStringFieldUpdateOperationsInput | string | null
    attestationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    asOf?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReserveAccountUncheckedUpdateWithoutMintRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    custodian?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    balanceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    authorizedCeilingMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    attestationHash?: NullableStringFieldUpdateOperationsInput | string | null
    attestationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    asOf?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MintRequestCreateManyReserveAccountInput = {
    id?: string
    orgId: string
    idempotencyKey: string
    status?: $Enums.MintRequestStatus
    amountMinor: bigint | number
    currency?: string
    chain?: $Enums.StablecoinChain
    destinationWalletId?: string | null
    destinationAddress?: string | null
    executionTransactionId?: string | null
    txHash?: string | null
    ledgerEntryId?: string | null
    failureReason?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MintRequestUpdateWithoutReserveAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumMintRequestStatusFieldUpdateOperationsInput | $Enums.MintRequestStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    destinationWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MintRequestUncheckedUpdateWithoutReserveAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumMintRequestStatusFieldUpdateOperationsInput | $Enums.MintRequestStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    destinationWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MintRequestUncheckedUpdateManyWithoutReserveAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    status?: EnumMintRequestStatusFieldUpdateOperationsInput | $Enums.MintRequestStatus
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    chain?: EnumStablecoinChainFieldUpdateOperationsInput | $Enums.StablecoinChain
    destinationWalletId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    executionTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    ledgerEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ReserveAccountCountOutputTypeDefaultArgs instead
     */
    export type ReserveAccountCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReserveAccountCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReserveAccountDefaultArgs instead
     */
    export type ReserveAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReserveAccountDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MintRequestDefaultArgs instead
     */
    export type MintRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MintRequestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RedeemRequestDefaultArgs instead
     */
    export type RedeemRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RedeemRequestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SupplySnapshotDefaultArgs instead
     */
    export type SupplySnapshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SupplySnapshotDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReserveAttestationDefaultArgs instead
     */
    export type ReserveAttestationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReserveAttestationDefaultArgs<ExtArgs>

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