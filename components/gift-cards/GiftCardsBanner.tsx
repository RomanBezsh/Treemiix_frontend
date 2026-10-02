import Image from "next/image";

export default function GiftCardsBanner() {
  return (
    <section className="gift-scale-in gift-delay-1 w-full">
      <div
        className="
          overflow-hidden
          transition-all duration-300 ease-out
          hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]
        "
      >
        <Image
          src="/gift-cards/banner.svg"
          alt="Gift Cards Promotion"
          width={1280}
          height={220}
          priority
          className="
            h-auto w-full
            transition-transform duration-500 ease-out
            hover:scale-[1.01]
          "
        />
      </div>
    </section>
  );
}