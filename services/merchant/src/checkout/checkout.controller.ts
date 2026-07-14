import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator';
import { CheckoutService } from './checkout.service.js';

class OpenCheckoutDto {
  @IsString()
  @Length(1, 128)
  customer_name!: string;

  @IsOptional()
  @IsEmail()
  customer_email?: string;

  @IsOptional()
  @IsString()
  @Length(8, 128)
  idempotency_key?: string;
}

class DirectCheckoutDto extends OpenCheckoutDto {
  @IsString()
  @Length(4, 64)
  actor_id!: string;

  @IsString()
  @Length(3, 128)
  destination_account_ref!: string;

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
  memo?: string;
}

@ApiTags('checkout')
@Controller('checkout/sessions')
export class CheckoutController {
  constructor(private readonly checkout: CheckoutService) {}

  @Post()
  @ApiOperation({ summary: 'Open a hosted checkout session (merchant API)' })
  openDirect(@Body() dto: DirectCheckoutDto) {
    return this.checkout.openDirect(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List checkout sessions for the current org' })
  list(@Query('limit', new DefaultValuePipe(25), ParseIntPipe) limit: number) {
    return this.checkout.listSessions(limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a checkout session by id' })
  get(@Param('id') id: string) {
    return this.checkout.getSession(id);
  }
}

@ApiTags('public-checkout')
@Controller('public/checkout')
export class PublicCheckoutController {
  constructor(private readonly checkout: CheckoutService) {}

  @Post(':slug/sessions')
  @ApiOperation({ summary: 'Open a payer checkout session from a payment link slug' })
  openFromLink(@Param('slug') slug: string, @Body() dto: OpenCheckoutDto) {
    return this.checkout.openFromPaymentLink(slug, dto);
  }

  @Get('sessions/:id')
  @ApiOperation({ summary: 'Poll checkout session status (payer-facing)' })
  getSession(@Param('id') id: string) {
    return this.checkout.getSession(id, { publicAccess: true });
  }
}
