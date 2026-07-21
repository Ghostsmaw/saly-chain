// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Test } from "forge-std/Test.sol";
import { SalyAgentRegistry } from "../src/SalyAgentRegistry.sol";
import { SalyStreamPay } from "../src/SalyStreamPay.sol";

contract AgentContractsTest is Test {
    SalyAgentRegistry registry;
    SalyStreamPay streamPay;

    address admin = address(0xA11CE);
    address agentOwner = address(0xB0B);
    address recipient = address(0xCAFE);

    bytes32 agentId = keccak256("agt_test");
    bytes32 streamId = keccak256("stream_1");

    function setUp() public {
        registry = new SalyAgentRegistry(admin);
        streamPay = new SalyStreamPay();
    }

    function test_registerAgent() public {
        vm.prank(agentOwner);
        registry.register(agentId, keccak256("cap"), keccak256("rep"));
        SalyAgentRegistry.AgentRecord memory rec = registry.getAgent(agentId);
        assertEq(rec.owner, agentOwner);
        assertTrue(rec.active);
    }

    function test_createStreamAndWithdraw() public {
        vm.deal(agentOwner, 1 ether);
        vm.prank(agentOwner);
        streamPay.createStream{ value: 1 ether }(streamId, recipient, uint64(block.timestamp + 3600));

        vm.warp(block.timestamp + 1800);
        vm.prank(recipient);
        uint256 withdrawn = streamPay.withdraw(streamId);
        assertGt(withdrawn, 0);
    }

    function test_cancel_leaves_recipient_pull_balance() public {
        vm.deal(agentOwner, 1 ether);
        vm.prank(agentOwner);
        streamPay.createStream{ value: 1 ether }(streamId, recipient, uint64(block.timestamp + 3600));

        vm.warp(block.timestamp + 1800);
        uint256 beforeRecipient = recipient.balance;

        vm.prank(agentOwner);
        streamPay.cancel(streamId);

        // Pull-payment: cancel must not push to recipient.
        assertEq(recipient.balance, beforeRecipient);
        assertGt(streamPay.balanceOf(streamId), 0);

        vm.prank(recipient);
        uint256 pulled = streamPay.withdraw(streamId);
        assertGt(pulled, 0);
        assertEq(recipient.balance, beforeRecipient + pulled);
    }
}
