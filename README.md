# 3대 안전 장치: not-found.tsx

## 1. Next.js 404 핵심 개념

- **`not-found.tsx`**: 라우트 세그먼트별 404 에러 화면을 렌더링하는 컨벤션 파일입니다.
- **`notFound()` 함수 (`next/navigation`)**: URL 경로는 올바르지만 DB에 데이터가 없는 경우(예: 삭제된 상품 조회) 서버에서 프로그래밍 방식으로 404를 강제 트리거하는 제어 함수입니다. 렌더링을 즉시 중단(Throw)하고 가장 가까운 `not-found.tsx`를 호출하며, 검색 엔진(SEO)을 위해 정확한 HTTP 404 상태 코드를 반환합니다.

## 2. 파일 배치 규칙 및 계층 구조 (Hierarchy)

- **글로벌 404 (`src/app/not-found.tsx`)**: 애플리케이션 전체를 관장하는 최상위 404 페이지입니다.
- **로컬 404 (`src/app/[section]/not-found.tsx`)**: 특정 도메인(예: 블로그, 상품 등) 내에서만 독립적으로 작동하는 전용 404 페이지입니다.
- **탐색 우선순위**: 에러 발생 지점에서 트리 구조를 거슬러 올라가며 **가장 가까운(Nearest)** `not-found.tsx`를 우선 렌더링합니다.

## 3. 주요 실습 구현 포인트

- **글로벌 UI 디자인 (`src/app/not-found.tsx`)**:
- Tailwind CSS의 연한 대형 폰트(`text-9xl text-indigo-200`)로 시각적 깊이감 조성
- 회전 배지(`rotate-12`)를 활용해 "의도적으로 디자인된 안내 페이지"라는 심리적 안정감 제공
- CSS `group`과 `translate` 속성을 이용한 3D 입체 버튼 및 `<Link>` 컴포넌트를 통한 명확한 홈 복구 경로 제공

- **프로그래밍 방식 제어 (`src/app/products/page.tsx`)**:
- 데이터 페칭 결과가 비어있을 경우(`if (products.length === 0)`) `notFound()`를 실행하여 즉시 예외 처리

## 4. 요약 및 베스트 프랙티스

- 404 페이지는 단순한 오류 화면이 아닌 **브랜드 경험의 연장선**입니다.
- 사용자가 길을 잃었을 때 이탈하지 않도록 **홈으로 돌아가기 등의 명확한 네비게이션**을 반드시 제공해야 합니다.
- UI 렌더링과 동시에 **HTTP 404 상태 코드**가 정상 반환되는지 확인하여 SEO 품질을 유지해야 합니다.

# 3대 안전 장치: loading.tsx

## 1. 개요 및 핵심 개념

- **주요 목표**: 데이터 페칭 지연 시 발생하는 흰 화면(Blank Screen) 이탈 방지 및 사용자 체감 속도 향상
- **`loading.tsx`**: Next.js App Router의 특수 예약 파일로, 데이터가 로딩되는 동안 표시될 대체 UI(fallback)를 정의합니다.
- **동작 원리 (Streaming SSR & React Suspense)**:
- Next.js는 내부적으로 페이지 컴포넌트를 `<Suspense fallback="{<Loading"/>}>`으로 감싸 처리합니다.
- 서버에서 데이터 조회가 끝나기 전이라도 당장 보낼 수 있는 레이아웃과 `loading.tsx` 조각을 브라우저에 먼저 스트리밍하여 즉각 응답합니다.

---

## 2. 로딩 UI 구현 유형 및 파일 위치

| 구분                 | 파일 경로                      | 주요 특징 및 구현 UI                                                                     |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------------------- |
| **글로벌 로딩 UI**   | `src/app/loading.tsx`          | 전체 앱 기본 적용. 회전 스피너(`animate-spin`) 및 배경 블러(`backdrop-blur-sm`) 오버레이 |
| **세그먼트 로딩 UI** | `src/app/products/loading.tsx` | 해당 라우트 하위 전용. 레이아웃 이동(CLS)을 방지하는 **스켈레톤(Skeleton) UI**           |

---

## 3. 핵심 실습 및 코드 포인트

### 1) 지연 상황 시뮬레이션 (`src/app/products/page.tsx`)

- 비동기 서버 컴포넌트 내에서 `await new Promise(...)`를 사용해 인위적인 3초 데이터 로딩 지연 생성

### 2) 세그먼트 전용 스켈레톤 UI (`src/app/products/loading.tsx`)

- **레이아웃 유지**: 실제 페이지의 Grid 구조를 동일하게 모사하여 화면 덜컹거림(Layout Shift) 방지
- **애니메이션**: Tailwind CSS의 `animate-pulse`를 활용해 반짝이는 뼈대 카드 생성
- **반복 생성 트릭**: `[...Array(4)].map(...)` 구조로 복수의 스켈레톤 카드를 간결하게 렌더링

---

## 4. 요약 및 핵심 이점

- **사용자 이탈률 감소**: 즉각적인 시각적 피드백 제공으로 시스템 정상 동작 신호 전달
- **SEO 및 성능 최적화**: Blocking SSR 방식의 대기 시간을 극복하고 Streaming SSR을 통한 빠른 초기 UI 제공

# 3대 안전 장지: error.tsx

## 1. 개요: 에러를 다루는 자세

- **핵심 목표**: 서버 장애나 예외 상황에서도 브라우저의 '하얀 화면' 대신 세련된 에러 안내 카드와 재시도 버튼을 제공하여 서비스 신뢰도 유지
- **Next.js 에러 핸들링의 장점**: 에러가 발생한 컴포넌트 영역만 격리하여 처리하므로, 상단 네비게이션이나 푸터 같은 레이아웃(Layout)은 그대로 유지됨

---

## 2. `error.tsx` 구현 및 절대 규칙

### 필수 준수 사항

1. **파일명**: 반드시 소문자로 `error.tsx` 사용
2. **클라이언트 컴포넌트**: 최상단에 `'use client'` 지시어 필수 (`onClick` 이벤트 및 상태 인터랙션 필요)

### 주요 Props

- **`error`**: 에러 상세 정보 객체
- _보안 적용_: 프로덕션 환경에서는 DB 비밀번호나 쿼리문 노출을 방지하기 위해 실제 메시지 대신 무작위 해시 문자열인 `digest` 값만 클라이언트로 전달 (서버 터미널 로그에서 디버깅용으로 활용)

- **`reset`**: 브라우저 전체 새로고침 없이 에러가 발생한 컴포넌트 영역만 재실행(Re-render)하는 복구 함수

### 코드 예시 (`src/app/products/error.tsx`)

```tsx
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("🚨 [System Error 낚아챔]:", error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center gap-6 p-8 bg-white border border-red-100 rounded-xl mt-8 shadow-sm text-black">
      <div className="text-center space-y-4">
        <div className="text-6xl animate-bounce">💣</div>
        <h2 className="text-2xl font-bold text-gray-900">
          문제가 발생했습니다.
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          일시적인 네트워크 오류로 상품 정보를 불러오지 못했습니다. 잠시 후 다시
          시도해 주세요.
        </p>

        {error.digest && (
          <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded font-mono inline-block">
            Error ID: {error.digest}
          </p>
        )}
      </div>

      <button
        onClick={() => reset()}
        className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-md"
      >
        다시 시도하기
      </button>
    </div>
  );
}
```

---

## 3. 리액트 에러 경계(Error Boundary) 구조

- **샌드위치 구조**: `Layout (빵)` > `Error Boundary (양상추)` > `Page (고기 패티)`
- **동작 방식**: 안쪽의 `page.tsx`에서 에러가 발생해도 바깥쪽 `error.tsx`가 에러를 흡수하므로, 루트 레이아웃의 네비게이션이나 사이드바는 정상적으로 유지됨

---

## 4. 최후의 보루: `global-error.tsx`

- **용도**: 최상위 `src/app/layout.tsx` (루트 레이아웃) 자체에서 에러가 발생했을 때 앱 전체의 붕괴를 막는 최후 방어선
- **특징**: 기존 레이아웃이 완전히 깨진 상태에서 렌더링되므로, 파일 내부에서 **`<html>`과 `<body>` 태그를 직접 정의**해야 함

### 코드 예시 (`src/app/global-error.tsx`)

```tsx
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-black">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          치명적인 시스템 에러가 발생했습니다.
        </h2>
        <p className="mb-6">이용에 불편을 드려 대단히 죄송합니다.</p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          서비스 전체 다시 로드
        </button>
      </body>
    </html>
  );
}
```

## 5. reset과 refresh의 사용

- **`use client` 필수 이유**: 에러 UI 렌더링 및 복구 버튼 클릭 이벤트 처리는 브라우저 상호작용이 필수이므로 클라이언트 컴포넌트로 선언해야 함
- **Digest 활용**: 보안을 위해 실제 에러 메시지는 숨겨지며, 대신 전달되는 해시값(`digest`)을 통해 서버 로그에서 원인 역추적 가능

````

## 왜 `reset()`만 쓰면 안 될까? (실무의 함정)

- **클라이언트 라우터 캐시**: Next.js App Router는 성능 최적화를 위해 브라우저 단에 강력한 캐시를 유지함
- **한계**: 서버 컴포넌트(`page.tsx`) 에러 상황에서 `reset()`만 호출하면 React는 컴포넌트만 재렌더링하려 하지만, 브라우저는 캐시에 남아있는 실패 상태를 그대로 가져오기 때문에 **버튼을 눌러도 에러 화면이 반복되는 먹통 현상**이 발생함

---

##  Next.js 15 완벽 대응 복구 패턴 (`router.refresh() + reset()`)

실무에서는 서버로 강제 요청을 보내 최신 데이터를 가져오고 에러 UI를 동시에 해제해야 함

### 동작 원리

1. **`router.refresh()`**: 브라우저 라우터 캐시를 비우고 서버에 새로운 데이터 재요청
2. **`reset()`**: 화면에 떠 있는 에러 경계(Error Boundary) UI 초기화
3. **`startTransition`**: React 18 동시성 렌더링 기능을 이용해 위 두 작업을 백그라운드에서 하나로 묶어 처리함으로써 화면이 하얗게 깜빡이지 않고 부드럽게 전환되도록 보장

### 적용 코드 예시

```tsx
"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  const handleRetry = () => {
    startTransition(() => {
      router.refresh(); // 1. 라우터 캐시 갱신 및 서버 데이터 재요청
      reset(); // 2. 에러 경계 초기화
    });
  };

  return (
    <div className="p-6 text-center">
      <p>문제가 발생했습니다. (Error ID: {error.digest})</p>
      <button
        onClick={handleRetry}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-4"
      >
        다시 시도하기
      </button>
    </div>
  );
}
```
````
