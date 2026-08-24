async function page({
  params,
}: {
  params: Promise<{ category: string; itemId: string }>;
}) {
  const { category, itemId } = await params;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">중첩 라우팅 테스트</h2>
      <p className="mb-2 text-black">
        현재 접속하신 카테고리는{" "}
        <span className="font-bold text-emerald-600">{category}</span>이며, 상세
        상품의 ID는 <span className="font-bold text-emerald-600">{itemId}</span>
        입니다.
      </p>
    </div>
  );
}

export default page;
