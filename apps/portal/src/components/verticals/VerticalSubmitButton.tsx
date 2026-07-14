'use client';

import { useFormStatus } from 'react-dom';
import { verticalSubmitClass } from './form-styles';

export function VerticalSubmitButton({ label, pendingLabel = 'Saving…' }: { label: string; pendingLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={verticalSubmitClass}>
      {pending ? pendingLabel : label}
    </button>
  );
}
