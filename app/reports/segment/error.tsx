"use client";

export default function SegmentReportError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="space-y-4 p-4 md:p-6">
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
        <h1 className="text-lg font-semibold text-rose-700">
          Cannot load Segment Report
        </h1>

        <p className="mt-1 text-sm text-rose-600">
          {error.message}
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white"
        >
          Try again
        </button>
      </div>
    </main>
  );
}