interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  const product = await res.json();
  return {
    title: product.title,
    description: product.body.slice(0, 100),
    openGraph: {
      title: product.tile,
      description: "럭스쥬얼에서 제안하는 특별한 가치를 만나보세요.",
      // 절대 경로여야 하며, opengraph-image.tsx 파일이 있는 주소를 가리킵니다.
      images: [`https://your-domain.com/products/${id}/opengraph-image`],
      type: "article",
    },
  };
}

async function ProductDetail({ params }: PageProps) {
  const { id } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  const product = await res.json();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.image,
    description: product.description,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "KRW",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="min-h-screen bg-white p-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto border-t-4 border-amber-400 pt-12">
        <h1 className="text-5xl font-black text-slate-900 mb-8 italic">
          {product.title}
        </h1>
        <div className="prose prose-xl text-slate-600 leading-relaxed">
          {product.body}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
