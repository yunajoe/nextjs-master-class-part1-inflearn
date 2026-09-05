interface LogProps {
  params: Promise<{ path?: string[] }>;
}

export default async function HardwareLogExplorer({ params }: LogProps) {
  // [1] 비동기 파라미터 배열 추출
  // path가 없으면 빈 배열([])로 처리하여 기본 화면을 렌더링합니다.
  const { path = [] } = await params;

  return (
    <div className="bg-slate-950 p-12 rounded-[3.5rem] border-8 border-slate-900 shadow-2xl font-mono text-emerald-400">
      <div className="flex items-center gap-4 mb-10 border-b border-emerald-900/50 pb-6">
        <div className="h-4 w-4 rounded-full bg-red-500 animate-ping" />
        <h2 className="text-2xl font-black uppercase tracking-widest">
          Diagnostic Shell v2.0
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-slate-500 text-xs font-bold uppercase mb-2">
            # Access Cluster Path
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="text-white">ROOT</span>
            {path.map((segment, idx) => (
              <span key={idx} className="flex gap-2">
                <span className="text-slate-700">/</span>
                <span className="px-2 bg-emerald-950 rounded text-emerald-300">
                  {segment}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 p-8 bg-black/40 rounded-2xl border border-emerald-900/30">
          <p className="text-xs mb-2 opacity-50">
            &gt; Scanning hardware hierarchy depth: {path.length}
          </p>
          <p className="text-xs text-blue-400">
            &gt; [SYSTEM] Encryption layer secured via Private Folders.
          </p>
          <p className="text-xs text-white animate-pulse mt-4">
            &gt; Listening for diagnostic packets...
          </p>
        </div>
      </div>
    </div>
  );
}
