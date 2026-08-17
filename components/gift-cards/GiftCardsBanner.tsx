import Image from "next/image";

export default function GiftCardsBanner() {
  return (
    <section className="w-full">
      <Image
        src="/gift-cards/banner.svg"
        alt="Gift Cards Promotion"
        width={1280}
        height={220}
        className="h-auto w-full"
        priority
      />
    </section>
  );
}