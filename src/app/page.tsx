import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-48px)] flex flex-col items-center justify-center bg-white text-slate-900">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-black italic tracking-tighter">NEXUS.</h1>
        <p className="text-slate-500">
          전역 레이아웃만 적용된 메인 화면입니다.
        </p>
        <div>
          <Link
            href="/dashboard"
            className="px-12 py-5 bg-emerald-600 text-white text-lg font-black rounded-full shadow-2xl shadow-emerald-200 hover:bg-emerald-700 hover:scale-105 transition-all"
          >
            대시보드 입장하기
          </Link>
        </div>
      </div>
    </div>
  );
}
