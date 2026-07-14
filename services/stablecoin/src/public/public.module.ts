import { Module } from '@nestjs/common';
import { PublicController } from './public.controller.js';
import { PorService } from './por.service.js';

@Module({
  controllers: [PublicController],
  providers: [PorService],
})
export class PublicModule {}
