// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Test } from "forge-std/Test.sol";
import { SalyToken } from "../src/SalyToken.sol";
import { SalyStaking } from "../src/SalyStaking.sol";

contract SalyStakingTest is Test {
    SalyToken internal token;
    SalyStaking internal staking;

    address internal owner = address(0xA11CE);
    address internal treasury = address(0x7);
    address internal alice = address(0xA);
    address internal bob = address(0xB);

    uint256 internal constant MAX_SUPPLY = 1_000_000_000e18;
    uint256 internal constant INITIAL_MINT = 100_000_000e18;
    uint256 internal constant REWARD = 7_000e18; // 1000/day over 7 days

    function setUp() public {
        token = new SalyToken(owner, treasury, INITIAL_MINT, MAX_SUPPLY);
        staking = new SalyStaking(owner, address(token), address(token));

        vm.startPrank(owner);
        token.setAllowlisted(address(staking), true);
        token.activate(); // open transfers so stakers can move freely
        vm.stopPrank();

        // Seed stakers and the reward pool from treasury.
        vm.startPrank(treasury);
        token.transfer(alice, 10_000e18);
        token.transfer(bob, 10_000e18);
        token.transfer(address(staking), REWARD); // pre-fund rewards
        vm.stopPrank();

        vm.prank(alice);
        token.approve(address(staking), type(uint256).max);
        vm.prank(bob);
        token.approve(address(staking), type(uint256).max);
    }

    function _notify(uint256 reward) internal {
        vm.prank(owner);
        staking.notifyRewardAmount(reward);
    }

    // ───────────────────────────── Stake / withdraw ─────────────────────────────

    function test_stake_updatesBalances() public {
        vm.prank(alice);
        staking.stake(1_000e18);
        assertEq(staking.totalSupply(), 1_000e18);
        assertEq(staking.balanceOf(alice), 1_000e18);
        assertEq(token.balanceOf(address(staking)), REWARD + 1_000e18);
    }

    function test_stake_zero_reverts() public {
        vm.prank(alice);
        vm.expectRevert(SalyStaking.Staking__ZeroAmount.selector);
        staking.stake(0);
    }

    function test_withdraw_returnsPrincipal() public {
        vm.startPrank(alice);
        staking.stake(1_000e18);
        staking.withdraw(400e18);
        vm.stopPrank();
        assertEq(staking.balanceOf(alice), 600e18);
        assertEq(token.balanceOf(alice), 10_000e18 - 600e18);
    }

    // ───────────────────────────── Rewards ─────────────────────────────

    function test_earned_accruesOverPeriod() public {
        vm.prank(alice);
        staking.stake(1_000e18);
        _notify(REWARD);

        vm.warp(block.timestamp + staking.rewardsDuration());

        // Sole staker earns ~the entire reward (minus integer-division dust).
        uint256 earned = staking.earned(alice);
        assertApproxEqAbs(earned, REWARD, 1e12);
    }

    function test_getReward_paysOut() public {
        vm.prank(alice);
        staking.stake(1_000e18);
        _notify(REWARD);
        vm.warp(block.timestamp + staking.rewardsDuration());

        uint256 before = token.balanceOf(alice);
        vm.prank(alice);
        staking.getReward();
        assertApproxEqAbs(token.balanceOf(alice) - before, REWARD, 1e12);
        assertEq(staking.rewards(alice), 0);
    }

    function test_exit_withdrawsAndClaims() public {
        vm.prank(alice);
        staking.stake(1_000e18);
        _notify(REWARD);
        vm.warp(block.timestamp + staking.rewardsDuration());

        vm.prank(alice);
        staking.exit();
        assertEq(staking.balanceOf(alice), 0);
        // principal back + rewards
        assertApproxEqAbs(token.balanceOf(alice), 10_000e18 + REWARD, 1e12);
    }

    function test_twoStakers_splitProportionally() public {
        vm.prank(alice);
        staking.stake(1_000e18);
        vm.prank(bob);
        staking.stake(3_000e18);

        _notify(REWARD);
        vm.warp(block.timestamp + staking.rewardsDuration());

        uint256 aliceEarned = staking.earned(alice);
        uint256 bobEarned = staking.earned(bob);
        // bob staked 3x alice → ~3x rewards
        assertApproxEqAbs(bobEarned, aliceEarned * 3, 1e12);
        assertApproxEqAbs(aliceEarned + bobEarned, REWARD, 1e12);
    }

    // ───────────────────────────── notifyRewardAmount safety ─────────────────────────────

    function test_notify_overBalance_reverts() public {
        // Only REWARD is funded; promising 2x must revert.
        vm.prank(owner);
        vm.expectRevert(SalyStaking.Staking__RewardTooHigh.selector);
        staking.notifyRewardAmount(REWARD * 2);
    }

    function test_notify_singleAsset_excludesStakedPrincipal() public {
        // Stake a large principal; it must NOT be usable as reward backing.
        vm.prank(alice);
        staking.stake(5_000e18);

        // Contract holds REWARD (rewards) + 5_000e18 (principal). Promising more
        // than REWARD must revert because principal is excluded.
        vm.prank(owner);
        vm.expectRevert(SalyStaking.Staking__RewardTooHigh.selector);
        staking.notifyRewardAmount(REWARD + 1e18);

        // Exactly the funded reward is fine.
        vm.prank(owner);
        staking.notifyRewardAmount(REWARD);
    }

    function test_notify_onlyOwner() public {
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", alice));
        vm.prank(alice);
        staking.notifyRewardAmount(REWARD);
    }

    // ───────────────────────────── Duration ─────────────────────────────

    function test_setRewardsDuration_duringPeriod_reverts() public {
        _notify(REWARD);
        vm.prank(owner);
        vm.expectRevert(SalyStaking.Staking__PeriodActive.selector);
        staking.setRewardsDuration(14 days);
    }

    function test_setRewardsDuration_afterPeriod_ok() public {
        _notify(REWARD);
        vm.warp(block.timestamp + staking.rewardsDuration() + 1);
        vm.prank(owner);
        staking.setRewardsDuration(14 days);
        assertEq(staking.rewardsDuration(), 14 days);
    }

    // ───────────────────────────── Recovery ─────────────────────────────

    function test_recover_stakingToken_reverts() public {
        vm.prank(owner);
        vm.expectRevert(SalyStaking.Staking__CannotRecoverStakingToken.selector);
        staking.recoverERC20(address(token), 1e18);
    }

    function test_recover_otherToken_ok() public {
        SalyToken other = new SalyToken(owner, treasury, 1_000e18, MAX_SUPPLY);
        vm.prank(owner);
        other.activate();
        vm.prank(treasury);
        other.transfer(address(staking), 500e18);

        vm.prank(owner);
        staking.recoverERC20(address(other), 500e18);
        assertEq(other.balanceOf(owner), 500e18);
    }
}
