-- =============================================================================
-- agent_activity — one row per AI agent summarizing its lifecycle + behavior.
-- =============================================================================

{% set zero_ts = "toDateTime64('1970-01-01 00:00:00', 3)" %}

select
    agent_id                                                  as agent_id,
    nullIf(minIf(ts, event_type = 'created'), {{ zero_ts }})  as created_at,
    anyIf(owner_id, event_type = 'created')                   as owner_id,
    anyIf(owner_kind, event_type = 'created')                 as owner_kind,
    anyIf(wallet_ids, event_type = 'created')                 as wallet_ids,
    max(policy_version)                                       as latest_policy_version,
    countIf(event_type = 'policy_updated')                    as policy_update_count,
    countIf(event_type = 'spend_denied')                      as spend_denied_count,
    max(ts)                                                   as last_event_at
from {{ ref('stg_agent_events') }}
group by agent_id
order by last_event_at desc
