import { notFound } from "next/navigation";

async function page() {
  await new Promise((resolve) => setTimeout(resolve, 2500));

  if (Math.random()) {
    throw new Error("항공사 API 서버 응답 지연");
  }
  const flights = [{ id: "V-2026", city: "PARIS", price: "₩1,250,000" }];
  if (!flights || flights.length === 0) notFound();
  return (
    <div className="p-10">
      <h1 className="text-4xl font-black mb-10 text-slate-800 italic uppercase tracking-tighter">
        Available Flights
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-10 bg-white border-2 border-slate-100 rounded-[3.5rem] shadow-2xl hover:border-blue-500 transition-all">
          <span className="text-blue-500 font-black text-xs tracking-widest uppercase">
            Limited Offer
          </span>
          <h3 className="text-5xl font-black mt-3">{flights[0].city}</h3>
          <p className="text-slate-400 mt-2 font-bold italic tracking-tight">
            Direct Flight | Round Trip
          </p>
          <div className="mt-12 pt-8 border-t border-slate-50 flex justify-between items-end">
            <span className="text-3xl font-mono font-black text-blue-600">
              {flights[0].price}
            </span>
            <button className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold text-sm">
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
