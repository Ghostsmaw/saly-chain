// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {SalyEscrow} from "../src/SalyEscrow.sol";

/**
 * Deploy script. Reads the resolver address from env and emits the deployed
 * contract address on stdout for the deployer to capture.
 *
 * Usage:
 *   RESOLVER_ADDRESS=0x… BASE_RPC_URL=… PRIVATE_KEY=… \
 *     forge script script/Deploy.s.sol --rpc-url base-sepolia --broadcast --verify
 */
contract Deploy is Script {
    function run() external returns (SalyEscrow escrow) {
        address resolver = vm.envAddress("RESOLVER_ADDRESS");
        uint256 pk = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(pk);
        escrow = new SalyEscrow(resolver);
        vm.stopBroadcast();
        console2.log("SalyEscrow deployed at:", address(escrow));
        console2.log("Resolver:", resolver);
    }
}
