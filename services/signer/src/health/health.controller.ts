import { Controller, Get, Inject } from '@nestjs/common';
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service.js';
import { KMS_PROVIDER_TOKEN } from '../kms/kms.module.js';
import type { KmsProvider } from '../kms/kms.provider.js';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prismaIndicator: PrismaHealthIndicator,
    private readonly prisma: PrismaService,
    @Inject(KMS_PROVIDER_TOKEN) private readonly kms: KmsProvider,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const result = await this.health.check([
      () => this.prismaIndicator.pingCheck('database', this.prisma),
    ]);

    let kmsAvailable = false;
    try {
      await this.kms.ping();
      kmsAvailable = true;
    } catch {
      kmsAvailable = false;
    }

    const dbOk = result.status === 'ok';
    return {
      ok: dbOk && kmsAvailable,
      kms_available: kmsAvailable,
      kms_provider: this.kms.name,
      wrapping_key_ref: this.kms.wrappingKeyRef,
      version: '0.1.0',
    };
  }
}
