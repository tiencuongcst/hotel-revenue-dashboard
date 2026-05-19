export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-3">
        <div className="h-10 w-80 rounded bg-gray-200" />
        <div className="h-5 w-96 rounded bg-gray-100" />
      </div>

      {/* Filters */}
      <div className="app-card">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-20 rounded bg-gray-200" />
              <div className="h-11 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Summary table */}
      <div className="app-card space-y-4">
        <div className="h-8 w-64 rounded bg-gray-200" />

        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-12 rounded bg-gray-100"
            />
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="app-card space-y-4"
          >
            <div className="h-7 w-48 rounded bg-gray-200" />

            <div className="h-[320px] rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}