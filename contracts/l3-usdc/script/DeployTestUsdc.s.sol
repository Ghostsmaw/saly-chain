// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Script, console2 } from "forge-std/Script.sol";
import { SalyTestUSDC } from "../src/SalyTestUSDC.sol";

/**
 * Deploys SalyTestUSDC onto the Saly L3 devnet and (optionally) seeds a treasury.
 *
 * Env:
 *   PRIVATE_KEY        deployer/owner key (uint) — funded with L3 ETH for gas
 *   FAUCET_DRIP_CAP    max minor units per faucet call (default 10_000e6)
 *   FAUCET_COOLDOWN    seconds between faucet calls per address (default 3600)
 *   TREASURY_ADDRESS   optional: seed-mint recipient
 *   TREASURY_MINT      optional: minor units minted to treasury at deploy
 *
 * Usage:
 *   PRIVATE_KEY=… L3_L3_RPC_URL=http://127.0.0.1:9545 \
 *     forge script script/DeployTestUsdc.s.sol --rpc-url saly-l3 --broadcast
 */
contract DeployTestUsdc is Script {
    function run() external returns (SalyTestUSDC usdc) {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address owner = vm.addr(pk);
        uint256 dripCap = vm.envOr("FAUCET_DRIP_CAP", uint256(10_000e6));
        uint256 cooldown = vm.envOr("FAUCET_COOLDOWN", uint256(3600));
        address treasury = vm.envOr("TREASURY_ADDRESS", address(0));
        uint256 treasuryMint = vm.envOr("TREASURY_MINT", uint256(0));

        vm.startBroadcast(pk);

        usdc = new SalyTestUSDC(owner, dripCap, cooldown);

        if (treasury != address(0) && treasuryMint > 0) {
            usdc.mint(treasury, treasuryMint);
        }

        vm.stopBroadcast();

        console2.log("SalyTestUSDC deployed at:", address(usdc));
        console2.log("Owner:", owner);
        console2.log("Decimals:", usdc.decimals());
        console2.log("Faucet drip cap:", dripCap);
        if (treasury != address(0)) {
            console2.log("Treasury seeded:", treasury, treasuryMint);
        }
    }
}
