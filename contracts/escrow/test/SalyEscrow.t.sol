// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SalyEscrow} from "../src/SalyEscrow.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "USDC") {}
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract FeeToken is ERC20 {
    constructor() ERC20("Fee", "FEE") {}
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        // Burn 1% on transfer to simulate fee-on-transfer behaviour.
        uint256 fee = amount / 100;
        _spendAllowance(from, msg.sender, amount);
        _transfer(from, address(0xdead), fee);
        _transfer(from, to, amount - fee);
        return true;
    }
}

contract SalyEscrowTest is Test {
    SalyEscrow internal escrow;
    MockUSDC internal token;
    address internal resolver = address(0xA11CE);
    address internal payer = address(0xB0B);
    address internal payee = address(0xCAFE);
    bytes32 internal dealId = keccak256("deal-1");
    uint128 internal amount = 100_000_000; // 100 USDC (6 decimals)

    function setUp() public {
        escrow = new SalyEscrow(resolver);
        token = new MockUSDC();
        token.mint(payer, 1_000_000_000);
        vm.prank(payer);
        token.approve(address(escrow), type(uint256).max);
    }

    function test_fund_release_happyPath() public {
        vm.prank(payer);
        escrow.fundDeal(dealId, payee, address(token), amount, 0);
        assertEq(token.balanceOf(address(escrow)), amount);

        vm.prank(resolver);
        escrow.release(dealId);
        assertEq(token.balanceOf(payee), amount);
        assertEq(token.balanceOf(address(escrow)), 0);
    }

    function test_refund_byResolver_anytime() public {
        vm.prank(payer);
        escrow.fundDeal(dealId, payee, address(token), amount, uint64(block.timestamp + 1 days));

        vm.prank(resolver);
        escrow.refund(dealId);
        assertEq(token.balanceOf(payer), 1_000_000_000);
        assertEq(token.balanceOf(address(escrow)), 0);
    }

    function test_refund_byAnyone_afterDeadline() public {
        uint64 deadline = uint64(block.timestamp + 1 hours);
        vm.prank(payer);
        escrow.fundDeal(dealId, payee, address(token), amount, deadline);

        vm.warp(deadline + 1);
        address random = address(0xD00D);
        vm.prank(random);
        escrow.refund(dealId);
        assertEq(token.balanceOf(payer), 1_000_000_000);
    }

    function test_refund_byAnyone_beforeDeadline_reverts() public {
        uint64 deadline = uint64(block.timestamp + 1 hours);
        vm.prank(payer);
        escrow.fundDeal(dealId, payee, address(token), amount, deadline);

        vm.expectRevert(SalyEscrow.Escrow__DeadlineNotPassed.selector);
        vm.prank(address(0xD00D));
        escrow.refund(dealId);
    }

    function test_release_byNonResolver_reverts() public {
        vm.prank(payer);
        escrow.fundDeal(dealId, payee, address(token), amount, 0);

        vm.expectRevert(SalyEscrow.Escrow__NotResolver.selector);
        vm.prank(address(0xD00D));
        escrow.release(dealId);
    }

    function test_duplicate_dealId_reverts() public {
        vm.startPrank(payer);
        escrow.fundDeal(dealId, payee, address(token), amount, 0);
        vm.expectRevert(SalyEscrow.Escrow__DealAlreadyExists.selector);
        escrow.fundDeal(dealId, payee, address(token), amount, 0);
        vm.stopPrank();
    }

    function test_feeOnTransfer_token_reverts() public {
        FeeToken fee = new FeeToken();
        fee.mint(payer, 1_000_000_000);
        vm.startPrank(payer);
        fee.approve(address(escrow), type(uint256).max);
        vm.expectRevert(SalyEscrow.Escrow__FeeOnTransferUnsupported.selector);
        escrow.fundDeal(dealId, payee, address(fee), amount, 0);
        vm.stopPrank();
    }

    function test_zeroAmount_reverts() public {
        vm.expectRevert(SalyEscrow.Escrow__InvalidAmount.selector);
        vm.prank(payer);
        escrow.fundDeal(dealId, payee, address(token), 0, 0);
    }

    function test_release_unfunded_reverts() public {
        vm.expectRevert(SalyEscrow.Escrow__DealNotFunded.selector);
        vm.prank(resolver);
        escrow.release(dealId);
    }
}
