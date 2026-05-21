type Props = {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  bold?: boolean;
  isMonthTotal?: boolean;
};

export function RoomTableCell({
  children,
  align = "center",
  bold = false,
  isMonthTotal = false,
}: Props) {
  return (
    <td
      className={`
        border border-gray-300
        px-2 py-1
        text-[12px]
        whitespace-nowrap
        ${align === "left" ? "text-left" : ""}
        ${align === "center" ? "text-center" : ""}
        ${align === "right" ? "text-right" : ""}
        ${bold ? "font-semibold" : ""}
        ${
          isMonthTotal
            ? "font-bold text-green-700 bg-green-50"
            : ""
        }
      `}
    >
      {children}
    </td>
  );
}