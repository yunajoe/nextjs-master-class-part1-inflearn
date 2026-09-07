import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
      <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
        미래를 여는 <br />
        <span className="text-indigo-600">스마트 테크놀로지</span>
      </h1>
      <p className="text-gray-500 mb-12 max-w-lg mx-auto">
        TechNova에서 가장 혁신적인 기기들을 만나보세요. 아래 버튼을 눌러 404
        안전장치가 어떻게 작동하는지 테스트할 수 있습니다.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/wrong-url-test"
          className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg"
        >
          경로 이탈 테스트 (Global 404)
        </Link>
        <Link
          href="/products"
          className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-200"
        >
          단종 상품 테스트 (notFound 함수)
        </Link>
      </div>
    </div>
  );
}
