// src/app/(app)/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-black">
      <div className="mb-8 bg-indigo-50 border border-indigo-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex-shrink-0">
          P
        </div>
        <div>
          <h3 className="text-indigo-900 font-bold text-sm mb-1">
            Page Component Area
          </h3>
          <p className="text-sm text-indigo-700/80">
            이 영역이 실제{" "}
            <code className="bg-white/60 px-1.5 py-0.5 rounded font-mono text-xs text-indigo-800">
              dashboard/page.tsx
            </code>{" "}
            파일입니다.
          </p>
        </div>
      </div>
      {/* 통계 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow">
          <h3 className="text-slate-500 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-slate-800 mt-2">1,248</p>
        </div>
      </div>
    </div>
  );
}
