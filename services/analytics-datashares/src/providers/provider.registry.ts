import { Inject, Injectable } from '@nestjs/common';
import { ValidationError } from '@salychain/errors';
import { DATASHARES_ENV, type DatasharesEnv } from '../config/env.js';
import type { DatashareDestination } from '../generated/prisma/index.js';
import type { ShareProvider } from './provider.js';
import { S3ShareProvider } from './s3.provider.js';
import { WAREHOUSE_CONFIG_SCHEMAS, WarehouseShareProvider } from './warehouse.provider.js';

@Injectable()
export class ProviderRegistry {
  private readonly providers = new Map<DatashareDestination, ShareProvider>();

  constructor(@Inject(DATASHARES_ENV) env: DatasharesEnv, s3: S3ShareProvider) {
    this.providers.set('S3', s3);
    this.providers.set(
      'SNOWFLAKE',
      new WarehouseShareProvider(
        'SNOWFLAKE',
        env.DATASHARES_SNOWFLAKE_ENABLED,
        WAREHOUSE_CONFIG_SCHEMAS.SNOWFLAKE!,
      ),
    );
    this.providers.set(
      'BIGQUERY',
      new WarehouseShareProvider(
        'BIGQUERY',
        env.DATASHARES_BIGQUERY_ENABLED,
        WAREHOUSE_CONFIG_SCHEMAS.BIGQUERY!,
      ),
    );
    this.providers.set(
      'DATABRICKS',
      new WarehouseShareProvider(
        'DATABRICKS',
        env.DATASHARES_DATABRICKS_ENABLED,
        WAREHOUSE_CONFIG_SCHEMAS.DATABRICKS!,
      ),
    );
  }

  get(destination: DatashareDestination): ShareProvider {
    const provider = this.providers.get(destination);
    if (!provider) {
      throw ValidationError(
        'datashares.destination.unknown',
        `Unknown destination: ${destination}`,
      );
    }
    return provider;
  }
}
