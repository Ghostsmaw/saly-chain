'use client';

import { CopyButton } from './CopyButton';

export function SecretRevealPanel({
  title,
  secret,
  hint,
  onDismiss,
}: {
  title: string;
  secret: string;
  hint?: string;
  onDismiss: () => void;
}) {
  return (
    <div className="mb-4 rounded-lg border border-warning-500/40 bg-warning-500/10 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-warning-100">{title}</p>
          {hint && <p className="mt-1 text-xs text-warning-200/80">{hint}</p>}
          <code className="mt-3 block break-all rounded-md border border-surface-border bg-surface-card/80 p-3 font-mono text-xs text-text-primary">
            {secret}
          </code>
        </div>
        <button
          type="button"
          className="text-xs text-text-tertiary hover:text-text-primary"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
      <div className="mt-3">
        <CopyButton value={secret} label="Copy secret" />
      </div>
    </div>
  );
}
