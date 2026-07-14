import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ValidationError } from '@salychain/errors';
import { FeaturesService } from './features.service.js';

@ApiTags('intelligence-features')
@Controller('features')
export class FeaturesController {
  constructor(private readonly features: FeaturesService) {}

  @Get('address')
  @ApiOperation({
    summary: 'Point-in-time feature vector for an address (consumed by services/risk)',
  })
  @ApiQuery({ name: 'chain', required: true })
  @ApiQuery({ name: 'address', required: true })
  @ApiQuery({ name: 'as_of', required: false, description: 'ISO timestamp; defaults to now' })
  async address(
    @Query('chain') chain: string,
    @Query('address') address: string,
    @Query('as_of') asOf?: string,
  ) {
    if (!chain || !address) {
      throw ValidationError('intelligence.features.invalid', 'chain and address are required');
    }
    let cutoff: Date | undefined;
    if (asOf) {
      cutoff = new Date(asOf);
      if (Number.isNaN(cutoff.getTime())) {
        throw ValidationError('intelligence.features.invalid', `invalid as_of timestamp: ${asOf}`);
      }
    }
    return this.features.getAddressFeatures(chain, address, cutoff);
  }
}
