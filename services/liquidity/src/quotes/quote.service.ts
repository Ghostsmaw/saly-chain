import { Inject, Injectable, Logger } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { ConflictError, NotFoundError, ValidationError } from '@salychain/errors';
import { Quote, QuoteStatus, Prisma } from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { LIQUIDITY_ENV, type LiquidityEnv } from '../config/env.js';
import type { RateProvider } from '../rates/rate.provider.js';

export const RATE_PROVIDER = Symbol('RATE_PROVIDER');

/**
 * Default spread (in basis points). Production deploys configure spreads per
 * (currency-pair, channel, tier). For S2 we apply a flat 50 bps (0.50%) to all
 * pairs and let the routing service decide which provider quote to use.
 */
const DEFAULT_SPREAD_BPS = 50;

const ALL_BPS = 10_000;

export interface QuoteRequestInput {
  fromCurrency: string;
  toCurrency: string;
  fromAmountMinor: bigint;
  intentId?: string;
}

export interface QuoteWithMetadataInput extends QuoteRequestInput {
  toAmountMinor: bigint;
  quotedRate1e8: bigint;
  midRate1e8: bigint;
  spreadBps: number;
  provider: string;
  metadata?: Record<string, unknown>;
}

export interface FxQuotePreviewResponse {
  preview: true;
  from_currency: string;
  to_currency: string;
  from_amount_minor: string;
  to_amount_minor: string;
  quoted_rate_1e8: string;
  mid_rate_1e8: string;
  spread_bps: number;
  provider: string;
  expires_at: string;
}

export interface QuoteResponse {
  quote_id: string;
  from_currency: string;
  to_currency: string;
  from_amount_minor: string;
  to_amount_minor: string;
  quoted_rate_1e8: string;
  mid_rate_1e8: string;
  spread_bps: number;
  provider: string;
  signature: string;
  expires_at: string;
}

@Injectable()
export class QuoteService {
  private readonly logger = new Logger(QuoteService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(LIQUIDITY_ENV) private readonly env: LiquidityEnv,
    @Inject(RATE_PROVIDER) private readonly rates: RateProvider,
  ) {}

  async quote(input: QuoteRequestInput): Promise<QuoteResponse> {
    if (input.fromAmountMinor <= 0n) {
      throw ValidationError('liquidity.bad_amount', 'fromAmountMinor must be positive');
    }
    const base = input.fromCurrency.toUpperCase();
    const quoteCcy = input.toCurrency.toUpperCase();

    const mid = await this.rates.getMidRate(base, quoteCcy);

    // Snapshot the mid for audit.
    await this.prisma.fxRateSnapshot.create({
      data: {
        provider: mid.provider,
        baseCurrency: base,
        quoteCurrency: quoteCcy,
        midRate1e8: mid.midRate1e8,
        capturedAt: mid.capturedAt,
      },
    });

    const spreadBps = DEFAULT_SPREAD_BPS;
    const quotedRate1e8 = (mid.midRate1e8 * BigInt(ALL_BPS - spreadBps)) / BigInt(ALL_BPS);
    const toAmountMinor = (input.fromAmountMinor * quotedRate1e8) / 100_000_000n;

    return this.quoteWithMetadata({
      ...input,
      toAmountMinor,
      quotedRate1e8,
      midRate1e8: mid.midRate1e8,
      spreadBps,
      provider: mid.provider,
    });
  }

  /** Non-persisted quote for UI preview — same math as {@link quote} without DB write. */
  async previewQuote(input: QuoteRequestInput): Promise<FxQuotePreviewResponse> {
    if (input.fromAmountMinor <= 0n) {
      throw ValidationError('liquidity.bad_amount', 'fromAmountMinor must be positive');
    }
    const base = input.fromCurrency.toUpperCase();
    const quoteCcy = input.toCurrency.toUpperCase();
    const mid = await this.rates.getMidRate(base, quoteCcy);
    const spreadBps = DEFAULT_SPREAD_BPS;
    const quotedRate1e8 = (mid.midRate1e8 * BigInt(ALL_BPS - spreadBps)) / BigInt(ALL_BPS);
    const toAmountMinor = (input.fromAmountMinor * quotedRate1e8) / 100_000_000n;
    const expiresAt = new Date(Date.now() + this.env.LIQUIDITY_QUOTE_TTL_SECONDS * 1000);

    return {
      preview: true,
      from_currency: base,
      to_currency: quoteCcy,
      from_amount_minor: input.fromAmountMinor.toString(),
      to_amount_minor: toAmountMinor.toString(),
      quoted_rate_1e8: quotedRate1e8.toString(),
      mid_rate_1e8: mid.midRate1e8.toString(),
      spread_bps: spreadBps,
      provider: mid.provider,
      expires_at: expiresAt.toISOString(),
    };
  }

  async quoteWithMetadata(input: QuoteWithMetadataInput): Promise<QuoteResponse> {
    const base = input.fromCurrency.toUpperCase();
    const quoteCcy = input.toCurrency.toUpperCase();
    const expiresAt = new Date(Date.now() + this.env.LIQUIDITY_QUOTE_TTL_SECONDS * 1000);

    const created = await this.prisma.quote.create({
      data: {
        intentId: input.intentId ?? null,
        fromCurrency: base,
        toCurrency: quoteCcy,
        fromAmountMinor: input.fromAmountMinor,
        toAmountMinor: input.toAmountMinor,
        quotedRate1e8: input.quotedRate1e8,
        midRate1e8: input.midRate1e8,
        spreadBps: input.spreadBps,
        provider: input.provider,
        status: 'ISSUED',
        signature: '',
        expiresAt,
        metadata: (input.metadata ?? undefined) as Prisma.InputJsonValue | undefined,
      },
    });
    const signature = this.signQuote(created);
    await this.prisma.quote.update({ where: { id: created.id }, data: { signature } });

    this.logger.log(
      `quoted ${input.fromAmountMinor} ${base} → ${input.toAmountMinor} ${quoteCcy} (${input.provider})`,
    );

    return {
      quote_id: created.id,
      from_currency: base,
      to_currency: quoteCcy,
      from_amount_minor: input.fromAmountMinor.toString(),
      to_amount_minor: input.toAmountMinor.toString(),
      quoted_rate_1e8: input.quotedRate1e8.toString(),
      mid_rate_1e8: input.midRate1e8.toString(),
      spread_bps: input.spreadBps,
      provider: input.provider,
      signature,
      expires_at: expiresAt.toISOString(),
    };
  }

  async consume(quoteId: string, presentedSignature: string): Promise<QuoteResponse> {
    const quote = await this.prisma.quote.findUnique({ where: { id: quoteId } });
    if (!quote) throw NotFoundError('liquidity.quote_not_found', `Quote ${quoteId} not found`);

    if (quote.status === 'CONSUMED') {
      throw ConflictError('liquidity.quote_already_consumed', `Quote ${quoteId} has been consumed`);
    }
    if (quote.status === 'EXPIRED' || quote.expiresAt <= new Date()) {
      await this.prisma.quote.update({ where: { id: quoteId }, data: { status: 'EXPIRED' } });
      throw ConflictError('liquidity.quote_expired', `Quote ${quoteId} expired`);
    }
    if (!this.verifyQuoteSignature(quote, presentedSignature)) {
      throw ValidationError('liquidity.quote_bad_signature', `Quote ${quoteId} signature mismatch`);
    }

    const updated = await this.prisma.quote.update({
      where: { id: quoteId },
      data: { status: 'CONSUMED', consumedAt: new Date() },
    });

    return {
      quote_id: updated.id,
      from_currency: updated.fromCurrency,
      to_currency: updated.toCurrency,
      from_amount_minor: updated.fromAmountMinor.toString(),
      to_amount_minor: updated.toAmountMinor.toString(),
      quoted_rate_1e8: updated.quotedRate1e8.toString(),
      mid_rate_1e8: updated.midRate1e8.toString(),
      spread_bps: updated.spreadBps,
      provider: updated.provider,
      signature: updated.signature,
      expires_at: updated.expiresAt.toISOString(),
    };
  }

  async getQuote(id: string): Promise<Quote | null> {
    return this.prisma.quote.findUnique({ where: { id } });
  }

  async listRecent(limit: number) {
    const rows = await this.prisma.quote.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map((q) => ({
      quote_id: q.id,
      intent_id: q.intentId,
      from_currency: q.fromCurrency,
      to_currency: q.toCurrency,
      from_amount_minor: q.fromAmountMinor.toString(),
      to_amount_minor: q.toAmountMinor.toString(),
      quoted_rate_1e8: q.quotedRate1e8.toString(),
      spread_bps: q.spreadBps,
      provider: q.provider,
      status: q.status,
      expires_at: q.expiresAt.toISOString(),
      consumed_at: q.consumedAt?.toISOString() ?? null,
      created_at: q.createdAt.toISOString(),
    }));
  }

  // ─────────────────────── Signature helpers ───────────────────────

  private signQuote(q: Quote): string {
    return createHmac('sha256', this.env.LIQUIDITY_QUOTE_SIGNING_SECRET)
      .update(canonicalize(q))
      .digest('hex');
  }

  private verifyQuoteSignature(q: Quote, presented: string): boolean {
    const expected = this.signQuote(q);
    if (presented.length !== expected.length) return false;
    try {
      return timingSafeEqual(Buffer.from(presented, 'hex'), Buffer.from(expected, 'hex'));
    } catch {
      return false;
    }
  }
}

/** Canonical serialization for signing — locks every consumed field. */
function canonicalize(q: Quote): string {
  const meta =
    q.metadata && typeof q.metadata === 'object' ? JSON.stringify(q.metadata) : '';
  return [
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
}
