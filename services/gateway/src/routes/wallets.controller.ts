import { Controller, Get, Inject, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WalletClient } from '@salychain/sdk-internal';
import { RequireScopes, ScopeGuard } from '../auth/scope.guard.js';
import type { AuthenticatedRequest } from '../auth/auth.types.js';
import { WALLET_CLIENT } from '../auth/s4-clients.module.js';
import { AgentsClient } from '@salychain/sdk-internal';
import { AGENTS_CLIENT } from '../auth/s4-clients.module.js';
import { AuthorizationError } from '@salychain/errors';

@ApiTags('wallets')
@Controller('wallets')
@UseGuards(ScopeGuard)
export class WalletsController {
  constructor(
    @Inject(WALLET_CLIENT) private readonly wallet: WalletClient,
    @Inject(AGENTS_CLIENT) private readonly agents: AgentsClient,
  ) {}

  @Get()
  @RequireScopes('wallets:read')
  @ApiOperation({ summary: 'List wallets for an agent or owner' })
  async list(
    @Req() req: AuthenticatedRequest,
    @Query('agent_id') agentId?: string,
    @Query('owner_id') ownerId?: string,
  ) {
    const actorRef = agentId ?? ownerId ?? (req.auth?.auth_mode === 'jwt' ? req.auth.user_id : undefined);
    if (!actorRef) {
      return { data: [] };
    }
    if (agentId && req.auth?.auth_mode === 'jwt') {
      const agent = await this.agents.getById(agentId);
      if (agent.owner_id !== req.auth.user_id) {
        throw AuthorizationError('gateway.wallet.forbidden', 'Agent not owned by caller');
      }
    }
    return this.wallet.listWalletsByActor({ actorRef });
  }

  @Get(':id/policy')
  @RequireScopes('wallets:read')
  getPolicy(@Param('id') id: string) {
    return this.wallet.getPolicy(id);
  }
}
