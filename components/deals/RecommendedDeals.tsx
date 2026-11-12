import Image from "next/image";
import Link from "next/link";
import type { CategoryCard } from "@/lib/products";

interface RecommendedDealsProps {
  /** Root categories with an image of one of their storefront products. */
  categories: CategoryCard[];
  loading?: boolean;
}

const SKELETON_COUNT = 6;

export default function RecommendedDeals({ categories, loading = false }: RecommendedDealsProps) {
  if (!loading && categories.length === 0) return null;

  return (
    <section className="deals-fade-up deals-delay-2 w-full">
      {/* Categories title */}
      <h2 className="text-[18px] font-medium leading-[130%] text-[#333333]">
        Categories
      </h2>

      {/* Categories grid */}
      <div className="mt-[14px] grid grid-cols-2 gap-[12px] sm:grid-cols-3 xl:grid-cols-6">
        {loading
          ? Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <div
                key={index}
                className="h-[164px] animate-pulse rounded-[12px] bg-[#F8F8F8]"
              />
            ))
          : categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/catalog?category=${encodeURIComponent(category.id)}`}
                aria-label={`${category.name}: more deals in the catalog`}
                className="
                  deals-scale-in
                  group block rounded-[12px] bg-[#F8F8F8] p-[10px]
                  shadow-[0_1px_3px_rgba(0,0,0,0.08)]
                  transition-all duration-300 ease-out
                  hover:-translate-y-[5px]
                  hover:shadow-[0_8px_18px_rgba(0,0,0,0.11)]
                "
                style={{
                  animationDelay: `${100 + index * 80}ms`,
                }}
              >
                {/* Card header */}
                <div className="flex items-center justify-between gap-[8px]">
                  <span className="min-w-0 truncate text-[14.41px] font-semibold leading-[120%] text-[#333333] transition-colors duration-200 group-hover:text-[#496B94]">
                    {category.name}
                  </span>

                  <span
                    className="
                      shrink-0 text-[7.81px] font-normal leading-[100%] text-[#777777]
                      transition-all duration-200 ease-out
                      group-hover:translate-x-[2px]
                      group-hover:text-[#496B94]
                    "
                  >
                    More →
                  </span>
                </div>

                {/* Category image: a product from this category */}
                <div className="mt-[10px] flex h-[120px] items-center justify-center">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={110}
                    height={110}
                    className="
                      max-h-[110px] max-w-[110px] object-contain
                      transition-transform duration-300 ease-out
                      group-hover:scale-[1.07]
                    "
                  />
                </div>
              </Link>
            ))}
      </div>

      {/* More categories */}
      <div className="mt-[10px] flex justify-end">
        <Link
          href="/catalog"
          className="
            text-[7.81px] font-normal leading-[100%] text-[#555555]
            transition-all duration-200 ease-out
            hover:translate-x-[3px]
            hover:text-[#496B94]
          "
        >
          More →
        </Link>
      </div>
    </section>
  );
}
