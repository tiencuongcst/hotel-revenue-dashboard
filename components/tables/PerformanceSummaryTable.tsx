import { DataTable } from '@/components/tables/DataTable';
import { formatNumber, formatPercent } from '@/lib/format/number';
import type { MonthlyPerformanceRow } from '@/types/performance';

type Props = {
  rows: MonthlyPerformanceRow[];
};

type SummaryTableRow = {
  kpi: string;
  current_month: string;
  previous_month: string;
  same_month_ly: string;
  chg_vs_lm: string;
  chg_vs_ly: string;
  budget: string;
};

const KPI_ORDER = ['otb', 'occ', 'rev', 'adr', 'revpar'];

function toNumber(value: number | string | null | undefined) {
  const numberValue = Number(value ?? 0);

  return Number.isFinite(numberValue) ? numberValue : 0;
}

function getMetricCode(row: MonthlyPerformanceRow) {
  return String(row.metric ?? '').toLowerCase();
}

function getKpiLabel(metric: string) {
  const code = metric.toLowerCase();

  if (
    code === 'otb' ||
    code === 'rooms_sold' ||
    code === 'room_sold'
  ) {
    return 'Rooms Sold';
  }

  if (
    code === 'occ' ||
    code === 'occupancy'
  ) {
    return 'Occupancy';
  }

  if (
    code === 'rev' ||
    code === 'revenue'
  ) {
    return 'Revenue';
  }

  if (code === 'adr') {
    return 'ADR';
  }

  if (code === 'revpar') {
    return 'RevPAR';
  }

  return metric || '-';
}

function isOccupancyMetric(metric: string) {
  const code = metric.toLowerCase();

  return code === 'occ' || code === 'occupancy';
}

function formatMetricValue(
  metric: string,
  value: number | string | null | undefined
) {
  const numericValue = toNumber(value);

  if (isOccupancyMetric(metric)) {
    return `${(numericValue * 100).toFixed(1)}%`;
  }

  return new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
}).format(numericValue);
}

function formatChangePercent(
  value: number | string | null | undefined
) {
  return formatPercent(toNumber(value));
}

function sortRows(rows: MonthlyPerformanceRow[]) {
  return [...rows].sort((a, b) => {
    const aMetric = getMetricCode(a);
    const bMetric = getMetricCode(b);

    const aIndex = KPI_ORDER.indexOf(aMetric);
    const bIndex = KPI_ORDER.indexOf(bMetric);

    return (
      (aIndex === -1 ? 999 : aIndex) -
      (bIndex === -1 ? 999 : bIndex)
    );
  });
}

export function PerformanceSummaryTable({
  rows,
}: Props) {
  const normalizedRows: SummaryTableRow[] = sortRows(rows).map((row) => {
    const metric = getMetricCode(row);

    return {
      kpi: getKpiLabel(metric),

      current_month: formatMetricValue(
        metric,
        row.a_this_month
      ),

      previous_month: formatMetricValue(
        metric,
        row.b_last_month
      ),

      same_month_ly: formatMetricValue(
        metric,
        row.c_same_month_ly
      ),

      chg_vs_lm: formatChangePercent(
        row.d_pct_change_vs_lm
      ),

      chg_vs_ly: formatChangePercent(
        row.e_pct_change_vs_ly
      ),

      budget: formatMetricValue(
        metric,
        row.f_budget
      ),
    };
  });

  return (
    <section className="app-card mb-6">
      <div className="app-card-header">
        <h2 className="text-lg font-bold text-[#212529]">
          Performance Summary
        </h2>
      </div>

      <div className="app-card-body p-0">
        <DataTable
          rows={normalizedRows}
          rowKey={(row) => row.kpi}
          columns={[
            {
              key: 'kpi',
              label: 'KPI',
            },
            {
              key: 'current_month',
              label: 'Current Month',
              align: 'right',
            },
            {
              key: 'previous_month',
              label: 'Previous Month',
              align: 'right',
            },
            {
              key: 'same_month_ly',
              label: 'Same Month LY',
              align: 'right',
            },
            {
              key: 'chg_vs_lm',
              label: '% Chg vs LM',
              align: 'right',
            },
            {
              key: 'chg_vs_ly',
              label: '% Chg vs LY',
              align: 'right',
            },
            {
              key: 'budget',
              label: 'Budget',
              align: 'right',
            },
          ]}
        />
      </div>
    </section>
  );
}