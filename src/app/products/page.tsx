import { notFound } from "next/navigation";

function page() {
  const products: any[] = [];

  if (products.length === 0) {
    notFound();
  }

  // 데이터가 있을 때만 이 화면이 보입니다.
  return <div>데이터 page</div>;
}

export default page;
