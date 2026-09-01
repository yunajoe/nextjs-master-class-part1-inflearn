// 초기 화면 (/drive 접속 시)

import FileSearch from "@/src/app/components/FileSearch";
import Link from "next/link";

const data = [
  {
    id: 1,
    name: "2024_연봉계약서.pdf",
    path: ["documents", "work"],
    ext: "pdf",
    size: "1.2MB",
  },
  {
    id: 2,
    name: "프로젝트_기획안.pdf",
    path: ["documents", "work"],
    ext: "pdf",
    size: "3.5MB",
  },
  {
    id: 3,
    name: "휴가사진1.jpg",
    path: ["images", "2024"],
    ext: "image",
    size: "4.2MB",
  },
  {
    id: 4,
    name: "디자인_시안_최종.png",
    path: ["images"],
    ext: "image",
    size: "8.1MB",
  },
  { id: 5, name: "이력서_국문.pdf", path: [], ext: "pdf", size: "2.1MB" },
  { id: 6, name: "프로젝트_백업.zip", path: [], ext: "zip", size: "125MB" },
  {
    id: 7,
    name: "회의록_정리.docx",
    path: ["documents"],
    ext: "doc",
    size: "0.8MB",
  },
  {
    id: 8,
    name: "회사_로고_가로형.ai",
    path: ["images", "assets"],
    ext: "image",
    size: "2.4MB",
  },
  {
    id: 9,
    name: "영수증_모음.pdf",
    path: ["finance"],
    ext: "pdf",
    size: "5.5MB",
  },
  {
    id: 10,
    name: "기말고사_정리.docx",
    path: ["documents", "school"],
    ext: "doc",
    size: "2.3MB",
  },
];

interface PageProps {
  params: Promise<{ path: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
async function page({ params, searchParams }: PageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const { path = [] } = resolvedParams;
  const search =
    typeof resolvedSearchParams.search === "string"
      ? resolvedSearchParams.search
      : "";
  const ext =
    typeof resolvedSearchParams.ext === "string"
      ? resolvedSearchParams.ext
      : "";

  const currentPath = `/drive/${path.join("/")}`;

  let filterData = [...data];

  // search
  if (search) {
    filterData = filterData.filter((item) => item.name.includes(search.trim()));
  }
  // type
  if (ext) {
    filterData = filterData.filter((item) => item.ext === ext);
  }

  return (
    <div className="flex flex-col gap-6 px-20 py-16 min-h-screen">
      <h1 className="text-2xl font-bold">My Cloud Drive</h1>

      {/* 검색어와 필터  */}
      <nav className="bg-blue-200 p-2 flex justify-between items-center ">
        {/* 검색어 */}
        <FileSearch actionUrl={currentPath} searchValue={search} />
        {/* 필터 */}
        <ul className="flex-4 flex items-center justify-center gap-4">
          <Link
            href="/drive"
            className="p-2 w-30 border-2 border-gray-400 text-center"
          >
            전체
          </Link>
          <Link
            href={{
              pathname: currentPath,
              query: { search: search, ext: "pdf" },
            }}
            className="p-2 w-30 border-2 border-gray-400 text-center"
          >
            PDF만
          </Link>
          <Link
            href={{
              pathname: currentPath,
              query: { search: search, ext: "image" },
            }}
            className="p-2 w-30 border-2 border-gray-400 text-center"
          >
            이미지만
          </Link>
        </ul>
      </nav>

      {/* 데이터 */}
      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-bold">마이 드라이브 {currentPath}</h2>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
          {filterData.map((item) => (
            <div
              key={item.id}
              className="border-2 border-gray-200 p-3 flex flex-col items-center"
            >
              <h1>{item.name}</h1>
              {/* drive/${item.path.join("/")}와 같이 슬래시(/) 없이 상대 경로로 작성하면, 현재 URL 뒤에 경로가 계속 누적 */}
              <Link href={`/drive/${item.path.join("/")}`}>
                {item.path.join("/")}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
