# IR containment quick reference

> Linked from [incident-response-tabletop.md](incident-response-tabletop.md). Keep decisions in the evidence log — do not “fix” money by deleting rows.

## IR-1 — Suspected signer compromise

1. **Freeze outbound** — scale gateway + intent + wallet broadcast workers to 0 (or maintenance ingress). See [disaster-recovery.md](disaster-recovery.md) §3.2 step 1.
2. **Contain KMS** — deny compromised IRSA role; keep CMK; do not export. Rotate signer SA annotation / role ARN via Terraform + Helm.
3. **Invalidate in-flight** — drain/fail BullMQ broadcast jobs; do not retry until new role proves clean.
4. **Forensics** — export CloudTrail `kms:Encrypt|Decrypt|GenerateDataKey` for the window; ticket + evidence folder.
5. **Disclose** — status page within 30 min if customer funds could be affected.

## IR-2 — Ledger imbalance

1. **Halt intents** — gateway/intent scale 0.
2. **Pause workers** — execution confirmation consumers; ledger still read-only OK.
3. **Identify** — last good `journal_entries.id` before alert; alert name `LedgerImbalanceDetected` (`salychain_ledger_imbalance_detected_total`).
4. **Remediate** — reverse via ledger `POST /v1/journal/entries/:id/reverse` or hold accounts; **never** DELETE postings.
5. **Resume** — only after trial balance residual = 0 and canary intent.

## IR-3 — Webhook secret leak

1. **Rotate** — `POST /v1/subscriptions/:id/rotate-secret` (webhooks) or gateway `POST /v1/webhooks/:id/rotate-secret`.
2. **Notify partner** — new secret once; old secret invalid immediately.
3. **Audit** — delivery logs for unexpected successes with old signature window.
4. **Replay-safe** — deliveries remain idempotent by event id.

## IR-4 — Fiat webhook forgery

1. Confirm listener returns **401** on bad HMAC (`services/workers/fiat-listener`).
2. Confirm **no** ledger credit journals for rejected bodies.
3. Rate-limit / WAF if flood continues.
4. **Gap:** add Prometheus alert on verify-fail counter (see tabletop evidence) if not yet shipped.

## IR-5 — Region outage

Follow [disaster-recovery.md](disaster-recovery.md); start RTO clock; customer comms ≤ 30 min.
