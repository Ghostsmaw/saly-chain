export interface ReorgDetectionInput {
  checkpointBlock: bigint;
  checkpointHash: string;
  confirmations: number;
  getHashAt: (block: bigint) => Promise<string | null | undefined>;
}

export interface ReorgDetectionResult {
  rewindTo: bigint;
  fromBlock: number;
  toBlock: number;
  orphanedBlockHash: string;
}

/**
 * Compare the stored checkpoint hash with the canonical hash at that height.
 * On mismatch, rewind the listener checkpoint by `confirmations` blocks and
 * return the orphaned block range for execution to reverse affected settlements.
 */
export async function detectReorg(
  input: ReorgDetectionInput,
): Promise<ReorgDetectionResult | null> {
  if (input.checkpointBlock <= 0n || !input.checkpointHash) return null;

  const canonical = await input.getHashAt(input.checkpointBlock);
  if (!canonical || canonical === input.checkpointHash) return null;

  const rewind =
    input.checkpointBlock > BigInt(input.confirmations)
      ? input.checkpointBlock - BigInt(input.confirmations)
      : 0n;

  return {
    rewindTo: rewind,
    fromBlock: Number(rewind + 1n),
    toBlock: Number(input.checkpointBlock),
    orphanedBlockHash: input.checkpointHash,
  };
}
