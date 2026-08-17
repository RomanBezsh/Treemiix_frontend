"use client";

import Image from "next/image";
import { useState } from "react";

const faqItems = [
  {
    question: "What can TreeMiix Gift Cards be redeemed towards?",
    answer:
      "TreeMiix Gift Cards can be used toward eligible products and services available on TreeMiix.com.",
  },
  {
    question:
      "Are there any fees or expiration date to use TreeMiix Gift Cards?",
    answer:
      "TreeMiix Gift Cards do not have service fees and do not expire unless otherwise stated.",
  },
  {
    question: "Are there any shipping costs on TreeMiix Gift Cards?",
    answer:
      "Physical TreeMiix.com gift cards (except Anytime Gift Cards) are delivered with FREE One-Day shipping when you select One-Day shipping at checkout. For more information, check this page.",
  },
];

export default function GiftCardsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(2);

  const toggleItem = (index: number) => {
    setOpenIndex((currentIndex) =>
      currentIndex === index ? null : index,
    );
  };

  return (
    <section className="w-full font-[var(--font-roboto)]">
      <h2 className="mb-[18px] text-[24px] font-normal leading-[150%] text-[#333333]">
        Frequently asked questions about TreeMiix.com gift cards
      </h2>

      <div className="flex flex-col gap-[10px]">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.question}
              className="flex items-start gap-[12px]"
            >
              <div className="min-w-0 flex-1 overflow-hidden rounded-[20px] border border-[#E5E5E5] bg-[#F8F8F8] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  className="flex min-h-[76px] w-full items-center px-[34px] py-[20px] text-left"
                >
                  <span className="text-[24px] font-normal leading-[150%] text-[#333333]">
                    {item.question}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-[#EFEFEF] px-[34px] pb-[24px] pt-[20px]">
                    <p className="max-w-[1040px] text-[24px] font-normal leading-[150%] text-[#333333]">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => toggleItem(index)}
                aria-label={isOpen ? "Close answer" : "Open answer"}
                aria-expanded={isOpen}
                className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-[20px] border border-[#E5E5E5] bg-[#F8F8F8] shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
               <Image
  src="/common/arrow_right_icon.svg"
  alt=""
  width={24}
  height={24}
  aria-hidden="true"
  className={`object-contain transition-transform duration-200 ${
    isOpen ? "rotate-90" : "rotate-0"
  }`}
/>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}