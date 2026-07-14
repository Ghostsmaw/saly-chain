import type { Wallet, BroadcastJob } from '../../generated/prisma/index.js';

export interface DispatchResult {
  txHash: string;
  signedTx: string;
  rail: 'BASE' | 'XRPL' | 'ESCROW' | 'L3';
}

export interface TxDispatcher {
  readonly rail: 'BASE' | 'XRPL' | 'ESCROW' | 'L3';
  dispatch(wallet: Wallet, job: BroadcastJob): Promise<DispatchResult>;
}
