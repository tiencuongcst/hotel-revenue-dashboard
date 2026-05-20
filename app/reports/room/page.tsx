import { getRoomKpi } from "@/services/room/room-kpi.service";
import { getRoomCharts } from "@/services/room/room-chart.service";
import { getRoomHotelOptions } from "@/services/room/room-filter.service";

import { RoomEmptyState } from "@/components/room/states/RoomEmptyState";
import { RoomFilters } from "@/components/room/filters/RoomFilters";
import { RoomKpiTabs } from "@/components/room/tabs/RoomKpiTabs";
import { RoomChartsSection } from "@/components/room/charts/RoomChartsSection";
import { RoomTopRoomTypeCards } from "@/components/room/cards/RoomTopRoomTypeCards";

type Props = {
  searchParams: Promise<{
    hotelCode?: string;
    yearStay?: string;
    monthStay?: string;
    reportDate?: string;
  }>;
};

function getTodayDateString() {
  return new Date().toISOString().slice(0, 10);
}

export default async function RoomPage({ searchParams }: Props) {
  const params = await searchParams;

  const hotelOptions = await getRoomHotelOptions();

  const hotelCode = params.hotelCode ?? hotelOptions[0]?.hotel_code ?? "";
  const yearStay = Number(params.yearStay) || new Date().getFullYear();
  const monthStay = Number(params.monthStay) || new Date().getMonth() + 1;
  const reportDate = params.reportDate ?? getTodayDateString();

  if (!hotelCode) {
    return (
      <div className="room-module space-y-6 p-6">
        <RoomFilters
          hotelCode=""
          yearStay={yearStay}
          monthStay={monthStay}
          reportDate={reportDate}
          hotelOptions={hotelOptions}
        />

        <RoomEmptyState />
      </div>
    );
  }

  const [kpiData, chartData] = await Promise.all([
    getRoomKpi({
      hotelCode,
      yearStay,
      monthStay,
      reportDate,
    }),
    getRoomCharts({
      hotelCode,
      yearStay,
      monthStay,
      reportDate,
    }),
  ]);

  const hasData = (kpiData?.otb ?? []).length > 0;

  return (
    <div className="room-module space-y-6 p-6">
      <RoomFilters
        hotelCode={hotelCode}
        yearStay={yearStay}
        monthStay={monthStay}
        reportDate={reportDate}
        hotelOptions={hotelOptions}
      />

      <div className="rounded-xl border bg-white p-4 text-sm font-medium text-gray-700">
        Snapshot report date:{" "}
        <span className="font-semibold">
          {kpiData.snapshot_report_date || "-"}
        </span>
      </div>

      {hasData ? (
        <>
          <RoomKpiTabs data={kpiData} />

          <RoomTopRoomTypeCards
            adrRows={kpiData.adr}
            occRows={kpiData.occ}
          />

          <RoomChartsSection data={chartData} />
        </>
      ) : (
        <RoomEmptyState />
      )}
    </div>
  );
}