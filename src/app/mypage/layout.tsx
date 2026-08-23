function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col ml-[160px]">
      <header className="flex items-center justify-between border border-blue-800">
        <h1 className="text-white text-4xl p-2 font-bold">마이 페이지</h1>
        <input
          type="text"
          placeholder="내 기록 검색하기"
          className="text-md p-2"
        />
      </header>
      <ul className="flex items-center gap-2">
        <li className="p-2">프로필</li>
        <li className="p-2">주문 내역</li>
        <li className="p-2">위시 리스트</li>
      </ul>
      {children}
    </div>
  );
}

export default MyPageLayout;
