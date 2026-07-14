import pino, { stdSerializers, type Logger as PinoLogger, type LoggerOptions } from 'pino';
import pinoPretty from 'pino-pretty';

/**
 * SalyChain structured logger.
 *
 *  - JSON output in non-dev environments for machine ingestion (Loki/Datadog).
 *  - Pretty output in dev for human reading.
 *  - Every log line carries `service`, `env`, `trace_id`, `correlation_id`
 *    when available; downstream OTEL collectors enrich further.
 *  - Sensitive keys are redacted by default.
 */

export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';

export interface CreateLoggerOptions {
  readonly service: string;
  readonly env?: string;
  readonly level?: LogLevel;
  readonly pretty?: boolean;
  readonly extraRedactPaths?: readonly string[];
}

const DEFAULT_REDACT = [
  'req.headers.authorization',
  'req.headers.cookie',
  'req.headers["x-api-key"]',
  'res.headers["set-cookie"]',
  '*.password',
  '*.privateKey',
  '*.private_key',
  '*.secret',
  '*.token',
  '*.refresh_token',
  '*.access_token',
  '*.api_key',
  '*.apiKey',
  '*.pan',
  '*.card_number',
];

export function createLogger(options: CreateLoggerOptions): Logger {
  const env = options.env ?? process.env.NODE_ENV ?? 'development';
  const level = options.level ?? (process.env.LOG_LEVEL as LogLevel | undefined) ?? 'info';
  const pretty = options.pretty ?? env === 'development';

  const pinoOptions: LoggerOptions = {
    level,
    base: { service: options.service, env, pid: process.pid },
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
      paths: [...DEFAULT_REDACT, ...(options.extraRedactPaths ?? [])],
      censor: '[REDACTED]',
    },
    formatters: {
      level: (label) => ({ level: label }),
    },
    serializers: {
      err: stdSerializers.err,
      error: stdSerializers.err,
    },
  };

  const logger = pretty
    ? pino(
        pinoOptions,
        pinoPretty({
          colorize: true,
          translateTime: 'SYS:HH:MM:ss.l',
          ignore: 'pid,hostname,service,env',
          messageFormat: '{service} | {msg}',
        }),
      )
    : pino(pinoOptions);

  return new Logger(logger);
}

/**
 * Thin wrapper around pino that returns a typed child on `with()`.
 * Avoids passing pino instances around the codebase directly.
 */
export class Logger {
  constructor(private readonly inner: PinoLogger) {}

  with(context: Record<string, unknown>): Logger {
    return new Logger(this.inner.child(context));
  }

  fatal(msg: string, context?: Record<string, unknown>): void {
    this.inner.fatal(context ?? {}, msg);
  }

  error(msg: string, context?: Record<string, unknown>): void {
    this.inner.error(context ?? {}, msg);
  }

  warn(msg: string, context?: Record<string, unknown>): void {
    this.inner.warn(context ?? {}, msg);
  }

  info(msg: string, context?: Record<string, unknown>): void {
    this.inner.info(context ?? {}, msg);
  }

  debug(msg: string, context?: Record<string, unknown>): void {
    this.inner.debug(context ?? {}, msg);
  }

  trace(msg: string, context?: Record<string, unknown>): void {
    this.inner.trace(context ?? {}, msg);
  }
}
