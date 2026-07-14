// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Burnable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import { ERC20Capped } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import { ERC20Permit } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Ownable2Step } from "@openzeppelin/contracts/access/Ownable2Step.sol";

/**
 * @title SalyToken ($SALY)
 * @notice Utility-first ERC-20 for the SalyChain network. Capped supply, EIP-2612
 *         permit (gasless approvals), burnable, and two-step ownership.
 *
 * @dev    The launch switch — the headline requirement:
 *
 *           - The token deploys in a **pre-launch** state (`activated == false`).
 *             While not activated, only allowlisted addresses can send or receive
 *             token transfers. This lets the team mint the initial allocation,
 *             seed liquidity, fund the staking contract, and wire integrations
 *             *before* the public can trade — without any window where supply
 *             leaks into the open market.
 *
 *           - Minting (`from == address(0)`) and burning (`to == address(0)`) are
 *             always permitted regardless of activation, so treasury operations
 *             and distribution work pre-launch.
 *
 *           - `activate()` is a **one-way** owner switch. Once flipped, public
 *             transfers are open forever; there is deliberately no "pause" or
 *             "deactivate" path (a re-lockable token is a rug vector). Operators
 *             flip it "when we are ready or whenever we want".
 *
 *         Supply policy:
 *           - Hard cap enforced by {ERC20Capped}. `maxSupply` is immutable.
 *           - `mint` is owner-gated and bounded by the cap. Typical use: mint the
 *             initial treasury allocation at deploy, then mint staking rewards on
 *             a schedule up to the cap. Renounce or transfer ownership to a
 *             timelock/multisig once distribution policy is fixed.
 */
contract SalyToken is ERC20, ERC20Burnable, ERC20Capped, ERC20Permit, Ownable2Step {
    /// @notice True once public transfers are live. One-way; never reset.
    bool public activated;

    /// @notice Addresses permitted to move tokens before activation (treasury,
    ///         staking, liquidity manager, distribution multisig, …).
    mapping(address => bool) public isAllowlisted;

    event Activated(uint256 timestamp);
    event AllowlistUpdated(address indexed account, bool allowed);

    error Saly__ZeroAddress();
    error Saly__AlreadyActivated();
    error Saly__TransfersNotActive();

    /**
     * @param initialOwner Owner/admin (single key in dev; multisig/timelock in prod).
     * @param treasury     Recipient of the initial mint and a pre-launch allowlisted mover.
     * @param initialMint  Amount minted to `treasury` at deploy (<= maxSupply_). May be 0.
     * @param maxSupply_   Immutable hard cap on total supply. Must be > 0.
     */
    constructor(
        address initialOwner,
        address treasury,
        uint256 initialMint,
        uint256 maxSupply_
    )
        ERC20("SalyChain", "SALY")
        ERC20Capped(maxSupply_)
        ERC20Permit("SalyChain")
        Ownable(initialOwner)
    {
        if (treasury == address(0)) revert Saly__ZeroAddress();

        // Owner and treasury can move tokens during the pre-launch window.
        _setAllowlisted(initialOwner, true);
        _setAllowlisted(treasury, true);

        if (initialMint > 0) {
            _mint(treasury, initialMint);
        }
    }

    /**
     * @notice Flip the launch switch on. Public transfers become permanently
     *         enabled. Owner-only and idempotent-guarded (reverts if already on).
     */
    function activate() external onlyOwner {
        if (activated) revert Saly__AlreadyActivated();
        activated = true;
        emit Activated(block.timestamp);
    }

    /**
     * @notice Add or remove an address from the pre-launch transfer allowlist.
     *         No effect on behaviour once `activated` is true.
     */
    function setAllowlisted(address account, bool allowed) external onlyOwner {
        _setAllowlisted(account, allowed);
    }

    /**
     * @notice Mint new tokens up to the cap. Owner-only.
     * @dev    The cap is enforced in {ERC20Capped-_update}.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function _setAllowlisted(address account, bool allowed) internal {
        if (account == address(0)) revert Saly__ZeroAddress();
        isAllowlisted[account] = allowed;
        emit AllowlistUpdated(account, allowed);
    }

    /**
     * @dev Single transfer hook (OZ v5). Enforces the launch gate while leaving
     *      mint/burn unrestricted, then defers to {ERC20Capped} for cap checks.
     */
    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Capped) {
        if (!activated && from != address(0) && to != address(0)) {
            if (!isAllowlisted[from] && !isAllowlisted[to]) {
                revert Saly__TransfersNotActive();
            }
        }
        super._update(from, to, value);
    }
}
