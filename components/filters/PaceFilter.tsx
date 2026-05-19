// components/filters/PaceFilter.tsx

type PaceFilterProps = {
  hotelCode: string
  stayYear: number
  stayMonth: number
  reportDate1: string
  reportDate2: string
}

export default function PaceFilter({
  hotelCode,
  stayYear,
  stayMonth,
  reportDate1,
  reportDate2,
}: PaceFilterProps) {
  return (
    <form className="app-card" method="GET" action="/reports/pace">
      <div className="pace-filter-grid">
        <div className="pace-filter-field">
          <label>Hotel</label>
          <select name="hotel_code" value={hotelCode} onChange={() => {}}>
            {hotels.map((hotel) => (
  <option
    key={hotel.hotel_code}
    value={hotel.hotel_code}
  >
    {hotel.hotel_name ?? hotel.hotel_code}
  </option>
))}
          </select>
        </div>

        <div className="pace-filter-field">
          <label>Year</label>
          <select
            name="stay_year"
            value={String(stayYear)}
            onChange={() => {}}
          >
            {Array.from({ length: 13 }, (_, index) => 2023 + index).map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
        </div>

        <div className="pace-filter-field">
          <label>Month</label>
          <select
            name="stay_month"
            value={String(stayMonth)}
            onChange={() => {}}
          >
            {Array.from({ length: 12 }, (_, index) => index + 1).map(
              (month) => (
                <option key={month} value={month}>
                  {month.toString().padStart(2, "0")}
                </option>
              )
            )}
          </select>
        </div>

        <div className="pace-filter-field">
          <label>Pace 1</label>
          <input
            key={`report-date-1-${reportDate1}`}
            name="report_date_1"
            type="date"
            defaultValue={reportDate1}
          />
        </div>

        <div className="pace-filter-field">
          <label>Pace 2</label>
          <input
            key={`report-date-2-${reportDate2}`}
            name="report_date_2"
            type="date"
            defaultValue={reportDate2}
          />
        </div>

        <button type="submit" className="app-button-primary pace-filter-button">
          Apply Filter
        </button>
      </div>
    </form>
  )
}