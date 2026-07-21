import { z } from 'zod';
import { commonEnvSchema } from '@salychain/config';

export const EDU_ENV = Symbol('EDU_ENV');

export const eduEnvSchema = commonEnvSchema.extend({
  PORT: z.coerce.number().int().positive().default(4029),
  DATABASE_URL: z.string().url(),
  INTENT_BASE_URL: z.string().url().default('http://localhost:4008'),
  EXECUTION_BASE_URL: z.string().url().default('http://localhost:4003'),
  CONTRACT_REGISTRY_BASE_URL: z.string().url().default('http://localhost:4013'),
  NATS_URL: z.string().default('nats://localhost:4222'),
  ID_PREFIX: z.string().default('edu_'),
  /** Shared secret for internal service-to-service calls. Required in production. */
  INTERNAL_SERVICE_TOKEN: z.string().min(16).optional(),

});

export type EduEnv = z.infer<typeof eduEnvSchema>;
