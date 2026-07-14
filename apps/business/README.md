# SalyChain Business Dashboard

Treasury operations, payouts, team management, and financial visibility for business customers.

## Local development

```bash
# From repo root (after pnpm install + infra:up)
pnpm --filter @salychain/app-business dev
```

Open **http://localhost:3002**

## Environment

Copy `.env.example` to `.env.local` and adjust:

| Variable | Purpose |
|---|---|
| `BUSINESS_ORG_ID` | Organization whose wallets and members to display (default: `org_demo_acme`) |
| `BUSINESS_ACTOR_ID` | Business actor ULID for intent submission (`biz_*`) |
| `BUSINESS_APPROVER_USER_ID` | Identity user for spend approval votes (`usr_*`) |
| `*_BASE_URL` | Upstream service URLs (ledger, wallet, execution, etc.) |

## Pages

| Route | Description |
|---|---|
| `/` | Treasury dashboard — balances, volume chart, recent activity |
| `/treasury` | Multi-currency treasury allocation |
| `/wallets` | Custodial wallet registry |
| `/payroll` | Batch employee payroll runs |
| `/transactions` | Execution history |
| `/approvals` | Pending agent spend approvals |
| `/team` | Organization members |
| `/analytics` | Volume and success-rate analytics |
| `/settings` | Org and service configuration |

## Data sources

The dashboard reads live data from internal services via `@salychain/sdk-internal`:

- **Wallet + Ledger** — treasury balances per custodial wallet
- **Execution** — transaction history and state machine
- **Intent** — transfer submission from Send Money
- **API Keys** — organization and team members
- **Agents** — spend approval queue

When a service is offline, pages degrade gracefully with an offline badge rather than crashing.

## Related

- [Developer Portal](../portal/README.md) — API keys and webhooks for the same org
- [Super Admin](../admin/README.md) — platform-wide operational view
- [S3 Partner onboarding runbook](../../docs/runbooks/s3-partner-onboarding.md)
