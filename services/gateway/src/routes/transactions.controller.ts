import { Controller, DefaultValuePipe, Get, Inject, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExecutionClient, type TransactionState } from '@salychain/sdk-internal';
import { RequireScopes, ScopeGuard } from '../auth/scope.guard.js';
import { EXECUTION_CLIENT } from '../proxy/clients.module.js';

@ApiTags('transactions')
@Controller('transactions')
@UseGuards(ScopeGuard)
export class TransactionsController {
  constructor(@Inject(EXECUTION_CLIENT) private readonly execution: ExecutionClient) {}

  @Get()
  @RequireScopes('transactions:read')
  @ApiOperation({ summary: 'List transactions' })
  list(
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('cursor') cursor?: string,
    @Query('state') state?: TransactionState,
  ) {
    return this.execution.listTransactions({
      limit: Math.min(limit, 100),
      ...(cursor ? { cursor } : {}),
      ...(state ? { state } : {}),
    });
  }

  @Get(':id')
  @RequireScopes('transactions:read')
  byId(@Param('id') id: string) {
    return this.execution.getTransaction(id);
  }
}
