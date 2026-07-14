import { redirect } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { getSession } from '@/lib/auth';
import {
  getBusinessOnboarding,
  isOnboardingEnabledForProfile,
  startBusinessOnboarding,
} from '@/lib/onboarding';
import { OnboardingWizard } from './OnboardingWizard';

export const dynamic = 'force-dynamic';

export default async function BusinessOnboardingPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const enabled = await isOnboardingEnabledForProfile('business');
  if (!enabled) redirect('/');

  let status = await getBusinessOnboarding(session.userId);
  if (status.status === 'not_started') {
    const started = await startBusinessOnboarding({
      userId: session.userId,
      displayName: session.displayName,
      email: session.email,
    });
    if (started) status = started;
  }

  if (status.complete) redirect('/');

  if (status.status === 'pending_review') redirect('/');

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 px-4 py-10">
      <div className="rounded-2xl border border-surface-border bg-surface-card/60 p-6 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-gradient text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">Business verification (KYB)</h1>
            <p className="text-sm text-text-secondary">
              Progressive onboarding with document OCR — required before full platform access.
            </p>
          </div>
        </div>
        <OnboardingWizard initial={status} profile="business" />
      </div>
    </div>
  );
}
