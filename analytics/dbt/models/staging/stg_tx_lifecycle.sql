-- Deduplicated view over SalyChain transaction state transitions.
-- One row per (transaction_id, state) after collapsing redeliveries.
select
    transaction_id,
    state,
    kind,
    ts,
    intent_id,
    rail,
    tx_hash,
    amount_minor,
    currency,
    reason_code,
    event_id
from {{ source('salychain_analytics', 'tx_lifecycle') }} final
