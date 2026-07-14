import { Injectable } from '@nestjs/common';
import { encodePausablePause, encodePausableUnpause } from '@salychain/chain-l3';
import { ValidationError } from '@salychain/errors';
import { WalletClient } from '@salychain/sdk-internal';
import type { Hex } from 'viem';
import {
  ControlKind,
  ExecutionMode,
  ProposalStatus,
  type DeployedContract,
} from '../generated/prisma/index.js';
import { PrismaService } from '../prisma/prisma.service.js';

function pauseCalldata(action: 'pause' | 'resume'): Hex {
  return action === 'pause' ? encodePausablePause() : encodePausableUnpause();
}

function chainForNetwork(network: string): 'SALY_L3' | 'BASE' | null {
  const n = network.toLowerCase();
  if (n.includes('l3') || n === 'saly_l3') return 'SALY_L3';
  if (n === 'base') return 'BASE';
  return null;
}

@Injectable()
export class GovernanceExecutorService {
  private readonly wallet?: WalletClient;

  constructor(
    private readonly prisma: PrismaService,
    walletBaseUrl: string,
    private readonly executorWalletId?: string,
  ) {
    if (executorWalletId) {
      this.wallet = new WalletClient({ baseUrl: walletBaseUrl });
    }
  }

  async submitOnChainPause(
    contract: DeployedContract,
    proposalId: string,
    action: 'pause' | 'resume',
  ): Promise<{ broadcastJobId: string; calldata: Hex }> {
    if (contract.controlKind !== ControlKind.PAUSABLE) {
      throw ValidationError(
        'governance.not_pausable',
        `Contract ${contract.id} is not registered as pausable on-chain`,
      );
    }
    const calldata = pauseCalldata(action);
    return this.submitRawCall({
      contract,
      idempotencyKey: `gov:${proposalId}`,
      calldata,
      onSubmitted: async (broadcastJobId) => {
        await this.prisma.statusProposal.update({
          where: { id: proposalId },
          data: {
            status: ProposalStatus.SUBMITTED,
            calldata,
            broadcastJobId,
          },
        });
      },
    });
  }

  async submitRawCall(input: {
    contract: DeployedContract;
    idempotencyKey: string;
    calldata: Hex;
    onSubmitted?: (broadcastJobId: string) => Promise<void>;
  }): Promise<{ broadcastJobId: string; calldata: Hex }> {
    if (!this.wallet || !this.executorWalletId) {
      throw ValidationError(
        'governance.executor_unconfigured',
        'GOVERNANCE_EXECUTOR_WALLET_ID is required for on-chain execution',
      );
    }

    const chain = chainForNetwork(input.contract.network);
    if (!chain) {
      throw ValidationError(
        'governance.unsupported_network',
        `On-chain execution not supported for network ${input.contract.network}`,
      );
    }

    const transfer = await this.wallet.transfer({
      walletId: this.executorWalletId,
      destinationAddress: input.contract.address,
      amountMinor: '0',
      asset: chain === 'SALY_L3' ? 'SALYSD' : 'ETH',
      idempotencyKey: input.idempotencyKey,
      kind: 'CONTRACT_CALL',
      contractCallPayload: {
        contract: input.contract.address,
        calldata: input.calldata,
        chain,
      },
    });

    if (input.onSubmitted) {
      await input.onSubmitted(transfer.id);
    }

    return { broadcastJobId: transfer.id, calldata: input.calldata };
  }
}

export { pauseCalldata, chainForNetwork };
