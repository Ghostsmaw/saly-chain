-- =============================================================================
-- rail_economics — daily settlement economics per rail.
--
-- Answers: how much volume each rail (INTERNAL/BASE/XRPL/L3/FIAT) routed, how
-- often it actually settled, expected vs. actual settle time, and quoted cost.
-- Built on the lineage mart so "routed" is authoritative.
-- =============================================================================

with lineage as (
    select *
    from {{ ref('intent_settlement_lineage') }}
    where rail != '' and routed_at is not null
)

select
    toDate(routed_at)                                            as date,
    rail                                                         as rail,
    count()                                                      as routed_intents,
    countIf(lineage_status = 'settled')                          as settled_intents,
    countIf(lineage_status = 'failed')                           as failed_intents,
    round(countIf(lineage_status = 'settled') / count(), 4)      as settle_success_rate,
    avg(expected_seconds)                                        as avg_expected_seconds,
    avgIf(time_to_settle_seconds, time_to_settle_seconds is not null)
                                                                as avg_actual_settle_seconds,
    sum(toFloat64OrZero(expected_cost_minor))                    as expected_cost_minor_total
from lineage
group by date, rail
order by date, rail
