# S3 — On-chain escrow fundDeal

End-to-end: deploy `SalyEscrow` → configure services → submit intent with `escrow_condition` → execution calls `fundDeal` → chain listener observes `DealFunded` → transaction settles.

## Prerequisites

- SalyChain stack running (`pnpm infra:up`, migrations, `pnpm dev`)
- Base Sepolia RPC + funded custodial wallet (see [S1 runbook](s1-base-testnet-payout.md))
- Foundry (`forge`) for contract deploy

## 1. Deploy SalyEscrow

Pick a **resolver** address (operator key that can `release` / `refund` deals). In dev this can be a dedicated hot wallet.

```bash
export RESOLVER_ADDRESS=0xYourResolverAddress
export PRIVATE_KEY=0xYourDeployerPrivateKey

chmod +x scripts/deploy-escrow-base.sh
./scripts/deploy-escrow-base.sh
```

Copy the deployed address into:

| Service | Variable |
|---|---|
| `services/execution` | `ESCROW_CONTRACT_ADDRESS_BASE` |
| `services/wallet` | `ESCROW_CONTRACT_ADDRESS` |
| `services/workers/chain-listener-base` | `ESCROW_CONTRACT_ADDRESS` |

Restart execution, wallet, and chain-listener-base after updating env.

## 2. Wallet policy

The payer wallet must allow the **payee** address in its destination allowlist (signer policy checks payee, not the escrow contract).

For dev, `*` in the allowlist is fine.

## 3. Submit an escrow intent

POST to the gateway (or intent service) with:

- `source.amount.currency`: `USDC`
- `destination.currency`: `USDC`
- `destination.beneficiary`: `{ "kind": "WALLET", "chain": "BASE", "address": "0xPayee…" }`
- `constraints.escrow_condition`:
  ```json
  {
    "type": "DELIVERY",
    "deadline_at": "2026-12-31T23:59:59Z",
    "description": "Release on delivery confirmation"
  }
  ```

Routing selects the **ESCROW** rail when `escrow_condition` is present and the destination is Base USDC.

## 4. What happens on-chain

1. Execution derives `deal_id = keccak256(execution_tx_id)` and enqueues an `ESCROW_FUND` wallet job.
2. Wallet worker:
   - `approve(escrow, amount)` on USDC if allowance is insufficient
   - `SalyEscrow.fundDeal(dealId, payee, USDC, amount, deadline)`
3. Chain listener emits `salychain.chain.base.deal_funded`.
4. Execution confirmations move the transaction to **SETTLED**.

## 5. Verify

```bash
# Execution transaction — expect kind ESCROW_PAYOUT, state SETTLED
curl -s "http://localhost:4003/v1/transactions?kind=ESCROW_PAYOUT" | jq .

# On-chain deal (cast)
cast call $ESCROW_CONTRACT_ADDRESS "deals(bytes32)(address,address,address,uint128,uint64,uint8)" $DEAL_ID --rpc-url $BASE_RPC_URL
```

Deal status `1` = FUNDED.

## 6. Release / refund (operator)

Use the **admin API** or dashboard (recommended):

```bash
curl -X POST -H "Authorization: Bearer $EXECUTION_ADMIN_TOKEN" \
  "http://localhost:4003/v1/escrow/deals/$DEAL_ID/release" \
  -d '{"actor":"ops"}'
```

See [s5-escrow-release-refund.md](./s5-escrow-release-refund.md) for full Tier 2 runbook (indexing, audit, admin UI).

Manual fallback (`cast`):

```bash
# Release to payee
cast send $ESCROW_CONTRACT_ADDRESS "release(bytes32)" $DEAL_ID --rpc-url $BASE_RPC_URL --private-key $RESOLVER_PRIVATE_KEY

# Refund to payer (resolver or anyone after deadline)
cast send $ESCROW_CONTRACT_ADDRESS "refund(bytes32)" $DEAL_ID --rpc-url $BASE_RPC_URL --private-key $RESOLVER_PRIVATE_KEY
```

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| `execution.escrow_not_configured` | `ESCROW_CONTRACT_ADDRESS_BASE` not set in execution env |
| `wallet.escrow_contract_mismatch` | Request `escrow_contract` ≠ wallet `ESCROW_CONTRACT_ADDRESS` |
| `signer.policy.destination_not_allowed` | Payee not in wallet allowlist |
| Stuck in `AWAITING_CONFIRMATION` | Chain listener not running or `ESCROW_CONTRACT_ADDRESS` unset on listener |
| `Escrow__FeeOnTransferUnsupported` | Token is fee-on-transfer — use standard USDC only |

## References

- [ADR-0014 — Escrow contract primitive](../adr/0014-escrow-contract-primitive.md)
- [contracts/escrow/README.md](../../contracts/escrow/README.md)
