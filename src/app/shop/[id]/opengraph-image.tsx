import { ImageResponse } from "next/og";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function OpenGraphImage({ params }: PageProps) {
  const { id } = await params;

  // 실제 서비스라면 상품 데이터를 가져옵니다.

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const product = await res.json();
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0f172a", // slate-900
        padding: "80px",
      }}
    >
      {/* 상단 브랜드 로고 또는 카테고리 */}
      <div style={{ color: "#fbbf24", fontSize: 24, fontWeight: "bold" }}>
        LUXURY JEWEL
      </div>
      {/* 중앙 상품명 */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 60,
            fontWeight: "black",
            color: "white",
            lineHeight: 1.2,
            marginBottom: "20px",
            // 텍스트가 너무 길면 말줄임 처리 등 스타일링 가능
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.title}
        </div>
        <div style={{ fontSize: 24, color: "#94a3b8" }}>
          특별한 가치를 만나보세요
        </div>
      </div>
      <div style={{ fontSize: 20, color: "#64748b" }}>luxurjewel.com</div>
    </div>,
    { width: 1200, height: 630 },
  );
}

export default OpenGraphImage;
