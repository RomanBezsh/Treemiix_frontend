"use client";
import { useState, useEffect } from "react";
import GiftCardsNavigation from "@/components/gift-cards/GiftCardsNavigation";
import GiftCardsOccasionList from "@/components/gift-cards/GiftCardsOccasionList";
import CardTypesGrid from "@/components/gift-cards/CardTypesGrid";
import GiftCardsBanner from "@/components/gift-cards/GiftCardsBanner";
import GiftCardsFaq from "@/components/gift-cards/GiftCardsFaq";
import GiftCardsEvents from "@/components/gift-cards/GiftCardsEvents";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://treemiix-backend.onrender.com/api";

export default function GiftCardsPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/gift-cards`)
      .then((res) => res.json())
      .then(setCards)
      .catch(() => setCards([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="w-full bg-white font-[var(--font-roboto)]">
      <GiftCardsNavigation />
      <div className="mx-auto w-full max-w-[1440px] px-[24px] pb-[80px] pt-[40px] lg:px-[40px]">
        <section>
          <h1 className="text-[38px] font-bold leading-[130%] text-[#333333]">
            Shop the perfect gift card
          </h1>
          <p className="mb-[14px] mt-[24px] text-[26px] font-light leading-[150%] text-[#777777]">
            Shop by occasion
          </p>
          <GiftCardsOccasionList />
        </section>
        <section className="mt-[48px]">
          <h2 className="mb-[26px] text-[20px] font-normal leading-[150%] text-[#555555]">
            Shop by card type
          </h2>
          <CardTypesGrid />
        </section>
        <section className="mt-[72px]">
          <GiftCardsBanner />
        </section>
        <section className="mt-[72px]">
          <GiftCardsFaq />
        </section>
        <section className="mt-[72px]">
          <h2 className="mb-[12px] text-[26px] font-normal leading-[150%] text-[#555555]">
            Events and Programs
          </h2>
          <GiftCardsEvents />
        </section>
      </div>
    </main>
  );
}