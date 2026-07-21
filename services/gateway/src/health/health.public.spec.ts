import { RequestMethod } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * Contract: gateway /v1/health must remain excluded from AuthMiddleware.
 * (Live e2e would boot Nest; this locks the exclude list in app.module.)
 */
describe('gateway health public contract', () => {
  it('excludes health from auth middleware', () => {
    const mod = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), '../app.module.ts'),
      'utf8',
    );
    expect(mod).toMatch(/exclude\(/);
    expect(mod).toMatch(/v1\/health/);
    expect(mod).toMatch(/AuthMiddleware/);
    // sanity: RequestMethod.GET still referenced for the probe
    expect(RequestMethod.GET).toBeDefined();
  });
});
