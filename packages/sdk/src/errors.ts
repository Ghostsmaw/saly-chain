/**
 * SDK-level errors. These mirror the gateway's `{error: { code, message, … }}`
 * shape but are plain Error subclasses so callers can `instanceof`-check.
 */

export interface SalyApiErrorJson {
  code: string;
  message: string;
  category?: string;
  http_status?: number;
  retryable?: boolean;
  correlation_id?: string;
  details?: Record<string, unknown>;
}

export class SalyApiError extends Error {
  readonly code: string;
  readonly httpStatus: number;
  readonly retryable: boolean;
  readonly correlationId?: string;
  readonly details?: Record<string, unknown>;
  readonly category?: string;

  constructor(json: SalyApiErrorJson, httpStatus: number) {
    super(json.message);
    this.name = 'SalyApiError';
    this.code = json.code;
    this.httpStatus = json.http_status ?? httpStatus;
    this.retryable = json.retryable ?? false;
    if (json.correlation_id) this.correlationId = json.correlation_id;
    if (json.category) this.category = json.category;
    if (json.details) this.details = json.details;
  }

  toJSON(): SalyApiErrorJson {
    return {
      code: this.code,
      message: this.message,
      http_status: this.httpStatus,
      retryable: this.retryable,
      ...(this.category ? { category: this.category } : {}),
      ...(this.correlationId ? { correlation_id: this.correlationId } : {}),
      ...(this.details ? { details: this.details } : {}),
    };
  }
}

export class SalyNetworkError extends Error {
  constructor(
    message: string,
    override readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'SalyNetworkError';
  }
}
