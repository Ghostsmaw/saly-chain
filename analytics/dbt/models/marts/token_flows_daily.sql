-- =============================================================================
-- token_flows_daily — daily transfer volume & participation per chain + token.
--
-- amount_raw is kept as a String upstream (minor units / drops can exceed 64-bit
-- precision); we aggregate via toFloat64OrZero, which is fine for analytics-grade
-- volume reporting. Exact-precision sums land with the lakehouse in B5.
-- =============================================================================

select
    toDate(ts)                          as date,
    chain_id                            as chain_id,
    token_symbol                        as token_symbol,
    count()                             as transfer_count,
    uniqExact(from_address)             as unique_senders,
    uniqExact(to_address)               as unique_receivers,
    sum(toFloat64OrZero(amount_raw))    as total_amount_raw
from {{ ref('stg_token_transfers') }}
group by date, chain_id, token_symbol
order by date, chain_id, token_symbol
