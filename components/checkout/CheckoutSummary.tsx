import Link from "next/link";

type CheckoutSummaryProps = {
  subtotal?: number;
  itemCount?: number;
  href: string;
  buttonText?: string;
};

export default function CheckoutSummary({
  subtotal = 1500,
  itemCount = 1,
  href,
  buttonText = "Proceed to checkout",
}: CheckoutSummaryProps) {
  return (
    <aside className="w-full rounded-[16px] bg-[#F8F8F8] px-[24px] py-[20px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
      <h2 className="text-[25px] font-normal leading-[150%] text-[#333333]">
        Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}): $
        {subtotal}
      </h2>

      <label className="mt-[8px] flex items-center gap-[8px]">
        <input
          type="checkbox"
          className="h-[15px] w-[15px] accent-[#7C9BC0]"
        />

        <span className="text-[16px] font-normal leading-[150%] text-[#333333]">
          This order contains a gift
        </span>
      </label>

      <Link
        href={href}
        className="mt-[20px] flex min-h-[48px] w-full items-center justify-center rounded-[20px] bg-[#7C9BC0] px-[24px] text-center text-[20px] font-medium leading-[120%] text-white"
      >
        {buttonText}
      </Link>
    </aside>
  );
}