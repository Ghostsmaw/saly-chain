import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Injectable,
  Module,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Prisma, CasePriority, CaseStatus } from '../generated/prisma/index.js';
import { NotFoundError } from '@salychain/errors';
import { OnboardingModule } from '../onboarding/onboarding.module.js';
import { OnboardingService } from '../onboarding/onboarding.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

class UpdateCaseDto {
  @IsOptional() @IsEnum(CaseStatus) status?: CaseStatus;
  @IsOptional() @IsEnum(CasePriority) priority?: CasePriority;
  @IsOptional() @IsString() assigned_to?: string;
}

class AddNoteDto {
  @IsString() author!: string;
  @IsString() body!: string;
}

@Injectable()
class CasesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly onboarding: OnboardingService,
  ) {}

  async list(opts: { status?: CaseStatus; priority?: CasePriority; limit: number }) {
    const where: Prisma.ComplianceCaseWhereInput = {};
    if (opts.status) where.status = opts.status;
    if (opts.priority) where.priority = opts.priority;
    return this.prisma.complianceCase.findMany({
      where,
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
      take: opts.limit,
      include: { subject: true },
    });
  }

  async getById(id: string) {
    const found = await this.prisma.complianceCase.findUnique({
      where: { id },
      include: { subject: true },
    });
    if (!found) throw NotFoundError('compliance.case_not_found', `Case ${id} not found`);
    return found;
  }

  async update(id: string, patch: UpdateCaseDto) {
    const updated = await this.prisma.complianceCase.update({
      where: { id },
      data: {
        status: patch.status ?? undefined,
        priority: patch.priority ?? undefined,
        assignedTo: patch.assigned_to ?? undefined,
        resolvedAt:
          patch.status && (patch.status === 'APPROVED' || patch.status === 'REJECTED')
            ? new Date()
            : undefined,
      },
      include: { subject: true },
    });

    const externalRef = updated.subject?.externalRef;
    if (externalRef && patch.status === CaseStatus.APPROVED) {
      await this.onboarding.reviewDecision(externalRef, 'approved', patch.assigned_to ?? 'admin');
    } else if (externalRef && patch.status === CaseStatus.REJECTED) {
      await this.onboarding.reviewDecision(externalRef, 'rejected', patch.assigned_to ?? 'admin');
    }

    return updated;
  }

  async appendNote(id: string, note: AddNoteDto) {
    const current = await this.getById(id);
    const notes = Array.isArray(current.notes) ? (current.notes as unknown[]) : [];
    notes.push({ author: note.author, body: note.body, at: new Date().toISOString() });
    return this.prisma.complianceCase.update({
      where: { id },
      data: { notes: notes as Prisma.InputJsonValue },
      include: { subject: true },
    });
  }
}

@ApiTags('cases')
@Controller('cases')
class CasesController {
  constructor(private readonly cases: CasesService) {}

  @Get()
  @ApiOperation({ summary: 'List compliance cases (highest priority first)' })
  @ApiQuery({ name: 'status', required: false, enum: CaseStatus })
  @ApiQuery({ name: 'priority', required: false, enum: CasePriority })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async list(
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    @Query('status') status?: CaseStatus,
    @Query('priority') priority?: CasePriority,
  ) {
    const data = await this.cases.list({ status, priority, limit: Math.min(limit, 200) });
    return { data: data.map(toCaseResponse) };
  }

  @Get(':id')
  async byId(@Param('id') id: string) {
    return toCaseResponse(await this.cases.getById(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCaseDto) {
    return toCaseResponse(await this.cases.update(id, dto));
  }

  @Post(':id/notes')
  async addNote(@Param('id') id: string, @Body() dto: AddNoteDto) {
    return toCaseResponse(await this.cases.appendNote(id, dto));
  }
}

function toCaseResponse(c: Awaited<ReturnType<CasesService['getById']>>) {
  return {
    id: c.id,
    status: c.status,
    priority: c.priority,
    summary: c.summary,
    intent_id: c.intentId ?? undefined,
    transaction_id: c.transactionId ?? undefined,
    assigned_to: c.assignedTo ?? undefined,
    subject: c.subject
      ? {
          id: c.subject.id,
          external_ref: c.subject.externalRef,
          kind: c.subject.kind,
          display_name: c.subject.displayName ?? undefined,
          country_code: c.subject.countryCode ?? undefined,
          tier: c.subject.tier,
        }
      : null,
    notes: c.notes,
    created_at: c.createdAt.toISOString(),
    updated_at: c.updatedAt.toISOString(),
    resolved_at: c.resolvedAt?.toISOString() ?? null,
  };
}

@Module({
  imports: [OnboardingModule],
  controllers: [CasesController],
  providers: [CasesService],
  exports: [CasesService],
})
export class CasesModule {}
