import Image from "next/image";
import Link from "next/link";

export interface DealCategoryTile {
  id: string;
  name: string;
  count: number;
  image: string;
  active: boolean;
}

interface RecommendedDealsProps {
  items: DealCategoryTile[];
  onSelect: (categoryId: string) => void;
}

const PLACEHOLDER = "/account/lists/product-placeholder.png";

// Categories with the most deals right now; a tile toggles the department filter
export default function RecommendedDeals({ items, onSelect }: RecommendedDealsProps) {
  if (items.length === 0) return null;

  return (
    <section className="tm-fade-up tm-delay-2 w-full">
      {/* Categories title */}
      <h2 className="text-[18px] font-medium leading-[130%] text-[#333333]">
        Deals by category
      </h2>

      {/* Categories grid */}
      <div className="mt-[14px] grid grid-cols-2 gap-[12px] sm:grid-cols-3 xl:grid-cols-6">
        {items.map((item, index) => (
          <article
            key={item.id}
            className={`
              tm-scale-in tm-lift
              group relative rounded-[12px] bg-[#F8F8F8] p-[10px]
              shadow-[0_1px_3px_rgba(0,0,0,0.08)]
              ${item.active ? "ring-2 ring-[#7E8CBD]" : ""}
            `}
            style={{ animationDelay: `${100 + index * 80}ms` }}
          >
            {/* Whole tile toggles the filter */}
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              aria-pressed={item.active}
              aria-label={`${item.active ? "Remove" : "Show"} ${item.name} deals`}
              className="absolute inset-0 z-0 rounded-[12px]"
            />

            {/* Card header */}
            <div className="pointer-events-none relative flex items-center justify-between gap-[8px]">
              <span className="line-clamp-1 text-[14.41px] font-semibold leading-[120%] text-[#333333] transition-colors duration-200 group-hover:text-[#496B94]">
                {item.name}
              </span>
              <span className="shrink-0 rounded-full bg-[#DE3A3A] px-[7px] py-[1px] text-[11px] font-medium text-white">
                {item.count}
              </span>
            </div>

            {/* Category image */}
            <div className="pointer-events-none relative mt-[10px] flex h-[120px] items-center justify-center">
              <Image
                src={item.image || PLACEHOLDER}
                alt={item.name}
                width={110}
                height={110}
                className="
                  max-h-[110px] max-w-[110px] object-contain
                  transition-transform duration-300 ease-out
                  group-hover:scale-[1.07]
                "
              />
            </div>

            <Link
              href={`/catalog?category=${item.id}`}
              className="relative z-10 mt-[6px] block w-fit text-[12px] font-normal leading-[100%] text-[#777777] transition-all duration-200 ease-out hover:translate-x-[2px] hover:text-[#496B94]"
            >
              More →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
