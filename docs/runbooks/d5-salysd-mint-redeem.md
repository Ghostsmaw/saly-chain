# D5 — SalySD mint/redeem service integration

Operational runbook for org-scoped SalySD mint and redeem via `services/stablecoin` → `services/execution` → treasury wallets on L3.

## Prerequisites

| Variable | Service | Description |
|----------|---------|-------------|
| `L3_SALYSD_ADDRESS` | chain-l3 / workers | Deployed SalySD ERC-20 on target L3 network |
| `SALYSD_MINTER_WALLET_ID` | execution | Hot wallet with `MINTER_ROLE` |
| `SALYSD_BURNER_WALLET_ID` | execution | Hot wallet with `BURNER_ROLE` |
| `STABLECOIN_DEFAULT_RESERVE_ACCOUNT_ID` | stablecoin | Default reserve row for mint headroom checks |
| `STABLECOIN_ATTESTATION_MAX_AGE_MS` | stablecoin | Stale attestation gate (default 24h) |

Reserve account must have a fresh attestation (`as_of` within max age) before mint approval.

## API flow (via gateway)

Scopes: `stablecoin:read`, `stablecoin:write`.

### Mint

1. `POST /v1/stablecoin/mint-requests` — creates `PENDING` mint request; publishes `STABLECOIN_MINT_REQUESTED`.
2. Compliance/ops reviews request off-band.
3. `POST /v1/stablecoin/mint-requests/{id}/approve` — calls execution `POST /v1/salysd/mint`.
4. Treasury minter wallet broadcasts `SalySD.mint(recipient, amount)`.
5. L3 listener confirms → execution ledger: DR `asset.reserve.salysd` / CR `liability.wallet.{dest}`.
6. Stablecoin service marks `COMPLETED` on `TX_SETTLED` → `STABLECOIN_MINT_COMPLETED`.

### Redeem

1. `POST /v1/stablecoin/redeem-requests` — creates `PENDING` redeem request.
2. `POST /v1/stablecoin/redeem-requests/{id}/approve` — execution orchestrates:
   - Optional `SALYSD_APPROVE` from source wallet (if allowance insufficient).
   - `SALYSD_REDEEM` burnFrom from burner wallet.
3. Ledger: reserve source wallet → pending redeem → on burn settle CR `asset.reserve.salysd`.
4. `INTERNAL` payout rail: `COMPLETED` immediately after burn. `FIAT` rail: status `PAYOUT` → execution `POST /v1/salysd/redeem-fiat-payout` → `COMPLETED` on `FIAT_PAYOUT` `TX_SETTLED`.

### FIAT redeem payout

After on-chain burn settles, stablecoin `CompletionsService` moves the redeem to `PAYOUT` and calls execution with bank details from `redeem_requests.metadata.payout` (or execution env defaults for dev):

| Variable | Service | Purpose |
|----------|---------|---------|
| `SALYSD_REDEEM_FIAT_CURRENCY` | execution | Default payout currency (e.g. `USD`) |
| `SALYSD_REDEEM_FIAT_COUNTRY` | execution | ISO country for rail inference |
| `SALYSD_REDEEM_FIAT_ACCOUNT` | execution | Dev/stub destination account |
| `SALYSD_REDEEM_FIAT_SOURCE_ACCOUNT_ID` | execution | Ledger source override |

Create FIAT redeems with optional `payout` on `POST /v1/redeem-requests`:

```json
{
  "payout_rail": "FIAT",
  "payout": {
    "currency": "USD",
    "country_code": "US",
    "account_number": "000123456789",
    "bank_code": "021000021",
    "holder_name": "Acme Corp"
  }
}
```

## Direct service endpoints (internal)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/v1/mint-requests` | Create mint request |
| POST | `/v1/mint-requests/:id/approve` | Trigger on-chain mint |
| POST | `/v1/redeem-requests` | Create redeem request |
| POST | `/v1/redeem-requests/:id/approve` | Trigger burn |
| GET | `/v1/reserves` | List reserve accounts |
| GET | `/v1/supply/latest?chain=SALY_L3` | Latest supply snapshot |

Execution:

| Method | Path |
|--------|------|
| POST | `/v1/salysd/mint` |
| POST | `/v1/salysd/redeem` |
| POST | `/v1/salysd/redeem-fiat-payout` |
| GET | `/v1/salysd/transactions` |

## Security properties

- Mint blocked when reserve headroom or stale attestation fails (fail-closed).
- Minter/burner keys isolated in treasury hot wallets (not user custodial wallets).
- Idempotency at stablecoin, execution, and wallet broadcast layers.
- Redeem requires ERC-20 allowance from holder → burner before `burnFrom`.

## Verification

```bash
# Contract encoders
pnpm --filter @salychain/chain-l3 test

# Stablecoin unit tests
pnpm --filter @salychain/service-stablecoin test

# Typecheck touched services
pnpm --filter @salychain/service-execution typecheck
pnpm --filter @salychain/service-wallet typecheck
pnpm --filter @salychain/service-stablecoin typecheck
pnpm --filter @salychain/service-gateway typecheck
```

## Analytics

`GET /v1/data/stablecoin/salysd/supply` (via analytics-api, `data:read` scope) — on-chain supply by chain from ClickHouse.

## Related

- [ADR-0019](../adr/0019-salysd-and-reserves.md)
- [08-milestone-d-plan.md](../architecture/08-milestone-d-plan.md)
- [d2-l3-bridge.md](./d2-l3-bridge.md) — bridge patterns reused for wallet dispatch
