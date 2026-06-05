"use client";

import {
  FormEvent,
  useMemo,
  useState,
  useTransition,
} from "react";

import {
  useRouter,
} from "next/navigation";

import type {
  YoyHotelOption,
} from "@/types/yoy/yoy-filter.types";

type Props = {
  hotelCode: string;
  yearStay: number;
  reportDate: string;
  hotelOptions?: YoyHotelOption[];
};

export function YoyFilters({
  hotelCode,
  yearStay,
  reportDate,
  hotelOptions = [],
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const years =
    useMemo(
      () =>
        Array.from(
          { length: 2035 - 2023 + 1 },
          (_, index) => 2023 + index
        ),
      []
    );

  const [selectedHotelCode, setSelectedHotelCode] =
    useState(hotelCode);

  const [selectedYearStay, setSelectedYearStay] =
    useState(String(yearStay));

  const [selectedReportDate, setSelectedReportDate] =
    useState(reportDate);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const nextParams =
      new URLSearchParams();

    nextParams.set(
      "hotelCode",
      selectedHotelCode
    );

    nextParams.set(
      "yearStay",
      selectedYearStay
    );

    nextParams.set(
      "reportDate",
      selectedReportDate
    );

    startTransition(() => {
      router.replace(
        `/reports/yoy?${nextParams.toString()}`
      );
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

      <form
        onSubmit={handleSubmit}
        className="app-card mb-6"
      >
        <div className="performance-filter-grid">
          <div className="performance-filter-field">
            <label htmlFor="yoy-hotel">
              Hotel
            </label>

            <select
              id="yoy-hotel"
              name="hotelCode"
              value={selectedHotelCode}
              onChange={(event) =>
                setSelectedHotelCode(
                  event.target.value
                )
              }
              className="app-input"
              disabled={
                isPending ||
                hotelOptions.length === 0
              }
            >
              {hotelOptions.length === 0 ? (
                <option value="">
                  No hotel
                </option>
              ) : (
                hotelOptions.map((hotel) => (
                  <option
                    key={hotel.hotel_code}
                    value={hotel.hotel_code}
                  >
                    {hotel.hotel_name ??
                      hotel.hotel_code}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="performance-filter-field">
            <label htmlFor="yoy-year">
              Year
            </label>

            <select
              id="yoy-year"
              name="yearStay"
              value={selectedYearStay}
              onChange={(event) =>
                setSelectedYearStay(
                  event.target.value
                )
              }
              className="app-input"
              disabled={isPending}
            >
              {years.map((year) => (
                <option
                  key={year}
                  value={String(year)}
                >
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="performance-filter-field">
            <label htmlFor="yoy-report-date">
              Report Date
            </label>

            <input
              id="yoy-report-date"
              name="reportDate"
              type="date"
              value={selectedReportDate}
              onChange={(event) =>
                setSelectedReportDate(
                  event.target.value
                )
              }
              className="app-input"
              disabled={isPending}
            />
          </div>

          <button
            type="submit"
            className="app-button-primary performance-filter-button"
            disabled={
              isPending ||
              !selectedHotelCode
            }
          >
            {isPending
              ? "Loading..."
              : "Apply Filter"}
          </button>
        </div>
      </form>
    </>
  );
}
