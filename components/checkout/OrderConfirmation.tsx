"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import {
  formatMoney,
  getDraft,
  PAYMENT_LABELS,
  placeOrder,
  previewPromoCode,
  SignInRequiredError,
  type CheckoutCart,
  type PromoPreview,
} from "@/lib/checkout";

/** Step 3: review everything and place the order (POST /orders/checkout). */
export default function OrderConfirmation({ cart }: { cart: CheckoutCart }) {
  const router = useRouter();
  const [draft] = useState(getDraft);
  const [promo, setPromo] = useState<PromoPreview | null>(null);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Steps 1 and 2 must be completed first
  useEffect(() => {
    if (!draft.shippingAddress) router.replace("/checkout/shipping-payment");
    else if (!draft.payment) router.replace("/checkout/payment-method");
  }, [draft.shippingAddress, draft.payment, router]);

  useEffect(() => {
    if (!draft.promoCode) return;
    let cancelled = false;
    previewPromoCode(draft.promoCode, cart.subtotal)
      .then((preview) => !cancelled && setPromo(preview))
      .catch((previewError) => !cancelled && setError(previewError instanceof Error ? previewError.message : null));
    return () => {
      cancelled = true;
    };
  }, [draft.promoCode, cart.subtotal]);

  // Items grouped by store: the server creates one order per seller
  const stores = new Map<string, typeof cart.items>();
  for (const item of cart.items) {
    const key = item.storeName || "Treemiix seller";
    stores.set(key, [...(stores.get(key) || []), item]);
  }

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setError(null);
    try {
      await placeOrder(draft);
      router.replace("/checkout/success");
    } catch (placeError) {
      setPlacing(false);
      if (placeError instanceof SignInRequiredError) {
        router.push("/auth");
        return;
      }
      setError(placeError instanceof Error ? placeError.message : "Couldn't place your order. Please try again.");
    }
  };

  if (!draft.shippingAddress || !draft.payment) return null;

  return (
    <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-[32px]">
      <div className="flex flex-col gap-[20px]">
        <section className="rounded-[16px] bg-[#F8F8F8] p-[18px] shadow-[0_2px_5px_rgba(0,0,0,0.06)] sm:p-[22px]">
          <div className="flex items-start justify-between gap-[12px]">
            <h2 className="text-[20px] font-medium text-[#333333]">Shipping to</h2>
            <Link href="/checkout/shipping-payment" className="text-[14px] text-[#496B94] hover:underline">Change</Link>
          </div>
          <p className="mt-[8px] text-[15px] text-[#333333]">{draft.shippingAddress}</p>
          <p className="mt-[4px] text-[14px] text-[#555555]">
            {draft.receiverName} · {draft.receiverPhone}
          </p>
        </section>

        <section className="rounded-[16px] bg-[#F8F8F8] p-[18px] shadow-[0_2px_5px_rgba(0,0,0,0.06)] sm:p-[22px]">
          <div className="flex items-start justify-between gap-[12px]">
            <h2 className="text-[20px] font-medium text-[#333333]">Payment</h2>
            <Link href="/checkout/payment-method" className="text-[14px] text-[#496B94] hover:underline">Change</Link>
          </div>
          <p className="mt-[8px] text-[15px] text-[#333333]">{PAYMENT_LABELS[draft.payment]}</p>
          {draft.promoCode && <p className="mt-[4px] text-[14px] text-[#555555]">Promo code {draft.promoCode}</p>}
        </section>

        <section className="rounded-[16px] bg-[#F8F8F8] p-[18px] shadow-[0_2px_5px_rgba(0,0,0,0.06)] sm:p-[22px]">
          <h2 className="text-[20px] font-medium text-[#333333]">Items</h2>
          {stores.size > 1 && (
            <p className="mt-[4px] text-[14px] text-[#555555]">
              Your items come from {stores.size} sellers, so they will be placed as {stores.size} separate orders.
            </p>
          )}
          <div className="mt-[12px] flex flex-col gap-[16px]">
            {[...stores.entries()].map(([storeName, items]) => (
              <div key={storeName}>
                <p className="text-[13px] font-medium uppercase tracking-wide text-[#828282]">Sold by {storeName}</p>
                <ul className="mt-[6px] flex flex-col gap-[8px]">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-[12px] rounded-[12px] bg-white p-[10px]">
                      {item.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element -- media paths are proxied by Next rewrites
                        <img src={item.imageUrl} alt="" className="h-[56px] w-[56px] shrink-0 rounded-[8px] object-contain" />
                      )}
                      <span className="min-w-0 flex-1 text-[15px] text-[#333333]">
                        <span className="line-clamp-2">{item.name}</span>
                        <span className="text-[13px] text-[#828282]">
                          {item.quantity} × {formatMoney(item.price)}
                        </span>
                      </span>
                      <span className="shrink-0 text-[15px] text-[#333333]">{formatMoney(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {error && (
          <p role="alert" className="rounded-[10px] border border-red-200 bg-red-50 px-[14px] py-[10px] text-[14px] text-red-700">
            {error}
          </p>
        )}
      </div>

      <CheckoutSummary cart={cart} discount={promo?.discount} promoCode={promo?.code}>
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={placing}
          className="flex min-h-[48px] w-full items-center justify-center rounded-[20px] bg-[linear-gradient(144.29deg,#FFDB5A_-0.18%,#FF825A_101.85%)] px-[24px] text-[18px] font-medium text-white shadow-[0_2px_4px_rgba(0,0,0,0.15)] transition hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-60"
        >
          {placing ? "Placing order..." : "Place order"}
        </button>
        <p className="mt-[10px] text-center text-[12px] text-[#828282]">You pay when the order is delivered.</p>
      </CheckoutSummary>
    </div>
  );
}
