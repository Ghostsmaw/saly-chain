import { Type } from 'class-transformer';
import { IsInt, IsObject, IsOptional, IsString, Max, Min } from 'class-validator';

export class TransfersQueryDto {
  @IsOptional() @IsString() chain?: string;
  @IsOptional() @IsString() token?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(1000) limit?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) offset?: number;
}

export class NamedQueryDto {
  @IsString() query!: string;
  @IsOptional() @IsObject() params?: Record<string, unknown>;
}
