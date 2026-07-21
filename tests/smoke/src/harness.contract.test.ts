import { accessSync, constants, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../../..');

describe('smoke harness contract', () => {
  it('ships executable partner-flow + health + seed scripts', () => {
    for (const rel of [
      'scripts/smoke/health.sh',
      'scripts/smoke/wait-healthy.sh',
      'scripts/smoke/partner-flow.sh',
      'scripts/smoke/seed-partner-wallet.sh',
      'scripts/smoke/prepare-staging-env.sh',
      'scripts/smoke/lib.sh',
      'scripts/start-stack.sh',
      'scripts/stop-stack.sh',
    ]) {
      const path = join(repoRoot, rel);
      accessSync(path, constants.R_OK);
      const body = readFileSync(path, 'utf8');
      expect(body).toMatch(/set -euo pipefail/);
    }
  });

  it('documents DR RPO/RTO, ceremonies, and evidence templates', () => {
    for (const rel of [
      'docs/runbooks/disaster-recovery.md',
      'docs/runbooks/incident-response-tabletop.md',
      'docs/runbooks/custody-key-ceremony.md',
      'docs/runbooks/staging-vendor-posture.md',
      'docs/runbooks/evidence/README.md',
      'docs/runbooks/evidence/staging-smoke.md',
    ]) {
      const body = readFileSync(join(repoRoot, rel), 'utf8');
      expect(body.length).toBeGreaterThan(100);
    }
  });
});
