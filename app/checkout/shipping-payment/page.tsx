import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import ShippingAddressForm from "@/components/checkout/ShippingAddressForm";

export default function ShippingPaymentPage() {
  return (
    <main className="w-full bg-white font-[var(--font-roboto)]">
      <div className="mx-auto w-full max-w-[1440px] px-[16px] pb-[70px] pt-[20px] sm:px-[24px] sm:pb-[80px] lg:px-[40px] lg:pb-[90px] lg:pt-[24px]">
        {/* Breadcrumbs */}
        <Breadcrumbs
  items={[
    {
      title: "Cart",
      href: "/cart",
    },
    {
      title: "Shipping&Payment",
    },
  ]}
/>

        {/* Page header */}
        <div className="mt-[18px]">
          <h1 className="text-[26px] font-normal leading-[150%] text-[#333333] sm:text-[30px]">
            Shipping&Payment
          </h1>

          <p className="mt-[2px] max-w-[1150px] text-[14px] font-normal leading-[150%] text-[#828282]/50 sm:text-[16px]">
            Please enter a shipping address for this order. Please also indicate
            whether your billing address is the same as the shipping address
            entered. When finished, click the &quot;Continue&quot; button. Or,
            if you&apos;re sending items to more than one address, click the
            &quot;Add another address&quot; button to enter additional
            addresses.
          </p>
        </div>

        {/* Checkout content */}
        <div className="mt-[22px] grid grid-cols-1 gap-[24px] lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-[32px]">
          {/* Shipping address */}
          <ShippingAddressForm />

          {/* Order summary */}
          <CheckoutSummary
            subtotal={1500}
            itemCount={1}
            href="/checkout/payment-method"
          />
        </div>
      </div>
    </main>
  );
}