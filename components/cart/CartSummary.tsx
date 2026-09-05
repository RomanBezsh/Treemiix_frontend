import Link from "next/link";

import type { CartProduct } from "./CartItemsList";

type CartSummaryProps = {
  items: CartProduct[];
};

export default function CartSummary({ items }: CartSummaryProps) {
  const selectedItems = items.filter((item) => item.selected);

  const selectedItemsCount = selectedItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <aside className="w-full rounded-[16px] bg-[#F8F8F8] px-[24px] py-[22px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
      {/* Subtotal */}
      <h2 className="text-[25px] font-normal leading-[150%] text-[#333333]">
        Subtotal ({selectedItemsCount}{" "}
        {selectedItemsCount === 1 ? "item" : "items"}): $
        {subtotal.toFixed(2)}
      </h2>

      {/* Gift */}
      <label className="mt-[12px] flex items-center gap-[8px]">
        <input
          type="checkbox"
          className="h-[16px] w-[16px] accent-[#7C9BC0]"
        />

        <span className="text-[16px] font-normal leading-[150%] text-[#333333]">
          This order contains a gift
        </span>
      </label>

      {/* Checkout */}
      <Link
        href="/checkout/shipping-payment"
        aria-disabled={selectedItemsCount === 0}
        className={`mt-[22px] flex min-h-[48px] w-full items-center justify-center rounded-[20px] px-[45px] py-[12px] text-center text-[20px] font-medium leading-[120%] text-white ${
          selectedItemsCount > 0
            ? "bg-[#7C9BC0]"
            : "pointer-events-none bg-[#B7C4D3]"
        }`}
      >
        Proceed to checkout
      </Link>
    </aside>
  );
}