import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContractRegistryClient } from '@salychain/sdk-internal';
import { createLogger } from '@salychain/logger';
import { loadEnv } from '@salychain/config';
import { gatewayEnvSchema } from '../config/env.js';

const env = loadEnv(gatewayEnvSchema);
const registry = new ContractRegistryClient({
  baseUrl: env.CONTRACT_REGISTRY_BASE_URL,
  logger: createLogger({ service: 'gateway.registry' }),
});

@ApiTags('registry')
@Controller('registry')
export class RegistryController {
  @Get('contracts')
  @ApiOperation({ summary: 'List deployed contracts (read-only)' })
  listContracts() {
    return registry.listContracts();
  }

  @Get('governance/deployments')
  @ApiOperation({ summary: 'List on-chain governance deployments' })
  async listGovernance() {
    const res = await fetch(`${env.CONTRACT_REGISTRY_BASE_URL}/v1/governance/deployments`);
    return res.json();
  }

  @Get('attestations/verify/:id')
  @ApiOperation({ summary: 'Verify attestation on L3 (read-only)' })
  async verifyAttestation(@Param('id') id: string) {
    const res = await fetch(
      `${env.CONTRACT_REGISTRY_BASE_URL}/v1/attestations/verify/${encodeURIComponent(id)}`,
    );
    return res.json();
  }
}
