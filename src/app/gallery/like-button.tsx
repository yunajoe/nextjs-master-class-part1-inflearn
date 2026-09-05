// 나뭇잎 컴포넌트: 좋아요 버튼 (LikeButton.tsx)
// 역할: 가장 말단(Leaf)에서 상태 관리를 담당합니다. 클릭 시 하트의 상태가 반전됩니다.

"use client";

import { useState } from "react";

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <button
      className={`${isLiked ? "bg-red-50 text-red-500 shadow-inner" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
      onClick={() => setIsLiked(!isLiked)}
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

export default LikeButton;
