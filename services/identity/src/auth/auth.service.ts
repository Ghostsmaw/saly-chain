import { createPrivateKey, createPublicKey, createSecretKey, randomBytes, type KeyObject } from 'node:crypto';
import { Inject, Injectable, Logger, type OnApplicationBootstrap } from '@nestjs/common';
import { SignJWT, jwtVerify, exportJWK, type JWTPayload } from 'jose';
import { ulid } from 'ulid';
import { AuthenticationError, ConflictError, ValidationError, isSalyChainError } from '@salychain/errors';
import { IDENTITY_ENV, type IdentityRuntimeEnv } from '../config/env.runtime.js';
import { assertIdentityJwtConfig } from '../config/env.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { AliasesService } from '../aliases/aliases.service.js';
import { UserRole } from '../generated/prisma/index.js';
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
}

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AuthService.name);
  private readonly secretKey?: KeyObject;
  private readonly privateKey?: KeyObject;
  private readonly publicKey?: KeyObject;

  constructor(
    private readonly prisma: PrismaService,
    private readonly aliases: AliasesService,
    @Inject(IDENTITY_ENV) private readonly env: IdentityRuntimeEnv,
  ) {
    assertIdentityJwtConfig(this.env);
    if (this.env.JWT_ALG === 'RS256') {
      this.privateKey = createPrivateKey(this.env.JWT_PRIVATE_KEY_PEM!);
      this.publicKey = createPublicKey(this.env.JWT_PUBLIC_KEY_PEM!);
    } else {
      this.secretKey = createSecretKey(Buffer.from(this.env.JWT_SECRET!, 'utf8'));
    }
  }

  /** Seed a dev super-admin so the admin console is reachable out of the box. */
  async onApplicationBootstrap(): Promise<void> {
    const isDev = this.env.NODE_ENV !== 'production';
    const email = this.env.SUPER_ADMIN_EMAIL ?? (isDev ? 'superadmin@salychain.io' : undefined);
    const password = this.env.SUPER_ADMIN_PASSWORD ?? (isDev ? 'ChangeMe!2026' : undefined);
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
    await this.aliases.register({ userId: user.id, kind: 'EMAIL', value: email, verified: true });

    const token = await this.issueToken(user.id);
    return { ...toAuthUser(user), ...token };
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
    return { user_id: user.id, email, suspended: true };
  }

  /** Password login. `expectedRole` enforces per-surface access (e.g. admin console). */
  async login(input: { email: string; password: string; expectedRole?: AuthRole }): Promise<AuthSession> {
    const email = input.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash || !verifyPassword(input.password, user.passwordHash)) {
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
    const token = await this.issueToken(user.id);
    return { ...toAuthUser(user), ...token };
  }

  async issueToken(userId: string): Promise<{ access_token: string; expires_in: number; token_type: 'Bearer' }> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw ValidationError('identity.user.not_found', `User ${userId} not found`);
    if (user.status !== 'ACTIVE') {
      throw AuthenticationError('identity.user.inactive', `User ${userId} is ${user.status}`);
    }

    const delegations = await this.prisma.delegationGrant.findMany({
      where: {
        userId,
        revokedAt: null,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
    });

    const agentIds = delegations.map((d) => d.agentId);
    const scopes = mergeScopes(delegations.flatMap((d) => d.scopes));

    const token = await new SignJWT({
      email: user.email,
      role: user.role as AuthRole,
      agent_ids: agentIds,
      scopes,
    } satisfies Omit<TokenClaims, 'sub'>)
      .setProtectedHeader({ alg: this.env.JWT_ALG, typ: 'JWT', kid: this.env.JWT_KEY_ID })
      .setSubject(user.id)
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

  async verifyToken(token: string): Promise<VerifyTokenResult> {
    try {
      const { payload } = await jwtVerify(token, this.verificationKey(), {
        issuer: this.env.JWT_ISSUER,
        audience: this.env.JWT_AUDIENCE,
      });
      const claims = parseClaims(payload);
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
