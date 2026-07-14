/** Scopes partners can grant when issuing API keys via the portal. */
export const PORTAL_API_KEY_SCOPES = [
  'intents:write',
  'intents:read',
  'transactions:read',
  'webhooks:write',
  'webhooks:read',
  'streams:write',
  'streams:read',
  'datashares:write',
  'datashares:read',
  'intelligence:write',
  'intelligence:read',
  'data:read',
  'wallets:read',
  'logs:read',
  'agents:read',
  'agents:write',
] as const;

export const DEFAULT_API_KEY_SCOPES: readonly string[] = [
  'intents:write',
  'intents:read',
  'transactions:read',
  'webhooks:write',
  'webhooks:read',
  'logs:read',
];

/** Webhook subjects exposed in the portal create form. */
export const PORTAL_WEBHOOK_SUBJECTS = [
  'salychain.intent.received',
  'salychain.intent.screened',
  'salychain.intent.routed',
  'salychain.intent.rejected',
  'salychain.tx.created',
  'salychain.tx.executing',
  'salychain.tx.awaiting_confirmation',
  'salychain.tx.settled',
  'salychain.tx.failed',
] as const;

export const DEFAULT_WEBHOOK_SUBJECTS: readonly string[] = [
  'salychain.intent.received',
  'salychain.tx.settled',
  'salychain.tx.failed',
];
