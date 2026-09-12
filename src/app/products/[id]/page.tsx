// true(기본값): 미리 빌드 안 된 ID로 접속 시 실시간 생성(Dynamic)
// false: 미리 빌드 안 된 ID로 접속 시 즉시 404 페이지 반환
export const dynamicParams = true;
/**
 * 정적 파라미터 생성 함수
 * 빌드 타임에 실행되어 "이 ID들로 페이지를 미리 만들어줘"라고 명령합니다.
 */

export async function generateStaticParams() {
  //  실무에서는 DB에서 인기가 많은 상위 10개 상품의 ID 목록만 가져옵니다.
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  //  반드시 [{ id: '1' }, { id: '2' }, ...] 형태의 문자열 배열을 반환
  return posts.slice(0, 10).map((post: { id: number }) => ({
    id: String(post.id),
  }));
}
interface PageProps {
  params: Promise<{ id: string }>;
}

async function page({ params }: PageProps) {
  const { id } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!res.ok)
    return <div className="p-10">상품 정보를 불러올 수 없습니다.</div>;

  const product = await res.json();
  return <div>page</div>;
}

export default page;
