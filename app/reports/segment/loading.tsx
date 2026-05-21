export default function SegmentReportLoading() {
  return (
    <main className="space-y-5 p-4 md:p-6">
      <div className="space-y-2">
        <div className="h-8 w-64 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-96 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="h-28 animate-pulse rounded-2xl bg-slate-200" />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="h-80 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-80 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    </main>
  );
}