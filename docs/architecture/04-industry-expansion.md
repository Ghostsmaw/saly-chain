# Phase 4 — Industry Expansion Modules

> Eight vertical modules that ride SalyChain's existing primitives — intents, custodial wallets, double-entry ledger, escrow, L3, event bus, and the Analytics Cloud (Phase 3). Each vertical = a domain data model, smart contracts, APIs, dashboard requirements, and a monetization model.

**Design principle:** verticals are **modules, not forks.** They reuse the intent pipeline, ledger, wallet/signer custody, compliance/risk, and analytics. A vertical typically adds: (a) a domain schema/service, (b) optional smart contract(s), (c) API surface on the gateway, (d) a dashboard surface, and (e) often a new `metadata`-carried intent context. The intent schema already supports `context.passthrough()` and `metadata`, so domain payloads attach without breaking the core contract.

Shared building blocks every vertical inherits:
- **Settlement & payments:** intents → multi-rail execution → ledger.
- **Identity & access:** `services/identity` (users, JWT, delegations), `services/admin` RBAC.
- **Custody:** `services/wallet` + `services/signer` (KMS).
- **Trust primitives:** `SalyEscrow` (conditional release), event bus (auditable trail), L3 (cheap high-volume anchoring).
- **Data:** Saly Analytics Cloud (datasets, streams, intelligence).
- **Verifiable records:** a proposed shared **Attestation/Registry contract** pattern (anchor a hash + metadata on L3) reused across non-payment verticals.

---

## 0. Shared cross-vertical contract: `SalyAttestationRegistry`

Most non-finance verticals need the same primitive: **anchor a verifiable record on-chain (hash + issuer + subject + schema), with revocation and access control** — without putting PII on-chain.

```solidity
// contracts/registry/SalyAttestationRegistry.sol (proposed, deploy on Saly L3)
contract SalyAttestationRegistry {
    struct Attestation {
        bytes32 schemaId;     // domain schema (e.g. keccak("healthcare.consent.v1"))
        address issuer;       // accredited issuer (role-gated)
        bytes32 subject;      // hashed subject id (patient/student/asset)
        bytes32 dataHash;     // hash of off-chain encrypted record
        uint64  issuedAt;
        uint64  expiresAt;
        bool    revoked;
    }
    mapping(bytes32 => Attestation) public attestations; // attestationId => record
    mapping(address => bool) public accreditedIssuers;   // governance-controlled

    event Attested(bytes32 indexed id, bytes32 indexed schemaId, address indexed issuer, bytes32 subject);
    event Revoked(bytes32 indexed id);

    function attest(bytes32 id, bytes32 schemaId, bytes32 subject, bytes32 dataHash, uint64 expiresAt) external;
    function revoke(bytes32 id) external;       // issuer or governance
    function verify(bytes32 id) external view returns (bool valid, Attestation memory);
}
```
Off-chain encrypted records live in object storage; only hashes/metadata are anchored. This satisfies GDPR/HIPAA ("right to erasure" works because PII is off-chain).

A second shared primitive, **`SalyAssetToken` (ERC-1155/3525 tokenization template)**, is reused by Finance, Agriculture, Aviation, and Supply Chain for fractional/serialized real-world assets.

---

## 1. Finance

**Thesis:** SalyChain is already a financial execution network — Finance extends it into capital markets, lending, and treasury.

| Aspect | Spec |
|--------|------|
| **Data model** | `instrument` (id, type[bond/fund/RWA], issuer, currency, terms), `holding` (account_id, instrument_id, units), `cashflow` (instrument_id, type[coupon/dividend/redemption], schedule), `loan` (principal_minor, rate_bps, collateral_ref, status), `corporate_action`. Joins to existing `ledger.Account` and `wallet.Wallet`. |
| **Smart contracts** | `SalyAssetToken` (tokenized RWA/fund units, ERC-1155), `SalyEscrow` (delivery-vs-payment settlement), optional `SalyVault` for collateralized lending; `$SALY` staking already exists. |
| **APIs** | `POST /v1/finance/instruments`, `/holdings`, `/v1/finance/loans` (originate/repay), `/v1/finance/cashflows/run` (batch coupon payout via PAYROLL-style fan-out), `/v1/finance/dvp` (escrow-settled trade). |
| **Dashboards** | Issuer console (issuance, cap table, cashflow runs), investor portal (holdings, NAV, distributions), treasury desk (FX via existing swap, liquidity), risk/exposure (reuse `services/risk`). |
| **Monetization** | bps on issuance + AUM fee + per-settlement fee + DvP escrow fee + data (Datashares for market data). |

Reuse: intent `SWAP`/`PAYOUT`/`PAYROLL`, escrow, liquidity FX, ledger.

---

## 2. Healthcare

**Thesis:** verifiable consent, claims settlement, and supply provenance — PII stays off-chain, proofs go on-chain.

| Aspect | Spec |
|--------|------|
| **Data model** | `provider`, `payer`, `patient` (hashed id only on-chain), `consent` (subject_hash, scope, expiry), `claim` (provider_id, payer_id, code, amount_minor, status), `record_attestation` (dataHash, schemaId). Encrypted records in object storage. |
| **Smart contracts** | `SalyAttestationRegistry` (consent + record proofs), `SalyEscrow` (claim adjudication: funds released on payer approval / auto-refund on dispute timeout). |
| **APIs** | `POST /v1/health/consent` (grant/revoke), `GET /v1/health/consent/verify`, `POST /v1/health/claims` (submit → escrow), `POST /v1/health/claims/:id/adjudicate`, `POST /v1/health/records/attest`. |
| **Dashboards** | Provider (claims status, settlements), Payer (adjudication queue, fraud flags via risk/intelligence), Patient (consent ledger, who-accessed-what), Auditor (immutable trail). |
| **Monetization** | per-claim settlement fee, consent-verification API calls, attestation anchoring fee, compliance/audit subscription. |

Compliance note: HIPAA/GDPR satisfied via off-chain PII + on-chain hashes + revocable consent.

---

## 3. Education

**Thesis:** tamper-proof credentials, tuition rails, and outcomes data.

| Aspect | Spec |
|--------|------|
| **Data model** | `institution`, `learner` (hashed), `credential` (type[degree/cert/badge], schemaId, dataHash, issuedAt, expiry), `enrollment`, `tuition_invoice` (amount_minor, schedule), `scholarship_grant`. |
| **Smart contracts** | `SalyAttestationRegistry` (credentials, revocable), optional `SalyAssetToken` for scholarship/grant disbursement tracking; `SalyEscrow` for milestone-based scholarship release. |
| **APIs** | `POST /v1/edu/credentials/issue`, `GET /v1/edu/credentials/verify` (public verify endpoint), `POST /v1/edu/tuition/invoice` (→ INVOICE intent), `POST /v1/edu/scholarships` (→ escrow milestone payout). |
| **Dashboards** | Institution (issuance, revocation, tuition collection), Learner wallet (credentials, shareable verify links), Employer verify portal, Funder (scholarship disbursement tracking). |
| **Monetization** | per-credential issuance, verification API (employer/background-check volume), tuition payment processing fee, analytics on outcomes (Datashares). |

Reuse: intent `INVOICE`/`PAYOUT`, escrow, identity aliases for learner handles.

---

## 4. Government

**Thesis:** transparent disbursements, procurement, and public registries.

| Aspect | Spec |
|--------|------|
| **Data model** | `program` (budget_minor, eligibility), `beneficiary` (KYC via compliance), `disbursement` (program_id, beneficiary, amount, status), `procurement` (tender, bid, award), `public_record` (registry entries: land, license, vote-audit hash). |
| **Smart contracts** | `SalyEscrow` (milestone procurement payments), `SalyAttestationRegistry` (public registries, audit anchors), optional transparency `SalyDisbursementLog` (append-only on L3). |
| **APIs** | `POST /v1/gov/programs`, `POST /v1/gov/disbursements/batch` (PAYROLL-style to beneficiaries via fiat/mobile rails — already supported for NGN), `POST /v1/gov/procurement/award` (→ escrow), `GET /v1/gov/transparency/:program` (public). |
| **Dashboards** | Agency (program mgmt, disbursement runs, compliance), Public transparency portal (read-only spend explorer — reuse Saly Explorer), Auditor (full lineage via intent_settlement_lineage). |
| **Monetization** | SaaS per-program/per-agency licensing, per-disbursement fee, transparency-portal hosting, audit/analytics. Often public-sector procurement contracts. |

Reuse: fiat + mobile-money rails (Paystack/Flutterwave already cover African corridors), compliance KYC, payroll batch engine, Explorer for transparency.

---

## 5. Agriculture

**Thesis:** input financing, parametric crop insurance, and produce traceability.

| Aspect | Spec |
|--------|------|
| **Data model** | `farmer` (KYC-lite), `farm` (geo, crop, season), `input_loan` (amount, repayment from harvest), `insurance_policy` (parametric trigger: rainfall/yield index), `produce_lot` (lot_id, origin, custody chain), `offtake_contract`. |
| **Smart contracts** | `SalyEscrow` (offtake: payment released on delivery attestation), `SalyAttestationRegistry` (provenance/quality certs), parametric `SalyParametricPayout` (oracle-triggered insurance payout), `SalyAssetToken` (warehouse-receipt tokens). |
| **APIs** | `POST /v1/agri/loans` (input financing → PAYOUT), `POST /v1/agri/insurance/policies`, `POST /v1/agri/insurance/claims/auto` (oracle-triggered), `POST /v1/agri/lots` + `GET /v1/agri/lots/:id/trace`. |
| **Dashboards** | Farmer (mobile-first: loan, insurance, payments), Cooperative/aggregator (lot mgmt, offtake), Insurer (policy book, parametric triggers), Buyer (provenance trace). |
| **Monetization** | loan origination + interest spread, insurance premium share, traceability SaaS, per-transaction fee on offtake settlement. |

Reuse: mobile-money + fiat rails (key for rural payouts), escrow, oracle inputs (extend listener pattern), Explorer for provenance.

---

## 6. Aviation

**Thesis:** high-value asset (parts/aircraft) provenance, MRO records, and settlement.

| Aspect | Spec |
|--------|------|
| **Data model** | `aircraft` (tail, model, owner), `part` (serial, type, lifecycle_status), `maintenance_event` (part_id, action, technician, attestationId), `airworthiness_cert`, `lease`/`transaction` (sale/lease settlement). |
| **Smart contracts** | `SalyAssetToken` (serialized parts as NFTs/3525), `SalyAttestationRegistry` (MRO records, airworthiness — immutable, auditor-verifiable), `SalyEscrow` (high-value part/aircraft DvP settlement). |
| **APIs** | `POST /v1/aviation/parts` (mint serialized token), `POST /v1/aviation/maintenance` (attest event), `GET /v1/aviation/parts/:serial/history` (full lifecycle), `POST /v1/aviation/settlements` (escrow trade/lease). |
| **Dashboards** | Operator (fleet, parts, compliance), MRO provider (work orders, attestations), Regulator/auditor (airworthiness trail), Trader/lessor (asset transfer, settlement). |
| **Monetization** | per-part registration, attestation anchoring, high-value settlement fees (bps), compliance/audit subscription, provenance data. |

Reuse: escrow for high-value settlement, L3 for cheap high-volume part attestations, Explorer for part history.

---

## 7. Supply Chain

**Thesis:** end-to-end provenance + trade finance + automated settlement on delivery.

| Aspect | Spec |
|--------|------|
| **Data model** | `product`/`sku`, `shipment` (origin→destination, custody handoffs), `custody_event` (actor, geo, ts, attestationId), `trade_doc` (PO, invoice, BoL, LC), `settlement` (terms, escrow). |
| **Smart contracts** | `SalyAttestationRegistry` (custody/provenance events), `SalyEscrow` (delivery-triggered payment / letter-of-credit analog), `SalyAssetToken` (warehouse receipts, inventory financing). |
| **APIs** | `POST /v1/scm/shipments`, `POST /v1/scm/custody` (handoff attestation, optionally IoT-signed), `GET /v1/scm/shipments/:id/trace`, `POST /v1/scm/trade-finance` (PO financing → PAYOUT), `POST /v1/scm/settlements` (escrow release on delivery proof). |
| **Dashboards** | Shipper/manufacturer (orders, shipments), Logistics (custody scans), Financier (trade-finance book, risk), Buyer (provenance, settlement status). |
| **Monetization** | per-shipment tracking SaaS, trade-finance origination + spread, settlement fees, provenance Datashares, IoT-attestation volume. |

Reuse: escrow (DvP/LC), payouts for trade finance, oracle/IoT via extended listeners, Explorer for trace, intent lineage for audit.

---

## 8. AI Agents

**Thesis:** SalyChain already has the strongest agent-native foundation (`services/agents`, delegations, `AGENT_PAY`, spending policies, reasoning logs). This vertical productizes **autonomous agent commerce** — agents that transact, subscribe, and pay each other under policy.

| Aspect | Spec |
|--------|------|
| **Data model** | extends existing: `Agent`, `AgentSpendingPolicy`, `AgentReasoningLog`, `DelegationGrant` + new `agent_service` (an agent offering a paid capability), `agent_subscription` (recurring), `agent_invoice`, `agent_marketplace_listing`, `usage_meter`. |
| **Smart contracts** | `SalyAgentRegistry` (on-chain agent identity + capability + reputation hash), `SalyEscrow` (agent-to-agent milestone payments), optional `SalyStreamPay` (continuous/usage micropayments on L3). |
| **APIs** | extend `/v1/agents`: `POST /v1/agents/:id/services` (publish capability), `POST /v1/agents/:id/subscribe`, `POST /v1/agents/:id/invoice`, `POST /v1/agents/marketplace/discover`, metered `AGENT_PAY` settlement. |
| **Dashboards** | Agent owner (policies, spend, reasoning audit — extend admin AI Insights), Marketplace (discover/rate agents), Developer (build/monetize agent services via portal), Ops (anomaly/collusion detection via Intelligence). |
| **Monetization** | take-rate on agent-to-agent payments, marketplace listing/discovery fees, metered settlement, premium policy/guardrail features, agent-reputation/intelligence data. |

Reuse: **almost entirely existing** — agents service, delegations, spend approvals, intent pipeline, plus L3 for cheap micropayments and Analytics Intelligence for agent-behavior monitoring.

---

## 9. Cross-vertical summary matrix

| Vertical | New service | Key contract(s) | Primary rails reused | Monetization core |
|----------|-------------|-----------------|----------------------|-------------------|
| Finance | `finance` | AssetToken, Escrow, Vault | SWAP, PAYOUT, PAYROLL, escrow | bps + AUM + settlement |
| Healthcare | `health` | AttestationRegistry, Escrow | escrow, fiat | per-claim + verify API |
| Education | `edu` | AttestationRegistry, Escrow | INVOICE, PAYOUT, escrow | issuance + verify API |
| Government | `gov` | Escrow, AttestationRegistry | PAYROLL, fiat, mobile | SaaS + per-disbursement |
| Agriculture | `agri` | Escrow, Parametric, AssetToken | mobile, fiat, PAYOUT | loan spread + premium |
| Aviation | `aviation` | AssetToken, AttestationRegistry, Escrow | escrow | registration + settlement bps |
| Supply Chain | `scm` | AttestationRegistry, Escrow, AssetToken | escrow, PAYOUT | SaaS + trade-finance spread |
| AI Agents | extend `agents` | AgentRegistry, Escrow, StreamPay | AGENT_PAY, L3 micropay | take-rate + marketplace |

## 10. Rollout priority (leverage vs effort)

1. **AI Agents** — highest leverage, lowest effort (foundation exists). Productize first.
2. **Finance** — closest to current capability; high revenue.
3. **Government / Agriculture** — strong fit with existing fiat+mobile African corridors; mission impact.
4. **Supply Chain / Aviation** — attestation + escrow + asset tokens; enterprise deals.
5. **Healthcare / Education** — high compliance bar; sequence after attestation registry + off-chain PII storage hardened.

Each vertical's data flows into the Analytics Cloud (Phase 3) automatically via the event bus + CDC, so dashboards and Datashares come largely for free once the module emits domain events. Technical implementation, schemas, and deployment for all of this are in [Phase 5](05-technical-implementation.md).
