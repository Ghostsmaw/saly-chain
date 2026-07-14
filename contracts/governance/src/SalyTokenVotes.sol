// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Burnable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import { ERC20Capped } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import { ERC20Permit } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import { ERC20Votes } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Ownable2Step } from "@openzeppelin/contracts/access/Ownable2Step.sol";
import { Nonces } from "@openzeppelin/contracts/utils/Nonces.sol";

/**
 * @title SalyTokenVotes
 * @notice Governance-enabled $SALY — same launch switch as {SalyToken} plus ERC20Votes
 *         checkpoints for on-chain {SalyGovernor} proposals.
 *
 * @dev    Deployed alongside (not replacing) the original {SalyToken} per ADR-0020.
 *         Existing deployments keep the non-votes token; new governance stacks use this
 *         contract. Supply cap must stay within ERC20Votes' uint208 safe range.
 */
contract SalyTokenVotes is ERC20, ERC20Permit, ERC20Burnable, ERC20Votes, ERC20Capped, Ownable2Step {
    bool public activated;

    mapping(address => bool) public isAllowlisted;

    event Activated(uint256 timestamp);
    event AllowlistUpdated(address indexed account, bool allowed);

    error Saly__ZeroAddress();
    error Saly__AlreadyActivated();
    error Saly__TransfersNotActive();

    constructor(
        address initialOwner,
        address treasury,
        uint256 initialMint,
        uint256 maxSupply_
    )
        ERC20("SalyChain", "SALY")
        ERC20Permit("SalyChain")
        ERC20Capped(maxSupply_)
        Ownable(initialOwner)
    {
        if (treasury == address(0)) revert Saly__ZeroAddress();

        _setAllowlisted(initialOwner, true);
        _setAllowlisted(treasury, true);

        if (initialMint > 0) {
            _mint(treasury, initialMint);
        }
    }

    function activate() external onlyOwner {
        if (activated) revert Saly__AlreadyActivated();
        activated = true;
        emit Activated(block.timestamp);
    }

    function setAllowlisted(address account, bool allowed) external onlyOwner {
        _setAllowlisted(account, allowed);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function _maxSupply() internal view override returns (uint256) {
        return cap();
    }

    function _setAllowlisted(address account, bool allowed) internal {
        if (account == address(0)) revert Saly__ZeroAddress();
        isAllowlisted[account] = allowed;
        emit AllowlistUpdated(account, allowed);
    }

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Capped, ERC20Votes)
    {
        if (!activated && from != address(0) && to != address(0)) {
            if (!isAllowlisted[from] && !isAllowlisted[to]) {
                revert Saly__TransfersNotActive();
            }
        }
        super._update(from, to, value);
    }

    function nonces(address owner) public view override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }
}
