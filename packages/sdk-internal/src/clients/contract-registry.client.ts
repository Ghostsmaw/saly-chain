import { HttpClient, type RequestOptions } from '../http.js';
import type { Logger } from '@salychain/logger';

export type ContractStatus = 'Active' | 'Paused' | 'Deprecated';

export interface DeployedContractDto {
  id: string;
  name: string;
  purpose: string;
  network: string;
  address: string;
  version: string;
  status: ContractStatus;
  tvl_usd: number;
  audited: boolean;
  deployed: string;
}

export interface ContractUpgradeDto {
  id: string;
  contract: string;
  from: string;
  to: string;
  when: string;
  by: string;
}

export interface StatusProposalResult {
  proposal_id: string;
  contract_id: string;
  action: 'pause' | 'resume';
  status: ContractStatus;
  message: string;
}

export class ContractRegistryClient {
  private readonly http: HttpClient;
  constructor(opts: { baseUrl: string; logger?: Logger }) {
    this.http = new HttpClient({ baseUrl: opts.baseUrl, serviceName: 'contract-registry', logger: opts.logger });
  }

  listContracts(options?: RequestOptions): Promise<{ data: DeployedContractDto[] }> {
    return this.http.get('/v1/contracts', options);
  }

  listUpgrades(options?: RequestOptions): Promise<{ data: ContractUpgradeDto[] }> {
    return this.http.get('/v1/contracts/upgrades', options);
  }

  getContract(id: string, options?: RequestOptions): Promise<DeployedContractDto> {
    return this.http.get(`/v1/contracts/${encodeURIComponent(id)}`, options);
  }

  proposeStatus(
    id: string,
    input: { action: 'pause' | 'resume'; actor_ref?: string },
    options?: RequestOptions,
  ): Promise<StatusProposalResult> {
    return this.http.post(`/v1/contracts/${encodeURIComponent(id)}/status-proposal`, input, options);
  }
}
