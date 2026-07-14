import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const loadDir = join(dirname(fileURLToPath(import.meta.url)), '../../load/k6');

describe('load: k6 script contracts', () => {
  it('intent-submit defines p95 latency threshold', () => {
    const script = readFileSync(join(loadDir, 'intent-submit.js'), 'utf8');
    expect(script).toContain('http_req_duration');
    expect(script).toContain('p(95)<300');
    expect(script).toContain('Idempotency-Key');
  });

  it('health-smoke defines success checks', () => {
    const script = readFileSync(join(loadDir, 'health-smoke.js'), 'utf8');
    expect(script).toContain('/v1/health');
    expect(script).toContain('check(');
  });
});
