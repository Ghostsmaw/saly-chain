import { Injectable } from '@nestjs/common';
import { AuthorizationError } from '@salychain/errors';

/**
 * Policy enforcement for signing requests.
 *
 * Each signing request carries a `PolicyContext` (destination chain + address,
 * amount, asset). The policy engine evaluates a per-key policy against this
 * context **before** the private key is unwrapped. If the policy denies, the
 * private key is never touched.
 *
 * Policy storage will move to a dedicated `signer_policies` table in S2; for
 * S1 we accept the policy inline in the signing request, validated against
 * a strict schema. This lets the wallet service own the policy lifecycle.
 */

export interface KeyPolicy {
  /** Allow list of destination addresses; `"*"` allows any. */
  destinationAllowlist: readonly string[];
  /** Max per-tx amount in the asset's smallest unit. `null` = unlimited. */
  perTxCapMinor: bigint | null;
  /** Max rolling 24h amount in the asset's smallest unit. `null` = unlimited. */
  dailyCapMinor: bigint | null;
  /** Above this amount, the signer rejects unless `requiredApprovers` are supplied. */
  approvalThresholdMinor: bigint | null;
  /** Number of approver signatures required when over threshold. */
  requiredApprovers: number;
}

export interface PolicyContext {
  destinationChain: string;
  destinationAddress: string;
  amountMinor: bigint;
  assetSymbol: string;
}

export interface PolicyEvaluationInput {
  policy: KeyPolicy;
  context: PolicyContext;
  /** Rolling 24h spent in the asset's smallest unit, supplied by the caller. */
  rolling24hSpentMinor: bigint;
  /** Number of approvers provided. */
  approvers: number;
}

@Injectable()
export class PolicyEngine {
  evaluate(input: PolicyEvaluationInput): void {
    const { policy, context, rolling24hSpentMinor, approvers } = input;

    // 1) Destination allowlist.
    if (
      policy.destinationAllowlist.length > 0 &&
      !policy.destinationAllowlist.includes('*') &&
      !policy.destinationAllowlist.includes(context.destinationAddress.toLowerCase())
    ) {
      throw AuthorizationError(
        'signer.policy.destination_not_allowed',
        `Destination ${context.destinationAddress} is not in this wallet's allowlist`,
      );
    }

    // 2) Per-tx cap.
    if (policy.perTxCapMinor !== null && context.amountMinor > policy.perTxCapMinor) {
      throw AuthorizationError(
        'signer.policy.per_tx_cap_exceeded',
        `Amount ${context.amountMinor} exceeds per-tx cap ${policy.perTxCapMinor}`,
      );
    }

    // 3) Daily cap (rolling 24h).
    if (
      policy.dailyCapMinor !== null &&
      rolling24hSpentMinor + context.amountMinor > policy.dailyCapMinor
    ) {
      throw AuthorizationError(
        'signer.policy.daily_cap_exceeded',
        `Rolling 24h spend ${rolling24hSpentMinor + context.amountMinor} exceeds daily cap ${policy.dailyCapMinor}`,
      );
    }

    // 4) Approval threshold.
    if (
      policy.approvalThresholdMinor !== null &&
      context.amountMinor > policy.approvalThresholdMinor &&
      approvers < policy.requiredApprovers
    ) {
      throw AuthorizationError(
        'signer.policy.approvals_required',
        `Amount ${context.amountMinor} requires ${policy.requiredApprovers} approver(s); only ${approvers} provided`,
      );
    }
  }
}
