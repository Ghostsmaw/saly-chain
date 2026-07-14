import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ScreeningService } from './screening.service.js';
import { ScreenSubjectDto } from './dto.js';

@ApiTags('screening')
@Controller('screening')
export class ScreeningController {
  constructor(private readonly screening: ScreeningService) {}

  @Post('screen')
  @HttpCode(200)
  @ApiOperation({ summary: 'Run sanctions / country / PEP screening against a subject' })
  @ApiResponse({ status: 200 })
  async screen(@Body() dto: ScreenSubjectDto) {
    const outcome = await this.screening.screen({
      intentId: dto.intent_id,
      transactionId: dto.transaction_id,
      subjectRef: dto.subject_ref,
      subjectKind: dto.subject_kind,
      displayName: dto.display_name,
      countryCode: dto.country_code,
      chainAddress: dto.chain_address,
    });
    return {
      decision: outcome.decision,
      max_score: outcome.maxScore,
      run_id: outcome.runId,
      results: outcome.results.map((r) => ({
        category: r.category,
        decision: r.decision,
        score: r.score,
        matched_list_ids: r.matchedListIds,
      })),
      case_id: outcome.caseId,
    };
  }
}
