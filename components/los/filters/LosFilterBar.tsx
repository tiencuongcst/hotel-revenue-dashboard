"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { LosHotelOption } from "@/types/los";

type Props = {
  hotels: LosHotelOption[];
  selectedHotelCode: string;
  selectedReportDate: string;
  selectedYear: number;
  selectedMonth: number;
};

export function LosFilterBar({
  hotels,
  selectedHotelCode,
  selectedReportDate,
  selectedYear,
  selectedMonth,
}: Props) {
  const router = useRouter();

  const [hotelCode, setHotelCode] = useState(selectedHotelCode);
  const [year, setYear] = useState(String(selectedYear));
  const [month, setMonth] = useState(String(selectedMonth));
  const [reportDate, setReportDate] = useState(selectedReportDate);

  const yearOptions = Array.from({ length: 13 }, (_, index) => 2023 + index);
  const monthOptions = Array.from({ length: 12 }, (_, index) => index + 1);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();

    params.set("hotel_code", hotelCode);
    params.set("year", year);
    params.set("month", month);
    params.set("report_date", reportDate);

    router.push(`/reports/los?${params.toString()}`);
  }

  return (
    <form className="los-filter-card" onSubmit={handleSubmit}>
      <div className="los-filter-group los-filter-hotel">
        <label>HOTEL</label>

        <select
          value={hotelCode}
          onChange={(event) => setHotelCode(event.target.value)}
        >
          {hotels.map((hotel) => (
            <option key={hotel.hotel_code} value={hotel.hotel_code}>
              {hotel.hotel_name}
            </option>
          ))}
        </select>
      </div>

      <div className="los-filter-group los-filter-year">
        <label>YEAR</label>

        <select value={year} onChange={(event) => setYear(event.target.value)}>
          {yearOptions.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
      </div>

      <div className="los-filter-group los-filter-month">
        <label>MONTH</label>

        <select value={month} onChange={(event) => setMonth(event.target.value)}>
          {monthOptions.map((monthOption) => (
            <option key={monthOption} value={monthOption}>
              {String(monthOption).padStart(2, "0")}
            </option>
          ))}
        </select>
      </div>

      <div className="los-filter-group los-filter-date">
        <label>REPORT DATE</label>

        <input
          type="date"
          value={reportDate}
          onChange={(event) => setReportDate(event.target.value)}
        />
      </div>

      <button className="los-filter-button" type="submit">
        Apply Filter
      </button>
    </form>
  );
}