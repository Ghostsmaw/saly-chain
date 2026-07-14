// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Test } from "forge-std/Test.sol";
import { SalyAttestationRegistry } from "../src/SalyAttestationRegistry.sol";

contract SalyAttestationRegistryTest is Test {
    SalyAttestationRegistry internal registry;
    address internal owner = address(0xA11CE);

    function setUp() public {
        registry = new SalyAttestationRegistry(owner);
    }

    function test_anchor_updates_latest() public {
        bytes32 hash = keccak256("attestation-v1");
        vm.prank(owner);
        registry.anchor(hash, 1_000_000e6);

        (bytes32 storedHash, uint256 ceiling, uint64 at) = registry.latest();
        assertEq(storedHash, hash);
        assertEq(ceiling, 1_000_000e6);
        assertGt(at, 0);
    }

    function test_revert_zero_hash() public {
        vm.prank(owner);
        vm.expectRevert(SalyAttestationRegistry.ZeroHash.selector);
        registry.anchor(bytes32(0), 1);
    }
}
