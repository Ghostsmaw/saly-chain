import { Building2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export function AuthLayout({
  heading,
  subheading,
  children,
  icon: Icon = Building2,
  quote,
  tagline,
}: {
  heading: string;
  subheading: string;
  children: ReactNode;
  icon?: LucideIcon;
  quote?: string;
  tagline?: string;
}) {
  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="max-w-md w-full space-y-6">
            <div className="flex justify-center lg:justify-start">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#37003b]/20 bg-[#37003b]/[0.06] shadow-sm transition-all duration-200 ease-in-out">
                <Icon className="h-5 w-5 text-[#37003b]" aria-hidden />
              </div>
            </div>

            <div className="space-y-1.5 text-center lg:text-left">
              <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{subheading}</p>
            </div>

            {children}

            <p className="text-center text-xs text-zinc-400 dark:text-zinc-500 lg:text-left">
              Protected by SalyChain · Encrypted in transit
            </p>
          </div>
        </section>

        <VisualPanel quote={quote} tagline={tagline} />
      </div>
    </main>
  );
}

function VisualPanel({ quote, tagline }: { quote?: string; tagline?: string }) {
  return (
    <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#37003b] to-black lg:flex lg:flex-col lg:items-center lg:justify-center">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#37003b]/40 blur-[100px] animate-pulse" />
        <div className="absolute -right-16 bottom-1/4 h-80 w-80 rounded-full bg-[#5a0060]/25 blur-[120px] animate-pulse [animation-delay:1s]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>
      <div className="relative z-10 max-w-md px-12 text-center">
        <p className="font-medium tracking-tight text-white text-lg leading-relaxed">
          {quote ?? 'Treasury and payments infrastructure that scales with your business — without the operational overhead.'}
        </p>
        <p className="mt-6 text-sm text-white/50">{tagline ?? 'SalyChain · Business Console'}</p>
      </div>
    </section>
  );
}
