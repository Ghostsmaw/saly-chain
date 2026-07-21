import { z } from 'zod';

export const ROUTING_ENV = Symbol('ROUTING_ENV');

export const routingEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4007),
  DATABASE_URL: z.string().url(),
  ROUTING_WEIGHT_COST: z.coerce.number().int().min(0).max(100).default(40),
  ROUTING_WEIGHT_SPEED: z.coerce.number().int().min(0).max(100).default(30),
  ROUTING_WEIGHT_RELIABILITY: z.coerce.number().int().min(0).max(100).default(20),
  ROUTING_WEIGHT_PRIVACY: z.coerce.number().int().min(0).max(100).default(10),
  ROUTING_INTERNAL_ENABLED: z.coerce.boolean().default(true),
  ROUTING_BASE_ENABLED: z.coerce.boolean().default(true),
  ROUTING_XRPL_ENABLED: z.coerce.boolean().default(true),
  ROUTING_FIAT_ENABLED: z.coerce.boolean().default(false),
  ROUTING_ESCROW_ENABLED: z.coerce.boolean().default(true),
  ROUTING_L3_ENABLED: z.coerce.boolean().default(true),
  /** Base network for on-chain DEX pair eligibility. */
  BASE_NETWORK: z.enum(['base-mainnet', 'base-sepolia']).default('base-sepolia'),
  /** Shared secret for internal service-to-service calls. Required in production. */
  INTERNAL_SERVICE_TOKEN: z.string().min(16).optional(),
});

export type RoutingEnv = z.infer<typeof routingEnvSchema>;
