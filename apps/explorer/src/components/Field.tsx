import type { ReactNode } from 'react';

export function Field({ label, children, mono }: { label: string; children: ReactNode; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-1 border-b border-surface-border/50 py-2.5 sm:flex-row sm:items-center sm:gap-4">
      <span className="w-44 shrink-0 text-xs uppercase tracking-wide text-text-muted">{label}</span>
      <span className={mono ? 'break-all font-mono text-sm text-text-primary' : 'text-sm text-text-primary'}>
        {children}
      </span>
    </div>
  );
}
