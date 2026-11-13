"use client";

import CheckoutShell from "@/components/checkout/CheckoutShell";
import PaymentMethodForm from "@/components/checkout/PaymentMethodForm";

export default function PaymentMethodPage() {
  return (
    <CheckoutShell
      step={2}
      title="Payment"
      description="Choose how you will pay on delivery and add a promo code if you have one."
    >
      {(cart) => <PaymentMethodForm cart={cart} />}
    </CheckoutShell>
  );
}
