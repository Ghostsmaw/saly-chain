/** HttpOnly cookie set when progressive KYC onboarding is incomplete. */
export const ONBOARDING_COOKIE = 'saly_portal_onboarding';

export const ONBOARDING_PENDING = 'pending';
export const ONBOARDING_REVIEW = 'review';
export const ONBOARDING_REJECTED = 'rejected';
export const ONBOARDING_SKIPPED = 'skipped';

/** Cookie value: onboarding done or not required — no path limits. */
export const ONBOARDING_COMPLETE = 'complete';

export const ONBOARDING_FLAG_KEY = 'new_onboarding_flow';

export const ONBOARDING_LIMITED_PATHS = ['/', '/settings', '/onboarding'] as const;
export const ONBOARDING_REVIEW_PATHS = ['/', '/settings'] as const;
