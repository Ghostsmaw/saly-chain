
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
 * Model Farmer
 * 
 */
export type Farmer = $Result.DefaultSelection<Prisma.$FarmerPayload>
/**
 * Model Farm
 * 
 */
export type Farm = $Result.DefaultSelection<Prisma.$FarmPayload>
/**
 * Model InputLoan
 * 
 */
export type InputLoan = $Result.DefaultSelection<Prisma.$InputLoanPayload>
/**
 * Model InsurancePolicy
 * 
 */
export type InsurancePolicy = $Result.DefaultSelection<Prisma.$InsurancePolicyPayload>
/**
 * Model ProduceLot
 * 
 */
export type ProduceLot = $Result.DefaultSelection<Prisma.$ProduceLotPayload>
/**
 * Model CustodyHandoff
 * 
 */
export type CustodyHandoff = $Result.DefaultSelection<Prisma.$CustodyHandoffPayload>
/**
 * Model OfftakeContract
 * 
 */
export type OfftakeContract = $Result.DefaultSelection<Prisma.$OfftakeContractPayload>

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


export const LoanStatus: {
  ACTIVE: 'ACTIVE',
  REPAID: 'REPAID',
  DEFAULTED: 'DEFAULTED'
};

export type LoanStatus = (typeof LoanStatus)[keyof typeof LoanStatus]


export const PolicyStatus: {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  CLAIMED: 'CLAIMED'
};

export type PolicyStatus = (typeof PolicyStatus)[keyof typeof PolicyStatus]

}

export type OutboxStatus = $Enums.OutboxStatus

export const OutboxStatus: typeof $Enums.OutboxStatus

export type LoanStatus = $Enums.LoanStatus

export const LoanStatus: typeof $Enums.LoanStatus

export type PolicyStatus = $Enums.PolicyStatus

export const PolicyStatus: typeof $Enums.PolicyStatus

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
   * `prisma.farmer`: Exposes CRUD operations for the **Farmer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Farmers
    * const farmers = await prisma.farmer.findMany()
    * ```
    */
  get farmer(): Prisma.FarmerDelegate<ExtArgs>;

  /**
   * `prisma.farm`: Exposes CRUD operations for the **Farm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Farms
    * const farms = await prisma.farm.findMany()
    * ```
    */
  get farm(): Prisma.FarmDelegate<ExtArgs>;

  /**
   * `prisma.inputLoan`: Exposes CRUD operations for the **InputLoan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InputLoans
    * const inputLoans = await prisma.inputLoan.findMany()
    * ```
    */
  get inputLoan(): Prisma.InputLoanDelegate<ExtArgs>;

  /**
   * `prisma.insurancePolicy`: Exposes CRUD operations for the **InsurancePolicy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InsurancePolicies
    * const insurancePolicies = await prisma.insurancePolicy.findMany()
    * ```
    */
  get insurancePolicy(): Prisma.InsurancePolicyDelegate<ExtArgs>;

  /**
   * `prisma.produceLot`: Exposes CRUD operations for the **ProduceLot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProduceLots
    * const produceLots = await prisma.produceLot.findMany()
    * ```
    */
  get produceLot(): Prisma.ProduceLotDelegate<ExtArgs>;

  /**
   * `prisma.custodyHandoff`: Exposes CRUD operations for the **CustodyHandoff** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustodyHandoffs
    * const custodyHandoffs = await prisma.custodyHandoff.findMany()
    * ```
    */
  get custodyHandoff(): Prisma.CustodyHandoffDelegate<ExtArgs>;

  /**
   * `prisma.offtakeContract`: Exposes CRUD operations for the **OfftakeContract** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OfftakeContracts
    * const offtakeContracts = await prisma.offtakeContract.findMany()
    * ```
    */
  get offtakeContract(): Prisma.OfftakeContractDelegate<ExtArgs>;
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
    Farmer: 'Farmer',
    Farm: 'Farm',
    InputLoan: 'InputLoan',
    InsurancePolicy: 'InsurancePolicy',
    ProduceLot: 'ProduceLot',
    CustodyHandoff: 'CustodyHandoff',
    OfftakeContract: 'OfftakeContract'
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
      modelProps: "eventOutbox" | "farmer" | "farm" | "inputLoan" | "insurancePolicy" | "produceLot" | "custodyHandoff" | "offtakeContract"
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
      Farmer: {
        payload: Prisma.$FarmerPayload<ExtArgs>
        fields: Prisma.FarmerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FarmerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FarmerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>
          }
          findFirst: {
            args: Prisma.FarmerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FarmerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>
          }
          findMany: {
            args: Prisma.FarmerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>[]
          }
          create: {
            args: Prisma.FarmerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>
          }
          createMany: {
            args: Prisma.FarmerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FarmerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>[]
          }
          delete: {
            args: Prisma.FarmerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>
          }
          update: {
            args: Prisma.FarmerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>
          }
          deleteMany: {
            args: Prisma.FarmerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FarmerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FarmerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerPayload>
          }
          aggregate: {
            args: Prisma.FarmerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFarmer>
          }
          groupBy: {
            args: Prisma.FarmerGroupByArgs<ExtArgs>
            result: $Utils.Optional<FarmerGroupByOutputType>[]
          }
          count: {
            args: Prisma.FarmerCountArgs<ExtArgs>
            result: $Utils.Optional<FarmerCountAggregateOutputType> | number
          }
        }
      }
      Farm: {
        payload: Prisma.$FarmPayload<ExtArgs>
        fields: Prisma.FarmFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FarmFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FarmFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          findFirst: {
            args: Prisma.FarmFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FarmFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          findMany: {
            args: Prisma.FarmFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          create: {
            args: Prisma.FarmCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          createMany: {
            args: Prisma.FarmCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FarmCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>[]
          }
          delete: {
            args: Prisma.FarmDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          update: {
            args: Prisma.FarmUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          deleteMany: {
            args: Prisma.FarmDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FarmUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FarmUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmPayload>
          }
          aggregate: {
            args: Prisma.FarmAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFarm>
          }
          groupBy: {
            args: Prisma.FarmGroupByArgs<ExtArgs>
            result: $Utils.Optional<FarmGroupByOutputType>[]
          }
          count: {
            args: Prisma.FarmCountArgs<ExtArgs>
            result: $Utils.Optional<FarmCountAggregateOutputType> | number
          }
        }
      }
      InputLoan: {
        payload: Prisma.$InputLoanPayload<ExtArgs>
        fields: Prisma.InputLoanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InputLoanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InputLoanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InputLoanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InputLoanPayload>
          }
          findFirst: {
            args: Prisma.InputLoanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InputLoanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InputLoanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InputLoanPayload>
          }
          findMany: {
            args: Prisma.InputLoanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InputLoanPayload>[]
          }
          create: {
            args: Prisma.InputLoanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InputLoanPayload>
          }
          createMany: {
            args: Prisma.InputLoanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InputLoanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InputLoanPayload>[]
          }
          delete: {
            args: Prisma.InputLoanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InputLoanPayload>
          }
          update: {
            args: Prisma.InputLoanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InputLoanPayload>
          }
          deleteMany: {
            args: Prisma.InputLoanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InputLoanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InputLoanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InputLoanPayload>
          }
          aggregate: {
            args: Prisma.InputLoanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInputLoan>
          }
          groupBy: {
            args: Prisma.InputLoanGroupByArgs<ExtArgs>
            result: $Utils.Optional<InputLoanGroupByOutputType>[]
          }
          count: {
            args: Prisma.InputLoanCountArgs<ExtArgs>
            result: $Utils.Optional<InputLoanCountAggregateOutputType> | number
          }
        }
      }
      InsurancePolicy: {
        payload: Prisma.$InsurancePolicyPayload<ExtArgs>
        fields: Prisma.InsurancePolicyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InsurancePolicyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsurancePolicyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InsurancePolicyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsurancePolicyPayload>
          }
          findFirst: {
            args: Prisma.InsurancePolicyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsurancePolicyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InsurancePolicyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsurancePolicyPayload>
          }
          findMany: {
            args: Prisma.InsurancePolicyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsurancePolicyPayload>[]
          }
          create: {
            args: Prisma.InsurancePolicyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsurancePolicyPayload>
          }
          createMany: {
            args: Prisma.InsurancePolicyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InsurancePolicyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsurancePolicyPayload>[]
          }
          delete: {
            args: Prisma.InsurancePolicyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsurancePolicyPayload>
          }
          update: {
            args: Prisma.InsurancePolicyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsurancePolicyPayload>
          }
          deleteMany: {
            args: Prisma.InsurancePolicyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InsurancePolicyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InsurancePolicyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InsurancePolicyPayload>
          }
          aggregate: {
            args: Prisma.InsurancePolicyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInsurancePolicy>
          }
          groupBy: {
            args: Prisma.InsurancePolicyGroupByArgs<ExtArgs>
            result: $Utils.Optional<InsurancePolicyGroupByOutputType>[]
          }
          count: {
            args: Prisma.InsurancePolicyCountArgs<ExtArgs>
            result: $Utils.Optional<InsurancePolicyCountAggregateOutputType> | number
          }
        }
      }
      ProduceLot: {
        payload: Prisma.$ProduceLotPayload<ExtArgs>
        fields: Prisma.ProduceLotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProduceLotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceLotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProduceLotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceLotPayload>
          }
          findFirst: {
            args: Prisma.ProduceLotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceLotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProduceLotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceLotPayload>
          }
          findMany: {
            args: Prisma.ProduceLotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceLotPayload>[]
          }
          create: {
            args: Prisma.ProduceLotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceLotPayload>
          }
          createMany: {
            args: Prisma.ProduceLotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProduceLotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceLotPayload>[]
          }
          delete: {
            args: Prisma.ProduceLotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceLotPayload>
          }
          update: {
            args: Prisma.ProduceLotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceLotPayload>
          }
          deleteMany: {
            args: Prisma.ProduceLotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProduceLotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProduceLotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceLotPayload>
          }
          aggregate: {
            args: Prisma.ProduceLotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduceLot>
          }
          groupBy: {
            args: Prisma.ProduceLotGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProduceLotGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProduceLotCountArgs<ExtArgs>
            result: $Utils.Optional<ProduceLotCountAggregateOutputType> | number
          }
        }
      }
      CustodyHandoff: {
        payload: Prisma.$CustodyHandoffPayload<ExtArgs>
        fields: Prisma.CustodyHandoffFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustodyHandoffFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyHandoffPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustodyHandoffFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyHandoffPayload>
          }
          findFirst: {
            args: Prisma.CustodyHandoffFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyHandoffPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustodyHandoffFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyHandoffPayload>
          }
          findMany: {
            args: Prisma.CustodyHandoffFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyHandoffPayload>[]
          }
          create: {
            args: Prisma.CustodyHandoffCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyHandoffPayload>
          }
          createMany: {
            args: Prisma.CustodyHandoffCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustodyHandoffCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyHandoffPayload>[]
          }
          delete: {
            args: Prisma.CustodyHandoffDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyHandoffPayload>
          }
          update: {
            args: Prisma.CustodyHandoffUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyHandoffPayload>
          }
          deleteMany: {
            args: Prisma.CustodyHandoffDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustodyHandoffUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustodyHandoffUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustodyHandoffPayload>
          }
          aggregate: {
            args: Prisma.CustodyHandoffAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustodyHandoff>
          }
          groupBy: {
            args: Prisma.CustodyHandoffGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustodyHandoffGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustodyHandoffCountArgs<ExtArgs>
            result: $Utils.Optional<CustodyHandoffCountAggregateOutputType> | number
          }
        }
      }
      OfftakeContract: {
        payload: Prisma.$OfftakeContractPayload<ExtArgs>
        fields: Prisma.OfftakeContractFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OfftakeContractFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfftakeContractPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OfftakeContractFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfftakeContractPayload>
          }
          findFirst: {
            args: Prisma.OfftakeContractFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfftakeContractPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OfftakeContractFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfftakeContractPayload>
          }
          findMany: {
            args: Prisma.OfftakeContractFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfftakeContractPayload>[]
          }
          create: {
            args: Prisma.OfftakeContractCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfftakeContractPayload>
          }
          createMany: {
            args: Prisma.OfftakeContractCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OfftakeContractCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfftakeContractPayload>[]
          }
          delete: {
            args: Prisma.OfftakeContractDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfftakeContractPayload>
          }
          update: {
            args: Prisma.OfftakeContractUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfftakeContractPayload>
          }
          deleteMany: {
            args: Prisma.OfftakeContractDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OfftakeContractUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OfftakeContractUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfftakeContractPayload>
          }
          aggregate: {
            args: Prisma.OfftakeContractAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOfftakeContract>
          }
          groupBy: {
            args: Prisma.OfftakeContractGroupByArgs<ExtArgs>
            result: $Utils.Optional<OfftakeContractGroupByOutputType>[]
          }
          count: {
            args: Prisma.OfftakeContractCountArgs<ExtArgs>
            result: $Utils.Optional<OfftakeContractCountAggregateOutputType> | number
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
   * Count Type FarmerCountOutputType
   */

  export type FarmerCountOutputType = {
    farms: number
  }

  export type FarmerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farms?: boolean | FarmerCountOutputTypeCountFarmsArgs
  }

  // Custom InputTypes
  /**
   * FarmerCountOutputType without action
   */
  export type FarmerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmerCountOutputType
     */
    select?: FarmerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FarmerCountOutputType without action
   */
  export type FarmerCountOutputTypeCountFarmsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmWhereInput
  }


  /**
   * Count Type FarmCountOutputType
   */

  export type FarmCountOutputType = {
    lots: number
  }

  export type FarmCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lots?: boolean | FarmCountOutputTypeCountLotsArgs
  }

  // Custom InputTypes
  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmCountOutputType
     */
    select?: FarmCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FarmCountOutputType without action
   */
  export type FarmCountOutputTypeCountLotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProduceLotWhereInput
  }


  /**
   * Count Type ProduceLotCountOutputType
   */

  export type ProduceLotCountOutputType = {
    custody: number
  }

  export type ProduceLotCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    custody?: boolean | ProduceLotCountOutputTypeCountCustodyArgs
  }

  // Custom InputTypes
  /**
   * ProduceLotCountOutputType without action
   */
  export type ProduceLotCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceLotCountOutputType
     */
    select?: ProduceLotCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProduceLotCountOutputType without action
   */
  export type ProduceLotCountOutputTypeCountCustodyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustodyHandoffWhereInput
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
   * Model Farmer
   */

  export type AggregateFarmer = {
    _count: FarmerCountAggregateOutputType | null
    _min: FarmerMinAggregateOutputType | null
    _max: FarmerMaxAggregateOutputType | null
  }

  export type FarmerMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    externalRef: string | null
    kycLite: string | null
    createdAt: Date | null
  }

  export type FarmerMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    externalRef: string | null
    kycLite: string | null
    createdAt: Date | null
  }

  export type FarmerCountAggregateOutputType = {
    id: number
    orgId: number
    externalRef: number
    kycLite: number
    createdAt: number
    _all: number
  }


  export type FarmerMinAggregateInputType = {
    id?: true
    orgId?: true
    externalRef?: true
    kycLite?: true
    createdAt?: true
  }

  export type FarmerMaxAggregateInputType = {
    id?: true
    orgId?: true
    externalRef?: true
    kycLite?: true
    createdAt?: true
  }

  export type FarmerCountAggregateInputType = {
    id?: true
    orgId?: true
    externalRef?: true
    kycLite?: true
    createdAt?: true
    _all?: true
  }

  export type FarmerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farmer to aggregate.
     */
    where?: FarmerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farmers to fetch.
     */
    orderBy?: FarmerOrderByWithRelationInput | FarmerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FarmerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farmers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farmers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Farmers
    **/
    _count?: true | FarmerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FarmerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FarmerMaxAggregateInputType
  }

  export type GetFarmerAggregateType<T extends FarmerAggregateArgs> = {
        [P in keyof T & keyof AggregateFarmer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFarmer[P]>
      : GetScalarType<T[P], AggregateFarmer[P]>
  }




  export type FarmerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmerWhereInput
    orderBy?: FarmerOrderByWithAggregationInput | FarmerOrderByWithAggregationInput[]
    by: FarmerScalarFieldEnum[] | FarmerScalarFieldEnum
    having?: FarmerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FarmerCountAggregateInputType | true
    _min?: FarmerMinAggregateInputType
    _max?: FarmerMaxAggregateInputType
  }

  export type FarmerGroupByOutputType = {
    id: string
    orgId: string
    externalRef: string
    kycLite: string
    createdAt: Date
    _count: FarmerCountAggregateOutputType | null
    _min: FarmerMinAggregateOutputType | null
    _max: FarmerMaxAggregateOutputType | null
  }

  type GetFarmerGroupByPayload<T extends FarmerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FarmerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FarmerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FarmerGroupByOutputType[P]>
            : GetScalarType<T[P], FarmerGroupByOutputType[P]>
        }
      >
    >


  export type FarmerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    externalRef?: boolean
    kycLite?: boolean
    createdAt?: boolean
    farms?: boolean | Farmer$farmsArgs<ExtArgs>
    _count?: boolean | FarmerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farmer"]>

  export type FarmerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    externalRef?: boolean
    kycLite?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["farmer"]>

  export type FarmerSelectScalar = {
    id?: boolean
    orgId?: boolean
    externalRef?: boolean
    kycLite?: boolean
    createdAt?: boolean
  }

  export type FarmerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farms?: boolean | Farmer$farmsArgs<ExtArgs>
    _count?: boolean | FarmerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FarmerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FarmerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Farmer"
    objects: {
      farms: Prisma.$FarmPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      externalRef: string
      kycLite: string
      createdAt: Date
    }, ExtArgs["result"]["farmer"]>
    composites: {}
  }

  type FarmerGetPayload<S extends boolean | null | undefined | FarmerDefaultArgs> = $Result.GetResult<Prisma.$FarmerPayload, S>

  type FarmerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FarmerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FarmerCountAggregateInputType | true
    }

  export interface FarmerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Farmer'], meta: { name: 'Farmer' } }
    /**
     * Find zero or one Farmer that matches the filter.
     * @param {FarmerFindUniqueArgs} args - Arguments to find a Farmer
     * @example
     * // Get one Farmer
     * const farmer = await prisma.farmer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FarmerFindUniqueArgs>(args: SelectSubset<T, FarmerFindUniqueArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Farmer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FarmerFindUniqueOrThrowArgs} args - Arguments to find a Farmer
     * @example
     * // Get one Farmer
     * const farmer = await prisma.farmer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FarmerFindUniqueOrThrowArgs>(args: SelectSubset<T, FarmerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Farmer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerFindFirstArgs} args - Arguments to find a Farmer
     * @example
     * // Get one Farmer
     * const farmer = await prisma.farmer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FarmerFindFirstArgs>(args?: SelectSubset<T, FarmerFindFirstArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Farmer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerFindFirstOrThrowArgs} args - Arguments to find a Farmer
     * @example
     * // Get one Farmer
     * const farmer = await prisma.farmer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FarmerFindFirstOrThrowArgs>(args?: SelectSubset<T, FarmerFindFirstOrThrowArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Farmers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Farmers
     * const farmers = await prisma.farmer.findMany()
     * 
     * // Get first 10 Farmers
     * const farmers = await prisma.farmer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const farmerWithIdOnly = await prisma.farmer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FarmerFindManyArgs>(args?: SelectSubset<T, FarmerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Farmer.
     * @param {FarmerCreateArgs} args - Arguments to create a Farmer.
     * @example
     * // Create one Farmer
     * const Farmer = await prisma.farmer.create({
     *   data: {
     *     // ... data to create a Farmer
     *   }
     * })
     * 
     */
    create<T extends FarmerCreateArgs>(args: SelectSubset<T, FarmerCreateArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Farmers.
     * @param {FarmerCreateManyArgs} args - Arguments to create many Farmers.
     * @example
     * // Create many Farmers
     * const farmer = await prisma.farmer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FarmerCreateManyArgs>(args?: SelectSubset<T, FarmerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Farmers and returns the data saved in the database.
     * @param {FarmerCreateManyAndReturnArgs} args - Arguments to create many Farmers.
     * @example
     * // Create many Farmers
     * const farmer = await prisma.farmer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Farmers and only return the `id`
     * const farmerWithIdOnly = await prisma.farmer.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FarmerCreateManyAndReturnArgs>(args?: SelectSubset<T, FarmerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Farmer.
     * @param {FarmerDeleteArgs} args - Arguments to delete one Farmer.
     * @example
     * // Delete one Farmer
     * const Farmer = await prisma.farmer.delete({
     *   where: {
     *     // ... filter to delete one Farmer
     *   }
     * })
     * 
     */
    delete<T extends FarmerDeleteArgs>(args: SelectSubset<T, FarmerDeleteArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Farmer.
     * @param {FarmerUpdateArgs} args - Arguments to update one Farmer.
     * @example
     * // Update one Farmer
     * const farmer = await prisma.farmer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FarmerUpdateArgs>(args: SelectSubset<T, FarmerUpdateArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Farmers.
     * @param {FarmerDeleteManyArgs} args - Arguments to filter Farmers to delete.
     * @example
     * // Delete a few Farmers
     * const { count } = await prisma.farmer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FarmerDeleteManyArgs>(args?: SelectSubset<T, FarmerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Farmers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Farmers
     * const farmer = await prisma.farmer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FarmerUpdateManyArgs>(args: SelectSubset<T, FarmerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Farmer.
     * @param {FarmerUpsertArgs} args - Arguments to update or create a Farmer.
     * @example
     * // Update or create a Farmer
     * const farmer = await prisma.farmer.upsert({
     *   create: {
     *     // ... data to create a Farmer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Farmer we want to update
     *   }
     * })
     */
    upsert<T extends FarmerUpsertArgs>(args: SelectSubset<T, FarmerUpsertArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Farmers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerCountArgs} args - Arguments to filter Farmers to count.
     * @example
     * // Count the number of Farmers
     * const count = await prisma.farmer.count({
     *   where: {
     *     // ... the filter for the Farmers we want to count
     *   }
     * })
    **/
    count<T extends FarmerCountArgs>(
      args?: Subset<T, FarmerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FarmerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Farmer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FarmerAggregateArgs>(args: Subset<T, FarmerAggregateArgs>): Prisma.PrismaPromise<GetFarmerAggregateType<T>>

    /**
     * Group by Farmer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerGroupByArgs} args - Group by arguments.
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
      T extends FarmerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FarmerGroupByArgs['orderBy'] }
        : { orderBy?: FarmerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FarmerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFarmerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Farmer model
   */
  readonly fields: FarmerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Farmer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FarmerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farms<T extends Farmer$farmsArgs<ExtArgs> = {}>(args?: Subset<T, Farmer$farmsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Farmer model
   */ 
  interface FarmerFieldRefs {
    readonly id: FieldRef<"Farmer", 'String'>
    readonly orgId: FieldRef<"Farmer", 'String'>
    readonly externalRef: FieldRef<"Farmer", 'String'>
    readonly kycLite: FieldRef<"Farmer", 'String'>
    readonly createdAt: FieldRef<"Farmer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Farmer findUnique
   */
  export type FarmerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * Filter, which Farmer to fetch.
     */
    where: FarmerWhereUniqueInput
  }

  /**
   * Farmer findUniqueOrThrow
   */
  export type FarmerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * Filter, which Farmer to fetch.
     */
    where: FarmerWhereUniqueInput
  }

  /**
   * Farmer findFirst
   */
  export type FarmerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * Filter, which Farmer to fetch.
     */
    where?: FarmerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farmers to fetch.
     */
    orderBy?: FarmerOrderByWithRelationInput | FarmerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farmers.
     */
    cursor?: FarmerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farmers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farmers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farmers.
     */
    distinct?: FarmerScalarFieldEnum | FarmerScalarFieldEnum[]
  }

  /**
   * Farmer findFirstOrThrow
   */
  export type FarmerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * Filter, which Farmer to fetch.
     */
    where?: FarmerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farmers to fetch.
     */
    orderBy?: FarmerOrderByWithRelationInput | FarmerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farmers.
     */
    cursor?: FarmerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farmers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farmers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farmers.
     */
    distinct?: FarmerScalarFieldEnum | FarmerScalarFieldEnum[]
  }

  /**
   * Farmer findMany
   */
  export type FarmerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * Filter, which Farmers to fetch.
     */
    where?: FarmerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farmers to fetch.
     */
    orderBy?: FarmerOrderByWithRelationInput | FarmerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Farmers.
     */
    cursor?: FarmerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farmers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farmers.
     */
    skip?: number
    distinct?: FarmerScalarFieldEnum | FarmerScalarFieldEnum[]
  }

  /**
   * Farmer create
   */
  export type FarmerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * The data needed to create a Farmer.
     */
    data: XOR<FarmerCreateInput, FarmerUncheckedCreateInput>
  }

  /**
   * Farmer createMany
   */
  export type FarmerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Farmers.
     */
    data: FarmerCreateManyInput | FarmerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Farmer createManyAndReturn
   */
  export type FarmerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Farmers.
     */
    data: FarmerCreateManyInput | FarmerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Farmer update
   */
  export type FarmerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * The data needed to update a Farmer.
     */
    data: XOR<FarmerUpdateInput, FarmerUncheckedUpdateInput>
    /**
     * Choose, which Farmer to update.
     */
    where: FarmerWhereUniqueInput
  }

  /**
   * Farmer updateMany
   */
  export type FarmerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Farmers.
     */
    data: XOR<FarmerUpdateManyMutationInput, FarmerUncheckedUpdateManyInput>
    /**
     * Filter which Farmers to update
     */
    where?: FarmerWhereInput
  }

  /**
   * Farmer upsert
   */
  export type FarmerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * The filter to search for the Farmer to update in case it exists.
     */
    where: FarmerWhereUniqueInput
    /**
     * In case the Farmer found by the `where` argument doesn't exist, create a new Farmer with this data.
     */
    create: XOR<FarmerCreateInput, FarmerUncheckedCreateInput>
    /**
     * In case the Farmer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FarmerUpdateInput, FarmerUncheckedUpdateInput>
  }

  /**
   * Farmer delete
   */
  export type FarmerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
    /**
     * Filter which Farmer to delete.
     */
    where: FarmerWhereUniqueInput
  }

  /**
   * Farmer deleteMany
   */
  export type FarmerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farmers to delete
     */
    where?: FarmerWhereInput
  }

  /**
   * Farmer.farms
   */
  export type Farmer$farmsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    where?: FarmWhereInput
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    cursor?: FarmWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farmer without action
   */
  export type FarmerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: FarmerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerInclude<ExtArgs> | null
  }


  /**
   * Model Farm
   */

  export type AggregateFarm = {
    _count: FarmCountAggregateOutputType | null
    _min: FarmMinAggregateOutputType | null
    _max: FarmMaxAggregateOutputType | null
  }

  export type FarmMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    farmerId: string | null
    crop: string | null
    season: string | null
    createdAt: Date | null
  }

  export type FarmMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    farmerId: string | null
    crop: string | null
    season: string | null
    createdAt: Date | null
  }

  export type FarmCountAggregateOutputType = {
    id: number
    orgId: number
    farmerId: number
    geo: number
    crop: number
    season: number
    createdAt: number
    _all: number
  }


  export type FarmMinAggregateInputType = {
    id?: true
    orgId?: true
    farmerId?: true
    crop?: true
    season?: true
    createdAt?: true
  }

  export type FarmMaxAggregateInputType = {
    id?: true
    orgId?: true
    farmerId?: true
    crop?: true
    season?: true
    createdAt?: true
  }

  export type FarmCountAggregateInputType = {
    id?: true
    orgId?: true
    farmerId?: true
    geo?: true
    crop?: true
    season?: true
    createdAt?: true
    _all?: true
  }

  export type FarmAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farm to aggregate.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Farms
    **/
    _count?: true | FarmCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FarmMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FarmMaxAggregateInputType
  }

  export type GetFarmAggregateType<T extends FarmAggregateArgs> = {
        [P in keyof T & keyof AggregateFarm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFarm[P]>
      : GetScalarType<T[P], AggregateFarm[P]>
  }




  export type FarmGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmWhereInput
    orderBy?: FarmOrderByWithAggregationInput | FarmOrderByWithAggregationInput[]
    by: FarmScalarFieldEnum[] | FarmScalarFieldEnum
    having?: FarmScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FarmCountAggregateInputType | true
    _min?: FarmMinAggregateInputType
    _max?: FarmMaxAggregateInputType
  }

  export type FarmGroupByOutputType = {
    id: string
    orgId: string
    farmerId: string
    geo: JsonValue | null
    crop: string | null
    season: string | null
    createdAt: Date
    _count: FarmCountAggregateOutputType | null
    _min: FarmMinAggregateOutputType | null
    _max: FarmMaxAggregateOutputType | null
  }

  type GetFarmGroupByPayload<T extends FarmGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FarmGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FarmGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FarmGroupByOutputType[P]>
            : GetScalarType<T[P], FarmGroupByOutputType[P]>
        }
      >
    >


  export type FarmSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    farmerId?: boolean
    geo?: boolean
    crop?: boolean
    season?: boolean
    createdAt?: boolean
    farmer?: boolean | FarmerDefaultArgs<ExtArgs>
    lots?: boolean | Farm$lotsArgs<ExtArgs>
    _count?: boolean | FarmCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farm"]>

  export type FarmSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    farmerId?: boolean
    geo?: boolean
    crop?: boolean
    season?: boolean
    createdAt?: boolean
    farmer?: boolean | FarmerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farm"]>

  export type FarmSelectScalar = {
    id?: boolean
    orgId?: boolean
    farmerId?: boolean
    geo?: boolean
    crop?: boolean
    season?: boolean
    createdAt?: boolean
  }

  export type FarmInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farmer?: boolean | FarmerDefaultArgs<ExtArgs>
    lots?: boolean | Farm$lotsArgs<ExtArgs>
    _count?: boolean | FarmCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FarmIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farmer?: boolean | FarmerDefaultArgs<ExtArgs>
  }

  export type $FarmPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Farm"
    objects: {
      farmer: Prisma.$FarmerPayload<ExtArgs>
      lots: Prisma.$ProduceLotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      farmerId: string
      geo: Prisma.JsonValue | null
      crop: string | null
      season: string | null
      createdAt: Date
    }, ExtArgs["result"]["farm"]>
    composites: {}
  }

  type FarmGetPayload<S extends boolean | null | undefined | FarmDefaultArgs> = $Result.GetResult<Prisma.$FarmPayload, S>

  type FarmCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FarmFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FarmCountAggregateInputType | true
    }

  export interface FarmDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Farm'], meta: { name: 'Farm' } }
    /**
     * Find zero or one Farm that matches the filter.
     * @param {FarmFindUniqueArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FarmFindUniqueArgs>(args: SelectSubset<T, FarmFindUniqueArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Farm that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FarmFindUniqueOrThrowArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FarmFindUniqueOrThrowArgs>(args: SelectSubset<T, FarmFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Farm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindFirstArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FarmFindFirstArgs>(args?: SelectSubset<T, FarmFindFirstArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Farm that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindFirstOrThrowArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FarmFindFirstOrThrowArgs>(args?: SelectSubset<T, FarmFindFirstOrThrowArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Farms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Farms
     * const farms = await prisma.farm.findMany()
     * 
     * // Get first 10 Farms
     * const farms = await prisma.farm.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const farmWithIdOnly = await prisma.farm.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FarmFindManyArgs>(args?: SelectSubset<T, FarmFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Farm.
     * @param {FarmCreateArgs} args - Arguments to create a Farm.
     * @example
     * // Create one Farm
     * const Farm = await prisma.farm.create({
     *   data: {
     *     // ... data to create a Farm
     *   }
     * })
     * 
     */
    create<T extends FarmCreateArgs>(args: SelectSubset<T, FarmCreateArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Farms.
     * @param {FarmCreateManyArgs} args - Arguments to create many Farms.
     * @example
     * // Create many Farms
     * const farm = await prisma.farm.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FarmCreateManyArgs>(args?: SelectSubset<T, FarmCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Farms and returns the data saved in the database.
     * @param {FarmCreateManyAndReturnArgs} args - Arguments to create many Farms.
     * @example
     * // Create many Farms
     * const farm = await prisma.farm.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Farms and only return the `id`
     * const farmWithIdOnly = await prisma.farm.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FarmCreateManyAndReturnArgs>(args?: SelectSubset<T, FarmCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Farm.
     * @param {FarmDeleteArgs} args - Arguments to delete one Farm.
     * @example
     * // Delete one Farm
     * const Farm = await prisma.farm.delete({
     *   where: {
     *     // ... filter to delete one Farm
     *   }
     * })
     * 
     */
    delete<T extends FarmDeleteArgs>(args: SelectSubset<T, FarmDeleteArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Farm.
     * @param {FarmUpdateArgs} args - Arguments to update one Farm.
     * @example
     * // Update one Farm
     * const farm = await prisma.farm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FarmUpdateArgs>(args: SelectSubset<T, FarmUpdateArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Farms.
     * @param {FarmDeleteManyArgs} args - Arguments to filter Farms to delete.
     * @example
     * // Delete a few Farms
     * const { count } = await prisma.farm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FarmDeleteManyArgs>(args?: SelectSubset<T, FarmDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Farms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Farms
     * const farm = await prisma.farm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FarmUpdateManyArgs>(args: SelectSubset<T, FarmUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Farm.
     * @param {FarmUpsertArgs} args - Arguments to update or create a Farm.
     * @example
     * // Update or create a Farm
     * const farm = await prisma.farm.upsert({
     *   create: {
     *     // ... data to create a Farm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Farm we want to update
     *   }
     * })
     */
    upsert<T extends FarmUpsertArgs>(args: SelectSubset<T, FarmUpsertArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Farms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmCountArgs} args - Arguments to filter Farms to count.
     * @example
     * // Count the number of Farms
     * const count = await prisma.farm.count({
     *   where: {
     *     // ... the filter for the Farms we want to count
     *   }
     * })
    **/
    count<T extends FarmCountArgs>(
      args?: Subset<T, FarmCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FarmCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Farm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FarmAggregateArgs>(args: Subset<T, FarmAggregateArgs>): Prisma.PrismaPromise<GetFarmAggregateType<T>>

    /**
     * Group by Farm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmGroupByArgs} args - Group by arguments.
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
      T extends FarmGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FarmGroupByArgs['orderBy'] }
        : { orderBy?: FarmGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FarmGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFarmGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Farm model
   */
  readonly fields: FarmFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Farm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FarmClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farmer<T extends FarmerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmerDefaultArgs<ExtArgs>>): Prisma__FarmerClient<$Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    lots<T extends Farm$lotsArgs<ExtArgs> = {}>(args?: Subset<T, Farm$lotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProduceLotPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Farm model
   */ 
  interface FarmFieldRefs {
    readonly id: FieldRef<"Farm", 'String'>
    readonly orgId: FieldRef<"Farm", 'String'>
    readonly farmerId: FieldRef<"Farm", 'String'>
    readonly geo: FieldRef<"Farm", 'Json'>
    readonly crop: FieldRef<"Farm", 'String'>
    readonly season: FieldRef<"Farm", 'String'>
    readonly createdAt: FieldRef<"Farm", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Farm findUnique
   */
  export type FarmFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm findUniqueOrThrow
   */
  export type FarmFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm findFirst
   */
  export type FarmFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     */
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm findFirstOrThrow
   */
  export type FarmFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farm to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     */
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm findMany
   */
  export type FarmFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter, which Farms to fetch.
     */
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     */
    orderBy?: FarmOrderByWithRelationInput | FarmOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Farms.
     */
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     */
    skip?: number
    distinct?: FarmScalarFieldEnum | FarmScalarFieldEnum[]
  }

  /**
   * Farm create
   */
  export type FarmCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The data needed to create a Farm.
     */
    data: XOR<FarmCreateInput, FarmUncheckedCreateInput>
  }

  /**
   * Farm createMany
   */
  export type FarmCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Farms.
     */
    data: FarmCreateManyInput | FarmCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Farm createManyAndReturn
   */
  export type FarmCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Farms.
     */
    data: FarmCreateManyInput | FarmCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Farm update
   */
  export type FarmUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The data needed to update a Farm.
     */
    data: XOR<FarmUpdateInput, FarmUncheckedUpdateInput>
    /**
     * Choose, which Farm to update.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm updateMany
   */
  export type FarmUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Farms.
     */
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyInput>
    /**
     * Filter which Farms to update
     */
    where?: FarmWhereInput
  }

  /**
   * Farm upsert
   */
  export type FarmUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * The filter to search for the Farm to update in case it exists.
     */
    where: FarmWhereUniqueInput
    /**
     * In case the Farm found by the `where` argument doesn't exist, create a new Farm with this data.
     */
    create: XOR<FarmCreateInput, FarmUncheckedCreateInput>
    /**
     * In case the Farm was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FarmUpdateInput, FarmUncheckedUpdateInput>
  }

  /**
   * Farm delete
   */
  export type FarmDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
    /**
     * Filter which Farm to delete.
     */
    where: FarmWhereUniqueInput
  }

  /**
   * Farm deleteMany
   */
  export type FarmDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Farms to delete
     */
    where?: FarmWhereInput
  }

  /**
   * Farm.lots
   */
  export type Farm$lotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceLot
     */
    select?: ProduceLotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceLotInclude<ExtArgs> | null
    where?: ProduceLotWhereInput
    orderBy?: ProduceLotOrderByWithRelationInput | ProduceLotOrderByWithRelationInput[]
    cursor?: ProduceLotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProduceLotScalarFieldEnum | ProduceLotScalarFieldEnum[]
  }

  /**
   * Farm without action
   */
  export type FarmDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farm
     */
    select?: FarmSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmInclude<ExtArgs> | null
  }


  /**
   * Model InputLoan
   */

  export type AggregateInputLoan = {
    _count: InputLoanCountAggregateOutputType | null
    _avg: InputLoanAvgAggregateOutputType | null
    _sum: InputLoanSumAggregateOutputType | null
    _min: InputLoanMinAggregateOutputType | null
    _max: InputLoanMaxAggregateOutputType | null
  }

  export type InputLoanAvgAggregateOutputType = {
    amountMinor: number | null
  }

  export type InputLoanSumAggregateOutputType = {
    amountMinor: bigint | null
  }

  export type InputLoanMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    farmerId: string | null
    amountMinor: bigint | null
    currency: string | null
    status: $Enums.LoanStatus | null
    payoutIntentId: string | null
    createdAt: Date | null
  }

  export type InputLoanMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    farmerId: string | null
    amountMinor: bigint | null
    currency: string | null
    status: $Enums.LoanStatus | null
    payoutIntentId: string | null
    createdAt: Date | null
  }

  export type InputLoanCountAggregateOutputType = {
    id: number
    orgId: number
    farmerId: number
    amountMinor: number
    currency: number
    status: number
    payoutIntentId: number
    createdAt: number
    _all: number
  }


  export type InputLoanAvgAggregateInputType = {
    amountMinor?: true
  }

  export type InputLoanSumAggregateInputType = {
    amountMinor?: true
  }

  export type InputLoanMinAggregateInputType = {
    id?: true
    orgId?: true
    farmerId?: true
    amountMinor?: true
    currency?: true
    status?: true
    payoutIntentId?: true
    createdAt?: true
  }

  export type InputLoanMaxAggregateInputType = {
    id?: true
    orgId?: true
    farmerId?: true
    amountMinor?: true
    currency?: true
    status?: true
    payoutIntentId?: true
    createdAt?: true
  }

  export type InputLoanCountAggregateInputType = {
    id?: true
    orgId?: true
    farmerId?: true
    amountMinor?: true
    currency?: true
    status?: true
    payoutIntentId?: true
    createdAt?: true
    _all?: true
  }

  export type InputLoanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InputLoan to aggregate.
     */
    where?: InputLoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InputLoans to fetch.
     */
    orderBy?: InputLoanOrderByWithRelationInput | InputLoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InputLoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InputLoans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InputLoans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InputLoans
    **/
    _count?: true | InputLoanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InputLoanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InputLoanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InputLoanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InputLoanMaxAggregateInputType
  }

  export type GetInputLoanAggregateType<T extends InputLoanAggregateArgs> = {
        [P in keyof T & keyof AggregateInputLoan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInputLoan[P]>
      : GetScalarType<T[P], AggregateInputLoan[P]>
  }




  export type InputLoanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InputLoanWhereInput
    orderBy?: InputLoanOrderByWithAggregationInput | InputLoanOrderByWithAggregationInput[]
    by: InputLoanScalarFieldEnum[] | InputLoanScalarFieldEnum
    having?: InputLoanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InputLoanCountAggregateInputType | true
    _avg?: InputLoanAvgAggregateInputType
    _sum?: InputLoanSumAggregateInputType
    _min?: InputLoanMinAggregateInputType
    _max?: InputLoanMaxAggregateInputType
  }

  export type InputLoanGroupByOutputType = {
    id: string
    orgId: string
    farmerId: string
    amountMinor: bigint
    currency: string
    status: $Enums.LoanStatus
    payoutIntentId: string | null
    createdAt: Date
    _count: InputLoanCountAggregateOutputType | null
    _avg: InputLoanAvgAggregateOutputType | null
    _sum: InputLoanSumAggregateOutputType | null
    _min: InputLoanMinAggregateOutputType | null
    _max: InputLoanMaxAggregateOutputType | null
  }

  type GetInputLoanGroupByPayload<T extends InputLoanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InputLoanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InputLoanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InputLoanGroupByOutputType[P]>
            : GetScalarType<T[P], InputLoanGroupByOutputType[P]>
        }
      >
    >


  export type InputLoanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    farmerId?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    payoutIntentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["inputLoan"]>

  export type InputLoanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    farmerId?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    payoutIntentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["inputLoan"]>

  export type InputLoanSelectScalar = {
    id?: boolean
    orgId?: boolean
    farmerId?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    payoutIntentId?: boolean
    createdAt?: boolean
  }


  export type $InputLoanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InputLoan"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      farmerId: string
      amountMinor: bigint
      currency: string
      status: $Enums.LoanStatus
      payoutIntentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["inputLoan"]>
    composites: {}
  }

  type InputLoanGetPayload<S extends boolean | null | undefined | InputLoanDefaultArgs> = $Result.GetResult<Prisma.$InputLoanPayload, S>

  type InputLoanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InputLoanFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InputLoanCountAggregateInputType | true
    }

  export interface InputLoanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InputLoan'], meta: { name: 'InputLoan' } }
    /**
     * Find zero or one InputLoan that matches the filter.
     * @param {InputLoanFindUniqueArgs} args - Arguments to find a InputLoan
     * @example
     * // Get one InputLoan
     * const inputLoan = await prisma.inputLoan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InputLoanFindUniqueArgs>(args: SelectSubset<T, InputLoanFindUniqueArgs<ExtArgs>>): Prisma__InputLoanClient<$Result.GetResult<Prisma.$InputLoanPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one InputLoan that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InputLoanFindUniqueOrThrowArgs} args - Arguments to find a InputLoan
     * @example
     * // Get one InputLoan
     * const inputLoan = await prisma.inputLoan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InputLoanFindUniqueOrThrowArgs>(args: SelectSubset<T, InputLoanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InputLoanClient<$Result.GetResult<Prisma.$InputLoanPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first InputLoan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InputLoanFindFirstArgs} args - Arguments to find a InputLoan
     * @example
     * // Get one InputLoan
     * const inputLoan = await prisma.inputLoan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InputLoanFindFirstArgs>(args?: SelectSubset<T, InputLoanFindFirstArgs<ExtArgs>>): Prisma__InputLoanClient<$Result.GetResult<Prisma.$InputLoanPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first InputLoan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InputLoanFindFirstOrThrowArgs} args - Arguments to find a InputLoan
     * @example
     * // Get one InputLoan
     * const inputLoan = await prisma.inputLoan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InputLoanFindFirstOrThrowArgs>(args?: SelectSubset<T, InputLoanFindFirstOrThrowArgs<ExtArgs>>): Prisma__InputLoanClient<$Result.GetResult<Prisma.$InputLoanPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more InputLoans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InputLoanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InputLoans
     * const inputLoans = await prisma.inputLoan.findMany()
     * 
     * // Get first 10 InputLoans
     * const inputLoans = await prisma.inputLoan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inputLoanWithIdOnly = await prisma.inputLoan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InputLoanFindManyArgs>(args?: SelectSubset<T, InputLoanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InputLoanPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a InputLoan.
     * @param {InputLoanCreateArgs} args - Arguments to create a InputLoan.
     * @example
     * // Create one InputLoan
     * const InputLoan = await prisma.inputLoan.create({
     *   data: {
     *     // ... data to create a InputLoan
     *   }
     * })
     * 
     */
    create<T extends InputLoanCreateArgs>(args: SelectSubset<T, InputLoanCreateArgs<ExtArgs>>): Prisma__InputLoanClient<$Result.GetResult<Prisma.$InputLoanPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many InputLoans.
     * @param {InputLoanCreateManyArgs} args - Arguments to create many InputLoans.
     * @example
     * // Create many InputLoans
     * const inputLoan = await prisma.inputLoan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InputLoanCreateManyArgs>(args?: SelectSubset<T, InputLoanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InputLoans and returns the data saved in the database.
     * @param {InputLoanCreateManyAndReturnArgs} args - Arguments to create many InputLoans.
     * @example
     * // Create many InputLoans
     * const inputLoan = await prisma.inputLoan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InputLoans and only return the `id`
     * const inputLoanWithIdOnly = await prisma.inputLoan.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InputLoanCreateManyAndReturnArgs>(args?: SelectSubset<T, InputLoanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InputLoanPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a InputLoan.
     * @param {InputLoanDeleteArgs} args - Arguments to delete one InputLoan.
     * @example
     * // Delete one InputLoan
     * const InputLoan = await prisma.inputLoan.delete({
     *   where: {
     *     // ... filter to delete one InputLoan
     *   }
     * })
     * 
     */
    delete<T extends InputLoanDeleteArgs>(args: SelectSubset<T, InputLoanDeleteArgs<ExtArgs>>): Prisma__InputLoanClient<$Result.GetResult<Prisma.$InputLoanPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one InputLoan.
     * @param {InputLoanUpdateArgs} args - Arguments to update one InputLoan.
     * @example
     * // Update one InputLoan
     * const inputLoan = await prisma.inputLoan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InputLoanUpdateArgs>(args: SelectSubset<T, InputLoanUpdateArgs<ExtArgs>>): Prisma__InputLoanClient<$Result.GetResult<Prisma.$InputLoanPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more InputLoans.
     * @param {InputLoanDeleteManyArgs} args - Arguments to filter InputLoans to delete.
     * @example
     * // Delete a few InputLoans
     * const { count } = await prisma.inputLoan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InputLoanDeleteManyArgs>(args?: SelectSubset<T, InputLoanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InputLoans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InputLoanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InputLoans
     * const inputLoan = await prisma.inputLoan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InputLoanUpdateManyArgs>(args: SelectSubset<T, InputLoanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InputLoan.
     * @param {InputLoanUpsertArgs} args - Arguments to update or create a InputLoan.
     * @example
     * // Update or create a InputLoan
     * const inputLoan = await prisma.inputLoan.upsert({
     *   create: {
     *     // ... data to create a InputLoan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InputLoan we want to update
     *   }
     * })
     */
    upsert<T extends InputLoanUpsertArgs>(args: SelectSubset<T, InputLoanUpsertArgs<ExtArgs>>): Prisma__InputLoanClient<$Result.GetResult<Prisma.$InputLoanPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of InputLoans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InputLoanCountArgs} args - Arguments to filter InputLoans to count.
     * @example
     * // Count the number of InputLoans
     * const count = await prisma.inputLoan.count({
     *   where: {
     *     // ... the filter for the InputLoans we want to count
     *   }
     * })
    **/
    count<T extends InputLoanCountArgs>(
      args?: Subset<T, InputLoanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InputLoanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InputLoan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InputLoanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InputLoanAggregateArgs>(args: Subset<T, InputLoanAggregateArgs>): Prisma.PrismaPromise<GetInputLoanAggregateType<T>>

    /**
     * Group by InputLoan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InputLoanGroupByArgs} args - Group by arguments.
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
      T extends InputLoanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InputLoanGroupByArgs['orderBy'] }
        : { orderBy?: InputLoanGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InputLoanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInputLoanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InputLoan model
   */
  readonly fields: InputLoanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InputLoan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InputLoanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the InputLoan model
   */ 
  interface InputLoanFieldRefs {
    readonly id: FieldRef<"InputLoan", 'String'>
    readonly orgId: FieldRef<"InputLoan", 'String'>
    readonly farmerId: FieldRef<"InputLoan", 'String'>
    readonly amountMinor: FieldRef<"InputLoan", 'BigInt'>
    readonly currency: FieldRef<"InputLoan", 'String'>
    readonly status: FieldRef<"InputLoan", 'LoanStatus'>
    readonly payoutIntentId: FieldRef<"InputLoan", 'String'>
    readonly createdAt: FieldRef<"InputLoan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InputLoan findUnique
   */
  export type InputLoanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InputLoan
     */
    select?: InputLoanSelect<ExtArgs> | null
    /**
     * Filter, which InputLoan to fetch.
     */
    where: InputLoanWhereUniqueInput
  }

  /**
   * InputLoan findUniqueOrThrow
   */
  export type InputLoanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InputLoan
     */
    select?: InputLoanSelect<ExtArgs> | null
    /**
     * Filter, which InputLoan to fetch.
     */
    where: InputLoanWhereUniqueInput
  }

  /**
   * InputLoan findFirst
   */
  export type InputLoanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InputLoan
     */
    select?: InputLoanSelect<ExtArgs> | null
    /**
     * Filter, which InputLoan to fetch.
     */
    where?: InputLoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InputLoans to fetch.
     */
    orderBy?: InputLoanOrderByWithRelationInput | InputLoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InputLoans.
     */
    cursor?: InputLoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InputLoans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InputLoans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InputLoans.
     */
    distinct?: InputLoanScalarFieldEnum | InputLoanScalarFieldEnum[]
  }

  /**
   * InputLoan findFirstOrThrow
   */
  export type InputLoanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InputLoan
     */
    select?: InputLoanSelect<ExtArgs> | null
    /**
     * Filter, which InputLoan to fetch.
     */
    where?: InputLoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InputLoans to fetch.
     */
    orderBy?: InputLoanOrderByWithRelationInput | InputLoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InputLoans.
     */
    cursor?: InputLoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InputLoans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InputLoans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InputLoans.
     */
    distinct?: InputLoanScalarFieldEnum | InputLoanScalarFieldEnum[]
  }

  /**
   * InputLoan findMany
   */
  export type InputLoanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InputLoan
     */
    select?: InputLoanSelect<ExtArgs> | null
    /**
     * Filter, which InputLoans to fetch.
     */
    where?: InputLoanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InputLoans to fetch.
     */
    orderBy?: InputLoanOrderByWithRelationInput | InputLoanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InputLoans.
     */
    cursor?: InputLoanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InputLoans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InputLoans.
     */
    skip?: number
    distinct?: InputLoanScalarFieldEnum | InputLoanScalarFieldEnum[]
  }

  /**
   * InputLoan create
   */
  export type InputLoanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InputLoan
     */
    select?: InputLoanSelect<ExtArgs> | null
    /**
     * The data needed to create a InputLoan.
     */
    data: XOR<InputLoanCreateInput, InputLoanUncheckedCreateInput>
  }

  /**
   * InputLoan createMany
   */
  export type InputLoanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InputLoans.
     */
    data: InputLoanCreateManyInput | InputLoanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InputLoan createManyAndReturn
   */
  export type InputLoanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InputLoan
     */
    select?: InputLoanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many InputLoans.
     */
    data: InputLoanCreateManyInput | InputLoanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InputLoan update
   */
  export type InputLoanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InputLoan
     */
    select?: InputLoanSelect<ExtArgs> | null
    /**
     * The data needed to update a InputLoan.
     */
    data: XOR<InputLoanUpdateInput, InputLoanUncheckedUpdateInput>
    /**
     * Choose, which InputLoan to update.
     */
    where: InputLoanWhereUniqueInput
  }

  /**
   * InputLoan updateMany
   */
  export type InputLoanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InputLoans.
     */
    data: XOR<InputLoanUpdateManyMutationInput, InputLoanUncheckedUpdateManyInput>
    /**
     * Filter which InputLoans to update
     */
    where?: InputLoanWhereInput
  }

  /**
   * InputLoan upsert
   */
  export type InputLoanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InputLoan
     */
    select?: InputLoanSelect<ExtArgs> | null
    /**
     * The filter to search for the InputLoan to update in case it exists.
     */
    where: InputLoanWhereUniqueInput
    /**
     * In case the InputLoan found by the `where` argument doesn't exist, create a new InputLoan with this data.
     */
    create: XOR<InputLoanCreateInput, InputLoanUncheckedCreateInput>
    /**
     * In case the InputLoan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InputLoanUpdateInput, InputLoanUncheckedUpdateInput>
  }

  /**
   * InputLoan delete
   */
  export type InputLoanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InputLoan
     */
    select?: InputLoanSelect<ExtArgs> | null
    /**
     * Filter which InputLoan to delete.
     */
    where: InputLoanWhereUniqueInput
  }

  /**
   * InputLoan deleteMany
   */
  export type InputLoanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InputLoans to delete
     */
    where?: InputLoanWhereInput
  }

  /**
   * InputLoan without action
   */
  export type InputLoanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InputLoan
     */
    select?: InputLoanSelect<ExtArgs> | null
  }


  /**
   * Model InsurancePolicy
   */

  export type AggregateInsurancePolicy = {
    _count: InsurancePolicyCountAggregateOutputType | null
    _avg: InsurancePolicyAvgAggregateOutputType | null
    _sum: InsurancePolicySumAggregateOutputType | null
    _min: InsurancePolicyMinAggregateOutputType | null
    _max: InsurancePolicyMaxAggregateOutputType | null
  }

  export type InsurancePolicyAvgAggregateOutputType = {
    premiumMinor: number | null
    payoutMinor: number | null
  }

  export type InsurancePolicySumAggregateOutputType = {
    premiumMinor: bigint | null
    payoutMinor: bigint | null
  }

  export type InsurancePolicyMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    farmerId: string | null
    triggerMetric: string | null
    threshold: string | null
    premiumMinor: bigint | null
    payoutMinor: bigint | null
    currency: string | null
    status: $Enums.PolicyStatus | null
    createdAt: Date | null
  }

  export type InsurancePolicyMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    farmerId: string | null
    triggerMetric: string | null
    threshold: string | null
    premiumMinor: bigint | null
    payoutMinor: bigint | null
    currency: string | null
    status: $Enums.PolicyStatus | null
    createdAt: Date | null
  }

  export type InsurancePolicyCountAggregateOutputType = {
    id: number
    orgId: number
    farmerId: number
    triggerMetric: number
    threshold: number
    premiumMinor: number
    payoutMinor: number
    currency: number
    status: number
    createdAt: number
    _all: number
  }


  export type InsurancePolicyAvgAggregateInputType = {
    premiumMinor?: true
    payoutMinor?: true
  }

  export type InsurancePolicySumAggregateInputType = {
    premiumMinor?: true
    payoutMinor?: true
  }

  export type InsurancePolicyMinAggregateInputType = {
    id?: true
    orgId?: true
    farmerId?: true
    triggerMetric?: true
    threshold?: true
    premiumMinor?: true
    payoutMinor?: true
    currency?: true
    status?: true
    createdAt?: true
  }

  export type InsurancePolicyMaxAggregateInputType = {
    id?: true
    orgId?: true
    farmerId?: true
    triggerMetric?: true
    threshold?: true
    premiumMinor?: true
    payoutMinor?: true
    currency?: true
    status?: true
    createdAt?: true
  }

  export type InsurancePolicyCountAggregateInputType = {
    id?: true
    orgId?: true
    farmerId?: true
    triggerMetric?: true
    threshold?: true
    premiumMinor?: true
    payoutMinor?: true
    currency?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type InsurancePolicyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InsurancePolicy to aggregate.
     */
    where?: InsurancePolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InsurancePolicies to fetch.
     */
    orderBy?: InsurancePolicyOrderByWithRelationInput | InsurancePolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InsurancePolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InsurancePolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InsurancePolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InsurancePolicies
    **/
    _count?: true | InsurancePolicyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InsurancePolicyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InsurancePolicySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InsurancePolicyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InsurancePolicyMaxAggregateInputType
  }

  export type GetInsurancePolicyAggregateType<T extends InsurancePolicyAggregateArgs> = {
        [P in keyof T & keyof AggregateInsurancePolicy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInsurancePolicy[P]>
      : GetScalarType<T[P], AggregateInsurancePolicy[P]>
  }




  export type InsurancePolicyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InsurancePolicyWhereInput
    orderBy?: InsurancePolicyOrderByWithAggregationInput | InsurancePolicyOrderByWithAggregationInput[]
    by: InsurancePolicyScalarFieldEnum[] | InsurancePolicyScalarFieldEnum
    having?: InsurancePolicyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InsurancePolicyCountAggregateInputType | true
    _avg?: InsurancePolicyAvgAggregateInputType
    _sum?: InsurancePolicySumAggregateInputType
    _min?: InsurancePolicyMinAggregateInputType
    _max?: InsurancePolicyMaxAggregateInputType
  }

  export type InsurancePolicyGroupByOutputType = {
    id: string
    orgId: string
    farmerId: string
    triggerMetric: string
    threshold: string
    premiumMinor: bigint
    payoutMinor: bigint
    currency: string
    status: $Enums.PolicyStatus
    createdAt: Date
    _count: InsurancePolicyCountAggregateOutputType | null
    _avg: InsurancePolicyAvgAggregateOutputType | null
    _sum: InsurancePolicySumAggregateOutputType | null
    _min: InsurancePolicyMinAggregateOutputType | null
    _max: InsurancePolicyMaxAggregateOutputType | null
  }

  type GetInsurancePolicyGroupByPayload<T extends InsurancePolicyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InsurancePolicyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InsurancePolicyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InsurancePolicyGroupByOutputType[P]>
            : GetScalarType<T[P], InsurancePolicyGroupByOutputType[P]>
        }
      >
    >


  export type InsurancePolicySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    farmerId?: boolean
    triggerMetric?: boolean
    threshold?: boolean
    premiumMinor?: boolean
    payoutMinor?: boolean
    currency?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["insurancePolicy"]>

  export type InsurancePolicySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    farmerId?: boolean
    triggerMetric?: boolean
    threshold?: boolean
    premiumMinor?: boolean
    payoutMinor?: boolean
    currency?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["insurancePolicy"]>

  export type InsurancePolicySelectScalar = {
    id?: boolean
    orgId?: boolean
    farmerId?: boolean
    triggerMetric?: boolean
    threshold?: boolean
    premiumMinor?: boolean
    payoutMinor?: boolean
    currency?: boolean
    status?: boolean
    createdAt?: boolean
  }


  export type $InsurancePolicyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InsurancePolicy"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      farmerId: string
      triggerMetric: string
      threshold: string
      premiumMinor: bigint
      payoutMinor: bigint
      currency: string
      status: $Enums.PolicyStatus
      createdAt: Date
    }, ExtArgs["result"]["insurancePolicy"]>
    composites: {}
  }

  type InsurancePolicyGetPayload<S extends boolean | null | undefined | InsurancePolicyDefaultArgs> = $Result.GetResult<Prisma.$InsurancePolicyPayload, S>

  type InsurancePolicyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InsurancePolicyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InsurancePolicyCountAggregateInputType | true
    }

  export interface InsurancePolicyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InsurancePolicy'], meta: { name: 'InsurancePolicy' } }
    /**
     * Find zero or one InsurancePolicy that matches the filter.
     * @param {InsurancePolicyFindUniqueArgs} args - Arguments to find a InsurancePolicy
     * @example
     * // Get one InsurancePolicy
     * const insurancePolicy = await prisma.insurancePolicy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InsurancePolicyFindUniqueArgs>(args: SelectSubset<T, InsurancePolicyFindUniqueArgs<ExtArgs>>): Prisma__InsurancePolicyClient<$Result.GetResult<Prisma.$InsurancePolicyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one InsurancePolicy that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InsurancePolicyFindUniqueOrThrowArgs} args - Arguments to find a InsurancePolicy
     * @example
     * // Get one InsurancePolicy
     * const insurancePolicy = await prisma.insurancePolicy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InsurancePolicyFindUniqueOrThrowArgs>(args: SelectSubset<T, InsurancePolicyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InsurancePolicyClient<$Result.GetResult<Prisma.$InsurancePolicyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first InsurancePolicy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsurancePolicyFindFirstArgs} args - Arguments to find a InsurancePolicy
     * @example
     * // Get one InsurancePolicy
     * const insurancePolicy = await prisma.insurancePolicy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InsurancePolicyFindFirstArgs>(args?: SelectSubset<T, InsurancePolicyFindFirstArgs<ExtArgs>>): Prisma__InsurancePolicyClient<$Result.GetResult<Prisma.$InsurancePolicyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first InsurancePolicy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsurancePolicyFindFirstOrThrowArgs} args - Arguments to find a InsurancePolicy
     * @example
     * // Get one InsurancePolicy
     * const insurancePolicy = await prisma.insurancePolicy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InsurancePolicyFindFirstOrThrowArgs>(args?: SelectSubset<T, InsurancePolicyFindFirstOrThrowArgs<ExtArgs>>): Prisma__InsurancePolicyClient<$Result.GetResult<Prisma.$InsurancePolicyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more InsurancePolicies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsurancePolicyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InsurancePolicies
     * const insurancePolicies = await prisma.insurancePolicy.findMany()
     * 
     * // Get first 10 InsurancePolicies
     * const insurancePolicies = await prisma.insurancePolicy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const insurancePolicyWithIdOnly = await prisma.insurancePolicy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InsurancePolicyFindManyArgs>(args?: SelectSubset<T, InsurancePolicyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsurancePolicyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a InsurancePolicy.
     * @param {InsurancePolicyCreateArgs} args - Arguments to create a InsurancePolicy.
     * @example
     * // Create one InsurancePolicy
     * const InsurancePolicy = await prisma.insurancePolicy.create({
     *   data: {
     *     // ... data to create a InsurancePolicy
     *   }
     * })
     * 
     */
    create<T extends InsurancePolicyCreateArgs>(args: SelectSubset<T, InsurancePolicyCreateArgs<ExtArgs>>): Prisma__InsurancePolicyClient<$Result.GetResult<Prisma.$InsurancePolicyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many InsurancePolicies.
     * @param {InsurancePolicyCreateManyArgs} args - Arguments to create many InsurancePolicies.
     * @example
     * // Create many InsurancePolicies
     * const insurancePolicy = await prisma.insurancePolicy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InsurancePolicyCreateManyArgs>(args?: SelectSubset<T, InsurancePolicyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InsurancePolicies and returns the data saved in the database.
     * @param {InsurancePolicyCreateManyAndReturnArgs} args - Arguments to create many InsurancePolicies.
     * @example
     * // Create many InsurancePolicies
     * const insurancePolicy = await prisma.insurancePolicy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InsurancePolicies and only return the `id`
     * const insurancePolicyWithIdOnly = await prisma.insurancePolicy.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InsurancePolicyCreateManyAndReturnArgs>(args?: SelectSubset<T, InsurancePolicyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InsurancePolicyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a InsurancePolicy.
     * @param {InsurancePolicyDeleteArgs} args - Arguments to delete one InsurancePolicy.
     * @example
     * // Delete one InsurancePolicy
     * const InsurancePolicy = await prisma.insurancePolicy.delete({
     *   where: {
     *     // ... filter to delete one InsurancePolicy
     *   }
     * })
     * 
     */
    delete<T extends InsurancePolicyDeleteArgs>(args: SelectSubset<T, InsurancePolicyDeleteArgs<ExtArgs>>): Prisma__InsurancePolicyClient<$Result.GetResult<Prisma.$InsurancePolicyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one InsurancePolicy.
     * @param {InsurancePolicyUpdateArgs} args - Arguments to update one InsurancePolicy.
     * @example
     * // Update one InsurancePolicy
     * const insurancePolicy = await prisma.insurancePolicy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InsurancePolicyUpdateArgs>(args: SelectSubset<T, InsurancePolicyUpdateArgs<ExtArgs>>): Prisma__InsurancePolicyClient<$Result.GetResult<Prisma.$InsurancePolicyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more InsurancePolicies.
     * @param {InsurancePolicyDeleteManyArgs} args - Arguments to filter InsurancePolicies to delete.
     * @example
     * // Delete a few InsurancePolicies
     * const { count } = await prisma.insurancePolicy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InsurancePolicyDeleteManyArgs>(args?: SelectSubset<T, InsurancePolicyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InsurancePolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsurancePolicyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InsurancePolicies
     * const insurancePolicy = await prisma.insurancePolicy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InsurancePolicyUpdateManyArgs>(args: SelectSubset<T, InsurancePolicyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InsurancePolicy.
     * @param {InsurancePolicyUpsertArgs} args - Arguments to update or create a InsurancePolicy.
     * @example
     * // Update or create a InsurancePolicy
     * const insurancePolicy = await prisma.insurancePolicy.upsert({
     *   create: {
     *     // ... data to create a InsurancePolicy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InsurancePolicy we want to update
     *   }
     * })
     */
    upsert<T extends InsurancePolicyUpsertArgs>(args: SelectSubset<T, InsurancePolicyUpsertArgs<ExtArgs>>): Prisma__InsurancePolicyClient<$Result.GetResult<Prisma.$InsurancePolicyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of InsurancePolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsurancePolicyCountArgs} args - Arguments to filter InsurancePolicies to count.
     * @example
     * // Count the number of InsurancePolicies
     * const count = await prisma.insurancePolicy.count({
     *   where: {
     *     // ... the filter for the InsurancePolicies we want to count
     *   }
     * })
    **/
    count<T extends InsurancePolicyCountArgs>(
      args?: Subset<T, InsurancePolicyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InsurancePolicyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InsurancePolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsurancePolicyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InsurancePolicyAggregateArgs>(args: Subset<T, InsurancePolicyAggregateArgs>): Prisma.PrismaPromise<GetInsurancePolicyAggregateType<T>>

    /**
     * Group by InsurancePolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InsurancePolicyGroupByArgs} args - Group by arguments.
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
      T extends InsurancePolicyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InsurancePolicyGroupByArgs['orderBy'] }
        : { orderBy?: InsurancePolicyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InsurancePolicyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInsurancePolicyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InsurancePolicy model
   */
  readonly fields: InsurancePolicyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InsurancePolicy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InsurancePolicyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the InsurancePolicy model
   */ 
  interface InsurancePolicyFieldRefs {
    readonly id: FieldRef<"InsurancePolicy", 'String'>
    readonly orgId: FieldRef<"InsurancePolicy", 'String'>
    readonly farmerId: FieldRef<"InsurancePolicy", 'String'>
    readonly triggerMetric: FieldRef<"InsurancePolicy", 'String'>
    readonly threshold: FieldRef<"InsurancePolicy", 'String'>
    readonly premiumMinor: FieldRef<"InsurancePolicy", 'BigInt'>
    readonly payoutMinor: FieldRef<"InsurancePolicy", 'BigInt'>
    readonly currency: FieldRef<"InsurancePolicy", 'String'>
    readonly status: FieldRef<"InsurancePolicy", 'PolicyStatus'>
    readonly createdAt: FieldRef<"InsurancePolicy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InsurancePolicy findUnique
   */
  export type InsurancePolicyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsurancePolicy
     */
    select?: InsurancePolicySelect<ExtArgs> | null
    /**
     * Filter, which InsurancePolicy to fetch.
     */
    where: InsurancePolicyWhereUniqueInput
  }

  /**
   * InsurancePolicy findUniqueOrThrow
   */
  export type InsurancePolicyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsurancePolicy
     */
    select?: InsurancePolicySelect<ExtArgs> | null
    /**
     * Filter, which InsurancePolicy to fetch.
     */
    where: InsurancePolicyWhereUniqueInput
  }

  /**
   * InsurancePolicy findFirst
   */
  export type InsurancePolicyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsurancePolicy
     */
    select?: InsurancePolicySelect<ExtArgs> | null
    /**
     * Filter, which InsurancePolicy to fetch.
     */
    where?: InsurancePolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InsurancePolicies to fetch.
     */
    orderBy?: InsurancePolicyOrderByWithRelationInput | InsurancePolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InsurancePolicies.
     */
    cursor?: InsurancePolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InsurancePolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InsurancePolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InsurancePolicies.
     */
    distinct?: InsurancePolicyScalarFieldEnum | InsurancePolicyScalarFieldEnum[]
  }

  /**
   * InsurancePolicy findFirstOrThrow
   */
  export type InsurancePolicyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsurancePolicy
     */
    select?: InsurancePolicySelect<ExtArgs> | null
    /**
     * Filter, which InsurancePolicy to fetch.
     */
    where?: InsurancePolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InsurancePolicies to fetch.
     */
    orderBy?: InsurancePolicyOrderByWithRelationInput | InsurancePolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InsurancePolicies.
     */
    cursor?: InsurancePolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InsurancePolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InsurancePolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InsurancePolicies.
     */
    distinct?: InsurancePolicyScalarFieldEnum | InsurancePolicyScalarFieldEnum[]
  }

  /**
   * InsurancePolicy findMany
   */
  export type InsurancePolicyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsurancePolicy
     */
    select?: InsurancePolicySelect<ExtArgs> | null
    /**
     * Filter, which InsurancePolicies to fetch.
     */
    where?: InsurancePolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InsurancePolicies to fetch.
     */
    orderBy?: InsurancePolicyOrderByWithRelationInput | InsurancePolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InsurancePolicies.
     */
    cursor?: InsurancePolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InsurancePolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InsurancePolicies.
     */
    skip?: number
    distinct?: InsurancePolicyScalarFieldEnum | InsurancePolicyScalarFieldEnum[]
  }

  /**
   * InsurancePolicy create
   */
  export type InsurancePolicyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsurancePolicy
     */
    select?: InsurancePolicySelect<ExtArgs> | null
    /**
     * The data needed to create a InsurancePolicy.
     */
    data: XOR<InsurancePolicyCreateInput, InsurancePolicyUncheckedCreateInput>
  }

  /**
   * InsurancePolicy createMany
   */
  export type InsurancePolicyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InsurancePolicies.
     */
    data: InsurancePolicyCreateManyInput | InsurancePolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InsurancePolicy createManyAndReturn
   */
  export type InsurancePolicyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsurancePolicy
     */
    select?: InsurancePolicySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many InsurancePolicies.
     */
    data: InsurancePolicyCreateManyInput | InsurancePolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InsurancePolicy update
   */
  export type InsurancePolicyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsurancePolicy
     */
    select?: InsurancePolicySelect<ExtArgs> | null
    /**
     * The data needed to update a InsurancePolicy.
     */
    data: XOR<InsurancePolicyUpdateInput, InsurancePolicyUncheckedUpdateInput>
    /**
     * Choose, which InsurancePolicy to update.
     */
    where: InsurancePolicyWhereUniqueInput
  }

  /**
   * InsurancePolicy updateMany
   */
  export type InsurancePolicyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InsurancePolicies.
     */
    data: XOR<InsurancePolicyUpdateManyMutationInput, InsurancePolicyUncheckedUpdateManyInput>
    /**
     * Filter which InsurancePolicies to update
     */
    where?: InsurancePolicyWhereInput
  }

  /**
   * InsurancePolicy upsert
   */
  export type InsurancePolicyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsurancePolicy
     */
    select?: InsurancePolicySelect<ExtArgs> | null
    /**
     * The filter to search for the InsurancePolicy to update in case it exists.
     */
    where: InsurancePolicyWhereUniqueInput
    /**
     * In case the InsurancePolicy found by the `where` argument doesn't exist, create a new InsurancePolicy with this data.
     */
    create: XOR<InsurancePolicyCreateInput, InsurancePolicyUncheckedCreateInput>
    /**
     * In case the InsurancePolicy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InsurancePolicyUpdateInput, InsurancePolicyUncheckedUpdateInput>
  }

  /**
   * InsurancePolicy delete
   */
  export type InsurancePolicyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsurancePolicy
     */
    select?: InsurancePolicySelect<ExtArgs> | null
    /**
     * Filter which InsurancePolicy to delete.
     */
    where: InsurancePolicyWhereUniqueInput
  }

  /**
   * InsurancePolicy deleteMany
   */
  export type InsurancePolicyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InsurancePolicies to delete
     */
    where?: InsurancePolicyWhereInput
  }

  /**
   * InsurancePolicy without action
   */
  export type InsurancePolicyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InsurancePolicy
     */
    select?: InsurancePolicySelect<ExtArgs> | null
  }


  /**
   * Model ProduceLot
   */

  export type AggregateProduceLot = {
    _count: ProduceLotCountAggregateOutputType | null
    _min: ProduceLotMinAggregateOutputType | null
    _max: ProduceLotMaxAggregateOutputType | null
  }

  export type ProduceLotMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    farmId: string | null
    lotCode: string | null
    origin: string | null
    attestationId: string | null
    createdAt: Date | null
  }

  export type ProduceLotMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    farmId: string | null
    lotCode: string | null
    origin: string | null
    attestationId: string | null
    createdAt: Date | null
  }

  export type ProduceLotCountAggregateOutputType = {
    id: number
    orgId: number
    farmId: number
    lotCode: number
    origin: number
    attestationId: number
    createdAt: number
    _all: number
  }


  export type ProduceLotMinAggregateInputType = {
    id?: true
    orgId?: true
    farmId?: true
    lotCode?: true
    origin?: true
    attestationId?: true
    createdAt?: true
  }

  export type ProduceLotMaxAggregateInputType = {
    id?: true
    orgId?: true
    farmId?: true
    lotCode?: true
    origin?: true
    attestationId?: true
    createdAt?: true
  }

  export type ProduceLotCountAggregateInputType = {
    id?: true
    orgId?: true
    farmId?: true
    lotCode?: true
    origin?: true
    attestationId?: true
    createdAt?: true
    _all?: true
  }

  export type ProduceLotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProduceLot to aggregate.
     */
    where?: ProduceLotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProduceLots to fetch.
     */
    orderBy?: ProduceLotOrderByWithRelationInput | ProduceLotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProduceLotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProduceLots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProduceLots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProduceLots
    **/
    _count?: true | ProduceLotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProduceLotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProduceLotMaxAggregateInputType
  }

  export type GetProduceLotAggregateType<T extends ProduceLotAggregateArgs> = {
        [P in keyof T & keyof AggregateProduceLot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduceLot[P]>
      : GetScalarType<T[P], AggregateProduceLot[P]>
  }




  export type ProduceLotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProduceLotWhereInput
    orderBy?: ProduceLotOrderByWithAggregationInput | ProduceLotOrderByWithAggregationInput[]
    by: ProduceLotScalarFieldEnum[] | ProduceLotScalarFieldEnum
    having?: ProduceLotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProduceLotCountAggregateInputType | true
    _min?: ProduceLotMinAggregateInputType
    _max?: ProduceLotMaxAggregateInputType
  }

  export type ProduceLotGroupByOutputType = {
    id: string
    orgId: string
    farmId: string
    lotCode: string
    origin: string | null
    attestationId: string | null
    createdAt: Date
    _count: ProduceLotCountAggregateOutputType | null
    _min: ProduceLotMinAggregateOutputType | null
    _max: ProduceLotMaxAggregateOutputType | null
  }

  type GetProduceLotGroupByPayload<T extends ProduceLotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProduceLotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProduceLotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProduceLotGroupByOutputType[P]>
            : GetScalarType<T[P], ProduceLotGroupByOutputType[P]>
        }
      >
    >


  export type ProduceLotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    farmId?: boolean
    lotCode?: boolean
    origin?: boolean
    attestationId?: boolean
    createdAt?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    custody?: boolean | ProduceLot$custodyArgs<ExtArgs>
    _count?: boolean | ProduceLotCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produceLot"]>

  export type ProduceLotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    farmId?: boolean
    lotCode?: boolean
    origin?: boolean
    attestationId?: boolean
    createdAt?: boolean
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produceLot"]>

  export type ProduceLotSelectScalar = {
    id?: boolean
    orgId?: boolean
    farmId?: boolean
    lotCode?: boolean
    origin?: boolean
    attestationId?: boolean
    createdAt?: boolean
  }

  export type ProduceLotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
    custody?: boolean | ProduceLot$custodyArgs<ExtArgs>
    _count?: boolean | ProduceLotCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProduceLotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    farm?: boolean | FarmDefaultArgs<ExtArgs>
  }

  export type $ProduceLotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProduceLot"
    objects: {
      farm: Prisma.$FarmPayload<ExtArgs>
      custody: Prisma.$CustodyHandoffPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      farmId: string
      lotCode: string
      origin: string | null
      attestationId: string | null
      createdAt: Date
    }, ExtArgs["result"]["produceLot"]>
    composites: {}
  }

  type ProduceLotGetPayload<S extends boolean | null | undefined | ProduceLotDefaultArgs> = $Result.GetResult<Prisma.$ProduceLotPayload, S>

  type ProduceLotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProduceLotFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProduceLotCountAggregateInputType | true
    }

  export interface ProduceLotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProduceLot'], meta: { name: 'ProduceLot' } }
    /**
     * Find zero or one ProduceLot that matches the filter.
     * @param {ProduceLotFindUniqueArgs} args - Arguments to find a ProduceLot
     * @example
     * // Get one ProduceLot
     * const produceLot = await prisma.produceLot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProduceLotFindUniqueArgs>(args: SelectSubset<T, ProduceLotFindUniqueArgs<ExtArgs>>): Prisma__ProduceLotClient<$Result.GetResult<Prisma.$ProduceLotPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProduceLot that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProduceLotFindUniqueOrThrowArgs} args - Arguments to find a ProduceLot
     * @example
     * // Get one ProduceLot
     * const produceLot = await prisma.produceLot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProduceLotFindUniqueOrThrowArgs>(args: SelectSubset<T, ProduceLotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProduceLotClient<$Result.GetResult<Prisma.$ProduceLotPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProduceLot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduceLotFindFirstArgs} args - Arguments to find a ProduceLot
     * @example
     * // Get one ProduceLot
     * const produceLot = await prisma.produceLot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProduceLotFindFirstArgs>(args?: SelectSubset<T, ProduceLotFindFirstArgs<ExtArgs>>): Prisma__ProduceLotClient<$Result.GetResult<Prisma.$ProduceLotPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProduceLot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduceLotFindFirstOrThrowArgs} args - Arguments to find a ProduceLot
     * @example
     * // Get one ProduceLot
     * const produceLot = await prisma.produceLot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProduceLotFindFirstOrThrowArgs>(args?: SelectSubset<T, ProduceLotFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProduceLotClient<$Result.GetResult<Prisma.$ProduceLotPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProduceLots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduceLotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProduceLots
     * const produceLots = await prisma.produceLot.findMany()
     * 
     * // Get first 10 ProduceLots
     * const produceLots = await prisma.produceLot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const produceLotWithIdOnly = await prisma.produceLot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProduceLotFindManyArgs>(args?: SelectSubset<T, ProduceLotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProduceLotPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProduceLot.
     * @param {ProduceLotCreateArgs} args - Arguments to create a ProduceLot.
     * @example
     * // Create one ProduceLot
     * const ProduceLot = await prisma.produceLot.create({
     *   data: {
     *     // ... data to create a ProduceLot
     *   }
     * })
     * 
     */
    create<T extends ProduceLotCreateArgs>(args: SelectSubset<T, ProduceLotCreateArgs<ExtArgs>>): Prisma__ProduceLotClient<$Result.GetResult<Prisma.$ProduceLotPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProduceLots.
     * @param {ProduceLotCreateManyArgs} args - Arguments to create many ProduceLots.
     * @example
     * // Create many ProduceLots
     * const produceLot = await prisma.produceLot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProduceLotCreateManyArgs>(args?: SelectSubset<T, ProduceLotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProduceLots and returns the data saved in the database.
     * @param {ProduceLotCreateManyAndReturnArgs} args - Arguments to create many ProduceLots.
     * @example
     * // Create many ProduceLots
     * const produceLot = await prisma.produceLot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProduceLots and only return the `id`
     * const produceLotWithIdOnly = await prisma.produceLot.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProduceLotCreateManyAndReturnArgs>(args?: SelectSubset<T, ProduceLotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProduceLotPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProduceLot.
     * @param {ProduceLotDeleteArgs} args - Arguments to delete one ProduceLot.
     * @example
     * // Delete one ProduceLot
     * const ProduceLot = await prisma.produceLot.delete({
     *   where: {
     *     // ... filter to delete one ProduceLot
     *   }
     * })
     * 
     */
    delete<T extends ProduceLotDeleteArgs>(args: SelectSubset<T, ProduceLotDeleteArgs<ExtArgs>>): Prisma__ProduceLotClient<$Result.GetResult<Prisma.$ProduceLotPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProduceLot.
     * @param {ProduceLotUpdateArgs} args - Arguments to update one ProduceLot.
     * @example
     * // Update one ProduceLot
     * const produceLot = await prisma.produceLot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProduceLotUpdateArgs>(args: SelectSubset<T, ProduceLotUpdateArgs<ExtArgs>>): Prisma__ProduceLotClient<$Result.GetResult<Prisma.$ProduceLotPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProduceLots.
     * @param {ProduceLotDeleteManyArgs} args - Arguments to filter ProduceLots to delete.
     * @example
     * // Delete a few ProduceLots
     * const { count } = await prisma.produceLot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProduceLotDeleteManyArgs>(args?: SelectSubset<T, ProduceLotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProduceLots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduceLotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProduceLots
     * const produceLot = await prisma.produceLot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProduceLotUpdateManyArgs>(args: SelectSubset<T, ProduceLotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProduceLot.
     * @param {ProduceLotUpsertArgs} args - Arguments to update or create a ProduceLot.
     * @example
     * // Update or create a ProduceLot
     * const produceLot = await prisma.produceLot.upsert({
     *   create: {
     *     // ... data to create a ProduceLot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProduceLot we want to update
     *   }
     * })
     */
    upsert<T extends ProduceLotUpsertArgs>(args: SelectSubset<T, ProduceLotUpsertArgs<ExtArgs>>): Prisma__ProduceLotClient<$Result.GetResult<Prisma.$ProduceLotPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProduceLots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduceLotCountArgs} args - Arguments to filter ProduceLots to count.
     * @example
     * // Count the number of ProduceLots
     * const count = await prisma.produceLot.count({
     *   where: {
     *     // ... the filter for the ProduceLots we want to count
     *   }
     * })
    **/
    count<T extends ProduceLotCountArgs>(
      args?: Subset<T, ProduceLotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProduceLotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProduceLot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduceLotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProduceLotAggregateArgs>(args: Subset<T, ProduceLotAggregateArgs>): Prisma.PrismaPromise<GetProduceLotAggregateType<T>>

    /**
     * Group by ProduceLot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduceLotGroupByArgs} args - Group by arguments.
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
      T extends ProduceLotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProduceLotGroupByArgs['orderBy'] }
        : { orderBy?: ProduceLotGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProduceLotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProduceLotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProduceLot model
   */
  readonly fields: ProduceLotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProduceLot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProduceLotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    farm<T extends FarmDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmDefaultArgs<ExtArgs>>): Prisma__FarmClient<$Result.GetResult<Prisma.$FarmPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    custody<T extends ProduceLot$custodyArgs<ExtArgs> = {}>(args?: Subset<T, ProduceLot$custodyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustodyHandoffPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the ProduceLot model
   */ 
  interface ProduceLotFieldRefs {
    readonly id: FieldRef<"ProduceLot", 'String'>
    readonly orgId: FieldRef<"ProduceLot", 'String'>
    readonly farmId: FieldRef<"ProduceLot", 'String'>
    readonly lotCode: FieldRef<"ProduceLot", 'String'>
    readonly origin: FieldRef<"ProduceLot", 'String'>
    readonly attestationId: FieldRef<"ProduceLot", 'String'>
    readonly createdAt: FieldRef<"ProduceLot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProduceLot findUnique
   */
  export type ProduceLotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceLot
     */
    select?: ProduceLotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceLotInclude<ExtArgs> | null
    /**
     * Filter, which ProduceLot to fetch.
     */
    where: ProduceLotWhereUniqueInput
  }

  /**
   * ProduceLot findUniqueOrThrow
   */
  export type ProduceLotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceLot
     */
    select?: ProduceLotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceLotInclude<ExtArgs> | null
    /**
     * Filter, which ProduceLot to fetch.
     */
    where: ProduceLotWhereUniqueInput
  }

  /**
   * ProduceLot findFirst
   */
  export type ProduceLotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceLot
     */
    select?: ProduceLotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceLotInclude<ExtArgs> | null
    /**
     * Filter, which ProduceLot to fetch.
     */
    where?: ProduceLotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProduceLots to fetch.
     */
    orderBy?: ProduceLotOrderByWithRelationInput | ProduceLotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProduceLots.
     */
    cursor?: ProduceLotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProduceLots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProduceLots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProduceLots.
     */
    distinct?: ProduceLotScalarFieldEnum | ProduceLotScalarFieldEnum[]
  }

  /**
   * ProduceLot findFirstOrThrow
   */
  export type ProduceLotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceLot
     */
    select?: ProduceLotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceLotInclude<ExtArgs> | null
    /**
     * Filter, which ProduceLot to fetch.
     */
    where?: ProduceLotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProduceLots to fetch.
     */
    orderBy?: ProduceLotOrderByWithRelationInput | ProduceLotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProduceLots.
     */
    cursor?: ProduceLotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProduceLots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProduceLots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProduceLots.
     */
    distinct?: ProduceLotScalarFieldEnum | ProduceLotScalarFieldEnum[]
  }

  /**
   * ProduceLot findMany
   */
  export type ProduceLotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceLot
     */
    select?: ProduceLotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceLotInclude<ExtArgs> | null
    /**
     * Filter, which ProduceLots to fetch.
     */
    where?: ProduceLotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProduceLots to fetch.
     */
    orderBy?: ProduceLotOrderByWithRelationInput | ProduceLotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProduceLots.
     */
    cursor?: ProduceLotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProduceLots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProduceLots.
     */
    skip?: number
    distinct?: ProduceLotScalarFieldEnum | ProduceLotScalarFieldEnum[]
  }

  /**
   * ProduceLot create
   */
  export type ProduceLotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceLot
     */
    select?: ProduceLotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceLotInclude<ExtArgs> | null
    /**
     * The data needed to create a ProduceLot.
     */
    data: XOR<ProduceLotCreateInput, ProduceLotUncheckedCreateInput>
  }

  /**
   * ProduceLot createMany
   */
  export type ProduceLotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProduceLots.
     */
    data: ProduceLotCreateManyInput | ProduceLotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProduceLot createManyAndReturn
   */
  export type ProduceLotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceLot
     */
    select?: ProduceLotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProduceLots.
     */
    data: ProduceLotCreateManyInput | ProduceLotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceLotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProduceLot update
   */
  export type ProduceLotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceLot
     */
    select?: ProduceLotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceLotInclude<ExtArgs> | null
    /**
     * The data needed to update a ProduceLot.
     */
    data: XOR<ProduceLotUpdateInput, ProduceLotUncheckedUpdateInput>
    /**
     * Choose, which ProduceLot to update.
     */
    where: ProduceLotWhereUniqueInput
  }

  /**
   * ProduceLot updateMany
   */
  export type ProduceLotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProduceLots.
     */
    data: XOR<ProduceLotUpdateManyMutationInput, ProduceLotUncheckedUpdateManyInput>
    /**
     * Filter which ProduceLots to update
     */
    where?: ProduceLotWhereInput
  }

  /**
   * ProduceLot upsert
   */
  export type ProduceLotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceLot
     */
    select?: ProduceLotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceLotInclude<ExtArgs> | null
    /**
     * The filter to search for the ProduceLot to update in case it exists.
     */
    where: ProduceLotWhereUniqueInput
    /**
     * In case the ProduceLot found by the `where` argument doesn't exist, create a new ProduceLot with this data.
     */
    create: XOR<ProduceLotCreateInput, ProduceLotUncheckedCreateInput>
    /**
     * In case the ProduceLot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProduceLotUpdateInput, ProduceLotUncheckedUpdateInput>
  }

  /**
   * ProduceLot delete
   */
  export type ProduceLotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceLot
     */
    select?: ProduceLotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceLotInclude<ExtArgs> | null
    /**
     * Filter which ProduceLot to delete.
     */
    where: ProduceLotWhereUniqueInput
  }

  /**
   * ProduceLot deleteMany
   */
  export type ProduceLotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProduceLots to delete
     */
    where?: ProduceLotWhereInput
  }

  /**
   * ProduceLot.custody
   */
  export type ProduceLot$custodyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyHandoff
     */
    select?: CustodyHandoffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyHandoffInclude<ExtArgs> | null
    where?: CustodyHandoffWhereInput
    orderBy?: CustodyHandoffOrderByWithRelationInput | CustodyHandoffOrderByWithRelationInput[]
    cursor?: CustodyHandoffWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustodyHandoffScalarFieldEnum | CustodyHandoffScalarFieldEnum[]
  }

  /**
   * ProduceLot without action
   */
  export type ProduceLotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceLot
     */
    select?: ProduceLotSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceLotInclude<ExtArgs> | null
  }


  /**
   * Model CustodyHandoff
   */

  export type AggregateCustodyHandoff = {
    _count: CustodyHandoffCountAggregateOutputType | null
    _min: CustodyHandoffMinAggregateOutputType | null
    _max: CustodyHandoffMaxAggregateOutputType | null
  }

  export type CustodyHandoffMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    lotId: string | null
    actorRef: string | null
    attestationId: string | null
    createdAt: Date | null
  }

  export type CustodyHandoffMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    lotId: string | null
    actorRef: string | null
    attestationId: string | null
    createdAt: Date | null
  }

  export type CustodyHandoffCountAggregateOutputType = {
    id: number
    orgId: number
    lotId: number
    actorRef: number
    geo: number
    attestationId: number
    createdAt: number
    _all: number
  }


  export type CustodyHandoffMinAggregateInputType = {
    id?: true
    orgId?: true
    lotId?: true
    actorRef?: true
    attestationId?: true
    createdAt?: true
  }

  export type CustodyHandoffMaxAggregateInputType = {
    id?: true
    orgId?: true
    lotId?: true
    actorRef?: true
    attestationId?: true
    createdAt?: true
  }

  export type CustodyHandoffCountAggregateInputType = {
    id?: true
    orgId?: true
    lotId?: true
    actorRef?: true
    geo?: true
    attestationId?: true
    createdAt?: true
    _all?: true
  }

  export type CustodyHandoffAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustodyHandoff to aggregate.
     */
    where?: CustodyHandoffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustodyHandoffs to fetch.
     */
    orderBy?: CustodyHandoffOrderByWithRelationInput | CustodyHandoffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustodyHandoffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustodyHandoffs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustodyHandoffs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustodyHandoffs
    **/
    _count?: true | CustodyHandoffCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustodyHandoffMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustodyHandoffMaxAggregateInputType
  }

  export type GetCustodyHandoffAggregateType<T extends CustodyHandoffAggregateArgs> = {
        [P in keyof T & keyof AggregateCustodyHandoff]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustodyHandoff[P]>
      : GetScalarType<T[P], AggregateCustodyHandoff[P]>
  }




  export type CustodyHandoffGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustodyHandoffWhereInput
    orderBy?: CustodyHandoffOrderByWithAggregationInput | CustodyHandoffOrderByWithAggregationInput[]
    by: CustodyHandoffScalarFieldEnum[] | CustodyHandoffScalarFieldEnum
    having?: CustodyHandoffScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustodyHandoffCountAggregateInputType | true
    _min?: CustodyHandoffMinAggregateInputType
    _max?: CustodyHandoffMaxAggregateInputType
  }

  export type CustodyHandoffGroupByOutputType = {
    id: string
    orgId: string
    lotId: string
    actorRef: string
    geo: JsonValue | null
    attestationId: string | null
    createdAt: Date
    _count: CustodyHandoffCountAggregateOutputType | null
    _min: CustodyHandoffMinAggregateOutputType | null
    _max: CustodyHandoffMaxAggregateOutputType | null
  }

  type GetCustodyHandoffGroupByPayload<T extends CustodyHandoffGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustodyHandoffGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustodyHandoffGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustodyHandoffGroupByOutputType[P]>
            : GetScalarType<T[P], CustodyHandoffGroupByOutputType[P]>
        }
      >
    >


  export type CustodyHandoffSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    lotId?: boolean
    actorRef?: boolean
    geo?: boolean
    attestationId?: boolean
    createdAt?: boolean
    lot?: boolean | ProduceLotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["custodyHandoff"]>

  export type CustodyHandoffSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    lotId?: boolean
    actorRef?: boolean
    geo?: boolean
    attestationId?: boolean
    createdAt?: boolean
    lot?: boolean | ProduceLotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["custodyHandoff"]>

  export type CustodyHandoffSelectScalar = {
    id?: boolean
    orgId?: boolean
    lotId?: boolean
    actorRef?: boolean
    geo?: boolean
    attestationId?: boolean
    createdAt?: boolean
  }

  export type CustodyHandoffInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lot?: boolean | ProduceLotDefaultArgs<ExtArgs>
  }
  export type CustodyHandoffIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lot?: boolean | ProduceLotDefaultArgs<ExtArgs>
  }

  export type $CustodyHandoffPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustodyHandoff"
    objects: {
      lot: Prisma.$ProduceLotPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      lotId: string
      actorRef: string
      geo: Prisma.JsonValue | null
      attestationId: string | null
      createdAt: Date
    }, ExtArgs["result"]["custodyHandoff"]>
    composites: {}
  }

  type CustodyHandoffGetPayload<S extends boolean | null | undefined | CustodyHandoffDefaultArgs> = $Result.GetResult<Prisma.$CustodyHandoffPayload, S>

  type CustodyHandoffCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustodyHandoffFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustodyHandoffCountAggregateInputType | true
    }

  export interface CustodyHandoffDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustodyHandoff'], meta: { name: 'CustodyHandoff' } }
    /**
     * Find zero or one CustodyHandoff that matches the filter.
     * @param {CustodyHandoffFindUniqueArgs} args - Arguments to find a CustodyHandoff
     * @example
     * // Get one CustodyHandoff
     * const custodyHandoff = await prisma.custodyHandoff.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustodyHandoffFindUniqueArgs>(args: SelectSubset<T, CustodyHandoffFindUniqueArgs<ExtArgs>>): Prisma__CustodyHandoffClient<$Result.GetResult<Prisma.$CustodyHandoffPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CustodyHandoff that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustodyHandoffFindUniqueOrThrowArgs} args - Arguments to find a CustodyHandoff
     * @example
     * // Get one CustodyHandoff
     * const custodyHandoff = await prisma.custodyHandoff.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustodyHandoffFindUniqueOrThrowArgs>(args: SelectSubset<T, CustodyHandoffFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustodyHandoffClient<$Result.GetResult<Prisma.$CustodyHandoffPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CustodyHandoff that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustodyHandoffFindFirstArgs} args - Arguments to find a CustodyHandoff
     * @example
     * // Get one CustodyHandoff
     * const custodyHandoff = await prisma.custodyHandoff.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustodyHandoffFindFirstArgs>(args?: SelectSubset<T, CustodyHandoffFindFirstArgs<ExtArgs>>): Prisma__CustodyHandoffClient<$Result.GetResult<Prisma.$CustodyHandoffPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CustodyHandoff that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustodyHandoffFindFirstOrThrowArgs} args - Arguments to find a CustodyHandoff
     * @example
     * // Get one CustodyHandoff
     * const custodyHandoff = await prisma.custodyHandoff.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustodyHandoffFindFirstOrThrowArgs>(args?: SelectSubset<T, CustodyHandoffFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustodyHandoffClient<$Result.GetResult<Prisma.$CustodyHandoffPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CustodyHandoffs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustodyHandoffFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustodyHandoffs
     * const custodyHandoffs = await prisma.custodyHandoff.findMany()
     * 
     * // Get first 10 CustodyHandoffs
     * const custodyHandoffs = await prisma.custodyHandoff.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const custodyHandoffWithIdOnly = await prisma.custodyHandoff.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustodyHandoffFindManyArgs>(args?: SelectSubset<T, CustodyHandoffFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustodyHandoffPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CustodyHandoff.
     * @param {CustodyHandoffCreateArgs} args - Arguments to create a CustodyHandoff.
     * @example
     * // Create one CustodyHandoff
     * const CustodyHandoff = await prisma.custodyHandoff.create({
     *   data: {
     *     // ... data to create a CustodyHandoff
     *   }
     * })
     * 
     */
    create<T extends CustodyHandoffCreateArgs>(args: SelectSubset<T, CustodyHandoffCreateArgs<ExtArgs>>): Prisma__CustodyHandoffClient<$Result.GetResult<Prisma.$CustodyHandoffPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CustodyHandoffs.
     * @param {CustodyHandoffCreateManyArgs} args - Arguments to create many CustodyHandoffs.
     * @example
     * // Create many CustodyHandoffs
     * const custodyHandoff = await prisma.custodyHandoff.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustodyHandoffCreateManyArgs>(args?: SelectSubset<T, CustodyHandoffCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustodyHandoffs and returns the data saved in the database.
     * @param {CustodyHandoffCreateManyAndReturnArgs} args - Arguments to create many CustodyHandoffs.
     * @example
     * // Create many CustodyHandoffs
     * const custodyHandoff = await prisma.custodyHandoff.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustodyHandoffs and only return the `id`
     * const custodyHandoffWithIdOnly = await prisma.custodyHandoff.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustodyHandoffCreateManyAndReturnArgs>(args?: SelectSubset<T, CustodyHandoffCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustodyHandoffPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CustodyHandoff.
     * @param {CustodyHandoffDeleteArgs} args - Arguments to delete one CustodyHandoff.
     * @example
     * // Delete one CustodyHandoff
     * const CustodyHandoff = await prisma.custodyHandoff.delete({
     *   where: {
     *     // ... filter to delete one CustodyHandoff
     *   }
     * })
     * 
     */
    delete<T extends CustodyHandoffDeleteArgs>(args: SelectSubset<T, CustodyHandoffDeleteArgs<ExtArgs>>): Prisma__CustodyHandoffClient<$Result.GetResult<Prisma.$CustodyHandoffPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CustodyHandoff.
     * @param {CustodyHandoffUpdateArgs} args - Arguments to update one CustodyHandoff.
     * @example
     * // Update one CustodyHandoff
     * const custodyHandoff = await prisma.custodyHandoff.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustodyHandoffUpdateArgs>(args: SelectSubset<T, CustodyHandoffUpdateArgs<ExtArgs>>): Prisma__CustodyHandoffClient<$Result.GetResult<Prisma.$CustodyHandoffPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CustodyHandoffs.
     * @param {CustodyHandoffDeleteManyArgs} args - Arguments to filter CustodyHandoffs to delete.
     * @example
     * // Delete a few CustodyHandoffs
     * const { count } = await prisma.custodyHandoff.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustodyHandoffDeleteManyArgs>(args?: SelectSubset<T, CustodyHandoffDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustodyHandoffs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustodyHandoffUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustodyHandoffs
     * const custodyHandoff = await prisma.custodyHandoff.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustodyHandoffUpdateManyArgs>(args: SelectSubset<T, CustodyHandoffUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CustodyHandoff.
     * @param {CustodyHandoffUpsertArgs} args - Arguments to update or create a CustodyHandoff.
     * @example
     * // Update or create a CustodyHandoff
     * const custodyHandoff = await prisma.custodyHandoff.upsert({
     *   create: {
     *     // ... data to create a CustodyHandoff
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustodyHandoff we want to update
     *   }
     * })
     */
    upsert<T extends CustodyHandoffUpsertArgs>(args: SelectSubset<T, CustodyHandoffUpsertArgs<ExtArgs>>): Prisma__CustodyHandoffClient<$Result.GetResult<Prisma.$CustodyHandoffPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CustodyHandoffs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustodyHandoffCountArgs} args - Arguments to filter CustodyHandoffs to count.
     * @example
     * // Count the number of CustodyHandoffs
     * const count = await prisma.custodyHandoff.count({
     *   where: {
     *     // ... the filter for the CustodyHandoffs we want to count
     *   }
     * })
    **/
    count<T extends CustodyHandoffCountArgs>(
      args?: Subset<T, CustodyHandoffCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustodyHandoffCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustodyHandoff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustodyHandoffAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CustodyHandoffAggregateArgs>(args: Subset<T, CustodyHandoffAggregateArgs>): Prisma.PrismaPromise<GetCustodyHandoffAggregateType<T>>

    /**
     * Group by CustodyHandoff.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustodyHandoffGroupByArgs} args - Group by arguments.
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
      T extends CustodyHandoffGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustodyHandoffGroupByArgs['orderBy'] }
        : { orderBy?: CustodyHandoffGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CustodyHandoffGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustodyHandoffGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustodyHandoff model
   */
  readonly fields: CustodyHandoffFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustodyHandoff.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustodyHandoffClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lot<T extends ProduceLotDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProduceLotDefaultArgs<ExtArgs>>): Prisma__ProduceLotClient<$Result.GetResult<Prisma.$ProduceLotPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the CustodyHandoff model
   */ 
  interface CustodyHandoffFieldRefs {
    readonly id: FieldRef<"CustodyHandoff", 'String'>
    readonly orgId: FieldRef<"CustodyHandoff", 'String'>
    readonly lotId: FieldRef<"CustodyHandoff", 'String'>
    readonly actorRef: FieldRef<"CustodyHandoff", 'String'>
    readonly geo: FieldRef<"CustodyHandoff", 'Json'>
    readonly attestationId: FieldRef<"CustodyHandoff", 'String'>
    readonly createdAt: FieldRef<"CustodyHandoff", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustodyHandoff findUnique
   */
  export type CustodyHandoffFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyHandoff
     */
    select?: CustodyHandoffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyHandoffInclude<ExtArgs> | null
    /**
     * Filter, which CustodyHandoff to fetch.
     */
    where: CustodyHandoffWhereUniqueInput
  }

  /**
   * CustodyHandoff findUniqueOrThrow
   */
  export type CustodyHandoffFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyHandoff
     */
    select?: CustodyHandoffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyHandoffInclude<ExtArgs> | null
    /**
     * Filter, which CustodyHandoff to fetch.
     */
    where: CustodyHandoffWhereUniqueInput
  }

  /**
   * CustodyHandoff findFirst
   */
  export type CustodyHandoffFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyHandoff
     */
    select?: CustodyHandoffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyHandoffInclude<ExtArgs> | null
    /**
     * Filter, which CustodyHandoff to fetch.
     */
    where?: CustodyHandoffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustodyHandoffs to fetch.
     */
    orderBy?: CustodyHandoffOrderByWithRelationInput | CustodyHandoffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustodyHandoffs.
     */
    cursor?: CustodyHandoffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustodyHandoffs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustodyHandoffs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustodyHandoffs.
     */
    distinct?: CustodyHandoffScalarFieldEnum | CustodyHandoffScalarFieldEnum[]
  }

  /**
   * CustodyHandoff findFirstOrThrow
   */
  export type CustodyHandoffFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyHandoff
     */
    select?: CustodyHandoffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyHandoffInclude<ExtArgs> | null
    /**
     * Filter, which CustodyHandoff to fetch.
     */
    where?: CustodyHandoffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustodyHandoffs to fetch.
     */
    orderBy?: CustodyHandoffOrderByWithRelationInput | CustodyHandoffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustodyHandoffs.
     */
    cursor?: CustodyHandoffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustodyHandoffs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustodyHandoffs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustodyHandoffs.
     */
    distinct?: CustodyHandoffScalarFieldEnum | CustodyHandoffScalarFieldEnum[]
  }

  /**
   * CustodyHandoff findMany
   */
  export type CustodyHandoffFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyHandoff
     */
    select?: CustodyHandoffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyHandoffInclude<ExtArgs> | null
    /**
     * Filter, which CustodyHandoffs to fetch.
     */
    where?: CustodyHandoffWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustodyHandoffs to fetch.
     */
    orderBy?: CustodyHandoffOrderByWithRelationInput | CustodyHandoffOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustodyHandoffs.
     */
    cursor?: CustodyHandoffWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustodyHandoffs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustodyHandoffs.
     */
    skip?: number
    distinct?: CustodyHandoffScalarFieldEnum | CustodyHandoffScalarFieldEnum[]
  }

  /**
   * CustodyHandoff create
   */
  export type CustodyHandoffCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyHandoff
     */
    select?: CustodyHandoffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyHandoffInclude<ExtArgs> | null
    /**
     * The data needed to create a CustodyHandoff.
     */
    data: XOR<CustodyHandoffCreateInput, CustodyHandoffUncheckedCreateInput>
  }

  /**
   * CustodyHandoff createMany
   */
  export type CustodyHandoffCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustodyHandoffs.
     */
    data: CustodyHandoffCreateManyInput | CustodyHandoffCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CustodyHandoff createManyAndReturn
   */
  export type CustodyHandoffCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyHandoff
     */
    select?: CustodyHandoffSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CustodyHandoffs.
     */
    data: CustodyHandoffCreateManyInput | CustodyHandoffCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyHandoffIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CustodyHandoff update
   */
  export type CustodyHandoffUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyHandoff
     */
    select?: CustodyHandoffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyHandoffInclude<ExtArgs> | null
    /**
     * The data needed to update a CustodyHandoff.
     */
    data: XOR<CustodyHandoffUpdateInput, CustodyHandoffUncheckedUpdateInput>
    /**
     * Choose, which CustodyHandoff to update.
     */
    where: CustodyHandoffWhereUniqueInput
  }

  /**
   * CustodyHandoff updateMany
   */
  export type CustodyHandoffUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustodyHandoffs.
     */
    data: XOR<CustodyHandoffUpdateManyMutationInput, CustodyHandoffUncheckedUpdateManyInput>
    /**
     * Filter which CustodyHandoffs to update
     */
    where?: CustodyHandoffWhereInput
  }

  /**
   * CustodyHandoff upsert
   */
  export type CustodyHandoffUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyHandoff
     */
    select?: CustodyHandoffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyHandoffInclude<ExtArgs> | null
    /**
     * The filter to search for the CustodyHandoff to update in case it exists.
     */
    where: CustodyHandoffWhereUniqueInput
    /**
     * In case the CustodyHandoff found by the `where` argument doesn't exist, create a new CustodyHandoff with this data.
     */
    create: XOR<CustodyHandoffCreateInput, CustodyHandoffUncheckedCreateInput>
    /**
     * In case the CustodyHandoff was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustodyHandoffUpdateInput, CustodyHandoffUncheckedUpdateInput>
  }

  /**
   * CustodyHandoff delete
   */
  export type CustodyHandoffDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyHandoff
     */
    select?: CustodyHandoffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyHandoffInclude<ExtArgs> | null
    /**
     * Filter which CustodyHandoff to delete.
     */
    where: CustodyHandoffWhereUniqueInput
  }

  /**
   * CustodyHandoff deleteMany
   */
  export type CustodyHandoffDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustodyHandoffs to delete
     */
    where?: CustodyHandoffWhereInput
  }

  /**
   * CustodyHandoff without action
   */
  export type CustodyHandoffDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustodyHandoff
     */
    select?: CustodyHandoffSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustodyHandoffInclude<ExtArgs> | null
  }


  /**
   * Model OfftakeContract
   */

  export type AggregateOfftakeContract = {
    _count: OfftakeContractCountAggregateOutputType | null
    _avg: OfftakeContractAvgAggregateOutputType | null
    _sum: OfftakeContractSumAggregateOutputType | null
    _min: OfftakeContractMinAggregateOutputType | null
    _max: OfftakeContractMaxAggregateOutputType | null
  }

  export type OfftakeContractAvgAggregateOutputType = {
    priceMinor: number | null
  }

  export type OfftakeContractSumAggregateOutputType = {
    priceMinor: bigint | null
  }

  export type OfftakeContractMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    lotId: string | null
    buyerRef: string | null
    priceMinor: bigint | null
    currency: string | null
    escrowIntentId: string | null
    createdAt: Date | null
  }

  export type OfftakeContractMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    lotId: string | null
    buyerRef: string | null
    priceMinor: bigint | null
    currency: string | null
    escrowIntentId: string | null
    createdAt: Date | null
  }

  export type OfftakeContractCountAggregateOutputType = {
    id: number
    orgId: number
    lotId: number
    buyerRef: number
    priceMinor: number
    currency: number
    escrowIntentId: number
    createdAt: number
    _all: number
  }


  export type OfftakeContractAvgAggregateInputType = {
    priceMinor?: true
  }

  export type OfftakeContractSumAggregateInputType = {
    priceMinor?: true
  }

  export type OfftakeContractMinAggregateInputType = {
    id?: true
    orgId?: true
    lotId?: true
    buyerRef?: true
    priceMinor?: true
    currency?: true
    escrowIntentId?: true
    createdAt?: true
  }

  export type OfftakeContractMaxAggregateInputType = {
    id?: true
    orgId?: true
    lotId?: true
    buyerRef?: true
    priceMinor?: true
    currency?: true
    escrowIntentId?: true
    createdAt?: true
  }

  export type OfftakeContractCountAggregateInputType = {
    id?: true
    orgId?: true
    lotId?: true
    buyerRef?: true
    priceMinor?: true
    currency?: true
    escrowIntentId?: true
    createdAt?: true
    _all?: true
  }

  export type OfftakeContractAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OfftakeContract to aggregate.
     */
    where?: OfftakeContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfftakeContracts to fetch.
     */
    orderBy?: OfftakeContractOrderByWithRelationInput | OfftakeContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OfftakeContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfftakeContracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfftakeContracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OfftakeContracts
    **/
    _count?: true | OfftakeContractCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OfftakeContractAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OfftakeContractSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfftakeContractMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfftakeContractMaxAggregateInputType
  }

  export type GetOfftakeContractAggregateType<T extends OfftakeContractAggregateArgs> = {
        [P in keyof T & keyof AggregateOfftakeContract]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOfftakeContract[P]>
      : GetScalarType<T[P], AggregateOfftakeContract[P]>
  }




  export type OfftakeContractGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfftakeContractWhereInput
    orderBy?: OfftakeContractOrderByWithAggregationInput | OfftakeContractOrderByWithAggregationInput[]
    by: OfftakeContractScalarFieldEnum[] | OfftakeContractScalarFieldEnum
    having?: OfftakeContractScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfftakeContractCountAggregateInputType | true
    _avg?: OfftakeContractAvgAggregateInputType
    _sum?: OfftakeContractSumAggregateInputType
    _min?: OfftakeContractMinAggregateInputType
    _max?: OfftakeContractMaxAggregateInputType
  }

  export type OfftakeContractGroupByOutputType = {
    id: string
    orgId: string
    lotId: string
    buyerRef: string
    priceMinor: bigint
    currency: string
    escrowIntentId: string | null
    createdAt: Date
    _count: OfftakeContractCountAggregateOutputType | null
    _avg: OfftakeContractAvgAggregateOutputType | null
    _sum: OfftakeContractSumAggregateOutputType | null
    _min: OfftakeContractMinAggregateOutputType | null
    _max: OfftakeContractMaxAggregateOutputType | null
  }

  type GetOfftakeContractGroupByPayload<T extends OfftakeContractGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OfftakeContractGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfftakeContractGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfftakeContractGroupByOutputType[P]>
            : GetScalarType<T[P], OfftakeContractGroupByOutputType[P]>
        }
      >
    >


  export type OfftakeContractSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    lotId?: boolean
    buyerRef?: boolean
    priceMinor?: boolean
    currency?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["offtakeContract"]>

  export type OfftakeContractSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    lotId?: boolean
    buyerRef?: boolean
    priceMinor?: boolean
    currency?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["offtakeContract"]>

  export type OfftakeContractSelectScalar = {
    id?: boolean
    orgId?: boolean
    lotId?: boolean
    buyerRef?: boolean
    priceMinor?: boolean
    currency?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }


  export type $OfftakeContractPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OfftakeContract"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      lotId: string
      buyerRef: string
      priceMinor: bigint
      currency: string
      escrowIntentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["offtakeContract"]>
    composites: {}
  }

  type OfftakeContractGetPayload<S extends boolean | null | undefined | OfftakeContractDefaultArgs> = $Result.GetResult<Prisma.$OfftakeContractPayload, S>

  type OfftakeContractCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OfftakeContractFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OfftakeContractCountAggregateInputType | true
    }

  export interface OfftakeContractDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OfftakeContract'], meta: { name: 'OfftakeContract' } }
    /**
     * Find zero or one OfftakeContract that matches the filter.
     * @param {OfftakeContractFindUniqueArgs} args - Arguments to find a OfftakeContract
     * @example
     * // Get one OfftakeContract
     * const offtakeContract = await prisma.offtakeContract.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OfftakeContractFindUniqueArgs>(args: SelectSubset<T, OfftakeContractFindUniqueArgs<ExtArgs>>): Prisma__OfftakeContractClient<$Result.GetResult<Prisma.$OfftakeContractPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one OfftakeContract that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OfftakeContractFindUniqueOrThrowArgs} args - Arguments to find a OfftakeContract
     * @example
     * // Get one OfftakeContract
     * const offtakeContract = await prisma.offtakeContract.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OfftakeContractFindUniqueOrThrowArgs>(args: SelectSubset<T, OfftakeContractFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OfftakeContractClient<$Result.GetResult<Prisma.$OfftakeContractPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first OfftakeContract that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfftakeContractFindFirstArgs} args - Arguments to find a OfftakeContract
     * @example
     * // Get one OfftakeContract
     * const offtakeContract = await prisma.offtakeContract.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OfftakeContractFindFirstArgs>(args?: SelectSubset<T, OfftakeContractFindFirstArgs<ExtArgs>>): Prisma__OfftakeContractClient<$Result.GetResult<Prisma.$OfftakeContractPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first OfftakeContract that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfftakeContractFindFirstOrThrowArgs} args - Arguments to find a OfftakeContract
     * @example
     * // Get one OfftakeContract
     * const offtakeContract = await prisma.offtakeContract.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OfftakeContractFindFirstOrThrowArgs>(args?: SelectSubset<T, OfftakeContractFindFirstOrThrowArgs<ExtArgs>>): Prisma__OfftakeContractClient<$Result.GetResult<Prisma.$OfftakeContractPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more OfftakeContracts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfftakeContractFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OfftakeContracts
     * const offtakeContracts = await prisma.offtakeContract.findMany()
     * 
     * // Get first 10 OfftakeContracts
     * const offtakeContracts = await prisma.offtakeContract.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const offtakeContractWithIdOnly = await prisma.offtakeContract.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OfftakeContractFindManyArgs>(args?: SelectSubset<T, OfftakeContractFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfftakeContractPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a OfftakeContract.
     * @param {OfftakeContractCreateArgs} args - Arguments to create a OfftakeContract.
     * @example
     * // Create one OfftakeContract
     * const OfftakeContract = await prisma.offtakeContract.create({
     *   data: {
     *     // ... data to create a OfftakeContract
     *   }
     * })
     * 
     */
    create<T extends OfftakeContractCreateArgs>(args: SelectSubset<T, OfftakeContractCreateArgs<ExtArgs>>): Prisma__OfftakeContractClient<$Result.GetResult<Prisma.$OfftakeContractPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many OfftakeContracts.
     * @param {OfftakeContractCreateManyArgs} args - Arguments to create many OfftakeContracts.
     * @example
     * // Create many OfftakeContracts
     * const offtakeContract = await prisma.offtakeContract.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OfftakeContractCreateManyArgs>(args?: SelectSubset<T, OfftakeContractCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OfftakeContracts and returns the data saved in the database.
     * @param {OfftakeContractCreateManyAndReturnArgs} args - Arguments to create many OfftakeContracts.
     * @example
     * // Create many OfftakeContracts
     * const offtakeContract = await prisma.offtakeContract.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OfftakeContracts and only return the `id`
     * const offtakeContractWithIdOnly = await prisma.offtakeContract.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OfftakeContractCreateManyAndReturnArgs>(args?: SelectSubset<T, OfftakeContractCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfftakeContractPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a OfftakeContract.
     * @param {OfftakeContractDeleteArgs} args - Arguments to delete one OfftakeContract.
     * @example
     * // Delete one OfftakeContract
     * const OfftakeContract = await prisma.offtakeContract.delete({
     *   where: {
     *     // ... filter to delete one OfftakeContract
     *   }
     * })
     * 
     */
    delete<T extends OfftakeContractDeleteArgs>(args: SelectSubset<T, OfftakeContractDeleteArgs<ExtArgs>>): Prisma__OfftakeContractClient<$Result.GetResult<Prisma.$OfftakeContractPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one OfftakeContract.
     * @param {OfftakeContractUpdateArgs} args - Arguments to update one OfftakeContract.
     * @example
     * // Update one OfftakeContract
     * const offtakeContract = await prisma.offtakeContract.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OfftakeContractUpdateArgs>(args: SelectSubset<T, OfftakeContractUpdateArgs<ExtArgs>>): Prisma__OfftakeContractClient<$Result.GetResult<Prisma.$OfftakeContractPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more OfftakeContracts.
     * @param {OfftakeContractDeleteManyArgs} args - Arguments to filter OfftakeContracts to delete.
     * @example
     * // Delete a few OfftakeContracts
     * const { count } = await prisma.offtakeContract.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OfftakeContractDeleteManyArgs>(args?: SelectSubset<T, OfftakeContractDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OfftakeContracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfftakeContractUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OfftakeContracts
     * const offtakeContract = await prisma.offtakeContract.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OfftakeContractUpdateManyArgs>(args: SelectSubset<T, OfftakeContractUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OfftakeContract.
     * @param {OfftakeContractUpsertArgs} args - Arguments to update or create a OfftakeContract.
     * @example
     * // Update or create a OfftakeContract
     * const offtakeContract = await prisma.offtakeContract.upsert({
     *   create: {
     *     // ... data to create a OfftakeContract
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OfftakeContract we want to update
     *   }
     * })
     */
    upsert<T extends OfftakeContractUpsertArgs>(args: SelectSubset<T, OfftakeContractUpsertArgs<ExtArgs>>): Prisma__OfftakeContractClient<$Result.GetResult<Prisma.$OfftakeContractPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of OfftakeContracts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfftakeContractCountArgs} args - Arguments to filter OfftakeContracts to count.
     * @example
     * // Count the number of OfftakeContracts
     * const count = await prisma.offtakeContract.count({
     *   where: {
     *     // ... the filter for the OfftakeContracts we want to count
     *   }
     * })
    **/
    count<T extends OfftakeContractCountArgs>(
      args?: Subset<T, OfftakeContractCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfftakeContractCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OfftakeContract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfftakeContractAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OfftakeContractAggregateArgs>(args: Subset<T, OfftakeContractAggregateArgs>): Prisma.PrismaPromise<GetOfftakeContractAggregateType<T>>

    /**
     * Group by OfftakeContract.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfftakeContractGroupByArgs} args - Group by arguments.
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
      T extends OfftakeContractGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfftakeContractGroupByArgs['orderBy'] }
        : { orderBy?: OfftakeContractGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OfftakeContractGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfftakeContractGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OfftakeContract model
   */
  readonly fields: OfftakeContractFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OfftakeContract.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OfftakeContractClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the OfftakeContract model
   */ 
  interface OfftakeContractFieldRefs {
    readonly id: FieldRef<"OfftakeContract", 'String'>
    readonly orgId: FieldRef<"OfftakeContract", 'String'>
    readonly lotId: FieldRef<"OfftakeContract", 'String'>
    readonly buyerRef: FieldRef<"OfftakeContract", 'String'>
    readonly priceMinor: FieldRef<"OfftakeContract", 'BigInt'>
    readonly currency: FieldRef<"OfftakeContract", 'String'>
    readonly escrowIntentId: FieldRef<"OfftakeContract", 'String'>
    readonly createdAt: FieldRef<"OfftakeContract", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OfftakeContract findUnique
   */
  export type OfftakeContractFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfftakeContract
     */
    select?: OfftakeContractSelect<ExtArgs> | null
    /**
     * Filter, which OfftakeContract to fetch.
     */
    where: OfftakeContractWhereUniqueInput
  }

  /**
   * OfftakeContract findUniqueOrThrow
   */
  export type OfftakeContractFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfftakeContract
     */
    select?: OfftakeContractSelect<ExtArgs> | null
    /**
     * Filter, which OfftakeContract to fetch.
     */
    where: OfftakeContractWhereUniqueInput
  }

  /**
   * OfftakeContract findFirst
   */
  export type OfftakeContractFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfftakeContract
     */
    select?: OfftakeContractSelect<ExtArgs> | null
    /**
     * Filter, which OfftakeContract to fetch.
     */
    where?: OfftakeContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfftakeContracts to fetch.
     */
    orderBy?: OfftakeContractOrderByWithRelationInput | OfftakeContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OfftakeContracts.
     */
    cursor?: OfftakeContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfftakeContracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfftakeContracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OfftakeContracts.
     */
    distinct?: OfftakeContractScalarFieldEnum | OfftakeContractScalarFieldEnum[]
  }

  /**
   * OfftakeContract findFirstOrThrow
   */
  export type OfftakeContractFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfftakeContract
     */
    select?: OfftakeContractSelect<ExtArgs> | null
    /**
     * Filter, which OfftakeContract to fetch.
     */
    where?: OfftakeContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfftakeContracts to fetch.
     */
    orderBy?: OfftakeContractOrderByWithRelationInput | OfftakeContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OfftakeContracts.
     */
    cursor?: OfftakeContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfftakeContracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfftakeContracts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OfftakeContracts.
     */
    distinct?: OfftakeContractScalarFieldEnum | OfftakeContractScalarFieldEnum[]
  }

  /**
   * OfftakeContract findMany
   */
  export type OfftakeContractFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfftakeContract
     */
    select?: OfftakeContractSelect<ExtArgs> | null
    /**
     * Filter, which OfftakeContracts to fetch.
     */
    where?: OfftakeContractWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfftakeContracts to fetch.
     */
    orderBy?: OfftakeContractOrderByWithRelationInput | OfftakeContractOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OfftakeContracts.
     */
    cursor?: OfftakeContractWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfftakeContracts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfftakeContracts.
     */
    skip?: number
    distinct?: OfftakeContractScalarFieldEnum | OfftakeContractScalarFieldEnum[]
  }

  /**
   * OfftakeContract create
   */
  export type OfftakeContractCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfftakeContract
     */
    select?: OfftakeContractSelect<ExtArgs> | null
    /**
     * The data needed to create a OfftakeContract.
     */
    data: XOR<OfftakeContractCreateInput, OfftakeContractUncheckedCreateInput>
  }

  /**
   * OfftakeContract createMany
   */
  export type OfftakeContractCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OfftakeContracts.
     */
    data: OfftakeContractCreateManyInput | OfftakeContractCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OfftakeContract createManyAndReturn
   */
  export type OfftakeContractCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfftakeContract
     */
    select?: OfftakeContractSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many OfftakeContracts.
     */
    data: OfftakeContractCreateManyInput | OfftakeContractCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OfftakeContract update
   */
  export type OfftakeContractUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfftakeContract
     */
    select?: OfftakeContractSelect<ExtArgs> | null
    /**
     * The data needed to update a OfftakeContract.
     */
    data: XOR<OfftakeContractUpdateInput, OfftakeContractUncheckedUpdateInput>
    /**
     * Choose, which OfftakeContract to update.
     */
    where: OfftakeContractWhereUniqueInput
  }

  /**
   * OfftakeContract updateMany
   */
  export type OfftakeContractUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OfftakeContracts.
     */
    data: XOR<OfftakeContractUpdateManyMutationInput, OfftakeContractUncheckedUpdateManyInput>
    /**
     * Filter which OfftakeContracts to update
     */
    where?: OfftakeContractWhereInput
  }

  /**
   * OfftakeContract upsert
   */
  export type OfftakeContractUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfftakeContract
     */
    select?: OfftakeContractSelect<ExtArgs> | null
    /**
     * The filter to search for the OfftakeContract to update in case it exists.
     */
    where: OfftakeContractWhereUniqueInput
    /**
     * In case the OfftakeContract found by the `where` argument doesn't exist, create a new OfftakeContract with this data.
     */
    create: XOR<OfftakeContractCreateInput, OfftakeContractUncheckedCreateInput>
    /**
     * In case the OfftakeContract was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OfftakeContractUpdateInput, OfftakeContractUncheckedUpdateInput>
  }

  /**
   * OfftakeContract delete
   */
  export type OfftakeContractDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfftakeContract
     */
    select?: OfftakeContractSelect<ExtArgs> | null
    /**
     * Filter which OfftakeContract to delete.
     */
    where: OfftakeContractWhereUniqueInput
  }

  /**
   * OfftakeContract deleteMany
   */
  export type OfftakeContractDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OfftakeContracts to delete
     */
    where?: OfftakeContractWhereInput
  }

  /**
   * OfftakeContract without action
   */
  export type OfftakeContractDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfftakeContract
     */
    select?: OfftakeContractSelect<ExtArgs> | null
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


  export const FarmerScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    externalRef: 'externalRef',
    kycLite: 'kycLite',
    createdAt: 'createdAt'
  };

  export type FarmerScalarFieldEnum = (typeof FarmerScalarFieldEnum)[keyof typeof FarmerScalarFieldEnum]


  export const FarmScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    farmerId: 'farmerId',
    geo: 'geo',
    crop: 'crop',
    season: 'season',
    createdAt: 'createdAt'
  };

  export type FarmScalarFieldEnum = (typeof FarmScalarFieldEnum)[keyof typeof FarmScalarFieldEnum]


  export const InputLoanScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    farmerId: 'farmerId',
    amountMinor: 'amountMinor',
    currency: 'currency',
    status: 'status',
    payoutIntentId: 'payoutIntentId',
    createdAt: 'createdAt'
  };

  export type InputLoanScalarFieldEnum = (typeof InputLoanScalarFieldEnum)[keyof typeof InputLoanScalarFieldEnum]


  export const InsurancePolicyScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    farmerId: 'farmerId',
    triggerMetric: 'triggerMetric',
    threshold: 'threshold',
    premiumMinor: 'premiumMinor',
    payoutMinor: 'payoutMinor',
    currency: 'currency',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type InsurancePolicyScalarFieldEnum = (typeof InsurancePolicyScalarFieldEnum)[keyof typeof InsurancePolicyScalarFieldEnum]


  export const ProduceLotScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    farmId: 'farmId',
    lotCode: 'lotCode',
    origin: 'origin',
    attestationId: 'attestationId',
    createdAt: 'createdAt'
  };

  export type ProduceLotScalarFieldEnum = (typeof ProduceLotScalarFieldEnum)[keyof typeof ProduceLotScalarFieldEnum]


  export const CustodyHandoffScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    lotId: 'lotId',
    actorRef: 'actorRef',
    geo: 'geo',
    attestationId: 'attestationId',
    createdAt: 'createdAt'
  };

  export type CustodyHandoffScalarFieldEnum = (typeof CustodyHandoffScalarFieldEnum)[keyof typeof CustodyHandoffScalarFieldEnum]


  export const OfftakeContractScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    lotId: 'lotId',
    buyerRef: 'buyerRef',
    priceMinor: 'priceMinor',
    currency: 'currency',
    escrowIntentId: 'escrowIntentId',
    createdAt: 'createdAt'
  };

  export type OfftakeContractScalarFieldEnum = (typeof OfftakeContractScalarFieldEnum)[keyof typeof OfftakeContractScalarFieldEnum]


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
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'LoanStatus'
   */
  export type EnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus'>
    


  /**
   * Reference to a field of type 'LoanStatus[]'
   */
  export type ListEnumLoanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LoanStatus[]'>
    


  /**
   * Reference to a field of type 'PolicyStatus'
   */
  export type EnumPolicyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PolicyStatus'>
    


  /**
   * Reference to a field of type 'PolicyStatus[]'
   */
  export type ListEnumPolicyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PolicyStatus[]'>
    


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

  export type FarmerWhereInput = {
    AND?: FarmerWhereInput | FarmerWhereInput[]
    OR?: FarmerWhereInput[]
    NOT?: FarmerWhereInput | FarmerWhereInput[]
    id?: StringFilter<"Farmer"> | string
    orgId?: StringFilter<"Farmer"> | string
    externalRef?: StringFilter<"Farmer"> | string
    kycLite?: StringFilter<"Farmer"> | string
    createdAt?: DateTimeFilter<"Farmer"> | Date | string
    farms?: FarmListRelationFilter
  }

  export type FarmerOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    externalRef?: SortOrder
    kycLite?: SortOrder
    createdAt?: SortOrder
    farms?: FarmOrderByRelationAggregateInput
  }

  export type FarmerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orgId_externalRef?: FarmerOrgIdExternalRefCompoundUniqueInput
    AND?: FarmerWhereInput | FarmerWhereInput[]
    OR?: FarmerWhereInput[]
    NOT?: FarmerWhereInput | FarmerWhereInput[]
    orgId?: StringFilter<"Farmer"> | string
    externalRef?: StringFilter<"Farmer"> | string
    kycLite?: StringFilter<"Farmer"> | string
    createdAt?: DateTimeFilter<"Farmer"> | Date | string
    farms?: FarmListRelationFilter
  }, "id" | "orgId_externalRef">

  export type FarmerOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    externalRef?: SortOrder
    kycLite?: SortOrder
    createdAt?: SortOrder
    _count?: FarmerCountOrderByAggregateInput
    _max?: FarmerMaxOrderByAggregateInput
    _min?: FarmerMinOrderByAggregateInput
  }

  export type FarmerScalarWhereWithAggregatesInput = {
    AND?: FarmerScalarWhereWithAggregatesInput | FarmerScalarWhereWithAggregatesInput[]
    OR?: FarmerScalarWhereWithAggregatesInput[]
    NOT?: FarmerScalarWhereWithAggregatesInput | FarmerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Farmer"> | string
    orgId?: StringWithAggregatesFilter<"Farmer"> | string
    externalRef?: StringWithAggregatesFilter<"Farmer"> | string
    kycLite?: StringWithAggregatesFilter<"Farmer"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Farmer"> | Date | string
  }

  export type FarmWhereInput = {
    AND?: FarmWhereInput | FarmWhereInput[]
    OR?: FarmWhereInput[]
    NOT?: FarmWhereInput | FarmWhereInput[]
    id?: StringFilter<"Farm"> | string
    orgId?: StringFilter<"Farm"> | string
    farmerId?: StringFilter<"Farm"> | string
    geo?: JsonNullableFilter<"Farm">
    crop?: StringNullableFilter<"Farm"> | string | null
    season?: StringNullableFilter<"Farm"> | string | null
    createdAt?: DateTimeFilter<"Farm"> | Date | string
    farmer?: XOR<FarmerRelationFilter, FarmerWhereInput>
    lots?: ProduceLotListRelationFilter
  }

  export type FarmOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmerId?: SortOrder
    geo?: SortOrderInput | SortOrder
    crop?: SortOrderInput | SortOrder
    season?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    farmer?: FarmerOrderByWithRelationInput
    lots?: ProduceLotOrderByRelationAggregateInput
  }

  export type FarmWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FarmWhereInput | FarmWhereInput[]
    OR?: FarmWhereInput[]
    NOT?: FarmWhereInput | FarmWhereInput[]
    orgId?: StringFilter<"Farm"> | string
    farmerId?: StringFilter<"Farm"> | string
    geo?: JsonNullableFilter<"Farm">
    crop?: StringNullableFilter<"Farm"> | string | null
    season?: StringNullableFilter<"Farm"> | string | null
    createdAt?: DateTimeFilter<"Farm"> | Date | string
    farmer?: XOR<FarmerRelationFilter, FarmerWhereInput>
    lots?: ProduceLotListRelationFilter
  }, "id">

  export type FarmOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmerId?: SortOrder
    geo?: SortOrderInput | SortOrder
    crop?: SortOrderInput | SortOrder
    season?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FarmCountOrderByAggregateInput
    _max?: FarmMaxOrderByAggregateInput
    _min?: FarmMinOrderByAggregateInput
  }

  export type FarmScalarWhereWithAggregatesInput = {
    AND?: FarmScalarWhereWithAggregatesInput | FarmScalarWhereWithAggregatesInput[]
    OR?: FarmScalarWhereWithAggregatesInput[]
    NOT?: FarmScalarWhereWithAggregatesInput | FarmScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Farm"> | string
    orgId?: StringWithAggregatesFilter<"Farm"> | string
    farmerId?: StringWithAggregatesFilter<"Farm"> | string
    geo?: JsonNullableWithAggregatesFilter<"Farm">
    crop?: StringNullableWithAggregatesFilter<"Farm"> | string | null
    season?: StringNullableWithAggregatesFilter<"Farm"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Farm"> | Date | string
  }

  export type InputLoanWhereInput = {
    AND?: InputLoanWhereInput | InputLoanWhereInput[]
    OR?: InputLoanWhereInput[]
    NOT?: InputLoanWhereInput | InputLoanWhereInput[]
    id?: StringFilter<"InputLoan"> | string
    orgId?: StringFilter<"InputLoan"> | string
    farmerId?: StringFilter<"InputLoan"> | string
    amountMinor?: BigIntFilter<"InputLoan"> | bigint | number
    currency?: StringFilter<"InputLoan"> | string
    status?: EnumLoanStatusFilter<"InputLoan"> | $Enums.LoanStatus
    payoutIntentId?: StringNullableFilter<"InputLoan"> | string | null
    createdAt?: DateTimeFilter<"InputLoan"> | Date | string
  }

  export type InputLoanOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmerId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    payoutIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type InputLoanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InputLoanWhereInput | InputLoanWhereInput[]
    OR?: InputLoanWhereInput[]
    NOT?: InputLoanWhereInput | InputLoanWhereInput[]
    orgId?: StringFilter<"InputLoan"> | string
    farmerId?: StringFilter<"InputLoan"> | string
    amountMinor?: BigIntFilter<"InputLoan"> | bigint | number
    currency?: StringFilter<"InputLoan"> | string
    status?: EnumLoanStatusFilter<"InputLoan"> | $Enums.LoanStatus
    payoutIntentId?: StringNullableFilter<"InputLoan"> | string | null
    createdAt?: DateTimeFilter<"InputLoan"> | Date | string
  }, "id">

  export type InputLoanOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmerId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    payoutIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: InputLoanCountOrderByAggregateInput
    _avg?: InputLoanAvgOrderByAggregateInput
    _max?: InputLoanMaxOrderByAggregateInput
    _min?: InputLoanMinOrderByAggregateInput
    _sum?: InputLoanSumOrderByAggregateInput
  }

  export type InputLoanScalarWhereWithAggregatesInput = {
    AND?: InputLoanScalarWhereWithAggregatesInput | InputLoanScalarWhereWithAggregatesInput[]
    OR?: InputLoanScalarWhereWithAggregatesInput[]
    NOT?: InputLoanScalarWhereWithAggregatesInput | InputLoanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InputLoan"> | string
    orgId?: StringWithAggregatesFilter<"InputLoan"> | string
    farmerId?: StringWithAggregatesFilter<"InputLoan"> | string
    amountMinor?: BigIntWithAggregatesFilter<"InputLoan"> | bigint | number
    currency?: StringWithAggregatesFilter<"InputLoan"> | string
    status?: EnumLoanStatusWithAggregatesFilter<"InputLoan"> | $Enums.LoanStatus
    payoutIntentId?: StringNullableWithAggregatesFilter<"InputLoan"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"InputLoan"> | Date | string
  }

  export type InsurancePolicyWhereInput = {
    AND?: InsurancePolicyWhereInput | InsurancePolicyWhereInput[]
    OR?: InsurancePolicyWhereInput[]
    NOT?: InsurancePolicyWhereInput | InsurancePolicyWhereInput[]
    id?: StringFilter<"InsurancePolicy"> | string
    orgId?: StringFilter<"InsurancePolicy"> | string
    farmerId?: StringFilter<"InsurancePolicy"> | string
    triggerMetric?: StringFilter<"InsurancePolicy"> | string
    threshold?: StringFilter<"InsurancePolicy"> | string
    premiumMinor?: BigIntFilter<"InsurancePolicy"> | bigint | number
    payoutMinor?: BigIntFilter<"InsurancePolicy"> | bigint | number
    currency?: StringFilter<"InsurancePolicy"> | string
    status?: EnumPolicyStatusFilter<"InsurancePolicy"> | $Enums.PolicyStatus
    createdAt?: DateTimeFilter<"InsurancePolicy"> | Date | string
  }

  export type InsurancePolicyOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmerId?: SortOrder
    triggerMetric?: SortOrder
    threshold?: SortOrder
    premiumMinor?: SortOrder
    payoutMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type InsurancePolicyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InsurancePolicyWhereInput | InsurancePolicyWhereInput[]
    OR?: InsurancePolicyWhereInput[]
    NOT?: InsurancePolicyWhereInput | InsurancePolicyWhereInput[]
    orgId?: StringFilter<"InsurancePolicy"> | string
    farmerId?: StringFilter<"InsurancePolicy"> | string
    triggerMetric?: StringFilter<"InsurancePolicy"> | string
    threshold?: StringFilter<"InsurancePolicy"> | string
    premiumMinor?: BigIntFilter<"InsurancePolicy"> | bigint | number
    payoutMinor?: BigIntFilter<"InsurancePolicy"> | bigint | number
    currency?: StringFilter<"InsurancePolicy"> | string
    status?: EnumPolicyStatusFilter<"InsurancePolicy"> | $Enums.PolicyStatus
    createdAt?: DateTimeFilter<"InsurancePolicy"> | Date | string
  }, "id">

  export type InsurancePolicyOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmerId?: SortOrder
    triggerMetric?: SortOrder
    threshold?: SortOrder
    premiumMinor?: SortOrder
    payoutMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: InsurancePolicyCountOrderByAggregateInput
    _avg?: InsurancePolicyAvgOrderByAggregateInput
    _max?: InsurancePolicyMaxOrderByAggregateInput
    _min?: InsurancePolicyMinOrderByAggregateInput
    _sum?: InsurancePolicySumOrderByAggregateInput
  }

  export type InsurancePolicyScalarWhereWithAggregatesInput = {
    AND?: InsurancePolicyScalarWhereWithAggregatesInput | InsurancePolicyScalarWhereWithAggregatesInput[]
    OR?: InsurancePolicyScalarWhereWithAggregatesInput[]
    NOT?: InsurancePolicyScalarWhereWithAggregatesInput | InsurancePolicyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InsurancePolicy"> | string
    orgId?: StringWithAggregatesFilter<"InsurancePolicy"> | string
    farmerId?: StringWithAggregatesFilter<"InsurancePolicy"> | string
    triggerMetric?: StringWithAggregatesFilter<"InsurancePolicy"> | string
    threshold?: StringWithAggregatesFilter<"InsurancePolicy"> | string
    premiumMinor?: BigIntWithAggregatesFilter<"InsurancePolicy"> | bigint | number
    payoutMinor?: BigIntWithAggregatesFilter<"InsurancePolicy"> | bigint | number
    currency?: StringWithAggregatesFilter<"InsurancePolicy"> | string
    status?: EnumPolicyStatusWithAggregatesFilter<"InsurancePolicy"> | $Enums.PolicyStatus
    createdAt?: DateTimeWithAggregatesFilter<"InsurancePolicy"> | Date | string
  }

  export type ProduceLotWhereInput = {
    AND?: ProduceLotWhereInput | ProduceLotWhereInput[]
    OR?: ProduceLotWhereInput[]
    NOT?: ProduceLotWhereInput | ProduceLotWhereInput[]
    id?: StringFilter<"ProduceLot"> | string
    orgId?: StringFilter<"ProduceLot"> | string
    farmId?: StringFilter<"ProduceLot"> | string
    lotCode?: StringFilter<"ProduceLot"> | string
    origin?: StringNullableFilter<"ProduceLot"> | string | null
    attestationId?: StringNullableFilter<"ProduceLot"> | string | null
    createdAt?: DateTimeFilter<"ProduceLot"> | Date | string
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    custody?: CustodyHandoffListRelationFilter
  }

  export type ProduceLotOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmId?: SortOrder
    lotCode?: SortOrder
    origin?: SortOrderInput | SortOrder
    attestationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    farm?: FarmOrderByWithRelationInput
    custody?: CustodyHandoffOrderByRelationAggregateInput
  }

  export type ProduceLotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orgId_lotCode?: ProduceLotOrgIdLotCodeCompoundUniqueInput
    AND?: ProduceLotWhereInput | ProduceLotWhereInput[]
    OR?: ProduceLotWhereInput[]
    NOT?: ProduceLotWhereInput | ProduceLotWhereInput[]
    orgId?: StringFilter<"ProduceLot"> | string
    farmId?: StringFilter<"ProduceLot"> | string
    lotCode?: StringFilter<"ProduceLot"> | string
    origin?: StringNullableFilter<"ProduceLot"> | string | null
    attestationId?: StringNullableFilter<"ProduceLot"> | string | null
    createdAt?: DateTimeFilter<"ProduceLot"> | Date | string
    farm?: XOR<FarmRelationFilter, FarmWhereInput>
    custody?: CustodyHandoffListRelationFilter
  }, "id" | "orgId_lotCode">

  export type ProduceLotOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmId?: SortOrder
    lotCode?: SortOrder
    origin?: SortOrderInput | SortOrder
    attestationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ProduceLotCountOrderByAggregateInput
    _max?: ProduceLotMaxOrderByAggregateInput
    _min?: ProduceLotMinOrderByAggregateInput
  }

  export type ProduceLotScalarWhereWithAggregatesInput = {
    AND?: ProduceLotScalarWhereWithAggregatesInput | ProduceLotScalarWhereWithAggregatesInput[]
    OR?: ProduceLotScalarWhereWithAggregatesInput[]
    NOT?: ProduceLotScalarWhereWithAggregatesInput | ProduceLotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProduceLot"> | string
    orgId?: StringWithAggregatesFilter<"ProduceLot"> | string
    farmId?: StringWithAggregatesFilter<"ProduceLot"> | string
    lotCode?: StringWithAggregatesFilter<"ProduceLot"> | string
    origin?: StringNullableWithAggregatesFilter<"ProduceLot"> | string | null
    attestationId?: StringNullableWithAggregatesFilter<"ProduceLot"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProduceLot"> | Date | string
  }

  export type CustodyHandoffWhereInput = {
    AND?: CustodyHandoffWhereInput | CustodyHandoffWhereInput[]
    OR?: CustodyHandoffWhereInput[]
    NOT?: CustodyHandoffWhereInput | CustodyHandoffWhereInput[]
    id?: StringFilter<"CustodyHandoff"> | string
    orgId?: StringFilter<"CustodyHandoff"> | string
    lotId?: StringFilter<"CustodyHandoff"> | string
    actorRef?: StringFilter<"CustodyHandoff"> | string
    geo?: JsonNullableFilter<"CustodyHandoff">
    attestationId?: StringNullableFilter<"CustodyHandoff"> | string | null
    createdAt?: DateTimeFilter<"CustodyHandoff"> | Date | string
    lot?: XOR<ProduceLotRelationFilter, ProduceLotWhereInput>
  }

  export type CustodyHandoffOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    lotId?: SortOrder
    actorRef?: SortOrder
    geo?: SortOrderInput | SortOrder
    attestationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lot?: ProduceLotOrderByWithRelationInput
  }

  export type CustodyHandoffWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustodyHandoffWhereInput | CustodyHandoffWhereInput[]
    OR?: CustodyHandoffWhereInput[]
    NOT?: CustodyHandoffWhereInput | CustodyHandoffWhereInput[]
    orgId?: StringFilter<"CustodyHandoff"> | string
    lotId?: StringFilter<"CustodyHandoff"> | string
    actorRef?: StringFilter<"CustodyHandoff"> | string
    geo?: JsonNullableFilter<"CustodyHandoff">
    attestationId?: StringNullableFilter<"CustodyHandoff"> | string | null
    createdAt?: DateTimeFilter<"CustodyHandoff"> | Date | string
    lot?: XOR<ProduceLotRelationFilter, ProduceLotWhereInput>
  }, "id">

  export type CustodyHandoffOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    lotId?: SortOrder
    actorRef?: SortOrder
    geo?: SortOrderInput | SortOrder
    attestationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CustodyHandoffCountOrderByAggregateInput
    _max?: CustodyHandoffMaxOrderByAggregateInput
    _min?: CustodyHandoffMinOrderByAggregateInput
  }

  export type CustodyHandoffScalarWhereWithAggregatesInput = {
    AND?: CustodyHandoffScalarWhereWithAggregatesInput | CustodyHandoffScalarWhereWithAggregatesInput[]
    OR?: CustodyHandoffScalarWhereWithAggregatesInput[]
    NOT?: CustodyHandoffScalarWhereWithAggregatesInput | CustodyHandoffScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustodyHandoff"> | string
    orgId?: StringWithAggregatesFilter<"CustodyHandoff"> | string
    lotId?: StringWithAggregatesFilter<"CustodyHandoff"> | string
    actorRef?: StringWithAggregatesFilter<"CustodyHandoff"> | string
    geo?: JsonNullableWithAggregatesFilter<"CustodyHandoff">
    attestationId?: StringNullableWithAggregatesFilter<"CustodyHandoff"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CustodyHandoff"> | Date | string
  }

  export type OfftakeContractWhereInput = {
    AND?: OfftakeContractWhereInput | OfftakeContractWhereInput[]
    OR?: OfftakeContractWhereInput[]
    NOT?: OfftakeContractWhereInput | OfftakeContractWhereInput[]
    id?: StringFilter<"OfftakeContract"> | string
    orgId?: StringFilter<"OfftakeContract"> | string
    lotId?: StringFilter<"OfftakeContract"> | string
    buyerRef?: StringFilter<"OfftakeContract"> | string
    priceMinor?: BigIntFilter<"OfftakeContract"> | bigint | number
    currency?: StringFilter<"OfftakeContract"> | string
    escrowIntentId?: StringNullableFilter<"OfftakeContract"> | string | null
    createdAt?: DateTimeFilter<"OfftakeContract"> | Date | string
  }

  export type OfftakeContractOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    lotId?: SortOrder
    buyerRef?: SortOrder
    priceMinor?: SortOrder
    currency?: SortOrder
    escrowIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type OfftakeContractWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OfftakeContractWhereInput | OfftakeContractWhereInput[]
    OR?: OfftakeContractWhereInput[]
    NOT?: OfftakeContractWhereInput | OfftakeContractWhereInput[]
    orgId?: StringFilter<"OfftakeContract"> | string
    lotId?: StringFilter<"OfftakeContract"> | string
    buyerRef?: StringFilter<"OfftakeContract"> | string
    priceMinor?: BigIntFilter<"OfftakeContract"> | bigint | number
    currency?: StringFilter<"OfftakeContract"> | string
    escrowIntentId?: StringNullableFilter<"OfftakeContract"> | string | null
    createdAt?: DateTimeFilter<"OfftakeContract"> | Date | string
  }, "id">

  export type OfftakeContractOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    lotId?: SortOrder
    buyerRef?: SortOrder
    priceMinor?: SortOrder
    currency?: SortOrder
    escrowIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OfftakeContractCountOrderByAggregateInput
    _avg?: OfftakeContractAvgOrderByAggregateInput
    _max?: OfftakeContractMaxOrderByAggregateInput
    _min?: OfftakeContractMinOrderByAggregateInput
    _sum?: OfftakeContractSumOrderByAggregateInput
  }

  export type OfftakeContractScalarWhereWithAggregatesInput = {
    AND?: OfftakeContractScalarWhereWithAggregatesInput | OfftakeContractScalarWhereWithAggregatesInput[]
    OR?: OfftakeContractScalarWhereWithAggregatesInput[]
    NOT?: OfftakeContractScalarWhereWithAggregatesInput | OfftakeContractScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OfftakeContract"> | string
    orgId?: StringWithAggregatesFilter<"OfftakeContract"> | string
    lotId?: StringWithAggregatesFilter<"OfftakeContract"> | string
    buyerRef?: StringWithAggregatesFilter<"OfftakeContract"> | string
    priceMinor?: BigIntWithAggregatesFilter<"OfftakeContract"> | bigint | number
    currency?: StringWithAggregatesFilter<"OfftakeContract"> | string
    escrowIntentId?: StringNullableWithAggregatesFilter<"OfftakeContract"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"OfftakeContract"> | Date | string
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

  export type FarmerCreateInput = {
    id: string
    orgId: string
    externalRef: string
    kycLite?: string
    createdAt?: Date | string
    farms?: FarmCreateNestedManyWithoutFarmerInput
  }

  export type FarmerUncheckedCreateInput = {
    id: string
    orgId: string
    externalRef: string
    kycLite?: string
    createdAt?: Date | string
    farms?: FarmUncheckedCreateNestedManyWithoutFarmerInput
  }

  export type FarmerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kycLite?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farms?: FarmUpdateManyWithoutFarmerNestedInput
  }

  export type FarmerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kycLite?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farms?: FarmUncheckedUpdateManyWithoutFarmerNestedInput
  }

  export type FarmerCreateManyInput = {
    id: string
    orgId: string
    externalRef: string
    kycLite?: string
    createdAt?: Date | string
  }

  export type FarmerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kycLite?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kycLite?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmCreateInput = {
    id: string
    orgId: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: string | null
    season?: string | null
    createdAt?: Date | string
    farmer: FarmerCreateNestedOneWithoutFarmsInput
    lots?: ProduceLotCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateInput = {
    id: string
    orgId: string
    farmerId: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: string | null
    season?: string | null
    createdAt?: Date | string
    lots?: ProduceLotUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: NullableStringFieldUpdateOperationsInput | string | null
    season?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmer?: FarmerUpdateOneRequiredWithoutFarmsNestedInput
    lots?: ProduceLotUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: NullableStringFieldUpdateOperationsInput | string | null
    season?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lots?: ProduceLotUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type FarmCreateManyInput = {
    id: string
    orgId: string
    farmerId: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: string | null
    season?: string | null
    createdAt?: Date | string
  }

  export type FarmUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: NullableStringFieldUpdateOperationsInput | string | null
    season?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: NullableStringFieldUpdateOperationsInput | string | null
    season?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InputLoanCreateInput = {
    id: string
    orgId: string
    farmerId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.LoanStatus
    payoutIntentId?: string | null
    createdAt?: Date | string
  }

  export type InputLoanUncheckedCreateInput = {
    id: string
    orgId: string
    farmerId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.LoanStatus
    payoutIntentId?: string | null
    createdAt?: Date | string
  }

  export type InputLoanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    payoutIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InputLoanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    payoutIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InputLoanCreateManyInput = {
    id: string
    orgId: string
    farmerId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.LoanStatus
    payoutIntentId?: string | null
    createdAt?: Date | string
  }

  export type InputLoanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    payoutIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InputLoanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumLoanStatusFieldUpdateOperationsInput | $Enums.LoanStatus
    payoutIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsurancePolicyCreateInput = {
    id: string
    orgId: string
    farmerId: string
    triggerMetric: string
    threshold: string
    premiumMinor: bigint | number
    payoutMinor: bigint | number
    currency: string
    status?: $Enums.PolicyStatus
    createdAt?: Date | string
  }

  export type InsurancePolicyUncheckedCreateInput = {
    id: string
    orgId: string
    farmerId: string
    triggerMetric: string
    threshold: string
    premiumMinor: bigint | number
    payoutMinor: bigint | number
    currency: string
    status?: $Enums.PolicyStatus
    createdAt?: Date | string
  }

  export type InsurancePolicyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    triggerMetric?: StringFieldUpdateOperationsInput | string
    threshold?: StringFieldUpdateOperationsInput | string
    premiumMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    payoutMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPolicyStatusFieldUpdateOperationsInput | $Enums.PolicyStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsurancePolicyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    triggerMetric?: StringFieldUpdateOperationsInput | string
    threshold?: StringFieldUpdateOperationsInput | string
    premiumMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    payoutMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPolicyStatusFieldUpdateOperationsInput | $Enums.PolicyStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsurancePolicyCreateManyInput = {
    id: string
    orgId: string
    farmerId: string
    triggerMetric: string
    threshold: string
    premiumMinor: bigint | number
    payoutMinor: bigint | number
    currency: string
    status?: $Enums.PolicyStatus
    createdAt?: Date | string
  }

  export type InsurancePolicyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    triggerMetric?: StringFieldUpdateOperationsInput | string
    threshold?: StringFieldUpdateOperationsInput | string
    premiumMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    payoutMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPolicyStatusFieldUpdateOperationsInput | $Enums.PolicyStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InsurancePolicyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    triggerMetric?: StringFieldUpdateOperationsInput | string
    threshold?: StringFieldUpdateOperationsInput | string
    premiumMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    payoutMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPolicyStatusFieldUpdateOperationsInput | $Enums.PolicyStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProduceLotCreateInput = {
    id: string
    orgId: string
    lotCode: string
    origin?: string | null
    attestationId?: string | null
    createdAt?: Date | string
    farm: FarmCreateNestedOneWithoutLotsInput
    custody?: CustodyHandoffCreateNestedManyWithoutLotInput
  }

  export type ProduceLotUncheckedCreateInput = {
    id: string
    orgId: string
    farmId: string
    lotCode: string
    origin?: string | null
    attestationId?: string | null
    createdAt?: Date | string
    custody?: CustodyHandoffUncheckedCreateNestedManyWithoutLotInput
  }

  export type ProduceLotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    lotCode?: StringFieldUpdateOperationsInput | string
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutLotsNestedInput
    custody?: CustodyHandoffUpdateManyWithoutLotNestedInput
  }

  export type ProduceLotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    farmId?: StringFieldUpdateOperationsInput | string
    lotCode?: StringFieldUpdateOperationsInput | string
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    custody?: CustodyHandoffUncheckedUpdateManyWithoutLotNestedInput
  }

  export type ProduceLotCreateManyInput = {
    id: string
    orgId: string
    farmId: string
    lotCode: string
    origin?: string | null
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type ProduceLotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    lotCode?: StringFieldUpdateOperationsInput | string
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProduceLotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    farmId?: StringFieldUpdateOperationsInput | string
    lotCode?: StringFieldUpdateOperationsInput | string
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustodyHandoffCreateInput = {
    id: string
    orgId: string
    actorRef: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: string | null
    createdAt?: Date | string
    lot: ProduceLotCreateNestedOneWithoutCustodyInput
  }

  export type CustodyHandoffUncheckedCreateInput = {
    id: string
    orgId: string
    lotId: string
    actorRef: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type CustodyHandoffUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    actorRef?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lot?: ProduceLotUpdateOneRequiredWithoutCustodyNestedInput
  }

  export type CustodyHandoffUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    lotId?: StringFieldUpdateOperationsInput | string
    actorRef?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustodyHandoffCreateManyInput = {
    id: string
    orgId: string
    lotId: string
    actorRef: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type CustodyHandoffUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    actorRef?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustodyHandoffUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    lotId?: StringFieldUpdateOperationsInput | string
    actorRef?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfftakeContractCreateInput = {
    id: string
    orgId: string
    lotId: string
    buyerRef: string
    priceMinor: bigint | number
    currency: string
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type OfftakeContractUncheckedCreateInput = {
    id: string
    orgId: string
    lotId: string
    buyerRef: string
    priceMinor: bigint | number
    currency: string
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type OfftakeContractUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    lotId?: StringFieldUpdateOperationsInput | string
    buyerRef?: StringFieldUpdateOperationsInput | string
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfftakeContractUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    lotId?: StringFieldUpdateOperationsInput | string
    buyerRef?: StringFieldUpdateOperationsInput | string
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfftakeContractCreateManyInput = {
    id: string
    orgId: string
    lotId: string
    buyerRef: string
    priceMinor: bigint | number
    currency: string
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type OfftakeContractUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    lotId?: StringFieldUpdateOperationsInput | string
    buyerRef?: StringFieldUpdateOperationsInput | string
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfftakeContractUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    lotId?: StringFieldUpdateOperationsInput | string
    buyerRef?: StringFieldUpdateOperationsInput | string
    priceMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
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

  export type FarmListRelationFilter = {
    every?: FarmWhereInput
    some?: FarmWhereInput
    none?: FarmWhereInput
  }

  export type FarmOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FarmerOrgIdExternalRefCompoundUniqueInput = {
    orgId: string
    externalRef: string
  }

  export type FarmerCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    externalRef?: SortOrder
    kycLite?: SortOrder
    createdAt?: SortOrder
  }

  export type FarmerMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    externalRef?: SortOrder
    kycLite?: SortOrder
    createdAt?: SortOrder
  }

  export type FarmerMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    externalRef?: SortOrder
    kycLite?: SortOrder
    createdAt?: SortOrder
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

  export type FarmerRelationFilter = {
    is?: FarmerWhereInput
    isNot?: FarmerWhereInput
  }

  export type ProduceLotListRelationFilter = {
    every?: ProduceLotWhereInput
    some?: ProduceLotWhereInput
    none?: ProduceLotWhereInput
  }

  export type ProduceLotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FarmCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmerId?: SortOrder
    geo?: SortOrder
    crop?: SortOrder
    season?: SortOrder
    createdAt?: SortOrder
  }

  export type FarmMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmerId?: SortOrder
    crop?: SortOrder
    season?: SortOrder
    createdAt?: SortOrder
  }

  export type FarmMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmerId?: SortOrder
    crop?: SortOrder
    season?: SortOrder
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

  export type EnumLoanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusFilter<$PrismaModel> | $Enums.LoanStatus
  }

  export type InputLoanCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmerId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    payoutIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type InputLoanAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type InputLoanMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmerId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    payoutIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type InputLoanMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmerId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    payoutIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type InputLoanSumOrderByAggregateInput = {
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

  export type EnumLoanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel> | $Enums.LoanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanStatusFilter<$PrismaModel>
    _max?: NestedEnumLoanStatusFilter<$PrismaModel>
  }

  export type EnumPolicyStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PolicyStatus | EnumPolicyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PolicyStatus[] | ListEnumPolicyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PolicyStatus[] | ListEnumPolicyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPolicyStatusFilter<$PrismaModel> | $Enums.PolicyStatus
  }

  export type InsurancePolicyCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmerId?: SortOrder
    triggerMetric?: SortOrder
    threshold?: SortOrder
    premiumMinor?: SortOrder
    payoutMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type InsurancePolicyAvgOrderByAggregateInput = {
    premiumMinor?: SortOrder
    payoutMinor?: SortOrder
  }

  export type InsurancePolicyMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmerId?: SortOrder
    triggerMetric?: SortOrder
    threshold?: SortOrder
    premiumMinor?: SortOrder
    payoutMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type InsurancePolicyMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmerId?: SortOrder
    triggerMetric?: SortOrder
    threshold?: SortOrder
    premiumMinor?: SortOrder
    payoutMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type InsurancePolicySumOrderByAggregateInput = {
    premiumMinor?: SortOrder
    payoutMinor?: SortOrder
  }

  export type EnumPolicyStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PolicyStatus | EnumPolicyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PolicyStatus[] | ListEnumPolicyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PolicyStatus[] | ListEnumPolicyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPolicyStatusWithAggregatesFilter<$PrismaModel> | $Enums.PolicyStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPolicyStatusFilter<$PrismaModel>
    _max?: NestedEnumPolicyStatusFilter<$PrismaModel>
  }

  export type FarmRelationFilter = {
    is?: FarmWhereInput
    isNot?: FarmWhereInput
  }

  export type CustodyHandoffListRelationFilter = {
    every?: CustodyHandoffWhereInput
    some?: CustodyHandoffWhereInput
    none?: CustodyHandoffWhereInput
  }

  export type CustodyHandoffOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProduceLotOrgIdLotCodeCompoundUniqueInput = {
    orgId: string
    lotCode: string
  }

  export type ProduceLotCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmId?: SortOrder
    lotCode?: SortOrder
    origin?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProduceLotMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmId?: SortOrder
    lotCode?: SortOrder
    origin?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProduceLotMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    farmId?: SortOrder
    lotCode?: SortOrder
    origin?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProduceLotRelationFilter = {
    is?: ProduceLotWhereInput
    isNot?: ProduceLotWhereInput
  }

  export type CustodyHandoffCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    lotId?: SortOrder
    actorRef?: SortOrder
    geo?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type CustodyHandoffMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    lotId?: SortOrder
    actorRef?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type CustodyHandoffMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    lotId?: SortOrder
    actorRef?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type OfftakeContractCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    lotId?: SortOrder
    buyerRef?: SortOrder
    priceMinor?: SortOrder
    currency?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type OfftakeContractAvgOrderByAggregateInput = {
    priceMinor?: SortOrder
  }

  export type OfftakeContractMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    lotId?: SortOrder
    buyerRef?: SortOrder
    priceMinor?: SortOrder
    currency?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type OfftakeContractMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    lotId?: SortOrder
    buyerRef?: SortOrder
    priceMinor?: SortOrder
    currency?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type OfftakeContractSumOrderByAggregateInput = {
    priceMinor?: SortOrder
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

  export type FarmCreateNestedManyWithoutFarmerInput = {
    create?: XOR<FarmCreateWithoutFarmerInput, FarmUncheckedCreateWithoutFarmerInput> | FarmCreateWithoutFarmerInput[] | FarmUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: FarmCreateOrConnectWithoutFarmerInput | FarmCreateOrConnectWithoutFarmerInput[]
    createMany?: FarmCreateManyFarmerInputEnvelope
    connect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
  }

  export type FarmUncheckedCreateNestedManyWithoutFarmerInput = {
    create?: XOR<FarmCreateWithoutFarmerInput, FarmUncheckedCreateWithoutFarmerInput> | FarmCreateWithoutFarmerInput[] | FarmUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: FarmCreateOrConnectWithoutFarmerInput | FarmCreateOrConnectWithoutFarmerInput[]
    createMany?: FarmCreateManyFarmerInputEnvelope
    connect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
  }

  export type FarmUpdateManyWithoutFarmerNestedInput = {
    create?: XOR<FarmCreateWithoutFarmerInput, FarmUncheckedCreateWithoutFarmerInput> | FarmCreateWithoutFarmerInput[] | FarmUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: FarmCreateOrConnectWithoutFarmerInput | FarmCreateOrConnectWithoutFarmerInput[]
    upsert?: FarmUpsertWithWhereUniqueWithoutFarmerInput | FarmUpsertWithWhereUniqueWithoutFarmerInput[]
    createMany?: FarmCreateManyFarmerInputEnvelope
    set?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    disconnect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    delete?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    connect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    update?: FarmUpdateWithWhereUniqueWithoutFarmerInput | FarmUpdateWithWhereUniqueWithoutFarmerInput[]
    updateMany?: FarmUpdateManyWithWhereWithoutFarmerInput | FarmUpdateManyWithWhereWithoutFarmerInput[]
    deleteMany?: FarmScalarWhereInput | FarmScalarWhereInput[]
  }

  export type FarmUncheckedUpdateManyWithoutFarmerNestedInput = {
    create?: XOR<FarmCreateWithoutFarmerInput, FarmUncheckedCreateWithoutFarmerInput> | FarmCreateWithoutFarmerInput[] | FarmUncheckedCreateWithoutFarmerInput[]
    connectOrCreate?: FarmCreateOrConnectWithoutFarmerInput | FarmCreateOrConnectWithoutFarmerInput[]
    upsert?: FarmUpsertWithWhereUniqueWithoutFarmerInput | FarmUpsertWithWhereUniqueWithoutFarmerInput[]
    createMany?: FarmCreateManyFarmerInputEnvelope
    set?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    disconnect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    delete?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    connect?: FarmWhereUniqueInput | FarmWhereUniqueInput[]
    update?: FarmUpdateWithWhereUniqueWithoutFarmerInput | FarmUpdateWithWhereUniqueWithoutFarmerInput[]
    updateMany?: FarmUpdateManyWithWhereWithoutFarmerInput | FarmUpdateManyWithWhereWithoutFarmerInput[]
    deleteMany?: FarmScalarWhereInput | FarmScalarWhereInput[]
  }

  export type FarmerCreateNestedOneWithoutFarmsInput = {
    create?: XOR<FarmerCreateWithoutFarmsInput, FarmerUncheckedCreateWithoutFarmsInput>
    connectOrCreate?: FarmerCreateOrConnectWithoutFarmsInput
    connect?: FarmerWhereUniqueInput
  }

  export type ProduceLotCreateNestedManyWithoutFarmInput = {
    create?: XOR<ProduceLotCreateWithoutFarmInput, ProduceLotUncheckedCreateWithoutFarmInput> | ProduceLotCreateWithoutFarmInput[] | ProduceLotUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: ProduceLotCreateOrConnectWithoutFarmInput | ProduceLotCreateOrConnectWithoutFarmInput[]
    createMany?: ProduceLotCreateManyFarmInputEnvelope
    connect?: ProduceLotWhereUniqueInput | ProduceLotWhereUniqueInput[]
  }

  export type ProduceLotUncheckedCreateNestedManyWithoutFarmInput = {
    create?: XOR<ProduceLotCreateWithoutFarmInput, ProduceLotUncheckedCreateWithoutFarmInput> | ProduceLotCreateWithoutFarmInput[] | ProduceLotUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: ProduceLotCreateOrConnectWithoutFarmInput | ProduceLotCreateOrConnectWithoutFarmInput[]
    createMany?: ProduceLotCreateManyFarmInputEnvelope
    connect?: ProduceLotWhereUniqueInput | ProduceLotWhereUniqueInput[]
  }

  export type FarmerUpdateOneRequiredWithoutFarmsNestedInput = {
    create?: XOR<FarmerCreateWithoutFarmsInput, FarmerUncheckedCreateWithoutFarmsInput>
    connectOrCreate?: FarmerCreateOrConnectWithoutFarmsInput
    upsert?: FarmerUpsertWithoutFarmsInput
    connect?: FarmerWhereUniqueInput
    update?: XOR<XOR<FarmerUpdateToOneWithWhereWithoutFarmsInput, FarmerUpdateWithoutFarmsInput>, FarmerUncheckedUpdateWithoutFarmsInput>
  }

  export type ProduceLotUpdateManyWithoutFarmNestedInput = {
    create?: XOR<ProduceLotCreateWithoutFarmInput, ProduceLotUncheckedCreateWithoutFarmInput> | ProduceLotCreateWithoutFarmInput[] | ProduceLotUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: ProduceLotCreateOrConnectWithoutFarmInput | ProduceLotCreateOrConnectWithoutFarmInput[]
    upsert?: ProduceLotUpsertWithWhereUniqueWithoutFarmInput | ProduceLotUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: ProduceLotCreateManyFarmInputEnvelope
    set?: ProduceLotWhereUniqueInput | ProduceLotWhereUniqueInput[]
    disconnect?: ProduceLotWhereUniqueInput | ProduceLotWhereUniqueInput[]
    delete?: ProduceLotWhereUniqueInput | ProduceLotWhereUniqueInput[]
    connect?: ProduceLotWhereUniqueInput | ProduceLotWhereUniqueInput[]
    update?: ProduceLotUpdateWithWhereUniqueWithoutFarmInput | ProduceLotUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: ProduceLotUpdateManyWithWhereWithoutFarmInput | ProduceLotUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: ProduceLotScalarWhereInput | ProduceLotScalarWhereInput[]
  }

  export type ProduceLotUncheckedUpdateManyWithoutFarmNestedInput = {
    create?: XOR<ProduceLotCreateWithoutFarmInput, ProduceLotUncheckedCreateWithoutFarmInput> | ProduceLotCreateWithoutFarmInput[] | ProduceLotUncheckedCreateWithoutFarmInput[]
    connectOrCreate?: ProduceLotCreateOrConnectWithoutFarmInput | ProduceLotCreateOrConnectWithoutFarmInput[]
    upsert?: ProduceLotUpsertWithWhereUniqueWithoutFarmInput | ProduceLotUpsertWithWhereUniqueWithoutFarmInput[]
    createMany?: ProduceLotCreateManyFarmInputEnvelope
    set?: ProduceLotWhereUniqueInput | ProduceLotWhereUniqueInput[]
    disconnect?: ProduceLotWhereUniqueInput | ProduceLotWhereUniqueInput[]
    delete?: ProduceLotWhereUniqueInput | ProduceLotWhereUniqueInput[]
    connect?: ProduceLotWhereUniqueInput | ProduceLotWhereUniqueInput[]
    update?: ProduceLotUpdateWithWhereUniqueWithoutFarmInput | ProduceLotUpdateWithWhereUniqueWithoutFarmInput[]
    updateMany?: ProduceLotUpdateManyWithWhereWithoutFarmInput | ProduceLotUpdateManyWithWhereWithoutFarmInput[]
    deleteMany?: ProduceLotScalarWhereInput | ProduceLotScalarWhereInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumLoanStatusFieldUpdateOperationsInput = {
    set?: $Enums.LoanStatus
  }

  export type EnumPolicyStatusFieldUpdateOperationsInput = {
    set?: $Enums.PolicyStatus
  }

  export type FarmCreateNestedOneWithoutLotsInput = {
    create?: XOR<FarmCreateWithoutLotsInput, FarmUncheckedCreateWithoutLotsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutLotsInput
    connect?: FarmWhereUniqueInput
  }

  export type CustodyHandoffCreateNestedManyWithoutLotInput = {
    create?: XOR<CustodyHandoffCreateWithoutLotInput, CustodyHandoffUncheckedCreateWithoutLotInput> | CustodyHandoffCreateWithoutLotInput[] | CustodyHandoffUncheckedCreateWithoutLotInput[]
    connectOrCreate?: CustodyHandoffCreateOrConnectWithoutLotInput | CustodyHandoffCreateOrConnectWithoutLotInput[]
    createMany?: CustodyHandoffCreateManyLotInputEnvelope
    connect?: CustodyHandoffWhereUniqueInput | CustodyHandoffWhereUniqueInput[]
  }

  export type CustodyHandoffUncheckedCreateNestedManyWithoutLotInput = {
    create?: XOR<CustodyHandoffCreateWithoutLotInput, CustodyHandoffUncheckedCreateWithoutLotInput> | CustodyHandoffCreateWithoutLotInput[] | CustodyHandoffUncheckedCreateWithoutLotInput[]
    connectOrCreate?: CustodyHandoffCreateOrConnectWithoutLotInput | CustodyHandoffCreateOrConnectWithoutLotInput[]
    createMany?: CustodyHandoffCreateManyLotInputEnvelope
    connect?: CustodyHandoffWhereUniqueInput | CustodyHandoffWhereUniqueInput[]
  }

  export type FarmUpdateOneRequiredWithoutLotsNestedInput = {
    create?: XOR<FarmCreateWithoutLotsInput, FarmUncheckedCreateWithoutLotsInput>
    connectOrCreate?: FarmCreateOrConnectWithoutLotsInput
    upsert?: FarmUpsertWithoutLotsInput
    connect?: FarmWhereUniqueInput
    update?: XOR<XOR<FarmUpdateToOneWithWhereWithoutLotsInput, FarmUpdateWithoutLotsInput>, FarmUncheckedUpdateWithoutLotsInput>
  }

  export type CustodyHandoffUpdateManyWithoutLotNestedInput = {
    create?: XOR<CustodyHandoffCreateWithoutLotInput, CustodyHandoffUncheckedCreateWithoutLotInput> | CustodyHandoffCreateWithoutLotInput[] | CustodyHandoffUncheckedCreateWithoutLotInput[]
    connectOrCreate?: CustodyHandoffCreateOrConnectWithoutLotInput | CustodyHandoffCreateOrConnectWithoutLotInput[]
    upsert?: CustodyHandoffUpsertWithWhereUniqueWithoutLotInput | CustodyHandoffUpsertWithWhereUniqueWithoutLotInput[]
    createMany?: CustodyHandoffCreateManyLotInputEnvelope
    set?: CustodyHandoffWhereUniqueInput | CustodyHandoffWhereUniqueInput[]
    disconnect?: CustodyHandoffWhereUniqueInput | CustodyHandoffWhereUniqueInput[]
    delete?: CustodyHandoffWhereUniqueInput | CustodyHandoffWhereUniqueInput[]
    connect?: CustodyHandoffWhereUniqueInput | CustodyHandoffWhereUniqueInput[]
    update?: CustodyHandoffUpdateWithWhereUniqueWithoutLotInput | CustodyHandoffUpdateWithWhereUniqueWithoutLotInput[]
    updateMany?: CustodyHandoffUpdateManyWithWhereWithoutLotInput | CustodyHandoffUpdateManyWithWhereWithoutLotInput[]
    deleteMany?: CustodyHandoffScalarWhereInput | CustodyHandoffScalarWhereInput[]
  }

  export type CustodyHandoffUncheckedUpdateManyWithoutLotNestedInput = {
    create?: XOR<CustodyHandoffCreateWithoutLotInput, CustodyHandoffUncheckedCreateWithoutLotInput> | CustodyHandoffCreateWithoutLotInput[] | CustodyHandoffUncheckedCreateWithoutLotInput[]
    connectOrCreate?: CustodyHandoffCreateOrConnectWithoutLotInput | CustodyHandoffCreateOrConnectWithoutLotInput[]
    upsert?: CustodyHandoffUpsertWithWhereUniqueWithoutLotInput | CustodyHandoffUpsertWithWhereUniqueWithoutLotInput[]
    createMany?: CustodyHandoffCreateManyLotInputEnvelope
    set?: CustodyHandoffWhereUniqueInput | CustodyHandoffWhereUniqueInput[]
    disconnect?: CustodyHandoffWhereUniqueInput | CustodyHandoffWhereUniqueInput[]
    delete?: CustodyHandoffWhereUniqueInput | CustodyHandoffWhereUniqueInput[]
    connect?: CustodyHandoffWhereUniqueInput | CustodyHandoffWhereUniqueInput[]
    update?: CustodyHandoffUpdateWithWhereUniqueWithoutLotInput | CustodyHandoffUpdateWithWhereUniqueWithoutLotInput[]
    updateMany?: CustodyHandoffUpdateManyWithWhereWithoutLotInput | CustodyHandoffUpdateManyWithWhereWithoutLotInput[]
    deleteMany?: CustodyHandoffScalarWhereInput | CustodyHandoffScalarWhereInput[]
  }

  export type ProduceLotCreateNestedOneWithoutCustodyInput = {
    create?: XOR<ProduceLotCreateWithoutCustodyInput, ProduceLotUncheckedCreateWithoutCustodyInput>
    connectOrCreate?: ProduceLotCreateOrConnectWithoutCustodyInput
    connect?: ProduceLotWhereUniqueInput
  }

  export type ProduceLotUpdateOneRequiredWithoutCustodyNestedInput = {
    create?: XOR<ProduceLotCreateWithoutCustodyInput, ProduceLotUncheckedCreateWithoutCustodyInput>
    connectOrCreate?: ProduceLotCreateOrConnectWithoutCustodyInput
    upsert?: ProduceLotUpsertWithoutCustodyInput
    connect?: ProduceLotWhereUniqueInput
    update?: XOR<XOR<ProduceLotUpdateToOneWithWhereWithoutCustodyInput, ProduceLotUpdateWithoutCustodyInput>, ProduceLotUncheckedUpdateWithoutCustodyInput>
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

  export type NestedEnumLoanStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusFilter<$PrismaModel> | $Enums.LoanStatus
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

  export type NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LoanStatus | EnumLoanStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LoanStatus[] | ListEnumLoanStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLoanStatusWithAggregatesFilter<$PrismaModel> | $Enums.LoanStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLoanStatusFilter<$PrismaModel>
    _max?: NestedEnumLoanStatusFilter<$PrismaModel>
  }

  export type NestedEnumPolicyStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PolicyStatus | EnumPolicyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PolicyStatus[] | ListEnumPolicyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PolicyStatus[] | ListEnumPolicyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPolicyStatusFilter<$PrismaModel> | $Enums.PolicyStatus
  }

  export type NestedEnumPolicyStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PolicyStatus | EnumPolicyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PolicyStatus[] | ListEnumPolicyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PolicyStatus[] | ListEnumPolicyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPolicyStatusWithAggregatesFilter<$PrismaModel> | $Enums.PolicyStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPolicyStatusFilter<$PrismaModel>
    _max?: NestedEnumPolicyStatusFilter<$PrismaModel>
  }

  export type FarmCreateWithoutFarmerInput = {
    id: string
    orgId: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: string | null
    season?: string | null
    createdAt?: Date | string
    lots?: ProduceLotCreateNestedManyWithoutFarmInput
  }

  export type FarmUncheckedCreateWithoutFarmerInput = {
    id: string
    orgId: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: string | null
    season?: string | null
    createdAt?: Date | string
    lots?: ProduceLotUncheckedCreateNestedManyWithoutFarmInput
  }

  export type FarmCreateOrConnectWithoutFarmerInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutFarmerInput, FarmUncheckedCreateWithoutFarmerInput>
  }

  export type FarmCreateManyFarmerInputEnvelope = {
    data: FarmCreateManyFarmerInput | FarmCreateManyFarmerInput[]
    skipDuplicates?: boolean
  }

  export type FarmUpsertWithWhereUniqueWithoutFarmerInput = {
    where: FarmWhereUniqueInput
    update: XOR<FarmUpdateWithoutFarmerInput, FarmUncheckedUpdateWithoutFarmerInput>
    create: XOR<FarmCreateWithoutFarmerInput, FarmUncheckedCreateWithoutFarmerInput>
  }

  export type FarmUpdateWithWhereUniqueWithoutFarmerInput = {
    where: FarmWhereUniqueInput
    data: XOR<FarmUpdateWithoutFarmerInput, FarmUncheckedUpdateWithoutFarmerInput>
  }

  export type FarmUpdateManyWithWhereWithoutFarmerInput = {
    where: FarmScalarWhereInput
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyWithoutFarmerInput>
  }

  export type FarmScalarWhereInput = {
    AND?: FarmScalarWhereInput | FarmScalarWhereInput[]
    OR?: FarmScalarWhereInput[]
    NOT?: FarmScalarWhereInput | FarmScalarWhereInput[]
    id?: StringFilter<"Farm"> | string
    orgId?: StringFilter<"Farm"> | string
    farmerId?: StringFilter<"Farm"> | string
    geo?: JsonNullableFilter<"Farm">
    crop?: StringNullableFilter<"Farm"> | string | null
    season?: StringNullableFilter<"Farm"> | string | null
    createdAt?: DateTimeFilter<"Farm"> | Date | string
  }

  export type FarmerCreateWithoutFarmsInput = {
    id: string
    orgId: string
    externalRef: string
    kycLite?: string
    createdAt?: Date | string
  }

  export type FarmerUncheckedCreateWithoutFarmsInput = {
    id: string
    orgId: string
    externalRef: string
    kycLite?: string
    createdAt?: Date | string
  }

  export type FarmerCreateOrConnectWithoutFarmsInput = {
    where: FarmerWhereUniqueInput
    create: XOR<FarmerCreateWithoutFarmsInput, FarmerUncheckedCreateWithoutFarmsInput>
  }

  export type ProduceLotCreateWithoutFarmInput = {
    id: string
    orgId: string
    lotCode: string
    origin?: string | null
    attestationId?: string | null
    createdAt?: Date | string
    custody?: CustodyHandoffCreateNestedManyWithoutLotInput
  }

  export type ProduceLotUncheckedCreateWithoutFarmInput = {
    id: string
    orgId: string
    lotCode: string
    origin?: string | null
    attestationId?: string | null
    createdAt?: Date | string
    custody?: CustodyHandoffUncheckedCreateNestedManyWithoutLotInput
  }

  export type ProduceLotCreateOrConnectWithoutFarmInput = {
    where: ProduceLotWhereUniqueInput
    create: XOR<ProduceLotCreateWithoutFarmInput, ProduceLotUncheckedCreateWithoutFarmInput>
  }

  export type ProduceLotCreateManyFarmInputEnvelope = {
    data: ProduceLotCreateManyFarmInput | ProduceLotCreateManyFarmInput[]
    skipDuplicates?: boolean
  }

  export type FarmerUpsertWithoutFarmsInput = {
    update: XOR<FarmerUpdateWithoutFarmsInput, FarmerUncheckedUpdateWithoutFarmsInput>
    create: XOR<FarmerCreateWithoutFarmsInput, FarmerUncheckedCreateWithoutFarmsInput>
    where?: FarmerWhereInput
  }

  export type FarmerUpdateToOneWithWhereWithoutFarmsInput = {
    where?: FarmerWhereInput
    data: XOR<FarmerUpdateWithoutFarmsInput, FarmerUncheckedUpdateWithoutFarmsInput>
  }

  export type FarmerUpdateWithoutFarmsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kycLite?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmerUncheckedUpdateWithoutFarmsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kycLite?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProduceLotUpsertWithWhereUniqueWithoutFarmInput = {
    where: ProduceLotWhereUniqueInput
    update: XOR<ProduceLotUpdateWithoutFarmInput, ProduceLotUncheckedUpdateWithoutFarmInput>
    create: XOR<ProduceLotCreateWithoutFarmInput, ProduceLotUncheckedCreateWithoutFarmInput>
  }

  export type ProduceLotUpdateWithWhereUniqueWithoutFarmInput = {
    where: ProduceLotWhereUniqueInput
    data: XOR<ProduceLotUpdateWithoutFarmInput, ProduceLotUncheckedUpdateWithoutFarmInput>
  }

  export type ProduceLotUpdateManyWithWhereWithoutFarmInput = {
    where: ProduceLotScalarWhereInput
    data: XOR<ProduceLotUpdateManyMutationInput, ProduceLotUncheckedUpdateManyWithoutFarmInput>
  }

  export type ProduceLotScalarWhereInput = {
    AND?: ProduceLotScalarWhereInput | ProduceLotScalarWhereInput[]
    OR?: ProduceLotScalarWhereInput[]
    NOT?: ProduceLotScalarWhereInput | ProduceLotScalarWhereInput[]
    id?: StringFilter<"ProduceLot"> | string
    orgId?: StringFilter<"ProduceLot"> | string
    farmId?: StringFilter<"ProduceLot"> | string
    lotCode?: StringFilter<"ProduceLot"> | string
    origin?: StringNullableFilter<"ProduceLot"> | string | null
    attestationId?: StringNullableFilter<"ProduceLot"> | string | null
    createdAt?: DateTimeFilter<"ProduceLot"> | Date | string
  }

  export type FarmCreateWithoutLotsInput = {
    id: string
    orgId: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: string | null
    season?: string | null
    createdAt?: Date | string
    farmer: FarmerCreateNestedOneWithoutFarmsInput
  }

  export type FarmUncheckedCreateWithoutLotsInput = {
    id: string
    orgId: string
    farmerId: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: string | null
    season?: string | null
    createdAt?: Date | string
  }

  export type FarmCreateOrConnectWithoutLotsInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutLotsInput, FarmUncheckedCreateWithoutLotsInput>
  }

  export type CustodyHandoffCreateWithoutLotInput = {
    id: string
    orgId: string
    actorRef: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type CustodyHandoffUncheckedCreateWithoutLotInput = {
    id: string
    orgId: string
    actorRef: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type CustodyHandoffCreateOrConnectWithoutLotInput = {
    where: CustodyHandoffWhereUniqueInput
    create: XOR<CustodyHandoffCreateWithoutLotInput, CustodyHandoffUncheckedCreateWithoutLotInput>
  }

  export type CustodyHandoffCreateManyLotInputEnvelope = {
    data: CustodyHandoffCreateManyLotInput | CustodyHandoffCreateManyLotInput[]
    skipDuplicates?: boolean
  }

  export type FarmUpsertWithoutLotsInput = {
    update: XOR<FarmUpdateWithoutLotsInput, FarmUncheckedUpdateWithoutLotsInput>
    create: XOR<FarmCreateWithoutLotsInput, FarmUncheckedCreateWithoutLotsInput>
    where?: FarmWhereInput
  }

  export type FarmUpdateToOneWithWhereWithoutLotsInput = {
    where?: FarmWhereInput
    data: XOR<FarmUpdateWithoutLotsInput, FarmUncheckedUpdateWithoutLotsInput>
  }

  export type FarmUpdateWithoutLotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: NullableStringFieldUpdateOperationsInput | string | null
    season?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farmer?: FarmerUpdateOneRequiredWithoutFarmsNestedInput
  }

  export type FarmUncheckedUpdateWithoutLotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    farmerId?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: NullableStringFieldUpdateOperationsInput | string | null
    season?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustodyHandoffUpsertWithWhereUniqueWithoutLotInput = {
    where: CustodyHandoffWhereUniqueInput
    update: XOR<CustodyHandoffUpdateWithoutLotInput, CustodyHandoffUncheckedUpdateWithoutLotInput>
    create: XOR<CustodyHandoffCreateWithoutLotInput, CustodyHandoffUncheckedCreateWithoutLotInput>
  }

  export type CustodyHandoffUpdateWithWhereUniqueWithoutLotInput = {
    where: CustodyHandoffWhereUniqueInput
    data: XOR<CustodyHandoffUpdateWithoutLotInput, CustodyHandoffUncheckedUpdateWithoutLotInput>
  }

  export type CustodyHandoffUpdateManyWithWhereWithoutLotInput = {
    where: CustodyHandoffScalarWhereInput
    data: XOR<CustodyHandoffUpdateManyMutationInput, CustodyHandoffUncheckedUpdateManyWithoutLotInput>
  }

  export type CustodyHandoffScalarWhereInput = {
    AND?: CustodyHandoffScalarWhereInput | CustodyHandoffScalarWhereInput[]
    OR?: CustodyHandoffScalarWhereInput[]
    NOT?: CustodyHandoffScalarWhereInput | CustodyHandoffScalarWhereInput[]
    id?: StringFilter<"CustodyHandoff"> | string
    orgId?: StringFilter<"CustodyHandoff"> | string
    lotId?: StringFilter<"CustodyHandoff"> | string
    actorRef?: StringFilter<"CustodyHandoff"> | string
    geo?: JsonNullableFilter<"CustodyHandoff">
    attestationId?: StringNullableFilter<"CustodyHandoff"> | string | null
    createdAt?: DateTimeFilter<"CustodyHandoff"> | Date | string
  }

  export type ProduceLotCreateWithoutCustodyInput = {
    id: string
    orgId: string
    lotCode: string
    origin?: string | null
    attestationId?: string | null
    createdAt?: Date | string
    farm: FarmCreateNestedOneWithoutLotsInput
  }

  export type ProduceLotUncheckedCreateWithoutCustodyInput = {
    id: string
    orgId: string
    farmId: string
    lotCode: string
    origin?: string | null
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type ProduceLotCreateOrConnectWithoutCustodyInput = {
    where: ProduceLotWhereUniqueInput
    create: XOR<ProduceLotCreateWithoutCustodyInput, ProduceLotUncheckedCreateWithoutCustodyInput>
  }

  export type ProduceLotUpsertWithoutCustodyInput = {
    update: XOR<ProduceLotUpdateWithoutCustodyInput, ProduceLotUncheckedUpdateWithoutCustodyInput>
    create: XOR<ProduceLotCreateWithoutCustodyInput, ProduceLotUncheckedCreateWithoutCustodyInput>
    where?: ProduceLotWhereInput
  }

  export type ProduceLotUpdateToOneWithWhereWithoutCustodyInput = {
    where?: ProduceLotWhereInput
    data: XOR<ProduceLotUpdateWithoutCustodyInput, ProduceLotUncheckedUpdateWithoutCustodyInput>
  }

  export type ProduceLotUpdateWithoutCustodyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    lotCode?: StringFieldUpdateOperationsInput | string
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    farm?: FarmUpdateOneRequiredWithoutLotsNestedInput
  }

  export type ProduceLotUncheckedUpdateWithoutCustodyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    farmId?: StringFieldUpdateOperationsInput | string
    lotCode?: StringFieldUpdateOperationsInput | string
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmCreateManyFarmerInput = {
    id: string
    orgId: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: string | null
    season?: string | null
    createdAt?: Date | string
  }

  export type FarmUpdateWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: NullableStringFieldUpdateOperationsInput | string | null
    season?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lots?: ProduceLotUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: NullableStringFieldUpdateOperationsInput | string | null
    season?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lots?: ProduceLotUncheckedUpdateManyWithoutFarmNestedInput
  }

  export type FarmUncheckedUpdateManyWithoutFarmerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    crop?: NullableStringFieldUpdateOperationsInput | string | null
    season?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProduceLotCreateManyFarmInput = {
    id: string
    orgId: string
    lotCode: string
    origin?: string | null
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type ProduceLotUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    lotCode?: StringFieldUpdateOperationsInput | string
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    custody?: CustodyHandoffUpdateManyWithoutLotNestedInput
  }

  export type ProduceLotUncheckedUpdateWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    lotCode?: StringFieldUpdateOperationsInput | string
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    custody?: CustodyHandoffUncheckedUpdateManyWithoutLotNestedInput
  }

  export type ProduceLotUncheckedUpdateManyWithoutFarmInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    lotCode?: StringFieldUpdateOperationsInput | string
    origin?: NullableStringFieldUpdateOperationsInput | string | null
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustodyHandoffCreateManyLotInput = {
    id: string
    orgId: string
    actorRef: string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type CustodyHandoffUpdateWithoutLotInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    actorRef?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustodyHandoffUncheckedUpdateWithoutLotInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    actorRef?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustodyHandoffUncheckedUpdateManyWithoutLotInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    actorRef?: StringFieldUpdateOperationsInput | string
    geo?: NullableJsonNullValueInput | InputJsonValue
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use FarmerCountOutputTypeDefaultArgs instead
     */
    export type FarmerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FarmerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FarmCountOutputTypeDefaultArgs instead
     */
    export type FarmCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FarmCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProduceLotCountOutputTypeDefaultArgs instead
     */
    export type ProduceLotCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProduceLotCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventOutboxDefaultArgs instead
     */
    export type EventOutboxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventOutboxDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FarmerDefaultArgs instead
     */
    export type FarmerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FarmerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FarmDefaultArgs instead
     */
    export type FarmArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FarmDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InputLoanDefaultArgs instead
     */
    export type InputLoanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InputLoanDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InsurancePolicyDefaultArgs instead
     */
    export type InsurancePolicyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InsurancePolicyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProduceLotDefaultArgs instead
     */
    export type ProduceLotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProduceLotDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustodyHandoffDefaultArgs instead
     */
    export type CustodyHandoffArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustodyHandoffDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OfftakeContractDefaultArgs instead
     */
    export type OfftakeContractArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OfftakeContractDefaultArgs<ExtArgs>

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