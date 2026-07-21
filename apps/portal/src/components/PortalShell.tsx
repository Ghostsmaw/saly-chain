'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, LogOut } from 'lucide-react';
import { Logo, Sidebar, StatusDot, Topbar, type SidebarItem } from '@salychain/ui';
import { navItems } from '@/lib/navigation';
import { logoutAction } from '@/lib/auth-actions';
import {
  OnboardingBanner,
  VerificationRejectedBanner,
  VerificationRejectedDashboard,
  VerificationReviewBanner,
  VerificationReviewDashboard,
  type OnboardingGateMode,
} from '@/components/OnboardingBanner';

interface OnboardingGate {
  limited: boolean;
  mode: OnboardingGateMode;
  progress: number;
  label: string;
  submittedAt?: string | null;
}

export function PortalShell({
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
  const pathname = usePathname();
  const [gate, setGate] = useState<OnboardingGate | null>(null);
  const activeKey = matchActive(navItems, pathname);

  useEffect(() => {
    let active = true;
    fetch('/api/onboarding/status')
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        if (d.limited && d.mode) {
          setGate({
            limited: true,
            mode: d.mode,
            progress: d.progress ?? 0,
            label: d.label ?? 'KYC',
            submittedAt: d.submitted_at ?? null,
          });
        } else {
          setGate(null);
        }
      })
      .catch(() => setGate(null));
    return () => {
      active = false;
    };
  }, [pathname]);

  const disabledKeys = gate?.limited
    ? new Set(navItems.filter((item) => item.href !== '/settings' && item.href !== '/').map((item) => item.key))
    : null;

  const lockTitle =
    gate?.mode === 'review'
      ? 'Available after admin approval'
      : gate?.mode === 'rejected'
        ? 'Verification required'
        : 'Complete KYC to unlock';

  function renderBanner() {
    if (!gate?.limited) return null;
    if (gate.mode === 'review') {
      return <VerificationReviewBanner label={gate.label} submittedAt={gate.submittedAt} />;
    }
    if (gate.mode === 'rejected') {
      return <VerificationRejectedBanner label={gate.label} />;
    }
    return <OnboardingBanner progress={gate.progress} label={gate.label} />;
  }

  function renderMain() {
    if (!gate?.limited) return children;
    if (pathname === '/settings') return children;
    if (pathname === '/') {
      if (gate.mode === 'review') {
        return <VerificationReviewDashboard label={gate.label} submittedAt={gate.submittedAt} />;
      }
      if (gate.mode === 'rejected') {
        return <VerificationRejectedDashboard label={gate.label} />;
      }
      return (
        <div className="saly-glass mx-auto max-w-lg rounded-2xl p-8 text-center">
          <h2 className="text-lg font-semibold text-text-primary">Profile-only access</h2>
          <p className="mt-2 text-sm text-text-secondary">Complete developer verification to unlock API keys and integrations.</p>
          <Link
            href="/onboarding"
            className="mt-4 inline-block rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium text-white shadow-glow transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            Continue KYC
          </Link>
        </div>
      );
    }
    return (
      <div className="saly-glass grid place-items-center rounded-2xl border-dashed p-16 text-center">
        <p className="max-w-md text-sm text-text-secondary">
          This area is locked until your verification is approved.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen">
      {/* Ambient drifting gradient orbs — depth behind the glass surfaces. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="saly-orb left-[-8%] top-[-12%] h-[430px] w-[430px] animate-float-slow bg-brand-500/15" />
        <div className="saly-orb right-[-6%] top-[35%] h-[360px] w-[360px] animate-float-slower bg-accent-500/10" />
      </div>
      <Sidebar
        brand={<Logo subtitle="Developer Portal" />}
        items={navItems}
        activeKey={activeKey}
        footer={<SidebarFooter />}
        renderLink={(item, children, className) => {
          if (disabledKeys?.has(item.key)) {
            return (
              <span className={`${className} cursor-not-allowed opacity-40`} title={lockTitle}>
                {children}
              </span>
            );
          }
          return (
            <Link href={item.href} className={className}>
              {children}
            </Link>
          );
        }}
      />
      <main className="relative z-10 flex min-h-screen flex-1 flex-col">
        <Topbar title={title} subtitle={subtitle} right={topRight ?? <OrgChip />} />
        <div className="saly-stagger flex-1 p-8">
          {renderBanner()}
          {renderMain()}
        </div>
      </main>
    </div>
  );
}

function matchActive(items: readonly SidebarItem[], pathname: string | null): string {
  if (!pathname) return 'dashboard';
  const exact = items.find((i) => i.href === pathname);
  if (exact) return exact.key;
  const prefix = items
    .filter((i) => i.href !== '/' && pathname.startsWith(i.href))
    .sort((a, b) => b.href.length - a.href.length)[0];
  return prefix?.key ?? 'dashboard';
}

function SidebarFooter() {
  return (
    <div className="saly-glass flex items-center gap-2 rounded-lg p-3">
      <StatusDot tone="operational" />
      <div className="leading-tight">
        <p className="text-xs font-medium text-text-primary">API Status</p>
        <p className="text-[11px] text-text-tertiary">All systems operational</p>
        <a className="text-[11px] text-brand-300 hover:text-brand-200" href="https://status.saly.network">status.saly.network</a>
      </div>
    </div>
  );
}

function OrgChip() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; displayName: string | null } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

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

  const name = user?.displayName || 'Developer';
  const email = user?.email ?? 'developer';
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
        className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 backdrop-blur-sm transition-all duration-200 hover:border-brand-500/30 hover:bg-white/[0.07]"
      >
        <div className="grid h-7 w-7 place-items-center rounded-full bg-brand-gradient text-xs font-semibold text-white">
          {initials}
        </div>
        <div className="hidden text-right leading-tight md:block">
          <p className="text-sm font-medium text-text-primary">{name}</p>
          <p className="text-[11px] text-text-tertiary">{email}</p>
        </div>
        <ChevronDown className="h-4 w-4 text-text-muted" />
      </button>

      {open && (
        <div className="saly-glass absolute right-0 top-12 z-50 w-56 animate-scale-in overflow-hidden rounded-2xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.8)]">
          <div className="border-b border-white/[0.06] px-4 py-3">
            <p className="text-sm font-medium text-text-primary">{name}</p>
            <p className="truncate text-[11px] text-text-tertiary">{email}</p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-rose-300 transition hover:bg-surface-cardHover/50"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
