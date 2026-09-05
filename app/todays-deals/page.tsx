import DealCard from "@/components/deals/DealCard";
import DealsSidebar from "@/components/deals/DealsSidebar";
import DealsToolbar from "@/components/deals/DealsToolbar";
import RecommendedDeals from "@/components/deals/RecommendedDeals";

const deals = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  title: "essence | Lash Princess False Lash Effect Mascara",
  price: 50,
  oldPrice: 75,
  rating: 4,
}));

export default function TodaysDealsPage() {
  return (
    <main className="w-full bg-white font-[var(--font-roboto)]">
      <div className="mx-auto w-full max-w-[1600px] px-[16px] pb-[80px] pt-[24px] sm:px-[24px] lg:px-[40px]">
        <div className="flex flex-col gap-[28px] lg:flex-row lg:items-start lg:gap-[40px]">
          {/* Filters */}
          <div className="w-full lg:w-[280px] lg:shrink-0">
            <DealsSidebar />
          </div>

          {/* Main deals content */}
          <section className="min-w-0 flex-1">
            {/* Recommended title */}
            <h1 className="text-[20px] font-medium leading-[130%] text-[#333333]/80 sm:text-[24px]">
              Recommended deals for you
            </h1>

            {/* Selected filters and sorting */}
            <div className="mt-[14px]">
              <DealsToolbar />
            </div>

            {/* Categories */}
            <div className="mt-[28px]">
              <RecommendedDeals />
            </div>

            {/* Deals grid */}
            <div className="mt-[42px] grid grid-cols-1 gap-[14px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              {deals.map((deal) => (
                <DealCard
                  key={deal.id}
                  title={deal.title}
                  price={deal.price}
                  oldPrice={deal.oldPrice}
                  rating={deal.rating}
                />
              ))}
            </div>

            {/* Pagination */}
            <nav
              aria-label="Deals pagination"
              className="mt-[40px] flex items-center justify-center gap-[4px] sm:gap-[6px] lg:gap-[8px]"
            >
              {/* Previous page */}
              <button
                type="button"
                aria-label="Previous page"
                className="
                  flex h-[46px] w-[46px] shrink-0 items-center justify-center
                  rounded-[14px] bg-[#FAFAFA]
                  text-[24px] font-medium leading-[144%] text-[#828282]/50
                  shadow-[0_2px_4px_0_rgba(0,0,0,0.20)]
                  sm:h-[58px] sm:w-[58px] sm:rounded-[17px]
                  lg:h-[76px] lg:w-[76px] lg:rounded-[20px]
                "
              >
                ‹
              </button>

              {/* Page 1 */}
              <button
                type="button"
                className="
                  flex h-[46px] w-[46px] shrink-0 items-center justify-center
                  rounded-[14px] bg-[#FAFAFA]
                  text-[18px] font-medium leading-[144%] text-[#828282]/50
                  shadow-[0_2px_4px_0_rgba(0,0,0,0.20)]
                  sm:h-[58px] sm:w-[58px] sm:rounded-[17px] sm:text-[21px]
                  lg:h-[76px] lg:w-[76px] lg:rounded-[20px] lg:text-[24px]
                "
              >
                1
              </button>

              {/* Active page */}
              <button
                type="button"
                aria-current="page"
                className="
                  flex h-[46px] w-[46px] shrink-0 items-center justify-center
                  rounded-[14px] border-[3px] border-[#D6D6D6]/30
                  bg-[#FAFAFA]
                  text-[18px] font-medium leading-[144%] text-[#828282]/50
                  shadow-[0_2px_4px_0_rgba(0,0,0,0.20)]
                  sm:h-[58px] sm:w-[58px] sm:rounded-[17px] sm:text-[21px]
                  lg:h-[76px] lg:w-[76px] lg:rounded-[20px]
                  lg:border-[4px] lg:text-[24px]
                "
              >
                2
              </button>

              {/* Page 3 */}
              <button
                type="button"
                className="
                  flex h-[46px] w-[46px] shrink-0 items-center justify-center
                  rounded-[14px] bg-[#FAFAFA]
                  text-[18px] font-medium leading-[144%] text-[#828282]/50
                  shadow-[0_2px_4px_0_rgba(0,0,0,0.20)]
                  sm:h-[58px] sm:w-[58px] sm:rounded-[17px] sm:text-[21px]
                  lg:h-[76px] lg:w-[76px] lg:rounded-[20px] lg:text-[24px]
                "
              >
                3
              </button>

              {/* Dots */}
              <div
                aria-hidden="true"
                className="
                  flex h-[46px] w-[46px] shrink-0 items-center justify-center
                  rounded-[14px] bg-[#FAFAFA]
                  text-[18px] font-medium leading-[144%] text-[#828282]/50
                  shadow-[0_2px_4px_0_rgba(0,0,0,0.20)]
                  sm:h-[58px] sm:w-[58px] sm:rounded-[17px] sm:text-[21px]
                  lg:h-[76px] lg:w-[76px] lg:rounded-[20px] lg:text-[24px]
                "
              >
                ...
              </div>

              {/* Last page */}
              <button
                type="button"
                className="
                  flex h-[46px] w-[46px] shrink-0 items-center justify-center
                  rounded-[14px] bg-[#FAFAFA]
                  text-[16px] font-medium leading-[144%] text-[#828282]/50
                  shadow-[0_2px_4px_0_rgba(0,0,0,0.20)]
                  sm:h-[58px] sm:w-[58px] sm:rounded-[17px] sm:text-[20px]
                  lg:h-[76px] lg:w-[76px] lg:rounded-[20px] lg:text-[24px]
                "
              >
                400
              </button>

              {/* Next page */}
              <button
                type="button"
                aria-label="Next page"
                className="
                  flex h-[46px] w-[46px] shrink-0 items-center justify-center
                  rounded-[14px] bg-[#FAFAFA]
                  text-[24px] font-medium leading-[144%] text-[#828282]/50
                  shadow-[0_2px_4px_0_rgba(0,0,0,0.20)]
                  sm:h-[58px] sm:w-[58px] sm:rounded-[17px]
                  lg:h-[76px] lg:w-[76px] lg:rounded-[20px]
                "
              >
                ›
              </button>
            </nav>

          {/* Help */}
<div className="mt-[42px]">
  <p className="text-[24px] font-medium leading-[130%] text-[#333333]/80">
    NEED HELP?
  </p>

  <p className="mt-[6px] text-[14px] font-medium leading-[130%]">
    <button
      type="button"
      className="text-[#496B94] hover:underline"
    >
      Visit the help section
    </button>

    <span className="text-[#333333]"> or </span>

    <button
      type="button"
      className="text-[#496B94] hover:underline"
    >
      contact us
    </button>
  </p>
</div>
          </section>
        </div>
      </div>
    </main>
  );
}