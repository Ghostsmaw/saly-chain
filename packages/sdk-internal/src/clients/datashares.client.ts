import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export type DatashareStatus = 'ACTIVE' | 'PAUSED';
export type DatashareDestination = 'S3' | 'SNOWFLAKE' | 'BIGQUERY' | 'DATABRICKS';
export type DatashareFormat = 'CSV' | 'JSON' | 'PARQUET';
export type ShareRunStatus = 'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED';
export type RunTrigger = 'MANUAL' | 'SCHEDULE';

/** Access/redaction policy attached to a datashare (see the datashares service). */
export interface AccessPolicy {
  columns?: Record<
    string,
    { action: 'allow' | 'drop' | 'null' | 'mask' | 'hash'; keepLast?: number; maskChar?: string }
  >;
  defaults?: { pii?: string; address?: string };
  rowFilters?: Array<{ column: string; op: string; value: unknown }>;
  maxRows?: number;
}

export interface PublicDatashare {
  id: string;
  org_id: string;
  name: string;
  description?: string;
  status: DatashareStatus;
  dataset_id: string;
  params: Record<string, unknown>;
  policy: AccessPolicy;
  destination: DatashareDestination;
  destination_config: Record<string, unknown>;
  format: DatashareFormat;
  schedule?: string;
  run_count: string;
  last_run_at?: string;
  last_success_at?: string;
  last_run_status?: ShareRunStatus;
  last_row_count?: number;
  created_at: string;
  updated_at: string;
}

export interface PublicShareRun {
  id: string;
  share_id: string;
  status: ShareRunStatus;
  trigger: RunTrigger;
  row_count: number | null;
  byte_count: number | null;
  location: string | null;
  format: DatashareFormat;
  duration_ms: number | null;
  error: string | null;
  started_at: string | null;
  finished_at: string | null;
  created_at: string;
}

export interface DatasetColumn {
  name: string;
  type: 'string' | 'number' | 'date';
  class: 'NONE' | 'ADDRESS' | 'PII';
}

export interface DatasetCatalogEntry {
  id: string;
  title: string;
  description: string;
  columns: DatasetColumn[];
}

export interface CreateDatashareInput {
  orgId: string;
  name: string;
  datasetId: string;
  params?: Record<string, unknown>;
  policy?: AccessPolicy;
  destination?: DatashareDestination;
  destinationConfig?: Record<string, unknown>;
  format?: DatashareFormat;
  description?: string;
  schedule?: string;
}

/** Typed client for the Saly Datashares service (governed dataset delivery). */
export class DatasharesClient {
  private readonly http: HttpClient;
  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({
      baseUrl: opts.baseUrl,
      serviceName: 'analytics-datashares',
      logger: opts.logger,
    });
  }

  listDatasets(options?: RequestOptions): Promise<{ data: DatasetCatalogEntry[] }> {
    return this.http.get('/v1/datasets', options);
  }

  create(input: CreateDatashareInput, options?: RequestOptions): Promise<PublicDatashare> {
    return this.http.post(
      '/v1/datashares',
      {
        org_id: input.orgId,
        name: input.name,
        dataset_id: input.datasetId,
        params: input.params,
        policy: input.policy,
        destination: input.destination,
        destination_config: input.destinationConfig,
        format: input.format,
        description: input.description,
        schedule: input.schedule,
      },
      options,
    );
  }

  list(orgId: string, options?: RequestOptions): Promise<{ data: PublicDatashare[] }> {
    return this.http.get('/v1/datashares', { ...options, query: { org_id: orgId } });
  }

  getById(id: string, options?: RequestOptions): Promise<PublicDatashare> {
    return this.http.get(`/v1/datashares/${encodeURIComponent(id)}`, options);
  }

  setStatus(
    id: string,
    status: DatashareStatus,
    options?: RequestOptions,
  ): Promise<PublicDatashare> {
    return this.http.post(`/v1/datashares/${encodeURIComponent(id)}/status`, { status }, options);
  }

  run(id: string, options?: RequestOptions): Promise<PublicShareRun> {
    return this.http.post(`/v1/datashares/${encodeURIComponent(id)}/run`, {}, options);
  }

  listRuns(
    id: string,
    query: { limit?: number } = {},
    options?: RequestOptions,
  ): Promise<{ data: PublicShareRun[] }> {
    return this.http.get(`/v1/datashares/${encodeURIComponent(id)}/runs`, { ...options, query });
  }

  delete(id: string, options?: RequestOptions): Promise<void> {
    return this.http.delete(`/v1/datashares/${encodeURIComponent(id)}`, options);
  }
}
