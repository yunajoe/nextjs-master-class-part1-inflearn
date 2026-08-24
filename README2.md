### 05. 목록-상세 패턴 구현과 동적 데이터 흐름

```
    **목록과 상세(List-Detail)** 구조는 현대 웹 서비스의 표준 아키텍처이며, URL이 데이터를 찾는 열쇠(Key)로 기능하는 데이터 흐름을 체화하는 과정입니다.

```

1. 배경: '목록-상세' 패턴이 웹의 전부인 이유

- **목록(List):** 여러 데이터의 요약본을 보여주며 사용자의 선택을 유도합니다.
- **상세(Detail):** 특정 고유 식별자(ID)를 통해 그 데이터의 모든 정보를 보여줍니다.
- **데이터 흐름:** 사용자가 목록을 클릭하면 URL이 변경되고, 동적 라우팅이 이를 받아 알맞은 데이터를 렌더링합니다.

2. [실습 1] 상품 목록(List) 페이지 구현

- **파일 위치:** `src/app/products/page.tsx`
- **구현 내용:** 가짜 데이터(Mock Data) 배열을 순회하여 카드 형태의 UI를 동적으로 생성하고, 각 상품의 고유 ID를 `Link` 컴포넌트의 주소에 바인딩합니다.

```javascript
/* ✅ [실습 코드] src/app/products/page.tsx */
import Link from "next/link";

// 1. 가상의 상품 데이터: 실제 환경에서는 API 호출로 받아올 데이터의 형태입니다.
const products = [
  { id: 1, name: "초경량 노트북", price: "1,200,000원" },
  { id: 2, name: "무소음 기계식 키보드", price: "185,000원" },
  { id: 3, name: "인체공학 버티컬 마우스", price: "89,000원" },
];

export default function ProductListPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">🏪 이달의 추천 상품</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 2. 배열을 순회하며 화면에 카드를 찍어냅니다. */}
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.price}</p>

            {/* 3. 핵심: 각 상품의 고유 ID를 주소에 심어줍니다. */}
            <Link
              href={`/products/${product.id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              상세보기 &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
```

3. [실습 2] 동적 상세 페이지(Detail) 구현

- **파일 위치:** `src/app/products/[id]/page.tsx`
- **구현 내용:** Next.js 15 환경에 맞춰 `params`를 비동기로 처리하고, `find` 메서드를 통해 URL의 ID와 일치하는 데이터를 탐색하여 상세 화면을 구성합니다.

```javascript
/* ✅ [실습 코드] src/app/products/[id]/page.tsx */
const products = [
  { id: 1, name: "초경량 노트북", price: "1,200,000원", description: "가방에 넣은 줄도 모르는 가벼움! 대학생 강추 아이템." },
  { id: 2, name: "무소음 기계식 키보드", price: "185,000원", description: "사무실에서도 눈치 보지 않고 타건감을 즐기세요." },
  { id: 3, name: "인체공학 버티컬 마우스", price: "89,000원", description: "손목 터널 증후군 예방을 위한 최고의 선택." },
];

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Next.js 15의 새로운 규칙: params는 이제 비동기(Promise)로 처리해야 합니다.
  const { id } = await params;

  // 2. 탐정 역할의 find 메서드: 주소창의 ID와 일치하는 데이터를 찾습니다. (문자열 ID를 숫자로 변환)
  const product = products.find((p) => p.id === parseInt(id));

  // 3. 예외 처리: 존재하지 않는 ID 접근 시 대응
  if (!product) {
    return <div className="p-10 text-red-500 font-bold text-xl">존재하지 않는 상품입니다.</div>;
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

```

4. 핵심 요약 및 코드 원리

- **`products.map()`과 `key`:** 데이터를 반복 렌더링하며 리액트가 요소를 식별하도록 고유 `key`를 부여합니다.
- **Link Prefetching:** 뷰포트에 링크가 노출되면 데이터를 미리 불러와 즉각적인 페이지 이동 UX를 제공합니다.
- **Next.js 15 `params` 비동기화:** `params`가 Promise이므로 반드시 `await`를 거쳐 값을 추출해야 합니다.
- **데이터 타입 일치 (`parseInt`):** URL에서 넘어온 문자열 형태의 `id`를 숫자형으로 변환하여 비교해야 정확한 탐색이 가능합니다.
- **예외 처리:** 존재하지 않는 ID로 접근했을 때 앱 크래시를 방지하는 안전장치(`if (!product)`)를 포함합니다.
