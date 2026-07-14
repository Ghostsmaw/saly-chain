import { createHmac } from 'node:crypto';
import { z } from 'zod';
import type { ColumnSpec } from '../datasets/named-datasets.js';

/**
 * Per-column transform applied at export time.
 *   allow — emit the raw value.
 *   drop  — remove the column entirely from the output.
 *   null  — keep the column but null every value.
 *   mask  — keep the last N chars, replace the rest with a mask char.
 *   hash  — deterministic HMAC-SHA256 pseudonym (stable across runs, unlinkable
 *           without the secret). Ideal for joinable-but-private identifiers.
 */
export const ACTIONS = ['allow', 'drop', 'null', 'mask', 'hash'] as const;
export type Action = (typeof ACTIONS)[number];

export const ROW_FILTER_OPS = ['eq', 'neq', 'in', 'nin', 'gt', 'gte', 'lt', 'lte'] as const;
export type RowFilterOp = (typeof ROW_FILTER_OPS)[number];

const columnRuleSchema = z.object({
  action: z.enum(ACTIONS),
  /** mask only: number of trailing chars to preserve (default 4). */
  keepLast: z.coerce.number().int().min(0).max(64).optional(),
  /** mask only: fill character (default '*'). */
  maskChar: z.string().length(1).optional(),
});
export type ColumnRule = z.infer<typeof columnRuleSchema>;

const scalar = z.union([z.string(), z.number(), z.boolean()]);

const rowFilterSchema = z
  .object({
    column: z.string().min(1).max(128),
    op: z.enum(ROW_FILTER_OPS),
    value: z.union([scalar, z.array(scalar)]),
  })
  .superRefine((f, ctx) => {
    const isSetOp = f.op === 'in' || f.op === 'nin';
    if (isSetOp && !Array.isArray(f.value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `op '${f.op}' requires an array value`,
      });
    }
    if (!isSetOp && Array.isArray(f.value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `op '${f.op}' requires a scalar value`,
      });
    }
  });
export type RowFilter = z.infer<typeof rowFilterSchema>;

/**
 * The governance contract attached to a datashare. Only columns declared by the
 * dataset can ever be emitted; this policy decides how each is treated and which
 * rows survive. Anything not explicitly allowed for a PII/ADDRESS column is
 * redacted by default (fail-closed).
 */
export const accessPolicySchema = z.object({
  /** Per-column overrides keyed by column name. */
  columns: z.record(z.string(), columnRuleSchema).optional(),
  /** Class-level defaults applied when a column has no explicit rule. */
  defaults: z
    .object({
      pii: z.enum(ACTIONS).optional(),
      address: z.enum(ACTIONS).optional(),
    })
    .optional(),
  /** Post-query row filters (AND-ed). Evaluated against raw values. */
  rowFilters: z.array(rowFilterSchema).max(50).optional(),
  /** Hard cap on emitted rows (in addition to the dataset/global cap). */
  maxRows: z.coerce.number().int().min(0).optional(),
});
export type AccessPolicy = z.infer<typeof accessPolicySchema>;

export function parseAccessPolicy(input: unknown): AccessPolicy {
  return accessPolicySchema.parse(input ?? {});
}

/** Fail-closed default action for a column given its classification. */
export function resolveAction(col: ColumnSpec, policy: AccessPolicy): Action {
  const explicit = policy.columns?.[col.name];
  if (explicit) return explicit.action;
  if (col.class === 'PII') return policy.defaults?.pii ?? 'drop';
  if (col.class === 'ADDRESS') return policy.defaults?.address ?? 'hash';
  return 'allow';
}

export interface EmittedColumn {
  name: string;
  type: ColumnSpec['type'];
  class: ColumnSpec['class'];
  action: Action;
}

export interface ApplyPolicyResult {
  rows: Array<Record<string, unknown>>;
  /** Declared columns that survive (i.e. not dropped), in declaration order. */
  columns: EmittedColumn[];
  /** Names of columns dropped by the policy. */
  droppedColumns: string[];
  /** Rows removed by row filters. */
  filteredOut: number;
}

export interface ApplyPolicyOptions {
  /** HMAC key for `hash` actions. Required if any column resolves to `hash`. */
  hmacKey: string;
  /** Absolute ceiling on emitted rows (e.g. the global SHARE_RUN_MAX_ROWS). */
  maxRows?: number;
}

/**
 * Apply an access policy to query rows. Pure and deterministic.
 *
 * Governance guarantees:
 *  - Only columns declared by the dataset are ever emitted (allowlist).
 *  - PII/ADDRESS columns are redacted unless explicitly allowed (fail-closed).
 *  - Row filters are evaluated against the *raw* values (so you can filter on a
 *    column you then drop), before any masking/hashing.
 */
export function applyPolicy(
  rawRows: Array<Record<string, unknown>>,
  columns: readonly ColumnSpec[],
  policy: AccessPolicy,
  opts: ApplyPolicyOptions,
): ApplyPolicyResult {
  const actions = new Map<string, Action>();
  for (const col of columns) actions.set(col.name, resolveAction(col, policy));

  const emitted: EmittedColumn[] = [];
  const dropped: string[] = [];
  for (const col of columns) {
    const action = actions.get(col.name)!;
    if (action === 'drop') {
      dropped.push(col.name);
    } else {
      emitted.push({ name: col.name, type: col.type, class: col.class, action });
    }
  }

  const filters = policy.rowFilters ?? [];
  let filteredOut = 0;
  const out: Array<Record<string, unknown>> = [];

  const cap = effectiveCap(policy.maxRows, opts.maxRows);

  for (const raw of rawRows) {
    if (!rowMatchesAll(raw, filters)) {
      filteredOut += 1;
      continue;
    }
    if (out.length >= cap) break;
    const row: Record<string, unknown> = {};
    for (const col of emitted) {
      row[col.name] = transform(
        raw[col.name],
        col.action,
        policy.columns?.[col.name],
        opts.hmacKey,
      );
    }
    out.push(row);
  }

  return { rows: out, columns: emitted, droppedColumns: dropped, filteredOut };
}

function effectiveCap(policyMax: number | undefined, globalMax: number | undefined): number {
  const candidates = [policyMax, globalMax].filter(
    (n): n is number => typeof n === 'number' && n >= 0,
  );
  return candidates.length ? Math.min(...candidates) : Number.POSITIVE_INFINITY;
}

function transform(
  value: unknown,
  action: Action,
  rule: ColumnRule | undefined,
  hmacKey: string,
): unknown {
  if (action === 'allow') return value ?? null;
  if (action === 'null') return null;
  if (value === null || value === undefined || value === '') return null;
  const str = String(value);
  if (action === 'mask') return maskValue(str, rule?.keepLast ?? 4, rule?.maskChar ?? '*');
  if (action === 'hash') return hashValue(hmacKey, str);
  return null; // unreachable (drop handled upstream)
}

export function maskValue(value: string, keepLast: number, maskChar: string): string {
  if (keepLast <= 0) return maskChar.repeat(value.length);
  if (value.length <= keepLast) return value;
  return maskChar.repeat(value.length - keepLast) + value.slice(value.length - keepLast);
}

export function hashValue(hmacKey: string, value: string): string {
  return createHmac('sha256', hmacKey).update(value).digest('hex');
}

function rowMatchesAll(row: Record<string, unknown>, filters: RowFilter[]): boolean {
  for (const f of filters) {
    if (!matchFilter(row[f.column], f)) return false;
  }
  return true;
}

function matchFilter(value: unknown, f: RowFilter): boolean {
  switch (f.op) {
    case 'eq':
      return cmp(value, f.value as string | number | boolean) === 0;
    case 'neq':
      return cmp(value, f.value as string | number | boolean) !== 0;
    case 'in':
      return (f.value as Array<string | number | boolean>).some((v) => cmp(value, v) === 0);
    case 'nin':
      return !(f.value as Array<string | number | boolean>).some((v) => cmp(value, v) === 0);
    case 'gt':
      return cmp(value, f.value as string | number | boolean) > 0;
    case 'gte':
      return cmp(value, f.value as string | number | boolean) >= 0;
    case 'lt':
      return cmp(value, f.value as string | number | boolean) < 0;
    case 'lte':
      return cmp(value, f.value as string | number | boolean) <= 0;
    default:
      return false;
  }
}

/**
 * Compare a row value with a filter operand. Numeric when both sides parse as
 * finite numbers, otherwise lexicographic on their string forms. Returns -1/0/1,
 * or NaN when either side is null/undefined (so ordered comparisons fail safely).
 */
function cmp(a: unknown, b: string | number | boolean): number {
  if (a === null || a === undefined) return Number.NaN;
  const an = Number(a);
  const bn = Number(b);
  if (Number.isFinite(an) && Number.isFinite(bn) && typeof b !== 'boolean') {
    return an < bn ? -1 : an > bn ? 1 : 0;
  }
  const as = String(a);
  const bs = String(b);
  return as < bs ? -1 : as > bs ? 1 : 0;
}
