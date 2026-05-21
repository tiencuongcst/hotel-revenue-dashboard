import type { RegionMarketDetail } from "@/types/region";

type Props = {
  data: RegionMarketDetail[];
};

function formatNumber(value: number | null | undefined) {
  return Number(value ?? 0).toLocaleString("en-US");
}

function formatPercent(value: number | null | undefined) {
  return `${Number(value ?? 0).toFixed(2)}%`;
}

export default function RegionMarketTable({ data }: Props) {
  return (
    <div className="region-table-card">
      <div className="region-chart-title">SOURCE MARKET DETAIL</div>

      <div className="region-table-wrapper">
        <table className="region-table">
          <thead>
            <tr>
              <th>Market</th>
              <th>Guests</th>
              <th>Male</th>
              <th>Female</th>
              <th>Unknown</th>
              <th>Male %</th>
              <th>Female %</th>
              <th>Share %</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.market_group}>
                <td>{item.market_group}</td>
                <td>{formatNumber(item.guest_count)}</td>
                <td>{formatNumber(item.male)}</td>
                <td>{formatNumber(item.female)}</td>
                <td>{formatNumber(item.unknown_gender)}</td>
                <td>{formatPercent(item.male_pct)}</td>
                <td>{formatPercent(item.female_pct)}</td>
                <td>{formatPercent(item.market_share_pct)}</td>
              </tr>
            ))}

            {data.length === 0 ? (
              <tr>
                <td colSpan={8}>No data</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
