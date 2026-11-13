import SimpleProductCard from "@/components/catalog/SimpleProductCard";
import Carousel from "@/components/common/Carousel";
import AuthBanner from "@/components/home/AuthBanner";
import CarouselCard from "@/components/home/CarouselCard";
import CategoryCard from "@/components/home/CategoryCard";
import CategoryQuadCard from "@/components/home/CategoryQuadCard";
import HeroBanner from "@/components/home/HeroBanner";
import PopularCategoriesSection from "@/components/home/PopularCategoriesSection";
import PopularProductsSection from "@/components/home/PopularProductsSection";
import PromoBanner from "@/components/home/PromoBanner";
import SalesSection from "@/components/home/SalesSection";
import RecentlyViewedSection from "@/components/home/RecentlyViewedSection";
import { mainImagePath } from "@/lib/media";
import { ACTIVE_PRODUCTS_PATH, isStorefrontProduct, orderByCategories, rootCategoryCards } from "@/lib/products";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://treemiix-backend.onrender.com/api";
const FALLBACK_IMAGE = "/account/lists/product-placeholder.png";


export default async function Home() {
  // --- Server-side data fetching ---
  const catRes = await fetch(`${API_BASE_URL}/categories`, {
    cache: "no-store",
  });
  const categories: any[] = await catRes.json().catch(() => []);

  const allCategories = Array.isArray(categories) ? categories : [];

  // Все активные товары одним запросом, порядок — как при загрузке по категориям
  const productsData = await fetch(`${API_BASE_URL}${ACTIVE_PRODUCTS_PATH}`, {
    cache: "no-store",
  })
    .then((res) => res.json().catch(() => []))
    .catch(() => []);
  const allProducts: any[] = orderByCategories(productsData, allCategories);

  // Правило витрины: активный товар, есть картинка, продавец одобрен
  const storefrontProducts = allProducts
    .filter(isStorefrontProduct)
    .map((p: any) => ({
      ...p,
      imageUrl: mainImagePath(p),
    }));
  const products = storefrontProducts.slice(0, 24);

  // --- Derived data ---

  const shuffledProducts = [...products].sort((a, b) =>
    (a.id || a.title).localeCompare(b.id || b.title)
  );
  const popularItems = shuffledProducts.slice(0, 3).map((p, index) => ({
    title: p.name || p.title,
    imageSrc: p.imageUrl || p.images?.[0] || p.imageSrc || "",
    price: p.price || 0,
    rating: p.rating || 0,
    isLastItem: index === 2,
  }));

  // Root categories that have storefront products, each with a photo of one of them:
  // the first three go to "Most popular categories", the next two to the bottom row.
  const categoryCards = rootCategoryCards(productsData, allCategories, 5);
  const popularCategoriesItems = categoryCards.slice(0, 3).map((card) => ({
    category: card.name,
    href: `/catalog?category=${card.id}`,
    imageSrc: card.imageUrl,
  }));
  const bottomCategoryCards = categoryCards.slice(3, 5);

  const toCardItem = (p: (typeof storefrontProducts)[number]) => ({
    id: p.id || p.title,
    title: p.name || p.title,
    imageSrc:
      p.imageUrl || p.images?.[0] || p.imageSrc || "",
    price: p.price,
    rating: p.rating || 0,
  });
  const cardItems = products.map(toCardItem);

  // Bottom row: newest products and best rated ones (storefront only)
  const newArrivals = [...storefrontProducts]
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
    .slice(0, 4)
    .map(toCardItem);
  const topRated = [...storefrontProducts]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0) || String(a.name).localeCompare(String(b.name)))
    .slice(0, 4)
    .map(toCardItem);

  const saleCardItems = products
    .filter((p) => p.oldCost && p.oldCost > p.price)
    .slice(0, 20)
    .map((p) => ({
      id: p.id || p.title,
      title: p.name || p.title,
      imageSrc:
        p.imageUrl || p.images?.[0] || p.imageSrc || "",
      price: p.price,
      rating: p.rating || 0,
    }));

  const isGuid = (id: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      id
    );

  const carouselTitles = ["Trending Now", "Fresh Picks", "Best Sellers"];
  const carouselGroups = [0, 1, 2].map((groupIndex) => {
    const group = cardItems
      .filter((_, index) => index % 3 === groupIndex)
      .slice(0, 4);
    return group;
  });

  type QuadCardItem = {
    id: string;
    title: string;
    imageSrc: string;
    href: string;
    rating?: number;
  };

  const quadTitles = [
    "Audio & Tech",
    "Kitchen Comfort",
    "Sneaker Station",
    "Smart Finds",
  ];
  const electronicsId = categories.find((c) => c.name === "Electronics")?.id;
  const kitchenId = categories.find((c) => c.name === "Home & Kitchen")?.id;
  const footwearId = categories.find(
    (c) => c.name === "Footwear & Sports"
  )?.id;
  const quadMoreHrefs = [
    electronicsId ? `/catalog?category=${electronicsId}` : "/catalog",
    kitchenId ? `/catalog?category=${kitchenId}` : "/catalog",
    footwearId ? `/catalog?category=${footwearId}` : "/catalog",
    "/catalog",
  ];
  const quadMatchers = [
    /headphone|iphone|phone|router|monitor|speaker|camera/i,
    /delonghi|espresso|vase|candle|lamp|pillow|frame|iron|wine|kitchen/i,
    /nike|pegasus|air|revolution|court|force|shoe|sneaker|max/i,
    /tablet|microphone|headset|smart|tv|razer|mouse|gadget/i,
  ];
  const quadRealPool: QuadCardItem[] = cardItems.map((p) => ({
    ...p,
    href: isGuid(String(p.id)) ? `/product/${p.id}` : "/catalog",
  }));
  const quadGroups: QuadCardItem[][] = quadMatchers.map(
    (matcher, matcherIndex) => {
      if (quadRealPool.length === 0) return [];
      const matchIndex = quadRealPool.findIndex((item) =>
        matcher.test(item.title)
      );
      const start =
        matchIndex >= 0 ? matchIndex : matcherIndex % quadRealPool.length;
      const size = Math.min(4, quadRealPool.length);
      return Array.from({ length: size }, (_, offset) =>
        quadRealPool[(start + offset) % quadRealPool.length]
      );
    }
  );

  // Two items per view on phones (as in Figma), default widths from sm
  const homeCarouselItem =
    "w-[calc(50%-6px)] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)] 2xl:w-[calc(20%-16px)]";

  return (
    <div className="mb-16 flex flex-1 flex-col items-center justify-center font-sans 2xl:mb-100">
      <img
        className="h-[200px] w-full object-cover sm:h-auto"
        src="/background/main.jpg"
        alt="Logo"
      />

      {/* Mobile order follows Figma; from md the desktop order is restored via md:order-* */}
      <div className="relative z-10 -mt-12 flex w-full max-w-[1534px] flex-col gap-8 px-4 sm:-mt-24 sm:px-6 md:gap-5 2xl:-mt-43 2xl:px-0">
        {/* Product carousels + banners */}
        <div className="animate-fade-in-up order-1 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {carouselGroups.map((group, index) => group.length > 0 && (
            <div key={carouselTitles[index]} className={`min-w-0 ${index === 2 ? "hidden md:block" : ""}`}>
              <CarouselCard
                title={carouselTitles[index]}
                imageSrc={group[0]?.imageSrc || FALLBACK_IMAGE}
                href="/catalog"
                items={group}
              />
            </div>
          ))}
          <div className="hidden min-w-0 flex-col gap-2.75 md:flex">
            <HeroBanner />
            <PromoBanner />
          </div>
        </div>

        {/* Category quad cards */}
        <div className="animate-fade-in-up order-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:order-2 xl:grid-cols-4">
          {quadGroups.map((group, index) => (
            <CategoryQuadCard
              key={quadTitles[index]}
              title={quadTitles[index]}
              moreHref={quadMoreHrefs[index]}
              items={group}
            />
          ))}
        </div>

        <div className="order-3 flex flex-col gap-8 md:order-3 2xl:flex-row 2xl:justify-between 2xl:gap-5">
          <PopularProductsSection href="/catalog" items={popularItems} />
          <PopularCategoriesSection
            href="/catalog"
            items={popularCategoriesItems}
          />
        </div>

        <SalesSection
          items={saleCardItems}
          className="order-5 -mx-4 sm:-mx-6 md:order-4 md:mb-5 2xl:mx-0"
          itemClassName={homeCarouselItem}
        />

        <div className="animate-fade-in-up order-2 empty:hidden md:order-5">
          <AuthBanner />
        </div>

        <div className="order-6 grid grid-cols-2 gap-3 sm:gap-5 md:mb-5 xl:grid-cols-4 2xl:flex 2xl:flex-row 2xl:justify-between">
          {newArrivals.length > 0 && (
            <CarouselCard
              title="New Arrivals"
              imageSrc={newArrivals[0].imageSrc || FALLBACK_IMAGE}
              href="/catalog"
              items={newArrivals}
            />
          )}
          {bottomCategoryCards[0] && (
            <CategoryCard
              title={bottomCategoryCards[0].name}
              imageSrc={bottomCategoryCards[0].imageUrl}
              href={`/catalog?category=${bottomCategoryCards[0].id}`}
            />
          )}
          {topRated.length > 0 && (
            <CarouselCard
              title="Top Rated"
              imageSrc={topRated[0].imageSrc || FALLBACK_IMAGE}
              href="/catalog"
              items={topRated}
            />
          )}
          {bottomCategoryCards[1] && (
            <CategoryCard
              title={bottomCategoryCards[1].name}
              imageSrc={bottomCategoryCards[1].imageUrl}
              href={`/catalog?category=${bottomCategoryCards[1].id}`}
            />
          )}
        </div>

        <RecentlyViewedSection
          products={products}
          className="order-7 -mx-4 mb-10 sm:-mx-6 2xl:mx-0"
          itemClassName={homeCarouselItem}
        />
      </div>
    </div>
  );
}
