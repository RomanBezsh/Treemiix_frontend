import Link from "next/link";

export default function SellerStartSelling() {
  return (
    <section className="w-full bg-white font-[var(--font-roboto)]">
      <div className="mx-auto w-full max-w-[1440px] px-[12px] pb-[56px] pt-[16px] sm:px-[24px] sm:pb-[70px] lg:px-[80px] lg:pb-[100px] lg:pt-[40px]">
        {/* Gradient border */}
        <div className="rounded-[20px] bg-[linear-gradient(90deg,#7E8CBD_58%,#CE9AD7_100%)] p-[4px] sm:rounded-[24px] sm:p-[6px] lg:rounded-[30px] lg:p-[10px]">
          {/* CTA content */}
          <div className="rounded-[16px] bg-white px-[16px] py-[24px] sm:rounded-[18px] sm:px-[28px] sm:py-[30px] lg:rounded-[20px] lg:px-[60px] lg:py-[48px]">
            <h2 className="text-[28px] font-black leading-[115%] text-[#333333] min-[380px]:text-[32px] sm:text-[44px] lg:text-[60px] lg:leading-[150%]">
              Start selling today
            </h2>

            <p className="mt-[12px] max-w-[650px] text-[14px] font-black leading-[145%] text-[#333333]/80 min-[380px]:text-[15px] sm:mt-[14px] sm:text-[19px] sm:leading-[150%] lg:text-[24px]">
              Put your products in front of the millions of customers who
              search TreeMiix.com every day.
            </p>

            {/* Sign up */}
            <Link
              href="/register"
              className="mt-[20px] flex h-[46px] w-fit min-w-[110px] items-center justify-center rounded-[12px] bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] px-[22px] text-[16px] font-medium leading-[120%] text-white sm:mt-[24px] sm:h-[50px] sm:min-w-[125px] sm:px-[26px] sm:text-[18px] lg:mt-[28px] lg:min-h-[64px] lg:min-w-[150px] lg:rounded-[14px] lg:px-[34px] lg:text-[26.29px]"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}