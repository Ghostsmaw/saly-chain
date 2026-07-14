// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Script, console2 } from "forge-std/Script.sol";
import { SalyToken } from "../src/SalyToken.sol";
import { SalyStaking } from "../src/SalyStaking.sol";

/**
 * Deploys $SALY (pre-launch, transfers locked) and the staking distributor.
 *
 * The token is intentionally left **not activated** — call `activate()` from the
 * owner key when you are ready to open public transfers.
 *
 * Env:
 *   PRIVATE_KEY        deployer/owner key (uint)
 *   TREASURY_ADDRESS   initial mint recipient + pre-launch allowlisted mover
 *   INITIAL_MINT       initial supply minted to treasury (wei, 18 decimals)
 *   MAX_SUPPLY         immutable hard cap (wei, 18 decimals)
 *
 * Usage:
 *   PRIVATE_KEY=… TREASURY_ADDRESS=0x… INITIAL_MINT=… MAX_SUPPLY=… BASE_RPC_URL=… \
 *     forge script script/Deploy.s.sol --rpc-url base-sepolia --broadcast --verify
 */
contract Deploy is Script {
    function run() external returns (SalyToken token, SalyStaking staking) {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address owner = vm.addr(pk);
        address treasury = vm.envAddress("TREASURY_ADDRESS");
        uint256 initialMint = vm.envUint("INITIAL_MINT");
        uint256 maxSupply = vm.envUint("MAX_SUPPLY");

        vm.startBroadcast(pk);

        token = new SalyToken(owner, treasury, initialMint, maxSupply);

        // Single-asset staking: stake $SALY, earn $SALY.
        staking = new SalyStaking(owner, address(token), address(token));

        // Let the staking contract move tokens during the pre-launch window so
        // rewards can be claimed before public transfers open.
        token.setAllowlisted(address(staking), true);

        vm.stopBroadcast();

        console2.log("SalyToken deployed at:", address(token));
        console2.log("SalyStaking deployed at:", address(staking));
        console2.log("Owner:", owner);
        console2.log("Treasury:", treasury);
        console2.log("Activated:", token.activated());
    }
}
