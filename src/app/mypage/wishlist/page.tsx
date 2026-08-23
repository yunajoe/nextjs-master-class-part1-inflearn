function page() {
  return (
    <div className="flex flex-col border border-gray-100 p-4 gap-2">
      <h1 className="text-3xl">위시리스트</h1>
      <div className="flex  gap-2">
        <div className="flex-1 text-center border border-blue-100 rounded-lg p-2">
          <p>최신형 MP3노트북</p>
          <button>확인</button>
        </div>
        <div className="flex-1 text-center border border-blue-100 rounded-lg p-2">
          <p>최신형 MP3노트북</p>
          <button>확인</button>
        </div>
      </div>
    </div>
  );
}

export default page;
