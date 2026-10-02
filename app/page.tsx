"use client";

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
import RecentlyViewedCard from "@/components/home/RecentlyViewedCard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getApi } from "@/components/api/useApi";
import {
  popularCategoriesData,
  popularProductsData,
} from "@/data/mockData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://treemiix-backend.onrender.com/api";
const FALLBACK_IMAGE = "https://cdn.new-brz.net/app/public/models/MPXV3ZP-A/large/w/231110080013512834.webp";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [userRecentlyViewed, setUserRecentlyViewed] = useState<any[]>([]);

  useEffect(() => {
    async function fetchRecentlyViewed() {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const res = await fetch("/api/recently-viewed", {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data) && json.data.length > 0) {
            setUserRecentlyViewed(json.data);
            return;
          }
        }
        const stored = localStorage.getItem("recentlyViewedProducts");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setUserRecentlyViewed(parsed);
          }
        }
      } catch (e) {
        console.error("Failed to load recently viewed from server", e);
      }
    }
    fetchRecentlyViewed();
  }, []);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          getApi("/products?isActive=true"),
          getApi("/categories").catch(() => ({ data: [] }))
        ]);

        if (Array.isArray(prodRes.data) && prodRes.data.length > 0) {
          const mapped = prodRes.data.map((p: any) => ({
            ...p,
            imageUrl: p.imageUrl || (p.images && p.images[0]) || (p.galleries && p.galleries[0]?.path) || (p.productGalleries && p.productGalleries[0]?.path) || ""
          }));
          setProducts(mapped);
        }

        if (Array.isArray(catRes.data)) {
          setCategories(catRes.data);
        }
      } catch (err) {
        console.error("Backend fetch error, using fallback mock data", err);
      }
    }
    fetchHomeData();
  }, []);

  const displayProducts = products;

  // Hide recently viewed entries whose products are no longer active (e.g. deleted in admin)
  const activeProductIds = new Set(products.map((p) => String(p.id)));
  const visibleRecentlyViewed =
    products.length > 0
      ? userRecentlyViewed.filter((rv) => activeProductIds.has(String(rv.id)))
      : userRecentlyViewed;
  
  // Shuffle products for "Popular" section
  const shuffledProducts = [...displayProducts].sort((a, b) => (a.id || a.title).localeCompare(b.id || b.title));
  const popularItems = shuffledProducts.slice(0, 3).map((p, index) => ({
    title: p.name || p.title,
    imageSrc: p.imageUrl || p.images?.[0] || p.imageSrc || "",
    price: p.price || 0,
    rating: p.rating || 0,
    isLastItem: index === 2
  }));

  // Categories mapping for "Most popular categories of the week"
  const displayCategories = categories.length > 0 ? categories : [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Fashion" },
    { id: "3", name: "Home & Kitchen" }
  ];
  
  const shuffledCategories = [...displayCategories].sort((a, b) => String(a.id || a.name).localeCompare(String(b.id || b.name)));
  const popularCategoriesItems = shuffledCategories.slice(0, 3).map((cat, catIndex) => {
    const catProducts = displayProducts.filter((p) => p.categoryId === cat.id && (p.imageUrl || p.images?.[0]));
    const targetProduct = catProducts.length > 0 
      ? catProducts[catIndex % catProducts.length]
      : displayProducts[catIndex % Math.max(displayProducts.length, 1)];
    
    const isGuid = (id: unknown) =>
      typeof id === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    return {
      category: cat.name || cat.title || "Category",
      href: isGuid(cat.id) ? `/catalog?category=${cat.id}` : "/catalog",
      imageSrc: targetProduct?.imageUrl || targetProduct?.images?.[0] || FALLBACK_IMAGE
    };
  });

  const cardItems = displayProducts.map((p) => ({
    id: p.id || p.title,
    title: p.name || p.title,
    imageSrc: p.imageUrl || p.images?.[0] || p.imageSrc || "",
    price: p.price,
    rating: p.rating || 0,
  }));

  // Products with real discounts (up to 20) for the "Sales" carousel
  const saleCardItems = displayProducts
    .filter((p) => p.oldCost && p.oldCost > p.price)
    .slice(0, 20)
    .map((p) => ({
      id: p.id || p.title,
      title: p.name || p.title,
      imageSrc: p.imageUrl || p.images?.[0] || p.imageSrc || "",
      price: p.price,
      rating: p.rating || 0,
    }));

  const isGuid = (id: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  const carouselTitles = ["Trending Now", "Fresh Picks", "Best Sellers"];
  const carouselGroups = [0, 1, 2].map((groupIndex) =>
    cardItems.filter((_, index) => index % 3 === groupIndex).slice(0, 4)
  );

  type QuadCardItem = {
    id: string;
    title: string;
    imageSrc: string;
    href: string;
    rating?: number;
  };

  const quadTitles = ["Audio & Tech", "Kitchen Comfort", "Sneaker Station", "Smart Finds"];
  const electronicsId = categories.find((c) => c.name === "Electronics")?.id;
  const kitchenId = categories.find((c) => c.name === "Home & Kitchen")?.id;
  const footwearId = categories.find((c) => c.name === "Footwear & Sports")?.id;
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
  const quadGroups: QuadCardItem[][] = quadMatchers.map((matcher) => {
    if (quadRealPool.length === 0) return [];
    const matchIndex = quadRealPool.findIndex((item) => matcher.test(item.title));
    const start = matchIndex >= 0 ? matchIndex : 0;
    const size = Math.min(4, quadRealPool.length);
    return Array.from({ length: size }, (_, offset) => quadRealPool[(start + offset) % quadRealPool.length]);
  });

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans mb-100">
      <img className="w-full object-cover" src="/background/main.jpg" alt="Logo" />

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

        <div className="flex flex-row gap-5 justify-between mb-5">
          <PopularProductsSection href="/catalog" items={popularItems} />
          <PopularCategoriesSection href="/catalog" items={popularCategoriesItems} />
        </div>

        {saleCardItems.length > 0 && (
          <div className="mb-10">
            <Carousel
              title="Sales"
              href="/catalog?sale=1"
              width="max-w-[1534px]"
            >
              {saleCardItems.map((product, index) => (
                <SimpleProductCard
                  key={index}
                  id={String(product.id)}
                  title={product.title}
                  imageSrc={product.imageSrc}
                  price={product.price}
                  rating={product.rating}
                  onClick={() => router.push(`/product/${product.id}`)}
                />
              ))}
            </Carousel>
          </div>
        )}

        <AuthBanner />

        <div className="flex flex-row gap-5 justify-between mb-10">
          <CarouselCard
            title="Backend Products"
            imageSrc={cardItems[0]?.imageSrc || FALLBACK_IMAGE}
            href="/catalog"
            items={cardItems.slice(0, 4)}
          />
          <CategoryCard
            title={categories[0]?.name || "Category 1"}
            imageSrc="https://cdn.new-brz.net/app/public/models/MPXV3ZP-A/large/w/231110080013512834.webp"
            href={categories[0]?.id ? `/catalog?category=${categories[0].id}` : "/catalog"}
          />
          <CarouselCard
            title="Backend Products"
            imageSrc={cardItems[1]?.imageSrc || FALLBACK_IMAGE}
            href="/catalog"
            items={cardItems.slice(0, 4)}
          />
          <CategoryCard
            title={categories[1]?.name || "Category 2"}
            imageSrc="https://cdn.new-brz.net/app/public/models/MPXV3ZP-A/large/w/231110080013512834.webp"
            href={categories[1]?.id ? `/catalog?category=${categories[1].id}` : "/catalog"}
          />
        </div>

        {visibleRecentlyViewed.length > 0 && (
          <div className="mb-10">
            <Carousel
              title="Recently Viewed"
              width="max-w-[1378px]"
            >
              {visibleRecentlyViewed.map((product) => (
                <RecentlyViewedCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  imageSrc={product.imageSrc}
                  rating={
                    products.find(
                      (p) => String(p.id) === String(product.id),
                    )?.rating || 0
                  }
                  onClick={() => router.push(`/product/${product.id}`)}
                />
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}