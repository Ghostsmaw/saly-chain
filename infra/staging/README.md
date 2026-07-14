# Staging deployment guide

Phase 1 staging stack: **FIAT rail enabled**, **AWS KMS** for signer, **fiat-listener** for PSP webhooks, **GitHub Actions CI**.

## Quick start (local staging overlay)

```bash
cp .env.staging.example .env.staging
# Fill KMS_AWS_*, PAYSTACK_SECRET_KEY, FLUTTERWAVE_WEBHOOK_SECRET, EXECUTION_INTERNAL_WEBHOOK_TOKEN

pnpm infra:up
pnpm db:generate && pnpm db:migrate

# Start platform services (execution, routing, signer, …) with .env.staging loaded
# Then bring up the fiat-listener container:
docker compose -f infra/docker/docker-compose.yml \
  -f infra/docker/docker-compose.staging.yml \
  --env-file .env.staging up -d fiat-listener
```

## Checklist

| Component | Staging setting |
|---|---|
| Routing | `ROUTING_FIAT_ENABLED=true` |
| Execution | `FIAT_PSP_PROVIDER=composite` + PSP keys |
| Signer | `KMS_PROVIDER=aws` + CMK IAM on task role |
| Fiat listener | Webhook URLs registered with Paystack / Flutterwave |
| Execution ↔ listener | Shared `EXECUTION_INTERNAL_WEBHOOK_TOKEN` |

## KMS migration (local → AWS)

After pointing signer at AWS KMS:

```bash
KMS_PROVIDER=aws KMS_AWS_REGION=... KMS_AWS_KEY_ID=... \
KMS_LOCAL_MASTER_KEY=<legacy-dev-key> \
DATABASE_URL=postgresql://.../salychain_signer \
pnpm --filter @salychain/signer kms:rewrap --dry-run

# Remove --dry-run to apply
pnpm --filter @salychain/signer kms:rewrap
```

## PSP webhook URLs

| Provider | URL |
|---|---|
| Paystack | `https://<fiat-listener-host>/webhooks/paystack` |
| Flutterwave | `https://<fiat-listener-host>/webhooks/flutterwave` |

## Terraform / Kubernetes

- [`../terraform/staging/`](../terraform/staging/) — AWS KMS CMK module (apply per account/region)
- [`../k8s/staging/`](../k8s/staging/) — fiat-listener Deployment + Service manifest template

Production hardening (WAF, mTLS at ingress, PSP IP allowlists) is out of scope for Phase 1 but should follow before go-live.
