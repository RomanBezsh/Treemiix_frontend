"use client"
import ProductCard from "@/components/catalog/ProductCard";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import Carousel from "@/components/common/Carousel";
import ProductDetails from "@/components/product/ProductDetails";
import ProductMainSection from "@/components/product/ProductMainSection"
import ProductPromotions from "@/components/product/ProductPromotions";
import ProductSearchQuestions from "@/components/product/ProductSearchQuestions";
import VideoCarousel from "@/components/product/VideoCarousel";
import ProductQnASection from "@/components/product/ProductQnASection";
import ReviewFilterChips from "@/components/product/ReviewFilterChips";
import ProductReviewsSection from "@/components/product/ProductReviewsSection";

const ProductPage = () => {
    return (
        <div className="mb-50 mt-8.25 flex flex-col items-center">
            <div className="mb-21.25 ml-45">
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

            <ProductMainSection product={{
                id: "w",
                name: "Gaming Headset HyperX Cloud Alpha",
                price: 99.99,
                stock: 10,
                description: "HyperX Dual Chamber Drivers...",
                imageUrl: "https://content1.rozetka.com.ua/goods/images/big/62124885.jpg"
            }} />
            <div className="mb-29">
                <Carousel title="More to consider from our brands">
                    {Array.from({ length: 5 }, (_, index) => {
                        return (
                            <ProductCard key={index} title="Gaming Headset HyperX Cloud Stinger Black " stars={3} priceSale={555} priceOriginal={999} shipTo="USA" imageSrc="https://content1.rozetka.com.ua/goods/images/big/62124885.jpg" />
                        );
                    })}
                </Carousel>
            </div>
            <ProductPromotions />
            <ProductSearchQuestions />
            <ProductDetails product={{
                description: "HyperX Dual Chamber Drivers...",
                asin: "B074NBSF9N",
                releaseDate: "September 25, 2017",
                itemModelNumber: "HX-HSCA-RD/AM",
                manufacturer: "Kingston",
                countryOfOrigin: "China",
                productDimensions: "9.2 x 8.25 x 4.65 inches",
                itemWeight: "12 ounces",
                binding: "Personal Computers"
            }} />
            <VideoCarousel videos={[]} />
            <ProductQnASection />
            <ReviewFilterChips />
            <ProductReviewsSection />
        </div>
    );
}


export default ProductPage;