"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import {
  getDraft,
  PAYMENT_LABELS,
  previewPromoCode,
  saveDraft,
  SignInRequiredError,
  type CheckoutCart,
  type PaymentChoice,
  type PromoPreview,
} from "@/lib/checkout";

const PAYMENT_NOTES: Record<PaymentChoice, string> = {
  cash: "Pay the courier in cash when the order arrives.",
  card: "Pay by card to the courier when the order arrives.",
};

/** Step 2: payment method (on delivery, shown in the UI only) and a promo code. */
export default function PaymentMethodForm({ cart }: { cart: CheckoutCart }) {
  const router = useRouter();
  const [draft] = useState(getDraft);
  const [payment, setPayment] = useState<PaymentChoice>(draft.payment || "cash");
  const [codeInput, setCodeInput] = useState(draft.promoCode || "");
  const [promo, setPromo] = useState<PromoPreview | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  // Step 1 must be completed first
  useEffect(() => {
    if (!draft.shippingAddress) router.replace("/checkout/shipping-payment");
  }, [draft.shippingAddress, router]);

  const applyCode = async (code: string) => {
    setChecking(true);
    setPromoError(null);
    try {
      setPromo(await previewPromoCode(code, cart.subtotal));
    } catch (error) {
      if (error instanceof SignInRequiredError) {
        router.push("/auth");
        return;
      }
      setPromo(null);
      setPromoError(error instanceof Error ? error.message : "Couldn't check the promo code.");
    } finally {
      setChecking(false);
    }
  };

  // Re-check a code saved earlier in this checkout
  useEffect(() => {
    if (!draft.promoCode) return;
    let cancelled = false;
    previewPromoCode(draft.promoCode, cart.subtotal)
      .then((preview) => !cancelled && setPromo(preview))
      .catch((error) => !cancelled && setPromoError(error instanceof Error ? error.message : null));
    return () => {
      cancelled = true;
    };
  }, [draft.promoCode, cart.subtotal]);

  const handleContinue = (event: FormEvent) => {
    event.preventDefault();
    // Only a checked code goes to the order; an invalid one would make the order fail
    saveDraft({ payment, promoCode: promo?.code || undefined });
    router.push("/checkout/order-confirmation");
  };

  return (
    <form
      onSubmit={handleContinue}
      className="grid grid-cols-1 gap-[24px] lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-[32px]"
    >
      <div className="flex flex-col gap-[20px]">
        <section className="rounded-[16px] bg-[#F8F8F8] p-[18px] shadow-[0_2px_5px_rgba(0,0,0,0.06)] sm:p-[22px]">
          <h2 className="text-[20px] font-medium text-[#333333]">Payment method</h2>
          <p className="mt-[4px] text-[14px] text-[#555555]">You pay when the order is delivered. No card details are needed now.</p>
          <fieldset className="mt-[12px] flex flex-col gap-[8px]">
            <legend className="sr-only">Payment method</legend>
            {(Object.keys(PAYMENT_LABELS) as PaymentChoice[]).map((choice) => (
              <label
                key={choice}
                className={`flex cursor-pointer items-start gap-[10px] rounded-[12px] border-2 bg-white px-[14px] py-[12px] ${
                  payment === choice ? "border-[#7C9BC0]" : "border-transparent"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payment === choice}
                  onChange={() => setPayment(choice)}
                  className="mt-[4px] h-[16px] w-[16px] accent-[#7C9BC0]"
                />
                <span>
                  <span className="block text-[15px] font-medium text-[#333333]">{PAYMENT_LABELS[choice]}</span>
                  <span className="block text-[13px] text-[#828282]">{PAYMENT_NOTES[choice]}</span>
                </span>
              </label>
            ))}
          </fieldset>
        </section>

        <section className="rounded-[16px] bg-[#F8F8F8] p-[18px] shadow-[0_2px_5px_rgba(0,0,0,0.06)] sm:p-[22px]">
          <h2 className="text-[20px] font-medium text-[#333333]">Promo code</h2>
          {promo ? (
            <div className="mt-[12px] flex flex-wrap items-center justify-between gap-[10px] rounded-[12px] border border-emerald-200 bg-emerald-50 px-[14px] py-[10px] text-[15px] text-emerald-800">
              <span>
                <strong>{promo.code}</strong> applied — about −${promo.discount.toFixed(2)}
              </span>
              <button
                type="button"
                onClick={() => {
                  setPromo(null);
                  setCodeInput("");
                  saveDraft({ promoCode: undefined });
                }}
                className="text-[14px] font-medium underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="mt-[12px] flex gap-[8px]">
              <label htmlFor="promo-code" className="sr-only">Promo code</label>
              <input
                id="promo-code"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="Enter a code"
                maxLength={50}
                className="h-[44px] min-w-0 flex-1 rounded-[10px] border border-[#D9D9D9] bg-white px-[12px] text-[15px] uppercase text-[#333333] outline-none focus:border-[#7C9BC0]"
              />
              <button
                type="button"
                disabled={!codeInput.trim() || checking}
                onClick={() => applyCode(codeInput)}
                className="h-[44px] shrink-0 rounded-[10px] bg-[#49516D] px-[18px] text-[15px] font-medium text-white disabled:opacity-50"
              >
                {checking ? "Checking..." : "Apply"}
              </button>
            </div>
          )}
          {promoError && (
            <p role="alert" className="mt-[8px] text-[14px] text-red-700">{promoError}</p>
          )}
          <p className="mt-[8px] text-[12px] text-[#828282]">The final discount is confirmed when you place the order.</p>
        </section>
      </div>

      <CheckoutSummary cart={cart} discount={promo?.discount} promoCode={promo?.code}>
        <button
          type="submit"
          className="flex min-h-[48px] w-full items-center justify-center rounded-[20px] bg-[#7C9BC0] px-[24px] text-[18px] font-medium text-white shadow-[0_2px_4px_rgba(0,0,0,0.15)] transition hover:-translate-y-[1px] hover:bg-[#6D8FB7] active:translate-y-0"
        >
          Review order
        </button>
      </CheckoutSummary>
    </form>
  );
}
