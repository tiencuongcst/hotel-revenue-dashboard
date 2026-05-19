export const APP_THEME = {
  primary: '#0a4a32',
  secondary: '#1a634a',
  background: '#f8f9fa',
  surface: '#ffffff',
  border: '#e9ecef',
  text: '#212529',
} as const;

export const SIDEBAR_NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'Performance',
    href: '/reports/performance',
  },
  {
    label: 'Pace Trend',
    href: '/reports/pace',
  },
  {
    label: 'Room',
    href: '/reports/room',
  },
  {
    label: 'Market Segment',
    href: '/reports/segment',
  },
  {
    label: 'LOS',
    href: '/reports/los',
  },
  {
    label: 'Region',
    href: '/reports/region',
  },
] as const;
