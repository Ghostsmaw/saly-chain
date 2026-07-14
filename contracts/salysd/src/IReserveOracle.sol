// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

/**
 * @title IReserveOracle
 * @notice On-chain view of the latest proof-of-reserves attestation. The stablecoin
 *         service updates this after custodian reconciliation; `SalySD` enforces
 *         `totalSupply() <= authorizedMintCeiling`.
 */
interface IReserveOracle {
    function authorizedMintCeiling() external view returns (uint256);

    function reserveAttestationHash() external view returns (bytes32);

    function lastAttestationAt() external view returns (uint64);

    event AttestationUpdated(
        bytes32 indexed attestationHash,
        uint256 authorizedMintCeiling,
        uint64 attestedAt
    );

    error ZeroCeiling();
    error ZeroHash();
}
