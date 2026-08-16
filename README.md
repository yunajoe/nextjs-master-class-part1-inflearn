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
