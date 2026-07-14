// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title SalyAttestationRegistry
 * @notice Cross-vertical attestation anchor — hash + schema + issuer on L3, PII off-chain.
 *
 * @dev    Accredited issuers (governance-controlled) may attest; governance or the
 *         original issuer may revoke. {verify} returns validity including expiry.
 */
contract SalyAttestationRegistry is AccessControl, ReentrancyGuard {
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    struct Attestation {
        bytes32 schemaId;
        address issuer;
        bytes32 subject;
        bytes32 dataHash;
        uint64 issuedAt;
        uint64 expiresAt;
        bool revoked;
    }

    mapping(bytes32 id => Attestation) private _attestations;
    mapping(address => bool) public accreditedIssuers;

    event Attested(bytes32 indexed id, bytes32 indexed schemaId, address indexed issuer, bytes32 subject);
    event Revoked(bytes32 indexed id, address indexed revoker);
    event IssuerAccreditationUpdated(address indexed issuer, bool accredited);

    error ZeroId();
    error ZeroSchema();
    error ZeroHash();
    error AlreadyAttested(bytes32 id);
    error NotAccredited(address issuer);
    error UnknownAttestation(bytes32 id);
    error AlreadyRevoked(bytes32 id);
    error NotAuthorizedRevoker(bytes32 id, address caller);
    error ExpiryInPast(uint64 expiresAt);

    constructor(address admin) {
        if (admin == address(0)) revert ZeroHash();
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(GOVERNANCE_ROLE, admin);
    }

    function setAccreditedIssuer(address issuer, bool accredited) external onlyRole(GOVERNANCE_ROLE) {
        if (issuer == address(0)) revert ZeroHash();
        accreditedIssuers[issuer] = accredited;
        emit IssuerAccreditationUpdated(issuer, accredited);
    }

    function attest(
        bytes32 id,
        bytes32 schemaId,
        bytes32 subject,
        bytes32 dataHash,
        uint64 expiresAt
    ) external nonReentrant {
        if (id == bytes32(0)) revert ZeroId();
        if (schemaId == bytes32(0)) revert ZeroSchema();
        if (dataHash == bytes32(0)) revert ZeroHash();
        if (!accreditedIssuers[msg.sender]) revert NotAccredited(msg.sender);
        if (_attestations[id].issuedAt != 0) revert AlreadyAttested(id);
        if (expiresAt != 0 && expiresAt <= block.timestamp) revert ExpiryInPast(expiresAt);

        _attestations[id] = Attestation({
            schemaId: schemaId,
            issuer: msg.sender,
            subject: subject,
            dataHash: dataHash,
            issuedAt: uint64(block.timestamp),
            expiresAt: expiresAt,
            revoked: false
        });

        emit Attested(id, schemaId, msg.sender, subject);
    }

    function revoke(bytes32 id) external nonReentrant {
        Attestation storage record = _attestations[id];
        if (record.issuedAt == 0) revert UnknownAttestation(id);
        if (record.revoked) revert AlreadyRevoked(id);
        if (msg.sender != record.issuer && !hasRole(GOVERNANCE_ROLE, msg.sender)) {
            revert NotAuthorizedRevoker(id, msg.sender);
        }
        record.revoked = true;
        emit Revoked(id, msg.sender);
    }

    function getAttestation(bytes32 id) external view returns (Attestation memory) {
        Attestation memory record = _attestations[id];
        if (record.issuedAt == 0) revert UnknownAttestation(id);
        return record;
    }

    function verify(bytes32 id) external view returns (bool valid, Attestation memory record) {
        record = _attestations[id];
        if (record.issuedAt == 0) return (false, record);
        if (record.revoked) return (false, record);
        if (record.expiresAt != 0 && block.timestamp > record.expiresAt) return (false, record);
        return (true, record);
    }
}
