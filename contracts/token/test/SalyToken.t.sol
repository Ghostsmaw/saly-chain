// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Test } from "forge-std/Test.sol";
import { SalyToken } from "../src/SalyToken.sol";

contract SalyTokenTest is Test {
    SalyToken internal token;

    address internal owner = address(0xA11CE);
    address internal treasury = address(0x7);
    address internal alice = address(0xA);
    address internal bob = address(0xB);

    uint256 internal constant MAX_SUPPLY = 1_000_000_000e18;
    uint256 internal constant INITIAL_MINT = 100_000_000e18;

    event Activated(uint256 timestamp);
    event AllowlistUpdated(address indexed account, bool allowed);

    function setUp() public {
        token = new SalyToken(owner, treasury, INITIAL_MINT, MAX_SUPPLY);
    }

    // ───────────────────────────── Construction ─────────────────────────────

    function test_initialState() public view {
        assertEq(token.name(), "SalyChain");
        assertEq(token.symbol(), "SALY");
        assertEq(token.decimals(), 18);
        assertEq(token.cap(), MAX_SUPPLY);
        assertEq(token.totalSupply(), INITIAL_MINT);
        assertEq(token.balanceOf(treasury), INITIAL_MINT);
        assertEq(token.owner(), owner);
        assertFalse(token.activated());
        assertTrue(token.isAllowlisted(owner));
        assertTrue(token.isAllowlisted(treasury));
    }

    function test_constructor_zeroTreasury_reverts() public {
        vm.expectRevert(SalyToken.Saly__ZeroAddress.selector);
        new SalyToken(owner, address(0), INITIAL_MINT, MAX_SUPPLY);
    }

    // ───────────────────────────── Launch gate ─────────────────────────────

    function test_preLaunch_transferBetweenUsers_reverts() public {
        // treasury (allowlisted) seeds alice
        vm.prank(treasury);
        token.transfer(alice, 1_000e18);

        // alice -> bob both non-allowlisted: blocked pre-launch
        vm.prank(alice);
        vm.expectRevert(SalyToken.Saly__TransfersNotActive.selector);
        token.transfer(bob, 1e18);
    }

    function test_preLaunch_transferFromAllowlisted_ok() public {
        vm.prank(treasury);
        token.transfer(alice, 1_000e18);
        assertEq(token.balanceOf(alice), 1_000e18);
    }

    function test_preLaunch_transferToAllowlisted_ok() public {
        vm.prank(treasury);
        token.transfer(alice, 1_000e18);

        // alice -> treasury (treasury allowlisted as recipient) allowed even pre-launch
        vm.prank(alice);
        token.transfer(treasury, 500e18);
        assertEq(token.balanceOf(treasury), INITIAL_MINT - 1_000e18 + 500e18);
    }

    function test_preLaunch_mintAndBurn_ok() public {
        vm.prank(owner);
        token.mint(alice, 10e18);
        assertEq(token.balanceOf(alice), 10e18);

        // burn (to == address(0)) works pre-launch
        vm.prank(alice);
        token.burn(4e18);
        assertEq(token.balanceOf(alice), 6e18);
    }

    function test_activate_onlyOwner() public {
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", alice));
        vm.prank(alice);
        token.activate();
    }

    function test_activate_emitsAndOpensTransfers() public {
        vm.prank(treasury);
        token.transfer(alice, 1_000e18);

        vm.expectEmit(false, false, false, false);
        emit Activated(block.timestamp);
        vm.prank(owner);
        token.activate();

        assertTrue(token.activated());

        // now arbitrary user-to-user transfer works
        vm.prank(alice);
        token.transfer(bob, 250e18);
        assertEq(token.balanceOf(bob), 250e18);
    }

    function test_activate_twice_reverts() public {
        vm.startPrank(owner);
        token.activate();
        vm.expectRevert(SalyToken.Saly__AlreadyActivated.selector);
        token.activate();
        vm.stopPrank();
    }

    // ───────────────────────────── Allowlist ─────────────────────────────

    function test_setAllowlisted_byOwner() public {
        vm.expectEmit(true, false, false, true);
        emit AllowlistUpdated(alice, true);
        vm.prank(owner);
        token.setAllowlisted(alice, true);
        assertTrue(token.isAllowlisted(alice));

        vm.prank(owner);
        token.setAllowlisted(alice, false);
        assertFalse(token.isAllowlisted(alice));
    }

    function test_setAllowlisted_zeroAddress_reverts() public {
        vm.prank(owner);
        vm.expectRevert(SalyToken.Saly__ZeroAddress.selector);
        token.setAllowlisted(address(0), true);
    }

    function test_setAllowlisted_onlyOwner() public {
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", alice));
        vm.prank(alice);
        token.setAllowlisted(bob, true);
    }

    // ───────────────────────────── Supply / cap ─────────────────────────────

    function test_mint_onlyOwner() public {
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", alice));
        vm.prank(alice);
        token.mint(alice, 1e18);
    }

    function test_mint_overCap_reverts() public {
        uint256 remaining = MAX_SUPPLY - INITIAL_MINT;
        vm.startPrank(owner);
        token.mint(treasury, remaining); // exactly to cap
        assertEq(token.totalSupply(), MAX_SUPPLY);

        vm.expectRevert(
            abi.encodeWithSignature("ERC20ExceededCap(uint256,uint256)", MAX_SUPPLY + 1, MAX_SUPPLY)
        );
        token.mint(treasury, 1);
        vm.stopPrank();
    }

    // ───────────────────────────── Permit (EIP-2612) ─────────────────────────────

    function test_permit_setsAllowance() public {
        uint256 signerPk = 0xBEEF;
        address signer = vm.addr(signerPk);
        uint256 value = 1_000e18;
        uint256 deadline = block.timestamp + 1 hours;

        bytes32 permitTypehash =
            keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
        bytes32 structHash =
            keccak256(abi.encode(permitTypehash, signer, bob, value, token.nonces(signer), deadline));
        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", token.DOMAIN_SEPARATOR(), structHash));
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerPk, digest);

        token.permit(signer, bob, value, deadline, v, r, s);
        assertEq(token.allowance(signer, bob), value);
        assertEq(token.nonces(signer), 1);
    }

    // ───────────────────────────── Ownership ─────────────────────────────

    function test_ownership_twoStepTransfer() public {
        vm.prank(owner);
        token.transferOwnership(alice);
        assertEq(token.owner(), owner); // not yet
        assertEq(token.pendingOwner(), alice);

        vm.prank(alice);
        token.acceptOwnership();
        assertEq(token.owner(), alice);
    }
}
