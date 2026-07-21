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
        'sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-white/[0.06]',
        'bg-[color:rgb(14_10_38_/_0.6)] backdrop-blur-xl backdrop-saturate-150',
        'shadow-[inset_-1px_0_0_rgba(255,255,255,0.03)]',
        className,
      )}
    >
      <div className="flex items-center justify-between px-5 py-5">
        {brand}
        {onCollapse ? (
          <button
            type="button"
            onClick={onCollapse}
            className="grid h-7 w-7 place-items-center rounded-md text-text-tertiary transition-colors hover:bg-surface-cardHover hover:text-text-primary"
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
              'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200',
              active
                ? 'bg-gradient-to-r from-brand-500/25 via-brand-500/10 to-transparent text-text-primary'
                : 'text-text-secondary hover:bg-white/[0.04] hover:pl-3.5 hover:text-text-primary',
            );
            return (
              <li key={item.key}>
                {renderLink(
                  item,
                  <>
                    {/* Active rail indicator */}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-brand-gradient transition-all duration-300',
                        active ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0',
                      )}
                    />
                    <Icon
                      className={cn(
                        'h-4 w-4 transition-colors duration-200',
                        active ? 'text-brand-300 drop-shadow-[0_0_6px_rgba(129,89,255,0.6)]' : 'text-text-tertiary group-hover:text-text-secondary',
                      )}
                    />
                    <span className="truncate">{item.label}</span>
                  </>,
                  linkClass,
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      {footer ? <div className="border-t border-white/[0.06] px-4 py-4">{footer}</div> : null}
    </aside>
  );
}
