// 나뭇잎 컴포넌트: 좋아요 버튼 (LikeButton.tsx)
// 역할: 가장 말단(Leaf)에서 상태 관리를 담당합니다. 클릭 시 하트의 상태가 반전됩니다.

"use client";

import { useState } from "react";

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <button
      onClick={() => setIsLiked(!isLiked)}
      className={`w-12 h-12 rounded-full flx items-center justify-center ${isLiked ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700"}`}
    >
      {isLiked ? "❤️" : "🤍"}
    </button>
  );
}

export default LikeButton;
