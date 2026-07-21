import { z } from 'zod';

export const signerEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4099),
  DATABASE_URL: z.string().url(),
  /**
   * Shared secret for internal service-to-service calls. Required in
   * production — the signer holds custody key material and must never be
   * reachable by an unauthenticated caller, even inside the cluster.
   */
  INTERNAL_SERVICE_TOKEN: z.string().min(16).optional(),
  KMS_PROVIDER: z.enum(['local', 'aws']).default('local'),
  KMS_LOCAL_MASTER_KEY: z.string().min(1).optional(),
  KMS_AWS_KEY_ID: z.string().optional(),
  KMS_AWS_REGION: z.string().optional(),
  /** Optional custom endpoint (LocalStack, VPC endpoint). */
  KMS_AWS_ENDPOINT: z.string().url().optional(),
});
export type SignerEnv = z.infer<typeof signerEnvSchema>;
