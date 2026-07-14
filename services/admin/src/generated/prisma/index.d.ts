
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
 * Model PlatformSettings
 * 
 */
export type PlatformSettings = $Result.DefaultSelection<Prisma.$PlatformSettingsPayload>
/**
 * Model AdminMember
 * 
 */
export type AdminMember = $Result.DefaultSelection<Prisma.$AdminMemberPayload>
/**
 * Model RbacRole
 * 
 */
export type RbacRole = $Result.DefaultSelection<Prisma.$RbacRolePayload>
/**
 * Model FeatureFlag
 * 
 */
export type FeatureFlag = $Result.DefaultSelection<Prisma.$FeatureFlagPayload>
/**
 * Model VerificationRequirement
 * 
 */
export type VerificationRequirement = $Result.DefaultSelection<Prisma.$VerificationRequirementPayload>
/**
 * Model AuditEntry
 * 
 */
export type AuditEntry = $Result.DefaultSelection<Prisma.$AuditEntryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RoleTone: {
  BRAND: 'BRAND',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  DANGER: 'DANGER'
};

export type RoleTone = (typeof RoleTone)[keyof typeof RoleTone]


export const VerificationCategory: {
  KYB: 'KYB',
  KYC: 'KYC'
};

export type VerificationCategory = (typeof VerificationCategory)[keyof typeof VerificationCategory]


export const RequirementInputType: {
  DOCUMENT: 'DOCUMENT',
  INFORMATION: 'INFORMATION'
};

export type RequirementInputType = (typeof RequirementInputType)[keyof typeof RequirementInputType]


export const AuditTone: {
  BRAND: 'BRAND',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  DANGER: 'DANGER',
  NEUTRAL: 'NEUTRAL'
};

export type AuditTone = (typeof AuditTone)[keyof typeof AuditTone]

}

export type RoleTone = $Enums.RoleTone

export const RoleTone: typeof $Enums.RoleTone

export type VerificationCategory = $Enums.VerificationCategory

export const VerificationCategory: typeof $Enums.VerificationCategory

export type RequirementInputType = $Enums.RequirementInputType

export const RequirementInputType: typeof $Enums.RequirementInputType

export type AuditTone = $Enums.AuditTone

export const AuditTone: typeof $Enums.AuditTone

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PlatformSettings
 * const platformSettings = await prisma.platformSettings.findMany()
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
   * // Fetch zero or more PlatformSettings
   * const platformSettings = await prisma.platformSettings.findMany()
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
   * `prisma.platformSettings`: Exposes CRUD operations for the **PlatformSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlatformSettings
    * const platformSettings = await prisma.platformSettings.findMany()
    * ```
    */
  get platformSettings(): Prisma.PlatformSettingsDelegate<ExtArgs>;

  /**
   * `prisma.adminMember`: Exposes CRUD operations for the **AdminMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminMembers
    * const adminMembers = await prisma.adminMember.findMany()
    * ```
    */
  get adminMember(): Prisma.AdminMemberDelegate<ExtArgs>;

  /**
   * `prisma.rbacRole`: Exposes CRUD operations for the **RbacRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RbacRoles
    * const rbacRoles = await prisma.rbacRole.findMany()
    * ```
    */
  get rbacRole(): Prisma.RbacRoleDelegate<ExtArgs>;

  /**
   * `prisma.featureFlag`: Exposes CRUD operations for the **FeatureFlag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FeatureFlags
    * const featureFlags = await prisma.featureFlag.findMany()
    * ```
    */
  get featureFlag(): Prisma.FeatureFlagDelegate<ExtArgs>;

  /**
   * `prisma.verificationRequirement`: Exposes CRUD operations for the **VerificationRequirement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationRequirements
    * const verificationRequirements = await prisma.verificationRequirement.findMany()
    * ```
    */
  get verificationRequirement(): Prisma.VerificationRequirementDelegate<ExtArgs>;

  /**
   * `prisma.auditEntry`: Exposes CRUD operations for the **AuditEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditEntries
    * const auditEntries = await prisma.auditEntry.findMany()
    * ```
    */
  get auditEntry(): Prisma.AuditEntryDelegate<ExtArgs>;
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
    PlatformSettings: 'PlatformSettings',
    AdminMember: 'AdminMember',
    RbacRole: 'RbacRole',
    FeatureFlag: 'FeatureFlag',
    VerificationRequirement: 'VerificationRequirement',
    AuditEntry: 'AuditEntry'
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
      modelProps: "platformSettings" | "adminMember" | "rbacRole" | "featureFlag" | "verificationRequirement" | "auditEntry"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      PlatformSettings: {
        payload: Prisma.$PlatformSettingsPayload<ExtArgs>
        fields: Prisma.PlatformSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlatformSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlatformSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformSettingsPayload>
          }
          findFirst: {
            args: Prisma.PlatformSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlatformSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformSettingsPayload>
          }
          findMany: {
            args: Prisma.PlatformSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformSettingsPayload>[]
          }
          create: {
            args: Prisma.PlatformSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformSettingsPayload>
          }
          createMany: {
            args: Prisma.PlatformSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlatformSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformSettingsPayload>[]
          }
          delete: {
            args: Prisma.PlatformSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformSettingsPayload>
          }
          update: {
            args: Prisma.PlatformSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformSettingsPayload>
          }
          deleteMany: {
            args: Prisma.PlatformSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlatformSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlatformSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformSettingsPayload>
          }
          aggregate: {
            args: Prisma.PlatformSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlatformSettings>
          }
          groupBy: {
            args: Prisma.PlatformSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlatformSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlatformSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<PlatformSettingsCountAggregateOutputType> | number
          }
        }
      }
      AdminMember: {
        payload: Prisma.$AdminMemberPayload<ExtArgs>
        fields: Prisma.AdminMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminMemberPayload>
          }
          findFirst: {
            args: Prisma.AdminMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminMemberPayload>
          }
          findMany: {
            args: Prisma.AdminMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminMemberPayload>[]
          }
          create: {
            args: Prisma.AdminMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminMemberPayload>
          }
          createMany: {
            args: Prisma.AdminMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminMemberPayload>[]
          }
          delete: {
            args: Prisma.AdminMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminMemberPayload>
          }
          update: {
            args: Prisma.AdminMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminMemberPayload>
          }
          deleteMany: {
            args: Prisma.AdminMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminMemberPayload>
          }
          aggregate: {
            args: Prisma.AdminMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminMember>
          }
          groupBy: {
            args: Prisma.AdminMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminMemberCountArgs<ExtArgs>
            result: $Utils.Optional<AdminMemberCountAggregateOutputType> | number
          }
        }
      }
      RbacRole: {
        payload: Prisma.$RbacRolePayload<ExtArgs>
        fields: Prisma.RbacRoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RbacRoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RbacRolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RbacRoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RbacRolePayload>
          }
          findFirst: {
            args: Prisma.RbacRoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RbacRolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RbacRoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RbacRolePayload>
          }
          findMany: {
            args: Prisma.RbacRoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RbacRolePayload>[]
          }
          create: {
            args: Prisma.RbacRoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RbacRolePayload>
          }
          createMany: {
            args: Prisma.RbacRoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RbacRoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RbacRolePayload>[]
          }
          delete: {
            args: Prisma.RbacRoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RbacRolePayload>
          }
          update: {
            args: Prisma.RbacRoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RbacRolePayload>
          }
          deleteMany: {
            args: Prisma.RbacRoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RbacRoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RbacRoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RbacRolePayload>
          }
          aggregate: {
            args: Prisma.RbacRoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRbacRole>
          }
          groupBy: {
            args: Prisma.RbacRoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RbacRoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RbacRoleCountArgs<ExtArgs>
            result: $Utils.Optional<RbacRoleCountAggregateOutputType> | number
          }
        }
      }
      FeatureFlag: {
        payload: Prisma.$FeatureFlagPayload<ExtArgs>
        fields: Prisma.FeatureFlagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeatureFlagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeatureFlagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          findFirst: {
            args: Prisma.FeatureFlagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeatureFlagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          findMany: {
            args: Prisma.FeatureFlagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>[]
          }
          create: {
            args: Prisma.FeatureFlagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          createMany: {
            args: Prisma.FeatureFlagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeatureFlagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>[]
          }
          delete: {
            args: Prisma.FeatureFlagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          update: {
            args: Prisma.FeatureFlagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          deleteMany: {
            args: Prisma.FeatureFlagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeatureFlagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FeatureFlagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          aggregate: {
            args: Prisma.FeatureFlagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeatureFlag>
          }
          groupBy: {
            args: Prisma.FeatureFlagGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeatureFlagGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeatureFlagCountArgs<ExtArgs>
            result: $Utils.Optional<FeatureFlagCountAggregateOutputType> | number
          }
        }
      }
      VerificationRequirement: {
        payload: Prisma.$VerificationRequirementPayload<ExtArgs>
        fields: Prisma.VerificationRequirementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationRequirementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationRequirementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationRequirementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationRequirementPayload>
          }
          findFirst: {
            args: Prisma.VerificationRequirementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationRequirementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationRequirementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationRequirementPayload>
          }
          findMany: {
            args: Prisma.VerificationRequirementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationRequirementPayload>[]
          }
          create: {
            args: Prisma.VerificationRequirementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationRequirementPayload>
          }
          createMany: {
            args: Prisma.VerificationRequirementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationRequirementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationRequirementPayload>[]
          }
          delete: {
            args: Prisma.VerificationRequirementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationRequirementPayload>
          }
          update: {
            args: Prisma.VerificationRequirementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationRequirementPayload>
          }
          deleteMany: {
            args: Prisma.VerificationRequirementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationRequirementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VerificationRequirementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationRequirementPayload>
          }
          aggregate: {
            args: Prisma.VerificationRequirementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationRequirement>
          }
          groupBy: {
            args: Prisma.VerificationRequirementGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationRequirementGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationRequirementCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationRequirementCountAggregateOutputType> | number
          }
        }
      }
      AuditEntry: {
        payload: Prisma.$AuditEntryPayload<ExtArgs>
        fields: Prisma.AuditEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>
          }
          findFirst: {
            args: Prisma.AuditEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>
          }
          findMany: {
            args: Prisma.AuditEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>[]
          }
          create: {
            args: Prisma.AuditEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>
          }
          createMany: {
            args: Prisma.AuditEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>[]
          }
          delete: {
            args: Prisma.AuditEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>
          }
          update: {
            args: Prisma.AuditEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>
          }
          deleteMany: {
            args: Prisma.AuditEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEntryPayload>
          }
          aggregate: {
            args: Prisma.AuditEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditEntry>
          }
          groupBy: {
            args: Prisma.AuditEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditEntryCountArgs<ExtArgs>
            result: $Utils.Optional<AuditEntryCountAggregateOutputType> | number
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
   * Model PlatformSettings
   */

  export type AggregatePlatformSettings = {
    _count: PlatformSettingsCountAggregateOutputType | null
    _min: PlatformSettingsMinAggregateOutputType | null
    _max: PlatformSettingsMaxAggregateOutputType | null
  }

  export type PlatformSettingsMinAggregateOutputType = {
    id: string | null
    orgName: string | null
    supportEmail: string | null
    region: string | null
    enforceMfa: boolean | null
    ipAllowlist: boolean | null
    ssoEnabled: boolean | null
    sessionTimeout: boolean | null
    notifyRisk: boolean | null
    notifySettlements: boolean | null
    notifyDigest: boolean | null
    updatedAt: Date | null
  }

  export type PlatformSettingsMaxAggregateOutputType = {
    id: string | null
    orgName: string | null
    supportEmail: string | null
    region: string | null
    enforceMfa: boolean | null
    ipAllowlist: boolean | null
    ssoEnabled: boolean | null
    sessionTimeout: boolean | null
    notifyRisk: boolean | null
    notifySettlements: boolean | null
    notifyDigest: boolean | null
    updatedAt: Date | null
  }

  export type PlatformSettingsCountAggregateOutputType = {
    id: number
    orgName: number
    supportEmail: number
    region: number
    enforceMfa: number
    ipAllowlist: number
    ssoEnabled: number
    sessionTimeout: number
    notifyRisk: number
    notifySettlements: number
    notifyDigest: number
    updatedAt: number
    _all: number
  }


  export type PlatformSettingsMinAggregateInputType = {
    id?: true
    orgName?: true
    supportEmail?: true
    region?: true
    enforceMfa?: true
    ipAllowlist?: true
    ssoEnabled?: true
    sessionTimeout?: true
    notifyRisk?: true
    notifySettlements?: true
    notifyDigest?: true
    updatedAt?: true
  }

  export type PlatformSettingsMaxAggregateInputType = {
    id?: true
    orgName?: true
    supportEmail?: true
    region?: true
    enforceMfa?: true
    ipAllowlist?: true
    ssoEnabled?: true
    sessionTimeout?: true
    notifyRisk?: true
    notifySettlements?: true
    notifyDigest?: true
    updatedAt?: true
  }

  export type PlatformSettingsCountAggregateInputType = {
    id?: true
    orgName?: true
    supportEmail?: true
    region?: true
    enforceMfa?: true
    ipAllowlist?: true
    ssoEnabled?: true
    sessionTimeout?: true
    notifyRisk?: true
    notifySettlements?: true
    notifyDigest?: true
    updatedAt?: true
    _all?: true
  }

  export type PlatformSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformSettings to aggregate.
     */
    where?: PlatformSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformSettings to fetch.
     */
    orderBy?: PlatformSettingsOrderByWithRelationInput | PlatformSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlatformSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlatformSettings
    **/
    _count?: true | PlatformSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlatformSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlatformSettingsMaxAggregateInputType
  }

  export type GetPlatformSettingsAggregateType<T extends PlatformSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregatePlatformSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlatformSettings[P]>
      : GetScalarType<T[P], AggregatePlatformSettings[P]>
  }




  export type PlatformSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatformSettingsWhereInput
    orderBy?: PlatformSettingsOrderByWithAggregationInput | PlatformSettingsOrderByWithAggregationInput[]
    by: PlatformSettingsScalarFieldEnum[] | PlatformSettingsScalarFieldEnum
    having?: PlatformSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlatformSettingsCountAggregateInputType | true
    _min?: PlatformSettingsMinAggregateInputType
    _max?: PlatformSettingsMaxAggregateInputType
  }

  export type PlatformSettingsGroupByOutputType = {
    id: string
    orgName: string
    supportEmail: string
    region: string
    enforceMfa: boolean
    ipAllowlist: boolean
    ssoEnabled: boolean
    sessionTimeout: boolean
    notifyRisk: boolean
    notifySettlements: boolean
    notifyDigest: boolean
    updatedAt: Date
    _count: PlatformSettingsCountAggregateOutputType | null
    _min: PlatformSettingsMinAggregateOutputType | null
    _max: PlatformSettingsMaxAggregateOutputType | null
  }

  type GetPlatformSettingsGroupByPayload<T extends PlatformSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlatformSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlatformSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlatformSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], PlatformSettingsGroupByOutputType[P]>
        }
      >
    >


  export type PlatformSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgName?: boolean
    supportEmail?: boolean
    region?: boolean
    enforceMfa?: boolean
    ipAllowlist?: boolean
    ssoEnabled?: boolean
    sessionTimeout?: boolean
    notifyRisk?: boolean
    notifySettlements?: boolean
    notifyDigest?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["platformSettings"]>

  export type PlatformSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgName?: boolean
    supportEmail?: boolean
    region?: boolean
    enforceMfa?: boolean
    ipAllowlist?: boolean
    ssoEnabled?: boolean
    sessionTimeout?: boolean
    notifyRisk?: boolean
    notifySettlements?: boolean
    notifyDigest?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["platformSettings"]>

  export type PlatformSettingsSelectScalar = {
    id?: boolean
    orgName?: boolean
    supportEmail?: boolean
    region?: boolean
    enforceMfa?: boolean
    ipAllowlist?: boolean
    ssoEnabled?: boolean
    sessionTimeout?: boolean
    notifyRisk?: boolean
    notifySettlements?: boolean
    notifyDigest?: boolean
    updatedAt?: boolean
  }


  export type $PlatformSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlatformSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgName: string
      supportEmail: string
      region: string
      enforceMfa: boolean
      ipAllowlist: boolean
      ssoEnabled: boolean
      sessionTimeout: boolean
      notifyRisk: boolean
      notifySettlements: boolean
      notifyDigest: boolean
      updatedAt: Date
    }, ExtArgs["result"]["platformSettings"]>
    composites: {}
  }

  type PlatformSettingsGetPayload<S extends boolean | null | undefined | PlatformSettingsDefaultArgs> = $Result.GetResult<Prisma.$PlatformSettingsPayload, S>

  type PlatformSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PlatformSettingsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PlatformSettingsCountAggregateInputType | true
    }

  export interface PlatformSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlatformSettings'], meta: { name: 'PlatformSettings' } }
    /**
     * Find zero or one PlatformSettings that matches the filter.
     * @param {PlatformSettingsFindUniqueArgs} args - Arguments to find a PlatformSettings
     * @example
     * // Get one PlatformSettings
     * const platformSettings = await prisma.platformSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlatformSettingsFindUniqueArgs>(args: SelectSubset<T, PlatformSettingsFindUniqueArgs<ExtArgs>>): Prisma__PlatformSettingsClient<$Result.GetResult<Prisma.$PlatformSettingsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PlatformSettings that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PlatformSettingsFindUniqueOrThrowArgs} args - Arguments to find a PlatformSettings
     * @example
     * // Get one PlatformSettings
     * const platformSettings = await prisma.platformSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlatformSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, PlatformSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlatformSettingsClient<$Result.GetResult<Prisma.$PlatformSettingsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PlatformSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformSettingsFindFirstArgs} args - Arguments to find a PlatformSettings
     * @example
     * // Get one PlatformSettings
     * const platformSettings = await prisma.platformSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlatformSettingsFindFirstArgs>(args?: SelectSubset<T, PlatformSettingsFindFirstArgs<ExtArgs>>): Prisma__PlatformSettingsClient<$Result.GetResult<Prisma.$PlatformSettingsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PlatformSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformSettingsFindFirstOrThrowArgs} args - Arguments to find a PlatformSettings
     * @example
     * // Get one PlatformSettings
     * const platformSettings = await prisma.platformSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlatformSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, PlatformSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlatformSettingsClient<$Result.GetResult<Prisma.$PlatformSettingsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PlatformSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlatformSettings
     * const platformSettings = await prisma.platformSettings.findMany()
     * 
     * // Get first 10 PlatformSettings
     * const platformSettings = await prisma.platformSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const platformSettingsWithIdOnly = await prisma.platformSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlatformSettingsFindManyArgs>(args?: SelectSubset<T, PlatformSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformSettingsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PlatformSettings.
     * @param {PlatformSettingsCreateArgs} args - Arguments to create a PlatformSettings.
     * @example
     * // Create one PlatformSettings
     * const PlatformSettings = await prisma.platformSettings.create({
     *   data: {
     *     // ... data to create a PlatformSettings
     *   }
     * })
     * 
     */
    create<T extends PlatformSettingsCreateArgs>(args: SelectSubset<T, PlatformSettingsCreateArgs<ExtArgs>>): Prisma__PlatformSettingsClient<$Result.GetResult<Prisma.$PlatformSettingsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PlatformSettings.
     * @param {PlatformSettingsCreateManyArgs} args - Arguments to create many PlatformSettings.
     * @example
     * // Create many PlatformSettings
     * const platformSettings = await prisma.platformSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlatformSettingsCreateManyArgs>(args?: SelectSubset<T, PlatformSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlatformSettings and returns the data saved in the database.
     * @param {PlatformSettingsCreateManyAndReturnArgs} args - Arguments to create many PlatformSettings.
     * @example
     * // Create many PlatformSettings
     * const platformSettings = await prisma.platformSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlatformSettings and only return the `id`
     * const platformSettingsWithIdOnly = await prisma.platformSettings.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlatformSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, PlatformSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformSettingsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PlatformSettings.
     * @param {PlatformSettingsDeleteArgs} args - Arguments to delete one PlatformSettings.
     * @example
     * // Delete one PlatformSettings
     * const PlatformSettings = await prisma.platformSettings.delete({
     *   where: {
     *     // ... filter to delete one PlatformSettings
     *   }
     * })
     * 
     */
    delete<T extends PlatformSettingsDeleteArgs>(args: SelectSubset<T, PlatformSettingsDeleteArgs<ExtArgs>>): Prisma__PlatformSettingsClient<$Result.GetResult<Prisma.$PlatformSettingsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PlatformSettings.
     * @param {PlatformSettingsUpdateArgs} args - Arguments to update one PlatformSettings.
     * @example
     * // Update one PlatformSettings
     * const platformSettings = await prisma.platformSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlatformSettingsUpdateArgs>(args: SelectSubset<T, PlatformSettingsUpdateArgs<ExtArgs>>): Prisma__PlatformSettingsClient<$Result.GetResult<Prisma.$PlatformSettingsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PlatformSettings.
     * @param {PlatformSettingsDeleteManyArgs} args - Arguments to filter PlatformSettings to delete.
     * @example
     * // Delete a few PlatformSettings
     * const { count } = await prisma.platformSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlatformSettingsDeleteManyArgs>(args?: SelectSubset<T, PlatformSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlatformSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlatformSettings
     * const platformSettings = await prisma.platformSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlatformSettingsUpdateManyArgs>(args: SelectSubset<T, PlatformSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PlatformSettings.
     * @param {PlatformSettingsUpsertArgs} args - Arguments to update or create a PlatformSettings.
     * @example
     * // Update or create a PlatformSettings
     * const platformSettings = await prisma.platformSettings.upsert({
     *   create: {
     *     // ... data to create a PlatformSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlatformSettings we want to update
     *   }
     * })
     */
    upsert<T extends PlatformSettingsUpsertArgs>(args: SelectSubset<T, PlatformSettingsUpsertArgs<ExtArgs>>): Prisma__PlatformSettingsClient<$Result.GetResult<Prisma.$PlatformSettingsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PlatformSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformSettingsCountArgs} args - Arguments to filter PlatformSettings to count.
     * @example
     * // Count the number of PlatformSettings
     * const count = await prisma.platformSettings.count({
     *   where: {
     *     // ... the filter for the PlatformSettings we want to count
     *   }
     * })
    **/
    count<T extends PlatformSettingsCountArgs>(
      args?: Subset<T, PlatformSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlatformSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlatformSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PlatformSettingsAggregateArgs>(args: Subset<T, PlatformSettingsAggregateArgs>): Prisma.PrismaPromise<GetPlatformSettingsAggregateType<T>>

    /**
     * Group by PlatformSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformSettingsGroupByArgs} args - Group by arguments.
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
      T extends PlatformSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlatformSettingsGroupByArgs['orderBy'] }
        : { orderBy?: PlatformSettingsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PlatformSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatformSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlatformSettings model
   */
  readonly fields: PlatformSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlatformSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlatformSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PlatformSettings model
   */ 
  interface PlatformSettingsFieldRefs {
    readonly id: FieldRef<"PlatformSettings", 'String'>
    readonly orgName: FieldRef<"PlatformSettings", 'String'>
    readonly supportEmail: FieldRef<"PlatformSettings", 'String'>
    readonly region: FieldRef<"PlatformSettings", 'String'>
    readonly enforceMfa: FieldRef<"PlatformSettings", 'Boolean'>
    readonly ipAllowlist: FieldRef<"PlatformSettings", 'Boolean'>
    readonly ssoEnabled: FieldRef<"PlatformSettings", 'Boolean'>
    readonly sessionTimeout: FieldRef<"PlatformSettings", 'Boolean'>
    readonly notifyRisk: FieldRef<"PlatformSettings", 'Boolean'>
    readonly notifySettlements: FieldRef<"PlatformSettings", 'Boolean'>
    readonly notifyDigest: FieldRef<"PlatformSettings", 'Boolean'>
    readonly updatedAt: FieldRef<"PlatformSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlatformSettings findUnique
   */
  export type PlatformSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformSettings
     */
    select?: PlatformSettingsSelect<ExtArgs> | null
    /**
     * Filter, which PlatformSettings to fetch.
     */
    where: PlatformSettingsWhereUniqueInput
  }

  /**
   * PlatformSettings findUniqueOrThrow
   */
  export type PlatformSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformSettings
     */
    select?: PlatformSettingsSelect<ExtArgs> | null
    /**
     * Filter, which PlatformSettings to fetch.
     */
    where: PlatformSettingsWhereUniqueInput
  }

  /**
   * PlatformSettings findFirst
   */
  export type PlatformSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformSettings
     */
    select?: PlatformSettingsSelect<ExtArgs> | null
    /**
     * Filter, which PlatformSettings to fetch.
     */
    where?: PlatformSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformSettings to fetch.
     */
    orderBy?: PlatformSettingsOrderByWithRelationInput | PlatformSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformSettings.
     */
    cursor?: PlatformSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformSettings.
     */
    distinct?: PlatformSettingsScalarFieldEnum | PlatformSettingsScalarFieldEnum[]
  }

  /**
   * PlatformSettings findFirstOrThrow
   */
  export type PlatformSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformSettings
     */
    select?: PlatformSettingsSelect<ExtArgs> | null
    /**
     * Filter, which PlatformSettings to fetch.
     */
    where?: PlatformSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformSettings to fetch.
     */
    orderBy?: PlatformSettingsOrderByWithRelationInput | PlatformSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformSettings.
     */
    cursor?: PlatformSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformSettings.
     */
    distinct?: PlatformSettingsScalarFieldEnum | PlatformSettingsScalarFieldEnum[]
  }

  /**
   * PlatformSettings findMany
   */
  export type PlatformSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformSettings
     */
    select?: PlatformSettingsSelect<ExtArgs> | null
    /**
     * Filter, which PlatformSettings to fetch.
     */
    where?: PlatformSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformSettings to fetch.
     */
    orderBy?: PlatformSettingsOrderByWithRelationInput | PlatformSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlatformSettings.
     */
    cursor?: PlatformSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformSettings.
     */
    skip?: number
    distinct?: PlatformSettingsScalarFieldEnum | PlatformSettingsScalarFieldEnum[]
  }

  /**
   * PlatformSettings create
   */
  export type PlatformSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformSettings
     */
    select?: PlatformSettingsSelect<ExtArgs> | null
    /**
     * The data needed to create a PlatformSettings.
     */
    data: XOR<PlatformSettingsCreateInput, PlatformSettingsUncheckedCreateInput>
  }

  /**
   * PlatformSettings createMany
   */
  export type PlatformSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlatformSettings.
     */
    data: PlatformSettingsCreateManyInput | PlatformSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlatformSettings createManyAndReturn
   */
  export type PlatformSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformSettings
     */
    select?: PlatformSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PlatformSettings.
     */
    data: PlatformSettingsCreateManyInput | PlatformSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PlatformSettings update
   */
  export type PlatformSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformSettings
     */
    select?: PlatformSettingsSelect<ExtArgs> | null
    /**
     * The data needed to update a PlatformSettings.
     */
    data: XOR<PlatformSettingsUpdateInput, PlatformSettingsUncheckedUpdateInput>
    /**
     * Choose, which PlatformSettings to update.
     */
    where: PlatformSettingsWhereUniqueInput
  }

  /**
   * PlatformSettings updateMany
   */
  export type PlatformSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlatformSettings.
     */
    data: XOR<PlatformSettingsUpdateManyMutationInput, PlatformSettingsUncheckedUpdateManyInput>
    /**
     * Filter which PlatformSettings to update
     */
    where?: PlatformSettingsWhereInput
  }

  /**
   * PlatformSettings upsert
   */
  export type PlatformSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformSettings
     */
    select?: PlatformSettingsSelect<ExtArgs> | null
    /**
     * The filter to search for the PlatformSettings to update in case it exists.
     */
    where: PlatformSettingsWhereUniqueInput
    /**
     * In case the PlatformSettings found by the `where` argument doesn't exist, create a new PlatformSettings with this data.
     */
    create: XOR<PlatformSettingsCreateInput, PlatformSettingsUncheckedCreateInput>
    /**
     * In case the PlatformSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlatformSettingsUpdateInput, PlatformSettingsUncheckedUpdateInput>
  }

  /**
   * PlatformSettings delete
   */
  export type PlatformSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformSettings
     */
    select?: PlatformSettingsSelect<ExtArgs> | null
    /**
     * Filter which PlatformSettings to delete.
     */
    where: PlatformSettingsWhereUniqueInput
  }

  /**
   * PlatformSettings deleteMany
   */
  export type PlatformSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformSettings to delete
     */
    where?: PlatformSettingsWhereInput
  }

  /**
   * PlatformSettings without action
   */
  export type PlatformSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformSettings
     */
    select?: PlatformSettingsSelect<ExtArgs> | null
  }


  /**
   * Model AdminMember
   */

  export type AggregateAdminMember = {
    _count: AdminMemberCountAggregateOutputType | null
    _min: AdminMemberMinAggregateOutputType | null
    _max: AdminMemberMaxAggregateOutputType | null
  }

  export type AdminMemberMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    roleName: string | null
    mfaEnabled: boolean | null
    lastActiveAt: Date | null
    createdAt: Date | null
  }

  export type AdminMemberMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    roleName: string | null
    mfaEnabled: boolean | null
    lastActiveAt: Date | null
    createdAt: Date | null
  }

  export type AdminMemberCountAggregateOutputType = {
    id: number
    name: number
    email: number
    roleName: number
    mfaEnabled: number
    lastActiveAt: number
    createdAt: number
    _all: number
  }


  export type AdminMemberMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    roleName?: true
    mfaEnabled?: true
    lastActiveAt?: true
    createdAt?: true
  }

  export type AdminMemberMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    roleName?: true
    mfaEnabled?: true
    lastActiveAt?: true
    createdAt?: true
  }

  export type AdminMemberCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    roleName?: true
    mfaEnabled?: true
    lastActiveAt?: true
    createdAt?: true
    _all?: true
  }

  export type AdminMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminMember to aggregate.
     */
    where?: AdminMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminMembers to fetch.
     */
    orderBy?: AdminMemberOrderByWithRelationInput | AdminMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminMembers
    **/
    _count?: true | AdminMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMemberMaxAggregateInputType
  }

  export type GetAdminMemberAggregateType<T extends AdminMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminMember[P]>
      : GetScalarType<T[P], AggregateAdminMember[P]>
  }




  export type AdminMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminMemberWhereInput
    orderBy?: AdminMemberOrderByWithAggregationInput | AdminMemberOrderByWithAggregationInput[]
    by: AdminMemberScalarFieldEnum[] | AdminMemberScalarFieldEnum
    having?: AdminMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminMemberCountAggregateInputType | true
    _min?: AdminMemberMinAggregateInputType
    _max?: AdminMemberMaxAggregateInputType
  }

  export type AdminMemberGroupByOutputType = {
    id: string
    name: string
    email: string
    roleName: string
    mfaEnabled: boolean
    lastActiveAt: Date
    createdAt: Date
    _count: AdminMemberCountAggregateOutputType | null
    _min: AdminMemberMinAggregateOutputType | null
    _max: AdminMemberMaxAggregateOutputType | null
  }

  type GetAdminMemberGroupByPayload<T extends AdminMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminMemberGroupByOutputType[P]>
            : GetScalarType<T[P], AdminMemberGroupByOutputType[P]>
        }
      >
    >


  export type AdminMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    roleName?: boolean
    mfaEnabled?: boolean
    lastActiveAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["adminMember"]>

  export type AdminMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    roleName?: boolean
    mfaEnabled?: boolean
    lastActiveAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["adminMember"]>

  export type AdminMemberSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    roleName?: boolean
    mfaEnabled?: boolean
    lastActiveAt?: boolean
    createdAt?: boolean
  }


  export type $AdminMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminMember"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      roleName: string
      mfaEnabled: boolean
      lastActiveAt: Date
      createdAt: Date
    }, ExtArgs["result"]["adminMember"]>
    composites: {}
  }

  type AdminMemberGetPayload<S extends boolean | null | undefined | AdminMemberDefaultArgs> = $Result.GetResult<Prisma.$AdminMemberPayload, S>

  type AdminMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AdminMemberFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AdminMemberCountAggregateInputType | true
    }

  export interface AdminMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminMember'], meta: { name: 'AdminMember' } }
    /**
     * Find zero or one AdminMember that matches the filter.
     * @param {AdminMemberFindUniqueArgs} args - Arguments to find a AdminMember
     * @example
     * // Get one AdminMember
     * const adminMember = await prisma.adminMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminMemberFindUniqueArgs>(args: SelectSubset<T, AdminMemberFindUniqueArgs<ExtArgs>>): Prisma__AdminMemberClient<$Result.GetResult<Prisma.$AdminMemberPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AdminMember that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AdminMemberFindUniqueOrThrowArgs} args - Arguments to find a AdminMember
     * @example
     * // Get one AdminMember
     * const adminMember = await prisma.adminMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminMemberClient<$Result.GetResult<Prisma.$AdminMemberPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AdminMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminMemberFindFirstArgs} args - Arguments to find a AdminMember
     * @example
     * // Get one AdminMember
     * const adminMember = await prisma.adminMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminMemberFindFirstArgs>(args?: SelectSubset<T, AdminMemberFindFirstArgs<ExtArgs>>): Prisma__AdminMemberClient<$Result.GetResult<Prisma.$AdminMemberPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AdminMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminMemberFindFirstOrThrowArgs} args - Arguments to find a AdminMember
     * @example
     * // Get one AdminMember
     * const adminMember = await prisma.adminMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminMemberClient<$Result.GetResult<Prisma.$AdminMemberPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AdminMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminMembers
     * const adminMembers = await prisma.adminMember.findMany()
     * 
     * // Get first 10 AdminMembers
     * const adminMembers = await prisma.adminMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminMemberWithIdOnly = await prisma.adminMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminMemberFindManyArgs>(args?: SelectSubset<T, AdminMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminMemberPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AdminMember.
     * @param {AdminMemberCreateArgs} args - Arguments to create a AdminMember.
     * @example
     * // Create one AdminMember
     * const AdminMember = await prisma.adminMember.create({
     *   data: {
     *     // ... data to create a AdminMember
     *   }
     * })
     * 
     */
    create<T extends AdminMemberCreateArgs>(args: SelectSubset<T, AdminMemberCreateArgs<ExtArgs>>): Prisma__AdminMemberClient<$Result.GetResult<Prisma.$AdminMemberPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AdminMembers.
     * @param {AdminMemberCreateManyArgs} args - Arguments to create many AdminMembers.
     * @example
     * // Create many AdminMembers
     * const adminMember = await prisma.adminMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminMemberCreateManyArgs>(args?: SelectSubset<T, AdminMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminMembers and returns the data saved in the database.
     * @param {AdminMemberCreateManyAndReturnArgs} args - Arguments to create many AdminMembers.
     * @example
     * // Create many AdminMembers
     * const adminMember = await prisma.adminMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminMembers and only return the `id`
     * const adminMemberWithIdOnly = await prisma.adminMember.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminMemberPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AdminMember.
     * @param {AdminMemberDeleteArgs} args - Arguments to delete one AdminMember.
     * @example
     * // Delete one AdminMember
     * const AdminMember = await prisma.adminMember.delete({
     *   where: {
     *     // ... filter to delete one AdminMember
     *   }
     * })
     * 
     */
    delete<T extends AdminMemberDeleteArgs>(args: SelectSubset<T, AdminMemberDeleteArgs<ExtArgs>>): Prisma__AdminMemberClient<$Result.GetResult<Prisma.$AdminMemberPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AdminMember.
     * @param {AdminMemberUpdateArgs} args - Arguments to update one AdminMember.
     * @example
     * // Update one AdminMember
     * const adminMember = await prisma.adminMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminMemberUpdateArgs>(args: SelectSubset<T, AdminMemberUpdateArgs<ExtArgs>>): Prisma__AdminMemberClient<$Result.GetResult<Prisma.$AdminMemberPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AdminMembers.
     * @param {AdminMemberDeleteManyArgs} args - Arguments to filter AdminMembers to delete.
     * @example
     * // Delete a few AdminMembers
     * const { count } = await prisma.adminMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminMemberDeleteManyArgs>(args?: SelectSubset<T, AdminMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminMembers
     * const adminMember = await prisma.adminMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminMemberUpdateManyArgs>(args: SelectSubset<T, AdminMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AdminMember.
     * @param {AdminMemberUpsertArgs} args - Arguments to update or create a AdminMember.
     * @example
     * // Update or create a AdminMember
     * const adminMember = await prisma.adminMember.upsert({
     *   create: {
     *     // ... data to create a AdminMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminMember we want to update
     *   }
     * })
     */
    upsert<T extends AdminMemberUpsertArgs>(args: SelectSubset<T, AdminMemberUpsertArgs<ExtArgs>>): Prisma__AdminMemberClient<$Result.GetResult<Prisma.$AdminMemberPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AdminMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminMemberCountArgs} args - Arguments to filter AdminMembers to count.
     * @example
     * // Count the number of AdminMembers
     * const count = await prisma.adminMember.count({
     *   where: {
     *     // ... the filter for the AdminMembers we want to count
     *   }
     * })
    **/
    count<T extends AdminMemberCountArgs>(
      args?: Subset<T, AdminMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminMemberAggregateArgs>(args: Subset<T, AdminMemberAggregateArgs>): Prisma.PrismaPromise<GetAdminMemberAggregateType<T>>

    /**
     * Group by AdminMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminMemberGroupByArgs} args - Group by arguments.
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
      T extends AdminMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminMemberGroupByArgs['orderBy'] }
        : { orderBy?: AdminMemberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdminMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminMember model
   */
  readonly fields: AdminMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AdminMember model
   */ 
  interface AdminMemberFieldRefs {
    readonly id: FieldRef<"AdminMember", 'String'>
    readonly name: FieldRef<"AdminMember", 'String'>
    readonly email: FieldRef<"AdminMember", 'String'>
    readonly roleName: FieldRef<"AdminMember", 'String'>
    readonly mfaEnabled: FieldRef<"AdminMember", 'Boolean'>
    readonly lastActiveAt: FieldRef<"AdminMember", 'DateTime'>
    readonly createdAt: FieldRef<"AdminMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminMember findUnique
   */
  export type AdminMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminMember
     */
    select?: AdminMemberSelect<ExtArgs> | null
    /**
     * Filter, which AdminMember to fetch.
     */
    where: AdminMemberWhereUniqueInput
  }

  /**
   * AdminMember findUniqueOrThrow
   */
  export type AdminMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminMember
     */
    select?: AdminMemberSelect<ExtArgs> | null
    /**
     * Filter, which AdminMember to fetch.
     */
    where: AdminMemberWhereUniqueInput
  }

  /**
   * AdminMember findFirst
   */
  export type AdminMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminMember
     */
    select?: AdminMemberSelect<ExtArgs> | null
    /**
     * Filter, which AdminMember to fetch.
     */
    where?: AdminMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminMembers to fetch.
     */
    orderBy?: AdminMemberOrderByWithRelationInput | AdminMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminMembers.
     */
    cursor?: AdminMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminMembers.
     */
    distinct?: AdminMemberScalarFieldEnum | AdminMemberScalarFieldEnum[]
  }

  /**
   * AdminMember findFirstOrThrow
   */
  export type AdminMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminMember
     */
    select?: AdminMemberSelect<ExtArgs> | null
    /**
     * Filter, which AdminMember to fetch.
     */
    where?: AdminMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminMembers to fetch.
     */
    orderBy?: AdminMemberOrderByWithRelationInput | AdminMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminMembers.
     */
    cursor?: AdminMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminMembers.
     */
    distinct?: AdminMemberScalarFieldEnum | AdminMemberScalarFieldEnum[]
  }

  /**
   * AdminMember findMany
   */
  export type AdminMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminMember
     */
    select?: AdminMemberSelect<ExtArgs> | null
    /**
     * Filter, which AdminMembers to fetch.
     */
    where?: AdminMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminMembers to fetch.
     */
    orderBy?: AdminMemberOrderByWithRelationInput | AdminMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminMembers.
     */
    cursor?: AdminMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminMembers.
     */
    skip?: number
    distinct?: AdminMemberScalarFieldEnum | AdminMemberScalarFieldEnum[]
  }

  /**
   * AdminMember create
   */
  export type AdminMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminMember
     */
    select?: AdminMemberSelect<ExtArgs> | null
    /**
     * The data needed to create a AdminMember.
     */
    data: XOR<AdminMemberCreateInput, AdminMemberUncheckedCreateInput>
  }

  /**
   * AdminMember createMany
   */
  export type AdminMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminMembers.
     */
    data: AdminMemberCreateManyInput | AdminMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminMember createManyAndReturn
   */
  export type AdminMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminMember
     */
    select?: AdminMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AdminMembers.
     */
    data: AdminMemberCreateManyInput | AdminMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminMember update
   */
  export type AdminMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminMember
     */
    select?: AdminMemberSelect<ExtArgs> | null
    /**
     * The data needed to update a AdminMember.
     */
    data: XOR<AdminMemberUpdateInput, AdminMemberUncheckedUpdateInput>
    /**
     * Choose, which AdminMember to update.
     */
    where: AdminMemberWhereUniqueInput
  }

  /**
   * AdminMember updateMany
   */
  export type AdminMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminMembers.
     */
    data: XOR<AdminMemberUpdateManyMutationInput, AdminMemberUncheckedUpdateManyInput>
    /**
     * Filter which AdminMembers to update
     */
    where?: AdminMemberWhereInput
  }

  /**
   * AdminMember upsert
   */
  export type AdminMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminMember
     */
    select?: AdminMemberSelect<ExtArgs> | null
    /**
     * The filter to search for the AdminMember to update in case it exists.
     */
    where: AdminMemberWhereUniqueInput
    /**
     * In case the AdminMember found by the `where` argument doesn't exist, create a new AdminMember with this data.
     */
    create: XOR<AdminMemberCreateInput, AdminMemberUncheckedCreateInput>
    /**
     * In case the AdminMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminMemberUpdateInput, AdminMemberUncheckedUpdateInput>
  }

  /**
   * AdminMember delete
   */
  export type AdminMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminMember
     */
    select?: AdminMemberSelect<ExtArgs> | null
    /**
     * Filter which AdminMember to delete.
     */
    where: AdminMemberWhereUniqueInput
  }

  /**
   * AdminMember deleteMany
   */
  export type AdminMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminMembers to delete
     */
    where?: AdminMemberWhereInput
  }

  /**
   * AdminMember without action
   */
  export type AdminMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminMember
     */
    select?: AdminMemberSelect<ExtArgs> | null
  }


  /**
   * Model RbacRole
   */

  export type AggregateRbacRole = {
    _count: RbacRoleCountAggregateOutputType | null
    _avg: RbacRoleAvgAggregateOutputType | null
    _sum: RbacRoleSumAggregateOutputType | null
    _min: RbacRoleMinAggregateOutputType | null
    _max: RbacRoleMaxAggregateOutputType | null
  }

  export type RbacRoleAvgAggregateOutputType = {
    memberCount: number | null
  }

  export type RbacRoleSumAggregateOutputType = {
    memberCount: number | null
  }

  export type RbacRoleMinAggregateOutputType = {
    id: string | null
    name: string | null
    memberCount: number | null
    tone: $Enums.RoleTone | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RbacRoleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    memberCount: number | null
    tone: $Enums.RoleTone | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RbacRoleCountAggregateOutputType = {
    id: number
    name: number
    memberCount: number
    permissions: number
    tone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RbacRoleAvgAggregateInputType = {
    memberCount?: true
  }

  export type RbacRoleSumAggregateInputType = {
    memberCount?: true
  }

  export type RbacRoleMinAggregateInputType = {
    id?: true
    name?: true
    memberCount?: true
    tone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RbacRoleMaxAggregateInputType = {
    id?: true
    name?: true
    memberCount?: true
    tone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RbacRoleCountAggregateInputType = {
    id?: true
    name?: true
    memberCount?: true
    permissions?: true
    tone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RbacRoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RbacRole to aggregate.
     */
    where?: RbacRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RbacRoles to fetch.
     */
    orderBy?: RbacRoleOrderByWithRelationInput | RbacRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RbacRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RbacRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RbacRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RbacRoles
    **/
    _count?: true | RbacRoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RbacRoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RbacRoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RbacRoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RbacRoleMaxAggregateInputType
  }

  export type GetRbacRoleAggregateType<T extends RbacRoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRbacRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRbacRole[P]>
      : GetScalarType<T[P], AggregateRbacRole[P]>
  }




  export type RbacRoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RbacRoleWhereInput
    orderBy?: RbacRoleOrderByWithAggregationInput | RbacRoleOrderByWithAggregationInput[]
    by: RbacRoleScalarFieldEnum[] | RbacRoleScalarFieldEnum
    having?: RbacRoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RbacRoleCountAggregateInputType | true
    _avg?: RbacRoleAvgAggregateInputType
    _sum?: RbacRoleSumAggregateInputType
    _min?: RbacRoleMinAggregateInputType
    _max?: RbacRoleMaxAggregateInputType
  }

  export type RbacRoleGroupByOutputType = {
    id: string
    name: string
    memberCount: number
    permissions: JsonValue
    tone: $Enums.RoleTone
    createdAt: Date
    updatedAt: Date
    _count: RbacRoleCountAggregateOutputType | null
    _avg: RbacRoleAvgAggregateOutputType | null
    _sum: RbacRoleSumAggregateOutputType | null
    _min: RbacRoleMinAggregateOutputType | null
    _max: RbacRoleMaxAggregateOutputType | null
  }

  type GetRbacRoleGroupByPayload<T extends RbacRoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RbacRoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RbacRoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RbacRoleGroupByOutputType[P]>
            : GetScalarType<T[P], RbacRoleGroupByOutputType[P]>
        }
      >
    >


  export type RbacRoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    memberCount?: boolean
    permissions?: boolean
    tone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rbacRole"]>

  export type RbacRoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    memberCount?: boolean
    permissions?: boolean
    tone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["rbacRole"]>

  export type RbacRoleSelectScalar = {
    id?: boolean
    name?: boolean
    memberCount?: boolean
    permissions?: boolean
    tone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $RbacRolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RbacRole"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      memberCount: number
      permissions: Prisma.JsonValue
      tone: $Enums.RoleTone
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rbacRole"]>
    composites: {}
  }

  type RbacRoleGetPayload<S extends boolean | null | undefined | RbacRoleDefaultArgs> = $Result.GetResult<Prisma.$RbacRolePayload, S>

  type RbacRoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RbacRoleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RbacRoleCountAggregateInputType | true
    }

  export interface RbacRoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RbacRole'], meta: { name: 'RbacRole' } }
    /**
     * Find zero or one RbacRole that matches the filter.
     * @param {RbacRoleFindUniqueArgs} args - Arguments to find a RbacRole
     * @example
     * // Get one RbacRole
     * const rbacRole = await prisma.rbacRole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RbacRoleFindUniqueArgs>(args: SelectSubset<T, RbacRoleFindUniqueArgs<ExtArgs>>): Prisma__RbacRoleClient<$Result.GetResult<Prisma.$RbacRolePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RbacRole that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RbacRoleFindUniqueOrThrowArgs} args - Arguments to find a RbacRole
     * @example
     * // Get one RbacRole
     * const rbacRole = await prisma.rbacRole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RbacRoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RbacRoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RbacRoleClient<$Result.GetResult<Prisma.$RbacRolePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RbacRole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RbacRoleFindFirstArgs} args - Arguments to find a RbacRole
     * @example
     * // Get one RbacRole
     * const rbacRole = await prisma.rbacRole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RbacRoleFindFirstArgs>(args?: SelectSubset<T, RbacRoleFindFirstArgs<ExtArgs>>): Prisma__RbacRoleClient<$Result.GetResult<Prisma.$RbacRolePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RbacRole that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RbacRoleFindFirstOrThrowArgs} args - Arguments to find a RbacRole
     * @example
     * // Get one RbacRole
     * const rbacRole = await prisma.rbacRole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RbacRoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RbacRoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RbacRoleClient<$Result.GetResult<Prisma.$RbacRolePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RbacRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RbacRoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RbacRoles
     * const rbacRoles = await prisma.rbacRole.findMany()
     * 
     * // Get first 10 RbacRoles
     * const rbacRoles = await prisma.rbacRole.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rbacRoleWithIdOnly = await prisma.rbacRole.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RbacRoleFindManyArgs>(args?: SelectSubset<T, RbacRoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RbacRolePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RbacRole.
     * @param {RbacRoleCreateArgs} args - Arguments to create a RbacRole.
     * @example
     * // Create one RbacRole
     * const RbacRole = await prisma.rbacRole.create({
     *   data: {
     *     // ... data to create a RbacRole
     *   }
     * })
     * 
     */
    create<T extends RbacRoleCreateArgs>(args: SelectSubset<T, RbacRoleCreateArgs<ExtArgs>>): Prisma__RbacRoleClient<$Result.GetResult<Prisma.$RbacRolePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RbacRoles.
     * @param {RbacRoleCreateManyArgs} args - Arguments to create many RbacRoles.
     * @example
     * // Create many RbacRoles
     * const rbacRole = await prisma.rbacRole.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RbacRoleCreateManyArgs>(args?: SelectSubset<T, RbacRoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RbacRoles and returns the data saved in the database.
     * @param {RbacRoleCreateManyAndReturnArgs} args - Arguments to create many RbacRoles.
     * @example
     * // Create many RbacRoles
     * const rbacRole = await prisma.rbacRole.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RbacRoles and only return the `id`
     * const rbacRoleWithIdOnly = await prisma.rbacRole.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RbacRoleCreateManyAndReturnArgs>(args?: SelectSubset<T, RbacRoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RbacRolePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RbacRole.
     * @param {RbacRoleDeleteArgs} args - Arguments to delete one RbacRole.
     * @example
     * // Delete one RbacRole
     * const RbacRole = await prisma.rbacRole.delete({
     *   where: {
     *     // ... filter to delete one RbacRole
     *   }
     * })
     * 
     */
    delete<T extends RbacRoleDeleteArgs>(args: SelectSubset<T, RbacRoleDeleteArgs<ExtArgs>>): Prisma__RbacRoleClient<$Result.GetResult<Prisma.$RbacRolePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RbacRole.
     * @param {RbacRoleUpdateArgs} args - Arguments to update one RbacRole.
     * @example
     * // Update one RbacRole
     * const rbacRole = await prisma.rbacRole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RbacRoleUpdateArgs>(args: SelectSubset<T, RbacRoleUpdateArgs<ExtArgs>>): Prisma__RbacRoleClient<$Result.GetResult<Prisma.$RbacRolePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RbacRoles.
     * @param {RbacRoleDeleteManyArgs} args - Arguments to filter RbacRoles to delete.
     * @example
     * // Delete a few RbacRoles
     * const { count } = await prisma.rbacRole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RbacRoleDeleteManyArgs>(args?: SelectSubset<T, RbacRoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RbacRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RbacRoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RbacRoles
     * const rbacRole = await prisma.rbacRole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RbacRoleUpdateManyArgs>(args: SelectSubset<T, RbacRoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RbacRole.
     * @param {RbacRoleUpsertArgs} args - Arguments to update or create a RbacRole.
     * @example
     * // Update or create a RbacRole
     * const rbacRole = await prisma.rbacRole.upsert({
     *   create: {
     *     // ... data to create a RbacRole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RbacRole we want to update
     *   }
     * })
     */
    upsert<T extends RbacRoleUpsertArgs>(args: SelectSubset<T, RbacRoleUpsertArgs<ExtArgs>>): Prisma__RbacRoleClient<$Result.GetResult<Prisma.$RbacRolePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RbacRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RbacRoleCountArgs} args - Arguments to filter RbacRoles to count.
     * @example
     * // Count the number of RbacRoles
     * const count = await prisma.rbacRole.count({
     *   where: {
     *     // ... the filter for the RbacRoles we want to count
     *   }
     * })
    **/
    count<T extends RbacRoleCountArgs>(
      args?: Subset<T, RbacRoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RbacRoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RbacRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RbacRoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RbacRoleAggregateArgs>(args: Subset<T, RbacRoleAggregateArgs>): Prisma.PrismaPromise<GetRbacRoleAggregateType<T>>

    /**
     * Group by RbacRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RbacRoleGroupByArgs} args - Group by arguments.
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
      T extends RbacRoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RbacRoleGroupByArgs['orderBy'] }
        : { orderBy?: RbacRoleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RbacRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRbacRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RbacRole model
   */
  readonly fields: RbacRoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RbacRole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RbacRoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the RbacRole model
   */ 
  interface RbacRoleFieldRefs {
    readonly id: FieldRef<"RbacRole", 'String'>
    readonly name: FieldRef<"RbacRole", 'String'>
    readonly memberCount: FieldRef<"RbacRole", 'Int'>
    readonly permissions: FieldRef<"RbacRole", 'Json'>
    readonly tone: FieldRef<"RbacRole", 'RoleTone'>
    readonly createdAt: FieldRef<"RbacRole", 'DateTime'>
    readonly updatedAt: FieldRef<"RbacRole", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RbacRole findUnique
   */
  export type RbacRoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RbacRole
     */
    select?: RbacRoleSelect<ExtArgs> | null
    /**
     * Filter, which RbacRole to fetch.
     */
    where: RbacRoleWhereUniqueInput
  }

  /**
   * RbacRole findUniqueOrThrow
   */
  export type RbacRoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RbacRole
     */
    select?: RbacRoleSelect<ExtArgs> | null
    /**
     * Filter, which RbacRole to fetch.
     */
    where: RbacRoleWhereUniqueInput
  }

  /**
   * RbacRole findFirst
   */
  export type RbacRoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RbacRole
     */
    select?: RbacRoleSelect<ExtArgs> | null
    /**
     * Filter, which RbacRole to fetch.
     */
    where?: RbacRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RbacRoles to fetch.
     */
    orderBy?: RbacRoleOrderByWithRelationInput | RbacRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RbacRoles.
     */
    cursor?: RbacRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RbacRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RbacRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RbacRoles.
     */
    distinct?: RbacRoleScalarFieldEnum | RbacRoleScalarFieldEnum[]
  }

  /**
   * RbacRole findFirstOrThrow
   */
  export type RbacRoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RbacRole
     */
    select?: RbacRoleSelect<ExtArgs> | null
    /**
     * Filter, which RbacRole to fetch.
     */
    where?: RbacRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RbacRoles to fetch.
     */
    orderBy?: RbacRoleOrderByWithRelationInput | RbacRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RbacRoles.
     */
    cursor?: RbacRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RbacRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RbacRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RbacRoles.
     */
    distinct?: RbacRoleScalarFieldEnum | RbacRoleScalarFieldEnum[]
  }

  /**
   * RbacRole findMany
   */
  export type RbacRoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RbacRole
     */
    select?: RbacRoleSelect<ExtArgs> | null
    /**
     * Filter, which RbacRoles to fetch.
     */
    where?: RbacRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RbacRoles to fetch.
     */
    orderBy?: RbacRoleOrderByWithRelationInput | RbacRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RbacRoles.
     */
    cursor?: RbacRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RbacRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RbacRoles.
     */
    skip?: number
    distinct?: RbacRoleScalarFieldEnum | RbacRoleScalarFieldEnum[]
  }

  /**
   * RbacRole create
   */
  export type RbacRoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RbacRole
     */
    select?: RbacRoleSelect<ExtArgs> | null
    /**
     * The data needed to create a RbacRole.
     */
    data: XOR<RbacRoleCreateInput, RbacRoleUncheckedCreateInput>
  }

  /**
   * RbacRole createMany
   */
  export type RbacRoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RbacRoles.
     */
    data: RbacRoleCreateManyInput | RbacRoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RbacRole createManyAndReturn
   */
  export type RbacRoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RbacRole
     */
    select?: RbacRoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RbacRoles.
     */
    data: RbacRoleCreateManyInput | RbacRoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RbacRole update
   */
  export type RbacRoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RbacRole
     */
    select?: RbacRoleSelect<ExtArgs> | null
    /**
     * The data needed to update a RbacRole.
     */
    data: XOR<RbacRoleUpdateInput, RbacRoleUncheckedUpdateInput>
    /**
     * Choose, which RbacRole to update.
     */
    where: RbacRoleWhereUniqueInput
  }

  /**
   * RbacRole updateMany
   */
  export type RbacRoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RbacRoles.
     */
    data: XOR<RbacRoleUpdateManyMutationInput, RbacRoleUncheckedUpdateManyInput>
    /**
     * Filter which RbacRoles to update
     */
    where?: RbacRoleWhereInput
  }

  /**
   * RbacRole upsert
   */
  export type RbacRoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RbacRole
     */
    select?: RbacRoleSelect<ExtArgs> | null
    /**
     * The filter to search for the RbacRole to update in case it exists.
     */
    where: RbacRoleWhereUniqueInput
    /**
     * In case the RbacRole found by the `where` argument doesn't exist, create a new RbacRole with this data.
     */
    create: XOR<RbacRoleCreateInput, RbacRoleUncheckedCreateInput>
    /**
     * In case the RbacRole was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RbacRoleUpdateInput, RbacRoleUncheckedUpdateInput>
  }

  /**
   * RbacRole delete
   */
  export type RbacRoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RbacRole
     */
    select?: RbacRoleSelect<ExtArgs> | null
    /**
     * Filter which RbacRole to delete.
     */
    where: RbacRoleWhereUniqueInput
  }

  /**
   * RbacRole deleteMany
   */
  export type RbacRoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RbacRoles to delete
     */
    where?: RbacRoleWhereInput
  }

  /**
   * RbacRole without action
   */
  export type RbacRoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RbacRole
     */
    select?: RbacRoleSelect<ExtArgs> | null
  }


  /**
   * Model FeatureFlag
   */

  export type AggregateFeatureFlag = {
    _count: FeatureFlagCountAggregateOutputType | null
    _min: FeatureFlagMinAggregateOutputType | null
    _max: FeatureFlagMaxAggregateOutputType | null
  }

  export type FeatureFlagMinAggregateOutputType = {
    id: string | null
    key: string | null
    name: string | null
    description: string | null
    enabled: boolean | null
    scope: string | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type FeatureFlagMaxAggregateOutputType = {
    id: string | null
    key: string | null
    name: string | null
    description: string | null
    enabled: boolean | null
    scope: string | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type FeatureFlagCountAggregateOutputType = {
    id: number
    key: number
    name: number
    description: number
    enabled: number
    scope: number
    updatedAt: number
    createdAt: number
    _all: number
  }


  export type FeatureFlagMinAggregateInputType = {
    id?: true
    key?: true
    name?: true
    description?: true
    enabled?: true
    scope?: true
    updatedAt?: true
    createdAt?: true
  }

  export type FeatureFlagMaxAggregateInputType = {
    id?: true
    key?: true
    name?: true
    description?: true
    enabled?: true
    scope?: true
    updatedAt?: true
    createdAt?: true
  }

  export type FeatureFlagCountAggregateInputType = {
    id?: true
    key?: true
    name?: true
    description?: true
    enabled?: true
    scope?: true
    updatedAt?: true
    createdAt?: true
    _all?: true
  }

  export type FeatureFlagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeatureFlag to aggregate.
     */
    where?: FeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureFlags to fetch.
     */
    orderBy?: FeatureFlagOrderByWithRelationInput | FeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FeatureFlags
    **/
    _count?: true | FeatureFlagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeatureFlagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeatureFlagMaxAggregateInputType
  }

  export type GetFeatureFlagAggregateType<T extends FeatureFlagAggregateArgs> = {
        [P in keyof T & keyof AggregateFeatureFlag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeatureFlag[P]>
      : GetScalarType<T[P], AggregateFeatureFlag[P]>
  }




  export type FeatureFlagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeatureFlagWhereInput
    orderBy?: FeatureFlagOrderByWithAggregationInput | FeatureFlagOrderByWithAggregationInput[]
    by: FeatureFlagScalarFieldEnum[] | FeatureFlagScalarFieldEnum
    having?: FeatureFlagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeatureFlagCountAggregateInputType | true
    _min?: FeatureFlagMinAggregateInputType
    _max?: FeatureFlagMaxAggregateInputType
  }

  export type FeatureFlagGroupByOutputType = {
    id: string
    key: string
    name: string
    description: string
    enabled: boolean
    scope: string
    updatedAt: Date
    createdAt: Date
    _count: FeatureFlagCountAggregateOutputType | null
    _min: FeatureFlagMinAggregateOutputType | null
    _max: FeatureFlagMaxAggregateOutputType | null
  }

  type GetFeatureFlagGroupByPayload<T extends FeatureFlagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeatureFlagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeatureFlagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeatureFlagGroupByOutputType[P]>
            : GetScalarType<T[P], FeatureFlagGroupByOutputType[P]>
        }
      >
    >


  export type FeatureFlagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    name?: boolean
    description?: boolean
    enabled?: boolean
    scope?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["featureFlag"]>

  export type FeatureFlagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    name?: boolean
    description?: boolean
    enabled?: boolean
    scope?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["featureFlag"]>

  export type FeatureFlagSelectScalar = {
    id?: boolean
    key?: boolean
    name?: boolean
    description?: boolean
    enabled?: boolean
    scope?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }


  export type $FeatureFlagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FeatureFlag"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      name: string
      description: string
      enabled: boolean
      scope: string
      updatedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["featureFlag"]>
    composites: {}
  }

  type FeatureFlagGetPayload<S extends boolean | null | undefined | FeatureFlagDefaultArgs> = $Result.GetResult<Prisma.$FeatureFlagPayload, S>

  type FeatureFlagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FeatureFlagFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FeatureFlagCountAggregateInputType | true
    }

  export interface FeatureFlagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeatureFlag'], meta: { name: 'FeatureFlag' } }
    /**
     * Find zero or one FeatureFlag that matches the filter.
     * @param {FeatureFlagFindUniqueArgs} args - Arguments to find a FeatureFlag
     * @example
     * // Get one FeatureFlag
     * const featureFlag = await prisma.featureFlag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeatureFlagFindUniqueArgs>(args: SelectSubset<T, FeatureFlagFindUniqueArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FeatureFlag that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FeatureFlagFindUniqueOrThrowArgs} args - Arguments to find a FeatureFlag
     * @example
     * // Get one FeatureFlag
     * const featureFlag = await prisma.featureFlag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeatureFlagFindUniqueOrThrowArgs>(args: SelectSubset<T, FeatureFlagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FeatureFlag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagFindFirstArgs} args - Arguments to find a FeatureFlag
     * @example
     * // Get one FeatureFlag
     * const featureFlag = await prisma.featureFlag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeatureFlagFindFirstArgs>(args?: SelectSubset<T, FeatureFlagFindFirstArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FeatureFlag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagFindFirstOrThrowArgs} args - Arguments to find a FeatureFlag
     * @example
     * // Get one FeatureFlag
     * const featureFlag = await prisma.featureFlag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeatureFlagFindFirstOrThrowArgs>(args?: SelectSubset<T, FeatureFlagFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FeatureFlags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FeatureFlags
     * const featureFlags = await prisma.featureFlag.findMany()
     * 
     * // Get first 10 FeatureFlags
     * const featureFlags = await prisma.featureFlag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const featureFlagWithIdOnly = await prisma.featureFlag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeatureFlagFindManyArgs>(args?: SelectSubset<T, FeatureFlagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FeatureFlag.
     * @param {FeatureFlagCreateArgs} args - Arguments to create a FeatureFlag.
     * @example
     * // Create one FeatureFlag
     * const FeatureFlag = await prisma.featureFlag.create({
     *   data: {
     *     // ... data to create a FeatureFlag
     *   }
     * })
     * 
     */
    create<T extends FeatureFlagCreateArgs>(args: SelectSubset<T, FeatureFlagCreateArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FeatureFlags.
     * @param {FeatureFlagCreateManyArgs} args - Arguments to create many FeatureFlags.
     * @example
     * // Create many FeatureFlags
     * const featureFlag = await prisma.featureFlag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeatureFlagCreateManyArgs>(args?: SelectSubset<T, FeatureFlagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FeatureFlags and returns the data saved in the database.
     * @param {FeatureFlagCreateManyAndReturnArgs} args - Arguments to create many FeatureFlags.
     * @example
     * // Create many FeatureFlags
     * const featureFlag = await prisma.featureFlag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FeatureFlags and only return the `id`
     * const featureFlagWithIdOnly = await prisma.featureFlag.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeatureFlagCreateManyAndReturnArgs>(args?: SelectSubset<T, FeatureFlagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FeatureFlag.
     * @param {FeatureFlagDeleteArgs} args - Arguments to delete one FeatureFlag.
     * @example
     * // Delete one FeatureFlag
     * const FeatureFlag = await prisma.featureFlag.delete({
     *   where: {
     *     // ... filter to delete one FeatureFlag
     *   }
     * })
     * 
     */
    delete<T extends FeatureFlagDeleteArgs>(args: SelectSubset<T, FeatureFlagDeleteArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FeatureFlag.
     * @param {FeatureFlagUpdateArgs} args - Arguments to update one FeatureFlag.
     * @example
     * // Update one FeatureFlag
     * const featureFlag = await prisma.featureFlag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeatureFlagUpdateArgs>(args: SelectSubset<T, FeatureFlagUpdateArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FeatureFlags.
     * @param {FeatureFlagDeleteManyArgs} args - Arguments to filter FeatureFlags to delete.
     * @example
     * // Delete a few FeatureFlags
     * const { count } = await prisma.featureFlag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeatureFlagDeleteManyArgs>(args?: SelectSubset<T, FeatureFlagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeatureFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FeatureFlags
     * const featureFlag = await prisma.featureFlag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeatureFlagUpdateManyArgs>(args: SelectSubset<T, FeatureFlagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FeatureFlag.
     * @param {FeatureFlagUpsertArgs} args - Arguments to update or create a FeatureFlag.
     * @example
     * // Update or create a FeatureFlag
     * const featureFlag = await prisma.featureFlag.upsert({
     *   create: {
     *     // ... data to create a FeatureFlag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FeatureFlag we want to update
     *   }
     * })
     */
    upsert<T extends FeatureFlagUpsertArgs>(args: SelectSubset<T, FeatureFlagUpsertArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FeatureFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagCountArgs} args - Arguments to filter FeatureFlags to count.
     * @example
     * // Count the number of FeatureFlags
     * const count = await prisma.featureFlag.count({
     *   where: {
     *     // ... the filter for the FeatureFlags we want to count
     *   }
     * })
    **/
    count<T extends FeatureFlagCountArgs>(
      args?: Subset<T, FeatureFlagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeatureFlagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FeatureFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FeatureFlagAggregateArgs>(args: Subset<T, FeatureFlagAggregateArgs>): Prisma.PrismaPromise<GetFeatureFlagAggregateType<T>>

    /**
     * Group by FeatureFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagGroupByArgs} args - Group by arguments.
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
      T extends FeatureFlagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeatureFlagGroupByArgs['orderBy'] }
        : { orderBy?: FeatureFlagGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FeatureFlagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeatureFlagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FeatureFlag model
   */
  readonly fields: FeatureFlagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FeatureFlag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeatureFlagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the FeatureFlag model
   */ 
  interface FeatureFlagFieldRefs {
    readonly id: FieldRef<"FeatureFlag", 'String'>
    readonly key: FieldRef<"FeatureFlag", 'String'>
    readonly name: FieldRef<"FeatureFlag", 'String'>
    readonly description: FieldRef<"FeatureFlag", 'String'>
    readonly enabled: FieldRef<"FeatureFlag", 'Boolean'>
    readonly scope: FieldRef<"FeatureFlag", 'String'>
    readonly updatedAt: FieldRef<"FeatureFlag", 'DateTime'>
    readonly createdAt: FieldRef<"FeatureFlag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FeatureFlag findUnique
   */
  export type FeatureFlagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Filter, which FeatureFlag to fetch.
     */
    where: FeatureFlagWhereUniqueInput
  }

  /**
   * FeatureFlag findUniqueOrThrow
   */
  export type FeatureFlagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Filter, which FeatureFlag to fetch.
     */
    where: FeatureFlagWhereUniqueInput
  }

  /**
   * FeatureFlag findFirst
   */
  export type FeatureFlagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Filter, which FeatureFlag to fetch.
     */
    where?: FeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureFlags to fetch.
     */
    orderBy?: FeatureFlagOrderByWithRelationInput | FeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeatureFlags.
     */
    cursor?: FeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeatureFlags.
     */
    distinct?: FeatureFlagScalarFieldEnum | FeatureFlagScalarFieldEnum[]
  }

  /**
   * FeatureFlag findFirstOrThrow
   */
  export type FeatureFlagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Filter, which FeatureFlag to fetch.
     */
    where?: FeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureFlags to fetch.
     */
    orderBy?: FeatureFlagOrderByWithRelationInput | FeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeatureFlags.
     */
    cursor?: FeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeatureFlags.
     */
    distinct?: FeatureFlagScalarFieldEnum | FeatureFlagScalarFieldEnum[]
  }

  /**
   * FeatureFlag findMany
   */
  export type FeatureFlagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Filter, which FeatureFlags to fetch.
     */
    where?: FeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureFlags to fetch.
     */
    orderBy?: FeatureFlagOrderByWithRelationInput | FeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FeatureFlags.
     */
    cursor?: FeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureFlags.
     */
    skip?: number
    distinct?: FeatureFlagScalarFieldEnum | FeatureFlagScalarFieldEnum[]
  }

  /**
   * FeatureFlag create
   */
  export type FeatureFlagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * The data needed to create a FeatureFlag.
     */
    data: XOR<FeatureFlagCreateInput, FeatureFlagUncheckedCreateInput>
  }

  /**
   * FeatureFlag createMany
   */
  export type FeatureFlagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FeatureFlags.
     */
    data: FeatureFlagCreateManyInput | FeatureFlagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeatureFlag createManyAndReturn
   */
  export type FeatureFlagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FeatureFlags.
     */
    data: FeatureFlagCreateManyInput | FeatureFlagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeatureFlag update
   */
  export type FeatureFlagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * The data needed to update a FeatureFlag.
     */
    data: XOR<FeatureFlagUpdateInput, FeatureFlagUncheckedUpdateInput>
    /**
     * Choose, which FeatureFlag to update.
     */
    where: FeatureFlagWhereUniqueInput
  }

  /**
   * FeatureFlag updateMany
   */
  export type FeatureFlagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FeatureFlags.
     */
    data: XOR<FeatureFlagUpdateManyMutationInput, FeatureFlagUncheckedUpdateManyInput>
    /**
     * Filter which FeatureFlags to update
     */
    where?: FeatureFlagWhereInput
  }

  /**
   * FeatureFlag upsert
   */
  export type FeatureFlagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * The filter to search for the FeatureFlag to update in case it exists.
     */
    where: FeatureFlagWhereUniqueInput
    /**
     * In case the FeatureFlag found by the `where` argument doesn't exist, create a new FeatureFlag with this data.
     */
    create: XOR<FeatureFlagCreateInput, FeatureFlagUncheckedCreateInput>
    /**
     * In case the FeatureFlag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeatureFlagUpdateInput, FeatureFlagUncheckedUpdateInput>
  }

  /**
   * FeatureFlag delete
   */
  export type FeatureFlagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Filter which FeatureFlag to delete.
     */
    where: FeatureFlagWhereUniqueInput
  }

  /**
   * FeatureFlag deleteMany
   */
  export type FeatureFlagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeatureFlags to delete
     */
    where?: FeatureFlagWhereInput
  }

  /**
   * FeatureFlag without action
   */
  export type FeatureFlagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
  }


  /**
   * Model VerificationRequirement
   */

  export type AggregateVerificationRequirement = {
    _count: VerificationRequirementCountAggregateOutputType | null
    _avg: VerificationRequirementAvgAggregateOutputType | null
    _sum: VerificationRequirementSumAggregateOutputType | null
    _min: VerificationRequirementMinAggregateOutputType | null
    _max: VerificationRequirementMaxAggregateOutputType | null
  }

  export type VerificationRequirementAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type VerificationRequirementSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type VerificationRequirementMinAggregateOutputType = {
    id: string | null
    slug: string | null
    label: string | null
    description: string | null
    category: $Enums.VerificationCategory | null
    inputType: $Enums.RequirementInputType | null
    fieldKey: string | null
    stepKey: string | null
    valueFormat: string | null
    placeholder: string | null
    accept: string | null
    sortOrder: number | null
    targetBusiness: boolean | null
    targetDeveloper: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationRequirementMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    label: string | null
    description: string | null
    category: $Enums.VerificationCategory | null
    inputType: $Enums.RequirementInputType | null
    fieldKey: string | null
    stepKey: string | null
    valueFormat: string | null
    placeholder: string | null
    accept: string | null
    sortOrder: number | null
    targetBusiness: boolean | null
    targetDeveloper: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationRequirementCountAggregateOutputType = {
    id: number
    slug: number
    label: number
    description: number
    category: number
    inputType: number
    fieldKey: number
    stepKey: number
    valueFormat: number
    placeholder: number
    accept: number
    sortOrder: number
    targetBusiness: number
    targetDeveloper: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationRequirementAvgAggregateInputType = {
    sortOrder?: true
  }

  export type VerificationRequirementSumAggregateInputType = {
    sortOrder?: true
  }

  export type VerificationRequirementMinAggregateInputType = {
    id?: true
    slug?: true
    label?: true
    description?: true
    category?: true
    inputType?: true
    fieldKey?: true
    stepKey?: true
    valueFormat?: true
    placeholder?: true
    accept?: true
    sortOrder?: true
    targetBusiness?: true
    targetDeveloper?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationRequirementMaxAggregateInputType = {
    id?: true
    slug?: true
    label?: true
    description?: true
    category?: true
    inputType?: true
    fieldKey?: true
    stepKey?: true
    valueFormat?: true
    placeholder?: true
    accept?: true
    sortOrder?: true
    targetBusiness?: true
    targetDeveloper?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationRequirementCountAggregateInputType = {
    id?: true
    slug?: true
    label?: true
    description?: true
    category?: true
    inputType?: true
    fieldKey?: true
    stepKey?: true
    valueFormat?: true
    placeholder?: true
    accept?: true
    sortOrder?: true
    targetBusiness?: true
    targetDeveloper?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationRequirementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationRequirement to aggregate.
     */
    where?: VerificationRequirementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationRequirements to fetch.
     */
    orderBy?: VerificationRequirementOrderByWithRelationInput | VerificationRequirementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationRequirementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationRequirements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationRequirements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationRequirements
    **/
    _count?: true | VerificationRequirementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VerificationRequirementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VerificationRequirementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationRequirementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationRequirementMaxAggregateInputType
  }

  export type GetVerificationRequirementAggregateType<T extends VerificationRequirementAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationRequirement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationRequirement[P]>
      : GetScalarType<T[P], AggregateVerificationRequirement[P]>
  }




  export type VerificationRequirementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationRequirementWhereInput
    orderBy?: VerificationRequirementOrderByWithAggregationInput | VerificationRequirementOrderByWithAggregationInput[]
    by: VerificationRequirementScalarFieldEnum[] | VerificationRequirementScalarFieldEnum
    having?: VerificationRequirementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationRequirementCountAggregateInputType | true
    _avg?: VerificationRequirementAvgAggregateInputType
    _sum?: VerificationRequirementSumAggregateInputType
    _min?: VerificationRequirementMinAggregateInputType
    _max?: VerificationRequirementMaxAggregateInputType
  }

  export type VerificationRequirementGroupByOutputType = {
    id: string
    slug: string
    label: string
    description: string
    category: $Enums.VerificationCategory
    inputType: $Enums.RequirementInputType
    fieldKey: string
    stepKey: string
    valueFormat: string | null
    placeholder: string | null
    accept: string | null
    sortOrder: number
    targetBusiness: boolean
    targetDeveloper: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: VerificationRequirementCountAggregateOutputType | null
    _avg: VerificationRequirementAvgAggregateOutputType | null
    _sum: VerificationRequirementSumAggregateOutputType | null
    _min: VerificationRequirementMinAggregateOutputType | null
    _max: VerificationRequirementMaxAggregateOutputType | null
  }

  type GetVerificationRequirementGroupByPayload<T extends VerificationRequirementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationRequirementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationRequirementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationRequirementGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationRequirementGroupByOutputType[P]>
        }
      >
    >


  export type VerificationRequirementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    label?: boolean
    description?: boolean
    category?: boolean
    inputType?: boolean
    fieldKey?: boolean
    stepKey?: boolean
    valueFormat?: boolean
    placeholder?: boolean
    accept?: boolean
    sortOrder?: boolean
    targetBusiness?: boolean
    targetDeveloper?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verificationRequirement"]>

  export type VerificationRequirementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    label?: boolean
    description?: boolean
    category?: boolean
    inputType?: boolean
    fieldKey?: boolean
    stepKey?: boolean
    valueFormat?: boolean
    placeholder?: boolean
    accept?: boolean
    sortOrder?: boolean
    targetBusiness?: boolean
    targetDeveloper?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verificationRequirement"]>

  export type VerificationRequirementSelectScalar = {
    id?: boolean
    slug?: boolean
    label?: boolean
    description?: boolean
    category?: boolean
    inputType?: boolean
    fieldKey?: boolean
    stepKey?: boolean
    valueFormat?: boolean
    placeholder?: boolean
    accept?: boolean
    sortOrder?: boolean
    targetBusiness?: boolean
    targetDeveloper?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $VerificationRequirementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationRequirement"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      label: string
      description: string
      category: $Enums.VerificationCategory
      inputType: $Enums.RequirementInputType
      fieldKey: string
      stepKey: string
      valueFormat: string | null
      placeholder: string | null
      accept: string | null
      sortOrder: number
      targetBusiness: boolean
      targetDeveloper: boolean
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verificationRequirement"]>
    composites: {}
  }

  type VerificationRequirementGetPayload<S extends boolean | null | undefined | VerificationRequirementDefaultArgs> = $Result.GetResult<Prisma.$VerificationRequirementPayload, S>

  type VerificationRequirementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VerificationRequirementFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VerificationRequirementCountAggregateInputType | true
    }

  export interface VerificationRequirementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationRequirement'], meta: { name: 'VerificationRequirement' } }
    /**
     * Find zero or one VerificationRequirement that matches the filter.
     * @param {VerificationRequirementFindUniqueArgs} args - Arguments to find a VerificationRequirement
     * @example
     * // Get one VerificationRequirement
     * const verificationRequirement = await prisma.verificationRequirement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationRequirementFindUniqueArgs>(args: SelectSubset<T, VerificationRequirementFindUniqueArgs<ExtArgs>>): Prisma__VerificationRequirementClient<$Result.GetResult<Prisma.$VerificationRequirementPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VerificationRequirement that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VerificationRequirementFindUniqueOrThrowArgs} args - Arguments to find a VerificationRequirement
     * @example
     * // Get one VerificationRequirement
     * const verificationRequirement = await prisma.verificationRequirement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationRequirementFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationRequirementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationRequirementClient<$Result.GetResult<Prisma.$VerificationRequirementPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VerificationRequirement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationRequirementFindFirstArgs} args - Arguments to find a VerificationRequirement
     * @example
     * // Get one VerificationRequirement
     * const verificationRequirement = await prisma.verificationRequirement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationRequirementFindFirstArgs>(args?: SelectSubset<T, VerificationRequirementFindFirstArgs<ExtArgs>>): Prisma__VerificationRequirementClient<$Result.GetResult<Prisma.$VerificationRequirementPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VerificationRequirement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationRequirementFindFirstOrThrowArgs} args - Arguments to find a VerificationRequirement
     * @example
     * // Get one VerificationRequirement
     * const verificationRequirement = await prisma.verificationRequirement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationRequirementFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationRequirementFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationRequirementClient<$Result.GetResult<Prisma.$VerificationRequirementPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VerificationRequirements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationRequirementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationRequirements
     * const verificationRequirements = await prisma.verificationRequirement.findMany()
     * 
     * // Get first 10 VerificationRequirements
     * const verificationRequirements = await prisma.verificationRequirement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationRequirementWithIdOnly = await prisma.verificationRequirement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationRequirementFindManyArgs>(args?: SelectSubset<T, VerificationRequirementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationRequirementPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VerificationRequirement.
     * @param {VerificationRequirementCreateArgs} args - Arguments to create a VerificationRequirement.
     * @example
     * // Create one VerificationRequirement
     * const VerificationRequirement = await prisma.verificationRequirement.create({
     *   data: {
     *     // ... data to create a VerificationRequirement
     *   }
     * })
     * 
     */
    create<T extends VerificationRequirementCreateArgs>(args: SelectSubset<T, VerificationRequirementCreateArgs<ExtArgs>>): Prisma__VerificationRequirementClient<$Result.GetResult<Prisma.$VerificationRequirementPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VerificationRequirements.
     * @param {VerificationRequirementCreateManyArgs} args - Arguments to create many VerificationRequirements.
     * @example
     * // Create many VerificationRequirements
     * const verificationRequirement = await prisma.verificationRequirement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationRequirementCreateManyArgs>(args?: SelectSubset<T, VerificationRequirementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationRequirements and returns the data saved in the database.
     * @param {VerificationRequirementCreateManyAndReturnArgs} args - Arguments to create many VerificationRequirements.
     * @example
     * // Create many VerificationRequirements
     * const verificationRequirement = await prisma.verificationRequirement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationRequirements and only return the `id`
     * const verificationRequirementWithIdOnly = await prisma.verificationRequirement.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationRequirementCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationRequirementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationRequirementPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a VerificationRequirement.
     * @param {VerificationRequirementDeleteArgs} args - Arguments to delete one VerificationRequirement.
     * @example
     * // Delete one VerificationRequirement
     * const VerificationRequirement = await prisma.verificationRequirement.delete({
     *   where: {
     *     // ... filter to delete one VerificationRequirement
     *   }
     * })
     * 
     */
    delete<T extends VerificationRequirementDeleteArgs>(args: SelectSubset<T, VerificationRequirementDeleteArgs<ExtArgs>>): Prisma__VerificationRequirementClient<$Result.GetResult<Prisma.$VerificationRequirementPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VerificationRequirement.
     * @param {VerificationRequirementUpdateArgs} args - Arguments to update one VerificationRequirement.
     * @example
     * // Update one VerificationRequirement
     * const verificationRequirement = await prisma.verificationRequirement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationRequirementUpdateArgs>(args: SelectSubset<T, VerificationRequirementUpdateArgs<ExtArgs>>): Prisma__VerificationRequirementClient<$Result.GetResult<Prisma.$VerificationRequirementPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VerificationRequirements.
     * @param {VerificationRequirementDeleteManyArgs} args - Arguments to filter VerificationRequirements to delete.
     * @example
     * // Delete a few VerificationRequirements
     * const { count } = await prisma.verificationRequirement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationRequirementDeleteManyArgs>(args?: SelectSubset<T, VerificationRequirementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationRequirements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationRequirementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationRequirements
     * const verificationRequirement = await prisma.verificationRequirement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationRequirementUpdateManyArgs>(args: SelectSubset<T, VerificationRequirementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VerificationRequirement.
     * @param {VerificationRequirementUpsertArgs} args - Arguments to update or create a VerificationRequirement.
     * @example
     * // Update or create a VerificationRequirement
     * const verificationRequirement = await prisma.verificationRequirement.upsert({
     *   create: {
     *     // ... data to create a VerificationRequirement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationRequirement we want to update
     *   }
     * })
     */
    upsert<T extends VerificationRequirementUpsertArgs>(args: SelectSubset<T, VerificationRequirementUpsertArgs<ExtArgs>>): Prisma__VerificationRequirementClient<$Result.GetResult<Prisma.$VerificationRequirementPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VerificationRequirements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationRequirementCountArgs} args - Arguments to filter VerificationRequirements to count.
     * @example
     * // Count the number of VerificationRequirements
     * const count = await prisma.verificationRequirement.count({
     *   where: {
     *     // ... the filter for the VerificationRequirements we want to count
     *   }
     * })
    **/
    count<T extends VerificationRequirementCountArgs>(
      args?: Subset<T, VerificationRequirementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationRequirementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationRequirement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationRequirementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationRequirementAggregateArgs>(args: Subset<T, VerificationRequirementAggregateArgs>): Prisma.PrismaPromise<GetVerificationRequirementAggregateType<T>>

    /**
     * Group by VerificationRequirement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationRequirementGroupByArgs} args - Group by arguments.
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
      T extends VerificationRequirementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationRequirementGroupByArgs['orderBy'] }
        : { orderBy?: VerificationRequirementGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VerificationRequirementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationRequirementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationRequirement model
   */
  readonly fields: VerificationRequirementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationRequirement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationRequirementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the VerificationRequirement model
   */ 
  interface VerificationRequirementFieldRefs {
    readonly id: FieldRef<"VerificationRequirement", 'String'>
    readonly slug: FieldRef<"VerificationRequirement", 'String'>
    readonly label: FieldRef<"VerificationRequirement", 'String'>
    readonly description: FieldRef<"VerificationRequirement", 'String'>
    readonly category: FieldRef<"VerificationRequirement", 'VerificationCategory'>
    readonly inputType: FieldRef<"VerificationRequirement", 'RequirementInputType'>
    readonly fieldKey: FieldRef<"VerificationRequirement", 'String'>
    readonly stepKey: FieldRef<"VerificationRequirement", 'String'>
    readonly valueFormat: FieldRef<"VerificationRequirement", 'String'>
    readonly placeholder: FieldRef<"VerificationRequirement", 'String'>
    readonly accept: FieldRef<"VerificationRequirement", 'String'>
    readonly sortOrder: FieldRef<"VerificationRequirement", 'Int'>
    readonly targetBusiness: FieldRef<"VerificationRequirement", 'Boolean'>
    readonly targetDeveloper: FieldRef<"VerificationRequirement", 'Boolean'>
    readonly isActive: FieldRef<"VerificationRequirement", 'Boolean'>
    readonly createdAt: FieldRef<"VerificationRequirement", 'DateTime'>
    readonly updatedAt: FieldRef<"VerificationRequirement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationRequirement findUnique
   */
  export type VerificationRequirementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationRequirement
     */
    select?: VerificationRequirementSelect<ExtArgs> | null
    /**
     * Filter, which VerificationRequirement to fetch.
     */
    where: VerificationRequirementWhereUniqueInput
  }

  /**
   * VerificationRequirement findUniqueOrThrow
   */
  export type VerificationRequirementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationRequirement
     */
    select?: VerificationRequirementSelect<ExtArgs> | null
    /**
     * Filter, which VerificationRequirement to fetch.
     */
    where: VerificationRequirementWhereUniqueInput
  }

  /**
   * VerificationRequirement findFirst
   */
  export type VerificationRequirementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationRequirement
     */
    select?: VerificationRequirementSelect<ExtArgs> | null
    /**
     * Filter, which VerificationRequirement to fetch.
     */
    where?: VerificationRequirementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationRequirements to fetch.
     */
    orderBy?: VerificationRequirementOrderByWithRelationInput | VerificationRequirementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationRequirements.
     */
    cursor?: VerificationRequirementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationRequirements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationRequirements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationRequirements.
     */
    distinct?: VerificationRequirementScalarFieldEnum | VerificationRequirementScalarFieldEnum[]
  }

  /**
   * VerificationRequirement findFirstOrThrow
   */
  export type VerificationRequirementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationRequirement
     */
    select?: VerificationRequirementSelect<ExtArgs> | null
    /**
     * Filter, which VerificationRequirement to fetch.
     */
    where?: VerificationRequirementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationRequirements to fetch.
     */
    orderBy?: VerificationRequirementOrderByWithRelationInput | VerificationRequirementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationRequirements.
     */
    cursor?: VerificationRequirementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationRequirements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationRequirements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationRequirements.
     */
    distinct?: VerificationRequirementScalarFieldEnum | VerificationRequirementScalarFieldEnum[]
  }

  /**
   * VerificationRequirement findMany
   */
  export type VerificationRequirementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationRequirement
     */
    select?: VerificationRequirementSelect<ExtArgs> | null
    /**
     * Filter, which VerificationRequirements to fetch.
     */
    where?: VerificationRequirementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationRequirements to fetch.
     */
    orderBy?: VerificationRequirementOrderByWithRelationInput | VerificationRequirementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationRequirements.
     */
    cursor?: VerificationRequirementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationRequirements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationRequirements.
     */
    skip?: number
    distinct?: VerificationRequirementScalarFieldEnum | VerificationRequirementScalarFieldEnum[]
  }

  /**
   * VerificationRequirement create
   */
  export type VerificationRequirementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationRequirement
     */
    select?: VerificationRequirementSelect<ExtArgs> | null
    /**
     * The data needed to create a VerificationRequirement.
     */
    data: XOR<VerificationRequirementCreateInput, VerificationRequirementUncheckedCreateInput>
  }

  /**
   * VerificationRequirement createMany
   */
  export type VerificationRequirementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationRequirements.
     */
    data: VerificationRequirementCreateManyInput | VerificationRequirementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationRequirement createManyAndReturn
   */
  export type VerificationRequirementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationRequirement
     */
    select?: VerificationRequirementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many VerificationRequirements.
     */
    data: VerificationRequirementCreateManyInput | VerificationRequirementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationRequirement update
   */
  export type VerificationRequirementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationRequirement
     */
    select?: VerificationRequirementSelect<ExtArgs> | null
    /**
     * The data needed to update a VerificationRequirement.
     */
    data: XOR<VerificationRequirementUpdateInput, VerificationRequirementUncheckedUpdateInput>
    /**
     * Choose, which VerificationRequirement to update.
     */
    where: VerificationRequirementWhereUniqueInput
  }

  /**
   * VerificationRequirement updateMany
   */
  export type VerificationRequirementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationRequirements.
     */
    data: XOR<VerificationRequirementUpdateManyMutationInput, VerificationRequirementUncheckedUpdateManyInput>
    /**
     * Filter which VerificationRequirements to update
     */
    where?: VerificationRequirementWhereInput
  }

  /**
   * VerificationRequirement upsert
   */
  export type VerificationRequirementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationRequirement
     */
    select?: VerificationRequirementSelect<ExtArgs> | null
    /**
     * The filter to search for the VerificationRequirement to update in case it exists.
     */
    where: VerificationRequirementWhereUniqueInput
    /**
     * In case the VerificationRequirement found by the `where` argument doesn't exist, create a new VerificationRequirement with this data.
     */
    create: XOR<VerificationRequirementCreateInput, VerificationRequirementUncheckedCreateInput>
    /**
     * In case the VerificationRequirement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationRequirementUpdateInput, VerificationRequirementUncheckedUpdateInput>
  }

  /**
   * VerificationRequirement delete
   */
  export type VerificationRequirementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationRequirement
     */
    select?: VerificationRequirementSelect<ExtArgs> | null
    /**
     * Filter which VerificationRequirement to delete.
     */
    where: VerificationRequirementWhereUniqueInput
  }

  /**
   * VerificationRequirement deleteMany
   */
  export type VerificationRequirementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationRequirements to delete
     */
    where?: VerificationRequirementWhereInput
  }

  /**
   * VerificationRequirement without action
   */
  export type VerificationRequirementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationRequirement
     */
    select?: VerificationRequirementSelect<ExtArgs> | null
  }


  /**
   * Model AuditEntry
   */

  export type AggregateAuditEntry = {
    _count: AuditEntryCountAggregateOutputType | null
    _min: AuditEntryMinAggregateOutputType | null
    _max: AuditEntryMaxAggregateOutputType | null
  }

  export type AuditEntryMinAggregateOutputType = {
    id: string | null
    actor: string | null
    action: string | null
    target: string | null
    tone: $Enums.AuditTone | null
    createdAt: Date | null
  }

  export type AuditEntryMaxAggregateOutputType = {
    id: string | null
    actor: string | null
    action: string | null
    target: string | null
    tone: $Enums.AuditTone | null
    createdAt: Date | null
  }

  export type AuditEntryCountAggregateOutputType = {
    id: number
    actor: number
    action: number
    target: number
    tone: number
    createdAt: number
    _all: number
  }


  export type AuditEntryMinAggregateInputType = {
    id?: true
    actor?: true
    action?: true
    target?: true
    tone?: true
    createdAt?: true
  }

  export type AuditEntryMaxAggregateInputType = {
    id?: true
    actor?: true
    action?: true
    target?: true
    tone?: true
    createdAt?: true
  }

  export type AuditEntryCountAggregateInputType = {
    id?: true
    actor?: true
    action?: true
    target?: true
    tone?: true
    createdAt?: true
    _all?: true
  }

  export type AuditEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditEntry to aggregate.
     */
    where?: AuditEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEntries to fetch.
     */
    orderBy?: AuditEntryOrderByWithRelationInput | AuditEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditEntries
    **/
    _count?: true | AuditEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditEntryMaxAggregateInputType
  }

  export type GetAuditEntryAggregateType<T extends AuditEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditEntry[P]>
      : GetScalarType<T[P], AggregateAuditEntry[P]>
  }




  export type AuditEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditEntryWhereInput
    orderBy?: AuditEntryOrderByWithAggregationInput | AuditEntryOrderByWithAggregationInput[]
    by: AuditEntryScalarFieldEnum[] | AuditEntryScalarFieldEnum
    having?: AuditEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditEntryCountAggregateInputType | true
    _min?: AuditEntryMinAggregateInputType
    _max?: AuditEntryMaxAggregateInputType
  }

  export type AuditEntryGroupByOutputType = {
    id: string
    actor: string
    action: string
    target: string
    tone: $Enums.AuditTone
    createdAt: Date
    _count: AuditEntryCountAggregateOutputType | null
    _min: AuditEntryMinAggregateOutputType | null
    _max: AuditEntryMaxAggregateOutputType | null
  }

  type GetAuditEntryGroupByPayload<T extends AuditEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditEntryGroupByOutputType[P]>
            : GetScalarType<T[P], AuditEntryGroupByOutputType[P]>
        }
      >
    >


  export type AuditEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actor?: boolean
    action?: boolean
    target?: boolean
    tone?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditEntry"]>

  export type AuditEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actor?: boolean
    action?: boolean
    target?: boolean
    tone?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditEntry"]>

  export type AuditEntrySelectScalar = {
    id?: boolean
    actor?: boolean
    action?: boolean
    target?: boolean
    tone?: boolean
    createdAt?: boolean
  }


  export type $AuditEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditEntry"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      actor: string
      action: string
      target: string
      tone: $Enums.AuditTone
      createdAt: Date
    }, ExtArgs["result"]["auditEntry"]>
    composites: {}
  }

  type AuditEntryGetPayload<S extends boolean | null | undefined | AuditEntryDefaultArgs> = $Result.GetResult<Prisma.$AuditEntryPayload, S>

  type AuditEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditEntryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditEntryCountAggregateInputType | true
    }

  export interface AuditEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditEntry'], meta: { name: 'AuditEntry' } }
    /**
     * Find zero or one AuditEntry that matches the filter.
     * @param {AuditEntryFindUniqueArgs} args - Arguments to find a AuditEntry
     * @example
     * // Get one AuditEntry
     * const auditEntry = await prisma.auditEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditEntryFindUniqueArgs>(args: SelectSubset<T, AuditEntryFindUniqueArgs<ExtArgs>>): Prisma__AuditEntryClient<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditEntry that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditEntryFindUniqueOrThrowArgs} args - Arguments to find a AuditEntry
     * @example
     * // Get one AuditEntry
     * const auditEntry = await prisma.auditEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditEntryClient<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEntryFindFirstArgs} args - Arguments to find a AuditEntry
     * @example
     * // Get one AuditEntry
     * const auditEntry = await prisma.auditEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditEntryFindFirstArgs>(args?: SelectSubset<T, AuditEntryFindFirstArgs<ExtArgs>>): Prisma__AuditEntryClient<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEntryFindFirstOrThrowArgs} args - Arguments to find a AuditEntry
     * @example
     * // Get one AuditEntry
     * const auditEntry = await prisma.auditEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditEntryClient<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditEntries
     * const auditEntries = await prisma.auditEntry.findMany()
     * 
     * // Get first 10 AuditEntries
     * const auditEntries = await prisma.auditEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditEntryWithIdOnly = await prisma.auditEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditEntryFindManyArgs>(args?: SelectSubset<T, AuditEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditEntry.
     * @param {AuditEntryCreateArgs} args - Arguments to create a AuditEntry.
     * @example
     * // Create one AuditEntry
     * const AuditEntry = await prisma.auditEntry.create({
     *   data: {
     *     // ... data to create a AuditEntry
     *   }
     * })
     * 
     */
    create<T extends AuditEntryCreateArgs>(args: SelectSubset<T, AuditEntryCreateArgs<ExtArgs>>): Prisma__AuditEntryClient<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditEntries.
     * @param {AuditEntryCreateManyArgs} args - Arguments to create many AuditEntries.
     * @example
     * // Create many AuditEntries
     * const auditEntry = await prisma.auditEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditEntryCreateManyArgs>(args?: SelectSubset<T, AuditEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditEntries and returns the data saved in the database.
     * @param {AuditEntryCreateManyAndReturnArgs} args - Arguments to create many AuditEntries.
     * @example
     * // Create many AuditEntries
     * const auditEntry = await prisma.auditEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditEntries and only return the `id`
     * const auditEntryWithIdOnly = await prisma.auditEntry.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditEntry.
     * @param {AuditEntryDeleteArgs} args - Arguments to delete one AuditEntry.
     * @example
     * // Delete one AuditEntry
     * const AuditEntry = await prisma.auditEntry.delete({
     *   where: {
     *     // ... filter to delete one AuditEntry
     *   }
     * })
     * 
     */
    delete<T extends AuditEntryDeleteArgs>(args: SelectSubset<T, AuditEntryDeleteArgs<ExtArgs>>): Prisma__AuditEntryClient<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditEntry.
     * @param {AuditEntryUpdateArgs} args - Arguments to update one AuditEntry.
     * @example
     * // Update one AuditEntry
     * const auditEntry = await prisma.auditEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditEntryUpdateArgs>(args: SelectSubset<T, AuditEntryUpdateArgs<ExtArgs>>): Prisma__AuditEntryClient<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditEntries.
     * @param {AuditEntryDeleteManyArgs} args - Arguments to filter AuditEntries to delete.
     * @example
     * // Delete a few AuditEntries
     * const { count } = await prisma.auditEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditEntryDeleteManyArgs>(args?: SelectSubset<T, AuditEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditEntries
     * const auditEntry = await prisma.auditEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditEntryUpdateManyArgs>(args: SelectSubset<T, AuditEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditEntry.
     * @param {AuditEntryUpsertArgs} args - Arguments to update or create a AuditEntry.
     * @example
     * // Update or create a AuditEntry
     * const auditEntry = await prisma.auditEntry.upsert({
     *   create: {
     *     // ... data to create a AuditEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditEntry we want to update
     *   }
     * })
     */
    upsert<T extends AuditEntryUpsertArgs>(args: SelectSubset<T, AuditEntryUpsertArgs<ExtArgs>>): Prisma__AuditEntryClient<$Result.GetResult<Prisma.$AuditEntryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEntryCountArgs} args - Arguments to filter AuditEntries to count.
     * @example
     * // Count the number of AuditEntries
     * const count = await prisma.auditEntry.count({
     *   where: {
     *     // ... the filter for the AuditEntries we want to count
     *   }
     * })
    **/
    count<T extends AuditEntryCountArgs>(
      args?: Subset<T, AuditEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditEntryAggregateArgs>(args: Subset<T, AuditEntryAggregateArgs>): Prisma.PrismaPromise<GetAuditEntryAggregateType<T>>

    /**
     * Group by AuditEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEntryGroupByArgs} args - Group by arguments.
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
      T extends AuditEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditEntryGroupByArgs['orderBy'] }
        : { orderBy?: AuditEntryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditEntry model
   */
  readonly fields: AuditEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AuditEntry model
   */ 
  interface AuditEntryFieldRefs {
    readonly id: FieldRef<"AuditEntry", 'String'>
    readonly actor: FieldRef<"AuditEntry", 'String'>
    readonly action: FieldRef<"AuditEntry", 'String'>
    readonly target: FieldRef<"AuditEntry", 'String'>
    readonly tone: FieldRef<"AuditEntry", 'AuditTone'>
    readonly createdAt: FieldRef<"AuditEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditEntry findUnique
   */
  export type AuditEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Filter, which AuditEntry to fetch.
     */
    where: AuditEntryWhereUniqueInput
  }

  /**
   * AuditEntry findUniqueOrThrow
   */
  export type AuditEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Filter, which AuditEntry to fetch.
     */
    where: AuditEntryWhereUniqueInput
  }

  /**
   * AuditEntry findFirst
   */
  export type AuditEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Filter, which AuditEntry to fetch.
     */
    where?: AuditEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEntries to fetch.
     */
    orderBy?: AuditEntryOrderByWithRelationInput | AuditEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditEntries.
     */
    cursor?: AuditEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditEntries.
     */
    distinct?: AuditEntryScalarFieldEnum | AuditEntryScalarFieldEnum[]
  }

  /**
   * AuditEntry findFirstOrThrow
   */
  export type AuditEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Filter, which AuditEntry to fetch.
     */
    where?: AuditEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEntries to fetch.
     */
    orderBy?: AuditEntryOrderByWithRelationInput | AuditEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditEntries.
     */
    cursor?: AuditEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditEntries.
     */
    distinct?: AuditEntryScalarFieldEnum | AuditEntryScalarFieldEnum[]
  }

  /**
   * AuditEntry findMany
   */
  export type AuditEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Filter, which AuditEntries to fetch.
     */
    where?: AuditEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEntries to fetch.
     */
    orderBy?: AuditEntryOrderByWithRelationInput | AuditEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditEntries.
     */
    cursor?: AuditEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEntries.
     */
    skip?: number
    distinct?: AuditEntryScalarFieldEnum | AuditEntryScalarFieldEnum[]
  }

  /**
   * AuditEntry create
   */
  export type AuditEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * The data needed to create a AuditEntry.
     */
    data: XOR<AuditEntryCreateInput, AuditEntryUncheckedCreateInput>
  }

  /**
   * AuditEntry createMany
   */
  export type AuditEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditEntries.
     */
    data: AuditEntryCreateManyInput | AuditEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditEntry createManyAndReturn
   */
  export type AuditEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditEntries.
     */
    data: AuditEntryCreateManyInput | AuditEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditEntry update
   */
  export type AuditEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * The data needed to update a AuditEntry.
     */
    data: XOR<AuditEntryUpdateInput, AuditEntryUncheckedUpdateInput>
    /**
     * Choose, which AuditEntry to update.
     */
    where: AuditEntryWhereUniqueInput
  }

  /**
   * AuditEntry updateMany
   */
  export type AuditEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditEntries.
     */
    data: XOR<AuditEntryUpdateManyMutationInput, AuditEntryUncheckedUpdateManyInput>
    /**
     * Filter which AuditEntries to update
     */
    where?: AuditEntryWhereInput
  }

  /**
   * AuditEntry upsert
   */
  export type AuditEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * The filter to search for the AuditEntry to update in case it exists.
     */
    where: AuditEntryWhereUniqueInput
    /**
     * In case the AuditEntry found by the `where` argument doesn't exist, create a new AuditEntry with this data.
     */
    create: XOR<AuditEntryCreateInput, AuditEntryUncheckedCreateInput>
    /**
     * In case the AuditEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditEntryUpdateInput, AuditEntryUncheckedUpdateInput>
  }

  /**
   * AuditEntry delete
   */
  export type AuditEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
    /**
     * Filter which AuditEntry to delete.
     */
    where: AuditEntryWhereUniqueInput
  }

  /**
   * AuditEntry deleteMany
   */
  export type AuditEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditEntries to delete
     */
    where?: AuditEntryWhereInput
  }

  /**
   * AuditEntry without action
   */
  export type AuditEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEntry
     */
    select?: AuditEntrySelect<ExtArgs> | null
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


  export const PlatformSettingsScalarFieldEnum: {
    id: 'id',
    orgName: 'orgName',
    supportEmail: 'supportEmail',
    region: 'region',
    enforceMfa: 'enforceMfa',
    ipAllowlist: 'ipAllowlist',
    ssoEnabled: 'ssoEnabled',
    sessionTimeout: 'sessionTimeout',
    notifyRisk: 'notifyRisk',
    notifySettlements: 'notifySettlements',
    notifyDigest: 'notifyDigest',
    updatedAt: 'updatedAt'
  };

  export type PlatformSettingsScalarFieldEnum = (typeof PlatformSettingsScalarFieldEnum)[keyof typeof PlatformSettingsScalarFieldEnum]


  export const AdminMemberScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    roleName: 'roleName',
    mfaEnabled: 'mfaEnabled',
    lastActiveAt: 'lastActiveAt',
    createdAt: 'createdAt'
  };

  export type AdminMemberScalarFieldEnum = (typeof AdminMemberScalarFieldEnum)[keyof typeof AdminMemberScalarFieldEnum]


  export const RbacRoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    memberCount: 'memberCount',
    permissions: 'permissions',
    tone: 'tone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RbacRoleScalarFieldEnum = (typeof RbacRoleScalarFieldEnum)[keyof typeof RbacRoleScalarFieldEnum]


  export const FeatureFlagScalarFieldEnum: {
    id: 'id',
    key: 'key',
    name: 'name',
    description: 'description',
    enabled: 'enabled',
    scope: 'scope',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  };

  export type FeatureFlagScalarFieldEnum = (typeof FeatureFlagScalarFieldEnum)[keyof typeof FeatureFlagScalarFieldEnum]


  export const VerificationRequirementScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    label: 'label',
    description: 'description',
    category: 'category',
    inputType: 'inputType',
    fieldKey: 'fieldKey',
    stepKey: 'stepKey',
    valueFormat: 'valueFormat',
    placeholder: 'placeholder',
    accept: 'accept',
    sortOrder: 'sortOrder',
    targetBusiness: 'targetBusiness',
    targetDeveloper: 'targetDeveloper',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationRequirementScalarFieldEnum = (typeof VerificationRequirementScalarFieldEnum)[keyof typeof VerificationRequirementScalarFieldEnum]


  export const AuditEntryScalarFieldEnum: {
    id: 'id',
    actor: 'actor',
    action: 'action',
    target: 'target',
    tone: 'tone',
    createdAt: 'createdAt'
  };

  export type AuditEntryScalarFieldEnum = (typeof AuditEntryScalarFieldEnum)[keyof typeof AuditEntryScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'RoleTone'
   */
  export type EnumRoleToneFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoleTone'>
    


  /**
   * Reference to a field of type 'RoleTone[]'
   */
  export type ListEnumRoleToneFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoleTone[]'>
    


  /**
   * Reference to a field of type 'VerificationCategory'
   */
  export type EnumVerificationCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationCategory'>
    


  /**
   * Reference to a field of type 'VerificationCategory[]'
   */
  export type ListEnumVerificationCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerificationCategory[]'>
    


  /**
   * Reference to a field of type 'RequirementInputType'
   */
  export type EnumRequirementInputTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequirementInputType'>
    


  /**
   * Reference to a field of type 'RequirementInputType[]'
   */
  export type ListEnumRequirementInputTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequirementInputType[]'>
    


  /**
   * Reference to a field of type 'AuditTone'
   */
  export type EnumAuditToneFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditTone'>
    


  /**
   * Reference to a field of type 'AuditTone[]'
   */
  export type ListEnumAuditToneFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditTone[]'>
    


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


  export type PlatformSettingsWhereInput = {
    AND?: PlatformSettingsWhereInput | PlatformSettingsWhereInput[]
    OR?: PlatformSettingsWhereInput[]
    NOT?: PlatformSettingsWhereInput | PlatformSettingsWhereInput[]
    id?: StringFilter<"PlatformSettings"> | string
    orgName?: StringFilter<"PlatformSettings"> | string
    supportEmail?: StringFilter<"PlatformSettings"> | string
    region?: StringFilter<"PlatformSettings"> | string
    enforceMfa?: BoolFilter<"PlatformSettings"> | boolean
    ipAllowlist?: BoolFilter<"PlatformSettings"> | boolean
    ssoEnabled?: BoolFilter<"PlatformSettings"> | boolean
    sessionTimeout?: BoolFilter<"PlatformSettings"> | boolean
    notifyRisk?: BoolFilter<"PlatformSettings"> | boolean
    notifySettlements?: BoolFilter<"PlatformSettings"> | boolean
    notifyDigest?: BoolFilter<"PlatformSettings"> | boolean
    updatedAt?: DateTimeFilter<"PlatformSettings"> | Date | string
  }

  export type PlatformSettingsOrderByWithRelationInput = {
    id?: SortOrder
    orgName?: SortOrder
    supportEmail?: SortOrder
    region?: SortOrder
    enforceMfa?: SortOrder
    ipAllowlist?: SortOrder
    ssoEnabled?: SortOrder
    sessionTimeout?: SortOrder
    notifyRisk?: SortOrder
    notifySettlements?: SortOrder
    notifyDigest?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlatformSettingsWhereInput | PlatformSettingsWhereInput[]
    OR?: PlatformSettingsWhereInput[]
    NOT?: PlatformSettingsWhereInput | PlatformSettingsWhereInput[]
    orgName?: StringFilter<"PlatformSettings"> | string
    supportEmail?: StringFilter<"PlatformSettings"> | string
    region?: StringFilter<"PlatformSettings"> | string
    enforceMfa?: BoolFilter<"PlatformSettings"> | boolean
    ipAllowlist?: BoolFilter<"PlatformSettings"> | boolean
    ssoEnabled?: BoolFilter<"PlatformSettings"> | boolean
    sessionTimeout?: BoolFilter<"PlatformSettings"> | boolean
    notifyRisk?: BoolFilter<"PlatformSettings"> | boolean
    notifySettlements?: BoolFilter<"PlatformSettings"> | boolean
    notifyDigest?: BoolFilter<"PlatformSettings"> | boolean
    updatedAt?: DateTimeFilter<"PlatformSettings"> | Date | string
  }, "id">

  export type PlatformSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    orgName?: SortOrder
    supportEmail?: SortOrder
    region?: SortOrder
    enforceMfa?: SortOrder
    ipAllowlist?: SortOrder
    ssoEnabled?: SortOrder
    sessionTimeout?: SortOrder
    notifyRisk?: SortOrder
    notifySettlements?: SortOrder
    notifyDigest?: SortOrder
    updatedAt?: SortOrder
    _count?: PlatformSettingsCountOrderByAggregateInput
    _max?: PlatformSettingsMaxOrderByAggregateInput
    _min?: PlatformSettingsMinOrderByAggregateInput
  }

  export type PlatformSettingsScalarWhereWithAggregatesInput = {
    AND?: PlatformSettingsScalarWhereWithAggregatesInput | PlatformSettingsScalarWhereWithAggregatesInput[]
    OR?: PlatformSettingsScalarWhereWithAggregatesInput[]
    NOT?: PlatformSettingsScalarWhereWithAggregatesInput | PlatformSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlatformSettings"> | string
    orgName?: StringWithAggregatesFilter<"PlatformSettings"> | string
    supportEmail?: StringWithAggregatesFilter<"PlatformSettings"> | string
    region?: StringWithAggregatesFilter<"PlatformSettings"> | string
    enforceMfa?: BoolWithAggregatesFilter<"PlatformSettings"> | boolean
    ipAllowlist?: BoolWithAggregatesFilter<"PlatformSettings"> | boolean
    ssoEnabled?: BoolWithAggregatesFilter<"PlatformSettings"> | boolean
    sessionTimeout?: BoolWithAggregatesFilter<"PlatformSettings"> | boolean
    notifyRisk?: BoolWithAggregatesFilter<"PlatformSettings"> | boolean
    notifySettlements?: BoolWithAggregatesFilter<"PlatformSettings"> | boolean
    notifyDigest?: BoolWithAggregatesFilter<"PlatformSettings"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"PlatformSettings"> | Date | string
  }

  export type AdminMemberWhereInput = {
    AND?: AdminMemberWhereInput | AdminMemberWhereInput[]
    OR?: AdminMemberWhereInput[]
    NOT?: AdminMemberWhereInput | AdminMemberWhereInput[]
    id?: StringFilter<"AdminMember"> | string
    name?: StringFilter<"AdminMember"> | string
    email?: StringFilter<"AdminMember"> | string
    roleName?: StringFilter<"AdminMember"> | string
    mfaEnabled?: BoolFilter<"AdminMember"> | boolean
    lastActiveAt?: DateTimeFilter<"AdminMember"> | Date | string
    createdAt?: DateTimeFilter<"AdminMember"> | Date | string
  }

  export type AdminMemberOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    roleName?: SortOrder
    mfaEnabled?: SortOrder
    lastActiveAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: AdminMemberWhereInput | AdminMemberWhereInput[]
    OR?: AdminMemberWhereInput[]
    NOT?: AdminMemberWhereInput | AdminMemberWhereInput[]
    name?: StringFilter<"AdminMember"> | string
    roleName?: StringFilter<"AdminMember"> | string
    mfaEnabled?: BoolFilter<"AdminMember"> | boolean
    lastActiveAt?: DateTimeFilter<"AdminMember"> | Date | string
    createdAt?: DateTimeFilter<"AdminMember"> | Date | string
  }, "id" | "email">

  export type AdminMemberOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    roleName?: SortOrder
    mfaEnabled?: SortOrder
    lastActiveAt?: SortOrder
    createdAt?: SortOrder
    _count?: AdminMemberCountOrderByAggregateInput
    _max?: AdminMemberMaxOrderByAggregateInput
    _min?: AdminMemberMinOrderByAggregateInput
  }

  export type AdminMemberScalarWhereWithAggregatesInput = {
    AND?: AdminMemberScalarWhereWithAggregatesInput | AdminMemberScalarWhereWithAggregatesInput[]
    OR?: AdminMemberScalarWhereWithAggregatesInput[]
    NOT?: AdminMemberScalarWhereWithAggregatesInput | AdminMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminMember"> | string
    name?: StringWithAggregatesFilter<"AdminMember"> | string
    email?: StringWithAggregatesFilter<"AdminMember"> | string
    roleName?: StringWithAggregatesFilter<"AdminMember"> | string
    mfaEnabled?: BoolWithAggregatesFilter<"AdminMember"> | boolean
    lastActiveAt?: DateTimeWithAggregatesFilter<"AdminMember"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"AdminMember"> | Date | string
  }

  export type RbacRoleWhereInput = {
    AND?: RbacRoleWhereInput | RbacRoleWhereInput[]
    OR?: RbacRoleWhereInput[]
    NOT?: RbacRoleWhereInput | RbacRoleWhereInput[]
    id?: StringFilter<"RbacRole"> | string
    name?: StringFilter<"RbacRole"> | string
    memberCount?: IntFilter<"RbacRole"> | number
    permissions?: JsonFilter<"RbacRole">
    tone?: EnumRoleToneFilter<"RbacRole"> | $Enums.RoleTone
    createdAt?: DateTimeFilter<"RbacRole"> | Date | string
    updatedAt?: DateTimeFilter<"RbacRole"> | Date | string
  }

  export type RbacRoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    memberCount?: SortOrder
    permissions?: SortOrder
    tone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RbacRoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: RbacRoleWhereInput | RbacRoleWhereInput[]
    OR?: RbacRoleWhereInput[]
    NOT?: RbacRoleWhereInput | RbacRoleWhereInput[]
    memberCount?: IntFilter<"RbacRole"> | number
    permissions?: JsonFilter<"RbacRole">
    tone?: EnumRoleToneFilter<"RbacRole"> | $Enums.RoleTone
    createdAt?: DateTimeFilter<"RbacRole"> | Date | string
    updatedAt?: DateTimeFilter<"RbacRole"> | Date | string
  }, "id" | "name">

  export type RbacRoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    memberCount?: SortOrder
    permissions?: SortOrder
    tone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RbacRoleCountOrderByAggregateInput
    _avg?: RbacRoleAvgOrderByAggregateInput
    _max?: RbacRoleMaxOrderByAggregateInput
    _min?: RbacRoleMinOrderByAggregateInput
    _sum?: RbacRoleSumOrderByAggregateInput
  }

  export type RbacRoleScalarWhereWithAggregatesInput = {
    AND?: RbacRoleScalarWhereWithAggregatesInput | RbacRoleScalarWhereWithAggregatesInput[]
    OR?: RbacRoleScalarWhereWithAggregatesInput[]
    NOT?: RbacRoleScalarWhereWithAggregatesInput | RbacRoleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RbacRole"> | string
    name?: StringWithAggregatesFilter<"RbacRole"> | string
    memberCount?: IntWithAggregatesFilter<"RbacRole"> | number
    permissions?: JsonWithAggregatesFilter<"RbacRole">
    tone?: EnumRoleToneWithAggregatesFilter<"RbacRole"> | $Enums.RoleTone
    createdAt?: DateTimeWithAggregatesFilter<"RbacRole"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RbacRole"> | Date | string
  }

  export type FeatureFlagWhereInput = {
    AND?: FeatureFlagWhereInput | FeatureFlagWhereInput[]
    OR?: FeatureFlagWhereInput[]
    NOT?: FeatureFlagWhereInput | FeatureFlagWhereInput[]
    id?: StringFilter<"FeatureFlag"> | string
    key?: StringFilter<"FeatureFlag"> | string
    name?: StringFilter<"FeatureFlag"> | string
    description?: StringFilter<"FeatureFlag"> | string
    enabled?: BoolFilter<"FeatureFlag"> | boolean
    scope?: StringFilter<"FeatureFlag"> | string
    updatedAt?: DateTimeFilter<"FeatureFlag"> | Date | string
    createdAt?: DateTimeFilter<"FeatureFlag"> | Date | string
  }

  export type FeatureFlagOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    description?: SortOrder
    enabled?: SortOrder
    scope?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type FeatureFlagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: FeatureFlagWhereInput | FeatureFlagWhereInput[]
    OR?: FeatureFlagWhereInput[]
    NOT?: FeatureFlagWhereInput | FeatureFlagWhereInput[]
    name?: StringFilter<"FeatureFlag"> | string
    description?: StringFilter<"FeatureFlag"> | string
    enabled?: BoolFilter<"FeatureFlag"> | boolean
    scope?: StringFilter<"FeatureFlag"> | string
    updatedAt?: DateTimeFilter<"FeatureFlag"> | Date | string
    createdAt?: DateTimeFilter<"FeatureFlag"> | Date | string
  }, "id" | "key">

  export type FeatureFlagOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    description?: SortOrder
    enabled?: SortOrder
    scope?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    _count?: FeatureFlagCountOrderByAggregateInput
    _max?: FeatureFlagMaxOrderByAggregateInput
    _min?: FeatureFlagMinOrderByAggregateInput
  }

  export type FeatureFlagScalarWhereWithAggregatesInput = {
    AND?: FeatureFlagScalarWhereWithAggregatesInput | FeatureFlagScalarWhereWithAggregatesInput[]
    OR?: FeatureFlagScalarWhereWithAggregatesInput[]
    NOT?: FeatureFlagScalarWhereWithAggregatesInput | FeatureFlagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FeatureFlag"> | string
    key?: StringWithAggregatesFilter<"FeatureFlag"> | string
    name?: StringWithAggregatesFilter<"FeatureFlag"> | string
    description?: StringWithAggregatesFilter<"FeatureFlag"> | string
    enabled?: BoolWithAggregatesFilter<"FeatureFlag"> | boolean
    scope?: StringWithAggregatesFilter<"FeatureFlag"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"FeatureFlag"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"FeatureFlag"> | Date | string
  }

  export type VerificationRequirementWhereInput = {
    AND?: VerificationRequirementWhereInput | VerificationRequirementWhereInput[]
    OR?: VerificationRequirementWhereInput[]
    NOT?: VerificationRequirementWhereInput | VerificationRequirementWhereInput[]
    id?: StringFilter<"VerificationRequirement"> | string
    slug?: StringFilter<"VerificationRequirement"> | string
    label?: StringFilter<"VerificationRequirement"> | string
    description?: StringFilter<"VerificationRequirement"> | string
    category?: EnumVerificationCategoryFilter<"VerificationRequirement"> | $Enums.VerificationCategory
    inputType?: EnumRequirementInputTypeFilter<"VerificationRequirement"> | $Enums.RequirementInputType
    fieldKey?: StringFilter<"VerificationRequirement"> | string
    stepKey?: StringFilter<"VerificationRequirement"> | string
    valueFormat?: StringNullableFilter<"VerificationRequirement"> | string | null
    placeholder?: StringNullableFilter<"VerificationRequirement"> | string | null
    accept?: StringNullableFilter<"VerificationRequirement"> | string | null
    sortOrder?: IntFilter<"VerificationRequirement"> | number
    targetBusiness?: BoolFilter<"VerificationRequirement"> | boolean
    targetDeveloper?: BoolFilter<"VerificationRequirement"> | boolean
    isActive?: BoolFilter<"VerificationRequirement"> | boolean
    createdAt?: DateTimeFilter<"VerificationRequirement"> | Date | string
    updatedAt?: DateTimeFilter<"VerificationRequirement"> | Date | string
  }

  export type VerificationRequirementOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    label?: SortOrder
    description?: SortOrder
    category?: SortOrder
    inputType?: SortOrder
    fieldKey?: SortOrder
    stepKey?: SortOrder
    valueFormat?: SortOrderInput | SortOrder
    placeholder?: SortOrderInput | SortOrder
    accept?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    targetBusiness?: SortOrder
    targetDeveloper?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationRequirementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: VerificationRequirementWhereInput | VerificationRequirementWhereInput[]
    OR?: VerificationRequirementWhereInput[]
    NOT?: VerificationRequirementWhereInput | VerificationRequirementWhereInput[]
    label?: StringFilter<"VerificationRequirement"> | string
    description?: StringFilter<"VerificationRequirement"> | string
    category?: EnumVerificationCategoryFilter<"VerificationRequirement"> | $Enums.VerificationCategory
    inputType?: EnumRequirementInputTypeFilter<"VerificationRequirement"> | $Enums.RequirementInputType
    fieldKey?: StringFilter<"VerificationRequirement"> | string
    stepKey?: StringFilter<"VerificationRequirement"> | string
    valueFormat?: StringNullableFilter<"VerificationRequirement"> | string | null
    placeholder?: StringNullableFilter<"VerificationRequirement"> | string | null
    accept?: StringNullableFilter<"VerificationRequirement"> | string | null
    sortOrder?: IntFilter<"VerificationRequirement"> | number
    targetBusiness?: BoolFilter<"VerificationRequirement"> | boolean
    targetDeveloper?: BoolFilter<"VerificationRequirement"> | boolean
    isActive?: BoolFilter<"VerificationRequirement"> | boolean
    createdAt?: DateTimeFilter<"VerificationRequirement"> | Date | string
    updatedAt?: DateTimeFilter<"VerificationRequirement"> | Date | string
  }, "id" | "slug">

  export type VerificationRequirementOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    label?: SortOrder
    description?: SortOrder
    category?: SortOrder
    inputType?: SortOrder
    fieldKey?: SortOrder
    stepKey?: SortOrder
    valueFormat?: SortOrderInput | SortOrder
    placeholder?: SortOrderInput | SortOrder
    accept?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    targetBusiness?: SortOrder
    targetDeveloper?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationRequirementCountOrderByAggregateInput
    _avg?: VerificationRequirementAvgOrderByAggregateInput
    _max?: VerificationRequirementMaxOrderByAggregateInput
    _min?: VerificationRequirementMinOrderByAggregateInput
    _sum?: VerificationRequirementSumOrderByAggregateInput
  }

  export type VerificationRequirementScalarWhereWithAggregatesInput = {
    AND?: VerificationRequirementScalarWhereWithAggregatesInput | VerificationRequirementScalarWhereWithAggregatesInput[]
    OR?: VerificationRequirementScalarWhereWithAggregatesInput[]
    NOT?: VerificationRequirementScalarWhereWithAggregatesInput | VerificationRequirementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VerificationRequirement"> | string
    slug?: StringWithAggregatesFilter<"VerificationRequirement"> | string
    label?: StringWithAggregatesFilter<"VerificationRequirement"> | string
    description?: StringWithAggregatesFilter<"VerificationRequirement"> | string
    category?: EnumVerificationCategoryWithAggregatesFilter<"VerificationRequirement"> | $Enums.VerificationCategory
    inputType?: EnumRequirementInputTypeWithAggregatesFilter<"VerificationRequirement"> | $Enums.RequirementInputType
    fieldKey?: StringWithAggregatesFilter<"VerificationRequirement"> | string
    stepKey?: StringWithAggregatesFilter<"VerificationRequirement"> | string
    valueFormat?: StringNullableWithAggregatesFilter<"VerificationRequirement"> | string | null
    placeholder?: StringNullableWithAggregatesFilter<"VerificationRequirement"> | string | null
    accept?: StringNullableWithAggregatesFilter<"VerificationRequirement"> | string | null
    sortOrder?: IntWithAggregatesFilter<"VerificationRequirement"> | number
    targetBusiness?: BoolWithAggregatesFilter<"VerificationRequirement"> | boolean
    targetDeveloper?: BoolWithAggregatesFilter<"VerificationRequirement"> | boolean
    isActive?: BoolWithAggregatesFilter<"VerificationRequirement"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"VerificationRequirement"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VerificationRequirement"> | Date | string
  }

  export type AuditEntryWhereInput = {
    AND?: AuditEntryWhereInput | AuditEntryWhereInput[]
    OR?: AuditEntryWhereInput[]
    NOT?: AuditEntryWhereInput | AuditEntryWhereInput[]
    id?: StringFilter<"AuditEntry"> | string
    actor?: StringFilter<"AuditEntry"> | string
    action?: StringFilter<"AuditEntry"> | string
    target?: StringFilter<"AuditEntry"> | string
    tone?: EnumAuditToneFilter<"AuditEntry"> | $Enums.AuditTone
    createdAt?: DateTimeFilter<"AuditEntry"> | Date | string
  }

  export type AuditEntryOrderByWithRelationInput = {
    id?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    target?: SortOrder
    tone?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditEntryWhereInput | AuditEntryWhereInput[]
    OR?: AuditEntryWhereInput[]
    NOT?: AuditEntryWhereInput | AuditEntryWhereInput[]
    actor?: StringFilter<"AuditEntry"> | string
    action?: StringFilter<"AuditEntry"> | string
    target?: StringFilter<"AuditEntry"> | string
    tone?: EnumAuditToneFilter<"AuditEntry"> | $Enums.AuditTone
    createdAt?: DateTimeFilter<"AuditEntry"> | Date | string
  }, "id">

  export type AuditEntryOrderByWithAggregationInput = {
    id?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    target?: SortOrder
    tone?: SortOrder
    createdAt?: SortOrder
    _count?: AuditEntryCountOrderByAggregateInput
    _max?: AuditEntryMaxOrderByAggregateInput
    _min?: AuditEntryMinOrderByAggregateInput
  }

  export type AuditEntryScalarWhereWithAggregatesInput = {
    AND?: AuditEntryScalarWhereWithAggregatesInput | AuditEntryScalarWhereWithAggregatesInput[]
    OR?: AuditEntryScalarWhereWithAggregatesInput[]
    NOT?: AuditEntryScalarWhereWithAggregatesInput | AuditEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditEntry"> | string
    actor?: StringWithAggregatesFilter<"AuditEntry"> | string
    action?: StringWithAggregatesFilter<"AuditEntry"> | string
    target?: StringWithAggregatesFilter<"AuditEntry"> | string
    tone?: EnumAuditToneWithAggregatesFilter<"AuditEntry"> | $Enums.AuditTone
    createdAt?: DateTimeWithAggregatesFilter<"AuditEntry"> | Date | string
  }

  export type PlatformSettingsCreateInput = {
    id?: string
    orgName: string
    supportEmail: string
    region: string
    enforceMfa?: boolean
    ipAllowlist?: boolean
    ssoEnabled?: boolean
    sessionTimeout?: boolean
    notifyRisk?: boolean
    notifySettlements?: boolean
    notifyDigest?: boolean
    updatedAt?: Date | string
  }

  export type PlatformSettingsUncheckedCreateInput = {
    id?: string
    orgName: string
    supportEmail: string
    region: string
    enforceMfa?: boolean
    ipAllowlist?: boolean
    ssoEnabled?: boolean
    sessionTimeout?: boolean
    notifyRisk?: boolean
    notifySettlements?: boolean
    notifyDigest?: boolean
    updatedAt?: Date | string
  }

  export type PlatformSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgName?: StringFieldUpdateOperationsInput | string
    supportEmail?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    enforceMfa?: BoolFieldUpdateOperationsInput | boolean
    ipAllowlist?: BoolFieldUpdateOperationsInput | boolean
    ssoEnabled?: BoolFieldUpdateOperationsInput | boolean
    sessionTimeout?: BoolFieldUpdateOperationsInput | boolean
    notifyRisk?: BoolFieldUpdateOperationsInput | boolean
    notifySettlements?: BoolFieldUpdateOperationsInput | boolean
    notifyDigest?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgName?: StringFieldUpdateOperationsInput | string
    supportEmail?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    enforceMfa?: BoolFieldUpdateOperationsInput | boolean
    ipAllowlist?: BoolFieldUpdateOperationsInput | boolean
    ssoEnabled?: BoolFieldUpdateOperationsInput | boolean
    sessionTimeout?: BoolFieldUpdateOperationsInput | boolean
    notifyRisk?: BoolFieldUpdateOperationsInput | boolean
    notifySettlements?: BoolFieldUpdateOperationsInput | boolean
    notifyDigest?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformSettingsCreateManyInput = {
    id?: string
    orgName: string
    supportEmail: string
    region: string
    enforceMfa?: boolean
    ipAllowlist?: boolean
    ssoEnabled?: boolean
    sessionTimeout?: boolean
    notifyRisk?: boolean
    notifySettlements?: boolean
    notifyDigest?: boolean
    updatedAt?: Date | string
  }

  export type PlatformSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgName?: StringFieldUpdateOperationsInput | string
    supportEmail?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    enforceMfa?: BoolFieldUpdateOperationsInput | boolean
    ipAllowlist?: BoolFieldUpdateOperationsInput | boolean
    ssoEnabled?: BoolFieldUpdateOperationsInput | boolean
    sessionTimeout?: BoolFieldUpdateOperationsInput | boolean
    notifyRisk?: BoolFieldUpdateOperationsInput | boolean
    notifySettlements?: BoolFieldUpdateOperationsInput | boolean
    notifyDigest?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgName?: StringFieldUpdateOperationsInput | string
    supportEmail?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    enforceMfa?: BoolFieldUpdateOperationsInput | boolean
    ipAllowlist?: BoolFieldUpdateOperationsInput | boolean
    ssoEnabled?: BoolFieldUpdateOperationsInput | boolean
    sessionTimeout?: BoolFieldUpdateOperationsInput | boolean
    notifyRisk?: BoolFieldUpdateOperationsInput | boolean
    notifySettlements?: BoolFieldUpdateOperationsInput | boolean
    notifyDigest?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminMemberCreateInput = {
    id: string
    name: string
    email: string
    roleName: string
    mfaEnabled?: boolean
    lastActiveAt: Date | string
    createdAt?: Date | string
  }

  export type AdminMemberUncheckedCreateInput = {
    id: string
    name: string
    email: string
    roleName: string
    mfaEnabled?: boolean
    lastActiveAt: Date | string
    createdAt?: Date | string
  }

  export type AdminMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    roleName?: StringFieldUpdateOperationsInput | string
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    roleName?: StringFieldUpdateOperationsInput | string
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminMemberCreateManyInput = {
    id: string
    name: string
    email: string
    roleName: string
    mfaEnabled?: boolean
    lastActiveAt: Date | string
    createdAt?: Date | string
  }

  export type AdminMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    roleName?: StringFieldUpdateOperationsInput | string
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    roleName?: StringFieldUpdateOperationsInput | string
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RbacRoleCreateInput = {
    id: string
    name: string
    memberCount?: number
    permissions: JsonNullValueInput | InputJsonValue
    tone?: $Enums.RoleTone
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RbacRoleUncheckedCreateInput = {
    id: string
    name: string
    memberCount?: number
    permissions: JsonNullValueInput | InputJsonValue
    tone?: $Enums.RoleTone
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RbacRoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    memberCount?: IntFieldUpdateOperationsInput | number
    permissions?: JsonNullValueInput | InputJsonValue
    tone?: EnumRoleToneFieldUpdateOperationsInput | $Enums.RoleTone
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RbacRoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    memberCount?: IntFieldUpdateOperationsInput | number
    permissions?: JsonNullValueInput | InputJsonValue
    tone?: EnumRoleToneFieldUpdateOperationsInput | $Enums.RoleTone
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RbacRoleCreateManyInput = {
    id: string
    name: string
    memberCount?: number
    permissions: JsonNullValueInput | InputJsonValue
    tone?: $Enums.RoleTone
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RbacRoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    memberCount?: IntFieldUpdateOperationsInput | number
    permissions?: JsonNullValueInput | InputJsonValue
    tone?: EnumRoleToneFieldUpdateOperationsInput | $Enums.RoleTone
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RbacRoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    memberCount?: IntFieldUpdateOperationsInput | number
    permissions?: JsonNullValueInput | InputJsonValue
    tone?: EnumRoleToneFieldUpdateOperationsInput | $Enums.RoleTone
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagCreateInput = {
    id: string
    key: string
    name: string
    description: string
    enabled?: boolean
    scope: string
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type FeatureFlagUncheckedCreateInput = {
    id: string
    key: string
    name: string
    description: string
    enabled?: boolean
    scope: string
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type FeatureFlagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    scope?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    scope?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagCreateManyInput = {
    id: string
    key: string
    name: string
    description: string
    enabled?: boolean
    scope: string
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type FeatureFlagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    scope?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    scope?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationRequirementCreateInput = {
    id: string
    slug: string
    label: string
    description?: string
    category: $Enums.VerificationCategory
    inputType: $Enums.RequirementInputType
    fieldKey: string
    stepKey: string
    valueFormat?: string | null
    placeholder?: string | null
    accept?: string | null
    sortOrder?: number
    targetBusiness?: boolean
    targetDeveloper?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationRequirementUncheckedCreateInput = {
    id: string
    slug: string
    label: string
    description?: string
    category: $Enums.VerificationCategory
    inputType: $Enums.RequirementInputType
    fieldKey: string
    stepKey: string
    valueFormat?: string | null
    placeholder?: string | null
    accept?: string | null
    sortOrder?: number
    targetBusiness?: boolean
    targetDeveloper?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationRequirementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumVerificationCategoryFieldUpdateOperationsInput | $Enums.VerificationCategory
    inputType?: EnumRequirementInputTypeFieldUpdateOperationsInput | $Enums.RequirementInputType
    fieldKey?: StringFieldUpdateOperationsInput | string
    stepKey?: StringFieldUpdateOperationsInput | string
    valueFormat?: NullableStringFieldUpdateOperationsInput | string | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    accept?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    targetBusiness?: BoolFieldUpdateOperationsInput | boolean
    targetDeveloper?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationRequirementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumVerificationCategoryFieldUpdateOperationsInput | $Enums.VerificationCategory
    inputType?: EnumRequirementInputTypeFieldUpdateOperationsInput | $Enums.RequirementInputType
    fieldKey?: StringFieldUpdateOperationsInput | string
    stepKey?: StringFieldUpdateOperationsInput | string
    valueFormat?: NullableStringFieldUpdateOperationsInput | string | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    accept?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    targetBusiness?: BoolFieldUpdateOperationsInput | boolean
    targetDeveloper?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationRequirementCreateManyInput = {
    id: string
    slug: string
    label: string
    description?: string
    category: $Enums.VerificationCategory
    inputType: $Enums.RequirementInputType
    fieldKey: string
    stepKey: string
    valueFormat?: string | null
    placeholder?: string | null
    accept?: string | null
    sortOrder?: number
    targetBusiness?: boolean
    targetDeveloper?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationRequirementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumVerificationCategoryFieldUpdateOperationsInput | $Enums.VerificationCategory
    inputType?: EnumRequirementInputTypeFieldUpdateOperationsInput | $Enums.RequirementInputType
    fieldKey?: StringFieldUpdateOperationsInput | string
    stepKey?: StringFieldUpdateOperationsInput | string
    valueFormat?: NullableStringFieldUpdateOperationsInput | string | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    accept?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    targetBusiness?: BoolFieldUpdateOperationsInput | boolean
    targetDeveloper?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationRequirementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumVerificationCategoryFieldUpdateOperationsInput | $Enums.VerificationCategory
    inputType?: EnumRequirementInputTypeFieldUpdateOperationsInput | $Enums.RequirementInputType
    fieldKey?: StringFieldUpdateOperationsInput | string
    stepKey?: StringFieldUpdateOperationsInput | string
    valueFormat?: NullableStringFieldUpdateOperationsInput | string | null
    placeholder?: NullableStringFieldUpdateOperationsInput | string | null
    accept?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    targetBusiness?: BoolFieldUpdateOperationsInput | boolean
    targetDeveloper?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEntryCreateInput = {
    id: string
    actor: string
    action: string
    target: string
    tone?: $Enums.AuditTone
    createdAt?: Date | string
  }

  export type AuditEntryUncheckedCreateInput = {
    id: string
    actor: string
    action: string
    target: string
    tone?: $Enums.AuditTone
    createdAt?: Date | string
  }

  export type AuditEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    tone?: EnumAuditToneFieldUpdateOperationsInput | $Enums.AuditTone
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    tone?: EnumAuditToneFieldUpdateOperationsInput | $Enums.AuditTone
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEntryCreateManyInput = {
    id: string
    actor: string
    action: string
    target: string
    tone?: $Enums.AuditTone
    createdAt?: Date | string
  }

  export type AuditEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    tone?: EnumAuditToneFieldUpdateOperationsInput | $Enums.AuditTone
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    tone?: EnumAuditToneFieldUpdateOperationsInput | $Enums.AuditTone
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

  export type PlatformSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    orgName?: SortOrder
    supportEmail?: SortOrder
    region?: SortOrder
    enforceMfa?: SortOrder
    ipAllowlist?: SortOrder
    ssoEnabled?: SortOrder
    sessionTimeout?: SortOrder
    notifyRisk?: SortOrder
    notifySettlements?: SortOrder
    notifyDigest?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    orgName?: SortOrder
    supportEmail?: SortOrder
    region?: SortOrder
    enforceMfa?: SortOrder
    ipAllowlist?: SortOrder
    ssoEnabled?: SortOrder
    sessionTimeout?: SortOrder
    notifyRisk?: SortOrder
    notifySettlements?: SortOrder
    notifyDigest?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    orgName?: SortOrder
    supportEmail?: SortOrder
    region?: SortOrder
    enforceMfa?: SortOrder
    ipAllowlist?: SortOrder
    ssoEnabled?: SortOrder
    sessionTimeout?: SortOrder
    notifyRisk?: SortOrder
    notifySettlements?: SortOrder
    notifyDigest?: SortOrder
    updatedAt?: SortOrder
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

  export type AdminMemberCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    roleName?: SortOrder
    mfaEnabled?: SortOrder
    lastActiveAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    roleName?: SortOrder
    mfaEnabled?: SortOrder
    lastActiveAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminMemberMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    roleName?: SortOrder
    mfaEnabled?: SortOrder
    lastActiveAt?: SortOrder
    createdAt?: SortOrder
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

  export type EnumRoleToneFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleTone | EnumRoleToneFieldRefInput<$PrismaModel>
    in?: $Enums.RoleTone[] | ListEnumRoleToneFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleTone[] | ListEnumRoleToneFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleToneFilter<$PrismaModel> | $Enums.RoleTone
  }

  export type RbacRoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    memberCount?: SortOrder
    permissions?: SortOrder
    tone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RbacRoleAvgOrderByAggregateInput = {
    memberCount?: SortOrder
  }

  export type RbacRoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    memberCount?: SortOrder
    tone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RbacRoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    memberCount?: SortOrder
    tone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RbacRoleSumOrderByAggregateInput = {
    memberCount?: SortOrder
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

  export type EnumRoleToneWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleTone | EnumRoleToneFieldRefInput<$PrismaModel>
    in?: $Enums.RoleTone[] | ListEnumRoleToneFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleTone[] | ListEnumRoleToneFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleToneWithAggregatesFilter<$PrismaModel> | $Enums.RoleTone
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleToneFilter<$PrismaModel>
    _max?: NestedEnumRoleToneFilter<$PrismaModel>
  }

  export type FeatureFlagCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    description?: SortOrder
    enabled?: SortOrder
    scope?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type FeatureFlagMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    description?: SortOrder
    enabled?: SortOrder
    scope?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type FeatureFlagMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    description?: SortOrder
    enabled?: SortOrder
    scope?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumVerificationCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationCategory | EnumVerificationCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationCategory[] | ListEnumVerificationCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationCategory[] | ListEnumVerificationCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationCategoryFilter<$PrismaModel> | $Enums.VerificationCategory
  }

  export type EnumRequirementInputTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RequirementInputType | EnumRequirementInputTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RequirementInputType[] | ListEnumRequirementInputTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequirementInputType[] | ListEnumRequirementInputTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRequirementInputTypeFilter<$PrismaModel> | $Enums.RequirementInputType
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VerificationRequirementCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    label?: SortOrder
    description?: SortOrder
    category?: SortOrder
    inputType?: SortOrder
    fieldKey?: SortOrder
    stepKey?: SortOrder
    valueFormat?: SortOrder
    placeholder?: SortOrder
    accept?: SortOrder
    sortOrder?: SortOrder
    targetBusiness?: SortOrder
    targetDeveloper?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationRequirementAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type VerificationRequirementMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    label?: SortOrder
    description?: SortOrder
    category?: SortOrder
    inputType?: SortOrder
    fieldKey?: SortOrder
    stepKey?: SortOrder
    valueFormat?: SortOrder
    placeholder?: SortOrder
    accept?: SortOrder
    sortOrder?: SortOrder
    targetBusiness?: SortOrder
    targetDeveloper?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationRequirementMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    label?: SortOrder
    description?: SortOrder
    category?: SortOrder
    inputType?: SortOrder
    fieldKey?: SortOrder
    stepKey?: SortOrder
    valueFormat?: SortOrder
    placeholder?: SortOrder
    accept?: SortOrder
    sortOrder?: SortOrder
    targetBusiness?: SortOrder
    targetDeveloper?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationRequirementSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type EnumVerificationCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationCategory | EnumVerificationCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationCategory[] | ListEnumVerificationCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationCategory[] | ListEnumVerificationCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationCategoryWithAggregatesFilter<$PrismaModel> | $Enums.VerificationCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationCategoryFilter<$PrismaModel>
    _max?: NestedEnumVerificationCategoryFilter<$PrismaModel>
  }

  export type EnumRequirementInputTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequirementInputType | EnumRequirementInputTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RequirementInputType[] | ListEnumRequirementInputTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequirementInputType[] | ListEnumRequirementInputTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRequirementInputTypeWithAggregatesFilter<$PrismaModel> | $Enums.RequirementInputType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequirementInputTypeFilter<$PrismaModel>
    _max?: NestedEnumRequirementInputTypeFilter<$PrismaModel>
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

  export type EnumAuditToneFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditTone | EnumAuditToneFieldRefInput<$PrismaModel>
    in?: $Enums.AuditTone[] | ListEnumAuditToneFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditTone[] | ListEnumAuditToneFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditToneFilter<$PrismaModel> | $Enums.AuditTone
  }

  export type AuditEntryCountOrderByAggregateInput = {
    id?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    target?: SortOrder
    tone?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    target?: SortOrder
    tone?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditEntryMinOrderByAggregateInput = {
    id?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    target?: SortOrder
    tone?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAuditToneWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditTone | EnumAuditToneFieldRefInput<$PrismaModel>
    in?: $Enums.AuditTone[] | ListEnumAuditToneFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditTone[] | ListEnumAuditToneFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditToneWithAggregatesFilter<$PrismaModel> | $Enums.AuditTone
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditToneFilter<$PrismaModel>
    _max?: NestedEnumAuditToneFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumRoleToneFieldUpdateOperationsInput = {
    set?: $Enums.RoleTone
  }

  export type EnumVerificationCategoryFieldUpdateOperationsInput = {
    set?: $Enums.VerificationCategory
  }

  export type EnumRequirementInputTypeFieldUpdateOperationsInput = {
    set?: $Enums.RequirementInputType
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumAuditToneFieldUpdateOperationsInput = {
    set?: $Enums.AuditTone
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

  export type NestedEnumRoleToneFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleTone | EnumRoleToneFieldRefInput<$PrismaModel>
    in?: $Enums.RoleTone[] | ListEnumRoleToneFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleTone[] | ListEnumRoleToneFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleToneFilter<$PrismaModel> | $Enums.RoleTone
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

  export type NestedEnumRoleToneWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleTone | EnumRoleToneFieldRefInput<$PrismaModel>
    in?: $Enums.RoleTone[] | ListEnumRoleToneFieldRefInput<$PrismaModel>
    notIn?: $Enums.RoleTone[] | ListEnumRoleToneFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleToneWithAggregatesFilter<$PrismaModel> | $Enums.RoleTone
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleToneFilter<$PrismaModel>
    _max?: NestedEnumRoleToneFilter<$PrismaModel>
  }

  export type NestedEnumVerificationCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationCategory | EnumVerificationCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationCategory[] | ListEnumVerificationCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationCategory[] | ListEnumVerificationCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationCategoryFilter<$PrismaModel> | $Enums.VerificationCategory
  }

  export type NestedEnumRequirementInputTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RequirementInputType | EnumRequirementInputTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RequirementInputType[] | ListEnumRequirementInputTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequirementInputType[] | ListEnumRequirementInputTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRequirementInputTypeFilter<$PrismaModel> | $Enums.RequirementInputType
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

  export type NestedEnumVerificationCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerificationCategory | EnumVerificationCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.VerificationCategory[] | ListEnumVerificationCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerificationCategory[] | ListEnumVerificationCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumVerificationCategoryWithAggregatesFilter<$PrismaModel> | $Enums.VerificationCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerificationCategoryFilter<$PrismaModel>
    _max?: NestedEnumVerificationCategoryFilter<$PrismaModel>
  }

  export type NestedEnumRequirementInputTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequirementInputType | EnumRequirementInputTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RequirementInputType[] | ListEnumRequirementInputTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequirementInputType[] | ListEnumRequirementInputTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRequirementInputTypeWithAggregatesFilter<$PrismaModel> | $Enums.RequirementInputType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequirementInputTypeFilter<$PrismaModel>
    _max?: NestedEnumRequirementInputTypeFilter<$PrismaModel>
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

  export type NestedEnumAuditToneFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditTone | EnumAuditToneFieldRefInput<$PrismaModel>
    in?: $Enums.AuditTone[] | ListEnumAuditToneFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditTone[] | ListEnumAuditToneFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditToneFilter<$PrismaModel> | $Enums.AuditTone
  }

  export type NestedEnumAuditToneWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditTone | EnumAuditToneFieldRefInput<$PrismaModel>
    in?: $Enums.AuditTone[] | ListEnumAuditToneFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditTone[] | ListEnumAuditToneFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditToneWithAggregatesFilter<$PrismaModel> | $Enums.AuditTone
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditToneFilter<$PrismaModel>
    _max?: NestedEnumAuditToneFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PlatformSettingsDefaultArgs instead
     */
    export type PlatformSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PlatformSettingsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AdminMemberDefaultArgs instead
     */
    export type AdminMemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminMemberDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RbacRoleDefaultArgs instead
     */
    export type RbacRoleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RbacRoleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FeatureFlagDefaultArgs instead
     */
    export type FeatureFlagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FeatureFlagDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VerificationRequirementDefaultArgs instead
     */
    export type VerificationRequirementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VerificationRequirementDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditEntryDefaultArgs instead
     */
    export type AuditEntryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditEntryDefaultArgs<ExtArgs>

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