import Image from "next/image";

const advantages = [
  {
    title: "Sell more",
    icon: "/sell/sell-more.svg",
  },
  {
    title: "Scale with FBA",
    icon: "/sell/scale-fba.svg",
  },
  {
    title: "Make money",
    icon: "/sell/make-money.svg",
  },
];

export default function SellerAdvantages() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-[40px] py-[80px] lg:px-[80px]">
        {/* Advantage images */}
        <div className="flex w-full items-center justify-between gap-[40px]">
          {advantages.map((advantage) => (
            <Image
              key={advantage.title}
              src={advantage.icon}
              alt={advantage.title}
              width={440}
              height={388}
              className="h-auto min-w-0 flex-1 object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}