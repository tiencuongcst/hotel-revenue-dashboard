type Column<T> = {
  key: keyof T | string;
  label: string;
  align?: 'left' | 'right';
  render?: (row: T) => React.ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => string;
};

export function DataTable<T>({
  columns,
  rows,
  rowKey,
}: Props<T>) {
  return (
    <div className='data-table-wrapper'>
      <table className='data-table'>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={column.align === 'right' ? 'text-right' : ''}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={rowKey(row, index)}>
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className={column.align === 'right' ? 'text-right' : ''}
                >
                  {column.render
                    ? column.render(row)
                    : String((row as Record<string, unknown>)[String(column.key)] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
