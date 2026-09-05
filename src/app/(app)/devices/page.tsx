// 기기 목록 및 검색 필터 (Server Component).
// No useState: 검색어를 저장하기 위해 React State를 절대 사용하지 말 것.
// No useEffect: 검색어 변경 감지를 위해 Effect를 사용하지 말 것.
// URL Driven: 모든 상태는 URL의 Query String(?q=조명&cat=light)에 의존해야 함.
// Link 컴포넌트 활용: 필터 버튼 클릭 시 router.push() 대신 <Link href={{ query: ... }} />를 사용하여 Next.js의 Prefetching 이점을 활용할 것.
// 보존 로직: 카테고리를 변경할 때 검색어(q)가 사라지지 않도록 기존 파라미터를 병합(Merge)하는 로직 필수.
function page() {
  return <div>page</div>;
}

export default page;
