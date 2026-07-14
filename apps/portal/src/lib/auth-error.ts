/**
 * Maps identity-service errors (thrown as SalyChainError by the SDK) to friendly,
 * surface-specific messages without importing the backend error package.
 */
export function describeAuthError(err: unknown, surface: 'admin' | 'business' | 'developer'): string {
  const code = readString(err, 'code');
  const message = readString(err, 'message');

  switch (code) {
    case 'identity.auth.invalid_credentials':
      return 'Invalid email or password.';
    case 'identity.auth.role_mismatch':
      return surface === 'admin'
        ? 'This account does not have Super Admin access.'
        : `This account is not registered as a ${surface} account.`;
    case 'identity.user.exists':
      return 'An account with that email already exists. Try signing in instead.';
    case 'identity.auth.weak_password':
      return 'Password must be at least 8 characters.';
    case 'identity.user.inactive':
      return 'This account has been suspended. Contact support.';
    default:
      break;
  }

  // Network / service-down: SDK uses `<service>.unreachable` or a TypeError.
  if (code?.endsWith('.unreachable') || (!code && !message)) {
    return 'Identity service is unreachable. Is the local stack running (pnpm dev)?';
  }
  return message || 'Something went wrong. Please try again.';
}

function readString(err: unknown, key: 'code' | 'message'): string | undefined {
  if (err && typeof err === 'object' && key in err) {
    const value = (err as Record<string, unknown>)[key];
    if (typeof value === 'string') return value;
  }
  return undefined;
}
