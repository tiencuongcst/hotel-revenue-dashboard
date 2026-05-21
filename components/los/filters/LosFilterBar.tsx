type LosHotelOption = {
  hotel_code: string;
  hotel_name?: string | null;
};

type LosFilterBarProps = {
  hotels?: LosHotelOption[];
  selectedHotelCode?: string;
  selectedYear?: number;
  selectedMonth?: number;
};

const YEAR_OPTIONS = Array.from({ length: 13 }, (_, index) => 2023 + index);

const MONTH_OPTIONS = Array.from({ length: 12 }, (_, index) => index + 1);

export function LosFilterBar({
  hotels = [],
  selectedHotelCode = "",
  selectedYear = new Date().getFullYear(),
  selectedMonth = new Date().getMonth() + 1,
}: LosFilterBarProps) {
  const safeHotels = Array.isArray(hotels) ? hotels : [];

  return (
    <form className="los-filter-card">
      <div className="los-filter-grid">
        <div className="los-filter-field">
          <label htmlFor="hotel_code" className="los-filter-label">
            Hotel
          </label>
          <select
            id="hotel_code"
            name="hotel_code"
            defaultValue={selectedHotelCode}
            className="los-filter-input"
          >
            {safeHotels.length === 0 ? (
              <option value="">No hotel</option>
            ) : (
              safeHotels.map((hotel) => (
                <option key={hotel.hotel_code} value={hotel.hotel_code}>
                  {hotel.hotel_name ?? hotel.hotel_code}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="los-filter-field">
          <label htmlFor="year" className="los-filter-label">
            Year
          </label>
          <select
            id="year"
            name="year"
            defaultValue={selectedYear}
            className="los-filter-input"
          >
            {YEAR_OPTIONS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="los-filter-field">
          <label htmlFor="month" className="los-filter-label">
            Month
          </label>
          <select
            id="month"
            name="month"
            defaultValue={selectedMonth}
            className="los-filter-input"
          >
            {MONTH_OPTIONS.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="los-filter-button">
          Apply
        </button>
      </div>
    </form>
  );
}