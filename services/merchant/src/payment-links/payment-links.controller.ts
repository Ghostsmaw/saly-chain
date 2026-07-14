import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsOptional, IsString, Length, Matches } from 'class-validator';
import { PaymentLinksService } from './payment-links.service.js';

class CreatePaymentLinkDto {
  @IsString()
  @Length(4, 64)
  actor_id!: string;

  @IsString()
  @Length(3, 128)
  destination_account_ref!: string;

  @IsString()
  @Length(1, 128)
  title!: string;

  @IsOptional()
  @IsString()
  @Length(0, 512)
  description?: string;

  @IsString()
  @Matches(/^\d+$/)
  amount_minor!: string;

  @IsString()
  @Length(2, 8)
  currency!: string;

  @IsString()
  @Length(2, 2)
  country!: string;

  @IsOptional()
  @IsString()
  success_redirect_url?: string;
}

class ArchivePaymentLinkDto {
  @IsOptional()
  @IsString()
  reason?: string;
}

@ApiTags('payment-links')
@Controller('payment-links')
export class PaymentLinksController {
  constructor(private readonly links: PaymentLinksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a shareable payment link' })
  create(@Body() dto: CreatePaymentLinkDto) {
    return this.links.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List payment links for the current org' })
  list(
    @Query('status') status?: string,
    @Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit?: number,
  ) {
    return this.links.list({
      ...(status ? { status: status as 'ACTIVE' | 'ARCHIVED' } : {}),
      limit: limit ?? 25,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a payment link by id' })
  get(@Param('id') id: string) {
    return this.links.getById(id);
  }
}

@ApiTags('public-payment-links')
@Controller('public/payment-links')
export class PublicPaymentLinksController {
  constructor(private readonly links: PaymentLinksService) {}

  @Get(':slug')
  @ApiOperation({ summary: 'Public metadata for a payment link (payer-facing)' })
  getBySlug(@Param('slug') slug: string) {
    return this.links.getPublicBySlug(slug);
  }
}

@ApiTags('payment-links')
@Controller('payment-links')
export class PaymentLinksArchiveController {
  constructor(private readonly links: PaymentLinksService) {}

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archive a payment link' })
  archive(@Param('id') id: string, @Body() dto: ArchivePaymentLinkDto) {
    return this.links.archive(id, dto.reason);
  }
}
