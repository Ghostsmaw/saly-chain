import { BadRequestException, Body, Controller, DefaultValuePipe, Get, Module, Param, ParseBoolPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { loadEnv } from '@salychain/config';
import { KeysService } from './keys.service.js';
import { IssueApiKeyDto, RevokeApiKeyDto, RotateApiKeyDto, VerifyKeyDto } from './dto.js';
import { APIKEYS_ENV } from '../config/env.runtime.js';
import { apiKeysEnvSchema } from '../config/env.js';

@ApiTags('api-keys')
@Controller('api-keys')
class KeysController {
  constructor(private readonly keys: KeysService) {}

  @Post()
  @ApiOperation({ summary: 'Issue a new API key for an organization' })
  async issue(@Body() dto: IssueApiKeyDto) {
    const expiresAt = dto.expires_at ? new Date(dto.expires_at) : undefined;
    if (expiresAt && Number.isNaN(expiresAt.getTime())) throw new BadRequestException('expires_at must be ISO-8601');
    const result = await this.keys.issue({
      orgId: dto.org_id,
      environment: dto.environment,
      scopes: dto.scopes,
      ...(dto.description ? { description: dto.description } : {}),
      ...(dto.rate_limit_per_min !== undefined ? { rateLimitPerMin: dto.rate_limit_per_min } : {}),
      ...(dto.ip_allow_list ? { ipAllowList: dto.ip_allow_list } : {}),
      ...(expiresAt ? { expiresAt } : {}),
      ...(dto.created_by ? { createdBy: dto.created_by } : {}),
    });
    return result;
  }

  @Get()
  @ApiOperation({ summary: 'List API keys for an organization' })
  async list(@Query('org_id') orgId: string, @Query('include_revoked', new DefaultValuePipe(false), ParseBoolPipe) includeRevoked: boolean) {
    if (!orgId) throw new BadRequestException('org_id query param is required');
    return { data: await this.keys.list(orgId, includeRevoked) };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch an API key envelope (no secret)' })
  byId(@Param('id') id: string) {
    return this.keys.getById(id);
  }

  @Post(':id/revoke')
  @ApiOperation({ summary: 'Revoke an API key' })
  revoke(@Param('id') id: string, @Body() dto: RevokeApiKeyDto) {
    return this.keys.revoke(id, dto.reason);
  }

  @Post(':id/rotate')
  @ApiOperation({ summary: 'Rotate: issue a new key with the same envelope and revoke the old one' })
  rotate(@Param('id') id: string, @Body() dto: RotateApiKeyDto) {
    return this.keys.rotate(id, dto.reason, dto.created_by);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify a presented secret (used by the gateway in the hot path)' })
  verify(@Body() dto: VerifyKeyDto) {
    return this.keys.verify(dto.secret, {
      ...(dto.ip ? { ip: dto.ip } : {}),
      ...(dto.user_agent ? { userAgent: dto.user_agent } : {}),
      ...(dto.correlation_id ? { correlationId: dto.correlation_id } : {}),
    });
  }
}

@Module({
  controllers: [KeysController],
  providers: [
    { provide: APIKEYS_ENV, useFactory: () => loadEnv(apiKeysEnvSchema) },
    KeysService,
  ],
  exports: [KeysService],
})
export class KeysModule {}
