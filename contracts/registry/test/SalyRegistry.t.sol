// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Test } from "forge-std/Test.sol";
import { SalyAttestationRegistry } from "../src/SalyAttestationRegistry.sol";
import { SalyAssetToken } from "../src/SalyAssetToken.sol";

contract SalyAttestationRegistryTest is Test {
    SalyAttestationRegistry internal registry;
    address internal admin = address(this);
    address internal issuer = address(0x1555);
    bytes32 internal attId = keccak256("att-1");
    bytes32 internal schema = keccak256("healthcare.consent.v1");
    bytes32 internal subject = keccak256("patient-hash");
    bytes32 internal dataHash = keccak256("encrypted-blob");

    function setUp() public {
        registry = new SalyAttestationRegistry(admin);
        registry.setAccreditedIssuer(issuer, true);
    }

    function test_attestAndVerify() public {
        vm.prank(issuer);
        registry.attest(attId, schema, subject, dataHash, 0);

        (bool valid, SalyAttestationRegistry.Attestation memory record) = registry.verify(attId);
        assertTrue(valid);
        assertEq(record.schemaId, schema);
        assertEq(record.issuer, issuer);
        assertEq(record.subject, subject);
        assertEq(record.dataHash, dataHash);
        assertFalse(record.revoked);
    }

    function test_revokeByIssuer() public {
        vm.prank(issuer);
        registry.attest(attId, schema, subject, dataHash, 0);

        vm.prank(issuer);
        registry.revoke(attId);

        (bool valid,) = registry.verify(attId);
        assertFalse(valid);
    }

    function test_revokeByGovernance() public {
        vm.prank(issuer);
        registry.attest(attId, schema, subject, dataHash, 0);

        registry.revoke(attId);

        (bool valid,) = registry.verify(attId);
        assertFalse(valid);
    }

    function test_rejectsUnaccreditedIssuer() public {
        vm.prank(address(0xBAD));
        vm.expectRevert(
            abi.encodeWithSelector(SalyAttestationRegistry.NotAccredited.selector, address(0xBAD))
        );
        registry.attest(attId, schema, subject, dataHash, 0);
    }

    function test_expiredAttestationInvalid() public {
        vm.prank(issuer);
        registry.attest(attId, schema, subject, dataHash, uint64(block.timestamp + 1 hours));

        vm.warp(block.timestamp + 2 hours);
        (bool valid,) = registry.verify(attId);
        assertFalse(valid);
    }
}

contract SalyAssetTokenTest is Test {
    SalyAssetToken internal token;
    address internal minter = address(this);
    address internal holder = address(0xBEEF);

    function setUp() public {
        token = new SalyAssetToken(minter, "https://assets.salychain.io/{id}.json");
    }

    function test_mintAndBalance() public {
        token.mint(holder, 1, 100, "");
        assertEq(token.balanceOf(holder, 1), 100);
    }

    function test_burn() public {
        token.mint(holder, 2, 50, "");

        // MINTER_ROLE alone is not enough to destroy a holder's balance —
        // the holder must consent by approving the minter as an operator,
        // exactly as ERC-1155 already requires for transfers.
        vm.prank(holder);
        token.setApprovalForAll(minter, true);

        token.burn(holder, 2, 20);
        assertEq(token.balanceOf(holder, 2), 30);
    }

    function test_classUriOverride() public {
        token.setClassUri(3, "https://assets.salychain.io/class/3.json");
        token.mint(holder, 3, 1, "");
        assertEq(token.uri(3), "https://assets.salychain.io/class/3.json");
    }
}
