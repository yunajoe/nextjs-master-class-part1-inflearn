// import React from 'react'
// 🛠️ 상세 구현 사항 (Implementation Requirements)
// [Phase 1] 데이터 모델링 및 타입 안전성
// [REQ-01] 뉴스 데이터 정의: 외부 API(JSONPlaceholder)에서 받아올 뉴스 포스트의 형태를 TypeScript interface로 정의하여 타입 안정성을 확보함.
// [Phase 2] 서버 사이드 데이터 페칭 (22강 핵심)
// [REQ-02] Async 컴포넌트 설계: 컴포넌트에 async를 붙여 await fetch() 문법을 사용, 동기 코드처럼 직관적인 데이터 흐름을 설계함.
// [REQ-03] Zero Bundle Size: 페칭 로직이 브라우저의 자바스크립트 번들에 포함되지 않도록 서버 컴포넌트 원칙을 고수함.
// [Phase 4] 안정성 및 데이터 가공
// [REQ-04] 에러 바운더리 연동: 응답 객체(res.ok)를 체크하여 실패 시 에러를 던지고, 이전에 구축한 error.tsx가 이를 포착하도록 설계함.
// [REQ-05] 데이터 정제: 수백 개의 뉴스 중 상위 6개만 선별(slice)하고, 실제 데이터에 없는 '발행일'이나 '카테고리'를 서버에서 가공하여 화면에 전달함.
interface Data {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <div>
      {items.map((item, idx) => (
        <div key={idx}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

async function page() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const result = await fetch(url);
  if (!result.ok) {
    throw new Error("FETCHING 실패");
  }
  const data = await result.json();

  return (
    <List<Data>
      items={data}
      renderItem={(item) => (
        <>
          <p>{item.title}</p>
          <p>{item.body}</p>
        </>
      )}
    />
  );
}

export default page;
