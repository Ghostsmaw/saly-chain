import { ConfigError } from './index.js';

export interface ProdGuardRule {
  /** When true, this is a violation that must block production/staging startup. */
  readonly when: boolean;
  /** Human-readable explanation of the unsafe configuration. */
  readonly message: string;
}

const ENFORCED_ENVS = new Set(['production', 'staging']);

/**
 * Fail-closed money-path posture check.
 *
 * In a money platform we never want a service to boot in production (or staging)
 * while silently relying on a development stub (stub PSP, stub FX, local KMS
 * master key, embedded sanctions list, etc.). Call this right after `loadEnv()`
 * with the service-specific rules; it throws and aborts startup on any violation.
 *
 * `development` / `test` are no-ops so the local experience is unchanged.
 * Staging is enforced so pre-prod cannot greenwash stubs — see
 * `docs/runbooks/staging-vendor-posture.md`.
 */
export function assertProductionPosture(
  nodeEnv: string,
  rules: readonly ProdGuardRule[],
): void {
  if (!ENFORCED_ENVS.has(nodeEnv)) return;

  const violations = rules.filter((rule) => rule.when).map((rule) => rule.message);
  if (violations.length === 0) return;

  throw new ConfigError(
    `Refusing to start in ${nodeEnv} with unsafe configuration:\n${violations
      .map((v) => `  - ${v}`)
      .join('\n')}`,
  );
}
