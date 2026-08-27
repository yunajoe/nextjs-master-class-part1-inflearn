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
  params: Promise<{ category?: string }>;
  searchParams: Promise<{ sort?: string; q?: string }>;
}
async function page({ params, searchParams }: PageProps) {
  const result = await Promise.all([params, searchParams]);

  // [검색창: 🔍 검색어 입력... ] [조회수 높은 순 ⬆️] [초기화 🔄]

  return (
    <div className="">
      <nav className="w-full border-2 border-solid p-4 flex justify-center gap-10">
        <div className="w-3/5 flex gap-4 bg-blue-100">
          <input
            type="text"
            placeholder="🔍 검색어 입력..."
            className="border-2 border-blue-400 w-3/5 rounded-sm"
          />
          <button className="w-28 border-2 border-gray-800">검색</button>
        </div>

        <div className="w-2/5 bg-blue-100 flex items-center justify-center gap-4">
          <button className="border-2 border-gray-800 w-30">
            조회 높은 순
          </button>
          <button className="border-2 border-gray-800 w-30">리셋</button>
        </div>
      </nav>
    </div>
  );
}

export default page;
