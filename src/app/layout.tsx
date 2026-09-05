import "./globals.css";
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="h-screen">{children}</body>
    </html>
  );
}

export default RootLayout;
