# `@salychain/service-stablecoin`

Native stablecoin (`SalySD`) lifecycle — reserves, mint/redeem requests, supply snapshots, and proof-of-reserves attestations (Milestone D5).

- **Port:** `4022`
- **Database:** `salychain_stablecoin`

## APIs

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/mint-requests` | Org-scoped mint request (idempotent) |
| POST | `/v1/redeem-requests` | Org-scoped redeem request |
| GET | `/v1/reserves` | List reserve accounts |
| POST | `/v1/reserves/attestations` | Record PoR attestation (admin) |
| GET | `/v1/supply/latest` | Latest supply vs reserve snapshot |
| POST | `/v1/supply/snapshots` | Capture reconciliation snapshot |

## Dev

```bash
pnpm --filter @salychain/service-stablecoin prisma:generate
pnpm --filter @salychain/service-stablecoin prisma:deploy
pnpm --filter @salychain/service-stablecoin dev
```

See [08-milestone-d-plan.md](../../docs/architecture/08-milestone-d-plan.md) and [ADR-0019](../../docs/adr/0019-salysd-and-reserves.md).
