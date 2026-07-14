import { Body, Controller, DefaultValuePipe, Get, HttpCode, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AgriService } from './agri.service.js';

@ApiTags('agri')
@Controller('agri')
export class AgriController {
  constructor(private readonly agri: AgriService) {}

  @Get('farmers')
  listFarmers(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.agri.listFarmers(orgId, limit);
  }

  @Get('farms')
  listFarms(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.agri.listFarms(orgId, limit);
  }

  @Get('lots')
  listLots(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.agri.listProduceLots(orgId, limit);
  }

  @Get('loans')
  listLoans(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.agri.listInputLoans(orgId, limit);
  }

  @Post('farmers')
  @HttpCode(201)
  registerFarmer(@Body() body: { org_id: string; external_ref: string }) {
    return this.agri.registerFarmer(body.org_id, body.external_ref);
  }

  @Post('farms')
  @HttpCode(201)
  registerFarm(@Body() body: { org_id: string; farmer_id: string; crop?: string; season?: string; geo?: Record<string, unknown> }) {
    return this.agri.registerFarm({
      orgId: body.org_id,
      farmerId: body.farmer_id,
      crop: body.crop,
      season: body.season,
      geo: body.geo,
    });
  }

  @Post('loans')
  @HttpCode(201)
  inputLoan(@Body() body: { org_id: string; farmer_id: string; amount_minor: string; currency: string; payout_intent_id?: string }) {
    return this.agri.originateInputLoan({
      orgId: body.org_id,
      farmerId: body.farmer_id,
      amountMinor: body.amount_minor,
      currency: body.currency,
      payoutIntentId: body.payout_intent_id,
    });
  }

  @Post('insurance/policies')
  @HttpCode(201)
  createPolicy(@Body() body: {
    org_id: string;
    farmer_id: string;
    trigger_metric: string;
    threshold: string;
    premium_minor: string;
    payout_minor: string;
    currency: string;
  }) {
    return this.agri.createInsurancePolicy({
      orgId: body.org_id,
      farmerId: body.farmer_id,
      triggerMetric: body.trigger_metric,
      threshold: body.threshold,
      premiumMinor: body.premium_minor,
      payoutMinor: body.payout_minor,
      currency: body.currency,
    });
  }

  @Post('insurance/claims/auto')
  autoClaim(@Body() body: { org_id: string; policy_id: string; observed_value: string }) {
    return this.agri.autoInsuranceClaim(body.org_id, body.policy_id, body.observed_value);
  }

  @Post('lots')
  @HttpCode(201)
  registerLot(@Body() body: { org_id: string; farm_id: string; lot_code: string; origin?: string; attestation_id?: string }) {
    return this.agri.registerLot({
      orgId: body.org_id,
      farmId: body.farm_id,
      lotCode: body.lot_code,
      origin: body.origin,
      attestationId: body.attestation_id,
    });
  }

  @Get('lots/:id/trace')
  trace(@Param('id') id: string, @Query('org_id') orgId: string) {
    return this.agri.traceLot(orgId, id);
  }

  @Post('lots/:id/custody')
  custody(@Param('id') lotId: string, @Body() body: { org_id: string; actor_ref: string; geo?: Record<string, unknown>; attestation_id?: string }) {
    return this.agri.recordCustody({ orgId: body.org_id, lotId, actorRef: body.actor_ref, geo: body.geo, attestationId: body.attestation_id });
  }

  @Post('offtake')
  @HttpCode(201)
  offtake(@Body() body: { org_id: string; lot_id: string; buyer_ref: string; price_minor: string; currency: string; escrow_intent_id?: string }) {
    return this.agri.createOfftake({
      orgId: body.org_id,
      lotId: body.lot_id,
      buyerRef: body.buyer_ref,
      priceMinor: body.price_minor,
      currency: body.currency,
      escrowIntentId: body.escrow_intent_id,
    });
  }
}
