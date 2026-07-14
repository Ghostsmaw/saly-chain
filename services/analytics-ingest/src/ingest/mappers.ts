import { SUBJECTS, type EventBySubject, type Subject } from '@salychain/events';

export interface CanonicalRow {
  readonly table: string;
  readonly row: Record<string, unknown>;
}

/** Format a Date as ClickHouse DateTime64(3) text: 'YYYY-MM-DD HH:MM:SS.mmm' (UTC). */
export function chDateTime(d: Date): string {
  return d.toISOString().replace('T', ' ').replace('Z', '');
}

const tsFromIso = (iso: string): string => chDateTime(new Date(iso));
const tsFromEpochSeconds = (s: number): string => chDateTime(new Date(s * 1000));

type AnyEvent = EventBySubject[Subject];

/**
 * Map a validated domain event to its canonical ClickHouse row. Returns null
 * for events we land only in raw_events (e.g. tx.reserved/executing carry no
 * extra canonical signal). The caller always writes raw_events separately.
 *
 * The `event` is the discriminated union over all subjects; we narrow with a
 * cast per case because the discriminant lives in `subject`, not the payload.
 */
export function toCanonicalRow(subject: Subject, event: AnyEvent): CanonicalRow | null {
  switch (subject) {
    // ───────────── Chain: blocks ─────────────
    case SUBJECTS.CHAIN_BASE_BLOCK_OBSERVED: {
      const e = event as EventBySubject[typeof SUBJECTS.CHAIN_BASE_BLOCK_OBSERVED];
      return {
        table: 'blocks',
        row: {
          chain_id: 'base',
          block_number: e.block_number,
          block_hash: e.block_hash,
          ts: tsFromEpochSeconds(e.timestamp),
          event_id: e.event_id,
        },
      };
    }
    case SUBJECTS.CHAIN_L3_BLOCK_OBSERVED: {
      const e = event as EventBySubject[typeof SUBJECTS.CHAIN_L3_BLOCK_OBSERVED];
      return {
        table: 'blocks',
        row: {
          chain_id: e.l3_network,
          block_number: e.block_number,
          block_hash: e.block_hash,
          ts: tsFromEpochSeconds(e.timestamp),
          event_id: e.event_id,
        },
      };
    }
    case SUBJECTS.CHAIN_XRPL_LEDGER_OBSERVED: {
      const e = event as EventBySubject[typeof SUBJECTS.CHAIN_XRPL_LEDGER_OBSERVED];
      return {
        table: 'blocks',
        row: {
          chain_id: 'xrpl',
          block_number: e.ledger_index,
          block_hash: '',
          ts: tsFromEpochSeconds(e.close_time),
          event_id: e.event_id,
        },
      };
    }

    // ───────────── Chain: token transfers ─────────────
    case SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED: {
      const e = event as EventBySubject[typeof SUBJECTS.CHAIN_BASE_TRANSFER_OBSERVED];
      return {
        table: 'token_transfers',
        row: {
          chain_id: 'base',
          tx_hash: e.tx_hash,
          log_index: e.log_index,
          ts: tsFromIso(e.occurred_at),
          block_number: e.block_number,
          token_address: e.contract_address,
          token_symbol: e.asset,
          from_address: e.from,
          to_address: e.to,
          amount_raw: e.amount_minor,
          transfer_type: 'erc20',
          event_id: e.event_id,
        },
      };
    }
    case SUBJECTS.CHAIN_L3_TRANSFER_OBSERVED: {
      const e = event as EventBySubject[typeof SUBJECTS.CHAIN_L3_TRANSFER_OBSERVED];
      return {
        table: 'token_transfers',
        row: {
          chain_id: e.l3_network,
          tx_hash: e.tx_hash,
          log_index: e.log_index,
          ts: tsFromIso(e.occurred_at),
          block_number: e.block_number,
          token_address: e.contract_address,
          token_symbol: e.asset,
          from_address: e.from,
          to_address: e.to,
          amount_raw: e.amount_minor,
          transfer_type: 'erc20',
          event_id: e.event_id,
        },
      };
    }
    case SUBJECTS.CHAIN_XRPL_PAYMENT_OBSERVED: {
      const e = event as EventBySubject[typeof SUBJECTS.CHAIN_XRPL_PAYMENT_OBSERVED];
      const isIou = e.iou !== undefined;
      return {
        table: 'token_transfers',
        row: {
          chain_id: 'xrpl',
          tx_hash: e.tx_hash,
          log_index: 0,
          ts: tsFromEpochSeconds(e.close_time),
          block_number: e.ledger_index,
          token_address: isIou ? `${e.iou?.currency}.${e.iou?.issuer}` : 'XRP',
          token_symbol: isIou ? (e.iou?.currency ?? 'IOU') : 'XRP',
          from_address: e.from,
          to_address: e.to,
          amount_raw: isIou ? (e.iou?.value ?? '0') : (e.amount_drops ?? '0'),
          transfer_type: isIou ? 'xrpl_iou' : 'xrpl_native',
          event_id: e.event_id,
        },
      };
    }

    // ───────────── Chain: decoded events ─────────────
    case SUBJECTS.CHAIN_BASE_DEAL_FUNDED: {
      const e = event as EventBySubject[typeof SUBJECTS.CHAIN_BASE_DEAL_FUNDED];
      return {
        table: 'decoded_events',
        row: {
          chain_id: 'base',
          tx_hash: e.tx_hash,
          log_index: e.log_index,
          ts: tsFromIso(e.occurred_at),
          contract_address: e.escrow_contract,
          event_name: 'DealFunded',
          args: JSON.stringify({
            deal_id: e.deal_id,
            payer: e.payer,
            payee: e.payee,
            token: e.token,
            amount_minor: e.amount_minor,
            deadline: e.deadline,
          }),
          event_id: e.event_id,
        },
      };
    }
    case SUBJECTS.CHAIN_BASE_DEAL_RELEASED: {
      const e = event as EventBySubject[typeof SUBJECTS.CHAIN_BASE_DEAL_RELEASED];
      return {
        table: 'decoded_events',
        row: {
          chain_id: 'base',
          tx_hash: e.tx_hash,
          log_index: e.log_index,
          ts: tsFromIso(e.occurred_at),
          contract_address: e.escrow_contract,
          event_name: 'DealReleased',
          args: JSON.stringify({ deal_id: e.deal_id, payee: e.payee, amount_minor: e.amount_minor }),
          event_id: e.event_id,
        },
      };
    }
    case SUBJECTS.CHAIN_BASE_DEAL_REFUNDED: {
      const e = event as EventBySubject[typeof SUBJECTS.CHAIN_BASE_DEAL_REFUNDED];
      return {
        table: 'decoded_events',
        row: {
          chain_id: 'base',
          tx_hash: e.tx_hash,
          log_index: e.log_index,
          ts: tsFromIso(e.occurred_at),
          contract_address: e.escrow_contract,
          event_name: 'DealRefunded',
          args: JSON.stringify({ deal_id: e.deal_id, payer: e.payer, amount_minor: e.amount_minor }),
          event_id: e.event_id,
        },
      };
    }
    case SUBJECTS.CHAIN_L3_OUTPUT_PROPOSED: {
      const e = event as EventBySubject[typeof SUBJECTS.CHAIN_L3_OUTPUT_PROPOSED];
      return {
        table: 'decoded_events',
        row: {
          chain_id: e.l3_network,
          tx_hash: e.l1_tx_hash,
          log_index: 0,
          ts: tsFromIso(e.occurred_at),
          contract_address: e.l2_output_oracle,
          event_name: 'OutputProposed',
          args: JSON.stringify({
            settlement_network: e.settlement_network,
            output_root: e.output_root,
            output_index: e.output_index,
            l2_block_number: e.l2_block_number,
            l1_block_number: e.l1_block_number,
            l1_timestamp: e.l1_timestamp,
          }),
          event_id: e.event_id,
        },
      };
    }

    // ───────────── Transaction lifecycle ─────────────
    case SUBJECTS.TX_CREATED: {
      const e = event as EventBySubject[typeof SUBJECTS.TX_CREATED];
      return {
        table: 'tx_lifecycle',
        row: {
          transaction_id: e.transaction_id,
          state: 'created',
          kind: e.kind,
          ts: tsFromIso(e.occurred_at),
          intent_id: e.intent_id ?? '',
          amount_minor: e.source.amount_minor,
          currency: e.source.currency,
          event_id: e.event_id,
        },
      };
    }
    case SUBJECTS.TX_RESERVED: {
      const e = event as EventBySubject[typeof SUBJECTS.TX_RESERVED];
      return txLifecycleRow(e.transaction_id, 'reserved', e.kind, e.occurred_at, e.event_id);
    }
    case SUBJECTS.TX_EXECUTING: {
      const e = event as EventBySubject[typeof SUBJECTS.TX_EXECUTING];
      return txLifecycleRow(e.transaction_id, 'executing', e.kind, e.occurred_at, e.event_id);
    }
    case SUBJECTS.TX_AWAITING_CONFIRMATION: {
      const e = event as EventBySubject[typeof SUBJECTS.TX_AWAITING_CONFIRMATION];
      return {
        table: 'tx_lifecycle',
        row: {
          transaction_id: e.transaction_id,
          state: 'awaiting_confirmation',
          kind: e.kind,
          ts: tsFromIso(e.occurred_at),
          rail: e.rail,
          tx_hash: e.tx_hash,
          event_id: e.event_id,
        },
      };
    }
    case SUBJECTS.TX_SETTLED: {
      const e = event as EventBySubject[typeof SUBJECTS.TX_SETTLED];
      return {
        table: 'tx_lifecycle',
        row: {
          transaction_id: e.transaction_id,
          state: 'settled',
          kind: e.kind,
          ts: tsFromIso(e.settled_at),
          tx_hash: e.tx_hash ?? '',
          event_id: e.event_id,
        },
      };
    }
    case SUBJECTS.TX_FAILED: {
      const e = event as EventBySubject[typeof SUBJECTS.TX_FAILED];
      return {
        table: 'tx_lifecycle',
        row: {
          transaction_id: e.transaction_id,
          state: 'failed',
          kind: e.kind,
          ts: tsFromIso(e.occurred_at),
          reason_code: e.reason_code,
          event_id: e.event_id,
        },
      };
    }
    case SUBJECTS.TX_REVERSED: {
      const e = event as EventBySubject[typeof SUBJECTS.TX_REVERSED];
      return txLifecycleRow(e.transaction_id, 'reversed', e.kind, e.occurred_at, e.event_id);
    }

    // ───────────── Intent lifecycle ─────────────
    case SUBJECTS.INTENT_RECEIVED: {
      const e = event as EventBySubject[typeof SUBJECTS.INTENT_RECEIVED];
      return {
        table: 'intent_events',
        row: {
          intent_id: e.intent_id,
          event_type: 'received',
          kind: e.kind,
          ts: tsFromIso(e.occurred_at),
          actor_id: e.actor_id ?? '',
          source: e.source,
          event_id: e.event_id,
        },
      };
    }
    case SUBJECTS.INTENT_SCREENED: {
      const e = event as EventBySubject[typeof SUBJECTS.INTENT_SCREENED];
      return {
        table: 'intent_events',
        row: {
          intent_id: e.intent_id,
          event_type: 'screened',
          kind: e.kind,
          ts: tsFromIso(e.occurred_at),
          compliance_decision: e.compliance_decision,
          risk_decision: e.risk_decision,
          risk_score: e.risk_score,
          event_id: e.event_id,
        },
      };
    }
    case SUBJECTS.INTENT_ROUTED: {
      const e = event as EventBySubject[typeof SUBJECTS.INTENT_ROUTED];
      return {
        table: 'intent_events',
        row: {
          intent_id: e.intent_id,
          event_type: 'routed',
          kind: e.kind,
          ts: tsFromIso(e.occurred_at),
          rail: e.rail,
          expected_cost_minor: e.expected_cost_minor,
          expected_seconds: e.expected_seconds,
          event_id: e.event_id,
        },
      };
    }
    case SUBJECTS.INTENT_REJECTED: {
      const e = event as EventBySubject[typeof SUBJECTS.INTENT_REJECTED];
      return {
        table: 'intent_events',
        row: {
          intent_id: e.intent_id,
          event_type: 'rejected',
          kind: e.kind,
          ts: tsFromIso(e.occurred_at),
          reason_code: e.reason_code,
          event_id: e.event_id,
        },
      };
    }

    // ───────────── Agent lifecycle ─────────────
    case SUBJECTS.AGENT_CREATED: {
      const e = event as EventBySubject[typeof SUBJECTS.AGENT_CREATED];
      return {
        table: 'agent_events',
        row: {
          agent_id: e.agent_id,
          event_type: 'created',
          ts: tsFromIso(e.occurred_at),
          owner_id: e.owner_id,
          owner_kind: e.owner_kind,
          wallet_ids: JSON.stringify(e.wallet_ids),
          event_id: e.event_id,
        },
      };
    }
    case SUBJECTS.AGENT_POLICY_UPDATED: {
      const e = event as EventBySubject[typeof SUBJECTS.AGENT_POLICY_UPDATED];
      return {
        table: 'agent_events',
        row: {
          agent_id: e.agent_id,
          event_type: 'policy_updated',
          ts: tsFromIso(e.occurred_at),
          policy_version: e.policy_version,
          event_id: e.event_id,
        },
      };
    }
    case SUBJECTS.AGENT_SPEND_DENIED: {
      const e = event as EventBySubject[typeof SUBJECTS.AGENT_SPEND_DENIED];
      return {
        table: 'agent_events',
        row: {
          agent_id: e.agent_id,
          event_type: 'spend_denied',
          ts: tsFromIso(e.occurred_at),
          intent_id: e.intent_id ?? '',
          reason_code: e.reason_code,
          event_id: e.event_id,
        },
      };
    }

    default:
      return null;
  }
}

function txLifecycleRow(
  transactionId: string,
  state: string,
  kind: string,
  occurredAt: string,
  eventId: string,
): CanonicalRow {
  return {
    table: 'tx_lifecycle',
    row: {
      transaction_id: transactionId,
      state,
      kind,
      ts: tsFromIso(occurredAt),
      event_id: eventId,
    },
  };
}
