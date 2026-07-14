import { Module } from '@nestjs/common';
import { S3ShareProvider } from './s3.provider.js';
import { ProviderRegistry } from './provider.registry.js';

@Module({
  providers: [S3ShareProvider, ProviderRegistry],
  exports: [ProviderRegistry],
})
export class ProvidersModule {}
