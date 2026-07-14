import { AuthLayout } from '@/components/AuthLayout';
import { LoginForm } from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const safeNext = next && next.startsWith('/') ? next : '/';

  return (
    <AuthLayout
      heading="Welcome back"
      subheading="Sign in to your developer portal."
      quote="Our first production payout went live in under an hour — the SDK and webhook story just works."
      tagline="Platform engineer · YC-backed startup"
    >
      <LoginForm next={safeNext} />
    </AuthLayout>
  );
}
