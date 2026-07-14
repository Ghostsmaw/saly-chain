# `@salychain/service-wallet`

Custodial wallet metadata and orchestration. Holds **no** private keys —
those live behind the isolated signer service (see [ADR-0005](../../docs/adr/0005-custody-isolation.md)).

## What this service does
- Provisions wallets across chains (Base, XRPL, Ethereum, Polygon, Internal).
- Stores wallet metadata, policy, and links to ledger accounts.
- Talks to the signer service to obtain signed transactions (never keys).
- Manages a broadcast queue with retries and confirmation tracking.

## What this service does *not* do
- Hold or transmit private keys.
- Decide whether a transaction is allowed (signer enforces policy).
- Apply ledger movements (ledger service does).

## Status
- ✅ Schema + DB scaffolding
- ✅ Wallet provisioning API (placeholder signer key refs in S0)
- ✅ Signer client interface
- ⏳ Real KMS-backed signer service (slice S1)
- ⏳ Broadcast worker + per-chain adapters (slice S1)
