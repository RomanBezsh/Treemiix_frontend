"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { formatMoney, getLastCheckoutResult } from "@/lib/checkout";

// The result is written once before navigating here; nothing to subscribe to.
const subscribeToNothing = () => () => {};
const readResult = () => {
  try {
    return sessionStorage.getItem("checkout-result") || "";
  } catch {
    return "";
  }
};

/** "Thank you" page with the created orders (one per seller). */
export default function OrderSuccess() {
  const raw = useSyncExternalStore(subscribeToNothing, readResult, () => "");
  const result = useMemo(() => (raw ? getLastCheckoutResult() : null), [raw]);

  return (
    <section className="mx-auto flex w-full max-w-[720px] flex-col items-center rounded-[20px] bg-[#F8F8F8] px-[20px] py-[36px] text-center shadow-[0_2px_5px_rgba(0,0,0,0.08)] sm:px-[36px]">
      <h1 className="text-[28px] font-medium text-[#333333] sm:text-[32px]">Thank you for your order</h1>

      {result ? (
        <>
          <p className="mt-[8px] text-[15px] text-[#555555]">
            {result.orders.length === 1
              ? "Your order has been placed. You will pay when it is delivered."
              : `Your items were placed as ${result.orders.length} orders, one per seller. You will pay when they are delivered.`}
          </p>
          <ul className="mt-[20px] flex w-full flex-col gap-[8px] text-left">
            {result.orders.map((order) => (
              <li key={order.id} className="flex flex-wrap items-center justify-between gap-[8px] rounded-[12px] bg-white px-[14px] py-[12px]">
                <span>
                  <span className="block text-[15px] font-medium text-[#333333]">
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </span>
                  <span className="block text-[13px] text-[#828282]">
                    {order.storeName} · {order.itemsCount} {order.itemsCount === 1 ? "item" : "items"}
                  </span>
                </span>
                <span className="text-[15px] text-[#333333]">{formatMoney(order.totalAmount - order.discountAmount)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-[14px] text-[16px] text-[#333333]">
            Total: <strong>{formatMoney(result.total)}</strong>
            {result.discount > 0 && <span className="text-[14px] text-[#828282]"> (saved {formatMoney(result.discount)})</span>}
          </p>
        </>
      ) : (
        <p className="mt-[8px] text-[15px] text-[#555555]">You can find your orders in your account.</p>
      )}

      <div className="mt-[24px] flex flex-wrap justify-center gap-[12px]">
        <Link
          href="/account/orders"
          className="flex h-[48px] items-center justify-center rounded-[20px] bg-[#7C9BC0] px-[28px] text-[17px] font-medium text-white transition hover:-translate-y-[1px]"
        >
          My Orders
        </Link>
        <Link
          href="/catalog"
          className="flex h-[48px] items-center justify-center rounded-[20px] border-2 border-[#EFEFEF] px-[28px] text-[17px] text-[#333333] transition hover:-translate-y-[1px]"
        >
          Continue shopping
        </Link>
      </div>
    </section>
  );
}
