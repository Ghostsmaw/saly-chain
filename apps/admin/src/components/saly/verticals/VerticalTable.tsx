import type { ReactNode } from 'react';
import { SalyBadge, SalyCard, SalyEmptyState, SalySection } from '@/components/saly/ui';

export function VerticalTableSection({
  title,
  description,
  source,
  rowCount,
  offlineTitle = 'Service unavailable',
  offlineDescription,
  emptyTitle = 'No records yet',
  emptyDescription,
  action,
  children,
}: {
  title: string;
  description?: string;
  source: 'live' | 'unavailable';
  rowCount: number;
  offlineTitle?: string;
  offlineDescription: string;
  emptyTitle?: string;
  emptyDescription: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <SalySection
      title={title}
      description={description}
      action={
        action ??
        (source === 'live' ? (
          <SalyBadge variant="neutral">{`${rowCount} rows`}</SalyBadge>
        ) : (
          <SalyBadge variant="warning" dot>
            Offline
          </SalyBadge>
        ))
      }
    >
      <SalyCard padding={false} className="overflow-hidden">
        {source !== 'live' ? (
          <div className="p-6">
            <SalyEmptyState title={offlineTitle} description={offlineDescription} />
          </div>
        ) : rowCount === 0 ? (
          <div className="p-6">
            <SalyEmptyState title={emptyTitle} description={emptyDescription} />
          </div>
        ) : (
          <div className="overflow-x-auto">{children}</div>
        )}
      </SalyCard>
    </SalySection>
  );
}

export function VerticalTable({ children }: { children: ReactNode }) {
  return <table className="w-full text-left text-sm">{children}</table>;
}

export function VerticalTableHeadRow({ children }: { children: ReactNode }) {
  return (
    <thead>
      <tr className="border-b border-saly-border bg-saly-bg-secondary/80 text-xs text-saly-text-muted">
        {children}
      </tr>
    </thead>
  );
}

export function VerticalTableHeadCell({ children }: { children: ReactNode }) {
  return <th className="px-4 py-2.5 font-medium">{children}</th>;
}

export function VerticalTableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function VerticalTableRow({ children }: { children: ReactNode }) {
  return (
    <tr className="border-b border-saly-border/60 transition hover:bg-saly-bg-hover">{children}</tr>
  );
}

export function VerticalTableCell({
  children,
  mono,
  align,
  className,
}: {
  children: ReactNode;
  mono?: boolean;
  align?: 'right';
  className?: string;
}) {
  return (
    <td
      className={[
        'px-4 py-3',
        mono ? 'font-mono text-[11px] text-saly-text-muted' : '',
        align === 'right' ? 'text-right' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </td>
  );
}
