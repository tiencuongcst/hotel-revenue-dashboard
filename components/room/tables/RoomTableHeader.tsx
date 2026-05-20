type Props = {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
};

export function RoomTableHeader({
  children,
  align = "center",
}: Props) {
  return (
    <th
      className={`
        border border-gray-300
        bg-gray-100
        px-2 py-1
        text-[13px]
        font-semibold
        whitespace-nowrap
        ${align === "left" ? "text-left" : ""}
        ${align === "center" ? "text-center" : ""}
        ${align === "right" ? "text-right" : ""}
      `}
    >
      {children}
    </th>
  );
}