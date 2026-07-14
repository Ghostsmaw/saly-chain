// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Script, console2 } from "forge-std/Script.sol";
import { SalyAgentRegistry } from "../src/SalyAgentRegistry.sol";
import { SalyStreamPay } from "../src/SalyStreamPay.sol";

contract DeployAgents is Script {
    function run() external returns (SalyAgentRegistry registry, SalyStreamPay streamPay) {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(pk);
        address admin = vm.envOr("AGENT_REGISTRY_ADMIN", deployer);

        vm.startBroadcast(pk);
        registry = new SalyAgentRegistry(admin);
        streamPay = new SalyStreamPay();
        vm.stopBroadcast();

        console2.log("SalyAgentRegistry:", address(registry));
        console2.log("SalyStreamPay:", address(streamPay));
    }
}
