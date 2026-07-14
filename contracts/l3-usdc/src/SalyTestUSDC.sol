// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Permit } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Ownable2Step } from "@openzeppelin/contracts/access/Ownable2Step.sol";

/**
 * @title SalyTestUSDC
 * @notice A 6-decimal, USDC-shaped ERC-20 for the **Saly L3 devnet/testnet money
 *         rail only**. It exists so the custodial L3 USDC rail (wallet → signer →
 *         execution → listener) can be exercised end-to-end without bridging real
 *         Circle USDC onto a devnet.
 *
 * @dev    NOT FOR MAINNET. This is deliberately mintable:
 *           - `mint` is owner-gated (treasury/faucet operator key) and used to seed
 *             custodial treasury wallets after provisioning.
 *           - `faucet` is a rate-limited public mint so developers can self-serve
 *             devnet funds; it is bounded per call and per-address cooldown to keep
 *             a shared devnet usable. The owner can disable it entirely.
 *
 *         Matches USDC's 6 decimals so amount-minor math in packages/money
 *         and packages/chain-l3 is identical to the real asset.
 */
contract SalyTestUSDC is ERC20, ERC20Permit, Ownable2Step {
    /// @notice Maximum tokens mintable in a single faucet call (minor units).
    uint256 public faucetDripCap;

    /// @notice Minimum seconds between faucet calls per address.
    uint256 public faucetCooldown;

    /// @notice When false, the public faucet is disabled (owner mint still works).
    bool public faucetEnabled;

    /// @notice Last faucet timestamp per address (cooldown enforcement).
    mapping(address account => uint256 lastDripAt) public lastFaucetAt;

    event Minted(address indexed to, uint256 amount);
    event FaucetDripped(address indexed to, uint256 amount);
    event FaucetConfigured(bool enabled, uint256 dripCap, uint256 cooldown);

    error FaucetDisabled();
    error FaucetAmountTooLarge(uint256 requested, uint256 cap);
    error FaucetCooldownActive(uint256 availableAt);
    error ZeroAddress();
    error ZeroAmount();

    /**
     * @param owner_         Owner / faucet operator (treasury or deployer key).
     * @param faucetDripCap_ Max minor units per faucet call (e.g. 10_000e6).
     * @param faucetCooldown_ Seconds between faucet calls per address.
     */
    constructor(
        address owner_,
        uint256 faucetDripCap_,
        uint256 faucetCooldown_
    )
        ERC20("Saly Test USD Coin", "USDC")
        ERC20Permit("Saly Test USD Coin")
        Ownable(owner_)
    {
        if (owner_ == address(0)) revert ZeroAddress();
        faucetDripCap = faucetDripCap_;
        faucetCooldown = faucetCooldown_;
        faucetEnabled = true;
        emit FaucetConfigured(true, faucetDripCap_, faucetCooldown_);
    }

    /// @inheritdoc ERC20
    function decimals() public pure override returns (uint8) {
        return 6;
    }

    /**
     * @notice Owner-gated mint to seed custodial treasury wallets on devnet.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        if (to == address(0)) revert ZeroAddress();
        if (amount == 0) revert ZeroAmount();
        _mint(to, amount);
        emit Minted(to, amount);
    }

    /**
     * @notice Rate-limited public faucet for devnet self-service funding.
     * @param amount Minor units to mint; must be ≤ {faucetDripCap}.
     */
    function faucet(uint256 amount) external {
        if (!faucetEnabled) revert FaucetDisabled();
        if (amount == 0) revert ZeroAmount();
        if (amount > faucetDripCap) revert FaucetAmountTooLarge(amount, faucetDripCap);

        // First drip is always allowed; subsequent drips honor the cooldown.
        uint256 last = lastFaucetAt[msg.sender];
        if (last != 0) {
            uint256 nextAllowed = last + faucetCooldown;
            if (block.timestamp < nextAllowed) revert FaucetCooldownActive(nextAllowed);
        }

        lastFaucetAt[msg.sender] = block.timestamp;
        _mint(msg.sender, amount);
        emit FaucetDripped(msg.sender, amount);
    }

    /**
     * @notice Owner control over faucet behavior (or to disable it on shared nets).
     */
    function configureFaucet(bool enabled, uint256 dripCap, uint256 cooldown) external onlyOwner {
        faucetEnabled = enabled;
        faucetDripCap = dripCap;
        faucetCooldown = cooldown;
        emit FaucetConfigured(enabled, dripCap, cooldown);
    }
}
