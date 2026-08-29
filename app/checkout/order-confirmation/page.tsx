import Link from "next/link";

import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";

export default function OrderConfirmationPage() {
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
      href: "/checkout/payment-method",
    },
    {
      title: "Order Confirmation",
    },
  ]}
/>

        {/* Page title */}
<h1 className="mt-[18px] text-[26px] font-normal leading-[150%] text-[#333333] sm:text-[30px]">
  Order Confirmation
</h1>

{/* Description */}
<p className="mt-[2px] text-[14px] font-normal leading-[150%] text-[#333333] sm:text-[16px]">
  Thank you for your purchase! Our employee will contact you soon.
</p>

        {/* Content */}
        <div className="mt-[22px] grid grid-cols-1 gap-[24px] lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-[32px]">
          {/* Order details */}
          <OrderConfirmation />

          {/* Order summary */}
          <aside className="w-full rounded-[16px] bg-[#F8F8F8] px-[22px] py-[20px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
            <h2 className="text-[22px] font-normal leading-[150%] text-[#333333]">
              Subtotal (1 items):
            </h2>

            <p className="text-[22px] font-normal leading-[150%] text-[#333333]">
              $1500
            </p>

            {/* Actions */}
            <div className="mt-[20px] flex flex-col gap-[10px] sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/account/orders"
                className="flex min-h-[44px] flex-1 items-center justify-center rounded-[20px] bg-[#7C9BC0] px-[20px] text-center text-[14px] font-medium leading-[120%] text-white"
              >
                My Orders
              </Link>

              <Link
                href="/checkout/success"
                className="flex min-h-[44px] flex-1 items-center justify-center rounded-[20px] border border-[#D8D8D8] bg-[#EEEEEE] px-[20px] text-center text-[14px] font-medium leading-[120%] text-[#666666]"
              >
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}