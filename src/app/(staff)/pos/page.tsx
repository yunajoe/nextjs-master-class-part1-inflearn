import { formatCurrency } from "@/src/app/_utils/currency";

function page() {
  const totalSales = 1245000;

  return (
    <div>
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Live Orders</h1>
          <p className="text-slate-500 font-medium mt-2">
            강남 본점 실시간 주문 현황
          </p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-slate-400 font-bold text-sm">금일 누적 매출</h3>

          {/* _utils/currency.ts 에서 가져온 함수로 숫자를 원화(₩)로 변환하여 출력합니다. */}
          <p className="text-4xl font-black text-slate-800 mt-4">
            {formatCurrency(totalSales)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
