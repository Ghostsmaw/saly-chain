/**
 * Milestone D6 exit gate — PoR public API, supply metrics, and worker health.
 */
import { loadDeploymentManifest } from './deployments.js';
import { resolveSalysdAddress } from './assets.js';
import type { L3Network } from './network.js';

export interface StablecoinVerifyInput {
  stablecoinBaseUrl: string;
  porMetricsUrl?: string;
  l3Network?: L3Network;
  cwd?: string;
}

export interface StablecoinVerifyResult {
  ok: boolean;
  checks: Array<{ name: string; ok: boolean; detail?: string }>;
}

export async function verifyStablecoinExit(input: StablecoinVerifyInput): Promise<StablecoinVerifyResult> {
  const checks: StablecoinVerifyResult['checks'] = [];
  const network = input.l3Network ?? 'saly-testnet';
  const manifest = loadDeploymentManifest(input.cwd ?? process.cwd(), network);
  const salysd = resolveSalysdAddress(network, input.cwd ?? process.cwd());

  try {
    const health = await fetch(`${input.stablecoinBaseUrl}/v1/health`, { signal: AbortSignal.timeout(10_000) });
    checks.push({ name: 'stablecoin_health', ok: health.ok, detail: `status=${health.status}` });
  } catch (err) {
    checks.push({ name: 'stablecoin_health', ok: false, detail: (err as Error).message });
  }

  try {
    const por = await fetch(`${input.stablecoinBaseUrl}/v1/public/por`, { signal: AbortSignal.timeout(10_000) });
    if (por.ok) {
      const body = (await por.json()) as { under_collateralized?: boolean; reserve_ratio_bps?: number };
      checks.push({
        name: 'public_por',
        ok: body.under_collateralized !== true,
        detail: `ratio_bps=${body.reserve_ratio_bps ?? 'unknown'}`,
      });
    } else {
      checks.push({ name: 'public_por', ok: false, detail: `status=${por.status}` });
    }
  } catch (err) {
    checks.push({ name: 'public_por', ok: false, detail: (err as Error).message });
  }

  checks.push({
    name: 'salysd_manifest',
    ok: Boolean(salysd ?? manifest?.assets?.SalySD),
    detail: salysd ?? manifest?.assets?.SalySD ?? 'missing',
  });

  if (input.porMetricsUrl) {
    try {
      const metrics = await fetch(input.porMetricsUrl, { signal: AbortSignal.timeout(10_000) });
      const text = await metrics.text();
      const hasDrift = text.includes('salychain_stablecoin_supply_drift_minor');
      checks.push({ name: 'por_metrics', ok: metrics.ok && hasDrift, detail: hasDrift ? 'drift gauge present' : 'missing gauge' });
    } catch (err) {
      checks.push({ name: 'por_metrics', ok: false, detail: (err as Error).message });
    }
  }

  const ok = checks.every((c) => c.ok);
  return { ok, checks };
}
