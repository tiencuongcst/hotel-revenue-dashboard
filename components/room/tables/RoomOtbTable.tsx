import { RoomTableCell } from "./RoomTableCell";
import { RoomTableHeader } from "./RoomTableHeader";
import { RoomTableRow } from "./RoomTableRow";

type Props = {
  data: any[];
};

export function RoomRevTable({
  data,
}: Props) {
  if (!data?.length) {
    return null;
  }

  const days = Object.keys(data[0].values ?? {});

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[12px]">
        <thead>
          <tr>
            <RoomTableHeader align="left">
              Room Type
            </RoomTableHeader>

            {days.map((day) => (
              <RoomTableHeader key={day}>
                {day}
              </RoomTableHeader>
            ))}

            <RoomTableHeader isMonthTotal>
              Month Total
            </RoomTableHeader>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <RoomTableRow key={row.room_code}>
              <RoomTableCell
                align="left"
                bold
              >
                {row.room_name}
              </RoomTableCell>

              {days.map((day) => (
                <RoomTableCell key={day}>
                  {row.values?.[day] ?? "-"}
                </RoomTableCell>
              ))}

              <RoomTableCell bold isMonthTotal>
                {row.month_total}
              </RoomTableCell>
            </RoomTableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}