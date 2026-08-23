import Link from "next/link";

function SideBar() {
  return (
    <nav className="w-[160px] h-full fixed z-10 top-0 left-0 bg-[#111] overflow-y-auto">
      <div className="mb-6 mt-6">
        <input
          type="text"
          placeholder="검색어 입력"
          className="w-full bg-gray-800  text-sm focus:outline-none"
        />
      </div>
      <Link
        href="/"
        className="block py-1.5 pr-2 pl-4 no-underline text-sm  text-[#818181]"
      >
        홈
      </Link>
      <Link
        href="/dashboard"
        className="block py-1.5 pr-2 pl-4 no-underline text-sm  text-[#818181]"
      >
        대시보드 (dashboard)
      </Link>
      <Link
        href="/dashboard/settings"
        className="block py-1.5 pr-2 pl-4 no-underline text-sm  text-[#818181]"
      >
        설정 (settings)
      </Link>
    </nav>
  );
}

export default SideBar;
