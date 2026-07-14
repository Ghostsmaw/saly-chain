import { Body, Controller, Delete, Get, Header, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { SettingsService } from './settings.service.js';

class UpdateGeneralDto {
  @IsOptional() @IsString() org_name?: string;
  @IsOptional() @IsString() support_email?: string;
  @IsOptional() @IsString() region?: string;
  @IsOptional() security?: {
    enforce_mfa?: boolean;
    ip_allowlist?: boolean;
    sso?: boolean;
    session_timeout?: boolean;
  };
  @IsOptional() notifications?: {
    risk_alerts?: boolean;
    settlements?: boolean;
    weekly_digest?: boolean;
  };
  @IsOptional() @IsString() actor_ref?: string;
}

class UpdateFlagDto {
  @IsBoolean()
  enabled!: boolean;

  @IsOptional()
  @IsString()
  actor_ref?: string;
}

class InviteTeamDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsString()
  @MinLength(3)
  email!: string;

  @IsString()
  @MinLength(1)
  role_name!: string;

  @IsOptional()
  @IsString()
  actor_ref?: string;
}

class CreateRoleDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsArray()
  @IsString({ each: true })
  permissions!: string[];

  @IsOptional()
  @IsIn(['brand', 'success', 'warning', 'danger'])
  tone?: string;

  @IsOptional()
  @IsString()
  actor_ref?: string;
}

class UpdateRoleDto {
  @IsArray()
  @IsString({ each: true })
  permissions!: string[];

  @IsOptional()
  @IsIn(['brand', 'success', 'warning', 'danger'])
  tone?: string;

  @IsOptional()
  @IsString()
  actor_ref?: string;
}

class CreateVerificationRequirementDto {
  @IsString()
  @MinLength(1)
  label!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsIn(['kyb', 'kyc'])
  category!: 'kyb' | 'kyc';

  @IsIn(['document', 'information'])
  input_type!: 'document' | 'information';

  @IsString()
  @MinLength(1)
  field_key!: string;

  @IsString()
  @MinLength(1)
  step_key!: string;

  @IsOptional()
  @IsString()
  value_format?: string;

  @IsOptional()
  @IsString()
  placeholder?: string;

  @IsOptional()
  @IsString()
  accept?: string;

  @IsOptional()
  @IsInt()
  sort_order?: number;

  @IsBoolean()
  target_business!: boolean;

  @IsBoolean()
  target_developer!: boolean;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsString()
  actor_ref?: string;
}

class UpdateVerificationRequirementDto {
  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  step_key?: string;

  @IsOptional()
  @IsString()
  value_format?: string;

  @IsOptional()
  @IsString()
  placeholder?: string;

  @IsOptional()
  @IsString()
  accept?: string;

  @IsOptional()
  @IsBoolean()
  target_business?: boolean;

  @IsOptional()
  @IsBoolean()
  target_developer?: boolean;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsInt()
  sort_order?: number;

  @IsOptional()
  @IsString()
  actor_ref?: string;
}

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settings: SettingsService) {}

  @Get('general')
  @ApiOperation({ summary: 'Platform general settings' })
  getGeneral() {
    return this.settings.getGeneral();
  }

  @Patch('general')
  @ApiOperation({ summary: 'Update platform general settings' })
  updateGeneral(@Body() body: UpdateGeneralDto) {
    return this.settings.updateGeneral(body);
  }

  @Get('team')
  @ApiOperation({ summary: 'Admin team members' })
  listTeam() {
    return this.settings.listTeam();
  }

  @Post('team')
  @ApiOperation({ summary: 'Invite an admin team member' })
  inviteTeam(@Body() body: InviteTeamDto) {
    return this.settings.inviteTeamMember(body);
  }

  @Delete('team/:id')
  @ApiQuery({ name: 'actor_ref', required: false, type: String })
  @ApiQuery({ name: 'actor_email', required: false, type: String })
  @ApiOperation({ summary: 'Revoke admin team member access' })
  revokeTeam(
    @Param('id') id: string,
    @Query('actor_ref') actorRef?: string,
    @Query('actor_email') actorEmail?: string,
  ) {
    return this.settings.removeTeamMember({ id, actor_ref: actorRef, actor_email: actorEmail });
  }

  @Get('roles')
  @ApiOperation({ summary: 'RBAC roles' })
  listRoles() {
    return this.settings.listRoles();
  }

  @Post('roles')
  @ApiOperation({ summary: 'Create a new RBAC role' })
  createRole(@Body() body: CreateRoleDto) {
    return this.settings.createRole(body);
  }

  @Patch('roles/:id')
  @ApiOperation({ summary: 'Update role permissions' })
  updateRole(@Param('id') id: string, @Body() body: UpdateRoleDto) {
    return this.settings.updateRole(id, body);
  }

  @Get('flags')
  @ApiOperation({ summary: 'Feature flags' })
  listFlags() {
    return this.settings.listFlags();
  }

  @Get('flags/by-key/:key')
  @ApiOperation({ summary: 'Check whether a feature flag is enabled by key' })
  getFlagByKey(@Param('key') key: string) {
    return this.settings.getFlagByKey(key);
  }

  @Patch('flags/:id')
  @ApiOperation({ summary: 'Toggle a feature flag' })
  updateFlag(@Param('id') id: string, @Body() body: UpdateFlagDto) {
    return this.settings.updateFlag(id, body.enabled, body.actor_ref);
  }

  @Get('verification-requirements')
  @ApiOperation({ summary: 'List KYC/KYB document and information requirements' })
  listVerificationRequirements() {
    return this.settings.listVerificationRequirements();
  }

  @Get('verification-requirements/active/:profile')
  @ApiOperation({ summary: 'Active requirements for business or developer onboarding' })
  getActiveVerificationRequirements(@Param('profile') profile: 'business' | 'developer') {
    return this.settings.getActiveVerificationRequirements(profile);
  }

  @Post('verification-requirements')
  @ApiOperation({ summary: 'Create a verification requirement' })
  createVerificationRequirement(@Body() body: CreateVerificationRequirementDto) {
    return this.settings.createVerificationRequirement(body);
  }

  @Patch('verification-requirements/:id')
  @ApiOperation({ summary: 'Update a verification requirement' })
  updateVerificationRequirement(@Param('id') id: string, @Body() body: UpdateVerificationRequirementDto) {
    return this.settings.updateVerificationRequirement(id, body);
  }

  @Delete('verification-requirements/:id')
  @ApiQuery({ name: 'actor_ref', required: false, type: String })
  @ApiOperation({ summary: 'Delete a verification requirement' })
  deleteVerificationRequirement(@Param('id') id: string, @Query('actor_ref') actorRef?: string) {
    return this.settings.deleteVerificationRequirement(id, actorRef);
  }

  @Get('audit')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'Audit log entries' })
  listAudit(@Query('limit') limit?: string) {
    return this.settings.listAudit(limit ? Number(limit) : 50);
  }

  @Get('audit/export')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'Export audit log as CSV' })
  @Header('Content-Type', 'text/csv; charset=utf-8')
  @Header('Content-Disposition', 'attachment; filename="salychain-audit-log.csv"')
  exportAudit(@Query('limit') limit?: string) {
    return this.settings.exportAuditCsv(limit ? Number(limit) : 500);
  }
}
