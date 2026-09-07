import Link from "next/link";

function GlobalNotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6">
      <div className="relative">
        <h1 className="text-9xl font-extrabold text-indigo-200 tracking-widest select-none">
          404
        </h1>
        <div className="bg-[#FF6A3D] px-3 py-1 text-sm rounded rotate-12 absolute top-0 left-0 right-0 bottom-0 m-auto h-max w-max flex items-center justify-center text-white font-black shadow-xl">
          Page Not Found
        </div>
      </div>

      <div className="mt-10 text-center">
        <h3 className="text-3xl font-bold mb-4">
          죄송합니다. 길을 잃으셨나요?
        </h3>
        <p className="text-gray-500 mb-10 max-w-md mx-auto leading-relaxed">
          요청하신 페이지가 삭제되었거나, 이름이 변경되었거나, 일시적으로 사용할
          수 없습니다.
        </p>

        <Link
          href="/"
          className="group relative inline-block text-sm font-bold text-[#FF6A3D] focus:outline-none"
        >
          <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-[#FF6A3D] transition-transform group-hover:translate-y-0 group-hover:translate-x-0 rounded-lg"></span>
          <span className="relative block border-2 border-current bg-slate-900 px-8 py-4 text-white transition-colors group-hover:bg-slate-800 rounded-lg">
            안전하게 홈으로 돌아가기
          </span>
        </Link>
      </div>
    </div>
  );
}

export default GlobalNotFound;
