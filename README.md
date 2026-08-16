### 01. 하이드레이션(Hydration)과 Hydration Mismatch

```
**하이드레이션(Hydration)**은 서버에서 생성된 정적인 HTML(마네킹)에 자바스크립트 이벤트와 상태(영혼)를 결합하여 **상호작용 가능한 애플리케이션으로 전환하는 과정**입니다.

```

1. 서버와 브라우저의 릴레이 협동 (하이드레이션이란?)

- 비유: 컵라면 속 바짝 말린 건조 채소와 뜨거운 물
- 과정:

```
- 서버 (건조 상태): 완성된 형태의 정적 HTML을 미리 생성하여 브라우저로 전송합니다. 화면이 즉시 표시되지만 클릭이나 입력 등 인터랙션이 불가능한 상태입니다.

- 브라우저 (수분 공급): 뒤이어 다운로드된 자바스크립트(이벤트 리스너, 상태 관리 로직)를 전달받아 HTML 뼈대에 끼워 맞춥니다.

- 완성: 정적인 페이지가 상호작용 가능한 '살아있는 앱'으로 변신합니다

```

```
[서버: 정적 HTML 생성] ──► [브라우저: 초기 화면 즉시 출력] ──► [JS 다운로드 및 하이드레이션] ──► [상호작용 가능]
  (차가운 밀랍 인형)          (눈으로 확인 가능, 클릭 불가)         (이벤트 리스너/상태 결합)         (살아있는 앱)

```

2. Next.js의 성능 극대화: 부분 하이드레이션 (Partial Hydration)

- 비유: 스마트 스프링클러

- 과거 방식: 페이지 전체의 인터랙션을 위해 마당 전체(모든 컴포넌트)에 거대한 JS 용량(물)을 들이부어야 했습니다.

- Next.js App Router 방식:

```
- 서버 컴포넌트(RSC): 변하지 않는 돌멩이로 취급하여 하이드레이션 대상에서 제외합니다 (JS 번들 0바이트).
- 클라이언트 컴포넌트 ('use client'): 인터랙션이 필요한 꽃(버튼, 입력창 등)만 콕 집어서 하이드레이션을 진행합니다.

```

3. 전 세계 개발자의 악몽: Hydration Mismatch

- 개념: 서버가 렌더링한 HTML 트리 구조/내용과 브라우저가 첫 렌더링 시 기대하는 HTML 트리 구조/내용이 일치하지 않을 때 발생합니다.

- 원인:

```
- 서버와 브라우저의 연산 결과가 다른 경우 (new Date(), Math.random(), window 객체 참조 등).
- HTML 표준 스펙을 위반한 잘못된 태그 중첩 (<p> 태그 내부에 <div> 태그 삽입 등). 브라우저가 DOM을 임의로 수정하면서 React의 가상 DOM과 불일치 발생.
```

- 결과: React가 기존 HTML을 파괴하고 처음부터 다시 그리는 재연산(Re-render) 과정을 거치게 되어 초기 성능이 저하되고 빨간 에러 콘솔이 출력됩니다.

```
- Next.js 15 업데이트: Hydration Mismatch 발생 시 서버 렌더링 결과와 클라이언트 렌더링 결과의 차이점을 '틀린 그림 찾기' 형태의 Diff 뷰로 명확하게 시각화하여 원인 파악이 쉬워졌습니다.
```

```javascript
/* ❌ [안티 패턴] Mismatch를 유발하는 실수 */
export default function TimeDisplay() {
  // 🚨 실수 1: 서버 생성 시간(10:00:00)과 브라우저 실행 시간(10:00:01)이 불일치
  const time = new Date().toLocaleTimeString();

  // 🚨 실수 2: 서버 주사위 값과 브라우저 주사위 값이 불일치
  const randomId = Math.random();

  return (
    <div id={randomId.toString()}>
      <h1>현재 시각</h1>
      <p>{time}</p>

      {/* 🚨 실수 3: HTML 문법 위반 (<p> 안의 <div>)으로 브라우저가 DOM을 강제 수정 */}
      <p>
        <div>Description</div>
      </p>
    </div>
  );
}
```

4. Mismatch 해결 패턴

| 해결 패턴                      | 동작 원리                                                                                  | 주요 사용처                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------------- |
| **Two-Pass Rendering**         | 초기 HTML을 동일하게 맞추고, 하이드레이션 완료 후(`useEffect`) 클라이언트 전용 데이터 반영 | 클라이언트 시간, 로컬 스토리지 데이터 기반 UI |
| **`suppressHydrationWarning`** | React에게 해당 요소의 텍스트 불일치 경고를 무시하도록 지시                                 | 단순 시간/날짜 표시, 사용자 위치 기반 텍스트  |

```javascript
/* ✅ [해결책] Mismatch를 해결하는 올바른 패턴 */
"use client";

import { useState, useEffect } from "react";

export default function SafeTimeDisplay() {
  // ✨ 패턴 1: Two-Pass Rendering (서버/클라이언트 초기 상태 강제 동기화)
  // 초기값을 null로 설정하여 서버와 브라우저의 첫인상을 동일하게 유지
  const [time, setTime] = (useState < string) | (null > null);

  useEffect(() => {
    // useEffect는 하이드레이션이 완료된 후(브라우저 환경)에만 실행됨
    setTime(new Date().toLocaleTimeString());
  }, []);

  return (
    <div>
      <h1>현재 시각</h1>

      {/* 해결방법 1: 조건부 렌더링 (안전한 정석 패턴) */}
      {time ? <p>{time}</p> : <p>Loading...</p>}

      {/* ✨ 패턴 2: suppressHydrationWarning (텍스트 불일치 예외 처리) */}
      {/* 텍스트 내용의 불일치만 허용할 때 사용하는 속성 (태그 구조 오류에는 사용 불가) */}
      <p suppressHydrationWarning>{new Date().toLocaleTimeString()}</p>
    </div>
  );
}
```

### 02. Navigation 패러다임: Hard Navigation vs Soft Navigation

```
Next.js는 전통적인 `<a>` 태그 기반의 **Hard Navigation(전체 새로고침)** 방식에서 벗어나, `<Link>` 컴포넌트를 통한 **Soft Navigation(부분 교체)**과 **Prefetching(미리 가져오기)**을 활용해 앱과 같은 끊김 없는 사용자 경험을 구현합니다.
```

1. 1세대 방식: Hard Navigation의 한계 (철거 후 재건축)

- 비유: 이사 (포크레인 철거)
  옆집으로 이동하기 위해 현재 살던 집을 포크레인으로 완전히 부수고, 새 땅에서 기초 공사부터 다시 시작하는 방식입니다. 브라우저는 현재 DOM 트리를 완전히 파괴(Unmount)하고 서버로부터 새 HTML을 받아 처음부터 다시 그립니다.

```
🔍 하드 네비게이션의 3대 Pain Points
- 화면 깜빡임 (White Flash): 기존 페이지가 파괴되고 새 페이지 HTML을 수신할 때까지 하얀 공백 화면 노출.
- 상태 소멸 (State Loss): 메모리에 저장되어 있던 작성 중인 댓글, 스크롤 위치, 입력 폼 데이터, 열린 모달/사이드바 상태 등이 전면 초기화됨.
- 비효율적인 재연산: 페이지 이동 시 변하지 않는 공통 UI(Header, Footer, Navigation Bar 등)까지 부수고 처음부터 다시 만듦.

```

```javascript
/* ❌ [Pain Point] Hard Navigation (기본 <a> 태그) - 파괴적인 이동 */
export default function NavBar() {
  return (
    <nav>
      {/* 클릭 시 브라우저 전체가 새로고침되며 모든 React State가 증발합니다. */}
      <a href="/dashboard">Dashboard (Hard)</a>
      <a href="/settings">Settings (Hard)</a>
    </nav>
  );
}
```

2. Next.js의 솔루션: Soft Navigation과 '완제품 가구' 배송

- 핵심 개념: RSC Payload (부분 리모델링)
- 페이지 전체를 부수지 않고, 변경이 필요한 영역의 RSC Payload(완성된 가구 지시서)만 서버로부터 받아와 필요한 부분만 콕 집어서 교체합니다.

```
💡 React Router vs Next.js Router (가구 배송 비유)
- React Router (SPA): 텅 빈 방에 목재/나사(JSON 데이터)와 조립 설명서(JS 번들)가 배송됨. 브라우저가 땀 흘려 가구를 직접 조립해야 함 (클라이언트 연산 부담 ⬆️).
- Next.js Router: 공장에서 이미 조립이 끝난 완성형 가구(RSC Payload)가 배송됨. 브라우저는 가져온 가구를 알맞은 위치에 놓기만 하면 됨 (브라우저 부담 ⬇️, 속도)

```

```javascript
/* ✅ [Solution] Next.js <Link> (Soft Navigation) - 부드러운 전환 */
import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      {/* 클릭 시 바뀔 부분의 '완제품(RSC Payload)'만 가져와 화면을 교체합니다. */}
      {/* 새로고침이 발생하지 않아 스크롤, 영상 재생, 폼 입력 상태가 유지됩니다. */}
      <Link href="/dashboard">Dashboard (Soft)</Link>
      <Link href="/settings">Settings (Soft)</Link>
    </nav>
  );
}
```

3. [Deep Dive] '프리패칭(Prefetching)'의 동작 원리

- 개념: 사용자가 링크를 클릭하기도 전에, 다음 이동할 페이지의 데이터를 백그라운드에서 미리 받아오는 기술입니다.
- 비유: 베테랑 셰프의 예측 요리
  손님이 메뉴판에서 '파스타'를 유심히 쳐다보는 순간, 눈치 빠른 셰프(Next.js)가 주문이 들어오기도 전에 미리 면을 삶아두어 주문 즉시 요리를 내어주는 원리와 같습니다

```
[1. 시야 감지 (Intersection Observer)]
  └─► 화면 내에 <Link> 컴포넌트가 노출(Viewport 진입)되었는지 감지
       └─► [2. 백그라운드 다운로드 (Background Prefetch)]
            └─► 사용자가 클릭하기 전, 백그라운드에서 해당 페이지의 RSC Payload를 미리 다운로드
                 └─► [3. 즉시 전환 (Instant Transition)]
                      └─► 클릭하는 순간 네트워크 대기 시간 없이 0초 만에 화면 전환 완료
```
