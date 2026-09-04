"use client"; // 액자 레이아웃만 클라이언트 번들에 포함

import { ReactNode } from "react";

// [중요] 서버 컴포넌트를 import 하지 않습니다. 오직 children으로 받습니다.
export default function ArtFrame({ children }: { children: ReactNode }) {
  return (
    <div className="group relative border-[16px] border-slate-900 p-12 bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] transition-all duration-700 hover:scale-[1.01] hover:-rotate-1">
      <div className="absolute top-4 left-6 z-10">
        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-300">
          Exclusive Archive
        </span>
      </div>

      {/* 이 children 내부의 서버 컴포넌트는 이미 서버에서 
        HTML 결과물로 변환된 상태로 이 자리에 끼워넣어집니다. 
        덕분에 서버 컴포넌트의 고유한 특징(속도, 보안)이 유지됩니다.
      */}
      <div className="relative z-0">{children}</div>
    </div>
  );
}
