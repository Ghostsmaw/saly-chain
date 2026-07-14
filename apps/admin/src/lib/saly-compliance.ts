export function compliancePriorityVariant(p: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  switch (p) {
    case 'CRITICAL':
      return 'danger';
    case 'HIGH':
      return 'warning';
    case 'MEDIUM':
      return 'info';
    default:
      return 'neutral';
  }
}

export function complianceStatusVariant(s: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  switch (s) {
    case 'OPEN':
      return 'warning';
    case 'IN_REVIEW':
      return 'info';
    case 'APPROVED':
      return 'success';
    case 'REJECTED':
      return 'danger';
    default:
      return 'neutral';
  }
}
