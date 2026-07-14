import { describe, expect, it } from 'vitest';
import { assertTransition } from './state-machine.js';

describe('state machine — payroll batch parent', () => {
  it('allows SCREENED → EXECUTING for batch orchestration', () => {
    expect(() => assertTransition('SCREENED', 'EXECUTING')).not.toThrow();
  });
});
