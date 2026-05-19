import { KpiCard } from '@/components/kpi/KpiCard';
import { formatNumber, formatPercent } from '@/lib/format/number';
import type { DashboardMonthlySummary } from '@/types/performance';

type Props = {
  summary: DashboardMonthlySummary | null;
};

export function PerformanceKpiGrid({ summary }: Props) {
  const items = [
    {
      label: 'Room Sold',
      value: formatNumber(summary?.room_sold),
    },
    {
      label: 'Revenue',
      value: formatNumber(summary?.room_revenue),
    },
    {
      label: 'Occupancy',
      value: formatPercent(summary?.occupancy_pct),
    },
    {
      label: 'ADR',
      value: formatNumber(summary?.adr),
    },
    {
      label: 'RevPAR',
      value: formatNumber(summary?.revpar),
    },
    {
      label: 'Budget Revenue',
      value: formatNumber(summary?.budget_revenue),
    },
    {
      label: 'Pickup Revenue',
      value: formatNumber(summary?.pickup_revenue),
    },
    {
      label: 'Pickup Room Sold',
      value: formatNumber(summary?.pickup_room_sold),
    },
  ];

  return (
    <section className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-4'>
      {items.map((item) => (
        <KpiCard
          key={item.label}
          label={item.label}
          value={item.value}
        />
      ))}
    </section>
  );
}
