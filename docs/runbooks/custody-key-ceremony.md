# Custody Key Ceremony

> Procedure to create, bind, and hand off production signing material. Required before mainnet money.

## Principles
1. **No local KMS in prod** — `KMS_PROVIDER=aws` only.
2. **Least privilege** — dedicated signer IRSA; CMK policy conditioned on encryption context (`service=salychain-signer`, `purpose=wallet-private-key` as deployed in Terraform + signer).
3. **Two-person rule** — key creation and policy attach require two operators.
4. **Never export** raw CMK material; never commit key IDs into public docs with account numbers if policy forbids.

## Ceremony steps

### Phase A — Plan (T-7 days)
- [ ] Assign Operator A (create) + Operator B (verify)
- [ ] Confirm AWS account / region for custody
- [ ] Draft CMK alias: `alias/salychain-signer-prod`
- [ ] Confirm Terraform or console procedure matches current IAM module
- [ ] Schedule change window; open ticket

### Phase B — Create (recorded call / screenshare)
1. Operator A creates CMK (symmetric, encrypt/decrypt + sign as required by signer provider).
2. Operator B reads back key ARN + alias from console/CLI (second pair of eyes).
3. Attach key policy: only signer role + break-glass admin role.
4. Create/update IRSA for `service-signer` with `kms:Sign` / `kms:Decrypt` as coded.
5. Store ARN in Secrets Manager / External Secrets — **not** in git.
6. Both operators sign the ceremony log (ticket comment).

### Phase C — Bind & prove
1. Deploy signer with `KMS_PROVIDER=aws` + key ARN.
2. Run signer health + non-value probe: `./scripts/custody/sign-probe.sh` (create key = KMS wrap path).
3. Confirm CloudTrail shows sign calls from the signer role only.
4. Confirm production posture guard still rejects `KMS_PROVIDER=local`.

### Phase D — Handoff
- [ ] Break-glass procedure documented (who can update key policy)
- [ ] Rotation interval agreed (e.g. annual or on personnel change)
- [ ] Previous staging keys remain in staging account only

## Rotation (abbreviated)
1. Create new CMK + dual-write / re-encrypt period if required by signer design.
2. Flip secret to new ARN; roll signer pods.
3. Disable old CMK after idle period; do not schedule deletion until evidence complete.

## Ceremony log template
```
Date (UTC):
Operators (A/B):
AWS account / region:
CMK ARN / alias:
IRSA role ARN:
Sign probe result:
Ticket / recording link:
Signatures:
```
