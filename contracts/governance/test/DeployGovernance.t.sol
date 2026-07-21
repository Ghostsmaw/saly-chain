// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Test } from "forge-std/Test.sol";
import { TimelockController } from "@openzeppelin/contracts/governance/TimelockController.sol";
import { DeployGovernance } from "../script/DeployGovernance.s.sol";
import { SalyTokenVotes } from "../src/SalyTokenVotes.sol";
import { SalyGovernor } from "../src/SalyGovernor.sol";

/**
 * Regression coverage for a critical finding: the deploy script used to
 * leave `SalyTokenVotes`'s `Ownable2Step` owner permanently set to the
 * deployer EOA, so a single private key could mint unlimited $SALY forever
 * — completely bypassing the timelock/governor stack the same script wired
 * up. The fix schedules the `acceptOwnership()` handoff through the
 * timelock itself, gated by the timelock's own `minDelay`.
 */
contract DeployGovernanceTest is Test {
    uint256 internal constant PK = 0xA11CE;
    address internal deployer;
    address internal treasury = address(uint160(0xBEEF));

    DeployGovernance internal script;

    function setUp() public {
        deployer = vm.addr(PK);
        vm.deal(deployer, 10 ether);

        vm.setEnv("PRIVATE_KEY", vm.toString(bytes32(PK)));
        vm.setEnv("TREASURY_ADDRESS", vm.toString(treasury));
        vm.setEnv("INITIAL_MINT", vm.toString(uint256(100_000_000 ether)));
        vm.setEnv("MAX_SUPPLY", vm.toString(uint256(1_000_000_000 ether)));
        vm.setEnv("TIMELOCK_MIN_DELAY", vm.toString(uint256(2 days)));

        script = new DeployGovernance();
    }

    function test_ownershipHandoffIsScheduledNotImmediate() public {
        (SalyTokenVotes token, TimelockController timelock,) = script.run();

        // Handoff started but not yet complete: owner() is still the
        // deployer until the scheduled call executes.
        assertEq(token.owner(), deployer, "owner should still be deployer immediately after deploy");
        assertEq(token.pendingOwner(), address(timelock), "pending owner must be the timelock");

        // The deployer's one-shot proposer capability must already be gone
        // — it must not be able to schedule (or propose) anything else.
        assertFalse(timelock.hasRole(timelock.PROPOSER_ROLE(), deployer));
        assertFalse(timelock.hasRole(timelock.DEFAULT_ADMIN_ROLE(), deployer));

        // The deployer must never have gained cancellation power, so it
        // cannot pull the scheduled handoff back.
        assertFalse(timelock.hasRole(timelock.CANCELLER_ROLE(), deployer));
    }

    function test_ownershipHandoffExecutesAfterMinDelay() public {
        (SalyTokenVotes token, TimelockController timelock,) = script.run();

        bytes memory acceptOwnershipCall = abi.encodeCall(token.acceptOwnership, ());
        bytes32 id = timelock.hashOperation(address(token), 0, acceptOwnershipCall, bytes32(0), bytes32(0));
        assertTrue(timelock.isOperationPending(id), "acceptOwnership call must be scheduled");

        // Executing before the delay elapses must revert.
        vm.expectRevert();
        timelock.execute(address(token), 0, acceptOwnershipCall, bytes32(0), bytes32(0));

        vm.warp(block.timestamp + timelock.getMinDelay() + 1);

        // Executor role is open (executors[0] = address(0)); a random
        // caller — not the deployer, not governance — can complete it.
        vm.prank(address(0x1234));
        timelock.execute(address(token), 0, acceptOwnershipCall, bytes32(0), bytes32(0));

        assertEq(token.owner(), address(timelock), "ownership must land on the timelock");
        assertEq(token.pendingOwner(), address(0), "pending owner must clear after acceptance");
    }

    function test_deployerCannotMintAfterHandoffCompletes() public {
        (SalyTokenVotes token, TimelockController timelock,) = script.run();

        bytes memory acceptOwnershipCall = abi.encodeCall(token.acceptOwnership, ());
        vm.warp(block.timestamp + timelock.getMinDelay() + 1);
        timelock.execute(address(token), 0, acceptOwnershipCall, bytes32(0), bytes32(0));

        vm.prank(deployer);
        vm.expectRevert();
        token.mint(deployer, 1 ether);

        // Only the timelock (i.e. governance, after a real proposal) can mint now.
        vm.prank(address(timelock));
        token.mint(treasury, 1 ether);
    }
}
