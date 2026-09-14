"use client";
function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      {error.digest && (
        <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded font-mono inline-block">
          Error ID: {error.digest}
        </p>
      )}
      <button onClick={() => reset()}>다시 시도하기</button>
    </div>
  );
}

export default GlobalError;
