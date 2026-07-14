/**
 * SalyChain domain errors.
 *
 * Every error has a stable `code` (machine-readable, never reworded) and a
 * structured shape suitable for HTTP serialization, log aggregation, and
 * webhook payloads. Error codes are namespaced by service domain so triage
 * tooling can route them.
 *
 * Throwing untyped `Error` from a domain service is forbidden by lint rule.
 */

export type ErrorCategory =
  | 'VALIDATION'
  | 'AUTHENTICATION'
  | 'AUTHORIZATION'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMIT'
  | 'COMPLIANCE'
  | 'RISK'
  | 'INSUFFICIENT_FUNDS'
  | 'EXTERNAL'
  | 'INTERNAL';

export interface SalyChainErrorJson {
  readonly code: string;
  readonly message: string;
  readonly category: ErrorCategory;
  readonly http_status: number;
  readonly retryable: boolean;
  readonly correlation_id?: string;
  readonly details?: Record<string, unknown>;
}

export interface SalyChainErrorOptions {
  readonly message?: string;
  readonly details?: Record<string, unknown>;
  readonly cause?: unknown;
  readonly correlationId?: string;
}

export class SalyChainError extends Error {
  readonly code: string;
  readonly category: ErrorCategory;
  readonly httpStatus: number;
  readonly retryable: boolean;
  readonly details?: Record<string, unknown>;
  readonly correlationId?: string;

  constructor(
    code: string,
    category: ErrorCategory,
    httpStatus: number,
    retryable: boolean,
    message: string,
    options: SalyChainErrorOptions = {},
  ) {
    super(options.message ?? message, options.cause !== undefined ? { cause: options.cause } : {});
    this.name = 'SalyChainError';
    this.code = code;
    this.category = category;
    this.httpStatus = httpStatus;
    this.retryable = retryable;
    if (options.details !== undefined) this.details = options.details;
    if (options.correlationId !== undefined) this.correlationId = options.correlationId;
  }

  toJSON(): SalyChainErrorJson {
    return {
      code: this.code,
      message: this.message,
      category: this.category,
      http_status: this.httpStatus,
      retryable: this.retryable,
      ...(this.correlationId ? { correlation_id: this.correlationId } : {}),
      ...(this.details ? { details: this.details } : {}),
    };
  }
}

// ───────────────── Factory helpers — one per category ─────────────────

const make =
  (category: ErrorCategory, httpStatus: number, retryable: boolean) =>
  (code: string, message: string, options?: SalyChainErrorOptions) =>
    new SalyChainError(code, category, httpStatus, retryable, message, options);

export const ValidationError = make('VALIDATION', 400, false);
export const AuthenticationError = make('AUTHENTICATION', 401, false);
export const AuthorizationError = make('AUTHORIZATION', 403, false);
export const NotFoundError = make('NOT_FOUND', 404, false);
export const ConflictError = make('CONFLICT', 409, false);
export const RateLimitError = make('RATE_LIMIT', 429, true);
export const ComplianceError = make('COMPLIANCE', 451, false);
export const RiskError = make('RISK', 451, false);
export const InsufficientFundsError = make('INSUFFICIENT_FUNDS', 402, false);
export const ExternalError = make('EXTERNAL', 502, true);
export const InternalError = make('INTERNAL', 500, true);

// ───────────────── Canonical codes (extend as needed) ─────────────────
// Codes are namespaced: <domain>.<noun>.<reason>

export const ErrorCodes = {
  // ledger
  LEDGER_ENTRY_UNBALANCED: 'ledger.entry.unbalanced',
  LEDGER_IDEMPOTENCY_CONFLICT: 'ledger.entry.idempotency_conflict',
  LEDGER_ACCOUNT_NOT_FOUND: 'ledger.account.not_found',
  LEDGER_ACCOUNT_FROZEN: 'ledger.account.frozen',
  LEDGER_INSUFFICIENT_FUNDS: 'ledger.account.insufficient_funds',
  LEDGER_CURRENCY_MISMATCH: 'ledger.posting.currency_mismatch',

  // wallet
  WALLET_NOT_FOUND: 'wallet.not_found',
  WALLET_POLICY_DENIED: 'wallet.policy.denied',

  // signer
  SIGNER_POLICY_VIOLATION: 'signer.policy.violation',
  SIGNER_KMS_UNAVAILABLE: 'signer.kms.unavailable',

  // execution
  EXECUTION_TX_NOT_FOUND: 'execution.tx.not_found',
  EXECUTION_TX_INVALID_STATE: 'execution.tx.invalid_state',
  EXECUTION_TX_TIMEOUT: 'execution.tx.timeout',

  // routing
  ROUTING_NO_ROUTE: 'routing.no_route',
  ROUTING_RAIL_UNAVAILABLE: 'routing.rail.unavailable',

  // liquidity
  LIQUIDITY_INSUFFICIENT: 'liquidity.insufficient',
  LIQUIDITY_SLIPPAGE_EXCEEDED: 'liquidity.slippage_exceeded',

  // compliance / risk
  COMPLIANCE_KYC_REQUIRED: 'compliance.kyc.required',
  COMPLIANCE_SANCTIONS_HIT: 'compliance.sanctions.hit',
  RISK_VELOCITY_EXCEEDED: 'risk.velocity.exceeded',
  RISK_BLOCKED: 'risk.blocked',

  // generic
  VALIDATION_INVALID_INPUT: 'validation.invalid_input',
  AUTH_INVALID_CREDENTIALS: 'auth.invalid_credentials',
  AUTH_MISSING_SCOPE: 'auth.missing_scope',
  INTERNAL_UNEXPECTED: 'internal.unexpected',
} as const;
export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

export function isSalyChainError(value: unknown): value is SalyChainError {
  return value instanceof SalyChainError;
}
