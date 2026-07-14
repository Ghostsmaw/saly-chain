import { AdminClient, ComplianceClient, type OnboardingStatusDto } from '@salychain/sdk-internal';
import { ONBOARDING_FLAG_KEY } from './onboarding-constants';

const ADMIN_URL = process.env.ADMIN_BASE_URL ?? 'http://localhost:4014';
const COMPLIANCE_URL = process.env.COMPLIANCE_BASE_URL ?? 'http://localhost:4004';

let adminClient: AdminClient | null = null;
let complianceClient: ComplianceClient | null = null;

function admin(): AdminClient {
  if (!adminClient) adminClient = new AdminClient({ baseUrl: ADMIN_URL });
  return adminClient;
}

function compliance(): ComplianceClient {
  if (!complianceClient) complianceClient = new ComplianceClient({ baseUrl: COMPLIANCE_URL });
  return complianceClient;
}

export async function isOnboardingEnabledForProfile(profile: 'business' | 'developer'): Promise<boolean> {
  try {
    const active = await admin().getActiveVerificationRequirements(profile);
    if (active.data.length > 0) return true;
    const flag = await admin().getFlagByKey(ONBOARDING_FLAG_KEY);
    return flag.enabled;
  } catch {
    return false;
  }
}

export async function isNewOnboardingFlowEnabled(): Promise<boolean> {
  return isOnboardingEnabledForProfile('developer');
}

export function onboardingProgressPercent(status: OnboardingStatusDto): number {
  if (!status.steps.length) return 0;
  const done = status.steps.filter((s) => s.status === 'done').length;
  return Math.round((done / status.steps.length) * 100);
}

export async function startDeveloperOnboarding(input: {
  userId: string;
  displayName?: string | null;
  email: string;
}): Promise<OnboardingStatusDto | null> {
  const enabled = await isOnboardingEnabledForProfile('developer');
  if (!enabled) return null;
  return compliance().startOnboarding({
    externalRef: input.userId,
    profile: 'developer',
    displayName: input.displayName ?? undefined,
    email: input.email,
  });
}

export async function getDeveloperOnboarding(userId: string): Promise<OnboardingStatusDto> {
  return compliance().getOnboarding(userId);
}

export async function submitDeveloperOnboardingStep(
  userId: string,
  step: string,
  data: Record<string, unknown>,
): Promise<OnboardingStatusDto> {
  return compliance().submitOnboardingStep(userId, { step, data });
}

export async function resubmitDeveloperOnboarding(userId: string): Promise<OnboardingStatusDto> {
  return compliance().resubmitOnboarding(userId);
}

export async function postAuthRedirectPath(
  status: OnboardingStatusDto | null,
): Promise<string> {
  if (!status || status.complete) return '/';
  if (status.status === 'pending_review' || status.status === 'rejected') return '/';
  return '/onboarding';
}

export async function refreshOnboardingGate(userId: string): Promise<boolean> {
  const enabled = await isOnboardingEnabledForProfile('developer');
  if (!enabled) return false;
  const status = await compliance().getOnboarding(userId);
  return Boolean(status.required && !status.complete);
}
