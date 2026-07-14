# Agents Service

Registry and lifecycle for SalyChain AI agents — the execution actors behind S4.

## Responsibilities

- Register agents bound to an owner (`usr_*` / `biz_*`)
- Provision `AGENT_CUSTODIAL` wallets on BASE (and optionally XRPL)
- Manage spending policies (per-tx cap, daily cap, destination allowlist)
- Sync policies to wallet service (signer enforces at sign time)
- Pre-flight `authorize-spend` for execution pipeline
- Persist reasoning logs from Saly AI for admin audit

## API surface

| Method | Path | Description |
|---|---|---|
| POST | `/v1/agents` | Create agent + wallets |
| GET | `/v1/agents` | List agents |
| GET | `/v1/agents/:id` | Get agent |
| PATCH | `/v1/agents/:id/status` | Suspend / archive |
| GET/PATCH | `/v1/agents/:id/policy` | Spending policy |
| POST | `/v1/agents/:id/authorize-spend` | Pre-flight policy check |
| POST/GET | `/v1/agents/:id/reasoning-logs` | AI reasoning audit trail |

## Events

Publishes `salychain.agent.created`, `salychain.agent.policy_updated`, `salychain.agent.spend_denied`.
