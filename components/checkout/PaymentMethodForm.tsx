"use client";

import Image from "next/image";

const paymentLogos = [
  {
    src: "/checkout/payment/logos_visa.svg",
    alt: "Visa",
  },
  {
    src: "/checkout/payment/logos_mastercard.svg",
    alt: "Mastercard",
  },
  {
    src: "/checkout/payment/logos_discover.svg",
    alt: "Discover",
  },
  {
    src: "/checkout/payment/pngwing 17.svg",
    alt: "Payment method",
  },
  {
    src: "/checkout/payment/pngwing 18.svg",
    alt: "Payment method",
  },
  {
    src: "/checkout/payment/ABC BANK 1.svg",
    alt: "ABC Bank",
  },
  {
    src: "/checkout/payment/NH 1.svg",
    alt: "NH",
  },
  {
    src: "/checkout/payment/SHINHANCARD 1.svg",
    alt: "Shinhan Card",
  },
];

export default function PaymentMethodForm() {
  return (
    <section className="w-full rounded-[20px] bg-[#F8F8F8] px-[18px] py-[22px] shadow-[0_2px_5px_rgba(0,0,0,0.08)] sm:px-[24px] sm:py-[26px] lg:px-[28px]">
      {/* Title */}
      <h2 className="text-[22px] font-normal leading-[150%] text-[#333333] sm:text-[25px]">
        Add a Payment Method
      </h2>

      {/* Credit / debit cards */}
      <div className="mt-[20px] flex flex-col gap-[18px] md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h3 className="text-[18px] font-normal leading-[150%] text-[#333333] sm:text-[20px]">
            Credit or debit cards
          </h3>

          <p className="mt-[2px] text-[13px] font-normal leading-[150%] text-[#333333] sm:text-[14px]">
            Amazon accepts major credit and debit cards.
          </p>

          <button
            type="button"
            className="mt-[14px] flex min-h-[48px] w-full items-center justify-center rounded-[20px] bg-[#7C9BC0] px-[24px] py-[12px] text-[16px] font-medium leading-[120%] text-white sm:w-fit sm:px-[45px] sm:text-[20px]"
          >
            Add a credit or debit card
          </button>
        </div>

        {/* Payment logos */}
        <div className="grid shrink-0 grid-cols-4 items-center gap-x-[8px] gap-y-[8px] md:max-w-[250px]">
          {paymentLogos.map((logo) => (
            <div
              key={logo.src}
              className="flex h-[30px] min-w-[42px] items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={48}
                height={28}
                className="max-h-[30px] max-w-[50px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gift cards */}
      <div className="mt-[34px]">
        <h3 className="text-[18px] font-normal leading-[150%] text-[#333333] sm:text-[20px]">
          Gift Cards, Vouchers &amp; Promotional Codes
        </h3>

        <button
          type="button"
          className="mt-[10px] flex items-start gap-[7px] text-left text-[14px] font-normal leading-[150%] text-[#496B94] sm:text-[16px]"
        >
          <span className="mt-[1px] shrink-0">›</span>

          <span>
            Amazon accepts major credit and debit cards.
          </span>
        </button>
      </div>

      {/* Store Card */}
      <div className="mt-[30px]">
        <h3 className="text-[18px] font-normal leading-[150%] text-[#333333] sm:text-[20px]">
          TreeMiix.com Store Card
        </h3>

        <p className="mt-[8px] text-[13px] font-normal leading-[150%] text-[#333333] sm:text-[14px]">
          Access to exclusive financing offers. No annual fee. Zero fraud
          liability.
        </p>

        <button
          type="button"
          className="mt-[4px] text-[13px] font-normal leading-[150%] text-[#496B94] sm:text-[14px]"
        >
          Learn more
        </button>
      </div>

      {/* Personal checking */}
      <div className="mt-[26px]">
        <h3 className="text-[18px] font-normal leading-[150%] text-[#333333] sm:text-[20px]">
          Personal Checking Accounts
        </h3>

        <p className="mt-[8px] text-[13px] font-normal leading-[150%] text-[#333333] sm:text-[14px]">
          Use your US based personal checking account.
        </p>

        <button
          type="button"
          className="mt-[4px] text-[13px] font-normal leading-[150%] text-[#496B94] sm:text-[14px]"
        >
          Learn more
        </button>

        <button
          type="button"
          className="mt-[14px] flex min-h-[48px] w-full items-center justify-center rounded-[20px] bg-[#7C9BC0] px-[24px] py-[12px] text-[16px] font-medium leading-[120%] text-white sm:w-fit sm:px-[45px] sm:text-[20px]"
        >
          Add a personal checking account
        </button>
      </div>
    </section>
  );
}