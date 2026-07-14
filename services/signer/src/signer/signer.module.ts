import { Module } from '@nestjs/common';
import { SignerController } from './signer.controller.js';
import { SignerService } from './signer.service.js';
import { PolicyEngine } from './policy.engine.js';

@Module({
  controllers: [SignerController],
  providers: [SignerService, PolicyEngine],
  exports: [SignerService, PolicyEngine],
})
export class SignerModule {}
