import type {
  YoyChartResponse,
} from "@/types/yoy/yoy-chart.types";

import {
  YoyOccChart,
} from "@/components/yoy/charts/YoyOccChart";

import {
  YoyRevenueChart,
} from "@/components/yoy/charts/YoyRevenueChart";

import {
  YoyAdrChart,
} from "@/components/yoy/charts/YoyAdrChart";

type Props = {
  data: YoyChartResponse;
};

export function YoyChartsSection({
  data,
}: Props) {
  return (
    <div className="space-y-6">
      <YoyOccChart rows={data} />

      <YoyRevenueChart rows={data} />

      <YoyAdrChart rows={data} />
    </div>
  );
}
