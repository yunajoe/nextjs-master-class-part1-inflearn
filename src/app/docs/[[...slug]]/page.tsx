import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

async function page({ params }: PageProps) {
  // 이때 데이터가 없는 홈 페이지 접속 시 slug는 undefined가 되는데, 이때 코드가 터지지 않게 빈 배열([])을 기본값으로 할당

  const { slug = [] } = await params;
  const pathDepth = slug.length; // 2
  const title = pathDepth > 0 ? slug[pathDepth - 1] : "Docs Home";

  const getContent = (topic: string) => {
    const data: Record<string, string> = {
      react: "React는 UI를 만들기 위한 현대적인 자바스크립트 라이브러리입니다.",
      nextjs: "Next.js는 풀스택 애플리케이션을 위한 강력한 프레임워크입니다.",
      hooks: "Hooks는 함수형 컴포넌트에서 상태를 관리하게 해줍니다.",
    };
    return data[topic.toLowerCase()];
  };

  const content =
    pathDepth > 0
      ? getContent(slug[pathDepth - 1])
      : "개발 문서 위키에 오신 것을 환영합니다.";

  if (pathDepth > 0 && !content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-300 text-black p-8">
      <div className="max-w-4xl mx-auto">
        <nav className="flex items-center text-sm text-gray-500 mb-6 bg-blue-200">
          <Link
            href="/docs"
            className="font-semibold text-indigo-600 hover:underline"
          >
            DOCS
          </Link>
          {slug.map((segment, index) => {
            const href = `/docs/${slug.slice(0, index + 1).join("/")}`;
            const isLast = index === slug.length - 1;

            return (
              <div key={index}>
                <span className="mx-2 text-gray-400">/</span>
                {isLast ? (
                  <span className="capitalize font-bold text-gray-800">
                    {segment}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="capitalize hover:text-indigo-300 transition-colors"
                  >
                    {segment}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <main>
          {/* 배너 헤더 */}
          <div>
            <h1 className="text-4xl font-extrabold capitalize tracking-tight">
              {title.replace(/-/g, " ")}
            </h1>
            <p className="mt-2 text-indigo-100 opacity-90">
              {pathDepth === 0
                ? "최신 문서를 탐색하세요."
                : `Level ${pathDepth}`}
            </p>
          </div>
          {/* 홈(/docs)일 때만 보여주는 추천 그리드 */}
          {pathDepth === 0 && (
            <div>
              {["react", "nextjs", "hooks"].map((item) => (
                <Link
                  key={item}
                  href={`/docs/${item}`}
                  className="p-4 border rounded-lg hover:border-indigo-500 hover:shadow-md transition-all group"
                >
                  <h3 className="font-bold text-lg capitalize group-hover:text-indigo-600">
                    {item} Docs &rarr;
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Start learning now.
                  </p>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default page;
