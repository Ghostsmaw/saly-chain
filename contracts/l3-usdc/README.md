# contracts/l3-usdc — SalyTestUSDC

A 6-decimal, USDC-shaped ERC-20 for the **Saly L3 devnet / testnet money rail only**.
It lets the custodial L3 USDC rail (wallet → signer → execution → chain-listener) be
exercised end-to-end without bridging real Circle USDC onto a devnet.

> **Not for mainnet.** Mainnet uses Circle USDC (Base) or a canonically bridged USDC
> on L3. This token is intentionally mintable.

## Features

- `decimals() == 6` — identical minor-unit math to real USDC.
- `mint(to, amount)` — owner-gated; used to seed custodial treasury wallets.
- `faucet(amount)` — rate-limited public mint (per-call cap + per-address cooldown);
  owner can disable via `configureFaucet`.
- EIP-2612 `permit` (gasless approvals) + two-step ownership (`Ownable2Step`).

## Develop

```bash
forge build
forge test -vvv
forge fmt --check
```

`lib/` (OpenZeppelin + forge-std) is vendored so the workspace builds offline and in CI.

## Deploy to the L3 devnet

```bash
PRIVATE_KEY=0x<funded-l3-key> \
L3_L3_RPC_URL=http://127.0.0.1:9545 \
FAUCET_DRIP_CAP=10000000000 \   # 10,000 USDC (6dp)
TREASURY_ADDRESS=0x<treasury> \
TREASURY_MINT=1000000000000 \   # 1,000,000 USDC (6dp), optional
  forge script script/DeployTestUsdc.s.sol --rpc-url saly-l3 --broadcast
```

The orchestration script `infra/l3/devnet/scripts/deploy-usdc.sh` wraps this and
writes the deployed address into the L3 deployments manifest
(`infra/l3/devnet/deployments.base-sepolia.json` → `assets.USDC`), which the chain
adapter, listener, and routing read automatically.
