import {
  HttpCustodianAdapter,
  StaticCustodianAdapter,
  attestationHashToBytes32,
  computeAttestationHash,
  isUnderCollateralized,
  reserveRatioBps,
  supplyDriftMinor,
  type CustodianAdapter,
} from '@salychain/stablecoin-por';
import {
  L3ChainAdapter,
  loadDeploymentManifest,
  resolveSalysdAddress,
} from '@salychain/chain-l3';
import { createLogger } from '@salychain/logger';
import {
  initTelemetry,
  stablecoinAttestationAgeSeconds,
  stablecoinPorRunsTotal,
  stablecoinReserveRatioBps,
  stablecoinSupplyDriftMinor,
  startWorkerObservabilityServer,
} from '@salychain/observability';
import { WalletClient } from '@salychain/sdk-internal';
import type { Address, Hex } from 'viem';
import { env } from './config.js';

const logger = createLogger({ service: 'stablecoin-por' });

interface ReserveAccountRow {
  id: string;
  custodian: string;
  balance_minor: string;
  authorized_ceiling_minor: string;
}

interface SupplySnapshotRow {
  on_chain_supply_minor: string;
  reserve_total_minor: string;
  reserve_ratio_bps: number;
  captured_at: string;
}

let shuttingDown = false;
process.on('SIGTERM', () => (shuttingDown = true));
process.on('SIGINT', () => (shuttingDown = true));

initTelemetry({
  serviceName: 'stablecoin-por',
  otelEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  env: env.NODE_ENV,
});

startWorkerObservabilityServer({
  serviceName: 'stablecoin-por',
  port: env.METRICS_PORT,
  healthCheck: () => !shuttingDown,
});

function custodianAdapter(): CustodianAdapter {
  if (env.POR_CUSTODIAN_URL) return new HttpCustodianAdapter(env.POR_CUSTODIAN_URL);
  const balance = env.POR_CUSTODIAN_BALANCE_MINOR ?? 1_000_000_000_000n;
  const ceiling = env.POR_CUSTODIAN_CEILING_MINOR ?? balance;
  return new StaticCustodianAdapter(balance, ceiling);
}

async function stablecoinFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${env.STABLECOIN_BASE_URL}${path}`, {
    ...init,
    headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) },
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`stablecoin ${path} ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

async function resolveReserveAccountId(): Promise<string> {
  if (env.POR_RESERVE_ACCOUNT_ID) return env.POR_RESERVE_ACCOUNT_ID;
  const rows = await stablecoinFetch<ReserveAccountRow[]>('/v1/reserves');
  const first = rows[0];
  if (!first) throw new Error('No reserve accounts configured in stablecoin service');
  return first.id;
}

async function sumReserveBalances(): Promise<bigint> {
  const rows = await stablecoinFetch<ReserveAccountRow[]>('/v1/reserves');
  return rows.reduce((sum, row) => sum + BigInt(row.balance_minor), 0n);
}

async function maybeUpdateOracle(input: {
  ceilingMinor: bigint;
  attestationHash: Hex;
}): Promise<void> {
  if (!env.POR_ORACLE_UPDATE_ENABLED) return;
  if (!env.POR_ORACLE_OWNER_WALLET_ID || !env.L3_RESERVE_ORACLE_ADDRESS) {
    logger.warn('POR_ORACLE_UPDATE_ENABLED but wallet/oracle address missing — skipping on-chain update');
    return;
  }

  const wallet = new WalletClient({ baseUrl: env.WALLET_BASE_URL, logger });
  await wallet.transfer({
    walletId: env.POR_ORACLE_OWNER_WALLET_ID,
    destinationAddress: env.L3_RESERVE_ORACLE_ADDRESS,
    amountMinor: '0',
    asset: 'SALYSD',
    idempotencyKey: `por-oracle:${input.attestationHash}`,
    kind: 'SALYSD_ORACLE_UPDATE',
    salysdPayload: {
      reserve_oracle: env.L3_RESERVE_ORACLE_ADDRESS,
      attestation_hash: input.attestationHash,
      ceiling_minor: input.ceilingMinor.toString(),
    },
  });
  logger.info('Submitted ReserveOracle.updateAttestation broadcast');
}

export async function runPorCycle(): Promise<void> {
  const manifest = loadDeploymentManifest(process.cwd(), env.L3_NETWORK);
  const salysdAddress = (env.L3_SALYSD_ADDRESS ?? resolveSalysdAddress(env.L3_NETWORK) ?? manifest?.assets?.SalySD) as
    | Address
    | undefined;

  const adapter = new L3ChainAdapter({
    l3Network: env.L3_NETWORK,
    rpcUrl: env.L3_L3_RPC_URL,
    logger,
  });

  const reserveAccountId = await resolveReserveAccountId();
  const custodian = custodianAdapter();
  const { balanceMinor, authorizedCeilingMinor } = await custodian.fetchBalance();
  const asOf = new Date().toISOString();
  const attestationHash = computeAttestationHash({
    custodian: env.POR_CUSTODIAN_NAME,
    balanceMinor,
    authorizedCeilingMinor,
    asOf,
  });

  await stablecoinFetch('/v1/reserves/attestations', {
    method: 'POST',
    body: JSON.stringify({
      reserve_account_id: reserveAccountId,
      attestation_hash: attestationHash,
      balance_minor: balanceMinor.toString(),
      authorized_ceiling_minor: authorizedCeilingMinor.toString(),
      attestation_url: env.POR_ATTESTATION_URL,
      as_of: asOf,
    }),
  });

  let onChainSupply = 0n;
  if (salysdAddress) {
    onChainSupply = await adapter.readSalysdTotalSupply(salysdAddress);
  } else {
    logger.warn('L3_SALYSD_ADDRESS unset — supply snapshot uses 0 on-chain supply');
  }

  const reserveTotal = await sumReserveBalances();
  const drift = supplyDriftMinor(onChainSupply, reserveTotal);
  const ratioBps = reserveRatioBps(onChainSupply, reserveTotal);

  await stablecoinFetch<SupplySnapshotRow>('/v1/supply/snapshots', {
    method: 'POST',
    body: JSON.stringify({
      chain: 'SALY_L3',
      on_chain_supply_minor: onChainSupply.toString(),
      reserve_total_minor: reserveTotal.toString(),
    }),
  });

  stablecoinSupplyDriftMinor.set(Number(drift));
  stablecoinReserveRatioBps.set(ratioBps);
  stablecoinAttestationAgeSeconds.set(0);
  stablecoinPorRunsTotal.inc({ outcome: 'success' });

  if (isUnderCollateralized(onChainSupply, reserveTotal) && drift < -env.POR_SUPPLY_DRIFT_ALERT_MINOR) {
    stablecoinPorRunsTotal.inc({ outcome: 'drift_alert' });
    logger.error(
      `Supply drift alert: on-chain=${onChainSupply} reserves=${reserveTotal} drift=${drift} bps=${ratioBps}`,
    );
  }

  await maybeUpdateOracle({
    ceilingMinor: authorizedCeilingMinor,
    attestationHash: attestationHashToBytes32(attestationHash),
  });

  logger.info(
    `PoR cycle complete hash=${attestationHash.slice(0, 10)}… supply=${onChainSupply} reserves=${reserveTotal} ratio_bps=${ratioBps}`,
  );
}

async function main(): Promise<void> {
  logger.info(`stablecoin-por worker started (interval=${env.POR_POLL_INTERVAL_MS}ms)`);

  while (!shuttingDown) {
    try {
      await runPorCycle();
    } catch (err) {
      stablecoinPorRunsTotal.inc({ outcome: 'error' });
      logger.error(`PoR cycle failed: ${(err as Error).message}`);
    }
    await new Promise((r) => setTimeout(r, env.POR_POLL_INTERVAL_MS));
  }
}

main().catch((err) => {
  logger.fatal(`stablecoin-por crashed: ${(err as Error).message}`);
  process.exit(1);
});
