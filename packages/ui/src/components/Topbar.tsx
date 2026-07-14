import { Bell, HelpCircle, Search, Settings } from 'lucide-react';
import { type ReactNode } from 'react';
import { cn } from '../utils/cn.js';

export interface TopbarProps {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  onSearch?: (q: string) => void;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
  notificationCount?: number;
  className?: string;
}

export function Topbar({
  title,
  subtitle,
  right,
  onSearch,
  onNotificationClick,
  onSettingsClick,
  onHelpClick,
  notificationCount = 0,
  className,
}: TopbarProps) {
  return (
    <header
      className={cn(
        'flex items-center justify-between gap-6 border-b border-surface-border px-8 py-5',
        className,
      )}
    >
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-text-primary">{title}</h1>
        {subtitle ? <p className="mt-0.5 text-sm text-text-tertiary">{subtitle}</p> : null}
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <label className="relative hidden w-full max-w-md md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
          <input
            type="search"
            placeholder="Search anything..."
            className={cn(
              'h-9 w-full rounded-lg border border-surface-border bg-surface-card/60 pl-9 pr-14 text-sm',
              'text-text-primary placeholder:text-text-muted focus:border-brand-500/60 focus:outline-none focus:ring-2 focus:ring-brand-500/30',
            )}
            onChange={(e) => onSearch?.(e.currentTarget.value)}
          />
          <kbd
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-surface-border bg-surface-card px-1.5 py-0.5 text-[10px] font-medium text-text-tertiary',
            )}
          >
            ⌘K
          </kbd>
        </label>

        <button
          type="button"
          onClick={onNotificationClick}
          className="grid h-9 w-9 place-items-center rounded-lg border border-surface-border text-text-secondary transition hover:bg-surface-cardHover hover:text-text-primary active:scale-95"
          aria-label="Notifications"
        >
          <span className="relative">
            <Bell className="h-4 w-4" />
            {notificationCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-danger-500 text-[9px] font-semibold text-white">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </span>
        </button>

        <button
          type="button"
          onClick={onHelpClick}
          className="grid h-9 w-9 place-items-center rounded-lg border border-surface-border text-text-secondary transition hover:bg-surface-cardHover hover:text-text-primary active:scale-95"
          aria-label="Help"
        >
          <HelpCircle className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onSettingsClick}
          className="grid h-9 w-9 place-items-center rounded-lg border border-surface-border text-text-secondary transition hover:bg-surface-cardHover hover:text-text-primary active:scale-95"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>

        {right}
      </div>
    </header>
  );
}
