import { PerformanceDailyActualCharts } from '@/components/charts/PerformanceDailyActualCharts';

import { PerformancePickupOccChart } from '@/components/charts/PerformancePickupOccChart';

import { PerformanceFilters } from '@/components/filters/PerformanceFilters';

import { PerformanceSummaryTable } from '@/components/tables/PerformanceSummaryTable';

import { PageHeader } from '@/components/ui/PageHeader';

import { getHotelOptions } from '@/services/hotel.service';

import {
  getPerformanceModuleData,
  getPerformancePickupOccCurve,
} from '@/services/performance.service';

import type { PerformanceSearchParams } from '@/types/performance';

export const dynamic = 'force-dynamic';

export const revalidate = 0;

type Props = {
  searchParams: Promise<PerformanceSearchParams>;
};

export default async function PerformancePage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const hotels = await getHotelOptions();

  const today = new Date()
    .toISOString()
    .slice(0, 10);

  const currentYear =
    new Date().getFullYear();

  const currentMonth =
    new Date().getMonth() + 1;

  const hotelCode =
    params.hotel_code ??
    hotels[0]?.hotel_code;

  if (!hotelCode) {
    throw new Error(
      'No hotel code found'
    );
  }

  const selectedHotel = hotels.find(
    (hotel) =>
      hotel.hotel_code === hotelCode
  );

  const hotelName =
    selectedHotel?.hotel_name ??
    hotelCode;

  const stayYear = Number(
    params.stay_year ?? currentYear
  );

  const stayMonth = Number(
    params.stay_month ?? currentMonth
  );

  const reportDate =
    params.report_date ?? today;

  const {
    performanceTable,
    dailyActual,
  } = await getPerformanceModuleData({
    hotelCode,
    stayYear,
    stayMonth,
    reportDate,
  });

  const pickupOccCurve =
    await getPerformancePickupOccCurve({
      hotelCode,
      stayYear,
      stayMonth,
      reportDate,
    });

  return (
    <>
      <PageHeader
        title="Performance Report"
        description={`${hotelName} | Stay Month: ${stayMonth}/${stayYear} | Report Date: ${reportDate}`}
      />

      <PerformanceFilters hotels={hotels} />

      <PerformanceSummaryTable
        rows={performanceTable}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <PerformancePickupOccChart
          rows={pickupOccCurve}
        />

        <PerformanceDailyActualCharts
          title="Occupancy for Month"
          rows={dailyActual}
          type="occupancy"
        />

        <PerformanceDailyActualCharts
          title="Occupancy & ADR for Month"
          rows={dailyActual}
          type="adr_occ"
        />

        <PerformanceDailyActualCharts
          title="Revenue for Month"
          rows={dailyActual}
          type="revenue"
        />

        <PerformanceDailyActualCharts
          title="RevPAR for Month"
          rows={dailyActual}
          type="revpar"
        />
      </div>
    </>
  );
}