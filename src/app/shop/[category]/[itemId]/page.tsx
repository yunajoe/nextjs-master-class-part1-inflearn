async function page({
  params,
}: {
  params: Promise<{ category: string; itemId: string }>;
}) {
  const { category, itemId } = await params;

  return (
    <div className="p-10 bg-emerald-50 min-h-screen">
      <div className="max-w-3xl bg-white p-12 rounded-[3rem] border-4 border-emerald-500 shadow-2xl">
        <h2 className="text-2xl font-black text-emerald-600 mb-10 italic border-b-2 pb-4">
          NESTED ROUTE INSPECTOR2
        </h2>
        <div className="grid grid-cols-2 gap-8">
          <div className="p-6 bg-emerald-50 rounded-2xl">
            <p className="text-xs font-bold text-emerald-400 mb-2 uppercase">
              Category
            </p>
            <p className="text-3xl font-black text-emerald-900">{category}</p>
          </div>
          <div className="p-6 bg-emerald-50 rounded-2xl">
            <p className="text-xs font-bold text-emerald-400 mb-2 uppercase">
              Item ID
            </p>
            <p className="text-3xl font-black text-emerald-900">{itemId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
