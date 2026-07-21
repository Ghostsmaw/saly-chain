# Evidence — Staging partner-flow smoke

- Date (UTC): 2026-07-21
- Commit SHA: `2bb50acdef5e3f5e54ff927582e42f27d78e8709` (+ local fixes: XRPL `tx_json`/`DeliverMax` listener decode, ledger custody funding for settle)
- Gateway URL: `http://localhost:4000`
- Commands run:
  ```bash
  pnpm infra:up:core
  # Nest core services + XRPL listener via pnpm -F … dev
  ./scripts/smoke/wait-healthy.sh
  SMOKE_SETTLE_TIMEOUT_SEC=300 pnpm smoke:partner
  # After listener decode + custody fund, settle recovery:
  node scripts/smoke/publish-xrpl-payment-observed.mjs \
    --tx-hash 9799E9B2109F5189356F46F22C7569F56DD0E5B5CFB66C4F1835CCFD0283014B \
    --from rfC23BX7VTpUNcJnHyenD2WwPE81TVxvGz \
    --to rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe \
    --ledger 19248007 --amount-drops 1000000
  ```
- Result (pass/fail): **pass** (terminal state `SETTLED`)
- `SMOKE_WALLET_ID` (UUID ok to record): `4464e7c6-b2ae-4c7a-8448-802f225937ce`
- Execution tx id: `2946d235-4551-43d9-bd20-89538163bb81`
- Terminal tx state: **`SETTLED`** at `2026-07-21 12:15:21 UTC`
- On-chain tx hash: `9799E9B2109F5189356F46F22C7569F56DD0E5B5CFB66C4F1835CCFD0283014B` (XRPL testnet ledger `19248007`, `tesSUCCESS`)
- Ledger settle journal: `bb6adfff-af65-4d06-a3f9-3cd787c0f1b7`
- Webhook deliveries observed: partner-flow sink received lifecycle through `AWAITING_CONFIRMATION`; settle event republished after listener/ledger fixes
- Known local blockers fixed during drive:
  - gateway `/v1/health` auth bypass
  - BullMQ job id `:`
  - signer `required_approvers` whitelist
  - XRPL hex tx-bind
  - ledger FK on reserve
  - execution attach `tx_hash` from wallet broadcast event
  - XRPL listener WS shape `{ tx_json, meta, hash }` + `DeliverMax` (was skipping payments)
  - XRPL client `connectionTimeout` (testnet handshake >5s)
  - settle insolvency: custody not funded after faucet — seed now books `DR custody / CR wallet liability`
- Operator: local staging smoke (Cursor session)
