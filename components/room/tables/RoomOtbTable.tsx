type RoomDailyValue = {
  day: string;
  value: number | string | null;
};

type RoomOtbRow = {
  room_code: string;
  room_name: string;
  values: RoomDailyValue[];
  month_total: number | string | null;
};

type Props = {
  data: RoomOtbRow[];
};

export function RoomOtbTable({ data }: Props) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="room-report-table-wrapper">
      <table className="room-report-table">
        <thead>
          <tr>
            <th className="room-type-cell">Room Type</th>

            {data[0].values.map((item) => (
              <th key={item.day}>{item.day}</th>
            ))}

            <th>Month Total</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.room_code}>
              <td className="room-type-cell">
                {row.room_name}
              </td>

              {row.values.map((item) => (
                <td key={`${row.room_code}-${item.day}`}>
                  {item.value ?? "-"}
                </td>
              ))}

              <td>{row.month_total ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}