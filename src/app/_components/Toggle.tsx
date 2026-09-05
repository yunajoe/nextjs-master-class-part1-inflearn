"use client"; // 클라이언트 경계 선언: 이 파일 하위는 모두 클라이언트 컴포넌트가 됨

import { useState } from "react";

export default function DevicePowerToggle({ name }: { name: string }) {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex flex-col items-center p-12 bg-white rounded-[3rem] border-4 border-blue-50 shadow-xl">
      <p className="text-slate-400 font-black mb-8 tracking-widest uppercase">
        {name} POWER STATUS
      </p>
      <button
        onClick={() => setIsOn(!isOn)}
        className={`relative h-48 w-48 rounded-full border-[16px] transition-all duration-700 ease-in-out shadow-2xl flex items-center justify-center ${
          isOn
            ? "bg-blue-600 border-blue-100 rotate-180 shadow-blue-300 scale-105"
            : "bg-slate-50 border-slate-100 rotate-0 shadow-inner scale-100"
        }`}
      >
        <span
          className={`text-6xl font-black ${isOn ? "text-white" : "text-slate-200"}`}
        >
          {isOn ? "ON" : "OFF"}
        </span>
      </button>
      <p className="mt-10 text-[10px] font-black text-blue-500 uppercase tracking-widest animate-bounce">
        {isOn ? "Real-time Control Active" : "Standby Mode"}
      </p>
    </div>
  );
}
