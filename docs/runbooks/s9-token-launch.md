# S9 — $SALY token deploy & launch switch

End-to-end: deploy `$SALY` (pre-launch, transfers locked) + `SalyStaking` → mint the
treasury allocation → wire integrations under the allowlist → fund a staking period →
**flip `activate()` when ready** to open public transfers.

## Prerequisites

- Foundry (`forge`, `cast`) — see [contracts/token/README.md](../../contracts/token/README.md)
- Base Sepolia RPC + funded deployer key (see [S1 runbook](s1-base-testnet-payout.md))
- A **treasury** address (multisig in prod) for the initial mint

## 1. Build & test

```bash
cd contracts/token
forge install openzeppelin/openzeppelin-contracts@v5.0.2 foundry-rs/forge-std
forge build
forge test -vvv   # 30 tests, incl. the launch-gate suite
```

## 2. Deploy (pre-launch)

```bash
export PRIVATE_KEY=0xYourDeployerKey
export TREASURY_ADDRESS=0xYourTreasury
export INITIAL_MINT=100000000000000000000000000   # 100M * 1e18
export MAX_SUPPLY=1000000000000000000000000000     # 1B  * 1e18 (immutable cap)
export BASE_RPC_URL=https://sepolia.base.org

forge script script/Deploy.s.sol --rpc-url base-sepolia --broadcast --verify
```

The script deploys `$SALY` (**not activated**) + `SalyStaking`, mints `INITIAL_MINT`
to the treasury, and allowlists the staking contract. Capture both addresses from the
log:

```
SalyToken deployed at:   0x…
SalyStaking deployed at: 0x…
Activated: false
```

## 3. Pre-launch setup (transfers still locked)

While `activated == false`, only allowlisted senders/recipients can move tokens.
Mint and burn always work. Do everything you need **before** going live:

```bash
# Allowlist a liquidity manager / distribution multisig
cast send $SALY "setAllowlisted(address,bool)" 0xLiquidityMgr true \
  --rpc-url base-sepolia --private-key $PRIVATE_KEY

# Mint additional allocation under the cap (e.g. staking rewards budget)
cast send $SALY "mint(address,uint256)" $TREASURY_ADDRESS 50000000000000000000000000 \
  --rpc-url base-sepolia --private-key $PRIVATE_KEY

# Fund + start a 7-day staking reward period
cast send $SALY "transfer(address,uint256)" $STAKING 7000000000000000000000 \
  --rpc-url base-sepolia --private-key $TREASURY_KEY
cast send $STAKING "notifyRewardAmount(uint256)" 7000000000000000000000 \
  --rpc-url base-sepolia --private-key $PRIVATE_KEY
```

Verify the gate is doing its job — a transfer between two non-allowlisted EOAs must
revert with `Saly__TransfersNotActive`.

## 4. 🔛 Flip the switch — go live

When you're ready (liquidity seeded, allocations done, integrations wired):

```bash
cast send $SALY "activate()" --rpc-url base-sepolia --private-key $PRIVATE_KEY

# Confirm
cast call $SALY "activated()(bool)" --rpc-url base-sepolia   # → true
```

Public transfers are now **permanently** open. `activate()` is one-way; there is no
re-lock. Verify an arbitrary user-to-user transfer now succeeds.

## 5. Stake / claim (after activation)

```bash
cast send $SALY "approve(address,uint256)" $STAKING <amount> --rpc-url base-sepolia --private-key $USER_KEY
cast send $STAKING "stake(uint256)" <amount>               --rpc-url base-sepolia --private-key $USER_KEY
cast call $STAKING "earned(address)(uint256)" $USER --rpc-url base-sepolia
cast send $STAKING "getReward()"                           --rpc-url base-sepolia --private-key $USER_KEY
cast send $STAKING "exit()"                                --rpc-url base-sepolia --private-key $USER_KEY
```

## 6. Lock down admin (recommended)

Once supply/distribution policy is fixed, hand ownership to a multisig/timelock (or
freeze supply entirely):

```bash
# Two-step transfer to a multisig
cast send $SALY "transferOwnership(address)" 0xMultisig --rpc-url base-sepolia --private-key $PRIVATE_KEY
# multisig then calls acceptOwnership()

# …or freeze supply forever
cast send $SALY "renounceOwnership()" --rpc-url base-sepolia --private-key $PRIVATE_KEY
```

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| `Saly__TransfersNotActive` | Token not activated yet and neither party is allowlisted — expected pre-launch |
| `Saly__AlreadyActivated` | `activate()` already called; it's one-way |
| `ERC20ExceededCap` | `mint` would exceed the immutable `maxSupply` |
| `OwnableUnauthorizedAccount` | Caller isn't the owner (admin fns are owner-only) |
| `Staking__RewardTooHigh` | `notifyRewardAmount` exceeds the contract's reward balance — fund it first |
| `Staking__CannotRecoverStakingToken` | `recoverERC20` refuses the staking token by design |

## References

- [ADR-0018 — $SALY token & launch switch](../adr/0018-saly-token-and-launch-switch.md)
- [contracts/token/README.md](../../contracts/token/README.md)
