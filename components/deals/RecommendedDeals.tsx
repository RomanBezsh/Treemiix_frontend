import Image from "next/image";

const recommended = [
  { id: 1, title: "Tablets" },
  { id: 2, title: "Tablets" },
  { id: 3, title: "Tablets" },
  { id: 4, title: "Tablets" },
  { id: 5, title: "Tablets" },
  { id: 6, title: "Tablets" },
];

export default function RecommendedDeals() {
  return (
    <section className="w-full">
      {/* Categories title */}
      <h2 className="text-[18px] font-medium leading-[130%] text-[#333333]">
        Categories
      </h2>

      {/* Categories grid */}
      <div className="mt-[14px] grid grid-cols-2 gap-[12px] sm:grid-cols-3 xl:grid-cols-6">
        {recommended.map((item) => (
          <article
            key={item.id}
            className="rounded-[12px] bg-[#F8F8F8] p-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          >
            {/* Card header */}
            <div className="flex items-center justify-between gap-[8px]">
              <span className="text-[14.41px] font-semibold leading-[120%] text-[#333333]">
                {item.title}
              </span>

              <button
                type="button"
                className="shrink-0 text-[7.81px] font-normal leading-[100%] text-[#777777]"
              >
                More →
              </button>
            </div>

            {/* Category image */}
            <div className="mt-[10px] flex h-[120px] items-center justify-center">
              <Image
                src="/account/lists/product-placeholder.png"
                alt={item.title}
                width={110}
                height={110}
                className="max-h-[110px] max-w-[110px] object-contain"
              />
            </div>
          </article>
        ))}
      </div>

      {/* More categories */}
      <div className="mt-[10px] flex justify-end">
        <button
          type="button"
          className="text-[7.81px] font-normal leading-[100%] text-[#555555]"
        >
          More →
        </button>
      </div>
    </section>
  );
}