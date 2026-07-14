import { ConfigError } from './index.js';

export interface ProdGuardRule {
  /** When true, this is a violation that must block production startup. */
  readonly when: boolean;
  /** Human-readable explanation of the unsafe configuration. */
  readonly message: string;
}

/**
 * Fail-closed production posture check.
 *
 * In a money platform we never want a service to boot in production while
 * silently relying on a development stub (stub PSP, stub FX, local KMS master
 * key, embedded sanctions list, etc.). Call this right after `loadEnv()` with
 * the service-specific rules; it throws and aborts startup on any violation.
 *
 * Outside production (`development` / `test` / `staging`) it is a no-op, so the
 * dev experience is unchanged.
 */
export function assertProductionPosture(
  nodeEnv: string,
  rules: readonly ProdGuardRule[],
): void {
  if (nodeEnv !== 'production') return;

  const violations = rules.filter((rule) => rule.when).map((rule) => rule.message);
  if (violations.length === 0) return;

  throw new ConfigError(
    `Refusing to start in production with unsafe configuration:\n${violations
      .map((v) => `  - ${v}`)
      .join('\n')}`,
  );
}
