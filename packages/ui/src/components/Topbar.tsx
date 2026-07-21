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
        'sticky top-0 z-40 flex items-center justify-between gap-6 border-b border-white/[0.06] px-8 py-5',
        'bg-[color:rgb(11_8_32_/_0.72)] backdrop-blur-xl backdrop-saturate-150',
        className,
      )}
    >
      <div className="animate-fade-in-up">
        <h1 className="text-xl font-semibold tracking-tight text-text-primary">{title}</h1>
        {subtitle ? <p className="mt-0.5 text-sm text-text-tertiary">{subtitle}</p> : null}
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <label className="group relative hidden w-full max-w-md md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary transition-colors group-focus-within:text-brand-300" />
          <input
            type="search"
            placeholder="Search anything..."
            className={cn(
              'h-9 w-full rounded-lg border border-white/[0.08] bg-white/[0.04] pl-9 pr-14 text-sm backdrop-blur-sm',
              'text-text-primary placeholder:text-text-muted transition-all duration-200',
              'focus:border-brand-500/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-brand-500/25',
            )}
            onChange={(e) => onSearch?.(e.currentTarget.value)}
          />
          <kbd
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-white/[0.08] bg-white/[0.05] px-1.5 py-0.5 text-[10px] font-medium text-text-tertiary',
            )}
          >
            ⌘K
          </kbd>
        </label>

        <button
          type="button"
          onClick={onNotificationClick}
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-text-secondary transition-all duration-200 hover:border-brand-500/30 hover:bg-white/[0.06] hover:text-text-primary active:scale-95"
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
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-text-secondary transition-all duration-200 hover:border-brand-500/30 hover:bg-white/[0.06] hover:text-text-primary active:scale-95"
          aria-label="Help"
        >
          <HelpCircle className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onSettingsClick}
          className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-text-secondary transition-all duration-200 hover:border-brand-500/30 hover:bg-white/[0.06] hover:text-text-primary active:scale-95"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>

        {right}
      </div>
    </header>
  );
}
