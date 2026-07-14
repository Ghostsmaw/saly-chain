import { z } from 'zod';

export const signerEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4099),
  DATABASE_URL: z.string().url(),
  KMS_PROVIDER: z.enum(['local', 'aws']).default('local'),
  KMS_LOCAL_MASTER_KEY: z.string().min(1).optional(),
  KMS_AWS_KEY_ID: z.string().optional(),
  KMS_AWS_REGION: z.string().optional(),
  /** Optional custom endpoint (LocalStack, VPC endpoint). */
  KMS_AWS_ENDPOINT: z.string().url().optional(),
});
export type SignerEnv = z.infer<typeof signerEnvSchema>;
