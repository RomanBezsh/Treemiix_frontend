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
import {
  popularCategoriesData,
  popularProductsData,
  carouselCardProducts,
} from "@/data/mockData";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://treemiix-backend.onrender.com/api";
const FALLBACK_IMAGE =
  "https://cdn.new-brz.net/app/public/models/MPXV3ZP-A/large/w/231110080013512834.webp";

export default async function Home() {
  // --- Server-side data fetching ---
  const catRes = await fetch(`${API_BASE_URL}/categories`, {
    cache: "no-store",
  });
  const categories: any[] = await catRes.json().catch(() => []);

  const allCategories = Array.isArray(categories) ? categories : [];

  // Товары грузим по категориям — запрос всех товаров сразу
  // (/products?isActive=true) падает с 500 на проде. По категориям работает.
  const categoryProducts = await Promise.all(
    allCategories.map((c: { id: string }) =>
      fetch(`${API_BASE_URL}/products?categoryId=${c.id}`, {
        cache: "no-store",
      })
        .then((res) => res.json().catch(() => []))
        .catch(() => [])
    )
  );
  const allProducts: any[] = categoryProducts.flat();

  // Показываем только демо-товары (SKU начинается с DEMO-)
  // и только с картинками — товары без медиа не выводятся вообще
  const products = allProducts
    .filter(
      (p: any) =>
        (p.sku || "").startsWith("DEMO-") &&
        Boolean(
          p.imageUrl ||
            p.images?.[0] ||
            p.galleries?.[0]?.path ||
            p.productGalleries?.[0]?.path
        )
    )
    .map((p: any) => ({
      ...p,
      imageUrl:
        p.imageUrl ||
        (p.images && p.images[0]) ||
        (p.galleries && p.galleries[0]?.path) ||
        (p.productGalleries && p.productGalleries[0]?.path) ||
        "",
    }))
    .slice(0, 24);

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

  const displayCategories =
    categories.length > 0
      ? categories
      : [
          { id: "1", name: "Electronics" },
          { id: "2", name: "Fashion" },
          { id: "3", name: "Home & Kitchen" },
        ];

  const shuffledCategories = [...displayCategories].sort((a, b) =>
    String(a.id || a.name).localeCompare(String(b.id || b.name))
  );
  const popularCategoriesItems = shuffledCategories.slice(0, 3).map(
    (cat, catIndex) => {
      const catProducts = products.filter(
        (p) =>
          p.categoryId === cat.id &&
          (p.imageUrl || p.images?.[0])
      );
      const targetProduct =
        catProducts.length > 0
          ? catProducts[catIndex % catProducts.length]
          : products.length > 0
            ? products[catIndex % products.length]
            : null;

      const isGuid = (id: unknown) =>
        typeof id === "string" &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          id
        );

      const fallbackImage =
        popularCategoriesData?.[catIndex]?.imageSrc || FALLBACK_IMAGE;

      return {
        category: cat.name || cat.title || "Category",
        href: isGuid(cat.id)
          ? `/catalog?category=${cat.id}`
          : "/catalog",
        imageSrc:
          targetProduct?.imageUrl ||
          targetProduct?.images?.[0] ||
          fallbackImage,
      };
    }
  );

  const cardItems = products.map((p) => ({
    id: p.id || p.title,
    title: p.name || p.title,
    imageSrc:
      p.imageUrl || p.images?.[0] || p.imageSrc || "",
    price: p.price,
    rating: p.rating || 0,
  }));

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
    // Если в группе нет товаров с картинками, подставляем из mock-данных
    if (group.length === 0 || group.every((i) => !i.imageSrc)) {
      return popularProductsData
        .slice(groupIndex * 3, (groupIndex + 1) * 3)
        .map((p) => ({
          id: p.title,
          title: p.title,
          imageSrc: p.imageSrc,
          price: p.price,
          rating: 0,
        }));
    }
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

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans mb-100">
      <img
        className="w-full object-cover"
        src="/background/main.jpg"
        alt="Logo"
      />

      <div className="relative z-10 -mt-43 w-full max-w-[1534px]">
        <div className="grid grid-cols-4 gap-5 mb-5">
          {carouselGroups.map((group, index) => (
            <CarouselCard
              key={carouselTitles[index]}
              title={carouselTitles[index]}
              imageSrc={group[0]?.imageSrc || FALLBACK_IMAGE}
              href="/catalog"
              items={group}
            />
          ))}
          <div className="flex flex-col gap-2.75">
            <HeroBanner />
            <PromoBanner />
          </div>
          {quadGroups.map((group, index) => (
            <CategoryQuadCard
              key={quadTitles[index]}
              title={quadTitles[index]}
              moreHref={quadMoreHrefs[index]}
              items={group}
            />
          ))}
        </div>

        <div className="flex flex-row gap-6 justify-center mb-5">
          <PopularProductsSection href="/catalog" items={popularItems} />
          <PopularCategoriesSection
            href="/catalog"
            items={popularCategoriesItems}
          />
        </div>

        <SalesSection items={saleCardItems} />

        <AuthBanner />

        <div className="flex flex-row gap-5 justify-between mb-10">
          <CarouselCard
            title="Backend Products"
            imageSrc={
              cardItems[0]?.imageSrc ||
              carouselCardProducts[0]?.imageSrc ||
              FALLBACK_IMAGE
            }
            href="/catalog"
            items={cardItems.slice(0, 4)}
          />
          <CategoryCard
            title={categories[0]?.name || "Category 1"}
            imageSrc={
              popularCategoriesData[0]?.imageSrc ||
              carouselCardProducts[1]?.imageSrc ||
              FALLBACK_IMAGE
            }
            href={
              categories[0]?.id
                ? `/catalog?category=${categories[0].id}`
                : "/catalog"
            }
          />
          <CarouselCard
            title="Backend Products"
            imageSrc={
              cardItems[1]?.imageSrc ||
              carouselCardProducts[2]?.imageSrc ||
              FALLBACK_IMAGE
            }
            href="/catalog"
            items={cardItems.slice(0, 4)}
          />
          <CategoryCard
            title={categories[1]?.name || "Category 2"}
            imageSrc={
              popularCategoriesData[1]?.imageSrc ||
              carouselCardProducts[3]?.imageSrc ||
              FALLBACK_IMAGE
            }
            href={
              categories[1]?.id
                ? `/catalog?category=${categories[1].id}`
                : "/catalog"
            }
          />
        </div>

        <RecentlyViewedSection products={products} />
      </div>
    </div>
  );
}
