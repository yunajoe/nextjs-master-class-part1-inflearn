import AddToCart from "./_components/AddToCart";
import ThemeWrapper from "./_components/ThemeWrapper";
import { WATCH_COLLECTION } from "./_utils/db";

/**
 *
 * @returns  상품 리스트 페이지(page.tsx)는 서버 컴포넌트로 유지하여 브라우저로 전송되는 자바스크립트 용량을 최소화함.
 */
function page() {
  return (
    <ThemeWrapper>
      <div className="grid grid-cols-3">
        {WATCH_COLLECTION.map((item) => (
          <div
            key={item.id}
            className="border-2 border-gray-600 p-4 h-40 flex flex-col"
          >
            <p>{item.spec}</p>
            <p>{item.name}</p>
            <p>{item.price}</p>

            {/* ADD TO CART CLIENT  */}
            <AddToCart />
          </div>
        ))}
      </div>
    </ThemeWrapper>
  );
}

export default page;
