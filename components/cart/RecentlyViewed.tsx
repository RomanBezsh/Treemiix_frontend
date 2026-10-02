"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://treemiix-backend.onrender.com/api";

type RecentEntry = {
  id?: string | number;
  title?: string;
  imageSrc?: string;
};

type ProductListItem = {
  id?: string;
  name?: string;
  price?: number;
  rating?: number;
  imageUrl?: string;
  images?: string[];
};

export type RecentItem = {
  id: string;
  title: string;
  imageSrc?: string;
  price?: number;
  rating?: number;
};

type RecentlyViewedProps = {
  excludedProductIds?: string[];
  onAddToCart?: (
    item: RecentItem,
  ) => Promise<boolean> | boolean;
};

export default function RecentlyViewed({
  excludedProductIds = [],
  onAddToCart,
}: RecentlyViewedProps) {
  const [items, setItems] = useState<RecentItem[]>([]);
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      let recent: RecentEntry[] = [];

      try {
        const res = await fetch("/api/recently-viewed", {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        });
        const json = await res.json();
        if (Array.isArray(json.data) && json.data.length > 0) {
          recent = json.data;
        }
      } catch (e) {
        console.error("Failed to load recently viewed", e);
      }

      if (recent.length === 0) {
        try {
          const stored = localStorage.getItem(
            "recentlyViewedProducts",
          );
          const parsed = stored ? JSON.parse(stored) : [];
          if (Array.isArray(parsed)) recent = parsed;
        } catch (e) {
          console.error("Failed to load recently viewed", e);
        }
      }

      if (recent.length === 0) {
        setItems([]);
        return;
      }

      let products: ProductListItem[] = [];
      let activeFetched = false;
      try {
        const res = await fetch(`${API_BASE_URL}/products?isActive=true`);
        if (res.ok) {
          const list = await res.json();
          if (Array.isArray(list)) {
            products = list;
            activeFetched = true;
          }
        }
      } catch (e) {
        console.error("Failed to load products", e);
      }

      const byId = new Map<string, ProductListItem>();
      for (const product of products) {
        if (product.id) {
          byId.set(String(product.id), product);
        }
      }

      // Hide entries whose products are no longer active (deleted in admin);
      // if the active list couldn't be loaded, keep raw history as a fallback
      const visibleRecent = activeFetched
        ? recent.filter((entry) => byId.has(String(entry.id)))
        : recent;

      setItems(
        visibleRecent.map((entry) => {
          const product = byId.get(String(entry.id));
          return {
            id: String(entry.id),
            title: entry.title || product?.name || "Product",
            imageSrc:
              entry.imageSrc ||
              product?.imageUrl ||
              product?.images?.[0] ||
              undefined,
            price: product?.price,
            rating: product?.rating,
          };
        }),
      );
    };

    load();
  }, []);

  const visibleItems = items.filter(
    (item) => !excludedProductIds.includes(item.id),
  );

  if (visibleItems.length === 0) return null;

  const handleAddToCart = async (item: RecentItem) => {
    if (!onAddToCart || addingId) return;

    setAddingId(item.id);
    try {
      await onAddToCart(item);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="cart-fade-up cart-delay-2">
      <section
        className="
          w-full rounded-[16px] bg-[#F8F8F8]
          px-[20px] py-[18px]
          shadow-[0_2px_4px_rgba(0,0,0,0.08)]
          transition-shadow duration-300
          hover:shadow-[0_7px_18px_rgba(0,0,0,0.10)]
        "
      >
        {/* Section title */}
        <h2 className="text-[25px] font-normal leading-[150%] text-[#333333]">
          Your recently viewed items
        </h2>

        {/* Products */}
        <div className="mt-[18px] flex flex-col gap-[22px]">
          {visibleItems.map((item) => {
            const stars = Math.round(item.rating ?? 0);

            return (
              <article
                key={item.id}
                className="
                  group flex min-w-0 items-center gap-[12px]
                  rounded-[12px] px-[4px] py-[3px]
                  transition-all duration-200 ease-out
                  hover:translate-x-[3px]
                  hover:bg-white/50
                "
              >
                {/* Product image */}
                <div
                  className="
                    flex h-[82px] w-[82px] shrink-0
                    items-center justify-center
                    rounded-[10px] bg-white
                    shadow-[0_2px_4px_rgba(0,0,0,0.12)]
                    transition-all duration-300 ease-out
                    group-hover:-translate-y-[2px]
                    group-hover:shadow-[0_6px_12px_rgba(0,0,0,0.14)]
                  "
                >
                  <Image
                    src={
                      item.imageSrc ||
                      "/account/lists/product-placeholder.png"
                    }
                    alt={item.title}
                    width={72}
                    height={72}
                    className="
                      max-h-[72px] max-w-[72px] object-contain
                      transition-transform duration-300 ease-out
                      group-hover:scale-[1.06]
                    "
                  />
                </div>

                {/* Product information */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-[14px] font-normal leading-[120%] text-[#333333]">
                    {item.title}
                  </h3>

                  {/* Rating */}
                  <div className="mt-[5px] flex items-center gap-[2px] text-[16px] leading-none text-[#FF9D55]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>
                        {star <= stars ? "★" : "☆"}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  {item.price !== undefined && (
                    <p className="mt-[5px] flex items-baseline gap-[4px] text-[#555555]">
                      <span className="text-[16px] font-light leading-[120%]">
                        $
                      </span>

                      <span className="text-[24px] font-normal leading-[120%]">
                        {item.price}
                      </span>
                    </p>
                  )}
                </div>

                {/* Add to cart */}
                <button
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  disabled={addingId !== null}
                  className="
                    flex min-h-[41px] shrink-0 items-center justify-center
                    rounded-[20px] bg-[#7C9BC0]
                    px-[20px] py-[12px]
                    text-[14px] font-medium leading-[120%] text-white
                    transition-all duration-200 ease-out
                    hover:-translate-y-[2px]
                    hover:bg-[#6F90B7]
                    hover:shadow-[0_6px_14px_rgba(124,155,192,0.28)]
                    active:translate-y-0
                    active:scale-[0.96]
                  "
                >
                  {addingId === item.id
                    ? "Adding..."
                    : "Add to Cart"}
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
