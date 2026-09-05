// 개별 기기 상세 (Server Component).

import DevicePowerToggle from "@/src/app/_components/Toggle";
import { MOCK_DEVICES } from "@/src/app/_utils/db";

interface PageProps {
  params: Promise<{ id: string }>;
}
async function page({ params }: PageProps) {
  const { id } = await params;
  const targetData = MOCK_DEVICES.find((item) => item.id === id);
  if (!targetData) return <h1>제품이 없습니다.</h1>;

  return (
    <div>
      <h1 className="text-2xl text-center">{targetData?.name}</h1>
      <DevicePowerToggle name={targetData.name} />
    </div>
  );
}

export default page;
