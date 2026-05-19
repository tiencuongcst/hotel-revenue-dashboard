type Props = {
  title?: string;
  message?: string;
};

export function EmptyState({
  title = 'No data',
  message = 'There is no data available for the selected filters.',
}: Props) {
  return (
    <div className='app-card p-6 text-center'>
      <h3 className='font-bold text-[#212529]'>{title}</h3>
      <p className='mt-1 text-sm text-[#6c757d]'>{message}</p>
    </div>
  );
}
