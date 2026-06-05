import {
  getYoyHotelOptions,
} from "@/services/yoy/yoy-filter.service";

import {
  getYoyCharts,
} from "@/services/yoy/yoy-chart.service";

import {
  YoyFilters,
} from "@/components/yoy/filters/YoyFilters";

import {
  YoyChartsSection,
} from "@/components/yoy/charts/YoyChartsSection";

import {
  YoyEmptyState,
} from "@/components/yoy/states/YoyEmptyState";

type Props = {
  searchParams: Promise<{
    hotelCode?: string;
    yearStay?: string;
    reportDate?: string;
  }>;
};

function getTodayDateString() {
  return new Date()
    .toISOString()
    .slice(0, 10);
}

export default async function YoyPage({
  searchParams,
}: Props) {

  const params =
    await searchParams;

  const hotelOptions =
    await getYoyHotelOptions();

  const hotelCode =
    params.hotelCode ??
    hotelOptions[0]?.hotel_code ??
    "";

  const yearStay =
    Number(
      params.yearStay
    ) ||
    new Date().getFullYear();

  const reportDate =
    params.reportDate ??
    getTodayDateString();

  if (!hotelCode) {
    return (
      <div className="space-y-6 p-6">
        <YoyFilters
          hotelCode=""
          yearStay={yearStay}
          reportDate={reportDate}
          hotelOptions={hotelOptions}
        />

        <YoyEmptyState />
      </div>
    );
  }

  const data =
    await getYoyCharts({
      hotelCode,
      yearStay,
      reportDate,
    });

  return (
    <div className="space-y-6 p-6">
      <YoyFilters
        hotelCode={hotelCode}
        yearStay={yearStay}
        reportDate={reportDate}
        hotelOptions={hotelOptions}
      />

      {data.length > 0 ? (
        <YoyChartsSection
          data={data}
        />
      ) : (
        <YoyEmptyState />
      )}
    </div>
  );
}
