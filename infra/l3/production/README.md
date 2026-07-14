# Saly L3 production — HA sequencer + read replicas (D3)

Production OP-Stack deployment with **Conductor** leader election, **read replica** op-geth nodes, and fault-proof settlement on Base mainnet.

## Layout

| Path | Purpose |
|------|---------|
| `deployments.base-mainnet.example.json` | Manifest template (DisputeGameFactory) |
| `docker-compose.l3-ha.yml` | Conductor + sequencer + replicas + batcher/proposer |
| `config/` | Conductor + op-node HA entrypoints |
| `scripts/` | bootstrap, preflight, deploy, up, status |

## Quick start

```bash
pnpm l3:production:bootstrap
# Fill .env with KMS-backed keys + contract addresses
pnpm l3:production:preflight
pnpm l3:production:deploy   # op-deployer artifacts
pnpm l3:production:up
```

## Public RPC fleet

Run the rate-limited gateway in front of read replicas:

```bash
pnpm -F @salychain/worker-l3-rpc-gateway dev
pnpm -F @salychain/worker-l3-ops-monitor dev
```

Set `L3_RPC_UPSTREAM_URLS` to internal replica URLs. Public clients use port **9520** (read-only policy).

## Verify

```bash
L3_NETWORK=saly-mainnet pnpm l3:verify:production
```

See [d3-l3-production.md](../../docs/runbooks/d3-l3-production.md) for on-call runbook.
