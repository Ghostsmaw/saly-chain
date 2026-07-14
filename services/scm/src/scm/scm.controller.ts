import { Body, Controller, DefaultValuePipe, Get, HttpCode, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScmService } from './scm.service.js';

@ApiTags('scm')
@Controller('scm')
export class ScmController {
  constructor(private readonly scm: ScmService) {}

  @Get('shipments')
  listShipments(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.scm.listShipments(orgId, limit);
  }

  @Get('settlements')
  listSettlements(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.scm.listSettlements(orgId, limit);
  }

  @Post('shipments')
  @HttpCode(201)
  createShipment(@Body() body: { org_id: string; product_id?: string; origin: string; destination: string }) {
    return this.scm.createShipment({
      orgId: body.org_id,
      productId: body.product_id,
      origin: body.origin,
      destination: body.destination,
    });
  }

  @Post('custody')
  @HttpCode(201)
  custody(@Body() body: { org_id: string; shipment_id: string; actor_ref: string; geo?: Record<string, unknown>; attestation_id?: string }) {
    return this.scm.recordCustody({
      orgId: body.org_id,
      shipmentId: body.shipment_id,
      actorRef: body.actor_ref,
      geo: body.geo,
      attestationId: body.attestation_id,
    });
  }

  @Get('shipments/:id/trace')
  trace(@Param('id') id: string, @Query('org_id') orgId: string) {
    return this.scm.traceShipment(orgId, id);
  }

  @Post('trade-docs')
  @HttpCode(201)
  tradeDoc(@Body() body: { org_id: string; shipment_id: string; doc_type: string; payload: Record<string, unknown> }) {
    return this.scm.attachTradeDoc({
      orgId: body.org_id,
      shipmentId: body.shipment_id,
      docType: body.doc_type,
      payload: body.payload,
    });
  }

  @Post('trade-finance')
  @HttpCode(201)
  tradeFinance(@Body() body: { org_id: string; shipment_id: string; financier_ref: string; amount_minor: string; currency: string; payout_intent_id?: string }) {
    return this.scm.originateTradeFinance({
      orgId: body.org_id,
      shipmentId: body.shipment_id,
      financierRef: body.financier_ref,
      amountMinor: body.amount_minor,
      currency: body.currency,
      payoutIntentId: body.payout_intent_id,
    });
  }

  @Post('settlements')
  @HttpCode(201)
  settlement(@Body() body: { org_id: string; shipment_id: string; amount_minor: string; currency: string }) {
    return this.scm.createSettlement({
      orgId: body.org_id,
      shipmentId: body.shipment_id,
      amountMinor: body.amount_minor,
      currency: body.currency,
    });
  }

  @Post('settlements/:id/release')
  release(@Param('id') id: string, @Body() body: { org_id: string; escrow_intent_id: string }) {
    return this.scm.releaseSettlement(body.org_id, id, body.escrow_intent_id);
  }
}
