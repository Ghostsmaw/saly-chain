// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Test } from "forge-std/Test.sol";
import { SalyAssetToken } from "../src/SalyAssetToken.sol";

contract SalyAssetTokenTest is Test {
    SalyAssetToken internal token;

    address internal admin = address(this);
    address internal minter = address(0xB1);
    address internal holder = address(0xA11CE);
    address internal stranger = address(0xB0B);

    uint256 internal constant ASSET_ID = 1;

    function setUp() public {
        token = new SalyAssetToken(admin, "https://assets.salychain.example/{id}.json");
        token.grantRole(token.MINTER_ROLE(), minter);

        vm.prank(minter);
        token.mint(holder, ASSET_ID, 100, "");
    }

    function test_minterCannotBurnHolderTokensWithoutConsent() public {
        vm.prank(minter);
        vm.expectRevert(SalyAssetToken.BurnNotApproved.selector);
        token.burn(holder, ASSET_ID, 10);

        assertEq(token.balanceOf(holder, ASSET_ID), 100, "balance must be untouched");
    }

    function test_minterCanBurnOnceHolderGrantsOperatorApproval() public {
        vm.prank(holder);
        token.setApprovalForAll(minter, true);

        vm.prank(minter);
        token.burn(holder, ASSET_ID, 40);

        assertEq(token.balanceOf(holder, ASSET_ID), 60);
    }

    function test_minterCanBurnItsOwnTokensWithoutApproval() public {
        vm.prank(minter);
        token.mint(minter, ASSET_ID, 5, "");

        vm.prank(minter);
        token.burn(minter, ASSET_ID, 5);

        assertEq(token.balanceOf(minter, ASSET_ID), 0);
    }

    function test_revokingApprovalBlocksFurtherBurns() public {
        vm.prank(holder);
        token.setApprovalForAll(minter, true);
        vm.prank(minter);
        token.burn(holder, ASSET_ID, 10);

        vm.prank(holder);
        token.setApprovalForAll(minter, false);

        vm.prank(minter);
        vm.expectRevert(SalyAssetToken.BurnNotApproved.selector);
        token.burn(holder, ASSET_ID, 10);
    }

    function test_nonMinterCannotBurnEvenWithApproval() public {
        vm.prank(holder);
        token.setApprovalForAll(stranger, true);

        vm.prank(stranger);
        vm.expectRevert();
        token.burn(holder, ASSET_ID, 10);
    }

    function test_zeroAmountBurnReverts() public {
        vm.prank(holder);
        token.setApprovalForAll(minter, true);

        vm.prank(minter);
        vm.expectRevert(SalyAssetToken.ZeroAmount.selector);
        token.burn(holder, ASSET_ID, 0);
    }
}
