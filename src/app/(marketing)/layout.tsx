import "../globals.css";
function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className="font-sans text-gray-900 bg-white"
        suppressHydrationWarning
      >
        <header className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <span className="text-xl font-bold text-indigo-600 tracking-tight">
              MyService
            </span>
            <nav>
              <a href="" className="hover:text-indigo-600 transition-colors">
                Features
              </a>
              <a href="" className="hover:text-indigo-600 transition-colors">
                Pricing
              </a>
              <a
                href=""
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
              >
                Get Started
              </a>
            </nav>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-50 py-12 text-center text-gray-500 text-sm border-t border-gray-100">
          <p>© 2026 MyService Inc. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

export default layout;
