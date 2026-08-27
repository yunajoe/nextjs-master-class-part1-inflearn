const allPosts = [
  {
    id: 1,
    title: "Next.js 15 라우팅 완벽 가이드",
    path: ["frontend", "nextjs"],
    views: 150,
  },
  {
    id: 2,
    title: "React 19 훅스 파헤치기",
    path: ["frontend", "react"],
    views: 230,
  },
  {
    id: 3,
    title: "상태 관리 라이브러리 비교",
    path: ["frontend", "react"],
    views: 120,
  },
  {
    id: 4,
    title: "Node.js 백엔드 기초",
    path: ["backend", "nodejs"],
    views: 90,
  },
];

interface PageProps {
  params: Promise<{ category?: string[] }>;
  searchParams: Promise<{ sort?: string; q?: string }>;
}
async function page({ params, searchParams }: PageProps) {
  const [p, sp] = await Promise.all([params, searchParams]);
  const { category = [] } = p;
  //   # 1. 초기 화면 (/posts 접속 시)
  // [검색창: 🔍 검색어 입력... ] [조회수 높은 순 ⬆️] [초기화 🔄]
  // -----------------------------------------
  // [홈] ⬅️ 빵 부스러기 네비게이션
  // 📌 전체 게시글
  // - Next.js 15 라우팅 가이드 (조회수: 150)
  // - React 19 훅스 파헤치기 (조회수: 230)
  // - Node.js 백엔드 기초 (조회수: 90)

  // # 2. 카테고리 진입 및 검색 (/posts/frontend/react?q=훅스 접속 시)
  // [검색창: 🔍 훅스 ] [조회수 높은 순 ⬆️] [초기화 🔄]
  // -----------------------------------------
  // [홈] > [frontend] > [react] ⬅️ 배열 파라미터로 자동 생성됨
  // 📌 검색 결과: "훅스"
  // - React 19 훅스 파헤치기 (조회수: 230)

  return (
    <div className="">
      {/* 네비게이션 */}
      <nav className="w-full border-2 border-solid p-4 flex justify-center gap-10">
        <div className="w-3/5 flex gap-4">
          <input
            type="text"
            placeholder="🔍 검색어 입력..."
            className="border-2 border-blue-400 w-3/5 rounded-sm"
          />
          <button className="w-28 border-2 border-gray-800 bg-black text-white">
            검색
          </button>
        </div>

        <div className="w-2/5 flex items-center justify-center gap-4">
          <button className="border-2 border-gray-800 w-30 cursor-pointer p-2">
            조회 높은 순
          </button>
          <button className="border-2 border-gray-800 w-30 cursor-pointer p-2">
            리셋
          </button>
        </div>
      </nav>

      {/* bread crumb */}
      <ul className="list-none flex px-6 py-10">
        <span className="text-3xl font-bold">홈</span>
        {category.length > 0 && (
          <div>
            {category.map((item, index) => {
              return (
                <span key={index} className="text-3xl">
                  {`> ${item}`}
                </span>
              );
            })}
          </div>
        )}
      </ul>
    </div>
  );
}

export default page;
