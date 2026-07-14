import type { ReactNode } from 'react';
import { SalyCard } from '@/components/saly/ui';

export function SettingsPanel({
  title,
  subtitle,
  right,
  children,
  className,
  padding = true,
}: {
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  padding?: boolean;
}) {
  return (
    <SalyCard className={className} padding={padding}>
      {title || subtitle || right ? (
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            {title ? <h3 className="text-[15px] font-medium text-saly-text-primary">{title}</h3> : null}
            {subtitle ? <p className="mt-1 text-sm text-saly-text-muted">{subtitle}</p> : null}
          </div>
          {right}
        </div>
      ) : null}
      {children}
    </SalyCard>
  );
}

export const settingsInputClass =
  'h-9 w-full rounded-saly border border-saly-border bg-saly-bg-secondary px-3 text-sm text-saly-text-primary placeholder:text-saly-text-faint focus:border-saly-accent/50 focus:outline-none focus:ring-2 focus:ring-saly-accent/20';

export const settingsSearchClass =
  'h-8 w-40 rounded-saly border border-saly-border bg-saly-bg-secondary py-1.5 pl-8 pr-2 text-xs text-saly-text-primary placeholder:text-saly-text-faint focus:border-saly-accent/50 focus:outline-none focus:ring-2 focus:ring-saly-accent/20';

export const settingsRowClass =
  'flex items-center justify-between gap-4 rounded-saly border border-saly-border bg-saly-bg-secondary/60 p-3 transition hover:bg-saly-bg-hover';

export const settingsGhostBtnClass =
  'inline-flex items-center gap-1.5 rounded-saly border border-saly-border px-3 py-1.5 text-xs font-medium text-saly-text-secondary transition hover:bg-saly-bg-hover hover:text-saly-text-primary active:scale-[0.98]';

export const settingsPrimaryBtnClass =
  'inline-flex items-center gap-1.5 rounded-saly bg-white px-3 py-1.5 text-xs font-medium text-black transition hover:bg-zinc-200 active:scale-[0.98]';
