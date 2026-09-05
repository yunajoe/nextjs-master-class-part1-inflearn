"use client";

import { useState } from "react";

function AddToCart() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex gap-4 items-center">
      <button
        className="p-2 bg-blue-800 text-white"
        onClick={() => setCount((prev) => prev + 1)}
      >
        AddToCart
      </button>
      <span>{count}개</span>
    </div>
  );
}

export default AddToCart;
