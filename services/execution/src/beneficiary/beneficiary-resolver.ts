import { NotFoundError, ValidationError } from '@salychain/errors';
import type { Intent } from '@salychain/intent-schema';
import type { IdentityClient, LedgerClient } from '@salychain/sdk-internal';

export function userDefaultAccountCode(userId: string, currency: string): string {
  return `liability.user.${userId}.${currency.toUpperCase()}`;
}

/**
 * Resolve PHONE / EMAIL / HANDLE beneficiaries to INTERNAL_ACCOUNT refs
 * via identity lookup + default per-currency ledger account.
 */
export async function resolveBeneficiaryAccounts(
  intent: Intent,
  deps: { identity: IdentityClient; ledger: LedgerClient },
): Promise<Intent> {
  const ben = intent.destination.beneficiary;
  if (ben.kind !== 'PHONE' && ben.kind !== 'EMAIL' && ben.kind !== 'HANDLE') {
    return intent;
  }

  const resolved = await deps.identity.resolveBeneficiary({
    kind: ben.kind,
    value: ben.value,
  });

  const code = userDefaultAccountCode(resolved.user_id, intent.destination.currency);
  let accountId: string;
  try {
    const account = await deps.ledger.getAccountByCode(code);
    accountId = account.id;
  } catch {
    throw NotFoundError(
      'execution.beneficiary.account_not_found',
      `No ledger account ${code} for resolved user ${resolved.user_id}`,
    );
  }

  return {
    ...intent,
    destination: {
      ...intent.destination,
      beneficiary: {
        kind: 'INTERNAL_ACCOUNT',
        account_ref: accountId,
      },
    },
  };
}

export function assertResolvableBeneficiary(intent: Intent): void {
  const ben = intent.destination.beneficiary;
  if (ben.kind === 'PHONE' || ben.kind === 'EMAIL' || ben.kind === 'HANDLE') {
    if (!ben.value?.trim()) {
      throw ValidationError('execution.beneficiary.empty', `${ben.kind} beneficiary value is required`);
    }
  }
}
