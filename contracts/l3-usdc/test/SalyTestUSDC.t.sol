// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Test } from "forge-std/Test.sol";
import { SalyTestUSDC } from "../src/SalyTestUSDC.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract SalyTestUSDCTest is Test {
    SalyTestUSDC internal usdc;

    address internal owner = makeAddr("owner");
    address internal alice = makeAddr("alice");
    address internal bob = makeAddr("bob");

    uint256 internal constant DRIP_CAP = 10_000e6;
    uint256 internal constant COOLDOWN = 1 hours;

    function setUp() public {
        vm.prank(owner);
        usdc = new SalyTestUSDC(owner, DRIP_CAP, COOLDOWN);
    }

    function test_metadata_matchesUsdc() public view {
        assertEq(usdc.name(), "Saly Test USD Coin");
        assertEq(usdc.symbol(), "USDC");
        assertEq(usdc.decimals(), 6);
        assertEq(usdc.totalSupply(), 0);
    }

    function test_constructor_revertsOnZeroOwner() public {
        // Ownable rejects the zero owner before our own guard.
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableInvalidOwner.selector, address(0)));
        new SalyTestUSDC(address(0), DRIP_CAP, COOLDOWN);
    }

    function test_ownerMint() public {
        vm.prank(owner);
        usdc.mint(alice, 1_000e6);
        assertEq(usdc.balanceOf(alice), 1_000e6);
    }

    function test_mint_onlyOwner() public {
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, alice));
        usdc.mint(alice, 1_000e6);
    }

    function test_mint_revertsOnZeroAddress() public {
        vm.prank(owner);
        vm.expectRevert(SalyTestUSDC.ZeroAddress.selector);
        usdc.mint(address(0), 1_000e6);
    }

    function test_mint_revertsOnZeroAmount() public {
        vm.prank(owner);
        vm.expectRevert(SalyTestUSDC.ZeroAmount.selector);
        usdc.mint(alice, 0);
    }

    function test_faucet_dripsAndEnforcesCooldown() public {
        vm.prank(alice);
        usdc.faucet(500e6);
        assertEq(usdc.balanceOf(alice), 500e6);

        // Second call inside the cooldown window reverts.
        vm.prank(alice);
        vm.expectRevert(
            abi.encodeWithSelector(SalyTestUSDC.FaucetCooldownActive.selector, block.timestamp + COOLDOWN)
        );
        usdc.faucet(500e6);

        // After cooldown, it works again.
        vm.warp(block.timestamp + COOLDOWN);
        vm.prank(alice);
        usdc.faucet(500e6);
        assertEq(usdc.balanceOf(alice), 1_000e6);
    }

    function test_faucet_respectsDripCap() public {
        vm.prank(bob);
        vm.expectRevert(
            abi.encodeWithSelector(SalyTestUSDC.FaucetAmountTooLarge.selector, DRIP_CAP + 1, DRIP_CAP)
        );
        usdc.faucet(DRIP_CAP + 1);
    }

    function test_faucet_canBeDisabled() public {
        vm.prank(owner);
        usdc.configureFaucet(false, DRIP_CAP, COOLDOWN);

        vm.prank(alice);
        vm.expectRevert(SalyTestUSDC.FaucetDisabled.selector);
        usdc.faucet(1e6);
    }

    function test_configureFaucet_onlyOwner() public {
        vm.prank(alice);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, alice));
        usdc.configureFaucet(false, 0, 0);
    }

    function test_transfer_movesFunds() public {
        vm.prank(owner);
        usdc.mint(alice, 1_000e6);

        vm.prank(alice);
        usdc.transfer(bob, 400e6);

        assertEq(usdc.balanceOf(alice), 600e6);
        assertEq(usdc.balanceOf(bob), 400e6);
    }

    function testFuzz_faucet_neverExceedsCap(uint256 amount) public {
        amount = bound(amount, 1, DRIP_CAP);
        vm.prank(alice);
        usdc.faucet(amount);
        assertEq(usdc.balanceOf(alice), amount);
    }
}
