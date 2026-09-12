async function DashboardPage() {
  const dynamicResponse = await fetch(
    "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Seoul",
    {
      cache: "no-store",
    },
  );
  const dynamicTime = await dynamicResponse.json();
  const staticResponse = await fetch(
    "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Seoul",
    { cache: "force-cache" },
  );

  const staticTime = await staticResponse.json();
  const isrResponse = await fetch(
    "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Seoul",
    { next: { revalidate: 10 } },
  );

  const isrTime = await isrResponse.json();
  return (
    <div className="min-h-screen bg-slate-900 text-white p-12">
      <header className="mb-16 border-b border-slate-800 pb-8">
        <h1 className="text-4xl font-black italic tracking-tighter text-orange-500">
          STAT PULSE.
        </h1>
        <p className="text-slate-400 mt-2">
          Next.js 15 Caching Strategy Laboratory
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Dynamic Section */}
        <div className="p-10 bg-slate-800 rounded-[3rem] border-2 border-orange-500/30 shadow-2xl">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase">
            Dynamic Rendering
          </span>
          <h2 className="text-2xl font-bold mt-6 mb-2">실시간 서버 시간</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            이 데이터는 새로고침할 때마다 <br />
            서버에서 매번 새로 구워집니다.
          </p>
          <div className="text-3xl font-mono font-black text-orange-400 bg-black/40 p-6 rounded-2xl">
            {dynamicTime.dateTime.split("T")[1].split(".")[0]}
          </div>
        </div>

        {/* Static Section */}
        <div className="p-10 bg-slate-800 rounded-[3rem] border-2 border-slate-700 shadow-xl opacity-80">
          <span className="bg-slate-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase">
            Static Rendering
          </span>
          <h2 className="text-2xl font-bold mt-6 mb-2">고정된 시스템 시간</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            이 데이터는 빌드(Build) 시점에 <br />한 번만 가져와서 얼려졌습니다.
          </p>
          <div className="text-3xl font-mono font-black text-slate-500 bg-black/40 p-6 rounded-2xl">
            {staticTime.dateTime.split("T")[1].split(".")[0]}
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-black animate-pulse">
            ISR ACTIVE (10S)
          </span>
          <p className="text-3xl font-mono font-bold mt-2">
            {isrTime.dateTime.split("T")[1].split(".")[0]}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info Box */}
          <div className="md:col-span-2 p-10 bg-emerald-500 rounded-[2.5rem] text-black shadow-2xl shadow-emerald-500/20">
            <h2 className="font-black text-2xl mb-4 italic">
              Next.js 15 ISR 인텔리전스
            </h2>
            <p className="font-bold leading-relaxed opacity-80">
              이 대시보드는 "Stale-While-Revalidate" 전략을 사용합니다. 10초가
              지나면 첫 접속자에게는 "낡은(Stale)" 데이터를 보여주는 동안
              백그라운드에서 "새로운(Fresh)" 데이터를 구워내어 다음 접속자에게
              제공합니다.
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-16 text-center text-slate-600 text-xs font-bold uppercase tracking-[0.3em]">
        Instruction: Run [npm run build && npm start] to see the magic.
      </footer>
    </div>
  );
}

export default DashboardPage;
