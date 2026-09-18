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
  carouselCardProducts,
  homeDecorUnder20Products,
  nikeSaleItems,
  popularCategoriesData,
  popularProductsData,
  recentlyViewedProducts,
} from "@/data/mockData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://treemiix-backend.onrender.com/api";

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          getApi("/products"),
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

  const displayProducts = products.length > 0 ? products : homeDecorUnder20Products;
  
  // Shuffle products for "Popular" section
  const shuffledProducts = [...displayProducts].sort(() => 0.5 - Math.random());
  const popularItems = shuffledProducts.slice(0, 3).map((p, index) => ({
    title: p.name || p.title,
    imageSrc: p.imageUrl || p.images?.[0] || p.imageSrc || "",
    price: p.price || 0,
    isLastItem: index === 2
  }));

  // Categories mapping for "Most popular categories of the week"
  const displayCategories = categories.length > 0 ? categories : [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Fashion" },
    { id: "3", name: "Home & Kitchen" }
  ];
  
  const shuffledCategories = [...displayCategories].sort(() => 0.5 - Math.random());
  const popularCategoriesItems = shuffledCategories.slice(0, 3).map((cat) => {
    // Find a random product belonging to this category, or just a random product with an image
    const catProducts = displayProducts.filter((p) => p.categoryId === cat.id && (p.imageUrl || p.images?.[0]));
    const targetProduct = catProducts.length > 0 
      ? catProducts[Math.floor(Math.random() * catProducts.length)]
      : displayProducts[Math.floor(Math.random() * displayProducts.length)];
    
    return {
      category: cat.name || cat.title || "Category",
      href: "/catalog",
      imageSrc: targetProduct?.imageUrl || targetProduct?.images?.[0] || "https://cdn.new-brz.net/app/public/models/MPXV3ZP-A/large/w/231110080013512834.webp"
    };
  });

  const cardItems = displayProducts.map((p) => ({
    id: p.id || p.title,
    title: p.name || p.title,
    imageSrc: p.imageUrl || p.images?.[0] || p.imageSrc || "",
    price: p.price,
  }));

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans mb-100">
      <img className="w-full object-cover" src="/background/main.jpg" alt="Logo" />

      <div className="relative z-10 -mt-43 w-full max-w-[1534px]">
        <div className="grid grid-cols-4 gap-5 mb-5">
          <CarouselCard
            title="Wine cabinet"
            imageSrc={carouselCardProducts[0].imageSrc}
            href="/catalog"
            items={cardItems.slice(0, 4)}
          />
          <CarouselCard
            title="Internet Router"
            imageSrc={carouselCardProducts[1].imageSrc}
            href="/catalog"
            items={cardItems.slice(0, 4)}
          />
          <CarouselCard
            title="Monitor"
            imageSrc={carouselCardProducts[2].imageSrc}
            href="/catalog"
            items={cardItems.slice(0, 4)}
          />
          <div className="flex flex-col gap-2.75">
            <HeroBanner />
            <PromoBanner />
          </div>
          <CategoryQuadCard
            title="Sale Nike"
            moreHref="/catalog"
            items={nikeSaleItems}
          />
          <CategoryQuadCard
            title="Sale Nike"
            moreHref="/catalog"
            items={nikeSaleItems}
          />
          <CategoryQuadCard
            title="Sale Nike"
            moreHref="/catalog"
            items={nikeSaleItems}
          />
          <CategoryQuadCard
            title="Sale Nike"
            moreHref="/catalog"
            items={nikeSaleItems}
          />
        </div>

        <div className="flex flex-row gap-5 justify-between mb-5">
          <PopularProductsSection href="/catalog" items={popularItems} />
          <PopularCategoriesSection href="/catalog" items={popularCategoriesItems} />
        </div>

        <div className="mb-10">
          <Carousel
            title="Backend Live Products Catalog"
            href="/catalog"
            width="max-w-[1534px]"
          >
            {cardItems.concat(cardItems).map((product, index) => (
              <SimpleProductCard
                key={index}
                id={String(product.id)}
                title={product.title}
                imageSrc={product.imageSrc}
                price={product.price}
                onClick={() => router.push(`/product/${product.id}`)}
              />
            ))}
          </Carousel>
        </div>

        <AuthBanner />

        <div className="flex flex-row gap-5 justify-between mb-10">
          <CarouselCard
            title="Backend Products"
            imageSrc={cardItems[0]?.imageSrc || carouselCardProducts[0].imageSrc}
            href="/catalog"
            items={cardItems.slice(0, 4)}
          />
          <CategoryCard
            title="Category 1"
            imageSrc="https://cdn.new-brz.net/app/public/models/MPXV3ZP-A/large/w/231110080013512834.webp"
            href="/catalog"
          />
          <CarouselCard
            title="Backend Products"
            imageSrc={cardItems[1]?.imageSrc || carouselCardProducts[0].imageSrc}
            href="/catalog"
            items={cardItems.slice(0, 4)}
          />
          <CategoryCard
            title="Category 1"
            imageSrc="https://cdn.new-brz.net/app/public/models/MPXV3ZP-A/large/w/231110080013512834.webp"
            href="/catalog"
          />
        </div>

        <div className="mb-10">
          <Carousel
            title="Recently Viewed"
            width="max-w-[1378px]"
          >
            {recentlyViewedProducts.map((product) => (
              <RecentlyViewedCard
                key={product.id}
                id={product.id}
                title={product.title}
                imageSrc={product.imageSrc}
                onClick={() => router.push(`/product/${product.id}`)}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}