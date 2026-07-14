import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AgentsService } from './agents.service.js';
import {
  AuthorizeSpendDto,
  CreateAgentDto,
  CreateReasoningLogDto,
  UpdateAgentStatusDto,
  UpdateSpendingPolicyDto,
  VoteSpendApprovalDto,
} from './dto.js';

@ApiTags('agents')
@Controller('agents')
export class AgentsController {
  constructor(private readonly agents: AgentsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Register a new AI agent and provision custodial wallets' })
  create(@Body() dto: CreateAgentDto) {
    return this.agents.create({
      ownerId: dto.owner_id,
      ownerKind: dto.owner_kind,
      orgId: dto.org_id,
      name: dto.name,
      metadata: dto.metadata,
      provisionChains: dto.provision_chains,
    });
  }

  @Get()
  @ApiOperation({ summary: 'List agents' })
  @ApiQuery({ name: 'owner_id', required: false })
  @ApiQuery({ name: 'org_id', required: false })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  list(
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('owner_id') ownerId?: string,
    @Query('org_id') orgId?: string,
  ) {
    return this.agents.list({ ownerId, orgId, limit }).then((data) => ({ data }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch an agent by id' })
  byId(@Param('id') id: string) {
    return this.agents.getById(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update agent status (ACTIVE / SUSPENDED / ARCHIVED)' })
  setStatus(@Param('id') id: string, @Body() dto: UpdateAgentStatusDto) {
    return this.agents.setStatus(id, dto.status);
  }

  @Get(':id/policy')
  @ApiOperation({ summary: 'Get spending policy for an agent' })
  getPolicy(@Param('id') id: string) {
    return this.agents.getPolicy(id);
  }

  @Patch(':id/policy')
  @ApiOperation({ summary: 'Update spending policy and sync to agent wallets' })
  updatePolicy(@Param('id') id: string, @Body() dto: UpdateSpendingPolicyDto) {
    return this.agents.updatePolicy(id, {
      perTxCapMinor: dto.per_tx_cap_minor,
      dailyCapMinor: dto.daily_cap_minor,
      monthlyCapMinor: dto.monthly_cap_minor,
      destinationAllowlist: dto.destination_allowlist,
      approvalThresholdMinor: dto.approval_threshold_minor,
      requiredApprovers: dto.required_approvers,
      currency: dto.currency,
    });
  }

  @Post(':id/authorize-spend')
  @HttpCode(200)
  @ApiOperation({ summary: 'Pre-flight spend authorization (internal / execution)' })
  authorizeSpend(@Param('id') id: string, @Body() dto: AuthorizeSpendDto) {
    return this.agents.authorizeSpend(id, {
      amountMinor: dto.amount_minor,
      destinationAddress: dto.destination_address,
      intentId: dto.intent_id,
    });
  }

  @Post(':id/reasoning-logs')
  @HttpCode(201)
  @ApiOperation({ summary: 'Record an AI reasoning log for audit / admin insights' })
  recordReasoning(@Param('id') id: string, @Body() dto: CreateReasoningLogDto) {
    return this.agents.recordReasoningLog(id, {
      summary: dto.summary,
      steps: dto.steps,
      intentId: dto.intent_id,
      traceId: dto.trace_id,
    });
  }

  @Get(':id/reasoning-logs')
  @ApiOperation({ summary: 'List reasoning logs for an agent' })
  listReasoning(
    @Param('id') id: string,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number,
  ) {
    return this.agents.listReasoningLogs(id, limit);
  }

  @Get(':id/spend-approvals/by-intent/:intentId')
  @ApiOperation({ summary: 'Lookup spend approval state for an intent (wallet signer gate)' })
  getSpendApprovalByIntent(@Param('id') id: string, @Param('intentId') intentId: string) {
    return this.agents.getSpendApprovalByIntent(id, intentId);
  }

  @Get(':id/spend-approvals')
  @ApiOperation({ summary: 'List spend approval requests for an agent' })
  listSpendApprovals(
    @Param('id') id: string,
    @Query('status') status?: 'PENDING' | 'APPROVED' | 'REJECTED',
  ) {
    return this.agents.listSpendApprovals(id, status);
  }

  @Post(':id/spend-approvals/:requestId/vote')
  @HttpCode(200)
  @ApiOperation({ summary: 'Record an approver vote on a pending spend request' })
  voteSpendApproval(
    @Param('id') id: string,
    @Param('requestId') requestId: string,
    @Body() dto: VoteSpendApprovalDto,
  ) {
    return this.agents.voteSpendApproval(id, requestId, dto.approver_id);
  }
}
