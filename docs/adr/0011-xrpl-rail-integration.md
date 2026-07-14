# ADR 0011 — XRPL native payments as the second rail

* **Status:** Accepted
* **Date:** 2026-05
* **Slice:** S2

## Context

Base USDC (S1) gives us a fast, cheap, dollar-denominated rail with deep liquidity but with two properties that don't fit every use case:

1. Settlement is "soft" — we wait for confirmations (currently 2) before treating a transfer as settled.
2. Privacy is weak: every Base transfer is publicly traceable.

Cross-border value transfer (USD ↔ EUR, USD ↔ JPY) also benefits from a rail that:

* Settles in seconds with strong finality.
* Has bilateral price discovery (the XRPL on-ledger order book).
* Costs effectively nothing per transaction.

The XRPL is the natural second rail.

## Decision

We add a complete XRPL stack in S2:

* `packages/chain-xrpl` — a viem-style adapter over `xrpl.js`:
  * `prepareTransfer` autofills a Payment, returns the canonical binary blob.
  * `broadcast` submits a signed blob and surfaces engine results.
  * `getPayments` decodes Payment txs in a validated-ledger range, filtered by our addresses.
* `services/signer` gains an `XrplChainSigner` (ed25519 via `ripple-keypairs`). The seed is the canonical key form; we KMS-wrap the seed and re-derive at signing time.
* `services/wallet` gets a `XrplDispatcher` that mirrors the Base dispatcher: prepare → sign → broadcast, with idempotency keyed on `(broadcast_job_id, sequence)`.
* `services/workers/chain-listener-xrpl` polls validated ledgers (no reorg risk on XRPL once a ledger is validated; we keep `LISTENER_CONFIRMATIONS=0`), emits `salychain.chain.xrpl.payment_observed`, and the execution service marks the matching transaction `SETTLED`.

S2 ships **native XRP only**. IOU payments (USD-issued tokens via a gateway like Gatehub or Bitstamp, with trust lines) require:

* Trust-line provisioning into the wallet policy engine.
* IOU amount encoding in the chain adapter.
* Per-issuer policy in the signer.

That work lands in S3 once we have a counterparty for the issuer relationship.

## Why an ed25519 seed (not the keys)?

XRPL accepts both ed25519 and secp256k1; ed25519 is the recommended algorithm for accounts created post-2017. The seed is the canonical key form: it's a base58check encoding that's stable, derivable, and convertible. Wrapping the seed (rather than the derived private key) lets us reuse the same key material for non-Payment transactions later (TrustSet, OfferCreate, etc.).

## Consequences

* SalyChain has two production-grade chain rails after S2; the routing engine has real choice to make.
* The XRPL chain listener is *simpler* than the Base listener because XRPL ledgers don't reorg post-validation.
* Adding more rails follows the same shape: adapter → signer plugin → wallet dispatcher → chain listener.

## Open items deferred to S3

* IOU payments on XRPL (USD, EUR via gateway issuers).
* XRPL DEX integration for on-ledger price discovery.
* Multi-signing accounts for treasury XRPL wallets.
* Account reserve management (XRP-bound minimum balance per active account).
