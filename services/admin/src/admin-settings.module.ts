import { Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { SettingsController } from './settings/settings.controller.js';
import { SettingsService } from './settings/settings.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { SeedService } from './seed/seed.service.js';
import { MailService } from './mail/mail.service.js';
import { IdentityProvisionerService } from './identity/identity-provisioner.service.js';
import { ADMIN_ENV, adminEnvSchema, resolveAdminEnv } from './config/env.js';

@Module({
  imports: [PrismaModule],
  controllers: [SettingsController],
  providers: [
    SettingsService,
    SeedService,
    MailService,
    IdentityProvisionerService,
    { provide: ADMIN_ENV, useFactory: () => resolveAdminEnv(loadEnv(adminEnvSchema)) },
  ],
})
export class AdminSettingsModule {}
