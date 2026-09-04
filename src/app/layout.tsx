import "./globals.css";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="h-screen">
        <main>{children}</main>
      </body>
    </html>
  );
}

export default RootLayout;
