import { z } from 'zod';
import { commonEnvSchema } from '@salychain/config';

export const contractRegistryEnvSchema = commonEnvSchema.extend({
  PORT: z.coerce.number().int().positive().default(4013),
  DATABASE_URL: z.string().url(),
  /** Custodial wallet with PAUSER_ROLE / governance ops on L3 or Base. */
  GOVERNANCE_EXECUTOR_WALLET_ID: z.string().uuid().optional(),
  WALLET_BASE_URL: z.string().url().default('http://localhost:4002'),
  L3_NETWORK: z.enum(['saly-devnet', 'saly-testnet', 'saly-mainnet']).default('saly-devnet'),
  L3_L3_RPC_URL: z.string().url().optional(),
  L3_ATTESTATION_REGISTRY_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  GOVERNANCE_RECONCILE_INTERVAL_MS: z.coerce.number().int().positive().default(15_000),
});

export type ContractRegistryEnv = z.infer<typeof contractRegistryEnvSchema>;
