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

const ProductPage = () => {
    return (
        <div className="mb-50">
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
            <ProductMainSection />
            <div className="mb-29">
                <Carousel title="More to consider from our brands">
                    {Array.from({ length: 5 }, (_, index) => {
                        return (
                            <ProductCard imageSrc="https://www.gamescom.gr/images/detailed/597/20180305133128_hyperx_cloud_alpha.jpeg" key={index} title="Gaming Headset HyperX Cloud Stinger Black " stars={3} priceSale={555} priceOriginal={999} shipTo="Потужностан" imageSrc={""} />
                        );
                    })}
                </Carousel>
            </div>
            <ProductPromotions />
            <ProductSearchQuestions />
            <ProductDetails />
            <VideoCarousel />
            <ProductQnASection />
        </div>
    );
}


export default ProductPage;