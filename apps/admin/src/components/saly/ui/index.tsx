'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function SalyCard({
  className,
  children,
  hover = false,
  padding = true,
}: {
  className?: string;
  children: ReactNode;
  hover?: boolean;
  padding?: boolean;
}) {
  return (
    <div
      className={cn(
        'saly-glass rounded-saly-lg transition-all duration-300 ease-out',
        hover && 'hover:-translate-y-0.5 hover:border-saly-border-strong hover:shadow-saly-hover',
        padding && 'p-5',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SalySection({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('space-y-4', className)}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[15px] font-medium tracking-tight text-saly-text-primary">{title}</h2>
          {description ? <p className="mt-1 text-sm text-saly-text-muted">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function SalyPageHeader({
  title,
  subtitle,
  actions,
  meta,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-col gap-4 border-b border-saly-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1.5">
        {meta}
        <h1 className="text-2xl font-semibold tracking-tight text-saly-text-primary">{title}</h1>
        {subtitle ? <p className="max-w-2xl text-sm text-saly-text-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function SalyStat({
  label,
  value,
  hint,
  mono = true,
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  mono?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      <p className="text-xs font-medium text-saly-text-muted">{label}</p>
      <p className={cn('text-xl font-medium tracking-tight text-saly-text-primary', mono && 'font-mono text-lg')}>
        {value}
      </p>
      {hint ? <div className="text-xs text-saly-text-faint">{hint}</div> : null}
    </div>
  );
}

export function SalyBadge({
  children,
  variant = 'neutral',
  dot = false,
  className,
}: {
  children: ReactNode;
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'accent';
  dot?: boolean;
  className?: string;
}) {
  const styles = {
    neutral: 'bg-white/[0.06] text-saly-text-secondary',
    success: 'bg-emerald-500/10 text-emerald-400',
    warning: 'bg-amber-500/10 text-amber-400',
    danger: 'bg-red-500/10 text-red-400',
    info: 'bg-blue-500/10 text-blue-400',
    accent: 'bg-saly-accent-muted text-violet-300',
  } as const;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium',
        styles[variant],
        className,
      )}
    >
      {dot ? (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            variant === 'success' && 'bg-emerald-400',
            variant === 'warning' && 'bg-amber-400',
            variant === 'danger' && 'bg-red-400',
            variant === 'info' && 'bg-blue-400',
            variant === 'accent' && 'bg-violet-400',
            variant === 'neutral' && 'bg-saly-text-muted',
          )}
        />
      ) : null}
      {children}
    </span>
  );
}

export function SalyButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md';
}) {
  const variants = {
    primary: 'bg-white text-black hover:bg-zinc-200',
    secondary: 'border border-saly-border bg-saly-bg-elevated text-saly-text-primary hover:bg-saly-bg-hover',
    ghost: 'text-saly-text-secondary hover:bg-saly-bg-hover hover:text-saly-text-primary',
    danger: 'bg-red-500/10 text-red-400 hover:bg-red-500/15',
  };
  const sizes = { sm: 'h-8 px-3 text-xs', md: 'h-9 px-4 text-sm' };

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-saly font-medium transition-all duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function SalyInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-9 w-full rounded-saly border border-saly-border bg-saly-bg-secondary px-3 text-sm text-saly-text-primary placeholder:text-saly-text-faint transition-all duration-200 focus:border-saly-accent/50 focus:outline-none focus:ring-2 focus:ring-saly-accent/20',
        className,
      )}
      {...props}
    />
  );
}

export function SalySkeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-saly bg-white/[0.06]', className)} />;
}

export function SalyEmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-saly-lg border border-dashed border-saly-border px-6 py-16 text-center">
      <p className="text-sm font-medium text-saly-text-primary">{title}</p>
      {description ? <p className="mt-2 max-w-sm text-sm text-saly-text-muted">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function SalyDivider({ className }: { className?: string }) {
  return <div className={cn('h-px w-full bg-saly-border', className)} />;
}

export function SalyTabs<T extends string>({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: { key: T; label: string; count?: number }[];
  active: T;
  onChange: (key: T) => void;
  className?: string;
}) {
  return (
    <div className={cn('flex gap-1 overflow-x-auto border-b border-saly-border', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={cn(
            'relative shrink-0 px-3 py-2.5 text-sm font-medium transition-colors',
            active === tab.key ? 'text-saly-text-primary' : 'text-saly-text-muted hover:text-saly-text-secondary',
          )}
        >
          {tab.label}
          {tab.count != null ? (
            <span className="ml-1.5 font-mono text-[11px] text-saly-text-faint">{tab.count}</span>
          ) : null}
          {active === tab.key ? (
            <span className="absolute inset-x-0 bottom-0 h-px bg-white" />
          ) : null}
        </button>
      ))}
    </div>
  );
}

export function SalyCodeBlock({ children, className }: { children: string; className?: string }) {
  return (
    <pre
      className={cn(
        'overflow-x-auto rounded-saly border border-saly-border bg-saly-bg-secondary p-4 font-mono text-xs leading-relaxed text-saly-text-primary',
        className,
      )}
    >
      {children}
    </pre>
  );
}

export function SalyMetricStrip({
  items,
}: {
  items: { label: string; value: ReactNode; hint?: ReactNode }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-saly-lg border border-saly-border bg-saly-border sm:grid-cols-4 lg:grid-cols-6">
      {items.map((item) => (
        <div key={item.label} className="bg-saly-bg-card px-4 py-4">
          <SalyStat label={item.label} value={item.value} hint={item.hint} />
        </div>
      ))}
    </div>
  );
}
