import Link from "next/link";

const products = [
  { id: 1, name: "초경량 노트북", price: "1,200,000원" },
  { id: 2, name: "무소음 기계식 키보드", price: "185,000원" },
  { id: 3, name: "인체공학 버티컬 마우스", price: "89,000원" },
];

function page() {
  return (
    <div>
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.price}</p>
          <Link
            href={`/products/${product.id}`}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            상세보기
          </Link>
        </div>
      ))}
    </div>
  );
}

export default page;
