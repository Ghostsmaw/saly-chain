// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Script, console2 } from "forge-std/Script.sol";
import { SalySD } from "../src/SalySD.sol";
import { ReserveOracle } from "../src/ReserveOracle.sol";

/**
 * @notice Deploy SalySD + ReserveOracle to L3 testnet/mainnet.
 *
 * Env:
 *   DEPLOYER_PRIVATE_KEY — broadcast key (must become admin)
 *   SALYSD_MINTER         — minter role holder (stablecoin service hot wallet)
 *   SALYSD_BURNER         — burner role holder
 *   SALYSD_INITIAL_CEILING — authorized mint ceiling (minor units, 6 decimals)
 *   SALYSD_ATTESTATION_HASH — bytes32 hex of latest PoR document
 */
contract DeploySalySD is Script {
    function run() external {
        address admin = vm.envAddress("SALYSD_ADMIN");
        address minter = vm.envAddress("SALYSD_MINTER");
        address burner = vm.envAddress("SALYSD_BURNER");
        uint256 ceiling = vm.envUint("SALYSD_INITIAL_CEILING");
        bytes32 attestationHash = vm.envBytes32("SALYSD_ATTESTATION_HASH");

        vm.startBroadcast(vm.envUint("DEPLOYER_PRIVATE_KEY"));

        ReserveOracle oracle = new ReserveOracle(admin, ceiling, attestationHash);
        SalySD token = new SalySD(admin, minter, burner, oracle);

        vm.stopBroadcast();

        console2.log("ReserveOracle", address(oracle));
        console2.log("SalySD", address(token));
    }
}
