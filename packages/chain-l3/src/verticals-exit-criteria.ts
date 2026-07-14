/**
 * Milestone E3–E7 ops exit gate — env bootstrap, optional service health, code checks.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export interface VerticalsVerifyInput {
  repoRoot?: string;
  /** When true, require /v1/health on each vertical service. */
  requireHealth?: boolean;
}

export interface VerticalsVerifyResult {
  ok: boolean;
  checks: Array<{ name: string; ok: boolean; detail?: string }>;
}

const VERTICAL_SERVICES = [
  { name: 'finance', port: 4023 },
  { name: 'gov', port: 4024 },
  { name: 'agri', port: 4025 },
  { name: 'scm', port: 4026 },
  { name: 'aviation', port: 4027 },
  { name: 'health', port: 4028 },
  { name: 'edu', port: 4029 },
] as const;

async function healthCheck(baseUrl: string): Promise<{ ok: boolean; detail: string }> {
  try {
    const res = await fetch(`${baseUrl}/v1/health`, { signal: AbortSignal.timeout(5_000) });
    return { ok: res.ok, detail: `status=${res.status}` };
  } catch (err) {
    return { ok: false, detail: (err as Error).message };
  }
}

function findRepoRoot(start = process.cwd()): string {
  let dir = start;
  for (let i = 0; i < 8; i++) {
    if (existsSync(join(dir, 'pnpm-workspace.yaml')) && existsSync(join(dir, 'services', 'finance'))) {
      return dir;
    }
    const parent = join(dir, '..');
    if (parent === dir) break;
    dir = parent;
  }
  return start;
}

export async function verifyVerticalsExit(input: VerticalsVerifyInput = {}): Promise<VerticalsVerifyResult> {
  const checks: VerticalsVerifyResult['checks'] = [];
  const root = input.repoRoot ?? findRepoRoot();

  for (const svc of VERTICAL_SERVICES) {
    const envPath = join(root, 'services', svc.name, '.env');
    const migrationDir = join(root, 'services', svc.name, 'prisma', 'migrations', '20260624130000_init');
    checks.push({
      name: `${svc.name}_env`,
      ok: existsSync(envPath),
      detail: envPath,
    });
    checks.push({
      name: `${svc.name}_migration`,
      ok: existsSync(join(migrationDir, 'migration.sql')),
      detail: '20260624130000_init',
    });
  }

  const agentsMigration = join(root, 'services', 'agents', 'prisma', 'migrations', '20260624120000_e3_marketplace', 'migration.sql');
  checks.push({
    name: 'agents_e3_marketplace_migration',
    ok: existsSync(agentsMigration),
    detail: agentsMigration,
  });

  const agentsContracts = join(root, 'contracts', 'agents', 'src', 'SalyAgentRegistry.sol');
  checks.push({
    name: 'agents_contracts_present',
    ok: existsSync(agentsContracts),
    detail: 'SalyAgentRegistry + SalyStreamPay',
  });

  if (input.requireHealth) {
    for (const svc of VERTICAL_SERVICES) {
      const base = process.env[`${svc.name.toUpperCase()}_BASE_URL`] ?? `http://localhost:${svc.port}`;
      const health = await healthCheck(base);
      checks.push({ name: `${svc.name}_health`, ...health });
    }
    const agentsHealth = await healthCheck(process.env.AGENTS_BASE_URL ?? 'http://localhost:4011');
    checks.push({ name: 'agents_health', ...agentsHealth });
  }

  return { ok: checks.every((c) => c.ok), checks };
}
