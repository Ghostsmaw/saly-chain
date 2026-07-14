# D1 — Saly L3 testnet

> Repeatable **saly-testnet** (`chainId: 845320002`) environment for Milestone D bridge + SalySD work.

## Prerequisites

- Base Sepolia RPC + funded deployer key
- `op-deployer` / OP-Stack toolchain (see [`s5-l3-devnet-rollup.md`](s5-l3-devnet-rollup.md))
- Milestone A observability (metrics, alerts) in staging

## Deploy sequence

1. **Preflight** — `pnpm l3:testnet:preflight`
2. **Full apply** — `pnpm l3:testnet:apply` (preflight → op-deployer → optional SalySD → verify)
3. **Rollup only** — `pnpm l3:testnet:deploy` → manifest `infra/l3/testnet/deployments.base-sepolia.json` (gitignored)
4. **SalySD token** — set `SALYSD_ADMIN` / role keys, then `pnpm l3:testnet:deploy:salysd`
5. **Treasury + reserve** — `pnpm l3:testnet:treasury:bootstrap`, `pnpm l3:testnet:reserve:bootstrap`
6. **Workers** — copy `infra/l3/testnet/workers.env.example` to each worker host:
   ```bash
   L3_NETWORK=saly-testnet
   L3_L3_RPC_URL=<testnet rpc>
   L3_SETTLEMENT_RPC_URL=https://sepolia.base.org
   L3_L2_OUTPUT_ORACLE=<from manifest>
   LISTENER_CONFIRMATIONS=2
   ```
7. **Verify** — `L3_NETWORK=saly-testnet pnpm l3:verify`
8. **E2E smoke** — `pnpm l3:testnet:e2e:bridge`, `pnpm l3:testnet:e2e:salysd` (services + treasury wallets running)
9. **Remote status** — `pnpm l3:testnet:status:remote` against deployed RPC fleet

## Exit criteria (D1)

| Check | Command / signal |
|-------|------------------|
| Manifest present | `deployments.base-sepolia.json` or env oracle |
| Oracle on-chain | `pnpm l3:verify` → `oracle_contract` pass |
| Output proposed | `pnpm l3:verify` → `output_proposed` pass |
| Listener lag | `salychain_chain_listener_lag_blocks{chain="SALY_L3"}` < threshold |
| Monitor healthy | `curl :4098/health` → `{ "ok": true }` |

## Security

- Batcher/proposer keys in KMS — never in manifest
- Fail-closed: `assertL3Connection` rejects wrong chain ID or missing USDC/SalySD bytecode
- Testnet faucet tokens (`SalyTestUSDC`) **must not** deploy on testnet — use **SalySD** (D4)

## Next

- **D2** — wire `optimismPortal` in manifest; bridge deposit/withdraw
- **D4** — deploy SalySD via `contracts/salysd/script/DeploySalySD.s.sol`; set `assets.SalySD` in manifest
