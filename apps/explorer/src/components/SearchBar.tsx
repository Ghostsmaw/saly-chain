'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const CHAINS = ['base', 'saly-mainnet', 'xrpl'] as const;

/** Heuristic router: figures out whether the query is a tx, address, block or intent. */
function resolve(query: string, chain: string): string {
  const q = query.trim();
  if (!q) return '/';
  if (/^(itn|int)[_a-z0-9]/i.test(q)) return `/intent/${encodeURIComponent(q)}`;
  if (/^\d+$/.test(q)) return `/block/${chain}/${q}`;
  if (/^0x[0-9a-fA-F]{64}$/.test(q)) return `/tx/${chain}/${q}`;
  if (/^0x[0-9a-fA-F]{40}$/.test(q)) return `/address/${chain}/${q}`;
  if (/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/.test(q)) return `/address/xrpl/${q}`;
  if (/^[0-9A-F]{64}$/.test(q)) return `/tx/xrpl/${q}`;
  return `/address/${chain}/${encodeURIComponent(q)}`;
}

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [chain, setChain] = useState<string>('base');

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(resolve(query, chain));
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-xl items-center gap-2">
      <select
        value={chain}
        onChange={(e) => setChain(e.target.value)}
        className="h-10 rounded-lg border border-surface-border bg-surface-raised px-2 text-sm text-text-secondary outline-none focus:border-brand-500"
        aria-label="Chain"
      >
        {CHAINS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tx hash, address, block #, or intent id"
          className="h-10 w-full rounded-lg border border-surface-border bg-surface-raised pl-9 pr-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-brand-500"
        />
      </div>
      <button
        type="submit"
        className="h-10 rounded-lg bg-brand-500 px-4 text-sm font-medium text-white transition hover:bg-brand-400"
      >
        Search
      </button>
    </form>
  );
}
