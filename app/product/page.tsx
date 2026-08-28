"use client"
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import ProductMainSection from "@/components/product/ProductMainSection"

const ProductPage = () => {
    return (
        <div>
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

        </div>
    );
}


export default ProductPage;