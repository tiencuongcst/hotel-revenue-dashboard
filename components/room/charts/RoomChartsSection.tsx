import type {
  RoomChartResponse,
} from "@/types/room/room-chart.types";

import {
  transformRoomChartData,
} from "@/components/room/utils/room-chart-transform";

import {
  RoomAdrDailyChart,
} from "@/components/room/charts/RoomAdrDailyChart";

import {
  RoomOccDailyChart,
} from "@/components/room/charts/RoomOccDailyChart";

type Props = {
  data: RoomChartResponse;
};

export function RoomChartsSection({
  data,
}: Props) {
  const adrData =
    transformRoomChartData(data.adr_daily);

  const occData =
    transformRoomChartData(data.occ_daily);

  return (
    <div className="space-y-6">
      {/* <RoomAdrDailyChart data={adrData} /> */}

      {/* <RoomOccDailyChart data={occData} /> */}
    </div>
  );
}