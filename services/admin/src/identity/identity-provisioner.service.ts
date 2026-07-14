import { Inject, Injectable } from '@nestjs/common';
import { IdentityClient } from '@salychain/sdk-internal';
import { ADMIN_ENV, type AdminEnv } from '../config/env.js';

@Injectable()
export class IdentityProvisionerService {
  private readonly client: IdentityClient;
  private readonly token?: string;

  constructor(@Inject(ADMIN_ENV) env: AdminEnv) {
    this.client = new IdentityClient({ baseUrl: env.IDENTITY_BASE_URL });
    this.token = env.IDENTITY_INTERNAL_ADMIN_TOKEN;
  }

  inviteSuperAdmin(input: { email: string; displayName?: string }) {
    return this.client.inviteSuperAdmin(input, this.token);
  }

  revokeSuperAdmin(input: { email: string }) {
    return this.client.revokeSuperAdmin(input, this.token);
  }
}
