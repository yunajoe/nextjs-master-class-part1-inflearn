async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  /**
   * - 구조 분해 할당 ({ slug }): 폴더 이름을 [slug]로 지정했기 때문에, params 객체 안에는 slug라는 키값으로 데이터가 담깁니다.
   * - 와일드카드 낚아채기: 이제 /products/macbook-pro나 /products/12345 등 어떤 주소를 입력해도 이 하나의 파일이 모든 요청을 처리
   *
   */
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-blue-600">상품 상세 페이지</h1>
      <p className="text-xl mt-4 text-gray-700">
        고객님이 요청하신 상품의 코드는 다음과 같습니다.
        <span className="font-bold ml-2 text-3xl">{slug}</span>
      </p>
    </div>
  );
}

export default page;
