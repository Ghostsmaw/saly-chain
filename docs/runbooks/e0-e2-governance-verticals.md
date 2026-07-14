# Milestone E0–E2 — Governance + vertical registry ops

One-command apply (testnet, after SalySD is deployed):

```bash
pnpm l3:testnet:e-governance:apply
```

On first run, `infra/l3/testnet/.env` and `deployments.base-sepolia.json` are created from their `.example` templates if missing (`pnpm bootstrap:l3-envs`).

Or step-by-step:

## 1. Migrations

```bash
pnpm db:migrate
```

Applies `contract-registry` (E1 schema) and `wallet` (`CONTRACT_CALL` kind) migrations.

## 2. Deploy vertical registry (L3)

```bash
export L3_STACK_DIR=infra/l3/testnet
export L3_NETWORK=saly-testnet
export L2_CHAIN_ID=845320002
# Requires SALYSD_ADMIN + DEPLOYER key in infra/l3/testnet/.env
pnpm l3:testnet:deploy:registry
```

Records `assets.SalyAttestationRegistry` and `assets.SalyAssetToken` in the deployments manifest.

## 3. Deploy governance (Base settlement, optional)

```bash
export GOVERNANCE_TREASURY=0xYourTreasury
pnpm l3:testnet:deploy:governance
```

Records `governance.{token,timelock,governor}` in the manifest.

## 4. Bootstrap executor wallet + PAUSER_ROLE

```bash
pnpm l3:testnet:governance:bootstrap
```

Prints `GOVERNANCE_EXECUTOR_WALLET_ID` and grants `PAUSER_ROLE` on SalySD when `SALYSD_ADMIN_PRIVATE_KEY` is set.

## 5. Configure contract-registry

Copy output into `services/contract-registry/.env`:

```
GOVERNANCE_EXECUTOR_WALLET_ID=<uuid>
WALLET_BASE_URL=http://localhost:4002
L3_NETWORK=saly-testnet
L3_L3_RPC_URL=<your L3 RPC>
L3_ATTESTATION_REGISTRY_ADDRESS=<from manifest>
```

Restart contract-registry — `GovernanceManifestSyncService` upserts real addresses from the manifest on boot.

## 6. Verify

```bash
pnpm governance:verify
```

Checks: manifest assets, registry health, SalySD `ON_CHAIN` row, executor wallet id, `PAUSER_ROLE` on-chain.

## Manual governance registration

```bash
curl -X POST http://localhost:4013/v1/governance/deployments \
  -H 'content-type: application/json' \
  -d '{
    "id": "gov_saly_testnet",
    "network": "base-sepolia",
    "chain_id": 84532,
    "token_address": "0x…",
    "timelock_address": "0x…",
    "governor_address": "0x…"
  }'
```

## Accredit attestation issuer

```bash
curl -X POST http://localhost:4013/v1/attestations/issuers/c_attest \
  -H 'content-type: application/json' \
  -d '{
    "issuer_address": "0x…",
    "vertical": "healthcare",
    "accredited": true
  }'
```

## Security checklist

- [ ] Timelock admin renounced after governor wired
- [ ] Executor wallet policy caps + destination allowlist include SalySD + attestation registry
- [ ] No private keys in contract-registry or gateway services
- [ ] Production pause also available via timelock proposal (dual path)
