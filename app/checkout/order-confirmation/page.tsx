"use client";

import CheckoutShell from "@/components/checkout/CheckoutShell";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";

export default function OrderConfirmationPage() {
  return (
    <CheckoutShell
      step={3}
      title="Review your order"
      description="Check the address, payment and items, then place the order."
    >
      {(cart) => <OrderConfirmation cart={cart} />}
    </CheckoutShell>
  );
}
