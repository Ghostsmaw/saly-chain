import { Inject, Injectable, Logger } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { z } from 'zod';
import { ValidationError } from '@salychain/errors';
import { DATASHARES_ENV, type DatasharesEnv } from '../config/env.js';
import type { ExportContext, ExportResult, ShareProvider } from './provider.js';

const s3ConfigSchema = z
  .object({
    bucket: z.string().min(1).max(255).optional(),
    /** Extra key prefix appended under the global export prefix. */
    prefix: z.string().max(512).optional(),
  })
  .strict();

/**
 * Writes governed extracts to an S3-compatible object store (AWS S3 / MinIO).
 * Layout: `{globalPrefix}/{prefix?}/org={org}/share={share}/run={run}/data.{ext}`.
 */
@Injectable()
export class S3ShareProvider implements ShareProvider {
  readonly destination = 'S3' as const;
  private readonly logger = new Logger(S3ShareProvider.name);
  private readonly s3: S3Client;

  constructor(@Inject(DATASHARES_ENV) private readonly env: DatasharesEnv) {
    this.s3 = new S3Client({
      region: env.S3_REGION,
      endpoint: env.S3_ENDPOINT,
      forcePathStyle: true,
      credentials: { accessKeyId: env.S3_ACCESS_KEY, secretAccessKey: env.S3_SECRET_KEY },
    });
  }

  validateConfig(config: unknown): void {
    const parsed = s3ConfigSchema.safeParse(config ?? {});
    if (!parsed.success) {
      throw ValidationError('datashares.s3.config_invalid', parsed.error.message);
    }
  }

  async export(ctx: ExportContext): Promise<ExportResult> {
    const cfg = s3ConfigSchema.parse(ctx.destinationConfig ?? {});
    const bucket = cfg.bucket ?? this.env.S3_BUCKET;
    const parts = [
      this.env.DATASHARES_EXPORT_PREFIX,
      cfg.prefix?.replace(/^\/+|\/+$/g, ''),
      `org=${ctx.orgId}`,
      `share=${ctx.shareId}`,
      `run=${ctx.runId}`,
      `data.${ctx.extension}`,
    ].filter(Boolean);
    const key = parts.join('/');

    await this.s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: ctx.body,
        ContentType: ctx.contentType,
        Metadata: {
          'saly-share-id': ctx.shareId,
          'saly-run-id': ctx.runId,
          'saly-row-count': String(ctx.rowCount),
        },
      }),
    );
    const location = `s3://${bucket}/${key}`;
    this.logger.log(`exported run=${ctx.runId} rows=${ctx.rowCount} → ${location}`);
    return { location };
  }
}
