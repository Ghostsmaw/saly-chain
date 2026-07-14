
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
 * Model ComplianceSubject
 * 
 */
export type ComplianceSubject = $Result.DefaultSelection<Prisma.$ComplianceSubjectPayload>
/**
 * Model ScreeningResult
 * 
 */
export type ScreeningResult = $Result.DefaultSelection<Prisma.$ScreeningResultPayload>
/**
 * Model ComplianceCase
 * 
 */
export type ComplianceCase = $Result.DefaultSelection<Prisma.$ComplianceCasePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const SubjectKind: {
  USER: 'USER',
  BUSINESS: 'BUSINESS',
  COUNTERPARTY: 'COUNTERPARTY',
  AGENT: 'AGENT'
};

export type SubjectKind = (typeof SubjectKind)[keyof typeof SubjectKind]


export const VerificationTier: {
  TIER_0: 'TIER_0',
  TIER_1: 'TIER_1',
  TIER_2: 'TIER_2',
  TIER_3: 'TIER_3',
  TIER_REJECTED: 'TIER_REJECTED'
};

export type VerificationTier = (typeof VerificationTier)[keyof typeof VerificationTier]


export const ScreeningCategory: {
  SANCTIONS: 'SANCTIONS',
  PEP: 'PEP',
  ADVERSE_MEDIA: 'ADVERSE_MEDIA',
  ADDRESS_RISK: 'ADDRESS_RISK',
  COUNTRY_RISK: 'COUNTRY_RISK'
};

export type ScreeningCategory = (typeof ScreeningCategory)[keyof typeof ScreeningCategory]


export const ScreeningDecision: {
  ALLOW: 'ALLOW',
  REVIEW: 'REVIEW',
  BLOCK: 'BLOCK'
};

export type ScreeningDecision = (typeof ScreeningDecision)[keyof typeof ScreeningDecision]


export const CaseStatus: {
  OPEN: 'OPEN',
  IN_REVIEW: 'IN_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  ESCALATED: 'ESCALATED'
};

export type CaseStatus = (typeof CaseStatus)[keyof typeof CaseStatus]


export const CasePriority: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export type CasePriority = (typeof CasePriority)[keyof typeof CasePriority]

}

export type SubjectKind = $Enums.SubjectKind

export const SubjectKind: typeof $Enums.SubjectKind

export type VerificationTier = $Enums.VerificationTier

export const VerificationTier: typeof $Enums.VerificationTier

export type ScreeningCategory = $Enums.ScreeningCategory

export const ScreeningCategory: typeof $Enums.ScreeningCategory

export type ScreeningDecision = $Enums.ScreeningDecision

export const ScreeningDecision: typeof $Enums.ScreeningDecision

export type CaseStatus = $Enums.CaseStatus

export const CaseStatus: typeof $Enums.CaseStatus

export type CasePriority = $Enums.CasePriority

export const CasePriority: typeof $Enums.CasePriority

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ComplianceSubjects
 * const complianceSubjects = await prisma.complianceSubject.findMany()
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
   * // Fetch zero or more ComplianceSubjects
   * const complianceSubjects = await prisma.complianceSubject.findMany()
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
   * `prisma.complianceSubject`: Exposes CRUD operations for the **ComplianceSubject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComplianceSubjects
    * const complianceSubjects = await prisma.complianceSubject.findMany()
    * ```
    */
  get complianceSubject(): Prisma.ComplianceSubjectDelegate<ExtArgs>;

  /**
   * `prisma.screeningResult`: Exposes CRUD operations for the **ScreeningResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScreeningResults
    * const screeningResults = await prisma.screeningResult.findMany()
    * ```
    */
  get screeningResult(): Prisma.ScreeningResultDelegate<ExtArgs>;

  /**
   * `prisma.complianceCase`: Exposes CRUD operations for the **ComplianceCase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComplianceCases
    * const complianceCases = await prisma.complianceCase.findMany()
    * ```
    */
  get complianceCase(): Prisma.ComplianceCaseDelegate<ExtArgs>;
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
    ComplianceSubject: 'ComplianceSubject',
    ScreeningResult: 'ScreeningResult',
    ComplianceCase: 'ComplianceCase'
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
      modelProps: "complianceSubject" | "screeningResult" | "complianceCase"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ComplianceSubject: {
        payload: Prisma.$ComplianceSubjectPayload<ExtArgs>
        fields: Prisma.ComplianceSubjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplianceSubjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceSubjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplianceSubjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceSubjectPayload>
          }
          findFirst: {
            args: Prisma.ComplianceSubjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceSubjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplianceSubjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceSubjectPayload>
          }
          findMany: {
            args: Prisma.ComplianceSubjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceSubjectPayload>[]
          }
          create: {
            args: Prisma.ComplianceSubjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceSubjectPayload>
          }
          createMany: {
            args: Prisma.ComplianceSubjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplianceSubjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceSubjectPayload>[]
          }
          delete: {
            args: Prisma.ComplianceSubjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceSubjectPayload>
          }
          update: {
            args: Prisma.ComplianceSubjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceSubjectPayload>
          }
          deleteMany: {
            args: Prisma.ComplianceSubjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplianceSubjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ComplianceSubjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceSubjectPayload>
          }
          aggregate: {
            args: Prisma.ComplianceSubjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplianceSubject>
          }
          groupBy: {
            args: Prisma.ComplianceSubjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplianceSubjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplianceSubjectCountArgs<ExtArgs>
            result: $Utils.Optional<ComplianceSubjectCountAggregateOutputType> | number
          }
        }
      }
      ScreeningResult: {
        payload: Prisma.$ScreeningResultPayload<ExtArgs>
        fields: Prisma.ScreeningResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScreeningResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScreeningResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningResultPayload>
          }
          findFirst: {
            args: Prisma.ScreeningResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScreeningResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningResultPayload>
          }
          findMany: {
            args: Prisma.ScreeningResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningResultPayload>[]
          }
          create: {
            args: Prisma.ScreeningResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningResultPayload>
          }
          createMany: {
            args: Prisma.ScreeningResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScreeningResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningResultPayload>[]
          }
          delete: {
            args: Prisma.ScreeningResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningResultPayload>
          }
          update: {
            args: Prisma.ScreeningResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningResultPayload>
          }
          deleteMany: {
            args: Prisma.ScreeningResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScreeningResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ScreeningResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScreeningResultPayload>
          }
          aggregate: {
            args: Prisma.ScreeningResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScreeningResult>
          }
          groupBy: {
            args: Prisma.ScreeningResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScreeningResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScreeningResultCountArgs<ExtArgs>
            result: $Utils.Optional<ScreeningResultCountAggregateOutputType> | number
          }
        }
      }
      ComplianceCase: {
        payload: Prisma.$ComplianceCasePayload<ExtArgs>
        fields: Prisma.ComplianceCaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplianceCaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceCasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplianceCaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceCasePayload>
          }
          findFirst: {
            args: Prisma.ComplianceCaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceCasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplianceCaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceCasePayload>
          }
          findMany: {
            args: Prisma.ComplianceCaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceCasePayload>[]
          }
          create: {
            args: Prisma.ComplianceCaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceCasePayload>
          }
          createMany: {
            args: Prisma.ComplianceCaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplianceCaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceCasePayload>[]
          }
          delete: {
            args: Prisma.ComplianceCaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceCasePayload>
          }
          update: {
            args: Prisma.ComplianceCaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceCasePayload>
          }
          deleteMany: {
            args: Prisma.ComplianceCaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplianceCaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ComplianceCaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplianceCasePayload>
          }
          aggregate: {
            args: Prisma.ComplianceCaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplianceCase>
          }
          groupBy: {
            args: Prisma.ComplianceCaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplianceCaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplianceCaseCountArgs<ExtArgs>
            result: $Utils.Optional<ComplianceCaseCountAggregateOutputType> | number
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
   * Count Type ComplianceSubjectCountOutputType
   */

  export type ComplianceSubjectCountOutputType = {
    screenings: number
    cases: number
  }

  export type ComplianceSubjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    screenings?: boolean | ComplianceSubjectCountOutputTypeCountScreeningsArgs
    cases?: boolean | ComplianceSubjectCountOutputTypeCountCasesArgs
  }

  // Custom InputTypes
  /**
   * ComplianceSubjectCountOutputType without action
   */
  export type ComplianceSubjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceSubjectCountOutputType
     */
    select?: ComplianceSubjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ComplianceSubjectCountOutputType without action
   */
  export type ComplianceSubjectCountOutputTypeCountScreeningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScreeningResultWhereInput
  }

  /**
   * ComplianceSubjectCountOutputType without action
   */
  export type ComplianceSubjectCountOutputTypeCountCasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplianceCaseWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ComplianceSubject
   */

  export type AggregateComplianceSubject = {
    _count: ComplianceSubjectCountAggregateOutputType | null
    _min: ComplianceSubjectMinAggregateOutputType | null
    _max: ComplianceSubjectMaxAggregateOutputType | null
  }

  export type ComplianceSubjectMinAggregateOutputType = {
    id: string | null
    externalRef: string | null
    kind: $Enums.SubjectKind | null
    displayName: string | null
    countryCode: string | null
    tier: $Enums.VerificationTier | null
    tierUpdatedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ComplianceSubjectMaxAggregateOutputType = {
    id: string | null
    externalRef: string | null
    kind: $Enums.SubjectKind | null
    displayName: string | null
    countryCode: string | null
    tier: $Enums.VerificationTier | null
    tierUpdatedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ComplianceSubjectCountAggregateOutputType = {
    id: number
    externalRef: number
    kind: number
    displayName: number
    countryCode: number
    tier: number
    tierUpdatedAt: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ComplianceSubjectMinAggregateInputType = {
    id?: true
    externalRef?: true
    kind?: true
    displayName?: true
    countryCode?: true
    tier?: true
    tierUpdatedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ComplianceSubjectMaxAggregateInputType = {
    id?: true
    externalRef?: true
    kind?: true
    displayName?: true
    countryCode?: true
    tier?: true
    tierUpdatedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ComplianceSubjectCountAggregateInputType = {
    id?: true
    externalRef?: true
    kind?: true
    displayName?: true
    countryCode?: true
    tier?: true
    tierUpdatedAt?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ComplianceSubjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplianceSubject to aggregate.
     */
    where?: ComplianceSubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceSubjects to fetch.
     */
    orderBy?: ComplianceSubjectOrderByWithRelationInput | ComplianceSubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplianceSubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceSubjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceSubjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComplianceSubjects
    **/
    _count?: true | ComplianceSubjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplianceSubjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplianceSubjectMaxAggregateInputType
  }

  export type GetComplianceSubjectAggregateType<T extends ComplianceSubjectAggregateArgs> = {
        [P in keyof T & keyof AggregateComplianceSubject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplianceSubject[P]>
      : GetScalarType<T[P], AggregateComplianceSubject[P]>
  }




  export type ComplianceSubjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplianceSubjectWhereInput
    orderBy?: ComplianceSubjectOrderByWithAggregationInput | ComplianceSubjectOrderByWithAggregationInput[]
    by: ComplianceSubjectScalarFieldEnum[] | ComplianceSubjectScalarFieldEnum
    having?: ComplianceSubjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplianceSubjectCountAggregateInputType | true
    _min?: ComplianceSubjectMinAggregateInputType
    _max?: ComplianceSubjectMaxAggregateInputType
  }

  export type ComplianceSubjectGroupByOutputType = {
    id: string
    externalRef: string
    kind: $Enums.SubjectKind
    displayName: string | null
    countryCode: string | null
    tier: $Enums.VerificationTier
    tierUpdatedAt: Date | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: ComplianceSubjectCountAggregateOutputType | null
    _min: ComplianceSubjectMinAggregateOutputType | null
    _max: ComplianceSubjectMaxAggregateOutputType | null
  }

  type GetComplianceSubjectGroupByPayload<T extends ComplianceSubjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplianceSubjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplianceSubjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplianceSubjectGroupByOutputType[P]>
            : GetScalarType<T[P], ComplianceSubjectGroupByOutputType[P]>
        }
      >
    >


  export type ComplianceSubjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalRef?: boolean
    kind?: boolean
    displayName?: boolean
    countryCode?: boolean
    tier?: boolean
    tierUpdatedAt?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    screenings?: boolean | ComplianceSubject$screeningsArgs<ExtArgs>
    cases?: boolean | ComplianceSubject$casesArgs<ExtArgs>
    _count?: boolean | ComplianceSubjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complianceSubject"]>

  export type ComplianceSubjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalRef?: boolean
    kind?: boolean
    displayName?: boolean
    countryCode?: boolean
    tier?: boolean
    tierUpdatedAt?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["complianceSubject"]>

  export type ComplianceSubjectSelectScalar = {
    id?: boolean
    externalRef?: boolean
    kind?: boolean
    displayName?: boolean
    countryCode?: boolean
    tier?: boolean
    tierUpdatedAt?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ComplianceSubjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    screenings?: boolean | ComplianceSubject$screeningsArgs<ExtArgs>
    cases?: boolean | ComplianceSubject$casesArgs<ExtArgs>
    _count?: boolean | ComplianceSubjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ComplianceSubjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ComplianceSubjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComplianceSubject"
    objects: {
      screenings: Prisma.$ScreeningResultPayload<ExtArgs>[]
      cases: Prisma.$ComplianceCasePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      externalRef: string
      kind: $Enums.SubjectKind
      displayName: string | null
      countryCode: string | null
      tier: $Enums.VerificationTier
      tierUpdatedAt: Date | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["complianceSubject"]>
    composites: {}
  }

  type ComplianceSubjectGetPayload<S extends boolean | null | undefined | ComplianceSubjectDefaultArgs> = $Result.GetResult<Prisma.$ComplianceSubjectPayload, S>

  type ComplianceSubjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ComplianceSubjectFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ComplianceSubjectCountAggregateInputType | true
    }

  export interface ComplianceSubjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComplianceSubject'], meta: { name: 'ComplianceSubject' } }
    /**
     * Find zero or one ComplianceSubject that matches the filter.
     * @param {ComplianceSubjectFindUniqueArgs} args - Arguments to find a ComplianceSubject
     * @example
     * // Get one ComplianceSubject
     * const complianceSubject = await prisma.complianceSubject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplianceSubjectFindUniqueArgs>(args: SelectSubset<T, ComplianceSubjectFindUniqueArgs<ExtArgs>>): Prisma__ComplianceSubjectClient<$Result.GetResult<Prisma.$ComplianceSubjectPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ComplianceSubject that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ComplianceSubjectFindUniqueOrThrowArgs} args - Arguments to find a ComplianceSubject
     * @example
     * // Get one ComplianceSubject
     * const complianceSubject = await prisma.complianceSubject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplianceSubjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplianceSubjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplianceSubjectClient<$Result.GetResult<Prisma.$ComplianceSubjectPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ComplianceSubject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceSubjectFindFirstArgs} args - Arguments to find a ComplianceSubject
     * @example
     * // Get one ComplianceSubject
     * const complianceSubject = await prisma.complianceSubject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplianceSubjectFindFirstArgs>(args?: SelectSubset<T, ComplianceSubjectFindFirstArgs<ExtArgs>>): Prisma__ComplianceSubjectClient<$Result.GetResult<Prisma.$ComplianceSubjectPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ComplianceSubject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceSubjectFindFirstOrThrowArgs} args - Arguments to find a ComplianceSubject
     * @example
     * // Get one ComplianceSubject
     * const complianceSubject = await prisma.complianceSubject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplianceSubjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplianceSubjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplianceSubjectClient<$Result.GetResult<Prisma.$ComplianceSubjectPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ComplianceSubjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceSubjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComplianceSubjects
     * const complianceSubjects = await prisma.complianceSubject.findMany()
     * 
     * // Get first 10 ComplianceSubjects
     * const complianceSubjects = await prisma.complianceSubject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complianceSubjectWithIdOnly = await prisma.complianceSubject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplianceSubjectFindManyArgs>(args?: SelectSubset<T, ComplianceSubjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplianceSubjectPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ComplianceSubject.
     * @param {ComplianceSubjectCreateArgs} args - Arguments to create a ComplianceSubject.
     * @example
     * // Create one ComplianceSubject
     * const ComplianceSubject = await prisma.complianceSubject.create({
     *   data: {
     *     // ... data to create a ComplianceSubject
     *   }
     * })
     * 
     */
    create<T extends ComplianceSubjectCreateArgs>(args: SelectSubset<T, ComplianceSubjectCreateArgs<ExtArgs>>): Prisma__ComplianceSubjectClient<$Result.GetResult<Prisma.$ComplianceSubjectPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ComplianceSubjects.
     * @param {ComplianceSubjectCreateManyArgs} args - Arguments to create many ComplianceSubjects.
     * @example
     * // Create many ComplianceSubjects
     * const complianceSubject = await prisma.complianceSubject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplianceSubjectCreateManyArgs>(args?: SelectSubset<T, ComplianceSubjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComplianceSubjects and returns the data saved in the database.
     * @param {ComplianceSubjectCreateManyAndReturnArgs} args - Arguments to create many ComplianceSubjects.
     * @example
     * // Create many ComplianceSubjects
     * const complianceSubject = await prisma.complianceSubject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComplianceSubjects and only return the `id`
     * const complianceSubjectWithIdOnly = await prisma.complianceSubject.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplianceSubjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplianceSubjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplianceSubjectPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ComplianceSubject.
     * @param {ComplianceSubjectDeleteArgs} args - Arguments to delete one ComplianceSubject.
     * @example
     * // Delete one ComplianceSubject
     * const ComplianceSubject = await prisma.complianceSubject.delete({
     *   where: {
     *     // ... filter to delete one ComplianceSubject
     *   }
     * })
     * 
     */
    delete<T extends ComplianceSubjectDeleteArgs>(args: SelectSubset<T, ComplianceSubjectDeleteArgs<ExtArgs>>): Prisma__ComplianceSubjectClient<$Result.GetResult<Prisma.$ComplianceSubjectPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ComplianceSubject.
     * @param {ComplianceSubjectUpdateArgs} args - Arguments to update one ComplianceSubject.
     * @example
     * // Update one ComplianceSubject
     * const complianceSubject = await prisma.complianceSubject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplianceSubjectUpdateArgs>(args: SelectSubset<T, ComplianceSubjectUpdateArgs<ExtArgs>>): Prisma__ComplianceSubjectClient<$Result.GetResult<Prisma.$ComplianceSubjectPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ComplianceSubjects.
     * @param {ComplianceSubjectDeleteManyArgs} args - Arguments to filter ComplianceSubjects to delete.
     * @example
     * // Delete a few ComplianceSubjects
     * const { count } = await prisma.complianceSubject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplianceSubjectDeleteManyArgs>(args?: SelectSubset<T, ComplianceSubjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplianceSubjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceSubjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComplianceSubjects
     * const complianceSubject = await prisma.complianceSubject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplianceSubjectUpdateManyArgs>(args: SelectSubset<T, ComplianceSubjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ComplianceSubject.
     * @param {ComplianceSubjectUpsertArgs} args - Arguments to update or create a ComplianceSubject.
     * @example
     * // Update or create a ComplianceSubject
     * const complianceSubject = await prisma.complianceSubject.upsert({
     *   create: {
     *     // ... data to create a ComplianceSubject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComplianceSubject we want to update
     *   }
     * })
     */
    upsert<T extends ComplianceSubjectUpsertArgs>(args: SelectSubset<T, ComplianceSubjectUpsertArgs<ExtArgs>>): Prisma__ComplianceSubjectClient<$Result.GetResult<Prisma.$ComplianceSubjectPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ComplianceSubjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceSubjectCountArgs} args - Arguments to filter ComplianceSubjects to count.
     * @example
     * // Count the number of ComplianceSubjects
     * const count = await prisma.complianceSubject.count({
     *   where: {
     *     // ... the filter for the ComplianceSubjects we want to count
     *   }
     * })
    **/
    count<T extends ComplianceSubjectCountArgs>(
      args?: Subset<T, ComplianceSubjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplianceSubjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComplianceSubject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceSubjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ComplianceSubjectAggregateArgs>(args: Subset<T, ComplianceSubjectAggregateArgs>): Prisma.PrismaPromise<GetComplianceSubjectAggregateType<T>>

    /**
     * Group by ComplianceSubject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceSubjectGroupByArgs} args - Group by arguments.
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
      T extends ComplianceSubjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplianceSubjectGroupByArgs['orderBy'] }
        : { orderBy?: ComplianceSubjectGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ComplianceSubjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplianceSubjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComplianceSubject model
   */
  readonly fields: ComplianceSubjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComplianceSubject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplianceSubjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    screenings<T extends ComplianceSubject$screeningsArgs<ExtArgs> = {}>(args?: Subset<T, ComplianceSubject$screeningsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreeningResultPayload<ExtArgs>, T, "findMany"> | Null>
    cases<T extends ComplianceSubject$casesArgs<ExtArgs> = {}>(args?: Subset<T, ComplianceSubject$casesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplianceCasePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the ComplianceSubject model
   */ 
  interface ComplianceSubjectFieldRefs {
    readonly id: FieldRef<"ComplianceSubject", 'String'>
    readonly externalRef: FieldRef<"ComplianceSubject", 'String'>
    readonly kind: FieldRef<"ComplianceSubject", 'SubjectKind'>
    readonly displayName: FieldRef<"ComplianceSubject", 'String'>
    readonly countryCode: FieldRef<"ComplianceSubject", 'String'>
    readonly tier: FieldRef<"ComplianceSubject", 'VerificationTier'>
    readonly tierUpdatedAt: FieldRef<"ComplianceSubject", 'DateTime'>
    readonly metadata: FieldRef<"ComplianceSubject", 'Json'>
    readonly createdAt: FieldRef<"ComplianceSubject", 'DateTime'>
    readonly updatedAt: FieldRef<"ComplianceSubject", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ComplianceSubject findUnique
   */
  export type ComplianceSubjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceSubject
     */
    select?: ComplianceSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceSubjectInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceSubject to fetch.
     */
    where: ComplianceSubjectWhereUniqueInput
  }

  /**
   * ComplianceSubject findUniqueOrThrow
   */
  export type ComplianceSubjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceSubject
     */
    select?: ComplianceSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceSubjectInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceSubject to fetch.
     */
    where: ComplianceSubjectWhereUniqueInput
  }

  /**
   * ComplianceSubject findFirst
   */
  export type ComplianceSubjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceSubject
     */
    select?: ComplianceSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceSubjectInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceSubject to fetch.
     */
    where?: ComplianceSubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceSubjects to fetch.
     */
    orderBy?: ComplianceSubjectOrderByWithRelationInput | ComplianceSubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplianceSubjects.
     */
    cursor?: ComplianceSubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceSubjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceSubjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplianceSubjects.
     */
    distinct?: ComplianceSubjectScalarFieldEnum | ComplianceSubjectScalarFieldEnum[]
  }

  /**
   * ComplianceSubject findFirstOrThrow
   */
  export type ComplianceSubjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceSubject
     */
    select?: ComplianceSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceSubjectInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceSubject to fetch.
     */
    where?: ComplianceSubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceSubjects to fetch.
     */
    orderBy?: ComplianceSubjectOrderByWithRelationInput | ComplianceSubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplianceSubjects.
     */
    cursor?: ComplianceSubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceSubjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceSubjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplianceSubjects.
     */
    distinct?: ComplianceSubjectScalarFieldEnum | ComplianceSubjectScalarFieldEnum[]
  }

  /**
   * ComplianceSubject findMany
   */
  export type ComplianceSubjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceSubject
     */
    select?: ComplianceSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceSubjectInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceSubjects to fetch.
     */
    where?: ComplianceSubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceSubjects to fetch.
     */
    orderBy?: ComplianceSubjectOrderByWithRelationInput | ComplianceSubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComplianceSubjects.
     */
    cursor?: ComplianceSubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceSubjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceSubjects.
     */
    skip?: number
    distinct?: ComplianceSubjectScalarFieldEnum | ComplianceSubjectScalarFieldEnum[]
  }

  /**
   * ComplianceSubject create
   */
  export type ComplianceSubjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceSubject
     */
    select?: ComplianceSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceSubjectInclude<ExtArgs> | null
    /**
     * The data needed to create a ComplianceSubject.
     */
    data: XOR<ComplianceSubjectCreateInput, ComplianceSubjectUncheckedCreateInput>
  }

  /**
   * ComplianceSubject createMany
   */
  export type ComplianceSubjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComplianceSubjects.
     */
    data: ComplianceSubjectCreateManyInput | ComplianceSubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComplianceSubject createManyAndReturn
   */
  export type ComplianceSubjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceSubject
     */
    select?: ComplianceSubjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ComplianceSubjects.
     */
    data: ComplianceSubjectCreateManyInput | ComplianceSubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComplianceSubject update
   */
  export type ComplianceSubjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceSubject
     */
    select?: ComplianceSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceSubjectInclude<ExtArgs> | null
    /**
     * The data needed to update a ComplianceSubject.
     */
    data: XOR<ComplianceSubjectUpdateInput, ComplianceSubjectUncheckedUpdateInput>
    /**
     * Choose, which ComplianceSubject to update.
     */
    where: ComplianceSubjectWhereUniqueInput
  }

  /**
   * ComplianceSubject updateMany
   */
  export type ComplianceSubjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComplianceSubjects.
     */
    data: XOR<ComplianceSubjectUpdateManyMutationInput, ComplianceSubjectUncheckedUpdateManyInput>
    /**
     * Filter which ComplianceSubjects to update
     */
    where?: ComplianceSubjectWhereInput
  }

  /**
   * ComplianceSubject upsert
   */
  export type ComplianceSubjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceSubject
     */
    select?: ComplianceSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceSubjectInclude<ExtArgs> | null
    /**
     * The filter to search for the ComplianceSubject to update in case it exists.
     */
    where: ComplianceSubjectWhereUniqueInput
    /**
     * In case the ComplianceSubject found by the `where` argument doesn't exist, create a new ComplianceSubject with this data.
     */
    create: XOR<ComplianceSubjectCreateInput, ComplianceSubjectUncheckedCreateInput>
    /**
     * In case the ComplianceSubject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplianceSubjectUpdateInput, ComplianceSubjectUncheckedUpdateInput>
  }

  /**
   * ComplianceSubject delete
   */
  export type ComplianceSubjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceSubject
     */
    select?: ComplianceSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceSubjectInclude<ExtArgs> | null
    /**
     * Filter which ComplianceSubject to delete.
     */
    where: ComplianceSubjectWhereUniqueInput
  }

  /**
   * ComplianceSubject deleteMany
   */
  export type ComplianceSubjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplianceSubjects to delete
     */
    where?: ComplianceSubjectWhereInput
  }

  /**
   * ComplianceSubject.screenings
   */
  export type ComplianceSubject$screeningsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScreeningResult
     */
    select?: ScreeningResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningResultInclude<ExtArgs> | null
    where?: ScreeningResultWhereInput
    orderBy?: ScreeningResultOrderByWithRelationInput | ScreeningResultOrderByWithRelationInput[]
    cursor?: ScreeningResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScreeningResultScalarFieldEnum | ScreeningResultScalarFieldEnum[]
  }

  /**
   * ComplianceSubject.cases
   */
  export type ComplianceSubject$casesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceCase
     */
    select?: ComplianceCaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceCaseInclude<ExtArgs> | null
    where?: ComplianceCaseWhereInput
    orderBy?: ComplianceCaseOrderByWithRelationInput | ComplianceCaseOrderByWithRelationInput[]
    cursor?: ComplianceCaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComplianceCaseScalarFieldEnum | ComplianceCaseScalarFieldEnum[]
  }

  /**
   * ComplianceSubject without action
   */
  export type ComplianceSubjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceSubject
     */
    select?: ComplianceSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceSubjectInclude<ExtArgs> | null
  }


  /**
   * Model ScreeningResult
   */

  export type AggregateScreeningResult = {
    _count: ScreeningResultCountAggregateOutputType | null
    _avg: ScreeningResultAvgAggregateOutputType | null
    _sum: ScreeningResultSumAggregateOutputType | null
    _min: ScreeningResultMinAggregateOutputType | null
    _max: ScreeningResultMaxAggregateOutputType | null
  }

  export type ScreeningResultAvgAggregateOutputType = {
    score: number | null
  }

  export type ScreeningResultSumAggregateOutputType = {
    score: number | null
  }

  export type ScreeningResultMinAggregateOutputType = {
    id: string | null
    subjectId: string | null
    targetIdentifier: string | null
    category: $Enums.ScreeningCategory | null
    decision: $Enums.ScreeningDecision | null
    provider: string | null
    score: number | null
    createdAt: Date | null
  }

  export type ScreeningResultMaxAggregateOutputType = {
    id: string | null
    subjectId: string | null
    targetIdentifier: string | null
    category: $Enums.ScreeningCategory | null
    decision: $Enums.ScreeningDecision | null
    provider: string | null
    score: number | null
    createdAt: Date | null
  }

  export type ScreeningResultCountAggregateOutputType = {
    id: number
    subjectId: number
    targetIdentifier: number
    category: number
    decision: number
    provider: number
    score: number
    matchedListIds: number
    details: number
    createdAt: number
    _all: number
  }


  export type ScreeningResultAvgAggregateInputType = {
    score?: true
  }

  export type ScreeningResultSumAggregateInputType = {
    score?: true
  }

  export type ScreeningResultMinAggregateInputType = {
    id?: true
    subjectId?: true
    targetIdentifier?: true
    category?: true
    decision?: true
    provider?: true
    score?: true
    createdAt?: true
  }

  export type ScreeningResultMaxAggregateInputType = {
    id?: true
    subjectId?: true
    targetIdentifier?: true
    category?: true
    decision?: true
    provider?: true
    score?: true
    createdAt?: true
  }

  export type ScreeningResultCountAggregateInputType = {
    id?: true
    subjectId?: true
    targetIdentifier?: true
    category?: true
    decision?: true
    provider?: true
    score?: true
    matchedListIds?: true
    details?: true
    createdAt?: true
    _all?: true
  }

  export type ScreeningResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScreeningResult to aggregate.
     */
    where?: ScreeningResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScreeningResults to fetch.
     */
    orderBy?: ScreeningResultOrderByWithRelationInput | ScreeningResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScreeningResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScreeningResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScreeningResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScreeningResults
    **/
    _count?: true | ScreeningResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScreeningResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScreeningResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScreeningResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScreeningResultMaxAggregateInputType
  }

  export type GetScreeningResultAggregateType<T extends ScreeningResultAggregateArgs> = {
        [P in keyof T & keyof AggregateScreeningResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScreeningResult[P]>
      : GetScalarType<T[P], AggregateScreeningResult[P]>
  }




  export type ScreeningResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScreeningResultWhereInput
    orderBy?: ScreeningResultOrderByWithAggregationInput | ScreeningResultOrderByWithAggregationInput[]
    by: ScreeningResultScalarFieldEnum[] | ScreeningResultScalarFieldEnum
    having?: ScreeningResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScreeningResultCountAggregateInputType | true
    _avg?: ScreeningResultAvgAggregateInputType
    _sum?: ScreeningResultSumAggregateInputType
    _min?: ScreeningResultMinAggregateInputType
    _max?: ScreeningResultMaxAggregateInputType
  }

  export type ScreeningResultGroupByOutputType = {
    id: string
    subjectId: string | null
    targetIdentifier: string
    category: $Enums.ScreeningCategory
    decision: $Enums.ScreeningDecision
    provider: string
    score: number
    matchedListIds: string[]
    details: JsonValue | null
    createdAt: Date
    _count: ScreeningResultCountAggregateOutputType | null
    _avg: ScreeningResultAvgAggregateOutputType | null
    _sum: ScreeningResultSumAggregateOutputType | null
    _min: ScreeningResultMinAggregateOutputType | null
    _max: ScreeningResultMaxAggregateOutputType | null
  }

  type GetScreeningResultGroupByPayload<T extends ScreeningResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScreeningResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScreeningResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScreeningResultGroupByOutputType[P]>
            : GetScalarType<T[P], ScreeningResultGroupByOutputType[P]>
        }
      >
    >


  export type ScreeningResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subjectId?: boolean
    targetIdentifier?: boolean
    category?: boolean
    decision?: boolean
    provider?: boolean
    score?: boolean
    matchedListIds?: boolean
    details?: boolean
    createdAt?: boolean
    subject?: boolean | ScreeningResult$subjectArgs<ExtArgs>
  }, ExtArgs["result"]["screeningResult"]>

  export type ScreeningResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subjectId?: boolean
    targetIdentifier?: boolean
    category?: boolean
    decision?: boolean
    provider?: boolean
    score?: boolean
    matchedListIds?: boolean
    details?: boolean
    createdAt?: boolean
    subject?: boolean | ScreeningResult$subjectArgs<ExtArgs>
  }, ExtArgs["result"]["screeningResult"]>

  export type ScreeningResultSelectScalar = {
    id?: boolean
    subjectId?: boolean
    targetIdentifier?: boolean
    category?: boolean
    decision?: boolean
    provider?: boolean
    score?: boolean
    matchedListIds?: boolean
    details?: boolean
    createdAt?: boolean
  }

  export type ScreeningResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | ScreeningResult$subjectArgs<ExtArgs>
  }
  export type ScreeningResultIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | ScreeningResult$subjectArgs<ExtArgs>
  }

  export type $ScreeningResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScreeningResult"
    objects: {
      subject: Prisma.$ComplianceSubjectPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      subjectId: string | null
      /**
       * Free-form target identifier when no subject exists (e.g. raw chain address).
       */
      targetIdentifier: string
      category: $Enums.ScreeningCategory
      decision: $Enums.ScreeningDecision
      /**
       * Provider that produced this result (`embedded`, `chainalysis`, etc.).
       */
      provider: string
      /**
       * 0..100, higher = riskier
       */
      score: number
      matchedListIds: string[]
      details: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["screeningResult"]>
    composites: {}
  }

  type ScreeningResultGetPayload<S extends boolean | null | undefined | ScreeningResultDefaultArgs> = $Result.GetResult<Prisma.$ScreeningResultPayload, S>

  type ScreeningResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ScreeningResultFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ScreeningResultCountAggregateInputType | true
    }

  export interface ScreeningResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScreeningResult'], meta: { name: 'ScreeningResult' } }
    /**
     * Find zero or one ScreeningResult that matches the filter.
     * @param {ScreeningResultFindUniqueArgs} args - Arguments to find a ScreeningResult
     * @example
     * // Get one ScreeningResult
     * const screeningResult = await prisma.screeningResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScreeningResultFindUniqueArgs>(args: SelectSubset<T, ScreeningResultFindUniqueArgs<ExtArgs>>): Prisma__ScreeningResultClient<$Result.GetResult<Prisma.$ScreeningResultPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ScreeningResult that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ScreeningResultFindUniqueOrThrowArgs} args - Arguments to find a ScreeningResult
     * @example
     * // Get one ScreeningResult
     * const screeningResult = await prisma.screeningResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScreeningResultFindUniqueOrThrowArgs>(args: SelectSubset<T, ScreeningResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScreeningResultClient<$Result.GetResult<Prisma.$ScreeningResultPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ScreeningResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningResultFindFirstArgs} args - Arguments to find a ScreeningResult
     * @example
     * // Get one ScreeningResult
     * const screeningResult = await prisma.screeningResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScreeningResultFindFirstArgs>(args?: SelectSubset<T, ScreeningResultFindFirstArgs<ExtArgs>>): Prisma__ScreeningResultClient<$Result.GetResult<Prisma.$ScreeningResultPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ScreeningResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningResultFindFirstOrThrowArgs} args - Arguments to find a ScreeningResult
     * @example
     * // Get one ScreeningResult
     * const screeningResult = await prisma.screeningResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScreeningResultFindFirstOrThrowArgs>(args?: SelectSubset<T, ScreeningResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScreeningResultClient<$Result.GetResult<Prisma.$ScreeningResultPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ScreeningResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScreeningResults
     * const screeningResults = await prisma.screeningResult.findMany()
     * 
     * // Get first 10 ScreeningResults
     * const screeningResults = await prisma.screeningResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const screeningResultWithIdOnly = await prisma.screeningResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScreeningResultFindManyArgs>(args?: SelectSubset<T, ScreeningResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreeningResultPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ScreeningResult.
     * @param {ScreeningResultCreateArgs} args - Arguments to create a ScreeningResult.
     * @example
     * // Create one ScreeningResult
     * const ScreeningResult = await prisma.screeningResult.create({
     *   data: {
     *     // ... data to create a ScreeningResult
     *   }
     * })
     * 
     */
    create<T extends ScreeningResultCreateArgs>(args: SelectSubset<T, ScreeningResultCreateArgs<ExtArgs>>): Prisma__ScreeningResultClient<$Result.GetResult<Prisma.$ScreeningResultPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ScreeningResults.
     * @param {ScreeningResultCreateManyArgs} args - Arguments to create many ScreeningResults.
     * @example
     * // Create many ScreeningResults
     * const screeningResult = await prisma.screeningResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScreeningResultCreateManyArgs>(args?: SelectSubset<T, ScreeningResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScreeningResults and returns the data saved in the database.
     * @param {ScreeningResultCreateManyAndReturnArgs} args - Arguments to create many ScreeningResults.
     * @example
     * // Create many ScreeningResults
     * const screeningResult = await prisma.screeningResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScreeningResults and only return the `id`
     * const screeningResultWithIdOnly = await prisma.screeningResult.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScreeningResultCreateManyAndReturnArgs>(args?: SelectSubset<T, ScreeningResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScreeningResultPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ScreeningResult.
     * @param {ScreeningResultDeleteArgs} args - Arguments to delete one ScreeningResult.
     * @example
     * // Delete one ScreeningResult
     * const ScreeningResult = await prisma.screeningResult.delete({
     *   where: {
     *     // ... filter to delete one ScreeningResult
     *   }
     * })
     * 
     */
    delete<T extends ScreeningResultDeleteArgs>(args: SelectSubset<T, ScreeningResultDeleteArgs<ExtArgs>>): Prisma__ScreeningResultClient<$Result.GetResult<Prisma.$ScreeningResultPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ScreeningResult.
     * @param {ScreeningResultUpdateArgs} args - Arguments to update one ScreeningResult.
     * @example
     * // Update one ScreeningResult
     * const screeningResult = await prisma.screeningResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScreeningResultUpdateArgs>(args: SelectSubset<T, ScreeningResultUpdateArgs<ExtArgs>>): Prisma__ScreeningResultClient<$Result.GetResult<Prisma.$ScreeningResultPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ScreeningResults.
     * @param {ScreeningResultDeleteManyArgs} args - Arguments to filter ScreeningResults to delete.
     * @example
     * // Delete a few ScreeningResults
     * const { count } = await prisma.screeningResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScreeningResultDeleteManyArgs>(args?: SelectSubset<T, ScreeningResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScreeningResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScreeningResults
     * const screeningResult = await prisma.screeningResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScreeningResultUpdateManyArgs>(args: SelectSubset<T, ScreeningResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ScreeningResult.
     * @param {ScreeningResultUpsertArgs} args - Arguments to update or create a ScreeningResult.
     * @example
     * // Update or create a ScreeningResult
     * const screeningResult = await prisma.screeningResult.upsert({
     *   create: {
     *     // ... data to create a ScreeningResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScreeningResult we want to update
     *   }
     * })
     */
    upsert<T extends ScreeningResultUpsertArgs>(args: SelectSubset<T, ScreeningResultUpsertArgs<ExtArgs>>): Prisma__ScreeningResultClient<$Result.GetResult<Prisma.$ScreeningResultPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ScreeningResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningResultCountArgs} args - Arguments to filter ScreeningResults to count.
     * @example
     * // Count the number of ScreeningResults
     * const count = await prisma.screeningResult.count({
     *   where: {
     *     // ... the filter for the ScreeningResults we want to count
     *   }
     * })
    **/
    count<T extends ScreeningResultCountArgs>(
      args?: Subset<T, ScreeningResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScreeningResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScreeningResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ScreeningResultAggregateArgs>(args: Subset<T, ScreeningResultAggregateArgs>): Prisma.PrismaPromise<GetScreeningResultAggregateType<T>>

    /**
     * Group by ScreeningResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreeningResultGroupByArgs} args - Group by arguments.
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
      T extends ScreeningResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScreeningResultGroupByArgs['orderBy'] }
        : { orderBy?: ScreeningResultGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ScreeningResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScreeningResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScreeningResult model
   */
  readonly fields: ScreeningResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScreeningResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScreeningResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subject<T extends ScreeningResult$subjectArgs<ExtArgs> = {}>(args?: Subset<T, ScreeningResult$subjectArgs<ExtArgs>>): Prisma__ComplianceSubjectClient<$Result.GetResult<Prisma.$ComplianceSubjectPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the ScreeningResult model
   */ 
  interface ScreeningResultFieldRefs {
    readonly id: FieldRef<"ScreeningResult", 'String'>
    readonly subjectId: FieldRef<"ScreeningResult", 'String'>
    readonly targetIdentifier: FieldRef<"ScreeningResult", 'String'>
    readonly category: FieldRef<"ScreeningResult", 'ScreeningCategory'>
    readonly decision: FieldRef<"ScreeningResult", 'ScreeningDecision'>
    readonly provider: FieldRef<"ScreeningResult", 'String'>
    readonly score: FieldRef<"ScreeningResult", 'Int'>
    readonly matchedListIds: FieldRef<"ScreeningResult", 'String[]'>
    readonly details: FieldRef<"ScreeningResult", 'Json'>
    readonly createdAt: FieldRef<"ScreeningResult", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ScreeningResult findUnique
   */
  export type ScreeningResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScreeningResult
     */
    select?: ScreeningResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningResultInclude<ExtArgs> | null
    /**
     * Filter, which ScreeningResult to fetch.
     */
    where: ScreeningResultWhereUniqueInput
  }

  /**
   * ScreeningResult findUniqueOrThrow
   */
  export type ScreeningResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScreeningResult
     */
    select?: ScreeningResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningResultInclude<ExtArgs> | null
    /**
     * Filter, which ScreeningResult to fetch.
     */
    where: ScreeningResultWhereUniqueInput
  }

  /**
   * ScreeningResult findFirst
   */
  export type ScreeningResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScreeningResult
     */
    select?: ScreeningResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningResultInclude<ExtArgs> | null
    /**
     * Filter, which ScreeningResult to fetch.
     */
    where?: ScreeningResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScreeningResults to fetch.
     */
    orderBy?: ScreeningResultOrderByWithRelationInput | ScreeningResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScreeningResults.
     */
    cursor?: ScreeningResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScreeningResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScreeningResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScreeningResults.
     */
    distinct?: ScreeningResultScalarFieldEnum | ScreeningResultScalarFieldEnum[]
  }

  /**
   * ScreeningResult findFirstOrThrow
   */
  export type ScreeningResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScreeningResult
     */
    select?: ScreeningResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningResultInclude<ExtArgs> | null
    /**
     * Filter, which ScreeningResult to fetch.
     */
    where?: ScreeningResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScreeningResults to fetch.
     */
    orderBy?: ScreeningResultOrderByWithRelationInput | ScreeningResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScreeningResults.
     */
    cursor?: ScreeningResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScreeningResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScreeningResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScreeningResults.
     */
    distinct?: ScreeningResultScalarFieldEnum | ScreeningResultScalarFieldEnum[]
  }

  /**
   * ScreeningResult findMany
   */
  export type ScreeningResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScreeningResult
     */
    select?: ScreeningResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningResultInclude<ExtArgs> | null
    /**
     * Filter, which ScreeningResults to fetch.
     */
    where?: ScreeningResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScreeningResults to fetch.
     */
    orderBy?: ScreeningResultOrderByWithRelationInput | ScreeningResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScreeningResults.
     */
    cursor?: ScreeningResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScreeningResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScreeningResults.
     */
    skip?: number
    distinct?: ScreeningResultScalarFieldEnum | ScreeningResultScalarFieldEnum[]
  }

  /**
   * ScreeningResult create
   */
  export type ScreeningResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScreeningResult
     */
    select?: ScreeningResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningResultInclude<ExtArgs> | null
    /**
     * The data needed to create a ScreeningResult.
     */
    data: XOR<ScreeningResultCreateInput, ScreeningResultUncheckedCreateInput>
  }

  /**
   * ScreeningResult createMany
   */
  export type ScreeningResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScreeningResults.
     */
    data: ScreeningResultCreateManyInput | ScreeningResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScreeningResult createManyAndReturn
   */
  export type ScreeningResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScreeningResult
     */
    select?: ScreeningResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ScreeningResults.
     */
    data: ScreeningResultCreateManyInput | ScreeningResultCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningResultIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScreeningResult update
   */
  export type ScreeningResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScreeningResult
     */
    select?: ScreeningResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningResultInclude<ExtArgs> | null
    /**
     * The data needed to update a ScreeningResult.
     */
    data: XOR<ScreeningResultUpdateInput, ScreeningResultUncheckedUpdateInput>
    /**
     * Choose, which ScreeningResult to update.
     */
    where: ScreeningResultWhereUniqueInput
  }

  /**
   * ScreeningResult updateMany
   */
  export type ScreeningResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScreeningResults.
     */
    data: XOR<ScreeningResultUpdateManyMutationInput, ScreeningResultUncheckedUpdateManyInput>
    /**
     * Filter which ScreeningResults to update
     */
    where?: ScreeningResultWhereInput
  }

  /**
   * ScreeningResult upsert
   */
  export type ScreeningResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScreeningResult
     */
    select?: ScreeningResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningResultInclude<ExtArgs> | null
    /**
     * The filter to search for the ScreeningResult to update in case it exists.
     */
    where: ScreeningResultWhereUniqueInput
    /**
     * In case the ScreeningResult found by the `where` argument doesn't exist, create a new ScreeningResult with this data.
     */
    create: XOR<ScreeningResultCreateInput, ScreeningResultUncheckedCreateInput>
    /**
     * In case the ScreeningResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScreeningResultUpdateInput, ScreeningResultUncheckedUpdateInput>
  }

  /**
   * ScreeningResult delete
   */
  export type ScreeningResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScreeningResult
     */
    select?: ScreeningResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningResultInclude<ExtArgs> | null
    /**
     * Filter which ScreeningResult to delete.
     */
    where: ScreeningResultWhereUniqueInput
  }

  /**
   * ScreeningResult deleteMany
   */
  export type ScreeningResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScreeningResults to delete
     */
    where?: ScreeningResultWhereInput
  }

  /**
   * ScreeningResult.subject
   */
  export type ScreeningResult$subjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceSubject
     */
    select?: ComplianceSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceSubjectInclude<ExtArgs> | null
    where?: ComplianceSubjectWhereInput
  }

  /**
   * ScreeningResult without action
   */
  export type ScreeningResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScreeningResult
     */
    select?: ScreeningResultSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScreeningResultInclude<ExtArgs> | null
  }


  /**
   * Model ComplianceCase
   */

  export type AggregateComplianceCase = {
    _count: ComplianceCaseCountAggregateOutputType | null
    _min: ComplianceCaseMinAggregateOutputType | null
    _max: ComplianceCaseMaxAggregateOutputType | null
  }

  export type ComplianceCaseMinAggregateOutputType = {
    id: string | null
    subjectId: string | null
    intentId: string | null
    transactionId: string | null
    status: $Enums.CaseStatus | null
    priority: $Enums.CasePriority | null
    summary: string | null
    assignedTo: string | null
    resolvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ComplianceCaseMaxAggregateOutputType = {
    id: string | null
    subjectId: string | null
    intentId: string | null
    transactionId: string | null
    status: $Enums.CaseStatus | null
    priority: $Enums.CasePriority | null
    summary: string | null
    assignedTo: string | null
    resolvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ComplianceCaseCountAggregateOutputType = {
    id: number
    subjectId: number
    intentId: number
    transactionId: number
    status: number
    priority: number
    summary: number
    notes: number
    assignedTo: number
    resolvedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ComplianceCaseMinAggregateInputType = {
    id?: true
    subjectId?: true
    intentId?: true
    transactionId?: true
    status?: true
    priority?: true
    summary?: true
    assignedTo?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ComplianceCaseMaxAggregateInputType = {
    id?: true
    subjectId?: true
    intentId?: true
    transactionId?: true
    status?: true
    priority?: true
    summary?: true
    assignedTo?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ComplianceCaseCountAggregateInputType = {
    id?: true
    subjectId?: true
    intentId?: true
    transactionId?: true
    status?: true
    priority?: true
    summary?: true
    notes?: true
    assignedTo?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ComplianceCaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplianceCase to aggregate.
     */
    where?: ComplianceCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceCases to fetch.
     */
    orderBy?: ComplianceCaseOrderByWithRelationInput | ComplianceCaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplianceCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceCases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceCases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComplianceCases
    **/
    _count?: true | ComplianceCaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplianceCaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplianceCaseMaxAggregateInputType
  }

  export type GetComplianceCaseAggregateType<T extends ComplianceCaseAggregateArgs> = {
        [P in keyof T & keyof AggregateComplianceCase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplianceCase[P]>
      : GetScalarType<T[P], AggregateComplianceCase[P]>
  }




  export type ComplianceCaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplianceCaseWhereInput
    orderBy?: ComplianceCaseOrderByWithAggregationInput | ComplianceCaseOrderByWithAggregationInput[]
    by: ComplianceCaseScalarFieldEnum[] | ComplianceCaseScalarFieldEnum
    having?: ComplianceCaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplianceCaseCountAggregateInputType | true
    _min?: ComplianceCaseMinAggregateInputType
    _max?: ComplianceCaseMaxAggregateInputType
  }

  export type ComplianceCaseGroupByOutputType = {
    id: string
    subjectId: string | null
    intentId: string | null
    transactionId: string | null
    status: $Enums.CaseStatus
    priority: $Enums.CasePriority
    summary: string
    notes: JsonValue
    assignedTo: string | null
    resolvedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ComplianceCaseCountAggregateOutputType | null
    _min: ComplianceCaseMinAggregateOutputType | null
    _max: ComplianceCaseMaxAggregateOutputType | null
  }

  type GetComplianceCaseGroupByPayload<T extends ComplianceCaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplianceCaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplianceCaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplianceCaseGroupByOutputType[P]>
            : GetScalarType<T[P], ComplianceCaseGroupByOutputType[P]>
        }
      >
    >


  export type ComplianceCaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subjectId?: boolean
    intentId?: boolean
    transactionId?: boolean
    status?: boolean
    priority?: boolean
    summary?: boolean
    notes?: boolean
    assignedTo?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subject?: boolean | ComplianceCase$subjectArgs<ExtArgs>
  }, ExtArgs["result"]["complianceCase"]>

  export type ComplianceCaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subjectId?: boolean
    intentId?: boolean
    transactionId?: boolean
    status?: boolean
    priority?: boolean
    summary?: boolean
    notes?: boolean
    assignedTo?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subject?: boolean | ComplianceCase$subjectArgs<ExtArgs>
  }, ExtArgs["result"]["complianceCase"]>

  export type ComplianceCaseSelectScalar = {
    id?: boolean
    subjectId?: boolean
    intentId?: boolean
    transactionId?: boolean
    status?: boolean
    priority?: boolean
    summary?: boolean
    notes?: boolean
    assignedTo?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ComplianceCaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | ComplianceCase$subjectArgs<ExtArgs>
  }
  export type ComplianceCaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | ComplianceCase$subjectArgs<ExtArgs>
  }

  export type $ComplianceCasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComplianceCase"
    objects: {
      subject: Prisma.$ComplianceSubjectPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      subjectId: string | null
      intentId: string | null
      transactionId: string | null
      status: $Enums.CaseStatus
      priority: $Enums.CasePriority
      /**
       * Free-form summary set by the screening service or analyst.
       */
      summary: string
      /**
       * Append-only review notes (each note is `{ author, body, at }`).
       */
      notes: Prisma.JsonValue
      assignedTo: string | null
      resolvedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["complianceCase"]>
    composites: {}
  }

  type ComplianceCaseGetPayload<S extends boolean | null | undefined | ComplianceCaseDefaultArgs> = $Result.GetResult<Prisma.$ComplianceCasePayload, S>

  type ComplianceCaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ComplianceCaseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ComplianceCaseCountAggregateInputType | true
    }

  export interface ComplianceCaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComplianceCase'], meta: { name: 'ComplianceCase' } }
    /**
     * Find zero or one ComplianceCase that matches the filter.
     * @param {ComplianceCaseFindUniqueArgs} args - Arguments to find a ComplianceCase
     * @example
     * // Get one ComplianceCase
     * const complianceCase = await prisma.complianceCase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplianceCaseFindUniqueArgs>(args: SelectSubset<T, ComplianceCaseFindUniqueArgs<ExtArgs>>): Prisma__ComplianceCaseClient<$Result.GetResult<Prisma.$ComplianceCasePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ComplianceCase that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ComplianceCaseFindUniqueOrThrowArgs} args - Arguments to find a ComplianceCase
     * @example
     * // Get one ComplianceCase
     * const complianceCase = await prisma.complianceCase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplianceCaseFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplianceCaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplianceCaseClient<$Result.GetResult<Prisma.$ComplianceCasePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ComplianceCase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceCaseFindFirstArgs} args - Arguments to find a ComplianceCase
     * @example
     * // Get one ComplianceCase
     * const complianceCase = await prisma.complianceCase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplianceCaseFindFirstArgs>(args?: SelectSubset<T, ComplianceCaseFindFirstArgs<ExtArgs>>): Prisma__ComplianceCaseClient<$Result.GetResult<Prisma.$ComplianceCasePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ComplianceCase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceCaseFindFirstOrThrowArgs} args - Arguments to find a ComplianceCase
     * @example
     * // Get one ComplianceCase
     * const complianceCase = await prisma.complianceCase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplianceCaseFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplianceCaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplianceCaseClient<$Result.GetResult<Prisma.$ComplianceCasePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ComplianceCases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceCaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComplianceCases
     * const complianceCases = await prisma.complianceCase.findMany()
     * 
     * // Get first 10 ComplianceCases
     * const complianceCases = await prisma.complianceCase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complianceCaseWithIdOnly = await prisma.complianceCase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplianceCaseFindManyArgs>(args?: SelectSubset<T, ComplianceCaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplianceCasePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ComplianceCase.
     * @param {ComplianceCaseCreateArgs} args - Arguments to create a ComplianceCase.
     * @example
     * // Create one ComplianceCase
     * const ComplianceCase = await prisma.complianceCase.create({
     *   data: {
     *     // ... data to create a ComplianceCase
     *   }
     * })
     * 
     */
    create<T extends ComplianceCaseCreateArgs>(args: SelectSubset<T, ComplianceCaseCreateArgs<ExtArgs>>): Prisma__ComplianceCaseClient<$Result.GetResult<Prisma.$ComplianceCasePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ComplianceCases.
     * @param {ComplianceCaseCreateManyArgs} args - Arguments to create many ComplianceCases.
     * @example
     * // Create many ComplianceCases
     * const complianceCase = await prisma.complianceCase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplianceCaseCreateManyArgs>(args?: SelectSubset<T, ComplianceCaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComplianceCases and returns the data saved in the database.
     * @param {ComplianceCaseCreateManyAndReturnArgs} args - Arguments to create many ComplianceCases.
     * @example
     * // Create many ComplianceCases
     * const complianceCase = await prisma.complianceCase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComplianceCases and only return the `id`
     * const complianceCaseWithIdOnly = await prisma.complianceCase.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplianceCaseCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplianceCaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplianceCasePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ComplianceCase.
     * @param {ComplianceCaseDeleteArgs} args - Arguments to delete one ComplianceCase.
     * @example
     * // Delete one ComplianceCase
     * const ComplianceCase = await prisma.complianceCase.delete({
     *   where: {
     *     // ... filter to delete one ComplianceCase
     *   }
     * })
     * 
     */
    delete<T extends ComplianceCaseDeleteArgs>(args: SelectSubset<T, ComplianceCaseDeleteArgs<ExtArgs>>): Prisma__ComplianceCaseClient<$Result.GetResult<Prisma.$ComplianceCasePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ComplianceCase.
     * @param {ComplianceCaseUpdateArgs} args - Arguments to update one ComplianceCase.
     * @example
     * // Update one ComplianceCase
     * const complianceCase = await prisma.complianceCase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplianceCaseUpdateArgs>(args: SelectSubset<T, ComplianceCaseUpdateArgs<ExtArgs>>): Prisma__ComplianceCaseClient<$Result.GetResult<Prisma.$ComplianceCasePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ComplianceCases.
     * @param {ComplianceCaseDeleteManyArgs} args - Arguments to filter ComplianceCases to delete.
     * @example
     * // Delete a few ComplianceCases
     * const { count } = await prisma.complianceCase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplianceCaseDeleteManyArgs>(args?: SelectSubset<T, ComplianceCaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplianceCases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceCaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComplianceCases
     * const complianceCase = await prisma.complianceCase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplianceCaseUpdateManyArgs>(args: SelectSubset<T, ComplianceCaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ComplianceCase.
     * @param {ComplianceCaseUpsertArgs} args - Arguments to update or create a ComplianceCase.
     * @example
     * // Update or create a ComplianceCase
     * const complianceCase = await prisma.complianceCase.upsert({
     *   create: {
     *     // ... data to create a ComplianceCase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComplianceCase we want to update
     *   }
     * })
     */
    upsert<T extends ComplianceCaseUpsertArgs>(args: SelectSubset<T, ComplianceCaseUpsertArgs<ExtArgs>>): Prisma__ComplianceCaseClient<$Result.GetResult<Prisma.$ComplianceCasePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ComplianceCases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceCaseCountArgs} args - Arguments to filter ComplianceCases to count.
     * @example
     * // Count the number of ComplianceCases
     * const count = await prisma.complianceCase.count({
     *   where: {
     *     // ... the filter for the ComplianceCases we want to count
     *   }
     * })
    **/
    count<T extends ComplianceCaseCountArgs>(
      args?: Subset<T, ComplianceCaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplianceCaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComplianceCase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceCaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ComplianceCaseAggregateArgs>(args: Subset<T, ComplianceCaseAggregateArgs>): Prisma.PrismaPromise<GetComplianceCaseAggregateType<T>>

    /**
     * Group by ComplianceCase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplianceCaseGroupByArgs} args - Group by arguments.
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
      T extends ComplianceCaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplianceCaseGroupByArgs['orderBy'] }
        : { orderBy?: ComplianceCaseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ComplianceCaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplianceCaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComplianceCase model
   */
  readonly fields: ComplianceCaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComplianceCase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplianceCaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subject<T extends ComplianceCase$subjectArgs<ExtArgs> = {}>(args?: Subset<T, ComplianceCase$subjectArgs<ExtArgs>>): Prisma__ComplianceSubjectClient<$Result.GetResult<Prisma.$ComplianceSubjectPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
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
   * Fields of the ComplianceCase model
   */ 
  interface ComplianceCaseFieldRefs {
    readonly id: FieldRef<"ComplianceCase", 'String'>
    readonly subjectId: FieldRef<"ComplianceCase", 'String'>
    readonly intentId: FieldRef<"ComplianceCase", 'String'>
    readonly transactionId: FieldRef<"ComplianceCase", 'String'>
    readonly status: FieldRef<"ComplianceCase", 'CaseStatus'>
    readonly priority: FieldRef<"ComplianceCase", 'CasePriority'>
    readonly summary: FieldRef<"ComplianceCase", 'String'>
    readonly notes: FieldRef<"ComplianceCase", 'Json'>
    readonly assignedTo: FieldRef<"ComplianceCase", 'String'>
    readonly resolvedAt: FieldRef<"ComplianceCase", 'DateTime'>
    readonly createdAt: FieldRef<"ComplianceCase", 'DateTime'>
    readonly updatedAt: FieldRef<"ComplianceCase", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ComplianceCase findUnique
   */
  export type ComplianceCaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceCase
     */
    select?: ComplianceCaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceCaseInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceCase to fetch.
     */
    where: ComplianceCaseWhereUniqueInput
  }

  /**
   * ComplianceCase findUniqueOrThrow
   */
  export type ComplianceCaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceCase
     */
    select?: ComplianceCaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceCaseInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceCase to fetch.
     */
    where: ComplianceCaseWhereUniqueInput
  }

  /**
   * ComplianceCase findFirst
   */
  export type ComplianceCaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceCase
     */
    select?: ComplianceCaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceCaseInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceCase to fetch.
     */
    where?: ComplianceCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceCases to fetch.
     */
    orderBy?: ComplianceCaseOrderByWithRelationInput | ComplianceCaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplianceCases.
     */
    cursor?: ComplianceCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceCases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceCases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplianceCases.
     */
    distinct?: ComplianceCaseScalarFieldEnum | ComplianceCaseScalarFieldEnum[]
  }

  /**
   * ComplianceCase findFirstOrThrow
   */
  export type ComplianceCaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceCase
     */
    select?: ComplianceCaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceCaseInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceCase to fetch.
     */
    where?: ComplianceCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceCases to fetch.
     */
    orderBy?: ComplianceCaseOrderByWithRelationInput | ComplianceCaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplianceCases.
     */
    cursor?: ComplianceCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceCases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceCases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplianceCases.
     */
    distinct?: ComplianceCaseScalarFieldEnum | ComplianceCaseScalarFieldEnum[]
  }

  /**
   * ComplianceCase findMany
   */
  export type ComplianceCaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceCase
     */
    select?: ComplianceCaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceCaseInclude<ExtArgs> | null
    /**
     * Filter, which ComplianceCases to fetch.
     */
    where?: ComplianceCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplianceCases to fetch.
     */
    orderBy?: ComplianceCaseOrderByWithRelationInput | ComplianceCaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComplianceCases.
     */
    cursor?: ComplianceCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplianceCases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplianceCases.
     */
    skip?: number
    distinct?: ComplianceCaseScalarFieldEnum | ComplianceCaseScalarFieldEnum[]
  }

  /**
   * ComplianceCase create
   */
  export type ComplianceCaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceCase
     */
    select?: ComplianceCaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceCaseInclude<ExtArgs> | null
    /**
     * The data needed to create a ComplianceCase.
     */
    data: XOR<ComplianceCaseCreateInput, ComplianceCaseUncheckedCreateInput>
  }

  /**
   * ComplianceCase createMany
   */
  export type ComplianceCaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComplianceCases.
     */
    data: ComplianceCaseCreateManyInput | ComplianceCaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ComplianceCase createManyAndReturn
   */
  export type ComplianceCaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceCase
     */
    select?: ComplianceCaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ComplianceCases.
     */
    data: ComplianceCaseCreateManyInput | ComplianceCaseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceCaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplianceCase update
   */
  export type ComplianceCaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceCase
     */
    select?: ComplianceCaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceCaseInclude<ExtArgs> | null
    /**
     * The data needed to update a ComplianceCase.
     */
    data: XOR<ComplianceCaseUpdateInput, ComplianceCaseUncheckedUpdateInput>
    /**
     * Choose, which ComplianceCase to update.
     */
    where: ComplianceCaseWhereUniqueInput
  }

  /**
   * ComplianceCase updateMany
   */
  export type ComplianceCaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComplianceCases.
     */
    data: XOR<ComplianceCaseUpdateManyMutationInput, ComplianceCaseUncheckedUpdateManyInput>
    /**
     * Filter which ComplianceCases to update
     */
    where?: ComplianceCaseWhereInput
  }

  /**
   * ComplianceCase upsert
   */
  export type ComplianceCaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceCase
     */
    select?: ComplianceCaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceCaseInclude<ExtArgs> | null
    /**
     * The filter to search for the ComplianceCase to update in case it exists.
     */
    where: ComplianceCaseWhereUniqueInput
    /**
     * In case the ComplianceCase found by the `where` argument doesn't exist, create a new ComplianceCase with this data.
     */
    create: XOR<ComplianceCaseCreateInput, ComplianceCaseUncheckedCreateInput>
    /**
     * In case the ComplianceCase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplianceCaseUpdateInput, ComplianceCaseUncheckedUpdateInput>
  }

  /**
   * ComplianceCase delete
   */
  export type ComplianceCaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceCase
     */
    select?: ComplianceCaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceCaseInclude<ExtArgs> | null
    /**
     * Filter which ComplianceCase to delete.
     */
    where: ComplianceCaseWhereUniqueInput
  }

  /**
   * ComplianceCase deleteMany
   */
  export type ComplianceCaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplianceCases to delete
     */
    where?: ComplianceCaseWhereInput
  }

  /**
   * ComplianceCase.subject
   */
  export type ComplianceCase$subjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceSubject
     */
    select?: ComplianceSubjectSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceSubjectInclude<ExtArgs> | null
    where?: ComplianceSubjectWhereInput
  }

  /**
   * ComplianceCase without action
   */
  export type ComplianceCaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplianceCase
     */
    select?: ComplianceCaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplianceCaseInclude<ExtArgs> | null
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


  export const ComplianceSubjectScalarFieldEnum: {
    id: 'id',
    externalRef: 'externalRef',
    kind: 'kind',
    displayName: 'displayName',
    countryCode: 'countryCode',
    tier: 'tier',
    tierUpdatedAt: 'tierUpdatedAt',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ComplianceSubjectScalarFieldEnum = (typeof ComplianceSubjectScalarFieldEnum)[keyof typeof ComplianceSubjectScalarFieldEnum]


  export const ScreeningResultScalarFieldEnum: {
    id: 'id',
    subjectId: 'subjectId',
    targetIdentifier: 'targetIdentifier',
    category: 'category',
    decision: 'decision',
    provider: 'provider',
    score: 'score',
    matchedListIds: 'matchedListIds',
    details: 'details',
    createdAt: 'createdAt'
  };

  export type ScreeningResultScalarFieldEnum = (typeof ScreeningResultScalarFieldEnum)[keyof typeof ScreeningResultScalarFieldEnum]


  export const ComplianceCaseScalarFieldEnum: {
    id: 'id',
    subjectId: 'subjectId',
    intentId: 'intentId',
    transactionId: 'transactionId',
    status: 'status',
    priority: 'priority',
    summary: 'summary',
    notes: 'notes',
    assignedTo: 'assignedTo',
    resolvedAt: 'resolvedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ComplianceCaseScalarFieldEnum = (typeof ComplianceCaseScalarFieldEnum)[keyof typeof ComplianceCaseScalarFieldEnum]


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
   * Reference to a field of type 'SubjectKind'
   */
  export type EnumSubjectKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubjectKind'>
    


  /**
   * Reference to a field of type 'SubjectKind[]'
   */
  export type ListEnumSubjectKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubjectKind[]'>
    


  /**
   * Reference to a field of type 'VerificationTier'
   */
  export type EnumVerificationTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationTier'>
    


  /**
   * Reference to a field of type 'VerificationTier[]'
   */
  export type ListEnumVerificationTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationTier[]'>
    


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
   * Reference to a field of type 'ScreeningCategory'
   */
  export type EnumScreeningCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScreeningCategory'>
    


  /**
   * Reference to a field of type 'ScreeningCategory[]'
   */
  export type ListEnumScreeningCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScreeningCategory[]'>
    


  /**
   * Reference to a field of type 'ScreeningDecision'
   */
  export type EnumScreeningDecisionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScreeningDecision'>
    


  /**
   * Reference to a field of type 'ScreeningDecision[]'
   */
  export type ListEnumScreeningDecisionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScreeningDecision[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'CaseStatus'
   */
  export type EnumCaseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CaseStatus'>
    


  /**
   * Reference to a field of type 'CaseStatus[]'
   */
  export type ListEnumCaseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CaseStatus[]'>
    


  /**
   * Reference to a field of type 'CasePriority'
   */
  export type EnumCasePriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CasePriority'>
    


  /**
   * Reference to a field of type 'CasePriority[]'
   */
  export type ListEnumCasePriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CasePriority[]'>
    


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


  export type ComplianceSubjectWhereInput = {
    AND?: ComplianceSubjectWhereInput | ComplianceSubjectWhereInput[]
    OR?: ComplianceSubjectWhereInput[]
    NOT?: ComplianceSubjectWhereInput | ComplianceSubjectWhereInput[]
    id?: UuidFilter<"ComplianceSubject"> | string
    externalRef?: StringFilter<"ComplianceSubject"> | string
    kind?: EnumSubjectKindFilter<"ComplianceSubject"> | $Enums.SubjectKind
    displayName?: StringNullableFilter<"ComplianceSubject"> | string | null
    countryCode?: StringNullableFilter<"ComplianceSubject"> | string | null
    tier?: EnumVerificationTierFilter<"ComplianceSubject"> | $Enums.VerificationTier
    tierUpdatedAt?: DateTimeNullableFilter<"ComplianceSubject"> | Date | string | null
    metadata?: JsonNullableFilter<"ComplianceSubject">
    createdAt?: DateTimeFilter<"ComplianceSubject"> | Date | string
    updatedAt?: DateTimeFilter<"ComplianceSubject"> | Date | string
    screenings?: ScreeningResultListRelationFilter
    cases?: ComplianceCaseListRelationFilter
  }

  export type ComplianceSubjectOrderByWithRelationInput = {
    id?: SortOrder
    externalRef?: SortOrder
    kind?: SortOrder
    displayName?: SortOrderInput | SortOrder
    countryCode?: SortOrderInput | SortOrder
    tier?: SortOrder
    tierUpdatedAt?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    screenings?: ScreeningResultOrderByRelationAggregateInput
    cases?: ComplianceCaseOrderByRelationAggregateInput
  }

  export type ComplianceSubjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    externalRef?: string
    AND?: ComplianceSubjectWhereInput | ComplianceSubjectWhereInput[]
    OR?: ComplianceSubjectWhereInput[]
    NOT?: ComplianceSubjectWhereInput | ComplianceSubjectWhereInput[]
    kind?: EnumSubjectKindFilter<"ComplianceSubject"> | $Enums.SubjectKind
    displayName?: StringNullableFilter<"ComplianceSubject"> | string | null
    countryCode?: StringNullableFilter<"ComplianceSubject"> | string | null
    tier?: EnumVerificationTierFilter<"ComplianceSubject"> | $Enums.VerificationTier
    tierUpdatedAt?: DateTimeNullableFilter<"ComplianceSubject"> | Date | string | null
    metadata?: JsonNullableFilter<"ComplianceSubject">
    createdAt?: DateTimeFilter<"ComplianceSubject"> | Date | string
    updatedAt?: DateTimeFilter<"ComplianceSubject"> | Date | string
    screenings?: ScreeningResultListRelationFilter
    cases?: ComplianceCaseListRelationFilter
  }, "id" | "externalRef">

  export type ComplianceSubjectOrderByWithAggregationInput = {
    id?: SortOrder
    externalRef?: SortOrder
    kind?: SortOrder
    displayName?: SortOrderInput | SortOrder
    countryCode?: SortOrderInput | SortOrder
    tier?: SortOrder
    tierUpdatedAt?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ComplianceSubjectCountOrderByAggregateInput
    _max?: ComplianceSubjectMaxOrderByAggregateInput
    _min?: ComplianceSubjectMinOrderByAggregateInput
  }

  export type ComplianceSubjectScalarWhereWithAggregatesInput = {
    AND?: ComplianceSubjectScalarWhereWithAggregatesInput | ComplianceSubjectScalarWhereWithAggregatesInput[]
    OR?: ComplianceSubjectScalarWhereWithAggregatesInput[]
    NOT?: ComplianceSubjectScalarWhereWithAggregatesInput | ComplianceSubjectScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ComplianceSubject"> | string
    externalRef?: StringWithAggregatesFilter<"ComplianceSubject"> | string
    kind?: EnumSubjectKindWithAggregatesFilter<"ComplianceSubject"> | $Enums.SubjectKind
    displayName?: StringNullableWithAggregatesFilter<"ComplianceSubject"> | string | null
    countryCode?: StringNullableWithAggregatesFilter<"ComplianceSubject"> | string | null
    tier?: EnumVerificationTierWithAggregatesFilter<"ComplianceSubject"> | $Enums.VerificationTier
    tierUpdatedAt?: DateTimeNullableWithAggregatesFilter<"ComplianceSubject"> | Date | string | null
    metadata?: JsonNullableWithAggregatesFilter<"ComplianceSubject">
    createdAt?: DateTimeWithAggregatesFilter<"ComplianceSubject"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ComplianceSubject"> | Date | string
  }

  export type ScreeningResultWhereInput = {
    AND?: ScreeningResultWhereInput | ScreeningResultWhereInput[]
    OR?: ScreeningResultWhereInput[]
    NOT?: ScreeningResultWhereInput | ScreeningResultWhereInput[]
    id?: UuidFilter<"ScreeningResult"> | string
    subjectId?: UuidNullableFilter<"ScreeningResult"> | string | null
    targetIdentifier?: StringFilter<"ScreeningResult"> | string
    category?: EnumScreeningCategoryFilter<"ScreeningResult"> | $Enums.ScreeningCategory
    decision?: EnumScreeningDecisionFilter<"ScreeningResult"> | $Enums.ScreeningDecision
    provider?: StringFilter<"ScreeningResult"> | string
    score?: IntFilter<"ScreeningResult"> | number
    matchedListIds?: StringNullableListFilter<"ScreeningResult">
    details?: JsonNullableFilter<"ScreeningResult">
    createdAt?: DateTimeFilter<"ScreeningResult"> | Date | string
    subject?: XOR<ComplianceSubjectNullableRelationFilter, ComplianceSubjectWhereInput> | null
  }

  export type ScreeningResultOrderByWithRelationInput = {
    id?: SortOrder
    subjectId?: SortOrderInput | SortOrder
    targetIdentifier?: SortOrder
    category?: SortOrder
    decision?: SortOrder
    provider?: SortOrder
    score?: SortOrder
    matchedListIds?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    subject?: ComplianceSubjectOrderByWithRelationInput
  }

  export type ScreeningResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScreeningResultWhereInput | ScreeningResultWhereInput[]
    OR?: ScreeningResultWhereInput[]
    NOT?: ScreeningResultWhereInput | ScreeningResultWhereInput[]
    subjectId?: UuidNullableFilter<"ScreeningResult"> | string | null
    targetIdentifier?: StringFilter<"ScreeningResult"> | string
    category?: EnumScreeningCategoryFilter<"ScreeningResult"> | $Enums.ScreeningCategory
    decision?: EnumScreeningDecisionFilter<"ScreeningResult"> | $Enums.ScreeningDecision
    provider?: StringFilter<"ScreeningResult"> | string
    score?: IntFilter<"ScreeningResult"> | number
    matchedListIds?: StringNullableListFilter<"ScreeningResult">
    details?: JsonNullableFilter<"ScreeningResult">
    createdAt?: DateTimeFilter<"ScreeningResult"> | Date | string
    subject?: XOR<ComplianceSubjectNullableRelationFilter, ComplianceSubjectWhereInput> | null
  }, "id">

  export type ScreeningResultOrderByWithAggregationInput = {
    id?: SortOrder
    subjectId?: SortOrderInput | SortOrder
    targetIdentifier?: SortOrder
    category?: SortOrder
    decision?: SortOrder
    provider?: SortOrder
    score?: SortOrder
    matchedListIds?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ScreeningResultCountOrderByAggregateInput
    _avg?: ScreeningResultAvgOrderByAggregateInput
    _max?: ScreeningResultMaxOrderByAggregateInput
    _min?: ScreeningResultMinOrderByAggregateInput
    _sum?: ScreeningResultSumOrderByAggregateInput
  }

  export type ScreeningResultScalarWhereWithAggregatesInput = {
    AND?: ScreeningResultScalarWhereWithAggregatesInput | ScreeningResultScalarWhereWithAggregatesInput[]
    OR?: ScreeningResultScalarWhereWithAggregatesInput[]
    NOT?: ScreeningResultScalarWhereWithAggregatesInput | ScreeningResultScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ScreeningResult"> | string
    subjectId?: UuidNullableWithAggregatesFilter<"ScreeningResult"> | string | null
    targetIdentifier?: StringWithAggregatesFilter<"ScreeningResult"> | string
    category?: EnumScreeningCategoryWithAggregatesFilter<"ScreeningResult"> | $Enums.ScreeningCategory
    decision?: EnumScreeningDecisionWithAggregatesFilter<"ScreeningResult"> | $Enums.ScreeningDecision
    provider?: StringWithAggregatesFilter<"ScreeningResult"> | string
    score?: IntWithAggregatesFilter<"ScreeningResult"> | number
    matchedListIds?: StringNullableListFilter<"ScreeningResult">
    details?: JsonNullableWithAggregatesFilter<"ScreeningResult">
    createdAt?: DateTimeWithAggregatesFilter<"ScreeningResult"> | Date | string
  }

  export type ComplianceCaseWhereInput = {
    AND?: ComplianceCaseWhereInput | ComplianceCaseWhereInput[]
    OR?: ComplianceCaseWhereInput[]
    NOT?: ComplianceCaseWhereInput | ComplianceCaseWhereInput[]
    id?: UuidFilter<"ComplianceCase"> | string
    subjectId?: UuidNullableFilter<"ComplianceCase"> | string | null
    intentId?: StringNullableFilter<"ComplianceCase"> | string | null
    transactionId?: StringNullableFilter<"ComplianceCase"> | string | null
    status?: EnumCaseStatusFilter<"ComplianceCase"> | $Enums.CaseStatus
    priority?: EnumCasePriorityFilter<"ComplianceCase"> | $Enums.CasePriority
    summary?: StringFilter<"ComplianceCase"> | string
    notes?: JsonFilter<"ComplianceCase">
    assignedTo?: StringNullableFilter<"ComplianceCase"> | string | null
    resolvedAt?: DateTimeNullableFilter<"ComplianceCase"> | Date | string | null
    createdAt?: DateTimeFilter<"ComplianceCase"> | Date | string
    updatedAt?: DateTimeFilter<"ComplianceCase"> | Date | string
    subject?: XOR<ComplianceSubjectNullableRelationFilter, ComplianceSubjectWhereInput> | null
  }

  export type ComplianceCaseOrderByWithRelationInput = {
    id?: SortOrder
    subjectId?: SortOrderInput | SortOrder
    intentId?: SortOrderInput | SortOrder
    transactionId?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    summary?: SortOrder
    notes?: SortOrder
    assignedTo?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subject?: ComplianceSubjectOrderByWithRelationInput
  }

  export type ComplianceCaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ComplianceCaseWhereInput | ComplianceCaseWhereInput[]
    OR?: ComplianceCaseWhereInput[]
    NOT?: ComplianceCaseWhereInput | ComplianceCaseWhereInput[]
    subjectId?: UuidNullableFilter<"ComplianceCase"> | string | null
    intentId?: StringNullableFilter<"ComplianceCase"> | string | null
    transactionId?: StringNullableFilter<"ComplianceCase"> | string | null
    status?: EnumCaseStatusFilter<"ComplianceCase"> | $Enums.CaseStatus
    priority?: EnumCasePriorityFilter<"ComplianceCase"> | $Enums.CasePriority
    summary?: StringFilter<"ComplianceCase"> | string
    notes?: JsonFilter<"ComplianceCase">
    assignedTo?: StringNullableFilter<"ComplianceCase"> | string | null
    resolvedAt?: DateTimeNullableFilter<"ComplianceCase"> | Date | string | null
    createdAt?: DateTimeFilter<"ComplianceCase"> | Date | string
    updatedAt?: DateTimeFilter<"ComplianceCase"> | Date | string
    subject?: XOR<ComplianceSubjectNullableRelationFilter, ComplianceSubjectWhereInput> | null
  }, "id">

  export type ComplianceCaseOrderByWithAggregationInput = {
    id?: SortOrder
    subjectId?: SortOrderInput | SortOrder
    intentId?: SortOrderInput | SortOrder
    transactionId?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    summary?: SortOrder
    notes?: SortOrder
    assignedTo?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ComplianceCaseCountOrderByAggregateInput
    _max?: ComplianceCaseMaxOrderByAggregateInput
    _min?: ComplianceCaseMinOrderByAggregateInput
  }

  export type ComplianceCaseScalarWhereWithAggregatesInput = {
    AND?: ComplianceCaseScalarWhereWithAggregatesInput | ComplianceCaseScalarWhereWithAggregatesInput[]
    OR?: ComplianceCaseScalarWhereWithAggregatesInput[]
    NOT?: ComplianceCaseScalarWhereWithAggregatesInput | ComplianceCaseScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ComplianceCase"> | string
    subjectId?: UuidNullableWithAggregatesFilter<"ComplianceCase"> | string | null
    intentId?: StringNullableWithAggregatesFilter<"ComplianceCase"> | string | null
    transactionId?: StringNullableWithAggregatesFilter<"ComplianceCase"> | string | null
    status?: EnumCaseStatusWithAggregatesFilter<"ComplianceCase"> | $Enums.CaseStatus
    priority?: EnumCasePriorityWithAggregatesFilter<"ComplianceCase"> | $Enums.CasePriority
    summary?: StringWithAggregatesFilter<"ComplianceCase"> | string
    notes?: JsonWithAggregatesFilter<"ComplianceCase">
    assignedTo?: StringNullableWithAggregatesFilter<"ComplianceCase"> | string | null
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"ComplianceCase"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ComplianceCase"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ComplianceCase"> | Date | string
  }

  export type ComplianceSubjectCreateInput = {
    id?: string
    externalRef: string
    kind: $Enums.SubjectKind
    displayName?: string | null
    countryCode?: string | null
    tier?: $Enums.VerificationTier
    tierUpdatedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    screenings?: ScreeningResultCreateNestedManyWithoutSubjectInput
    cases?: ComplianceCaseCreateNestedManyWithoutSubjectInput
  }

  export type ComplianceSubjectUncheckedCreateInput = {
    id?: string
    externalRef: string
    kind: $Enums.SubjectKind
    displayName?: string | null
    countryCode?: string | null
    tier?: $Enums.VerificationTier
    tierUpdatedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    screenings?: ScreeningResultUncheckedCreateNestedManyWithoutSubjectInput
    cases?: ComplianceCaseUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type ComplianceSubjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kind?: EnumSubjectKindFieldUpdateOperationsInput | $Enums.SubjectKind
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumVerificationTierFieldUpdateOperationsInput | $Enums.VerificationTier
    tierUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    screenings?: ScreeningResultUpdateManyWithoutSubjectNestedInput
    cases?: ComplianceCaseUpdateManyWithoutSubjectNestedInput
  }

  export type ComplianceSubjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kind?: EnumSubjectKindFieldUpdateOperationsInput | $Enums.SubjectKind
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumVerificationTierFieldUpdateOperationsInput | $Enums.VerificationTier
    tierUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    screenings?: ScreeningResultUncheckedUpdateManyWithoutSubjectNestedInput
    cases?: ComplianceCaseUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type ComplianceSubjectCreateManyInput = {
    id?: string
    externalRef: string
    kind: $Enums.SubjectKind
    displayName?: string | null
    countryCode?: string | null
    tier?: $Enums.VerificationTier
    tierUpdatedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComplianceSubjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kind?: EnumSubjectKindFieldUpdateOperationsInput | $Enums.SubjectKind
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumVerificationTierFieldUpdateOperationsInput | $Enums.VerificationTier
    tierUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceSubjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kind?: EnumSubjectKindFieldUpdateOperationsInput | $Enums.SubjectKind
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumVerificationTierFieldUpdateOperationsInput | $Enums.VerificationTier
    tierUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScreeningResultCreateInput = {
    id?: string
    targetIdentifier: string
    category: $Enums.ScreeningCategory
    decision: $Enums.ScreeningDecision
    provider: string
    score?: number
    matchedListIds?: ScreeningResultCreatematchedListIdsInput | string[]
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    subject?: ComplianceSubjectCreateNestedOneWithoutScreeningsInput
  }

  export type ScreeningResultUncheckedCreateInput = {
    id?: string
    subjectId?: string | null
    targetIdentifier: string
    category: $Enums.ScreeningCategory
    decision: $Enums.ScreeningDecision
    provider: string
    score?: number
    matchedListIds?: ScreeningResultCreatematchedListIdsInput | string[]
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ScreeningResultUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetIdentifier?: StringFieldUpdateOperationsInput | string
    category?: EnumScreeningCategoryFieldUpdateOperationsInput | $Enums.ScreeningCategory
    decision?: EnumScreeningDecisionFieldUpdateOperationsInput | $Enums.ScreeningDecision
    provider?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    matchedListIds?: ScreeningResultUpdatematchedListIdsInput | string[]
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: ComplianceSubjectUpdateOneWithoutScreeningsNestedInput
  }

  export type ScreeningResultUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjectId?: NullableStringFieldUpdateOperationsInput | string | null
    targetIdentifier?: StringFieldUpdateOperationsInput | string
    category?: EnumScreeningCategoryFieldUpdateOperationsInput | $Enums.ScreeningCategory
    decision?: EnumScreeningDecisionFieldUpdateOperationsInput | $Enums.ScreeningDecision
    provider?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    matchedListIds?: ScreeningResultUpdatematchedListIdsInput | string[]
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScreeningResultCreateManyInput = {
    id?: string
    subjectId?: string | null
    targetIdentifier: string
    category: $Enums.ScreeningCategory
    decision: $Enums.ScreeningDecision
    provider: string
    score?: number
    matchedListIds?: ScreeningResultCreatematchedListIdsInput | string[]
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ScreeningResultUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetIdentifier?: StringFieldUpdateOperationsInput | string
    category?: EnumScreeningCategoryFieldUpdateOperationsInput | $Enums.ScreeningCategory
    decision?: EnumScreeningDecisionFieldUpdateOperationsInput | $Enums.ScreeningDecision
    provider?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    matchedListIds?: ScreeningResultUpdatematchedListIdsInput | string[]
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScreeningResultUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjectId?: NullableStringFieldUpdateOperationsInput | string | null
    targetIdentifier?: StringFieldUpdateOperationsInput | string
    category?: EnumScreeningCategoryFieldUpdateOperationsInput | $Enums.ScreeningCategory
    decision?: EnumScreeningDecisionFieldUpdateOperationsInput | $Enums.ScreeningDecision
    provider?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    matchedListIds?: ScreeningResultUpdatematchedListIdsInput | string[]
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceCaseCreateInput = {
    id?: string
    intentId?: string | null
    transactionId?: string | null
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    summary: string
    notes?: JsonNullValueInput | InputJsonValue
    assignedTo?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subject?: ComplianceSubjectCreateNestedOneWithoutCasesInput
  }

  export type ComplianceCaseUncheckedCreateInput = {
    id?: string
    subjectId?: string | null
    intentId?: string | null
    transactionId?: string | null
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    summary: string
    notes?: JsonNullValueInput | InputJsonValue
    assignedTo?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComplianceCaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    summary?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: ComplianceSubjectUpdateOneWithoutCasesNestedInput
  }

  export type ComplianceCaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjectId?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    summary?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceCaseCreateManyInput = {
    id?: string
    subjectId?: string | null
    intentId?: string | null
    transactionId?: string | null
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    summary: string
    notes?: JsonNullValueInput | InputJsonValue
    assignedTo?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComplianceCaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    summary?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceCaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    subjectId?: NullableStringFieldUpdateOperationsInput | string | null
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    summary?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type EnumSubjectKindFilter<$PrismaModel = never> = {
    equals?: $Enums.SubjectKind | EnumSubjectKindFieldRefInput<$PrismaModel>
    in?: $Enums.SubjectKind[] | ListEnumSubjectKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubjectKind[] | ListEnumSubjectKindFieldRefInput<$PrismaModel>
    not?: NestedEnumSubjectKindFilter<$PrismaModel> | $Enums.SubjectKind
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

  export type EnumVerificationTierFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationTier | EnumVerificationTierFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationTier[] | ListEnumVerificationTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationTier[] | ListEnumVerificationTierFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationTierFilter<$PrismaModel> | $Enums.VerificationTier
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

  export type ScreeningResultListRelationFilter = {
    every?: ScreeningResultWhereInput
    some?: ScreeningResultWhereInput
    none?: ScreeningResultWhereInput
  }

  export type ComplianceCaseListRelationFilter = {
    every?: ComplianceCaseWhereInput
    some?: ComplianceCaseWhereInput
    none?: ComplianceCaseWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ScreeningResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ComplianceCaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ComplianceSubjectCountOrderByAggregateInput = {
    id?: SortOrder
    externalRef?: SortOrder
    kind?: SortOrder
    displayName?: SortOrder
    countryCode?: SortOrder
    tier?: SortOrder
    tierUpdatedAt?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComplianceSubjectMaxOrderByAggregateInput = {
    id?: SortOrder
    externalRef?: SortOrder
    kind?: SortOrder
    displayName?: SortOrder
    countryCode?: SortOrder
    tier?: SortOrder
    tierUpdatedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComplianceSubjectMinOrderByAggregateInput = {
    id?: SortOrder
    externalRef?: SortOrder
    kind?: SortOrder
    displayName?: SortOrder
    countryCode?: SortOrder
    tier?: SortOrder
    tierUpdatedAt?: SortOrder
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

  export type EnumSubjectKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubjectKind | EnumSubjectKindFieldRefInput<$PrismaModel>
    in?: $Enums.SubjectKind[] | ListEnumSubjectKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubjectKind[] | ListEnumSubjectKindFieldRefInput<$PrismaModel>
    not?: NestedEnumSubjectKindWithAggregatesFilter<$PrismaModel> | $Enums.SubjectKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubjectKindFilter<$PrismaModel>
    _max?: NestedEnumSubjectKindFilter<$PrismaModel>
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

  export type EnumVerificationTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationTier | EnumVerificationTierFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationTier[] | ListEnumVerificationTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationTier[] | ListEnumVerificationTierFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationTierWithAggregatesFilter<$PrismaModel> | $Enums.VerificationTier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationTierFilter<$PrismaModel>
    _max?: NestedEnumVerificationTierFilter<$PrismaModel>
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

  export type EnumScreeningCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ScreeningCategory | EnumScreeningCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ScreeningCategory[] | ListEnumScreeningCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScreeningCategory[] | ListEnumScreeningCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumScreeningCategoryFilter<$PrismaModel> | $Enums.ScreeningCategory
  }

  export type EnumScreeningDecisionFilter<$PrismaModel = never> = {
    equals?: $Enums.ScreeningDecision | EnumScreeningDecisionFieldRefInput<$PrismaModel>
    in?: $Enums.ScreeningDecision[] | ListEnumScreeningDecisionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScreeningDecision[] | ListEnumScreeningDecisionFieldRefInput<$PrismaModel>
    not?: NestedEnumScreeningDecisionFilter<$PrismaModel> | $Enums.ScreeningDecision
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ComplianceSubjectNullableRelationFilter = {
    is?: ComplianceSubjectWhereInput | null
    isNot?: ComplianceSubjectWhereInput | null
  }

  export type ScreeningResultCountOrderByAggregateInput = {
    id?: SortOrder
    subjectId?: SortOrder
    targetIdentifier?: SortOrder
    category?: SortOrder
    decision?: SortOrder
    provider?: SortOrder
    score?: SortOrder
    matchedListIds?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type ScreeningResultAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type ScreeningResultMaxOrderByAggregateInput = {
    id?: SortOrder
    subjectId?: SortOrder
    targetIdentifier?: SortOrder
    category?: SortOrder
    decision?: SortOrder
    provider?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
  }

  export type ScreeningResultMinOrderByAggregateInput = {
    id?: SortOrder
    subjectId?: SortOrder
    targetIdentifier?: SortOrder
    category?: SortOrder
    decision?: SortOrder
    provider?: SortOrder
    score?: SortOrder
    createdAt?: SortOrder
  }

  export type ScreeningResultSumOrderByAggregateInput = {
    score?: SortOrder
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

  export type EnumScreeningCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScreeningCategory | EnumScreeningCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ScreeningCategory[] | ListEnumScreeningCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScreeningCategory[] | ListEnumScreeningCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumScreeningCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ScreeningCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScreeningCategoryFilter<$PrismaModel>
    _max?: NestedEnumScreeningCategoryFilter<$PrismaModel>
  }

  export type EnumScreeningDecisionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScreeningDecision | EnumScreeningDecisionFieldRefInput<$PrismaModel>
    in?: $Enums.ScreeningDecision[] | ListEnumScreeningDecisionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScreeningDecision[] | ListEnumScreeningDecisionFieldRefInput<$PrismaModel>
    not?: NestedEnumScreeningDecisionWithAggregatesFilter<$PrismaModel> | $Enums.ScreeningDecision
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScreeningDecisionFilter<$PrismaModel>
    _max?: NestedEnumScreeningDecisionFilter<$PrismaModel>
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

  export type EnumCaseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStatus | EnumCaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseStatusFilter<$PrismaModel> | $Enums.CaseStatus
  }

  export type EnumCasePriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.CasePriority | EnumCasePriorityFieldRefInput<$PrismaModel>
    in?: $Enums.CasePriority[] | ListEnumCasePriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.CasePriority[] | ListEnumCasePriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumCasePriorityFilter<$PrismaModel> | $Enums.CasePriority
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

  export type ComplianceCaseCountOrderByAggregateInput = {
    id?: SortOrder
    subjectId?: SortOrder
    intentId?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    summary?: SortOrder
    notes?: SortOrder
    assignedTo?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComplianceCaseMaxOrderByAggregateInput = {
    id?: SortOrder
    subjectId?: SortOrder
    intentId?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    summary?: SortOrder
    assignedTo?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ComplianceCaseMinOrderByAggregateInput = {
    id?: SortOrder
    subjectId?: SortOrder
    intentId?: SortOrder
    transactionId?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    summary?: SortOrder
    assignedTo?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumCaseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStatus | EnumCaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseStatusWithAggregatesFilter<$PrismaModel> | $Enums.CaseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCaseStatusFilter<$PrismaModel>
    _max?: NestedEnumCaseStatusFilter<$PrismaModel>
  }

  export type EnumCasePriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CasePriority | EnumCasePriorityFieldRefInput<$PrismaModel>
    in?: $Enums.CasePriority[] | ListEnumCasePriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.CasePriority[] | ListEnumCasePriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumCasePriorityWithAggregatesFilter<$PrismaModel> | $Enums.CasePriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCasePriorityFilter<$PrismaModel>
    _max?: NestedEnumCasePriorityFilter<$PrismaModel>
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

  export type ScreeningResultCreateNestedManyWithoutSubjectInput = {
    create?: XOR<ScreeningResultCreateWithoutSubjectInput, ScreeningResultUncheckedCreateWithoutSubjectInput> | ScreeningResultCreateWithoutSubjectInput[] | ScreeningResultUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ScreeningResultCreateOrConnectWithoutSubjectInput | ScreeningResultCreateOrConnectWithoutSubjectInput[]
    createMany?: ScreeningResultCreateManySubjectInputEnvelope
    connect?: ScreeningResultWhereUniqueInput | ScreeningResultWhereUniqueInput[]
  }

  export type ComplianceCaseCreateNestedManyWithoutSubjectInput = {
    create?: XOR<ComplianceCaseCreateWithoutSubjectInput, ComplianceCaseUncheckedCreateWithoutSubjectInput> | ComplianceCaseCreateWithoutSubjectInput[] | ComplianceCaseUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ComplianceCaseCreateOrConnectWithoutSubjectInput | ComplianceCaseCreateOrConnectWithoutSubjectInput[]
    createMany?: ComplianceCaseCreateManySubjectInputEnvelope
    connect?: ComplianceCaseWhereUniqueInput | ComplianceCaseWhereUniqueInput[]
  }

  export type ScreeningResultUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<ScreeningResultCreateWithoutSubjectInput, ScreeningResultUncheckedCreateWithoutSubjectInput> | ScreeningResultCreateWithoutSubjectInput[] | ScreeningResultUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ScreeningResultCreateOrConnectWithoutSubjectInput | ScreeningResultCreateOrConnectWithoutSubjectInput[]
    createMany?: ScreeningResultCreateManySubjectInputEnvelope
    connect?: ScreeningResultWhereUniqueInput | ScreeningResultWhereUniqueInput[]
  }

  export type ComplianceCaseUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<ComplianceCaseCreateWithoutSubjectInput, ComplianceCaseUncheckedCreateWithoutSubjectInput> | ComplianceCaseCreateWithoutSubjectInput[] | ComplianceCaseUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ComplianceCaseCreateOrConnectWithoutSubjectInput | ComplianceCaseCreateOrConnectWithoutSubjectInput[]
    createMany?: ComplianceCaseCreateManySubjectInputEnvelope
    connect?: ComplianceCaseWhereUniqueInput | ComplianceCaseWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumSubjectKindFieldUpdateOperationsInput = {
    set?: $Enums.SubjectKind
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumVerificationTierFieldUpdateOperationsInput = {
    set?: $Enums.VerificationTier
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ScreeningResultUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<ScreeningResultCreateWithoutSubjectInput, ScreeningResultUncheckedCreateWithoutSubjectInput> | ScreeningResultCreateWithoutSubjectInput[] | ScreeningResultUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ScreeningResultCreateOrConnectWithoutSubjectInput | ScreeningResultCreateOrConnectWithoutSubjectInput[]
    upsert?: ScreeningResultUpsertWithWhereUniqueWithoutSubjectInput | ScreeningResultUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: ScreeningResultCreateManySubjectInputEnvelope
    set?: ScreeningResultWhereUniqueInput | ScreeningResultWhereUniqueInput[]
    disconnect?: ScreeningResultWhereUniqueInput | ScreeningResultWhereUniqueInput[]
    delete?: ScreeningResultWhereUniqueInput | ScreeningResultWhereUniqueInput[]
    connect?: ScreeningResultWhereUniqueInput | ScreeningResultWhereUniqueInput[]
    update?: ScreeningResultUpdateWithWhereUniqueWithoutSubjectInput | ScreeningResultUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: ScreeningResultUpdateManyWithWhereWithoutSubjectInput | ScreeningResultUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: ScreeningResultScalarWhereInput | ScreeningResultScalarWhereInput[]
  }

  export type ComplianceCaseUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<ComplianceCaseCreateWithoutSubjectInput, ComplianceCaseUncheckedCreateWithoutSubjectInput> | ComplianceCaseCreateWithoutSubjectInput[] | ComplianceCaseUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ComplianceCaseCreateOrConnectWithoutSubjectInput | ComplianceCaseCreateOrConnectWithoutSubjectInput[]
    upsert?: ComplianceCaseUpsertWithWhereUniqueWithoutSubjectInput | ComplianceCaseUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: ComplianceCaseCreateManySubjectInputEnvelope
    set?: ComplianceCaseWhereUniqueInput | ComplianceCaseWhereUniqueInput[]
    disconnect?: ComplianceCaseWhereUniqueInput | ComplianceCaseWhereUniqueInput[]
    delete?: ComplianceCaseWhereUniqueInput | ComplianceCaseWhereUniqueInput[]
    connect?: ComplianceCaseWhereUniqueInput | ComplianceCaseWhereUniqueInput[]
    update?: ComplianceCaseUpdateWithWhereUniqueWithoutSubjectInput | ComplianceCaseUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: ComplianceCaseUpdateManyWithWhereWithoutSubjectInput | ComplianceCaseUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: ComplianceCaseScalarWhereInput | ComplianceCaseScalarWhereInput[]
  }

  export type ScreeningResultUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<ScreeningResultCreateWithoutSubjectInput, ScreeningResultUncheckedCreateWithoutSubjectInput> | ScreeningResultCreateWithoutSubjectInput[] | ScreeningResultUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ScreeningResultCreateOrConnectWithoutSubjectInput | ScreeningResultCreateOrConnectWithoutSubjectInput[]
    upsert?: ScreeningResultUpsertWithWhereUniqueWithoutSubjectInput | ScreeningResultUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: ScreeningResultCreateManySubjectInputEnvelope
    set?: ScreeningResultWhereUniqueInput | ScreeningResultWhereUniqueInput[]
    disconnect?: ScreeningResultWhereUniqueInput | ScreeningResultWhereUniqueInput[]
    delete?: ScreeningResultWhereUniqueInput | ScreeningResultWhereUniqueInput[]
    connect?: ScreeningResultWhereUniqueInput | ScreeningResultWhereUniqueInput[]
    update?: ScreeningResultUpdateWithWhereUniqueWithoutSubjectInput | ScreeningResultUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: ScreeningResultUpdateManyWithWhereWithoutSubjectInput | ScreeningResultUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: ScreeningResultScalarWhereInput | ScreeningResultScalarWhereInput[]
  }

  export type ComplianceCaseUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<ComplianceCaseCreateWithoutSubjectInput, ComplianceCaseUncheckedCreateWithoutSubjectInput> | ComplianceCaseCreateWithoutSubjectInput[] | ComplianceCaseUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ComplianceCaseCreateOrConnectWithoutSubjectInput | ComplianceCaseCreateOrConnectWithoutSubjectInput[]
    upsert?: ComplianceCaseUpsertWithWhereUniqueWithoutSubjectInput | ComplianceCaseUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: ComplianceCaseCreateManySubjectInputEnvelope
    set?: ComplianceCaseWhereUniqueInput | ComplianceCaseWhereUniqueInput[]
    disconnect?: ComplianceCaseWhereUniqueInput | ComplianceCaseWhereUniqueInput[]
    delete?: ComplianceCaseWhereUniqueInput | ComplianceCaseWhereUniqueInput[]
    connect?: ComplianceCaseWhereUniqueInput | ComplianceCaseWhereUniqueInput[]
    update?: ComplianceCaseUpdateWithWhereUniqueWithoutSubjectInput | ComplianceCaseUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: ComplianceCaseUpdateManyWithWhereWithoutSubjectInput | ComplianceCaseUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: ComplianceCaseScalarWhereInput | ComplianceCaseScalarWhereInput[]
  }

  export type ScreeningResultCreatematchedListIdsInput = {
    set: string[]
  }

  export type ComplianceSubjectCreateNestedOneWithoutScreeningsInput = {
    create?: XOR<ComplianceSubjectCreateWithoutScreeningsInput, ComplianceSubjectUncheckedCreateWithoutScreeningsInput>
    connectOrCreate?: ComplianceSubjectCreateOrConnectWithoutScreeningsInput
    connect?: ComplianceSubjectWhereUniqueInput
  }

  export type EnumScreeningCategoryFieldUpdateOperationsInput = {
    set?: $Enums.ScreeningCategory
  }

  export type EnumScreeningDecisionFieldUpdateOperationsInput = {
    set?: $Enums.ScreeningDecision
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ScreeningResultUpdatematchedListIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ComplianceSubjectUpdateOneWithoutScreeningsNestedInput = {
    create?: XOR<ComplianceSubjectCreateWithoutScreeningsInput, ComplianceSubjectUncheckedCreateWithoutScreeningsInput>
    connectOrCreate?: ComplianceSubjectCreateOrConnectWithoutScreeningsInput
    upsert?: ComplianceSubjectUpsertWithoutScreeningsInput
    disconnect?: ComplianceSubjectWhereInput | boolean
    delete?: ComplianceSubjectWhereInput | boolean
    connect?: ComplianceSubjectWhereUniqueInput
    update?: XOR<XOR<ComplianceSubjectUpdateToOneWithWhereWithoutScreeningsInput, ComplianceSubjectUpdateWithoutScreeningsInput>, ComplianceSubjectUncheckedUpdateWithoutScreeningsInput>
  }

  export type ComplianceSubjectCreateNestedOneWithoutCasesInput = {
    create?: XOR<ComplianceSubjectCreateWithoutCasesInput, ComplianceSubjectUncheckedCreateWithoutCasesInput>
    connectOrCreate?: ComplianceSubjectCreateOrConnectWithoutCasesInput
    connect?: ComplianceSubjectWhereUniqueInput
  }

  export type EnumCaseStatusFieldUpdateOperationsInput = {
    set?: $Enums.CaseStatus
  }

  export type EnumCasePriorityFieldUpdateOperationsInput = {
    set?: $Enums.CasePriority
  }

  export type ComplianceSubjectUpdateOneWithoutCasesNestedInput = {
    create?: XOR<ComplianceSubjectCreateWithoutCasesInput, ComplianceSubjectUncheckedCreateWithoutCasesInput>
    connectOrCreate?: ComplianceSubjectCreateOrConnectWithoutCasesInput
    upsert?: ComplianceSubjectUpsertWithoutCasesInput
    disconnect?: ComplianceSubjectWhereInput | boolean
    delete?: ComplianceSubjectWhereInput | boolean
    connect?: ComplianceSubjectWhereUniqueInput
    update?: XOR<XOR<ComplianceSubjectUpdateToOneWithWhereWithoutCasesInput, ComplianceSubjectUpdateWithoutCasesInput>, ComplianceSubjectUncheckedUpdateWithoutCasesInput>
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

  export type NestedEnumSubjectKindFilter<$PrismaModel = never> = {
    equals?: $Enums.SubjectKind | EnumSubjectKindFieldRefInput<$PrismaModel>
    in?: $Enums.SubjectKind[] | ListEnumSubjectKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubjectKind[] | ListEnumSubjectKindFieldRefInput<$PrismaModel>
    not?: NestedEnumSubjectKindFilter<$PrismaModel> | $Enums.SubjectKind
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

  export type NestedEnumVerificationTierFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationTier | EnumVerificationTierFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationTier[] | ListEnumVerificationTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationTier[] | ListEnumVerificationTierFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationTierFilter<$PrismaModel> | $Enums.VerificationTier
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

  export type NestedEnumSubjectKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubjectKind | EnumSubjectKindFieldRefInput<$PrismaModel>
    in?: $Enums.SubjectKind[] | ListEnumSubjectKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubjectKind[] | ListEnumSubjectKindFieldRefInput<$PrismaModel>
    not?: NestedEnumSubjectKindWithAggregatesFilter<$PrismaModel> | $Enums.SubjectKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubjectKindFilter<$PrismaModel>
    _max?: NestedEnumSubjectKindFilter<$PrismaModel>
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

  export type NestedEnumVerificationTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationTier | EnumVerificationTierFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationTier[] | ListEnumVerificationTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationTier[] | ListEnumVerificationTierFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationTierWithAggregatesFilter<$PrismaModel> | $Enums.VerificationTier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationTierFilter<$PrismaModel>
    _max?: NestedEnumVerificationTierFilter<$PrismaModel>
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

  export type NestedEnumScreeningCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ScreeningCategory | EnumScreeningCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ScreeningCategory[] | ListEnumScreeningCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScreeningCategory[] | ListEnumScreeningCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumScreeningCategoryFilter<$PrismaModel> | $Enums.ScreeningCategory
  }

  export type NestedEnumScreeningDecisionFilter<$PrismaModel = never> = {
    equals?: $Enums.ScreeningDecision | EnumScreeningDecisionFieldRefInput<$PrismaModel>
    in?: $Enums.ScreeningDecision[] | ListEnumScreeningDecisionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScreeningDecision[] | ListEnumScreeningDecisionFieldRefInput<$PrismaModel>
    not?: NestedEnumScreeningDecisionFilter<$PrismaModel> | $Enums.ScreeningDecision
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

  export type NestedEnumScreeningCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScreeningCategory | EnumScreeningCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ScreeningCategory[] | ListEnumScreeningCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScreeningCategory[] | ListEnumScreeningCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumScreeningCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ScreeningCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScreeningCategoryFilter<$PrismaModel>
    _max?: NestedEnumScreeningCategoryFilter<$PrismaModel>
  }

  export type NestedEnumScreeningDecisionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScreeningDecision | EnumScreeningDecisionFieldRefInput<$PrismaModel>
    in?: $Enums.ScreeningDecision[] | ListEnumScreeningDecisionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScreeningDecision[] | ListEnumScreeningDecisionFieldRefInput<$PrismaModel>
    not?: NestedEnumScreeningDecisionWithAggregatesFilter<$PrismaModel> | $Enums.ScreeningDecision
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScreeningDecisionFilter<$PrismaModel>
    _max?: NestedEnumScreeningDecisionFilter<$PrismaModel>
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

  export type NestedEnumCaseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStatus | EnumCaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseStatusFilter<$PrismaModel> | $Enums.CaseStatus
  }

  export type NestedEnumCasePriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.CasePriority | EnumCasePriorityFieldRefInput<$PrismaModel>
    in?: $Enums.CasePriority[] | ListEnumCasePriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.CasePriority[] | ListEnumCasePriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumCasePriorityFilter<$PrismaModel> | $Enums.CasePriority
  }

  export type NestedEnumCaseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CaseStatus | EnumCaseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CaseStatus[] | ListEnumCaseStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCaseStatusWithAggregatesFilter<$PrismaModel> | $Enums.CaseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCaseStatusFilter<$PrismaModel>
    _max?: NestedEnumCaseStatusFilter<$PrismaModel>
  }

  export type NestedEnumCasePriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CasePriority | EnumCasePriorityFieldRefInput<$PrismaModel>
    in?: $Enums.CasePriority[] | ListEnumCasePriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.CasePriority[] | ListEnumCasePriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumCasePriorityWithAggregatesFilter<$PrismaModel> | $Enums.CasePriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCasePriorityFilter<$PrismaModel>
    _max?: NestedEnumCasePriorityFilter<$PrismaModel>
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

  export type ScreeningResultCreateWithoutSubjectInput = {
    id?: string
    targetIdentifier: string
    category: $Enums.ScreeningCategory
    decision: $Enums.ScreeningDecision
    provider: string
    score?: number
    matchedListIds?: ScreeningResultCreatematchedListIdsInput | string[]
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ScreeningResultUncheckedCreateWithoutSubjectInput = {
    id?: string
    targetIdentifier: string
    category: $Enums.ScreeningCategory
    decision: $Enums.ScreeningDecision
    provider: string
    score?: number
    matchedListIds?: ScreeningResultCreatematchedListIdsInput | string[]
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ScreeningResultCreateOrConnectWithoutSubjectInput = {
    where: ScreeningResultWhereUniqueInput
    create: XOR<ScreeningResultCreateWithoutSubjectInput, ScreeningResultUncheckedCreateWithoutSubjectInput>
  }

  export type ScreeningResultCreateManySubjectInputEnvelope = {
    data: ScreeningResultCreateManySubjectInput | ScreeningResultCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type ComplianceCaseCreateWithoutSubjectInput = {
    id?: string
    intentId?: string | null
    transactionId?: string | null
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    summary: string
    notes?: JsonNullValueInput | InputJsonValue
    assignedTo?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComplianceCaseUncheckedCreateWithoutSubjectInput = {
    id?: string
    intentId?: string | null
    transactionId?: string | null
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    summary: string
    notes?: JsonNullValueInput | InputJsonValue
    assignedTo?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ComplianceCaseCreateOrConnectWithoutSubjectInput = {
    where: ComplianceCaseWhereUniqueInput
    create: XOR<ComplianceCaseCreateWithoutSubjectInput, ComplianceCaseUncheckedCreateWithoutSubjectInput>
  }

  export type ComplianceCaseCreateManySubjectInputEnvelope = {
    data: ComplianceCaseCreateManySubjectInput | ComplianceCaseCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type ScreeningResultUpsertWithWhereUniqueWithoutSubjectInput = {
    where: ScreeningResultWhereUniqueInput
    update: XOR<ScreeningResultUpdateWithoutSubjectInput, ScreeningResultUncheckedUpdateWithoutSubjectInput>
    create: XOR<ScreeningResultCreateWithoutSubjectInput, ScreeningResultUncheckedCreateWithoutSubjectInput>
  }

  export type ScreeningResultUpdateWithWhereUniqueWithoutSubjectInput = {
    where: ScreeningResultWhereUniqueInput
    data: XOR<ScreeningResultUpdateWithoutSubjectInput, ScreeningResultUncheckedUpdateWithoutSubjectInput>
  }

  export type ScreeningResultUpdateManyWithWhereWithoutSubjectInput = {
    where: ScreeningResultScalarWhereInput
    data: XOR<ScreeningResultUpdateManyMutationInput, ScreeningResultUncheckedUpdateManyWithoutSubjectInput>
  }

  export type ScreeningResultScalarWhereInput = {
    AND?: ScreeningResultScalarWhereInput | ScreeningResultScalarWhereInput[]
    OR?: ScreeningResultScalarWhereInput[]
    NOT?: ScreeningResultScalarWhereInput | ScreeningResultScalarWhereInput[]
    id?: UuidFilter<"ScreeningResult"> | string
    subjectId?: UuidNullableFilter<"ScreeningResult"> | string | null
    targetIdentifier?: StringFilter<"ScreeningResult"> | string
    category?: EnumScreeningCategoryFilter<"ScreeningResult"> | $Enums.ScreeningCategory
    decision?: EnumScreeningDecisionFilter<"ScreeningResult"> | $Enums.ScreeningDecision
    provider?: StringFilter<"ScreeningResult"> | string
    score?: IntFilter<"ScreeningResult"> | number
    matchedListIds?: StringNullableListFilter<"ScreeningResult">
    details?: JsonNullableFilter<"ScreeningResult">
    createdAt?: DateTimeFilter<"ScreeningResult"> | Date | string
  }

  export type ComplianceCaseUpsertWithWhereUniqueWithoutSubjectInput = {
    where: ComplianceCaseWhereUniqueInput
    update: XOR<ComplianceCaseUpdateWithoutSubjectInput, ComplianceCaseUncheckedUpdateWithoutSubjectInput>
    create: XOR<ComplianceCaseCreateWithoutSubjectInput, ComplianceCaseUncheckedCreateWithoutSubjectInput>
  }

  export type ComplianceCaseUpdateWithWhereUniqueWithoutSubjectInput = {
    where: ComplianceCaseWhereUniqueInput
    data: XOR<ComplianceCaseUpdateWithoutSubjectInput, ComplianceCaseUncheckedUpdateWithoutSubjectInput>
  }

  export type ComplianceCaseUpdateManyWithWhereWithoutSubjectInput = {
    where: ComplianceCaseScalarWhereInput
    data: XOR<ComplianceCaseUpdateManyMutationInput, ComplianceCaseUncheckedUpdateManyWithoutSubjectInput>
  }

  export type ComplianceCaseScalarWhereInput = {
    AND?: ComplianceCaseScalarWhereInput | ComplianceCaseScalarWhereInput[]
    OR?: ComplianceCaseScalarWhereInput[]
    NOT?: ComplianceCaseScalarWhereInput | ComplianceCaseScalarWhereInput[]
    id?: UuidFilter<"ComplianceCase"> | string
    subjectId?: UuidNullableFilter<"ComplianceCase"> | string | null
    intentId?: StringNullableFilter<"ComplianceCase"> | string | null
    transactionId?: StringNullableFilter<"ComplianceCase"> | string | null
    status?: EnumCaseStatusFilter<"ComplianceCase"> | $Enums.CaseStatus
    priority?: EnumCasePriorityFilter<"ComplianceCase"> | $Enums.CasePriority
    summary?: StringFilter<"ComplianceCase"> | string
    notes?: JsonFilter<"ComplianceCase">
    assignedTo?: StringNullableFilter<"ComplianceCase"> | string | null
    resolvedAt?: DateTimeNullableFilter<"ComplianceCase"> | Date | string | null
    createdAt?: DateTimeFilter<"ComplianceCase"> | Date | string
    updatedAt?: DateTimeFilter<"ComplianceCase"> | Date | string
  }

  export type ComplianceSubjectCreateWithoutScreeningsInput = {
    id?: string
    externalRef: string
    kind: $Enums.SubjectKind
    displayName?: string | null
    countryCode?: string | null
    tier?: $Enums.VerificationTier
    tierUpdatedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: ComplianceCaseCreateNestedManyWithoutSubjectInput
  }

  export type ComplianceSubjectUncheckedCreateWithoutScreeningsInput = {
    id?: string
    externalRef: string
    kind: $Enums.SubjectKind
    displayName?: string | null
    countryCode?: string | null
    tier?: $Enums.VerificationTier
    tierUpdatedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    cases?: ComplianceCaseUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type ComplianceSubjectCreateOrConnectWithoutScreeningsInput = {
    where: ComplianceSubjectWhereUniqueInput
    create: XOR<ComplianceSubjectCreateWithoutScreeningsInput, ComplianceSubjectUncheckedCreateWithoutScreeningsInput>
  }

  export type ComplianceSubjectUpsertWithoutScreeningsInput = {
    update: XOR<ComplianceSubjectUpdateWithoutScreeningsInput, ComplianceSubjectUncheckedUpdateWithoutScreeningsInput>
    create: XOR<ComplianceSubjectCreateWithoutScreeningsInput, ComplianceSubjectUncheckedCreateWithoutScreeningsInput>
    where?: ComplianceSubjectWhereInput
  }

  export type ComplianceSubjectUpdateToOneWithWhereWithoutScreeningsInput = {
    where?: ComplianceSubjectWhereInput
    data: XOR<ComplianceSubjectUpdateWithoutScreeningsInput, ComplianceSubjectUncheckedUpdateWithoutScreeningsInput>
  }

  export type ComplianceSubjectUpdateWithoutScreeningsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kind?: EnumSubjectKindFieldUpdateOperationsInput | $Enums.SubjectKind
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumVerificationTierFieldUpdateOperationsInput | $Enums.VerificationTier
    tierUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: ComplianceCaseUpdateManyWithoutSubjectNestedInput
  }

  export type ComplianceSubjectUncheckedUpdateWithoutScreeningsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kind?: EnumSubjectKindFieldUpdateOperationsInput | $Enums.SubjectKind
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumVerificationTierFieldUpdateOperationsInput | $Enums.VerificationTier
    tierUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cases?: ComplianceCaseUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type ComplianceSubjectCreateWithoutCasesInput = {
    id?: string
    externalRef: string
    kind: $Enums.SubjectKind
    displayName?: string | null
    countryCode?: string | null
    tier?: $Enums.VerificationTier
    tierUpdatedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    screenings?: ScreeningResultCreateNestedManyWithoutSubjectInput
  }

  export type ComplianceSubjectUncheckedCreateWithoutCasesInput = {
    id?: string
    externalRef: string
    kind: $Enums.SubjectKind
    displayName?: string | null
    countryCode?: string | null
    tier?: $Enums.VerificationTier
    tierUpdatedAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    screenings?: ScreeningResultUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type ComplianceSubjectCreateOrConnectWithoutCasesInput = {
    where: ComplianceSubjectWhereUniqueInput
    create: XOR<ComplianceSubjectCreateWithoutCasesInput, ComplianceSubjectUncheckedCreateWithoutCasesInput>
  }

  export type ComplianceSubjectUpsertWithoutCasesInput = {
    update: XOR<ComplianceSubjectUpdateWithoutCasesInput, ComplianceSubjectUncheckedUpdateWithoutCasesInput>
    create: XOR<ComplianceSubjectCreateWithoutCasesInput, ComplianceSubjectUncheckedCreateWithoutCasesInput>
    where?: ComplianceSubjectWhereInput
  }

  export type ComplianceSubjectUpdateToOneWithWhereWithoutCasesInput = {
    where?: ComplianceSubjectWhereInput
    data: XOR<ComplianceSubjectUpdateWithoutCasesInput, ComplianceSubjectUncheckedUpdateWithoutCasesInput>
  }

  export type ComplianceSubjectUpdateWithoutCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kind?: EnumSubjectKindFieldUpdateOperationsInput | $Enums.SubjectKind
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumVerificationTierFieldUpdateOperationsInput | $Enums.VerificationTier
    tierUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    screenings?: ScreeningResultUpdateManyWithoutSubjectNestedInput
  }

  export type ComplianceSubjectUncheckedUpdateWithoutCasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kind?: EnumSubjectKindFieldUpdateOperationsInput | $Enums.SubjectKind
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumVerificationTierFieldUpdateOperationsInput | $Enums.VerificationTier
    tierUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    screenings?: ScreeningResultUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type ScreeningResultCreateManySubjectInput = {
    id?: string
    targetIdentifier: string
    category: $Enums.ScreeningCategory
    decision: $Enums.ScreeningDecision
    provider: string
    score?: number
    matchedListIds?: ScreeningResultCreatematchedListIdsInput | string[]
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ComplianceCaseCreateManySubjectInput = {
    id?: string
    intentId?: string | null
    transactionId?: string | null
    status?: $Enums.CaseStatus
    priority?: $Enums.CasePriority
    summary: string
    notes?: JsonNullValueInput | InputJsonValue
    assignedTo?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScreeningResultUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetIdentifier?: StringFieldUpdateOperationsInput | string
    category?: EnumScreeningCategoryFieldUpdateOperationsInput | $Enums.ScreeningCategory
    decision?: EnumScreeningDecisionFieldUpdateOperationsInput | $Enums.ScreeningDecision
    provider?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    matchedListIds?: ScreeningResultUpdatematchedListIdsInput | string[]
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScreeningResultUncheckedUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetIdentifier?: StringFieldUpdateOperationsInput | string
    category?: EnumScreeningCategoryFieldUpdateOperationsInput | $Enums.ScreeningCategory
    decision?: EnumScreeningDecisionFieldUpdateOperationsInput | $Enums.ScreeningDecision
    provider?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    matchedListIds?: ScreeningResultUpdatematchedListIdsInput | string[]
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScreeningResultUncheckedUpdateManyWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    targetIdentifier?: StringFieldUpdateOperationsInput | string
    category?: EnumScreeningCategoryFieldUpdateOperationsInput | $Enums.ScreeningCategory
    decision?: EnumScreeningDecisionFieldUpdateOperationsInput | $Enums.ScreeningDecision
    provider?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    matchedListIds?: ScreeningResultUpdatematchedListIdsInput | string[]
    details?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceCaseUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    summary?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceCaseUncheckedUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    summary?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplianceCaseUncheckedUpdateManyWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCaseStatusFieldUpdateOperationsInput | $Enums.CaseStatus
    priority?: EnumCasePriorityFieldUpdateOperationsInput | $Enums.CasePriority
    summary?: StringFieldUpdateOperationsInput | string
    notes?: JsonNullValueInput | InputJsonValue
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ComplianceSubjectCountOutputTypeDefaultArgs instead
     */
    export type ComplianceSubjectCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ComplianceSubjectCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ComplianceSubjectDefaultArgs instead
     */
    export type ComplianceSubjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ComplianceSubjectDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ScreeningResultDefaultArgs instead
     */
    export type ScreeningResultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ScreeningResultDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ComplianceCaseDefaultArgs instead
     */
    export type ComplianceCaseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ComplianceCaseDefaultArgs<ExtArgs>

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