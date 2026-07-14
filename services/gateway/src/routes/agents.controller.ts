import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsIn,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { AgentsClient } from '@salychain/sdk-internal';
import { AuthorizationError } from '@salychain/errors';
import { RequireScopes, ScopeGuard } from '../auth/scope.guard.js';
import type { AuthenticatedRequest } from '../auth/auth.types.js';
import { AGENTS_CLIENT } from '../auth/s4-clients.module.js';

class CreateAgentBody {
  @IsString() @Length(1, 128) owner_id!: string;
  @IsIn(['USER', 'BUSINESS']) owner_kind!: 'USER' | 'BUSINESS';
  @IsOptional() @IsString() @Length(1, 128) org_id?: string;
  @IsString() @Length(1, 200) name!: string;
  @IsOptional() @IsObject() metadata?: Record<string, unknown>;
  @IsOptional() @IsArray() @ArrayMaxSize(8) @IsEnum(['BASE', 'XRPL'], { each: true })
  provision_chains?: Array<'BASE' | 'XRPL'>;
}

class UpdatePolicyBody {
  @IsOptional() @IsString() per_tx_cap_minor?: string;
  @IsOptional() @IsString() daily_cap_minor?: string;
  @IsOptional() @IsString() monthly_cap_minor?: string;
  @IsOptional() @IsArray() @ArrayMaxSize(256) @IsString({ each: true }) destination_allowlist?: string[];
  @IsOptional() @IsString() approval_threshold_minor?: string;
  @IsOptional() @IsInt() @Min(0) required_approvers?: number;
  @IsOptional() @IsString() @Length(3, 8) currency?: string;
}

@ApiTags('agents')
@Controller('agents')
@UseGuards(ScopeGuard)
export class AgentsController {
  constructor(@Inject(AGENTS_CLIENT) private readonly agents: AgentsClient) {}

  @Post()
  @HttpCode(201)
  @RequireScopes('agents:write')
  @ApiOperation({ summary: 'Register an AI agent' })
  create(@Req() req: AuthenticatedRequest, @Body() body: CreateAgentBody) {
    this.assertOwnerAccess(req, body.owner_id);
    return this.agents.create({
      ownerId: body.owner_id,
      ownerKind: body.owner_kind,
      orgId: body.org_id ?? req.auth?.org_id,
      name: body.name,
      metadata: body.metadata,
      provisionChains: body.provision_chains,
    });
  }

  @Get()
  @RequireScopes('agents:read')
  list(
    @Req() req: AuthenticatedRequest,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('owner_id') ownerId?: string,
  ) {
    if (req.auth?.auth_mode === 'jwt') {
      return this.agents.list({ ownerId: req.auth.user_id, limit });
    }
    return this.agents.list({ orgId: req.auth?.org_id, ownerId, limit });
  }

  @Get(':id')
  @RequireScopes('agents:read')
  async byId(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const agent = await this.agents.getById(id);
    this.assertAgentAccess(req, agent.owner_id, id);
    return agent;
  }

  @Get(':id/policy')
  @RequireScopes('agents:read')
  async getPolicy(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const agent = await this.agents.getById(id);
    this.assertAgentAccess(req, agent.owner_id, id);
    return this.agents.getPolicy(id);
  }

  @Patch(':id/policy')
  @RequireScopes('agents:write')
  async updatePolicy(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: UpdatePolicyBody) {
    const agent = await this.agents.getById(id);
    this.assertAgentAccess(req, agent.owner_id, id);
    return this.agents.updatePolicy(id, {
      perTxCapMinor: body.per_tx_cap_minor,
      dailyCapMinor: body.daily_cap_minor,
      monthlyCapMinor: body.monthly_cap_minor,
      destinationAllowlist: body.destination_allowlist,
      approvalThresholdMinor: body.approval_threshold_minor,
      requiredApprovers: body.required_approvers,
      currency: body.currency,
    });
  }

  @Get(':id/reasoning-logs')
  @RequireScopes('agents:read')
  async reasoningLogs(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
  ) {
    const agent = await this.agents.getById(id);
    this.assertAgentAccess(req, agent.owner_id, id);
    return this.agents.listReasoningLogs(id, limit);
  }

  private assertOwnerAccess(req: AuthenticatedRequest, ownerId: string) {
    if (req.auth?.auth_mode === 'jwt' && req.auth.user_id !== ownerId) {
      throw AuthorizationError('gateway.agent.owner_forbidden', 'JWT subject cannot create agents for another user');
    }
  }

  private assertAgentAccess(req: AuthenticatedRequest, ownerId: string, agentId: string) {
    if (req.auth?.auth_mode === 'jwt') {
      if (req.auth.user_id !== ownerId) {
        throw AuthorizationError('gateway.agent.forbidden', 'Agent not delegated to this user');
      }
      if (req.auth.agent_ids && !req.auth.agent_ids.includes(agentId)) {
        throw AuthorizationError('gateway.agent.not_delegated', `No delegation for agent ${agentId}`);
      }
    }
  }
}
