-- Deduplicated view over intent lifecycle events (received/screened/routed/rejected).
select
    intent_id,
    event_type,
    kind,
    ts,
    actor_id,
    source,
    compliance_decision,
    risk_decision,
    risk_score,
    rail,
    expected_cost_minor,
    expected_seconds,
    reason_code,
    event_id
from {{ source('salychain_analytics', 'intent_events') }} final
