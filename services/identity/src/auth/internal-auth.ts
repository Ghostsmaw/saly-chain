import { UnauthorizedException } from '@nestjs/common';
import { loadEnv } from '@salychain/config';
import { identityEnvSchema } from '../config/env.js';

export function assertIdentityInternalAuth(authorization: string | undefined): void {
  const env = loadEnv(identityEnvSchema);
  const token = env.IDENTITY_INTERNAL_ADMIN_TOKEN;
  if (!token) {
    if (env.NODE_ENV === 'development') return;
    throw new UnauthorizedException('identity internal admin token not configured');
  }
  if (authorization !== `Bearer ${token}`) {
    throw new UnauthorizedException('invalid internal admin token');
  }
}
