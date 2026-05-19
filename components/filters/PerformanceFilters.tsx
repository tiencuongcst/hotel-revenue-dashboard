'use client';

import { FormEvent, useMemo, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { HotelOption } from '@/types/hotel';

type Props = {
  hotels: HotelOption[];
};

function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

export function PerformanceFilters({ hotels }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const today = getTodayIsoDate();

  const years = useMemo(
    () => Array.from({ length: 13 }, (_, index) => 2023 + index),
    []
  );

  const months = useMemo(
    () => Array.from({ length: 12 }, (_, index) => index + 1),
    []
  );

  const defaultHotelCode =
    searchParams.get('hotel_code') ?? hotels[0]?.hotel_code ?? '';

  const [hotelCode, setHotelCode] = useState(defaultHotelCode);
  const [stayYear, setStayYear] = useState(
    searchParams.get('stay_year') ?? String(currentYear)
  );
  const [stayMonth, setStayMonth] = useState(
    searchParams.get('stay_month') ?? String(currentMonth)
  );
  const [reportDate, setReportDate] = useState(
    searchParams.get('report_date') ?? today
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextParams = new URLSearchParams();

    nextParams.set('hotel_code', hotelCode);
    nextParams.set('stay_year', stayYear);
    nextParams.set('stay_month', stayMonth);
    nextParams.set('report_date', reportDate);

    startTransition(() => {
      router.replace(`/reports/performance?${nextParams.toString()}`);
    });
  }

  return (
    <>
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="rounded-2xl bg-white px-6 py-5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-emerald-700 border-t-transparent" />
              <span className="font-semibold text-emerald-900">
                Loading report...
              </span>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="app-card mb-6">
        <div className="performance-filter-grid">
          <div className="performance-filter-field">
            <label htmlFor="performance-hotel">Hotel</label>
            <select
              id="performance-hotel"
              name="hotel_code"
              value={hotelCode}
              onChange={(event) => setHotelCode(event.target.value)}
              className="app-input"
              disabled={isPending}
            >
              {hotels.map((hotel) => (
                <option key={hotel.hotel_code} value={hotel.hotel_code}>
                  {hotel.hotel_name ?? hotel.hotel_code}
                </option>
              ))}
            </select>
          </div>

          <div className="performance-filter-field">
            <label htmlFor="performance-year">Year</label>
            <select
              id="performance-year"
              name="stay_year"
              value={stayYear}
              onChange={(event) => setStayYear(event.target.value)}
              className="app-input"
              disabled={isPending}
            >
              {years.map((year) => (
                <option key={year} value={String(year)}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="performance-filter-field">
            <label htmlFor="performance-month">Month</label>
            <select
              id="performance-month"
              name="stay_month"
              value={stayMonth}
              onChange={(event) => setStayMonth(event.target.value)}
              className="app-input"
              disabled={isPending}
            >
              {months.map((month) => (
                <option key={month} value={String(month)}>
                  {month.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>

          <div className="performance-filter-field">
            <label htmlFor="performance-report-date">Report Date</label>
            <input
              id="performance-report-date"
              name="report_date"
              type="date"
              value={reportDate}
              onChange={(event) => setReportDate(event.target.value)}
              className="app-input"
              disabled={isPending}
            />
          </div>

          <button
            type="submit"
            className="app-button-primary performance-filter-button"
            disabled={isPending}
          >
            {isPending ? 'Loading...' : 'Apply Filter'}
          </button>
        </div>
      </form>
    </>
  );
}