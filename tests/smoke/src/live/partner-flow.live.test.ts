/**
 * Live staging smoke — skipped unless SMOKE_GATEWAY_URL is set.
 *
 * Typical usage against a running stack:
 *   SMOKE_GATEWAY_URL=http://localhost:4000 \
 *   SMOKE_API_KEY=sk_test_… \
 *   pnpm -F @salychain/smoke-tests test:live
 *
 * Or shell harness (preferred for operators):
 *   ./scripts/smoke/partner-flow.sh
 */
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../../../..');
const gateway = process.env.SMOKE_GATEWAY_URL;

describe('live: partner flow (login→intent→settle→webhook)', () => {
  it.skipIf(!gateway)('partner-flow.sh exits 0 against live gateway', () => {
    const script = join(repoRoot, 'scripts/smoke/partner-flow.sh');
    const result = spawnSync('bash', [script], {
      env: { ...process.env, SMOKE_GATEWAY_URL: gateway },
      encoding: 'utf8',
      timeout: 240_000,
    });
    if (result.status !== 0) {
      // Surface stdout/stderr in the assertion message for CI logs.
      expect(
        `status=${result.status}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
      ).toBe('status=0');
    }
    expect(result.status).toBe(0);
    expect(result.stdout).toMatch(/OK partner-flow smoke passed/);
  });
});
