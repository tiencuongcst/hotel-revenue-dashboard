import Link from 'next/link';

const navItems = [
  { label: 'Performance', href: '/reports/performance' },
  { label: 'Pace Trend', href: '/reports/pace' },
  { label: 'Room', href: '/reports/room' },
  { label: 'Market Segment', href: '/reports/segment' },
  { label: 'LOS', href: '/reports/los' },
  { label: 'Region', href: '/reports/region' },
];

export function AppSidebar() {
  return (
    <aside className="app-sidebar">
      <div className="app-sidebar-brand">
        Goldient Hotel
        <div className="text-sm font-normal opacity-80">
          Revenue System
        </div>
      </div>

      <nav className="app-sidebar-nav">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="app-sidebar-link">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}