import { Module } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { identityEnvSchema } from './config/env.js';
import { IDENTITY_ENV } from './config/env.runtime.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthService } from './auth/auth.service.js';
import { UsersService } from './users/users.service.js';
import { DelegationsService } from './delegations/delegations.service.js';
import { AliasesService } from './aliases/aliases.service.js';
import { AliasesModule } from './aliases/aliases.module.js';
import { IdentityController } from './identity.controller.js';

@Module({
  imports: [PrismaModule, AliasesModule],
  controllers: [IdentityController],
  providers: [
    AuthService,
    UsersService,
    DelegationsService,
    { provide: IDENTITY_ENV, useFactory: () => loadEnv(identityEnvSchema) },
  ],
  exports: [AuthService],
})
export class IdentityModule {}
