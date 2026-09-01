interface FileSearchProps {
  actionUrl?: string;
  searchValue?: string;
}

function FileSearch({ actionUrl, searchValue }: FileSearchProps) {
  return (
    <form action={actionUrl} className="flex-6 flex gap-4">
      <input
        type="text"
        name="search"
        defaultValue={searchValue}
        className="max-w-100 w-full border-2 border-gray-400 p-2 rounded-sm"
      />
      <button
        type="submit"
        className="w-30 border-2 border-gray-400 p-2 rounded-sm bg-blue-500"
      >
        검색
      </button>
    </form>
  );
}
export default FileSearch;
