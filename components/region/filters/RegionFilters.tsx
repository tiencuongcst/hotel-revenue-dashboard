"use client";

import { useRouter, useSearchParams } from "next/navigation";

import type {
  RegionFilterOption,
  RegionFilters as RegionFiltersType,
} from "@/types/region";

type Props = {
  filterOptions: RegionFilterOption[];
  selectedFilters: RegionFiltersType;
};

export default function RegionFilters({
  filterOptions,
  selectedFilters,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hotels = Array.from(
    new Map(
      filterOptions.map((item) => [
        item.hotel_code,
        {
          hotel_code: item.hotel_code,
          hotel_name: item.hotel_name,
        },
      ])
    ).values()
  );

  const years = Array.from(
    new Set(filterOptions.map((item) => item.stay_year))
  ).sort((a, b) => b - a);

  const months = Array.from(
    new Set(filterOptions.map((item) => item.stay_month))
  ).sort((a, b) => a - b);

  const markets = Array.from(
    new Set(filterOptions.map((item) => item.market_group))
  ).sort();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/reports/region?${params.toString()}`);
  }

  return (
    <section className="region-filter-card">
      <div className="region-filter-item">
        <label>HOTEL</label>
        <select
          value={selectedFilters.hotelCode ?? ""}
          onChange={(event) => updateFilter("hotel", event.target.value)}
        >
          <option value="">All Hotels</option>
          {hotels.map((hotel) => (
            <option key={hotel.hotel_code} value={hotel.hotel_code}>
              {hotel.hotel_name ?? hotel.hotel_code}
            </option>
          ))}
        </select>
      </div>

      <div className="region-filter-item">
        <label>YEAR</label>
        <select
          value={selectedFilters.year ?? ""}
          onChange={(event) => updateFilter("year", event.target.value)}
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="region-filter-item">
        <label>MONTH</label>
        <select
          value={selectedFilters.month ?? ""}
          onChange={(event) => updateFilter("month", event.target.value)}
        >
          <option value="">All Months</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {String(month).padStart(2, "0")}
            </option>
          ))}
        </select>
      </div>

      <div className="region-filter-item">
        <label>MARKET</label>
        <select
          value={selectedFilters.marketGroup ?? ""}
          onChange={(event) => updateFilter("market", event.target.value)}
        >
          <option value="">All Markets</option>
          {markets.map((market) => (
            <option key={market} value={market}>
              {market}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
