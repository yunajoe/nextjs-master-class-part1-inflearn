import ArtFrame from "./art-frame";
import LikeButton from "./like-button";

export default function GalleryPage() {
  // [서버 컴포넌트 데이터] 브라우저 자바스크립트 번들에 포함되지 않는 무거운 텍스트
  const masterpiece = {
    title: "The Eternal Code",
    artist: "Leonardo da Dev",
    description:
      "이 작품은 서버 컴포넌트 합성 패턴의 정수를 보여줍니다. 지금 보고 계시는 이 방대한 설명 텍스트는 수천 줄이 되더라도 클라이언트의 자바스크립트 실행 속도에 전혀 부담을 주지 않습니다. 이미 서버에서 순수한 HTML로 구워졌기 때문입니다.",
    details: "캔버스 위 유채, 2026년 작. 런던 아키텍처 박물관 소장.",
  };

  return (
    <div className="min-h-screen bg-stone-100 p-20 flex flex-col items-center">
      <h1 className="text-4xl font-black text-slate-800 mb-20 tracking-tighter italic border-b-4 border-slate-900 pb-2">
        LUX-GALLERY.
      </h1>

      <div className="max-w-3xl w-full">
        {/* [Composition Pattern] 클라이언트(Frame)가 서버(Data)를 품는 구조 */}
        <ArtFrame>
          <div className="space-y-10">
            <header className="flex justify-between items-start">
              <div>
                <h2 className="text-5xl font-serif font-bold text-slate-900 leading-tight">
                  {masterpiece.title}
                </h2>
                <p className="text-stone-400 mt-2 text-lg font-medium">
                  Curated by {masterpiece.artist}
                </p>
              </div>

              {/* 나뭇잎 패턴: 상호작용은 버튼에만 국한시킵니다. */}
              <LikeButton />
            </header>

            <div className="prose prose-stone text-xl leading-relaxed text-slate-700 italic border-l-2 border-stone-100 pl-8">
              <p>{masterpiece.description}</p>
            </div>

            <footer className="pt-10 border-t border-stone-50">
              <p className="text-sm font-mono text-stone-300 uppercase tracking-widest leading-loose">
                Provenance: {masterpiece.details}
              </p>
            </footer>
          </div>
        </ArtFrame>
      </div>
    </div>
  );
}
