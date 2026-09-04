"use client";

import { useState } from "react";

function GoalCounter() {
  const [count, setCount] = useState(0);
  return (
    <button
      onClick={() => {
        if (count >= 20) return;
        setCount((prev) => prev + 5);
      }}
      className="text-2xl border border-purple-300 p-4 bg-purple-300 w-40"
    >
      +5 문제 추가
      {count}개
    </button>
  );
}

export default GoalCounter;
