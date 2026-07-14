import { Body, Controller, Delete, Get, Headers, HttpCode, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service.js';
import { UsersService } from './users/users.service.js';
import { DelegationsService } from './delegations/delegations.service.js';
import { AliasesService } from './aliases/aliases.service.js';
import {
  CreateAliasDto,
  CreateDelegationDto,
  CreateUserDto,
  IssueTokenDto,
  LoginDto,
  InviteSuperAdminDto,
  RevokeSuperAdminDto,
  RegisterDto,
  VerifyTokenDto,
} from './dto.js';
import { assertIdentityInternalAuth } from './auth/internal-auth.js';

@ApiTags('auth')
@Controller()
export class IdentityController {
  constructor(
    private readonly auth: AuthService,
    private readonly users: UsersService,
    private readonly delegations: DelegationsService,
    private readonly aliases: AliasesService,
  ) {}

  @Post('users')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register a consumer user (dev / bootstrap)' })
  createUser(@Body() dto: CreateUserDto) {
    return this.users.create({ email: dto.email, metadata: dto.metadata });
  }

  @Get('users/resolve')
  @ApiOperation({ summary: 'Resolve a PHONE, EMAIL, or HANDLE alias to a user id' })
  @ApiQuery({ name: 'kind', enum: ['PHONE', 'EMAIL', 'HANDLE'] })
  @ApiQuery({ name: 'value', type: String })
  resolveUser(
    @Query('kind') kind: 'PHONE' | 'EMAIL' | 'HANDLE',
    @Query('value') value: string,
  ) {
    return this.aliases.resolve(kind, value);
  }

  @Post('users/:id/aliases')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register a beneficiary lookup alias for a user' })
  registerAlias(@Param('id') userId: string, @Body() dto: CreateAliasDto) {
    return this.aliases.register({
      userId,
      kind: dto.kind,
      value: dto.value,
      verified: dto.verified,
    });
  }

  @Get('users/:id')
  getUser(@Param('id') id: string) {
    return this.users.getById(id);
  }

  @Get('users')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'role', required: false, enum: ['SUPER_ADMIN', 'BUSINESS', 'DEVELOPER', 'CONSUMER'] })
  listUsers(@Query('limit') limit?: string, @Query('role') role?: string) {
    return this.users.list(limit ? Number(limit) : 50, role);
  }

  @Post('auth/register')
  @HttpCode(201)
  @ApiOperation({ summary: 'Self-service signup for business / developer accounts' })
  register(@Body() dto: RegisterDto) {
    return this.auth.register({
      email: dto.email,
      password: dto.password,
      displayName: dto.display_name,
      role: dto.role,
    });
  }

  @Post('auth/login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Password login — returns a JWT session' })
  login(@Body() dto: LoginDto) {
    return this.auth.login({
      email: dto.email,
      password: dto.password,
      expectedRole: dto.expected_role,
    });
  }

  @Post('auth/invite-super-admin')
  @HttpCode(201)
  @ApiOperation({ summary: 'Provision super-admin login (internal — admin service)' })
  inviteSuperAdmin(@Headers('authorization') authorization: string | undefined, @Body() dto: InviteSuperAdminDto) {
    assertIdentityInternalAuth(authorization);
    return this.auth.inviteSuperAdmin({ email: dto.email, displayName: dto.display_name });
  }

  @Post('auth/revoke-super-admin')
  @HttpCode(200)
  @ApiOperation({ summary: 'Suspend super-admin login (internal — admin service)' })
  revokeSuperAdmin(@Headers('authorization') authorization: string | undefined, @Body() dto: RevokeSuperAdminDto) {
    assertIdentityInternalAuth(authorization);
    return this.auth.revokeSuperAdmin({ email: dto.email });
  }

  @Post('auth/token')
  @HttpCode(200)
  @ApiOperation({ summary: 'Issue a JWT access token for a user (Saly AI consumer surface)' })
  issueToken(@Body() dto: IssueTokenDto) {
    return this.auth.issueToken(dto.user_id);
  }

  @Post('auth/verify')
  @HttpCode(200)
  @ApiOperation({ summary: 'Verify a JWT (internal — gateway calls this)' })
  verifyToken(@Body() dto: VerifyTokenDto) {
    return this.auth.verifyToken(dto.token);
  }

  @Get('.well-known/jwks.json')
  jwks() {
    return this.auth.jwks();
  }

  @Post('delegations')
  @HttpCode(201)
  @ApiOperation({ summary: 'Grant a user delegation over an agent' })
  createDelegation(@Body() dto: CreateDelegationDto) {
    return this.delegations.create({
      userId: dto.user_id,
      agentId: dto.agent_id,
      scopes: dto.scopes,
      expiresAt: dto.expires_at ? new Date(dto.expires_at) : undefined,
    });
  }

  @Get('delegations')
  listDelegations(@Query('user_id') userId?: string, @Query('agent_id') agentId?: string) {
    return this.delegations.list({ userId, agentId });
  }

  @Delete('delegations/:id')
  revokeDelegation(@Param('id') id: string) {
    return this.delegations.revoke(id);
  }
}
