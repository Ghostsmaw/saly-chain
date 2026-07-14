import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { VERTICAL_MODULES } from '@/lib/saly-verticals';
import { SalyBadge, SalyCard } from '@/components/saly/ui';

export function VerticalHubGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {VERTICAL_MODULES.map((v) => (
        <Link key={v.href} href={v.href} className="group block">
          <SalyCard hover className="h-full">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex items-center gap-2">
                  <SalyBadge variant="accent">{v.milestone}</SalyBadge>
                  <span className="text-xs text-saly-text-faint group-hover:text-saly-text-muted">
                    Open module
                  </span>
                </div>
                <p className="text-sm font-medium text-saly-text-primary group-hover:text-violet-300">
                  {v.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-saly-text-muted">{v.description}</p>
              </div>
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-saly border border-saly-border bg-saly-bg-secondary text-saly-text-secondary transition group-hover:border-saly-border-strong group-hover:text-saly-text-primary">
                <v.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-saly-text-faint group-hover:text-saly-text-secondary">
              Explore
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </SalyCard>
        </Link>
      ))}
    </div>
  );
}
