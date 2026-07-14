
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserAlias
 * Lookup index for PHONE / EMAIL / HANDLE → user resolution (beneficiary routing).
 */
export type UserAlias = $Result.DefaultSelection<Prisma.$UserAliasPayload>
/**
 * Model DelegationGrant
 * 
 */
export type DelegationGrant = $Result.DefaultSelection<Prisma.$DelegationGrantPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserStatus: {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]


export const UserRole: {
  SUPER_ADMIN: 'SUPER_ADMIN',
  BUSINESS: 'BUSINESS',
  DEVELOPER: 'DEVELOPER',
  CONSUMER: 'CONSUMER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const UserAliasKind: {
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
  HANDLE: 'HANDLE'
};

export type UserAliasKind = (typeof UserAliasKind)[keyof typeof UserAliasKind]

}

export type UserStatus = $Enums.UserStatus

export const UserStatus: typeof $Enums.UserStatus

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type UserAliasKind = $Enums.UserAliasKind

export const UserAliasKind: typeof $Enums.UserAliasKind

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.userAlias`: Exposes CRUD operations for the **UserAlias** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserAliases
    * const userAliases = await prisma.userAlias.findMany()
    * ```
    */
  get userAlias(): Prisma.UserAliasDelegate<ExtArgs>;

  /**
   * `prisma.delegationGrant`: Exposes CRUD operations for the **DelegationGrant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DelegationGrants
    * const delegationGrants = await prisma.delegationGrant.findMany()
    * ```
    */
  get delegationGrant(): Prisma.DelegationGrantDelegate<ExtArgs>;
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
    User: 'User',
    UserAlias: 'UserAlias',
    DelegationGrant: 'DelegationGrant'
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
      modelProps: "user" | "userAlias" | "delegationGrant"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserAlias: {
        payload: Prisma.$UserAliasPayload<ExtArgs>
        fields: Prisma.UserAliasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserAliasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAliasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserAliasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAliasPayload>
          }
          findFirst: {
            args: Prisma.UserAliasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAliasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserAliasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAliasPayload>
          }
          findMany: {
            args: Prisma.UserAliasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAliasPayload>[]
          }
          create: {
            args: Prisma.UserAliasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAliasPayload>
          }
          createMany: {
            args: Prisma.UserAliasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserAliasCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAliasPayload>[]
          }
          delete: {
            args: Prisma.UserAliasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAliasPayload>
          }
          update: {
            args: Prisma.UserAliasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAliasPayload>
          }
          deleteMany: {
            args: Prisma.UserAliasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserAliasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserAliasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAliasPayload>
          }
          aggregate: {
            args: Prisma.UserAliasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserAlias>
          }
          groupBy: {
            args: Prisma.UserAliasGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserAliasGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserAliasCountArgs<ExtArgs>
            result: $Utils.Optional<UserAliasCountAggregateOutputType> | number
          }
        }
      }
      DelegationGrant: {
        payload: Prisma.$DelegationGrantPayload<ExtArgs>
        fields: Prisma.DelegationGrantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DelegationGrantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationGrantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DelegationGrantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationGrantPayload>
          }
          findFirst: {
            args: Prisma.DelegationGrantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationGrantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DelegationGrantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationGrantPayload>
          }
          findMany: {
            args: Prisma.DelegationGrantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationGrantPayload>[]
          }
          create: {
            args: Prisma.DelegationGrantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationGrantPayload>
          }
          createMany: {
            args: Prisma.DelegationGrantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DelegationGrantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationGrantPayload>[]
          }
          delete: {
            args: Prisma.DelegationGrantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationGrantPayload>
          }
          update: {
            args: Prisma.DelegationGrantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationGrantPayload>
          }
          deleteMany: {
            args: Prisma.DelegationGrantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DelegationGrantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DelegationGrantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DelegationGrantPayload>
          }
          aggregate: {
            args: Prisma.DelegationGrantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDelegationGrant>
          }
          groupBy: {
            args: Prisma.DelegationGrantGroupByArgs<ExtArgs>
            result: $Utils.Optional<DelegationGrantGroupByOutputType>[]
          }
          count: {
            args: Prisma.DelegationGrantCountArgs<ExtArgs>
            result: $Utils.Optional<DelegationGrantCountAggregateOutputType> | number
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    delegations: number
    aliases: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    delegations?: boolean | UserCountOutputTypeCountDelegationsArgs
    aliases?: boolean | UserCountOutputTypeCountAliasesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDelegationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DelegationGrantWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAliasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAliasWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    status: $Enums.UserStatus | null
    role: $Enums.UserRole | null
    displayName: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    status: $Enums.UserStatus | null
    role: $Enums.UserRole | null
    displayName: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    status: number
    role: number
    displayName: number
    passwordHash: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    status?: true
    role?: true
    displayName?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    status?: true
    role?: true
    displayName?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    status?: true
    role?: true
    displayName?: true
    passwordHash?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    status: $Enums.UserStatus
    role: $Enums.UserRole
    displayName: string | null
    passwordHash: string | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    status?: boolean
    role?: boolean
    displayName?: boolean
    passwordHash?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    delegations?: boolean | User$delegationsArgs<ExtArgs>
    aliases?: boolean | User$aliasesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    status?: boolean
    role?: boolean
    displayName?: boolean
    passwordHash?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    status?: boolean
    role?: boolean
    displayName?: boolean
    passwordHash?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    delegations?: boolean | User$delegationsArgs<ExtArgs>
    aliases?: boolean | User$aliasesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      delegations: Prisma.$DelegationGrantPayload<ExtArgs>[]
      aliases: Prisma.$UserAliasPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      status: $Enums.UserStatus
      role: $Enums.UserRole
      displayName: string | null
      passwordHash: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    delegations<T extends User$delegationsArgs<ExtArgs> = {}>(args?: Subset<T, User$delegationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegationGrantPayload<ExtArgs>, T, "findMany"> | Null>
    aliases<T extends User$aliasesArgs<ExtArgs> = {}>(args?: Subset<T, User$aliasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAliasPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'UserStatus'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly displayName: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly metadata: FieldRef<"User", 'Json'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.delegations
   */
  export type User$delegationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationGrant
     */
    select?: DelegationGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationGrantInclude<ExtArgs> | null
    where?: DelegationGrantWhereInput
    orderBy?: DelegationGrantOrderByWithRelationInput | DelegationGrantOrderByWithRelationInput[]
    cursor?: DelegationGrantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DelegationGrantScalarFieldEnum | DelegationGrantScalarFieldEnum[]
  }

  /**
   * User.aliases
   */
  export type User$aliasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlias
     */
    select?: UserAliasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAliasInclude<ExtArgs> | null
    where?: UserAliasWhereInput
    orderBy?: UserAliasOrderByWithRelationInput | UserAliasOrderByWithRelationInput[]
    cursor?: UserAliasWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAliasScalarFieldEnum | UserAliasScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserAlias
   */

  export type AggregateUserAlias = {
    _count: UserAliasCountAggregateOutputType | null
    _min: UserAliasMinAggregateOutputType | null
    _max: UserAliasMaxAggregateOutputType | null
  }

  export type UserAliasMinAggregateOutputType = {
    id: string | null
    userId: string | null
    kind: $Enums.UserAliasKind | null
    value: string | null
    verified: boolean | null
    createdAt: Date | null
  }

  export type UserAliasMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    kind: $Enums.UserAliasKind | null
    value: string | null
    verified: boolean | null
    createdAt: Date | null
  }

  export type UserAliasCountAggregateOutputType = {
    id: number
    userId: number
    kind: number
    value: number
    verified: number
    createdAt: number
    _all: number
  }


  export type UserAliasMinAggregateInputType = {
    id?: true
    userId?: true
    kind?: true
    value?: true
    verified?: true
    createdAt?: true
  }

  export type UserAliasMaxAggregateInputType = {
    id?: true
    userId?: true
    kind?: true
    value?: true
    verified?: true
    createdAt?: true
  }

  export type UserAliasCountAggregateInputType = {
    id?: true
    userId?: true
    kind?: true
    value?: true
    verified?: true
    createdAt?: true
    _all?: true
  }

  export type UserAliasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAlias to aggregate.
     */
    where?: UserAliasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAliases to fetch.
     */
    orderBy?: UserAliasOrderByWithRelationInput | UserAliasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserAliasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAliases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAliases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserAliases
    **/
    _count?: true | UserAliasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserAliasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserAliasMaxAggregateInputType
  }

  export type GetUserAliasAggregateType<T extends UserAliasAggregateArgs> = {
        [P in keyof T & keyof AggregateUserAlias]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAlias[P]>
      : GetScalarType<T[P], AggregateUserAlias[P]>
  }




  export type UserAliasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAliasWhereInput
    orderBy?: UserAliasOrderByWithAggregationInput | UserAliasOrderByWithAggregationInput[]
    by: UserAliasScalarFieldEnum[] | UserAliasScalarFieldEnum
    having?: UserAliasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserAliasCountAggregateInputType | true
    _min?: UserAliasMinAggregateInputType
    _max?: UserAliasMaxAggregateInputType
  }

  export type UserAliasGroupByOutputType = {
    id: string
    userId: string
    kind: $Enums.UserAliasKind
    value: string
    verified: boolean
    createdAt: Date
    _count: UserAliasCountAggregateOutputType | null
    _min: UserAliasMinAggregateOutputType | null
    _max: UserAliasMaxAggregateOutputType | null
  }

  type GetUserAliasGroupByPayload<T extends UserAliasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserAliasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserAliasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserAliasGroupByOutputType[P]>
            : GetScalarType<T[P], UserAliasGroupByOutputType[P]>
        }
      >
    >


  export type UserAliasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    kind?: boolean
    value?: boolean
    verified?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAlias"]>

  export type UserAliasSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    kind?: boolean
    value?: boolean
    verified?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAlias"]>

  export type UserAliasSelectScalar = {
    id?: boolean
    userId?: boolean
    kind?: boolean
    value?: boolean
    verified?: boolean
    createdAt?: boolean
  }

  export type UserAliasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserAliasIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserAliasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserAlias"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      kind: $Enums.UserAliasKind
      value: string
      verified: boolean
      createdAt: Date
    }, ExtArgs["result"]["userAlias"]>
    composites: {}
  }

  type UserAliasGetPayload<S extends boolean | null | undefined | UserAliasDefaultArgs> = $Result.GetResult<Prisma.$UserAliasPayload, S>

  type UserAliasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserAliasFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserAliasCountAggregateInputType | true
    }

  export interface UserAliasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserAlias'], meta: { name: 'UserAlias' } }
    /**
     * Find zero or one UserAlias that matches the filter.
     * @param {UserAliasFindUniqueArgs} args - Arguments to find a UserAlias
     * @example
     * // Get one UserAlias
     * const userAlias = await prisma.userAlias.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserAliasFindUniqueArgs>(args: SelectSubset<T, UserAliasFindUniqueArgs<ExtArgs>>): Prisma__UserAliasClient<$Result.GetResult<Prisma.$UserAliasPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserAlias that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserAliasFindUniqueOrThrowArgs} args - Arguments to find a UserAlias
     * @example
     * // Get one UserAlias
     * const userAlias = await prisma.userAlias.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserAliasFindUniqueOrThrowArgs>(args: SelectSubset<T, UserAliasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserAliasClient<$Result.GetResult<Prisma.$UserAliasPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserAlias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAliasFindFirstArgs} args - Arguments to find a UserAlias
     * @example
     * // Get one UserAlias
     * const userAlias = await prisma.userAlias.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserAliasFindFirstArgs>(args?: SelectSubset<T, UserAliasFindFirstArgs<ExtArgs>>): Prisma__UserAliasClient<$Result.GetResult<Prisma.$UserAliasPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserAlias that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAliasFindFirstOrThrowArgs} args - Arguments to find a UserAlias
     * @example
     * // Get one UserAlias
     * const userAlias = await prisma.userAlias.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserAliasFindFirstOrThrowArgs>(args?: SelectSubset<T, UserAliasFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserAliasClient<$Result.GetResult<Prisma.$UserAliasPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserAliases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAliasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAliases
     * const userAliases = await prisma.userAlias.findMany()
     * 
     * // Get first 10 UserAliases
     * const userAliases = await prisma.userAlias.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userAliasWithIdOnly = await prisma.userAlias.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserAliasFindManyArgs>(args?: SelectSubset<T, UserAliasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAliasPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserAlias.
     * @param {UserAliasCreateArgs} args - Arguments to create a UserAlias.
     * @example
     * // Create one UserAlias
     * const UserAlias = await prisma.userAlias.create({
     *   data: {
     *     // ... data to create a UserAlias
     *   }
     * })
     * 
     */
    create<T extends UserAliasCreateArgs>(args: SelectSubset<T, UserAliasCreateArgs<ExtArgs>>): Prisma__UserAliasClient<$Result.GetResult<Prisma.$UserAliasPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserAliases.
     * @param {UserAliasCreateManyArgs} args - Arguments to create many UserAliases.
     * @example
     * // Create many UserAliases
     * const userAlias = await prisma.userAlias.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserAliasCreateManyArgs>(args?: SelectSubset<T, UserAliasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserAliases and returns the data saved in the database.
     * @param {UserAliasCreateManyAndReturnArgs} args - Arguments to create many UserAliases.
     * @example
     * // Create many UserAliases
     * const userAlias = await prisma.userAlias.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserAliases and only return the `id`
     * const userAliasWithIdOnly = await prisma.userAlias.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserAliasCreateManyAndReturnArgs>(args?: SelectSubset<T, UserAliasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAliasPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserAlias.
     * @param {UserAliasDeleteArgs} args - Arguments to delete one UserAlias.
     * @example
     * // Delete one UserAlias
     * const UserAlias = await prisma.userAlias.delete({
     *   where: {
     *     // ... filter to delete one UserAlias
     *   }
     * })
     * 
     */
    delete<T extends UserAliasDeleteArgs>(args: SelectSubset<T, UserAliasDeleteArgs<ExtArgs>>): Prisma__UserAliasClient<$Result.GetResult<Prisma.$UserAliasPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserAlias.
     * @param {UserAliasUpdateArgs} args - Arguments to update one UserAlias.
     * @example
     * // Update one UserAlias
     * const userAlias = await prisma.userAlias.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserAliasUpdateArgs>(args: SelectSubset<T, UserAliasUpdateArgs<ExtArgs>>): Prisma__UserAliasClient<$Result.GetResult<Prisma.$UserAliasPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserAliases.
     * @param {UserAliasDeleteManyArgs} args - Arguments to filter UserAliases to delete.
     * @example
     * // Delete a few UserAliases
     * const { count } = await prisma.userAlias.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserAliasDeleteManyArgs>(args?: SelectSubset<T, UserAliasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAliases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAliasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAliases
     * const userAlias = await prisma.userAlias.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserAliasUpdateManyArgs>(args: SelectSubset<T, UserAliasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserAlias.
     * @param {UserAliasUpsertArgs} args - Arguments to update or create a UserAlias.
     * @example
     * // Update or create a UserAlias
     * const userAlias = await prisma.userAlias.upsert({
     *   create: {
     *     // ... data to create a UserAlias
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAlias we want to update
     *   }
     * })
     */
    upsert<T extends UserAliasUpsertArgs>(args: SelectSubset<T, UserAliasUpsertArgs<ExtArgs>>): Prisma__UserAliasClient<$Result.GetResult<Prisma.$UserAliasPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserAliases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAliasCountArgs} args - Arguments to filter UserAliases to count.
     * @example
     * // Count the number of UserAliases
     * const count = await prisma.userAlias.count({
     *   where: {
     *     // ... the filter for the UserAliases we want to count
     *   }
     * })
    **/
    count<T extends UserAliasCountArgs>(
      args?: Subset<T, UserAliasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserAliasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAlias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAliasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAliasAggregateArgs>(args: Subset<T, UserAliasAggregateArgs>): Prisma.PrismaPromise<GetUserAliasAggregateType<T>>

    /**
     * Group by UserAlias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAliasGroupByArgs} args - Group by arguments.
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
      T extends UserAliasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserAliasGroupByArgs['orderBy'] }
        : { orderBy?: UserAliasGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserAliasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAliasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserAlias model
   */
  readonly fields: UserAliasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAlias.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserAliasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the UserAlias model
   */ 
  interface UserAliasFieldRefs {
    readonly id: FieldRef<"UserAlias", 'String'>
    readonly userId: FieldRef<"UserAlias", 'String'>
    readonly kind: FieldRef<"UserAlias", 'UserAliasKind'>
    readonly value: FieldRef<"UserAlias", 'String'>
    readonly verified: FieldRef<"UserAlias", 'Boolean'>
    readonly createdAt: FieldRef<"UserAlias", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserAlias findUnique
   */
  export type UserAliasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlias
     */
    select?: UserAliasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAliasInclude<ExtArgs> | null
    /**
     * Filter, which UserAlias to fetch.
     */
    where: UserAliasWhereUniqueInput
  }

  /**
   * UserAlias findUniqueOrThrow
   */
  export type UserAliasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlias
     */
    select?: UserAliasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAliasInclude<ExtArgs> | null
    /**
     * Filter, which UserAlias to fetch.
     */
    where: UserAliasWhereUniqueInput
  }

  /**
   * UserAlias findFirst
   */
  export type UserAliasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlias
     */
    select?: UserAliasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAliasInclude<ExtArgs> | null
    /**
     * Filter, which UserAlias to fetch.
     */
    where?: UserAliasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAliases to fetch.
     */
    orderBy?: UserAliasOrderByWithRelationInput | UserAliasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAliases.
     */
    cursor?: UserAliasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAliases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAliases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAliases.
     */
    distinct?: UserAliasScalarFieldEnum | UserAliasScalarFieldEnum[]
  }

  /**
   * UserAlias findFirstOrThrow
   */
  export type UserAliasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlias
     */
    select?: UserAliasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAliasInclude<ExtArgs> | null
    /**
     * Filter, which UserAlias to fetch.
     */
    where?: UserAliasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAliases to fetch.
     */
    orderBy?: UserAliasOrderByWithRelationInput | UserAliasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAliases.
     */
    cursor?: UserAliasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAliases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAliases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAliases.
     */
    distinct?: UserAliasScalarFieldEnum | UserAliasScalarFieldEnum[]
  }

  /**
   * UserAlias findMany
   */
  export type UserAliasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlias
     */
    select?: UserAliasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAliasInclude<ExtArgs> | null
    /**
     * Filter, which UserAliases to fetch.
     */
    where?: UserAliasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAliases to fetch.
     */
    orderBy?: UserAliasOrderByWithRelationInput | UserAliasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserAliases.
     */
    cursor?: UserAliasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAliases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAliases.
     */
    skip?: number
    distinct?: UserAliasScalarFieldEnum | UserAliasScalarFieldEnum[]
  }

  /**
   * UserAlias create
   */
  export type UserAliasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlias
     */
    select?: UserAliasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAliasInclude<ExtArgs> | null
    /**
     * The data needed to create a UserAlias.
     */
    data: XOR<UserAliasCreateInput, UserAliasUncheckedCreateInput>
  }

  /**
   * UserAlias createMany
   */
  export type UserAliasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserAliases.
     */
    data: UserAliasCreateManyInput | UserAliasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserAlias createManyAndReturn
   */
  export type UserAliasCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlias
     */
    select?: UserAliasSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserAliases.
     */
    data: UserAliasCreateManyInput | UserAliasCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAliasIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAlias update
   */
  export type UserAliasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlias
     */
    select?: UserAliasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAliasInclude<ExtArgs> | null
    /**
     * The data needed to update a UserAlias.
     */
    data: XOR<UserAliasUpdateInput, UserAliasUncheckedUpdateInput>
    /**
     * Choose, which UserAlias to update.
     */
    where: UserAliasWhereUniqueInput
  }

  /**
   * UserAlias updateMany
   */
  export type UserAliasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserAliases.
     */
    data: XOR<UserAliasUpdateManyMutationInput, UserAliasUncheckedUpdateManyInput>
    /**
     * Filter which UserAliases to update
     */
    where?: UserAliasWhereInput
  }

  /**
   * UserAlias upsert
   */
  export type UserAliasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlias
     */
    select?: UserAliasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAliasInclude<ExtArgs> | null
    /**
     * The filter to search for the UserAlias to update in case it exists.
     */
    where: UserAliasWhereUniqueInput
    /**
     * In case the UserAlias found by the `where` argument doesn't exist, create a new UserAlias with this data.
     */
    create: XOR<UserAliasCreateInput, UserAliasUncheckedCreateInput>
    /**
     * In case the UserAlias was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserAliasUpdateInput, UserAliasUncheckedUpdateInput>
  }

  /**
   * UserAlias delete
   */
  export type UserAliasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlias
     */
    select?: UserAliasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAliasInclude<ExtArgs> | null
    /**
     * Filter which UserAlias to delete.
     */
    where: UserAliasWhereUniqueInput
  }

  /**
   * UserAlias deleteMany
   */
  export type UserAliasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAliases to delete
     */
    where?: UserAliasWhereInput
  }

  /**
   * UserAlias without action
   */
  export type UserAliasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAlias
     */
    select?: UserAliasSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAliasInclude<ExtArgs> | null
  }


  /**
   * Model DelegationGrant
   */

  export type AggregateDelegationGrant = {
    _count: DelegationGrantCountAggregateOutputType | null
    _min: DelegationGrantMinAggregateOutputType | null
    _max: DelegationGrantMaxAggregateOutputType | null
  }

  export type DelegationGrantMinAggregateOutputType = {
    id: string | null
    userId: string | null
    agentId: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type DelegationGrantMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    agentId: string | null
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type DelegationGrantCountAggregateOutputType = {
    id: number
    userId: number
    agentId: number
    scopes: number
    expiresAt: number
    revokedAt: number
    createdAt: number
    _all: number
  }


  export type DelegationGrantMinAggregateInputType = {
    id?: true
    userId?: true
    agentId?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
  }

  export type DelegationGrantMaxAggregateInputType = {
    id?: true
    userId?: true
    agentId?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
  }

  export type DelegationGrantCountAggregateInputType = {
    id?: true
    userId?: true
    agentId?: true
    scopes?: true
    expiresAt?: true
    revokedAt?: true
    createdAt?: true
    _all?: true
  }

  export type DelegationGrantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DelegationGrant to aggregate.
     */
    where?: DelegationGrantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DelegationGrants to fetch.
     */
    orderBy?: DelegationGrantOrderByWithRelationInput | DelegationGrantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DelegationGrantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DelegationGrants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DelegationGrants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DelegationGrants
    **/
    _count?: true | DelegationGrantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DelegationGrantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DelegationGrantMaxAggregateInputType
  }

  export type GetDelegationGrantAggregateType<T extends DelegationGrantAggregateArgs> = {
        [P in keyof T & keyof AggregateDelegationGrant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDelegationGrant[P]>
      : GetScalarType<T[P], AggregateDelegationGrant[P]>
  }




  export type DelegationGrantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DelegationGrantWhereInput
    orderBy?: DelegationGrantOrderByWithAggregationInput | DelegationGrantOrderByWithAggregationInput[]
    by: DelegationGrantScalarFieldEnum[] | DelegationGrantScalarFieldEnum
    having?: DelegationGrantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DelegationGrantCountAggregateInputType | true
    _min?: DelegationGrantMinAggregateInputType
    _max?: DelegationGrantMaxAggregateInputType
  }

  export type DelegationGrantGroupByOutputType = {
    id: string
    userId: string
    agentId: string
    scopes: string[]
    expiresAt: Date | null
    revokedAt: Date | null
    createdAt: Date
    _count: DelegationGrantCountAggregateOutputType | null
    _min: DelegationGrantMinAggregateOutputType | null
    _max: DelegationGrantMaxAggregateOutputType | null
  }

  type GetDelegationGrantGroupByPayload<T extends DelegationGrantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DelegationGrantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DelegationGrantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DelegationGrantGroupByOutputType[P]>
            : GetScalarType<T[P], DelegationGrantGroupByOutputType[P]>
        }
      >
    >


  export type DelegationGrantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    agentId?: boolean
    scopes?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["delegationGrant"]>

  export type DelegationGrantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    agentId?: boolean
    scopes?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["delegationGrant"]>

  export type DelegationGrantSelectScalar = {
    id?: boolean
    userId?: boolean
    agentId?: boolean
    scopes?: boolean
    expiresAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
  }

  export type DelegationGrantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DelegationGrantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DelegationGrantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DelegationGrant"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      agentId: string
      scopes: string[]
      expiresAt: Date | null
      revokedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["delegationGrant"]>
    composites: {}
  }

  type DelegationGrantGetPayload<S extends boolean | null | undefined | DelegationGrantDefaultArgs> = $Result.GetResult<Prisma.$DelegationGrantPayload, S>

  type DelegationGrantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DelegationGrantFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DelegationGrantCountAggregateInputType | true
    }

  export interface DelegationGrantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DelegationGrant'], meta: { name: 'DelegationGrant' } }
    /**
     * Find zero or one DelegationGrant that matches the filter.
     * @param {DelegationGrantFindUniqueArgs} args - Arguments to find a DelegationGrant
     * @example
     * // Get one DelegationGrant
     * const delegationGrant = await prisma.delegationGrant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DelegationGrantFindUniqueArgs>(args: SelectSubset<T, DelegationGrantFindUniqueArgs<ExtArgs>>): Prisma__DelegationGrantClient<$Result.GetResult<Prisma.$DelegationGrantPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DelegationGrant that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DelegationGrantFindUniqueOrThrowArgs} args - Arguments to find a DelegationGrant
     * @example
     * // Get one DelegationGrant
     * const delegationGrant = await prisma.delegationGrant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DelegationGrantFindUniqueOrThrowArgs>(args: SelectSubset<T, DelegationGrantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DelegationGrantClient<$Result.GetResult<Prisma.$DelegationGrantPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DelegationGrant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationGrantFindFirstArgs} args - Arguments to find a DelegationGrant
     * @example
     * // Get one DelegationGrant
     * const delegationGrant = await prisma.delegationGrant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DelegationGrantFindFirstArgs>(args?: SelectSubset<T, DelegationGrantFindFirstArgs<ExtArgs>>): Prisma__DelegationGrantClient<$Result.GetResult<Prisma.$DelegationGrantPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DelegationGrant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationGrantFindFirstOrThrowArgs} args - Arguments to find a DelegationGrant
     * @example
     * // Get one DelegationGrant
     * const delegationGrant = await prisma.delegationGrant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DelegationGrantFindFirstOrThrowArgs>(args?: SelectSubset<T, DelegationGrantFindFirstOrThrowArgs<ExtArgs>>): Prisma__DelegationGrantClient<$Result.GetResult<Prisma.$DelegationGrantPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DelegationGrants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationGrantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DelegationGrants
     * const delegationGrants = await prisma.delegationGrant.findMany()
     * 
     * // Get first 10 DelegationGrants
     * const delegationGrants = await prisma.delegationGrant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const delegationGrantWithIdOnly = await prisma.delegationGrant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DelegationGrantFindManyArgs>(args?: SelectSubset<T, DelegationGrantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegationGrantPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DelegationGrant.
     * @param {DelegationGrantCreateArgs} args - Arguments to create a DelegationGrant.
     * @example
     * // Create one DelegationGrant
     * const DelegationGrant = await prisma.delegationGrant.create({
     *   data: {
     *     // ... data to create a DelegationGrant
     *   }
     * })
     * 
     */
    create<T extends DelegationGrantCreateArgs>(args: SelectSubset<T, DelegationGrantCreateArgs<ExtArgs>>): Prisma__DelegationGrantClient<$Result.GetResult<Prisma.$DelegationGrantPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DelegationGrants.
     * @param {DelegationGrantCreateManyArgs} args - Arguments to create many DelegationGrants.
     * @example
     * // Create many DelegationGrants
     * const delegationGrant = await prisma.delegationGrant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DelegationGrantCreateManyArgs>(args?: SelectSubset<T, DelegationGrantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DelegationGrants and returns the data saved in the database.
     * @param {DelegationGrantCreateManyAndReturnArgs} args - Arguments to create many DelegationGrants.
     * @example
     * // Create many DelegationGrants
     * const delegationGrant = await prisma.delegationGrant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DelegationGrants and only return the `id`
     * const delegationGrantWithIdOnly = await prisma.delegationGrant.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DelegationGrantCreateManyAndReturnArgs>(args?: SelectSubset<T, DelegationGrantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DelegationGrantPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DelegationGrant.
     * @param {DelegationGrantDeleteArgs} args - Arguments to delete one DelegationGrant.
     * @example
     * // Delete one DelegationGrant
     * const DelegationGrant = await prisma.delegationGrant.delete({
     *   where: {
     *     // ... filter to delete one DelegationGrant
     *   }
     * })
     * 
     */
    delete<T extends DelegationGrantDeleteArgs>(args: SelectSubset<T, DelegationGrantDeleteArgs<ExtArgs>>): Prisma__DelegationGrantClient<$Result.GetResult<Prisma.$DelegationGrantPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DelegationGrant.
     * @param {DelegationGrantUpdateArgs} args - Arguments to update one DelegationGrant.
     * @example
     * // Update one DelegationGrant
     * const delegationGrant = await prisma.delegationGrant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DelegationGrantUpdateArgs>(args: SelectSubset<T, DelegationGrantUpdateArgs<ExtArgs>>): Prisma__DelegationGrantClient<$Result.GetResult<Prisma.$DelegationGrantPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DelegationGrants.
     * @param {DelegationGrantDeleteManyArgs} args - Arguments to filter DelegationGrants to delete.
     * @example
     * // Delete a few DelegationGrants
     * const { count } = await prisma.delegationGrant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DelegationGrantDeleteManyArgs>(args?: SelectSubset<T, DelegationGrantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DelegationGrants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationGrantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DelegationGrants
     * const delegationGrant = await prisma.delegationGrant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DelegationGrantUpdateManyArgs>(args: SelectSubset<T, DelegationGrantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DelegationGrant.
     * @param {DelegationGrantUpsertArgs} args - Arguments to update or create a DelegationGrant.
     * @example
     * // Update or create a DelegationGrant
     * const delegationGrant = await prisma.delegationGrant.upsert({
     *   create: {
     *     // ... data to create a DelegationGrant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DelegationGrant we want to update
     *   }
     * })
     */
    upsert<T extends DelegationGrantUpsertArgs>(args: SelectSubset<T, DelegationGrantUpsertArgs<ExtArgs>>): Prisma__DelegationGrantClient<$Result.GetResult<Prisma.$DelegationGrantPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DelegationGrants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationGrantCountArgs} args - Arguments to filter DelegationGrants to count.
     * @example
     * // Count the number of DelegationGrants
     * const count = await prisma.delegationGrant.count({
     *   where: {
     *     // ... the filter for the DelegationGrants we want to count
     *   }
     * })
    **/
    count<T extends DelegationGrantCountArgs>(
      args?: Subset<T, DelegationGrantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DelegationGrantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DelegationGrant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationGrantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DelegationGrantAggregateArgs>(args: Subset<T, DelegationGrantAggregateArgs>): Prisma.PrismaPromise<GetDelegationGrantAggregateType<T>>

    /**
     * Group by DelegationGrant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationGrantGroupByArgs} args - Group by arguments.
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
      T extends DelegationGrantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DelegationGrantGroupByArgs['orderBy'] }
        : { orderBy?: DelegationGrantGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DelegationGrantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDelegationGrantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DelegationGrant model
   */
  readonly fields: DelegationGrantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DelegationGrant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DelegationGrantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the DelegationGrant model
   */ 
  interface DelegationGrantFieldRefs {
    readonly id: FieldRef<"DelegationGrant", 'String'>
    readonly userId: FieldRef<"DelegationGrant", 'String'>
    readonly agentId: FieldRef<"DelegationGrant", 'String'>
    readonly scopes: FieldRef<"DelegationGrant", 'String[]'>
    readonly expiresAt: FieldRef<"DelegationGrant", 'DateTime'>
    readonly revokedAt: FieldRef<"DelegationGrant", 'DateTime'>
    readonly createdAt: FieldRef<"DelegationGrant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DelegationGrant findUnique
   */
  export type DelegationGrantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationGrant
     */
    select?: DelegationGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationGrantInclude<ExtArgs> | null
    /**
     * Filter, which DelegationGrant to fetch.
     */
    where: DelegationGrantWhereUniqueInput
  }

  /**
   * DelegationGrant findUniqueOrThrow
   */
  export type DelegationGrantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationGrant
     */
    select?: DelegationGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationGrantInclude<ExtArgs> | null
    /**
     * Filter, which DelegationGrant to fetch.
     */
    where: DelegationGrantWhereUniqueInput
  }

  /**
   * DelegationGrant findFirst
   */
  export type DelegationGrantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationGrant
     */
    select?: DelegationGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationGrantInclude<ExtArgs> | null
    /**
     * Filter, which DelegationGrant to fetch.
     */
    where?: DelegationGrantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DelegationGrants to fetch.
     */
    orderBy?: DelegationGrantOrderByWithRelationInput | DelegationGrantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DelegationGrants.
     */
    cursor?: DelegationGrantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DelegationGrants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DelegationGrants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DelegationGrants.
     */
    distinct?: DelegationGrantScalarFieldEnum | DelegationGrantScalarFieldEnum[]
  }

  /**
   * DelegationGrant findFirstOrThrow
   */
  export type DelegationGrantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationGrant
     */
    select?: DelegationGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationGrantInclude<ExtArgs> | null
    /**
     * Filter, which DelegationGrant to fetch.
     */
    where?: DelegationGrantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DelegationGrants to fetch.
     */
    orderBy?: DelegationGrantOrderByWithRelationInput | DelegationGrantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DelegationGrants.
     */
    cursor?: DelegationGrantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DelegationGrants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DelegationGrants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DelegationGrants.
     */
    distinct?: DelegationGrantScalarFieldEnum | DelegationGrantScalarFieldEnum[]
  }

  /**
   * DelegationGrant findMany
   */
  export type DelegationGrantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationGrant
     */
    select?: DelegationGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationGrantInclude<ExtArgs> | null
    /**
     * Filter, which DelegationGrants to fetch.
     */
    where?: DelegationGrantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DelegationGrants to fetch.
     */
    orderBy?: DelegationGrantOrderByWithRelationInput | DelegationGrantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DelegationGrants.
     */
    cursor?: DelegationGrantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DelegationGrants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DelegationGrants.
     */
    skip?: number
    distinct?: DelegationGrantScalarFieldEnum | DelegationGrantScalarFieldEnum[]
  }

  /**
   * DelegationGrant create
   */
  export type DelegationGrantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationGrant
     */
    select?: DelegationGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationGrantInclude<ExtArgs> | null
    /**
     * The data needed to create a DelegationGrant.
     */
    data: XOR<DelegationGrantCreateInput, DelegationGrantUncheckedCreateInput>
  }

  /**
   * DelegationGrant createMany
   */
  export type DelegationGrantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DelegationGrants.
     */
    data: DelegationGrantCreateManyInput | DelegationGrantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DelegationGrant createManyAndReturn
   */
  export type DelegationGrantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationGrant
     */
    select?: DelegationGrantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DelegationGrants.
     */
    data: DelegationGrantCreateManyInput | DelegationGrantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationGrantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DelegationGrant update
   */
  export type DelegationGrantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationGrant
     */
    select?: DelegationGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationGrantInclude<ExtArgs> | null
    /**
     * The data needed to update a DelegationGrant.
     */
    data: XOR<DelegationGrantUpdateInput, DelegationGrantUncheckedUpdateInput>
    /**
     * Choose, which DelegationGrant to update.
     */
    where: DelegationGrantWhereUniqueInput
  }

  /**
   * DelegationGrant updateMany
   */
  export type DelegationGrantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DelegationGrants.
     */
    data: XOR<DelegationGrantUpdateManyMutationInput, DelegationGrantUncheckedUpdateManyInput>
    /**
     * Filter which DelegationGrants to update
     */
    where?: DelegationGrantWhereInput
  }

  /**
   * DelegationGrant upsert
   */
  export type DelegationGrantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationGrant
     */
    select?: DelegationGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationGrantInclude<ExtArgs> | null
    /**
     * The filter to search for the DelegationGrant to update in case it exists.
     */
    where: DelegationGrantWhereUniqueInput
    /**
     * In case the DelegationGrant found by the `where` argument doesn't exist, create a new DelegationGrant with this data.
     */
    create: XOR<DelegationGrantCreateInput, DelegationGrantUncheckedCreateInput>
    /**
     * In case the DelegationGrant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DelegationGrantUpdateInput, DelegationGrantUncheckedUpdateInput>
  }

  /**
   * DelegationGrant delete
   */
  export type DelegationGrantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationGrant
     */
    select?: DelegationGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationGrantInclude<ExtArgs> | null
    /**
     * Filter which DelegationGrant to delete.
     */
    where: DelegationGrantWhereUniqueInput
  }

  /**
   * DelegationGrant deleteMany
   */
  export type DelegationGrantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DelegationGrants to delete
     */
    where?: DelegationGrantWhereInput
  }

  /**
   * DelegationGrant without action
   */
  export type DelegationGrantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DelegationGrant
     */
    select?: DelegationGrantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DelegationGrantInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    status: 'status',
    role: 'role',
    displayName: 'displayName',
    passwordHash: 'passwordHash',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserAliasScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    kind: 'kind',
    value: 'value',
    verified: 'verified',
    createdAt: 'createdAt'
  };

  export type UserAliasScalarFieldEnum = (typeof UserAliasScalarFieldEnum)[keyof typeof UserAliasScalarFieldEnum]


  export const DelegationGrantScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    agentId: 'agentId',
    scopes: 'scopes',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt'
  };

  export type DelegationGrantScalarFieldEnum = (typeof DelegationGrantScalarFieldEnum)[keyof typeof DelegationGrantScalarFieldEnum]


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
   * Reference to a field of type 'UserStatus'
   */
  export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>
    


  /**
   * Reference to a field of type 'UserStatus[]'
   */
  export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


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
   * Reference to a field of type 'UserAliasKind'
   */
  export type EnumUserAliasKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserAliasKind'>
    


  /**
   * Reference to a field of type 'UserAliasKind[]'
   */
  export type ListEnumUserAliasKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserAliasKind[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    displayName?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    metadata?: JsonNullableFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    delegations?: DelegationGrantListRelationFilter
    aliases?: UserAliasListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    status?: SortOrder
    role?: SortOrder
    displayName?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    delegations?: DelegationGrantOrderByRelationAggregateInput
    aliases?: UserAliasOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    status?: EnumUserStatusFilter<"User"> | $Enums.UserStatus
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    displayName?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    metadata?: JsonNullableFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    delegations?: DelegationGrantListRelationFilter
    aliases?: UserAliasListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    status?: SortOrder
    role?: SortOrder
    displayName?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    status?: EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    displayName?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"User">
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserAliasWhereInput = {
    AND?: UserAliasWhereInput | UserAliasWhereInput[]
    OR?: UserAliasWhereInput[]
    NOT?: UserAliasWhereInput | UserAliasWhereInput[]
    id?: StringFilter<"UserAlias"> | string
    userId?: StringFilter<"UserAlias"> | string
    kind?: EnumUserAliasKindFilter<"UserAlias"> | $Enums.UserAliasKind
    value?: StringFilter<"UserAlias"> | string
    verified?: BoolFilter<"UserAlias"> | boolean
    createdAt?: DateTimeFilter<"UserAlias"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type UserAliasOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    kind?: SortOrder
    value?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserAliasWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    kind_value?: UserAliasKindValueCompoundUniqueInput
    AND?: UserAliasWhereInput | UserAliasWhereInput[]
    OR?: UserAliasWhereInput[]
    NOT?: UserAliasWhereInput | UserAliasWhereInput[]
    userId?: StringFilter<"UserAlias"> | string
    kind?: EnumUserAliasKindFilter<"UserAlias"> | $Enums.UserAliasKind
    value?: StringFilter<"UserAlias"> | string
    verified?: BoolFilter<"UserAlias"> | boolean
    createdAt?: DateTimeFilter<"UserAlias"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "kind_value">

  export type UserAliasOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    kind?: SortOrder
    value?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    _count?: UserAliasCountOrderByAggregateInput
    _max?: UserAliasMaxOrderByAggregateInput
    _min?: UserAliasMinOrderByAggregateInput
  }

  export type UserAliasScalarWhereWithAggregatesInput = {
    AND?: UserAliasScalarWhereWithAggregatesInput | UserAliasScalarWhereWithAggregatesInput[]
    OR?: UserAliasScalarWhereWithAggregatesInput[]
    NOT?: UserAliasScalarWhereWithAggregatesInput | UserAliasScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserAlias"> | string
    userId?: StringWithAggregatesFilter<"UserAlias"> | string
    kind?: EnumUserAliasKindWithAggregatesFilter<"UserAlias"> | $Enums.UserAliasKind
    value?: StringWithAggregatesFilter<"UserAlias"> | string
    verified?: BoolWithAggregatesFilter<"UserAlias"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"UserAlias"> | Date | string
  }

  export type DelegationGrantWhereInput = {
    AND?: DelegationGrantWhereInput | DelegationGrantWhereInput[]
    OR?: DelegationGrantWhereInput[]
    NOT?: DelegationGrantWhereInput | DelegationGrantWhereInput[]
    id?: StringFilter<"DelegationGrant"> | string
    userId?: StringFilter<"DelegationGrant"> | string
    agentId?: StringFilter<"DelegationGrant"> | string
    scopes?: StringNullableListFilter<"DelegationGrant">
    expiresAt?: DateTimeNullableFilter<"DelegationGrant"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"DelegationGrant"> | Date | string | null
    createdAt?: DateTimeFilter<"DelegationGrant"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type DelegationGrantOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    agentId?: SortOrder
    scopes?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type DelegationGrantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_agentId?: DelegationGrantUserIdAgentIdCompoundUniqueInput
    AND?: DelegationGrantWhereInput | DelegationGrantWhereInput[]
    OR?: DelegationGrantWhereInput[]
    NOT?: DelegationGrantWhereInput | DelegationGrantWhereInput[]
    userId?: StringFilter<"DelegationGrant"> | string
    agentId?: StringFilter<"DelegationGrant"> | string
    scopes?: StringNullableListFilter<"DelegationGrant">
    expiresAt?: DateTimeNullableFilter<"DelegationGrant"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"DelegationGrant"> | Date | string | null
    createdAt?: DateTimeFilter<"DelegationGrant"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId_agentId">

  export type DelegationGrantOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    agentId?: SortOrder
    scopes?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DelegationGrantCountOrderByAggregateInput
    _max?: DelegationGrantMaxOrderByAggregateInput
    _min?: DelegationGrantMinOrderByAggregateInput
  }

  export type DelegationGrantScalarWhereWithAggregatesInput = {
    AND?: DelegationGrantScalarWhereWithAggregatesInput | DelegationGrantScalarWhereWithAggregatesInput[]
    OR?: DelegationGrantScalarWhereWithAggregatesInput[]
    NOT?: DelegationGrantScalarWhereWithAggregatesInput | DelegationGrantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DelegationGrant"> | string
    userId?: StringWithAggregatesFilter<"DelegationGrant"> | string
    agentId?: StringWithAggregatesFilter<"DelegationGrant"> | string
    scopes?: StringNullableListFilter<"DelegationGrant">
    expiresAt?: DateTimeNullableWithAggregatesFilter<"DelegationGrant"> | Date | string | null
    revokedAt?: DateTimeNullableWithAggregatesFilter<"DelegationGrant"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DelegationGrant"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    email: string
    status?: $Enums.UserStatus
    role?: $Enums.UserRole
    displayName?: string | null
    passwordHash?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    delegations?: DelegationGrantCreateNestedManyWithoutUserInput
    aliases?: UserAliasCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    status?: $Enums.UserStatus
    role?: $Enums.UserRole
    displayName?: string | null
    passwordHash?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    delegations?: DelegationGrantUncheckedCreateNestedManyWithoutUserInput
    aliases?: UserAliasUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    delegations?: DelegationGrantUpdateManyWithoutUserNestedInput
    aliases?: UserAliasUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    delegations?: DelegationGrantUncheckedUpdateManyWithoutUserNestedInput
    aliases?: UserAliasUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    status?: $Enums.UserStatus
    role?: $Enums.UserRole
    displayName?: string | null
    passwordHash?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAliasCreateInput = {
    id: string
    kind: $Enums.UserAliasKind
    value: string
    verified?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAliasesInput
  }

  export type UserAliasUncheckedCreateInput = {
    id: string
    userId: string
    kind: $Enums.UserAliasKind
    value: string
    verified?: boolean
    createdAt?: Date | string
  }

  export type UserAliasUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumUserAliasKindFieldUpdateOperationsInput | $Enums.UserAliasKind
    value?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAliasesNestedInput
  }

  export type UserAliasUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    kind?: EnumUserAliasKindFieldUpdateOperationsInput | $Enums.UserAliasKind
    value?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAliasCreateManyInput = {
    id: string
    userId: string
    kind: $Enums.UserAliasKind
    value: string
    verified?: boolean
    createdAt?: Date | string
  }

  export type UserAliasUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumUserAliasKindFieldUpdateOperationsInput | $Enums.UserAliasKind
    value?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAliasUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    kind?: EnumUserAliasKindFieldUpdateOperationsInput | $Enums.UserAliasKind
    value?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegationGrantCreateInput = {
    id: string
    agentId: string
    scopes?: DelegationGrantCreatescopesInput | string[]
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutDelegationsInput
  }

  export type DelegationGrantUncheckedCreateInput = {
    id: string
    userId: string
    agentId: string
    scopes?: DelegationGrantCreatescopesInput | string[]
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type DelegationGrantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    scopes?: DelegationGrantUpdatescopesInput | string[]
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDelegationsNestedInput
  }

  export type DelegationGrantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    scopes?: DelegationGrantUpdatescopesInput | string[]
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegationGrantCreateManyInput = {
    id: string
    userId: string
    agentId: string
    scopes?: DelegationGrantCreatescopesInput | string[]
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type DelegationGrantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    scopes?: DelegationGrantUpdatescopesInput | string[]
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegationGrantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    scopes?: DelegationGrantUpdatescopesInput | string[]
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type DelegationGrantListRelationFilter = {
    every?: DelegationGrantWhereInput
    some?: DelegationGrantWhereInput
    none?: DelegationGrantWhereInput
  }

  export type UserAliasListRelationFilter = {
    every?: UserAliasWhereInput
    some?: UserAliasWhereInput
    none?: UserAliasWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DelegationGrantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserAliasOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    status?: SortOrder
    role?: SortOrder
    displayName?: SortOrder
    passwordHash?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    status?: SortOrder
    role?: SortOrder
    displayName?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    status?: SortOrder
    role?: SortOrder
    displayName?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
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

  export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type EnumUserAliasKindFilter<$PrismaModel = never> = {
    equals?: $Enums.UserAliasKind | EnumUserAliasKindFieldRefInput<$PrismaModel>
    in?: $Enums.UserAliasKind[] | ListEnumUserAliasKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserAliasKind[] | ListEnumUserAliasKindFieldRefInput<$PrismaModel>
    not?: NestedEnumUserAliasKindFilter<$PrismaModel> | $Enums.UserAliasKind
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserAliasKindValueCompoundUniqueInput = {
    kind: $Enums.UserAliasKind
    value: string
  }

  export type UserAliasCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    kind?: SortOrder
    value?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAliasMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    kind?: SortOrder
    value?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAliasMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    kind?: SortOrder
    value?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumUserAliasKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserAliasKind | EnumUserAliasKindFieldRefInput<$PrismaModel>
    in?: $Enums.UserAliasKind[] | ListEnumUserAliasKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserAliasKind[] | ListEnumUserAliasKindFieldRefInput<$PrismaModel>
    not?: NestedEnumUserAliasKindWithAggregatesFilter<$PrismaModel> | $Enums.UserAliasKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserAliasKindFilter<$PrismaModel>
    _max?: NestedEnumUserAliasKindFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type DelegationGrantUserIdAgentIdCompoundUniqueInput = {
    userId: string
    agentId: string
  }

  export type DelegationGrantCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    agentId?: SortOrder
    scopes?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DelegationGrantMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    agentId?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DelegationGrantMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    agentId?: SortOrder
    expiresAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
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

  export type DelegationGrantCreateNestedManyWithoutUserInput = {
    create?: XOR<DelegationGrantCreateWithoutUserInput, DelegationGrantUncheckedCreateWithoutUserInput> | DelegationGrantCreateWithoutUserInput[] | DelegationGrantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DelegationGrantCreateOrConnectWithoutUserInput | DelegationGrantCreateOrConnectWithoutUserInput[]
    createMany?: DelegationGrantCreateManyUserInputEnvelope
    connect?: DelegationGrantWhereUniqueInput | DelegationGrantWhereUniqueInput[]
  }

  export type UserAliasCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAliasCreateWithoutUserInput, UserAliasUncheckedCreateWithoutUserInput> | UserAliasCreateWithoutUserInput[] | UserAliasUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAliasCreateOrConnectWithoutUserInput | UserAliasCreateOrConnectWithoutUserInput[]
    createMany?: UserAliasCreateManyUserInputEnvelope
    connect?: UserAliasWhereUniqueInput | UserAliasWhereUniqueInput[]
  }

  export type DelegationGrantUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DelegationGrantCreateWithoutUserInput, DelegationGrantUncheckedCreateWithoutUserInput> | DelegationGrantCreateWithoutUserInput[] | DelegationGrantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DelegationGrantCreateOrConnectWithoutUserInput | DelegationGrantCreateOrConnectWithoutUserInput[]
    createMany?: DelegationGrantCreateManyUserInputEnvelope
    connect?: DelegationGrantWhereUniqueInput | DelegationGrantWhereUniqueInput[]
  }

  export type UserAliasUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserAliasCreateWithoutUserInput, UserAliasUncheckedCreateWithoutUserInput> | UserAliasCreateWithoutUserInput[] | UserAliasUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAliasCreateOrConnectWithoutUserInput | UserAliasCreateOrConnectWithoutUserInput[]
    createMany?: UserAliasCreateManyUserInputEnvelope
    connect?: UserAliasWhereUniqueInput | UserAliasWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DelegationGrantUpdateManyWithoutUserNestedInput = {
    create?: XOR<DelegationGrantCreateWithoutUserInput, DelegationGrantUncheckedCreateWithoutUserInput> | DelegationGrantCreateWithoutUserInput[] | DelegationGrantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DelegationGrantCreateOrConnectWithoutUserInput | DelegationGrantCreateOrConnectWithoutUserInput[]
    upsert?: DelegationGrantUpsertWithWhereUniqueWithoutUserInput | DelegationGrantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DelegationGrantCreateManyUserInputEnvelope
    set?: DelegationGrantWhereUniqueInput | DelegationGrantWhereUniqueInput[]
    disconnect?: DelegationGrantWhereUniqueInput | DelegationGrantWhereUniqueInput[]
    delete?: DelegationGrantWhereUniqueInput | DelegationGrantWhereUniqueInput[]
    connect?: DelegationGrantWhereUniqueInput | DelegationGrantWhereUniqueInput[]
    update?: DelegationGrantUpdateWithWhereUniqueWithoutUserInput | DelegationGrantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DelegationGrantUpdateManyWithWhereWithoutUserInput | DelegationGrantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DelegationGrantScalarWhereInput | DelegationGrantScalarWhereInput[]
  }

  export type UserAliasUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAliasCreateWithoutUserInput, UserAliasUncheckedCreateWithoutUserInput> | UserAliasCreateWithoutUserInput[] | UserAliasUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAliasCreateOrConnectWithoutUserInput | UserAliasCreateOrConnectWithoutUserInput[]
    upsert?: UserAliasUpsertWithWhereUniqueWithoutUserInput | UserAliasUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAliasCreateManyUserInputEnvelope
    set?: UserAliasWhereUniqueInput | UserAliasWhereUniqueInput[]
    disconnect?: UserAliasWhereUniqueInput | UserAliasWhereUniqueInput[]
    delete?: UserAliasWhereUniqueInput | UserAliasWhereUniqueInput[]
    connect?: UserAliasWhereUniqueInput | UserAliasWhereUniqueInput[]
    update?: UserAliasUpdateWithWhereUniqueWithoutUserInput | UserAliasUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAliasUpdateManyWithWhereWithoutUserInput | UserAliasUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAliasScalarWhereInput | UserAliasScalarWhereInput[]
  }

  export type DelegationGrantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DelegationGrantCreateWithoutUserInput, DelegationGrantUncheckedCreateWithoutUserInput> | DelegationGrantCreateWithoutUserInput[] | DelegationGrantUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DelegationGrantCreateOrConnectWithoutUserInput | DelegationGrantCreateOrConnectWithoutUserInput[]
    upsert?: DelegationGrantUpsertWithWhereUniqueWithoutUserInput | DelegationGrantUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DelegationGrantCreateManyUserInputEnvelope
    set?: DelegationGrantWhereUniqueInput | DelegationGrantWhereUniqueInput[]
    disconnect?: DelegationGrantWhereUniqueInput | DelegationGrantWhereUniqueInput[]
    delete?: DelegationGrantWhereUniqueInput | DelegationGrantWhereUniqueInput[]
    connect?: DelegationGrantWhereUniqueInput | DelegationGrantWhereUniqueInput[]
    update?: DelegationGrantUpdateWithWhereUniqueWithoutUserInput | DelegationGrantUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DelegationGrantUpdateManyWithWhereWithoutUserInput | DelegationGrantUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DelegationGrantScalarWhereInput | DelegationGrantScalarWhereInput[]
  }

  export type UserAliasUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserAliasCreateWithoutUserInput, UserAliasUncheckedCreateWithoutUserInput> | UserAliasCreateWithoutUserInput[] | UserAliasUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserAliasCreateOrConnectWithoutUserInput | UserAliasCreateOrConnectWithoutUserInput[]
    upsert?: UserAliasUpsertWithWhereUniqueWithoutUserInput | UserAliasUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserAliasCreateManyUserInputEnvelope
    set?: UserAliasWhereUniqueInput | UserAliasWhereUniqueInput[]
    disconnect?: UserAliasWhereUniqueInput | UserAliasWhereUniqueInput[]
    delete?: UserAliasWhereUniqueInput | UserAliasWhereUniqueInput[]
    connect?: UserAliasWhereUniqueInput | UserAliasWhereUniqueInput[]
    update?: UserAliasUpdateWithWhereUniqueWithoutUserInput | UserAliasUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserAliasUpdateManyWithWhereWithoutUserInput | UserAliasUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserAliasScalarWhereInput | UserAliasScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAliasesInput = {
    create?: XOR<UserCreateWithoutAliasesInput, UserUncheckedCreateWithoutAliasesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAliasesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumUserAliasKindFieldUpdateOperationsInput = {
    set?: $Enums.UserAliasKind
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutAliasesNestedInput = {
    create?: XOR<UserCreateWithoutAliasesInput, UserUncheckedCreateWithoutAliasesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAliasesInput
    upsert?: UserUpsertWithoutAliasesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAliasesInput, UserUpdateWithoutAliasesInput>, UserUncheckedUpdateWithoutAliasesInput>
  }

  export type DelegationGrantCreatescopesInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutDelegationsInput = {
    create?: XOR<UserCreateWithoutDelegationsInput, UserUncheckedCreateWithoutDelegationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDelegationsInput
    connect?: UserWhereUniqueInput
  }

  export type DelegationGrantUpdatescopesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutDelegationsNestedInput = {
    create?: XOR<UserCreateWithoutDelegationsInput, UserUncheckedCreateWithoutDelegationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDelegationsInput
    upsert?: UserUpsertWithoutDelegationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDelegationsInput, UserUpdateWithoutDelegationsInput>, UserUncheckedUpdateWithoutDelegationsInput>
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

  export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
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

  export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | EnumUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserStatus[] | ListEnumUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserStatusFilter<$PrismaModel>
    _max?: NestedEnumUserStatusFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
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

  export type NestedEnumUserAliasKindFilter<$PrismaModel = never> = {
    equals?: $Enums.UserAliasKind | EnumUserAliasKindFieldRefInput<$PrismaModel>
    in?: $Enums.UserAliasKind[] | ListEnumUserAliasKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserAliasKind[] | ListEnumUserAliasKindFieldRefInput<$PrismaModel>
    not?: NestedEnumUserAliasKindFilter<$PrismaModel> | $Enums.UserAliasKind
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumUserAliasKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserAliasKind | EnumUserAliasKindFieldRefInput<$PrismaModel>
    in?: $Enums.UserAliasKind[] | ListEnumUserAliasKindFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserAliasKind[] | ListEnumUserAliasKindFieldRefInput<$PrismaModel>
    not?: NestedEnumUserAliasKindWithAggregatesFilter<$PrismaModel> | $Enums.UserAliasKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserAliasKindFilter<$PrismaModel>
    _max?: NestedEnumUserAliasKindFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type DelegationGrantCreateWithoutUserInput = {
    id: string
    agentId: string
    scopes?: DelegationGrantCreatescopesInput | string[]
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type DelegationGrantUncheckedCreateWithoutUserInput = {
    id: string
    agentId: string
    scopes?: DelegationGrantCreatescopesInput | string[]
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type DelegationGrantCreateOrConnectWithoutUserInput = {
    where: DelegationGrantWhereUniqueInput
    create: XOR<DelegationGrantCreateWithoutUserInput, DelegationGrantUncheckedCreateWithoutUserInput>
  }

  export type DelegationGrantCreateManyUserInputEnvelope = {
    data: DelegationGrantCreateManyUserInput | DelegationGrantCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserAliasCreateWithoutUserInput = {
    id: string
    kind: $Enums.UserAliasKind
    value: string
    verified?: boolean
    createdAt?: Date | string
  }

  export type UserAliasUncheckedCreateWithoutUserInput = {
    id: string
    kind: $Enums.UserAliasKind
    value: string
    verified?: boolean
    createdAt?: Date | string
  }

  export type UserAliasCreateOrConnectWithoutUserInput = {
    where: UserAliasWhereUniqueInput
    create: XOR<UserAliasCreateWithoutUserInput, UserAliasUncheckedCreateWithoutUserInput>
  }

  export type UserAliasCreateManyUserInputEnvelope = {
    data: UserAliasCreateManyUserInput | UserAliasCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DelegationGrantUpsertWithWhereUniqueWithoutUserInput = {
    where: DelegationGrantWhereUniqueInput
    update: XOR<DelegationGrantUpdateWithoutUserInput, DelegationGrantUncheckedUpdateWithoutUserInput>
    create: XOR<DelegationGrantCreateWithoutUserInput, DelegationGrantUncheckedCreateWithoutUserInput>
  }

  export type DelegationGrantUpdateWithWhereUniqueWithoutUserInput = {
    where: DelegationGrantWhereUniqueInput
    data: XOR<DelegationGrantUpdateWithoutUserInput, DelegationGrantUncheckedUpdateWithoutUserInput>
  }

  export type DelegationGrantUpdateManyWithWhereWithoutUserInput = {
    where: DelegationGrantScalarWhereInput
    data: XOR<DelegationGrantUpdateManyMutationInput, DelegationGrantUncheckedUpdateManyWithoutUserInput>
  }

  export type DelegationGrantScalarWhereInput = {
    AND?: DelegationGrantScalarWhereInput | DelegationGrantScalarWhereInput[]
    OR?: DelegationGrantScalarWhereInput[]
    NOT?: DelegationGrantScalarWhereInput | DelegationGrantScalarWhereInput[]
    id?: StringFilter<"DelegationGrant"> | string
    userId?: StringFilter<"DelegationGrant"> | string
    agentId?: StringFilter<"DelegationGrant"> | string
    scopes?: StringNullableListFilter<"DelegationGrant">
    expiresAt?: DateTimeNullableFilter<"DelegationGrant"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"DelegationGrant"> | Date | string | null
    createdAt?: DateTimeFilter<"DelegationGrant"> | Date | string
  }

  export type UserAliasUpsertWithWhereUniqueWithoutUserInput = {
    where: UserAliasWhereUniqueInput
    update: XOR<UserAliasUpdateWithoutUserInput, UserAliasUncheckedUpdateWithoutUserInput>
    create: XOR<UserAliasCreateWithoutUserInput, UserAliasUncheckedCreateWithoutUserInput>
  }

  export type UserAliasUpdateWithWhereUniqueWithoutUserInput = {
    where: UserAliasWhereUniqueInput
    data: XOR<UserAliasUpdateWithoutUserInput, UserAliasUncheckedUpdateWithoutUserInput>
  }

  export type UserAliasUpdateManyWithWhereWithoutUserInput = {
    where: UserAliasScalarWhereInput
    data: XOR<UserAliasUpdateManyMutationInput, UserAliasUncheckedUpdateManyWithoutUserInput>
  }

  export type UserAliasScalarWhereInput = {
    AND?: UserAliasScalarWhereInput | UserAliasScalarWhereInput[]
    OR?: UserAliasScalarWhereInput[]
    NOT?: UserAliasScalarWhereInput | UserAliasScalarWhereInput[]
    id?: StringFilter<"UserAlias"> | string
    userId?: StringFilter<"UserAlias"> | string
    kind?: EnumUserAliasKindFilter<"UserAlias"> | $Enums.UserAliasKind
    value?: StringFilter<"UserAlias"> | string
    verified?: BoolFilter<"UserAlias"> | boolean
    createdAt?: DateTimeFilter<"UserAlias"> | Date | string
  }

  export type UserCreateWithoutAliasesInput = {
    id: string
    email: string
    status?: $Enums.UserStatus
    role?: $Enums.UserRole
    displayName?: string | null
    passwordHash?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    delegations?: DelegationGrantCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAliasesInput = {
    id: string
    email: string
    status?: $Enums.UserStatus
    role?: $Enums.UserRole
    displayName?: string | null
    passwordHash?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    delegations?: DelegationGrantUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAliasesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAliasesInput, UserUncheckedCreateWithoutAliasesInput>
  }

  export type UserUpsertWithoutAliasesInput = {
    update: XOR<UserUpdateWithoutAliasesInput, UserUncheckedUpdateWithoutAliasesInput>
    create: XOR<UserCreateWithoutAliasesInput, UserUncheckedCreateWithoutAliasesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAliasesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAliasesInput, UserUncheckedUpdateWithoutAliasesInput>
  }

  export type UserUpdateWithoutAliasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    delegations?: DelegationGrantUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAliasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    delegations?: DelegationGrantUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutDelegationsInput = {
    id: string
    email: string
    status?: $Enums.UserStatus
    role?: $Enums.UserRole
    displayName?: string | null
    passwordHash?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    aliases?: UserAliasCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDelegationsInput = {
    id: string
    email: string
    status?: $Enums.UserStatus
    role?: $Enums.UserRole
    displayName?: string | null
    passwordHash?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    aliases?: UserAliasUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDelegationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDelegationsInput, UserUncheckedCreateWithoutDelegationsInput>
  }

  export type UserUpsertWithoutDelegationsInput = {
    update: XOR<UserUpdateWithoutDelegationsInput, UserUncheckedUpdateWithoutDelegationsInput>
    create: XOR<UserCreateWithoutDelegationsInput, UserUncheckedCreateWithoutDelegationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDelegationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDelegationsInput, UserUncheckedUpdateWithoutDelegationsInput>
  }

  export type UserUpdateWithoutDelegationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aliases?: UserAliasUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDelegationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    status?: EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aliases?: UserAliasUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DelegationGrantCreateManyUserInput = {
    id: string
    agentId: string
    scopes?: DelegationGrantCreatescopesInput | string[]
    expiresAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type UserAliasCreateManyUserInput = {
    id: string
    kind: $Enums.UserAliasKind
    value: string
    verified?: boolean
    createdAt?: Date | string
  }

  export type DelegationGrantUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    scopes?: DelegationGrantUpdatescopesInput | string[]
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegationGrantUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    scopes?: DelegationGrantUpdatescopesInput | string[]
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DelegationGrantUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    scopes?: DelegationGrantUpdatescopesInput | string[]
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAliasUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumUserAliasKindFieldUpdateOperationsInput | $Enums.UserAliasKind
    value?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAliasUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumUserAliasKindFieldUpdateOperationsInput | $Enums.UserAliasKind
    value?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAliasUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    kind?: EnumUserAliasKindFieldUpdateOperationsInput | $Enums.UserAliasKind
    value?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserAliasDefaultArgs instead
     */
    export type UserAliasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserAliasDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DelegationGrantDefaultArgs instead
     */
    export type DelegationGrantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DelegationGrantDefaultArgs<ExtArgs>

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