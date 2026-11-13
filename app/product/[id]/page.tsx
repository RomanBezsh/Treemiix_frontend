"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { mainImagePath } from "@/lib/media";
import { useEffect, useState } from "react";

import ProductMainSection from "@/components/product/ProductMainSection";
import ProductDetails from "@/components/product/ProductDetails";
import ProductSearchQuestions from "@/components/product/ProductSearchQuestions";
import VideoCarousel from "@/components/product/VideoCarousel";
import ProductQnASection from "@/components/product/ProductQnASection";
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
  // "not-found": 404 (or 400 for a malformed id); "error": server error, rate limit or network failure
  const [status, setStatus] = useState<"loading" | "ready" | "not-found" | "error">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    (async () => {
      let productData: ProductItem;
      try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (res.status === 404 || res.status === 400) {
          if (!cancelled) setStatus("not-found");
          return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        productData = await res.json();
        if (!productData?.id) throw new Error("Unexpected product response");
      } catch (err) {
        // Expected when the backend is down or rate-limited: the page shows "Couldn't load the product"
        console.warn("Failed to load product", err);
        if (!cancelled) setStatus("error");
        return;
      }
      if (cancelled) return;

      setProduct(productData);
      setStatus("ready");

      // Secondary data: never blocks the product page
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const imageUrl = mainImagePath(productData);
        const newItem = {
          id: productData.id,
          title: productData.name,
          imageSrc: imageUrl,
        };
        await fetch("/api/recently-viewed", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ product: newItem }),
        });
        const existing = JSON.parse(localStorage.getItem("recentlyViewedProducts") || "[]");
        const filtered = existing.filter((item: { id?: string | number }) => String(item.id) !== String(productData.id));
        const updated = [newItem, ...filtered].slice(0, 20);
        localStorage.setItem("recentlyViewedProducts", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save recently viewed", e);
      }

      try {
        const videoRes = await fetch(`/api/videos?query=${encodeURIComponent(productData.name)}`);
        const videoResults = videoRes.ok ? await videoRes.json() : [];
        if (!cancelled) setVideos(Array.isArray(videoResults) ? videoResults : []);
      } catch {
        if (!cancelled) setVideos([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, attempt]);

  if (id && status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-[20px]">
        <p className="text-center text-[18px] text-[#555555]">
          Loading product...
        </p>
      </div>
    );
  }

  if (status !== "ready" || !product) {
    const notFound = !id || status === "not-found";
    return (
      <main className="mx-auto flex w-full max-w-[700px] flex-col items-center px-[16px] py-[80px] text-center">
        <h1 className="text-[28px] font-black text-[#333333]">
          {notFound ? "Product not found" : "Couldn't load the product"}
        </h1>
        <p className="mt-[10px] text-[15px] text-[#555555]">
          {notFound
            ? "This product doesn't exist or is no longer available."
            : "The server may be waking up. Please try again in a few seconds."}
        </p>
        <div className="mt-[24px] flex flex-wrap items-center justify-center gap-[12px]">
          {!notFound && (
            <button
              type="button"
              onClick={() => {
                setStatus("loading");
                setAttempt((n) => n + 1);
              }}
              className="flex h-[46px] items-center justify-center rounded-[12px] border-2 border-[#7C9BC0] px-[22px] text-[16px] font-medium text-[#496B94] transition hover:-translate-y-0.5 active:translate-y-0"
            >
              Try again
            </button>
          )}
          <Link
            href="/catalog"
            className="flex h-[46px] items-center justify-center rounded-[12px] bg-[linear-gradient(90deg,#FFDB5A_0%,#FF825A_100%)] px-[26px] text-[16px] font-medium text-white transition hover:-translate-y-0.5 active:translate-y-0"
          >
            Browse all products
          </Link>
        </div>
      </main>
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

    <ProductSearchQuestions />

    <ProductDetails product={product} />

    <VideoCarousel videos={videos} />

    <ProductQnASection productId={product.id} />

    <ProductReviewsSection productId={product.id} />
  </main>
);
}