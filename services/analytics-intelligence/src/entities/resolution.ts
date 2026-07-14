/**
 * Entity resolution for account-based chains.
 *
 * Heuristic (MVP): the **common-counterparty** signal. Two addresses are likely
 * controlled by the same actor if they repeatedly transact with the same set of
 * *distinct* counterparties. We link a pair once they share at least `minShared`
 * counterparties, then take connected components as entities.
 *
 * Two safety valves keep this from collapsing the whole graph into one blob:
 *   - **Hub suppression:** a counterparty used by more than `maxCounterpartyDegree`
 *     addresses (e.g. an exchange hot wallet, a router) carries no signal of
 *     common control and is ignored for linking.
 *   - Links require co-occurrence across `minShared` *different* counterparties,
 *     so a single shared hub never links anyone.
 *
 * Pure + deterministic: same input → same clusters (stably sorted).
 */
export interface AddressNode {
  address: string;
  /** Distinct counterparties this address transacted with (any direction). */
  counterparties: string[];
  transferEvents?: number;
}

export interface ResolveOptions {
  minShared: number;
  /** Counterparties with more than this many distinct addresses are treated as
   *  hubs and ignored for linking. Default 50. */
  maxCounterpartyDegree?: number;
}

export interface Cluster {
  /** Member addresses, lexicographically sorted. */
  addresses: string[];
}

export interface ResolveResult {
  clusters: Cluster[];
  /** Number of address pairs that met the link threshold. */
  links: number;
}

class UnionFind {
  private parent: number[];
  private rank: number[];
  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  find(x: number): number {
    let root = x;
    while (this.parent[root] !== root) root = this.parent[root]!;
    // path compression
    let cur = x;
    while (this.parent[cur] !== root) {
      const next = this.parent[cur]!;
      this.parent[cur] = root;
      cur = next;
    }
    return root;
  }
  union(a: number, b: number): void {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra === rb) return;
    if (this.rank[ra]! < this.rank[rb]!) {
      this.parent[ra] = rb;
    } else if (this.rank[ra]! > this.rank[rb]!) {
      this.parent[rb] = ra;
    } else {
      this.parent[rb] = ra;
      this.rank[ra] = this.rank[ra]! + 1;
    }
  }
}

export function resolveEntities(nodes: AddressNode[], opts: ResolveOptions): ResolveResult {
  const maxDegree = opts.maxCounterpartyDegree ?? 50;
  const minShared = Math.max(1, opts.minShared);

  // Deduplicate + index addresses.
  const index = new Map<string, number>();
  const addresses: string[] = [];
  for (const node of nodes) {
    if (!index.has(node.address)) {
      index.set(node.address, addresses.length);
      addresses.push(node.address);
    }
  }

  // counterparty → set of address indices that touched it.
  const byCounterparty = new Map<string, Set<number>>();
  for (const node of nodes) {
    const i = index.get(node.address)!;
    for (const cp of new Set(node.counterparties)) {
      // A counterparty that is itself one of our addresses is still a valid
      // shared signal, but a self-reference is not.
      if (cp === node.address) continue;
      let set = byCounterparty.get(cp);
      if (!set) {
        set = new Set();
        byCounterparty.set(cp, set);
      }
      set.add(i);
    }
  }

  // Accumulate shared-counterparty counts per unordered pair (i<j).
  const pairCounts = new Map<string, number>();
  for (const members of byCounterparty.values()) {
    if (members.size < 2 || members.size > maxDegree) continue; // hub suppression
    const arr = [...members].sort((a, b) => a - b);
    for (let a = 0; a < arr.length; a++) {
      for (let b = a + 1; b < arr.length; b++) {
        const key = `${arr[a]}:${arr[b]}`;
        pairCounts.set(key, (pairCounts.get(key) ?? 0) + 1);
      }
    }
  }

  const uf = new UnionFind(addresses.length);
  let links = 0;
  for (const [key, count] of pairCounts) {
    if (count < minShared) continue;
    const [a, b] = key.split(':').map(Number) as [number, number];
    uf.union(a, b);
    links += 1;
  }

  // Collect connected components.
  const groups = new Map<number, string[]>();
  for (let i = 0; i < addresses.length; i++) {
    const root = uf.find(i);
    let g = groups.get(root);
    if (!g) {
      g = [];
      groups.set(root, g);
    }
    g.push(addresses[i]!);
  }

  const clusters: Cluster[] = [...groups.values()]
    .map((addrs) => ({ addresses: addrs.sort() }))
    .sort((x, y) => (x.addresses[0]! < y.addresses[0]! ? -1 : 1));

  return { clusters, links };
}
