-- Deduplicated view over observed blocks/ledgers per chain.
select
    chain_id,
    block_number,
    block_hash,
    ts,
    event_id
from {{ source('salychain_analytics', 'blocks') }} final
