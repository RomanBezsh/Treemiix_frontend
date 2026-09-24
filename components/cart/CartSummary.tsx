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
    <div className="cart-fade-right cart-delay-1">
      <aside
        className="
          w-full rounded-[16px] bg-[#F8F8F8]
          px-[24px] py-[22px]
          shadow-[0_2px_5px_rgba(0,0,0,0.08)]
          transition-shadow duration-300 ease-out
          hover:shadow-[0_7px_18px_rgba(0,0,0,0.10)]
        "
      >
        {/* Subtotal */}
        <h2 className="text-[25px] font-normal leading-[150%] text-[#333333]">
          Subtotal ({selectedItemsCount}{" "}
          {selectedItemsCount === 1 ? "item" : "items"}): ${" "}
          {subtotal.toFixed(2)}
        </h2>

        {/* Gift */}
        <label className="mt-[12px] flex cursor-pointer items-center gap-[8px]">
          <input
            type="checkbox"
            className="
              h-[16px] w-[16px] accent-[#7C9BC0]
              transition-transform duration-200
              hover:scale-[1.12]
            "
          />

          <span className="text-[16px] font-normal leading-[150%] text-[#333333]">
            This order contains a gift
          </span>
        </label>

        {/* Checkout */}
        <Link
          href="/checkout/shipping-payment"
          aria-disabled={selectedItemsCount === 0}
          className={`
            mt-[22px] flex min-h-[48px] w-full
            items-center justify-center
            rounded-[20px] px-[45px] py-[12px]
            text-center text-[20px] font-medium leading-[120%] text-white
            transition-all duration-200 ease-out
            ${
              selectedItemsCount > 0
                ? `
                  bg-[#7C9BC0]
                  hover:-translate-y-[2px]
                  hover:bg-[#6F90B7]
                  hover:shadow-[0_7px_16px_rgba(124,155,192,0.28)]
                  active:translate-y-0
                  active:scale-[0.98]
                `
                : "pointer-events-none bg-[#B7C4D3]"
            }
          `}
        >
          Proceed to checkout
        </Link>
      </aside>
    </div>
  );
}