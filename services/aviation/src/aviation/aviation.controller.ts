import { Body, Controller, DefaultValuePipe, Get, HttpCode, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AviationService } from './aviation.service.js';

@ApiTags('aviation')
@Controller('aviation')
export class AviationController {
  constructor(private readonly aviation: AviationService) {}

  @Get('aircraft')
  listAircraft(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.aviation.listAircraft(orgId, limit);
  }

  @Get('parts')
  listParts(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.aviation.listParts(orgId, limit);
  }

  @Get('settlements')
  listSettlements(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.aviation.listSettlements(orgId, limit);
  }

  @Post('aircraft')
  @HttpCode(201)
  registerAircraft(@Body() body: { org_id: string; tail: string; model: string; owner_ref: string }) {
    return this.aviation.registerAircraft({
      orgId: body.org_id,
      tail: body.tail,
      model: body.model,
      ownerRef: body.owner_ref,
    });
  }

  @Post('parts')
  @HttpCode(201)
  mintPart(@Body() body: { org_id: string; serial: string; part_type: string; aircraft_id?: string; token_id?: string }) {
    return this.aviation.mintPart({
      orgId: body.org_id,
      serial: body.serial,
      partType: body.part_type,
      aircraftId: body.aircraft_id,
      tokenId: body.token_id,
    });
  }

  @Post('maintenance')
  @HttpCode(201)
  maintenance(@Body() body: { org_id: string; part_id: string; action: string; technician_ref: string; attestation_id?: string }) {
    return this.aviation.recordMaintenance({
      orgId: body.org_id,
      partId: body.part_id,
      action: body.action,
      technicianRef: body.technician_ref,
      attestationId: body.attestation_id,
    });
  }

  @Get('parts/:serial/history')
  history(@Param('serial') serial: string, @Query('org_id') orgId: string) {
    return this.aviation.partHistory(orgId, serial);
  }

  @Post('airworthiness')
  @HttpCode(201)
  airworthiness(@Body() body: { org_id: string; aircraft_id: string; attestation_id: string; expires_at: string }) {
    return this.aviation.issueAirworthiness({
      orgId: body.org_id,
      aircraftId: body.aircraft_id,
      attestationId: body.attestation_id,
      expiresAt: body.expires_at,
    });
  }

  @Post('settlements')
  @HttpCode(201)
  settlement(@Body() body: { org_id: string; part_id: string; buyer_ref: string; seller_ref: string; amount_minor: string; currency: string }) {
    return this.aviation.createSettlement({
      orgId: body.org_id,
      partId: body.part_id,
      buyerRef: body.buyer_ref,
      sellerRef: body.seller_ref,
      amountMinor: body.amount_minor,
      currency: body.currency,
    });
  }

  @Post('settlements/:id/fund')
  fund(@Param('id') id: string, @Body() body: { org_id: string; escrow_intent_id: string }) {
    return this.aviation.fundSettlement(body.org_id, id, body.escrow_intent_id);
  }
}
