-- Deduplicated view over decoded logs (escrow deals, L3 output proposals, ...).
select
    chain_id,
    tx_hash,
    log_index,
    ts,
    contract_address,
    event_name,
    args,
    event_id
from {{ source('salychain_analytics', 'decoded_events') }} final
