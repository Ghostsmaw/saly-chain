// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Ownable2Step } from "@openzeppelin/contracts/access/Ownable2Step.sol";

/**
 * @title SalyStaking
 * @notice Linear staking-rewards distributor for $SALY, following the audited
 *         Synthetix `StakingRewards` design. Users stake `stakingToken` and
 *         accrue `rewardsToken` continuously over a reward period.
 *
 * @dev    Mechanics:
 *           - Rewards are funded by transferring `rewardsToken` to this contract
 *             and then calling {notifyRewardAmount}. The contract verifies the
 *             reward rate is fully backed by its balance, so a period can never
 *             promise more than it holds (the core Synthetix safety invariant).
 *           - Accrual uses the canonical `rewardPerToken` accumulator; gas cost
 *             is O(1) per user action regardless of staker count.
 *           - Re-entrancy guarded on every external state-mutating entry, with
 *             SafeERC20 for non-standard tokens.
 *
 *         When `stakingToken == rewardsToken` (the $SALY single-asset case),
 *         {recoverERC20} refuses to touch the staking token so staked principal
 *         and unpaid rewards can never be swept by the owner.
 */
contract SalyStaking is ReentrancyGuard, Ownable2Step {
    using SafeERC20 for IERC20;

    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardsToken;

    uint256 public periodFinish;
    uint256 public rewardRate;
    uint256 public rewardsDuration = 7 days;
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;

    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;

    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event RewardAdded(uint256 reward, uint256 periodFinish);
    event RewardsDurationUpdated(uint256 newDuration);
    event Recovered(address token, uint256 amount);

    error Staking__ZeroAddress();
    error Staking__ZeroAmount();
    error Staking__RewardTooHigh();
    error Staking__PeriodActive();
    error Staking__CannotRecoverStakingToken();

    constructor(address initialOwner, address _stakingToken, address _rewardsToken) Ownable(initialOwner) {
        if (_stakingToken == address(0) || _rewardsToken == address(0)) revert Staking__ZeroAddress();
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = lastTimeRewardApplicable();
        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    // ───────────────────────────── Views ─────────────────────────────

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    function lastTimeRewardApplicable() public view returns (uint256) {
        return block.timestamp < periodFinish ? block.timestamp : periodFinish;
    }

    function rewardPerToken() public view returns (uint256) {
        if (_totalSupply == 0) {
            return rewardPerTokenStored;
        }
        return rewardPerTokenStored
            + ((lastTimeRewardApplicable() - lastUpdateTime) * rewardRate * 1e18) / _totalSupply;
    }

    function earned(address account) public view returns (uint256) {
        return (_balances[account] * (rewardPerToken() - userRewardPerTokenPaid[account])) / 1e18
            + rewards[account];
    }

    function getRewardForDuration() external view returns (uint256) {
        return rewardRate * rewardsDuration;
    }

    // ───────────────────────────── Staker actions ─────────────────────────────

    function stake(uint256 amount) external nonReentrant updateReward(msg.sender) {
        if (amount == 0) revert Staking__ZeroAmount();
        _totalSupply += amount;
        _balances[msg.sender] += amount;
        stakingToken.safeTransferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount) public nonReentrant updateReward(msg.sender) {
        if (amount == 0) revert Staking__ZeroAmount();
        _totalSupply -= amount;
        _balances[msg.sender] -= amount;
        stakingToken.safeTransfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    function getReward() public nonReentrant updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            rewardsToken.safeTransfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward);
        }
    }

    /// @notice Withdraw the full stake and claim rewards in one transaction.
    function exit() external {
        withdraw(_balances[msg.sender]);
        getReward();
    }

    // ───────────────────────────── Admin ─────────────────────────────

    /**
     * @notice Start (or top up) a reward period. Reward tokens must already be
     *         held by this contract. Reverts unless the resulting rate is fully
     *         backed by the balance, so a period cannot over-promise.
     */
    function notifyRewardAmount(uint256 reward) external onlyOwner updateReward(address(0)) {
        if (block.timestamp >= periodFinish) {
            rewardRate = reward / rewardsDuration;
        } else {
            uint256 remaining = periodFinish - block.timestamp;
            uint256 leftover = remaining * rewardRate;
            rewardRate = (reward + leftover) / rewardsDuration;
        }

        uint256 balance = rewardsToken.balanceOf(address(this));
        // When staking and reward tokens are the same, staked principal must not
        // back rewards — only the surplus balance can.
        if (stakingToken == rewardsToken) {
            balance -= _totalSupply;
        }
        if (rewardRate > balance / rewardsDuration) revert Staking__RewardTooHigh();

        lastUpdateTime = block.timestamp;
        periodFinish = block.timestamp + rewardsDuration;
        emit RewardAdded(reward, periodFinish);
    }

    /// @notice Update the reward period length. Only between periods.
    function setRewardsDuration(uint256 _rewardsDuration) external onlyOwner {
        if (block.timestamp <= periodFinish) revert Staking__PeriodActive();
        if (_rewardsDuration == 0) revert Staking__ZeroAmount();
        rewardsDuration = _rewardsDuration;
        emit RewardsDurationUpdated(_rewardsDuration);
    }

    /// @notice Rescue tokens accidentally sent here. Never the staking token.
    function recoverERC20(address token, uint256 amount) external onlyOwner {
        if (token == address(stakingToken)) revert Staking__CannotRecoverStakingToken();
        IERC20(token).safeTransfer(owner(), amount);
        emit Recovered(token, amount);
    }
}
