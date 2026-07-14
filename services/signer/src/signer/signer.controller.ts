import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignerService } from './signer.service.js';
import {
  CreateKeyDto,
  CreateKeyResponseDto,
  SignDto,
  SignResponseDto,
} from './dto.js';

@ApiTags('signer')
@Controller()
export class SignerController {
  constructor(private readonly signer: SignerService) {}

  @Post('keys')
  @HttpCode(201)
  @ApiOperation({ summary: 'Generate a new signer key; returns a key reference and public address' })
  @ApiResponse({ status: 201, type: CreateKeyResponseDto })
  async createKey(@Body() dto: CreateKeyDto): Promise<CreateKeyResponseDto> {
    const key = await this.signer.createKey(dto);
    return {
      key_ref: key.keyRef,
      chain: key.chain,
      public_address: key.publicAddress,
      created_at: key.createdAt.toISOString(),
    };
  }

  @Post('sign')
  @HttpCode(200)
  @ApiOperation({ summary: 'Sign a transaction. Idempotent. Never returns key material.' })
  @ApiResponse({ status: 200, type: SignResponseDto })
  sign(@Body() dto: SignDto): Promise<SignResponseDto> {
    return this.signer.sign(dto);
  }
}
