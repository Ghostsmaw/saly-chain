import { Body, Controller, DefaultValuePipe, Get, HttpCode, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EduService } from './edu.service.js';

@ApiTags('edu')
@Controller('edu')
export class EduController {
  constructor(private readonly edu: EduService) {}

  @Get('institutions')
  listInstitutions(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.edu.listInstitutions(orgId, limit);
  }

  @Post('institutions')
  @HttpCode(201)
  registerInstitution(@Body() body: { org_id: string; name: string }) {
    return this.edu.registerInstitution(body.org_id, body.name);
  }

  @Get('credentials')
  listCredentials(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.edu.listCredentials(orgId, limit);
  }

  @Get('tuition/invoices')
  listTuitionInvoices(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.edu.listTuitionInvoices(orgId, limit);
  }

  @Get('scholarships')
  listScholarships(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.edu.listScholarships(orgId, limit);
  }

  @Post('credentials/issue')
  @HttpCode(201)
  issueCredential(@Body() body: {
    org_id: string;
    institution_id: string;
    learner_ref: string;
    type: 'DEGREE' | 'CERTIFICATE' | 'BADGE';
    payload: Record<string, unknown>;
    attestation_id?: string;
    expires_at?: string;
  }) {
    return this.edu.issueCredential({
      orgId: body.org_id,
      institutionId: body.institution_id,
      learnerRef: body.learner_ref,
      type: body.type,
      payload: body.payload,
      attestationId: body.attestation_id,
      expiresAt: body.expires_at,
    });
  }

  @Get('credentials/verify/:id')
  verify(@Param('id') id: string, @Query('org_id') orgId: string) {
    return this.edu.verifyCredential(orgId, id);
  }

  @Post('tuition/invoice')
  @HttpCode(201)
  tuitionInvoice(@Body() body: {
    org_id: string;
    learner_ref: string;
    amount_minor: string;
    currency: string;
    due_at: string;
    intent_id?: string;
  }) {
    return this.edu.createTuitionInvoice({
      orgId: body.org_id,
      learnerRef: body.learner_ref,
      amountMinor: body.amount_minor,
      currency: body.currency,
      dueAt: body.due_at,
      intentId: body.intent_id,
    });
  }

  @Post('scholarships')
  @HttpCode(201)
  scholarship(@Body() body: {
    org_id: string;
    learner_ref: string;
    amount_minor: string;
    currency: string;
    milestone: string;
    escrow_intent_id?: string;
  }) {
    return this.edu.createScholarship({
      orgId: body.org_id,
      learnerRef: body.learner_ref,
      amountMinor: body.amount_minor,
      currency: body.currency,
      milestone: body.milestone,
      escrowIntentId: body.escrow_intent_id,
    });
  }

  @Post('scholarships/:id/disburse')
  disburse(@Param('id') id: string, @Body() body: { org_id: string }) {
    return this.edu.disburseScholarship(body.org_id, id);
  }
}
