// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { Script, console2 } from "forge-std/Script.sol";
import { TimelockController } from "@openzeppelin/contracts/governance/TimelockController.sol";
import { SalyTokenVotes } from "../src/SalyTokenVotes.sol";
import { SalyGovernor } from "../src/SalyGovernor.sol";

/**
 * Deploys governance stack: Timelock → SalyTokenVotes → SalyGovernor.
 *
 * Env:
 *   PRIVATE_KEY              deployer (uint)
 *   TREASURY_ADDRESS         initial mint recipient
 *   INITIAL_MINT               wei (18 decimals)
 *   MAX_SUPPLY                 wei cap
 *   TIMELOCK_MIN_DELAY         seconds (default 172800 = 2 days)
 *   VOTING_DELAY_BLOCKS        default 7200 (~1 day @ 12s)
 *   VOTING_PERIOD_BLOCKS       default 50400 (~1 week)
 *   PROPOSAL_THRESHOLD         token wei required to propose (default 0)
 *   QUORUM_NUMERATOR           percent (default 4)
 *
 * After deploy, transfer SalySD PAUSER_ROLE (and other admin roles) to the timelock.
 */
contract DeployGovernance is Script {
    function run()
        external
        returns (SalyTokenVotes token, TimelockController timelock, SalyGovernor governor)
    {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(pk);
        address treasury = vm.envAddress("TREASURY_ADDRESS");
        uint256 initialMint = vm.envUint("INITIAL_MINT");
        uint256 maxSupply = vm.envUint("MAX_SUPPLY");

        uint256 minDelay = vm.envOr("TIMELOCK_MIN_DELAY", uint256(172_800));
        uint48 votingDelay = uint48(vm.envOr("VOTING_DELAY_BLOCKS", uint256(7200)));
        uint32 votingPeriod = uint32(vm.envOr("VOTING_PERIOD_BLOCKS", uint256(50_400)));
        uint256 proposalThreshold = vm.envOr("PROPOSAL_THRESHOLD", uint256(0));
        uint256 quorumNumerator = vm.envOr("QUORUM_NUMERATOR", uint256(4));

        address[] memory proposers = new address[](0);
        address[] memory executors = new address[](1);
        executors[0] = address(0);

        vm.startBroadcast(pk);

        timelock = new TimelockController(minDelay, proposers, executors, deployer);
        token = new SalyTokenVotes(deployer, treasury, initialMint, maxSupply);
        governor = new SalyGovernor(
            token, timelock, votingDelay, votingPeriod, proposalThreshold, quorumNumerator
        );

        timelock.grantRole(timelock.PROPOSER_ROLE(), address(governor));
        timelock.grantRole(timelock.CANCELLER_ROLE(), address(governor));
        timelock.revokeRole(timelock.DEFAULT_ADMIN_ROLE(), deployer);

        vm.stopBroadcast();

        console2.log("Timelock:", address(timelock));
        console2.log("SalyTokenVotes:", address(token));
        console2.log("SalyGovernor:", address(governor));
        console2.log("Treasury:", treasury);
    }
}
