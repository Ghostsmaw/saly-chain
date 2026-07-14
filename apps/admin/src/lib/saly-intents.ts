import type { IntentRecordDto } from '@salychain/sdk-internal';

export type IntentPayloadView = {
  amount: string;
  destCurrency: string;
  benefitKind: string;
  actorType?: string;
};

export function parseIntentPayload(intent: IntentRecordDto): IntentPayloadView {
  const payload = intent.payload as {
    actor?: { id: string; type: string };
    source?: { amount?: { amount_minor: string; currency: string } };
    destination?: { currency?: string; beneficiary?: { kind: string } };
  } | null;

  const amount =
    payload?.source?.amount?.amount_minor && payload?.source?.amount?.currency
      ? `${payload.source.amount.amount_minor} ${payload.source.amount.currency}`
      : '—';

  return {
    amount,
    destCurrency: payload?.destination?.currency ?? '—',
    benefitKind: payload?.destination?.beneficiary?.kind ?? '—',
    actorType: payload?.actor?.type,
  };
}

export function intentStateVariant(state: IntentRecordDto['state']): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  switch (state) {
    case 'COMPLETED':
      return 'success';
    case 'ACCEPTED':
      return 'info';
    case 'REJECTED':
    case 'FAILED':
      return 'danger';
    case 'RECEIVED':
      return 'warning';
    default:
      return 'neutral';
  }
}

export function computeIntentStats(intents: IntentRecordDto[]) {
  const completed = intents.filter((i) => i.state === 'COMPLETED').length;
  const rejected = intents.filter((i) => i.state === 'REJECTED' || i.state === 'FAILED').length;
  const inFlight = intents.filter((i) => i.state === 'RECEIVED' || i.state === 'ACCEPTED').length;
  const byKind = intents.reduce<Record<string, number>>((acc, i) => {
    acc[i.kind] = (acc[i.kind] ?? 0) + 1;
    return acc;
  }, {});
  const distribution = Object.entries(byKind)
    .sort(([, a], [, b]) => b - a)
    .map(([label, value]) => ({ label, value }));
  return { total: intents.length, completed, rejected, inFlight, distribution };
}

export const INTENT_STATE_FILTERS = ['All', 'COMPLETED', 'ACCEPTED', 'RECEIVED', 'REJECTED', 'FAILED'] as const;
export type IntentStateFilter = (typeof INTENT_STATE_FILTERS)[number];
