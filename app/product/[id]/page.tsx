"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import ProductMainSection from "@/components/product/ProductMainSection";
import ProductDetails from "@/components/product/ProductDetails";
import ProductPromotions from "@/components/product/ProductPromotions";
import ProductSearchQuestions from "@/components/product/ProductSearchQuestions";
import VideoCarousel from "@/components/product/VideoCarousel";
import ProductQnASection from "@/components/product/ProductQnASection";
import ReviewFilterChips from "@/components/product/ReviewFilterChips";
import ProductReviewsSection from "@/components/product/ProductReviewsSection";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://treemiix-backend.onrender.com/api";

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  oldCost?: number | null;
  stock: number;
  description: string;
  sku?: string;
  categoryId: string;
  sellerId: string;
  imageUrl?: string;
  images?: string[];
  videos?: string[];
  asin?: string;
  itemModelNumber?: string;
  manufacturer?: string;
  countryOfOrigin?: string;
  productDimensions?: string;
  itemWeight?: string;
  warrantyInfo?: string;
  features?: string;
  binding?: string;
  releaseDate?: string;
  category?: {
    name: string;
  };
  seller?: {
    storeName: string;
  };
  galleries?: {
    id: string;
    path: string;
    isMain: boolean;
  }[];
  attributeValues?: {
    id: string;
    nameAttr: string;
    value: string;
  }[];
}

export default function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] =
    useState<ProductItem | null>(null);

  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(`${API_BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then(async (productData) => {
        setProduct(productData);

        const videoRes = await fetch(
          `/api/videos?query=${encodeURIComponent(
            productData.name,
          )}`,
        );

        const videoResults = videoRes.ok
          ? await videoRes.json()
          : [];

        setVideos(videoResults);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center px-[20px]">
        <p className="text-center text-[18px] text-[#555555]">
          Loading product detail...
        </p>
      </div>
    );
  }

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
    <ProductMainSection product={product} />

    <ProductPromotions />

    <ProductSearchQuestions />

    <ProductDetails product={product} />

    <VideoCarousel videos={videos} />

    <ProductQnASection />

    <ReviewFilterChips />

    <ProductReviewsSection />
  </main>
);
}