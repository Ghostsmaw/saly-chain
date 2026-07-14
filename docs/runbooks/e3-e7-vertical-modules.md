# Milestone E3–E7 — Vertical modules ops

## Services & ports

| Phase | Service | Port | API prefix |
|-------|---------|------|------------|
| E3 | agents (marketplace extension) | 4011 | `/v1/agents/...` |
| E4 | finance | 4023 | `/v1/finance/...` |
| E5 | gov | 4024 | `/v1/gov/...` |
| E5 | agri | 4025 | `/v1/agri/...` |
| E6 | scm | 4026 | `/v1/scm/...` |
| E6 | aviation | 4027 | `/v1/aviation/...` |
| E7 | health | 4028 | `/v1/health/...` |
| E7 | edu | 4029 | `/v1/edu/...` |

Gateway exposes scoped subsets at `/v1/finance`, `/v1/gov`, etc. (see `VerticalsController`).

## Bootstrap

```bash
pnpm db:migrate          # applies all vertical migrations
pnpm verticals:verify    # typecheck + contract tests
```

## Demo data (admin / portal UI)

With vertical services running on default ports:

```bash
pnpm verticals:seed
# or use "Seed demo data" on http://localhost:3001/verticals
```

Seeds `org_demo_acme` (override with `VERTICAL_DEMO_ORG_ID`). Agents step requires wallet service (:4002).

## E3 contracts (L3)

```bash
cd contracts/agents
forge test
PRIVATE_KEY=... forge script script/DeployAgents.s.sol --rpc-url $L3_L3_RPC_URL --broadcast
```

Deploys `SalyAgentRegistry` + `SalyStreamPay`.

## API scopes (gateway)

Issue API keys with vertical scopes, e.g. `finance:read`, `finance:write`, `gov:read`, `health:write`, `edu:read`, `agents:read`.

## Shared primitives

- `@salychain/vertical-core` — subject hashing, schema IDs (no PII on-chain)
- `SalyAttestationRegistry` + `SalyAssetToken` from E2 for attestations across verticals
- Intent pipeline for settlements (`intentId` / `escrowIntentId` fields on domain rows)
