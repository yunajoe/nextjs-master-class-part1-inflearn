// [Phase 3] 조립 관제탑: 갤러리 페이지 (page.tsx)

import ArtFrame from "./art-frame";
import LikeButton from "./like-button";

// 역할: 서버 컴포넌트(Orchestrator)입니다. 미술품 데이터를 DB에서 가져오듯 시뮬레이션하고, 클라이언트 액자와 서버 데이터를 하나로 조립합니다.
function page() {
  // [서버 컴포넌트 데이터] 브라우저 자바스크립트 번들에 포함되지 않는 무거운 텍스트
  const data = {
    title: "The Eternal Code",
    artist: "Leonardo da Dev",
    description:
      "이 작품은 서버 컴포넌트 합성 패턴의 정수를 보여줍니다. 지금 보고 계시는 이 방대한 설명 텍스트는 수천 줄이 되더라도 클라이언트의 자바스크립트 실행 속도에 전혀 부담을 주지 않습니다. 이미 서버에서 순수한 HTML로 구워졌기 때문입니다.",
    details: "캔버스 위 유채, 2026년 작. 런던 아키텍처 박물관 소장.",
  };
  return (
    // <div className="bg-gray-100 h-screen flex flex-col gap-12 items-center">
    //   {/* 타이틀 */}
    //   <h1 className="text-6xl mt-20 border-b-4">LUX-GALLERY.</h1>
    //   {/* client 카드 */}
    //   <ArtFrame>
    //     <div className="flex items-center justify-between">
    //       <h1 className="text-6xl">{data.title}</h1>
    //       <LikeButton />
    //     </div>
    //     <p className="text-xl">Curated by {data.artist}</p>
    //     <p className="text-[20px]">{data.description}</p>
    //     <span className="text-sm">{data.details}</span>
    //   </ArtFrame>
    // </div>
    <div className="min-h-screen bg-stone-100 p-20 flex flex-col items-center">
      <h1 className="text-4xl font-black text-slate-800"> LUX-GALLERY.</h1>
      <div className="max-w-3xl w-full">
        <ArtFrame>
          <div className="space-y-10">
            <header className="flex justify-between items-start">
              <div>
                <h2 className="text-5xl font-serif font-bold text-slate-900 leading-tight">
                  {data.title}
                </h2>
                <p className="text-stone-400 mt-2 text-lg font-medium">
                  Curated by {data.artist}
                </p>
              </div>

              {/* 나무잇 */}
              <LikeButton />
            </header>
            <div className="prose prose-stone text-xl leading-relaxed text-slate-700 italic border-l-2 border-stone-100 pl-8">
              <p>{data.description}</p>
            </div>
            <footer>
              <p className="text-sm font-mono text-stone-300 uppercase tracking-widest leading-loose">
                Provenance: {data.details}
              </p>
            </footer>
          </div>
        </ArtFrame>
      </div>
    </div>
  );
}

export default page;
