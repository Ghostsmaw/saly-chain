
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
 * Model Provider
 * 
 */
export type Provider = $Result.DefaultSelection<Prisma.$ProviderPayload>
/**
 * Model Payer
 * 
 */
export type Payer = $Result.DefaultSelection<Prisma.$PayerPayload>
/**
 * Model Patient
 * 
 */
export type Patient = $Result.DefaultSelection<Prisma.$PatientPayload>
/**
 * Model Consent
 * 
 */
export type Consent = $Result.DefaultSelection<Prisma.$ConsentPayload>
/**
 * Model Claim
 * 
 */
export type Claim = $Result.DefaultSelection<Prisma.$ClaimPayload>
/**
 * Model RecordAttestation
 * 
 */
export type RecordAttestation = $Result.DefaultSelection<Prisma.$RecordAttestationPayload>

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


export const ConsentStatus: {
  ACTIVE: 'ACTIVE',
  REVOKED: 'REVOKED'
};

export type ConsentStatus = (typeof ConsentStatus)[keyof typeof ConsentStatus]


export const ClaimStatus: {
  SUBMITTED: 'SUBMITTED',
  ADJUDICATED: 'ADJUDICATED',
  SETTLED: 'SETTLED',
  DISPUTED: 'DISPUTED',
  REFUNDED: 'REFUNDED'
};

export type ClaimStatus = (typeof ClaimStatus)[keyof typeof ClaimStatus]

}

export type OutboxStatus = $Enums.OutboxStatus

export const OutboxStatus: typeof $Enums.OutboxStatus

export type ConsentStatus = $Enums.ConsentStatus

export const ConsentStatus: typeof $Enums.ConsentStatus

export type ClaimStatus = $Enums.ClaimStatus

export const ClaimStatus: typeof $Enums.ClaimStatus

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
   * `prisma.provider`: Exposes CRUD operations for the **Provider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Providers
    * const providers = await prisma.provider.findMany()
    * ```
    */
  get provider(): Prisma.ProviderDelegate<ExtArgs>;

  /**
   * `prisma.payer`: Exposes CRUD operations for the **Payer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payers
    * const payers = await prisma.payer.findMany()
    * ```
    */
  get payer(): Prisma.PayerDelegate<ExtArgs>;

  /**
   * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patients
    * const patients = await prisma.patient.findMany()
    * ```
    */
  get patient(): Prisma.PatientDelegate<ExtArgs>;

  /**
   * `prisma.consent`: Exposes CRUD operations for the **Consent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Consents
    * const consents = await prisma.consent.findMany()
    * ```
    */
  get consent(): Prisma.ConsentDelegate<ExtArgs>;

  /**
   * `prisma.claim`: Exposes CRUD operations for the **Claim** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Claims
    * const claims = await prisma.claim.findMany()
    * ```
    */
  get claim(): Prisma.ClaimDelegate<ExtArgs>;

  /**
   * `prisma.recordAttestation`: Exposes CRUD operations for the **RecordAttestation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecordAttestations
    * const recordAttestations = await prisma.recordAttestation.findMany()
    * ```
    */
  get recordAttestation(): Prisma.RecordAttestationDelegate<ExtArgs>;
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
    Provider: 'Provider',
    Payer: 'Payer',
    Patient: 'Patient',
    Consent: 'Consent',
    Claim: 'Claim',
    RecordAttestation: 'RecordAttestation'
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
      modelProps: "eventOutbox" | "provider" | "payer" | "patient" | "consent" | "claim" | "recordAttestation"
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
      Provider: {
        payload: Prisma.$ProviderPayload<ExtArgs>
        fields: Prisma.ProviderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProviderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProviderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          findFirst: {
            args: Prisma.ProviderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProviderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          findMany: {
            args: Prisma.ProviderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>[]
          }
          create: {
            args: Prisma.ProviderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          createMany: {
            args: Prisma.ProviderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProviderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>[]
          }
          delete: {
            args: Prisma.ProviderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          update: {
            args: Prisma.ProviderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          deleteMany: {
            args: Prisma.ProviderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProviderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProviderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          aggregate: {
            args: Prisma.ProviderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProvider>
          }
          groupBy: {
            args: Prisma.ProviderGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProviderGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProviderCountArgs<ExtArgs>
            result: $Utils.Optional<ProviderCountAggregateOutputType> | number
          }
        }
      }
      Payer: {
        payload: Prisma.$PayerPayload<ExtArgs>
        fields: Prisma.PayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayerPayload>
          }
          findFirst: {
            args: Prisma.PayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayerPayload>
          }
          findMany: {
            args: Prisma.PayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayerPayload>[]
          }
          create: {
            args: Prisma.PayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayerPayload>
          }
          createMany: {
            args: Prisma.PayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayerPayload>[]
          }
          delete: {
            args: Prisma.PayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayerPayload>
          }
          update: {
            args: Prisma.PayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayerPayload>
          }
          deleteMany: {
            args: Prisma.PayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayerPayload>
          }
          aggregate: {
            args: Prisma.PayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayer>
          }
          groupBy: {
            args: Prisma.PayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PayerCountArgs<ExtArgs>
            result: $Utils.Optional<PayerCountAggregateOutputType> | number
          }
        }
      }
      Patient: {
        payload: Prisma.$PatientPayload<ExtArgs>
        fields: Prisma.PatientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findFirst: {
            args: Prisma.PatientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findMany: {
            args: Prisma.PatientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          create: {
            args: Prisma.PatientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          createMany: {
            args: Prisma.PatientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          delete: {
            args: Prisma.PatientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          update: {
            args: Prisma.PatientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          deleteMany: {
            args: Prisma.PatientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PatientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          aggregate: {
            args: Prisma.PatientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient>
          }
          groupBy: {
            args: Prisma.PatientGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientCountArgs<ExtArgs>
            result: $Utils.Optional<PatientCountAggregateOutputType> | number
          }
        }
      }
      Consent: {
        payload: Prisma.$ConsentPayload<ExtArgs>
        fields: Prisma.ConsentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConsentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConsentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          findFirst: {
            args: Prisma.ConsentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConsentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          findMany: {
            args: Prisma.ConsentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>[]
          }
          create: {
            args: Prisma.ConsentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          createMany: {
            args: Prisma.ConsentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConsentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>[]
          }
          delete: {
            args: Prisma.ConsentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          update: {
            args: Prisma.ConsentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          deleteMany: {
            args: Prisma.ConsentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConsentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConsentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConsentPayload>
          }
          aggregate: {
            args: Prisma.ConsentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConsent>
          }
          groupBy: {
            args: Prisma.ConsentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConsentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConsentCountArgs<ExtArgs>
            result: $Utils.Optional<ConsentCountAggregateOutputType> | number
          }
        }
      }
      Claim: {
        payload: Prisma.$ClaimPayload<ExtArgs>
        fields: Prisma.ClaimFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClaimFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClaimFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          findFirst: {
            args: Prisma.ClaimFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClaimFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          findMany: {
            args: Prisma.ClaimFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>[]
          }
          create: {
            args: Prisma.ClaimCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          createMany: {
            args: Prisma.ClaimCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClaimCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>[]
          }
          delete: {
            args: Prisma.ClaimDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          update: {
            args: Prisma.ClaimUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          deleteMany: {
            args: Prisma.ClaimDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClaimUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClaimUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          aggregate: {
            args: Prisma.ClaimAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClaim>
          }
          groupBy: {
            args: Prisma.ClaimGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClaimGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClaimCountArgs<ExtArgs>
            result: $Utils.Optional<ClaimCountAggregateOutputType> | number
          }
        }
      }
      RecordAttestation: {
        payload: Prisma.$RecordAttestationPayload<ExtArgs>
        fields: Prisma.RecordAttestationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecordAttestationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAttestationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecordAttestationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAttestationPayload>
          }
          findFirst: {
            args: Prisma.RecordAttestationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAttestationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecordAttestationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAttestationPayload>
          }
          findMany: {
            args: Prisma.RecordAttestationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAttestationPayload>[]
          }
          create: {
            args: Prisma.RecordAttestationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAttestationPayload>
          }
          createMany: {
            args: Prisma.RecordAttestationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecordAttestationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAttestationPayload>[]
          }
          delete: {
            args: Prisma.RecordAttestationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAttestationPayload>
          }
          update: {
            args: Prisma.RecordAttestationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAttestationPayload>
          }
          deleteMany: {
            args: Prisma.RecordAttestationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecordAttestationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RecordAttestationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordAttestationPayload>
          }
          aggregate: {
            args: Prisma.RecordAttestationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecordAttestation>
          }
          groupBy: {
            args: Prisma.RecordAttestationGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecordAttestationGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecordAttestationCountArgs<ExtArgs>
            result: $Utils.Optional<RecordAttestationCountAggregateOutputType> | number
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
   * Count Type ProviderCountOutputType
   */

  export type ProviderCountOutputType = {
    claims: number
  }

  export type ProviderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claims?: boolean | ProviderCountOutputTypeCountClaimsArgs
  }

  // Custom InputTypes
  /**
   * ProviderCountOutputType without action
   */
  export type ProviderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProviderCountOutputType
     */
    select?: ProviderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProviderCountOutputType without action
   */
  export type ProviderCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimWhereInput
  }


  /**
   * Count Type PayerCountOutputType
   */

  export type PayerCountOutputType = {
    claims: number
  }

  export type PayerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claims?: boolean | PayerCountOutputTypeCountClaimsArgs
  }

  // Custom InputTypes
  /**
   * PayerCountOutputType without action
   */
  export type PayerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayerCountOutputType
     */
    select?: PayerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PayerCountOutputType without action
   */
  export type PayerCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimWhereInput
  }


  /**
   * Count Type PatientCountOutputType
   */

  export type PatientCountOutputType = {
    consents: number
  }

  export type PatientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consents?: boolean | PatientCountOutputTypeCountConsentsArgs
  }

  // Custom InputTypes
  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: PatientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountConsentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsentWhereInput
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
   * Model Provider
   */

  export type AggregateProvider = {
    _count: ProviderCountAggregateOutputType | null
    _min: ProviderMinAggregateOutputType | null
    _max: ProviderMaxAggregateOutputType | null
  }

  export type ProviderMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type ProviderMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type ProviderCountAggregateOutputType = {
    id: number
    orgId: number
    name: number
    createdAt: number
    _all: number
  }


  export type ProviderMinAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    createdAt?: true
  }

  export type ProviderMaxAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    createdAt?: true
  }

  export type ProviderCountAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type ProviderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Provider to aggregate.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: ProviderOrderByWithRelationInput | ProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Providers
    **/
    _count?: true | ProviderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProviderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProviderMaxAggregateInputType
  }

  export type GetProviderAggregateType<T extends ProviderAggregateArgs> = {
        [P in keyof T & keyof AggregateProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProvider[P]>
      : GetScalarType<T[P], AggregateProvider[P]>
  }




  export type ProviderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProviderWhereInput
    orderBy?: ProviderOrderByWithAggregationInput | ProviderOrderByWithAggregationInput[]
    by: ProviderScalarFieldEnum[] | ProviderScalarFieldEnum
    having?: ProviderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProviderCountAggregateInputType | true
    _min?: ProviderMinAggregateInputType
    _max?: ProviderMaxAggregateInputType
  }

  export type ProviderGroupByOutputType = {
    id: string
    orgId: string
    name: string
    createdAt: Date
    _count: ProviderCountAggregateOutputType | null
    _min: ProviderMinAggregateOutputType | null
    _max: ProviderMaxAggregateOutputType | null
  }

  type GetProviderGroupByPayload<T extends ProviderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProviderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProviderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProviderGroupByOutputType[P]>
            : GetScalarType<T[P], ProviderGroupByOutputType[P]>
        }
      >
    >


  export type ProviderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    name?: boolean
    createdAt?: boolean
    claims?: boolean | Provider$claimsArgs<ExtArgs>
    _count?: boolean | ProviderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["provider"]>

  export type ProviderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["provider"]>

  export type ProviderSelectScalar = {
    id?: boolean
    orgId?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type ProviderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claims?: boolean | Provider$claimsArgs<ExtArgs>
    _count?: boolean | ProviderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProviderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProviderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Provider"
    objects: {
      claims: Prisma.$ClaimPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["provider"]>
    composites: {}
  }

  type ProviderGetPayload<S extends boolean | null | undefined | ProviderDefaultArgs> = $Result.GetResult<Prisma.$ProviderPayload, S>

  type ProviderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProviderFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProviderCountAggregateInputType | true
    }

  export interface ProviderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Provider'], meta: { name: 'Provider' } }
    /**
     * Find zero or one Provider that matches the filter.
     * @param {ProviderFindUniqueArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProviderFindUniqueArgs>(args: SelectSubset<T, ProviderFindUniqueArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Provider that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProviderFindUniqueOrThrowArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProviderFindUniqueOrThrowArgs>(args: SelectSubset<T, ProviderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Provider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindFirstArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProviderFindFirstArgs>(args?: SelectSubset<T, ProviderFindFirstArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Provider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindFirstOrThrowArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProviderFindFirstOrThrowArgs>(args?: SelectSubset<T, ProviderFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Providers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Providers
     * const providers = await prisma.provider.findMany()
     * 
     * // Get first 10 Providers
     * const providers = await prisma.provider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const providerWithIdOnly = await prisma.provider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProviderFindManyArgs>(args?: SelectSubset<T, ProviderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Provider.
     * @param {ProviderCreateArgs} args - Arguments to create a Provider.
     * @example
     * // Create one Provider
     * const Provider = await prisma.provider.create({
     *   data: {
     *     // ... data to create a Provider
     *   }
     * })
     * 
     */
    create<T extends ProviderCreateArgs>(args: SelectSubset<T, ProviderCreateArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Providers.
     * @param {ProviderCreateManyArgs} args - Arguments to create many Providers.
     * @example
     * // Create many Providers
     * const provider = await prisma.provider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProviderCreateManyArgs>(args?: SelectSubset<T, ProviderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Providers and returns the data saved in the database.
     * @param {ProviderCreateManyAndReturnArgs} args - Arguments to create many Providers.
     * @example
     * // Create many Providers
     * const provider = await prisma.provider.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Providers and only return the `id`
     * const providerWithIdOnly = await prisma.provider.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProviderCreateManyAndReturnArgs>(args?: SelectSubset<T, ProviderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Provider.
     * @param {ProviderDeleteArgs} args - Arguments to delete one Provider.
     * @example
     * // Delete one Provider
     * const Provider = await prisma.provider.delete({
     *   where: {
     *     // ... filter to delete one Provider
     *   }
     * })
     * 
     */
    delete<T extends ProviderDeleteArgs>(args: SelectSubset<T, ProviderDeleteArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Provider.
     * @param {ProviderUpdateArgs} args - Arguments to update one Provider.
     * @example
     * // Update one Provider
     * const provider = await prisma.provider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProviderUpdateArgs>(args: SelectSubset<T, ProviderUpdateArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Providers.
     * @param {ProviderDeleteManyArgs} args - Arguments to filter Providers to delete.
     * @example
     * // Delete a few Providers
     * const { count } = await prisma.provider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProviderDeleteManyArgs>(args?: SelectSubset<T, ProviderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Providers
     * const provider = await prisma.provider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProviderUpdateManyArgs>(args: SelectSubset<T, ProviderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Provider.
     * @param {ProviderUpsertArgs} args - Arguments to update or create a Provider.
     * @example
     * // Update or create a Provider
     * const provider = await prisma.provider.upsert({
     *   create: {
     *     // ... data to create a Provider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Provider we want to update
     *   }
     * })
     */
    upsert<T extends ProviderUpsertArgs>(args: SelectSubset<T, ProviderUpsertArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderCountArgs} args - Arguments to filter Providers to count.
     * @example
     * // Count the number of Providers
     * const count = await prisma.provider.count({
     *   where: {
     *     // ... the filter for the Providers we want to count
     *   }
     * })
    **/
    count<T extends ProviderCountArgs>(
      args?: Subset<T, ProviderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProviderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Provider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProviderAggregateArgs>(args: Subset<T, ProviderAggregateArgs>): Prisma.PrismaPromise<GetProviderAggregateType<T>>

    /**
     * Group by Provider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderGroupByArgs} args - Group by arguments.
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
      T extends ProviderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProviderGroupByArgs['orderBy'] }
        : { orderBy?: ProviderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Provider model
   */
  readonly fields: ProviderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Provider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProviderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    claims<T extends Provider$claimsArgs<ExtArgs> = {}>(args?: Subset<T, Provider$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Provider model
   */ 
  interface ProviderFieldRefs {
    readonly id: FieldRef<"Provider", 'String'>
    readonly orgId: FieldRef<"Provider", 'String'>
    readonly name: FieldRef<"Provider", 'String'>
    readonly createdAt: FieldRef<"Provider", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Provider findUnique
   */
  export type ProviderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter, which Provider to fetch.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider findUniqueOrThrow
   */
  export type ProviderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter, which Provider to fetch.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider findFirst
   */
  export type ProviderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter, which Provider to fetch.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: ProviderOrderByWithRelationInput | ProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Providers.
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Providers.
     */
    distinct?: ProviderScalarFieldEnum | ProviderScalarFieldEnum[]
  }

  /**
   * Provider findFirstOrThrow
   */
  export type ProviderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter, which Provider to fetch.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: ProviderOrderByWithRelationInput | ProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Providers.
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Providers.
     */
    distinct?: ProviderScalarFieldEnum | ProviderScalarFieldEnum[]
  }

  /**
   * Provider findMany
   */
  export type ProviderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter, which Providers to fetch.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: ProviderOrderByWithRelationInput | ProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Providers.
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    distinct?: ProviderScalarFieldEnum | ProviderScalarFieldEnum[]
  }

  /**
   * Provider create
   */
  export type ProviderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * The data needed to create a Provider.
     */
    data: XOR<ProviderCreateInput, ProviderUncheckedCreateInput>
  }

  /**
   * Provider createMany
   */
  export type ProviderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Providers.
     */
    data: ProviderCreateManyInput | ProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Provider createManyAndReturn
   */
  export type ProviderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Providers.
     */
    data: ProviderCreateManyInput | ProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Provider update
   */
  export type ProviderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * The data needed to update a Provider.
     */
    data: XOR<ProviderUpdateInput, ProviderUncheckedUpdateInput>
    /**
     * Choose, which Provider to update.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider updateMany
   */
  export type ProviderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Providers.
     */
    data: XOR<ProviderUpdateManyMutationInput, ProviderUncheckedUpdateManyInput>
    /**
     * Filter which Providers to update
     */
    where?: ProviderWhereInput
  }

  /**
   * Provider upsert
   */
  export type ProviderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * The filter to search for the Provider to update in case it exists.
     */
    where: ProviderWhereUniqueInput
    /**
     * In case the Provider found by the `where` argument doesn't exist, create a new Provider with this data.
     */
    create: XOR<ProviderCreateInput, ProviderUncheckedCreateInput>
    /**
     * In case the Provider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProviderUpdateInput, ProviderUncheckedUpdateInput>
  }

  /**
   * Provider delete
   */
  export type ProviderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
    /**
     * Filter which Provider to delete.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider deleteMany
   */
  export type ProviderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Providers to delete
     */
    where?: ProviderWhereInput
  }

  /**
   * Provider.claims
   */
  export type Provider$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    where?: ClaimWhereInput
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    cursor?: ClaimWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * Provider without action
   */
  export type ProviderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProviderInclude<ExtArgs> | null
  }


  /**
   * Model Payer
   */

  export type AggregatePayer = {
    _count: PayerCountAggregateOutputType | null
    _min: PayerMinAggregateOutputType | null
    _max: PayerMaxAggregateOutputType | null
  }

  export type PayerMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type PayerMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type PayerCountAggregateOutputType = {
    id: number
    orgId: number
    name: number
    createdAt: number
    _all: number
  }


  export type PayerMinAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    createdAt?: true
  }

  export type PayerMaxAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    createdAt?: true
  }

  export type PayerCountAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type PayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payer to aggregate.
     */
    where?: PayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payers to fetch.
     */
    orderBy?: PayerOrderByWithRelationInput | PayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payers
    **/
    _count?: true | PayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PayerMaxAggregateInputType
  }

  export type GetPayerAggregateType<T extends PayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayer[P]>
      : GetScalarType<T[P], AggregatePayer[P]>
  }




  export type PayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayerWhereInput
    orderBy?: PayerOrderByWithAggregationInput | PayerOrderByWithAggregationInput[]
    by: PayerScalarFieldEnum[] | PayerScalarFieldEnum
    having?: PayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PayerCountAggregateInputType | true
    _min?: PayerMinAggregateInputType
    _max?: PayerMaxAggregateInputType
  }

  export type PayerGroupByOutputType = {
    id: string
    orgId: string
    name: string
    createdAt: Date
    _count: PayerCountAggregateOutputType | null
    _min: PayerMinAggregateOutputType | null
    _max: PayerMaxAggregateOutputType | null
  }

  type GetPayerGroupByPayload<T extends PayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PayerGroupByOutputType[P]>
            : GetScalarType<T[P], PayerGroupByOutputType[P]>
        }
      >
    >


  export type PayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    name?: boolean
    createdAt?: boolean
    claims?: boolean | Payer$claimsArgs<ExtArgs>
    _count?: boolean | PayerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payer"]>

  export type PayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["payer"]>

  export type PayerSelectScalar = {
    id?: boolean
    orgId?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type PayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claims?: boolean | Payer$claimsArgs<ExtArgs>
    _count?: boolean | PayerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payer"
    objects: {
      claims: Prisma.$ClaimPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["payer"]>
    composites: {}
  }

  type PayerGetPayload<S extends boolean | null | undefined | PayerDefaultArgs> = $Result.GetResult<Prisma.$PayerPayload, S>

  type PayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PayerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PayerCountAggregateInputType | true
    }

  export interface PayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payer'], meta: { name: 'Payer' } }
    /**
     * Find zero or one Payer that matches the filter.
     * @param {PayerFindUniqueArgs} args - Arguments to find a Payer
     * @example
     * // Get one Payer
     * const payer = await prisma.payer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayerFindUniqueArgs>(args: SelectSubset<T, PayerFindUniqueArgs<ExtArgs>>): Prisma__PayerClient<$Result.GetResult<Prisma.$PayerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Payer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PayerFindUniqueOrThrowArgs} args - Arguments to find a Payer
     * @example
     * // Get one Payer
     * const payer = await prisma.payer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PayerClient<$Result.GetResult<Prisma.$PayerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Payer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayerFindFirstArgs} args - Arguments to find a Payer
     * @example
     * // Get one Payer
     * const payer = await prisma.payer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayerFindFirstArgs>(args?: SelectSubset<T, PayerFindFirstArgs<ExtArgs>>): Prisma__PayerClient<$Result.GetResult<Prisma.$PayerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Payer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayerFindFirstOrThrowArgs} args - Arguments to find a Payer
     * @example
     * // Get one Payer
     * const payer = await prisma.payer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PayerClient<$Result.GetResult<Prisma.$PayerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Payers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payers
     * const payers = await prisma.payer.findMany()
     * 
     * // Get first 10 Payers
     * const payers = await prisma.payer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const payerWithIdOnly = await prisma.payer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PayerFindManyArgs>(args?: SelectSubset<T, PayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Payer.
     * @param {PayerCreateArgs} args - Arguments to create a Payer.
     * @example
     * // Create one Payer
     * const Payer = await prisma.payer.create({
     *   data: {
     *     // ... data to create a Payer
     *   }
     * })
     * 
     */
    create<T extends PayerCreateArgs>(args: SelectSubset<T, PayerCreateArgs<ExtArgs>>): Prisma__PayerClient<$Result.GetResult<Prisma.$PayerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Payers.
     * @param {PayerCreateManyArgs} args - Arguments to create many Payers.
     * @example
     * // Create many Payers
     * const payer = await prisma.payer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PayerCreateManyArgs>(args?: SelectSubset<T, PayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payers and returns the data saved in the database.
     * @param {PayerCreateManyAndReturnArgs} args - Arguments to create many Payers.
     * @example
     * // Create many Payers
     * const payer = await prisma.payer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payers and only return the `id`
     * const payerWithIdOnly = await prisma.payer.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PayerCreateManyAndReturnArgs>(args?: SelectSubset<T, PayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Payer.
     * @param {PayerDeleteArgs} args - Arguments to delete one Payer.
     * @example
     * // Delete one Payer
     * const Payer = await prisma.payer.delete({
     *   where: {
     *     // ... filter to delete one Payer
     *   }
     * })
     * 
     */
    delete<T extends PayerDeleteArgs>(args: SelectSubset<T, PayerDeleteArgs<ExtArgs>>): Prisma__PayerClient<$Result.GetResult<Prisma.$PayerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Payer.
     * @param {PayerUpdateArgs} args - Arguments to update one Payer.
     * @example
     * // Update one Payer
     * const payer = await prisma.payer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PayerUpdateArgs>(args: SelectSubset<T, PayerUpdateArgs<ExtArgs>>): Prisma__PayerClient<$Result.GetResult<Prisma.$PayerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Payers.
     * @param {PayerDeleteManyArgs} args - Arguments to filter Payers to delete.
     * @example
     * // Delete a few Payers
     * const { count } = await prisma.payer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PayerDeleteManyArgs>(args?: SelectSubset<T, PayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payers
     * const payer = await prisma.payer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PayerUpdateManyArgs>(args: SelectSubset<T, PayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payer.
     * @param {PayerUpsertArgs} args - Arguments to update or create a Payer.
     * @example
     * // Update or create a Payer
     * const payer = await prisma.payer.upsert({
     *   create: {
     *     // ... data to create a Payer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payer we want to update
     *   }
     * })
     */
    upsert<T extends PayerUpsertArgs>(args: SelectSubset<T, PayerUpsertArgs<ExtArgs>>): Prisma__PayerClient<$Result.GetResult<Prisma.$PayerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Payers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayerCountArgs} args - Arguments to filter Payers to count.
     * @example
     * // Count the number of Payers
     * const count = await prisma.payer.count({
     *   where: {
     *     // ... the filter for the Payers we want to count
     *   }
     * })
    **/
    count<T extends PayerCountArgs>(
      args?: Subset<T, PayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PayerAggregateArgs>(args: Subset<T, PayerAggregateArgs>): Prisma.PrismaPromise<GetPayerAggregateType<T>>

    /**
     * Group by Payer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayerGroupByArgs} args - Group by arguments.
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
      T extends PayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayerGroupByArgs['orderBy'] }
        : { orderBy?: PayerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payer model
   */
  readonly fields: PayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    claims<T extends Payer$claimsArgs<ExtArgs> = {}>(args?: Subset<T, Payer$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Payer model
   */ 
  interface PayerFieldRefs {
    readonly id: FieldRef<"Payer", 'String'>
    readonly orgId: FieldRef<"Payer", 'String'>
    readonly name: FieldRef<"Payer", 'String'>
    readonly createdAt: FieldRef<"Payer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payer findUnique
   */
  export type PayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payer
     */
    select?: PayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayerInclude<ExtArgs> | null
    /**
     * Filter, which Payer to fetch.
     */
    where: PayerWhereUniqueInput
  }

  /**
   * Payer findUniqueOrThrow
   */
  export type PayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payer
     */
    select?: PayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayerInclude<ExtArgs> | null
    /**
     * Filter, which Payer to fetch.
     */
    where: PayerWhereUniqueInput
  }

  /**
   * Payer findFirst
   */
  export type PayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payer
     */
    select?: PayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayerInclude<ExtArgs> | null
    /**
     * Filter, which Payer to fetch.
     */
    where?: PayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payers to fetch.
     */
    orderBy?: PayerOrderByWithRelationInput | PayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payers.
     */
    cursor?: PayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payers.
     */
    distinct?: PayerScalarFieldEnum | PayerScalarFieldEnum[]
  }

  /**
   * Payer findFirstOrThrow
   */
  export type PayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payer
     */
    select?: PayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayerInclude<ExtArgs> | null
    /**
     * Filter, which Payer to fetch.
     */
    where?: PayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payers to fetch.
     */
    orderBy?: PayerOrderByWithRelationInput | PayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payers.
     */
    cursor?: PayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payers.
     */
    distinct?: PayerScalarFieldEnum | PayerScalarFieldEnum[]
  }

  /**
   * Payer findMany
   */
  export type PayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payer
     */
    select?: PayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayerInclude<ExtArgs> | null
    /**
     * Filter, which Payers to fetch.
     */
    where?: PayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payers to fetch.
     */
    orderBy?: PayerOrderByWithRelationInput | PayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payers.
     */
    cursor?: PayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payers.
     */
    skip?: number
    distinct?: PayerScalarFieldEnum | PayerScalarFieldEnum[]
  }

  /**
   * Payer create
   */
  export type PayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payer
     */
    select?: PayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayerInclude<ExtArgs> | null
    /**
     * The data needed to create a Payer.
     */
    data: XOR<PayerCreateInput, PayerUncheckedCreateInput>
  }

  /**
   * Payer createMany
   */
  export type PayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payers.
     */
    data: PayerCreateManyInput | PayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payer createManyAndReturn
   */
  export type PayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payer
     */
    select?: PayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Payers.
     */
    data: PayerCreateManyInput | PayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payer update
   */
  export type PayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payer
     */
    select?: PayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayerInclude<ExtArgs> | null
    /**
     * The data needed to update a Payer.
     */
    data: XOR<PayerUpdateInput, PayerUncheckedUpdateInput>
    /**
     * Choose, which Payer to update.
     */
    where: PayerWhereUniqueInput
  }

  /**
   * Payer updateMany
   */
  export type PayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payers.
     */
    data: XOR<PayerUpdateManyMutationInput, PayerUncheckedUpdateManyInput>
    /**
     * Filter which Payers to update
     */
    where?: PayerWhereInput
  }

  /**
   * Payer upsert
   */
  export type PayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payer
     */
    select?: PayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayerInclude<ExtArgs> | null
    /**
     * The filter to search for the Payer to update in case it exists.
     */
    where: PayerWhereUniqueInput
    /**
     * In case the Payer found by the `where` argument doesn't exist, create a new Payer with this data.
     */
    create: XOR<PayerCreateInput, PayerUncheckedCreateInput>
    /**
     * In case the Payer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PayerUpdateInput, PayerUncheckedUpdateInput>
  }

  /**
   * Payer delete
   */
  export type PayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payer
     */
    select?: PayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayerInclude<ExtArgs> | null
    /**
     * Filter which Payer to delete.
     */
    where: PayerWhereUniqueInput
  }

  /**
   * Payer deleteMany
   */
  export type PayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payers to delete
     */
    where?: PayerWhereInput
  }

  /**
   * Payer.claims
   */
  export type Payer$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    where?: ClaimWhereInput
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    cursor?: ClaimWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * Payer without action
   */
  export type PayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payer
     */
    select?: PayerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayerInclude<ExtArgs> | null
  }


  /**
   * Model Patient
   */

  export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  export type PatientMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    subjectHash: string | null
    createdAt: Date | null
  }

  export type PatientMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    subjectHash: string | null
    createdAt: Date | null
  }

  export type PatientCountAggregateOutputType = {
    id: number
    orgId: number
    subjectHash: number
    createdAt: number
    _all: number
  }


  export type PatientMinAggregateInputType = {
    id?: true
    orgId?: true
    subjectHash?: true
    createdAt?: true
  }

  export type PatientMaxAggregateInputType = {
    id?: true
    orgId?: true
    subjectHash?: true
    createdAt?: true
  }

  export type PatientCountAggregateInputType = {
    id?: true
    orgId?: true
    subjectHash?: true
    createdAt?: true
    _all?: true
  }

  export type PatientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType
  }

  export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient[P]>
      : GetScalarType<T[P], AggregatePatient[P]>
  }




  export type PatientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithAggregationInput | PatientOrderByWithAggregationInput[]
    by: PatientScalarFieldEnum[] | PatientScalarFieldEnum
    having?: PatientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientCountAggregateInputType | true
    _min?: PatientMinAggregateInputType
    _max?: PatientMaxAggregateInputType
  }

  export type PatientGroupByOutputType = {
    id: string
    orgId: string
    subjectHash: string
    createdAt: Date
    _count: PatientCountAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientGroupByOutputType[P]>
            : GetScalarType<T[P], PatientGroupByOutputType[P]>
        }
      >
    >


  export type PatientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    subjectHash?: boolean
    createdAt?: boolean
    consents?: boolean | Patient$consentsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    subjectHash?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectScalar = {
    id?: boolean
    orgId?: boolean
    subjectHash?: boolean
    createdAt?: boolean
  }

  export type PatientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    consents?: boolean | Patient$consentsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PatientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Patient"
    objects: {
      consents: Prisma.$ConsentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      subjectHash: string
      createdAt: Date
    }, ExtArgs["result"]["patient"]>
    composites: {}
  }

  type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = $Result.GetResult<Prisma.$PatientPayload, S>

  type PatientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PatientCountAggregateInputType | true
    }

  export interface PatientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Patient'], meta: { name: 'Patient' } }
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     * 
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientWithIdOnly = await prisma.patient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientFindManyArgs>(args?: SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     * 
     */
    create<T extends PatientCreateArgs>(args: SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientCreateManyArgs>(args?: SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patients and returns the data saved in the database.
     * @param {PatientCreateManyAndReturnArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     * 
     */
    delete<T extends PatientDeleteArgs>(args: SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientUpdateArgs>(args: SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientUpdateManyArgs>(args: SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(
      args?: Subset<T, PatientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PatientAggregateArgs>(args: Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>

    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
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
      T extends PatientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientGroupByArgs['orderBy'] }
        : { orderBy?: PatientGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Patient model
   */
  readonly fields: PatientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Patient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    consents<T extends Patient$consentsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$consentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Patient model
   */ 
  interface PatientFieldRefs {
    readonly id: FieldRef<"Patient", 'String'>
    readonly orgId: FieldRef<"Patient", 'String'>
    readonly subjectHash: FieldRef<"Patient", 'String'>
    readonly createdAt: FieldRef<"Patient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Patient findUnique
   */
  export type PatientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findUniqueOrThrow
   */
  export type PatientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findFirst
   */
  export type PatientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findFirstOrThrow
   */
  export type PatientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findMany
   */
  export type PatientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patients to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient create
   */
  export type PatientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to create a Patient.
     */
    data: XOR<PatientCreateInput, PatientUncheckedCreateInput>
  }

  /**
   * Patient createMany
   */
  export type PatientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient createManyAndReturn
   */
  export type PatientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient update
   */
  export type PatientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to update a Patient.
     */
    data: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
    /**
     * Choose, which Patient to update.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient updateMany
   */
  export type PatientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
  }

  /**
   * Patient upsert
   */
  export type PatientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: PatientWhereUniqueInput
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: XOR<PatientCreateInput, PatientUncheckedCreateInput>
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
  }

  /**
   * Patient delete
   */
  export type PatientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter which Patient to delete.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient deleteMany
   */
  export type PatientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: PatientWhereInput
  }

  /**
   * Patient.consents
   */
  export type Patient$consentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    where?: ConsentWhereInput
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    cursor?: ConsentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * Patient without action
   */
  export type PatientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
  }


  /**
   * Model Consent
   */

  export type AggregateConsent = {
    _count: ConsentCountAggregateOutputType | null
    _min: ConsentMinAggregateOutputType | null
    _max: ConsentMaxAggregateOutputType | null
  }

  export type ConsentMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    patientId: string | null
    scope: string | null
    expiresAt: Date | null
    status: $Enums.ConsentStatus | null
    attestationId: string | null
    createdAt: Date | null
  }

  export type ConsentMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    patientId: string | null
    scope: string | null
    expiresAt: Date | null
    status: $Enums.ConsentStatus | null
    attestationId: string | null
    createdAt: Date | null
  }

  export type ConsentCountAggregateOutputType = {
    id: number
    orgId: number
    patientId: number
    scope: number
    expiresAt: number
    status: number
    attestationId: number
    createdAt: number
    _all: number
  }


  export type ConsentMinAggregateInputType = {
    id?: true
    orgId?: true
    patientId?: true
    scope?: true
    expiresAt?: true
    status?: true
    attestationId?: true
    createdAt?: true
  }

  export type ConsentMaxAggregateInputType = {
    id?: true
    orgId?: true
    patientId?: true
    scope?: true
    expiresAt?: true
    status?: true
    attestationId?: true
    createdAt?: true
  }

  export type ConsentCountAggregateInputType = {
    id?: true
    orgId?: true
    patientId?: true
    scope?: true
    expiresAt?: true
    status?: true
    attestationId?: true
    createdAt?: true
    _all?: true
  }

  export type ConsentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consent to aggregate.
     */
    where?: ConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consents to fetch.
     */
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Consents
    **/
    _count?: true | ConsentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConsentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConsentMaxAggregateInputType
  }

  export type GetConsentAggregateType<T extends ConsentAggregateArgs> = {
        [P in keyof T & keyof AggregateConsent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConsent[P]>
      : GetScalarType<T[P], AggregateConsent[P]>
  }




  export type ConsentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConsentWhereInput
    orderBy?: ConsentOrderByWithAggregationInput | ConsentOrderByWithAggregationInput[]
    by: ConsentScalarFieldEnum[] | ConsentScalarFieldEnum
    having?: ConsentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConsentCountAggregateInputType | true
    _min?: ConsentMinAggregateInputType
    _max?: ConsentMaxAggregateInputType
  }

  export type ConsentGroupByOutputType = {
    id: string
    orgId: string
    patientId: string
    scope: string
    expiresAt: Date | null
    status: $Enums.ConsentStatus
    attestationId: string | null
    createdAt: Date
    _count: ConsentCountAggregateOutputType | null
    _min: ConsentMinAggregateOutputType | null
    _max: ConsentMaxAggregateOutputType | null
  }

  type GetConsentGroupByPayload<T extends ConsentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConsentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConsentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConsentGroupByOutputType[P]>
            : GetScalarType<T[P], ConsentGroupByOutputType[P]>
        }
      >
    >


  export type ConsentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    patientId?: boolean
    scope?: boolean
    expiresAt?: boolean
    status?: boolean
    attestationId?: boolean
    createdAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consent"]>

  export type ConsentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    patientId?: boolean
    scope?: boolean
    expiresAt?: boolean
    status?: boolean
    attestationId?: boolean
    createdAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["consent"]>

  export type ConsentSelectScalar = {
    id?: boolean
    orgId?: boolean
    patientId?: boolean
    scope?: boolean
    expiresAt?: boolean
    status?: boolean
    attestationId?: boolean
    createdAt?: boolean
  }

  export type ConsentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type ConsentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $ConsentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Consent"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      patientId: string
      scope: string
      expiresAt: Date | null
      status: $Enums.ConsentStatus
      attestationId: string | null
      createdAt: Date
    }, ExtArgs["result"]["consent"]>
    composites: {}
  }

  type ConsentGetPayload<S extends boolean | null | undefined | ConsentDefaultArgs> = $Result.GetResult<Prisma.$ConsentPayload, S>

  type ConsentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ConsentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ConsentCountAggregateInputType | true
    }

  export interface ConsentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Consent'], meta: { name: 'Consent' } }
    /**
     * Find zero or one Consent that matches the filter.
     * @param {ConsentFindUniqueArgs} args - Arguments to find a Consent
     * @example
     * // Get one Consent
     * const consent = await prisma.consent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConsentFindUniqueArgs>(args: SelectSubset<T, ConsentFindUniqueArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Consent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ConsentFindUniqueOrThrowArgs} args - Arguments to find a Consent
     * @example
     * // Get one Consent
     * const consent = await prisma.consent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConsentFindUniqueOrThrowArgs>(args: SelectSubset<T, ConsentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Consent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentFindFirstArgs} args - Arguments to find a Consent
     * @example
     * // Get one Consent
     * const consent = await prisma.consent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConsentFindFirstArgs>(args?: SelectSubset<T, ConsentFindFirstArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Consent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentFindFirstOrThrowArgs} args - Arguments to find a Consent
     * @example
     * // Get one Consent
     * const consent = await prisma.consent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConsentFindFirstOrThrowArgs>(args?: SelectSubset<T, ConsentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Consents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Consents
     * const consents = await prisma.consent.findMany()
     * 
     * // Get first 10 Consents
     * const consents = await prisma.consent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const consentWithIdOnly = await prisma.consent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConsentFindManyArgs>(args?: SelectSubset<T, ConsentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Consent.
     * @param {ConsentCreateArgs} args - Arguments to create a Consent.
     * @example
     * // Create one Consent
     * const Consent = await prisma.consent.create({
     *   data: {
     *     // ... data to create a Consent
     *   }
     * })
     * 
     */
    create<T extends ConsentCreateArgs>(args: SelectSubset<T, ConsentCreateArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Consents.
     * @param {ConsentCreateManyArgs} args - Arguments to create many Consents.
     * @example
     * // Create many Consents
     * const consent = await prisma.consent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConsentCreateManyArgs>(args?: SelectSubset<T, ConsentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Consents and returns the data saved in the database.
     * @param {ConsentCreateManyAndReturnArgs} args - Arguments to create many Consents.
     * @example
     * // Create many Consents
     * const consent = await prisma.consent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Consents and only return the `id`
     * const consentWithIdOnly = await prisma.consent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConsentCreateManyAndReturnArgs>(args?: SelectSubset<T, ConsentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Consent.
     * @param {ConsentDeleteArgs} args - Arguments to delete one Consent.
     * @example
     * // Delete one Consent
     * const Consent = await prisma.consent.delete({
     *   where: {
     *     // ... filter to delete one Consent
     *   }
     * })
     * 
     */
    delete<T extends ConsentDeleteArgs>(args: SelectSubset<T, ConsentDeleteArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Consent.
     * @param {ConsentUpdateArgs} args - Arguments to update one Consent.
     * @example
     * // Update one Consent
     * const consent = await prisma.consent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConsentUpdateArgs>(args: SelectSubset<T, ConsentUpdateArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Consents.
     * @param {ConsentDeleteManyArgs} args - Arguments to filter Consents to delete.
     * @example
     * // Delete a few Consents
     * const { count } = await prisma.consent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConsentDeleteManyArgs>(args?: SelectSubset<T, ConsentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Consents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Consents
     * const consent = await prisma.consent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConsentUpdateManyArgs>(args: SelectSubset<T, ConsentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Consent.
     * @param {ConsentUpsertArgs} args - Arguments to update or create a Consent.
     * @example
     * // Update or create a Consent
     * const consent = await prisma.consent.upsert({
     *   create: {
     *     // ... data to create a Consent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Consent we want to update
     *   }
     * })
     */
    upsert<T extends ConsentUpsertArgs>(args: SelectSubset<T, ConsentUpsertArgs<ExtArgs>>): Prisma__ConsentClient<$Result.GetResult<Prisma.$ConsentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Consents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentCountArgs} args - Arguments to filter Consents to count.
     * @example
     * // Count the number of Consents
     * const count = await prisma.consent.count({
     *   where: {
     *     // ... the filter for the Consents we want to count
     *   }
     * })
    **/
    count<T extends ConsentCountArgs>(
      args?: Subset<T, ConsentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConsentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Consent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConsentAggregateArgs>(args: Subset<T, ConsentAggregateArgs>): Prisma.PrismaPromise<GetConsentAggregateType<T>>

    /**
     * Group by Consent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConsentGroupByArgs} args - Group by arguments.
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
      T extends ConsentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConsentGroupByArgs['orderBy'] }
        : { orderBy?: ConsentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConsentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Consent model
   */
  readonly fields: ConsentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Consent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConsentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Consent model
   */ 
  interface ConsentFieldRefs {
    readonly id: FieldRef<"Consent", 'String'>
    readonly orgId: FieldRef<"Consent", 'String'>
    readonly patientId: FieldRef<"Consent", 'String'>
    readonly scope: FieldRef<"Consent", 'String'>
    readonly expiresAt: FieldRef<"Consent", 'DateTime'>
    readonly status: FieldRef<"Consent", 'ConsentStatus'>
    readonly attestationId: FieldRef<"Consent", 'String'>
    readonly createdAt: FieldRef<"Consent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Consent findUnique
   */
  export type ConsentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consent to fetch.
     */
    where: ConsentWhereUniqueInput
  }

  /**
   * Consent findUniqueOrThrow
   */
  export type ConsentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consent to fetch.
     */
    where: ConsentWhereUniqueInput
  }

  /**
   * Consent findFirst
   */
  export type ConsentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consent to fetch.
     */
    where?: ConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consents to fetch.
     */
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consents.
     */
    cursor?: ConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consents.
     */
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * Consent findFirstOrThrow
   */
  export type ConsentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consent to fetch.
     */
    where?: ConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consents to fetch.
     */
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Consents.
     */
    cursor?: ConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Consents.
     */
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * Consent findMany
   */
  export type ConsentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter, which Consents to fetch.
     */
    where?: ConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Consents to fetch.
     */
    orderBy?: ConsentOrderByWithRelationInput | ConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Consents.
     */
    cursor?: ConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Consents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Consents.
     */
    skip?: number
    distinct?: ConsentScalarFieldEnum | ConsentScalarFieldEnum[]
  }

  /**
   * Consent create
   */
  export type ConsentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * The data needed to create a Consent.
     */
    data: XOR<ConsentCreateInput, ConsentUncheckedCreateInput>
  }

  /**
   * Consent createMany
   */
  export type ConsentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Consents.
     */
    data: ConsentCreateManyInput | ConsentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Consent createManyAndReturn
   */
  export type ConsentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Consents.
     */
    data: ConsentCreateManyInput | ConsentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Consent update
   */
  export type ConsentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * The data needed to update a Consent.
     */
    data: XOR<ConsentUpdateInput, ConsentUncheckedUpdateInput>
    /**
     * Choose, which Consent to update.
     */
    where: ConsentWhereUniqueInput
  }

  /**
   * Consent updateMany
   */
  export type ConsentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Consents.
     */
    data: XOR<ConsentUpdateManyMutationInput, ConsentUncheckedUpdateManyInput>
    /**
     * Filter which Consents to update
     */
    where?: ConsentWhereInput
  }

  /**
   * Consent upsert
   */
  export type ConsentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * The filter to search for the Consent to update in case it exists.
     */
    where: ConsentWhereUniqueInput
    /**
     * In case the Consent found by the `where` argument doesn't exist, create a new Consent with this data.
     */
    create: XOR<ConsentCreateInput, ConsentUncheckedCreateInput>
    /**
     * In case the Consent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConsentUpdateInput, ConsentUncheckedUpdateInput>
  }

  /**
   * Consent delete
   */
  export type ConsentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
    /**
     * Filter which Consent to delete.
     */
    where: ConsentWhereUniqueInput
  }

  /**
   * Consent deleteMany
   */
  export type ConsentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Consents to delete
     */
    where?: ConsentWhereInput
  }

  /**
   * Consent without action
   */
  export type ConsentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Consent
     */
    select?: ConsentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConsentInclude<ExtArgs> | null
  }


  /**
   * Model Claim
   */

  export type AggregateClaim = {
    _count: ClaimCountAggregateOutputType | null
    _avg: ClaimAvgAggregateOutputType | null
    _sum: ClaimSumAggregateOutputType | null
    _min: ClaimMinAggregateOutputType | null
    _max: ClaimMaxAggregateOutputType | null
  }

  export type ClaimAvgAggregateOutputType = {
    amountMinor: number | null
  }

  export type ClaimSumAggregateOutputType = {
    amountMinor: bigint | null
  }

  export type ClaimMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    providerId: string | null
    payerId: string | null
    procedureCode: string | null
    amountMinor: bigint | null
    currency: string | null
    status: $Enums.ClaimStatus | null
    escrowIntentId: string | null
    createdAt: Date | null
  }

  export type ClaimMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    providerId: string | null
    payerId: string | null
    procedureCode: string | null
    amountMinor: bigint | null
    currency: string | null
    status: $Enums.ClaimStatus | null
    escrowIntentId: string | null
    createdAt: Date | null
  }

  export type ClaimCountAggregateOutputType = {
    id: number
    orgId: number
    providerId: number
    payerId: number
    procedureCode: number
    amountMinor: number
    currency: number
    status: number
    escrowIntentId: number
    createdAt: number
    _all: number
  }


  export type ClaimAvgAggregateInputType = {
    amountMinor?: true
  }

  export type ClaimSumAggregateInputType = {
    amountMinor?: true
  }

  export type ClaimMinAggregateInputType = {
    id?: true
    orgId?: true
    providerId?: true
    payerId?: true
    procedureCode?: true
    amountMinor?: true
    currency?: true
    status?: true
    escrowIntentId?: true
    createdAt?: true
  }

  export type ClaimMaxAggregateInputType = {
    id?: true
    orgId?: true
    providerId?: true
    payerId?: true
    procedureCode?: true
    amountMinor?: true
    currency?: true
    status?: true
    escrowIntentId?: true
    createdAt?: true
  }

  export type ClaimCountAggregateInputType = {
    id?: true
    orgId?: true
    providerId?: true
    payerId?: true
    procedureCode?: true
    amountMinor?: true
    currency?: true
    status?: true
    escrowIntentId?: true
    createdAt?: true
    _all?: true
  }

  export type ClaimAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Claim to aggregate.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Claims
    **/
    _count?: true | ClaimCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClaimAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClaimSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClaimMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClaimMaxAggregateInputType
  }

  export type GetClaimAggregateType<T extends ClaimAggregateArgs> = {
        [P in keyof T & keyof AggregateClaim]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClaim[P]>
      : GetScalarType<T[P], AggregateClaim[P]>
  }




  export type ClaimGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimWhereInput
    orderBy?: ClaimOrderByWithAggregationInput | ClaimOrderByWithAggregationInput[]
    by: ClaimScalarFieldEnum[] | ClaimScalarFieldEnum
    having?: ClaimScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClaimCountAggregateInputType | true
    _avg?: ClaimAvgAggregateInputType
    _sum?: ClaimSumAggregateInputType
    _min?: ClaimMinAggregateInputType
    _max?: ClaimMaxAggregateInputType
  }

  export type ClaimGroupByOutputType = {
    id: string
    orgId: string
    providerId: string
    payerId: string
    procedureCode: string
    amountMinor: bigint
    currency: string
    status: $Enums.ClaimStatus
    escrowIntentId: string | null
    createdAt: Date
    _count: ClaimCountAggregateOutputType | null
    _avg: ClaimAvgAggregateOutputType | null
    _sum: ClaimSumAggregateOutputType | null
    _min: ClaimMinAggregateOutputType | null
    _max: ClaimMaxAggregateOutputType | null
  }

  type GetClaimGroupByPayload<T extends ClaimGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClaimGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClaimGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClaimGroupByOutputType[P]>
            : GetScalarType<T[P], ClaimGroupByOutputType[P]>
        }
      >
    >


  export type ClaimSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    providerId?: boolean
    payerId?: boolean
    procedureCode?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
    provider?: boolean | ProviderDefaultArgs<ExtArgs>
    payer?: boolean | PayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claim"]>

  export type ClaimSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    providerId?: boolean
    payerId?: boolean
    procedureCode?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
    provider?: boolean | ProviderDefaultArgs<ExtArgs>
    payer?: boolean | PayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claim"]>

  export type ClaimSelectScalar = {
    id?: boolean
    orgId?: boolean
    providerId?: boolean
    payerId?: boolean
    procedureCode?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }

  export type ClaimInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | ProviderDefaultArgs<ExtArgs>
    payer?: boolean | PayerDefaultArgs<ExtArgs>
  }
  export type ClaimIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | ProviderDefaultArgs<ExtArgs>
    payer?: boolean | PayerDefaultArgs<ExtArgs>
  }

  export type $ClaimPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Claim"
    objects: {
      provider: Prisma.$ProviderPayload<ExtArgs>
      payer: Prisma.$PayerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      providerId: string
      payerId: string
      procedureCode: string
      amountMinor: bigint
      currency: string
      status: $Enums.ClaimStatus
      escrowIntentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["claim"]>
    composites: {}
  }

  type ClaimGetPayload<S extends boolean | null | undefined | ClaimDefaultArgs> = $Result.GetResult<Prisma.$ClaimPayload, S>

  type ClaimCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClaimFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClaimCountAggregateInputType | true
    }

  export interface ClaimDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Claim'], meta: { name: 'Claim' } }
    /**
     * Find zero or one Claim that matches the filter.
     * @param {ClaimFindUniqueArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClaimFindUniqueArgs>(args: SelectSubset<T, ClaimFindUniqueArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Claim that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClaimFindUniqueOrThrowArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClaimFindUniqueOrThrowArgs>(args: SelectSubset<T, ClaimFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Claim that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimFindFirstArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClaimFindFirstArgs>(args?: SelectSubset<T, ClaimFindFirstArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Claim that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimFindFirstOrThrowArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClaimFindFirstOrThrowArgs>(args?: SelectSubset<T, ClaimFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Claims that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Claims
     * const claims = await prisma.claim.findMany()
     * 
     * // Get first 10 Claims
     * const claims = await prisma.claim.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const claimWithIdOnly = await prisma.claim.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClaimFindManyArgs>(args?: SelectSubset<T, ClaimFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Claim.
     * @param {ClaimCreateArgs} args - Arguments to create a Claim.
     * @example
     * // Create one Claim
     * const Claim = await prisma.claim.create({
     *   data: {
     *     // ... data to create a Claim
     *   }
     * })
     * 
     */
    create<T extends ClaimCreateArgs>(args: SelectSubset<T, ClaimCreateArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Claims.
     * @param {ClaimCreateManyArgs} args - Arguments to create many Claims.
     * @example
     * // Create many Claims
     * const claim = await prisma.claim.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClaimCreateManyArgs>(args?: SelectSubset<T, ClaimCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Claims and returns the data saved in the database.
     * @param {ClaimCreateManyAndReturnArgs} args - Arguments to create many Claims.
     * @example
     * // Create many Claims
     * const claim = await prisma.claim.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Claims and only return the `id`
     * const claimWithIdOnly = await prisma.claim.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClaimCreateManyAndReturnArgs>(args?: SelectSubset<T, ClaimCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Claim.
     * @param {ClaimDeleteArgs} args - Arguments to delete one Claim.
     * @example
     * // Delete one Claim
     * const Claim = await prisma.claim.delete({
     *   where: {
     *     // ... filter to delete one Claim
     *   }
     * })
     * 
     */
    delete<T extends ClaimDeleteArgs>(args: SelectSubset<T, ClaimDeleteArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Claim.
     * @param {ClaimUpdateArgs} args - Arguments to update one Claim.
     * @example
     * // Update one Claim
     * const claim = await prisma.claim.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClaimUpdateArgs>(args: SelectSubset<T, ClaimUpdateArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Claims.
     * @param {ClaimDeleteManyArgs} args - Arguments to filter Claims to delete.
     * @example
     * // Delete a few Claims
     * const { count } = await prisma.claim.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClaimDeleteManyArgs>(args?: SelectSubset<T, ClaimDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Claims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Claims
     * const claim = await prisma.claim.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClaimUpdateManyArgs>(args: SelectSubset<T, ClaimUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Claim.
     * @param {ClaimUpsertArgs} args - Arguments to update or create a Claim.
     * @example
     * // Update or create a Claim
     * const claim = await prisma.claim.upsert({
     *   create: {
     *     // ... data to create a Claim
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Claim we want to update
     *   }
     * })
     */
    upsert<T extends ClaimUpsertArgs>(args: SelectSubset<T, ClaimUpsertArgs<ExtArgs>>): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Claims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimCountArgs} args - Arguments to filter Claims to count.
     * @example
     * // Count the number of Claims
     * const count = await prisma.claim.count({
     *   where: {
     *     // ... the filter for the Claims we want to count
     *   }
     * })
    **/
    count<T extends ClaimCountArgs>(
      args?: Subset<T, ClaimCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClaimCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Claim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClaimAggregateArgs>(args: Subset<T, ClaimAggregateArgs>): Prisma.PrismaPromise<GetClaimAggregateType<T>>

    /**
     * Group by Claim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimGroupByArgs} args - Group by arguments.
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
      T extends ClaimGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClaimGroupByArgs['orderBy'] }
        : { orderBy?: ClaimGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClaimGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClaimGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Claim model
   */
  readonly fields: ClaimFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Claim.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClaimClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    provider<T extends ProviderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProviderDefaultArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    payer<T extends PayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PayerDefaultArgs<ExtArgs>>): Prisma__PayerClient<$Result.GetResult<Prisma.$PayerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Claim model
   */ 
  interface ClaimFieldRefs {
    readonly id: FieldRef<"Claim", 'String'>
    readonly orgId: FieldRef<"Claim", 'String'>
    readonly providerId: FieldRef<"Claim", 'String'>
    readonly payerId: FieldRef<"Claim", 'String'>
    readonly procedureCode: FieldRef<"Claim", 'String'>
    readonly amountMinor: FieldRef<"Claim", 'BigInt'>
    readonly currency: FieldRef<"Claim", 'String'>
    readonly status: FieldRef<"Claim", 'ClaimStatus'>
    readonly escrowIntentId: FieldRef<"Claim", 'String'>
    readonly createdAt: FieldRef<"Claim", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Claim findUnique
   */
  export type ClaimFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where: ClaimWhereUniqueInput
  }

  /**
   * Claim findUniqueOrThrow
   */
  export type ClaimFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where: ClaimWhereUniqueInput
  }

  /**
   * Claim findFirst
   */
  export type ClaimFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Claims.
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Claims.
     */
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * Claim findFirstOrThrow
   */
  export type ClaimFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Claims.
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Claims.
     */
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * Claim findMany
   */
  export type ClaimFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claims to fetch.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Claims.
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * Claim create
   */
  export type ClaimCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * The data needed to create a Claim.
     */
    data: XOR<ClaimCreateInput, ClaimUncheckedCreateInput>
  }

  /**
   * Claim createMany
   */
  export type ClaimCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Claims.
     */
    data: ClaimCreateManyInput | ClaimCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Claim createManyAndReturn
   */
  export type ClaimCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Claims.
     */
    data: ClaimCreateManyInput | ClaimCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Claim update
   */
  export type ClaimUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * The data needed to update a Claim.
     */
    data: XOR<ClaimUpdateInput, ClaimUncheckedUpdateInput>
    /**
     * Choose, which Claim to update.
     */
    where: ClaimWhereUniqueInput
  }

  /**
   * Claim updateMany
   */
  export type ClaimUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Claims.
     */
    data: XOR<ClaimUpdateManyMutationInput, ClaimUncheckedUpdateManyInput>
    /**
     * Filter which Claims to update
     */
    where?: ClaimWhereInput
  }

  /**
   * Claim upsert
   */
  export type ClaimUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * The filter to search for the Claim to update in case it exists.
     */
    where: ClaimWhereUniqueInput
    /**
     * In case the Claim found by the `where` argument doesn't exist, create a new Claim with this data.
     */
    create: XOR<ClaimCreateInput, ClaimUncheckedCreateInput>
    /**
     * In case the Claim was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClaimUpdateInput, ClaimUncheckedUpdateInput>
  }

  /**
   * Claim delete
   */
  export type ClaimDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter which Claim to delete.
     */
    where: ClaimWhereUniqueInput
  }

  /**
   * Claim deleteMany
   */
  export type ClaimDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Claims to delete
     */
    where?: ClaimWhereInput
  }

  /**
   * Claim without action
   */
  export type ClaimDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
  }


  /**
   * Model RecordAttestation
   */

  export type AggregateRecordAttestation = {
    _count: RecordAttestationCountAggregateOutputType | null
    _min: RecordAttestationMinAggregateOutputType | null
    _max: RecordAttestationMaxAggregateOutputType | null
  }

  export type RecordAttestationMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    patientId: string | null
    dataHash: string | null
    attestationId: string | null
    createdAt: Date | null
  }

  export type RecordAttestationMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    patientId: string | null
    dataHash: string | null
    attestationId: string | null
    createdAt: Date | null
  }

  export type RecordAttestationCountAggregateOutputType = {
    id: number
    orgId: number
    patientId: number
    dataHash: number
    attestationId: number
    createdAt: number
    _all: number
  }


  export type RecordAttestationMinAggregateInputType = {
    id?: true
    orgId?: true
    patientId?: true
    dataHash?: true
    attestationId?: true
    createdAt?: true
  }

  export type RecordAttestationMaxAggregateInputType = {
    id?: true
    orgId?: true
    patientId?: true
    dataHash?: true
    attestationId?: true
    createdAt?: true
  }

  export type RecordAttestationCountAggregateInputType = {
    id?: true
    orgId?: true
    patientId?: true
    dataHash?: true
    attestationId?: true
    createdAt?: true
    _all?: true
  }

  export type RecordAttestationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecordAttestation to aggregate.
     */
    where?: RecordAttestationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordAttestations to fetch.
     */
    orderBy?: RecordAttestationOrderByWithRelationInput | RecordAttestationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecordAttestationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordAttestations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordAttestations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecordAttestations
    **/
    _count?: true | RecordAttestationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecordAttestationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecordAttestationMaxAggregateInputType
  }

  export type GetRecordAttestationAggregateType<T extends RecordAttestationAggregateArgs> = {
        [P in keyof T & keyof AggregateRecordAttestation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecordAttestation[P]>
      : GetScalarType<T[P], AggregateRecordAttestation[P]>
  }




  export type RecordAttestationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecordAttestationWhereInput
    orderBy?: RecordAttestationOrderByWithAggregationInput | RecordAttestationOrderByWithAggregationInput[]
    by: RecordAttestationScalarFieldEnum[] | RecordAttestationScalarFieldEnum
    having?: RecordAttestationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecordAttestationCountAggregateInputType | true
    _min?: RecordAttestationMinAggregateInputType
    _max?: RecordAttestationMaxAggregateInputType
  }

  export type RecordAttestationGroupByOutputType = {
    id: string
    orgId: string
    patientId: string
    dataHash: string
    attestationId: string
    createdAt: Date
    _count: RecordAttestationCountAggregateOutputType | null
    _min: RecordAttestationMinAggregateOutputType | null
    _max: RecordAttestationMaxAggregateOutputType | null
  }

  type GetRecordAttestationGroupByPayload<T extends RecordAttestationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecordAttestationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecordAttestationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecordAttestationGroupByOutputType[P]>
            : GetScalarType<T[P], RecordAttestationGroupByOutputType[P]>
        }
      >
    >


  export type RecordAttestationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    patientId?: boolean
    dataHash?: boolean
    attestationId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["recordAttestation"]>

  export type RecordAttestationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    patientId?: boolean
    dataHash?: boolean
    attestationId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["recordAttestation"]>

  export type RecordAttestationSelectScalar = {
    id?: boolean
    orgId?: boolean
    patientId?: boolean
    dataHash?: boolean
    attestationId?: boolean
    createdAt?: boolean
  }


  export type $RecordAttestationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecordAttestation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      patientId: string
      dataHash: string
      attestationId: string
      createdAt: Date
    }, ExtArgs["result"]["recordAttestation"]>
    composites: {}
  }

  type RecordAttestationGetPayload<S extends boolean | null | undefined | RecordAttestationDefaultArgs> = $Result.GetResult<Prisma.$RecordAttestationPayload, S>

  type RecordAttestationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RecordAttestationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RecordAttestationCountAggregateInputType | true
    }

  export interface RecordAttestationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecordAttestation'], meta: { name: 'RecordAttestation' } }
    /**
     * Find zero or one RecordAttestation that matches the filter.
     * @param {RecordAttestationFindUniqueArgs} args - Arguments to find a RecordAttestation
     * @example
     * // Get one RecordAttestation
     * const recordAttestation = await prisma.recordAttestation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecordAttestationFindUniqueArgs>(args: SelectSubset<T, RecordAttestationFindUniqueArgs<ExtArgs>>): Prisma__RecordAttestationClient<$Result.GetResult<Prisma.$RecordAttestationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RecordAttestation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RecordAttestationFindUniqueOrThrowArgs} args - Arguments to find a RecordAttestation
     * @example
     * // Get one RecordAttestation
     * const recordAttestation = await prisma.recordAttestation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecordAttestationFindUniqueOrThrowArgs>(args: SelectSubset<T, RecordAttestationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecordAttestationClient<$Result.GetResult<Prisma.$RecordAttestationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RecordAttestation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordAttestationFindFirstArgs} args - Arguments to find a RecordAttestation
     * @example
     * // Get one RecordAttestation
     * const recordAttestation = await prisma.recordAttestation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecordAttestationFindFirstArgs>(args?: SelectSubset<T, RecordAttestationFindFirstArgs<ExtArgs>>): Prisma__RecordAttestationClient<$Result.GetResult<Prisma.$RecordAttestationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RecordAttestation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordAttestationFindFirstOrThrowArgs} args - Arguments to find a RecordAttestation
     * @example
     * // Get one RecordAttestation
     * const recordAttestation = await prisma.recordAttestation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecordAttestationFindFirstOrThrowArgs>(args?: SelectSubset<T, RecordAttestationFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecordAttestationClient<$Result.GetResult<Prisma.$RecordAttestationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RecordAttestations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordAttestationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecordAttestations
     * const recordAttestations = await prisma.recordAttestation.findMany()
     * 
     * // Get first 10 RecordAttestations
     * const recordAttestations = await prisma.recordAttestation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recordAttestationWithIdOnly = await prisma.recordAttestation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecordAttestationFindManyArgs>(args?: SelectSubset<T, RecordAttestationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordAttestationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RecordAttestation.
     * @param {RecordAttestationCreateArgs} args - Arguments to create a RecordAttestation.
     * @example
     * // Create one RecordAttestation
     * const RecordAttestation = await prisma.recordAttestation.create({
     *   data: {
     *     // ... data to create a RecordAttestation
     *   }
     * })
     * 
     */
    create<T extends RecordAttestationCreateArgs>(args: SelectSubset<T, RecordAttestationCreateArgs<ExtArgs>>): Prisma__RecordAttestationClient<$Result.GetResult<Prisma.$RecordAttestationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RecordAttestations.
     * @param {RecordAttestationCreateManyArgs} args - Arguments to create many RecordAttestations.
     * @example
     * // Create many RecordAttestations
     * const recordAttestation = await prisma.recordAttestation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecordAttestationCreateManyArgs>(args?: SelectSubset<T, RecordAttestationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecordAttestations and returns the data saved in the database.
     * @param {RecordAttestationCreateManyAndReturnArgs} args - Arguments to create many RecordAttestations.
     * @example
     * // Create many RecordAttestations
     * const recordAttestation = await prisma.recordAttestation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecordAttestations and only return the `id`
     * const recordAttestationWithIdOnly = await prisma.recordAttestation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecordAttestationCreateManyAndReturnArgs>(args?: SelectSubset<T, RecordAttestationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordAttestationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RecordAttestation.
     * @param {RecordAttestationDeleteArgs} args - Arguments to delete one RecordAttestation.
     * @example
     * // Delete one RecordAttestation
     * const RecordAttestation = await prisma.recordAttestation.delete({
     *   where: {
     *     // ... filter to delete one RecordAttestation
     *   }
     * })
     * 
     */
    delete<T extends RecordAttestationDeleteArgs>(args: SelectSubset<T, RecordAttestationDeleteArgs<ExtArgs>>): Prisma__RecordAttestationClient<$Result.GetResult<Prisma.$RecordAttestationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RecordAttestation.
     * @param {RecordAttestationUpdateArgs} args - Arguments to update one RecordAttestation.
     * @example
     * // Update one RecordAttestation
     * const recordAttestation = await prisma.recordAttestation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecordAttestationUpdateArgs>(args: SelectSubset<T, RecordAttestationUpdateArgs<ExtArgs>>): Prisma__RecordAttestationClient<$Result.GetResult<Prisma.$RecordAttestationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RecordAttestations.
     * @param {RecordAttestationDeleteManyArgs} args - Arguments to filter RecordAttestations to delete.
     * @example
     * // Delete a few RecordAttestations
     * const { count } = await prisma.recordAttestation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecordAttestationDeleteManyArgs>(args?: SelectSubset<T, RecordAttestationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecordAttestations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordAttestationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecordAttestations
     * const recordAttestation = await prisma.recordAttestation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecordAttestationUpdateManyArgs>(args: SelectSubset<T, RecordAttestationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RecordAttestation.
     * @param {RecordAttestationUpsertArgs} args - Arguments to update or create a RecordAttestation.
     * @example
     * // Update or create a RecordAttestation
     * const recordAttestation = await prisma.recordAttestation.upsert({
     *   create: {
     *     // ... data to create a RecordAttestation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecordAttestation we want to update
     *   }
     * })
     */
    upsert<T extends RecordAttestationUpsertArgs>(args: SelectSubset<T, RecordAttestationUpsertArgs<ExtArgs>>): Prisma__RecordAttestationClient<$Result.GetResult<Prisma.$RecordAttestationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RecordAttestations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordAttestationCountArgs} args - Arguments to filter RecordAttestations to count.
     * @example
     * // Count the number of RecordAttestations
     * const count = await prisma.recordAttestation.count({
     *   where: {
     *     // ... the filter for the RecordAttestations we want to count
     *   }
     * })
    **/
    count<T extends RecordAttestationCountArgs>(
      args?: Subset<T, RecordAttestationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecordAttestationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecordAttestation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordAttestationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RecordAttestationAggregateArgs>(args: Subset<T, RecordAttestationAggregateArgs>): Prisma.PrismaPromise<GetRecordAttestationAggregateType<T>>

    /**
     * Group by RecordAttestation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordAttestationGroupByArgs} args - Group by arguments.
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
      T extends RecordAttestationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecordAttestationGroupByArgs['orderBy'] }
        : { orderBy?: RecordAttestationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RecordAttestationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecordAttestationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecordAttestation model
   */
  readonly fields: RecordAttestationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecordAttestation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecordAttestationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the RecordAttestation model
   */ 
  interface RecordAttestationFieldRefs {
    readonly id: FieldRef<"RecordAttestation", 'String'>
    readonly orgId: FieldRef<"RecordAttestation", 'String'>
    readonly patientId: FieldRef<"RecordAttestation", 'String'>
    readonly dataHash: FieldRef<"RecordAttestation", 'String'>
    readonly attestationId: FieldRef<"RecordAttestation", 'String'>
    readonly createdAt: FieldRef<"RecordAttestation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RecordAttestation findUnique
   */
  export type RecordAttestationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAttestation
     */
    select?: RecordAttestationSelect<ExtArgs> | null
    /**
     * Filter, which RecordAttestation to fetch.
     */
    where: RecordAttestationWhereUniqueInput
  }

  /**
   * RecordAttestation findUniqueOrThrow
   */
  export type RecordAttestationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAttestation
     */
    select?: RecordAttestationSelect<ExtArgs> | null
    /**
     * Filter, which RecordAttestation to fetch.
     */
    where: RecordAttestationWhereUniqueInput
  }

  /**
   * RecordAttestation findFirst
   */
  export type RecordAttestationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAttestation
     */
    select?: RecordAttestationSelect<ExtArgs> | null
    /**
     * Filter, which RecordAttestation to fetch.
     */
    where?: RecordAttestationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordAttestations to fetch.
     */
    orderBy?: RecordAttestationOrderByWithRelationInput | RecordAttestationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecordAttestations.
     */
    cursor?: RecordAttestationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordAttestations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordAttestations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecordAttestations.
     */
    distinct?: RecordAttestationScalarFieldEnum | RecordAttestationScalarFieldEnum[]
  }

  /**
   * RecordAttestation findFirstOrThrow
   */
  export type RecordAttestationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAttestation
     */
    select?: RecordAttestationSelect<ExtArgs> | null
    /**
     * Filter, which RecordAttestation to fetch.
     */
    where?: RecordAttestationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordAttestations to fetch.
     */
    orderBy?: RecordAttestationOrderByWithRelationInput | RecordAttestationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecordAttestations.
     */
    cursor?: RecordAttestationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordAttestations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordAttestations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecordAttestations.
     */
    distinct?: RecordAttestationScalarFieldEnum | RecordAttestationScalarFieldEnum[]
  }

  /**
   * RecordAttestation findMany
   */
  export type RecordAttestationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAttestation
     */
    select?: RecordAttestationSelect<ExtArgs> | null
    /**
     * Filter, which RecordAttestations to fetch.
     */
    where?: RecordAttestationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordAttestations to fetch.
     */
    orderBy?: RecordAttestationOrderByWithRelationInput | RecordAttestationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecordAttestations.
     */
    cursor?: RecordAttestationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordAttestations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordAttestations.
     */
    skip?: number
    distinct?: RecordAttestationScalarFieldEnum | RecordAttestationScalarFieldEnum[]
  }

  /**
   * RecordAttestation create
   */
  export type RecordAttestationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAttestation
     */
    select?: RecordAttestationSelect<ExtArgs> | null
    /**
     * The data needed to create a RecordAttestation.
     */
    data: XOR<RecordAttestationCreateInput, RecordAttestationUncheckedCreateInput>
  }

  /**
   * RecordAttestation createMany
   */
  export type RecordAttestationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecordAttestations.
     */
    data: RecordAttestationCreateManyInput | RecordAttestationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecordAttestation createManyAndReturn
   */
  export type RecordAttestationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAttestation
     */
    select?: RecordAttestationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RecordAttestations.
     */
    data: RecordAttestationCreateManyInput | RecordAttestationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecordAttestation update
   */
  export type RecordAttestationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAttestation
     */
    select?: RecordAttestationSelect<ExtArgs> | null
    /**
     * The data needed to update a RecordAttestation.
     */
    data: XOR<RecordAttestationUpdateInput, RecordAttestationUncheckedUpdateInput>
    /**
     * Choose, which RecordAttestation to update.
     */
    where: RecordAttestationWhereUniqueInput
  }

  /**
   * RecordAttestation updateMany
   */
  export type RecordAttestationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecordAttestations.
     */
    data: XOR<RecordAttestationUpdateManyMutationInput, RecordAttestationUncheckedUpdateManyInput>
    /**
     * Filter which RecordAttestations to update
     */
    where?: RecordAttestationWhereInput
  }

  /**
   * RecordAttestation upsert
   */
  export type RecordAttestationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAttestation
     */
    select?: RecordAttestationSelect<ExtArgs> | null
    /**
     * The filter to search for the RecordAttestation to update in case it exists.
     */
    where: RecordAttestationWhereUniqueInput
    /**
     * In case the RecordAttestation found by the `where` argument doesn't exist, create a new RecordAttestation with this data.
     */
    create: XOR<RecordAttestationCreateInput, RecordAttestationUncheckedCreateInput>
    /**
     * In case the RecordAttestation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecordAttestationUpdateInput, RecordAttestationUncheckedUpdateInput>
  }

  /**
   * RecordAttestation delete
   */
  export type RecordAttestationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAttestation
     */
    select?: RecordAttestationSelect<ExtArgs> | null
    /**
     * Filter which RecordAttestation to delete.
     */
    where: RecordAttestationWhereUniqueInput
  }

  /**
   * RecordAttestation deleteMany
   */
  export type RecordAttestationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecordAttestations to delete
     */
    where?: RecordAttestationWhereInput
  }

  /**
   * RecordAttestation without action
   */
  export type RecordAttestationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordAttestation
     */
    select?: RecordAttestationSelect<ExtArgs> | null
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


  export const ProviderScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type ProviderScalarFieldEnum = (typeof ProviderScalarFieldEnum)[keyof typeof ProviderScalarFieldEnum]


  export const PayerScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type PayerScalarFieldEnum = (typeof PayerScalarFieldEnum)[keyof typeof PayerScalarFieldEnum]


  export const PatientScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    subjectHash: 'subjectHash',
    createdAt: 'createdAt'
  };

  export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum]


  export const ConsentScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    patientId: 'patientId',
    scope: 'scope',
    expiresAt: 'expiresAt',
    status: 'status',
    attestationId: 'attestationId',
    createdAt: 'createdAt'
  };

  export type ConsentScalarFieldEnum = (typeof ConsentScalarFieldEnum)[keyof typeof ConsentScalarFieldEnum]


  export const ClaimScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    providerId: 'providerId',
    payerId: 'payerId',
    procedureCode: 'procedureCode',
    amountMinor: 'amountMinor',
    currency: 'currency',
    status: 'status',
    escrowIntentId: 'escrowIntentId',
    createdAt: 'createdAt'
  };

  export type ClaimScalarFieldEnum = (typeof ClaimScalarFieldEnum)[keyof typeof ClaimScalarFieldEnum]


  export const RecordAttestationScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    patientId: 'patientId',
    dataHash: 'dataHash',
    attestationId: 'attestationId',
    createdAt: 'createdAt'
  };

  export type RecordAttestationScalarFieldEnum = (typeof RecordAttestationScalarFieldEnum)[keyof typeof RecordAttestationScalarFieldEnum]


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
   * Reference to a field of type 'ConsentStatus'
   */
  export type EnumConsentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConsentStatus'>
    


  /**
   * Reference to a field of type 'ConsentStatus[]'
   */
  export type ListEnumConsentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConsentStatus[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'ClaimStatus'
   */
  export type EnumClaimStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClaimStatus'>
    


  /**
   * Reference to a field of type 'ClaimStatus[]'
   */
  export type ListEnumClaimStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClaimStatus[]'>
    


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

  export type ProviderWhereInput = {
    AND?: ProviderWhereInput | ProviderWhereInput[]
    OR?: ProviderWhereInput[]
    NOT?: ProviderWhereInput | ProviderWhereInput[]
    id?: StringFilter<"Provider"> | string
    orgId?: StringFilter<"Provider"> | string
    name?: StringFilter<"Provider"> | string
    createdAt?: DateTimeFilter<"Provider"> | Date | string
    claims?: ClaimListRelationFilter
  }

  export type ProviderOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    claims?: ClaimOrderByRelationAggregateInput
  }

  export type ProviderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProviderWhereInput | ProviderWhereInput[]
    OR?: ProviderWhereInput[]
    NOT?: ProviderWhereInput | ProviderWhereInput[]
    orgId?: StringFilter<"Provider"> | string
    name?: StringFilter<"Provider"> | string
    createdAt?: DateTimeFilter<"Provider"> | Date | string
    claims?: ClaimListRelationFilter
  }, "id">

  export type ProviderOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: ProviderCountOrderByAggregateInput
    _max?: ProviderMaxOrderByAggregateInput
    _min?: ProviderMinOrderByAggregateInput
  }

  export type ProviderScalarWhereWithAggregatesInput = {
    AND?: ProviderScalarWhereWithAggregatesInput | ProviderScalarWhereWithAggregatesInput[]
    OR?: ProviderScalarWhereWithAggregatesInput[]
    NOT?: ProviderScalarWhereWithAggregatesInput | ProviderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Provider"> | string
    orgId?: StringWithAggregatesFilter<"Provider"> | string
    name?: StringWithAggregatesFilter<"Provider"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Provider"> | Date | string
  }

  export type PayerWhereInput = {
    AND?: PayerWhereInput | PayerWhereInput[]
    OR?: PayerWhereInput[]
    NOT?: PayerWhereInput | PayerWhereInput[]
    id?: StringFilter<"Payer"> | string
    orgId?: StringFilter<"Payer"> | string
    name?: StringFilter<"Payer"> | string
    createdAt?: DateTimeFilter<"Payer"> | Date | string
    claims?: ClaimListRelationFilter
  }

  export type PayerOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    claims?: ClaimOrderByRelationAggregateInput
  }

  export type PayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PayerWhereInput | PayerWhereInput[]
    OR?: PayerWhereInput[]
    NOT?: PayerWhereInput | PayerWhereInput[]
    orgId?: StringFilter<"Payer"> | string
    name?: StringFilter<"Payer"> | string
    createdAt?: DateTimeFilter<"Payer"> | Date | string
    claims?: ClaimListRelationFilter
  }, "id">

  export type PayerOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: PayerCountOrderByAggregateInput
    _max?: PayerMaxOrderByAggregateInput
    _min?: PayerMinOrderByAggregateInput
  }

  export type PayerScalarWhereWithAggregatesInput = {
    AND?: PayerScalarWhereWithAggregatesInput | PayerScalarWhereWithAggregatesInput[]
    OR?: PayerScalarWhereWithAggregatesInput[]
    NOT?: PayerScalarWhereWithAggregatesInput | PayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payer"> | string
    orgId?: StringWithAggregatesFilter<"Payer"> | string
    name?: StringWithAggregatesFilter<"Payer"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Payer"> | Date | string
  }

  export type PatientWhereInput = {
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    id?: StringFilter<"Patient"> | string
    orgId?: StringFilter<"Patient"> | string
    subjectHash?: StringFilter<"Patient"> | string
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    consents?: ConsentListRelationFilter
  }

  export type PatientOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    subjectHash?: SortOrder
    createdAt?: SortOrder
    consents?: ConsentOrderByRelationAggregateInput
  }

  export type PatientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orgId_subjectHash?: PatientOrgIdSubjectHashCompoundUniqueInput
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    orgId?: StringFilter<"Patient"> | string
    subjectHash?: StringFilter<"Patient"> | string
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    consents?: ConsentListRelationFilter
  }, "id" | "orgId_subjectHash">

  export type PatientOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    subjectHash?: SortOrder
    createdAt?: SortOrder
    _count?: PatientCountOrderByAggregateInput
    _max?: PatientMaxOrderByAggregateInput
    _min?: PatientMinOrderByAggregateInput
  }

  export type PatientScalarWhereWithAggregatesInput = {
    AND?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    OR?: PatientScalarWhereWithAggregatesInput[]
    NOT?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Patient"> | string
    orgId?: StringWithAggregatesFilter<"Patient"> | string
    subjectHash?: StringWithAggregatesFilter<"Patient"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
  }

  export type ConsentWhereInput = {
    AND?: ConsentWhereInput | ConsentWhereInput[]
    OR?: ConsentWhereInput[]
    NOT?: ConsentWhereInput | ConsentWhereInput[]
    id?: StringFilter<"Consent"> | string
    orgId?: StringFilter<"Consent"> | string
    patientId?: StringFilter<"Consent"> | string
    scope?: StringFilter<"Consent"> | string
    expiresAt?: DateTimeNullableFilter<"Consent"> | Date | string | null
    status?: EnumConsentStatusFilter<"Consent"> | $Enums.ConsentStatus
    attestationId?: StringNullableFilter<"Consent"> | string | null
    createdAt?: DateTimeFilter<"Consent"> | Date | string
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
  }

  export type ConsentOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    patientId?: SortOrder
    scope?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    status?: SortOrder
    attestationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    patient?: PatientOrderByWithRelationInput
  }

  export type ConsentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConsentWhereInput | ConsentWhereInput[]
    OR?: ConsentWhereInput[]
    NOT?: ConsentWhereInput | ConsentWhereInput[]
    orgId?: StringFilter<"Consent"> | string
    patientId?: StringFilter<"Consent"> | string
    scope?: StringFilter<"Consent"> | string
    expiresAt?: DateTimeNullableFilter<"Consent"> | Date | string | null
    status?: EnumConsentStatusFilter<"Consent"> | $Enums.ConsentStatus
    attestationId?: StringNullableFilter<"Consent"> | string | null
    createdAt?: DateTimeFilter<"Consent"> | Date | string
    patient?: XOR<PatientRelationFilter, PatientWhereInput>
  }, "id">

  export type ConsentOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    patientId?: SortOrder
    scope?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    status?: SortOrder
    attestationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ConsentCountOrderByAggregateInput
    _max?: ConsentMaxOrderByAggregateInput
    _min?: ConsentMinOrderByAggregateInput
  }

  export type ConsentScalarWhereWithAggregatesInput = {
    AND?: ConsentScalarWhereWithAggregatesInput | ConsentScalarWhereWithAggregatesInput[]
    OR?: ConsentScalarWhereWithAggregatesInput[]
    NOT?: ConsentScalarWhereWithAggregatesInput | ConsentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Consent"> | string
    orgId?: StringWithAggregatesFilter<"Consent"> | string
    patientId?: StringWithAggregatesFilter<"Consent"> | string
    scope?: StringWithAggregatesFilter<"Consent"> | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Consent"> | Date | string | null
    status?: EnumConsentStatusWithAggregatesFilter<"Consent"> | $Enums.ConsentStatus
    attestationId?: StringNullableWithAggregatesFilter<"Consent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Consent"> | Date | string
  }

  export type ClaimWhereInput = {
    AND?: ClaimWhereInput | ClaimWhereInput[]
    OR?: ClaimWhereInput[]
    NOT?: ClaimWhereInput | ClaimWhereInput[]
    id?: StringFilter<"Claim"> | string
    orgId?: StringFilter<"Claim"> | string
    providerId?: StringFilter<"Claim"> | string
    payerId?: StringFilter<"Claim"> | string
    procedureCode?: StringFilter<"Claim"> | string
    amountMinor?: BigIntFilter<"Claim"> | bigint | number
    currency?: StringFilter<"Claim"> | string
    status?: EnumClaimStatusFilter<"Claim"> | $Enums.ClaimStatus
    escrowIntentId?: StringNullableFilter<"Claim"> | string | null
    createdAt?: DateTimeFilter<"Claim"> | Date | string
    provider?: XOR<ProviderRelationFilter, ProviderWhereInput>
    payer?: XOR<PayerRelationFilter, PayerWhereInput>
  }

  export type ClaimOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    providerId?: SortOrder
    payerId?: SortOrder
    procedureCode?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    provider?: ProviderOrderByWithRelationInput
    payer?: PayerOrderByWithRelationInput
  }

  export type ClaimWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClaimWhereInput | ClaimWhereInput[]
    OR?: ClaimWhereInput[]
    NOT?: ClaimWhereInput | ClaimWhereInput[]
    orgId?: StringFilter<"Claim"> | string
    providerId?: StringFilter<"Claim"> | string
    payerId?: StringFilter<"Claim"> | string
    procedureCode?: StringFilter<"Claim"> | string
    amountMinor?: BigIntFilter<"Claim"> | bigint | number
    currency?: StringFilter<"Claim"> | string
    status?: EnumClaimStatusFilter<"Claim"> | $Enums.ClaimStatus
    escrowIntentId?: StringNullableFilter<"Claim"> | string | null
    createdAt?: DateTimeFilter<"Claim"> | Date | string
    provider?: XOR<ProviderRelationFilter, ProviderWhereInput>
    payer?: XOR<PayerRelationFilter, PayerWhereInput>
  }, "id">

  export type ClaimOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    providerId?: SortOrder
    payerId?: SortOrder
    procedureCode?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ClaimCountOrderByAggregateInput
    _avg?: ClaimAvgOrderByAggregateInput
    _max?: ClaimMaxOrderByAggregateInput
    _min?: ClaimMinOrderByAggregateInput
    _sum?: ClaimSumOrderByAggregateInput
  }

  export type ClaimScalarWhereWithAggregatesInput = {
    AND?: ClaimScalarWhereWithAggregatesInput | ClaimScalarWhereWithAggregatesInput[]
    OR?: ClaimScalarWhereWithAggregatesInput[]
    NOT?: ClaimScalarWhereWithAggregatesInput | ClaimScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Claim"> | string
    orgId?: StringWithAggregatesFilter<"Claim"> | string
    providerId?: StringWithAggregatesFilter<"Claim"> | string
    payerId?: StringWithAggregatesFilter<"Claim"> | string
    procedureCode?: StringWithAggregatesFilter<"Claim"> | string
    amountMinor?: BigIntWithAggregatesFilter<"Claim"> | bigint | number
    currency?: StringWithAggregatesFilter<"Claim"> | string
    status?: EnumClaimStatusWithAggregatesFilter<"Claim"> | $Enums.ClaimStatus
    escrowIntentId?: StringNullableWithAggregatesFilter<"Claim"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Claim"> | Date | string
  }

  export type RecordAttestationWhereInput = {
    AND?: RecordAttestationWhereInput | RecordAttestationWhereInput[]
    OR?: RecordAttestationWhereInput[]
    NOT?: RecordAttestationWhereInput | RecordAttestationWhereInput[]
    id?: StringFilter<"RecordAttestation"> | string
    orgId?: StringFilter<"RecordAttestation"> | string
    patientId?: StringFilter<"RecordAttestation"> | string
    dataHash?: StringFilter<"RecordAttestation"> | string
    attestationId?: StringFilter<"RecordAttestation"> | string
    createdAt?: DateTimeFilter<"RecordAttestation"> | Date | string
  }

  export type RecordAttestationOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    patientId?: SortOrder
    dataHash?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type RecordAttestationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecordAttestationWhereInput | RecordAttestationWhereInput[]
    OR?: RecordAttestationWhereInput[]
    NOT?: RecordAttestationWhereInput | RecordAttestationWhereInput[]
    orgId?: StringFilter<"RecordAttestation"> | string
    patientId?: StringFilter<"RecordAttestation"> | string
    dataHash?: StringFilter<"RecordAttestation"> | string
    attestationId?: StringFilter<"RecordAttestation"> | string
    createdAt?: DateTimeFilter<"RecordAttestation"> | Date | string
  }, "id">

  export type RecordAttestationOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    patientId?: SortOrder
    dataHash?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
    _count?: RecordAttestationCountOrderByAggregateInput
    _max?: RecordAttestationMaxOrderByAggregateInput
    _min?: RecordAttestationMinOrderByAggregateInput
  }

  export type RecordAttestationScalarWhereWithAggregatesInput = {
    AND?: RecordAttestationScalarWhereWithAggregatesInput | RecordAttestationScalarWhereWithAggregatesInput[]
    OR?: RecordAttestationScalarWhereWithAggregatesInput[]
    NOT?: RecordAttestationScalarWhereWithAggregatesInput | RecordAttestationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecordAttestation"> | string
    orgId?: StringWithAggregatesFilter<"RecordAttestation"> | string
    patientId?: StringWithAggregatesFilter<"RecordAttestation"> | string
    dataHash?: StringWithAggregatesFilter<"RecordAttestation"> | string
    attestationId?: StringWithAggregatesFilter<"RecordAttestation"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RecordAttestation"> | Date | string
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

  export type ProviderCreateInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
    claims?: ClaimCreateNestedManyWithoutProviderInput
  }

  export type ProviderUncheckedCreateInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
    claims?: ClaimUncheckedCreateNestedManyWithoutProviderInput
  }

  export type ProviderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUpdateManyWithoutProviderNestedInput
  }

  export type ProviderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type ProviderCreateManyInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
  }

  export type ProviderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayerCreateInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
    claims?: ClaimCreateNestedManyWithoutPayerInput
  }

  export type PayerUncheckedCreateInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
    claims?: ClaimUncheckedCreateNestedManyWithoutPayerInput
  }

  export type PayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUpdateManyWithoutPayerNestedInput
  }

  export type PayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUncheckedUpdateManyWithoutPayerNestedInput
  }

  export type PayerCreateManyInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
  }

  export type PayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientCreateInput = {
    id: string
    orgId: string
    subjectHash: string
    createdAt?: Date | string
    consents?: ConsentCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateInput = {
    id: string
    orgId: string
    subjectHash: string
    createdAt?: Date | string
    consents?: ConsentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consents?: ConsentUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    consents?: ConsentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateManyInput = {
    id: string
    orgId: string
    subjectHash: string
    createdAt?: Date | string
  }

  export type PatientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentCreateInput = {
    id: string
    orgId: string
    scope: string
    expiresAt?: Date | string | null
    status?: $Enums.ConsentStatus
    attestationId?: string | null
    createdAt?: Date | string
    patient: PatientCreateNestedOneWithoutConsentsInput
  }

  export type ConsentUncheckedCreateInput = {
    id: string
    orgId: string
    patientId: string
    scope: string
    expiresAt?: Date | string | null
    status?: $Enums.ConsentStatus
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type ConsentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutConsentsNestedInput
  }

  export type ConsentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentCreateManyInput = {
    id: string
    orgId: string
    patientId: string
    scope: string
    expiresAt?: Date | string | null
    status?: $Enums.ConsentStatus
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type ConsentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimCreateInput = {
    id: string
    orgId: string
    procedureCode: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.ClaimStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
    provider: ProviderCreateNestedOneWithoutClaimsInput
    payer: PayerCreateNestedOneWithoutClaimsInput
  }

  export type ClaimUncheckedCreateInput = {
    id: string
    orgId: string
    providerId: string
    payerId: string
    procedureCode: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.ClaimStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type ClaimUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    procedureCode?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: ProviderUpdateOneRequiredWithoutClaimsNestedInput
    payer?: PayerUpdateOneRequiredWithoutClaimsNestedInput
  }

  export type ClaimUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    payerId?: StringFieldUpdateOperationsInput | string
    procedureCode?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimCreateManyInput = {
    id: string
    orgId: string
    providerId: string
    payerId: string
    procedureCode: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.ClaimStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type ClaimUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    procedureCode?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    payerId?: StringFieldUpdateOperationsInput | string
    procedureCode?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordAttestationCreateInput = {
    id: string
    orgId: string
    patientId: string
    dataHash: string
    attestationId: string
    createdAt?: Date | string
  }

  export type RecordAttestationUncheckedCreateInput = {
    id: string
    orgId: string
    patientId: string
    dataHash: string
    attestationId: string
    createdAt?: Date | string
  }

  export type RecordAttestationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordAttestationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordAttestationCreateManyInput = {
    id: string
    orgId: string
    patientId: string
    dataHash: string
    attestationId: string
    createdAt?: Date | string
  }

  export type RecordAttestationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordAttestationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: StringFieldUpdateOperationsInput | string
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

  export type ClaimListRelationFilter = {
    every?: ClaimWhereInput
    some?: ClaimWhereInput
    none?: ClaimWhereInput
  }

  export type ClaimOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProviderCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ProviderMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ProviderMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type PayerCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type PayerMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type PayerMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type ConsentListRelationFilter = {
    every?: ConsentWhereInput
    some?: ConsentWhereInput
    none?: ConsentWhereInput
  }

  export type ConsentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientOrgIdSubjectHashCompoundUniqueInput = {
    orgId: string
    subjectHash: string
  }

  export type PatientCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    subjectHash?: SortOrder
    createdAt?: SortOrder
  }

  export type PatientMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    subjectHash?: SortOrder
    createdAt?: SortOrder
  }

  export type PatientMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    subjectHash?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumConsentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsentStatus | EnumConsentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConsentStatus[] | ListEnumConsentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsentStatus[] | ListEnumConsentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConsentStatusFilter<$PrismaModel> | $Enums.ConsentStatus
  }

  export type PatientRelationFilter = {
    is?: PatientWhereInput
    isNot?: PatientWhereInput
  }

  export type ConsentCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    patientId?: SortOrder
    scope?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type ConsentMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    patientId?: SortOrder
    scope?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type ConsentMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    patientId?: SortOrder
    scope?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumConsentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsentStatus | EnumConsentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConsentStatus[] | ListEnumConsentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsentStatus[] | ListEnumConsentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConsentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConsentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConsentStatusFilter<$PrismaModel>
    _max?: NestedEnumConsentStatusFilter<$PrismaModel>
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

  export type EnumClaimStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusFilter<$PrismaModel> | $Enums.ClaimStatus
  }

  export type ProviderRelationFilter = {
    is?: ProviderWhereInput
    isNot?: ProviderWhereInput
  }

  export type PayerRelationFilter = {
    is?: PayerWhereInput
    isNot?: PayerWhereInput
  }

  export type ClaimCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    providerId?: SortOrder
    payerId?: SortOrder
    procedureCode?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClaimAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type ClaimMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    providerId?: SortOrder
    payerId?: SortOrder
    procedureCode?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClaimMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    providerId?: SortOrder
    payerId?: SortOrder
    procedureCode?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClaimSumOrderByAggregateInput = {
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

  export type EnumClaimStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClaimStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClaimStatusFilter<$PrismaModel>
    _max?: NestedEnumClaimStatusFilter<$PrismaModel>
  }

  export type RecordAttestationCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    patientId?: SortOrder
    dataHash?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type RecordAttestationMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    patientId?: SortOrder
    dataHash?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type RecordAttestationMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    patientId?: SortOrder
    dataHash?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
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

  export type ClaimCreateNestedManyWithoutProviderInput = {
    create?: XOR<ClaimCreateWithoutProviderInput, ClaimUncheckedCreateWithoutProviderInput> | ClaimCreateWithoutProviderInput[] | ClaimUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutProviderInput | ClaimCreateOrConnectWithoutProviderInput[]
    createMany?: ClaimCreateManyProviderInputEnvelope
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
  }

  export type ClaimUncheckedCreateNestedManyWithoutProviderInput = {
    create?: XOR<ClaimCreateWithoutProviderInput, ClaimUncheckedCreateWithoutProviderInput> | ClaimCreateWithoutProviderInput[] | ClaimUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutProviderInput | ClaimCreateOrConnectWithoutProviderInput[]
    createMany?: ClaimCreateManyProviderInputEnvelope
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
  }

  export type ClaimUpdateManyWithoutProviderNestedInput = {
    create?: XOR<ClaimCreateWithoutProviderInput, ClaimUncheckedCreateWithoutProviderInput> | ClaimCreateWithoutProviderInput[] | ClaimUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutProviderInput | ClaimCreateOrConnectWithoutProviderInput[]
    upsert?: ClaimUpsertWithWhereUniqueWithoutProviderInput | ClaimUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: ClaimCreateManyProviderInputEnvelope
    set?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    disconnect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    delete?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    update?: ClaimUpdateWithWhereUniqueWithoutProviderInput | ClaimUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: ClaimUpdateManyWithWhereWithoutProviderInput | ClaimUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
  }

  export type ClaimUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: XOR<ClaimCreateWithoutProviderInput, ClaimUncheckedCreateWithoutProviderInput> | ClaimCreateWithoutProviderInput[] | ClaimUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutProviderInput | ClaimCreateOrConnectWithoutProviderInput[]
    upsert?: ClaimUpsertWithWhereUniqueWithoutProviderInput | ClaimUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: ClaimCreateManyProviderInputEnvelope
    set?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    disconnect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    delete?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    update?: ClaimUpdateWithWhereUniqueWithoutProviderInput | ClaimUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: ClaimUpdateManyWithWhereWithoutProviderInput | ClaimUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
  }

  export type ClaimCreateNestedManyWithoutPayerInput = {
    create?: XOR<ClaimCreateWithoutPayerInput, ClaimUncheckedCreateWithoutPayerInput> | ClaimCreateWithoutPayerInput[] | ClaimUncheckedCreateWithoutPayerInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutPayerInput | ClaimCreateOrConnectWithoutPayerInput[]
    createMany?: ClaimCreateManyPayerInputEnvelope
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
  }

  export type ClaimUncheckedCreateNestedManyWithoutPayerInput = {
    create?: XOR<ClaimCreateWithoutPayerInput, ClaimUncheckedCreateWithoutPayerInput> | ClaimCreateWithoutPayerInput[] | ClaimUncheckedCreateWithoutPayerInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutPayerInput | ClaimCreateOrConnectWithoutPayerInput[]
    createMany?: ClaimCreateManyPayerInputEnvelope
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
  }

  export type ClaimUpdateManyWithoutPayerNestedInput = {
    create?: XOR<ClaimCreateWithoutPayerInput, ClaimUncheckedCreateWithoutPayerInput> | ClaimCreateWithoutPayerInput[] | ClaimUncheckedCreateWithoutPayerInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutPayerInput | ClaimCreateOrConnectWithoutPayerInput[]
    upsert?: ClaimUpsertWithWhereUniqueWithoutPayerInput | ClaimUpsertWithWhereUniqueWithoutPayerInput[]
    createMany?: ClaimCreateManyPayerInputEnvelope
    set?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    disconnect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    delete?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    update?: ClaimUpdateWithWhereUniqueWithoutPayerInput | ClaimUpdateWithWhereUniqueWithoutPayerInput[]
    updateMany?: ClaimUpdateManyWithWhereWithoutPayerInput | ClaimUpdateManyWithWhereWithoutPayerInput[]
    deleteMany?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
  }

  export type ClaimUncheckedUpdateManyWithoutPayerNestedInput = {
    create?: XOR<ClaimCreateWithoutPayerInput, ClaimUncheckedCreateWithoutPayerInput> | ClaimCreateWithoutPayerInput[] | ClaimUncheckedCreateWithoutPayerInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutPayerInput | ClaimCreateOrConnectWithoutPayerInput[]
    upsert?: ClaimUpsertWithWhereUniqueWithoutPayerInput | ClaimUpsertWithWhereUniqueWithoutPayerInput[]
    createMany?: ClaimCreateManyPayerInputEnvelope
    set?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    disconnect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    delete?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    update?: ClaimUpdateWithWhereUniqueWithoutPayerInput | ClaimUpdateWithWhereUniqueWithoutPayerInput[]
    updateMany?: ClaimUpdateManyWithWhereWithoutPayerInput | ClaimUpdateManyWithWhereWithoutPayerInput[]
    deleteMany?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
  }

  export type ConsentCreateNestedManyWithoutPatientInput = {
    create?: XOR<ConsentCreateWithoutPatientInput, ConsentUncheckedCreateWithoutPatientInput> | ConsentCreateWithoutPatientInput[] | ConsentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutPatientInput | ConsentCreateOrConnectWithoutPatientInput[]
    createMany?: ConsentCreateManyPatientInputEnvelope
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
  }

  export type ConsentUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<ConsentCreateWithoutPatientInput, ConsentUncheckedCreateWithoutPatientInput> | ConsentCreateWithoutPatientInput[] | ConsentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutPatientInput | ConsentCreateOrConnectWithoutPatientInput[]
    createMany?: ConsentCreateManyPatientInputEnvelope
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
  }

  export type ConsentUpdateManyWithoutPatientNestedInput = {
    create?: XOR<ConsentCreateWithoutPatientInput, ConsentUncheckedCreateWithoutPatientInput> | ConsentCreateWithoutPatientInput[] | ConsentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutPatientInput | ConsentCreateOrConnectWithoutPatientInput[]
    upsert?: ConsentUpsertWithWhereUniqueWithoutPatientInput | ConsentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: ConsentCreateManyPatientInputEnvelope
    set?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    disconnect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    delete?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    update?: ConsentUpdateWithWhereUniqueWithoutPatientInput | ConsentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: ConsentUpdateManyWithWhereWithoutPatientInput | ConsentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
  }

  export type ConsentUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<ConsentCreateWithoutPatientInput, ConsentUncheckedCreateWithoutPatientInput> | ConsentCreateWithoutPatientInput[] | ConsentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: ConsentCreateOrConnectWithoutPatientInput | ConsentCreateOrConnectWithoutPatientInput[]
    upsert?: ConsentUpsertWithWhereUniqueWithoutPatientInput | ConsentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: ConsentCreateManyPatientInputEnvelope
    set?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    disconnect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    delete?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    connect?: ConsentWhereUniqueInput | ConsentWhereUniqueInput[]
    update?: ConsentUpdateWithWhereUniqueWithoutPatientInput | ConsentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: ConsentUpdateManyWithWhereWithoutPatientInput | ConsentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
  }

  export type PatientCreateNestedOneWithoutConsentsInput = {
    create?: XOR<PatientCreateWithoutConsentsInput, PatientUncheckedCreateWithoutConsentsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutConsentsInput
    connect?: PatientWhereUniqueInput
  }

  export type EnumConsentStatusFieldUpdateOperationsInput = {
    set?: $Enums.ConsentStatus
  }

  export type PatientUpdateOneRequiredWithoutConsentsNestedInput = {
    create?: XOR<PatientCreateWithoutConsentsInput, PatientUncheckedCreateWithoutConsentsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutConsentsInput
    upsert?: PatientUpsertWithoutConsentsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutConsentsInput, PatientUpdateWithoutConsentsInput>, PatientUncheckedUpdateWithoutConsentsInput>
  }

  export type ProviderCreateNestedOneWithoutClaimsInput = {
    create?: XOR<ProviderCreateWithoutClaimsInput, ProviderUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: ProviderCreateOrConnectWithoutClaimsInput
    connect?: ProviderWhereUniqueInput
  }

  export type PayerCreateNestedOneWithoutClaimsInput = {
    create?: XOR<PayerCreateWithoutClaimsInput, PayerUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: PayerCreateOrConnectWithoutClaimsInput
    connect?: PayerWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumClaimStatusFieldUpdateOperationsInput = {
    set?: $Enums.ClaimStatus
  }

  export type ProviderUpdateOneRequiredWithoutClaimsNestedInput = {
    create?: XOR<ProviderCreateWithoutClaimsInput, ProviderUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: ProviderCreateOrConnectWithoutClaimsInput
    upsert?: ProviderUpsertWithoutClaimsInput
    connect?: ProviderWhereUniqueInput
    update?: XOR<XOR<ProviderUpdateToOneWithWhereWithoutClaimsInput, ProviderUpdateWithoutClaimsInput>, ProviderUncheckedUpdateWithoutClaimsInput>
  }

  export type PayerUpdateOneRequiredWithoutClaimsNestedInput = {
    create?: XOR<PayerCreateWithoutClaimsInput, PayerUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: PayerCreateOrConnectWithoutClaimsInput
    upsert?: PayerUpsertWithoutClaimsInput
    connect?: PayerWhereUniqueInput
    update?: XOR<XOR<PayerUpdateToOneWithWhereWithoutClaimsInput, PayerUpdateWithoutClaimsInput>, PayerUncheckedUpdateWithoutClaimsInput>
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

  export type NestedEnumConsentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsentStatus | EnumConsentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConsentStatus[] | ListEnumConsentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsentStatus[] | ListEnumConsentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConsentStatusFilter<$PrismaModel> | $Enums.ConsentStatus
  }

  export type NestedEnumConsentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConsentStatus | EnumConsentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConsentStatus[] | ListEnumConsentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConsentStatus[] | ListEnumConsentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConsentStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConsentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConsentStatusFilter<$PrismaModel>
    _max?: NestedEnumConsentStatusFilter<$PrismaModel>
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

  export type NestedEnumClaimStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusFilter<$PrismaModel> | $Enums.ClaimStatus
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

  export type NestedEnumClaimStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClaimStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClaimStatusFilter<$PrismaModel>
    _max?: NestedEnumClaimStatusFilter<$PrismaModel>
  }

  export type ClaimCreateWithoutProviderInput = {
    id: string
    orgId: string
    procedureCode: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.ClaimStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
    payer: PayerCreateNestedOneWithoutClaimsInput
  }

  export type ClaimUncheckedCreateWithoutProviderInput = {
    id: string
    orgId: string
    payerId: string
    procedureCode: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.ClaimStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type ClaimCreateOrConnectWithoutProviderInput = {
    where: ClaimWhereUniqueInput
    create: XOR<ClaimCreateWithoutProviderInput, ClaimUncheckedCreateWithoutProviderInput>
  }

  export type ClaimCreateManyProviderInputEnvelope = {
    data: ClaimCreateManyProviderInput | ClaimCreateManyProviderInput[]
    skipDuplicates?: boolean
  }

  export type ClaimUpsertWithWhereUniqueWithoutProviderInput = {
    where: ClaimWhereUniqueInput
    update: XOR<ClaimUpdateWithoutProviderInput, ClaimUncheckedUpdateWithoutProviderInput>
    create: XOR<ClaimCreateWithoutProviderInput, ClaimUncheckedCreateWithoutProviderInput>
  }

  export type ClaimUpdateWithWhereUniqueWithoutProviderInput = {
    where: ClaimWhereUniqueInput
    data: XOR<ClaimUpdateWithoutProviderInput, ClaimUncheckedUpdateWithoutProviderInput>
  }

  export type ClaimUpdateManyWithWhereWithoutProviderInput = {
    where: ClaimScalarWhereInput
    data: XOR<ClaimUpdateManyMutationInput, ClaimUncheckedUpdateManyWithoutProviderInput>
  }

  export type ClaimScalarWhereInput = {
    AND?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
    OR?: ClaimScalarWhereInput[]
    NOT?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
    id?: StringFilter<"Claim"> | string
    orgId?: StringFilter<"Claim"> | string
    providerId?: StringFilter<"Claim"> | string
    payerId?: StringFilter<"Claim"> | string
    procedureCode?: StringFilter<"Claim"> | string
    amountMinor?: BigIntFilter<"Claim"> | bigint | number
    currency?: StringFilter<"Claim"> | string
    status?: EnumClaimStatusFilter<"Claim"> | $Enums.ClaimStatus
    escrowIntentId?: StringNullableFilter<"Claim"> | string | null
    createdAt?: DateTimeFilter<"Claim"> | Date | string
  }

  export type ClaimCreateWithoutPayerInput = {
    id: string
    orgId: string
    procedureCode: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.ClaimStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
    provider: ProviderCreateNestedOneWithoutClaimsInput
  }

  export type ClaimUncheckedCreateWithoutPayerInput = {
    id: string
    orgId: string
    providerId: string
    procedureCode: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.ClaimStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type ClaimCreateOrConnectWithoutPayerInput = {
    where: ClaimWhereUniqueInput
    create: XOR<ClaimCreateWithoutPayerInput, ClaimUncheckedCreateWithoutPayerInput>
  }

  export type ClaimCreateManyPayerInputEnvelope = {
    data: ClaimCreateManyPayerInput | ClaimCreateManyPayerInput[]
    skipDuplicates?: boolean
  }

  export type ClaimUpsertWithWhereUniqueWithoutPayerInput = {
    where: ClaimWhereUniqueInput
    update: XOR<ClaimUpdateWithoutPayerInput, ClaimUncheckedUpdateWithoutPayerInput>
    create: XOR<ClaimCreateWithoutPayerInput, ClaimUncheckedCreateWithoutPayerInput>
  }

  export type ClaimUpdateWithWhereUniqueWithoutPayerInput = {
    where: ClaimWhereUniqueInput
    data: XOR<ClaimUpdateWithoutPayerInput, ClaimUncheckedUpdateWithoutPayerInput>
  }

  export type ClaimUpdateManyWithWhereWithoutPayerInput = {
    where: ClaimScalarWhereInput
    data: XOR<ClaimUpdateManyMutationInput, ClaimUncheckedUpdateManyWithoutPayerInput>
  }

  export type ConsentCreateWithoutPatientInput = {
    id: string
    orgId: string
    scope: string
    expiresAt?: Date | string | null
    status?: $Enums.ConsentStatus
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type ConsentUncheckedCreateWithoutPatientInput = {
    id: string
    orgId: string
    scope: string
    expiresAt?: Date | string | null
    status?: $Enums.ConsentStatus
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type ConsentCreateOrConnectWithoutPatientInput = {
    where: ConsentWhereUniqueInput
    create: XOR<ConsentCreateWithoutPatientInput, ConsentUncheckedCreateWithoutPatientInput>
  }

  export type ConsentCreateManyPatientInputEnvelope = {
    data: ConsentCreateManyPatientInput | ConsentCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type ConsentUpsertWithWhereUniqueWithoutPatientInput = {
    where: ConsentWhereUniqueInput
    update: XOR<ConsentUpdateWithoutPatientInput, ConsentUncheckedUpdateWithoutPatientInput>
    create: XOR<ConsentCreateWithoutPatientInput, ConsentUncheckedCreateWithoutPatientInput>
  }

  export type ConsentUpdateWithWhereUniqueWithoutPatientInput = {
    where: ConsentWhereUniqueInput
    data: XOR<ConsentUpdateWithoutPatientInput, ConsentUncheckedUpdateWithoutPatientInput>
  }

  export type ConsentUpdateManyWithWhereWithoutPatientInput = {
    where: ConsentScalarWhereInput
    data: XOR<ConsentUpdateManyMutationInput, ConsentUncheckedUpdateManyWithoutPatientInput>
  }

  export type ConsentScalarWhereInput = {
    AND?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
    OR?: ConsentScalarWhereInput[]
    NOT?: ConsentScalarWhereInput | ConsentScalarWhereInput[]
    id?: StringFilter<"Consent"> | string
    orgId?: StringFilter<"Consent"> | string
    patientId?: StringFilter<"Consent"> | string
    scope?: StringFilter<"Consent"> | string
    expiresAt?: DateTimeNullableFilter<"Consent"> | Date | string | null
    status?: EnumConsentStatusFilter<"Consent"> | $Enums.ConsentStatus
    attestationId?: StringNullableFilter<"Consent"> | string | null
    createdAt?: DateTimeFilter<"Consent"> | Date | string
  }

  export type PatientCreateWithoutConsentsInput = {
    id: string
    orgId: string
    subjectHash: string
    createdAt?: Date | string
  }

  export type PatientUncheckedCreateWithoutConsentsInput = {
    id: string
    orgId: string
    subjectHash: string
    createdAt?: Date | string
  }

  export type PatientCreateOrConnectWithoutConsentsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutConsentsInput, PatientUncheckedCreateWithoutConsentsInput>
  }

  export type PatientUpsertWithoutConsentsInput = {
    update: XOR<PatientUpdateWithoutConsentsInput, PatientUncheckedUpdateWithoutConsentsInput>
    create: XOR<PatientCreateWithoutConsentsInput, PatientUncheckedCreateWithoutConsentsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutConsentsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutConsentsInput, PatientUncheckedUpdateWithoutConsentsInput>
  }

  export type PatientUpdateWithoutConsentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientUncheckedUpdateWithoutConsentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderCreateWithoutClaimsInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
  }

  export type ProviderUncheckedCreateWithoutClaimsInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
  }

  export type ProviderCreateOrConnectWithoutClaimsInput = {
    where: ProviderWhereUniqueInput
    create: XOR<ProviderCreateWithoutClaimsInput, ProviderUncheckedCreateWithoutClaimsInput>
  }

  export type PayerCreateWithoutClaimsInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
  }

  export type PayerUncheckedCreateWithoutClaimsInput = {
    id: string
    orgId: string
    name: string
    createdAt?: Date | string
  }

  export type PayerCreateOrConnectWithoutClaimsInput = {
    where: PayerWhereUniqueInput
    create: XOR<PayerCreateWithoutClaimsInput, PayerUncheckedCreateWithoutClaimsInput>
  }

  export type ProviderUpsertWithoutClaimsInput = {
    update: XOR<ProviderUpdateWithoutClaimsInput, ProviderUncheckedUpdateWithoutClaimsInput>
    create: XOR<ProviderCreateWithoutClaimsInput, ProviderUncheckedCreateWithoutClaimsInput>
    where?: ProviderWhereInput
  }

  export type ProviderUpdateToOneWithWhereWithoutClaimsInput = {
    where?: ProviderWhereInput
    data: XOR<ProviderUpdateWithoutClaimsInput, ProviderUncheckedUpdateWithoutClaimsInput>
  }

  export type ProviderUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderUncheckedUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayerUpsertWithoutClaimsInput = {
    update: XOR<PayerUpdateWithoutClaimsInput, PayerUncheckedUpdateWithoutClaimsInput>
    create: XOR<PayerCreateWithoutClaimsInput, PayerUncheckedCreateWithoutClaimsInput>
    where?: PayerWhereInput
  }

  export type PayerUpdateToOneWithWhereWithoutClaimsInput = {
    where?: PayerWhereInput
    data: XOR<PayerUpdateWithoutClaimsInput, PayerUncheckedUpdateWithoutClaimsInput>
  }

  export type PayerUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayerUncheckedUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimCreateManyProviderInput = {
    id: string
    orgId: string
    payerId: string
    procedureCode: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.ClaimStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type ClaimUpdateWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    procedureCode?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payer?: PayerUpdateOneRequiredWithoutClaimsNestedInput
  }

  export type ClaimUncheckedUpdateWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    payerId?: StringFieldUpdateOperationsInput | string
    procedureCode?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimUncheckedUpdateManyWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    payerId?: StringFieldUpdateOperationsInput | string
    procedureCode?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimCreateManyPayerInput = {
    id: string
    orgId: string
    providerId: string
    procedureCode: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.ClaimStatus
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type ClaimUpdateWithoutPayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    procedureCode?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: ProviderUpdateOneRequiredWithoutClaimsNestedInput
  }

  export type ClaimUncheckedUpdateWithoutPayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    procedureCode?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimUncheckedUpdateManyWithoutPayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    procedureCode?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentCreateManyPatientInput = {
    id: string
    orgId: string
    scope: string
    expiresAt?: Date | string | null
    status?: $Enums.ConsentStatus
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type ConsentUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConsentUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConsentStatusFieldUpdateOperationsInput | $Enums.ConsentStatus
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ProviderCountOutputTypeDefaultArgs instead
     */
    export type ProviderCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProviderCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PayerCountOutputTypeDefaultArgs instead
     */
    export type PayerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PayerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PatientCountOutputTypeDefaultArgs instead
     */
    export type PatientCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PatientCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventOutboxDefaultArgs instead
     */
    export type EventOutboxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventOutboxDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProviderDefaultArgs instead
     */
    export type ProviderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProviderDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PayerDefaultArgs instead
     */
    export type PayerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PayerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PatientDefaultArgs instead
     */
    export type PatientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PatientDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ConsentDefaultArgs instead
     */
    export type ConsentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConsentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClaimDefaultArgs instead
     */
    export type ClaimArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClaimDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RecordAttestationDefaultArgs instead
     */
    export type RecordAttestationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RecordAttestationDefaultArgs<ExtArgs>

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