import { Body, Controller, Get, Module, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsIn, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { OrgsService } from './orgs.service.js';
import { OrgStatus } from '../generated/prisma/index.js';

class CreateOrgDto {
  @IsString() @Length(1, 200) name!: string;
  @IsOptional() @IsInt() @Min(1) @Max(60_000) default_rate_limit_per_min?: number;
}

class SetStatusDto {
  @IsIn(['ACTIVE', 'SUSPENDED', 'CLOSED']) status!: OrgStatus;
}

class AddMemberDto {
  @IsEmail() email!: string;
  @IsOptional() @IsIn(['owner', 'admin', 'member', 'viewer']) role?: 'owner' | 'admin' | 'member' | 'viewer';
}

@ApiTags('orgs')
@Controller('orgs')
class OrgsController {
  constructor(private readonly orgs: OrgsService) {}

  @Post()
  @ApiOperation({ summary: 'Create an organization' })
  create(@Body() dto: CreateOrgDto) {
    return this.orgs.create({
      name: dto.name,
      ...(dto.default_rate_limit_per_min !== undefined
        ? { defaultRateLimitPerMin: dto.default_rate_limit_per_min }
        : {}),
    });
  }

  @Get()
  @ApiOperation({ summary: 'List organizations' })
  async list() {
    return { data: await this.orgs.list() };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch an organization by id' })
  byId(@Param('id') id: string) {
    return this.orgs.getById(id);
  }

  @Post(':id/status')
  @ApiOperation({ summary: 'Suspend / re-activate / close an organization' })
  setStatus(@Param('id') id: string, @Body() dto: SetStatusDto) {
    return this.orgs.setStatus(id, dto.status);
  }

  @Post(':id/members')
  @ApiOperation({ summary: 'Add a member to an organization' })
  addMember(@Param('id') id: string, @Body() dto: AddMemberDto) {
    return this.orgs.addMember({ orgId: id, email: dto.email, ...(dto.role ? { role: dto.role } : {}) });
  }

  @Get(':id/members')
  @ApiOperation({ summary: 'List members of an organization' })
  async listMembers(@Param('id') id: string) {
    return { data: await this.orgs.listMembers(id) };
  }
}

@Module({
  controllers: [OrgsController],
  providers: [OrgsService],
  exports: [OrgsService],
})
export class OrgsModule {}
