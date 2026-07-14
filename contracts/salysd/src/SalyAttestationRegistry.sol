// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Ownable2Step, Ownable } from "@openzeppelin/contracts/access/Ownable2Step.sol";

/**
 * @title SalyAttestationRegistry
 * @notice Optional on-chain anchor for the latest reserve attestation hash + ceiling.
 *         Complements ReserveOracle — useful for public verifiability and explorer reads.
 */
contract SalyAttestationRegistry is Ownable2Step {
    struct Record {
        bytes32 attestationHash;
        uint256 authorizedMintCeiling;
        uint64 attestedAt;
    }

    Record public latest;

    event AttestationAnchored(bytes32 indexed attestationHash, uint256 authorizedMintCeiling, uint64 attestedAt);

    error ZeroHash();
    error ZeroCeiling();

    constructor(address initialOwner) Ownable(initialOwner) {
        if (initialOwner == address(0)) revert ZeroHash();
    }

    function anchor(bytes32 attestationHash, uint256 authorizedMintCeiling) external onlyOwner {
        if (attestationHash == bytes32(0)) revert ZeroHash();
        if (authorizedMintCeiling == 0) revert ZeroCeiling();
        latest = Record({
            attestationHash: attestationHash,
            authorizedMintCeiling: authorizedMintCeiling,
            attestedAt: uint64(block.timestamp)
        });
        emit AttestationAnchored(attestationHash, authorizedMintCeiling, latest.attestedAt);
    }
}
