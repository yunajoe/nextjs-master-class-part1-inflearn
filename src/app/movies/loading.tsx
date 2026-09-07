function MoviesLoading() {
  return (
    <div className="w-full animate-purse">
      <div className="h-10 w-64 bg-gray-800 rounded-lg mb-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700 p-6"
          >
            {/* 포스터 이미지 뼈대 */}
            <div className="h-48 w-full bg-gray-700 rounded-xl mb-6"></div>

            {/* 텍스트 정보 뼈대 */}
            <div className="space-y-4">
              <div className="h-6 w-3/4 bg-gray-700 rounded"></div>
              <div className="h-4 w-1/4 bg-gray-700 rounded"></div>
            </div>

            {/* 하단 버튼 뼈대 */}
            <div className="mt-8 h-12 w-full bg-gray-700 rounded-xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesLoading;
