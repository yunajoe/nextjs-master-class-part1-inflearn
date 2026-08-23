export default function SettingsPage() {
  return (
    <div className="text-center">
      <h1 className="text-whit text-lg">⚙️ 환경 설정</h1>
      <h3 className="text-white text-md">여기는 설정 페이지입니다.</h3>
      <div className="flex items-center justify-center gap-10">
        <div>
          <label>이메일 알림 받기</label>
          <input type="checkbox" />
        </div>
        <div>
          <label>다크모드 사용</label>
          <input type="checkbox" />
        </div>
      </div>
    </div>
  );
}
