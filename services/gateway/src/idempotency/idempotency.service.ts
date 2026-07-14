import { createHash } from 'node:crypto';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConflictError } from '@salychain/errors';
import { PrismaService } from '../prisma/prisma.service.js';
import { GATEWAY_ENV, type GatewayEnv } from '../config/env.js';

/**
 * Gateway-level idempotency.
 *
 * For any mutating request that carries an `Idempotency-Key`, we:
 *   1. Compute `sha256(body)` and check for a stored record.
 *   2. If found AND the body hash matches → return the cached response. Done.
 *   3. If found AND the body hash differs → conflict (caller is reusing a key
 *      for a different payload, which is a logic bug on their side).
 *   4. If not found → execute the request, then persist the response.
 *
 * Downstream services do their own idempotency too — this gateway-level cache
 * is the cheap fast path that protects them from accidental double-clicks.
 */
@Injectable()
export class IdempotencyService {
  private readonly logger = new Logger(IdempotencyService.name);
  constructor(
    private readonly prisma: PrismaService,
    @Inject(GATEWAY_ENV) private readonly env: GatewayEnv,
  ) {}

  static hashBody(body: unknown): string {
    const text = typeof body === 'string' ? body : JSON.stringify(body ?? null);
    return createHash('sha256').update(text).digest('hex');
  }

  async lookup(input: {
    apiKeyId: string;
    idempotencyKey: string;
    method: string;
    path: string;
    requestHash: string;
  }): Promise<{ status: number; body: string; headers: Record<string, string> } | null> {
    const id = recordId(input.apiKeyId, input.idempotencyKey);
    const existing = await this.prisma.idempotencyRecord.findUnique({ where: { id } });
    if (!existing) return null;
    if (existing.expiresAt < new Date()) {
      await this.prisma.idempotencyRecord.delete({ where: { id } }).catch(() => undefined);
      return null;
    }
    if (existing.method !== input.method || existing.path !== input.path || existing.requestHash !== input.requestHash) {
      throw ConflictError(
        'gateway.idempotency.conflict',
        `Idempotency-Key reused with a different request (method/path/body). Pick a new key.`,
        { details: { stored_path: existing.path, stored_method: existing.method } },
      );
    }
    return {
      status: existing.responseStatus,
      body: existing.responseBody,
      headers: existing.responseHeaders as Record<string, string>,
    };
  }

  async record(input: {
    apiKeyId: string;
    idempotencyKey: string;
    method: string;
    path: string;
    requestHash: string;
    responseStatus: number;
    responseBody: string;
    responseHeaders: Record<string, string>;
  }): Promise<void> {
    const id = recordId(input.apiKeyId, input.idempotencyKey);
    const expiresAt = new Date(Date.now() + this.env.IDEMPOTENCY_WINDOW_SECONDS * 1_000);
    await this.prisma.idempotencyRecord.upsert({
      where: { id },
      create: {
        id,
        apiKeyId: input.apiKeyId,
        idempotencyKey: input.idempotencyKey,
        method: input.method,
        path: input.path,
        requestHash: input.requestHash,
        responseStatus: input.responseStatus,
        responseBody: input.responseBody,
        responseHeaders: input.responseHeaders,
        expiresAt,
      },
      update: {},
    });
  }
}

function recordId(apiKeyId: string, idempotencyKey: string): string {
  return `${apiKeyId}:${idempotencyKey}`;
}
