"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SegmentFilters as SegmentFiltersType } from "@/types/segment/segment-filter.types";
import type { SegmentHotelOption } from "@/services/segment/segment-hotel.service";

type Props = {
  filters: SegmentFiltersType;
  hotelOptions: SegmentHotelOption[];
};

const YEAR_OPTIONS = Array.from(
  { length: 2035 - 2023 + 1 },
  (_, index) => 2023 + index
);

const MONTH_OPTIONS = Array.from({ length: 12 }, (_, index) => index + 1);

export default function SegmentFilters({ filters, hotelOptions }: Props) {
  const router = useRouter();

  const [hotelCode, setHotelCode] = useState(filters.hotelCode);
  const [stayYear, setStayYear] = useState(String(filters.stayYear));
  const [stayMonth, setStayMonth] = useState(String(filters.stayMonth));
  const [reportDate, setReportDate] = useState(filters.reportDate);
  const [pace1Date, setPace1Date] = useState(filters.pace1Date);
  const [pace2Date, setPace2Date] = useState(filters.pace2Date);

  function applyFilter() {
    const params = new URLSearchParams();

    params.set("hotel_code", hotelCode);
    params.set("stay_year", stayYear);
    params.set("stay_month", stayMonth);
    params.set("report_date", reportDate);
    params.set("pace1", pace1Date);
    params.set("pace2", pace2Date);

    router.push(`/reports/segment?${params.toString()}`);
  }

  return (
    <section className="segment-filter-card">
      <div className="segment-filter-grid">
        <div className="segment-filter-field segment-filter-hotel">
          <label>HOTEL</label>
          <select
            value={hotelCode}
            onChange={(event) => setHotelCode(event.target.value)}
            disabled={hotelOptions.length === 0}
          >
            {hotelOptions.length === 0 ? (
              <option value={hotelCode}>{hotelCode || "No hotel"}</option>
            ) : (
              hotelOptions.map((hotel) => (
                <option key={hotel.hotel_code} value={hotel.hotel_code}>
                  {hotel.hotel_name || hotel.hotel_code}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="segment-filter-field">
          <label>YEAR</label>
          <select
            value={stayYear}
            onChange={(event) => setStayYear(event.target.value)}
          >
            {YEAR_OPTIONS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="segment-filter-field">
          <label>MONTH</label>
          <select
            value={stayMonth}
            onChange={(event) => setStayMonth(event.target.value)}
          >
            {MONTH_OPTIONS.map((month) => (
              <option key={month} value={month}>
                {String(month).padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>

        <div className="segment-filter-field">
          <label>REPORT DATE</label>
          <input
            type="date"
            value={reportDate}
            onChange={(event) => setReportDate(event.target.value)}
          />
        </div>

        <div className="segment-filter-field">
          <label>PACE 1</label>
          <input
            type="date"
            value={pace1Date}
            onChange={(event) => setPace1Date(event.target.value)}
          />
        </div>

        <div className="segment-filter-field">
          <label>PACE 2</label>
          <input
            type="date"
            value={pace2Date}
            onChange={(event) => setPace2Date(event.target.value)}
          />
        </div>

        <div className="segment-filter-action">
          <button type="button" onClick={applyFilter} disabled={!hotelCode}>
            Apply Filter
          </button>
        </div>
      </div>
    </section>
  );
}