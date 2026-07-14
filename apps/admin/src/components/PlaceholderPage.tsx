import { Card, CardHeader } from '@salychain/ui';
import { AdminShell } from './AdminShell';

export function PlaceholderPage({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle?: string;
  description: string;
}) {
  return (
    <AdminShell title={title} subtitle={subtitle}>
      <Card>
        <CardHeader title={`${title} — coming soon`} />
        <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
        <p className="mt-2 text-xs text-text-tertiary">
          This surface is wired into the navigation and design system. Live data lands as the underlying
          service ships (see <code className="rounded bg-surface-cardHover px-1.5 py-0.5">docs/ARCHITECTURE.md</code>).
        </p>
      </Card>
    </AdminShell>
  );
}
