
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
 * Model DeployedContract
 * 
 */
export type DeployedContract = $Result.DefaultSelection<Prisma.$DeployedContractPayload>
/**
 * Model ContractUpgrade
 * 
 */
export type ContractUpgrade = $Result.DefaultSelection<Prisma.$ContractUpgradePayload>
/**
 * Model StatusProposal
 * 
 */
export type StatusProposal = $Result.DefaultSelection<Prisma.$StatusProposalPayload>
/**
 * Model GovernanceDeployment
 * 
 */
export type GovernanceDeployment = $Result.DefaultSelection<Prisma.$GovernanceDeploymentPayload>
/**
 * Model AttestationIssuer
 * 
 */
export type AttestationIssuer = $Result.DefaultSelection<Prisma.$AttestationIssuerPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ContractStatus: {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  DEPRECATED: 'DEPRECATED'
};

export type ContractStatus = (typeof ContractStatus)[keyof typeof ContractStatus]


export const ControlKind: {
  NONE: 'NONE',
  PAUSABLE: 'PAUSABLE'
};

export type ControlKind = (typeof ControlKind)[keyof typeof ControlKind]


export const ExecutionMode: {
  DB_ONLY: 'DB_ONLY',
  ON_CHAIN: 'ON_CHAIN'
};

export type ExecutionMode = (typeof ExecutionMode)[keyof typeof ExecutionMode]


export const ProposalStatus: {
  PENDING: 'PENDING',
  SUBMITTED: 'SUBMITTED',
  EXECUTED: 'EXECUTED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

export type ProposalStatus = (typeof ProposalStatus)[keyof typeof ProposalStatus]

}

export type ContractStatus = $Enums.ContractStatus

export const ContractStatus: typeof $Enums.ContractStatus

export type ControlKind = $Enums.ControlKind

export const ControlKind: typeof $Enums.ControlKind

export type ExecutionMode = $Enums.ExecutionMode

export const ExecutionMode: typeof $Enums.ExecutionMode

export type ProposalStatus = $Enums.ProposalStatus

export const ProposalStatus: typeof $Enums.ProposalStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more DeployedContracts
 * const deployedContracts = await prisma.deployedContract.findMany()
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
   * // Fetch zero or more DeployedContracts
   * const deployedContracts = await prisma.deployedContract.findMany()
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
   * `prisma.deployedContract`: Exposes CRUD operations for the **DeployedContract** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeployedContracts
    * const deployedContracts = await prisma.deployedContract.findMany()
    * ```
    */
  get deployedContract(): Prisma.DeployedContractDelegate<ExtArgs>;

  /**
   * `prisma.contractUpgrade`: Exposes CRUD operations for the **ContractUpgrade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContractUpgrades
    * const contractUpgrades = await prisma.contractUpgrade.findMany()
    * ```
    */
  get contractUpgrade(): Prisma.ContractUpgradeDelegate<ExtArgs>;

  /**
   * `prisma.statusProposal`: Exposes CRUD operations for the **StatusProposal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StatusProposals
    * const statusProposals = await prisma.statusProposal.findMany()
    * ```
    */
  get statusProposal(): Prisma.StatusProposalDelegate<ExtArgs>;

  /**
   * `prisma.governanceDeployment`: Exposes CRUD operations for the **GovernanceDeployment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GovernanceDeployments
    * const governanceDeployments = await prisma.governanceDeployment.findMany()
    * ```
    */
  get governanceDeployment(): Prisma.GovernanceDeploymentDelegate<ExtArgs>;

  /**
   * `prisma.attestationIssuer`: Exposes CRUD operations for the **AttestationIssuer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AttestationIssuers
    * const attestationIssuers = await prisma.attestationIssuer.findMany()
    * ```
    */
  get attestationIssuer(): Prisma.AttestationIssuerDelegate<ExtArgs>;
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
    DeployedContract: 'DeployedContract',
    ContractUpgrade: 'ContractUpgrade',
    StatusProposal: 'StatusProposal',
    GovernanceDeployment: 'GovernanceDeployment',
    AttestationIssuer: 'AttestationIssuer'
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
      modelProps: "deployedContract" | "contractUpgrade" | "statusProposal" | "governanceDeployment" | "attestationIssuer"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      DeployedContract: {
        payload: Prisma.$DeployedContractPayload<ExtArgs>
        fields: Prisma.DeployedContractFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeployedContractFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeployedContractPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeployedContractFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeployedContractPayload>
          }
          findFirst: {
            args: Prisma.DeployedContractFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeployedContractPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeployedContractFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeployedContractPayload>
          }
          findMany: {
            args: Prisma.DeployedContractFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeployedContractPayload>[]
          }
          create: {
            args: Prisma.DeployedContractCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeployedContractPayload>
          }
          createMany: {
            args: Prisma.DeployedContractCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeployedContractCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeployedContractPayload>[]
          }
          delete: {
            args: Prisma.DeployedContractDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeployedContractPayload>
          }
          update: {
            args: Prisma.DeployedContractUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeployedContractPayload>
          }
          deleteMany: {
            args: Prisma.DeployedContractDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeployedContractUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DeployedContractUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeployedContractPayload>
          }
          aggregate: {
            args: Prisma.DeployedContractAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeployedContract>
          }
          groupBy: {
            args: Prisma.DeployedContractGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeployedContractGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeployedContractCountArgs<ExtArgs>
            result: $Utils.Optional<DeployedContractCountAggregateOutputType> | number
          }
        }
      }
      ContractUpgrade: {
        payload: Prisma.$ContractUpgradePayload<ExtArgs>
        fields: Prisma.ContractUpgradeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContractUpgradeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractUpgradePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContractUpgradeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractUpgradePayload>
          }
          findFirst: {
            args: Prisma.ContractUpgradeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractUpgradePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContractUpgradeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractUpgradePayload>
          }
          findMany: {
            args: Prisma.ContractUpgradeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractUpgradePayload>[]
          }
          create: {
            args: Prisma.ContractUpgradeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractUpgradePayload>
          }
          createMany: {
            args: Prisma.ContractUpgradeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContractUpgradeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractUpgradePayload>[]
          }
          delete: {
            args: Prisma.ContractUpgradeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractUpgradePayload>
          }
          update: {
            args: Prisma.ContractUpgradeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractUpgradePayload>
          }
          deleteMany: {
            args: Prisma.ContractUpgradeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContractUpgradeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContractUpgradeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractUpgradePayload>
          }
          aggregate: {
            args: Prisma.ContractUpgradeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContractUpgrade>
          }
          groupBy: {
            args: Prisma.ContractUpgradeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContractUpgradeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContractUpgradeCountArgs<ExtArgs>
            result: $Utils.Optional<ContractUpgradeCountAggregateOutputType> | number
          }
        }
      }
      StatusProposal: {
        payload: Prisma.$StatusProposalPayload<ExtArgs>
        fields: Prisma.StatusProposalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StatusProposalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusProposalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StatusProposalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusProposalPayload>
          }
          findFirst: {
            args: Prisma.StatusProposalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusProposalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StatusProposalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusProposalPayload>
          }
          findMany: {
            args: Prisma.StatusProposalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusProposalPayload>[]
          }
          create: {
            args: Prisma.StatusProposalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusProposalPayload>
          }
          createMany: {
            args: Prisma.StatusProposalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StatusProposalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusProposalPayload>[]
          }
          delete: {
            args: Prisma.StatusProposalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusProposalPayload>
          }
          update: {
            args: Prisma.StatusProposalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusProposalPayload>
          }
          deleteMany: {
            args: Prisma.StatusProposalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StatusProposalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StatusProposalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatusProposalPayload>
          }
          aggregate: {
            args: Prisma.StatusProposalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStatusProposal>
          }
          groupBy: {
            args: Prisma.StatusProposalGroupByArgs<ExtArgs>
            result: $Utils.Optional<StatusProposalGroupByOutputType>[]
          }
          count: {
            args: Prisma.StatusProposalCountArgs<ExtArgs>
            result: $Utils.Optional<StatusProposalCountAggregateOutputType> | number
          }
        }
      }
      GovernanceDeployment: {
        payload: Prisma.$GovernanceDeploymentPayload<ExtArgs>
        fields: Prisma.GovernanceDeploymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GovernanceDeploymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernanceDeploymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GovernanceDeploymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernanceDeploymentPayload>
          }
          findFirst: {
            args: Prisma.GovernanceDeploymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernanceDeploymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GovernanceDeploymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernanceDeploymentPayload>
          }
          findMany: {
            args: Prisma.GovernanceDeploymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernanceDeploymentPayload>[]
          }
          create: {
            args: Prisma.GovernanceDeploymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernanceDeploymentPayload>
          }
          createMany: {
            args: Prisma.GovernanceDeploymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GovernanceDeploymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernanceDeploymentPayload>[]
          }
          delete: {
            args: Prisma.GovernanceDeploymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernanceDeploymentPayload>
          }
          update: {
            args: Prisma.GovernanceDeploymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernanceDeploymentPayload>
          }
          deleteMany: {
            args: Prisma.GovernanceDeploymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GovernanceDeploymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GovernanceDeploymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GovernanceDeploymentPayload>
          }
          aggregate: {
            args: Prisma.GovernanceDeploymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGovernanceDeployment>
          }
          groupBy: {
            args: Prisma.GovernanceDeploymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<GovernanceDeploymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.GovernanceDeploymentCountArgs<ExtArgs>
            result: $Utils.Optional<GovernanceDeploymentCountAggregateOutputType> | number
          }
        }
      }
      AttestationIssuer: {
        payload: Prisma.$AttestationIssuerPayload<ExtArgs>
        fields: Prisma.AttestationIssuerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttestationIssuerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttestationIssuerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttestationIssuerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttestationIssuerPayload>
          }
          findFirst: {
            args: Prisma.AttestationIssuerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttestationIssuerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttestationIssuerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttestationIssuerPayload>
          }
          findMany: {
            args: Prisma.AttestationIssuerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttestationIssuerPayload>[]
          }
          create: {
            args: Prisma.AttestationIssuerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttestationIssuerPayload>
          }
          createMany: {
            args: Prisma.AttestationIssuerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttestationIssuerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttestationIssuerPayload>[]
          }
          delete: {
            args: Prisma.AttestationIssuerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttestationIssuerPayload>
          }
          update: {
            args: Prisma.AttestationIssuerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttestationIssuerPayload>
          }
          deleteMany: {
            args: Prisma.AttestationIssuerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttestationIssuerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AttestationIssuerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttestationIssuerPayload>
          }
          aggregate: {
            args: Prisma.AttestationIssuerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttestationIssuer>
          }
          groupBy: {
            args: Prisma.AttestationIssuerGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttestationIssuerGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttestationIssuerCountArgs<ExtArgs>
            result: $Utils.Optional<AttestationIssuerCountAggregateOutputType> | number
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
   * Count Type DeployedContractCountOutputType
   */

  export type DeployedContractCountOutputType = {
    upgrades: number
    proposals: number
    attestationIssuers: number
  }

  export type DeployedContractCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    upgrades?: boolean | DeployedContractCountOutputTypeCountUpgradesArgs
    proposals?: boolean | DeployedContractCountOutputTypeCountProposalsArgs
    attestationIssuers?: boolean | DeployedContractCountOutputTypeCountAttestationIssuersArgs
  }

  // Custom InputTypes
  /**
   * DeployedContractCountOutputType without action
   */
  export type DeployedContractCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeployedContractCountOutputType
     */
    select?: DeployedContractCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DeployedContractCountOutputType without action
   */
  export type DeployedContractCountOutputTypeCountUpgradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractUpgradeWhereInput
  }

  /**
   * DeployedContractCountOutputType without action
   */
  export type DeployedContractCountOutputTypeCountProposalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatusProposalWhereInput
  }

  /**
   * DeployedContractCountOutputType without action
   */
  export type DeployedContractCountOutputTypeCountAttestationIssuersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttestationIssuerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model DeployedContract
   */

  export type AggregateDeployedContract = {
    _count: DeployedContractCountAggregateOutputType | null
    _avg: DeployedContractAvgAggregateOutputType | null
    _sum: DeployedContractSumAggregateOutputType | null
    _min: DeployedContractMinAggregateOutputType | null
    _max: DeployedContractMaxAggregateOutputType | null
  }

  export type DeployedContractAvgAggregateOutputType = {
    tvlUsd: number | null
    chainId: number | null
  }

  export type DeployedContractSumAggregateOutputType = {
    tvlUsd: number | null
    chainId: number | null
  }

  export type DeployedContractMinAggregateOutputType = {
    id: string | null
    name: string | null
    purpose: string | null
    network: string | null
    address: string | null
    version: string | null
    status: $Enums.ContractStatus | null
    tvlUsd: number | null
    audited: boolean | null
    deployedAt: Date | null
    chainId: number | null
    controlKind: $Enums.ControlKind | null
    executionMode: $Enums.ExecutionMode | null
    timelockAddress: string | null
    governorAddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeployedContractMaxAggregateOutputType = {
    id: string | null
    name: string | null
    purpose: string | null
    network: string | null
    address: string | null
    version: string | null
    status: $Enums.ContractStatus | null
    tvlUsd: number | null
    audited: boolean | null
    deployedAt: Date | null
    chainId: number | null
    controlKind: $Enums.ControlKind | null
    executionMode: $Enums.ExecutionMode | null
    timelockAddress: string | null
    governorAddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeployedContractCountAggregateOutputType = {
    id: number
    name: number
    purpose: number
    network: number
    address: number
    version: number
    status: number
    tvlUsd: number
    audited: number
    deployedAt: number
    chainId: number
    controlKind: number
    executionMode: number
    timelockAddress: number
    governorAddress: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DeployedContractAvgAggregateInputType = {
    tvlUsd?: true
    chainId?: true
  }

  export type DeployedContractSumAggregateInputType = {
    tvlUsd?: true
    chainId?: true
  }

  export type DeployedContractMinAggregateInputType = {
    id?: true
    name?: true
    purpose?: true
    network?: true
    address?: true
    version?: true
    status?: true
    tvlUsd?: true
    audited?: true
    deployedAt?: true
    chainId?: true
    controlKind?: true
    executionMode?: true
    timelockAddress?: true
    governorAddress?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeployedContractMaxAggregateInputType = {
    id?: true
    name?: true
    purpose?: true
    network?: true
    address?: true
    version?: true
    status?: true
    tvlUsd?: true
    audited?: true
    deployedAt?: true
    chainId?: true
    controlKind?: true
    executionMode?: true
    timelockAddress?: true
    governorAddress?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeployedContractCountAggregateInputType = {
    id?: true
    name?: true
    purpose?: true
    network?: true
    address?: true
    version?: true
    status?: true
    tvlUsd?: true
    audited?: true
    deployedAt?: true
    chainId?: true
    controlKind?: true
    executionMode?: true
    timelockAddress?: true
    governorAddress?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DeployedContractAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeployedContract to aggregate.
     */
    where?: DeployedContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeployedContracts to fetch.
     */
    orderBy?: DeployedContractOrderByWithRelationInput | DeployedContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeployedContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeployedContracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeployedContracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeployedContracts
    **/
    _count?: true | DeployedContractCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeployedContractAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeployedContractSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeployedContractMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeployedContractMaxAggregateInputType
  }

  export type GetDeployedContractAggregateType<T extends DeployedContractAggregateArgs> = {
        [P in keyof T & keyof AggregateDeployedContract]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeployedContract[P]>
      : GetScalarType<T[P], AggregateDeployedContract[P]>
  }




  export type DeployedContractGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeployedContractWhereInput
    orderBy?: DeployedContractOrderByWithAggregationInput | DeployedContractOrderByWithAggregationInput[]
    by: DeployedContractScalarFieldEnum[] | DeployedContractScalarFieldEnum
    having?: DeployedContractScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeployedContractCountAggregateInputType | true
    _avg?: DeployedContractAvgAggregateInputType
    _sum?: DeployedContractSumAggregateInputType
    _min?: DeployedContractMinAggregateInputType
    _max?: DeployedContractMaxAggregateInputType
  }

  export type DeployedContractGroupByOutputType = {
    id: string
    name: string
    purpose: string
    network: string
    address: string
    version: string
    status: $Enums.ContractStatus
    tvlUsd: number
    audited: boolean
    deployedAt: Date
    chainId: number | null
    controlKind: $Enums.ControlKind
    executionMode: $Enums.ExecutionMode
    timelockAddress: string | null
    governorAddress: string | null
    createdAt: Date
    updatedAt: Date
    _count: DeployedContractCountAggregateOutputType | null
    _avg: DeployedContractAvgAggregateOutputType | null
    _sum: DeployedContractSumAggregateOutputType | null
    _min: DeployedContractMinAggregateOutputType | null
    _max: DeployedContractMaxAggregateOutputType | null
  }

  type GetDeployedContractGroupByPayload<T extends DeployedContractGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeployedContractGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeployedContractGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeployedContractGroupByOutputType[P]>
            : GetScalarType<T[P], DeployedContractGroupByOutputType[P]>
        }
      >
    >


  export type DeployedContractSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    purpose?: boolean
    network?: boolean
    address?: boolean
    version?: boolean
    status?: boolean
    tvlUsd?: boolean
    audited?: boolean
    deployedAt?: boolean
    chainId?: boolean
    controlKind?: boolean
    executionMode?: boolean
    timelockAddress?: boolean
    governorAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    upgrades?: boolean | DeployedContract$upgradesArgs<ExtArgs>
    proposals?: boolean | DeployedContract$proposalsArgs<ExtArgs>
    attestationIssuers?: boolean | DeployedContract$attestationIssuersArgs<ExtArgs>
    _count?: boolean | DeployedContractCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deployedContract"]>

  export type DeployedContractSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    purpose?: boolean
    network?: boolean
    address?: boolean
    version?: boolean
    status?: boolean
    tvlUsd?: boolean
    audited?: boolean
    deployedAt?: boolean
    chainId?: boolean
    controlKind?: boolean
    executionMode?: boolean
    timelockAddress?: boolean
    governorAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["deployedContract"]>

  export type DeployedContractSelectScalar = {
    id?: boolean
    name?: boolean
    purpose?: boolean
    network?: boolean
    address?: boolean
    version?: boolean
    status?: boolean
    tvlUsd?: boolean
    audited?: boolean
    deployedAt?: boolean
    chainId?: boolean
    controlKind?: boolean
    executionMode?: boolean
    timelockAddress?: boolean
    governorAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DeployedContractInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    upgrades?: boolean | DeployedContract$upgradesArgs<ExtArgs>
    proposals?: boolean | DeployedContract$proposalsArgs<ExtArgs>
    attestationIssuers?: boolean | DeployedContract$attestationIssuersArgs<ExtArgs>
    _count?: boolean | DeployedContractCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DeployedContractIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DeployedContractPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeployedContract"
    objects: {
      upgrades: Prisma.$ContractUpgradePayload<ExtArgs>[]
      proposals: Prisma.$StatusProposalPayload<ExtArgs>[]
      attestationIssuers: Prisma.$AttestationIssuerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      purpose: string
      network: string
      address: string
      version: string
      status: $Enums.ContractStatus
      tvlUsd: number
      audited: boolean
      deployedAt: Date
      chainId: number | null
      controlKind: $Enums.ControlKind
      executionMode: $Enums.ExecutionMode
      timelockAddress: string | null
      governorAddress: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["deployedContract"]>
    composites: {}
  }

  type DeployedContractGetPayload<S extends boolean | null | undefined | DeployedContractDefaultArgs> = $Result.GetResult<Prisma.$DeployedContractPayload, S>

  type DeployedContractCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DeployedContractFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DeployedContractCountAggregateInputType | true
    }

  export interface DeployedContractDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeployedContract'], meta: { name: 'DeployedContract' } }
    /**
     * Find zero or one DeployedContract that matches the filter.
     * @param {DeployedContractFindUniqueArgs} args - Arguments to find a DeployedContract
     * @example
     * // Get one DeployedContract
     * const deployedContract = await prisma.deployedContract.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeployedContractFindUniqueArgs>(args: SelectSubset<T, DeployedContractFindUniqueArgs<ExtArgs>>): Prisma__DeployedContractClient<$Result.GetResult<Prisma.$DeployedContractPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DeployedContract that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DeployedContractFindUniqueOrThrowArgs} args - Arguments to find a DeployedContract
     * @example
     * // Get one DeployedContract
     * const deployedContract = await prisma.deployedContract.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeployedContractFindUniqueOrThrowArgs>(args: SelectSubset<T, DeployedContractFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeployedContractClient<$Result.GetResult<Prisma.$DeployedContractPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DeployedContract that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeployedContractFindFirstArgs} args - Arguments to find a DeployedContract
     * @example
     * // Get one DeployedContract
     * const deployedContract = await prisma.deployedContract.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeployedContractFindFirstArgs>(args?: SelectSubset<T, DeployedContractFindFirstArgs<ExtArgs>>): Prisma__DeployedContractClient<$Result.GetResult<Prisma.$DeployedContractPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DeployedContract that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeployedContractFindFirstOrThrowArgs} args - Arguments to find a DeployedContract
     * @example
     * // Get one DeployedContract
     * const deployedContract = await prisma.deployedContract.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeployedContractFindFirstOrThrowArgs>(args?: SelectSubset<T, DeployedContractFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeployedContractClient<$Result.GetResult<Prisma.$DeployedContractPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DeployedContracts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeployedContractFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeployedContracts
     * const deployedContracts = await prisma.deployedContract.findMany()
     * 
     * // Get first 10 DeployedContracts
     * const deployedContracts = await prisma.deployedContract.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deployedContractWithIdOnly = await prisma.deployedContract.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeployedContractFindManyArgs>(args?: SelectSubset<T, DeployedContractFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeployedContractPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DeployedContract.
     * @param {DeployedContractCreateArgs} args - Arguments to create a DeployedContract.
     * @example
     * // Create one DeployedContract
     * const DeployedContract = await prisma.deployedContract.create({
     *   data: {
     *     // ... data to create a DeployedContract
     *   }
     * })
     * 
     */
    create<T extends DeployedContractCreateArgs>(args: SelectSubset<T, DeployedContractCreateArgs<ExtArgs>>): Prisma__DeployedContractClient<$Result.GetResult<Prisma.$DeployedContractPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DeployedContracts.
     * @param {DeployedContractCreateManyArgs} args - Arguments to create many DeployedContracts.
     * @example
     * // Create many DeployedContracts
     * const deployedContract = await prisma.deployedContract.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeployedContractCreateManyArgs>(args?: SelectSubset<T, DeployedContractCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DeployedContracts and returns the data saved in the database.
     * @param {DeployedContractCreateManyAndReturnArgs} args - Arguments to create many DeployedContracts.
     * @example
     * // Create many DeployedContracts
     * const deployedContract = await prisma.deployedContract.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DeployedContracts and only return the `id`
     * const deployedContractWithIdOnly = await prisma.deployedContract.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeployedContractCreateManyAndReturnArgs>(args?: SelectSubset<T, DeployedContractCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeployedContractPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DeployedContract.
     * @param {DeployedContractDeleteArgs} args - Arguments to delete one DeployedContract.
     * @example
     * // Delete one DeployedContract
     * const DeployedContract = await prisma.deployedContract.delete({
     *   where: {
     *     // ... filter to delete one DeployedContract
     *   }
     * })
     * 
     */
    delete<T extends DeployedContractDeleteArgs>(args: SelectSubset<T, DeployedContractDeleteArgs<ExtArgs>>): Prisma__DeployedContractClient<$Result.GetResult<Prisma.$DeployedContractPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DeployedContract.
     * @param {DeployedContractUpdateArgs} args - Arguments to update one DeployedContract.
     * @example
     * // Update one DeployedContract
     * const deployedContract = await prisma.deployedContract.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeployedContractUpdateArgs>(args: SelectSubset<T, DeployedContractUpdateArgs<ExtArgs>>): Prisma__DeployedContractClient<$Result.GetResult<Prisma.$DeployedContractPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DeployedContracts.
     * @param {DeployedContractDeleteManyArgs} args - Arguments to filter DeployedContracts to delete.
     * @example
     * // Delete a few DeployedContracts
     * const { count } = await prisma.deployedContract.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeployedContractDeleteManyArgs>(args?: SelectSubset<T, DeployedContractDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeployedContracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeployedContractUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeployedContracts
     * const deployedContract = await prisma.deployedContract.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeployedContractUpdateManyArgs>(args: SelectSubset<T, DeployedContractUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DeployedContract.
     * @param {DeployedContractUpsertArgs} args - Arguments to update or create a DeployedContract.
     * @example
     * // Update or create a DeployedContract
     * const deployedContract = await prisma.deployedContract.upsert({
     *   create: {
     *     // ... data to create a DeployedContract
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeployedContract we want to update
     *   }
     * })
     */
    upsert<T extends DeployedContractUpsertArgs>(args: SelectSubset<T, DeployedContractUpsertArgs<ExtArgs>>): Prisma__DeployedContractClient<$Result.GetResult<Prisma.$DeployedContractPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DeployedContracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeployedContractCountArgs} args - Arguments to filter DeployedContracts to count.
     * @example
     * // Count the number of DeployedContracts
     * const count = await prisma.deployedContract.count({
     *   where: {
     *     // ... the filter for the DeployedContracts we want to count
     *   }
     * })
    **/
    count<T extends DeployedContractCountArgs>(
      args?: Subset<T, DeployedContractCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeployedContractCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeployedContract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeployedContractAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DeployedContractAggregateArgs>(args: Subset<T, DeployedContractAggregateArgs>): Prisma.PrismaPromise<GetDeployedContractAggregateType<T>>

    /**
     * Group by DeployedContract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeployedContractGroupByArgs} args - Group by arguments.
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
      T extends DeployedContractGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeployedContractGroupByArgs['orderBy'] }
        : { orderBy?: DeployedContractGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DeployedContractGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeployedContractGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeployedContract model
   */
  readonly fields: DeployedContractFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeployedContract.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeployedContractClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    upgrades<T extends DeployedContract$upgradesArgs<ExtArgs> = {}>(args?: Subset<T, DeployedContract$upgradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractUpgradePayload<ExtArgs>, T, "findMany"> | Null>
    proposals<T extends DeployedContract$proposalsArgs<ExtArgs> = {}>(args?: Subset<T, DeployedContract$proposalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusProposalPayload<ExtArgs>, T, "findMany"> | Null>
    attestationIssuers<T extends DeployedContract$attestationIssuersArgs<ExtArgs> = {}>(args?: Subset<T, DeployedContract$attestationIssuersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttestationIssuerPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the DeployedContract model
   */ 
  interface DeployedContractFieldRefs {
    readonly id: FieldRef<"DeployedContract", 'String'>
    readonly name: FieldRef<"DeployedContract", 'String'>
    readonly purpose: FieldRef<"DeployedContract", 'String'>
    readonly network: FieldRef<"DeployedContract", 'String'>
    readonly address: FieldRef<"DeployedContract", 'String'>
    readonly version: FieldRef<"DeployedContract", 'String'>
    readonly status: FieldRef<"DeployedContract", 'ContractStatus'>
    readonly tvlUsd: FieldRef<"DeployedContract", 'Int'>
    readonly audited: FieldRef<"DeployedContract", 'Boolean'>
    readonly deployedAt: FieldRef<"DeployedContract", 'DateTime'>
    readonly chainId: FieldRef<"DeployedContract", 'Int'>
    readonly controlKind: FieldRef<"DeployedContract", 'ControlKind'>
    readonly executionMode: FieldRef<"DeployedContract", 'ExecutionMode'>
    readonly timelockAddress: FieldRef<"DeployedContract", 'String'>
    readonly governorAddress: FieldRef<"DeployedContract", 'String'>
    readonly createdAt: FieldRef<"DeployedContract", 'DateTime'>
    readonly updatedAt: FieldRef<"DeployedContract", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DeployedContract findUnique
   */
  export type DeployedContractFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeployedContract
     */
    select?: DeployedContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeployedContractInclude<ExtArgs> | null
    /**
     * Filter, which DeployedContract to fetch.
     */
    where: DeployedContractWhereUniqueInput
  }

  /**
   * DeployedContract findUniqueOrThrow
   */
  export type DeployedContractFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeployedContract
     */
    select?: DeployedContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeployedContractInclude<ExtArgs> | null
    /**
     * Filter, which DeployedContract to fetch.
     */
    where: DeployedContractWhereUniqueInput
  }

  /**
   * DeployedContract findFirst
   */
  export type DeployedContractFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeployedContract
     */
    select?: DeployedContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeployedContractInclude<ExtArgs> | null
    /**
     * Filter, which DeployedContract to fetch.
     */
    where?: DeployedContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeployedContracts to fetch.
     */
    orderBy?: DeployedContractOrderByWithRelationInput | DeployedContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeployedContracts.
     */
    cursor?: DeployedContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeployedContracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeployedContracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeployedContracts.
     */
    distinct?: DeployedContractScalarFieldEnum | DeployedContractScalarFieldEnum[]
  }

  /**
   * DeployedContract findFirstOrThrow
   */
  export type DeployedContractFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeployedContract
     */
    select?: DeployedContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeployedContractInclude<ExtArgs> | null
    /**
     * Filter, which DeployedContract to fetch.
     */
    where?: DeployedContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeployedContracts to fetch.
     */
    orderBy?: DeployedContractOrderByWithRelationInput | DeployedContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeployedContracts.
     */
    cursor?: DeployedContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeployedContracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeployedContracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeployedContracts.
     */
    distinct?: DeployedContractScalarFieldEnum | DeployedContractScalarFieldEnum[]
  }

  /**
   * DeployedContract findMany
   */
  export type DeployedContractFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeployedContract
     */
    select?: DeployedContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeployedContractInclude<ExtArgs> | null
    /**
     * Filter, which DeployedContracts to fetch.
     */
    where?: DeployedContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeployedContracts to fetch.
     */
    orderBy?: DeployedContractOrderByWithRelationInput | DeployedContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeployedContracts.
     */
    cursor?: DeployedContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeployedContracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeployedContracts.
     */
    skip?: number
    distinct?: DeployedContractScalarFieldEnum | DeployedContractScalarFieldEnum[]
  }

  /**
   * DeployedContract create
   */
  export type DeployedContractCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeployedContract
     */
    select?: DeployedContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeployedContractInclude<ExtArgs> | null
    /**
     * The data needed to create a DeployedContract.
     */
    data: XOR<DeployedContractCreateInput, DeployedContractUncheckedCreateInput>
  }

  /**
   * DeployedContract createMany
   */
  export type DeployedContractCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeployedContracts.
     */
    data: DeployedContractCreateManyInput | DeployedContractCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeployedContract createManyAndReturn
   */
  export type DeployedContractCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeployedContract
     */
    select?: DeployedContractSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DeployedContracts.
     */
    data: DeployedContractCreateManyInput | DeployedContractCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeployedContract update
   */
  export type DeployedContractUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeployedContract
     */
    select?: DeployedContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeployedContractInclude<ExtArgs> | null
    /**
     * The data needed to update a DeployedContract.
     */
    data: XOR<DeployedContractUpdateInput, DeployedContractUncheckedUpdateInput>
    /**
     * Choose, which DeployedContract to update.
     */
    where: DeployedContractWhereUniqueInput
  }

  /**
   * DeployedContract updateMany
   */
  export type DeployedContractUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeployedContracts.
     */
    data: XOR<DeployedContractUpdateManyMutationInput, DeployedContractUncheckedUpdateManyInput>
    /**
     * Filter which DeployedContracts to update
     */
    where?: DeployedContractWhereInput
  }

  /**
   * DeployedContract upsert
   */
  export type DeployedContractUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeployedContract
     */
    select?: DeployedContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeployedContractInclude<ExtArgs> | null
    /**
     * The filter to search for the DeployedContract to update in case it exists.
     */
    where: DeployedContractWhereUniqueInput
    /**
     * In case the DeployedContract found by the `where` argument doesn't exist, create a new DeployedContract with this data.
     */
    create: XOR<DeployedContractCreateInput, DeployedContractUncheckedCreateInput>
    /**
     * In case the DeployedContract was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeployedContractUpdateInput, DeployedContractUncheckedUpdateInput>
  }

  /**
   * DeployedContract delete
   */
  export type DeployedContractDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeployedContract
     */
    select?: DeployedContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeployedContractInclude<ExtArgs> | null
    /**
     * Filter which DeployedContract to delete.
     */
    where: DeployedContractWhereUniqueInput
  }

  /**
   * DeployedContract deleteMany
   */
  export type DeployedContractDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeployedContracts to delete
     */
    where?: DeployedContractWhereInput
  }

  /**
   * DeployedContract.upgrades
   */
  export type DeployedContract$upgradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractUpgrade
     */
    select?: ContractUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractUpgradeInclude<ExtArgs> | null
    where?: ContractUpgradeWhereInput
    orderBy?: ContractUpgradeOrderByWithRelationInput | ContractUpgradeOrderByWithRelationInput[]
    cursor?: ContractUpgradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContractUpgradeScalarFieldEnum | ContractUpgradeScalarFieldEnum[]
  }

  /**
   * DeployedContract.proposals
   */
  export type DeployedContract$proposalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusProposal
     */
    select?: StatusProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusProposalInclude<ExtArgs> | null
    where?: StatusProposalWhereInput
    orderBy?: StatusProposalOrderByWithRelationInput | StatusProposalOrderByWithRelationInput[]
    cursor?: StatusProposalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StatusProposalScalarFieldEnum | StatusProposalScalarFieldEnum[]
  }

  /**
   * DeployedContract.attestationIssuers
   */
  export type DeployedContract$attestationIssuersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttestationIssuer
     */
    select?: AttestationIssuerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttestationIssuerInclude<ExtArgs> | null
    where?: AttestationIssuerWhereInput
    orderBy?: AttestationIssuerOrderByWithRelationInput | AttestationIssuerOrderByWithRelationInput[]
    cursor?: AttestationIssuerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttestationIssuerScalarFieldEnum | AttestationIssuerScalarFieldEnum[]
  }

  /**
   * DeployedContract without action
   */
  export type DeployedContractDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeployedContract
     */
    select?: DeployedContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeployedContractInclude<ExtArgs> | null
  }


  /**
   * Model ContractUpgrade
   */

  export type AggregateContractUpgrade = {
    _count: ContractUpgradeCountAggregateOutputType | null
    _min: ContractUpgradeMinAggregateOutputType | null
    _max: ContractUpgradeMaxAggregateOutputType | null
  }

  export type ContractUpgradeMinAggregateOutputType = {
    id: string | null
    contractId: string | null
    contractName: string | null
    fromVersion: string | null
    toVersion: string | null
    upgradedAt: Date | null
    approvedBy: string | null
    createdAt: Date | null
  }

  export type ContractUpgradeMaxAggregateOutputType = {
    id: string | null
    contractId: string | null
    contractName: string | null
    fromVersion: string | null
    toVersion: string | null
    upgradedAt: Date | null
    approvedBy: string | null
    createdAt: Date | null
  }

  export type ContractUpgradeCountAggregateOutputType = {
    id: number
    contractId: number
    contractName: number
    fromVersion: number
    toVersion: number
    upgradedAt: number
    approvedBy: number
    createdAt: number
    _all: number
  }


  export type ContractUpgradeMinAggregateInputType = {
    id?: true
    contractId?: true
    contractName?: true
    fromVersion?: true
    toVersion?: true
    upgradedAt?: true
    approvedBy?: true
    createdAt?: true
  }

  export type ContractUpgradeMaxAggregateInputType = {
    id?: true
    contractId?: true
    contractName?: true
    fromVersion?: true
    toVersion?: true
    upgradedAt?: true
    approvedBy?: true
    createdAt?: true
  }

  export type ContractUpgradeCountAggregateInputType = {
    id?: true
    contractId?: true
    contractName?: true
    fromVersion?: true
    toVersion?: true
    upgradedAt?: true
    approvedBy?: true
    createdAt?: true
    _all?: true
  }

  export type ContractUpgradeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContractUpgrade to aggregate.
     */
    where?: ContractUpgradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractUpgrades to fetch.
     */
    orderBy?: ContractUpgradeOrderByWithRelationInput | ContractUpgradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContractUpgradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractUpgrades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractUpgrades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContractUpgrades
    **/
    _count?: true | ContractUpgradeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContractUpgradeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContractUpgradeMaxAggregateInputType
  }

  export type GetContractUpgradeAggregateType<T extends ContractUpgradeAggregateArgs> = {
        [P in keyof T & keyof AggregateContractUpgrade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContractUpgrade[P]>
      : GetScalarType<T[P], AggregateContractUpgrade[P]>
  }




  export type ContractUpgradeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractUpgradeWhereInput
    orderBy?: ContractUpgradeOrderByWithAggregationInput | ContractUpgradeOrderByWithAggregationInput[]
    by: ContractUpgradeScalarFieldEnum[] | ContractUpgradeScalarFieldEnum
    having?: ContractUpgradeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContractUpgradeCountAggregateInputType | true
    _min?: ContractUpgradeMinAggregateInputType
    _max?: ContractUpgradeMaxAggregateInputType
  }

  export type ContractUpgradeGroupByOutputType = {
    id: string
    contractId: string | null
    contractName: string
    fromVersion: string
    toVersion: string
    upgradedAt: Date
    approvedBy: string
    createdAt: Date
    _count: ContractUpgradeCountAggregateOutputType | null
    _min: ContractUpgradeMinAggregateOutputType | null
    _max: ContractUpgradeMaxAggregateOutputType | null
  }

  type GetContractUpgradeGroupByPayload<T extends ContractUpgradeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContractUpgradeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContractUpgradeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContractUpgradeGroupByOutputType[P]>
            : GetScalarType<T[P], ContractUpgradeGroupByOutputType[P]>
        }
      >
    >


  export type ContractUpgradeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractId?: boolean
    contractName?: boolean
    fromVersion?: boolean
    toVersion?: boolean
    upgradedAt?: boolean
    approvedBy?: boolean
    createdAt?: boolean
    contract?: boolean | ContractUpgrade$contractArgs<ExtArgs>
  }, ExtArgs["result"]["contractUpgrade"]>

  export type ContractUpgradeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractId?: boolean
    contractName?: boolean
    fromVersion?: boolean
    toVersion?: boolean
    upgradedAt?: boolean
    approvedBy?: boolean
    createdAt?: boolean
    contract?: boolean | ContractUpgrade$contractArgs<ExtArgs>
  }, ExtArgs["result"]["contractUpgrade"]>

  export type ContractUpgradeSelectScalar = {
    id?: boolean
    contractId?: boolean
    contractName?: boolean
    fromVersion?: boolean
    toVersion?: boolean
    upgradedAt?: boolean
    approvedBy?: boolean
    createdAt?: boolean
  }

  export type ContractUpgradeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractUpgrade$contractArgs<ExtArgs>
  }
  export type ContractUpgradeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | ContractUpgrade$contractArgs<ExtArgs>
  }

  export type $ContractUpgradePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContractUpgrade"
    objects: {
      contract: Prisma.$DeployedContractPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      contractId: string | null
      contractName: string
      fromVersion: string
      toVersion: string
      upgradedAt: Date
      approvedBy: string
      createdAt: Date
    }, ExtArgs["result"]["contractUpgrade"]>
    composites: {}
  }

  type ContractUpgradeGetPayload<S extends boolean | null | undefined | ContractUpgradeDefaultArgs> = $Result.GetResult<Prisma.$ContractUpgradePayload, S>

  type ContractUpgradeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ContractUpgradeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ContractUpgradeCountAggregateInputType | true
    }

  export interface ContractUpgradeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContractUpgrade'], meta: { name: 'ContractUpgrade' } }
    /**
     * Find zero or one ContractUpgrade that matches the filter.
     * @param {ContractUpgradeFindUniqueArgs} args - Arguments to find a ContractUpgrade
     * @example
     * // Get one ContractUpgrade
     * const contractUpgrade = await prisma.contractUpgrade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContractUpgradeFindUniqueArgs>(args: SelectSubset<T, ContractUpgradeFindUniqueArgs<ExtArgs>>): Prisma__ContractUpgradeClient<$Result.GetResult<Prisma.$ContractUpgradePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ContractUpgrade that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ContractUpgradeFindUniqueOrThrowArgs} args - Arguments to find a ContractUpgrade
     * @example
     * // Get one ContractUpgrade
     * const contractUpgrade = await prisma.contractUpgrade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContractUpgradeFindUniqueOrThrowArgs>(args: SelectSubset<T, ContractUpgradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContractUpgradeClient<$Result.GetResult<Prisma.$ContractUpgradePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ContractUpgrade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractUpgradeFindFirstArgs} args - Arguments to find a ContractUpgrade
     * @example
     * // Get one ContractUpgrade
     * const contractUpgrade = await prisma.contractUpgrade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContractUpgradeFindFirstArgs>(args?: SelectSubset<T, ContractUpgradeFindFirstArgs<ExtArgs>>): Prisma__ContractUpgradeClient<$Result.GetResult<Prisma.$ContractUpgradePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ContractUpgrade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractUpgradeFindFirstOrThrowArgs} args - Arguments to find a ContractUpgrade
     * @example
     * // Get one ContractUpgrade
     * const contractUpgrade = await prisma.contractUpgrade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContractUpgradeFindFirstOrThrowArgs>(args?: SelectSubset<T, ContractUpgradeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContractUpgradeClient<$Result.GetResult<Prisma.$ContractUpgradePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ContractUpgrades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractUpgradeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContractUpgrades
     * const contractUpgrades = await prisma.contractUpgrade.findMany()
     * 
     * // Get first 10 ContractUpgrades
     * const contractUpgrades = await prisma.contractUpgrade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contractUpgradeWithIdOnly = await prisma.contractUpgrade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContractUpgradeFindManyArgs>(args?: SelectSubset<T, ContractUpgradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractUpgradePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ContractUpgrade.
     * @param {ContractUpgradeCreateArgs} args - Arguments to create a ContractUpgrade.
     * @example
     * // Create one ContractUpgrade
     * const ContractUpgrade = await prisma.contractUpgrade.create({
     *   data: {
     *     // ... data to create a ContractUpgrade
     *   }
     * })
     * 
     */
    create<T extends ContractUpgradeCreateArgs>(args: SelectSubset<T, ContractUpgradeCreateArgs<ExtArgs>>): Prisma__ContractUpgradeClient<$Result.GetResult<Prisma.$ContractUpgradePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ContractUpgrades.
     * @param {ContractUpgradeCreateManyArgs} args - Arguments to create many ContractUpgrades.
     * @example
     * // Create many ContractUpgrades
     * const contractUpgrade = await prisma.contractUpgrade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContractUpgradeCreateManyArgs>(args?: SelectSubset<T, ContractUpgradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContractUpgrades and returns the data saved in the database.
     * @param {ContractUpgradeCreateManyAndReturnArgs} args - Arguments to create many ContractUpgrades.
     * @example
     * // Create many ContractUpgrades
     * const contractUpgrade = await prisma.contractUpgrade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContractUpgrades and only return the `id`
     * const contractUpgradeWithIdOnly = await prisma.contractUpgrade.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContractUpgradeCreateManyAndReturnArgs>(args?: SelectSubset<T, ContractUpgradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractUpgradePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ContractUpgrade.
     * @param {ContractUpgradeDeleteArgs} args - Arguments to delete one ContractUpgrade.
     * @example
     * // Delete one ContractUpgrade
     * const ContractUpgrade = await prisma.contractUpgrade.delete({
     *   where: {
     *     // ... filter to delete one ContractUpgrade
     *   }
     * })
     * 
     */
    delete<T extends ContractUpgradeDeleteArgs>(args: SelectSubset<T, ContractUpgradeDeleteArgs<ExtArgs>>): Prisma__ContractUpgradeClient<$Result.GetResult<Prisma.$ContractUpgradePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ContractUpgrade.
     * @param {ContractUpgradeUpdateArgs} args - Arguments to update one ContractUpgrade.
     * @example
     * // Update one ContractUpgrade
     * const contractUpgrade = await prisma.contractUpgrade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContractUpgradeUpdateArgs>(args: SelectSubset<T, ContractUpgradeUpdateArgs<ExtArgs>>): Prisma__ContractUpgradeClient<$Result.GetResult<Prisma.$ContractUpgradePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ContractUpgrades.
     * @param {ContractUpgradeDeleteManyArgs} args - Arguments to filter ContractUpgrades to delete.
     * @example
     * // Delete a few ContractUpgrades
     * const { count } = await prisma.contractUpgrade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContractUpgradeDeleteManyArgs>(args?: SelectSubset<T, ContractUpgradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContractUpgrades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractUpgradeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContractUpgrades
     * const contractUpgrade = await prisma.contractUpgrade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContractUpgradeUpdateManyArgs>(args: SelectSubset<T, ContractUpgradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ContractUpgrade.
     * @param {ContractUpgradeUpsertArgs} args - Arguments to update or create a ContractUpgrade.
     * @example
     * // Update or create a ContractUpgrade
     * const contractUpgrade = await prisma.contractUpgrade.upsert({
     *   create: {
     *     // ... data to create a ContractUpgrade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContractUpgrade we want to update
     *   }
     * })
     */
    upsert<T extends ContractUpgradeUpsertArgs>(args: SelectSubset<T, ContractUpgradeUpsertArgs<ExtArgs>>): Prisma__ContractUpgradeClient<$Result.GetResult<Prisma.$ContractUpgradePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ContractUpgrades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractUpgradeCountArgs} args - Arguments to filter ContractUpgrades to count.
     * @example
     * // Count the number of ContractUpgrades
     * const count = await prisma.contractUpgrade.count({
     *   where: {
     *     // ... the filter for the ContractUpgrades we want to count
     *   }
     * })
    **/
    count<T extends ContractUpgradeCountArgs>(
      args?: Subset<T, ContractUpgradeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContractUpgradeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContractUpgrade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractUpgradeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContractUpgradeAggregateArgs>(args: Subset<T, ContractUpgradeAggregateArgs>): Prisma.PrismaPromise<GetContractUpgradeAggregateType<T>>

    /**
     * Group by ContractUpgrade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractUpgradeGroupByArgs} args - Group by arguments.
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
      T extends ContractUpgradeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContractUpgradeGroupByArgs['orderBy'] }
        : { orderBy?: ContractUpgradeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContractUpgradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContractUpgradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContractUpgrade model
   */
  readonly fields: ContractUpgradeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContractUpgrade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContractUpgradeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contract<T extends ContractUpgrade$contractArgs<ExtArgs> = {}>(args?: Subset<T, ContractUpgrade$contractArgs<ExtArgs>>): Prisma__DeployedContractClient<$Result.GetResult<Prisma.$DeployedContractPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the ContractUpgrade model
   */ 
  interface ContractUpgradeFieldRefs {
    readonly id: FieldRef<"ContractUpgrade", 'String'>
    readonly contractId: FieldRef<"ContractUpgrade", 'String'>
    readonly contractName: FieldRef<"ContractUpgrade", 'String'>
    readonly fromVersion: FieldRef<"ContractUpgrade", 'String'>
    readonly toVersion: FieldRef<"ContractUpgrade", 'String'>
    readonly upgradedAt: FieldRef<"ContractUpgrade", 'DateTime'>
    readonly approvedBy: FieldRef<"ContractUpgrade", 'String'>
    readonly createdAt: FieldRef<"ContractUpgrade", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContractUpgrade findUnique
   */
  export type ContractUpgradeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractUpgrade
     */
    select?: ContractUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractUpgradeInclude<ExtArgs> | null
    /**
     * Filter, which ContractUpgrade to fetch.
     */
    where: ContractUpgradeWhereUniqueInput
  }

  /**
   * ContractUpgrade findUniqueOrThrow
   */
  export type ContractUpgradeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractUpgrade
     */
    select?: ContractUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractUpgradeInclude<ExtArgs> | null
    /**
     * Filter, which ContractUpgrade to fetch.
     */
    where: ContractUpgradeWhereUniqueInput
  }

  /**
   * ContractUpgrade findFirst
   */
  export type ContractUpgradeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractUpgrade
     */
    select?: ContractUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractUpgradeInclude<ExtArgs> | null
    /**
     * Filter, which ContractUpgrade to fetch.
     */
    where?: ContractUpgradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractUpgrades to fetch.
     */
    orderBy?: ContractUpgradeOrderByWithRelationInput | ContractUpgradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContractUpgrades.
     */
    cursor?: ContractUpgradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractUpgrades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractUpgrades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractUpgrades.
     */
    distinct?: ContractUpgradeScalarFieldEnum | ContractUpgradeScalarFieldEnum[]
  }

  /**
   * ContractUpgrade findFirstOrThrow
   */
  export type ContractUpgradeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractUpgrade
     */
    select?: ContractUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractUpgradeInclude<ExtArgs> | null
    /**
     * Filter, which ContractUpgrade to fetch.
     */
    where?: ContractUpgradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractUpgrades to fetch.
     */
    orderBy?: ContractUpgradeOrderByWithRelationInput | ContractUpgradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContractUpgrades.
     */
    cursor?: ContractUpgradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractUpgrades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractUpgrades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractUpgrades.
     */
    distinct?: ContractUpgradeScalarFieldEnum | ContractUpgradeScalarFieldEnum[]
  }

  /**
   * ContractUpgrade findMany
   */
  export type ContractUpgradeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractUpgrade
     */
    select?: ContractUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractUpgradeInclude<ExtArgs> | null
    /**
     * Filter, which ContractUpgrades to fetch.
     */
    where?: ContractUpgradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractUpgrades to fetch.
     */
    orderBy?: ContractUpgradeOrderByWithRelationInput | ContractUpgradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContractUpgrades.
     */
    cursor?: ContractUpgradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractUpgrades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractUpgrades.
     */
    skip?: number
    distinct?: ContractUpgradeScalarFieldEnum | ContractUpgradeScalarFieldEnum[]
  }

  /**
   * ContractUpgrade create
   */
  export type ContractUpgradeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractUpgrade
     */
    select?: ContractUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractUpgradeInclude<ExtArgs> | null
    /**
     * The data needed to create a ContractUpgrade.
     */
    data: XOR<ContractUpgradeCreateInput, ContractUpgradeUncheckedCreateInput>
  }

  /**
   * ContractUpgrade createMany
   */
  export type ContractUpgradeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContractUpgrades.
     */
    data: ContractUpgradeCreateManyInput | ContractUpgradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContractUpgrade createManyAndReturn
   */
  export type ContractUpgradeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractUpgrade
     */
    select?: ContractUpgradeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ContractUpgrades.
     */
    data: ContractUpgradeCreateManyInput | ContractUpgradeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractUpgradeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContractUpgrade update
   */
  export type ContractUpgradeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractUpgrade
     */
    select?: ContractUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractUpgradeInclude<ExtArgs> | null
    /**
     * The data needed to update a ContractUpgrade.
     */
    data: XOR<ContractUpgradeUpdateInput, ContractUpgradeUncheckedUpdateInput>
    /**
     * Choose, which ContractUpgrade to update.
     */
    where: ContractUpgradeWhereUniqueInput
  }

  /**
   * ContractUpgrade updateMany
   */
  export type ContractUpgradeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContractUpgrades.
     */
    data: XOR<ContractUpgradeUpdateManyMutationInput, ContractUpgradeUncheckedUpdateManyInput>
    /**
     * Filter which ContractUpgrades to update
     */
    where?: ContractUpgradeWhereInput
  }

  /**
   * ContractUpgrade upsert
   */
  export type ContractUpgradeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractUpgrade
     */
    select?: ContractUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractUpgradeInclude<ExtArgs> | null
    /**
     * The filter to search for the ContractUpgrade to update in case it exists.
     */
    where: ContractUpgradeWhereUniqueInput
    /**
     * In case the ContractUpgrade found by the `where` argument doesn't exist, create a new ContractUpgrade with this data.
     */
    create: XOR<ContractUpgradeCreateInput, ContractUpgradeUncheckedCreateInput>
    /**
     * In case the ContractUpgrade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContractUpgradeUpdateInput, ContractUpgradeUncheckedUpdateInput>
  }

  /**
   * ContractUpgrade delete
   */
  export type ContractUpgradeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractUpgrade
     */
    select?: ContractUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractUpgradeInclude<ExtArgs> | null
    /**
     * Filter which ContractUpgrade to delete.
     */
    where: ContractUpgradeWhereUniqueInput
  }

  /**
   * ContractUpgrade deleteMany
   */
  export type ContractUpgradeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContractUpgrades to delete
     */
    where?: ContractUpgradeWhereInput
  }

  /**
   * ContractUpgrade.contract
   */
  export type ContractUpgrade$contractArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeployedContract
     */
    select?: DeployedContractSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeployedContractInclude<ExtArgs> | null
    where?: DeployedContractWhereInput
  }

  /**
   * ContractUpgrade without action
   */
  export type ContractUpgradeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractUpgrade
     */
    select?: ContractUpgradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractUpgradeInclude<ExtArgs> | null
  }


  /**
   * Model StatusProposal
   */

  export type AggregateStatusProposal = {
    _count: StatusProposalCountAggregateOutputType | null
    _min: StatusProposalMinAggregateOutputType | null
    _max: StatusProposalMaxAggregateOutputType | null
  }

  export type StatusProposalMinAggregateOutputType = {
    id: string | null
    contractId: string | null
    action: string | null
    status: $Enums.ProposalStatus | null
    actorRef: string | null
    txHash: string | null
    calldata: string | null
    broadcastJobId: string | null
    error: string | null
    createdAt: Date | null
    executedAt: Date | null
  }

  export type StatusProposalMaxAggregateOutputType = {
    id: string | null
    contractId: string | null
    action: string | null
    status: $Enums.ProposalStatus | null
    actorRef: string | null
    txHash: string | null
    calldata: string | null
    broadcastJobId: string | null
    error: string | null
    createdAt: Date | null
    executedAt: Date | null
  }

  export type StatusProposalCountAggregateOutputType = {
    id: number
    contractId: number
    action: number
    status: number
    actorRef: number
    txHash: number
    calldata: number
    broadcastJobId: number
    error: number
    createdAt: number
    executedAt: number
    _all: number
  }


  export type StatusProposalMinAggregateInputType = {
    id?: true
    contractId?: true
    action?: true
    status?: true
    actorRef?: true
    txHash?: true
    calldata?: true
    broadcastJobId?: true
    error?: true
    createdAt?: true
    executedAt?: true
  }

  export type StatusProposalMaxAggregateInputType = {
    id?: true
    contractId?: true
    action?: true
    status?: true
    actorRef?: true
    txHash?: true
    calldata?: true
    broadcastJobId?: true
    error?: true
    createdAt?: true
    executedAt?: true
  }

  export type StatusProposalCountAggregateInputType = {
    id?: true
    contractId?: true
    action?: true
    status?: true
    actorRef?: true
    txHash?: true
    calldata?: true
    broadcastJobId?: true
    error?: true
    createdAt?: true
    executedAt?: true
    _all?: true
  }

  export type StatusProposalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StatusProposal to aggregate.
     */
    where?: StatusProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusProposals to fetch.
     */
    orderBy?: StatusProposalOrderByWithRelationInput | StatusProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StatusProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusProposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusProposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StatusProposals
    **/
    _count?: true | StatusProposalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StatusProposalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StatusProposalMaxAggregateInputType
  }

  export type GetStatusProposalAggregateType<T extends StatusProposalAggregateArgs> = {
        [P in keyof T & keyof AggregateStatusProposal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStatusProposal[P]>
      : GetScalarType<T[P], AggregateStatusProposal[P]>
  }




  export type StatusProposalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatusProposalWhereInput
    orderBy?: StatusProposalOrderByWithAggregationInput | StatusProposalOrderByWithAggregationInput[]
    by: StatusProposalScalarFieldEnum[] | StatusProposalScalarFieldEnum
    having?: StatusProposalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StatusProposalCountAggregateInputType | true
    _min?: StatusProposalMinAggregateInputType
    _max?: StatusProposalMaxAggregateInputType
  }

  export type StatusProposalGroupByOutputType = {
    id: string
    contractId: string
    action: string
    status: $Enums.ProposalStatus
    actorRef: string | null
    txHash: string | null
    calldata: string | null
    broadcastJobId: string | null
    error: string | null
    createdAt: Date
    executedAt: Date | null
    _count: StatusProposalCountAggregateOutputType | null
    _min: StatusProposalMinAggregateOutputType | null
    _max: StatusProposalMaxAggregateOutputType | null
  }

  type GetStatusProposalGroupByPayload<T extends StatusProposalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StatusProposalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StatusProposalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StatusProposalGroupByOutputType[P]>
            : GetScalarType<T[P], StatusProposalGroupByOutputType[P]>
        }
      >
    >


  export type StatusProposalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractId?: boolean
    action?: boolean
    status?: boolean
    actorRef?: boolean
    txHash?: boolean
    calldata?: boolean
    broadcastJobId?: boolean
    error?: boolean
    createdAt?: boolean
    executedAt?: boolean
    contract?: boolean | DeployedContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["statusProposal"]>

  export type StatusProposalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    contractId?: boolean
    action?: boolean
    status?: boolean
    actorRef?: boolean
    txHash?: boolean
    calldata?: boolean
    broadcastJobId?: boolean
    error?: boolean
    createdAt?: boolean
    executedAt?: boolean
    contract?: boolean | DeployedContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["statusProposal"]>

  export type StatusProposalSelectScalar = {
    id?: boolean
    contractId?: boolean
    action?: boolean
    status?: boolean
    actorRef?: boolean
    txHash?: boolean
    calldata?: boolean
    broadcastJobId?: boolean
    error?: boolean
    createdAt?: boolean
    executedAt?: boolean
  }

  export type StatusProposalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | DeployedContractDefaultArgs<ExtArgs>
  }
  export type StatusProposalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contract?: boolean | DeployedContractDefaultArgs<ExtArgs>
  }

  export type $StatusProposalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StatusProposal"
    objects: {
      contract: Prisma.$DeployedContractPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      contractId: string
      action: string
      status: $Enums.ProposalStatus
      actorRef: string | null
      txHash: string | null
      calldata: string | null
      broadcastJobId: string | null
      error: string | null
      createdAt: Date
      executedAt: Date | null
    }, ExtArgs["result"]["statusProposal"]>
    composites: {}
  }

  type StatusProposalGetPayload<S extends boolean | null | undefined | StatusProposalDefaultArgs> = $Result.GetResult<Prisma.$StatusProposalPayload, S>

  type StatusProposalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StatusProposalFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StatusProposalCountAggregateInputType | true
    }

  export interface StatusProposalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StatusProposal'], meta: { name: 'StatusProposal' } }
    /**
     * Find zero or one StatusProposal that matches the filter.
     * @param {StatusProposalFindUniqueArgs} args - Arguments to find a StatusProposal
     * @example
     * // Get one StatusProposal
     * const statusProposal = await prisma.statusProposal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StatusProposalFindUniqueArgs>(args: SelectSubset<T, StatusProposalFindUniqueArgs<ExtArgs>>): Prisma__StatusProposalClient<$Result.GetResult<Prisma.$StatusProposalPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StatusProposal that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StatusProposalFindUniqueOrThrowArgs} args - Arguments to find a StatusProposal
     * @example
     * // Get one StatusProposal
     * const statusProposal = await prisma.statusProposal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StatusProposalFindUniqueOrThrowArgs>(args: SelectSubset<T, StatusProposalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StatusProposalClient<$Result.GetResult<Prisma.$StatusProposalPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StatusProposal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusProposalFindFirstArgs} args - Arguments to find a StatusProposal
     * @example
     * // Get one StatusProposal
     * const statusProposal = await prisma.statusProposal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StatusProposalFindFirstArgs>(args?: SelectSubset<T, StatusProposalFindFirstArgs<ExtArgs>>): Prisma__StatusProposalClient<$Result.GetResult<Prisma.$StatusProposalPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StatusProposal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusProposalFindFirstOrThrowArgs} args - Arguments to find a StatusProposal
     * @example
     * // Get one StatusProposal
     * const statusProposal = await prisma.statusProposal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StatusProposalFindFirstOrThrowArgs>(args?: SelectSubset<T, StatusProposalFindFirstOrThrowArgs<ExtArgs>>): Prisma__StatusProposalClient<$Result.GetResult<Prisma.$StatusProposalPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StatusProposals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusProposalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StatusProposals
     * const statusProposals = await prisma.statusProposal.findMany()
     * 
     * // Get first 10 StatusProposals
     * const statusProposals = await prisma.statusProposal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const statusProposalWithIdOnly = await prisma.statusProposal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StatusProposalFindManyArgs>(args?: SelectSubset<T, StatusProposalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusProposalPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StatusProposal.
     * @param {StatusProposalCreateArgs} args - Arguments to create a StatusProposal.
     * @example
     * // Create one StatusProposal
     * const StatusProposal = await prisma.statusProposal.create({
     *   data: {
     *     // ... data to create a StatusProposal
     *   }
     * })
     * 
     */
    create<T extends StatusProposalCreateArgs>(args: SelectSubset<T, StatusProposalCreateArgs<ExtArgs>>): Prisma__StatusProposalClient<$Result.GetResult<Prisma.$StatusProposalPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StatusProposals.
     * @param {StatusProposalCreateManyArgs} args - Arguments to create many StatusProposals.
     * @example
     * // Create many StatusProposals
     * const statusProposal = await prisma.statusProposal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StatusProposalCreateManyArgs>(args?: SelectSubset<T, StatusProposalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StatusProposals and returns the data saved in the database.
     * @param {StatusProposalCreateManyAndReturnArgs} args - Arguments to create many StatusProposals.
     * @example
     * // Create many StatusProposals
     * const statusProposal = await prisma.statusProposal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StatusProposals and only return the `id`
     * const statusProposalWithIdOnly = await prisma.statusProposal.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StatusProposalCreateManyAndReturnArgs>(args?: SelectSubset<T, StatusProposalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatusProposalPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a StatusProposal.
     * @param {StatusProposalDeleteArgs} args - Arguments to delete one StatusProposal.
     * @example
     * // Delete one StatusProposal
     * const StatusProposal = await prisma.statusProposal.delete({
     *   where: {
     *     // ... filter to delete one StatusProposal
     *   }
     * })
     * 
     */
    delete<T extends StatusProposalDeleteArgs>(args: SelectSubset<T, StatusProposalDeleteArgs<ExtArgs>>): Prisma__StatusProposalClient<$Result.GetResult<Prisma.$StatusProposalPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StatusProposal.
     * @param {StatusProposalUpdateArgs} args - Arguments to update one StatusProposal.
     * @example
     * // Update one StatusProposal
     * const statusProposal = await prisma.statusProposal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StatusProposalUpdateArgs>(args: SelectSubset<T, StatusProposalUpdateArgs<ExtArgs>>): Prisma__StatusProposalClient<$Result.GetResult<Prisma.$StatusProposalPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StatusProposals.
     * @param {StatusProposalDeleteManyArgs} args - Arguments to filter StatusProposals to delete.
     * @example
     * // Delete a few StatusProposals
     * const { count } = await prisma.statusProposal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StatusProposalDeleteManyArgs>(args?: SelectSubset<T, StatusProposalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StatusProposals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusProposalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StatusProposals
     * const statusProposal = await prisma.statusProposal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StatusProposalUpdateManyArgs>(args: SelectSubset<T, StatusProposalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StatusProposal.
     * @param {StatusProposalUpsertArgs} args - Arguments to update or create a StatusProposal.
     * @example
     * // Update or create a StatusProposal
     * const statusProposal = await prisma.statusProposal.upsert({
     *   create: {
     *     // ... data to create a StatusProposal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StatusProposal we want to update
     *   }
     * })
     */
    upsert<T extends StatusProposalUpsertArgs>(args: SelectSubset<T, StatusProposalUpsertArgs<ExtArgs>>): Prisma__StatusProposalClient<$Result.GetResult<Prisma.$StatusProposalPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StatusProposals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusProposalCountArgs} args - Arguments to filter StatusProposals to count.
     * @example
     * // Count the number of StatusProposals
     * const count = await prisma.statusProposal.count({
     *   where: {
     *     // ... the filter for the StatusProposals we want to count
     *   }
     * })
    **/
    count<T extends StatusProposalCountArgs>(
      args?: Subset<T, StatusProposalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StatusProposalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StatusProposal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusProposalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StatusProposalAggregateArgs>(args: Subset<T, StatusProposalAggregateArgs>): Prisma.PrismaPromise<GetStatusProposalAggregateType<T>>

    /**
     * Group by StatusProposal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusProposalGroupByArgs} args - Group by arguments.
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
      T extends StatusProposalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StatusProposalGroupByArgs['orderBy'] }
        : { orderBy?: StatusProposalGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StatusProposalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStatusProposalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StatusProposal model
   */
  readonly fields: StatusProposalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StatusProposal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StatusProposalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contract<T extends DeployedContractDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeployedContractDefaultArgs<ExtArgs>>): Prisma__DeployedContractClient<$Result.GetResult<Prisma.$DeployedContractPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the StatusProposal model
   */ 
  interface StatusProposalFieldRefs {
    readonly id: FieldRef<"StatusProposal", 'String'>
    readonly contractId: FieldRef<"StatusProposal", 'String'>
    readonly action: FieldRef<"StatusProposal", 'String'>
    readonly status: FieldRef<"StatusProposal", 'ProposalStatus'>
    readonly actorRef: FieldRef<"StatusProposal", 'String'>
    readonly txHash: FieldRef<"StatusProposal", 'String'>
    readonly calldata: FieldRef<"StatusProposal", 'String'>
    readonly broadcastJobId: FieldRef<"StatusProposal", 'String'>
    readonly error: FieldRef<"StatusProposal", 'String'>
    readonly createdAt: FieldRef<"StatusProposal", 'DateTime'>
    readonly executedAt: FieldRef<"StatusProposal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StatusProposal findUnique
   */
  export type StatusProposalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusProposal
     */
    select?: StatusProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusProposalInclude<ExtArgs> | null
    /**
     * Filter, which StatusProposal to fetch.
     */
    where: StatusProposalWhereUniqueInput
  }

  /**
   * StatusProposal findUniqueOrThrow
   */
  export type StatusProposalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusProposal
     */
    select?: StatusProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusProposalInclude<ExtArgs> | null
    /**
     * Filter, which StatusProposal to fetch.
     */
    where: StatusProposalWhereUniqueInput
  }

  /**
   * StatusProposal findFirst
   */
  export type StatusProposalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusProposal
     */
    select?: StatusProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusProposalInclude<ExtArgs> | null
    /**
     * Filter, which StatusProposal to fetch.
     */
    where?: StatusProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusProposals to fetch.
     */
    orderBy?: StatusProposalOrderByWithRelationInput | StatusProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StatusProposals.
     */
    cursor?: StatusProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusProposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusProposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StatusProposals.
     */
    distinct?: StatusProposalScalarFieldEnum | StatusProposalScalarFieldEnum[]
  }

  /**
   * StatusProposal findFirstOrThrow
   */
  export type StatusProposalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusProposal
     */
    select?: StatusProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusProposalInclude<ExtArgs> | null
    /**
     * Filter, which StatusProposal to fetch.
     */
    where?: StatusProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusProposals to fetch.
     */
    orderBy?: StatusProposalOrderByWithRelationInput | StatusProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StatusProposals.
     */
    cursor?: StatusProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusProposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusProposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StatusProposals.
     */
    distinct?: StatusProposalScalarFieldEnum | StatusProposalScalarFieldEnum[]
  }

  /**
   * StatusProposal findMany
   */
  export type StatusProposalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusProposal
     */
    select?: StatusProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusProposalInclude<ExtArgs> | null
    /**
     * Filter, which StatusProposals to fetch.
     */
    where?: StatusProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StatusProposals to fetch.
     */
    orderBy?: StatusProposalOrderByWithRelationInput | StatusProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StatusProposals.
     */
    cursor?: StatusProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StatusProposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StatusProposals.
     */
    skip?: number
    distinct?: StatusProposalScalarFieldEnum | StatusProposalScalarFieldEnum[]
  }

  /**
   * StatusProposal create
   */
  export type StatusProposalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusProposal
     */
    select?: StatusProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusProposalInclude<ExtArgs> | null
    /**
     * The data needed to create a StatusProposal.
     */
    data: XOR<StatusProposalCreateInput, StatusProposalUncheckedCreateInput>
  }

  /**
   * StatusProposal createMany
   */
  export type StatusProposalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StatusProposals.
     */
    data: StatusProposalCreateManyInput | StatusProposalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StatusProposal createManyAndReturn
   */
  export type StatusProposalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusProposal
     */
    select?: StatusProposalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many StatusProposals.
     */
    data: StatusProposalCreateManyInput | StatusProposalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusProposalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StatusProposal update
   */
  export type StatusProposalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusProposal
     */
    select?: StatusProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusProposalInclude<ExtArgs> | null
    /**
     * The data needed to update a StatusProposal.
     */
    data: XOR<StatusProposalUpdateInput, StatusProposalUncheckedUpdateInput>
    /**
     * Choose, which StatusProposal to update.
     */
    where: StatusProposalWhereUniqueInput
  }

  /**
   * StatusProposal updateMany
   */
  export type StatusProposalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StatusProposals.
     */
    data: XOR<StatusProposalUpdateManyMutationInput, StatusProposalUncheckedUpdateManyInput>
    /**
     * Filter which StatusProposals to update
     */
    where?: StatusProposalWhereInput
  }

  /**
   * StatusProposal upsert
   */
  export type StatusProposalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusProposal
     */
    select?: StatusProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusProposalInclude<ExtArgs> | null
    /**
     * The filter to search for the StatusProposal to update in case it exists.
     */
    where: StatusProposalWhereUniqueInput
    /**
     * In case the StatusProposal found by the `where` argument doesn't exist, create a new StatusProposal with this data.
     */
    create: XOR<StatusProposalCreateInput, StatusProposalUncheckedCreateInput>
    /**
     * In case the StatusProposal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StatusProposalUpdateInput, StatusProposalUncheckedUpdateInput>
  }

  /**
   * StatusProposal delete
   */
  export type StatusProposalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusProposal
     */
    select?: StatusProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusProposalInclude<ExtArgs> | null
    /**
     * Filter which StatusProposal to delete.
     */
    where: StatusProposalWhereUniqueInput
  }

  /**
   * StatusProposal deleteMany
   */
  export type StatusProposalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StatusProposals to delete
     */
    where?: StatusProposalWhereInput
  }

  /**
   * StatusProposal without action
   */
  export type StatusProposalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusProposal
     */
    select?: StatusProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StatusProposalInclude<ExtArgs> | null
  }


  /**
   * Model GovernanceDeployment
   */

  export type AggregateGovernanceDeployment = {
    _count: GovernanceDeploymentCountAggregateOutputType | null
    _avg: GovernanceDeploymentAvgAggregateOutputType | null
    _sum: GovernanceDeploymentSumAggregateOutputType | null
    _min: GovernanceDeploymentMinAggregateOutputType | null
    _max: GovernanceDeploymentMaxAggregateOutputType | null
  }

  export type GovernanceDeploymentAvgAggregateOutputType = {
    chainId: number | null
  }

  export type GovernanceDeploymentSumAggregateOutputType = {
    chainId: number | null
  }

  export type GovernanceDeploymentMinAggregateOutputType = {
    id: string | null
    network: string | null
    chainId: number | null
    tokenAddress: string | null
    timelockAddress: string | null
    governorAddress: string | null
    deployedAt: Date | null
    createdAt: Date | null
  }

  export type GovernanceDeploymentMaxAggregateOutputType = {
    id: string | null
    network: string | null
    chainId: number | null
    tokenAddress: string | null
    timelockAddress: string | null
    governorAddress: string | null
    deployedAt: Date | null
    createdAt: Date | null
  }

  export type GovernanceDeploymentCountAggregateOutputType = {
    id: number
    network: number
    chainId: number
    tokenAddress: number
    timelockAddress: number
    governorAddress: number
    deployedAt: number
    createdAt: number
    _all: number
  }


  export type GovernanceDeploymentAvgAggregateInputType = {
    chainId?: true
  }

  export type GovernanceDeploymentSumAggregateInputType = {
    chainId?: true
  }

  export type GovernanceDeploymentMinAggregateInputType = {
    id?: true
    network?: true
    chainId?: true
    tokenAddress?: true
    timelockAddress?: true
    governorAddress?: true
    deployedAt?: true
    createdAt?: true
  }

  export type GovernanceDeploymentMaxAggregateInputType = {
    id?: true
    network?: true
    chainId?: true
    tokenAddress?: true
    timelockAddress?: true
    governorAddress?: true
    deployedAt?: true
    createdAt?: true
  }

  export type GovernanceDeploymentCountAggregateInputType = {
    id?: true
    network?: true
    chainId?: true
    tokenAddress?: true
    timelockAddress?: true
    governorAddress?: true
    deployedAt?: true
    createdAt?: true
    _all?: true
  }

  export type GovernanceDeploymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GovernanceDeployment to aggregate.
     */
    where?: GovernanceDeploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GovernanceDeployments to fetch.
     */
    orderBy?: GovernanceDeploymentOrderByWithRelationInput | GovernanceDeploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GovernanceDeploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GovernanceDeployments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GovernanceDeployments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GovernanceDeployments
    **/
    _count?: true | GovernanceDeploymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GovernanceDeploymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GovernanceDeploymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GovernanceDeploymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GovernanceDeploymentMaxAggregateInputType
  }

  export type GetGovernanceDeploymentAggregateType<T extends GovernanceDeploymentAggregateArgs> = {
        [P in keyof T & keyof AggregateGovernanceDeployment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGovernanceDeployment[P]>
      : GetScalarType<T[P], AggregateGovernanceDeployment[P]>
  }




  export type GovernanceDeploymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GovernanceDeploymentWhereInput
    orderBy?: GovernanceDeploymentOrderByWithAggregationInput | GovernanceDeploymentOrderByWithAggregationInput[]
    by: GovernanceDeploymentScalarFieldEnum[] | GovernanceDeploymentScalarFieldEnum
    having?: GovernanceDeploymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GovernanceDeploymentCountAggregateInputType | true
    _avg?: GovernanceDeploymentAvgAggregateInputType
    _sum?: GovernanceDeploymentSumAggregateInputType
    _min?: GovernanceDeploymentMinAggregateInputType
    _max?: GovernanceDeploymentMaxAggregateInputType
  }

  export type GovernanceDeploymentGroupByOutputType = {
    id: string
    network: string
    chainId: number
    tokenAddress: string
    timelockAddress: string
    governorAddress: string
    deployedAt: Date
    createdAt: Date
    _count: GovernanceDeploymentCountAggregateOutputType | null
    _avg: GovernanceDeploymentAvgAggregateOutputType | null
    _sum: GovernanceDeploymentSumAggregateOutputType | null
    _min: GovernanceDeploymentMinAggregateOutputType | null
    _max: GovernanceDeploymentMaxAggregateOutputType | null
  }

  type GetGovernanceDeploymentGroupByPayload<T extends GovernanceDeploymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GovernanceDeploymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GovernanceDeploymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GovernanceDeploymentGroupByOutputType[P]>
            : GetScalarType<T[P], GovernanceDeploymentGroupByOutputType[P]>
        }
      >
    >


  export type GovernanceDeploymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    network?: boolean
    chainId?: boolean
    tokenAddress?: boolean
    timelockAddress?: boolean
    governorAddress?: boolean
    deployedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["governanceDeployment"]>

  export type GovernanceDeploymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    network?: boolean
    chainId?: boolean
    tokenAddress?: boolean
    timelockAddress?: boolean
    governorAddress?: boolean
    deployedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["governanceDeployment"]>

  export type GovernanceDeploymentSelectScalar = {
    id?: boolean
    network?: boolean
    chainId?: boolean
    tokenAddress?: boolean
    timelockAddress?: boolean
    governorAddress?: boolean
    deployedAt?: boolean
    createdAt?: boolean
  }


  export type $GovernanceDeploymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GovernanceDeployment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      network: string
      chainId: number
      tokenAddress: string
      timelockAddress: string
      governorAddress: string
      deployedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["governanceDeployment"]>
    composites: {}
  }

  type GovernanceDeploymentGetPayload<S extends boolean | null | undefined | GovernanceDeploymentDefaultArgs> = $Result.GetResult<Prisma.$GovernanceDeploymentPayload, S>

  type GovernanceDeploymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GovernanceDeploymentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GovernanceDeploymentCountAggregateInputType | true
    }

  export interface GovernanceDeploymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GovernanceDeployment'], meta: { name: 'GovernanceDeployment' } }
    /**
     * Find zero or one GovernanceDeployment that matches the filter.
     * @param {GovernanceDeploymentFindUniqueArgs} args - Arguments to find a GovernanceDeployment
     * @example
     * // Get one GovernanceDeployment
     * const governanceDeployment = await prisma.governanceDeployment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GovernanceDeploymentFindUniqueArgs>(args: SelectSubset<T, GovernanceDeploymentFindUniqueArgs<ExtArgs>>): Prisma__GovernanceDeploymentClient<$Result.GetResult<Prisma.$GovernanceDeploymentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GovernanceDeployment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GovernanceDeploymentFindUniqueOrThrowArgs} args - Arguments to find a GovernanceDeployment
     * @example
     * // Get one GovernanceDeployment
     * const governanceDeployment = await prisma.governanceDeployment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GovernanceDeploymentFindUniqueOrThrowArgs>(args: SelectSubset<T, GovernanceDeploymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GovernanceDeploymentClient<$Result.GetResult<Prisma.$GovernanceDeploymentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GovernanceDeployment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GovernanceDeploymentFindFirstArgs} args - Arguments to find a GovernanceDeployment
     * @example
     * // Get one GovernanceDeployment
     * const governanceDeployment = await prisma.governanceDeployment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GovernanceDeploymentFindFirstArgs>(args?: SelectSubset<T, GovernanceDeploymentFindFirstArgs<ExtArgs>>): Prisma__GovernanceDeploymentClient<$Result.GetResult<Prisma.$GovernanceDeploymentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GovernanceDeployment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GovernanceDeploymentFindFirstOrThrowArgs} args - Arguments to find a GovernanceDeployment
     * @example
     * // Get one GovernanceDeployment
     * const governanceDeployment = await prisma.governanceDeployment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GovernanceDeploymentFindFirstOrThrowArgs>(args?: SelectSubset<T, GovernanceDeploymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__GovernanceDeploymentClient<$Result.GetResult<Prisma.$GovernanceDeploymentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GovernanceDeployments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GovernanceDeploymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GovernanceDeployments
     * const governanceDeployments = await prisma.governanceDeployment.findMany()
     * 
     * // Get first 10 GovernanceDeployments
     * const governanceDeployments = await prisma.governanceDeployment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const governanceDeploymentWithIdOnly = await prisma.governanceDeployment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GovernanceDeploymentFindManyArgs>(args?: SelectSubset<T, GovernanceDeploymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GovernanceDeploymentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GovernanceDeployment.
     * @param {GovernanceDeploymentCreateArgs} args - Arguments to create a GovernanceDeployment.
     * @example
     * // Create one GovernanceDeployment
     * const GovernanceDeployment = await prisma.governanceDeployment.create({
     *   data: {
     *     // ... data to create a GovernanceDeployment
     *   }
     * })
     * 
     */
    create<T extends GovernanceDeploymentCreateArgs>(args: SelectSubset<T, GovernanceDeploymentCreateArgs<ExtArgs>>): Prisma__GovernanceDeploymentClient<$Result.GetResult<Prisma.$GovernanceDeploymentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GovernanceDeployments.
     * @param {GovernanceDeploymentCreateManyArgs} args - Arguments to create many GovernanceDeployments.
     * @example
     * // Create many GovernanceDeployments
     * const governanceDeployment = await prisma.governanceDeployment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GovernanceDeploymentCreateManyArgs>(args?: SelectSubset<T, GovernanceDeploymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GovernanceDeployments and returns the data saved in the database.
     * @param {GovernanceDeploymentCreateManyAndReturnArgs} args - Arguments to create many GovernanceDeployments.
     * @example
     * // Create many GovernanceDeployments
     * const governanceDeployment = await prisma.governanceDeployment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GovernanceDeployments and only return the `id`
     * const governanceDeploymentWithIdOnly = await prisma.governanceDeployment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GovernanceDeploymentCreateManyAndReturnArgs>(args?: SelectSubset<T, GovernanceDeploymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GovernanceDeploymentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GovernanceDeployment.
     * @param {GovernanceDeploymentDeleteArgs} args - Arguments to delete one GovernanceDeployment.
     * @example
     * // Delete one GovernanceDeployment
     * const GovernanceDeployment = await prisma.governanceDeployment.delete({
     *   where: {
     *     // ... filter to delete one GovernanceDeployment
     *   }
     * })
     * 
     */
    delete<T extends GovernanceDeploymentDeleteArgs>(args: SelectSubset<T, GovernanceDeploymentDeleteArgs<ExtArgs>>): Prisma__GovernanceDeploymentClient<$Result.GetResult<Prisma.$GovernanceDeploymentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GovernanceDeployment.
     * @param {GovernanceDeploymentUpdateArgs} args - Arguments to update one GovernanceDeployment.
     * @example
     * // Update one GovernanceDeployment
     * const governanceDeployment = await prisma.governanceDeployment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GovernanceDeploymentUpdateArgs>(args: SelectSubset<T, GovernanceDeploymentUpdateArgs<ExtArgs>>): Prisma__GovernanceDeploymentClient<$Result.GetResult<Prisma.$GovernanceDeploymentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GovernanceDeployments.
     * @param {GovernanceDeploymentDeleteManyArgs} args - Arguments to filter GovernanceDeployments to delete.
     * @example
     * // Delete a few GovernanceDeployments
     * const { count } = await prisma.governanceDeployment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GovernanceDeploymentDeleteManyArgs>(args?: SelectSubset<T, GovernanceDeploymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GovernanceDeployments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GovernanceDeploymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GovernanceDeployments
     * const governanceDeployment = await prisma.governanceDeployment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GovernanceDeploymentUpdateManyArgs>(args: SelectSubset<T, GovernanceDeploymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GovernanceDeployment.
     * @param {GovernanceDeploymentUpsertArgs} args - Arguments to update or create a GovernanceDeployment.
     * @example
     * // Update or create a GovernanceDeployment
     * const governanceDeployment = await prisma.governanceDeployment.upsert({
     *   create: {
     *     // ... data to create a GovernanceDeployment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GovernanceDeployment we want to update
     *   }
     * })
     */
    upsert<T extends GovernanceDeploymentUpsertArgs>(args: SelectSubset<T, GovernanceDeploymentUpsertArgs<ExtArgs>>): Prisma__GovernanceDeploymentClient<$Result.GetResult<Prisma.$GovernanceDeploymentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GovernanceDeployments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GovernanceDeploymentCountArgs} args - Arguments to filter GovernanceDeployments to count.
     * @example
     * // Count the number of GovernanceDeployments
     * const count = await prisma.governanceDeployment.count({
     *   where: {
     *     // ... the filter for the GovernanceDeployments we want to count
     *   }
     * })
    **/
    count<T extends GovernanceDeploymentCountArgs>(
      args?: Subset<T, GovernanceDeploymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GovernanceDeploymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GovernanceDeployment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GovernanceDeploymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GovernanceDeploymentAggregateArgs>(args: Subset<T, GovernanceDeploymentAggregateArgs>): Prisma.PrismaPromise<GetGovernanceDeploymentAggregateType<T>>

    /**
     * Group by GovernanceDeployment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GovernanceDeploymentGroupByArgs} args - Group by arguments.
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
      T extends GovernanceDeploymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GovernanceDeploymentGroupByArgs['orderBy'] }
        : { orderBy?: GovernanceDeploymentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GovernanceDeploymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGovernanceDeploymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GovernanceDeployment model
   */
  readonly fields: GovernanceDeploymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GovernanceDeployment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GovernanceDeploymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the GovernanceDeployment model
   */ 
  interface GovernanceDeploymentFieldRefs {
    readonly id: FieldRef<"GovernanceDeployment", 'String'>
    readonly network: FieldRef<"GovernanceDeployment", 'String'>
    readonly chainId: FieldRef<"GovernanceDeployment", 'Int'>
    readonly tokenAddress: FieldRef<"GovernanceDeployment", 'String'>
    readonly timelockAddress: FieldRef<"GovernanceDeployment", 'String'>
    readonly governorAddress: FieldRef<"GovernanceDeployment", 'String'>
    readonly deployedAt: FieldRef<"GovernanceDeployment", 'DateTime'>
    readonly createdAt: FieldRef<"GovernanceDeployment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GovernanceDeployment findUnique
   */
  export type GovernanceDeploymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernanceDeployment
     */
    select?: GovernanceDeploymentSelect<ExtArgs> | null
    /**
     * Filter, which GovernanceDeployment to fetch.
     */
    where: GovernanceDeploymentWhereUniqueInput
  }

  /**
   * GovernanceDeployment findUniqueOrThrow
   */
  export type GovernanceDeploymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernanceDeployment
     */
    select?: GovernanceDeploymentSelect<ExtArgs> | null
    /**
     * Filter, which GovernanceDeployment to fetch.
     */
    where: GovernanceDeploymentWhereUniqueInput
  }

  /**
   * GovernanceDeployment findFirst
   */
  export type GovernanceDeploymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernanceDeployment
     */
    select?: GovernanceDeploymentSelect<ExtArgs> | null
    /**
     * Filter, which GovernanceDeployment to fetch.
     */
    where?: GovernanceDeploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GovernanceDeployments to fetch.
     */
    orderBy?: GovernanceDeploymentOrderByWithRelationInput | GovernanceDeploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GovernanceDeployments.
     */
    cursor?: GovernanceDeploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GovernanceDeployments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GovernanceDeployments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GovernanceDeployments.
     */
    distinct?: GovernanceDeploymentScalarFieldEnum | GovernanceDeploymentScalarFieldEnum[]
  }

  /**
   * GovernanceDeployment findFirstOrThrow
   */
  export type GovernanceDeploymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernanceDeployment
     */
    select?: GovernanceDeploymentSelect<ExtArgs> | null
    /**
     * Filter, which GovernanceDeployment to fetch.
     */
    where?: GovernanceDeploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GovernanceDeployments to fetch.
     */
    orderBy?: GovernanceDeploymentOrderByWithRelationInput | GovernanceDeploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GovernanceDeployments.
     */
    cursor?: GovernanceDeploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GovernanceDeployments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GovernanceDeployments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GovernanceDeployments.
     */
    distinct?: GovernanceDeploymentScalarFieldEnum | GovernanceDeploymentScalarFieldEnum[]
  }

  /**
   * GovernanceDeployment findMany
   */
  export type GovernanceDeploymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernanceDeployment
     */
    select?: GovernanceDeploymentSelect<ExtArgs> | null
    /**
     * Filter, which GovernanceDeployments to fetch.
     */
    where?: GovernanceDeploymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GovernanceDeployments to fetch.
     */
    orderBy?: GovernanceDeploymentOrderByWithRelationInput | GovernanceDeploymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GovernanceDeployments.
     */
    cursor?: GovernanceDeploymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GovernanceDeployments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GovernanceDeployments.
     */
    skip?: number
    distinct?: GovernanceDeploymentScalarFieldEnum | GovernanceDeploymentScalarFieldEnum[]
  }

  /**
   * GovernanceDeployment create
   */
  export type GovernanceDeploymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernanceDeployment
     */
    select?: GovernanceDeploymentSelect<ExtArgs> | null
    /**
     * The data needed to create a GovernanceDeployment.
     */
    data: XOR<GovernanceDeploymentCreateInput, GovernanceDeploymentUncheckedCreateInput>
  }

  /**
   * GovernanceDeployment createMany
   */
  export type GovernanceDeploymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GovernanceDeployments.
     */
    data: GovernanceDeploymentCreateManyInput | GovernanceDeploymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GovernanceDeployment createManyAndReturn
   */
  export type GovernanceDeploymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernanceDeployment
     */
    select?: GovernanceDeploymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GovernanceDeployments.
     */
    data: GovernanceDeploymentCreateManyInput | GovernanceDeploymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GovernanceDeployment update
   */
  export type GovernanceDeploymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernanceDeployment
     */
    select?: GovernanceDeploymentSelect<ExtArgs> | null
    /**
     * The data needed to update a GovernanceDeployment.
     */
    data: XOR<GovernanceDeploymentUpdateInput, GovernanceDeploymentUncheckedUpdateInput>
    /**
     * Choose, which GovernanceDeployment to update.
     */
    where: GovernanceDeploymentWhereUniqueInput
  }

  /**
   * GovernanceDeployment updateMany
   */
  export type GovernanceDeploymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GovernanceDeployments.
     */
    data: XOR<GovernanceDeploymentUpdateManyMutationInput, GovernanceDeploymentUncheckedUpdateManyInput>
    /**
     * Filter which GovernanceDeployments to update
     */
    where?: GovernanceDeploymentWhereInput
  }

  /**
   * GovernanceDeployment upsert
   */
  export type GovernanceDeploymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernanceDeployment
     */
    select?: GovernanceDeploymentSelect<ExtArgs> | null
    /**
     * The filter to search for the GovernanceDeployment to update in case it exists.
     */
    where: GovernanceDeploymentWhereUniqueInput
    /**
     * In case the GovernanceDeployment found by the `where` argument doesn't exist, create a new GovernanceDeployment with this data.
     */
    create: XOR<GovernanceDeploymentCreateInput, GovernanceDeploymentUncheckedCreateInput>
    /**
     * In case the GovernanceDeployment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GovernanceDeploymentUpdateInput, GovernanceDeploymentUncheckedUpdateInput>
  }

  /**
   * GovernanceDeployment delete
   */
  export type GovernanceDeploymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernanceDeployment
     */
    select?: GovernanceDeploymentSelect<ExtArgs> | null
    /**
     * Filter which GovernanceDeployment to delete.
     */
    where: GovernanceDeploymentWhereUniqueInput
  }

  /**
   * GovernanceDeployment deleteMany
   */
  export type GovernanceDeploymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GovernanceDeployments to delete
     */
    where?: GovernanceDeploymentWhereInput
  }

  /**
   * GovernanceDeployment without action
   */
  export type GovernanceDeploymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GovernanceDeployment
     */
    select?: GovernanceDeploymentSelect<ExtArgs> | null
  }


  /**
   * Model AttestationIssuer
   */

  export type AggregateAttestationIssuer = {
    _count: AttestationIssuerCountAggregateOutputType | null
    _min: AttestationIssuerMinAggregateOutputType | null
    _max: AttestationIssuerMaxAggregateOutputType | null
  }

  export type AttestationIssuerMinAggregateOutputType = {
    id: string | null
    registryContractId: string | null
    issuerAddress: string | null
    vertical: string | null
    accredited: boolean | null
    onChainTxHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AttestationIssuerMaxAggregateOutputType = {
    id: string | null
    registryContractId: string | null
    issuerAddress: string | null
    vertical: string | null
    accredited: boolean | null
    onChainTxHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AttestationIssuerCountAggregateOutputType = {
    id: number
    registryContractId: number
    issuerAddress: number
    vertical: number
    accredited: number
    onChainTxHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AttestationIssuerMinAggregateInputType = {
    id?: true
    registryContractId?: true
    issuerAddress?: true
    vertical?: true
    accredited?: true
    onChainTxHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AttestationIssuerMaxAggregateInputType = {
    id?: true
    registryContractId?: true
    issuerAddress?: true
    vertical?: true
    accredited?: true
    onChainTxHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AttestationIssuerCountAggregateInputType = {
    id?: true
    registryContractId?: true
    issuerAddress?: true
    vertical?: true
    accredited?: true
    onChainTxHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AttestationIssuerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttestationIssuer to aggregate.
     */
    where?: AttestationIssuerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttestationIssuers to fetch.
     */
    orderBy?: AttestationIssuerOrderByWithRelationInput | AttestationIssuerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttestationIssuerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttestationIssuers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttestationIssuers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AttestationIssuers
    **/
    _count?: true | AttestationIssuerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttestationIssuerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttestationIssuerMaxAggregateInputType
  }

  export type GetAttestationIssuerAggregateType<T extends AttestationIssuerAggregateArgs> = {
        [P in keyof T & keyof AggregateAttestationIssuer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttestationIssuer[P]>
      : GetScalarType<T[P], AggregateAttestationIssuer[P]>
  }




  export type AttestationIssuerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttestationIssuerWhereInput
    orderBy?: AttestationIssuerOrderByWithAggregationInput | AttestationIssuerOrderByWithAggregationInput[]
    by: AttestationIssuerScalarFieldEnum[] | AttestationIssuerScalarFieldEnum
    having?: AttestationIssuerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttestationIssuerCountAggregateInputType | true
    _min?: AttestationIssuerMinAggregateInputType
    _max?: AttestationIssuerMaxAggregateInputType
  }

  export type AttestationIssuerGroupByOutputType = {
    id: string
    registryContractId: string
    issuerAddress: string
    vertical: string
    accredited: boolean
    onChainTxHash: string | null
    createdAt: Date
    updatedAt: Date
    _count: AttestationIssuerCountAggregateOutputType | null
    _min: AttestationIssuerMinAggregateOutputType | null
    _max: AttestationIssuerMaxAggregateOutputType | null
  }

  type GetAttestationIssuerGroupByPayload<T extends AttestationIssuerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttestationIssuerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttestationIssuerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttestationIssuerGroupByOutputType[P]>
            : GetScalarType<T[P], AttestationIssuerGroupByOutputType[P]>
        }
      >
    >


  export type AttestationIssuerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    registryContractId?: boolean
    issuerAddress?: boolean
    vertical?: boolean
    accredited?: boolean
    onChainTxHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    registryContract?: boolean | DeployedContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attestationIssuer"]>

  export type AttestationIssuerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    registryContractId?: boolean
    issuerAddress?: boolean
    vertical?: boolean
    accredited?: boolean
    onChainTxHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    registryContract?: boolean | DeployedContractDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attestationIssuer"]>

  export type AttestationIssuerSelectScalar = {
    id?: boolean
    registryContractId?: boolean
    issuerAddress?: boolean
    vertical?: boolean
    accredited?: boolean
    onChainTxHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AttestationIssuerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registryContract?: boolean | DeployedContractDefaultArgs<ExtArgs>
  }
  export type AttestationIssuerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    registryContract?: boolean | DeployedContractDefaultArgs<ExtArgs>
  }

  export type $AttestationIssuerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AttestationIssuer"
    objects: {
      registryContract: Prisma.$DeployedContractPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      registryContractId: string
      issuerAddress: string
      vertical: string
      accredited: boolean
      onChainTxHash: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["attestationIssuer"]>
    composites: {}
  }

  type AttestationIssuerGetPayload<S extends boolean | null | undefined | AttestationIssuerDefaultArgs> = $Result.GetResult<Prisma.$AttestationIssuerPayload, S>

  type AttestationIssuerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AttestationIssuerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AttestationIssuerCountAggregateInputType | true
    }

  export interface AttestationIssuerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AttestationIssuer'], meta: { name: 'AttestationIssuer' } }
    /**
     * Find zero or one AttestationIssuer that matches the filter.
     * @param {AttestationIssuerFindUniqueArgs} args - Arguments to find a AttestationIssuer
     * @example
     * // Get one AttestationIssuer
     * const attestationIssuer = await prisma.attestationIssuer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttestationIssuerFindUniqueArgs>(args: SelectSubset<T, AttestationIssuerFindUniqueArgs<ExtArgs>>): Prisma__AttestationIssuerClient<$Result.GetResult<Prisma.$AttestationIssuerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AttestationIssuer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AttestationIssuerFindUniqueOrThrowArgs} args - Arguments to find a AttestationIssuer
     * @example
     * // Get one AttestationIssuer
     * const attestationIssuer = await prisma.attestationIssuer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttestationIssuerFindUniqueOrThrowArgs>(args: SelectSubset<T, AttestationIssuerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttestationIssuerClient<$Result.GetResult<Prisma.$AttestationIssuerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AttestationIssuer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttestationIssuerFindFirstArgs} args - Arguments to find a AttestationIssuer
     * @example
     * // Get one AttestationIssuer
     * const attestationIssuer = await prisma.attestationIssuer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttestationIssuerFindFirstArgs>(args?: SelectSubset<T, AttestationIssuerFindFirstArgs<ExtArgs>>): Prisma__AttestationIssuerClient<$Result.GetResult<Prisma.$AttestationIssuerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AttestationIssuer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttestationIssuerFindFirstOrThrowArgs} args - Arguments to find a AttestationIssuer
     * @example
     * // Get one AttestationIssuer
     * const attestationIssuer = await prisma.attestationIssuer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttestationIssuerFindFirstOrThrowArgs>(args?: SelectSubset<T, AttestationIssuerFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttestationIssuerClient<$Result.GetResult<Prisma.$AttestationIssuerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AttestationIssuers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttestationIssuerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AttestationIssuers
     * const attestationIssuers = await prisma.attestationIssuer.findMany()
     * 
     * // Get first 10 AttestationIssuers
     * const attestationIssuers = await prisma.attestationIssuer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attestationIssuerWithIdOnly = await prisma.attestationIssuer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttestationIssuerFindManyArgs>(args?: SelectSubset<T, AttestationIssuerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttestationIssuerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AttestationIssuer.
     * @param {AttestationIssuerCreateArgs} args - Arguments to create a AttestationIssuer.
     * @example
     * // Create one AttestationIssuer
     * const AttestationIssuer = await prisma.attestationIssuer.create({
     *   data: {
     *     // ... data to create a AttestationIssuer
     *   }
     * })
     * 
     */
    create<T extends AttestationIssuerCreateArgs>(args: SelectSubset<T, AttestationIssuerCreateArgs<ExtArgs>>): Prisma__AttestationIssuerClient<$Result.GetResult<Prisma.$AttestationIssuerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AttestationIssuers.
     * @param {AttestationIssuerCreateManyArgs} args - Arguments to create many AttestationIssuers.
     * @example
     * // Create many AttestationIssuers
     * const attestationIssuer = await prisma.attestationIssuer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttestationIssuerCreateManyArgs>(args?: SelectSubset<T, AttestationIssuerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AttestationIssuers and returns the data saved in the database.
     * @param {AttestationIssuerCreateManyAndReturnArgs} args - Arguments to create many AttestationIssuers.
     * @example
     * // Create many AttestationIssuers
     * const attestationIssuer = await prisma.attestationIssuer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AttestationIssuers and only return the `id`
     * const attestationIssuerWithIdOnly = await prisma.attestationIssuer.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttestationIssuerCreateManyAndReturnArgs>(args?: SelectSubset<T, AttestationIssuerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttestationIssuerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AttestationIssuer.
     * @param {AttestationIssuerDeleteArgs} args - Arguments to delete one AttestationIssuer.
     * @example
     * // Delete one AttestationIssuer
     * const AttestationIssuer = await prisma.attestationIssuer.delete({
     *   where: {
     *     // ... filter to delete one AttestationIssuer
     *   }
     * })
     * 
     */
    delete<T extends AttestationIssuerDeleteArgs>(args: SelectSubset<T, AttestationIssuerDeleteArgs<ExtArgs>>): Prisma__AttestationIssuerClient<$Result.GetResult<Prisma.$AttestationIssuerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AttestationIssuer.
     * @param {AttestationIssuerUpdateArgs} args - Arguments to update one AttestationIssuer.
     * @example
     * // Update one AttestationIssuer
     * const attestationIssuer = await prisma.attestationIssuer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttestationIssuerUpdateArgs>(args: SelectSubset<T, AttestationIssuerUpdateArgs<ExtArgs>>): Prisma__AttestationIssuerClient<$Result.GetResult<Prisma.$AttestationIssuerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AttestationIssuers.
     * @param {AttestationIssuerDeleteManyArgs} args - Arguments to filter AttestationIssuers to delete.
     * @example
     * // Delete a few AttestationIssuers
     * const { count } = await prisma.attestationIssuer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttestationIssuerDeleteManyArgs>(args?: SelectSubset<T, AttestationIssuerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AttestationIssuers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttestationIssuerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AttestationIssuers
     * const attestationIssuer = await prisma.attestationIssuer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttestationIssuerUpdateManyArgs>(args: SelectSubset<T, AttestationIssuerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AttestationIssuer.
     * @param {AttestationIssuerUpsertArgs} args - Arguments to update or create a AttestationIssuer.
     * @example
     * // Update or create a AttestationIssuer
     * const attestationIssuer = await prisma.attestationIssuer.upsert({
     *   create: {
     *     // ... data to create a AttestationIssuer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AttestationIssuer we want to update
     *   }
     * })
     */
    upsert<T extends AttestationIssuerUpsertArgs>(args: SelectSubset<T, AttestationIssuerUpsertArgs<ExtArgs>>): Prisma__AttestationIssuerClient<$Result.GetResult<Prisma.$AttestationIssuerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AttestationIssuers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttestationIssuerCountArgs} args - Arguments to filter AttestationIssuers to count.
     * @example
     * // Count the number of AttestationIssuers
     * const count = await prisma.attestationIssuer.count({
     *   where: {
     *     // ... the filter for the AttestationIssuers we want to count
     *   }
     * })
    **/
    count<T extends AttestationIssuerCountArgs>(
      args?: Subset<T, AttestationIssuerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttestationIssuerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AttestationIssuer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttestationIssuerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AttestationIssuerAggregateArgs>(args: Subset<T, AttestationIssuerAggregateArgs>): Prisma.PrismaPromise<GetAttestationIssuerAggregateType<T>>

    /**
     * Group by AttestationIssuer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttestationIssuerGroupByArgs} args - Group by arguments.
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
      T extends AttestationIssuerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttestationIssuerGroupByArgs['orderBy'] }
        : { orderBy?: AttestationIssuerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AttestationIssuerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttestationIssuerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AttestationIssuer model
   */
  readonly fields: AttestationIssuerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AttestationIssuer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttestationIssuerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    registryContract<T extends DeployedContractDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeployedContractDefaultArgs<ExtArgs>>): Prisma__DeployedContractClient<$Result.GetResult<Prisma.$DeployedContractPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the AttestationIssuer model
   */ 
  interface AttestationIssuerFieldRefs {
    readonly id: FieldRef<"AttestationIssuer", 'String'>
    readonly registryContractId: FieldRef<"AttestationIssuer", 'String'>
    readonly issuerAddress: FieldRef<"AttestationIssuer", 'String'>
    readonly vertical: FieldRef<"AttestationIssuer", 'String'>
    readonly accredited: FieldRef<"AttestationIssuer", 'Boolean'>
    readonly onChainTxHash: FieldRef<"AttestationIssuer", 'String'>
    readonly createdAt: FieldRef<"AttestationIssuer", 'DateTime'>
    readonly updatedAt: FieldRef<"AttestationIssuer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AttestationIssuer findUnique
   */
  export type AttestationIssuerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttestationIssuer
     */
    select?: AttestationIssuerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttestationIssuerInclude<ExtArgs> | null
    /**
     * Filter, which AttestationIssuer to fetch.
     */
    where: AttestationIssuerWhereUniqueInput
  }

  /**
   * AttestationIssuer findUniqueOrThrow
   */
  export type AttestationIssuerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttestationIssuer
     */
    select?: AttestationIssuerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttestationIssuerInclude<ExtArgs> | null
    /**
     * Filter, which AttestationIssuer to fetch.
     */
    where: AttestationIssuerWhereUniqueInput
  }

  /**
   * AttestationIssuer findFirst
   */
  export type AttestationIssuerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttestationIssuer
     */
    select?: AttestationIssuerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttestationIssuerInclude<ExtArgs> | null
    /**
     * Filter, which AttestationIssuer to fetch.
     */
    where?: AttestationIssuerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttestationIssuers to fetch.
     */
    orderBy?: AttestationIssuerOrderByWithRelationInput | AttestationIssuerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttestationIssuers.
     */
    cursor?: AttestationIssuerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttestationIssuers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttestationIssuers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttestationIssuers.
     */
    distinct?: AttestationIssuerScalarFieldEnum | AttestationIssuerScalarFieldEnum[]
  }

  /**
   * AttestationIssuer findFirstOrThrow
   */
  export type AttestationIssuerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttestationIssuer
     */
    select?: AttestationIssuerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttestationIssuerInclude<ExtArgs> | null
    /**
     * Filter, which AttestationIssuer to fetch.
     */
    where?: AttestationIssuerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttestationIssuers to fetch.
     */
    orderBy?: AttestationIssuerOrderByWithRelationInput | AttestationIssuerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttestationIssuers.
     */
    cursor?: AttestationIssuerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttestationIssuers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttestationIssuers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttestationIssuers.
     */
    distinct?: AttestationIssuerScalarFieldEnum | AttestationIssuerScalarFieldEnum[]
  }

  /**
   * AttestationIssuer findMany
   */
  export type AttestationIssuerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttestationIssuer
     */
    select?: AttestationIssuerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttestationIssuerInclude<ExtArgs> | null
    /**
     * Filter, which AttestationIssuers to fetch.
     */
    where?: AttestationIssuerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttestationIssuers to fetch.
     */
    orderBy?: AttestationIssuerOrderByWithRelationInput | AttestationIssuerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AttestationIssuers.
     */
    cursor?: AttestationIssuerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttestationIssuers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttestationIssuers.
     */
    skip?: number
    distinct?: AttestationIssuerScalarFieldEnum | AttestationIssuerScalarFieldEnum[]
  }

  /**
   * AttestationIssuer create
   */
  export type AttestationIssuerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttestationIssuer
     */
    select?: AttestationIssuerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttestationIssuerInclude<ExtArgs> | null
    /**
     * The data needed to create a AttestationIssuer.
     */
    data: XOR<AttestationIssuerCreateInput, AttestationIssuerUncheckedCreateInput>
  }

  /**
   * AttestationIssuer createMany
   */
  export type AttestationIssuerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AttestationIssuers.
     */
    data: AttestationIssuerCreateManyInput | AttestationIssuerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AttestationIssuer createManyAndReturn
   */
  export type AttestationIssuerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttestationIssuer
     */
    select?: AttestationIssuerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AttestationIssuers.
     */
    data: AttestationIssuerCreateManyInput | AttestationIssuerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttestationIssuerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AttestationIssuer update
   */
  export type AttestationIssuerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttestationIssuer
     */
    select?: AttestationIssuerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttestationIssuerInclude<ExtArgs> | null
    /**
     * The data needed to update a AttestationIssuer.
     */
    data: XOR<AttestationIssuerUpdateInput, AttestationIssuerUncheckedUpdateInput>
    /**
     * Choose, which AttestationIssuer to update.
     */
    where: AttestationIssuerWhereUniqueInput
  }

  /**
   * AttestationIssuer updateMany
   */
  export type AttestationIssuerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AttestationIssuers.
     */
    data: XOR<AttestationIssuerUpdateManyMutationInput, AttestationIssuerUncheckedUpdateManyInput>
    /**
     * Filter which AttestationIssuers to update
     */
    where?: AttestationIssuerWhereInput
  }

  /**
   * AttestationIssuer upsert
   */
  export type AttestationIssuerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttestationIssuer
     */
    select?: AttestationIssuerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttestationIssuerInclude<ExtArgs> | null
    /**
     * The filter to search for the AttestationIssuer to update in case it exists.
     */
    where: AttestationIssuerWhereUniqueInput
    /**
     * In case the AttestationIssuer found by the `where` argument doesn't exist, create a new AttestationIssuer with this data.
     */
    create: XOR<AttestationIssuerCreateInput, AttestationIssuerUncheckedCreateInput>
    /**
     * In case the AttestationIssuer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttestationIssuerUpdateInput, AttestationIssuerUncheckedUpdateInput>
  }

  /**
   * AttestationIssuer delete
   */
  export type AttestationIssuerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttestationIssuer
     */
    select?: AttestationIssuerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttestationIssuerInclude<ExtArgs> | null
    /**
     * Filter which AttestationIssuer to delete.
     */
    where: AttestationIssuerWhereUniqueInput
  }

  /**
   * AttestationIssuer deleteMany
   */
  export type AttestationIssuerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttestationIssuers to delete
     */
    where?: AttestationIssuerWhereInput
  }

  /**
   * AttestationIssuer without action
   */
  export type AttestationIssuerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttestationIssuer
     */
    select?: AttestationIssuerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttestationIssuerInclude<ExtArgs> | null
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


  export const DeployedContractScalarFieldEnum: {
    id: 'id',
    name: 'name',
    purpose: 'purpose',
    network: 'network',
    address: 'address',
    version: 'version',
    status: 'status',
    tvlUsd: 'tvlUsd',
    audited: 'audited',
    deployedAt: 'deployedAt',
    chainId: 'chainId',
    controlKind: 'controlKind',
    executionMode: 'executionMode',
    timelockAddress: 'timelockAddress',
    governorAddress: 'governorAddress',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DeployedContractScalarFieldEnum = (typeof DeployedContractScalarFieldEnum)[keyof typeof DeployedContractScalarFieldEnum]


  export const ContractUpgradeScalarFieldEnum: {
    id: 'id',
    contractId: 'contractId',
    contractName: 'contractName',
    fromVersion: 'fromVersion',
    toVersion: 'toVersion',
    upgradedAt: 'upgradedAt',
    approvedBy: 'approvedBy',
    createdAt: 'createdAt'
  };

  export type ContractUpgradeScalarFieldEnum = (typeof ContractUpgradeScalarFieldEnum)[keyof typeof ContractUpgradeScalarFieldEnum]


  export const StatusProposalScalarFieldEnum: {
    id: 'id',
    contractId: 'contractId',
    action: 'action',
    status: 'status',
    actorRef: 'actorRef',
    txHash: 'txHash',
    calldata: 'calldata',
    broadcastJobId: 'broadcastJobId',
    error: 'error',
    createdAt: 'createdAt',
    executedAt: 'executedAt'
  };

  export type StatusProposalScalarFieldEnum = (typeof StatusProposalScalarFieldEnum)[keyof typeof StatusProposalScalarFieldEnum]


  export const GovernanceDeploymentScalarFieldEnum: {
    id: 'id',
    network: 'network',
    chainId: 'chainId',
    tokenAddress: 'tokenAddress',
    timelockAddress: 'timelockAddress',
    governorAddress: 'governorAddress',
    deployedAt: 'deployedAt',
    createdAt: 'createdAt'
  };

  export type GovernanceDeploymentScalarFieldEnum = (typeof GovernanceDeploymentScalarFieldEnum)[keyof typeof GovernanceDeploymentScalarFieldEnum]


  export const AttestationIssuerScalarFieldEnum: {
    id: 'id',
    registryContractId: 'registryContractId',
    issuerAddress: 'issuerAddress',
    vertical: 'vertical',
    accredited: 'accredited',
    onChainTxHash: 'onChainTxHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AttestationIssuerScalarFieldEnum = (typeof AttestationIssuerScalarFieldEnum)[keyof typeof AttestationIssuerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'ContractStatus'
   */
  export type EnumContractStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContractStatus'>
    


  /**
   * Reference to a field of type 'ContractStatus[]'
   */
  export type ListEnumContractStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContractStatus[]'>
    


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
   * Reference to a field of type 'ControlKind'
   */
  export type EnumControlKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ControlKind'>
    


  /**
   * Reference to a field of type 'ControlKind[]'
   */
  export type ListEnumControlKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ControlKind[]'>
    


  /**
   * Reference to a field of type 'ExecutionMode'
   */
  export type EnumExecutionModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExecutionMode'>
    


  /**
   * Reference to a field of type 'ExecutionMode[]'
   */
  export type ListEnumExecutionModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExecutionMode[]'>
    


  /**
   * Reference to a field of type 'ProposalStatus'
   */
  export type EnumProposalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProposalStatus'>
    


  /**
   * Reference to a field of type 'ProposalStatus[]'
   */
  export type ListEnumProposalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProposalStatus[]'>
    


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


  export type DeployedContractWhereInput = {
    AND?: DeployedContractWhereInput | DeployedContractWhereInput[]
    OR?: DeployedContractWhereInput[]
    NOT?: DeployedContractWhereInput | DeployedContractWhereInput[]
    id?: StringFilter<"DeployedContract"> | string
    name?: StringFilter<"DeployedContract"> | string
    purpose?: StringFilter<"DeployedContract"> | string
    network?: StringFilter<"DeployedContract"> | string
    address?: StringFilter<"DeployedContract"> | string
    version?: StringFilter<"DeployedContract"> | string
    status?: EnumContractStatusFilter<"DeployedContract"> | $Enums.ContractStatus
    tvlUsd?: IntFilter<"DeployedContract"> | number
    audited?: BoolFilter<"DeployedContract"> | boolean
    deployedAt?: DateTimeFilter<"DeployedContract"> | Date | string
    chainId?: IntNullableFilter<"DeployedContract"> | number | null
    controlKind?: EnumControlKindFilter<"DeployedContract"> | $Enums.ControlKind
    executionMode?: EnumExecutionModeFilter<"DeployedContract"> | $Enums.ExecutionMode
    timelockAddress?: StringNullableFilter<"DeployedContract"> | string | null
    governorAddress?: StringNullableFilter<"DeployedContract"> | string | null
    createdAt?: DateTimeFilter<"DeployedContract"> | Date | string
    updatedAt?: DateTimeFilter<"DeployedContract"> | Date | string
    upgrades?: ContractUpgradeListRelationFilter
    proposals?: StatusProposalListRelationFilter
    attestationIssuers?: AttestationIssuerListRelationFilter
  }

  export type DeployedContractOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    purpose?: SortOrder
    network?: SortOrder
    address?: SortOrder
    version?: SortOrder
    status?: SortOrder
    tvlUsd?: SortOrder
    audited?: SortOrder
    deployedAt?: SortOrder
    chainId?: SortOrderInput | SortOrder
    controlKind?: SortOrder
    executionMode?: SortOrder
    timelockAddress?: SortOrderInput | SortOrder
    governorAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    upgrades?: ContractUpgradeOrderByRelationAggregateInput
    proposals?: StatusProposalOrderByRelationAggregateInput
    attestationIssuers?: AttestationIssuerOrderByRelationAggregateInput
  }

  export type DeployedContractWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DeployedContractWhereInput | DeployedContractWhereInput[]
    OR?: DeployedContractWhereInput[]
    NOT?: DeployedContractWhereInput | DeployedContractWhereInput[]
    name?: StringFilter<"DeployedContract"> | string
    purpose?: StringFilter<"DeployedContract"> | string
    network?: StringFilter<"DeployedContract"> | string
    address?: StringFilter<"DeployedContract"> | string
    version?: StringFilter<"DeployedContract"> | string
    status?: EnumContractStatusFilter<"DeployedContract"> | $Enums.ContractStatus
    tvlUsd?: IntFilter<"DeployedContract"> | number
    audited?: BoolFilter<"DeployedContract"> | boolean
    deployedAt?: DateTimeFilter<"DeployedContract"> | Date | string
    chainId?: IntNullableFilter<"DeployedContract"> | number | null
    controlKind?: EnumControlKindFilter<"DeployedContract"> | $Enums.ControlKind
    executionMode?: EnumExecutionModeFilter<"DeployedContract"> | $Enums.ExecutionMode
    timelockAddress?: StringNullableFilter<"DeployedContract"> | string | null
    governorAddress?: StringNullableFilter<"DeployedContract"> | string | null
    createdAt?: DateTimeFilter<"DeployedContract"> | Date | string
    updatedAt?: DateTimeFilter<"DeployedContract"> | Date | string
    upgrades?: ContractUpgradeListRelationFilter
    proposals?: StatusProposalListRelationFilter
    attestationIssuers?: AttestationIssuerListRelationFilter
  }, "id">

  export type DeployedContractOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    purpose?: SortOrder
    network?: SortOrder
    address?: SortOrder
    version?: SortOrder
    status?: SortOrder
    tvlUsd?: SortOrder
    audited?: SortOrder
    deployedAt?: SortOrder
    chainId?: SortOrderInput | SortOrder
    controlKind?: SortOrder
    executionMode?: SortOrder
    timelockAddress?: SortOrderInput | SortOrder
    governorAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DeployedContractCountOrderByAggregateInput
    _avg?: DeployedContractAvgOrderByAggregateInput
    _max?: DeployedContractMaxOrderByAggregateInput
    _min?: DeployedContractMinOrderByAggregateInput
    _sum?: DeployedContractSumOrderByAggregateInput
  }

  export type DeployedContractScalarWhereWithAggregatesInput = {
    AND?: DeployedContractScalarWhereWithAggregatesInput | DeployedContractScalarWhereWithAggregatesInput[]
    OR?: DeployedContractScalarWhereWithAggregatesInput[]
    NOT?: DeployedContractScalarWhereWithAggregatesInput | DeployedContractScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DeployedContract"> | string
    name?: StringWithAggregatesFilter<"DeployedContract"> | string
    purpose?: StringWithAggregatesFilter<"DeployedContract"> | string
    network?: StringWithAggregatesFilter<"DeployedContract"> | string
    address?: StringWithAggregatesFilter<"DeployedContract"> | string
    version?: StringWithAggregatesFilter<"DeployedContract"> | string
    status?: EnumContractStatusWithAggregatesFilter<"DeployedContract"> | $Enums.ContractStatus
    tvlUsd?: IntWithAggregatesFilter<"DeployedContract"> | number
    audited?: BoolWithAggregatesFilter<"DeployedContract"> | boolean
    deployedAt?: DateTimeWithAggregatesFilter<"DeployedContract"> | Date | string
    chainId?: IntNullableWithAggregatesFilter<"DeployedContract"> | number | null
    controlKind?: EnumControlKindWithAggregatesFilter<"DeployedContract"> | $Enums.ControlKind
    executionMode?: EnumExecutionModeWithAggregatesFilter<"DeployedContract"> | $Enums.ExecutionMode
    timelockAddress?: StringNullableWithAggregatesFilter<"DeployedContract"> | string | null
    governorAddress?: StringNullableWithAggregatesFilter<"DeployedContract"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DeployedContract"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DeployedContract"> | Date | string
  }

  export type ContractUpgradeWhereInput = {
    AND?: ContractUpgradeWhereInput | ContractUpgradeWhereInput[]
    OR?: ContractUpgradeWhereInput[]
    NOT?: ContractUpgradeWhereInput | ContractUpgradeWhereInput[]
    id?: StringFilter<"ContractUpgrade"> | string
    contractId?: StringNullableFilter<"ContractUpgrade"> | string | null
    contractName?: StringFilter<"ContractUpgrade"> | string
    fromVersion?: StringFilter<"ContractUpgrade"> | string
    toVersion?: StringFilter<"ContractUpgrade"> | string
    upgradedAt?: DateTimeFilter<"ContractUpgrade"> | Date | string
    approvedBy?: StringFilter<"ContractUpgrade"> | string
    createdAt?: DateTimeFilter<"ContractUpgrade"> | Date | string
    contract?: XOR<DeployedContractNullableRelationFilter, DeployedContractWhereInput> | null
  }

  export type ContractUpgradeOrderByWithRelationInput = {
    id?: SortOrder
    contractId?: SortOrderInput | SortOrder
    contractName?: SortOrder
    fromVersion?: SortOrder
    toVersion?: SortOrder
    upgradedAt?: SortOrder
    approvedBy?: SortOrder
    createdAt?: SortOrder
    contract?: DeployedContractOrderByWithRelationInput
  }

  export type ContractUpgradeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContractUpgradeWhereInput | ContractUpgradeWhereInput[]
    OR?: ContractUpgradeWhereInput[]
    NOT?: ContractUpgradeWhereInput | ContractUpgradeWhereInput[]
    contractId?: StringNullableFilter<"ContractUpgrade"> | string | null
    contractName?: StringFilter<"ContractUpgrade"> | string
    fromVersion?: StringFilter<"ContractUpgrade"> | string
    toVersion?: StringFilter<"ContractUpgrade"> | string
    upgradedAt?: DateTimeFilter<"ContractUpgrade"> | Date | string
    approvedBy?: StringFilter<"ContractUpgrade"> | string
    createdAt?: DateTimeFilter<"ContractUpgrade"> | Date | string
    contract?: XOR<DeployedContractNullableRelationFilter, DeployedContractWhereInput> | null
  }, "id">

  export type ContractUpgradeOrderByWithAggregationInput = {
    id?: SortOrder
    contractId?: SortOrderInput | SortOrder
    contractName?: SortOrder
    fromVersion?: SortOrder
    toVersion?: SortOrder
    upgradedAt?: SortOrder
    approvedBy?: SortOrder
    createdAt?: SortOrder
    _count?: ContractUpgradeCountOrderByAggregateInput
    _max?: ContractUpgradeMaxOrderByAggregateInput
    _min?: ContractUpgradeMinOrderByAggregateInput
  }

  export type ContractUpgradeScalarWhereWithAggregatesInput = {
    AND?: ContractUpgradeScalarWhereWithAggregatesInput | ContractUpgradeScalarWhereWithAggregatesInput[]
    OR?: ContractUpgradeScalarWhereWithAggregatesInput[]
    NOT?: ContractUpgradeScalarWhereWithAggregatesInput | ContractUpgradeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ContractUpgrade"> | string
    contractId?: StringNullableWithAggregatesFilter<"ContractUpgrade"> | string | null
    contractName?: StringWithAggregatesFilter<"ContractUpgrade"> | string
    fromVersion?: StringWithAggregatesFilter<"ContractUpgrade"> | string
    toVersion?: StringWithAggregatesFilter<"ContractUpgrade"> | string
    upgradedAt?: DateTimeWithAggregatesFilter<"ContractUpgrade"> | Date | string
    approvedBy?: StringWithAggregatesFilter<"ContractUpgrade"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ContractUpgrade"> | Date | string
  }

  export type StatusProposalWhereInput = {
    AND?: StatusProposalWhereInput | StatusProposalWhereInput[]
    OR?: StatusProposalWhereInput[]
    NOT?: StatusProposalWhereInput | StatusProposalWhereInput[]
    id?: StringFilter<"StatusProposal"> | string
    contractId?: StringFilter<"StatusProposal"> | string
    action?: StringFilter<"StatusProposal"> | string
    status?: EnumProposalStatusFilter<"StatusProposal"> | $Enums.ProposalStatus
    actorRef?: StringNullableFilter<"StatusProposal"> | string | null
    txHash?: StringNullableFilter<"StatusProposal"> | string | null
    calldata?: StringNullableFilter<"StatusProposal"> | string | null
    broadcastJobId?: StringNullableFilter<"StatusProposal"> | string | null
    error?: StringNullableFilter<"StatusProposal"> | string | null
    createdAt?: DateTimeFilter<"StatusProposal"> | Date | string
    executedAt?: DateTimeNullableFilter<"StatusProposal"> | Date | string | null
    contract?: XOR<DeployedContractRelationFilter, DeployedContractWhereInput>
  }

  export type StatusProposalOrderByWithRelationInput = {
    id?: SortOrder
    contractId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    actorRef?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    calldata?: SortOrderInput | SortOrder
    broadcastJobId?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    executedAt?: SortOrderInput | SortOrder
    contract?: DeployedContractOrderByWithRelationInput
  }

  export type StatusProposalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StatusProposalWhereInput | StatusProposalWhereInput[]
    OR?: StatusProposalWhereInput[]
    NOT?: StatusProposalWhereInput | StatusProposalWhereInput[]
    contractId?: StringFilter<"StatusProposal"> | string
    action?: StringFilter<"StatusProposal"> | string
    status?: EnumProposalStatusFilter<"StatusProposal"> | $Enums.ProposalStatus
    actorRef?: StringNullableFilter<"StatusProposal"> | string | null
    txHash?: StringNullableFilter<"StatusProposal"> | string | null
    calldata?: StringNullableFilter<"StatusProposal"> | string | null
    broadcastJobId?: StringNullableFilter<"StatusProposal"> | string | null
    error?: StringNullableFilter<"StatusProposal"> | string | null
    createdAt?: DateTimeFilter<"StatusProposal"> | Date | string
    executedAt?: DateTimeNullableFilter<"StatusProposal"> | Date | string | null
    contract?: XOR<DeployedContractRelationFilter, DeployedContractWhereInput>
  }, "id">

  export type StatusProposalOrderByWithAggregationInput = {
    id?: SortOrder
    contractId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    actorRef?: SortOrderInput | SortOrder
    txHash?: SortOrderInput | SortOrder
    calldata?: SortOrderInput | SortOrder
    broadcastJobId?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    executedAt?: SortOrderInput | SortOrder
    _count?: StatusProposalCountOrderByAggregateInput
    _max?: StatusProposalMaxOrderByAggregateInput
    _min?: StatusProposalMinOrderByAggregateInput
  }

  export type StatusProposalScalarWhereWithAggregatesInput = {
    AND?: StatusProposalScalarWhereWithAggregatesInput | StatusProposalScalarWhereWithAggregatesInput[]
    OR?: StatusProposalScalarWhereWithAggregatesInput[]
    NOT?: StatusProposalScalarWhereWithAggregatesInput | StatusProposalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StatusProposal"> | string
    contractId?: StringWithAggregatesFilter<"StatusProposal"> | string
    action?: StringWithAggregatesFilter<"StatusProposal"> | string
    status?: EnumProposalStatusWithAggregatesFilter<"StatusProposal"> | $Enums.ProposalStatus
    actorRef?: StringNullableWithAggregatesFilter<"StatusProposal"> | string | null
    txHash?: StringNullableWithAggregatesFilter<"StatusProposal"> | string | null
    calldata?: StringNullableWithAggregatesFilter<"StatusProposal"> | string | null
    broadcastJobId?: StringNullableWithAggregatesFilter<"StatusProposal"> | string | null
    error?: StringNullableWithAggregatesFilter<"StatusProposal"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StatusProposal"> | Date | string
    executedAt?: DateTimeNullableWithAggregatesFilter<"StatusProposal"> | Date | string | null
  }

  export type GovernanceDeploymentWhereInput = {
    AND?: GovernanceDeploymentWhereInput | GovernanceDeploymentWhereInput[]
    OR?: GovernanceDeploymentWhereInput[]
    NOT?: GovernanceDeploymentWhereInput | GovernanceDeploymentWhereInput[]
    id?: StringFilter<"GovernanceDeployment"> | string
    network?: StringFilter<"GovernanceDeployment"> | string
    chainId?: IntFilter<"GovernanceDeployment"> | number
    tokenAddress?: StringFilter<"GovernanceDeployment"> | string
    timelockAddress?: StringFilter<"GovernanceDeployment"> | string
    governorAddress?: StringFilter<"GovernanceDeployment"> | string
    deployedAt?: DateTimeFilter<"GovernanceDeployment"> | Date | string
    createdAt?: DateTimeFilter<"GovernanceDeployment"> | Date | string
  }

  export type GovernanceDeploymentOrderByWithRelationInput = {
    id?: SortOrder
    network?: SortOrder
    chainId?: SortOrder
    tokenAddress?: SortOrder
    timelockAddress?: SortOrder
    governorAddress?: SortOrder
    deployedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type GovernanceDeploymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GovernanceDeploymentWhereInput | GovernanceDeploymentWhereInput[]
    OR?: GovernanceDeploymentWhereInput[]
    NOT?: GovernanceDeploymentWhereInput | GovernanceDeploymentWhereInput[]
    network?: StringFilter<"GovernanceDeployment"> | string
    chainId?: IntFilter<"GovernanceDeployment"> | number
    tokenAddress?: StringFilter<"GovernanceDeployment"> | string
    timelockAddress?: StringFilter<"GovernanceDeployment"> | string
    governorAddress?: StringFilter<"GovernanceDeployment"> | string
    deployedAt?: DateTimeFilter<"GovernanceDeployment"> | Date | string
    createdAt?: DateTimeFilter<"GovernanceDeployment"> | Date | string
  }, "id">

  export type GovernanceDeploymentOrderByWithAggregationInput = {
    id?: SortOrder
    network?: SortOrder
    chainId?: SortOrder
    tokenAddress?: SortOrder
    timelockAddress?: SortOrder
    governorAddress?: SortOrder
    deployedAt?: SortOrder
    createdAt?: SortOrder
    _count?: GovernanceDeploymentCountOrderByAggregateInput
    _avg?: GovernanceDeploymentAvgOrderByAggregateInput
    _max?: GovernanceDeploymentMaxOrderByAggregateInput
    _min?: GovernanceDeploymentMinOrderByAggregateInput
    _sum?: GovernanceDeploymentSumOrderByAggregateInput
  }

  export type GovernanceDeploymentScalarWhereWithAggregatesInput = {
    AND?: GovernanceDeploymentScalarWhereWithAggregatesInput | GovernanceDeploymentScalarWhereWithAggregatesInput[]
    OR?: GovernanceDeploymentScalarWhereWithAggregatesInput[]
    NOT?: GovernanceDeploymentScalarWhereWithAggregatesInput | GovernanceDeploymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GovernanceDeployment"> | string
    network?: StringWithAggregatesFilter<"GovernanceDeployment"> | string
    chainId?: IntWithAggregatesFilter<"GovernanceDeployment"> | number
    tokenAddress?: StringWithAggregatesFilter<"GovernanceDeployment"> | string
    timelockAddress?: StringWithAggregatesFilter<"GovernanceDeployment"> | string
    governorAddress?: StringWithAggregatesFilter<"GovernanceDeployment"> | string
    deployedAt?: DateTimeWithAggregatesFilter<"GovernanceDeployment"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"GovernanceDeployment"> | Date | string
  }

  export type AttestationIssuerWhereInput = {
    AND?: AttestationIssuerWhereInput | AttestationIssuerWhereInput[]
    OR?: AttestationIssuerWhereInput[]
    NOT?: AttestationIssuerWhereInput | AttestationIssuerWhereInput[]
    id?: StringFilter<"AttestationIssuer"> | string
    registryContractId?: StringFilter<"AttestationIssuer"> | string
    issuerAddress?: StringFilter<"AttestationIssuer"> | string
    vertical?: StringFilter<"AttestationIssuer"> | string
    accredited?: BoolFilter<"AttestationIssuer"> | boolean
    onChainTxHash?: StringNullableFilter<"AttestationIssuer"> | string | null
    createdAt?: DateTimeFilter<"AttestationIssuer"> | Date | string
    updatedAt?: DateTimeFilter<"AttestationIssuer"> | Date | string
    registryContract?: XOR<DeployedContractRelationFilter, DeployedContractWhereInput>
  }

  export type AttestationIssuerOrderByWithRelationInput = {
    id?: SortOrder
    registryContractId?: SortOrder
    issuerAddress?: SortOrder
    vertical?: SortOrder
    accredited?: SortOrder
    onChainTxHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    registryContract?: DeployedContractOrderByWithRelationInput
  }

  export type AttestationIssuerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    registryContractId_issuerAddress?: AttestationIssuerRegistryContractIdIssuerAddressCompoundUniqueInput
    AND?: AttestationIssuerWhereInput | AttestationIssuerWhereInput[]
    OR?: AttestationIssuerWhereInput[]
    NOT?: AttestationIssuerWhereInput | AttestationIssuerWhereInput[]
    registryContractId?: StringFilter<"AttestationIssuer"> | string
    issuerAddress?: StringFilter<"AttestationIssuer"> | string
    vertical?: StringFilter<"AttestationIssuer"> | string
    accredited?: BoolFilter<"AttestationIssuer"> | boolean
    onChainTxHash?: StringNullableFilter<"AttestationIssuer"> | string | null
    createdAt?: DateTimeFilter<"AttestationIssuer"> | Date | string
    updatedAt?: DateTimeFilter<"AttestationIssuer"> | Date | string
    registryContract?: XOR<DeployedContractRelationFilter, DeployedContractWhereInput>
  }, "id" | "registryContractId_issuerAddress">

  export type AttestationIssuerOrderByWithAggregationInput = {
    id?: SortOrder
    registryContractId?: SortOrder
    issuerAddress?: SortOrder
    vertical?: SortOrder
    accredited?: SortOrder
    onChainTxHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AttestationIssuerCountOrderByAggregateInput
    _max?: AttestationIssuerMaxOrderByAggregateInput
    _min?: AttestationIssuerMinOrderByAggregateInput
  }

  export type AttestationIssuerScalarWhereWithAggregatesInput = {
    AND?: AttestationIssuerScalarWhereWithAggregatesInput | AttestationIssuerScalarWhereWithAggregatesInput[]
    OR?: AttestationIssuerScalarWhereWithAggregatesInput[]
    NOT?: AttestationIssuerScalarWhereWithAggregatesInput | AttestationIssuerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AttestationIssuer"> | string
    registryContractId?: StringWithAggregatesFilter<"AttestationIssuer"> | string
    issuerAddress?: StringWithAggregatesFilter<"AttestationIssuer"> | string
    vertical?: StringWithAggregatesFilter<"AttestationIssuer"> | string
    accredited?: BoolWithAggregatesFilter<"AttestationIssuer"> | boolean
    onChainTxHash?: StringNullableWithAggregatesFilter<"AttestationIssuer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AttestationIssuer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AttestationIssuer"> | Date | string
  }

  export type DeployedContractCreateInput = {
    id: string
    name: string
    purpose: string
    network: string
    address: string
    version: string
    status?: $Enums.ContractStatus
    tvlUsd?: number
    audited?: boolean
    deployedAt: Date | string
    chainId?: number | null
    controlKind?: $Enums.ControlKind
    executionMode?: $Enums.ExecutionMode
    timelockAddress?: string | null
    governorAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    upgrades?: ContractUpgradeCreateNestedManyWithoutContractInput
    proposals?: StatusProposalCreateNestedManyWithoutContractInput
    attestationIssuers?: AttestationIssuerCreateNestedManyWithoutRegistryContractInput
  }

  export type DeployedContractUncheckedCreateInput = {
    id: string
    name: string
    purpose: string
    network: string
    address: string
    version: string
    status?: $Enums.ContractStatus
    tvlUsd?: number
    audited?: boolean
    deployedAt: Date | string
    chainId?: number | null
    controlKind?: $Enums.ControlKind
    executionMode?: $Enums.ExecutionMode
    timelockAddress?: string | null
    governorAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    upgrades?: ContractUpgradeUncheckedCreateNestedManyWithoutContractInput
    proposals?: StatusProposalUncheckedCreateNestedManyWithoutContractInput
    attestationIssuers?: AttestationIssuerUncheckedCreateNestedManyWithoutRegistryContractInput
  }

  export type DeployedContractUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    tvlUsd?: IntFieldUpdateOperationsInput | number
    audited?: BoolFieldUpdateOperationsInput | boolean
    deployedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainId?: NullableIntFieldUpdateOperationsInput | number | null
    controlKind?: EnumControlKindFieldUpdateOperationsInput | $Enums.ControlKind
    executionMode?: EnumExecutionModeFieldUpdateOperationsInput | $Enums.ExecutionMode
    timelockAddress?: NullableStringFieldUpdateOperationsInput | string | null
    governorAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    upgrades?: ContractUpgradeUpdateManyWithoutContractNestedInput
    proposals?: StatusProposalUpdateManyWithoutContractNestedInput
    attestationIssuers?: AttestationIssuerUpdateManyWithoutRegistryContractNestedInput
  }

  export type DeployedContractUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    tvlUsd?: IntFieldUpdateOperationsInput | number
    audited?: BoolFieldUpdateOperationsInput | boolean
    deployedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainId?: NullableIntFieldUpdateOperationsInput | number | null
    controlKind?: EnumControlKindFieldUpdateOperationsInput | $Enums.ControlKind
    executionMode?: EnumExecutionModeFieldUpdateOperationsInput | $Enums.ExecutionMode
    timelockAddress?: NullableStringFieldUpdateOperationsInput | string | null
    governorAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    upgrades?: ContractUpgradeUncheckedUpdateManyWithoutContractNestedInput
    proposals?: StatusProposalUncheckedUpdateManyWithoutContractNestedInput
    attestationIssuers?: AttestationIssuerUncheckedUpdateManyWithoutRegistryContractNestedInput
  }

  export type DeployedContractCreateManyInput = {
    id: string
    name: string
    purpose: string
    network: string
    address: string
    version: string
    status?: $Enums.ContractStatus
    tvlUsd?: number
    audited?: boolean
    deployedAt: Date | string
    chainId?: number | null
    controlKind?: $Enums.ControlKind
    executionMode?: $Enums.ExecutionMode
    timelockAddress?: string | null
    governorAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeployedContractUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    tvlUsd?: IntFieldUpdateOperationsInput | number
    audited?: BoolFieldUpdateOperationsInput | boolean
    deployedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainId?: NullableIntFieldUpdateOperationsInput | number | null
    controlKind?: EnumControlKindFieldUpdateOperationsInput | $Enums.ControlKind
    executionMode?: EnumExecutionModeFieldUpdateOperationsInput | $Enums.ExecutionMode
    timelockAddress?: NullableStringFieldUpdateOperationsInput | string | null
    governorAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeployedContractUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    tvlUsd?: IntFieldUpdateOperationsInput | number
    audited?: BoolFieldUpdateOperationsInput | boolean
    deployedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainId?: NullableIntFieldUpdateOperationsInput | number | null
    controlKind?: EnumControlKindFieldUpdateOperationsInput | $Enums.ControlKind
    executionMode?: EnumExecutionModeFieldUpdateOperationsInput | $Enums.ExecutionMode
    timelockAddress?: NullableStringFieldUpdateOperationsInput | string | null
    governorAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractUpgradeCreateInput = {
    id: string
    contractName: string
    fromVersion: string
    toVersion: string
    upgradedAt: Date | string
    approvedBy: string
    createdAt?: Date | string
    contract?: DeployedContractCreateNestedOneWithoutUpgradesInput
  }

  export type ContractUpgradeUncheckedCreateInput = {
    id: string
    contractId?: string | null
    contractName: string
    fromVersion: string
    toVersion: string
    upgradedAt: Date | string
    approvedBy: string
    createdAt?: Date | string
  }

  export type ContractUpgradeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractName?: StringFieldUpdateOperationsInput | string
    fromVersion?: StringFieldUpdateOperationsInput | string
    toVersion?: StringFieldUpdateOperationsInput | string
    upgradedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contract?: DeployedContractUpdateOneWithoutUpgradesNestedInput
  }

  export type ContractUpgradeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableStringFieldUpdateOperationsInput | string | null
    contractName?: StringFieldUpdateOperationsInput | string
    fromVersion?: StringFieldUpdateOperationsInput | string
    toVersion?: StringFieldUpdateOperationsInput | string
    upgradedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractUpgradeCreateManyInput = {
    id: string
    contractId?: string | null
    contractName: string
    fromVersion: string
    toVersion: string
    upgradedAt: Date | string
    approvedBy: string
    createdAt?: Date | string
  }

  export type ContractUpgradeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractName?: StringFieldUpdateOperationsInput | string
    fromVersion?: StringFieldUpdateOperationsInput | string
    toVersion?: StringFieldUpdateOperationsInput | string
    upgradedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractUpgradeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: NullableStringFieldUpdateOperationsInput | string | null
    contractName?: StringFieldUpdateOperationsInput | string
    fromVersion?: StringFieldUpdateOperationsInput | string
    toVersion?: StringFieldUpdateOperationsInput | string
    upgradedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatusProposalCreateInput = {
    id: string
    action: string
    status?: $Enums.ProposalStatus
    actorRef?: string | null
    txHash?: string | null
    calldata?: string | null
    broadcastJobId?: string | null
    error?: string | null
    createdAt?: Date | string
    executedAt?: Date | string | null
    contract: DeployedContractCreateNestedOneWithoutProposalsInput
  }

  export type StatusProposalUncheckedCreateInput = {
    id: string
    contractId: string
    action: string
    status?: $Enums.ProposalStatus
    actorRef?: string | null
    txHash?: string | null
    calldata?: string | null
    broadcastJobId?: string | null
    error?: string | null
    createdAt?: Date | string
    executedAt?: Date | string | null
  }

  export type StatusProposalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    actorRef?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    calldata?: NullableStringFieldUpdateOperationsInput | string | null
    broadcastJobId?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    contract?: DeployedContractUpdateOneRequiredWithoutProposalsNestedInput
  }

  export type StatusProposalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    actorRef?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    calldata?: NullableStringFieldUpdateOperationsInput | string | null
    broadcastJobId?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StatusProposalCreateManyInput = {
    id: string
    contractId: string
    action: string
    status?: $Enums.ProposalStatus
    actorRef?: string | null
    txHash?: string | null
    calldata?: string | null
    broadcastJobId?: string | null
    error?: string | null
    createdAt?: Date | string
    executedAt?: Date | string | null
  }

  export type StatusProposalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    actorRef?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    calldata?: NullableStringFieldUpdateOperationsInput | string | null
    broadcastJobId?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StatusProposalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    actorRef?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    calldata?: NullableStringFieldUpdateOperationsInput | string | null
    broadcastJobId?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GovernanceDeploymentCreateInput = {
    id: string
    network: string
    chainId: number
    tokenAddress: string
    timelockAddress: string
    governorAddress: string
    deployedAt: Date | string
    createdAt?: Date | string
  }

  export type GovernanceDeploymentUncheckedCreateInput = {
    id: string
    network: string
    chainId: number
    tokenAddress: string
    timelockAddress: string
    governorAddress: string
    deployedAt: Date | string
    createdAt?: Date | string
  }

  export type GovernanceDeploymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    tokenAddress?: StringFieldUpdateOperationsInput | string
    timelockAddress?: StringFieldUpdateOperationsInput | string
    governorAddress?: StringFieldUpdateOperationsInput | string
    deployedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GovernanceDeploymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    tokenAddress?: StringFieldUpdateOperationsInput | string
    timelockAddress?: StringFieldUpdateOperationsInput | string
    governorAddress?: StringFieldUpdateOperationsInput | string
    deployedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GovernanceDeploymentCreateManyInput = {
    id: string
    network: string
    chainId: number
    tokenAddress: string
    timelockAddress: string
    governorAddress: string
    deployedAt: Date | string
    createdAt?: Date | string
  }

  export type GovernanceDeploymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    tokenAddress?: StringFieldUpdateOperationsInput | string
    timelockAddress?: StringFieldUpdateOperationsInput | string
    governorAddress?: StringFieldUpdateOperationsInput | string
    deployedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GovernanceDeploymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    chainId?: IntFieldUpdateOperationsInput | number
    tokenAddress?: StringFieldUpdateOperationsInput | string
    timelockAddress?: StringFieldUpdateOperationsInput | string
    governorAddress?: StringFieldUpdateOperationsInput | string
    deployedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttestationIssuerCreateInput = {
    id: string
    issuerAddress: string
    vertical: string
    accredited?: boolean
    onChainTxHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    registryContract: DeployedContractCreateNestedOneWithoutAttestationIssuersInput
  }

  export type AttestationIssuerUncheckedCreateInput = {
    id: string
    registryContractId: string
    issuerAddress: string
    vertical: string
    accredited?: boolean
    onChainTxHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttestationIssuerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    issuerAddress?: StringFieldUpdateOperationsInput | string
    vertical?: StringFieldUpdateOperationsInput | string
    accredited?: BoolFieldUpdateOperationsInput | boolean
    onChainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    registryContract?: DeployedContractUpdateOneRequiredWithoutAttestationIssuersNestedInput
  }

  export type AttestationIssuerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    registryContractId?: StringFieldUpdateOperationsInput | string
    issuerAddress?: StringFieldUpdateOperationsInput | string
    vertical?: StringFieldUpdateOperationsInput | string
    accredited?: BoolFieldUpdateOperationsInput | boolean
    onChainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttestationIssuerCreateManyInput = {
    id: string
    registryContractId: string
    issuerAddress: string
    vertical: string
    accredited?: boolean
    onChainTxHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttestationIssuerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    issuerAddress?: StringFieldUpdateOperationsInput | string
    vertical?: StringFieldUpdateOperationsInput | string
    accredited?: BoolFieldUpdateOperationsInput | boolean
    onChainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttestationIssuerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    registryContractId?: StringFieldUpdateOperationsInput | string
    issuerAddress?: StringFieldUpdateOperationsInput | string
    vertical?: StringFieldUpdateOperationsInput | string
    accredited?: BoolFieldUpdateOperationsInput | boolean
    onChainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumContractStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ContractStatus | EnumContractStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumContractStatusFilter<$PrismaModel> | $Enums.ContractStatus
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

  export type EnumControlKindFilter<$PrismaModel = never> = {
    equals?: $Enums.ControlKind | EnumControlKindFieldRefInput<$PrismaModel>
    in?: $Enums.ControlKind[] | ListEnumControlKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.ControlKind[] | ListEnumControlKindFieldRefInput<$PrismaModel>
    not?: NestedEnumControlKindFilter<$PrismaModel> | $Enums.ControlKind
  }

  export type EnumExecutionModeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionMode | EnumExecutionModeFieldRefInput<$PrismaModel>
    in?: $Enums.ExecutionMode[] | ListEnumExecutionModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExecutionMode[] | ListEnumExecutionModeFieldRefInput<$PrismaModel>
    not?: NestedEnumExecutionModeFilter<$PrismaModel> | $Enums.ExecutionMode
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

  export type ContractUpgradeListRelationFilter = {
    every?: ContractUpgradeWhereInput
    some?: ContractUpgradeWhereInput
    none?: ContractUpgradeWhereInput
  }

  export type StatusProposalListRelationFilter = {
    every?: StatusProposalWhereInput
    some?: StatusProposalWhereInput
    none?: StatusProposalWhereInput
  }

  export type AttestationIssuerListRelationFilter = {
    every?: AttestationIssuerWhereInput
    some?: AttestationIssuerWhereInput
    none?: AttestationIssuerWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ContractUpgradeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StatusProposalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AttestationIssuerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeployedContractCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    purpose?: SortOrder
    network?: SortOrder
    address?: SortOrder
    version?: SortOrder
    status?: SortOrder
    tvlUsd?: SortOrder
    audited?: SortOrder
    deployedAt?: SortOrder
    chainId?: SortOrder
    controlKind?: SortOrder
    executionMode?: SortOrder
    timelockAddress?: SortOrder
    governorAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeployedContractAvgOrderByAggregateInput = {
    tvlUsd?: SortOrder
    chainId?: SortOrder
  }

  export type DeployedContractMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    purpose?: SortOrder
    network?: SortOrder
    address?: SortOrder
    version?: SortOrder
    status?: SortOrder
    tvlUsd?: SortOrder
    audited?: SortOrder
    deployedAt?: SortOrder
    chainId?: SortOrder
    controlKind?: SortOrder
    executionMode?: SortOrder
    timelockAddress?: SortOrder
    governorAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeployedContractMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    purpose?: SortOrder
    network?: SortOrder
    address?: SortOrder
    version?: SortOrder
    status?: SortOrder
    tvlUsd?: SortOrder
    audited?: SortOrder
    deployedAt?: SortOrder
    chainId?: SortOrder
    controlKind?: SortOrder
    executionMode?: SortOrder
    timelockAddress?: SortOrder
    governorAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeployedContractSumOrderByAggregateInput = {
    tvlUsd?: SortOrder
    chainId?: SortOrder
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

  export type EnumContractStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContractStatus | EnumContractStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumContractStatusWithAggregatesFilter<$PrismaModel> | $Enums.ContractStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContractStatusFilter<$PrismaModel>
    _max?: NestedEnumContractStatusFilter<$PrismaModel>
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

  export type EnumControlKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ControlKind | EnumControlKindFieldRefInput<$PrismaModel>
    in?: $Enums.ControlKind[] | ListEnumControlKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.ControlKind[] | ListEnumControlKindFieldRefInput<$PrismaModel>
    not?: NestedEnumControlKindWithAggregatesFilter<$PrismaModel> | $Enums.ControlKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumControlKindFilter<$PrismaModel>
    _max?: NestedEnumControlKindFilter<$PrismaModel>
  }

  export type EnumExecutionModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionMode | EnumExecutionModeFieldRefInput<$PrismaModel>
    in?: $Enums.ExecutionMode[] | ListEnumExecutionModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExecutionMode[] | ListEnumExecutionModeFieldRefInput<$PrismaModel>
    not?: NestedEnumExecutionModeWithAggregatesFilter<$PrismaModel> | $Enums.ExecutionMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExecutionModeFilter<$PrismaModel>
    _max?: NestedEnumExecutionModeFilter<$PrismaModel>
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

  export type DeployedContractNullableRelationFilter = {
    is?: DeployedContractWhereInput | null
    isNot?: DeployedContractWhereInput | null
  }

  export type ContractUpgradeCountOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    contractName?: SortOrder
    fromVersion?: SortOrder
    toVersion?: SortOrder
    upgradedAt?: SortOrder
    approvedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ContractUpgradeMaxOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    contractName?: SortOrder
    fromVersion?: SortOrder
    toVersion?: SortOrder
    upgradedAt?: SortOrder
    approvedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type ContractUpgradeMinOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    contractName?: SortOrder
    fromVersion?: SortOrder
    toVersion?: SortOrder
    upgradedAt?: SortOrder
    approvedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumProposalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProposalStatus | EnumProposalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProposalStatus[] | ListEnumProposalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProposalStatus[] | ListEnumProposalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProposalStatusFilter<$PrismaModel> | $Enums.ProposalStatus
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

  export type DeployedContractRelationFilter = {
    is?: DeployedContractWhereInput
    isNot?: DeployedContractWhereInput
  }

  export type StatusProposalCountOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    actorRef?: SortOrder
    txHash?: SortOrder
    calldata?: SortOrder
    broadcastJobId?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    executedAt?: SortOrder
  }

  export type StatusProposalMaxOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    actorRef?: SortOrder
    txHash?: SortOrder
    calldata?: SortOrder
    broadcastJobId?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    executedAt?: SortOrder
  }

  export type StatusProposalMinOrderByAggregateInput = {
    id?: SortOrder
    contractId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    actorRef?: SortOrder
    txHash?: SortOrder
    calldata?: SortOrder
    broadcastJobId?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    executedAt?: SortOrder
  }

  export type EnumProposalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProposalStatus | EnumProposalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProposalStatus[] | ListEnumProposalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProposalStatus[] | ListEnumProposalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProposalStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProposalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProposalStatusFilter<$PrismaModel>
    _max?: NestedEnumProposalStatusFilter<$PrismaModel>
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

  export type GovernanceDeploymentCountOrderByAggregateInput = {
    id?: SortOrder
    network?: SortOrder
    chainId?: SortOrder
    tokenAddress?: SortOrder
    timelockAddress?: SortOrder
    governorAddress?: SortOrder
    deployedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type GovernanceDeploymentAvgOrderByAggregateInput = {
    chainId?: SortOrder
  }

  export type GovernanceDeploymentMaxOrderByAggregateInput = {
    id?: SortOrder
    network?: SortOrder
    chainId?: SortOrder
    tokenAddress?: SortOrder
    timelockAddress?: SortOrder
    governorAddress?: SortOrder
    deployedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type GovernanceDeploymentMinOrderByAggregateInput = {
    id?: SortOrder
    network?: SortOrder
    chainId?: SortOrder
    tokenAddress?: SortOrder
    timelockAddress?: SortOrder
    governorAddress?: SortOrder
    deployedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type GovernanceDeploymentSumOrderByAggregateInput = {
    chainId?: SortOrder
  }

  export type AttestationIssuerRegistryContractIdIssuerAddressCompoundUniqueInput = {
    registryContractId: string
    issuerAddress: string
  }

  export type AttestationIssuerCountOrderByAggregateInput = {
    id?: SortOrder
    registryContractId?: SortOrder
    issuerAddress?: SortOrder
    vertical?: SortOrder
    accredited?: SortOrder
    onChainTxHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttestationIssuerMaxOrderByAggregateInput = {
    id?: SortOrder
    registryContractId?: SortOrder
    issuerAddress?: SortOrder
    vertical?: SortOrder
    accredited?: SortOrder
    onChainTxHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttestationIssuerMinOrderByAggregateInput = {
    id?: SortOrder
    registryContractId?: SortOrder
    issuerAddress?: SortOrder
    vertical?: SortOrder
    accredited?: SortOrder
    onChainTxHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContractUpgradeCreateNestedManyWithoutContractInput = {
    create?: XOR<ContractUpgradeCreateWithoutContractInput, ContractUpgradeUncheckedCreateWithoutContractInput> | ContractUpgradeCreateWithoutContractInput[] | ContractUpgradeUncheckedCreateWithoutContractInput[]
    connectOrCreate?: ContractUpgradeCreateOrConnectWithoutContractInput | ContractUpgradeCreateOrConnectWithoutContractInput[]
    createMany?: ContractUpgradeCreateManyContractInputEnvelope
    connect?: ContractUpgradeWhereUniqueInput | ContractUpgradeWhereUniqueInput[]
  }

  export type StatusProposalCreateNestedManyWithoutContractInput = {
    create?: XOR<StatusProposalCreateWithoutContractInput, StatusProposalUncheckedCreateWithoutContractInput> | StatusProposalCreateWithoutContractInput[] | StatusProposalUncheckedCreateWithoutContractInput[]
    connectOrCreate?: StatusProposalCreateOrConnectWithoutContractInput | StatusProposalCreateOrConnectWithoutContractInput[]
    createMany?: StatusProposalCreateManyContractInputEnvelope
    connect?: StatusProposalWhereUniqueInput | StatusProposalWhereUniqueInput[]
  }

  export type AttestationIssuerCreateNestedManyWithoutRegistryContractInput = {
    create?: XOR<AttestationIssuerCreateWithoutRegistryContractInput, AttestationIssuerUncheckedCreateWithoutRegistryContractInput> | AttestationIssuerCreateWithoutRegistryContractInput[] | AttestationIssuerUncheckedCreateWithoutRegistryContractInput[]
    connectOrCreate?: AttestationIssuerCreateOrConnectWithoutRegistryContractInput | AttestationIssuerCreateOrConnectWithoutRegistryContractInput[]
    createMany?: AttestationIssuerCreateManyRegistryContractInputEnvelope
    connect?: AttestationIssuerWhereUniqueInput | AttestationIssuerWhereUniqueInput[]
  }

  export type ContractUpgradeUncheckedCreateNestedManyWithoutContractInput = {
    create?: XOR<ContractUpgradeCreateWithoutContractInput, ContractUpgradeUncheckedCreateWithoutContractInput> | ContractUpgradeCreateWithoutContractInput[] | ContractUpgradeUncheckedCreateWithoutContractInput[]
    connectOrCreate?: ContractUpgradeCreateOrConnectWithoutContractInput | ContractUpgradeCreateOrConnectWithoutContractInput[]
    createMany?: ContractUpgradeCreateManyContractInputEnvelope
    connect?: ContractUpgradeWhereUniqueInput | ContractUpgradeWhereUniqueInput[]
  }

  export type StatusProposalUncheckedCreateNestedManyWithoutContractInput = {
    create?: XOR<StatusProposalCreateWithoutContractInput, StatusProposalUncheckedCreateWithoutContractInput> | StatusProposalCreateWithoutContractInput[] | StatusProposalUncheckedCreateWithoutContractInput[]
    connectOrCreate?: StatusProposalCreateOrConnectWithoutContractInput | StatusProposalCreateOrConnectWithoutContractInput[]
    createMany?: StatusProposalCreateManyContractInputEnvelope
    connect?: StatusProposalWhereUniqueInput | StatusProposalWhereUniqueInput[]
  }

  export type AttestationIssuerUncheckedCreateNestedManyWithoutRegistryContractInput = {
    create?: XOR<AttestationIssuerCreateWithoutRegistryContractInput, AttestationIssuerUncheckedCreateWithoutRegistryContractInput> | AttestationIssuerCreateWithoutRegistryContractInput[] | AttestationIssuerUncheckedCreateWithoutRegistryContractInput[]
    connectOrCreate?: AttestationIssuerCreateOrConnectWithoutRegistryContractInput | AttestationIssuerCreateOrConnectWithoutRegistryContractInput[]
    createMany?: AttestationIssuerCreateManyRegistryContractInputEnvelope
    connect?: AttestationIssuerWhereUniqueInput | AttestationIssuerWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumContractStatusFieldUpdateOperationsInput = {
    set?: $Enums.ContractStatus
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

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumControlKindFieldUpdateOperationsInput = {
    set?: $Enums.ControlKind
  }

  export type EnumExecutionModeFieldUpdateOperationsInput = {
    set?: $Enums.ExecutionMode
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ContractUpgradeUpdateManyWithoutContractNestedInput = {
    create?: XOR<ContractUpgradeCreateWithoutContractInput, ContractUpgradeUncheckedCreateWithoutContractInput> | ContractUpgradeCreateWithoutContractInput[] | ContractUpgradeUncheckedCreateWithoutContractInput[]
    connectOrCreate?: ContractUpgradeCreateOrConnectWithoutContractInput | ContractUpgradeCreateOrConnectWithoutContractInput[]
    upsert?: ContractUpgradeUpsertWithWhereUniqueWithoutContractInput | ContractUpgradeUpsertWithWhereUniqueWithoutContractInput[]
    createMany?: ContractUpgradeCreateManyContractInputEnvelope
    set?: ContractUpgradeWhereUniqueInput | ContractUpgradeWhereUniqueInput[]
    disconnect?: ContractUpgradeWhereUniqueInput | ContractUpgradeWhereUniqueInput[]
    delete?: ContractUpgradeWhereUniqueInput | ContractUpgradeWhereUniqueInput[]
    connect?: ContractUpgradeWhereUniqueInput | ContractUpgradeWhereUniqueInput[]
    update?: ContractUpgradeUpdateWithWhereUniqueWithoutContractInput | ContractUpgradeUpdateWithWhereUniqueWithoutContractInput[]
    updateMany?: ContractUpgradeUpdateManyWithWhereWithoutContractInput | ContractUpgradeUpdateManyWithWhereWithoutContractInput[]
    deleteMany?: ContractUpgradeScalarWhereInput | ContractUpgradeScalarWhereInput[]
  }

  export type StatusProposalUpdateManyWithoutContractNestedInput = {
    create?: XOR<StatusProposalCreateWithoutContractInput, StatusProposalUncheckedCreateWithoutContractInput> | StatusProposalCreateWithoutContractInput[] | StatusProposalUncheckedCreateWithoutContractInput[]
    connectOrCreate?: StatusProposalCreateOrConnectWithoutContractInput | StatusProposalCreateOrConnectWithoutContractInput[]
    upsert?: StatusProposalUpsertWithWhereUniqueWithoutContractInput | StatusProposalUpsertWithWhereUniqueWithoutContractInput[]
    createMany?: StatusProposalCreateManyContractInputEnvelope
    set?: StatusProposalWhereUniqueInput | StatusProposalWhereUniqueInput[]
    disconnect?: StatusProposalWhereUniqueInput | StatusProposalWhereUniqueInput[]
    delete?: StatusProposalWhereUniqueInput | StatusProposalWhereUniqueInput[]
    connect?: StatusProposalWhereUniqueInput | StatusProposalWhereUniqueInput[]
    update?: StatusProposalUpdateWithWhereUniqueWithoutContractInput | StatusProposalUpdateWithWhereUniqueWithoutContractInput[]
    updateMany?: StatusProposalUpdateManyWithWhereWithoutContractInput | StatusProposalUpdateManyWithWhereWithoutContractInput[]
    deleteMany?: StatusProposalScalarWhereInput | StatusProposalScalarWhereInput[]
  }

  export type AttestationIssuerUpdateManyWithoutRegistryContractNestedInput = {
    create?: XOR<AttestationIssuerCreateWithoutRegistryContractInput, AttestationIssuerUncheckedCreateWithoutRegistryContractInput> | AttestationIssuerCreateWithoutRegistryContractInput[] | AttestationIssuerUncheckedCreateWithoutRegistryContractInput[]
    connectOrCreate?: AttestationIssuerCreateOrConnectWithoutRegistryContractInput | AttestationIssuerCreateOrConnectWithoutRegistryContractInput[]
    upsert?: AttestationIssuerUpsertWithWhereUniqueWithoutRegistryContractInput | AttestationIssuerUpsertWithWhereUniqueWithoutRegistryContractInput[]
    createMany?: AttestationIssuerCreateManyRegistryContractInputEnvelope
    set?: AttestationIssuerWhereUniqueInput | AttestationIssuerWhereUniqueInput[]
    disconnect?: AttestationIssuerWhereUniqueInput | AttestationIssuerWhereUniqueInput[]
    delete?: AttestationIssuerWhereUniqueInput | AttestationIssuerWhereUniqueInput[]
    connect?: AttestationIssuerWhereUniqueInput | AttestationIssuerWhereUniqueInput[]
    update?: AttestationIssuerUpdateWithWhereUniqueWithoutRegistryContractInput | AttestationIssuerUpdateWithWhereUniqueWithoutRegistryContractInput[]
    updateMany?: AttestationIssuerUpdateManyWithWhereWithoutRegistryContractInput | AttestationIssuerUpdateManyWithWhereWithoutRegistryContractInput[]
    deleteMany?: AttestationIssuerScalarWhereInput | AttestationIssuerScalarWhereInput[]
  }

  export type ContractUpgradeUncheckedUpdateManyWithoutContractNestedInput = {
    create?: XOR<ContractUpgradeCreateWithoutContractInput, ContractUpgradeUncheckedCreateWithoutContractInput> | ContractUpgradeCreateWithoutContractInput[] | ContractUpgradeUncheckedCreateWithoutContractInput[]
    connectOrCreate?: ContractUpgradeCreateOrConnectWithoutContractInput | ContractUpgradeCreateOrConnectWithoutContractInput[]
    upsert?: ContractUpgradeUpsertWithWhereUniqueWithoutContractInput | ContractUpgradeUpsertWithWhereUniqueWithoutContractInput[]
    createMany?: ContractUpgradeCreateManyContractInputEnvelope
    set?: ContractUpgradeWhereUniqueInput | ContractUpgradeWhereUniqueInput[]
    disconnect?: ContractUpgradeWhereUniqueInput | ContractUpgradeWhereUniqueInput[]
    delete?: ContractUpgradeWhereUniqueInput | ContractUpgradeWhereUniqueInput[]
    connect?: ContractUpgradeWhereUniqueInput | ContractUpgradeWhereUniqueInput[]
    update?: ContractUpgradeUpdateWithWhereUniqueWithoutContractInput | ContractUpgradeUpdateWithWhereUniqueWithoutContractInput[]
    updateMany?: ContractUpgradeUpdateManyWithWhereWithoutContractInput | ContractUpgradeUpdateManyWithWhereWithoutContractInput[]
    deleteMany?: ContractUpgradeScalarWhereInput | ContractUpgradeScalarWhereInput[]
  }

  export type StatusProposalUncheckedUpdateManyWithoutContractNestedInput = {
    create?: XOR<StatusProposalCreateWithoutContractInput, StatusProposalUncheckedCreateWithoutContractInput> | StatusProposalCreateWithoutContractInput[] | StatusProposalUncheckedCreateWithoutContractInput[]
    connectOrCreate?: StatusProposalCreateOrConnectWithoutContractInput | StatusProposalCreateOrConnectWithoutContractInput[]
    upsert?: StatusProposalUpsertWithWhereUniqueWithoutContractInput | StatusProposalUpsertWithWhereUniqueWithoutContractInput[]
    createMany?: StatusProposalCreateManyContractInputEnvelope
    set?: StatusProposalWhereUniqueInput | StatusProposalWhereUniqueInput[]
    disconnect?: StatusProposalWhereUniqueInput | StatusProposalWhereUniqueInput[]
    delete?: StatusProposalWhereUniqueInput | StatusProposalWhereUniqueInput[]
    connect?: StatusProposalWhereUniqueInput | StatusProposalWhereUniqueInput[]
    update?: StatusProposalUpdateWithWhereUniqueWithoutContractInput | StatusProposalUpdateWithWhereUniqueWithoutContractInput[]
    updateMany?: StatusProposalUpdateManyWithWhereWithoutContractInput | StatusProposalUpdateManyWithWhereWithoutContractInput[]
    deleteMany?: StatusProposalScalarWhereInput | StatusProposalScalarWhereInput[]
  }

  export type AttestationIssuerUncheckedUpdateManyWithoutRegistryContractNestedInput = {
    create?: XOR<AttestationIssuerCreateWithoutRegistryContractInput, AttestationIssuerUncheckedCreateWithoutRegistryContractInput> | AttestationIssuerCreateWithoutRegistryContractInput[] | AttestationIssuerUncheckedCreateWithoutRegistryContractInput[]
    connectOrCreate?: AttestationIssuerCreateOrConnectWithoutRegistryContractInput | AttestationIssuerCreateOrConnectWithoutRegistryContractInput[]
    upsert?: AttestationIssuerUpsertWithWhereUniqueWithoutRegistryContractInput | AttestationIssuerUpsertWithWhereUniqueWithoutRegistryContractInput[]
    createMany?: AttestationIssuerCreateManyRegistryContractInputEnvelope
    set?: AttestationIssuerWhereUniqueInput | AttestationIssuerWhereUniqueInput[]
    disconnect?: AttestationIssuerWhereUniqueInput | AttestationIssuerWhereUniqueInput[]
    delete?: AttestationIssuerWhereUniqueInput | AttestationIssuerWhereUniqueInput[]
    connect?: AttestationIssuerWhereUniqueInput | AttestationIssuerWhereUniqueInput[]
    update?: AttestationIssuerUpdateWithWhereUniqueWithoutRegistryContractInput | AttestationIssuerUpdateWithWhereUniqueWithoutRegistryContractInput[]
    updateMany?: AttestationIssuerUpdateManyWithWhereWithoutRegistryContractInput | AttestationIssuerUpdateManyWithWhereWithoutRegistryContractInput[]
    deleteMany?: AttestationIssuerScalarWhereInput | AttestationIssuerScalarWhereInput[]
  }

  export type DeployedContractCreateNestedOneWithoutUpgradesInput = {
    create?: XOR<DeployedContractCreateWithoutUpgradesInput, DeployedContractUncheckedCreateWithoutUpgradesInput>
    connectOrCreate?: DeployedContractCreateOrConnectWithoutUpgradesInput
    connect?: DeployedContractWhereUniqueInput
  }

  export type DeployedContractUpdateOneWithoutUpgradesNestedInput = {
    create?: XOR<DeployedContractCreateWithoutUpgradesInput, DeployedContractUncheckedCreateWithoutUpgradesInput>
    connectOrCreate?: DeployedContractCreateOrConnectWithoutUpgradesInput
    upsert?: DeployedContractUpsertWithoutUpgradesInput
    disconnect?: DeployedContractWhereInput | boolean
    delete?: DeployedContractWhereInput | boolean
    connect?: DeployedContractWhereUniqueInput
    update?: XOR<XOR<DeployedContractUpdateToOneWithWhereWithoutUpgradesInput, DeployedContractUpdateWithoutUpgradesInput>, DeployedContractUncheckedUpdateWithoutUpgradesInput>
  }

  export type DeployedContractCreateNestedOneWithoutProposalsInput = {
    create?: XOR<DeployedContractCreateWithoutProposalsInput, DeployedContractUncheckedCreateWithoutProposalsInput>
    connectOrCreate?: DeployedContractCreateOrConnectWithoutProposalsInput
    connect?: DeployedContractWhereUniqueInput
  }

  export type EnumProposalStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProposalStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DeployedContractUpdateOneRequiredWithoutProposalsNestedInput = {
    create?: XOR<DeployedContractCreateWithoutProposalsInput, DeployedContractUncheckedCreateWithoutProposalsInput>
    connectOrCreate?: DeployedContractCreateOrConnectWithoutProposalsInput
    upsert?: DeployedContractUpsertWithoutProposalsInput
    connect?: DeployedContractWhereUniqueInput
    update?: XOR<XOR<DeployedContractUpdateToOneWithWhereWithoutProposalsInput, DeployedContractUpdateWithoutProposalsInput>, DeployedContractUncheckedUpdateWithoutProposalsInput>
  }

  export type DeployedContractCreateNestedOneWithoutAttestationIssuersInput = {
    create?: XOR<DeployedContractCreateWithoutAttestationIssuersInput, DeployedContractUncheckedCreateWithoutAttestationIssuersInput>
    connectOrCreate?: DeployedContractCreateOrConnectWithoutAttestationIssuersInput
    connect?: DeployedContractWhereUniqueInput
  }

  export type DeployedContractUpdateOneRequiredWithoutAttestationIssuersNestedInput = {
    create?: XOR<DeployedContractCreateWithoutAttestationIssuersInput, DeployedContractUncheckedCreateWithoutAttestationIssuersInput>
    connectOrCreate?: DeployedContractCreateOrConnectWithoutAttestationIssuersInput
    upsert?: DeployedContractUpsertWithoutAttestationIssuersInput
    connect?: DeployedContractWhereUniqueInput
    update?: XOR<XOR<DeployedContractUpdateToOneWithWhereWithoutAttestationIssuersInput, DeployedContractUpdateWithoutAttestationIssuersInput>, DeployedContractUncheckedUpdateWithoutAttestationIssuersInput>
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

  export type NestedEnumContractStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ContractStatus | EnumContractStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumContractStatusFilter<$PrismaModel> | $Enums.ContractStatus
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

  export type NestedEnumControlKindFilter<$PrismaModel = never> = {
    equals?: $Enums.ControlKind | EnumControlKindFieldRefInput<$PrismaModel>
    in?: $Enums.ControlKind[] | ListEnumControlKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.ControlKind[] | ListEnumControlKindFieldRefInput<$PrismaModel>
    not?: NestedEnumControlKindFilter<$PrismaModel> | $Enums.ControlKind
  }

  export type NestedEnumExecutionModeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionMode | EnumExecutionModeFieldRefInput<$PrismaModel>
    in?: $Enums.ExecutionMode[] | ListEnumExecutionModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExecutionMode[] | ListEnumExecutionModeFieldRefInput<$PrismaModel>
    not?: NestedEnumExecutionModeFilter<$PrismaModel> | $Enums.ExecutionMode
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

  export type NestedEnumContractStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ContractStatus | EnumContractStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ContractStatus[] | ListEnumContractStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumContractStatusWithAggregatesFilter<$PrismaModel> | $Enums.ContractStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumContractStatusFilter<$PrismaModel>
    _max?: NestedEnumContractStatusFilter<$PrismaModel>
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

  export type NestedEnumControlKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ControlKind | EnumControlKindFieldRefInput<$PrismaModel>
    in?: $Enums.ControlKind[] | ListEnumControlKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.ControlKind[] | ListEnumControlKindFieldRefInput<$PrismaModel>
    not?: NestedEnumControlKindWithAggregatesFilter<$PrismaModel> | $Enums.ControlKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumControlKindFilter<$PrismaModel>
    _max?: NestedEnumControlKindFilter<$PrismaModel>
  }

  export type NestedEnumExecutionModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExecutionMode | EnumExecutionModeFieldRefInput<$PrismaModel>
    in?: $Enums.ExecutionMode[] | ListEnumExecutionModeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExecutionMode[] | ListEnumExecutionModeFieldRefInput<$PrismaModel>
    not?: NestedEnumExecutionModeWithAggregatesFilter<$PrismaModel> | $Enums.ExecutionMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExecutionModeFilter<$PrismaModel>
    _max?: NestedEnumExecutionModeFilter<$PrismaModel>
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

  export type NestedEnumProposalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProposalStatus | EnumProposalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProposalStatus[] | ListEnumProposalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProposalStatus[] | ListEnumProposalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProposalStatusFilter<$PrismaModel> | $Enums.ProposalStatus
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

  export type NestedEnumProposalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProposalStatus | EnumProposalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProposalStatus[] | ListEnumProposalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProposalStatus[] | ListEnumProposalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProposalStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProposalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProposalStatusFilter<$PrismaModel>
    _max?: NestedEnumProposalStatusFilter<$PrismaModel>
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

  export type ContractUpgradeCreateWithoutContractInput = {
    id: string
    contractName: string
    fromVersion: string
    toVersion: string
    upgradedAt: Date | string
    approvedBy: string
    createdAt?: Date | string
  }

  export type ContractUpgradeUncheckedCreateWithoutContractInput = {
    id: string
    contractName: string
    fromVersion: string
    toVersion: string
    upgradedAt: Date | string
    approvedBy: string
    createdAt?: Date | string
  }

  export type ContractUpgradeCreateOrConnectWithoutContractInput = {
    where: ContractUpgradeWhereUniqueInput
    create: XOR<ContractUpgradeCreateWithoutContractInput, ContractUpgradeUncheckedCreateWithoutContractInput>
  }

  export type ContractUpgradeCreateManyContractInputEnvelope = {
    data: ContractUpgradeCreateManyContractInput | ContractUpgradeCreateManyContractInput[]
    skipDuplicates?: boolean
  }

  export type StatusProposalCreateWithoutContractInput = {
    id: string
    action: string
    status?: $Enums.ProposalStatus
    actorRef?: string | null
    txHash?: string | null
    calldata?: string | null
    broadcastJobId?: string | null
    error?: string | null
    createdAt?: Date | string
    executedAt?: Date | string | null
  }

  export type StatusProposalUncheckedCreateWithoutContractInput = {
    id: string
    action: string
    status?: $Enums.ProposalStatus
    actorRef?: string | null
    txHash?: string | null
    calldata?: string | null
    broadcastJobId?: string | null
    error?: string | null
    createdAt?: Date | string
    executedAt?: Date | string | null
  }

  export type StatusProposalCreateOrConnectWithoutContractInput = {
    where: StatusProposalWhereUniqueInput
    create: XOR<StatusProposalCreateWithoutContractInput, StatusProposalUncheckedCreateWithoutContractInput>
  }

  export type StatusProposalCreateManyContractInputEnvelope = {
    data: StatusProposalCreateManyContractInput | StatusProposalCreateManyContractInput[]
    skipDuplicates?: boolean
  }

  export type AttestationIssuerCreateWithoutRegistryContractInput = {
    id: string
    issuerAddress: string
    vertical: string
    accredited?: boolean
    onChainTxHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttestationIssuerUncheckedCreateWithoutRegistryContractInput = {
    id: string
    issuerAddress: string
    vertical: string
    accredited?: boolean
    onChainTxHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttestationIssuerCreateOrConnectWithoutRegistryContractInput = {
    where: AttestationIssuerWhereUniqueInput
    create: XOR<AttestationIssuerCreateWithoutRegistryContractInput, AttestationIssuerUncheckedCreateWithoutRegistryContractInput>
  }

  export type AttestationIssuerCreateManyRegistryContractInputEnvelope = {
    data: AttestationIssuerCreateManyRegistryContractInput | AttestationIssuerCreateManyRegistryContractInput[]
    skipDuplicates?: boolean
  }

  export type ContractUpgradeUpsertWithWhereUniqueWithoutContractInput = {
    where: ContractUpgradeWhereUniqueInput
    update: XOR<ContractUpgradeUpdateWithoutContractInput, ContractUpgradeUncheckedUpdateWithoutContractInput>
    create: XOR<ContractUpgradeCreateWithoutContractInput, ContractUpgradeUncheckedCreateWithoutContractInput>
  }

  export type ContractUpgradeUpdateWithWhereUniqueWithoutContractInput = {
    where: ContractUpgradeWhereUniqueInput
    data: XOR<ContractUpgradeUpdateWithoutContractInput, ContractUpgradeUncheckedUpdateWithoutContractInput>
  }

  export type ContractUpgradeUpdateManyWithWhereWithoutContractInput = {
    where: ContractUpgradeScalarWhereInput
    data: XOR<ContractUpgradeUpdateManyMutationInput, ContractUpgradeUncheckedUpdateManyWithoutContractInput>
  }

  export type ContractUpgradeScalarWhereInput = {
    AND?: ContractUpgradeScalarWhereInput | ContractUpgradeScalarWhereInput[]
    OR?: ContractUpgradeScalarWhereInput[]
    NOT?: ContractUpgradeScalarWhereInput | ContractUpgradeScalarWhereInput[]
    id?: StringFilter<"ContractUpgrade"> | string
    contractId?: StringNullableFilter<"ContractUpgrade"> | string | null
    contractName?: StringFilter<"ContractUpgrade"> | string
    fromVersion?: StringFilter<"ContractUpgrade"> | string
    toVersion?: StringFilter<"ContractUpgrade"> | string
    upgradedAt?: DateTimeFilter<"ContractUpgrade"> | Date | string
    approvedBy?: StringFilter<"ContractUpgrade"> | string
    createdAt?: DateTimeFilter<"ContractUpgrade"> | Date | string
  }

  export type StatusProposalUpsertWithWhereUniqueWithoutContractInput = {
    where: StatusProposalWhereUniqueInput
    update: XOR<StatusProposalUpdateWithoutContractInput, StatusProposalUncheckedUpdateWithoutContractInput>
    create: XOR<StatusProposalCreateWithoutContractInput, StatusProposalUncheckedCreateWithoutContractInput>
  }

  export type StatusProposalUpdateWithWhereUniqueWithoutContractInput = {
    where: StatusProposalWhereUniqueInput
    data: XOR<StatusProposalUpdateWithoutContractInput, StatusProposalUncheckedUpdateWithoutContractInput>
  }

  export type StatusProposalUpdateManyWithWhereWithoutContractInput = {
    where: StatusProposalScalarWhereInput
    data: XOR<StatusProposalUpdateManyMutationInput, StatusProposalUncheckedUpdateManyWithoutContractInput>
  }

  export type StatusProposalScalarWhereInput = {
    AND?: StatusProposalScalarWhereInput | StatusProposalScalarWhereInput[]
    OR?: StatusProposalScalarWhereInput[]
    NOT?: StatusProposalScalarWhereInput | StatusProposalScalarWhereInput[]
    id?: StringFilter<"StatusProposal"> | string
    contractId?: StringFilter<"StatusProposal"> | string
    action?: StringFilter<"StatusProposal"> | string
    status?: EnumProposalStatusFilter<"StatusProposal"> | $Enums.ProposalStatus
    actorRef?: StringNullableFilter<"StatusProposal"> | string | null
    txHash?: StringNullableFilter<"StatusProposal"> | string | null
    calldata?: StringNullableFilter<"StatusProposal"> | string | null
    broadcastJobId?: StringNullableFilter<"StatusProposal"> | string | null
    error?: StringNullableFilter<"StatusProposal"> | string | null
    createdAt?: DateTimeFilter<"StatusProposal"> | Date | string
    executedAt?: DateTimeNullableFilter<"StatusProposal"> | Date | string | null
  }

  export type AttestationIssuerUpsertWithWhereUniqueWithoutRegistryContractInput = {
    where: AttestationIssuerWhereUniqueInput
    update: XOR<AttestationIssuerUpdateWithoutRegistryContractInput, AttestationIssuerUncheckedUpdateWithoutRegistryContractInput>
    create: XOR<AttestationIssuerCreateWithoutRegistryContractInput, AttestationIssuerUncheckedCreateWithoutRegistryContractInput>
  }

  export type AttestationIssuerUpdateWithWhereUniqueWithoutRegistryContractInput = {
    where: AttestationIssuerWhereUniqueInput
    data: XOR<AttestationIssuerUpdateWithoutRegistryContractInput, AttestationIssuerUncheckedUpdateWithoutRegistryContractInput>
  }

  export type AttestationIssuerUpdateManyWithWhereWithoutRegistryContractInput = {
    where: AttestationIssuerScalarWhereInput
    data: XOR<AttestationIssuerUpdateManyMutationInput, AttestationIssuerUncheckedUpdateManyWithoutRegistryContractInput>
  }

  export type AttestationIssuerScalarWhereInput = {
    AND?: AttestationIssuerScalarWhereInput | AttestationIssuerScalarWhereInput[]
    OR?: AttestationIssuerScalarWhereInput[]
    NOT?: AttestationIssuerScalarWhereInput | AttestationIssuerScalarWhereInput[]
    id?: StringFilter<"AttestationIssuer"> | string
    registryContractId?: StringFilter<"AttestationIssuer"> | string
    issuerAddress?: StringFilter<"AttestationIssuer"> | string
    vertical?: StringFilter<"AttestationIssuer"> | string
    accredited?: BoolFilter<"AttestationIssuer"> | boolean
    onChainTxHash?: StringNullableFilter<"AttestationIssuer"> | string | null
    createdAt?: DateTimeFilter<"AttestationIssuer"> | Date | string
    updatedAt?: DateTimeFilter<"AttestationIssuer"> | Date | string
  }

  export type DeployedContractCreateWithoutUpgradesInput = {
    id: string
    name: string
    purpose: string
    network: string
    address: string
    version: string
    status?: $Enums.ContractStatus
    tvlUsd?: number
    audited?: boolean
    deployedAt: Date | string
    chainId?: number | null
    controlKind?: $Enums.ControlKind
    executionMode?: $Enums.ExecutionMode
    timelockAddress?: string | null
    governorAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    proposals?: StatusProposalCreateNestedManyWithoutContractInput
    attestationIssuers?: AttestationIssuerCreateNestedManyWithoutRegistryContractInput
  }

  export type DeployedContractUncheckedCreateWithoutUpgradesInput = {
    id: string
    name: string
    purpose: string
    network: string
    address: string
    version: string
    status?: $Enums.ContractStatus
    tvlUsd?: number
    audited?: boolean
    deployedAt: Date | string
    chainId?: number | null
    controlKind?: $Enums.ControlKind
    executionMode?: $Enums.ExecutionMode
    timelockAddress?: string | null
    governorAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    proposals?: StatusProposalUncheckedCreateNestedManyWithoutContractInput
    attestationIssuers?: AttestationIssuerUncheckedCreateNestedManyWithoutRegistryContractInput
  }

  export type DeployedContractCreateOrConnectWithoutUpgradesInput = {
    where: DeployedContractWhereUniqueInput
    create: XOR<DeployedContractCreateWithoutUpgradesInput, DeployedContractUncheckedCreateWithoutUpgradesInput>
  }

  export type DeployedContractUpsertWithoutUpgradesInput = {
    update: XOR<DeployedContractUpdateWithoutUpgradesInput, DeployedContractUncheckedUpdateWithoutUpgradesInput>
    create: XOR<DeployedContractCreateWithoutUpgradesInput, DeployedContractUncheckedCreateWithoutUpgradesInput>
    where?: DeployedContractWhereInput
  }

  export type DeployedContractUpdateToOneWithWhereWithoutUpgradesInput = {
    where?: DeployedContractWhereInput
    data: XOR<DeployedContractUpdateWithoutUpgradesInput, DeployedContractUncheckedUpdateWithoutUpgradesInput>
  }

  export type DeployedContractUpdateWithoutUpgradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    tvlUsd?: IntFieldUpdateOperationsInput | number
    audited?: BoolFieldUpdateOperationsInput | boolean
    deployedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainId?: NullableIntFieldUpdateOperationsInput | number | null
    controlKind?: EnumControlKindFieldUpdateOperationsInput | $Enums.ControlKind
    executionMode?: EnumExecutionModeFieldUpdateOperationsInput | $Enums.ExecutionMode
    timelockAddress?: NullableStringFieldUpdateOperationsInput | string | null
    governorAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proposals?: StatusProposalUpdateManyWithoutContractNestedInput
    attestationIssuers?: AttestationIssuerUpdateManyWithoutRegistryContractNestedInput
  }

  export type DeployedContractUncheckedUpdateWithoutUpgradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    tvlUsd?: IntFieldUpdateOperationsInput | number
    audited?: BoolFieldUpdateOperationsInput | boolean
    deployedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainId?: NullableIntFieldUpdateOperationsInput | number | null
    controlKind?: EnumControlKindFieldUpdateOperationsInput | $Enums.ControlKind
    executionMode?: EnumExecutionModeFieldUpdateOperationsInput | $Enums.ExecutionMode
    timelockAddress?: NullableStringFieldUpdateOperationsInput | string | null
    governorAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proposals?: StatusProposalUncheckedUpdateManyWithoutContractNestedInput
    attestationIssuers?: AttestationIssuerUncheckedUpdateManyWithoutRegistryContractNestedInput
  }

  export type DeployedContractCreateWithoutProposalsInput = {
    id: string
    name: string
    purpose: string
    network: string
    address: string
    version: string
    status?: $Enums.ContractStatus
    tvlUsd?: number
    audited?: boolean
    deployedAt: Date | string
    chainId?: number | null
    controlKind?: $Enums.ControlKind
    executionMode?: $Enums.ExecutionMode
    timelockAddress?: string | null
    governorAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    upgrades?: ContractUpgradeCreateNestedManyWithoutContractInput
    attestationIssuers?: AttestationIssuerCreateNestedManyWithoutRegistryContractInput
  }

  export type DeployedContractUncheckedCreateWithoutProposalsInput = {
    id: string
    name: string
    purpose: string
    network: string
    address: string
    version: string
    status?: $Enums.ContractStatus
    tvlUsd?: number
    audited?: boolean
    deployedAt: Date | string
    chainId?: number | null
    controlKind?: $Enums.ControlKind
    executionMode?: $Enums.ExecutionMode
    timelockAddress?: string | null
    governorAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    upgrades?: ContractUpgradeUncheckedCreateNestedManyWithoutContractInput
    attestationIssuers?: AttestationIssuerUncheckedCreateNestedManyWithoutRegistryContractInput
  }

  export type DeployedContractCreateOrConnectWithoutProposalsInput = {
    where: DeployedContractWhereUniqueInput
    create: XOR<DeployedContractCreateWithoutProposalsInput, DeployedContractUncheckedCreateWithoutProposalsInput>
  }

  export type DeployedContractUpsertWithoutProposalsInput = {
    update: XOR<DeployedContractUpdateWithoutProposalsInput, DeployedContractUncheckedUpdateWithoutProposalsInput>
    create: XOR<DeployedContractCreateWithoutProposalsInput, DeployedContractUncheckedCreateWithoutProposalsInput>
    where?: DeployedContractWhereInput
  }

  export type DeployedContractUpdateToOneWithWhereWithoutProposalsInput = {
    where?: DeployedContractWhereInput
    data: XOR<DeployedContractUpdateWithoutProposalsInput, DeployedContractUncheckedUpdateWithoutProposalsInput>
  }

  export type DeployedContractUpdateWithoutProposalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    tvlUsd?: IntFieldUpdateOperationsInput | number
    audited?: BoolFieldUpdateOperationsInput | boolean
    deployedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainId?: NullableIntFieldUpdateOperationsInput | number | null
    controlKind?: EnumControlKindFieldUpdateOperationsInput | $Enums.ControlKind
    executionMode?: EnumExecutionModeFieldUpdateOperationsInput | $Enums.ExecutionMode
    timelockAddress?: NullableStringFieldUpdateOperationsInput | string | null
    governorAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    upgrades?: ContractUpgradeUpdateManyWithoutContractNestedInput
    attestationIssuers?: AttestationIssuerUpdateManyWithoutRegistryContractNestedInput
  }

  export type DeployedContractUncheckedUpdateWithoutProposalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    tvlUsd?: IntFieldUpdateOperationsInput | number
    audited?: BoolFieldUpdateOperationsInput | boolean
    deployedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainId?: NullableIntFieldUpdateOperationsInput | number | null
    controlKind?: EnumControlKindFieldUpdateOperationsInput | $Enums.ControlKind
    executionMode?: EnumExecutionModeFieldUpdateOperationsInput | $Enums.ExecutionMode
    timelockAddress?: NullableStringFieldUpdateOperationsInput | string | null
    governorAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    upgrades?: ContractUpgradeUncheckedUpdateManyWithoutContractNestedInput
    attestationIssuers?: AttestationIssuerUncheckedUpdateManyWithoutRegistryContractNestedInput
  }

  export type DeployedContractCreateWithoutAttestationIssuersInput = {
    id: string
    name: string
    purpose: string
    network: string
    address: string
    version: string
    status?: $Enums.ContractStatus
    tvlUsd?: number
    audited?: boolean
    deployedAt: Date | string
    chainId?: number | null
    controlKind?: $Enums.ControlKind
    executionMode?: $Enums.ExecutionMode
    timelockAddress?: string | null
    governorAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    upgrades?: ContractUpgradeCreateNestedManyWithoutContractInput
    proposals?: StatusProposalCreateNestedManyWithoutContractInput
  }

  export type DeployedContractUncheckedCreateWithoutAttestationIssuersInput = {
    id: string
    name: string
    purpose: string
    network: string
    address: string
    version: string
    status?: $Enums.ContractStatus
    tvlUsd?: number
    audited?: boolean
    deployedAt: Date | string
    chainId?: number | null
    controlKind?: $Enums.ControlKind
    executionMode?: $Enums.ExecutionMode
    timelockAddress?: string | null
    governorAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    upgrades?: ContractUpgradeUncheckedCreateNestedManyWithoutContractInput
    proposals?: StatusProposalUncheckedCreateNestedManyWithoutContractInput
  }

  export type DeployedContractCreateOrConnectWithoutAttestationIssuersInput = {
    where: DeployedContractWhereUniqueInput
    create: XOR<DeployedContractCreateWithoutAttestationIssuersInput, DeployedContractUncheckedCreateWithoutAttestationIssuersInput>
  }

  export type DeployedContractUpsertWithoutAttestationIssuersInput = {
    update: XOR<DeployedContractUpdateWithoutAttestationIssuersInput, DeployedContractUncheckedUpdateWithoutAttestationIssuersInput>
    create: XOR<DeployedContractCreateWithoutAttestationIssuersInput, DeployedContractUncheckedCreateWithoutAttestationIssuersInput>
    where?: DeployedContractWhereInput
  }

  export type DeployedContractUpdateToOneWithWhereWithoutAttestationIssuersInput = {
    where?: DeployedContractWhereInput
    data: XOR<DeployedContractUpdateWithoutAttestationIssuersInput, DeployedContractUncheckedUpdateWithoutAttestationIssuersInput>
  }

  export type DeployedContractUpdateWithoutAttestationIssuersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    tvlUsd?: IntFieldUpdateOperationsInput | number
    audited?: BoolFieldUpdateOperationsInput | boolean
    deployedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainId?: NullableIntFieldUpdateOperationsInput | number | null
    controlKind?: EnumControlKindFieldUpdateOperationsInput | $Enums.ControlKind
    executionMode?: EnumExecutionModeFieldUpdateOperationsInput | $Enums.ExecutionMode
    timelockAddress?: NullableStringFieldUpdateOperationsInput | string | null
    governorAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    upgrades?: ContractUpgradeUpdateManyWithoutContractNestedInput
    proposals?: StatusProposalUpdateManyWithoutContractNestedInput
  }

  export type DeployedContractUncheckedUpdateWithoutAttestationIssuersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    status?: EnumContractStatusFieldUpdateOperationsInput | $Enums.ContractStatus
    tvlUsd?: IntFieldUpdateOperationsInput | number
    audited?: BoolFieldUpdateOperationsInput | boolean
    deployedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chainId?: NullableIntFieldUpdateOperationsInput | number | null
    controlKind?: EnumControlKindFieldUpdateOperationsInput | $Enums.ControlKind
    executionMode?: EnumExecutionModeFieldUpdateOperationsInput | $Enums.ExecutionMode
    timelockAddress?: NullableStringFieldUpdateOperationsInput | string | null
    governorAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    upgrades?: ContractUpgradeUncheckedUpdateManyWithoutContractNestedInput
    proposals?: StatusProposalUncheckedUpdateManyWithoutContractNestedInput
  }

  export type ContractUpgradeCreateManyContractInput = {
    id: string
    contractName: string
    fromVersion: string
    toVersion: string
    upgradedAt: Date | string
    approvedBy: string
    createdAt?: Date | string
  }

  export type StatusProposalCreateManyContractInput = {
    id: string
    action: string
    status?: $Enums.ProposalStatus
    actorRef?: string | null
    txHash?: string | null
    calldata?: string | null
    broadcastJobId?: string | null
    error?: string | null
    createdAt?: Date | string
    executedAt?: Date | string | null
  }

  export type AttestationIssuerCreateManyRegistryContractInput = {
    id: string
    issuerAddress: string
    vertical: string
    accredited?: boolean
    onChainTxHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContractUpgradeUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractName?: StringFieldUpdateOperationsInput | string
    fromVersion?: StringFieldUpdateOperationsInput | string
    toVersion?: StringFieldUpdateOperationsInput | string
    upgradedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractUpgradeUncheckedUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractName?: StringFieldUpdateOperationsInput | string
    fromVersion?: StringFieldUpdateOperationsInput | string
    toVersion?: StringFieldUpdateOperationsInput | string
    upgradedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractUpgradeUncheckedUpdateManyWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    contractName?: StringFieldUpdateOperationsInput | string
    fromVersion?: StringFieldUpdateOperationsInput | string
    toVersion?: StringFieldUpdateOperationsInput | string
    upgradedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatusProposalUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    actorRef?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    calldata?: NullableStringFieldUpdateOperationsInput | string | null
    broadcastJobId?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StatusProposalUncheckedUpdateWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    actorRef?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    calldata?: NullableStringFieldUpdateOperationsInput | string | null
    broadcastJobId?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StatusProposalUncheckedUpdateManyWithoutContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumProposalStatusFieldUpdateOperationsInput | $Enums.ProposalStatus
    actorRef?: NullableStringFieldUpdateOperationsInput | string | null
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    calldata?: NullableStringFieldUpdateOperationsInput | string | null
    broadcastJobId?: NullableStringFieldUpdateOperationsInput | string | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AttestationIssuerUpdateWithoutRegistryContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    issuerAddress?: StringFieldUpdateOperationsInput | string
    vertical?: StringFieldUpdateOperationsInput | string
    accredited?: BoolFieldUpdateOperationsInput | boolean
    onChainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttestationIssuerUncheckedUpdateWithoutRegistryContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    issuerAddress?: StringFieldUpdateOperationsInput | string
    vertical?: StringFieldUpdateOperationsInput | string
    accredited?: BoolFieldUpdateOperationsInput | boolean
    onChainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttestationIssuerUncheckedUpdateManyWithoutRegistryContractInput = {
    id?: StringFieldUpdateOperationsInput | string
    issuerAddress?: StringFieldUpdateOperationsInput | string
    vertical?: StringFieldUpdateOperationsInput | string
    accredited?: BoolFieldUpdateOperationsInput | boolean
    onChainTxHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use DeployedContractCountOutputTypeDefaultArgs instead
     */
    export type DeployedContractCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeployedContractCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DeployedContractDefaultArgs instead
     */
    export type DeployedContractArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeployedContractDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContractUpgradeDefaultArgs instead
     */
    export type ContractUpgradeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContractUpgradeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StatusProposalDefaultArgs instead
     */
    export type StatusProposalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StatusProposalDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GovernanceDeploymentDefaultArgs instead
     */
    export type GovernanceDeploymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GovernanceDeploymentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AttestationIssuerDefaultArgs instead
     */
    export type AttestationIssuerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AttestationIssuerDefaultArgs<ExtArgs>

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