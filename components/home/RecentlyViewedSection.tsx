"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Carousel from "@/components/common/Carousel";
import RecentlyViewedCard from "@/components/home/RecentlyViewedCard";

interface RecentlyViewedSectionProps {
  products: {
    id: string;
    name: string;
    imageUrl?: string;
    rating?: number;
  }[];
}

export default function RecentlyViewedSection({
  products,
}: RecentlyViewedSectionProps) {
  const router = useRouter();
  const [userRecentlyViewed, setUserRecentlyViewed] = useState<any[]>([]);

  useEffect(() => {
    async function fetchRecentlyViewed() {
      try {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;
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

  const activeProductIds = new Set(products.map((p) => String(p.id)));
  const visibleRecentlyViewed =
    products.length > 0
      ? userRecentlyViewed.filter((rv) =>
          activeProductIds.has(String(rv.id))
        )
      : userRecentlyViewed;

  if (visibleRecentlyViewed.length === 0) return null;

  return (
    <div className="mb-10">
      <Carousel title="Recently Viewed" width="max-w-[1378px]">
        {visibleRecentlyViewed.map((product) => (
          <RecentlyViewedCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageSrc={product.imageUrl || ""}
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
  );
}
