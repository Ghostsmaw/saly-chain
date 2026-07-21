'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, LogOut } from 'lucide-react';
import { CommandPalette } from './CommandPalette';
import { SalySidebar } from './SalySidebar';
import { logoutAction } from '@/lib/auth-actions';

export function SalyShell({
  title,
  subtitle,
  topRight,
  children,
}: {
  title: string;
  subtitle?: string;
  topRight?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative flex h-screen overflow-hidden bg-saly-bg-primary">
      {/* Ambient accent glow drifting behind the content. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-[10%] top-[-20%] h-[420px] w-[420px] animate-float-slow rounded-full bg-saly-accent/[0.05] blur-[100px]" />
      </div>

      <div className="relative z-10 hidden lg:flex">
        <SalySidebar />
      </div>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <header className="flex h-[var(--saly-topbar-height)] shrink-0 items-center justify-between gap-4 border-b border-saly-border bg-saly-bg-primary/70 px-4 backdrop-blur-xl backdrop-saturate-150 lg:px-6">
          <div className="min-w-0 animate-fade-in-up">
            <h1 className="truncate text-sm font-medium tracking-tight text-saly-text-primary">{title}</h1>
            {subtitle ? <p className="truncate text-xs text-saly-text-muted">{subtitle}</p> : null}
          </div>
          <div className="flex items-center gap-3">
            <CommandPalette />
            {topRight}
            <UserMenu />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="saly-stagger mx-auto max-w-[1400px] px-4 py-6 lg:px-8 lg:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

function UserMenu() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; displayName: string | null } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    let active = true;
    fetch('/api/me')
      .then((r) => r.json())
      .then((d) => {
        if (active && d?.user) setUser({ email: d.user.email, displayName: d.user.displayName });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const name = user?.displayName || 'Admin';
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-saly border border-saly-border bg-saly-bg-secondary px-2 py-1.5 transition-colors hover:bg-saly-bg-hover"
      >
        <div className="grid h-7 w-7 place-items-center rounded-saly bg-white text-[10px] font-semibold text-black">
          {initials}
        </div>
        <ChevronDown className="hidden h-4 w-4 text-saly-text-muted sm:block" />
      </button>

      {open ? (
        <div className="saly-glass absolute right-0 top-11 z-50 w-56 animate-scale-in overflow-hidden rounded-saly-lg shadow-saly-hover">
          <div className="border-b border-saly-border px-4 py-3">
            <p className="text-sm font-medium text-saly-text-primary">{name}</p>
            <p className="truncate text-xs text-saly-text-muted">{user?.email ?? '—'}</p>
          </div>
          <button
            type="button"
            onClick={() => router.push('/settings')}
            className="flex w-full px-4 py-2.5 text-left text-sm text-saly-text-secondary hover:bg-saly-bg-hover"
          >
            Settings
          </button>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-400 hover:bg-saly-bg-hover"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

/** Drop-in replacement for legacy AdminShell */
export { SalyShell as AdminShellCompat };
