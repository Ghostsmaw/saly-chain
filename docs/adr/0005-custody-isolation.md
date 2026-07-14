# ADR-0005: Custody isolated behind a Signer Service + KMS

- **Status:** Accepted
- **Date:** 2026-05-28

## Context
Custody is the highest-risk surface of any financial platform. A single key leak can be terminal. We need a design where:
1. Application code can never read private keys.
2. A compromised application service cannot exfiltrate funds beyond a per-wallet policy.
3. We can migrate from KMS to MPC (Fireblocks / Turnkey / self-hosted threshold) without rewriting callers.

## Decision
- A dedicated **`signer` service** runs in a **separate subnet** with **no public egress** and **no application database access**.
- All signing happens via a narrow RPC: `signer.signTransaction(walletId, unsignedTx, policyContext)`.
- Key material is **never** returned. Keys are wrapped by **AWS KMS**; the signer only ever holds plaintext keys ephemerally in memory during signing.
- Each wallet has a **policy** (allowlist of destinations, per-tx caps, daily caps, required approvals) evaluated by the signer **before** signing.
- The signer enforces an **idempotency key** on every signing request and persists an audit record.

## Consequences
- ✅ Application services cannot leak keys even if fully compromised.
- ✅ Policy enforcement happens at the last possible moment.
- ✅ Swappable backend (KMS → MPC) behind the same RPC.
- ⚠️ One additional network hop per transaction; mitigated by signer pooling and connection reuse.
- ⚠️ Signer becomes a critical dependency; deployed multi-AZ with autoscaling and health-gated traffic.

## Alternatives considered
- **In-process signing**: rejected — blast radius too large.
- **HSM-only (no service layer)**: rejected — policy enforcement is more flexible in code; HSM is for key material only.
