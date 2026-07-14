import Link from 'next/link';
import type { ReactNode } from 'react';
import { SearchBar } from './SearchBar';

export function ExplorerShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-surface-border bg-surface-raised/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-sm font-bold text-white">
                S
              </span>
              <span className="text-base font-semibold text-text-primary">Saly Explorer</span>
            </Link>
            <nav className="hidden gap-4 text-sm text-text-secondary sm:flex">
              <Link href="/" className="transition hover:text-text-primary">
                Overview
              </Link>
              <Link href="/transfers" className="transition hover:text-text-primary">
                Transfers
              </Link>
              <Link href="/l3/settlements" className="transition hover:text-text-primary">
                L3 settlements
              </Link>
              <Link href="/l3/salysd" className="transition hover:text-text-primary">
                SalySD
              </Link>
              <Link href="/l3/bridge" className="transition hover:text-text-primary">
                L3 bridge
              </Link>
            </nav>
          </div>
          <SearchBar />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      <footer className="mx-auto max-w-6xl px-4 py-8 text-xs text-text-muted">
        Saly Explorer · Base · Saly L3 · XRPL — powered by the Saly Realtime API.
      </footer>
    </div>
  );
}
