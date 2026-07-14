# L3 OP-Stack devnet (reproducible, in-repo)

SalyChain L3 devnet uses **Base Sepolia** as the settlement layer (L1 for the rollup).
Unlike a manual Optimism checkout, this directory ships a **reproducible, secured,
one-command** OP-Stack stack: op-geth + op-node (sequencer) + op-batcher + op-proposer,
plus deploy/operate scripts and a devnet USDC.

## Prerequisites

- Docker ≥ 24 (Compose v2)
- Foundry (`cast`, `forge`)
- `jq`, `openssl`
- A Base Sepolia RPC URL and **dedicated, funded** devnet keys (batcher, proposer,
  deployer). Never reuse mainnet/treasury keys.

## One-command flow

```bash
# 0. Configure (committed example → gitignored .env)
cp infra/l3/devnet/.env.example infra/l3/devnet/.env
#    set L1_RPC_URL + L3_BATCHER_PRIVATE_KEY + L3_PROPOSER_PRIVATE_KEY (+ deployer)

# 1. Validate config, key format, and on-chain funding (fail-closed)
pnpm l3:preflight

# 2. Deploy settlement contracts via op-deployer → artifacts + manifest
pnpm l3:deploy
#    copy contracts.l2OutputOracle from deployments.base-sepolia.json into
#    infra/l3/devnet/.env as L3_L2_OUTPUT_ORACLE

# 3. Boot the sequencer stack (generates the engine JWT, waits for op-geth health)
pnpm l3:up

# 4. Deploy the devnet USDC + record it in the manifest (money rail)
pnpm l3:deploy:usdc

# 5. Status + spike exit criteria
pnpm l3:status
pnpm l3:verify

# Teardown (add --volumes to wipe chain data, --artifacts to force a fresh deploy)
pnpm l3:down
```

## Architecture

```
Base Sepolia (L1)
  ├── BatchInbox      ◀── op-batcher (DA: calldata)
  └── L2OutputOracle  ◀── op-proposer (output roots)
        ▲
        └── observed by SalyChain l3-rollup-monitor (OutputProposed)

Saly L3 (chain 845320001)
  op-geth (exec, :9545) ⇄ op-node (sequencer, :9547)
        ▲
        └── SalyChain chain-listener-l3 (USDC transfers) + execution payouts
```

## Security model

- **Secrets** (L1 RPC + batcher/proposer/deployer keys) live only in the gitignored
  `.env`; `preflight.sh` validates key format, rejects placeholders, and asserts
  funding before any spend. Secrets are masked in logs.
- **Artifacts** (`artifacts/` — genesis, rollup config, op-deployer state, and the
  engine-API `jwt.txt`) are gitignored; the JWT is generated with `0600` perms.
- **Containers** run with `no-new-privileges`, `cap_drop: ALL`, pinned image tags,
  per-container memory/CPU limits, and bounded log rotation.
- **Fail-closed money rail**: `chain-listener-l3` calls `assertL3Connection` at
  startup — it refuses to run if the RPC chain id doesn't match `saly-devnet`, or if
  a configured USDC address has no bytecode (`packages/chain-l3/src/preflight.ts`).

## Files

| Path                                      | Purpose                                          |
| ----------------------------------------- | ------------------------------------------------ |
| `docker-compose.l3.yml`                   | op-geth / op-node / op-batcher / op-proposer     |
| `config/*-entrypoint.sh`                  | Per-component startup (flag assembly, geth init) |
| `scripts/lib.sh`                          | Shared helpers + fail-closed validation          |
| `scripts/preflight.sh`                    | Tooling/env/key/funding checks                   |
| `scripts/deploy.sh`                       | op-deployer → artifacts + manifest               |
| `scripts/up.sh` / `down.sh` / `status.sh` | Lifecycle                                        |
| `scripts/deploy-usdc.sh`                  | Deploy `SalyTestUSDC` + record in manifest       |
| `.env.example`                            | Committed config template (copy → `.env`)        |
| `rollup.intent.json`                      | Legacy op-deployer intent (reference)            |

See [docs/runbooks/s5-l3-devnet-rollup.md](../../../docs/runbooks/s5-l3-devnet-rollup.md)
and [docs/runbooks/s6-l3-money-rail.md](../../../docs/runbooks/s6-l3-money-rail.md).
