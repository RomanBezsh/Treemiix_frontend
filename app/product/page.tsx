"use client";

import ProductCard from "@/components/catalog/ProductCard";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import Carousel from "@/components/common/Carousel";
import ProductDetails from "@/components/product/ProductDetails";
import ProductMainSection from "@/components/product/ProductMainSection";
import ProductPromotions from "@/components/product/ProductPromotions";
import ProductSearchQuestions from "@/components/product/ProductSearchQuestions";
import VideoCarousel from "@/components/product/VideoCarousel";
import ProductQnASection from "@/components/product/ProductQnASection";
import ReviewFilterChips from "@/components/product/ReviewFilterChips";
import ProductReviewsSection from "@/components/product/ProductReviewsSection";

const ProductPage = () => {
  return (
    <main
      className="
        mt-[20px]
        flex w-full min-w-0
        flex-col items-center
        overflow-x-hidden
        pb-[80px]
        sm:mt-[26px]
        sm:pb-[120px]
        lg:mt-[33px]
        lg:pb-[200px]
      "
    >
      {/* Breadcrumbs */}
      <div
        className="
          mb-[45px]
          w-full max-w-[1690px]
          px-[16px]
          sm:px-[24px]
          lg:mb-[85px]
          lg:px-[40px]
        "
      >
        <div className="overflow-x-auto">
          <Breadcrumbs
            items={[
              {
                title: "Computer",
              },
              {
                title: "Аccessories",
              },
              {
                title: "Headphones",
              },
              {
                title: "HyperX",
              },
              {
                title: "HyperX Cloud Alpha",
              },
            ]}
          />
        </div>
      </div>

      {/* Main product */}
      <ProductMainSection
        product={{
          id: "w",
          name: "Gaming Headset HyperX Cloud Alpha",
          price: 99.99,
          stock: 10,
          description: "HyperX Dual Chamber Drivers...",
          imageUrl:
            "https://content1.rozetka.com.ua/goods/images/big/62124885.jpg",
        }}
      />

      {/* Recommended products */}
      <div
        className="
          mb-[70px]
          w-full
          lg:mb-[116px]
        "
      >
        <Carousel title="More to consider from our brands">
          {Array.from({ length: 5 }, (_, index) => (
            <ProductCard
              key={index}
              title="Gaming Headset HyperX Cloud Stinger Black"
              stars={3}
              priceSale={555}
              priceOriginal={999}
              shipTo="USA"
              imageSrc="https://content1.rozetka.com.ua/goods/images/big/62124885.jpg"
            />
          ))}
        </Carousel>
      </div>

      <ProductPromotions />

      <ProductSearchQuestions />

      <ProductDetails
        product={{
          description: "HyperX Dual Chamber Drivers...",
          asin: "B074NBSF9N",
          releaseDate: "September 25, 2017",
          itemModelNumber: "HX-HSCA-RD/AM",
          manufacturer: "Kingston",
          countryOfOrigin: "China",
          productDimensions:
            "9.2 x 8.25 x 4.65 inches",
          itemWeight: "12 ounces",
          binding: "Personal Computers",
        }}
      />

      <VideoCarousel videos={[]} />

      <ProductQnASection />

      <ReviewFilterChips />

      <ProductReviewsSection />
    </main>
  );
};

export default ProductPage;