# ADR-0020: On-chain governance and contract-registry execution

**Status**: Accepted  
**Date**: 2026-06  
**Slice**: Milestone E (E0–E2)  
**Related**: [ADR-0018](0018-saly-token-and-launch-switch.md), [04-industry-expansion](../architecture/04-industry-expansion.md)

## Context

Milestone A–D shipped core rails, analytics, and stablecoin exit. The contract-registry
service tracked deployed programs but **pause/resume was DB-only** — operators could
mark a contract “paused” without an on-chain transaction. Production requires:

1. **Governor + Timelock** for protocol upgrades, treasury, and timelock-gated pauses.
2. **Registry v2** that records proposal lifecycle, calldata, tx hashes, and reconciles
   against the wallet broadcast queue.
3. **Shared vertical contracts** (`SalyAttestationRegistry`, `SalyAssetToken`) on L3.

## Decision

### E0 — `contracts/governance`

- **`SalyTokenVotes`**: new deploy (does not upgrade ADR-0018 `SalyToken`). Same launch
  switch + capped supply + **ERC20Votes** for checkpointed voting.
- **`SalyGovernor`**: OpenZeppelin Governor + TimelockController + 4% quorum defaults.
- **`DeployGovernance.s.sol`**: Timelock → token (owner = timelock) → governor; grant
  `PROPOSER_ROLE` / `CANCELLER_ROLE` to governor; renounce timelock admin from deployer.

### E1 — contract-registry v2 + wallet `CONTRACT_CALL`

- Prisma enums: `ControlKind.PAUSABLE`, `ExecutionMode.ON_CHAIN`, `ProposalStatus`.
- `proposeStatus`: ON_CHAIN + PAUSABLE → PENDING proposal → wallet `CONTRACT_CALL`
  with `encodePausablePause` / `encodePausableUnpause`; reconciler updates on confirm.
- Legacy contracts (XRPL hooks, etc.) stay `DB_ONLY`.
- **`CONTRACT_CALL`** broadcast kind in wallet with L3/Base dispatcher — keys remain in
  signer (ADR-0005).

### E2 — `contracts/registry`

- **`SalyAttestationRegistry`**: schemaId, issuer accreditation, revoke, `verify()`.
- **`SalyAssetToken`**: ERC-1155 with `MINTER_ROLE` / per-class URI.
- Registry service: issuer accreditation API + gateway read routes for verify.

## Security notes

- Timelock is the token owner in production deploys; governor is the sole proposer.
- Emergency pause uses a dedicated **PAUSER_ROLE** hot wallet (`GOVERNANCE_EXECUTOR_WALLET_ID`)
  with signer policy caps — not a raw private key in the registry service.
- Attestation payloads are **hashes only** on-chain; PII stays off-chain (GDPR/HIPAA).
- `CONTRACT_CALL` validates target address + calldata hex before enqueue.

## Alternatives considered

| Option | Why not |
|--------|---------|
| Upgrade `SalyToken` in place with votes | ADR-0018 forbids upgradeable token; migration risk |
| Registry submits txs directly (local key) | Violates ADR-0005 custody model |
| Keep DB-only pause for SalySD | False sense of safety — transfers would still execute |

## Consequences

- New `$SALY` governance deploy required for voting (existing token unchanged).
- Operators must grant `PAUSER_ROLE` on pausable L3 contracts to the executor wallet
  (or route pause through timelock proposals for production).
- CI runs `forge test` for `contracts/governance` and `contracts/registry`.
