import { Module } from '@nestjs/common';
import { DatasharesService } from './datashares.service.js';
import { DatasharesController, DatasetsController } from './datashares.controller.js';
import { ProvidersModule } from '../providers/providers.module.js';

/**
 * Owns the datashare registry, run lifecycle, and cron scheduling. The RunWorker
 * (a long-lived BullMQ consumer) is registered in AppModule so it shares this
 * module's exported providers.
 */
@Module({
  imports: [ProvidersModule],
  controllers: [DatasharesController, DatasetsController],
  providers: [DatasharesService],
  exports: [DatasharesService],
})
export class SharesModule {}
