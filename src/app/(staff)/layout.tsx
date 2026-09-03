import "../globals.css";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      {/* [직원용 독자적 레이아웃: LNB]
        고객용 화면과 완전히 다르게, 화면 전체를 꽉 채우는(h-screen)
        실용적인 좌측 고정 사이드바 구조를 취하고 있습니다.
      */}
      <body className="flex h-screen bg-slate-100 font-sans text-slate-800">
        {/* 좌측 사이드바 영역 */}
        <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20">
          <div className="h-20 flex items-center px-6 border-b border-slate-800">
            <span className="text-xl font-black tracking-widest text-emerald-400">
              LUMIERE POS
            </span>
          </div>
          <nav className="flex-1 py-8 px-4 space-y-2">
            <a
              href="/pos"
              className="block px-4 py-3 bg-emerald-600 rounded-lg font-bold shadow-md"
            >
              주문 대기열
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg font-bold transition"
            >
              재고 관리
            </a>
          </nav>
        </aside>

        {/* 대시보드 콘텐츠가 렌더링되는 우측 영역 (스크롤 가능) */}
        <main className="flex-1 overflow-y-auto p-12 bg-slate-50">
          {children}
        </main>
      </body>
    </html>
  );
}
