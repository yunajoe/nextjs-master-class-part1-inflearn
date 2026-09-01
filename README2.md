### 01. 목록-상세 패턴 구현과 동적 데이터 흐름

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

### 02. Search Params

1. Search Params란?

- 주소창 물음표(?) 뒤에 붙는 옵션 값 (예: /products?sort=price)
- 목적지(Path)로 가는 '택시 기사님께 전달하는 추가 요구사항(옵션)
- URL의 물음표 뒤에 붙어 페이지에 대한 추가적인 옵션이나 필터링 조건을 서버에 전달할 때 사용. 목적지 자체보다는 '가는 방법'에 대한 정보

2. Next.js 15의 가장 큰 변화: 동기 ➡️ 비동기 (await)

- 변경 전: searchParams를 즉시 꺼내서 사용 (동기)
- 변경 후: searchParams가 Promise객체로 변경됨
- 이유: 값이 준비될 때까지 기다리는(await) 동안 다른 작업을 먼저 처리(스트리밍)하여 성능을 최적화하기 위함.

### 03. HTML <form>과 서버 컴포넌트로 검색 기능 구현

1. 핵심 철학: 웹 플랫폼 우선 (Web Platform First)

- useState, onChange 같은 복잡한 상태 관리 없이, HTML 기본 태그(<form>, <input>, name="q")만으로 검색 기능을 구현합니다.
- 점진적 향상(Progressive Enhancement): 자바스크립트가 느린 환경이나 로딩 전에도 브라우저 기본 규칙에 의해 검색 기능이 즉시 작동

2. 주요 컴포넌트 구현

- Search.tsx

```javascript
export default function Search({ initialQuery }: { initialQuery?: string }) {
  return (
    <form action="/products" className="flex flex-1 relative">
      <input
        name="q"
        defaultValue={initialQuery}
        placeholder="검색어를 입력하세요..."
        className="w-full border rounded-md px-3 py-2 text-black"
      />
      <button type="submit" className="hidden">검색</button>
    </form>
  );
}

```

```
1. action="/products": 폼 제출 시 브라우저가 직접 해당 주소로 이동시킵니다.
2. name="q": 입력값을 자동으로 URL의 쿼리 스트링(?q=검색어)으로 변환합니다.
3. defaultValue={initialQuery}: 비제어 컴포넌트 방식을 사용하여 브라우저가 입력값을 관리하게 두고, 서버에서 받은 초기값만 채워준다.

```

- page.tsx (서버 컴포넌트 & 데이터 필터링)

```javascript

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductListPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q : "";
  const sortOrder = typeof params.sort === 'string' ? params.sort : "";

  // 1. 검색 필터링
  let filteredProducts = products.filter(p => p.name.includes(query));

  // 2. 가격 정렬
  if (sortOrder === "asc") filteredProducts.sort((a, b) => a.price - b.price);
  if (sortOrder === "desc") filteredProducts.sort((a, b) => b.price - a.price);

  return (
    <div className="p-10">
      <Search initialQuery={query} />

      {/* 정렬 버튼 (검색어 q 유지) */}
      <Link href={{ query: { q: query, sort: 'asc' } }}>가격 낮은 순</Link>
      <Link href={{ query: { q: query, sort: 'desc' } }}>가격 높은 순</Link>

      {/* 결과 렌더링 */}
      {filteredProducts.map(p => (
        <div key={p.id}>{p.name} - {p.price.toLocaleString()}원</div>
      ))}
    </div>
  );
}

```
