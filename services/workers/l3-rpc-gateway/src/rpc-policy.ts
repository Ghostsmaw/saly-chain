/** JSON-RPC methods blocked on the public gateway (read-only + eth_call). */
export const BLOCKED_RPC_METHODS = new Set([
  'eth_sendrawtransaction',
  'eth_sendtransaction',
  'personal_sign',
  'personal_ecrecover',
  'eth_sign',
  'eth_signtypeddata',
  'eth_signtypeddata_v4',
  'debug_traceblockbyhash',
  'debug_traceblockbynumber',
  'debug_tracetransaction',
  'admin_addpeer',
  'admin_removepeer',
  'miner_start',
  'miner_stop',
]);

export const ALLOWED_RPC_METHOD_PREFIXES = ['eth_', 'net_', 'web3_'] as const;

export function isRpcMethodAllowed(method: string): boolean {
  const lower = method.toLowerCase();
  if (BLOCKED_RPC_METHODS.has(lower)) return false;
  if (lower === 'eth_call' || lower === 'eth_estimategas') return true;
  return ALLOWED_RPC_METHOD_PREFIXES.some((p) => lower.startsWith(p));
}
