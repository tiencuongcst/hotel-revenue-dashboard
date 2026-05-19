type Props = {
  message?: string;
};

export function ErrorState({
  message = 'Something went wrong while loading data.',
}: Props) {
  return (
    <div className='rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700'>
      {message}
    </div>
  );
}
