// [Phase 2] 함정 탈출: 칠드런 액자 (ArtFrame.tsx)
// 역할: 자식 컴포넌트(children)를 품는 클라이언트 컴포넌트입니다.
// 핵심: 서버 컴포넌트를 직접 import 하지 않고, children props
"use client";

function ArtFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-8 max-w-3xl w-full p-8 flex flex-col gap-4 transition duration-300 ease-in-out hover:-rotate-5 hover:scale-105">
      {children}
    </div>
  );
}

export default ArtFrame;
