import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID, Length, Matches } from 'class-validator';
import { assertWalletInternalAuth, EscrowResolveService } from './escrow-resolve.service.js';

class ResolveEscrowDto {
  @IsUUID('4')
  wallet_id!: string;

  @IsString()
  @Matches(/^0x[a-fA-F0-9]{64}$/)
  deal_id!: string;

  @IsEnum(['release', 'refund'])
  action!: 'release' | 'refund';

  @IsString()
  @Matches(/^0x[a-fA-F0-9]{40}$/)
  escrow_contract!: string;

  @IsOptional()
  @IsString()
  @Length(8, 128)
  idempotency_key?: string;
}

@ApiTags('internal')
@Controller('internal/escrow')
export class EscrowInternalController {
  constructor(private readonly escrow: EscrowResolveService) {}

  @Post('resolve')
  @HttpCode(202)
  @ApiOperation({ summary: 'Broadcast SalyEscrow release or refund (resolver wallet)' })
  async resolve(
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: ResolveEscrowDto,
  ) {
    assertWalletInternalAuth(authorization);
    return this.escrow.resolve({
      walletId: dto.wallet_id,
      dealId: dto.deal_id,
      action: dto.action,
      escrowContract: dto.escrow_contract,
      idempotencyKey: dto.idempotency_key,
    });
  }
}
