import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { FinanceService } from './finance.service.js';

class OrgScopedBody {
  @IsString() @Length(1, 128) org_id!: string;
}

class CreateInstrumentBody extends OrgScopedBody {
  @IsEnum(['BOND', 'FUND', 'RWA']) type!: 'BOND' | 'FUND' | 'RWA';
  @IsString() @Length(1, 200) name!: string;
  @IsString() @Length(1, 128) issuer_ref!: string;
  @IsString() @Length(3, 8) currency!: string;
  @IsOptional() terms?: Record<string, unknown>;
  @IsOptional() @IsString() token_id?: string;
}

class UpsertHoldingBody extends OrgScopedBody {
  @IsString() @Length(1, 128) account_ref!: string;
  @IsString() @Length(1, 128) instrument_id!: string;
  @IsString() units_minor!: string;
}

class OriginateLoanBody extends OrgScopedBody {
  @IsString() @Length(1, 128) borrower_ref!: string;
  @IsString() principal_minor!: string;
  @IsInt() @Min(0) rate_bps!: number;
  @IsString() @Length(3, 8) currency!: string;
  @IsOptional() @IsString() instrument_id?: string;
  @IsOptional() @IsString() collateral_ref?: string;
  @IsOptional() @IsString() intent_id?: string;
}

class ScheduleCashflowBody extends OrgScopedBody {
  @IsString() instrument_id!: string;
  @IsEnum(['COUPON', 'DIVIDEND', 'REDEMPTION']) type!: 'COUPON' | 'DIVIDEND' | 'REDEMPTION';
  @IsString() amount_minor!: string;
  @IsString() @Length(3, 8) currency!: string;
  @IsISO8601() scheduled_at!: string;
}

class RunCashflowsBody extends OrgScopedBody {
  @IsString() instrument_id!: string;
  @IsString() batch_intent_id!: string;
}

class CreateDvpBody extends OrgScopedBody {
  @IsString() buyer_ref!: string;
  @IsString() seller_ref!: string;
  @IsString() instrument_id!: string;
  @IsString() units_minor!: string;
  @IsString() price_minor!: string;
  @IsString() @Length(3, 8) currency!: string;
}

class FundDvpBody {
  @IsString() org_id!: string;
  @IsString() escrow_intent_id!: string;
}

@ApiTags('finance')
@Controller('finance')
export class FinanceController {
  constructor(private readonly finance: FinanceService) {}

  @Post('instruments')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register a financial instrument' })
  createInstrument(@Body() body: CreateInstrumentBody) {
    return this.finance.createInstrument({
      orgId: body.org_id,
      type: body.type,
      name: body.name,
      issuerRef: body.issuer_ref,
      currency: body.currency,
      terms: body.terms,
      tokenId: body.token_id,
    });
  }

  @Get('instruments')
  listInstruments(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.finance.listInstruments(orgId, limit);
  }

  @Post('holdings')
  @HttpCode(201)
  upsertHolding(@Body() body: UpsertHoldingBody) {
    return this.finance.upsertHolding({
      orgId: body.org_id,
      accountRef: body.account_ref,
      instrumentId: body.instrument_id,
      unitsMinor: body.units_minor,
    });
  }

  @Get('holdings')
  listHoldings(@Query('org_id') orgId: string, @Query('account_ref') accountRef?: string) {
    return this.finance.listHoldings(orgId, accountRef);
  }

  @Get('loans')
  @ApiOperation({ summary: 'List loans for an organization' })
  listLoans(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.finance.listLoans(orgId, limit);
  }

  @Post('loans')
  @HttpCode(201)
  originateLoan(@Body() body: OriginateLoanBody) {
    return this.finance.originateLoan({
      orgId: body.org_id,
      borrowerRef: body.borrower_ref,
      principalMinor: body.principal_minor,
      rateBps: body.rate_bps,
      currency: body.currency,
      instrumentId: body.instrument_id,
      collateralRef: body.collateral_ref,
      intentId: body.intent_id,
    });
  }

  @Post('loans/:id/repay')
  repayLoan(
    @Param('id') id: string,
    @Body() body: OrgScopedBody & { intent_id?: string },
  ) {
    return this.finance.repayLoan(body.org_id, id, body.intent_id);
  }

  @Post('cashflows')
  @HttpCode(201)
  scheduleCashflow(@Body() body: ScheduleCashflowBody) {
    return this.finance.scheduleCashflow({
      orgId: body.org_id,
      instrumentId: body.instrument_id,
      type: body.type,
      amountMinor: body.amount_minor,
      currency: body.currency,
      scheduledAt: body.scheduled_at,
    });
  }

  @Post('cashflows/run')
  runCashflows(@Body() body: RunCashflowsBody) {
    return this.finance.runCashflows(body.org_id, body.instrument_id, body.batch_intent_id);
  }

  @Post('dvp')
  @HttpCode(201)
  createDvp(@Body() body: CreateDvpBody) {
    return this.finance.createDvp({
      orgId: body.org_id,
      buyerRef: body.buyer_ref,
      sellerRef: body.seller_ref,
      instrumentId: body.instrument_id,
      unitsMinor: body.units_minor,
      priceMinor: body.price_minor,
      currency: body.currency,
    });
  }

  @Post('dvp/:id/fund')
  fundDvp(@Param('id') id: string, @Body() body: FundDvpBody) {
    return this.finance.fundDvpEscrow(body.org_id, id, body.escrow_intent_id);
  }
}
