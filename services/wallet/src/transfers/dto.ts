import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsObject, IsOptional, IsString, Length, Matches, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransferDto {
  @ApiProperty()
  @IsString()
  @Length(8, 128)
  idempotency_key!: string;

  @ApiProperty()
  @IsString()
  @Length(36, 36)
  wallet_id!: string;

  @ApiProperty({ example: '0xabc...' })
  @IsString()
  @Length(3, 128)
  destination_address!: string;

  @ApiProperty({ example: '5000000', description: 'Amount in the asset\'s smallest unit' })
  @IsString()
  @Matches(/^\d+$/)
  amount_minor!: string;

  @ApiProperty({ example: 'USDC' })
  @IsString()
  @Length(2, 16)
  asset!: string;

  @ApiPropertyOptional({
    description: 'XRPL IOU issuer classic address (overrides XRPL_IOU_ISSUERS env for this transfer)',
    example: 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq',
  })
  @IsOptional()
  @IsString()
  @Matches(/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/)
  iou_issuer?: string;

  @ApiPropertyOptional({ description: 'XRPL destination tag (hosted-wallet deposits)' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  destination_tag?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(1, 256)
  memo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;

  @ApiPropertyOptional({ example: 'itn_01J0G7NF7Z', description: 'Intent id for agent spend-approval lookup at sign time' })
  @IsOptional()
  @IsString()
  @Length(4, 64)
  intent_id?: string;

  @ApiPropertyOptional({
    enum: ['TRANSFER', 'ESCROW_FUND', 'DEX_SWAP', 'BRIDGE_DEPOSIT', 'BRIDGE_WITHDRAW', 'SALYSD_MINT', 'SALYSD_REDEEM', 'SALYSD_APPROVE', 'SALYSD_ORACLE_UPDATE', 'CONTRACT_CALL'],
    default: 'TRANSFER',
  })
  @IsOptional()
  @IsString()
  @Matches(/^(TRANSFER|ESCROW_FUND|DEX_SWAP|BRIDGE_DEPOSIT|BRIDGE_WITHDRAW|SALYSD_MINT|SALYSD_REDEEM|SALYSD_APPROVE|SALYSD_ORACLE_UPDATE|CONTRACT_CALL)$/)
  kind?: 'TRANSFER' | 'ESCROW_FUND' | 'DEX_SWAP' | 'BRIDGE_DEPOSIT' | 'BRIDGE_WITHDRAW' | 'SALYSD_MINT' | 'SALYSD_REDEEM' | 'SALYSD_APPROVE' | 'SALYSD_ORACLE_UPDATE' | 'CONTRACT_CALL';

  @ApiPropertyOptional({ description: 'bytes32 deal id (0x…) for ESCROW_FUND' })
  @IsOptional()
  @IsString()
  @Matches(/^0x[a-fA-F0-9]{64}$/)
  deal_id?: string;

  @ApiPropertyOptional({ description: 'SalyEscrow contract address for ESCROW_FUND' })
  @IsOptional()
  @IsString()
  @Matches(/^0x[a-fA-F0-9]{40}$/)
  escrow_contract?: string;

  @ApiPropertyOptional({ description: 'Unix seconds deadline for auto-refund (0 = resolver-only)' })
  @IsOptional()
  @IsString()
  @Matches(/^\d+$/)
  escrow_deadline?: string;

  @ApiPropertyOptional({
    description: 'Uniswap V3 swap bundle for DEX_SWAP',
    example: {
      router: '0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4',
      calldata: '0x…',
      token_in: 'USDC',
      token_out: 'WETH',
      min_amount_out: '300000000000000',
      recipient: '0x…',
    },
  })
  @IsOptional()
  @IsObject()
  swap_payload?: {
    router: string;
    calldata: string;
    token_in: string;
    token_out: string;
    min_amount_out: string;
    recipient: string;
  };

  @ApiPropertyOptional({ description: 'OP-Stack bridge bundle for BRIDGE_DEPOSIT / BRIDGE_WITHDRAW' })
  @IsOptional()
  @IsObject()
  bridge_payload?: {
    l1_standard_bridge?: string;
    l1_token?: string;
    l2_token?: string;
    l2_recipient?: string;
    l2_standard_bridge?: string;
    l1_recipient?: string;
  };

  @ApiPropertyOptional({ description: 'SalySD mint/burn/approve bundle for SALYSD_* jobs' })
  @IsOptional()
  @IsObject()
  salysd_payload?: {
    token?: string;
    counterparty?: string;
    holder?: string;
    spender?: string;
    reserve_oracle?: string;
    attestation_hash?: string;
    ceiling_minor?: string;
  };

  @ApiPropertyOptional({ description: 'Generic contract call for CONTRACT_CALL jobs' })
  @IsOptional()
  @IsObject()
  contract_call_payload?: {
    contract: string;
    calldata: string;
    chain?: 'SALY_L3' | 'BASE';
  };
}

export class TransferResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() wallet_id!: string;
  @ApiProperty({
    enum: ['TRANSFER', 'ESCROW_FUND', 'DEX_SWAP', 'BRIDGE_DEPOSIT', 'BRIDGE_WITHDRAW', 'SALYSD_MINT', 'SALYSD_REDEEM', 'SALYSD_APPROVE', 'SALYSD_ORACLE_UPDATE', 'CONTRACT_CALL'],
  })
  kind!: string;
  @ApiProperty() status!: string;
  @ApiProperty({ type: String, nullable: true }) tx_hash!: string | null;
  @ApiProperty({ type: String, nullable: true }) deal_id!: string | null;
  @ApiProperty() attempts!: number;
  @ApiProperty({ type: String, nullable: true }) last_error!: string | null;
  @ApiProperty() created_at!: string;
}
