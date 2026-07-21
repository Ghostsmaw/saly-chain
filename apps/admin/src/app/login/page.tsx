import { Layers3 } from 'lucide-react';
import { safeInternalPath } from '@/lib/session';
import { LoginForm } from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const safeNext = safeInternalPath(next);

  return (
    <main className="min-h-screen bg-saly-bg-primary text-saly-text-primary">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-8">
            <div className="flex justify-center lg:justify-start">
              <div className="flex h-11 w-11 items-center justify-center rounded-saly border border-saly-border bg-saly-bg-card">
                <Layers3 className="h-5 w-5 text-saly-text-primary" aria-hidden />
              </div>
            </div>

            <div className="space-y-1.5 text-center lg:text-left">
              <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
              <p className="text-sm text-saly-text-muted">
                Super Admin credentials for the SalyChain operations console.
              </p>
            </div>

            <LoginForm next={safeNext} />

            <p className="text-center text-xs text-saly-text-faint lg:text-left">
              Authorized personnel only · SalyChain Infrastructure
            </p>
          </div>
        </section>

        <VisualPanel />
      </div>
    </main>
  );
}

function VisualPanel() {
  return (
    <section className="relative hidden overflow-hidden border-l border-saly-border bg-saly-bg-secondary lg:flex lg:flex-col lg:items-center lg:justify-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="relative z-10 max-w-md px-12">
        <p className="text-lg font-medium leading-relaxed tracking-tight text-saly-text-primary">
          Intelligent infrastructure for cross-border settlement, custody, and chain operations.
        </p>
        <p className="mt-6 text-sm text-saly-text-muted">SalyChain · Enterprise command center</p>
      </div>
    </section>
  );
}
