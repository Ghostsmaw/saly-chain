// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Burnable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import { ERC20Pausable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import { ERC20Permit } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { IReserveOracle } from "./IReserveOracle.sol";

/**
 * @title SalySD
 * @notice Native SalyChain stablecoin — 6-decimal, reserve-oracle-gated mint,
 *         role-gated burn, pausable transfers, and sanctions blocklist.
 *
 * @dev    Mint requires `MINTER_ROLE` and headroom from {IReserveOracle}.
 *         Burn requires `BURNER_ROLE` (redeem unwind). Pause blocks transfers
 *         only; mint/burn remain available to privileged roles for treasury ops.
 */
contract SalySD is ERC20, ERC20Burnable, ERC20Pausable, ERC20Permit, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant BLOCKLIST_ADMIN_ROLE = keccak256("BLOCKLIST_ADMIN_ROLE");

    IReserveOracle public immutable reserveOracle;

    /// @notice Max age of a reserve attestation before mint is rejected.
    ///         Defaults to 1 day; admin may tighten/loosen within [1 hour, 30 days].
    uint64 public maxAttestationAge = 1 days;

    mapping(address account => bool blocked) private _blocked;

    event BlocklistUpdated(address indexed account, bool blocked);
    event Minted(address indexed to, uint256 amount, uint256 totalSupplyAfter);
    event Burned(address indexed from, uint256 amount, uint256 totalSupplyAfter);
    event MaxAttestationAgeUpdated(uint64 previousAge, uint64 newAge);

    error ZeroAddress();
    error ZeroAmount();
    error Blocklisted(address account);
    error ExceedsMintCeiling(uint256 requested, uint256 ceiling, uint256 currentSupply);
    error StaleAttestation(uint64 attestedAt, uint64 maxAge, uint64 nowTs);
    error MissingAttestationHash();
    error InvalidAttestationAge();

    constructor(address admin, address minter, address burner, IReserveOracle oracle_)
        ERC20("Saly Dollar", "SalySD")
        ERC20Permit("Saly Dollar")
    {
        if (admin == address(0) || minter == address(0) || burner == address(0)) revert ZeroAddress();
        if (address(oracle_) == address(0)) revert ZeroAddress();

        reserveOracle = oracle_;

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, minter);
        _grantRole(BURNER_ROLE, burner);
        _grantRole(PAUSER_ROLE, admin);
        _grantRole(BLOCKLIST_ADMIN_ROLE, admin);
    }

    function setMaxAttestationAge(uint64 newAge) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (newAge < 1 hours || newAge > 30 days) revert InvalidAttestationAge();
        uint64 previous = maxAttestationAge;
        maxAttestationAge = newAge;
        emit MaxAttestationAgeUpdated(previous, newAge);
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }

    function isBlocked(address account) external view returns (bool) {
        return _blocked[account];
    }

    function setBlocked(address account, bool blocked) external onlyRole(BLOCKLIST_ADMIN_ROLE) {
        if (account == address(0)) revert ZeroAddress();
        _blocked[account] = blocked;
        emit BlocklistUpdated(account, blocked);
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        if (to == address(0)) revert ZeroAddress();
        if (amount == 0) revert ZeroAmount();
        if (_blocked[to]) revert Blocklisted(to);

        // PoR freshness: a stale/zero attestation must not authorize minting
        // against a ceiling that no longer reflects reserve reality.
        if (reserveOracle.reserveAttestationHash() == bytes32(0)) revert MissingAttestationHash();
        uint64 attestedAt = reserveOracle.lastAttestationAt();
        if (attestedAt == 0 || block.timestamp > uint256(attestedAt) + uint256(maxAttestationAge)) {
            revert StaleAttestation(attestedAt, maxAttestationAge, uint64(block.timestamp));
        }

        uint256 supplyAfter = totalSupply() + amount;
        uint256 ceiling = reserveOracle.authorizedMintCeiling();
        if (supplyAfter > ceiling) {
            revert ExceedsMintCeiling(amount, ceiling, totalSupply());
        }

        _mint(to, amount);
        emit Minted(to, amount, supplyAfter);
    }

    function burn(uint256) public pure override {
        revert ZeroAmount();
    }

    function burnFrom(address from, uint256 amount) public override onlyRole(BURNER_ROLE) {
        if (from == address(0)) revert ZeroAddress();
        if (amount == 0) revert ZeroAmount();
        _spendAllowance(from, _msgSender(), amount);
        _burn(from, amount);
        emit Burned(from, amount, totalSupply());
    }

    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Pausable) {
        if (from != address(0) && _blocked[from]) revert Blocklisted(from);
        if (to != address(0) && _blocked[to]) revert Blocklisted(to);
        // Pause halts peer transfers only; mint/burn remain available to privileged roles.
        if (from != address(0) && to != address(0)) {
            super._update(from, to, value);
        } else {
            ERC20._update(from, to, value);
        }
    }
}
