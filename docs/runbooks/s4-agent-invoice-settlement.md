# S4 — Agent autonomously settles an invoice

End-to-end walkthrough: register user → create agent → set spending policy → delegate → submit `INVOICE` intent → settlement.

## Prerequisites

- S0–S3 stack running (`pnpm infra:up`, migrations, `pnpm dev`)
- Base Sepolia funded agent wallet (or use internal ledger path for policy-only demo)

## 1. Bootstrap identity

```bash
# Register a consumer user
curl -s -X POST http://localhost:4012/v1/users \
  -H 'Content-Type: application/json' \
  -d '{"email":"agent-owner@example.com"}' | jq

# Issue JWT (internal endpoint — requires IDENTITY_INTERNAL_ADMIN_TOKEN; production uses OAuth)
export USER_ID=usr_…   # from step above
export IDENTITY_INTERNAL_ADMIN_TOKEN=dev-identity-internal-admin-token-change-me
export JWT=$(curl -s -X POST http://localhost:4012/v1/auth/token \
  -H "Authorization: Bearer $IDENTITY_INTERNAL_ADMIN_TOKEN" \
  -H 'Content-Type: application/json' \
  -d "{\"user_id\":\"$USER_ID\"}" | jq -r .access_token)
```

## 2. Create agent + wallets

```bash
curl -s -X POST http://localhost:4011/v1/agents \
  -H 'Content-Type: application/json' \
  -d "{
    \"owner_id\": \"$USER_ID\",
    \"owner_kind\": \"USER\",
    \"name\": \"Invoice Agent\",
    \"provision_chains\": [\"BASE\"]
  }" | jq

export AGENT_ID=agt_…   # from response
export WALLET_ID=…      # wallet_ids[0]
```

## 3. Configure spending policy

Allow payment to vendor address with a per-tx cap:

```bash
curl -s -X PATCH "http://localhost:4011/v1/agents/$AGENT_ID/policy" \
  -H 'Content-Type: application/json' \
  -d '{
    "per_tx_cap_minor": "5000000",
    "daily_cap_minor": "50000000",
    "destination_allowlist": ["0xVENDOR_ADDRESS_HERE"]
  }' | jq
```

Verify wallet policy synced:

```bash
curl -s "http://localhost:4002/v1/wallets/$WALLET_ID/policy" | jq
```

## 4. Delegate agent to user (for JWT gateway access)

```bash
curl -s -X POST http://localhost:4012/v1/delegations \
  -H 'Content-Type: application/json' \
  -d "{
    \"user_id\": \"$USER_ID\",
    \"agent_id\": \"$AGENT_ID\",
    \"scopes\": [\"intents:write\", \"agents:read\"]
  }" | jq

# Re-issue JWT so agent_ids claim is fresh
export JWT=$(curl -s -X POST http://localhost:4012/v1/auth/token \
  -H "Authorization: Bearer $IDENTITY_INTERNAL_ADMIN_TOKEN" \
  -H 'Content-Type: application/json' \
  -d "{\"user_id\":\"$USER_ID\"}" | jq -r .access_token)
```

## 5. Submit INVOICE intent (via gateway)

```bash
export IDEM_KEY="inv-$(date +%s)"
curl -s -X POST http://localhost:4000/v1/intents \
  -H "Authorization: Bearer $JWT" \
  -H "Idempotency-Key: $IDEM_KEY" \
  -H 'Content-Type: application/json' \
  -d "{
    \"intent\": {
      \"version\": \"1\",
      \"intent_id\": \"itn_01J0G7NF7Z000000000000001\",
      \"kind\": \"INVOICE\",
      \"actor\": { \"type\": \"AGENT\", \"id\": \"$AGENT_ID\", \"owner_id\": \"$USER_ID\" },
      \"source\": { \"amount\": { \"amount_minor\": \"1000000\", \"currency\": \"USDC\" } },
      \"destination\": {
        \"currency\": \"USDC\",
        \"beneficiary\": {
          \"kind\": \"WALLET\",
          \"chain\": \"BASE\",
          \"address\": \"0xVENDOR_ADDRESS_HERE\"
        }
      },
      \"context\": { \"channel\": \"AGENT\" },
      \"metadata\": {
        \"invoice_id\": \"inv_2026_001\",
        \"reasoning\": {
          \"summary\": \"Vendor invoice matched PO #4421; amount within policy\",
          \"steps\": [
            { \"action\": \"extract_invoice\", \"confidence\": 0.97 },
            { \"action\": \"match_vendor\", \"vendor_ref\": \"acme-corp\" },
            { \"action\": \"policy_check\", \"result\": \"within_caps\" }
          ]
        }
      }
    }
  }" | jq
```

Expected: `state: ACCEPTED`, `execution_transaction_id` populated.

## 6. Verify settlement

```bash
export TX_ID=…   # from intent response
curl -s "http://localhost:4000/v1/transactions/$TX_ID" \
  -H "Authorization: Bearer $JWT" | jq '.state'
```

Poll until `SETTLED` or `AWAITING_CONFIRMATION` (chain rails).

## 7. Audit trail

```bash
# Reasoning log
curl -s "http://localhost:4011/v1/agents/$AGENT_ID/reasoning-logs" | jq

# Admin dashboard
open http://localhost:3001/ai-insights
```

## Policy denial test

Submit the same intent with `amount_minor` above `per_tx_cap_minor`. Expected:

- Intent `state: REJECTED`
- Error code `agents.policy.per_tx_cap_exceeded`
- NATS event `salychain.agent.spend_denied`

## Partner path (API key)

Partners can also manage agents via gateway with `agents:write` scope:

```bash
curl -s -X POST http://localhost:4000/v1/agents \
  -H "Authorization: Bearer sk_test_…" \
  -H 'Content-Type: application/json' \
  -d '{ "owner_id": "biz_…", "owner_kind": "BUSINESS", "name": "Treasury Agent" }'
```
