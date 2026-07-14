import { type ComponentType, type ReactNode } from 'react';
import { ChevronsLeft } from 'lucide-react';
import { cn } from '../utils/cn.js';

export interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export interface SidebarProps {
  brand: ReactNode;
  items: readonly SidebarItem[];
  activeKey: string;
  footer?: ReactNode;
  /** Render a link element using the host framework (e.g. Next.js `<Link>`). */
  renderLink?: (item: SidebarItem, children: ReactNode, className: string) => ReactNode;
  className?: string;
  onCollapse?: () => void;
}

const defaultLinkRenderer: NonNullable<SidebarProps['renderLink']> = (item, children, className) => (
  <a href={item.href} className={className}>
    {children}
  </a>
);

export function Sidebar({
  brand,
  items,
  activeKey,
  footer,
  renderLink = defaultLinkRenderer,
  className,
  onCollapse,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex h-screen w-64 shrink-0 flex-col border-r border-surface-border bg-[color:rgb(14_10_38_/_0.9)] backdrop-blur',
        className,
      )}
    >
      <div className="flex items-center justify-between px-5 py-5">
        {brand}
        {onCollapse ? (
          <button
            type="button"
            onClick={onCollapse}
            className="grid h-7 w-7 place-items-center rounded-md text-text-tertiary hover:bg-surface-cardHover hover:text-text-primary"
            aria-label="Collapse sidebar"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = item.key === activeKey;
            const linkClass = cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              active
                ? 'bg-brand-500/15 text-text-primary shadow-glow'
                : 'text-text-secondary hover:bg-surface-cardHover hover:text-text-primary',
            );
            return (
              <li key={item.key}>
                {renderLink(
                  item,
                  <>
                    <Icon className={cn('h-4 w-4', active ? 'text-brand-300' : 'text-text-tertiary')} />
                    <span className="truncate">{item.label}</span>
                  </>,
                  linkClass,
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      {footer ? <div className="border-t border-surface-border px-4 py-4">{footer}</div> : null}
    </aside>
  );
}
