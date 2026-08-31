import SkillSearch from "@/src/app/components/SkillSearch";
import Link from "next/link";

const data = [
  {
    id: 1,
    title: "Next.js 15 라우팅 완벽 가이드",
    path: ["roadmap", "fronted", "react"],
    level: "ENTRY",
  },
  {
    id: 2,
    title: "React 19 훅스 파헤치기",
    path: ["roadmap", "fronted", "react"],
    level: "ADVANCED",
  },
  {
    id: 3,
    title: "상태 관리 라이브러리 비교",
    path: ["roadmap", "fronted", "react"],
    level: "ENTRY",
  },
  {
    id: 4,
    title: "Node.js 백엔드 기초",
    path: ["roadmap", "fronted", "react", "nextjs"],
    level: "ADVANCED",
  },
  {
    id: 5,
    title: "JAVA 백엔드 기초",
    path: ["roadmap", "fronted", "react", "hooks"],
    level: "ADVANCED",
  },
  {
    id: 6,
    title: "JAVA 백엔드 기초2",
    path: ["roadmap", "fronted", "react", "hooks"],
    level: "ENTRY",
  },
];

interface PageProps {
  params: Promise<{ skills?: string[] }>;
  searchParams: Promise<{ level?: string; query?: string }>;
}

async function page({ params, searchParams }: PageProps) {
  const [routes, searches] = await Promise.all([params, searchParams]);
  const { skills = [] } = routes; // breadCrumb
  const level = typeof searches.level === "string" ? searches.level : ""; // level 필터링 값
  const query = typeof searches.query === "string" ? searches.query.trim() : ""; // 검색어

  let filteredData = [...data];

  if (level) {
    filteredData = filteredData.filter(
      (item) => item.level.toLowerCase() === level,
    );
  }
  if (query) {
    filteredData = filteredData.filter((item) => item.title.includes(query));
  }

  const baseUrl = `/roadmap/${skills.join("/")}`;

  let actionPath = baseUrl;

  const levelFilterPath = query ? `${baseUrl}?query=${query}` : baseUrl;

  return (
    <div className="flex flex-col gap-10 px-40 py-10">
      <h1 className="text-3xl font-bold">DEV ROADMAP</h1>
      <nav className="flex justify-between border rounded-xl p-6">
        <SkillSearch
          initialQuery={query}
          actionPath={actionPath}
          level={level}
        />
        <ul className="flex gap-4 items-center justify-center flex-3 list-none">
          <Link
            href="/roadmap"
            className="border w-20 text-center p-2 rounded-sm"
          >
            전체
          </Link>
          <Link
            href={
              query
                ? `${levelFilterPath}&level=entry`
                : `${levelFilterPath}?level=entry`
            }
            className="border w-20 text-center p-2 rounded-sm"
          >
            입문
          </Link>
          <Link
            href={
              query
                ? `${levelFilterPath}&level=advanced`
                : `${levelFilterPath}?level=advanced`
            }
            className="border w-20 text-center p-2 rounded-sm"
          >
            어드밴스
          </Link>
        </ul>
      </nav>

      {/* breadCrumb */}
      <div className="border rounded-xl p-6 bg-black">
        <p className="text-2xl text-white">current path</p>
        <div>
          {skills.map((route, i) => {
            return (
              <span className="text-2xl text-white font-bold">
                {route} {i !== skills.length - 1 ? ">" : ""}
              </span>
            );
          })}
        </div>
      </div>
      {/* data */}

      <div className="grid grid-cols-3 gap-2">
        {filteredData.length === 0 ? (
          <h1>조건에 맞는 데이터가 없습니다.</h1>
        ) : (
          <>
            {filteredData.map((item) => {
              const href = item.path.join("/");
              return (
                <div className="border rounded-md p-4" key={item.id}>
                  <span>{item.level}</span>
                  <h1>{item.title}</h1>
                  <Link href={href}>{href}</Link>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default page;
