import { AuthLayout } from '@/components/AuthLayout';
import { SignupForm } from './SignupForm';

export const dynamic = 'force-dynamic';

export default function SignupPage() {
  return (
    <AuthLayout heading="Create your account" subheading="Spin up a business treasury in minutes.">
      <SignupForm />
    </AuthLayout>
  );
}
