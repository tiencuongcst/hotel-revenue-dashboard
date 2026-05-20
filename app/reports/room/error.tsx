"use client";

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({
  error,
  reset,
}: Props) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <div className="text-2xl font-bold text-red-600">
        Room Report Error
      </div>

      <div className="max-w-xl text-center text-gray-500">
        {error.message}
      </div>

      <button
        onClick={() => reset()}
        className="rounded-lg bg-black px-4 py-2 text-white"
      >
        Retry
      </button>
    </div>
  );
}