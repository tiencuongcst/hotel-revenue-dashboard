"use client";

import { useRouter, useSearchParams } from "next/navigation";

import RegionSourceMarketChart from "@/components/region/charts/RegionSourceMarketChart";
import RegionTrendCharts from "@/components/region/charts/RegionTrendCharts";
import RegionFilters from "@/components/region/filters/RegionFilters";
import RegionStates from "@/components/region/states/RegionStates";
import RegionMarketTable from "@/components/region/tables/RegionMarketTable";

import type {
  RegionFilterOption,
  RegionFilters as RegionFiltersType,
  RegionMarketDetail,
  RegionSummary,
  RegionTab,
  RegionNationalityTrend,
} from "@/types/region";

type Props = {
  activeTab: RegionTab;
  filterOptions: RegionFilterOption[];
  summary: RegionSummary | null;
  trend: RegionNationalityTrend[];
  marketDetail: RegionMarketDetail[];
  selectedFilters: RegionFiltersType;
};

export default function RegionTabs({
  activeTab,
  filterOptions,
  summary,
  trend,
  marketDetail,
  selectedFilters,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setTab(tab: RegionTab) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`/reports/region?${params.toString()}`);
  }

  return (
    <>
      <RegionFilters
        filterOptions={filterOptions}
        selectedFilters={selectedFilters}
      />

      <div className="region-tabs">
        <button
          className={activeTab === "source-markets" ? "active" : ""}
          onClick={() => setTab("source-markets")}
        >
          Source Markets
        </button>

        <button
          className={activeTab === "trend" ? "active" : ""}
          onClick={() => setTab("trend")}
        >
          Trend
        </button>
      </div>

      {activeTab === "source-markets" ? (
        <div className="region-source-section">
          <RegionStates summary={summary} />
          <RegionSourceMarketChart data={marketDetail} />
          <RegionMarketTable data={marketDetail} />
        </div>
      ) : (
        <RegionTrendCharts data={trend} />
      )}
    </>
  );
}
