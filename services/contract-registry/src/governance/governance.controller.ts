import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';
import { GovernanceService } from './governance.service.js';

class RegisterGovernanceDto {
  @IsString()
  id!: string;

  @IsString()
  network!: string;

  @IsString()
  token_address!: string;

  @IsString()
  timelock_address!: string;

  @IsString()
  governor_address!: string;

  @IsOptional()
  chain_id?: number;
}

class AccreditIssuerDto {
  @IsString()
  issuer_address!: string;

  @IsString()
  vertical!: string;

  @IsBoolean()
  accredited!: boolean;

  @IsOptional()
  @IsString()
  actor_ref?: string;
}

@ApiTags('governance')
@Controller('governance')
export class GovernanceController {
  constructor(private readonly governance: GovernanceService) {}

  @Get('deployments')
  @ApiOperation({ summary: 'List on-chain governance deployments' })
  listDeployments() {
    return this.governance.listDeployments();
  }

  @Post('deployments')
  @ApiOperation({ summary: 'Register a governance stack deployment' })
  registerDeployment(@Body() body: RegisterGovernanceDto) {
    return this.governance.registerDeployment(body);
  }

  @Get('proposals')
  @ApiOperation({ summary: 'List status proposals (pause/resume history)' })
  listProposals() {
    return this.governance.listProposals();
  }
}

@ApiTags('attestations')
@Controller('attestations')
export class AttestationsController {
  constructor(private readonly governance: GovernanceService) {}

  @Get('issuers')
  @ApiOperation({ summary: 'List attestation issuers tracked off-chain' })
  listIssuers() {
    return this.governance.listIssuers();
  }

  @Get('verify/:id')
  @ApiOperation({ summary: 'Verify attestation validity on-chain (read-only)' })
  verify(@Param('id') id: string) {
    return this.governance.verifyAttestation(id);
  }

  @Post('issuers/:registryContractId')
  @ApiOperation({ summary: 'Accredit or revoke an attestation issuer on-chain' })
  accreditIssuer(
    @Param('registryContractId') registryContractId: string,
    @Body() body: AccreditIssuerDto,
  ) {
    return this.governance.accreditIssuer(registryContractId, body);
  }
}
