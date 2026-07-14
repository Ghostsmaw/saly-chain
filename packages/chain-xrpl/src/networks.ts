export type XrplNetwork = 'xrpl-mainnet' | 'xrpl-testnet' | 'xrpl-devnet';

export interface XrplNetworkConfig {
  network: XrplNetwork;
  /** Public WebSocket endpoint. Override via env in production. */
  wsUrl: string;
  /** Native asset decimals (XRP uses 6 decimals: 1 XRP = 1,000,000 drops). */
  nativeDecimals: 6;
}

export const XRPL_NETWORKS: Record<XrplNetwork, XrplNetworkConfig> = {
  'xrpl-mainnet': { network: 'xrpl-mainnet', wsUrl: 'wss://xrplcluster.com', nativeDecimals: 6 },
  'xrpl-testnet': { network: 'xrpl-testnet', wsUrl: 'wss://s.altnet.rippletest.net:51233', nativeDecimals: 6 },
  'xrpl-devnet':  { network: 'xrpl-devnet',  wsUrl: 'wss://s.devnet.rippletest.net:51233', nativeDecimals: 6 },
};
