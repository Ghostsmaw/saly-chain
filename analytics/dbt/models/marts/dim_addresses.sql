-- =============================================================================
-- dim_addresses — every address observed in transfers, with activity stats and
-- a left-joined human label from the address_labels seed (system contracts,
-- treasuries, known counterparties).
-- =============================================================================

with observed as (

    select chain_id, from_address as address, ts, amount_raw from {{ ref('stg_token_transfers') }}
    union all
    select chain_id, to_address as address, ts, amount_raw from {{ ref('stg_token_transfers') }}

),

agg as (

    select
        chain_id,
        address,
        count()              as transfer_events,
        min(ts)              as first_seen_at,
        max(ts)              as last_seen_at
    from observed
    where address != ''
    group by chain_id, address

)

select
    a.chain_id          as chain_id,
    a.address           as address,
    a.transfer_events   as transfer_events,
    a.first_seen_at     as first_seen_at,
    a.last_seen_at      as last_seen_at,
    l.label             as label,
    l.category          as category
from agg a
left join {{ ref('address_labels') }} l
    on a.chain_id = l.chain_id and a.address = l.address
