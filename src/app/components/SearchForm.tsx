"use client";
export default function SearchForm({
  initialQuery,
  url,
  sort,
}: {
  initialQuery?: string;
  url?: string;
  sort?: string;
}) {
  return (
    /**
     * <form>은 submission 시 <input> 태그의 name 속성을 Query Key로 사용한다.
     * 즉, 검색어(input)에 리액트를 치고 검색 버튼을 누르면은  posts?q=리액트 로 된다는 말.
     */

    <form
      action={url}
      method="GET"
      className="w-full flex items-center gap-2"
      onSubmit={(e) => {
        const form = e.currentTarget; // form 태그 영역
        const input = form.elements.namedItem("q") as HTMLInputElement;
        if (input && !input.value.trim()) {
          input.name = "";
        }
      }}
    >
      {sort && <input type="hidden" name="sort" value={sort} />}
      <input
        name="q"
        type="text"
        placeholder="🔍 검색어 입력..."
        className="border-2 border-blue-400 rounded-sm w-full"
        defaultValue={initialQuery}
      />
      <button
        type="submit"
        className="w-28 border-2 border-gray-800 bg-black text-white"
      >
        검색
      </button>
    </form>
  );
}
