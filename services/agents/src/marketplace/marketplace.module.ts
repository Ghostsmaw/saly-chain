import { Module } from '@nestjs/common';
import { MarketplaceController, MarketplaceDiscoverController } from './marketplace.controller.js';
import { MarketplaceService } from './marketplace.service.js';

@Module({
  controllers: [MarketplaceController, MarketplaceDiscoverController],
  providers: [MarketplaceService],
  exports: [MarketplaceService],
})
export class MarketplaceModule {}
