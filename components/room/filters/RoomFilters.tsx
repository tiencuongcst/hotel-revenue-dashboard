"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { RoomHotelOption } from "@/types/room/room-filter.types";

type Props = {
  hotelCode: string;
  yearStay: number;
  monthStay: number;
  reportDate: string;
  hotelOptions?: RoomHotelOption[];
};

const YEAR_OPTIONS = Array.from(
  { length: 2035 - 2023 + 1 },
  (_, index) => 2023 + index
);

const MONTH_OPTIONS = Array.from(
  { length: 12 },
  (_, index) => index + 1
);

export function RoomFilters({
  hotelCode,
  yearStay,
  monthStay,
  reportDate,
  hotelOptions = [],
}: Props) {
  const router = useRouter();

  const [selectedHotelCode, setSelectedHotelCode] = useState(hotelCode);
  const [selectedYearStay, setSelectedYearStay] = useState(String(yearStay));
  const [selectedMonthStay, setSelectedMonthStay] = useState(String(monthStay));
  const [selectedReportDate, setSelectedReportDate] = useState(reportDate);

  function applyFilter() {
    const params = new URLSearchParams();

    params.set("hotelCode", selectedHotelCode);
    params.set("yearStay", selectedYearStay);
    params.set("monthStay", selectedMonthStay);
    params.set("reportDate", selectedReportDate);

    router.push(`/reports/room?${params.toString()}`);
  }

  return (
  <section className="room-filter-card">
    <div className="room-filter-grid">
      <div className="room-filter-field">
        <label>Hotel</label>
        <select
          value={selectedHotelCode}
          onChange={(event) => setSelectedHotelCode(event.target.value)}
          disabled={hotelOptions.length === 0}
        >
          {hotelOptions.length === 0 ? (
            <option value="">No hotel</option>
          ) : (
            hotelOptions.map((hotel) => (
              <option key={hotel.hotel_code} value={hotel.hotel_code}>
                {hotel.hotel_name || hotel.hotel_code}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="room-filter-field">
        <label>Year</label>
        <select
          value={selectedYearStay}
          onChange={(event) => setSelectedYearStay(event.target.value)}
        >
          {YEAR_OPTIONS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="room-filter-field">
        <label>Month</label>
        <select
          value={selectedMonthStay}
          onChange={(event) => setSelectedMonthStay(event.target.value)}
        >
          {MONTH_OPTIONS.map((month) => (
            <option key={month} value={month}>
              {String(month).padStart(2, "0")}
            </option>
          ))}
        </select>
      </div>

      <div className="room-filter-field">
        <label>Report Date</label>
        <input
          type="date"
          value={selectedReportDate}
          onChange={(event) => setSelectedReportDate(event.target.value)}
        />
      </div>

      <div className="room-filter-action">
        <button
          type="button"
          onClick={applyFilter}
          disabled={!selectedHotelCode}
        >
          Apply Filter
        </button>
      </div>
    </div>
  </section>
);
}