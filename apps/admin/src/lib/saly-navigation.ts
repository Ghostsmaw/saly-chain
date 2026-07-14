import type { LucideIcon } from 'lucide-react';
import {
  ArrowDownToLine,
  ArrowLeftRight,
  Banknote,
  Bot,
  Brain,
  Building2,
  Code2,
  Compass,
  Database,
  FileCode2,
  Gauge,
  GraduationCap,
  HeartPulse,
  Landmark,
  Layers,
  LayoutDashboard,
  LineChart,
  Network,
  Package,
  Plane,
  Plug,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  Wheat,
} from 'lucide-react';

export type SalyNavItem = {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
  keywords?: string[];
};

export type SalyNavGroup = {
  label: string;
  items: SalyNavItem[];
};

export const salyNavGroups: SalyNavGroup[] = [
  {
    label: 'Platform',
    items: [
      { key: 'dashboard', label: 'Dashboard', href: '/', icon: LayoutDashboard, keywords: ['home', 'noc', 'network'] },
      { key: 'overview', label: 'Overview', href: '/overview', icon: Compass },
      { key: 'analytics', label: 'Analytics', href: '/analytics', icon: LineChart, keywords: ['charts', 'metrics'] },
      { key: 'transactions', label: 'Transactions', href: '/transactions', icon: ArrowLeftRight, keywords: ['explorer', 'tx'] },
    ],
  },
  {
    label: 'Infrastructure',
    items: [
      { key: 'l3', label: 'Bridge & L3', href: '/l3', icon: Layers, keywords: ['bridge', 'rollup', 'chain'] },
      { key: 'monitoring', label: 'Nodes', href: '/monitoring', icon: Gauge, keywords: ['health', 'services'] },
      { key: 'contracts', label: 'Smart Contracts', href: '/contracts', icon: FileCode2 },
      { key: 'routing', label: 'Routing', href: '/routing', icon: Network },
    ],
  },
  {
    label: 'Custody & Treasury',
    items: [
      { key: 'wallets', label: 'Wallets', href: '/wallets', icon: Wallet, keywords: ['portfolio', 'custody'] },
      { key: 'liquidity', label: 'Liquidity', href: '/liquidity', icon: Database },
      { key: 'clearing', label: 'Clearing', href: '/clearing', icon: ArrowDownToLine },
    ],
  },
  {
    label: 'Operations',
    items: [
      { key: 'escrow', label: 'Escrow', href: '/escrow', icon: ShieldCheck },
      { key: 'payroll', label: 'Payroll', href: '/payroll', icon: Banknote },
      { key: 'approvals', label: 'Approvals', href: '/approvals', icon: ShieldCheck },
      { key: 'intents', label: 'Intents', href: '/intents', icon: Brain },
    ],
  },
  {
    label: 'Identity & Dev',
    items: [
      { key: 'developers', label: 'Developers', href: '/developers', icon: Code2, keywords: ['api', 'portal', 'sdk'] },
      { key: 'users', label: 'Identity', href: '/users', icon: Users },
      { key: 'businesses', label: 'Organizations', href: '/businesses', icon: Building2 },
    ],
  },
  {
    label: 'Verticals',
    items: [
      { key: 'verticals', label: 'All modules', href: '/verticals', icon: Layers },
      { key: 'verticals-finance', label: 'Finance', href: '/verticals/finance', icon: TrendingUp },
      { key: 'verticals-gov', label: 'Governance', href: '/verticals/gov', icon: Landmark },
      { key: 'verticals-health', label: 'Healthcare', href: '/verticals/health', icon: HeartPulse },
      { key: 'verticals-agents', label: 'Marketplace', href: '/verticals/agents', icon: Bot },
      { key: 'verticals-agri', label: 'Agriculture', href: '/verticals/agri', icon: Wheat },
      { key: 'verticals-scm', label: 'Supply chain', href: '/verticals/scm', icon: Package },
      { key: 'verticals-aviation', label: 'Aviation', href: '/verticals/aviation', icon: Plane },
      { key: 'verticals-edu', label: 'Education', href: '/verticals/edu', icon: GraduationCap },
    ],
  },
  {
    label: 'System',
    items: [
      { key: 'risk', label: 'Risk', href: '/risk', icon: ShieldAlert },
      { key: 'compliance', label: 'Compliance', href: '/compliance', icon: ShieldCheck },
      { key: 'ai', label: 'Intelligence', href: '/ai-insights', icon: Sparkles },
      { key: 'integrations', label: 'Integrations', href: '/integrations', icon: Plug },
      { key: 'settings', label: 'Settings', href: '/settings', icon: Settings },
    ],
  },
];

export const salyCommandItems: (SalyNavItem & { group: string })[] = salyNavGroups.flatMap((g) =>
  g.items.map((item) => ({ ...item, group: g.label })),
);

export function matchSalyNavKey(pathname: string | null): string {
  if (!pathname) return 'dashboard';
  const flat = salyNavGroups.flatMap((g) => g.items);
  const exact = flat.find((i) => i.href === pathname);
  if (exact) return exact.key;
  const prefix = flat
    .filter((i) => i.href !== '/' && pathname.startsWith(i.href))
    .sort((a, b) => b.href.length - a.href.length)[0];
  return prefix?.key ?? 'dashboard';
}

/** Legacy export for pages still importing navItems */
export { salyNavGroups as navGroups };
export const navItems = salyCommandItems.map(({ group: _g, keywords: _k, ...item }) => item);
