import { z } from 'zod';
import { commonEnvSchema } from '@salychain/config';

export const AGRI_ENV = Symbol('AGRI_ENV');

export const agriEnvSchema = commonEnvSchema.extend({
  PORT: z.coerce.number().int().positive().default(4025),
  DATABASE_URL: z.string().url(),
  INTENT_BASE_URL: z.string().url().default('http://localhost:4008'),
  EXECUTION_BASE_URL: z.string().url().default('http://localhost:4003'),
  CONTRACT_REGISTRY_BASE_URL: z.string().url().default('http://localhost:4013'),
  NATS_URL: z.string().default('nats://localhost:4222'),
  ID_PREFIX: z.string().default('agr_'),
});

export type AgriEnv = z.infer<typeof agriEnvSchema>;
