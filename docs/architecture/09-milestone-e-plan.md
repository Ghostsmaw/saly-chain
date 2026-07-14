# Milestone E — Governance + verticals: phased plan (E0–E7)

> **Goal:** ship on-chain governance, wire contract-registry to real pause execution, deploy shared vertical attestation/asset contracts, and productize industry vertical modules.

See [05-technical-implementation.md](05-technical-implementation.md) §9–10 and [04-industry-expansion.md](04-industry-expansion.md).

---

## Phase overview

| Phase     | Name                         | Headline outcome                                      |
| --------- | ---------------------------- | ----------------------------------------------------- |
| **E0** ✅ | Governance contracts         | `SalyGovernor` + Timelock + `SalyTokenVotes` + deploy |
| **E1** ✅ | Registry v2 + on-chain pause | Proposals → wallet `CONTRACT_CALL` → tx receipt       |
| **E2** ✅ | Shared vertical contracts    | Full `SalyAttestationRegistry` + `SalyAssetToken`     |
| **E3** ✅ | AI Agents vertical           | Marketplace, subscriptions, invoices, usage metering  |
| **E4** ✅ | Finance vertical             | Instruments, holdings, loans, cashflows, DvP          |
| **E5** ✅ | Government + Agriculture     | Programs, disbursements, produce traceability         |
| **E6** ✅ | Supply chain + Aviation      | Shipments, custody, parts lifecycle                   |
| **E7** ✅ | Healthcare + Education       | Consent, claims, credentials, tuition                 |

---

## E3 — AI Agents ✅

**Delivered**

- Extended `services/agents` — `AgentService`, subscriptions, marketplace listings, invoices, usage meters.
- `contracts/agents/` — `SalyAgentRegistry`, `SalyStreamPay`, deploy script, Foundry tests.
- Gateway: `GET /v1/agents/marketplace/discover`.
- Events: `salychain.agent.service_published`, `subscription_created`, `usage_recorded`.

**Exit:** agent publishes service → subscriber subscribes → usage meter recorded → discover via gateway.

---

## E4 — Finance ✅

**Delivered**

- `services/finance` — instruments, holdings, loans, cashflows, DvP trades.
- Gateway proxy routes under `/v1/finance/*`.

---

## E5 — Government + Agriculture ✅

**Delivered**

- `services/gov` — programs, beneficiaries, batch disbursements, procurement, transparency.
- `services/agri` — farmers, farms, input loans, parametric insurance, produce lots, offtake.

---

## E6 — Supply Chain + Aviation ✅

**Delivered**

- `services/scm` — shipments, custody, trade docs, trade finance, escrow settlements.
- `services/aviation` — aircraft, serialized parts, MRO attestations, DvP settlements.

---

## E7 — Healthcare + Education ✅

**Delivered**

- `services/health` — consent (hashed subjects), claims adjudication, record attestations.
- `services/edu` — credentials, tuition invoices, scholarship escrow milestones.

---

## Operator runbook

- E0–E2: [e0-e2-governance-verticals.md](../runbooks/e0-e2-governance-verticals.md)
- E3–E7: [e3-e7-vertical-modules.md](../runbooks/e3-e7-vertical-modules.md)
- **Full ops closeout:** [e-milestone-e-ops-closeout.md](../runbooks/e-milestone-e-ops-closeout.md)

**Verify gates**

```bash
pnpm milestone-e:verify              # local/schema (default)
MILESTONE_E_ON_CHAIN=1 pnpm milestone-e:verify   # after on-chain deploy
pnpm l3:testnet:e-ops:apply          # one-shot apply pipeline
```
