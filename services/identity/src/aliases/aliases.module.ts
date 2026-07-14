import { Module } from '@nestjs/common';
import { AliasesService } from './aliases.service.js';

@Module({
  providers: [AliasesService],
  exports: [AliasesService],
})
export class AliasesModule {}
