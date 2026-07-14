# `@salychain/service-signer`

**Isolated** transaction signing service. The only process in the platform that holds plaintext private keys, and only ephemerally during a signing call.

See [ADR-0005](../../docs/adr/0005-custody-isolation.md) for the architectural rationale.

## Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/v1/keys` | Generate a new chain key; returns `key_ref` + public address |
| `POST` | `/v1/sign` | Sign a transaction with the wallet's policy applied first |
| `GET`  | `/v1/health` | Liveness + DB + KMS health |
| `GET`  | `/docs` | OpenAPI / Swagger UI |

## Threat model summary

- **Key exfiltration**: keys are wrapped at rest by KMS; plaintext exists in memory only inside `sign()`, and the buffer is zeroed before return.
- **Compromised caller**: every signing request is matched against a per-key policy (destination allowlist, per-tx cap, daily cap, approval threshold). A compromised caller cannot exceed policy.
- **Replay**: every sign call requires a caller-supplied `idempotency_key`. Replays with a different `unsigned_tx` are rejected with `signer.idempotency_conflict`; replays of a successful sign are rejected too (signed body is not re-served).
- **KMS misconfiguration**: production deploys refuse to boot with the local KMS provider.

## KMS providers

| Provider | When | Backing |
|---|---|---|
| `local` | dev / test only | AES-256-GCM with a master key from `KMS_LOCAL_MASTER_KEY` |
| `aws` | staging / prod | AWS KMS CMK via `@aws-sdk/client-kms` (ECS task role / IRSA) |

To generate a local dev master key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Status

- ✅ Local AES-256-GCM KMS provider with auth-tag protection
- ✅ EVM (Base / Ethereum / Polygon) signer via viem
- ✅ Policy engine (allowlist / per-tx cap / daily cap / approvals)
- ✅ Audit log of every signing request (signed or denied)
- ✅ Idempotency with strict body matching
- ✅ AWS KMS provider (`Encrypt` / `Decrypt` / `DescribeKey` + encryption context)
- ✅ XRPL signer (ed25519 via ripple-keypairs)
- ✅ Key re-wrap migration job (`pnpm kms:rewrap` — local → AWS for existing keys)
- ⏳ MPC threshold backend (slice S3+)

## KMS key migration (local → AWS)

Re-wrap existing `signer_keys` rows after switching `KMS_PROVIDER=aws`:

```bash
KMS_PROVIDER=aws \
KMS_AWS_REGION=eu-west-1 \
KMS_AWS_KEY_ID=arn:aws:kms:... \
KMS_LOCAL_MASTER_KEY=<legacy-dev-master-key> \
DATABASE_URL=postgresql://.../salychain_signer \
pnpm kms:rewrap --dry-run

# Apply when dry-run looks correct
pnpm kms:rewrap
```

Optional: `--key-ref <key_ref>` to migrate a single key.
