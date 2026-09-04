import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Lux-Gallery | Premium Art Archive",
  description: "Next.js 15 서버 컴포넌트로 구축된 고성능 갤러리",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col font-serif">
        <nav className="h-20 bg-white border-b border-stone-200 flex items-center justify-between px-10 sticky top-0 z-50">
          <Link href="/" className="text-xl font-black tracking-tighter italic">
            LUX-JEWEL.
          </Link>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-stone-400">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <Link
              href="/gallery"
              className="hover:text-black transition-colors"
            >
              Exhibition
            </Link>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
