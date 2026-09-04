"use client";
import { useState } from "react";

function BookmarkButton({ itemId }: { itemId: number }) {
  const [isSaved, setIsSaved] = useState(false);
  return (
    <button
      onClick={() => setIsSaved(!isSaved)}
      className="border border-gray-400 w-2/3 p-2"
    >
      {isSaved ? "저장됨" : "북마크"}
    </button>
  );
}

export default BookmarkButton;
