
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
 * Model CreditEntry
 * 
 */
export type CreditEntry = $Result.DefaultSelection<Prisma.$CreditEntryPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ProjectMember
 * 
 */
export type ProjectMember = $Result.DefaultSelection<Prisma.$ProjectMemberPayload>
/**
 * Model Commit
 * 
 */
export type Commit = $Result.DefaultSelection<Prisma.$CommitPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CreditReason: {
  SIGNUP: 'SIGNUP',
  PURCHASE: 'PURCHASE',
  USAGE: 'USAGE',
  REFUND: 'REFUND'
};

export type CreditReason = (typeof CreditReason)[keyof typeof CreditReason]


export const MemberRole: {
  OWNER: 'OWNER',
  MEMBER: 'MEMBER'
};

export type MemberRole = (typeof MemberRole)[keyof typeof MemberRole]

}

export type CreditReason = $Enums.CreditReason

export const CreditReason: typeof $Enums.CreditReason

export type MemberRole = $Enums.MemberRole

export const MemberRole: typeof $Enums.MemberRole

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
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creditEntry`: Exposes CRUD operations for the **CreditEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreditEntries
    * const creditEntries = await prisma.creditEntry.findMany()
    * ```
    */
  get creditEntry(): Prisma.CreditEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectMember`: Exposes CRUD operations for the **ProjectMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectMembers
    * const projectMembers = await prisma.projectMember.findMany()
    * ```
    */
  get projectMember(): Prisma.ProjectMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.commit`: Exposes CRUD operations for the **Commit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Commits
    * const commits = await prisma.commit.findMany()
    * ```
    */
  get commit(): Prisma.CommitDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    CreditEntry: 'CreditEntry',
    Project: 'Project',
    ProjectMember: 'ProjectMember',
    Commit: 'Commit'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "creditEntry" | "project" | "projectMember" | "commit"
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
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
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
      CreditEntry: {
        payload: Prisma.$CreditEntryPayload<ExtArgs>
        fields: Prisma.CreditEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreditEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreditEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditEntryPayload>
          }
          findFirst: {
            args: Prisma.CreditEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreditEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditEntryPayload>
          }
          findMany: {
            args: Prisma.CreditEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditEntryPayload>[]
          }
          create: {
            args: Prisma.CreditEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditEntryPayload>
          }
          createMany: {
            args: Prisma.CreditEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreditEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditEntryPayload>[]
          }
          delete: {
            args: Prisma.CreditEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditEntryPayload>
          }
          update: {
            args: Prisma.CreditEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditEntryPayload>
          }
          deleteMany: {
            args: Prisma.CreditEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreditEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CreditEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditEntryPayload>[]
          }
          upsert: {
            args: Prisma.CreditEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditEntryPayload>
          }
          aggregate: {
            args: Prisma.CreditEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreditEntry>
          }
          groupBy: {
            args: Prisma.CreditEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreditEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreditEntryCountArgs<ExtArgs>
            result: $Utils.Optional<CreditEntryCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ProjectMember: {
        payload: Prisma.$ProjectMemberPayload<ExtArgs>
        fields: Prisma.ProjectMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          findFirst: {
            args: Prisma.ProjectMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          findMany: {
            args: Prisma.ProjectMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>[]
          }
          create: {
            args: Prisma.ProjectMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          createMany: {
            args: Prisma.ProjectMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>[]
          }
          delete: {
            args: Prisma.ProjectMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          update: {
            args: Prisma.ProjectMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          deleteMany: {
            args: Prisma.ProjectMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>[]
          }
          upsert: {
            args: Prisma.ProjectMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectMemberPayload>
          }
          aggregate: {
            args: Prisma.ProjectMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectMember>
          }
          groupBy: {
            args: Prisma.ProjectMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectMemberCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectMemberCountAggregateOutputType> | number
          }
        }
      }
      Commit: {
        payload: Prisma.$CommitPayload<ExtArgs>
        fields: Prisma.CommitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>
          }
          findFirst: {
            args: Prisma.CommitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>
          }
          findMany: {
            args: Prisma.CommitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>[]
          }
          create: {
            args: Prisma.CommitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>
          }
          createMany: {
            args: Prisma.CommitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>[]
          }
          delete: {
            args: Prisma.CommitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>
          }
          update: {
            args: Prisma.CommitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>
          }
          deleteMany: {
            args: Prisma.CommitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>[]
          }
          upsert: {
            args: Prisma.CommitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitPayload>
          }
          aggregate: {
            args: Prisma.CommitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommit>
          }
          groupBy: {
            args: Prisma.CommitGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommitGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommitCountArgs<ExtArgs>
            result: $Utils.Optional<CommitCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    creditEntry?: CreditEntryOmit
    project?: ProjectOmit
    projectMember?: ProjectMemberOmit
    commit?: CommitOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'updateManyAndReturn'
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
    credits: number
    projects: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    credits?: boolean | UserCountOutputTypeCountCreditsArgs
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
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
  export type UserCountOutputTypeCountCreditsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditEntryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMemberWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    members: number
    commits: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | ProjectCountOutputTypeCountMembersArgs
    commits?: boolean | ProjectCountOutputTypeCountCommitsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMemberWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountCommitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommitWhereInput
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
    createdAt: Date | null
    updatedAt: Date | null
    imageUrl: string | null
    firstName: string | null
    lastName: string | null
    emailAddress: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    imageUrl: string | null
    firstName: string | null
    lastName: string | null
    emailAddress: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    imageUrl: number
    firstName: number
    lastName: number
    emailAddress: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    imageUrl?: true
    firstName?: true
    lastName?: true
    emailAddress?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    imageUrl?: true
    firstName?: true
    lastName?: true
    emailAddress?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    imageUrl?: true
    firstName?: true
    lastName?: true
    emailAddress?: true
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
    createdAt: Date
    updatedAt: Date
    imageUrl: string | null
    firstName: string | null
    lastName: string | null
    emailAddress: string
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
    createdAt?: boolean
    updatedAt?: boolean
    imageUrl?: boolean
    firstName?: boolean
    lastName?: boolean
    emailAddress?: boolean
    credits?: boolean | User$creditsArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    imageUrl?: boolean
    firstName?: boolean
    lastName?: boolean
    emailAddress?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    imageUrl?: boolean
    firstName?: boolean
    lastName?: boolean
    emailAddress?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    imageUrl?: boolean
    firstName?: boolean
    lastName?: boolean
    emailAddress?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "imageUrl" | "firstName" | "lastName" | "emailAddress", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    credits?: boolean | User$creditsArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      credits: Prisma.$CreditEntryPayload<ExtArgs>[]
      projects: Prisma.$ProjectMemberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      imageUrl: string | null
      firstName: string | null
      lastName: string | null
      emailAddress: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    credits<T extends User$creditsArgs<ExtArgs> = {}>(args?: Subset<T, User$creditsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly imageUrl: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly emailAddress: FieldRef<"User", 'String'>
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.credits
   */
  export type User$creditsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditEntry
     */
    select?: CreditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditEntry
     */
    omit?: CreditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditEntryInclude<ExtArgs> | null
    where?: CreditEntryWhereInput
    orderBy?: CreditEntryOrderByWithRelationInput | CreditEntryOrderByWithRelationInput[]
    cursor?: CreditEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreditEntryScalarFieldEnum | CreditEntryScalarFieldEnum[]
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    where?: ProjectMemberWhereInput
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    cursor?: ProjectMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectMemberScalarFieldEnum | ProjectMemberScalarFieldEnum[]
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model CreditEntry
   */

  export type AggregateCreditEntry = {
    _count: CreditEntryCountAggregateOutputType | null
    _avg: CreditEntryAvgAggregateOutputType | null
    _sum: CreditEntrySumAggregateOutputType | null
    _min: CreditEntryMinAggregateOutputType | null
    _max: CreditEntryMaxAggregateOutputType | null
  }

  export type CreditEntryAvgAggregateOutputType = {
    delta: number | null
  }

  export type CreditEntrySumAggregateOutputType = {
    delta: number | null
  }

  export type CreditEntryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    delta: number | null
    reason: $Enums.CreditReason | null
    createdAt: Date | null
  }

  export type CreditEntryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    delta: number | null
    reason: $Enums.CreditReason | null
    createdAt: Date | null
  }

  export type CreditEntryCountAggregateOutputType = {
    id: number
    userId: number
    delta: number
    reason: number
    createdAt: number
    _all: number
  }


  export type CreditEntryAvgAggregateInputType = {
    delta?: true
  }

  export type CreditEntrySumAggregateInputType = {
    delta?: true
  }

  export type CreditEntryMinAggregateInputType = {
    id?: true
    userId?: true
    delta?: true
    reason?: true
    createdAt?: true
  }

  export type CreditEntryMaxAggregateInputType = {
    id?: true
    userId?: true
    delta?: true
    reason?: true
    createdAt?: true
  }

  export type CreditEntryCountAggregateInputType = {
    id?: true
    userId?: true
    delta?: true
    reason?: true
    createdAt?: true
    _all?: true
  }

  export type CreditEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditEntry to aggregate.
     */
    where?: CreditEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditEntries to fetch.
     */
    orderBy?: CreditEntryOrderByWithRelationInput | CreditEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreditEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreditEntries
    **/
    _count?: true | CreditEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CreditEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CreditEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreditEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreditEntryMaxAggregateInputType
  }

  export type GetCreditEntryAggregateType<T extends CreditEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateCreditEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreditEntry[P]>
      : GetScalarType<T[P], AggregateCreditEntry[P]>
  }




  export type CreditEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditEntryWhereInput
    orderBy?: CreditEntryOrderByWithAggregationInput | CreditEntryOrderByWithAggregationInput[]
    by: CreditEntryScalarFieldEnum[] | CreditEntryScalarFieldEnum
    having?: CreditEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreditEntryCountAggregateInputType | true
    _avg?: CreditEntryAvgAggregateInputType
    _sum?: CreditEntrySumAggregateInputType
    _min?: CreditEntryMinAggregateInputType
    _max?: CreditEntryMaxAggregateInputType
  }

  export type CreditEntryGroupByOutputType = {
    id: string
    userId: string
    delta: number
    reason: $Enums.CreditReason
    createdAt: Date
    _count: CreditEntryCountAggregateOutputType | null
    _avg: CreditEntryAvgAggregateOutputType | null
    _sum: CreditEntrySumAggregateOutputType | null
    _min: CreditEntryMinAggregateOutputType | null
    _max: CreditEntryMaxAggregateOutputType | null
  }

  type GetCreditEntryGroupByPayload<T extends CreditEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreditEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreditEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreditEntryGroupByOutputType[P]>
            : GetScalarType<T[P], CreditEntryGroupByOutputType[P]>
        }
      >
    >


  export type CreditEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    delta?: boolean
    reason?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditEntry"]>

  export type CreditEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    delta?: boolean
    reason?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditEntry"]>

  export type CreditEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    delta?: boolean
    reason?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditEntry"]>

  export type CreditEntrySelectScalar = {
    id?: boolean
    userId?: boolean
    delta?: boolean
    reason?: boolean
    createdAt?: boolean
  }

  export type CreditEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "delta" | "reason" | "createdAt", ExtArgs["result"]["creditEntry"]>
  export type CreditEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CreditEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CreditEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CreditEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreditEntry"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      delta: number
      reason: $Enums.CreditReason
      createdAt: Date
    }, ExtArgs["result"]["creditEntry"]>
    composites: {}
  }

  type CreditEntryGetPayload<S extends boolean | null | undefined | CreditEntryDefaultArgs> = $Result.GetResult<Prisma.$CreditEntryPayload, S>

  type CreditEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreditEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreditEntryCountAggregateInputType | true
    }

  export interface CreditEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreditEntry'], meta: { name: 'CreditEntry' } }
    /**
     * Find zero or one CreditEntry that matches the filter.
     * @param {CreditEntryFindUniqueArgs} args - Arguments to find a CreditEntry
     * @example
     * // Get one CreditEntry
     * const creditEntry = await prisma.creditEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreditEntryFindUniqueArgs>(args: SelectSubset<T, CreditEntryFindUniqueArgs<ExtArgs>>): Prisma__CreditEntryClient<$Result.GetResult<Prisma.$CreditEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CreditEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreditEntryFindUniqueOrThrowArgs} args - Arguments to find a CreditEntry
     * @example
     * // Get one CreditEntry
     * const creditEntry = await prisma.creditEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreditEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, CreditEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreditEntryClient<$Result.GetResult<Prisma.$CreditEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditEntryFindFirstArgs} args - Arguments to find a CreditEntry
     * @example
     * // Get one CreditEntry
     * const creditEntry = await prisma.creditEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreditEntryFindFirstArgs>(args?: SelectSubset<T, CreditEntryFindFirstArgs<ExtArgs>>): Prisma__CreditEntryClient<$Result.GetResult<Prisma.$CreditEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditEntryFindFirstOrThrowArgs} args - Arguments to find a CreditEntry
     * @example
     * // Get one CreditEntry
     * const creditEntry = await prisma.creditEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreditEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, CreditEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreditEntryClient<$Result.GetResult<Prisma.$CreditEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreditEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreditEntries
     * const creditEntries = await prisma.creditEntry.findMany()
     * 
     * // Get first 10 CreditEntries
     * const creditEntries = await prisma.creditEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creditEntryWithIdOnly = await prisma.creditEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreditEntryFindManyArgs>(args?: SelectSubset<T, CreditEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CreditEntry.
     * @param {CreditEntryCreateArgs} args - Arguments to create a CreditEntry.
     * @example
     * // Create one CreditEntry
     * const CreditEntry = await prisma.creditEntry.create({
     *   data: {
     *     // ... data to create a CreditEntry
     *   }
     * })
     * 
     */
    create<T extends CreditEntryCreateArgs>(args: SelectSubset<T, CreditEntryCreateArgs<ExtArgs>>): Prisma__CreditEntryClient<$Result.GetResult<Prisma.$CreditEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CreditEntries.
     * @param {CreditEntryCreateManyArgs} args - Arguments to create many CreditEntries.
     * @example
     * // Create many CreditEntries
     * const creditEntry = await prisma.creditEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreditEntryCreateManyArgs>(args?: SelectSubset<T, CreditEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreditEntries and returns the data saved in the database.
     * @param {CreditEntryCreateManyAndReturnArgs} args - Arguments to create many CreditEntries.
     * @example
     * // Create many CreditEntries
     * const creditEntry = await prisma.creditEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreditEntries and only return the `id`
     * const creditEntryWithIdOnly = await prisma.creditEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreditEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, CreditEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CreditEntry.
     * @param {CreditEntryDeleteArgs} args - Arguments to delete one CreditEntry.
     * @example
     * // Delete one CreditEntry
     * const CreditEntry = await prisma.creditEntry.delete({
     *   where: {
     *     // ... filter to delete one CreditEntry
     *   }
     * })
     * 
     */
    delete<T extends CreditEntryDeleteArgs>(args: SelectSubset<T, CreditEntryDeleteArgs<ExtArgs>>): Prisma__CreditEntryClient<$Result.GetResult<Prisma.$CreditEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CreditEntry.
     * @param {CreditEntryUpdateArgs} args - Arguments to update one CreditEntry.
     * @example
     * // Update one CreditEntry
     * const creditEntry = await prisma.creditEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreditEntryUpdateArgs>(args: SelectSubset<T, CreditEntryUpdateArgs<ExtArgs>>): Prisma__CreditEntryClient<$Result.GetResult<Prisma.$CreditEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CreditEntries.
     * @param {CreditEntryDeleteManyArgs} args - Arguments to filter CreditEntries to delete.
     * @example
     * // Delete a few CreditEntries
     * const { count } = await prisma.creditEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreditEntryDeleteManyArgs>(args?: SelectSubset<T, CreditEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreditEntries
     * const creditEntry = await prisma.creditEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreditEntryUpdateManyArgs>(args: SelectSubset<T, CreditEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditEntries and returns the data updated in the database.
     * @param {CreditEntryUpdateManyAndReturnArgs} args - Arguments to update many CreditEntries.
     * @example
     * // Update many CreditEntries
     * const creditEntry = await prisma.creditEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CreditEntries and only return the `id`
     * const creditEntryWithIdOnly = await prisma.creditEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CreditEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, CreditEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CreditEntry.
     * @param {CreditEntryUpsertArgs} args - Arguments to update or create a CreditEntry.
     * @example
     * // Update or create a CreditEntry
     * const creditEntry = await prisma.creditEntry.upsert({
     *   create: {
     *     // ... data to create a CreditEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreditEntry we want to update
     *   }
     * })
     */
    upsert<T extends CreditEntryUpsertArgs>(args: SelectSubset<T, CreditEntryUpsertArgs<ExtArgs>>): Prisma__CreditEntryClient<$Result.GetResult<Prisma.$CreditEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CreditEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditEntryCountArgs} args - Arguments to filter CreditEntries to count.
     * @example
     * // Count the number of CreditEntries
     * const count = await prisma.creditEntry.count({
     *   where: {
     *     // ... the filter for the CreditEntries we want to count
     *   }
     * })
    **/
    count<T extends CreditEntryCountArgs>(
      args?: Subset<T, CreditEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreditEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreditEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CreditEntryAggregateArgs>(args: Subset<T, CreditEntryAggregateArgs>): Prisma.PrismaPromise<GetCreditEntryAggregateType<T>>

    /**
     * Group by CreditEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditEntryGroupByArgs} args - Group by arguments.
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
      T extends CreditEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreditEntryGroupByArgs['orderBy'] }
        : { orderBy?: CreditEntryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CreditEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreditEntry model
   */
  readonly fields: CreditEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreditEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreditEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CreditEntry model
   */
  interface CreditEntryFieldRefs {
    readonly id: FieldRef<"CreditEntry", 'String'>
    readonly userId: FieldRef<"CreditEntry", 'String'>
    readonly delta: FieldRef<"CreditEntry", 'Int'>
    readonly reason: FieldRef<"CreditEntry", 'CreditReason'>
    readonly createdAt: FieldRef<"CreditEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreditEntry findUnique
   */
  export type CreditEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditEntry
     */
    select?: CreditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditEntry
     */
    omit?: CreditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditEntryInclude<ExtArgs> | null
    /**
     * Filter, which CreditEntry to fetch.
     */
    where: CreditEntryWhereUniqueInput
  }

  /**
   * CreditEntry findUniqueOrThrow
   */
  export type CreditEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditEntry
     */
    select?: CreditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditEntry
     */
    omit?: CreditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditEntryInclude<ExtArgs> | null
    /**
     * Filter, which CreditEntry to fetch.
     */
    where: CreditEntryWhereUniqueInput
  }

  /**
   * CreditEntry findFirst
   */
  export type CreditEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditEntry
     */
    select?: CreditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditEntry
     */
    omit?: CreditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditEntryInclude<ExtArgs> | null
    /**
     * Filter, which CreditEntry to fetch.
     */
    where?: CreditEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditEntries to fetch.
     */
    orderBy?: CreditEntryOrderByWithRelationInput | CreditEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditEntries.
     */
    cursor?: CreditEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditEntries.
     */
    distinct?: CreditEntryScalarFieldEnum | CreditEntryScalarFieldEnum[]
  }

  /**
   * CreditEntry findFirstOrThrow
   */
  export type CreditEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditEntry
     */
    select?: CreditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditEntry
     */
    omit?: CreditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditEntryInclude<ExtArgs> | null
    /**
     * Filter, which CreditEntry to fetch.
     */
    where?: CreditEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditEntries to fetch.
     */
    orderBy?: CreditEntryOrderByWithRelationInput | CreditEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditEntries.
     */
    cursor?: CreditEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditEntries.
     */
    distinct?: CreditEntryScalarFieldEnum | CreditEntryScalarFieldEnum[]
  }

  /**
   * CreditEntry findMany
   */
  export type CreditEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditEntry
     */
    select?: CreditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditEntry
     */
    omit?: CreditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditEntryInclude<ExtArgs> | null
    /**
     * Filter, which CreditEntries to fetch.
     */
    where?: CreditEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditEntries to fetch.
     */
    orderBy?: CreditEntryOrderByWithRelationInput | CreditEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreditEntries.
     */
    cursor?: CreditEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditEntries.
     */
    skip?: number
    distinct?: CreditEntryScalarFieldEnum | CreditEntryScalarFieldEnum[]
  }

  /**
   * CreditEntry create
   */
  export type CreditEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditEntry
     */
    select?: CreditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditEntry
     */
    omit?: CreditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a CreditEntry.
     */
    data: XOR<CreditEntryCreateInput, CreditEntryUncheckedCreateInput>
  }

  /**
   * CreditEntry createMany
   */
  export type CreditEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreditEntries.
     */
    data: CreditEntryCreateManyInput | CreditEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreditEntry createManyAndReturn
   */
  export type CreditEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditEntry
     */
    select?: CreditEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditEntry
     */
    omit?: CreditEntryOmit<ExtArgs> | null
    /**
     * The data used to create many CreditEntries.
     */
    data: CreditEntryCreateManyInput | CreditEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditEntry update
   */
  export type CreditEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditEntry
     */
    select?: CreditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditEntry
     */
    omit?: CreditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a CreditEntry.
     */
    data: XOR<CreditEntryUpdateInput, CreditEntryUncheckedUpdateInput>
    /**
     * Choose, which CreditEntry to update.
     */
    where: CreditEntryWhereUniqueInput
  }

  /**
   * CreditEntry updateMany
   */
  export type CreditEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreditEntries.
     */
    data: XOR<CreditEntryUpdateManyMutationInput, CreditEntryUncheckedUpdateManyInput>
    /**
     * Filter which CreditEntries to update
     */
    where?: CreditEntryWhereInput
    /**
     * Limit how many CreditEntries to update.
     */
    limit?: number
  }

  /**
   * CreditEntry updateManyAndReturn
   */
  export type CreditEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditEntry
     */
    select?: CreditEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditEntry
     */
    omit?: CreditEntryOmit<ExtArgs> | null
    /**
     * The data used to update CreditEntries.
     */
    data: XOR<CreditEntryUpdateManyMutationInput, CreditEntryUncheckedUpdateManyInput>
    /**
     * Filter which CreditEntries to update
     */
    where?: CreditEntryWhereInput
    /**
     * Limit how many CreditEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditEntry upsert
   */
  export type CreditEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditEntry
     */
    select?: CreditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditEntry
     */
    omit?: CreditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the CreditEntry to update in case it exists.
     */
    where: CreditEntryWhereUniqueInput
    /**
     * In case the CreditEntry found by the `where` argument doesn't exist, create a new CreditEntry with this data.
     */
    create: XOR<CreditEntryCreateInput, CreditEntryUncheckedCreateInput>
    /**
     * In case the CreditEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreditEntryUpdateInput, CreditEntryUncheckedUpdateInput>
  }

  /**
   * CreditEntry delete
   */
  export type CreditEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditEntry
     */
    select?: CreditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditEntry
     */
    omit?: CreditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditEntryInclude<ExtArgs> | null
    /**
     * Filter which CreditEntry to delete.
     */
    where: CreditEntryWhereUniqueInput
  }

  /**
   * CreditEntry deleteMany
   */
  export type CreditEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditEntries to delete
     */
    where?: CreditEntryWhereInput
    /**
     * Limit how many CreditEntries to delete.
     */
    limit?: number
  }

  /**
   * CreditEntry without action
   */
  export type CreditEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditEntry
     */
    select?: CreditEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditEntry
     */
    omit?: CreditEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditEntryInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    githubUrl: string | null
    deletedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    githubUrl: string | null
    deletedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    githubUrl: number
    deletedAt: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    githubUrl?: true
    deletedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    githubUrl?: true
    deletedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    githubUrl?: true
    deletedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    githubUrl: string
    deletedAt: Date | null
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    githubUrl?: boolean
    deletedAt?: boolean
    members?: boolean | Project$membersArgs<ExtArgs>
    commits?: boolean | Project$commitsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    githubUrl?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    githubUrl?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    githubUrl?: boolean
    deletedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "name" | "githubUrl" | "deletedAt", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | Project$membersArgs<ExtArgs>
    commits?: boolean | Project$commitsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      members: Prisma.$ProjectMemberPayload<ExtArgs>[]
      commits: Prisma.$CommitPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      name: string
      githubUrl: string
      deletedAt: Date | null
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
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
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    members<T extends Project$membersArgs<ExtArgs> = {}>(args?: Subset<T, Project$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    commits<T extends Project$commitsArgs<ExtArgs> = {}>(args?: Subset<T, Project$commitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
    readonly name: FieldRef<"Project", 'String'>
    readonly githubUrl: FieldRef<"Project", 'String'>
    readonly deletedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.members
   */
  export type Project$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    where?: ProjectMemberWhereInput
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    cursor?: ProjectMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectMemberScalarFieldEnum | ProjectMemberScalarFieldEnum[]
  }

  /**
   * Project.commits
   */
  export type Project$commitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    where?: CommitWhereInput
    orderBy?: CommitOrderByWithRelationInput | CommitOrderByWithRelationInput[]
    cursor?: CommitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommitScalarFieldEnum | CommitScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ProjectMember
   */

  export type AggregateProjectMember = {
    _count: ProjectMemberCountAggregateOutputType | null
    _min: ProjectMemberMinAggregateOutputType | null
    _max: ProjectMemberMaxAggregateOutputType | null
  }

  export type ProjectMemberMinAggregateOutputType = {
    userId: string | null
    projectId: string | null
    role: $Enums.MemberRole | null
  }

  export type ProjectMemberMaxAggregateOutputType = {
    userId: string | null
    projectId: string | null
    role: $Enums.MemberRole | null
  }

  export type ProjectMemberCountAggregateOutputType = {
    userId: number
    projectId: number
    role: number
    _all: number
  }


  export type ProjectMemberMinAggregateInputType = {
    userId?: true
    projectId?: true
    role?: true
  }

  export type ProjectMemberMaxAggregateInputType = {
    userId?: true
    projectId?: true
    role?: true
  }

  export type ProjectMemberCountAggregateInputType = {
    userId?: true
    projectId?: true
    role?: true
    _all?: true
  }

  export type ProjectMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectMember to aggregate.
     */
    where?: ProjectMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMembers to fetch.
     */
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectMembers
    **/
    _count?: true | ProjectMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMemberMaxAggregateInputType
  }

  export type GetProjectMemberAggregateType<T extends ProjectMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectMember[P]>
      : GetScalarType<T[P], AggregateProjectMember[P]>
  }




  export type ProjectMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectMemberWhereInput
    orderBy?: ProjectMemberOrderByWithAggregationInput | ProjectMemberOrderByWithAggregationInput[]
    by: ProjectMemberScalarFieldEnum[] | ProjectMemberScalarFieldEnum
    having?: ProjectMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectMemberCountAggregateInputType | true
    _min?: ProjectMemberMinAggregateInputType
    _max?: ProjectMemberMaxAggregateInputType
  }

  export type ProjectMemberGroupByOutputType = {
    userId: string
    projectId: string
    role: $Enums.MemberRole
    _count: ProjectMemberCountAggregateOutputType | null
    _min: ProjectMemberMinAggregateOutputType | null
    _max: ProjectMemberMaxAggregateOutputType | null
  }

  type GetProjectMemberGroupByPayload<T extends ProjectMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectMemberGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectMemberGroupByOutputType[P]>
        }
      >
    >


  export type ProjectMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    projectId?: boolean
    role?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMember"]>

  export type ProjectMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    projectId?: boolean
    role?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMember"]>

  export type ProjectMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    projectId?: boolean
    role?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectMember"]>

  export type ProjectMemberSelectScalar = {
    userId?: boolean
    projectId?: boolean
    role?: boolean
  }

  export type ProjectMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "projectId" | "role", ExtArgs["result"]["projectMember"]>
  export type ProjectMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProjectMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectMember"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      projectId: string
      role: $Enums.MemberRole
    }, ExtArgs["result"]["projectMember"]>
    composites: {}
  }

  type ProjectMemberGetPayload<S extends boolean | null | undefined | ProjectMemberDefaultArgs> = $Result.GetResult<Prisma.$ProjectMemberPayload, S>

  type ProjectMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectMemberCountAggregateInputType | true
    }

  export interface ProjectMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectMember'], meta: { name: 'ProjectMember' } }
    /**
     * Find zero or one ProjectMember that matches the filter.
     * @param {ProjectMemberFindUniqueArgs} args - Arguments to find a ProjectMember
     * @example
     * // Get one ProjectMember
     * const projectMember = await prisma.projectMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectMemberFindUniqueArgs>(args: SelectSubset<T, ProjectMemberFindUniqueArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectMemberFindUniqueOrThrowArgs} args - Arguments to find a ProjectMember
     * @example
     * // Get one ProjectMember
     * const projectMember = await prisma.projectMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberFindFirstArgs} args - Arguments to find a ProjectMember
     * @example
     * // Get one ProjectMember
     * const projectMember = await prisma.projectMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectMemberFindFirstArgs>(args?: SelectSubset<T, ProjectMemberFindFirstArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberFindFirstOrThrowArgs} args - Arguments to find a ProjectMember
     * @example
     * // Get one ProjectMember
     * const projectMember = await prisma.projectMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectMembers
     * const projectMembers = await prisma.projectMember.findMany()
     * 
     * // Get first 10 ProjectMembers
     * const projectMembers = await prisma.projectMember.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const projectMemberWithUserIdOnly = await prisma.projectMember.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends ProjectMemberFindManyArgs>(args?: SelectSubset<T, ProjectMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectMember.
     * @param {ProjectMemberCreateArgs} args - Arguments to create a ProjectMember.
     * @example
     * // Create one ProjectMember
     * const ProjectMember = await prisma.projectMember.create({
     *   data: {
     *     // ... data to create a ProjectMember
     *   }
     * })
     * 
     */
    create<T extends ProjectMemberCreateArgs>(args: SelectSubset<T, ProjectMemberCreateArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectMembers.
     * @param {ProjectMemberCreateManyArgs} args - Arguments to create many ProjectMembers.
     * @example
     * // Create many ProjectMembers
     * const projectMember = await prisma.projectMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectMemberCreateManyArgs>(args?: SelectSubset<T, ProjectMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectMembers and returns the data saved in the database.
     * @param {ProjectMemberCreateManyAndReturnArgs} args - Arguments to create many ProjectMembers.
     * @example
     * // Create many ProjectMembers
     * const projectMember = await prisma.projectMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectMembers and only return the `userId`
     * const projectMemberWithUserIdOnly = await prisma.projectMember.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectMember.
     * @param {ProjectMemberDeleteArgs} args - Arguments to delete one ProjectMember.
     * @example
     * // Delete one ProjectMember
     * const ProjectMember = await prisma.projectMember.delete({
     *   where: {
     *     // ... filter to delete one ProjectMember
     *   }
     * })
     * 
     */
    delete<T extends ProjectMemberDeleteArgs>(args: SelectSubset<T, ProjectMemberDeleteArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectMember.
     * @param {ProjectMemberUpdateArgs} args - Arguments to update one ProjectMember.
     * @example
     * // Update one ProjectMember
     * const projectMember = await prisma.projectMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectMemberUpdateArgs>(args: SelectSubset<T, ProjectMemberUpdateArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectMembers.
     * @param {ProjectMemberDeleteManyArgs} args - Arguments to filter ProjectMembers to delete.
     * @example
     * // Delete a few ProjectMembers
     * const { count } = await prisma.projectMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectMemberDeleteManyArgs>(args?: SelectSubset<T, ProjectMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectMembers
     * const projectMember = await prisma.projectMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectMemberUpdateManyArgs>(args: SelectSubset<T, ProjectMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectMembers and returns the data updated in the database.
     * @param {ProjectMemberUpdateManyAndReturnArgs} args - Arguments to update many ProjectMembers.
     * @example
     * // Update many ProjectMembers
     * const projectMember = await prisma.projectMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectMembers and only return the `userId`
     * const projectMemberWithUserIdOnly = await prisma.projectMember.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectMember.
     * @param {ProjectMemberUpsertArgs} args - Arguments to update or create a ProjectMember.
     * @example
     * // Update or create a ProjectMember
     * const projectMember = await prisma.projectMember.upsert({
     *   create: {
     *     // ... data to create a ProjectMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectMember we want to update
     *   }
     * })
     */
    upsert<T extends ProjectMemberUpsertArgs>(args: SelectSubset<T, ProjectMemberUpsertArgs<ExtArgs>>): Prisma__ProjectMemberClient<$Result.GetResult<Prisma.$ProjectMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberCountArgs} args - Arguments to filter ProjectMembers to count.
     * @example
     * // Count the number of ProjectMembers
     * const count = await prisma.projectMember.count({
     *   where: {
     *     // ... the filter for the ProjectMembers we want to count
     *   }
     * })
    **/
    count<T extends ProjectMemberCountArgs>(
      args?: Subset<T, ProjectMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectMemberAggregateArgs>(args: Subset<T, ProjectMemberAggregateArgs>): Prisma.PrismaPromise<GetProjectMemberAggregateType<T>>

    /**
     * Group by ProjectMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectMemberGroupByArgs} args - Group by arguments.
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
      T extends ProjectMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectMemberGroupByArgs['orderBy'] }
        : { orderBy?: ProjectMemberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProjectMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectMember model
   */
  readonly fields: ProjectMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ProjectMember model
   */
  interface ProjectMemberFieldRefs {
    readonly userId: FieldRef<"ProjectMember", 'String'>
    readonly projectId: FieldRef<"ProjectMember", 'String'>
    readonly role: FieldRef<"ProjectMember", 'MemberRole'>
  }
    

  // Custom InputTypes
  /**
   * ProjectMember findUnique
   */
  export type ProjectMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMember to fetch.
     */
    where: ProjectMemberWhereUniqueInput
  }

  /**
   * ProjectMember findUniqueOrThrow
   */
  export type ProjectMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMember to fetch.
     */
    where: ProjectMemberWhereUniqueInput
  }

  /**
   * ProjectMember findFirst
   */
  export type ProjectMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMember to fetch.
     */
    where?: ProjectMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMembers to fetch.
     */
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectMembers.
     */
    cursor?: ProjectMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectMembers.
     */
    distinct?: ProjectMemberScalarFieldEnum | ProjectMemberScalarFieldEnum[]
  }

  /**
   * ProjectMember findFirstOrThrow
   */
  export type ProjectMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMember to fetch.
     */
    where?: ProjectMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMembers to fetch.
     */
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectMembers.
     */
    cursor?: ProjectMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectMembers.
     */
    distinct?: ProjectMemberScalarFieldEnum | ProjectMemberScalarFieldEnum[]
  }

  /**
   * ProjectMember findMany
   */
  export type ProjectMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter, which ProjectMembers to fetch.
     */
    where?: ProjectMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectMembers to fetch.
     */
    orderBy?: ProjectMemberOrderByWithRelationInput | ProjectMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectMembers.
     */
    cursor?: ProjectMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectMembers.
     */
    skip?: number
    distinct?: ProjectMemberScalarFieldEnum | ProjectMemberScalarFieldEnum[]
  }

  /**
   * ProjectMember create
   */
  export type ProjectMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectMember.
     */
    data: XOR<ProjectMemberCreateInput, ProjectMemberUncheckedCreateInput>
  }

  /**
   * ProjectMember createMany
   */
  export type ProjectMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectMembers.
     */
    data: ProjectMemberCreateManyInput | ProjectMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectMember createManyAndReturn
   */
  export type ProjectMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectMembers.
     */
    data: ProjectMemberCreateManyInput | ProjectMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectMember update
   */
  export type ProjectMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectMember.
     */
    data: XOR<ProjectMemberUpdateInput, ProjectMemberUncheckedUpdateInput>
    /**
     * Choose, which ProjectMember to update.
     */
    where: ProjectMemberWhereUniqueInput
  }

  /**
   * ProjectMember updateMany
   */
  export type ProjectMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectMembers.
     */
    data: XOR<ProjectMemberUpdateManyMutationInput, ProjectMemberUncheckedUpdateManyInput>
    /**
     * Filter which ProjectMembers to update
     */
    where?: ProjectMemberWhereInput
    /**
     * Limit how many ProjectMembers to update.
     */
    limit?: number
  }

  /**
   * ProjectMember updateManyAndReturn
   */
  export type ProjectMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * The data used to update ProjectMembers.
     */
    data: XOR<ProjectMemberUpdateManyMutationInput, ProjectMemberUncheckedUpdateManyInput>
    /**
     * Filter which ProjectMembers to update
     */
    where?: ProjectMemberWhereInput
    /**
     * Limit how many ProjectMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectMember upsert
   */
  export type ProjectMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectMember to update in case it exists.
     */
    where: ProjectMemberWhereUniqueInput
    /**
     * In case the ProjectMember found by the `where` argument doesn't exist, create a new ProjectMember with this data.
     */
    create: XOR<ProjectMemberCreateInput, ProjectMemberUncheckedCreateInput>
    /**
     * In case the ProjectMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectMemberUpdateInput, ProjectMemberUncheckedUpdateInput>
  }

  /**
   * ProjectMember delete
   */
  export type ProjectMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
    /**
     * Filter which ProjectMember to delete.
     */
    where: ProjectMemberWhereUniqueInput
  }

  /**
   * ProjectMember deleteMany
   */
  export type ProjectMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectMembers to delete
     */
    where?: ProjectMemberWhereInput
    /**
     * Limit how many ProjectMembers to delete.
     */
    limit?: number
  }

  /**
   * ProjectMember without action
   */
  export type ProjectMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectMember
     */
    select?: ProjectMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectMember
     */
    omit?: ProjectMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectMemberInclude<ExtArgs> | null
  }


  /**
   * Model Commit
   */

  export type AggregateCommit = {
    _count: CommitCountAggregateOutputType | null
    _min: CommitMinAggregateOutputType | null
    _max: CommitMaxAggregateOutputType | null
  }

  export type CommitMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    projectId: string | null
    commitMessage: string | null
    commitHash: string | null
    commitAuthorName: string | null
    commitAuthorAvatar: string | null
    commitDate: Date | null
    summary: string | null
  }

  export type CommitMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    projectId: string | null
    commitMessage: string | null
    commitHash: string | null
    commitAuthorName: string | null
    commitAuthorAvatar: string | null
    commitDate: Date | null
    summary: string | null
  }

  export type CommitCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    projectId: number
    commitMessage: number
    commitHash: number
    commitAuthorName: number
    commitAuthorAvatar: number
    commitDate: number
    summary: number
    _all: number
  }


  export type CommitMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
    commitMessage?: true
    commitHash?: true
    commitAuthorName?: true
    commitAuthorAvatar?: true
    commitDate?: true
    summary?: true
  }

  export type CommitMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
    commitMessage?: true
    commitHash?: true
    commitAuthorName?: true
    commitAuthorAvatar?: true
    commitDate?: true
    summary?: true
  }

  export type CommitCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
    commitMessage?: true
    commitHash?: true
    commitAuthorName?: true
    commitAuthorAvatar?: true
    commitDate?: true
    summary?: true
    _all?: true
  }

  export type CommitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commit to aggregate.
     */
    where?: CommitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commits to fetch.
     */
    orderBy?: CommitOrderByWithRelationInput | CommitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Commits
    **/
    _count?: true | CommitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommitMaxAggregateInputType
  }

  export type GetCommitAggregateType<T extends CommitAggregateArgs> = {
        [P in keyof T & keyof AggregateCommit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommit[P]>
      : GetScalarType<T[P], AggregateCommit[P]>
  }




  export type CommitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommitWhereInput
    orderBy?: CommitOrderByWithAggregationInput | CommitOrderByWithAggregationInput[]
    by: CommitScalarFieldEnum[] | CommitScalarFieldEnum
    having?: CommitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommitCountAggregateInputType | true
    _min?: CommitMinAggregateInputType
    _max?: CommitMaxAggregateInputType
  }

  export type CommitGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    projectId: string
    commitMessage: string
    commitHash: string
    commitAuthorName: string
    commitAuthorAvatar: string
    commitDate: Date
    summary: string
    _count: CommitCountAggregateOutputType | null
    _min: CommitMinAggregateOutputType | null
    _max: CommitMaxAggregateOutputType | null
  }

  type GetCommitGroupByPayload<T extends CommitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommitGroupByOutputType[P]>
            : GetScalarType<T[P], CommitGroupByOutputType[P]>
        }
      >
    >


  export type CommitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectId?: boolean
    commitMessage?: boolean
    commitHash?: boolean
    commitAuthorName?: boolean
    commitAuthorAvatar?: boolean
    commitDate?: boolean
    summary?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commit"]>

  export type CommitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectId?: boolean
    commitMessage?: boolean
    commitHash?: boolean
    commitAuthorName?: boolean
    commitAuthorAvatar?: boolean
    commitDate?: boolean
    summary?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commit"]>

  export type CommitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectId?: boolean
    commitMessage?: boolean
    commitHash?: boolean
    commitAuthorName?: boolean
    commitAuthorAvatar?: boolean
    commitDate?: boolean
    summary?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commit"]>

  export type CommitSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectId?: boolean
    commitMessage?: boolean
    commitHash?: boolean
    commitAuthorName?: boolean
    commitAuthorAvatar?: boolean
    commitDate?: boolean
    summary?: boolean
  }

  export type CommitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "projectId" | "commitMessage" | "commitHash" | "commitAuthorName" | "commitAuthorAvatar" | "commitDate" | "summary", ExtArgs["result"]["commit"]>
  export type CommitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type CommitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type CommitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $CommitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Commit"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      projectId: string
      commitMessage: string
      commitHash: string
      commitAuthorName: string
      commitAuthorAvatar: string
      commitDate: Date
      summary: string
    }, ExtArgs["result"]["commit"]>
    composites: {}
  }

  type CommitGetPayload<S extends boolean | null | undefined | CommitDefaultArgs> = $Result.GetResult<Prisma.$CommitPayload, S>

  type CommitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommitCountAggregateInputType | true
    }

  export interface CommitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Commit'], meta: { name: 'Commit' } }
    /**
     * Find zero or one Commit that matches the filter.
     * @param {CommitFindUniqueArgs} args - Arguments to find a Commit
     * @example
     * // Get one Commit
     * const commit = await prisma.commit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommitFindUniqueArgs>(args: SelectSubset<T, CommitFindUniqueArgs<ExtArgs>>): Prisma__CommitClient<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Commit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommitFindUniqueOrThrowArgs} args - Arguments to find a Commit
     * @example
     * // Get one Commit
     * const commit = await prisma.commit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommitFindUniqueOrThrowArgs>(args: SelectSubset<T, CommitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommitClient<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Commit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitFindFirstArgs} args - Arguments to find a Commit
     * @example
     * // Get one Commit
     * const commit = await prisma.commit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommitFindFirstArgs>(args?: SelectSubset<T, CommitFindFirstArgs<ExtArgs>>): Prisma__CommitClient<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Commit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitFindFirstOrThrowArgs} args - Arguments to find a Commit
     * @example
     * // Get one Commit
     * const commit = await prisma.commit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommitFindFirstOrThrowArgs>(args?: SelectSubset<T, CommitFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommitClient<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Commits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Commits
     * const commits = await prisma.commit.findMany()
     * 
     * // Get first 10 Commits
     * const commits = await prisma.commit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commitWithIdOnly = await prisma.commit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommitFindManyArgs>(args?: SelectSubset<T, CommitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Commit.
     * @param {CommitCreateArgs} args - Arguments to create a Commit.
     * @example
     * // Create one Commit
     * const Commit = await prisma.commit.create({
     *   data: {
     *     // ... data to create a Commit
     *   }
     * })
     * 
     */
    create<T extends CommitCreateArgs>(args: SelectSubset<T, CommitCreateArgs<ExtArgs>>): Prisma__CommitClient<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Commits.
     * @param {CommitCreateManyArgs} args - Arguments to create many Commits.
     * @example
     * // Create many Commits
     * const commit = await prisma.commit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommitCreateManyArgs>(args?: SelectSubset<T, CommitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Commits and returns the data saved in the database.
     * @param {CommitCreateManyAndReturnArgs} args - Arguments to create many Commits.
     * @example
     * // Create many Commits
     * const commit = await prisma.commit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Commits and only return the `id`
     * const commitWithIdOnly = await prisma.commit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommitCreateManyAndReturnArgs>(args?: SelectSubset<T, CommitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Commit.
     * @param {CommitDeleteArgs} args - Arguments to delete one Commit.
     * @example
     * // Delete one Commit
     * const Commit = await prisma.commit.delete({
     *   where: {
     *     // ... filter to delete one Commit
     *   }
     * })
     * 
     */
    delete<T extends CommitDeleteArgs>(args: SelectSubset<T, CommitDeleteArgs<ExtArgs>>): Prisma__CommitClient<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Commit.
     * @param {CommitUpdateArgs} args - Arguments to update one Commit.
     * @example
     * // Update one Commit
     * const commit = await prisma.commit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommitUpdateArgs>(args: SelectSubset<T, CommitUpdateArgs<ExtArgs>>): Prisma__CommitClient<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Commits.
     * @param {CommitDeleteManyArgs} args - Arguments to filter Commits to delete.
     * @example
     * // Delete a few Commits
     * const { count } = await prisma.commit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommitDeleteManyArgs>(args?: SelectSubset<T, CommitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Commits
     * const commit = await prisma.commit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommitUpdateManyArgs>(args: SelectSubset<T, CommitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Commits and returns the data updated in the database.
     * @param {CommitUpdateManyAndReturnArgs} args - Arguments to update many Commits.
     * @example
     * // Update many Commits
     * const commit = await prisma.commit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Commits and only return the `id`
     * const commitWithIdOnly = await prisma.commit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommitUpdateManyAndReturnArgs>(args: SelectSubset<T, CommitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Commit.
     * @param {CommitUpsertArgs} args - Arguments to update or create a Commit.
     * @example
     * // Update or create a Commit
     * const commit = await prisma.commit.upsert({
     *   create: {
     *     // ... data to create a Commit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Commit we want to update
     *   }
     * })
     */
    upsert<T extends CommitUpsertArgs>(args: SelectSubset<T, CommitUpsertArgs<ExtArgs>>): Prisma__CommitClient<$Result.GetResult<Prisma.$CommitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Commits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitCountArgs} args - Arguments to filter Commits to count.
     * @example
     * // Count the number of Commits
     * const count = await prisma.commit.count({
     *   where: {
     *     // ... the filter for the Commits we want to count
     *   }
     * })
    **/
    count<T extends CommitCountArgs>(
      args?: Subset<T, CommitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Commit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CommitAggregateArgs>(args: Subset<T, CommitAggregateArgs>): Prisma.PrismaPromise<GetCommitAggregateType<T>>

    /**
     * Group by Commit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitGroupByArgs} args - Group by arguments.
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
      T extends CommitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommitGroupByArgs['orderBy'] }
        : { orderBy?: CommitGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CommitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Commit model
   */
  readonly fields: CommitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Commit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Commit model
   */
  interface CommitFieldRefs {
    readonly id: FieldRef<"Commit", 'String'>
    readonly createdAt: FieldRef<"Commit", 'DateTime'>
    readonly updatedAt: FieldRef<"Commit", 'DateTime'>
    readonly projectId: FieldRef<"Commit", 'String'>
    readonly commitMessage: FieldRef<"Commit", 'String'>
    readonly commitHash: FieldRef<"Commit", 'String'>
    readonly commitAuthorName: FieldRef<"Commit", 'String'>
    readonly commitAuthorAvatar: FieldRef<"Commit", 'String'>
    readonly commitDate: FieldRef<"Commit", 'DateTime'>
    readonly summary: FieldRef<"Commit", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Commit findUnique
   */
  export type CommitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * Filter, which Commit to fetch.
     */
    where: CommitWhereUniqueInput
  }

  /**
   * Commit findUniqueOrThrow
   */
  export type CommitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * Filter, which Commit to fetch.
     */
    where: CommitWhereUniqueInput
  }

  /**
   * Commit findFirst
   */
  export type CommitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * Filter, which Commit to fetch.
     */
    where?: CommitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commits to fetch.
     */
    orderBy?: CommitOrderByWithRelationInput | CommitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commits.
     */
    cursor?: CommitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commits.
     */
    distinct?: CommitScalarFieldEnum | CommitScalarFieldEnum[]
  }

  /**
   * Commit findFirstOrThrow
   */
  export type CommitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * Filter, which Commit to fetch.
     */
    where?: CommitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commits to fetch.
     */
    orderBy?: CommitOrderByWithRelationInput | CommitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Commits.
     */
    cursor?: CommitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Commits.
     */
    distinct?: CommitScalarFieldEnum | CommitScalarFieldEnum[]
  }

  /**
   * Commit findMany
   */
  export type CommitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * Filter, which Commits to fetch.
     */
    where?: CommitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Commits to fetch.
     */
    orderBy?: CommitOrderByWithRelationInput | CommitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Commits.
     */
    cursor?: CommitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Commits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Commits.
     */
    skip?: number
    distinct?: CommitScalarFieldEnum | CommitScalarFieldEnum[]
  }

  /**
   * Commit create
   */
  export type CommitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * The data needed to create a Commit.
     */
    data: XOR<CommitCreateInput, CommitUncheckedCreateInput>
  }

  /**
   * Commit createMany
   */
  export type CommitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Commits.
     */
    data: CommitCreateManyInput | CommitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Commit createManyAndReturn
   */
  export type CommitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * The data used to create many Commits.
     */
    data: CommitCreateManyInput | CommitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Commit update
   */
  export type CommitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * The data needed to update a Commit.
     */
    data: XOR<CommitUpdateInput, CommitUncheckedUpdateInput>
    /**
     * Choose, which Commit to update.
     */
    where: CommitWhereUniqueInput
  }

  /**
   * Commit updateMany
   */
  export type CommitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Commits.
     */
    data: XOR<CommitUpdateManyMutationInput, CommitUncheckedUpdateManyInput>
    /**
     * Filter which Commits to update
     */
    where?: CommitWhereInput
    /**
     * Limit how many Commits to update.
     */
    limit?: number
  }

  /**
   * Commit updateManyAndReturn
   */
  export type CommitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * The data used to update Commits.
     */
    data: XOR<CommitUpdateManyMutationInput, CommitUncheckedUpdateManyInput>
    /**
     * Filter which Commits to update
     */
    where?: CommitWhereInput
    /**
     * Limit how many Commits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Commit upsert
   */
  export type CommitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * The filter to search for the Commit to update in case it exists.
     */
    where: CommitWhereUniqueInput
    /**
     * In case the Commit found by the `where` argument doesn't exist, create a new Commit with this data.
     */
    create: XOR<CommitCreateInput, CommitUncheckedCreateInput>
    /**
     * In case the Commit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommitUpdateInput, CommitUncheckedUpdateInput>
  }

  /**
   * Commit delete
   */
  export type CommitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
    /**
     * Filter which Commit to delete.
     */
    where: CommitWhereUniqueInput
  }

  /**
   * Commit deleteMany
   */
  export type CommitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Commits to delete
     */
    where?: CommitWhereInput
    /**
     * Limit how many Commits to delete.
     */
    limit?: number
  }

  /**
   * Commit without action
   */
  export type CommitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Commit
     */
    select?: CommitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Commit
     */
    omit?: CommitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommitInclude<ExtArgs> | null
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
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    imageUrl: 'imageUrl',
    firstName: 'firstName',
    lastName: 'lastName',
    emailAddress: 'emailAddress'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CreditEntryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    delta: 'delta',
    reason: 'reason',
    createdAt: 'createdAt'
  };

  export type CreditEntryScalarFieldEnum = (typeof CreditEntryScalarFieldEnum)[keyof typeof CreditEntryScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    githubUrl: 'githubUrl',
    deletedAt: 'deletedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ProjectMemberScalarFieldEnum: {
    userId: 'userId',
    projectId: 'projectId',
    role: 'role'
  };

  export type ProjectMemberScalarFieldEnum = (typeof ProjectMemberScalarFieldEnum)[keyof typeof ProjectMemberScalarFieldEnum]


  export const CommitScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    projectId: 'projectId',
    commitMessage: 'commitMessage',
    commitHash: 'commitHash',
    commitAuthorName: 'commitAuthorName',
    commitAuthorAvatar: 'commitAuthorAvatar',
    commitDate: 'commitDate',
    summary: 'summary'
  };

  export type CommitScalarFieldEnum = (typeof CommitScalarFieldEnum)[keyof typeof CommitScalarFieldEnum]


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
   * Reference to a field of type 'CreditReason'
   */
  export type EnumCreditReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CreditReason'>
    


  /**
   * Reference to a field of type 'CreditReason[]'
   */
  export type ListEnumCreditReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CreditReason[]'>
    


  /**
   * Reference to a field of type 'MemberRole'
   */
  export type EnumMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MemberRole'>
    


  /**
   * Reference to a field of type 'MemberRole[]'
   */
  export type ListEnumMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MemberRole[]'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    imageUrl?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    emailAddress?: StringFilter<"User"> | string
    credits?: CreditEntryListRelationFilter
    projects?: ProjectMemberListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    emailAddress?: SortOrder
    credits?: CreditEntryOrderByRelationAggregateInput
    projects?: ProjectMemberOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    emailAddress?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    imageUrl?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    credits?: CreditEntryListRelationFilter
    projects?: ProjectMemberListRelationFilter
  }, "id" | "emailAddress">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    emailAddress?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    imageUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailAddress?: StringWithAggregatesFilter<"User"> | string
  }

  export type CreditEntryWhereInput = {
    AND?: CreditEntryWhereInput | CreditEntryWhereInput[]
    OR?: CreditEntryWhereInput[]
    NOT?: CreditEntryWhereInput | CreditEntryWhereInput[]
    id?: StringFilter<"CreditEntry"> | string
    userId?: StringFilter<"CreditEntry"> | string
    delta?: IntFilter<"CreditEntry"> | number
    reason?: EnumCreditReasonFilter<"CreditEntry"> | $Enums.CreditReason
    createdAt?: DateTimeFilter<"CreditEntry"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CreditEntryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    delta?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CreditEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CreditEntryWhereInput | CreditEntryWhereInput[]
    OR?: CreditEntryWhereInput[]
    NOT?: CreditEntryWhereInput | CreditEntryWhereInput[]
    userId?: StringFilter<"CreditEntry"> | string
    delta?: IntFilter<"CreditEntry"> | number
    reason?: EnumCreditReasonFilter<"CreditEntry"> | $Enums.CreditReason
    createdAt?: DateTimeFilter<"CreditEntry"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CreditEntryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    delta?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
    _count?: CreditEntryCountOrderByAggregateInput
    _avg?: CreditEntryAvgOrderByAggregateInput
    _max?: CreditEntryMaxOrderByAggregateInput
    _min?: CreditEntryMinOrderByAggregateInput
    _sum?: CreditEntrySumOrderByAggregateInput
  }

  export type CreditEntryScalarWhereWithAggregatesInput = {
    AND?: CreditEntryScalarWhereWithAggregatesInput | CreditEntryScalarWhereWithAggregatesInput[]
    OR?: CreditEntryScalarWhereWithAggregatesInput[]
    NOT?: CreditEntryScalarWhereWithAggregatesInput | CreditEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreditEntry"> | string
    userId?: StringWithAggregatesFilter<"CreditEntry"> | string
    delta?: IntWithAggregatesFilter<"CreditEntry"> | number
    reason?: EnumCreditReasonWithAggregatesFilter<"CreditEntry"> | $Enums.CreditReason
    createdAt?: DateTimeWithAggregatesFilter<"CreditEntry"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    name?: StringFilter<"Project"> | string
    githubUrl?: StringFilter<"Project"> | string
    deletedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    members?: ProjectMemberListRelationFilter
    commits?: CommitListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    githubUrl?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    members?: ProjectMemberOrderByRelationAggregateInput
    commits?: CommitOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    name?: StringFilter<"Project"> | string
    githubUrl?: StringFilter<"Project"> | string
    deletedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    members?: ProjectMemberListRelationFilter
    commits?: CommitListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    githubUrl?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    name?: StringWithAggregatesFilter<"Project"> | string
    githubUrl?: StringWithAggregatesFilter<"Project"> | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
  }

  export type ProjectMemberWhereInput = {
    AND?: ProjectMemberWhereInput | ProjectMemberWhereInput[]
    OR?: ProjectMemberWhereInput[]
    NOT?: ProjectMemberWhereInput | ProjectMemberWhereInput[]
    userId?: StringFilter<"ProjectMember"> | string
    projectId?: StringFilter<"ProjectMember"> | string
    role?: EnumMemberRoleFilter<"ProjectMember"> | $Enums.MemberRole
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProjectMemberOrderByWithRelationInput = {
    userId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    user?: UserOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
  }

  export type ProjectMemberWhereUniqueInput = Prisma.AtLeast<{
    userId_projectId?: ProjectMemberUserIdProjectIdCompoundUniqueInput
    AND?: ProjectMemberWhereInput | ProjectMemberWhereInput[]
    OR?: ProjectMemberWhereInput[]
    NOT?: ProjectMemberWhereInput | ProjectMemberWhereInput[]
    userId?: StringFilter<"ProjectMember"> | string
    projectId?: StringFilter<"ProjectMember"> | string
    role?: EnumMemberRoleFilter<"ProjectMember"> | $Enums.MemberRole
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "userId_projectId">

  export type ProjectMemberOrderByWithAggregationInput = {
    userId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
    _count?: ProjectMemberCountOrderByAggregateInput
    _max?: ProjectMemberMaxOrderByAggregateInput
    _min?: ProjectMemberMinOrderByAggregateInput
  }

  export type ProjectMemberScalarWhereWithAggregatesInput = {
    AND?: ProjectMemberScalarWhereWithAggregatesInput | ProjectMemberScalarWhereWithAggregatesInput[]
    OR?: ProjectMemberScalarWhereWithAggregatesInput[]
    NOT?: ProjectMemberScalarWhereWithAggregatesInput | ProjectMemberScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"ProjectMember"> | string
    projectId?: StringWithAggregatesFilter<"ProjectMember"> | string
    role?: EnumMemberRoleWithAggregatesFilter<"ProjectMember"> | $Enums.MemberRole
  }

  export type CommitWhereInput = {
    AND?: CommitWhereInput | CommitWhereInput[]
    OR?: CommitWhereInput[]
    NOT?: CommitWhereInput | CommitWhereInput[]
    id?: StringFilter<"Commit"> | string
    createdAt?: DateTimeFilter<"Commit"> | Date | string
    updatedAt?: DateTimeFilter<"Commit"> | Date | string
    projectId?: StringFilter<"Commit"> | string
    commitMessage?: StringFilter<"Commit"> | string
    commitHash?: StringFilter<"Commit"> | string
    commitAuthorName?: StringFilter<"Commit"> | string
    commitAuthorAvatar?: StringFilter<"Commit"> | string
    commitDate?: DateTimeFilter<"Commit"> | Date | string
    summary?: StringFilter<"Commit"> | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type CommitOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    commitMessage?: SortOrder
    commitHash?: SortOrder
    commitAuthorName?: SortOrder
    commitAuthorAvatar?: SortOrder
    commitDate?: SortOrder
    summary?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type CommitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projectId_commitHash?: CommitProjectIdCommitHashCompoundUniqueInput
    AND?: CommitWhereInput | CommitWhereInput[]
    OR?: CommitWhereInput[]
    NOT?: CommitWhereInput | CommitWhereInput[]
    createdAt?: DateTimeFilter<"Commit"> | Date | string
    updatedAt?: DateTimeFilter<"Commit"> | Date | string
    projectId?: StringFilter<"Commit"> | string
    commitMessage?: StringFilter<"Commit"> | string
    commitHash?: StringFilter<"Commit"> | string
    commitAuthorName?: StringFilter<"Commit"> | string
    commitAuthorAvatar?: StringFilter<"Commit"> | string
    commitDate?: DateTimeFilter<"Commit"> | Date | string
    summary?: StringFilter<"Commit"> | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id" | "projectId_commitHash">

  export type CommitOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    commitMessage?: SortOrder
    commitHash?: SortOrder
    commitAuthorName?: SortOrder
    commitAuthorAvatar?: SortOrder
    commitDate?: SortOrder
    summary?: SortOrder
    _count?: CommitCountOrderByAggregateInput
    _max?: CommitMaxOrderByAggregateInput
    _min?: CommitMinOrderByAggregateInput
  }

  export type CommitScalarWhereWithAggregatesInput = {
    AND?: CommitScalarWhereWithAggregatesInput | CommitScalarWhereWithAggregatesInput[]
    OR?: CommitScalarWhereWithAggregatesInput[]
    NOT?: CommitScalarWhereWithAggregatesInput | CommitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Commit"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Commit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Commit"> | Date | string
    projectId?: StringWithAggregatesFilter<"Commit"> | string
    commitMessage?: StringWithAggregatesFilter<"Commit"> | string
    commitHash?: StringWithAggregatesFilter<"Commit"> | string
    commitAuthorName?: StringWithAggregatesFilter<"Commit"> | string
    commitAuthorAvatar?: StringWithAggregatesFilter<"Commit"> | string
    commitDate?: DateTimeWithAggregatesFilter<"Commit"> | Date | string
    summary?: StringWithAggregatesFilter<"Commit"> | string
  }

  export type UserCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    imageUrl?: string | null
    firstName?: string | null
    lastName?: string | null
    emailAddress: string
    credits?: CreditEntryCreateNestedManyWithoutUserInput
    projects?: ProjectMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    imageUrl?: string | null
    firstName?: string | null
    lastName?: string | null
    emailAddress: string
    credits?: CreditEntryUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailAddress?: StringFieldUpdateOperationsInput | string
    credits?: CreditEntryUpdateManyWithoutUserNestedInput
    projects?: ProjectMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailAddress?: StringFieldUpdateOperationsInput | string
    credits?: CreditEntryUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    imageUrl?: string | null
    firstName?: string | null
    lastName?: string | null
    emailAddress: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailAddress?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailAddress?: StringFieldUpdateOperationsInput | string
  }

  export type CreditEntryCreateInput = {
    id?: string
    delta: number
    reason: $Enums.CreditReason
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCreditsInput
  }

  export type CreditEntryUncheckedCreateInput = {
    id?: string
    userId: string
    delta: number
    reason: $Enums.CreditReason
    createdAt?: Date | string
  }

  export type CreditEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    delta?: IntFieldUpdateOperationsInput | number
    reason?: EnumCreditReasonFieldUpdateOperationsInput | $Enums.CreditReason
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCreditsNestedInput
  }

  export type CreditEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    delta?: IntFieldUpdateOperationsInput | number
    reason?: EnumCreditReasonFieldUpdateOperationsInput | $Enums.CreditReason
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditEntryCreateManyInput = {
    id?: string
    userId: string
    delta: number
    reason: $Enums.CreditReason
    createdAt?: Date | string
  }

  export type CreditEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    delta?: IntFieldUpdateOperationsInput | number
    reason?: EnumCreditReasonFieldUpdateOperationsInput | $Enums.CreditReason
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    delta?: IntFieldUpdateOperationsInput | number
    reason?: EnumCreditReasonFieldUpdateOperationsInput | $Enums.CreditReason
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    githubUrl: string
    deletedAt?: Date | string | null
    members?: ProjectMemberCreateNestedManyWithoutProjectInput
    commits?: CommitCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    githubUrl: string
    deletedAt?: Date | string | null
    members?: ProjectMemberUncheckedCreateNestedManyWithoutProjectInput
    commits?: CommitUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    githubUrl?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: ProjectMemberUpdateManyWithoutProjectNestedInput
    commits?: CommitUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    githubUrl?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: ProjectMemberUncheckedUpdateManyWithoutProjectNestedInput
    commits?: CommitUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    githubUrl: string
    deletedAt?: Date | string | null
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    githubUrl?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    githubUrl?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectMemberCreateInput = {
    role?: $Enums.MemberRole
    user: UserCreateNestedOneWithoutProjectsInput
    project: ProjectCreateNestedOneWithoutMembersInput
  }

  export type ProjectMemberUncheckedCreateInput = {
    userId: string
    projectId: string
    role?: $Enums.MemberRole
  }

  export type ProjectMemberUpdateInput = {
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    project?: ProjectUpdateOneRequiredWithoutMembersNestedInput
  }

  export type ProjectMemberUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
  }

  export type ProjectMemberCreateManyInput = {
    userId: string
    projectId: string
    role?: $Enums.MemberRole
  }

  export type ProjectMemberUpdateManyMutationInput = {
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
  }

  export type ProjectMemberUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
  }

  export type CommitCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    commitMessage: string
    commitHash: string
    commitAuthorName: string
    commitAuthorAvatar: string
    commitDate: Date | string
    summary: string
    project: ProjectCreateNestedOneWithoutCommitsInput
  }

  export type CommitUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projectId: string
    commitMessage: string
    commitHash: string
    commitAuthorName: string
    commitAuthorAvatar: string
    commitDate: Date | string
    summary: string
  }

  export type CommitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commitMessage?: StringFieldUpdateOperationsInput | string
    commitHash?: StringFieldUpdateOperationsInput | string
    commitAuthorName?: StringFieldUpdateOperationsInput | string
    commitAuthorAvatar?: StringFieldUpdateOperationsInput | string
    commitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    summary?: StringFieldUpdateOperationsInput | string
    project?: ProjectUpdateOneRequiredWithoutCommitsNestedInput
  }

  export type CommitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
    commitMessage?: StringFieldUpdateOperationsInput | string
    commitHash?: StringFieldUpdateOperationsInput | string
    commitAuthorName?: StringFieldUpdateOperationsInput | string
    commitAuthorAvatar?: StringFieldUpdateOperationsInput | string
    commitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    summary?: StringFieldUpdateOperationsInput | string
  }

  export type CommitCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projectId: string
    commitMessage: string
    commitHash: string
    commitAuthorName: string
    commitAuthorAvatar: string
    commitDate: Date | string
    summary: string
  }

  export type CommitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commitMessage?: StringFieldUpdateOperationsInput | string
    commitHash?: StringFieldUpdateOperationsInput | string
    commitAuthorName?: StringFieldUpdateOperationsInput | string
    commitAuthorAvatar?: StringFieldUpdateOperationsInput | string
    commitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    summary?: StringFieldUpdateOperationsInput | string
  }

  export type CommitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
    commitMessage?: StringFieldUpdateOperationsInput | string
    commitHash?: StringFieldUpdateOperationsInput | string
    commitAuthorName?: StringFieldUpdateOperationsInput | string
    commitAuthorAvatar?: StringFieldUpdateOperationsInput | string
    commitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    summary?: StringFieldUpdateOperationsInput | string
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

  export type CreditEntryListRelationFilter = {
    every?: CreditEntryWhereInput
    some?: CreditEntryWhereInput
    none?: CreditEntryWhereInput
  }

  export type ProjectMemberListRelationFilter = {
    every?: ProjectMemberWhereInput
    some?: ProjectMemberWhereInput
    none?: ProjectMemberWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CreditEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    imageUrl?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    emailAddress?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    imageUrl?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    emailAddress?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    imageUrl?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    emailAddress?: SortOrder
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

  export type EnumCreditReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.CreditReason | EnumCreditReasonFieldRefInput<$PrismaModel>
    in?: $Enums.CreditReason[] | ListEnumCreditReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreditReason[] | ListEnumCreditReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumCreditReasonFilter<$PrismaModel> | $Enums.CreditReason
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CreditEntryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    delta?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditEntryAvgOrderByAggregateInput = {
    delta?: SortOrder
  }

  export type CreditEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    delta?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditEntryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    delta?: SortOrder
    reason?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditEntrySumOrderByAggregateInput = {
    delta?: SortOrder
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

  export type EnumCreditReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CreditReason | EnumCreditReasonFieldRefInput<$PrismaModel>
    in?: $Enums.CreditReason[] | ListEnumCreditReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreditReason[] | ListEnumCreditReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumCreditReasonWithAggregatesFilter<$PrismaModel> | $Enums.CreditReason
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCreditReasonFilter<$PrismaModel>
    _max?: NestedEnumCreditReasonFilter<$PrismaModel>
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

  export type CommitListRelationFilter = {
    every?: CommitWhereInput
    some?: CommitWhereInput
    none?: CommitWhereInput
  }

  export type CommitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    githubUrl?: SortOrder
    deletedAt?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    githubUrl?: SortOrder
    deletedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    githubUrl?: SortOrder
    deletedAt?: SortOrder
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

  export type EnumMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberRole | EnumMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberRoleFilter<$PrismaModel> | $Enums.MemberRole
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type ProjectMemberUserIdProjectIdCompoundUniqueInput = {
    userId: string
    projectId: string
  }

  export type ProjectMemberCountOrderByAggregateInput = {
    userId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
  }

  export type ProjectMemberMaxOrderByAggregateInput = {
    userId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
  }

  export type ProjectMemberMinOrderByAggregateInput = {
    userId?: SortOrder
    projectId?: SortOrder
    role?: SortOrder
  }

  export type EnumMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberRole | EnumMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.MemberRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMemberRoleFilter<$PrismaModel>
    _max?: NestedEnumMemberRoleFilter<$PrismaModel>
  }

  export type CommitProjectIdCommitHashCompoundUniqueInput = {
    projectId: string
    commitHash: string
  }

  export type CommitCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    commitMessage?: SortOrder
    commitHash?: SortOrder
    commitAuthorName?: SortOrder
    commitAuthorAvatar?: SortOrder
    commitDate?: SortOrder
    summary?: SortOrder
  }

  export type CommitMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    commitMessage?: SortOrder
    commitHash?: SortOrder
    commitAuthorName?: SortOrder
    commitAuthorAvatar?: SortOrder
    commitDate?: SortOrder
    summary?: SortOrder
  }

  export type CommitMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    commitMessage?: SortOrder
    commitHash?: SortOrder
    commitAuthorName?: SortOrder
    commitAuthorAvatar?: SortOrder
    commitDate?: SortOrder
    summary?: SortOrder
  }

  export type CreditEntryCreateNestedManyWithoutUserInput = {
    create?: XOR<CreditEntryCreateWithoutUserInput, CreditEntryUncheckedCreateWithoutUserInput> | CreditEntryCreateWithoutUserInput[] | CreditEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditEntryCreateOrConnectWithoutUserInput | CreditEntryCreateOrConnectWithoutUserInput[]
    createMany?: CreditEntryCreateManyUserInputEnvelope
    connect?: CreditEntryWhereUniqueInput | CreditEntryWhereUniqueInput[]
  }

  export type ProjectMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput> | ProjectMemberCreateWithoutUserInput[] | ProjectMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutUserInput | ProjectMemberCreateOrConnectWithoutUserInput[]
    createMany?: ProjectMemberCreateManyUserInputEnvelope
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
  }

  export type CreditEntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CreditEntryCreateWithoutUserInput, CreditEntryUncheckedCreateWithoutUserInput> | CreditEntryCreateWithoutUserInput[] | CreditEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditEntryCreateOrConnectWithoutUserInput | CreditEntryCreateOrConnectWithoutUserInput[]
    createMany?: CreditEntryCreateManyUserInputEnvelope
    connect?: CreditEntryWhereUniqueInput | CreditEntryWhereUniqueInput[]
  }

  export type ProjectMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput> | ProjectMemberCreateWithoutUserInput[] | ProjectMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutUserInput | ProjectMemberCreateOrConnectWithoutUserInput[]
    createMany?: ProjectMemberCreateManyUserInputEnvelope
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CreditEntryUpdateManyWithoutUserNestedInput = {
    create?: XOR<CreditEntryCreateWithoutUserInput, CreditEntryUncheckedCreateWithoutUserInput> | CreditEntryCreateWithoutUserInput[] | CreditEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditEntryCreateOrConnectWithoutUserInput | CreditEntryCreateOrConnectWithoutUserInput[]
    upsert?: CreditEntryUpsertWithWhereUniqueWithoutUserInput | CreditEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CreditEntryCreateManyUserInputEnvelope
    set?: CreditEntryWhereUniqueInput | CreditEntryWhereUniqueInput[]
    disconnect?: CreditEntryWhereUniqueInput | CreditEntryWhereUniqueInput[]
    delete?: CreditEntryWhereUniqueInput | CreditEntryWhereUniqueInput[]
    connect?: CreditEntryWhereUniqueInput | CreditEntryWhereUniqueInput[]
    update?: CreditEntryUpdateWithWhereUniqueWithoutUserInput | CreditEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CreditEntryUpdateManyWithWhereWithoutUserInput | CreditEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CreditEntryScalarWhereInput | CreditEntryScalarWhereInput[]
  }

  export type ProjectMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput> | ProjectMemberCreateWithoutUserInput[] | ProjectMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutUserInput | ProjectMemberCreateOrConnectWithoutUserInput[]
    upsert?: ProjectMemberUpsertWithWhereUniqueWithoutUserInput | ProjectMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectMemberCreateManyUserInputEnvelope
    set?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    disconnect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    delete?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    update?: ProjectMemberUpdateWithWhereUniqueWithoutUserInput | ProjectMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectMemberUpdateManyWithWhereWithoutUserInput | ProjectMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
  }

  export type CreditEntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CreditEntryCreateWithoutUserInput, CreditEntryUncheckedCreateWithoutUserInput> | CreditEntryCreateWithoutUserInput[] | CreditEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditEntryCreateOrConnectWithoutUserInput | CreditEntryCreateOrConnectWithoutUserInput[]
    upsert?: CreditEntryUpsertWithWhereUniqueWithoutUserInput | CreditEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CreditEntryCreateManyUserInputEnvelope
    set?: CreditEntryWhereUniqueInput | CreditEntryWhereUniqueInput[]
    disconnect?: CreditEntryWhereUniqueInput | CreditEntryWhereUniqueInput[]
    delete?: CreditEntryWhereUniqueInput | CreditEntryWhereUniqueInput[]
    connect?: CreditEntryWhereUniqueInput | CreditEntryWhereUniqueInput[]
    update?: CreditEntryUpdateWithWhereUniqueWithoutUserInput | CreditEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CreditEntryUpdateManyWithWhereWithoutUserInput | CreditEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CreditEntryScalarWhereInput | CreditEntryScalarWhereInput[]
  }

  export type ProjectMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput> | ProjectMemberCreateWithoutUserInput[] | ProjectMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutUserInput | ProjectMemberCreateOrConnectWithoutUserInput[]
    upsert?: ProjectMemberUpsertWithWhereUniqueWithoutUserInput | ProjectMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectMemberCreateManyUserInputEnvelope
    set?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    disconnect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    delete?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    update?: ProjectMemberUpdateWithWhereUniqueWithoutUserInput | ProjectMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectMemberUpdateManyWithWhereWithoutUserInput | ProjectMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCreditsInput = {
    create?: XOR<UserCreateWithoutCreditsInput, UserUncheckedCreateWithoutCreditsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreditsInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumCreditReasonFieldUpdateOperationsInput = {
    set?: $Enums.CreditReason
  }

  export type UserUpdateOneRequiredWithoutCreditsNestedInput = {
    create?: XOR<UserCreateWithoutCreditsInput, UserUncheckedCreateWithoutCreditsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreditsInput
    upsert?: UserUpsertWithoutCreditsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreditsInput, UserUpdateWithoutCreditsInput>, UserUncheckedUpdateWithoutCreditsInput>
  }

  export type ProjectMemberCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput> | ProjectMemberCreateWithoutProjectInput[] | ProjectMemberUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutProjectInput | ProjectMemberCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectMemberCreateManyProjectInputEnvelope
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
  }

  export type CommitCreateNestedManyWithoutProjectInput = {
    create?: XOR<CommitCreateWithoutProjectInput, CommitUncheckedCreateWithoutProjectInput> | CommitCreateWithoutProjectInput[] | CommitUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: CommitCreateOrConnectWithoutProjectInput | CommitCreateOrConnectWithoutProjectInput[]
    createMany?: CommitCreateManyProjectInputEnvelope
    connect?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
  }

  export type ProjectMemberUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput> | ProjectMemberCreateWithoutProjectInput[] | ProjectMemberUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutProjectInput | ProjectMemberCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectMemberCreateManyProjectInputEnvelope
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
  }

  export type CommitUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<CommitCreateWithoutProjectInput, CommitUncheckedCreateWithoutProjectInput> | CommitCreateWithoutProjectInput[] | CommitUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: CommitCreateOrConnectWithoutProjectInput | CommitCreateOrConnectWithoutProjectInput[]
    createMany?: CommitCreateManyProjectInputEnvelope
    connect?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProjectMemberUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput> | ProjectMemberCreateWithoutProjectInput[] | ProjectMemberUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutProjectInput | ProjectMemberCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectMemberUpsertWithWhereUniqueWithoutProjectInput | ProjectMemberUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectMemberCreateManyProjectInputEnvelope
    set?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    disconnect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    delete?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    update?: ProjectMemberUpdateWithWhereUniqueWithoutProjectInput | ProjectMemberUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectMemberUpdateManyWithWhereWithoutProjectInput | ProjectMemberUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
  }

  export type CommitUpdateManyWithoutProjectNestedInput = {
    create?: XOR<CommitCreateWithoutProjectInput, CommitUncheckedCreateWithoutProjectInput> | CommitCreateWithoutProjectInput[] | CommitUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: CommitCreateOrConnectWithoutProjectInput | CommitCreateOrConnectWithoutProjectInput[]
    upsert?: CommitUpsertWithWhereUniqueWithoutProjectInput | CommitUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: CommitCreateManyProjectInputEnvelope
    set?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
    disconnect?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
    delete?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
    connect?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
    update?: CommitUpdateWithWhereUniqueWithoutProjectInput | CommitUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: CommitUpdateManyWithWhereWithoutProjectInput | CommitUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: CommitScalarWhereInput | CommitScalarWhereInput[]
  }

  export type ProjectMemberUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput> | ProjectMemberCreateWithoutProjectInput[] | ProjectMemberUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectMemberCreateOrConnectWithoutProjectInput | ProjectMemberCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectMemberUpsertWithWhereUniqueWithoutProjectInput | ProjectMemberUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectMemberCreateManyProjectInputEnvelope
    set?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    disconnect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    delete?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    connect?: ProjectMemberWhereUniqueInput | ProjectMemberWhereUniqueInput[]
    update?: ProjectMemberUpdateWithWhereUniqueWithoutProjectInput | ProjectMemberUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectMemberUpdateManyWithWhereWithoutProjectInput | ProjectMemberUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
  }

  export type CommitUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<CommitCreateWithoutProjectInput, CommitUncheckedCreateWithoutProjectInput> | CommitCreateWithoutProjectInput[] | CommitUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: CommitCreateOrConnectWithoutProjectInput | CommitCreateOrConnectWithoutProjectInput[]
    upsert?: CommitUpsertWithWhereUniqueWithoutProjectInput | CommitUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: CommitCreateManyProjectInputEnvelope
    set?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
    disconnect?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
    delete?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
    connect?: CommitWhereUniqueInput | CommitWhereUniqueInput[]
    update?: CommitUpdateWithWhereUniqueWithoutProjectInput | CommitUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: CommitUpdateManyWithWhereWithoutProjectInput | CommitUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: CommitScalarWhereInput | CommitScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutMembersInput = {
    create?: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutMembersInput
    connect?: ProjectWhereUniqueInput
  }

  export type EnumMemberRoleFieldUpdateOperationsInput = {
    set?: $Enums.MemberRole
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type ProjectUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutMembersInput
    upsert?: ProjectUpsertWithoutMembersInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutMembersInput, ProjectUpdateWithoutMembersInput>, ProjectUncheckedUpdateWithoutMembersInput>
  }

  export type ProjectCreateNestedOneWithoutCommitsInput = {
    create?: XOR<ProjectCreateWithoutCommitsInput, ProjectUncheckedCreateWithoutCommitsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutCommitsInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutCommitsNestedInput = {
    create?: XOR<ProjectCreateWithoutCommitsInput, ProjectUncheckedCreateWithoutCommitsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutCommitsInput
    upsert?: ProjectUpsertWithoutCommitsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutCommitsInput, ProjectUpdateWithoutCommitsInput>, ProjectUncheckedUpdateWithoutCommitsInput>
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

  export type NestedEnumCreditReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.CreditReason | EnumCreditReasonFieldRefInput<$PrismaModel>
    in?: $Enums.CreditReason[] | ListEnumCreditReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreditReason[] | ListEnumCreditReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumCreditReasonFilter<$PrismaModel> | $Enums.CreditReason
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

  export type NestedEnumCreditReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CreditReason | EnumCreditReasonFieldRefInput<$PrismaModel>
    in?: $Enums.CreditReason[] | ListEnumCreditReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreditReason[] | ListEnumCreditReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumCreditReasonWithAggregatesFilter<$PrismaModel> | $Enums.CreditReason
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCreditReasonFilter<$PrismaModel>
    _max?: NestedEnumCreditReasonFilter<$PrismaModel>
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

  export type NestedEnumMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberRole | EnumMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberRoleFilter<$PrismaModel> | $Enums.MemberRole
  }

  export type NestedEnumMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MemberRole | EnumMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MemberRole[] | ListEnumMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.MemberRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMemberRoleFilter<$PrismaModel>
    _max?: NestedEnumMemberRoleFilter<$PrismaModel>
  }

  export type CreditEntryCreateWithoutUserInput = {
    id?: string
    delta: number
    reason: $Enums.CreditReason
    createdAt?: Date | string
  }

  export type CreditEntryUncheckedCreateWithoutUserInput = {
    id?: string
    delta: number
    reason: $Enums.CreditReason
    createdAt?: Date | string
  }

  export type CreditEntryCreateOrConnectWithoutUserInput = {
    where: CreditEntryWhereUniqueInput
    create: XOR<CreditEntryCreateWithoutUserInput, CreditEntryUncheckedCreateWithoutUserInput>
  }

  export type CreditEntryCreateManyUserInputEnvelope = {
    data: CreditEntryCreateManyUserInput | CreditEntryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectMemberCreateWithoutUserInput = {
    role?: $Enums.MemberRole
    project: ProjectCreateNestedOneWithoutMembersInput
  }

  export type ProjectMemberUncheckedCreateWithoutUserInput = {
    projectId: string
    role?: $Enums.MemberRole
  }

  export type ProjectMemberCreateOrConnectWithoutUserInput = {
    where: ProjectMemberWhereUniqueInput
    create: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput>
  }

  export type ProjectMemberCreateManyUserInputEnvelope = {
    data: ProjectMemberCreateManyUserInput | ProjectMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CreditEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: CreditEntryWhereUniqueInput
    update: XOR<CreditEntryUpdateWithoutUserInput, CreditEntryUncheckedUpdateWithoutUserInput>
    create: XOR<CreditEntryCreateWithoutUserInput, CreditEntryUncheckedCreateWithoutUserInput>
  }

  export type CreditEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: CreditEntryWhereUniqueInput
    data: XOR<CreditEntryUpdateWithoutUserInput, CreditEntryUncheckedUpdateWithoutUserInput>
  }

  export type CreditEntryUpdateManyWithWhereWithoutUserInput = {
    where: CreditEntryScalarWhereInput
    data: XOR<CreditEntryUpdateManyMutationInput, CreditEntryUncheckedUpdateManyWithoutUserInput>
  }

  export type CreditEntryScalarWhereInput = {
    AND?: CreditEntryScalarWhereInput | CreditEntryScalarWhereInput[]
    OR?: CreditEntryScalarWhereInput[]
    NOT?: CreditEntryScalarWhereInput | CreditEntryScalarWhereInput[]
    id?: StringFilter<"CreditEntry"> | string
    userId?: StringFilter<"CreditEntry"> | string
    delta?: IntFilter<"CreditEntry"> | number
    reason?: EnumCreditReasonFilter<"CreditEntry"> | $Enums.CreditReason
    createdAt?: DateTimeFilter<"CreditEntry"> | Date | string
  }

  export type ProjectMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectMemberWhereUniqueInput
    update: XOR<ProjectMemberUpdateWithoutUserInput, ProjectMemberUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectMemberCreateWithoutUserInput, ProjectMemberUncheckedCreateWithoutUserInput>
  }

  export type ProjectMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectMemberWhereUniqueInput
    data: XOR<ProjectMemberUpdateWithoutUserInput, ProjectMemberUncheckedUpdateWithoutUserInput>
  }

  export type ProjectMemberUpdateManyWithWhereWithoutUserInput = {
    where: ProjectMemberScalarWhereInput
    data: XOR<ProjectMemberUpdateManyMutationInput, ProjectMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectMemberScalarWhereInput = {
    AND?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
    OR?: ProjectMemberScalarWhereInput[]
    NOT?: ProjectMemberScalarWhereInput | ProjectMemberScalarWhereInput[]
    userId?: StringFilter<"ProjectMember"> | string
    projectId?: StringFilter<"ProjectMember"> | string
    role?: EnumMemberRoleFilter<"ProjectMember"> | $Enums.MemberRole
  }

  export type UserCreateWithoutCreditsInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    imageUrl?: string | null
    firstName?: string | null
    lastName?: string | null
    emailAddress: string
    projects?: ProjectMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreditsInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    imageUrl?: string | null
    firstName?: string | null
    lastName?: string | null
    emailAddress: string
    projects?: ProjectMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreditsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreditsInput, UserUncheckedCreateWithoutCreditsInput>
  }

  export type UserUpsertWithoutCreditsInput = {
    update: XOR<UserUpdateWithoutCreditsInput, UserUncheckedUpdateWithoutCreditsInput>
    create: XOR<UserCreateWithoutCreditsInput, UserUncheckedCreateWithoutCreditsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreditsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreditsInput, UserUncheckedUpdateWithoutCreditsInput>
  }

  export type UserUpdateWithoutCreditsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailAddress?: StringFieldUpdateOperationsInput | string
    projects?: ProjectMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreditsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailAddress?: StringFieldUpdateOperationsInput | string
    projects?: ProjectMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectMemberCreateWithoutProjectInput = {
    role?: $Enums.MemberRole
    user: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectMemberUncheckedCreateWithoutProjectInput = {
    userId: string
    role?: $Enums.MemberRole
  }

  export type ProjectMemberCreateOrConnectWithoutProjectInput = {
    where: ProjectMemberWhereUniqueInput
    create: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput>
  }

  export type ProjectMemberCreateManyProjectInputEnvelope = {
    data: ProjectMemberCreateManyProjectInput | ProjectMemberCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type CommitCreateWithoutProjectInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    commitMessage: string
    commitHash: string
    commitAuthorName: string
    commitAuthorAvatar: string
    commitDate: Date | string
    summary: string
  }

  export type CommitUncheckedCreateWithoutProjectInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    commitMessage: string
    commitHash: string
    commitAuthorName: string
    commitAuthorAvatar: string
    commitDate: Date | string
    summary: string
  }

  export type CommitCreateOrConnectWithoutProjectInput = {
    where: CommitWhereUniqueInput
    create: XOR<CommitCreateWithoutProjectInput, CommitUncheckedCreateWithoutProjectInput>
  }

  export type CommitCreateManyProjectInputEnvelope = {
    data: CommitCreateManyProjectInput | CommitCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectMemberUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectMemberWhereUniqueInput
    update: XOR<ProjectMemberUpdateWithoutProjectInput, ProjectMemberUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectMemberCreateWithoutProjectInput, ProjectMemberUncheckedCreateWithoutProjectInput>
  }

  export type ProjectMemberUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectMemberWhereUniqueInput
    data: XOR<ProjectMemberUpdateWithoutProjectInput, ProjectMemberUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectMemberUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectMemberScalarWhereInput
    data: XOR<ProjectMemberUpdateManyMutationInput, ProjectMemberUncheckedUpdateManyWithoutProjectInput>
  }

  export type CommitUpsertWithWhereUniqueWithoutProjectInput = {
    where: CommitWhereUniqueInput
    update: XOR<CommitUpdateWithoutProjectInput, CommitUncheckedUpdateWithoutProjectInput>
    create: XOR<CommitCreateWithoutProjectInput, CommitUncheckedCreateWithoutProjectInput>
  }

  export type CommitUpdateWithWhereUniqueWithoutProjectInput = {
    where: CommitWhereUniqueInput
    data: XOR<CommitUpdateWithoutProjectInput, CommitUncheckedUpdateWithoutProjectInput>
  }

  export type CommitUpdateManyWithWhereWithoutProjectInput = {
    where: CommitScalarWhereInput
    data: XOR<CommitUpdateManyMutationInput, CommitUncheckedUpdateManyWithoutProjectInput>
  }

  export type CommitScalarWhereInput = {
    AND?: CommitScalarWhereInput | CommitScalarWhereInput[]
    OR?: CommitScalarWhereInput[]
    NOT?: CommitScalarWhereInput | CommitScalarWhereInput[]
    id?: StringFilter<"Commit"> | string
    createdAt?: DateTimeFilter<"Commit"> | Date | string
    updatedAt?: DateTimeFilter<"Commit"> | Date | string
    projectId?: StringFilter<"Commit"> | string
    commitMessage?: StringFilter<"Commit"> | string
    commitHash?: StringFilter<"Commit"> | string
    commitAuthorName?: StringFilter<"Commit"> | string
    commitAuthorAvatar?: StringFilter<"Commit"> | string
    commitDate?: DateTimeFilter<"Commit"> | Date | string
    summary?: StringFilter<"Commit"> | string
  }

  export type UserCreateWithoutProjectsInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    imageUrl?: string | null
    firstName?: string | null
    lastName?: string | null
    emailAddress: string
    credits?: CreditEntryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    imageUrl?: string | null
    firstName?: string | null
    lastName?: string | null
    emailAddress: string
    credits?: CreditEntryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type ProjectCreateWithoutMembersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    githubUrl: string
    deletedAt?: Date | string | null
    commits?: CommitCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutMembersInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    githubUrl: string
    deletedAt?: Date | string | null
    commits?: CommitUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutMembersInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput>
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailAddress?: StringFieldUpdateOperationsInput | string
    credits?: CreditEntryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    emailAddress?: StringFieldUpdateOperationsInput | string
    credits?: CreditEntryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectUpsertWithoutMembersInput = {
    update: XOR<ProjectUpdateWithoutMembersInput, ProjectUncheckedUpdateWithoutMembersInput>
    create: XOR<ProjectCreateWithoutMembersInput, ProjectUncheckedCreateWithoutMembersInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutMembersInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutMembersInput, ProjectUncheckedUpdateWithoutMembersInput>
  }

  export type ProjectUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    githubUrl?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commits?: CommitUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    githubUrl?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    commits?: CommitUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutCommitsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    githubUrl: string
    deletedAt?: Date | string | null
    members?: ProjectMemberCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutCommitsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    githubUrl: string
    deletedAt?: Date | string | null
    members?: ProjectMemberUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutCommitsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutCommitsInput, ProjectUncheckedCreateWithoutCommitsInput>
  }

  export type ProjectUpsertWithoutCommitsInput = {
    update: XOR<ProjectUpdateWithoutCommitsInput, ProjectUncheckedUpdateWithoutCommitsInput>
    create: XOR<ProjectCreateWithoutCommitsInput, ProjectUncheckedCreateWithoutCommitsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutCommitsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutCommitsInput, ProjectUncheckedUpdateWithoutCommitsInput>
  }

  export type ProjectUpdateWithoutCommitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    githubUrl?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: ProjectMemberUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutCommitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    githubUrl?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    members?: ProjectMemberUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type CreditEntryCreateManyUserInput = {
    id?: string
    delta: number
    reason: $Enums.CreditReason
    createdAt?: Date | string
  }

  export type ProjectMemberCreateManyUserInput = {
    projectId: string
    role?: $Enums.MemberRole
  }

  export type CreditEntryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    delta?: IntFieldUpdateOperationsInput | number
    reason?: EnumCreditReasonFieldUpdateOperationsInput | $Enums.CreditReason
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditEntryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    delta?: IntFieldUpdateOperationsInput | number
    reason?: EnumCreditReasonFieldUpdateOperationsInput | $Enums.CreditReason
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditEntryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    delta?: IntFieldUpdateOperationsInput | number
    reason?: EnumCreditReasonFieldUpdateOperationsInput | $Enums.CreditReason
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectMemberUpdateWithoutUserInput = {
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    project?: ProjectUpdateOneRequiredWithoutMembersNestedInput
  }

  export type ProjectMemberUncheckedUpdateWithoutUserInput = {
    projectId?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
  }

  export type ProjectMemberUncheckedUpdateManyWithoutUserInput = {
    projectId?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
  }

  export type ProjectMemberCreateManyProjectInput = {
    userId: string
    role?: $Enums.MemberRole
  }

  export type CommitCreateManyProjectInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    commitMessage: string
    commitHash: string
    commitAuthorName: string
    commitAuthorAvatar: string
    commitDate: Date | string
    summary: string
  }

  export type ProjectMemberUpdateWithoutProjectInput = {
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectMemberUncheckedUpdateWithoutProjectInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
  }

  export type ProjectMemberUncheckedUpdateManyWithoutProjectInput = {
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumMemberRoleFieldUpdateOperationsInput | $Enums.MemberRole
  }

  export type CommitUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commitMessage?: StringFieldUpdateOperationsInput | string
    commitHash?: StringFieldUpdateOperationsInput | string
    commitAuthorName?: StringFieldUpdateOperationsInput | string
    commitAuthorAvatar?: StringFieldUpdateOperationsInput | string
    commitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    summary?: StringFieldUpdateOperationsInput | string
  }

  export type CommitUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commitMessage?: StringFieldUpdateOperationsInput | string
    commitHash?: StringFieldUpdateOperationsInput | string
    commitAuthorName?: StringFieldUpdateOperationsInput | string
    commitAuthorAvatar?: StringFieldUpdateOperationsInput | string
    commitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    summary?: StringFieldUpdateOperationsInput | string
  }

  export type CommitUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    commitMessage?: StringFieldUpdateOperationsInput | string
    commitHash?: StringFieldUpdateOperationsInput | string
    commitAuthorName?: StringFieldUpdateOperationsInput | string
    commitAuthorAvatar?: StringFieldUpdateOperationsInput | string
    commitDate?: DateTimeFieldUpdateOperationsInput | Date | string
    summary?: StringFieldUpdateOperationsInput | string
  }



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