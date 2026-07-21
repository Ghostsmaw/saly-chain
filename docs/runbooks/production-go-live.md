# Production Go‑Live Guide

> End‑to‑end setup to take SalyChain from a local checkout to a **live production deployment**.
> Follow the phases in order. Each phase has a **goal**, **steps**, and a **done‑when** check.

This guide is intentionally exhaustive. If you only want a local dev stack, see the
[README Quickstart](../../README.md#4-quickstart) instead.

---

## 0. Architecture recap (what you are deploying)

| Layer | Components |
|-------|-----------|
| **Frontends** (Next.js 15) | `admin` (3001), `business` (3002), `portal` (3003) |
| **Edge** | `gateway` (4000) — public B2B API termination |
| **Core services** (NestJS) | `ledger` 4001, `wallet` 4002, `execution` 4003, `compliance` 4004, `risk` 4005, `liquidity` 4006, `routing` 4007, `intent` 4008, `apikeys` 4009, `webhooks` 4010, `agents` 4011, `identity` 4012, `contract-registry` 4013, `admin` 4014, `signer` 4099 |
| **Workers** | `chain-listener-base`, `chain-listener-xrpl`, `chain-listener-l3`, `l3-rollup-monitor`, `fiat-listener` (4020) |
| **Stateful infra** | Postgres (per‑service DBs), Redis (BullMQ), NATS JetStream, object storage (S3/MinIO) |
| **Observability** | OTEL collector, Prometheus, Grafana, Loki |
| **On‑chain** | `SalyEscrow.sol`, `$SALY` token + `SalyStaking` (Foundry) |

**Golden rule:** every service owns its **own database**. No cross‑service DB joins. Plan one
logical DB per service (18 total — see §3).

---

## 1. Prerequisites

### 1.1 Tooling
- Node.js ≥ 20.11 (`.nvmrc` provided)
- pnpm ≥ 9 (`corepack enable && corepack prepare pnpm@9.12.0 --activate`)
- Docker + Docker Compose (for building images / local infra)
- [Foundry](https://book.getfoundry.sh/getting-started/installation) (`forge`, `cast`) for contracts
- `kubectl` + `terraform` if deploying to Kubernetes/AWS

### 1.2 Cloud accounts & external providers
You must provision real accounts for anything that touches money or custody:

| Capability | Provider (example) | Needed for |
|-----------|--------------------|------------|
| Key custody | **AWS KMS** (CMK) | `signer` (prod requires `KMS_PROVIDER=aws`) |
| EVM RPC | Alchemy / Infura / QuickNode (Base mainnet) | `chain-base`, listeners, execution |
| XRPL node | Ripple / your validator (wss) | `chain-xrpl`, xrpl listener |
| Fiat PSP | **Paystack** and/or **Flutterwave** | fiat payouts + `fiat-listener` |
| FX rates | Coinbase + Frankfurter (default composite) | `liquidity` |
| Sanctions/AML | Chainalysis / ComplyAdvantage | `compliance` |
| Transactional email | **Resend** | identity invites, portal welcome |
| Error tracking | Sentry (optional) | all services |

> ⚠️ **Custody is the highest‑stakes part.** Do not go live with `KMS_PROVIDER=local`.
> The local AES‑GCM master key is dev‑only.

---

## 2. Get the code building

```bash
git clone <repo> && cd SalyChain
nvm use                 # or install Node 20.11+
corepack enable
pnpm install
pnpm build              # turbo build of all packages, services, apps
pnpm typecheck && pnpm lint && pnpm test
```

**Done when:** `pnpm build` is green and tests pass. Do not deploy a red build.

---

## 3. Databases (per‑service)

Production uses **separate database instances per blast‑radius group** (custody isolated from
everything else). At minimum you need these 18 logical databases:

```
salychain_ledger        salychain_wallet         salychain_signer
salychain_execution     salychain_intent         salychain_routing
salychain_liquidity     salychain_compliance     salychain_risk
salychain_webhook       salychain_notification   salychain_gateway
salychain_apikeys       salychain_agents         salychain_identity
salychain_contract_registry   salychain_admin    salychain_fiat_listener
```

Recommended grouping for managed Postgres (e.g. AWS RDS):
- **Cluster A (custody):** `salychain_signer` only — locked‑down, no shared creds.
- **Cluster B (money):** `ledger`, `wallet`, `execution`.
- **Cluster C (platform):** everything else.

### 3.1 Apply migrations

Each service reads its own `DATABASE_URL`. Set them (see §4), then:

```bash
# Generate Prisma clients (also runs in CI / postinstall)
pnpm db:generate

# Apply committed migrations to the target databases
pnpm db:migrate          # → scripts/prisma-deploy-all.sh (prisma migrate deploy per service)
```

**Done when:** every service's `prisma:deploy` exits 0 against its production DB.

---

## 4. Configuration & secrets

There is **no single `.env` in prod** — each service is configured via its own environment
(container env / K8s `Secret` / SSM). Use the root [`.env.example`](../../.env.example) and each
`services/<svc>/.env.example` as the source of truth for variable names.

### 4.1 Generate strong secrets

```bash
# 32-byte secrets
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Replace **every** `change-me` / `dev-*` / `rotate-me` value. Critical ones:

| Variable | Service(s) | Purpose |
|----------|-----------|---------|
| `JWT_SECRET`, `JWT_ISSUER`, `JWT_AUDIENCE` | identity, gateway | Consumer/agent JWT auth |
| `KMS_PROVIDER=aws`, `KMS_AWS_REGION`, `KMS_AWS_KEY_ID` | signer | Custody (CMK via task role/IRSA — **no access keys in env**) |
| `APIKEY_HASH_PEPPER` | apikeys | Peppers API‑key hashes at rest |
| `WEBHOOKS_FALLBACK_SECRET` | webhooks | Outbound HMAC signing fallback |
| `LIQUIDITY_QUOTE_SIGNING_SECRET` | liquidity | Signs FX quotes (TTL) |
| `INTERNAL_SERVICE_TOKEN` | all internal services + server-side apps | Service‑to‑service auth (`x-internal-token`) — startup fails in prod without it |
| `COMPLIANCE_SANCTIONS_PROVIDER` | compliance | Must **not** be `embedded` in production (use vendor or `composite`) |
| `LIQUIDITY_RATE_PROVIDER` | liquidity | Must **not** be `stub` in production; stub fallbacks must be `false` |
| `FIAT_PSP_PROVIDER` | execution | Must **not** be `stub` in production; composite needs live PSP keys |
| `EXPLORER_READ_TOKEN` | explorer, analytics-api, execution | Scoped read credential for the public explorer — **never** reuse `INTERNAL_SERVICE_TOKEN` |
| `JWT_ACCESS_TTL_SEC` / `JWT_REFRESH_TTL_SEC` | identity | Short access JWT + rotatable refresh (apps store both httpOnly cookies) |
| `COMPLIANCE_PII_ENC_KEY` | compliance | AES‑256‑GCM key (base64, 32 bytes) for KYC/KYB metadata at rest |
| `FLUTTERWAVE_REQUIRE_BODY_HMAC` | fiat-listener | Set `true` when edge stamps `x-saly-flw-body-hmac` |
| `WEBHOOK_SECRET_ENC_KEY` | webhooks | AES‑256‑GCM key (base64, 32 bytes) sealing signing secrets at rest — startup fails in prod without it |
| `WEBHOOK_ALLOWED_IPS` | fiat-listener | PSP source IP allow‑list — startup fails in prod when empty (fail‑open otherwise) |
| `EXECUTION_INTERNAL_WEBHOOK_TOKEN` | execution, fiat-listener | Shared internal webhook auth |
| `IDENTITY_INTERNAL_ADMIN_TOKEN` | identity, admin | Super‑admin invite flow |
| `PORTAL_INTERNAL_SECRET` | gateway, portal | Portal ↔ gateway internal calls |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | identity | Email delivery |

### 4.2 Service URLs
In prod, replace all `http://localhost:<port>` base URLs (`*_BASE_URL`) with internal DNS names
(e.g. `http://ledger.internal:4001` or K8s service DNS). The gateway and execution services fan
out to other services via these.

### 4.3 Set `NODE_ENV=production` and `LOG_LEVEL=info` everywhere.

**Done when:** no service still references a dev placeholder secret or `localhost` peer URL.

---

## 5. Custody — Signer + AWS KMS (do this carefully)

1. **Create the signer IRSA role** and annotate the dedicated Helm ServiceAccount
   (`salychain-*-signer-sa` via `serviceAccount.signer.annotations`) — **never** attach
   KMS decrypt to the shared platform SA.
2. **Provision the CMK** (Terraform module included; least-privilege key policy +
   encryption-context condition for `service` + `purpose`):
   ```bash
   cd infra/terraform/staging   # adapt for prod account/region
   terraform init
   terraform apply -var="signer_role_arn=arn:aws:iam::ACCOUNT:role/salychain-signer-kms"
   ```
3. Confirm the signer workload uses the dedicated SA and can only Encrypt/Decrypt
   with encryption context `{ service=salychain-signer, purpose=wallet-private-key }`.
4. Configure signer:
   ```
   KMS_PROVIDER=aws
   KMS_AWS_REGION=<region>
   KMS_AWS_KEY_ID=alias/salychain-signer   # or full ARN
   DATABASE_URL=postgresql://…/salychain_signer
   ```
5. **If migrating existing dev keys** to KMS, rewrap them (never re‑expose plaintext):
   ```bash
   KMS_PROVIDER=aws KMS_AWS_REGION=… KMS_AWS_KEY_ID=… \
   KMS_LOCAL_MASTER_KEY=<legacy-dev-key> \
   DATABASE_URL=postgresql://…/salychain_signer \
   pnpm --filter @salychain/signer kms:rewrap --dry-run   # then drop --dry-run
   ```

**Done when:** signer boots with `KMS_PROVIDER=aws`, can generate a key and sign a test payload,
and the legacy local master key is removed from the environment.

---

## 6. On‑chain contracts (Foundry)

### 6.1 Escrow
```bash
RESOLVER_ADDRESS=0x<operator>  \
PRIVATE_KEY=<deployer-hex>      \
BASE_RPC_URL=<base-mainnet-rpc> \
bash scripts/deploy-escrow-base.sh
```
Wire the deployed address into:
- `ESCROW_CONTRACT_ADDRESS` → wallet, chain-listener-base
- `ESCROW_CONTRACT_ADDRESS_BASE` → execution

### 6.2 `$SALY` token + staking (optional, S9)
```bash
PRIVATE_KEY=… TREASURY_ADDRESS=0x… INITIAL_MINT=… MAX_SUPPLY=… BASE_RPC_URL=… \
forge script script/Deploy.s.sol:Deploy --rpc-url <rpc> --broadcast -vvv
# (run inside contracts/token)
```
Token ships **pre‑launch (transfers locked)**. Flip the one‑way switch only when ready:
```bash
cast send $SALY_ADDRESS "activate()" --rpc-url <rpc> --private-key $PRIVATE_KEY
```
> ⚠️ `activate()` is irreversible. Verify treasury, cap, and allowlist first.

### 6.3 Register addresses
Record deployed addresses in `contract-registry` so the admin console can monitor them.

**Done when:** contracts are deployed, verified on the block explorer, and addresses are wired
into the relevant service envs.

---

## 7. Chain rails configuration

### 7.1 Base (primary EVM rail) → mainnet
```
BASE_NETWORK=base-mainnet
BASE_RPC_URL=<your-mainnet-rpc>
BASE_USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913   # Base mainnet USDC — verify!
DEX_QUOTE_STUB_FALLBACK=false
WALLET_BASE_DEFAULT_PER_TX_CAP_MINOR=<cap>     # USDC minor units (6 dp)
WALLET_BASE_DEFAULT_DAILY_CAP_MINOR=<cap>
```

### 7.2 XRPL → mainnet
```
XRPL_NETWORK=xrpl-mainnet
XRPL_WS_URL=wss://<your-xrpl-node>
XRPL_IOU_ISSUERS={"USD":"r<issuer-address>"}
XRPL_DEFAULT_TRUST_LIMIT=<limit>
```

### 7.3 Fiat rail (Paystack / Flutterwave)
```
ROUTING_FIAT_ENABLED=true
FIAT_PSP_PROVIDER=composite
PAYSTACK_SECRET_KEY=sk_live_…
FLUTTERWAVE_SECRET_KEY=FLWSECK-…
FLUTTERWAVE_WEBHOOK_SECRET=<dashboard secret hash>
EXECUTION_INTERNAL_WEBHOOK_TOKEN=<shared with fiat-listener>
BUSINESS_FIAT_NGN_LEDGER_ACCOUNT=<uuid of NGN treasury liability account>
```
Register PSP webhooks to the **public** fiat-listener host:
- Paystack → `https://<fiat-listener-host>/webhooks/paystack`
- Flutterwave → `https://<fiat-listener-host>/webhooks/flutterwave`

### 7.4 Saly L3 (optional, S5/S6)
Only enable once the OP‑Stack devnet/rollup is deployed (see
[s5-l3-devnet-rollup](s5-l3-devnet-rollup.md) / [s6-l3-money-rail](s6-l3-money-rail.md)):
```
L3_NETWORK=…  L3_SETTLEMENT_RPC_URL=…  L3_L2_OUTPUT_ORACLE=0x…
L3_USDC_ADDRESS=0x…  ROUTING_L3_ENABLED=true
```

**Done when:** routing returns the expected rail per intent and a small **testnet** payout
settles end‑to‑end on each enabled rail before mainnet cutover.

---

## 8. Liquidity, compliance & risk providers

```
# Liquidity — real market data
LIQUIDITY_RATE_PROVIDER=composite
LIQUIDITY_RATE_STUB_FALLBACK=false
LIQUIDITY_RATE_CACHE_TTL_MS=60000

# Compliance — real sanctions vendors
COMPLIANCE_SANCTIONS_PROVIDER=composite
CHAINALYSIS_API_KEY=…
COMPLYADVANTAGE_API_KEY=…
```
Risk uses internal velocity/behavioral scoring; review thresholds before launch.

**Done when:** a screened intent produces real sanctions/risk results (no stub fallback) and FX
quotes carry live signed rates.

---

## 9. Stateful infra (managed)

| Component | Managed option | Notes |
|-----------|---------------|-------|
| Postgres | AWS RDS / Aurora | Per §3 grouping; automated backups + PITR |
| Redis | ElastiCache | BullMQ queues (wallet transfer queue) — enable persistence |
| NATS JetStream | NATS cluster (3 nodes) | Event bus — persistent file storage |
| Object storage | S3 | KYC/KYB document uploads (replaces MinIO) |

Local compose (`infra/docker/docker-compose.yml`) is the **reference topology** for these
services; do not run that compose in production.

**Done when:** all four are highly available, backed up, and reachable from the services subnet.

---

## 10. Deploy the services

Two supported paths:

### 10.1 Docker images per service
Each service/app builds to a standalone artifact. Build and push images, then run with the prod
environment injected (env vars / secrets manager). Reference the staging overlay for shape:
```bash
docker compose -f infra/docker/docker-compose.yml \
  -f infra/docker/docker-compose.staging.yml \
  --env-file .env.staging up -d <service>
```

### 10.2 Kubernetes (recommended for prod)
- `infra/k8s/staging/` contains a `fiat-listener` Deployment+Service template — replicate the
  pattern for each service (Deployment, Service, HPA, `Secret`, `ConfigMap`).
- Put the **gateway** behind ingress + TLS; keep all core services **cluster‑internal only**.
- Custody (`signer`) in its own namespace with the KMS IAM role bound (IRSA) and tight
  NetworkPolicies.

**Start order** (dependencies): infra → signer → ledger → wallet → execution → (compliance,
risk, liquidity, routing, intent) → apikeys → webhooks → agents → identity → contract-registry →
admin → gateway → workers → frontends.

**Done when:** every service `/health` returns 200 and listeners report current block/ledger.

---

## 11. Frontend apps

Each Next.js app builds independently and needs its public/runtime config:
```bash
pnpm --filter @salychain/app-admin build && pnpm --filter @salychain/app-admin start
pnpm --filter @salychain/app-business build && …
pnpm --filter @salychain/app-portal build && …
```
Set per app:
- `ADMIN_BASE_URL`, `GATEWAY_BASE_URL`, identity URL, etc. to internal/edge DNS.
- `ADMIN_CONSOLE_URL`, `PORTAL_BASE_URL` to the public hostnames (used in emails/links).
- Front them with a CDN + TLS; restrict the **admin** app to your internal network/VPN/SSO.

**Done when:** all three apps load every route against live services (no "service offline").

---

## 12. Bootstrap the platform

1. **First super‑admin:** use the identity invite flow
   (`POST /auth/invite-super-admin` with `IDENTITY_INTERNAL_ADMIN_TOKEN`), accept via the emailed
   link to the admin console.
2. **Treasury ledger accounts:** create the asset/liability accounts you reference in config
   (e.g. `BUSINESS_FIAT_NGN_LEDGER_ACCOUNT`, FX pool accounts `asset.fx.<CCY>`).
3. **KYC/KYB requirements & feature flags:** configure in admin → Settings.
4. **First partner org + API key:** create an org in apikeys, issue an `sk_live_…` key, register
   a webhook subscription, and confirm a signed delivery.

**Done when:** an admin can log in, a partner can authenticate against the gateway, and a webhook
delivers with a valid `X-Saly-Signature`.

---

## 13. Observability & alerting

- Point `OTEL_EXPORTER_OTLP_ENDPOINT` at your collector; set `SENTRY_DSN` if used.
- Ship the Grafana dashboards / Prometheus rules from `infra/docker/grafana` &
  `infra/docker/prometheus` to your managed stack.
- Alert on: service down, listener lag (block/ledger height stalled), queue depth (Redis/BullMQ),
  JetStream consumer lag, DB connections, **ledger imbalance**, signer error rate, webhook DLQ.

**Done when:** traces carry `trace_id`/`correlation_id` end‑to‑end and alerts page on failure.

---

## 14. Pre‑launch verification (smoke + canary)

Staging first (Wave C harness):

```bash
./scripts/smoke/wait-healthy.sh
./scripts/smoke/health.sh
./scripts/smoke/partner-flow.sh   # org→key→webhook→intent→SETTLED
# or: pnpm smoke:partner
```

Vendor posture for staging: [staging-vendor-posture.md](staging-vendor-posture.md).

Run the runbooks against **prod with tiny amounts** before opening traffic:

| Flow | Runbook |
|------|---------|
| Base USDC payout | [s1](s1-base-testnet-payout.md) |
| XRPL payment + full intent pipeline | [s2](s2-xrpl-testnet-payment.md) |
| Partner onboarding (org→key→webhook→settled) | [s3](s3-partner-onboarding.md) |
| Agent settles invoice + high‑value approval | [s4](s4-agent-invoice-settlement.md), [s4+](s4-agent-high-value-spend-approval.md) |
| Fiat payout (NGN) | [s5](s5-fiat-payout-ngn.md) |
| Treasury FX swap | [s5](s5-treasury-fx-swap.md) |
| Escrow fund/release/refund | [s3](s3-escrow-fund-deal.md), [s5](s5-escrow-release-refund.md) |
| Payroll batch | [s6](s6-payroll-batch-ngn.md) |
| Top‑up inbound | [s7](s7-topup-inbound.md) |

**Done when:** each enabled rail completes a real low‑value transaction and reconciles in the
ledger (double‑entry balanced).

---

## 15. Go‑live checklist (signed)

Print or attach this section to the go-live ticket. **Two signatories** required (Eng lead + Ops/Custody).

### 15.1 Engineering
- [ ] `pnpm build` / `typecheck` / `lint` / `test` green on the released commit
- [ ] All 18 databases migrated (`pnpm db:migrate`)
- [ ] Distinct `INTERNAL_SERVICE_TOKEN` vs `EXPLORER_READ_TOKEN`
- [ ] Staging partner-flow smoke green (`./scripts/smoke/partner-flow.sh`)
- [ ] CI Actions pinned by SHA; audit + Trivy HIGH/CRITICAL clean

### 15.2 Custody & vendors
- [ ] [Custody key ceremony](custody-key-ceremony.md) completed; signer on **AWS KMS**
- [ ] Compliance/liquidity/fiat using real providers (no stub / embedded) — staging posture already enforced
- [ ] Contracts deployed + verified; addresses wired + registered
- [ ] Base/XRPL/Fiat (+L3 if used) configured to mainnet rails

### 15.3 Ops resilience
- [ ] [DR restore drill](disaster-recovery.md) passed in staging (RPO/RTO recorded)
- [ ] [IR tabletop](incident-response-tabletop.md) completed; gaps ticketed
- [ ] Postgres/Redis/NATS/S3 HA + backups verified
- [ ] Gateway behind TLS/WAF; admin behind SSO/VPN; core services internal‑only
- [ ] Observability + alerting live (ledger imbalance + listener lag + signer errors)
- [ ] On-call rotation published; break-glass documented

### 15.4 Canary
- [ ] First super‑admin, treasury accounts, KYC/KYB rules configured
- [ ] Canary transaction on every enabled rail succeeded and reconciled

### 15.5 Sign-off
| Role | Name | Date (UTC) | Signature |
|------|------|------------|-----------|
| Engineering lead | | | |
| Ops / Custody | | | |
| Released commit SHA | | | |

---

## 16. Security hardening (before public traffic)

- WAF + rate limiting at ingress (gateway already enforces app‑level rate limits + idempotency).
- mTLS between edge and internal services where possible.
- PSP IP allowlists for inbound webhooks; verify all webhook signatures (already enforced).
- Least‑privilege IAM; separate accounts/roles for custody.
- Secrets in a manager (SSM/Secrets Manager/Vault), never in images or git.
- Regular `pnpm audit` + dependency upgrades; enable Dependabot/Renovate.

---

### Appendix A — Port reference
See README [Services and apps](../../README.md#4-quickstart) table (4000–4014, 4099, 4020;
apps 3001–3003).

### Appendix B — Key ADRs
- [0004 money as bigint](../adr/0004-money-as-bigint-minor-units.md)
- [0005 custody isolation](../adr/0005-custody-isolation.md)
- [0006 execution state machine](../adr/0006-execution-state-machine.md)
- [0007 NATS JetStream](../adr/0007-nats-jetstream-event-bus.md)
- [0012 B2B surface & gateway](../adr/0012-b2b-surface-and-gateway.md)
- [0013 webhook delivery & signing](../adr/0013-webhook-delivery-and-signing.md)
- [0018 $SALY token & launch switch](../adr/0018-saly-token-and-launch-switch.md)
