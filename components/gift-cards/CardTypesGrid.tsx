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
    <div className="grid grid-cols-1 gap-x-[18px] gap-y-[48px] md:grid-cols-2 lg:grid-cols-6">
      {cardTypes.map((card) => (
        <Link
          key={card.title}
          href={card.href}
          className={`group block ${card.gridClassName}`}
        >
          {/* Card image */}
          <div className="w-full overflow-hidden rounded-[14px] bg-white">
            <Image
              src={card.image}
              alt={card.title}
              width={620}
              height={280}
              className="h-auto w-full object-contain"
            />
          </div>

          {/* Card title */}
          <h3 className="mt-[12px] text-[24px] font-medium leading-[150%] text-[#333333]">
            {card.title}
          </h3>

          {/* Card description */}
          <p className="mt-[8px] text-[18px] font-normal leading-[150%] text-[#333333]/80">
            {card.description}
          </p>
        </Link>
      ))}
    </div>
  );
}