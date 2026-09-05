// 좌측 고정 사이드바(Width: 20rem) + 메인 콘텐츠 영역
import "../globals.css";
function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="flex bg-slate-50">
        <aside className="bg-green-100 w-40 h-screen">좌측 사이드바</aside>
        {/* 메인 컨텐츠 */}
        <main className="bg-red-100 flex-1 p-20 border-l-2">{children}</main>
      </body>
    </html>
  );
}

export default AppLayout;
