# D6 — SalySD production exit + proof-of-reserves

Milestone D6 closes Milestone D: automated PoR, supply reconciliation alerts, public explorer transparency, and a go-live gate.

## Components

| Component | Path | Role |
|-----------|------|------|
| PoR library | `packages/stablecoin-por` | Attestation hashing, drift math, custodian adapters |
| PoR worker | `services/workers/stablecoin-por` (metrics **9108**) | Scheduled custodian → attestation → snapshot → optional oracle tx |
| Public API | `GET /v1/public/por` on stablecoin | Unauthenticated transparency feed |
| Explorer | `/l3/salysd` | Supply, reserves, ratio, mint/redeem history |
| Alerts | `StablecoinSupplyDrift`, `StablecoinAttestationStale` | Prometheus rules |
| Registry (optional) | `contracts/salysd/SalyAttestationRegistry.sol` | On-chain anchor for latest attestation |
| Verify gate | `pnpm stablecoin:verify` | D6 exit criteria |

## Local smoke

```bash
pnpm infra:up
pnpm db:migrate

# Seed reserve + attestation (testnet script works against local stablecoin too)
STABLECOIN_BASE_URL=http://localhost:4022 pnpm l3:testnet:reserve:bootstrap

# Start stablecoin + PoR worker
pnpm --filter @salychain/service-stablecoin dev
POR_CUSTODIAN_BALANCE_MINOR=1000000000000 POR_CUSTODIAN_CEILING_MINOR=1000000000000 \
  pnpm --filter @salychain/worker-stablecoin-por dev

# Public PoR
curl -s http://localhost:4022/v1/public/por | jq .

# Explorer
pnpm --filter @salychain/app-explorer dev   # → http://localhost:3004/l3/salysd

# Exit gate
pnpm stablecoin:verify
```

## Production configuration

| Env | Worker | Description |
|-----|--------|-------------|
| `POR_CUSTODIAN_URL` | worker | HTTPS custodian balance feed |
| `POR_RESERVE_ACCOUNT_ID` | worker | Target reserve row (default: first) |
| `POR_ORACLE_UPDATE_ENABLED` | worker | Submit `ReserveOracle.updateAttestation` |
| `POR_ORACLE_OWNER_WALLET_ID` | worker | Treasury wallet with oracle owner role |
| `L3_RESERVE_ORACLE_ADDRESS` | stablecoin + worker | On-chain oracle contract |
| `L3_SALYSD_ADDRESS` | stablecoin + worker | SalySD token for supply reads |

## On-chain oracle update

When `POR_ORACLE_UPDATE_ENABLED=true`, the worker submits a wallet broadcast of kind `SALYSD_ORACLE_UPDATE` (treasury oracle-owner wallet). Production should use a multisig/timelock as oracle owner per ADR-0019.

## External audit checklist

- [ ] Reserve custodian attestation methodology documented and signed off
- [ ] PoR hash algorithm reviewed (`packages/stablecoin-por/src/attestation.ts`)
- [ ] Supply drift alert wired to PagerDuty in staging
- [ ] Explorer `/l3/salysd` public without auth
- [ ] `pnpm stablecoin:verify` green in staging
- [ ] SalyTestUSDC **not** deployed on testnet/mainnet (devnet only)
- [ ] Mint headroom gated by fresh attestation (`STABLECOIN_ATTESTATION_MAX_AGE_MS`)

## Go-live gate

Run before mainnet SalySD launch:

```bash
pnpm stablecoin:verify
pnpm l3:verify:production
```

Both must exit 0. Halt mints if `StablecoinSupplyDrift` fires.
