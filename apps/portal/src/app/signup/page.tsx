import { AuthLayout } from '@/components/AuthLayout';
import { SignupForm } from './SignupForm';

export const dynamic = 'force-dynamic';

export default function SignupPage() {
  return (
    <AuthLayout heading="Create your account" subheading="Start building on SalyChain for free.">
      <SignupForm />
    </AuthLayout>
  );
}
