'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { matchSalyNavKey, salyNavGroups } from '@/lib/saly-navigation';

export function SalySidebar() {
  const pathname = usePathname();
  const activeKey = matchSalyNavKey(pathname);

  return (
    <aside className="flex h-full w-[var(--saly-sidebar-width)] shrink-0 flex-col border-r border-saly-border bg-saly-bg-secondary/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="flex h-[var(--saly-topbar-height)] items-center border-b border-saly-border px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="grid h-7 w-7 place-items-center rounded-saly bg-white text-[11px] font-bold text-black">
            S
          </div>
          <div className="leading-none">
            <p className="text-sm font-semibold tracking-tight">SalyChain</p>
            <p className="text-[10px] text-saly-text-faint">Infrastructure</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {salyNavGroups.map((group) => (
          <div key={group.label} className="mb-6 last:mb-0">
            <p className="mb-2 px-2 text-[10px] font-medium uppercase tracking-wider text-saly-text-faint">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = item.key === activeKey;
                const Icon = item.icon;
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className={cn(
                        'relative flex items-center gap-2.5 rounded-saly px-2.5 py-2 text-[13px] transition-all duration-200',
                        active
                          ? 'bg-white/[0.06] font-medium text-saly-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
                          : 'text-saly-text-muted hover:bg-saly-bg-hover hover:pl-3 hover:text-saly-text-secondary',
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-saly-accent transition-all duration-300',
                          active ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0',
                        )}
                      />
                      <Icon className={cn('h-4 w-4 shrink-0 transition-colors duration-200', active ? 'text-saly-accent' : 'text-saly-text-faint')} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-saly-border p-3">
        <div className="saly-glass rounded-saly px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs text-saly-text-secondary">All systems operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
