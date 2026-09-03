function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className="bg-slate-50 font-sans text-slate-900 antialiased"
        suppressHydrationWarning
      >
        <div className="bg-amber-200 flex h-screen overflow-hidden text-black">
          {/* 사이드바 */}
          <aside className="w-72 bg-white border-r border-slate-200 flex flex-col z-20">
            <div className="h-16 flex items-center px-6 border-b border-slate-200">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-sm text-white font-bold text-sm">
                A
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-800">
                Admin Pro
              </span>
            </div>
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
              {[
                "Dashboard",
                "Analytics",
                "Customers",
                "Products",
                "Settings",
              ].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50/50 transition-all group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors"></div>
                  {item}
                </a>
              ))}
            </nav>
          </aside>

          {/* 메인 콘텐츠 */}
          <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shadow-sm shadow-slate-100/50">
              <div className="bg-slate-50 px-4 py-2 rounded-lg w-96 border border-slate-200 text-slate-400 text-sm">
                Search...
              </div>
              <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center relative">
                <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-blue-400 opacity-75 top-2 right-2"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 border-2 border-white top-2 right-2"></span>
              </div>
            </header>
            <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

export default layout;
