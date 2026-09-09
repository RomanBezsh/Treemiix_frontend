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
import {
  carouselCardProducts,
  homeDecorUnder20Products,
  nikeSaleItems,
  popularCategoriesData,
  popularProductsData,
  recentlyViewedProducts,
} from "@/data/mockData";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans mb-100">
      <img className="w-full object-cover" src="/background/main.jpg" alt="Logo" />

      <div className="relative z-10 -mt-43 w-full max-w-[1534px]">
        <div className="grid grid-cols-4 gap-5 mb-5">
          <CarouselCard
            title="Wine cabinet"
            imageSrc={carouselCardProducts[0].imageSrc}
            href="/catalog/featured"
            items={carouselCardProducts}
          />
          <CarouselCard
            title="Internet Router"
            imageSrc={carouselCardProducts[1].imageSrc}
            href="/catalog/featured"
            items={carouselCardProducts}
          />
          <CarouselCard
            title="Monitor"
            imageSrc={carouselCardProducts[2].imageSrc}
            href="/catalog/featured"
            items={carouselCardProducts}
          />
          <div className="flex flex-col gap-2.75">
            <HeroBanner />
            <PromoBanner />
          </div>
          <CategoryQuadCard
            title="Sale Nike"
            moreHref="/catalog/nike"
            items={nikeSaleItems}
          />
          <CategoryQuadCard
            title="Sale Nike"
            moreHref="/catalog/nike"
            items={nikeSaleItems}
          />
          <CategoryQuadCard
            title="Sale Nike"
            moreHref="/catalog/nike"
            items={nikeSaleItems}
          />
          <CategoryQuadCard
            title="Sale Nike"
            moreHref="/catalog/nike"
            items={nikeSaleItems}
          />
        </div>

        <div className="flex flex-row gap-5 justify-between mb-5">
          <PopularProductsSection href="/catalog/popular" items={popularProductsData} />
          <PopularCategoriesSection href="/catalog/popular-categories" items={popularCategoriesData} />
        </div>


        <div className="mb-10">
          <Carousel
            title="Home Decor Under $20"
            href="/catalog/home-decor"
            width={1534}
          >
            {homeDecorUnder20Products.concat(homeDecorUnder20Products).map((product, index) => (
              <SimpleProductCard
                key={index}
                id={product.id}
                title={product.title}
                imageSrc={product.imageSrc}
                price={product.price}
              />
            ))}
          </Carousel>
        </div>

        <AuthBanner />

        <div className="flex flex-row gap-5 justify-between mb-10">
          <CarouselCard
            title="Featured products"
            imageSrc={carouselCardProducts[0].imageSrc}
            href="/catalog/featured"
            items={carouselCardProducts}
          />
          <CategoryCard
            title="Category 1"
            imageSrc="https://cdn.new-brz.net/app/public/models/MPXV3ZP-A/large/w/231110080013512834.webp"
            href="/category1"
          />
          <CarouselCard
            title="Featured products"
            imageSrc={carouselCardProducts[0].imageSrc}
            href="/catalog/featured"
            items={carouselCardProducts}
          />
          <CategoryCard
            title="Category 1"
            imageSrc="https://cdn.new-brz.net/app/public/models/MPXV3ZP-A/large/w/231110080013512834.webp"
            href="/category1"
          />
        </div>

        <div className="mb-10">
          <Carousel
            title="Last viewed"
            width={1378}
            gap={8}
          >
            {recentlyViewedProducts.map((product) => (
              <RecentlyViewedCard
                key={product.id}
                id={product.id}
                title={product.title}
                imageSrc={product.imageSrc}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
