// 루트 경로 등 구체적인 로딩 파일이 없는 곳에서 기본으로 작동하는 글로벌 로딩입니다.
export default function GlobalLoading() {
  return (
    // 배경을 약간 투명하게 하고 블러 처리를 합니다.
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-6">
        {/* 부드럽게 돌아가는 빨간색 스피너 */}
        <div className="w-16 h-16 border-4 border-gray-700 border-t-red-600 rounded-full animate-spin shadow-2xl shadow-red-600/20"></div>
        <p className="text-red-500 font-bold tracking-widest uppercase animate-pulse">
          Connecting to Server...
        </p>
      </div>
    </div>
  );
}
