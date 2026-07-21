import { describe, expect, it, vi, beforeEach } from 'vitest';
import { createHash } from 'node:crypto';
import { isSalyChainError } from '@salychain/errors';
import { AuthService } from './auth.service.js';
import type { IdentityRuntimeEnv } from '../config/env.runtime.js';

function hashRefreshToken(token: string): string {
  return createHash('sha256').update(token, 'utf8').digest('hex');
}

function throws(code: string) {
  return (err: unknown) => isSalyChainError(err) && err.code === code;
}

describe('AuthService refresh / logout', () => {
  const env = {
    JWT_ALG: 'HS256',
    JWT_SECRET: 'test-secret-at-least-16-chars!!',
    JWT_ISSUER: 'salychain',
    JWT_AUDIENCE: 'salychain.consumer',
    JWT_KEY_ID: 'test',
    JWT_ACCESS_TTL_SEC: 900,
    JWT_REFRESH_TTL_SEC: 3_600,
    DEFAULT_RATE_LIMIT_PER_MIN: 60,
    LOGIN_MAX_FAILURES: 5,
    LOGIN_LOCKOUT_MINUTES: 15,
    LOGIN_ATTEMPTS_PER_MINUTE: 30,
  } as IdentityRuntimeEnv;

  const user = {
    id: 'usr_01TESTUSER000000000000000',
    email: 'ops@example.com',
    role: 'BUSINESS',
    displayName: 'Ops',
    status: 'ACTIVE',
    passwordHash: null,
    failedLoginCount: 0,
    lockedUntil: null,
    metadata: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let refreshRows: Array<{
    id: string;
    userId: string;
    tokenHash: string;
    familyId: string;
    expiresAt: Date;
    revokedAt: Date | null;
    replacedById: string | null;
  }>;
  let denials: Map<string, Date>;
  let prisma: Record<string, unknown>;
  let service: AuthService;

  beforeEach(() => {
    refreshRows = [];
    denials = new Map();
    prisma = {
      user: {
        findUnique: vi.fn(async ({ where }: { where: { id?: string } }) =>
          where.id === user.id ? user : null,
        ),
      },
      delegationGrant: {
        findMany: vi.fn(async () => []),
      },
      refreshToken: {
        create: vi.fn(async ({ data }: { data: (typeof refreshRows)[number] }) => {
          refreshRows.push({ ...data, revokedAt: data.revokedAt ?? null, replacedById: data.replacedById ?? null });
          return data;
        }),
        findUnique: vi.fn(async ({ where }: { where: { tokenHash: string } }) =>
          refreshRows.find((r) => r.tokenHash === where.tokenHash) ?? null,
        ),
        update: vi.fn(async ({ where, data }: { where: { id: string }; data: Partial<(typeof refreshRows)[number]> }) => {
          const row = refreshRows.find((r) => r.id === where.id);
          if (!row) throw new Error('missing');
          Object.assign(row, data);
          return row;
        }),
        updateMany: vi.fn(
          async ({
            where,
            data,
          }: {
            where: { familyId: string; revokedAt: null };
            data: { revokedAt: Date };
          }) => {
            let count = 0;
            for (const row of refreshRows) {
              if (row.familyId === where.familyId && row.revokedAt === null) {
                row.revokedAt = data.revokedAt;
                count += 1;
              }
            }
            return { count };
          },
        ),
      },
      accessTokenDenial: {
        upsert: vi.fn(
          async ({
            where,
            create,
          }: {
            where: { jti: string };
            create: { jti: string; expiresAt: Date };
          }) => {
            denials.set(where.jti, create.expiresAt);
            return create;
          },
        ),
        findUnique: vi.fn(async ({ where }: { where: { jti: string } }) =>
          denials.has(where.jti) ? { jti: where.jti, expiresAt: denials.get(where.jti)! } : null,
        ),
      },
    };

    service = new AuthService(prisma as never, { register: vi.fn() } as never, env);
  });

  it('issues a session with access + refresh and rotates on refresh', async () => {
    const session = await service.issueSession(user.id);
    expect(session.access_token).toBeTruthy();
    expect(session.refresh_token).toBeTruthy();
    expect(refreshRows).toHaveLength(1);

    const rotated = await service.refresh(session.refresh_token);
    expect(rotated.refresh_token).not.toBe(session.refresh_token);
    expect(refreshRows).toHaveLength(2);
    expect(refreshRows[0]!.revokedAt).toBeInstanceOf(Date);
    expect(refreshRows[0]!.replacedById).toBe(refreshRows[1]!.id);
  });

  it('revokes the whole family when a rotated refresh token is reused', async () => {
    const session = await service.issueSession(user.id);
    const firstRefresh = session.refresh_token;
    await service.refresh(firstRefresh);

    await expect(service.refresh(firstRefresh)).rejects.toSatisfy(throws('identity.refresh.reuse_detected'));
    expect(refreshRows.every((r) => r.revokedAt !== null)).toBe(true);
  });

  it('logout denies the access JWT by jti and revokes the refresh token', async () => {
    const session = await service.issueSession(user.id);
    const result = await service.logout({
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
    });
    expect(result.revoked).toBe(true);
    expect(refreshRows[0]!.revokedAt).toBeInstanceOf(Date);
    expect(denials.size).toBe(1);

    await expect(service.verifyToken(session.access_token)).rejects.toSatisfy(
      throws('identity.token.revoked'),
    );
  });

  it('rejects an unknown refresh token', async () => {
    await expect(service.refresh('not-a-real-refresh-token')).rejects.toSatisfy(
      throws('identity.refresh.invalid'),
    );
  });

  it('stores only the hash of the refresh token', async () => {
    const session = await service.issueSession(user.id);
    expect(refreshRows[0]!.tokenHash).toBe(hashRefreshToken(session.refresh_token));
    expect(refreshRows[0]!.tokenHash).not.toBe(session.refresh_token);
  });
});
