
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
 * Model Institution
 * 
 */
export type Institution = $Result.DefaultSelection<Prisma.$InstitutionPayload>
/**
 * Model Learner
 * 
 */
export type Learner = $Result.DefaultSelection<Prisma.$LearnerPayload>
/**
 * Model Credential
 * 
 */
export type Credential = $Result.DefaultSelection<Prisma.$CredentialPayload>
/**
 * Model Enrollment
 * 
 */
export type Enrollment = $Result.DefaultSelection<Prisma.$EnrollmentPayload>
/**
 * Model TuitionInvoice
 * 
 */
export type TuitionInvoice = $Result.DefaultSelection<Prisma.$TuitionInvoicePayload>
/**
 * Model ScholarshipGrant
 * 
 */
export type ScholarshipGrant = $Result.DefaultSelection<Prisma.$ScholarshipGrantPayload>

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


export const CredentialType: {
  DEGREE: 'DEGREE',
  CERTIFICATE: 'CERTIFICATE',
  BADGE: 'BADGE'
};

export type CredentialType = (typeof CredentialType)[keyof typeof CredentialType]


export const CredentialStatus: {
  ACTIVE: 'ACTIVE',
  REVOKED: 'REVOKED'
};

export type CredentialStatus = (typeof CredentialStatus)[keyof typeof CredentialStatus]


export const ScholarshipStatus: {
  ACTIVE: 'ACTIVE',
  DISBURSED: 'DISBURSED',
  CANCELLED: 'CANCELLED'
};

export type ScholarshipStatus = (typeof ScholarshipStatus)[keyof typeof ScholarshipStatus]

}

export type OutboxStatus = $Enums.OutboxStatus

export const OutboxStatus: typeof $Enums.OutboxStatus

export type CredentialType = $Enums.CredentialType

export const CredentialType: typeof $Enums.CredentialType

export type CredentialStatus = $Enums.CredentialStatus

export const CredentialStatus: typeof $Enums.CredentialStatus

export type ScholarshipStatus = $Enums.ScholarshipStatus

export const ScholarshipStatus: typeof $Enums.ScholarshipStatus

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
   * `prisma.institution`: Exposes CRUD operations for the **Institution** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Institutions
    * const institutions = await prisma.institution.findMany()
    * ```
    */
  get institution(): Prisma.InstitutionDelegate<ExtArgs>;

  /**
   * `prisma.learner`: Exposes CRUD operations for the **Learner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Learners
    * const learners = await prisma.learner.findMany()
    * ```
    */
  get learner(): Prisma.LearnerDelegate<ExtArgs>;

  /**
   * `prisma.credential`: Exposes CRUD operations for the **Credential** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Credentials
    * const credentials = await prisma.credential.findMany()
    * ```
    */
  get credential(): Prisma.CredentialDelegate<ExtArgs>;

  /**
   * `prisma.enrollment`: Exposes CRUD operations for the **Enrollment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Enrollments
    * const enrollments = await prisma.enrollment.findMany()
    * ```
    */
  get enrollment(): Prisma.EnrollmentDelegate<ExtArgs>;

  /**
   * `prisma.tuitionInvoice`: Exposes CRUD operations for the **TuitionInvoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TuitionInvoices
    * const tuitionInvoices = await prisma.tuitionInvoice.findMany()
    * ```
    */
  get tuitionInvoice(): Prisma.TuitionInvoiceDelegate<ExtArgs>;

  /**
   * `prisma.scholarshipGrant`: Exposes CRUD operations for the **ScholarshipGrant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScholarshipGrants
    * const scholarshipGrants = await prisma.scholarshipGrant.findMany()
    * ```
    */
  get scholarshipGrant(): Prisma.ScholarshipGrantDelegate<ExtArgs>;
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
    Institution: 'Institution',
    Learner: 'Learner',
    Credential: 'Credential',
    Enrollment: 'Enrollment',
    TuitionInvoice: 'TuitionInvoice',
    ScholarshipGrant: 'ScholarshipGrant'
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
      modelProps: "eventOutbox" | "institution" | "learner" | "credential" | "enrollment" | "tuitionInvoice" | "scholarshipGrant"
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
      Institution: {
        payload: Prisma.$InstitutionPayload<ExtArgs>
        fields: Prisma.InstitutionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InstitutionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstitutionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InstitutionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstitutionPayload>
          }
          findFirst: {
            args: Prisma.InstitutionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstitutionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InstitutionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstitutionPayload>
          }
          findMany: {
            args: Prisma.InstitutionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstitutionPayload>[]
          }
          create: {
            args: Prisma.InstitutionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstitutionPayload>
          }
          createMany: {
            args: Prisma.InstitutionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InstitutionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstitutionPayload>[]
          }
          delete: {
            args: Prisma.InstitutionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstitutionPayload>
          }
          update: {
            args: Prisma.InstitutionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstitutionPayload>
          }
          deleteMany: {
            args: Prisma.InstitutionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InstitutionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InstitutionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstitutionPayload>
          }
          aggregate: {
            args: Prisma.InstitutionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstitution>
          }
          groupBy: {
            args: Prisma.InstitutionGroupByArgs<ExtArgs>
            result: $Utils.Optional<InstitutionGroupByOutputType>[]
          }
          count: {
            args: Prisma.InstitutionCountArgs<ExtArgs>
            result: $Utils.Optional<InstitutionCountAggregateOutputType> | number
          }
        }
      }
      Learner: {
        payload: Prisma.$LearnerPayload<ExtArgs>
        fields: Prisma.LearnerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LearnerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearnerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LearnerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearnerPayload>
          }
          findFirst: {
            args: Prisma.LearnerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearnerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LearnerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearnerPayload>
          }
          findMany: {
            args: Prisma.LearnerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearnerPayload>[]
          }
          create: {
            args: Prisma.LearnerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearnerPayload>
          }
          createMany: {
            args: Prisma.LearnerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LearnerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearnerPayload>[]
          }
          delete: {
            args: Prisma.LearnerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearnerPayload>
          }
          update: {
            args: Prisma.LearnerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearnerPayload>
          }
          deleteMany: {
            args: Prisma.LearnerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LearnerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LearnerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearnerPayload>
          }
          aggregate: {
            args: Prisma.LearnerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLearner>
          }
          groupBy: {
            args: Prisma.LearnerGroupByArgs<ExtArgs>
            result: $Utils.Optional<LearnerGroupByOutputType>[]
          }
          count: {
            args: Prisma.LearnerCountArgs<ExtArgs>
            result: $Utils.Optional<LearnerCountAggregateOutputType> | number
          }
        }
      }
      Credential: {
        payload: Prisma.$CredentialPayload<ExtArgs>
        fields: Prisma.CredentialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CredentialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CredentialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>
          }
          findFirst: {
            args: Prisma.CredentialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CredentialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>
          }
          findMany: {
            args: Prisma.CredentialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>[]
          }
          create: {
            args: Prisma.CredentialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>
          }
          createMany: {
            args: Prisma.CredentialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CredentialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>[]
          }
          delete: {
            args: Prisma.CredentialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>
          }
          update: {
            args: Prisma.CredentialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>
          }
          deleteMany: {
            args: Prisma.CredentialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CredentialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CredentialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>
          }
          aggregate: {
            args: Prisma.CredentialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCredential>
          }
          groupBy: {
            args: Prisma.CredentialGroupByArgs<ExtArgs>
            result: $Utils.Optional<CredentialGroupByOutputType>[]
          }
          count: {
            args: Prisma.CredentialCountArgs<ExtArgs>
            result: $Utils.Optional<CredentialCountAggregateOutputType> | number
          }
        }
      }
      Enrollment: {
        payload: Prisma.$EnrollmentPayload<ExtArgs>
        fields: Prisma.EnrollmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnrollmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnrollmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findFirst: {
            args: Prisma.EnrollmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnrollmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findMany: {
            args: Prisma.EnrollmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          create: {
            args: Prisma.EnrollmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          createMany: {
            args: Prisma.EnrollmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EnrollmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          delete: {
            args: Prisma.EnrollmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          update: {
            args: Prisma.EnrollmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          deleteMany: {
            args: Prisma.EnrollmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnrollmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EnrollmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          aggregate: {
            args: Prisma.EnrollmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnrollment>
          }
          groupBy: {
            args: Prisma.EnrollmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnrollmentCountArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentCountAggregateOutputType> | number
          }
        }
      }
      TuitionInvoice: {
        payload: Prisma.$TuitionInvoicePayload<ExtArgs>
        fields: Prisma.TuitionInvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TuitionInvoiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TuitionInvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TuitionInvoiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TuitionInvoicePayload>
          }
          findFirst: {
            args: Prisma.TuitionInvoiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TuitionInvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TuitionInvoiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TuitionInvoicePayload>
          }
          findMany: {
            args: Prisma.TuitionInvoiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TuitionInvoicePayload>[]
          }
          create: {
            args: Prisma.TuitionInvoiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TuitionInvoicePayload>
          }
          createMany: {
            args: Prisma.TuitionInvoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TuitionInvoiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TuitionInvoicePayload>[]
          }
          delete: {
            args: Prisma.TuitionInvoiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TuitionInvoicePayload>
          }
          update: {
            args: Prisma.TuitionInvoiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TuitionInvoicePayload>
          }
          deleteMany: {
            args: Prisma.TuitionInvoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TuitionInvoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TuitionInvoiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TuitionInvoicePayload>
          }
          aggregate: {
            args: Prisma.TuitionInvoiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTuitionInvoice>
          }
          groupBy: {
            args: Prisma.TuitionInvoiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<TuitionInvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.TuitionInvoiceCountArgs<ExtArgs>
            result: $Utils.Optional<TuitionInvoiceCountAggregateOutputType> | number
          }
        }
      }
      ScholarshipGrant: {
        payload: Prisma.$ScholarshipGrantPayload<ExtArgs>
        fields: Prisma.ScholarshipGrantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScholarshipGrantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScholarshipGrantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScholarshipGrantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScholarshipGrantPayload>
          }
          findFirst: {
            args: Prisma.ScholarshipGrantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScholarshipGrantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScholarshipGrantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScholarshipGrantPayload>
          }
          findMany: {
            args: Prisma.ScholarshipGrantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScholarshipGrantPayload>[]
          }
          create: {
            args: Prisma.ScholarshipGrantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScholarshipGrantPayload>
          }
          createMany: {
            args: Prisma.ScholarshipGrantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScholarshipGrantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScholarshipGrantPayload>[]
          }
          delete: {
            args: Prisma.ScholarshipGrantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScholarshipGrantPayload>
          }
          update: {
            args: Prisma.ScholarshipGrantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScholarshipGrantPayload>
          }
          deleteMany: {
            args: Prisma.ScholarshipGrantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScholarshipGrantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ScholarshipGrantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScholarshipGrantPayload>
          }
          aggregate: {
            args: Prisma.ScholarshipGrantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScholarshipGrant>
          }
          groupBy: {
            args: Prisma.ScholarshipGrantGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScholarshipGrantGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScholarshipGrantCountArgs<ExtArgs>
            result: $Utils.Optional<ScholarshipGrantCountAggregateOutputType> | number
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
   * Count Type InstitutionCountOutputType
   */

  export type InstitutionCountOutputType = {
    credentials: number
    enrollments: number
  }

  export type InstitutionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    credentials?: boolean | InstitutionCountOutputTypeCountCredentialsArgs
    enrollments?: boolean | InstitutionCountOutputTypeCountEnrollmentsArgs
  }

  // Custom InputTypes
  /**
   * InstitutionCountOutputType without action
   */
  export type InstitutionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstitutionCountOutputType
     */
    select?: InstitutionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InstitutionCountOutputType without action
   */
  export type InstitutionCountOutputTypeCountCredentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CredentialWhereInput
  }

  /**
   * InstitutionCountOutputType without action
   */
  export type InstitutionCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }


  /**
   * Count Type LearnerCountOutputType
   */

  export type LearnerCountOutputType = {
    credentials: number
    enrollments: number
  }

  export type LearnerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    credentials?: boolean | LearnerCountOutputTypeCountCredentialsArgs
    enrollments?: boolean | LearnerCountOutputTypeCountEnrollmentsArgs
  }

  // Custom InputTypes
  /**
   * LearnerCountOutputType without action
   */
  export type LearnerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearnerCountOutputType
     */
    select?: LearnerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LearnerCountOutputType without action
   */
  export type LearnerCountOutputTypeCountCredentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CredentialWhereInput
  }

  /**
   * LearnerCountOutputType without action
   */
  export type LearnerCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
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
   * Model Institution
   */

  export type AggregateInstitution = {
    _count: InstitutionCountAggregateOutputType | null
    _min: InstitutionMinAggregateOutputType | null
    _max: InstitutionMaxAggregateOutputType | null
  }

  export type InstitutionMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type InstitutionMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type InstitutionCountAggregateOutputType = {
    id: number
    orgId: number
    name: number
    createdAt: number
    _all: number
  }


  export type InstitutionMinAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    createdAt?: true
  }

  export type InstitutionMaxAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    createdAt?: true
  }

  export type InstitutionCountAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type InstitutionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Institution to aggregate.
     */
    where?: InstitutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Institutions to fetch.
     */
    orderBy?: InstitutionOrderByWithRelationInput | InstitutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InstitutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Institutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Institutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Institutions
    **/
    _count?: true | InstitutionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstitutionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstitutionMaxAggregateInputType
  }

  export type GetInstitutionAggregateType<T extends InstitutionAggregateArgs> = {
        [P in keyof T & keyof AggregateInstitution]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstitution[P]>
      : GetScalarType<T[P], AggregateInstitution[P]>
  }




  export type InstitutionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstitutionWhereInput
    orderBy?: InstitutionOrderByWithAggregationInput | InstitutionOrderByWithAggregationInput[]
    by: InstitutionScalarFieldEnum[] | InstitutionScalarFieldEnum
    having?: InstitutionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstitutionCountAggregateInputType | true
    _min?: InstitutionMinAggregateInputType
    _max?: InstitutionMaxAggregateInputType
  }

  export type InstitutionGroupByOutputType = {
    id: string
    orgId: string
    name: string
    createdAt: Date
    _count: InstitutionCountAggregateOutputType | null
    _min: InstitutionMinAggregateOutputType | null
    _max: InstitutionMaxAggregateOutputType | null
  }

  type GetInstitutionGroupByPayload<T extends InstitutionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InstitutionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstitutionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstitutionGroupByOutputType[P]>
            : GetScalarType<T[P], InstitutionGroupByOutputType[P]>
        }
      >
    >


  export type InstitutionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    name?: boolean
    createdAt?: boolean
    credentials?: boolean | Institution$credentialsArgs<ExtArgs>
    enrollments?: boolean | Institution$enrollmentsArgs<ExtArgs>
    _count?: boolean | InstitutionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["institution"]>

  export type InstitutionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["institution"]>

  export type InstitutionSelectScalar = {
    id?: boolean
    orgId?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type InstitutionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    credentials?: boolean | Institution$credentialsArgs<ExtArgs>
    enrollments?: boolean | Institution$enrollmentsArgs<ExtArgs>
    _count?: boolean | InstitutionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InstitutionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $InstitutionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Institution"
    objects: {
      credentials: Prisma.$CredentialPayload<ExtArgs>[]
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["institution"]>
    composites: {}
  }

  type InstitutionGetPayload<S extends boolean | null | undefined | InstitutionDefaultArgs> = $Result.GetResult<Prisma.$InstitutionPayload, S>

  type InstitutionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InstitutionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InstitutionCountAggregateInputType | true
    }

  export interface InstitutionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Institution'], meta: { name: 'Institution' } }
    /**
     * Find zero or one Institution that matches the filter.
     * @param {InstitutionFindUniqueArgs} args - Arguments to find a Institution
     * @example
     * // Get one Institution
     * const institution = await prisma.institution.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstitutionFindUniqueArgs>(args: SelectSubset<T, InstitutionFindUniqueArgs<ExtArgs>>): Prisma__InstitutionClient<$Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Institution that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InstitutionFindUniqueOrThrowArgs} args - Arguments to find a Institution
     * @example
     * // Get one Institution
     * const institution = await prisma.institution.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstitutionFindUniqueOrThrowArgs>(args: SelectSubset<T, InstitutionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InstitutionClient<$Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Institution that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstitutionFindFirstArgs} args - Arguments to find a Institution
     * @example
     * // Get one Institution
     * const institution = await prisma.institution.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstitutionFindFirstArgs>(args?: SelectSubset<T, InstitutionFindFirstArgs<ExtArgs>>): Prisma__InstitutionClient<$Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Institution that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstitutionFindFirstOrThrowArgs} args - Arguments to find a Institution
     * @example
     * // Get one Institution
     * const institution = await prisma.institution.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstitutionFindFirstOrThrowArgs>(args?: SelectSubset<T, InstitutionFindFirstOrThrowArgs<ExtArgs>>): Prisma__InstitutionClient<$Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Institutions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstitutionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Institutions
     * const institutions = await prisma.institution.findMany()
     * 
     * // Get first 10 Institutions
     * const institutions = await prisma.institution.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const institutionWithIdOnly = await prisma.institution.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InstitutionFindManyArgs>(args?: SelectSubset<T, InstitutionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Institution.
     * @param {InstitutionCreateArgs} args - Arguments to create a Institution.
     * @example
     * // Create one Institution
     * const Institution = await prisma.institution.create({
     *   data: {
     *     // ... data to create a Institution
     *   }
     * })
     * 
     */
    create<T extends InstitutionCreateArgs>(args: SelectSubset<T, InstitutionCreateArgs<ExtArgs>>): Prisma__InstitutionClient<$Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Institutions.
     * @param {InstitutionCreateManyArgs} args - Arguments to create many Institutions.
     * @example
     * // Create many Institutions
     * const institution = await prisma.institution.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InstitutionCreateManyArgs>(args?: SelectSubset<T, InstitutionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Institutions and returns the data saved in the database.
     * @param {InstitutionCreateManyAndReturnArgs} args - Arguments to create many Institutions.
     * @example
     * // Create many Institutions
     * const institution = await prisma.institution.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Institutions and only return the `id`
     * const institutionWithIdOnly = await prisma.institution.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InstitutionCreateManyAndReturnArgs>(args?: SelectSubset<T, InstitutionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Institution.
     * @param {InstitutionDeleteArgs} args - Arguments to delete one Institution.
     * @example
     * // Delete one Institution
     * const Institution = await prisma.institution.delete({
     *   where: {
     *     // ... filter to delete one Institution
     *   }
     * })
     * 
     */
    delete<T extends InstitutionDeleteArgs>(args: SelectSubset<T, InstitutionDeleteArgs<ExtArgs>>): Prisma__InstitutionClient<$Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Institution.
     * @param {InstitutionUpdateArgs} args - Arguments to update one Institution.
     * @example
     * // Update one Institution
     * const institution = await prisma.institution.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InstitutionUpdateArgs>(args: SelectSubset<T, InstitutionUpdateArgs<ExtArgs>>): Prisma__InstitutionClient<$Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Institutions.
     * @param {InstitutionDeleteManyArgs} args - Arguments to filter Institutions to delete.
     * @example
     * // Delete a few Institutions
     * const { count } = await prisma.institution.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InstitutionDeleteManyArgs>(args?: SelectSubset<T, InstitutionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Institutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstitutionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Institutions
     * const institution = await prisma.institution.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InstitutionUpdateManyArgs>(args: SelectSubset<T, InstitutionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Institution.
     * @param {InstitutionUpsertArgs} args - Arguments to update or create a Institution.
     * @example
     * // Update or create a Institution
     * const institution = await prisma.institution.upsert({
     *   create: {
     *     // ... data to create a Institution
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Institution we want to update
     *   }
     * })
     */
    upsert<T extends InstitutionUpsertArgs>(args: SelectSubset<T, InstitutionUpsertArgs<ExtArgs>>): Prisma__InstitutionClient<$Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Institutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstitutionCountArgs} args - Arguments to filter Institutions to count.
     * @example
     * // Count the number of Institutions
     * const count = await prisma.institution.count({
     *   where: {
     *     // ... the filter for the Institutions we want to count
     *   }
     * })
    **/
    count<T extends InstitutionCountArgs>(
      args?: Subset<T, InstitutionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstitutionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Institution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstitutionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InstitutionAggregateArgs>(args: Subset<T, InstitutionAggregateArgs>): Prisma.PrismaPromise<GetInstitutionAggregateType<T>>

    /**
     * Group by Institution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstitutionGroupByArgs} args - Group by arguments.
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
      T extends InstitutionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstitutionGroupByArgs['orderBy'] }
        : { orderBy?: InstitutionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InstitutionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstitutionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Institution model
   */
  readonly fields: InstitutionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Institution.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InstitutionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    credentials<T extends Institution$credentialsArgs<ExtArgs> = {}>(args?: Subset<T, Institution$credentialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findMany"> | Null>
    enrollments<T extends Institution$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, Institution$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Institution model
   */ 
  interface InstitutionFieldRefs {
    readonly id: FieldRef<"Institution", 'String'>
    readonly orgId: FieldRef<"Institution", 'String'>
    readonly name: FieldRef<"Institution", 'String'>
    readonly createdAt: FieldRef<"Institution", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Institution findUnique
   */
  export type InstitutionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Institution
     */
    select?: InstitutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstitutionInclude<ExtArgs> | null
    /**
     * Filter, which Institution to fetch.
     */
    where: InstitutionWhereUniqueInput
  }

  /**
   * Institution findUniqueOrThrow
   */
  export type InstitutionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Institution
     */
    select?: InstitutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstitutionInclude<ExtArgs> | null
    /**
     * Filter, which Institution to fetch.
     */
    where: InstitutionWhereUniqueInput
  }

  /**
   * Institution findFirst
   */
  export type InstitutionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Institution
     */
    select?: InstitutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstitutionInclude<ExtArgs> | null
    /**
     * Filter, which Institution to fetch.
     */
    where?: InstitutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Institutions to fetch.
     */
    orderBy?: InstitutionOrderByWithRelationInput | InstitutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Institutions.
     */
    cursor?: InstitutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Institutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Institutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Institutions.
     */
    distinct?: InstitutionScalarFieldEnum | InstitutionScalarFieldEnum[]
  }

  /**
   * Institution findFirstOrThrow
   */
  export type InstitutionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Institution
     */
    select?: InstitutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstitutionInclude<ExtArgs> | null
    /**
     * Filter, which Institution to fetch.
     */
    where?: InstitutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Institutions to fetch.
     */
    orderBy?: InstitutionOrderByWithRelationInput | InstitutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Institutions.
     */
    cursor?: InstitutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Institutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Institutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Institutions.
     */
    distinct?: InstitutionScalarFieldEnum | InstitutionScalarFieldEnum[]
  }

  /**
   * Institution findMany
   */
  export type InstitutionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Institution
     */
    select?: InstitutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstitutionInclude<ExtArgs> | null
    /**
     * Filter, which Institutions to fetch.
     */
    where?: InstitutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Institutions to fetch.
     */
    orderBy?: InstitutionOrderByWithRelationInput | InstitutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Institutions.
     */
    cursor?: InstitutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Institutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Institutions.
     */
    skip?: number
    distinct?: InstitutionScalarFieldEnum | InstitutionScalarFieldEnum[]
  }

  /**
   * Institution create
   */
  export type InstitutionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Institution
     */
    select?: InstitutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstitutionInclude<ExtArgs> | null
    /**
     * The data needed to create a Institution.
     */
    data: XOR<InstitutionCreateInput, InstitutionUncheckedCreateInput>
  }

  /**
   * Institution createMany
   */
  export type InstitutionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Institutions.
     */
    data: InstitutionCreateManyInput | InstitutionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Institution createManyAndReturn
   */
  export type InstitutionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Institution
     */
    select?: InstitutionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Institutions.
     */
    data: InstitutionCreateManyInput | InstitutionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Institution update
   */
  export type InstitutionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Institution
     */
    select?: InstitutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstitutionInclude<ExtArgs> | null
    /**
     * The data needed to update a Institution.
     */
    data: XOR<InstitutionUpdateInput, InstitutionUncheckedUpdateInput>
    /**
     * Choose, which Institution to update.
     */
    where: InstitutionWhereUniqueInput
  }

  /**
   * Institution updateMany
   */
  export type InstitutionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Institutions.
     */
    data: XOR<InstitutionUpdateManyMutationInput, InstitutionUncheckedUpdateManyInput>
    /**
     * Filter which Institutions to update
     */
    where?: InstitutionWhereInput
  }

  /**
   * Institution upsert
   */
  export type InstitutionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Institution
     */
    select?: InstitutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstitutionInclude<ExtArgs> | null
    /**
     * The filter to search for the Institution to update in case it exists.
     */
    where: InstitutionWhereUniqueInput
    /**
     * In case the Institution found by the `where` argument doesn't exist, create a new Institution with this data.
     */
    create: XOR<InstitutionCreateInput, InstitutionUncheckedCreateInput>
    /**
     * In case the Institution was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InstitutionUpdateInput, InstitutionUncheckedUpdateInput>
  }

  /**
   * Institution delete
   */
  export type InstitutionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Institution
     */
    select?: InstitutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstitutionInclude<ExtArgs> | null
    /**
     * Filter which Institution to delete.
     */
    where: InstitutionWhereUniqueInput
  }

  /**
   * Institution deleteMany
   */
  export type InstitutionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Institutions to delete
     */
    where?: InstitutionWhereInput
  }

  /**
   * Institution.credentials
   */
  export type Institution$credentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    where?: CredentialWhereInput
    orderBy?: CredentialOrderByWithRelationInput | CredentialOrderByWithRelationInput[]
    cursor?: CredentialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CredentialScalarFieldEnum | CredentialScalarFieldEnum[]
  }

  /**
   * Institution.enrollments
   */
  export type Institution$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Institution without action
   */
  export type InstitutionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Institution
     */
    select?: InstitutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstitutionInclude<ExtArgs> | null
  }


  /**
   * Model Learner
   */

  export type AggregateLearner = {
    _count: LearnerCountAggregateOutputType | null
    _min: LearnerMinAggregateOutputType | null
    _max: LearnerMaxAggregateOutputType | null
  }

  export type LearnerMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    subjectHash: string | null
    createdAt: Date | null
  }

  export type LearnerMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    subjectHash: string | null
    createdAt: Date | null
  }

  export type LearnerCountAggregateOutputType = {
    id: number
    orgId: number
    subjectHash: number
    createdAt: number
    _all: number
  }


  export type LearnerMinAggregateInputType = {
    id?: true
    orgId?: true
    subjectHash?: true
    createdAt?: true
  }

  export type LearnerMaxAggregateInputType = {
    id?: true
    orgId?: true
    subjectHash?: true
    createdAt?: true
  }

  export type LearnerCountAggregateInputType = {
    id?: true
    orgId?: true
    subjectHash?: true
    createdAt?: true
    _all?: true
  }

  export type LearnerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Learner to aggregate.
     */
    where?: LearnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Learners to fetch.
     */
    orderBy?: LearnerOrderByWithRelationInput | LearnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LearnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Learners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Learners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Learners
    **/
    _count?: true | LearnerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LearnerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LearnerMaxAggregateInputType
  }

  export type GetLearnerAggregateType<T extends LearnerAggregateArgs> = {
        [P in keyof T & keyof AggregateLearner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLearner[P]>
      : GetScalarType<T[P], AggregateLearner[P]>
  }




  export type LearnerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearnerWhereInput
    orderBy?: LearnerOrderByWithAggregationInput | LearnerOrderByWithAggregationInput[]
    by: LearnerScalarFieldEnum[] | LearnerScalarFieldEnum
    having?: LearnerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LearnerCountAggregateInputType | true
    _min?: LearnerMinAggregateInputType
    _max?: LearnerMaxAggregateInputType
  }

  export type LearnerGroupByOutputType = {
    id: string
    orgId: string
    subjectHash: string
    createdAt: Date
    _count: LearnerCountAggregateOutputType | null
    _min: LearnerMinAggregateOutputType | null
    _max: LearnerMaxAggregateOutputType | null
  }

  type GetLearnerGroupByPayload<T extends LearnerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LearnerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LearnerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LearnerGroupByOutputType[P]>
            : GetScalarType<T[P], LearnerGroupByOutputType[P]>
        }
      >
    >


  export type LearnerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    subjectHash?: boolean
    createdAt?: boolean
    credentials?: boolean | Learner$credentialsArgs<ExtArgs>
    enrollments?: boolean | Learner$enrollmentsArgs<ExtArgs>
    _count?: boolean | LearnerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learner"]>

  export type LearnerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    subjectHash?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["learner"]>

  export type LearnerSelectScalar = {
    id?: boolean
    orgId?: boolean
    subjectHash?: boolean
    createdAt?: boolean
  }

  export type LearnerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    credentials?: boolean | Learner$credentialsArgs<ExtArgs>
    enrollments?: boolean | Learner$enrollmentsArgs<ExtArgs>
    _count?: boolean | LearnerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LearnerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LearnerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Learner"
    objects: {
      credentials: Prisma.$CredentialPayload<ExtArgs>[]
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      subjectHash: string
      createdAt: Date
    }, ExtArgs["result"]["learner"]>
    composites: {}
  }

  type LearnerGetPayload<S extends boolean | null | undefined | LearnerDefaultArgs> = $Result.GetResult<Prisma.$LearnerPayload, S>

  type LearnerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LearnerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LearnerCountAggregateInputType | true
    }

  export interface LearnerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Learner'], meta: { name: 'Learner' } }
    /**
     * Find zero or one Learner that matches the filter.
     * @param {LearnerFindUniqueArgs} args - Arguments to find a Learner
     * @example
     * // Get one Learner
     * const learner = await prisma.learner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LearnerFindUniqueArgs>(args: SelectSubset<T, LearnerFindUniqueArgs<ExtArgs>>): Prisma__LearnerClient<$Result.GetResult<Prisma.$LearnerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Learner that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LearnerFindUniqueOrThrowArgs} args - Arguments to find a Learner
     * @example
     * // Get one Learner
     * const learner = await prisma.learner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LearnerFindUniqueOrThrowArgs>(args: SelectSubset<T, LearnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LearnerClient<$Result.GetResult<Prisma.$LearnerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Learner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearnerFindFirstArgs} args - Arguments to find a Learner
     * @example
     * // Get one Learner
     * const learner = await prisma.learner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LearnerFindFirstArgs>(args?: SelectSubset<T, LearnerFindFirstArgs<ExtArgs>>): Prisma__LearnerClient<$Result.GetResult<Prisma.$LearnerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Learner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearnerFindFirstOrThrowArgs} args - Arguments to find a Learner
     * @example
     * // Get one Learner
     * const learner = await prisma.learner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LearnerFindFirstOrThrowArgs>(args?: SelectSubset<T, LearnerFindFirstOrThrowArgs<ExtArgs>>): Prisma__LearnerClient<$Result.GetResult<Prisma.$LearnerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Learners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearnerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Learners
     * const learners = await prisma.learner.findMany()
     * 
     * // Get first 10 Learners
     * const learners = await prisma.learner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const learnerWithIdOnly = await prisma.learner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LearnerFindManyArgs>(args?: SelectSubset<T, LearnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearnerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Learner.
     * @param {LearnerCreateArgs} args - Arguments to create a Learner.
     * @example
     * // Create one Learner
     * const Learner = await prisma.learner.create({
     *   data: {
     *     // ... data to create a Learner
     *   }
     * })
     * 
     */
    create<T extends LearnerCreateArgs>(args: SelectSubset<T, LearnerCreateArgs<ExtArgs>>): Prisma__LearnerClient<$Result.GetResult<Prisma.$LearnerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Learners.
     * @param {LearnerCreateManyArgs} args - Arguments to create many Learners.
     * @example
     * // Create many Learners
     * const learner = await prisma.learner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LearnerCreateManyArgs>(args?: SelectSubset<T, LearnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Learners and returns the data saved in the database.
     * @param {LearnerCreateManyAndReturnArgs} args - Arguments to create many Learners.
     * @example
     * // Create many Learners
     * const learner = await prisma.learner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Learners and only return the `id`
     * const learnerWithIdOnly = await prisma.learner.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LearnerCreateManyAndReturnArgs>(args?: SelectSubset<T, LearnerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearnerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Learner.
     * @param {LearnerDeleteArgs} args - Arguments to delete one Learner.
     * @example
     * // Delete one Learner
     * const Learner = await prisma.learner.delete({
     *   where: {
     *     // ... filter to delete one Learner
     *   }
     * })
     * 
     */
    delete<T extends LearnerDeleteArgs>(args: SelectSubset<T, LearnerDeleteArgs<ExtArgs>>): Prisma__LearnerClient<$Result.GetResult<Prisma.$LearnerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Learner.
     * @param {LearnerUpdateArgs} args - Arguments to update one Learner.
     * @example
     * // Update one Learner
     * const learner = await prisma.learner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LearnerUpdateArgs>(args: SelectSubset<T, LearnerUpdateArgs<ExtArgs>>): Prisma__LearnerClient<$Result.GetResult<Prisma.$LearnerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Learners.
     * @param {LearnerDeleteManyArgs} args - Arguments to filter Learners to delete.
     * @example
     * // Delete a few Learners
     * const { count } = await prisma.learner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LearnerDeleteManyArgs>(args?: SelectSubset<T, LearnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Learners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearnerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Learners
     * const learner = await prisma.learner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LearnerUpdateManyArgs>(args: SelectSubset<T, LearnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Learner.
     * @param {LearnerUpsertArgs} args - Arguments to update or create a Learner.
     * @example
     * // Update or create a Learner
     * const learner = await prisma.learner.upsert({
     *   create: {
     *     // ... data to create a Learner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Learner we want to update
     *   }
     * })
     */
    upsert<T extends LearnerUpsertArgs>(args: SelectSubset<T, LearnerUpsertArgs<ExtArgs>>): Prisma__LearnerClient<$Result.GetResult<Prisma.$LearnerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Learners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearnerCountArgs} args - Arguments to filter Learners to count.
     * @example
     * // Count the number of Learners
     * const count = await prisma.learner.count({
     *   where: {
     *     // ... the filter for the Learners we want to count
     *   }
     * })
    **/
    count<T extends LearnerCountArgs>(
      args?: Subset<T, LearnerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LearnerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Learner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearnerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LearnerAggregateArgs>(args: Subset<T, LearnerAggregateArgs>): Prisma.PrismaPromise<GetLearnerAggregateType<T>>

    /**
     * Group by Learner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearnerGroupByArgs} args - Group by arguments.
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
      T extends LearnerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LearnerGroupByArgs['orderBy'] }
        : { orderBy?: LearnerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LearnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLearnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Learner model
   */
  readonly fields: LearnerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Learner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LearnerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    credentials<T extends Learner$credentialsArgs<ExtArgs> = {}>(args?: Subset<T, Learner$credentialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findMany"> | Null>
    enrollments<T extends Learner$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, Learner$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Learner model
   */ 
  interface LearnerFieldRefs {
    readonly id: FieldRef<"Learner", 'String'>
    readonly orgId: FieldRef<"Learner", 'String'>
    readonly subjectHash: FieldRef<"Learner", 'String'>
    readonly createdAt: FieldRef<"Learner", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Learner findUnique
   */
  export type LearnerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Learner
     */
    select?: LearnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearnerInclude<ExtArgs> | null
    /**
     * Filter, which Learner to fetch.
     */
    where: LearnerWhereUniqueInput
  }

  /**
   * Learner findUniqueOrThrow
   */
  export type LearnerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Learner
     */
    select?: LearnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearnerInclude<ExtArgs> | null
    /**
     * Filter, which Learner to fetch.
     */
    where: LearnerWhereUniqueInput
  }

  /**
   * Learner findFirst
   */
  export type LearnerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Learner
     */
    select?: LearnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearnerInclude<ExtArgs> | null
    /**
     * Filter, which Learner to fetch.
     */
    where?: LearnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Learners to fetch.
     */
    orderBy?: LearnerOrderByWithRelationInput | LearnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Learners.
     */
    cursor?: LearnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Learners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Learners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Learners.
     */
    distinct?: LearnerScalarFieldEnum | LearnerScalarFieldEnum[]
  }

  /**
   * Learner findFirstOrThrow
   */
  export type LearnerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Learner
     */
    select?: LearnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearnerInclude<ExtArgs> | null
    /**
     * Filter, which Learner to fetch.
     */
    where?: LearnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Learners to fetch.
     */
    orderBy?: LearnerOrderByWithRelationInput | LearnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Learners.
     */
    cursor?: LearnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Learners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Learners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Learners.
     */
    distinct?: LearnerScalarFieldEnum | LearnerScalarFieldEnum[]
  }

  /**
   * Learner findMany
   */
  export type LearnerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Learner
     */
    select?: LearnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearnerInclude<ExtArgs> | null
    /**
     * Filter, which Learners to fetch.
     */
    where?: LearnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Learners to fetch.
     */
    orderBy?: LearnerOrderByWithRelationInput | LearnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Learners.
     */
    cursor?: LearnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Learners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Learners.
     */
    skip?: number
    distinct?: LearnerScalarFieldEnum | LearnerScalarFieldEnum[]
  }

  /**
   * Learner create
   */
  export type LearnerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Learner
     */
    select?: LearnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearnerInclude<ExtArgs> | null
    /**
     * The data needed to create a Learner.
     */
    data: XOR<LearnerCreateInput, LearnerUncheckedCreateInput>
  }

  /**
   * Learner createMany
   */
  export type LearnerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Learners.
     */
    data: LearnerCreateManyInput | LearnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Learner createManyAndReturn
   */
  export type LearnerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Learner
     */
    select?: LearnerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Learners.
     */
    data: LearnerCreateManyInput | LearnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Learner update
   */
  export type LearnerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Learner
     */
    select?: LearnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearnerInclude<ExtArgs> | null
    /**
     * The data needed to update a Learner.
     */
    data: XOR<LearnerUpdateInput, LearnerUncheckedUpdateInput>
    /**
     * Choose, which Learner to update.
     */
    where: LearnerWhereUniqueInput
  }

  /**
   * Learner updateMany
   */
  export type LearnerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Learners.
     */
    data: XOR<LearnerUpdateManyMutationInput, LearnerUncheckedUpdateManyInput>
    /**
     * Filter which Learners to update
     */
    where?: LearnerWhereInput
  }

  /**
   * Learner upsert
   */
  export type LearnerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Learner
     */
    select?: LearnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearnerInclude<ExtArgs> | null
    /**
     * The filter to search for the Learner to update in case it exists.
     */
    where: LearnerWhereUniqueInput
    /**
     * In case the Learner found by the `where` argument doesn't exist, create a new Learner with this data.
     */
    create: XOR<LearnerCreateInput, LearnerUncheckedCreateInput>
    /**
     * In case the Learner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LearnerUpdateInput, LearnerUncheckedUpdateInput>
  }

  /**
   * Learner delete
   */
  export type LearnerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Learner
     */
    select?: LearnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearnerInclude<ExtArgs> | null
    /**
     * Filter which Learner to delete.
     */
    where: LearnerWhereUniqueInput
  }

  /**
   * Learner deleteMany
   */
  export type LearnerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Learners to delete
     */
    where?: LearnerWhereInput
  }

  /**
   * Learner.credentials
   */
  export type Learner$credentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    where?: CredentialWhereInput
    orderBy?: CredentialOrderByWithRelationInput | CredentialOrderByWithRelationInput[]
    cursor?: CredentialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CredentialScalarFieldEnum | CredentialScalarFieldEnum[]
  }

  /**
   * Learner.enrollments
   */
  export type Learner$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Learner without action
   */
  export type LearnerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Learner
     */
    select?: LearnerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearnerInclude<ExtArgs> | null
  }


  /**
   * Model Credential
   */

  export type AggregateCredential = {
    _count: CredentialCountAggregateOutputType | null
    _min: CredentialMinAggregateOutputType | null
    _max: CredentialMaxAggregateOutputType | null
  }

  export type CredentialMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    institutionId: string | null
    learnerId: string | null
    type: $Enums.CredentialType | null
    dataHash: string | null
    attestationId: string | null
    status: $Enums.CredentialStatus | null
    issuedAt: Date | null
    expiresAt: Date | null
  }

  export type CredentialMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    institutionId: string | null
    learnerId: string | null
    type: $Enums.CredentialType | null
    dataHash: string | null
    attestationId: string | null
    status: $Enums.CredentialStatus | null
    issuedAt: Date | null
    expiresAt: Date | null
  }

  export type CredentialCountAggregateOutputType = {
    id: number
    orgId: number
    institutionId: number
    learnerId: number
    type: number
    dataHash: number
    attestationId: number
    status: number
    issuedAt: number
    expiresAt: number
    _all: number
  }


  export type CredentialMinAggregateInputType = {
    id?: true
    orgId?: true
    institutionId?: true
    learnerId?: true
    type?: true
    dataHash?: true
    attestationId?: true
    status?: true
    issuedAt?: true
    expiresAt?: true
  }

  export type CredentialMaxAggregateInputType = {
    id?: true
    orgId?: true
    institutionId?: true
    learnerId?: true
    type?: true
    dataHash?: true
    attestationId?: true
    status?: true
    issuedAt?: true
    expiresAt?: true
  }

  export type CredentialCountAggregateInputType = {
    id?: true
    orgId?: true
    institutionId?: true
    learnerId?: true
    type?: true
    dataHash?: true
    attestationId?: true
    status?: true
    issuedAt?: true
    expiresAt?: true
    _all?: true
  }

  export type CredentialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Credential to aggregate.
     */
    where?: CredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Credentials to fetch.
     */
    orderBy?: CredentialOrderByWithRelationInput | CredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Credentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Credentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Credentials
    **/
    _count?: true | CredentialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CredentialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CredentialMaxAggregateInputType
  }

  export type GetCredentialAggregateType<T extends CredentialAggregateArgs> = {
        [P in keyof T & keyof AggregateCredential]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCredential[P]>
      : GetScalarType<T[P], AggregateCredential[P]>
  }




  export type CredentialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CredentialWhereInput
    orderBy?: CredentialOrderByWithAggregationInput | CredentialOrderByWithAggregationInput[]
    by: CredentialScalarFieldEnum[] | CredentialScalarFieldEnum
    having?: CredentialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CredentialCountAggregateInputType | true
    _min?: CredentialMinAggregateInputType
    _max?: CredentialMaxAggregateInputType
  }

  export type CredentialGroupByOutputType = {
    id: string
    orgId: string
    institutionId: string
    learnerId: string
    type: $Enums.CredentialType
    dataHash: string
    attestationId: string | null
    status: $Enums.CredentialStatus
    issuedAt: Date
    expiresAt: Date | null
    _count: CredentialCountAggregateOutputType | null
    _min: CredentialMinAggregateOutputType | null
    _max: CredentialMaxAggregateOutputType | null
  }

  type GetCredentialGroupByPayload<T extends CredentialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CredentialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CredentialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CredentialGroupByOutputType[P]>
            : GetScalarType<T[P], CredentialGroupByOutputType[P]>
        }
      >
    >


  export type CredentialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    institutionId?: boolean
    learnerId?: boolean
    type?: boolean
    dataHash?: boolean
    attestationId?: boolean
    status?: boolean
    issuedAt?: boolean
    expiresAt?: boolean
    institution?: boolean | InstitutionDefaultArgs<ExtArgs>
    learner?: boolean | LearnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credential"]>

  export type CredentialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    institutionId?: boolean
    learnerId?: boolean
    type?: boolean
    dataHash?: boolean
    attestationId?: boolean
    status?: boolean
    issuedAt?: boolean
    expiresAt?: boolean
    institution?: boolean | InstitutionDefaultArgs<ExtArgs>
    learner?: boolean | LearnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credential"]>

  export type CredentialSelectScalar = {
    id?: boolean
    orgId?: boolean
    institutionId?: boolean
    learnerId?: boolean
    type?: boolean
    dataHash?: boolean
    attestationId?: boolean
    status?: boolean
    issuedAt?: boolean
    expiresAt?: boolean
  }

  export type CredentialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    institution?: boolean | InstitutionDefaultArgs<ExtArgs>
    learner?: boolean | LearnerDefaultArgs<ExtArgs>
  }
  export type CredentialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    institution?: boolean | InstitutionDefaultArgs<ExtArgs>
    learner?: boolean | LearnerDefaultArgs<ExtArgs>
  }

  export type $CredentialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Credential"
    objects: {
      institution: Prisma.$InstitutionPayload<ExtArgs>
      learner: Prisma.$LearnerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      institutionId: string
      learnerId: string
      type: $Enums.CredentialType
      dataHash: string
      attestationId: string | null
      status: $Enums.CredentialStatus
      issuedAt: Date
      expiresAt: Date | null
    }, ExtArgs["result"]["credential"]>
    composites: {}
  }

  type CredentialGetPayload<S extends boolean | null | undefined | CredentialDefaultArgs> = $Result.GetResult<Prisma.$CredentialPayload, S>

  type CredentialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CredentialFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CredentialCountAggregateInputType | true
    }

  export interface CredentialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Credential'], meta: { name: 'Credential' } }
    /**
     * Find zero or one Credential that matches the filter.
     * @param {CredentialFindUniqueArgs} args - Arguments to find a Credential
     * @example
     * // Get one Credential
     * const credential = await prisma.credential.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CredentialFindUniqueArgs>(args: SelectSubset<T, CredentialFindUniqueArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Credential that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CredentialFindUniqueOrThrowArgs} args - Arguments to find a Credential
     * @example
     * // Get one Credential
     * const credential = await prisma.credential.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CredentialFindUniqueOrThrowArgs>(args: SelectSubset<T, CredentialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Credential that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialFindFirstArgs} args - Arguments to find a Credential
     * @example
     * // Get one Credential
     * const credential = await prisma.credential.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CredentialFindFirstArgs>(args?: SelectSubset<T, CredentialFindFirstArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Credential that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialFindFirstOrThrowArgs} args - Arguments to find a Credential
     * @example
     * // Get one Credential
     * const credential = await prisma.credential.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CredentialFindFirstOrThrowArgs>(args?: SelectSubset<T, CredentialFindFirstOrThrowArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Credentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Credentials
     * const credentials = await prisma.credential.findMany()
     * 
     * // Get first 10 Credentials
     * const credentials = await prisma.credential.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const credentialWithIdOnly = await prisma.credential.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CredentialFindManyArgs>(args?: SelectSubset<T, CredentialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Credential.
     * @param {CredentialCreateArgs} args - Arguments to create a Credential.
     * @example
     * // Create one Credential
     * const Credential = await prisma.credential.create({
     *   data: {
     *     // ... data to create a Credential
     *   }
     * })
     * 
     */
    create<T extends CredentialCreateArgs>(args: SelectSubset<T, CredentialCreateArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Credentials.
     * @param {CredentialCreateManyArgs} args - Arguments to create many Credentials.
     * @example
     * // Create many Credentials
     * const credential = await prisma.credential.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CredentialCreateManyArgs>(args?: SelectSubset<T, CredentialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Credentials and returns the data saved in the database.
     * @param {CredentialCreateManyAndReturnArgs} args - Arguments to create many Credentials.
     * @example
     * // Create many Credentials
     * const credential = await prisma.credential.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Credentials and only return the `id`
     * const credentialWithIdOnly = await prisma.credential.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CredentialCreateManyAndReturnArgs>(args?: SelectSubset<T, CredentialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Credential.
     * @param {CredentialDeleteArgs} args - Arguments to delete one Credential.
     * @example
     * // Delete one Credential
     * const Credential = await prisma.credential.delete({
     *   where: {
     *     // ... filter to delete one Credential
     *   }
     * })
     * 
     */
    delete<T extends CredentialDeleteArgs>(args: SelectSubset<T, CredentialDeleteArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Credential.
     * @param {CredentialUpdateArgs} args - Arguments to update one Credential.
     * @example
     * // Update one Credential
     * const credential = await prisma.credential.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CredentialUpdateArgs>(args: SelectSubset<T, CredentialUpdateArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Credentials.
     * @param {CredentialDeleteManyArgs} args - Arguments to filter Credentials to delete.
     * @example
     * // Delete a few Credentials
     * const { count } = await prisma.credential.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CredentialDeleteManyArgs>(args?: SelectSubset<T, CredentialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Credentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Credentials
     * const credential = await prisma.credential.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CredentialUpdateManyArgs>(args: SelectSubset<T, CredentialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Credential.
     * @param {CredentialUpsertArgs} args - Arguments to update or create a Credential.
     * @example
     * // Update or create a Credential
     * const credential = await prisma.credential.upsert({
     *   create: {
     *     // ... data to create a Credential
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Credential we want to update
     *   }
     * })
     */
    upsert<T extends CredentialUpsertArgs>(args: SelectSubset<T, CredentialUpsertArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Credentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialCountArgs} args - Arguments to filter Credentials to count.
     * @example
     * // Count the number of Credentials
     * const count = await prisma.credential.count({
     *   where: {
     *     // ... the filter for the Credentials we want to count
     *   }
     * })
    **/
    count<T extends CredentialCountArgs>(
      args?: Subset<T, CredentialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CredentialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Credential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CredentialAggregateArgs>(args: Subset<T, CredentialAggregateArgs>): Prisma.PrismaPromise<GetCredentialAggregateType<T>>

    /**
     * Group by Credential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialGroupByArgs} args - Group by arguments.
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
      T extends CredentialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CredentialGroupByArgs['orderBy'] }
        : { orderBy?: CredentialGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CredentialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCredentialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Credential model
   */
  readonly fields: CredentialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Credential.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CredentialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    institution<T extends InstitutionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstitutionDefaultArgs<ExtArgs>>): Prisma__InstitutionClient<$Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    learner<T extends LearnerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LearnerDefaultArgs<ExtArgs>>): Prisma__LearnerClient<$Result.GetResult<Prisma.$LearnerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Credential model
   */ 
  interface CredentialFieldRefs {
    readonly id: FieldRef<"Credential", 'String'>
    readonly orgId: FieldRef<"Credential", 'String'>
    readonly institutionId: FieldRef<"Credential", 'String'>
    readonly learnerId: FieldRef<"Credential", 'String'>
    readonly type: FieldRef<"Credential", 'CredentialType'>
    readonly dataHash: FieldRef<"Credential", 'String'>
    readonly attestationId: FieldRef<"Credential", 'String'>
    readonly status: FieldRef<"Credential", 'CredentialStatus'>
    readonly issuedAt: FieldRef<"Credential", 'DateTime'>
    readonly expiresAt: FieldRef<"Credential", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Credential findUnique
   */
  export type CredentialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * Filter, which Credential to fetch.
     */
    where: CredentialWhereUniqueInput
  }

  /**
   * Credential findUniqueOrThrow
   */
  export type CredentialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * Filter, which Credential to fetch.
     */
    where: CredentialWhereUniqueInput
  }

  /**
   * Credential findFirst
   */
  export type CredentialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * Filter, which Credential to fetch.
     */
    where?: CredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Credentials to fetch.
     */
    orderBy?: CredentialOrderByWithRelationInput | CredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Credentials.
     */
    cursor?: CredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Credentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Credentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Credentials.
     */
    distinct?: CredentialScalarFieldEnum | CredentialScalarFieldEnum[]
  }

  /**
   * Credential findFirstOrThrow
   */
  export type CredentialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * Filter, which Credential to fetch.
     */
    where?: CredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Credentials to fetch.
     */
    orderBy?: CredentialOrderByWithRelationInput | CredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Credentials.
     */
    cursor?: CredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Credentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Credentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Credentials.
     */
    distinct?: CredentialScalarFieldEnum | CredentialScalarFieldEnum[]
  }

  /**
   * Credential findMany
   */
  export type CredentialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * Filter, which Credentials to fetch.
     */
    where?: CredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Credentials to fetch.
     */
    orderBy?: CredentialOrderByWithRelationInput | CredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Credentials.
     */
    cursor?: CredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Credentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Credentials.
     */
    skip?: number
    distinct?: CredentialScalarFieldEnum | CredentialScalarFieldEnum[]
  }

  /**
   * Credential create
   */
  export type CredentialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * The data needed to create a Credential.
     */
    data: XOR<CredentialCreateInput, CredentialUncheckedCreateInput>
  }

  /**
   * Credential createMany
   */
  export type CredentialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Credentials.
     */
    data: CredentialCreateManyInput | CredentialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Credential createManyAndReturn
   */
  export type CredentialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Credentials.
     */
    data: CredentialCreateManyInput | CredentialCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Credential update
   */
  export type CredentialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * The data needed to update a Credential.
     */
    data: XOR<CredentialUpdateInput, CredentialUncheckedUpdateInput>
    /**
     * Choose, which Credential to update.
     */
    where: CredentialWhereUniqueInput
  }

  /**
   * Credential updateMany
   */
  export type CredentialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Credentials.
     */
    data: XOR<CredentialUpdateManyMutationInput, CredentialUncheckedUpdateManyInput>
    /**
     * Filter which Credentials to update
     */
    where?: CredentialWhereInput
  }

  /**
   * Credential upsert
   */
  export type CredentialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * The filter to search for the Credential to update in case it exists.
     */
    where: CredentialWhereUniqueInput
    /**
     * In case the Credential found by the `where` argument doesn't exist, create a new Credential with this data.
     */
    create: XOR<CredentialCreateInput, CredentialUncheckedCreateInput>
    /**
     * In case the Credential was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CredentialUpdateInput, CredentialUncheckedUpdateInput>
  }

  /**
   * Credential delete
   */
  export type CredentialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * Filter which Credential to delete.
     */
    where: CredentialWhereUniqueInput
  }

  /**
   * Credential deleteMany
   */
  export type CredentialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Credentials to delete
     */
    where?: CredentialWhereInput
  }

  /**
   * Credential without action
   */
  export type CredentialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
  }


  /**
   * Model Enrollment
   */

  export type AggregateEnrollment = {
    _count: EnrollmentCountAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  export type EnrollmentMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    institutionId: string | null
    learnerId: string | null
    program: string | null
    createdAt: Date | null
  }

  export type EnrollmentMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    institutionId: string | null
    learnerId: string | null
    program: string | null
    createdAt: Date | null
  }

  export type EnrollmentCountAggregateOutputType = {
    id: number
    orgId: number
    institutionId: number
    learnerId: number
    program: number
    createdAt: number
    _all: number
  }


  export type EnrollmentMinAggregateInputType = {
    id?: true
    orgId?: true
    institutionId?: true
    learnerId?: true
    program?: true
    createdAt?: true
  }

  export type EnrollmentMaxAggregateInputType = {
    id?: true
    orgId?: true
    institutionId?: true
    learnerId?: true
    program?: true
    createdAt?: true
  }

  export type EnrollmentCountAggregateInputType = {
    id?: true
    orgId?: true
    institutionId?: true
    learnerId?: true
    program?: true
    createdAt?: true
    _all?: true
  }

  export type EnrollmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollment to aggregate.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Enrollments
    **/
    _count?: true | EnrollmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnrollmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnrollmentMaxAggregateInputType
  }

  export type GetEnrollmentAggregateType<T extends EnrollmentAggregateArgs> = {
        [P in keyof T & keyof AggregateEnrollment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnrollment[P]>
      : GetScalarType<T[P], AggregateEnrollment[P]>
  }




  export type EnrollmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithAggregationInput | EnrollmentOrderByWithAggregationInput[]
    by: EnrollmentScalarFieldEnum[] | EnrollmentScalarFieldEnum
    having?: EnrollmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnrollmentCountAggregateInputType | true
    _min?: EnrollmentMinAggregateInputType
    _max?: EnrollmentMaxAggregateInputType
  }

  export type EnrollmentGroupByOutputType = {
    id: string
    orgId: string
    institutionId: string
    learnerId: string
    program: string
    createdAt: Date
    _count: EnrollmentCountAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  type GetEnrollmentGroupByPayload<T extends EnrollmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnrollmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnrollmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
            : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
        }
      >
    >


  export type EnrollmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    institutionId?: boolean
    learnerId?: boolean
    program?: boolean
    createdAt?: boolean
    institution?: boolean | InstitutionDefaultArgs<ExtArgs>
    learner?: boolean | LearnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    institutionId?: boolean
    learnerId?: boolean
    program?: boolean
    createdAt?: boolean
    institution?: boolean | InstitutionDefaultArgs<ExtArgs>
    learner?: boolean | LearnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectScalar = {
    id?: boolean
    orgId?: boolean
    institutionId?: boolean
    learnerId?: boolean
    program?: boolean
    createdAt?: boolean
  }

  export type EnrollmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    institution?: boolean | InstitutionDefaultArgs<ExtArgs>
    learner?: boolean | LearnerDefaultArgs<ExtArgs>
  }
  export type EnrollmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    institution?: boolean | InstitutionDefaultArgs<ExtArgs>
    learner?: boolean | LearnerDefaultArgs<ExtArgs>
  }

  export type $EnrollmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Enrollment"
    objects: {
      institution: Prisma.$InstitutionPayload<ExtArgs>
      learner: Prisma.$LearnerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      institutionId: string
      learnerId: string
      program: string
      createdAt: Date
    }, ExtArgs["result"]["enrollment"]>
    composites: {}
  }

  type EnrollmentGetPayload<S extends boolean | null | undefined | EnrollmentDefaultArgs> = $Result.GetResult<Prisma.$EnrollmentPayload, S>

  type EnrollmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EnrollmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EnrollmentCountAggregateInputType | true
    }

  export interface EnrollmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Enrollment'], meta: { name: 'Enrollment' } }
    /**
     * Find zero or one Enrollment that matches the filter.
     * @param {EnrollmentFindUniqueArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnrollmentFindUniqueArgs>(args: SelectSubset<T, EnrollmentFindUniqueArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Enrollment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EnrollmentFindUniqueOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnrollmentFindUniqueOrThrowArgs>(args: SelectSubset<T, EnrollmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Enrollment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnrollmentFindFirstArgs>(args?: SelectSubset<T, EnrollmentFindFirstArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Enrollment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnrollmentFindFirstOrThrowArgs>(args?: SelectSubset<T, EnrollmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Enrollments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Enrollments
     * const enrollments = await prisma.enrollment.findMany()
     * 
     * // Get first 10 Enrollments
     * const enrollments = await prisma.enrollment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnrollmentFindManyArgs>(args?: SelectSubset<T, EnrollmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Enrollment.
     * @param {EnrollmentCreateArgs} args - Arguments to create a Enrollment.
     * @example
     * // Create one Enrollment
     * const Enrollment = await prisma.enrollment.create({
     *   data: {
     *     // ... data to create a Enrollment
     *   }
     * })
     * 
     */
    create<T extends EnrollmentCreateArgs>(args: SelectSubset<T, EnrollmentCreateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Enrollments.
     * @param {EnrollmentCreateManyArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnrollmentCreateManyArgs>(args?: SelectSubset<T, EnrollmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Enrollments and returns the data saved in the database.
     * @param {EnrollmentCreateManyAndReturnArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Enrollments and only return the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EnrollmentCreateManyAndReturnArgs>(args?: SelectSubset<T, EnrollmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Enrollment.
     * @param {EnrollmentDeleteArgs} args - Arguments to delete one Enrollment.
     * @example
     * // Delete one Enrollment
     * const Enrollment = await prisma.enrollment.delete({
     *   where: {
     *     // ... filter to delete one Enrollment
     *   }
     * })
     * 
     */
    delete<T extends EnrollmentDeleteArgs>(args: SelectSubset<T, EnrollmentDeleteArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Enrollment.
     * @param {EnrollmentUpdateArgs} args - Arguments to update one Enrollment.
     * @example
     * // Update one Enrollment
     * const enrollment = await prisma.enrollment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnrollmentUpdateArgs>(args: SelectSubset<T, EnrollmentUpdateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Enrollments.
     * @param {EnrollmentDeleteManyArgs} args - Arguments to filter Enrollments to delete.
     * @example
     * // Delete a few Enrollments
     * const { count } = await prisma.enrollment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnrollmentDeleteManyArgs>(args?: SelectSubset<T, EnrollmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Enrollments
     * const enrollment = await prisma.enrollment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnrollmentUpdateManyArgs>(args: SelectSubset<T, EnrollmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Enrollment.
     * @param {EnrollmentUpsertArgs} args - Arguments to update or create a Enrollment.
     * @example
     * // Update or create a Enrollment
     * const enrollment = await prisma.enrollment.upsert({
     *   create: {
     *     // ... data to create a Enrollment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Enrollment we want to update
     *   }
     * })
     */
    upsert<T extends EnrollmentUpsertArgs>(args: SelectSubset<T, EnrollmentUpsertArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentCountArgs} args - Arguments to filter Enrollments to count.
     * @example
     * // Count the number of Enrollments
     * const count = await prisma.enrollment.count({
     *   where: {
     *     // ... the filter for the Enrollments we want to count
     *   }
     * })
    **/
    count<T extends EnrollmentCountArgs>(
      args?: Subset<T, EnrollmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnrollmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EnrollmentAggregateArgs>(args: Subset<T, EnrollmentAggregateArgs>): Prisma.PrismaPromise<GetEnrollmentAggregateType<T>>

    /**
     * Group by Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentGroupByArgs} args - Group by arguments.
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
      T extends EnrollmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnrollmentGroupByArgs['orderBy'] }
        : { orderBy?: EnrollmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EnrollmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnrollmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Enrollment model
   */
  readonly fields: EnrollmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Enrollment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnrollmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    institution<T extends InstitutionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstitutionDefaultArgs<ExtArgs>>): Prisma__InstitutionClient<$Result.GetResult<Prisma.$InstitutionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    learner<T extends LearnerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LearnerDefaultArgs<ExtArgs>>): Prisma__LearnerClient<$Result.GetResult<Prisma.$LearnerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Enrollment model
   */ 
  interface EnrollmentFieldRefs {
    readonly id: FieldRef<"Enrollment", 'String'>
    readonly orgId: FieldRef<"Enrollment", 'String'>
    readonly institutionId: FieldRef<"Enrollment", 'String'>
    readonly learnerId: FieldRef<"Enrollment", 'String'>
    readonly program: FieldRef<"Enrollment", 'String'>
    readonly createdAt: FieldRef<"Enrollment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Enrollment findUnique
   */
  export type EnrollmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findUniqueOrThrow
   */
  export type EnrollmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findFirst
   */
  export type EnrollmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findFirstOrThrow
   */
  export type EnrollmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findMany
   */
  export type EnrollmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollments to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment create
   */
  export type EnrollmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Enrollment.
     */
    data: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
  }

  /**
   * Enrollment createMany
   */
  export type EnrollmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Enrollments.
     */
    data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Enrollment createManyAndReturn
   */
  export type EnrollmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Enrollments.
     */
    data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Enrollment update
   */
  export type EnrollmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Enrollment.
     */
    data: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
    /**
     * Choose, which Enrollment to update.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment updateMany
   */
  export type EnrollmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Enrollments.
     */
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which Enrollments to update
     */
    where?: EnrollmentWhereInput
  }

  /**
   * Enrollment upsert
   */
  export type EnrollmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Enrollment to update in case it exists.
     */
    where: EnrollmentWhereUniqueInput
    /**
     * In case the Enrollment found by the `where` argument doesn't exist, create a new Enrollment with this data.
     */
    create: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
    /**
     * In case the Enrollment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
  }

  /**
   * Enrollment delete
   */
  export type EnrollmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter which Enrollment to delete.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment deleteMany
   */
  export type EnrollmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollments to delete
     */
    where?: EnrollmentWhereInput
  }

  /**
   * Enrollment without action
   */
  export type EnrollmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
  }


  /**
   * Model TuitionInvoice
   */

  export type AggregateTuitionInvoice = {
    _count: TuitionInvoiceCountAggregateOutputType | null
    _avg: TuitionInvoiceAvgAggregateOutputType | null
    _sum: TuitionInvoiceSumAggregateOutputType | null
    _min: TuitionInvoiceMinAggregateOutputType | null
    _max: TuitionInvoiceMaxAggregateOutputType | null
  }

  export type TuitionInvoiceAvgAggregateOutputType = {
    amountMinor: number | null
  }

  export type TuitionInvoiceSumAggregateOutputType = {
    amountMinor: bigint | null
  }

  export type TuitionInvoiceMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    learnerId: string | null
    amountMinor: bigint | null
    currency: string | null
    intentId: string | null
    dueAt: Date | null
    createdAt: Date | null
  }

  export type TuitionInvoiceMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    learnerId: string | null
    amountMinor: bigint | null
    currency: string | null
    intentId: string | null
    dueAt: Date | null
    createdAt: Date | null
  }

  export type TuitionInvoiceCountAggregateOutputType = {
    id: number
    orgId: number
    learnerId: number
    amountMinor: number
    currency: number
    intentId: number
    dueAt: number
    createdAt: number
    _all: number
  }


  export type TuitionInvoiceAvgAggregateInputType = {
    amountMinor?: true
  }

  export type TuitionInvoiceSumAggregateInputType = {
    amountMinor?: true
  }

  export type TuitionInvoiceMinAggregateInputType = {
    id?: true
    orgId?: true
    learnerId?: true
    amountMinor?: true
    currency?: true
    intentId?: true
    dueAt?: true
    createdAt?: true
  }

  export type TuitionInvoiceMaxAggregateInputType = {
    id?: true
    orgId?: true
    learnerId?: true
    amountMinor?: true
    currency?: true
    intentId?: true
    dueAt?: true
    createdAt?: true
  }

  export type TuitionInvoiceCountAggregateInputType = {
    id?: true
    orgId?: true
    learnerId?: true
    amountMinor?: true
    currency?: true
    intentId?: true
    dueAt?: true
    createdAt?: true
    _all?: true
  }

  export type TuitionInvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TuitionInvoice to aggregate.
     */
    where?: TuitionInvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TuitionInvoices to fetch.
     */
    orderBy?: TuitionInvoiceOrderByWithRelationInput | TuitionInvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TuitionInvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TuitionInvoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TuitionInvoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TuitionInvoices
    **/
    _count?: true | TuitionInvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TuitionInvoiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TuitionInvoiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TuitionInvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TuitionInvoiceMaxAggregateInputType
  }

  export type GetTuitionInvoiceAggregateType<T extends TuitionInvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateTuitionInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTuitionInvoice[P]>
      : GetScalarType<T[P], AggregateTuitionInvoice[P]>
  }




  export type TuitionInvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TuitionInvoiceWhereInput
    orderBy?: TuitionInvoiceOrderByWithAggregationInput | TuitionInvoiceOrderByWithAggregationInput[]
    by: TuitionInvoiceScalarFieldEnum[] | TuitionInvoiceScalarFieldEnum
    having?: TuitionInvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TuitionInvoiceCountAggregateInputType | true
    _avg?: TuitionInvoiceAvgAggregateInputType
    _sum?: TuitionInvoiceSumAggregateInputType
    _min?: TuitionInvoiceMinAggregateInputType
    _max?: TuitionInvoiceMaxAggregateInputType
  }

  export type TuitionInvoiceGroupByOutputType = {
    id: string
    orgId: string
    learnerId: string
    amountMinor: bigint
    currency: string
    intentId: string | null
    dueAt: Date
    createdAt: Date
    _count: TuitionInvoiceCountAggregateOutputType | null
    _avg: TuitionInvoiceAvgAggregateOutputType | null
    _sum: TuitionInvoiceSumAggregateOutputType | null
    _min: TuitionInvoiceMinAggregateOutputType | null
    _max: TuitionInvoiceMaxAggregateOutputType | null
  }

  type GetTuitionInvoiceGroupByPayload<T extends TuitionInvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TuitionInvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TuitionInvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TuitionInvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], TuitionInvoiceGroupByOutputType[P]>
        }
      >
    >


  export type TuitionInvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    learnerId?: boolean
    amountMinor?: boolean
    currency?: boolean
    intentId?: boolean
    dueAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tuitionInvoice"]>

  export type TuitionInvoiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    learnerId?: boolean
    amountMinor?: boolean
    currency?: boolean
    intentId?: boolean
    dueAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tuitionInvoice"]>

  export type TuitionInvoiceSelectScalar = {
    id?: boolean
    orgId?: boolean
    learnerId?: boolean
    amountMinor?: boolean
    currency?: boolean
    intentId?: boolean
    dueAt?: boolean
    createdAt?: boolean
  }


  export type $TuitionInvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TuitionInvoice"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      learnerId: string
      amountMinor: bigint
      currency: string
      intentId: string | null
      dueAt: Date
      createdAt: Date
    }, ExtArgs["result"]["tuitionInvoice"]>
    composites: {}
  }

  type TuitionInvoiceGetPayload<S extends boolean | null | undefined | TuitionInvoiceDefaultArgs> = $Result.GetResult<Prisma.$TuitionInvoicePayload, S>

  type TuitionInvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TuitionInvoiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TuitionInvoiceCountAggregateInputType | true
    }

  export interface TuitionInvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TuitionInvoice'], meta: { name: 'TuitionInvoice' } }
    /**
     * Find zero or one TuitionInvoice that matches the filter.
     * @param {TuitionInvoiceFindUniqueArgs} args - Arguments to find a TuitionInvoice
     * @example
     * // Get one TuitionInvoice
     * const tuitionInvoice = await prisma.tuitionInvoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TuitionInvoiceFindUniqueArgs>(args: SelectSubset<T, TuitionInvoiceFindUniqueArgs<ExtArgs>>): Prisma__TuitionInvoiceClient<$Result.GetResult<Prisma.$TuitionInvoicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TuitionInvoice that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TuitionInvoiceFindUniqueOrThrowArgs} args - Arguments to find a TuitionInvoice
     * @example
     * // Get one TuitionInvoice
     * const tuitionInvoice = await prisma.tuitionInvoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TuitionInvoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, TuitionInvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TuitionInvoiceClient<$Result.GetResult<Prisma.$TuitionInvoicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TuitionInvoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TuitionInvoiceFindFirstArgs} args - Arguments to find a TuitionInvoice
     * @example
     * // Get one TuitionInvoice
     * const tuitionInvoice = await prisma.tuitionInvoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TuitionInvoiceFindFirstArgs>(args?: SelectSubset<T, TuitionInvoiceFindFirstArgs<ExtArgs>>): Prisma__TuitionInvoiceClient<$Result.GetResult<Prisma.$TuitionInvoicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TuitionInvoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TuitionInvoiceFindFirstOrThrowArgs} args - Arguments to find a TuitionInvoice
     * @example
     * // Get one TuitionInvoice
     * const tuitionInvoice = await prisma.tuitionInvoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TuitionInvoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, TuitionInvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__TuitionInvoiceClient<$Result.GetResult<Prisma.$TuitionInvoicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TuitionInvoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TuitionInvoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TuitionInvoices
     * const tuitionInvoices = await prisma.tuitionInvoice.findMany()
     * 
     * // Get first 10 TuitionInvoices
     * const tuitionInvoices = await prisma.tuitionInvoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tuitionInvoiceWithIdOnly = await prisma.tuitionInvoice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TuitionInvoiceFindManyArgs>(args?: SelectSubset<T, TuitionInvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TuitionInvoicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TuitionInvoice.
     * @param {TuitionInvoiceCreateArgs} args - Arguments to create a TuitionInvoice.
     * @example
     * // Create one TuitionInvoice
     * const TuitionInvoice = await prisma.tuitionInvoice.create({
     *   data: {
     *     // ... data to create a TuitionInvoice
     *   }
     * })
     * 
     */
    create<T extends TuitionInvoiceCreateArgs>(args: SelectSubset<T, TuitionInvoiceCreateArgs<ExtArgs>>): Prisma__TuitionInvoiceClient<$Result.GetResult<Prisma.$TuitionInvoicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TuitionInvoices.
     * @param {TuitionInvoiceCreateManyArgs} args - Arguments to create many TuitionInvoices.
     * @example
     * // Create many TuitionInvoices
     * const tuitionInvoice = await prisma.tuitionInvoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TuitionInvoiceCreateManyArgs>(args?: SelectSubset<T, TuitionInvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TuitionInvoices and returns the data saved in the database.
     * @param {TuitionInvoiceCreateManyAndReturnArgs} args - Arguments to create many TuitionInvoices.
     * @example
     * // Create many TuitionInvoices
     * const tuitionInvoice = await prisma.tuitionInvoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TuitionInvoices and only return the `id`
     * const tuitionInvoiceWithIdOnly = await prisma.tuitionInvoice.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TuitionInvoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, TuitionInvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TuitionInvoicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TuitionInvoice.
     * @param {TuitionInvoiceDeleteArgs} args - Arguments to delete one TuitionInvoice.
     * @example
     * // Delete one TuitionInvoice
     * const TuitionInvoice = await prisma.tuitionInvoice.delete({
     *   where: {
     *     // ... filter to delete one TuitionInvoice
     *   }
     * })
     * 
     */
    delete<T extends TuitionInvoiceDeleteArgs>(args: SelectSubset<T, TuitionInvoiceDeleteArgs<ExtArgs>>): Prisma__TuitionInvoiceClient<$Result.GetResult<Prisma.$TuitionInvoicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TuitionInvoice.
     * @param {TuitionInvoiceUpdateArgs} args - Arguments to update one TuitionInvoice.
     * @example
     * // Update one TuitionInvoice
     * const tuitionInvoice = await prisma.tuitionInvoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TuitionInvoiceUpdateArgs>(args: SelectSubset<T, TuitionInvoiceUpdateArgs<ExtArgs>>): Prisma__TuitionInvoiceClient<$Result.GetResult<Prisma.$TuitionInvoicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TuitionInvoices.
     * @param {TuitionInvoiceDeleteManyArgs} args - Arguments to filter TuitionInvoices to delete.
     * @example
     * // Delete a few TuitionInvoices
     * const { count } = await prisma.tuitionInvoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TuitionInvoiceDeleteManyArgs>(args?: SelectSubset<T, TuitionInvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TuitionInvoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TuitionInvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TuitionInvoices
     * const tuitionInvoice = await prisma.tuitionInvoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TuitionInvoiceUpdateManyArgs>(args: SelectSubset<T, TuitionInvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TuitionInvoice.
     * @param {TuitionInvoiceUpsertArgs} args - Arguments to update or create a TuitionInvoice.
     * @example
     * // Update or create a TuitionInvoice
     * const tuitionInvoice = await prisma.tuitionInvoice.upsert({
     *   create: {
     *     // ... data to create a TuitionInvoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TuitionInvoice we want to update
     *   }
     * })
     */
    upsert<T extends TuitionInvoiceUpsertArgs>(args: SelectSubset<T, TuitionInvoiceUpsertArgs<ExtArgs>>): Prisma__TuitionInvoiceClient<$Result.GetResult<Prisma.$TuitionInvoicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TuitionInvoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TuitionInvoiceCountArgs} args - Arguments to filter TuitionInvoices to count.
     * @example
     * // Count the number of TuitionInvoices
     * const count = await prisma.tuitionInvoice.count({
     *   where: {
     *     // ... the filter for the TuitionInvoices we want to count
     *   }
     * })
    **/
    count<T extends TuitionInvoiceCountArgs>(
      args?: Subset<T, TuitionInvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TuitionInvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TuitionInvoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TuitionInvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TuitionInvoiceAggregateArgs>(args: Subset<T, TuitionInvoiceAggregateArgs>): Prisma.PrismaPromise<GetTuitionInvoiceAggregateType<T>>

    /**
     * Group by TuitionInvoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TuitionInvoiceGroupByArgs} args - Group by arguments.
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
      T extends TuitionInvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TuitionInvoiceGroupByArgs['orderBy'] }
        : { orderBy?: TuitionInvoiceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TuitionInvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTuitionInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TuitionInvoice model
   */
  readonly fields: TuitionInvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TuitionInvoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TuitionInvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the TuitionInvoice model
   */ 
  interface TuitionInvoiceFieldRefs {
    readonly id: FieldRef<"TuitionInvoice", 'String'>
    readonly orgId: FieldRef<"TuitionInvoice", 'String'>
    readonly learnerId: FieldRef<"TuitionInvoice", 'String'>
    readonly amountMinor: FieldRef<"TuitionInvoice", 'BigInt'>
    readonly currency: FieldRef<"TuitionInvoice", 'String'>
    readonly intentId: FieldRef<"TuitionInvoice", 'String'>
    readonly dueAt: FieldRef<"TuitionInvoice", 'DateTime'>
    readonly createdAt: FieldRef<"TuitionInvoice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TuitionInvoice findUnique
   */
  export type TuitionInvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TuitionInvoice
     */
    select?: TuitionInvoiceSelect<ExtArgs> | null
    /**
     * Filter, which TuitionInvoice to fetch.
     */
    where: TuitionInvoiceWhereUniqueInput
  }

  /**
   * TuitionInvoice findUniqueOrThrow
   */
  export type TuitionInvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TuitionInvoice
     */
    select?: TuitionInvoiceSelect<ExtArgs> | null
    /**
     * Filter, which TuitionInvoice to fetch.
     */
    where: TuitionInvoiceWhereUniqueInput
  }

  /**
   * TuitionInvoice findFirst
   */
  export type TuitionInvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TuitionInvoice
     */
    select?: TuitionInvoiceSelect<ExtArgs> | null
    /**
     * Filter, which TuitionInvoice to fetch.
     */
    where?: TuitionInvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TuitionInvoices to fetch.
     */
    orderBy?: TuitionInvoiceOrderByWithRelationInput | TuitionInvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TuitionInvoices.
     */
    cursor?: TuitionInvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TuitionInvoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TuitionInvoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TuitionInvoices.
     */
    distinct?: TuitionInvoiceScalarFieldEnum | TuitionInvoiceScalarFieldEnum[]
  }

  /**
   * TuitionInvoice findFirstOrThrow
   */
  export type TuitionInvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TuitionInvoice
     */
    select?: TuitionInvoiceSelect<ExtArgs> | null
    /**
     * Filter, which TuitionInvoice to fetch.
     */
    where?: TuitionInvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TuitionInvoices to fetch.
     */
    orderBy?: TuitionInvoiceOrderByWithRelationInput | TuitionInvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TuitionInvoices.
     */
    cursor?: TuitionInvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TuitionInvoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TuitionInvoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TuitionInvoices.
     */
    distinct?: TuitionInvoiceScalarFieldEnum | TuitionInvoiceScalarFieldEnum[]
  }

  /**
   * TuitionInvoice findMany
   */
  export type TuitionInvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TuitionInvoice
     */
    select?: TuitionInvoiceSelect<ExtArgs> | null
    /**
     * Filter, which TuitionInvoices to fetch.
     */
    where?: TuitionInvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TuitionInvoices to fetch.
     */
    orderBy?: TuitionInvoiceOrderByWithRelationInput | TuitionInvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TuitionInvoices.
     */
    cursor?: TuitionInvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TuitionInvoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TuitionInvoices.
     */
    skip?: number
    distinct?: TuitionInvoiceScalarFieldEnum | TuitionInvoiceScalarFieldEnum[]
  }

  /**
   * TuitionInvoice create
   */
  export type TuitionInvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TuitionInvoice
     */
    select?: TuitionInvoiceSelect<ExtArgs> | null
    /**
     * The data needed to create a TuitionInvoice.
     */
    data: XOR<TuitionInvoiceCreateInput, TuitionInvoiceUncheckedCreateInput>
  }

  /**
   * TuitionInvoice createMany
   */
  export type TuitionInvoiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TuitionInvoices.
     */
    data: TuitionInvoiceCreateManyInput | TuitionInvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TuitionInvoice createManyAndReturn
   */
  export type TuitionInvoiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TuitionInvoice
     */
    select?: TuitionInvoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TuitionInvoices.
     */
    data: TuitionInvoiceCreateManyInput | TuitionInvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TuitionInvoice update
   */
  export type TuitionInvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TuitionInvoice
     */
    select?: TuitionInvoiceSelect<ExtArgs> | null
    /**
     * The data needed to update a TuitionInvoice.
     */
    data: XOR<TuitionInvoiceUpdateInput, TuitionInvoiceUncheckedUpdateInput>
    /**
     * Choose, which TuitionInvoice to update.
     */
    where: TuitionInvoiceWhereUniqueInput
  }

  /**
   * TuitionInvoice updateMany
   */
  export type TuitionInvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TuitionInvoices.
     */
    data: XOR<TuitionInvoiceUpdateManyMutationInput, TuitionInvoiceUncheckedUpdateManyInput>
    /**
     * Filter which TuitionInvoices to update
     */
    where?: TuitionInvoiceWhereInput
  }

  /**
   * TuitionInvoice upsert
   */
  export type TuitionInvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TuitionInvoice
     */
    select?: TuitionInvoiceSelect<ExtArgs> | null
    /**
     * The filter to search for the TuitionInvoice to update in case it exists.
     */
    where: TuitionInvoiceWhereUniqueInput
    /**
     * In case the TuitionInvoice found by the `where` argument doesn't exist, create a new TuitionInvoice with this data.
     */
    create: XOR<TuitionInvoiceCreateInput, TuitionInvoiceUncheckedCreateInput>
    /**
     * In case the TuitionInvoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TuitionInvoiceUpdateInput, TuitionInvoiceUncheckedUpdateInput>
  }

  /**
   * TuitionInvoice delete
   */
  export type TuitionInvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TuitionInvoice
     */
    select?: TuitionInvoiceSelect<ExtArgs> | null
    /**
     * Filter which TuitionInvoice to delete.
     */
    where: TuitionInvoiceWhereUniqueInput
  }

  /**
   * TuitionInvoice deleteMany
   */
  export type TuitionInvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TuitionInvoices to delete
     */
    where?: TuitionInvoiceWhereInput
  }

  /**
   * TuitionInvoice without action
   */
  export type TuitionInvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TuitionInvoice
     */
    select?: TuitionInvoiceSelect<ExtArgs> | null
  }


  /**
   * Model ScholarshipGrant
   */

  export type AggregateScholarshipGrant = {
    _count: ScholarshipGrantCountAggregateOutputType | null
    _avg: ScholarshipGrantAvgAggregateOutputType | null
    _sum: ScholarshipGrantSumAggregateOutputType | null
    _min: ScholarshipGrantMinAggregateOutputType | null
    _max: ScholarshipGrantMaxAggregateOutputType | null
  }

  export type ScholarshipGrantAvgAggregateOutputType = {
    amountMinor: number | null
  }

  export type ScholarshipGrantSumAggregateOutputType = {
    amountMinor: bigint | null
  }

  export type ScholarshipGrantMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    learnerId: string | null
    amountMinor: bigint | null
    currency: string | null
    milestone: string | null
    status: $Enums.ScholarshipStatus | null
    escrowIntentId: string | null
    createdAt: Date | null
  }

  export type ScholarshipGrantMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    learnerId: string | null
    amountMinor: bigint | null
    currency: string | null
    milestone: string | null
    status: $Enums.ScholarshipStatus | null
    escrowIntentId: string | null
    createdAt: Date | null
  }

  export type ScholarshipGrantCountAggregateOutputType = {
    id: number
    orgId: number
    learnerId: number
    amountMinor: number
    currency: number
    milestone: number
    status: number
    escrowIntentId: number
    createdAt: number
    _all: number
  }


  export type ScholarshipGrantAvgAggregateInputType = {
    amountMinor?: true
  }

  export type ScholarshipGrantSumAggregateInputType = {
    amountMinor?: true
  }

  export type ScholarshipGrantMinAggregateInputType = {
    id?: true
    orgId?: true
    learnerId?: true
    amountMinor?: true
    currency?: true
    milestone?: true
    status?: true
    escrowIntentId?: true
    createdAt?: true
  }

  export type ScholarshipGrantMaxAggregateInputType = {
    id?: true
    orgId?: true
    learnerId?: true
    amountMinor?: true
    currency?: true
    milestone?: true
    status?: true
    escrowIntentId?: true
    createdAt?: true
  }

  export type ScholarshipGrantCountAggregateInputType = {
    id?: true
    orgId?: true
    learnerId?: true
    amountMinor?: true
    currency?: true
    milestone?: true
    status?: true
    escrowIntentId?: true
    createdAt?: true
    _all?: true
  }

  export type ScholarshipGrantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScholarshipGrant to aggregate.
     */
    where?: ScholarshipGrantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScholarshipGrants to fetch.
     */
    orderBy?: ScholarshipGrantOrderByWithRelationInput | ScholarshipGrantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScholarshipGrantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScholarshipGrants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScholarshipGrants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScholarshipGrants
    **/
    _count?: true | ScholarshipGrantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScholarshipGrantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScholarshipGrantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScholarshipGrantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScholarshipGrantMaxAggregateInputType
  }

  export type GetScholarshipGrantAggregateType<T extends ScholarshipGrantAggregateArgs> = {
        [P in keyof T & keyof AggregateScholarshipGrant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScholarshipGrant[P]>
      : GetScalarType<T[P], AggregateScholarshipGrant[P]>
  }




  export type ScholarshipGrantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScholarshipGrantWhereInput
    orderBy?: ScholarshipGrantOrderByWithAggregationInput | ScholarshipGrantOrderByWithAggregationInput[]
    by: ScholarshipGrantScalarFieldEnum[] | ScholarshipGrantScalarFieldEnum
    having?: ScholarshipGrantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScholarshipGrantCountAggregateInputType | true
    _avg?: ScholarshipGrantAvgAggregateInputType
    _sum?: ScholarshipGrantSumAggregateInputType
    _min?: ScholarshipGrantMinAggregateInputType
    _max?: ScholarshipGrantMaxAggregateInputType
  }

  export type ScholarshipGrantGroupByOutputType = {
    id: string
    orgId: string
    learnerId: string
    amountMinor: bigint
    currency: string
    milestone: string
    status: $Enums.ScholarshipStatus
    escrowIntentId: string | null
    createdAt: Date
    _count: ScholarshipGrantCountAggregateOutputType | null
    _avg: ScholarshipGrantAvgAggregateOutputType | null
    _sum: ScholarshipGrantSumAggregateOutputType | null
    _min: ScholarshipGrantMinAggregateOutputType | null
    _max: ScholarshipGrantMaxAggregateOutputType | null
  }

  type GetScholarshipGrantGroupByPayload<T extends ScholarshipGrantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScholarshipGrantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScholarshipGrantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScholarshipGrantGroupByOutputType[P]>
            : GetScalarType<T[P], ScholarshipGrantGroupByOutputType[P]>
        }
      >
    >


  export type ScholarshipGrantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    learnerId?: boolean
    amountMinor?: boolean
    currency?: boolean
    milestone?: boolean
    status?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["scholarshipGrant"]>

  export type ScholarshipGrantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    learnerId?: boolean
    amountMinor?: boolean
    currency?: boolean
    milestone?: boolean
    status?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["scholarshipGrant"]>

  export type ScholarshipGrantSelectScalar = {
    id?: boolean
    orgId?: boolean
    learnerId?: boolean
    amountMinor?: boolean
    currency?: boolean
    milestone?: boolean
    status?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }


  export type $ScholarshipGrantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScholarshipGrant"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      learnerId: string
      amountMinor: bigint
      currency: string
      milestone: string
      status: $Enums.ScholarshipStatus
      escrowIntentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["scholarshipGrant"]>
    composites: {}
  }

  type ScholarshipGrantGetPayload<S extends boolean | null | undefined | ScholarshipGrantDefaultArgs> = $Result.GetResult<Prisma.$ScholarshipGrantPayload, S>

  type ScholarshipGrantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ScholarshipGrantFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ScholarshipGrantCountAggregateInputType | true
    }

  export interface ScholarshipGrantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScholarshipGrant'], meta: { name: 'ScholarshipGrant' } }
    /**
     * Find zero or one ScholarshipGrant that matches the filter.
     * @param {ScholarshipGrantFindUniqueArgs} args - Arguments to find a ScholarshipGrant
     * @example
     * // Get one ScholarshipGrant
     * const scholarshipGrant = await prisma.scholarshipGrant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScholarshipGrantFindUniqueArgs>(args: SelectSubset<T, ScholarshipGrantFindUniqueArgs<ExtArgs>>): Prisma__ScholarshipGrantClient<$Result.GetResult<Prisma.$ScholarshipGrantPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ScholarshipGrant that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ScholarshipGrantFindUniqueOrThrowArgs} args - Arguments to find a ScholarshipGrant
     * @example
     * // Get one ScholarshipGrant
     * const scholarshipGrant = await prisma.scholarshipGrant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScholarshipGrantFindUniqueOrThrowArgs>(args: SelectSubset<T, ScholarshipGrantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScholarshipGrantClient<$Result.GetResult<Prisma.$ScholarshipGrantPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ScholarshipGrant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScholarshipGrantFindFirstArgs} args - Arguments to find a ScholarshipGrant
     * @example
     * // Get one ScholarshipGrant
     * const scholarshipGrant = await prisma.scholarshipGrant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScholarshipGrantFindFirstArgs>(args?: SelectSubset<T, ScholarshipGrantFindFirstArgs<ExtArgs>>): Prisma__ScholarshipGrantClient<$Result.GetResult<Prisma.$ScholarshipGrantPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ScholarshipGrant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScholarshipGrantFindFirstOrThrowArgs} args - Arguments to find a ScholarshipGrant
     * @example
     * // Get one ScholarshipGrant
     * const scholarshipGrant = await prisma.scholarshipGrant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScholarshipGrantFindFirstOrThrowArgs>(args?: SelectSubset<T, ScholarshipGrantFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScholarshipGrantClient<$Result.GetResult<Prisma.$ScholarshipGrantPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ScholarshipGrants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScholarshipGrantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScholarshipGrants
     * const scholarshipGrants = await prisma.scholarshipGrant.findMany()
     * 
     * // Get first 10 ScholarshipGrants
     * const scholarshipGrants = await prisma.scholarshipGrant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scholarshipGrantWithIdOnly = await prisma.scholarshipGrant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScholarshipGrantFindManyArgs>(args?: SelectSubset<T, ScholarshipGrantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScholarshipGrantPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ScholarshipGrant.
     * @param {ScholarshipGrantCreateArgs} args - Arguments to create a ScholarshipGrant.
     * @example
     * // Create one ScholarshipGrant
     * const ScholarshipGrant = await prisma.scholarshipGrant.create({
     *   data: {
     *     // ... data to create a ScholarshipGrant
     *   }
     * })
     * 
     */
    create<T extends ScholarshipGrantCreateArgs>(args: SelectSubset<T, ScholarshipGrantCreateArgs<ExtArgs>>): Prisma__ScholarshipGrantClient<$Result.GetResult<Prisma.$ScholarshipGrantPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ScholarshipGrants.
     * @param {ScholarshipGrantCreateManyArgs} args - Arguments to create many ScholarshipGrants.
     * @example
     * // Create many ScholarshipGrants
     * const scholarshipGrant = await prisma.scholarshipGrant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScholarshipGrantCreateManyArgs>(args?: SelectSubset<T, ScholarshipGrantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScholarshipGrants and returns the data saved in the database.
     * @param {ScholarshipGrantCreateManyAndReturnArgs} args - Arguments to create many ScholarshipGrants.
     * @example
     * // Create many ScholarshipGrants
     * const scholarshipGrant = await prisma.scholarshipGrant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScholarshipGrants and only return the `id`
     * const scholarshipGrantWithIdOnly = await prisma.scholarshipGrant.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScholarshipGrantCreateManyAndReturnArgs>(args?: SelectSubset<T, ScholarshipGrantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScholarshipGrantPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ScholarshipGrant.
     * @param {ScholarshipGrantDeleteArgs} args - Arguments to delete one ScholarshipGrant.
     * @example
     * // Delete one ScholarshipGrant
     * const ScholarshipGrant = await prisma.scholarshipGrant.delete({
     *   where: {
     *     // ... filter to delete one ScholarshipGrant
     *   }
     * })
     * 
     */
    delete<T extends ScholarshipGrantDeleteArgs>(args: SelectSubset<T, ScholarshipGrantDeleteArgs<ExtArgs>>): Prisma__ScholarshipGrantClient<$Result.GetResult<Prisma.$ScholarshipGrantPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ScholarshipGrant.
     * @param {ScholarshipGrantUpdateArgs} args - Arguments to update one ScholarshipGrant.
     * @example
     * // Update one ScholarshipGrant
     * const scholarshipGrant = await prisma.scholarshipGrant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScholarshipGrantUpdateArgs>(args: SelectSubset<T, ScholarshipGrantUpdateArgs<ExtArgs>>): Prisma__ScholarshipGrantClient<$Result.GetResult<Prisma.$ScholarshipGrantPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ScholarshipGrants.
     * @param {ScholarshipGrantDeleteManyArgs} args - Arguments to filter ScholarshipGrants to delete.
     * @example
     * // Delete a few ScholarshipGrants
     * const { count } = await prisma.scholarshipGrant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScholarshipGrantDeleteManyArgs>(args?: SelectSubset<T, ScholarshipGrantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScholarshipGrants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScholarshipGrantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScholarshipGrants
     * const scholarshipGrant = await prisma.scholarshipGrant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScholarshipGrantUpdateManyArgs>(args: SelectSubset<T, ScholarshipGrantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ScholarshipGrant.
     * @param {ScholarshipGrantUpsertArgs} args - Arguments to update or create a ScholarshipGrant.
     * @example
     * // Update or create a ScholarshipGrant
     * const scholarshipGrant = await prisma.scholarshipGrant.upsert({
     *   create: {
     *     // ... data to create a ScholarshipGrant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScholarshipGrant we want to update
     *   }
     * })
     */
    upsert<T extends ScholarshipGrantUpsertArgs>(args: SelectSubset<T, ScholarshipGrantUpsertArgs<ExtArgs>>): Prisma__ScholarshipGrantClient<$Result.GetResult<Prisma.$ScholarshipGrantPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ScholarshipGrants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScholarshipGrantCountArgs} args - Arguments to filter ScholarshipGrants to count.
     * @example
     * // Count the number of ScholarshipGrants
     * const count = await prisma.scholarshipGrant.count({
     *   where: {
     *     // ... the filter for the ScholarshipGrants we want to count
     *   }
     * })
    **/
    count<T extends ScholarshipGrantCountArgs>(
      args?: Subset<T, ScholarshipGrantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScholarshipGrantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScholarshipGrant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScholarshipGrantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ScholarshipGrantAggregateArgs>(args: Subset<T, ScholarshipGrantAggregateArgs>): Prisma.PrismaPromise<GetScholarshipGrantAggregateType<T>>

    /**
     * Group by ScholarshipGrant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScholarshipGrantGroupByArgs} args - Group by arguments.
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
      T extends ScholarshipGrantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScholarshipGrantGroupByArgs['orderBy'] }
        : { orderBy?: ScholarshipGrantGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ScholarshipGrantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScholarshipGrantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScholarshipGrant model
   */
  readonly fields: ScholarshipGrantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScholarshipGrant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScholarshipGrantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ScholarshipGrant model
   */ 
  interface ScholarshipGrantFieldRefs {
    readonly id: FieldRef<"ScholarshipGrant", 'String'>
    readonly orgId: FieldRef<"ScholarshipGrant", 'String'>
    readonly learnerId: FieldRef<"ScholarshipGrant", 'String'>
    readonly amountMinor: FieldRef<"ScholarshipGrant", 'BigInt'>
    readonly currency: FieldRef<"ScholarshipGrant", 'String'>
    readonly milestone: FieldRef<"ScholarshipGrant", 'String'>
    readonly status: FieldRef<"ScholarshipGrant", 'ScholarshipStatus'>
    readonly escrowIntentId: FieldRef<"ScholarshipGrant", 'String'>
    readonly createdAt: FieldRef<"ScholarshipGrant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ScholarshipGrant findUnique
   */
  export type ScholarshipGrantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScholarshipGrant
     */
    select?: ScholarshipGrantSelect<ExtArgs> | null
    /**
     * Filter, which ScholarshipGrant to fetch.
     */
    where: ScholarshipGrantWhereUniqueInput
  }

  /**
   * ScholarshipGrant findUniqueOrThrow
   */
  export type ScholarshipGrantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScholarshipGrant
     */
    select?: ScholarshipGrantSelect<ExtArgs> | null
    /**
     * Filter, which ScholarshipGrant to fetch.
     */
    where: ScholarshipGrantWhereUniqueInput
  }

  /**
   * ScholarshipGrant findFirst
   */
  export type ScholarshipGrantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScholarshipGrant
     */
    select?: ScholarshipGrantSelect<ExtArgs> | null
    /**
     * Filter, which ScholarshipGrant to fetch.
     */
    where?: ScholarshipGrantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScholarshipGrants to fetch.
     */
    orderBy?: ScholarshipGrantOrderByWithRelationInput | ScholarshipGrantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScholarshipGrants.
     */
    cursor?: ScholarshipGrantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScholarshipGrants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScholarshipGrants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScholarshipGrants.
     */
    distinct?: ScholarshipGrantScalarFieldEnum | ScholarshipGrantScalarFieldEnum[]
  }

  /**
   * ScholarshipGrant findFirstOrThrow
   */
  export type ScholarshipGrantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScholarshipGrant
     */
    select?: ScholarshipGrantSelect<ExtArgs> | null
    /**
     * Filter, which ScholarshipGrant to fetch.
     */
    where?: ScholarshipGrantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScholarshipGrants to fetch.
     */
    orderBy?: ScholarshipGrantOrderByWithRelationInput | ScholarshipGrantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScholarshipGrants.
     */
    cursor?: ScholarshipGrantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScholarshipGrants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScholarshipGrants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScholarshipGrants.
     */
    distinct?: ScholarshipGrantScalarFieldEnum | ScholarshipGrantScalarFieldEnum[]
  }

  /**
   * ScholarshipGrant findMany
   */
  export type ScholarshipGrantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScholarshipGrant
     */
    select?: ScholarshipGrantSelect<ExtArgs> | null
    /**
     * Filter, which ScholarshipGrants to fetch.
     */
    where?: ScholarshipGrantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScholarshipGrants to fetch.
     */
    orderBy?: ScholarshipGrantOrderByWithRelationInput | ScholarshipGrantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScholarshipGrants.
     */
    cursor?: ScholarshipGrantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScholarshipGrants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScholarshipGrants.
     */
    skip?: number
    distinct?: ScholarshipGrantScalarFieldEnum | ScholarshipGrantScalarFieldEnum[]
  }

  /**
   * ScholarshipGrant create
   */
  export type ScholarshipGrantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScholarshipGrant
     */
    select?: ScholarshipGrantSelect<ExtArgs> | null
    /**
     * The data needed to create a ScholarshipGrant.
     */
    data: XOR<ScholarshipGrantCreateInput, ScholarshipGrantUncheckedCreateInput>
  }

  /**
   * ScholarshipGrant createMany
   */
  export type ScholarshipGrantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScholarshipGrants.
     */
    data: ScholarshipGrantCreateManyInput | ScholarshipGrantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScholarshipGrant createManyAndReturn
   */
  export type ScholarshipGrantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScholarshipGrant
     */
    select?: ScholarshipGrantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ScholarshipGrants.
     */
    data: ScholarshipGrantCreateManyInput | ScholarshipGrantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScholarshipGrant update
   */
  export type ScholarshipGrantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScholarshipGrant
     */
    select?: ScholarshipGrantSelect<ExtArgs> | null
    /**
     * The data needed to update a ScholarshipGrant.
     */
    data: XOR<ScholarshipGrantUpdateInput, ScholarshipGrantUncheckedUpdateInput>
    /**
     * Choose, which ScholarshipGrant to update.
     */
    where: ScholarshipGrantWhereUniqueInput
  }

  /**
   * ScholarshipGrant updateMany
   */
  export type ScholarshipGrantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScholarshipGrants.
     */
    data: XOR<ScholarshipGrantUpdateManyMutationInput, ScholarshipGrantUncheckedUpdateManyInput>
    /**
     * Filter which ScholarshipGrants to update
     */
    where?: ScholarshipGrantWhereInput
  }

  /**
   * ScholarshipGrant upsert
   */
  export type ScholarshipGrantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScholarshipGrant
     */
    select?: ScholarshipGrantSelect<ExtArgs> | null
    /**
     * The filter to search for the ScholarshipGrant to update in case it exists.
     */
    where: ScholarshipGrantWhereUniqueInput
    /**
     * In case the ScholarshipGrant found by the `where` argument doesn't exist, create a new ScholarshipGrant with this data.
     */
    create: XOR<ScholarshipGrantCreateInput, ScholarshipGrantUncheckedCreateInput>
    /**
     * In case the ScholarshipGrant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScholarshipGrantUpdateInput, ScholarshipGrantUncheckedUpdateInput>
  }

  /**
   * ScholarshipGrant delete
   */
  export type ScholarshipGrantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScholarshipGrant
     */
    select?: ScholarshipGrantSelect<ExtArgs> | null
    /**
     * Filter which ScholarshipGrant to delete.
     */
    where: ScholarshipGrantWhereUniqueInput
  }

  /**
   * ScholarshipGrant deleteMany
   */
  export type ScholarshipGrantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScholarshipGrants to delete
     */
    where?: ScholarshipGrantWhereInput
  }

  /**
   * ScholarshipGrant without action
   */
  export type ScholarshipGrantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScholarshipGrant
     */
    select?: ScholarshipGrantSelect<ExtArgs> | null
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


  export const InstitutionScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type InstitutionScalarFieldEnum = (typeof InstitutionScalarFieldEnum)[keyof typeof InstitutionScalarFieldEnum]


  export const LearnerScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    subjectHash: 'subjectHash',
    createdAt: 'createdAt'
  };

  export type LearnerScalarFieldEnum = (typeof LearnerScalarFieldEnum)[keyof typeof LearnerScalarFieldEnum]


  export const CredentialScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    institutionId: 'institutionId',
    learnerId: 'learnerId',
    type: 'type',
    dataHash: 'dataHash',
    attestationId: 'attestationId',
    status: 'status',
    issuedAt: 'issuedAt',
    expiresAt: 'expiresAt'
  };

  export type CredentialScalarFieldEnum = (typeof CredentialScalarFieldEnum)[keyof typeof CredentialScalarFieldEnum]


  export const EnrollmentScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    institutionId: 'institutionId',
    learnerId: 'learnerId',
    program: 'program',
    createdAt: 'createdAt'
  };

  export type EnrollmentScalarFieldEnum = (typeof EnrollmentScalarFieldEnum)[keyof typeof EnrollmentScalarFieldEnum]


  export const TuitionInvoiceScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    learnerId: 'learnerId',
    amountMinor: 'amountMinor',
    currency: 'currency',
    intentId: 'intentId',
    dueAt: 'dueAt',
    createdAt: 'createdAt'
  };

  export type TuitionInvoiceScalarFieldEnum = (typeof TuitionInvoiceScalarFieldEnum)[keyof typeof TuitionInvoiceScalarFieldEnum]


  export const ScholarshipGrantScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    learnerId: 'learnerId',
    amountMinor: 'amountMinor',
    currency: 'currency',
    milestone: 'milestone',
    status: 'status',
    escrowIntentId: 'escrowIntentId',
    createdAt: 'createdAt'
  };

  export type ScholarshipGrantScalarFieldEnum = (typeof ScholarshipGrantScalarFieldEnum)[keyof typeof ScholarshipGrantScalarFieldEnum]


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
   * Reference to a field of type 'CredentialType'
   */
  export type EnumCredentialTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CredentialType'>
    


  /**
   * Reference to a field of type 'CredentialType[]'
   */
  export type ListEnumCredentialTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CredentialType[]'>
    


  /**
   * Reference to a field of type 'CredentialStatus'
   */
  export type EnumCredentialStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CredentialStatus'>
    


  /**
   * Reference to a field of type 'CredentialStatus[]'
   */
  export type ListEnumCredentialStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CredentialStatus[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'ScholarshipStatus'
   */
  export type EnumScholarshipStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScholarshipStatus'>
    


  /**
   * Reference to a field of type 'ScholarshipStatus[]'
   */
  export type ListEnumScholarshipStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScholarshipStatus[]'>
    


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

  export type InstitutionWhereInput = {
    AND?: InstitutionWhereInput | InstitutionWhereInput[]
    OR?: InstitutionWhereInput[]
    NOT?: InstitutionWhereInput | InstitutionWhereInput[]
    id?: StringFilter<"Institution"> | string
    orgId?: StringFilter<"Institution"> | string
    name?: StringFilter<"Institution"> | string
    createdAt?: DateTimeFilter<"Institution"> | Date | string
    credentials?: CredentialListRelationFilter
    enrollments?: EnrollmentListRelationFilter
  }

  export type InstitutionOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    credentials?: CredentialOrderByRelationAggregateInput
    enrollments?: EnrollmentOrderByRelationAggregateInput
  }

  export type InstitutionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InstitutionWhereInput | InstitutionWhereInput[]
    OR?: InstitutionWhereInput[]
    NOT?: InstitutionWhereInput | InstitutionWhereInput[]
    orgId?: StringFilter<"Institution"> | string
    name?: StringFilter<"Institution"> | string
    createdAt?: DateTimeFilter<"Institution"> | Date | string
    credentials?: CredentialListRelationFilter
    enrollments?: EnrollmentListRelationFilter
  }, "id">

  export type InstitutionOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: InstitutionCountOrderByAggregateInput
    _max?: InstitutionMaxOrderByAggregateInput
    _min?: InstitutionMinOrderByAggregateInput
  }

  export type InstitutionScalarWhereWithAggregatesInput = {
    AND?: InstitutionScalarWhereWithAggregatesInput | InstitutionScalarWhereWithAggregatesInput[]
    OR?: InstitutionScalarWhereWithAggregatesInput[]
    NOT?: InstitutionScalarWhereWithAggregatesInput | InstitutionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Institution"> | string
    orgId?: StringWithAggregatesFilter<"Institution"> | string
    name?: StringWithAggregatesFilter<"Institution"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Institution"> | Date | string
  }

  export type LearnerWhereInput = {
    AND?: LearnerWhereInput | LearnerWhereInput[]
    OR?: LearnerWhereInput[]
    NOT?: LearnerWhereInput | LearnerWhereInput[]
    id?: StringFilter<"Learner"> | string
    orgId?: StringFilter<"Learner"> | string
    subjectHash?: StringFilter<"Learner"> | string
    createdAt?: DateTimeFilter<"Learner"> | Date | string
    credentials?: CredentialListRelationFilter
    enrollments?: EnrollmentListRelationFilter
  }

  export type LearnerOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    subjectHash?: SortOrder
    createdAt?: SortOrder
    credentials?: CredentialOrderByRelationAggregateInput
    enrollments?: EnrollmentOrderByRelationAggregateInput
  }

  export type LearnerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orgId_subjectHash?: LearnerOrgIdSubjectHashCompoundUniqueInput
    AND?: LearnerWhereInput | LearnerWhereInput[]
    OR?: LearnerWhereInput[]
    NOT?: LearnerWhereInput | LearnerWhereInput[]
    orgId?: StringFilter<"Learner"> | string
    subjectHash?: StringFilter<"Learner"> | string
    createdAt?: DateTimeFilter<"Learner"> | Date | string
    credentials?: CredentialListRelationFilter
    enrollments?: EnrollmentListRelationFilter
  }, "id" | "orgId_subjectHash">

  export type LearnerOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    subjectHash?: SortOrder
    createdAt?: SortOrder
    _count?: LearnerCountOrderByAggregateInput
    _max?: LearnerMaxOrderByAggregateInput
    _min?: LearnerMinOrderByAggregateInput
  }

  export type LearnerScalarWhereWithAggregatesInput = {
    AND?: LearnerScalarWhereWithAggregatesInput | LearnerScalarWhereWithAggregatesInput[]
    OR?: LearnerScalarWhereWithAggregatesInput[]
    NOT?: LearnerScalarWhereWithAggregatesInput | LearnerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Learner"> | string
    orgId?: StringWithAggregatesFilter<"Learner"> | string
    subjectHash?: StringWithAggregatesFilter<"Learner"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Learner"> | Date | string
  }

  export type CredentialWhereInput = {
    AND?: CredentialWhereInput | CredentialWhereInput[]
    OR?: CredentialWhereInput[]
    NOT?: CredentialWhereInput | CredentialWhereInput[]
    id?: StringFilter<"Credential"> | string
    orgId?: StringFilter<"Credential"> | string
    institutionId?: StringFilter<"Credential"> | string
    learnerId?: StringFilter<"Credential"> | string
    type?: EnumCredentialTypeFilter<"Credential"> | $Enums.CredentialType
    dataHash?: StringFilter<"Credential"> | string
    attestationId?: StringNullableFilter<"Credential"> | string | null
    status?: EnumCredentialStatusFilter<"Credential"> | $Enums.CredentialStatus
    issuedAt?: DateTimeFilter<"Credential"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Credential"> | Date | string | null
    institution?: XOR<InstitutionRelationFilter, InstitutionWhereInput>
    learner?: XOR<LearnerRelationFilter, LearnerWhereInput>
  }

  export type CredentialOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    institutionId?: SortOrder
    learnerId?: SortOrder
    type?: SortOrder
    dataHash?: SortOrder
    attestationId?: SortOrderInput | SortOrder
    status?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    institution?: InstitutionOrderByWithRelationInput
    learner?: LearnerOrderByWithRelationInput
  }

  export type CredentialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CredentialWhereInput | CredentialWhereInput[]
    OR?: CredentialWhereInput[]
    NOT?: CredentialWhereInput | CredentialWhereInput[]
    orgId?: StringFilter<"Credential"> | string
    institutionId?: StringFilter<"Credential"> | string
    learnerId?: StringFilter<"Credential"> | string
    type?: EnumCredentialTypeFilter<"Credential"> | $Enums.CredentialType
    dataHash?: StringFilter<"Credential"> | string
    attestationId?: StringNullableFilter<"Credential"> | string | null
    status?: EnumCredentialStatusFilter<"Credential"> | $Enums.CredentialStatus
    issuedAt?: DateTimeFilter<"Credential"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Credential"> | Date | string | null
    institution?: XOR<InstitutionRelationFilter, InstitutionWhereInput>
    learner?: XOR<LearnerRelationFilter, LearnerWhereInput>
  }, "id">

  export type CredentialOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    institutionId?: SortOrder
    learnerId?: SortOrder
    type?: SortOrder
    dataHash?: SortOrder
    attestationId?: SortOrderInput | SortOrder
    status?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    _count?: CredentialCountOrderByAggregateInput
    _max?: CredentialMaxOrderByAggregateInput
    _min?: CredentialMinOrderByAggregateInput
  }

  export type CredentialScalarWhereWithAggregatesInput = {
    AND?: CredentialScalarWhereWithAggregatesInput | CredentialScalarWhereWithAggregatesInput[]
    OR?: CredentialScalarWhereWithAggregatesInput[]
    NOT?: CredentialScalarWhereWithAggregatesInput | CredentialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Credential"> | string
    orgId?: StringWithAggregatesFilter<"Credential"> | string
    institutionId?: StringWithAggregatesFilter<"Credential"> | string
    learnerId?: StringWithAggregatesFilter<"Credential"> | string
    type?: EnumCredentialTypeWithAggregatesFilter<"Credential"> | $Enums.CredentialType
    dataHash?: StringWithAggregatesFilter<"Credential"> | string
    attestationId?: StringNullableWithAggregatesFilter<"Credential"> | string | null
    status?: EnumCredentialStatusWithAggregatesFilter<"Credential"> | $Enums.CredentialStatus
    issuedAt?: DateTimeWithAggregatesFilter<"Credential"> | Date | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Credential"> | Date | string | null
  }

  export type EnrollmentWhereInput = {
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    id?: StringFilter<"Enrollment"> | string
    orgId?: StringFilter<"Enrollment"> | string
    institutionId?: StringFilter<"Enrollment"> | string
    learnerId?: StringFilter<"Enrollment"> | string
    program?: StringFilter<"Enrollment"> | string
    createdAt?: DateTimeFilter<"Enrollment"> | Date | string
    institution?: XOR<InstitutionRelationFilter, InstitutionWhereInput>
    learner?: XOR<LearnerRelationFilter, LearnerWhereInput>
  }

  export type EnrollmentOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    institutionId?: SortOrder
    learnerId?: SortOrder
    program?: SortOrder
    createdAt?: SortOrder
    institution?: InstitutionOrderByWithRelationInput
    learner?: LearnerOrderByWithRelationInput
  }

  export type EnrollmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    orgId?: StringFilter<"Enrollment"> | string
    institutionId?: StringFilter<"Enrollment"> | string
    learnerId?: StringFilter<"Enrollment"> | string
    program?: StringFilter<"Enrollment"> | string
    createdAt?: DateTimeFilter<"Enrollment"> | Date | string
    institution?: XOR<InstitutionRelationFilter, InstitutionWhereInput>
    learner?: XOR<LearnerRelationFilter, LearnerWhereInput>
  }, "id">

  export type EnrollmentOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    institutionId?: SortOrder
    learnerId?: SortOrder
    program?: SortOrder
    createdAt?: SortOrder
    _count?: EnrollmentCountOrderByAggregateInput
    _max?: EnrollmentMaxOrderByAggregateInput
    _min?: EnrollmentMinOrderByAggregateInput
  }

  export type EnrollmentScalarWhereWithAggregatesInput = {
    AND?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    OR?: EnrollmentScalarWhereWithAggregatesInput[]
    NOT?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Enrollment"> | string
    orgId?: StringWithAggregatesFilter<"Enrollment"> | string
    institutionId?: StringWithAggregatesFilter<"Enrollment"> | string
    learnerId?: StringWithAggregatesFilter<"Enrollment"> | string
    program?: StringWithAggregatesFilter<"Enrollment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Enrollment"> | Date | string
  }

  export type TuitionInvoiceWhereInput = {
    AND?: TuitionInvoiceWhereInput | TuitionInvoiceWhereInput[]
    OR?: TuitionInvoiceWhereInput[]
    NOT?: TuitionInvoiceWhereInput | TuitionInvoiceWhereInput[]
    id?: StringFilter<"TuitionInvoice"> | string
    orgId?: StringFilter<"TuitionInvoice"> | string
    learnerId?: StringFilter<"TuitionInvoice"> | string
    amountMinor?: BigIntFilter<"TuitionInvoice"> | bigint | number
    currency?: StringFilter<"TuitionInvoice"> | string
    intentId?: StringNullableFilter<"TuitionInvoice"> | string | null
    dueAt?: DateTimeFilter<"TuitionInvoice"> | Date | string
    createdAt?: DateTimeFilter<"TuitionInvoice"> | Date | string
  }

  export type TuitionInvoiceOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    learnerId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    intentId?: SortOrderInput | SortOrder
    dueAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TuitionInvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TuitionInvoiceWhereInput | TuitionInvoiceWhereInput[]
    OR?: TuitionInvoiceWhereInput[]
    NOT?: TuitionInvoiceWhereInput | TuitionInvoiceWhereInput[]
    orgId?: StringFilter<"TuitionInvoice"> | string
    learnerId?: StringFilter<"TuitionInvoice"> | string
    amountMinor?: BigIntFilter<"TuitionInvoice"> | bigint | number
    currency?: StringFilter<"TuitionInvoice"> | string
    intentId?: StringNullableFilter<"TuitionInvoice"> | string | null
    dueAt?: DateTimeFilter<"TuitionInvoice"> | Date | string
    createdAt?: DateTimeFilter<"TuitionInvoice"> | Date | string
  }, "id">

  export type TuitionInvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    learnerId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    intentId?: SortOrderInput | SortOrder
    dueAt?: SortOrder
    createdAt?: SortOrder
    _count?: TuitionInvoiceCountOrderByAggregateInput
    _avg?: TuitionInvoiceAvgOrderByAggregateInput
    _max?: TuitionInvoiceMaxOrderByAggregateInput
    _min?: TuitionInvoiceMinOrderByAggregateInput
    _sum?: TuitionInvoiceSumOrderByAggregateInput
  }

  export type TuitionInvoiceScalarWhereWithAggregatesInput = {
    AND?: TuitionInvoiceScalarWhereWithAggregatesInput | TuitionInvoiceScalarWhereWithAggregatesInput[]
    OR?: TuitionInvoiceScalarWhereWithAggregatesInput[]
    NOT?: TuitionInvoiceScalarWhereWithAggregatesInput | TuitionInvoiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TuitionInvoice"> | string
    orgId?: StringWithAggregatesFilter<"TuitionInvoice"> | string
    learnerId?: StringWithAggregatesFilter<"TuitionInvoice"> | string
    amountMinor?: BigIntWithAggregatesFilter<"TuitionInvoice"> | bigint | number
    currency?: StringWithAggregatesFilter<"TuitionInvoice"> | string
    intentId?: StringNullableWithAggregatesFilter<"TuitionInvoice"> | string | null
    dueAt?: DateTimeWithAggregatesFilter<"TuitionInvoice"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"TuitionInvoice"> | Date | string
  }

  export type ScholarshipGrantWhereInput = {
    AND?: ScholarshipGrantWhereInput | ScholarshipGrantWhereInput[]
    OR?: ScholarshipGrantWhereInput[]
    NOT?: ScholarshipGrantWhereInput | ScholarshipGrantWhereInput[]
    id?: StringFilter<"ScholarshipGrant"> | string
    orgId?: StringFilter<"ScholarshipGrant"> | string
    learnerId?: StringFilter<"ScholarshipGrant"> | string
    amountMinor?: BigIntFilter<"ScholarshipGrant"> | bigint | number
    currency?: StringFilter<"ScholarshipGrant"> | string
    milestone?: StringFilter<"ScholarshipGrant"> | string
    status?: EnumScholarshipStatusFilter<"ScholarshipGrant"> | $Enums.ScholarshipStatus
    escrowIntentId?: StringNullableFilter<"ScholarshipGrant"> | string | null
    createdAt?: DateTimeFilter<"ScholarshipGrant"> | Date | string
  }

  export type ScholarshipGrantOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    learnerId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    milestone?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type ScholarshipGrantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScholarshipGrantWhereInput | ScholarshipGrantWhereInput[]
    OR?: ScholarshipGrantWhereInput[]
    NOT?: ScholarshipGrantWhereInput | ScholarshipGrantWhereInput[]
    orgId?: StringFilter<"ScholarshipGrant"> | string
    learnerId?: StringFilter<"ScholarshipGrant"> | string
    amountMinor?: BigIntFilter<"ScholarshipGrant"> | bigint | number
    currency?: StringFilter<"ScholarshipGrant"> | string
    milestone?: StringFilter<"ScholarshipGrant"> | string
    status?: EnumScholarshipStatusFilter<"ScholarshipGrant"> | $Enums.ScholarshipStatus
    escrowIntentId?: StringNullableFilter<"ScholarshipGrant"> | string | null
    createdAt?: DateTimeFilter<"ScholarshipGrant"> | Date | string
  }, "id">

  export type ScholarshipGrantOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    learnerId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    milestone?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ScholarshipGrantCountOrderByAggregateInput
    _avg?: ScholarshipGrantAvgOrderByAggregateInput
    _max?: ScholarshipGrantMaxOrderByAggregateInput
    _min?: ScholarshipGrantMinOrderByAggregateInput
    _sum?: ScholarshipGrantSumOrderByAggregateInput
  }

  export type ScholarshipGrantScalarWhereWithAggregatesInput = {
    AND?: ScholarshipGrantScalarWhereWithAggregatesInput | ScholarshipGrantScalarWhereWithAggregatesInput[]
    OR?: ScholarshipGrantScalarWhereWithAggregatesInput[]
    NOT?: ScholarshipGrantScalarWhereWithAggregatesInput | ScholarshipGrantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ScholarshipGrant"> | string
    orgId?: StringWithAggregatesFilter<"ScholarshipGrant"> | string
    learnerId?: StringWithAggregatesFilter<"ScholarshipGrant"> | string
    amountMinor?: BigIntWithAggregatesFilter<"ScholarshipGrant"> | bigint | number
    currency?: StringWithAggregatesFilter<"ScholarshipGrant"> | string
    milestone?: StringWithAggregatesFilter<"ScholarshipGrant"> | string
    status?: EnumScholarshipStatusWithAggregatesFilter<"ScholarshipGrant"> | $Enums.ScholarshipStatus
    escrowIntentId?: StringNullableWithAggregatesFilter<"ScholarshipGrant"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ScholarshipGrant"> | Date | string
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

  export type InstitutionCreateInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
    credentials?: CredentialCreateNestedManyWithoutInstitutionInput
    enrollments?: EnrollmentCreateNestedManyWithoutInstitutionInput
  }

  export type InstitutionUncheckedCreateInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
    credentials?: CredentialUncheckedCreateNestedManyWithoutInstitutionInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutInstitutionInput
  }

  export type InstitutionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: CredentialUpdateManyWithoutInstitutionNestedInput
    enrollments?: EnrollmentUpdateManyWithoutInstitutionNestedInput
  }

  export type InstitutionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: CredentialUncheckedUpdateManyWithoutInstitutionNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutInstitutionNestedInput
  }

  export type InstitutionCreateManyInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
  }

  export type InstitutionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstitutionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearnerCreateInput = {
    id: string
    orgId: string
    subjectHash: string
    createdAt?: Date | string
    credentials?: CredentialCreateNestedManyWithoutLearnerInput
    enrollments?: EnrollmentCreateNestedManyWithoutLearnerInput
  }

  export type LearnerUncheckedCreateInput = {
    id: string
    orgId: string
    subjectHash: string
    createdAt?: Date | string
    credentials?: CredentialUncheckedCreateNestedManyWithoutLearnerInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutLearnerInput
  }

  export type LearnerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: CredentialUpdateManyWithoutLearnerNestedInput
    enrollments?: EnrollmentUpdateManyWithoutLearnerNestedInput
  }

  export type LearnerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: CredentialUncheckedUpdateManyWithoutLearnerNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutLearnerNestedInput
  }

  export type LearnerCreateManyInput = {
    id: string
    orgId: string
    subjectHash: string
    createdAt?: Date | string
  }

  export type LearnerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearnerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CredentialCreateInput = {
    id: string
    orgId: string
    type: $Enums.CredentialType
    dataHash: string
    attestationId?: string | null
    status?: $Enums.CredentialStatus
    issuedAt?: Date | string
    expiresAt?: Date | string | null
    institution: InstitutionCreateNestedOneWithoutCredentialsInput
    learner: LearnerCreateNestedOneWithoutCredentialsInput
  }

  export type CredentialUncheckedCreateInput = {
    id: string
    orgId: string
    institutionId: string
    learnerId: string
    type: $Enums.CredentialType
    dataHash: string
    attestationId?: string | null
    status?: $Enums.CredentialStatus
    issuedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type CredentialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCredentialStatusFieldUpdateOperationsInput | $Enums.CredentialStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    institution?: InstitutionUpdateOneRequiredWithoutCredentialsNestedInput
    learner?: LearnerUpdateOneRequiredWithoutCredentialsNestedInput
  }

  export type CredentialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    institutionId?: StringFieldUpdateOperationsInput | string
    learnerId?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCredentialStatusFieldUpdateOperationsInput | $Enums.CredentialStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CredentialCreateManyInput = {
    id: string
    orgId: string
    institutionId: string
    learnerId: string
    type: $Enums.CredentialType
    dataHash: string
    attestationId?: string | null
    status?: $Enums.CredentialStatus
    issuedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type CredentialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCredentialStatusFieldUpdateOperationsInput | $Enums.CredentialStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CredentialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    institutionId?: StringFieldUpdateOperationsInput | string
    learnerId?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCredentialStatusFieldUpdateOperationsInput | $Enums.CredentialStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EnrollmentCreateInput = {
    id: string
    orgId: string
    program: string
    createdAt?: Date | string
    institution: InstitutionCreateNestedOneWithoutEnrollmentsInput
    learner: LearnerCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateInput = {
    id: string
    orgId: string
    institutionId: string
    learnerId: string
    program: string
    createdAt?: Date | string
  }

  export type EnrollmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    institution?: InstitutionUpdateOneRequiredWithoutEnrollmentsNestedInput
    learner?: LearnerUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    institutionId?: StringFieldUpdateOperationsInput | string
    learnerId?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentCreateManyInput = {
    id: string
    orgId: string
    institutionId: string
    learnerId: string
    program: string
    createdAt?: Date | string
  }

  export type EnrollmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    institutionId?: StringFieldUpdateOperationsInput | string
    learnerId?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TuitionInvoiceCreateInput = {
    id: string
    orgId: string
    learnerId: string
    amountMinor: bigint | number
    currency: string
    intentId?: string | null
    dueAt: Date | string
    createdAt?: Date | string
  }

  export type TuitionInvoiceUncheckedCreateInput = {
    id: string
    orgId: string
    learnerId: string
    amountMinor: bigint | number
    currency: string
    intentId?: string | null
    dueAt: Date | string
    createdAt?: Date | string
  }

  export type TuitionInvoiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    learnerId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TuitionInvoiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    learnerId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TuitionInvoiceCreateManyInput = {
    id: string
    orgId: string
    learnerId: string
    amountMinor: bigint | number
    currency: string
    intentId?: string | null
    dueAt: Date | string
    createdAt?: Date | string
  }

  export type TuitionInvoiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    learnerId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TuitionInvoiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    learnerId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    intentId?: NullableStringFieldUpdateOperationsInput | string | null
    dueAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScholarshipGrantCreateInput = {
    id: string
    orgId: string
    learnerId: string
    amountMinor: bigint | number
    currency: string
    milestone: string
    status?: $Enums.ScholarshipStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type ScholarshipGrantUncheckedCreateInput = {
    id: string
    orgId: string
    learnerId: string
    amountMinor: bigint | number
    currency: string
    milestone: string
    status?: $Enums.ScholarshipStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type ScholarshipGrantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    learnerId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    milestone?: StringFieldUpdateOperationsInput | string
    status?: EnumScholarshipStatusFieldUpdateOperationsInput | $Enums.ScholarshipStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScholarshipGrantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    learnerId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    milestone?: StringFieldUpdateOperationsInput | string
    status?: EnumScholarshipStatusFieldUpdateOperationsInput | $Enums.ScholarshipStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScholarshipGrantCreateManyInput = {
    id: string
    orgId: string
    learnerId: string
    amountMinor: bigint | number
    currency: string
    milestone: string
    status?: $Enums.ScholarshipStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type ScholarshipGrantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    learnerId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    milestone?: StringFieldUpdateOperationsInput | string
    status?: EnumScholarshipStatusFieldUpdateOperationsInput | $Enums.ScholarshipStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScholarshipGrantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    learnerId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    milestone?: StringFieldUpdateOperationsInput | string
    status?: EnumScholarshipStatusFieldUpdateOperationsInput | $Enums.ScholarshipStatus
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

  export type CredentialListRelationFilter = {
    every?: CredentialWhereInput
    some?: CredentialWhereInput
    none?: CredentialWhereInput
  }

  export type EnrollmentListRelationFilter = {
    every?: EnrollmentWhereInput
    some?: EnrollmentWhereInput
    none?: EnrollmentWhereInput
  }

  export type CredentialOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EnrollmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InstitutionCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type InstitutionMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type InstitutionMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type LearnerOrgIdSubjectHashCompoundUniqueInput = {
    orgId: string
    subjectHash: string
  }

  export type LearnerCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    subjectHash?: SortOrder
    createdAt?: SortOrder
  }

  export type LearnerMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    subjectHash?: SortOrder
    createdAt?: SortOrder
  }

  export type LearnerMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    subjectHash?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumCredentialTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CredentialType | EnumCredentialTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CredentialType[] | ListEnumCredentialTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CredentialType[] | ListEnumCredentialTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCredentialTypeFilter<$PrismaModel> | $Enums.CredentialType
  }

  export type EnumCredentialStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CredentialStatus | EnumCredentialStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CredentialStatus[] | ListEnumCredentialStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CredentialStatus[] | ListEnumCredentialStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCredentialStatusFilter<$PrismaModel> | $Enums.CredentialStatus
  }

  export type InstitutionRelationFilter = {
    is?: InstitutionWhereInput
    isNot?: InstitutionWhereInput
  }

  export type LearnerRelationFilter = {
    is?: LearnerWhereInput
    isNot?: LearnerWhereInput
  }

  export type CredentialCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    institutionId?: SortOrder
    learnerId?: SortOrder
    type?: SortOrder
    dataHash?: SortOrder
    attestationId?: SortOrder
    status?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type CredentialMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    institutionId?: SortOrder
    learnerId?: SortOrder
    type?: SortOrder
    dataHash?: SortOrder
    attestationId?: SortOrder
    status?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type CredentialMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    institutionId?: SortOrder
    learnerId?: SortOrder
    type?: SortOrder
    dataHash?: SortOrder
    attestationId?: SortOrder
    status?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type EnumCredentialTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CredentialType | EnumCredentialTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CredentialType[] | ListEnumCredentialTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CredentialType[] | ListEnumCredentialTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCredentialTypeWithAggregatesFilter<$PrismaModel> | $Enums.CredentialType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCredentialTypeFilter<$PrismaModel>
    _max?: NestedEnumCredentialTypeFilter<$PrismaModel>
  }

  export type EnumCredentialStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CredentialStatus | EnumCredentialStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CredentialStatus[] | ListEnumCredentialStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CredentialStatus[] | ListEnumCredentialStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCredentialStatusWithAggregatesFilter<$PrismaModel> | $Enums.CredentialStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCredentialStatusFilter<$PrismaModel>
    _max?: NestedEnumCredentialStatusFilter<$PrismaModel>
  }

  export type EnrollmentCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    institutionId?: SortOrder
    learnerId?: SortOrder
    program?: SortOrder
    createdAt?: SortOrder
  }

  export type EnrollmentMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    institutionId?: SortOrder
    learnerId?: SortOrder
    program?: SortOrder
    createdAt?: SortOrder
  }

  export type EnrollmentMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    institutionId?: SortOrder
    learnerId?: SortOrder
    program?: SortOrder
    createdAt?: SortOrder
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

  export type TuitionInvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    learnerId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    intentId?: SortOrder
    dueAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TuitionInvoiceAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type TuitionInvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    learnerId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    intentId?: SortOrder
    dueAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TuitionInvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    learnerId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    intentId?: SortOrder
    dueAt?: SortOrder
    createdAt?: SortOrder
  }

  export type TuitionInvoiceSumOrderByAggregateInput = {
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

  export type EnumScholarshipStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ScholarshipStatus | EnumScholarshipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScholarshipStatus[] | ListEnumScholarshipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScholarshipStatus[] | ListEnumScholarshipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScholarshipStatusFilter<$PrismaModel> | $Enums.ScholarshipStatus
  }

  export type ScholarshipGrantCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    learnerId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    milestone?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ScholarshipGrantAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type ScholarshipGrantMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    learnerId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    milestone?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ScholarshipGrantMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    learnerId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    milestone?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ScholarshipGrantSumOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type EnumScholarshipStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScholarshipStatus | EnumScholarshipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScholarshipStatus[] | ListEnumScholarshipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScholarshipStatus[] | ListEnumScholarshipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScholarshipStatusWithAggregatesFilter<$PrismaModel> | $Enums.ScholarshipStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScholarshipStatusFilter<$PrismaModel>
    _max?: NestedEnumScholarshipStatusFilter<$PrismaModel>
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

  export type CredentialCreateNestedManyWithoutInstitutionInput = {
    create?: XOR<CredentialCreateWithoutInstitutionInput, CredentialUncheckedCreateWithoutInstitutionInput> | CredentialCreateWithoutInstitutionInput[] | CredentialUncheckedCreateWithoutInstitutionInput[]
    connectOrCreate?: CredentialCreateOrConnectWithoutInstitutionInput | CredentialCreateOrConnectWithoutInstitutionInput[]
    createMany?: CredentialCreateManyInstitutionInputEnvelope
    connect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
  }

  export type EnrollmentCreateNestedManyWithoutInstitutionInput = {
    create?: XOR<EnrollmentCreateWithoutInstitutionInput, EnrollmentUncheckedCreateWithoutInstitutionInput> | EnrollmentCreateWithoutInstitutionInput[] | EnrollmentUncheckedCreateWithoutInstitutionInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutInstitutionInput | EnrollmentCreateOrConnectWithoutInstitutionInput[]
    createMany?: EnrollmentCreateManyInstitutionInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type CredentialUncheckedCreateNestedManyWithoutInstitutionInput = {
    create?: XOR<CredentialCreateWithoutInstitutionInput, CredentialUncheckedCreateWithoutInstitutionInput> | CredentialCreateWithoutInstitutionInput[] | CredentialUncheckedCreateWithoutInstitutionInput[]
    connectOrCreate?: CredentialCreateOrConnectWithoutInstitutionInput | CredentialCreateOrConnectWithoutInstitutionInput[]
    createMany?: CredentialCreateManyInstitutionInputEnvelope
    connect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutInstitutionInput = {
    create?: XOR<EnrollmentCreateWithoutInstitutionInput, EnrollmentUncheckedCreateWithoutInstitutionInput> | EnrollmentCreateWithoutInstitutionInput[] | EnrollmentUncheckedCreateWithoutInstitutionInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutInstitutionInput | EnrollmentCreateOrConnectWithoutInstitutionInput[]
    createMany?: EnrollmentCreateManyInstitutionInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type CredentialUpdateManyWithoutInstitutionNestedInput = {
    create?: XOR<CredentialCreateWithoutInstitutionInput, CredentialUncheckedCreateWithoutInstitutionInput> | CredentialCreateWithoutInstitutionInput[] | CredentialUncheckedCreateWithoutInstitutionInput[]
    connectOrCreate?: CredentialCreateOrConnectWithoutInstitutionInput | CredentialCreateOrConnectWithoutInstitutionInput[]
    upsert?: CredentialUpsertWithWhereUniqueWithoutInstitutionInput | CredentialUpsertWithWhereUniqueWithoutInstitutionInput[]
    createMany?: CredentialCreateManyInstitutionInputEnvelope
    set?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    disconnect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    delete?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    connect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    update?: CredentialUpdateWithWhereUniqueWithoutInstitutionInput | CredentialUpdateWithWhereUniqueWithoutInstitutionInput[]
    updateMany?: CredentialUpdateManyWithWhereWithoutInstitutionInput | CredentialUpdateManyWithWhereWithoutInstitutionInput[]
    deleteMany?: CredentialScalarWhereInput | CredentialScalarWhereInput[]
  }

  export type EnrollmentUpdateManyWithoutInstitutionNestedInput = {
    create?: XOR<EnrollmentCreateWithoutInstitutionInput, EnrollmentUncheckedCreateWithoutInstitutionInput> | EnrollmentCreateWithoutInstitutionInput[] | EnrollmentUncheckedCreateWithoutInstitutionInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutInstitutionInput | EnrollmentCreateOrConnectWithoutInstitutionInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutInstitutionInput | EnrollmentUpsertWithWhereUniqueWithoutInstitutionInput[]
    createMany?: EnrollmentCreateManyInstitutionInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutInstitutionInput | EnrollmentUpdateWithWhereUniqueWithoutInstitutionInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutInstitutionInput | EnrollmentUpdateManyWithWhereWithoutInstitutionInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type CredentialUncheckedUpdateManyWithoutInstitutionNestedInput = {
    create?: XOR<CredentialCreateWithoutInstitutionInput, CredentialUncheckedCreateWithoutInstitutionInput> | CredentialCreateWithoutInstitutionInput[] | CredentialUncheckedCreateWithoutInstitutionInput[]
    connectOrCreate?: CredentialCreateOrConnectWithoutInstitutionInput | CredentialCreateOrConnectWithoutInstitutionInput[]
    upsert?: CredentialUpsertWithWhereUniqueWithoutInstitutionInput | CredentialUpsertWithWhereUniqueWithoutInstitutionInput[]
    createMany?: CredentialCreateManyInstitutionInputEnvelope
    set?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    disconnect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    delete?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    connect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    update?: CredentialUpdateWithWhereUniqueWithoutInstitutionInput | CredentialUpdateWithWhereUniqueWithoutInstitutionInput[]
    updateMany?: CredentialUpdateManyWithWhereWithoutInstitutionInput | CredentialUpdateManyWithWhereWithoutInstitutionInput[]
    deleteMany?: CredentialScalarWhereInput | CredentialScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutInstitutionNestedInput = {
    create?: XOR<EnrollmentCreateWithoutInstitutionInput, EnrollmentUncheckedCreateWithoutInstitutionInput> | EnrollmentCreateWithoutInstitutionInput[] | EnrollmentUncheckedCreateWithoutInstitutionInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutInstitutionInput | EnrollmentCreateOrConnectWithoutInstitutionInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutInstitutionInput | EnrollmentUpsertWithWhereUniqueWithoutInstitutionInput[]
    createMany?: EnrollmentCreateManyInstitutionInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutInstitutionInput | EnrollmentUpdateWithWhereUniqueWithoutInstitutionInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutInstitutionInput | EnrollmentUpdateManyWithWhereWithoutInstitutionInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type CredentialCreateNestedManyWithoutLearnerInput = {
    create?: XOR<CredentialCreateWithoutLearnerInput, CredentialUncheckedCreateWithoutLearnerInput> | CredentialCreateWithoutLearnerInput[] | CredentialUncheckedCreateWithoutLearnerInput[]
    connectOrCreate?: CredentialCreateOrConnectWithoutLearnerInput | CredentialCreateOrConnectWithoutLearnerInput[]
    createMany?: CredentialCreateManyLearnerInputEnvelope
    connect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
  }

  export type EnrollmentCreateNestedManyWithoutLearnerInput = {
    create?: XOR<EnrollmentCreateWithoutLearnerInput, EnrollmentUncheckedCreateWithoutLearnerInput> | EnrollmentCreateWithoutLearnerInput[] | EnrollmentUncheckedCreateWithoutLearnerInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutLearnerInput | EnrollmentCreateOrConnectWithoutLearnerInput[]
    createMany?: EnrollmentCreateManyLearnerInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type CredentialUncheckedCreateNestedManyWithoutLearnerInput = {
    create?: XOR<CredentialCreateWithoutLearnerInput, CredentialUncheckedCreateWithoutLearnerInput> | CredentialCreateWithoutLearnerInput[] | CredentialUncheckedCreateWithoutLearnerInput[]
    connectOrCreate?: CredentialCreateOrConnectWithoutLearnerInput | CredentialCreateOrConnectWithoutLearnerInput[]
    createMany?: CredentialCreateManyLearnerInputEnvelope
    connect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutLearnerInput = {
    create?: XOR<EnrollmentCreateWithoutLearnerInput, EnrollmentUncheckedCreateWithoutLearnerInput> | EnrollmentCreateWithoutLearnerInput[] | EnrollmentUncheckedCreateWithoutLearnerInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutLearnerInput | EnrollmentCreateOrConnectWithoutLearnerInput[]
    createMany?: EnrollmentCreateManyLearnerInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type CredentialUpdateManyWithoutLearnerNestedInput = {
    create?: XOR<CredentialCreateWithoutLearnerInput, CredentialUncheckedCreateWithoutLearnerInput> | CredentialCreateWithoutLearnerInput[] | CredentialUncheckedCreateWithoutLearnerInput[]
    connectOrCreate?: CredentialCreateOrConnectWithoutLearnerInput | CredentialCreateOrConnectWithoutLearnerInput[]
    upsert?: CredentialUpsertWithWhereUniqueWithoutLearnerInput | CredentialUpsertWithWhereUniqueWithoutLearnerInput[]
    createMany?: CredentialCreateManyLearnerInputEnvelope
    set?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    disconnect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    delete?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    connect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    update?: CredentialUpdateWithWhereUniqueWithoutLearnerInput | CredentialUpdateWithWhereUniqueWithoutLearnerInput[]
    updateMany?: CredentialUpdateManyWithWhereWithoutLearnerInput | CredentialUpdateManyWithWhereWithoutLearnerInput[]
    deleteMany?: CredentialScalarWhereInput | CredentialScalarWhereInput[]
  }

  export type EnrollmentUpdateManyWithoutLearnerNestedInput = {
    create?: XOR<EnrollmentCreateWithoutLearnerInput, EnrollmentUncheckedCreateWithoutLearnerInput> | EnrollmentCreateWithoutLearnerInput[] | EnrollmentUncheckedCreateWithoutLearnerInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutLearnerInput | EnrollmentCreateOrConnectWithoutLearnerInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutLearnerInput | EnrollmentUpsertWithWhereUniqueWithoutLearnerInput[]
    createMany?: EnrollmentCreateManyLearnerInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutLearnerInput | EnrollmentUpdateWithWhereUniqueWithoutLearnerInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutLearnerInput | EnrollmentUpdateManyWithWhereWithoutLearnerInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type CredentialUncheckedUpdateManyWithoutLearnerNestedInput = {
    create?: XOR<CredentialCreateWithoutLearnerInput, CredentialUncheckedCreateWithoutLearnerInput> | CredentialCreateWithoutLearnerInput[] | CredentialUncheckedCreateWithoutLearnerInput[]
    connectOrCreate?: CredentialCreateOrConnectWithoutLearnerInput | CredentialCreateOrConnectWithoutLearnerInput[]
    upsert?: CredentialUpsertWithWhereUniqueWithoutLearnerInput | CredentialUpsertWithWhereUniqueWithoutLearnerInput[]
    createMany?: CredentialCreateManyLearnerInputEnvelope
    set?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    disconnect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    delete?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    connect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    update?: CredentialUpdateWithWhereUniqueWithoutLearnerInput | CredentialUpdateWithWhereUniqueWithoutLearnerInput[]
    updateMany?: CredentialUpdateManyWithWhereWithoutLearnerInput | CredentialUpdateManyWithWhereWithoutLearnerInput[]
    deleteMany?: CredentialScalarWhereInput | CredentialScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutLearnerNestedInput = {
    create?: XOR<EnrollmentCreateWithoutLearnerInput, EnrollmentUncheckedCreateWithoutLearnerInput> | EnrollmentCreateWithoutLearnerInput[] | EnrollmentUncheckedCreateWithoutLearnerInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutLearnerInput | EnrollmentCreateOrConnectWithoutLearnerInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutLearnerInput | EnrollmentUpsertWithWhereUniqueWithoutLearnerInput[]
    createMany?: EnrollmentCreateManyLearnerInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutLearnerInput | EnrollmentUpdateWithWhereUniqueWithoutLearnerInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutLearnerInput | EnrollmentUpdateManyWithWhereWithoutLearnerInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type InstitutionCreateNestedOneWithoutCredentialsInput = {
    create?: XOR<InstitutionCreateWithoutCredentialsInput, InstitutionUncheckedCreateWithoutCredentialsInput>
    connectOrCreate?: InstitutionCreateOrConnectWithoutCredentialsInput
    connect?: InstitutionWhereUniqueInput
  }

  export type LearnerCreateNestedOneWithoutCredentialsInput = {
    create?: XOR<LearnerCreateWithoutCredentialsInput, LearnerUncheckedCreateWithoutCredentialsInput>
    connectOrCreate?: LearnerCreateOrConnectWithoutCredentialsInput
    connect?: LearnerWhereUniqueInput
  }

  export type EnumCredentialTypeFieldUpdateOperationsInput = {
    set?: $Enums.CredentialType
  }

  export type EnumCredentialStatusFieldUpdateOperationsInput = {
    set?: $Enums.CredentialStatus
  }

  export type InstitutionUpdateOneRequiredWithoutCredentialsNestedInput = {
    create?: XOR<InstitutionCreateWithoutCredentialsInput, InstitutionUncheckedCreateWithoutCredentialsInput>
    connectOrCreate?: InstitutionCreateOrConnectWithoutCredentialsInput
    upsert?: InstitutionUpsertWithoutCredentialsInput
    connect?: InstitutionWhereUniqueInput
    update?: XOR<XOR<InstitutionUpdateToOneWithWhereWithoutCredentialsInput, InstitutionUpdateWithoutCredentialsInput>, InstitutionUncheckedUpdateWithoutCredentialsInput>
  }

  export type LearnerUpdateOneRequiredWithoutCredentialsNestedInput = {
    create?: XOR<LearnerCreateWithoutCredentialsInput, LearnerUncheckedCreateWithoutCredentialsInput>
    connectOrCreate?: LearnerCreateOrConnectWithoutCredentialsInput
    upsert?: LearnerUpsertWithoutCredentialsInput
    connect?: LearnerWhereUniqueInput
    update?: XOR<XOR<LearnerUpdateToOneWithWhereWithoutCredentialsInput, LearnerUpdateWithoutCredentialsInput>, LearnerUncheckedUpdateWithoutCredentialsInput>
  }

  export type InstitutionCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<InstitutionCreateWithoutEnrollmentsInput, InstitutionUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: InstitutionCreateOrConnectWithoutEnrollmentsInput
    connect?: InstitutionWhereUniqueInput
  }

  export type LearnerCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<LearnerCreateWithoutEnrollmentsInput, LearnerUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: LearnerCreateOrConnectWithoutEnrollmentsInput
    connect?: LearnerWhereUniqueInput
  }

  export type InstitutionUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<InstitutionCreateWithoutEnrollmentsInput, InstitutionUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: InstitutionCreateOrConnectWithoutEnrollmentsInput
    upsert?: InstitutionUpsertWithoutEnrollmentsInput
    connect?: InstitutionWhereUniqueInput
    update?: XOR<XOR<InstitutionUpdateToOneWithWhereWithoutEnrollmentsInput, InstitutionUpdateWithoutEnrollmentsInput>, InstitutionUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type LearnerUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<LearnerCreateWithoutEnrollmentsInput, LearnerUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: LearnerCreateOrConnectWithoutEnrollmentsInput
    upsert?: LearnerUpsertWithoutEnrollmentsInput
    connect?: LearnerWhereUniqueInput
    update?: XOR<XOR<LearnerUpdateToOneWithWhereWithoutEnrollmentsInput, LearnerUpdateWithoutEnrollmentsInput>, LearnerUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumScholarshipStatusFieldUpdateOperationsInput = {
    set?: $Enums.ScholarshipStatus
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

  export type NestedEnumCredentialTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CredentialType | EnumCredentialTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CredentialType[] | ListEnumCredentialTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CredentialType[] | ListEnumCredentialTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCredentialTypeFilter<$PrismaModel> | $Enums.CredentialType
  }

  export type NestedEnumCredentialStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CredentialStatus | EnumCredentialStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CredentialStatus[] | ListEnumCredentialStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CredentialStatus[] | ListEnumCredentialStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCredentialStatusFilter<$PrismaModel> | $Enums.CredentialStatus
  }

  export type NestedEnumCredentialTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CredentialType | EnumCredentialTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CredentialType[] | ListEnumCredentialTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CredentialType[] | ListEnumCredentialTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCredentialTypeWithAggregatesFilter<$PrismaModel> | $Enums.CredentialType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCredentialTypeFilter<$PrismaModel>
    _max?: NestedEnumCredentialTypeFilter<$PrismaModel>
  }

  export type NestedEnumCredentialStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CredentialStatus | EnumCredentialStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CredentialStatus[] | ListEnumCredentialStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CredentialStatus[] | ListEnumCredentialStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCredentialStatusWithAggregatesFilter<$PrismaModel> | $Enums.CredentialStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCredentialStatusFilter<$PrismaModel>
    _max?: NestedEnumCredentialStatusFilter<$PrismaModel>
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

  export type NestedEnumScholarshipStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ScholarshipStatus | EnumScholarshipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScholarshipStatus[] | ListEnumScholarshipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScholarshipStatus[] | ListEnumScholarshipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScholarshipStatusFilter<$PrismaModel> | $Enums.ScholarshipStatus
  }

  export type NestedEnumScholarshipStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScholarshipStatus | EnumScholarshipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ScholarshipStatus[] | ListEnumScholarshipStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScholarshipStatus[] | ListEnumScholarshipStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumScholarshipStatusWithAggregatesFilter<$PrismaModel> | $Enums.ScholarshipStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScholarshipStatusFilter<$PrismaModel>
    _max?: NestedEnumScholarshipStatusFilter<$PrismaModel>
  }

  export type CredentialCreateWithoutInstitutionInput = {
    id: string
    orgId: string
    type: $Enums.CredentialType
    dataHash: string
    attestationId?: string | null
    status?: $Enums.CredentialStatus
    issuedAt?: Date | string
    expiresAt?: Date | string | null
    learner: LearnerCreateNestedOneWithoutCredentialsInput
  }

  export type CredentialUncheckedCreateWithoutInstitutionInput = {
    id: string
    orgId: string
    learnerId: string
    type: $Enums.CredentialType
    dataHash: string
    attestationId?: string | null
    status?: $Enums.CredentialStatus
    issuedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type CredentialCreateOrConnectWithoutInstitutionInput = {
    where: CredentialWhereUniqueInput
    create: XOR<CredentialCreateWithoutInstitutionInput, CredentialUncheckedCreateWithoutInstitutionInput>
  }

  export type CredentialCreateManyInstitutionInputEnvelope = {
    data: CredentialCreateManyInstitutionInput | CredentialCreateManyInstitutionInput[]
    skipDuplicates?: boolean
  }

  export type EnrollmentCreateWithoutInstitutionInput = {
    id: string
    orgId: string
    program: string
    createdAt?: Date | string
    learner: LearnerCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutInstitutionInput = {
    id: string
    orgId: string
    learnerId: string
    program: string
    createdAt?: Date | string
  }

  export type EnrollmentCreateOrConnectWithoutInstitutionInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutInstitutionInput, EnrollmentUncheckedCreateWithoutInstitutionInput>
  }

  export type EnrollmentCreateManyInstitutionInputEnvelope = {
    data: EnrollmentCreateManyInstitutionInput | EnrollmentCreateManyInstitutionInput[]
    skipDuplicates?: boolean
  }

  export type CredentialUpsertWithWhereUniqueWithoutInstitutionInput = {
    where: CredentialWhereUniqueInput
    update: XOR<CredentialUpdateWithoutInstitutionInput, CredentialUncheckedUpdateWithoutInstitutionInput>
    create: XOR<CredentialCreateWithoutInstitutionInput, CredentialUncheckedCreateWithoutInstitutionInput>
  }

  export type CredentialUpdateWithWhereUniqueWithoutInstitutionInput = {
    where: CredentialWhereUniqueInput
    data: XOR<CredentialUpdateWithoutInstitutionInput, CredentialUncheckedUpdateWithoutInstitutionInput>
  }

  export type CredentialUpdateManyWithWhereWithoutInstitutionInput = {
    where: CredentialScalarWhereInput
    data: XOR<CredentialUpdateManyMutationInput, CredentialUncheckedUpdateManyWithoutInstitutionInput>
  }

  export type CredentialScalarWhereInput = {
    AND?: CredentialScalarWhereInput | CredentialScalarWhereInput[]
    OR?: CredentialScalarWhereInput[]
    NOT?: CredentialScalarWhereInput | CredentialScalarWhereInput[]
    id?: StringFilter<"Credential"> | string
    orgId?: StringFilter<"Credential"> | string
    institutionId?: StringFilter<"Credential"> | string
    learnerId?: StringFilter<"Credential"> | string
    type?: EnumCredentialTypeFilter<"Credential"> | $Enums.CredentialType
    dataHash?: StringFilter<"Credential"> | string
    attestationId?: StringNullableFilter<"Credential"> | string | null
    status?: EnumCredentialStatusFilter<"Credential"> | $Enums.CredentialStatus
    issuedAt?: DateTimeFilter<"Credential"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Credential"> | Date | string | null
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutInstitutionInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutInstitutionInput, EnrollmentUncheckedUpdateWithoutInstitutionInput>
    create: XOR<EnrollmentCreateWithoutInstitutionInput, EnrollmentUncheckedCreateWithoutInstitutionInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutInstitutionInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutInstitutionInput, EnrollmentUncheckedUpdateWithoutInstitutionInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutInstitutionInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutInstitutionInput>
  }

  export type EnrollmentScalarWhereInput = {
    AND?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    OR?: EnrollmentScalarWhereInput[]
    NOT?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    id?: StringFilter<"Enrollment"> | string
    orgId?: StringFilter<"Enrollment"> | string
    institutionId?: StringFilter<"Enrollment"> | string
    learnerId?: StringFilter<"Enrollment"> | string
    program?: StringFilter<"Enrollment"> | string
    createdAt?: DateTimeFilter<"Enrollment"> | Date | string
  }

  export type CredentialCreateWithoutLearnerInput = {
    id: string
    orgId: string
    type: $Enums.CredentialType
    dataHash: string
    attestationId?: string | null
    status?: $Enums.CredentialStatus
    issuedAt?: Date | string
    expiresAt?: Date | string | null
    institution: InstitutionCreateNestedOneWithoutCredentialsInput
  }

  export type CredentialUncheckedCreateWithoutLearnerInput = {
    id: string
    orgId: string
    institutionId: string
    type: $Enums.CredentialType
    dataHash: string
    attestationId?: string | null
    status?: $Enums.CredentialStatus
    issuedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type CredentialCreateOrConnectWithoutLearnerInput = {
    where: CredentialWhereUniqueInput
    create: XOR<CredentialCreateWithoutLearnerInput, CredentialUncheckedCreateWithoutLearnerInput>
  }

  export type CredentialCreateManyLearnerInputEnvelope = {
    data: CredentialCreateManyLearnerInput | CredentialCreateManyLearnerInput[]
    skipDuplicates?: boolean
  }

  export type EnrollmentCreateWithoutLearnerInput = {
    id: string
    orgId: string
    program: string
    createdAt?: Date | string
    institution: InstitutionCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutLearnerInput = {
    id: string
    orgId: string
    institutionId: string
    program: string
    createdAt?: Date | string
  }

  export type EnrollmentCreateOrConnectWithoutLearnerInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutLearnerInput, EnrollmentUncheckedCreateWithoutLearnerInput>
  }

  export type EnrollmentCreateManyLearnerInputEnvelope = {
    data: EnrollmentCreateManyLearnerInput | EnrollmentCreateManyLearnerInput[]
    skipDuplicates?: boolean
  }

  export type CredentialUpsertWithWhereUniqueWithoutLearnerInput = {
    where: CredentialWhereUniqueInput
    update: XOR<CredentialUpdateWithoutLearnerInput, CredentialUncheckedUpdateWithoutLearnerInput>
    create: XOR<CredentialCreateWithoutLearnerInput, CredentialUncheckedCreateWithoutLearnerInput>
  }

  export type CredentialUpdateWithWhereUniqueWithoutLearnerInput = {
    where: CredentialWhereUniqueInput
    data: XOR<CredentialUpdateWithoutLearnerInput, CredentialUncheckedUpdateWithoutLearnerInput>
  }

  export type CredentialUpdateManyWithWhereWithoutLearnerInput = {
    where: CredentialScalarWhereInput
    data: XOR<CredentialUpdateManyMutationInput, CredentialUncheckedUpdateManyWithoutLearnerInput>
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutLearnerInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutLearnerInput, EnrollmentUncheckedUpdateWithoutLearnerInput>
    create: XOR<EnrollmentCreateWithoutLearnerInput, EnrollmentUncheckedCreateWithoutLearnerInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutLearnerInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutLearnerInput, EnrollmentUncheckedUpdateWithoutLearnerInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutLearnerInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutLearnerInput>
  }

  export type InstitutionCreateWithoutCredentialsInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
    enrollments?: EnrollmentCreateNestedManyWithoutInstitutionInput
  }

  export type InstitutionUncheckedCreateWithoutCredentialsInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutInstitutionInput
  }

  export type InstitutionCreateOrConnectWithoutCredentialsInput = {
    where: InstitutionWhereUniqueInput
    create: XOR<InstitutionCreateWithoutCredentialsInput, InstitutionUncheckedCreateWithoutCredentialsInput>
  }

  export type LearnerCreateWithoutCredentialsInput = {
    id: string
    orgId: string
    subjectHash: string
    createdAt?: Date | string
    enrollments?: EnrollmentCreateNestedManyWithoutLearnerInput
  }

  export type LearnerUncheckedCreateWithoutCredentialsInput = {
    id: string
    orgId: string
    subjectHash: string
    createdAt?: Date | string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutLearnerInput
  }

  export type LearnerCreateOrConnectWithoutCredentialsInput = {
    where: LearnerWhereUniqueInput
    create: XOR<LearnerCreateWithoutCredentialsInput, LearnerUncheckedCreateWithoutCredentialsInput>
  }

  export type InstitutionUpsertWithoutCredentialsInput = {
    update: XOR<InstitutionUpdateWithoutCredentialsInput, InstitutionUncheckedUpdateWithoutCredentialsInput>
    create: XOR<InstitutionCreateWithoutCredentialsInput, InstitutionUncheckedCreateWithoutCredentialsInput>
    where?: InstitutionWhereInput
  }

  export type InstitutionUpdateToOneWithWhereWithoutCredentialsInput = {
    where?: InstitutionWhereInput
    data: XOR<InstitutionUpdateWithoutCredentialsInput, InstitutionUncheckedUpdateWithoutCredentialsInput>
  }

  export type InstitutionUpdateWithoutCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUpdateManyWithoutInstitutionNestedInput
  }

  export type InstitutionUncheckedUpdateWithoutCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutInstitutionNestedInput
  }

  export type LearnerUpsertWithoutCredentialsInput = {
    update: XOR<LearnerUpdateWithoutCredentialsInput, LearnerUncheckedUpdateWithoutCredentialsInput>
    create: XOR<LearnerCreateWithoutCredentialsInput, LearnerUncheckedCreateWithoutCredentialsInput>
    where?: LearnerWhereInput
  }

  export type LearnerUpdateToOneWithWhereWithoutCredentialsInput = {
    where?: LearnerWhereInput
    data: XOR<LearnerUpdateWithoutCredentialsInput, LearnerUncheckedUpdateWithoutCredentialsInput>
  }

  export type LearnerUpdateWithoutCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUpdateManyWithoutLearnerNestedInput
  }

  export type LearnerUncheckedUpdateWithoutCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutLearnerNestedInput
  }

  export type InstitutionCreateWithoutEnrollmentsInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
    credentials?: CredentialCreateNestedManyWithoutInstitutionInput
  }

  export type InstitutionUncheckedCreateWithoutEnrollmentsInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
    credentials?: CredentialUncheckedCreateNestedManyWithoutInstitutionInput
  }

  export type InstitutionCreateOrConnectWithoutEnrollmentsInput = {
    where: InstitutionWhereUniqueInput
    create: XOR<InstitutionCreateWithoutEnrollmentsInput, InstitutionUncheckedCreateWithoutEnrollmentsInput>
  }

  export type LearnerCreateWithoutEnrollmentsInput = {
    id: string
    orgId: string
    subjectHash: string
    createdAt?: Date | string
    credentials?: CredentialCreateNestedManyWithoutLearnerInput
  }

  export type LearnerUncheckedCreateWithoutEnrollmentsInput = {
    id: string
    orgId: string
    subjectHash: string
    createdAt?: Date | string
    credentials?: CredentialUncheckedCreateNestedManyWithoutLearnerInput
  }

  export type LearnerCreateOrConnectWithoutEnrollmentsInput = {
    where: LearnerWhereUniqueInput
    create: XOR<LearnerCreateWithoutEnrollmentsInput, LearnerUncheckedCreateWithoutEnrollmentsInput>
  }

  export type InstitutionUpsertWithoutEnrollmentsInput = {
    update: XOR<InstitutionUpdateWithoutEnrollmentsInput, InstitutionUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<InstitutionCreateWithoutEnrollmentsInput, InstitutionUncheckedCreateWithoutEnrollmentsInput>
    where?: InstitutionWhereInput
  }

  export type InstitutionUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: InstitutionWhereInput
    data: XOR<InstitutionUpdateWithoutEnrollmentsInput, InstitutionUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type InstitutionUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: CredentialUpdateManyWithoutInstitutionNestedInput
  }

  export type InstitutionUncheckedUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: CredentialUncheckedUpdateManyWithoutInstitutionNestedInput
  }

  export type LearnerUpsertWithoutEnrollmentsInput = {
    update: XOR<LearnerUpdateWithoutEnrollmentsInput, LearnerUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<LearnerCreateWithoutEnrollmentsInput, LearnerUncheckedCreateWithoutEnrollmentsInput>
    where?: LearnerWhereInput
  }

  export type LearnerUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: LearnerWhereInput
    data: XOR<LearnerUpdateWithoutEnrollmentsInput, LearnerUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type LearnerUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: CredentialUpdateManyWithoutLearnerNestedInput
  }

  export type LearnerUncheckedUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    credentials?: CredentialUncheckedUpdateManyWithoutLearnerNestedInput
  }

  export type CredentialCreateManyInstitutionInput = {
    id: string
    orgId: string
    learnerId: string
    type: $Enums.CredentialType
    dataHash: string
    attestationId?: string | null
    status?: $Enums.CredentialStatus
    issuedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type EnrollmentCreateManyInstitutionInput = {
    id: string
    orgId: string
    learnerId: string
    program: string
    createdAt?: Date | string
  }

  export type CredentialUpdateWithoutInstitutionInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCredentialStatusFieldUpdateOperationsInput | $Enums.CredentialStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    learner?: LearnerUpdateOneRequiredWithoutCredentialsNestedInput
  }

  export type CredentialUncheckedUpdateWithoutInstitutionInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    learnerId?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCredentialStatusFieldUpdateOperationsInput | $Enums.CredentialStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CredentialUncheckedUpdateManyWithoutInstitutionInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    learnerId?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCredentialStatusFieldUpdateOperationsInput | $Enums.CredentialStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EnrollmentUpdateWithoutInstitutionInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    learner?: LearnerUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutInstitutionInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    learnerId?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUncheckedUpdateManyWithoutInstitutionInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    learnerId?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CredentialCreateManyLearnerInput = {
    id: string
    orgId: string
    institutionId: string
    type: $Enums.CredentialType
    dataHash: string
    attestationId?: string | null
    status?: $Enums.CredentialStatus
    issuedAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type EnrollmentCreateManyLearnerInput = {
    id: string
    orgId: string
    institutionId: string
    program: string
    createdAt?: Date | string
  }

  export type CredentialUpdateWithoutLearnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCredentialStatusFieldUpdateOperationsInput | $Enums.CredentialStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    institution?: InstitutionUpdateOneRequiredWithoutCredentialsNestedInput
  }

  export type CredentialUncheckedUpdateWithoutLearnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    institutionId?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCredentialStatusFieldUpdateOperationsInput | $Enums.CredentialStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CredentialUncheckedUpdateManyWithoutLearnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    institutionId?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumCredentialStatusFieldUpdateOperationsInput | $Enums.CredentialStatus
    issuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EnrollmentUpdateWithoutLearnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    institution?: InstitutionUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutLearnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    institutionId?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUncheckedUpdateManyWithoutLearnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    institutionId?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use InstitutionCountOutputTypeDefaultArgs instead
     */
    export type InstitutionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InstitutionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LearnerCountOutputTypeDefaultArgs instead
     */
    export type LearnerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LearnerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventOutboxDefaultArgs instead
     */
    export type EventOutboxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventOutboxDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InstitutionDefaultArgs instead
     */
    export type InstitutionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InstitutionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LearnerDefaultArgs instead
     */
    export type LearnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LearnerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CredentialDefaultArgs instead
     */
    export type CredentialArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CredentialDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EnrollmentDefaultArgs instead
     */
    export type EnrollmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EnrollmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TuitionInvoiceDefaultArgs instead
     */
    export type TuitionInvoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TuitionInvoiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ScholarshipGrantDefaultArgs instead
     */
    export type ScholarshipGrantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ScholarshipGrantDefaultArgs<ExtArgs>

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