"use client";
import { ChangeEvent, useState } from "react";

function AnnounceBar() {
  const [search, setSearch] = useState("");
  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSearch(e.target.value);
  };
  return (
    <header className="w-full">
      <span>📢 NEXUS GLOBAL ANNOUNCEMENT</span>
      <input
        type="text"
        placeholder="전역 상태 테스트"
        value={search}
        className="w-full bg-emerald-700 rounded border border-emerald-500 text-sm outline-none"
        onChange={handleSearchChange}
      />
    </header>
  );
}

export default AnnounceBar;
