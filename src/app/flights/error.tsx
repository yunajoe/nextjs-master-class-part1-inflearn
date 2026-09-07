"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

function error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <div>
      <div className="text-8xl mb-8">🛠️</div>
      <h2 className="text-4xl font-black text-red-900 tracking-tighter uppercase italic mb-4">
        System Disruption
      </h2>
      <p className="text-red-700 font-bold max-w-md mx-auto leading-relaxed mb-10">
        서버와 연결이 원활하지 않습니다. <br />
        페이지 전체를 새로고침하지 않고 아래 버튼으로 재접속을 시도하세요.
      </p>
      <button
        className="px-14 py-6 bg-red-600 text-white rounded-full font-black text-xl shadow-2xl shadow-red-200 hover:bg-red-700 active:scale-95 transition-all"
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        데이터 다시 불러오기
      </button>

      {error.digest && (
        <p className="mt-10 text-[10px] text-red-300 font-mono tracking-[0.3em] uppercase opacity-50">
          Trace-ID: {error.digest}
        </p>
      )}
    </div>
  );
}

export default error;
