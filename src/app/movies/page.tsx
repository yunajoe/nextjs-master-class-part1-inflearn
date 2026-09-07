export default async function MoviesPage() {
  // [의도적 지연] 3초 동안 서버의 렌더링을 멈춥니다.
  // 이 시간 동안 Next.js는 미리 loading.tsx의 HTML(뼈대)을 브라우저로 스트리밍합니다.
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // 가상의 영화 데이터
  const movies = [
    { id: 1, title: "Inception: The Dream", genre: "Sci-Fi" },
    { id: 2, title: "Dark Knight Rises", genre: "Action" },
    { id: 3, title: "Interstellar Journey", genre: "Adventure" },
    { id: 4, title: "The Matrix: Reload", genre: "Sci-Fi" },
    { id: 5, title: "Oppenheimer", genre: "Biography" },
    { id: 6, title: "Dune: Part Two", genre: "Sci-Fi" },
  ];

  return (
    <div className="p-10 w-full animate-in fade-in duration-1000">
      <h1 className="text-4xl font-black mb-10 text-white tracking-tighter">
        Trending Now
      </h1>

      {/* loading.tsx의 그리드 구조와 완벽히 동일해야 Layout Shift가 안 생깁니다. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 p-6 hover:border-red-600 transition-colors"
          >
            {/* 가상의 포스터 영역 */}
            <div className="h-48 w-full bg-gray-800 rounded-xl mb-6 flex items-center justify-center text-gray-700 font-bold">
              POSTER IMAGE
            </div>

            {/* 텍스트 정보 */}
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {movie.title}
              </h3>
              <span className="inline-block px-3 py-1 bg-red-600/20 text-red-500 text-xs font-black rounded-full uppercase tracking-wider">
                {movie.genre}
              </span>
            </div>

            {/* 하단 버튼 */}
            <button className="mt-8 w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors">
              WATCH TRAILER
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
