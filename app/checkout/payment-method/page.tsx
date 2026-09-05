import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import PaymentMethodForm from "@/components/checkout/PaymentMethodForm";

export default function PaymentMethodPage() {
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
      href: "/checkout/shipping-payment",
    },
    {
      title: "Select a payment method",
    },
  ]}
/>

        {/* Page title */}
        <h1 className="mt-[18px] text-[26px] font-normal leading-[150%] text-[#333333] sm:text-[30px]">
          Select a payment method
        </h1>

        {/* Payment hint */}
        <div className="mt-[6px] w-fit max-w-full rounded-[9px] bg-[linear-gradient(90deg,#7E8CBD_0%,#CE9AD7_100%)] p-[2px]">
          <div className="rounded-[7px] bg-white px-[14px] py-[7px] sm:px-[18px]">
            <p className="text-[14px] font-normal leading-[150%] text-[#828282]/50 sm:text-[16px]">
              Enter how you&apos;d like to pay below, and we&apos;ll save it as
              an option.
            </p>
          </div>
        </div>

        {/* Payment content */}
        <div className="mt-[22px] grid grid-cols-1 gap-[24px] lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-[32px]">
          {/* Payment options */}
          <PaymentMethodForm />

          {/* Order summary */}
          <CheckoutSummary
            subtotal={1500}
            itemCount={1}
            href="/checkout/order-confirmation"
          />
        </div>
      </div>
    </main>
  );
}