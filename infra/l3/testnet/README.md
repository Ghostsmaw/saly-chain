# Saly L3 testnet (`saly-testnet`, chain ID `845320002`)

Testnet uses the same op-deployer flow as devnet but targets chain ID **845320002** and stores artifacts under `infra/l3/testnet/`.

## Quick start

```bash
cp infra/l3/testnet/.env.example infra/l3/testnet/.env
# fill keys + remote L3_L3_RPC_URL

pnpm l3:testnet:preflight
pnpm l3:testnet:deploy          # writes deployments.base-sepolia.json (gitignored)
# boot remote sequencer stack (ops) — not local docker by default

L3_NETWORK=saly-testnet pnpm l3:verify
```

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm l3:testnet:preflight` | Validate env + L1 funding |
| `pnpm l3:testnet:deploy` | op-deployer apply → manifest |
| `pnpm l3:testnet:status` | Manifest + verify gate |

Local docker compose is **devnet-only** (`infra/l3/devnet/docker-compose.l3.yml`). Testnet assumes a hosted op-geth/op-node fleet.

See [`docs/runbooks/d1-l3-testnet.md`](../../docs/runbooks/d1-l3-testnet.md).
