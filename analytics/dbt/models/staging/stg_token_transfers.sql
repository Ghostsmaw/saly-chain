-- Thin, deduplicated view over the realtime token_transfers table.
-- FINAL collapses ReplacingMergeTree duplicates from at-least-once delivery.
select
    chain_id,
    tx_hash,
    log_index,
    ts,
    block_number,
    token_address,
    token_symbol,
    from_address,
    to_address,
    amount_raw,
    transfer_type,
    event_id
from {{ source('salychain_analytics', 'token_transfers') }} final
