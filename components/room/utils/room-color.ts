export type RoomKpiFormatType =
  | "number"
  | "currency"
  | "percent";

type Params = {
  value?: number;
  formatType: RoomKpiFormatType;
};

export function getRoomCellClassName({
  value,
  formatType,
}: Params) {
  if (value == null) {
    return "text-gray-400";
  }

  if (formatType === "percent") {
    if (value > 1) {
      return "bg-red-100 text-red-700 font-semibold";
    }

    if (value >= 0.8) {
      return "bg-green-100 text-green-700 font-semibold";
    }

    if (value >= 0.5) {
      return "bg-yellow-100 text-yellow-700";
    }

    return "text-gray-700";
  }

  return "text-gray-700";
}