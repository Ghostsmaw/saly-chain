import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowRightLeft,
  BarChart3,
  Boxes,
  Building2,
  LayoutDashboard,
  Send,
  Settings,
  ShieldCheck,
  Users,
  Vault,
  Wallet,
  Banknote,
  Link2,
  Receipt,
} from 'lucide-react';
import type { SidebarItem } from '@salychain/ui';

export const navItems: readonly SidebarItem[] = [
  { key: 'dashboard', label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { key: 'treasury', label: 'Treasury', href: '/treasury', icon: Vault },
  { key: 'topups', label: 'Top up', href: '/topups', icon: ArrowDownToLine },
  { key: 'swap', label: 'Swap', href: '/swap', icon: ArrowRightLeft },
  { key: 'wallets', label: 'Wallets', href: '/wallets', icon: Wallet },
  { key: 'l3', label: 'L3 Rail', href: '/l3', icon: Boxes },
  { key: 'transfers', label: 'Send Money', href: '/transfers', icon: Send },
  { key: 'payroll', label: 'Payroll', href: '/payroll', icon: Banknote },
  { key: 'payment-links', label: 'Payment links', href: '/merchant/payment-links', icon: Link2 },
  { key: 'settlements', label: 'Settlements', href: '/merchant/settlements', icon: Receipt },
  { key: 'transactions', label: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { key: 'approvals', label: 'Approvals', href: '/approvals', icon: ShieldCheck },
  { key: 'team', label: 'Team', href: '/team', icon: Users },
  { key: 'analytics', label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { key: 'settings', label: 'Settings', href: '/settings', icon: Settings },
];

export const iconForTreasury = {
  total: Vault,
  wallets: Wallet,
  outbound: Send,
  team: Users,
  org: Building2,
};
