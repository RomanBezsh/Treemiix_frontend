import Image from "next/image";
import Link from "next/link";

const benefits = [
  "Get 5% back on your first $1,000,000 in branded sales",
  "Try FBA with free inbound shipping, storage, removals, and returns",
  "Get $200 credit for Sponsored Products CPC ads—bids are up to you",
  "Get a head start on brand protection, product reviews, and more",
];

export default function SellerBenefits() {
  return (
    <section className="w-full bg-white font-[var(--font-roboto)]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[44px] px-[20px] py-[60px] sm:px-[32px] lg:flex-row lg:gap-[70px] lg:px-[80px] lg:py-[100px]">
        {/* Sales chart */}
        <div className="flex w-full max-w-[320px] shrink-0 items-center justify-center lg:w-[380px] lg:max-w-none">
          <Image
            src="/sell/sales-chart.svg"
            alt="Sales growth chart"
            width={360}
            height={360}
            className="h-auto w-full object-contain"
          />
        </div>

        {/* Benefits content */}
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <h2 className="text-[34px] font-black leading-[120%] text-[#333333]/80 sm:text-[42px] lg:text-[60px] lg:leading-[130%]">
            Over $50K in potential benefits
          </h2>

          <p className="mt-[20px] max-w-[800px] text-[16px] font-black leading-[150%] text-[#333333]/80 lg:mt-[24px] lg:text-[20px]">
            Ready to sell? Launch your brand today with a powerful playbook for
            new sellers and over $50K in potential benefits.
          </p>

          <ul className="mt-[22px] flex max-w-[900px] flex-col gap-[8px] lg:mt-[24px]">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-[10px] text-[16px] font-medium leading-[150%] sm:text-[18px] lg:text-[22px]"
              >
                <span className="bg-[linear-gradient(90deg,#6A7DBE_0%,#87618D_100%)] bg-clip-text text-transparent">
                  •
                </span>

                <span className="bg-[linear-gradient(90deg,#6A7DBE_0%,#87618D_100%)] bg-clip-text text-transparent">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/sell/learn-more"
            className="mt-[26px] flex items-center justify-center rounded-[18px] border-[3px] border-[#7C9BC0] px-[30px] py-[10px] text-[16px] font-medium leading-[120%] text-[#7C9BC0] lg:mt-[28px] lg:rounded-[20px] lg:px-[45px] lg:py-[12px] lg:text-[20px]"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}