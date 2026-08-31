function SkillSearchTwo({
  initialQuery,
  actionPath,
}: {
  initialQuery?: string;
  actionPath?: string;
}) {
  return (
    <form
      action={actionPath}
      className="flex items-center space-x-2 w-full max-w-lg"
    >
      <div>
        <input
          name="q"
          type="text"
          placeholder="찾으시는 기술명을 입력하세요..."
          defaultValue={initialQuery}
          className="w-full border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none text-black"
        />
      </div>
      <button
        type="submit"
        className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition"
      >
        검색
      </button>
    </form>
  );
}

export default SkillSearchTwo;
