"use client"; // 나뭇잎 컴포넌트: 인터랙션이 필요한 최소 단위만 클라이언트로 선언

import { useState } from "react";

export default function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <button
      onClick={() => setIsLiked(!isLiked)}
      className={`p-3 rounded-full transition-all duration-300 active:scale-125 ${
        isLiked
          ? "bg-red-50 text-red-500 shadow-inner"
          : "bg-gray-100 text-gray-400 hover:bg-gray-200"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isLiked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
}
