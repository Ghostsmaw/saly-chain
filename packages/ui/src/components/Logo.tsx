import { cn } from '../utils/cn.js';

export interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  subtitle?: string;
  className?: string;
}

export function Logo({ size = 32, showWordmark = true, subtitle, className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="SalyChain logo"
      >
        <defs>
          <linearGradient id="saly-logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A082FF" />
            <stop offset="1" stopColor="#5827CF" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="10" fill="url(#saly-logo-grad)" />
        <path
          d="M13 26c0-3 2.5-4 5.5-4.5 3.5-.6 4.5-1.4 4.5-3 0-1.6-1.4-2.8-3.8-2.8-2.3 0-3.7 1.1-4.1 2.7h-3.4c.5-3.6 3.5-5.7 7.6-5.7 4.4 0 7.3 2.3 7.3 5.7 0 3.3-2.4 4.6-6 5.2-3 .5-4.3 1-4.3 2.6 0 1.5 1.4 2.7 4 2.7 2.6 0 4.1-1.1 4.5-2.9h3.4c-.4 3.6-3.5 5.9-8 5.9-4.5 0-7.7-2.4-7.7-5.9z"
          fill="#fff"
        />
      </svg>
      {showWordmark && (
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-tight text-text-primary">SalyChain</p>
          {subtitle ? <p className="text-[11px] text-text-tertiary">{subtitle}</p> : null}
        </div>
      )}
    </div>
  );
}
