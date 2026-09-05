// 기기 목록 및 검색 필터 (Server Component).
// No useState: 검색어를 저장하기 위해 React State를 절대 사용하지 말 것.
// No useEffect: 검색어 변경 감지를 위해 Effect를 사용하지 말 것.
// URL Driven: 모든 상태는 URL의 Query String(?q=조명&cat=light)에 의존해야 함.
// Link 컴포넌트 활용: 필터 버튼 클릭 시 router.push() 대신 <Link href={{ query: ... }} />를 사용하여 Next.js의 Prefetching 이점을 활용할 것.
// 보존 로직: 카테고리를 변경할 때 검색어(q)가 사라지지 않도록 기존 파라미터를 병합(Merge)하는 로직 필수.

import Link from "next/link";
import { MOCK_DEVICES } from "../../_utils/db";

interface PageProps {
  // Next.js 15: searchParams는 반드시 Promise로 정의
  searchParams: Promise<{ search: string; category: string }>;
}
async function page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const { search = "", category = "" } = resolvedSearchParams;

  // [2] 서버 사이드 필터링: 클라이언트 JS 연산 비용 0
  // 서버에서 HTML이 생성될 때 이미 필터링된 데이터만 포함됩니다.
  const filterMockDevices = [...MOCK_DEVICES].filter((item) => {
    if (category === "all" || category === "") {
      return [...MOCK_DEVICES];
    }
    return item.category.toLowerCase() === category;
  });

  return (
    <div className="flex flex-col gap-4 ">
      <header>
        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-800">
          Device Console
        </h2>
        <p className="mt-2 text-slate-400 font-medium">
          실시간 하드웨어 스테이터스를 관리합니다.
        </p>
      </header>
      {/* 필턷값 */}
      <div className="flex gap-2">
        {["ALL", "LIGHT", "SECURITY", "CLIMATE"].map((item, index) => {
          return (
            <Link
              className="border border-blue-600 w-20 text-center"
              key={index}
              href={`/devices?search=${search}&category=${item.toLowerCase()}`}
            >
              {item}
            </Link>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filterMockDevices.map((item) => (
          <Link
            key={item.id}
            href={`/devices/${item.id}`}
            className="border-2 border-black-100 p-4 rounded-sm h-34"
          >
            <p>{item.category}</p>
            <p className="text-xl">{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default page;
