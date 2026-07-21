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
 *
 * $SALY ownership handoff: this script leaves `SalyTokenVotes.owner()` as
 * `deployer` until `TIMELOCK_MIN_DELAY` seconds after deployment — it only
 * *schedules* the `acceptOwnership()` call that finishes moving mint /
 * activate / allowlist authority to the timelock (see inline comments
 * below). Ops must run the logged `timelock.execute(...)` command once the
 * delay elapses; anyone may run it, no privileged key required.
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

        // ── Hand $SALY's owner-gated authority (mint/activate/allowlist) to
        // the timelock. Leaving `deployer` as the permanent Ownable owner —
        // the previous behaviour — meant a single EOA private key could
        // mint unlimited $SALY (up to cap) forever, completely bypassing
        // the governance stack this script just built.
        //
        // `SalyTokenVotes` uses Ownable2Step: the new owner must actively
        // call `acceptOwnership()`, and only a contract's own code can make
        // it call anything, so we schedule that single call *through the
        // timelock itself*, subject to the same `minDelay` every other
        // governance action must pass:
        //   1. `transferOwnership` starts the handoff (owner() is still
        //      `deployer` until step 3 executes).
        //   2. `deployer` is granted PROPOSER_ROLE for exactly long enough
        //      to submit this one scheduled call, then the role is revoked
        //      in this same transaction — it can never propose anything
        //      else, and (unlike the governor) it never holds
        //      CANCELLER_ROLE, so it cannot pull the operation back once
        //      scheduled.
        //   3. After `minDelay` elapses, EXECUTOR_ROLE is open
        //      (`executors[0] = address(0)`), so anyone may call
        //      `timelock.execute(...)` with the logged arguments to
        //      complete the handoff — no further deployer action required.
        bytes memory acceptOwnershipCall = abi.encodeCall(token.acceptOwnership, ());
        token.transferOwnership(address(timelock));
        timelock.grantRole(timelock.PROPOSER_ROLE(), deployer);
        timelock.schedule(address(token), 0, acceptOwnershipCall, bytes32(0), bytes32(0), minDelay);
        timelock.revokeRole(timelock.PROPOSER_ROLE(), deployer);

        timelock.revokeRole(timelock.DEFAULT_ADMIN_ROLE(), deployer);

        vm.stopBroadcast();

        console2.log("Timelock:", address(timelock));
        console2.log("SalyTokenVotes:", address(token));
        console2.log("SalyGovernor:", address(governor));
        console2.log("Treasury:", treasury);
        console2.log("---");
        console2.log("$SALY ownership handoff to the timelock is SCHEDULED, not yet complete.");
        console2.log("owner() still returns the deployer until the call below is executed.");
        console2.log("After minDelay seconds, anyone may run:");
        console2.log("  cast send <timelock> 'execute(address,uint256,bytes,bytes32,bytes32)' \\");
        console2.log("    <token> 0 <acceptOwnershipCall> 0x0 0x0");
        console2.logBytes(acceptOwnershipCall);
    }
}
