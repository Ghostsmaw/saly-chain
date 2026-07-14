import { Logger } from '@nestjs/common';
import { z } from 'zod';
import { ExternalError, ValidationError } from '@salychain/errors';
import type { DatashareDestination } from '../generated/prisma/index.js';
import type { ExportContext, ExportResult, ShareProvider } from './provider.js';

/**
 * Config shapes for the warehouse-native destinations. These are validated at
 * create-time so a misconfigured share is rejected early, but actual delivery
 * requires the corresponding vendor driver + credentials, which are NOT bundled
 * in this build. Until a driver is wired, these destinations are disabled by
 * feature flag and `export()` fails loudly. This mirrors the deliberate
 * feature-flag approach used for the Datastreams Kafka sink.
 */
export const WAREHOUSE_CONFIG_SCHEMAS: Record<string, z.ZodTypeAny> = {
  SNOWFLAKE: z
    .object({
      account: z.string().min(1),
      database: z.string().min(1),
      schema: z.string().min(1),
      share: z.string().min(1),
      role: z.string().min(1).optional(),
    })
    .strict(),
  BIGQUERY: z
    .object({
      project: z.string().min(1),
      dataset: z.string().min(1),
      listing: z.string().min(1).optional(),
      location: z.string().min(1).optional(),
    })
    .strict(),
  DATABRICKS: z
    .object({
      metastore: z.string().min(1),
      share: z.string().min(1),
      recipient: z.string().min(1).optional(),
    })
    .strict(),
};

export class WarehouseShareProvider implements ShareProvider {
  private readonly logger = new Logger(WarehouseShareProvider.name);

  constructor(
    readonly destination: DatashareDestination,
    private readonly enabled: boolean,
    private readonly schema: z.ZodTypeAny,
  ) {}

  validateConfig(config: unknown): void {
    if (!this.enabled) {
      throw ValidationError(
        'datashares.destination.disabled',
        `${this.destination} destination is not enabled on this deployment`,
      );
    }
    const parsed = this.schema.safeParse(config ?? {});
    if (!parsed.success) {
      throw ValidationError('datashares.destination.config_invalid', parsed.error.message);
    }
  }

  async export(_ctx: ExportContext): Promise<ExportResult> {
    // Reached only if the flag was enabled at create-time. Fail loudly rather
    // than silently dropping data — the vendor driver is required.
    this.logger.error(`${this.destination} export attempted without a bundled driver`);
    throw ExternalError(
      'datashares.destination.unimplemented',
      `${this.destination} share export requires the vendor driver, which is not bundled in this build`,
    );
  }
}
