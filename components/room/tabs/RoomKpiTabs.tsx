"use client";

import { useState } from "react";

import {
  RoomKpiResponse,
  RoomKpiRow,
} from "@/types/room/room-kpi.types";

import { RoomKpiTable } from "@/components/room/tables/RoomKpiTable";

type KpiKey = "otb" | "occ" | "rev" | "adr" | "revpar";

type KpiConfig = {
  key: KpiKey;
  label: string;
  formatType: "number" | "currency" | "percent";
};

const KPI_CONFIG: KpiConfig[] = [
  {
    key: "otb",
    label: "OTB",
    formatType: "number",
  },
  {
    key: "occ",
    label: "OCC",
    formatType: "percent",
  },
  {
    key: "rev",
    label: "REV",
    formatType: "currency",
  },
  {
    key: "adr",
    label: "ADR",
    formatType: "currency",
  },
  {
    key: "revpar",
    label: "REVPAR",
    formatType: "currency",
  },
];

type Props = {
  data: RoomKpiResponse;
};

export function RoomKpiTabs({ data }: Props) {
  const [activeKey, setActiveKey] = useState<KpiKey>("otb");

  const activeConfig =
    KPI_CONFIG.find((item) => item.key === activeKey) ??
    KPI_CONFIG[0];

  const rows = data[activeConfig.key] as RoomKpiRow[];

  return (
  <div className="space-y-4">
    <div className="room-kpi-tabs">
      {KPI_CONFIG.map((item) => {
        const isActive = item.key === activeKey;

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => setActiveKey(item.key)}
            className={[
              "room-kpi-tab",
              isActive ? "active" : "",
            ].join(" ")}
          >
            {item.label}
          </button>
        );
      })}
    </div>

    <RoomKpiTable
      title={activeConfig.label}
      rows={rows}
      formatType={activeConfig.formatType}
    />
  </div>
);
}