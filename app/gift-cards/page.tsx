import CardTypesGrid from "@/components/gift-cards/CardTypesGrid";
import GiftCardsBanner from "@/components/gift-cards/GiftCardsBanner";
import GiftCardsEvents from "@/components/gift-cards/GiftCardsEvents";
import GiftCardsFaq from "@/components/gift-cards/GiftCardsFaq";
import GiftCardsNavigation from "@/components/gift-cards/GiftCardsNavigation";
import GiftCardsOccasionList from "@/components/gift-cards/GiftCardsOccasionList";

export default function GiftCardsPage() {
  return (
    <main className="w-full bg-white font-[var(--font-roboto)]">
      {/* Navigation */}
      <GiftCardsNavigation />

      <div className="mx-auto w-full max-w-[1440px] px-[16px] pb-[60px] pt-[28px] sm:px-[24px] sm:pt-[34px] lg:px-[40px] lg:pb-[80px] lg:pt-[40px]">
        {/* Occasions */}
        <section>
          <h1 className="text-[22px] font-medium leading-[130%] text-[#333333] sm:text-[24px]">
            Shop the perfect gift card
          </h1>

          <p className="mb-[14px] mt-[18px] text-[14px] font-normal leading-[150%] text-[#777777] sm:mt-[24px] sm:text-[16px]">
            Shop by occasion
          </p>

          <GiftCardsOccasionList />
        </section>

        {/* Card types */}
        <section className="mt-[40px] lg:mt-[48px]">
          <h2 className="mb-[16px] text-[18px] font-normal leading-[150%] text-[#555555] sm:text-[20px] lg:mb-[20px]">
            Shop by card type
          </h2>

          <CardTypesGrid />
        </section>

        {/* Banner */}
        <section className="mt-[48px] lg:mt-[72px]">
          <GiftCardsBanner />
        </section>

        {/* FAQ */}
        <section className="mt-[48px] lg:mt-[72px]">
          <GiftCardsFaq />
        </section>

        {/* Events */}
        <section className="mt-[48px] lg:mt-[72px]">
          <GiftCardsEvents />
        </section>
      </div>
    </main>
  );
}