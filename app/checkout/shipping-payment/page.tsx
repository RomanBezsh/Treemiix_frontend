"use client";

import CheckoutShell from "@/components/checkout/CheckoutShell";
import ShippingAddressForm from "@/components/checkout/ShippingAddressForm";

export default function ShippingPage() {
  return (
    <CheckoutShell
      step={1}
      title="Shipping"
      description="Choose where to deliver your order and who will receive it."
    >
      {(cart) => <ShippingAddressForm cart={cart} />}
    </CheckoutShell>
  );
}
