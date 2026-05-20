type Props = {
  children: React.ReactNode;
};

export function RoomTableRow({
  children,
}: Props) {
  return (
    <tr className="hover:bg-gray-50">
      {children}
    </tr>
  );
}