/**
 * [보안 설계] Next.js 라우팅에서 제외된 서버 전용 데이터베이스 로직
 */
export type Device = {
  id: string;
  name: string;
  category: "light" | "security" | "climate";
  status: "on" | "off";
};

export const MOCK_DEVICES: Device[] = [
  { id: "L-101", name: "거실 메인 조명", category: "light", status: "on" },
  { id: "S-99", name: "현관 AI 도어락", category: "security", status: "on" },
  {
    id: "C-42",
    name: "안방 스마트 에어컨",
    category: "climate",
    status: "off",
  },
  { id: "L-202", name: "주방 무드등", category: "light", status: "off" },
];
