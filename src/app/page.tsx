import Link from "next/link";

export default function Home() {
  return (
    <div className="p-20 flex flex-col items-center text-center">
      <h1 className="text-6xl font-black mb-6 italic tracking-tighter uppercase">
        THE FUTURE.
      </h1>
      <p className="text-slate-500 text-xl mb-12">
        단 하나의 파일로 시작하는 10만 개의 가능성
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <Link
          href="/products/galaxy-s24"
          className="p-10 bg-blue-600 text-white rounded-[2.5rem] font-black text-2xl shadow-xl hover:scale-105 transition-all"
        >
          📦 단일 동적 라우팅 테스트
        </Link>
        <Link
          href="/shop/audio/airpods-max"
          className="p-10 bg-emerald-600 text-white rounded-[2.5rem] font-black text-2xl shadow-xl hover:scale-105 transition-all"
        >
          📂 중첩 동적 라우팅 테스트
        </Link>
        <Link
          href="/products/new-arrival"
          className="md:col-span-2 p-8 bg-slate-900 text-white rounded-[2.5rem] font-black text-2xl shadow-xl hover:bg-black transition-all"
        >
          🔥 우선순위(Static vs Dynamic) 테스트
        </Link>
      </div>
    </div>
  );
}
