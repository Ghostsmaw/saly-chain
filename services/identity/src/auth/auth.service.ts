import {
  createHash,
  createPrivateKey,
  createPublicKey,
  createSecretKey,
  randomBytes,
  type KeyObject,
} from 'node:crypto';
import { Inject, Injectable, Logger, type OnApplicationBootstrap } from '@nestjs/common';
import { SignJWT, jwtVerify, exportJWK, type JWTPayload } from 'jose';
import { ulid } from 'ulid';
import { AuthenticationError, ConflictError, ValidationError, isSalyChainError } from '@salychain/errors';
import { IDENTITY_ENV, type IdentityRuntimeEnv } from '../config/env.runtime.js';
import { assertIdentityJwtConfig } from '../config/env.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { AliasesService } from '../aliases/aliases.service.js';
import { UserRole } from '../generated/prisma/index.js';
import { LoginThrottle } from './login-throttle.js';
import { hashPassword, verifyPassword } from './password.js';

export type AuthRole = 'SUPER_ADMIN' | 'BUSINESS' | 'DEVELOPER' | 'CONSUMER';

export interface TokenClaims {
  sub: string;
  email: string;
  role: AuthRole;
  agent_ids: string[];
  scopes: string[];
}

export interface VerifyTokenResult {
  user_id: string;
  email: string;
  role: AuthRole;
  agent_ids: string[];
  scopes: string[];
  rate_limit_per_min: number;
}

export interface AuthUser {
  id: string;
  email: string;
  role: AuthRole;
  display_name: string | null;
  status: string;
}

export interface AuthSession extends AuthUser {
  access_token: string;
  expires_in: number;
  token_type: 'Bearer';
  /** Opaque refresh token — store only in an httpOnly cookie; never log. */
  refresh_token: string;
  refresh_expires_in: number;
}

/**
 * Hash of a random password, verified against when the account doesn't exist.
 * Keeps the work factor identical for unknown emails so response timing does
 * not reveal whether an address is registered.
 */
const DUMMY_PASSWORD_HASH = hashPassword(randomBytes(32).toString('hex'));

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AuthService.name);
  private readonly secretKey?: KeyObject;
  private readonly privateKey?: KeyObject;
  private readonly publicKey?: KeyObject;
  private readonly loginThrottle: LoginThrottle;

  constructor(
    private readonly prisma: PrismaService,
    private readonly aliases: AliasesService,
    @Inject(IDENTITY_ENV) private readonly env: IdentityRuntimeEnv,
  ) {
    assertIdentityJwtConfig(this.env);
    this.loginThrottle = new LoginThrottle(this.env.LOGIN_ATTEMPTS_PER_MINUTE);
    if (this.env.JWT_ALG === 'RS256') {
      this.privateKey = createPrivateKey(this.env.JWT_PRIVATE_KEY_PEM!);
      this.publicKey = createPublicKey(this.env.JWT_PUBLIC_KEY_PEM!);
    } else {
      this.secretKey = createSecretKey(Buffer.from(this.env.JWT_SECRET!, 'utf8'));
    }
  }

  /**
   * Bootstrap a super-admin account, but only when credentials are explicitly
   * provided via SUPER_ADMIN_EMAIL / SUPER_ADMIN_PASSWORD. There is deliberately
   * no built-in default: hardcoded credentials are a credential-stuffing target
   * the moment the code is public or the image is shared.
   */
  async onApplicationBootstrap(): Promise<void> {
    const email = this.env.SUPER_ADMIN_EMAIL;
    const password = this.env.SUPER_ADMIN_PASSWORD;
    if (!email || !password) return;

    const normalized = email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email: normalized } });
    if (existing) return;

    const user = await this.prisma.user.create({
      data: {
        id: `usr_${ulid()}`,
        email: normalized,
        role: UserRole.SUPER_ADMIN,
        displayName: 'Super Admin',
        passwordHash: hashPassword(password),
      },
    });
    await this.aliases.register({ userId: user.id, kind: 'EMAIL', value: normalized, verified: true });
    this.logger.warn(`Seeded super-admin account ${normalized} (change the password immediately).`);
  }

  /** Self-service signup for BUSINESS / DEVELOPER accounts. */
  async register(input: {
    email: string;
    password: string;
    displayName?: string;
    role: AuthRole;
  }): Promise<AuthSession> {
    if (input.role === 'SUPER_ADMIN') {
      throw AuthenticationError('identity.auth.role_forbidden', 'Super-admin accounts cannot self-register');
    }
    if (input.password.length < 8) {
      throw ValidationError('identity.auth.weak_password', 'Password must be at least 8 characters');
    }
    const email = input.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw ConflictError('identity.user.exists', `An account with ${email} already exists`);
    }

    const user = await this.prisma.user.create({
      data: {
        id: `usr_${ulid()}`,
        email,
        role: input.role as UserRole,
        displayName: input.displayName?.trim() || null,
        passwordHash: hashPassword(input.password),
      },
    });
    // Self-register must not mark email verified without proof.
    await this.aliases.register({ userId: user.id, kind: 'EMAIL', value: email, verified: false });

    return this.issueSession(user.id);
  }

  /** Provision (or re-provision) a super-admin login and return a one-time temp password for email delivery. */
  async inviteSuperAdmin(input: { email: string; displayName?: string }): Promise<{
    user_id: string;
    email: string;
    temp_password: string;
    created: boolean;
  }> {
    const email = input.email.trim().toLowerCase();
    const displayName = input.displayName?.trim() || null;
    const tempPassword = generateTempPassword();
    const existing = await this.prisma.user.findUnique({ where: { email } });

    if (existing && existing.role !== UserRole.SUPER_ADMIN) {
      throw ConflictError(
        'identity.auth.role_forbidden',
        `Account ${email} exists with role ${existing.role} and cannot be invited as super-admin`,
      );
    }

    if (existing) {
      const user = await this.prisma.user.update({
        where: { id: existing.id },
        data: {
          status: 'ACTIVE',
          displayName: displayName ?? existing.displayName,
          passwordHash: hashPassword(tempPassword),
        },
      });
      return { user_id: user.id, email: user.email, temp_password: tempPassword, created: false };
    }

    const user = await this.prisma.user.create({
      data: {
        id: `usr_${ulid()}`,
        email,
        role: UserRole.SUPER_ADMIN,
        displayName,
        passwordHash: hashPassword(tempPassword),
      },
    });
    await this.aliases.register({ userId: user.id, kind: 'EMAIL', value: email, verified: true });
    return { user_id: user.id, email: user.email, temp_password: tempPassword, created: true };
  }

  /** Suspend super-admin console access for an email (idempotent). */
  async revokeSuperAdmin(input: { email: string }): Promise<{ user_id: string; email: string; suspended: boolean }> {
    const email = input.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return { user_id: '', email, suspended: false };
    if (user.role !== UserRole.SUPER_ADMIN) {
      throw ConflictError(
        'identity.auth.role_forbidden',
        `Account ${email} is not a super-admin`,
      );
    }
    if (user.status === 'SUSPENDED') return { user_id: user.id, email, suspended: false };
    await this.prisma.user.update({ where: { id: user.id }, data: { status: 'SUSPENDED' } });
    await this.prisma.refreshToken.updateMany({
      where: { userId: user.id, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    return { user_id: user.id, email, suspended: true };
  }

  /**
   * Password login. `expectedRole` enforces per-surface access (e.g. admin
   * console).
   *
   * Abuse resistance, in order:
   *   1. per-email throttle before any hashing (bounds scrypt CPU),
   *   2. temporary lockout after LOGIN_MAX_FAILURES consecutive failures,
   *   3. a dummy hash verification for unknown emails (no timing oracle).
   */
  async login(input: { email: string; password: string; expectedRole?: AuthRole }): Promise<AuthSession> {
    const email = input.email.trim().toLowerCase();
    this.loginThrottle.hit(email);

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      verifyPassword(input.password, DUMMY_PASSWORD_HASH);
      throw AuthenticationError('identity.auth.invalid_credentials', 'Invalid email or password');
    }

    if (user.lockedUntil && user.lockedUntil.getTime() > Date.now()) {
      const retryInSec = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 1000);
      throw AuthenticationError(
        'identity.auth.locked',
        `Too many failed attempts. Account is locked — retry in ${retryInSec}s.`,
      );
    }

    if (!verifyPassword(input.password, user.passwordHash)) {
      await this.recordFailedLogin(user.id, user.failedLoginCount);
      throw AuthenticationError('identity.auth.invalid_credentials', 'Invalid email or password');
    }

    if (user.status !== 'ACTIVE') {
      throw AuthenticationError('identity.user.inactive', `Account is ${user.status}`);
    }
    if (input.expectedRole && user.role !== input.expectedRole) {
      throw AuthenticationError(
        'identity.auth.role_mismatch',
        'This account does not have access to this surface',
      );
    }

    if (user.failedLoginCount > 0 || user.lockedUntil) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { failedLoginCount: 0, lockedUntil: null },
      });
    }

    return this.issueSession(user.id);
  }

  private async recordFailedLogin(userId: string, previousFailures: number): Promise<void> {
    const failures = previousFailures + 1;
    const lock = failures >= this.env.LOGIN_MAX_FAILURES;
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginCount: lock ? 0 : failures,
        lockedUntil: lock ? new Date(Date.now() + this.env.LOGIN_LOCKOUT_MINUTES * 60_000) : null,
      },
    });
    if (lock) {
      this.logger.warn(
        `account ${userId} locked for ${this.env.LOGIN_LOCKOUT_MINUTES}m after ${failures} failed logins`,
      );
    }
  }

  /**
   * Interactive login/register session: short-lived access JWT + rotatable
   * opaque refresh token.
   */
  async issueSession(userId: string): Promise<AuthSession> {
    const user = await this.requireActiveUser(userId);
    const access = await this.mintAccessToken(user);
    const refresh = await this.mintRefreshToken(user.id);
    return {
      ...toAuthUser(user),
      ...access,
      refresh_token: refresh.token,
      refresh_expires_in: refresh.expiresIn,
    };
  }

  /**
   * Internal/machine access token (no refresh). Still carries `jti` so it can
   * be denied server-side if needed.
   */
  async issueToken(userId: string): Promise<{ access_token: string; expires_in: number; token_type: 'Bearer' }> {
    const user = await this.requireActiveUser(userId);
    return this.mintAccessToken(user);
  }

  /** Rotate refresh token; returns a fresh AuthSession. Detects refresh reuse. */
  async refresh(refreshToken: string): Promise<AuthSession> {
    const tokenHash = hashRefreshToken(refreshToken);
    const existing = await this.prisma.refreshToken.findUnique({ where: { tokenHash } });
    if (!existing) {
      throw AuthenticationError('identity.refresh.invalid', 'Invalid refresh token');
    }

    if (existing.revokedAt) {
      // Reuse of a rotated token ⇒ family compromise — revoke the whole family.
      await this.prisma.refreshToken.updateMany({
        where: { familyId: existing.familyId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      throw AuthenticationError(
        'identity.refresh.reuse_detected',
        'Refresh token reuse detected — session family revoked',
      );
    }

    if (existing.expiresAt.getTime() <= Date.now()) {
      throw AuthenticationError('identity.refresh.expired', 'Refresh token expired');
    }

    const user = await this.requireActiveUser(existing.userId);
    const next = await this.mintRefreshToken(user.id, existing.familyId);
    await this.prisma.refreshToken.update({
      where: { id: existing.id },
      data: { revokedAt: new Date(), replacedById: next.id },
    });

    const access = await this.mintAccessToken(user);
    return {
      ...toAuthUser(user),
      ...access,
      refresh_token: next.token,
      refresh_expires_in: next.expiresIn,
    };
  }

  /**
   * Server-side logout: revoke refresh (if presented) and deny the access JWT
   * by `jti` until its natural expiry.
   */
  async logout(input: { refreshToken?: string; accessToken?: string }): Promise<{ revoked: boolean }> {
    let revoked = false;
    if (input.refreshToken) {
      const tokenHash = hashRefreshToken(input.refreshToken);
      const row = await this.prisma.refreshToken.findUnique({ where: { tokenHash } });
      if (row && !row.revokedAt) {
        await this.prisma.refreshToken.update({
          where: { id: row.id },
          data: { revokedAt: new Date() },
        });
        revoked = true;
      }
    }
    if (input.accessToken) {
      try {
        const { payload } = await jwtVerify(input.accessToken, this.verificationKey(), {
          issuer: this.env.JWT_ISSUER,
          audience: this.env.JWT_AUDIENCE,
        });
        const jti = typeof payload.jti === 'string' ? payload.jti : undefined;
        const exp = typeof payload.exp === 'number' ? payload.exp : undefined;
        if (jti && exp) {
          await this.prisma.accessTokenDenial.upsert({
            where: { jti },
            create: { jti, expiresAt: new Date(exp * 1000) },
            update: {},
          });
          revoked = true;
        }
      } catch {
        // Expired/invalid access token — still treat logout as success.
      }
    }
    return { revoked };
  }

  async verifyToken(token: string): Promise<VerifyTokenResult> {
    try {
      const { payload } = await jwtVerify(token, this.verificationKey(), {
        issuer: this.env.JWT_ISSUER,
        audience: this.env.JWT_AUDIENCE,
      });
      const claims = parseClaims(payload);
      const jti = typeof payload.jti === 'string' ? payload.jti : undefined;
      if (jti) {
        const denied = await this.prisma.accessTokenDenial.findUnique({ where: { jti } });
        if (denied) {
          throw AuthenticationError('identity.token.revoked', 'Access token has been revoked');
        }
      }
      const user = await this.prisma.user.findUnique({ where: { id: claims.sub } });
      if (!user || user.status !== 'ACTIVE') {
        throw AuthenticationError('identity.user.inactive', 'User is inactive or not found');
      }
      return {
        user_id: claims.sub,
        email: claims.email,
        role: claims.role,
        agent_ids: claims.agent_ids,
        scopes: claims.scopes.length > 0 ? claims.scopes : defaultConsumerScopes(),
        rate_limit_per_min: this.env.DEFAULT_RATE_LIMIT_PER_MIN,
      };
    } catch (err) {
      if (isSalyChainError(err)) throw err;
      throw AuthenticationError('identity.token.invalid', 'Invalid or expired access token');
    }
  }

  private async requireActiveUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw ValidationError('identity.user.not_found', `User ${userId} not found`);
    if (user.status !== 'ACTIVE') {
      throw AuthenticationError('identity.user.inactive', `User ${userId} is ${user.status}`);
    }
    return user;
  }

  private async mintAccessToken(user: {
    id: string;
    email: string;
    role: string;
    displayName: string | null;
  }): Promise<{ access_token: string; expires_in: number; token_type: 'Bearer' }> {
    const delegations = await this.prisma.delegationGrant.findMany({
      where: {
        userId: user.id,
        revokedAt: null,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
    });

    const agentIds = delegations.map((d) => d.agentId);
    const scopes = mergeScopes(delegations.flatMap((d) => d.scopes));
    const jti = ulid();

    const token = await new SignJWT({
      email: user.email,
      role: user.role as AuthRole,
      name: user.displayName ?? undefined,
      agent_ids: agentIds,
      scopes,
    } satisfies Omit<TokenClaims, 'sub'> & { name?: string })
      .setProtectedHeader({ alg: this.env.JWT_ALG, typ: 'JWT', kid: this.env.JWT_KEY_ID })
      .setSubject(user.id)
      .setJti(jti)
      .setIssuer(this.env.JWT_ISSUER)
      .setAudience(this.env.JWT_AUDIENCE)
      .setIssuedAt()
      .setExpirationTime(`${this.env.JWT_ACCESS_TTL_SEC}s`)
      .sign(this.signingKey());

    return {
      access_token: token,
      expires_in: this.env.JWT_ACCESS_TTL_SEC,
      token_type: 'Bearer',
    };
  }

  private async mintRefreshToken(
    userId: string,
    familyId = ulid(),
  ): Promise<{ id: string; token: string; expiresIn: number }> {
    const token = randomBytes(32).toString('base64url');
    const id = `rt_${ulid()}`;
    const expiresIn = this.env.JWT_REFRESH_TTL_SEC;
    await this.prisma.refreshToken.create({
      data: {
        id,
        userId,
        tokenHash: hashRefreshToken(token),
        familyId,
        expiresAt: new Date(Date.now() + expiresIn * 1000),
      },
    });
    return { id, token, expiresIn };
  }

  async jwks() {
    if (this.env.JWT_ALG === 'RS256' && this.publicKey) {
      const jwk = await exportJWK(this.publicKey);
      return {
        keys: [
          {
            ...jwk,
            kid: this.env.JWT_KEY_ID,
            alg: 'RS256',
            use: 'sig',
          },
        ],
      };
    }
    return {
      keys: [
        {
          kty: 'oct',
          kid: 'dev-hs256',
          alg: 'HS256',
          use: 'sig',
        },
      ],
    };
  }

  private signingKey(): KeyObject {
    if (this.env.JWT_ALG === 'RS256') {
      if (!this.privateKey) throw AuthenticationError('identity.jwt.misconfigured', 'RS256 private key missing');
      return this.privateKey;
    }
    if (!this.secretKey) throw AuthenticationError('identity.jwt.misconfigured', 'HS256 secret missing');
    return this.secretKey;
  }

  private verificationKey(): KeyObject {
    if (this.env.JWT_ALG === 'RS256') {
      if (!this.publicKey) throw AuthenticationError('identity.jwt.misconfigured', 'RS256 public key missing');
      return this.publicKey;
    }
    if (!this.secretKey) throw AuthenticationError('identity.jwt.misconfigured', 'HS256 secret missing');
    return this.secretKey;
  }
}

function parseClaims(payload: JWTPayload): TokenClaims {
  const sub = payload.sub;
  if (!sub || typeof sub !== 'string') {
    throw AuthenticationError('identity.token.invalid', 'Token missing subject');
  }
  const email = typeof payload.email === 'string' ? payload.email : '';
  const role: AuthRole =
    payload.role === 'SUPER_ADMIN' ||
    payload.role === 'BUSINESS' ||
    payload.role === 'DEVELOPER' ||
    payload.role === 'CONSUMER'
      ? payload.role
      : 'CONSUMER';
  const agentIds = Array.isArray(payload.agent_ids)
    ? payload.agent_ids.filter((v): v is string => typeof v === 'string')
    : [];
  const scopes = Array.isArray(payload.scopes)
    ? payload.scopes.filter((v): v is string => typeof v === 'string')
    : [];
  return { sub, email, role, agent_ids: agentIds, scopes };
}

function toAuthUser(user: {
  id: string;
  email: string;
  role: string;
  displayName: string | null;
  status: string;
}): AuthUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role as AuthRole,
    display_name: user.displayName,
    status: user.status,
  };
}

function mergeScopes(scopes: string[]): string[] {
  return [...new Set([...defaultConsumerScopes(), ...scopes])];
}

function defaultConsumerScopes(): string[] {
  return ['intents:read', 'intents:write', 'agents:read', 'agents:write', 'transactions:read'];
}

function generateTempPassword(): string {
  return randomBytes(18).toString('base64url').slice(0, 16);
}

function hashRefreshToken(token: string): string {
  return createHash('sha256').update(token, 'utf8').digest('hex');
}
