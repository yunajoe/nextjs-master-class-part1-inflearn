function page() {
  return (
    <div className="flex flex-col border border-gray-100 p-4 gap-2">
      <h1 className="text-3xl">내 주문 내역</h1>
      <div className="flex justify-between border border-white p-4 rounded-lg">
        <div>
          <p>기계시 키도브 청축</p>
          <p>2026.12.12</p>
        </div>
        <div className="rounded-lg bg-blue-300 self-center text-sm p-2">
          배송 완료
        </div>
      </div>
      <div className="flex justify-between border border-white p-4 rounded-lg">
        <div>
          <p>무서 게이밍 마우스</p>
          <p>2026.12.12</p>
        </div>
        <div className="rounded-lg bg-blue-300 self-center text-sm p-2">
          배송 완료
        </div>
      </div>
    </div>
  );
}

export default page;
