'use client';

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';
import { SalyButton, SalyCard, SalySection } from '@/components/saly/ui';
import { cn } from '@/lib/utils';

export const verticalInputClass =
  'h-9 w-full rounded-saly border border-saly-border bg-saly-bg-secondary px-3 text-sm text-saly-text-primary placeholder:text-saly-text-faint focus:border-saly-accent/50 focus:outline-none focus:ring-2 focus:ring-saly-accent/20';

export const verticalLabelClass = 'flex flex-col gap-1.5 text-xs font-medium text-saly-text-muted';

export function VerticalFormSection({
  title,
  description,
  children,
  columns = 2,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
}) {
  const grid =
    columns === 4
      ? 'lg:grid-cols-4'
      : columns === 3
        ? 'md:grid-cols-3'
        : columns === 1
          ? 'grid-cols-1'
          : 'md:grid-cols-2';

  return (
    <SalySection title={title} description={description}>
      <div className={cn('grid grid-cols-1 gap-4', grid)}>{children}</div>
    </SalySection>
  );
}

export function VerticalFormCard({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <SalyCard className="flex flex-col gap-3">
      <p className="text-sm font-medium text-saly-text-primary">{title}</p>
      {children}
      {hint ? <p className="text-[11px] text-saly-text-faint">{hint}</p> : null}
    </SalyCard>
  );
}

export function VerticalFormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className={verticalLabelClass}>
      <span>{label}</span>
      {children}
    </label>
  );
}

export function VerticalInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(verticalInputClass, props.className)} />;
}

export function VerticalSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(verticalInputClass, props.className)} />;
}

export function VerticalSubmitButton({
  label,
  pendingLabel = 'Saving…',
  variant = 'primary',
}: {
  label: string;
  pendingLabel?: string;
  variant?: 'primary' | 'secondary';
}) {
  const { pending } = useFormStatus();
  return (
    <SalyButton type="submit" variant={variant} size="sm" disabled={pending} className="mt-1 w-full">
      {pending ? pendingLabel : label}
    </SalyButton>
  );
}
