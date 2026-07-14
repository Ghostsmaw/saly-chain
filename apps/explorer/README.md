# `@salychain/app-explorer`

Public multi-chain explorer for Base, Saly L3 and XRPL — powered by the Saly Realtime API (B3).

## What it shows

| Route | Surface |
|---|---|
| `/` | Network overview — USDC supply, latest transfers, rail routing stats |
| `/transfers` | Filterable transfer list |
| `/tx/{chain}/{hash}` | Transaction detail, token transfers, decoded events, **settlement lineage** |
| `/address/{chain}/{address}` | Balances + recent transfers |
| `/block/{chain}/{number}` | Block detail + transfers in block |
| `/intent/{id}` | **Intent → screening → rail → settlement** lineage (the moat) |
| `/l3/settlements` | L3 `OutputProposed` rollup → L1 settlement status |

## Dev

```bash
pnpm --filter @salychain/app-explorer dev   # http://localhost:3004
```

Requires `services/analytics-api` (4016) with ClickHouse populated by `analytics-ingest`.

Set `ANALYTICS_API_URL=http://localhost:4016` if not using the default.

## Deploy

Uses the shared Next.js Dockerfile (`infra/docker/Dockerfile.web`) and Helm app template (`explorer`, port 3000 in-cluster). Ingress host: `explorer.salychain.example`.
