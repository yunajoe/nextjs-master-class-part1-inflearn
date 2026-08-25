function page() {
  return (
    <div className="p-10 bg-orange-500 text-white min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-black italic tracking-tighter mb-4 animate-bounce">
        NEW ARRIVAL!
      </h1>
      <p className="text-2xl font-bold opacity-80">
        여기는 [slug] 폴더가 아닌 구체적인 이름의 폴더가 매칭되었습니다.
      </p>
      <p className="mt-8 bg-white/20 p-4 rounded-xl font-mono text-sm">
        Priority Rule: Static Path {">"} Dynamic Path
      </p>
    </div>
  );
}

export default page;
