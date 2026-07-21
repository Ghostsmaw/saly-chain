import { AuthLayout } from '@/components/AuthLayout';
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
    <AuthLayout
      heading="Welcome back"
      subheading="Sign in to your business treasury console."
      quote="We moved $40M across rails last quarter with zero manual reconciliation — SalyChain is our treasury OS."
      tagline="Finance team · Series B fintech"
    >
      <LoginForm next={safeNext} />
    </AuthLayout>
  );
}
