import { Module } from '@nestjs/common';
import { EntitiesService } from '../entities/entities.service.js';
import { EntitiesController } from '../entities/entities.controller.js';
import { FeaturesService } from '../features/features.service.js';
import { FeaturesController } from '../features/features.controller.js';
import { EmbeddingsService } from '../embeddings/embeddings.service.js';
import { EmbeddingsController } from '../embeddings/embeddings.controller.js';
import { NlService } from '../nl/nl.service.js';
import { NlController } from '../nl/nl.controller.js';
import { RunWorker } from '../runs/run.worker.js';

@Module({
  controllers: [EntitiesController, FeaturesController, EmbeddingsController, NlController],
  providers: [EntitiesService, FeaturesService, EmbeddingsService, NlService, RunWorker],
  exports: [EntitiesService, FeaturesService, EmbeddingsService, NlService],
})
export class IntelligenceModule {}
