-- Deduplicated view over agent lifecycle events (created/policy_updated/spend_denied).
select
    agent_id,
    event_type,
    ts,
    owner_id,
    owner_kind,
    wallet_ids,
    policy_version,
    intent_id,
    reason_code,
    event_id
from {{ source('salychain_analytics', 'agent_events') }} final
