function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-4 border-blue-500 m-4 p-4 rounded-lg">
      <nav className="bg-blue-100 p-4 mb-4 rounded">
        <h2 className="text-xl font-bold text-blue-800">
          🏢 About 섹션 전용 네비게이션
        </h2>
        <ul className="flex gap-4 mt-2">
          <li>소개</li>
          <li>연혁</li>
          <li>팀원</li>
        </ul>
      </nav>

      {/* page.tsx의 내용이 들어가는 자리 */}
      <main className="bg-white">{children}</main>
    </section>
  );
}

export default AboutLayout;
