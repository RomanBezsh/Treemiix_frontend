import Image from "next/image";
import Link from "next/link";

export default function AccountGiftCard() {
  return (
    <section className="w-full">
      {/* Title */}
      <h1 className="mb-[18px] text-[28px] font-medium leading-[130%] text-[#333333]">
        Gift Card
      </h1>

      {/* Gift card panel */}
      <div className="relative min-h-[620px] rounded-[20px] bg-[#F8F8F8] px-[44px] pb-[36px] pt-[42px] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
        {/* Balance */}
        <div className="flex items-baseline gap-[12px]">
          <p className="text-[16px] font-medium leading-[130%] text-[#333333]">
            Your Gift Card Balance:
          </p>

          <p className="text-[30px] font-normal leading-[130%] text-[#555555]">
            $250
          </p>
        </div>

        {/* Balance actions */}
        <div className="mt-[18px] flex flex-wrap items-center gap-[16px]">
          <Link
            href="/gift-cards/reload"
            className="flex h-[44px] min-w-[180px] items-center justify-center rounded-[22px] bg-[#7C9BC0] px-[26px] text-[14px] font-medium text-white"
          >
            Reload Your Balance
          </Link>

          <Link
            href="/gift-cards/redeem"
            className="flex h-[44px] min-w-[180px] items-center justify-center rounded-[22px] border border-[#D6D6D6] bg-[#EEEEEE] px-[26px] text-[14px] font-medium text-[#777777]"
          >
            Redeem a Gift Card
          </Link>
        </div>

        {/* Auto reload */}
        <div className="mt-[34px]">
          <h2 className="text-[16px] font-medium leading-[130%] text-[#333333]">
            Your Gift Card Balance:
          </h2>

          <p className="mt-[14px] text-[14px] font-normal leading-[150%] text-[#555555]">
            Auto-Reload on a schedule or when your balance gets low.
          </p>

          <Link
            href="/gift-cards/reload"
            className="mt-[4px] inline-block text-[14px] font-normal leading-[150%] text-[#7C9BC0]"
          >
            Set up Auto-Reload
          </Link>
        </div>

      

        {/* Save */}
        <button
          type="button"
          className="absolute bottom-[36px] right-[44px] flex h-[44px] min-w-[120px] items-center justify-center rounded-[22px] bg-[#7C9BC0] px-[28px] text-[14px] font-medium text-white"
        >
          Save
        </button>
      </div>
    </section>
  );
}