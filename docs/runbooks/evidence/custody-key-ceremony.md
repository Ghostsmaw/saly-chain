# Evidence — Custody key ceremony

- Date (UTC): 2026-07-21
- Operators A/B:
  - **Phase A–C (staging/local pre-ceremony):** Operator A = platform eng (automated verification)
  - **Phase B prod CMK create (two-person rule):** **pending** — requires AWS account Operators A/B on recorded call
- AWS account / region (redact if needed): N/A for local; staging TF module ready at `infra/terraform/modules/kms` + `infra/terraform/staging/main.tf` (`module "signer_kms"`)
- CMK alias: planned `alias/salychain-signer-prod` (prod); staging uses TF-managed key when applied
- IRSA role (name only): Helm `serviceAccount.signer` → `{release}-signer-sa` with `eks.amazonaws.com/role-arn` annotation (`infra/helm/salychain/templates/signer-serviceaccount.yaml`)
- Encryption context (as deployed): `service=salychain-signer`, `purpose=wallet-private-key` (ceremony doc aligned)
- Sign probe result:
  - `pnpm custody:sign-probe` → **OK**
  - health: `kms_available=true`, `kms_provider=local` (development — expected)
  - created XRPL key_ref `kms:local:01ky2dxhqfn2v086j7f2rg110q` (non-value wrap path)
  - `pnpm -F @salychain/config test` — prod-guard rejects `KMS_PROVIDER=local` in staging+production (**pass**)
- Ticket / recording link: local pre-ceremony; prod CMK creation recording **TBD**
- Signatures:
  - Pre-ceremony verification: **signed** 2026-07-21 (platform)
  - Prod CMK dual sign-off: **pending** Operators A/B
- Notes: Production money must not proceed until Phase B completes with AWS CMK + IRSA bind + CloudTrail-only signer role proof. Local `KMS_PROVIDER=local` remains forbidden under `assertProductionPosture` for staging/prod.
