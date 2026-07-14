import { type ReactNode } from 'react';
import { cn } from '../utils/cn.js';

export type ChipTone = 'success' | 'warning' | 'danger' | 'info' | 'brand' | 'neutral';

const toneClass: Record<ChipTone, string> = {
  success: 'saly-chip-success',
  warning: 'saly-chip-warning',
  danger: 'saly-chip-danger',
  info: 'saly-chip-info',
  brand: 'saly-chip-brand',
  neutral: 'saly-chip bg-surface-border text-text-secondary',
};

export interface ChipProps {
  tone?: ChipTone;
  className?: string;
  children: ReactNode;
}

export function Chip({ tone = 'neutral', className, children }: ChipProps) {
  return <span className={cn(toneClass[tone], className)}>{children}</span>;
}
