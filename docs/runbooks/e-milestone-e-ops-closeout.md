# Milestone E — full ops closeout

One command for schema + code + (optional) on-chain deploy:

```bash
pnpm l3:testnet:e-ops:apply
```

Or step-by-step:

## 1. Database (all vertical services)

```bash
pnpm bootstrap:l3-envs
bash scripts/bootstrap-service-envs.sh
pnpm db:migrate
```

## 2. Code verify (E3–E7)

```bash
pnpm verticals:verify
```

## 3. On-chain (requires keys in `infra/l3/testnet/.env`)

Fill before running:

| Variable | Purpose |
|----------|---------|
| `L3_DEPLOYER_PRIVATE_KEY` | Forge deploy signer |
| `SALYSD_ADMIN` | Registry + SalySD admin address |
| `SALYSD_MINTER` / `SALYSD_BURNER` | SalySD roles |
| `L3_L3_RPC_URL` | L3 RPC (`http://127.0.0.1:9545` for local `pnpm l3:up`) |
| `SALYSD_ADMIN_PRIVATE_KEY` | Grant PAUSER_ROLE to executor |
| `GOVERNANCE_TREASURY` | Optional Base governance deploy |

```bash
pnpm l3:up                              # local L3 only
pnpm l3:testnet:deploy:salysd
pnpm l3:testnet:e-governance:apply      # E0–E2
pnpm l3:testnet:deploy:agents           # E3 contracts
pnpm milestone-e:sync-registry-env      # contract-registry .env
```

Restart `contract-registry` after sync.

## 4. Exit gate

**Local / schema-only (no on-chain):**

```bash
pnpm milestone-e:verify
```

**Full on-chain closeout:**

```bash
MILESTONE_E_ON_CHAIN=1 pnpm milestone-e:verify
```

**With running services:**

```bash
MILESTONE_E_REQUIRE_HEALTH=1 pnpm milestone-e:verify
```

## Scripts reference

| Script | Purpose |
|--------|---------|
| `pnpm l3:testnet:e-ops:apply` | Full pipeline (skips on-chain if keys missing) |
| `pnpm milestone-e:verify` | Unified E exit gate |
| `pnpm milestone-e:sync-registry-env` | Merge manifest → `contract-registry/.env` |
| `pnpm governance:verify` | E0–E2 only |
| `pnpm verticals:verify` | E3–E7 typecheck + Forge |
