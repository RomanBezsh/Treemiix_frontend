import Link from "next/link";

export default function SellerTopBar() {
  return (
    <section className="w-full bg-[#F8F8F8CC] font-[var(--font-roboto)]">
      <div className="mx-auto flex min-h-[96px] w-full max-w-[1440px] items-center justify-between px-[40px] lg:px-[80px]">
        <h1 className="text-[40px] font-black leading-[150%] text-[#333333]/80">
          Sell on TreeMiix
        </h1>

        <Link
          href="/register"
          className="flex min-h-[64px] min-w-[150px] items-center justify-center rounded-[14px] bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] px-[34px] py-[16px] text-center text-[26.29px] font-medium leading-[120%] text-white"
        >
          Sign up
        </Link>
      </div>
    </section>
  );
}