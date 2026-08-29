import Link from "next/link";

export default function SellerTopBar() {
  return (
    <section className="w-full bg-[#F8F8F8CC] font-[var(--font-roboto)]">
      <div className="mx-auto flex min-h-[76px] w-full max-w-[1440px] items-center justify-between gap-[20px] px-[20px] sm:px-[32px] lg:min-h-[96px] lg:px-[80px]">
        <h1 className="text-[24px] font-black leading-[130%] text-[#333333]/80 sm:text-[30px] lg:text-[40px] lg:leading-[150%]">
          Sell on TreeMiix
        </h1>

        <Link
          href="/register"
          className="flex h-[46px] shrink-0 items-center justify-center rounded-[12px] bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] px-[22px] text-[17px] font-medium leading-[120%] text-white sm:h-[52px] sm:px-[28px] sm:text-[20px] lg:min-h-[64px] lg:min-w-[150px] lg:rounded-[14px] lg:px-[34px] lg:text-[26.29px]"
        >
          Sign up
        </Link>
      </div>
    </section>
  );
}