import type { LucideIcon } from 'lucide-react';
import {
  Bot,
  GraduationCap,
  HeartPulse,
  Landmark,
  Package,
  Plane,
  TrendingUp,
  Wheat,
} from 'lucide-react';

export type SalyBadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'accent';

export function verticalStatusVariant(status: string): SalyBadgeVariant {
  switch (status) {
    case 'ACTIVE':
    case 'SETTLED':
    case 'ADJUDICATED':
    case 'DISBURSED':
    case 'RELEASED':
      return 'success';
    case 'PENDING':
    case 'BATCHED':
    case 'SUBMITTED':
    case 'DISPUTED':
    case 'EXECUTING':
    case 'FUNDED':
      return 'warning';
    case 'DEFAULTED':
    case 'CANCELLED':
    case 'FAILED':
    case 'REVOKED':
    case 'REFUNDED':
      return 'danger';
    default:
      return 'neutral';
  }
}

export const VERTICAL_MODULES: {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  milestone: string;
}[] = [
  {
    href: '/verticals/finance',
    title: 'Finance',
    description: 'Instruments, holdings, loans, and DvP settlement for capital markets.',
    icon: TrendingUp,
    milestone: 'E3',
  },
  {
    href: '/verticals/gov',
    title: 'Government',
    description: 'Social programs, beneficiary disbursements, and transparency reporting.',
    icon: Landmark,
    milestone: 'E4',
  },
  {
    href: '/verticals/health',
    title: 'Healthcare',
    description: 'Patient consent registry, claims adjudication, and attested records.',
    icon: HeartPulse,
    milestone: 'E5',
  },
  {
    href: '/verticals/agents',
    title: 'Agent marketplace',
    description: 'Discover paid agent services, subscriptions, and usage metering.',
    icon: Bot,
    milestone: 'E6',
  },
  {
    href: '/verticals/agri',
    title: 'Agriculture',
    description: 'Farmer registry, produce traceability, and input financing.',
    icon: Wheat,
    milestone: 'E5',
  },
  {
    href: '/verticals/scm',
    title: 'Supply chain',
    description: 'Shipment tracking, logistics events, and settlement.',
    icon: Package,
    milestone: 'E5',
  },
  {
    href: '/verticals/aviation',
    title: 'Aviation',
    description: 'Aircraft registry, part provenance, and MRO settlements.',
    icon: Plane,
    milestone: 'E6',
  },
  {
    href: '/verticals/edu',
    title: 'Education',
    description: 'Institutions, verifiable credentials, tuition, and scholarships.',
    icon: GraduationCap,
    milestone: 'E7',
  },
];

export const VERTICAL_DEMO_SERVICES =
  'finance (:4023), gov (:4024), agri (:4025), scm (:4026), aviation (:4027), health (:4028), edu (:4029), agents (:4011), wallet (:4002)';
