import "@/styles/region.css";

import RegionTabs from "@/components/region/tabs/RegionTabs";

import {
  getRegionFilters,
  getRegionMarketDetail,
  getRegionSummary,
  getRegionNationalityTrend,
} from "@/services/region/region.service";

import type { RegionFilters, RegionTab } from "@/types/region";

type RegionSearchParams = {
  hotel?: string;
  year?: string;
  month?: string;
  market?: string;
  tab?: string;
};

type PageProps = {
  searchParams?: Promise<RegionSearchParams>;
};

function toNumberOrNull(value: string | undefined): number | null {
  if (!value) {
    return null;
  }

  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    return null;
  }

  return parsedValue;
}

export default async function RegionPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  const hotelCode = resolvedSearchParams?.hotel || null;
  const year = toNumberOrNull(resolvedSearchParams?.year) ?? 2026;
  const month = toNumberOrNull(resolvedSearchParams?.month) ?? 1;
  const marketGroup = resolvedSearchParams?.market || null;

  const activeTab: RegionTab =
    resolvedSearchParams?.tab === "trend" ? "trend" : "source-markets";

  const selectedFilters: RegionFilters = {
    hotelCode,
    year,
    month,
    marketGroup,
  };

  const [filterOptions, summary, trend, marketDetail] = await Promise.all([
    getRegionFilters(null),
    getRegionSummary(selectedFilters),
    getRegionNationalityTrend(selectedFilters),
    getRegionMarketDetail(selectedFilters),
  ]);

  return (
    <main className="region-page">
      <header className="region-header">
        <h1>Region</h1>
        <p>Guest nationality and source market analysis</p>
      </header>

      <RegionTabs
        activeTab={activeTab}
        filterOptions={filterOptions}
        summary={summary}
        trend={trend}
        marketDetail={marketDetail}
        selectedFilters={selectedFilters}
      />
    </main>
  );
}
