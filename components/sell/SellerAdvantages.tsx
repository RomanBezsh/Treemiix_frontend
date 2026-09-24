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
          {advantages.map((advantage, index) => (
            <div
              key={advantage.title}
              className={`
                sell-fade-up
                ${index === 0 ? "sell-delay-1" : ""}
                ${index === 1 ? "sell-delay-2" : ""}
                ${index === 2 ? "sell-delay-3" : ""}
              `}
            >
              <div
                className="
                  group flex items-center justify-center
                  transition-transform duration-300 ease-out
                  hover:-translate-y-[6px]
                "
              >
                <Image
                  src={advantage.icon}
                  alt={advantage.title}
                  width={440}
                  height={388}
                  className="
                    mx-auto h-auto w-full max-w-[440px] object-contain
                    transition-all duration-300 ease-out
                    group-hover:scale-[1.025]
                    group-hover:drop-shadow-[0_10px_12px_rgba(0,0,0,0.08)]
                  "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}