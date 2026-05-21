"use client";

import { useState } from "react";

import type {
  LosMonthlyActualRow,
} from "@/types/los";

import { LosBarCharts } from "@/components/los/charts/LosBarCharts";
import { LosTrendCharts } from "@/components/los/charts/LosTrendCharts";

type Props = {
  monthlyRows: LosMonthlyActualRow[];
  trendRows: LosMonthlyActualRow[];
};

export function LosTabs({
  monthlyRows,
  trendRows,
}: Props) {
  const [activeTab, setActiveTab] =
    useState<"monthly" | "trend">(
      "monthly"
    );

  return (
    <div>
      <div className="los-tab-row">
        <button
          type="button"
          className={
            activeTab === "monthly"
              ? "los-tab active"
              : "los-tab"
          }
          onClick={() =>
            setActiveTab("monthly")
          }
        >
          Monthly
        </button>

        <button
          type="button"
          className={
            activeTab === "trend"
              ? "los-tab active"
              : "los-tab"
          }
          onClick={() =>
            setActiveTab("trend")
          }
        >
          Trend
        </button>
      </div>

      {activeTab === "monthly" ? (
        <LosBarCharts
          rows={monthlyRows}
        />
      ) : (
        <LosTrendCharts
          rows={trendRows}
        />
      )}
    </div>
  );
}