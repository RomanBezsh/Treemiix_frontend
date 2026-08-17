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
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-[100px] px-[40px] py-[100px] lg:px-[80px]">
        {/* Sales chart */}
        <div className="flex w-[420px] shrink-0 items-center justify-center">
          <Image
            src="/sell/sales-chart.svg"
            alt="Sales growth chart"
            width={360}
            height={360}
            className="h-auto w-full max-w-[360px] object-contain"
          />
        </div>

        {/* Benefits content */}
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <h2 className="text-[60px] font-black leading-[150%] text-[#333333]/80">
            Over $50K in potential benefits
          </h2>

          <p className="mt-[24px] max-w-[800px] text-[20px] font-black leading-[150%] text-[#333333]/80">
            Ready to sell? Launch your brand today with a powerful playbook for
            new sellers and over $50K in potential benefits.
          </p>

          <ul className="mt-[24px] flex max-w-[900px] flex-col gap-[2px]">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-[10px] text-[22px] font-medium leading-[150%]"
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
            className="mt-[28px] flex items-center justify-center rounded-[20px] border-[3px] border-[#7C9BC0] px-[45px] py-[12px] text-[20px] font-medium leading-[120%] text-[#7C9BC0]"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}