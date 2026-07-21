import { type ReactNode } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card } from './Card.js';
import { Sparkline } from './Sparkline.js';
import { cn } from '../utils/cn.js';

export interface StatCardProps {
  label: string;
  value: ReactNode;
  /** Percentage change vs the previous period (e.g. 12.5 = +12.5%). */
  changePct?: number;
  changeLabel?: string;
  icon?: ReactNode;
  iconTone?: 'brand' | 'cyan' | 'success' | 'warning' | 'danger';
  spark?: readonly number[];
  sparkColor?: string;
  className?: string;
}

const iconToneClasses: Record<NonNullable<StatCardProps['iconTone']>, string> = {
  brand: 'bg-brand-500/15 text-brand-300',
  cyan: 'bg-accent-500/15 text-accent-300',
  success: 'bg-success-500/15 text-success-300',
  warning: 'bg-warning-500/15 text-warning-300',
  danger: 'bg-danger-500/15 text-danger-300',
};

export function StatCard({
  label,
  value,
  changePct,
  changeLabel = 'vs yesterday',
  icon,
  iconTone = 'brand',
  spark,
  sparkColor,
  className,
}: StatCardProps) {
  const isUp = changePct !== undefined && changePct >= 0;

  return (
    <Card className={cn('saly-card-hover relative overflow-hidden', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-tertiary">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">{value}</p>
          {changePct !== undefined && (
            <p
              className={cn(
                'mt-2 flex items-center gap-1 text-xs font-medium',
                isUp ? 'text-success-300' : 'text-danger-300',
              )}
            >
              {isUp ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}
              {isUp ? '+' : ''}
              {changePct.toFixed(1)}%{' '}
              <span className="font-normal text-text-muted">{changeLabel}</span>
            </p>
          )}
        </div>
        {icon ? (
          <div className={cn('grid h-9 w-9 place-items-center rounded-lg', iconToneClasses[iconTone])}>
            {icon}
          </div>
        ) : null}
      </div>
      {spark ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <Sparkline data={spark} width={320} height={56} stroke={sparkColor ?? '#8159FF'} />
        </div>
      ) : null}
    </Card>
  );
}
