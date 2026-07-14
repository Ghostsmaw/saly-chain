
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
 * Model Program
 * 
 */
export type Program = $Result.DefaultSelection<Prisma.$ProgramPayload>
/**
 * Model Beneficiary
 * 
 */
export type Beneficiary = $Result.DefaultSelection<Prisma.$BeneficiaryPayload>
/**
 * Model Disbursement
 * 
 */
export type Disbursement = $Result.DefaultSelection<Prisma.$DisbursementPayload>
/**
 * Model Procurement
 * 
 */
export type Procurement = $Result.DefaultSelection<Prisma.$ProcurementPayload>
/**
 * Model PublicRecord
 * 
 */
export type PublicRecord = $Result.DefaultSelection<Prisma.$PublicRecordPayload>

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


export const DisbursementStatus: {
  PENDING: 'PENDING',
  BATCHED: 'BATCHED',
  SETTLED: 'SETTLED',
  FAILED: 'FAILED'
};

export type DisbursementStatus = (typeof DisbursementStatus)[keyof typeof DisbursementStatus]


export const ProcurementStatus: {
  OPEN: 'OPEN',
  AWARDED: 'AWARDED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type ProcurementStatus = (typeof ProcurementStatus)[keyof typeof ProcurementStatus]

}

export type OutboxStatus = $Enums.OutboxStatus

export const OutboxStatus: typeof $Enums.OutboxStatus

export type DisbursementStatus = $Enums.DisbursementStatus

export const DisbursementStatus: typeof $Enums.DisbursementStatus

export type ProcurementStatus = $Enums.ProcurementStatus

export const ProcurementStatus: typeof $Enums.ProcurementStatus

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
   * `prisma.program`: Exposes CRUD operations for the **Program** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Programs
    * const programs = await prisma.program.findMany()
    * ```
    */
  get program(): Prisma.ProgramDelegate<ExtArgs>;

  /**
   * `prisma.beneficiary`: Exposes CRUD operations for the **Beneficiary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Beneficiaries
    * const beneficiaries = await prisma.beneficiary.findMany()
    * ```
    */
  get beneficiary(): Prisma.BeneficiaryDelegate<ExtArgs>;

  /**
   * `prisma.disbursement`: Exposes CRUD operations for the **Disbursement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Disbursements
    * const disbursements = await prisma.disbursement.findMany()
    * ```
    */
  get disbursement(): Prisma.DisbursementDelegate<ExtArgs>;

  /**
   * `prisma.procurement`: Exposes CRUD operations for the **Procurement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Procurements
    * const procurements = await prisma.procurement.findMany()
    * ```
    */
  get procurement(): Prisma.ProcurementDelegate<ExtArgs>;

  /**
   * `prisma.publicRecord`: Exposes CRUD operations for the **PublicRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PublicRecords
    * const publicRecords = await prisma.publicRecord.findMany()
    * ```
    */
  get publicRecord(): Prisma.PublicRecordDelegate<ExtArgs>;
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
    Program: 'Program',
    Beneficiary: 'Beneficiary',
    Disbursement: 'Disbursement',
    Procurement: 'Procurement',
    PublicRecord: 'PublicRecord'
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
      modelProps: "eventOutbox" | "program" | "beneficiary" | "disbursement" | "procurement" | "publicRecord"
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
      Program: {
        payload: Prisma.$ProgramPayload<ExtArgs>
        fields: Prisma.ProgramFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgramFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgramFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          findFirst: {
            args: Prisma.ProgramFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgramFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          findMany: {
            args: Prisma.ProgramFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>[]
          }
          create: {
            args: Prisma.ProgramCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          createMany: {
            args: Prisma.ProgramCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgramCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>[]
          }
          delete: {
            args: Prisma.ProgramDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          update: {
            args: Prisma.ProgramUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          deleteMany: {
            args: Prisma.ProgramDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgramUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProgramUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          aggregate: {
            args: Prisma.ProgramAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProgram>
          }
          groupBy: {
            args: Prisma.ProgramGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProgramGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgramCountArgs<ExtArgs>
            result: $Utils.Optional<ProgramCountAggregateOutputType> | number
          }
        }
      }
      Beneficiary: {
        payload: Prisma.$BeneficiaryPayload<ExtArgs>
        fields: Prisma.BeneficiaryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BeneficiaryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BeneficiaryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload>
          }
          findFirst: {
            args: Prisma.BeneficiaryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BeneficiaryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload>
          }
          findMany: {
            args: Prisma.BeneficiaryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload>[]
          }
          create: {
            args: Prisma.BeneficiaryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload>
          }
          createMany: {
            args: Prisma.BeneficiaryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BeneficiaryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload>[]
          }
          delete: {
            args: Prisma.BeneficiaryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload>
          }
          update: {
            args: Prisma.BeneficiaryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload>
          }
          deleteMany: {
            args: Prisma.BeneficiaryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BeneficiaryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BeneficiaryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryPayload>
          }
          aggregate: {
            args: Prisma.BeneficiaryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBeneficiary>
          }
          groupBy: {
            args: Prisma.BeneficiaryGroupByArgs<ExtArgs>
            result: $Utils.Optional<BeneficiaryGroupByOutputType>[]
          }
          count: {
            args: Prisma.BeneficiaryCountArgs<ExtArgs>
            result: $Utils.Optional<BeneficiaryCountAggregateOutputType> | number
          }
        }
      }
      Disbursement: {
        payload: Prisma.$DisbursementPayload<ExtArgs>
        fields: Prisma.DisbursementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DisbursementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisbursementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DisbursementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisbursementPayload>
          }
          findFirst: {
            args: Prisma.DisbursementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisbursementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DisbursementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisbursementPayload>
          }
          findMany: {
            args: Prisma.DisbursementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisbursementPayload>[]
          }
          create: {
            args: Prisma.DisbursementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisbursementPayload>
          }
          createMany: {
            args: Prisma.DisbursementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DisbursementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisbursementPayload>[]
          }
          delete: {
            args: Prisma.DisbursementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisbursementPayload>
          }
          update: {
            args: Prisma.DisbursementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisbursementPayload>
          }
          deleteMany: {
            args: Prisma.DisbursementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DisbursementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DisbursementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisbursementPayload>
          }
          aggregate: {
            args: Prisma.DisbursementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDisbursement>
          }
          groupBy: {
            args: Prisma.DisbursementGroupByArgs<ExtArgs>
            result: $Utils.Optional<DisbursementGroupByOutputType>[]
          }
          count: {
            args: Prisma.DisbursementCountArgs<ExtArgs>
            result: $Utils.Optional<DisbursementCountAggregateOutputType> | number
          }
        }
      }
      Procurement: {
        payload: Prisma.$ProcurementPayload<ExtArgs>
        fields: Prisma.ProcurementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcurementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcurementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcurementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcurementPayload>
          }
          findFirst: {
            args: Prisma.ProcurementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcurementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcurementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcurementPayload>
          }
          findMany: {
            args: Prisma.ProcurementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcurementPayload>[]
          }
          create: {
            args: Prisma.ProcurementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcurementPayload>
          }
          createMany: {
            args: Prisma.ProcurementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProcurementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcurementPayload>[]
          }
          delete: {
            args: Prisma.ProcurementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcurementPayload>
          }
          update: {
            args: Prisma.ProcurementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcurementPayload>
          }
          deleteMany: {
            args: Prisma.ProcurementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcurementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProcurementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcurementPayload>
          }
          aggregate: {
            args: Prisma.ProcurementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcurement>
          }
          groupBy: {
            args: Prisma.ProcurementGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcurementGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcurementCountArgs<ExtArgs>
            result: $Utils.Optional<ProcurementCountAggregateOutputType> | number
          }
        }
      }
      PublicRecord: {
        payload: Prisma.$PublicRecordPayload<ExtArgs>
        fields: Prisma.PublicRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PublicRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PublicRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRecordPayload>
          }
          findFirst: {
            args: Prisma.PublicRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PublicRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRecordPayload>
          }
          findMany: {
            args: Prisma.PublicRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRecordPayload>[]
          }
          create: {
            args: Prisma.PublicRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRecordPayload>
          }
          createMany: {
            args: Prisma.PublicRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PublicRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRecordPayload>[]
          }
          delete: {
            args: Prisma.PublicRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRecordPayload>
          }
          update: {
            args: Prisma.PublicRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRecordPayload>
          }
          deleteMany: {
            args: Prisma.PublicRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PublicRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PublicRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicRecordPayload>
          }
          aggregate: {
            args: Prisma.PublicRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePublicRecord>
          }
          groupBy: {
            args: Prisma.PublicRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<PublicRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.PublicRecordCountArgs<ExtArgs>
            result: $Utils.Optional<PublicRecordCountAggregateOutputType> | number
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
   * Count Type ProgramCountOutputType
   */

  export type ProgramCountOutputType = {
    disbursements: number
  }

  export type ProgramCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    disbursements?: boolean | ProgramCountOutputTypeCountDisbursementsArgs
  }

  // Custom InputTypes
  /**
   * ProgramCountOutputType without action
   */
  export type ProgramCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProgramCountOutputType
     */
    select?: ProgramCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProgramCountOutputType without action
   */
  export type ProgramCountOutputTypeCountDisbursementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisbursementWhereInput
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
   * Model Program
   */

  export type AggregateProgram = {
    _count: ProgramCountAggregateOutputType | null
    _avg: ProgramAvgAggregateOutputType | null
    _sum: ProgramSumAggregateOutputType | null
    _min: ProgramMinAggregateOutputType | null
    _max: ProgramMaxAggregateOutputType | null
  }

  export type ProgramAvgAggregateOutputType = {
    budgetMinor: number | null
  }

  export type ProgramSumAggregateOutputType = {
    budgetMinor: bigint | null
  }

  export type ProgramMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    name: string | null
    budgetMinor: bigint | null
    currency: string | null
    createdAt: Date | null
  }

  export type ProgramMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    name: string | null
    budgetMinor: bigint | null
    currency: string | null
    createdAt: Date | null
  }

  export type ProgramCountAggregateOutputType = {
    id: number
    orgId: number
    name: number
    budgetMinor: number
    currency: number
    eligibility: number
    createdAt: number
    _all: number
  }


  export type ProgramAvgAggregateInputType = {
    budgetMinor?: true
  }

  export type ProgramSumAggregateInputType = {
    budgetMinor?: true
  }

  export type ProgramMinAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    budgetMinor?: true
    currency?: true
    createdAt?: true
  }

  export type ProgramMaxAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    budgetMinor?: true
    currency?: true
    createdAt?: true
  }

  export type ProgramCountAggregateInputType = {
    id?: true
    orgId?: true
    name?: true
    budgetMinor?: true
    currency?: true
    eligibility?: true
    createdAt?: true
    _all?: true
  }

  export type ProgramAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Program to aggregate.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Programs
    **/
    _count?: true | ProgramCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProgramAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProgramSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgramMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgramMaxAggregateInputType
  }

  export type GetProgramAggregateType<T extends ProgramAggregateArgs> = {
        [P in keyof T & keyof AggregateProgram]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgram[P]>
      : GetScalarType<T[P], AggregateProgram[P]>
  }




  export type ProgramGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgramWhereInput
    orderBy?: ProgramOrderByWithAggregationInput | ProgramOrderByWithAggregationInput[]
    by: ProgramScalarFieldEnum[] | ProgramScalarFieldEnum
    having?: ProgramScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgramCountAggregateInputType | true
    _avg?: ProgramAvgAggregateInputType
    _sum?: ProgramSumAggregateInputType
    _min?: ProgramMinAggregateInputType
    _max?: ProgramMaxAggregateInputType
  }

  export type ProgramGroupByOutputType = {
    id: string
    orgId: string
    name: string
    budgetMinor: bigint
    currency: string
    eligibility: JsonValue | null
    createdAt: Date
    _count: ProgramCountAggregateOutputType | null
    _avg: ProgramAvgAggregateOutputType | null
    _sum: ProgramSumAggregateOutputType | null
    _min: ProgramMinAggregateOutputType | null
    _max: ProgramMaxAggregateOutputType | null
  }

  type GetProgramGroupByPayload<T extends ProgramGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgramGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgramGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgramGroupByOutputType[P]>
            : GetScalarType<T[P], ProgramGroupByOutputType[P]>
        }
      >
    >


  export type ProgramSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    name?: boolean
    budgetMinor?: boolean
    currency?: boolean
    eligibility?: boolean
    createdAt?: boolean
    disbursements?: boolean | Program$disbursementsArgs<ExtArgs>
    _count?: boolean | ProgramCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["program"]>

  export type ProgramSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    name?: boolean
    budgetMinor?: boolean
    currency?: boolean
    eligibility?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["program"]>

  export type ProgramSelectScalar = {
    id?: boolean
    orgId?: boolean
    name?: boolean
    budgetMinor?: boolean
    currency?: boolean
    eligibility?: boolean
    createdAt?: boolean
  }

  export type ProgramInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    disbursements?: boolean | Program$disbursementsArgs<ExtArgs>
    _count?: boolean | ProgramCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProgramIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProgramPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Program"
    objects: {
      disbursements: Prisma.$DisbursementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      name: string
      budgetMinor: bigint
      currency: string
      eligibility: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["program"]>
    composites: {}
  }

  type ProgramGetPayload<S extends boolean | null | undefined | ProgramDefaultArgs> = $Result.GetResult<Prisma.$ProgramPayload, S>

  type ProgramCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProgramFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProgramCountAggregateInputType | true
    }

  export interface ProgramDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Program'], meta: { name: 'Program' } }
    /**
     * Find zero or one Program that matches the filter.
     * @param {ProgramFindUniqueArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgramFindUniqueArgs>(args: SelectSubset<T, ProgramFindUniqueArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Program that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProgramFindUniqueOrThrowArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgramFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgramFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Program that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindFirstArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgramFindFirstArgs>(args?: SelectSubset<T, ProgramFindFirstArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Program that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindFirstOrThrowArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgramFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgramFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Programs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Programs
     * const programs = await prisma.program.findMany()
     * 
     * // Get first 10 Programs
     * const programs = await prisma.program.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const programWithIdOnly = await prisma.program.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgramFindManyArgs>(args?: SelectSubset<T, ProgramFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Program.
     * @param {ProgramCreateArgs} args - Arguments to create a Program.
     * @example
     * // Create one Program
     * const Program = await prisma.program.create({
     *   data: {
     *     // ... data to create a Program
     *   }
     * })
     * 
     */
    create<T extends ProgramCreateArgs>(args: SelectSubset<T, ProgramCreateArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Programs.
     * @param {ProgramCreateManyArgs} args - Arguments to create many Programs.
     * @example
     * // Create many Programs
     * const program = await prisma.program.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgramCreateManyArgs>(args?: SelectSubset<T, ProgramCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Programs and returns the data saved in the database.
     * @param {ProgramCreateManyAndReturnArgs} args - Arguments to create many Programs.
     * @example
     * // Create many Programs
     * const program = await prisma.program.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Programs and only return the `id`
     * const programWithIdOnly = await prisma.program.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgramCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgramCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Program.
     * @param {ProgramDeleteArgs} args - Arguments to delete one Program.
     * @example
     * // Delete one Program
     * const Program = await prisma.program.delete({
     *   where: {
     *     // ... filter to delete one Program
     *   }
     * })
     * 
     */
    delete<T extends ProgramDeleteArgs>(args: SelectSubset<T, ProgramDeleteArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Program.
     * @param {ProgramUpdateArgs} args - Arguments to update one Program.
     * @example
     * // Update one Program
     * const program = await prisma.program.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgramUpdateArgs>(args: SelectSubset<T, ProgramUpdateArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Programs.
     * @param {ProgramDeleteManyArgs} args - Arguments to filter Programs to delete.
     * @example
     * // Delete a few Programs
     * const { count } = await prisma.program.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgramDeleteManyArgs>(args?: SelectSubset<T, ProgramDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Programs
     * const program = await prisma.program.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgramUpdateManyArgs>(args: SelectSubset<T, ProgramUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Program.
     * @param {ProgramUpsertArgs} args - Arguments to update or create a Program.
     * @example
     * // Update or create a Program
     * const program = await prisma.program.upsert({
     *   create: {
     *     // ... data to create a Program
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Program we want to update
     *   }
     * })
     */
    upsert<T extends ProgramUpsertArgs>(args: SelectSubset<T, ProgramUpsertArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramCountArgs} args - Arguments to filter Programs to count.
     * @example
     * // Count the number of Programs
     * const count = await prisma.program.count({
     *   where: {
     *     // ... the filter for the Programs we want to count
     *   }
     * })
    **/
    count<T extends ProgramCountArgs>(
      args?: Subset<T, ProgramCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgramCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Program.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProgramAggregateArgs>(args: Subset<T, ProgramAggregateArgs>): Prisma.PrismaPromise<GetProgramAggregateType<T>>

    /**
     * Group by Program.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramGroupByArgs} args - Group by arguments.
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
      T extends ProgramGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgramGroupByArgs['orderBy'] }
        : { orderBy?: ProgramGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProgramGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgramGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Program model
   */
  readonly fields: ProgramFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Program.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgramClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    disbursements<T extends Program$disbursementsArgs<ExtArgs> = {}>(args?: Subset<T, Program$disbursementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisbursementPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Program model
   */ 
  interface ProgramFieldRefs {
    readonly id: FieldRef<"Program", 'String'>
    readonly orgId: FieldRef<"Program", 'String'>
    readonly name: FieldRef<"Program", 'String'>
    readonly budgetMinor: FieldRef<"Program", 'BigInt'>
    readonly currency: FieldRef<"Program", 'String'>
    readonly eligibility: FieldRef<"Program", 'Json'>
    readonly createdAt: FieldRef<"Program", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Program findUnique
   */
  export type ProgramFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program findUniqueOrThrow
   */
  export type ProgramFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program findFirst
   */
  export type ProgramFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Programs.
     */
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program findFirstOrThrow
   */
  export type ProgramFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Programs.
     */
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program findMany
   */
  export type ProgramFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Programs to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program create
   */
  export type ProgramCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The data needed to create a Program.
     */
    data: XOR<ProgramCreateInput, ProgramUncheckedCreateInput>
  }

  /**
   * Program createMany
   */
  export type ProgramCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Programs.
     */
    data: ProgramCreateManyInput | ProgramCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Program createManyAndReturn
   */
  export type ProgramCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Programs.
     */
    data: ProgramCreateManyInput | ProgramCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Program update
   */
  export type ProgramUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The data needed to update a Program.
     */
    data: XOR<ProgramUpdateInput, ProgramUncheckedUpdateInput>
    /**
     * Choose, which Program to update.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program updateMany
   */
  export type ProgramUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Programs.
     */
    data: XOR<ProgramUpdateManyMutationInput, ProgramUncheckedUpdateManyInput>
    /**
     * Filter which Programs to update
     */
    where?: ProgramWhereInput
  }

  /**
   * Program upsert
   */
  export type ProgramUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The filter to search for the Program to update in case it exists.
     */
    where: ProgramWhereUniqueInput
    /**
     * In case the Program found by the `where` argument doesn't exist, create a new Program with this data.
     */
    create: XOR<ProgramCreateInput, ProgramUncheckedCreateInput>
    /**
     * In case the Program was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgramUpdateInput, ProgramUncheckedUpdateInput>
  }

  /**
   * Program delete
   */
  export type ProgramDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter which Program to delete.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program deleteMany
   */
  export type ProgramDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Programs to delete
     */
    where?: ProgramWhereInput
  }

  /**
   * Program.disbursements
   */
  export type Program$disbursementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disbursement
     */
    select?: DisbursementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisbursementInclude<ExtArgs> | null
    where?: DisbursementWhereInput
    orderBy?: DisbursementOrderByWithRelationInput | DisbursementOrderByWithRelationInput[]
    cursor?: DisbursementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisbursementScalarFieldEnum | DisbursementScalarFieldEnum[]
  }

  /**
   * Program without action
   */
  export type ProgramDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
  }


  /**
   * Model Beneficiary
   */

  export type AggregateBeneficiary = {
    _count: BeneficiaryCountAggregateOutputType | null
    _min: BeneficiaryMinAggregateOutputType | null
    _max: BeneficiaryMaxAggregateOutputType | null
  }

  export type BeneficiaryMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    programId: string | null
    externalRef: string | null
    kycStatus: string | null
    createdAt: Date | null
  }

  export type BeneficiaryMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    programId: string | null
    externalRef: string | null
    kycStatus: string | null
    createdAt: Date | null
  }

  export type BeneficiaryCountAggregateOutputType = {
    id: number
    orgId: number
    programId: number
    externalRef: number
    kycStatus: number
    createdAt: number
    _all: number
  }


  export type BeneficiaryMinAggregateInputType = {
    id?: true
    orgId?: true
    programId?: true
    externalRef?: true
    kycStatus?: true
    createdAt?: true
  }

  export type BeneficiaryMaxAggregateInputType = {
    id?: true
    orgId?: true
    programId?: true
    externalRef?: true
    kycStatus?: true
    createdAt?: true
  }

  export type BeneficiaryCountAggregateInputType = {
    id?: true
    orgId?: true
    programId?: true
    externalRef?: true
    kycStatus?: true
    createdAt?: true
    _all?: true
  }

  export type BeneficiaryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Beneficiary to aggregate.
     */
    where?: BeneficiaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Beneficiaries to fetch.
     */
    orderBy?: BeneficiaryOrderByWithRelationInput | BeneficiaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BeneficiaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Beneficiaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Beneficiaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Beneficiaries
    **/
    _count?: true | BeneficiaryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BeneficiaryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BeneficiaryMaxAggregateInputType
  }

  export type GetBeneficiaryAggregateType<T extends BeneficiaryAggregateArgs> = {
        [P in keyof T & keyof AggregateBeneficiary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBeneficiary[P]>
      : GetScalarType<T[P], AggregateBeneficiary[P]>
  }




  export type BeneficiaryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BeneficiaryWhereInput
    orderBy?: BeneficiaryOrderByWithAggregationInput | BeneficiaryOrderByWithAggregationInput[]
    by: BeneficiaryScalarFieldEnum[] | BeneficiaryScalarFieldEnum
    having?: BeneficiaryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BeneficiaryCountAggregateInputType | true
    _min?: BeneficiaryMinAggregateInputType
    _max?: BeneficiaryMaxAggregateInputType
  }

  export type BeneficiaryGroupByOutputType = {
    id: string
    orgId: string
    programId: string
    externalRef: string
    kycStatus: string
    createdAt: Date
    _count: BeneficiaryCountAggregateOutputType | null
    _min: BeneficiaryMinAggregateOutputType | null
    _max: BeneficiaryMaxAggregateOutputType | null
  }

  type GetBeneficiaryGroupByPayload<T extends BeneficiaryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BeneficiaryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BeneficiaryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BeneficiaryGroupByOutputType[P]>
            : GetScalarType<T[P], BeneficiaryGroupByOutputType[P]>
        }
      >
    >


  export type BeneficiarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    programId?: boolean
    externalRef?: boolean
    kycStatus?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["beneficiary"]>

  export type BeneficiarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    programId?: boolean
    externalRef?: boolean
    kycStatus?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["beneficiary"]>

  export type BeneficiarySelectScalar = {
    id?: boolean
    orgId?: boolean
    programId?: boolean
    externalRef?: boolean
    kycStatus?: boolean
    createdAt?: boolean
  }


  export type $BeneficiaryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Beneficiary"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      programId: string
      externalRef: string
      kycStatus: string
      createdAt: Date
    }, ExtArgs["result"]["beneficiary"]>
    composites: {}
  }

  type BeneficiaryGetPayload<S extends boolean | null | undefined | BeneficiaryDefaultArgs> = $Result.GetResult<Prisma.$BeneficiaryPayload, S>

  type BeneficiaryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BeneficiaryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BeneficiaryCountAggregateInputType | true
    }

  export interface BeneficiaryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Beneficiary'], meta: { name: 'Beneficiary' } }
    /**
     * Find zero or one Beneficiary that matches the filter.
     * @param {BeneficiaryFindUniqueArgs} args - Arguments to find a Beneficiary
     * @example
     * // Get one Beneficiary
     * const beneficiary = await prisma.beneficiary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BeneficiaryFindUniqueArgs>(args: SelectSubset<T, BeneficiaryFindUniqueArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Beneficiary that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BeneficiaryFindUniqueOrThrowArgs} args - Arguments to find a Beneficiary
     * @example
     * // Get one Beneficiary
     * const beneficiary = await prisma.beneficiary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BeneficiaryFindUniqueOrThrowArgs>(args: SelectSubset<T, BeneficiaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Beneficiary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryFindFirstArgs} args - Arguments to find a Beneficiary
     * @example
     * // Get one Beneficiary
     * const beneficiary = await prisma.beneficiary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BeneficiaryFindFirstArgs>(args?: SelectSubset<T, BeneficiaryFindFirstArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Beneficiary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryFindFirstOrThrowArgs} args - Arguments to find a Beneficiary
     * @example
     * // Get one Beneficiary
     * const beneficiary = await prisma.beneficiary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BeneficiaryFindFirstOrThrowArgs>(args?: SelectSubset<T, BeneficiaryFindFirstOrThrowArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Beneficiaries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Beneficiaries
     * const beneficiaries = await prisma.beneficiary.findMany()
     * 
     * // Get first 10 Beneficiaries
     * const beneficiaries = await prisma.beneficiary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const beneficiaryWithIdOnly = await prisma.beneficiary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BeneficiaryFindManyArgs>(args?: SelectSubset<T, BeneficiaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Beneficiary.
     * @param {BeneficiaryCreateArgs} args - Arguments to create a Beneficiary.
     * @example
     * // Create one Beneficiary
     * const Beneficiary = await prisma.beneficiary.create({
     *   data: {
     *     // ... data to create a Beneficiary
     *   }
     * })
     * 
     */
    create<T extends BeneficiaryCreateArgs>(args: SelectSubset<T, BeneficiaryCreateArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Beneficiaries.
     * @param {BeneficiaryCreateManyArgs} args - Arguments to create many Beneficiaries.
     * @example
     * // Create many Beneficiaries
     * const beneficiary = await prisma.beneficiary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BeneficiaryCreateManyArgs>(args?: SelectSubset<T, BeneficiaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Beneficiaries and returns the data saved in the database.
     * @param {BeneficiaryCreateManyAndReturnArgs} args - Arguments to create many Beneficiaries.
     * @example
     * // Create many Beneficiaries
     * const beneficiary = await prisma.beneficiary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Beneficiaries and only return the `id`
     * const beneficiaryWithIdOnly = await prisma.beneficiary.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BeneficiaryCreateManyAndReturnArgs>(args?: SelectSubset<T, BeneficiaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Beneficiary.
     * @param {BeneficiaryDeleteArgs} args - Arguments to delete one Beneficiary.
     * @example
     * // Delete one Beneficiary
     * const Beneficiary = await prisma.beneficiary.delete({
     *   where: {
     *     // ... filter to delete one Beneficiary
     *   }
     * })
     * 
     */
    delete<T extends BeneficiaryDeleteArgs>(args: SelectSubset<T, BeneficiaryDeleteArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Beneficiary.
     * @param {BeneficiaryUpdateArgs} args - Arguments to update one Beneficiary.
     * @example
     * // Update one Beneficiary
     * const beneficiary = await prisma.beneficiary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BeneficiaryUpdateArgs>(args: SelectSubset<T, BeneficiaryUpdateArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Beneficiaries.
     * @param {BeneficiaryDeleteManyArgs} args - Arguments to filter Beneficiaries to delete.
     * @example
     * // Delete a few Beneficiaries
     * const { count } = await prisma.beneficiary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BeneficiaryDeleteManyArgs>(args?: SelectSubset<T, BeneficiaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Beneficiaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Beneficiaries
     * const beneficiary = await prisma.beneficiary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BeneficiaryUpdateManyArgs>(args: SelectSubset<T, BeneficiaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Beneficiary.
     * @param {BeneficiaryUpsertArgs} args - Arguments to update or create a Beneficiary.
     * @example
     * // Update or create a Beneficiary
     * const beneficiary = await prisma.beneficiary.upsert({
     *   create: {
     *     // ... data to create a Beneficiary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Beneficiary we want to update
     *   }
     * })
     */
    upsert<T extends BeneficiaryUpsertArgs>(args: SelectSubset<T, BeneficiaryUpsertArgs<ExtArgs>>): Prisma__BeneficiaryClient<$Result.GetResult<Prisma.$BeneficiaryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Beneficiaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryCountArgs} args - Arguments to filter Beneficiaries to count.
     * @example
     * // Count the number of Beneficiaries
     * const count = await prisma.beneficiary.count({
     *   where: {
     *     // ... the filter for the Beneficiaries we want to count
     *   }
     * })
    **/
    count<T extends BeneficiaryCountArgs>(
      args?: Subset<T, BeneficiaryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BeneficiaryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Beneficiary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BeneficiaryAggregateArgs>(args: Subset<T, BeneficiaryAggregateArgs>): Prisma.PrismaPromise<GetBeneficiaryAggregateType<T>>

    /**
     * Group by Beneficiary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryGroupByArgs} args - Group by arguments.
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
      T extends BeneficiaryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BeneficiaryGroupByArgs['orderBy'] }
        : { orderBy?: BeneficiaryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BeneficiaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBeneficiaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Beneficiary model
   */
  readonly fields: BeneficiaryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Beneficiary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BeneficiaryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Beneficiary model
   */ 
  interface BeneficiaryFieldRefs {
    readonly id: FieldRef<"Beneficiary", 'String'>
    readonly orgId: FieldRef<"Beneficiary", 'String'>
    readonly programId: FieldRef<"Beneficiary", 'String'>
    readonly externalRef: FieldRef<"Beneficiary", 'String'>
    readonly kycStatus: FieldRef<"Beneficiary", 'String'>
    readonly createdAt: FieldRef<"Beneficiary", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Beneficiary findUnique
   */
  export type BeneficiaryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Filter, which Beneficiary to fetch.
     */
    where: BeneficiaryWhereUniqueInput
  }

  /**
   * Beneficiary findUniqueOrThrow
   */
  export type BeneficiaryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Filter, which Beneficiary to fetch.
     */
    where: BeneficiaryWhereUniqueInput
  }

  /**
   * Beneficiary findFirst
   */
  export type BeneficiaryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Filter, which Beneficiary to fetch.
     */
    where?: BeneficiaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Beneficiaries to fetch.
     */
    orderBy?: BeneficiaryOrderByWithRelationInput | BeneficiaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Beneficiaries.
     */
    cursor?: BeneficiaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Beneficiaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Beneficiaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Beneficiaries.
     */
    distinct?: BeneficiaryScalarFieldEnum | BeneficiaryScalarFieldEnum[]
  }

  /**
   * Beneficiary findFirstOrThrow
   */
  export type BeneficiaryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Filter, which Beneficiary to fetch.
     */
    where?: BeneficiaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Beneficiaries to fetch.
     */
    orderBy?: BeneficiaryOrderByWithRelationInput | BeneficiaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Beneficiaries.
     */
    cursor?: BeneficiaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Beneficiaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Beneficiaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Beneficiaries.
     */
    distinct?: BeneficiaryScalarFieldEnum | BeneficiaryScalarFieldEnum[]
  }

  /**
   * Beneficiary findMany
   */
  export type BeneficiaryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Filter, which Beneficiaries to fetch.
     */
    where?: BeneficiaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Beneficiaries to fetch.
     */
    orderBy?: BeneficiaryOrderByWithRelationInput | BeneficiaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Beneficiaries.
     */
    cursor?: BeneficiaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Beneficiaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Beneficiaries.
     */
    skip?: number
    distinct?: BeneficiaryScalarFieldEnum | BeneficiaryScalarFieldEnum[]
  }

  /**
   * Beneficiary create
   */
  export type BeneficiaryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * The data needed to create a Beneficiary.
     */
    data: XOR<BeneficiaryCreateInput, BeneficiaryUncheckedCreateInput>
  }

  /**
   * Beneficiary createMany
   */
  export type BeneficiaryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Beneficiaries.
     */
    data: BeneficiaryCreateManyInput | BeneficiaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Beneficiary createManyAndReturn
   */
  export type BeneficiaryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Beneficiaries.
     */
    data: BeneficiaryCreateManyInput | BeneficiaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Beneficiary update
   */
  export type BeneficiaryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * The data needed to update a Beneficiary.
     */
    data: XOR<BeneficiaryUpdateInput, BeneficiaryUncheckedUpdateInput>
    /**
     * Choose, which Beneficiary to update.
     */
    where: BeneficiaryWhereUniqueInput
  }

  /**
   * Beneficiary updateMany
   */
  export type BeneficiaryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Beneficiaries.
     */
    data: XOR<BeneficiaryUpdateManyMutationInput, BeneficiaryUncheckedUpdateManyInput>
    /**
     * Filter which Beneficiaries to update
     */
    where?: BeneficiaryWhereInput
  }

  /**
   * Beneficiary upsert
   */
  export type BeneficiaryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * The filter to search for the Beneficiary to update in case it exists.
     */
    where: BeneficiaryWhereUniqueInput
    /**
     * In case the Beneficiary found by the `where` argument doesn't exist, create a new Beneficiary with this data.
     */
    create: XOR<BeneficiaryCreateInput, BeneficiaryUncheckedCreateInput>
    /**
     * In case the Beneficiary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BeneficiaryUpdateInput, BeneficiaryUncheckedUpdateInput>
  }

  /**
   * Beneficiary delete
   */
  export type BeneficiaryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
    /**
     * Filter which Beneficiary to delete.
     */
    where: BeneficiaryWhereUniqueInput
  }

  /**
   * Beneficiary deleteMany
   */
  export type BeneficiaryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Beneficiaries to delete
     */
    where?: BeneficiaryWhereInput
  }

  /**
   * Beneficiary without action
   */
  export type BeneficiaryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beneficiary
     */
    select?: BeneficiarySelect<ExtArgs> | null
  }


  /**
   * Model Disbursement
   */

  export type AggregateDisbursement = {
    _count: DisbursementCountAggregateOutputType | null
    _avg: DisbursementAvgAggregateOutputType | null
    _sum: DisbursementSumAggregateOutputType | null
    _min: DisbursementMinAggregateOutputType | null
    _max: DisbursementMaxAggregateOutputType | null
  }

  export type DisbursementAvgAggregateOutputType = {
    amountMinor: number | null
  }

  export type DisbursementSumAggregateOutputType = {
    amountMinor: bigint | null
  }

  export type DisbursementMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    programId: string | null
    beneficiaryId: string | null
    amountMinor: bigint | null
    currency: string | null
    status: $Enums.DisbursementStatus | null
    batchIntentId: string | null
    createdAt: Date | null
  }

  export type DisbursementMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    programId: string | null
    beneficiaryId: string | null
    amountMinor: bigint | null
    currency: string | null
    status: $Enums.DisbursementStatus | null
    batchIntentId: string | null
    createdAt: Date | null
  }

  export type DisbursementCountAggregateOutputType = {
    id: number
    orgId: number
    programId: number
    beneficiaryId: number
    amountMinor: number
    currency: number
    status: number
    batchIntentId: number
    createdAt: number
    _all: number
  }


  export type DisbursementAvgAggregateInputType = {
    amountMinor?: true
  }

  export type DisbursementSumAggregateInputType = {
    amountMinor?: true
  }

  export type DisbursementMinAggregateInputType = {
    id?: true
    orgId?: true
    programId?: true
    beneficiaryId?: true
    amountMinor?: true
    currency?: true
    status?: true
    batchIntentId?: true
    createdAt?: true
  }

  export type DisbursementMaxAggregateInputType = {
    id?: true
    orgId?: true
    programId?: true
    beneficiaryId?: true
    amountMinor?: true
    currency?: true
    status?: true
    batchIntentId?: true
    createdAt?: true
  }

  export type DisbursementCountAggregateInputType = {
    id?: true
    orgId?: true
    programId?: true
    beneficiaryId?: true
    amountMinor?: true
    currency?: true
    status?: true
    batchIntentId?: true
    createdAt?: true
    _all?: true
  }

  export type DisbursementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Disbursement to aggregate.
     */
    where?: DisbursementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disbursements to fetch.
     */
    orderBy?: DisbursementOrderByWithRelationInput | DisbursementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DisbursementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disbursements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disbursements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Disbursements
    **/
    _count?: true | DisbursementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DisbursementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DisbursementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DisbursementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DisbursementMaxAggregateInputType
  }

  export type GetDisbursementAggregateType<T extends DisbursementAggregateArgs> = {
        [P in keyof T & keyof AggregateDisbursement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDisbursement[P]>
      : GetScalarType<T[P], AggregateDisbursement[P]>
  }




  export type DisbursementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisbursementWhereInput
    orderBy?: DisbursementOrderByWithAggregationInput | DisbursementOrderByWithAggregationInput[]
    by: DisbursementScalarFieldEnum[] | DisbursementScalarFieldEnum
    having?: DisbursementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DisbursementCountAggregateInputType | true
    _avg?: DisbursementAvgAggregateInputType
    _sum?: DisbursementSumAggregateInputType
    _min?: DisbursementMinAggregateInputType
    _max?: DisbursementMaxAggregateInputType
  }

  export type DisbursementGroupByOutputType = {
    id: string
    orgId: string
    programId: string
    beneficiaryId: string
    amountMinor: bigint
    currency: string
    status: $Enums.DisbursementStatus
    batchIntentId: string | null
    createdAt: Date
    _count: DisbursementCountAggregateOutputType | null
    _avg: DisbursementAvgAggregateOutputType | null
    _sum: DisbursementSumAggregateOutputType | null
    _min: DisbursementMinAggregateOutputType | null
    _max: DisbursementMaxAggregateOutputType | null
  }

  type GetDisbursementGroupByPayload<T extends DisbursementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DisbursementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DisbursementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DisbursementGroupByOutputType[P]>
            : GetScalarType<T[P], DisbursementGroupByOutputType[P]>
        }
      >
    >


  export type DisbursementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    programId?: boolean
    beneficiaryId?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    batchIntentId?: boolean
    createdAt?: boolean
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["disbursement"]>

  export type DisbursementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    programId?: boolean
    beneficiaryId?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    batchIntentId?: boolean
    createdAt?: boolean
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["disbursement"]>

  export type DisbursementSelectScalar = {
    id?: boolean
    orgId?: boolean
    programId?: boolean
    beneficiaryId?: boolean
    amountMinor?: boolean
    currency?: boolean
    status?: boolean
    batchIntentId?: boolean
    createdAt?: boolean
  }

  export type DisbursementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }
  export type DisbursementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    program?: boolean | ProgramDefaultArgs<ExtArgs>
  }

  export type $DisbursementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Disbursement"
    objects: {
      program: Prisma.$ProgramPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      programId: string
      beneficiaryId: string
      amountMinor: bigint
      currency: string
      status: $Enums.DisbursementStatus
      batchIntentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["disbursement"]>
    composites: {}
  }

  type DisbursementGetPayload<S extends boolean | null | undefined | DisbursementDefaultArgs> = $Result.GetResult<Prisma.$DisbursementPayload, S>

  type DisbursementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DisbursementFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DisbursementCountAggregateInputType | true
    }

  export interface DisbursementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Disbursement'], meta: { name: 'Disbursement' } }
    /**
     * Find zero or one Disbursement that matches the filter.
     * @param {DisbursementFindUniqueArgs} args - Arguments to find a Disbursement
     * @example
     * // Get one Disbursement
     * const disbursement = await prisma.disbursement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DisbursementFindUniqueArgs>(args: SelectSubset<T, DisbursementFindUniqueArgs<ExtArgs>>): Prisma__DisbursementClient<$Result.GetResult<Prisma.$DisbursementPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Disbursement that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DisbursementFindUniqueOrThrowArgs} args - Arguments to find a Disbursement
     * @example
     * // Get one Disbursement
     * const disbursement = await prisma.disbursement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DisbursementFindUniqueOrThrowArgs>(args: SelectSubset<T, DisbursementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DisbursementClient<$Result.GetResult<Prisma.$DisbursementPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Disbursement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisbursementFindFirstArgs} args - Arguments to find a Disbursement
     * @example
     * // Get one Disbursement
     * const disbursement = await prisma.disbursement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DisbursementFindFirstArgs>(args?: SelectSubset<T, DisbursementFindFirstArgs<ExtArgs>>): Prisma__DisbursementClient<$Result.GetResult<Prisma.$DisbursementPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Disbursement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisbursementFindFirstOrThrowArgs} args - Arguments to find a Disbursement
     * @example
     * // Get one Disbursement
     * const disbursement = await prisma.disbursement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DisbursementFindFirstOrThrowArgs>(args?: SelectSubset<T, DisbursementFindFirstOrThrowArgs<ExtArgs>>): Prisma__DisbursementClient<$Result.GetResult<Prisma.$DisbursementPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Disbursements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisbursementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Disbursements
     * const disbursements = await prisma.disbursement.findMany()
     * 
     * // Get first 10 Disbursements
     * const disbursements = await prisma.disbursement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const disbursementWithIdOnly = await prisma.disbursement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DisbursementFindManyArgs>(args?: SelectSubset<T, DisbursementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisbursementPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Disbursement.
     * @param {DisbursementCreateArgs} args - Arguments to create a Disbursement.
     * @example
     * // Create one Disbursement
     * const Disbursement = await prisma.disbursement.create({
     *   data: {
     *     // ... data to create a Disbursement
     *   }
     * })
     * 
     */
    create<T extends DisbursementCreateArgs>(args: SelectSubset<T, DisbursementCreateArgs<ExtArgs>>): Prisma__DisbursementClient<$Result.GetResult<Prisma.$DisbursementPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Disbursements.
     * @param {DisbursementCreateManyArgs} args - Arguments to create many Disbursements.
     * @example
     * // Create many Disbursements
     * const disbursement = await prisma.disbursement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DisbursementCreateManyArgs>(args?: SelectSubset<T, DisbursementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Disbursements and returns the data saved in the database.
     * @param {DisbursementCreateManyAndReturnArgs} args - Arguments to create many Disbursements.
     * @example
     * // Create many Disbursements
     * const disbursement = await prisma.disbursement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Disbursements and only return the `id`
     * const disbursementWithIdOnly = await prisma.disbursement.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DisbursementCreateManyAndReturnArgs>(args?: SelectSubset<T, DisbursementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisbursementPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Disbursement.
     * @param {DisbursementDeleteArgs} args - Arguments to delete one Disbursement.
     * @example
     * // Delete one Disbursement
     * const Disbursement = await prisma.disbursement.delete({
     *   where: {
     *     // ... filter to delete one Disbursement
     *   }
     * })
     * 
     */
    delete<T extends DisbursementDeleteArgs>(args: SelectSubset<T, DisbursementDeleteArgs<ExtArgs>>): Prisma__DisbursementClient<$Result.GetResult<Prisma.$DisbursementPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Disbursement.
     * @param {DisbursementUpdateArgs} args - Arguments to update one Disbursement.
     * @example
     * // Update one Disbursement
     * const disbursement = await prisma.disbursement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DisbursementUpdateArgs>(args: SelectSubset<T, DisbursementUpdateArgs<ExtArgs>>): Prisma__DisbursementClient<$Result.GetResult<Prisma.$DisbursementPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Disbursements.
     * @param {DisbursementDeleteManyArgs} args - Arguments to filter Disbursements to delete.
     * @example
     * // Delete a few Disbursements
     * const { count } = await prisma.disbursement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DisbursementDeleteManyArgs>(args?: SelectSubset<T, DisbursementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Disbursements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisbursementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Disbursements
     * const disbursement = await prisma.disbursement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DisbursementUpdateManyArgs>(args: SelectSubset<T, DisbursementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Disbursement.
     * @param {DisbursementUpsertArgs} args - Arguments to update or create a Disbursement.
     * @example
     * // Update or create a Disbursement
     * const disbursement = await prisma.disbursement.upsert({
     *   create: {
     *     // ... data to create a Disbursement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Disbursement we want to update
     *   }
     * })
     */
    upsert<T extends DisbursementUpsertArgs>(args: SelectSubset<T, DisbursementUpsertArgs<ExtArgs>>): Prisma__DisbursementClient<$Result.GetResult<Prisma.$DisbursementPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Disbursements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisbursementCountArgs} args - Arguments to filter Disbursements to count.
     * @example
     * // Count the number of Disbursements
     * const count = await prisma.disbursement.count({
     *   where: {
     *     // ... the filter for the Disbursements we want to count
     *   }
     * })
    **/
    count<T extends DisbursementCountArgs>(
      args?: Subset<T, DisbursementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DisbursementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Disbursement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisbursementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DisbursementAggregateArgs>(args: Subset<T, DisbursementAggregateArgs>): Prisma.PrismaPromise<GetDisbursementAggregateType<T>>

    /**
     * Group by Disbursement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisbursementGroupByArgs} args - Group by arguments.
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
      T extends DisbursementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DisbursementGroupByArgs['orderBy'] }
        : { orderBy?: DisbursementGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DisbursementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisbursementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Disbursement model
   */
  readonly fields: DisbursementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Disbursement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DisbursementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    program<T extends ProgramDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProgramDefaultArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Disbursement model
   */ 
  interface DisbursementFieldRefs {
    readonly id: FieldRef<"Disbursement", 'String'>
    readonly orgId: FieldRef<"Disbursement", 'String'>
    readonly programId: FieldRef<"Disbursement", 'String'>
    readonly beneficiaryId: FieldRef<"Disbursement", 'String'>
    readonly amountMinor: FieldRef<"Disbursement", 'BigInt'>
    readonly currency: FieldRef<"Disbursement", 'String'>
    readonly status: FieldRef<"Disbursement", 'DisbursementStatus'>
    readonly batchIntentId: FieldRef<"Disbursement", 'String'>
    readonly createdAt: FieldRef<"Disbursement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Disbursement findUnique
   */
  export type DisbursementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disbursement
     */
    select?: DisbursementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisbursementInclude<ExtArgs> | null
    /**
     * Filter, which Disbursement to fetch.
     */
    where: DisbursementWhereUniqueInput
  }

  /**
   * Disbursement findUniqueOrThrow
   */
  export type DisbursementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disbursement
     */
    select?: DisbursementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisbursementInclude<ExtArgs> | null
    /**
     * Filter, which Disbursement to fetch.
     */
    where: DisbursementWhereUniqueInput
  }

  /**
   * Disbursement findFirst
   */
  export type DisbursementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disbursement
     */
    select?: DisbursementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisbursementInclude<ExtArgs> | null
    /**
     * Filter, which Disbursement to fetch.
     */
    where?: DisbursementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disbursements to fetch.
     */
    orderBy?: DisbursementOrderByWithRelationInput | DisbursementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Disbursements.
     */
    cursor?: DisbursementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disbursements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disbursements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Disbursements.
     */
    distinct?: DisbursementScalarFieldEnum | DisbursementScalarFieldEnum[]
  }

  /**
   * Disbursement findFirstOrThrow
   */
  export type DisbursementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disbursement
     */
    select?: DisbursementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisbursementInclude<ExtArgs> | null
    /**
     * Filter, which Disbursement to fetch.
     */
    where?: DisbursementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disbursements to fetch.
     */
    orderBy?: DisbursementOrderByWithRelationInput | DisbursementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Disbursements.
     */
    cursor?: DisbursementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disbursements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disbursements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Disbursements.
     */
    distinct?: DisbursementScalarFieldEnum | DisbursementScalarFieldEnum[]
  }

  /**
   * Disbursement findMany
   */
  export type DisbursementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disbursement
     */
    select?: DisbursementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisbursementInclude<ExtArgs> | null
    /**
     * Filter, which Disbursements to fetch.
     */
    where?: DisbursementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disbursements to fetch.
     */
    orderBy?: DisbursementOrderByWithRelationInput | DisbursementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Disbursements.
     */
    cursor?: DisbursementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disbursements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disbursements.
     */
    skip?: number
    distinct?: DisbursementScalarFieldEnum | DisbursementScalarFieldEnum[]
  }

  /**
   * Disbursement create
   */
  export type DisbursementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disbursement
     */
    select?: DisbursementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisbursementInclude<ExtArgs> | null
    /**
     * The data needed to create a Disbursement.
     */
    data: XOR<DisbursementCreateInput, DisbursementUncheckedCreateInput>
  }

  /**
   * Disbursement createMany
   */
  export type DisbursementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Disbursements.
     */
    data: DisbursementCreateManyInput | DisbursementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Disbursement createManyAndReturn
   */
  export type DisbursementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disbursement
     */
    select?: DisbursementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Disbursements.
     */
    data: DisbursementCreateManyInput | DisbursementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisbursementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Disbursement update
   */
  export type DisbursementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disbursement
     */
    select?: DisbursementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisbursementInclude<ExtArgs> | null
    /**
     * The data needed to update a Disbursement.
     */
    data: XOR<DisbursementUpdateInput, DisbursementUncheckedUpdateInput>
    /**
     * Choose, which Disbursement to update.
     */
    where: DisbursementWhereUniqueInput
  }

  /**
   * Disbursement updateMany
   */
  export type DisbursementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Disbursements.
     */
    data: XOR<DisbursementUpdateManyMutationInput, DisbursementUncheckedUpdateManyInput>
    /**
     * Filter which Disbursements to update
     */
    where?: DisbursementWhereInput
  }

  /**
   * Disbursement upsert
   */
  export type DisbursementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disbursement
     */
    select?: DisbursementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisbursementInclude<ExtArgs> | null
    /**
     * The filter to search for the Disbursement to update in case it exists.
     */
    where: DisbursementWhereUniqueInput
    /**
     * In case the Disbursement found by the `where` argument doesn't exist, create a new Disbursement with this data.
     */
    create: XOR<DisbursementCreateInput, DisbursementUncheckedCreateInput>
    /**
     * In case the Disbursement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DisbursementUpdateInput, DisbursementUncheckedUpdateInput>
  }

  /**
   * Disbursement delete
   */
  export type DisbursementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disbursement
     */
    select?: DisbursementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisbursementInclude<ExtArgs> | null
    /**
     * Filter which Disbursement to delete.
     */
    where: DisbursementWhereUniqueInput
  }

  /**
   * Disbursement deleteMany
   */
  export type DisbursementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Disbursements to delete
     */
    where?: DisbursementWhereInput
  }

  /**
   * Disbursement without action
   */
  export type DisbursementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disbursement
     */
    select?: DisbursementSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisbursementInclude<ExtArgs> | null
  }


  /**
   * Model Procurement
   */

  export type AggregateProcurement = {
    _count: ProcurementCountAggregateOutputType | null
    _avg: ProcurementAvgAggregateOutputType | null
    _sum: ProcurementSumAggregateOutputType | null
    _min: ProcurementMinAggregateOutputType | null
    _max: ProcurementMaxAggregateOutputType | null
  }

  export type ProcurementAvgAggregateOutputType = {
    budgetMinor: number | null
  }

  export type ProcurementSumAggregateOutputType = {
    budgetMinor: bigint | null
  }

  export type ProcurementMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    tenderRef: string | null
    title: string | null
    budgetMinor: bigint | null
    currency: string | null
    status: $Enums.ProcurementStatus | null
    awardRef: string | null
    escrowIntentId: string | null
    createdAt: Date | null
  }

  export type ProcurementMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    tenderRef: string | null
    title: string | null
    budgetMinor: bigint | null
    currency: string | null
    status: $Enums.ProcurementStatus | null
    awardRef: string | null
    escrowIntentId: string | null
    createdAt: Date | null
  }

  export type ProcurementCountAggregateOutputType = {
    id: number
    orgId: number
    tenderRef: number
    title: number
    budgetMinor: number
    currency: number
    status: number
    awardRef: number
    escrowIntentId: number
    createdAt: number
    _all: number
  }


  export type ProcurementAvgAggregateInputType = {
    budgetMinor?: true
  }

  export type ProcurementSumAggregateInputType = {
    budgetMinor?: true
  }

  export type ProcurementMinAggregateInputType = {
    id?: true
    orgId?: true
    tenderRef?: true
    title?: true
    budgetMinor?: true
    currency?: true
    status?: true
    awardRef?: true
    escrowIntentId?: true
    createdAt?: true
  }

  export type ProcurementMaxAggregateInputType = {
    id?: true
    orgId?: true
    tenderRef?: true
    title?: true
    budgetMinor?: true
    currency?: true
    status?: true
    awardRef?: true
    escrowIntentId?: true
    createdAt?: true
  }

  export type ProcurementCountAggregateInputType = {
    id?: true
    orgId?: true
    tenderRef?: true
    title?: true
    budgetMinor?: true
    currency?: true
    status?: true
    awardRef?: true
    escrowIntentId?: true
    createdAt?: true
    _all?: true
  }

  export type ProcurementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Procurement to aggregate.
     */
    where?: ProcurementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Procurements to fetch.
     */
    orderBy?: ProcurementOrderByWithRelationInput | ProcurementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcurementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Procurements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Procurements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Procurements
    **/
    _count?: true | ProcurementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProcurementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProcurementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcurementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcurementMaxAggregateInputType
  }

  export type GetProcurementAggregateType<T extends ProcurementAggregateArgs> = {
        [P in keyof T & keyof AggregateProcurement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcurement[P]>
      : GetScalarType<T[P], AggregateProcurement[P]>
  }




  export type ProcurementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcurementWhereInput
    orderBy?: ProcurementOrderByWithAggregationInput | ProcurementOrderByWithAggregationInput[]
    by: ProcurementScalarFieldEnum[] | ProcurementScalarFieldEnum
    having?: ProcurementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcurementCountAggregateInputType | true
    _avg?: ProcurementAvgAggregateInputType
    _sum?: ProcurementSumAggregateInputType
    _min?: ProcurementMinAggregateInputType
    _max?: ProcurementMaxAggregateInputType
  }

  export type ProcurementGroupByOutputType = {
    id: string
    orgId: string
    tenderRef: string
    title: string
    budgetMinor: bigint
    currency: string
    status: $Enums.ProcurementStatus
    awardRef: string | null
    escrowIntentId: string | null
    createdAt: Date
    _count: ProcurementCountAggregateOutputType | null
    _avg: ProcurementAvgAggregateOutputType | null
    _sum: ProcurementSumAggregateOutputType | null
    _min: ProcurementMinAggregateOutputType | null
    _max: ProcurementMaxAggregateOutputType | null
  }

  type GetProcurementGroupByPayload<T extends ProcurementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcurementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcurementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcurementGroupByOutputType[P]>
            : GetScalarType<T[P], ProcurementGroupByOutputType[P]>
        }
      >
    >


  export type ProcurementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    tenderRef?: boolean
    title?: boolean
    budgetMinor?: boolean
    currency?: boolean
    status?: boolean
    awardRef?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["procurement"]>

  export type ProcurementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    tenderRef?: boolean
    title?: boolean
    budgetMinor?: boolean
    currency?: boolean
    status?: boolean
    awardRef?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["procurement"]>

  export type ProcurementSelectScalar = {
    id?: boolean
    orgId?: boolean
    tenderRef?: boolean
    title?: boolean
    budgetMinor?: boolean
    currency?: boolean
    status?: boolean
    awardRef?: boolean
    escrowIntentId?: boolean
    createdAt?: boolean
  }


  export type $ProcurementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Procurement"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      tenderRef: string
      title: string
      budgetMinor: bigint
      currency: string
      status: $Enums.ProcurementStatus
      awardRef: string | null
      escrowIntentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["procurement"]>
    composites: {}
  }

  type ProcurementGetPayload<S extends boolean | null | undefined | ProcurementDefaultArgs> = $Result.GetResult<Prisma.$ProcurementPayload, S>

  type ProcurementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProcurementFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProcurementCountAggregateInputType | true
    }

  export interface ProcurementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Procurement'], meta: { name: 'Procurement' } }
    /**
     * Find zero or one Procurement that matches the filter.
     * @param {ProcurementFindUniqueArgs} args - Arguments to find a Procurement
     * @example
     * // Get one Procurement
     * const procurement = await prisma.procurement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcurementFindUniqueArgs>(args: SelectSubset<T, ProcurementFindUniqueArgs<ExtArgs>>): Prisma__ProcurementClient<$Result.GetResult<Prisma.$ProcurementPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Procurement that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProcurementFindUniqueOrThrowArgs} args - Arguments to find a Procurement
     * @example
     * // Get one Procurement
     * const procurement = await prisma.procurement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcurementFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcurementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcurementClient<$Result.GetResult<Prisma.$ProcurementPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Procurement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcurementFindFirstArgs} args - Arguments to find a Procurement
     * @example
     * // Get one Procurement
     * const procurement = await prisma.procurement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcurementFindFirstArgs>(args?: SelectSubset<T, ProcurementFindFirstArgs<ExtArgs>>): Prisma__ProcurementClient<$Result.GetResult<Prisma.$ProcurementPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Procurement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcurementFindFirstOrThrowArgs} args - Arguments to find a Procurement
     * @example
     * // Get one Procurement
     * const procurement = await prisma.procurement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcurementFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcurementFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcurementClient<$Result.GetResult<Prisma.$ProcurementPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Procurements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcurementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Procurements
     * const procurements = await prisma.procurement.findMany()
     * 
     * // Get first 10 Procurements
     * const procurements = await prisma.procurement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const procurementWithIdOnly = await prisma.procurement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProcurementFindManyArgs>(args?: SelectSubset<T, ProcurementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcurementPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Procurement.
     * @param {ProcurementCreateArgs} args - Arguments to create a Procurement.
     * @example
     * // Create one Procurement
     * const Procurement = await prisma.procurement.create({
     *   data: {
     *     // ... data to create a Procurement
     *   }
     * })
     * 
     */
    create<T extends ProcurementCreateArgs>(args: SelectSubset<T, ProcurementCreateArgs<ExtArgs>>): Prisma__ProcurementClient<$Result.GetResult<Prisma.$ProcurementPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Procurements.
     * @param {ProcurementCreateManyArgs} args - Arguments to create many Procurements.
     * @example
     * // Create many Procurements
     * const procurement = await prisma.procurement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcurementCreateManyArgs>(args?: SelectSubset<T, ProcurementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Procurements and returns the data saved in the database.
     * @param {ProcurementCreateManyAndReturnArgs} args - Arguments to create many Procurements.
     * @example
     * // Create many Procurements
     * const procurement = await prisma.procurement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Procurements and only return the `id`
     * const procurementWithIdOnly = await prisma.procurement.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProcurementCreateManyAndReturnArgs>(args?: SelectSubset<T, ProcurementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcurementPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Procurement.
     * @param {ProcurementDeleteArgs} args - Arguments to delete one Procurement.
     * @example
     * // Delete one Procurement
     * const Procurement = await prisma.procurement.delete({
     *   where: {
     *     // ... filter to delete one Procurement
     *   }
     * })
     * 
     */
    delete<T extends ProcurementDeleteArgs>(args: SelectSubset<T, ProcurementDeleteArgs<ExtArgs>>): Prisma__ProcurementClient<$Result.GetResult<Prisma.$ProcurementPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Procurement.
     * @param {ProcurementUpdateArgs} args - Arguments to update one Procurement.
     * @example
     * // Update one Procurement
     * const procurement = await prisma.procurement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcurementUpdateArgs>(args: SelectSubset<T, ProcurementUpdateArgs<ExtArgs>>): Prisma__ProcurementClient<$Result.GetResult<Prisma.$ProcurementPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Procurements.
     * @param {ProcurementDeleteManyArgs} args - Arguments to filter Procurements to delete.
     * @example
     * // Delete a few Procurements
     * const { count } = await prisma.procurement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcurementDeleteManyArgs>(args?: SelectSubset<T, ProcurementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Procurements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcurementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Procurements
     * const procurement = await prisma.procurement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcurementUpdateManyArgs>(args: SelectSubset<T, ProcurementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Procurement.
     * @param {ProcurementUpsertArgs} args - Arguments to update or create a Procurement.
     * @example
     * // Update or create a Procurement
     * const procurement = await prisma.procurement.upsert({
     *   create: {
     *     // ... data to create a Procurement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Procurement we want to update
     *   }
     * })
     */
    upsert<T extends ProcurementUpsertArgs>(args: SelectSubset<T, ProcurementUpsertArgs<ExtArgs>>): Prisma__ProcurementClient<$Result.GetResult<Prisma.$ProcurementPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Procurements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcurementCountArgs} args - Arguments to filter Procurements to count.
     * @example
     * // Count the number of Procurements
     * const count = await prisma.procurement.count({
     *   where: {
     *     // ... the filter for the Procurements we want to count
     *   }
     * })
    **/
    count<T extends ProcurementCountArgs>(
      args?: Subset<T, ProcurementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcurementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Procurement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcurementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProcurementAggregateArgs>(args: Subset<T, ProcurementAggregateArgs>): Prisma.PrismaPromise<GetProcurementAggregateType<T>>

    /**
     * Group by Procurement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcurementGroupByArgs} args - Group by arguments.
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
      T extends ProcurementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcurementGroupByArgs['orderBy'] }
        : { orderBy?: ProcurementGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProcurementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcurementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Procurement model
   */
  readonly fields: ProcurementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Procurement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcurementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Procurement model
   */ 
  interface ProcurementFieldRefs {
    readonly id: FieldRef<"Procurement", 'String'>
    readonly orgId: FieldRef<"Procurement", 'String'>
    readonly tenderRef: FieldRef<"Procurement", 'String'>
    readonly title: FieldRef<"Procurement", 'String'>
    readonly budgetMinor: FieldRef<"Procurement", 'BigInt'>
    readonly currency: FieldRef<"Procurement", 'String'>
    readonly status: FieldRef<"Procurement", 'ProcurementStatus'>
    readonly awardRef: FieldRef<"Procurement", 'String'>
    readonly escrowIntentId: FieldRef<"Procurement", 'String'>
    readonly createdAt: FieldRef<"Procurement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Procurement findUnique
   */
  export type ProcurementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurement
     */
    select?: ProcurementSelect<ExtArgs> | null
    /**
     * Filter, which Procurement to fetch.
     */
    where: ProcurementWhereUniqueInput
  }

  /**
   * Procurement findUniqueOrThrow
   */
  export type ProcurementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurement
     */
    select?: ProcurementSelect<ExtArgs> | null
    /**
     * Filter, which Procurement to fetch.
     */
    where: ProcurementWhereUniqueInput
  }

  /**
   * Procurement findFirst
   */
  export type ProcurementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurement
     */
    select?: ProcurementSelect<ExtArgs> | null
    /**
     * Filter, which Procurement to fetch.
     */
    where?: ProcurementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Procurements to fetch.
     */
    orderBy?: ProcurementOrderByWithRelationInput | ProcurementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Procurements.
     */
    cursor?: ProcurementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Procurements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Procurements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Procurements.
     */
    distinct?: ProcurementScalarFieldEnum | ProcurementScalarFieldEnum[]
  }

  /**
   * Procurement findFirstOrThrow
   */
  export type ProcurementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurement
     */
    select?: ProcurementSelect<ExtArgs> | null
    /**
     * Filter, which Procurement to fetch.
     */
    where?: ProcurementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Procurements to fetch.
     */
    orderBy?: ProcurementOrderByWithRelationInput | ProcurementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Procurements.
     */
    cursor?: ProcurementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Procurements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Procurements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Procurements.
     */
    distinct?: ProcurementScalarFieldEnum | ProcurementScalarFieldEnum[]
  }

  /**
   * Procurement findMany
   */
  export type ProcurementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurement
     */
    select?: ProcurementSelect<ExtArgs> | null
    /**
     * Filter, which Procurements to fetch.
     */
    where?: ProcurementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Procurements to fetch.
     */
    orderBy?: ProcurementOrderByWithRelationInput | ProcurementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Procurements.
     */
    cursor?: ProcurementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Procurements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Procurements.
     */
    skip?: number
    distinct?: ProcurementScalarFieldEnum | ProcurementScalarFieldEnum[]
  }

  /**
   * Procurement create
   */
  export type ProcurementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurement
     */
    select?: ProcurementSelect<ExtArgs> | null
    /**
     * The data needed to create a Procurement.
     */
    data: XOR<ProcurementCreateInput, ProcurementUncheckedCreateInput>
  }

  /**
   * Procurement createMany
   */
  export type ProcurementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Procurements.
     */
    data: ProcurementCreateManyInput | ProcurementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Procurement createManyAndReturn
   */
  export type ProcurementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurement
     */
    select?: ProcurementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Procurements.
     */
    data: ProcurementCreateManyInput | ProcurementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Procurement update
   */
  export type ProcurementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurement
     */
    select?: ProcurementSelect<ExtArgs> | null
    /**
     * The data needed to update a Procurement.
     */
    data: XOR<ProcurementUpdateInput, ProcurementUncheckedUpdateInput>
    /**
     * Choose, which Procurement to update.
     */
    where: ProcurementWhereUniqueInput
  }

  /**
   * Procurement updateMany
   */
  export type ProcurementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Procurements.
     */
    data: XOR<ProcurementUpdateManyMutationInput, ProcurementUncheckedUpdateManyInput>
    /**
     * Filter which Procurements to update
     */
    where?: ProcurementWhereInput
  }

  /**
   * Procurement upsert
   */
  export type ProcurementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurement
     */
    select?: ProcurementSelect<ExtArgs> | null
    /**
     * The filter to search for the Procurement to update in case it exists.
     */
    where: ProcurementWhereUniqueInput
    /**
     * In case the Procurement found by the `where` argument doesn't exist, create a new Procurement with this data.
     */
    create: XOR<ProcurementCreateInput, ProcurementUncheckedCreateInput>
    /**
     * In case the Procurement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcurementUpdateInput, ProcurementUncheckedUpdateInput>
  }

  /**
   * Procurement delete
   */
  export type ProcurementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurement
     */
    select?: ProcurementSelect<ExtArgs> | null
    /**
     * Filter which Procurement to delete.
     */
    where: ProcurementWhereUniqueInput
  }

  /**
   * Procurement deleteMany
   */
  export type ProcurementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Procurements to delete
     */
    where?: ProcurementWhereInput
  }

  /**
   * Procurement without action
   */
  export type ProcurementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Procurement
     */
    select?: ProcurementSelect<ExtArgs> | null
  }


  /**
   * Model PublicRecord
   */

  export type AggregatePublicRecord = {
    _count: PublicRecordCountAggregateOutputType | null
    _min: PublicRecordMinAggregateOutputType | null
    _max: PublicRecordMaxAggregateOutputType | null
  }

  export type PublicRecordMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    programId: string | null
    recordType: string | null
    subjectHash: string | null
    dataHash: string | null
    attestationId: string | null
    createdAt: Date | null
  }

  export type PublicRecordMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    programId: string | null
    recordType: string | null
    subjectHash: string | null
    dataHash: string | null
    attestationId: string | null
    createdAt: Date | null
  }

  export type PublicRecordCountAggregateOutputType = {
    id: number
    orgId: number
    programId: number
    recordType: number
    subjectHash: number
    dataHash: number
    attestationId: number
    createdAt: number
    _all: number
  }


  export type PublicRecordMinAggregateInputType = {
    id?: true
    orgId?: true
    programId?: true
    recordType?: true
    subjectHash?: true
    dataHash?: true
    attestationId?: true
    createdAt?: true
  }

  export type PublicRecordMaxAggregateInputType = {
    id?: true
    orgId?: true
    programId?: true
    recordType?: true
    subjectHash?: true
    dataHash?: true
    attestationId?: true
    createdAt?: true
  }

  export type PublicRecordCountAggregateInputType = {
    id?: true
    orgId?: true
    programId?: true
    recordType?: true
    subjectHash?: true
    dataHash?: true
    attestationId?: true
    createdAt?: true
    _all?: true
  }

  export type PublicRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PublicRecord to aggregate.
     */
    where?: PublicRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicRecords to fetch.
     */
    orderBy?: PublicRecordOrderByWithRelationInput | PublicRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PublicRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PublicRecords
    **/
    _count?: true | PublicRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PublicRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PublicRecordMaxAggregateInputType
  }

  export type GetPublicRecordAggregateType<T extends PublicRecordAggregateArgs> = {
        [P in keyof T & keyof AggregatePublicRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePublicRecord[P]>
      : GetScalarType<T[P], AggregatePublicRecord[P]>
  }




  export type PublicRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PublicRecordWhereInput
    orderBy?: PublicRecordOrderByWithAggregationInput | PublicRecordOrderByWithAggregationInput[]
    by: PublicRecordScalarFieldEnum[] | PublicRecordScalarFieldEnum
    having?: PublicRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PublicRecordCountAggregateInputType | true
    _min?: PublicRecordMinAggregateInputType
    _max?: PublicRecordMaxAggregateInputType
  }

  export type PublicRecordGroupByOutputType = {
    id: string
    orgId: string
    programId: string | null
    recordType: string
    subjectHash: string
    dataHash: string
    attestationId: string | null
    createdAt: Date
    _count: PublicRecordCountAggregateOutputType | null
    _min: PublicRecordMinAggregateOutputType | null
    _max: PublicRecordMaxAggregateOutputType | null
  }

  type GetPublicRecordGroupByPayload<T extends PublicRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PublicRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PublicRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PublicRecordGroupByOutputType[P]>
            : GetScalarType<T[P], PublicRecordGroupByOutputType[P]>
        }
      >
    >


  export type PublicRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    programId?: boolean
    recordType?: boolean
    subjectHash?: boolean
    dataHash?: boolean
    attestationId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["publicRecord"]>

  export type PublicRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    programId?: boolean
    recordType?: boolean
    subjectHash?: boolean
    dataHash?: boolean
    attestationId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["publicRecord"]>

  export type PublicRecordSelectScalar = {
    id?: boolean
    orgId?: boolean
    programId?: boolean
    recordType?: boolean
    subjectHash?: boolean
    dataHash?: boolean
    attestationId?: boolean
    createdAt?: boolean
  }


  export type $PublicRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PublicRecord"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      programId: string | null
      recordType: string
      subjectHash: string
      dataHash: string
      attestationId: string | null
      createdAt: Date
    }, ExtArgs["result"]["publicRecord"]>
    composites: {}
  }

  type PublicRecordGetPayload<S extends boolean | null | undefined | PublicRecordDefaultArgs> = $Result.GetResult<Prisma.$PublicRecordPayload, S>

  type PublicRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PublicRecordFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PublicRecordCountAggregateInputType | true
    }

  export interface PublicRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PublicRecord'], meta: { name: 'PublicRecord' } }
    /**
     * Find zero or one PublicRecord that matches the filter.
     * @param {PublicRecordFindUniqueArgs} args - Arguments to find a PublicRecord
     * @example
     * // Get one PublicRecord
     * const publicRecord = await prisma.publicRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PublicRecordFindUniqueArgs>(args: SelectSubset<T, PublicRecordFindUniqueArgs<ExtArgs>>): Prisma__PublicRecordClient<$Result.GetResult<Prisma.$PublicRecordPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PublicRecord that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PublicRecordFindUniqueOrThrowArgs} args - Arguments to find a PublicRecord
     * @example
     * // Get one PublicRecord
     * const publicRecord = await prisma.publicRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PublicRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, PublicRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PublicRecordClient<$Result.GetResult<Prisma.$PublicRecordPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PublicRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicRecordFindFirstArgs} args - Arguments to find a PublicRecord
     * @example
     * // Get one PublicRecord
     * const publicRecord = await prisma.publicRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PublicRecordFindFirstArgs>(args?: SelectSubset<T, PublicRecordFindFirstArgs<ExtArgs>>): Prisma__PublicRecordClient<$Result.GetResult<Prisma.$PublicRecordPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PublicRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicRecordFindFirstOrThrowArgs} args - Arguments to find a PublicRecord
     * @example
     * // Get one PublicRecord
     * const publicRecord = await prisma.publicRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PublicRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, PublicRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__PublicRecordClient<$Result.GetResult<Prisma.$PublicRecordPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PublicRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PublicRecords
     * const publicRecords = await prisma.publicRecord.findMany()
     * 
     * // Get first 10 PublicRecords
     * const publicRecords = await prisma.publicRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const publicRecordWithIdOnly = await prisma.publicRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PublicRecordFindManyArgs>(args?: SelectSubset<T, PublicRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicRecordPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PublicRecord.
     * @param {PublicRecordCreateArgs} args - Arguments to create a PublicRecord.
     * @example
     * // Create one PublicRecord
     * const PublicRecord = await prisma.publicRecord.create({
     *   data: {
     *     // ... data to create a PublicRecord
     *   }
     * })
     * 
     */
    create<T extends PublicRecordCreateArgs>(args: SelectSubset<T, PublicRecordCreateArgs<ExtArgs>>): Prisma__PublicRecordClient<$Result.GetResult<Prisma.$PublicRecordPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PublicRecords.
     * @param {PublicRecordCreateManyArgs} args - Arguments to create many PublicRecords.
     * @example
     * // Create many PublicRecords
     * const publicRecord = await prisma.publicRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PublicRecordCreateManyArgs>(args?: SelectSubset<T, PublicRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PublicRecords and returns the data saved in the database.
     * @param {PublicRecordCreateManyAndReturnArgs} args - Arguments to create many PublicRecords.
     * @example
     * // Create many PublicRecords
     * const publicRecord = await prisma.publicRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PublicRecords and only return the `id`
     * const publicRecordWithIdOnly = await prisma.publicRecord.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PublicRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, PublicRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicRecordPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PublicRecord.
     * @param {PublicRecordDeleteArgs} args - Arguments to delete one PublicRecord.
     * @example
     * // Delete one PublicRecord
     * const PublicRecord = await prisma.publicRecord.delete({
     *   where: {
     *     // ... filter to delete one PublicRecord
     *   }
     * })
     * 
     */
    delete<T extends PublicRecordDeleteArgs>(args: SelectSubset<T, PublicRecordDeleteArgs<ExtArgs>>): Prisma__PublicRecordClient<$Result.GetResult<Prisma.$PublicRecordPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PublicRecord.
     * @param {PublicRecordUpdateArgs} args - Arguments to update one PublicRecord.
     * @example
     * // Update one PublicRecord
     * const publicRecord = await prisma.publicRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PublicRecordUpdateArgs>(args: SelectSubset<T, PublicRecordUpdateArgs<ExtArgs>>): Prisma__PublicRecordClient<$Result.GetResult<Prisma.$PublicRecordPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PublicRecords.
     * @param {PublicRecordDeleteManyArgs} args - Arguments to filter PublicRecords to delete.
     * @example
     * // Delete a few PublicRecords
     * const { count } = await prisma.publicRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PublicRecordDeleteManyArgs>(args?: SelectSubset<T, PublicRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PublicRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PublicRecords
     * const publicRecord = await prisma.publicRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PublicRecordUpdateManyArgs>(args: SelectSubset<T, PublicRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PublicRecord.
     * @param {PublicRecordUpsertArgs} args - Arguments to update or create a PublicRecord.
     * @example
     * // Update or create a PublicRecord
     * const publicRecord = await prisma.publicRecord.upsert({
     *   create: {
     *     // ... data to create a PublicRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PublicRecord we want to update
     *   }
     * })
     */
    upsert<T extends PublicRecordUpsertArgs>(args: SelectSubset<T, PublicRecordUpsertArgs<ExtArgs>>): Prisma__PublicRecordClient<$Result.GetResult<Prisma.$PublicRecordPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PublicRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicRecordCountArgs} args - Arguments to filter PublicRecords to count.
     * @example
     * // Count the number of PublicRecords
     * const count = await prisma.publicRecord.count({
     *   where: {
     *     // ... the filter for the PublicRecords we want to count
     *   }
     * })
    **/
    count<T extends PublicRecordCountArgs>(
      args?: Subset<T, PublicRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PublicRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PublicRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PublicRecordAggregateArgs>(args: Subset<T, PublicRecordAggregateArgs>): Prisma.PrismaPromise<GetPublicRecordAggregateType<T>>

    /**
     * Group by PublicRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicRecordGroupByArgs} args - Group by arguments.
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
      T extends PublicRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PublicRecordGroupByArgs['orderBy'] }
        : { orderBy?: PublicRecordGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PublicRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublicRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PublicRecord model
   */
  readonly fields: PublicRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PublicRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PublicRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PublicRecord model
   */ 
  interface PublicRecordFieldRefs {
    readonly id: FieldRef<"PublicRecord", 'String'>
    readonly orgId: FieldRef<"PublicRecord", 'String'>
    readonly programId: FieldRef<"PublicRecord", 'String'>
    readonly recordType: FieldRef<"PublicRecord", 'String'>
    readonly subjectHash: FieldRef<"PublicRecord", 'String'>
    readonly dataHash: FieldRef<"PublicRecord", 'String'>
    readonly attestationId: FieldRef<"PublicRecord", 'String'>
    readonly createdAt: FieldRef<"PublicRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PublicRecord findUnique
   */
  export type PublicRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRecord
     */
    select?: PublicRecordSelect<ExtArgs> | null
    /**
     * Filter, which PublicRecord to fetch.
     */
    where: PublicRecordWhereUniqueInput
  }

  /**
   * PublicRecord findUniqueOrThrow
   */
  export type PublicRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRecord
     */
    select?: PublicRecordSelect<ExtArgs> | null
    /**
     * Filter, which PublicRecord to fetch.
     */
    where: PublicRecordWhereUniqueInput
  }

  /**
   * PublicRecord findFirst
   */
  export type PublicRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRecord
     */
    select?: PublicRecordSelect<ExtArgs> | null
    /**
     * Filter, which PublicRecord to fetch.
     */
    where?: PublicRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicRecords to fetch.
     */
    orderBy?: PublicRecordOrderByWithRelationInput | PublicRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PublicRecords.
     */
    cursor?: PublicRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PublicRecords.
     */
    distinct?: PublicRecordScalarFieldEnum | PublicRecordScalarFieldEnum[]
  }

  /**
   * PublicRecord findFirstOrThrow
   */
  export type PublicRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRecord
     */
    select?: PublicRecordSelect<ExtArgs> | null
    /**
     * Filter, which PublicRecord to fetch.
     */
    where?: PublicRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicRecords to fetch.
     */
    orderBy?: PublicRecordOrderByWithRelationInput | PublicRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PublicRecords.
     */
    cursor?: PublicRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PublicRecords.
     */
    distinct?: PublicRecordScalarFieldEnum | PublicRecordScalarFieldEnum[]
  }

  /**
   * PublicRecord findMany
   */
  export type PublicRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRecord
     */
    select?: PublicRecordSelect<ExtArgs> | null
    /**
     * Filter, which PublicRecords to fetch.
     */
    where?: PublicRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicRecords to fetch.
     */
    orderBy?: PublicRecordOrderByWithRelationInput | PublicRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PublicRecords.
     */
    cursor?: PublicRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicRecords.
     */
    skip?: number
    distinct?: PublicRecordScalarFieldEnum | PublicRecordScalarFieldEnum[]
  }

  /**
   * PublicRecord create
   */
  export type PublicRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRecord
     */
    select?: PublicRecordSelect<ExtArgs> | null
    /**
     * The data needed to create a PublicRecord.
     */
    data: XOR<PublicRecordCreateInput, PublicRecordUncheckedCreateInput>
  }

  /**
   * PublicRecord createMany
   */
  export type PublicRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PublicRecords.
     */
    data: PublicRecordCreateManyInput | PublicRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PublicRecord createManyAndReturn
   */
  export type PublicRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRecord
     */
    select?: PublicRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PublicRecords.
     */
    data: PublicRecordCreateManyInput | PublicRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PublicRecord update
   */
  export type PublicRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRecord
     */
    select?: PublicRecordSelect<ExtArgs> | null
    /**
     * The data needed to update a PublicRecord.
     */
    data: XOR<PublicRecordUpdateInput, PublicRecordUncheckedUpdateInput>
    /**
     * Choose, which PublicRecord to update.
     */
    where: PublicRecordWhereUniqueInput
  }

  /**
   * PublicRecord updateMany
   */
  export type PublicRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PublicRecords.
     */
    data: XOR<PublicRecordUpdateManyMutationInput, PublicRecordUncheckedUpdateManyInput>
    /**
     * Filter which PublicRecords to update
     */
    where?: PublicRecordWhereInput
  }

  /**
   * PublicRecord upsert
   */
  export type PublicRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRecord
     */
    select?: PublicRecordSelect<ExtArgs> | null
    /**
     * The filter to search for the PublicRecord to update in case it exists.
     */
    where: PublicRecordWhereUniqueInput
    /**
     * In case the PublicRecord found by the `where` argument doesn't exist, create a new PublicRecord with this data.
     */
    create: XOR<PublicRecordCreateInput, PublicRecordUncheckedCreateInput>
    /**
     * In case the PublicRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PublicRecordUpdateInput, PublicRecordUncheckedUpdateInput>
  }

  /**
   * PublicRecord delete
   */
  export type PublicRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRecord
     */
    select?: PublicRecordSelect<ExtArgs> | null
    /**
     * Filter which PublicRecord to delete.
     */
    where: PublicRecordWhereUniqueInput
  }

  /**
   * PublicRecord deleteMany
   */
  export type PublicRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PublicRecords to delete
     */
    where?: PublicRecordWhereInput
  }

  /**
   * PublicRecord without action
   */
  export type PublicRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicRecord
     */
    select?: PublicRecordSelect<ExtArgs> | null
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


  export const ProgramScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    name: 'name',
    budgetMinor: 'budgetMinor',
    currency: 'currency',
    eligibility: 'eligibility',
    createdAt: 'createdAt'
  };

  export type ProgramScalarFieldEnum = (typeof ProgramScalarFieldEnum)[keyof typeof ProgramScalarFieldEnum]


  export const BeneficiaryScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    programId: 'programId',
    externalRef: 'externalRef',
    kycStatus: 'kycStatus',
    createdAt: 'createdAt'
  };

  export type BeneficiaryScalarFieldEnum = (typeof BeneficiaryScalarFieldEnum)[keyof typeof BeneficiaryScalarFieldEnum]


  export const DisbursementScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    programId: 'programId',
    beneficiaryId: 'beneficiaryId',
    amountMinor: 'amountMinor',
    currency: 'currency',
    status: 'status',
    batchIntentId: 'batchIntentId',
    createdAt: 'createdAt'
  };

  export type DisbursementScalarFieldEnum = (typeof DisbursementScalarFieldEnum)[keyof typeof DisbursementScalarFieldEnum]


  export const ProcurementScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    tenderRef: 'tenderRef',
    title: 'title',
    budgetMinor: 'budgetMinor',
    currency: 'currency',
    status: 'status',
    awardRef: 'awardRef',
    escrowIntentId: 'escrowIntentId',
    createdAt: 'createdAt'
  };

  export type ProcurementScalarFieldEnum = (typeof ProcurementScalarFieldEnum)[keyof typeof ProcurementScalarFieldEnum]


  export const PublicRecordScalarFieldEnum: {
    id: 'id',
    orgId: 'orgId',
    programId: 'programId',
    recordType: 'recordType',
    subjectHash: 'subjectHash',
    dataHash: 'dataHash',
    attestationId: 'attestationId',
    createdAt: 'createdAt'
  };

  export type PublicRecordScalarFieldEnum = (typeof PublicRecordScalarFieldEnum)[keyof typeof PublicRecordScalarFieldEnum]


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
   * Reference to a field of type 'DisbursementStatus'
   */
  export type EnumDisbursementStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisbursementStatus'>
    


  /**
   * Reference to a field of type 'DisbursementStatus[]'
   */
  export type ListEnumDisbursementStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisbursementStatus[]'>
    


  /**
   * Reference to a field of type 'ProcurementStatus'
   */
  export type EnumProcurementStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProcurementStatus'>
    


  /**
   * Reference to a field of type 'ProcurementStatus[]'
   */
  export type ListEnumProcurementStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProcurementStatus[]'>
    


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

  export type ProgramWhereInput = {
    AND?: ProgramWhereInput | ProgramWhereInput[]
    OR?: ProgramWhereInput[]
    NOT?: ProgramWhereInput | ProgramWhereInput[]
    id?: StringFilter<"Program"> | string
    orgId?: StringFilter<"Program"> | string
    name?: StringFilter<"Program"> | string
    budgetMinor?: BigIntFilter<"Program"> | bigint | number
    currency?: StringFilter<"Program"> | string
    eligibility?: JsonNullableFilter<"Program">
    createdAt?: DateTimeFilter<"Program"> | Date | string
    disbursements?: DisbursementListRelationFilter
  }

  export type ProgramOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    budgetMinor?: SortOrder
    currency?: SortOrder
    eligibility?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    disbursements?: DisbursementOrderByRelationAggregateInput
  }

  export type ProgramWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProgramWhereInput | ProgramWhereInput[]
    OR?: ProgramWhereInput[]
    NOT?: ProgramWhereInput | ProgramWhereInput[]
    orgId?: StringFilter<"Program"> | string
    name?: StringFilter<"Program"> | string
    budgetMinor?: BigIntFilter<"Program"> | bigint | number
    currency?: StringFilter<"Program"> | string
    eligibility?: JsonNullableFilter<"Program">
    createdAt?: DateTimeFilter<"Program"> | Date | string
    disbursements?: DisbursementListRelationFilter
  }, "id">

  export type ProgramOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    budgetMinor?: SortOrder
    currency?: SortOrder
    eligibility?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ProgramCountOrderByAggregateInput
    _avg?: ProgramAvgOrderByAggregateInput
    _max?: ProgramMaxOrderByAggregateInput
    _min?: ProgramMinOrderByAggregateInput
    _sum?: ProgramSumOrderByAggregateInput
  }

  export type ProgramScalarWhereWithAggregatesInput = {
    AND?: ProgramScalarWhereWithAggregatesInput | ProgramScalarWhereWithAggregatesInput[]
    OR?: ProgramScalarWhereWithAggregatesInput[]
    NOT?: ProgramScalarWhereWithAggregatesInput | ProgramScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Program"> | string
    orgId?: StringWithAggregatesFilter<"Program"> | string
    name?: StringWithAggregatesFilter<"Program"> | string
    budgetMinor?: BigIntWithAggregatesFilter<"Program"> | bigint | number
    currency?: StringWithAggregatesFilter<"Program"> | string
    eligibility?: JsonNullableWithAggregatesFilter<"Program">
    createdAt?: DateTimeWithAggregatesFilter<"Program"> | Date | string
  }

  export type BeneficiaryWhereInput = {
    AND?: BeneficiaryWhereInput | BeneficiaryWhereInput[]
    OR?: BeneficiaryWhereInput[]
    NOT?: BeneficiaryWhereInput | BeneficiaryWhereInput[]
    id?: StringFilter<"Beneficiary"> | string
    orgId?: StringFilter<"Beneficiary"> | string
    programId?: StringFilter<"Beneficiary"> | string
    externalRef?: StringFilter<"Beneficiary"> | string
    kycStatus?: StringFilter<"Beneficiary"> | string
    createdAt?: DateTimeFilter<"Beneficiary"> | Date | string
  }

  export type BeneficiaryOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    externalRef?: SortOrder
    kycStatus?: SortOrder
    createdAt?: SortOrder
  }

  export type BeneficiaryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orgId_programId_externalRef?: BeneficiaryOrgIdProgramIdExternalRefCompoundUniqueInput
    AND?: BeneficiaryWhereInput | BeneficiaryWhereInput[]
    OR?: BeneficiaryWhereInput[]
    NOT?: BeneficiaryWhereInput | BeneficiaryWhereInput[]
    orgId?: StringFilter<"Beneficiary"> | string
    programId?: StringFilter<"Beneficiary"> | string
    externalRef?: StringFilter<"Beneficiary"> | string
    kycStatus?: StringFilter<"Beneficiary"> | string
    createdAt?: DateTimeFilter<"Beneficiary"> | Date | string
  }, "id" | "orgId_programId_externalRef">

  export type BeneficiaryOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    externalRef?: SortOrder
    kycStatus?: SortOrder
    createdAt?: SortOrder
    _count?: BeneficiaryCountOrderByAggregateInput
    _max?: BeneficiaryMaxOrderByAggregateInput
    _min?: BeneficiaryMinOrderByAggregateInput
  }

  export type BeneficiaryScalarWhereWithAggregatesInput = {
    AND?: BeneficiaryScalarWhereWithAggregatesInput | BeneficiaryScalarWhereWithAggregatesInput[]
    OR?: BeneficiaryScalarWhereWithAggregatesInput[]
    NOT?: BeneficiaryScalarWhereWithAggregatesInput | BeneficiaryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Beneficiary"> | string
    orgId?: StringWithAggregatesFilter<"Beneficiary"> | string
    programId?: StringWithAggregatesFilter<"Beneficiary"> | string
    externalRef?: StringWithAggregatesFilter<"Beneficiary"> | string
    kycStatus?: StringWithAggregatesFilter<"Beneficiary"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Beneficiary"> | Date | string
  }

  export type DisbursementWhereInput = {
    AND?: DisbursementWhereInput | DisbursementWhereInput[]
    OR?: DisbursementWhereInput[]
    NOT?: DisbursementWhereInput | DisbursementWhereInput[]
    id?: StringFilter<"Disbursement"> | string
    orgId?: StringFilter<"Disbursement"> | string
    programId?: StringFilter<"Disbursement"> | string
    beneficiaryId?: StringFilter<"Disbursement"> | string
    amountMinor?: BigIntFilter<"Disbursement"> | bigint | number
    currency?: StringFilter<"Disbursement"> | string
    status?: EnumDisbursementStatusFilter<"Disbursement"> | $Enums.DisbursementStatus
    batchIntentId?: StringNullableFilter<"Disbursement"> | string | null
    createdAt?: DateTimeFilter<"Disbursement"> | Date | string
    program?: XOR<ProgramRelationFilter, ProgramWhereInput>
  }

  export type DisbursementOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    beneficiaryId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    batchIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    program?: ProgramOrderByWithRelationInput
  }

  export type DisbursementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DisbursementWhereInput | DisbursementWhereInput[]
    OR?: DisbursementWhereInput[]
    NOT?: DisbursementWhereInput | DisbursementWhereInput[]
    orgId?: StringFilter<"Disbursement"> | string
    programId?: StringFilter<"Disbursement"> | string
    beneficiaryId?: StringFilter<"Disbursement"> | string
    amountMinor?: BigIntFilter<"Disbursement"> | bigint | number
    currency?: StringFilter<"Disbursement"> | string
    status?: EnumDisbursementStatusFilter<"Disbursement"> | $Enums.DisbursementStatus
    batchIntentId?: StringNullableFilter<"Disbursement"> | string | null
    createdAt?: DateTimeFilter<"Disbursement"> | Date | string
    program?: XOR<ProgramRelationFilter, ProgramWhereInput>
  }, "id">

  export type DisbursementOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    beneficiaryId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    batchIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DisbursementCountOrderByAggregateInput
    _avg?: DisbursementAvgOrderByAggregateInput
    _max?: DisbursementMaxOrderByAggregateInput
    _min?: DisbursementMinOrderByAggregateInput
    _sum?: DisbursementSumOrderByAggregateInput
  }

  export type DisbursementScalarWhereWithAggregatesInput = {
    AND?: DisbursementScalarWhereWithAggregatesInput | DisbursementScalarWhereWithAggregatesInput[]
    OR?: DisbursementScalarWhereWithAggregatesInput[]
    NOT?: DisbursementScalarWhereWithAggregatesInput | DisbursementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Disbursement"> | string
    orgId?: StringWithAggregatesFilter<"Disbursement"> | string
    programId?: StringWithAggregatesFilter<"Disbursement"> | string
    beneficiaryId?: StringWithAggregatesFilter<"Disbursement"> | string
    amountMinor?: BigIntWithAggregatesFilter<"Disbursement"> | bigint | number
    currency?: StringWithAggregatesFilter<"Disbursement"> | string
    status?: EnumDisbursementStatusWithAggregatesFilter<"Disbursement"> | $Enums.DisbursementStatus
    batchIntentId?: StringNullableWithAggregatesFilter<"Disbursement"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Disbursement"> | Date | string
  }

  export type ProcurementWhereInput = {
    AND?: ProcurementWhereInput | ProcurementWhereInput[]
    OR?: ProcurementWhereInput[]
    NOT?: ProcurementWhereInput | ProcurementWhereInput[]
    id?: StringFilter<"Procurement"> | string
    orgId?: StringFilter<"Procurement"> | string
    tenderRef?: StringFilter<"Procurement"> | string
    title?: StringFilter<"Procurement"> | string
    budgetMinor?: BigIntFilter<"Procurement"> | bigint | number
    currency?: StringFilter<"Procurement"> | string
    status?: EnumProcurementStatusFilter<"Procurement"> | $Enums.ProcurementStatus
    awardRef?: StringNullableFilter<"Procurement"> | string | null
    escrowIntentId?: StringNullableFilter<"Procurement"> | string | null
    createdAt?: DateTimeFilter<"Procurement"> | Date | string
  }

  export type ProcurementOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    tenderRef?: SortOrder
    title?: SortOrder
    budgetMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    awardRef?: SortOrderInput | SortOrder
    escrowIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type ProcurementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProcurementWhereInput | ProcurementWhereInput[]
    OR?: ProcurementWhereInput[]
    NOT?: ProcurementWhereInput | ProcurementWhereInput[]
    orgId?: StringFilter<"Procurement"> | string
    tenderRef?: StringFilter<"Procurement"> | string
    title?: StringFilter<"Procurement"> | string
    budgetMinor?: BigIntFilter<"Procurement"> | bigint | number
    currency?: StringFilter<"Procurement"> | string
    status?: EnumProcurementStatusFilter<"Procurement"> | $Enums.ProcurementStatus
    awardRef?: StringNullableFilter<"Procurement"> | string | null
    escrowIntentId?: StringNullableFilter<"Procurement"> | string | null
    createdAt?: DateTimeFilter<"Procurement"> | Date | string
  }, "id">

  export type ProcurementOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    tenderRef?: SortOrder
    title?: SortOrder
    budgetMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    awardRef?: SortOrderInput | SortOrder
    escrowIntentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ProcurementCountOrderByAggregateInput
    _avg?: ProcurementAvgOrderByAggregateInput
    _max?: ProcurementMaxOrderByAggregateInput
    _min?: ProcurementMinOrderByAggregateInput
    _sum?: ProcurementSumOrderByAggregateInput
  }

  export type ProcurementScalarWhereWithAggregatesInput = {
    AND?: ProcurementScalarWhereWithAggregatesInput | ProcurementScalarWhereWithAggregatesInput[]
    OR?: ProcurementScalarWhereWithAggregatesInput[]
    NOT?: ProcurementScalarWhereWithAggregatesInput | ProcurementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Procurement"> | string
    orgId?: StringWithAggregatesFilter<"Procurement"> | string
    tenderRef?: StringWithAggregatesFilter<"Procurement"> | string
    title?: StringWithAggregatesFilter<"Procurement"> | string
    budgetMinor?: BigIntWithAggregatesFilter<"Procurement"> | bigint | number
    currency?: StringWithAggregatesFilter<"Procurement"> | string
    status?: EnumProcurementStatusWithAggregatesFilter<"Procurement"> | $Enums.ProcurementStatus
    awardRef?: StringNullableWithAggregatesFilter<"Procurement"> | string | null
    escrowIntentId?: StringNullableWithAggregatesFilter<"Procurement"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Procurement"> | Date | string
  }

  export type PublicRecordWhereInput = {
    AND?: PublicRecordWhereInput | PublicRecordWhereInput[]
    OR?: PublicRecordWhereInput[]
    NOT?: PublicRecordWhereInput | PublicRecordWhereInput[]
    id?: StringFilter<"PublicRecord"> | string
    orgId?: StringFilter<"PublicRecord"> | string
    programId?: StringNullableFilter<"PublicRecord"> | string | null
    recordType?: StringFilter<"PublicRecord"> | string
    subjectHash?: StringFilter<"PublicRecord"> | string
    dataHash?: StringFilter<"PublicRecord"> | string
    attestationId?: StringNullableFilter<"PublicRecord"> | string | null
    createdAt?: DateTimeFilter<"PublicRecord"> | Date | string
  }

  export type PublicRecordOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrderInput | SortOrder
    recordType?: SortOrder
    subjectHash?: SortOrder
    dataHash?: SortOrder
    attestationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type PublicRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PublicRecordWhereInput | PublicRecordWhereInput[]
    OR?: PublicRecordWhereInput[]
    NOT?: PublicRecordWhereInput | PublicRecordWhereInput[]
    orgId?: StringFilter<"PublicRecord"> | string
    programId?: StringNullableFilter<"PublicRecord"> | string | null
    recordType?: StringFilter<"PublicRecord"> | string
    subjectHash?: StringFilter<"PublicRecord"> | string
    dataHash?: StringFilter<"PublicRecord"> | string
    attestationId?: StringNullableFilter<"PublicRecord"> | string | null
    createdAt?: DateTimeFilter<"PublicRecord"> | Date | string
  }, "id">

  export type PublicRecordOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrderInput | SortOrder
    recordType?: SortOrder
    subjectHash?: SortOrder
    dataHash?: SortOrder
    attestationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PublicRecordCountOrderByAggregateInput
    _max?: PublicRecordMaxOrderByAggregateInput
    _min?: PublicRecordMinOrderByAggregateInput
  }

  export type PublicRecordScalarWhereWithAggregatesInput = {
    AND?: PublicRecordScalarWhereWithAggregatesInput | PublicRecordScalarWhereWithAggregatesInput[]
    OR?: PublicRecordScalarWhereWithAggregatesInput[]
    NOT?: PublicRecordScalarWhereWithAggregatesInput | PublicRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PublicRecord"> | string
    orgId?: StringWithAggregatesFilter<"PublicRecord"> | string
    programId?: StringNullableWithAggregatesFilter<"PublicRecord"> | string | null
    recordType?: StringWithAggregatesFilter<"PublicRecord"> | string
    subjectHash?: StringWithAggregatesFilter<"PublicRecord"> | string
    dataHash?: StringWithAggregatesFilter<"PublicRecord"> | string
    attestationId?: StringNullableWithAggregatesFilter<"PublicRecord"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PublicRecord"> | Date | string
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

  export type ProgramCreateInput = {
    id: string
    orgId: string
    name: string
    budgetMinor: bigint | number
    currency: string
    eligibility?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    disbursements?: DisbursementCreateNestedManyWithoutProgramInput
  }

  export type ProgramUncheckedCreateInput = {
    id: string
    orgId: string
    name: string
    budgetMinor: bigint | number
    currency: string
    eligibility?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    disbursements?: DisbursementUncheckedCreateNestedManyWithoutProgramInput
  }

  export type ProgramUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    budgetMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    eligibility?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursements?: DisbursementUpdateManyWithoutProgramNestedInput
  }

  export type ProgramUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    budgetMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    eligibility?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    disbursements?: DisbursementUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type ProgramCreateManyInput = {
    id: string
    orgId: string
    name: string
    budgetMinor: bigint | number
    currency: string
    eligibility?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ProgramUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    budgetMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    eligibility?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    budgetMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    eligibility?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BeneficiaryCreateInput = {
    id: string
    orgId: string
    programId: string
    externalRef: string
    kycStatus?: string
    createdAt?: Date | string
  }

  export type BeneficiaryUncheckedCreateInput = {
    id: string
    orgId: string
    programId: string
    externalRef: string
    kycStatus?: string
    createdAt?: Date | string
  }

  export type BeneficiaryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BeneficiaryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BeneficiaryCreateManyInput = {
    id: string
    orgId: string
    programId: string
    externalRef: string
    kycStatus?: string
    createdAt?: Date | string
  }

  export type BeneficiaryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BeneficiaryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    externalRef?: StringFieldUpdateOperationsInput | string
    kycStatus?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisbursementCreateInput = {
    id: string
    orgId: string
    beneficiaryId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.DisbursementStatus
    batchIntentId?: string | null
    createdAt?: Date | string
    program: ProgramCreateNestedOneWithoutDisbursementsInput
  }

  export type DisbursementUncheckedCreateInput = {
    id: string
    orgId: string
    programId: string
    beneficiaryId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.DisbursementStatus
    batchIntentId?: string | null
    createdAt?: Date | string
  }

  export type DisbursementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    beneficiaryId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumDisbursementStatusFieldUpdateOperationsInput | $Enums.DisbursementStatus
    batchIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    program?: ProgramUpdateOneRequiredWithoutDisbursementsNestedInput
  }

  export type DisbursementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    beneficiaryId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumDisbursementStatusFieldUpdateOperationsInput | $Enums.DisbursementStatus
    batchIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisbursementCreateManyInput = {
    id: string
    orgId: string
    programId: string
    beneficiaryId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.DisbursementStatus
    batchIntentId?: string | null
    createdAt?: Date | string
  }

  export type DisbursementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    beneficiaryId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumDisbursementStatusFieldUpdateOperationsInput | $Enums.DisbursementStatus
    batchIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisbursementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    beneficiaryId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumDisbursementStatusFieldUpdateOperationsInput | $Enums.DisbursementStatus
    batchIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcurementCreateInput = {
    id: string
    orgId: string
    tenderRef: string
    title: string
    budgetMinor: bigint | number
    currency: string
    status?: $Enums.ProcurementStatus
    awardRef?: string | null
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type ProcurementUncheckedCreateInput = {
    id: string
    orgId: string
    tenderRef: string
    title: string
    budgetMinor: bigint | number
    currency: string
    status?: $Enums.ProcurementStatus
    awardRef?: string | null
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type ProcurementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    tenderRef?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    budgetMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumProcurementStatusFieldUpdateOperationsInput | $Enums.ProcurementStatus
    awardRef?: NullableStringFieldUpdateOperationsInput | string | null
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcurementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    tenderRef?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    budgetMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumProcurementStatusFieldUpdateOperationsInput | $Enums.ProcurementStatus
    awardRef?: NullableStringFieldUpdateOperationsInput | string | null
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcurementCreateManyInput = {
    id: string
    orgId: string
    tenderRef: string
    title: string
    budgetMinor: bigint | number
    currency: string
    status?: $Enums.ProcurementStatus
    awardRef?: string | null
    escrowIntentId?: string | null
    createdAt?: Date | string
  }

  export type ProcurementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    tenderRef?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    budgetMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumProcurementStatusFieldUpdateOperationsInput | $Enums.ProcurementStatus
    awardRef?: NullableStringFieldUpdateOperationsInput | string | null
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcurementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    tenderRef?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    budgetMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumProcurementStatusFieldUpdateOperationsInput | $Enums.ProcurementStatus
    awardRef?: NullableStringFieldUpdateOperationsInput | string | null
    escrowIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicRecordCreateInput = {
    id: string
    orgId: string
    programId?: string | null
    recordType: string
    subjectHash: string
    dataHash: string
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type PublicRecordUncheckedCreateInput = {
    id: string
    orgId: string
    programId?: string | null
    recordType: string
    subjectHash: string
    dataHash: string
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type PublicRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    programId?: NullableStringFieldUpdateOperationsInput | string | null
    recordType?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    programId?: NullableStringFieldUpdateOperationsInput | string | null
    recordType?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicRecordCreateManyInput = {
    id: string
    orgId: string
    programId?: string | null
    recordType: string
    subjectHash: string
    dataHash: string
    attestationId?: string | null
    createdAt?: Date | string
  }

  export type PublicRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    programId?: NullableStringFieldUpdateOperationsInput | string | null
    recordType?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    programId?: NullableStringFieldUpdateOperationsInput | string | null
    recordType?: StringFieldUpdateOperationsInput | string
    subjectHash?: StringFieldUpdateOperationsInput | string
    dataHash?: StringFieldUpdateOperationsInput | string
    attestationId?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type DisbursementListRelationFilter = {
    every?: DisbursementWhereInput
    some?: DisbursementWhereInput
    none?: DisbursementWhereInput
  }

  export type DisbursementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProgramCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    budgetMinor?: SortOrder
    currency?: SortOrder
    eligibility?: SortOrder
    createdAt?: SortOrder
  }

  export type ProgramAvgOrderByAggregateInput = {
    budgetMinor?: SortOrder
  }

  export type ProgramMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    budgetMinor?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
  }

  export type ProgramMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    name?: SortOrder
    budgetMinor?: SortOrder
    currency?: SortOrder
    createdAt?: SortOrder
  }

  export type ProgramSumOrderByAggregateInput = {
    budgetMinor?: SortOrder
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

  export type BeneficiaryOrgIdProgramIdExternalRefCompoundUniqueInput = {
    orgId: string
    programId: string
    externalRef: string
  }

  export type BeneficiaryCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    externalRef?: SortOrder
    kycStatus?: SortOrder
    createdAt?: SortOrder
  }

  export type BeneficiaryMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    externalRef?: SortOrder
    kycStatus?: SortOrder
    createdAt?: SortOrder
  }

  export type BeneficiaryMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    externalRef?: SortOrder
    kycStatus?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumDisbursementStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DisbursementStatus | EnumDisbursementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DisbursementStatus[] | ListEnumDisbursementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisbursementStatus[] | ListEnumDisbursementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDisbursementStatusFilter<$PrismaModel> | $Enums.DisbursementStatus
  }

  export type ProgramRelationFilter = {
    is?: ProgramWhereInput
    isNot?: ProgramWhereInput
  }

  export type DisbursementCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    beneficiaryId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    batchIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type DisbursementAvgOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type DisbursementMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    beneficiaryId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    batchIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type DisbursementMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    beneficiaryId?: SortOrder
    amountMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    batchIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type DisbursementSumOrderByAggregateInput = {
    amountMinor?: SortOrder
  }

  export type EnumDisbursementStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisbursementStatus | EnumDisbursementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DisbursementStatus[] | ListEnumDisbursementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisbursementStatus[] | ListEnumDisbursementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDisbursementStatusWithAggregatesFilter<$PrismaModel> | $Enums.DisbursementStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDisbursementStatusFilter<$PrismaModel>
    _max?: NestedEnumDisbursementStatusFilter<$PrismaModel>
  }

  export type EnumProcurementStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcurementStatus | EnumProcurementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProcurementStatus[] | ListEnumProcurementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcurementStatus[] | ListEnumProcurementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProcurementStatusFilter<$PrismaModel> | $Enums.ProcurementStatus
  }

  export type ProcurementCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    tenderRef?: SortOrder
    title?: SortOrder
    budgetMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    awardRef?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcurementAvgOrderByAggregateInput = {
    budgetMinor?: SortOrder
  }

  export type ProcurementMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    tenderRef?: SortOrder
    title?: SortOrder
    budgetMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    awardRef?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcurementMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    tenderRef?: SortOrder
    title?: SortOrder
    budgetMinor?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    awardRef?: SortOrder
    escrowIntentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcurementSumOrderByAggregateInput = {
    budgetMinor?: SortOrder
  }

  export type EnumProcurementStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcurementStatus | EnumProcurementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProcurementStatus[] | ListEnumProcurementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcurementStatus[] | ListEnumProcurementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProcurementStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProcurementStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProcurementStatusFilter<$PrismaModel>
    _max?: NestedEnumProcurementStatusFilter<$PrismaModel>
  }

  export type PublicRecordCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    recordType?: SortOrder
    subjectHash?: SortOrder
    dataHash?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type PublicRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    recordType?: SortOrder
    subjectHash?: SortOrder
    dataHash?: SortOrder
    attestationId?: SortOrder
    createdAt?: SortOrder
  }

  export type PublicRecordMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    recordType?: SortOrder
    subjectHash?: SortOrder
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

  export type DisbursementCreateNestedManyWithoutProgramInput = {
    create?: XOR<DisbursementCreateWithoutProgramInput, DisbursementUncheckedCreateWithoutProgramInput> | DisbursementCreateWithoutProgramInput[] | DisbursementUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: DisbursementCreateOrConnectWithoutProgramInput | DisbursementCreateOrConnectWithoutProgramInput[]
    createMany?: DisbursementCreateManyProgramInputEnvelope
    connect?: DisbursementWhereUniqueInput | DisbursementWhereUniqueInput[]
  }

  export type DisbursementUncheckedCreateNestedManyWithoutProgramInput = {
    create?: XOR<DisbursementCreateWithoutProgramInput, DisbursementUncheckedCreateWithoutProgramInput> | DisbursementCreateWithoutProgramInput[] | DisbursementUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: DisbursementCreateOrConnectWithoutProgramInput | DisbursementCreateOrConnectWithoutProgramInput[]
    createMany?: DisbursementCreateManyProgramInputEnvelope
    connect?: DisbursementWhereUniqueInput | DisbursementWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type DisbursementUpdateManyWithoutProgramNestedInput = {
    create?: XOR<DisbursementCreateWithoutProgramInput, DisbursementUncheckedCreateWithoutProgramInput> | DisbursementCreateWithoutProgramInput[] | DisbursementUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: DisbursementCreateOrConnectWithoutProgramInput | DisbursementCreateOrConnectWithoutProgramInput[]
    upsert?: DisbursementUpsertWithWhereUniqueWithoutProgramInput | DisbursementUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: DisbursementCreateManyProgramInputEnvelope
    set?: DisbursementWhereUniqueInput | DisbursementWhereUniqueInput[]
    disconnect?: DisbursementWhereUniqueInput | DisbursementWhereUniqueInput[]
    delete?: DisbursementWhereUniqueInput | DisbursementWhereUniqueInput[]
    connect?: DisbursementWhereUniqueInput | DisbursementWhereUniqueInput[]
    update?: DisbursementUpdateWithWhereUniqueWithoutProgramInput | DisbursementUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: DisbursementUpdateManyWithWhereWithoutProgramInput | DisbursementUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: DisbursementScalarWhereInput | DisbursementScalarWhereInput[]
  }

  export type DisbursementUncheckedUpdateManyWithoutProgramNestedInput = {
    create?: XOR<DisbursementCreateWithoutProgramInput, DisbursementUncheckedCreateWithoutProgramInput> | DisbursementCreateWithoutProgramInput[] | DisbursementUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: DisbursementCreateOrConnectWithoutProgramInput | DisbursementCreateOrConnectWithoutProgramInput[]
    upsert?: DisbursementUpsertWithWhereUniqueWithoutProgramInput | DisbursementUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: DisbursementCreateManyProgramInputEnvelope
    set?: DisbursementWhereUniqueInput | DisbursementWhereUniqueInput[]
    disconnect?: DisbursementWhereUniqueInput | DisbursementWhereUniqueInput[]
    delete?: DisbursementWhereUniqueInput | DisbursementWhereUniqueInput[]
    connect?: DisbursementWhereUniqueInput | DisbursementWhereUniqueInput[]
    update?: DisbursementUpdateWithWhereUniqueWithoutProgramInput | DisbursementUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: DisbursementUpdateManyWithWhereWithoutProgramInput | DisbursementUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: DisbursementScalarWhereInput | DisbursementScalarWhereInput[]
  }

  export type ProgramCreateNestedOneWithoutDisbursementsInput = {
    create?: XOR<ProgramCreateWithoutDisbursementsInput, ProgramUncheckedCreateWithoutDisbursementsInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutDisbursementsInput
    connect?: ProgramWhereUniqueInput
  }

  export type EnumDisbursementStatusFieldUpdateOperationsInput = {
    set?: $Enums.DisbursementStatus
  }

  export type ProgramUpdateOneRequiredWithoutDisbursementsNestedInput = {
    create?: XOR<ProgramCreateWithoutDisbursementsInput, ProgramUncheckedCreateWithoutDisbursementsInput>
    connectOrCreate?: ProgramCreateOrConnectWithoutDisbursementsInput
    upsert?: ProgramUpsertWithoutDisbursementsInput
    connect?: ProgramWhereUniqueInput
    update?: XOR<XOR<ProgramUpdateToOneWithWhereWithoutDisbursementsInput, ProgramUpdateWithoutDisbursementsInput>, ProgramUncheckedUpdateWithoutDisbursementsInput>
  }

  export type EnumProcurementStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProcurementStatus
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

  export type NestedEnumDisbursementStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DisbursementStatus | EnumDisbursementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DisbursementStatus[] | ListEnumDisbursementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisbursementStatus[] | ListEnumDisbursementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDisbursementStatusFilter<$PrismaModel> | $Enums.DisbursementStatus
  }

  export type NestedEnumDisbursementStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisbursementStatus | EnumDisbursementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DisbursementStatus[] | ListEnumDisbursementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisbursementStatus[] | ListEnumDisbursementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDisbursementStatusWithAggregatesFilter<$PrismaModel> | $Enums.DisbursementStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDisbursementStatusFilter<$PrismaModel>
    _max?: NestedEnumDisbursementStatusFilter<$PrismaModel>
  }

  export type NestedEnumProcurementStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcurementStatus | EnumProcurementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProcurementStatus[] | ListEnumProcurementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcurementStatus[] | ListEnumProcurementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProcurementStatusFilter<$PrismaModel> | $Enums.ProcurementStatus
  }

  export type NestedEnumProcurementStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcurementStatus | EnumProcurementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProcurementStatus[] | ListEnumProcurementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcurementStatus[] | ListEnumProcurementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProcurementStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProcurementStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProcurementStatusFilter<$PrismaModel>
    _max?: NestedEnumProcurementStatusFilter<$PrismaModel>
  }

  export type DisbursementCreateWithoutProgramInput = {
    id: string
    orgId: string
    beneficiaryId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.DisbursementStatus
    batchIntentId?: string | null
    createdAt?: Date | string
  }

  export type DisbursementUncheckedCreateWithoutProgramInput = {
    id: string
    orgId: string
    beneficiaryId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.DisbursementStatus
    batchIntentId?: string | null
    createdAt?: Date | string
  }

  export type DisbursementCreateOrConnectWithoutProgramInput = {
    where: DisbursementWhereUniqueInput
    create: XOR<DisbursementCreateWithoutProgramInput, DisbursementUncheckedCreateWithoutProgramInput>
  }

  export type DisbursementCreateManyProgramInputEnvelope = {
    data: DisbursementCreateManyProgramInput | DisbursementCreateManyProgramInput[]
    skipDuplicates?: boolean
  }

  export type DisbursementUpsertWithWhereUniqueWithoutProgramInput = {
    where: DisbursementWhereUniqueInput
    update: XOR<DisbursementUpdateWithoutProgramInput, DisbursementUncheckedUpdateWithoutProgramInput>
    create: XOR<DisbursementCreateWithoutProgramInput, DisbursementUncheckedCreateWithoutProgramInput>
  }

  export type DisbursementUpdateWithWhereUniqueWithoutProgramInput = {
    where: DisbursementWhereUniqueInput
    data: XOR<DisbursementUpdateWithoutProgramInput, DisbursementUncheckedUpdateWithoutProgramInput>
  }

  export type DisbursementUpdateManyWithWhereWithoutProgramInput = {
    where: DisbursementScalarWhereInput
    data: XOR<DisbursementUpdateManyMutationInput, DisbursementUncheckedUpdateManyWithoutProgramInput>
  }

  export type DisbursementScalarWhereInput = {
    AND?: DisbursementScalarWhereInput | DisbursementScalarWhereInput[]
    OR?: DisbursementScalarWhereInput[]
    NOT?: DisbursementScalarWhereInput | DisbursementScalarWhereInput[]
    id?: StringFilter<"Disbursement"> | string
    orgId?: StringFilter<"Disbursement"> | string
    programId?: StringFilter<"Disbursement"> | string
    beneficiaryId?: StringFilter<"Disbursement"> | string
    amountMinor?: BigIntFilter<"Disbursement"> | bigint | number
    currency?: StringFilter<"Disbursement"> | string
    status?: EnumDisbursementStatusFilter<"Disbursement"> | $Enums.DisbursementStatus
    batchIntentId?: StringNullableFilter<"Disbursement"> | string | null
    createdAt?: DateTimeFilter<"Disbursement"> | Date | string
  }

  export type ProgramCreateWithoutDisbursementsInput = {
    id: string
    orgId: string
    name: string
    budgetMinor: bigint | number
    currency: string
    eligibility?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ProgramUncheckedCreateWithoutDisbursementsInput = {
    id: string
    orgId: string
    name: string
    budgetMinor: bigint | number
    currency: string
    eligibility?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ProgramCreateOrConnectWithoutDisbursementsInput = {
    where: ProgramWhereUniqueInput
    create: XOR<ProgramCreateWithoutDisbursementsInput, ProgramUncheckedCreateWithoutDisbursementsInput>
  }

  export type ProgramUpsertWithoutDisbursementsInput = {
    update: XOR<ProgramUpdateWithoutDisbursementsInput, ProgramUncheckedUpdateWithoutDisbursementsInput>
    create: XOR<ProgramCreateWithoutDisbursementsInput, ProgramUncheckedCreateWithoutDisbursementsInput>
    where?: ProgramWhereInput
  }

  export type ProgramUpdateToOneWithWhereWithoutDisbursementsInput = {
    where?: ProgramWhereInput
    data: XOR<ProgramUpdateWithoutDisbursementsInput, ProgramUncheckedUpdateWithoutDisbursementsInput>
  }

  export type ProgramUpdateWithoutDisbursementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    budgetMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    eligibility?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramUncheckedUpdateWithoutDisbursementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    budgetMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    eligibility?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisbursementCreateManyProgramInput = {
    id: string
    orgId: string
    beneficiaryId: string
    amountMinor: bigint | number
    currency: string
    status?: $Enums.DisbursementStatus
    batchIntentId?: string | null
    createdAt?: Date | string
  }

  export type DisbursementUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    beneficiaryId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumDisbursementStatusFieldUpdateOperationsInput | $Enums.DisbursementStatus
    batchIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisbursementUncheckedUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    beneficiaryId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumDisbursementStatusFieldUpdateOperationsInput | $Enums.DisbursementStatus
    batchIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisbursementUncheckedUpdateManyWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    beneficiaryId?: StringFieldUpdateOperationsInput | string
    amountMinor?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumDisbursementStatusFieldUpdateOperationsInput | $Enums.DisbursementStatus
    batchIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ProgramCountOutputTypeDefaultArgs instead
     */
    export type ProgramCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProgramCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EventOutboxDefaultArgs instead
     */
    export type EventOutboxArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EventOutboxDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProgramDefaultArgs instead
     */
    export type ProgramArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProgramDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BeneficiaryDefaultArgs instead
     */
    export type BeneficiaryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BeneficiaryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DisbursementDefaultArgs instead
     */
    export type DisbursementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DisbursementDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProcurementDefaultArgs instead
     */
    export type ProcurementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProcurementDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PublicRecordDefaultArgs instead
     */
    export type PublicRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PublicRecordDefaultArgs<ExtArgs>

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