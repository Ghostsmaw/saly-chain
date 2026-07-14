/** Prisma-backed services and their committed migration inventory. */
export const PRISMA_SERVICES = [
  { name: 'Ledger', filter: 'service-ledger', migrations: 2, port: 4001 },
  { name: 'Wallet', filter: 'service-wallet', migrations: 1, port: 4002 },
  { name: 'Execution', filter: 'service-execution', migrations: 3, port: 4003 },
  { name: 'Compliance', filter: 'service-compliance', migrations: 1, port: 4004 },
  { name: 'Risk', filter: 'service-risk', migrations: 1, port: 4005 },
  { name: 'Liquidity', filter: 'service-liquidity', migrations: 1, port: 4006 },
  { name: 'Routing', filter: 'service-routing', migrations: 1, port: 4007 },
  { name: 'Intent', filter: 'service-intent', migrations: 1, port: 4008 },
  { name: 'API Keys', filter: 'service-apikeys', migrations: 1, port: 4009 },
  { name: 'Webhooks', filter: 'service-webhooks', migrations: 1, port: 4010 },
  { name: 'Agents', filter: 'service-agents', migrations: 1, port: 4011 },
  { name: 'Identity', filter: 'service-identity', migrations: 1, port: 4012 },
  { name: 'Signer', filter: 'signer', migrations: 1, port: 4099 },
  { name: 'Gateway', filter: 'service-gateway', migrations: 1, port: 4000 },
  { name: 'Chain listener (Base)', filter: 'worker-chain-listener-base', migrations: 1, port: null },
  { name: 'Chain listener (XRPL)', filter: 'worker-chain-listener-xrpl', migrations: 1, port: null },
  { name: 'Fiat listener', filter: 'worker-fiat-listener', migrations: 1, port: 4020 },
  { name: 'Finance', filter: 'service-finance', migrations: 1, port: 4023 },
  { name: 'Gov', filter: 'service-gov', migrations: 1, port: 4024 },
  { name: 'Agri', filter: 'service-agri', migrations: 1, port: 4025 },
  { name: 'SCM', filter: 'service-scm', migrations: 1, port: 4026 },
  { name: 'Aviation', filter: 'service-aviation', migrations: 1, port: 4027 },
  { name: 'Health', filter: 'service-health', migrations: 1, port: 4028 },
  { name: 'Edu', filter: 'service-edu', migrations: 1, port: 4029 },
] as const;

export type ServiceHealth = {
  name: string;
  port: number | null;
  status: 'healthy' | 'degraded' | 'offline';
  latencyMs?: number;
};

export async function fetchServiceHealth(): Promise<ServiceHealth[]> {
  const checks = await Promise.all(
    PRISMA_SERVICES.filter((s) => s.port != null).map(async (svc) => {
      const base = `http://localhost:${svc.port}`;
      const start = Date.now();
      try {
        const res = await fetch(`${base}/v1/health`, { cache: 'no-store', signal: AbortSignal.timeout(3_000) });
        const latencyMs = Date.now() - start;
        if (!res.ok) return { name: svc.name, port: svc.port, status: 'degraded' as const, latencyMs };
        return { name: svc.name, port: svc.port, status: 'healthy' as const, latencyMs };
      } catch {
        return { name: svc.name, port: svc.port, status: 'offline' as const };
      }
    }),
  );
  return checks;
}
