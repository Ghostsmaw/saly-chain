import { describe, expect, it } from 'vitest';
import { compileSemanticQuery, SemanticError } from './semantic.js';
import { planFromQuestion } from './nl-planner.js';

const OPTS = { maxLimit: 10_000 };

describe('compileSemanticQuery', () => {
  it('compiles a grouped, filtered, time-bounded query with bound params', () => {
    const c = compileSemanticQuery(
      {
        metric: 'transfer_volume',
        dimensions: ['chain', 'day'],
        filters: [{ field: 'token', value: 'USDC' }],
        sinceDays: 30,
        limit: 50,
      },
      OPTS,
    );
    expect(c.metric).toBe('transfer_volume');
    expect(c.sql).toContain('sum(toFloat64OrZero(amount_raw)) AS value');
    expect(c.sql).toContain('FROM token_transfers FINAL');
    expect(c.sql).toContain('GROUP BY chain, day');
    expect(c.sql).toContain('ORDER BY value DESC');
    expect(c.sql).toContain('token_symbol = {f0:String}');
    expect(c.sql).toContain('ts >= now() - toIntervalDay({sinceDays:UInt32})');
    expect(c.sql).toContain('LIMIT {limit:UInt32}');
    expect(c.params).toMatchObject({ f0: 'USDC', sinceDays: 30, limit: 50 });
  });

  it('applies the metric base predicate (routed intents)', () => {
    const c = compileSemanticQuery({ metric: 'routed_intents', dimensions: ['rail'] }, OPTS);
    expect(c.sql).toContain("event_type = 'routed'");
    expect(c.sql).toContain('GROUP BY rail');
  });

  it('clamps limit to maxLimit', () => {
    const c = compileSemanticQuery({ metric: 'transfer_count', limit: 9999 }, { maxLimit: 100 });
    expect(c.params.limit).toBe(100);
  });

  it('rejects unknown metric / dimension / filter (fail-closed)', () => {
    expect(() => compileSemanticQuery({ metric: 'nope' }, OPTS)).toThrow(SemanticError);
    expect(() =>
      compileSemanticQuery({ metric: 'transfer_count', dimensions: ['rail'] }, OPTS),
    ).toThrow(SemanticError);
    expect(() =>
      compileSemanticQuery(
        { metric: 'transfer_count', filters: [{ field: 'rail', value: 'x' }] },
        OPTS,
      ),
    ).toThrow(SemanticError);
  });

  it('never interpolates filter values into SQL text (injection safe)', () => {
    const c = compileSemanticQuery(
      { metric: 'transfer_count', filters: [{ field: 'chain', value: "base'; DROP TABLE x;--" }] },
      OPTS,
    );
    expect(c.sql).not.toContain('DROP TABLE');
    expect(c.params.f0).toBe("base'; DROP TABLE x;--");
  });
});

describe('planFromQuestion', () => {
  it('plans transfer volume by chain over a window', () => {
    const r = planFromQuestion('What was the USDC transfer volume by chain in the last 7 days?');
    expect(r.supported).toBe(true);
    if (!r.supported) return;
    expect(r.query.metric).toBe('transfer_volume');
    expect(r.query.dimensions).toContain('chain');
    expect(r.query.filters).toContainEqual({ field: 'token', value: 'USDC' });
    expect(r.query.sinceDays).toBe(7);
  });

  it('plans routed intents by rail', () => {
    const r = planFromQuestion('How many intents were routed per rail last month?');
    expect(r.supported).toBe(true);
    if (!r.supported) return;
    expect(r.query.metric).toBe('routed_intents');
    expect(r.query.dimensions).toEqual(['rail']);
    expect(r.query.sinceDays).toBe(30);
  });

  it('plans daily transfer count with a top-N limit', () => {
    const r = planFromQuestion('Show daily transaction count for base, top 10');
    expect(r.supported).toBe(true);
    if (!r.supported) return;
    expect(r.query.metric).toBe('transfer_count');
    expect(r.query.dimensions).toContain('day');
    expect(r.query.filters).toContainEqual({ field: 'chain', value: 'base' });
    expect(r.query.limit).toBe(10);
  });

  it('drops dimensions that are invalid for the chosen metric', () => {
    // "by token" is not a dimension of routed_intents.
    const r = planFromQuestion('routed intents by token');
    expect(r.supported).toBe(true);
    if (!r.supported) return;
    expect(r.query.dimensions ?? []).not.toContain('token');
  });

  it('returns unsupported for questions outside the semantic layer', () => {
    const r = planFromQuestion('What is the meaning of life?');
    expect(r.supported).toBe(false);
  });

  it('produces a plan that compiles', () => {
    const r = planFromQuestion('transfer volume by token daily for the last 14 days');
    expect(r.supported).toBe(true);
    if (!r.supported) return;
    const c = compileSemanticQuery(r.query, OPTS);
    expect(c.sql).toContain('GROUP BY token, day');
  });
});
