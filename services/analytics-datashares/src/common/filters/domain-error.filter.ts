import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { isSalyChainError, SalyChainError, InternalError, ErrorCodes } from '@salychain/errors';

@Catch()
export class DomainErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(DomainErrorFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const error = this.toDomainError(exception);
    const correlationId =
      (req.headers['x-correlation-id'] as string | undefined) ?? error.correlationId;
    if (error.httpStatus >= 500) {
      this.logger.error(
        `${error.code} ${error.message}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    } else {
      this.logger.warn(`${error.code} ${error.message}`);
    }
    res
      .status(error.httpStatus)
      .json({ error: { ...error.toJSON(), correlation_id: correlationId } });
  }

  private toDomainError(exception: unknown): SalyChainError {
    if (isSalyChainError(exception)) return exception;
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();
      const message =
        typeof response === 'string'
          ? response
          : (((response as { message?: string | string[] }).message as string) ??
            exception.message);
      return new SalyChainError(
        `http.${status}`,
        status >= 500 ? 'INTERNAL' : 'VALIDATION',
        status,
        false,
        Array.isArray(message) ? message.join('; ') : String(message),
      );
    }
    if (exception instanceof Error) {
      return InternalError(ErrorCodes.INTERNAL_UNEXPECTED, exception.message, { cause: exception });
    }
    return InternalError(ErrorCodes.INTERNAL_UNEXPECTED, 'Unknown error');
  }
}
