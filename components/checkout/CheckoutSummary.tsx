import type { ReactNode } from "react";
import { formatMoney, type CheckoutCart } from "@/lib/checkout";

interface CheckoutSummaryProps {
  cart: CheckoutCart;
  /** Estimated promo discount (the server confirms it when the order is placed) */
  discount?: number;
  promoCode?: string;
  /** The step's main action (Continue / Place order) */
  children?: ReactNode;
}

/** Order summary next to the checkout steps: real cart items and totals. */
export default function CheckoutSummary({ cart, discount = 0, promoCode, children }: CheckoutSummaryProps) {
  const total = Math.max(cart.subtotal - discount, 0);

  return (
    <aside className="w-full rounded-[16px] bg-[#F8F8F8] px-[20px] py-[20px] shadow-[0_2px_5px_rgba(0,0,0,0.08)] sm:px-[24px]">
      <h2 className="text-[20px] font-medium text-[#333333]">Order summary</h2>

      <ul className="mt-[14px] flex flex-col gap-[10px] border-b border-[#EFEFEF] pb-[14px]">
        {cart.items.map((item) => (
          <li key={item.id} className="flex items-start justify-between gap-[12px] text-[14px]">
            <div className="min-w-0">
              <p className="line-clamp-2 text-[#333333]">
                {item.name} <span className="text-[#828282]">× {item.quantity}</span>
              </p>
              {item.storeName && <p className="text-[12px] text-[#828282]">Sold by {item.storeName}</p>}
            </div>
            <span className="shrink-0 text-[#333333]">{formatMoney(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-[14px] flex flex-col gap-[6px] text-[15px]">
        <div className="flex justify-between text-[#555555]">
          <dt>Items ({cart.itemsCount})</dt>
          <dd>{formatMoney(cart.subtotal)}</dd>
        </div>
        <div className="flex justify-between text-[#555555]">
          <dt>Shipping</dt>
          <dd>Free</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-emerald-700">
            <dt>Promo {promoCode}</dt>
            <dd>−{formatMoney(discount)}</dd>
          </div>
        )}
        <div className="mt-[6px] flex justify-between border-t border-[#EFEFEF] pt-[10px] text-[20px] font-medium text-[#333333]">
          <dt>Total</dt>
          <dd>{formatMoney(total)}</dd>
        </div>
      </dl>

      {children && <div className="mt-[18px]">{children}</div>}
    </aside>
  );
}
