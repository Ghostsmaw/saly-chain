import { encodeAbiParameters, keccak256, parseAbiParameters, type Hex } from 'viem';

export interface AttestationPayload {
  custodian: string;
  balanceMinor: bigint;
  authorizedCeilingMinor: bigint;
  asOf: string;
}

/** Deterministic attestation hash anchored on-chain and stored in Postgres. */
export function computeAttestationHash(input: AttestationPayload): Hex {
  return keccak256(
    encodeAbiParameters(
      parseAbiParameters('string custodian, uint256 balanceMinor, uint256 ceilingMinor, string asOf'),
      [input.custodian, input.balanceMinor, input.authorizedCeilingMinor, input.asOf],
    ),
  );
}

/** Convert attestation hash to bytes32 for ReserveOracle.updateAttestation. */
export function attestationHashToBytes32(hash: Hex): Hex {
  if (!/^0x[a-fA-F0-9]{64}$/.test(hash)) {
    throw new Error(`Invalid attestation hash: ${hash}`);
  }
  return hash;
}
