import { z } from 'zod';
import { commonEnvSchema } from '@salychain/config';

export const SCM_ENV = Symbol('SCM_ENV');

export const scmEnvSchema = commonEnvSchema.extend({
  PORT: z.coerce.number().int().positive().default(4026),
  DATABASE_URL: z.string().url(),
  INTENT_BASE_URL: z.string().url().default('http://localhost:4008'),
  EXECUTION_BASE_URL: z.string().url().default('http://localhost:4003'),
  CONTRACT_REGISTRY_BASE_URL: z.string().url().default('http://localhost:4013'),
  NATS_URL: z.string().default('nats://localhost:4222'),
  ID_PREFIX: z.string().default('scm_'),
});

export type ScmEnv = z.infer<typeof scmEnvSchema>;
