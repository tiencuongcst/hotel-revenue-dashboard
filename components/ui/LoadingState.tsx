type Props = {
  message?: string;
};

export function LoadingState({
  message = 'Loading data...',
}: Props) {
  return (
    <div className='app-card p-6 text-center text-sm text-[#6c757d]'>
      {message}
    </div>
  );
}
