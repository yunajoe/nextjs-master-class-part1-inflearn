"use client";
function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-black">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          치명적인 시스템 에러가 발생했습니다.
        </h2>
        <p className="mb-6">이용에 불편을 드려 대단히 죄송합니다.</p>
        {/* 전체 페이지를 하드 리프레시하여 앱을 초기 상태로 되돌립니다. */}
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          서비스 전체 다시 로드
        </button>
      </body>
    </html>
  );
}

export default GlobalError;
