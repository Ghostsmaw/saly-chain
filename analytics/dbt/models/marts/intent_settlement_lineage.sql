-- =============================================================================
-- intent_settlement_lineage — the proprietary wedge.
--
-- One row per intent that stitches the full story together:
--   intent received → screened (compliance/risk) → routed (rail decision)
--   → transaction created → settled / failed across chains.
--
-- This join (the "why a payment took a rail + how it settled") is unique to
-- SalyChain; no public explorer can reconstruct it. Built purely from the
-- gap-free realtime event spine (B1), so it is always seconds-fresh.
--
-- Note: *If aggregations over empty event_types yield epoch (1970) timestamps;
-- we expose them as NULL via nullIf on the zero DateTime.
-- =============================================================================

{% set zero_ts = "toDateTime64('1970-01-01 00:00:00', 3)" %}

with intents as (

    select
        intent_id,
        anyIf(kind, event_type = 'received')                 as kind,
        nullIf(minIf(ts, event_type = 'received'), {{ zero_ts }})  as received_at,
        anyIf(actor_id, event_type = 'received')             as actor_id,
        anyIf(source, event_type = 'received')               as source,
        nullIf(minIf(ts, event_type = 'screened'), {{ zero_ts }})  as screened_at,
        anyIf(compliance_decision, event_type = 'screened')  as compliance_decision,
        anyIf(risk_decision, event_type = 'screened')        as risk_decision,
        anyIf(risk_score, event_type = 'screened')           as risk_score,
        nullIf(minIf(ts, event_type = 'routed'), {{ zero_ts }})    as routed_at,
        anyIf(rail, event_type = 'routed')                   as rail,
        anyIf(expected_cost_minor, event_type = 'routed')    as expected_cost_minor,
        anyIf(expected_seconds, event_type = 'routed')       as expected_seconds,
        nullIf(minIf(ts, event_type = 'rejected'), {{ zero_ts }})  as rejected_at,
        anyIf(reason_code, event_type = 'rejected')          as reject_reason
    from {{ ref('stg_intent_events') }}
    group by intent_id

),

txs as (

    select
        intent_id,
        argMax(transaction_id, ts)                       as transaction_id,
        nullIf(minIf(ts, state = 'created'), {{ zero_ts }})   as tx_created_at,
        nullIf(maxIf(ts, state = 'settled'), {{ zero_ts }})   as tx_settled_at,
        anyIf(tx_hash, state = 'settled')                as settle_tx_hash,
        nullIf(maxIf(ts, state = 'failed'), {{ zero_ts }})    as tx_failed_at,
        anyIf(reason_code, state = 'failed')             as fail_reason,
        argMax(state, ts)                                as latest_state
    from {{ ref('stg_tx_lifecycle') }}
    where intent_id != ''
    group by intent_id

)

select
    i.intent_id                                          as intent_id,
    i.kind                                               as kind,
    i.received_at                                        as received_at,
    i.actor_id                                           as actor_id,
    i.source                                             as source,
    i.screened_at                                        as screened_at,
    i.compliance_decision                                as compliance_decision,
    i.risk_decision                                      as risk_decision,
    i.risk_score                                         as risk_score,
    i.routed_at                                          as routed_at,
    i.rail                                               as rail,
    i.expected_cost_minor                                as expected_cost_minor,
    i.expected_seconds                                   as expected_seconds,
    i.rejected_at                                        as rejected_at,
    i.reject_reason                                      as reject_reason,
    t.transaction_id                                     as transaction_id,
    t.tx_created_at                                      as tx_created_at,
    t.tx_settled_at                                      as tx_settled_at,
    t.settle_tx_hash                                     as settle_tx_hash,
    t.tx_failed_at                                       as tx_failed_at,
    t.fail_reason                                        as fail_reason,
    t.latest_state                                       as tx_latest_state,
    if(t.tx_settled_at is not null and i.received_at is not null,
       dateDiff('second', i.received_at, t.tx_settled_at),
       null)                                             as time_to_settle_seconds,
    multiIf(
        t.latest_state = 'settled', 'settled',
        t.latest_state = 'failed', 'failed',
        i.rejected_at is not null, 'rejected',
        t.transaction_id != '', 'in_flight',
        i.routed_at is not null, 'routed',
        'received')                                      as lineage_status
from intents i
left join txs t on i.intent_id = t.intent_id
