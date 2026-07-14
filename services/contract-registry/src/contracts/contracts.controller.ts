import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { ContractsService } from './contracts.service.js';

class StatusProposalDto {
  @IsIn(['pause', 'resume'])
  action!: 'pause' | 'resume';

  @IsOptional()
  @IsString()
  actor_ref?: string;
}

@ApiTags('contracts')
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contracts: ContractsService) {}

  @Get()
  @ApiOperation({ summary: 'List deployed contracts' })
  list() {
    return this.contracts.list();
  }

  @Get('upgrades')
  @ApiOperation({ summary: 'List contract upgrade history' })
  listUpgrades() {
    return this.contracts.listUpgrades();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get contract by id' })
  getById(@Param('id') id: string) {
    return this.contracts.getById(id);
  }

  @Post(':id/status-proposal')
  @ApiOperation({ summary: 'Submit pause/resume proposal (on-chain when configured, else DB-only)' })
  proposeStatus(@Param('id') id: string, @Body() body: StatusProposalDto) {
    return this.contracts.proposeStatus(id, body.action, body.actor_ref);
  }
}
