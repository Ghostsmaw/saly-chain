import { Body, Controller, DefaultValuePipe, Get, HttpCode, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GovService } from './gov.service.js';

class OrgBody {
  @IsString() @Length(1, 128) org_id!: string;
}

class DisbursementItem {
  @IsString() beneficiary_id!: string;
  @IsString() amount_minor!: string;
  @IsString() currency!: string;
}

class BatchDisbursementsBody extends OrgBody {
  @IsString() program_id!: string;
  @IsString() batch_intent_id!: string;
  @IsArray() @ValidateNested({ each: true }) @Type(() => DisbursementItem)
  items!: DisbursementItem[];
}

@ApiTags('gov')
@Controller('gov')
export class GovController {
  constructor(private readonly gov: GovService) {}

  @Post('programs')
  @HttpCode(201)
  createProgram(@Body() body: OrgBody & { name: string; budget_minor: string; currency: string; eligibility?: Record<string, unknown> }) {
    return this.gov.createProgram({
      orgId: body.org_id,
      name: body.name,
      budgetMinor: body.budget_minor,
      currency: body.currency,
      eligibility: body.eligibility,
    });
  }

  @Post('beneficiaries')
  @HttpCode(201)
  registerBeneficiary(@Body() body: OrgBody & { program_id: string; external_ref: string }) {
    return this.gov.registerBeneficiary({
      orgId: body.org_id,
      programId: body.program_id,
      externalRef: body.external_ref,
    });
  }

  @Post('disbursements/batch')
  batchDisbursements(@Body() body: BatchDisbursementsBody) {
    return this.gov.batchDisbursements({
      orgId: body.org_id,
      programId: body.program_id,
      batchIntentId: body.batch_intent_id,
      items: body.items.map((i) => ({
        beneficiaryId: i.beneficiary_id,
        amountMinor: i.amount_minor,
        currency: i.currency,
      })),
    });
  }

  @Post('procurement')
  @HttpCode(201)
  createProcurement(@Body() body: OrgBody & { tender_ref: string; title: string; budget_minor: string; currency: string }) {
    return this.gov.createProcurement({
      orgId: body.org_id,
      tenderRef: body.tender_ref,
      title: body.title,
      budgetMinor: body.budget_minor,
      currency: body.currency,
    });
  }

  @Post('procurement/award')
  awardProcurement(@Body() body: OrgBody & { tender_ref: string; award_ref: string; escrow_intent_id?: string }) {
    return this.gov.awardProcurement({
      orgId: body.org_id,
      tenderRef: body.tender_ref,
      awardRef: body.award_ref,
      escrowIntentId: body.escrow_intent_id,
    });
  }

  @Post('records')
  @HttpCode(201)
  anchorRecord(@Body() body: OrgBody & { program_id?: string; record_type: string; subject_ref: string; payload: Record<string, unknown>; attestation_id?: string }) {
    return this.gov.anchorPublicRecord({
      orgId: body.org_id,
      programId: body.program_id,
      recordType: body.record_type,
      subjectRef: body.subject_ref,
      payload: body.payload,
      attestationId: body.attestation_id,
    });
  }

  @Get('programs')
  @ApiOperation({ summary: 'List government programs for an organization' })
  listPrograms(
    @Query('org_id') orgId: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
  ) {
    return this.gov.listPrograms(orgId, limit);
  }

  @Get('disbursements')
  @ApiOperation({ summary: 'List disbursements for an organization' })
  listDisbursements(
    @Query('org_id') orgId: string,
    @Query('program_id') programId?: string,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit?: number,
  ) {
    return this.gov.listDisbursements(orgId, programId, limit);
  }

  @Get('transparency/:programId')
  @ApiOperation({ summary: 'Public transparency report for a program' })
  transparency(
    @Query('org_id') orgId: string,
    @Param('programId') programId: string,
  ) {
    return this.gov.transparencyReport(orgId, programId);
  }
}
