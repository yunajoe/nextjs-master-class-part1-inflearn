import Link from "next/link";
import "../globals.css";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="flex h-screen bg-slate-100 font-sans text-slate-800">
        {/* 사이드 네비게이션 */}
        <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col z-20">
          <div className="h-20 flex items-center px-6 border-b border-slate-800">
            <span className="text-xl font-black tracking-widest text-emerald-400">
              LUMIERE POS
            </span>
          </div>
          <nav className="flex-1 py-8 px-4 space-y-2">
            <Link
              href=""
              className="bg-emerald-600 block px-4 py-3  rounded-lg font-bold shadow-md"
            >
              주문 대기열
            </Link>
            <Link
              href=""
              className="bg-emerald-600 block px-4 py-3  rounded-lg font-bold shadow-md"
            >
              재고 관리
            </Link>
          </nav>
        </aside>
        {/* 메인 컨텐츠 */}
        <main className="flex-1 overflow-y-scroll bg-slate-50 p-12">
          {children}
        </main>
      </body>
    </html>
  );
}

export default layout;
