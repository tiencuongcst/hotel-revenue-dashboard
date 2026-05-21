import type { RegionSummary } from "@/types/region";

type Props = {
  summary: RegionSummary | null;
};

function formatNumber(value: number | null | undefined) {
  return Number(value ?? 0).toLocaleString("en-US");
}

function formatPercent(value: number | null | undefined) {
  return `${Number(value ?? 0).toFixed(2)}%`;
}

export default function RegionStates({ summary }: Props) {
  return (
    <section className="region-kpi-grid">
      <div className="region-kpi-card">
        <span>Total Guests</span>
        <strong>{formatNumber(summary?.total_guests)}</strong>
      </div>

      <div className="region-kpi-card">
        <span>Total Markets</span>
        <strong>{formatNumber(summary?.total_markets)}</strong>
      </div>

      <div className="region-kpi-card">
        <span>Male</span>
        <strong>{formatNumber(summary?.total_male)}</strong>
        <small>{formatPercent(summary?.male_pct)}</small>
      </div>

      <div className="region-kpi-card">
        <span>Female</span>
        <strong>{formatNumber(summary?.total_female)}</strong>
        <small>{formatPercent(summary?.female_pct)}</small>
      </div>

      <div className="region-kpi-card">
        <span>Unknown Gender</span>
        <strong>{formatNumber(summary?.unknown_gender)}</strong>
      </div>
    </section>
  );
}
