import { describe, expect, it } from 'vitest';
import { allowedNextStates, assertTransition, isTerminal } from './state-machine.js';

describe('execution state machine', () => {
  it('allows the happy path end-to-end', () => {
    const path = [
      'CREATED',
      'SCREENED',
      'ROUTED',
      'RESERVED',
      'EXECUTING',
      'AWAITING_CONFIRMATION',
      'SETTLED',
    ] as const;
    for (let i = 0; i < path.length - 1; i++) {
      expect(() => assertTransition(path[i], path[i + 1])).not.toThrow();
    }
  });

  it('rejects skipping screening', () => {
    expect(() => assertTransition('CREATED', 'ROUTED')).toThrow(/Illegal transition/);
  });

  it('rejects re-entering a terminal state', () => {
    expect(() => assertTransition('SETTLED', 'EXECUTING')).toThrow(/Illegal transition/);
  });

  it('allows compliance/risk rejection from CREATED or SCREENED', () => {
    expect(() => assertTransition('CREATED', 'REJECTED')).not.toThrow();
    expect(() => assertTransition('SCREENED', 'REJECTED')).not.toThrow();
  });

  it('allows reversal flow from FAILED', () => {
    expect(() => assertTransition('FAILED', 'REVERSING')).not.toThrow();
    expect(() => assertTransition('REVERSING', 'REVERSED')).not.toThrow();
  });

  it('allows reorg reversal from SETTLED', () => {
    expect(() => assertTransition('SETTLED', 'REVERSING')).not.toThrow();
    expect(() => assertTransition('SETTLED', 'EXECUTING')).toThrow(/Illegal transition/);
  });

  it('marks the right states terminal', () => {
    expect(isTerminal('SETTLED')).toBe(false);
    expect(isTerminal('REVERSED')).toBe(true);
    expect(isTerminal('REJECTED')).toBe(true);
    expect(isTerminal('CREATED')).toBe(false);
  });

  it('exposes allowed next states for UI/observability', () => {
    expect(allowedNextStates('RESERVED')).toContain('EXECUTING');
    expect(allowedNextStates('SCREENED')).toContain('EXECUTING');
  });
});
