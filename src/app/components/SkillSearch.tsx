export default function SkillSearch({
  actionPath,
  initialQuery,
  level,
}: {
  initialQuery?: string;
  actionPath: string;
  level: string;
}) {
  return (
    <form action={actionPath} method="GET" className="flex-6">
      {level && <input name="level" value={level} type="hidden" />}
      <input
        name="query"
        type="text"
        placeholder="기술명 검색..."
        className="border p-3 rounded-xl text-black w-full max-w-2/3"
        defaultValue={initialQuery}
      />
      <button
        type="submit"
        className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold ml-3"
      >
        검색
      </button>
    </form>
  );
}
