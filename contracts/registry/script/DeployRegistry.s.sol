// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Script, console2 } from "forge-std/Script.sol";
import { SalyAttestationRegistry } from "../src/SalyAttestationRegistry.sol";
import { SalyAssetToken } from "../src/SalyAssetToken.sol";

/**
 * Deploys shared vertical contracts on Saly L3.
 *
 * Env:
 *   PRIVATE_KEY     governance admin key
 *   REGISTRY_ADMIN  optional override (defaults to deployer)
 *   ASSET_BASE_URI  ERC-1155 metadata template (default https://assets.salychain.io/{id}.json)
 */
contract DeployRegistry is Script {
    function run() external returns (SalyAttestationRegistry registry, SalyAssetToken assetToken) {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(pk);
        address admin = vm.envOr("REGISTRY_ADMIN", deployer);
        string memory baseUri = vm.envOr("ASSET_BASE_URI", string("https://assets.salychain.io/{id}.json"));

        vm.startBroadcast(pk);

        registry = new SalyAttestationRegistry(admin);
        assetToken = new SalyAssetToken(admin, baseUri);

        vm.stopBroadcast();

        console2.log("SalyAttestationRegistry:", address(registry));
        console2.log("SalyAssetToken:", address(assetToken));
        console2.log("Admin:", admin);
    }
}
