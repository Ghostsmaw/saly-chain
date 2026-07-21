import { createHmac } from 'node:crypto';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { isSalyChainError } from '@salychain/errors';
import { QuoteService } from './quote.service.js';
import type { LiquidityEnv } from '../config/env.js';

const SECRET = 'test-quote-signing-secret-32b!!';

function throws(code: string) {
  return (err: unknown) => isSalyChainError(err) && err.code === code;
}

function signQuote(q: {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmountMinor: bigint;
  toAmountMinor: bigint;
  quotedRate1e8: bigint;
  midRate1e8: bigint;
  spreadBps: number;
  provider: string;
  expiresAt: Date;
  metadata?: unknown;
}): string {
  const meta = q.metadata && typeof q.metadata === 'object' ? JSON.stringify(q.metadata) : '';
  const canonical = [
    'v1',
    q.id,
    q.fromCurrency,
    q.toCurrency,
    q.fromAmountMinor.toString(),
    q.toAmountMinor.toString(),
    q.quotedRate1e8.toString(),
    q.midRate1e8.toString(),
    String(q.spreadBps),
    q.provider,
    q.expiresAt.toISOString(),
    meta,
  ].join('|');
  return createHmac('sha256', SECRET).update(canonical).digest('hex');
}

describe('QuoteService.consume', () => {
  const expiresAt = new Date(Date.now() + 60_000);
  const baseQuote = {
    id: 'q-1',
    fromCurrency: 'USD',
    toCurrency: 'NGN',
    fromAmountMinor: 1_000_000n,
    toAmountMinor: 1_500_000_000n,
    quotedRate1e8: 149_250_000n,
    midRate1e8: 150_000_000n,
    spreadBps: 50,
    provider: 'coinbase',
    status: 'ISSUED' as 'ISSUED' | 'CONSUMED' | 'EXPIRED',
    expiresAt,
    consumedAt: null as Date | null,
    metadata: null,
    signature: '',
    intentId: null,
    createdAt: new Date(),
  };

  let quote: typeof baseQuote;
  let updateManyCount: number;
  let prisma: {
    quote: {
      findUnique: ReturnType<typeof vi.fn>;
      findUniqueOrThrow: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
      updateMany: ReturnType<typeof vi.fn>;
    };
  };
  let service: QuoteService;

  beforeEach(() => {
    quote = { ...baseQuote, signature: '' };
    quote.signature = signQuote(quote);
    updateManyCount = 1;
    prisma = {
      quote: {
        findUnique: vi.fn(async () => ({ ...quote })),
        findUniqueOrThrow: vi.fn(async () => ({ ...quote, status: 'CONSUMED', consumedAt: new Date() })),
        update: vi.fn(async ({ data }: { data: Partial<typeof quote> }) => {
          Object.assign(quote, data);
          return quote;
        }),
        updateMany: vi.fn(async () => {
          if (updateManyCount === 1 && quote.status === 'ISSUED') {
            quote.status = 'CONSUMED';
            quote.consumedAt = new Date();
            return { count: 1 };
          }
          return { count: 0 };
        }),
      },
    };
    service = new QuoteService(
      prisma as never,
      { LIQUIDITY_QUOTE_SIGNING_SECRET: SECRET, LIQUIDITY_QUOTE_TTL_SECONDS: 30 } as LiquidityEnv,
      { name: 'stub', getMidRate: vi.fn() } as never,
    );
  });

  it('consumes an issued quote with a valid signature', async () => {
    const res = await service.consume(quote.id, quote.signature);
    expect(res.quote_id).toBe(quote.id);
    expect(prisma.quote.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ id: quote.id, status: 'ISSUED' }),
      }),
    );
  });

  it('rejects a bad signature before claiming the quote', async () => {
    await expect(service.consume(quote.id, '00'.repeat(32))).rejects.toSatisfy(
      throws('liquidity.quote_bad_signature'),
    );
    expect(prisma.quote.updateMany).not.toHaveBeenCalled();
  });

  it('rejects an already-consumed quote', async () => {
    quote.status = 'CONSUMED';
    await expect(service.consume(quote.id, quote.signature)).rejects.toSatisfy(
      throws('liquidity.quote_already_consumed'),
    );
  });

  it('rejects an expired quote', async () => {
    quote.expiresAt = new Date(Date.now() - 1_000);
    quote.signature = signQuote(quote);
    await expect(service.consume(quote.id, quote.signature)).rejects.toSatisfy(
      throws('liquidity.quote_expired'),
    );
  });

  it('loses the race when updateMany claims zero rows (concurrent consume)', async () => {
    updateManyCount = 0;
    quote.status = 'CONSUMED';
    // First findUnique returns ISSUED so we pass pre-checks; updateMany loses the race.
    let calls = 0;
    prisma.quote.findUnique = vi.fn(async () => {
      calls += 1;
      if (calls === 1) {
        return { ...baseQuote, status: 'ISSUED', signature: signQuote(baseQuote), expiresAt };
      }
      return { ...baseQuote, status: 'CONSUMED', signature: signQuote(baseQuote), expiresAt };
    });

    await expect(service.consume(quote.id, signQuote({ ...baseQuote, expiresAt }))).rejects.toSatisfy(
      throws('liquidity.quote_already_consumed'),
    );
  });
});
