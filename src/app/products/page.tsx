import Link from "next/link";

const PRODUCTS = [
  { id: 1, name: "AI 스마트 냉장고", price: 2500000, category: "kitchen" },
  { id: 2, name: "초고화질 8K TV", price: 4200000, category: "living" },
  { id: 3, name: "로봇 청소기 Pro", price: 850000, category: "living" },
  { id: 4, name: "스마트 오븐 레인지", price: 450000, category: "kitchen" },
];

interface PageProps {
  searchParams: {
    sort?: string;
    category?: string;
  };
}

async function page({ searchParams }: PageProps) {
  const { sort, category } = await searchParams;

  let filtered = [...PRODUCTS];
  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (sort === "asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "desc") filtered.sort((a, b) => b.price - a.price);

  return (
    <div>
      <h1 className="text-4xl font-black italic">SMART SHOPPING.</h1>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/products?category=kitchen"
          className="px-4 py-2 bg-white border rounded-full text-sm font-bold hover:border-indigo-500"
        >
          🍳 Kitchen
        </Link>
        <Link
          href="/products?category=living"
          className="px-4 py-2 bg-white border rounded-full text-sm font-bold hover:border-indigo-500"
        >
          📺 Living
        </Link>
        <Link
          href="/products?sort=asc"
          className="px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-bold"
        >
          Low Price
        </Link>
        <Link
          href="/products?sort=desc"
          className="px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-bold"
        >
          High Price
        </Link>
        <Link
          href="/products"
          className="px-4 py-2 bg-red-50 text-red-500 rounded-full text-sm font-bold"
        >
          Reset
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.map((product) => (
          <div key={product.id}>
            <span>{product.category}</span>
            <h2 className="text-xl font-bold mb-4">{product.name}</h2>
            <p className="text-2xl font-black mb-8 text-slate-400 group-hover:text-indigo-600 transition-colors">
              ₩{product.price.toLocaleString()}
            </p>
            <Link
              href={`/products/${product.id}`}
              className="block w-full text-center py-4 bg-slate-50 rounded-2xl font-bold text-sm hover:bg-slate-900 hover:text-white transition-colors"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
