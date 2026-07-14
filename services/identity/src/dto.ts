import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsObject, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'agent-owner@example.com' })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class IssueTokenDto {
  @ApiProperty({ example: 'usr_01J0G7NF7Z' })
  @IsString()
  @Length(4, 64)
  user_id!: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'founder@acme.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'super-secret-pw', minLength: 8 })
  @IsString()
  @Length(8, 128)
  password!: string;

  @ApiPropertyOptional({ example: 'Jane Founder' })
  @IsOptional()
  @IsString()
  @Length(1, 120)
  display_name?: string;

  @ApiProperty({ enum: ['BUSINESS', 'DEVELOPER'] })
  @IsEnum(['BUSINESS', 'DEVELOPER'])
  role!: 'BUSINESS' | 'DEVELOPER';
}

export class LoginDto {
  @ApiProperty({ example: 'founder@acme.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'super-secret-pw' })
  @IsString()
  @Length(1, 128)
  password!: string;

  @ApiPropertyOptional({ enum: ['SUPER_ADMIN', 'BUSINESS', 'DEVELOPER', 'CONSUMER'] })
  @IsOptional()
  @IsEnum(['SUPER_ADMIN', 'BUSINESS', 'DEVELOPER', 'CONSUMER'])
  expected_role?: 'SUPER_ADMIN' | 'BUSINESS' | 'DEVELOPER' | 'CONSUMER';
}

export class VerifyTokenDto {
  @ApiProperty()
  @IsString()
  token!: string;
}

export class CreateDelegationDto {
  @ApiProperty()
  @IsString()
  user_id!: string;

  @ApiProperty()
  @IsString()
  agent_id!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  scopes?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  expires_at?: string;
}

export class CreateAliasDto {
  @ApiProperty({ enum: ['PHONE', 'EMAIL', 'HANDLE'] })
  @IsEnum(['PHONE', 'EMAIL', 'HANDLE'])
  kind!: 'PHONE' | 'EMAIL' | 'HANDLE';

  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  @Length(1, 256)
  value!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  verified?: boolean;
}

export class InviteSuperAdminDto {
  @ApiProperty({ example: 'jane@salychain.io' })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ example: 'Jane Doe' })
  @IsOptional()
  @IsString()
  @Length(1, 120)
  display_name?: string;
}

export class RevokeSuperAdminDto {
  @ApiProperty({ example: 'jane@salychain.io' })
  @IsEmail()
  email!: string;
}
