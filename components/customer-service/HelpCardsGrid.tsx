import HelpCard from "./HelpCard";
import { customerServiceCategories } from "@/data/customerServiceData";

export default function HelpCardsGrid() {
  const helpCards = Object.values(customerServiceCategories);

  return (
    <div className="flex flex-wrap justify-center gap-x-[40px] gap-y-[20px]">
      {helpCards.map((card, index) => (
        <div
          key={card.slug}
          className="help-fade-up"
          style={{
            animationDelay: `${index * 90}ms`,
          }}
        >
          <HelpCard
            title={card.title}
            icon={card.icon}
            href={`/customer-service/${card.slug}`}
          />
        </div>
      ))}
    </div>
  );
}