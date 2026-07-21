import { describe, expect, it } from 'vitest';
import { ConfigError } from './index.js';
import { assertProductionPosture } from './prod-guard.js';

describe('assertProductionPosture', () => {
  it('is a no-op in development and test', () => {
    expect(() =>
      assertProductionPosture('development', [{ when: true, message: 'bad' }]),
    ).not.toThrow();
    expect(() =>
      assertProductionPosture('test', [{ when: true, message: 'bad' }]),
    ).not.toThrow();
  });

  it('enforces rules in staging and production', () => {
    expect(() =>
      assertProductionPosture('staging', [{ when: true, message: 'no stubs' }]),
    ).toThrow(ConfigError);
    expect(() =>
      assertProductionPosture('production', [{ when: true, message: 'no stubs' }]),
    ).toThrow(/production/);
  });

  it('allows clean staging config', () => {
    expect(() =>
      assertProductionPosture('staging', [{ when: false, message: 'no stubs' }]),
    ).not.toThrow();
  });
});
