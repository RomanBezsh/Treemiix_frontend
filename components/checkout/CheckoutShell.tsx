"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import LoadError from "@/components/common/LoadError";
import { loadCheckoutCart, SignInRequiredError, type CheckoutCart } from "@/lib/checkout";

const STEPS = [
  { title: "Shipping", href: "/checkout/shipping-payment" },
  { title: "Payment", href: "/checkout/payment-method" },
  { title: "Review", href: "/checkout/order-confirmation" },
];

interface CheckoutShellProps {
  step: 1 | 2 | 3;
  title: string;
  description: string;
  /** Rendered once the cart is loaded and not empty */
  children: (cart: CheckoutCart) => ReactNode;
}

/** Layout of a checkout step: breadcrumbs, title and the cart guard (sign-in, loading, error, empty cart). */
export default function CheckoutShell({ step, title, description, children }: CheckoutShellProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error" | "signin">("loading");
  const [cart, setCart] = useState<CheckoutCart | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const loaded = await loadCheckoutCart();
        if (cancelled) return;
        setCart(loaded);
        setStatus("ready");
      } catch (error) {
        if (cancelled) return;
        if (error instanceof SignInRequiredError) {
          setStatus("signin");
        } else {
          console.warn("Failed to load the cart", error);
          setStatus("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const crumbs = [
    { title: "Cart", href: "/cart" },
    ...STEPS.slice(0, step).map((s, index) => (index + 1 === step ? { title: s.title } : s)),
  ];

  return (
    <main className="w-full bg-white font-[var(--font-roboto)]">
      <div className="mx-auto w-full max-w-[1440px] px-[16px] pb-[70px] pt-[20px] sm:px-[24px] sm:pb-[80px] lg:px-[40px] lg:pb-[90px] lg:pt-[24px]">
        <Breadcrumbs items={crumbs} />

        <div className="mt-[18px]">
          <p className="text-[13px] font-medium uppercase tracking-wide text-[#828282]">Step {step} of 3</p>
          <h1 className="text-[26px] font-normal leading-[150%] text-[#333333] sm:text-[30px]">{title}</h1>
          <p className="mt-[2px] max-w-[760px] text-[14px] leading-[150%] text-[#555555] sm:text-[16px]">{description}</p>
        </div>

        <div className="mt-[22px]">
          {status === "loading" && (
            <div className="flex min-h-[200px] items-center justify-center rounded-[16px] bg-[#F8F8F8] text-[16px] text-[#555555]">
              Loading your cart...
            </div>
          )}

          {status === "error" && (
            <LoadError
              what="your cart"
              onRetry={() => {
                setStatus("loading");
                setReloadKey((key) => key + 1);
              }}
            />
          )}

          {status === "signin" && (
            <Notice title="Sign in to check out" text="Your cart and addresses are linked to your account.">
              <Link href="/auth" className={PRIMARY_LINK}>Sign in</Link>
            </Notice>
          )}

          {status === "ready" && cart && cart.items.length === 0 && (
            <Notice title="Your cart is empty" text="Add products to your cart before checking out.">
              <Link href="/catalog" className={PRIMARY_LINK}>Browse products</Link>
            </Notice>
          )}

          {status === "ready" && cart && cart.items.length > 0 && children(cart)}
        </div>
      </div>
    </main>
  );
}

const PRIMARY_LINK =
  "mt-[20px] flex h-[44px] items-center justify-center rounded-[12px] bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] px-[26px] text-[16px] font-medium text-white transition hover:-translate-y-0.5";

function Notice({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-[16px] bg-[#F8F8F8] px-[20px] py-[40px] text-center">
      <p className="text-[20px] font-medium text-[#333333]">{title}</p>
      <p className="mt-[8px] text-[14px] text-[#555555]">{text}</p>
      {children}
    </div>
  );
}
