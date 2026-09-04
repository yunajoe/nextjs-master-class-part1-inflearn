import BookmarkButton from "@/src/app/_components/BookmarkButton";
import GoalCounter from "@/src/app/_components/GoalCounter";

export interface SubjectCardData {
  id: number;
  title: string;
  buttonText: string;
  isSaved?: boolean;
}

export const data: SubjectCardData[] = [
  {
    id: 1,
    title: "민법 (총칙)",
    buttonText: "중요 법령 저장",
    isSaved: false,
  },
  {
    id: 2,
    title: "행정법",
    buttonText: "중요 법령 저장",
    isSaved: false,
  },
  {
    id: 3,
    title: "행정학개론",
    buttonText: "중요 법령 저장",
    isSaved: false,
  },
];

function page() {
  return (
    <div>
      <header className="bg-black flex items-center p-4">
        <nav className="font-bold text-2xl text-white">LAW PASS</nav>
      </header>
      {/* 메인 컨텐츠 */}
      <div className="flex flex-col gap-4 max-w-6xl mx-auto pt-10 h-screen">
        <h1 className="text-6xl">학습 대시보드</h1>
        <div className="flex flex-col gap-2 border-l-4 px-2 py-4 bg-blue-200">
          <p className="text-2xl">목표 카운터: 20개</p>
          {/* client 컴퍼넌트로 뺴기 */}
          <GoalCounter />
        </div>
        {/* 데이터 뿌리기 */}
        <div className="grid grid-cols-2 gap-4">
          {data.map((item) => (
            <div key={item.id} className="p-4 border-2 border-gray-500">
              <p className="text-2xl">{item.title}</p>
              {/* client 컴퍼넌트로  뺴기 */}
              <BookmarkButton itemId={item.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
