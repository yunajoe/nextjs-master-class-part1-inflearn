const products = [
  {
    id: 1,
    name: "초경량 노트북",
    price: "1,200,000원",
    description: "가방에 넣은 줄도 모르는 가벼움! 대학생 강추 아이템.",
  },
  {
    id: 2,
    name: "무소음 기계식 키보드",
    price: "185,000원",
    description: "사무실에서도 눈치 보지 않고 타건감을 즐기세요.",
  },
  {
    id: 3,
    name: "인체공학 버티컬 마우스",
    price: "89,000원",
    description: "손목 터널 증후군 예방을 위한 최고의 선택.",
  },
];

async function page({ params }: { params: Promise<{ id: string }> }) {
  //  Next.js 15의 새로운 규칙: params는 이제 비동기(Promise)로 처리해야 합니다.
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="p-10 text-red-500 font-bold text-xl">
        존재하지 않는 상품입니다.
      </div>
    );
  }
  return (
    <div className="p-10 max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-black">
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
          BEST ITEM
        </span>
        <h1 className="text-4xl font-bold mt-4 mb-2">{product.name}</h1>
        <p className="text-2xl text-gray-700 font-bold mb-6">{product.price}</p>

        <hr className="my-6 border-gray-200" />

        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          {product.description}
        </p>

        <button className="w-full bg-emerald-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-emerald-700 transition-colors">
          장바구니 담기
        </button>
      </div>
    </div>
  );
}

export default page;
