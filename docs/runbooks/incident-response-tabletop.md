# Incident Response Tabletop

> Facilitated exercise to prove SalyChain can detect, contain, and recover from custody/money-path incidents before public traffic.

## Cadence
- **Staging tabletop:** before first go-live; then quarterly
- **Prod tabletop:** within 30 days of go-live; then quarterly
- Duration: 90 minutes + 30 minute retro

## Roles
| Seat | Who |
|------|-----|
| Facilitator | Eng manager / security lead |
| Incident commander | Platform on-call |
| Custody | Signer/KMS owner |
| Money path | Execution + ledger owner |
| Comms | Someone who drafts customer/status updates |
| Scribe | Records timeline + decisions |

## Scenarios (pick 2 per session)

### IR-1 — Suspected signer key compromise
**Inject:** CloudTrail shows unexpected `kms:Sign` from unknown role.  
**Expect:** freeze outbound broadcasts; rotate IRSA + deny old role; invalidate in-flight jobs; customer status page; forensic export.

### IR-2 — Double-settle / ledger imbalance alert
**Inject:** Prometheus `ledger_imbalance` fires after a deploy.  
**Expect:** halt gateway intents; pause workers; identify last good journal id; reverse or hold; no “delete rows” fixes.

### IR-3 — Webhook secret leak
**Inject:** Partner posts signing secret to a public gist.  
**Expect:** rotate subscription secret; replay-safe deliveries; partner notify; check delivery logs for abuse.

### IR-4 — PSP webhook forgery attempt
**Inject:** Flood of fiat webhooks with bad HMAC.  
**Expect:** 401/403; rate limit; no ledger credit; alert on verify-fail spike.

### IR-5 — Region outage
**Inject:** Staging “eu-west-1 down”.  
**Expect:** follow [disaster-recovery.md](disaster-recovery.md); RTO clock started; customer comms within 30 min.

## Facilitation checklist
- [ ] Page path tested (who gets paged for custody vs app)
- [ ] Runbook links reachable without VPN tribal knowledge — see [ir-containment.md](ir-containment.md)
- [ ] Decision log: freeze / continue / disclose
- [ ] Gaps filed as tickets with owners + dates
- [ ] Sign-off: facilitator + IC

## Evidence template
```
Date:
Scenario IDs:
Participants:
Timeline (UTC):
Decisions:
Gaps / tickets:
RTO observed (if timed):
Sign-off:
```
