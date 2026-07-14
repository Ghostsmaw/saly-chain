// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Test } from "forge-std/Test.sol";
import { IGovernor } from "@openzeppelin/contracts/governance/IGovernor.sol";
import { TimelockController } from "@openzeppelin/contracts/governance/TimelockController.sol";
import { SalyTokenVotes } from "../src/SalyTokenVotes.sol";
import { SalyGovernor } from "../src/SalyGovernor.sol";

contract SalyGovernorTest is Test {
    SalyTokenVotes internal token;
    TimelockController internal timelock;
    SalyGovernor internal governor;

    address internal deployer = address(this);
    address internal treasury = address(uint160(0xBEEF));
    address internal voter = address(uint160(0xC0FFEE));

    uint256 internal constant MAX_SUPPLY = 1_000_000_000 ether;
    uint256 internal constant INITIAL_MINT = 100_000_000 ether;

    function setUp() public {
        address[] memory proposers = new address[](0);
        address[] memory executors = new address[](1);
        executors[0] = address(0);

        timelock = new TimelockController(1 days, proposers, executors, deployer);
        token = new SalyTokenVotes(address(timelock), treasury, INITIAL_MINT, MAX_SUPPLY);
        governor = new SalyGovernor(token, timelock, 1, 10, 0, 4);

        timelock.grantRole(timelock.PROPOSER_ROLE(), address(governor));
        timelock.grantRole(timelock.CANCELLER_ROLE(), address(governor));

        vm.prank(treasury);
        token.transfer(voter, 5_000_000 ether);
        vm.prank(voter);
        token.delegate(voter);
        vm.roll(block.number + 1);
    }

    function test_launchSwitchBlocksPublicTransfer() public {
        vm.prank(voter);
        vm.expectRevert(SalyTokenVotes.Saly__TransfersNotActive.selector);
        token.transfer(address(0xDEAD), 1 ether);
    }

    function test_activateOpensTransfers() public {
        vm.prank(address(timelock));
        token.activate();
        vm.prank(voter);
        token.transfer(address(0xDEAD), 1 ether);
        assertEq(token.balanceOf(address(0xDEAD)), 1 ether);
    }

    function test_proposeVoteQueueExecute() public {
        vm.prank(address(timelock));
        token.activate();

        address[] memory targets = new address[](1);
        targets[0] = address(token);
        uint256[] memory values = new uint256[](1);
        bytes[] memory calldatas = new bytes[](1);
        calldatas[0] = abi.encodeWithSignature("mint(address,uint256)", voter, 1 ether);

        vm.prank(voter);
        uint256 proposalId = governor.propose(targets, values, calldatas, "Mint reward");

        vm.warp(block.timestamp + governor.votingDelay() + 1);
        vm.roll(block.number + governor.votingDelay() + 1);

        vm.prank(voter);
        governor.castVote(proposalId, 1);

        vm.warp(block.timestamp + governor.votingPeriod() + 1);
        vm.roll(block.number + governor.votingPeriod() + 1);

        assertEq(uint256(governor.state(proposalId)), uint256(IGovernor.ProposalState.Succeeded));

        governor.queue(targets, values, calldatas, keccak256("Mint reward"));

        vm.warp(block.timestamp + timelock.getMinDelay() + 1);
        governor.execute(targets, values, calldatas, keccak256("Mint reward"));

        assertEq(token.balanceOf(voter), 5_000_001 ether);
    }

    function test_timelockIsExecutor() public view {
        assertEq(governor.timelock(), address(timelock));
    }
}
