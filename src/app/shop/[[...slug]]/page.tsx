interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

// shop/1/test
async function page({ params }: PageProps) {
  // slug가 없는 메인 페이지(/shop)를 대비해 기본값 빈 배열([])을 할당
  const { slug = [] } = await params;
  const depth = slug.length;
  const currentCategoryName = depth > 0 ? slug[depth - 1] : "Amazon Home";
  return (
    <div className="p-10 max-w-7xl mx-auto font-sans text-slate-900">
      <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <span className="font-bold text-gray-900">Amazon</span>
        {slug.map((category, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-gray-400">&gt;</span>
            <span className="hover:text-amber-600 hover:underline cursor-pointer capitalize">
              {category}
            </span>
          </div>
        ))}
      </nav>

      <main>
        {depth === 0 ? (
          <div className="bg-slate-900 p-12 rounded-2xl text-center text-white">
            <h1 className="text-5xl font-extrabold">
              오늘의 핫딜을 만나보세요!
            </h1>
            <p className="mt-4 text-slate-400 text-lg">
              전 세계의 모든 상품이 여기에 있습니다.
            </p>
          </div>
        ) : (
          <div>
            <h1>
              {currentCategoryName} <span>({depth} 단계 단계고리)</span>
            </h1>
            {slug.includes("sale") && (
              <div className="bg-red-50 border-l-4 border-red-500">
                <p className="font-bold text-red-700 text-xl">
                  🔥 마감 임박 세일!
                </p>
                <p className="text-red-600">
                  이 카테고리의 상품들은 곧 가격이 인상됩니다.
                </p>
              </div>
            )}

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-10">
              <p className="text-lg text-slate-700">
                현재 접속 경로:
                <code className="">/shop/{slug.join("/")}</code>
              </p>
              <p>
                ※ 실제 서비스에서는 이 '경로 배열'을 DB에 보내서 상품을
                조회합니다.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default page;
