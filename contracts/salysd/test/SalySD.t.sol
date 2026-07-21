// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Test } from "forge-std/Test.sol";
import { SalySD } from "../src/SalySD.sol";
import { ReserveOracle } from "../src/ReserveOracle.sol";

contract SalySDTest is Test {
    SalySD internal token;
    ReserveOracle internal oracle;

    address internal admin = makeAddr("admin");
    address internal minter = makeAddr("minter");
    address internal burner = makeAddr("burner");
    address internal user = makeAddr("user");
    address internal blocked = makeAddr("blocked");

    bytes32 internal constant ATTESTATION = keccak256("por-v1");
    uint256 internal constant CEILING = 1_000_000e6;

    function setUp() public {
        oracle = new ReserveOracle(admin, CEILING, ATTESTATION);
        token = new SalySD(admin, minter, burner, oracle);
    }

    function test_mint_within_ceiling() public {
        vm.prank(minter);
        token.mint(user, 100e6);
        assertEq(token.totalSupply(), 100e6);
        assertEq(token.balanceOf(user), 100e6);
    }

    function test_revert_mint_exceeds_ceiling() public {
        vm.prank(minter);
        token.mint(user, CEILING);

        vm.prank(minter);
        vm.expectRevert(
            abi.encodeWithSelector(SalySD.ExceedsMintCeiling.selector, 1, CEILING, CEILING)
        );
        token.mint(user, 1);
    }

    function test_burn_from_requires_burner_role() public {
        vm.prank(minter);
        token.mint(user, 50e6);

        vm.prank(user);
        vm.expectRevert();
        token.burn(10e6);

        vm.prank(user);
        token.approve(burner, 10e6);

        vm.prank(burner);
        token.burnFrom(user, 10e6);
        assertEq(token.totalSupply(), 40e6);
    }

    function test_blocklist_blocks_transfer() public {
        vm.prank(minter);
        token.mint(user, 10e6);

        vm.prank(admin);
        token.setBlocked(blocked, true);

        vm.prank(user);
        vm.expectRevert(abi.encodeWithSelector(SalySD.Blocklisted.selector, blocked));
        token.transfer(blocked, 1e6);
    }

    function test_pause_blocks_transfer_allows_mint() public {
        vm.prank(admin);
        token.pause();

        vm.prank(minter);
        token.mint(user, 5e6);

        vm.prank(user);
        vm.expectRevert();
        token.transfer(makeAddr("other"), 1e6);
    }

    function test_oracle_update_lowers_ceiling() public {
        vm.prank(minter);
        token.mint(user, 500e6);

        vm.prank(admin);
        oracle.updateAttestation(400e6, keccak256("por-v2"));

        vm.prank(minter);
        vm.expectRevert(
            abi.encodeWithSelector(SalySD.ExceedsMintCeiling.selector, 1e6, 400e6, 500e6)
        );
        token.mint(user, 1e6);
    }

    function test_revert_mint_on_stale_attestation() public {
        uint64 attestedAt = uint64(block.timestamp);
        uint64 maxAge = token.maxAttestationAge();
        uint64 staleAt = attestedAt + maxAge + 1;
        vm.warp(uint256(staleAt));

        vm.expectRevert(
            abi.encodeWithSelector(SalySD.StaleAttestation.selector, attestedAt, maxAge, staleAt)
        );
        vm.prank(minter);
        token.mint(user, 1e6);
    }

    function test_mint_succeeds_after_fresh_attestation() public {
        vm.warp(block.timestamp + token.maxAttestationAge() + 1);

        vm.prank(admin);
        oracle.updateAttestation(CEILING, keccak256("por-fresh"));

        vm.prank(minter);
        token.mint(user, 1e6);
        assertEq(token.balanceOf(user), 1e6);
    }
}
