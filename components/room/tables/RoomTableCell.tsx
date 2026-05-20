type Props = {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  bold?: boolean;
};

export function RoomTableCell({
  children,
  align = "center",
  bold = false,
}: Props) {
  return (
    <td
      className={`
        border border-gray-300
        px-2 py-1
        text-[13px]
        whitespace-nowrap
        ${align === "left" ? "text-left" : ""}
        ${align === "center" ? "text-center" : ""}
        ${align === "right" ? "text-right" : ""}
        ${bold ? "font-semibold" : ""}
      `}
    >
      {children}
    </td>
  );
}