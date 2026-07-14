# S4+ — High-value agent spend approval

Walkthrough for agent payments that exceed the **approval threshold**: intent stalls in `AWAITING_APPROVAL`, an operator votes via the admin dashboard (or API), execution resumes, and the wallet passes collected approver votes to the signer.

Prerequisite: complete [S4 — Agent invoice settlement](./s4-agent-invoice-settlement.md) through step 4 (user, agent, delegation).

## Prerequisites

- S0–S4 stack running (`pnpm infra:up`, migrations, `pnpm dev`)
- **Agents**, **execution**, **wallet**, and **admin** (`http://localhost:3001`) reachable
- Admin env: `ADMIN_APPROVER_USER_ID=usr_…` (the human operator casting votes)

## 1. Configure approval policy

Set a low threshold and require two approvers (use one approver for a quick solo test):

```bash
curl -s -X PATCH "http://localhost:4011/v1/agents/$AGENT_ID/policy" \
  -H 'Content-Type: application/json' \
  -d '{
    "per_tx_cap_minor": "50000000",
    "daily_cap_minor": "500000000",
    "approval_threshold_minor": "500000",
    "required_approvers": 1,
    "destination_allowlist": ["0xVENDOR_ADDRESS_HERE"]
  }' | jq
```

Verify wallet policy synced (`required_approvers` and `approval_threshold_minor` match):

```bash
curl -s "http://localhost:4002/v1/wallets/$WALLET_ID/policy" | jq
```

## 2. Submit intent above threshold

Use an amount **above** `approval_threshold_minor` (e.g. `2000000` when threshold is `500000`):

```bash
export INTENT_ID="itn_01J0G7NF7Z000000000000002"
export IDEM_KEY="inv-approval-$(date +%s)"

curl -s -X POST http://localhost:4000/v1/intents \
  -H "Authorization: Bearer $JWT" \
  -H "Idempotency-Key: $IDEM_KEY" \
  -H 'Content-Type: application/json' \
  -d "{
    \"intent\": {
      \"version\": \"1\",
      \"intent_id\": \"$INTENT_ID\",
      \"kind\": \"INVOICE\",
      \"actor\": { \"type\": \"AGENT\", \"id\": \"$AGENT_ID\", \"owner_id\": \"$USER_ID\" },
      \"source\": { \"amount\": { \"amount_minor\": \"2000000\", \"currency\": \"USDC\" } },
      \"destination\": {
        \"currency\": \"USDC\",
        \"beneficiary\": {
          \"kind\": \"WALLET\",
          \"chain\": \"BASE\",
          \"address\": \"0xVENDOR_ADDRESS_HERE\"
        }
      },
      \"context\": { \"channel\": \"AGENT\" },
      \"metadata\": { \"invoice_id\": \"inv_high_value_001\" }
    }
  }" | jq
```

Expected: intent may show `ACCEPTED`; the execution transaction enters **`AWAITING_APPROVAL`** (not `AWAITING_CONFIRMATION` yet).

## 3. Confirm execution is waiting

```bash
export TX_ID=…   # execution_transaction_id from intent response, or list transactions

curl -s "http://localhost:4003/v1/transactions/$TX_ID" | jq '{ state, intent_id, events: [.events[].state] }'
```

Expected: `state: "AWAITING_APPROVAL"`.

List pending approval requests:

```bash
curl -s "http://localhost:4011/v1/agents/$AGENT_ID/spend-approvals?status=PENDING" | jq
```

Note `id` (e.g. `apr_…`) and `approval_count` / `required_approvers`.

## 4. Approve (admin UI)

1. Set admin env (restart admin after changing):

   ```bash
   export ADMIN_APPROVER_USER_ID=$USER_ID
   ```

2. Open **http://localhost:3001/approvals**
3. Click **Approve** on the pending row.

When `required_approvers` is met, agents calls execution `POST /v1/transactions/resume-approval` and the pipeline continues.

## 5. Approve (API alternative)

```bash
export APPROVAL_ID=apr_…   # from step 3

curl -s -X POST "http://localhost:4011/v1/agents/$AGENT_ID/spend-approvals/$APPROVAL_ID/vote" \
  -H 'Content-Type: application/json' \
  -d "{\"approver_id\": \"$USER_ID\"}" | jq
```

Expected: `status: "APPROVED"` when enough votes are recorded.

## 6. Verify resume and settlement

```bash
curl -s "http://localhost:4003/v1/transactions/$TX_ID" | jq '{ state, events: [.events[].state] }'
```

Expected progression after approval: `CREATED` → … → `AWAITING_CONFIRMATION` (chain) or `SETTLED` (internal).

Lookup approval by intent (wallet signer gate):

```bash
curl -s "http://localhost:4011/v1/agents/$AGENT_ID/spend-approvals/by-intent/$INTENT_ID" | jq
```

Expected after approval: `status: "APPROVED"`, `approval_count >= required_approvers`.

## Policy denial without approval

Submit the same intent **without** voting. The transaction should remain in `AWAITING_APPROVAL` indefinitely; the wallet will not sign with sufficient `approvers` if manually forced.

## Troubleshooting

| Symptom | Check |
|---|---|
| Admin **Approve** errors | `ADMIN_APPROVER_USER_ID` set to `usr_*`; agents + execution running |
| Stuck after approval | Wallet `AGENTS_BASE_URL`; broadcast worker logs; signer policy |
| `agents.approval.duplicate_vote` | Same `usr_*` cannot vote twice on one request |
| Signer `approvals_required` | Approval status must be `APPROVED`; transfer must include `intent_id` |

## Related

- [ADR-0015 — Agent wallets and spending controls](../adr/0015-agent-wallets-and-spending-controls.md)
- [S4 — Agent invoice settlement](./s4-agent-invoice-settlement.md)
