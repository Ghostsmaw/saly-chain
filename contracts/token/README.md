# `@salychain/contracts-token`

The **$SALY** utility token and its staking distributor (Foundry / Solidity 0.8.24).

This is **S9** of the roadmap. The token ships behind a launch switch so it can be
deployed, minted, and wired into integrations long before public trading opens —
and flipped live "when we are ready or whenever we want".

## Contracts

| Contract          | Purpose                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------- |
| `SalyToken.sol`   | ERC-20 `$SALY`: capped supply, EIP-2612 permit, burnable, `Ownable2Step`, **launch switch** |
| `SalyStaking.sol` | Synthetix-style staking rewards — stake `$SALY`, earn `$SALY` over a reward period         |

## The launch switch

`SalyToken` deploys **not activated**. Until the owner calls `activate()`:

- **Only allowlisted addresses** can send or receive transfers. The owner and
  treasury are allowlisted at construction; add the staking contract, a liquidity
  manager, or a distribution multisig with `setAllowlisted(addr, true)`.
- **Minting and burning always work**, so treasury allocation and distribution
  happen pre-launch with zero public-market leakage.

`activate()` is **one-way and owner-only**. Once flipped, public transfers are open
permanently — there is deliberately no pause/deactivate path (a re-lockable token is
a rug vector). See [ADR-0018](../../docs/adr/0018-saly-token-and-launch-switch.md).

```solidity
token.setAllowlisted(stakingContract, true); // pre-launch plumbing
token.mint(treasury, allocation);            // distribute under the cap
// … wire integrations, seed liquidity, run staking …
token.activate();                            // 🔛 go live
```

## Supply policy

- Hard cap enforced by OpenZeppelin `ERC20Capped`; `maxSupply` is immutable.
- `mint` is owner-gated and bounded by the cap. Mint the treasury allocation at
  deploy, then mint staking rewards on a schedule up to the cap.
- Once distribution policy is fixed, transfer ownership to a timelock/multisig (or
  `renounceOwnership()` to freeze supply forever).

## Build & test

```bash
# install foundry if you haven't (https://book.getfoundry.sh/getting-started/installation)
curl -L https://foundry.paradigm.xyz | bash && foundryup

# inside contracts/token
forge install openzeppelin/openzeppelin-contracts@v5.0.2 foundry-rs/forge-std
forge build
forge test -vvv
```

30 tests cover the launch gate, cap, permit, two-step ownership, staking accrual,
the single-asset reward-backing invariant, and recovery guards.

## Deploy

```bash
PRIVATE_KEY=…  TREASURY_ADDRESS=0x…  INITIAL_MINT=…  MAX_SUPPLY=…  BASE_RPC_URL=… \
  forge script script/Deploy.s.sol --rpc-url base-sepolia --broadcast --verify
```

Deploys `$SALY` (pre-launch) + `SalyStaking`, and allowlists the staking contract.
The token is left **not activated** — flip it from the owner key when ready:

```bash
cast send $SALY_ADDRESS "activate()" --rpc-url base-sepolia --private-key $PRIVATE_KEY
```

## Security notes

- **Non-upgradeable.** No proxy, no upgrade vector. Policy changes = redeploy.
- **One-way activation.** No re-lock; transfers can never be frozen post-launch.
- **Capped supply.** `mint` can never exceed the immutable `maxSupply`.
- **Two-step ownership** (`Ownable2Step`) avoids fat-fingering admin to a dead address.
- **Staking principal is never reward backing** — when `stakingToken == rewardsToken`,
  `notifyRewardAmount` excludes staked principal and `recoverERC20` refuses the staking
  token, so staked funds can't be swept.
- **Re-entrancy guarded** on every state-mutating staking entry; SafeERC20 throughout.

Audit posture: starter code, testnet-only until an external audit precedes the first
production activation.
