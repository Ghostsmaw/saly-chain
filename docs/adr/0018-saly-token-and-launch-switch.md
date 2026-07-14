# ADR-0018: $SALY utility token and the launch switch

**Status**: Accepted  
**Date**: 2026-05  
**Slice**: S9 — Token  
**Related**: [ADR-0014](0014-escrow-contract-primitive.md) (contract conventions)

## Context

S9 introduces **`$SALY`**, the network's utility token, plus a staking distributor.
Before this slice the only on-chain code was `contracts/escrow` — there was no token.

The hard requirement from the operator: **we must be able to deploy, mint, distribute,
and wire up the token well before public trading opens, and then flip it live on our own
schedule** ("when we are ready or whenever we want"). A token that is tradable the instant
it is deployed forces a risky big-bang launch (liquidity, allocations, and integrations
all have to land in one transaction window). We want the opposite: set everything up
quietly, then throw one switch.

## Decision

Ship **`contracts/token`** with two contracts built on OpenZeppelin v5:

### `SalyToken` — ERC-20 with a launch switch

- **Standard surface**: `ERC20` + `ERC20Permit` (EIP-2612 gasless approvals) +
  `ERC20Burnable`, 18 decimals, name `SalyChain` / symbol `SALY`.
- **Capped supply**: `ERC20Capped` with an **immutable** `maxSupply`. `mint` is
  owner-gated and can never exceed the cap.
- **`Ownable2Step`** ownership so admin handoff to a multisig/timelock can't brick the token.
- **The launch switch** — the headline:
  - Deploys with `activated == false`.
  - While not activated, the `_update` hook **rejects peer transfers** unless the
    sender or recipient is on the owner-managed **allowlist** (owner + treasury are
    allowlisted at construction).
  - **Mint (`from == 0`) and burn (`to == 0`) always pass**, so treasury allocation
    and distribution work pre-launch.
  - `activate()` is **owner-only and one-way**. After it fires, public transfers are
    open forever. There is **no pause / deactivate** — a re-lockable token is a rug
    vector, so we refuse to ship one.

### `SalyStaking` — Synthetix-style rewards

The audited, widely-deployed `StakingRewards` shape: `rewardPerToken` accumulator,
O(1) per-action accrual, `notifyRewardAmount` to fund a period. Deployed single-asset
(stake `$SALY`, earn `$SALY`). When staking and reward tokens coincide, staked
principal is excluded from reward backing and `recoverERC20` refuses the staking
token — staked funds can never be over-promised or swept.

## Why an on-chain switch (vs. an off-chain feature flag)

An env flag in our services would gate *our UI*, but anyone could still trade a
deployed-and-tradable token directly on a DEX or via `transfer`. The guarantee only
holds if enforced **on-chain**. The allowlist + one-way `activate()` is the canonical
"launch toggle" pattern and is the single source of truth for "is the token live".

Off-chain surfaces (dashboards, SDK) can simply read `token.activated()` when/if we
expose token features — no separate flag to keep in sync.

## Alternatives considered

1. **Always-tradable token, no switch.** Rejected — forces a big-bang launch and
   leaks supply into the market during setup.
2. **Pausable (re-lockable) transfers.** Rejected — a pause that can be re-applied is
   an ongoing freeze/rug vector and erodes holder trust.
3. **Upgradeable proxy.** Rejected for the same reason as the escrow (ADR-0014): an
   upgrade vector on a token is a foot-gun. Policy changes = redeploy.
4. **Off-chain feature flag only.** Rejected — unenforceable on-chain (see above).

## Consequences

- Operators deploy pre-launch, mint under the cap, allowlist the staking/liquidity
  contracts, then call `activate()` exactly when ready.
- The token is non-upgradeable; supply policy can be frozen by renouncing ownership.
- Off-chain integration (binding `$SALY` to fees/discounts/governance) is intentionally
  **out of scope** for S9 and gated on activation; this ADR covers the primitive only.
- Testnet-only until an external audit precedes the first production `activate()`.
