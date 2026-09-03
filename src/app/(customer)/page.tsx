// [Route Groups의 마법]
// (customer) 폴더는 괄호로 묶여있어 URL 경로에서 투명 인간 취급을 받습니다.
// 따라서 이 페이지의 실제 접속 주소는 localhost:3000/customer 가 아니라
// 깔끔하게 localhost:3000/ (루트 경로)가 됩니다.

export default function CustomerHomePage() {
  return (
    <div className="flex flex-col items-center justify-center pt-32 text-center px-6">
      <span className="text-amber-700 font-bold tracking-widest uppercase text-xs mb-4">
        Spring Collection
      </span>
      <h1 className="text-6xl font-black text-stone-800 mb-8 leading-tight">
        에티오피아 게이샤, <br /> 그 찬란한 향기.
      </h1>
      <button className="px-10 py-4 bg-stone-900 text-stone-50 font-bold rounded-full hover:bg-amber-900 transition-colors shadow-2xl">
        원두 구매하기
      </button>
    </div>
  );
}
