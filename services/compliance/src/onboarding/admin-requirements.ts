export interface RequirementSnapshot {
  id: string;
  label: string;
  category: 'kyb' | 'kyc';
  input_type: 'document' | 'information';
  field_key: string;
  step_key: string;
  value_format: string | null;
  placeholder: string | null;
  accept: string | null;
  sort_order: number;
}

const ADMIN_URL = process.env.ADMIN_BASE_URL ?? 'http://localhost:4014';

export async function fetchActiveRequirements(
  profile: 'business' | 'developer',
): Promise<RequirementSnapshot[]> {
  try {
    const res = await fetch(
      `${ADMIN_URL}/v1/settings/verification-requirements/active/${profile}`,
      { cache: 'no-store' },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as { data: RequirementSnapshot[] };
    return json.data ?? [];
  } catch {
    return [];
  }
}

export function buildStepOrder(
  requirements: RequirementSnapshot[],
  profile?: 'business' | 'developer',
): string[] {
  const groups = new Map<string, number>();
  for (const req of requirements) {
    const prev = groups.get(req.step_key);
    if (prev === undefined || req.sort_order < prev) {
      groups.set(req.step_key, req.sort_order);
    }
  }
  const order = [...groups.entries()]
    .sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]))
    .map(([key]) => key);

  if (profile === 'business' && !order.includes('beneficial_owners')) {
    const documentsIdx = order.indexOf('documents');
    if (documentsIdx >= 0) {
      order.splice(documentsIdx + 1, 0, 'beneficial_owners');
    } else {
      order.push('beneficial_owners');
    }
  }

  return order;
}

export function stepLabelFromKey(key: string): string {
  switch (key) {
    case 'business_details':
      return 'Business details';
    case 'documents':
      return 'Company documents';
    case 'beneficial_owners':
      return 'Beneficial owners';
    case 'personal_details':
      return 'Personal details';
    case 'identity_documents':
      return 'Identity verification';
    case 'address':
      return 'Proof of address';
    default:
      return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
