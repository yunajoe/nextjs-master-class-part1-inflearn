// [Phase 2] 함정 탈출: 칠드런 액자 (ArtFrame.tsx)
// 역할: 자식 컴포넌트(children)를 품는 클라이언트 컴포넌트입니다.
// 핵심: 서버 컴포넌트를 직접 import 하지 않고, children props
"use client";

function ArtFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative border-[16px] border-slate-900 p-12 bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] transition-all duration-700 hover:scale-[1.01] hover:-rotate-1">
      <div className="bg-blue-100 absolute top-4 left-6 z-10">
        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-300">
          Exclusive Archive
        </span>
      </div>
      {/* 이 children 내부의 서버 컴포넌트는 이미 서버에서 
        HTML 결과물로 변환된 상태로 이 자리에 끼워넣어집니다. 
        덕분에 서버 컴포넌트의 고유한 특징(속도, 보안)이 유지됩니다.
      */}
      <div>{children}</div>
    </div>
  );
}

export default ArtFrame;
