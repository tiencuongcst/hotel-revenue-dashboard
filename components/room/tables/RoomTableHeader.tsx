type Props = {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  isMonthTotal?: boolean;
};

export function RoomTableHeader({
  children,
  align = "center",
  isMonthTotal = false,
}: Props) {
  return (
    <th
      className={`
        border border-gray-300
        bg-gray-100
        px-2 py-1
        text-[12px]
        whitespace-nowrap
        ${align === "left" ? "text-left" : ""}
        ${align === "center" ? "text-center" : ""}
        ${align === "right" ? "text-right" : ""}
        ${
          isMonthTotal
            ? "font-bold text-green-700"
            : "font-semibold"
        }
      `}
    >
      {children}
    </th>
  );
}