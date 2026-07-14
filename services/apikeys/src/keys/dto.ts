import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsIn, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { Environment } from '../generated/prisma/index.js';

export class IssueApiKeyDto {
  @IsString() @Length(1, 64) org_id!: string;
  @IsIn(['TEST', 'LIVE']) environment!: Environment;
  @IsArray() @ArrayMinSize(1) @ArrayMaxSize(32) @IsString({ each: true }) scopes!: string[];
  @IsOptional() @IsString() @Length(1, 200) description?: string;
  @IsOptional() @IsInt() @Min(1) @Max(60_000) rate_limit_per_min?: number;
  @IsOptional() @IsArray() @IsString({ each: true }) ip_allow_list?: string[];
  @IsOptional() @IsString() expires_at?: string;
  @IsOptional() @IsString() created_by?: string;
}

export class RevokeApiKeyDto {
  @IsString() @Length(1, 200) reason!: string;
}

export class RotateApiKeyDto {
  @IsString() @Length(1, 200) reason!: string;
  @IsOptional() @IsString() created_by?: string;
}

export class VerifyKeyDto {
  @IsString() @Length(20, 200) secret!: string;
  @IsOptional() @IsString() ip?: string;
  @IsOptional() @IsString() user_agent?: string;
  @IsOptional() @IsString() correlation_id?: string;
}
