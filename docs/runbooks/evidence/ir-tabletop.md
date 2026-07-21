# Evidence — IR tabletop

- Date (UTC): 2026-07-21
- Scenario IDs (IR-1…IR-5): **IR-1** (signer compromise), **IR-2** (ledger imbalance)
- Participants (IC, custody, money-path, comms, scribe):
  - Facilitator / scribe: platform eng (Cursor-facilitated technical tabletop)
  - IC / custody / money-path / comms: **deferred dual human seats** — decisions recorded as expected runbook outcomes for on-call rehearsal; live paging path not exercised
- Timeline summary:
  - **T+0** Facilitator injects IR-1 (unexpected KMS use from unknown role).
  - **T+5** Decision: **freeze** outbound (gateway/intent/wallet broadcast scale-to-0 per DR §3.2); **do not** delete CMK; deny compromised IRSA; open forensics ticket.
  - **T+15** Confirm controls exist: Terraform CMK policy binds `service=salychain-signer` + `purpose=wallet-private-key` (`infra/terraform/modules/kms/main.tf`); Helm dedicated `{release}-signer-sa`; alerts `SignerErrorRateHigh` / `SignerDenialSpike`.
  - **T+20** Inject IR-2 (`LedgerImbalanceDetected`). Decision: **halt** intents; pause confirmation workers; identify last good journal; remediate via reverse API only — never DELETE postings; resume after residual 0.
  - **T+35** Retro: filed gaps below; published [ir-containment.md](../ir-containment.md) so IR-1…IR-5 have reachable steps without tribal knowledge.
- Freeze / continue / disclose decisions:
  - IR-1: **freeze** broadcasts + **disclose** if customer impact plausible within 30 min
  - IR-2: **freeze** money path until trial balance residual = 0; disclose if customer-visible balances wrong
- Gaps / tickets filed:
  1. **IR-GAP-1** — Add Prometheus alert for fiat webhook HMAC verify failures (IR-4 expects verify-fail spike; only outbound `WebhookDeliveryFailuresHigh` exists today). Owner: platform. Target: before prod fiat rail.
  2. **IR-GAP-2** — Live page-path test (PagerDuty/Opsgenie routing custody vs app) still required with on-call humans. Owner: eng manager. Target: next quarterly tabletop.
  3. **IR-GAP-3** — CloudTrail export playbook sample for KMS forensics (account-specific). Owner: custody. Target: with prod CMK ceremony.
- Sign-off (facilitator + IC):
  - Facilitator: **signed** (technical tabletop + containment runbook shipped) 2026-07-21
  - IC: **pending** human on-call countersignature at next live quarterly session
