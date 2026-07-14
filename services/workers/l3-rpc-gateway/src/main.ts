import http from 'node:http';
import { createLogger } from '@salychain/logger';
import {
  initTelemetry,
  l3RpcGatewayRequestsTotal,
  l3RpcPoolLagBlocks,
  l3RpcUpstreamHealthy,
  startWorkerObservabilityServer,
} from '@salychain/observability';
import { probeL3RpcPool, rpcPoolMaxLag, type L3RpcProbeResult } from '@salychain/chain-l3';
import type { L3Network } from '@salychain/chain-l3';
import { env, parseUpstreamUrls } from './config.js';
import { isRpcMethodAllowed } from './rpc-policy.js';

const logger = createLogger({ service: 'l3-rpc-gateway' });
const upstreams = parseUpstreamUrls(env.L3_RPC_UPSTREAM_URLS);
const l3NetworkId = env.L3_NETWORK as L3Network;

let roundRobin = 0;
let probes: L3RpcProbeResult[] = [];
let shuttingDown = false;

process.on('SIGTERM', () => (shuttingDown = true));
process.on('SIGINT', () => (shuttingDown = true));

const rateBuckets = new Map<string, { count: number; resetAt: number }>();

initTelemetry({
  serviceName: 'l3-rpc-gateway',
  otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  env: env.NODE_ENV,
});

const observability = startWorkerObservabilityServer({
  serviceName: 'l3-rpc-gateway',
  port: env.METRICS_PORT,
  healthCheck: () => !shuttingDown && probes.some((p) => p.ok),
});

function pickUpstream(): string | undefined {
  const healthy = probes.filter((p) => p.ok);
  const pool = healthy.length > 0 ? healthy : probes;
  if (pool.length === 0) return upstreams[0];
  const idx = roundRobin % pool.length;
  roundRobin += 1;
  return pool[idx]?.url ?? upstreams[0];
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now >= bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (bucket.count >= env.L3_RPC_RATE_LIMIT_PER_MIN) return false;
  bucket.count += 1;
  return true;
}

async function refreshProbes(): Promise<void> {
  probes = await probeL3RpcPool({ urls: upstreams, network: l3NetworkId });
  const healthy = probes.filter((p) => p.ok).length;
  l3RpcUpstreamHealthy.set(healthy);
  l3RpcPoolLagBlocks.set(rpcPoolMaxLag(probes));
}

async function proxyJsonRpc(body: string, upstream: string): Promise<{ status: number; payload: string }> {
  const res = await fetch(upstream, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    signal: AbortSignal.timeout(30_000),
  });
  const payload = await res.text();
  return { status: res.status, payload };
}

const rpcServer = http.createServer((req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'method not allowed' }));
    return;
  }

  const clientIp = req.socket.remoteAddress ?? 'unknown';
  if (!checkRateLimit(clientIp)) {
    l3RpcGatewayRequestsTotal.inc({ method: 'unknown', outcome: 'rate_limited' });
    res.statusCode = 429;
    res.end(JSON.stringify({ jsonrpc: '2.0', error: { code: -32005, message: 'rate limit exceeded' }, id: null }));
    return;
  }

  const chunks: Buffer[] = [];
  req.on('data', (c) => chunks.push(c));
  req.on('end', () => {
    void (async () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      let parsed: { method?: string; id?: unknown };
      try {
        parsed = JSON.parse(raw) as { method?: string; id?: unknown };
      } catch {
        l3RpcGatewayRequestsTotal.inc({ method: 'invalid', outcome: 'rejected' });
        res.statusCode = 400;
        res.end(JSON.stringify({ jsonrpc: '2.0', error: { code: -32700, message: 'parse error' }, id: null }));
        return;
      }

      const method = parsed.method ?? 'unknown';
      if (!isRpcMethodAllowed(method)) {
        l3RpcGatewayRequestsTotal.inc({ method, outcome: 'blocked' });
        res.statusCode = 403;
        res.end(
          JSON.stringify({
            jsonrpc: '2.0',
            error: { code: -32601, message: 'method not permitted on public RPC' },
            id: parsed.id ?? null,
          }),
        );
        return;
      }

      const upstream = pickUpstream();
      if (!upstream) {
        l3RpcGatewayRequestsTotal.inc({ method, outcome: 'no_upstream' });
        res.statusCode = 503;
        res.end(
          JSON.stringify({
            jsonrpc: '2.0',
            error: { code: -32000, message: 'no healthy upstream' },
            id: parsed.id ?? null,
          }),
        );
        return;
      }

      try {
        const proxied = await proxyJsonRpc(raw, upstream);
        l3RpcGatewayRequestsTotal.inc({ method, outcome: proxied.status < 400 ? 'ok' : 'upstream_error' });
        res.statusCode = proxied.status;
        res.setHeader('content-type', 'application/json');
        res.end(proxied.payload);
      } catch (err) {
        logger.warn(`upstream proxy failed: ${(err as Error).message}`);
        l3RpcGatewayRequestsTotal.inc({ method, outcome: 'error' });
        res.statusCode = 502;
        res.end(
          JSON.stringify({
            jsonrpc: '2.0',
            error: { code: -32000, message: 'upstream unavailable' },
            id: parsed.id ?? null,
          }),
        );
      }
    })();
  });
});

async function main(): Promise<void> {
  await refreshProbes();
  setInterval(() => void refreshProbes(), 15_000);

  rpcServer.listen(env.L3_RPC_GATEWAY_PORT, () => {
    logger.info(
      `L3 RPC gateway listening :${env.L3_RPC_GATEWAY_PORT} → ${upstreams.length} upstream(s)`,
    );
  });

  while (!shuttingDown) {
    await new Promise((r) => setTimeout(r, 60_000));
  }

  rpcServer.close();
  observability.close();
}

main().catch((err) => {
  logger.fatal(`gateway crashed: ${(err as Error).message}`);
  process.exit(1);
});
