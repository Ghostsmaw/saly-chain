import { ConflictError } from '@salychain/errors';
import type { ExecutionTransactionState as State } from '../generated/prisma/index.js';

/**
 * SalyChain transaction state machine.
 *
 * Allowed transitions are explicit; anything else throws
 * `execution.tx.invalid_state`. Every transition records an
 * `ExecutionTransactionEvent` row so the entire history is reconstructable.
 *
 *  CREATED ──► SCREENED ──► ROUTED ──► RESERVED ──► EXECUTING ──► AWAITING_CONFIRMATION ──► SETTLED
 *      └────► REJECTED (compliance/risk denies)
 *                                            └────► FAILED ──► REVERSING ──► REVERSED
 *
 * REVERSED, REJECTED, and FAILED (without reversal) are absorbing states.
 * SETTLED is normally terminal but may transition to REVERSING on a chain reorg.
 */

const ALLOWED: Record<State, readonly State[]> = {
  CREATED:               ['SCREENED', 'AWAITING_APPROVAL', 'REJECTED', 'FAILED'],
  SCREENED:              ['ROUTED', 'EXECUTING', 'REJECTED', 'FAILED'],
  ROUTED:                ['QUOTED', 'RESERVED', 'FAILED'],
  QUOTED:                ['RESERVED', 'FAILED', 'REJECTED'],
  RESERVED:              ['EXECUTING', 'REVERSING', 'FAILED'],
  EXECUTING:             ['AWAITING_CONFIRMATION', 'SETTLED', 'REVERSING', 'FAILED'],
  AWAITING_APPROVAL:     ['CREATED', 'REJECTED', 'FAILED'],
  AWAITING_CONFIRMATION: ['SETTLED', 'REVERSING', 'FAILED'],
  SETTLED:               ['REVERSING'],
  FAILED:                ['REVERSING'],
  REVERSING:             ['REVERSED', 'FAILED'],
  REVERSED:              [],
  REJECTED:              [],
};

export function assertTransition(from: State, to: State): void {
  if (from === to) return;
  if (!ALLOWED[from].includes(to)) {
    throw ConflictError(
      'execution.tx.invalid_state',
      `Illegal transition ${from} → ${to}`,
    );
  }
}

export function isTerminal(state: State): boolean {
  return ALLOWED[state].length === 0;
}

export function allowedNextStates(from: State): readonly State[] {
  return ALLOWED[from];
}
