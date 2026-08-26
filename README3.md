### 01. Next.js Catch-all Segments

1. 도입 배경

- 쇼핑몰 카테고리처럼 깊이가 무한히 깊어질 수 있는 경로(1단계 ~ 10단계 이상)를 매번 폴더로 만들면 유지보수가 불가능해집니다.

- 이를 해결하기 위해 등장한 기능이 바로 Catch-all Segments입니다.

2. 핵심 문법 비교 ([...slug] vs [[...slug]])

- 기본형 ([...slug]): 하위 경로가 최소 1개 이상 필수로 존재해야 합니다. (/shop 접속 시 404 에러)
- 선택적(Optional)형 ([[...slug]]): 하위 경로가 없어도 동작하며, 없을 경우 빈 배열([])을 반환합니다. 메인부터 깊은 경로까지 파일 하나로 통제할 때 적합

3. 실습 코드

```javascript
import React from 'react';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function AmazonCategoryPage({ params }: PageProps) {
  // Next.js 15 규칙: params는 비동기(Promise) 처리 필요
  const { slug = [] } = await params;

  const depth = slug.length;
  const currentCategoryName = depth > 0 ? slug[depth - 1] : "Amazon Home";

  return (
    <div className="p-10 max-w-7xl mx-auto font-sans text-slate-900">
      {/* 빵 부스러기(Breadcrumb) */}
      <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <span className="font-bold text-gray-900">Amazon</span>
        {slug.map((category, index) => (
          <div key={index} className="flex items-center gap-2">
            <span>&gt;</span>
            <span className="capitalize">{category}</span>
          </div>
        ))}
      </nav>

      {/* 조건부 렌더링 */}
      {depth === 0 ? (
        <div className="bg-slate-900 p-12 rounded-2xl text-center text-white">
          <h1 className="text-5xl font-extrabold">오늘의 핫딜을 만나보세요!</h1>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold mb-6 capitalize">
            {currentCategoryName} ({depth}단계 카테고리)
          </h1>
          {/* 배열 메서드 활용 (세일 배너) */}
          {slug.includes("sale") && (
            <div className="bg-red-50 p-6 mb-8 text-red-700 font-bold">
              🔥 마감 임박 세일!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

```

- params가 Promise 객체이므로 반드시 await을 사용해 값을 추출해야 합니다.
- 배열 활용의 장점:

```
- slug.length: 카테고리 깊이(Depth) 파악
- slug[depth - 1]: 현재 카테고리 이름 추출
- slug.includes("sale"): 배열 메서드를 활용한 유연한 키워드 검사 및 배너 조건부 렌더링

```
