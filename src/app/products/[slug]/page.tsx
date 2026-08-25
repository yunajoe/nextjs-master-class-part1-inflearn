async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <div className="max-w-2xl bg-white p-8 rounded-3xl shadow-xl border-2 border-blue-500">
        <h1 className="text-sm font-black text-blue-500 uppercase tracking-widest mb-2">
          Product Detail
        </h1>
        <h2 className="text-4xl font-black text-slate-900 italic uppercase">
          ITEM: <span className="text-blue-600">{slug}</span>
        </h2>
        <p className="mt-6 text-slate-500 leading-relaxed font-medium">
          이 페이지는{" "}
          <code className="bg-slate-100 px-2 py-1 rounded">[slug]</code>{" "}
          와일드카드를 통해 자동으로 생성된 페이지입니다. URL에 입력하신 "{slug}
          " 정보를 바탕으로 데이터를 조회합니다.
        </p>
      </div>
    </div>
  );
}

export default page;
