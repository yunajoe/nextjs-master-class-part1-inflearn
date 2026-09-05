"use client";

import { useState } from "react";

// 적용: ThemeWrapper 내부에 서버 컴포넌트가 들어올 때 직접 import 하지 않고 children prop으로 전달받아 서버 컴포넌트의 정체성을 보호함 (잉크 방울 현상 방어)

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  return (
    <div
      className={`h-full max-w-4xl mx-auto mt-10$ ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <header className="flex justify-between">
        <h1 className="text-3xl">ELITE WATCH</h1>
        <button className="bg-blue-300 p-3" onClick={() => setIsDark(!isDark)}>
          TOGGLE THEME
        </button>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default ThemeWrapper;
