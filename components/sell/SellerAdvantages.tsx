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
      <div className="mx-auto w-full max-w-[1440px] px-[20px] py-[60px] sm:px-[32px] lg:px-[80px] lg:py-[80px]">
        {/* Advantage images */}
        <div className="grid grid-cols-1 gap-[28px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-[40px]">
          {advantages.map((advantage) => (
            <Image
              key={advantage.title}
              src={advantage.icon}
              alt={advantage.title}
              width={440}
              height={388}
              className="mx-auto h-auto w-full max-w-[440px] object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}