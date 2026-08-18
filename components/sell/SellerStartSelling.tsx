import Link from "next/link";

export default function SellerStartSelling() {
  return (
    <section className="w-full bg-white font-[var(--font-roboto)]">
      <div className="mx-auto w-full max-w-[1440px] px-[40px] pb-[100px] pt-[40px] lg:px-[80px]">
        {/* Gradient border */}
        <div className="rounded-[30px] bg-[linear-gradient(90deg,#7E8CBD_58%,#CE9AD7_100%)] p-[10px]">
          {/* CTA content */}
          <div className="rounded-[20px] bg-white px-[60px] py-[48px]">
            <h2 className="text-[60px] font-black leading-[150%] text-[#333333]">
              Start selling today
            </h2>

            <p className="mt-[14px] max-w-[650px] text-[24px] font-black leading-[150%] text-[#333333]/80">
              Put your products in front of the millions of customers who
              search TreeMiix.com every day.
            </p>

            {/* Sign up button */}
            <Link
              href="/register"
              className="mt-[28px] flex min-h-[64px] w-fit min-w-[150px] items-center justify-center rounded-[14px] bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] px-[34px] py-[16px] text-center text-[26.29px] font-medium leading-[120%] text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}