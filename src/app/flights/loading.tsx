export default function FlightsLoading() {
  return (
    <div className="p-10 space-y-10">
      <div className="h-10 w-64 bg-slate-200 rounded-lg animate-pulse" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm space-y-6"
          >
            <div className="h-8 w-3/4 bg-slate-100 rounded animate-pulse" />
            <div className="h-6 w-1/4 bg-slate-100 rounded animate-pulse" />
            <div className="h-12 w-full bg-slate-50 rounded-2xl mt-4 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
