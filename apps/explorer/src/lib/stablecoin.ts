const STABLECOIN_BASE_URL = process.env.STABLECOIN_BASE_URL ?? 'http://localhost:4022';

export interface PublicPorSnapshot {
  currency: string;
  chain: string;
  on_chain_supply_minor: string;
  reserve_total_minor: string;
  reserve_ratio_bps: number;
  supply_drift_minor: string;
  under_collateralized: boolean;
  last_snapshot_at: string | null;
  attestation: {
    hash: string;
    balance_minor: string;
    authorized_ceiling_minor: string;
    as_of: string;
    url: string | null;
    custodian: string | null;
  } | null;
  on_chain_oracle: {
    authorized_mint_ceiling: string;
    reserve_attestation_hash: string;
    last_attestation_at: string;
  } | null;
}

export interface PublicMintRow {
  id: string;
  status: string;
  amount_minor: string;
  tx_hash: string | null;
  created_at: string;
}

export interface PublicRedeemRow {
  id: string;
  status: string;
  amount_minor: string;
  payout_rail: string;
  tx_hash: string | null;
  created_at: string;
}

export async function fetchPublicPor(): Promise<PublicPorSnapshot | null> {
  try {
    const res = await fetch(`${STABLECOIN_BASE_URL}/v1/public/por`, { next: { revalidate: 30 } });
    if (!res.ok) return null;
    return res.json() as Promise<PublicPorSnapshot>;
  } catch {
    return null;
  }
}

export async function fetchPublicMints(limit = 15): Promise<PublicMintRow[]> {
  try {
    const res = await fetch(`${STABLECOIN_BASE_URL}/v1/public/mint-requests?limit=${limit}`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) return [];
    return res.json() as Promise<PublicMintRow[]>;
  } catch {
    return [];
  }
}

export async function fetchPublicRedeems(limit = 15): Promise<PublicRedeemRow[]> {
  try {
    const res = await fetch(`${STABLECOIN_BASE_URL}/v1/public/redeem-requests?limit=${limit}`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) return [];
    return res.json() as Promise<PublicRedeemRow[]>;
  } catch {
    return [];
  }
}
