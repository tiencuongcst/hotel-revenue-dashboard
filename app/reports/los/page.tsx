import "@/styles/los.css";

import { LosFilterBar } from "@/components/los/filters/LosFilterBar";
import { LosTabs } from "@/components/los/tabs/LosTabs";
import { LosEmptyState } from "@/components/los/states/LosEmptyState";

import {
  getLosHotels,
  getLosMonthlyActual,
  getLosYearlyTrend,
} from "@/services/los/los.service";

type LosSearchParams = {
  hotel_code?: string;
  year?: string;
  month?: string;
};

type LosPageProps = {
  searchParams: Promise<LosSearchParams>;
};

export default async function LosPage({ searchParams }: LosPageProps) {
  const params = await searchParams;

  const hotels = await getLosHotels();

  const selectedHotelCode =
    params.hotel_code ?? hotels[0]?.hotel_code ?? "";

  const selectedYear = Number(params.year ?? new Date().getFullYear());

  const selectedMonth = Number(params.month ?? new Date().getMonth() + 1);

  const monthlyRows = selectedHotelCode
    ? await getLosMonthlyActual({
        hotelCode: selectedHotelCode,
        stayYear: selectedYear,
        stayMonth: selectedMonth,
      })
    : [];

  const trendRows = selectedHotelCode
    ? await getLosYearlyTrend({
        hotelCode: selectedHotelCode,
        stayYear: selectedYear,
      })
    : [];

  return (
    <main className="los-page">
      <h1 className="los-title">Length Of Stay</h1>

      <p className="los-subtitle">
        Lead time and length of stay by segment group
      </p>

      <LosFilterBar
        hotels={hotels}
        selectedHotelCode={selectedHotelCode}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
      />

      {monthlyRows.length > 0 || trendRows.length > 0 ? (
        <LosTabs monthlyRows={monthlyRows} trendRows={trendRows} />
      ) : (
        <LosEmptyState />
      )}
    </main>
  );
}