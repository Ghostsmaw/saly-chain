export interface ConductorHealthResult {
  url: string;
  ok: boolean;
  leaderId?: string;
  isLeader?: boolean;
  detail: string;
}

export interface ConductorClusterStatus {
  members: ConductorHealthResult[];
  hasLeader: boolean;
  healthyCount: number;
}

/**
 * Probe OP-Stack Conductor HTTP health (leader election / raft).
 * Conductor exposes GET /health on its admin port (default 8545).
 */
export async function probeConductorHealth(input: {
  url: string;
  timeoutMs?: number;
}): Promise<ConductorHealthResult> {
  const base = input.url.replace(/\/$/, '');
  try {
    const res = await fetch(`${base}/health`, {
      signal: AbortSignal.timeout(input.timeoutMs ?? 3_000),
    });
    if (!res.ok) {
      return { url: input.url, ok: false, detail: `HTTP ${res.status}` };
    }
    const body = (await res.json()) as {
      ok?: boolean;
      leader?: boolean;
      leader_id?: string;
      server_id?: string;
    };
    return {
      url: input.url,
      ok: body.ok !== false,
      ...(body.leader_id ? { leaderId: body.leader_id } : {}),
      ...(body.server_id && !body.leader_id ? { leaderId: body.server_id } : {}),
      ...(body.leader !== undefined ? { isLeader: body.leader } : {}),
      detail: body.leader ? 'leader' : 'follower',
    };
  } catch (err) {
    return { url: input.url, ok: false, detail: (err as Error).message };
  }
}

export async function probeConductorCluster(urls: string[]): Promise<ConductorClusterStatus> {
  const members = await Promise.all(urls.map((url) => probeConductorHealth({ url })));
  const healthyCount = members.filter((m) => m.ok).length;
  const hasLeader = members.some((m) => m.ok && m.isLeader === true);
  return { members, hasLeader, healthyCount };
}
