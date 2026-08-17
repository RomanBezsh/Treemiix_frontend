import HelpCard from "./HelpCard";
import { customerServiceCategories } from "@/data/customerServiceData";

export default function HelpCardsGrid() {
  const helpCards = Object.values(customerServiceCategories);

  return (
    <div className="flex flex-wrap justify-center gap-x-[40px] gap-y-[20px]">
      {helpCards.map((card) => (
        <HelpCard
          key={card.slug}
          title={card.title}
          icon={card.icon}
          href={`/customer-service/${card.slug}`}
        />
      ))}
    </div>
  );
}