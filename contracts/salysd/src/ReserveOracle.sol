// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Ownable2Step, Ownable } from "@openzeppelin/contracts/access/Ownable2Step.sol";
import { IReserveOracle } from "./IReserveOracle.sol";

/**
 * @title ReserveOracle
 * @notice Owner-gated attestation store for SalySD mint headroom. Production owner
 *         should be a multisig or timelock controlled by treasury + audit.
 */
contract ReserveOracle is IReserveOracle, Ownable2Step {
    uint256 public authorizedMintCeiling;
    bytes32 public reserveAttestationHash;
    uint64 public lastAttestationAt;

    constructor(address initialOwner, uint256 initialCeiling, bytes32 initialAttestationHash) Ownable(initialOwner) {
        if (initialOwner == address(0)) revert ZeroHash();
        _applyAttestation(initialCeiling, initialAttestationHash);
    }

    function updateAttestation(uint256 newCeiling, bytes32 newAttestationHash) external onlyOwner {
        _applyAttestation(newCeiling, newAttestationHash);
    }

    function _applyAttestation(uint256 newCeiling, bytes32 newAttestationHash) internal {
        if (newCeiling == 0) revert ZeroCeiling();
        if (newAttestationHash == bytes32(0)) revert ZeroHash();
        authorizedMintCeiling = newCeiling;
        reserveAttestationHash = newAttestationHash;
        lastAttestationAt = uint64(block.timestamp);
        emit AttestationUpdated(newAttestationHash, newCeiling, lastAttestationAt);
    }
}
