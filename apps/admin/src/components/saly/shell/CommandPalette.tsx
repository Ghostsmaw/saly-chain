'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Command, Search } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { salyCommandItems } from '@/lib/saly-navigation';
import { cn } from '@/lib/utils';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return salyCommandItems.slice(0, 12);
    return salyCommandItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.href.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        item.keywords?.some((k) => k.includes(q)),
    );
  }, [query]);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery('');
      router.push(href);
    },
    [router],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden h-9 w-full max-w-sm items-center gap-2 rounded-saly border border-saly-border bg-saly-bg-secondary px-3 text-sm text-saly-text-muted transition-colors hover:border-saly-border-strong hover:text-saly-text-secondary md:flex"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">Search…</span>
        <kbd className="hidden rounded border border-saly-border bg-saly-bg-card px-1.5 py-0.5 font-mono text-[10px] text-saly-text-faint sm:inline">
          ⌘K
        </kbd>
      </button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out" />
          <Dialog.Content className="fixed left-1/2 top-[18%] z-50 w-[min(560px,calc(100vw-2rem))] -translate-x-1/2 rounded-saly-lg border border-saly-border bg-saly-bg-card shadow-saly-hover outline-none">
            <div className="flex items-center gap-3 border-b border-saly-border px-4">
              <Command className="h-4 w-4 text-saly-text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, modules, actions…"
                className="h-12 flex-1 bg-transparent text-sm text-saly-text-primary outline-none placeholder:text-saly-text-faint"
              />
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-saly-text-muted">No results</p>
              ) : (
                filtered.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => navigate(item.href)}
                    className="flex w-full items-center justify-between rounded-saly px-3 py-2.5 text-left transition-colors hover:bg-saly-bg-hover"
                  >
                    <span className="text-sm text-saly-text-primary">{item.label}</span>
                    <span className="text-xs text-saly-text-faint">{item.group}</span>
                  </button>
                ))
              )}
            </div>
            <div className="border-t border-saly-border px-4 py-2 text-[11px] text-saly-text-faint">
              Navigate with ↑↓ · Enter to open · Esc to close
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export function CommandPaletteMobileButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-saly border border-saly-border bg-saly-bg-secondary text-saly-text-muted md:hidden"
      aria-label="Search"
    >
      <Search className="h-4 w-4" />
    </button>
  );
}

export function SalyLogoMark() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div className="grid h-7 w-7 place-items-center rounded-saly bg-white text-[11px] font-bold text-black">
        S
      </div>
      <div className="leading-none">
        <p className="text-sm font-semibold tracking-tight text-saly-text-primary">SalyChain</p>
        <p className="text-[10px] text-saly-text-faint">Super Admin</p>
      </div>
    </Link>
  );
}
