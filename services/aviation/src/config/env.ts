import { z } from 'zod';
import { commonEnvSchema } from '@salychain/config';

export const AVIATION_ENV = Symbol('AVIATION_ENV');

export const aviationEnvSchema = commonEnvSchema.extend({
  PORT: z.coerce.number().int().positive().default(4027),
  DATABASE_URL: z.string().url(),
  INTENT_BASE_URL: z.string().url().default('http://localhost:4008'),
  EXECUTION_BASE_URL: z.string().url().default('http://localhost:4003'),
  CONTRACT_REGISTRY_BASE_URL: z.string().url().default('http://localhost:4013'),
  NATS_URL: z.string().default('nats://localhost:4222'),
  ID_PREFIX: z.string().default('avn_'),
});

export type AviationEnv = z.infer<typeof aviationEnvSchema>;
