import Image from "next/image";
import Link from "next/link";

const cardTypes = [
  {
    title: "Gift cards",
    description: "Add a personal touch by adding your own photo or video.",
    image: "/gift-cards/card-types/happy-birthday.svg",
    href: "/gift-cards",
    gridClassName: "lg:col-span-2",
  },
  {
    title: "Physical gift cards",
    description: "Send a smile with unique designs and fun packaging.",
    image: "/gift-cards/card-types/send-a-smile.svg",
    href: "/gift-cards/physical",
    gridClassName: "lg:col-span-2",
  },
  {
    title: "Print at home",
    description: "Print and fold an Amazon Gift Card at home.",
    image: "/gift-cards/card-types/thanks.svg",
    href: "/gift-cards/print-at-home",
    gridClassName: "lg:col-span-2",
  },
  {
    title: "Specialty gift cards",
    description: "Give a gift from their favorite brand.",
    image: "/gift-cards/card-types/specialty.svg",
    href: "/gift-cards/specialty",
    gridClassName: "lg:col-span-3",
  },
  {
    title: "TreeMiix Reload",
    description: "Easily add funds to your gift card balance.",
    image: "/gift-cards/card-types/card-balance.svg",
    href: "/gift-cards/reload",
    gridClassName: "lg:col-span-3",
  },
];

export default function CardTypesGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-[18px] gap-y-[36px] sm:grid-cols-2 lg:grid-cols-6 lg:gap-y-[48px]">
      {cardTypes.map((card, index) => (
        <div
          key={card.title}
          className={`
            gift-fade-up
            ${index === 0 ? "gift-delay-1" : ""}
            ${index === 1 ? "gift-delay-2" : ""}
            ${index === 2 ? "gift-delay-3" : ""}
            ${index === 3 ? "gift-delay-4" : ""}
            ${index === 4 ? "gift-delay-5" : ""}
            ${card.gridClassName}
          `}
        >
          <Link
            href={card.href}
            className="
              group block
              transition-transform duration-300 ease-out
              hover:-translate-y-[5px]
            "
          >
            {/* Card image */}
            <div
              className="
                w-full overflow-hidden rounded-[14px] bg-white
                transition-shadow duration-300 ease-out
                group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.10)]
              "
            >
              <Image
                src={card.image}
                alt={card.title}
                width={620}
                height={280}
                className="
                  h-auto w-full object-contain
                  transition-transform duration-300 ease-out
                  group-hover:scale-[1.025]
                "
              />
            </div>

            {/* Card title */}
            <h3
              className="
                mt-[10px] text-[20px] font-medium leading-[140%] text-[#333333]
                transition-colors duration-200
                group-hover:text-[#6A7DBE]
                sm:text-[22px]
                lg:mt-[12px] lg:text-[24px] lg:leading-[150%]
              "
            >
              {card.title}
            </h3>

            {/* Description */}
            <p className="mt-[6px] text-[15px] font-normal leading-[145%] text-[#333333]/80 sm:text-[16px] lg:mt-[8px] lg:text-[18px] lg:leading-[150%]">
              {card.description}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}