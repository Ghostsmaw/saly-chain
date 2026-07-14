import { cn } from '../utils/cn.js';

export type StatusTone = 'operational' | 'degraded' | 'down' | 'pending';

const toneClasses: Record<StatusTone, string> = {
  operational: 'bg-success-500 shadow-[0_0_0_4px_rgba(22,199,132,0.18)]',
  degraded: 'bg-warning-500 shadow-[0_0_0_4px_rgba(240,169,43,0.18)]',
  down: 'bg-danger-500 shadow-[0_0_0_4px_rgba(240,68,79,0.18)]',
  pending: 'bg-info-500 shadow-[0_0_0_4px_rgba(59,125,250,0.18)]',
};

export function StatusDot({ tone = 'operational', className }: { tone?: StatusTone; className?: string }) {
  return <span className={cn('inline-block h-2 w-2 rounded-full', toneClasses[tone], className)} />;
}
