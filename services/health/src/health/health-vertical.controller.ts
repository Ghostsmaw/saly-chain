import { Body, Controller, DefaultValuePipe, Get, HttpCode, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthVerticalService } from './health-vertical.service.js';

@ApiTags('health')
@Controller('health')
export class HealthVerticalController {
  constructor(private readonly health: HealthVerticalService) {}

  @Get('providers')
  listProviders(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.health.listProviders(orgId, limit);
  }

  @Post('providers')
  @HttpCode(201)
  registerProvider(@Body() body: { org_id: string; name: string }) {
    return this.health.registerProvider(body.org_id, body.name);
  }

  @Get('payers')
  listPayers(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.health.listPayers(orgId, limit);
  }

  @Post('payers')
  @HttpCode(201)
  registerPayer(@Body() body: { org_id: string; name: string }) {
    return this.health.registerPayer(body.org_id, body.name);
  }

  @Get('consents')
  listConsents(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.health.listConsents(orgId, limit);
  }

  @Get('claims')
  listClaims(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.health.listClaims(orgId, limit);
  }

  @Post('consent')
  @HttpCode(201)
  grantConsent(@Body() body: { org_id: string; patient_ref: string; scope: string; expires_at?: string; attestation_id?: string }) {
    return this.health.grantConsent({
      orgId: body.org_id,
      patientRef: body.patient_ref,
      scope: body.scope,
      expiresAt: body.expires_at,
      attestationId: body.attestation_id,
    });
  }

  @Post('consent/:id/revoke')
  revokeConsent(@Param('id') id: string, @Body() body: { org_id: string }) {
    return this.health.revokeConsent(body.org_id, id);
  }

  @Get('consent/verify/:id')
  verifyConsent(@Param('id') id: string, @Query('org_id') orgId: string) {
    return this.health.verifyConsent(orgId, id);
  }

  @Post('claims')
  @HttpCode(201)
  submitClaim(@Body() body: {
    org_id: string;
    provider_id: string;
    payer_id: string;
    procedure_code: string;
    amount_minor: string;
    currency: string;
    escrow_intent_id?: string;
  }) {
    return this.health.submitClaim({
      orgId: body.org_id,
      providerId: body.provider_id,
      payerId: body.payer_id,
      procedureCode: body.procedure_code,
      amountMinor: body.amount_minor,
      currency: body.currency,
      escrowIntentId: body.escrow_intent_id,
    });
  }

  @Post('claims/:id/adjudicate')
  adjudicate(@Param('id') id: string, @Body() body: { org_id: string; approved: boolean }) {
    return this.health.adjudicateClaim(body.org_id, id, body.approved);
  }

  @Post('records/attest')
  @HttpCode(201)
  attestRecord(@Body() body: { org_id: string; patient_ref: string; payload: Record<string, unknown>; attestation_id: string }) {
    return this.health.attestRecord({
      orgId: body.org_id,
      patientRef: body.patient_ref,
      payload: body.payload,
      attestationId: body.attestation_id,
    });
  }
}
