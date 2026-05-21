import SegmentFilters from "@/components/segment/filters/SegmentFilters";
import SegmentTabs from "@/components/segment/tabs/SegmentTabs";

import { getSegmentMonthlyPerformance } from "@/services/segment/segment-performance.service";
import { getSegmentPickupDaily } from "@/services/segment/segment-pickup.service";
import { getSegmentDefaultFilters } from "@/services/segment/segment-filter.service";
import { getSegmentHotelOptions } from "@/services/segment/segment-hotel.service";

import type { SegmentFilters as SegmentFiltersType } from "@/types/segment/segment-filter.types";

function formatDateForInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDefaultPaceDates() {
  const pace2Date = new Date();
  const pace1Date = new Date();

  pace1Date.setDate(pace2Date.getDate() - 1);

  return {
    pace1Date: formatDateForInput(pace1Date),
    pace2Date: formatDateForInput(pace2Date),
  };
}

export default async function SegmentReportPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;

  const [defaultFilters, hotelOptions] = await Promise.all([
    getSegmentDefaultFilters(),
    getSegmentHotelOptions(),
  ]);

  const defaultPaceDates = getDefaultPaceDates();

  const filters: SegmentFiltersType = {
    hotelCode: params.hotel_code ?? defaultFilters.hotelCode,
    stayYear: Number(params.stay_year) || defaultFilters.stayYear,
    stayMonth: Number(params.stay_month) || defaultFilters.stayMonth,
    reportDate: params.report_date ?? defaultFilters.reportDate,

    // Daily Pickup:
    // Pace 1 mặc định = hôm qua
    // Pace 2 mặc định = hôm nay
    // Nếu user chọn lại trên filter thì ưu tiên query params
    pace1Date: params.pace1 ?? defaultPaceDates.pace1Date,
    pace2Date: params.pace2 ?? defaultPaceDates.pace2Date,
  };

  if (!filters.hotelCode || !filters.reportDate) {
    return (
      <main className="space-y-5 bg-slate-50 p-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Market Segment
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Performance and daily pickup by segment group
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Không tìm thấy dữ liệu mặc định từ <b>vw_segment_daily</b>. Kiểm tra
          view có data hoặc quyền đọc Supabase API.
        </div>
      </main>
    );
  }

  const [performanceRows, pickupRows] = await Promise.all([
    getSegmentMonthlyPerformance({
      hotelCode: filters.hotelCode,
      stayYear: filters.stayYear,
      reportDate: filters.reportDate,
    }),
    getSegmentPickupDaily({
      hotelCode: filters.hotelCode,
      stayYear: filters.stayYear,
      stayMonth: filters.stayMonth,
      pace1Date: filters.pace1Date,
      pace2Date: filters.pace2Date,
    }),
  ]);

  return (
    <main className="space-y-5 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Market Segment
        </h1>
        <p className="text-sm text-slate-500">
          Performance and daily pickup by segment group
        </p>
      </div>

      <SegmentFilters filters={filters} hotelOptions={hotelOptions} />

      <SegmentTabs
        performanceRows={performanceRows}
        pickupRows={pickupRows}
        stayYear={filters.stayYear}
        stayMonth={filters.stayMonth}
      />
    </main>
  );
}