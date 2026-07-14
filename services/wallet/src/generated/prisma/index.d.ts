
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
 * Model Wallet
 * 
 */
export type Wallet = $Result.DefaultSelection<Prisma.$WalletPayload>
/**
 * Model WalletPolicy
 * 
 */
export type WalletPolicy = $Result.DefaultSelection<Prisma.$WalletPolicyPayload>
/**
 * Model BroadcastJob
 * 
 */
export type BroadcastJob = $Result.DefaultSelection<Prisma.$BroadcastJobPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Chain: {
  BASE: 'BASE',
  XRPL: 'XRPL',
  ETHEREUM: 'ETHEREUM',
  POLYGON: 'POLYGON',
  INTERNAL: 'INTERNAL',
  SALY_L3: 'SALY_L3'
};

export type Chain = (typeof Chain)[keyof typeof Chain]


export const WalletKind: {
  USER_CUSTODIAL: 'USER_CUSTODIAL',
  BUSINESS_CUSTODIAL: 'BUSINESS_CUSTODIAL',
  AGENT_CUSTODIAL: 'AGENT_CUSTODIAL',
  TREASURY: 'TREASURY',
  HOT_OPERATIONAL: 'HOT_OPERATIONAL',
  FEE_COLLECTION: 'FEE_COLLECTION'
};

export type WalletKind = (typeof WalletKind)[keyof typeof WalletKind]


export const WalletStatus: {
  PROVISIONING: 'PROVISIONING',
  ACTIVE: 'ACTIVE',
  FROZEN: 'FROZEN',
  ARCHIVED: 'ARCHIVED'
};

export type WalletStatus = (typeof WalletStatus)[keyof typeof WalletStatus]


export const BroadcastJobKind: {
  TRANSFER: 'TRANSFER',
  ESCROW_FUND: 'ESCROW_FUND',
  DEX_SWAP: 'DEX_SWAP',
  BRIDGE_DEPOSIT: 'BRIDGE_DEPOSIT',
  BRIDGE_WITHDRAW: 'BRIDGE_WITHDRAW',
  SALYSD_MINT: 'SALYSD_MINT',
  SALYSD_REDEEM: 'SALYSD_REDEEM',
  SALYSD_APPROVE: 'SALYSD_APPROVE',
  SALYSD_ORACLE_UPDATE: 'SALYSD_ORACLE_UPDATE',
  CONTRACT_CALL: 'CONTRACT_CALL'
};

export type BroadcastJobKind = (typeof BroadcastJobKind)[keyof typeof BroadcastJobKind]


export const BroadcastJobStatus: {
  PENDING: 'PENDING',
  SUBMITTED: 'SUBMITTED',
  CONFIRMED: 'CONFIRMED',
  FAILED: 'FAILED'
};

export type BroadcastJobStatus = (typeof BroadcastJobStatus)[keyof typeof BroadcastJobStatus]

}

export type Chain = $Enums.Chain

export const Chain: typeof $Enums.Chain

export type WalletKind = $Enums.WalletKind

export const WalletKind: typeof $Enums.WalletKind

export type WalletStatus = $Enums.WalletStatus

export const WalletStatus: typeof $Enums.WalletStatus

export type BroadcastJobKind = $Enums.BroadcastJobKind

export const BroadcastJobKind: typeof $Enums.BroadcastJobKind

export type BroadcastJobStatus = $Enums.BroadcastJobStatus

export const BroadcastJobStatus: typeof $Enums.BroadcastJobStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Wallets
 * const wallets = await prisma.wallet.findMany()
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
   * // Fetch zero or more Wallets
   * const wallets = await prisma.wallet.findMany()
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
   * `prisma.wallet`: Exposes CRUD operations for the **Wallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallets
    * const wallets = await prisma.wallet.findMany()
    * ```
    */
  get wallet(): Prisma.WalletDelegate<ExtArgs>;

  /**
   * `prisma.walletPolicy`: Exposes CRUD operations for the **WalletPolicy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WalletPolicies
    * const walletPolicies = await prisma.walletPolicy.findMany()
    * ```
    */
  get walletPolicy(): Prisma.WalletPolicyDelegate<ExtArgs>;

  /**
   * `prisma.broadcastJob`: Exposes CRUD operations for the **BroadcastJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BroadcastJobs
    * const broadcastJobs = await prisma.broadcastJob.findMany()
    * ```
    */
  get broadcastJob(): Prisma.BroadcastJobDelegate<ExtArgs>;
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
    Wallet: 'Wallet',
    WalletPolicy: 'WalletPolicy',
    BroadcastJob: 'BroadcastJob'
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
      modelProps: "wallet" | "walletPolicy" | "broadcastJob"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Wallet: {
        payload: Prisma.$WalletPayload<ExtArgs>
        fields: Prisma.WalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findFirst: {
            args: Prisma.WalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findMany: {
            args: Prisma.WalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          create: {
            args: Prisma.WalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          createMany: {
            args: Prisma.WalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          delete: {
            args: Prisma.WalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          update: {
            args: Prisma.WalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          deleteMany: {
            args: Prisma.WalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          aggregate: {
            args: Prisma.WalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWallet>
          }
          groupBy: {
            args: Prisma.WalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletCountArgs<ExtArgs>
            result: $Utils.Optional<WalletCountAggregateOutputType> | number
          }
        }
      }
      WalletPolicy: {
        payload: Prisma.$WalletPolicyPayload<ExtArgs>
        fields: Prisma.WalletPolicyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletPolicyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPolicyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletPolicyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPolicyPayload>
          }
          findFirst: {
            args: Prisma.WalletPolicyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPolicyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletPolicyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPolicyPayload>
          }
          findMany: {
            args: Prisma.WalletPolicyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPolicyPayload>[]
          }
          create: {
            args: Prisma.WalletPolicyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPolicyPayload>
          }
          createMany: {
            args: Prisma.WalletPolicyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletPolicyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPolicyPayload>[]
          }
          delete: {
            args: Prisma.WalletPolicyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPolicyPayload>
          }
          update: {
            args: Prisma.WalletPolicyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPolicyPayload>
          }
          deleteMany: {
            args: Prisma.WalletPolicyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletPolicyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WalletPolicyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPolicyPayload>
          }
          aggregate: {
            args: Prisma.WalletPolicyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWalletPolicy>
          }
          groupBy: {
            args: Prisma.WalletPolicyGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletPolicyGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletPolicyCountArgs<ExtArgs>
            result: $Utils.Optional<WalletPolicyCountAggregateOutputType> | number
          }
        }
      }
      BroadcastJob: {
        payload: Prisma.$BroadcastJobPayload<ExtArgs>
        fields: Prisma.BroadcastJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BroadcastJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BroadcastJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastJobPayload>
          }
          findFirst: {
            args: Prisma.BroadcastJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BroadcastJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastJobPayload>
          }
          findMany: {
            args: Prisma.BroadcastJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastJobPayload>[]
          }
          create: {
            args: Prisma.BroadcastJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastJobPayload>
          }
          createMany: {
            args: Prisma.BroadcastJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BroadcastJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastJobPayload>[]
          }
          delete: {
            args: Prisma.BroadcastJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastJobPayload>
          }
          update: {
            args: Prisma.BroadcastJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastJobPayload>
          }
          deleteMany: {
            args: Prisma.BroadcastJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BroadcastJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BroadcastJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BroadcastJobPayload>
          }
          aggregate: {
            args: Prisma.BroadcastJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBroadcastJob>
          }
          groupBy: {
            args: Prisma.BroadcastJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<BroadcastJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.BroadcastJobCountArgs<ExtArgs>
            result: $Utils.Optional<BroadcastJobCountAggregateOutputType> | number
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
   * Model Wallet
   */

  export type AggregateWallet = {
    _count: WalletCountAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  export type WalletMinAggregateOutputType = {
    id: string | null
    chain: $Enums.Chain | null
    address: string | null
    kind: $Enums.WalletKind | null
    status: $Enums.WalletStatus | null
    ownerId: string | null
    ownerKind: string | null
    label: string | null
    signerKeyRef: string | null
    ledgerAccountId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WalletMaxAggregateOutputType = {
    id: string | null
    chain: $Enums.Chain | null
    address: string | null
    kind: $Enums.WalletKind | null
    status: $Enums.WalletStatus | null
    ownerId: string | null
    ownerKind: string | null
    label: string | null
    signerKeyRef: string | null
    ledgerAccountId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WalletCountAggregateOutputType = {
    id: number
    chain: number
    address: number
    kind: number
    status: number
    ownerId: number
    ownerKind: number
    label: number
    signerKeyRef: number
    ledgerAccountId: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WalletMinAggregateInputType = {
    id?: true
    chain?: true
    address?: true
    kind?: true
    status?: true
    ownerId?: true
    ownerKind?: true
    label?: true
    signerKeyRef?: true
    ledgerAccountId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WalletMaxAggregateInputType = {
    id?: true
    chain?: true
    address?: true
    kind?: true
    status?: true
    ownerId?: true
    ownerKind?: true
    label?: true
    signerKeyRef?: true
    ledgerAccountId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WalletCountAggregateInputType = {
    id?: true
    chain?: true
    address?: true
    kind?: true
    status?: true
    ownerId?: true
    ownerKind?: true
    label?: true
    signerKeyRef?: true
    ledgerAccountId?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallet to aggregate.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wallets
    **/
    _count?: true | WalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletMaxAggregateInputType
  }

  export type GetWalletAggregateType<T extends WalletAggregateArgs> = {
        [P in keyof T & keyof AggregateWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWallet[P]>
      : GetScalarType<T[P], AggregateWallet[P]>
  }




  export type WalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithAggregationInput | WalletOrderByWithAggregationInput[]
    by: WalletScalarFieldEnum[] | WalletScalarFieldEnum
    having?: WalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletCountAggregateInputType | true
    _min?: WalletMinAggregateInputType
    _max?: WalletMaxAggregateInputType
  }

  export type WalletGroupByOutputType = {
    id: string
    chain: $Enums.Chain
    address: string
    kind: $Enums.WalletKind
    status: $Enums.WalletStatus
    ownerId: string | null
    ownerKind: string | null
    label: string | null
    signerKeyRef: string
    ledgerAccountId: string | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: WalletCountAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  type GetWalletGroupByPayload<T extends WalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletGroupByOutputType[P]>
            : GetScalarType<T[P], WalletGroupByOutputType[P]>
        }
      >
    >


  export type WalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chain?: boolean
    address?: boolean
    kind?: boolean
    status?: boolean
    ownerId?: boolean
    ownerKind?: boolean
    label?: boolean
    signerKeyRef?: boolean
    ledgerAccountId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    policy?: boolean | Wallet$policyArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chain?: boolean
    address?: boolean
    kind?: boolean
    status?: boolean
    ownerId?: boolean
    ownerKind?: boolean
    label?: boolean
    signerKeyRef?: boolean
    ledgerAccountId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectScalar = {
    id?: boolean
    chain?: boolean
    address?: boolean
    kind?: boolean
    status?: boolean
    ownerId?: boolean
    ownerKind?: boolean
    label?: boolean
    signerKeyRef?: boolean
    ledgerAccountId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WalletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    policy?: boolean | Wallet$policyArgs<ExtArgs>
  }
  export type WalletIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wallet"
    objects: {
      policy: Prisma.$WalletPolicyPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chain: $Enums.Chain
      address: string
      kind: $Enums.WalletKind
      status: $Enums.WalletStatus
      ownerId: string | null
      ownerKind: string | null
      label: string | null
      /**
       * Reference to the key material held by the signer service (e.g. KMS key ARN
       * or MPC wallet id). Never the key itself.
       */
      signerKeyRef: string
      ledgerAccountId: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["wallet"]>
    composites: {}
  }

  type WalletGetPayload<S extends boolean | null | undefined | WalletDefaultArgs> = $Result.GetResult<Prisma.$WalletPayload, S>

  type WalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WalletFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WalletCountAggregateInputType | true
    }

  export interface WalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wallet'], meta: { name: 'Wallet' } }
    /**
     * Find zero or one Wallet that matches the filter.
     * @param {WalletFindUniqueArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletFindUniqueArgs>(args: SelectSubset<T, WalletFindUniqueArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Wallet that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WalletFindUniqueOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Wallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletFindFirstArgs>(args?: SelectSubset<T, WalletFindFirstArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Wallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Wallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wallets
     * const wallets = await prisma.wallet.findMany()
     * 
     * // Get first 10 Wallets
     * const wallets = await prisma.wallet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const walletWithIdOnly = await prisma.wallet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WalletFindManyArgs>(args?: SelectSubset<T, WalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Wallet.
     * @param {WalletCreateArgs} args - Arguments to create a Wallet.
     * @example
     * // Create one Wallet
     * const Wallet = await prisma.wallet.create({
     *   data: {
     *     // ... data to create a Wallet
     *   }
     * })
     * 
     */
    create<T extends WalletCreateArgs>(args: SelectSubset<T, WalletCreateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Wallets.
     * @param {WalletCreateManyArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletCreateManyArgs>(args?: SelectSubset<T, WalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wallets and returns the data saved in the database.
     * @param {WalletCreateManyAndReturnArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wallets and only return the `id`
     * const walletWithIdOnly = await prisma.wallet.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Wallet.
     * @param {WalletDeleteArgs} args - Arguments to delete one Wallet.
     * @example
     * // Delete one Wallet
     * const Wallet = await prisma.wallet.delete({
     *   where: {
     *     // ... filter to delete one Wallet
     *   }
     * })
     * 
     */
    delete<T extends WalletDeleteArgs>(args: SelectSubset<T, WalletDeleteArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Wallet.
     * @param {WalletUpdateArgs} args - Arguments to update one Wallet.
     * @example
     * // Update one Wallet
     * const wallet = await prisma.wallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletUpdateArgs>(args: SelectSubset<T, WalletUpdateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Wallets.
     * @param {WalletDeleteManyArgs} args - Arguments to filter Wallets to delete.
     * @example
     * // Delete a few Wallets
     * const { count } = await prisma.wallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletDeleteManyArgs>(args?: SelectSubset<T, WalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletUpdateManyArgs>(args: SelectSubset<T, WalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Wallet.
     * @param {WalletUpsertArgs} args - Arguments to update or create a Wallet.
     * @example
     * // Update or create a Wallet
     * const wallet = await prisma.wallet.upsert({
     *   create: {
     *     // ... data to create a Wallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wallet we want to update
     *   }
     * })
     */
    upsert<T extends WalletUpsertArgs>(args: SelectSubset<T, WalletUpsertArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletCountArgs} args - Arguments to filter Wallets to count.
     * @example
     * // Count the number of Wallets
     * const count = await prisma.wallet.count({
     *   where: {
     *     // ... the filter for the Wallets we want to count
     *   }
     * })
    **/
    count<T extends WalletCountArgs>(
      args?: Subset<T, WalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WalletAggregateArgs>(args: Subset<T, WalletAggregateArgs>): Prisma.PrismaPromise<GetWalletAggregateType<T>>

    /**
     * Group by Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletGroupByArgs} args - Group by arguments.
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
      T extends WalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletGroupByArgs['orderBy'] }
        : { orderBy?: WalletGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wallet model
   */
  readonly fields: WalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    policy<T extends Wallet$policyArgs<ExtArgs> = {}>(args?: Subset<T, Wallet$policyArgs<ExtArgs>>): Prisma__WalletPolicyClient<$Result.GetResult<Prisma.$WalletPolicyPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the Wallet model
   */ 
  interface WalletFieldRefs {
    readonly id: FieldRef<"Wallet", 'String'>
    readonly chain: FieldRef<"Wallet", 'Chain'>
    readonly address: FieldRef<"Wallet", 'String'>
    readonly kind: FieldRef<"Wallet", 'WalletKind'>
    readonly status: FieldRef<"Wallet", 'WalletStatus'>
    readonly ownerId: FieldRef<"Wallet", 'String'>
    readonly ownerKind: FieldRef<"Wallet", 'String'>
    readonly label: FieldRef<"Wallet", 'String'>
    readonly signerKeyRef: FieldRef<"Wallet", 'String'>
    readonly ledgerAccountId: FieldRef<"Wallet", 'String'>
    readonly metadata: FieldRef<"Wallet", 'Json'>
    readonly createdAt: FieldRef<"Wallet", 'DateTime'>
    readonly updatedAt: FieldRef<"Wallet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Wallet findUnique
   */
  export type WalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findUniqueOrThrow
   */
  export type WalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findFirst
   */
  export type WalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findFirstOrThrow
   */
  export type WalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findMany
   */
  export type WalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallets to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet create
   */
  export type WalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to create a Wallet.
     */
    data: XOR<WalletCreateInput, WalletUncheckedCreateInput>
  }

  /**
   * Wallet createMany
   */
  export type WalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Wallet createManyAndReturn
   */
  export type WalletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Wallet update
   */
  export type WalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to update a Wallet.
     */
    data: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
    /**
     * Choose, which Wallet to update.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet updateMany
   */
  export type WalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
  }

  /**
   * Wallet upsert
   */
  export type WalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The filter to search for the Wallet to update in case it exists.
     */
    where: WalletWhereUniqueInput
    /**
     * In case the Wallet found by the `where` argument doesn't exist, create a new Wallet with this data.
     */
    create: XOR<WalletCreateInput, WalletUncheckedCreateInput>
    /**
     * In case the Wallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
  }

  /**
   * Wallet delete
   */
  export type WalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter which Wallet to delete.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet deleteMany
   */
  export type WalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallets to delete
     */
    where?: WalletWhereInput
  }

  /**
   * Wallet.policy
   */
  export type Wallet$policyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletPolicy
     */
    select?: WalletPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletPolicyInclude<ExtArgs> | null
    where?: WalletPolicyWhereInput
  }

  /**
   * Wallet without action
   */
  export type WalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
  }


  /**
   * Model WalletPolicy
   */

  export type AggregateWalletPolicy = {
    _count: WalletPolicyCountAggregateOutputType | null
    _avg: WalletPolicyAvgAggregateOutputType | null
    _sum: WalletPolicySumAggregateOutputType | null
    _min: WalletPolicyMinAggregateOutputType | null
    _max: WalletPolicyMaxAggregateOutputType | null
  }

  export type WalletPolicyAvgAggregateOutputType = {
    perTxCapMinor: number | null
    dailyCapMinor: number | null
    approvalThresholdMinor: number | null
    requiredApprovers: number | null
  }

  export type WalletPolicySumAggregateOutputType = {
    perTxCapMinor: bigint | null
    dailyCapMinor: bigint | null
    approvalThresholdMinor: bigint | null
    requiredApprovers: number | null
  }

  export type WalletPolicyMinAggregateOutputType = {
    walletId: string | null
    perTxCapMinor: bigint | null
    dailyCapMinor: bigint | null
    approvalThresholdMinor: bigint | null
    requiredApprovers: number | null
    updatedAt: Date | null
  }

  export type WalletPolicyMaxAggregateOutputType = {
    walletId: string | null
    perTxCapMinor: bigint | null
    dailyCapMinor: bigint | null
    approvalThresholdMinor: bigint | null
    requiredApprovers: number | null
    updatedAt: Date | null
  }

  export type WalletPolicyCountAggregateOutputType = {
    walletId: number
    destinationAllowlist: number
    trustedIssuerAllowlist: number
    perTxCapMinor: number
    dailyCapMinor: number
    approvalThresholdMinor: number
    requiredApprovers: number
    updatedAt: number
    _all: number
  }


  export type WalletPolicyAvgAggregateInputType = {
    perTxCapMinor?: true
    dailyCapMinor?: true
    approvalThresholdMinor?: true
    requiredApprovers?: true
  }

  export type WalletPolicySumAggregateInputType = {
    perTxCapMinor?: true
    dailyCapMinor?: true
    approvalThresholdMinor?: true
    requiredApprovers?: true
  }

  export type WalletPolicyMinAggregateInputType = {
    walletId?: true
    perTxCapMinor?: true
    dailyCapMinor?: true
    approvalThresholdMinor?: true
    requiredApprovers?: true
    updatedAt?: true
  }

  export type WalletPolicyMaxAggregateInputType = {
    walletId?: true
    perTxCapMinor?: true
    dailyCapMinor?: true
    approvalThresholdMinor?: true
    requiredApprovers?: true
    updatedAt?: true
  }

  export type WalletPolicyCountAggregateInputType = {
    walletId?: true
    destinationAllowlist?: true
    trustedIssuerAllowlist?: true
    perTxCapMinor?: true
    dailyCapMinor?: true
    approvalThresholdMinor?: true
    requiredApprovers?: true
    updatedAt?: true
    _all?: true
  }

  export type WalletPolicyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WalletPolicy to aggregate.
     */
    where?: WalletPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletPolicies to fetch.
     */
    orderBy?: WalletPolicyOrderByWithRelationInput | WalletPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WalletPolicies
    **/
    _count?: true | WalletPolicyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WalletPolicyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WalletPolicySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletPolicyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletPolicyMaxAggregateInputType
  }

  export type GetWalletPolicyAggregateType<T extends WalletPolicyAggregateArgs> = {
        [P in keyof T & keyof AggregateWalletPolicy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWalletPolicy[P]>
      : GetScalarType<T[P], AggregateWalletPolicy[P]>
  }




  export type WalletPolicyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletPolicyWhereInput
    orderBy?: WalletPolicyOrderByWithAggregationInput | WalletPolicyOrderByWithAggregationInput[]
    by: WalletPolicyScalarFieldEnum[] | WalletPolicyScalarFieldEnum
    having?: WalletPolicyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletPolicyCountAggregateInputType | true
    _avg?: WalletPolicyAvgAggregateInputType
    _sum?: WalletPolicySumAggregateInputType
    _min?: WalletPolicyMinAggregateInputType
    _max?: WalletPolicyMaxAggregateInputType
  }

  export type WalletPolicyGroupByOutputType = {
    walletId: string
    destinationAllowlist: JsonValue
    trustedIssuerAllowlist: JsonValue
    perTxCapMinor: bigint
    dailyCapMinor: bigint
    approvalThresholdMinor: bigint
    requiredApprovers: number
    updatedAt: Date
    _count: WalletPolicyCountAggregateOutputType | null
    _avg: WalletPolicyAvgAggregateOutputType | null
    _sum: WalletPolicySumAggregateOutputType | null
    _min: WalletPolicyMinAggregateOutputType | null
    _max: WalletPolicyMaxAggregateOutputType | null
  }

  type GetWalletPolicyGroupByPayload<T extends WalletPolicyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletPolicyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletPolicyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletPolicyGroupByOutputType[P]>
            : GetScalarType<T[P], WalletPolicyGroupByOutputType[P]>
        }
      >
    >


  export type WalletPolicySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    walletId?: boolean
    destinationAllowlist?: boolean
    trustedIssuerAllowlist?: boolean
    perTxCapMinor?: boolean
    dailyCapMinor?: boolean
    approvalThresholdMinor?: boolean
    requiredApprovers?: boolean
    updatedAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["walletPolicy"]>

  export type WalletPolicySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    walletId?: boolean
    destinationAllowlist?: boolean
    trustedIssuerAllowlist?: boolean
    perTxCapMinor?: boolean
    dailyCapMinor?: boolean
    approvalThresholdMinor?: boolean
    requiredApprovers?: boolean
    updatedAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["walletPolicy"]>

  export type WalletPolicySelectScalar = {
    walletId?: boolean
    destinationAllowlist?: boolean
    trustedIssuerAllowlist?: boolean
    perTxCapMinor?: boolean
    dailyCapMinor?: boolean
    approvalThresholdMinor?: boolean
    requiredApprovers?: boolean
    updatedAt?: boolean
  }

  export type WalletPolicyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }
  export type WalletPolicyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }

  export type $WalletPolicyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WalletPolicy"
    objects: {
      wallet: Prisma.$WalletPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      walletId: string
      /**
       * JSON array of allowlisted destinations: chain + address (or "*").
       */
      destinationAllowlist: Prisma.JsonValue
      /**
       * JSON array of trusted IOU issuers: `CURRENCY:issuerAddress` or `*`.
       */
      trustedIssuerAllowlist: Prisma.JsonValue
      /**
       * Per-transaction cap in minor units of the wallet's native asset.
       */
      perTxCapMinor: bigint
      /**
       * 24h rolling cap in minor units.
       */
      dailyCapMinor: bigint
      /**
       * Required approvers above the threshold (0 means no manual approval).
       */
      approvalThresholdMinor: bigint
      requiredApprovers: number
      updatedAt: Date
    }, ExtArgs["result"]["walletPolicy"]>
    composites: {}
  }

  type WalletPolicyGetPayload<S extends boolean | null | undefined | WalletPolicyDefaultArgs> = $Result.GetResult<Prisma.$WalletPolicyPayload, S>

  type WalletPolicyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WalletPolicyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WalletPolicyCountAggregateInputType | true
    }

  export interface WalletPolicyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WalletPolicy'], meta: { name: 'WalletPolicy' } }
    /**
     * Find zero or one WalletPolicy that matches the filter.
     * @param {WalletPolicyFindUniqueArgs} args - Arguments to find a WalletPolicy
     * @example
     * // Get one WalletPolicy
     * const walletPolicy = await prisma.walletPolicy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletPolicyFindUniqueArgs>(args: SelectSubset<T, WalletPolicyFindUniqueArgs<ExtArgs>>): Prisma__WalletPolicyClient<$Result.GetResult<Prisma.$WalletPolicyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WalletPolicy that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WalletPolicyFindUniqueOrThrowArgs} args - Arguments to find a WalletPolicy
     * @example
     * // Get one WalletPolicy
     * const walletPolicy = await prisma.walletPolicy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletPolicyFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletPolicyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletPolicyClient<$Result.GetResult<Prisma.$WalletPolicyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WalletPolicy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletPolicyFindFirstArgs} args - Arguments to find a WalletPolicy
     * @example
     * // Get one WalletPolicy
     * const walletPolicy = await prisma.walletPolicy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletPolicyFindFirstArgs>(args?: SelectSubset<T, WalletPolicyFindFirstArgs<ExtArgs>>): Prisma__WalletPolicyClient<$Result.GetResult<Prisma.$WalletPolicyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WalletPolicy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletPolicyFindFirstOrThrowArgs} args - Arguments to find a WalletPolicy
     * @example
     * // Get one WalletPolicy
     * const walletPolicy = await prisma.walletPolicy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletPolicyFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletPolicyFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletPolicyClient<$Result.GetResult<Prisma.$WalletPolicyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WalletPolicies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletPolicyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WalletPolicies
     * const walletPolicies = await prisma.walletPolicy.findMany()
     * 
     * // Get first 10 WalletPolicies
     * const walletPolicies = await prisma.walletPolicy.findMany({ take: 10 })
     * 
     * // Only select the `walletId`
     * const walletPolicyWithWalletIdOnly = await prisma.walletPolicy.findMany({ select: { walletId: true } })
     * 
     */
    findMany<T extends WalletPolicyFindManyArgs>(args?: SelectSubset<T, WalletPolicyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPolicyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WalletPolicy.
     * @param {WalletPolicyCreateArgs} args - Arguments to create a WalletPolicy.
     * @example
     * // Create one WalletPolicy
     * const WalletPolicy = await prisma.walletPolicy.create({
     *   data: {
     *     // ... data to create a WalletPolicy
     *   }
     * })
     * 
     */
    create<T extends WalletPolicyCreateArgs>(args: SelectSubset<T, WalletPolicyCreateArgs<ExtArgs>>): Prisma__WalletPolicyClient<$Result.GetResult<Prisma.$WalletPolicyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WalletPolicies.
     * @param {WalletPolicyCreateManyArgs} args - Arguments to create many WalletPolicies.
     * @example
     * // Create many WalletPolicies
     * const walletPolicy = await prisma.walletPolicy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletPolicyCreateManyArgs>(args?: SelectSubset<T, WalletPolicyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WalletPolicies and returns the data saved in the database.
     * @param {WalletPolicyCreateManyAndReturnArgs} args - Arguments to create many WalletPolicies.
     * @example
     * // Create many WalletPolicies
     * const walletPolicy = await prisma.walletPolicy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WalletPolicies and only return the `walletId`
     * const walletPolicyWithWalletIdOnly = await prisma.walletPolicy.createManyAndReturn({ 
     *   select: { walletId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletPolicyCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletPolicyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPolicyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WalletPolicy.
     * @param {WalletPolicyDeleteArgs} args - Arguments to delete one WalletPolicy.
     * @example
     * // Delete one WalletPolicy
     * const WalletPolicy = await prisma.walletPolicy.delete({
     *   where: {
     *     // ... filter to delete one WalletPolicy
     *   }
     * })
     * 
     */
    delete<T extends WalletPolicyDeleteArgs>(args: SelectSubset<T, WalletPolicyDeleteArgs<ExtArgs>>): Prisma__WalletPolicyClient<$Result.GetResult<Prisma.$WalletPolicyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WalletPolicy.
     * @param {WalletPolicyUpdateArgs} args - Arguments to update one WalletPolicy.
     * @example
     * // Update one WalletPolicy
     * const walletPolicy = await prisma.walletPolicy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletPolicyUpdateArgs>(args: SelectSubset<T, WalletPolicyUpdateArgs<ExtArgs>>): Prisma__WalletPolicyClient<$Result.GetResult<Prisma.$WalletPolicyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WalletPolicies.
     * @param {WalletPolicyDeleteManyArgs} args - Arguments to filter WalletPolicies to delete.
     * @example
     * // Delete a few WalletPolicies
     * const { count } = await prisma.walletPolicy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletPolicyDeleteManyArgs>(args?: SelectSubset<T, WalletPolicyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WalletPolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletPolicyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WalletPolicies
     * const walletPolicy = await prisma.walletPolicy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletPolicyUpdateManyArgs>(args: SelectSubset<T, WalletPolicyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WalletPolicy.
     * @param {WalletPolicyUpsertArgs} args - Arguments to update or create a WalletPolicy.
     * @example
     * // Update or create a WalletPolicy
     * const walletPolicy = await prisma.walletPolicy.upsert({
     *   create: {
     *     // ... data to create a WalletPolicy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WalletPolicy we want to update
     *   }
     * })
     */
    upsert<T extends WalletPolicyUpsertArgs>(args: SelectSubset<T, WalletPolicyUpsertArgs<ExtArgs>>): Prisma__WalletPolicyClient<$Result.GetResult<Prisma.$WalletPolicyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WalletPolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletPolicyCountArgs} args - Arguments to filter WalletPolicies to count.
     * @example
     * // Count the number of WalletPolicies
     * const count = await prisma.walletPolicy.count({
     *   where: {
     *     // ... the filter for the WalletPolicies we want to count
     *   }
     * })
    **/
    count<T extends WalletPolicyCountArgs>(
      args?: Subset<T, WalletPolicyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletPolicyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WalletPolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletPolicyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WalletPolicyAggregateArgs>(args: Subset<T, WalletPolicyAggregateArgs>): Prisma.PrismaPromise<GetWalletPolicyAggregateType<T>>

    /**
     * Group by WalletPolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletPolicyGroupByArgs} args - Group by arguments.
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
      T extends WalletPolicyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletPolicyGroupByArgs['orderBy'] }
        : { orderBy?: WalletPolicyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WalletPolicyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletPolicyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WalletPolicy model
   */
  readonly fields: WalletPolicyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WalletPolicy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletPolicyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallet<T extends WalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WalletDefaultArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the WalletPolicy model
   */ 
  interface WalletPolicyFieldRefs {
    readonly walletId: FieldRef<"WalletPolicy", 'String'>
    readonly destinationAllowlist: FieldRef<"WalletPolicy", 'Json'>
    readonly trustedIssuerAllowlist: FieldRef<"WalletPolicy", 'Json'>
    readonly perTxCapMinor: FieldRef<"WalletPolicy", 'BigInt'>
    readonly dailyCapMinor: FieldRef<"WalletPolicy", 'BigInt'>
    readonly approvalThresholdMinor: FieldRef<"WalletPolicy", 'BigInt'>
    readonly requiredApprovers: FieldRef<"WalletPolicy", 'Int'>
    readonly updatedAt: FieldRef<"WalletPolicy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WalletPolicy findUnique
   */
  export type WalletPolicyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletPolicy
     */
    select?: WalletPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletPolicyInclude<ExtArgs> | null
    /**
     * Filter, which WalletPolicy to fetch.
     */
    where: WalletPolicyWhereUniqueInput
  }

  /**
   * WalletPolicy findUniqueOrThrow
   */
  export type WalletPolicyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletPolicy
     */
    select?: WalletPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletPolicyInclude<ExtArgs> | null
    /**
     * Filter, which WalletPolicy to fetch.
     */
    where: WalletPolicyWhereUniqueInput
  }

  /**
   * WalletPolicy findFirst
   */
  export type WalletPolicyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletPolicy
     */
    select?: WalletPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletPolicyInclude<ExtArgs> | null
    /**
     * Filter, which WalletPolicy to fetch.
     */
    where?: WalletPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletPolicies to fetch.
     */
    orderBy?: WalletPolicyOrderByWithRelationInput | WalletPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WalletPolicies.
     */
    cursor?: WalletPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WalletPolicies.
     */
    distinct?: WalletPolicyScalarFieldEnum | WalletPolicyScalarFieldEnum[]
  }

  /**
   * WalletPolicy findFirstOrThrow
   */
  export type WalletPolicyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletPolicy
     */
    select?: WalletPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletPolicyInclude<ExtArgs> | null
    /**
     * Filter, which WalletPolicy to fetch.
     */
    where?: WalletPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletPolicies to fetch.
     */
    orderBy?: WalletPolicyOrderByWithRelationInput | WalletPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WalletPolicies.
     */
    cursor?: WalletPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletPolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WalletPolicies.
     */
    distinct?: WalletPolicyScalarFieldEnum | WalletPolicyScalarFieldEnum[]
  }

  /**
   * WalletPolicy findMany
   */
  export type WalletPolicyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletPolicy
     */
    select?: WalletPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletPolicyInclude<ExtArgs> | null
    /**
     * Filter, which WalletPolicies to fetch.
     */
    where?: WalletPolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WalletPolicies to fetch.
     */
    orderBy?: WalletPolicyOrderByWithRelationInput | WalletPolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WalletPolicies.
     */
    cursor?: WalletPolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WalletPolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WalletPolicies.
     */
    skip?: number
    distinct?: WalletPolicyScalarFieldEnum | WalletPolicyScalarFieldEnum[]
  }

  /**
   * WalletPolicy create
   */
  export type WalletPolicyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletPolicy
     */
    select?: WalletPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletPolicyInclude<ExtArgs> | null
    /**
     * The data needed to create a WalletPolicy.
     */
    data: XOR<WalletPolicyCreateInput, WalletPolicyUncheckedCreateInput>
  }

  /**
   * WalletPolicy createMany
   */
  export type WalletPolicyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WalletPolicies.
     */
    data: WalletPolicyCreateManyInput | WalletPolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WalletPolicy createManyAndReturn
   */
  export type WalletPolicyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletPolicy
     */
    select?: WalletPolicySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WalletPolicies.
     */
    data: WalletPolicyCreateManyInput | WalletPolicyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletPolicyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WalletPolicy update
   */
  export type WalletPolicyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletPolicy
     */
    select?: WalletPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletPolicyInclude<ExtArgs> | null
    /**
     * The data needed to update a WalletPolicy.
     */
    data: XOR<WalletPolicyUpdateInput, WalletPolicyUncheckedUpdateInput>
    /**
     * Choose, which WalletPolicy to update.
     */
    where: WalletPolicyWhereUniqueInput
  }

  /**
   * WalletPolicy updateMany
   */
  export type WalletPolicyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WalletPolicies.
     */
    data: XOR<WalletPolicyUpdateManyMutationInput, WalletPolicyUncheckedUpdateManyInput>
    /**
     * Filter which WalletPolicies to update
     */
    where?: WalletPolicyWhereInput
  }

  /**
   * WalletPolicy upsert
   */
  export type WalletPolicyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletPolicy
     */
    select?: WalletPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletPolicyInclude<ExtArgs> | null
    /**
     * The filter to search for the WalletPolicy to update in case it exists.
     */
    where: WalletPolicyWhereUniqueInput
    /**
     * In case the WalletPolicy found by the `where` argument doesn't exist, create a new WalletPolicy with this data.
     */
    create: XOR<WalletPolicyCreateInput, WalletPolicyUncheckedCreateInput>
    /**
     * In case the WalletPolicy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletPolicyUpdateInput, WalletPolicyUncheckedUpdateInput>
  }

  /**
   * WalletPolicy delete
   */
  export type WalletPolicyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletPolicy
     */
    select?: WalletPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletPolicyInclude<ExtArgs> | null
    /**
     * Filter which WalletPolicy to delete.
     */
    where: WalletPolicyWhereUniqueInput
  }

  /**
   * WalletPolicy deleteMany
   */
  export type WalletPolicyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WalletPolicies to delete
     */
    where?: WalletPolicyWhereInput
  }

  /**
   * WalletPolicy without action
   */
  export type WalletPolicyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletPolicy
     */
    select?: WalletPolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletPolicyInclude<ExtArgs> | null
  }


  /**
   * Model BroadcastJob
   */

  export type AggregateBroadcastJob = {
    _count: BroadcastJobCountAggregateOutputType | null
    _avg: BroadcastJobAvgAggregateOutputType | null
    _sum: BroadcastJobSumAggregateOutputType | null
    _min: BroadcastJobMinAggregateOutputType | null
    _max: BroadcastJobMaxAggregateOutputType | null
  }

  export type BroadcastJobAvgAggregateOutputType = {
    amountMinor: number | null
    destinationTag: number | null
    escrowDeadline: number | null
    confirmedAtBlock: number | null
    attempts: number | null
  }

  export type BroadcastJobSumAggregateOutputType = {
    amountMinor: bigint | null
    destinationTag: number | null
    escrowDeadline: bigint | null
    confirmedAtBlock: bigint | null
    attempts: number | null
  }

  export type BroadcastJobMinAggregateOutputType = {
    id: string | null
    idempotencyKey: string | null
    walletId: string | null
    chain: $Enums.Chain | null
    kind: $Enums.BroadcastJobKind | null
    destinationAddress: string | null
    amountMinor: bigint | null
    asset: string | null
    iouIssuer: string | null
    destinationTag: number | null
    memo: string | null
    intentId: string | null
    dealId: string | null
    escrowContract: string | null
    escrowDeadline: bigint | null
    rawTx: string | null
    txHash: string | null
    confirmedAtBlock: bigint | null
    status: $Enums.BroadcastJobStatus | null
    attempts: number | null
    lastError: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BroadcastJobMaxAggregateOutputType = {
    id: string | null
    idempotencyKey: string | null
    walletId: string | null
    chain: $Enums.Chain | null
    kind: $Enums.BroadcastJobKind | null
    destinationAddress: string | null
    amountMinor: bigint | null
    asset: string | null
    iouIssuer: string | null
    destinationTag: number | null
    memo: string | null
    intentId: string | null
    dealId: string | null
    escrowContract: string | null
    escrowDeadline: bigint | null
    rawTx: string | null
    txHash: string | null
    confirmedAtBlock: bigint | null
    status: $Enums.BroadcastJobStatus | null
    attempts: number | null
    lastError: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BroadcastJobCountAggregateOutputType = {
    id: number
    idempotencyKey: number
    walletId: number
    chain: number
    kind: number
    destinationAddress: number
    amountMinor: number
    asset: number
    iouIssuer: number
    destinationTag: number
    memo: number
    intentId: number
    dealId: number
    escrowContract: number
    escrowDeadline: number
    swapPayload: number
    bridgePayload: number
    salysdPayload: number
    contractCallPayload: number
    rawTx: number
    txHash: number
    confirmedAtBlock: number
    status: number
    attempts: number
    lastError: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BroadcastJobAvgAggregateInputType = {
    amountMinor?: true
    destinationTag?: true
    escrowDeadline?: true
    confirmedAtBlock?: true
    attempts?: true
  }

  export type BroadcastJobSumAggregateInputType = {
    amountMinor?: true
    destinationTag?: true
    escrowDeadline?: true
    confirmedAtBlock?: true
    attempts?: true
  }

  export type BroadcastJobMinAggregateInputType = {
    id?: true
    idempotencyKey?: true
    walletId?: true
    chain?: true
    kind?: true
    destinationAddress?: true
    amountMinor?: true
    asset?: true
    iouIssuer?: true
    destinationTag?: true
    memo?: true
    intentId?: true
    dealId?: true
    escrowContract?: true
    escrowDeadline?: true
    rawTx?: true
    txHash?: true
    confirmedAtBlock?: true
    status?: true
    attempts?: true
    lastError?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BroadcastJobMaxAggregateInputType = {
    id?: true
    idempotencyKey?: true
    walletId?: true
    chain?: true
    kind?: true
    destinationAddress?: true
    amountMinor?: true
    asset?: true
    iouIssuer?: true
    destinationTag?: true
    memo?: true
    intentId?: true
    dealId?: true
    escrowContract?: true
    escrowDeadline?: true
    rawTx?: true
    txHash?: true
    confirmedAtBlock?: true
    status?: true
    attempts?: true
    lastError?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BroadcastJobCountAggregateInputType = {
    id?: true
    idempotencyKey?: true
    walletId?: true
    chain?: true
    kind?: true
    destinationAddress?: true
    amountMinor?: true
    asset?: true
    iouIssuer?: true
    destinationTag?: true
    memo?: true
    intentId?: true
    dealId?: true
    escrowContract?: true
    escrowDeadline?: true
    swapPayload?: true
    bridgePayload?: true
    salysdPayload?: true
    contractCallPayload?: true
    rawTx?: true
    txHash?: true
    confirmedAtBlock?: true
    status?: true
    attempts?: true
    lastError?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BroadcastJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BroadcastJob to aggregate.
     */
    where?: BroadcastJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BroadcastJobs to fetch.
     */
    orderBy?: BroadcastJobOrderByWithRelationInput | BroadcastJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BroadcastJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BroadcastJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BroadcastJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BroadcastJobs
    **/
    _count?: true | BroadcastJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BroadcastJobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BroadcastJobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BroadcastJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BroadcastJobMaxAggregateInputType
  }

  export type GetBroadcastJobAggregateType<T extends BroadcastJobAggregateArgs> = {
        [P in keyof T & keyof AggregateBroadcastJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBroadcastJob[P]>
      : GetScalarType<T[P], AggregateBroadcastJob[P]>
  }




  export type BroadcastJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BroadcastJobWhereInput
    orderBy?: BroadcastJobOrderByWithAggregationInput | BroadcastJobOrderByWithAggregationInput[]
    by: BroadcastJobScalarFieldEnum[] | BroadcastJobScalarFieldEnum
    having?: BroadcastJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BroadcastJobCountAggregateInputType | true
    _avg?: BroadcastJobAvgAggregateInputType
    _sum?: BroadcastJobSumAggregateInputType
    _min?: BroadcastJobMinAggregateInputType
    _max?: BroadcastJobMaxAggregateInputType
  }

  export type BroadcastJobGroupByOutputType = {
    id: string
    idempotencyKey: string
    walletId: string
    chain: $Enums.Chain
    kind: $Enums.BroadcastJobKind
    destinationAddress: string
    amountMinor: bigint
    asset: string
    iouIssuer: string | null
    destinationTag: number | null
    memo: string | null
    intentId: string | null
    dealId: string | null
    escrowContract: string | null
    escrowDeadline: bigint | null
    swapPayload: JsonValue | null
    bridgePayload: JsonValue | null
    salysdPayload: JsonValue | null
    contractCallPayload: JsonValue | null
    rawTx: string | null
    txHash: string | null
    confirmedAtBlock: bigint | null
    status: $Enums.BroadcastJobStatus
    attempts: number
    lastError: string | null
    createdAt: Date
    updatedAt: Date
    _count: BroadcastJobCountAggregateOutputType | null
    _avg: BroadcastJobAvgAggregateOutputType | null
    _sum: BroadcastJobSumAggregateOutputType | null
    _min: BroadcastJobMinAggregateOutputType | null
    _max: BroadcastJobMaxAggregateOutputType | null
  }

  type GetBroadcastJobGroupByPayload<T extends BroadcastJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BroadcastJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BroadcastJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BroadcastJobGroupByOutputType[P]>
            : GetScalarType<T[P], BroadcastJobGroupByOutputType[P]>
        }
      >
    >


  export type BroadcastJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idempotencyKey?: boolean
    walletId?: boolean
    chain?: boolean
    kind?: boolean
    destinationAddress?: boolean
    amountMinor?: boolean
    asset?: boolean
    iouIssuer?: boolean
    destinationTag?: boolean
    memo?: boolean
    intentId?: boolean
    dealId?: boolean
    escrowContract?: boolean
    escrowDeadline?: boolean
    swapPayload?: boolean
    bridgePayload?: boolean
    salysdPayload?: boolean
    contractCallPayload?: boolean
    rawTx?: boolean
    txHash?: boolean
    confirmedAtBlock?: boolean
    status?: boolean
    attempts?: boolean
    lastError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["broadcastJob"]>

  export type BroadcastJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idempotencyKey?: boolean
    walletId?: boolean
    chain?: boolean
    kind?: boolean
    destinationAddress?: boolean
    amountMinor?: boolean
    asset?: boolean
    iouIssuer?: boolean
    destinationTag?: boolean
    memo?: boolean
    intentId?: boolean
    dealId?: boolean
    escrowContract?: boolean
    escrowDeadline?: boolean
    swapPayload?: boolean
    bridgePayload?: boolean
    salysdPayload?: boolean
    contractCallPayload?: boolean
    rawTx?: boolean
    txHash?: boolean
    confirmedAtBlock?: boolean
    status?: boolean
    attempts?: boolean
    lastError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["broadcastJob"]>

  export type BroadcastJobSelectScalar = {
    id?: boolean
    idempotencyKey?: boolean
    walletId?: boolean
    chain?: boolean
    kind?: boolean
    destinationAddress?: boolean
    amountMinor?: boolean
    asset?: boolean
    iouIssuer?: boolean
    destinationTag?: boolean
    memo?: boolean
    intentId?: boolean
    dealId?: boolean
    escrowContract?: boolean
    escrowDeadline?: boolean
    swapPayload?: boolean
    bridgePayload?: boolean
    salysdPayload?: boolean
    contractCallPayload?: boolean
    rawTx?: boolean
    txHash?: boolean
    confirmedAtBlock?: boolean
    status?: boolean
    attempts?: boolean
    lastError?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $BroadcastJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BroadcastJob"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      /**
       * Caller-supplied idempotency key. Unique per wallet (a wallet can't have two
       * outstanding broadcasts under the same key — replays return the existing job).
       */
      idempotencyKey: string
      walletId: string
      chain: $Enums.Chain
      kind: $Enums.BroadcastJobKind
      /**
       * Destination address (EVM hex or XRPL classic-address). For escrow, this is the payee.
       */
      destinationAddress: string
      /**
       * Amount in minor units of `asset`.
       */
      amountMinor: bigint
      asset: string
      /**
       * XRPL IOU issuer classic address (USD/EUR/etc.). Null for native XRP.
       */
      iouIssuer: string | null
      /**
       * XRPL destination tag for hosted-wallet deposits.
       */
      destinationTag: number | null
      memo: string | null
      /**
       * Correlates agent spend approvals when signing high-value transfers.
       */
      intentId: string | null
      /**
       * On-chain escrow deal id (bytes32 hex). Set for ESCROW_FUND jobs.
       */
      dealId: string | null
      escrowContract: string | null
      escrowDeadline: bigint | null
      /**
       * Uniswap V3 swap calldata bundle — set for DEX_SWAP jobs.
       */
      swapPayload: Prisma.JsonValue | null
      /**
       * OP-Stack bridge calldata bundle — set for BRIDGE_* jobs.
       */
      bridgePayload: Prisma.JsonValue | null
      /**
       * SalySD mint/burn/approve bundle — set for SALYSD_* jobs.
       */
      salysdPayload: Prisma.JsonValue | null
      /**
       * Generic contract call — set for CONTRACT_CALL jobs.
       */
      contractCallPayload: Prisma.JsonValue | null
      /**
       * Populated after the signer returns. Null until signed.
       */
      rawTx: string | null
      /**
       * Populated after a successful broadcast. Unique across the namespace.
       */
      txHash: string | null
      /**
       * Block number at which this job's tx was first observed mined.
       */
      confirmedAtBlock: bigint | null
      status: $Enums.BroadcastJobStatus
      attempts: number
      lastError: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["broadcastJob"]>
    composites: {}
  }

  type BroadcastJobGetPayload<S extends boolean | null | undefined | BroadcastJobDefaultArgs> = $Result.GetResult<Prisma.$BroadcastJobPayload, S>

  type BroadcastJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BroadcastJobFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BroadcastJobCountAggregateInputType | true
    }

  export interface BroadcastJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BroadcastJob'], meta: { name: 'BroadcastJob' } }
    /**
     * Find zero or one BroadcastJob that matches the filter.
     * @param {BroadcastJobFindUniqueArgs} args - Arguments to find a BroadcastJob
     * @example
     * // Get one BroadcastJob
     * const broadcastJob = await prisma.broadcastJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BroadcastJobFindUniqueArgs>(args: SelectSubset<T, BroadcastJobFindUniqueArgs<ExtArgs>>): Prisma__BroadcastJobClient<$Result.GetResult<Prisma.$BroadcastJobPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BroadcastJob that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BroadcastJobFindUniqueOrThrowArgs} args - Arguments to find a BroadcastJob
     * @example
     * // Get one BroadcastJob
     * const broadcastJob = await prisma.broadcastJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BroadcastJobFindUniqueOrThrowArgs>(args: SelectSubset<T, BroadcastJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BroadcastJobClient<$Result.GetResult<Prisma.$BroadcastJobPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BroadcastJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BroadcastJobFindFirstArgs} args - Arguments to find a BroadcastJob
     * @example
     * // Get one BroadcastJob
     * const broadcastJob = await prisma.broadcastJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BroadcastJobFindFirstArgs>(args?: SelectSubset<T, BroadcastJobFindFirstArgs<ExtArgs>>): Prisma__BroadcastJobClient<$Result.GetResult<Prisma.$BroadcastJobPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BroadcastJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BroadcastJobFindFirstOrThrowArgs} args - Arguments to find a BroadcastJob
     * @example
     * // Get one BroadcastJob
     * const broadcastJob = await prisma.broadcastJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BroadcastJobFindFirstOrThrowArgs>(args?: SelectSubset<T, BroadcastJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__BroadcastJobClient<$Result.GetResult<Prisma.$BroadcastJobPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BroadcastJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BroadcastJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BroadcastJobs
     * const broadcastJobs = await prisma.broadcastJob.findMany()
     * 
     * // Get first 10 BroadcastJobs
     * const broadcastJobs = await prisma.broadcastJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const broadcastJobWithIdOnly = await prisma.broadcastJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BroadcastJobFindManyArgs>(args?: SelectSubset<T, BroadcastJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BroadcastJobPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BroadcastJob.
     * @param {BroadcastJobCreateArgs} args - Arguments to create a BroadcastJob.
     * @example
     * // Create one BroadcastJob
     * const BroadcastJob = await prisma.broadcastJob.create({
     *   data: {
     *     // ... data to create a BroadcastJob
     *   }
     * })
     * 
     */
    create<T extends BroadcastJobCreateArgs>(args: SelectSubset<T, BroadcastJobCreateArgs<ExtArgs>>): Prisma__BroadcastJobClient<$Result.GetResult<Prisma.$BroadcastJobPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BroadcastJobs.
     * @param {BroadcastJobCreateManyArgs} args - Arguments to create many BroadcastJobs.
     * @example
     * // Create many BroadcastJobs
     * const broadcastJob = await prisma.broadcastJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BroadcastJobCreateManyArgs>(args?: SelectSubset<T, BroadcastJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BroadcastJobs and returns the data saved in the database.
     * @param {BroadcastJobCreateManyAndReturnArgs} args - Arguments to create many BroadcastJobs.
     * @example
     * // Create many BroadcastJobs
     * const broadcastJob = await prisma.broadcastJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BroadcastJobs and only return the `id`
     * const broadcastJobWithIdOnly = await prisma.broadcastJob.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BroadcastJobCreateManyAndReturnArgs>(args?: SelectSubset<T, BroadcastJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BroadcastJobPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BroadcastJob.
     * @param {BroadcastJobDeleteArgs} args - Arguments to delete one BroadcastJob.
     * @example
     * // Delete one BroadcastJob
     * const BroadcastJob = await prisma.broadcastJob.delete({
     *   where: {
     *     // ... filter to delete one BroadcastJob
     *   }
     * })
     * 
     */
    delete<T extends BroadcastJobDeleteArgs>(args: SelectSubset<T, BroadcastJobDeleteArgs<ExtArgs>>): Prisma__BroadcastJobClient<$Result.GetResult<Prisma.$BroadcastJobPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BroadcastJob.
     * @param {BroadcastJobUpdateArgs} args - Arguments to update one BroadcastJob.
     * @example
     * // Update one BroadcastJob
     * const broadcastJob = await prisma.broadcastJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BroadcastJobUpdateArgs>(args: SelectSubset<T, BroadcastJobUpdateArgs<ExtArgs>>): Prisma__BroadcastJobClient<$Result.GetResult<Prisma.$BroadcastJobPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BroadcastJobs.
     * @param {BroadcastJobDeleteManyArgs} args - Arguments to filter BroadcastJobs to delete.
     * @example
     * // Delete a few BroadcastJobs
     * const { count } = await prisma.broadcastJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BroadcastJobDeleteManyArgs>(args?: SelectSubset<T, BroadcastJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BroadcastJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BroadcastJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BroadcastJobs
     * const broadcastJob = await prisma.broadcastJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BroadcastJobUpdateManyArgs>(args: SelectSubset<T, BroadcastJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BroadcastJob.
     * @param {BroadcastJobUpsertArgs} args - Arguments to update or create a BroadcastJob.
     * @example
     * // Update or create a BroadcastJob
     * const broadcastJob = await prisma.broadcastJob.upsert({
     *   create: {
     *     // ... data to create a BroadcastJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BroadcastJob we want to update
     *   }
     * })
     */
    upsert<T extends BroadcastJobUpsertArgs>(args: SelectSubset<T, BroadcastJobUpsertArgs<ExtArgs>>): Prisma__BroadcastJobClient<$Result.GetResult<Prisma.$BroadcastJobPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BroadcastJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BroadcastJobCountArgs} args - Arguments to filter BroadcastJobs to count.
     * @example
     * // Count the number of BroadcastJobs
     * const count = await prisma.broadcastJob.count({
     *   where: {
     *     // ... the filter for the BroadcastJobs we want to count
     *   }
     * })
    **/
    count<T extends BroadcastJobCountArgs>(
      args?: Subset<T, BroadcastJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BroadcastJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BroadcastJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BroadcastJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BroadcastJobAggregateArgs>(args: Subset<T, BroadcastJobAggregateArgs>): Prisma.PrismaPromise<GetBroadcastJobAggregateType<T>>

    /**
     * Group by BroadcastJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BroadcastJobGroupByArgs} args - Group by arguments.
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
      T extends BroadcastJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BroadcastJobGroupByArgs['orderBy'] }
        : { orderBy?: BroadcastJobGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BroadcastJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBroadcastJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BroadcastJob model
   */
  readonly fields: BroadcastJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BroadcastJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BroadcastJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the BroadcastJob model
   */ 
  interface BroadcastJobFieldRefs {
    readonly id: FieldRef<"BroadcastJob", 'String'>
    readonly idempotencyKey: FieldRef<"BroadcastJob", 'String'>
    readonly walletId: FieldRef<"BroadcastJob", 'String'>
    readonly chain: FieldRef<"BroadcastJob", 'Chain'>
    readonly kind: FieldRef<"BroadcastJob", 'BroadcastJobKind'>
    readonly destinationAddress: FieldRef<"BroadcastJob", 'String'>
    readonly amountMinor: FieldRef<"BroadcastJob", 'BigInt'>
    readonly asset: FieldRef<"BroadcastJob", 'String'>
    readonly iouIssuer: FieldRef<"BroadcastJob", 'String'>
    readonly destinationTag: FieldRef<"BroadcastJob", 'Int'>
    readonly memo: FieldRef<"BroadcastJob", 'String'>
    readonly intentId: FieldRef<"BroadcastJob", 'String'>
    readonly dealId: FieldRef<"BroadcastJob", 'String'>
    readonly escrowContract: FieldRef<"BroadcastJob", 'String'>
    readonly escrowDeadline: FieldRef<"BroadcastJob", 'BigInt'>
    readonly swapPayload: FieldRef<"BroadcastJob", 'Json'>
    readonly bridgePayload: FieldRef<"BroadcastJob", 'Json'>
    readonly salysdPayload: FieldRef<"BroadcastJob", 'Json'>
    readonly contractCallPayload: FieldRef<"BroadcastJob", 'Json'>
    readonly rawTx: FieldRef<"BroadcastJob", 'String'>
    readonly txHash: FieldRef<"BroadcastJob", 'String'>
    readonly confirmedAtBlock: FieldRef<"BroadcastJob", 'BigInt'>
    readonly status: FieldRef<"BroadcastJob", 'BroadcastJobStatus'>
    readonly attempts: FieldRef<"BroadcastJob", 'Int'>
    readonly lastError: FieldRef<"BroadcastJob", 'String'>
    readonly createdAt: FieldRef<"BroadcastJob", 'DateTime'>
    readonly updatedAt: FieldRef<"BroadcastJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BroadcastJob findUnique
   */
  export type BroadcastJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastJob
     */
    select?: BroadcastJobSelect<ExtArgs> | null
    /**
     * Filter, which BroadcastJob to fetch.
     */
    where: BroadcastJobWhereUniqueInput
  }

  /**
   * BroadcastJob findUniqueOrThrow
   */
  export type BroadcastJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastJob
     */
    select?: BroadcastJobSelect<ExtArgs> | null
    /**
     * Filter, which BroadcastJob to fetch.
     */
    where: BroadcastJobWhereUniqueInput
  }

  /**
   * BroadcastJob findFirst
   */
  export type BroadcastJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastJob
     */
    select?: BroadcastJobSelect<ExtArgs> | null
    /**
     * Filter, which BroadcastJob to fetch.
     */
    where?: BroadcastJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BroadcastJobs to fetch.
     */
    orderBy?: BroadcastJobOrderByWithRelationInput | BroadcastJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BroadcastJobs.
     */
    cursor?: BroadcastJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BroadcastJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BroadcastJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BroadcastJobs.
     */
    distinct?: BroadcastJobScalarFieldEnum | BroadcastJobScalarFieldEnum[]
  }

  /**
   * BroadcastJob findFirstOrThrow
   */
  export type BroadcastJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastJob
     */
    select?: BroadcastJobSelect<ExtArgs> | null
    /**
     * Filter, which BroadcastJob to fetch.
     */
    where?: BroadcastJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BroadcastJobs to fetch.
     */
    orderBy?: BroadcastJobOrderByWithRelationInput | BroadcastJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BroadcastJobs.
     */
    cursor?: BroadcastJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BroadcastJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BroadcastJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BroadcastJobs.
     */
    distinct?: BroadcastJobScalarFieldEnum | BroadcastJobScalarFieldEnum[]
  }

  /**
   * BroadcastJob findMany
   */
  export type BroadcastJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastJob
     */
    select?: BroadcastJobSelect<ExtArgs> | null
    /**
     * Filter, which BroadcastJobs to fetch.
     */
    where?: BroadcastJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BroadcastJobs to fetch.
     */
    orderBy?: BroadcastJobOrderByWithRelationInput | BroadcastJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BroadcastJobs.
     */
    cursor?: BroadcastJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BroadcastJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BroadcastJobs.
     */
    skip?: number
    distinct?: BroadcastJobScalarFieldEnum | BroadcastJobScalarFieldEnum[]
  }

  /**
   * BroadcastJob create
   */
  export type BroadcastJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastJob
     */
    select?: BroadcastJobSelect<ExtArgs> | null
    /**
     * The data needed to create a BroadcastJob.
     */
    data: XOR<BroadcastJobCreateInput, BroadcastJobUncheckedCreateInput>
  }

  /**
   * BroadcastJob createMany
   */
  export type BroadcastJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BroadcastJobs.
     */
    data: BroadcastJobCreateManyInput | BroadcastJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BroadcastJob createManyAndReturn
   */
  export type BroadcastJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastJob
     */
    select?: BroadcastJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BroadcastJobs.
     */
    data: BroadcastJobCreateManyInput | BroadcastJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BroadcastJob update
   */
  export type BroadcastJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastJob
     */
    select?: BroadcastJobSelect<ExtArgs> | null
    /**
     * The data needed to update a BroadcastJob.
     */
    data: XOR<BroadcastJobUpdateInput, BroadcastJobUncheckedUpdateInput>
    /**
     * Choose, which BroadcastJob to update.
     */
    where: BroadcastJobWhereUniqueInput
  }

  /**
   * BroadcastJob updateMany
   */
  export type BroadcastJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BroadcastJobs.
     */
    data: XOR<BroadcastJobUpdateManyMutationInput, BroadcastJobUncheckedUpdateManyInput>
    /**
     * Filter which BroadcastJobs to update
     */
    where?: BroadcastJobWhereInput
  }

  /**
   * BroadcastJob upsert
   */
  export type BroadcastJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastJob
     */
    select?: BroadcastJobSelect<ExtArgs> | null
    /**
     * The filter to search for the BroadcastJob to update in case it exists.
     */
    where: BroadcastJobWhereUniqueInput
    /**
     * In case the BroadcastJob found by the `where` argument doesn't exist, create a new BroadcastJob with this data.
     */
    create: XOR<BroadcastJobCreateInput, BroadcastJobUncheckedCreateInput>
    /**
     * In case the BroadcastJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BroadcastJobUpdateInput, BroadcastJobUncheckedUpdateInput>
  }

  /**
   * BroadcastJob delete
   */
  export type BroadcastJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastJob
     */
    select?: BroadcastJobSelect<ExtArgs> | null
    /**
     * Filter which BroadcastJob to delete.
     */
    where: BroadcastJobWhereUniqueInput
  }

  /**
   * BroadcastJob deleteMany
   */
  export type BroadcastJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BroadcastJobs to delete
     */
    where?: BroadcastJobWhereInput
  }

  /**
   * BroadcastJob without action
   */
  export type BroadcastJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BroadcastJob
     */
    select?: BroadcastJobSelect<ExtArgs> | null
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


  export const WalletScalarFieldEnum: {
    id: 'id',
    chain: 'chain',
    address: 'address',
    kind: 'kind',
    status: 'status',
    ownerId: 'ownerId',
    ownerKind: 'ownerKind',
    label: 'label',
    signerKeyRef: 'signerKeyRef',
    ledgerAccountId: 'ledgerAccountId',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum]


  export const WalletPolicyScalarFieldEnum: {
    walletId: 'walletId',
    destinationAllowlist: 'destinationAllowlist',
    trustedIssuerAllowlist: 'trustedIssuerAllowlist',
    perTxCapMinor: 'perTxCapMinor',
    dailyCapMinor: 'dailyCapMinor',
    approvalThresholdMinor: 'approvalThresholdMinor',
    requiredApprovers: 'requiredApprovers',
    updatedAt: 'updatedAt'
  };

  export type WalletPolicyScalarFieldEnum = (typeof WalletPolicyScalarFieldEnum)[keyof typeof WalletPolicyScalarFieldEnum]


  export const BroadcastJobScalarFieldEnum: {
    id: 'id',
    idempotencyKey: 'idempotencyKey',
    walletId: 'walletId',
    chain: 'chain',
    kind: 'kind',
    destinationAddress: 'destinationAddress',
    amountMinor: 'amountMinor',
    asset: 'asset',
    iouIssuer: 'iouIssuer',
    destinationTag: 'destinationTag',
    memo: 'memo',
    intentId: 'intentId',
    dealId: 'dealId',
    escrowContract: 'escrowContract',
    escrowDeadline: 'escrowDeadline',
    swapPayload: 'swapPayload',
    bridgePayload: 'bridgePayload',
    salysdPayload: 'salysdPayload',
    contractCallPayload: 'contractCallPayload',
    rawTx: 'rawTx',
    txHash: 'txHash',
    confirmedAtBlock: 'confirmedAtBlock',
    status: 'status',
    attempts: 'attempts',
    lastError: 'lastError',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BroadcastJobScalarFieldEnum = (typeof BroadcastJobScalarFieldEnum)[keyof typeof BroadcastJobScalarFieldEnum]


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
   * Reference to a field of type 'Chain'
   */
  export type EnumChainFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Chain'>
    


  /**
   * Reference to a field of type 'Chain[]'
   */
  export type ListEnumChainFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Chain[]'>
    


  /**
   * Reference to a field of type 'WalletKind'
   */
  export type EnumWalletKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletKind'>
    


  /**
   * Reference to a field of type 'WalletKind[]'
   */
  export type ListEnumWalletKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletKind[]'>
    


  /**
   * Reference to a field of type 'WalletStatus'
   */
  export type EnumWalletStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletStatus'>
    


  /**
   * Reference to a field of type 'WalletStatus[]'
   */
  export type ListEnumWalletStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletStatus[]'>
    


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
   * Reference to a field of type 'BroadcastJobKind'
   */
  export type EnumBroadcastJobKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BroadcastJobKind'>
    


  /**
   * Reference to a field of type 'BroadcastJobKind[]'
   */
  export type ListEnumBroadcastJobKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BroadcastJobKind[]'>
    


  /**
   * Reference to a field of type 'BroadcastJobStatus'
   */
  export type EnumBroadcastJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BroadcastJobStatus'>
    


  /**
   * Reference to a field of type 'BroadcastJobStatus[]'
   */
  export type ListEnumBroadcastJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BroadcastJobStatus[]'>
    


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


  export type WalletWhereInput = {
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    id?: UuidFilter<"Wallet"> | string
    chain?: EnumChainFilter<"Wallet"> | $Enums.Chain
    address?: StringFilter<"Wallet"> | string
    kind?: EnumWalletKindFilter<"Wallet"> | $Enums.WalletKind
    status?: EnumWalletStatusFilter<"Wallet"> | $Enums.WalletStatus
    ownerId?: StringNullableFilter<"Wallet"> | string | null
    ownerKind?: StringNullableFilter<"Wallet"> | string | null
    label?: StringNullableFilter<"Wallet"> | string | null
    signerKeyRef?: StringFilter<"Wallet"> | string
    ledgerAccountId?: UuidNullableFilter<"Wallet"> | string | null
    metadata?: JsonNullableFilter<"Wallet">
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
    policy?: XOR<WalletPolicyNullableRelationFilter, WalletPolicyWhereInput> | null
  }

  export type WalletOrderByWithRelationInput = {
    id?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    kind?: SortOrder
    status?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    ownerKind?: SortOrderInput | SortOrder
    label?: SortOrderInput | SortOrder
    signerKeyRef?: SortOrder
    ledgerAccountId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    policy?: WalletPolicyOrderByWithRelationInput
  }

  export type WalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    chain_address?: WalletChainAddressCompoundUniqueInput
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    chain?: EnumChainFilter<"Wallet"> | $Enums.Chain
    address?: StringFilter<"Wallet"> | string
    kind?: EnumWalletKindFilter<"Wallet"> | $Enums.WalletKind
    status?: EnumWalletStatusFilter<"Wallet"> | $Enums.WalletStatus
    ownerId?: StringNullableFilter<"Wallet"> | string | null
    ownerKind?: StringNullableFilter<"Wallet"> | string | null
    label?: StringNullableFilter<"Wallet"> | string | null
    signerKeyRef?: StringFilter<"Wallet"> | string
    ledgerAccountId?: UuidNullableFilter<"Wallet"> | string | null
    metadata?: JsonNullableFilter<"Wallet">
    createdAt?: DateTimeFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeFilter<"Wallet"> | Date | string
    policy?: XOR<WalletPolicyNullableRelationFilter, WalletPolicyWhereInput> | null
  }, "id" | "chain_address">

  export type WalletOrderByWithAggregationInput = {
    id?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    kind?: SortOrder
    status?: SortOrder
    ownerId?: SortOrderInput | SortOrder
    ownerKind?: SortOrderInput | SortOrder
    label?: SortOrderInput | SortOrder
    signerKeyRef?: SortOrder
    ledgerAccountId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WalletCountOrderByAggregateInput
    _max?: WalletMaxOrderByAggregateInput
    _min?: WalletMinOrderByAggregateInput
  }

  export type WalletScalarWhereWithAggregatesInput = {
    AND?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    OR?: WalletScalarWhereWithAggregatesInput[]
    NOT?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Wallet"> | string
    chain?: EnumChainWithAggregatesFilter<"Wallet"> | $Enums.Chain
    address?: StringWithAggregatesFilter<"Wallet"> | string
    kind?: EnumWalletKindWithAggregatesFilter<"Wallet"> | $Enums.WalletKind
    status?: EnumWalletStatusWithAggregatesFilter<"Wallet"> | $Enums.WalletStatus
    ownerId?: StringNullableWithAggregatesFilter<"Wallet"> | string | null
    ownerKind?: StringNullableWithAggregatesFilter<"Wallet"> | string | null
    label?: StringNullableWithAggregatesFilter<"Wallet"> | string | null
    signerKeyRef?: StringWithAggregatesFilter<"Wallet"> | string
    ledgerAccountId?: UuidNullableWithAggregatesFilter<"Wallet"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Wallet">
    createdAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Wallet"> | Date | string
  }

  export type WalletPolicyWhereInput = {
    AND?: WalletPolicyWhereInput | WalletPolicyWhereInput[]
    OR?: WalletPolicyWhereInput[]
    NOT?: WalletPolicyWhereInput | WalletPolicyWhereInput[]
    walletId?: UuidFilter<"WalletPolicy"> | string
    destinationAllowlist?: JsonFilter<"WalletPolicy">
    trustedIssuerAllowlist?: JsonFilter<"WalletPolicy">
    perTxCapMinor?: BigIntFilter<"WalletPolicy"> | bigint | number
    dailyCapMinor?: BigIntFilter<"WalletPolicy"> | bigint | number
    approvalThresholdMinor?: BigIntFilter<"WalletPolicy"> | bigint | number
    requiredApprovers?: IntFilter<"WalletPolicy"> | number
    updatedAt?: DateTimeFilter<"WalletPolicy"> | Date | string
    wallet?: XOR<WalletRelationFilter, WalletWhereInput>
  }

  export type WalletPolicyOrderByWithRelationInput = {
    walletId?: SortOrder
    destinationAllowlist?: SortOrder
    trustedIssuerAllowlist?: SortOrder
    perTxCapMinor?: SortOrder
    dailyCapMinor?: SortOrder
    approvalThresholdMinor?: SortOrder
    requiredApprovers?: SortOrder
    updatedAt?: SortOrder
    wallet?: WalletOrderByWithRelationInput
  }

  export type WalletPolicyWhereUniqueInput = Prisma.AtLeast<{
    walletId?: string
    AND?: WalletPolicyWhereInput | WalletPolicyWhereInput[]
    OR?: WalletPolicyWhereInput[]
    NOT?: WalletPolicyWhereInput | WalletPolicyWhereInput[]
    destinationAllowlist?: JsonFilter<"WalletPolicy">
    trustedIssuerAllowlist?: JsonFilter<"WalletPolicy">
    perTxCapMinor?: BigIntFilter<"WalletPolicy"> | bigint | number
    dailyCapMinor?: BigIntFilter<"WalletPolicy"> | bigint | number
    approvalThresholdMinor?: BigIntFilter<"WalletPolicy"> | bigint | number
    requiredApprovers?: IntFilter<"WalletPolicy"> | number
    updatedAt?: DateTimeFilter<"WalletPolicy"> | Date | string
    wallet?: XOR<WalletRelationFilter, WalletWhereInput>
  }, "walletId">

  export type WalletPolicyOrderByWithAggregationInput = {
    walletId?: SortOrder
    destinationAllowlist?: SortOrder
    trustedIssuerAllowlist?: SortOrder
    perTxCapMinor?: SortOrder
    dailyCapMinor?: SortOrder
    approvalThresholdMinor?: SortOrder
    requiredApprovers?: SortOrder
    updatedAt?: SortOrder
    _count?: WalletPolicyCountOrderByAggregateInput
    _avg?: WalletPolicyAvgOrderByAggregateInput
    _max?: WalletPolicyMaxOrderByAggregateInput
    _min?: WalletPolicyMinOrderByAggregateInput
    _sum?: WalletPolicySumOrderByAggregateInput
  }

  export type WalletPolicyScalarWhereWithAggregatesInput = {
    AND?: WalletPolicyScalarWhereWithAggregatesInput | WalletPolicyScalarWhereWithAggregatesInput[]
    OR?: WalletPolicyScalarWhereWithAggregatesInput[]
    NOT?: WalletPolicyScalarWhereWithAggregatesInput | WalletPolicyScalarWhereWithAggregatesInput[]
    walletId?: UuidWithAggregatesFilter<"WalletPolicy"> | string
    destinationAllowlist?: JsonWithAggregatesFilter<"WalletPolicy">
    trustedIssuerAllowlist?: JsonWithAggregatesFilter<"WalletPolicy">
    perTxCapMinor?: BigIntWithAggregatesFilter<"WalletPolicy"> | bigint | number
    dailyCapMinor?: BigIntWithAggregatesFilter<"WalletPolicy"> | bigint | number
    approvalThresholdMinor?: BigIntWithAggregatesFilter<"WalletPolicy"> | bigint | number
    requiredApprovers?: IntWithAggregatesFilter<"WalletPolicy"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"WalletPolicy"> | Date | string
  }

  export type BroadcastJobWhereInput = {
    AND?: BroadcastJobWhereInput | BroadcastJobWhereInput[]
    OR?: BroadcastJobWhereInput[]
    NOT?: BroadcastJobWhereInput | BroadcastJobWhereInput[]
    id?: UuidFilter<"BroadcastJob"> | string
    idempotencyKey?: StringFilter<"BroadcastJob"> | string
    walletId?: UuidFilter<"BroadcastJob"> | string
    chain?: EnumChainFilter<"BroadcastJob"> | $Enums.Chain
    kind?: EnumBroadcastJobKindFilter<"BroadcastJob"> | $Enums.BroadcastJobKind
    destinationAddress?: StringFilter<"BroadcastJob"> | string
    amountMinor?: BigIntFilter<"BroadcastJob"> | bigint | number
    asset?: StringFilter<"BroadcastJob"> | string
    iouIssuer?: StringNullableFilter<"BroadcastJob"> | string | null
    destinationTag?: IntNullableFilter<"BroadcastJob"> | number | null
    memo?: StringNullableFilter<"BroadcastJob"> | string | null
    intentId?: StringNullableFilter<"BroadcastJob"> | string | null
    dealId?: StringNullableFilter<"BroadcastJob"> | string | null
    escrowContract?: StringNullableFilter<"BroadcastJob"> | string | null
    escrowDeadline?: BigIntNullableFilter<"BroadcastJob"> | bigint | number | null
    swapPayload?: JsonNullableFilter<"BroadcastJob">
    bridgePayload?: JsonNullableFilter<"BroadcastJob">
    salysdPayload?: JsonNullableFilter<"BroadcastJob">
    contractCallPayload?: JsonNullableFilter<"BroadcastJob">
    rawTx?: StringNullableFilter<"BroadcastJob"> | string | null
    txHash?: StringNullableFilter<"BroadcastJob"> | string | null
    confirmedAtBlock?: BigIntNullableFilter<"BroadcastJob"> | bigint | number | null
    status?: EnumBroadcastJobStatusFilter<"BroadcastJob"> | $Enums.BroadcastJobStatus
    attempts?: IntFilter<"BroadcastJob"> | number
    lastError?: StringNullableFilter<"BroadcastJob"> | string | null
    createdAt?: DateTimeFilter<"BroadcastJob"> | Date | string
    updatedAt?: DateTimeFilter<"BroadcastJob"> | Date | string
  }

  export type BroadcastJobOrderByWithRelationInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    walletId?: SortOrder
    chain?: SortOrder
    kind?: SortOrder
    destinationAddress?: SortOrder
    amountMinor?: SortOrder
    asset?: SortOrder
    iouIssuer?: SortOrderInput | SortOrder
    destinationTag?: SortOrderInput | SortOrder
    memo?: SortOrderInput | SortOrder
    intentId?: SortOrderInput | SortOrder
    dealId?: SortOrderInput | SortOrder
    escrowContract?: SortOrderInput | SortOrder
    escrowDeadline?: SortOrderInput | SortOrder
    swapPayload?: SortOrderInput | SortOrder
    bridgePayload?: SortOrderInput | SortOrder
    salysdPayload?: SortOrderInput | SortOrder
    contractCallPayload?: SortOrderInput | SortOrder
    rawTx?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    confirmedAtBlock?: SortOrderInput | SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BroadcastJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    txHash?: string
    walletId_idempotencyKey?: BroadcastJobWalletIdIdempotencyKeyCompoundUniqueInput
    AND?: BroadcastJobWhereInput | BroadcastJobWhereInput[]
    OR?: BroadcastJobWhereInput[]
    NOT?: BroadcastJobWhereInput | BroadcastJobWhereInput[]
    idempotencyKey?: StringFilter<"BroadcastJob"> | string
    walletId?: UuidFilter<"BroadcastJob"> | string
    chain?: EnumChainFilter<"BroadcastJob"> | $Enums.Chain
    kind?: EnumBroadcastJobKindFilter<"BroadcastJob"> | $Enums.BroadcastJobKind
    destinationAddress?: StringFilter<"BroadcastJob"> | string
    amountMinor?: BigIntFilter<"BroadcastJob"> | bigint | number
    asset?: StringFilter<"BroadcastJob"> | string
    iouIssuer?: StringNullableFilter<"BroadcastJob"> | string | null
    destinationTag?: IntNullableFilter<"BroadcastJob"> | number | null
    memo?: StringNullableFilter<"BroadcastJob"> | string | null
    intentId?: StringNullableFilter<"BroadcastJob"> | string | null
    dealId?: StringNullableFilter<"BroadcastJob"> | string | null
    escrowContract?: StringNullableFilter<"BroadcastJob"> | string | null
    escrowDeadline?: BigIntNullableFilter<"BroadcastJob"> | bigint | number | null
    swapPayload?: JsonNullableFilter<"BroadcastJob">
    bridgePayload?: JsonNullableFilter<"BroadcastJob">
    salysdPayload?: JsonNullableFilter<"BroadcastJob">
    contractCallPayload?: JsonNullableFilter<"BroadcastJob">
    rawTx?: StringNullableFilter<"BroadcastJob"> | string | null
    confirmedAtBlock?: BigIntNullableFilter<"BroadcastJob"> | bigint | number | null
    status?: EnumBroadcastJobStatusFilter<"BroadcastJob"> | $Enums.BroadcastJobStatus
    attempts?: IntFilter<"BroadcastJob"> | number
    lastError?: StringNullableFilter<"BroadcastJob"> | string | null
    createdAt?: DateTimeFilter<"BroadcastJob"> | Date | string
    updatedAt?: DateTimeFilter<"BroadcastJob"> | Date | string
  }, "id" | "txHash" | "walletId_idempotencyKey">

  export type BroadcastJobOrderByWithAggregationInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    walletId?: SortOrder
    chain?: SortOrder
    kind?: SortOrder
    destinationAddress?: SortOrder
    amountMinor?: SortOrder
    asset?: SortOrder
    iouIssuer?: SortOrderInput | SortOrder
    destinationTag?: SortOrderInput | SortOrder
    memo?: SortOrderInput | SortOrder
    intentId?: SortOrderInput | SortOrder
    dealId?: SortOrderInput | SortOrder
    escrowContract?: SortOrderInput | SortOrder
    escrowDeadline?: SortOrderInput | SortOrder
    swapPayload?: SortOrderInput | SortOrder
    bridgePayload?: SortOrderInput | SortOrder
    salysdPayload?: SortOrderInput | SortOrder
    contractCallPayload?: SortOrderInput | SortOrder
    rawTx?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    confirmedAtBlock?: SortOrderInput | SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BroadcastJobCountOrderByAggregateInput
    _avg?: BroadcastJobAvgOrderByAggregateInput
    _max?: BroadcastJobMaxOrderByAggregateInput
    _min?: BroadcastJobMinOrderByAggregateInput
    _sum?: BroadcastJobSumOrderByAggregateInput
  }

  export type BroadcastJobScalarWhereWithAggregatesInput = {
    AND?: BroadcastJobScalarWhereWithAggregatesInput | BroadcastJobScalarWhereWithAggregatesInput[]
    OR?: BroadcastJobScalarWhereWithAggregatesInput[]
    NOT?: BroadcastJobScalarWhereWithAggregatesInput | BroadcastJobScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"BroadcastJob"> | string
    idempotencyKey?: StringWithAggregatesFilter<"BroadcastJob"> | string
    walletId?: UuidWithAggregatesFilter<"BroadcastJob"> | string
    chain?: EnumChainWithAggregatesFilter<"BroadcastJob"> | $Enums.Chain
    kind?: EnumBroadcastJobKindWithAggregatesFilter<"BroadcastJob"> | $Enums.BroadcastJobKind
    destinationAddress?: StringWithAggregatesFilter<"BroadcastJob"> | string
    amountMinor?: BigIntWithAggregatesFilter<"BroadcastJob"> | bigint | number
    asset?: StringWithAggregatesFilter<"BroadcastJob"> | string
    iouIssuer?: StringNullableWithAggregatesFilter<"BroadcastJob"> | string | null
    destinationTag?: IntNullableWithAggregatesFilter<"BroadcastJob"> | number | null
    memo?: StringNullableWithAggregatesFilter<"BroadcastJob"> | string | null
    intentId?: StringNullableWithAggregatesFilter<"BroadcastJob"> | string | null
    dealId?: StringNullableWithAggregatesFilter<"BroadcastJob"> | string | null
    escrowContract?: StringNullableWithAggregatesFilter<"BroadcastJob"> | string | null
    escrowDeadline?: BigIntNullableWithAggregatesFilter<"BroadcastJob"> | bigint | number | null
    swapPayload?: JsonNullableWithAggregatesFilter<"BroadcastJob">
    bridgePayload?: JsonNullableWithAggregatesFilter<"BroadcastJob">
    salysdPayload?: JsonNullableWithAggregatesFilter<"BroadcastJob">
    contractCallPayload?: JsonNullableWithAggregatesFilter<"BroadcastJob">
    rawTx?: StringNullableWithAggregatesFilter<"BroadcastJob"> | string | null
    txHash?: StringNullableWithAggregatesFilter<"BroadcastJob"> | string | null
    confirmedAtBlock?: BigIntNullableWithAggregatesFilter<"BroadcastJob"> | bigint | number | null
    status?: EnumBroadcastJobStatusWithAggregatesFilter<"BroadcastJob"> | $Enums.BroadcastJobStatus
    attempts?: IntWithAggregatesFilter<"BroadcastJob"> | number
    lastError?: StringNullableWithAggregatesFilter<"BroadcastJob"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BroadcastJob"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BroadcastJob"> | Date | string
  }

  export type WalletCreateInput = {
    id?: string
    chain: $Enums.Chain
    address: string
    kind: $Enums.WalletKind
    status?: $Enums.WalletStatus
    ownerId?: string | null
    ownerKind?: string | null
    label?: string | null
    signerKeyRef: string
    ledgerAccountId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    policy?: WalletPolicyCreateNestedOneWithoutWalletInput
  }

  export type WalletUncheckedCreateInput = {
    id?: string
    chain: $Enums.Chain
    address: string
    kind: $Enums.WalletKind
    status?: $Enums.WalletStatus
    ownerId?: string | null
    ownerKind?: string | null
    label?: string | null
    signerKeyRef: string
    ledgerAccountId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    policy?: WalletPolicyUncheckedCreateNestedOneWithoutWalletInput
  }

  export type WalletUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: EnumChainFieldUpdateOperationsInput | $Enums.Chain
    address?: StringFieldUpdateOperationsInput | string
    kind?: EnumWalletKindFieldUpdateOperationsInput | $Enums.WalletKind
    status?: EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerKind?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    signerKeyRef?: StringFieldUpdateOperationsInput | string
    ledgerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy?: WalletPolicyUpdateOneWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: EnumChainFieldUpdateOperationsInput | $Enums.Chain
    address?: StringFieldUpdateOperationsInput | string
    kind?: EnumWalletKindFieldUpdateOperationsInput | $Enums.WalletKind
    status?: EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerKind?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    signerKeyRef?: StringFieldUpdateOperationsInput | string
    ledgerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    policy?: WalletPolicyUncheckedUpdateOneWithoutWalletNestedInput
  }

  export type WalletCreateManyInput = {
    id?: string
    chain: $Enums.Chain
    address: string
    kind: $Enums.WalletKind
    status?: $Enums.WalletStatus
    ownerId?: string | null
    ownerKind?: string | null
    label?: string | null
    signerKeyRef: string
    ledgerAccountId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: EnumChainFieldUpdateOperationsInput | $Enums.Chain
    address?: StringFieldUpdateOperationsInput | string
    kind?: EnumWalletKindFieldUpdateOperationsInput | $Enums.WalletKind
    status?: EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerKind?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    signerKeyRef?: StringFieldUpdateOperationsInput | string
    ledgerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: EnumChainFieldUpdateOperationsInput | $Enums.Chain
    address?: StringFieldUpdateOperationsInput | string
    kind?: EnumWalletKindFieldUpdateOperationsInput | $Enums.WalletKind
    status?: EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerKind?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    signerKeyRef?: StringFieldUpdateOperationsInput | string
    ledgerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletPolicyCreateInput = {
    destinationAllowlist: JsonNullValueInput | InputJsonValue
    trustedIssuerAllowlist?: JsonNullValueInput | InputJsonValue
    perTxCapMinor: bigint | number
    dailyCapMinor: bigint | number
    approvalThresholdMinor: bigint | number
    requiredApprovers?: number
    updatedAt?: Date | string
    wallet: WalletCreateNestedOneWithoutPolicyInput
  }

  export type WalletPolicyUncheckedCreateInput = {
    walletId: string
    destinationAllowlist: JsonNullValueInput | InputJsonValue
    trustedIssuerAllowlist?: JsonNullValueInput | InputJsonValue
    perTxCapMinor: bigint | number
    dailyCapMinor: bigint | number
    approvalThresholdMinor: bigint | number
    requiredApprovers?: number
    updatedAt?: Date | string
  }

  export type WalletPolicyUpdateInput = {
    destinationAllowlist?: JsonNullValueInput | InputJsonValue
    trustedIssuerAllowlist?: JsonNullValueInput | InputJsonValue
    perTxCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    dailyCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    approvalThresholdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUpdateOneRequiredWithoutPolicyNestedInput
  }

  export type WalletPolicyUncheckedUpdateInput = {
    walletId?: StringFieldUpdateOperationsInput | string
    destinationAllowlist?: JsonNullValueInput | InputJsonValue
    trustedIssuerAllowlist?: JsonNullValueInput | InputJsonValue
    perTxCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    dailyCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    approvalThresholdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletPolicyCreateManyInput = {
    walletId: string
    destinationAllowlist: JsonNullValueInput | InputJsonValue
    trustedIssuerAllowlist?: JsonNullValueInput | InputJsonValue
    perTxCapMinor: bigint | number
    dailyCapMinor: bigint | number
    approvalThresholdMinor: bigint | number
    requiredApprovers?: number
    updatedAt?: Date | string
  }

  export type WalletPolicyUpdateManyMutationInput = {
    destinationAllowlist?: JsonNullValueInput | InputJsonValue
    trustedIssuerAllowlist?: JsonNullValueInput | InputJsonValue
    perTxCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    dailyCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    approvalThresholdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletPolicyUncheckedUpdateManyInput = {
    walletId?: StringFieldUpdateOperationsInput | string
    destinationAllowlist?: JsonNullValueInput | InputJsonValue
    trustedIssuerAllowlist?: JsonNullValueInput | InputJsonValue
    perTxCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    dailyCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    approvalThresholdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BroadcastJobCreateInput = {
    id?: string
    idempotencyKey: string
    walletId: string
    chain: $Enums.Chain
    kind?: $Enums.BroadcastJobKind
    destinationAddress: string
    amountMinor: bigint | number
    asset: string
    iouIssuer?: string | null
    destinationTag?: number | null
    memo?: string | null
    intentId?: string | null
    dealId?: string | null
    escrowContract?: string | null
    escrowDeadline?: bigint | number | null
    swapPayload?: NullableJsonNullValueInput | InputJsonValue
    bridgePayload?: NullableJsonNullValueInput | InputJsonValue
    salysdPayload?: NullableJsonNullValueInput | InputJsonValue
    contractCallPayload?: NullableJsonNullValueInput | InputJsonValue
    rawTx?: string | null
    txHash?: string | null
    confirmedAtBlock?: bigint | number | null
    status?: $Enums.BroadcastJobStatus
    attempts?: number
    lastError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BroadcastJobUncheckedCreateInput = {
    id?: string
    idempotencyKey: string
    walletId: string
    chain: $Enums.Chain
    kind?: $Enums.BroadcastJobKind
    destinationAddress: string
    amountMinor: bigint | number
    asset: string
    iouIssuer?: string | null
    destinationTag?: number | null
    memo?: string | null
    intentId?: string | null
    dealId?: string | null
    escrowContract?: string | null
    escrowDeadline?: bigint | number | null
    swapPayload?: NullableJsonNullValueInput | InputJsonValue
    bridgePayload?: NullableJsonNullValueInput | InputJsonValue
    salysdPayload?: NullableJsonNullValueInput | InputJsonValue
    contractCallPayload?: NullableJsonNullValueInput | InputJsonValue
    rawTx?: string | null
    txHash?: string | null
    confirmedAtBlock?: bigint | number | null
    status?: $Enums.BroadcastJobStatus
    attempts?: number
    lastError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BroadcastJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    chain?: EnumChainFieldUpdateOperationsInput | $Enums.Chain
    kind?: EnumBroadcastJobKindFieldUpdateOperationsInput | $Enums.BroadcastJobKind
    destinationAddress?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    asset?: StringFieldUpdateOperationsInput | string
    iouIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    destinationTag?: NullableIntFieldUpdateOperationsInput | number | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    dealId?: NullableStringFieldUpdateOperationsInput | string | null
    escrowContract?: NullableStringFieldUpdateOperationsInput | string | null
    escrowDeadline?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    swapPayload?: NullableJsonNullValueInput | InputJsonValue
    bridgePayload?: NullableJsonNullValueInput | InputJsonValue
    salysdPayload?: NullableJsonNullValueInput | InputJsonValue
    contractCallPayload?: NullableJsonNullValueInput | InputJsonValue
    rawTx?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAtBlock?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumBroadcastJobStatusFieldUpdateOperationsInput | $Enums.BroadcastJobStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BroadcastJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    chain?: EnumChainFieldUpdateOperationsInput | $Enums.Chain
    kind?: EnumBroadcastJobKindFieldUpdateOperationsInput | $Enums.BroadcastJobKind
    destinationAddress?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    asset?: StringFieldUpdateOperationsInput | string
    iouIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    destinationTag?: NullableIntFieldUpdateOperationsInput | number | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    dealId?: NullableStringFieldUpdateOperationsInput | string | null
    escrowContract?: NullableStringFieldUpdateOperationsInput | string | null
    escrowDeadline?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    swapPayload?: NullableJsonNullValueInput | InputJsonValue
    bridgePayload?: NullableJsonNullValueInput | InputJsonValue
    salysdPayload?: NullableJsonNullValueInput | InputJsonValue
    contractCallPayload?: NullableJsonNullValueInput | InputJsonValue
    rawTx?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAtBlock?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumBroadcastJobStatusFieldUpdateOperationsInput | $Enums.BroadcastJobStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BroadcastJobCreateManyInput = {
    id?: string
    idempotencyKey: string
    walletId: string
    chain: $Enums.Chain
    kind?: $Enums.BroadcastJobKind
    destinationAddress: string
    amountMinor: bigint | number
    asset: string
    iouIssuer?: string | null
    destinationTag?: number | null
    memo?: string | null
    intentId?: string | null
    dealId?: string | null
    escrowContract?: string | null
    escrowDeadline?: bigint | number | null
    swapPayload?: NullableJsonNullValueInput | InputJsonValue
    bridgePayload?: NullableJsonNullValueInput | InputJsonValue
    salysdPayload?: NullableJsonNullValueInput | InputJsonValue
    contractCallPayload?: NullableJsonNullValueInput | InputJsonValue
    rawTx?: string | null
    txHash?: string | null
    confirmedAtBlock?: bigint | number | null
    status?: $Enums.BroadcastJobStatus
    attempts?: number
    lastError?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BroadcastJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    chain?: EnumChainFieldUpdateOperationsInput | $Enums.Chain
    kind?: EnumBroadcastJobKindFieldUpdateOperationsInput | $Enums.BroadcastJobKind
    destinationAddress?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    asset?: StringFieldUpdateOperationsInput | string
    iouIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    destinationTag?: NullableIntFieldUpdateOperationsInput | number | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    dealId?: NullableStringFieldUpdateOperationsInput | string | null
    escrowContract?: NullableStringFieldUpdateOperationsInput | string | null
    escrowDeadline?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    swapPayload?: NullableJsonNullValueInput | InputJsonValue
    bridgePayload?: NullableJsonNullValueInput | InputJsonValue
    salysdPayload?: NullableJsonNullValueInput | InputJsonValue
    contractCallPayload?: NullableJsonNullValueInput | InputJsonValue
    rawTx?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAtBlock?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumBroadcastJobStatusFieldUpdateOperationsInput | $Enums.BroadcastJobStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BroadcastJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    chain?: EnumChainFieldUpdateOperationsInput | $Enums.Chain
    kind?: EnumBroadcastJobKindFieldUpdateOperationsInput | $Enums.BroadcastJobKind
    destinationAddress?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    asset?: StringFieldUpdateOperationsInput | string
    iouIssuer?: NullableStringFieldUpdateOperationsInput | string | null
    destinationTag?: NullableIntFieldUpdateOperationsInput | number | null
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    dealId?: NullableStringFieldUpdateOperationsInput | string | null
    escrowContract?: NullableStringFieldUpdateOperationsInput | string | null
    escrowDeadline?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    swapPayload?: NullableJsonNullValueInput | InputJsonValue
    bridgePayload?: NullableJsonNullValueInput | InputJsonValue
    salysdPayload?: NullableJsonNullValueInput | InputJsonValue
    contractCallPayload?: NullableJsonNullValueInput | InputJsonValue
    rawTx?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    confirmedAtBlock?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumBroadcastJobStatusFieldUpdateOperationsInput | $Enums.BroadcastJobStatus
    attempts?: IntFieldUpdateOperationsInput | number
    lastError?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumChainFilter<$PrismaModel = never> = {
    equals?: $Enums.Chain | EnumChainFieldRefInput<$PrismaModel>
    in?: $Enums.Chain[] | ListEnumChainFieldRefInput<$PrismaModel>
    notIn?: $Enums.Chain[] | ListEnumChainFieldRefInput<$PrismaModel>
    not?: NestedEnumChainFilter<$PrismaModel> | $Enums.Chain
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

  export type EnumWalletKindFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletKind | EnumWalletKindFieldRefInput<$PrismaModel>
    in?: $Enums.WalletKind[] | ListEnumWalletKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.WalletKind[] | ListEnumWalletKindFieldRefInput<$PrismaModel>
    not?: NestedEnumWalletKindFilter<$PrismaModel> | $Enums.WalletKind
  }

  export type EnumWalletStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletStatus | EnumWalletStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WalletStatus[] | ListEnumWalletStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WalletStatus[] | ListEnumWalletStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWalletStatusFilter<$PrismaModel> | $Enums.WalletStatus
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

  export type WalletPolicyNullableRelationFilter = {
    is?: WalletPolicyWhereInput | null
    isNot?: WalletPolicyWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WalletChainAddressCompoundUniqueInput = {
    chain: $Enums.Chain
    address: string
  }

  export type WalletCountOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    kind?: SortOrder
    status?: SortOrder
    ownerId?: SortOrder
    ownerKind?: SortOrder
    label?: SortOrder
    signerKeyRef?: SortOrder
    ledgerAccountId?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletMaxOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    kind?: SortOrder
    status?: SortOrder
    ownerId?: SortOrder
    ownerKind?: SortOrder
    label?: SortOrder
    signerKeyRef?: SortOrder
    ledgerAccountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletMinOrderByAggregateInput = {
    id?: SortOrder
    chain?: SortOrder
    address?: SortOrder
    kind?: SortOrder
    status?: SortOrder
    ownerId?: SortOrder
    ownerKind?: SortOrder
    label?: SortOrder
    signerKeyRef?: SortOrder
    ledgerAccountId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type EnumChainWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Chain | EnumChainFieldRefInput<$PrismaModel>
    in?: $Enums.Chain[] | ListEnumChainFieldRefInput<$PrismaModel>
    notIn?: $Enums.Chain[] | ListEnumChainFieldRefInput<$PrismaModel>
    not?: NestedEnumChainWithAggregatesFilter<$PrismaModel> | $Enums.Chain
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChainFilter<$PrismaModel>
    _max?: NestedEnumChainFilter<$PrismaModel>
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

  export type EnumWalletKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletKind | EnumWalletKindFieldRefInput<$PrismaModel>
    in?: $Enums.WalletKind[] | ListEnumWalletKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.WalletKind[] | ListEnumWalletKindFieldRefInput<$PrismaModel>
    not?: NestedEnumWalletKindWithAggregatesFilter<$PrismaModel> | $Enums.WalletKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWalletKindFilter<$PrismaModel>
    _max?: NestedEnumWalletKindFilter<$PrismaModel>
  }

  export type EnumWalletStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletStatus | EnumWalletStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WalletStatus[] | ListEnumWalletStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WalletStatus[] | ListEnumWalletStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWalletStatusWithAggregatesFilter<$PrismaModel> | $Enums.WalletStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWalletStatusFilter<$PrismaModel>
    _max?: NestedEnumWalletStatusFilter<$PrismaModel>
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

  export type WalletRelationFilter = {
    is?: WalletWhereInput
    isNot?: WalletWhereInput
  }

  export type WalletPolicyCountOrderByAggregateInput = {
    walletId?: SortOrder
    destinationAllowlist?: SortOrder
    trustedIssuerAllowlist?: SortOrder
    perTxCapMinor?: SortOrder
    dailyCapMinor?: SortOrder
    approvalThresholdMinor?: SortOrder
    requiredApprovers?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletPolicyAvgOrderByAggregateInput = {
    perTxCapMinor?: SortOrder
    dailyCapMinor?: SortOrder
    approvalThresholdMinor?: SortOrder
    requiredApprovers?: SortOrder
  }

  export type WalletPolicyMaxOrderByAggregateInput = {
    walletId?: SortOrder
    perTxCapMinor?: SortOrder
    dailyCapMinor?: SortOrder
    approvalThresholdMinor?: SortOrder
    requiredApprovers?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletPolicyMinOrderByAggregateInput = {
    walletId?: SortOrder
    perTxCapMinor?: SortOrder
    dailyCapMinor?: SortOrder
    approvalThresholdMinor?: SortOrder
    requiredApprovers?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletPolicySumOrderByAggregateInput = {
    perTxCapMinor?: SortOrder
    dailyCapMinor?: SortOrder
    approvalThresholdMinor?: SortOrder
    requiredApprovers?: SortOrder
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

  export type EnumBroadcastJobKindFilter<$PrismaModel = never> = {
    equals?: $Enums.BroadcastJobKind | EnumBroadcastJobKindFieldRefInput<$PrismaModel>
    in?: $Enums.BroadcastJobKind[] | ListEnumBroadcastJobKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.BroadcastJobKind[] | ListEnumBroadcastJobKindFieldRefInput<$PrismaModel>
    not?: NestedEnumBroadcastJobKindFilter<$PrismaModel> | $Enums.BroadcastJobKind
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

  export type EnumBroadcastJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BroadcastJobStatus | EnumBroadcastJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BroadcastJobStatus[] | ListEnumBroadcastJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BroadcastJobStatus[] | ListEnumBroadcastJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBroadcastJobStatusFilter<$PrismaModel> | $Enums.BroadcastJobStatus
  }

  export type BroadcastJobWalletIdIdempotencyKeyCompoundUniqueInput = {
    walletId: string
    idempotencyKey: string
  }

  export type BroadcastJobCountOrderByAggregateInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    walletId?: SortOrder
    chain?: SortOrder
    kind?: SortOrder
    destinationAddress?: SortOrder
    amountMinor?: SortOrder
    asset?: SortOrder
    iouIssuer?: SortOrder
    destinationTag?: SortOrder
    memo?: SortOrder
    intentId?: SortOrder
    dealId?: SortOrder
    escrowContract?: SortOrder
    escrowDeadline?: SortOrder
    swapPayload?: SortOrder
    bridgePayload?: SortOrder
    salysdPayload?: SortOrder
    contractCallPayload?: SortOrder
    rawTx?: SortOrder
    txHash?: SortOrder
    confirmedAtBlock?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BroadcastJobAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
    destinationTag?: SortOrder
    escrowDeadline?: SortOrder
    confirmedAtBlock?: SortOrder
    attempts?: SortOrder
  }

  export type BroadcastJobMaxOrderByAggregateInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    walletId?: SortOrder
    chain?: SortOrder
    kind?: SortOrder
    destinationAddress?: SortOrder
    amountMinor?: SortOrder
    asset?: SortOrder
    iouIssuer?: SortOrder
    destinationTag?: SortOrder
    memo?: SortOrder
    intentId?: SortOrder
    dealId?: SortOrder
    escrowContract?: SortOrder
    escrowDeadline?: SortOrder
    rawTx?: SortOrder
    txHash?: SortOrder
    confirmedAtBlock?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BroadcastJobMinOrderByAggregateInput = {
    id?: SortOrder
    idempotencyKey?: SortOrder
    walletId?: SortOrder
    chain?: SortOrder
    kind?: SortOrder
    destinationAddress?: SortOrder
    amountMinor?: SortOrder
    asset?: SortOrder
    iouIssuer?: SortOrder
    destinationTag?: SortOrder
    memo?: SortOrder
    intentId?: SortOrder
    dealId?: SortOrder
    escrowContract?: SortOrder
    escrowDeadline?: SortOrder
    rawTx?: SortOrder
    txHash?: SortOrder
    confirmedAtBlock?: SortOrder
    status?: SortOrder
    attempts?: SortOrder
    lastError?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BroadcastJobSumOrderByAggregateInput = {
    amountMinor?: SortOrder
    destinationTag?: SortOrder
    escrowDeadline?: SortOrder
    confirmedAtBlock?: SortOrder
    attempts?: SortOrder
  }

  export type EnumBroadcastJobKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BroadcastJobKind | EnumBroadcastJobKindFieldRefInput<$PrismaModel>
    in?: $Enums.BroadcastJobKind[] | ListEnumBroadcastJobKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.BroadcastJobKind[] | ListEnumBroadcastJobKindFieldRefInput<$PrismaModel>
    not?: NestedEnumBroadcastJobKindWithAggregatesFilter<$PrismaModel> | $Enums.BroadcastJobKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBroadcastJobKindFilter<$PrismaModel>
    _max?: NestedEnumBroadcastJobKindFilter<$PrismaModel>
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

  export type EnumBroadcastJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BroadcastJobStatus | EnumBroadcastJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BroadcastJobStatus[] | ListEnumBroadcastJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BroadcastJobStatus[] | ListEnumBroadcastJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBroadcastJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.BroadcastJobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBroadcastJobStatusFilter<$PrismaModel>
    _max?: NestedEnumBroadcastJobStatusFilter<$PrismaModel>
  }

  export type WalletPolicyCreateNestedOneWithoutWalletInput = {
    create?: XOR<WalletPolicyCreateWithoutWalletInput, WalletPolicyUncheckedCreateWithoutWalletInput>
    connectOrCreate?: WalletPolicyCreateOrConnectWithoutWalletInput
    connect?: WalletPolicyWhereUniqueInput
  }

  export type WalletPolicyUncheckedCreateNestedOneWithoutWalletInput = {
    create?: XOR<WalletPolicyCreateWithoutWalletInput, WalletPolicyUncheckedCreateWithoutWalletInput>
    connectOrCreate?: WalletPolicyCreateOrConnectWithoutWalletInput
    connect?: WalletPolicyWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumChainFieldUpdateOperationsInput = {
    set?: $Enums.Chain
  }

  export type EnumWalletKindFieldUpdateOperationsInput = {
    set?: $Enums.WalletKind
  }

  export type EnumWalletStatusFieldUpdateOperationsInput = {
    set?: $Enums.WalletStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WalletPolicyUpdateOneWithoutWalletNestedInput = {
    create?: XOR<WalletPolicyCreateWithoutWalletInput, WalletPolicyUncheckedCreateWithoutWalletInput>
    connectOrCreate?: WalletPolicyCreateOrConnectWithoutWalletInput
    upsert?: WalletPolicyUpsertWithoutWalletInput
    disconnect?: WalletPolicyWhereInput | boolean
    delete?: WalletPolicyWhereInput | boolean
    connect?: WalletPolicyWhereUniqueInput
    update?: XOR<XOR<WalletPolicyUpdateToOneWithWhereWithoutWalletInput, WalletPolicyUpdateWithoutWalletInput>, WalletPolicyUncheckedUpdateWithoutWalletInput>
  }

  export type WalletPolicyUncheckedUpdateOneWithoutWalletNestedInput = {
    create?: XOR<WalletPolicyCreateWithoutWalletInput, WalletPolicyUncheckedCreateWithoutWalletInput>
    connectOrCreate?: WalletPolicyCreateOrConnectWithoutWalletInput
    upsert?: WalletPolicyUpsertWithoutWalletInput
    disconnect?: WalletPolicyWhereInput | boolean
    delete?: WalletPolicyWhereInput | boolean
    connect?: WalletPolicyWhereUniqueInput
    update?: XOR<XOR<WalletPolicyUpdateToOneWithWhereWithoutWalletInput, WalletPolicyUpdateWithoutWalletInput>, WalletPolicyUncheckedUpdateWithoutWalletInput>
  }

  export type WalletCreateNestedOneWithoutPolicyInput = {
    create?: XOR<WalletCreateWithoutPolicyInput, WalletUncheckedCreateWithoutPolicyInput>
    connectOrCreate?: WalletCreateOrConnectWithoutPolicyInput
    connect?: WalletWhereUniqueInput
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

  export type WalletUpdateOneRequiredWithoutPolicyNestedInput = {
    create?: XOR<WalletCreateWithoutPolicyInput, WalletUncheckedCreateWithoutPolicyInput>
    connectOrCreate?: WalletCreateOrConnectWithoutPolicyInput
    upsert?: WalletUpsertWithoutPolicyInput
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutPolicyInput, WalletUpdateWithoutPolicyInput>, WalletUncheckedUpdateWithoutPolicyInput>
  }

  export type EnumBroadcastJobKindFieldUpdateOperationsInput = {
    set?: $Enums.BroadcastJobKind
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumBroadcastJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.BroadcastJobStatus
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

  export type NestedEnumChainFilter<$PrismaModel = never> = {
    equals?: $Enums.Chain | EnumChainFieldRefInput<$PrismaModel>
    in?: $Enums.Chain[] | ListEnumChainFieldRefInput<$PrismaModel>
    notIn?: $Enums.Chain[] | ListEnumChainFieldRefInput<$PrismaModel>
    not?: NestedEnumChainFilter<$PrismaModel> | $Enums.Chain
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

  export type NestedEnumWalletKindFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletKind | EnumWalletKindFieldRefInput<$PrismaModel>
    in?: $Enums.WalletKind[] | ListEnumWalletKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.WalletKind[] | ListEnumWalletKindFieldRefInput<$PrismaModel>
    not?: NestedEnumWalletKindFilter<$PrismaModel> | $Enums.WalletKind
  }

  export type NestedEnumWalletStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletStatus | EnumWalletStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WalletStatus[] | ListEnumWalletStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WalletStatus[] | ListEnumWalletStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWalletStatusFilter<$PrismaModel> | $Enums.WalletStatus
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

  export type NestedEnumChainWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Chain | EnumChainFieldRefInput<$PrismaModel>
    in?: $Enums.Chain[] | ListEnumChainFieldRefInput<$PrismaModel>
    notIn?: $Enums.Chain[] | ListEnumChainFieldRefInput<$PrismaModel>
    not?: NestedEnumChainWithAggregatesFilter<$PrismaModel> | $Enums.Chain
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChainFilter<$PrismaModel>
    _max?: NestedEnumChainFilter<$PrismaModel>
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

  export type NestedEnumWalletKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletKind | EnumWalletKindFieldRefInput<$PrismaModel>
    in?: $Enums.WalletKind[] | ListEnumWalletKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.WalletKind[] | ListEnumWalletKindFieldRefInput<$PrismaModel>
    not?: NestedEnumWalletKindWithAggregatesFilter<$PrismaModel> | $Enums.WalletKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWalletKindFilter<$PrismaModel>
    _max?: NestedEnumWalletKindFilter<$PrismaModel>
  }

  export type NestedEnumWalletStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WalletStatus | EnumWalletStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WalletStatus[] | ListEnumWalletStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WalletStatus[] | ListEnumWalletStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWalletStatusWithAggregatesFilter<$PrismaModel> | $Enums.WalletStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWalletStatusFilter<$PrismaModel>
    _max?: NestedEnumWalletStatusFilter<$PrismaModel>
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

  export type NestedEnumBroadcastJobKindFilter<$PrismaModel = never> = {
    equals?: $Enums.BroadcastJobKind | EnumBroadcastJobKindFieldRefInput<$PrismaModel>
    in?: $Enums.BroadcastJobKind[] | ListEnumBroadcastJobKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.BroadcastJobKind[] | ListEnumBroadcastJobKindFieldRefInput<$PrismaModel>
    not?: NestedEnumBroadcastJobKindFilter<$PrismaModel> | $Enums.BroadcastJobKind
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

  export type NestedEnumBroadcastJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BroadcastJobStatus | EnumBroadcastJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BroadcastJobStatus[] | ListEnumBroadcastJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BroadcastJobStatus[] | ListEnumBroadcastJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBroadcastJobStatusFilter<$PrismaModel> | $Enums.BroadcastJobStatus
  }

  export type NestedEnumBroadcastJobKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BroadcastJobKind | EnumBroadcastJobKindFieldRefInput<$PrismaModel>
    in?: $Enums.BroadcastJobKind[] | ListEnumBroadcastJobKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.BroadcastJobKind[] | ListEnumBroadcastJobKindFieldRefInput<$PrismaModel>
    not?: NestedEnumBroadcastJobKindWithAggregatesFilter<$PrismaModel> | $Enums.BroadcastJobKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBroadcastJobKindFilter<$PrismaModel>
    _max?: NestedEnumBroadcastJobKindFilter<$PrismaModel>
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

  export type NestedEnumBroadcastJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BroadcastJobStatus | EnumBroadcastJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BroadcastJobStatus[] | ListEnumBroadcastJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BroadcastJobStatus[] | ListEnumBroadcastJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBroadcastJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.BroadcastJobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBroadcastJobStatusFilter<$PrismaModel>
    _max?: NestedEnumBroadcastJobStatusFilter<$PrismaModel>
  }

  export type WalletPolicyCreateWithoutWalletInput = {
    destinationAllowlist: JsonNullValueInput | InputJsonValue
    trustedIssuerAllowlist?: JsonNullValueInput | InputJsonValue
    perTxCapMinor: bigint | number
    dailyCapMinor: bigint | number
    approvalThresholdMinor: bigint | number
    requiredApprovers?: number
    updatedAt?: Date | string
  }

  export type WalletPolicyUncheckedCreateWithoutWalletInput = {
    destinationAllowlist: JsonNullValueInput | InputJsonValue
    trustedIssuerAllowlist?: JsonNullValueInput | InputJsonValue
    perTxCapMinor: bigint | number
    dailyCapMinor: bigint | number
    approvalThresholdMinor: bigint | number
    requiredApprovers?: number
    updatedAt?: Date | string
  }

  export type WalletPolicyCreateOrConnectWithoutWalletInput = {
    where: WalletPolicyWhereUniqueInput
    create: XOR<WalletPolicyCreateWithoutWalletInput, WalletPolicyUncheckedCreateWithoutWalletInput>
  }

  export type WalletPolicyUpsertWithoutWalletInput = {
    update: XOR<WalletPolicyUpdateWithoutWalletInput, WalletPolicyUncheckedUpdateWithoutWalletInput>
    create: XOR<WalletPolicyCreateWithoutWalletInput, WalletPolicyUncheckedCreateWithoutWalletInput>
    where?: WalletPolicyWhereInput
  }

  export type WalletPolicyUpdateToOneWithWhereWithoutWalletInput = {
    where?: WalletPolicyWhereInput
    data: XOR<WalletPolicyUpdateWithoutWalletInput, WalletPolicyUncheckedUpdateWithoutWalletInput>
  }

  export type WalletPolicyUpdateWithoutWalletInput = {
    destinationAllowlist?: JsonNullValueInput | InputJsonValue
    trustedIssuerAllowlist?: JsonNullValueInput | InputJsonValue
    perTxCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    dailyCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    approvalThresholdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletPolicyUncheckedUpdateWithoutWalletInput = {
    destinationAllowlist?: JsonNullValueInput | InputJsonValue
    trustedIssuerAllowlist?: JsonNullValueInput | InputJsonValue
    perTxCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    dailyCapMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    approvalThresholdMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    requiredApprovers?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletCreateWithoutPolicyInput = {
    id?: string
    chain: $Enums.Chain
    address: string
    kind: $Enums.WalletKind
    status?: $Enums.WalletStatus
    ownerId?: string | null
    ownerKind?: string | null
    label?: string | null
    signerKeyRef: string
    ledgerAccountId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletUncheckedCreateWithoutPolicyInput = {
    id?: string
    chain: $Enums.Chain
    address: string
    kind: $Enums.WalletKind
    status?: $Enums.WalletStatus
    ownerId?: string | null
    ownerKind?: string | null
    label?: string | null
    signerKeyRef: string
    ledgerAccountId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WalletCreateOrConnectWithoutPolicyInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutPolicyInput, WalletUncheckedCreateWithoutPolicyInput>
  }

  export type WalletUpsertWithoutPolicyInput = {
    update: XOR<WalletUpdateWithoutPolicyInput, WalletUncheckedUpdateWithoutPolicyInput>
    create: XOR<WalletCreateWithoutPolicyInput, WalletUncheckedCreateWithoutPolicyInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutPolicyInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutPolicyInput, WalletUncheckedUpdateWithoutPolicyInput>
  }

  export type WalletUpdateWithoutPolicyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: EnumChainFieldUpdateOperationsInput | $Enums.Chain
    address?: StringFieldUpdateOperationsInput | string
    kind?: EnumWalletKindFieldUpdateOperationsInput | $Enums.WalletKind
    status?: EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerKind?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    signerKeyRef?: StringFieldUpdateOperationsInput | string
    ledgerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletUncheckedUpdateWithoutPolicyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chain?: EnumChainFieldUpdateOperationsInput | $Enums.Chain
    address?: StringFieldUpdateOperationsInput | string
    kind?: EnumWalletKindFieldUpdateOperationsInput | $Enums.WalletKind
    status?: EnumWalletStatusFieldUpdateOperationsInput | $Enums.WalletStatus
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerKind?: NullableStringFieldUpdateOperationsInput | string | null
    label?: NullableStringFieldUpdateOperationsInput | string | null
    signerKeyRef?: StringFieldUpdateOperationsInput | string
    ledgerAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use WalletDefaultArgs instead
     */
    export type WalletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WalletDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WalletPolicyDefaultArgs instead
     */
    export type WalletPolicyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WalletPolicyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BroadcastJobDefaultArgs instead
     */
    export type BroadcastJobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BroadcastJobDefaultArgs<ExtArgs>

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