import Link from "next/link";

import { getSessionUser } from "@/lib/auth";

import { LogoutButton } from "@/components/layout/LogoutButton";

const navItems = [
  { label: "Performance", href: "/reports/performance" },
  { label: "YOY", href: "/reports/yoy" },
  { label: "Pace Trend", href: "/reports/pace" },
  { label: "Room", href: "/reports/room" },
  { label: "Market Segment", href: "/reports/segment" },
  { label: "Length of Stay", href: "/reports/los" },
  { label: "Region", href: "/reports/region" },
];

export async function AppSidebar() {
  const session = await getSessionUser();

  return (
    <aside className="app-sidebar">
      <div
  className="app-sidebar-brand"
  style={{
    fontSize: 19,
    fontWeight: 700,
    lineHeight: 1.3,
  }}
>
  Revenue System
</div>
      <nav className="app-sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="app-sidebar-link"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div
        style={{
          marginTop: "auto",
          padding: 20,
        }}
      >
        <div
          style={{
            background: "#f1f3f5",
            borderRadius: 14,
            padding: 14,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 8,
              color: "#0f172a",
            }}
          >
            {session?.user_name}
          </div>

          <div
            style={{
              color: "#64748b",
              marginBottom: 4,
            }}
          >
            Hotel: {session?.hotel_code}
          </div>


          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
