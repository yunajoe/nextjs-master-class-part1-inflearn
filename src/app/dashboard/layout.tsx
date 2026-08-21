import Link from "next/link";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen text-white">
      <aside>
        {/* 로고 영역 */}
        <h1 className="text-2xl font-bold mb-6 text-emerald-400">
          Dev Dashboard
        </h1>
        {/* ★ 핵심 테스트용 검색창 ★ */}
        <div>
          <input
            type="text"
            placeholder="검색어를 입력해보세요..."
            className="w-full p-2 rounded bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
          />
          <p className="text-xs text-gray-500 mt-2">
            ※ 여기에 글을 쓰고 메뉴를 이동해보세요!
          </p>
        </div>

        {/* 네비게이션 */}
        <nav className="space-y-2 flex-1 overflow-y-auto">
          <Link
            href="/dashboard"
            className="block p-3 rounded hover:bg-gray-800 transition-colors"
          >
            📊 홈 (Overview)
          </Link>
          <Link
            href="/dashboard/settings"
            className="block p-3 rounded hover:bg-gray-800 transition-colors"
          >
            ⚙️ 설정 (Settings)
          </Link>
        </nav>
        {/* 하단 나가기 버튼 */}
        <Link
          href="/"
          className="block p-3 rounded hover:bg-red-900/30 text-red-400 text-sm mt-4"
        >
          ⬅️ 메인으로 나가기
        </Link>
      </aside>
      {/* 오른쪽 콘텐츠 영역 (가변 영역) */}
      <main className="flex-1 bg-gray-100 text-black p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
