import Carousel from "@/components/common/Carousel";
import {
  carouselCardProducts,
  homeDecorUnder20Products,
  nikeSaleItems,
  popularCategoriesData,
  popularProductsData,
} from "@/components/common/mockData";
import AuthBanner from "@/components/home/AuthBanner";
import CarouselCard from "@/components/home/CarouselCard";
import CategoryCard from "@/components/home/CategoryCard";
import CategoryQuadCard from "@/components/home/CategoryQuadCard";
import HeroBanner from "@/components/home/HeroBanner";
import PopularCategoriesSection from "@/components/home/PopularCategoriesSection";
import PopularProductsSection from "@/components/home/PopularProductsSection";
import PromoBanner from "@/components/home/PromoBanner";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans mb-100">
      <img className="w-full object-cover" src="/background/main.jpg" alt="Logo" />

      <div className="relative z-10 -mt-43">
        <CategoryCard
          title="Category 1"
          imageSrc="https://cdn.new-brz.net/app/public/models/MPXV3ZP-A/large/w/231110080013512834.webp"
          href="/category1"
        />
        <HeroBanner />
        <PromoBanner />
        <CategoryQuadCard
          title="Sale Nike"
          moreHref="/catalog/nike"
          items={nikeSaleItems}
        />
        <PopularProductsSection href="/catalog/popular" items={popularProductsData} />
        <PopularCategoriesSection href="/catalog/popular-categories" items={popularCategoriesData} />
        <Carousel
          title="Home Decor Under $20"
          href="/catalog/home-decor"
          products={homeDecorUnder20Products}
        />
        <AuthBanner />
        <CarouselCard
          title="Featured products"
          imageSrc={carouselCardProducts[0].imageSrc}
          href="/catalog/featured"
          items={carouselCardProducts}
        />
      </div>
    </div>
  );
}
