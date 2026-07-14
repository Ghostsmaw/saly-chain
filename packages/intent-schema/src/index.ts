import { z } from 'zod';

/**
 * Canonical intent schema, version 1.
 *
 * This module is the contract between Saly AI (intent extraction) and
 * SalyChain (execution). It is intentionally permissive about route choice
 * (the routing engine decides) and strict about identifiers, amounts, and
 * actor identity.
 *
 * Backwards compatibility:
 *   - Only additive changes within a major version.
 *   - Breaking changes require a new `version` literal and a sibling schema.
 */

export const INTENT_SCHEMA_VERSION = '1' as const;

// ───────────────────────────── Primitives ─────────────────────────────

/**
 * Monetary amount on the wire. Always carried as an integer string in the
 * currency's smallest unit. See ADR-0004.
 */
export const moneyAmountSchema = z.object({
  amount_minor: z
    .string()
    .regex(/^-?\d+$/, 'amount_minor must be an integer string in the smallest unit'),
  currency: z.string().min(3).max(8),
});
export type MoneyAmount = z.infer<typeof moneyAmountSchema>;

export const ulidSchema = z
  .string()
  .regex(/^[0-9A-HJKMNP-TV-Z]{26}$/, 'must be a ULID');

export const prefixedIdSchema = (prefix: string) =>
  z.string().regex(new RegExp(`^${prefix}_[0-9A-HJKMNP-TV-Z]{26}$`), `must be a ${prefix}_ULID`);

// ───────────────────────────── Actor ─────────────────────────────

export const actorSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('USER'), id: prefixedIdSchema('usr') }),
  z.object({ type: z.literal('BUSINESS'), id: prefixedIdSchema('biz') }),
  z.object({ type: z.literal('AGENT'), id: prefixedIdSchema('agt'), owner_id: z.string() }),
  z.object({ type: z.literal('SYSTEM'), id: z.string() }),
]);
export type Actor = z.infer<typeof actorSchema>;

// ───────────────────────────── Beneficiary ─────────────────────────────

export const beneficiarySchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('WALLET'),
    chain: z.enum(['BASE', 'XRPL', 'SALY_L3', 'ETHEREUM', 'POLYGON', 'INTERNAL']),
    address: z.string().min(3),
    memo: z.string().optional(),
  }),
  z.object({
    kind: z.literal('PHONE'),
    value: z
      .string()
      .regex(/^\+[1-9]\d{6,14}$/, 'must be E.164 phone number'),
    country: z.string().length(2).optional(),
  }),
  z.object({
    kind: z.literal('EMAIL'),
    value: z.string().email(),
  }),
  z.object({
    kind: z.literal('BANK'),
    country: z.string().length(2),
    account_number: z.string(),
    bank_code: z.string(),
    account_name: z.string().optional(),
  }),
  z.object({
    kind: z.literal('HANDLE'),
    value: z.string().regex(/^@[a-z0-9_]{3,32}$/i),
  }),
  z.object({
    kind: z.literal('INTERNAL_ACCOUNT'),
    account_ref: z.string(),
  }),
]);
export type Beneficiary = z.infer<typeof beneficiarySchema>;

// ───────────────────────────── Source ─────────────────────────────

export const sourceSchema = z.object({
  account_ref: z.string().optional(),
  amount: moneyAmountSchema,
});
export type Source = z.infer<typeof sourceSchema>;

// ───────────────────────────── Destination ─────────────────────────────

export const destinationSchema = z.object({
  currency: z.string().min(3).max(8),
  beneficiary: beneficiarySchema,
  /**
   * Optional fixed amount on the destination side (when source amount should
   * be derived via FX). Exactly one of source.amount or destination.amount
   * must be set when both source and destination currencies differ.
   */
  amount: moneyAmountSchema.optional(),
});
export type Destination = z.infer<typeof destinationSchema>;

// ───────────────────────────── Constraints ─────────────────────────────

export const constraintsSchema = z
  .object({
    max_fee: moneyAmountSchema.optional(),
    max_slippage_bps: z.number().int().min(0).max(10_000).optional(),
    deadline_at: z.string().datetime({ offset: true }).optional(),
    preferred_rails: z
      .array(z.enum(['BASE', 'XRPL', 'INTERNAL', 'FIAT', 'ESCROW']))
      .optional(),
    excluded_rails: z
      .array(z.enum(['BASE', 'XRPL', 'INTERNAL', 'FIAT', 'ESCROW']))
      .optional(),
    require_compliance_tier: z.enum(['TIER_1', 'TIER_2', 'TIER_3']).optional(),
    /** SWAP execution path: treasury ledger FX (default) or on-chain DEX on Base. */
    swap_execution: z.enum(['ledger', 'onchain']).optional(),
    /** When present, routing may select the on-chain escrow rail (ADR-0014). */
    escrow_condition: z
      .object({
        type: z.enum(['DELIVERY', 'MILESTONE', 'TIMELOCK', 'CUSTOM']),
        deadline_at: z.string().datetime({ offset: true }).optional(),
        description: z.string().max(500).optional(),
      })
      .optional(),
  })
  .strict();
export type Constraints = z.infer<typeof constraintsSchema>;

// ───────────────────────────── Context ─────────────────────────────

export const contextSchema = z
  .object({
    channel: z
      .enum(['WHATSAPP', 'VOICE', 'WEB', 'API', 'AGENT', 'INTERNAL'])
      .default('API'),
    locale: z.string().optional(),
    trace_id: z.string().optional(),
    correlation_id: z.string().optional(),
    user_agent: z.string().optional(),
    ip_address: z.string().optional(),
  })
  .passthrough(); // forward-compat: unknown context fields are kept verbatim
export type Context = z.infer<typeof contextSchema>;

// ───────────────────────────── Intent ─────────────────────────────

export const intentKindSchema = z.enum([
  'TRANSFER',
  'SWAP',
  'PAYOUT',
  'INVOICE',
  'PAYROLL',
  'AGENT_PAY',
  'TOPUP',
]);
export type IntentKind = z.infer<typeof intentKindSchema>;

// ───────────────────────────── Payroll (PAYROLL kind) ─────────────────────────────

export const payrollLineItemSchema = z
  .object({
    line_id: z
      .string()
      .min(1)
      .max(64)
      .regex(/^[a-zA-Z0-9_-]+$/, 'line_id must be alphanumeric (with _ or -)'),
    amount: moneyAmountSchema,
    beneficiary: beneficiarySchema,
    label: z.string().min(1).max(120).optional(),
    employee_ref: z.string().min(1).max(64).optional(),
  })
  .strict();

export type PayrollLineItem = z.infer<typeof payrollLineItemSchema>;

export const payrollBatchSchema = z
  .object({
    batch_id: prefixedIdSchema('prl'),
    name: z.string().min(1).max(200).optional(),
    pay_period: z.string().max(64).optional(),
    items: z.array(payrollLineItemSchema).min(1).max(500),
  })
  .strict();

export type PayrollBatch = z.infer<typeof payrollBatchSchema>;

export class PayrollValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PayrollValidationError';
  }
}

export function parsePayrollBatch(metadata: unknown): PayrollBatch {
  if (!metadata || typeof metadata !== 'object' || !('payroll' in metadata)) {
    throw new PayrollValidationError('PAYROLL intent requires metadata.payroll');
  }
  const parsed = payrollBatchSchema.safeParse((metadata as { payroll: unknown }).payroll);
  if (!parsed.success) {
    throw new PayrollValidationError(
      parsed.error.issues[0]?.message ?? 'Invalid payroll batch metadata',
    );
  }
  return parsed.data;
}

export function assertPayrollTotals(
  intent: { source: { amount: MoneyAmount } },
  batch: PayrollBatch,
): void {
  const sourceCurrency = intent.source.amount.currency;
  let totalMinor = 0n;

  for (const item of batch.items) {
    if (item.amount.currency !== sourceCurrency) {
      throw new PayrollValidationError(
        `Payroll line ${item.line_id} currency ${item.amount.currency} must match source ${sourceCurrency}`,
      );
    }
    totalMinor += BigInt(item.amount.amount_minor);
  }

  const sourceMinor = BigInt(intent.source.amount.amount_minor);
  if (totalMinor !== sourceMinor) {
    throw new PayrollValidationError(
      `Payroll line totals (${totalMinor}) must equal source.amount (${sourceMinor})`,
    );
  }
}

export const intentSchema = z
  .object({
    version: z.literal(INTENT_SCHEMA_VERSION),
    intent_id: prefixedIdSchema('itn'),
    kind: intentKindSchema,
    actor: actorSchema,
    source: sourceSchema,
    destination: destinationSchema,
    constraints: constraintsSchema.optional(),
    context: contextSchema.optional(),
    /** Free-form metadata never used for routing — for partner attribution etc. */
    metadata: z.record(z.string(), z.unknown()).optional(),
  })
  .strict()
  .superRefine((intent, ctx) => {
    if (intent.source.amount.currency !== intent.destination.currency) {
      const sourceSpecified = Boolean(intent.source.amount);
      const destinationSpecified = Boolean(intent.destination.amount);
      if (!sourceSpecified && !destinationSpecified) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'When currencies differ, exactly one of source.amount or destination.amount must be set',
          path: ['destination', 'amount'],
        });
      }
    }

    if (intent.kind === 'SWAP') {
      if (intent.source.amount.currency === intent.destination.currency) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'SWAP requires different source and destination currencies',
          path: ['kind'],
        });
      }

      const onchain = intent.constraints?.swap_execution === 'onchain';

      if (onchain) {
        if (intent.source.account_ref) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'On-chain DEX swap must not use source.account_ref — use metadata.source_wallet_id',
            path: ['source', 'account_ref'],
          });
        }
        const walletId = (intent.metadata as { source_wallet_id?: unknown } | undefined)?.source_wallet_id;
        if (typeof walletId !== 'string' || walletId.length < 8) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'On-chain DEX swap requires metadata.source_wallet_id (custodial BASE wallet)',
            path: ['metadata', 'source_wallet_id'],
          });
        }
        const ben = intent.destination.beneficiary;
        if (ben.kind !== 'WALLET' || ben.chain !== 'BASE') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'On-chain DEX swap destination must be a BASE wallet (output stays in custodial wallet)',
            path: ['destination', 'beneficiary'],
          });
        }
      } else {
        if (!intent.source.account_ref) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'SWAP requires source.account_ref (ledger account to debit)',
            path: ['source', 'account_ref'],
          });
        }
        if (intent.destination.beneficiary.kind !== 'INTERNAL_ACCOUNT') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'SWAP destination must be an INTERNAL_ACCOUNT beneficiary',
            path: ['destination', 'beneficiary'],
          });
        }
      }
    }

    if (
      intent.kind === 'TRANSFER' &&
      intent.source.amount.currency !== intent.destination.currency
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'Cross-currency movement requires intent kind SWAP (treasury FX conversion)',
        path: ['kind'],
      });
    }

    if (intent.kind === 'TOPUP') {
      if (intent.source.account_ref) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'TOPUP source must be external — omit source.account_ref',
          path: ['source', 'account_ref'],
        });
      }
      if (intent.source.amount.currency !== intent.destination.currency) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'TOPUP source and destination currencies must match',
          path: ['destination', 'currency'],
        });
      }
      if (intent.destination.beneficiary.kind !== 'INTERNAL_ACCOUNT') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'TOPUP destination must be an INTERNAL_ACCOUNT to credit',
          path: ['destination', 'beneficiary'],
        });
      }
    }

    if (intent.kind === 'PAYROLL') {
      const payroll = (intent.metadata as { payroll?: unknown } | undefined)?.payroll;
      const parsed = payrollBatchSchema.safeParse(payroll);
      if (!parsed.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: parsed.error.issues[0]?.message ?? 'Invalid metadata.payroll',
          path: ['metadata', 'payroll'],
        });
        return;
      }
      try {
        assertPayrollTotals(intent, parsed.data);
      } catch (err) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: err instanceof Error ? err.message : 'Payroll total mismatch',
          path: ['metadata', 'payroll'],
        });
      }
    }
  });

export type Intent = z.infer<typeof intentSchema>;

export function buildPayrollLineIntent(
  base: Intent,
  line: PayrollLineItem,
  lineIntentId: string,
): Intent {
  return {
    version: base.version,
    intent_id: lineIntentId,
    kind: 'PAYOUT',
    actor: base.actor,
    source: {
      account_ref: base.source.account_ref,
      amount: line.amount,
    },
    destination: {
      currency: line.amount.currency,
      beneficiary: line.beneficiary,
    },
    constraints: base.constraints,
    context: base.context,
    metadata: {
      ...base.metadata,
      payroll_line_id: line.line_id,
      payroll_batch_id: (base.metadata?.payroll as PayrollBatch | undefined)?.batch_id,
      payroll_label: line.label,
      employee_ref: line.employee_ref,
      parent_intent_id: base.intent_id,
    },
  };
}

export function validatePayrollIntent(intent: Intent): PayrollBatch {
  if (intent.kind !== 'PAYROLL') {
    throw new PayrollValidationError('Intent kind must be PAYROLL');
  }
  const batch = parsePayrollBatch(intent.metadata);
  assertPayrollTotals(intent, batch);
  return batch;
}

// ───────────────────────────── Parsing helpers ─────────────────────────────

export function parseIntent(input: unknown): Intent {
  return intentSchema.parse(input);
}

export function safeParseIntent(input: unknown) {
  return intentSchema.safeParse(input);
}
