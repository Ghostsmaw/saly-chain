import { type ReactNode } from 'react';
import { Inbox } from 'lucide-react';

export function EmptyState({
  title,
  message,
  action,
}: {
  title?: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid place-items-center rounded-xl border border-dashed border-surface-border bg-surface-cardHover/30 p-16 text-center">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-brand-500/10 text-brand-300">
        <Inbox className="h-6 w-6" />
      </div>
      {title ? <p className="text-base font-medium text-text-primary">{title}</p> : null}
      <p className="mt-1 max-w-sm text-sm text-text-tertiary">{message}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
