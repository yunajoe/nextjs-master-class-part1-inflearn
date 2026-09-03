// [중요] 최상위 layout.tsx를 삭제했으므로, 여기서 전역 CSS를 직접 불러와야 합니다.
import "../globals.css";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-stone-50 font-serif text-stone-900">
        {/* [고객용 독자적 레이아웃: GNB]
          우아한 느낌을 주는 상단 고정 네비게이션입니다.
          이 헤더는 (customer) 폴더 안에 있는 페이지들에만 적용되며,
          직원용 대시보드 화면에는 절대 나타나지 않습니다. (완벽한 격리)
        */}
        <header className="sticky top-0 bg-stone-50/80 backdrop-blur-md border-b border-stone-200 z-50">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <span className="text-3xl font-black tracking-tighter text-amber-900 italic">
              Lumiere.
            </span>
            <nav className="flex gap-8 text-sm font-bold tracking-widest uppercase">
              <a href="/" className="hover:text-amber-700 transition">
                Shop
              </a>
              <a
                href="/pos"
                className="text-stone-400 hover:text-amber-700 transition"
              >
                Staff Only
              </a>
            </nav>
          </div>
        </header>

        {/* 하위 페이지(page.tsx)들이 렌더링되는 메인 영역 */}
        <main className="min-h-screen">{children}</main>

        <footer className="py-12 text-center text-stone-500 text-xs border-t border-stone-200 bg-stone-100 mt-20">
          © 2026 Lumiere Coffee Roasters.
        </footer>
      </body>
    </html>
  );
}
