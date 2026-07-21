/** HttpOnly cookie set when progressive KYB onboarding is incomplete. */
export const ONBOARDING_COOKIE = 'saly_business_onboarding';

/** Cookie value: user must complete onboarding before dashboard access. */
export const ONBOARDING_PENDING = 'pending';

/** Cookie value: KYC/KYB submitted — awaiting admin approval. */
export const ONBOARDING_REVIEW = 'review';

/** Cookie value: admin rejected verification — must update and resubmit. */
export const ONBOARDING_REJECTED = 'rejected';

/** Cookie value: user skipped onboarding — profile-only dashboard access. */
export const ONBOARDING_SKIPPED = 'skipped';

/** Cookie value: onboarding done or not required — no path limits. */
export const ONBOARDING_COMPLETE = 'complete';

export const ONBOARDING_FLAG_KEY = 'new_onboarding_flow';

/** Routes allowed while verification is pending or skipped (profile-only mode). */
export const ONBOARDING_LIMITED_PATHS = ['/', '/settings', '/onboarding'] as const;

/** Dashboard + settings only — used while awaiting admin approval. */
export const ONBOARDING_REVIEW_PATHS = ['/', '/settings'] as const;
