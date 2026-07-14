// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title SalyAgentRegistry
 * @notice On-chain agent identity + capability hash + reputation anchor on L3.
 */
contract SalyAgentRegistry is AccessControl, ReentrancyGuard {
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    struct AgentRecord {
        address owner;
        bytes32 capabilityHash;
        bytes32 reputationHash;
        bool active;
        uint64 registeredAt;
    }

    mapping(bytes32 agentId => AgentRecord) private _agents;

    event AgentRegistered(bytes32 indexed agentId, address indexed owner, bytes32 capabilityHash);
    event AgentUpdated(bytes32 indexed agentId, bytes32 capabilityHash, bytes32 reputationHash);
    event AgentDeactivated(bytes32 indexed agentId);

    error ZeroId();
    error ZeroOwner();
    error ZeroHash();
    error AlreadyRegistered(bytes32 agentId);
    error UnknownAgent(bytes32 agentId);
    error NotOwner(bytes32 agentId, address caller);

    constructor(address admin) {
        if (admin == address(0)) revert ZeroOwner();
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(GOVERNANCE_ROLE, admin);
    }

    function register(bytes32 agentId, bytes32 capabilityHash, bytes32 reputationHash) external nonReentrant {
        if (agentId == bytes32(0)) revert ZeroId();
        if (capabilityHash == bytes32(0)) revert ZeroHash();
        if (_agents[agentId].registeredAt != 0) revert AlreadyRegistered(agentId);

        _agents[agentId] = AgentRecord({
            owner: msg.sender,
            capabilityHash: capabilityHash,
            reputationHash: reputationHash,
            active: true,
            registeredAt: uint64(block.timestamp)
        });

        emit AgentRegistered(agentId, msg.sender, capabilityHash);
    }

    function update(bytes32 agentId, bytes32 capabilityHash, bytes32 reputationHash) external nonReentrant {
        AgentRecord storage rec = _requireAgent(agentId);
        if (rec.owner != msg.sender && !hasRole(GOVERNANCE_ROLE, msg.sender)) {
            revert NotOwner(agentId, msg.sender);
        }
        if (capabilityHash == bytes32(0)) revert ZeroHash();
        rec.capabilityHash = capabilityHash;
        rec.reputationHash = reputationHash;
        emit AgentUpdated(agentId, capabilityHash, reputationHash);
    }

    function deactivate(bytes32 agentId) external nonReentrant {
        AgentRecord storage rec = _requireAgent(agentId);
        if (rec.owner != msg.sender && !hasRole(GOVERNANCE_ROLE, msg.sender)) {
            revert NotOwner(agentId, msg.sender);
        }
        rec.active = false;
        emit AgentDeactivated(agentId);
    }

    function getAgent(bytes32 agentId) external view returns (AgentRecord memory) {
        return _requireAgent(agentId);
    }

    function _requireAgent(bytes32 agentId) private view returns (AgentRecord storage rec) {
        rec = _agents[agentId];
        if (rec.registeredAt == 0) revert UnknownAgent(agentId);
    }
}
