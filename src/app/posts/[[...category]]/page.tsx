import SearchForm from "@/src/app/components/SearchForm";
import Link from "next/link";

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
  {
    id: 5,
    title: "JAVA 백엔드 기초",
    path: ["backend", "java"],
    views: 120,
  },
];

interface PageProps {
  params: Promise<{ category?: string[] }>;
  searchParams: Promise<{ sort?: string; q?: string }>;
}
async function page({ params, searchParams }: PageProps) {
  const [p, sp] = await Promise.all([params, searchParams]);
  const { category = [] } = p;
  const { sort = "", q = "" } = sp;
  let baseUrl = `/posts/${category.join("/")}`; // posts/frontend/react
  let searchParamsUrl = baseUrl;

  let filterPosts = [...allPosts];

  // 데이터
  // sort (정렬)
  if (sort === "desc") {
    filterPosts.sort((a, b) => b.views - a.views);
  }
  // q (검색어)
  if (q.trim()) {
    filterPosts = filterPosts.filter((item) => item.title.includes(q.trim()));
  }

  const sortHref = q ? `${baseUrl}?q=${q}&sort=desc` : `${baseUrl}?sort=desc`;

  return (
    <div className="">
      <nav className="w-full border-2 border-solid p-4 flex justify-center gap-10">
        <SearchForm url={baseUrl} initialQuery={q} sort={sort} />

        <div className="w-2/5 flex items-center justify-center gap-4">
          <Link
            href={sortHref}
            className="px-4 py-2 border border-gray-300 bg-white rounded-md hover:bg-gray-100"
          >
            조회수 높은 순 ⬆️
          </Link>
          <Link
            href="/posts"
            className="px-4 py-2 border border-gray-300 bg-white rounded-md hover:bg-gray-100"
          >
            초기화 🔄
          </Link>
        </div>
      </nav>

      <div className="px-6 py-10 flex flex-col gap-10">
        {/* bread crumb */}
        <ul className="list-none flex">
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

        {/* 내용*/}
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl">
            {q ? `📌 검색 결과: "${q}"` : "📌 게시글 목록"}
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {filterPosts.map((item) => (
              <div
                key={item.id}
                className="border-2 border-gray-300 rounded-md p-4 w-100"
              >
                <p>{item.path.join(" > ")}</p>
                <p>{item.title}</p>
                <p>조회수: {item.views}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
