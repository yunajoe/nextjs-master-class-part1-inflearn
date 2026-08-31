import SkillSearchTwo from "@/src/app/components/SkillSearchTwo";
import Link from "next/link";
const roadmapData = [
  { id: 1, name: "HTML & CSS 기초", path: ["frontend"], level: "beginner" },
  {
    id: 2,
    name: "React 펀더멘탈",
    path: ["frontend", "react"],
    level: "beginner",
  },
  {
    id: 3,
    name: "Next.js 앱 라우터",
    path: ["frontend", "react", "nextjs"],
    level: "advanced",
  },
  { id: 4, name: "Node.js 런타임", path: ["backend"], level: "beginner" },
  {
    id: 5,
    name: "Express 미들웨어",
    path: ["backend", "express"],
    level: "beginner",
  },
  {
    id: 6,
    name: "PostgreSQL 스키마 설계",
    path: ["backend", "database"],
    level: "advanced",
  },
  {
    id: 7,
    name: "React Query 상태 관리",
    path: ["frontend", "react", "hooks"],
    level: "advanced",
  },
  {
    id: 8,
    name: "Tailwind CSS 디자인",
    path: ["frontend", "css"],
    level: "beginner",
  },
  { id: 9, name: "Docker 컨테이너라이징", path: ["devops"], level: "advanced" },
  {
    id: 10,
    name: "TypeScript 정적 타입",
    path: ["frontend", "typescript"],
    level: "beginner",
  },
];

// 1. 10개의 계층형 시스템 데이터 정의

/**
 * [Next.js 15 전용 Page Props 인터페이스]
 * - params: [[...skill]] 에 대응하는 경로 조각들의 배열 (Promise)
 * - searchParams: URL 뒤의 '?q=...&level=...' 쿼리 객체 (Promise)
 */
interface PageProps {
  params: Promise<{ skill?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RoadmapPage({ params, searchParams }: PageProps) {
  // 2. 비동기 데이터 추출 (Next.js 15 최신 표준)
  // await를 사용하여 데이터가 준비될 때까지 기다린 후 값을 꺼냅니다.
  const { skill = [] } = await params;
  const resolvedSP = await searchParams;

  // 3. 타입 안전성 확보 (쿼리 스트링은 배열로 올 수도 있으므로 string인지 체크)
  const query = typeof resolvedSP.q === "string" ? resolvedSP.q : "";
  const levelFilter =
    typeof resolvedSP.level === "string" ? resolvedSP.level : "";

  // 4. 현재 위치 주소 계산 (검색창 action 주소 및 필터 버튼의 기준 주소로 사용)
  const currentPath =
    "/roadmap-answer" + (skill.length > 0 ? "/" + skill.join("/") : "");

  // 5. 서버 사이드 필터링 로직 구현
  let filteredSkills = [...roadmapData];

  // (1) 계층 필터링: 현재 URL의 경로 조각들이 데이터의 상위 경로와 완벽히 일치하는지 검사
  // 예: URL이 /roadmap/frontend/react 이면 path가 ["frontend", "react"]로 시작하는 것만 필터링
  if (skill.length > 0) {
    filteredSkills = filteredSkills.filter((item) =>
      skill.every((segment, idx) => item.path[idx] === segment),
    );
  }

  // (2) 검색어 필터링 (대소문자 구분 없음)
  if (query) {
    filteredSkills = filteredSkills.filter((s) =>
      s.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  // (3) 난이도 필터링
  if (levelFilter) {
    filteredSkills = filteredSkills.filter((s) => s.level === levelFilter);
  }

  return (
    <div className="p-10 max-w-6xl mx-auto font-sans bg-white text-slate-900 min-h-screen">
      <h1 className="text-4xl font-black mb-10 tracking-tight text-blue-600">
        ROADMAP EXPLORER
      </h1>

      {/* 검색 및 필터 UI 영역 */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
        {/* 현재 경로(currentPath)를 actionPath로 넘겨주어 검색 위치를 고정합니다. */}
        <SkillSearchTwo initialQuery={query} actionPath={currentPath} />

        <div className="flex gap-2 bg-white p-1 rounded-2xl border border-slate-200">
          {[
            { label: "전체", val: "" },
            { label: "입문", val: "beginner" },
            { label: "심화", val: "advanced" },
          ].map((item) => (
            <Link
              key={item.label}
              // Link의 객체형 href: 기존 검색어(q)를 보존하면서 난이도(level)만 교체/추가합니다.
              href={{
                pathname: currentPath,
                query: { q: query, level: item.val || undefined },
              }}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${levelFilter === item.val ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* [핵심] 스포트라이트 카드: 현재 사용자의 탐색 위치를 시각적으로 강조 */}
      <section className="mb-12">
        <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          {/* 장식용 배경 텍스트 (현재 카테고리 명칭) */}
          <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl font-black uppercase italic select-none">
            {skill.length > 0 ? skill[skill.length - 1] : "HOME"}
          </div>

          <p className="text-blue-400 font-mono mb-4 uppercase tracking-[0.3em] text-xs font-bold">
            Current Roadmap Path
          </p>
          <h2 className="text-4xl font-black leading-tight">
            {/* 배열 조각들을 합쳐 가독성 좋은 대문자 경로로 출력 */}
            {skill.length > 0
              ? `🎯 ${skill.join(" 〉 ").toUpperCase()}`
              : "🎯 GLOBAL TECH STACK"}
          </h2>
          <div className="mt-6 flex gap-4">
            <span className="px-4 py-1 bg-white/10 rounded-full text-sm">
              연관 기술 {filteredSkills.length}개 탐색 가능
            </span>
          </div>
        </div>
      </section>

      {/* 필터링된 기술 리스트 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredSkills.map((item) => (
          <div
            key={item.id}
            className="p-8 border border-slate-100 rounded-[2rem] bg-white shadow-sm hover:shadow-xl transition-all group cursor-pointer border-b-4 border-b-slate-200 hover:border-b-blue-500"
          >
            {/* 난이도 배지 */}
            <span
              className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase mb-6 ${item.level === "beginner" ? "bg-emerald-100 text-emerald-700" : "bg-violet-100 text-violet-700"}`}
            >
              {item.level}
            </span>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors leading-tight">
              {item.name}
            </h3>
            {/* 데이터 추적용 경로 정보 (디버깅 용도) */}
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
              PATH: /roadmap/{item.path.join("/")}
            </p>
          </div>
        ))}
      </div>

      {/* 데이터가 없을 경우 보여줄 예외 UI */}
      {filteredSkills.length === 0 && (
        <div className="py-32 text-center text-slate-400 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <p className="text-xl font-bold">
            해당 조건의 로드맵이 존재하지 않습니다.
          </p>
          <Link
            href="/roadmap"
            className="text-blue-600 underline mt-4 inline-block font-medium"
          >
            루트 로드맵으로 돌아가기
          </Link>
        </div>
      )}
    </div>
  );
}
