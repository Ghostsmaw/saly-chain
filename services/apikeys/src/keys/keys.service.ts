import { Inject, Injectable, Logger } from '@nestjs/common';
import { ulid } from 'ulid';
import { AuthenticationError, AuthorizationError, ConflictError, NotFoundError, ValidationError } from '@salychain/errors';
import { isIpAllowed } from '@salychain/config';
import { ApiKey, ApiKeyStatus, Environment } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { GatewayCacheInvalidator } from './gateway-cache.invalidator.js';
import { extractPrefix, generateApiKey, verifyApiKey } from './key-secret.js';
import { APIKEYS_ENV, type ApiKeysRuntimeEnv } from '../config/env.runtime.js';

export interface IssueKeyInput {
  orgId: string;
  environment: Environment;
  scopes: string[];
  description?: string;
  rateLimitPerMin?: number;
  ipAllowList?: string[];
  expiresAt?: Date;
  createdBy?: string;
}

export interface IssuedKey {
  /** The cleartext secret. Caller MUST persist this immediately — we never show it again. */
  secret: string;
  apiKey: PublicApiKey;
}

export interface PublicApiKey {
  id: string;
  org_id: string;
  prefix: string;
  last_four: string;
  environment: Environment;
  status: ApiKeyStatus;
  scopes: string[];
  rate_limit_per_min: number;
  description?: string;
  ip_allow_list: string[];
  created_by?: string;
  created_at: string;
  last_used_at?: string;
  expires_at?: string;
  revoked_at?: string;
  revoked_reason?: string;
}

export interface VerifyKeyResult {
  api_key_id: string;
  org_id: string;
  environment: Environment;
  scopes: string[];
  rate_limit_per_min: number;
  ip_allow_list: string[];
}

@Injectable()
export class KeysService {
  private readonly logger = new Logger(KeysService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly gatewayCache: GatewayCacheInvalidator,
    @Inject(APIKEYS_ENV) private readonly env: ApiKeysRuntimeEnv,
  ) {}

  async issue(input: IssueKeyInput): Promise<IssuedKey> {
    const org = await this.prisma.organization.findUnique({ where: { id: input.orgId } });
    if (!org) throw NotFoundError('apikeys.org.not_found', `Org ${input.orgId} not found`);
    if (org.status !== 'ACTIVE') {
      throw AuthorizationError('apikeys.org.inactive', `Org ${input.orgId} is ${org.status}, cannot issue keys`);
    }
    if (input.scopes.length === 0) {
      throw ValidationError('apikeys.scopes.empty', 'At least one scope is required when issuing an API key');
    }
    for (const scope of input.scopes) {
      if (!/^[a-z][a-z0-9_]*:(read|write|admin)$/.test(scope)) {
        throw ValidationError('apikeys.scope.invalid', `Invalid scope "${scope}" — expected '<resource>:(read|write|admin)'`);
      }
    }

    const generated = generateApiKey(input.environment, this.env.APIKEY_HASH_PEPPER);
    const id = `key_${ulid()}`;

    const created = await this.prisma.apiKey.create({
      data: {
        id,
        orgId: input.orgId,
        prefix: generated.prefix,
        salt: generated.salt,
        secretHash: generated.secretHash,
        lastFour: generated.lastFour,
        environment: input.environment,
        status: 'ACTIVE',
        scopes: input.scopes,
        rateLimitPerMin: input.rateLimitPerMin ?? org.defaultRateLimitPerMin ?? this.env.DEFAULT_RATE_LIMIT_PER_MIN,
        description: input.description ?? null,
        ipAllowList: input.ipAllowList ?? [],
        createdBy: input.createdBy ?? null,
        expiresAt: input.expiresAt ?? null,
      },
    });

    await this.prisma.apiKeyEvent.create({
      data: {
        id: `evt_${ulid()}`,
        apiKeyId: created.id,
        kind: 'ISSUED',
        metadata: { scopes: input.scopes, environment: input.environment },
      },
    });

    this.logger.log(`apikey issued id=${created.id} org=${input.orgId} env=${input.environment} scopes=${input.scopes.join(',')}`);
    return { secret: generated.fullSecret, apiKey: toPublic(created) };
  }

  async list(orgId: string, includeRevoked = false): Promise<PublicApiKey[]> {
    const where = includeRevoked ? { orgId } : { orgId, status: { not: 'REVOKED' as ApiKeyStatus } };
    const rows = await this.prisma.apiKey.findMany({ where, orderBy: { createdAt: 'desc' } });
    return rows.map(toPublic);
  }

  async getById(id: string): Promise<PublicApiKey> {
    const key = await this.prisma.apiKey.findUnique({ where: { id } });
    if (!key) throw NotFoundError('apikeys.not_found', `API key ${id} not found`);
    return toPublic(key);
  }

  async revoke(id: string, reason: string): Promise<PublicApiKey> {
    const key = await this.prisma.apiKey.findUnique({ where: { id } });
    if (!key) throw NotFoundError('apikeys.not_found', `API key ${id} not found`);
    if (key.status === 'REVOKED') throw ConflictError('apikeys.already_revoked', `API key ${id} already revoked`);
    const updated = await this.prisma.apiKey.update({
      where: { id },
      data: { status: 'REVOKED', revokedAt: new Date(), revokedReason: reason },
    });
    await this.prisma.apiKeyEvent.create({
      data: { id: `evt_${ulid()}`, apiKeyId: id, kind: 'REVOKED', metadata: { reason } },
    });
    await this.gatewayCache.invalidate(id);
    this.logger.warn(`apikey revoked id=${id} reason=${reason}`);
    return toPublic(updated);
  }

  /**
   * Rotate: issue a new key for the same org with the same scopes & limits,
   * then mark the old one revoked. Caller is responsible for distributing
   * the new secret before the old key stops working — we do NOT grace-period
   * here. Callers wanting overlap should request two separate keys instead.
   */
  async rotate(id: string, reason: string, createdBy?: string): Promise<IssuedKey> {
    const old = await this.prisma.apiKey.findUnique({ where: { id } });
    if (!old) throw NotFoundError('apikeys.not_found', `API key ${id} not found`);
    if (old.status !== 'ACTIVE') {
      throw ConflictError('apikeys.cannot_rotate', `API key ${id} status is ${old.status}, cannot rotate`);
    }
    const issued = await this.issue({
      orgId: old.orgId,
      environment: old.environment,
      scopes: old.scopes,
      description: old.description ?? undefined,
      rateLimitPerMin: old.rateLimitPerMin,
      ipAllowList: old.ipAllowList,
      ...(old.expiresAt ? { expiresAt: old.expiresAt } : {}),
      ...(createdBy ? { createdBy } : {}),
    });
    await this.revoke(id, `rotated:${reason}`);
    await this.prisma.apiKeyEvent.create({
      data: { id: `evt_${ulid()}`, apiKeyId: id, kind: 'ROTATED', metadata: { new_key_id: issued.apiKey.id, reason } },
    });
    return issued;
  }

  /**
   * Verify a presented secret. Returns the API key envelope (no secret).
   * Throws `AuthenticationError` on any mismatch. This is the only path the
   * gateway should ever call.
   */
  async verify(presentedSecret: string, opts: { ip?: string; userAgent?: string; correlationId?: string } = {}): Promise<VerifyKeyResult> {
    const prefix = extractPrefix(presentedSecret);
    if (!prefix) throw AuthenticationError('apikeys.invalid_format', 'API key has invalid format');

    const stored = await this.prisma.apiKey.findUnique({ where: { prefix } });
    if (!stored) throw AuthenticationError('apikeys.unknown', 'API key not recognized');
    if (stored.status !== 'ACTIVE') throw AuthenticationError('apikeys.inactive', `API key is ${stored.status}`);
    if (stored.expiresAt && stored.expiresAt < new Date()) {
      await this.prisma.apiKey.update({ where: { id: stored.id }, data: { status: 'EXPIRED' } });
      throw AuthenticationError('apikeys.expired', 'API key has expired');
    }

    const ok = verifyApiKey(presentedSecret, { salt: stored.salt, secretHash: stored.secretHash }, this.env.APIKEY_HASH_PEPPER);
    if (!ok) throw AuthenticationError('apikeys.invalid_secret', 'API key secret does not match');

    if (!isIpAllowed(opts.ip, stored.ipAllowList)) {
      throw AuthorizationError(
        'apikeys.ip_denied',
        opts.ip ? `API key not authorized from ${opts.ip}` : 'API key requires a client IP that matches its allow-list',
      );
    }

    // Best-effort usage tracking; failure here must NOT block the request.
    this.prisma.apiKey
      .update({ where: { id: stored.id }, data: { lastUsedAt: new Date() } })
      .catch(() => undefined);
    this.prisma.apiKeyEvent
      .create({
        data: {
          id: `evt_${ulid()}`,
          apiKeyId: stored.id,
          kind: 'USED',
          ip: opts.ip ?? null,
          userAgent: opts.userAgent ?? null,
          correlationId: opts.correlationId ?? null,
        },
      })
      .catch(() => undefined);

    return {
      api_key_id: stored.id,
      org_id: stored.orgId,
      environment: stored.environment,
      scopes: stored.scopes,
      rate_limit_per_min: stored.rateLimitPerMin,
      ip_allow_list: stored.ipAllowList,
    };
  }
}

function toPublic(k: ApiKey): PublicApiKey {
  return {
    id: k.id,
    org_id: k.orgId,
    prefix: k.prefix,
    last_four: k.lastFour,
    environment: k.environment,
    status: k.status,
    scopes: k.scopes,
    rate_limit_per_min: k.rateLimitPerMin,
    ...(k.description ? { description: k.description } : {}),
    ip_allow_list: k.ipAllowList,
    ...(k.createdBy ? { created_by: k.createdBy } : {}),
    created_at: k.createdAt.toISOString(),
    ...(k.lastUsedAt ? { last_used_at: k.lastUsedAt.toISOString() } : {}),
    ...(k.expiresAt ? { expires_at: k.expiresAt.toISOString() } : {}),
    ...(k.revokedAt ? { revoked_at: k.revokedAt.toISOString() } : {}),
    ...(k.revokedReason ? { revoked_reason: k.revokedReason } : {}),
  };
}
